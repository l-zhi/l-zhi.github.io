---
title: "内联元素的空隙"
date: "2013-10-05T16:42:18+08:00"
description: "在调试工具中，当鼠标滑到a标签的时候会有两像素错位，并且紧接在下面的元素也会错位（往下移动）两像素。"
permalink: "2013/10/05/inline-space"
tags: []
categories: ["前端技术","原创"]
draft: false
unlisted: false
---

问题起源于一个样式，而且所有前端都遇到过的样式：

[![20131005160429](/img/2013/10/20131005160429.jpg)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/attachment/20131005160429/)

在调试工具中，当鼠标滑到a标签的时候会有两像素错位，并且紧接在下面的元素也会错位（往下移动）两像素。

<a id="more"></a>

这莫名其妙的间隙让我总觉得不自在，而且设计师能用他们的像素眼，一眼相中。虽然偶尔蒙混过关，但是错了毕竟是错了，随时会被指出来，心里发虚，连设计跟我正常的谈理想聊人生的时候，我都觉得他会突然冒出一句“这里有bug，2像素”。

为了睡觉踏实点，还是研究研究这多出来的间隙的问题。

上栗子：

[![clipboard1](/img/2013/10/clipboard1.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard1/)

dom结构是这样的：  

```plain
<div style="background:red">
  <img src="xxx.jpg" >
  <a href="##" style="background:yellow">hyojoo</a>
</div>
```

为了显示清楚我加了不同颜色，图中红色就是错位的2像素（ie6-7是没有颜色的，但是也有明显的空隙）。

首先a标签，img 都是内联元素，所以解析方式是以文档流的方式解析的。

图中的空间是位于下部，很有可能跟对齐方式有关，文档流的对齐属性为：vertical-align，而且默认值是baseline如下图：

[![clipboard2](/img/2013/10/clipboard2.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard2-2/)  

```plain
<a href="##">hyojoo</a>
```

上图为在chrome中显示的样式，a标签的underline刚好在baseline的位置上（其他浏览器解析稍有不同），如果还觉得baseline很虚幻，可以想想我们原来英语本上的四线三格，倒数第二条线就是baseline了。

[![20131003094307](/img/2013/10/20131003094307.jpg)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/attachment/20131003094307/)

像“j,q,y,w”这类字母超过了baseline，而“o，h，i等”这类字母没有baseline以下的部分，所以他们的底部就抵着是baseline。  
“o”和“j”相比，o比j少了baseline以下的部分空间，img刚好也差了一部分空间，应该不会是巧合，肯定有原因的。会不会img解析就类似字母“o”，由于对齐方式是基于baseline的呢？  
写个例子如下图：  
[![clipboard3](/img/2013/10/clipboard3.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard3-2/)

果然，图片的底部刚好跟baseline对齐，就跟字母“o”一样。

找到可能引起错位的原因我们可以尝试改变一下对齐方式vertical-align：bottom.

[![clipboard4](/img/2013/10/clipboard4.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard4-2/)

在ie6+，chrome，firefox 表现方式一致没有空隙问题。但是调试的时候会有一些错误如下（ie和chorme都用开发者工具看的时候，当鼠标定位在a标签上）：

[![clipboard5](/img/2013/10/clipboard5.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard5-2/) [![clipboard6](/img/2013/10/clipboard6.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard6-2/)

ie8下还是会看到错位的情况，但是对布局没有任何影响（下面的名字没有被挤），虽然它在那，但是没什么用装装样子的。

chrome下面图片大概会有一像素超出，这个让我很是纠结了一会儿，于是我又回过头去将问题放大来看，如下(右侧紫色竖线为默认字体高度，红色竖线为默认背景高度)：

[![clipboard](/img/2013/10/clipboard.jpg)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard-2/)

我发现不管是top还是bottom都会有一部分超出，而其他浏览器的解析没有问题如下图：

[![20131003103022](/img/2013/10/20131003103022.jpg)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/attachment/20131003103022/)

如此一来，各浏览器对行内元素的行高解析会有部分差别，chrome的默认字体行高大于背景颜色的高度，而其他浏览器默认行高等于颜色背景的高度（注意：默认行高，不设置任何line-height的时候）

解决方法只要将a标签加上display:inline-block即可（不过就我们要解决的问题而言，可以不考虑，因为图片超出没有任何影响）。

img 加上 vertical-align: bottom 可以解决上面的bug。

当然还有很多其他方法，但是目的都是一样的，都是去除或更改对齐方式，或布局方式，使其不以baseline对齐。比如：

display:block，font-size：0；line-height:0，甚至vertical-align:top | middle 都可以解决这个问题。

甚至还有一个方式就是我尝试删除&lt;!DOCTYPE html> 后不用加任何代码就没有这个bug，怪异模式我们暂时不考虑了，毕竟不是标准。

bug解决了，能睡好觉了，但是我还想推测一下为什么默认要以baseline对齐呢？middel或者bottom不行吗？那样就能节省好多事。

其实是有原因的，首先字母直接以baseline对齐是最美观的，这是为啥一段文字中不能按bottom或者其他方式对齐。如果按bottom对齐的话会是这样的丑陋：

[![ver](/img/2013/10/ver.jpg)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/ver/)

因为美观和英文字母的书写习惯，一段文字中必定只能按照baseline对齐，而一段文字和另一段文字对齐这就涉及到排版问题了，而且既然字母之间都是以baseline对齐的，文档流又是已字母为主，自然而然也以baseline对齐了，以baseline对齐使得我们操作纯文本的时候基本不用考虑vertical-align属性。

所以综上，按照baseline对齐主要是因为字体美观和习惯，而且也没有更好的其他的对齐方案，遇到问题稍微多思考一步，你就会发现很多必然性的东西。

既然谈到空隙问题，不妨扩展一下再谈谈文档流中空隙的其他问题：

文档流中，任何空格回车都会被解析成一个空格，这些空格对文档流布局的伤害是很大的，往往会因为一个空格使得页面效果走样。

尤其需要注意的是，前端做出来的页面和后台程序员交接的时候，必须说明这些点，要不然出现很多莫名其妙的问题，比如下面的例子：

[![clipboard7](/img/2013/10/clipboard7.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard7-2/)

这是sina微博，不惜用注释来提醒后来的程序员注意空格问题。

再举个更直白点的例子：  

```plain
<div class="outer">
	<span class="red">1</span>
	<span class="blue">2</span>
	<span class="yellow">3</span>
	<span class="gray">4</span>
</div>
<div class="outer">
	<span class="red">1</span><span class="blue">2</span><span class="yellow">3</span><span class="gray">4</span>
</div>
```

上面是有空格的（回车会解析成空格），下面是没有空格的，由于为了方便查看我把outer的字体调大到200px，空格也更明显。

我的任务是将上面的空格用各种方法来想办法去掉，达到和下面一致的效果，如下图：

[![20131003110942](/img/2013/10/20131003110942.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/attachment/20131003110942/)

解决方法：

.outer{<em>word-spacing:-1px;font-size: 0}<br>.outer span{</em>word-spacing: normal;font-size: 200px}

  
word-spacing:-1px 主要是为了ie7以下的浏览器，其他浏览器只要将空格的字体大小设置为0px即可，但是也会有问题，比如如果用em作为单位里面的字体大小不容易算出来。

当然最好最完美的方式，当然还是写代码的时候贴在一起，直接完美解决。

还有一个空格用的比较好的属性 text-align: justify; 左右对齐.

它的原理就是利用空格来实现左右对齐，下面是最近完成的一个例子：

[![clipboard9](/img/2013/10/clipboard9.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard9-2/)

中间标签部分需要左右对齐，左右对齐方式很多，比如外层margin-right：-xxx px，不过这样对齐比较复杂，需要不断的调整每一个像素来达到大概对齐的样子。

我的实现方式则是利用text-align:justify 属性，它根据文档流来解析标签，先左右对齐，然后剩下的空格空间来平均分配，来达到左右对齐的方式，这样的对齐是完美的对齐，但是也有一个问题，就是最后一行不能实现左右对齐的。

[![clipboard10](/img/2013/10/clipboard10.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard10/)

上面是dom结构，content样式为： text-align: justify;内部a标签的样式为display：inline-block 即可。

至于最后的fix，才是玄机所在，如果去掉会是这样：

[![clipboard11](/img/2013/10/clipboard11.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard11-2/)

最后一行移位了，没有左右对齐，所以我需要在最后给一个空的fix样式为：

[![clipboard12](/img/2013/10/clipboard12.png)](http://l-zhi.com/2013/10/%e5%86%85%e8%81%94%e5%85%83%e7%b4%a0%e7%9a%84%e7%a9%ba%e9%9a%99/clipboard12-2/)

宽度100%，造成了后面还有一行的假象，使得上面能够左右对齐，这也算是一个障眼法。

而且要记住这里的dom结构里面，空格（或者换行）是必须的，没有空格的话无法用左右对齐的。

总结：

在文档流布局中，空格对布局的影响是很大的，而且各个浏览器解析的空格的大小也不一样，一些利用空格实现的小技巧，小手法，能很容易实现一些看似复杂的样式。

写样式最主要的是明白原理后的创新，而不是似懂非懂的抄袭。

原创文章，可随意转载，但是请注明出处，感谢支持！ 文章地址：[内联元素的空隙](/)

zp8497586rq

zp8497586rq
