---
title: jsonp而不是AJAX？



---
在[大家](https://www.w3cdoc.com)的认知里，JSONP，往往是另外一种异步请求的方式，其主要优点是支持跨域数据请求。因此，JSONP往往是将一个Script节点动态插入document，随后[浏览器](https://www.w3cdoc.com)会自动发起一个远程请求。然而JSONP具有非常巨大的性能&工程化价值。

# 异步JSONP

异步发起的请求，无论是JSONP等资源加载，抑或XHR（fetch），都会被标记为低优先级。

对于在PC端：

* 同步插件脚本加载完才能发起请求
* 在主进程的编译与执行前，会被插件脚本抢占。

对于在H5移动端：执行到逻辑，立即发出请求，标记为低优先级。

这里要说明的是：AJAX请求本质上是基于HTTP的，只是[浏览器](https://www.w3cdoc.com)包装了一层，当然也就增加了成本，需要维护XMLHttpRequest对象以及各种状态。但是发JSONP请求就没有这么繁琐，直接是http请求加载资源，相比较AJAX更轻量。所以JSONP的效率也更高，更方便。

&nbsp;

# 同步JSONP

同步JSONP是指直接在页面上写Script标签预加载数据请求。

举个栗子，在实际PC场景，无论采用的是React Or Vue Or what ever. [我们](https://www.w3cdoc.com)都需要在渲染前加载一堆组件，数据+模板(JSX etc.)+组件方式，来实现渲染。[我们](https://www.w3cdoc.com)在渲染页面前就需要加载一堆资源，有时候甚至可以达到2M之大!

## 性能分析

这块大资源并没有错(有时候利用一块大资源，比起每次加载不一样非缓存资源性能还高)，但是在[浏览器](https://www.w3cdoc.com)加载这块大头时候，脚本的解析、编译、执行，也随着体积增长(特别是执行耗时)。然而，[我们](https://www.w3cdoc.com)可以利用上面介绍到的同步JSONP优雅地减少页面加载时间！[我们](https://www.w3cdoc.com)先来回顾一下部分原理：


  <img loading="lazy" class="alignnone wp-image-3393 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png?x-oss-process=image/format,webp" alt="" width="620" height="375" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png?x-oss-process=image/format,webp 1244w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_181/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_464/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c23a8258ff8f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_484/format,webp 800w" sizes="(max-width: 620px) 100vw, 620px" />
  因为主线程被阻碍了，后面的解析工作没有办法继续往下进行，
    当遇到这种情况，WebKit会启动另外一个线程去遍历后面的HTML，
    收集需要的资源URL，然后发送请求，这样就可以避免阻塞。 
     ———— 《WebKit技术内幕》

通过上面这个[浏览器](https://www.w3cdoc.com)加载分析图可以很清楚的看到，[浏览器](https://www.w3cdoc.com)解析HTML时，遇到同步的script标签，这时候会阻塞主线程，[浏览器](https://www.w3cdoc.com)会请求script标签资源并执行，然后才会继续HTML解析。为了提升网络性能，在主渲染进程阻塞开始加载同步script标签资源时，[浏览器](https://www.w3cdoc.com)会遍历后面的html找到其他的同步script标签的资源，同时发出请求，这样等当前的script加载完执行性完，接着往下解析html，遇到下一个同步script标签的时候，其实内容已经拿到了，或者快拿到了，这样就充分利用率网络并行请求，提升了页面加载速度。

## 技术方案

[我们](https://www.w3cdoc.com)把资源都看成一个大体积Bundle，在HTML解析到这个脚本时，由于无需下载(memory cached Or disk cached)，接下来就是漫长的解析、编译、执行。但是，[我们](https://www.w3cdoc.com)可不能让[浏览器](https://www.w3cdoc.com)闲着，通过同步JSONP，在Bundle后面声明一堆以后渲染要用的页面数据。这样，[浏览器](https://www.w3cdoc.com)主进程漫长的阻塞执行过程中，相关的数据已经被网络模块准备就绪，由于模块数据相对体积小，因此没有解析/编译/执行成本。

    <script src="BigBundle.js"></script>
    <script src="parallelData1.js"></script>
    <script src="parallelData2.js"></script>
    <script src="parallelData3.js"></script>
    <script src="parallelData4.js"></script>
    <script src="parallelData5.js"></script>
    <script src="parallelData6.js"></script>

<a href="https://camo.githubusercontent.com/462da8de160da18911118c7018651c1e1a253a1d/687474703a2f2f6f636b637a35657a662e626b742e636c6f7564646e2e636f6d2f32303137303630393134393639343233393935313336362e706e67" target="_blank" rel="noopener noreferrer"><img src="https://camo.githubusercontent.com/462da8de160da18911118c7018651c1e1a253a1d/687474703a2f2f6f636b637a35657a662e626b742e636c6f7564646e2e636f6d2f32303137303630393134393639343233393935313336362e706e67" alt="" data-canonical-src="https://ockcz5ezf.bkt.clouddn.com/20170609149694239951366.png" /></a>

[我们](https://www.w3cdoc.com)一直提到的是，在PCWeb页面初始化场景，异步加载都会面临性能问题。而上述的方案通过所有资源同步的方式实现，用最高优先级来渲染初始页。
