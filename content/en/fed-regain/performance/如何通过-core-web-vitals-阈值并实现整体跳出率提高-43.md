---
title: 如何通过 Core Web Vitals 阈值并实现整体跳出率降低 43%



---
## 衡量影响[#][1]{.w-headline-link} {#measuring-the-impact}

我们专注于[最大内容绘制 (LCP)][2]和[累积布局转换 (CLS)][3]，因为它们在为我们的用户提供出色的阅读体验方面最为重要。在实施了如下所述的各种性能修复后，经济时报设法在几个月内显着改善了 Chrome 用户体验 (CrUX) 报告指标。

**总体而言，CLS**从 0.25**提高**到 0.09 **，提高**了 250%。**总体而言，LCP**从 4.5 秒提高到 2.5 秒**，提高**了 80%。

此外，从 2020 年 10 月到 2021 年 7 月，“差”范围内的 LCP 值降低了 33%：<figure>

<p id="cDGwSth">
  <img loading="lazy" class="alignnone wp-image-6873 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/format,webp" alt="" width="682" height="407" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_179/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_477/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_458/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9961d2bee3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_916/format,webp 1536w" sizes="(max-width: 682px) 100vw, 682px" />
</p></figure>

此外，在同一时间范围内，“差”范围内的 CLS 值降低了 65%，而“良好”范围内的 CLS 值增加了 20%：<figure>

<p id="TdEwoWJ">
  <img loading="lazy" class="alignnone wp-image-6874 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/format,webp" alt="" width="618" height="358" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_174/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_463/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_444/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9962b046c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_889/format,webp 1536w" sizes="(max-width: 618px) 100vw, 618px" />
</p></figure>

结果是，之前未达到 CWV 阈值的《经济时报》现在在其整个来源都通过了 CWV 阈值，并且**总体跳出率降低了 43%**。

## 什么是 LCP，我们如何改进它？[#][4]{.w-headline-link} {#what-is-lcp-and-how-did-we-improve-it}

最大的元素是与改善用户体验和识别加载速度最相关的元素。[First Contentful Paint (FCP)][5]等性能指标仅捕获页面加载的初始体验。另一方面，LCP 报告用户可见的最大图像、文本或视频部分的渲染时间。

除了切换到更快的 DNS 提供商和优化图像之外，这里还有一些我们应用的用于改进 LCP 的技术。

### 关键请求优先[#][6]{.w-headline-link} {#critical-requests-first}

由于所有现代浏览器都会限制并发请求数，因此开发人员需要优先加载关键内容。要加载复杂的网页，我们需要下载诸如页眉元素、CSS、JavaScript 资源、主图、文章正文、评论、其他相关新闻、页脚和广告等资产。我们评估了 LCP 所需的元素，并提供了首先加载这些项目以改进 LCP 的偏好。我们还推迟了不属于初始页面呈现的调用。

### 文字外观[#][7]{.w-headline-link} {#text-appearance}

我们对该<a href="https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display" rel="noopener"><code>font-display</code>属性</a>进行了试验，因为这会影响 LCP 和 CLS。我们尝试了`font-display: auto;`，然后切换到`font-display: swap;`. 这最初会以最佳匹配和可用字体呈现文本，然后在下载后切换到该字体。这导致我们的文本渲染速度很快，与网络速度无关。

### 更好的压缩[#][8]{.w-headline-link} {#better-compression}

<a href="http://github.com/google/brotli/" rel="noopener">Brotli</a>是 Google 开发的 Gzip 和 Deflate 的替代压缩算法。我们替换了字体和资产，并将服务器压缩从 Gzip 更改为 Brotli，以实现更小的占用空间：

* Javascript 文件比 Gzip 小 15%。
* HTML 文件比 Gzip 小 18%。
* CSS 和字体文件比 Gzip 小 17%。

### 预连接到第三方域[#][9]{.w-headline-link} {#preconnect-to-third-party-domains}

[`preconnect`][10] 应该谨慎使用，因为它仍然会占用宝贵的 CPU 时间，并延迟其他重要资源，尤其是在安全连接上。

但是，如果知道会发生对第三方域上的资源的提取，那就`preconnect`很好了。如果它只是偶尔在高流量网站上发生，`preconnect`可能会触发不必要的 TCP 和 TLS 工作。因此[`dns-prefetch`][11]，更适合第三方资源（例如社交媒体、分析等）提前执行 DNS 查找。

