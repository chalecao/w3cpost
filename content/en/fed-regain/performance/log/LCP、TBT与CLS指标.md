---
title: LCP、TBT与CLS指标

---
<div id="article_content" class="article_content clearfix">
  <div id="content_views" class="markdown_views prism-atom-one-dark">
    <div class="toc">
      
        <code style="font-size: 18px; font-weight: bold;">FP (First Paint) 首次绘制</code>
      
    </div>

    
      <code>FP (First Paint) 首次绘制</code>: 标记[浏览器](https://www.w3cdoc.com)渲染任何在视觉上不同于导航前屏幕内容之内容的时间点.
    
    
    ##     <a name="t2"></a><a name="t2"></a><a id="FCP_First_Contentful_Paint___13"></a><code>FCP (First Contentful Paint) 首次内容绘制</code>
    

    
    
      <code>FCP (First Contentful Paint) 首次内容绘制</code> 标记[浏览器](https://www.w3cdoc.com)渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、SVG 甚至 元素.
    
    
    ##     <a name="t3"></a><a name="t3"></a><a id="LCP_Largest_Contentful_Paint__16"></a><code>LCP (Largest Contentful Paint)</code> 最大内容渲染
    

    
    
      <code>LCP (Largest Contentful Paint) 最大内容渲染</code>: 代表在viewport中最大的页面元素加载的时间. LCP的数据会通过PerformanceEntry对象记录, 每次出现更大的内容渲染, 则会产生一个新的PerformanceEntry对象.(2019年11月新增)
    
    
    
      提议：<a href="https://wicg.github.io/largest-contentful-paint/">https://wicg.github.io/largest-contentful-paint/</a>
    
    
    
      说明：<a href="https://web.dev/lcp/">https://web.dev/lcp/</a>
    
    
    ##     <a name="t4"></a><a name="t4"></a><a id="DCL_DomContentloaded__19"></a><code>DCL (DomContentloaded)</code>
    

    
    
      <code>DCL (DomContentloaded)</code>: 当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载.
    
    
    ##     <a name="t5"></a><a name="t5"></a><a id="FMPFirst_Meaningful_Paint__22"></a><code>FMP(First Meaningful Paint) 首次有效绘制</code>
    

    
    
      <code>FMP(First Meaningful Paint) 首次有效绘制</code>: 例如，在 YouTube 观看页面上，主视频就是主角元素. 看这个csdn的网站不是很明显, 这几个都成一个时间线了, 截个weibo的看下. 下面的示例图可以看到, 微博的博文是主要元素.
    
    
    
      chrome FMP计算方法：<a href="https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#">https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#</a>
    
    
    <ul>
      
        主要通过统计页面布局对象个数和结合字体和页面高度的元启发算法实现。
      
    
    
    
      <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/2020020918594233.png.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/2020020918594233.png.png?x-oss-process=image/format,webp" alt="在这里插入图片描述" />
    
    
    ##     <a name="t6"></a><a name="t6"></a><a id="L_onLoad_25"></a><code>L (onLoad)</code>
    

    
    
      <code>L (onLoad)</code>, 当依赖的资源, 全部加载完毕之后才会触发.
    
    
    
      &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;分割线&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-
    
    
    
      再来说几个, 这个performance panel上没画的名词, 但用的上的:
    
    
    ##     <a name="t7"></a><a name="t7"></a><a id="TTI__Time_to_Interactive___34"></a><code>TTI (Time to Interactive) 可交互时间</code>
    

    
    
      <code>TTI (Time to Interactive) 可交互时间</code>: 指标用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点.
    
    
    ##     <a name="t8"></a><a name="t8"></a><a id="TBT_Total_Blocking_Time__37"></a><code>TBT (Total Blocking Time) 页面阻塞总时长</code>
    

    
    
      <code>TBT (Total Blocking Time) 页面阻塞总时长</code>: TBT汇总所有加载过程中阻塞用户操作的时长，在FCP和TTI之间任何long task中阻塞部分都会被汇总.<br /> 来个例子说明一下:<br /> <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209194247137.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209194247137.png?x-oss-process=image/format,webp" alt="在这里插入图片描述" /><br /> <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/2020020919425964.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/2020020919425964.png?x-oss-process=image/format,webp" alt="在这里插入图片描述" /><br /> 在主线程上运行任务所花费的总时间为560毫秒，但只有345(200 + 40 + 105)毫秒的时间被视为阻塞时间(超过50ms的Task都会被记录).
    
    
    ##     <a name="t9"></a><a name="t9"></a><a id="FID_First_Input_Delay__44"></a><code>FID (First Input Delay) 首次输入延迟</code>
    

    
    
      <code>FID (First Input Delay) 首次输入延迟</code>: 指标衡量的是从用户首次与您的网站进行交互（即当他们单击链接，点击按钮等）到[浏览器](https://www.w3cdoc.com)实际能够访问之间的时间, 下面来张图来解释FID和TTI的区别:<br /> <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209204416573.png.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209204416573.png.png?x-oss-process=image/format,webp" alt="在这里插入图片描述" />
    
    
    ##     <a name="t10"></a><a name="t10"></a><a id="CLS_Cumulative_Layout_Shift__48"></a><code>CLS (Cumulative Layout Shift) 累积布局偏移</code>
    

    
    
      <code>CLS (Cumulative Layout Shift) 累积布局偏移</code>: 总结起来就是一个元素初始时和其hidden之间的任何时间如果元素偏移了, 则会被计算进去, 具体的计算方法可看这篇文章 <a href="https://web.dev/cls/" rel="nofollow">https://web.dev/cls/</a>
    
    
    
      <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209205034735.png.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/20200209205034735.png.png?x-oss-process=image/format,webp" alt="在这里插入图片描述" />
    
    
    ##     <a name="t11"></a><a name="t11"></a><a id="SI_Speed_Index_54"></a><code>SI (Speed Index)</code>
    

    
    
      <code>SI (Speed Index)</code>: 指标用于显示页面可见部分的显示速度, 单位是时间, 由 Google 在 <a href="https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index">webpagetest.org</a> 中提出。<br />定义 <br /> 这是一个表示页面可视区域中内容的填充速度的指标，可以通过计算页面可见区域内容显示的平均时间来衡量。
    
    
    
     测量方式
    
    
    
      首先在[浏览器](https://www.w3cdoc.com)中捕获页面加载的视频，然后对每 100 毫秒间隔的页面截图计算页面填充的百分比，可以得到这样一个曲线（纵轴是页面可视区域内容填充完成度，横轴是时间）。<br /> <img src="https://cdn.nlark.com/yuque/0/2020/png/84793/1587819627733-30dc9e60-5eca-4988-bbf2-a3e752c69b57.png#align=left&#038;display=inline&#038;height=369&#038;margin=%5Bobject%20Object%5D&#038;name=image.png&#038;originHeight=737&#038;originWidth=1004&#038;size=82123&#038;status=done&#038;style=none&#038;width=502" alt="image.png" />
    
    
    
      <img src="https://www.f2e123.com/wp-content/plugins/image-elevator/assets/admin/img/circle-preloader.gif" alt="" data-type="preloader" />
    
    
    
      本图来自：<a href="https://www.dynatrace.com/support/doc/synthetic/shortlink/id-visually-complete-and-speed-index-metrics">Visually Complete and Speed Index metrics</a>
    
    
    
      图中的 Example 1 和 Example 2 都是在 10s 时页面填充完成，但 Example 1 在 2s 是就已经填充了 80% 的内容，而 Example 2 在 8s 时才填充 80%。 
    
    
    
      图中阴影部分的面积（即时间-内容填充百分比曲线以上部分）的大小即可表示可视区域内页面内容的填充速度，面积越小，填充速度越快。
    
    
    
      如果用时间来衡量，可以这样计算，以此来表示页面可见区域内容显示的平均时间。
    
    
    <div class="highlight">
      <div class="copytoclipboard-wrapper">
        <pre class="  language-javascript"><code class="  language-javascript">Example <span class="token number">1</span>：Speed Index <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">80</span><span class="token operator">%</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> （<span class="token number">20</span><span class="token operator">%</span> <span class="token operator">*</span> <span class="token number">10</span>）<span class="token operator">=</span> <span class="token number">3.6</span>
Example <span class="token number">2</span>：Speed Index <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">80</span><span class="token operator">%</span> <span class="token operator">*</span> <span class="token number">8</span><span class="token punctuation">)</span> <span class="token operator">+</span> （<span class="token number">20</span><span class="token operator">%</span> <span class="token operator">*</span> <span class="token number">10</span>）<span class="token operator">=</span> <span class="token number">8.4</span></code></pre>
      </div>
    </div>

    
      这个平均时间可以用来比较首屏内容完整呈现给用户的性能体验，但它计算的不是首屏内容完整呈现这一时刻，不能算是一个用时间来度量的指标。
    
    
    ##     参考链接:
    

    
    <ol>
      
        <a href="https://developers.google.com/web/showcase" rel="nofollow">https://developers.google.com/web/showcase</a> ( First Input Delay)
      
      
        <a href="https://web.dev/speed-index/" rel="nofollow">https://web.dev/speed-index/</a> (speed-index)
      
      
        <a href="https://web.dev/tbt/" rel="nofollow">https://web.dev/tbt/</a> (Total Blocking Time)
      
      
        <a href="https://web.dev/lcp/" rel="nofollow">https://web.dev/lcp/</a> (Largest Contentful Paint)
      
      
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event" rel="nofollow">https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event</a> ( DOMContentLoaded )
      
      
        <a href="https://web.dev/cls/" rel="nofollow">https://web.dev/cls/</a> (Cumulative Layout Shift)
      
      
        https://juejin.im/post/5dd6682e6fb9a05a7e67123b#heading-2
      
      
        https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#%E8%80%97%E6%97%B6%E8%BE%83%E9%95%BF%E7%9A%84%E4%BB%BB%E5%8A%A1
      
    </ol>
  </div>
</div>
