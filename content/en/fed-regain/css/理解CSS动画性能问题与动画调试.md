---
title: 理解CSS动画性能问题与动画调试
weight: 16
---
你可能已经在一些项目中使用过CSS Animations 或者CSS Transitions（如果没有，可以到CSS-Trick上查阅相关的资料：<a href="http://css-tricks.com/almanac/properties/a/animation/" target="_blank" rel="nofollow noopener noreferrer">animations</a>&<a href="http://css-tricks.com/almanac/properties/t/transition/" target="_blank" rel="nofollow noopener noreferrer">transitions</a>）你所做的一些动画可能是平滑的，但其中有一部分可能会很不连贯。你想知道为什么吗？

在本文中，[我们](https://www.w3cdoc.com)将探讨[浏览器](https://www.w3cdoc.com)怎么处理 CSS Animations以及Transitions，这样在你编写任何代码之前，就可以大概知道一个动画是否能表现得很流畅！有了这种直觉，你就能够作出适应[浏览器](https://www.w3cdoc.com)的设计，创造如丝般顺滑的用户体验。

## <a name="t0"></a>[浏览器](https://www.w3cdoc.com)内部 {#[浏览器](https://www.w3cdoc.com)内部}

让[我们](https://www.w3cdoc.com)打开[浏览器](https://www.w3cdoc.com)的引擎盖，四处看看。一旦[我们](https://www.w3cdoc.com)理解它是如何工作的，[我们](https://www.w3cdoc.com)就可以更好的驾驭它。

现代的[浏览器](https://www.w3cdoc.com)通常会有两个重要的执行线程，这2个线程协同工作来渲染一个网页：

* 主线程
* 合成线程

一般情况下，主线程负责：

* 运行JavaScript。
* 计算HTML 元素的 CSS 样式。
* 页面的布局
* 将元素绘制到一个或多个位图中
* 将这些位图交给合成线程

相应地，合成线程负责：

* 通过 GPU将位图绘制到屏幕上
* 通知主线程更新页面中可见或即将变成可见的部分的位图
* 计算出页面中哪部分是可见的
* 计算出当你在滚动页面时哪部分是即将变成可见的
* 当你滚动页面时将相应位置的元素移动到可视区域

长时间执行 JavaScript 或渲染一个很大的元素会阻塞主线程，在这期间，它将无法响应用户的交互。

相反，合成线程则会尽量去响应用户的交互。当一个页面发生变化时，合成线程会以每秒60 帧的间隔去不断重绘这个页面，即使这个页面不完整。

举个例子，当用户滚动页面时，合成线程会通知主线程更新页面中最新可见部分的位图。但是，如果主线程响应地不够快，合成线程不会保持等待，而是马上绘制已经生成的位图，还没准备好的部分用白色进行填充。

## <a name="t1"></a>GPU {#GPU}

刚才我提到合成线程会使用 GPU将位图绘制到屏幕上，接下来让[我们](https://www.w3cdoc.com)快速了解一下 GPU。

目前，大多数手机、 平板电脑、 和计算机都配备了GPU芯片。它有着非常专业的定位，这意味着GPU非常擅长做某些事情（比如绘图），但在其他方面则没什么优势。

GPU的快在于：

  1. 绘制位图到屏幕上
  2. 一遍又一遍地绘制相同的位图
  3. 将同一位图绘制到不同位置，执行旋转以及缩放处理

GPU 的慢在于：

  1. 将位图加载到它的内存中

## <a name="t2"></a>transition: height {#transition:_height}

现在，[我们](https://www.w3cdoc.com)已经对渲染页面的软硬件都有一些初步的理解了，接下来让[我们](https://www.w3cdoc.com)来看看[浏览器](https://www.w3cdoc.com)的主线程和合成线程石如何协同工作来执行一个 CSS Transition的。

假设[我们](https://www.w3cdoc.com)要一个元素的height从 100 px 变成 200 px，就像这样：

<pre class="EnlighterJSRAW" data-enlighter-language="null">div {
    height: 100px;
    transition: height 1s linear;
}
div:hover {
    height: 200px;
}</pre>

主线程和合成线程将按照下面的流程图执行相应的操作。注意在橘黄色方框的操作可能会比较耗时，在蓝色框中的操作是比较快速的。（译注：懒得重新画图，流程图中的内容略过不译，下同）<a class="fancybox" title="" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-height-2x.png" target="_blank" rel="nofollow noopener noreferrer"><img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-height-2x.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-height-2x.png?x-oss-process=image/format,webp" alt="" width="836" height="1291" /></a>

正如你所看到，在上图中有很多橘黄色方框，意味着，[浏览器](https://www.w3cdoc.com)需要做大量的工作，也就是说这个动画可能会变得卡顿。

在动画的每一帧中，[浏览器](https://www.w3cdoc.com)都要执行布局、 绘制、 以及将新的位图提交给 GPU。[我们](https://www.w3cdoc.com)知道，将位图加载到 GPU 的内存中是一个相对较慢的操作。

[浏览器](https://www.w3cdoc.com)需要做大量工作的原因在于每一帧中元素的内容都在不断改变。改变一个元素的高度可能导致需要同步改变它的子元素的大小，所以[浏览器](https://www.w3cdoc.com)必须重新计算布局。布局完成后，主线程又必须重新生成该元素的位图。

## <a name="t3"></a>transition: transform {#transition:_transform}

可以说，height属性的transition是比较消耗性能的，那么有什么更好的方案呢？

假设[我们](https://www.w3cdoc.com)需要将一个元素的尺寸缩小一半，并使用<a href="http://css-tricks.com/almanac/properties/t/transform/" target="_blank" rel="nofollow noopener noreferrer">CSS transform</a>属性来完成缩放，使用CSS transition属性来做缩放动画，就像这样：

<pre class="EnlighterJSRAW" data-enlighter-language="null">div {
    transform: scale(0.5);
    transition: transform 1s linear;
}
div:hover {
    transform: scale(1.0);
}</pre>

让[我们](https://www.w3cdoc.com)看看这种情况下的流程图：<a class="fancybox" title="" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-transform-2x.png" target="_blank" rel="nofollow noopener noreferrer"><img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-transform-2x.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/animate-transform-2x.png?x-oss-process=image/format,webp" alt="" width="791" height="998" /></a>

这次[我们](https://www.w3cdoc.com)可以看到少了很多橙色的方框，意味着动画变得更流畅了！那么，为什么执行一个元素的transform动画会跟height动画表现得不一样呢？

根据定义，CSS 的transform属性不会更改元素或它周围的元素的布局。transform属性会对元素的整体产生影响，它会对整个元素进行缩放、旋转、移动处理。

这对[浏览器](https://www.w3cdoc.com)来说是个好消息 ！[浏览器](https://www.w3cdoc.com)只需要一次生成这个元素的位图，并在动画开始的时候将它提交给GPU去处理 。之后，[浏览器](https://www.w3cdoc.com)不需要再做任何布局、 绘制以及提交位图的操作。从而，[浏览器](https://www.w3cdoc.com)可以充分利用 GPU 的特长去快速地将位图绘制在不同的位置、执行旋转或缩放处理。

## <a name="t4"></a>设计决策 {#设计决策}

那么，这是否意味着[我们](https://www.w3cdoc.com)不应该设计一个元素的高度动画呢?答案是否定的。有时这正是你的设计期望的效果，这个动画效果也足够快 。也有可能你要处理的元素是孤立的，并不会导致页面中的其他部分重新布局。也许你的元素重绘起来很简单，[浏览器](https://www.w3cdoc.com)可以快速完成。也许你的元素很小，[浏览器](https://www.w3cdoc.com)只需提交一个很小的位图给 GPU 去处理。

显然，如果你可以用一个”更具性价比”的动画比如CSS transform，去代替一个“更昂贵”的动画比如CSS height，同时又不会对设计造成任何影响，那就应该这么去做。例如，假设你设计了一个按钮，当点击这个按钮时，展示一个菜单。那么，你就不应该使用top或height属性属性来实现这个菜单的展现动画，而是应该尝试用transform属性来实现类似的效果。

以下 CSS 属性在动画处理方面是比较快的：

* <a href="http://css-tricks.com/almanac/properties/t/transform/" target="_blank" rel="nofollow noopener noreferrer">CSS transform</a>
* <a href="http://css-tricks.com/almanac/properties/o/opacity/" target="_blank" rel="nofollow noopener noreferrer">CSS opacity</a>
* <a href="http://css-tricks.com/almanac/properties/f/filter/" target="_blank" rel="nofollow noopener noreferrer">CSS filter</a>（取决于filter的复杂度以及[浏览器](https://www.w3cdoc.com)的实现）

目前来看，这个列表是很有限的，但随着[浏览器](https://www.w3cdoc.com)的发展，你会看到越来越多的 CSS 属性可以快速地执行动画处理。另外，不要低估了以上列表中CSS属性的作用。通过组合使用这3个属性你就能创造出许多丰富的令人惊讶的动画效果。

## 开启GPU硬件加速

为动画DOM元素添加<a href="http://blog.bingo929.com/tag/css3" target="_blank" rel="external nofollow noopener noreferrer">CSS3</a>样式**-webkit-transform:transition3d(0,0,0)**或**-webkit-transform:translateZ(0);**，这两个属性都会开启**GPU硬件加速**模式，从而让[浏览器](https://www.w3cdoc.com)在渲染动画时从CPU转向GPU，其实说白了这是一个小伎俩，也可以算是一个Hack，**-webkit-transform:transition3d**和**-webkit-transform:translateZ**其实是为了渲染3D样式，但[我们](https://www.w3cdoc.com)设置值为0后，并没有真正使用3D效果，但[浏览器](https://www.w3cdoc.com)却因此开启了GPU硬件加速模式。这种GPU硬件加速在当今PC机及移动设备上都已普及，在移动端的性能提升是相当显著地，所以建议[大家](https://www.w3cdoc.com)在做动画时可以尝试一下开启GPU硬件加速。

当然也可以这样开启所有[浏览器](https://www.w3cdoc.com)的GPU硬件加速：

<pre class="EnlighterJSRAW" data-enlighter-language="null">webkit-transform: translateZ(0);
-moz-transform: translateZ(0);
-ms-transform: translateZ(0);
-o-transform: translateZ(0);
transform: translateZ(0);
或
webkit-transform: translate3d(0,0,0);
-moz-transform: translate3d(0,0,0);
-ms-transform: translate3d(0,0,0);
-o-transform: translate3d(0,0,0);
transform: translate3d(0,0,0);</pre>

使用-webkit-transform:transition3d(0,0,0)开启GPU硬件加速的chrome中渲染动画性能明显顺畅了许多，平均能达到55fps左右

**通过-webkit-transform:transition3d/translateZ开启GPU硬件加速的适用范围：**

* 使用很多大尺寸图片(尤其是PNG24图)进行动画的页面。
* 页面有很多大尺寸图片并且进行了css缩放处理，页面可以滚动时。
* 使用**background-size:cover**设置大尺寸背景图，并且页面可以滚动时。(详见:https://coderwall.com/p/j5udlw)
* 编写大量DOM元素进行CSS3动画时(**transition**/**transform**/**keyframes**/**absTop&Left)**
* 使用很多PNG图片拼接成CSS Sprite时

### chrome诡异的Bug

对所有动画DOM元素添加-**webkit-transform:transition3d(0,0,0)**开启GPU硬件加速之后，又出现了一个chrome诡异的Bug，当你有多个position:absolute;元素添加**-webkit-transform:transition3d(0,0,0);**开启GPU硬件加速之后，会有几个元素凭空消失，调试许久无果遂Google之，国内暂时没有人发表过关于这类问题的文章，于是在国外网站找呀找，找到了很多与我遇到同样问题的人，但都没有真正靠谱的解决办法，这可能是跟添加**-webkit-transform**之后chrome尝试使用GPU硬件加速有关系，最后还是要等待Chrome官方更新解决了，当前Chrome版本是33。如果谁发现比较好的解决办法，欢迎提出^_^

**其他人遇到的类似问题：**  
<a href="http://stackoverflow.com/questions/19779605/3d-css-transform-translatez-causes-elements-to-disappear-in-chrome" target="_blank" rel="external nofollow noopener noreferrer">3D CSS transform: translateZ causes elements to disappear in Chrome</a>  
<a href="http://stackoverflow.com/questions/20268962/fixed-attachment-background-image-flicker-disappear-in-chrome-when-coupled-with" target="_blank" rel="external nofollow noopener noreferrer">Fixed attachment background image flicker/disappear in chrome when coupled with a css transform</a>

**如何避免这个问题：**

在使用-webkit-transform尝试对很多DOM元素编写3D动画时，尽量不要对这些元素及他们的父元素使用position:absolute/fixed。(其实这种情况很难避免)  
所以我的临时解决办法是，减少使用**-webkit-transform:transition3d(0,0,0)**的DOM元素数量，从9个减至6个便没有元素消失的现象了。  
PS：由于测试环境有限，如果[大家](https://www.w3cdoc.com)发现在你的[浏览器](https://www.w3cdoc.com)还有这个Bug,麻烦留言告诉我，万分感谢！

### 开启GPU硬件加速可能触发的问题：

通过**-webkit-transform:transition3d/translateZ**开启GPU硬件加速之后，有些时候可能会导致[浏览器](https://www.w3cdoc.com)频繁闪烁或抖动，可以尝试以下办法解决之：

<div class="codecolorer-container css blackboard">
  <div class="css codecolorer">
    -webkit-backface-visibility:hidden;<br /> -webkit-perspective:1000;
  </div>
</div>

### 如何监测动画帧速率

推荐两种实时监测网页渲染帧速率的方法：

1.Chrome的DevTool中Performance模块查看，先录一下动画操作，然后在frames中点击某一帧，下面可以看到帧率，可以分析原因

<p id="Wsdzfgl">
  <img loading="lazy" class="alignnone wp-image-3928 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/format,webp" alt="" width="836" height="867" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/format,webp 1164w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_289,h_300/format,webp 289w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_797/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867797d8e8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_578,h_600/format,webp 578w" sizes="(max-width: 836px) 100vw, 836px" />
</p>

2. 直接打开帧率展示模块，直接在页面上查看帧率

<p id="HnQikGj">
  <img loading="lazy" class="wp-image-3929 shadow alignleft" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867df7be38.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867df7be38.png?x-oss-process=image/format,webp" alt="" width="351" height="390" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867df7be38.png?x-oss-process=image/format,webp 732w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867df7be38.png?x-oss-process=image/quality,q_50/resize,m_fill,w_270,h_300/format,webp 270w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867df7be38.png?x-oss-process=image/quality,q_50/resize,m_fill,w_540,h_600/format,webp 540w" sizes="(max-width: 351px) 100vw, 351px" />
</p>

<p id="wLVuhUo">
  <img loading="lazy" class="alignnone wp-image-3930 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867f379b5d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867f379b5d.png?x-oss-process=image/format,webp" alt="" width="464" height="414" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867f379b5d.png?x-oss-process=image/format,webp 718w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867f379b5d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_267/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8867f379b5d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_673,h_600/format,webp 673w" sizes="(max-width: 464px) 100vw, 464px" />
</p>

<p id="oZJjtQw">
  <img loading="lazy" class="alignnone wp-image-3931 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8868276b037.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8868276b037.png?x-oss-process=image/format,webp" alt="" width="292" height="271" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8868276b037.png?x-oss-process=image/format,webp 418w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c8868276b037.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_278/format,webp 300w" sizes="(max-width: 292px) 100vw, 292px" />
</p>

3. 新发现的，可以打开animation面板，chrome会记录你操作的每个动画，这个是动画检查器，[文档在这里][1]

* 通过打开动画检查器捕捉动画。检查器会自动检测动画并将它们分类为多个组。
* 通过慢速播放、重播或查看动画源代码来检查动画。
* 通过更改动画时间、延迟、持续时间或关键帧偏移修改动画。

<p id="zfmyDPM">
  <img loading="lazy" class="alignnone wp-image-3932 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c886870c5ca6.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c886870c5ca6.png?x-oss-process=image/format,webp" alt="" width="615" height="305" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c886870c5ca6.png?x-oss-process=image/format,webp 762w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c886870c5ca6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_149/format,webp 300w" sizes="(max-width: 615px) 100vw, 615px" />
</p>

<p id="UqpXPJA">
  <img loading="lazy" class="alignnone wp-image-3933 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/format,webp" alt="" width="846" height="532" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/format,webp 1122w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_189/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_483/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c88688fdf089.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_503/format,webp 800w" sizes="(max-width: 846px) 100vw, 846px" />
</p>

4. 参考[这里][2]介绍层的创建，最后两个兄弟节点，z-index高的，可能会被[浏览器](https://www.w3cdoc.com)也自动识别成复合层来处理

什么情况下能使元素获得自己的层？虽然 Chrome 的启发式方法(heuristic)随着时间在不断发展进步，但是从目前来说，满足以下任意情况便会创建层：

* 3D 或透视变换(perspective transform) CSS 属性
* 使用加速视频解码的 元素
* 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
* 混合插件(如 Flash)
* 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素
* 拥有加速 CSS 过滤器的元素
* 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)
* 元素有一个 z-index 较低且包含一个复合层的兄弟元素(换句话说就是该元素在复合层上面渲染)

使用3D硬件加速提升动画性能时，最好给元素增加一个z-index属性，人为干扰复合层的排序，可以有效减少chrome创建不必要的复合层，提升渲染性能，移动端优化效果尤为明显。

关于层的介绍：[gpu-accelerated-compositing-in-chrome][3]

&nbsp;

&nbsp;

 [1]: https://developers.google.com/web/tools/chrome-devtools/inspect-styles/animations?hl=zh-cn
 [2]: https://div.io/topic/1348
 [3]: http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome
