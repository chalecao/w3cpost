---
title: HTTP协议以及HTTP2.0/1.1/1.0区别



---
## 一.简介 {#一.简介}

摘自百度百科:

> 超文本传输协议（HTTP，HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议。所有的WWW文件都必须遵守这个标准。设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。

* HTTP属于[OSI网络七层协议模型][1]中的&#8221;最上层&#8221;:应用层。由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。
* HTTP默认端口号为80。它也可以承载在TLS和SSL之上，通过加密、认证的方式实现数据传输的安全，称为HTTPS，HTTPS默认端口号为443。
* 早期HTTP用于传输网页HTML文件，发展到现在，应用变得广泛，客户端软件（PC，Android,iOS等）大部分通过HTTP传输数据。

## 二.通信过程 {#二.通信过程}

角色:客户端和服务端

* 首先，客户端发起一个与服务器的TCP连接，建立连接之后，A中的[浏览器](https://www.w3cdoc.com)进程就可以通过Socket访问该TCP连接。
* 客户端A进程通过该TCP连接向服务端B发送一个HTTP请求报文(ASCII码)，报文中包含（百度首页为例）  
    > _请求行(request line)_ : 3个字段:方法字段、URL字段和HTTP版本字段  
    > GET / HTTP/1.1
    >
    > _请求头(header line)_ : 位于请求行之后
    >
    > Host www.baidu.com  
    > Connection keep-alive  
    > Cache-Control max-age=0
    >
    > Upgrade-Insecure-Requests 1
    >
    > User-Agent Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_12\_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
    >
    > Accept text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8
    >
    > Referer [https://www.baidu.com/s?wd=Https&rsv\_spt=1&rsv\_iqid=0xc28e80ff00002ae1&issp=1&f=8&rsv\_bp=1&rsv\_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome\_pg&rsv\_enter=0&oq=Http%25E5%258D%258F%25E8%25AE%25AE&rsv\_pq=de652d0900004bfb&inputT=691&rsv\_sug3=47&rsv\_sug1=48&rsv\_sug7=100&rsv_sug4=756][2]
    >
    > Accept-Encoding gzip, deflate, br
    >
    > Accept-Language zh-CN,zh;q=0.9,en;q=0.8
    >
    > _空行_ :  
    > 位于请求头和请求体之间，必须要有
    >
    > _请求体(entity body)_ : 在使用GET方法时，请求体为空。POST时可以类似如下格式:
    >
    > username=test&password=123123

* HTTP服务器进程通过Socket接收到该请求报文，从存储器(内存或磁盘)中得到URL字段中指定的对象(如:/index.html)，然后封装到响应报文中，通过Socket发送到客户端。
    响应报文:

    > 状态行(status line) :
    >
    > HTTP/1.1 200 OK
    >
    > 响应头(header line):
    >
    > Cache-Control: private
    >
    > Connection: Keep-alive
    >
    > Content-Encoding: gzip
    >
    > Content-Type: text/html;charset=utf-8
    >
    > 
    >
    > Expires: Thu, 29 Mar 2018 16:01:46 GMT
    >
    > Set-Cookie: BD_HOME=1; path=/
    >
    > 空行:
    >
    > 响应体(entity body):  
    > <html>&#8230;</html>

* 发送响应报文后，服务器进程通知TCP断开TCP连接(只是通知，此时TCP连接不一定关闭)，TCP发送完数据后，实际断开该连接。
* 客户端收到响应报文后，将响应实体中的文件信息提取出来，用[浏览器](https://www.w3cdoc.com)引擎绘制或者通过别的进程处理该数据。

实际中，可能一个HTML中有许多资源引用(如CSS文件，图片，JS文件等),对于每一个引用对象，重复该过程(HTTP1.0短连接)

## 三.HTTP1.0/1.1/2.0区别 {#三.http1.01.12.0区别}

* HTTP1.1默认使用长连接，可有效减少TCP的三次握手开销。
* HTTP 1.1支持只发送header信息(不带任何body信息)，如果服务器认为客户端有权限请求服务器，则返回100，否则返回401。客户端如果接受到100，才开始把请求body发送到服务器。这样当服务器返回401的时候，客户端就可以不用发送请求body了，节约了带宽。另外HTTP还支持传送内容的一部分。这样当客户端已经有一部分的资源后，只需要跟服务器请求另外的部分资源即可。这是支持文件断点续传的基础。
* HTTP1.0是没有host域的，HTTP1.1才支持这个参数。
* HTTP2.0使用多路复用技术(Multiplexing),多路复用允许同时通过单一的 HTTP/2 连接发起多重的请求-响应消息。  
    &#8220;HTTP1.1在同一时间对于同一个域名的请求数量有限制，超过限制就会阻塞请求&#8221;。多路复用底层采用&#8221;增加二进制分帧层&#8221;的方法，使得不改变原来的语义、首部字段的情况下提高传输性能，降低延迟。  
    二进制分帧将所有传输信息分割为更小的帧，用二进制进行编码，多个请求都在同一个TCP连接上完成，可以承载任意数量的双向数据流。HTTP/2更有效的使用TCP连接，得到性能上的提升。
    网上不错的一个过程图片:  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/951506-20180330005255437-1566386281.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/951506-20180330005255437-1566386281.jpg?x-oss-process=image/format,webp" />  

  * HTTP/2新增首部压缩（Header Compression）:采用HPACK算法
  * HTTP/2新增服务端推送（Header Compression）

 [1]: https://www.cnblogs.com/Robin-YB/p/6668762.html
 [2]: https://www.baidu.com/s?wd=Https&rsv_spt=1&rsv_iqid=0xc28e80ff00002ae1&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&oq=Http%25E5%258D%258F%25E8%25AE%25AE&rsv_pq=de652d0900004bfb&inputT=691&rsv_sug3=47&rsv_sug1=48&rsv_sug7=100&rsv_sug4=756
