---
title: 关于ajax请求头设置


date: 2020-02-18T08:16:42+00:00
url: /javascriptnodejs/5614.html
views:
  - 841


---
今天同事说想改下host请求头，之前好像记得不能修改这个header，找了一下资源，记一下。下面这些请求头设置是不会生效的。

<pre class="EnlighterJSRAW" data-enlighter-language="null">var forbiddenRequestHeaders = [
"accept-charset",
"accept-encoding",
"access-control-request-headers",
"access-control-request-method",
"connection",
"content-length",
"content-transfer-encoding",
"cookie",
"cookie2",
"date",
"expect",
"host",
"keep-alive",
"origin",
"referer",
"te",
"trailer",
"transfer-encoding",
"upgrade",
"via" ];</pre>

想改的话也有办法，浏览器插件好像可以做到。记得有一个iheader插件。