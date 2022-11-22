---
title: web性能指标标准


date: 2020-11-14T08:44:55+00:00
url: /javascriptnodejs/6167.html
classic-editor-remember:
  - classic-editor
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png
views:
  - 618
fifu_image_alt:
  - web性能指标标准


---
很多人关注的、包括网上发布的一些文章大多都是关于性能优化手段，也有关于性能指标的以及如何做性能监控的，这些很多都基于 Web 性能标准以及浏览器对 Web 性能标准的实现。

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

如果我们全面的了解了 Web 性能标准，就能知道性能指标是如何定义的、性能指标的计算方式以及有哪些浏览器支持的优化策略。基于这些了解，我们才能说如何去排查性能问题、如何去优化性能以及如何去采集这些性能数据来做性能监控。

从 Web 性能工作组的[主页][2]可以看到全部的性能标准，我们也可以在 [ALL STANDARDS AND DRAFTS][3] 搜索到这些标准。

本篇文章将与大家一起，系统的学习这些 Web 性能标准。我将 Web 性能标准大体分为两类：**性能度量**相关和**优化策略**相关。在介绍每种标准时，我将按这样的顺序介绍：

  * 标准的用处
  * 标准的版本
  * 标准包含的内容
  * 与其他标准的关系

## 性能度量 {#0}

我们关注的页面的性能主要包括页面呈现时间以及交互操作的流畅度。当页面呈现时间越短、交互越流畅时，我们认为页面性能越好。

用户可以在感官上判断性能的好坏，但是作为开发者，我们需要把性能量化，用性能指标来度量性能的好坏。现在主流浏览器已经支持通过特定的 API 来获取页面的性能数据。

在 HTML 规范中定义了 [Window][4] 对象，我们可以通过 window 来获取一个 Window 对象， 在 window 上挂载了很多我们熟悉的 API， 例如:

  * window.document
  * window.history
  * window.localStorage
  * window.location
  * window.navigator
  * window.postMessage
  * &#8230;

这些 API 都由不同的 W3C 标准定义，而 Web 性能标准则是在 window 上添加了 performance 属性，通过 window.performance 返回一个 Performance 对象。

对象中包含了很多用于衡量性能的属性和方法，而这些属性和方法由多种 Web 性能标准定义。下面来一一介绍这些与性能度量相关的规范。

### High Resolution Time {#1}

该规范定义了一个 JavaScript 接口，该接口以毫秒级的分辨率提供当前时间，并且不受系统时钟偏差或调整的影响。

此标准有两个版本 Level 1 和  Level 2，Level 2 已经是正式发布的标准，所以 Level 1 已经过时了，官方不建议再使用，我们只需要知道 Level 2 定义了哪些规范就好。

  * <del><a href="https://www.w3.org/TR/2012/REC-hr-time-20121217/#sec-high-resolution-time">High Resolution Time Level 1 </a></del> （已过时）
  * [High Resolution Time Level 2][5]  （REC）&#x2714;︎

Level 2 包含了这些内容：

  * **1、定义了测量性能数据的初始时间（Time Origin）**

我们获取到的性能数据都是时间戳，需要一个初始时间来计算时间差，即某一阶段的耗时。

  * **2、定义了高精度时间戳 DOMHighResTimeStamp**

**  
用于存储以毫秒为单位的时间值，Web 性能规范定义的 API 获取到的时间都为高精度的时间戳。  
** 

  * **3、定义了 Performance 对象，以及 Performance 对象的几个属性和方法。**
  * now()
  * timeOrigin
  * toJSON()

所有的性能数据都是通过 window.performance 返回的 Performance 对象获得的，下面的 Time 相关的性能标准所定义的属性和方法都是在 window.performance 和 Performance 对象中。

> Performance 对象最初是在 [Navigation Timing Level 1][6] 中定义的

好了，了解了规范定义的内容，大家也清楚了为什么此规范名为 High Resolution Time 了吧？因为该规范的主要内容是与**高精度时间**相关的。

### Performance Timeline {#2}

此标准对上述的 [HR-TIME-2][7] 规范中定义的 Performance 对象进行了扩展，**提供了基于特定筛选条件（Name、EntryType）检索性能度量的接口**，通过这些接口我们可以获得多种维度（页面、资源等）的性能度量时间线。

此标准目前有两个版本 Level 1 和 Level 2。Level 1 目前是 REC 状态，Level 2 规范还在草案阶段，当 Level 2 规范正式发布时， Level 1 也将被废弃。

  * [Performance Timeline][8]   （REC）
  * [Performance Timeline Level 2][9]  （WD） &#x2714;︎

Level 2 规范包含了这些内容：

  * **1、给 **[**Performance**][10]** 对象添加了三个方法：** 
      * getEntries()
      * getEntriesByType()
      * getEntriesByName()

我们可以在浏览器控制台输入这段代码，看看 Entry 是什么。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-json"><code class=" language-json">window.performance.getEntries(&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

返回的是一个数组，数组中包含这几种对象，每种对象都继承自 PerformanceEntry 对象，即都包含 PerformanceEntry 的两个字段： name 和 entryType。

  * PerformanceResourceTiming
  * PerformanceNavigationTiming
  * PerformancePaintTiming
  * PerformanceMark
  * PerformanceMeasure
  * PerformanceEventTiming
  * PerformanceServerTiming
  * &#8230;

这些对象包含 Web 应用程序整个生命周期的各种性能数据度量。

> 这些对象会在其他 Time 相关的规范中定义，因此这些与 Time 相关的规范都会使用到 Performance Timeline 规范定义的 PerformanceEntry。

所以，我们可以根据 getEntriesByType() 和 getEntriesByName() 来获取特定的 name 和 特定的 entryType 的性能数据。例如：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'paint'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByName&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'https://www.google.com/images/nav_logo299.webp'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

它们的具体信息如下：

