---
title: "rz配置"
date: "2013-05-05T20:07:04+08:00"
description: "安装完成后检查 ls -alh /usr/local/bin/sz 是否存在如果出现ls: /usr/local/bin/sz: No such file or directory 执行如下命令xxx-air:bin xxx$ ln -s /usr/local/bin/lrz /usr/local/bin/r"
permalink: "2013/05/05/rzzsmac"
tags: []
categories: ["前端技术","HTTP2","原创"]
draft: false
unlisted: false
---

一配置rz，方便与服务器数据传输。

<a id="more"></a>

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
