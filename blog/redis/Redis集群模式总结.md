---
slug: Summary of Redis Cluster Mode
title: Redis集群模式总结
date: 2022-01-29
tags: [Redis]
authors: Clamber
keywords: [Redis]
description: Redis集群模式总结
---

集群是一组相互独立的、通过高速网络互联的计算机，它们构成了一个组，并以单一系统的模式加以管理。
<!-- truncate -->

# 集群与哨兵Sentinel有什么区别
Sentinel哨兵,是为系统提供高可用特性,每一个Redis节点数据是同步的,且每一个Redis节点保存的都是全量数据。
Cluster集群,是将超大数据集打散到多台Redis服务器,可对存储规模进行水平扩容,每一个Redis节点存储的都是完整数据的子集。
总而言之，哨兵模式更多的是为了维护可用性，不会因Redis宕机而引起服务的不可用，而集群模式是为了维护更多数据的高存储性，便于储存大批量的数据。

# Redis的哈希槽设计
Redis集群预分好16384个槽，当需要在 Redis 集群中放置一个 key-value 时，根据CRC16(key) mod 16384的值，决定将一个key放到哪个桶中。

假设主节点的数量为3，将16384个槽位按照【用户自己的规则】去分配这3个节点，每个节点复制一部分槽位。

节点1的槽位区间范围为0-5460
节点2的槽位区间范围为5461-10922
节点3的槽位区间范围为10923-16383

从节点是没有槽位的，只有主节点才有
当要查找数据时，对要存储查找的键进行crc16哈希运算,得到一个值，并取模16384，判断这个值在哪个节点
的范围区间。

使用哈希槽的好处就在于可以方便的添加或移除节点。
当需要增加节点时，只需要把其他节点的某些哈希槽挪到新节点就可以了；
当需要移除节点时，只需要把移除节点上的哈希槽挪到其他节点就行了;
## 为什么是16384（2^14）个？
在redis节点发送心跳包时需要把所有的槽放到这个心跳包里，以便让节点知道当前集群信息，16384=16k，在发送心跳包时使用char进行bitmap压缩后是2k（2 * 8 (8 bit) *1024(1k) = 16K），也就是说使用2k的空间创建了16k的槽数。
虽然使用CRC16算法最多可以分配65535（2^16-1）个槽位，65535=65k，压缩后就是8k（8 * 8 (8 bit) * 1024(1k) =65K），也就是说需要需要8k的心跳包，作者认为这样做不太值得；并且一般情况下一个redis集群不会有超过1000个master节点，所以16k的槽位是个比较合适的选择。
## 哈希槽的特点
当你往Redis Cluster中加入一个Key时，会根据crc16(key) mod 16384计算这个key应该分布到哪个hash slot中，一个hash slot中会有很多key和value。可以理解成表的分区，使用单节点时的redis时只有一个表，所有的key都放在这个表里；改用Redis Cluster以后会自动为你生成16384个分区表，你insert数据时会根据上面的简单算法来决定key应该存在哪个分区，每个分区里有很多key。

# 3主3从的实战

```
一键部署Redis脚本
yum install -y gcc-c++ autoconf automake
cd /usr/local/
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
firewall-cmd --zone=public --add-port=6379/tcp --permanent
firewall-cmd --zone=public --add-port=16379/tcp --permanent
firewall-cmd --reload
echo "redis installed"
```
这里除了**6379**端口之外，还另外开放了**16379**这个端口，**6379**是用来对外开放，而**16379**则是为了集群之间的互相通信，和Sentinel的26379有着相似之处。

```
Redis配置命令脚本
cd /usr/local/redis-stable
sudo tee ./redis-cluster.conf <<-'EOF'
bind 0.0.0.0
port 6379
daemonize yes
requirepass "123456"
logfile "./cluster.log"
dbfilename "cluster.rdb"
dir "./"
masterauth "123456"
#是否开启集群
cluster-enabled yes
# 生成的node文件，记录集群节点信息，默认为nodes.conf
cluster-config-file nodes.conf
#节点连接超时时间
cluster-node-timeout 20000
#集群节点映射端口
cluster-announce-port 6379
#集群节点总线端口,节点之间互相通信，常规端口+1万
cluster-announce-bus-port 16379
EOF
```
脚本上半部分的配置和单机Redis的配置基本相同，开放端口，后台模式运行，设置密码，日志和rdb的保存位置，新增了一个集群之间通信的密码**masterauth** 。
下半部分的配置是针对集群，其中**cluster-announce-port**是指整个集群对外开放的端口，以便于我们通过客户端进行访问，一般设置为和Redis本身一样的端口号。

