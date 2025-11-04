---
slug: Deploy MongoDB 4.4 sharded cluster on three servers
title: 三台服务器部署 MongoDB 4.4 分片集群（含认证与排错总结）
date: 2025-11-04
tags: [develop,mongo]
authors: Clamber
keywords: [develop,mongo]
description: 三台服务器部署 MongoDB 4.4 分片集群
image: https://www.55kaifa.com/uploads/20250212/c7f3fda990039d2bb083864dbef9a413.png
---

# 🧩 三台服务器部署 MongoDB 4.4 分片集群（含认证与排错总结）
<!-- truncate -->

> 实测环境：CentOS 7 / MongoDB 4.4.29
> 集群节点：
>
> * 10.5.51.156
> * 10.5.51.157
> * 10.5.51.159

---

## 一、目标架构

### 集群结构

| 角色                         | IP              | 端口                    | 说明         |
| -------------------------- | --------------- | --------------------- | ---------- |
| Config Server 副本集（configs） | 156 / 157 / 159 | 36001 / 36002 / 36003 | 保存分片元数据    |
| Shard01 副本集（shard01）       | 156 / 157       | 37001 / 37002         | 存储分片数据     |
| Shard02 副本集（shard02）       | 159             | 37003                 | 备用分片，可后续扩展 |
| Mongos 路由入口                | 156             | 36501                 | 客户端统一访问入口  |

---

## 二、环境准备

### 1️⃣ 安装 MongoDB

```bash
cd /usr/local/src
tar -xzf mongodb-linux-x86_64-rhel70-4.4.29.tgz
mv mongodb-linux-x86_64-rhel70-4.4.29 /usr/local/mongodb
echo 'export PATH=$PATH:/usr/local/mongodb/bin' >> /etc/profile
source /etc/profile
```

验证安装：

```bash
which mongod
```

---

### 2️⃣ 创建目录结构

每台服务器执行：

```bash
mkdir -p /data/mongo/{config1,config2,config3,shard01a,shard01b,shard02a,mongos}/log
```

---

### 3️⃣ 防火墙放行端口

```bash
firewall-cmd --permanent --add-port=36001-36003/tcp
firewall-cmd --permanent --add-port=36501/tcp
firewall-cmd --permanent --add-port=37001-37003/tcp
firewall-cmd --reload
```

---

## 三、Config Server 副本集配置

### 配置文件（YAML 格式）

#### 10.5.51.156 → `/data/mongo/config1.conf`

```yaml
systemLog:
  destination: file
  path: /data/mongo/config1/log/config.log
  logAppend: true

storage:
  dbPath: /data/mongo/config1

net:
  bindIp: 0.0.0.0
  port: 36001

processManagement:
  fork: true

replication:
  replSetName: configs

sharding:
  clusterRole: configsvr

security:
  keyFile: /data/mongo/keyfile
  authorization: enabled
```

> 157、159 节点分别为config2,config3,修改 dbPath 和 port。

---

### 启动与初始化

```bash
mongod -f /data/mongo/config1.conf
mongod -f /data/mongo/config2.conf
mongod -f /data/mongo/config3.conf
```

初始化：

```bash
mongo --host 10.5.51.156 --port 36001
rs.initiate({
  _id: "configs",
  configsvr: true,
  members: [
    {_id: 0, host: "10.5.51.156:36001"},
    {_id: 1, host: "10.5.51.157:36002"},
    {_id: 2, host: "10.5.51.159:36003"}
  ]
})
```

---

## 四、Shard 副本集配置

### Shard01（156 主，157 从）

#### `/data/mongo/shard01a.conf`

```yaml
systemLog:
  destination: file
  path: /data/mongo/shard01a/log/shard01a.log
  logAppend: true

storage:
  dbPath: /data/mongo/shard01a

net:
  bindIp: 0.0.0.0
  port: 37001

processManagement:
  fork: true

replication:
  replSetName: shard01

sharding:
  clusterRole: shardsvr

security:
  keyFile: /data/mongo/keyfile
  authorization: enabled
```

初始化：

```bash
mongod -f /data/mongo/shard01a.conf
mongod -f /data/mongo/shard01b.conf

mongo --host 10.5.51.156 --port 37001
rs.initiate({
  _id: "shard01",
  members: [
    {_id: 0, host: "10.5.51.156:37001"},
    {_id: 1, host: "10.5.51.157:37002"}
  ]
})
```

---

### Shard02（159 单节点）

`/data/mongo/shard02a.conf`

```yaml
systemLog:
  destination: file
  path: /data/mongo/shard02a/log/shard02a.log
  logAppend: true

storage:
  dbPath: /data/mongo/shard02a

net:
  bindIp: 0.0.0.0
  port: 37003

processManagement:
  fork: true

replication:
  replSetName: shard02

sharding:
  clusterRole: shardsvr

security:
  keyFile: /data/mongo/keyfile
  authorization: enabled
```

