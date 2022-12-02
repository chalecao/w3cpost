---
title: SVG的牛B之处，你造吗

---

### [][1]牛掰掰的svg

SVG能干啥，想干啥就干啥。可以用来做贴图，做纹理，做动画，甚至做背景图片，你想要的都可以，关键是操作灵活，和别是和canvas又可以相互转化使用，简直是居家旅行必备神器，作为[前端](https://www.w3cdoc.com)工程师，你学会了吗？不会，就抓紧开始吧。  
<a></a>  
![SVG的牛B之处，你造吗][2]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external">SVG系列教程</a>

大致的写法也就这样子:

除了简写的SVG结构，还有一种典型的SVG结构。通常情况之下，一个SVG文件包含内部链接，在这种情况之下，必须定义xlink声明空间<a href="https://www.w3.org/1999/xlink" target="_blank" rel="external">https://www.w3.org/1999/xlink</a>:

在这个示例中，还声明了SVG画布的大小。定义SVG画布大小是可选的，但强烈推荐，使用SVG时定义其画布大小。  
在使用代码编写SVG时，最好加上DTD，这是非常有用的。在一些示例中，你可能会看到这样的代码：

### [][3]什么是SVG

SVG是”Scalable Vector Graphics”的简称。中文可以理解成“可缩放矢量图形”。这个概念对于设计师来讲一点不陌生，但对于码农来讲，总是没有设计师们理解的那么透彻。其实码农们也没必要理解的那么透彻，只需要知道他是web页中的矢量图即可。  
其实记住几个关键词，SVG是可缩放矢量图形，1999年由万维网联盟发布。于2013年成为W3C推荐标准。  
1.SVG是指可伸缩矢量图形  
2.SVG用来定义用于网络的基于矢量的图形  
3.SVG使用XML格式定义图形  
4.SVG图像在放大或缩小（改变尺寸）的情况下，其图形质量不会受受损失  
5.SVG是W3C的一个标准

### [][4]SVG有哪些优势

SVG也是用来图形化的东东，那么他与位图相比有什么优势呢？(随着屏幕多样化的出现，特别是Retina的出现以及爱疯6和Plus，对于图形在Web中的应用更具挑战性。)  
![SVG的牛B之处，你造吗][5]  
从图中可以明显看出，位图与SVG图PK出来的结果。  
与其他图像格式相比，使用SVG的优势在于：  
1.SVG可被非常多的工具读取和修改（比如记事本）  
2.SVG与JPEG和GIF图像比起来，尺寸更小，且可压缩性更强。  
3.SVG是可伸缩的  
4.SVG图像可在任何的分辨率下被高质量地打印  
5.SVG可在图像质量不下降的情况下被放大  
6.SVG图像中的文本是可选的，同时也是可搜索的（很适合制作地图）  
7.SVG可以与Java技术一起运行  
8.SVG是开放的标准  
9.SVG文件是纯粹的XML

### [][6]如何显示SVG

SVG文件是纯粹的XML，或许[大家](https://www.w3cdoc.com)更为关心的是如何在Web[浏览器](https://www.w3cdoc.com)中让SVG显示。要在[浏览器](https://www.w3cdoc.com)中显示（前提是[浏览器](https://www.w3cdoc.com)支持），可以通过几种方法来实现：  
1.指向SVG文件地址, 将SVG直接嵌套在HTML中  
而将SVG图像嵌入到HTML文件有多种方法：

  1. 使用img元素来嵌入SVG图像

  2. 将SVG图像作为背景图像嵌入

  3. 直接使用svg元素

5.使用embed元素来嵌入SVG图像

6.使用object元素来嵌入SVG图像

7.使用svg做纹理显示

这个用SVG做纹理填充另外一个svg比较牛逼，可以深度自定义。现在好多图形图表的插件就是这么做的，而且通过canvas可以直接把绘制的图形保存成本地图片，方便一笔。  
比如专门做图形化的JS类库：  
1.D3.js: <a href="https://d3js.org/" target="_blank" rel="external">https://d3js.org/</a>  
2.Raphael.js：<a href="https://raphaeljs.com/" target="_blank" rel="external">https://raphaeljs.com/</a>

### [][7]基础知识

参考下面几个手册吧：

  1. w3school svg：<a href="https://www.w3school.com.cn/svg/" target="_blank" rel="external">https://www.w3school.com.cn/svg/</a>
  2. svg 手册：<a href="https://www.runoob.com/svg/svg-tutorial.html" target="_blank" rel="external">https://www.runoob.com/svg/svg-tutorial.html</a>

### [][8][浏览器](https://www.w3cdoc.com)支持

SVG图像虽然很多年就出现在人们的视线中，可是当年其就是后娘生的娃娃，没人爱搭理。只不过凭借其自身的魅力，各大[浏览器](https://www.w3cdoc.com)也开始器重。所以得到的支持度相对于当初要高很多。

可算是一片绿地呀。有关于更详细的兼容情况可以阅读Caniuse提供的数据。

### [][9]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#牛掰掰的svg "牛掰掰的svg"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg-3.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#什么是SVG "什么是SVG"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#SVG有哪些优势 "SVG有哪些优势"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg1.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#如何显示SVG "如何显示SVG"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#基础知识 "基础知识"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#[浏览器](https://www.w3cdoc.com)支持 "[浏览器](https://www.w3cdoc.com)支持"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/30/2015_svg/#谢谢！ "谢谢！"
