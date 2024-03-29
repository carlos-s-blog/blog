---
slug: Installing RabbitMQ on Centos8
title: Centos8安装RabbitMQ
date: 2022-12-26
tags: [RabbitMQ]
keywords: [RabbitMQ]
description: Centos8安装RabbitMQ
---

**erlang-22.3.4.2-1.el7.x86_64.rpm
socat-1.7.3.3-2.el8.x86_64.rpm
rabbitmq-server-3.8.4-1.el8.noarch.rpm**

我已经把这三个文件放在了网盘中，需要的可以自己去下载
**链接: https://pan.baidu.com/s/1uJXgtjPckj7o-8uPzi6x0w 提取码: wf2p**

<!-- truncate -->


# 安装
在Linux新建文件夹**rabbitmq**
使用FileZilla将下载好的三个文件传输到**rabbitmq**文件夹中
进入安装安装包所在文件目录，进行安装。

```
安装erlang： yum install erlang-22.3.4.2-1.el7.x86_64.rpm
```

```
安装socat： yum install socat-1.7.3.3-2.el8.x86_64.rpm
```

```
安装rabbitmq-server： yum install rabbitmq-server-3.8.4-1.el8.noarch.rpm
```

## 启动停止服务

```
启动服务： service rabbitmq-server start
关闭服务： service rabbitmq-server stop
查看服务状态： service rabbitmq-server status
重启服务： service rabbitmq-server restart
```

## 相关管理

```
启动服务：service rabbitmq-server start
启动插件页面管理：rabbitmq-plugins enable rabbitmq_management
创建用户：rabbitmqctl add_user admin admin
创建用户：rabbitmqctl set_user_tags admin administrator
赋予权限：rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

## 访问控制台

点击浏览器，访问`http://ip:15672`，输入设置的用户名和密码，首次访问可能有点慢。

## 用户相关命令

新增一个用户

```
rabbitmqctl  add_user  Username  Password
```

 删除一个用户

```
rabbitmqctl  delete_user  Username
```

修改用户的密码

```
rabbitmqctl  change_password  Username  Newpassword
```

 查看当前用户列表

```
rabbitmqctl  list_users
```

# 卸载

```
service rabbitmq-server stop
yum list rabbitmq-server
yum remove rabbitmq-server
yum list socat
yum remove socat
yum list erlang
yum remove erlang
```


谢谢大家观看。



