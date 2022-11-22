---
title: 累积版式移位（CLS）
 
---
<div class="w-aside w-aside--note">
  <blockquote>
    <p>
      累积版式移位（CLS）是衡量用户<a href="https://web.dev/user-centric-performance-metrics/#types-of-metrics">视觉稳定性的</a>一项重要的以用户为中心的度量标准，因为它有助于量化用户经历意外的版式移位的频率-较低的CLS有助于确保页面 <a href="https://web.dev/user-centric-performance-metrics/#questions">令人愉悦</a>。
    </p>
  </blockquote>
</div>

您是否曾经在页面上突然发生变化时在线阅读文章？在没有警告的情况下，文字移动了，并且您失去了位置。甚至更糟：您将要点击一个链接或一个按钮，但是在手指落下的瞬间（BOOM），链接移动了，您最终单击了其他东西！

在大多数情况下，这种经历很烦人，但在某些情况下，它们会造成真正的损失。

<div style="width: 640px;" class="wp-video">
  <!--[if lt IE 9]><![endif]--><video class="wp-video-shortcode" id="video-5903-1" width="640" height="496" preload="metadata" controls="controls"><source type="video/webm" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/layout-instability2.webm?_=1" />
  
  <a href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/layout-instability2.webm">https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/layout-instability2.webm</a></video>
</div>

页面内容的意外移动通常是由于异步加载资源或DOM元素动态添加到现有内容上方的页面而发生的。罪魁祸首可能是尺寸未知的图像或视频，呈现比其后备更大或更小的字体，或者是动态调整自身大小的第三方广告或小部件。

使这个问题变得更加棘手的是，网站在开发中的功能通常与用户的体验有很大不同。个性化或第三方内容在开发中的行为通常与在生产中的行为不同，测试图像通常已经在开发人员的浏览器缓存中，并且本地运行的API调用通常是如此之快，以至于延迟不明显。

累积版式移位（CLS）度量标准可以通过测量实际用户发生的频率来帮助您解决此问题。

## 什么是CLS？<a class="w-headline-link" href="https://web.dev/cls/#what-is-cls" aria-hidden="true">＃</a> {#what-is-cls}

CLS会测量在页面的整个生命周期中发生的每个 _意外的版式移位_的所有单独_版式移位分数_的总和。

甲_布局移_发生的任何时间的可见元素改变其从一个所再现的帧到下一个位置。（有关如何计算各个[版式移位得分的][1]详细信息，请参见下文。）<picture><source srcset="../vitals/cls_8x2.svg" media="(min-width: 640px)" /></picture>

<p id="KySgUDR">
  <img loading="lazy" class="alignnone wp-image-5906 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/format,webp" alt="" width="725" height="182" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/format,webp 1716w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_75/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_200/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_192/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f78621803a51.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_385/format,webp 1536w" sizes="(max-width: 725px) 100vw, 725px" />
</p>

### 良好的CLS分数是多少？<a class="w-headline-link" href="https://web.dev/cls/#what-is-a-good-cls-score" aria-hidden="true">＃</a> {#what-is-a-good-cls-score}

为了提供良好的用户体验，网站应努力使CLS分数小于**0.1**。为了确保您达到大多数用户的这一目标，衡量移动设备和台式机设备的页面加载量的**第75个百分位**是一个很好的衡量标准。

<div class="w-aside w-aside--note">
  <p>
    要了解有关此建议背后的研究和方法的更多信息，请参阅：<a href="https://web.dev/defining-core-web-vitals-thresholds/">定义核心Web Vitals指标阈值</a>
  </p>
</div>

## 什么是位移？ {#layout-shifts-in-detail}

布局移动由[Layout Instability API][2]定义，该[API][2]`layout-shift` 在视口中可见的元素在两帧之间更改其开始位置（例如，默认[书写模式下的][3]顶部和左侧位置）时，都会报告条目。这些元素被认为是_不稳定元素_。

请注意，仅当现有元素更改其起始位置时，才会发生布局转换。如果将新元素添加到DOM或现有元素更改了大小，则只要更改不会导致其他可见元素更改其起始位置，该元素就不会算作布局偏移。

### 如何计算CLS分数 {#layout-shift-score}

要计算_布局平移分数_，浏览器将查看视口大小以及两个渲染帧之间视口中_不稳定元素_的移动。布局偏移分数是该运动的两个度量的乘积：_影响比例（impact fraction）_ 和 _位移比例_（均在下面定义）。

<pre class="language-text"><code class="language-text">layout shift score = impact fraction * distance fraction</code></pre>

### 影响比例 {#impact-fraction}

前一帧 _和_当前帧的所有_不稳定元素_的可见区域的_并集_（占视口总面积的_一部分）_是当前帧的_影响分数_。