```
cd /usr/local/redis-stable
./src/redis-server redis-cluster.conf
```
最后到Redis的安装目录，用新建的配置文件启动Redis。

# 集群的启动
在6个节点分别执行安装和配置命令，就有个6个Redis节点，接下来启动集群。

```
./src/redis-cli -a 123456 --cluster create 
192.168.31.102:6379 192.168.31.103:6379 192.168.31.104:6379
192.168.31.110:6379 192.168.31.111:6379 192.168.31.112:6379
--cluster-replicas 1
```
在任意一台Redis节点执行命令，将6台节点ip添加到集群中，其中 **--cluster-replicas 1**指的是每个主节点有一个从节点。

## 客户端连接查看状态

```
./redis-cli -c -a 123456 
客户端连接需要加-a参数
```

```
127.0.0.1:6379> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:2
cluster_stats_messages_ping_sent:96
cluster_stats_messages_pong_sent:101
cluster_stats_messages_meet_sent:1
cluster_stats_messages_sent:198
cluster_stats_messages_ping_received:101
cluster_stats_messages_pong_received:97
cluster_stats_messages_received:198

127.0.0.1:6379> cluster nodes

6714367aa4a9d2379862ebc72b54ef3dad98acdd 192.168.31.102:6379@16379
master - 0 1626954110371 1 connected 0-5460

7d1b82830052fe187f81fbcc7ce1470b0e975313 192.168.31.104:6379@16379
master- 0 1626954109344 3 connected 10923-16383

08f39d0917d24c4ebee04e47d921466dc169dda4 192.168.31.112:6379@16379
myself,slave d19364caee69daf2cf1d790b0eb9d5742c294154 0 1626954110000 2
connected

d19364caee69daf2cf1d790b0eb9d5742c294154 192.168.31.103:6379@16379
master - 0 1626954111000 2 connected 5461-10922

e8d7c57b764f77daf5da251a0db4b5996235c750 192.168.31.111:6379@16379 slave
6714367aa4a9d2379862ebc72b54ef3dad98acdd 0 1626954112417 1 connected

2c9ee8a7ccab0c597bed8c99545709359b7ff2d5 192.168.31.110:6379@16379 slave
7d1b82830052fe187f81fbcc7ce1470b0e975313 0 1626954111394 3 connected
```
可以看到启动集群命令时，先写的3个ip会成为主节点，后写的3个ip成为子节点，其中有**myself**的表示当前节点。每个节点分别管理所属自己的哈希槽**0-5460**，**10923-16383**， **5461-10922**。

## 日志文件

```
[root@localhost redis-stable]# cat cluster.log
...
* Ready to accept connections
# configEpoch set to 5 via CLUSTER SET-CONFIG-EPOCH
# IP address for this node updated to 192.168.31.111
* Before turning into a replica, using my own master parameters to synthesize a
cached master: I may be able to synchronize with the new master with just a partial
transfer.
# 连接到主102
* Connecting to MASTER 192.168.31.102:6379
# 开始主从同步
* MASTER <-> REPLICA sync started
# Cluster state changed: ok
# 主从同步采用非阻塞连接
* Non blocking connect for SYNC fired the event.
# 从向主发送Ping得到响应,可以进行同步
* Master replied to PING, replication can continue...
# 尝试进行增量同步,主服务器拒绝
* Trying a partial resynchronization (request
af15de3e3228eecd99b17c4af81577936e15a3e5:1).
# 向主申请进行全量同步
* Full resync from master: c31d508ab81059422cc0af0db6534e53eed0ade1:0
* Discarding previously cached master state.
# 接收到主服务器175字节数据
* MASTER <-> REPLICA sync: receiving 175 bytes from master to disk
# 删除从旧数据
* MASTER <-> REPLICA sync: Flushing old data
# 加载RDB数据到内存
* MASTER <-> REPLICA sync: Loading DB in memory
* Loading RDB produced by version 6.2.4
# 统计信息
* RDB age 1 seconds
* RDB memory usage when created 2.59 Mb
# 完成主从同步
* MASTER <-> REPLICA sync: Finished with success
```
可以看到第一次尝试增量同步的时候，主节点会拒绝，而改用全量同步的方式将主节点的RDB文件传输给子节点。
