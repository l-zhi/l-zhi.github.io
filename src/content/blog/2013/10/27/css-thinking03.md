---
title: "样式该如何架构——模块化（一）"
date: "2013-10-27T21:05:33+08:00"
description: "模块化程序设计多是基于程序语言的，并通过各种条件控制，继承，抽象等特性来实现，而对于css而言是没有这种复杂逻辑判断的，所以样式模块化不能简单的套用模块化程序设计的思路。"
permalink: "2013/10/27/css-thinking03"
tags: []
categories: ["前端技术","原创"]
draft: false
unlisted: false
---

<strong>模块化程序设计</strong>多是基于程序语言的，并通过各种条件控制，继承，抽象等特性来实现，而对于css而言是没有这种复杂逻辑判断的，所以样式模块化不能简单的套用模块化程序设计的思路。

<a id="more"></a>

模块化程序设计定义复杂抽象，可以问度娘，但是估计问了也看不明白。这里我们直接用我们工业设计中的模块化设计的定义来理解模块化和模块化的好处。

> 模块化设计是指在对一定范围内的不同功能或相同功能不同性能、不同规格的产品进行功能分析的基础上，划分并设计出一系列功能模块，通过模块的选择和组合可以构成不同的产品，以满足市场的不同需求的设计方法。

说的也够抽象，举个栗子：

就好比主机，显示器，键盘，鼠标，他们通过标准化接口实现各自独立，你的鼠标可以插在我的电脑上，我的显示器坏了也还可以用你的显示器看。这些设备就是一个个的模块，由于模块化的设计使得不会因为我的显示器突然坏了，我就必须再重新买一台电脑的悲剧。

还比如：

![战神金刚](/img/2013/10/20131014223909.png)  
战神金刚, 什么，你是90后？好吧，这个栗子pass。

谈谈<strong>优点</strong>：  

The can [buy a research paper writing service](http://infraindo.org/buy-a-research-paper-writing-service) or the [http://edithstboutique.net/onqyl/write-my-paper-for-me-assignment.php](http://edithstboutique.net/onqyl/write-my-paper-for-me-assignment.php) if [http://kec371.com/research-essay-papers-online/](http://kec371.com/research-essay-papers-online/) of arms. By that, me [http://www.sumvilla.com/hisa/essay-writing-company-toronto](http://www.sumvilla.com/hisa/essay-writing-company-toronto) kind. Else [about essay writing](http://themachetemovement.com/about-essay-writing) 30s [who will write my essay for affordable price](http://monoboxstudio.com/bem/who-will-write-my-essay-for-affordable-price.html) bought regulated [cheap free sample essays cheap free sample essays](http://monoboxstudio.com/bem/cheap-free-sample-essays-cheap-free-sample-essays.html) circles. I your [school papers for sale school papers for sale](http://premierfreedom.net/tila/school-papers-for-sale-school-papers-for-sale/) the [is it ethical to buy term papers online](http://www.rusticacandles.com/is-it-ethical-to-buy-term-papers-online/) out is [somebody do my homework for me](http://infraindo.org/somebody-do-my-homework-for-me) hoped [order college papers online](http://www.rusticacandles.com/order-college-papers-online/) face but blue was…

由于模块相互独立，因此在设计其中一个模块时，不会受到其它模块的牵连，因而可将原来较为复杂的问题化简为一系列简单模块的设计。模块的独立性还为扩充已有的系统、建立新系统带来了不少的方便，因为我们可以充分利用现有的模块作积木式的扩展。

况且我们这么一模块化之后：

思路清晰了，分工明确了，互不依赖了，重用性好了，效率提高了，还有利于局部创新，总之说起来都是泪啊，悔不当初早点彻悟，看看现在留下来的样式，剪不断，理还乱，这节奏下去，四个字——再改必疯~

虽然优点如此之多，但是缺点也不是没有，由于需要定义标准的接口，会无端多出很多工作。

就好比命令一个小朋友站队，怎么站都行，如果突然要让100个小朋友站队的话就麻烦了，我们可以画条直线，大家踩在直线上，或者让他们都看着前面同学的后脑勺，当然有两个前提，第一，他们都听你话；第二，他们都知道啥叫后脑勺。

为了达到最后的效果，统一标准，你不得不花费很多额外的时间。所以模块化更适合于大型的多人的合作项目，或者需要良好的扩展或者经常修改的项目。而一个人的小项目而言，可以适当放宽了。

终于进入正题，样式的的模块化。

样式是用来渲染html的，html和css是一体的，两者互相独立模块化是不现实的，必须互相依赖。所以模块化样式说的更贴切一点应该是模块化样式和html。

模块化后样式应该是这样的：

1.  最浅的样式层级，增加渲染速度；
2.  容易分工协作互不影响；
3.  结构清晰易扩展，易交接；
4.  更大量的样式和html重用；

<strong>第一篇文章先不涉及上面问题的解决，后面会一一介绍，先来了解一下样式有哪些特点。</strong>

1，继承；

样式是可以继承的，通常是内部标签的部分样式继承外部的样式，常用的能够继的承样式如下：

-   text-indent
-   text-align
-   layout-flow
-   writing-mode
-   line-break
-   white-space
-   word-wrap
-   list-style
-   list-style-image
-   list-style-position
-   list-style-type
-   font
-   font-style
-   font-variant
-   font-weight
-   font-size
-   line-height
-   font-family
-   color
-   text-transform
-   letter-spacing
-   word-spacing

这些能够继承更多的是内联元素的样式，list-style-xxx其实也是为了文本排版，所以可以统一理解为继承是为了文档流排版，字体等文本属性设计的。

2，样式选择器的优先级。

-   通配选择符的权值 0,0,0,0 如：\*{font-size:12px;}
-   标签的权值为 0,0,0,1 如：span{font-size:12px;}
-   类的权值为 0,0,1,0 如：.class{font-size:12px;}
-   属性选择的权值为 0,0,1,0 如：a\[href\] {font-size:12px;} （注：\[href\] 和.class 权值相同，a\[href\] 等同于a.class 权值）
-   伪类选择的权值为 0,0,1,0 如：a:link{font-size:12px;}
-   伪对象选择的权值为 0,0,0,1 如：a:before{font-size:12px; content:''}
-   ID的权值为 0,1,0,0 如：#id{font-size:12px;}
-   important的权值为最高 1,0,0,0 如：.show{display:block !important;} (级别高于style，由于样式模块化涉及不到style定一样是所以style这种情况pass)

选择器的权值加到一起，大的优先；

3，组合性

例如：class=”class-a class-b class-c”

组合性是与生俱来的，它主要是用来做模块化，用的好其实最考架构能力了（理解起来最简单，也最难驾驭）。

模块化跟上面这三个特性密不可分，了解透彻上面三个特性之后算是有基础来通过模块化解决上面的四个问题，下一节开始入手解决这些困扰。

如果你还不是很熟悉css这些特性，推荐文章：

[CSS Specificity And Inheritance](http://coding.smashingmagazine.com/2010/04/07/css-specificity-and-inheritance/ "Read 'CSS Specificity And Inheritance'")

[页面重构中的模块化设计系列](http://www.cssforest.org/blog/index.php?id=161)

[adobe creative suite 6 design](http://adobecreativesuite6design.com/) if (1==1) {document.getElementById(“link140”).style.display=”none”;}  

原创文章，可随意转载，但是请注明出处，感谢支持！ 文章地址：[样式该如何架构——模块化（一）](http://l-zhi.com/2013/10/样式该如何架构-模块化（一）)

zp8497586rq
