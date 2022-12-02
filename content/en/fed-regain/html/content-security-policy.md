---
title: Content-Security-Policy
weight: 6

---
![](/images/posts/img_5bf6b08415258.webp)

首先[我们](https://www.w3cdoc.com)要知道web[浏览器](https://www.w3cdoc.com)为了安全都有会同源限制，什么是同源限制？就是来自 <a href="https://link.jianshu.com?t=https://mybank.com" target="_blank" rel="nofollow noopener noreferrer">https://mybank.com</a> 的代码应仅能访问 <a href="https://link.jianshu.com?t=https://mybank.com" target="_blank" rel="nofollow noopener noreferrer">https://mybank.com</a> 的数据，而绝不被允许访问 <a href="https://link.jianshu.com?t=https://evil.example.com" target="_blank" rel="nofollow noopener noreferrer">https://evil.example.com</a>。同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据，比如cookie/locaStoragy/IndexDB就遵守同源限制。XMLHettpRequest也是存在同源限制，相信只要开发过web的同学在ajax获取数据时都遇到过这个问题。

同源限制可以一定程度上限制[我们](https://www.w3cdoc.com)的用户信息不会被盗取，但是却没法防止[我们](https://www.w3cdoc.com)的页面被插入不法分子的资源（js，img，css等），毕竟页面上带src的元素资源是不受同源限制的。这些页面上的牛皮鲜让人很讨厌，影响是极其恶劣的：会让[我们](https://www.w3cdoc.com)的js监控误报、会影响用户体验、甚至隐私泄露，所以[我们](https://www.w3cdoc.com)需要对src资源也作出一定的限制，这就得Content-Security-Policy来了
    
## Content-Security-Policy
    
Content-Security-Policy（内容安全政策,下文简称为CSP）,作用呢主要有两点：
- 使用白名单的方式告诉客户端（[浏览器](https://www.w3cdoc.com)）允许加载和不允许加载的资源。
- 向服务器举报这种强贴牛皮鲜广告的行为，以便做出更加针对性的措施予以绝杀。

句法
```
Content-Security-Policy: <policy-directive>; <policy-directive>
```

举个配置的例子如下：
```
"Content-Security-Policy":"default-src 'self' *.xx.com 'unsafe-inline' hybrid: data: wss:;img-src *"
```

### 怎么用    

[我们](https://www.w3cdoc.com)知道了好处还是很犀利的啊，这么好的东西怎么玩？其实也很简单，前面说到了他其实就是一个http header嘛，所以[我们](https://www.w3cdoc.com)只需要在返回html页面的同时加上个response header 就行了，后面的script-src代表是一个指令，指示[浏览器](https://www.w3cdoc.com)你只能加载我屁股后面那些规则下的js代码，其他的都一律拒绝。
    
```
Content-Security-Policy: script-src 'self' https://apis.google.com
```
- 关键字'self'：当前域名，需要加引号
也可以用meta
```
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

## 指令
前面说到<code>script-src</code>是一个指令，那就说明还有其他的指令罗，没有错，下面的都是指令，覆盖了web页面的所有资源

### 获取指令
提取指令控制可以加载某些资源类型的位置。

child-src定义Web工作人员的有效来源以及使用元素（例如frame和）加载的嵌套浏览上下文 iframe。

connect-src限制可以使用脚本接口加载的URL default-src用作其他提取指令的后备。

font-src指定使用加载的字体的有效来源@font-face。frame-src为使用元素（例如frame和）加载的嵌套浏览上下文指定有效来源iframe。

img-src指定图像和网站图标的有效来源。

manifest-src指定应用程序清单文件的有效来源。

media-src指定使用加载媒体来源有效audio，video和track元素。

object-src指定有效的来源object，embed和applet元素。

script-src指定JavaScript的有效来源。

style-src指定样式表的有效来源。

worker-src指定有效来源Worker，SharedWorker或ServiceWorker脚本。

### 文件指令
Document指令控制策略适用的文档或工作环境的属性。

base-uri限制可以在文档base元素中使用的URL 。

plugin-types通过限制可以加载的资源类型来限制可以嵌入到文档中的一组插件。

sandbox为请求的资源启用沙箱，类似于iframe sandbox 属性。disown-opener确保资源在导航时不会泄露其开启者。

### 导航指令
例如，导航指令控制用户可以导航到哪个位置或将表单提交到哪个位置。

form-action限制可以用作来自给定上下文的表单提交的目标的URL。frame-ancestors指定有效的父级可以使用嵌入网页frame，iframe，object，embed，或applet。navigation-to限制文档可以通过任何方式（a, form, window.location, window.open,等）导航到的URL。

### 报告指令
报告指令控制着违反CSP的报告流程。另见Content-Security-Policy-Report-Only标题。

report-uri指示用户代理报告违反内容安全策略的企图。这些违规报告由通过HTTP 请求发送到指定URI 的JSON文档组成POST。report-toFires SecurityPolicyViolationEvent。

### 其他指令
block-all-mixed-content当使用HTTPS加载页面时，防止使用HTTP加载任何资产。

referrer用于在引用者（sic）头中指定远离页面的链接的信息。

Referrer-Policy改为使用标题。

require-sri-for需要在页面上使用SRI作为脚本或样式。

upgrade-insecure-requests指示用户代理将所有站点的不安全URL（通过HTTP提供的URL）视为已被替换为安全URL（通过HTTPS提供的URL）。此指令适用于需要重写大量不安全的旧版URL的网站。