---
title: 关于chrome请求stalled的时间





---
最近同学反馈说页面请求偶尔很慢，打开[浏览器](https://www.w3cdoc.com)查看加载静态资源时候stalled占用了很长时间，但是只有他的电脑是这样，我这边有stalled时间，但是没有这么长：


  <img loading="lazy" width="644" height="271" class="alignnone size-full wp-image-5722 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7f73a85ff73.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7f73a85ff73.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7f73a85ff73.png?x-oss-process=image/format,webp 644w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7f73a85ff73.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_126/format,webp 300w" sizes="(max-width: 644px) 100vw, 644px" />

## stalled是什么

什么是stalled呢？下面是一段比较容易懂的解释：

> Time the request spent waiting before it could be sent. This time is inclusive of any time spent in proxy negotiation.Additionally, this time will include when the browser is waiting for an already established connection to become available for re-use, obeying Chrome’s maximum six TCP connection per origin rule.

也即是从TCP连接建立完成，到真正可以传输数据之间的时间差。先让[我们](https://www.w3cdoc.com)要分析TCP连接为什么要等待这么久才能用？我用Wireshark抓包发现(如下图)，TCP连接过程中有多次重传，直到达到最大重传次数后连接被客户端重置。<figure>

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/wireshark-error.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/wireshark-error.png?x-oss-process=image/format,webp" alt="wireshark-error" /> </figure>

为什么会发生重传呢？

> The sender waits for an ACK for the byte-range sent to the client and when not received, resends the packets, after a particular interval. After a certain number of retries, the host is considered to be “down” and the sender gives up and tears down the TCP connection.

TCP三次握手后，发送端发送数据后，一段时间内（不同的操作系统时间段不同）接收不到服务端ACK包，就会以 某一时间间隔(时间间隔一般为指数型增长)重新发送，从重传开始到接收端正确响应的时间就是stalled阶段。而重传超过一定的次数（windows系统是5次），发送端就认为本次TCP连接已经down掉了，需要重新建立连接。 对比以下，没有重传的http请求过程。如下图：<figure>

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/wireshark-normal.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/wireshark-normal.jpg?x-oss-process=image/format,webp" alt="wireshark-normal" /> </figure>

总结一下：stalled阶段时TCP连接的检测过程，如果检测成功就会继续使用该TCP连接发送数据，如果检测失败就会重新建立TCP连接。所以出现stalled阶段过长，往往是丢包所致，这也意味着网络或服务端有问题。

## 神秘的CACHE LOCK {#神秘的cache-lock}

上面提到，Stackoverflow上找到<a href="http://stackoverflow.com/questions/14821725/ajax-request-over-https-hangs-for-40-seconds-in-chrome-only" target="_blank" rel="noopener noreferrer">一个问题</a>，跟现在需要解决一有些类似点：

* 偶发，并不是必然出现的。这里[我们](https://www.w3cdoc.com)的问题也是偶发，很难复现，需要反复刷。
* 也是请求被<code class="highlighter-rouge">Pending</code>了很久，从请求的时间线来看，体现在<code class="highlighter-rouge">Stalled</code>上。

该提问到没有给出什么建设性的意见，但它后面的追加编辑却给出了答案。过程是查看Chrome的网络日志，在事件里面发现有一个超时错误：

> t=33627 [st= 5] HTTP\_CACHE\_ADD\_TO\_ENTRY [dt=20001] –> net\_error = -409 (ERR\_CACHE\_LOCK\_TIMEOUT)

耗时20秒之久！而且写得非常明显是<code class="highlighter-rouge">ERR_CACHE_LOCK_TIMEOUT</code>。根据提问者贴出来的链接，了解到Chrome有一个缓存锁的机制。

具体源于一个今年6月分实现的一个<a href="https://codereview.chromium.org/345643003" target="_blank" rel="noopener noreferrer">补丁</a>，加入了这么个机制，而这个机制的引入又源于2010年的一个issue。具体信息可以通过这个<a href="https://code.google.com/p/chromium/issues/detail?id=46104" target="_blank" rel="noopener noreferrer">这里</a>查看，下面引用如下。

> Basically here is the situation:

> The site author has a long-lived XHR being used to stream a slow response from the server. This XHR response is cachable (it is just really slow). They kick off the XHR asynchronously, and as data slowly arrives on it, update the progressive load of the webpage. Cool.

> Now what happens if you try to load this page in multiple tabs of Chrome is: The first page starts to load just fine, but the second one does nothing. What has happened, is the background XHR of the first page load has acquired an exclusive lock to the cache entry, and the background XHR of the second page is stalled at “Waiting for cache…” trying to get a reader access to the cache entry.

> Since the first request can takes minutes, this is a problem.

<a href="mailto:eroman@chromium.org" target="_blank" rel="noopener noreferrer">eroman</a> 同学指出了这么一个事实：

[浏览器](https://www.w3cdoc.com)对一个资源发起请求前，会先检查本地缓存，此时这个请求对该资源对应的缓存的读写是独占的。那么问题来了，试想一下，当我新开一个标签尝试访问同一个资源的时候，这次请求也会去读取这个缓存，假设之前那次请求很慢，耗时很久，那么后来这次请求因为无法获取对该缓存的操作权限就一直处于等待状态。这样很不科学。于是有人建议优化一下。也就是上面所描述的那样。

随着问题的提出，还出了两种可能的实现方案。

> (a) [Flexible but complicated] Allow cache readers WHILE writing is in progress. This way the first request could still have exclusive access to the cache entry, but the second request could be streamed the results as they get written to the cache entry. The end result is the second page load would mirror the progress of the first one.

> (a) [Naive but simpler] Have a timeout on how long we will block readers waiting for a cache entry before giving up and bypassing the cache.

我猜上面第二个<code class="highlighter-rouge">(a)</code>应该是<code class="highlighter-rouge">(b)</code>。简单说第一种优化方案更加复杂但科学。之前的请求对缓存仍然是独占的，但随着前一次请求不断对缓存进行更新，可以把已经更新的部分拿给后面的请求读取，这样就不会完全阻塞后面的请求了。

第二种方案则更加简单暴力。给后来的请求设定一个读取缓存超时的时限，如果超过了这个时限，我认为缓存不可用或者本地没有缓存，忽略这一步直接发请求。

于是Chromium的开发者们选择了后者简单的实现。也就是<a href="https://codereview.chromium.org/345643003" target="_blank" rel="noopener noreferrer">Issue 345643003: Http cache: Implement a timeout for the cache lock</a> 这个提交里的实现。

这个提交的描述如下：

> The cache has a single writer / multiple reader lock to avoid downloading the same resource n times. However, it is possible to block many tabs on the same resource, for instance behind an auth dialog.

> This CL implements a 20 seconds timeout so that the scenario described in the bug results in multiple authentication dialogs (one per blocked tab) so the user can know what to do. It will also help with other cases when the single writer blocks for a long time.

> The timeout is somewhat arbitrary but it should allow medium size resources to be downloaded before starting another request for the same item. The general solution of detecting progress and allow readers to start before the writer finishes should be implemented on another CL.

于是就产生了上面题主遇到的情况。

所以他的解决方法就很明朗了，对请求加个时间戳让其变得唯一，或者服务器响应头设置为无缓存。Both will work!

那么[我们](https://www.w3cdoc.com)的问题也会是这样的么？我幻想由于某种未知的原因造成之前的请求不正常（虽然网络面板里没有数据证明这样的阻塞请求在问题请求之前存在），然后[我们](https://www.w3cdoc.com)的MIS里打开页面时读取不到缓存，卡了，一会儿缓存好了，正常了，于是在等待了几十秒后请求成功发出去了。

似乎不太可能。因为恰好系统的响应头里已经加了缓存控制了 <code class="highlighter-rouge">Cache-Control: no-cache</code>。（没有测过no-store）

以下是一次问题请求的响应头：

<div class="language-text highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>HTTP/1.1 200 OK

Content-Type: application/json; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Pragma: no-cache
Cache-Control: no-cache
tracecode: 28410188240979065866123119
tracecode: 28410188240506537994123119
Server: Apache

</code></pre>
  </div>
</div>

并且开多个标签也是无法进行有效重现的。

因此可以排除缓存的干扰。那么似乎这里的缓存锁并不是导致问题的原因，只能另寻他路。不得不说，高兴过后有点失望。

## chrome的修复记录

可喜的是，在细细口味了上面缓存机制引入的过程后，真是耐人寻味。这里不妨八卦一下。相信你也注意到了，上面提到，该<a href="https://code.google.com/p/chromium/issues/detail?id=46104" target="_blank" rel="noopener noreferrer">缓存问题</a>的提出是在2010年，确切地说是<code class="highlighter-rouge">Jun 8, 2010</code>。是的，2010年6月8日由<a href="mailto:eroman@chromium.org" target="_blank" rel="noopener noreferrer">eroman</a> 同学提出。但最后针对该问题进行修复的代码<a href="https://src.chromium.org/viewvc/chrome?revision=279326&view=revision" target="_blank" rel="noopener noreferrer">提交</a>却是在今年6月份，2014年6月24日，提交时间摆在那里我会乱说？

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/cache-fix-commit.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/cache-fix-commit.jpg?x-oss-process=image/format,webp" alt="" />

于是好奇为什么会拖了这么久，遂跟了一下该问题下面的回复看看发生了什么。简直惊呆了。

* 同月14号，有了首次对这个问题的回复，那是将该问题指派给了<a href="mailto:rvargas@chromium.org" target="_blank" rel="noopener noreferrer">rvargas</a>同学。
* 一个月过去了，也就是7月15号，<a href="mailto:rvargas@chromium.org" target="_blank" rel="noopener noreferrer">rvargas</a>同学指出了与该问题关联的另外一个issue「<a href="https://code.google.com/p/chromium/issues/detail?id=6697" target="_blank" rel="noopener noreferrer">issue 6697</a>」
* 接下来是8月5日，<a href="mailto:rvargas@chromium.org" target="_blank" rel="noopener noreferrer">rvargas</a>同学为该问题贴上了标签<code class="highlighter-rouge">-Mstone-7 Mstone-8 </code>，表明将会在里程碑7或者8里面进行修复。但在后面的10月7日，这个日程又被推到了<code class="highlighter-rouge">-Mstone-8 Mstone-9 </code>。
* 再接下来11月5日，有人表示以目前的速度及bug数量，还没有时间来修复它，重点在处理优先级为<code class="highlighter-rouge">p1</code>的问题上。于是此问题又成功被顺延了，来到<code class="highlighter-rouge">-mstone-9 Mstone-10 </code>，同时优级降为<code class="highlighter-rouge">p2</code>。Chromium人手也不够啊，看来。
* 时间来到12月9日，因为优先级为<code class="highlighter-rouge">p2</code>的issue如果没有被标为开始状态的话又自动推到下一个里程碑了，于是顺利来到 <code class="highlighter-rouge">-Mstone-10 MovedFrom-10 Mstone-11 </code>。次年2月来到<code class="highlighter-rouge">-Mstone-11 Mstone-12 </code>。完成了一次跨年！

…………

* 上面省略N步。如此反复，最后一次被推到了<code class="highlighter-rouge">-Mstone-16 </code>，那是在2011年10月12日。
* 时间一晃来到2013年，这一年很平静，前面的几个月都没有人对此问题进行回复。直到11月27日，有人看不下去了，评论道：

> This bug has been pushed to the next mstone forever…and is blocking more bugs (e.g https://code.google.com/p/chromium/issues/detail?id=31014)and use-cases same video in 2 tags on one page, and adaptive bit rate html5 video streaming whenever that will kick in. Any chance this will be prioritized?

由于这个bug的无限后延也阻塞了另外一些同类问题，看来是时候解决了。这不，最初的owner 当天就进行了回复：

> ecently there was someone looking at giving it another try… I’d have to see if there was any progress there.

> If not, I may try to fix it in Q1.

最后一句亮瞎。敢情这之前owner就没有想过要去真正解决似的，因为有其他人在看这个问题了，所以就没管了，如果Q1还没人解决的话，我会出手的！嗯，就是这个意思。

…………

最后，也就是上文提到的，2014年6月，还是<a href="mailto:rvargas@chromium.org" target="_blank" rel="noopener noreferrer">rvargas</a>同学对这个问题进行了修复，实现了对缓存读取20秒超时的控制。

该问题就是这样从2010来到2014的。我怀疑Chrome是如何成为版本帝的。

## 再次重现 {#再次重现}

这次受到上面的启发，开启<code class="highlighter-rouge">chrome://net-internals/#events</code>页面来捕获事件日志。看是否有错误或异常发生。

再次经过旷日持久的机械操作，重现了！这次，日志在手，天下我有。感觉Bug不会存活多久了。

Chrome Dev Tools 网络面板截图： <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timeline-screen-capture2.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timeline-screen-capture2.jpg?x-oss-process=image/format,webp" alt="" />

由上面的截图看到，本次出问题的请求总耗时42.74秒。

问题请求的时间线信息截图： <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timeline-screen-capture.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timeline-screen-capture.jpg?x-oss-process=image/format,webp" alt="" />

可以预见，通过捕获的日志完全可以看到<code class="highlighter-rouge">Stalled</code>那么久都发生了些什么鬼。

话不多说，切换到事件捕获页面，定位到出问题的请求，查看其详情。同时将该日志导出，永久保存！作为纪念，也方便以后再次导入查看。有兴趣的同学可以访问下方下载后进行导入，就可以清晰地查看到现场了，就好像你亲历了整个犯罪现场一样。

### 日志还原 {#日志还原}

* <a href="https://gist.githubusercontent.com/wayou/39772215d075c80d643a/raw/9c91463f22016d20c90de19e77ae3e4f302e0769/gistfile1.txt" target="_blank" rel="noopener noreferrer">下载该日志文件</a>
* 在Chrome新开一个标签输入<code class="highlighter-rouge">chrome://net-internals/#events</code>
* 切换到<code class="highlighter-rouge">Import</code>，选择刚才下载的JSON文件进行导入
* 切换到<code class="highlighter-rouge">Events</code>，定位到<code class="highlighter-rouge">http://qa.tieba.baidu.com/release/getReleaseHistory?projectId=fum1.0.593</code> 这个请求

此刻右边出现的便是该问题请求的详细日志。

### 日志解读 {#日志解读}

下面不妨把日志文件贴出来先：

<div class="language-text highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>193486: URL_REQUEST
http://qa.tieba.baidu.com/release/getReleaseHistory?projectId=fum1.0.593
Start Time: 2015-01-02 17:51:05.323

t=    1 [st=    0] +REQUEST_ALIVE  [dt=42741]
t=    1 [st=    0]    URL_REQUEST_DELEGATE  [dt=0]
t=    1 [st=    0]   +URL_REQUEST_START_JOB  [dt=42740]
                      --> load_flags = 339804160 (BYPASS_DATA_REDUCTION_PROXY | MAYBE_USER_GESTURE | REPORT_RAW_HEADERS | VERIFY_EV_CERT)
                      --> method = "GET"
                      --> priority = "LOW"
                      --> url = "http://qa.tieba.baidu.com/release/getReleaseHistory?projectId=fum1.0.593"
t=    2 [st=    1]      URL_REQUEST_DELEGATE  [dt=0]
t=    2 [st=    1]      HTTP_CACHE_GET_BACKEND  [dt=0]
t=    2 [st=    1]      HTTP_CACHE_OPEN_ENTRY  [dt=0]
t=    2 [st=    1]      HTTP_CACHE_ADD_TO_ENTRY  [dt=0]
t=    2 [st=    1]      HTTP_CACHE_READ_INFO  [dt=0]
t=    2 [st=    1]      URL_REQUEST_DELEGATE  [dt=0]
t=    2 [st=    1]     +HTTP_STREAM_REQUEST  [dt=2]
t=    4 [st=    3]        HTTP_STREAM_REQUEST_BOUND_TO_JOB
                          --> source_dependency = 193488 (HTTP_STREAM_JOB)
t=    4 [st=    3]     -HTTP_STREAM_REQUEST
t=    4 [st=    3]     +HTTP_TRANSACTION_SEND_REQUEST  [dt=0]
t=    4 [st=    3]        HTTP_TRANSACTION_SEND_REQUEST_HEADERS
                          --> GET /release/getReleaseHistory?projectId=fum1.0.593 HTTP/1.1
                              Host: qa.tieba.baidu.com
                              Connection: keep-alive
                              Accept: application/json, text/plain, */*
                              User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
                              Referer: http://qa.tieba.baidu.com/project/
                              Accept-Encoding: gzip, deflate, sdch
                              Accept-Language: en-US,en;q=0.8
                              Cookie: [268 bytes were stripped]
t=    4 [st=    3]     -HTTP_TRANSACTION_SEND_REQUEST
t=    4 [st=    3]     +HTTP_TRANSACTION_READ_HEADERS  [dt=21301]
t=    4 [st=    3]        HTTP_STREAM_PARSER_READ_HEADERS  [dt=21301]
                          --> net_error = -101 (ERR_CONNECTION_RESET)
t=21305 [st=21304]        HTTP_TRANSACTION_RESTART_AFTER_ERROR
                          --> net_error = -101 (ERR_CONNECTION_RESET)
t=21305 [st=21304]     -HTTP_TRANSACTION_READ_HEADERS
t=21305 [st=21304]     +HTTP_STREAM_REQUEST  [dt=3]
t=21307 [st=21306]        HTTP_STREAM_REQUEST_BOUND_TO_JOB
                          --> source_dependency = 193494 (HTTP_STREAM_JOB)
t=21308 [st=21307]     -HTTP_STREAM_REQUEST
t=21308 [st=21307]     +HTTP_TRANSACTION_SEND_REQUEST  [dt=3]
t=21308 [st=21307]        HTTP_TRANSACTION_SEND_REQUEST_HEADERS
                          --> GET /release/getReleaseHistory?projectId=fum1.0.593 HTTP/1.1
                              Host: qa.tieba.baidu.com
                              Connection: keep-alive
                              Accept: application/json, text/plain, */*
                              User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
                              Referer: http://qa.tieba.baidu.com/project/
                              Accept-Encoding: gzip, deflate, sdch
                              Accept-Language: en-US,en;q=0.8
                              Cookie: [268 bytes were stripped]
t=21311 [st=21310]     -HTTP_TRANSACTION_SEND_REQUEST
t=21311 [st=21310]     +HTTP_TRANSACTION_READ_HEADERS  [dt=21304]
t=21311 [st=21310]        HTTP_STREAM_PARSER_READ_HEADERS  [dt=21304]
                          --> net_error = -101 (ERR_CONNECTION_RESET)
t=42615 [st=42614]        HTTP_TRANSACTION_RESTART_AFTER_ERROR
                          --> net_error = -101 (ERR_CONNECTION_RESET)
t=42615 [st=42614]     -HTTP_TRANSACTION_READ_HEADERS
t=42615 [st=42614]     +HTTP_STREAM_REQUEST  [dt=12]
t=42627 [st=42626]        HTTP_STREAM_REQUEST_BOUND_TO_JOB
                          --> source_dependency = 193498 (HTTP_STREAM_JOB)
t=42627 [st=42626]     -HTTP_STREAM_REQUEST
t=42627 [st=42626]     +HTTP_TRANSACTION_SEND_REQUEST  [dt=2]
t=42627 [st=42626]        HTTP_TRANSACTION_SEND_REQUEST_HEADERS
                          --> GET /release/getReleaseHistory?projectId=fum1.0.593 HTTP/1.1
                              Host: qa.tieba.baidu.com
                              Connection: keep-alive
                              Accept: application/json, text/plain, */*
                              User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
                              Referer: http://qa.tieba.baidu.com/project/
                              Accept-Encoding: gzip, deflate, sdch
                              Accept-Language: en-US,en;q=0.8
                              Cookie: [268 bytes were stripped]
t=42629 [st=42628]     -HTTP_TRANSACTION_SEND_REQUEST
t=42629 [st=42628]     +HTTP_TRANSACTION_READ_HEADERS  [dt=112]
t=42629 [st=42628]        HTTP_STREAM_PARSER_READ_HEADERS  [dt=112]
t=42741 [st=42740]        HTTP_TRANSACTION_READ_RESPONSE_HEADERS
                          --> HTTP/1.1 200 OK
                              
                              Content-Type: application/json; charset=UTF-8
                              Transfer-Encoding: chunked
                              Connection: keep-alive
                              Cache-Control: no-cache
                              tracecode: 31079600320335034634010217
                              tracecode: 31079600320537995786010217
                              Server: Apache
t=42741 [st=42740]     -HTTP_TRANSACTION_READ_HEADERS
t=42741 [st=42740]      HTTP_CACHE_WRITE_INFO  [dt=0]
t=42741 [st=42740]      HTTP_CACHE_WRITE_DATA  [dt=0]
t=42741 [st=42740]      HTTP_CACHE_WRITE_INFO  [dt=0]
t=42741 [st=42740]      URL_REQUEST_DELEGATE  [dt=0]
t=42741 [st=42740]   -URL_REQUEST_START_JOB
t=42741 [st=42740]    URL_REQUEST_DELEGATE  [dt=0]
t=42741 [st=42740]    HTTP_TRANSACTION_READ_BODY  [dt=0]
t=42741 [st=42740]    HTTP_CACHE_WRITE_DATA  [dt=0]
t=42741 [st=42740]    HTTP_TRANSACTION_READ_BODY  [dt=0]
t=42741 [st=42740]    HTTP_CACHE_WRITE_DATA  [dt=0]
t=42742 [st=42741] -REQUEST_ALIVE
</code></pre>
  </div>
</div>

首先，日志显示的总耗时与上面网络面板截图的总耗时是吻合的，都是42.74秒，说明[我们](https://www.w3cdoc.com)定位正确。

> 以下时间均以毫秒计

日志第一列为时间线，自请求发起时算。 第二列为每步操作所逝去的时间，时间差的概念，与第三列里面的<code class="highlighter-rouge">dt</code>不同，它会积累前面的耗时。 第三列为具体的事件，以及相应事件的耗时<code class="highlighter-rouge">dt</code>，此耗时为绝对耗时。

<code class="highlighter-rouge">+</code>号对应事件开始，<code class="highlighter-rouge">-</code>号对应事件结束，也就是说他们必然成对出现。住里是展开后更加详细的子事件。直到不能再细分。

如果说一开始接触到这个日志时手足无措的话，[我们](https://www.w3cdoc.com)来看一下正常情况下的日志是怎样的，有对比才有发现。

以下随便摘取一次正常请求的日志，如下：

<div class="language-text highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>384462: URL_REQUEST
http://qa.tieba.baidu.com/release/getReleaseHistory?projectId=fum1.0.593
Start Time: 2015-01-03 20:23:54.698

t=1556 [st=  0] +REQUEST_ALIVE  [dt=172]
t=1556 [st=  0]    URL_REQUEST_DELEGATE  [dt=0]
t=1556 [st=  0]   +URL_REQUEST_START_JOB  [dt=171]
                   --> load_flags = 335609856 (BYPASS_DATA_REDUCTION_PROXY | MAYBE_USER_GESTURE | VERIFY_EV_CERT)
                   --> method = "GET"
                   --> priority = "LOW"
                   --> url = "http://qa.tieba.baidu.com/release/getReleaseHistory?projectId=fum1.0.593"
t=1557 [st=  1]     +URL_REQUEST_DELEGATE  [dt=4]
t=1557 [st=  1]        DELEGATE_INFO  [dt=4]
                       --> delegate_info = "extension Tampermonkey"
t=1561 [st=  5]     -URL_REQUEST_DELEGATE
t=1561 [st=  5]      HTTP_CACHE_GET_BACKEND  [dt=0]
t=1561 [st=  5]      HTTP_CACHE_OPEN_ENTRY  [dt=1]
                     --> net_error = -2 (ERR_FAILED)
t=1562 [st=  6]      HTTP_CACHE_CREATE_ENTRY  [dt=0]
t=1562 [st=  6]      HTTP_CACHE_ADD_TO_ENTRY  [dt=0]
t=1562 [st=  6]      URL_REQUEST_DELEGATE  [dt=0]
t=1562 [st=  6]     +HTTP_STREAM_REQUEST  [dt=2]
t=1564 [st=  8]        HTTP_STREAM_REQUEST_BOUND_TO_JOB
                       --> source_dependency = 384467 (HTTP_STREAM_JOB)
t=1564 [st=  8]     -HTTP_STREAM_REQUEST
t=1564 [st=  8]     +HTTP_TRANSACTION_SEND_REQUEST  [dt=1]
t=1564 [st=  8]        HTTP_TRANSACTION_SEND_REQUEST_HEADERS
                       --> GET /release/getReleaseHistory?projectId=fum1.0.593 HTTP/1.1
                           Host: qa.tieba.baidu.com
                           Connection: keep-alive
                           Accept: application/json, text/plain, */*
                           User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
                           Referer: http://qa.tieba.baidu.com/project/
                           Accept-Encoding: gzip, deflate, sdch
                           Accept-Language: en-US,en;q=0.8
                           Cookie: [2642 bytes were stripped]
t=1565 [st=  9]     -HTTP_TRANSACTION_SEND_REQUEST
t=1565 [st=  9]     +HTTP_TRANSACTION_READ_HEADERS  [dt=161]
t=1565 [st=  9]        HTTP_STREAM_PARSER_READ_HEADERS  [dt=160]
t=1725 [st=169]        HTTP_TRANSACTION_READ_RESPONSE_HEADERS
                       --> HTTP/1.1 200 OK
                           
                           Content-Type: application/json; charset=UTF-8
                           Transfer-Encoding: chunked
                           Connection: keep-alive
                           Cache-Control: no-cache
                           tracecode: 14346880480340800522010320
                           tracecode: 14346880480253893130010320
                           Server: Apache
t=1726 [st=170]     -HTTP_TRANSACTION_READ_HEADERS
t=1726 [st=170]      HTTP_CACHE_WRITE_INFO  [dt=0]
t=1726 [st=170]      HTTP_CACHE_WRITE_DATA  [dt=0]
t=1726 [st=170]      HTTP_CACHE_WRITE_INFO  [dt=0]
t=1726 [st=170]     +URL_REQUEST_DELEGATE  [dt=1]
t=1726 [st=170]        DELEGATE_INFO  [dt=1]
                       --> delegate_info = "extension Tampermonkey"
t=1727 [st=171]     -URL_REQUEST_DELEGATE
t=1727 [st=171]   -URL_REQUEST_START_JOB
t=1727 [st=171]    URL_REQUEST_DELEGATE  [dt=0]
t=1727 [st=171]    HTTP_TRANSACTION_READ_BODY  [dt=0]
t=1727 [st=171]    HTTP_CACHE_WRITE_DATA  [dt=1]
t=1728 [st=172]    HTTP_TRANSACTION_READ_BODY  [dt=0]
t=1728 [st=172]    HTTP_CACHE_WRITE_DATA  [dt=0]
t=1728 [st=172] -REQUEST_ALIVE
</code></pre>
  </div>
</div>

针对上面正常的请求，[我们](https://www.w3cdoc.com)主要关注两部分，如下面的截图：

* 发送请求头 \` +HTTP\_TRANSACTION\_SEND_REQUEST [dt=1]\`
* 读取响应头 \` +HTTP\_TRANSACTION\_READ_HEADERS [dt=161]\`

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/normal-section.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/normal-section.jpg?x-oss-process=image/format,webp" alt="" />

这是正常的情况下，没有什么问题。并且日志里可以清晰地看到发送的请求头是什么，然后解析出来的响应头是什么。这跟在网络面板看到的是一致的。

再回到出问题的请求日志上来，同样[我们](https://www.w3cdoc.com)只关注这两部分。如下面的截图：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/3retry.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/3retry.jpg?x-oss-process=image/format,webp" alt="" />

与正常相比，最后一次发送请求和读取响应头无异常，时间就多在了前面还有再次发送和请求的过程，细看时间都花在了以下两个事件中：

* <code class="highlighter-rouge">HTTP_STREAM_PARSER_READ_HEADERS [dt=21301]</code>
* <code class="highlighter-rouge">HTTP_STREAM_PARSER_READ_HEADERS [dt=21304]</code>

该事件的名称已经自我解读，意思是解析读取的响应头。但问题是紧接着下面报错了，

<div class="language-text highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>--> net_error = -101 (ERR_CONNECTION_RESET)
</code></pre>
  </div>
</div>

读取响应头时发生了链接重置的错误，有理由认为本次链接是不成功的，没拿到正确的响应头，于是解析不成功。时间都花在了这里，足足21秒之久，两个21秒造就了上面看到的<code class="highlighter-rouge">Stalled</code>了42秒之久。

问题似乎已经很明朗了。链接被重置。

在第三次尝试的时候正常了，于是正确返回，[我们](https://www.w3cdoc.com)才看到了被解析的响应头被展示在了下面。也就是说在出问题的时候要么响应头未拿到，要么响应头非法导致解析不成功。而原因就是链接被重置。

那么接下来的工作就是对<code class="highlighter-rouge">ERR_CONNECTION_RESET</code>这个错误的追查了。

## 官方关于 <code class="highlighter-rouge">ERR_CONNECTION_RESET</code> 错误的解释 {#官方关于-err_connection_reset-错误的解释}

未找到官方相应的资料，Chrome官网上唯一<a href="https://support.google.com/chrome/answer/117804?hl=en" target="_blank" rel="noopener noreferrer">关于此错误的描述</a>是在安装Chrome时出现Error 101。我估计文档的撰写人员没想到谁会这么蛋疼想要看这些生涩的东西，除了开发者。既然你都是开发者了，那为什么不去看Chromium的源码。

好吧，唯一的途径似乎只能从源码中寻找了。作为只精JS的[前端](https://www.w3cdoc.com)人员，现在要从C，C++代码中找答案了。估计追完这个问题，我会尝试为Chromium贡献代码。

慢着，在这之前，还是搜到一些关于这个错误的信息的。但似乎都不怎么靠谱。

比如<a href="http://blog.agmon.com/2013/07/05/solving-error-101-neterr_connection_reset-the-connection-was-reset/" target="_blank" rel="noopener noreferrer">这里</a>提到，是因为ISP网络问题，实在无太可能。还有<a href="http://www.tomshardware.com/answers/id-1982982/err-connection-reset-error-chrome.html" target="_blank" rel="noopener noreferrer">这是神马</a>居然一个硬件网站但提到了这个错误，并且怀疑是杀软导致Chrome出问题，但杀软已经在上文被[我们](https://www.w3cdoc.com)排除了。

## Chromium 源码 {#chromium-源码}

那么这个错误究竟是什么。能不能找到点靠谱的解释。当然能，让[我们](https://www.w3cdoc.com)进入到Chromium的源码中去。

### ERR\_CONNECTION\_RESET被唤起的地方 {#err_connection_reset被唤起的地方}

在Chromium的源码中搜索该常量名，确实出现很多<a href="https://code.google.com/p/chromium/codesearch#search/&q=ERR_CONNECTION_RESET&sq=package:chromium&type=cs" target="_blank" rel="noopener noreferrer">结果</a>。联系到[我们](https://www.w3cdoc.com)查看日志发现问题的上下文，是在解析响应头报的。所以[我们](https://www.w3cdoc.com)定位到<code class="highlighter-rouge">http_stream_parser.cc</code>文件，同时注意到有一个文件叫<code class="highlighter-rouge">net_errors_win.cc</code>，所以猜测他是定义所有错误常量用的，也顺便打开之。

经过观察<code class="highlighter-rouge">src/net/base/net_errors_win.cc</code> 其路径和代码得知其中多为系统级别的错误，似乎跟[我们](https://www.w3cdoc.com)的问题不是很关联，忽略该文件。

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/source.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/source.jpg?x-oss-process=image/format,webp" alt="" />

<code class="highlighter-rouge">http_stream_parser.cc</code>文件中，<code class="highlighter-rouge">ERR_CONNECTION_RESET</code>仅出现一次。这给[我们](https://www.w3cdoc.com)定位带来了极大的便利。

<a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/http/http_stream_parser.cc&q=ERR_CONNECTION_RESET&sq=package:chromium&dr=C%20http_stream_parser.cc" target="_blank" rel="noopener noreferrer">[chromium]//src/net/base/net_errors_win.cc</a>:

<div class="language-cpp highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code><span class="c1">// Returns true if |error_code| is an error for which we give the server a</span>
<span class="c1">// chance to send a body containing error information, if the error was received</span>
<span class="c1">// while trying to upload a request body.</span>
<span class="kt">bool</span> <span class="nf">ShouldTryReadingOnUploadError</span><span class="p">(</span><span class="kt">int</span> <span class="n">error_code</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="p">(</span><span class="n">error_code</span> <span class="o">==</span> <span class="n">ERR_CONNECTION_RESET</span><span class="p">);</span>
<span class="p">}</span>
</code></pre>
  </div>
</div>

这里定义了一个<code class="highlighter-rouge">ShouldTryReadingOnUploadError</code> 的方法，注释耐人寻味，这个时候，这样的情景，能否正确解读注释成为了比读懂代码更重要（这是我在看JS代码时永远无法体味到的感觉），下面尽可能对它进行理解：

> 在尝试发送一个请求体的时候，让服务器尝试发送一个带错误的响应体，如果[我们](https://www.w3cdoc.com)接收到了该错误则返回<code class="highlighter-rouge">true</code>

我承认被上面的复杂从句打败！

那么[我们](https://www.w3cdoc.com)来看这个方法被调用的场景。

现在[我们](https://www.w3cdoc.com)点击上面的<code class="highlighter-rouge">ShouldTryReadingOnUploadError</code>方法，代码下方出现调用了该方法的地方，一共有两处。

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/call.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/call.jpg?x-oss-process=image/format,webp" alt="" />

分别点击进行查看。

459行DoSendHeadersComplete方法里进行了调用:

<div class="language-cpp highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code><span class="kt">int</span> <span class="n">HttpStreamParser</span><span class="o">::</span><span class="n">DoSendHeadersComplete</span><span class="p">(</span><span class="kt">int</span> <span class="n">result</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="n">result</span> <span class="o"><</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// In the unlikely case that the headers and body were merged, all the</span>
    <span class="c1">// the headers were sent, but not all of the body way, and |result| is</span>
    <span class="c1">// an error that this should try reading after, stash the error for now and</span>
    <span class="c1">// act like the request was successfully sent.</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">request_headers_</span><span class="o">-></span><span class="n">BytesConsumed</span><span class="p">()</span> <span class="o">>=</span> <span class="n">request_headers_length_</span> <span class="o">&&</span>
        <span class="n">ShouldTryReadingOnUploadError</span><span class="p">(</span><span class="n">result</span><span class="p">))</span> <span class="p">{</span>
      <span class="n">upload_error_</span> <span class="o">=</span> <span class="n">result</span><span class="p">;</span>
      <span class="k">return</span> <span class="n">OK</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="n">result</span><span class="p">;</span>
  <span class="p">}</span>
</code></pre>
  </div>
</div>

> 虽然不太可能，但也不排除头部和请求体合并的情况，当所有头部发送完毕，请求体不一定，此时<code class="highlighter-rouge">result</code>便是需要稍后处理的一种错误，这里暂且先返回<code class="highlighter-rouge">OK</code>。

516行另一个DoSendBodyComplete方法里进行了调用:

<div class="language-cpp highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code><span class="kt">int</span> <span class="n">HttpStreamParser</span><span class="o">::</span><span class="n">DoSendBodyComplete</span><span class="p">(</span><span class="kt">int</span> <span class="n">result</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="n">result</span> <span class="o"><</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// If |result| is an error that this should try reading after, stash the</span>
    <span class="c1">// error for now and act like the request was successfully sent.</span>
    <span class="k">if</span> <span class="p">(</span><span class="n">ShouldTryReadingOnUploadError</span><span class="p">(</span><span class="n">result</span><span class="p">))</span> <span class="p">{</span>
      <span class="n">upload_error_</span> <span class="o">=</span> <span class="n">result</span><span class="p">;</span>
      <span class="k">return</span> <span class="n">OK</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="k">return</span> <span class="n">result</span><span class="p">;</span>
  <span class="p">}</span>
</code></pre>
  </div>
</div>

> 跟上面类似，如果<code class="highlighter-rouge">result</code>出错，稍后处理，先返回正常

这也与[我们](https://www.w3cdoc.com)在日志中看到的情况相符，在前面再次错误后，这次请求并没有终止结束，而是尝试到了第三次并且以成功结束的。

但不管怎样，从这两个方法，一个<code class="highlighter-rouge">DoSendHeadersComplete</code>， 另一个<code class="highlighter-rouge">DoSendBodyComplete</code>，身上能体现出请求确实已经发出去。

### TCP RST {#tcp-rst}

另外，在<a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h" target="_blank" rel="noopener noreferrer"><code class="highlighter-rouge">net_error_list.h</code></a>这个文件的109行，可以准确找到[我们](https://www.w3cdoc.com)在日志中得到的101号错误。它的定义如下：

<div class="language-cpp highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code><span class="c1">// A connection was reset (corresponding to a TCP RST).</span>
<span class="n">NET_ERROR</span><span class="p">(</span><span class="n">CONNECTION_RESET</span><span class="p">,</span> <span class="o">-</span><span class="mi">101</span><span class="p">)</span>
</code></pre>
  </div>
</div>

从括号中的进一步解释可以知道，它代表TCP连接重置。

## TCP {#tcp}

那么问题来了，什么是TCP连接重置？什么会引发TCP连接重置。从<a href="http://blogs.technet.com/b/networking/archive/2009/08/12/where-do-resets-come-from-no-the-stork-does-not-bring-them.aspx" target="_blank" rel="noopener noreferrer">这篇文章</a>中有比较详细的解答。

想要完全解释，本文似乎是不可能的了。但根据上面的文章，这里可以简单转述一下。

### 什么是TCP连接 {#什么是tcp连接}

它是一种协议。当网络上一个节点想与另一个节点通信时，双方需要选建立连接。而这个连接过程需要[大家](https://www.w3cdoc.com)都懂的一种约定，TCP就是事先定好的一种约定，于是[我们](https://www.w3cdoc.com)采用它吧，于是其中一个节点按照这个约定发起一建立连接的请求，另一节点收到后，根据该约定，便能读懂这个请求里各字段的意思：哦，丫这是想约我呢。

### 三次握手 {#三次握手}

继续上面的例子。A想与B通信，并且使用TCP。

首先A发起一个报文，其中包含自己的地址，想要连接的目标地址，自己用来连接的端口及目标机器的端口,etc.

B收到邀约，并且愿意付约。此刻B需要回传一个报文，告诉A我愿意跟你连接。

A收到B的肯定应答，到此A与B经历了三次通信或者说是握手，双方都没有异议，连接建立。

而连接断开的过程也颇为类似。双方中的一方比如说A先发起一个断开连接的报文FIN，B收到并确认，然后回传一个可以断开的报文FIN给A。此刻A收到并确认。此刻双方都确认后，连接可以安全断开，但还会保持一个等待断开的状态，大概持续4分钟，用于之前连接通路上未传输完成的数据进行善后。

### 什么是重置 {#什么是重置}

上面提到了4分钟的等待时间，而重置RESET便是立即断开连接的手段。

### 发生重置的情况 {#发生重置的情况}

到此重置的作用已然明了。也就是说，重置甚至算不上一个错误，它是TCP连接中的一种正常情况。但什么时候会发生重置，如何引起的。

上文列出了三种情况。

#### SMB Reset {#smb-reset}

简单举例来说，服务器提供了两个端口445，139进行服务，客户端同时去请求与这两个端口连接，服务器返回了两个端口可以被连接，此刻客户端择优选择一个进行连接，而重置另一个。

#### Ack, Reset {#ack-reset}

报文重置发生主要有以下情况：

* 服务器没有监听被请求的端口，无法建立连接
* 服务器此刻无法比如没有充裕的资源用来连接连接

#### TCP Reset due to no response {#tcp-reset-due-to-no-response}

由于没有响应而被重置。当发起连接的一方连续发送6次请求未得到回应，此刻默认他们之间已经通过三次握手建立了连接并且通信有问题，发起的一方将连接重置。

#### Application Reset {#application-reset}

除了上面的情况，找不到TCP内部自己发送的重置，则归为了这一类。程序内将连接重置。此种情况包含了所有你想得到想不到将连接断开的情况。有可能是程序内部逻辑重置的，所以不能完全认为此时发生了错误。

值得注意的是，上面列出的情况服务器的不确定性导致连接重置的可能性要合理些。Chrome 主动发起URL请求不太可能自己又重置掉，并且没有理由重置掉后又去重连。

## 进一步解读日志文件 {#进一步解读日志文件}

上面Chromium源码部分的求证多少带有猜测成分。不妥。

因为没找到关于Chrome net-internal 日志的官方文档什么的，自身去解读始终是有局限的。不如提个ISSUE让Chromium开发人员来搭一把手吧。遂向Chromium提交ISSUE，请<a href="https://code.google.com/p/chromium/issues/detail?id=447463" target="_blank" rel="noopener noreferrer">戳此查看</a>，虽然我不认为现在遇到的这个问题跟Chrome有关并且属于Chrome的Bug，目的仅仅是看他们能否帮忙给出合理的日志解读来定位问题。

三天后（有点热泪盈眶），有同学<a href="https://code.google.com/p/chromium/issues/detail?id=447463#c1" target="_blank" rel="noopener noreferrer">回复</a>，将日志所体现的问题诊断得似乎很有道理，可信。

> 1) We have a bunch of connections to qa.tieba.baidu.com, all were used successfully, and are now idle. 2) They all silently die for some reason, without us ever being informed. My guess is your personal router times out the connection, but this could also be your ISP, the destination server, or ever a real network outage (A short one) that prevents us from getting the connection closed message. 3) There’s a new request to qa.tieba.baidu.com. We try to reuse a socket. After 21 seconds, we get the server’s RST message (“I don’t have a connection to you.”). Since it was a stale socket, we’re aware this sometimes happens, so we just retry…And get the next idle socket in the list, which, after 21 seconds, gives us the same reset message. We try again, for the same reason. This time we don’t have another stale socket to try, so we use a fresh one. The request succeeds.

> The real problem here is something is taking 21 seconds to send us the RST messages, despite the fact that a roundtrip to the server you’re talking to only takes about 100 milliseconds.

* 「之前有过很多成功的连接」，确实，因为出现加载缓慢的情况是偶发的，这之前有过很多正常的不卡的请求存在过。这里没有异议。
* 「他们都以未知的原因被断掉了」，因为不是正常地断开连接，所以客户端也就是[浏览器](https://www.w3cdoc.com)不知道当前与服务器的TCP连接已经断开，傻傻地保留着与服务器连接的socket，注意，此时已经发生信息的不对等了，这是问题的根源。至于什么原因，给出了可能的原因：路由器认为连接超时将其断掉，同时不排除ISP（互联网服务提供商）的原因，服务器暂时的停运抽风等。不管怎样，客户端[浏览器](https://www.w3cdoc.com)没有收到连接断开的信息。
* 在上面的基础上，[我们](https://www.w3cdoc.com)去发起一次新的请求。此时[浏览器](https://www.w3cdoc.com)希望重用之前的连接以节省资源，用之前的一个socket去发起连接。21秒后收到服务器返回的重置信息（意思是服务器告诉[浏览器](https://www.w3cdoc.com)：我和你之间没有连接），没关系，上面提到，[我们](https://www.w3cdoc.com)有很多可以重用的连接，于是[浏览器](https://www.w3cdoc.com)重新从可用的连接里面又选择了一个去进行连接，不幸的是，同样的情况再次发生，21秒后收到服务器的重置信息。这体现在日志上就是第二次重试失败。到第三次，因为前面[浏览器](https://www.w3cdoc.com)认为可以重用的连接现在都被正确地标为断开了，没有新的可用，于是这次[浏览器](https://www.w3cdoc.com)发起了全新的请求，成功了！

总结出来，两个问题：

* 为什么之前成功的连接不正常的断开了？服务器配置或者网络原因？
* 是什么让[浏览器](https://www.w3cdoc.com)21秒后才收到重置信息？服务器作出反应过慢还是网络原因？

## Chrome Dev Tool 中时间线各阶段代表的意义 {#chrome-dev-tool-中时间线各阶段代表的意义}

另附注一下Chrome Dev Tool 中请求的时间线各阶段代表的意义。 以下内容扒自<a href="https://developer.chrome.com/devtools/docs/network#resource-network-timing" target="_blank" rel="noopener noreferrer">Chrome 开发者文档页</a>，然后我将它本地化了一下下。

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timing.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/timing.png?x-oss-process=image/format,webp" alt="" />

### Stalled/Blocking {#stalledblocking}

在请求能够被发出去前的等等时间。包含了用于处理代理的时间。另外，如果有已经建立好的连接，那么这个时间还包括等待已建立连接被复用的时间，这个遵循Chrome对同一源最大6个TCP连接的规则。

「拿[我们](https://www.w3cdoc.com)的情况来说，上面出错所有的耗时也是算在了这部分里面。网络面板中显示的其余时间比如DNS查找，连接建立等都是属于最后那次成功请求的了」

### Proxy Negotiation {#proxy-negotiation}

处理代理的时间。

### DNS Lookup {#dns-lookup}

查找DNS的时间。页面上每个新的域都需要一次完整的寻路来完成DNS查找。

### Initial Connection / Connecting {#initial-connection--connecting}

用于建立链接的时间，包括TCP握手及多次尝试握手，还有处理SSL。

### SSL {#ssl}

完成SSL握手的时间。

### Request Sent / Sending {#request-sent--sending}

发起请求的时间，通常小到可以忽略。

### Waiting (TTFB) {#waiting-ttfb}

等待响应的时间，具体来说是等待返回首个字节的时间。包含了与服务器之间一个来回响应的时间和等待首个字节被返回的时间。

### Content Download / Downloading {#content-download--downloading}

用于下载响应的时间

## 结论 {#结论}

我相信很多同学是直接跳到这里来了的。事实上我给不出什么解决方案，但能排除[前端](https://www.w3cdoc.com)代码引起问题的可能性。

具体来说，能够得到的结论有以下几点：

* 请求成功构造，失败情况下也可以看到正常的请求头被打印出来了的
* 可以肯定的是在与服务器建立连接时被Shut down了，参考上面关于连接重置的部分会更有意义一些
* 参考上面「进一步解读日志文件」部分，来自Chromium开发者的回复中对日志文件的解读更加合理些，[浏览器](https://www.w3cdoc.com)与服务器的连接不正常断开是导致问题的根源，以至于影响了后面对连接的重用
* 21秒的等待仍然是个未知数，不知道有何不可抗拒的外力促使[浏览器](https://www.w3cdoc.com)21秒后才收到服务器的重置信息。此处[浏览器](https://www.w3cdoc.com)与服务器的失联原因有待查证

最后寄希望于RD同学跟进，协助排查服务器连接及后端代码的部分。FE同学会保持持续关注。

## 参考及引用 {#参考及引用}

# 1 <a href="http://stackoverflow.com/questions/27513994/chrome-stalls-when-making-multiple-requests-to-same-resource" target="_blank" rel="noopener noreferrer">Chrome stalls when making multiple requests to same resource?</a>

# 2 <a href="http://stackoverflow.com/questions/5585918/what-does-pending-mean-for-request-in-chrome-developer-window" target="_blank" rel="noopener noreferrer">What does “pending” mean for request in Chrome Developer Window?</a>

# 3 <a href="https://developer.chrome.com/devtools/docs/network#resource-network-timing" target="_blank" rel="noopener noreferrer">Evaluating network performance / Resource network timing</a>

# 4 <a href="https://www.google.com/search?q=Provisional+headers+are+shown&gws_rd=ssl" target="_blank" rel="noopener noreferrer">Provisional headers are shown</a>

# 5 <a href="http://stackoverflow.com/questions/21177387/caution-provisional-headers-are-shown-in-chrome-debugger" target="_blank" rel="noopener noreferrer">“CAUTION: provisional headers are shown” in Chrome debugger</a>

# 6 <a href="http://segmentfault.com/q/1010000000364871" target="_blank" rel="noopener noreferrer">Chrome 里的请求报错 “CAUTION: Provisional headers are shown” 是什么意思?</a>

# 7 <a href="https://codereview.chromium.org/345643003" target="_blank" rel="noopener noreferrer">Issue 345643003: Http cache: Implement a timeout for the cache lock</a>

# 8 <a href="https://code.google.com/p/chromium/issues/detail?id=46104" target="_blank" rel="noopener noreferrer">Issue 46104: Pages can get blocked in “Waiting for Cache” for a very long time</a>

# 9 <a href="http://dev.chromium.org/for-testers/providing-network-details" target="_blank" rel="noopener noreferrer">Providing Network Details for bug reports</a>

# 10 <a href="http://div.io/topic/609?page=1#2050" target="_blank" rel="noopener noreferrer">从FE的角度上再看输入url后都发生了什么</a>

# 11 <a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/http/http_stream_parser.cc&q=ERR_CONNECTION_RESET&sq=package:chromium&dr=C&l=77" target="_blank" rel="noopener noreferrer">ERR_CONNECTION_RESET 的Chromium 源码</a>

# 12 <a href="http://www.chromium.org/developers/design-documents/network-stack#TOC-HttpStreamFactory" target="_blank" rel="noopener noreferrer">Chromium Network Stack</a>

# 13 <a href="http://blogs.technet.com/b/networking/archive/2009/08/12/where-do-resets-come-from-no-the-stork-does-not-bring-them.aspx" target="_blank" rel="noopener noreferrer">Where do resets come from? (No, the stork does not bring them.)</a>

# 14 <a href="https://code.google.com/p/chromium/issues/detail?id=447463#c1" target="_blank" rel="noopener noreferrer">Issue 447463: Chrome-network: Long delay before RST message on stale sockets results in slow page loads)</a>
