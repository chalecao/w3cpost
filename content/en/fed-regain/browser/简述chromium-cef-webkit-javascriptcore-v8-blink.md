---
title: 简述Chromium, CEF, Webkit, JavaScriptCore, V8, Blink

---
[浏览器](https://www.w3cdoc.com)内核分为两部分：渲染引擎（render engin）、js引擎(js engin)
渲染引擎：负责对网页语法的解释（HTML、javaScript、引入css等），并渲染（显示）网页
js引擎：javaScript的解释、编译、执行
主流内核：Trident(IE)、Gecko(FireFox)、Webkit(Safari)、Presto(opera前内核、已废弃)、blink(Chrome)
1. webkit[浏览器](https://www.w3cdoc.com)渲染引擎的进度史

![](/images/posts/2023-01-02-20-49-35.png)

2. webkit[浏览器](https://www.w3cdoc.com)内核部分内容介绍

![](/images/posts/2023-01-02-20-49-54.png)

HTML解释器：解释HTML文本的解释器，主要作用是将HTML文本解释成DOM树，DOM是一种文档表示方法。
CSS解释器：级联样式表的解释器，它的作用是为DOM中的各个元素对象计算出样式信息，从而为计算最后网页的布局提供基础设施。
布局：在DOM创建之后，webkit需要将其中的元素对象同样式信息结合起来，计算它们的大小位置等布局信息，形成一个能够表示这所有信息的内部比偶表示模型。
JavaScript引擎：使用JavaScript代码可以修改网页的内容，也能修改CSS的信息，JavaScript引擎能解释JavaScript代码并通过DOM接口和CSSOM视图模式来修改网页内容和样式信息，从而改变渲染结果。
绘图：使用图形库将布局计算后的各个网页的节点绘制成图像结果。
## Chromium, CEF, Webkit, JavaScriptCore, V8, Blink

V8（在<a href="https://juejin.im/editor/drafts/5c04948c5188252e4c2e93bf" target="_blank" rel="noopener">这里</a>详细了解）

Webkit<br /> (refer: W<a href="https://link.juejin.im?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F25910556%2F" target="_blank" rel="nofollow noopener noreferrer">ebkit技术内幕</a>)<br /> 苹果公司基于KDE（Linux桌面系统）的KHTML开源，包括Webcore和JavaScriptCore两个引擎。苹果比较了Gecko和KHTML之后，选择后者的原因，是KHTML拥有清晰的源码结构和极快的渲染速度。2008年，谷歌公司发布的chrome[浏览器](https://www.w3cdoc.com)，采用的chromium内核是基于Webkit而来应用：safari, mail, app store等应用webkit布局：当webkit创建RenderObject对象之后，每个对象是不知道自己的位置、大小等信息的，webkit根据盒模型来计算他们的位置、大小等信息的过程称为布局计算/排版。布局计算分类：第一类是对整个RenderObject树进行的计算；第二类是对RenderObject树中某个子树的计算，常见于文本元素或者overflow：auto块的计算。布局计算：布局计算是一个递归的过程，这是因为一个节点的大小通常需要先计算它的子节点的位置、大小等信息。补充： 
为什么说transform实现动画较直接设置几何属性性能较好？

1.webkit渲染过程：style -> Layout(reflow发生在这) -> Paint（repaint发生在这） -> Composite，transform是位于’Composite（渲染层合并）‘，而width、left、margin等则是位于‘Layout（布局）’层，这必定导致reflow。

2.现代[浏览器](https://www.w3cdoc.com)针对transform等开启GPU加速。

style -> Layout(reflow发生在这) -> Paint（repaint发生在这） -> Composite（transform发生在这个时候）

（refer: <a href="https://link.juejin.im/?target=https%3A%2F%2Fwww.w3cplus.com%2Fanimation%2Fanimation-performance.html" target="_blank" rel="noopener">CSS Animation性能优化</a>

<a href="https://link.juejin.im/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000008650975" target="_blank" rel="noopener">从重绘重排角度讲解transform的动画性能</a>） 

<a href="https://link.juejin.im?target=https%3A%2F%2Ftrac.webkit.org%2Fwiki%2FJavaScriptCore" target="_blank" rel="nofollow noopener noreferrer">JavaScriptCore 引擎</a>一开始它是基于KJS开发的，是基于抽象语法树的解释器，性能较差。2008年苹果重写了编译器和字节码解释器，叫SquirrelFish

![](/images/posts/2023-01-02-20-51-40.png)

（refer：J<a href="https://link.juejin.im?target=http%3A%2F%2Flingyuncxb.com%2F2018%2F07%2F19%2FJavaScriptCore%25E5%25BC%2595%25E6%2593%258E%25E6%25B7%25B1%25E5%25BA%25A6%25E8%25A7%25A3%25E6%259E%2590-1-%25E5%25BC%2580%25E7%25AF%2587%2F" target="_blank" rel="nofollow noopener noreferrer">avaScriptCore深度解析</a>）

Chromium/BlinkChromium基于webkit，却把Webkit的代码梳理得可读性更高，多进程框架Chromium加载网页的过程，需要Browser进程和Render进程协作完成。加载网页的过程由Browser进程发起，向服务器请求网页内容的过程也是由Browser进程完成。Render进程负责对下载回来的网页内容进行解析，解析之后得到一个DOM Tree。有了这个DOM Tree之后，Render进程就可以对网页进行渲染了（refer: C<a href="https://link.juejin.im?target=https%3A%2F%2Fblog.csdn.net%2FLuoshengyang%2Farticle%2Fdetails%2F50414848" target="_blank" rel="nofollow noopener noreferrer">hromium网页加载介绍</a>）Blink：Chromium项目中研发的渲染引擎，基于并脱离Webkit更强大的渲染和布局： <ol>
追求多线程布局

样式的重新计算

不为隐藏的iframe创建渲染器

为插件设置为display：none时，修复插件卸载等旧错误

异步卸载iframe，速度更快
</ol>

（refer： <a href="https://link.juejin.im?target=http%3A%2F%2Fwww.chromium.org%2Fblink%2Fdeveloper-faq" target="_blank" rel="nofollow noopener noreferrer">blink的开发者FAQ</a>） </ol> 

1. <a href="https://link.juejin.im?target=https%3A%2F%2Fcode.google.com%2Farchive%2Fp%2Fchromiumembedded%2F" target="_blank" rel="nofollow noopener noreferrer">CEF（Chromium Embeded Framework）</a>

一个将[浏览器](https://www.w3cdoc.com)功能（页面渲染、js执行）嵌入到其他应用程序的框架，支持windows, Linux, Mac平台

CEF的历史：

<ul>
CEF有两种版本的Chromium Embedded Framework：CEF 1和CEF 3

在Chromium Content API出现后，CEF 2的开发被放弃。

CEF 1是基于Chromium WebKit API的单进程实现。它不再积极发展或支持。

CEF 3是基于Chromium Content API的多进程实现，其性能类似于Google Chrome。


应用：

1）做一个[浏览器](https://www.w3cdoc.com)

2) 跨平台的桌面底层方案<a href="https://link.juejin.im?target=https%3A%2F%2Felectronjs.org%2F" target="_blank" rel="nofollow noopener noreferrer">electron.js</a>

3) 客户端（如：桌面端app应用）

好处：开发web和native混合的应用非常方便

## 总结

V8引擎是谷歌公司自主研发的js引擎

Webkit基于KHTML，包含JavaScriptCore

Chromium基于Webkit，衍生出Blink
CEF是包含Chromium[浏览器](https://www.w3cdoc.com)的应用框架

一切鼻祖：<a href="https://link.juejin.im?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FKHTML" target="_blank" rel="nofollow noopener noreferrer">KHTML</a>

## 参考
原文：https://juejin.im/post/5c0492a36fb9a049e82b435a

（文中有些细节仅做参考，有些问题，我后面有空修改下）
