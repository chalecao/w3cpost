---
title: “总阻塞时间”（TBT）

---
<div class="w-aside w-aside--note">
  <p>
    总阻塞时间（TBT）是衡量<a href="https://web.dev/user-centric-performance-metrics/#types-of-metrics">负载响应能力</a>的重要<a href="https://web.dev/user-centric-performance-metrics/#in-the-lab">实验室指标</a>，因为它有助于量化页面在变得可靠交互之前的非交互性的严重程度-低TBT有助于确保页面 <a href="https://web.dev/user-centric-performance-metrics/#questions">可用</a>。
  </p>
</div>

## 什么是TBT？<a class="w-headline-link" href="https://web.dev/tbt/#what-is-tbt" aria-hidden="true">＃</a> {#what-is-tbt}

“总阻塞时间”（TBT）度量标准度量了“[首屏内容渲染（FCP）”][1]和[“可交互时间”（TTI）][2]之间的总 [时间，][2] 在该[时间][2]中，主线程被阻塞足够长的时间导致阻塞输入响应。

只要存在[长][3]任务且该任务在主线程上运行超过50毫秒（ms），该主线程即被视为“阻塞”。我们说主线程“被阻止”是因为浏览器无法中断正在进行的任务。因此，如果用户_确实_在较长的任务中间与页面进行交互，则浏览器必须等待任务完成才能响应。

如果任务足够长（例如，超过50毫秒的任何时间），则用户很可能会注意到延迟，并感觉页面缓慢或过时。

给定的长任务的_阻塞时间_是其持续时间超过50毫秒。<span style="color: #ff0000;">页面的</span><span style="color: #ff0000;"><em>总阻塞时间</em>是FCP和TTI之间发生的每个长任务的<em>阻塞时间之</em>和。</span>

例如，考虑页面加载期间浏览器主线程的下图：

<p id="ekiTnZR">
  <img loading="lazy" width="1698" height="326" class="alignnone size-full wp-image-5919 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/format,webp 1698w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_58/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_154/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_147/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930e3842d2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_295/format,webp 1536w" sizes="(max-width: 1698px) 100vw, 1698px" />
</p>

上面的时间轴有五个任务，其中三个是长任务，因为它们的持续时间超过50毫秒。下图显示了每个长任务的阻塞时间：

<p id="sJZOJpi">
  <img loading="lazy" width="1662" height="282" class="alignnone size-full wp-image-5920 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/format,webp 1662w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_51/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_136/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_130/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/img_5f7930f258964.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_261/format,webp 1536w" sizes="(max-width: 1662px) 100vw, 1662px" />
</p>

因此，虽然在主线程上运行任务所花费的总时间为560毫秒，但只有345毫秒的时间被视为阻塞时间。

<table>
  <tr>
    <th>
    </th>

    <th>
      任务持续时间
    </th>
    
    <th>
      任务阻止时间
    </th>
  </tr>
  
  <tr>
    <td>
      任务一
    </td>

    <td>
      250毫秒
    </td>
    
    <td>
      200毫秒
    </td>
  </tr>
  
  <tr>
    <td>
      任务二
    </td>

    <td>
      90毫秒
    </td>
    
    <td>
      40毫秒
    </td>
  </tr>
  
  <tr>
    <td>
      任务三
    </td>

    <td>
      35毫秒
    </td>
    
    <td>
      0毫秒
    </td>
  </tr>
  
  <tr>
    <td>
      任务四
    </td>

    <td>
      30毫秒
    </td>
    
    <td>
      0毫秒
    </td>
  </tr>
  
  <tr>
    <td>
      任务五
    </td>

    <td>
      155毫秒
    </td>
    
    <td>
      105毫秒
    </td>
  </tr>
  
  <tr>
    <td colspan="2">
      <strong>总封锁时间</strong>
    </td>

    <td>
      <strong>345毫秒</strong>
    </td>
  </tr>
</table>

### TBT与TTI有何关系？<a class="w-headline-link" href="https://web.dev/tbt/#how-does-tbt-relate-to-tti" aria-hidden="true">＃</a> {#how-does-tbt-relate-to-tti}

