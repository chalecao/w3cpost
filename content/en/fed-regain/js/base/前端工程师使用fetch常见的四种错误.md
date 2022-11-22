---
title: 前端工程师使用fetch常见的四种错误



---
查看<a href="https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2Fcameron-nokes%2F4-common-mistakes-front-end-developers-make-when-using-fetch-1f974f9d1aa1" rel="nofollow noopener noreferrer">原文</a>

``<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FFetch_API%2FUsing_Fetch" rel="nofollow noopener noreferrer">fetch</a> 是浏览器中发送http请求最流行方式。它不仅仅是一个比<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequest" rel="nofollow noopener noreferrer">XMLHttpRequest</a>更好、更符合人体工程学的API，它还带来了许多令人兴奋的新功能，比如响应流、对凭证和CORS请求的更多控制，以及与ServiceWorkers和缓存API的集成

我自己也在研究并使用它，同时也见证了<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FFetch_API%2FUsing_Fetch" rel="nofollow noopener noreferrer">fetch</a>的成长(原文：广泛使用), 发现即使有经验的开发者也会犯一些比较常见的错误。我认为这在很大程度上与<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FFetch_API%2FUsing_Fetch" rel="nofollow noopener noreferrer">fetch</a>的API在表面上看起来它的行为模式都很像jQuery <a href="https://link.juejin.im/?target=http%3A%2F%2Fapi.jquery.com%2Fjquery.ajax%2F" rel="nofollow noopener noreferrer">$.ajax</a>、angularJS的<a href="https://link.juejin.im/?target=https%3A%2F%2Fdocs.angularjs.org%2Fapi%2Fng%2Fservice%2F%24http" rel="nofollow noopener noreferrer">$http</a>、 <a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios" rel="nofollow noopener noreferrer">axios</a>等。它们之间有一些重要的区别，而这些区别大多源于<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FFetch_API%2FUsing_Fetch" rel="nofollow noopener noreferrer">fetch</a>作为底层网络请求的原型设计

## 四类错误

### <a name="t0"></a><a name="t0"></a>1.认为一旦发生http错误，promise 就会 被 reject

Fetch是基于promise的，因此比较容易想到，如果服务器返回<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FStatus" rel="nofollow noopener noreferrer">http的错误状态码</a>，像404或是500,Promise就会被拒绝，就像原始的XMLHttpRequest一样；但fetch并不是这样的——它仅仅在发生“network error（网络错误）”才会被拒绝(这是一个令人困惑的术语，但规范是这么说的)。如果可以服务器获得http错误状态，则表明服务器正常工作且在处理请求，而“network error（网络错误）”表示根本无法到达服务器(例如连接拒绝或名称未解析)或请求配置有错误(错误的请求地址)。

例如, `ftp` 协议 并不支持fetch,所以它会返回一个被rejected 的 promise :

<pre class="EnlighterJSRAW" data-enlighter-language="null">fetch('ftp://example.com') .catch(err =&gt; console.error('Caught error: ', err))</pre>

&nbsp;

但是请求一个返回404错误的URL并有没有发生错误（即类似404这类错误fetch返回的并不是rejected）

<pre class="EnlighterJSRAW" data-enlighter-language="null">fetch('https://jsonplaceholder.typicode.com/404')
.then(res =&gt; console.log('response: ', res)) .catch(console.error)</pre>

我想对大部分开发者来说，http返回的错误对web应用程序处理一个rejected的promise是非常有用的。为此(fetch对http错误的处理方式)，我们仅仅需要对验证`ok`  属性的值 ，如果  `ok`

的值为`false` ，则 reject

<pre class="EnlighterJSRAW" data-enlighter-language="null">fetch('https://jsonplaceholder.typicode.com/404')
.then(res =&gt; {
if(res.ok) {
    return res;
} else {
    throw Error(`Request rejected with status ${res.status}`);
}})
.catch(console.error)</pre>

### <a name="t1"></a><a name="t1"></a>2.忘记包含credentials

与XHR不同，fetch在默认情况下不包括请求中的任何cookie。因此，如果针对您的API的请求需要基于cookie的授权(大多数web应用程序都需要)，那么必须有这个选项，否则您的调用可能会返回401未授权。

这非常简单：

<pre><code class="language-javascript hljs">&lt;code class="hljs javascript copyable">fetch(&lt;span class="hljs-string">'/url'&lt;/span>, { &lt;span class="hljs-attr">credentials&lt;/span>: &lt;span class="hljs-string">'include'&lt;/span> })</code>&lt;/code></pre>

注意，如果您正在使用fetch polyfill，那么(不幸的是)您可能会偶尔地忘记这一点，一切看起来就好像你已经正在使用`credentials: 'include'`一样，这是因为它只是在底层使用XHR，而XHR自动具有这种行为。

### <a name="t2"></a><a name="t2"></a>3.上传JSON时忘记设置\`Content-Type\` to \`application/json\`

$http, axios和其它http工具在默认情况下会为您设置此头，因此很容易忘记。

<pre class="EnlighterJSRAW" data-enlighter-language="null">fetch('https://cameronnokes.com/slack-ron-swanson-quote-bot/ron', {

method: 'POST',

body: JSON.stringify({text: 'bacon'}),

headers: {'Content-Type': 'application/json'}})

.then(res =&gt; res.json())

.then(console.log)</pre>

如果不包含该头，服务器可能会返回一个`400`个`Bad Request` ，因为`endpoint`不支持纯文本内容类型，或者无法处理这种文本的body，这取决于API的实现。但无论如何，您的API可能会返回HTTP错误状态。

### <a name="t3"></a><a name="t3"></a>4.使用字符串手动拼接一个复杂的查询参数

我经常看到类似这样的代码：

<pre class="hljs bash"><code class="hljs bash copyable">fetch(&lt;span class="hljs-string">'/endpoint?foo=${n &gt; 1 ? 123 : 456}&bar=abc&query=${encodeURIComponent(someString || '&lt;/span>&lt;span class="hljs-string">')}&lt;/span></code></pre>

这并不完全是糟糕的，但我认为如果我们让新的URLSearchParams类和少量lodash为我们做更多的工作，它会更容易阅读，更少出错。

URLSearchParams类非常棒，可以正确地处理编码、将对象连接到字符串等等。我认为这样更容易阅读和维护。

## 总结：

Fetch很棒，但是要负责任地去享受

======================= 以下为译者添加=========================

伴随<a href="https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFetch_API%2FUsing_Fetch" rel="nofollow noopener noreferrer">fetch</a>的问世及发展，目前在生产环境使用fetch的企业越来越多。开源社区上有关fetch polyfilll已经多款供选，又因其基于Promise，以下可以完美的解决其兼容性问题(特别是IE)，仅参考：

* `由于 IE8 是 ES3，需要引入 ES5````` 的`polyfill`:`es5-shim`,`es5-sham`
* 引入 `Promise` 的 `polyfill`: `es6-promise`
* 引入 `fetch` 探测库：`fetch-detector`
* 引入 `fetch` 的 `polyfill`: `fetch-ie8`
* 可选：如果你还使用了 `jsonp`，引入 `fetch-jsonp`
* 可选：开启 `Babel` 的 `runtime` 模式，现在就使用 `async`/`await`

<span style="color: #4e5980; font-family: Menlo, Monaco, Consolas, Courier New, monospace;">fetch </span>的好处无需多语，但fetch也存在一些问题，例如不支持timeout，不支持 progress，特别是fetch在跨域问题上与传统跨域的处理方式的区别，社区中都对应的解决方案，此文不一一列举。正如原谅作者所言：负责任地去享受
