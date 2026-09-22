---
title: "Performance profiling with the Timeline"
date: "2014-01-05T20:07:04+08:00"
description: "这篇timeline的使用教程，翻译自：https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference"
permalink: "2014/01/05/Performance profiling with the Timeline"
tags: []
categories: ["前端技术","翻译"]
draft: false
unlisted: false
---

这篇timeline的使用教程，翻译自：[https://developers.google.com/chrome-developer-tools/docs/timeline#timeline\_event\_reference](https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference)

还有一篇很有价值的文章 javascript-profile 的测试，已经有人翻译了在此就直接列出来供大家参考吧。[http://blog.csdn.net/woailincon/article/details/10503869](http://blog.csdn.net/woailincon/article/details/10503869)

<a id="more"></a>

下面是原文翻译：

  
  
\# 性能分析之timeline篇  
  

  

The Timeline panel lets you record and analyze all the activity in your application as it runs. It's the best place to start investigating perceived performance issues in your application.

  

  

当你的应用程序运行的时候可以用timeline面板来记录和分析性能，这是最好的检测分析应用程序性能问题的工具了。

  

  

  
  
1\. [Timeline panel overview](https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_panel_overview) （timeline面板综述）  
2\. [Events mode](https://developers.google.com/chrome-developer-tools/docs/timeline#events_mode) （events 模块）  
3\. [Frames mode](https://developers.google.com/chrome-developer-tools/docs/timeline#frames_mode) （帧模块）  
4\. [Memory mode](https://developers.google.com/chrome-developer-tools/docs/timeline#memory_mode) （内存模块）  
5\. [Making a recording](https://developers.google.com/chrome-developer-tools/docs/timeline#making_a_recording) （制作一条记录）  
6\. [Recording a page load](https://developers.google.com/chrome-developer-tools/docs/timeline#recording_a_page_load) （页面加载记录）  
7\. [Tips for making recordings](https://developers.google.com/chrome-developer-tools/docs/timeline#tips_for_making_recordings) （制作记录的提示）  
8\. [Analyzing Timeline recordings](https://developers.google.com/chrome-developer-tools/docs/timeline#analyzing_timeline_recordings) （分析timeline 记录）  
9\. [Viewing details about a record](https://developers.google.com/chrome-developer-tools/docs/timeline#viewing_details_about_a_record) （观察详细记录信息）  
10\. [DOMContentLoaded and Load event markers](https://developers.google.com/chrome-developer-tools/docs/timeline#domcontentloaded_and_load_event_markers) （DOMContentLoaded 和 Load 事件标记）  
11\. [Locating forced synchronous layouts](https://developers.google.com/chrome-developer-tools/docs/timeline#locating_forced_synchronous_layouts) （定位和同步布局）  
12\. [About nested events](https://developers.google.com/chrome-developer-tools/docs/timeline#about_nested_events) （必备事件）  
13\. [Filtering and searching records](https://developers.google.com/chrome-developer-tools/docs/timeline#filtering_and_searching_records) （过滤和搜索记录）  
14\. [Zooming in on a Timeline section](https://developers.google.com/chrome-developer-tools/docs/timeline#zooming_in_on_a_timeline_section) （放大缩小 一条记录）  
15\. [Saving and loading recordings](https://developers.google.com/chrome-developer-tools/docs/timeline#saving_and_loading_recordings) （保存和加载记录）  
16\. [User-produced Timeline events](https://developers.google.com/chrome-developer-tools/docs/timeline#user-produced_timeline_events) （用户产生的timeline事件）  
17\. [View CPU time in recordings](https://developers.google.com/chrome-developer-tools/docs/timeline#view_cpu_time_in_recordings) （ 记录 中的 cpu运行时间）  
18\. [Timeline event reference](https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference) （timeline参考事件）  
19\. [Common event properties](https://developers.google.com/chrome-developer-tools/docs/timeline#common_event_properties) （公用的事件属性）  
20\. [Loading events](https://developers.google.com/chrome-developer-tools/docs/timeline#loading_events) （加载事件）  
21\. [Scripting events](https://developers.google.com/chrome-developer-tools/docs/timeline#scripting_events) （脚本事件）  
22\. [Rendering events](https://developers.google.com/chrome-developer-tools/docs/timeline#rendering_events) （重绘事件）  
23\. [Painting events](https://developers.google.com/chrome-developer-tools/docs/timeline#painting_events) （渲染事件）  

  

  
  
\## Timeline panel overview  
  

Timeline 面板 综述

  

  
The Timeline has three primary sections: an overview section at the top, a records view, and a toolbar.  
  
timeline 有个主要区域包括：最上面的概要视图，记录视图和一个工具条  
  
[![image05](/img/2014/01/image05.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image05/)  
  
<em>To start or stop a recording, press the Record toggle button (see <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#making_a_recording" target="_blank" rel="external">Making a recording</a>). </em> Press the Clear recording button to clear records from the Timeline.  
<em>The Glue async events mode lets you more easily correlate asynchronous events to their causes (see <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#about_nested_events" target="_blank" rel="external">About nested events</a>). </em> 同步异步按钮能更快速的找到修改异步事件的问题  
<em>You can filter the records shown in the Timeline according to their type or duration (see <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#filtering_and_searching_records" target="_blank" rel="external">Filtering and searching records</a>)<br><div>During a recording, a record for each event that occurs is added to the Records view in a “waterfall” presentation. Records are categorized into one of four basic groups: Loading, Scripting, Rendering, and Painting. These records are color-coded as follows:</div><br><div><span style="color: #222222; font-family: Arial, sans-serif; font-size: small;">一条记录中每一个事件都有对应的瀑布流视图，但是总体来说包括四组：加载，脚本，重绘和渲染，具体对应如下图：</span></div><br><div><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/clipboard-3/"><img src="/img/2014/01/clipboard.png" alt="clipboard" loading="lazy" decoding="async"></a></div><br><div></div><br><div><br><div>For example, the recording below is of an HTML page being loaded into Chrome. The first record (Send Request) is Chrome's HTTP request for the page, followed by a Receive Response record (for the corresponding HTTP response), some Receive Data records (for the actual page data), and then a Finish Loading record. For a complete list of events recorded by Timeline and their descriptions, see the <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference" target="_blank" rel="external">Timeline event reference</a>.</div><br><div><span style="color: #222222; font-family: Arial, sans-serif; font-size: small;">例如，记录开始于加载，第一条记录是chrome页面的http请求，接下来是响应请求，一些接收到的数据，然后是结束加载。对于完整的事件描述请看这篇文章。</span></div><br><div><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image06/"><img src="/img/2014/01/image06.png" alt="image06" loading="lazy" decoding="async"></a></div><br><div></div><br><div><br><div>For example, the recording below is of an HTML page being loaded into Chrome. The first record (Send Request) is Chrome's HTTP request for the page, followed by a Receive Response record (for the corresponding HTTP response), some Receive Data records (for the actual page data), and then a Finish Loading record. For a complete list of events recorded by Timeline and their descriptions, see the <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference" target="_blank" rel="external">Timeline event reference</a>.</div><br><div><span style="color: #222222; font-family: Arial, sans-serif; font-size: small;">例如，记录开始于加载，第一条记录是chrome页面的http请求，接下来是响应请求，一些接收到的数据，然后是结束加载。对于完整的事件描述请看这篇文章。</span></div><br><div><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image12/"><img src="/img/2014/01/image12.png" alt="image12" loading="lazy" decoding="async"></a></div><br><div></div><br><div><br><br>In addition to the detailed Records view, you can inspect recordings in one of three modes:<br><br>可以通过三种事件来检测一条记录的性能。</div></div></div></em><strong>Events mode</strong> shows all recorded events by event category.  
<em>显示所有事件的参数 </em> <strong>Frames mode</strong> shows your page's rendering performance.  
<em>展示页面的重绘的性能 </em> <strong>Memory mode</strong> shows your page's memory usage over time.  
<em>展示页面的内存消耗<br><br>### Events mode<br><br><div>事件模块</div><br>The Events mode provides an overview of all events that were captured during the recording, organized by their type. At a glance, you can see where your application is spending the most time, and on what types of tasks. The length of each horizontal bar in this view corresponds to time that event took to complete.<br><br>事件模块捕获了记录中的所有事件，种类的组织。你可以看到你的应用程序在哪个任务上花费了更多的时间，每一条横条都展示了完成花费的时间。<br><br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image27/"><img src="/img/2014/01/image27.png" alt="image27" loading="lazy" decoding="async"></a><br><br>When you select a range of time from the Events view (see <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#zooming_in_on_a_timeline_section" target="_blank" rel="external">Zooming in on a Timeline section</a>), the Records view is restricted to only show those records.<br><br>当你选择一个范围的时候，只显示这一个范围中的记录。<br><br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image11/"><img src="/img/2014/01/image11.png" alt="image11" loading="lazy" decoding="async"></a><br><br>### Frames mode（帧模块）<br><br>Frames mode provides insight into the rendering performance of your application. A “frame” represents the work the browser must do to render a single frame of content to the display—run JavaScript, handle events, update the DOM and change styles, layout and paint the page. The goal is for your app to run at 60 frames per second (FPS), which corresponds to the 60Hz refresh rate of most (but not all) video displays. Consequently, your application has approximately 16.6 ms (1000 ms / 60) to prepare for each frame.<br><br>帧模块是用来展示你应用程序的性能。“帧” 意味着浏览器必须渲染一帧的内容包括：运行js，事件监听，更新dom和更改样式布局并且渲染出来，<br><br>浏览器每秒要渲染60帧，意味着60hz来刷新视频，因此你的浏览器大约有16.6ms来处理每帧。<br><br>Horizontal lines across the Frames view represent frame rate targets for 60 FPS and 30 FPS. The height of a frame corresponds to the time it took to render that frame. The colors filling each frame indicate the percentage of time taken on each type of kind of task.<br><br>其中横线代表着帧率的范围在60和30， 帧的高度代表着渲染这一帧的时间，各种颜色的填充代表着各自所占这一帧的百分比。<br><br>The time to render a frame is displayed atop of the Records view. If you hover over the displayed time, additional information appears about the frame, including the time spent on each type of task, CPU time, and the calculated FPS.<br><br>记录的上面是这一帧所渲染的时间如果滑过显示的时间会出现这一帧的相关信息，包括各个种类，cpu和计算fps的时间。<br><br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image02/"><img src="/img/2014/01/image02.png" alt="image02" loading="lazy" decoding="async"></a><br><br>See <a href="https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/" target="_blank" rel="external">Timeline demo: Diagnosing and fixing forced synchronous layout</a> for a demonstration of using Frames mode.<br><br>查看timeline的例子：异步布局修复如何利用帧。<br><br>#### About clear or light-gray frames 关于浅灰色的帧<br><br>You may notice regions of a frame that are light-gray or clear (hollow). These regions indicate, respectively:<br><br>你也许会注意到浅灰色或者空帧的原因，分别表明： </em> Activity that was not instrumented by DevTools 没有被工具感知到激活状态  
<em>Idle time between display refresh cycles. 空闲时间在显示刷新周期之间<br>The frames in the recording below show both un-instrumented activity and idle time.<br><br>下面的帧记录包括 不被感知的和空闲时间。<br><br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/clear-frames/"><img src="/img/2014/01/clear-frames.png" alt="clear-frames" loading="lazy" decoding="async"></a><br><br>Want more details on the empty white space within the bars? Read <a href="https://plus.google.com/+NatDuca/posts/BvMgvdnBvaQ?e=-RedirectToSandbox" target="_blank" rel="external">Chrome Engineer Nat Duca's explanation</a>, which describes how you can evaluate if you were bottlnecked by the GPU.<br><br>更多的详细信息在空白帧可以阅读这篇文章，他会解释GPU渲染瓶颈。<br><br>#### Viewing frame rate statistics （查看帧率统计）<br><br>The average frame rate and its standard deviation represented are displayed along the bottom of the Timeline panel for the selected frame range. If you hover over the average frame rate, a pop-up appears with additional information about the frame selection:<br><br>平均帧率和标准误差在timeline面板的底部会有显示，当你鼠标滑过的时候会弹出详细信息。 </em> <strong>Selected range</strong> – The selected time range, and the number of frames in the selection.  
<em>选择范围 – </em> <strong>Minimum Time</strong> – The lowest time of the selected frames, and the corresponding frame rate in parentheses.  
<em>最小时间 </em> <strong>Average Time</strong> – The average time of the selected frames, and the corresponding frame rate in parentheses.  
<em>平均时间 </em> <strong>Maximum Time</strong> – The maximum time for the selected range, and the corresponding frame rate in parentheses.  
<em>最大 </em> <strong>Standard Deviation</strong> – The amount of variability of the calculated Average Time.  
<em>标准误差 </em> <strong>Time by category</strong> – The amount of time spent on each type of process, color-coded by type.  
<em>时间种类<br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/average/"><img src="/img/2014/01/average.png" alt="average" loading="lazy" decoding="async"></a><br><br>### Memory mode (内存)<br><br>The Memory view shows you a graph of memory used by your application over time and maintains a counter of the number of documents, DOM nodes, and event listeners that are held in memory (that is, that haven’t been garbage collected).<br><br>内存消耗视图，展示的着文档，文档节点事件监听，和没来得及被垃圾回收机制回收的内存。<br><br><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image20/"><img src="/img/2014/01/image20.png" alt="image20" loading="lazy" decoding="async"></a><br><br>Memory mode can't show you exactly what is causing a memory leak, but it can help you identify what events in your application may be leading to a memory leak. You can then use the <a href="https://developers.google.com/chrome-developer-tools/docs/heap-profiling" target="_blank" rel="external">Heap Profiler</a> to identify the specific code that is causing the leak.<br><br>内存视图不会展示内粗内存的泄漏问题，但是可以引导你发现分析内存泄漏的问题。然后你可以根据profiler 来确定是哪句句代码所引起的内存泄露。<br><br>### Making a recording 记录<br><br>To make a recording, you start a recording session, interact with your application, and then stop recording. It helps to know in advance the kind of activity you want to record — for example, page loading, scrolling performance of a list of images, and so forth, and then stick to that script.<br><br>当你应用程序运行的时候，你开始记录并停止。它能帮助你知道记录的各种内容 – 例如，页面加载，图片的滚动所消耗的性能等，就是你分析脚本很好的工具。<br><br><strong>To make a recording</strong>: （记录）<br><br>The Record button turns red during a recording. <img src="file:///C:/Users/lizhi/AppData/Local/YNote/Data/a569171010%40163.com/92662582a4aa4998ad0ac0c55886f70c/ordbutton-on.png" alt="Performance profiling with the Timeline配图" loading="lazy" decoding="async"><br><br>记录的黑点会变成红点<br><br>1. Perform any necessary user actions to record the desired behavior. 通过这种方式来记录应用程序的行为。<br>2. Stop the recording by pressing the now red record button, or repeating the keyboard shortcut. 暗红色按钮来停止记录的行为，或者用键盘上的快捷方式。<br><div><br><br>### Recording a page load 记录页面加载<br><br>A common task is to record a page loading from the initial network request. Keyboard shortcuts are useful in this scenario, as they let you quickly start a recording, re-load the page, and stop the recording.<br><br>对已一个页面来说网络加载的响应式最为常见的，需要用到键盘上的快捷键，这样一来你就能很快的记录并停止一条记录。<br><br><strong>To record a page load</strong>: 记录一条页面加载记录<br><br>1. Open any <a href="http://www.jankfree.com/" target="_blank" rel="external">web page</a> in a new tab or window. （打开window上的一个新的tab）<br>2. Open the Timeline and press Cmd+E (Mac) or Ctrl+E (Windows/Linux) to start recording. （用快捷键ctrl + E 来开始一条记录）<br>3. Quickly press Cmd+R or Ctrl+R to reload the browser page. （用快捷键 ctrl+r 来重新加载页面）<br>4. Stop the recording when the page has finished loading (look for the red <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#domcontentloaded_and_load_event_markers" target="_blank" rel="external">event marker</a>). （当页面加载完成停止页面加载 可以参考这里）<br><div>Your recording should look something like the following. The first record (Send Request) is Chrome's HTTP request for the page, followed by a Receive Response record for the corresponding HTTP response, followed by one or more Receive Data records, a Finish Loading record, and a Parse HTML record.</div><br></div><br><div>你需要像下面这样开始一条记录，从开始加载到响应到记载数据加载完成最后解析html。</div><br><div></div><br><div><a href="http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image16/"><img src="/img/2014/01/image16.png" alt="image16" loading="lazy" decoding="async"></a></div><br><div></div><br><div><br><div>See the <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference" target="_blank" rel="external">Timeline event reference</a> for details on each record type.</div><br><div>查看timeline 的详细信息来分析每一条的记录。</div><br><div></div><br><div><br><br>Here are some tips for making recordings:<br><br>这里有一些记录的小提示：</div></div></em><strong>Keep recordings as short as possible</strong>. Shorter recordings generally make analysis easier.  
<em>记录越短越好，这样更容易分析。 </em> <strong>Avoid unnecessary actions</strong>. Try to avoid actions (mouse clicks, network loads, and so forth) that are extraneous to the activity you want to record and analyze. For instance, if you want to record events that occur after you click a “Login” button, don’t also scroll the page, load an image and so forth.  
<em>避免不必要的动作，尝试尽量去避免多余的行为（比如鼠标点击，网络加载，等）这些对你分析造成干扰的外来因。比如，你想记录一个动作，在你点击login按钮的时候，就不要滚动页面，加载图片等。 </em> <strong>Disable the browser cache</strong>. When recording network operations, it’s a good idea to disable the browser’s cache in the DevTools Settings panel.  
<em>去掉浏览器缓存。打工记录一个网络请求操作，最好的方式是清除浏览器缓存。 </em> <strong>Disable extensions</strong>. Chrome extensions can add unrelated noise to Timeline recordings of your application. You can do one of the following:禁止扩展程序，他会干扰。  
<em>Open a Chrome window in <a href="http://support.google.com/chrome/bin/answer.py?hl=en&amp;answer=95464" target="_blank" rel="external">incognito mode</a> </em> 无痕浏览  
<em>Create a new <a href="http://support.google.com/chrome/bin/answer.py?hl=en&amp;answer=142059" target="_blank" rel="external">Chrome user profile</a> for testing. </em> 新建一个新的用户来进行测试  

  
  
\## Analyzing Timeline recordings （timeline记录的解析）  
  
This section provides tips for analyzing Timeline recordings.  
  
分析timelin提供的记录  
  

  

  

  
  
\### Viewing details about a record （查看详细信息）  
  
When you hover your mouse over a record in the Timeline, a pop-up appears with additional information about the event.  
  

  

当鼠标滑过timeline的一条记录会弹出一些帧相关的额外信息。

  

[![image29](/img/2014/01/image29.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image29/)

  

  

  

  
  
Certain details are present in events of all types, such as Duration and CPU Time, while some only apply to certain event types. For information on what details each kind of record contains, see the [Timeline event reference](https://developers.google.com/chrome-developer-tools/docs/timeline#timeline_event_reference).  
  
各种类的事件详细信息的展现，例如cpu和运行消耗时间，这些只适用于一类事件，信息中各种详细内容，可以查看事件参考。  
  
When you hover over a Paint record, DevTools highlights the region of the screen that was updated with a blue semi-transparent rectangle, as shown below.  
  

  
当滑过一条渲染的记录，开发者工具高亮区域根据透明蓝色矩形条进行更新，如下图：  
  
[![clipboard22](/img/2014/01/clipboard22.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/clipboard22/)  
  
\### DOMContentLoaded and Load event markers （dom内容加载完成 和 load事件记录）  
  
The Timeline annotates each recording with a blue and a red line that indicate, respectively, when the [DOMContentLoaded](http://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) and [load](http://docs.webplatform.org/wiki/dom/events/load) events were dispatched by the browser. The DOMContentLoaded event is fired when all of the page’s DOM content has been loaded and parsed. The load event is fired once all of the document’s resources (images and CSS files, and so forth) have been fully loaded.  
  
timeline有了一条蓝色和红色的记录线，分别浏览器的domcontentloaded 和load事件，DOMContentLoaded事件是当所有的dom加载完成并且解析完成，load事件会在所有的图片，样式等都加载完成的时候。  
  
[![image28](/img/2014/01/image28.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image28/)  
  
\### Locating forced synchronous layouts 同步强迫布局  
  
Layout is the process by which Chrome calculates the positions and sizes of all the elements on the page. Normally, Chrome performs layouts “lazily” in response to CSS or DOM updates from your application. This allows Chrome to batch style and layout changes rather than reacting to each on demand. However, an application can force Chrome to perform a layout immediately and asynchronously by querying the value of certain layout-dependent element properties such as`element.offsetWidth`. These so called “forced synchronous layouts” can be a big performance bottleneck if repeated frequently or performed for large DOM tree.  
  
The Timeline identifies when your application causes a forced asynchronous layout and marks such records with yellow warning icon (![Performance profiling with the Timeline配图](file:///C:/Users/lizhi/AppData/Local/YNote/Data/a569171010%40163.com/09e4aebd882c4a8fbefcc146a53e917e/image25.png)). When you hover over the record, a pop-up appears that contains a stack trace of the offending code.  
  
chrome计算页面上所有的元素的定位和尺寸。然而应用程序中会响应样式和dom进行更新。这些会让chrome批量处理样式和布局的更改和请求。 然而，一个应用程序会因为一些糟糕的代码然后被迫立即重新布局和算出结果值，因为那些只需要依赖布局后的结果例如： element.offsetWidth。 这些所谓的强迫立即布局，这些将是相当严重的性能瓶颈在重复大量的dom树中进行计算。  
  
当你的timeline里面标记并显示了黄色的警告icon，当你鼠标滑过记录的时候会出现糟糕代码的相机执行信息。  
  
[![image07](/img/2014/01/image07.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image07/)  
  
If a record contains a [child record](https://developers.google.com/chrome-developer-tools/docs/timeline#about_nested_events) that forced a layout, the parent record is marked with a slightly dimmed yellow icon. Expand the parent record to locate the child record that caused the forced layout.  
  
如果一条记录的子记录会强制进行布局，那么父记录会标记一条黄色的提示icon。原因是由于父记录的子记录引起的强制布局。  
  
[![ayout-expand](/img/2014/01/ayout-expand.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/ayout-expand/)  
  
See the [Forced Synchronous Layout demo](https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout) for a demonstration of detecting and fixing these kinds of performance issues.  
  
这里有一个强制布局的反面教材，并且通过timeline定位然后解决了这个问题。  
  
\### About nested events 一些嵌套事件  
  
Events in Timeline recordings sometimes are nested visually beneath another event. You expand the “parent” event to view its nested “child” events. There are two reasons why the Timeline nests events:  
  
一些时间记录往往被嵌套在了另外的一些事件内部，的类似父类和子类的概念。 有两个产生这种情况的原因。  
  
<em>Synchronous events that occurred during the processing of an event that occurred previously. Each event internally generates two atomic events, one for the start and one for the end, that are converted to a single “continuous” event. Any other events that occur between these two atomic events become children of the outer event. </em> 同步事件执行的过程之中，事件内部生成了两个子事件，一个是开始一个是结束，也可以看成是一个连续的事件，一些其他事件引起的两个连续的时间会成为外面事件的子事件了。  
<em>Asynchronous events that occurred as a result of another event when <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#about_glue_mode" target="_blank" rel="external">glue mode</a> is enabled. </em> 一个事件的触发生成的结果引起另外一个事件的触发，在glue mode中。  

<strong>Note:</strong> Glue mode is automatically disabled in [Frames mode](https://developers.google.com/chrome-developer-tools/docs/timeline#frames_mode).

  

提示：帧模块会让Glue模块失效。

  

  
The following screenshot shows an example of nested synchronous events. In this case, Chrome was parsing some HTML (the Parse HTML event) when it found several external resources that needed to be loaded. Those requests were made before Chrome has finished the parsing, so the Send Request events are displayed as children of the Parse HTML event.  
  
下面的屏幕截图展示了一个包含事件的例子。这个例子里chrome发现一些额外的资源需要加载并进行解析。这些请求会在chome完成渲染之前完加载，这些事件会在子事件中展示。  
  
[![image21](/img/2014/01/image21.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image21/)  
  
\#### About glue mode glue模块  
  
Many events in an application are the result of asynchronous operations. A loading of an image resource page results in a Send Request, followed by a Receive Response event, one or more Receive Data loading events, and a Finish Loading event. Sometimes, async events are separated from their causes by enough time to make correlating them difficult.  
  
很多事件在应用程序中是异步操作的结果。在一个发送请求的loading图片，然后接收响应事件，一个或者更多的接收数据事件 和 一个完成loading  
  
的事件。异步事件很难有足够的时间来分割他们。  
  
The <strong>Glue asynchronous events to causes</strong> toggle at the bottom of the Timeline panel causes asynchronous events to be nested as children of the event that caused them.  
  
异步加载在底部有一个开关，让子事件是否开启异步，如下  
  
[![image08](/img/2014/01/image08.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image08/)  
  
\#### Coloring of Timeline records with nested events 子记录的消息颜色  
  
Timeline bars are color coded as follows:  
  
timeline 条的颜色密码如下：  
  
<em>The <strong>first, darkest part</strong> of the bar represents how long the parent event and all of its <em>synchronous</em> children took. </em> 第一条，深色的部分是父事件和所有同步的子事件的长度在整个所有请求的比例。  
<em>The <strong>next, slightly paler color</strong> represents the CPU time that the event and all its <em>asynchronous</em> children took. This would be the same as above if <a href="https://developers.google.com/chrome-developer-tools/docs/timeline#about_glue_mode" target="_blank" rel="external">glue mode</a>is off, and for events that don't have asynchronous children. </em> 接着，稍微浅一点的部分是cpu的时间和所有的子请求的时间。 跟glue mode 相同关闭之后， 就没有异步的子请求。  
<em>The <strong>palest bars</strong> represent the time from the start of first asynchronous event to the end of last of its asynchronous children (only visible for events with asynchronous children while in glue mode). </em> 几乎白色的条代表着第一个异步请求事件到最后一个异步请求事件，包括他所有的子事件（仅仅展示在有子事件的glue mode 模式）  
[![image36](/img/2014/01/image36.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image36/)  
  
When you hover over a parent record, the following information is displayed:  
  
当滑过父记录的时候，如下的信息想会被展示出来。  
  
<em><strong>Duration</strong> matches the bar length from the event start to the end of its last child. </em> 持续时间：会匹配事件开始到所有子事件结束的时间  
<em><strong>Self Time</strong> is the time the event took without any of its children. </em> 除去子事件花费的事件之外的事件。  
<em><strong>CPU time</strong> matches that of CPU bar. </em> cpu时间 匹配cpu条  
[![image23](/img/2014/01/image23.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image23/)  

  
  
\### Filtering and searching records 过滤搜索记录  
  
You can filter the records shown according to their type (only show loading events, for example), or only show records longer or equal to 1 millisecond or 15 milliseconds.  
  

  

你可以通过这个按钮来展示或者过滤满足大于1毫秒或者15毫秒的记录。

  

[![image19](/img/2014/01/image19.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image19/)

  

  

  

You can also search records for a particular string by pressing Ctrl+F (Window/Linux) or Cmd+F (Mac), while the Timeline has focus. You can optionally filter records to only show those that contain the search term.

  

你也可以通过详细的字符串来搜索并且定位记录。

  

[![image03](/img/2014/01/image03.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image03/)

  

  

  

  
  
To zoom in on a Timeline section, do one of the following:  
  
放大timeline的一部分区域如下：  
  
<em>In the overview region, drag out a Timeline selection with your mouse. </em> 用鼠标拖动来选择区域。  
<em>Adjust the gray sliders in the ruler area. </em> 在标尺区域调整灰色的条。  

Here are some more tips for working with Timeline selections:

  

timeline 选择区域会有一些提示。

  

  

  
  
<em>“Scrub” the recording with the current selection by dragging the area between the two slider bars. </em> 显示区域显示的是通过拖动而出现的两条竖线间的区域。  
[![image26](/img/2014/01/image26.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image26/)  

  
  
<em>Trackpad users:用户触控板： </em> Swiping left or right with two fingers moves the current Timeline selection.  
<em>左或者右滑动当前timeline的区域。 </em> Swiping up or down with two fingers expands or contracts the current Timeline selection, respectively.  
<em>上下滑动滚轮可以放大或者缩小当前信息。 </em> Scrolling the mouse wheel up or down while hovering over a Timeline selection expands and contracts the selection, respectively.上下滑动滚轮可以放大或者缩小当前信息。  

<a id="Saving-and-loading-recordings-保存和加载记录"></a>

### Saving and loading recordings 保存和加载记录

You can save a Timeline recording as a JSON file, and later open it in the Timeline.

你可以保存一个timeline记录作为json文件，然后用timeline打开它

<strong>To save a Timeline recording:</strong>

1.  Right+click or Ctrl+click (Mac only) inside the Timeline and select <strong>Save Timeline Data…</strong>, or press the Ctrl+S keyboard shorcut.
2.  右击timeline区域，并且保存timeline数据…，或者点击ctrl+s保存
3.  Pick a location to save the file and click Save.
4.  选择本地保存地址保存。
    

<strong>To open an existing Timeline recording file, do one of the following</strong>:

打开一个timeline的保存记录，如下：

1.  Right-click or Ctrl+click inside the Timeline and select <strong>Load Timeline Data…</strong>, or press the Ctrl+O keyboard shortcut.
2.  右击插入timeline的数据…，或者点击ctrl+o来保存。
3.  Locate the JSON file and click Open.
4.  选择要加载的json文件。  
    [![image14](/img/2014/01/image14.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image14/)

  
  
\### User-produced Timeline events 如何得到timeline的事件  
  
Applications can add their own events to Timeline recordings. You can use the [console.timeStamp()](https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimestamplabel) method to add an atomic event to a recording, or the[console.time()](https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimelabel) and [console.timeEnd()](https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimeendlabel) methods to mark a range of time that code was executing. For example, in the following recording the `console.timeStamp()`was used to display an “Adding result” event. See [Marking the Timeline](https://developers.google.com/chrome-developer-tools/docs/console#marking_the_timeline) in [Using the Console](https://developers.google.com/chrome-developer-tools/docs/console) for more information.  
  

  
应用程序可以添加他们自己的事件到timeline记录中。 可以用 console.timeStamp() 方法添加一个原子事件的记录，或者也可以用 console.time() 和 console.timeEnd() 方法来记录一段代码的执行时间的范围，例如下面的记录就是用了console.timeStamp() 来添加结果事件. 看看记录的timeline 和 console 得到更多的信息。  
  
[![dding-result](/img/2014/01/dding-result.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/dding-result/)  
  
\### View CPU time in recordings 查看记录中cpu的运行时间  
  
You can overlay CPU activity in Timeline recordings by enabling the Show CPU activity on the ruler option in DevTools settings.  
  
你可以在timeline中设置一些选项来允许cpu规则覆盖原来的cpu活动规则。  
  
[![image13](/img/2014/01/image13.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image13/)  
  
When this option is enabled, light gray bars appear above the Timeline records, indicating when the CPU was busy. Hovering over a CPU bar highlights the Timeline region during which the CPU was active (as shown below). The length of a CPU bar is typically the sum of all the (highlighted) events below it in the Timeline. If these don't match, it may be due to one of the following:  
  
这个选项选中，将会有浅灰色的条出现在timeline记录中，说明档cpu繁忙的时候。 然而高亮的cpu条看到cpu运行的时间。 cpu条的长度代表着timeline中高亮事件长度之和，如果不符合就不会出现如下信息.  
  
<em>Other pages running on the same threads as the page being inspected (for example, two tabs open from the same site, with one site doing something in a<code>setTimeout()</code> call). </em> 检查到另外一个页面运行着一个同样的线程（例如，两个运行着同样页面的程序，一个用settimeout的回调）  
<em>Un-instrumented activity. </em> 没有运行。  
[![image24](/img/2014/01/image24.png)](http://l-zhi.com/2014/01/%ef%bc%88%e8%af%91%ef%bc%89performance-profiling-with-the-timeline/image24/)  
  
\## Timeline event reference （timeline 事件）  
  
This section lists and describes the individual types of records that are generated during a recording, organized by type, and their properties.  
  
这个区域列表描述了事件的种类属性信息  
  
\### Common event properties （公共事件属性）  
  
Certain details are present in events of all types, while some only apply to certain event types. This section lists properties common to different event types. Properties specific to certain event types are listed in the references for those event types that follow.  
  
用于某一事件的某些详细信息的展示。 这些区域列表属性有不同的种类。某一事件有以下的这些种类的信息属性：  
  
Aggregated time 总时间  
For events with [nested events](https://developers.google.com/chrome-developer-tools/docs/timeline#about_nested_events), the time taken by each category of events.  
所有事件的花费时间。Call Stack 调用堆栈  
For events with [child events](https://developers.google.com/chrome-developer-tools/docs/timeline#about_nested_events), the time taken by each category of events.  
子事件花费的所有时间。  
CPU time cpu时间  
How much CPU time the recorded event took。  
Details 详细  
Other details about the event.  
其他事件的详情。  
Duration (at time-stamp) 持续时间  
How long it took the event with all of its children to complete; <em>timestamp</em> is the time at which the event occurred, relative to when the recording started.  
所有子事件都完成所消耗的时间； 记录开始的关联事件的触发的时间戳的时间。  
Self time 父记录的时间  
How long the event took without any of its children. 除去子记录的父记录的时间  
Used Heap Size 曾经的积累大小  
Amount of memory being used by the application when the event was recorded, and the delta (+/-) change in used heap size since the last sampling.  
当记录开始的时候的内存消耗，在最后一个取样前的增加减少。  
  
\### Loading events 加载事件  
  
This section lists events that belong to Loading category and their properties.  
  
加载事件的属性和种类。  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Event | Description |
| --- | --- |
| Parse HTML  
解析HTML | Chrome executed its HTML parsing algorithm.  
html解析的信息 |
| Finish Loading  
完成加载 | A network request completed.  
网络请求的完成 |
| Receive Data  
接收数据 | Data for a request was received. There will be one or more Receive Data events.  
数据接收，这些事件经常会出现多个。 |
| Receive Response  
接受响应 | The initial HTTP response from a request.  
初始响应一个http请求 |
| Send Request  
发送请求 | A network request has been sent.  
已经发出的网络请求 |

  
  
  
\#### Loading event properties 加载事件的属性  
  

Resource （资源）

The URL of the requested resource.

url请求资源

Preview （预览）

Preview of the requested resource (images only).

针对图片的预览请求的资源。

Request Method （响应方法）

HTTP method used for the request (GET or POST, for example).

http方法用于请求的

Status Code 状态码

HTTP response code

http的响应码

MIME Type

MIME type of the requested resource.

响应资源的mime type

Encoded Data Length 数据编码后的长度

  

Length of requested resource in bytes.

响应资源的bytes 的长度

  
  
\### Scripting events 脚本事件  
  
This section lists events that belong to the Scripting category and their properties.  
  
所有脚本和他们的属性的事件列表  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Event | Description |
| --- | --- |
| Animation Frame Fired  
动画帧的触发 | A scheduled animation frame fired, and its callback handler invoked.  
帧的触发和毁掉函数的调用 |
| Cancel Animation Frame  
结束动画帧 | A scheduled animation frame was canceled.  
结束一个动画的帧 |
| GC Event  
垃圾回收事件 | Garbage collection occurred.  
触发垃圾回收 |
| DOMContentLoaded | The [DOMContentLoaded](http://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) was fired by the browser. This event is fired when all of the page’s DOM content has been loaded and parsed. |
| Evaluate Script  
执行脚本 | A script was evaluated.  
执行脚本 |
| Event  
事件 | A JavaScript event (“mousedown”, or “key”, for example).  
一个js的事件如：mousedown |
| Function Call  
事件回调 | A top-level JavaScirpt function call was made (only appears when browser enters JavaScript engine).  
高优先级的js回调模块（进入浏览器的js的时候出现） |
| Install Timer  
安装时间定时器 | A timer was created with [setInterval()](http://docs.webplatform.org/wiki/dom/methods/setInterval) or [setTimeout()](http://docs.webplatform.org/wiki/dom/methods/setTimeout).  
通过setInterval 和 setTimeout来创建时间定时器事件 |
| Request Animation Frame  
响应动画帧 | A requestAnimationFrame() call scheduled a new frame  
一个 requestAnimationFrame() 方法的回调会创建一个新的帧 |
| Remove Timer  
删除定时器 | A previously created timer was cleared.  
清楚之前创建的定时器 |
| Time | A script called [console.time()](https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimelabel)) |
| Time End | A script called [console.timeEnd()](https://developers.google.com/chrome-developer-tools/docs/console-api#consoletimeendlabel) |
| Timer Fired | A timer fired that was scheduled with setInterval() or setTimeout(). |
| XHR Ready State Change | The ready state of an XMLHTTPRequest changed.  
httprequest更改的状态 |
| XHR Load | An XMLHTTPRequest finished loading.  
一个异步请求加载 完成 |

  
  
\#### Scripting event properties 脚本性能  
  

Timer ID

The timer ID. 定时器id

Timeout

The timeout specified by the timer. 定时器

Repeats

Boolean that specifies if the timer repeats. 重复定时器

Function Call

A function that was invoked. 方法回调

  

  
  
\### Rendering events （渲染事件）  
  
This section lists events that belong to Rendering category and their properties.  
  
关于渲染种类和属性的事件列表。  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Event | Description |
| --- | --- |
| Invalidate layout  
无效的布局 | The page layout was invalidated by a DOM change.  
dom更改没有引起页面的重新布局 |
| Layout  
布局 | A page layout was executed.  
页面进行布局 |
| Recalculate style  
重新计算样式 | Chrome recalculated element styles.  
重新计算元素的样式。 |
| Scroll  
滚动 | The content of nested view was scrolled.  
视图内容的滚动 |

  
  
\#### Rendering event properties （渲染事件的属性）  
  

Layout invalidated 无效的布局

For Layout records, the stack trace of the code that caused the layout to be invalidated.

对于布局记录，代码引起了无效的布局。

Nodes that need layout 需要重新布局的节点

For Layout records, the number of nodes that were marked as needing layout before the relayout started. These are normally those nodes that were invalidated by developer code, plus a path upward to relayout root.

在需要重新布局之前需要标记所有的节点元素。 这些节点可以通过开发代码使之没有效果，并且从根目录开始层层的网上渲染。

Layout tree size 树布局位置

For Layout records, the total number of nodes under the relayout root (the node that Chrome starts the relayout).

对于布局记录，所有的节点需要在根目录上重新渲染。

Layout scope 布局范围

Possible values are “Partial” (the re-layout boundary is a portion of the DOM) or “Whole document”.

可能是局部的也可能是整个文档

Elements affected 影响的元素

For Recalculate style records, the number of elements affected by a style recalculation.

通过重新计算而影响到的元素

Styles invalidated 无效的样式

For Recalculate style records, provides the stack trace of the code that caused the style invalidation.

代码引起的所有的样式重新计算。

  
  
\### Painting events 渲染事件  
  
This section lists events that belong to Painting category and their properties.  
  
这个列表展示了渲染的各种属性  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| Event | Description |
| --- | --- |
| Composite Layers  
合成图层 | Chrome's rendering engine composited image layers.  
渲染合成图片层 |
| Image Decode  
图片解码 | An image resource was decoded.  
图片资源的解码 |
| Image Resize  
图片更改尺寸 | An image was resized from its native dimensions.  
通过更改本地图片资源的尺寸 |
| Paint | Composited layers were painted to a region of the display. Hovering over a Paint record highlights the region of the display that was updated.  
混合显示区域的图层。 更新后的渲染记录 |

  
  
\#### Painting event properties 渲染时间的属性  
  

Location 位置

For Paint events, the x and y coordinates of the paint rectangle.

绘制的x，y坐标的绘制矩形。

Dimensions 大小

For Paint events, the height and width of the painted region.

绘制区域的宽高。

  

  

  

  

  
  
  
  
  
  

zp8497586rq
