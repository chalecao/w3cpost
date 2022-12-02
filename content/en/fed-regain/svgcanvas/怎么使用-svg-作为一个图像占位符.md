---
title: 怎么使用 SVG 作为一个图像占位符
---
## 怎么使用 SVG 作为一个图像占位符 {.detail-title.uk-margin-medium-top}

<div class="markdown-body">
 <em>从图像中生成的 SVG 可以用作占位符。请继续阅读！</em>
  
 我对怎么去让 web 性能更优化和图像加载的更快充满了热情。在这些感兴趣的领域中的其中一项研究就是占位符：当图像还没有被加载的时候应该去展示些什么？
  
 在前些天，我偶然发现了使用 SVG 的一些加载技术，我将在这篇文章中谈论它。
  
 在这篇文章中[我们](https://www.w3cdoc.com)将涉及如下的主题：
  
  <ul>
    
      不同的占位符类型的概述
    
    
      基于 SVG 的占位符（边缘、形状和轮廓）
    
    
      自动化处理
    
  
  <h3>
    不同的占位符类型的概述
  </h3>
 之前 <a href="https://medium.com/@jmperezperez/lazy-loading-images-on-the-web-to-improve-loading-time-and-saving-bandwidth-ec988b710290">我写过一篇关于图像占位符和延迟加载lazy-loading</a> 的文章以及 <a href="https://www.youtube.com/watch?v=szmVNOnkwoU">关于它的讨论</a>。当进行一个图像的延迟加载时，一个很好的办法是提供一个东西作为占位符，因为它可能会很大程度上影响用户的感知体验。之前我提供了几个选择：
  
 <a href="https://camo.githubusercontent.com/d8455dd55fbb1f49ecc08258069dc3a72fb5fa71/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313536332f302a6a6c4d4d313434764168482d3062456e2e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t016f3f1bf633008650.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t016f3f1bf633008650.png?x-oss-process=image/format,webp" alt="" /></a>
  
 在图像被加载之前，有几种办法去填充图像区域：
  
  <ul>
    
      在图像区域保持空白：在一个响应式设计的环境中，这种方式防止了内容的跳跃。从用户体验的角度来看，那些布局的改变是非常差的作法。但是，它是为了性能的考虑，否则，每次为了获取图像尺寸，[浏览器](https://www.w3cdoc.com)就要被迫进行布局重新计算，以便为它留下空间。
    
    
      占位符：在图像那里显示一个用户配置的图像。[我们](https://www.w3cdoc.com)可以在背景上显示一个轮廓。它一直显示直到实际的图像被加载完成，它也被用于当请求失败或者当用户根本没有设置头像图像的情况下。这些图像一般都是矢量图，并且由于尺寸非常小，可以作为内联图片。
    
    
      单一颜色：从图像中获取颜色，并将其作为占位符的背景颜色。这可能是图像的主要颜色、最具活力的颜色 … 这个想法是基于你正在加载的图像，并且它将有助于在没有图像和图像加载完成之间进行平滑过渡。
    
    
      模糊的图像：也被称为模糊技术。你提供一个极小版本的图像，然后再去过渡到完整的图像。最初显示的图像的像素和尺寸是极小的。为去除细节artifacts，该图像会被放大并模糊化。我在前面写的 <a href="https://medium.com/@jmperezperez/how-medium-does-progressive-image-loading-fd1e4dc1ee3d">Medium 是怎么做的渐进加载图像</a>、<a href="https://medium.com/@jmperezperez/using-webp-to-create-tiny-preview-images-3e9b924f28d6">使用 WebP 去创建极小的预览图像</a>、和<a href="https://medium.com/@jmperezperez/more-examples-of-progressive-image-loading-f258be9f440b">渐进加载图像的更多示例</a> 中讨论过这方面的内容。
    
  
 此外还有其它的更多的变种，许多聪明的人也开发了其它的创建占位符的技术。
  
 其中一个就是用梯度图代替单一的颜色。梯度图可以创建一个更精确的最终图像的预览，它整体上非常小（提升了有效载荷）。
  
 <a href="https://camo.githubusercontent.com/be62ad08a7b9c5b40b6081d9cd8ae09b5abc23d2/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313235302f302a6563506b42416c36396179765263746e2e6a7067"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01fb10bb65db37e2a3.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01fb10bb65db37e2a3.jpg?x-oss-process=image/format,webp" alt="" /></a>
  
 <em>使用梯度图作为背景。这是来自 Gradify 的截屏，它现在已经不在线了，代码 <a href="https://github.com/fraser-hemp/gradify">在 GitHub</a>。</em>
  
 另外一种技术是使用基于 SVG 的技术，它在最近的实验和研究中取得到了一些进展。
  
  <h3>
    基于 SVG 的占位符
  </h3>
 [我们](https://www.w3cdoc.com)知道 SVG 是完美的矢量图像。而在大多数情况下[我们](https://www.w3cdoc.com)是希望加载一个位图，所以，问题是怎么去矢量化一个图像。其中一些方法是使用边缘、形状和轮廓。
  
  <h4>
    边缘
  </h4>
 在 <a href="https://medium.com/@jmperezperez/drawing-images-using-edge-detection-and-svg-animation-16a1a3676d3">前面的文章中</a>，我解释了怎么去找出一个图像的边缘并创建一个动画。我最初的目标是去尝试绘制区域，矢量化该图像，但是我并不知道该怎么去做到。我意识到使用边缘也可能是一种创新，我决定去让它们动起来，创建一个 “绘制” 的效果。
  
  <ul>
    
      <a href="https://codepen.io/jmperez/embed/oogqdp?default-tabs=html%2Cresult&#038;embed-version=2&#038;height=600&#038;host=https%3A%2F%2Fcodepen.io&#038;referrer=https%3A%2F%2Fmedium.freecodecamp.org%2Fmedia%2F8c5c44a4adf82b09692a34eb4daa3e2e%3FpostId%3Dbed1b810ab2c&#038;slug-hash=oogqdp#result-box">范例</a>
    
  
  <blockquote>
    
      <a href="https://medium.com/@jmperezperez/drawing-images-using-edge-detection-and-svg-animation-16a1a3676d3">使用边缘检测绘制图像和 SVG 动画</a>
    
  </blockquote>
  <blockquote>
    
      在以前，很少使用和支持 SVG。一段时间以后，[我们](https://www.w3cdoc.com)开始用它去作为一个某些图标的传统位图的替代品……
    
  </blockquote>
  <h4>
    形状
  </h4>
 SVG 也可以用于根据图像绘制区域而不是边缘/边界。用这种方法，[我们](https://www.w3cdoc.com)可以矢量化一个位图来创建一个占位符。
  
 在以前，我尝试去用三角形做类似的事情。你可以在 <a href="https://jmperezperez.com/cssconfau16/#/45">CSSConf</a> 和 <a href="https://jmperezperez.com/renderconf17/#/46">Render Conf</a> 上我的演讲中看到它。
  
  <ul>
    
      <a href="https://codepen.io/jmperez/embed/BmaWmQ?default-tabs=html%2Cresult&#038;embed-version=2&#038;height=600&#038;host=https%3A%2F%2Fcodepen.io&#038;referrer=https%3A%2F%2Fmedium.freecodecamp.org%2Fmedia%2F05d1ee44f0537f8257258124d7b94613%3FpostId%3Dbed1b810ab2c&#038;slug-hash=BmaWmQ#result-box">范例</a>
    
  
 上面的 codepen 是一个由 245 个三角形组成的基于 SVG 占位符的概念验证。生成的三角形是基于 <a href="https://en.wikipedia.org/wiki/Delaunay_triangulation">Delaunay triangulation</a> 的，使用了 <a href="https://github.com/possan/polyserver">Possan’s polyserver</a>。正如预期的那样，使用更多的三角形，文件尺寸就更大。
  
  <h4>
    Primitive 和 SQIP，一个基于 SVG 的 LQIP 技术
  </h4>
 Tobias Baldauf 正在致力于另一个使用 SVG 的低质量图像占位符技术，它被称为 <a href="https://github.com/technopagan/sqip">SQIP</a>。在深入研究 SQIP 之前，我先简单介绍一下 <a href="https://github.com/fogleman/primitive">Primitive</a>，它是基于 SQIP 的一个库。
  
 Primitive 是非常吸引人的，我强烈建议你去了解一下。它讲解了一个位图怎么变成由重叠形状组成的 SVG。它尺寸比较小，适合于直接内联放置到页面中。当步骤较少时，在初始的 HTML 载荷中作为占位符是非常有意义的。
  
 Primitive 基于三角形、长方形、和圆形等形状生成一个图像。在每一步中它增加一个新形状。很多步之后，图像的结果看起来非常接近原始图像。如果你输出的是 SVG，它意味着输出代码的尺寸将很大。
  
 为了理解 Primitive 是怎么工作的，我通过几个图像来跑一下它。我用 10 个形状和 100 个形状来为这个插画生成 SVG：
  
 <a href="https://camo.githubusercontent.com/a6a25c05e87319f620e7c0e96dbbe7047dbc1389/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a793473723974776b685f57795a6836683079483938512e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t019ec2ecf088db34a3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t019ec2ecf088db34a3.png?x-oss-process=image/format,webp" alt="" /></a> <a href="https://camo.githubusercontent.com/8bb230ea92b8e45ad2d9432bf9d34bd301d36567/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a63717968596e7838334c59766847646d6732644644772e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01cab3324f601d1ecc.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01cab3324f601d1ecc.png?x-oss-process=image/format,webp" alt="" /></a> <a href="https://camo.githubusercontent.com/5a39e7912fd0fb387d6d26acfecf0d8bb75ebe00/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a7151503531363067504b51647973683067466e4e66772e6a706567"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01cc1ae766de58e9cf.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01cc1ae766de58e9cf.jpg?x-oss-process=image/format,webp" alt="" /></a>
  
 使用 Primitive 处理 ，使用 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-281184-square-10.svg">10 个形状</a> 、 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-281184-square-100.svg">100 形状</a>、 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-281184-square.jpg">原图</a>。
  
 <a href="https://camo.githubusercontent.com/0113af826324d637362197098683d8d36f873fc8/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a50575a4c6c43346c724c4f34435676314777523771412e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01080447f12c6400f4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01080447f12c6400f4.png?x-oss-process=image/format,webp" alt="" /></a> <a href="https://camo.githubusercontent.com/d1f86589e6c9d9951385916a9d4d1ae9e2991309/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a6b686e676132326c644a4b4f5a327a343553726838412e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t011e2346ade52f7d62.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t011e2346ade52f7d62.png?x-oss-process=image/format,webp" alt="" /></a> <a href="https://camo.githubusercontent.com/86475f1df375e14a36f1c6e3c82b1fdd385cfe92/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3632352f312a4e2d32307252375947465869445371496549794f6a412e6a706567"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01e4e8faea3c25fdca.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01e4e8faea3c25fdca.jpg?x-oss-process=image/format,webp" alt="" /></a>
  
 使用 Primitive 处理，使用 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-618463-square-10.svg">10 形状</a> 、 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-618463-square-100.svg">100 形状</a>、 <a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-618463-square.jpg">原图</a> 。
  
 当在图像中使用 10 个形状时，[我们](https://www.w3cdoc.com)基本构画出了原始图像。在图像占位符这种使用场景里，[我们](https://www.w3cdoc.com)可以使用这种 SVG 作为潜在的占位符。实际上，使用 10 个形状的 SVG 代码已经很小了，大约是 1030 字节，当通过 SVGO 传输时，它将下降到约 640 字节。
  
  <pre><code class="hljs xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">svg&lt;/span> &lt;span class="hljs-attr">xmlns&lt;/span>=&lt;span class="hljs-string">”http://www.w3.org/2000/svg&lt;/span>" &lt;span class="hljs-attr">width&lt;/span>=&lt;span class="hljs-string">”1024&lt;/span>" &lt;span class="hljs-attr">height&lt;/span>=&lt;span class="hljs-string">”1024&lt;/span>">&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#817c70&lt;/span>" &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M0&lt;/span> &lt;span class="hljs-attr">0h1024v1024H0z&lt;/span>”/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">g&lt;/span> &lt;span class="hljs-attr">fill-opacity&lt;/span>=&lt;span class="hljs-string">”.502&lt;/span>">&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#03020f”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M178&lt;/span> &lt;span class="hljs-attr">994l580&lt;/span> &lt;span class="hljs-attr">92L402&lt;/span>–&lt;span class="hljs-attr">62&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#f2e2ba”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M638&lt;/span> &lt;span class="hljs-attr">894L614&lt;/span> &lt;span class="hljs-attr">6l472&lt;/span> &lt;span class="hljs-attr">440&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#fff8be”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M-62&lt;/span> &lt;span class="hljs-attr">854h300L138&lt;/span>–&lt;span class="hljs-attr">62&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#76c2d9&lt;/span>" &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M410–62L154&lt;/span> &lt;span class="hljs-attr">530&lt;/span>–&lt;span class="hljs-attr">62&lt;/span> &lt;span class="hljs-attr">38&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#62b4cf”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M1086–2L498–30l484&lt;/span> &lt;span class="hljs-attr">508&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#010412&lt;/span>" &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M430–2l196&lt;/span> &lt;span class="hljs-attr">52&lt;/span>–&lt;span class="hljs-attr">76&lt;/span> &lt;span class="hljs-attr">356&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#eb7d3f”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M598&lt;/span> &lt;span class="hljs-attr">594l488&lt;/span>–&lt;span class="hljs-attr">32&lt;/span>–&lt;span class="hljs-attr">308&lt;/span> &lt;span class="hljs-attr">520&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#080a18&lt;/span>" &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M198&lt;/span> &lt;span class="hljs-attr">418l32&lt;/span> &lt;span class="hljs-attr">304&lt;/span> &lt;span class="hljs-attr">116&lt;/span>–&lt;span class="hljs-attr">448&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#3f201d”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M1086&lt;/span> &lt;span class="hljs-attr">1062l-344&lt;/span>–&lt;span class="hljs-attr">52&lt;/span> &lt;span class="hljs-attr">248&lt;/span>–&lt;span class="hljs-attr">148&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">path&lt;/span> &lt;span class="hljs-attr">fill&lt;/span>=&lt;span class="hljs-string">”#ebd29f”&lt;/span> &lt;span class="hljs-attr">d&lt;/span>=&lt;span class="hljs-string">”M630&lt;/span> &lt;span class="hljs-attr">658l-60&lt;/span>–&lt;span class="hljs-attr">372&lt;/span> &lt;span class="hljs-attr">516&lt;/span> &lt;span class="hljs-attr">320&lt;/span>"/>&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">g&lt;/span>>&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">svg&lt;/span>>&lt;/span>

</code></pre>
 正如[我们](https://www.w3cdoc.com)预计的那样，使用 100 个形状生成的图像更大，在 SVGO（之前是 8kB）之后，大小约为 5kB。它们在细节上已经很好了，但是仍然是个很小的载荷。使用多少三角形主要取决于图像类型和细腻程度（如，对比度、颜色数量、复杂度）。
  
 还可以创建一个类似于 <a href="https://github.com/technopagan/cjpeg-dssim">cpeg-dssim</a> 的脚本，去调整所使用的形状的数量，以满足 <a href="https://en.wikipedia.org/wiki/Structural_similarity">结构相似</a> 的阈值（或者最差情况中的最大数量）。
  
 这些生成的 SVG 也可以用作背景图像。因为尺寸约束和矢量化，它们在展示超大题图hero image和大型背景图像时是很好的选择。
  
  <h4>
    SQIP
  </h4>
 用 <a href="https://github.com/technopagan/sqip">Tobias 自己的话说</a>：
  
  <blockquote>
    
      SQIP 尝试在这两个极端之间找到一种平衡：它使用 <a href="https://github.com/fogleman/primitive">Primitive</a> 去生成一个 SVG，由几种简单的形状构成，近似于图像中可见的主要特征，使用 <a href="https://github.com/svg/svgo">SVGO</a> 优化 SVG，并且为它增加高斯模糊滤镜。产生的最终的 SVG 占位符后大小仅为约 800~1000 字节，在屏幕上看起来更为平滑，并提供一个图像内容的视觉提示。
    
  </blockquote>
 这个结果和使用一个用了模糊技术的极小占位符图像类似。（看看 <a href="https://medium.com/@jmperezperez/how-medium-does-progressive-image-loading-fd1e4dc1ee3d">Medium</a> 和 <a href="https://medium.com/@jmperezperez/more-examples-of-progressive-image-loading-f258be9f440b">其它站点</a> 是怎么做的）。区别在于它们使用了一个位图图像，如 JPG 或者 WebP，而这里是使用的占位符是 SVG。
  
 如果[我们](https://www.w3cdoc.com)使用 SQIP 而不是原始图像，[我们](https://www.w3cdoc.com)将得到这样的效果：
  
 <a href="https://camo.githubusercontent.com/d6ddfcacecc087d79d8a50f828fe7f3f274fd8f0/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3933382f302a795559315a46503237764659676a5f6f2e706e67"><img src="https://www.zcfy.cc/article/how-to-use-svg-as-a-placeholder-and-other-image-loading-techniques" alt="" /></a> <a href="https://camo.githubusercontent.com/08363e7060905a5211004eedbd8a548d0fa31ece/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3933382f302a444b6f5a503744584676555a4a3334452e706e67"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01775ac783f4eb176c.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/10/t01775ac783f4eb176c.png?x-oss-process=image/format,webp" alt="" /></a>
  
 <em><a href="https://jmperezperez.com/assets/images/posts/svg-placeholders/pexels-photo-281184-square-sqip.svg">第一张图像</a> 和 <a href="https://jmperezperez.com/svg-placeholders/%28/assets/images/posts/svg-placeholders/pexels-photo-618463-square-sqip.svg">第二张图像</a> 使用了 SQIP 后的输出图像。</em>
  
 输出的 SVG 约 900 字节，并且通过检查代码，[我们](https://www.w3cdoc.com)可以发现 <code>feGaussianBlur</code> 过滤被应用到该组形状上：
  
  <pre><code class="hljs processing">&lt;svg xmlns=&lt;span class="hljs-string">"http://www.w3.org/2000/svg"&lt;/span> viewBox=&lt;span class="hljs-string">"0 0 2000 2000"&lt;/span>>&lt;&lt;span class="hljs-built_in">filter&lt;/span> id=&lt;span class="hljs-string">"b"&lt;/span>>&lt;feGaussianBlur stdDeviation=&lt;span class="hljs-string">"12"&lt;/span> />&lt;/&lt;span class="hljs-built_in">filter&lt;/span>>&lt;path &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#817c70"&lt;/span> d=&lt;span class="hljs-string">"M0 0h2000v2000H0z"&lt;/span>/>&lt;g &lt;span class="hljs-built_in">filter&lt;/span>=&lt;span class="hljs-string">"url(#b)"&lt;/span> transform=&lt;span class="hljs-string">"translate(4 4) scale(7.8125)"&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>-opacity=&lt;span class="hljs-string">".5"&lt;/span>>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#000210"&lt;/span> rx=&lt;span class="hljs-string">"1"&lt;/span> ry=&lt;span class="hljs-string">"1"&lt;/span> transform=&lt;span class="hljs-string">"matrix(50.41098 -3.7951 11.14787 148.07886 107 194.6)"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#eee3bb"&lt;/span> rx=&lt;span class="hljs-string">"1"&lt;/span> ry=&lt;span class="hljs-string">"1"&lt;/span> transform=&lt;span class="hljs-string">"matrix(-56.38179 17.684 -24.48514 -78.06584 205 110.1)"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#fff4bd"&lt;/span> rx=&lt;span class="hljs-string">"1"&lt;/span> ry=&lt;span class="hljs-string">"1"&lt;/span> transform=&lt;span class="hljs-string">"matrix(35.40604 -5.49219 14.85017 95.73337 16.4 123.6)"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#79c7db"&lt;/span> cx=&lt;span class="hljs-string">"21"&lt;/span> cy=&lt;span class="hljs-string">"39"&lt;/span> rx=&lt;span class="hljs-string">"65"&lt;/span> ry=&lt;span class="hljs-string">"65"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#0c1320"&lt;/span> cx=&lt;span class="hljs-string">"117"&lt;/span> cy=&lt;span class="hljs-string">"38"&lt;/span> rx=&lt;span class="hljs-string">"34"&lt;/span> ry=&lt;span class="hljs-string">"47"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#5cb0cd"&lt;/span> rx=&lt;span class="hljs-string">"1"&lt;/span> ry=&lt;span class="hljs-string">"1"&lt;/span> transform=&lt;span class="hljs-string">"matrix(-39.46201 77.24476 -54.56092 -27.87353 219.2 7.9)"&lt;/span>/>&lt;path &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#e57339"&lt;/span> d=&lt;span class="hljs-string">"M271 159l-123–16 43 128z"&lt;/span>/>&lt;&lt;span class="hljs-built_in">ellipse&lt;/span> &lt;span class="hljs-built_in">fill&lt;/span>=&lt;span class="hljs-string">"#47332f"&lt;/span> cx=&lt;span class="hljs-string">"214"&lt;/span> cy=&lt;span class="hljs-string">"237"&lt;/span> rx=&lt;span class="hljs-string">"242"&lt;/span> ry=&lt;span class="hljs-string">"19"&lt;/span>/>&lt;/g>&lt;/svg>

</code></pre>
 SQIP 也可以输出一个带有 Base64 编码的 SVG 内容的图像标签：
  
  <pre><code class="hljs routeros">&lt;img &lt;span class="hljs-attribute">width&lt;/span>=&lt;span class="hljs-string">"640"&lt;/span> &lt;span class="hljs-attribute">height&lt;/span>=&lt;span class="hljs-string">"640"&lt;/span> &lt;span class="hljs-attribute">src&lt;/span>=&lt;span class="hljs-string">"example.jpg” alt="&lt;/span>Add descriptive alt text&lt;span class="hljs-string">" style="&lt;/span>background-size: cover; background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw…&lt;stripped base 64>…PjwvZz48L3N2Zz4=);&lt;span class="hljs-string">">

&lt;/span></code></pre>
  <h4>
    轮廓
  </h4>
 [我们](https://www.w3cdoc.com)刚才看了使用了边缘和原始形状的 SVG。另外一种矢量化图像的方式是 “描绘” 它们。在几天前 <a href="https://twitter.com/mikaelainalem">Mikael Ainalem</a> 分享了一个 <a href="https://codepen.io/ainalem/full/aLKxjm/">codepen</a> 代码，展示了怎么去使用两色轮廓作为一个占位符。结果非常漂亮：
  
 <a href="https://camo.githubusercontent.com/97c460fac210d07b31b040c6d97f3db7596f8ca0/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313235302f312a72364862566e426b49534351705f55564b6a4f4a4b512e676966"><img src="https://www.zcfy.cc/article/how-to-use-svg-as-a-placeholder-and-other-image-loading-techniques" alt="" /></a>
  
 SVG 在这种情况下是手工绘制的，但是，这种技术可以用工具快速生成并自动化处理。
  
  <ul>
    
      <a href="https://www.gatsbyjs.org/">Gatsby</a>，一个用 React 支持的描绘 SVG 的静态网站生成器。它使用 <a href="https://www.npmjs.com/package/potrace">一个 potrace 算法的 JS 移植</a> 去矢量化图像。
    
    
      <a href="https://craftcms.com/">Craft 3 CMS</a>，它也增加了对轮廓的支持。它使用了 <a href="https://github.com/nystudio107/craft3-imageoptimize/blob/master/src/lib/Potracio.php">一个 potrace 算法的 PHP 移植</a>。
    
    
      <a href="https://github.com/EmilTholin/image-trace-loader">image-trace-loader</a>，一个使用了 potrace 算法去处理图像的 Webpack 加载器。
    
  
 如果感兴趣，可以去看一下 Emil 的 webpack 加载器 (基于 potrace) 和 Mikael 的手工绘制 SVG 之间的比较。
  
 这里我假设该输出是使用默认选项的 potrace 生成的。但是可以对它们进行优化。查看 <a href="https://github.com/EmilTholin/image-trace-loader#options">图像描绘加载器的选项</a>，<a href="https://www.npmjs.com/package/potrace#parameters">传递给 potrace 的选项</a>非常丰富。
  
  <h3>
    总结
  </h3>
 [我们](https://www.w3cdoc.com)看到了从图像中生成 SVG 并使用它们作为占位符的各种不同的工具和技术。与 <a href="https://medium.com/@jmperezperez/using-webp-to-create-tiny-preview-images-3e9b924f28d6">WebP 是一个用于缩略图的奇妙格式</a> 一样，SVG 也是一个用于占位符的有趣格式。[我们](https://www.w3cdoc.com)可以控制细节的级别（和它们的大小），它是高可压缩的，并且很容易用 CSS 和 JS 进行处理。
  
  <h4>
    额外的资源
  </h4>
 这篇文章上到了 <a href="https://news.ycombinator.com/item?id=15696596">Hacker News 热文</a>。对此以及在该页面的评论中分享的其它资源的链接，我表示非常感谢。下面是其中一部分。
  
  <ul>
    
      <a href="https://github.com/Tw1ddle/geometrize-haxe">Geometrize</a> 是用 Haxe 写的 Primitive 的一个移植。也有<a href="https://github.com/Tw1ddle/geometrize-haxe-web">一个 JS 实现</a>，你可以直接 <a href="http://www.samcodes.co.uk/project/geometrize-haxe-web/">在你的[浏览器](https://www.w3cdoc.com)上</a>尝试它。
    
    
      <a href="https://github.com/ondras/primitive.js">Primitive.js</a>，它也是 Primitive 在 JS 中的一个移植，<a href="https://github.com/cielito-lindo-productions/primitive.nextgen">primitive.nextgen</a>，它是使用 Primitive.js 和 Electron 的 Primitive 的桌面版应用的一个移植。
    
    
      这里有两个 Twitter 帐户，里面你可以看到一些用 Primitive 和 Geometrize 生成的图像示例。访问 <a href="https://twitter.com/PrimitivePic">@PrimitivePic</a> 和 <a href="https://twitter.com/Geometrizer">@Geometrizer</a>。
    
    
      <a href="https://github.com/jankovicsandras/imagetracerjs">imagetracerjs</a>，它是在 JavaScript 中的光栅图像描绘器和矢量化程序。这里也有为 <a href="https://github.com/jankovicsandras/imagetracerjava">Java</a> 和 <a href="https://github.com/jankovicsandras/imagetracerandroid">Android</a> 提供的移植。
    
  
  <hr />
 via: <a href="https://medium.freecodecamp.org/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c">https://medium.freecodecamp.org/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c</a>
</div>
