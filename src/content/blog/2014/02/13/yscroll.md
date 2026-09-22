---
title: "超轻量级手机端区域滚动组件——Yscroll"
date: "2014-02-13T11:21:03+08:00"
description: "这个组件是从原来侧滑的组件抽出来的，一个轻量级区域滚动组件。github 地址"
permalink: "2014/02/13/yscroll"
tags: []
categories: ["前端技术","原创"]
draft: false
unlisted: false
---

这个组件是从原来侧滑的组件抽出来的，一个轻量级区域滚动组件。  

<a id="more"></a>

  
[github 地址](https://github.com/l-zhi/yscroll/)

Yscroll配置参数：  

```plain
{ 
  Scontainer : '.slider_cont', //滚动的内层选择器 
  hScroll : true, // 是否开启横向滚动 
  vScroll : true, // 是否开启纵向滚动 
  momentum : true, //是否开启缓动 
  lockDirection : true //是否开启当一个方向滚动锁定另一边的滚动 
}
```

<strong>调用方法：</strong>

添加链接:  

```plain
<script src="http://www.l-zhi.com/demo/lib/yscroll.js" ></script>;
```

然后通过下面的方法实例化：

```plain
new Scroller('#slider',{ 
  Scontainer : '.slider_cont', 
  hScroll : true, 
  vScroll : true, 
  momentum : false, 
  lockDirection : true 
});
```
