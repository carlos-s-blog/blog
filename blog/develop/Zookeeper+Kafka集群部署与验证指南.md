---
slug: Guide to Deploying and Verifying Zookeeper Kafka Clusters
title: Zookeeper + Kafka 集群部署与验证指南
date: 2025-11-04
tags: [develop,zookeeper,kafka]
authors: Clamber
keywords: [develop,zookeeper,kafka]
description: Zookeeper + Kafka 集群部署与验证指南
image: https://www.55kaifa.com/uploads/20250212/c7f3fda990039d2bb083864dbef9a413.png
---

# 🧩 Zookeeper + Kafka 集群部署与验证指南
<!-- truncate -->

本文记录了在 **三台服务器环境下** 部署 **Zookeeper 集群** 与 **Kafka 集群** 的完整过程。

目标是让 Kafka 通过 Zookeeper 协调，同时支持自动创建 Topic。

---

## 🧱 一、集群规划

| 服务类型 | 节点 | IP 地址 | 安装路径 |
| --- | --- | --- | --- |
| Zookeeper | zk1 | 10.5.51.156 | /usr/local/zookeeper |
| Zookeeper | zk2 | 10.5.51.157 | /usr/local/zookeeper |
| Zookeeper | zk3 | 10.5.51.159 | /usr/local/zookeeper |
| Kafka | broker1 | 10.5.51.156 | /usr/local/kafka |
| Kafka | broker2 | 10.5.51.157 | /usr/local/kafka |
| Kafka | broker3 | 10.5.51.159 | /usr/local/kafka |

---

## ⚙️ 二、部署 Zookeeper 集群

### 1️⃣ 下载与解压

```bash
cd /usr/local
wget https://downloads.apache.org/zookeeper/zookeeper-3.8.4/apache-zookeeper-3.8.4-bin.tar.gz
tar -zxvf apache-zookeeper-3.8.4-bin.tar.gz
mv apache-zookeeper-3.8.4-bin zookeeper

```

### 2️⃣ 创建数据与日志目录

```bash
mkdir -p /usr/local/zookeeper/data
mkdir -p /usr/local/zookeeper/logs

```

### 3️⃣ 配置 zoo.cfg

```
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/usr/local/zookeeper/data
dataLogDir=/usr/local/zookeeper/logs
clientPort=2181

server.1=10.5.51.156:2888:3888
server.2=10.5.51.157:2888:3888
server.3=10.5.51.159:2888:3888

```

### 4️⃣ 设置每台机器的 myid

```bash
# zk1
echo 1 > /usr/local/zookeeper/data/myid

# zk2
echo 2 > /usr/local/zookeeper/data/myid

# zk3
echo 3 > /usr/local/zookeeper/data/myid

```

### 5️⃣ 启动与验证

```bash
/usr/local/zookeeper/bin/zkServer.sh start
/usr/local/zookeeper/bin/zkServer.sh status

```

输出示例：

```
Mode: leader
Mode: follower
Mode: follower

```

✅ 至少有一个为 Leader，即集群运行正常。

---

## 🦜 三、部署 Kafka 集群

### 1️⃣ 下载二进制包（非源码包）

```bash
cd /usr/local
wget https://downloads.apache.org/kafka/3.6.0/kafka_2.13-3.6.0.tgz
tar -zxvf kafka_2.13-3.6.0.tgz
mv kafka_2.13-3.6.0 kafka

```

> ⚠️ 不要下载带 “src” 的源码包，否则启动时报 Classpath is empty。
>

### 2️⃣ 配置 server.properties

### broker1（10.5.51.156）

```
broker.id=1
listeners=PLAINTEXT://10.5.51.156:9092
log.dirs=/usr/local/kafka/logs
zookeeper.connect=10.5.51.156:2181,10.5.51.157:2181,10.5.51.159:2181
num.partitions=24
default.replication.factor=3
auto.create.topics.enable=true

```

### broker2（10.5.51.157）

```
broker.id=2
listeners=PLAINTEXT://10.5.51.157:9092
log.dirs=/usr/local/kafka/logs
zookeeper.connect=10.5.51.156:2181,10.5.51.157:2181,10.5.51.159:2181
num.partitions=24
default.replication.factor=3
auto.create.topics.enable=true

```

