---
slug: Coturn installation and deployment
title: coturn安装和部署
date: 2024-01-29
authors: Clamber
tags: [Coturn]
keywords: [Coturn,打洞,Webrtc]
description: coturn安装和部署
---

<!-- truncate -->
### 1.下载安装编译
```
  git clone https://github.com/coturn/coturn
  cd coturn
  ./configure
  make && make install
```

如果./configure失败的话，应该是需要openssl和Libevent2
```
    yum install -y openssl openssl-devel
    yum -y install libevent-devel
```
### 2.修改配置文件

1.把example/etc里面的turnserver.conf拷贝到bin文件夹：
```
    cp examples/etc/turnserver.conf bin/turnserver.conf



    #监听的网卡，第12行
    listening-device=eth0

    #监听的端口，第18行
    listening-port=3478

    #绑定的公网地址，第120行
    external-ip=114.55.98.33

    #UDP端口号最小值，第149行
    min-port=49152

    #UDP端口号最大值，第150行
    max-port=65535

    #账号和密码，第245行
    user=admin:***

    #服务器域名，第339行
    realm=www.xiongbinbin.club

    #SSL证书，第439行
    cert=/etc/nginx/cert/www.xiongbinbin.club.pem

    #SSL密钥，第446行
    pkey=/etc/nginx/cert/www.xiongbinbin.club.key

    #cli密码，第666行
    cli-password=***
```
### 3.启动服务
```
    cd bin
    turnserver -v -r 118.24.78.34:3478 -a -o
```
搭建好后可以在 [WebRTC samples](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) 测试一下有没有成功
