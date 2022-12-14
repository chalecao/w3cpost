---
title: 网络库libevent、libev、libuv对比



---
Libevent、libev、libuv三个网络库，都是c语言实现的异步事件库Asynchronousevent library）。  
异步事件库本质上是提供异步事件通知（Asynchronous Event Notification，AEN）的。异步事件通知机制就是根据发生的事件，调用相应的回调函数进行处理。  
事件（Event）：事件是异步事件通知机制的核心，比如fd事件、超时事件、信号事件、定时器事件。有时候也称事件为事件处理器（EventHandler），这个名称更形象，因为Handler本身表示了包含处理所需数据（或数据的地址）和处理的方法（回调函数），更像是面向对象思想中的称谓。  
事件循环（EventLoop）：等待并分发事件。事件循环用于管理事件。  
对于应用程序来说，这些只是异步事件库提供的API，封装了异步事件库跟操作系统的交互，异步事件库会选择一种操作系统提供的机制来实现某一种事件，比如利用Unix/Linux平台的epoll机制实现网络IO事件，在同时存在多种机制可以利用时，异步事件库会采用最优机制。

对比下三个库：  
libevent :名气最大，应用最广泛，历史悠久的跨平台事件库；  
libev :较libevent而言，设计更简练，性能更好，但对Windows支持不够好；  
libuv :开发node的过程中需要一个跨平台的事件库，他们首选了libev，但又要支持Windows，故重新封装了一套，linux下用libev实现，Windows下用IOCP实现；

在github上的影响力：

![][1]


  <img loading="lazy" width="320" height="292" class="alignnone size-full wp-image-6603 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6a2480f8.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6a2480f8.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6a2480f8.png?x-oss-process=image/format,webp 320w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6a2480f8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_274/format,webp 300w" sizes="(max-width: 320px) 100vw, 320px" />

可见，目前libuv的影响力最大，其次是libevent，libev关注的人较少。

优先级、事件循环、线程安全维度的对比


  <img loading="lazy" width="1552" height="852" class="alignnone size-full wp-image-6604 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/format,webp 1552w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_165/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_439/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_422/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6b2996d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_843/format,webp 1536w" sizes="(max-width: 1552px) 100vw, 1552px" />

## 事件循环

event_base用于管理事件  
激活的事件组织在优先级队列中，各类事件默认的优先级是相同的，  
可以通  过设置事件的优先级   使其优先被处理

## 线程安全

event\_base和loop都不是线程安全的，一个event\_base或loop实例只能在用户的一个线程内访问（一般是主线程），注册到event\_base或者loop的event都是串行访问的，即每个执行过程中，会按照优先级顺序访问已经激活的事件，执行其回调函数。所以在仅使用一个event\_base或loop的情况下，回调函数的执行不存在并行关系

## 事件种类


  <img loading="lazy" width="1558" height="1338" class="alignnone size-full wp-image-6602 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/format,webp 1558w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_258/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/quality,q_50/resize,m_fill,w_699,h_600/format,webp 699w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_660/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b6756ca58.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1319/format,webp 1536w" sizes="(max-width: 1558px) 100vw, 1558px" />

这个对比对于libev和libuv更有意义，对于libevent，很多都是跟其设计思想有关的。 libev中的embed很少用，libuv没有也没关系；cleanup完全可以用libuv中的async_exit来替代；libuv没有fork事件。

## 可移植性

三个库都支持Linux, *BSD, Mac OS X, Solaris, Windows


  <img loading="lazy" width="1558" height="808" class="alignnone size-full wp-image-6601 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/format,webp 1558w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_156/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_415/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_398/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6071b64f0f090.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_797/format,webp 1536w" sizes="(max-width: 1558px) 100vw, 1558px" />

对于Unix/Linux平台，没有什么大不同，优先选择epoll，对于windows，libevent、libev都使用select检测和分发事件（不I/O），libuv在windows下使用IOCP。libevent有一个socket handle, 在windows上使用IOCP进行读写。libev没有类似的。但是libevent的IOCP支持也不是很好（性能不高）。所以如果是在windows平台下，使用原生的IOCP进行I/O，或者使用libuv。

异步架构程序设计原则

1、回调函数不可以执行过长时间，因为一个loop中可能包含其他事件，尤其是会影响一些准确度要求比较高的timer。

2、尽量采用库中所缓存的时间，有时候需要根据时间差来执行timeout之类的操作。当然能够利用库中的timer最好。

## 参考：

* http://zheolong.github.io/blog/libevent-libev-libuv/
* https://cpp.libhunt.com/

 [1]: https://img-blog.csdn.net/20170505163959722?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlqaW5xaTE5ODc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center
