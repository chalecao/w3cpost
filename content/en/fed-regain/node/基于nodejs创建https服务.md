---
title: 基于Nodejs创建https服务


---
  


### [][1]为什么用https服务

关于https协议和相关加密算法，请参考我的另一篇：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/30/2014_https/" target="_blank" rel="external">HTTPS详解SSL/TLS</a>。很多情况下，为了保证服务器的安全，比如我在服务端搭建了一个rest服务，这时候如果采用http的协议，很不安全，大部分的做法是http+web json token，但是对于token的处理也是比较棘手的。如果是对外提供开放接口，比如像百度、腾讯这些第三方开放平台接口，比如登录授权这些，可以采用http+OAuth2.0解决。对于自己做得服务器来说，如果涉及到支付交易这些，后台采用HTTPS+session的做法比较好。  
<a></a>  
![基于Nodejs创建https服务][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/</a>

### [][3]HTTP和HTTPS介绍

HTTP: 超文本传输协议 (HTTP-Hypertext transfer protocol) 是一种详细规定了浏览器和万维网服务器之间互相通信的规则，通过因特网传送万维网文档的数据传送协议。

HTTPS:（全称：Hypertext Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 它是一个URI scheme（抽象标识符体系），句法类同http:体系。用于安全的HTTP数据传输。https:URL表明它使用了HTTP，但HTTPS存在不同于HTTP的默认端口及一个加密/身份验证层（在HTTP与TCP之间）。这个系统的最初研发由网景公司进行，提供了身份验证与加密通讯方法，现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。

HTTPS和HTTP的区别

  1. https协议需要到ca申请证书，一般免费证书很少，需要交费。
  2. http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
  3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
  4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

HTTP和HTTPS的介绍，摘自<a href="https://baike.baidu.com/view/14121.htm" target="_blank" rel="external">https://baike.baidu.com/view/14121.htm</a>

在Nodejs中，我们可以通过内置的https库，来实现HTTPS服务器。

Nodejs的HTTPS使用文档：<a href="https://nodejs.org/api/https.html" target="_blank" rel="external">https://nodejs.org/api/https.html</a>

### [][4]基于nodejs搭建https服务器

搭建https服务器首先要安装openssl，用于生成证书。如果你已经安装了git客户端msysgit，这个其中包括了openssl程序。

#### [][5]使用openssl生成证书文件

新生成了3个文件：certificate.pem, certrequest.csr, privatekey.pem

### [][6]修改app.js

#### [][7]启动服务器：

HTTPS访问时会出出现下面的提示：  
![基于Nodejs创建https服务][8]  
这个是因为我们自己生成的证书并不是认证过的，无法确定是合法有效的。

### [][9]抓取请求，验证加密

为了验证数据在传输过程中是加密的，我们用wireshark抓取网络包。  
抓取HTTP请求：<a href="https://192.168.1.20/users?a=111" target="_blank" rel="external">https://192.168.1.20/users?a=111</a> ，结果如下：

![基于Nodejs创建https服务][10]  
抓取HTTPS请求：<a href="https://192.168.1.20/users?a=112" target="_blank" rel="external">https://192.168.1.20/users?a=112</a> ，结果如下：

![基于Nodejs创建https服务][11]

在HTTP下面，URL请求的参数是被暴露的。在HTTPS下面，URL的请求参数是被加密的。因此，希望需要填写个人信息，及在线支付的网站，都把HTTPS服务器搭建起来。防止私密数据，在网络传输过程中被获取。

### [][12]使用http-server

还有一种搭建https服务器的简便方法，就是使用http-server插件，先安装http-server：

然后制作公私钥文件（cert.csr，cert.pem，key.pem）,将这三个文件拷贝到要部署的项目根目录，然后再要开启https服务的项目根目录执行：

即可。

### [][13]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#为什么用https服务 "为什么用https服务"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/httpsNode.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#HTTP和HTTPS介绍 "HTTP和HTTPS介绍"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#基于nodejs搭建https服务器 "基于nodejs搭建https服务器"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#使用openssl生成证书文件 "使用openssl生成证书文件"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#修改app-js "修改app.js"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#启动服务器： "启动服务器："
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/httpsNode1.png
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#抓取请求，验证加密 "抓取请求，验证加密"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/httpsNode2.png
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/httpsNode3.png
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#使用http-server "使用http-server"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/10/18/2014_https_node/#谢谢！ "谢谢！"
