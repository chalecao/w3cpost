---
title: 什么时候会发送options请求



---
# 一、简介

出于安全考虑，并不是所有域名访问后端服务都可以。其实在正式跨域之前，[浏览器](https://www.w3cdoc.com)会根据需要发起一次预检（也就是option请求），用来让服务端返回允许的方法（如get、post），被跨域访问的Origin（来源或者域），还有是否需要Credentials(认证信息)等。那么[浏览器](https://www.w3cdoc.com)在什么情况下能预检呢？

# 二、两种请求方式

[浏览器](https://www.w3cdoc.com)将CORS请求分为两类：简单请求（simple request）和非简单请求（not-simple-request）,简单请求[浏览器](https://www.w3cdoc.com)不会预检，而非简单请求会预检。这两种方式怎么区分？

同时满足下列三大条件，就属于简单请求，否则属于非简单请求

1.请求方式只能是：GET、POST、HEAD

2.HTTP请求头限制这几种字段：Accept、Accept-Language、Content-Language、Content-Type、Last-Event-ID

3.Content-type只能取：application/x-www-form-urlencoded、multipart/form-data、text/plain

对于简单请求，[浏览器](https://www.w3cdoc.com)直接请求，会在请求头信息中，增加一个origin字段，来说明本次请求来自哪个源（协议+域名+端口）。服务器根据这个值，来决定是否同意该请求，服务器返回的响应会多几个头信息字段，如图所示：上面的头信息中，三个与CORS请求相关，都是以Access-Control-开头。

1.Access-Control-Allow-Origin：该字段是必须的，* 表示接受任意域名的请求，还可以指定域名

2.Access-Control-Allow-Credentials：该字段可选，是个布尔值，表示是否可以携带cookie，（注意：如果Access-Control-Allow-Origin字段设置*，此字段设为true无效）

3.Access-Control-Allow-Headers：该字段可选，里面可以获取Cache-Control、Content-Type、Expires等，如果想要拿到其他字段，就可以在这个字段中指定。比如图中指定的GUAZISSO

非简单请求是对那种对服务器有特殊要求的请求，比如请求方式是PUT或者DELETE，或者Content-Type字段类型是application/json。都会在正式通信之前，增加一次HTTP请求，称之为预检。[浏览器](https://www.w3cdoc.com)会先询问服务器，当前网页所在域名是否在服务器的许可名单之中，服务器允许之后，[浏览器](https://www.w3cdoc.com)会发出正式的XMLHttpRequest请求，否则会报错。（备注：之前碰到预检请求后端没有通过，就不会发正式请求，然后找了好久原因，原来后端给忘了设置&#8230;）Java后端实现拦截器，排除Options

JAVA代码片段 就Content-Type为application/json为例：对比两张图片，一次预检请求，一 次正式请求：

预检请求 正式请求 很明显，请求头中预检请求不会携带cookie，正式请求会携带cookie和参数。跟普通请求一样，响应头也会增加同样字段。

一旦服务器通过了“预检”请求，以后每次[浏览器](https://www.w3cdoc.com)正常的CORS请求，就都跟简单请求一样。<h1 class="article-title" data-v-4f8894a8="">什么时候会发送options请求</h1>

<div>
 最近写的项目，应用里所有的ajax请求都发送了2遍。由于新项目，基础模块是新搭的，所以出现一些奇葩问题也是意料之中，啊终于第一次在chrome的devTools遇见了活的options请求。
  <figure>
 <img loading="lazy" width="877" height="551" class="alignnone size-full wp-image-4803 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png?x-oss-process=image/format,webp 877w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_188/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_483/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31660550b6a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_503/format,webp 800w" sizes="(max-width: 877px) 100vw, 877px" />
  <figcaption></figcaption></figure>
  <h4 class="heading" data-id="heading-1">
    1.1 第1次请求
  </h4>
 这里首先发送了一次额外的options请求，在[浏览器](https://www.w3cdoc.com)里看到请求request header 和 response header的信息如下：
  
  <h4 class="heading" data-id="heading-2">
    （1）预检请求头request header的关键字段：
  </h4>
  <table>
    <tr>
      <th>
        Request Header
      </th>

      <th>
        作用
      </th>
    </tr>
    
    <tr>
      <td>
       Access-Control-Request-Method
      </td>
      
      <td>
        告诉服务器实际请求所使用的 HTTP 方法
      </td>
    </tr>
    
    <tr>
      <td>
       Access-Control-Request-Headers
      </td>
      
      <td>
        告诉服务器实际请求所携带的自定义首部字段，本次实际请求首部字段中content-type为自定义
      </td>
    </tr>
  </table>
 服务器基于从预检请求头部获得的信息来判断，是否接受接下来的实际请求。
  <figure>
 <img loading="lazy" width="597" height="222" class="alignnone size-full wp-image-4804 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d316613af3f8.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d316613af3f8.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d316613af3f8.png?x-oss-process=image/format,webp 597w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d316613af3f8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_112/format,webp 300w" sizes="(max-width: 597px) 100vw, 597px" />
  <figcaption></figcaption></figure>
  <h4 class="heading" data-id="heading-3">
    （2）预检响应头response header的关键字段：
  </h4>
  <table>
    <tr>
      <th>
        response header
      </th>

      <th>
        作用
      </th>
    </tr>
    
    <tr>
      <td>
       Access-Control-Allow-Methods
      </td>
      
      <td>
        返回了服务端允许的请求，包含GET/HEAD/PUT/PATCH/POST/DELETE
      </td>
    </tr>
    
    <tr>
      <td>
       Access-Control-Allow-Credentials
      </td>
      
      <td>
        允许跨域携带cookie（跨域请求要携带cookie必须设置为true）
      </td>
    </tr>
    
    <tr>
      <td>
       Access-Control-Allow-Origin
      </td>
      
      <td>
        允许跨域请求的域名，这个可以在服务端配置一些信任的域名白名单
      </td>
    </tr>
    
    <tr>
      <td>
       Access-Control-Request-Headers
      </td>
      
      <td>
        客户端请求所携带的自定义首部字段content-type
      </td>
    </tr>
  </table>
 此次OPTIONS请求返回了响应头的内容，但没有返回响应实体response body内容。
  <figure>
 <img loading="lazy" width="980" height="402" class="alignnone size-full wp-image-4805 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png?x-oss-process=image/format,webp 980w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_123/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_315/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31661fdb4ed.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_328/format,webp 800w" sizes="(max-width: 980px) 100vw, 980px" />
  <figcaption></figcaption></figure>
  <h4 class="heading" data-id="heading-4">
    1.2 第2次请求
  </h4>
 这是本来要发送的请求，如图所示是普通的post请求。其中Content-Type的<em>application/json</em>是此次和后端约定的请求内容格式，这个也是后面讲到为什么会发送options请求的原因之一。
  <figure>
 <img loading="lazy" width="866" height="562" class="alignnone size-full wp-image-4807 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png?x-oss-process=image/format,webp 866w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_195/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_498/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d31662c447a7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_519/format,webp 800w" sizes="(max-width: 866px) 100vw, 866px" />
  <figcaption></figcaption></figure>
  <h3 class="heading" data-id="heading-5">
    2 关于OPTIONS请求
  </h3>
 从很多资料[我们](https://www.w3cdoc.com)可以了解到使用OPTIONS方法对服务器发起请求，可以检测服务器支持哪些 HTTP 方法。但是这次[我们](https://www.w3cdoc.com)并没有主动去发起OPTIONS请求，那OPTIONS请求为何会自动发起？
  
  <h4 class="heading" data-id="heading-6">
    2.1 OPTIONS请求自动发起
  </h4>
 MDN的<a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FAccess_control_CORS" target="_blank" rel="nofollow noopener noreferrer">CORS</a>一文中提到：
  
  <blockquote>
    
      规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），[浏览器](https://www.w3cdoc.com)必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。
    
  </blockquote>
 所以这个跨域请求触发了[浏览器](https://www.w3cdoc.com)自动发起OPTIONS请求，看看此次跨域请求具体触发了哪些条件。
  
  <h4 class="heading" data-id="heading-7">
    2.2 跨域请求时，OPTIONS请求触发条件
  </h4>
  <table>
    <tr>
      <th>
        CORS预检请求触发条件
      </th>

      <th>
        本次请求是否触发该条件
      </th>
    </tr>
    
    <tr>
      <td>
        1. 使用了下面任一HTTP 方法：
      </td>
      
      <td>
      </td>
    </tr>
    
    <tr>
      <td>
        PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH
      </td>
      
      <td>
        否，本次为post请求
      </td>
    </tr>
    
    <tr>
      <td>
        2. 人为设置了以下集合之外首部字段：
      </td>
      
      <td>
      </td>
    </tr>
    
    <tr>
      <td>
        Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width
      </td>
      
      <td>
        否，未设置其他头部字段
      </td>
    </tr>
    
    <tr>
      <td>
        3. Content-Type 的值不属于下列之一:
      </td>
      
      <td>
      </td>
    </tr>
    
    <tr>
      <td>
        application/x-www-form-urlencoded、multipart/form-data、text/plain
      </td>
      
      <td>
        是，为application/json
      </td>
    </tr>
  </table>
 由于修改了Content-Type为application/json，触发了CORS预检请求。
  
  <h2 class="heading" data-id="heading-8">
    3 优化OPTIONS请求：Access-Control-Max-Age 或者 避免触发
  

 可见一旦达到触发条件，跨域请求便会一直发送2次请求，这样增加的请求数是否可优化呢？答案是可以，OPTIONS预检请求的结果可以被缓存。
  
  <blockquote>
    
      Access-Control-Max-Age这个响应首部表示 preflight request （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存的最长时间，单位是秒。(MDN)
    
  </blockquote>
 如果值为 -1，则表示禁用缓存，每一次请求都需要提供预检请求，即用OPTIONS请求进行检测。
  
 评论区的朋友提醒了，尽量避免不要触发OPTIONS请求，上面例子中把content-type改掉是可以的。在其他场景，比如跨域并且业务有自定义请求头的话就很难避免了。现在使用的axios或者superagent等第三方ajax插件，如果出现CORS预检请求，可以看看默认配置或者二次封装是否规范。
  
  <h2 class="heading" data-id="heading-9">
    4 总结
  

 OPTIONS请求即预检请求，可用于检测服务器允许的http方法。当发起跨域请求时，由于安全原因，触发一定条件时[浏览器](https://www.w3cdoc.com)会在正式请求之前自动先发起OPTIONS请求，即CORS预检请求，服务器若接受该跨域请求，[浏览器](https://www.w3cdoc.com)才继续发起正式请求。
</div>
