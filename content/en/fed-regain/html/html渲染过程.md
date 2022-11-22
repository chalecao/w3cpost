---
title: html渲染过程

---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

一个 Chrome 浏览器一般会有一个 Browser 进程(运行UI线程、管理tab和运行插件线程等等的主进程)，一个 GPU 进程，和多个 Renderer 进程，通常每个 Renderer 进程对应一个页面。在特殊架构（Android WebView）或者特定配置下，Browser 进程可以兼作 GPU 进程或者 Renderer 进程（意味着没有独立的 GPU 或者 Renderer 进程），但是 Browser 跟 Renderer，Browser 跟 GPU，Renderer 跟 GPU 之间的系统架构和通讯方式基本保持不变，线程架构也是同样。参考这里：<http://dev.chromium.org/developers/design-documents/multi-process-architecture>

  1. Blink 主要运行在 Renderer 进程的 Renderer 线程，我们通常会称之为内核主线程；
  2. Layer Compositor 主要运行在 Renderer 进程的 Compositor 线程；
  3. Display Compositor 主要运行在 Browser 进程的 UI 线程；

<p id="JyxGQCM">
  <img loading="lazy" class="alignnone wp-image-6417 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba9102cf74.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba9102cf74.png?x-oss-process=image/format,webp" alt="" width="568" height="527" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba9102cf74.png?x-oss-process=image/format,webp 700w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba9102cf74.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_278/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fbba9102cf74.png?x-oss-process=image/quality,q_50/resize,m_fill,w_647,h_600/format,webp 647w" sizes="(max-width: 568px) 100vw, 568px" />
</p>