### 将代码分成块[#][12]{.w-headline-link} {#break-up-code-into-chunks}

在网站的头脑中，我们只加载那些包含业务逻辑的重要部分或对首屏页面呈现<a href="https://github.com/addyosmani/critical" rel="noopener">至关重要</a>的资源。此外，我们使用<a href="https://loadable-components.com/docs/code-splitting/" rel="noopener">代码拆分将代码拆分</a>成块。这有助于我们进一步改进页面 LCP。

### 更好的缓存[#][13]{.w-headline-link} {#better-caching}

对于所有前端路由，我们添加了一个<a href="https://en.wikipedia.org/wiki/Redis" rel="noopener">Redis</a>层，该层从缓存中提供模板。这减少了服务器上的计算时间并在每个请求中构建整个 UI，从而降低后续请求中的 LCP。

### 总结 LCP 目标和成就[#][14]{.w-headline-link} {#summarizing-lcp-goals-and-achievements}

在开始优化项目之前，该团队将他们的 LCP 分数基准为**4.5 秒**（对于 75% 的用户，基于 CrUX 报告字段数据）。优化项目后，缩短为**2.5 秒**。<figure class="w-caption"><figcaption>

<p id="XTUFfCa">
  <img loading="lazy" class="alignnone wp-image-6875 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/format,webp" alt="" width="529" height="394" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_224/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_596/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_572/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964090523.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1144/format,webp 1536w" sizes="(max-width: 529px) 100vw, 529px" />
</p>

资料来源：经济时报整体LCP的CrUX报告</figcaption></figure>

## 什么是 CLS，我们如何改进它？[#][15]{.w-headline-link} {#what-is-cls-and-how-did-we-improve-it}

您在浏览网站时是否注意到页面内容的任何意外移动？造成这种情况的原因之一是在页面上异步加载未知尺寸的媒体（图像、视频、广告等）。一旦媒体资源加载，它们就会改变页面的布局。

<div class="w-aside w-aside--note">
  <p>
    有关 CLS 的更多信息，请阅读<a href="https://web.dev/cls/">CLS 指标页面</a>。
  </p>
</div>

我们将在经济时报网站上介绍我们为改进 CLS 所采取的措施。

### 使用占位符[#][16]{.w-headline-link} {#use-placeholders}

我们为已知尺寸的广告单元和媒体元素使用了样式化的占位符，以避免在广告库加载和呈现页面广告时发生布局变化。这可以确保通过为广告保留空间来消除布局变化。<figure>

<p id="jQrnkJo">
  <img loading="lazy" class="alignnone wp-image-6876 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/format,webp" alt="" width="493" height="399" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_243/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_742,h_600/format,webp 742w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_621/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1242/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9964d48d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_320,h_260/format,webp 320w" sizes="(max-width: 493px) 100vw, 493px" />
</p></figure>

### 定义的容器尺寸[#][17]{.w-headline-link} {#defined-container-dimensions}

我们为所有图像和容器指定了明确的尺寸，这样浏览器引擎就不需要在 DOM 元素可用时计算它们的宽度和高度。这避免了不必要的布局变化和额外的绘画工作。

### 总结 CLS 的目标和成就[#][18]{.w-headline-link} {#summarizing-cls-goals-and-achievements}

在开始优化项目之前，该团队将他们的 CLS 分数基准为**0.25**。我们能够将其显着降低**90%**至**0.09**。<figure>

<p id="KwXqpzS">
  <img loading="lazy" class="alignnone wp-image-6877 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/format,webp" alt="" width="534" height="123" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/format,webp 1388w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_69/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_184/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9965bc8feb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_177/format,webp 768w" sizes="(max-width: 534px) 100vw, 534px" />
</p></figure>

## 什么是首次输入延迟 (FID)，我们如何改进它？[#][19]{.w-headline-link} {#what-is-first-input-delay-(fid)-and-how-did-we-improve-it}

[首次输入延迟][20]是跟踪网站对用户输入响应的指标。FID 得分低的主要原因是 JavaScript 工作量大，使浏览器的主线程保持忙碌，这可能会延迟用户交互。我们以多种方式改进了 FID。

