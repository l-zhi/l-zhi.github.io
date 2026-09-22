---
title: "Timeline demo: Diagnosing forced synchronous layouts"
date: "2014-01-05T19:34:38+08:00"
description: "这篇文章翻译自https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/"
permalink: "2014/01/05/timeline-demo-diagnosing-forced-synchronous-layouts"
tags: []
categories: ["前端技术","翻译"]
draft: false
unlisted: false
---

这篇文章翻译自[https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/](https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/)

他是一个很小的例子，但是是通过timeline从头到尾测试发现并解决一个性能问题。

<a id="more"></a>

下面是翻译文章：

有一个例子是教你 如何破由于强制同步布局而导致的性能瓶颈，实例应用程序用`[requestAnimationFrame()](http://docs.webplatform.org/wiki/apis/timing/methods/requestAnimationFrame)的基本帧画法，通过几张图片，用动画的形式来回运动，但是我们能很明显的看到掉帧的情况。我们可以用timeline来诊断到底发生了什么。`

## 生成一条记录

首先你将要生成一条这段动画的timeline记录。

1.  点击开始动画
2.  打开timeline面板并且切换到帧视图
3.  点击按钮变红开始记录
4.  跑了大概一秒（10-12帧）的时候停止记录，然后停止动画

## 分析

看第一帧，很清楚的看到已经超过300ms，滑到帧上你可以看到这帧的详细信息。

[![frame-rate](/img/2014/01/frame-rate.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89timeline-demo-diagnosing-forced-synchronous-layouts/frame-rate/)

定位到这个帧动画，会发现有一个黄色的警告，表明被强迫同步布局，说明你的子记录中的代码会有问题，影响到了整条记录。

[![recording-1](/img/2014/01/recording-1.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89timeline-demo-diagnosing-forced-synchronous-layouts/recording-1/)

子记录是一条很长的重绘计算样式和绘制记录，每一个布局记录的结果都是样式计算的结果，每一次requestAnimationFrame()都会要求得到页面上所有图片的offsetTop的值，然而你的鼠标滑过每一条布局记录，并且点击source.js的超链接，然后回调到对应的代码。

[![arning-hover](/img/2014/01/arning-hover.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89timeline-demo-diagnosing-forced-synchronous-layouts/arning-hover/)

资源面板打开第43行的update方法就是回调，回调会计算出图片的left和offsetTop的值，并且立马确定真确的值来计算。

// Animation loop  
function update(timestamp) {  
    for(var m = 0; m &lt; movers.length; m++) {  
        movers\[m\].style.left = ((Math.sin(movers\[m\].offsetTop + timestamp/1000)+1) \* 500) + 'px';  
        }  
    raf = window.requestAnimationFrame(update);  
};

  
他会让每一帧变慢，现在我们来修复这个bug

现在我们可以把问题代码进行修改，并且直接在timeline中测试，是否修复了这个问题。

movers\[m\].style.left = ((Math.sin(m + timestamp/1000)+1) \* 500) + 'px';

  
这个版本是用变量数组来保存left的值。

1.  Cmd-S or Ctrl-保存修改  
    验证结果，动画明显更快更流畅了。

[![fixed](/img/2014/01/fixed.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89timeline-demo-diagnosing-forced-synchronous-layouts/fixed/)

zp8497586rq
