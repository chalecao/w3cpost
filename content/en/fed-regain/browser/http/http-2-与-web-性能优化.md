---
title: HTTP/2 与 WEB 性能优化

---
Google 宣布在 16 年初放弃对 SPDY 的支持，随后 Google 自家支持 SPDY 协议的服务都切到了 HTTP/2。2015年 5 月 14 日，HTTP/2 以 [RFC 7540][1] 正式发布。目前，[浏览器](https://www.w3cdoc.com)方面，Chrome 40+ 和 Firefox 36+ 都正式支持了 HTTP/2；服务器方面，著名的 Nginx 表示会在今年底正式支持 HTTP/2。

不得不说这几年 WEB 技术一直在突飞猛进，爆炸式发展。昨天还觉得 HTTP/2 很遥远，今天已经遍地都是了。对于新鲜事物，有些人不愿意接受，觉得好端端为什么又要折腾；有些人会盲目崇拜，认为它是能拯救一切的救世主。HTTP/2 究竟会给[前端](https://www.w3cdoc.com)带来什么，什么都不是？还是像某些人说的「让[前端](https://www.w3cdoc.com)那些优化小伎俩直接退休」？我打算通过写一系列文章来尝试回答这个问题，今天是第一篇。

### 提出问题 {#toc-0}

[我们](https://www.w3cdoc.com)知道，一个页面通常由一个 HTML 文档和多个资源组成。有一些很重要的资源，例如头部的 CSS、关键的 JS，如果迟迟没有加载完，会阻塞页面渲染或导致用户无法交互，体验很差。如何让重要的资源更快加载完是我本文要讨论的问题。

### HTTP/1 {#toc-1}

#### 分析 {#toc-1-0}

[我们](https://www.w3cdoc.com)先来考虑资源外链的情况。通常，外链资源都会部署在 CDN 上，这样用户就可以从离自己最近的节点上获取数据。一般文本文件都会采用 gzip 压缩，实际传输大小是文件大小的几分之一。服务端托管静态资源的效率通常非常高，服务端处理时间几乎可以忽略。在忽略网络因素、传输大小以及服务端处理时间之后，用户何时能加载完外链资源，很大程度上取决于请求何时能发出去，这主要受下面三个因素影响：

* [浏览器](https://www.w3cdoc.com)阻塞（Stalled）：[浏览器](https://www.w3cdoc.com)会因为一些原因阻塞请求。例如在 rfc2616 中规定[浏览器](https://www.w3cdoc.com)对于一个域名，同时只能有 2 个连接（HTTP/1.1 的修订版中去掉了这个限制，详见 [rfc7230][2]，因为后来[浏览器](https://www.w3cdoc.com)实际上都放宽了限制），超过[浏览器](https://www.w3cdoc.com)最大连接数限制，后续请求就会被阻塞。再例如现代[浏览器](https://www.w3cdoc.com)在加载同一域名多个 HTTPS 资源时，会有意等第一个 TLS 连接建立完成再请求其他资源；
* DNS 查询（DNS Lookup）：[浏览器](https://www.w3cdoc.com)需要知道目标服务器的 IP 才能建立连接。将域名解析为 IP 的这个系统就是 DNS。DNS 查询结果通常会被缓存一段时间，但第一次访问或者缓存失效时，还是可能耗费几十到几百毫秒；
* 建立连接（Initial Connection）：HTTP 是基于 TCP 协议的，[浏览器](https://www.w3cdoc.com)最快也要在第三次握手时才能捎带 HTTP 请求报文。这个过程通常也要耗费几百毫秒；

当然[我们](https://www.w3cdoc.com)一般都会给静态资源设置一个很长时间的缓存头。只要用户不清除[浏览器](https://www.w3cdoc.com)缓存也不刷新，第二次访问[我们](https://www.w3cdoc.com)网页时，静态资源会直接从本地缓存获取，并不产生网络请求；如果用户只是普通刷新而不是强刷，[浏览器](https://www.w3cdoc.com)会在请求头带上协商字段 `If-Modified-Since` 或 `If-None-Match`，服务端对没有变化的资源会响应 304 状态码，告知[浏览器](https://www.w3cdoc.com)从本地缓存获取资源。304 请求没有正文，非常小。

也就是说资源外链的特点是，第一次慢，第二次快。

再来看看资源内联的情况。把 CSS、JS 文件内容直接内联在 HTML 中的方案，毫无疑问会在用户第一次访问时有速度优势。但通常[我们](https://www.w3cdoc.com)很少缓存 HTML 页面，这种方案会导致内联的资源没办法利用[浏览器](https://www.w3cdoc.com)缓存，后续每次访问都是一种浪费。

#### 解决 {#toc-1-1}

很早之前，就有网站开始针对第一次访问的用户将资源内联，并在页面加载完之后异步加载这些资源的外链版本，同时记录一个 Cookie 标记表示用户来过。用户再次访问这个页面时，服务端就可以输出只有外链版本的页面，减小体积。

这个方案除了有点浪费流量之外（一份资源，内联外链加载了两次），基本上能达到更快加载重要资源的效果。但是在流量更加宝贵的移动端，[我们](https://www.w3cdoc.com)需要继续改进这个方案。

考虑到移动端[浏览器](https://www.w3cdoc.com)都支持 localStorage，可以将第一次内联引入的资源缓存起来后续使用。缓存更新机制可以通过在 Cookie 中存放版本号来实现。这样，服务端收到请求后，首先要检查 Cookie 头中的版本标记：

* 如果标记不存在或者版本不匹配，就将资源内联输出，并提供当前版本标记。页面执行时，会把内联资源存入 localStorage，并将资源版本标记存入 Cookie；
* 如果标记匹配，就输出 JavaScript 片段，用来从 localStorage 读取并使用资源；

由于 Cookie 内容需要尽可能的少，所以一般只存总的版本号。这会导致页面任何一处资源变动，都会改变总版本号，进而忽略客户端所有 localStorage 缓存。要解决这个问题可以继续改进[我们](https://www.w3cdoc.com)的方案：Cookie 中只存放用户唯一标识，用户和资源对应关系存在服务端。服务端收到请求后根据用户标识，计算出哪些资源需要更新，从而输出更有针对性的 HTML 文档。

这套方案要投入实际使用，要处理一系列异常情况，例如 JS / Cookie / localStorage 被禁用；localStorage 被写满；localStorage 内容损坏或丢失等等。考虑成本和实际收益，推荐只在移动项目中使用这种方案。

### HTTP/2 {#toc-2}

对于 HTTP/2 来说，要解决前面这个问题简直就太容易了，开启「Server Push」即可。HTTP/2 的多路复用特性，使得可以在一个连接上同时打开多个流，双向传输数据。Server Push，意味着服务端可以在发送页面 HTML 时主动推送其它资源，而不用等到[浏览器](https://www.w3cdoc.com)解析到相应位置，发起请求再响应。另外，服务端主动推送的资源不是被内联在页面里，它们有自己独立的 URL，可以被[浏览器](https://www.w3cdoc.com)缓存，当然也可以给其他页面使用。

服务端可以主动推送，客户端也有权利选择接收与否。如果服务端推送的资源已经被[浏览器](https://www.w3cdoc.com)缓存过，[浏览器](https://www.w3cdoc.com)可以通过发送 `RST_STREAM` 帧来拒收。

可以看到，HTTP/2 的 Server Push 能够很好地解决「如何让重要资源尽快加载」这个问题，一旦普及开来，可以取代前面介绍过的 HTTP/1 时代优化方案。

[我们](https://www.w3cdoc.com)知道，HTTP/2 并没有改动 HTTP/1 的语义部分，例如请求方法、响应状态码、URI 以及头部字段等核心概念依旧存在。HTTP/2 最大的变化是重新定义了格式化和传输数据的方式，这是通过在高层 HTTP API 和低层 TCP 连接之间引入二进制分帧层来实现的。这样带来的好处是原来的 WEB 应用完全不用修改，就能享受到协议升级带来的收益。

### HTTP/2 的连接 {#toc-0}

HTTP/1 的请求和响应报文，都是由起始行、首部和实体正文（可选）组成，各部分之间以文本换行符分隔。而 HTTP/2 将请求和响应数据分割为更小的帧，并对它们采用二进制编码。下面这幅图中的 Binary Framing 就是新增的二进制分帧层：


  <img loading="lazy" width="800" height="412" class="alignnone size-full wp-image-5594 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae8f9afd6f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae8f9afd6f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae8f9afd6f.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae8f9afd6f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_155/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae8f9afd6f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_396/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />

先来看看这几个概念：

* **帧（Frame）**：HTTP/2 数据通信的最小单位。帧用来承载特定类型的数据，如 HTTP 首部、负荷；或者用来实现特定功能，例如打开、关闭流。每个帧都包含帧首部，其中会标识出当前帧所属的流；
* **消息（Message）**：指 HTTP/2 中逻辑上的 HTTP 消息。例如请求和响应等，消息由一个或多个帧组成；
* **流（Stream）**：存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数 ID；
* **连接（Connection）**：与 HTTP/1 相同，都是指对应的 TCP 连接；

在 HTTP/2 中，同域名下所有通信都在单个连接上完成，这个连接可以承载任意数量的双向数据流。每个数据流都以消息的形式发送，而消息又由一个或多个帧组成。多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装。下面有一幅图说明帧、消息、流和连接的关系：


  <img loading="lazy" width="800" height="452" class="alignnone size-full wp-image-5595 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae91cc9e92.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae91cc9e92.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae91cc9e92.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae91cc9e92.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_170/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e3ae91cc9e92.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_434/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />

TCP

TCP 协议本身更适合用来长时间传输大数据，这样它的稳定和可靠性才能显露出来。HTTP/1 时代太多短而小的 TCP 连接，反而更多地将 TCP 的缺点给暴露出来了。

### HTTP/1 的连接 {#toc-1}

在 HTTP/1 中，每一个请求和响应都要占用一个 TCP 连接，尽管有 Keep-Alive 机制可以复用，但在每个连接上同时只能有一个请求 / 响应，这意味着完成响应之前，这个连接不能用于其他请求（怎么判断响应是否结束，可以[看这里][3]）。如果[浏览器](https://www.w3cdoc.com)需要向同一个域名发送多个请求，需要在本地维护一个 FIFO 队列，完成一个再发送下一个。这样，从服务端完成请求开始回传，到收到下一个请求之间的这段时间，服务端处于空闲状态。

后来，人们提出了 HTTP 管道（HTTP Pipelining）的概念，试图把本地的 FIFO 队列挪到服务端。它的原理是这样的：[浏览器](https://www.w3cdoc.com)一股脑把请求都发给服务端，然后等着就可以了。这样服务端就可以在处理完一个请求后，马上处理下一个，不会有空闲了。甚至服务端还可以利用多线程并行处理多个请求。可惜，因为 HTTP/1 不支持多路复用，这个方案有几个棘手的问题：

* 服务端收到多个管道请求后，需要按接收顺序逐个响应。如果恰好第一个请求特别慢，后续所有响应都会跟着被阻塞。这种情况通常被称之为「队首阻塞（Head-of-Line Blocking）」；
* 服务端为了保证按顺序回传，通常需要缓存多个响应，从而占用更多的服务端资源，也更容易被人攻击；
* [浏览器](https://www.w3cdoc.com)连续发送多个请求后，等待响应这段时间内如果遇上网络异常导致连接被断开，无法得知服务端处理情况，如果全部重试可能会造成服务端重复处理；
* 另外，服务端和[浏览器](https://www.w3cdoc.com)之间的中间代理设备也不一定支持 HTTP 管道，这给管道技术的普及引入了更多复杂性；

基于这些原因，HTTP 管道技术无法大规模使用，[我们](https://www.w3cdoc.com)需要寻找其他方案。实际上，在 HTTP/1 时代，连接数优化不外乎两个方面：**开源**和**节流**。

#### 开源 {#toc-1-0}

这里说的开源，当然不是「Open Source」那个开源。既然一个 TCP 连接同时只能处理一个 HTTP 消息，那多开几条 TCP 连接不就解决这个问题了。是的，[浏览器](https://www.w3cdoc.com)确实是这么做的，HTTP/1.1 初始版本中允许[浏览器](https://www.w3cdoc.com)针对同一个域名同时创建两个连接，在修订版（[rfc7230][2]）中更是去掉了这个限制。实际上，现代[浏览器](https://www.w3cdoc.com)一般允许同域名并发 6~8 个连接。这个数字为什么不能更大呢？实际上这是出于公平性的考虑，每个连接对于服务端来说都会带来一定开销，如果[浏览器](https://www.w3cdoc.com)不加以限制，一个性能好带宽足的终端就可能耗尽服务端所有资源，造成其他人无法使用。

但是，现在包含几十个 CSS、JSS，几百张图片的页面大有所在。为了进一步榨干[浏览器](https://www.w3cdoc.com)，开更多的源，往往[我们](https://www.w3cdoc.com)还会对静态资源做域名散列，将页面静态资源分散在多个子域下加载。多域名能提高并发连接数，也会带来很多问题，例如：

* 如果同一资源在不同页面被散列到不同子域下，会导致无法利用之前的 HTTP 缓存；
* 每个域名的第一个连接都要经历 DNS 解析的过程，这在移动端可能需要耗费几百毫秒；
* 更多的并发连接 + Keep-Alive 机制，会显著增加服务端和客户端的负担；

> 这里稍微吐槽下：本地 TCP 连接和本地端口也是一种资源，为了做 WEB 性能优化，开更多的域名让[浏览器](https://www.w3cdoc.com)创建更多的并发连接，是很霸道和不公平的做法。

另外，HTTP/1 协议头部使用纯文本格式，没有任何压缩，且包含很多冗余信息（例如 Cookie、UserAgent 每次都会携带），所以一个页面的请求数越多，头部带来的额外开销就越大。[我们](https://www.w3cdoc.com)一般会用短小且独立的域名来托管静态资源，就是为了减小这个开销（域名越短请求头起始行的 URI 就越短，独立域名不会共享主域的 Cookie，可以有效减小请求头大小，这个策略一般称之为 Cookie-Free Domain）。

#### 节流 {#toc-1-1}

由于[我们](https://www.w3cdoc.com)不能无限制开源，所以节流也很重要。除了砍掉页面内容，第二次访问时利用 HTTP 缓存之外，通常能做的就只有合并请求了。根据合并的内容不同，一般又分为以下几种：

* 异步接口合并（Batch Ajax Request）；
* 图片合并，雪碧图（CSS Sprite）；
* CSS、JS 合并（Concatenation）；
* CSS、JS 内联（Inline）；
* 图片、音频内联（Data URI）；

上面这份列表并不完整，我也没打算列全，这些就足以说明 HTTP/1 时代[我们](https://www.w3cdoc.com)在性能上所做过的不懈努力了。可惜，他们并不完美，分别列举一下他们的缺点：

**异步接口合并**：批量接口返回的时间受木桶效应影响，最慢的那个接口拖累了其他接口。

**图片合并**：首先，为了显示一张小图，而不得不加载合并后的整张大图，一是可能浪费流量；二是占用更多内存。其次，合并图片中任何一处修改，都会导致整张大图缓存失效。这些问题可以根据不同场景，选用 Data URI、Icon Font、SVG 等技术来改造。另外，雪碧图的生成和维护都比较繁琐，最好使用工具自动管理。

**CSS、JS 合并**：合并后的资源需要整体加载完才开始解析、执行。原本加载完一个文件就可以解析并执行一个，将很多个文件合并成一个巨无霸，会整体推后可用时间。为此，Chrome 新版引入了 [Script Streaming][4] 技术，能边加载边解析 JS 文件。Gmail 为了解决这个问题，将多个 JS 文件合并为一个由多个 inline script 片段组成的 html，用 iframe 引入，以达到边加载变解析执行的效果。另外，与图片合并类似，CSS、JS 合并也会遇到「无论多小的改动，都会导致整个合并文件缓存失效」的问题。

**CSS、JS 内联**：上篇文章我详细分析过内联的优点和弊端。主要两个问题：1）无法利用缓存；2）多页面无法共享。

**图片、音频内联**：除了也有上面两个问题之外，二进制文件以 Data URI 方式内联，需要进行 Base64 编码，体积会变大 1/3。

### 结论 {#toc-2}

HTTP/1 时代，[我们](https://www.w3cdoc.com)为了节省昂贵的 HTTP 连接（TCP 连接），采用了各种优化手段，这些方案或多或少会引入一些问题，但是相比收益来说还是值得做，也应该做。但是，有了 HTTP/2 的多路复用和头部压缩，HTTP 连接变得可以随心所欲了，本文提到的这些连接数优化手段确实可以退休了。

哦对了，据官方预测，HTTP/1 至少还需要 10 年才能彻底退出历史舞台，另外尽管 HTTP/2 协议允许脱离 TLS 部署，但 Chrome 和 Firefox 都表示不支持非 TLS 的 HTTP/2，之后很可能一个网站会同时提供 HTTP/1.1、HTTP/1.1 over TLS、HTTP/2 over TLS 三种服务。如何在每种情况下，都能给用户提供最好的体验，需要更加深入的优化研究和更加精细的优化策略。由此可见，在很长一段时间内，WEB 性能优化非但不会落幕，反而会更加重要。

### 备注 {#toc-3}

本文两幅插图均来自 Ilya Grigorik 编写的《[High Performance Browser Networking][5]》的第十二章。这本书我个人比较推荐，英文版可以免费在线阅读。中文版叫《[WEB 性能权威指南][6]》，由李松峰老师翻译。最近这本书的原作者又把第十二章单独拿出来出了一本名为《[HTTP/2: A New Excerpt from High Performance Browser Networking][7]》的电子书，同样免费，只对 HTTP/2 有兴趣的同学看这个就可以了。

除了前面提到的这些需要为 HTTP/2 做出调整的优化策略之外，其余大部分 HTTP/1 时期的优化策略依然有效。HTTP/1 的 WPO 并不是什么新鲜话题，[大家](https://www.w3cdoc.com)早就熟门熟路了，本文只打算列举其中几个：

### 启用压缩 {#toc-0}

压缩的目的是让传输的数据变得更小。[我们](https://www.w3cdoc.com)的线上代码（JS、CSS 和 HTML）都会做压缩，图片也会做压缩（PNGOUT、Pngcrush、JpegOptim、Gifsicle 等）。对于文本文件，在服务端发送响应之前进行 GZip 压缩也很重要，通常压缩后的文本大小会减小到原来的 1/4 - 1/3。对代码进行内容压缩已经有成熟的工具和标准流程了，而服务端的 GZip 更是标配，所以「压缩」是一项收益投入比很高的优化手段。

### 使用 HTTP 缓存 {#toc-1}

任何一个 WEB 项目，要提高性能，各个环节的缓存必不可少。利用好 HTTP 协议的缓存机制，可以大幅减少传输数据，减少请求，这又是一项收益投入比超高的优化手段。这里把之前我写的 HTTP/1.1 缓存机制介绍翻出来：

首先，服务端可以通过响应头里的 `Last-Modified`（最后修改时间） 或者 `ETag`（内容特征） 标记实体。[浏览器](https://www.w3cdoc.com)会存下这些标记，并在下次请求时带上 `If-Modified-Since: 上次 Last-Modified 的内容` 或 `If-None-Match: 上次 ETag 的内容`，询问服务端资源是否过期。如果服务端发现并没有过期，直接返回一个状态码为 304、正文为空的响应，告知[浏览器](https://www.w3cdoc.com)使用本地缓存；如果资源有更新，服务端返回状态码 200、新的 Last-Modified、Etag 和正文。这个过程被称之为 HTTP 的协商缓存，通常也叫做弱缓存。

可以看到协商缓存并不会节省连接数，但是在缓存生效时，会大幅减小传输内容（304 响应没有正文，一般只有几百字节）。另外为什么有两个响应头都可以用来实现协商缓存呢？这是因为一开始用的 `Last-Modified` 有两个问题：1）只能精确到秒，1 秒内的多次变化反映不出来；2）在轮询的负载均衡算法中，如果各机器读到的文件修改时间不一致，有缓存无故失效和缓存不更新的风险。HTTP/1.1 并没有规定 `ETag` 的生成规则，而一般实现者都是对资源内容做摘要，能解决前面两个问题。

另外一种缓存机制是服务端通过响应头告诉[浏览器](https://www.w3cdoc.com)，在什么时间之前（Expires）或在多长时间之内（Cache-Control: Max-age=xxx），不要再请求服务器了。这个机制[我们](https://www.w3cdoc.com)通常称之为 HTTP 的强缓存。

一旦资源命中强缓存规则后，再次访问完全没有 HTTP 请求（Chrome 开发者工具的 Network 面板依然会显示请求，但是会注明 from cache；Firefox 的 firebug 也类似，会注明 BFCache），这会大幅提升性能。所以[我们](https://www.w3cdoc.com)一般会对 CSS、JS、图片等资源使用强缓存，而入口文件（HTML）一般使用协商缓存或不缓存，这样可以通过修改入口文件中对强缓存资源的引入 URL 来达到即时更新的目的。

这里也解释下为什么有了 `Expire`，还要有 `Cache-Control`。也有两个原因：1）Cache-Control 功能更强大，对缓存的控制能力更强；2）Cache-Control 采用的 max-age 是相对时间，不受服务端 / 客户端时间不对的影响。

另外关于[浏览器](https://www.w3cdoc.com)的刷新（F5 / cmd + r）和强刷（Ctrl + F5 / shift + cmd +r）：普通刷新会使用协商缓存，忽略强缓存；强刷会忽略[浏览器](https://www.w3cdoc.com)所有缓存（并且请求头会携带 Cache-Control:no-cache 和 Pragma:no-cache，用来通知所有中间节点忽略缓存）。只有从地址栏或收藏夹输入网址、点击链接等情况下，[浏览器](https://www.w3cdoc.com)才会使用强缓存。

### 减少 DNS 查询 {#toc-2}

[我们](https://www.w3cdoc.com)知道，建立 TCP 连接需要知道目标 IP，而绝大部分时候给[浏览器](https://www.w3cdoc.com)的是域名。[浏览器](https://www.w3cdoc.com)需要先将域名解析为 IP，这个过程就是 DNS 查询，一般需要几毫秒到几百毫秒，移动环境下会更慢。DNS 解析完成之前，请求会被 Block。[浏览器](https://www.w3cdoc.com)一般都会缓存 DNS 查询结果，页面使用的域名（包括子域名）越少，花费在 DNS 查询上的开销就越小。另外，合理使用[浏览器](https://www.w3cdoc.com)的 DNS Prefetching 技术，也是很好的做法。

### 减少重定向 {#toc-3}

无论是通过服务端响应头产生的重定向，还是通过 `<meta>` 或者 JS 产生的重定向，都可能引入新的 DNS 查询、新的 TCP 连接以及新的 HTTP 请求，所以减少重定向也很重要。[浏览器](https://www.w3cdoc.com)基本都会缓存通过 `301 Moved Permanently` 指定的跳转，所以对于永久性跳转，可以考虑使用状态码 `301`。对于启用了 HTTPS 的网站，配置 [HSTS][8] 策略，也可以减少从 HTTP 到 HTTPS 的重定向。

WEB 性能优化是一个系统工程，不可能在这一篇文章里写完，我决定先就写到这儿。最后，推荐一个 Chrome 扩展：[HTTP/2 and SPDY indicator][9]，它可以在地址栏显示当前网站是否启用了 SPDY 或者 HTTP/2，点击图标可以直接打开 Chrome 的 HTTP/2 的调试界面，十分方便。

 [1]: http://tools.ietf.org/html/rfc7540
 [2]: http://tools.ietf.org/html/rfc7230#page-80
 [3]: https://imququ.com/post/transfer-encoding-header-in-http.html
 [4]: http://blog.chromium.org/2015/03/new-javascript-techniques-for-rapid.html
 [5]: http://chimera.labs.oreilly.com/books/1230000000545/index.html
 [6]: http://www.ituring.com.cn/book/1194
 [7]: http://shop.oreilly.com/product/0636920042587.do
 [8]: https://imququ.com/post/web-security-and-response-header.html#toc-0
 [9]: https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin
