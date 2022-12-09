---
title: SVG缩放，移动，倾斜和旋转变换

---

### [][1]SVG坐标系

SVG元素可以通过缩放，移动，倾斜和旋转来变换-类似HTML元素使用CSS transform来变换。然而，当涉及到坐标系时这些变换所产生的影响必然有一定差别。在这篇文章中[我们](https://www.w3cdoc.com)讨论SVG的transform属性和CSS属性，包括如何使用，以及你必须知道的关于SVG坐标系变换的知识。  
 
![SVG缩放，移动，倾斜和旋转变换][2]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external">SVG系列教程</a>

### [][3]transform属性值

tranform属性用来对一个元素声明一个或多个变换。它输入一个带有顺序的变换定义列表的transform-list值。每个变换定义由空格或逗号隔开。给元素添加变换看起来如下：  
有效地SVG变换有：旋转, 缩放, 移动, 和倾斜。transform属性中使用的变换函数类似于CSS中transform属性使用的CSS变换函数，除了参数不同。  
注意下列的函数语法定义只在transform属性中有效。查看section about transforming SVGs with CSS properties获取关于CSS变换属性中使用的语法信息。

#### [][4]Matrix

你可以使用matrix()函数在SVG元素上添加一个或多个变换。matrix变换语法如下：

上述声明通过一个有6个值的变换矩阵声明一个变换。matrix(a,b,c,d,e,f)等同于添加变换matrix[a b c d e f]。

如果你不精通数学，最好不要用这个函数。对于那些精通的人，你可以在这里阅读更多关于数学的内容。因此这个函数很少使用-我将忽略来讨论其他变换函数。

#### [][5]Translation

要移动SVG元素，你可以用translate()函数。translate函数的语法如下：

translate()函数输入一个或两个值得来声明水平和竖直移动值。tx代表x轴上的translation值；ty代表y轴上的translation值。

ty值是可选的，如果省略，默认值为0。tx和ty值可以通过空格或者逗号分隔，它们在函数中不代表任何单位-它们默认等于当前用户坐标系单位。

下面的例子把一个元素向右移动100个用户单位，向下移动300个用户单位。

上述代码如果以translate(100, 300)用逗号来分隔值的形式声明一样有效。

#### [][6]Scaling

你可以通过使用scale()函数变换来向上或者向下缩放来改变SVG元素的尺寸。scale变换的语法是：

scale()函数输入一个或两个值来声明水平和竖直缩放值。sx代表沿x轴的缩放值，用来水平延长或者拉伸元素；sy代表沿y轴缩放值，用来垂直延长或者缩放元素。  
sy值是可选的，如果省略默认值等于sx。sx和sy可以用空格或者逗号分隔，它们是无单位值。  
下面例子把一个元素的尺寸根据最初的尺寸放大两倍：

下列例子把一个元素缩放到最初宽度的两倍，并且把高度压缩到最初的一半：

上述例子使用逗号分隔的值例如scale(2, .5)仍然有效。  
这里需要注意当SVG元素缩放时，整个坐标系被缩放，导致元素在视窗中重新定位，现在不用担心这些，[我们](https://www.w3cdoc.com)会在下一节中讨论细节。

#### [][7]Skew

SVG元素也可以被倾斜，要倾斜一个元素，你可以使用一个或多个倾斜函数skewX 和 skewY。

函数skewX声明一个沿x轴的倾斜；函数skewY声明一个沿y轴的倾斜。  
倾斜角度声明是无单位角度的默认是度。  
注意倾斜一个元素可能会导致元素在视窗中重新定位。在下一节中有更多细节。

#### [][8]Rotation

你可以使用rotate()函数来旋转SVG元素。这个函数的语法如下：

rotate()函数对于给定的点和 旋转角度值执行旋转。不像CSS3中的旋转变换，不能声明除degress之外的单位。角度值默认无单位，默认单位是度。

可选的cx和cy值代表无单位的旋转中心点。如果没有设置cx和cy，旋转点是当前用户坐标系的原点（查看第一部分如果你不知道用户坐标系是什么。）

在函数rotate()中声明旋转中心点一个快捷方式类似于CSS中设置transform: rotate()和transform-origin。SVG中默认的旋转中心是当前使用的用户坐标系的左上角，这样也许你无法创建想要的旋转效果，你可以在rotate()中声明一个新的中心点。如果你知道元素在SVG画布中的尺寸和定位，你可以把它的中心设置为旋转中心。

下面的例子是以当前用户坐标系中的(50,50)点为中心进行旋转一组元素：

然而，如果你想要一个元素围绕它的中心旋转，你也许想要像CSS中一样声明中心为50% 50%；不幸的是，在rotate()函数中这样做是不允许的-你必须用绝对坐标。然而，你可以在CSS的transform属性中使用transform-origin属性。这篇文章后面会讨论更多细节。

### [][9]坐标系变化

现在[我们](https://www.w3cdoc.com)已经讨论了所有可能的SVG变换函数，[我们](https://www.w3cdoc.com)深入挖掘视觉部分和对SVG元素添加每个变换的效果。这是SVG变换最重要的部分。因此它们被称为“坐标系统变换”而不仅仅是“元素变换”。

在这个说明中，transform属性被定义成两个在被添加的元素上建立新用户空间（当前坐标系）之一-viewBox属性是创建新用户空间的两个属性中的另一个。所以到底是什么意思呢？

这个行为类似于在HTML元素上添加CSS变换-HTML元素坐标系发生了变换，当你把变换组合使用时最明显。虽然在很多方面很相似，HTML和SVG的变换还是有一些不同。

主要的不同是坐标系。HTML元素的坐标系建立在元素自身智商。然而，在SVG中，元素的坐标系最初是当前坐标系或使用中的用户空间。

当你在一个SVG元素上添加transform属性，元素获取当前使用的用户坐标系的一个“副本”。你可以当做给发生变换的元素创建一个新“层”，新层上是当前用户坐标系的副本（the viewBox）。

然后，元素新的当前坐标系被在transform属性中声明的变换函数改变，因此导致元素自身的变换。这看起来好像是元素在变换后的坐标系中重新绘制。

要理解如何添加SVG变换，让[我们](https://www.w3cdoc.com)从可视化的部分开始。下面图片是[我们](https://www.w3cdoc.com)要研究的SVG画布。

![SVG缩放，移动，倾斜和旋转变换][10]

鹦鹉和小狗使[我们](https://www.w3cdoc.com)要变换的元素(组g)。

灰色坐标是通过viewBox建立的画布的初始坐标系。为了方便起见，我将不改变初始坐标系-我用一个和视窗相同尺寸的viewBox，如你在上述代码中看到的一样。

现在[我们](https://www.w3cdoc.com)建立了画布和初始用户空间，让[我们](https://www.w3cdoc.com)开始变换元素。首先让[我们](https://www.w3cdoc.com)把鹦鹉向左移动150单位，向下移动200个单位。

当然，鹦鹉是由若干路径和形状组成的。只要把transform属性添加到包含它们的组g上就行了；这会对整个形状和路径添加变换，鹦鹉会作为一个整体进行变换。查看 article on structuring and grouping SVGs获取更多信息。

下面图片展示了上述变换后的结果。鹦鹉的半透明版本是变换前的初始位置。  
![SVG缩放，移动，倾斜和旋转变换][11]  
SVG中的变换和HTML元素上CSS中的一样简单直观。[我们](https://www.w3cdoc.com)之前提到在元素上添加transform属性时会在元素上创建一个新的当前用户坐标系。下面图片显示了初始坐标系的“副本”，它在鹦鹉元素发生变换时被建立。注意观察鹦鹉当前坐标系是如何变换的。  
![SVG缩放，移动，倾斜和旋转变换][12]  
这里需要注意的非常重要的一点是建立在元素上的新的当前坐标系是初始用户坐标系的复制，在里面元素的位置得以保持。这意味着它不是建立在元素边界盒上，或者新的当前坐标系的尺寸受制于元素的尺寸。这就是HTML和SVG坐标系之间的区别。

建立在变换元素上的新当前坐标系不是建立在元素边界盒上，或者新的当前坐标系的尺寸受制于元素的尺寸。

[我们](https://www.w3cdoc.com)把小狗变换到画布的右下方时会更加明显。试想[我们](https://www.w3cdoc.com)想要把小狗向右移动50单位，向下移动50单位。这就是狗的最初的坐标以及新的当前坐标系（也因为狗改变）会如何显示。注意小狗的新的坐标系统的原点不在狗边界盒子的左上角。另外注意狗和它新的坐标系看起来它们好像移动到画布新的一层上。  
![SVG缩放，移动，倾斜和旋转变换][13]  
现在[我们](https://www.w3cdoc.com)试一试其他事情。不再移动，试着缩放。[我们](https://www.w3cdoc.com)将鹦鹉放大到两倍尺寸：

放缩SVG元素和放缩HTML元素的结果不一样。缩放后SVG元素的在视窗中的位置随着缩放改变。下面图片展示了把鹦鹉放大到两倍时的结果。注意初始位置和尺寸，以及最终位置和尺寸。  
![SVG缩放，移动，倾斜和旋转变换][14]  
从上面图片中[我们](https://www.w3cdoc.com)可以注意到不只鹦鹉的尺寸（宽和高）变成了两倍，鹦鹉的坐标（x和y）也乘以了缩放因子（这里是两倍）。

这个结果的原因[我们](https://www.w3cdoc.com)之前已经提到了：元素当前坐标系发生变化，鹦鹉在新系统中绘制。所以，在这个例子中，当前坐标系被缩放。这个效果类似于使用viewBox = “0 0 400 300”，等于“放大”了坐标系，因此把里面的内容放大到双倍尺寸（如果你还没有读过请查看这个系列的第2部分）。

所以，如果[我们](https://www.w3cdoc.com)把坐标系变换形象化来展现当前变换系统中的鹦鹉，[我们](https://www.w3cdoc.com)会得到以下结果：  
![SVG缩放，移动，倾斜和旋转变换][15]  
鹦鹉的新的当前坐标系统被缩放，同时“放大”鹦鹉。注意，在它当前的坐标系中，鹦鹉没有重新定位-只有缩放坐标系统才会导致它在视窗中重定位。鹦鹉在新的缩放后的系统中按初始的x和y坐标被重绘。

让[我们](https://www.w3cdoc.com)尝使用不同因子在两个方向上缩放鹦鹉。如果[我们](https://www.w3cdoc.com)添加transform=”scale(2 0.5)缩放鹦鹉，[我们](https://www.w3cdoc.com)把宽度变为两倍高度为原来的一半。效果和添加viewBox=”0 0 400 1200”类似。  
![SVG缩放，移动，倾斜和旋转变换][16]  
注意一下鹦鹉在倾斜后的坐标系中的位置，并且把它和初始系统（半透明的鹦鹉）中的位置做比较：x和y位置坐标保持不变。

在SVG中倾斜元素也导致元素被“移动”，因为它当前的坐标系统被倾斜了。

试想[我们](https://www.w3cdoc.com)使用skewX函数沿x轴给一只狗增加一个倾斜变化。[我们](https://www.w3cdoc.com)在垂直方向上把狗倾斜了25度。

下列图片展示了对小狗添加倾斜变换的结果。  
![SVG缩放，移动，倾斜和旋转变换][17]  
注意到狗的位置对比初始位置也改变了，因为它的坐标系也被倾斜了。

下面的图片展示了同样角度的情况下使用skewY()而不是skewX倾斜狗的情况：  
最后，让[我们](https://www.w3cdoc.com)尝试旋转鹦鹉。旋转默认的中心是当前用户坐标系的左上角。新的建立在旋转元素上的当前系统也被旋转了。在下面的例子中，[我们](https://www.w3cdoc.com)将把鹦鹉旋转45度。旋转方向为顺时针。

添加上述变换的结果如下：  
![SVG缩放，移动，倾斜和旋转变换][18]  
你很可能想要围绕默认坐标系原点之外的点来旋转一个元素。在transform属性中使用rotate()函数，你可以声明这个点。试想在这个例子中[我们](https://www.w3cdoc.com)想按照它自己的中心旋转这个鹦鹉。根据鹦鹉的宽、高以及位置，我精确计算出它的中心在（150,170）。这个鹦鹉可以围着它的中心旋转。

在这个时候，这只鹦鹉会被旋转并且看起来如下：  
![SVG缩放，移动，倾斜和旋转变换][19]  
[我们](https://www.w3cdoc.com)说变换添加在坐标系上，因此，元素最终被影响并且发生变换。那么究竟如何改变旋转中心工作在坐标系的原点（0，0）的点呢？

当你改变中心或者旋转时，坐标系被变换或者旋转特定角度，然后再次根据声明的旋转中心产生特定变换。在这个例子中：

被[浏览器](https://www.w3cdoc.com)当成一系列的移动和旋转等同于：

当前坐标系变换到你想要的中心店。然后旋转声明的角度。最终系统被负值变换。上述添加到系统的变换如下：  
![SVG缩放，移动，倾斜和旋转变换][20]

在[我们](https://www.w3cdoc.com)进行下一部分讨论嵌套和组合变换前，我想请[大家](https://www.w3cdoc.com)注意建立在变换元素上的当前用户坐标系是独立于建立在其他变换元素之上的其他坐标系的。下列图片展示了建立在狗和鹦鹉上的两个坐标系，以及它们之间是如何保持独立的。  
![SVG缩放，移动，倾斜和旋转变换][21]

另外注意每个当前坐标系仍然处于在外层svg容器中使用viewBox属性建立的画布的主要坐标系中。任何添加到viewBox上的变换会影响整个画布以及所有里面的元素，不管它们是否建立了自己的坐标系。

例如，以下是把整个画布的用户空间从viewBox=”0 0 800 600”改成 viewBox=”0 0 600 450”的结果。整个画布被缩放，保持任何添加到独立元素上的变换。  
![SVG缩放，移动，倾斜和旋转变换][22]

### [][23]嵌套和组合变换

很多时候你可能想要在一个元素上添加多个变换。添加多个变换意味着“组合”变换。  
当变换组合时，最重要的是意识到，和HTML元素变换一样，当这个系统发生了之前的变换后在添加下一个变换到坐标系中。  
例如，如果你要在一个元素上添加旋转，接下来移动，移动变换会根据新的坐标系统，而不是初始的没有旋转时的系统。  
下面了例子就是做了这件事。[我们](https://www.w3cdoc.com)先添加旋转，然后沿x轴使用transform=”rotate(45 150 170) translate(200)”把鹦鹉移动200个单位。  
![SVG缩放，移动，倾斜和旋转变换][24]  
取决于最终的位置和变换，你可以根据需要组合变换。总是记住坐标系。

注意当你倾斜一个元素-以及它的坐标系统-坐标系统不再是最初的那个，坐标系不再会按照最初的来计算-它将会是倾斜后的坐标系。简单来说，这意味着坐标系原点不再是90度的角，新的坐标会根据新的角度来计算。

当变换元素的子元素也需要变换时会发生变换嵌套。添加到子元素上的变换会累积父元素上添加的变换和它本身的变换。

所以，效果上来说，嵌套变化类似于组合：唯一区别是不像在一个元素上添加一系列的变化，它自动从父元素上获得变换，最后执行添加在它自身的变换，就像[我们](https://www.w3cdoc.com)在上面添加的变换一样-一个接一个。

这对于你想要根据另外一个元素变换一个元素时尤其有用。例如，试想你想要给小狗的尾巴设定一个动画。这个尾巴是#dog组的后代。

试想[我们](https://www.w3cdoc.com)变换dog组；围绕某一点把它的身体旋转一定角度，然后[我们](https://www.w3cdoc.com)想要再把尾巴旋转一定角度。

当尾巴被旋转后，它从祖先（body）身上“继承”了变换坐标系，也从祖先（dog）身上继承了变换坐标系，然后旋转（和body组一样的旋转）然后在发生自身的旋转。这里添加的一系列变换的效果类似于[我们](https://www.w3cdoc.com)之前在上述组合变换例子中解释的。

所以，你看，在tail上嵌套变换实际上和组合变换有一样的效果。

### [][25]使用CSS属性变换SVGs

在SVG2中，transform属性简称transform属性；因为SVG变换已经被引入CSS3变换规范中。后者结合了SVG变化，CSS2 2D变换和CSS 3D变换规范，并且把类似transform-origin 和 3D transformations引入了SVG。

声明在CSS变换规范中的CSS变换属性可以被添加到SVG元素上。然而，transform属性函数值需要遵循CSS规范中的语法声明：函数参数必须逗号隔开-空格隔开是不允许的，但是你可以在逗号前后引用一两个空格；rotate()函数不接受cx和cy值-旋转中心使用transform-origin属性声明。另外，CSS变换函数接受角度和坐标单位，例如角度的rad(radians)和坐标的px,em等。

使用CSS来旋转一个SVG元素看起来如下：

SVG元素也可以使用CSS 3D变换在三维空间中变换。依然要注意坐标系，然而，不同于建立在HTML元素上的坐标系。这意味着3D旋转看起来也不同除非改变旋转中心。

因为通过CSS来变换SVG元素非常类似于通过CSS来变换HTML元素-语法层面-在这篇文章中我将跳过这个部分。

另外，在写这篇文章的时候，在一些[浏览器](https://www.w3cdoc.com)中实现一些特性是不可能的。因为[浏览器](https://www.w3cdoc.com)支持改变很快，我建议你实验一下这些属性来决定哪些可以工作哪些不可以，决定什么现在可以用什么不可以。

注意一旦CSS变换可以完全实现在SVG上，我依然建议你使用CSS变换函数语法即使你用transform属性的形式添加变换。也就是说，上面提到的transform属性函数的语法还是有效的。

### [][26]动画transform

SVG变换可以变成动画，就像CSS变换一样。如果你使用CSS transform属性来产生SVG变换，你可以像在HTML元素上创建CSS变换动画一样使用CSS动画把这些变换变成动画。

SVGtransform属性可以用SVG animateTransform元素来做成动画。animateTransform元素是SVG中三个用来给不同的SVG属性设置动画的元素之一。

关于animateTransform元素的详细内容不在本片文章的讨论范围内。阅读我写的关于不同SVG动画元素的文章，包括animateTransform。

学习SVGs一开始可能非常困惑，如果对于坐标系变换里的内容不是很清楚，尤其是如果你带着CSS HTML变换的背景知识，自然而然希望SVG元素和HTML元素的变换一样。

然而，一旦你意识到它们的工作方式，你能更好得控制SVG画布，并且轻易操纵元素。

这一系列的最后部分，我将讨论嵌套SVGs和建立新的viewports和viewboxes。敬请关注！

### [][27]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#SVG坐标系 "SVG坐标系"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#transform属性值 "transform属性值"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#Matrix "Matrix"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#Translation "Translation"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#Scaling "Scaling"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#Skew "Skew"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#Rotation "Rotation"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#坐标系变化 "坐标系变化"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg21.png
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg22.png
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg23.png
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg24.png
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg25.png
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg26.png
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg27.png
 [17]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg28.png
 [18]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg29.png
 [19]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg30.png
 [20]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg31.png
 [21]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg33.png
 [22]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg33-1.png
 [23]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#嵌套和组合变换 "嵌套和组合变换"
 [24]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg34.png
 [25]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#使用CSS属性变换SVGs "使用CSS属性变换SVGs"
 [26]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#动画transform "动画transform"
 [27]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/04/2015_svg2/#谢谢！ "谢谢！"