<p id="xVFjyhF">
  <img loading="lazy" width="1600" height="1200" class="alignnone size-full wp-image-5907 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_576/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862bc7c74a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1152/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />
</p>

在上图中，有一个元素在一帧中占据了视口的一半。然后，在下一帧中，元素下移视口高度的25％。红色的虚线矩形表示两个帧中元素的可见区域的并集，在这种情况下，其为总视口的75％，因此其 _影响分数_为`0.75`。

### 位移比例 {#distance-fraction}

布局移位分数方程的另一部分测量不稳定元素相对于视口移动的距离。的_距离分数_ 是最大的距离的任何_不稳定的元件_在帧已经移动（水平或垂直任一）通过视域的最大尺寸（宽度或高度，取较大值）分开。

<p id="dsLkBua">
  <img loading="lazy" width="1600" height="1200" class="alignnone size-full wp-image-5908 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_576/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7862ed081e5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1152/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />
</p>

上面的示例中，最大视口尺寸是高度，不稳定元素已移动了视口高度的25％，这使得 _距离分数_为0.25。

因此，在此示例中，_碰撞分数_为`0.75`，_距离分数_ 为`0.25`，因此_版式位移分数_为`0.75 * 0.25 = 0.1875`。

<div class="w-aside w-aside--note">
</div>

下一个示例说明将内容添加到现有元素如何影响布局平移分数：

<p id="ligCrmD">
  <img loading="lazy" width="1600" height="1200" class="alignnone size-full wp-image-5909 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_576/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f786309eef82.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1152/format,webp 1536w" sizes="(max-width: 1600px) 100vw, 1600px" />
</p>

在此示例中，灰色框会更改大小，但其开始位置不会更改，因此它不是_不稳定的元素_。

“click me” 按钮以前不在DOM中，因此它的开始位置也不会更改。

但是，绿色框的开始位置确实会发生变化，但是由于已将其部分移出视口，因此在计算_碰撞率_时不会考虑不可见区域。两个框架中绿色框的可见区域的并集（用红色虚线矩形表示）与第一帧中绿色框的区域相同-视口的50％。该_影响分数_是`0.5`。

的_距离分数_被示为具有紫色箭头。绿色框已向下移动了约14％的视口，因此_距离分数_为`0.14`。

布局移位分数是`0.5 x 0.14 = 0.07`。

最后一个示例说明了多个_不稳定元素_：

![具有多个稳定元素和不稳定元素的布局转移示例][4]

上面的第一帧中，对动物的API请求有四个结果，按字母顺序排序。在第二帧中，更多结果将添加到排序列表中。

列表中的第一项（“猫”）在各帧之间不会更改其开始位置，因此很稳定。同样，添加到列表中的新项目以前不在DOM中，因此它们的开始位置也不会更改。但是标有“ Dog”，“ Horse”和“ Zebra”的项目会移动其起始位置，从而使它们成为_不稳定的元素_。

同样，红色，点缀矩形表示这三者的联合_不稳定因素_前，后区“，在这种情况下是视域的面积（约38％_的影响分数_的`0.38`）。

箭头表示_不稳定元素_从其起始位置开始移动的距离。蓝色箭头表示的“斑马”元素移动最多，移动了视口高度的30％。这就是本例中的 _距离分数_`0.3`。

布局移位分数是`0.38 x 0.3 = 0.1172`。

### 预期与意外布局的变化 {#expected-vs.-unexpected-layout-shifts}

并非所有的布局转换都不好。实际上，许多动态Web应用程序经常更改页面上元素的开始位置。

#### 用户启动布局的变化 {#user-initiated-layout-shifts}

仅当用户不期望布局转换时，它才是糟糕的。另一方面，响应于用户交互（单击链接，按下按钮，在搜索框中键入内容等）而发生的布局偏移通常很好，只要该偏移发生在与交互关系足够近的位置即可向用户清除。

例如，如果用户交互触发了可能需要一段时间才能完成的网络请求，则最好立即创建一些空间并显示一个加载指示器，以避免在请求完成时出现不愉快的布局变化。如果用户没有意识到正在加载某些东西，或者对资源何时准备就绪一无所知，他们可能会在等待时尝试单击其他内容，而某些内容可能会从它们下面移出。

在用户输入的500毫秒内发生的布局转换将[`hadRecentInput`][5] 设置该 标志，因此可以将其从计算中排除。

#### 动画和过渡<a class="w-headline-link" href="https://web.dev/cls/#animations-and-transitions" aria-hidden="true">＃</a> {#animations-and-transitions}

