---
title: fabric.js之強大的SVG处理工具类库

---

### [][1]什么是Fabric.js

使用 Fabric.js 你可以创建和填充画布上的对象，从简单的几何图形到成百上千路径组成的复杂图形。你可以通过鼠标轻松的移动、缩放和旋转这些对象，修改它们的属性（颜色、透明度，层叠顺序）等等。  
<a></a>  
![fabric.js之強大的SVG处理工具类库][2]

<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/05/2015_svg_learn/" target="_blank" rel="external">SVG系列教程</a>

总体上，fabric.js提供了2个大功能：

  1. 在canvas的底层基础上提供了 object model
  2. 提供 canvas的 rendering和state管理

### [][3]对象

#### [][4]基本类型

#### [][5]操作对象

属性 get(‘width’)和 set({ }):

状态变化时的动作：通过event来实现动画。

#### [][6]层次关系

fabric.Object： 代表二维形状，具有属性 left/top and width/height properties, as well as a slew of other graphiccharacteristics. Those properties that we saw on objects — fill, stroke, angle, opacity, flip*, etc。 可以在fabric.Object.prototype 定义函数，在fabric.Object的子类上共享。  
fabric.Circle 有 radius属性  
fabric.Image 有 setElement和getElement

#### [][7]Canvas类

是canvas的包装类，管理所有的fabric.Object，有方法： add getObjects item remove。配置：背景色或背景图片，剪切，是否交互等。

#### [][8]Interactive

支持：选择、拖动、旋转、放大、group together的操作  
步骤：  
1.初始化 canvas，加载 object model  
2.使用 selection 和selectable属性

3.创建一不含交互的canvas（轻量级）

#### [][9]Images

有img的html标签时：使用 fabric.Image,有 url 时： fabric.Image.fromUrl, 回调函数中的参数就是fabric.Image。  
Path和PathGroup可以制作任意向量图。  
path 包括一系列的命令，如 “move”, “line”, “curve”, or “arc”, 类似于 svg 的<path></path> ,可使用 fabric.Path手动创建，步骤：

也可使用 fabric内置的 SVG Parser创建（真创建复杂图形，这种方法比较多），步骤：  
1.使用 fabric.loadSVGFromString loadSVGFromURL加载整个SVG  
2.使用 SVG Parser得到 path对象  
3.PathGroup是Path的集合，集成于fabric.Object，所以可以add到cavas中

#### [][10]Animation

使用 animate 函数，包括三个参数：属性、值（支持目标值，如300, 相对值，如’+=100’)、回调函数（支持 duration, from，onComplete, easing change等，一般监听change事件。 ）

onChange: canvas.renderAll.bind(canvas) 在每帧变化时重新渲染，可看到动画效果

easing 代表变化函数，可取的值是fabric.util.ease包下，有easeOutBounce easeInCubic easeOutCubiceaseInElastic easeOutElastic easeInBounce 和easeOutExpo

#### [][11]Filter：

图片滤镜效果，预支持的有 remove whitebackground grayscale filter invert or brigtness one , gradienttransparentcy, sepia, noise

使用fabric.Image.filters.push ,再调用 img.applyFilters(canvas.renderAll.bind(canvas));

支持的 remove filter (via pop, splice, or shift), add filter (via push, splice, unshift), or even combine multiple filters.

可自定义filter： 略，参考filter中相应章节

#### [][12]Color:

支持多种color的定义，如rgb rgba hex等

newfabric.Color(‘#123123’);

newfabric.Color(‘rgb(100,0,100)’);

#### Gradients  

使用Object 中的setGradientFil函数，如

其中 x1,y1定义开始点，x2,y2定义结束点，colorStops 可以有多个，从 0 to 1 (e.g. 0, 0.1, 0.3,0.5, 0.75, 1)，如彩虹七色

#### Text（艺术字）  

扩展：

    <code>其中第二个参数可选，可以为left, top, fill, opacity,fontFamily ,fontSize  fontWeight textShadow, fontStyle  strokeStyle strokeWidth textBackgroundColor lineHeight   textAlign. 
    </code>

#### [][13]Events

提供从低端的mouse到高端的object 事件，如：

使用 on 监听事件，off 移除监听器

    <code>Note that eventslike "object:moving" (or "object:scaling") are fired continuouslyevery time an object is moved (or scaled) even by one pixel. On the other hand,events like "object:modified" or "selection:created" arefired only at the end of the action (object modification or selectioncreation).  也可以直接给 model object 添加事件  canvas.on(';mouse:down';, function(options){console.log(options.e.clientX, options.e.clientY); });    其中options有两个属性，一个e 代表事件，target 代表事件发出的对象 
    </code>

#### [][14]Groups

对多个物体统一移动和修改（scale rotate等）

group中item默认布局在group中央，通过给每个item设置left和top属性可修改

其他函数： getObjects() 获得group中所有对象， item 取得单个对象 等

创建已经在 canvas中加载的对象的group

#### [][15]Serialization

用于传递数据到其他客户端和服务器。以text方式

其中 toObject 转化为object格式，toJSON转换为json 字符串

    <code>实例： 
    </code>

对于自定义类，只要定义 toObject函数，当使用 canvas.toObject()时就可以递归调用，类似于java的toString。

SVG是canvas的另一种文本格式，好处是生成的文本可以被外部的SVG程序解析，

#### Free drawing  

支持在canvas上任意画，步骤：

1.canvas.isDrawingMode(true)后将鼠标的移动认为是pen和brush。

  1. 当mouse:up后，fabric发出 path:created事件，并创建fabric.Path实例

  2. canvas.isDrawingMode(false)终止绘画

可设置canvas的 freeDrawingColor and freeDrawingLineWidth

### [][16]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#什么是Fabric-js "什么是Fabric.js"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/fabric.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#对象 "对象"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#基本类型 "基本类型"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#操作对象 "操作对象"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#层次关系 "层次关系"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Canvas类 "Canvas类"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Interactive "Interactive"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Images "Images"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Animation "Animation"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Filter： "Filter："
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Color "Color:"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Events "Events"
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Groups "Groups"
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#Serialization "Serialization"
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/29/2015_fabric/#谢谢！ "谢谢！"
