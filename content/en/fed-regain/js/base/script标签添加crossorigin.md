---
title: script标签添加crossorigin
---
最近 <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap 4</a> 已经正式发布了，可能已经有爱尝鲜的小伙伴在 alpha 阶段就尝试过 BS4。不过今天要说的不是 BS4，而是官网里引入 BS4 框架依赖的 jQuery 的代码：

<pre class="pure-highlightjs"><code class="null">&lt;script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"&gt;&lt;/script&gt;</code></pre>

看起来比以前的写法复杂好多的样子。先不着急慢慢看，多了一个 integrity 属性，看值的样子就知道是用来验证文件完整性的。另外还有一个 crossorigin 属性……怎么？直接通过 script 标签加载网站外 JS 资源也要开始考虑跨域的问题了吗？

这里不讨论 `script` 里 crossorigin 属性怎么用，以及服务器端如何支持此属性，MDN 上的文档已经说得很清楚。参考： [mdn][1]

你可以使用下面的<a style="font-style: normal; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px; font-family: Arial, x-locale-body, sans-serif; font-size: 20px; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.0556px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff;" title="HTML <script> 元素用于嵌入或引用可执行脚本。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script"><code>&lt;script&gt;</code></a> 元素告诉一个[浏览器](https://www.w3cdoc.com)执行来自 `https://example.com/example-framework.js` 的脚本而不发送用户凭据。

不知道[大家](https://www.w3cdoc.com)对此新属性的感觉如何，我的第一感觉是：新加了这么一个属性，难道是以前 script 不用 crossorigin 属性的时候，会出什么问题吗？到底可能会出什么问题呢？

从谷歌的结果来看，比较一致的说法是，引入跨域的脚本（比如用了 apis.google.com 上的库文件），如果这个脚本有错误，因为[浏览器](https://www.w3cdoc.com)的限制（根本原因是协议的规定），是拿不到错误信息的。当本地尝试使用 `window.onerror` 去记录脚本的错误时，跨域脚本的错误只会返回 `Script error`。


  <img loading="lazy" width="260" height="82" class="alignnone size-full wp-image-3103 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c0167d35f0b0.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c0167d35f0b0.png?x-oss-process=image/format,webp" alt="" />

但 HTML5 新的规定，是可以允许本地获取到跨域脚本的错误信息，但有两个条件：<span style="color: #ff0000;">一是跨域脚本的服务器必须通过 <code>Access-Controll-Allow-Origin</code> 头信息允许当前域名可以获取错误信息，二是当前域名的 <code>script</code>标签也必须指明 <code>src</code> 属性指定的地址是支持跨域的地址，也就是 crossorigin 属性。</span>

但事情还是不够明朗，看起来报个错也没什么啊，为什么[浏览器](https://www.w3cdoc.com)或者说协议这么龟毛，非要规定默认页面是不能获取跨域脚本错误信息的呢？

这其实跟网络安全有关，不妨举一个例子来说明。

[我们](https://www.w3cdoc.com)先假设[浏览器](https://www.w3cdoc.com)默认可以将跨域脚本的错误信息返回。

这个时候我在我的博客里写下如下代码：

<div id="crayon-5bf4f6acaa283287486314" class="crayon-syntax crayon-theme-visual-assist crayon-font-monaco crayon-os-mac print-yes notranslate crayon-wrapped" data-settings=" no-popup minimize scroll-mouseover wrap">
  <div class="crayon-toolbar" data-settings=" show">
    <div class="crayon-tools">
      <div class="crayon-button crayon-nums-button crayon-pressed" title="Toggle Line Numbers">
        <div class="crayon-button-icon">
          <pre class="pure-highlightjs"><code class="null">&lt;script src="https://某个银行/会员信息网址"&gt;
&lt;script src="https://某个银行2/会员信息网址"&gt;
...
</code></pre>

          
            注意 src 里面提到地址，都是 HTML 页面的地址，当成 JS 来执行，肯定是会报错的。
          
        </div>
      </div>
    </div>
  </div>
</div>

因为[我们](https://www.w3cdoc.com)假设[浏览器](https://www.w3cdoc.com)能报具体错误，这个错误可能是类似于：

1. “请登录” is undefined.  
2. “您好” is undefined.

[我们](https://www.w3cdoc.com)通过报错信息的不一致，可能可以推断出当前访问我博客的会员在某某银行是否有账号。虽然不是什么大问题，但隐私的确是泄漏了，如果我是攻击者我可能会通过会员在某家银行有账号，『精准』推送相关的钓鱼网站给他。

说清楚了来龙去脉，[我们](https://www.w3cdoc.com)就可以更好的判断，[我们](https://www.w3cdoc.com)是否真的需要给 `script` 标签加上 crossorigin 属性了。另外除了 `script`，所有能引入跨域资源的标签包括 `link` 和 `img` 之类，都有一样的属性。

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

 [1]: https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes
