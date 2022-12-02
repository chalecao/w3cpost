---
title: 最大内容绘画（LCP）

---
<div class="w-aside w-aside--note">
  <blockquote>
    
      最大内容绘画（LCP）是衡量用户<a href="https://web.dev/user-centric-performance-metrics/#types-of-metrics">感知加载速度的</a>一项重要的以用户为中心的度量标准，因为它标记了页面主要内容可能已加载时页面加载时间线中的时间点-快速的LCP有助于使用户确信页面 <a href="https://web.dev/user-centric-performance-metrics/#questions">有用</a>。
    
  </blockquote>
</div>

从历史上看，Web开发人员衡量网页主要内容的加载速度和对用户可见的速度一直是一个挑战。

较旧的指标（例如 [load][1]或 [DOMContentLoaded）][2] 不好，因为它们不一定与用户在屏幕上看到的相对应。而且，以用户为中心的更新性能指标（例如[First Contentful Paint（FCP））][3]只能捕捉到加载体验的最开始。如果页面显示启动屏幕或显示加载指示器，则此刻与用户无关。

过去，[我们](https://www.w3cdoc.com)建议使用诸如“[首次有意义的绘画（FMP）”][4]和“[速度指数（SI）”][5]（均可以在Lighthouse中获得）这样的性能指标来帮助捕获最初的颜料后的更多加载体验，但是这些指标非常复杂，难以解释，而且通常是错误的-表示它们仍然无法识别页面的主要内容何时加载。

有时越简单越好。根据[W3C Web性能工作组的][6]讨论和Google的研究，[我们](https://www.w3cdoc.com)发现，衡量何时加载页面主要内容的一种更准确的方法是查看何时呈现最大的元素。

## 什么是LCP？<a class="w-headline-link" href="https://web.dev/lcp/#what-is-lcp" aria-hidden="true">＃</a> {#what-is-lcp}

“最大内容绘画（LCP）”度量标准报告视口内可见的最大[图像或文本块][7]的渲染时间 。<picture><source srcset="../vitals/lcp_8x2.svg" media="(min-width: 640px)" /></picture>


  <img loading="lazy" class="alignnone wp-image-5894 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/format,webp" alt="" width="645" height="176" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/format,webp 1782w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_82/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_218/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_209/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785bfd3301a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_419/format,webp 1536w" sizes="(max-width: 645px) 100vw, 645px" />

### 好的LCP分数是多少？<a class="w-headline-link" href="https://web.dev/lcp/#what-is-a-good-lcp-score" aria-hidden="true">＃</a> {#what-is-a-good-lcp-score}

为了提供良好的用户体验，网站应努力在开始加载页面的前**2.5秒**内进行“最大内容绘画” 。为了确保您达到大多数用户的这一目标，衡量移动设备和台式机设备的页面加载量的**第75个百分位**是一个很好的衡量标准。

<div class="w-aside w-aside--note">
 要了解有关此建议背后的研究和方法的更多信息，请参阅：<a href="https://web.dev/defining-core-web-vitals-thresholds/">定义核心Web Vitals指标阈值</a>
</div>

### 考虑哪些要素？<a class="w-headline-link" href="https://web.dev/lcp/#what-elements-are-considered" aria-hidden="true">＃</a> {#what-elements-are-considered}

根据“[LCP API”中][8]当前指定的内容，“[LCP”][8]考虑的元素类型为：  

1. img 元素  
2. svg元素内嵌的image元素  
3. video 元素（使用海报图像）  
4. 通过url()函数加载背景图片的元素  
5. 包含文本节点或其他内联级文本元素子级的块级元素。

注意，将元素限制在此有限范围内是有意的，以便一开始就保持简单。

### 如何确定元素的大小？<a class="w-headline-link" href="https://web.dev/lcp/#how-is-an-element's-size-determined" aria-hidden="true">＃</a> {#how-is-an-element's-size-determined}

为“最大内容绘画”报告的元素的大小通常是用户在视口中可见的大小。如果元素延伸到视口之外，或者任何元素被裁剪或具有不可见的 [溢出][9]，则这些部分不会计入元素的大小。

对于已根据其[固有尺寸][10]调整大小的图像元素，报告的尺寸为可见尺寸或固有尺寸，以较小者为准。例如，缩小到远小于其固有尺寸的图像将仅报告其显示尺寸，而拉伸或扩展为较大尺寸的图像将仅报告其固有尺寸。

对于文本元素，仅考虑其文本节点的大小（包含所有文本节点的最小矩形）。

对于所有元素，不考虑通过CSS应用的任何margin，padding或border。

<div class="w-aside w-aside--note">
 确定哪个文本节点属于哪个元素有时可能很棘手，尤其是对于其子元素包括内联元素和纯文本节点以及块级元素的元素而言。关键是每个文本节点都属于（并且仅属于）其最接近的块级祖先元素。用<a href="https://wicg.github.io/element-timing/#set-of-owned-text-nodes">规范术语来说</a>：每个文本节点都属于生成其<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block">包含块</a>的元素。
</div>

### 何时报告LCP？<a class="w-headline-link" href="https://web.dev/lcp/#when-is-largest-contentful-paint-reported" aria-hidden="true">＃</a> {#when-is-largest-contentful-paint-reported}

网页通常是分阶段加载的，因此，页面上最大的元素可能会发生变化。

为了处理这种潜在的变化，[浏览器](https://www.w3cdoc.com)会在绘制<span style="color: #ff0000;">第一帧</span>后立即派出一个 [`PerformanceEntry`][11] 类型，`largest-contentful-paint`该类型标识最大的内容元素。但是，在<span style="color: #ff0000;">渲染后续帧时</span>， 在最大内容元素<span style="color: #ff0000;">发生更改</span>时再次发出 [`PerformanceEntry`][11] 。

例如，在带有文本和hero 图像的页面上，[浏览器](https://www.w3cdoc.com)可能最初只是呈现文本-此时，[浏览器](https://www.w3cdoc.com)将调度一个`largest-contentful-paint`条目，该条目可能指向的`element`是文本。之后，一旦英雄图片加载完成，`largest-contentful-paint`便会分派第二个条目，并且其`element`属性将引用`<img />`重要的是要注意，一个元素一旦呈现并对用户可见，就只能被认为是最大的内容元素。尚未加载的图像不被视为“已渲染”。在[字体块期间，][12]文本节点也不使用Web字体。在这种情况下，较小的元素可能会报告为最大的内容元素，但是较大的元素一旦完成渲染，就会通过另一个`PerformanceEntry`对象进行报告 。

除了延迟加载图像和字体外，页面可能会在新内容可用时向DOM添加新元素。如果这些新元素中的任何一个大于先前最大的有争议元素，那么`PerformanceEntry` 还将报告一个新元素。

如果页面从DOM中删除了一个元素，则不再考虑该元素。同样，如果元素的关联图像资源发生更改（例如，`img.src`通过JavaScript进行更改），则该元素将停止考虑，直到加载新图像为止。

<div class="w-aside w-aside--note">
 将来，从DOM中删除的元素仍可以视为LCP候选对象。<a href="https://github.com/WICG/largest-contentful-paint/issues/41#issuecomment-583589387">目前正在进行研究</a> 以评估此更改的影响。您可以遵循<a href="http://bit.ly/chrome-speed-metrics-changelog">CHANGELOG</a>指标 以保持最新。
</div>

<span style="color: #ff0000;">一旦用户与页面进行交互（通过轻击，滚动或按键），[浏览器](https://www.w3cdoc.com)将停止报告新条目</span>，因为用户交互通常会改变用户可见的内容（滚动时尤为如此）。

出于分析目的，您应仅报告最近分 `PerformanceEntry`发给您的分析服务的信息。

<div class="w-aside w-aside--caution">
注意： 由于用户可以在背景标签中打开页面，因此，只有当用户将标签聚焦后，才会有最大的绘画效果，这可能比他们第一次加载时要晚得多。
</div>

#### 加载时间与渲染时间<a class="w-headline-link" href="https://web.dev/lcp/#load-time-vs.-render-time" aria-hidden="true">＃</a> {#load-time-vs.-render-time}

出于安全原因，对于缺少[`Timing-Allow-Origin`][13] 标头的跨源图像，不公开图像的渲染时间戳 。而是只公开其加载时间（因为已经通过许多其他Web API公开了加载时间）。

下面的[用法示例][14] 显示了如何处理渲染时间不可用的元素。但是，在可能的情况下，始终建议您设置 [`Timing-Allow-Origin`][13] 标题，以便您的指标更加准确。

### 如何处理元素布局和大小更改？<a class="w-headline-link" href="https://web.dev/lcp/#how-are-element-layout-and-size-changes-handled" aria-hidden="true">＃</a> {#how-are-element-layout-and-size-changes-handled}

为了使计算和分配新性能条目的性能开销保持较低，对元素大小或位置的更改不会生成新的LCP候选对象。仅考虑元素的初始大小和在视口中的位置。

这意味着可能不会报告最初在屏幕外渲染然后在屏幕上过渡的图像。这也意味着最初在视口中渲染的元素随后被下推，但视线外仍然会报告其初始的视口大小。

但是，（如上所述）如果某个元素已从DOM中删除或与其关联的图像资源发生了变化，则该元素将被删除。

### 范例<a class="w-headline-link" href="https://web.dev/lcp/#examples" aria-hidden="true">＃</a> {#examples}

以下是一些流行的网站上何时出现“最大内容满意”涂料的一些示例：


  <img loading="lazy" width="1600" height="621" class="alignnone size-full wp-image-5895 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_116/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_311/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_298/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e3d0047f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_596/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />


  <img loading="lazy" width="1600" height="621" class="alignnone size-full wp-image-5898 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_116/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_311/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_298/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e6c3f8f9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_596/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />

在以上两个时间轴中，最大的元素随内容加载而变化。在第一个示例中，新内容被添加到DOM中，并且更改了最大的元素。在第二个示例中，布局发生了更改，以前最大的内容已从视口中删除。

通常情况下，延迟加载的内容要比页面上已有的内容大，但不一定是这种情况。接下来的两个示例显示了在页面完全加载之前发生的最大内容绘画。


  <img loading="lazy" width="1600" height="621" class="alignnone size-full wp-image-5896 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_116/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_311/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_298/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e50343ec.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_596/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />


  <img loading="lazy" width="1600" height="621" class="alignnone size-full wp-image-5897 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_116/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_311/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_298/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f785e566d6a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_596/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />

在第一个示例中，Instagram徽标相对较早地加载，即使逐渐显示其他内容，它仍然是最大的元素。在Google搜索结果页面示例中，最大的元素是一段文本，该文本在任何图像或徽标加载完成之前显示。由于所有单个图像均小于此段，因此在整个加载过程中，它始终是最大的元素。

<div class="w-aside w-aside--note">
 在Instagram时间轴的第一帧中，您可能会注意到相机徽标周围没有绿色框。这是因为它是一个<code></code>元素，并且<code></code>元素当前不被视为LCP候选对象。第一个LCP候选对象是第二个框架中的文本。
</div>

## 如何测量LCP <a class="w-headline-link" href="https://web.dev/lcp/#how-to-measure-lcp" aria-hidden="true">＃</a> {#how-to-measure-lcp}

LCP可以[在实验室][15] 或[现场][16]进行测量，并且可以在以下工具中使用：

### 现场的工具<a class="w-headline-link" href="https://web.dev/lcp/#field-tools" aria-hidden="true">＃</a> {#field-tools}

* [Chrome用户体验报告][17]
* [PageSpeed见解][18]
* [Search Console（核心网络生命力报告）][19]

### 实验室工具<a class="w-headline-link" href="https://web.dev/lcp/#lab-tools" aria-hidden="true">＃</a> {#lab-tools}

* [Chrome DevTools][20]
* [灯塔][21]
* [WebPageTest][22]

### 在JavaScript中测量LCP <a class="w-headline-link" href="https://web.dev/lcp/#measure-lcp-in-javascript" aria-hidden="true">＃</a> {#measure-lcp-in-javascript}

参考[打造企业级私有[前端](https://www.w3cdoc.com)监控体系][23]课程中有介绍

示例：

<div class="w-aside w-aside--note">
  <div>
    <pre>const entryType = 'largest-contentful-paint'
constobserver=newPerformanceObserver((list) => {
    list.getEntries().forEach(console.log);
})
observer.observe({ entryTypes: [entryType] });</pre>
  </div>
</div>

### 如果最大的元素不是最重要的怎么办？<a class="w-headline-link" href="https://web.dev/lcp/#what-if-the-largest-element-isn't-the-most-important" aria-hidden="true">＃</a> {#what-if-the-largest-element-isn't-the-most-important}

在某些情况下，页面上最重要的一个元素（或多个元素）与最大元素不同，因此开发人员可能对测量这些其他元素的呈现时间更感兴趣。如关于[自定义指标][24]的文章中所述，可以使用[Element Timing API][25]来实现 。

## 如何改善LCP <a class="w-headline-link" href="https://web.dev/lcp/#how-to-improve-lcp" aria-hidden="true">＃</a> {#how-to-improve-lcp}

LCP主要受以下四个因素影响：

* 服务器响应时间慢
* 渲染阻止的JavaScript和CSS
* 资源加载时间
* 客户端渲染

有关如何改善LCP的深入探讨，请参见[优化LCP][26]。有关还可改善LCP的各个性能技术的其他指导，请参阅：

* [使用PRPL模式应用即时加载][27]
* [优化关键渲染路径][28]
* [优化您的CSS][29]
* [优化图像][30]
* [优化网络字体][31]
* [优化您的JavaScript][32]（适用于客户端呈现的网站）

## 关联课程

* [打造企业级私有[前端](https://www.w3cdoc.com)监控体系][23]
* [高性能极致用户体验[前端](https://www.w3cdoc.com)开发实战][33]

 [1]: https://developer.mozilla.org/en-US/docs/Web/Events/load
 [2]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
 [3]: https://web.dev/fcp/
 [4]: https://web.dev/first-meaningful-paint/
 [5]: https://web.dev/speed-index/
 [6]: https://www.w3.org/webperf/
 [7]: https://web.dev/lcp/#what-elements-are-considered
 [8]: https://wicg.github.io/largest-contentful-paint/
 [9]: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 [10]: https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size
 [11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry
 [12]: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display#The_font_display_timeline
 [13]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin
 [14]: https://web.dev/lcp/#measure-lcp-in-javascript
 [15]: https://web.dev/user-centric-performance-metrics/#in-the-lab
 [16]: https://web.dev/user-centric-performance-metrics/#in-the-field
 [17]: https://developers.google.com/web/tools/chrome-user-experience-report
 [18]: https://developers.google.com/speed/pagespeed/insights/
 [19]: https://support.google.com/webmasters/answer/9205520
 [20]: https://developers.google.com/web/tools/chrome-devtools/
 [21]: https://developers.google.com/web/tools/lighthouse/
 [22]: https://webpagetest.org/
 [23]: https://www.f2e123.com/fed-regain/5744.html
 [24]: https://web.dev/custom-metrics/#element-timing-api
 [25]: https://wicg.github.io/element-timing/
 [26]: https://web.dev/optimize-lcp/
 [27]: https://web.dev/apply-instant-loading-with-prpl
 [28]: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/
 [29]: https://web.dev/fast#optimize-your-css
 [30]: https://web.dev/fast#optimize-your-images
 [31]: https://web.dev/fast#optimize-web-fonts
 [32]: https://web.dev/fast#optimize-your-javascript
 [33]: https://www.f2e123.com/fed-regain/2390.html
