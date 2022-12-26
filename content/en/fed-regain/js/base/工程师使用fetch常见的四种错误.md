---
title: 工程师使用fetch常见的四种错误
weight: 3
---
查看原文

fetch 是[浏览器](https://www.w3cdoc.com)中发送http请求最流行方式。它不仅仅是一个比XMLHttpRequest更好、更符合人体工程学的API，它还带来了许多令人兴奋的新功能，比如响应流、对凭证和CORS请求的更多控制，以及与ServiceWorkers和缓存API的集成

我自己也在研究并使用它，同时也见证了fetch的成长(原文：广泛使用), 发现即使有经验的开发者也会犯一些比较常见的错误。我认为这在很大程度上与fetch的API在表面上看起来它的行为模式都很像jQuery $.ajax、angularJS的$http、 axios等。它们之间有一些重要的区别，而这些区别大多源于fetch作为底层网络请求的原型设计

## 四类错误

### 认为一旦发生http错误，promise就会被reject

Fetch是基于promise的，因此比较容易想到，如果服务器返回http的错误状态码，像404或是500,Promise就会被拒绝，就像原始的XMLHttpRequest一样；但fetch并不是这样的——它仅仅在发生“network error（网络错误）”才会被拒绝(这是一个令人困惑的术语，但规范是这么说的)。如果可以服务器获得http错误状态，则表明服务器正常工作且在处理请求，而“network error（网络错误）”表示根本无法到达服务器(例如连接拒绝或名称未解析)或请求配置有错误(错误的请求地址)。

例如, `ftp` 协议 并不支持fetch,所以它会返回一个被rejected 的 promise :

```
fetch('ftp://example.com')
.catch(err => console.error('Caught error: ', err))
```

但是请求一个返回404错误的URL并有没有发生错误（即类似404这类错误fetch返回的并不是rejected）

```
fetch('https://jsonplaceholder.typicode.com/404')
.then(res => console.log('response: ', res)) .catch(console.error)
```

我想对大部分开发者来说，http返回的错误对web应用程序处理一个rejected的promise是非常有用的。为此(fetch对http错误的处理方式)，[我们](https://www.w3cdoc.com)仅仅需要对验证`ok`  属性的值 ，如果  `ok`

的值为`false` ，则 reject

```
fetch('https://jsonplaceholder.typicode.com/404')
.then(res => {
if(res.ok) {
    return res;
} else {
    throw Error(`Request rejected with status ${res.status}`);
}})
.catch(e=>{
    console.error(e.message, e)
})
```

### 忘记包含credentials

与XHR不同，fetch在默认情况下不包括请求中的任何cookie。因此，如果针对您的API的请求需要基于cookie的授权(大多数web应用程序都需要)，那么必须有这个选项，否则您的调用可能会返回401未授权。

这非常简单：

```
fetch('/url', { credentials: 'include' })
```

注意，如果您正在使用fetch polyfill，那么(不幸的是)您可能会偶尔地忘记这一点，一切看起来就好像你已经正在使用`credentials: 'include'`一样，这是因为它只是在底层使用XHR，而XHR自动具有这种行为。

### 上传JSON时忘记设置
上传JSON时忘记设置`Content-Type` to `application/json`

$http, axios和其它http工具在默认情况下会为您设置此头，因此很容易忘记。

```
fetch('https://cameronnokes.com/slack-ron-swanson-quote-bot/ron', {
    method: 'POST',
    body: JSON.stringify({text: 'bacon'}),
    headers: {'Content-Type': 'application/json'}})
.then(res => res.json())
.then(console.log)
```

如果不包含该头，服务器可能会返回一个`400`个`Bad Request` ，因为`endpoint`不支持纯文本内容类型，或者无法处理这种文本的body，这取决于API的实现。但无论如何，您的API可能会返回HTTP错误状态。

### 使用字符串手动拼接一个复杂的查询参数

我经常看到类似这样的代码：

```
fetch('/endpoint?foo=${n > 1 ? 123 : 456}&bar=abc&query=${encodeURIComponent(someString || '')}
```

这并不完全是糟糕的，但我认为如果[我们](https://www.w3cdoc.com)让新的URLSearchParams类和少量lodash为[我们](https://www.w3cdoc.com)做更多的工作，它会更容易阅读，更少出错。

URLSearchParams类非常棒，可以正确地处理编码、将对象连接到字符串等等。我认为这样更容易阅读和维护。

## 总结：

Fetch很棒，但是要负责任地去享受

伴随fetch的问世及发展，目前在生产环境使用fetch的企业越来越多。开源社区上有关fetch polyfilll已经多款供选，又因其基于Promise，以下可以完美的解决其兼容性问题(特别是IE)，仅参考：

* 由于 IE8 是 ES3，需要引入 ES5 的`polyfill`:`es5-shim`,`es5-sham`
* 引入 `Promise` 的 `polyfill`: `es6-promise`
* 引入 `fetch` 探测库：`fetch-detector`
* 引入 `fetch` 的 `polyfill`: `fetch-ie8`
* 可选：如果你还使用了 `jsonp`，引入 `fetch-jsonp`
* 可选：开启 `Babel` 的 `runtime` 模式，现在就使用 `async`/`await`

fetch 的好处无需多语，但fetch也存在一些问题，例如不支持timeout，不支持 progress，特别是fetch在跨域问题上与传统跨域的处理方式的区别，社区中都对应的解决方案，此文不一一列举。