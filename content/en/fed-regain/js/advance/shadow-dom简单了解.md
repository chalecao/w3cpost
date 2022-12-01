---
title: Shadow DOM简单了解






enclosure:
  - |
    |
        http://7ryl2t.com2.z0.glb.qiniucdn.com/572ffc37a2e5a.mp4
        9989621
        video/mp4
        



---
你有好奇过这个问题吗，为什么只用video标签包裹着source标签，就可以完成一系列视频功能：播放/暂停按钮、进度条、视频时间显示、音量控制等等？既然 DOM 源码这么干净，你有想过实现这些组件的代码是从哪儿来的吗？

## 1. 简介 {#1-简介.post-heading}

Shadow DOM它允许在文档（document）渲染时插入一棵DOM元素子树，但是这棵子树不在主DOM树中。

因此开发者可利用Shadow DOM 封装自己的 HTML 标签、CSS 样式和 JavaScript 代码。

看一个简单的video：

<pre class="EnlighterJSRAW" data-enlighter-language="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Shadow DOM&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;video controls autoplay name="media" width="500"&gt;
        &lt;source id="mp4" src="http://7ryl2t.com2.z0.glb.qiniucdn.com/572ffc37a2e5a.mp4" type="video/mp4"&gt;
    &lt;/video&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

