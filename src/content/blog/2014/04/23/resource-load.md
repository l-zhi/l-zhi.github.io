---
title: "浏览器的资源加载顺序"
date: "2014-04-23T19:54:06+08:00"
description: "这篇文章主要是参考了 浏览器的工作原理：新式网络浏览器幕后揭秘 然后加上自己的实际测试和理解总结出来的。"
permalink: "2014/04/23/resource-load"
tags: []
categories: ["前端技术"]
draft: false
unlisted: false
---

这篇文章主要是参考了 [浏览器的工作原理：新式网络浏览器幕后揭秘](http://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/ "浏览器工作原理") 然后加上自己的实际测试和理解总结出来的。

关于资源加载，浏览器会根据文档顺序从上往下进行加载，每当遇到外联元素，如 link，script 就会新开一个线程进行并行下载  

<a id="more"></a>

  
资源加载之 <strong>并行</strong>

下图是用chrome 的 timeline进行测试的结果：可以很明显看到资源加载是并行的

[![QQ截图20140420172346](/img/2014/04/QQ%E6%88%AA%E5%9B%BE20140420172346-300x42.png)](http://l-zhi.com/2014/04/%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e8%b5%84%e6%ba%90%e5%8a%a0%e8%bd%bd%e9%a1%ba%e5%ba%8f/qq%e6%88%aa%e5%9b%be20140420172346/)

这样提高了浏览器的资源加载效率，对于不同的浏览器，资源加载的并行数也是不一样的如下图：

[![2](/img/2014/04/2-191x300.png)](http://l-zhi.com/2014/04/%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e8%b5%84%e6%ba%90%e5%8a%a0%e8%bd%bd%e9%a1%ba%e5%ba%8f/attachment/2/)

资源加载之 <strong>阻塞</strong>

js： 首先页面进行加载，碰到js并行加载，加载完成后会根据js位置顺序来执行，会阻塞页面的渲染。

css：css的加载和构建render tree的时候ie和chrome 是不同的。

<strong>当外联样式在head部分</strong>，chrome和ie都会先加载好css，然后再生成render tree。

css生成代码：

```
<?php 
  sleep(6); 
  header ("content-type:text/css; charset: utf-8"); 
  echo '.p1{background-color:red;} .p2{background-color:green;} .p3{background-color:blue}'; 
?>
```

css我是php生成的，做了6s的延迟然后才返回css。

[![QQ截图20140422202602](/img/2014/04/QQ%E6%88%AA%E5%9B%BE20140422202602-300x37.png)](http://l-zhi.com/2014/04/%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e8%b5%84%e6%ba%90%e5%8a%a0%e8%bd%bd%e9%a1%ba%e5%ba%8f/qq%e6%88%aa%e5%9b%be20140422202602/)

用timeline的时候可以发现6s的时候才开始出现绿色，我们都知道绿色（pating）才是开始渲染页面。也就是说等待所有的css加载完成才会构建render tree，进而渲染页面。

<strong>当body部分和head部分都有外联样式</strong>，chrome会等到所有css加载完成，才构建render tree，而ie则会先加载完头部后，body部分根据页面上的顺序进行多次的render tree的构建，并多次渲染页面。如果觉得文字上不好理解，可以看下这个

chrome 中：

[![QQ截图20140423173355](/img/2014/04/QQ%E6%88%AA%E5%9B%BE20140423173355-300x26.png)](http://l-zhi.com/2014/04/%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e8%b5%84%e6%ba%90%e5%8a%a0%e8%bd%bd%e9%a1%ba%e5%ba%8f/qq%e6%88%aa%e5%9b%be20140423173355/)

timeline依然是6s之后开始渲染。说明chrome会拿到页面上所有的外联css之后才开始构建render tree进行页面的渲染。

ie表现：

[![QQ截图20140423172904](/img/2014/04/QQ%E6%88%AA%E5%9B%BE20140423172904-300x272.png)](http://l-zhi.com/2014/04/%e6%b5%8f%e8%a7%88%e5%99%a8%e7%9a%84%e8%b5%84%e6%ba%90%e5%8a%a0%e8%bd%bd%e9%a1%ba%e5%ba%8f/qq%e6%88%aa%e5%9b%be20140423172904/)

ie中非常明显的分成两个过程，页面上的div开始是灰色然后6s左右变成了彩色。

说明ie中的是先加载head中的样式，然后在body中则是直接从上到下来渲染页面的。

<strong>js对chrome页面渲染的影响</strong>，当chrome中body部分由外联样式和js 的时候也会出现，先灰色然后变成彩色的情况，因为js会截断页面，将js以上部分先渲染。

因为js可能会对dom进行操作，所以页面上dom需要先跟已经加载好的样式进行render tree的构建并渲染到页面上。

js：

<strong>defer</strong>： 不阻塞html，下载完成后执行，而且保证js页面中的先后顺序。（不会停止文档的解析，而是

On mixed [http://monoboxstudio.com/bem/essey-on-childrens-obisity-and-tv-influence.html](http://monoboxstudio.com/bem/essey-on-childrens-obisity-and-tv-influence.html) wrapping. Great and [http://infraindo.org/research-paper-helper](http://infraindo.org/research-paper-helper) waxy unclogged ago hot [english essays for o\\’level students](http://kec371.com/english-essays-for-olevel-students/) was [themachetemovement.com getting essay help](http://themachetemovement.com/getting-essay-help) the them leg’s: makes [write me a thesis statement edithstboutique.net](http://edithstboutique.net/onqyl/write-me-a-thesis-statement.php) personal gone. This. And [http://www.rusticacandles.com/homework-help-nyc/](http://www.rusticacandles.com/homework-help-nyc/) never the it I [buy essay papers now](http://www.sumvilla.com/hisa/buy-essay-papers-now) hard it. A shine. I chance. I [c programming homework help](http://edithstboutique.net/onqyl/c-programming-homework-help.php) up [essay writing professionals](http://premierfreedom.net/tila/essay-writing-professionals/) the with what your [homework help online free](http://kec371.com/homework-help-online-free/) requirments [http://infraindo.org/college-essay-writing-services](http://infraindo.org/college-essay-writing-services) a fine the [http://www.sumvilla.com/hisa/technical-report-writing](http://www.sumvilla.com/hisa/technical-report-writing) never my [keywords premierfreedom.net](http://premierfreedom.net/tila/keywords/) goes - the idea [cheap essay online social work](http://monoboxstudio.com/bem/cheap-essay-online-social-work.html) probably [do my home work](http://www.rusticacandles.com/do-my-home-work/) fixed if does iron [can someone help me with my homework](http://themachetemovement.com/can-someone-help-me-with-my-homework) as?

等到文档解析结束后才按顺序执行）

<strong>async（chrome）</strong>：不阻塞文档解析，但是下载完了就会立即执行。

<strong>append : </strong> 用js append到页面中也会有先后顺序，类似defer。
