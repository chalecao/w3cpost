---
title: SVG嵌套视窗综合实例

---
### SVG新视窗

在SVG绘制的任何一个时刻，你可以通过嵌套svg或者使用例如symbol的元素来建立新的viewport和用户坐标系。在这篇文章中，我们将看一下我们如何这样做，以及这样做如何帮助我们控制SVG元素并让它们变得更加灵活（或流动）。

![SVG嵌套视窗综合实例][1]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external noopener noreferrer">SVG系列教程</a>

### 嵌套svg元素

在第一部分我们讨论了svg元素如何为SVG画布内容建立一个视窗。在SVG绘制过程中的任何一个时刻，你可以创建一个新的视窗其中包含的图形是通过把一个svg元素包含在另一个中绘制的。通过建立新视窗，你隐性得建立了一个新视窗坐标系和新用户坐标系。

例如，试想有一个svg以及里面的内容：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"&gt;
    &lt;!-- some SVG content --&gt;
    &lt;svg&gt;
    &lt;!-- some inner SVG content --&gt;
    &lt;/svg&gt;
&lt;/svg&gt;</pre>

第一件需要注意的是内容svg元素不需要声明一个命名空间xmlns因为默认和外层svg的命名空间相同。当然，如果在HTML5文档中外层svg也不需要命名空间。

你可以使用一个嵌套的SVG来把元素组合在一起然后在父SVG中定位它们。现在，你也可以把元素组合在一起并且使用组g来定位-通过把元素包括在一组g元素中。你可以使用transform属性在画布中定位它们。然而，使用svg肯定好过使用g。使用x和y坐标来定位，在许多情况下，比使用变换更加方便。另外，svg元素接受宽高值，g不行。这意味着，svg也许并必要的，因为它可以创建一个新的viewport和坐标系，你可以不需要也不想要。

通过给svg声明宽高值，你把内容限制在通过x,y,width和height属性定义的viewport的边界。任何超过边界的内容会被裁切。

如果你不声明x和y属性，它们默认是0。如果你不声明height和width属性，svg会是父SVG宽度和高度的100%。

另外，声明用户坐标系而不是默认的也会影响内部svg的内容。

给svg内的元素百分比值的声明会根据svg计算，而不是外层svg。例如，下面的代码会导致内层SVG等于400单位，里面的长方形是200个单位：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg width="800" height="600"&gt;
    &lt;svg width="50%" ..&gt;&lt;rect width="50%" ... /&gt;
    &lt;/svg&gt;
&lt;/svg&gt;</pre>

如果最外层svg的宽度为100%（例如，如果它在一个文档中内联或者你想要它可以流动），内层SVG会扩展拉伸来保持宽度为外层SVG的一半-这是强制的。

嵌套SVG在给SVG画布中的元素增加灵活性和扩展性时尤其有用。我们知道，使用viewBox值和preserveAspectRatio，我们已经可以创建响应式SVG。最外层svg的宽度可以设置成100%来确保它扩展拉伸到它的容器（或页面）扩展或拉伸。然后通过使用viewBox值和 preserveAspectRatio，我们可以保证SVG画布可以自适应viewport中的改变（最外层svg）。我在CSSConf演讲的幻灯片中写到了关于响应式SVG的内容。你可以在这里查看这个技术。  
然而，当我们像这样创建一个响应式SVG，整个画布以及所有绘制在上面的元素都会有反应并且同时改变。但有时候，你只想让图形中的一个元素变为响应式，并且保持其他东西“固定”在一个位置和/或尺寸。这时候嵌套svg就很有用。

svg元素有独立于它父元素的坐标系，它可以有独立的viewBox和preserveAspectRatio属性，你可以任意修改里面内容的尺寸和位置。  
所以，要让一个元素更加灵活，我们可以把它包裹在svg元素中，并且给svg一个弹性的宽度来适应最外层SVG的宽度，然后声明preserveAspectRatio=”none”这样的话里面的图形会扩展和拉伸到容器的宽度。注意svg可以多层嵌套，但是为了让事情简洁，我在这篇文章里只嵌套一层深度。  
为了演示嵌套svg如何发挥作用，让我们来看一些例子。  
例子,试想我们有如下的SVG：  
![SVG嵌套视窗综合实例][2]  
上述SVG是响应式的。改变屏幕的尺寸会导致整个SVG图形根据需要做出反应。下面的截图展示了拉伸页面的结果，以及SVG如何变得更小。注意SVG的内容如何根据SVG视窗和相互之间保持它们的初始位置。  
![SVG嵌套视窗综合实例][3]  
使用嵌套SVG，我们将改变这个情况。我们可以对SVG中每个独立的元素根据SVG视窗声明一个位置，所以随着SVG 视窗尺寸的改变（即最外层svg的改变），每个元素独立于其他元素发生改变。

