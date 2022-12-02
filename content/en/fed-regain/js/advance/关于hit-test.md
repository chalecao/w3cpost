---
title: 关于hit test

---

  <img loading="lazy" class="alignnone wp-image-6084 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png?x-oss-process=image/format,webp" alt="" width="675" height="259" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png?x-oss-process=image/format,webp 1156w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_115/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_306/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa9307828cb6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_294/format,webp 768w" sizes="(max-width: 675px) 100vw, 675px" />

先看下上面这个图，可以了解下hit Test，在[我们](https://www.w3cdoc.com)调用elementsFromPoint 这个 DOM api的时候，内部执行这个hit test尽然花费了5s钟，一开始我以为是这个导致了页面卡顿，后来仔细想想，是因为卡顿导致了这个hit test执行时间长。

<pre class="lang-js s-code-block hljs javascript"><code>| Self Time       | Total Time      | Activity            |
|-----------------|-----------------|---------------------|
| &lt;span class="hljs-number">3579&lt;/span> ms (&lt;span class="hljs-number">67.5&lt;/span>%) | &lt;span class="hljs-number">3579&lt;/span> ms (&lt;span class="hljs-number">67.5&lt;/span>%) | Rendering           |
| &lt;span class="hljs-number">3455&lt;/span> ms (&lt;span class="hljs-number">65.2&lt;/span>%) | &lt;span class="hljs-number">3455&lt;/span> ms (&lt;span class="hljs-number">65.2&lt;/span>%) |   Hit Test          | &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">-&lt;/span> &lt;span class="hljs-attr">this&lt;/span> &lt;span class="hljs-attr">one&lt;/span>
|   &lt;span class="hljs-attr">78&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">1.5&lt;/span>%) |   &lt;span class="hljs-attr">78&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">1.5&lt;/span>%) |   &lt;span class="hljs-attr">Update&lt;/span> &lt;span class="hljs-attr">Layer&lt;/span> &lt;span class="hljs-attr">Tree&lt;/span> |
|   &lt;span class="hljs-attr">40&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">0.8&lt;/span>%) |   &lt;span class="hljs-attr">40&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">0.8&lt;/span>%) |   &lt;span class="hljs-attr">Recalculate&lt;/span> &lt;span class="hljs-attr">Style&lt;/span> |
| &lt;span class="hljs-attr">1343&lt;/span> &lt;span class="hljs-attr">ms&lt;/span> (&lt;span class="hljs-attr">25.3&lt;/span>%) | &lt;span class="hljs-attr">1343&lt;/span> &lt;span class="hljs-attr">ms&lt;/span> (&lt;span class="hljs-attr">25.3&lt;/span>%) | &lt;span class="hljs-attr">Scripting&lt;/span>           |
|  &lt;span class="hljs-attr">378&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">7.1&lt;/span>%) |  &lt;span class="hljs-attr">378&lt;/span> &lt;span class="hljs-attr">ms&lt;/span>  (&lt;span class="hljs-attr">7.1&lt;/span>%) | &lt;span class="hljs-attr">Painting&lt;/span>            |&lt;/span>&lt;/span></code></pre>

如果你通过performance查看页面性能，发现你的页面也是这个样子，那么你的页面也存在同样的性能问题。

## 关于Hit Test

其实这个是很关键的一个点，在处理手机h5下拉滚动加载的时候解决卡顿问题，是一样的原理。

