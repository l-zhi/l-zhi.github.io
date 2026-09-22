---
title: "假如HTTP/2已经普及"
date: "2016-05-05T20:07:04+08:00"
description: "一项新技术的来临，总是自上而下的，从标准推出到软硬件支持再到实施，然后普及，这中间总要经历漫长的更新之路。本文我们跨过慢慢长夜，直接讨论假如HTTP/2已经普及，我们前端跟现在会有哪些不同，也许你会觉得太操之过急，没必要这么早开始讨论，然而回看历史，各种技术总会在我们不经意间闯入我们的工作，更新我们的生活，与"
permalink: "2016/05/05/rzzsmac配置"
tags: []
categories: ["前端技术","HTTP2","原创"]
draft: false
unlisted: true
---

一项新技术的来临，总是自上而下的，从标准推出到软硬件支持再到实施，然后普及，这中间总要经历漫长的更新之路。本文我们跨过慢慢长夜，直接讨论`假如`HTTP/2已经普及，我们前端跟现在会有哪些不同，也许你会觉得太操之过急，没必要这么早开始讨论，然而回看历史，各种技术总会在我们不经意间闯入我们的工作，更新我们的生活，与其措手不及不如提早部署，只有心怀远方我们才能走的更远。

<a id="more"></a>

如果不清楚什么是 HTTP/2 的可以先了解下，前面有一篇图文并茂的介绍HTTP/2的文章 [传送门](http://aotu.io/notes/2016/03/17/http2-char/)

## 配置文件

-   先安装 brew install lrzsz
    
-   安装完成后检查 ls -alh /usr/local/bin/sz 是否存在  
    如果出现ls: /usr/local/bin/sz: No such file or directory 执行如下命令  
    xxx-air:bin xxx$ ln -s /usr/local/bin/lrz /usr/local/bin/rz  
    xxx-air:bin xxx$ ln -s /usr/local/bin/lsz /usr/local/bin/sz
    
-   下载  
    [https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh](https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh)  
    [https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh](https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh)  
    分别放到  
    /usr/local/bin/iterm2-send-zmodem.sh  
    /usr/local/bin/iterm2-recv-zmodem.sh
    
-   授权  
    sudo chmod 777 /usr/local/bin/iterm2-\*
    
-   打开iterm2 –> 同时按 command和,键(偏好设置） –> Profiles –> Default –> Advanced –> Triggers的Edit按钮
    

Regular expression Action Parameters  
\*\*B0100 Run Silent Coprocess /usr/local/bin/iterm2-send-zmodem.sh  
\*\*B00000000000000 Run Silent Coprocess /usr/local/bin/iterm2-recv-zmodem.sh

完成~
