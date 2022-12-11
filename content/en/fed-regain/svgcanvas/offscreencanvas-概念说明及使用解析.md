---
title: OffscreenCanvas – 概念说明及使用解析



---
这是个人关于 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">OffscreenCanvas</a> 的第一篇文章，在这篇文章里会对 OffscreenCanvas 的基本概念进行说明，并通过两个实际的例程来解析它的主要使用方式和应用场景。

OffscreenCanvas 是一个实验中的新特性，主要用于提升 Canvas 2D/3D 绘图应用和 H5 游戏的渲染性能和使用体验。OffscreenCanvas 的 API 很简单，但是要真正掌握好如何使用，需要页端对[浏览器](https://www.w3cdoc.com)内部的一些运作机制有较深入的了解，这也是撰写本文的目的。

跟 OffscreenCanvas 关系比较紧密的还有另外两个新的 API，ImageBitmap 和 ImageBitmapRenderingContext，在文中也会一并进行讲解。

例程的代码可以通过 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//github.com/rogeryi/offscreen_canvas_demo" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">GitHub 下载</a>。

> 目前 OffscreenCanvas 在最新版本的 Chrome 和 Firefox 上都可以通过实验室开关打开，Chrome 的开关是 chome://flags -> Experimental Web Platform features，本文的例程是在 Chrome 67 Canary 上进行验证。**OffscreenCanvas 的 API 在未来仍有可能会发生一些变化，本文会随之进行更新**。

## 概念说明

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//www.chromestatus.com/feature/5424182347169792" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Chrome 开发文档</a>里面对 OffscreenCanvas 的定义是：

> A new interface that allows canvas rendering contexts (2D and WebGL) to be used in workers.  
> Making canvas rendering contexts available to workers will increase parallelism in web applications, leading to increased performance on multi-core systems.

简单的说，**就是你现在可以在 Worker 线程调用 Canvas API 啦**，通过在 Worker 线程完成 Canvas 渲染任务，可以提升 WebApp 的并发程度，从而提升性能和使用体验，balabala&#8230;

不过 JavaScript 目前并没有提供一个真正可用的多线程并发编程模型，缺少了互斥，信号量等同步原语，线程间无法共享数据，所以除了一些很特定的应用场景，并且需要页端对应用/游戏的引擎设计做出较大的修改，大部分场景下指望简单地使用 OffscreenCanvas 然后就能获得并发带来的大幅性能提升其实并不太现实。不过即使应用/游戏无法有效地使用 OffscreenCanvas 来实现自身的多线程并发运行，OffscreenCanvas 仍然提供了很高的使用价值，也让[浏览器](https://www.w3cdoc.com)有机会优化自身的 Canvas 渲染流水线，下文会通过例程来讲解如何在实际的应用场景中有效地使用 OffscreenCanvas。

> 当然你还是可以在主线程使用 OffscreenCanvas，并且即使在主线程使用，取决于应用的场景，也还是可能会带来一些收益。  
> JavaScript 未来也许会增加多线程共享数据，数据访问同步的支持，但是起码目前是没有的。

## 使用解析

OffscreenCanvas 目前主要用于两种不同的使用场景：

  1. 一种是在 Worker 线程创建一个 OffscreenCanvas 做后台渲染，然后再把渲染好的缓冲区 Transfer 回主线程显示；
  2. 一种是主线程从当前 DOM 树中的 Canvas 元素产生一个 OffscreenCanvas，再把这个 OffscreenCanvas 发送给 Worker 线程进行渲染，渲染的结果直接 Commit 到[浏览器](https://www.w3cdoc.com)的 Display Compositor 输出到当前窗口，相当于在 Worker 线程直接更新 Canvas 元素的内容；

我自己把第一种使用方式称之为 Transfer 模式，第二种使用方式称之为 Commit 模式。

## Transfer 模式<figure data-size="normal">

<img class="content_image lazy" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/v2-49c2efd0bf09a73ea403715c1bc4df21_hd.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/v2-49c2efd0bf09a73ea403715c1bc4df21_hd.jpg?x-oss-process=image/format,webp" data-caption="" data-size="normal" data-actualsrc="https://pic2.zhimg.com/v2-49c2efd0bf09a73ea403715c1bc4df21_b.jpg" /> </figure>

> Transfer Demo，使用 Transfer 模式

Transfer 模式主要用于后台渲染，避免耗时的渲染任务会阻塞前台线程，导致应用无法及时响应用户的操作，比如一些 2D/3D 图表，图形可视化应用，地图应用等。

> 实际上这是 OffscreenCanvas 这个特性的最早需求，来自于 Google Map 团队。

Transfer Demo 运行流程大致如下：

  1. 主线程启动 Worker 线程，并请求初始化；
  2. Worker 线程创建 OffscreenCanvas；
  3. Worker 线程获取 OffscreenCanvas 的 WebGL Context 并进行绘制；
  4. Worker 线程获取 OffscreenCanvas 的缓冲区（ImageBitmap），然后 Transfer 回主线程；
  5. 主线程将 Worker 线程回传的缓冲区分别绘制在两个不同的 Canvas 上，一个 Canvas 使用 CanvasRenderingContext2D，一个 Canvas 使用 ImageBitmapRenderingContext；
  6. 3 ~ 5 重复运行；

## 代码解析

下面是一些主要步骤的代码，展示了 OffscreenCanvas，ImageBitmap，ImageBitmapRenderingContext API 的使用。

**在 Worker 线程创建 OffscreenCanvas**

<div class="highlight">
  ```
<span class="kd">function</span> <span class="nx">Init</span><span class="p">(</span><span class="nx">mode</span><span class="p">,</span> <span class="nx">data</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">mode</span> <span class="o">===</span> <span class="s2">"transfer"</span><span class="p">)</span>
    <span class="nx">canvas</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">OffscreenCanvas</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">width</span><span class="p">,</span> <span class="nx">data</span><span class="p">.</span><span class="nx">height</span><span class="p">);</span>
  <span class="p">...</span>
<span class="p">}</span>

```
</div>

**获取 OffscreenCanvas 的缓冲区并回传**

<div class="highlight">
  ```
<span class="kd">function</span> <span class="nx">TransferBuffer</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">let</span> <span class="nx">image_bitmap</span> <span class="o">=</span> <span class="nx">canvas</span><span class="p">.</span><span class="nx">transferToImageBitmap</span><span class="p">();</span>
  <span class="nx">postMessage</span><span class="p">({</span><span class="nx">name</span><span class="o">:</span><span class="s2">"TransferBuffer"</span><span class="p">,</span> <span class="nx">buffer</span><span class="o">:</span><span class="nx">image_bitmap</span><span class="p">},</span>
    <span class="p">[</span><span class="nx">image_bitmap</span><span class="p">]);</span>
<span class="p">}</span>

```
</div>

**主线程接收回传的缓冲区并绘制**

<div class="highlight">
  ```
<span class="nx">g_render_worker</span><span class="p">.</span><span class="nx">onmessage</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">msg</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">msg</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">name</span> <span class="o">===</span> <span class="s2">"TransferBuffer"</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">GetTransferBuffer</span><span class="p">(</span><span class="nx">msg</span><span class="p">.</span><span class="nx">data</span><span class="p">.</span><span class="nx">buffer</span><span class="p">);</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">GetTransferBuffer</span><span class="p">(</span><span class="nx">buffer</span><span class="p">)</span> <span class="p">{</span>
  <span class="kd">let</span> <span class="nx">context_2d</span> <span class="o">=</span> <span class="nx">g_2d_canvas</span><span class="p">.</span><span class="nx">getContext</span><span class="p">(</span><span class="s2">"2d"</span><span class="p">);</span>
  <span class="nx">context_2d</span><span class="p">.</span><span class="nx">clearRect</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">g_2d_canvas</span><span class="p">.</span><span class="nx">width</span><span class="p">,</span> <span class="nx">g_2d_canvas</span><span class="p">.</span><span class="nx">height</span><span class="p">);</span>
  <span class="nx">context_2d</span><span class="p">.</span><span class="nx">save</span><span class="p">();</span>
  <span class="p">...</span>
  <span class="nx">context_2d</span><span class="p">.</span><span class="nx">drawImage</span><span class="p">(</span><span class="nx">buffer</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span>
  <span class="nx">context_2d</span><span class="p">.</span><span class="nx">restore</span><span class="p">();</span>

  <span class="p">...</span>

  <span class="kd">let</span> <span class="nx">bitmap_context</span> <span class="o">=</span> <span class="nx">g_bitmap_canvas</span><span class="p">.</span><span class="nx">getContext</span><span class="p">(</span><span class="s2">"bitmaprenderer"</span><span class="p">);</span>
  <span class="nx">bitmap_context</span><span class="p">.</span><span class="nx">transferFromImageBitmap</span><span class="p">(</span><span class="nx">buffer</span><span class="p">);</span>
<span class="p">}</span>

```
</div>

## ImageBitmap 和 ImageBitmapRenderingContext

上面的例程使用到了 ImageBitmap 和 ImageBitmapRenderingContext，它们到底是什么，跟 ImageData 和 CanvasRenderingContext2D 又有什么不同？

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/API/ImageBitmap" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">ImageBitmap</a> 主要是用来封装一块 GPU 缓冲区，可以被 GPU 读写，并且实现了 Transferable 的接口，可以在不同线程之间 Transfer。跟 ImageData 不一样，ImageBitmap 并没有提供 JavaScipt API 供 CPU 进行读写，这是因为使用 CPU 读写 GPU 缓冲区的成本非常高，需要拷贝到临时缓冲区进行读写然后再写回。这也是为什么规范的制定者没有扩展 ImageData，而是提供了一个新的 ImageBitmap 的缘故。

ImageBitmap 可以被当做普通的 Image 绘制在一个 2D Canvas 上，也可以通过 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">ImageBitmapRenderingContext</a> Transfer 到一个 Bitmap Canvas，[我们](https://www.w3cdoc.com)通过举例来说明这两种方式的区别：

  1. 但[我们](https://www.w3cdoc.com)使用 OffscreenCanvas，通过 2D/3D 进行绘制时，就好像[我们](https://www.w3cdoc.com)有一块画板，上面有一些画纸，[我们](https://www.w3cdoc.com)可以在画纸上作画；
  2. 调用 OffscreenCanvas.transferToImageBitmap 获取 ImageBitmap 封装的缓冲区，就好像[我们](https://www.w3cdoc.com)把当前绘画的画纸取下来；
  3. 把 ImageBitmap 作为 Image 绘制在一个 2D Canvas 上，就好像[我们](https://www.w3cdoc.com)对已经绘制好的图画在新的画纸上进行临摹；
  4. 把 ImageBitmap 通过 ImageBitmapRenderingContext.transferFromImageBitmap Transfer 给 Bitmap Canvas，就好像[我们](https://www.w3cdoc.com)把画纸放入一个画框里挂在墙上显示；

简单的说 ImageBitmap Transfer 语义实现了 Zero Copy 的所有权转移，不需要对缓冲区进行拷贝，性能更高，但是也限制了显示的方式，而临摹意味着[我们](https://www.w3cdoc.com)可以对临摹的副本进行旋转，缩放，位移等等，还可以在上面再绘制其它内容。另外 ImageBitmap Transfer 之后所有权就发生了转移，比如 Transfer Demo 的例程调换一下两个 Canvas 的绘制顺序就会报错，这是因为 Transfer 之后，原来的缓冲区引用已经被置空变成一个空引用。

具体使用哪种方式取决于应用的场景，如果只是简单的展现就可以考虑使用性能更高 ImageBitmapRenderingContext，OffscreenCanvas，加 ImageBitmap，加 ImageBitmapRenderingContext 提供了一种最高效的后台渲染，前台展现的方式。

## Commit 模式

Commit 模式主要用于 H5 游戏，它允许应用/游戏在 Worker 线程直接对 DOM 树里面的 Canvas 元素进行更新，[浏览器](https://www.w3cdoc.com)在这种模式下提供了一条最短路径和最佳性能的 Canvas 渲染流水线。

要理解[浏览器](https://www.w3cdoc.com)所做的优化，[我们](https://www.w3cdoc.com)首先要了解普通 Canvas 元素更新的渲染流水线，跟其它 DOM 元素一样，Canvas 元素的更新也是走非合成器动画的渲染流水线，主要的缺点是：

  1. 非合成器动画的渲染流水线比较复杂和冗长，有较多的 Overhead，页面的结构越复杂，Overhead 就越高；
  2. 如果同时有其它 DOM 元素一起更新，Canvas 的更新会被其它 DOM 元素的光栅化所阻塞，导致性能下降，性能下降的幅度取决于其它 DOM 元素光栅化的耗时；

> 关于 Chrome 非合成器动画的渲染流水线可以参考我的文章 - <a class="internal" href="https://zhuanlan.zhihu.com/p/30534023" data-za-detail-view-id="1043">[浏览器](https://www.w3cdoc.com)渲染流水线解析与网页动画性能优化</a>。

如果[我们](https://www.w3cdoc.com)调用 Commit，并且 Commit 的 OffscreenCanvas 是跟当前 DOM 树里面的某个 Canvas 元素相关联，[浏览器](https://www.w3cdoc.com)就会直接将 OffscreenCanvas 的当前绘制缓冲区发送给 Display Compositor，然后 Display Compositor 就会合成新的一帧输出到当前窗口，对[浏览器](https://www.w3cdoc.com)来说这就是最短的渲染路径。

在 Worker 线程使用 Commit 模式，理论上[我们](https://www.w3cdoc.com)会：

  1. 避免被主线程的其它任务所阻塞，Worker 线程可以完全专注在 Canvas 动画的运行上；
  2. 通过 OffscreenCanvas 更新 Canvas 元素，[浏览器](https://www.w3cdoc.com)走的是最短的渲染路径，避免了非合成器动画的冗长流水线和 Overhead；
  3. 如果有其它 DOM 元素同时更新，不会阻塞 OffscreenCanvas 的更新，**所以通过 OffscreenCanvas，的确实现了 Canvas 更新和其它 DOM 更新的并发运行**；
  4. 如果 DOM 元素需要处理事件，这些事件处理不会被 Worker 线程所阻塞，只是处理的结果数据可能需要发送给 Worker 线程用于后续的绘制；

使用 OffscreenCanvas Commit 模式的副作用是 OffscreenCanvas 的更新和其它 DOM 元素的更新不再是强制同步的，即使它们是同时更新，甚至都在主线程而不使用 Worker 线程，因为两者已经分别走了不同的流水线，最后呈现在屏幕的时机也可能不会完全一致。如果一定要求同步，就只能参考 Transfer Demo 的做法，将绘制后的缓冲区 Transfer 给 Bitmap Canvas 来显示，但是这样就无法发挥 Commit 模式的性能优势了。

> 如果页面除了一个 Canvas 元素外没有其它 DOM 元素，理论上 OffscreenCanvas 能够带来的性能提升也比较有限，具体的一些性能分析可以参考<a class="internal" href="https://zhuanlan.zhihu.com/p/34285914" data-za-detail-view-id="1043">这篇文章</a>，当然蚊子肉再少也是肉，能提升一点也是好的。

Commit Demo 的运行流程大致如下：

  1. 主线程从当前 DOM 树中的 Canvas 元素生成 OffscreenCanvas；
  2. 主线程启动 Worker 线程并初始化，OffscreenCanvas 作为初始化的参数被 Transfer；
  3. Worker 线程接收 OffscreenCanvas 后完成初始化；
  4. Worker 线程使用 WebGL 对 OffscreenCanvas 进行绘制；
  5. Worker 线程绘制完成后 Commit，然后等待[浏览器](https://www.w3cdoc.com)的回调；
  6. Worker 线程接收到到[浏览器](https://www.w3cdoc.com)的回调后继续绘制下一帧，重复 4 ~ 6；

## 代码解析

**启动 Worker 线程并初始化**

<div class="highlight">
  ```
<span class="nx">g_render_worker</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Worker</span><span class="p">(</span><span class="s2">"../common/render.js"</span><span class="p">);</span>

<span class="kd">let</span> <span class="nx">offscreen</span> <span class="o">=</span> <span class="nx">g_offscreen_canvas</span><span class="p">.</span><span class="nx">transferControlToOffscreen</span><span class="p">();</span>
<span class="nx">g_render_worker</span><span class="p">.</span><span class="nx">postMessage</span><span class="p">(</span>
  <span class="p">{</span><span class="nx">name</span><span class="o">:</span><span class="s2">"Init"</span><span class="p">,</span> <span class="nx">mode</span><span class="o">:</span><span class="s2">"commit"</span><span class="p">,</span> <span class="nx">canvas</span><span class="o">:</span><span class="nx">offscreen</span><span class="p">},</span> <span class="p">[</span><span class="nx">offscreen</span><span class="p">]);</span>

```
</div>

**Commit 然后等待回调**

<div class="highlight">
  ```
<span class="kd">function</span> <span class="nx">renderloop</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Render buffer first
</span>  <span class="nx">render</span><span class="p">();</span>
  <span class="c1">// Wait next begin frame to loop
</span>  <span class="nx">gl</span><span class="p">.</span><span class="nx">commit</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="nx">renderloop</span><span class="p">);</span>
<span class="p">}</span>

<span class="nx">renderloop</span><span class="p">();</span>

```
</div>

## 动画驱动

在 Worker 线程驱动 OffscreenCanvas 动画有很多方式，比如使用传统的 Timer 和 rAF 的方式。

  1. 如果使用 Timer，[我们](https://www.w3cdoc.com)可以在 Worker 线程直接使用，参考 Transfer Demo 的例子；
  2. 如果使用 rAF，[我们](https://www.w3cdoc.com)需要在主线程先获得 rAF 回调，然后再通知 Worker 线程；

这两种方式各有其缺陷，都不是理想的选择。

上面的例程展示了新的动画方式，gl.commit() 返回了一个 Promise 对象，它会在下一次 Begin Frame 时被 resolve，Begin Frame 基本上可以认为是[浏览器](https://www.w3cdoc.com)环境下的 vSync 信号，[浏览器](https://www.w3cdoc.com)会在 Begin Frame 的过程中调用 rAF 的回调，resolve Commit Promise。因为目前 Worker 线程并不支持 rAF，所以后者就是[我们](https://www.w3cdoc.com)当前最好的选择。

原文：https://zhuanlan.zhihu.com/p/34698375
