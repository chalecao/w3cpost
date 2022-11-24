---
title: HTML解析过程
weight: 3
---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

# 资源请求

浏览器第一步先请求资源，这过程和[NavigationTiming][2]中定义的一些关键时间节点类似，但有所区别。这块主要是在performance中[ResourceTiming][3]规范定义的内容：

<p id="xnzluEp">
  <img loading="lazy" class="alignnone wp-image-6186 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/format,webp" alt="" width="804" height="381" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/format,webp 924w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_142/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_379/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa2ce34c2f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_364/format,webp 768w" sizes="(max-width: 804px) 100vw, 804px" />
</p>

请求到资源之后，浏览器解析流程主要包含以下部分：

  1. 解析HTML，构建DOM树（这里遇到外链，此时会发起请求）
  2. 解析CSS，生成CSS规则树
  3. 合并DOM树和CSS规则，生成render树
  4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算
  5. 绘制render树（paint），绘制页面像素信息
  6. 浏览器会将各层的信息发送给GPU，GPU将各层合成（composite），显示在屏幕上

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

<div class="e-secret">
  </p>
  
  <h1>
    构建DOM
  </h1>
  
  <p id="CURVvAs">
    <img loading="lazy" class="alignnone wp-image-6183 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9ff492e4e.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9ff492e4e.png?x-oss-process=image/format,webp" alt="" width="677" height="375" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9ff492e4e.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9ff492e4e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_166/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf9ff492e4e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_425/format,webp 768w" sizes="(max-width: 677px) 100vw, 677px" />
  </p>
  
  <p>
    浏览器请求一个url地址，然后通常web服务器会返回一个html页面，最先返回的就是html文件。
  </p>
  
  <p>
    浏览器的HTML解释器获取到的首先是字节码，然后解析成对应字符序列。然后根据HTML解释器的DSL定义的tokens匹配解析成一个个html node节点，根据HTML语法定义的抽象语法树生成对应的树形结构（这期间html可能不规范，浏览器有很多容错机制来保证语法解析，参考<a href="https://www.f2e123.com/html5css3/2214.html">嵌套约束</a>），形成DOM树。
  </p>
  
  <h1 class="p1">
    构建CSSOM
  </h1>
  
  <p id="YQbaxFX">
    <img loading="lazy" class="alignnone wp-image-6184 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/format,webp" alt="" width="741" height="48" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/format,webp 1012w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_19/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_51/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa1c7283c6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_49/format,webp 768w" sizes="(max-width: 741px) 100vw, 741px" />
  </p>
  
  <p>
    浏览器加载CSS是同样的资源请求过程，请求后解析流程和HTML类似，CSS解释器会先从适用于该节点的最通用规则开始（例如，如果该节点是 body 元素的子项，则应用所有 body 样式），然后通过应用更具体的规则（即规则“向下级联”）以递归方式优化计算的样式。
  </p>
  
  <p>
    <img loading="lazy" width="594" height="324" class="alignnone size-full wp-image-6187 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa541aab85.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa541aab85.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa541aab85.png?x-oss-process=image/format,webp 594w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa541aab85.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_164/format,webp 300w" sizes="(max-width: 594px) 100vw, 594px" />
  </p>
  
  <p>
    需要注意的是：
  </p>
  
  <ul>
    <li>
      每个浏览器都有自己默认的样式表
    </li>
    <li class="p1">
      从右到左（内层到外）解析css
    </li>
    <li>
      <p class="p1">
        规则路径形成规则片段树，片段树集合形成CSSOM
      </p>
    </li>
  </ul>
  
  <h1>
    构建RenderTree
  </h1>
  
  <p id="pxnvGZd">
    <img loading="lazy" width="800" height="374" class="alignnone size-full wp-image-6188 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa59034f49.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa59034f49.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa59034f49.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa59034f49.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_140/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa59034f49.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_359/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
  </p>
  
  <p id="rVlyKwR">
    <img loading="lazy" class="alignnone wp-image-6190 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/format,webp" alt="" width="723" height="470" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/format,webp 1980w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_195/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_520/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_500/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafd86a1333b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_999/format,webp 1536w" sizes="(max-width: 723px) 100vw, 723px" />
  </p>
  
  <p>
    DOM树从根节点开始遍历<strong>可见</strong>节点，这里之所以强调了“可见”，是因为如果遇到设置了类似<code>display: none;</code>的不可见节点，在render过程中是会被跳过的（但<code>visibility: hidden; opacity: 0</code>这种仍旧占据空间的节点不会被跳过render），保存各个节点的样式信息及其余节点的从属关系。
  </p>
  
  <p id="fdOdNjq">
    <img loading="lazy" width="800" height="313" class="alignnone size-full wp-image-6189 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa74b837c5.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa74b837c5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa74b837c5.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa74b837c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_117/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fafa74b837c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_300/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
  </p>
  
  <p>
    当浏览器通过网络或者本地文件系统加载一个 HTML 文件，并对它进行解析完毕后，内核就会生成它最重要的数据结构 － DOM 树。DOM 树上每一个节点都对应着网页里面的每一个元素，并且网页也可以通过 JavaScript 操作这棵 DOM 树，动态改变它的结构。但是 DOM 树本身并不能直接用于排版和渲染，内核还会生成另外一棵树 － Render 树，Render 树上的每一个节点 － RenderObject，跟 DOM 树上的节点几乎是一一对应的，当一个可见的 DOM 节点被添加到 DOM 树上时，内核就会为它生成对应的 RenderOject 添加到 Render 树上。
  </p>
  
  <p>
    Render 树是浏览器排版引擎的主要作业对象，排版引擎根据 DOM 树和 CSS 样式表的样式定义，按照预定的排版规则确定了 Render 树最后的结构，包括其中每一个 RenderObject 的大小和位置，而一棵经过排版的 Render 树，则是浏览器渲染引擎的主要输入，读者可以认为，<span style="color: #ff0000;">Render 树是衔接浏览器排版引擎和渲染引擎之间的桥梁，它是排版引擎的输出，渲染引擎的输入。</span>
  </p>
  
  <h2>
    layout布局
  </h2>
  
  <p>
    layout的基本单位是BFC（块格式化上下文，Block Format Context）和IFC（行内格式化上下文，Inline Format Context）
  </p>
  
  <p>
    从上到下，从左到右，通过布局将样式信息和属性转换为实际可视窗口的相对大小和位置。在layout的过程中会伴随着回流和重绘：
  </p>
  
  <ul>
    <li>
      reflow(回流): 根据Render Tree布局(几何属性)，意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树；
    </li>
    <li>
      repaint(重绘): 意味着元素发生的改变只影响了节点的一些样式（背景色，边框颜色，文字颜色等），只需要应用新样式绘制这个元素就可以了；
    </li>
    <li>
      reflow回流的成本开销要高于repaint重绘，一个节点的回流往往回导致子节点以及同级节点的回流；
    </li>
  </ul>
  
  <h2>
    reflow回流
  </h2>
  
  <p>
    现代浏览器会对回流做优化，它会等到足够数量的变化发生，再做一次批处理回流。
  </p>
  
  <p>
    引起回流的原因有以下几种：
  </p>
  
  <ol>
    <li>
      页面第一次渲染（初始化）
    </li>
    <li>
      DOM树变化（如：增删节点）
    </li>
    <li>
      Render树变化（如：padding改变）
    </li>
    <li>
      浏览器窗口resize
    </li>
    <li>
      获取元素的某些属性：<br /> 浏览器为了获得正确的值也会<strong>提前触发回流</strong>，这样就使得浏览器的优化失效了，这些属性包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle
    </li>
  </ol>
  
  <h2>
    repaint重绘
  </h2>
  
  <ol>
    <li>
      reflow回流必定引起repaint重绘，重绘可以单独触发
    </li>
    <li>
      背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）
    </li>
    <li>
      实际上在render时候发生
    </li>
  </ol>
  
  <h2>
    优化
  </h2>
  
  <p>
    避免回流和重绘的方法：
  </p>
  
  <ul>
    <li>
      避免逐个修改节点样式，尽量一次性修改
    </li>
    <li>
      使用DocumentFragment将需要多次修改的DOM元素缓存，最后一次性append到真实DOM中渲染
    </li>
    <li>
      可以将需要多次修改的DOM元素设置<code>display: none</code>，操作完再显示。（因为隐藏元素不在render树内，因此修改隐藏元素不会触发回流重绘）
    </li>
    <li>
      避免多次读取某些属性（见上）
    </li>
    <li>
      将复杂的节点元素脱离文档流，降低回流成本
    </li>
  </ul>
  
  <p>
    </div>
  </p>

 [1]: https://www.f2e123.com/fed-regain
 [2]: https://www.f2e123.com/fed-regain/3301.html
 [3]: https://www.f2e123.com/fed-regain/3301.html#Resource_Timing_API