注意，在这个时候，你需要熟悉SVG viewport, viewBox, 和preserveAspectRatio是如何生效的。

我们将要创建一个效果，当屏幕尺寸变化时，蛋壳的上部分移动使得其中的可爱的小鸡显示出来，如下图所示：  
![SVG嵌套视窗综合实例][4]  
为了达到这个效果，蛋的上半部分必须和其他部分分离出来单独包含一个自己的svg。这个svg包含框会有一个IDupper-shell。

然后，我们保证新的svg#upper-shell和外层SVG有一样的高度和宽度。可以通过在svg上声明width=”100%” height=”100%”或者不声明任何高度和宽度来实现。如果内层SVG上没有声明任何宽高，它会自动扩展为外层SVG宽高的100%。

最终，为了确保上壳被“抬”起或定位在svg#upper-shell顶部的中心，我们将使用适当的preserveAspectRatio值来确保viewBox被定位在视窗的顶部中心-值是xMidYMin。

SVG图形的代码如下：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"&gt;
&lt;!-- ... --&gt;
    &lt;svg viewBox="0 0 315 385" preserveAspectRatio="xMidYMid meet"&gt;
    &lt;!-- the chicken illustration --&gt;
        &lt;g id="chicken"&gt;
        &lt;!-- ... --&gt;&lt;/g&gt;
        &lt;!-- path forming the lower shell --&gt;
        &lt;path id="lower-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d="..."/&gt;
    &lt;/svg&gt;
    &lt;svg id="upper-shell" viewBox="0 0 315 385" preserveAspectRatio="xMidYMin meet"&gt;
     &lt;!-- path forming the upper shell --&gt;
     &lt;path id="the-upper-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d="..."/&gt;
    &lt;/svg&gt;
&lt;/svg&gt;</pre>

这个时候，注意在嵌套svg#upper-shell上声明的viewBox和最外层svg有相同的值（在它被移除之前）。我们用相同的viewBox值我原因就是这样，SVG在大屏幕上保持最初的样子。

所以，这件事是这样的：我们开始一个SVG-在我们的例子中，这是一张里面藏着一个小鸡的带裂纹的蛋。然后，我们创建了另一“层”并把上部分的壳放在里面-这一层通过使用嵌套svg创建。嵌套svg和外层svg的尺寸和viewBox一样。最终，内层SVG的viewBox被设置成不管屏幕尺寸是多少都“固定”在viewport的顶部-这确保了当屏幕尺寸很窄时SVG被拉长，上层的壳被向上举起，因此展示出“隐藏”在里面的小鸡。  
![SVG嵌套视窗综合实例][5]  
一旦屏幕尺寸拉伸，SVG被拉长，使用preserveAspectratio=”xMidYMin meet”把包含上部分壳的viewBox被定位到viewport的顶部。  
![SVG嵌套视窗综合实例][6]  
点击下面按钮来查看在线SVG。记住改变屏幕尺寸再看SVG变化。  
<a href="https://sarasoueidan.com/images/svg-nesting-chick.svg" target="_blank" rel="external noopener noreferrer">在线案例</a>

嵌套或”分层”SVG使你可以根据改变的视窗定位SVG的一部分，在保持元素宽高比的情况下。所以图片可以在不扭曲内容元素的情况下自适应。

如果我们想要整个鸡蛋剥离显示出小鸡，我们可以单独用一个svg层包含下部分壳，viewBox也相同。确保下部分壳向下移动并固定在视窗的底部中心，我们使用preserveAspectRatio=”xMidYMax meet”来定位。代码如下：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"&gt;
    &lt;svg id="chick" viewBox="0 0 315 385" preserveAspectRatio="xMidYMid meet"&gt;
    &lt;!-- the chicken illustration --&gt;
    &lt;g id="chick"&gt;&lt;!-- ... --&gt;&lt;/g&gt;
    &lt;/svg&gt;
&lt;svg id="upper-shell" viewBox="0 0 315 385" preserveAspectRatio="xMidYMid meet"&gt;
&lt;!-- path forming the upper shell --&gt;
&lt;path id="the-upper-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d="..."/&gt;
&lt;/svg&gt;
&lt;svg id="lower-shell" viewBox="0 0 315 385" preserveAspectRatio="xMidYMax meet"&gt;
    &lt;!-- path forming the lower shell --&gt;
    &lt;path id="the-lower-shell" fill="url(#gradient)" stroke="#000000" stroke-width="1.5003" d="..."/&gt;
&lt;/svg&gt;
&lt;/svg&gt;</pre>

每个svg层/viewport等于最外层svg宽高的100%。所以我们基本有了三个副本。每层包含一个元素-上部分壳，下部分壳，或小鸡。三层的viewBox是相同的，只有preserveAspectRatio不同。  
![SVG嵌套视窗综合实例][7]  
当然，在这个例子里，一开始的图形中小鸡隐藏在蛋里，随着屏幕变小才显示出来。然而，你可以做一些不一样的：你可以开始在小屏幕上创建一个图形，然后在大屏幕上显示一些东西；即当svg变宽时才有更多垂直空间来展示元素。

你可以更有创造性，根据不同屏幕尺寸来显示和隐藏元素-使用媒体查询-把新元素通过特定方式定位来达到特定的效果。想象力是无穷的。

同时注意嵌套svg不需要和容器svg有相同的宽高；你可以声明宽高并且限制svg内容，超出边界裁切-这都取决于你想要达到什么效果。

### 使用嵌套SVG使元素流动

在保持宽高比的情况下定位元素，我们可以使用嵌套svg只允许特定元素流动-可以不保持这些特定元素的宽高比。

例如，如果你只想SVG中的一个元素流动，你可以把它包含在一个svg中，并且使用preserveAspectRatio=”none”来让这个元素扩展始终撑满这个视窗的宽，并且保持宽高比和像我们在之前例子中做的一样定位其他元素。

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg&gt;&lt;!-- ... --&gt;
&lt;svg viewBox=".." preserveAspectRatio="none"&gt;
&lt;!-- this content will be fluid --&gt;&lt;/svg&gt;&lt;svg viewBox=".." preserveAspectRatio=".."&gt;
&lt;!-- content positioned somewhere in the viewport --&gt;
&lt;/svg&gt;
&lt;!-- ... --&gt;&lt;/svg&gt;</pre>

Jake Archibald创建了一个简单实用的嵌套SVG使用案例：一个简单的UI可以包含定位在最外层svg角落的元素，并且保持宽高比，UI的中间部分浮动并且根据svg宽度改变进行拉伸。你可以在这里查看。确保你在开发工具里检查代码来选取和想象不同viewbox和svg使用的效果。

### 其他建立新视窗的方法

svg不是唯一能在SVG中创建新视窗的元素。在下面部分，我们会讨论使用其他SVG元素创建新视窗的方法。

使用use 和 symbol建立一个新的视窗

symbol元素会定义新视窗，无论它什么时候被use元素实例化。

symbol元素的使用可以参考use元素中的xlink:href属性：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;svg&gt;
  &lt;symbol id="my-symbol" viewBox="0 0 300 200"&gt;
  &lt;!-- contents of the symbol --&gt;&lt;!-- this content is only rendered when `use`d --&gt;
  &lt;/symbol&gt;&lt;use xlink:href="#my-symbol" x="?" y="?" width="?" height="?"&gt;
&lt;/svg&gt;</pre>

上面值中的问号表示这些值也许没有声明-如果x和y没有声明，默认值为0，也不需要声明宽高。

看到了吧，当你use一个symbol元素，然后使用开发工具检查DOM，你不会看到use标签中symbol的内容。因为use的内容在shadow tree里被渲染，如果你在开发工具中允许shadow DOM显示你就能看到。

当symbol被使用时，它被深度克隆到生成的shadow tree中，例外是symbol被svg替换。这个生成的svg总是有明确的宽高。如果宽高的值在use元素上，这些值会被转换生成svg。如果属性宽和/或高没有声明，生成的svg元素会使用这些值的100%。