### 分解较长的 JavaScript 任务[#][21]{.w-headline-link} {#break-up-long-javascript-tasks}

长任务是 50 毫秒或更长的任务。长任务占用浏览器的主线程并阻止它响应用户输入。我们尽可能根据用户请求将长时间运行的任务分解为更小的任务，这有​​助于减少 Javascript 的臃肿。<figure>

<p id="nQComhL">
  <img loading="lazy" class="alignnone wp-image-6878 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/format,webp" alt="" width="481" height="302" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/format,webp 1600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_188/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_502/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_481/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d99663d5997.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_963/format,webp 1536w" sizes="(max-width: 481px) 100vw, 481px" />
</p></figure>

### 推迟未使用的 JavaScript [#][22]{.w-headline-link} {#defer-unused-javascript}

我们将页面内容优先于第三方脚本（例如分析），以使页面更具响应性。但是，某些库存在一定的限制，因为它们需要加载到文档`<head>`中才能准确跟踪用户旅程。

### 减少 polyfill [#][23]{.w-headline-link} {#reduce-polyfills}

我们减少了对某些 polyfill 和库的依赖，因为浏览器提供了对现代 API 的支持，并且使用旧版浏览器（例如 Internet Explorer）的用户减少了。

### 延迟加载广告[#][24]{.w-headline-link} {#lazy-load-ads}

延迟加载首屏广告有助于减少主线程阻塞时间，从而改善 FID。

### 总结 FID 目标和成就[#][25]{.w-headline-link} {#summarizing-fid-goals-and-achievements}

通过常规实验，我们能够将 FID 从 200 ms 减少到今天的 50 ms 以下。<figure>

<p id="QBldNzI">
  <img loading="lazy" class="alignnone wp-image-6879 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/format,webp" alt="" width="458" height="121" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_79/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_211/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/01/img_61d9966dade44.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_203/format,webp 768w" sizes="(max-width: 458px) 100vw, 458px" />
</p></figure>

## 防止回归[#][26]{.w-headline-link} {#preventing-regressions}

经济时报计划在生产中引入自动化性能检查，以避免页面性能回归。他们计划评估 Lighthouse-CI 以自动化实验室测试，这可以防止其生产分支的回归。

 [1]: https://web.dev/economic-times-cwv/#measuring-the-impact
 [2]: https://web.dev/lcp/
 [3]: https://web.dev/cls/
 [4]: https://web.dev/economic-times-cwv/#what-is-lcp-and-how-did-we-improve-it
 [5]: https://web.dev/fcp/
 [6]: https://web.dev/economic-times-cwv/#critical-requests-first
 [7]: https://web.dev/economic-times-cwv/#text-appearance
 [8]: https://web.dev/economic-times-cwv/#better-compression
 [9]: https://web.dev/economic-times-cwv/#preconnect-to-third-party-domains
 [10]: https://web.dev/preconnect-and-dns-prefetch/#establish-early-connections-with-relpreconnect
 [11]: https://web.dev/preconnect-and-dns-prefetch/#resolve-domain-name-early-with-reldns-prefetch
 [12]: https://web.dev/economic-times-cwv/#break-up-code-into-chunks
 [13]: https://web.dev/economic-times-cwv/#better-caching
 [14]: https://web.dev/economic-times-cwv/#summarizing-lcp-goals-and-achievements
 [15]: https://web.dev/economic-times-cwv/#what-is-cls-and-how-did-we-improve-it
 [16]: https://web.dev/economic-times-cwv/#use-placeholders
 [17]: https://web.dev/economic-times-cwv/#defined-container-dimensions
 [18]: https://web.dev/economic-times-cwv/#summarizing-cls-goals-and-achievements
 [19]: https://web.dev/economic-times-cwv/#what-is-first-input-delay-(fid)-and-how-did-we-improve-it
 [20]: https://web.dev/fid/
 [21]: https://web.dev/economic-times-cwv/#break-up-long-javascript-tasks
 [22]: https://web.dev/economic-times-cwv/#defer-unused-javascript
 [23]: https://web.dev/economic-times-cwv/#reduce-polyfills
 [24]: https://web.dev/economic-times-cwv/#lazy-load-ads
 [25]: https://web.dev/economic-times-cwv/#summarizing-fid-goals-and-achievements
 [26]: https://web.dev/economic-times-cwv/#preventing-regressions
