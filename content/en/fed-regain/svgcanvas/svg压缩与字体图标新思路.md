---
title: SVG压缩与字体图标新思路


---
已经很晚了，程序员，程序狗，爱学习不爱加班的我，还是在加班，在学习。为了涨工资，ping了。本节安利一个压缩SVG的工具：svgo(<a href="https://github.com/chalecao/svgo)。我们做前端的同学肯定都用过字体图标，有些特殊的字体图标需要视觉做个svg的矢量图，或者你也可以自己做个矢量图，需要学学adobe" target="_blank" rel="external">https://github.com/chalecao/svgo)。我们做前端的同学肯定都用过字体图标，有些特殊的字体图标需要视觉做个svg的矢量图，或者你也可以自己做个矢量图，需要学学adobe</a> illustrator,绘制个矢量图，然后保存成svg格式就可以了。然后用记事本打开保存的svg文件，你会发现有许多没有用的svg标签，这时候你需要一个svg压缩工具，可以帮你做这些事情。  
<a></a>  
![SVG压缩与字体图标新思路][1]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external">SVG系列教程</a>

### [][2]SVG压缩

其实我的好奇心来自于goole的这个图片，这个是DATA URI, 单独用浏览器打开，发现是个svg，编码如下：

DATA－URI的格式为：  
data: [][; base64]，  
例如：  
一个红色五角星形状的内联图片可以定义为:

所以把后面的一长串用base64解码之后呢，就得到：

于是乎，我有了一个新的思路，以后用svg做字体图标就更方便了，只要把svg图标转一下成data uri，然后字体就可以用这个img图片或者背景图。不过需要考虑通用性，如果用图片，那么每个地方都写一遍这个dataURI，明显是不合适的。如果用背景图片，那么控制大小颜色就不太方便。所以这个方法还是有问题。呵呵，我又把自己打败了。

### [][3]压缩svg

做这些事情之前呢，就是先用 illustrator制作矢量图，探后保存成svg，然后转成data uri。为了保证data uri不会太大，所以需要压缩处理一下svg格式的文件，去除没有用的数据。

参考资料：  
(1) <a href="https://github.com/chalecao/svgo" target="_blank" rel="external">svgo</a>  
(2) <a href="https://www.tuicool.com/articles/ZrmYz2M" target="_blank" rel="external">SVG精简压缩工具svgo简介和初体验</a>  
(3) <a href="https://aiyouu.net/data-uris-explained/" target="_blank" rel="external">data uri</a>

### [][4]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNzIgOTIiIHdpZHRoPSIyNzIiIGhlaWdodD0iOTIiPjxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMTUuNzUgNDcuMThjMCAxMi43Ny05Ljk5IDIyLjE4LTIyLjI1IDIyLjE4cy0yMi4yNS05LjQxLTIyLjI1LTIyLjE4QzcxLjI1IDM0LjMyIDgxLjI0IDI1IDkzLjUgMjVzMjIuMjUgOS4zMiAyMi4yNSAyMi4xOHptLTkuNzQgMGMwLTcuOTgtNS43OS0xMy40NC0xMi41MS0xMy40NFM4MC45OSAzOS4yIDgwLjk5IDQ3LjE4YzAgNy45IDUuNzkgMTMuNDQgMTIuNTEgMTMuNDRzMTIuNTEtNS41NSAxMi41MS0xMy40NHoiLz48cGF0aCBmaWxsPSIjRkJCQzA1IiBkPSJNMTYzLjc1IDQ3LjE4YzAgMTIuNzctOS45OSAyMi4xOC0yMi4yNSAyMi4xOHMtMjIuMjUtOS40MS0yMi4yNS0yMi4xOGMwLTEyLjg1IDkuOTktMjIuMTggMjIuMjUtMjIuMThzMjIuMjUgOS4zMiAyMi4yNSAyMi4xOHptLTkuNzQgMGMwLTcuOTgtNS43OS0xMy40NC0xMi41MS0xMy40NHMtMTIuNTEgNS40Ni0xMi41MSAxMy40NGMwIDcuOSA1Ljc5IDEzLjQ0IDEyLjUxIDEzLjQ0czEyLjUxLTUuNTUgMTIuNTEtMTMuNDR6Ii8+PHBhdGggZmlsbD0iIzQyODVGNCIgZD0iTTIwOS43NSAyNi4zNHYzOS44MmMwIDE2LjM4LTkuNjYgMjMuMDctMjEuMDggMjMuMDctMTAuNzUgMC0xNy4yMi03LjE5LTE5LjY2LTEzLjA3bDguNDgtMy41M2MxLjUxIDMuNjEgNS4yMSA3Ljg3IDExLjE3IDcuODcgNy4zMSAwIDExLjg0LTQuNTEgMTEuODQtMTN2LTMuMTloLS4zNGMtMi4xOCAyLjY5LTYuMzggNS4wNC0xMS42OCA1LjA0LTExLjA5IDAtMjEuMjUtOS42Ni0yMS4yNS0yMi4wOSAwLTEyLjUyIDEwLjE2LTIyLjI2IDIxLjI1LTIyLjI2IDUuMjkgMCA5LjQ5IDIuMzUgMTEuNjggNC45NmguMzR2LTMuNjFoOS4yNXptLTguNTYgMjAuOTJjMC03LjgxLTUuMjEtMTMuNTItMTEuODQtMTMuNTItNi43MiAwLTEyLjM1IDUuNzEtMTIuMzUgMTMuNTIgMCA3LjczIDUuNjMgMTMuMzYgMTIuMzUgMTMuMzYgNi42MyAwIDExLjg0LTUuNjMgMTEuODQtMTMuMzZ6Ii8+PHBhdGggZmlsbD0iIzM0QTg1MyIgZD0iTTIyNSAzdjY1aC05LjVWM2g5LjV6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTI2Mi4wMiA1NC40OGw3LjU2IDUuMDRjLTIuNDQgMy42MS04LjMyIDkuODMtMTguNDggOS44My0xMi42IDAtMjIuMDEtOS43NC0yMi4wMS0yMi4xOCAwLTEzLjE5IDkuNDktMjIuMTggMjAuOTItMjIuMTggMTEuNTEgMCAxNy4xNCA5LjE2IDE4Ljk4IDE0LjExbDEuMDEgMi41Mi0yOS42NSAxMi4yOGMyLjI3IDQuNDUgNS44IDYuNzIgMTAuNzUgNi43MiA0Ljk2IDAgOC40LTIuNDQgMTAuOTItNi4xNHptLTIzLjI3LTcuOThsMTkuODItOC4yM2MtMS4wOS0yLjc3LTQuMzctNC43LTguMjMtNC43LTQuOTUgMC0xMS44NCA0LjM3LTExLjU5IDEyLjkzeiIvPjxwYXRoIGZpbGw9IiM0Mjg1RjQiIGQ9Ik0zNS4yOSA0MS40MVYzMkg2N2MuMzEgMS42NC40NyAzLjU4LjQ3IDUuNjggMCA3LjA2LTEuOTMgMTUuNzktOC4xNSAyMi4wMS02LjA1IDYuMy0xMy43OCA5LjY2LTI0LjAyIDkuNjZDMTYuMzIgNjkuMzUuMzYgNTMuODkuMzYgMzQuOTEuMzYgMTUuOTMgMTYuMzIuNDcgMzUuMy40N2MxMC41IDAgMTcuOTggNC4xMiAyMy42IDkuNDlsLTYuNjQgNi42NGMtNC4wMy0zLjc4LTkuNDktNi43Mi0xNi45Ny02LjcyLTEzLjg2IDAtMjQuNyAxMS4xNy0yNC43IDI1LjAzIDAgMTMuODYgMTAuODQgMjUuMDMgMjQuNyAyNS4wMyA4Ljk5IDAgMTQuMTEtMy42MSAxNy4zOS02Ljg5IDIuNjYtMi42NiA0LjQxLTYuNDYgNS4xLTExLjY1bC0yMi40OS4wMXoiLz48L3N2Zz4=
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/#SVG压缩 "SVG压缩"
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/#压缩svg "压缩svg"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/11/02/2016_svg4/#谢谢！ "谢谢！"
