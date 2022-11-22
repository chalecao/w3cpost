---
title: 说说http状态码和妙用


date: 2019-06-07T05:42:35+00:00
url: /html5css3/4447.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg
fifu_image_alt:
  - 说说http状态码和妙用
views:
  - 871
like:
  - 3


---
<img loading="lazy" width="310" height="163" class="alignnone size-full wp-image-4449 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg?x-oss-process=image/format,webp 310w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf9f88b1376f.jpeg?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_158/format,webp 300w" sizes="(max-width: 310px) 100vw, 310px" />

&nbsp;

# 一些常见的状态码

## 1开头

1xx(临时响应)表示临时响应并需要请求者继续执行操作的状态代码。代码 **说明**

100 (继续) 请求者应当继续提出请求。 服务器返回此代码表示已收到请求的第一部分，正在等待其余部分。

101 (切换协议) 请求者已要求服务器切换协议，服务器已确认并准备切换。

## 2开头

2xx (成功)表示成功处理了请求的状态代码。代码 说明

200 (成功) 服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。

201 (已创建) 请求成功并且服务器创建了新的资源。

202 (已接受) 服务器已接受请求，但尚未处理。

203 (非授权信息) 服务器已成功处理了请求，但返回的信息可能来自另一来源。

204 (无内容) 服务器成功处理了请求，但没有返回任何内容。

205 (重置内容) 服务器成功处理了请求，但没有返回任何内容。

206 (部分内容) 服务器成功处理了部分 GET 请求。

## **3开头**

3xx (重定向) 表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。代码 说明

300 (多种选择) 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。

301 (永久移动) 请求的网页已永久移动到新位置。 服务器返回此响应(对 GET 或 HEAD 请求的响应)时，会自动将请求者转到新位置。

302 (临时移动) 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

303 (查看其他位置) 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。

304 (未修改) 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。

305 (使用代理) 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。

307 (临时重定向) 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

## **4开头**

4xx(请求错误) 这些状态代码表示请求可能出错，妨碍了服务器的处理。代码 说明

400 (错误请求) 服务器不理解请求的语法。

401 (未授权) 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。

403 (禁止) 服务器拒绝请求。

404 (未找到) 服务器找不到请求的网页。

405 (方法禁用) 禁用请求中指定的方法。

406 (不接受) 无法使用请求的内容特性响应请求的网页。

407 (需要代理授权) 此状态代码与 401(未授权)类似，但指定请求者应当授权使用代理。

408 (请求超时) 服务器等候请求时发生超时。

409 (冲突) 服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。

410 (已删除) 如果请求的资源已永久删除，服务器就会返回此响应。

411 (需要有效长度) 服务器不接受不含有效内容长度标头字段的请求。

412 (未满足前提条件) 服务器未满足请求者在请求中设置的其中一个前提条件。

<p id="413">
  413 (请求实体过大) 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。
</p>

414 (请求的 URI 过长) 请求的 URI(通常为网址)过长，服务器无法处理。

415 (不支持的媒体类型) 请求的格式不受请求页面的支持。

416 (请求范围不符合要求) 如果页面无法提供请求的范围，则服务器会返回此状态代码。

417 (未满足期望值) 服务器未满足&#8221;期望&#8221;请求标头字段的要求。

## 5开头

5xx(服务器错误)这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。代码 说明

500 (服务器内部错误) 服务器遇到错误，无法完成请求。

501 (尚未实施) 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。

502 (错误网关) 服务器作为网关或代理，从上游服务器收到无效响应。

503 (服务不可用) 服务器目前无法使用(由于超载或停机维护)。 通常，这只是暂时状态。

504 (网关超时) 服务器作为网关或代理，但是没有及时从上游服务器收到请求。

505 (HTTP 版本不受支持) 服务器不支持请求中所用的 HTTP 协议版本。

&nbsp;

# 状态码妙用

## 204妙用

这里我们主要讨论一下状态码204，在HTTP RFC 2616中关于204的描述如下:

> If the client is a user agent, it SHOULD NOT change its document view from that which caused the request to be sent. This response is primarily intended to allow input for actions to take place without causing a change to the user agent’s active document view, although any new or updated metainformation SHOULD be applied to the document currently in the user agent’s active view.

意思等同于请求执行成功，但是没有数据，浏览器不用刷新页面.也不用导向新的页面。如何理解这段话呢。还是通过例子来说明吧，假设页面上有个form，提交的url为http-204.htm，提交form，正常情况下，页面会跳转到http-204.htm，但是如果http-204.htm的相应的状态码是204，此时页面就不会发生转跳，还是停留在当前页面。另外对于a标签，如果链接的页面响应码为204，页面也不会发生跳转。  
所以对于一些提交到服务器处理的数据，只需要返回是否成功的情况下，可以考虑使用状态码204来作为返回信息，从而省掉多余的数据传输。