<div class="table-contianer">
  <table>
    <tr>
      <th>
        <strong>Interface</strong>
      </th>
      
      <th>
        <strong>EntryType</strong>
      </th>
      
      <th>
        <strong>Name</strong>
      </th>
      
      <th>
        <strong>InitiatorType （发起请求的类型）</strong>
      </th>
    </tr>
    
    <tr>
      <td>
        PerformanceResourceTiming
      </td>
      
      <td>
        resource
      </td>
      
      <td>
        资源 URL
      </td>
      
      <td>
        link、img、script、css、fetch、beacon、iframe、other
      </td>
    </tr>
    
    <tr>
      <td>
        PerformanceNavigationTiming
      </td>
      
      <td>
        navigation
      </td>
      
      <td>
        页面 URL
      </td>
      
      <td>
        navigation
      </td>
    </tr>
    
    <tr>
      <td>
        PerformancePaintTiming
      </td>
      
      <td>
        paint
      </td>
      
      <td>
        first-paint、first-contentful-paint
      </td>
      
      <td>
        /
      </td>
    </tr>
    
    <tr>
      <td>
        PerformanceEventTiming
      </td>
      
      <td>
        first-input
      </td>
      
      <td>
        keydown
      </td>
      
      <td>
        /
      </td>
    </tr>
    
    <tr>
      <td>
        PerformanceMark
      </td>
      
      <td>
        mark
      </td>
      
      <td>
        mark 被创建时给出的 name
      </td>
      
      <td>
        /
      </td>
    </tr>
    
    <tr>
      <td>
        PerformanceMeasure
      </td>
      
      <td>
        measure
      </td>
      
      <td>
        measure 被创建时给出的 name
      </td>
      
      <td>
        /
      </td>
    </tr>
    
    <tr>
      <td>
        PerformanceLongTaskTiming
      </td>
      
      <td>
        longtask
      </td>
      
      <td>
        <a href="https://www.w3.org/TR/longtasks-1/#sec-PerformanceLongTaskTiming">看这里</a>
      </td>
      
      <td>
        /
      </td>
    </tr>
  </table>
</div>

Entry Type 表示** **PerformanceEntry 对象的类型，W3C 性能工作组制定了一个 Entry Type 名称的注册规范：[Timing Entry Names Registry][11]， 该规范目前在 Working Draft 阶段。

目前已经注册的 Type 有这些：

<p id="VxXXWRc">
  <img loading="lazy" width="2574" height="776" class="alignnone size-full wp-image-6170 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/format,webp 2574w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_90/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_241/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_232/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_463/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf97dc9f3b9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_617/format,webp 2048w" sizes="(max-width: 2574px) 100vw, 2574px" />
</p>

  * **2、定义了 **[**PerformanceEntry**][12]** 对象**

PerformanceEntry 对象具有 name、entryType、startTime、duration、 toJSON() 这些属性，是 PerformanceResourceTiming、PerformanceNavigationTiming 等对象的公共属性，所以将被后面介绍的其他规范定义的对象（如 PerformanceResourceTiming、PerformanceNavigationTiming 等）继承。

  * **3、定义了 **[**PerformanceObserver**][13] **对象**