### broker3（10.5.51.159）

```
broker.id=3
listeners=PLAINTEXT://10.5.51.159:9092
log.dirs=/usr/local/kafka/logs
zookeeper.connect=10.5.51.156:2181,10.5.51.157:2181,10.5.51.159:2181
num.partitions=24
default.replication.factor=3
auto.create.topics.enable=true

```

### 3️⃣ 启动 Kafka

```bash
/usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties

```

验证进程：

```bash
ps -ef | grep kafka.Kafka

```

---

## 🔍 四、验证 Kafka 集群状态

### 查看 Broker 节点

```bash
/usr/local/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server 10.5.51.156:9092

```

示例输出：

```
10.5.51.156:9092 (id: 1)
10.5.51.157:9092 (id: 2)
10.5.51.159:9092 (id: 3)

```

### 查看 Topic 列表

```bash
/usr/local/kafka/bin/kafka-topics.sh --list --bootstrap-server 10.5.51.156:9092

```

### 查看 Topic 详情

```bash
/usr/local/kafka/bin/kafka-topics.sh --describe --bootstrap-server 10.5.51.156:9092 --topic test

```

---

## 🚀 五、验证自动创建 Topic

### 1️⃣ 确认配置项

```
auto.create.topics.enable=true
num.partitions=24
default.replication.factor=3

```

### 2️⃣ 生产消息（自动触发创建）

```bash
/usr/local/kafka/bin/kafka-console-producer.sh --broker-list 10.5.51.156:9092 --topic auto_test_topic

```

输入几条消息：

```
hello
world

```

然后 Ctrl + C 退出。

### 3️⃣ 验证 Topic 是否创建

```bash
/usr/local/kafka/bin/kafka-topics.sh --describe --bootstrap-server 10.5.51.156:9092 --topic auto_test_topic

```

输出示例：

```
Topic: auto_test_topic  PartitionCount: 24  ReplicationFactor: 3

```

### 4️⃣ 消费消息验证

```bash
/usr/local/kafka/bin/kafka-console-consumer.sh --bootstrap-server 10.5.51.156:9092 --topic auto_test_topic --from-beginning

```

输出：

```
hello
world

```

✅ 自动创建 topic 功能验证成功。

---

## 🧰 六、常见问题

| 问题 | 原因 | 解决方案 |
| --- | --- | --- |
| `Classpath is empty` | 下载了源码包 | 下载二进制包（kafka_2.13-x.x.x.tgz） |
| `zookeeper is not a recognized option` | Kafka 3.x 移除旧参数 | 改用 `--bootstrap-server` |
| `No broker available` | Kafka 未启动 | 检查端口与防火墙 |
| `Connection to node failed` | IP 不可访问 | 确认 listeners 配置为内网地址 |

---

## 🔧 七、一键检查脚本

创建 `/usr/local/kafka/check_kafka_cluster.sh`：

```bash
#!/bin/bash
BOOTSTRAP=10.5.51.156:9092

echo "=== Kafka Broker 列表 ==="
/usr/local/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server $BOOTSTRAP | grep -E 'id|Address'

echo
echo "=== Topic 列表 ==="
/usr/local/kafka/bin/kafka-topics.sh --list --bootstrap-server $BOOTSTRAP

echo
echo "=== Topic 详情 ==="
for topic in $(/usr/local/kafka/bin/kafka-topics.sh --list --bootstrap-server $BOOTSTRAP); do
    echo "--- $topic ---"
    /usr/local/kafka/bin/kafka-topics.sh --describe --bootstrap-server $BOOTSTRAP --topic $topic | grep -E "PartitionCount|Leader"
done

```

赋予执行权限：

```bash
chmod +x /usr/local/kafka/check_kafka_cluster.sh

```

执行：

```bash
/usr/local/kafka/check_kafka_cluster.sh

```

---

## ✅ 八、总结

- Zookeeper 集群协调 Kafka 元数据与选举
- Kafka 使用 `zookeeper.connect` 连接集群
- Kafka CLI 工具需改用 `-bootstrap-server`
- 自动创建 Topic 由 `auto.create.topics.enable` 控制
- 分区、副本由 `num.partitions` 和 `default.replication.factor` 决定

> 建议后续结合 Prometheus + Kafka Exporter 做监控。
>