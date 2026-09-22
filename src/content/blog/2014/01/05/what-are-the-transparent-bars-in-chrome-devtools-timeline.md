---
title: "Chrome DevTools' timeline"
date: "2014-01-05T19:10:06+08:00"
description: "chrome 开发者工具天天都在用，但是你真的会看么？Timeline 中的柱子是什么意思呢？为什么有的是空的有的是有颜色的呢？"
permalink: "2014/01/05/what-are-the-transparent-bars-in-chrome-devtools-timeline"
tags: []
categories: ["前端技术","翻译"]
draft: false
unlisted: false
---

chrome 开发者工具天天都在用，但是你真的会看么？Timeline 中的柱子是什么意思呢？为什么有的是空的有的是有颜色的呢？  

<a id="more"></a>

这篇文章翻译自：Nat Duca 的一篇小文章 [https://plus.google.com/+NatDuca/posts/BvMgvdnBvaQ?e=-RedirectToSandbox](https://plus.google.com/+NatDuca/posts/BvMgvdnBvaQ?e=-RedirectToSandbox)

  

  

首先给出两张原文没有的图，来加深理解CPU bound 和GPU buoud 。

  

  

（左）图形密集型（GPU bound）和 （右） 计算密集型（CPU bound）

  

[![20140105174438](/img/2014/01/20140105174438.png)](http://l-zhi.com/2014/01/%e8%af%91what-are-the-transparent-bars-in-chrome-devtools-timeline/attachment/20140105174438/)

  

  

下面是原文翻译：

  

  

最近经常有人问，“chrome开发者工具中timeline中的透明区域是什么意思？”这种空心帧其实归根结底就两个原因，要么你的js占用了主线没有空在timeline上渲染，要么就是GPU很忙遇到了性能瓶颈。换句话说就是你的程序要么在忙着处理js要么就是忙着处理图形。不同之处在于，你需要在开发者工具的设置中打开timeline（查看cpu的状态），然后观察记录中的浅灰色条，这些就是线程繁忙的时候渲染出来的。如果线程空闲的时候则没有灰色区域，就比如这个截图，就是GPU比较忙的时候，（即灰色cpu，空心Gpu）  
  

  

  

GPU bound有两个影响因素：

  

1，带有 ‘-webkit-’前缀的渲染， preserves3D 属性的元素，它们就像饿鬼一样消耗GPU。

  

2，带有很多超大的层。消耗GPU的因素不仅仅是层的数量还有层的区域大小。PS：大多数电脑显示器上的像素，被设计者们设计成原始像素的4倍，举个简单的例子：对于一个两年前的macBook air 的显示器LCD的尺寸，接到一个30寸的显示器上，将会出现不止一个层，这样就会触及到GPU bound。  
  

  

为什么会出现这种问题？ 如果层的大小等于window的大小的时候，我们把每一个像素渲染到屏幕上,我们得到了宽高都是100%的div 并设置了 -webkit-transform: translateZ(0)来触发GPU层，一旦每个像素都渲染到屏幕上，把层上的所有区域加起来，如果超过4倍区域在你的屏幕上，也许你就不会那么轻松的渲染上去了（因为你的GPU已经超出负荷了）

  

  

一个很好的测试gpu的边界就是缩小你的屏幕尺寸为原来的1/2，如果依然很慢，然后事情就发生了， 如果变快了，说明就是GPU边界问题了。

  

[![Screen Shot 2013-04-04 at 2.16.40 PM 1](/img/2014/01/Screen-Shot-2013-04-04-at-2.16.40-PM-1.png)](http://l-zhi.com/2014/01/%e8%af%91what-are-the-transparent-bars-in-chrome-devtools-timeline/screen-shot-2013-04-04-at-2-16-40-pm-1/) [![Screen Shot 2013-04-04 at 2.17.23 PM](/img/2014/01/Screen-Shot-2013-04-04-at-2.17.23-PM.png)](http://l-zhi.com/2014/01/%e8%af%91what-are-the-transparent-bars-in-chrome-devtools-timeline/screen-shot-2013-04-04-at-2-17-23-pm/)

  

zp8497586rq
