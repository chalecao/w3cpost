---
title: Content-Security-Policy使用方法
weight: 6

---
<div>
  <div>
    <p id="qlNdjPr">
      <img loading="lazy" width="500" height="371" class="alignnone size-full wp-image-2840 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6b08415258.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6b08415258.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6b08415258.png?x-oss-process=image/format,webp 500w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6b08415258.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_223/format,webp 300w" sizes="(max-width: 500px) 100vw, 500px" />
    </p>

    <p>
      首先我们要知道web浏览器为了安全都有会<strong>同源限制</strong>，什么是同源限制？就是来自 <a href="https://link.jianshu.com?t=https://mybank.com" target="_blank" rel="nofollow noopener noreferrer">https://mybank.com</a> 的代码应仅能访问 <a href="https://link.jianshu.com?t=https://mybank.com" target="_blank" rel="nofollow noopener noreferrer">https://mybank.com</a> 的数据，而绝不被允许访问 <a href="https://link.jianshu.com?t=https://evil.example.com" target="_blank" rel="nofollow noopener noreferrer">https://evil.example.com</a>。同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据，比如cookie/locaStoragy/IndexDB就遵守同源限制。XMLHettpRequest也是存在同源限制，相信只要开发过web的同学在ajax获取数据时都遇到过这个问题。
    </p>
    
    <p>
      同源限制可以一定程度上限制我们的用户信息不会被盗取，但是却没法防止我们的页面被插入不法分子的资源（js，img，css等），毕竟页面上带src的元素资源是不受同源限制的。这些页面上的牛皮鲜让人很讨厌，影响是极其恶劣的：会让我们的js监控误报、会影响用户体验、甚至隐私泄露，所以我们需要对src资源也作出一定的限制，这就得Content-Security-Policy来了
    </p>
    
    <h2>
      Content-Security-Policy
    </h2>
    
    <p>
      Content-Security-Policy（内容安全政策,下文简称为CSP）,作用呢主要有两点：
    </p>
    
    <ol>
      <li>
        使用白名单的方式告诉客户端（浏览器）允许加载和不允许加载的资源。
      </li>
      <li>
        向服务器举报这种强贴牛皮鲜广告的行为，以便做出更加针对性的措施予以绝杀。
      </li>
    </ol>
    
    <p>
      举个配置的例子如下：
    </p>
    
    <pre class="EnlighterJSRAW" data-enlighter-language="null">"Content-Security-Policy":"default-src 'self' *.xx.com 'unsafe-inline' hybrid: data: wss:;img-src *"</pre>
    
    <h3>
      怎么用
    </h3>
    
    <p>
      我们知道了好处还是很犀利的啊，这么好的东西怎么玩？其实也很简单，前面说到了他其实就是一个http header嘛，所以我们只需要在返回html页面的同时加上个response header 就行了，后面的<code>script-src</code>代表是一个指令，指示浏览器你只能加载我屁股后面那些规则下的js代码，其他的都一律拒绝。
    </p>
    
    <pre class="hljs java"><code class="java">Content-Security-Policy: script-src &lt;span class="hljs-string">'self'&lt;/span> https:&lt;span class="hljs-comment">//apis.google.com&lt;/span>
</code></pre>

    <p>
      你还可以通过元标记的方式使用：
    </p>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">meta&lt;/span> &lt;span class="hljs-attr">http-equiv&lt;/span>=&lt;span class="hljs-string">"Content-Security-Policy"&lt;/span> &lt;span class="hljs-attr">content&lt;/span>=&lt;span class="hljs-string">"default-src https://cdn.example.net; child-src 'none'; object-src 'none'"&lt;/span>&gt;&lt;/span>