用于观察性能时间线，以便在记录新的性能指标时发出通知, 这在采集性能数据时经常用到。例如下面的例子，观察 resource 类型的性能数据并打印。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-json"><code class=" language-json">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;&lt;/head&gt;
&lt;body&gt;
&lt;img id=&lt;span class="token string">"image0"&lt;/span> src=&lt;span class="token string">"https://www.w3.org/Icons/w3c_main.png"&lt;/span> /&gt;
&lt;script&gt;
const resourceObserver = new PerformanceObserver(list =&gt; &lt;span class="token punctuation">{&lt;/span>
  list
    .getEntries(&lt;span class="token punctuation">)&lt;/span>
    // Get the values we are interested in
    .map((&lt;span class="token punctuation">{&lt;/span> name&lt;span class="token punctuation">,&lt;/span> entryType&lt;span class="token punctuation">,&lt;/span> startTime&lt;span class="token punctuation">,&lt;/span> fetchStart&lt;span class="token punctuation">,&lt;/span> responseStart&lt;span class="token punctuation">,&lt;/span> responseEnd &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span> =&gt; &lt;span class="token punctuation">{&lt;/span>
      const obj = &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token property">"Name"&lt;/span>&lt;span class="token operator">:&lt;/span> name&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token property">"Entry Type"&lt;/span>&lt;span class="token operator">:&lt;/span> entryType&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token property">"Start Time"&lt;/span>&lt;span class="token operator">:&lt;/span> startTime&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token property">"Fetch Start"&lt;/span>&lt;span class="token operator">:&lt;/span> fetchStart&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token property">"Response Start"&lt;/span>&lt;span class="token operator">:&lt;/span> responseStart&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token property">"Response End"&lt;/span>&lt;span class="token operator">:&lt;/span> responseEnd&lt;span class="token punctuation">,&lt;/span>
      &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
      return JSON.stringify(obj&lt;span class="token punctuation">,&lt;/span> &lt;span class="token null">null&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">2&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    // Display them to the console.
    .forEach(console.log&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  // Disconnect after processing the events.
  resourceObserver.disconnect(&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
// Subscribe to new events for Resource Timing.
resourceObserver.observe(&lt;span class="token punctuation">{&lt;/span>type&lt;span class="token operator">:&lt;/span> &lt;span class="token string">"resource"&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
// 多个 Entry Type
// userTimingObserver.observe(&lt;span class="token punctuation">{&lt;/span>entryTypes&lt;span class="token operator">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token string">"mark"&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"measure"&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Performance Timeline 了吧？因为该规范的提供了**获取各种类型**（navigation、resource、paint 等）的**性能时间线**的 API。

### Resource Timing {#3}

该规范定义了用于访问文档中资源的完整计时信息的 API， 例如请求资源的 DNS、TCP、Request 等的开始时间和结束时间，可以帮助我们收集文档中静态资源的加载时间线、资源大小和资源类型。

此规范有两个版本 Level 1 和  Level 2， Level 1 在 2017 年就成为了候选推荐版本，到今天也没有正式发布。Level 2 当前还在工作草案阶段，在 2020.02.18 还在更新，但并没有在文档中说明与 Level 1 的关系。

  * [Resource Timing Level 1][14]   （CR）
  * [Resource Timing Level 2][15]  （WD）&#x2714;︎

从两个版本的内容看，内容差别不大，但 Level 2 新增了[ IANA Considerations][16] 用于将 Timing-Allow-Origin 设置为临时消息头，并更新了资源时序处理模型。

&nbsp;

<p id="FJneIiP">
  <img loading="lazy" width="924" height="438" class="alignnone size-full wp-image-6171 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/format,webp 924w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_142/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_379/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf98035bf7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_364/format,webp 768w" sizes="(max-width: 924px) 100vw, 924px" />
</p>

<https://w3c.github.io/resource-timing/timestamp-diagram.svg>  
资源时序处理模型

Level 2 规范包含了这些内容：

  * **1、定义了 **[**PerformanceResourceTiming**][17]** 对象**

此对象描述了资源请求的性能时间线。

  * **2、给 Performance 对象添加了如下方法** 
      * clearResourceTimings()
      * setResourceTimingBufferSize()
  * **3、定义了 **[**Timing-Allow-Origin**][18]** 响应头**

对于跨域请求的资源，获取到的 PerformanceResourceTiming 对象中的属性值（时间），由于[跨域限制][19]，浏览器不会将资源的性能数据提供给用户，这些时间值都会被设置为 0 。

如果服务端在请求资源的响应头中添加 Timing-Allow-Origin，则浏览器就会将此资源的性能时间值暴露给用户。

我们可以通过以下语句获取文档中所有资源的性能数据：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'resource'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

或者通过以下语句获取特定资源的性能数据：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByName&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'https://www.google.com/images/nav_logo299.webp'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Resource Timing 了吧？因为该规范描述了**资源请求时序**的性能度量。

### Navigation Timing {#4}

此标准定义了**文档**导航过程中完整的性能度量，即一个文档从发起请求到加载完毕各阶段的性能耗时。

此标准目前有两个版本，Level 1 已经是 2012 年的版本了， Level 2 最新更新在 2020 年 1 月，将来 Level 2 会替代 Level 1 版本。

  * [Navigation Timing Level 1][6]  （REC）
  * [Navigation Timing Level 2][20]  （WD）&#x2714;︎

目前很多浏览器已经实现了 Level 2，建议使用 Level 2 规范定义的 API。因为 Level 1 和 Level 2 的差别比较大，但  Level 1 定义的 API 仍有很多人在用，所以下面都详细介绍下。

**Navigation Timing Level 1** 

前面提到了 High Resolution Time API 定义了 Performance 对象，可通过 window.performance 获取。而 Navigation Timing Level 1 则是在此基础上增加了两个属性：timing 和 navigation。

规范包含了以下内容：

  * **1、定义了 PerformanceTiming 对象**

用来衡量页面性能，我们可以通过通过 window.performance.timing 获取页面的性能数据，返回的对象中每个字段的含义可以在 [PerformanceTiming | MDN][21] 上查阅。

按照事件发生的先后顺序，这些性能数据的 TimeLine 如下：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf959bc391d4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf959bc391d4.png?x-oss-process=image/format,webp" /> [  
https://www.w3.org/TR/navigation-timing/timing-overview.png][22]

  * **2、定义了 PerformanceNavigation 对象**

用来描述加载相关的操作，通过 window.performance.navigation 获得，返回的 PerformanceNavigation 对象存储了两个属性，它们表示触发页面加载的原因。这些原因可能是页面重定向、前进后退按钮或者普通的 URL 加载

返回的对象中每个字段的含义可以在 [PerformanceNavigation | MDN][23] 上查阅。

  * **3、定义了 window.performance 属性**

为 Window 对象添加了 performance 属性：timing 和 navigation

**Navigation Timing Level 2**

2019 年 Web 性能工作组带来了 [Navigation Timing Level 2][20] ，将会替代 Navigation Timing Level 1。在 Navigation Timing Level 1 中定义的两个属性 performance.timing 和 performance.navigation 被废弃了。

Level 2 新增了以下这些内容，我们可以先不用理解这段英文讲的什么，在阅读完这一小节后就能理解 Level 2 做了哪些更新了。

>   * the definition of Performance interface was moved to [[PERFORMANCE-TIMELINE-2][24]];
>   * builds on top of [[RESOURCE-TIMING-2][25]];
>   * support for [[PERFORMANCE-TIMELINE-2][24]];
>   * support for [[HR-TIME-2][26]];
>   * support for [prerender][27] navigations [[RESOURCE-HINTS][28]];
>   * exposes [number of redirects][29] since the last non-redirect navigation;
>   * exposes [next hop network protocol][30];
>   * exposes [transfer][31], [encoded body][32] and [decoded body][33] size information;
>   * [secureConnectionStart][34] attribute is now mandatory.

Level 2 规范主要包含以下内容：

  * **1、定义了 [PerformanceNavigationTiming][35] 对象**

此对象用于度量文档的性能，我们可以通过以下方式获取文档的性能数据，所有时间值都是以 [Origin Time][36] 为起点测量的。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">window&lt;span class="token punctuation">.&lt;/span>performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"navigation"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

这将返回以下这些数据  
这些属性并不都是 [PerformanceNavigationTiming | MDN][37] 对象自有的，有一部分是从原型对象中继承的。我们可以在控制台输入以下代码来查看此对象的原型链。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>entry&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"navigation"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">let&lt;/span> proto &lt;span class="token operator">=&lt;/span> Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getPrototypeOf&lt;/span>&lt;span class="token punctuation">(&lt;/span>entry&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">const&lt;/span> protos &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">while&lt;/span>&lt;span class="token punctuation">(&lt;/span>proto&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">toString&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">!=&lt;/span> &lt;span class="token string">'[object Object]'&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    protos&lt;span class="token punctuation">[&lt;/span>proto&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">toString&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">keys&lt;/span>&lt;span class="token punctuation">(&lt;/span>proto&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    proto &lt;span class="token operator">=&lt;/span> Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getPrototypeOf&lt;/span>&lt;span class="token punctuation">(&lt;/span>proto&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>protos&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

得到的结果是：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-json"><code class=" language-json">&lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token property">"[object PerformanceNavigationTiming]"&lt;/span>&lt;span class="token operator">:&lt;/span>&lt;span class="token punctuation">[&lt;/span>
        &lt;span class="token string">"unloadEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"unloadEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domInteractive"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domContentLoadedEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domContentLoadedEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domComplete"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"loadEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"loadEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"type"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"redirectCount"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"toJSON"&lt;/span>
    &lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token property">"[object PerformanceResourceTiming]"&lt;/span>&lt;span class="token operator">:&lt;/span>
        &lt;span class="token string">"initiatorType"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"nextHopProtocol"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"workerStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"redirectStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"redirectEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"fetchStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domainLookupStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"domainLookupEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"connectStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"connectEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"secureConnectionStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"requestStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"responseStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"responseEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"transferSize"&lt;/span>&lt;span class="token punctuation">,&lt;/span> 
        &lt;span class="token string">"encodedBodySize"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"decodedBodySize"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"serverTiming"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"toJSON"&lt;/span>
    &lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token property">"[object PerformanceEntry]"&lt;/span>&lt;span class="token operator">:&lt;/span>&lt;span class="token punctuation">[&lt;/span>
        &lt;span class="token string">"name"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"entryType"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"startTime"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"duration"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token string">"toJSON"&lt;/span>
    &lt;span class="token punctuation">]&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

可以看到 Navigation Timing Level 2 规范只定义了这些字段：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-json"><code class=" language-json">&lt;span class="token string">"unloadEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"unloadEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"domInteractive"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"domContentLoadedEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"domContentLoadedEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"domComplete"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"loadEventStart"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"loadEventEnd"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"type"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"redirectCount"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
&lt;span class="token string">"toJSON"&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

其中的 type 和 redirectCount 就是被废弃的 Navigation Timing Level 1 标准的 window.performance.navigation 返回的 [PerformanceNavigation][23] 对象所包含的内容。

而 Navigation Timing Level 1 中的通过 window.performance.timing 获取的 PerformanceTiming 对象所包含的描述文档性能的数据则是由以下对象共同描述的：

  * [Navigation Timing Level 2][20] 定义的 PerformanceNavigationTiming 对象
  * [Resource Timing Level 2][15] 定义的 PerformanceResourceTiming 对象
  * [Performance Timeline Level 2][9] 定义的 PerformanceEntry 对象

> 我们可以通过 [Resource Timing Level 2][15] 标准中定义的 API window.performance.getEntriesByType(&#8220;resource&#8221;) 获取特定资源所需的时间长度。

由此，[Navigation Timing Level 2][20] 给出了新的时间线，与 Navigation Timing Level 1 不同的是将描述资源加载的时间用 PerformanceResourceTiming 对象封装了起来。

<p id="SixxFxY">
  <img loading="lazy" width="2810" height="1032" class="alignnone size-full wp-image-6173 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/format,webp 2810w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_110/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_294/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_282/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_564/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9893c0080.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_752/format,webp 2048w" sizes="(max-width: 2810px) 100vw, 2810px" />
</p>

<https://www.w3.org/TR/navigation-timing-2/timestamp-diagram.svg>

**2、定义了 NavigationType 的枚举值**

NavigationType 是一个枚举类型，包含四种值：navigate、reload 、 back_forward 和 prerender

好了，现在让我们来理解下 Level 2 标准中说的这些改变具体表现在哪里吧。

the definition of Performance interface was moved to [[PERFORMANCE-TIMELINE-2][24]];

> 将对 Performance 对象的定义放在了 [PERFORMANCE-TIMELINE-2][24] 标准中

builds on top of [[RESOURCE-TIMING-2][25]];

> 基于 [RESOURCE-TIMING-2][25] 标准，从上文可以看到使用了在 RESOURCE-TIMING-2 中 定义的 PerformanceResourceTiming

support for [[PERFORMANCE-TIMELINE-2][24]];

> 使用了 [Performance Timeline Level 2][9] 定义的 PerformanceEntry 对象

support for [[HR-TIME-2][26]];

> 所有的时间值都是以 [High Resolution Time Level 2][38] 中定义的 timeOrigin 为时间起点计算的。

support for [prerender][27] navigations [[RESOURCE-HINTS][28]];

> [Level 1 中定义的导航类型][39] 有三种值：0， 1，2；对应了 [Level 2 中 NavigationType][40] 的 navigate、reload 和 back_forward。  
> 但 Level 2 新增了 prerender 这种类型，而导航可被初始化为 prerender 类型是在 [RESOURCE-HINTS][28] 标准中定义的。

exposes [number of redirects][29] since the last non-redirect navigation;

> PerformanceNavigationTiming 对象中的 redirectCount 字段

exposes [next hop network protocol][30];

> PerformanceResourceTiming 对象中的 nextHopProtocol 字段

exposes [transfer][31], [encoded body][32] and [decoded body][33] size information;

> PerformanceResourceTiming 对象中的 transferSize、encodedBodySize、decodedBodySize

[secureConnectionStart][34] attribute is now mandatory.

> secureConnectionStart 属性在 Level 1 中是可选的，但在 Level 2 中浏览器必需设置这个属性

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Navigation Timeline 了吧？因为该规范定义了描述**文档**在整个**导航过程**中的**性能度量** PerformanceNavigationTiming 对象。

### Paint Timing {#5}

此规范定义了一个 API 用来记录在页面加载期间的一些关键时间点的性能度量，比如 First Paint 、First Contentful Paint。

此规范只有一个版本，这是第一个也是最新的版本，目前还在 Working Draft 阶段。

  * [Paint Timing][41] （WD）&#x2714;︎

此规范包含以下内容：

  * **1、定义了 PerformancePaintTiming 对象**

用于描述在页面加载期间的一些关键时间点的性能度量，我们可以在控制台通过以下语句查看：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'paint'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

结果返回一个每一项都为 PerformancePaintTiming 类型的数组，一项为 first-paint ，另一项为 first-contentful-paint。

  * **2、提出了一些关键时间点的定义，例如  First Paint 、First Contentful Paint**

First Paint，是从导航到浏览器将第一个像素呈现到屏幕的时间，这不包括默认的背景绘制，但包括非默认的背景绘制。这是开发人员关心页面加载的第一个关键时刻——当浏览器开始呈现页面时。

**First Contentful Paint** (FCP)，是当浏览器呈现来自 DOM 的第一位内容时，向用户提供页面实际加载的第一个反馈。这是用户第一次开始使用页面内容。

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Paint Timing 了吧？因为该规范定义了获取**Paint 关键时间点**的**性能**数据的 API。

### User Timing {#6}

此规范定义了一个可以让 Web 开发者测量性能的 API 。目前有两个版本， Level 2 已正式发布，Level 3 还在草案阶段，将来也会替代 Level 2。

  * [User Timing Level 2][42] （REC）
  * [User Timing Level 3][43] (WD) &#x2714;︎

Level 3 在 Level 2 的基础上做了改动，下面介绍 Level 3 规范包含的内容。

  * **1、给 **[**Performance**][44] **对象添加了几个方法**

&nbsp;

  * mark()
  * clearMarks()
  * measure()
  * clearMeasures()

使用方法如下，通过 mark() 方法可以在指定位置添加一个时间戳，记录执行到此位置时的时间。Mark 就是标记的意思，并且会给这个标记一个名称。

measure() 方法则可以测量两个时间点之间的间隔，并给它一个名称。

但是 Level 2 和 Level 3 中对 mark() 和 measure() 的用法是有区别的。

在 Level 2 中的用法如下，mark() 方法返回的 startTime 是执行到此标记语句时的时间。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token comment" spellcheck="true">// Level 2 中的用法&lt;/span>
performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">mark&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"mySetTimeout-start"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">measure&lt;/span>&lt;span class="token punctuation">(&lt;/span>
  &lt;span class="token string">"mySetTimeout"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
  &lt;span class="token string">"mySetTimeout-start"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
  &lt;span class="token string">"mySetTimeout-end"&lt;/span>
&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

在 Level 3 中，mark() 支持传入的第二个参数为一个对象，此对象的 startTime 字段可以支持用户自定义标记的开始时间，还提供了一个 detail 字段给用户描述其他信息；measure() 方法也接收第二个参数为一个对象，除了在 Level 2 中第二个参数和第三个参数表示的测量的开始时间和结束时间外，也提供了一个 detail 字段给用户描述其他信息。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token comment" spellcheck="true">// Level 3 中的用法&lt;/span>
performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">mark&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"mySetTimeout-start"&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  detail&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">{&lt;/span>component&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'component_name'&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span>
  &lt;span class="token comment" spellcheck="true">// 在 Level 2 中 startTime 不用传入，后台默认是 mark 标记的时间，Level 3 中可以支持用户自己定义了&lt;/span>
  startTime&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">123&lt;/span>  
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">measure&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"click_to_update_component"&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    detail&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">{&lt;/span>component&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'component_name'&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    start&lt;span class="token punctuation">:&lt;/span> startMark&lt;span class="token punctuation">.&lt;/span>startTime&lt;span class="token punctuation">,&lt;/span>
    end&lt;span class="token punctuation">:&lt;/span> performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">now&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span>
 &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

  * **2、定义了 PerformanceMark 对象**

描述 mark() 方法返回的数据, 可以通过 performance.getEntriesByType(&#8216;mark&#8217;) 获得，字段的具体含义可以在这里查看：[Performance.mark() | MDN][45]， 其中 detail 字段是在 Level 3 规范中定义的。

  * **3、定义了 PerformanceMeasure 对象**

描述 measure() 方法返回的数据，performance.getEntriesByType(&#8216;measure&#8217;)，字段的具体含义可以在[Performance.measure() | MDN][46] 查看，其中 detail 字段是在 Level 3 规范中定义的。

好了，现在你知道为什么此规范叫 User Timing 了吧？ 因为它提供了可以**让用户自定义时间节点来测量性能**的接口，而不是像 Resource Timing、Navigation Timing 和 Paint Timing 一样由浏览器决定测量的时间节点（例如：redirectStart、domainLookupStart、connectEnd 等等）。<a name="ryyWm"></a>

### Server Timing {#7}

我们知道前面已经介绍的 Resource Timing、Navigation Timing、Paint Timing 和 User Timing 规范描述的都是 Web 应用程序的性能特征，比如请求启动的时间、协商连接、接收响应等时间节点，这些性能度量浏览器都可以采集到，但请求是如何路由的、在服务器上花费的时间在哪里等无法获知。

此规范描述了如何将服务器端在请求-响应周期内的性能度量传递给用户代理，并定义了一个 API 使应用程序能够收集、处理和执行这些指标。

此规范只有一个版本，目前在 Working Draft 阶段。

  * [Server Timing][47] （WD）&#x2714;︎

此规范包含以下内容：

  * **1、定义了与服务端的通信协议：Server-Timing 响应头**

响应头信息如下, 可以在 <https://www.w3.org/TR/server-timing/#examples> 查看响应头的具体含义

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-undefined"><code class="language- language-undefined">&gt; GET /resource HTTP/1.1
&gt; Host: example.com

&lt; HTTP/1.1 200 OK
&lt; Server-Timing: miss, db;dur=53, app;dur=47.2
&lt; Server-Timing: customView, dc;desc=atl
&lt; Server-Timing: cache;desc="Cache Read";dur=23.2
&lt; Trailer: Server-Timing
&lt; (... snip response body ...)
&lt; Server-Timing: total;dur=123.4
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

  * **2、定义了描述服务端性能度量的接口 PerformanceServerTiming 对象**

浏览器会通过 [Server Timing Header 的解析算法][48] 将解析后的每一个性能度量用 PerformanceServerTiming 对象来表示。

  * **3、给 **[**PerformanceResourceTiming**][49]** 对象添加了 serverTiming 属性**

每个 PerformanceServerTiming 描述服务端的一个性能度量信息，这些度量服务端性能的所有PerformanceServerTiming 对象放在一个数组中，挂在  PerformanceResourceTiming 对象的 serverTiming 属性上，我们可以通过以下语句获取：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'navigation'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
performance&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntriesByType&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'resource'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Server Timing 了吧？因为该规范定义了如何**获取服务端各节点性能**的 API。  
<a name="J4Zdi"></a>

### Long Tasks API {#8}

当用户与页面交互时，应用程序和浏览器都会将浏览器随后执行的各种事件排队，例如，用户代理根据用户的活动安排输入事件，应用程序为 requestAnimationFrame 和其他回调等安排回调。一旦进入队列，这些事件就会被浏览器安排逐个出列并执行。

但是，有些任务可能需要很长时间，如果发生这种情况，UI 线程将被锁定，所有其他任务也将被阻止。对于用户来说，这是一个卡死的页面，浏览器无法响应用户的输入，这是目前 Web 上不良用户体验的主要来源。

此规范定义了一个 API，可以使用它来检测这些“长任务（Long Task）”的存在，“长任务”在很长一段时间内独占 UI 线程，并阻止执行其他关键任务，例如响应用户输入。

此规范目前只有一个版本，在 Working Draft 阶段。

  * [Long Tasks API 1][50] （WD） &#x2714;︎

此规范包含以下内容：

  * **1、定义了 PerformanceLongTaskTiming 对象**

用于描述 Long Task 信息，对象中各字段的含义可在 [Long Tasks API | MDN][51] 查阅。

  * **2、定义了什么是 Long Task**

Long Task 是指超过 50ms 的事件循环任务。

> 50 毫秒这个阈值标准来源于 [RAIL Model][52] 中 [Response: process events in under 50ms][53](切换到英文版) 。

如何检测是否有 Long Task？我们可以使用 PerformanceObserver 这个 API。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">var&lt;/span> observer &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">PerformanceObserver&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>list&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">var&lt;/span> perfEntries &lt;span class="token operator">=&lt;/span> list&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getEntries&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">for&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">var&lt;/span> i &lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span> i &lt;span class="token operator">&lt;&lt;/span> perfEntries&lt;span class="token punctuation">.&lt;/span>length&lt;span class="token punctuation">;&lt;/span> i&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment" spellcheck="true">// Process long task notifications:&lt;/span>
        &lt;span class="token comment" spellcheck="true">// report back for analytics and monitoring&lt;/span>
        &lt;span class="token comment" spellcheck="true">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment" spellcheck="true">// register observer for long task notifications&lt;/span>
observer&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">observe&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>entryTypes&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token string">"longtask"&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment" spellcheck="true">// Long script execution after this will result in queueing&lt;/span>
&lt;span class="token comment" spellcheck="true">// and receiving "longtask" entries in the observer.&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

好了，了解了此规范定义的内容，大家也清楚了为什么此规范名为 Long Task API 了吧？因为该规范定义了如何**检测长任务（Long Task）**的 API。<a name="P3kBC"></a>

##  优化策略 {#9}

除了以上关于性能度量的标准，Web 性能工作组还制定了一些可以让浏览器来实现的性能优化标准，并给我们提供了使用这些优化措施的 API。<a name="Vm1C0"></a>

### Resource Hints &#8211; 加载性能 {#10}

许多 Web 应用程序已经利用了各种预取技术来提高加载性能，这包括但不限于在需要之前使用 XMLHttpRequest 来获取和缓存资源。但是，这些实现不能提供与浏览器支持的相同的性能级别。更糟糕的是，这些实现有时与浏览器逻辑冲突，导致延迟或不必要的资源获取，从而降低整个页面性能。

此规范定义了 HTML 的 `<Link>` 元素的 rel 属性值，包括 dns-prefetch、preconnect、prefetch 和 prerender。我们可以使用这些资源提示让用用户代理帮助我们预解析 DNS、预链接、预加载资源以及预处理资源以提高页面性能。

此规范目前只有一个版本，还在工作草案阶段。

  * [Resource Hints][54]  Working Draft

下面介绍此规范定义的 4 个资源提示：

  * **1、资源提示: dns-prefetch(Resource Hints: dns-prefetch)**

给浏览器提示，在后台执行 DNS 查找以提高性能。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-html"><code class=" language-html">&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>dns-prefetch&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>//example.com&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

  * **2、资源提示:预连接(Resource Hints: preconnect)**

给浏览器提示在后台开始连接握手(DNS，TCP，TLS)以提高性能。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-html"><code class=" language-html">&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>preconnect&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>//example.com&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>preconnect&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>//cdn.example.com&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">crossorigin&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

  * 3、**资源提示:预取(Resource Hints: prefetch)**

`<link rel=prefetch />` 告诉浏览器获取下一次导航可能需要的资源。大多数情况下，这意味着将以极低的优先级来获取资源（因为浏览器知道当前页面中需要的所有内容比我们认为在下一页中需要的资源更重要）。这意味着 prefetch 的主要用处是加快下一个导航的速度，而不是当前的导航。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-html"><code class=" language-html">&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>prefetch&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>//example.com/next-page.html&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">as&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>document&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">crossorigin&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>use-credentials&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>prefetch&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>/library.js&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">as&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>script&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

prefetch 有 3 条规则：

  * 用户代理在获取资源后不会做预处理，也不会在当前页面使用这个资源。
  * as 属性是一个可选属性，符合 [[PRELOAD][55]] 中的定义。
  * crossorigin CORS 设置属性是一个可选属性，指示指定资源的 CORS 策略。
  * **4、资源提示:预渲染(Resource Hints: prerender)**

给浏览器提供提示，以便在后台呈现指定的页面，如果用户导航到页面，则会加快页面加载速度。用于获取下一个可能的 HTML 导航，并通过获取必要的子资源并执行它们来预处理 HTML 响应（即预呈现页面）。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-html"><code class=" language-html">&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>prerender&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>//example.com/next-page.html&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

如果 HTML 不需要预处理，则可以使用 prefetch 资源提示。<a name="C8SZU"></a>

### Preload &#8211; 加载性能 {#11}

许多应用程序需要细粒度地控制何时获取、处理和应用资源到文档。例如，应用程序可能会延迟某些资源的加载和处理，以减少资源争用并提高初始加载的性能。此行为通常通过将资源获取移动到应用程序的自定义资源加载逻辑中来实现，即当满足特定条件时，资源获取通过注入的元素或通过 XMLHttpRequest 启动。

但是，也有一些情况需要尽早获取一些资源，但它们的处理和执行逻辑取决于特定的要求，例如依赖关系管理、条件加载、排序保证等。

此规范定义了可与 link 元素一起使用的 preload 资源提示，可以告诉用户代理预读取资源而不必执行它们，允许将资源加载与执行分离，细粒度控制资源何时和如何加载。

  * [Preload][55]  Candidate Recommendation

例如，应用程序可以使用 preload 关键字启动 CSS 资源的早期、高优先级和非呈现阻塞获取，然后应用程序可以在适当的时间应用这些获取：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-html"><code class=" language-html">Using markup
&lt;span class="token comment" spellcheck="true">&lt;!-- preload stylesheet resource via declarative markup --&gt;&lt;/span>
&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>link&lt;/span> &lt;span class="token attr-name">rel&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>preload&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">href&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>/styles/other.css&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">as&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>style&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>

&lt;span class="token comment" spellcheck="true">&lt;!-- or, preload stylesheet resource via JavaScript --&gt;&lt;/span>
&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>script&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token script language-javascript">
&lt;span class="token keyword">var&lt;/span> res &lt;span class="token operator">=&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">createElement&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"link"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
res&lt;span class="token punctuation">.&lt;/span>rel &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"preload"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
res&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">as&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"style"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
res&lt;span class="token punctuation">.&lt;/span>href &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"styles/other.css"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
document&lt;span class="token punctuation">.&lt;/span>head&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">appendChild&lt;/span>&lt;span class="token punctuation">(&lt;/span>res&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;/span>&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>script&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>

Using HTTP Header
Link: &lt;https://example.com/other/styles.css&gt;; rel=preload; as=style
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

如上例所示，可以通过声明性标记、Link HTTP头（[[RFC5988][56]]）或通过 JavaScript 调度资源。有关如何和在何处使用 preload 的更多实际例子，请参见用例部分。

**注意：preload 与 prefetch 的关系**

prefetch 和 preload 都可以声明一个资源及其获取属性，但在用户代理**获取资源的方式和时间上有所不同**：prefetch 是可选的，通常是用于后续导航可能使用的资源的低优先级获取；preload 是当前导航所必需的资源的强制获取。开发人员应该合理使用它们来最小化资源争用和优化加载性能。

另外，在 preload 中 **as 属性**对于保证正确的优先级、请求匹配、请求对应正确的内容安全策略（[Content-Security-Policy][57] ）指令以及基于资源类型发送正确的 Accept 首部是必需的。

更多可以参考： [Preload: What Is It Good For?][58] by Yoav Weiss<a name="ZfCIX"></a>

### Page Visibility &#8211; 节省资源 {#12}

此规范提供了观察页面可见性状态的 API ，例如当用户最小化窗口或切换到另一个选项卡时，API 会发送[visibilitychange][59] 事件，让监听者知道页面状态已更改，我们可以检测事件并执行某些操作。

例如网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片；显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。

因此，**页面可见性 API** 对于**节省资源**和**提高性能**特别有用，它使页面在文档不可见时避免执行不必要的任务。

此规范目前有两个版本，Level 2 在 Proposed Recommendation 阶段将会替代  Second Edition 这个版本。

  * [Page Visibility (Second Edition)][60] （REC）
  * [Page Visibility Level 2][61] （PR） &#x2714;︎

Level 2 规范包含以下内容：

  * **1、定义了页面状态的枚举：VisibilityState**

这个枚举对象我们是用不到的，而是浏览器用的。

  * **2、给 **[**Document**][62]** 对象添加了三个属性** 
      * hidden
      * visibilityState
      * onvisibilitychange 事件

我们可以通过 document.hidden 和 document.visibilityState 访问页面可见状态。

> 出于历史原因，保留对 hidden 属性的支持。开发人员应尽可能使用 visibilityState，document.visibilityState 返回的值在 VisibilityState 枚举中定义。

可通过 visibilitychange 事件监听页面可见状态是否有改变，如果有改变通过 document.visibilityState 获取页面改变后的状态。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">var&lt;/span> videoElement &lt;span class="token operator">=&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"videoElement"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment" spellcheck="true">// Autoplay the video if application is visible&lt;/span>
&lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>document&lt;span class="token punctuation">.&lt;/span>visibilityState &lt;span class="token operator">==&lt;/span> &lt;span class="token string">"visible"&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  videoElement&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">play&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment" spellcheck="true">// Handle page visibility change events&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">handleVisibilityChange&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>document&lt;span class="token punctuation">.&lt;/span>visibilityState &lt;span class="token operator">==&lt;/span> &lt;span class="token string">"hidden"&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    videoElement&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">pause&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    videoElement&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">play&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">addEventListener&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'visibilitychange'&lt;/span>&lt;span class="token punctuation">,&lt;/span> handleVisibilityChange&lt;span class="token punctuation">,&lt;/span> &lt;span class="token boolean">false&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

但是这个规范各大浏览器厂商的实现方式不一样，存在兼容性问题，在实现时需要做兼容，具体兼容方式可在 [Page Visibility API | MDN][63] 查看。<a name="Z5Zpq"></a>

### requestIdleCallback API &#8211; 充分利用资源 {#13}

此规范定义了后台任务协同调度 API，提供了由用户代理决定在空闲时间自动执行队列任务的能力，在 [Background Tasks API | MDN][64] 中有详细介绍。

  * [Cooperative Scheduling of Background Tasks][65]  （PR） &#x2714;︎

规范名称为 Cooperative Scheduling of Background Tasks， 而不是 requestIdleCallback。

此规范包含以下内容：

  * **1、给 **[**Window**][66]** 接口增加了新的方法** 
      *  requestIdleCallback()
      *  cancelIdleCallback()

我们可以使用 requestIdleCallback() 在浏览器空闲时运行高耗时、低优先级的任务。

  * **2、定义了 IdleDeadline 对象**

可以通过规范中的这个示例来解释，requestIdleCallback 方法接收一个函数（需要在空闲时间执行的任务）refinePi， 该函数的参数 deadline 就是 IdleDeadline 类型，这个对象提供一个 [timeRemaining()][67] 函数，用于获取任务可利用的空闲时间。

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">refinePi&lt;/span>&lt;span class="token punctuation">(&lt;/span>deadline&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>deadline&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">timeRemaining&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">&gt;&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">piStep&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      pointsInside&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    pointsTotal&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  currentEstimate &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">4&lt;/span> &lt;span class="token operator">*&lt;/span> pointsInside &lt;span class="token operator">/&lt;/span> pointsTotal&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  textElement &lt;span class="token operator">=&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"piEstimate"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  textElement&lt;span class="token punctuation">.&lt;/span>innerHTML&lt;span class="token operator">=&lt;/span>&lt;span class="token string">"Pi Estimate: "&lt;/span> &lt;span class="token operator">+&lt;/span> currentEstimate&lt;span class="token punctuation">;&lt;/span>
  requestId &lt;span class="token operator">=&lt;/span> window&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">requestIdleCallback&lt;/span>&lt;span class="token punctuation">(&lt;/span>refinePi&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">start&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  requestId &lt;span class="token operator">=&lt;/span> window&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">requestIdleCallback&lt;/span>&lt;span class="token punctuation">(&lt;/span>refinePi&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

空闲回调应尽可能不超支分配到的时间，关于如何充分利用空闲回调，这里有几点建议，不过更建议您去 [Background Tasks API | MDN][64] 查看详细内容。

  * 对非高优先级的任务使用空闲回调。
  * 空闲回调应尽可能不超支分配到的时间。
  * 避免在空闲回调中改变 DOM。
  * 避免运行时间无法预测的任务。
  * 在你需要的时候要用 timeout，但记得只在需要的时候才用。

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

### Beacon &#8211; 数据上报 {#14}

我们经常需要尝试在卸载（unload）文档之前向 Web 服务上报性能数据。过早的发送数据可能导致错过收集数据的机会。但对于开发者来说保证在文档卸载期间发送数据一直是一个困难，因为用户代理通常会**忽略**在 unload 事件处理器中产生的**异步 XMLHttpRequest**。

为了解决这个问题，通常要在 unload 或者 beforeunload 事件处理器中发起一个同步 XMLHttpRequest** **来发送数据。同步的 XMLHttpRequest 迫使用户代理延迟卸载文档，使得下一个导航出现的更晚，而下一个页面对于这种较差的载入表现无能为力。

此规范给 navigator 添加了一种方法，使用 navigator.sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。

  * [Beacon][68] （CR）

用法如下：

<div class="highlight">
  <div class="copytoclipboard-wrapper" style="position: relative;">
    <pre class=" language-javascript"><code class=" language-javascript">window&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">addEventListener&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'unload'&lt;/span>&lt;span class="token punctuation">,&lt;/span> logData&lt;span class="token punctuation">,&lt;/span> &lt;span class="token boolean">false&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">logData&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    navigator&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">sendBeacon&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"/log"&lt;/span>&lt;span class="token punctuation">,&lt;/span> analyticsData&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
    
    <p>
      <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
    </p>
  </div>
</div>

考虑到此方法的兼容性，应该在浏览器不支持 navigator.sendBeacon 时使用其他方法发送数，例如同步的 XMLHttpRequest。

<a name="PnOh1"></a>

### Intersection Observer API {#15}

[Intersection Observer API][69]<a name="sYLRm"></a>

这个api主要来检测元素是否出现在视口内，之前做的吸顶吸底的组件主要用这个方法来实现。一般放两个元素，一个元素跟着文档流滚动，一个用来固定吸顶或吸底，当滚动使得跟着文档流的元素出现在视窗内的时候，就按照文档流展示，否则就展示吸顶或吸底。

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

 [1]: https://www.f2e123.com/fed-regain
 [2]: https://www.w3.org/webperf/
 [3]: https://www.w3.org/TR/
 [4]: http://www.w3.org/TR/html5/browsers.html#window
 [5]: https://www.w3.org/TR/hr-time-2/
 [6]: http://www.w3.org/TR/navigation-timing/
 [7]: https://www.w3.org/TR/2016/CR-performance-timeline-2-20161208/#bib-HR-TIME-2
 [8]: https://www.w3.org/TR/2013/REC-performance-timeline-20131212/
 [9]: https://www.w3.org/TR/performance-timeline-2/
 [10]: https://www.w3.org/TR/hr-time-2/#sec-performance
 [11]: https://www.w3.org/TR/timing-entrytypes-registry/
 [12]: https://www.w3.org/TR/performance-timeline/#dom-performanceentry
 [13]: https://www.w3.org/TR/performance-timeline/#dom-performanceobserver
 [14]: https://www.w3.org/TR/resource-timing-1/
 [15]: https://www.w3.org/TR/resource-timing-2/
 [16]: https://www.w3.org/TR/resource-timing-2/#sec-iana-considerations
 [17]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming
 [18]: https://www.w3.org/TR/resource-timing-2/#dfn-timing-allow-origin
 [19]: https://html.spec.whatwg.org/multipage/origin.html#same-origin
 [20]: https://www.w3.org/TR/navigation-timing-2/
 [21]: https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming
 [22]: https://www.w3.org/TR/navigation-timing/timing-overview.png
 [23]: https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation
 [24]: https://www.w3.org/TR/navigation-timing-2/#bib-performance-timeline-2
 [25]: https://www.w3.org/TR/navigation-timing-2/#bib-resource-timing-2
 [26]: https://www.w3.org/TR/navigation-timing-2/#bib-hr-time-2
 [27]: https://www.w3.org/TR/resource-hints/#prerender
 [28]: https://www.w3.org/TR/navigation-timing-2/#bib-resource-hints
 [29]: https://www.w3.org/TR/navigation-timing-2/#dom-performancenavigationtiming-redirectcount
 [30]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-nexthopprotocol
 [31]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-transfersize
 [32]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-encodedbodysize
 [33]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-decodedbodysize
 [34]: https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-secureconnectionstart
 [35]: https://www.w3.org/TR/navigation-timing-2/#sec-PerformanceNavigationTiming
 [36]: https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timeOrigin
 [37]: https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigationTiming
 [38]: http://www.w3.org/TR/2013/WD-hr-time-2-20131203/
 [39]: https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceNavigation/type
 [40]: https://www.w3.org/TR/navigation-timing-2/#sec-performance-navigation-types
 [41]: https://www.w3.org/TR/paint-timing/
 [42]: https://www.w3.org/TR/user-timing-2/
 [43]: https://www.w3.org/TR/user-timing-3/
 [44]: https://www.w3.org/TR/hr-time-2/#dfn-performance
 [45]: https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/mark
 [46]: https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/measure
 [47]: https://www.w3.org/TR/server-timing/
 [48]: https://www.w3.org/TR/server-timing/#server-timing-header-parsing-algorithm
 [49]: https://www.w3.org/TR/server-timing/#extension-to-the-performanceresourcetiming-interface
 [50]: https://www.w3.org/TR/longtasks-1/
 [51]: https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
 [52]: https://developers.google.com/web/fundamentals/performance/rail
 [53]: https://developers.google.com/web/fundamentals/performance/rail#response
 [54]: https://www.w3.org/TR/resource-hints/
 [55]: https://www.w3.org/TR/preload/
 [56]: https://tools.ietf.org/html/rfc5988
 [57]: http://www.html5rocks.com/en/tutorials/security/content-security-policy/
 [58]: https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
 [59]: https://developer.mozilla.org/zh-CN/docs/Web/Reference/Events/visibilitychange
 [60]: http://www.w3.org/TR/2013/REC-page-visibility-20131029/
 [61]: https://www.w3.org/TR/2017/PR-page-visibility-2-20171017/
 [62]: https://www.w3.org/TR/page-visibility/#dom-document
 [63]: https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API
 [64]: https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API
 [65]: https://www.w3.org/TR/requestidlecallback/
 [66]: https://developer.mozilla.org/zh-CN/docs/Web/API/Window
 [67]: https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline/timeRemaining
 [68]: https://www.w3.org/TR/beacon/
 [69]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API/Timing_element_visibility