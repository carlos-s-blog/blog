---
slug: Redis Sentry Mode Summary
title: Redis哨兵模式总结
date: 2022-01-25
tags: [Redis]
authors: Clamber
keywords: [Redis]
description: Redis哨兵模式总结
---

虽然Redis单机部署起来比较简单，但是但是可靠性低，且不能很好利用CPU多核处理能力，而且在生产环境中，为了保证高可用的状态，单机运行一般是不可行的，同时为了保证数据的读写分离，降低Redis节点的压力，先来看一看Redis的主从复制。

<!-- truncate -->

# 主从复制的用途
1. 读写分离，扩展主节点的读能力，分担主节点读压力
2. 容灾恢复，一旦主节点宕机，手动将从节点提升为主节点顶上

# 主从复制的搭建

## 安装Redis(一键安装脚本)

```
yum install -y gcc-c++ autoconf automake
cd /usr/local/
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
echo "redis installed"
firewall-cmd --zone=public --add-port=6379/tcp --permanent
firewall-cmd --reload
```
这个脚本就是下载redis后安装到**redis-stable**文件夹中，同时开放防火墙的**6379**端口。

# 一主两从的部署方案
## Master节点配置文件

```
sudo tee /usr/local/redis-stable/redis-master.conf <<-'EOF'
bind * -::*
port 6379
daemonize yes
logfile ./master.log
dir ./
dbfilename "master.rdb"
requirepass "123456"
appendonly yes
appendfilename "master.aof"
masterauth "123456"
EOF
```
新建**redis-master.conf**文件，同时设置端口号，日志文件保存位置，数据文件保存位置，rdb文件名称，开启aof，aof文件名称。
其中**masterauth "123456"**是从节点连接到主节点所需要的密码。

## Master节点启动

```
cd /usr/local/redis-stable
./src/redis-server ./redis-master.conf
```
切换到redis目录文件，同时指定**redis-master.conf**配置文件启动。

## Slave1节点配置文件

```
sudo tee /usr/local/redis-stable/redis-slave1.conf <<-'EOF'
bind * -::*
port 6379
daemonize yes
logfile ./slave1.log
dir ./
dbfilename "slave1.rdb"
requirepass "123456"
appendonly yes
appendfilename "slave1.aof"
replicaof 0.0.0.0 6379
masterauth "123456"
replica-read-only yes
EOF
```
大部分的配置信息和主节点配置文件相同，只是新增了几个额外的配置参数。

```
replicaof 0.0.0.0 6379 - 设置主服务器IP与通信端口 这里的ip替换为主节点的ip
masterauth "123456" - 与主服务器通信时的密码
replica-read-only yes - 从节点只读
```
以同样的方式启动从节点**slave1**
```
cd /usr/local/redis-stable
./src/redis-server ./redis-slave1.conf
```
Slave2的配置与Slave1的配置基本相同，也是连接到主节点的ip地址就可以。
由于配置了从节点只读，所以在往从节点写入数据的时候，redis会报错。


# 哨兵模式(Sentinel模式)
在搭建完Redis的主从复制模式之后，但是当主服务器宕机后，需要手动把一台从服务器切换为主服务器，人工干预费事费力，还会造成一段时间内服务不可用。
所以需要一个可以随时管理Redis主从复制的方式，就是Redis的哨兵模式。

## 哨兵模式的介绍
Redis提供了哨兵的命令，是一个独立的进程。
原理哨兵是通过发送命令给多个节点，等待Redis服务器响应，从而监控运行的多个Redis实例
的运行情况。
当哨兵监测到master宕机，会自动将slave切换成master，通过通知其他的从服务器，修改
配置文件切换主机。

## Sentinel职能
### 监控（Monitoring）
Sentinel 会不断地检查你的主服务器和从服务器是否运作正常
### 提醒（Notification）
当被监控的某个 Redis 服务器出现问题时， Sentinel 可以通过 API 向管理员或者其他应
用程序发送通知
### 自动故障迁移（Automatic failover）
当一个主服务器不能正常工作时， Sentinel 会开始一次自动故障迁移操作， 它会将失效
主服务器的其中一个从服务器升级为新的主服务器， 并让失效主服务器的其他从服务器改
为复制新的主服务器。
当客户端试图连接失效的主服务器时， 集群也会向客户端返回新主服务器的地址， 使得集
群可以使用新主服务器代替失效服务器。