</code></pre>

    <h3>
      指令
    </h3>
    
    <p>
      前面说到<code>script-src</code>是一个指令，那就说明还有其他的指令罗，没有错，下面的都是指令，覆盖了web页面的所有资源
    </p>
    
    <blockquote>
      <p>
        <code>base-uri</code>: 用于限制可在页面的 <base> 元素中显示的网址。<br /> <code>child-src</code>: 用于列出适用于工作线程和嵌入的帧内容的网址。例如：child-src <a href="https://link.jianshu.com?t=https://youtube.com" target="_blank" rel="nofollow noopener noreferrer">https://youtube.com</a> 将启用来自 YouTube（而非其他来源）的嵌入视频。 使用此指令替代已弃用的 frame-src 指令。<br /> <code>connect-src</code>: 用于限制可（通过 XHR、WebSockets 和 EventSource）连接的来源。<br /> <code>font-src</code>: 用于指定可提供网页字体的来源。Google 的网页字体可通过 font-src <a href="https://link.jianshu.com?t=https://themes.googleusercontent.com" target="_blank" rel="nofollow noopener noreferrer">https://themes.googleusercontent.com</a> 启用。<br /> <code>form-action</code>: 用于列出可从 <form> 标记提交的有效端点。<br /> <code>frame-ancestors</code>: 用于指定可嵌入当前页面的来源。此指令适用于 <frame>、<iframe>、<embed> 和 <applet> 标记。此指令不能在 <meta> 标记中使用，并仅适用于非 HTML 资源。<br /> <code>frame-src</code>: 已弃用。请改用 child-src。<br /> <code>img-src</code>: 用于定义可从中加载图像的来源。<br /> <code>media-src</code>: 用于限制允许传输视频和音频的来源。<br /> <code>object-src</code>: 可对 Flash 和其他插件进行控制。<br /> <code>plugin-types</code>: 用于限制页面可以调用的插件种类。<br /> <code>report-uri</code>: 用于指定在违反内容安全政策时浏览器向其发送报告的网址。此指令不能用于 <meta> 标记，<code>这就是举报电话</code>。<br /> <code>style-src</code>: 是 script-src 版的样式表。<br /> <code>upgrade-insecure-requests</code>: 指示 User Agent 将 HTTP 更改为 HTTPS，重写网址架构。 该指令适用于具有大量旧网址（需要重写）的网站。
      </p>
    </blockquote>
    
    <p>
      这么多指令都要写？写起来不是很麻烦，不是的。你只需要写自己要求限制的指令就行，没写的都会默认没有限制。
    </p>
    
    <p>
      你还可以通过指定一个 default-src 指令替换大部分指令的默认行为，也就说如果你写了default-src 指令，那其他没写的指令都会服从default-src 的规则。
    </p>
    
    <h3>
      规则
    </h3>
    
    <p>
      规则主要是罗列一些你信任的域名，除此之外还有四个关键词：
    </p>
    
    <blockquote>
      <p>
        <code>none</code> 表示不执行任何匹配。<br /> <code>'self'</code>表示与当前来源（而不是其子域）匹配。<br /> <code>unsafe-inline</code>表示允许使用内联 JavaScript 和 CSS。<br /> <code>unsafe-eval</code> 表示允许使用类似 eval 的 text-to-JavaScript 机制。
      </p>
    </blockquote>
    
    <p>
      once属性
    </p>
    
    <p>
      讲了这么多那和我一开始发现的那个script标签上的once属性有啥关系呢？首先说明不存在不正当*关系。主要是现代浏览器认为内联css和内联js都是应该被视为危险的行为，但是你总不能因为菜刀能杀人就不让百姓用菜刀了吧，所以开个口子吧。如果你在使用CSP策略的同时有确实需要使用内联css和js怎么办？用once+随机数的方式
    </p>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">nonce&lt;/span>=&lt;span class="hljs-string">EDNnf03nceIOfn39fn3e9h3sdfa&lt;/span>&gt;&lt;/span>&lt;span class="actionscript">
  &lt;span class="hljs-comment">//Some inline code I cant remove yet, but need to asap.&lt;/span>
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      然后我们在CSP的白名单中加上
    </p>
    
    <pre class="hljs bash"><code class="bash">Content-Security-Policy: script-src &lt;span class="hljs-string">'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'&lt;/span>
</code></pre>

    <p>
      这样你这段内联js就可以生效了
    </p>
    
    <h2>
      补充说明
    </h2>
    
    <p>
      CSP 1 在 Chrome、Safari 和 Firefox 中非常实用，但在 IE 10 中仅得到非常有限的支持。 您可以<a href="https://link.jianshu.com?t=https://caniuse.com/#feat=contentsecuritypolicy" target="_blank" rel="nofollow noopener noreferrer"> 在 canisue.com 上查看具体信息</a>。CSP Level 2 在 Chrome 40 及更高版本中可用。 Twitter 和 Facebook 等大量网站已部署此标头（<a href="https://link.jianshu.com?t=https://blog.twitter.com/2011/improving-browser-security-with-csp" target="_blank" rel="nofollow noopener noreferrer">Twitter 的案例研究</a>值得一读），并为您开始在自己的网站上进行部署制定了相应标准。
    </p>
    
    <p>
      &nbsp;
    </p>
  </div>
</div>

<audio style="display: none;" controls="controls"></audio>
