---
title: "样式该如何架构——模块化（二)"
date: "2013-11-07T00:32:09+08:00"
description: "此篇文章还是为模块化做铺垫，主要研究的是样式的渲染方式及效率问题。"
permalink: "2013/11/07/css-thinking02"
tags: []
categories: ["前端技术","原创"]
draft: false
unlisted: false
---

此篇文章还是为模块化做铺垫，主要研究的是样式的渲染方式及效率问题。

<a id="more"></a>

[![20131106205327](/img/2013/11/QQ%E6%88%AA%E5%9B%BE20131106205327.png)](http://l-zhi.com/2013/11/%e6%a0%b7%e5%bc%8f%e8%af%a5%e5%a6%82%e4%bd%95%e6%9e%b6%e6%9e%84-%e6%a8%a1%e5%9d%97%e5%8c%96%e4%ba%8c/qq%e6%88%aa%e5%9b%be20131106205327/)

上图红色边框的部分就是一个页面加载中html和css渲染的信息，依次为<strong>html解析、样式解析、布局、绘制</strong>四块，这四部分反应了一个页面的渲染效率。

（<strong>一</strong>） <strong>Parse HTML</strong> —— 将DOM 元素和属性节点解析成DOM树。

当然解析过程中效率问题也是显而易见的，比如是否有结束标签，以及嵌套是否正确，由于Parse HTML的时候会有容错机制所以如果标签结构出错需要额外的解析来进行容错。

比如下面的例子：  

```plain
<p>nihao<p>wohao</p></p>
```

我们在chrome中解析会是这样的：

[![QQ截图20131106214325](/img/2013/11/QQ%E6%88%AA%E5%9B%BE20131106214325.png)](http://l-zhi.com/2013/11/%e6%a0%b7%e5%bc%8f%e8%af%a5%e5%a6%82%e4%bd%95%e6%9e%b6%e6%9e%84-%e6%a8%a1%e5%9d%97%e5%8c%96%e4%ba%8c/qq%e6%88%aa%e5%9b%be20131106214325/)

由于dom嵌套问题而带来的容错解析。不仅结果不对，而且存在了额外开销。同样问题还有标签使用不当，属性写法不对，因为这些都需要浏览器进行容错解析，所以比较耗时，因此性能优化中少出错和精简dom是很必要的。

（<strong>二</strong>）<strong>style recalculation（<strong>Parse CSS</strong> ） </strong> —— 整理样式结构来加速查找渲染。

首先根据dom树会生成一个<strong>呈现树</strong>，<strong>呈现树</strong>是对dom树的一个解释<strong>，呈现树</strong>是用来规定渲染顺序以及渲染方式。（如图右侧紫色的树就是<strong>呈现树</strong>）

[![image025](/img/2013/11/image025.png)](http://l-zhi.com/2013/11/%e6%a0%b7%e5%bc%8f%e8%af%a5%e5%a6%82%e4%bd%95%e6%9e%b6%e6%9e%84-%e6%a8%a1%e5%9d%97%e5%8c%96%e4%ba%8c/image025/)

样式表和dom结构，一定是通过dom结构来查找匹配的样式进行渲染，而不会解析样式表根据某条样式来查找dom结构。如此一来，当我开始渲染的时候发现了一个dom，然后会查询样式表，但是问题来了，一个dom来遍历一遍样式表，当然效率太低，所以浏览器会先整理样式表。

如何整理呢？ 样式表有几种选择器包括 <strong>id、**</strong>class、标签、属性、伪类，<strong>整理样式的时候会根据样式表中选择器的</strong>最右边\*\*的元素来分到不同的队列，比如：p.class{} 会归为class队列， div span{}则会归为标签队列，以此类推，还有存放复杂元素的通用队列等。以上两步都是为了加快样式的解析速度所做的准备，当然优化远不止这些，如果你有兴趣更多了解优化机制可以看[这里](http://taligarsiel.com/Projects/howbrowserswork1.htm#Webkit_CSS_parser) 。

从分队列可以看出样式表的书写应该注意哪些了，层级关系是最主要的一条，因为当匹配一个选择器成功之后，还需要遍历dom拿到父节点的选择器是否匹配样式选择器，这样的遍历会增大开销。

如：ul.class 渲染肯定慢于 .class，因为当得到.class 后还得遍历是否是ul的子元素。

通过上面的例子，更让人发疯的是用的标签如：div table span，它的匹配会遍历会更多dom， 所以尽量减少层级和选择器是我们优化样式表很重要的一环，当然还有下面的因素：

> Google 资深web开发工程师Steve Souders对CSS选择器的效率从高到低做了一个排序：
> 
> 1.id选择器（#myid）
> 
> 2.类选择器（.myclassname）
> 
> 3.标签选择器（div,h1,p）
> 
> 4.相邻选择器（h1+p）
> 
> 5.子选择器（ul &lt; li）
> 
> 6.后代选择器（li a）
> 
> 7.通配符选择器（\*）
> 
> 8.属性选择器（a\[rel=”external”\]）
> 
> 9.伪类选择器（a:hover,li:nth-child）

（<strong>三</strong>）<strong>layout </strong> —— 布局

通过计算宽度、高度、x、y计算出呈现树元素的位置和宽高进行页面布局，等待下一步进行渲染。

布局的时候会出现一些问题会导致重新渲染，比如图片没有给定宽高，加载图片比较慢，加载完得到宽高了还得重新布局（也就是通常说的reflow），会降低布局效率，还有百分比如：width:61%，布局的过程中需要计算出绝对数值进行布局。

（<strong>四</strong>）<strong>paint</strong>—— 绘制

进行样式的绘制主要包括下面的样式：

1.  背景颜色
2.  背景图片
3.  边框
4.  子代
5.  轮廓

绘制中存在的效率问题也很多比如圆角（border-radius）效率就很成问题，还有样式的缩写，简化等，这里就不一一列举了。

简单的分析了一下浏览器的渲染方式（主要针对webkit），这个对理解样式的架构和对渲染阶段性能的测试，优化是很有好处的。

参考：

[How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm)

[Optimize browser rendering](https://developers.google.com/speed/docs/best-practices/rendering?hl=EN)

[复杂应用的 CSS 性能分析和优化建议](http://www.orzpoint.com/profiling-css-and-optimization-notes/ "Permanent Link to 复杂应用的 CSS 性能分析和优化建议")

原创文章，可随意转载，但是请注明出处，感谢支持！ 文章地址：[样式该如何架构——模块化（二）](/)

zp8497586rq
