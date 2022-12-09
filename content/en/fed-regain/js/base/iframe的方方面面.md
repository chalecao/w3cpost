---
title: iframe的方方面面

---

### [][1][浏览器](https://www.w3cdoc.com)中的[浏览器](https://www.w3cdoc.com)

iframe 提供了一个简单的方式把一个网站的内容嵌入到另一个网站中。但[我们](https://www.w3cdoc.com)需要慎重的使用iframe。iframe的创建比其它包括scripts和css的 DOM 元素的创建慢了 1-2 个数量级。使用 iframe 的页面一般不会包含太多 iframe，所以创建 DOM 节点所花费的时间不会占很大的比重。但带来一些其它的问题：onload 事件以及连接池(connection pool)。  
 
![iframe的方方面面][2]

### [][3]iframe用法

关于详细的用法，可以参考<a href="https://www.w3school.com.cn/tags/tag_iframe.asp" target="_blank" rel="external">w3school iframe</a>  
下面给出一个常用的无边框的iframe的例子：

### [][4]Iframes阻塞页面加载

及时触发 window 的 onload 事件是非常重要的。onload 事件触发使[浏览器](https://www.w3cdoc.com)的 “忙” 指示器停止，告诉用户当前网页已经加载完毕。当 onload 事件加载延迟后，它给用户的感觉就是这个网页非常慢。

window 的 onload 事件需要在所有 iframe 加载完毕后(包含里面的元素)才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。

### 唯一的连接池

[浏览器](https://www.w3cdoc.com)只能开少量的连接到web服务器。比较老的[浏览器](https://www.w3cdoc.com)，包含 Internet Explorer 6 & 7 和 Firefox 2，只能对一个域名(hostname)同时打开两个连接。这个数量的限制在新版本的[浏览器](https://www.w3cdoc.com)中有所提高。Safari 3+ 和 Opera 9+ 可同时对一个域名打开 4 个连接，Chrome 1+, IE 8 以及 Firefox 3 可以同时打开 6 个。你可以通过这篇文章查看具体的数据表：Roundup on Parallel Connections.

有人可能希望 iframe 会有自己独立的连接池，但不是这样的。绝大部分[浏览器](https://www.w3cdoc.com)，主页面和其中的 iframe 是共享这些连接的。这意味着 iframe 在加载资源时可能用光了所有的可用连接，从而阻塞了主页面资源的加载。如果 iframe 中的内容比主页面的内容更重要，这当然是很好的。但通常情况下，iframe 里的内容是没有主页面的内容重要的。这时 iframe 中用光了可用的连接就是不值得的了。一种解决办法是，在主页面上重要的元素加载完毕后，再动态设置 iframe 的 SRC。

美国前 10 大网站都使用了 iframe。大部分情况下，他们用它来加载广告。这是可以理解的，也是一种符合逻辑的解决方案，用一种简单的办法来加载广告服务。但请记住，iframe 会给你的页面性能带来冲击。只要可能，不要使用 iframe。当确实需要时，谨慎的使用他们。

### [][5]巧妙用法

iframe原本的用法在现在看来是不合时宜的，但是它的其他功能却是不错的黑魔法：  
1.用来实现长连接，在websocket不可用的时候作为一种替代，最开始由google发明。<a href="https://www.ibm.com/developerworks/cn/web/wa-lo-comet/#N10101" target="_blank" rel="external">Comet：基于 HTTP 长连接的“服务器推”技术</a>。  
2.跨域通信,<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_cross_domain/" target="_blank" rel="external">JavaScript跨域请求的方方面面 </a>，类似的还有[浏览器](https://www.w3cdoc.com)多页面通信，比如音乐播放器，用户如果打开了多个tab页，应该只有一个在播放。  
3.历史记录管理，解决ajax化网站响应[浏览器](https://www.w3cdoc.com)前进后退按钮的方案，在html5的history api不可用时作为一种替代。  
4.纯[前端](https://www.w3cdoc.com)的utf8和gbk编码互转。比如在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的方式实现转换，这样就不用在页面上插入一个非常巨大的编码映射表文件了，其中子页面内容：

把这个iframe部署到父页面的同源服务上，就能在父页面直接调用iframe中的encoding接口了。  
5.用iframe实现无刷新文件上传，在FormData不可用时作为替代方案。  
6.在移动端用于从网页调起客户端应用（此方法在iphone上并不安全，慎用！具体风险看这里 <a href="https://drops.wooyun.org/papers/5309" target="_blank" rel="external">iOS URL Scheme 劫持</a> ）。比如想在网页中调起支付宝，[我们](https://www.w3cdoc.com)可以创建一个iframe，src为：

[浏览器](https://www.w3cdoc.com)接收到这个url请求发现未知协议，会交给系统处理，系统就能调起支付宝客户端了。[我们](https://www.w3cdoc.com)还能趁机检查一下用户是否安装客户端：给iframe设置一个3-5秒的css3的transition过渡动画，然后监听动画完成事件，如果用户安装了客户端，那么系统会调起，并将[浏览器](https://www.w3cdoc.com)转入后台运行，进入后台的[浏览器](https://www.w3cdoc.com)一般不会再执行css动画，这样，[我们](https://www.w3cdoc.com)就能通过判断css动画执行的时长是否超过预设来判断用户是否安装某个客户端了：

  1. 创建一个全新的独立的宿主环境。经大神提醒，iframe还可以用于创建新的宿主环境，用于隔离或者访问原始接口及对象，比如有些[前端](https://www.w3cdoc.com)安全的防范会覆盖一些原生的方法防止恶意调用，那[我们](https://www.w3cdoc.com)就能通过创建一个iframe，然后从iframe中取回原始对象和方法来破解这种防范。类似的还有 @贺师俊 曾经提到的javascript裸对象创建中的一种方法：如何创建一个JavaScript裸对象 ，一般所见即所得编辑器也是由iframe创建的， @Dion 的回答有提到
  2. IE6下用于遮罩select。经 @yaniv 提醒想起来的。曾经在ie6时代，想搞一个模态窗口，如果窗口叠加在select元素上面，是遮不住select的，为了解决这个问题，可以通过在模态窗口元素下面垫一个iframe来实现遮罩，好坑爹的ie6，还我青春韶华~~

### [][6]防止网页被Frame

防止网页被Frame，方法有很多种；

方法一：常见的比如使用js，判断顶层窗口跳转：

一般这样够用了，但是有一次发现失效了，看了一下人家网站就是顶层窗口中的代码，发现这段代码：

轻轻松松被破解了，悲剧。

注：此方式破解对IE6，IE7，IE9+、Chrome、firefox无效；

方法二：meta 标签：基本没什么效果，所以也放弃了：

方法三：使用HTTP 响应头信息中的 X-Frame-Options属性

使用 X-Frame-Options 有三个可选的值：

绝大部分[浏览器](https://www.w3cdoc.com)支持：

具体的设置方法：

Apache配置：

nginx配置：

IIS配置：

具体可以查看：  
<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options?redirectlocale=en-US&redirectslug=The_X-FRAME-OPTIONS_response_header" target="_blank" rel="external">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options?redirectlocale=en-US&redirectslug=The_X-FRAME-OPTIONS_response_header</a>

### [][7]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#[浏览器](https://www.w3cdoc.com)中的[浏览器](https://www.w3cdoc.com) "[浏览器](https://www.w3cdoc.com)中的[浏览器](https://www.w3cdoc.com)"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/images/frame.gif
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#iframe用法 "iframe用法"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#Iframes阻塞页面加载 "Iframes阻塞页面加载"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#巧妙用法 "巧妙用法"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#防止网页被Frame "防止网页被Frame"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/06/2015_frame/#谢谢！ "谢谢！"
