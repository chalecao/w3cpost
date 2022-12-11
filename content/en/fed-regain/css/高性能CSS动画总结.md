---
title: 高性能CSS动画总结
weight: 18


---
CSS Animation是实现Web Animation方法之一，其主要通过`@keyframes`和`animation-*`或者`transition`来实现一些Web动效。不过今天[我们](https://www.w3cdoc.com)聊的不是怎么制作Web动画，咱们来聊聊CSS Animation性能相关的话题。

# [浏览器](https://www.w3cdoc.com)渲染机制

关于[浏览器](https://www.w3cdoc.com)工作原理之前有一篇非常出名的文章《<a href="https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/" target="_blank" rel="noopener noreferrer">[浏览器](https://www.w3cdoc.com)的工作原理：新式网络[浏览器](https://www.w3cdoc.com)幕后揭秘</a>》。文章详细阐述了[浏览器](https://www.w3cdoc.com)工作原理，下面用两张图来分别描述Firefox和Chrome[浏览器](https://www.w3cdoc.com)对Web页面的渲染过程。

FireFox[浏览器](https://www.w3cdoc.com)渲染流程：

![](/images/posts/2022-12-04-14-14-01.png)

Chrome[浏览器](https://www.w3cdoc.com)渲染流程：

![](/images/posts/2022-12-04-14-14-19.png)

有关于Chrome[浏览器](https://www.w3cdoc.com)渲染的详细内容，可以参考《<a href="https://github.com/abcrun/abcrun.github.com/issues/17" target="_blank" rel="noopener noreferrer">图解[浏览器](https://www.w3cdoc.com)渲染过程 - 基于Webkit/Blink内核Chrome[浏览器](https://www.w3cdoc.com)</a>》一文著作权归作者所有。

从上面的流程图中不难看出，Chrome渲染主要包括Parse Html、Recalculate Style、Layout、Rasterizer、Paint、Image Decode、Image Resize和Composite Layers等。简单了解一下其含义，以便后续内容的更好理解。

#### Parse Html

发送一个`http`请求，获取请求的内容，然后解析HTML的过程。

> 有一个经典的[前端](https://www.w3cdoc.com)面试题：**<a href="https://github.com/skyline75489/what-happens-when-zh_CN" target="_blank" rel="noopener noreferrer">当你在[浏览器](https://www.w3cdoc.com)中输入google.com并且按下回车之后发生了什么？</a>** 这个面试题或许能帮助[大家](https://www.w3cdoc.com)更好的理解Parse Html，甚至是[浏览器](https://www.w3cdoc.com)渲染的其他几个部分。

#### Recalculate Style

重新计算样式，它计算的是Style，和Layout做的事情完全不同。Layout计算的是一个元素绝对的位置和尺寸，或者说是“Compute Layout”。

Recalculate被触发的时候做的事情就是处理JavaScript给元素设置的样式而已。Recalculate Style会计算Render树（渲染树）,然后从根节点开始进行页面渲染，将CSS附加到DOM上的过程。

**任何企图改变元素样式的操作都会触发Recalculate**。同Layout一样，它也是在JavaScript执行完成后才触发的。

#### Layout

计算页面上的布局，即元素在文档中的位置及大小。正如前面所述，Layout计算的是布局位置信息。任何有可能改变元素位置或大小的样式都会触发这个Layout事件。

触发Layout的属性非常的多，如果想了解什么属性会触发Layout事件，可以在**<a href="https://csstriggers.com/" target="_blank" rel="noopener noreferrer">CSS Triggers</a>**网站查阅。下图截了一部分：

#### Rasterizer

光栅化，一般的安卓手机都会进行光栅化，光栅主要是针对图形的一个栅格化过程。低端手机在这部分耗时还是蛮多的。

#### Paint

页面上显示东西有任何变动都会触发Paint。包括拖动滚动条，鼠标选择中文字等这些完全不改变样式，只改变显示结果的动作都会触发Paint。

Paint的工作就是把文档中用户可见的那一部分展现给用户。Paint是把Layout和Recalculate的计算的结果直接在[浏览器](https://www.w3cdoc.com)视窗上绘制出来，它并不实现具体的元素计算。

#### Image Decode

图片解码，将图片解析到[浏览器](https://www.w3cdoc.com)上显示的过程。

#### Image Resize

图片的大小设置，图片加载解析后，若发现图片大小并不是实际的大小（CSS改变了宽度），则需要Resize。Resize越大，耗时越久，所以尽量以图片的原始大小输出。

#### Composite Layers

最后合并图层，输出页面到屏幕。[浏览器](https://www.w3cdoc.com)在渲染过程中会将一些含有特殊样式的DOM结构绘制于其他图层，有点类似于PhotoShop的图层概念。一张图片在PotoShop是由多个图层组合而成，而[浏览器](https://www.w3cdoc.com)最终显示的页面实际也是有多个图层构成的。

下面这些因素都会导致新图层的创建：

* 进行3D或者透视变换的CSS属性
* 使用硬件加速视频解码的`<video>`元素
* 具有3D（WebGL）上下文或者硬件加速的2D上下文的`<canvas>`元素
* 组合型插件（即Flash）
* 具有有CSS透明度动画或者使用动画式Webkit变换的元素
* 具有硬件加速的CSS滤镜的元素

有关于Composite方面的深入剖析，可以阅读《<a href="https://taobaofed.org/blog/2016/04/25/performance-composite/" target="_blank" rel="noopener noreferrer">无线性能优化：Composite</a>》一文。

## [像素管道][1] {#_1}

您在工作时需要了解并注意五个主要区域。 这些是您拥有最大控制权的部分，也是像素至屏幕管道中的关键点：

> javascript > style > layout > paint > Composite

* **JavaScript**。一般来说，[我们](https://www.w3cdoc.com)会使用 JavaScript 来实现一些视觉变化的效果。比如用 jQuery 的 `animate` 函数做一个动画、对一个数据集进行排序或者往页面里添加一些 DOM 元素等。当然，除了 JavaScript，还有其他一些常用方法也可以实现视觉变化效果，比如：CSS Animations、Transitions 和 Web Animation API。
* **样式计算**。此过程是根据匹配选择器（例如 `.headline` 或 `.nav > .nav__item`）计算出哪些元素应用哪些 CSS 规则的过程。从中知道规则之后，将应用规则并计算每个元素的最终样式。
* **布局**。在知道对一个元素应用哪些规则之后，[浏览器](https://www.w3cdoc.com)即可开始计算它要占据的空间大小及其在屏幕的位置。网页的布局模式意味着一个元素可能影响其他元素，例如 `<body>` 元素的宽度一般会影响其子元素的宽度以及树中各处的节点，因此对于[浏览器](https://www.w3cdoc.com)来说，布局过程是经常发生的。
* **绘制**。绘制是填充像素的过程。它涉及绘出文本、颜色、图像、边框和阴影，基本上包括元素的每个可视部分。绘制一般是在多个表面（通常称为层）上完成的。
* **合成**。由于页面的各部分可能被绘制到多层，由此它们需要按正确顺序绘制到屏幕上，以便正确渲染页面。对于与另一元素重叠的元素来说，这点特别重要，因为一个错误可能使一个元素错误地出现在另一个元素的上层。

管道的每个部分都有机会产生卡顿，因此务必准确了解您的代码触发管道的哪些部分。

有时您可能听到与绘制一起使用的术语“栅格化”。这是因为绘制实际上分为两个任务： 1) 创建绘图调用的列表，以及 2) 填充像素。

后者称为“栅格化”，因此每当您在 DevTools 中看到绘制记录时，就应当将其视为包括栅格化。 （在某些架构下，绘图调用的列表创建以及栅格化是在不同的线程中完成，但是这不是开发者所能控制的。）

不一定每帧都总是会经过管道每个部分的处理。实际上，不管是使用 JavaScript、CSS 还是网络动画，在实现视觉变化时，管道针对指定帧的运行通常有三种方式：

## 1. JS / CSS > 样式 > 布局 > 绘制 > 合成 {#1_js_css}

> javascript > style > layout > paint > Composite

如果您修改元素的“layout”属性，也就是改变了元素的几何属性（例如宽度、高度、左侧或顶部位置等），那么[浏览器](https://www.w3cdoc.com)将必须检查所有其他元素，然后“自动重排”页面。任何受影响的部分都需要重新绘制，而且最终绘制的元素需进行合成。

## 2. JS / CSS > 样式 > 绘制 > 合成 {#2_js_css}

> javascript > style >  > paint > Composite

如果您修改“paint only”属性（例如背景图片、文字颜色或阴影等），即不会影响页面布局的属性，则[浏览器](https://www.w3cdoc.com)会跳过布局，但仍将执行绘制。

## 3. JS / CSS > 样式 > 合成 {#3_js_css}

> javascript > style >  >  > Composite

如果您更改一个既不要布局也不要绘制的属性，则[浏览器](https://www.w3cdoc.com)将跳到只执行合成。

这个最后的版本开销最小，最适合于应用生命周期中的高压力点，例如动画或滚动。

<aside class="note">
 Note: 如果想知道更改任何指定 CSS 属性将触发上述三个版本中的哪一个，请查看 <a href="https://csstriggers.com/">CSS 触发器</a>。如果要快速了解高性能动画，请阅读<a href="https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count?hl=zh-cn">更改仅合成器的属性</a>部分。
</aside>

性能是一种避免执行工作的艺术，并且使您执行的任何操作尽可能高效。 许多情况下，这需要与[浏览器](https://www.w3cdoc.com)配合，而不是跟它对着干。 值得谨记的是，上面列出的各项管道工作在计算开销上有所不同；一些任务比其他任务的开销要大！

## 渲染性能

在理解渲染性能之前，[我们](https://www.w3cdoc.com)有必要先了解前面提到的两个概念**重排（也就是回流）**和**重绘**。因为这两者与前面介绍的像素渲染流水线中的**Layout**和**Paint**都有关系，而且Layout和Paint对性能的渲染又有莫大的关系。

### Reflow（重排）

Reflow（重排）指的是计算页面布局（Layout）。某个节点Reflow时会重新计算节点的尺寸和位置，而且还有可能触其后代节点Reflow。在这之后再次触发一次Repaint（重绘）

当Render Tree中的一部分（或全部）因为元素的尺寸、布局、隐藏等改变而需要重新构建。这就称为回流，每个页面至少需要一次回流，就是页面第一次加载的时候。

在Web页面中，很多状况下会导致回流：

* 调整窗口大小
* 改变字体
* 增加或者移除样式表
* 内容变化
* 激活CSS伪类
* 操作CSS属性
* JavaScript操作DOM
* 计算`offsetWidth`和`offsetHeight`
* 设置`style`属性的值
* CSS3 Animation或Transition

### Repaint（重绘）

Repaint（重绘）或者Redraw遍历所有节点，检测节点的可见性、颜色、轮廓等可见的样式属性，然后根据检测的结果更新页面的响应部分。

当Render Tree中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格、而不会影响布局的。就是重绘。

将重排和重绘的介绍结合起来，不难发现：**重绘（Repaint）不一定会引起回流（Reflow重排），但回流必将引起重绘（Repaint）**。

既然如此，那么什么情况之下会触发[浏览器](https://www.w3cdoc.com)的Repaint和Reflow呢？

* 页面首次加载
* DOM元素添加、修改(内容)和删除(Reflow + Repaint)
* 仅修改DOM元素的颜色(只有Repaint，因为不需要调整布局)
* 应用新的样式或修改任何影响元素外观的属性
* Resize[浏览器](https://www.w3cdoc.com)窗口和滚动页面
* 读取元素的某些属性(`offsetLeft`、`offsetTop`、`offsetHeight`、`offsetWidth`、`getComputedStyle()`等)

可以说Reflow和Repaint都很容易触发，而它们的触发对性能的影响都非常大，但非常不幸的是，[我们](https://www.w3cdoc.com)无法完全避免，只能尽量不去触发[浏览器](https://www.w3cdoc.com)的Reflow和Repaint。

从前面的内容可以了解到，Reflow和Repaint对性能影响很大，那么具体哪些点会影响到渲染性能呢？

### 影响Layout的属性

当你改变页面上某个元素的时候，[浏览器](https://www.w3cdoc.com)需要做一次重新布局的操作，这次操作会包括计算受操作影响所有元素的几何数，比如每个元素的位置和尺寸。如果你修改了`html`这个元素的`width`属性，那么整个页面都会被重绘。

由于元素相覆盖，相互影响，稍有不慎的操作就有可能导致一次自上而下的布局计算。所以[我们](https://www.w3cdoc.com)在进行元素操作的时候要一再小心尽量避免修改这些重新布局的属性。

具体有关于会影响Layout的CSS属性可以在<a href="https://csstriggers.com/" target="_blank" rel="noopener noreferrer">CSS Triggers</a>网站中查阅。

### 影响Repaint的属性

有些属性的修改不会触发重排，但会触Repaint（重绘）,现代[浏览器](https://www.w3cdoc.com)中主要的绘制工作主要用光栅化软件来完成。所以重新会制的元素是否会很大程度影响你的性能，是由这个元素和绘制层级的关系来决定的，如果这个元素盖住的元素都被重新绘制，那么代价自然就相当地大。

具体有关于会影响Layout的CSS属性可以在<a href="https://csstriggers.com/" target="_blank" rel="noopener noreferrer">CSS Triggers</a>网站中查阅。

如果你在动画里面使用了上述某些属性，导致重绘，这个元素所属的图层会被重新上传到GPU。在移动设备上这是一个很昂贵耗资源的操作，因为移动设备的CPU明显不如你的电脑，这也意味着绘制的工作会需要更长的时间；而上传线CPU和GPU的带宽并非没有限制，所以重绘的纹理上传就自然需要更长的时间。

<a href="https://csstriggers.com/" target="_blank" rel="noopener noreferrer">CSS Triggers</a>网站中可以得知哪些属性会触发重排、哪些属性会触发重绘以及哪些属性会触合成。但并不是CSS中所有的属性都可以用于CSS Animation和Transition中的。在W3C官方规范中明确定了哪些CSS属性可以用于<a href="https://www.w3.org/TR/css3-transitions/#animatable-css" target="_blank" rel="noopener noreferrer">Animation</a>和<a href="https://www.w3.org/TR/css3-transitions/#transition-property-property" target="_blank" rel="noopener noreferrer">Transition</a>中。<a href="https://rodneyrehm.de/" target="_blank" rel="noopener noreferrer">@Rodney Rehm</a>还对这些<a href="https://thewebevolved.com/support/animation/properties/" target="_blank" rel="noopener noreferrer">属性做过一个兼容测试</a>。如果你想深入的了解这方面的知识，建议您阅读下面两篇文章：

* <a href="https://oli.jp/2010/css-animatable-properties/" target="_blank" rel="noopener noreferrer">CSS animatable properties</a>
* <a href="https://www.smashingmagazine.com/2013/04/css3-transitions-thank-god-specification/" target="_blank" rel="noopener noreferrer">Thank God We Have A Specification!</a>

如此一来，[我们](https://www.w3cdoc.com)知道可用于CSS Animation或者Transition的CSS属性之后，再配合<a href="https://csstriggers.com/" target="_blank" rel="noopener noreferrer">CSS Triggers</a>网站，可以轻易掌握哪些CSS属性会触发重排、重绘和合成等。**虽然无法避免，但[我们](https://www.w3cdoc.com)可以尽量控制**。

# 性能优化

在像素渲染流水线中，得知，如果[我们](https://www.w3cdoc.com)能幸运的避免Layout和Paint，那么性能是最好的，言外之意，动画性能也将变得最佳。那么在CSS中可能通过不同的方式来创建新图层。其实这也就是[大家](https://www.w3cdoc.com)常说的，通过CSS的属性来触发GPU加速。[浏览器](https://www.w3cdoc.com)会为此元素单独创建一个“层”。当有单独的层之后，此元素的Repaint操作将只需要更新自己，不用影响到别人。你可以将其理解为局部更新。所以开启了硬件加速的动画会变得流畅很多。著作权归作者所有。  
商业转载请联系作者获得授权,非商业转载请注明出处。  
原文: <https://www.w3cplus.com/animation/animation-performance.html>

为什么开启硬件加速动画就会变得流畅，那是因为每个页面元素都有一个独立的Render进程。Render进程中包含了主线程和合成线程，主线程负责：

* JavaScript的执行
* CSS样式计算
* 计算Layout
* 将页面元素绘制成位图(Paint)
* 发送位图给合成线程

合成线程则主要负责：

* 将位图发送给GPU
* 计算页面的可见部分和即将可见部分(滚动)
* 通知GPU绘制位图到屏幕上(Draw)

[我们](https://www.w3cdoc.com)可以得到一个大概的[浏览器](https://www.w3cdoc.com)线程模型：

![](/images/posts/2022-11-25-00-04-50.png)

[我们](https://www.w3cdoc.com)可以将页面绘制的过程分为三个部分：Layout、Paint和合成。Layout负责计算DOM元素的布局关系，Paint负责将DOM元素绘制成位图，合成则负责将位图发送给GPU绘制到屏幕上（如果有`transform`、`opacity`等属性则通知GPU做处理）。

GPU加速其实是一直存在的，而如同`translate3D`这种hack只是为了让这个元素生成独立的 GraphicsLayer ， 占用一部分内存，但同时也会在动画或者Repaint的时候不会影响到其他任何元素，对高刷新频率的东西，就应该分离出单独的一个 GraphicsLayer。

GPU对于动画图形的渲染处理比CPU要快。

RenderLayer 树，满足以下任意一点的就会生成独立一个 RenderLayer。

* 页面的根节点的RenderObject
* 有明确的CSS定位属性（`relative`，`absolute`或者`transform`）
* 是透明的
* 有CSS overflow、CSS alpha遮罩（alpha mash）或者CSS reflection
* 有CSS 滤镜（fliter）
* 3D环境或者2D加速环境的canvas元素对应的RenderObject
* video元素对应的RenderObject

每个RenderLayer 有多个 GraphicsLayer 存在

* 有3D或者perspective transform的CSS属性的层
* 使用加速视频解码的video元素的层
* 3D或者加速2D环境下的canvas元素的层
* 插件，比如flash（Layer is used for a composited plugin）
* 对`opacity`和`transform`应用了CSS动画的层
* 使用了加速CSS滤镜（filters）的层
* 有合成层后代的层
* 同合成层重叠，且在该合成层上面（z-index）渲染的层

每个GraphicsLayer 生成一个 GraphicsContext, 就是一个位图，传送给GPU，由GPU合成放出。

那么就是说，GraphicsLayer过少则每次repaint大整体的工作量巨大，而过多则repaint小碎块的次数过多。这种次数过多就称为 层数爆炸 ，为了防止这个爆炸 Blink 引擎做了一个特殊处理。

> 有关于这部分内容的详细介绍，可以阅读《<a href="https://taobaofed.org/blog/2016/04/25/performance-composite/" target="_blank" rel="noopener noreferrer">无线性能优化：Composite</a>》一文。

扯了这么多，[我们](https://www.w3cdoc.com)可以稍微总结一下下：

不是所有属性动画消耗的性能都一样，其中消耗最低的是`transform`和`opacity`两个属性（当然还有会触发Composite的其他CSS属性），其次是Paint相关属性。所以在制作动画时，建议**使用`transform`的`translate`替代`margin`或`position`中的`top`、`right`、`bottom`和`left`，同时使用`transform`中的`scaleX`或者`scaleY`来替代`width`和`height`**。

为了确保页面的流程，必须保证`60fps`内不发生两次渲染树更新，比如下图，`16ms`内只发生如下几个操作则是正常及正确的：

![](/images/posts/2022-12-04-14-41-12.png)

页面滚动时，需要避免不必要的渲染及长时间渲染。其中不必要的渲染包括：

* `position:fixed;`。`fixed`定位在滚动时会不停的进行渲染，特别是页面顶部有一个`fixed`，页面底部有个类似返回顶部的`fixed`，则在滚动时会对整个页面进行渲染，效率非常低。可以通过`transform: translateZ(0)`或者`transform: translate3d(0,0,0)`来解决
* `overflow:scroll`。前面说了，而在滚动也会触发Repaint和Reflow。在调试过程中注意到一个有趣的现象，有时打开了页面并不会导致crash，但快速滑动的时候却会。由于crash是页面本身内存占比过高，只要优化了页面的内存占用，滑动自然也不会是很大的问题。无论你在什么时候滑动页面，页面滚动都是一个不断重新组合重新绘制的过程。所以**减少渲染区域在滚动里就显得非常重要**。
* CSS伪类触发。有些CSS伪类在页面滚动时会不小心触发到。比如`:hover`效果有`box-shadow`、`border-radius`等比较耗时的CSS属性时，建议页面滚动时，先取消`:hover`效果，滚动停止后再加上`:hover`效果。这个可以通过在外层添加类名进行控制。但添加类名、删除类名也会改变元素时，[浏览器](https://www.w3cdoc.com)就会要重新做一次计算和布局。所以千万要小心这种无意触发重新布局的操作，有的时候可能不是动画，但去付出的代价要比做一个动画更加昂贵。也就是说`classname`变化了，就一定会出现一次rendering计算，如果一定需要这么做，那可以使用 `classlist` 的方法。
* `touch`事件的监听

长时间渲染包括：

* 复杂的CSS
* Image Decodes：特别是图片的Image Decodes及Image Resize这两个过程在移动端是非常耗时的
* Large Empty Layers: 大的空图层

在CSS中除了开启3D加速能明显的让动画变得流畅之外，在CSS中提供了一个新的CSS特性:`will-change`。其主要作用就是**提前告诉[浏览器](https://www.w3cdoc.com)我这里将会进行一些变动，请分配资源(告诉[浏览器](https://www.w3cdoc.com)要分配资源给我)**。

> `will-change`属性，允许作者提前告知[浏览器](https://www.w3cdoc.com)的默认样式，那他们可能会做出一个元素。它允许对[浏览器](https://www.w3cdoc.com)默认样式的优化如何提前处理因素，在动画实际开始之前，为准备动画执行潜在昂贵的工作。有关于`will-change`更详细的介绍可以<a href="https://www.w3cplus.com/css3/introduction-css-will-change-property.html" target="_blank" rel="noopener noreferrer">点击这里</a>。

话说回来，`will-change`并不是万能的，不是说使用了`will-change`就对动画的性能有提高，而是要正确使用，才会有所改为。在使用`will-change`时应该注意：

* 不要将 `will-change` 应用到太多元素上：[浏览器](https://www.w3cdoc.com)已经尽力尝试去优化一切可以优化的东西了。有一些更强力的优化，如果与 `will-change` 结合在一起的话，有可能会消耗很多机器资源，如果过度使用的话，可能导致页面响应缓慢或者消耗非常多的资源。
* 有节制地使用：通常，当元素恢复到初始状态时，[浏览器](https://www.w3cdoc.com)会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 `will-change` 属性，则表示目标元素可能会经常变化，[浏览器](https://www.w3cdoc.com)会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换 `will-change` 的值。
* 不要过早应用 `will-change` 优化：如果你的页面在性能方面没什么问题，则不要添加 `will-change` 属性来榨取一丁点的速度。 `will-change` 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。它不应该被用来预防性能问题。过度使用 `will-change` 会导致大量的内存占用，并会导致更复杂的渲染过程，因为[浏览器](https://www.w3cdoc.com)会试图准备可能存在的变化过程。这会导致更严重的性能问题。
* 给它足够的工作时间：这个属性是用来让页面开发者告知[浏览器](https://www.w3cdoc.com)哪些属性可能会变化的。然后[浏览器](https://www.w3cdoc.com)可以选择在变化发生前提前去做一些优化工作。所以给[浏览器](https://www.w3cdoc.com)一点时间去真正做这些优化工作是非常重要的。使用时需要尝试去找到一些方法提前一定时间获知元素可能发生的变化，然后为它加上 `will-change` 属性。

在使用`will-change`一定要注意方式方法，比如常见的错误方法是直接在`:hover`是使用，并没有告诉[浏览器](https://www.w3cdoc.com)分配资源：

```
.element:hover {
    will-change: transform;
    transition: transform 2s;
    transform: rotate(30deg) scale(1.5);
}
```

其正确使用的方法是，在进入父元素的时候就告诉[浏览器](https://www.w3cdoc.com)，你该分配一定的资源：

```
.element {
    transition: opacity .3s linear;
}
/*declare changes on the element when the mouse enters / hovers its ancestor*/
.ancestor:hover .element {
    will-change: opacity;
}
/*apply change when element is hovered*/
.element:hover {
    opacity: .5;
}
```

另外在应用变化之后，取消`will-change`的资源分配:

```
var el = document.getElementById('demo');
el.addEventListener('animationEnd', removeHint);

function removeHint() {
    this.style.willChange = 'auto';
}
```

除了`will-change`能让[我们](https://www.w3cdoc.com)在制作动画变得更为流畅之外，在CSS层面上，还有别的方案吗？这个答案是肯定的。前面通过大幅的篇幅了解到，影响性能主要是因为重绘和重排。针对于这方面，CSS提供了一个新的属性`contain`。

## contain 属性

这个 contain 属性的主要目的是隔离指定内容的样式、布局和渲染。开发人员可以使用这个 contain 属性来限制指定的DOM元素和它的子元素同页面上其它内容的联系；[我们](https://www.w3cdoc.com)可以把它看做一个iframe。跟iframe很相似，它能建立起一个边界，产生一个新的根布局；保证了它和它的子元素的DOM变化不会触发父元素重新布局、渲染等。

### none | strict | layout | style | paint | size | contain

这个 contain 属性可以有7种不同的值。

* **none** 无
* **layout** 开启布局限制
* **style** 开启样式限制
* **paint** 开启渲染限制
* **size** 开启size限制
* **content** 开启除了size外的所有限制
* **strict**开启 layout, style 和 paint 三种限制组合

[我们](https://www.w3cdoc.com)已经知道了，使用这个 contain 属性可以将一个元素标志为和页面上其它元素是相对独立的元素。为了说明这个属性的作用，下面举几个使用例子：

### 页面小饰件(widgets)

通常在页面上添加第三方小饰件时，[我们](https://www.w3cdoc.com)几乎对它们没有什么太多的控制，比如分享工具，它们可能会因为具有相当耗资源的布局、样式、渲染操作等大幅度的降低整个页面的执行效率。为了将它们同[我们](https://www.w3cdoc.com)的网站隔离开来，使用 `contain: strict;` 将第三方的小饰件同页面上的其它内容隔离开来。

### 屏幕外的内容

如果你有一个导航栏或其它类似的东西并不在屏幕可现实范围内出现，[浏览器](https://www.w3cdoc.com)同样会为这些不可见的元素进行渲染。通过使用 `contain: paint;` [浏览器](https://www.w3cdoc.com)就会忽略渲染这些屏幕外不可见的元素，从而能更快的渲染其它内容。

### 计算容器尺寸

我在文字开头提到过这个问题，使用 `contain: strict;` 可以 [免去很多关于容器尺寸控制的问题][3]。比如，子元素的内容会影响容器的大小，使用 contain 属性就可以避免这样的问题产生。

### 为什么[浏览器](https://www.w3cdoc.com)不能自动的实现 contain 的功能

[浏览器](https://www.w3cdoc.com)已经尽可能的在页面下做了最大的优化，但每个[浏览器](https://www.w3cdoc.com)引擎的实现方法并不尽相同。而 contain 属性可以提供一种标准的方式让开发人员告诉 [[浏览器](https://www.w3cdoc.com)][4] 某些方面可以这样优化，哪些不能优化。

### 什么时候应该使用contain

如果你的页面很简单，没有复杂的DOM节点和小饰件(widgets)，那就没必要考虑使用这种CSS的contain技术。而如果你开发的页面非常复杂，那么，这个CSS的contain技术可以帮助你优化页面的性能。而对于第三方的小饰件，始终使用`contain: strict;`是很好的习惯，它可以保护你的页面不受它们的干扰而出现性能问题。

 [1]: https://developers.google.com/web/fundamentals/performance/rendering/?hl=zh-cn
 [2]: https://www.w3cplus.com/
 [3]: https://github.com/ResponsiveImagesCG/container-queries/issues/3#issuecomment-185951645
 [4]: https://www.w3.org/TR/UAAG20/#def-user-agent