页面完成了，在[浏览器](https://www.w3cdoc.com)chrome中打开，然后打开 Chrome 的开发者工具，点击右上角的“Settings”按钮，勾选“Show user agent shadow DOM”。

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/Fq09xC-qD04z43WYyVb4P0tPC-NC.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/Fq09xC-qD04z43WYyVb4P0tPC-NC.png?x-oss-process=image/format,webp" alt="Show user agent shadow DOM" width="365" height="502" />

[浏览器](https://www.w3cdoc.com)截图：

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FhgQ2ofckuyoCPD8RlAd3INcGRAx.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FhgQ2ofckuyoCPD8RlAd3INcGRAx.png?x-oss-process=image/format,webp" alt="Video Shadow DOM" width="714" height="358" />

# shadow-root称为影子根，可以看到它在video里面，换句话说，#shadow-root寄生在video上，所以video此时称为影子宿主。可以看到上图有两个#shadow-root，这是因为#shadow-root可以嵌套，形成节点树，即称为影子树（shadow trees）。影子树对其中的内容进行了封装，有选择性的进行渲染。这就意味着[我们](https://www.w3cdoc.com)可以插入文本、重新安排内容、添加样式等等。如下所示：

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FoF1XzsX8voCu3Gh9mJKBXkHeQDC.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FoF1XzsX8voCu3Gh9mJKBXkHeQDC.jpg?x-oss-process=image/format,webp" alt="影子树" width="498" height="618" />

## 2. 怎样创建Shadow DOM {#2-怎样创建Shadow-DOM.post-heading}

使用createShadowRoot()来创建Shadow DOM，并赋值给一个变量，然后添加元素给变量即可。

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Shadow DOM&lt;/title&gt;
&lt;style type="text/css"&gt;
.shadowroot_son {
color: #f00;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="shadowhost"&gt;Hello, world!&lt;/div&gt;
&lt;script&gt;

// 影子宿主（shadow host）
var shadowHost = document.querySelector('.shadowhost');

// 创建影子根（shadow root）
var shadowRoot = shadowHost.createShadowRoot();

// 影子根作为影子树的第一个节点，其他的节点比如p节点都是它的子节点。
shadowRoot.innerHTML = '&lt;p class="shadowroot_son"&gt;夏天夏天悄悄过去留下小秘密！&lt;/p&gt;';

&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

[浏览器](https://www.w3cdoc.com)截图：

<img class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FtgCUt4VAb4Y5JemQFBXnI3tvo4W.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FtgCUt4VAb4Y5JemQFBXnI3tvo4W.png?x-oss-process=image/format,webp" alt="创建Shadow DOM" />

有没有注意到.shadowroot_son的样式color: #f00;不生效？！那是因为影子宿主和影子根之间存在影子边界（shadow boundary），影子边界保证主 DOM写的 CSS 选择器和 JavaScript 代码都不会影响到Shadow DOM，当然也保护主文档不受 shadow DOM 样式的侵袭。

## 3. 想要渲染影子宿主里的内容，那该怎么玩？ {#3-想要渲染影子宿主里的内容，那该怎么玩？.post-heading}

需要完成此项任务，需要两个利器：`<content>`和`<template>`。

### 3.1 `<content>` {#3-1-lt-content-gt.post-heading}

通过 `<content>` 标签把来自主文档并添加到 shadow DOM 的内容被称为分布节点。

`<content>`的select属性告诉`<content>`标签有选择性的插入内容。select 属性使用 CSS 选择器来选取想要展示的内容，选择器包括类选择器、元素选择器等。

### 3.2 `<template>` {#3-2-lt-template-gt.post-heading}

目前的模板HTML做法通常是在`<script>` 中嵌入模板HTML，让内部的HTML标签按照字符串处理的，从而使得内容不显示：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;script type="text/template"&gt;
// ...
&lt;/script&gt;</pre>

`<template>`元素的出现旨在让HTML模板变得更加标准与规范。

`<template>`在使用前不会被渲染，不会执行加载等操作，也能够实现隐藏标签内容，而且位置任意性，可以在`<head>`中，也可以在`<body>`或者`<frameset>`中。

### 3.3 实例 {#3-3-实例.post-heading}

通过以上对 `<content>`和`<template>`的简单了解，[我们](https://www.w3cdoc.com)来通过一个实例加深理解：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;content&template&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;div class="shadowhost"&gt;
&lt;em class="shadowhost_content1"&gt;唱歌&lt;/em&gt;
&lt;em class="shadowhost_content2"&gt;跳舞&lt;/em&gt;
&lt;/div&gt;

&lt;!-- S 模板标签 template --&gt;
&lt;template class="template"&gt;
&lt;h1&gt;你&lt;content select=".shadowhost_content1"&gt;&lt;/content&gt;我&lt;content select=".shadowhost_content2"&gt;&lt;/content&gt;!&lt;/h1&gt;
&lt;/template&gt;
&lt;!-- E 模板标签 template --&gt;

&lt;script&gt;
var shadowHost = document.querySelector('.shadowhost');

var shadowRoot = shadowHost.createShadowRoot();
var template = document.querySelector('.template');

// template.content会返回一个文档片段，可以理解为另外一个document。
// 利用document.importNode获取节点，true表示深度克隆。
shadowRoot.appendChild(document.importNode(template.content, true));
&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;</pre>

[浏览器](https://www.w3cdoc.com)截图：

<img class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FswaNQUdHF17XfTya9wO4ZnKIryN.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FswaNQUdHF17XfTya9wO4ZnKIryN.png?x-oss-process=image/format,webp" alt="content&template" />

[我们](https://www.w3cdoc.com)来看一下下面三个属性的用途：

<pre class="EnlighterJSRAW" data-enlighter-language="null">console.log(template.innerHTML); // 获取完整的HTML片段
console.log(template.content); // 返回一个文档片段#document-fragment
console.log(template.childNodes); // 返回[]，说明childNodes无效</pre>

**贪心插入点**：如果把select=”.shadowhost_content1”改成select=””或者select=”*”，那么会有不一样的结果。因为贪心选择器放在了模板的第一个，他会将所有内容都抓取，不给其他select 选择器留一点内容。[浏览器](https://www.w3cdoc.com)截图如下：

<img class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FgnGjHYb8sI1_jns_CViHrsXgc6n.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FgnGjHYb8sI1_jns_CViHrsXgc6n.png?x-oss-process=image/format,webp" alt="贪心插入点" />

## 4. 关于样式 {#4-关于样式.post-heading}

### 4.1 宿主样式:host {#4-1-宿主样式-host.post-heading}

在shadow DOM中利用:host定义宿主的样式，当然用户可以在主文档中覆盖这个样式。

:host 是伪类选择器（Pseudo Selector）,:host或者 :host(*)是默认给所有的宿主添加样式，或者单独给一个宿主添加样式，即通过:host(x)，x可以是宿主的标签或者类选择器等。

另外:host还可以配合:hover、:active等状态来设置样式，如：

<pre class="EnlighterJSRAW" data-enlighter-language="null">:host(:hover) { border: 2px solid #0ff;}</pre>

### 4.2 ::shadow {#4-2-shadow.post-heading}

原则上来说，影子边界保证主 DOM写的 CSS 选择器和 JavaScript 代码都不会影响到Shadow DOM。  
但你可能会想打破影子边界的所谓保证，主文档能够给Shadow DOM添加一些样式，这时可以使用::shadow。

### 4.3 /deep/ {#4-3-deep.post-heading}

::shadow 选择器的一个缺陷是他只能穿透一层影子边界，如果你在一个影子树中嵌套了多个影子树，那么使用 /deep/ 。

### 4.4 ::content {#4-4-content.post-heading}

还记得什么叫分布节点吗？通过 `<content>` 标签把来自主文档并添加到 shadow DOM 的内容被称为分布节点。

分布节点的样式渲染需要用到 ::content。即使分布节点为em标签，直接写 em {} 不生效，应该写成::content > em {}。

### 4.5 实例 {#4-5-实例.post-heading}

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;::content&::shadow&/deep/&lt;/title&gt;
&lt;style type="text/css"&gt;
/*::shadow*/
/*.shadowhost::shadow h1 {
padding: 20px;
border: 1px solid #f00;
}*/

/*/deep/*/
.shadowhost /deep/ h1 {
padding: 20px;
border: 1px solid #000;
}
&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;div class="shadowhost"&gt;
&lt;em class="shadowhost_content1"&gt;唱歌&lt;/em&gt;
&lt;em class="shadowhost_content2"&gt;跳舞&lt;/em&gt;
&lt;/div&gt;

&lt;!-- S 模板标签 template --&gt;
&lt;template class="template"&gt;
&lt;style&gt;
/*定义宿主样式:host*/
:host {
color: #E85E5E;
}
/*定义宿主hover状态下的样式*/
:host(:hover) {
color: #000;
}

/*分布节点的样式渲染需要用到 ::content,直接写 em {} 不生效*/
::content &gt; em {
padding: 10px;
color: #fff;
background: #FFCC00;
border-radius: 10px;
}
&lt;/style&gt;
&lt;h1&gt;你&lt;content select=".shadowhost_content1"&gt;&lt;/content&gt;我&lt;content select=".shadowhost_content2"&gt;&lt;/content&gt;!&lt;/h1&gt;
&lt;/template&gt;
&lt;!-- E 模板标签 template --&gt;

&lt;script&gt;
var shadowHost = document.querySelector('.shadowhost');

var shadowRoot = shadowHost.createShadowRoot();
var template = document.querySelector('.template');

shadowRoot.appendChild(document.importNode(template.content, true));
&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;</pre>

<p class="post-heading">
  [浏览器](https://www.w3cdoc.com)截图如下：
</p>

<img class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FojZYP5WW1JAGN-3fyW9jnFLGiuN.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FojZYP5WW1JAGN-3fyW9jnFLGiuN.png?x-oss-process=image/format,webp" alt="::content&::shadow&/deep/" />

## 5. JavaScript {#5-JavaScript.post-heading}

### 5.1 重定向 {#5-1-重定向.post-heading}

Shadow DOM 里的 JS 与传统的 JS 一个真正不同的点在于事件调度（event dispatching）。要记住的一点是：原来绑定在 shadow DOM 节点中的事件被重定向了，所以他们看起来像绑定在影子宿主上一样。

当你点击“shadow text”的输入框时控制台却输出了宿主元素（就是 #host）的 id 。这是因为影子节点上的事件必须重定向，否则这将破坏封装性。

分布节点来自原有 DOM 结构，没必要重定向。

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;select&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input id="normal-text" type="text" value="I'm normal text"&gt;

&lt;div id="host"&gt;
&lt;!-- “dustributed text”为分布节点，来自原有 DOM 结构，没必要重定向。 --&gt;
&lt;input id="distributed-text" type="text" value="I'm distributed text"&gt;
&lt;/div&gt;

&lt;template&gt;
&lt;div&gt;
&lt;input id="shadow-text" type="text" value="I'm shadow text"&gt;
&lt;/div&gt;
&lt;div&gt;
&lt;content&gt;&lt;/content&gt;
&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
var host = document.querySelector('#host');
var root = host.createShadowRoot();
var template = document.querySelector('template');
root.appendChild(document.importNode(template.content, true));

document.addEventListener('click', function(e) {
console.log(e.target.id + ' click!');
});
&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;</pre>

分别单击每个输入框，控制台打印截图如下：

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FuPYA7rXQnnK78gC75QnvhRkzpqN.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FuPYA7rXQnnK78gC75QnvhRkzpqN.jpg?x-oss-process=image/format,webp" alt="事件重定向" width="346" height="205" />

### 5.2 被阻塞的事件（Blocked Events） {#5-2-被阻塞的事件（Blocked-Events）.post-heading}

事件abort、 error、 select 、change 、load 、reset 、resize 、scroll 、selectstart不会进行重定向而是直接被干掉，因此事件不能冒泡到文档中，事件监听重定向至文档，因此无法监听到这一事件。

把上面的监听事件click改成select，即改成：

<pre class="EnlighterJSRAW" data-enlighter-language="null">document.addEventListener('select', function(e) {
    console.log(e.target.id + ' select!');
});</pre>

分别双击每个输入框，你会发现，shadow text的输入框没有打印，就是没有发生select事件。

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FpPbkUQKdtodVkllgCc3K4-5miOe.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FpPbkUQKdtodVkllgCc3K4-5miOe.jpg?x-oss-process=image/format,webp" alt="被阻塞的事件" width="403" height="121" />

### 6. 兼容性 {#6-兼容性.post-heading}

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FpSHZHqQtxYyUIO2vdUCRaVnJyaA.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FpSHZHqQtxYyUIO2vdUCRaVnJyaA.png?x-oss-process=image/format,webp" alt="template兼容性" width="724" height="531" />

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FuAGMDQSFdBe_xEdSolSbU-avlpd.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/FuAGMDQSFdBe_xEdSolSbU-avlpd.png?x-oss-process=image/format,webp" alt="Shadow DOM兼容性" width="727" height="668" />

看上去只能在chrome中愉快地玩耍。

<a href="http://webcomponents.org/" target="_blank" rel="external noopener noreferrer">webcomponents.js</a>使得Shadow DOM在非 native 支持的[浏览器](https://www.w3cdoc.com)上实现。

## 7. 参考链接 {#7-参考链接.post-heading}

<a href="https://css-tricks.com/modular-future-web-components/" target="_blank" rel="external noopener noreferrer">A Guide to Web Components</a>  
<a href="http://www.ituring.com.cn/article/177453" target="_blank" rel="external noopener noreferrer">Shadow DOM系列文章</a>  
<a href="http://www.zhangxinxu.com/wordpress/2014/07/hello-html5-template-tag/" target="_blank" rel="external noopener noreferrer">HTML5 <code>&lt;template&gt;</code>标签元素简介</a>
