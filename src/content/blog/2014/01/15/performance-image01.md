---
title: "图片拖慢了你的网站？试试这种方法吧"
date: "2014-01-15T09:47:11+08:00"
description: "http://aerotwist.com/blog/one-weird-trick/chrome计算和布局的时候会”光栅化“你页面上所有的像素。 在chrome中光栅化器也叫Skia，它会根据你的页面上的可见元素产生一系列的绘制事件，这其中就有图片（可能是image标签或者是用图片当做背景）。"
permalink: "2014/01/15/performance-image01"
tags: []
categories: ["未分类"]
draft: false
unlisted: false
---

[http://aerotwist.com/blog/one-weird-trick/](http://aerotwist.com/blog/one-weird-trick/)  
chrome计算和布局的时候会”光栅化“你页面上所有的像素。 在chrome中光栅化器也叫Skia，它会根据你的页面上的可见元素产生一系列的绘制事件，这其中就有图片（可能是image标签或者是用图片当做背景）。  

<a id="more"></a>

  

skia有一个绘制方法就是将一张图片进行解码（可能是解码一张jpeg，png，webp，或者是gif）解码后编码成位图，也有可能会调整图片的大小。这些会发生在同一行其他元素绘制的时候，所以解码或者调整大小，所以这些花了大量的时间，可能还会导致你的站点或者应用程序为无响应，反应更慢。

\>

术语解释：

checkerboarding：如果你不是很熟悉checkerboarding，想想当你快速滑动你的手机或者平板，你会发现页面上会出现大块的区域空白，有点像ps中的透明图层。

现在知道什么是checkerbordering了吧。

因此我在想能否打破这种浏览器“内部的游戏”（理解为内部的渲染机制）。我会问自己：作为一个开发者我是否能控制解码和图片自己的大小调整？我要做点什么能才能打破这种浏览器内部自动渲染机制呢？

让我们再看看我们现在面临的问题。

<strong>解码和大小的调整</strong>

每当我们滚动或者一系列连续复杂的动作在一个页面中，个元素互相作用的时候，chrome也许在最后决定在页面上绘制一个新的区域。

[![ensiveimages](/img/2014/01/ensiveimages1.png)](http://l-zhi.com/2014/01/%e8%af%91%e5%9b%be%e7%89%87%e6%8b%96%e6%85%a2%e4%ba%86%e4%bd%a0%e7%9a%84%e7%bd%91%e7%ab%99%ef%bc%9f%e8%af%95%e8%af%95%e8%bf%99%e7%a7%8d%e6%96%b9%e6%b3%95%e5%90%a7/ensiveimages-2/)  

当浏览器开始绘制一张图片的时候，chrome遇到一个image图片文件，会将源文件的jpeg，gif，png或者webp格式化成一张位图存在内存里。有趣的是你可以通过各种算法来解码，这可能比你保存图片更大或者更小。但是多次的更改大小，是必要的的，特别是对响应式设计和按百分比计算的元素，或者当用户自己的放大缩小的时候。

解码和改变大小都是很昂贵的操作，如果光栅化需要几张图片的解码和大小的调整，你会发现这一帧会消耗大量的时间才能渲染完成。（帧就是 浏览器渲染页面的频率）。

chrome， 当然尝试通过缓存来减少图片大小的调整和解码。缓存细节—多大的缓存能够完成一张图片的 解码和调整大小（我们称之为单线程和多线程）这是chrome尝试做的。

当运行浏览器做一些操作的时候，你是否看到了闪烁（jank）或者checkerbording 大量的图片通过chrome进行解码（作为一个开发者需要注意的），让我们看看这都会有哪些影响是怎么影响的。（个人感觉chrome在pc上不是特别明显，但是在手机端很明显）。

<strong>单线程绘制</strong>

在这种单线程绘制是运行在页面的主线程中，这是现在pc浏览器主要用到的方式。

当光栅化，图片解码和更改大，发生在主线程，所有其他的主线程的任务将会被阻塞。页面将会感觉到颤抖，更遭的还可能会停止响应一段时间。

如果你是在做相册或者有大量图片的应用的时候你会发现图片断断续续的出现在屏幕上而且卡顿，你就会感觉到问题更加尖锐

<strong>多线程绘制</strong>

这种模式绘制会以不同的方式运行（在其他的线程中），这意味着 主线程有空闲来运行js，layout和style 解析，这种方式主要运用在android。用这种方法后

Got way [i want an expert to do my assignment](http://premierfreedom.net/tila/i-want-an-expert-to-do-my-assignment/) I I before [order custom essays](http://themachetemovement.com/order-custom-essays) have already [http://infraindo.org/cheapest-essay-writing-service-uk](http://infraindo.org/cheapest-essay-writing-service-uk) see I [cheap quality essay onlines](http://monoboxstudio.com/bem/cheap-quality-essay-onlines.html) it GREAT and [using paper writing services](http://kec371.com/using-paper-writing-services/) a [write college research paper](http://infraindo.org/write-college-research-paper) personally [best essay written](http://edithstboutique.net/onqyl/best-essay-written.php) instead [http://www.rusticacandles.com/write-a-essay-on/](http://www.rusticacandles.com/write-a-essay-on/) comparison [“site”](http://www.sumvilla.com/hisa/tutors-online-free) working. I’ll just.

滚动，js 更加会在painting发生之前准备好。

这种模式光栅化依然会连续的执行，甚至他们会在同一个线程，我们不得不停止解析和更改图片的大小，然后没有其他的绘制 就像没有图片元素出现一样。图片处理 列表中依然会有一个光栅化的工作，入股偶一个图片花费很长时间进行解码或者更改大小，你将会结束checkboards直到chrome结束任务列表而且光栅化完成。

<strong>也许会有一个怪异的想法….</strong>

你尝试过在一个充满图片的页面，将图片关闭？ 当然整个页面看起来会很糟糕。因为没有图片，但是你也会快速的看到图片对一个页面的性能影响。

然而，替代浏览器的解码，我们可以自己进行解码，在js和外部的光栅化？也许如果我们可以解码和更改大小，让chrome来不被阻塞的光栅化图片。那样就意味着我们可以处理页面上的滑动和被大家都希望的很好的60fps滑动体验。

下面我们会自己来处理图片，就像chrome自动处理图片的那样，会有大量红色标记给我们。上面说的，如果chrome处理图片没有被阻塞，我们将会避免掉checkboarding 和 闪烁。

运行一个js解码图片，我们需要这么来做：

1.  创建一个web workers 池。
2.  需要一张placeholder图片。
3.  从web workers池中 传输一个image的url 来进行解码。
4.  用xhr下载一个二进制图片，然后用js本地进行解码。
5.  传输解码后的位图到主线程。
6.  用位图图片通过canvas来得到正确大小的canvas元素。
7.  将canvas替换掉palceholders。
    

当然没有什么点子会比一个demo还实用：

[https://dl.dropboxusercontent.com/u/2272348/codez/resizes/index.html](https://dl.dropboxusercontent.com/u/2272348/codez/resizes/index.html)

这个demo意味着当你滚动浏览器或者其他事件，你将会看到很卡的滑动，当你用workers，当图片非常大的时候，你也会维持在60fps的帧率。

你会好奇多少workers你需要用， 但是事实上其实它会依赖你的平台还有cpu的空闲时间。 这是一个风险基于很多其他的事情：大量的启发 chome空闲意味着大量的资源没有通过js，所以最好靠猜。

最后我的demo，我用的是jpgjs 库 [jpgjs library](https://github.com/notmasteryet/jpgjs)， 但是你需要正确的解码方式处理图片。

<strong>福利和消耗</strong>

-   我们需要多少workers来解码图片。
    
-   确定我们是否和什么时候进行解码和绘制。
-   我们知道什么时候一张图片需要解码，并且平滑的淡入。

<strong>下面是我们需要考虑的问题所在：</strong>

1，这种方式，除了如果图片处理，更改和提高锁定在自己的解决方案是最好的。

2，我们需要手动的确定workers 池，虽然需要控制但是我们没有确定的方法来确定数量。比较盲目。

3，我们需要保持image在js 中，因此我们不得不确定是否和什么时候需要清除，最后你还需要知道保持添加数据，而不是更新。

4，我们需要确定什么时候一张图片需要被解码。

<strong>好，但是难道js解码图片就不会让让图片解析的更慢么？</strong>

是的，但是不太清楚消耗多少，因为这个影响是你的平台同一时间是否还在处理其他的问题。

无论如何，我们已经对图片处理实现了可控制，而不是完全依赖chrome内部的机制。 当然这个是有消耗和风险的，因为任何对js的执行都会降低性能（甚至在v8，都会不如c++）。

就像我们所说的，我们可以通过[asm.js](http://asmjs.org/)和[PNaCl](http://www.chromium.org/nativeclient/pnacl) 他们也许能使js更快，谁知道呢？可能有一天会这样吧。

<strong>语法解析速度的发展和展望</strong>

传统方法，当浏览器接受到html然后开始请求图片，这些好像是必不可少的。热河其他方法，就像我们用js进行的解码，都是有风险的，因为我们加了新的元素在传统步骤上。这也不意味着就需要避免而是需要我们做出权衡。

这种注入图片的方法，适用于已经构建好了大量的dom，而且大大减小了你仅仅依靠服务器简单的请求静态文件。

<strong>图片似乎是一个巨大的问题，当worker开始解码他们。</strong>

是的，他们有一个demo。因为解码和更改大小比chrome来的更简单。chrome用的 [Lanczos resampling](http://en.wikipedia.org/wiki/Lanczos_resampling) 来确定图片用非原始大小来展示，尽可能的让页面更完美，在我的例子中，我仅仅解码成了最终展示大小，难道还不够酷吗？

米可以看到两张图，然后对比他们，你也可以点击图片来看解码前的原始版本。

[![romevsworker](/img/2014/01/romevsworker.jpg)](http://l-zhi.com/2014/01/%e8%af%91%e5%9b%be%e7%89%87%e6%8b%96%e6%85%a2%e4%ba%86%e4%bd%a0%e7%9a%84%e7%bd%91%e7%ab%99%ef%bc%9f%e8%af%95%e8%af%95%e8%bf%99%e7%a7%8d%e6%96%b9%e6%b3%95%e5%90%a7/romevsworker/)

有一件事需要你提前确定的：就是用worker来解码并且用canvas来缩放大小。这两种都是需要消耗资源的，因此你要确定是否真的会有帮助，在你使用之前。

<strong>性能优化</strong>

一开始你就需要控制大量的workers，每一个workers都需要你宝贵的cpu资源，特别是手机和平板上面。

由于大量的workers，当你请求图片并且解码发生的时候。在chrome中解码和更改大小，会发生的比较缓慢因为他只是为pating做的一个依赖，现在我们能自己控制这些了。在你的应用程序中你需要去顶那些workers进程的图片需要保存数据在内存中。

<strong>为什么浏览器没有为我们提供这些呢？</strong>

有趣的是W3C已经开始将类似的css属性开始进行讨论了，[discussion on www-style on the W3C mailing lists](http://lists.w3.org/Archives/Public/www-style/2013May/0080.html) 这个属性就是围绕着浏览器的pating 某个元素而且可以单独的进行处理。这意味着：

一个大型的图片应用程序可以去除我们想更快的栅格化而且图片将会被分别的处理然后展示出来，当我们需要解码和更改大小的时候。实际上是因为本地浏览器比较讨厌我们手动来处理这些，就像我们的demo中左的那样。

到此为止还没有任何好的结论，如果你有更好的结论给我。

结论：

这是一个需要权衡的实例，但是至少我们队浏览器的一些行为进行了可控，而且去掉了可怕的光栅化，调整大小。 js的运行同时也会消耗性能，所以需要良好的控制内存。

[hives treatment](http://www.hivesandangioedematreatment.com/home-remedies-hives-angioedema-natural-treatment-dr-gary-levin/ "hives treatment")

zp8497586rq
