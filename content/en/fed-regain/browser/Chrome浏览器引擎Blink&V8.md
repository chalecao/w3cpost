---
title: 'Chrome浏览器引擎Blink&V8'
---
欢迎学习[前端](https://www.w3cdoc.com)知识体系课程，本系列属于：[[前端](https://www.w3cdoc.com)增长教程][1]

## 背景

这篇文章是我的[前端](https://www.w3cdoc.com)技术系列文章中[浏览器](https://www.w3cdoc.com)工作原理栏目中的第二篇。[浏览器](https://www.w3cdoc.com)引擎（也被称作布局引擎或渲染引擎）是[浏览器](https://www.w3cdoc.com)的重要组成部分。[浏览器](https://www.w3cdoc.com)引擎最重要的工作就是将HTML文本和其他页面中的资源转换成可以与用户产生交互的页面。

除了[浏览器](https://www.w3cdoc.com)引擎外，布局引擎和渲染引擎是另外两个相关的概念，理论上，两个引擎可以独立实现，但在实际情况中，往往很少将二者分开实现。

除了包含布局和渲染引擎外，[浏览器](https://www.w3cdoc.com)引擎还遵循<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Content_Security_Policy" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">文档安全策略（Content Security Policy）</a>以保证站点间相互独立。

在运行JavaScript代码的功能上，基本上主流的[浏览器](https://www.w3cdoc.com)都使用独立的引擎，起初JavaScript语言只被用于在[浏览器](https://www.w3cdoc.com)中使用，但现在JavaScript几乎可以在任何地方使用，这需要JavaScript引擎可以独立于[浏览器](https://www.w3cdoc.com)单独使用。

而像<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Electron_%28software_framework%29" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Electron framework</a>这样的技术就是整合Chromium的渲染引擎和Nodejs而实现的。

我想通过这篇文章把V8中的技术尽可能的详述，涵盖的内容会比较多，可反复阅读 :)。

## 常见的[浏览器](https://www.w3cdoc.com)引擎

[浏览器](https://www.w3cdoc.com)引擎是Web平台技术中一系列标准（HTML、CSS、ECMAScript、WebGL、Web Storage等等）的具体实现，不同的[浏览器](https://www.w3cdoc.com)引擎在遵循同样的标准下，还实现了额外的功能。

Gecko是Mozilla的[浏览器](https://www.w3cdoc.com)引擎，在Firefox中使用，SpiderMonkey是Firefox的JavaScript引擎。

Apple为Safari[浏览器](https://www.w3cdoc.com)创造了Webkit引擎，Webkit引擎内置了JavaScriptCore引擎。虽然Apple允许在IOS设备上可以使用其他的[浏览器](https://www.w3cdoc.com)代替Safari，但所用通过App Store分发的[浏览器](https://www.w3cdoc.com)必须使用Webkit引擎。例如，Opera Mini[浏览器](https://www.w3cdoc.com)在IOS设备上使用Webkit引擎，而在其他设备上使用Blink引擎。

Google起初使用Webkit作为Chrome[浏览器](https://www.w3cdoc.com)的引擎，后来以Webkit引擎为基础创造了Blink引擎，所有基于Chromium开源[浏览器](https://www.w3cdoc.com)衍生的产品都使用blink引擎。而大名鼎鼎的V8引擎就是Chromium-based[浏览器](https://www.w3cdoc.com)的JavaScript引擎。

Microsoft维护着自己的EdgeHTML引擎，作为老的Trident引擎的替代方案。新的Edge的[浏览器](https://www.w3cdoc.com)已经开始使用Chromium的Blink引擎了，而EdgeHTML引擎只在window 10上的<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Universal_Windows_Platform" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Universal Windows Platform</a>中被使用。<figure data-size="normal">


  <img loading="lazy" width="1280" height="720" class="alignnone size-full wp-image-6240 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff07fdaee9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w" sizes="(max-width: 1280px) 100vw, 1280px" />
</figure>

天下合久必分，分久必合，随着Edge也加入了Blink的阵营，基本上Webkit内核及Webkit内核的衍生Blink已经统治了[浏览器](https://www.w3cdoc.com)市场。到目前，单单Chrome的市场占有率已有六成。接下来，就让[我们](https://www.w3cdoc.com)来聊聊Blink和V8引擎。

## Chromium & Blink

宽泛的说，Blink实现了在[浏览器](https://www.w3cdoc.com)页签中所有的渲染工作，其中包括：

* 实现了Web平台中的标准，例如HTML标准，包括DOM、CSS等。
* 内置了V8引擎用于运行JavaScript。
* 从网络堆栈中获取资源
* 构建DOM树
* 计算样式和布局
* 内置了<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/HEAD/cc/README.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Chrome Compositor</a>和绘制图形的能力

借助<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/HEAD/content/public/README.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Content public APIs</a>，Blink可以被内置在很多诸如Chromium，Android WebView和Opera这样的应用中。

## 进程/线程架构

### 进程

Chromium拥有一套多进程架构。Chromium有一个[浏览器](https://www.w3cdoc.com)进程和多个带有沙盒能力的渲染进程。Blink则运行在渲染进程中。[浏览器](https://www.w3cdoc.com)多核架构可以参考这里：<http://dev.chromium.org/developers/design-documents/multi-process-architecture>


  <img loading="lazy" width="700" height="649" class="alignnone size-full wp-image-6414 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba8a2eec36.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba8a2eec36.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba8a2eec36.png?x-oss-process=image/format,webp 700w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba8a2eec36.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_278/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba8a2eec36.png?x-oss-process=image/quality,q_50/resize,m_fill,w_647,h_600/format,webp 647w" sizes="(max-width: 700px) 100vw, 700px" />

从安全的角度考虑，让不同的站点保持相互隔离是非常重要的，这被称作**站点隔离（Site Isolation）**。理论上讲，一个渲染进程应该最多只能负责一个站点的渲染工作。但实际上，当用户打开很多页签时，渲染进程与站点1对1的关系会占用大量的内存。所以一个渲染进程可能会被多个iframe或页签所共享，也就是说一个页面中的多个iframe可能被多个渲染进程渲染，而在不同页面中的多个iframe也可能被同一个渲染进程渲染。

**所以，在iframe，页签和渲染进程间并不存在一对一的关系。**

由于Blink运行在渲染进程中的沙盒中，当Blink需要访问文件或播放视频或者访问用户信息（cookie、password等）时必须与[浏览器](https://www.w3cdoc.com)进程通信。这种不同进程间的通信方式被<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/master/mojo/README.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Mojo</a>实现。随着Chromium不断向服务化架构演进，Blink可以通过Mojo来降低消息传递过程中对发送方和接收方对于具体实现的依赖（服务可能在多个进程中，也可能在同一个进程中，消息传递方式不同）<figure data-size="small">


  <img loading="lazy" width="1053" height="503" class="alignnone size-full wp-image-6241 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png?x-oss-process=image/format,webp 1053w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_382/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff08c8c9b4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_367/format,webp 768w" sizes="(max-width: 1053px) 100vw, 1053px" />
</figure>

### Mojo

Mojo是一系列库的集合，用于提供一种进程内或跨进程的通信方案，其中包含了与平台无关的通用的IPC方案、消息IDL格式化和可以与不同语言集成的绑定库。<figure data-size="normal">


  <img loading="lazy" width="568" height="324" class="alignnone size-full wp-image-6242 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0951edad.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0951edad.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0951edad.png?x-oss-process=image/format,webp 568w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0951edad.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_171/format,webp 300w" sizes="(max-width: 568px) 100vw, 568px" />
</figure>

### Message pipe

一个**消息通道（Message pipe）**建立其两个**端点（endpoint）**之间的通道。每一个端点都有一个用于收消息的队列，同时还可以向另一个端点发送消息，而消息通道是双向的。

### Mojom

Mojom文件描述了消息的类型。

有了消息通道和消息类型，通道中的一个端点可以被指定成**`Remote`**，它可以发送Mojom文件中定义好类型的消息。另一个端点则可以被指定成**`Receiver`**，用于接收消息。

### 线程

Blink包含一个主线程，多个Worker线程，还有一些其他的线程。

几乎所有重要的工作都运行在主线程上。包括运行JavaScript（除了Workers），DOM生成，CSS样式和布局计算等，所以交互性能的优化关键主要围绕主线程。

Blink会为Web workers，Service workers创建出独立的线程。虽然运行的都是JavaScript，但主线程与worker线程的运行环境是不共享的，需要通过消息来传递数据。

Blink和V8也可能会创建出其他的用于音视频，数据库和垃圾回收（GC）等功能的线程。

对于线程间通信，会使用PostTask提供的api。除了真的因为性能的原因，使用共享内存的方式实现通信并不被推荐，这也是Blink不使用线程锁（MutexLocks）的原因。<figure data-size="small">


  <img loading="lazy" class="alignnone wp-image-6243 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png?x-oss-process=image/format,webp" alt="" width="603" height="445" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png?x-oss-process=image/format,webp 803w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_222/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_591/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff09fd789c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_567/format,webp 768w" sizes="(max-width: 603px) 100vw, 603px" />
</figure>

## Page, Frame, Document, DOMWindow

### 概念

* 一个**页面（Page）**代表一个[浏览器](https://www.w3cdoc.com)页签，一个渲染进程可能负责渲染多个页面。
* 一个**框（Frame）**代表主框或者一个iframe，一个**页面至少包含一个框。**
* 一个**DOMWindow**代表JavaScript中的window对象，每个框只有一个**DOMWindow**。
* 一个**Document**代表JavaScript中的window.document对象，每个框只有一个**Document。**
* 一个**ExecutionContext**在主线程中抽象一个Document，在worker线程中抽象WorkerGlobalScope。

渲染进程 ：页面 = 1 ：N 页面 ：框 = 1 ：M Frame : DOMWindow : Document (或ExecutionContext) 在任何情况下都是 1 : 1 : 1 ，但有时引用关系会变化。

### 跨进程iframes（OOPIF）

虽然站点隔离机制让页面变的更安全，但却增加了复杂度。站点隔离致力于为每一个站点创建一个渲染进程，例如，<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//mail.example.com/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">https://mail.example.com</a> 和 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chat.example.com/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">https://chat.example.com</a> 属于同一个站点，而 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//noodles.com/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">https://noodles.com</a> 和 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//pumpkins.com/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">https://pumpkins.com</a>则不属于同一个站点。如果一个页面中存在跨站点的iframe则可能被多个渲染进程承载。

从主框的角度看，主框是LocalFrame，iframe则是RemoteFrame。从iframe的角度看，主框则是RemoteFrame，而iframe则是LocalFrame。

LocalFrame和RemoteFrame间的通信被[浏览器](https://www.w3cdoc.com)进程管理。

## Web IDL绑定

Web IDL (Web Interface definition language）是用于描述Web平台中定义的标准如何被[浏览器](https://www.w3cdoc.com)实现的接口定义语言，通过[浏览器](https://www.w3cdoc.com)对这些标准中定义的接口的实现，Web开发者可以使用JavaScript对象来调用这些标准功能。Blink在实现这些标准的同时，还需要为V8中的JavaScript提供调用Blink的途径，这就是Web IDL Bindings。通过对Web IDL的实现和Bindings的存在，就实现了类似在JavaScript中访问某个节点的第一个子节点的功能(node.firstChild)。在实现了通用标准的同时，[浏览器](https://www.w3cdoc.com)还实现了自己特有的功能定义，通用的标准被定义在<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//heycam.github.io/webidl/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">the Web IDL spec</a>，而Blink自己的定义则被定义在<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/master/third_party/blink/renderer/bindings/IDLExtendedAttributes.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Blink-specific IDL extended attributes</a>中。

通常在idl文件被构建时，<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/master/third_party/blink/renderer/bindings/IDLCompiler.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">the IDL compiler</a> 会自动为具体的实现类生成Blink-V8的绑定。当在JavaScript中调用node.firstChild时，V8会调用V8Node::firstChildAttributeGetterCallback() ，然后进一步调用Node::firstChild() 。

## 渲染流水线

Rendering pipeline定义了从HTML字符到在屏幕上显示像素的过程。<figure data-size="normal">


  <img loading="lazy" class="alignnone wp-image-6244 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png?x-oss-process=image/format,webp" alt="" width="663" height="251" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png?x-oss-process=image/format,webp 1302w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_114/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_304/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0ad5ed9b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_291/format,webp 768w" sizes="(max-width: 663px) 100vw, 663px" />
</figure>

关于这部分的内容可以阅读前一篇文章。

## V8

V8是Google打造的开源的，高性能的JavaScript和WebAssembly引擎，使用C++语言实现。V8引擎被应用在Chrome、Nodejs和其他应用中。V8引擎可以独立运行，也可以运行在任何的C++程序中。

一个V8的实例被称作Isolate，每一个isolate都有独立GC的堆栈空间。这就意味着一个Isolate中的JavaScript对象不能直接访问另一个Isolate中的对象。

在Chrome中，每个渲染进程都有一个V8 Isolate，所有被同一个渲染进程处理的站点的JavaScript代码在同一个Isolate中运行。但对于Web worker，每一个worker则拥有自己的Isolate。

在Isolate中，存在一个或多个JavaScript上下文环境（JavaScript content）。Chrome为每个iframe创建一个JavaScript环境。此外，每个Chrome extension对于一个iframe都有自己的JavaScript环境。

Blink通常使用ScriptState对象作为JavaScript环境的引用，blink::ScriptState与v8::Context有着1 : 1的关系。

## 执行流水线

JavaScript脚本的运行需要经历一系列的过程。<figure data-size="normal">


  <img loading="lazy" width="1440" height="977" class="alignnone size-full wp-image-6246 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0be2b335.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

要运行的JavaScript脚本会从网络或缓存中被**加载。** 通过对JavaScript脚本文本的分析可以生成用于描述源代码结构化的数据，**抽象语法树（AST）。** 接下来**Ignition解释器**会将AST转化成生成体积更小的**字节码**，字节码中的每行指令代表着对寄存器的操作，当字节码生后以后AST将会被废弃以节省空间，后续的执行和优化都基于字节码。 在解释器执行字节码时，**Object Shapes**会试图将代码中对象的类型缓存下来生成**Type Feedback**，当访问这些对象时会尝试从缓存中获取，如果找不到再动态查找并更新缓存。 **TurboFan**是V8中的代码优化编译器，它会评估函数是否需要被进一步优化成机器码以提高性能，需要被优化的函数被编译成**Optimized Code**。 但当编译后的函数被发现函数中变量的数据类型与之前缓存的类型不同时，则需要放弃优化的代码回到字节码重新解释执行。

接下来让[我们](https://www.w3cdoc.com)逐一了解每个过程。

### 加载（Loading）

加载是V8获取JavaScript脚本文本的过程。<figure data-size="normal">


  <img loading="lazy" width="1440" height="977" class="alignnone size-full wp-image-6247 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0c484ddf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

V8并不负责资源的下载，所以这些资源可能来自网络、缓存，也可能来自Service worker。

V8可以在文件下载的同时进行接下来的分析工作。

V8拥有脚本热加载的能力：

* **Warm Load**：当V8再次运行同样的脚本时，会将脚本编译后的结果缓存在硬盘中。
* **Hot Load：**当第三次访问时，V8可以跳过分析和编译过程直接从硬盘中读取之前被编译的结果。

### 分析（Parsing）<figure data-size="normal">


  <img loading="lazy" width="1440" height="977" class="alignnone size-full wp-image-6248 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0cae9109.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

分析是将JavaScript脚本文本转化成**抽象语法树（Abstract Syntax Tree）的过程。** **

### **词法分析**

**词法分析（lexical analysis）**是将一系列字符转换成**标记（token）**的过程。这里的**标记**是表示源代码的最小单位，将输入的字符流转换成标记的过程被称为**标记化（tokenization）**，在这个过程中，词法分析器还会对这些标记进行分类。

常见的标记分类有：

* 标识符（identifier）：x，color，UP
* 关键字（keyword）：if，var，return
* 分隔符（separator）：(，}， ;
* 操作符（operator）：*，=，>
* 字面量（literal）：&#8221;Hello world&#8221;, true, 666
* 注释（comment）：// 单行， /_多行_/

### Scanner

扫描器处在词法分析的第一个阶段，通常基于状态机实现，可以在能识别的标记间不断切换。每种标记可以代表一个字符或由多个字符组成的序列。很多时候，根据第一个非空字符就可以推断出标记的类型，然后逐个处理后面的字符，直到出现不属于该类型标记字符集中的字符时结束（最长一致性原则）。

**扫描器只处理utf-16的字符集，所在在扫描器拿到字符之前会有字符集转换的过程。**

### Evaluator

评估器处在词法分析的第二个阶段，用于将某些带有语义的词定义成**值（value）**，一个**语义（lexeme）**是标记类型和值的组合。有的标记有值，比如标识符类型的标记，而有的标记没有值，比如分隔符类型的标记。

例如，在源代码中是这样的： `net_worth_future = (assets – liabilities);` 生成的语义标记可能是这样的：

<div class="highlight">
  ```
IDENTIFIER net_worth_future
EQUALS
OPEN_PARENTHESIS
IDENTIFIER assets
MINUS
IDENTIFIER liabilities
CLOSE_PARENTHESIS
SEMICOLON
```
</div>

### 语法分析

**语法分析（syntactic analysis，也叫 parsing）**是根据某种给定的形式文法对由单词序列（如英语单词序列）构成的输入文本进行分析并确定其语法结构的一种过程。

**语法分析器**（parser）的作用是进行语法检查、并根据输入的单词序列生成带有层次的数据结构（通常是语法分析树、抽象语法树等）

### 抽象语法树与作用域

**抽象语法树（Abstract Syntax Tree）**是源代码结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

这里[我们](https://www.w3cdoc.com)以一段代码作为例子

<div class="highlight">
  ```
function sayHi () {
  var str = "hello world";
  return str;
}

```
</div>

转化成AST后的结构是这样的<figure data-size="small">


  <img loading="lazy" width="1004" height="554" class="alignnone size-full wp-image-6249 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png?x-oss-process=image/format,webp 1004w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_166/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_441/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0d563b99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_424/format,webp 768w" sizes="(max-width: 1004px) 100vw, 1004px" />
</figure>

**FunctionLiteral**代表sayHi函数，Block代表函数体。 左边的**VariableDeclaration**代表变量str的声明，**Assignment**代表赋值，**ReturnStatement**代表return语句。 这里的**VariableProxy**代表对变量的引用，在目前这个阶段还不知道是引用哪个变量。

在分析这个阶段除了要生成AST，还要分析作用域。<figure data-size="normal">


  <img loading="lazy" width="1440" height="529" class="alignnone size-full wp-image-6250 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_110/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_294/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0dc8d3b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_282/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

通过分析，全局作用域中包含函数sayHi的声明，而sayHi的函数作用域中包含变量str的声明。而两个**VariableProxy**所引用的变量也可以确定下来。

V8有两种分析器：Preparser和Full parser。Preparser分析器可以推迟那些不是立即需要分析的函数以减少代码启动需要的时间。Preparser只会处理语法分析和一些错误的检查而不会生成抽象语法树。

V8在这个阶段对各种类型的标记的扫描有着各种的优化手段，感兴趣的同学可以继续阅读<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/blog/scanner" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Blazingly fast parsing, part 1: optimizing the scanner</a>。

在这里推荐一个用于分析抽象语法树的网站：<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//astexplorer.net/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">AST Explorer</a>。在各种lint自定义规则，babel、webpack插件等代码分析、生成的场景里都有帮助。

### 解释（Interpreting）

解释阶段会将AST转换成字节码（bytecode）。得益于<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Just-in-time_compilation" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">即时编译（just-in-time (JIT) compilation）</a>技术，包括V8在内的现代[浏览器](https://www.w3cdoc.com)JavaScript引擎结合了**提前编译（AOT）**的高性能和解释的灵活性。

起初，代码首先被编译器快速的编译成没有被优化过的机器码，在运行的同时再有选择的将需要优化的代码通过更高级的编译器进行优化再编译。这样做虽然提高了运行速度，但也浪费了资源。

其中比较显著的问题是被编译过的机器码会占用大量的内存，即使有的代码可能只会被执行一次。为了解决这些问题，V8团队提出了新的JavaScript解释器，**<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/docs/ignition" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Ignition</a>**。

借助**Ignition**，V8可以将AST先转化成更简洁的字节码，其大小与以往的机器码相比缩小到50%至25%的空间。<figure data-size="normal">


  <img loading="lazy" width="1440" height="977" class="alignnone size-full wp-image-6251 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0e87214a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

由**Ignition**生成的字节码会被用于优化的编译器和调试工具当作数据源，当字节码生成以后，抽象语法树就可以被废弃掉以节省内存。在生成字节码的同时，还会在字节码上增加一些元数据，比如源代码的位置和用于执行字节码的处理函数。

接下来[我们](https://www.w3cdoc.com)利用d8近距离观察一下bytecode，这里[我们](https://www.w3cdoc.com)将下面的JavaScript放在名为bytecode.js的文件中，并运行d8的调试工具。

<div class="highlight">
  ```
function sayHi () {
  var str = 'hello world'
  return str
}

```
</div>

可以得到下面的结果

<div class="highlight">
  ```
# d8 --print-bytecode bytecode.js
[generated bytecode for function:  (0x300d082d25e5 )]
Parameter count 1
Register count 2
Frame size 16
         0x300d082d26ae @    0 : 12 00             LdaConstant [0]
         0x300d082d26b0 @    2 : 26 fa             Star r0
         0x300d082d26b2 @    4 : 27 fe f9          Mov , r1
         0x300d082d26b5 @    7 : 62 3e 01 fa 02    CallRuntime [DeclareGlobals], r0-r1
         0x300d082d26ba @   12 : 0d                LdaUndefined
         0x300d082d26bb @   13 : ab                Return
Constant pool (size = 1)
0x300d082d2681: [FixedArray] in OldSpace
 - map: 0x300d08042201

<map>

* length: 1
           0: 0x300d082d2631 <FixedArray[2]>
Handler Table (size = 0)
Source Position Table (size = 0)</map>
```
 
  
  ```

```
 
  
  ```

```
 
  
  ```

```
  ```

```

</div>

第6行到第11行的输出就是转化以后的字节码。其中的LdaConstant、Star、Mov等等的就是指令。字节码对应的指令比较多，这里截取一部分，更多的指令及解释可以在v8的源代码文件src/interpreter/<a class=" external" href="https://link.zhihu.com/?target=http%3A//interpreter-generator.cc" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">http://interpreter-generator.cc</a>中查看。<figure data-size="normal">


  <img loading="lazy" width="1440" height="1135" class="alignnone size-full wp-image-6252 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_236/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png?x-oss-process=image/quality,q_50/resize,m_fill,w_761,h_600/format,webp 761w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0f262587.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_605/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

在开始分析代码之前需要先介绍**累加器（Accumulator）**，累加器是V8中的一个特殊的寄存器，用于存放中间结果。

<div class="highlight">
  ```
LdaConstant [0]
Star r0
Mov , r1
CallRuntime [DeclareGlobals], r0-r1
LdaUndefined
Return
```
</div>

* **LdaConstant [0]**代表从常量池中取出0号下标的常量并放入累加器中。
* **Star r0**表示将累加器中的内容存放到r0寄存器中。
* **Mov , r1**表示将寄存器的内容放到r1寄存器中。
* **CallRuntime [DeclareGlobals], r0-r1**表示用r0和r1寄存器中的内容作为参数调用DeclareGlobals函数。
* **LdaUndefined**代表将Undefined加载到累加器中。
* **Return**代表返回累加器中的内容。

JavaScript对象被分配在堆中，并不能直接被嵌入到字节码中。所以在字节码中，用数组下标代表JavaScript对象的引用的位置。

[我们](https://www.w3cdoc.com)将源代码稍作修改，然后分析更复杂的字节码

<div class="highlight">
  ```
function sayHi () {
  console.log(str)
  var str = 'hello world'
}

sayHi()
[generated bytecode for function:  (0x3da0082d25e5 <SharedFunctionInfo>)]
Parameter count 1
Register count 3
Frame size 24
         0x3da0082d26b2 @    0 : 12 00             LdaConstant [0]
         0x3da0082d26b4 @    2 : 26 f9             Star r1
         0x3da0082d26b6 @    4 : 27 fe f8          Mov <closure>, r2
         0x3da0082d26b9 @    7 : 62 3e 01 f9 02    CallRuntime [DeclareGlobals], r1-r2
         0x3da0082d26be @   12 : 13 01 00          LdaGlobal [1], [0]
         0x3da0082d26c1 @   15 : 26 f9             Star r1
         0x3da0082d26c3 @   17 : 5d f9 02          CallUndefinedReceiver0 r1, [2]
         0x3da0082d26c6 @   20 : 26 fa             Star r0
         0x3da0082d26c8 @   22 : ab                Return
Constant pool (size = 2)
0x3da0082d2681: [FixedArray] in OldSpace
 - map: 0x3da008042201 <Map>
 - length: 2
           0: 0x3da0082d2631 <FixedArray[2]>
           1: 0x3da0082d25b1 <String[5]: #sayHi>
Handler Table (size = 0)
Source Position Table (size = 0)
[generated bytecode for function: sayHi (0x3da0082d2641 <SharedFunctionInfo sayHi>)]
Parameter count 1
Register count 3
Frame size 24
         0x3da0082d280a @    0 : 13 00 00          LdaGlobal [0], [0]
         0x3da0082d280d @    3 : 26 f8             Star r2
         0x3da0082d280f @    5 : 28 f8 01 02       LdaNamedProperty r2, [1], [2]
         0x3da0082d2813 @    9 : 26 f9             Star r1
         0x3da0082d2815 @   11 : 5a f9 f8 fa 04    CallProperty1 r1, r2, r0, [4]
         0x3da0082d281a @   16 : 12 02             LdaConstant [2]
         0x3da0082d281c @   18 : 26 fa             Star r0
         0x3da0082d281e @   20 : 0d                LdaUndefined
         0x3da0082d281f @   21 : ab                Return
Constant pool (size = 3)
0x3da0082d27d5: [FixedArray] in OldSpace
 - map: 0x3da008042201 <Map>
 - length: 3
           0: 0x3da00824a15d <String[7]: #console>
           1: 0x3da00824a1d1 <String[3]: #log>
           2: 0x3da0082d278d <String[11]: #hello world>
Handler Table (size = 0)
Source Position Table (size = 0)
undefined

```
</div>

这里[我们](https://www.w3cdoc.com)主要看第二段字节码

* **LdaGlobal [0], [0]**代表从常量池下标为0的位置读取内容并存储在累加器中，也就是console。而第二个[0]代表**反馈向量槽（feedback vector slot）**中相应的位置，目的为了帮助后面的优化编译器提供优化信息。
* **Star r2**代表将累加器中的内容存储到r2寄存器中，此时r2中存放的就是console。
* **LdaNamedProperty r2, [1], [2]**代表获取r2寄存器中的对象的在常量池中1号位的属性。常量池1号位存放的是log，LdaNamedProperty r2, [1]也就是console.log，并存放在累加器中。
* **Star r1**将累加器中的console.log存放在r1寄存器中。
* **CallProperty1 r1, r2, r0, [4]**表示调用r1寄存器中的console.log，以r2、r0寄存器中的内容为参数。r2中是console，当[我们](https://www.w3cdoc.com)发现r0直到第32行才会存放常量hello world，所以调用console.log会打印出undefined。

### 执行（Execution）<figure data-size="normal">


  <img loading="lazy" width="1440" height="977" class="alignnone size-full wp-image-6253 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff0fdc7e99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

JavaScript是一种动态语言，一行简单的属性访问可以包含复杂的语义。

Object.foo可能是简单的属性访问，也可能会调用Getter，甚至可能需要遍历原型链查找。

这种动态性需要消耗更多的时间查找属性，会降低运行的速度。为了提高性能，V8将第一次分析的结果缓存起来，当再次访问属性时直接从缓存中读取。

V8会调用GetProperty(object, &#8220;foo&#8221;, feedback_cache)，如果feedback中缓存了对于object.foo的操作则跳过任何查找步骤。

### Object Shapes

Object Shapes也被叫做Hidden Classes或Maps，代表着JavaScript对象的结构，属性和元素如何被存储。

JavaScript作为一种动态语言在实例化对象之后可以轻易的添加或删除对象中的属性。

<div class="highlight">
  ```
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const point = new Point(1, 1)
point.version = '1.0.0'

```
</div>

像Java这样的静态语言，一个对象中的属性结构可以在编译前就确定下来，所以这些属性的值可以存储在一段连续的内存空间中，属性间的偏移量可以通过属性的类型计算出来。但由于JavaScript的动态性，属性的查找会慢于那些静态语言。

为了解决这个问题，V8使用**Hidden Classes**来描述对象的结构。

<div class="highlight">
  ```
let point = { x:1, y:1, '2': '1', in: {} };
point.out = {};
point[1] = 1;

```
</div>

利用d8调试工具运行上面的代码可以得到下面的结果。

<div class="highlight">
  ```
DebugPrint: 0xe4a08148b69: [JS_OBJECT_TYPE]
 - map: 0x0e4a083074d5 <Map(HOLEY_ELEMENTS)> [FastProperties]
 - prototype: 0x0e4a082c3c69 </object> 0xe4a082d2605: [String] in OldSpace: #out: 0x0e4a08148c6d  } - elements: 0x0e4a08148bc5 <FixedArray[20]> { 0: 0x0e4a08042429
```
 1: 1 2: 0x0e4a08044939 <String[1]: #1> 3-19: 0x0e4a08042429 } 0xe4a083074d5: [Map] - type: JS_OBJECT_TYPE - instance size: 24 - inobject properties: 3 - elements kind: HOLEY_ELEMENTS - unused property fields: 2 - enum length: invalid - stable_map - back pointer: 0x0e4a083074ad <Map(HOLEY_ELEMENTS)> - prototype_validity cell: 0x0e4a082d277d value= 0> - instance descriptors (own) #4: 0x0e4a08148c89 <DescriptorArray[4]> - prototype: 0x0e4a082c3c69 
``` </div>

    
      </other></jsfunction></object>
    </div> 
    
    
      0xe4a082d2605: [String] in OldSpace: #out: 0x0e4a08148c6d 
    
    
    ```

```
    
    
      这里[我们](https://www.w3cdoc.com)重点分析point对象中的in和out属性，[我们](https://www.w3cdoc.com)发现在对象初始化定义时的in属性被存储在对象内部（in-object），而在对象初始化之后被添加的out属性则被添加到properties中，而访问in-object的属性速度要快于properties中的属性。
    
    
    
    所以属性的动态修改会产生新的Hidden Class及属性存储位置的变化。在实际开发中尽量不要在对象初始化好以后再动态的增加或删除对象中的属性。 ** 有了Hidden Classes，访问JavaScript对象的属性时就可以像静态语言那样通过坐标偏移量来快速的定位。
    
    
    <h3>
      Inline Cache
    </h3>
    
    
      V8通过内联缓存（Inline Cache）策略优化访问对象的性能。
    
    
    
      IC为函数创建名叫反馈向量（FeedBack Vector）的用于存放对象及对象属性的信息。
    
    
    <div class="highlight">
      ```
function load(o) {
  return o.x
}

load({ x: 10 })

```
    </div>

    
      此时IC会在反馈向量中存储 { x: 10 }对象的类型信息和x属性的信息。
    <figure data-size="small"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6257 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png?x-oss-process=image/format,webp" alt="" width="591" height="260" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png?x-oss-process=image/format,webp 1134w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_132/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_353/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff16f760cf.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_339/format,webp 768w" sizes="(max-width: 591px) 100vw, 591px" />
    </figure> 
    
    
      反馈向量与数据库表结构相似，0代表在表中的位置 LOAD_IC代表操作的类型 Monomorphic是当前这条反馈向量的状态是单态，状态是IC中非常重要的概念，除了单态还有多态（Polymorphic）和复态（Megamorphic）。在函数运行过程中随着参数类型的变化，状态可能会发生变化。 Map中存放对象的类型信息。 Bitfield中放置对象属性的信息。
    
    
    
      有了反馈向量，load函数被反复调用时如果参数类型没有发生变化，就可以通过bitfield中存储的属性信息快速的找到属性中的值，避免反复的动态查询。
    
    
    
      当参数的类型发生变化时：
    
    
    <div class="highlight">
      ```
load({ x: 100 })
load({ y: 1, z: 2 })

```
    </div>

    
      需要把两种类型都缓存起来。此时，反馈向量中的状态就会从单态变成多态，反馈向量的结构也会发生变化。
    <figure data-size="small"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6258 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff17c328d3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff17c328d3.png?x-oss-process=image/format,webp" alt="" width="296" height="325" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff17c328d3.png?x-oss-process=image/format,webp 674w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff17c328d3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_273,h_300/format,webp 273w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff17c328d3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_546,h_600/format,webp 546w" sizes="(max-width: 296px) 100vw, 296px" />
    </figure> 
    
    
      反馈向量从原本存储一个类型信息变化成数组结构存储多个类型信息。
    
    
    
      接下来[我们](https://www.w3cdoc.com)通过d8工具和Indicium工具分析IC的变化过程。
    
    
    <div class="highlight">
      ```
class Test {
  constructor(a, b, c, d, e) {
    if (a) {
      this.a = a;
    }

    if (b) {
      this.b = b;
    }

    if (c) {
      this.c = c;
    }

    if (d) {
      this.d = d;
    }

    if (e) {
      this.e = e;
    }
  }
}

const util = {
  merge(test) {
    return test.a + test.b + test.c + test.d + test.e;
  }
};

let rst;

console.time('Test');
const test1 = new Test(1);
for (let i = 0; i < 10e6; i++) {
  rst = util.merge(test1);
}

const test2 = new Test(null, 1);
for (let i = 0; i < 10e6; i++) {
  rst = util.merge(test2);
}

const test3 = new Test(null, null, 1);
for (let i = 0; i < 10e6; i++) {
  rst = util.merge(test3);
}

const test4 = new Test(null, null, null, 1);
for (let i = 0; i < 10e6; i++) {
  rst = util.merge(test4);
}

const test5 = new Test(null, null, null, null, 1);
for (let i = 0; i < 10e6; i++) {
  rst = util.merge(test5);
}
console.timeEnd('Test');

```
    </div>

    
      这里[我们](https://www.w3cdoc.com)在Test实例化的过程中动态的添加a, b, c, d, e属性中的一个来创造出5中类型信息。并记录5次循环的运行时间。
    
    
    <div class="highlight">
      ```
d8 ic.js --trace-maps --trace_ic --log-source-code
console.timeEnd: Test, 12668.593000
```
    </div><figure data-size="normal">

    
      <img loading="lazy" class="alignnone wp-image-6259 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/format,webp" alt="" width="505" height="501" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/format,webp 1380w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_298/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_604,h_600/format,webp 604w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff19668e56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_762/format,webp 768w" sizes="(max-width: 505px) 100vw, 505px" />
    </figure> 
    
    
      通过Indicium对日志的分析，[我们](https://www.w3cdoc.com)发现在调用merge函数时，反馈向量的状态从0到复态改变了3次。
    
    
    <ul>
      
        merge函数第一次调用时原本为空的反馈向量被放入了 { a: 1 } 的类型信息，此时反馈向量的状态从0变成单态
      
      
        第二次调用时 { b: 1 } 被放入反馈向量中，参数类型发生了改变，反馈向量的状态从单态变成多态
      
      
        第三、四次是 { c: 1 } 和 { d: 1 } 的类型信息被放入反馈向量，状态多态变成多态
      
      
        当第五种对象 { e: 1 } 被传入函数merge时，反馈向量中存储的类型信息已经达到5种，此时V8不再缓存类型信息来优化运行速度，状态从 多态变成复态
      
    
    
    
      当反馈向量中的对象只有1种类型信息时为状态为单态，2-4种时为多态，超过4种以后变成复态。 现在[我们](https://www.w3cdoc.com)将代码中Test构造函数的中if去掉，让由Test构造出的对象结构保持一致，重新运行调试命令可以得到下面的结果。
    
    
    <div class="highlight">
      ```
onsole.timeEnd: Test, 560.487000
```
    </div><figure data-size="normal"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6260 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png?x-oss-process=image/format,webp" alt="" width="522" height="501" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png?x-oss-process=image/format,webp 1360w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_288/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png?x-oss-process=image/quality,q_50/resize,m_fill,w_625,h_600/format,webp 625w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1a0e1616.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_738/format,webp 768w" sizes="(max-width: 522px) 100vw, 522px" />
    </figure> 
    
    
      [我们](https://www.w3cdoc.com)发现运行时间大幅降低的同时，反馈向量状态由原本的4种变化变成1种。
    
    
    
    通过对IC的分析，在实际开发中，要尽量减少函数参数的类型种类的数量。 **
    
    
    <h3>
      优化（Optimizing）
    </h3>
    
    
      优化过程是V8利用TurboFan编译器将字节码编译成机器码的过程。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6261 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png?x-oss-process=image/format,webp" alt="" width="614" height="416" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_543/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1abc8827.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_521/format,webp 768w" sizes="(max-width: 614px) 100vw, 614px" />
    </figure> 
    
    
    TurboFan是一个&#8221;Sea-of-nodes&#8221;基于图的编译器，它将代码中的数据、流程控制和副作用依赖以节点的方式表达。通过不同阶段的优化，将代码编译成机器码。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6262 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png?x-oss-process=image/format,webp" alt="" width="713" height="348" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png?x-oss-process=image/format,webp 960w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_147/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_391/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1b4cc864.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_375/format,webp 768w" sizes="(max-width: 713px) 100vw, 713px" />
    </figure> 
    
    
      在解释运行的过程中，TurboFan会选择个别的函数进行优化以保证优化是有意义的。相比以前的编译器，TurboFan以Ignition生成的字节码作为数据源，而不再需要重新构建AST结构。
    
    
    
    TurboFan的优化过程可参见下图
    <figure data-size="normal"> 
    
    
      <img loading="lazy" width="931" height="549" class="alignnone size-full wp-image-6263 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png?x-oss-process=image/format,webp 931w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_177/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_472/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1bdaedbd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_453/format,webp 768w" sizes="(max-width: 931px) 100vw, 931px" />
    </figure> 
    
    
      在TurboFan将字节码编译成机器码的过程中，还进行了简化处理
    <figure data-size="normal"> 
    
    
      <img loading="lazy" width="960" height="456" class="alignnone size-full wp-image-6265 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png?x-oss-process=image/format,webp 960w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_380/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1d9cfc04.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_365/format,webp 768w" sizes="(max-width: 960px) 100vw, 960px" />
    </figure> 
    
    
      通过TurboFan对字节码的进一步优化，让JavaScript代码中的函数可以拥有与编译语言同样的运行速度。 之所以TurboFan可以像编译静态语言那样编译JavaScript是需要建立在Type Feedback上，也就是说在函数中的对象类型信息不变的情况下编译才有意义。所以当被优化的函数在运行过程中发现数据类型发生变化时就需要放弃优化的代码，回到解释执行的过程中执行并更新类型信息。
    
    
    ##     内存管理
    

    
    
      V8的垃圾回收器被称作Orinoco。
    
    
    
      在一次垃圾回收过程中，Orinoco通过对象的引用访问程序中的所有对象，那些回收器无法访问的对象所占用的内存会被回收掉。
    
    
    <div class="highlight">
      ```
window.obj = new Object()
window.obj = new Object()

```
    </div><figure data-size="small">

    
      <img loading="lazy" class="alignnone wp-image-6266 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1decf72a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1decf72a.png?x-oss-process=image/format,webp" alt="" width="435" height="296" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1decf72a.png?x-oss-process=image/format,webp 709w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1decf72a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_204/format,webp 300w" sizes="(max-width: 435px) 100vw, 435px" />
    </figure> 
    
    
      由于obj指向了新的对象，所以图中红色虚线的部分就会被回收。
    
    
    
    Orinoco将存放对象的堆空间分成新、老两个生代。新创建的对象被放在新生代中，存活时间较长的对象则被存放在老生代中。
    
    
    
      新生代的存储空间最大可以达到32M，而老生代可以达到2G。
    
    
    
      除了对象的存储空间，还需要为用于执行的代码分配独立的内存空间。
    
    
    
      JavaScript中的对象由Orinoco回收，其他如DOM之类的对象则由Blink的垃圾回收器Oilpan处理，所以V8通过Orinoco解决了跨JS/C++的对象引用访问的功能。
    
    
    
      V8有着不同的垃圾回收策略：
    
    
    <ul>
      
        Minor GC（Scavenge）用于新生代
      
      
        Major GC（Full Mark-Compact）用于整个堆空间
      
    
    
    <h3>
      Minor GC
    </h3>
    
    
      新生代中的内存空间被分成两个同样大的空间，一个用于放新创建的对象，另一个则是空的。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6267 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/format,webp" alt="" width="657" height="323" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/format,webp 1808w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_147/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_393/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_377/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1e98c355.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_754/format,webp 1536w" sizes="(max-width: 657px) 100vw, 657px" />
    </figure> 
    
    
      当Minor GC触发时会将对象区中可以被访问的对象复制到空闲区中，然后形成新的对象区和空闲区。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6268 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png?x-oss-process=image/format,webp" alt="" width="716" height="269" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png?x-oss-process=image/format,webp 1398w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_113/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_301/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff1f3a0f96.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_289/format,webp 768w" sizes="(max-width: 716px) 100vw, 716px" />
    </figure> 
    
    
      如果一个对象经历了两次Minor GC后依然存活则会被复制到老生代中。
    
    
    <h3>
      Major GC
    </h3>
    
    
      Major GC包括几个阶段
    
    
    <h3>
      标记（Marking）
    </h3>
    
    
      这个阶段V8会尝试访问所有的对象以标记那些可访问和不可访问的对象。
    
    
    <h3>
      压实（Compaction）
    </h3>
    
    
      压实是碎片整理的过程，由于复制对象是一种高成本的操作，所以V8只会压实那些高度碎片化的页（Page） 。
    <figure data-size="small"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6269 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20107ab4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20107ab4.png?x-oss-process=image/format,webp" alt="" width="462" height="433" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20107ab4.png?x-oss-process=image/format,webp 686w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20107ab4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_281/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20107ab4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_641,h_600/format,webp 641w" sizes="(max-width: 462px) 100vw, 462px" />
    </figure> 
    
    
      在压实过程中，会将原本已经碎片化的页中的对象复制到新的页中。
    
    
    <h3>
      清除（Sweep）
    </h3>
    
    
      清除这个阶段会将页中无法访问的对象内存清空，同时在Free List中更新这些空白的区域。这个过程与压实过程基本上是同时开始的，对于那些不需要压实的页的不可访问对象的内存空间会直接清除掉。
    <figure data-size="small"> 
    
    
      <img loading="lazy" class="alignnone wp-image-6270 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png?x-oss-process=image/format,webp" alt="" width="591" height="326" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png?x-oss-process=image/format,webp 1162w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_166/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_442/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff20968217.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_424/format,webp 768w" sizes="(max-width: 591px) 100vw, 591px" />
    </figure> 
    
    
      Major GC会运行Blink Oilpan GC过程，所以Oilpan中需要清除的对象也会在Major GC过程中被销毁。
    
    
    ##     State of GC in V8
    

    
    
      如果GC工作完全在主线程上进行，则可能会对用户体验产生影响。
    
    
    
      通常让垃圾回收兼顾低延迟和高吞吐是困难的，为了让垃圾回收过程不会阻塞主线程上其他的工作，V8将整个垃圾回收过程以增量的方式拆分成多个阶段，这些不同阶段的回收过程可以穿插在主线程上其他的工作间隙处。与此同时，用多线程并行的方式让垃圾回收工作在非主线程上进行。
    
    
    <h3>
      Minor GC
    </h3>
    
    
      在新生代GC过程中，V8将GC任务分配给帮助线程。每个线程会收到一些指针，并立即开始访问这些对象并将他们复制到空闲区中。由于在多个线程执行任务的过程中可能会访问同一个对象，所以这些任务必须以原子化并同步的方式运行。当一个线程移动了一个对象，则会将对象的指针更新成新的位置，当其他线程访问这个对象时位置就已经发生了变化。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" width="960" height="339" class="alignnone size-full wp-image-6271 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png?x-oss-process=image/format,webp 960w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_106/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_283/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff21275047.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_271/format,webp 768w" sizes="(max-width: 960px) 100vw, 960px" />
    </figure> 
    
    <h3>
      Major GC
    </h3>
    
    
      当堆空间接近极限时，并行的标记工作在帮助线程中开始运行，与Minor GC不同的是这部分工作完全在帮助线程中，主线程只负责汇总。
    <figure data-size="normal"> 
    
    
      <img loading="lazy" width="960" height="339" class="alignnone size-full wp-image-6272 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png?x-oss-process=image/format,webp 960w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_106/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_283/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff2176b263.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_271/format,webp 768w" sizes="(max-width: 960px) 100vw, 960px" />
    </figure> 
    
    
      当帮助线程中标记工作完成后，主线程会暂停JavaScript的执行并快速的确认所有存活下来的对象已经被标记过，然后与一部分帮助线程同时完成压实的工作，与此同时，另外一部分线程会开始清除那些需要销毁的对象并在Free List中更新这部分空间。
    
    
    
      通过多年来的演进，现在的V8垃圾回收性能已经有了显著的提升。在开发过程中，绝大多数情况[我们](https://www.w3cdoc.com)并不需要考虑垃圾回收的问题，但通过对这部分内容的学习，可以让[我们](https://www.w3cdoc.com)更好的掌握垃圾回收的原理，而这些原理在不同的语言中是通用的。
    
    
    ##     总结
    

    
    
      Blink作为Chrome的内核运行在渲染进程中，负责几乎所有发生在[浏览器](https://www.w3cdoc.com)页签中的工作。 Blink在实现Web规范中定义的标准的同时也实现了属于Chrome特有的功能。 V8是Blink的JavaScript引擎，负责运行JavaScript脚本。
    
    
    
      一个JavaScript脚本运行要经历加载、分析、解释执行、优化和反优化几个过程，其中Ignition负责将抽象语法树转化成字节码以节省存储空间，TurboFan则根据对象类型信息将部分函数的字节码编译成机器码加速执行。编译后的函数运行过程中发现对象类型变化了则回退到字节码解释阶段执行。
    
    
    
      V8将内存分成新生代、老生代和代码空间分别存储新创建的对象、长期存活的对象和可执行代码。 新生代中的垃圾回收使用Scavenge策略，快速的在两个相同大小的空间交换的过程中将不再存活的对象释放掉。 而另一种Full Mark-Compact策略则负责整个堆的垃圾回收，经过在不同的线程中完成标记-压实-清除工作保证垃圾回收过程在低延迟的同时可以实现高吞吐量。
    
    
    
      到此，这篇文章终于要结束了，希望这篇文章能帮助你搭建起Blink和V8的概要视图，为你的[前端](https://www.w3cdoc.com)知识体系点亮一颗新的技能树。
    
    
    
      在最后的相关资料中罗列了我在学习V8过程中参考的文档和视频，这里一并奉上。
    
    
    
      最后的最后，谢谢你的阅读。
    
    
    ##     相关资料
    

    
    <ul>
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//docs.google.com/presentation/d/1sJj-JnSvM71zq-N_CT8qqsLngdW8fgOMiJdd2ylLojs/edit%23slide%3Did.g26e94b78b8_0_9" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Life of a script</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/blog/trash-talk" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">V8 Trash talk</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DScxz6jVS4Ls%26feature%3Demb_logo" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Orinoco: The new V8 Garbage Collector Peter Marshall</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.chromium.org/blink/blink-gc" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Chromium blink-gc</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//darksi.de/d.sea-of-nodes/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Sea of Nodes</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//benediktmeurer.de/2017/03/01/v8-behind-the-scenes-february-edition" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">V8: Behind the Scenes (February Edition feat. A tale of TurboFan)</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3Du7zRSm8jzvA" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">V8 and How It Listens to You</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/blog/system-analyzer" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Indicium: V8 runtime tracer tool</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/docs/d8" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">d8</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//erdem.pl/2019/08/v-8-function-optimization" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">V8 function optimization</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/blog/fast-properties" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Fast properties in V8</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Understanding V8’s Bytecode</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//github.com/lazyparser/v8-internals" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">V8 Internals: Porting to RISC-V Build & Run, Igni-on Bytecodes</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DJ9HAvlW7BqA" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Understanding Why The New V8 Is So Fast, One Demo At A Time</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3Dr5OWCtuKiAk%26feature%3Demb_logo" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">BlinkOn 6 Day 1 Talk 2: Ignition - an interpreter for V8</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//v8.dev/blog/ignition-interpreter" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Firing up the Ignition interpreter</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//docs.google.com/presentation/d/1OqjVqRhtwlKeKfvMdX6HaCIu9wpZsrzqpIVIwQSuiXQ/edit%23slide%3Did.g1357e6d1a4_0_58" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Ignition: An Interpreter for V8 [BlinkOn]</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit%23" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">How Blink works</a>
      
      
        <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//chromium.googlesource.com/chromium/src/%2B/master/mojo/README.md" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Mojo</a>
      
    
    
    
      
    

 [1]: https://www.f2e123.com/fed-regain