TBT是TTI的一个很好的辅助指标，因为它有助于量化页面在变为可靠交互之前的非交互阻塞程度。

如果主线程至少有五秒钟没有执行长任务，则TTI认为页面“可靠地交互”。这意味着，在10秒内分布的三个51毫秒任务可以将TTI推迟到单个10秒长的任务，但是对于试图与页面进行交互的用户而言，这两种情况会感觉非常不同。

在第一种情况下，三个51毫秒的任务的TBT为**3毫秒**。而单个10秒长的任务的TBT为**9950 ms**。在第二种情况下，较大的TBT值量化了较差的体验。

## 如何衡量TBT <a class="w-headline-link" href="https://web.dev/tbt/#how-to-measure-tbt" aria-hidden="true">＃</a> {#how-to-measure-tbt}

TBT是应该[在实验室中][4]测量的指标。衡量TBT的最佳方法是在您的站点上运行Lighthouse性能审核。有关用法的详细信息，请参见[TBT上][5]的[Lighthouse文档][5]。

也可以通过监听longtask，在tti之前计算tbt时间。参考[打造企业级私有前端监控体系][6]课程中有介绍。

### 实验室工具<a class="w-headline-link" href="https://web.dev/tbt/#lab-tools" aria-hidden="true">＃</a> {#lab-tools}

* [Chrome DevTools][7]
* [灯塔][8]
* [WebPageTest][9]

<div class="w-aside w-aside--note">
  <p>
    尽管可以在现场测量TBT，但不建议这样做，因为用户交互会以导致大量差异的方式影响页面的TBT。要了解该页面在现场的交互性，您应该测量“<a href="https://web.dev/fid/">首次输入延迟”（FID）</a>。
  </p>
</div>

## 良好的TBT分数是多少？<a class="w-headline-link" href="https://web.dev/tbt/#what-is-a-good-tbt-score" aria-hidden="true">＃</a> {#what-is-a-good-tbt-score}

为了提供<span style="color: #ff0000;">良好的用户体验</span>，在**一般的移动硬件**上进行测试时，站点应努力使<span style="color: #ff0000;">总阻止时间小于<strong>300毫秒</strong>。</span>

有关页面的TBT怎样影响您的Lighthouse性能得分的详细信息，请参阅[Lighthouse如何确定您的TBT得分][10]

## 如何提高TBT <a class="w-headline-link" href="https://web.dev/tbt/#how-to-improve-tbt" aria-hidden="true">＃</a> {#how-to-improve-tbt}

要了解如何提高特定站点的TBT，可以运行Lighthouse性能审核，并注意审核建议的任何特定 [机会][11]。

要总体了解如何提高TBT（针对任何站点），请参考以下性能指南：

* [减少第三方代码的影响][12]
* [减少JavaScript执行时间][13]
* [减少主线程工作][14]
* [保持较低的请求数量和较小的传输量][15]

## 关联课程

* [打造企业级私有前端监控体系][6]
* [高性能极致用户体验前端开发实战][16]

 [1]: https://web.dev/fcp/
 [2]: https://web.dev/tti/
 [3]: https://web.dev/custom-metrics/#long-tasks-api
 [4]: https://web.dev/user-centric-performance-metrics/#in-the-lab
 [5]: https://web.dev/lighthouse-total-blocking-time
 [6]: https://www.f2e123.com/fed-regain/5744.html
 [7]: https://developers.google.com/web/tools/chrome-devtools/
 [8]: https://developers.google.com/web/tools/lighthouse/
 [9]: https://www.webpagetest.org/
 [10]: https://web.dev/lighthouse-total-blocking-time/#how-lighthouse-determines-your-tbt-score
 [11]: https://web.dev/lighthouse-performance/#opportunities
 [12]: https://web.dev/third-party-summary/
 [13]: https://web.dev/bootup-time/
 [14]: https://web.dev/mainthread-work-breakdown/
 [15]: https://web.dev/resource-summary/
 [16]: https://www.f2e123.com/fed-regain/2390.html