因为我们在DOM中使用了svg，并且因为这个svg实际上包含在外层svg中，我们遇到的嵌套svg的状况和我们在之前一章讨论到的并没有多少不一样-嵌套的svg形成了一个新的viewport。嵌套svg的viewBox是在symbol元素上声明的viewBox。（symbol元素接受viewBox元素值。更多信息，阅读这篇文章：Structuring, Grouping, and Referencing in SVG – The , , and Elements)

所以我们现在有了一个新的viewport，尺寸和位置可以使用元素（x,y, width, height）声明，viewBox值可以在symbol元素上声明。symbol的内容随后再这个视窗和viewBox中被渲染和定位。

最后，symbol元素也接收preserveAspectratio属性值，你可以在由use建立的新视窗中定位viewBox。这很清楚，不是吗？你可以像我们在之前的部分里一样控制新创建的嵌套svg。

Dirk Weber 也创建了一个使用嵌套SVG和symbol元素来模仿CSS border images的表现。你可以在这里查看文章。

### 参考image中的SVG image建立一个新视窗

images元素表明整个文件的内容被渲染到一个当前用户坐标系中给定的长方形。image元素可以代表图片文件例如PNG或JPEG或者有”image/svg+xml”的MIME类型的文件。

代表SVG文件的image元素会导致建立一个临时新视窗因为定义相关资源有svg元素。

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;image xlink:href="myGraphic.svg" x="?" y="?" width="?" height="?" preserveAspectRatio="?" /&gt;</pre>

  <image>元素接收许多属性，其中一些属性-和这篇文章有关的-是x和y位置属性，width和height属性以及preserveAspectratio。

通常，SVG文件会包含一个根元素；这个元素也许声明位置和尺寸，另外也许有viewBox和preserveAspectratio值。

当一个image元素代表SVG图片文件，根svg的x，y，width和height属性被忽略。除非image元素上的preserveAspectRatio值以“defer”开头，根元素上的preserveAspectRatio值在代表SVG图片时也被忽略。然而相关image元素上的preserveAspectRatio属性定义SVG图片内容如何适应视窗。

评估被参考内容定义的preserveAspectRatio属性时使用viewBox属性值。对于明确定义的viewBox内容（例如，最外层元素上有viewBox属性的SVG文件）值应该被使用。对于大多数值（PING,JPEG），图片边界应该被使用（即image元素有隐含的尺寸为’0 0 raster-image-width raster-image-height’的viewBox）。如果值不全的话（例如，外层的svg元素没有viewbox属性的SVG文件）preserveAspectRatio值被忽略，只有视窗x & y属性引起的移动才用来显示内容。

例如，如果一个image元素代表PNG或JPEG并且preserveAspectRatio=”xMinYMin meet”，那么栅格的宽高比会保持，栅格会在保证整个栅格适应视窗的情况下尽可能放大尺寸，栅格的左上角会和由image元素上x,y,width和height定义的视窗的左上角对齐。

如果preserveAspectRatio的值是“none”那么图片的宽高比不会保持不变。图片会自适应，栅格的左上角和坐标系（x,y）完全对齐，栅格的右下角和坐标系(x+width, y+height)完全对齐。

### 使用iframe建立新视窗

代表SVG文件的iframe元素建立新坐标系的情况类似于上述解释的image元素的情况。iframe元素也可以有x,y,width和height属性，除了它自身的preserveAspectratio之外。

### 使用foreignObject建立新视窗

foreignObject元素建立一个新的viewport来渲染这个元素的内容。

foreignObject标签允许你把非SVG内容添加到SVG文件中。通常，foreignObject的内容被认为不同于命名空间。例如，你可以把一些HTML放到SVG元素的中间。

foreignObject接收属性包括x，y，height和width，用来定位对象和调整尺寸，创建用于呈现它里面所引用的内容的范围。

有需要关于foreignObject元素的要说因为它给内容创建了新的viewport。如果你感兴趣，可以查看MDN entry或者在<a href="https://thenittygritty.co/" target="_blank" rel="external noopener noreferrer">The Nitty Gritty Blog</a>上查看Christian Schaeffer创建的实际使用<a href="https://thenittygritty.co/css-masking" target="_blank" rel="external noopener noreferrer">例子</a>。

### 谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg-1.jpg
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg51.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg52.png
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg53.png
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg54.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg55.png
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/svg56.png
