---
title: Canvas图像处理和滤镜特效


---
  


### [][1]简介

这段时间做了一个手机WebRTC拍照加特效的应用，主要用到canvas标签获取图像矩阵（这个在上一篇博客中已经详细介绍过：），然后做图像处理，例如滤镜特效（马赛克，浮雕，衬底，反色等），这里[我们](https://www.w3cdoc.com)详细介绍相关的知识。其实从原理上讲，大部分的图像处理都是对图像像素矩阵和某个特效矩阵做卷积，得到新的像素矩阵，就是处理后的效果。关于这个大学课程《数字信息处理》里面有详细介绍。  
<a></a>

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/</a>

### [][2]canas介绍

上一个介绍WebRTC中使用<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/" target="_blank" rel="external">video标签和canvas标签</a>的文章中，并没有详细的介绍canvas标签。这里补上。  
canvas是一个新的HTML元素，这个元素可以被Script语言(通常是JavaScript)用来绘制图形。例如可以用它来画图、合成图象、或做动画。canvas最先在苹果公司(Apple)的Mac OS X Dashboard上被引入，而后被应用于Safari。后面被采用成为HTML5标准规范的一部分。  
像其他的html标签一样，canvas拥有大部分通用的属性，比如width和height。canvas标签在使用中一般是通过js来操作的，可以吧canvas看成一个画布，在上面如何作图，js是就是进行创作的工具。操作画布之前，首先要获取改画布的上文context，这个可以理解为环境状态，比如画画之前先固定好画布，看一下画布的大小，决定怎么作画。这个获取上下文也就是这个意思。代码：

目前这个canvas只支持2d绘画，而3d绘画是通过webgl实现的。这个后续课程会讲解到，有兴趣的可以做个预研，了解一下。目前这个使用的比较多的是开源的Three.js框架。

### [][3]canas绘制文本

绘制文本需要用到下列的属性和方法：  
属性：  
1.context.font属性，获取或设置文本的字体和大小。设置该属性的字符串语法与CSS语法中的font是一样的，不能解析成CSS的值会被忽略掉。  
2.context.textAlign属性，获取或设置字体的对其方式。只允许下列值:start, end, left, right, 和center。其他值会被忽略，默认值是start。  
3.context.textBaseline属性，获取或设置字体的基准线。有效的值如下：top, hanging, middle, alphabetic, ideographic, bottom。其他值会被忽略，默认值是alphabetic。  
用法：  
1.context.fillText(text, x, y [, maxWidth ] )，该方法用于在指定的位置绘制文本。如果设置了maxWidth，则会调整字符串使之符合这个条件。  
2.context. strokeText(text, x, y [, maxWidth ] )，该方法用于在指定的位置绘制镂空的文本。  
例子代码：

### [][4]canas绘制图片

绘制原图：context.drawImage(image, dx, dy)  
缩放绘图：context.drawImage(image, dx, dy, dw, dh)  
切片绘图：context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)  
合理的绘制多幅图像可以做出漂亮的组合效果，比如常见的画廊就是框图片与照片的叠加，只不过要注意绘制的先后顺序。  
第一个参数image代表图片的来源，可以是下列几种：  
　　(1)页面内的图片:[我们](https://www.w3cdoc.com)可以通过 document.images 集合、document.getElementsByTagName 方法又或者 document.getElementById 方法来获取页面内的图片。  
　　(2)已经完备的canvas：可以使用document.getElementsByTagName或document.getElementById方法来获取已经准备好的canvas元素。一个常用的场景就是为另一个大的canvas做缩略图。  
　　(3)通过data:url方式(<a href="https://en.wikipedia.org/wiki/Data:_URL" target="_blank" rel="external">https://en.wikipedia.org/wiki/Data:_URL</a> )嵌入图像：Data urls允许用一串Base64编码的字符串的方式来定义一个图片。其优点就是图片内容即时可用，无须再到服务器兜一圈。(还有一个优点是，可以将CSS，JavaScript，HTML和图片全部封装在一起，迁移起来十分方便。)缺点就是图像没法缓存，图片大的话内嵌的url数据会相当的长。例如：

　　(4)动态创建的图片：[我们](https://www.w3cdoc.com)可以用脚本创建一个新的Image对象，但这种方法的主要缺点是如果不希望脚本因为等待图片装置而暂停，还得需要突破预装载。  
var img = new Image();  
img.src = ‘myImage.png’;  
　　当脚本执行后，图片开始装载。若调用drawImage时，图片没装载完，脚本会等待直至装载完毕。如果不希望这样的效果，则需要使用图片的onload事件。(见下面的例子)。其他几个参数的含义：sx,sy是Image在源中的起始坐标，sw/sWidth,sh/sHeight是源中图片的宽和高，dx,dy是在目标中的坐标，dw/dWidth,dh/dHeight是目标的宽和高。具体可以参看下图：  
<img loading="lazy" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/Canvas_drawimage.jpg" width="300" height="290" alt="Canvas图像处理和滤镜特效" />  
代码：

### [][5]图像处理

在泛函分析中，卷积、旋积或摺积(英语：Convolution)是通过两个函数f 和g 生成第三个函数的一种数学算子，表征函数f 与经过翻转和平移的g 的重叠部分的面积。所谓的对图像的卷积操作，就是指对图像上的每一点的像素值，用这个矩阵进行运算，得到一个新的值。关于卷积的详细理论介绍，参考另一篇博文：  
<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_theory/" target="_blank" rel="external">图像处理的数学理论</a>  
在HTML5中可以使用canvas标签的getImageData方法获得像素矩阵，然后采用卷积做特效处理。

上面是做高斯模糊处理的例子。使用的对图像数据卷积的操作，类似的可以做出很多效果。最后使用clearRect函数清除画布，使用putImageData函数将处理结果像素矩阵绘制到画布上。

### [][6]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#简介 "简介"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#canas介绍 "canas介绍"
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#canas绘制文本 "canas绘制文本"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#canas绘制图片 "canas绘制图片"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#图像处理 "图像处理"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_html_canvas/#谢谢！ "谢谢！"