用户通过鼠标点击或者触摸的时候，[浏览器](https://www.w3cdoc.com)通过hit test来搜集所有点击响应事件，交给[浏览器](https://www.w3cdoc.com)内核blink挨个处理。因为程序中可以通过preventDefault来阻止默认事件，也可以通过[**stopImmediatePropagation**][1]阻止其他响应事件和冒泡，或者[stopPropagation][2]阻止冒泡，所以blink内核需要依次执行所有回调，执行回调函数期间就会阻塞[浏览器](https://www.w3cdoc.com)响应和渲染（之前ios uiwebview(ios>=2)内核的时候会阻塞ui渲染，webkit webview（ios>=8）内核的时候独立了UI线程，不会被js阻塞，但仍然会有卡顿），所以经常会出现向上滚动操作几秒之后页面才会突然滚动上去或者跳动上去。之前的解决方法大都是取消事件处理，不在滚动的dom元素上绑定事件或者做复杂的处理，在window全局scroll事件上处理，而且只做简单业务逻辑，等滚动事件完后在处理业务逻辑。

hit test就是用来追踪当前点击位置的响应元素，从根节点html>body一直到目标节点。

参考资料2中介绍了chrome 中hit test是在合成层进行处理的。如果不了解合成层可以学习下[[前端](https://www.w3cdoc.com)增长-高级进阶知识梳理总结][3]课程

> <div>
>   <h3 dir="ltr">
>     Tracking hit test rects in blink
>   </h3>
>
>   
>     <span style="font-family: arial, sans-serif; font-size: medium;">In blink, we hook into the creation of Touch event handlers and track EventTargets with handlers in </span><span style="font-family: arial, sans-serif; font-size: medium;">EventHandlerRegistry. During paint, HitTestDisplayItems are emitted for all objects with blocking event handlers. As an optimization, a cache of the HitTestDisplay item data is stored on PaintChunk for all display items in the chunk. Then, after compositing, all hit test rects for a cc::Layer are projected into the cc::Layer&#8217;s coordinate space using </span><span style="font-family: arial, sans-serif; font-size: medium;">PaintArtifactCompositor::UpdateTouchActionRects. This approach of painting hit test data is described in more detail in <a href="https://docs.google.com/document/d/1ksiqEPkDeDuI_l5HvWlq1MfzFyDxSnsNB8YXIaXa3sE/view#">PaintTouchActionRects</a>.</span>
>   
>
>   <h3 dir="ltr">
>     <a name="TOC-Hit-testing-in-the-compositor"></a>Hit testing in the compositor
>   </h3>
> </div>
>
> <div>
>   <span style="font-family: arial, sans-serif; font-size: medium;">The hit testing is currently done just for the touchStart events since the point at which these event hit determines where the next train of events will be sent until we receive another touchStart (due to a different gesture starting or due to another finger being pressed on screen). On the compositor, (as of the fix for <a href="https://www.chromium.org/developers/design-documents/goog_353685820">bug </a></span><span style="font-family: arial, sans-serif; font-size: medium;"><a href="https://code.google.com/p/chromium/issues/detail?id=351723">351723</a>) </span>we do a ray cast at the point of the touch and consult the touchEventHandlerRegion for each layer until we hit a layer we know is opaque to hit testing. If there is a hit, the compositor forwards this touch event to the renderer and then it is sent to blink to be processed as usual. If there is no touchEventHandlerRegion that was hit, the compositor sends an ACK with NO_CONSUMER_EXISTS.
> </div>
>
> <div>
>
> </div>
>
> <div>
>   <div>
>     <h3 dir="ltr">
>       Browser side processing
>     </h3>
>   </div>
>
>   <div>
>     <span style="font-family: arial, sans-serif; font-size: medium;">As far as the browser side is concerned, only the ACKs it receives for the outgoing touch events matter in determining the current state. Currently there are four states that the ACK can be at. INPUT_EVENT_STATE_ACK_UNKNOWN is the initial default state that the touch_event_queue is at and might not be used on different platforms(ex: Android). When a touchStart event comes the touch event queue on the browser side always sends this touch event through IPC to the compositor. Then the touch event queue waits for the ACK for that touchStart to make a decision about the rest of the touch events in queue.</span>
>   </div>
>
>   <div>
>     <span style="font-family: arial, sans-serif; font-size: medium;"> </span>
>   </div>
>
>   <div>
>     <span style="font-family: arial, sans-serif; font-size: medium;">If it receives </span>NO_CONSUMER_EXISTS, it stops sending touch events to the compositor until the next touchStart arrives and sends them directly to the platform specific gesture detector. This is mostly the case for regular browsing helps the gesture detector take over after a single touch event gets ACKed back from the compositor making it possible for the gesture to be generated fast enough to not cause any visible lag.
>   </div>
>
>   <div>
>
>   </div>
>
>   <div>
>     If it receives either NOT_CONSUMED or CONSUMED, this means there was a hit in the touchEventHandlerRegion and we should continue sending the touchMoves and touchEnd following this event to the compositor (which will send them to the renderer without doing any hit testing). If the ACK was CONSUMED, then the touchEventHandler had called preventDefault and neither this particular touch event nor the rest of the touch events until the next touchStart should be sent to the gesture detector. If the ACK was NOT_CONSUMED, this might mean either the touchEventHandlerRegion was too conservative and when the touchStart was hit tested in blink it didn&#8217;t hit any touchEventHandlers or the touchEventHandler didn&#8217;t preventDefault or process that particular touch event. In this case the touch_event_queue still forwards this event to the gesture_detector.
>   </div>
> </div>

大致的意思就是，在[浏览器](https://www.w3cdoc.com)blink引擎绘制元素的时候会为每个要绘制的元素生成<span style="font-family: arial, sans-serif; font-size: medium;">HitTestDisplayItem，这些元素和对应的事件处理函数都会缓存起来，在合成的时候所有元素都会投射成一个框框到对应的view层。</span>

在合成器中，基于触摸点位置进行光线投射，一层一层查询touchEventHandlerRegion，知道找到透明层为止。如果有一个命中，合成器就会把对应的事件转发给UI渲染进程，然后交给blink处理，如果没有合成器最后会发送NO\_CONSUMER\_EXISTS 作为ACK应答。

参考资料3中介绍，在ios原生的hit test采用的是反先序深度优先算法，一旦找到目标点击位置落在某个后代元素的view上，就可以停止遍历。


  <img loading="lazy" class="alignnone wp-image-6085 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png?x-oss-process=image/format,webp" alt="" width="814" height="389" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png?x-oss-process=image/format,webp 1200w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_382/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6122c8c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_367/format,webp 768w" sizes="(max-width: 814px) 100vw, 814px" />


  <img loading="lazy" class="alignnone wp-image-6086 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png?x-oss-process=image/format,webp" alt="" width="801" height="382" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png?x-oss-process=image/format,webp 1200w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_382/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fa93a6e4487e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_367/format,webp 768w" sizes="(max-width: 801px) 100vw, 801px" />

## 解决方案

由上面的分析可见，hit test时间长，原因基本就几种：

  1. 元素嵌套太深，每层次元素都绑定事件处理的话，会以此触发，建议用事件代理。
  2. 元素定位界限不清，元素重叠，hit test可能会挨个找每个图层每个元素。

## 参考

<https://stackoverflow.com/questions/41830529/optimizing-native-hit-testing-of-dom-elements-chrome>

<https://www.chromium.org/developers/design-documents/compositor-hit-testing>

<https://www.jianshu.com/p/12ef1c9f9741>

 [1]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
 [2]: https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation
 [3]: https://www.f2e123.com/fed-regain/4651.html