初始化：

```bash
mongod -f /data/mongo/shard02a.conf
mongo --host 10.5.51.159 --port 37003
rs.initiate({_id: "shard02", members: [{_id: 0, host: "10.5.51.159:37003"}]})
```

---

## 五、Mongos 路由配置

`/data/mongo/mongos/mongos.conf`

```yaml
systemLog:
  destination: file
  path: /data/mongo/mongos/log/mongos.log
  logAppend: true

net:
  bindIp: 0.0.0.0
  port: 36501

processManagement:
  fork: true

sharding:
  configDB: configs/10.5.51.156:36001,10.5.51.157:36002,10.5.51.159:36003

security:
  keyFile: /data/mongo/keyfile
```

启动：

```bash
mongos -f /data/mongo/mongos/mongos.conf
```

---

## 六、启用认证与 KeyFile 机制

### 1️⃣ 生成 keyfile（在任意一台机器）

```bash
openssl rand -base64 756 > /data/mongo/keyfile
chmod 600 /data/mongo/keyfile
```

### 2️⃣ 分发到所有节点

```bash
scp /data/mongo/keyfile root@10.5.51.157:/data/mongo/keyfile
scp /data/mongo/keyfile root@10.5.51.159:/data/mongo/keyfile
chmod 600 /data/mongo/keyfile
```

> keyfile 必须内容完全一致，权限严格为 `600`。

---

## 七、创建管理员账号

连接 mongos：

```bash
mongo --host 10.5.51.156 --port 36501
```

创建用户：

```javascript
use admin
db.createUser({
  user: "admin",
  pwd: "StrongPassword123",
  roles: [ { role: "root", db: "admin" } ]
})
```

---

## 八、在 mongos 中添加分片

```bash
mongo --host 10.5.51.156 --port 36501 -u admin -p StrongPassword123 --authenticationDatabase admin
use admin
sh.addShard("shard01/10.5.51.156:37001,10.5.51.157:37002")
sh.addShard("shard02/10.5.51.159:37003")
sh.status()
```

---

## 九、Spring Boot & Navicat 连接方式

### ✅ Spring Boot

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://admin:StrongPassword123@10.5.51.156:36501/admin
```

### ✅ Navicat

| 选项    | 值                 |
| ----- | ----------------- |
| 主机    | 10.5.51.156       |
| 端口    | 36501             |
| 用户名   | admin             |
| 密码    | StrongPassword123 |
| 验证数据库 | admin             |

---

## 🔧 十、常见问题与解决办法

| 问题                                            | 日志提示                | 解决方法                                                   |
| --------------------------------------------- | ------------------- | ------------------------------------------------------ |
| `mongod: command not found`                   | 命令找不到               | 没加入 PATH，执行 `export PATH=$PATH:/usr/local/mongodb/bin` |
| `Error parsing YAML`                          | YAML 格式错误           | 使用 2 空格缩进，冒号后有空格                                       |
| `permission on keyfile are too open`          | 权限不对                | 执行 `chmod 600 /data/mongo/keyfile`                     |
| `BadValue: keyFile is required`               | 启用了 auth 但没 keyfile | 增加 `security.keyFile`                                  |
| `unrecognized option: security.authorization` | 仅 mongos 报错         | 删除 mongos 配置里的 `authorization`                         |
| `Address already in use`                      | 端口冲突                | `pkill mongod` 后再启动                                    |
| `child process failed`                        | 启动失败                | 查看日志，一般是路径或权限问题                                        |

---

## ✅ 十一、启动与关闭顺序

| 顺序 | 启动            | 关闭            |
| -- | ------------- | ------------- |
| 1  | Config Server | Mongos        |
| 2  | Shard Server  | Shard Server  |
| 3  | Mongos        | Config Server |

---

## 十二、验证

```bash
mongo --host 10.5.51.156 --port 36501 -u admin -p StrongPassword123 --authenticationDatabase admin
use testdb
sh.enableSharding("testdb")
sh.shardCollection("testdb.users", {uid: 1})
db.users.insert({uid:1,name:"Alice"})
db.users.find()
```

✅ 如果能成功写入并读出数据，说明分片集群搭建成功！

---

## 🔚 十三、总结

| 模块   | 核心要点                                         |
| ---- | -------------------------------------------- |
| 架构   | 三机分片集群（configs + shard01 + shard02 + mongos） |
| 安全   | keyfile + 用户认证                               |
| 配置   | 全部 YAML 格式，缩进 2 空格                           |
| 权限   | keyfile 必须 `600`                             |
| 启动顺序 | config → shard → mongos                      |
| 管理方式 | 通过 mongos 登录管理                               |
| 可扩展性 | 可后续添加新的 shard 副本集                            |