## Sentinel集群
一个哨兵进程对Redis服务器进行监控，可能会出现问题。
一般是使用多个哨兵进行监控，各个哨兵之间还会进行监控，形成多哨兵模式。

## Sentinel集群的搭建
sentinel实际上就是一个redis，只是配置文件和端口稍有不同，所以只需要修改一下配置，然后按照主从复制的配置方式配置即可。

### 一键部署脚本

```
yum install -y gcc-c++ autoconf automake
cd /usr/local/
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
firewall-cmd --zone=public --add-port=26379/tcp --permanent
firewall-cmd --reload
echo "redis installed"
```
安装方式和普通的Redis基本相同，只是Sentinel的端口号不是6379，而是26379，同时还有一个别的16379也是Redis的端口，可以猜一下他是用来干什么的。

### Sentinel Master配置文件信息

```
sudo tee /usr/local/redis-stable/sentinel-1.conf <<-'EOF'
port 26379
bind 0.0.0.0
daemonize yes
logfile "./sentinel-1.log"
dir "./"
sentinel monitor mymaster 192.168.31.102 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel auth-pass mymaster 123456
sentinel failover-ti
```

```
其中192.168.31.102这个ip就是主从模式下的主节点。
sentinel monitor 说明当有2个Sentinel节点无法访问192.168.31.102:6379 ,就
客观认为该Master不可用,将Master做下线处理,并进行故障转移(failover) ,mymaster是Sentinel分组名称,
同一组sentinel必须设置相同的名字mymaster。
sentinel down-after-milliseconds 说明当ping 超过5000毫秒没响应,则主观判
定为下线。
sentinel failover-timeout 说明当超过30秒还没有完成故障转移,则认为故障转
移失败.。
sentinel auth-pass 连接到master节点auth时设置的密码。
```

```
./src/redis-server ./sentinel-1.conf --sentinel
```
以sentinel-1.conf配置文件启动Sentinel，同时添加**--sentinel**表示启动的是Sentinel而不是普通的Redis。

### Sentinel Slave1配置文件信息

```
sudo tee /usr/local/redis-stable/sentinel-2.conf <<-'EOF'
port 26379
bind 0.0.0.0
daemonize yes
logfile "./sentinel-2.log"
dir "./"
sentinel monitor mymaster 192.168.31.102 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel auth-pass mymaster 123456
sentinel failover-timeout mymaster 30000
EOF
```
按照Master同样的启动方式启动Slave节点

```
./src/redis-server ./sentinel-2.conf --sentinel
```
Slave2的配置信息和Slave1基本相同。

当Sentinel三个节点配置完启动之后，会通过选举算法选举出Sentinel的主节点。

## 哨兵模式的基本工作流程
redis在运行时会开启一个哨兵进程，主要负责监控实例、选举主实例、通知其他实例新
的主实例的工作。
### 监控实例
判断实例是否正常，主要就是通过哨兵的监控，他会周期性的给所有的实例发送PING命令，如果实例没有在对应的时间响应，那么哨兵就会把该实例标记为下线状态。如果该实例为主实例，那么哨兵在把该实例标记为下线状态后，开始进行重新选举主实例的工作。
### 选举主实例
主实例挂了后，会由哨兵进行重新选举主实例的工作，哨兵会根据具体的规则和算法选择一个健康的从实例作为新的主实例。
### 通知实例
选举完实例后哨兵会通知其他实例谁是新的主实例。哨兵主要通过将新的主实例的连接信息发送给其他从实例，在从库中执行replicaof命令以此来成为新主库的从库，并从主库中进行数据复制。
另外哨兵也会把新的主库的信息同步给客户端，让客户端把新的请求操作发送给新主
库。

# 总结
aof和rdb的存在保证了数据的持久性。redis集群模式的存在，是数据可靠的基础保证。
而哨兵模式的存在，是redis高可用的保证，即在主库发生故障时可通过选举和主从切换来
保证redis服务不间断的可用性。