---
title: PM2启动eggjs




---
<h1 data-v-50ff96fb="">egg</h1>

在egg项目的根目录定义启动文件：

<pre class="EnlighterJSRAW" data-enlighter-language="null">// server.js
const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});</pre>

这样，[我们](https://www.w3cdoc.com)就可以通过 PM2 进行启动了(本次启动在egg项目的根目录)：

<pre class="EnlighterJSRAW" data-enlighter-language="null">pm2 start server.js --name test</pre>

&nbsp;<h1 class="article-title" data-v-50ff96fb="">PM2简易使用手册</h1> <div class="article-content" data-v-50ff96fb="" data-id="5be4077c5188253e8c6dac27">

<h2 class="heading" data-id="heading-0">
  PM2 使用手册
</h2>

很简单也很水，就是我今天因为公司项目正好在研究这个东西，权当自己记录了，不喜勿喷～～～万分感谢

<h3 class="heading" data-id="heading-1">
  背景
</h3>

对于线上项目，如果直接通过 node app 来启动，如果报错了可能直接停止导致整个服务崩溃，一般监控 node 有几种方案。

* supervisor: 一般用作开发环境的使用。
* forever: 管理多个站点，一般每个站点的访问量不大的情况，不需要监控。
* PM2: 网站的访问量比较大，需要完整的监控页面。

> 公司原来的项目采用的是 forever 的形式，不过如果 node 出现问题的时候，没有办法获取到有效的监控数据进行错误排查，因此新开发的系统准备采用 pm2 的形式进行[前端](https://www.w3cdoc.com)以及 node 层的监控。

<h3 class="heading" data-id="heading-2">
  PM2 的主要特性
</h3>

* 内建负载均衡（使用 Node cluster 集群模块）
* 后台运行
* 0 秒停机重载，我理解大概意思是维护升级的时候不需要停机.
* 具有 Ubuntu 和 CentOS 的启动脚本
* 停止不稳定的进程（避免无限循环）
* 控制台检测
* 提供 HTTP API
* 远程控制和实时的接口 API ( Nodejs 模块,允许和 PM2 进程管理器交互 )

<h3 class="heading" data-id="heading-3">
  安装
</h3>

<pre><code class="hljs bash copyable" lang="bash">// 全局安装pm2，依赖node和npm
npm install -g pm2
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

<h3 class="heading" data-id="heading-4">
  用法
</h3>

* 基本启动命令

> pm2 start

<pre><code class="hljs bash copyable" lang="bash">// start命令启动对应的node server文件
$ pm2 start ./build/server.js
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

* 通过配置文件进行启动稍后详细讲解

启动之后，控制台会看到如下消息：<figure>

<p id="ZbMFOil">
  <img loading="lazy" width="1280" height="206" class="alignnone size-full wp-image-5813 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_48/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_124/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c755e0e2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_129/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

> 如上图所示，可以看到项目`kafazhe`成功启动,id 是 0，并且状态时 online.

* 查看详细状态信息

> pm2 show (appname|id)

<pre><code class="hljs bash copyable" lang="bash">$ pm2 show kaifazhe
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="qexvtCT">
  <img loading="lazy" width="1280" height="960" class="alignnone size-full wp-image-5814 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_576/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c7c19fd9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

> 如上图所示，可以查看到 kaifazhe 进程的详细信息

* 查看所有启动的进程列表

> pm2 list

<pre><code class="hljs bash copyable" lang="bash">$ pm2 list
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="GNgcwCc">
  <img loading="lazy" width="1280" height="206" class="alignnone size-full wp-image-5815 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_48/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_124/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c861628a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_129/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

* 监控每个 node 进程的 cpu 和内存使用情况  
    > pm2 monit

<pre><code class="hljs bash copyable" lang="bash">$ pm2 monit
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="vBHqHJA">
  <img loading="lazy" width="1280" height="737" class="alignnone size-full wp-image-5817 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_173/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_442/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21c9ee8362.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_461/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

> 可以使用 pm2 monit 功能监控所有 node 进程的运行情况，包括各种响应，错误信息。

* 显示所有进程的日志信息

> pm2 logs

<pre><code class="hljs bash copyable" lang="bash">$ pm2 logs
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="ArSOYTy">
  <img loading="lazy" width="1280" height="738" class="alignnone size-full wp-image-5818 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_173/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_443/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21ca69abea.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_461/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

* 监控运行这些进程的机器的状态

> pm2 web

<pre><code class="hljs bash copyable" lang="bash">$ pm2 web
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="vqyjOiy">
  <img loading="lazy" width="1280" height="229" class="alignnone size-full wp-image-5820 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_54/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_137/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cb714659.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_143/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure> <figure>

<p id="BEYcqkL">
  <img loading="lazy" width="700" height="1199" class="alignnone size-full wp-image-5819 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cae5a8e4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cae5a8e4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cae5a8e4.png?x-oss-process=image/format,webp 700w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cae5a8e4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_175,h_300/format,webp 175w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee21cae5a8e4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_350,h_600/format,webp 350w" sizes="(max-width: 700px) 100vw, 700px" />
</p><figcaption></figcaption></figure> <figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/11/8/166f2b95194d9f80?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/11/8/166f2b95194d9f80?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="774" data-height="1054" /> <figcaption></figcaption></figure>

> 我只能说，这也太 NB 了吧，不仅可以监控这些进程，还能监控运行这些进程的机器的状态，逆天了。然后它会自动起一个服务在指定端口，如图在 9615 启动了一个服务，[我们](https://www.w3cdoc.com)可以访问。虽然我看不太懂，但是对于测试运维同学来说，应该挺有用的吧。

* 停止 指定/所有 进程

> pm2 stop (id|all)

<pre><code class="hljs bash copyable" lang="bash">// 停止id为0的进程
$ pm2 stop 0
// 停止所有进程
$ pm2 stop all
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/11/8/166f2b95514f5929?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/11/8/166f2b95514f5929?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1280" data-height="628" /> <figcaption></figcaption></figure>

> 如图，[我们](https://www.w3cdoc.com)运行了两个服务状态都是 online，使用 stop 0 之后，kaifazhe 的服务变成了 stopped，然后使用 stop all，所有进程状态全变成了 stopped。

* 重启 指定/所有 进程

> pm2 restart (id|all)

<pre><code class="hljs bash copyable" lang="bash">// 重启id为0的进程
$ pm2 restart 0
// 重启所有进程
$ pm2 restart all
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

* 杀死 指定/所有 进程

> pm2 delete (id|all)

<pre><code class="hljs bash copyable" lang="bash">// 杀死id为0的进程
$ pm2 delete 0
// 杀死所有进程
$ pm2 delete all
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre><figure>

<p id="QZdAjnA">
  <img loading="lazy" width="1280" height="653" class="alignnone size-full wp-image-5826 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_153/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_392/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220e2b45bb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_408/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

> 从上图[我们](https://www.w3cdoc.com)可以看出，restart 0 之后，0 进程从 stopped 状态变成了 online，然后[我们](https://www.w3cdoc.com)使用 delete 0,进程 0 就消失不见了，[我们](https://www.w3cdoc.com)再 delete all,可以看到现在没有任何进程在运行。

<h3 class="heading" data-id="heading-5">
  配置 PM2 启动文件
</h3>

pm2 启动的方式可以进行很多的扩展，比如设置环境，设置错误信息打印，设置输入信息打印等等高级功能。那么一条命令就不能完成这些任务，所有 pm2 提供了配置文件的方式来启动～

<h4 class="heading" data-id="heading-6">
  pm2.config.js
</h4>

<pre><code class="hljs bash copyable" lang="bash">// 名称任意，按照个人习惯来
module.exports = {
  apps: [
    {
      name: &lt;span class="hljs-string">'kaifazhe'&lt;/span>, // 应用名称
      script: &lt;span class="hljs-string">'./build/server.js'&lt;/span>, // 启动文件地址
      cwd: &lt;span class="hljs-string">'./'&lt;/span>, // 当前工作路径
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        &lt;span class="hljs-string">'src'&lt;/span>,
        &lt;span class="hljs-string">'build'&lt;/span>,
      ],
      ignore_watch: [
        // 忽视这些目录的变化
        &lt;span class="hljs-string">'node_modules'&lt;/span>,
        &lt;span class="hljs-string">'logs'&lt;/span>,
        &lt;span class="hljs-string">'public'&lt;/span>,
      ],
      node_args: &lt;span class="hljs-string">'--harmony'&lt;/span>, // node的启动模式
      env: {
        NODE_ENV: &lt;span class="hljs-string">'development'&lt;/span>, // 设置运行环境，此时process.env.NODE_ENV的值就是development
        ORIGIN_ADDR: &lt;span class="hljs-string">'http://www.yoduao.com'&lt;/span>
      },
      env_production: {
        NODE_ENV: &lt;span class="hljs-string">'production'&lt;/span>,
      },
      out_file: &lt;span class="hljs-string">'./logs/out.log'&lt;/span>, // 普通日志路径
      error_file: &lt;span class="hljs-string">'./logs/err.log'&lt;/span>, // 错误日志路径
      merge_logs: &lt;span class="hljs-literal">true&lt;/span>,
      log_date_format: &lt;span class="hljs-string">'YYYY-MM-DD HH:mm Z'&lt;/span>,
    },
  ],
};
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

> 对于上面的 env，[我们](https://www.w3cdoc.com)可以在内部添加很多个参数变量，这样[我们](https://www.w3cdoc.com)所使用的 process.env.XXX 就会对应发生变化,例如上面，[我们](https://www.w3cdoc.com) process.env.ORIGIN_ADDR 的值就是`http://www.youdao.com`～

<h3 class="heading" data-id="heading-7">
  负载均衡
</h3>

最 666 的功能来了～自动给你做负载均衡，只需要一条命令，以前那些复杂的概念懂不懂无所谓。

> pm2 start server.js -i (number|max)

<pre><code class="hljs bash copyable" lang="bash">&lt;span class="hljs-comment"># 开启三个进程运行项目&lt;/span>
pm2 start app.js -i 3
&lt;span class="hljs-comment"># 根据机器CPU核数，开启对应数目的进程运行项目&lt;/span>
pm2 start app.js -i max
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

> 配置文件里对应的：`"instance": (number|max)`

<pre><code class="hljs bash copyable" lang="bash">// pm2.config.js
&lt;span class="hljs-string">"instances"&lt;/span>: 2,  // 启动两个实例
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

<h2 class="heading" data-id="heading-8">
  日志相关
</h2>

> 这里是时隔一年后补充的，当初只是为了简单写写总结，不过没想到这么多人点赞喜欢了，那么一年之后随着使用加深，对于pm2有个其他的总结，就补充一下～

<h3 class="heading" data-id="heading-9">
  pm2日志
</h3>

上面配置文件可以看出来，[我们](https://www.w3cdoc.com)可以配置logs，包括普通的out和错误的error日志。其实也不需要[我们](https://www.w3cdoc.com)做什么，[我们](https://www.w3cdoc.com)只需要在config里面配置好就行，他就会自动往里面写日志：<figure>

<p id="qPSMkki">
  <img loading="lazy" width="1280" height="683" class="alignnone size-full wp-image-5825 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_160/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_410/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d9e9c57.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_427/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
</p><figcaption></figcaption></figure>

很简单的功能，就包含了日志，真是美妙到不行，但是，真的那么美妙吗？哈哈，好像不是？[我们](https://www.w3cdoc.com)的日志全部输出到了`err.log`和`out.log`内，日积月累，OMG不敢想象，排查问题肯定很费劲，所以就有了下面的日志分割～

<h3 class="heading" data-id="heading-10">
  日志分割
</h3>

[我们](https://www.w3cdoc.com)正常意义上的日志，以node为例，应该都是使用的`log4js`来进行按日期写入的，那么pm2可不可以按日期写入呢？答案肯定是：可以。

pm2为[我们](https://www.w3cdoc.com)提供了插件系统，而日期分割功能就正好用到了插件系统：<a href="https://github.com/keymetrics/pm2-logrotate" target="_blank" rel="nofollow noopener noreferrer">pm2-logrotate</a>

安装：

<pre><code class="hljs bash copyable" lang="bash">pm2 install pm2-logrotate // 看好了，是pm2 install而不是npm install
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

你装完之后它就自动启动，然后你还可以配置各种参数<figure>

<p id="RABWoGB">
  <img loading="lazy" width="1028" height="496" class="alignnone size-full wp-image-5824 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/format,webp 1028w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_145/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_371/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220d24bcd4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_386/format,webp 800w" sizes="(max-width: 1028px) 100vw, 1028px" />
</p><figcaption></figcaption></figure> <figure>

<p id="DuzovnZ">
  <img loading="lazy" width="872" height="364" class="alignnone size-full wp-image-5823 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/format,webp 872w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_125/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_321/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee220a2746c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_334/format,webp 800w" sizes="(max-width: 872px) 100vw, 872px" />
</p><figcaption></figcaption></figure>

然后就完成了日志按日期分割～

> 细心的小伙伴可能发现了，你上面让我安装的是`pm2-logrotate`，为啥你安装的是`pm2-logrotate-ext`，嗯，因为据说官方的`pm2-logrotate`存在一个bug，就是日期会正常分割，但是如果你前一天的文件没有写满比如你设置了1M但只写了500K那么第二天的日志还是会插入到原来的out.log(err.log)，所以大牛就写了这个解决了这个问题<a href="https://github.com/Lujo5/pm2-logrotate-ext" target="_blank" rel="nofollow noopener noreferrer">pm2-logrotate-ext</a>

<h2 class="heading" data-id="heading-11">
  配合pm2-web实现监控可视化
</h2>

可能很多人不喜欢控制台，喜欢把监控数据进行可视化更方便查看和分析。不要紧，高手们已经为[我们](https://www.w3cdoc.com)提供了工具，pm2-web，一看就是专门配合pm2来使用的。

<h3 class="heading" data-id="heading-12">
  安装
</h3>

<pre><code class="hljs bash copyable" lang="bash">npm install -g pm2-web
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

<h3 class="heading" data-id="heading-13">
  使用
</h3>

默认pm2-web会自动启动一个端口8080，但是[我们](https://www.w3cdoc.com)还是喜欢可控状态的，因此按照配置文件的方式启动。

<pre><code class="hljs bash copyable" lang="bash">$ pm2-web --config pm2-web-config.json
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

<pre><code class="hljs bash copyable" lang="bash">// pm2-web-config.json
{
  &lt;span class="hljs-string">"www"&lt;/span>: {
      &lt;span class="hljs-string">"host"&lt;/span>: &lt;span class="hljs-string">"localhost"&lt;/span>,
      &lt;span class="hljs-string">"address"&lt;/span>: &lt;span class="hljs-string">"0.0.0.0"&lt;/span>,
      &lt;span class="hljs-string">"port"&lt;/span>: 6688
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

这样你就可以在[浏览器](https://www.w3cdoc.com)查看可视化的监控状态了～<figure>

<p id="TZrysSf">
  <img loading="lazy" width="924" height="956" class="alignnone size-full wp-image-5822 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/format,webp 924w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_290,h_300/format,webp 290w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_795/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/06/img_5ee22099bca7a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_580,h_600/format,webp 580w" sizes="(max-width: 924px) 100vw, 924px" />
</p><figcaption></figcaption></figure>

> 说明一下，图片是我从网上找的，为什么没在本地启动呢，原因是`pm2-web`依赖`node-inspector`,而`node-inspector`对于高版本node无法安装，很多人提了issue，但是感觉开发者也处于放弃了的状态。我也不打算在本地安装低版本node，所以感兴趣的[大家](https://www.w3cdoc.com)可以安装个低版本的试试～

<h3 class="heading" data-id="heading-14">
  谢谢～～～
</h3></div>
