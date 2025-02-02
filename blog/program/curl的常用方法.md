---
slug: Common methods of curl
title: curl的常用方法
date: 2022-05-25
tags: [Linux]
authors: Clamber
keywords: [curl]
description: curl的常用方法
---

**如果经常和各种API打交道，那curl命令能让你更快的使用这些API。**

<!-- truncate -->

## 1.直接发送请求

```
curl URL 
```
相当于发送一个GET请求，curl默认就是发送GET请求

```
curl https://jsonplaceholder.typicode.com/posts

[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
]
```
## 2.发送post请求

```
curl -X -POST URL 或者简写 curl -XPOST URL
```

```
 curl -XPOST  https://jsonplaceholder.typicode.com/posts

{
  "id": 101
}%
```

## 3.post请求携带参数

```
curl -XPOST URL -d {}
```

```
curl -XPOST  https://jsonplaceholder.typicode.com/posts -d '{"title":"张三"}'

{
  "{\"title\":\"张三\"}": "",
  "id": 101
}%
```

## 4.put请求和delete请求

```
curl -XPUT URL 和 curl -XDELETE URL
```

## 5.携带首部信息

```
curl -XPOST URL -H '' -H '' 可以携带多个首部信息
```

```
curl -XPOST  https://jsonplaceholder.typicode.com/posts -H 'Content-type:application/json' 
			 -H 'A-cc-dept:ap-aption/json' -d '{"title":"张三"}'

{
  "title": "张三",
  "id": 101
}%    
```

## 6.获取响应的所有的首部信息

```
curl -I URL  使用大写I获取
```

```
curl -I https://jsonplaceholder.typicode.com/posts

HTTP/2 200 
date: Wed, 25 May 2022 09:45:40 GMT
content-type: application/json; charset=utf-8
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 999
x-ratelimit-reset: 1651498337
vary: Origin, Accept-Encoding
access-control-allow-credentials: true
cache-control: max-age=43200
pragma: no-cache
expires: -1
x-content-type-options: nosniff
etag: W/"6b80-Ybsq/K6GwwqrYkAsFxqDXGC7DoM"
via: 1.1 vegur
cf-cache-status: HIT
age: 15783
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=0QV1%2BjpuD4iiU6pb3avdUlFdnMylFxe2S8ifRNKsyXVd%2BX1tRY2gE8l5x4F1PQ8hymZVbnkJnSHwCypeZoe6SamqmnVOqUdYL5ymj0FwiaZgokVnYfnkfqd1PDNe2RmXTMI5HRCQ8cRWQFMst8GtP0zT03frH%2BaqAnMF"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
server: cloudflare
cf-ray: 710d56ec0a109645-SJC
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400 
```

## 7.文件下载
```
curl -O URL 直接下载到当前文件夹里面 下载之前记得cd切换文件夹
```

## 8.重命名下载的文件

```
curl -o 文件名 URL (小写o)
```

```
curl -o aa.png https://io.hdslb.com/bfs/archive/ca375eb31fa90b8e23b88ed3433c2f60de1c2e6e.png
```

## 9.限制文件下载速度

```
curl --limit-rate [速度] URL
```

```
curl --limit-rate 100K -o bb.png  https://io.hdslb.com/bfs/archive/ca375eb31fa90b8e23b88ed3433c2f60de1c2e6e.png
```

## 10.中断下载后恢复下载

```
curl -C - URL
```

```
curl -C - -o bb.png   https://io.hdslb.com/bfs/archive/ca375eb31fa90b8e23b88ed3433c2f60de1c2e6e.png
```

## 11.跟随重定向

```
curl URL -L
```

```
curl https://www.bilibili.com -L
```

## 12.显示底层连接信息

```
curl -v URL (小写v) 会显示握手信息等
```

## 13.通过代理访问

```
curl --proxy 协议://用户名:密码@代理地址:端口 URL
curl --proxy "http://egg:123@127.0.0.1:1234" URL
```


## 14.通过不同协议访问

```
curl -u 用户名：密码 -O ftp://server/aaa.avi 下载
curl -u 用户名：密码 -T 文件 ftp://server
```

