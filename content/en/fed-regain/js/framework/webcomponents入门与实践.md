---
title: web components入门与实践

---
 Web Components是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的web应用中使用它们。 作为开发者，[我们](https://www.w3cdoc.com)都知道尽可能多的重用代码是一个好主意。这对于自定义标记结构来说通常不是那么容易 — 想想复杂的HTML（以及相关的样式和脚本），有时您不得不写代码来呈现自定义UI控件，并且如果您不小心的话，多次使用它们会使您的页面变得一团糟。 Web Components旨在解决这些问题 — 它由四项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

* **Custom elements（自定义元素）：**一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
* **Shadow DOM（影子DOM）**：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。看这里（ [Shadow DOM简单了解][1]）
* **HTML templates（HTML模板）：**<a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <template> 元素 是一种用于保存客户端内容的机制，该内容在页面加载时不被渲染，但可以在运行时使用JavaScript进行实例化。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template">&lt;template></a> 和 <a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <slot> 标签是web组件技术的一部分，slot是web组件的一个占位符，可以用来插入自定义的标记文本。可以创建不同的DOM树并进行渲染。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot">&lt;slot></a> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。
* **[HTML Imports（HTML导入）][2]：**一旦定义了自定义组件，最简单的重用它的方法就是使其定义细节保存在一个单独的文件中，然后使用导入机制将其导入到想要实际使用它的页面中。HTML 导入就是这样一种机制，尽管存在争议 — Mozilla 根本不同意这种方法，并打算在将来实现更合适的。

实现web component的基本方法通常如下所示：

  1. 使用ECMAScript 2015类语法创建一个类，来指定web组件的功能(参阅[类][3]获取更多信息)。
  2. 使用[`CustomElementRegistry.define()`][4]方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类以及可选的，其所继承自的元素。
  3. 如果需要的话，使用[`Element.attachShadow()`][5]方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
  4. 如果需要的话，使用<a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <template> 元素 是一种用于保存客户端内容的机制，该内容在页面加载时不被渲染，但可以在运行时使用JavaScript进行实例化。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template">&lt;template></a> 和 <a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <slot> 标签是web组件技术的一部分，slot是web组件的一个占位符，可以用来插入自定义的标记文本。可以创建不同的DOM树并进行渲染。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot">&lt;slot></a>方法定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中。
  5. 在页面任何您喜欢的位置使用自定义元素，就像使用常规HTML元素那样。

# 生命周期 {#生命周期}

[我们](https://www.w3cdoc.com)以polymer3为例，PolymerElement 继承了 HTMLElement，所以它拥有和 HTMLElement 一致的生命周期。 **constructor**：组件被 create 的时候会被调用，整个生命周期中最早触发也只会触发一次，通常可以在这里做一些初始化私有变量、记录数据的一些操作；但是出于性能和职责分离的考虑，不建议在这里做一些 DOM 相关的事情。 **connectedCallback**：组件被 `连接` 到 DOM Tree 的时候会触发，这个时机包括节点被插入节点树、节点被从节点树中移动，所以它可能会被触发多次。你可以在这里监听 DOM 事件或者对 DOM 节点做一些修改。 **disconnectedCallback**：组件被从 DOM Tree 中移除的时候触发，这个生命周期也可能被触发多次。如果你在 connectedCallback 中监听了事件，一定要记得在这里移除，否则事件监听回调可能会一直引用导致内存泄露和一些奇怪的问题。 **adoptedCallback**：不常用，不多介绍。 **attributeChangedCallback**：当组件的 attribute 发生变化的时候触发，它的三个形参分别是 `name, oldValue, newValue`，记得别把顺序搞反了。如果你声明了 properties 对象，对 attribute 的相应值变化也会触发这个回调。需要注意的是，如果你覆盖了组件的 `observedAttributes` 静态方法，properties 对象中声明的值不会触发，它会按照你覆盖的 `observedAttributes` 静态方法的返回值为准。 除此之外，polymer 还额外添加了一些生命周期 **ready**：由于 HTMLElement 的生命周期中没有一个可以操作 DOM，又只触发一次的周期，Polymer 人为地添加了 ready 这个时机，它在整个生命周期中只会触发一次，也就是第一次节点插入到 DOM 树的时刻。 记得调用 `super.ready()` 来触发 `PolymerElement` 的初始化阶段。在初始化阶段，Polymer 会做以下几件事情：

* attache 组件实例的 Shadow DOM，所以在这个阶段之后才可以访问 `this.shadowRoot`
* 初始化 properties，并赋初始值
* 如果 properties 有声明 observer 或者 computed，会执行它们

通常可以在 ready 函数中给组件实例添加一个 `this._isReady = true;` 的状态以标明组件已经 ready。

# 实践教程 {#教程}

## [Using custom elements][6]

:   介绍如何使用自定义元素的功能来创建简单的web components，以及生命周期回调和其他更高级的功能。

## [Using shadow DOM][7]

:   介绍shadow DOM的基础知识，展示如何向元素中附加shadow DOM，添加到shadow DOM树，添加样式等等。
:   ```
&lt;!DOCTYPE html>
&lt;html>
  &lt;head>
    &lt;meta charset="utf-8">
    &lt;title>Simple DOM example&lt;/title>
  &lt;/head>
  &lt;body>
      &lt;section>
        &lt;img src="dinosaur.png" alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">
        &lt;p>Here we will add a link to the &lt;a href="https://www.mozilla.org/">Mozilla homepage&lt;/a>&lt;/p>
      &lt;/section>
  &lt;/body>
&lt;/html>
```
:   上面这个代码产生的DOM结构如下：<img loading="lazy" class="" src="https://mdn.mozillademos.org/files/14559/dom-screenshot.png" alt="" width="532" height="294" /> Shadow DOM 允许将隐藏的DOM树附加到一个常规的DOM节点上，这个附加的Shadow DOM树从根节点shadow root开始，下面可以像常规DOM操作一样挂载你想要的DOM节点。<img loading="lazy" class="aligncenter" src="https://mdn.mozillademos.org/files/15788/shadow-dom.png" alt="" width="587" height="280" />   Shadow DOM一些术语：

      * **Shadow host**: shadow DOM附加的宿主DOM节点
      * **Shadow tree**: shadow DOM下的DOM树
      * **Shadow boundary**: shadow DOM 结束, regular DOM 开始的分界.
      * **Shadow root**: shadow dom根节点.   shadow DOM 的节点操作和常规DOM的操作几乎没有区别， 唯一的区别是shadow DOM 的操作不会影响外面任何正常DOM的数据和展示。shadow DOM其实并不是什么新的概念， 
    
    <a style="text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="The HTML Video element (<video>) embeds a media player which supports video playback into the document." href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video">&lt;video></a>标签最早的实现原理就是利用shadow DOM来展示处理播放器的操作按钮等元素。shadow DOM 规范主要是为了方便开发者操作自定义的DOM元素下的shadow DOM。
:

## [Using templates and slots][8]

:   介绍如何使用<a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <template> 元素 是一种用于保存客户端内容的机制，该内容在页面加载时不被渲染，但可以在运行时使用JavaScript进行实例化。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template">&lt;template></a> 和 <a style="font-style: normal !important; text-decoration: none; color: #3d7e9a; margin: 0px; padding: 0px; border: 0px;" title="HTML <slot> 标签是web组件技术的一部分，slot是web组件的一个占位符，可以用来插入自定义的标记文本。可以创建不同的DOM树并进行渲染。" href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot">&lt;slot></a> 元素定义可重用的HTML结构，然后在Web components中使用该结构。
:
:   综合实践，如下面这个例子：

[我们](https://www.w3cdoc.com)可以看到这样的代码：

    static get template() {
        return html`xxxx`
    }

其实这是[我们](https://www.w3cdoc.com)之前介绍过的 [基于ES6标签模板实现事件绑定与数据监听][9] 中的标签模板。  

# [前端](https://www.w3cdoc.com)进阶系列视频课程

《[用JavaScript自己写Virtual DOM][10]》：<https://t.cn/REeKJp0>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

《[前端](https://www.w3cdoc.com)函数式编程FP易学易用》：<https://t.cn/REeKVSk>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

《[前端](https://www.w3cdoc.com)自己用NodeJS编写区块链BlockChain》：<https://t.cn/REeoF7v>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

《程序语言进阶之DSL与AST实战解析》：<https://t.cn/R3XoQJA>  
:

# 参考：

  1. [polymer3][11]
  2. [Web Components 最佳实践][12]
  3. <https://developer.mozilla.org/zh-CN/docs/Web/Web_Components>

<audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio>

 [1]: https://www.f2e123.com/html5css3/3820.html
 [2]: https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/HTML%E5%AF%BC%E5%85%A5
 [3]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes
 [4]: https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define "CustomElementRegistry接口的define()方法定义了一个自定义元素。"
 [5]: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow "Element.attachShadow() 方法给指定的元素挂载一个Shadow DOM，并且返回它的 ShadowRoot."
 [6]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
 [7]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 [8]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/jiyues6biaoqianmobanshixianshijianbangdingyushujujianting/
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/hanshushibianchengyuvirtualdom/
 [11]: https://www.polymer-project.org/3.0/start/
 [12]: https://taobaofed.org/blog/2018/10/31/a-tag/