动画和过渡效果很好，是一种在不引起用户惊讶的情况下更新页面内容的好方法。在页面上突然发生意外变化的内容几乎总是会产生不良的用户体验。但是，内容逐渐自然地从一个位置移动到另一个位置通常可以帮助用户更好地了解发生了什么，并在状态更改之间进行指导。

CSS[`transform`][6] 属性使您可以为元素设置动画，而不会触发布局转换：

* 而不是更改`height`和`width`属性，请使用`transform: scale()`。
* 左右移动的元件，避免改变`top`，`right`，`bottom`，或 `left`属性，并使用`transform: translate()`来代替。

## 如何衡量CLS <a class="w-headline-link" href="https://web.dev/cls/#how-to-measure-cls" aria-hidden="true">＃</a> {#how-to-measure-cls}

### 现场的工具<a class="w-headline-link" href="https://web.dev/cls/#field-tools" aria-hidden="true">＃</a> {#field-tools}

* [Chrome用户体验报告][7]
* [PageSpeed见解][8]
* [Search Console（核心网络生命力报告）][9]

### 实验室工具<a class="w-headline-link" href="https://web.dev/cls/#lab-tools" aria-hidden="true">＃</a> {#lab-tools}

* [Chrome DevTools][10]
* [灯塔][11]
* [WebPageTest][12]

### 在JavaScript中测量CLS <a class="w-headline-link" href="https://web.dev/cls/#measure-cls-in-javascript" aria-hidden="true">＃</a> {#measure-cls-in-javascript}

参考[打造企业级私有前端监控体系][13]课程中有介绍

示例：

<div class="w-aside w-aside--note">
  <div>
    <pre class="prettyprint"><span class="kwd">const</span><span class="pln"> entryType </span><span class="pun">=</span> <span class="str">'layout-shift'</span><span class="pln">
constobserver</span><span class="pun">=</span><span class="pln">newPerformanceObserver</span><span class="pun">((</span><span class="pln">list</span><span class="pun">)</span> <span class="pun">=></span> <span class="pun">{</span><span class="pln">
    list</span><span class="pun">.</span><span class="pln">getEntries</span><span class="pun">().</span><span class="pln">forEach</span><span class="pun">(</span><span class="pln">console</span><span class="pun">.</span><span class="pln">log</span><span class="pun">);</span>
<span class="pun">})</span><span class="pln">
observer</span><span class="pun">.</span><span class="pln">observe</span><span class="pun">({</span><span class="pln"> entryTypes</span><span class="pun">:</span> <span class="pun">[</span><span class="pln">entryType</span><span class="pun">]</span> <span class="pun">});</span></pre>
  </div>
</div>

## 如何改善CLS <a class="w-headline-link" href="https://web.dev/cls/#how-to-improve-cls" aria-hidden="true">＃</a> {#how-to-improve-cls}

对于大多数网站，您可以遵循一些指导原则来避免所有意外的布局变化：

* **请务必在图片和视频元素上包含size属性，否则请使用[CSS长宽比框之][14]类的东西保留所需的空间。**这种方法可确保在加载图像时浏览器可以在文档中分配正确的空间量。请注意，您还可以使用[unsize-media功能部件策略][15] 在支持功能部件策略的浏览器中强制执行此行为。
* **除非响应用户交互，否则切勿在现有内容上方插入内容。**这样可以确保可以预期发生任何版式移位。
* **与将动画触发布局更改的属性动画相比，更喜欢使用转换动画。**对过渡进行动画处理，以提供状态与状态之间的上下文和连续性。

有关如何改善CLS的深入探讨，请参见[优化CLS][16]。

## 关联课程

* [打造企业级私有前端监控体系][13]
* [高性能极致用户体验前端开发实战][17]

 [1]: https://web.dev/cls/#layout-shift-score
 [2]: https://github.com/WICG/layout-instability
 [3]: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
 [4]: https://webdev.imgix.net/cls/layout-shift-4.png
 [5]: https://wicg.github.io/layout-instability/#dom-layoutshift-hadrecentinput
 [6]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 [7]: https://developers.google.com/web/tools/chrome-user-experience-report
 [8]: https://developers.google.com/speed/pagespeed/insights/
 [9]: https://support.google.com/webmasters/answer/9205520
 [10]: https://developers.google.com/web/tools/chrome-devtools/
 [11]: https://developers.google.com/web/tools/lighthouse/
 [12]: https://webpagetest.org/
 [13]: https://www.f2e123.com/fed-regain/5744.html
 [14]: https://css-tricks.com/aspect-ratio-boxes/
 [15]: https://github.com/w3c/webappsec-feature-policy/blob/master/policies/unsized-media.md
 [16]: https://web.dev/optimize-cls/
 [17]: https://www.f2e123.com/fed-regain/2390.html
