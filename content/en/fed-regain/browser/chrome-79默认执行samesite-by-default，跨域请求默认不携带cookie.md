---
title: Chrome 79+默认执行SameSite-by-default，跨域请求默认不携带cookie

---
之前没太注意，今天有同事反馈说跨域请求跳登录了，查了下没有携带cookie。于是乎，我查了下MDN关于[set-cookie][1]

## 关于设置cookie

一般是通过请求后端接口，后端接口返回set-cookie请求头，[浏览器](https://www.w3cdoc.com)会自动设置对应cookie，[浏览器](https://www.w3cdoc.com)默认是阻止js操作set-cookie的请求头的。

<p id="yHeWXIa">
  <img loading="lazy" class="alignnone  wp-image-6097 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/format,webp" alt="" width="688" height="212" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_92/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_246/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fabceebde269.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_236/format,webp 768w" sizes="(max-width: 688px) 100vw, 688px" />
</p>

示例：

<pre class="syntaxbox notranslate">Set-Cookie: &lt;cookie-name>=&lt;cookie-value>
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Expires=&lt;date>
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Max-Age=&lt;non-zero-digit>
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Domain=&lt;domain-value>
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Path=&lt;path-value>
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Secure
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; HttpOnly

Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; SameSite=Strict
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; SameSite=Lax
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; SameSite=None

// Multiple attributes are also possible, for example:
Set-Cookie: &lt;cookie-name>=&lt;cookie-value>; Domain=&lt;domain-value>; Secure; HttpOnly</pre>

## 相关参数

`Secure` <span class="inlineIndicator optional optionalInline">Optional ，</span>Cookie is only sent to the server when a request is made with the `https:` scheme (except on localhost), and therefore is more resistent to <a class="external" href="https://wiki.developer.mozilla.org/en-US/docs/Glossary/MitM" rel="noopener">man-in-the-middle</a> attacks.

> <p class="note">
>   <strong>Note:</strong> Do not assume that <code>Secure</code> prevents all access to sensitive information in cookies (session keys, login details, etc.). Cookies with this attribute can still be read/modified with access to the client&#8217;s hard disk, or from JavaScript if the <code>HttpOnly</code> cookie attribute is not set.
> </p>
>
> <p class="note">
>   <strong>Note:</strong> Insecure sites (<code>http:</code>) can&#8217;t set cookies with the <code>Secure</code> attribute (since Chrome 52 and Firefox 52). For Firefox, the <code>https:</code> requirements are ignored when the <code>Secure</code> attribute is set by localhost (since Firefox 75).
> </p>

secure 参数可选，只有是HTTPS请求的响应才能设置secure属性，可以很好地防止劫持。需要注意的是这个参数并不能保证cookie是安全的，cookie是存在客户端硬盘的，其他软件或者javascript仍然可以读取或者修改。chrome >=52, FireFox >= 52版本[浏览器](https://www.w3cdoc.com)，在http请求中是不能设置secure属性的cookie的

`HttpOnly` <span class="inlineIndicator optional optionalInline">Optional，</span>Forbids JavaScript from accessing the cookie, for example, through the [`Document.cookie`][2] property. Note that a cookie that has been created with HttpOnly will still be sent with JavaScript-initiated requests, e.g. when calling [`XMLHttpRequest.send()`][3] or [`fetch()`][4]. This mitigates attacks against cross-site scripting ([XSS][5]).

httponly属性可选，禁止JavaScript访问cookie，比如document.cookie，但是JavaScript发起的ajax或fetch请求还是会默认带上cookie

`SameSite=<samesite-value>` <span class="inlineIndicator optional optionalInline">Optional</span>

* `Strict`: The browser sends the cookie only for same-site requests (that is, requests originating from the same site that set the cookie). If the request originated from a different URL than the current one, no cookies with the `SameSite=Strict` attribute are sent.
* `Lax`: The cookie is withheld on cross-site subrequests, such as calls to load images or frames, but is sent when a user navigates to the URL from an external site, such as by following a link.
* `None`: The browser sends the cookie with both cross-site and same-site requests.

Asserts that a cookie must not be sent with cross-origin requests, providing some protection against cross-site request forgery attacks ([CSRF][6]).Browsers are migrating to have <a class="external" href="https://www.chromestatus.com/feature/5088147346030592" rel="noopener">cookies default to <code>SameSite=Lax</code></a>. If a cookie is needed to be sent cross-origin, opt out of the `SameSite` restriction using the `None` value. The `None` value requires the [`Secure`][7] attribute.

samesite可选值有strict、lax和none，

* strict表示只有同域请求才会带cookie；
* lax表示跨域的子请求不会带cookie（比如加载图片、iframe中的请求），只有跳转链接用[浏览器](https://www.w3cdoc.com)打开url这种主请求才会带cookie
* none表示不管是否跨域都会带cookie

需要注意跨域请求带cookie需要放置CSRF攻击，[浏览器](https://www.w3cdoc.com)后面逐渐会默认给cookie设置成lax，跨域时候子请求就不会再默认带cookie，除非samesite设置成none，同时新的[浏览器](https://www.w3cdoc.com)要求设置secure属性，才能设置samesite为none

这里就找到了根本原因，肯定是新版本[浏览器](https://www.w3cdoc.com)安全性做了提升，

## Chrome的same-site规则

same-site规则原文看这里（<https://www.chromium.org/updates/same-site>）

> Starting in Chrome 80, cookies that do not specify a SameSite attribute will be treated as if they were SameSite=Lax with the additional behavior that they will still be included in [POST requests][8] to ease the transition for existing sites. Cookies that still need to be delivered in a cross-site context can explicitly request SameSite=None, and must also be marked Secure and delivered over HTTPS. We will provide policies if you need to configure Chrome Browser to temporarily revert to legacy SameSite behavior.
>
> &#8230;
>
> The new SameSite rules will become the default behavior on Stable in Chrome 80, but the changes will be limited to pre-Stable versions of Chrome until then.
>
> &#8230;
>
> These policies will be made available starting in <span style="text-decoration: line-through;">Chrome 80</span>. Chrome 79. **(See Oct 2, 2019 update.)**

摘抄了一部分，可以看到Chrome79+之后，默认就是SameSite:lax了，所以就不支持跨域子请求携带cookie了。

解决方案上面已经给了。当然还有其他的绕开的方案。

 [1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 [2]: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 [3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
 [4]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch
 [5]: https://developer.mozilla.org/en-US/docs/Glossary/XSS
 [6]: https://developer.mozilla.org/en-US/docs/Glossary/CSRF
 [7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Secure
 [8]: https://www.chromestatus.com/feature/5088147346030592
