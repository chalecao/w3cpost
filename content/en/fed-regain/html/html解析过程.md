---
title: HTML解析过程
weight: 3
---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

# 浏览器开始
这个过程可以结合[NavigationTiming](https://www.w3.org/TR/navigation-timing/#sec-navigation-info-interface) 来理解。具体流程如下图：
![](/images/posts/2022-11-24-23-51-29.png)

# 资源请求

浏览器第一步先请求资源，这过程和NavigationTiming中定义的一些关键时间节点类似，但有所区别。这块主要是在performance中[ResourceTiming][https://www.w3.org/TR/resource-timing/]规范定义的内容：

![](/images/posts/2022-11-24-23-54-15.png)

请求到资源之后，浏览器解析流程主要包含以下部分：

  1. 解析HTML，构建DOM树（这里遇到外链，此时会发起请求）
  2. 解析CSS，生成CSS规则树
  3. 合并DOM树和CSS规则，生成render树
  4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
  5. 绘制render树（paint），绘制页面像素信息
  6. 浏览器会将各层的信息发送给GPU，GPU将各层合成（composite），显示在屏幕上


# 构建DOM

![](/images/posts/2022-11-24-23-54-58.png)
  
浏览器请求一个url地址，然后通常web服务器会返回一个html页面，最先返回的就是html文件。
  
浏览器的HTML解释器获取到的首先是字节码，然后解析成对应字符序列。然后根据HTML解释器的DSL定义的tokens匹配解析成一个个html node节点，根据HTML语法定义的抽象语法树生成对应的树形结构（这期间html可能不规范，浏览器有很多容错机制来保证语法解析，参考<a href="https://www.f2e123.com/html5css3/2214.html">嵌套约束</a>），形成DOM树。
  
# 构建CSSOM
![](/images/posts/2022-11-24-23-55-38.png)  

浏览器加载CSS是同样的资源请求过程，请求后解析流程和HTML类似，CSS解释器会先从适用于该节点的最通用规则开始（例如，如果该节点是 body 元素的子项，则应用所有 body 样式），然后通过应用更具体的规则（即规则“向下级联”）以递归方式优化计算的样式。

![](/images/posts/2022-11-24-23-56-02.png)

需要注意的是：
- 每个浏览器都有自己默认的样式表
- 从右到左（内层到外）解析css
- 规则路径形成规则片段树，片段树集合形成CSSOM
  
# 构建RenderTree
  ![](/images/posts/2022-11-24-23-58-03.png)

DOM树从根节点开始遍历<strong>可见</strong>节点，这里之所以强调了“可见”，是因为如果遇到设置了类似<code>display: none;</code>的不可见节点，在render过程中是会被跳过的（但<code>visibility: hidden; opacity: 0</code>这种仍旧占据空间的节点不会被跳过render），保存各个节点的样式信息及其余节点的从属关系。

![](/images/posts/2022-11-24-23-59-20.png)
  
# 串起来

![](/images/posts/2022-11-25-00-00-23.png)

当浏览器通过网络或者本地文件系统加载一个 HTML 文件，并对它进行解析完毕后，内核就会生成它最重要的数据结构 － DOM 树。DOM 树上每一个节点都对应着网页里面的每一个元素，并且网页也可以通过 JavaScript 操作这棵 DOM 树，动态改变它的结构。但是 DOM 树本身并不能直接用于排版和渲染，内核还会生成另外一棵树 － Render 树，Render 树上的每一个节点 － RenderObject，跟 DOM 树上的节点几乎是一一对应的，当一个可见的 DOM 节点被添加到 DOM 树上时，内核就会为它生成对应的 RenderOject 添加到 Render 树上。
  
Render 树是浏览器排版引擎的主要作业对象，排版引擎根据 DOM 树和 CSS 样式表的样式定义，按照预定的排版规则确定了 Render 树最后的结构，包括其中每一个 RenderObject 的大小和位置，而一棵经过排版的 Render 树，则是浏览器渲染引擎的主要输入，读者可以认为，Render 树是衔接浏览器排版引擎和渲染引擎之间的桥梁，它是排版引擎的输出，渲染引擎的输入。

# layout布局

ayout的基本单位是BFC（块格式化上下文，Block Format Context）和IFC（行内格式化上下文，Inline Format Context）

从上到下，从左到右，通过布局将样式信息和属性转换为实际可视窗口的相对大小和位置。在layout的过程中会伴随着回流和重绘：
 - reflow(回流): 根据Render Tree布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；
- repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；
- reflow回流的成本开销要高于repaint重绘，一个节点的回流往往回导致子节点以及同级节点的回流；

## reflow回流
现代浏览器会对回流做优化，它会等到足够数量的变化发生，再做一次批处理回流。

引起回流的原因有以下几种：
- 页面第一次渲染（初始化）
- DOM树变化（如：增删节点）
- Render树变化（如：padding改变）
- 浏览器窗口resize
- 获取元素的某些属性：<br /> 浏览器为了获得正确的值也会<strong>提前触发回流</strong>，这样就使得浏览器的优化失效了，这些属性包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle
  
## repaint重绘
  
- reflow回流必定引起repaint重绘，重绘可以单独触发
- 背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）
- 实际上在render时候发生

  
## 优化
  
避免回流和重绘的方法：
- 避免逐个修改节点样式，尽量一次性修改
  - 使用DocumentFragment将需要多次修改的DOM元素缓存，最后一次性append到真实DOM中渲染
- 可以将需要多次修改的DOM元素设置<code>display: none</code>，操作完再显示。（因为隐藏元素不在render树内，因此修改隐藏元素不会触发回流重绘）
- 避免多次读取某些属性（见上）
- 将复杂的节点元素脱离文档流，降低回流成本

# 浏览器绘制
![](/images/posts/2022-11-25-00-04-50.png)

我们可以将页面绘制的过程分为三个部分：Layout、Paint和合成。Layout负责计算DOM元素的布局关系，Paint负责将DOM元素绘制成位图，合成则负责将位图发送给GPU绘制到屏幕上（如果有transform、opacity等属性则通知GPU做处理）。

GPU加速其实是一直存在的，而如同translate3D这种hack只是为了让这个元素生成独立的 GraphicsLayer ， 占用一部分内存，但同时也会在动画或者Repaint的时候不会影响到其他任何元素，对高刷新频率的东西，就应该分离出单独的一个 GraphicsLayer。

GPU对于动画图形的渲染处理比CPU要快。

RenderLayer 树，满足以下任意一点的就会生成独立一个 RenderLayer。
- 页面的根节点的RenderObject
- 有明确的CSS定位属性（relative，absolute或者transform）
- 是透明的
- 有CSS overflow、CSS alpha遮罩（alpha mash）或者CSS reflection
- 有CSS 滤镜（fliter）
- 3D环境或者2D加速环境的canvas元素对应的RenderObject
- video元素对应的RenderObject

每个RenderLayer 有多个 GraphicsLayer 存在
- 有3D或者perspective transform的CSS属性的层
- 使用加速视频解码的video元素的层
- 3D或者加速2D环境下的canvas元素的层
- 插件，比如flash（Layer is used for a composited plugin）
- 对opacity和transform应用了CSS动画的层
- 使用了加速CSS滤镜（filters）的层
- 有合成层后代的层
- 同合成层重叠，且在该合成层上面（z-index）渲染的层
每个GraphicsLayer 生成一个 GraphicsContext, 就是一个位图，传送给GPU，由GPU合成放出。

