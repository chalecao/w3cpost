---
title: SVG的视窗与宽高比控制

---

### [][1]SVG坐标系

SVG元素不像HTML元素一样由CSS盒模型管理。这使得[我们](https://www.w3cdoc.com)可以更加灵活定位和变换这些元素-也许一眼看上去不太直观。然而，一旦你理解了SVG坐标系和变换，操纵SVG会非常简单并且很有意义。本篇文章中[我们](https://www.w3cdoc.com)将讨论控制SVG坐标系的最重要的三个属性：viewport， viewBox， 和 preserveAspectRatio。  
 
![SVG的视窗与宽高比控制][2]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external">SVG系列教程</a>

canvas是绘制SVG内容的一块空间或区域。理论上，画布在所有维度上都是无限的。所以SVG可以是任意尺寸。然而，SVG通过有限区域展现在屏幕上，这个区域叫做viewport。SVG中超出视窗边界的区域会被裁切并且隐藏。

### [][3]视窗

视窗是一块SVG可见的区域。你可以把视窗当做一个窗户，透过这个窗户可以看到特定的景象，景象也许完整，也许只有一部分。

SVG的视窗类似访问当前页面的[浏览器](https://www.w3cdoc.com)视窗。网页可以是任何尺寸；它可以大于视窗宽度，并且在大多数情况下都比视窗高度要高。然而，每个时刻只有一部分网页内容是透过视窗可见的。

整个SVG画布可见还是部分可见取决于这个canvas的尺寸以及preserveAspectRatio属性值。你现在不需要担心这些；[我们](https://www.w3cdoc.com)之后会讨论更多的细节。  
你可以在最外层svg元素上使用width和height属性声明视窗尺寸。

在SVG中，值可以带单位也不可以不带。一个不带单位的值可以在用户空间中通过用户单位声明。如果值通过用户单位声明，那么这个值的数值被认为和px单位的数值一样。这意味着上述例子将被渲染为800px*600px的视窗。

你也可以使用单位来声明值。SVG支持的长度单位有：em，ex，px，pt，pc，cm，mm，in和百分比。

一旦你设定最外层SVG元素的宽高，[浏览器](https://www.w3cdoc.com)会建立初始视窗坐标系和初始用户坐标系。

### [][4]初始坐标系

初始视窗坐标系是一个建立在视窗上的坐标系。原点(0,0)在视窗的左上角，X轴正向指向右，Y轴正向指向下，初始坐标系中的一个单位等于视窗中的一个”像素”。这个坐标系统类似于通过CSS盒模型在HTML元素上建立的坐标系。

初始用户坐标系是建立在SVG画布上的坐标系。这个坐标系一开始和视窗坐标系完全一样-它自己的原点位于视窗左上角，x轴正向指向右，y轴正向指向下。使用viewBox属性，初始用户坐标系统-也称当前坐标系，或使用中的用户空间-可以变成与视窗坐标系不一样的坐标系。[我们](https://www.w3cdoc.com)在一下节中讨论如何改变坐标系。

到现在为止，[我们](https://www.w3cdoc.com)还没有声明viewBox属性值。SVG画布的用户坐标系统和视窗坐标系统完全一样。

下图中，视窗坐标系的”标尺”是灰色的，用户坐标系（viewBox）的是蓝色的。由于它们在这个时候完全相同，所以两个坐标系统重合了。  
![SVG的视窗与宽高比控制][5]  
上面SVG中的鹦鹉的外框边界是200个单位（这个例子中是200个像素）宽和300个单位高。鹦鹉基于初始坐标系在画布中绘制。

新用户空间（即，新当前坐标系）也可以通过在容器元素或图形元素上使用transform属性来声明变换。[我们](https://www.w3cdoc.com)将在后面讨论关于变换的内容，更多细节在第三部分和最后部分中讨论。

### [][6]viewBox

我喜欢把viewBox理解为“真实”坐标系。首先，它是用来把SVG图形绘制到画布上的坐标系。这个坐标系可以大于视窗也可以小于视窗，在视窗中可以整体可见或部分可见。

在之前的章节里，这个坐标系-用户坐标系-和视窗坐标系完全一样。因为[我们](https://www.w3cdoc.com)没有把它声明成其他坐标系。这就是为什么所有的定位和绘制看起来是基于视窗坐标系的。因为[我们](https://www.w3cdoc.com)一旦创建视窗坐标系（使用width和height），[浏览器](https://www.w3cdoc.com)默认创建一个完全相同的用户坐标系。

你可以使用viewBox属性声明自己的用户坐标系。如果你选择的用户坐标系统和视窗坐标系统宽高比（高比宽）相同，它会延伸来适应整个视窗区域（一分钟内[我们](https://www.w3cdoc.com)就来讲个例子）。然而，如果你的用户坐标系宽高比不同，你可以用preserveAspectRatio属性来声明整个系统在视窗内是否可见，你也可以用它来声明在视窗中如何定位。[我们](https://www.w3cdoc.com)会在下个章节里讨论这一情况的细节和例子。在这一章里，[我们](https://www.w3cdoc.com)只讨论viewBox的宽高比符合视窗的情况-在这些例子中，preserveAspectRatio不产生影响。

在[我们](https://www.w3cdoc.com)讨论这些例子前，[我们](https://www.w3cdoc.com)回顾一下viewBox的语法。

#### [][7]viewBox语法

viewBox属性接收四个参数值，包括：min-x, min-y, width 和 height。

min-x 和 min-y 值决定viewBox的左上角，width和height决定视窗的宽高。这里要注意视窗的宽高不一定和父svg元素的宽高一样。width和height值为负数是不合法的。值为0的话会禁止元素的渲染。

注意视窗的宽度也可以在CSS中设置为任何值。例如：设置width:100%会让SVG视窗在文档中自适应。无论viewBox的值是多少，它会映射为外层SVG元素计算出的宽度值。

设置viewBox的例子如下：

如果你之前在其他地方看到过viewBox，你也许会看到一些解释说你可以用viewBox属性通过缩放或者变化使SVG图形变换。这是真的。我将深入探究并且告诉你甚至可以使用viewBox来切割SVG图形。

理解viewBox和视窗之间差异最好的方法是亲身观察。所以让[我们](https://www.w3cdoc.com)看一些例子。[我们](https://www.w3cdoc.com)将从viewBox和viewport的宽高比相同的例子开始，所以[我们](https://www.w3cdoc.com)还不需要深入了解preserveAspectRatio。

#### [][8]与viewport宽高比相同的viewBox

[我们](https://www.w3cdoc.com)从一个简单的例子开始。这个例子中的viewBox的尺寸是视窗尺寸的一半。在这个例子中[我们](https://www.w3cdoc.com)不改变viewBox的原点，所以min-x和min-y都设置成0。viewBox的宽高是viewport宽高的一半。这意味着[我们](https://www.w3cdoc.com)保持宽高比。

所以，viewBox=”0 0 400 300”到底有什么用呢？

  1. 它声明了一个特定的区域，canvas横跨左上角的点(0,0)到点(400,300)。
  2. SVG图像被这个区域裁切。
  3. 区域被拉伸（类似缩放效果）来充满整个视窗。
  4. 用户坐标系被映射到视窗坐标系-在这种情况下-一个用户单位等于两个视窗单位。  
    下面的图片展示了在[我们](https://www.w3cdoc.com)例子中把上面的viewBox应用到svg 画布中的效果。灰色单位代表视窗坐标系，蓝色坐标系代表viewBox建立的用户坐标系。  
![SVG的视窗与宽高比控制][9]  
![SVG的视窗与宽高比控制][10]  
    任何在SVG画布中画的内容都会被对应到新的用户坐标系中。

我喜欢像Google地图一样通过viewBox把SVG画布形象化。在Google地图中你可以在特定区域缩放；这个区域是唯一可见的，并且在[浏览器](https://www.w3cdoc.com)视窗中按比例增加。然而，你知道地图的剩余部分还在那里，但是不可见因为它超出视窗的边界-被裁切了。

现在让[我们](https://www.w3cdoc.com)试着改变min-x和min-y的值。都设置为100。你可以设置成任何你想要的值。宽高比还是和视窗的宽高比一样。

![SVG的视窗与宽高比控制][11]  
![SVG的视窗与宽高比控制][12]  
再一次，用户坐标系被映射到视窗坐标系-200用户单位映射为800视窗单位因此每个用户单位等于四个视窗单位。结果像你看到的那样是放大的效果。

另外注意，在这个时候，为min-x和min-y声明非0的值对图形有变换的效果；更加特别的是，SVG 画布看起来向上拉伸100个单位，向左拉伸100个单位（transform=”translate(-100 -100)”）。

的确，作为规范说明，“viewBox属性的影响在于用户代理自动添加适当的变换矩阵来把用户空间中具体的矩形映射到指定区域的边界（通常是视窗）”。

这是一个很棒的说明[我们](https://www.w3cdoc.com)之前已经提到的内容的方法：图形被裁切然后被缩放以适应视窗。这个说明随后增加了一个注释：“在一些情况下用户代理在缩放变换之外需要增加一个移动变换。例如，在最外层的svg元素上，如果viewBox属性对min-x和min-y声明非0值得那么就需要移动变换。”

为了更好演示移动变换，让[我们](https://www.w3cdoc.com)试着给<min-x>和<min-y>添加-100。移动效果类似transform=”translate(100 100)”；这意味着图形会在切割和缩放后移动到右下方。回顾倒数第二个裁切尺寸为400*300的例子，添加新的无效min-x和min-y值，新的代码如下：

</min-y></min-x>

给图形添加上述viewBox transformation的结果如下图所示：  
![SVG的视窗与宽高比控制][13]  
注意，与transform属性不同，因为viewBox自动添加的tranfomation不会影响有vewBox属性的元素的x,y,宽和高等属性。因此，在上述例子中展示的带有width,height和viewBox属性的svg元素，width和height属性代表添加viewBox 变换之前的坐标系中的值。在上述例子中你可以看到初始（灰色）viewport坐标系甚至在svg上使用了viewBox属性后仍然没有影响。

另一方面，像tranform属性一样，它给所有其他属性和后代元素建立了一个新的坐标系。你还可以看到在上述例子中，用户坐标系是新建立的-它不是保持像初始用户坐标系和使用viewBox前的视窗坐标系一样。任何svg后代会在这个新的用户坐标系中定位和确定尺寸，而不是初始坐标系。

最后一个viewBox的例子和前一个类似，但是它不是切割画布，[我们](https://www.w3cdoc.com)将在viewport里扩展它并看它如何影响图形。[我们](https://www.w3cdoc.com)将声明一个宽高比视窗大的viewBox，并依然保持viewport的宽高比。[我们](https://www.w3cdoc.com)在下一章里讨论不同的宽高比。

在这个例子中，[我们](https://www.w3cdoc.com)将viewBox的尺寸设为viewport的1.5倍。

现在用户坐标系会被放大到1200*900。它会被映射到视窗坐标系，用户坐标系中的每一个单位水平方向上等于视窗坐标系中的viewport-width / viewBox-width，竖直方向上等于viewport-height / viewBox-height。这意味着，在这种情况下，每一个用户坐标系中的x-units等于viewport坐标系中的0.66个x-units，每个用户y-unit映射成0.66的viewport y-units。

当然，理解这些最好的方法是把结果视觉化。viewBox被缩放到适应下图所示的viewport。因为图形在画布里基于新的用户坐标系绘制的，而不是视窗坐标系，它看起来比视窗小。  
![SVG的视窗与宽高比控制][14]  
到目前为止，[我们](https://www.w3cdoc.com)所有的例子的宽高比都和视窗一致。但是如果viewBox中声明的宽高比和视窗中的不一样会发生什么呢？例如，试想[我们](https://www.w3cdoc.com)把视窗的尺寸设为1000*500。宽高比不再和视窗的一样。在例子中使用viewBox=”0 0 1000 500”的结果如下图：  
![SVG的视窗与宽高比控制][15]

用户坐标系。因此图形在视窗中定位：

1.整个viewBox适应视窗。  
2.保持viewBox的宽高比。viewBox没有被拉伸来覆盖视窗区域。  
3.viewBox在视窗中水平垂直居中。  
这是默认表现。那用什么控制表现呢？如果[我们](https://www.w3cdoc.com)想改变视窗中viewBox的位置呢？这就需要用到preserveAspectRatio属性了。

### [][16]preserveAspectRatio属性

preserveAspectRatio属性强制统一缩放比来保持图形的宽高比。

如果你用不同于视窗的宽高比定义用户坐标系，如果像[我们](https://www.w3cdoc.com)在之前的例子中看到的那样[浏览器](https://www.w3cdoc.com)拉伸viewBox来适应视窗，宽高比的不同会导致图形在某些方向上扭曲。所以如果上一个例子中的viewBox被拉伸以在所有方向上适应视窗，图形看起来如下：  
![SVG的视窗与宽高比控制][17]  
当给viewBox设置0 0 200 300的值时扭曲显而易见（显然这很不理想），这个值小于视窗尺寸。我故意选择这个尺寸从而让viewBox匹配鹦鹉边界盒子的尺寸。如果[浏览器](https://www.w3cdoc.com)拉伸图像来适应整个视窗，看起来会像下面这样：  
![SVG的视窗与宽高比控制][18]  
preserveAspectRatio属性让你可以在保持宽高比的情况下强制统一viewBox的缩放比，并且如果不想用默认居中你可以声明viewBox在视窗中的位置。

#### [][19]preserveAspectRatio语法

preserveAspectRatio的官方语法是：

它在任何建立新viewport的元素上都有效（[我们](https://www.w3cdoc.com)会在这个系列的下一部分讨论这个问题）。

defer声明是可选的，并且只有当你在image上添加preserveAspectRatio才被用到。用在任何其他元素上时它都会被忽略。images本身不在这篇文章的讨论范围，[我们](https://www.w3cdoc.com)暂时跳过defer这个选项。

align参数声明是否强制统一放缩，如果是，对齐方法会在viewBox的宽高比不符合viewport的宽高比的情况下生效。

如果align值设为none，例如：

图形不在保持宽高比而会缩放来适应视窗，像[我们](https://www.w3cdoc.com)在上面两个例子中看到的那样。

其他所有preserveAspectRatio值都在保持viewBox的宽高比的情况下强制拉伸，并且指定在视窗内如何对齐viewBox。[我们](https://www.w3cdoc.com)会简短介绍align的值。

最后一个属性，meetOrSlice也是可选的，默认值为meet。这个属性声明整个viewBox在视窗中是否可见。如果是，它和align参数通过一个或多个空格分隔。例如：

这些值第一眼看起来也许很陌生。为了让它们更易于理解和熟悉，你可以把meetOrSlice的值类比于background-size的contain和cover值;它们非常类似。meet类似于contain，slice类似于cover。下面是每个值的定义和含义：

#### [][20]meet（默认值）

基于以下两条准侧尽可能缩放元素：

  1. 保持宽高比
  2. 整个viewBox在视窗中可见  
    在这个情况下，如果图形的宽高比不符合视窗，一些视窗会超出viewBox的边界（即viewBox绘制的区域会小于视窗）。（在viewBox一节查看最后的例子。）在这个情况下，viewBox的边界被包含在viewport中使得边界满足。

这个值类似于background-size: contain。背景图片在保持宽高比的情况下尽可能缩放并确保它适合背景绘制区域。如果背景的长宽比和应用的元素的长宽比不一样，部分背景绘制区域会没有背景图片覆盖。

#### [][21]slice

在保持宽高比的情况下，缩放图形直到viewBox覆盖了整个视窗区域。viewBox被缩放到正好覆盖视窗区域（在两个维度上），但是它不会缩放任何超出这个范围的部分。换而言之，它缩放到viewBox的宽高可以正好完全覆盖视窗。

在这种情况下，如果viewBox的宽高比不适合视窗，一部分viewBox会扩展超过视窗边界（即，viewBox绘制的区域会比视窗大）。这会导致部分viewBox被切片。

你可以把这个类比为background-size: cover。在背景图片的情况中，图片在保持本身宽高比（如何）的情况下缩放到宽高可以完全覆盖背景定位区域的最小尺寸。

所以，meetOrSlice被用来声明viewBox是否会被完全包含在视窗中，或者它是否应该尽可能缩放来覆盖整个视窗，甚至意味着部分的viewBox会被“slice”。

例如，如果[我们](https://www.w3cdoc.com)声明viewBox的尺寸为200*300，并且使用了meet和slice值，保持align值为[浏览器](https://www.w3cdoc.com)默认，每个值的结果会看起来如下：  
![SVG的视窗与宽高比控制][22]

align参数使用9个值中的一个或者为none。任何除none之外的值都用来保持宽高比缩放图片，并且还用来在视窗中对齐viewBox。

当使用百分比值时，align值类似于background-position。你可以把viewBox当做背景图像。通过align定位和background-position的不同在于，不同于通过一个与视窗相关的点来声明一个特定的viewBox值，它把具体的viewBox“轴”和对应的视窗的“轴”对齐。

为了理解每个align值的含义，[我们](https://www.w3cdoc.com)将首先介绍每一个“轴”。

还记得viewBox的min-x和min-y值吗？[我们](https://www.w3cdoc.com)将使用它们来定义viewBox中的”min-x”和”min-y”轴。另外，[我们](https://www.w3cdoc.com)将定义两个轴“max-x”和”max-y“，各自通过min-x + width 和 min-y + height来定位。最后，[我们](https://www.w3cdoc.com)定义两个轴”mid-x”和”mid-y”，根据min-x + (width/2) 和 min-y + (height/2)来定位。

这样做是不是让事情更复杂了呢？如果是这样，让[我们](https://www.w3cdoc.com)看一下下面的图片来看一下每个轴代表了什么。在这张图片中，min-x和 min-y值都设置为0。viewBox被设置为viewBox = “0 0 300 300”。  
![SVG的视窗与宽高比控制][23]

上面图片中的灰色虚线代表视窗的mid-x和mid-y轴。[我们](https://www.w3cdoc.com)将对它们赋一些值来对齐viewBox的mid-x和mid-y轴。对于视窗，min-x的值等于0，min-y值也等于0，max-x值等于viewBox的宽度，max-y的值等于高度，mid-x和mid-y代表了宽度和高度的中间值。

对齐的取值包括：

#### [][24]none

不强制统一缩放。如果必要的话，在不统一（即不保持宽高比）的情况下缩放给定元素的图像内容直到元素的边界盒完全匹配是视窗矩形。

换句话说，如果有必要的话viewBox被拉伸或缩放来完全适应整个视窗，不管宽高比。图形也许会扭曲。

（注意：如果align的值是none，可选的meetOrSlice值无效。）

#### [][25]xMinYMin

强制统一缩放  
视窗X轴的最小值对齐元素viewBox的min-x。  
视窗Y轴的最小值对齐元素viewBox的min-y。  
把这个类比为backrgound-position: 0% 0%;。

#### [][26]xMinYMid

强制统一缩放。  
视窗X轴的最小值对齐元素viewBox的min-x。  
视窗Y轴的中间值来对齐元素的viewBox的中间值。  
把这个类比为backrgound-position: 0% 50%;。

#### [][27]xMinYMax

强制统一缩放。  
视窗X轴的最小值对齐元素viewBox的min-x。  
视窗X轴的最大值对齐元素的viewBox的min-y+height。  
把这个类比为backrgound-position: 0% 100%;。

#### xMidYMin

强制统一缩放。  
视窗X轴的中间值对齐元素的viewBox的X轴中间值。  
视窗Y轴的中间值对齐元素的viewBox的 min-y。  
把这个类比为backrgound-position: 50% 0%;。

#### xMidYMid (默认值)

强制统一缩放。  
视窗X轴的中间值对齐元素的viewBox的X轴中间值。  
视窗Y轴的中间值对齐元素的viewBox的Y轴中间值。  
把这个类比为backrgound-position: 50% 50%;。

#### xMidYMax

强制统一缩放。  
视窗X轴的中间值对齐元素的viewBox的X轴中间值。  
视窗Y轴的最大值对齐元素的viewBox的min-y+height。  
把这个类比为backrgound-position: 50% 100%;。

#### xMaxYMin

强制统一缩放。  
视窗X轴的最大值对齐元素的viewBox的 min-x+width。  
视窗Y轴的最小值对齐元素的viewBox的min-y。  
把这个类比为backrgound-position: 100% 0%;。

#### xMaxYMid

强制统一缩放。  
视窗X轴的最大值对齐元素的viewBox的 min-x+width。  
视窗Y轴的中间值对齐元素的viewBox的Y轴中间值。  
把这个类比为backrgound-position: 100% 50%;。

#### xMaxYMax

强制统一缩放。  
视窗X轴的最大值对齐元素的viewBox的 min-x+width。  
视窗Y轴的最大值对齐元素的viewBox的 min-y+height。  
把这个类比为backrgound-position: 100% 100%;。  
所以，通过使用preserveAspectRatio属性的align和meetOrSlice值，你可以声明是否统一缩放viewBox，是否和视窗对齐，在视窗中是否整个可见。

有时候，取决于viewBox的尺寸，一些值可能会导致相似的结果，例如在早先viewBox=”0 0 200 300”的例子中，一些对齐完全用了不同的align值。这时候就要设置meetOrSlice的值为meet来保证viewBox包含在viewport内。

### 互动演示  

要理解viewport, viewBox, 以及不同的preserveAspectRatio值是如何工作的最好方法是可视化的演示。

出于这个目的，我创建了一个简单的互动演示，你可以改变这些属性的值来查看新值导致的结果。

![SVG的视窗与宽高比控制][28]

<a href="https://sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html" target="_blank" rel="external">传送门:https://sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html</a>

### [][29]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#SVG坐标系 "SVG坐标系"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg-4.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#视窗 "视窗"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#初始坐标系 "初始坐标系"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg11.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#viewBox "viewBox"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#viewBox语法 "viewBox语法"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#与viewport宽高比相同的viewBox "与viewport宽高比相同的viewBox"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg12.png
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg13.png
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg14.png
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg15.png
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg16.png
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg17.png
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg18.png
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#preserveAspectRatio属性 "preserveAspectRatio属性"
 [17]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg19.png
 [18]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg20.jpg
 [19]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#preserveAspectRatio语法 "preserveAspectRatio语法"
 [20]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#meet（默认值） "meet（默认值）"
 [21]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#slice "slice"
 [22]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg21.jpg
 [23]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg22.jpg
 [24]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#none "none"
 [25]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#xMinYMin "xMinYMin"
 [26]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#xMinYMid "xMinYMid"
 [27]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#xMinYMax "xMinYMax"
 [28]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg23.jpg
 [29]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/03/2015_svg1/#谢谢！ "谢谢！"
