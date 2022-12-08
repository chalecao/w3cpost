---
title: react shadow






---
1. Shadow DOM 是什么

Shadow DOM 是什么？[我们](https://www.w3cdoc.com)先来打开 Chrome 的 DevTool，并在 &#8216;Settings -> Preferences -> Elements&#8217; 中把 &#8216; Show user agent shadow DOM&#8217; 打上勾。然后，打开一个支持 HTML5 播放的视频网站。

可以看到 `video` 内部有一个 `#shadow-root` ，在 ShadowRoot 之下还能看到 `div` 这样的普通 HTML 标签。[我们](https://www.w3cdoc.com)能知道 `video` 会有「播放/暂停按钮、进度条、视频时间显示、音量控制」等控件，那其实，就是由 ShadowRoot 中的这些子元素构成的。而[我们](https://www.w3cdoc.com)最常用的 `input` 其实也附加了 Shadow DOM，比如，[我们](https://www.w3cdoc.com)在 Chrome 中尝试给一个 Input 加上 `placeholder` ，通过 DevTools 便能看到，其实文字是在 ShadowRoot 下的一个 Id 为 `palcehoder` 的 div 中。

&nbsp;


  <img loading="lazy" width="2624" height="1706" class="alignnone size-full wp-image-5112 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png?x-oss-process=image/format,webp 2624w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_195/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_499/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa04f0591.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_520/format,webp 800w" sizes="(max-width: 2624px) 100vw, 2624px" />

Shadow DOM 允许在文档（Document）渲染时插入一棵「子 DOM  树」，并且这棵子树不在主 DOM 树中，同时为子树中的 DOM 元素和 CSS 提供了封装的能力。Shadow DOM 使得子树 DOM 与主文档的 DOM 保持分离，子 DOM 树中的 CSS 不会影响到主 DOM 树的内容，如下图所示：


  <img loading="lazy" width="1120" height="534" class="alignnone size-full wp-image-5113 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png?x-oss-process=image/format,webp 1120w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_366/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa1147f7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_381/format,webp 800w" sizes="(max-width: 1120px) 100vw, 1120px" />

有几个需要了解和 Shadow DOM 相关的技术概念：

* Shadow host： 一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
* Shadow tree：Shadow DOM 内部的 DOM 树。
* Shadow boundary：Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
* Shadow root:  Shadow tree 的根节点。

<a name="h5uzE"></a>

# 2. Shadwo DOM 有何用 {#1}

<a name="0koI0"></a>

## 2.1. [浏览器](https://www.w3cdoc.com)内建的原生组件 {#2}

Shadow DOM 最大的用处应该是隔离外部环境用于封装组件。估计[浏览器](https://www.w3cdoc.com)的开发者们也意识到通过 HTML/CSS 来实现[浏览器](https://www.w3cdoc.com)内建的原生组件更容易，如上边提到的[浏览器](https://www.w3cdoc.com)原生组件 `input`，`video`，还有 `textarea`，`select`，`audio` 等，也都是由 HTML/CSS 渲染出来的。

<a name="El1CC"></a>

## 2.2. Web Components {#3}

Web Components 允许开发者创建可重用的自定义元素，它们可以一起使用来创建封装功能的自定义元素，并可以像[浏览器](https://www.w3cdoc.com)原生的元素一样在任何地方重用，而不必担心样式和 DOM 的冲突问题，主要由三项主要技术组成：

* **Custom Elements**（自定义元素）：一组 JavaScript API，允许您定义 Custom Elements 及其行为，然后可以在您的用户界面中按照需要使用它们。
* **HTML Templates**（ HTML 模板）： `template` 和 `slot` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。
* **Shadow DOM**（影子 DOM）：一组 JavaScript API 用于将「影子 DOM 树」附加到元素上，与主文档 DOM 树隔离，并能控制其关联的功能。通过这种方式，可以保持元素的私有，并能不用担心「样式」与文档的其他部分发生冲突。

在 Web Components 中的一个重要特性是「封装」，可以将「HTML 标签结构、CSS 样式、行为」隐藏起来，并从页面上的其他代码中分离开来，这样不同的功能不会混在一起，代码看起来也会更加干净整洁，其中 Shadow DOM 便是 DOM 和 CSS 封装所依赖的关键特性。

<a name="q4WhO"></a>

## 2.3 其他需要隔离的场景 {#4}

不少人大概会听说过「微[前端](https://www.w3cdoc.com)」，微[前端](https://www.w3cdoc.com)作为一种「架构风格」，其中可由多个「可独立交付的[前端](https://www.w3cdoc.com)子应用」组合成一个大的整体。那么在「微[前端](https://www.w3cdoc.com)架构」下，每一个独立的子应用间及子应用间的如何保证不会冲突？样式不会相互覆盖？那么，是否可以将每个「子应用」通过 Shadow DOM 进行隔离？答案是肯定的，我就在部分项目中有过实践。

其他，在需要进行 DOM/CSS 隔离的场景，都有可能是 Shadow DOM 的用武之地。比如像 「阿里云购物车」这种需要「嵌入集成」到不同产品售卖页的「公共组件」，就很需要避免和宿主页面的样式冲突，即不影响宿主页面，也不要受宿主页面的影响。


 <img loading="lazy" width="2278" height="1334" class="alignnone size-full wp-image-5116 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png?x-oss-process=image/format,webp 2278w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_176/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_450/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa35c472e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_468/format,webp 800w" sizes="(max-width: 2278px) 100vw, 2278px" />
  
 <a name="aOCwo"></a>
  
  <h1 id="5">
    3. 主流[浏览器](https://www.w3cdoc.com)的支持情况
  </h1>
 其中 Chrome，Opera 和 Safari 默认就支持 Shadow DOM，而 Firefox 从 63 版本开始已经支持，可以看到支持最好的是 Chrome，而 IE 直到 11 也都是不支持的，微软的另一款[浏览器](https://www.w3cdoc.com) Edge 要换成和 Chrome 相同内核了，那换核后的 Edge 肯定会支持 Shadow DOM 了。
  
 <img loading="lazy" width="2540" height="512" class="alignnone size-full wp-image-5117 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png?x-oss-process=image/format,webp 2540w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_60/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_155/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa40663ca.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_161/format,webp 800w" sizes="(max-width: 2540px) 100vw, 2540px" />
  
 各[浏览器](https://www.w3cdoc.com)支持详细情况，请参考 <a href="https://caniuse.com/#feat=shadowdomv1">https://caniuse.com/#feat=shadowdomv1</a>
  
 <a name="SiL0i"></a>
  
  <h1 id="6">
    4. 如何创建 Shadow DOM
  </h1>
 Shadow DOM 必须附加在一个元素上，可以是通过 HTML 声明的一个元素，也可以是通过脚本动态创建的元素。可以是原生的元素，如 <code>div、p</code> ，也可以是「自定义元素」如 <code>my-element</code> ，语法如下：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">const&lt;/span> shadowroot &lt;span class="token operator">=&lt;/span> element&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>shadowRootInit&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 参考如下例所示：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-html"><code class=" language-html">&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>html&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
  &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>head&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
    &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>title&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>Shadow Demo&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>title&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
  &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>head&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
  &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>body&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
    &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>h1&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>Shadow Demo&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>h1&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
    &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>div&lt;/span> &lt;span class="token attr-name">id&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>host&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>div&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
    &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>script&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
      const host = document.querySelector('#host');
      // 通过 attachShadow 向元素附加 Shadow DOM
      const shodowRoot = host.attachShadow({ mode: 'open' });
      // 向 shodowRoot 中添加一些内容
      shodowRoot.innerHTML = `&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>style&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>&lt;span class="token style language-css">&lt;span class="token selector">*&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">color&lt;/span>&lt;span class="token punctuation">:&lt;/span>red&lt;span class="token punctuation">;&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>style&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>h2&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>haha!&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>h2&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>`;
    &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>script&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
  &lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>body&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
&lt;span class="token tag">&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>html&lt;/span>&lt;span class="token punctuation">>&lt;/span>&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 通过这个简单的示例可以看到「在 Shadow DOM 中定义的样式，并不会影响到主文档中的元素」，如下图<br /> <a href="https://intranetproxy.alipay.com/skylark/lark/0/2019/png/12673/1567668185403-a949d18d-6e4e-41cf-931a-29ea6688cb8b.png#align=left&display=inline&height=678&name=image.png&originHeight=1356&originWidth=2206&size=514537&status=done&width=1103" target="_blank" rel="noopener noreferrer"><br /> </a>
  
 <img loading="lazy" width="2206" height="1356" class="alignnone size-full wp-image-5118 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png?x-oss-process=image/format,webp 2206w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_184/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_472/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa4e59184.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_492/format,webp 800w" sizes="(max-width: 2206px) 100vw, 2206px" />
  
 <code>Element.attachShadow</code>  的参数 <code>shadowRootInit</code>  的 <code>mode</code>  选项用于设定「封装模式」。它有两个可选的值 ：
  
 &nbsp;
  
  <ul>
    
     &#8220;open&#8221; ：可 Host 元素上通过 <code>host.shadowRoot</code>  获取 shadowRoot 引用，这样任何代码都可以通过 shadowRoot 来访问的子 DOM 树。
    
    
     &#8220;closed&#8221;：在 Host 元素上通过 <code>host.shadowRoot</code>  获取的是 null，[我们](https://www.w3cdoc.com)只能通过 <code>Element.attachShadow</code> 的返回值拿到 shadowRoot 的引用（通常可能隐藏在类中）。例如，[浏览器](https://www.w3cdoc.com)内建的 input、video 等就是关闭的，[我们](https://www.w3cdoc.com)没有办法访问它们。
    
  
 <a name="BDGQB"></a>
  
  <h1 id="7">
    5. 哪些元素可以附加 Shadow DOM
  </h1>
 并非所有 HTML 元素都可以开启 Shadow DOM 的，只有一组有限的元素可以附加 Shadow DOM。有时尝试将 Shadow DOM 树附加到某些元素将会导致 <code>DOMException</code> 错误，例如：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">createElement&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'img'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>mode&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'open'&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment" spellcheck="true">// => DOMException&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 用 <code>&lt;img></code> 这样的非容器素作为 Shadow Host 是不合理的，因此这段代码将抛出 <code>DOMException</code> 错误。此外因为安全原因一些元素也不能附加 Shadow DOM（比如 A 元素），会出现错误的另一个原因是[浏览器](https://www.w3cdoc.com)已经用该元素附加了 Shadow DOM，比如 Input 等。
  
 下表列出了所有支持的元素：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-markdown"><code class=" language-markdown">&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |    article     |      aside     |   blockquote   |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |     body       |       div      |     footer     |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |      h1        |       h2       |       h3       |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |      h4        |       h5       |       h6       |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |    header      |      main      |      nav       |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
&lt;span class="token code keyword">                |      p         |     section    |      span      |&lt;/span>
&lt;span class="token code keyword">                +----------------+----------------+----------------+&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 <a name="Pba63"></a>
  
  <h1 id="8">
    6. 在 React 中如何应用 Shadow DOM
  </h1>
 在基于 React 的项目中应该如何使用 Shadow DOM 呢？比如你正在基于 React 编写一个面向不同产品或业务，可嵌入集成使用的公共组件，比如你正在基于 React 做一个「微[前端](https://www.w3cdoc.com)架构」应用的设计或开发。
  
 [我们](https://www.w3cdoc.com)在编写 React 应用时一般不希望到处是 DOM 操作，因为这很不 React (形容词)。那是否能封装成一下用更 React (形容词) 的组件风格去使用 Shadow DOM 呢?
  
 <a name="LChru"></a>
  
  <h2 id="9">
    6.1. 尝试写一个 React 组件
  

  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">import&lt;/span> React &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> ReactDOM &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react-dom"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">ShadowView&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function-variable function">attachShadow&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>host&lt;span class="token punctuation">:&lt;/span> Element&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    host&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> mode&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"open"&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> children &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>props&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>div ref&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>attachShadow&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>
      &lt;span class="token punctuation">{&lt;/span>children&lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">App&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>span&lt;span class="token operator">>&lt;/span>这儿是隔离的&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>span&lt;span class="token operator">>&lt;/span>
  &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">&lt;&lt;/span>App &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">,&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"root"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 跑起来看看效果，一定会发现「咦？什么也没有显示」：
  
 <img loading="lazy" width="2096" height="1174" class="alignnone size-full wp-image-5119 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png?x-oss-process=image/format,webp 2096w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_168/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_430/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa5c1b3c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_448/format,webp 800w" sizes="(max-width: 2096px) 100vw, 2096px" />
  
 在这里需要稍注意一下，在一个元素上附加了 Shadow DOM 后，元素原本的「子元素」将不会再显示，并且这些子元素也不在 Shadow DOM 中，只有 <code>host.shadowRoot</code>  的子元素才是「子 DOM 树」中一部分。也就是说这个「子 DOM 树」的「根节点」是 <code>host.shadowRoot</code> 而非 host。 <code>host.shadowRoot</code> 是 ShadowRoot 的实例，而 ShadowRoot 则继承于 DocumentFragment，可通过原生 DOM API 操作其子元素。
  
 &nbsp;
  
 [我们](https://www.w3cdoc.com)需通过 <code>Element.attachShadow</code> 附加到元素，然后就能拿到附加后的 ShadowRoot 实例。 针对 ShadowRoot 这样一个原生 DOM Node 的的引用，除了利用 <code>ReactDOM.render</code> 或 <code>ReactDOM.createPortal</code>  ，[我们](https://www.w3cdoc.com)并不能轻易的将 React.Element 渲染到其中，除非直接接操作 DOM。
  
 <a name="CvZo0"></a>
  
  <h2 id="10">
    6.2. 基于直接操作 DOM 改造一版
  

 在 React 中通过 ref 拿到真实的 DOM 引用后，是否能通过原生的 DOM  API，将 host 的 children 移动到 host.shadowRoot 中？
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">import&lt;/span> React &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> ReactDOM &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react-dom"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment" spellcheck="true">// 基于直接操作 DOM 的方式改造的一版&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">ShadowView&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function-variable function">attachShadow&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>host&lt;span class="token punctuation">:&lt;/span> Element&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> shadowRoot &lt;span class="token operator">=&lt;/span> host&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> mode&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"open"&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token comment" spellcheck="true">//将所有 children 移到 shadowRoot 中&lt;/span>
    &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">.&lt;/span>slice&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">call&lt;/span>&lt;span class="token punctuation">(&lt;/span>host&lt;span class="token punctuation">.&lt;/span>children&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">forEach&lt;/span>&lt;span class="token punctuation">(&lt;/span>child &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
      shadowRoot&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">appendChild&lt;/span>&lt;span class="token punctuation">(&lt;/span>child&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> children &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>props&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>div ref&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>attachShadow&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>
      &lt;span class="token punctuation">{&lt;/span>children&lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment" spellcheck="true">// 验证一下&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">App&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  state &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'...'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function-variable function">onBtnClick&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">setState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'haha'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> message &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>div&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
        &lt;span class="token operator">&lt;&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">{&lt;/span>message&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>
        &lt;span class="token operator">&lt;&lt;/span>button onClick&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>onBtnClick&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>内部单击&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>button&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>button onClick&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>onBtnClick&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>外部单击&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>button&lt;span class="token operator">>&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">&lt;&lt;/span>App &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">,&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"root"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 在[浏览器](https://www.w3cdoc.com)中看看效果，可以看到是可以正常显示的。但与此同时会发现一个问题「隔离在 ShadowRoot 中的元素上的事件无法被触发了」，这是什么原因呢？
  
 是由于 React 的「合成事件机制」的导致的，[我们](https://www.w3cdoc.com)知道在 React 中「事件」并不会直接绑定到具体的 DOM 元素上，而是通过在 document 上绑定的 ReactEventListener 来管理， 当时元素被单击或触发其他事件时，事件被 dispatch 到 document 时将由 React 进行处理并触发相应合成事件的执行。
  
 那为什么合成事件在 Shadow DOM 中不能被正常触发？是因为当在 Shadow DOM 外部捕获时[浏览器](https://www.w3cdoc.com)会对事件进行「重定向」，也就是说在 Shadow DOM 中发生的事件在外部捕获时将会使用 host 元素作为事件源。这将让 React 在处理合成事件时，不认为 ShadowDOM 中元素基于 JSX 语法绑定的事件被触发了。
  
 <img loading="lazy" width="2164" height="1406" class="alignnone size-full wp-image-5122 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png?x-oss-process=image/format,webp 2164w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_195/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_499/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7faa1856f7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_520/format,webp 800w" sizes="(max-width: 2164px) 100vw, 2164px" />
  
 &nbsp;
  
 <a name="uMiat"></a>
  
  <h2 id="11">
    6.3. 利用 ReactDOM.render 改造一下
  

 ReactDOM.render 的第二个参数，可传入一个 DOM 元素。那是不是能通过 ReactDOM.render 将 React Eements 渲染到 Shodaw DOM 中呢？看一下如下尝试：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript" data-spm-anchor-id="ata.13261165.0.i2.703736d0HVWJkY">&lt;span class="token keyword">import&lt;/span> React &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> ReactDOM &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react-dom"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment" spellcheck="true">// 换用 ReactDOM.render 实现&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">ShadowView&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function-variable function">attachShadow&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>host&lt;span class="token punctuation">:&lt;/span> Element&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> children &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>props&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">const&lt;/span> shadowRoot &lt;span class="token operator">=&lt;/span> host&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> mode&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"open"&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>children&lt;span class="token punctuation">,&lt;/span> shadowRoot&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>div ref&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>attachShadow&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment" spellcheck="true">// 试试效果如何&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">App&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  state &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'...'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function-variable function">onBtnClick&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">setState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'haha'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token function">alert&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'haha'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> message &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">{&lt;/span>message&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>button onClick&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>onBtnClick&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>单击我&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>button&lt;span class="token operator">>&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">&lt;&lt;/span>App &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">,&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"root"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 可以看到通过 ReactDOM.render 进行 children 的渲染，是能够正常渲染到 Shadow Root 中，并且在 Shadow DOM 中合成事件也是能正常触发执行的。
  
 为什么此时「隔离在 Shadow DOM 中的元素事件」能够被触发了呢？ 因为在 Reac 在发现渲染的目标在 ShadowRoot 中时，将会将事件绑定在通过 Element.getRootNode() 获取的 DocumentFragment 的 RootNode 上。
  
 <img loading="lazy" class="alignnone  wp-image-5121 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png?x-oss-process=image/format,webp" alt="" width="596" height="403" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png?x-oss-process=image/format,webp 1228w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_203/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_519/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fa8c6039b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_541/format,webp 800w" sizes="(max-width: 596px) 100vw, 596px" />
  
 看似一切顺利，但却会发现父组件的 state 更新时，而 ShadowView 组件并没有更新。如上边的示例，其中的 message 显示的还是旧的，而原因就在[我们](https://www.w3cdoc.com)使用 ReactDOM.render 时，Shadow DOM 的元素和父组件不在一个 React 渲染上下文中了。
  
 <a name="aODnA"></a>
  
  <h2 id="12">
    6.4. 利用 ReactDOM.createPortal 实现一版
  

 [我们](https://www.w3cdoc.com)知道 createPortal 的出现为「弹窗、提示框」等脱离文档流的组件开发提供了便利，替换了之前不稳定的 API unstable_renderSubtreeIntoContainer。
  
 ReactDOM.createPortal 有一个特性是「通过 createPortal 渲染的 DOM，事件可以从 Portal 的入口端冒泡上来」，这一特性很关键，没有父子关系的 DOM ，合成事件能冒泡过来，那通过  createPortal 渲染到 Shadow DOM 中的元素的事件也能正常触发吧？并且能让所有元素的渲染在一个上下文中。那就基于 createPortal 实现一下：
  
  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">import&lt;/span> React &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> ReactDOM &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react-dom"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment" spellcheck="true">// 利用 ReactDOM.createPortal 的实现&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">ShadowContent&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> root&lt;span class="token punctuation">,&lt;/span> children &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">return&lt;/span> ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">createPortal&lt;/span>&lt;span class="token punctuation">(&lt;/span>children&lt;span class="token punctuation">,&lt;/span> root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">ShadowView&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  state &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span> root&lt;span class="token punctuation">:&lt;/span> &lt;span class="token keyword">null&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function-variable function">setRoot&lt;/span> &lt;span class="token operator">=&lt;/span> eleemnt &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> root &lt;span class="token operator">=&lt;/span> eleemnt&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">attachShadow&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> mode&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"open"&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">setState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> root &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> children &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>props&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> root &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>div ref&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>setRoot&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>
      &lt;span class="token punctuation">{&lt;/span>root &lt;span class="token operator">&&&lt;/span> &lt;span class="token operator">&lt;&lt;/span>ShadowContent root&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>root&lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">>&lt;/span>
        &lt;span class="token punctuation">{&lt;/span>children&lt;span class="token punctuation">}&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowContent&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment" spellcheck="true">// 试试如何&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">App&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  state &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'...'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function-variable function">onBtnClick&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=>&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">setState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> message&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'haha'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> message &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token operator">&lt;&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>div&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">{&lt;/span>message&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>button onClick&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>onBtnClick&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">>&lt;/span>单击我&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>button&lt;span class="token operator">>&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">&lt;&lt;/span>App &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">,&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"root"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 <img loading="lazy" width="2164" height="1406" class="alignnone size-full wp-image-5123 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png?x-oss-process=image/format,webp 2164w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_195/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_499/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7fab05b209.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_520/format,webp 800w" sizes="(max-width: 2164px) 100vw, 2164px" />
  
 Wow! 一切正常，有一个小问题是 createPortal 不支持 React 16 以下的版本，但大多数情况下这并不是个什么大问题。
  
 <a name="y3TYp"></a>
  
  <h1 id="13">
    7. 面向 React 的 ShadowView 组件
  </h1>
 上边提到了几种在 React 中实现 Shadwo DOM 组件的方法，而 ShadowView 是一个写好的可开箱即用的面向 React 的 Shadow DOM 容器组件，利用 ShadowView 可以像普通组件一样方便的在 React 应用中创建启用 Shadow DOM 的容器元素。
  
 ShadowView 目前完整兼容支持 React 15/16，组件的「事件处理、组件渲染更新」等行为在两个版中都是一致的。
  
 GitHub: <a href="https://github.com/Houfeng/shadow-view?spm=ata.13261165.0.0.703736d0HVWJkY" data-spm-anchor-id="ata.13261165.0.0">https://github.com/Houfeng/shadow-view</a>
  
 <a name="Dw1SA"></a>
  
  <h2 id="14">
    7.1. 安装组件
  

  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-bash"><code class=" language-bash">&lt;span class="token function">npm&lt;/span> i shadow-view --save
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 <a name="uwOxQ"></a>
  
  <h2 id="15">
    7.2. 使用组件
  

  <div class="highlight">
    <div class="copytoclipboard-wrapper" style="position: relative;">
      <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token keyword">import&lt;/span> &lt;span class="token operator">*&lt;/span> &lt;span class="token keyword">as&lt;/span> React &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> &lt;span class="token operator">*&lt;/span> &lt;span class="token keyword">as&lt;/span> ReactDOM &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"react-dom"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">import&lt;/span> &lt;span class="token punctuation">{&lt;/span> ShadowView &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">"shadow-view"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">App&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>ShadowView
       styleContent&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token template-string">&lt;span class="token string">`*{color:red;}`&lt;/span>&lt;/span>&lt;span class="token punctuation">}&lt;/span>
       styleSheets&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">[&lt;/span>
          &lt;span class="token string">'your_style1_url.css'&lt;/span>&lt;span class="token punctuation">,&lt;/span>
          &lt;span class="token string">'your_style2_url.css'&lt;/span>
       &lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>style&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token template-string">&lt;span class="token string">`在这儿也可写内部样式`&lt;/span>&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>style&lt;span class="token operator">>&lt;/span>
      &lt;span class="token operator">&lt;&lt;/span>div&lt;span class="token operator">>&lt;/span>这是一个测试&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>div&lt;span class="token operator">>&lt;/span>
    &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>ShadowView&lt;span class="token operator">>&lt;/span>
  &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

ReactDOM&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">&lt;&lt;/span>App&lt;span class="token operator">/&lt;/span>&lt;span class="token operator">>&lt;/span>&lt;span class="token punctuation">,&lt;/span> document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">getElementById&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'root'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

      
        <button class="copytoclipboard btn btn-default" style="position: absolute; top: 10px; right: 10px;">Copy</button>
      
    </div>
  </div>
 <a name="ZMGXF"></a>
  
  <h2 id="16">
    7.3. 组件属性
  

  <div class="table-contianer">
    <table data-spm-anchor-id="ata.13261165.0.i5.703736d0HVWJkY">
      <tr>
        <th>
         属性名
        </th>

        <th>
         类型
        </th>
        
        <th>
         说明
        </th>
      </tr>
      
      <tr>
        <td align="left">
          className
        </td>
        
        <td align="left">
          string
        </td>
        
        <td align="left">
          组件自身 className
        </td>
      </tr>
      
      <tr>
        <td align="left">
          style
        </td>
        
        <td align="left">
          any
        </td>
        
        <td align="left">
          组件自身的内联样式
        </td>
      </tr>
      
      <tr>
        <td align="left">
          styleContent
        </td>
        
        <td align="left">
          string
        </td>
        
        <td align="left">
          作用于 ShadowView 内部的样式
        </td>
      </tr>
      
      <tr>
        <td align="left">
          styleSheets
        </td>
        
        <td align="left">
          string[]
        </td>
        
        <td align="left">
          作用于 ShadowView 内部的外联样式表
        </td>
      </tr>
      
      <tr>
        <td align="left">
          scoped
        </td>
        
        <td align="left">
          boolean
        </td>
        
        <td align="left">
          是否开始隔离，默认为 true
        </td>
      </tr>
      
      <tr>
        <td align="left">
          tagName
        </td>
        
        <td align="left">
          string
        </td>
        
        <td align="left">
          外层容器 tagName，默认为 shadow-view
        </td>
      </tr>
    </table>
  </div>
  <hr />
 那么，ShadowView 是如何兼容支持 React 15 的呢？ 可在 <a href="https://github.com/Houfeng/shadow-view?spm=ata.13261165.0.0.703736d0HVWJkY" data-spm-anchor-id="ata.13261165.0.0">https://github.com/Houfeng/shadow-view</a> 一探究竟。
  
 &#8212; END &#8212;
