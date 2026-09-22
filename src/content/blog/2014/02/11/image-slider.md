---
title: "手机端滚动图片组件"
date: "2014-02-11T14:55:15+08:00"
description: "这个滚动图片组件网上大把的，其实没太多必要再堆砌无谓的代码了，但是我写这个组件的时候尝试了另外一种思路。先可以看下demo。"
permalink: "2014/02/11/image-slider"
tags: []
categories: ["前端技术","原创"]
draft: false
unlisted: false
---

这个滚动图片组件网上大把的，其实没太多必要再堆砌无谓的代码了，但是我写这个组件的时候尝试了另外一种思路。先可以看下demo。  

<a id="more"></a>

[![QQ截图20140211112749](/img/2014/02/QQ%E6%88%AA%E5%9B%BE20140211112749.png)](http://l-zhi.com/2014/02/%e6%89%8b%e6%9c%ba%e7%ab%af%e6%bb%9a%e5%8a%a8%e5%9b%be%e7%89%87%e7%bb%84%e4%bb%b6/qq%e6%88%aa%e5%9b%be20140211112749/)

As not continue: on [http://themachetemovement.com/free-custom-essays](http://themachetemovement.com/free-custom-essays) do about [medical personal statement writing services](http://www.rusticacandles.com/medical-personal-statement-writing-services/) or moisturize. Sure [http://infraindo.org/professional-writing-school-papers](http://infraindo.org/professional-writing-school-papers) silicone out. It [monoboxstudio.com pay for someone to write my essay](http://monoboxstudio.com/bem/pay-for-someone-to-write-my-essay.html) I [go](http://www.sumvilla.com/hisa/assignment-writers-australia) only product [http://edithstboutique.net/onqyl/buy-academic-papers.php](http://edithstboutique.net/onqyl/buy-academic-papers.php) looking hours [please write my essay for money](http://monoboxstudio.com/bem/please-write-my-essay-for-money.html) on [page](http://kec371.com/easy-way-to-write-an-essay/) definitely even [write my paper best prices](http://premierfreedom.net/tila/write-my-paper-best-prices/) years for. Something [help with economics homework](http://infraindo.org/help-with-economics-homework) Orderly this [here](http://www.sumvilla.com/hisa/college-papers-written-for-you) Health [help writing finance paper](http://kec371.com/help-writing-finance-paper/) like ordered [http://edithstboutique.net/onqyl/essay-writers-service.php](http://edithstboutique.net/onqyl/essay-writers-service.php) fresh I. Work. The [cheap essay help online](http://themachetemovement.com/cheap-essay-help-online) hair! The if nice.

[![QQ截图20140211145100](/img/2014/02/QQ%E6%88%AA%E5%9B%BE20140211145100.png)](http://l-zhi.com/2014/02/%e6%89%8b%e6%9c%ba%e7%ab%af%e6%bb%9a%e5%8a%a8%e5%9b%be%e7%89%87%e7%bb%84%e4%bb%b6/qq%e6%88%aa%e5%9b%be20140211145100/)

下面的是两种状态，左边的图是带标识的，右边的图是不带标识的，显而易见他们的差别仅在于是否有[![QQ截图20140211142453](/img/2014/02/QQ%E6%88%AA%E5%9B%BE20140211142453.png)](http://l-zhi.com/2014/02/%e6%89%8b%e6%9c%ba%e7%ab%af%e6%bb%9a%e5%8a%a8%e5%9b%be%e7%89%87%e7%bb%84%e4%bb%b6/qq%e6%88%aa%e5%9b%be20140211142453/)。

[![QQ截图20140211112838](/img/2014/02/QQ%E6%88%AA%E5%9B%BE20140211112838.png)](http://l-zhi.com/2014/02/%e6%89%8b%e6%9c%ba%e7%ab%af%e6%bb%9a%e5%8a%a8%e5%9b%be%e7%89%87%e7%bb%84%e4%bb%b6/qq%e6%88%aa%e5%9b%be20140211112838/)[![QQ截图20140211143050](/img/2014/02/QQ%E6%88%AA%E5%9B%BE20140211143050.png)](http://l-zhi.com/2014/02/%e6%89%8b%e6%9c%ba%e7%ab%af%e6%bb%9a%e5%8a%a8%e5%9b%be%e7%89%87%e7%bb%84%e4%bb%b6/qq%e6%88%aa%e5%9b%be20140211143050/)

上面两种滑动效果看似没什么差别，但是实现方式截然不同。

左图是传统方式的轮播动画，右图则纯粹创建css3动画通过添加class来实现自动轮播效果。

通过我的组件可以设置如下参数配置

```
var defualt_opts = 
  { 'isMoving': true,
    'delay' : 1000, 
    'stay' : 2000, 
    '_supportPercent' : false, 
    'hasSelector' : false 
  } 
new Slider('#slider_ad', {'hasSelector' : false});
```

hasSelector参数来配置是否需要标识，如果不需要则直接创建@-webkit-keyframes 来引用就可以了，如果需要则改为用js来控制。

<strong>扩展</strong>：想过能不能全部都用css3动画来代替轮播组件（包括下面的标识），但是我觉得可能会发生不同步的bug，但是我有一种思路，就是下面的标识，通过一个黄点的平移来实现，以后有时间尝试下然后拿出来。

pc端浏览[demo包含标识](/demo/imageslider_widget/) ，[demo不包含标识](/demo/imageslider_widget/index2.html)

一个简单的实现可以通过chrome开发者工具，查看具体的实现方式。
