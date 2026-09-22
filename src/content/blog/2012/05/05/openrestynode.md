---
title: "服务器性能测评"
date: "2012-05-05T20:07:04+08:00"
description: "条件webbench -c 400 -t 1 http://localhost:8080/xx/"
permalink: "2012/05/05/openrestynode"
tags: []
categories: ["前端技术","HTTP2","原创"]
draft: false
unlisted: false
---

openresty vs node 简要性能测试

## 服务器性能研究

条件  
webbench -c 400 -t 1 [http://localhost:8080/xx/](http://localhost:8080/xx/)

| 测试类型 | 测试结果 |
| --- | --- |
| nginx + html | Speed=20159 pages/min, 34974 bytes/sec. Requests: 336 susceed, 0 failed. |
| nginx + lua | Speed=53279 pages/min, 84452 bytes/sec. Requests: 883 susceed, 5 failed. |
| nginx + node | Speed=30959 pages/min, 35793 bytes/sec. Requests: 478 susceed, 38 failed. |

条件  
webbench -c 400 -t 10 [http://localhost:8080/xx/](http://localhost:8080/xx/)

| 测试类型 | 测试结果 |
| --- | --- |
| nginx + html | Speed=4470 pages/min, 18583 bytes/sec. Requests: 728 susceed, 17 failed. |
| nginx + lua | Speed=35238 pages/min, 88734 bytes/sec. Requests: 5334 susceed, 539 failed. |
| nginx + node | Speed=30924 pages/min, 51807 bytes/sec.Requests: 4215 susceed, 939 failed. |

条件  
webbench -c 400 -t 60 [http://localhost:8080/xx/](http://localhost:8080/xx/)

| 测试类型 | 测试结果 |
| --- | --- |
| nginx + html | Speed=5339 pages/min, 20366 bytes/sec. Requests: 4767 susceed, 572 failed. |
| nginx + lua | Speed=30998 pages/min, 75467 bytes/sec. Requests: 26554 susceed, 4444 failed. |
| nginx + node | Speed=27332 pages/min, 46166 bytes/sec.Requests: 22614 susceed, 4718 failed. |

条件  
webbench -c 400 -t 10 [http://localhost:8080/xx/](http://localhost:8080/xx/)

| 测试类型 | 测试结果 |
| --- | --- |
| nginx + lua + lapis | Speed=1950 pages/min, 3874 bytes/sec. Requests: 149 susceed, 176 failed. |