<div class="e-secret">
  </p>
  
  <h1>
    进程/线程架构
  </h1>
  
  <p>
    Chromium拥有一套多进程架构。Chromium有一个浏览器进程和多个带有沙盒能力的渲染进程。Blink则运行在渲染进程中。
  </p>
  
  <p>
    从安全的角度考虑，让不同的站点保持相互隔离是非常重要的，这被称作<b>站点隔离（Site Isolation）</b>。理论上讲，一个渲染进程应该最多只能负责一个站点的渲染工作。但实际上，当用户打开很多页签时，渲染进程与站点1对1的关系会占用大量的内存。所以一个渲染进程可能会被多个iframe或页签所共享，也就是说一个页面中的多个iframe可能被多个渲染进程渲染，而在不同页面中的多个iframe也可能被同一个渲染进程渲染。
  </p>
  
  <p>
    <b>所以，在iframe，页签和渲染进程间并不是简单的一对一的关系。</b>
  </p>
  
  <ul>
    <li>
      一个<b>页面（Page）</b>代表一个浏览器页签，一个渲染进程可能负责渲染多个页面。
    </li>
    <li>
      一个<b>框（Frame）</b>代表主框或者一个iframe，一个<b>页面至少包含一个框。</b>
    </li>
    <li>
      一个<b>DOMWindow</b>代表JavaScript中的window对象，每个框只有一个<b>DOMWindow</b>。
    </li>
    <li>
      一个<b>Document</b>代表JavaScript中的window.document对象，每个框只有一个<b>Document。</b>
    </li>
    <li>
      一个<b>ExecutionContext</b>在主线程中抽象一个Document，在worker线程中抽象WorkerGlobalScope。
    </li>
  </ul>
  
  <p>
    渲染进程 ：页面  <span style="color: #ff0000;">= </span> 1 ：N 页面 ：框  <span style="color: #ff0000;">= </span> 1 ：M Frame : DOMWindow : Document (或ExecutionContext) 在任何情况下都是 1 : 1 : 1 ，但有时引用关系会变化。
  </p>
  
  <p>
    由于Blink运行在渲染进程中的沙盒中，当Blink需要访问文件或播放视频或者访问用户信息（cookie、password等）时必须与浏览器进程通信。这种不同进程间的通信方式被Mojo实现。随着Chromium不断向服务化架构演进，Blink可以通过Mojo来降低消息传递过程中对发送方和接收方对于具体实现的依赖（服务可能在多个进程中，也可能在同一个进程中，消息传递方式不同）
  </p>
  
  <p id="upKGWXl">
    <img loading="lazy" class="alignnone wp-image-6204 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/format,webp" alt="" width="452" height="215" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/format,webp 1053w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_382/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafedeb516cd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_367/format,webp 768w" sizes="(max-width: 452px) 100vw, 452px" />
  </p>
  
  <h2>
    <strong>Main thread or WebKit/Blink thread</strong>
  </h2>
  
  <p>
    内核线程 &#8211; 负责解析，排版，Render 树绘制，JavaScript执行，它有可能执行真正的网页内容的光栅化，也有可能只是纪录绘制指令，由独立的光栅化线程执行；
  </p>
  
  <p>
    Blink实现了在浏览器页签中所有的渲染工作，其中包括：
  </p>
  
  <ul>
    <li>
      实现了Web平台中的标准，例如HTML标准，包括DOM、CSS等。
    </li>
    <li>
      内置了V8引擎用于运行JavaScript。
    </li>
    <li>
      从网络堆栈中获取资源
    </li>
    <li>
      构建DOM树
    </li>
    <li>
      计算样式和布局
    </li>
    <li>
      内置了Chrome Compositor和绘制图形的能力
    </li>
  </ul>
  
  <p>
    Blink包含一个主线程，多个Worker线程（事件处理线程，http网络线程，定时器任务线程，文件系统处理线程等等），还有一些其他的线程。
  </p>
  
  <p>
    几乎所有重要的工作都运行在主线程上。包括运行JavaScript（除了Workers），DOM生成，CSS样式和布局计算等，所以交互性能的优化关键主要围绕主线程。这部分会在后续章节JavaScript事件循环机制上介绍，可以参考<a href="https://www.f2e123.com/javascriptnodejs/4734.html">浏览器与node环境的事件循环机制</a>。
  </p>
  
  <p>
    Blink会为Web workers，Service workers创建出独立的线程。虽然运行的都是JavaScript，但主线程与worker线程的运行环境是不共享的，需要通过消息来传递数据。Blink和V8也可能会创建出其他的用于音视频，数据库和垃圾回收（GC）等功能的线程。
  </p>
  
  <p>
    对于线程间通信，会使用PostTask提供的api。除了真的因为性能的原因，使用共享内存的方式实现通信并不被推荐，这也是Blink不使用线程锁（MutexLocks）的原因。
  </p>
  
  <p id="FtjSGyt">
    <img loading="lazy" class="alignnone wp-image-6203 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/format,webp" alt="" width="315" height="232" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/format,webp 803w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_222/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_591/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafed21016b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_567/format,webp 768w" sizes="(max-width: 315px) 100vw, 315px" />
  </p>
  
  <h3>
    blink与v8
  </h3>
  
  <p>
    V8是Google打造的开源的，高性能的JavaScript和WebAssembly引擎，使用C++语言实现。V8引擎被应用在Chrome、Nodejs和其他应用中。V8引擎可以独立运行，也可以运行在任何的C++程序中。
  </p>
  
  <p>
    一个V8的实例被称作Isolate，每一个isolate都有独立GC的堆栈空间。这就意味着一个Isolate中的JavaScript对象不能直接访问另一个Isolate中的对象。
  </p>
  
  <p>
    在Chrome中，每个渲染进程都有一个V8 Isolate，所有被同一个渲染进程处理的站点的JavaScript代码在同一个Isolate中运行。但对于Web worker，每一个worker则拥有自己的Isolate。
  </p>
  
  <p>
    在Isolate中，存在一个或多个JavaScript上下文环境（JavaScript content）。Chrome为每个iframe创建一个JavaScript环境。此外，每个Chrome extension对于一个iframe都有自己的JavaScript环境。
  </p>
  
  <p>
    Blink通常使用ScriptState对象作为JavaScript环境的引用，blink::ScriptState与v8::Context有着1 : 1的关系。
  </p>
  
  <h2>
    <strong>Rasterize thread</strong>
  </h2>
  
  <p>
    光栅化线程 &#8211; 如果内核线程只负责将网页内容转换为绘图指令列表，则真正的光栅化（执行绘图指令计算出像素的颜色值）则由独立的光栅化线程完成；
  </p>
  
  <h2>
    <strong>Compositor thread</strong>
  </h2>
  
  <p>
    Layer Compositor 接收 Blink 生成的 Main Frame，并转换成合成器内部的图层树结构（因为图层化决策仍然由 Blink 负责，所以这里的转换基本上可以认为是生成一棵同样的树，再逐个对图层进行拷贝）。
  </p>
  
  <p>
    Layer Compositor 需要为每个图层进行分块，为每个分块分配 Resource（Texture 的封装），然后安排光栅化任务。
  </p>
  
  <p>
    当 Layer Compositor 接收到来自 Browser 的绘制请求时，它会为当前可见区域的每个图层的每个分块生成一个 Draw Quad 的绘制指令（矩形绘制，指令实际上指定了坐标，大小，变换矩阵等属性），所有的 Draw Quad 指令和对应的 Resource 的集合就构成了 Compositor Frame。Compositor Frame 被发送往 Browser，并最终到达 Display Compositor（未来也可以直接发给 Display Compositor），产生 GL 绘图指令，然后将绘图指令的缓存发送给 GPU 线程执行；
  </p>
  
  <h2>
    <strong>GPU thread</strong>
  </h2>
  
  <p>
    GPU 线程 &#8211; 如果使用 GPU 合成，则由 GPU 线程负责执行 GL 绘图指令，访问 GPU，可能跟合成线程是同一个线程，也有可能是独立的线程（合成线程产生GL指令，GPU 线程执行）；
  </p>
  
  <h2>
    <strong>Browser UI thread</strong>
  </h2>
  
  <p>
    浏览器 UI 线程，如果跟 GPU 线程不是同一个线程，则只负责外壳的绘制，如果跟 GPU 线程是同一个线程，则同时负责绘制外壳的UI界面，和网页的合成输出，到窗口帧缓存；
  </p>
  
  <p>
    精心打造全新课程，欢迎吐槽！反馈宝贵意见！
  </p>
  
  <p>
    在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>
  </p>
  
  <h1>
    渲染流水线
  </h1>
  
  <p>
    <img loading="lazy" class="alignnone wp-image-6275 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/format,webp" alt="" width="577" height="219" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/format,webp 1302w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_114/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_304/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faff3e35521d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_291/format,webp 768w" sizes="(max-width: 577px) 100vw, 577px" />
  </p>
  
  <p>
    所有的渲染流水线都会有帧的概念，帧这个概念抽象描述了渲染流水线下级模块往上级模块输出的绘制内容相关数据的封装。我们可以看到 Blink 输出 Main Frame 给 Layer Compositor，Layer Compositor 输出 Compositor Frame 给 Display Compositor，Display Compositor 输出 GL Frame 给 Window。我们觉得一个动画是否流畅，最终取决于 GL Frame 的帧率（也就是目标窗口的绘制更新频率），而觉得一个触屏操作是否响应即时，取决于从 Blink 处理事件到 Window 更新的整个过程的耗时（理论上应该还要加上事件从 Browser 发送给 Compositor，再发送给 Blink 的这个过程的耗时）。
  </p>
  
  <p id="WlcLgWk">
    <img loading="lazy" class="alignnone wp-image-6200 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/format,webp" alt="" width="415" height="308" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/format,webp 1392w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_222/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_593/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafe3c1d061c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_569/format,webp 768w" sizes="(max-width: 415px) 100vw, 415px" />
  </p>
  
  <p>
    上图显示了 Chrome 一个高度简化后的渲染流水线示意图：
  </p>
  
  <ol>
    <li>
      最底层的是 Chrome 最核心的部分 Blink，负责JS的解析执行，HTML/CSS解析，DOM操作，排版，图层树的构建和更新等任务；
    </li>
    <li>
      Layer Compositor（图层合成器）接收 Blink 的输入，负责图层树的管理，图层的滚动，旋转等矩阵变幻，图层的分块，光栅化，纹理上传等任务；
    </li>
    <li>
      Display Compositor 接收 Layer Compositor 的输入，负责输出最终的 OpenGL 绘制指令，将网页内容通过 GL 贴图操作绘制到目标窗口上，如果忽略掉操作系统本身的窗口合成器，也可以简单认为是绘制在显示屏上；
    </li>
  </ol>
  
  <h2>
    渲染过程
  </h2>
  
  <p id="evEtWbF">
    <img loading="lazy" class="alignnone wp-image-6278 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/format,webp" alt="" width="722" height="333" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/format,webp 2084w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_138/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_369/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_354/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_708/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa26a68dd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_943/format,webp 2048w" sizes="(max-width: 722px) 100vw, 722px" />
  </p>
  
  <p>
    上一节我们说 Render 树是衔接浏览器排版引擎和渲染引擎之间的桥梁，它是排版引擎的输出，渲染引擎的输入。不过浏览器渲染引擎并不是直接使用 Render 树进行绘制，为了方便处理 Positioning（定位），Clipping（裁剪），Overflow-scroll（页內滚动），CSS Transform/Opacity/Animation/Filter，Mask or Reflection，Z-indexing（Z排序）等，浏览器需要生成另外一棵树 &#8211; Layer 树。
  </p>
  
  <p id="kNpduGo">
    <img loading="lazy" class="alignnone wp-image-6279 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/format,webp" alt="" width="710" height="474" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/format,webp 1660w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_200/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_534/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_513/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffa4345505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1025/format,webp 1536w" sizes="(max-width: 710px) 100vw, 710px" />
  </p>
  
  <p>
    渲染引擎会为一些特定的 RenderObject 生成对应的 RenderLayer，而这些特定的 RenderObject 跟对应的 RenderLayer 就是直属的关系，相应的，它们的子节点如果没有对应的 RenderLayer，就从属于父节点的 RenderLayer。最终，每一个 RenderObject 都会直接或者间接地从属于一个 RenderLayer。
  </p>
  
  <blockquote>
    <p>
      <strong>RenderObject 生成 RenderLayer 的条件，来自 <a href="http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome" target="_blank" rel="noopener noreferrer">GPU Accelerated Compositing in Chrome</a></strong>
    </p>

    <ul>
      <li>
        It&#8217;s the root object for the page
      </li>
      <li>
        It has explicit CSS position properties (relative, absolute or a transform)
      </li>
      <li>
        It is transparent
      </li>
      <li>
        Has overflow, an alpha mask or reflection
      </li>
      <li>
        Has a CSS filter
      </li>
      <li>
        Corresponds to canvas element that has a 3D (WebGL) context or an accelerated 2D context
      </li>
      <li>
        Corresponds to a video element
      </li>
    </ul>
  </blockquote>
  
  <p>
    浏览器渲染引擎遍历 Layer 树，访问每一个 RenderLayer，再遍历从属于这个 RenderLayer 的 RenderObject，将每一个 RenderObject 绘制出来。读者可以认为，Layer 树决定了网页绘制的层次顺序，而从属于 RenderLayer 的 RenderObject 决定了这个 Layer 的内容，所有的 RenderLayer 和 RenderObject 一起就决定了网页在屏幕上最终呈现出来的内容。
  </p>
  
  <blockquote>
    <p>
      <strong>软件渲染模式下，浏览器绘制 RenderLayer 和 RenderObject 的顺序，来自 <a href="http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome" target="_blank" rel="noopener noreferrer">GPU Accelerated Compositing in Chrome</a></strong>
    </p>

    <p>
      In the software path, the page is rendered by sequentially painting all the RenderLayers, from back to front. The RenderLayer hierarchy is traversed recursively starting from the root and the bulk of the work is done in RenderLayer::paintLayer() which performs the following basic steps (the list of steps is simplified here for clarity):
    </p>
    
    <ol>
      <li>
        Determines whether the layer intersects the damage rect for an early out.
      </li>
      <li>
        Recursively paints the layers below this one by calling paintLayer() for the layers in the negZOrderList.
      </li>
      <li>
        Asks RenderObjects associated with this RenderLayer to paint themselves.
      </li>
      <li>
        This is done by recursing down the RenderObject tree starting with the RenderObject which created the layer. Traversal stops whenever a RenderObject associated with a different RenderLayer is found.
      </li>
      <li>
        Recursively paints the layers above this one by calling paintLayer() for the layers in the posZOrderList.
      </li>
    </ol>
    
    <p>
      In this mode RenderObjects paint themselves into the destination bitmap by issuing draw calls into a single shared GraphicsContext (implemented in Chrome via Skia).
    </p>
  </blockquote>
  
  <h2>
    图层合成
  </h2>
  
  <p>
    对于现代浏览器来说，所谓硬件加速，就是使用 GPU 来进行合成，绘制仍然使用 CPU 来完成。在多线程渲染模式下，因为绘制和合成分别处于不同的线程，绘制使用 CPU，合成使用 GPU，这样可以通过 CPU/GPU 之间的并发运行有效地提升浏览器整体的渲染性能。更何况，窗口的更新是由合成线程来负责的，合成的效率越高，窗口更新的间隔就越短，用户感受到 UI 界面变化的流畅度就越高，只要窗口更新的间隔能够始终保持在16.7毫秒以内，UI 界面就能够一直保持60帧/每秒的极致流畅度（因为一般来说，显示屏幕的刷新频率是60hz，所以60帧/秒已经是极限帧率，超过这个数值意义不大，而且 OS 的图形子系统本身就会强制限制 UI 界面的更新跟屏幕的刷新保持同步）。
  </p>
  
  <p>
    图层合成加速（Accelerated Compositing）的渲染架构是 Apple 引入 WebKit 的，并在 Safari 上率先实现，而 Chrome/Android/Qt/GTK+ 等都陆续完成了自己的实现。如果熟悉 iOS 或者 Mac OS GUI 编程的读者对其应该不会感到陌生，它跟 iOS CoreAnimation 的 Layer Rendering 渲染架构基本类似，主要都是为了解决当 Layer 的内容频繁发生变化，或者当 Layer 触发一个2D/3D变换（2D/3D Transform ）或者渐隐渐入动画，它的位移，缩放，旋转，透明度等属性不断发生变化时，在原有的渲染架构下，渲染性能低下的问题。
  </p>
  
  <p>
    非合成加速的渲染架构，所有的 RenderLayer 都没有自己独立的缓存，它们都被绘制到同一个缓存里面（按照它们的先后顺序），所以只要这个 Layer 的内容发生变化，或者它的一些 CSS 样式属性比如 Transform/Opacity 发生变化，变化区域的缓存就需要重新生成，此时不但需要绘制变化的 Layer，跟变化区域（Damage Region）相交的其它 Layer 都需要被绘制，而前面已经说过，网页的绘制是十分耗时的。如果 Layer 偶尔发生变化，那还不要紧，但如果是一个 JavaScript 或者 CSS 动画在不断地驱使 Layer 发生变化，这个动画要达到60帧/每秒的流畅效果就基本不可能了。
  </p>
  
  <h2>
    生成GraphicsLayer
  </h2>
  
  <p>
    而在合成加速的渲染架构下，一些 RenderLayer 会拥有自己独立的缓存，它们被称为合成图层（Compositing Layer），WebKit 会为这些 RenderLayer 创建对应的 GraphicsLayer，不同的浏览器需要提供自己的 GraphicsLayer 实现用于管理缓存的分配，释放，更新等等。拥有 GraphicsLayer 的 RenderLayer 会被绘制到自己的缓存里面，而没有 GraphicsLayer 的 RenderLayer 它们会向上追溯有 GraphicsLayer 的父/祖先 RenderLayer，直到 Root RenderLayer 为止，然后绘制在有 GraphicsLayer 的父/祖先 RenderLayer 的缓存上，而 Root RenderLayer 总是会创建一个 GraphicsLayer 并拥有自己独立的缓存。最终，GraphicsLayer 又构成了一棵与 RenderLayer 并行的树，而 RenderLayer 与 GraphicsLayer 的关系有些类似于 RenderObject 与 RenderLayer 之间的关系。
  </p>
  
  <p>
    合成加速渲染架构下的网页合成，也变得比以前复杂，不再是简单的将一个缓存拷贝到窗口缓存上，而是需要完成源自不同 Layer 的多个缓存的拷贝，再加上可能的2D/3D变换，再加上缓存之间的 Alpha 混合等操作，当然，对于支持硬件加速，使用 GPU 来完成合成的浏览器来说，速度还是很快的。
  </p>
  
  <blockquote>
    <p>
      <strong>RenderLayer 生成 GraphicsLayer 的条件，来自 <a href="http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome" target="_blank" rel="noopener noreferrer">GPU Accelerated Compositing in Chrome</a></strong>
    </p>

    <ol>
      <li>
        Layer has 3D or perspective transform CSS properties, 3d加速单独生成合成图层
      </li>
      <li>
        Layer is used by < video> element using accelerated video decoding
      </li>
      <li>
        Layer is used by a < canvas> element with a 3D context or accelerated 2D context
      </li>
      <li>
        Layer is used for a composited plugin
      </li>
      <li>
        Layer uses a CSS animation for its opacity or uses an animated webkit transform
      </li>
      <li>
        Layer uses accelerated CSS filters
      </li>
      <li>
        Layer with a composited descendant has information that needs to be in the composited layer tree, such as a clip or reflection
      </li>
      <li>
        Layer has a sibling with a lower z-index which has a compositing layer (in other words the layer is rendered on top of a composited layer)
      </li>
      <li>
        will-change 可以明确告诉浏览器生成合成图层
      </li>
    </ol>
  </blockquote>
  
  <p>
    合成加速的渲染架构下，Layer 的内容变化，只需要更新所属的 GraphicsLayer 的缓存即可，而缓存的更新，也只需要绘制直接或者间接属于这个 GraphicsLayer 的 RenderLayer 而不是所有的 RenderLayer。特别是一些特定的 CSS 样式属性的变化，实际上并不引起内容的变化，只需要改变一些 GraphicsLayer 的合成参数，然后重新合成即可，而合成相对绘制而言是很快的，这些特定的 CSS 样式属性我们一般称之为是被加速的，不同的浏览器支持的状况不太一样，但基本上<strong>CSS Transform & Opacity</strong> 在所有支持合成加速的浏览器上都是被加速的。被加速的CSS 样式属性的动画，就比较容易达到60帧/每秒的流畅效果了。另外像 Fixed 元素，Overflow-scroll，在合成加速的渲染架构下，因为不需要重新生成缓存，所以渲染的效率也同样是非常高。
  </p>
  
  <p id="kVoOYkt">
    <img loading="lazy" class="alignnone wp-image-6280 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffed28f681.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffed28f681.png?x-oss-process=image/format,webp" alt="" width="387" height="304" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffed28f681.png?x-oss-process=image/format,webp 636w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faffed28f681.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_236/format,webp 300w" sizes="(max-width: 387px) 100vw, 387px" />
  </p>
  
  <p>
    不过并不是拥有独立缓存的 RenderLayer 越多越好，太多拥有独立缓存的 Layer 会带来一些严重的副作用 &#8211; 首先它大大增加了内存的开销，这点在移动设备上的影响更大，甚至导致浏览器在一些内存较少的移动设备上无法很好地支持图层合成加速；其次，它加大了合成的时间开销，导致合成性能的下降，而合成性能跟网页滚动/缩放操作的流畅度又息息相关，最终导致网页滚动/缩放的流畅度下降，让用户觉得浏览器/网页卡顿。
  </p>
  
  <p>
    精心打造全新课程，欢迎吐槽！反馈宝贵意见！
  </p>
  
  <p>
    在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>
  </p>
  
  <h1>
    参考
  </h1>
  
  <p>
    <a href="https://blog.csdn.net/rogeryi/article/details/23686609">how render work</a>
  </p>
  
  <p>
    <a href="https://www.f2e123.com/javascriptnodejs/4474.html">浏览器渲染流水线解析与网页动画性能优化</a>
  </p>
  
  <p>
    <a href="https://www.f2e123.com/javascriptnodejs/6205.html">Chrome浏览器引擎 Blink & V8</a>
  </p>
  
  <p>
    <a href="http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/" target="_blank" rel="noopener noreferrer">How Browsers Work: Behind the scenes of modern web browsers</a><br /> <a href="https://docs.google.com/presentation/d/1ZRIQbUKw9Tf077odCh66OrrwRIVNLvI_nhLm2Gi__F0/pub#slide=id.p" target="_blank" rel="noopener noreferrer">How WebKit Work</a><br /> <a href="http://www.paulirish.com/2013/webkit-for-developers/" target="_blank" rel="noopener noreferrer">WebKit for Developers</a><br /> <a href="http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome" target="_blank" rel="noopener noreferrer">GPU Accelerated Compositing in Chrome</a><br /> <a href="https://www.sencha.com/blog/understanding-hardware-acceleration-on-mobile-browsers/" target="_blank" rel="noopener noreferrer">Understanding Hardware Acceleration on Mobile Browsers</a><br /> <a href="http://www.slideshare.net/rogeryi/web-page-renderingandacceleratedcompositing" target="_blank" rel="noopener noreferrer">Web Page Rendering and Accelerated Compositing</a>
  </p>
  
  <p>
    </div>
  </p>

 [1]: https://www.f2e123.com/fed-regain
