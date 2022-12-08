---
title: touch点击穿透与click与300ms延迟



---
做过移动端H5页面的同学肯定知道，移动端web的事件模型不同于PC页面的事件。看了一些关于touch事件的文章，我想再来回顾下touch事件的原理，为什么通过touch可以触发click事件，touch事件是不是万能的以及它可能存在的问题。

欢迎学习[前端](https://www.w3cdoc.com)知识体系课程，本系列属于：[[前端](https://www.w3cdoc.com)增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

## touch事件的来源 {#articleHeader1}

PC网页上的大部分操作都是用鼠标的，即响应的是鼠标事件，包括`mousedown`、`mouseup`、`mousemove`和`click`事件。一次点击行为，事件的触发过程为：`mousedown` -> `mouseup` -> `click` 三步。

手机上没有鼠标，所以就用触摸事件去实现类似的功能。touch事件包含`touchstart`、`touchmove`、`touchend`，注意手机上并没有`tap`事件。手指触发触摸事件的过程为：`touchstart` -> `touchmove` -> `touchend`。

手机上没有鼠标，但不代表手机不能响应mouse事件（其实是借助touch去触发mouse事件）。有人在PC和手机上对事件做了对比实验，以说明手机对touch事件相应速度快于mouse事件。


  <img loading="lazy" width="609" height="354" class="alignnone size-full wp-image-3101 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01603162c2e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01603162c2e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01603162c2e.png?x-oss-process=image/format,webp 609w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01603162c2e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_174/format,webp 300w" sizes="(max-width: 609px) 100vw, 609px" />

可以看到在手机上，当[我们](https://www.w3cdoc.com)手触碰屏幕时，要过300ms左右才会触发`mousedown`事件，所以`click`事件在手机上看起来就像慢半拍一样。

### touch事件中可以获取以下参数 {#articleHeader2}

| 参数             | 含义                       |
| -------------- | ------------------------ |
| touches        | 屏幕中每根手指信息列表              |
| targetTouches  | 和touches类似，把同一节点的手指信息过滤掉 |
| changedTouches | 响应当前事件的每根手指的信息列表         |

## tap是怎么来的 {#articleHeader3}

用过Zepto或KISSY等移动端js库的人肯定对`tap`事件不陌生，[我们](https://www.w3cdoc.com)做PC页面时绑定`click`，相应地手机页面就绑定`tap`。但原生的touch事件本身是没有tap的，js库里提供的tap事件都是模拟出来的。

[我们](https://www.w3cdoc.com)在上面看到，手机上响应 click 事件会有300ms的延迟，那么这300ms到底是干嘛了？[浏览器](https://www.w3cdoc.com)在 touchend 后会等待约300ms，原因是判断用户是否有双击（double tap）行为。如果没有 tap 行为，则触发 click 事件，而双击过程中就不适合触发 click 事件了。由此可以看出 click 事件触发代表一轮触摸事件的结束。

既然说tap事件是模拟出来的，[我们](https://www.w3cdoc.com)可以看下Zepto对 singleTap 事件的处理。<a href="https://github.com/madrobby/zepto/blob/master/src/touch.js#L136-L143" target="_blank" rel="nofollow noopener noreferrer">见源码 136-143 行</a>，可以看出在 touchend 响应 250ms 无操作后，则触发singleTap。

## 点击穿透的场景 {#articleHeader4}

有了以上的基础，[我们](https://www.w3cdoc.com)就可以理解为什么会出现_点击穿透_现象了。[我们](https://www.w3cdoc.com)经常会看到“弹窗/浮层”这种东西，我做个了个demo。


  <img loading="lazy" width="313" height="543" class="alignnone size-full wp-image-3100 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01601fc0957.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01601fc0957.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01601fc0957.png?x-oss-process=image/format,webp 313w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c01601fc0957.png?x-oss-process=image/quality,q_50/resize,m_fill,w_173,h_300/format,webp 173w" sizes="(max-width: 313px) 100vw, 313px" />

&nbsp;

整个容器里有一个底层元素的div，和一个弹出层div，为了让弹出层有模态框的效果，我又加了一个遮罩层。

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"container"&lt;/span>>&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"underLayer"&lt;/span>>&lt;/span>底层元素&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>

    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"popupLayer"&lt;/span>>&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"layer-title"&lt;/span>>&lt;/span>弹出层&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"layer-action"&lt;/span>>&lt;/span>
            &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"closePopup"&lt;/span>>&lt;/span>关闭&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>>&lt;/span>
        &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"bgMask"&lt;/span>>&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>>&lt;/span>
</code></pre>

然后为底层元素绑定 click 事件，而弹出层的关闭按钮绑定 tap 事件。

<pre class="hljs javascript"><code>$(&lt;span class="hljs-string">'#closePopup'&lt;/span>).on(&lt;span class="hljs-string">'tap'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">e&lt;/span>)&lt;/span>{
    $(&lt;span class="hljs-string">'#popupLayer'&lt;/span>).hide();
    $(&lt;span class="hljs-string">'#bgMask'&lt;/span>).hide();
});

$(&lt;span class="hljs-string">'#underLayer'&lt;/span>).on(&lt;span class="hljs-string">'click'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">'underLayer clicked'&lt;/span>);
});
</code></pre>

点击关闭按钮，touchend首先触发tap，弹出层和遮罩就被隐藏了。touchend后继续等待300ms发现没有其他行为了，则继续触发click，由于这时弹出层已经消失，所以当前click事件的target就在底层元素上，于是就alert内容。整个事件触发过程为 touchend -> tap -> click。

而由于click事件的滞后性（300ms），在这300ms内上层元素隐藏或消失了，下层同样位置的DOM元素触发了click事件（如果是input框则会触发focus事件），看起来就像点击的target“穿透”到下层去了。

<a href="https://jsorz.cn/demo/touch-event/problem.html" target="_blank" rel="nofollow noopener noreferrer">完整demo</a>请用chrome手机模拟器查看，或直接扫描二维码在手机上查看。

### 结合Zepto源码的解释 {#articleHeader5}

<a href="https://github.com/madrobby/zepto/blob/master/src/touch.js" target="_blank" rel="nofollow noopener noreferrer">zepto</a>中的 tap 通过兼听绑定在 document 上的 touch 事件来完成 tap 事件的模拟的，是通过事件冒泡实现的。在点击完成时（touchstart / touchend）的 tap 事件需要冒泡到 document 上才会触发。而在冒泡到 document 之前，手指接触和离开屏幕（touchstart / touchend）是会触发 click 事件的。

因为 click 事件有延迟（大概是300ms，为了实现safari的双击事件的设计），所以在执行完 tap 事件之后，弹出层立马就隐藏了，此时 click 事件还在延迟的 300ms 之中。当 300ms 到来的时候，click 到的其实是隐藏元素下方的元素。

如果正下方的元素有绑定 click 事件，此时便会触发，如果没有绑定 click 事件的话就当没发生。如果正下方的是 input 输入框（或是 select / radio / checkbox），点击默认 focus 而弹出输入键盘，也就出现了上面的“点透”现象。

点击穿透现象有3种：

* 点击穿透问题：点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件蒙层的关闭按钮绑定的是touch事件，而按钮下面元素绑定的是click事件，touch事件触发之后，蒙层消失了，300ms后这个点的click事件fire，event的target自然就是按钮下面的元素，因为按钮跟蒙层一起消失了
* 跨页面点击穿透问题：如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转因为 _a标签跳转默认是click事件触发_ ，所以原理和上面的完全相同
* 另一种跨页面点击穿透问题：这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了和蒙层的道理一样，js控制页面跳转的逻辑如果是绑定在touch事件上的，而且新页面中对应位置的元素绑定的是click事件，而且页面在300ms内完成了跳转，三个条件同时满足，就出现这种情况了

非要细分的话还有第四种，不过概率很低，就是新页面中对应位置元素恰好是a标签，然后就发生连续跳转了。。。诸如此类的，都是点击穿透问题

欢迎学习[前端](https://www.w3cdoc.com)知识体系课程，本系列属于：[[前端](https://www.w3cdoc.com)增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

## 穿透的解决办法 {#articleHeader6}

  1. 不要混用touch和click既然touch之后300ms会触发click，只用touch或者只用click就自然不会存在问题了
  2. 吃掉（或者说是消费掉）touch之后的click依旧用tap，只是在可能发生点击穿透的情形做额外的处理，拿个东西来挡住、或者tap后延迟350毫秒再隐藏mask、pointer-events、在下面元素的事件处理器里做检测（配合全局flag）等等，能吃掉就行

### 只用touch

最简单的解决方案，完美解决点击穿透问题

把页面内所有click全部换成touch事件（ `touchstart` 、’touchend’、’tap’）， _需要特别注意_ a标签，a标签的href也是click，需要去掉换成js控制的跳转，或者直接改成span + tap控制跳转。如果要求不高，不在乎滑走或者滑进来触发事件的话，span + touchend就可以了，毕竟tap需要引入第三方库

不用a标签其实没什么，移动app开发不用考虑SEO，即便用了a标签，一般也会去掉所有默认样式，不如直接用span

### 只用click

_下下策_ ，因为会带来300ms延迟，页面内任何一个自定义交互都将增加300毫秒延迟，想想都慢

不用touch就不会存在touch之后300ms触发click的问题，如果交互性要求不高可以这么做， _强烈不推荐_ ，快一点总是好的

### 遮挡 {#articleHeader7}

由于 click 事件的滞后性，在这段时间内原来点击的元素消失了，于是便“穿透”了。因此[我们](https://www.w3cdoc.com)顺着这个思路就想到，可以给元素的消失做一个fade效果，类似jQuery里的`fadeOut`，并设置动画duration大于300ms，这样当延迟的 click 触发时，就不会“穿透”到下方的元素了。

同样的道理，不用延时动画，[我们](https://www.w3cdoc.com)还可以动态地在触摸位置生成一个透明的元素，这样当上层元素消失而延迟的click来到时，它点击到的是那个透明的元素，也不会“穿透”到底下。在一定的timeout后再将生成的透明元素移除。<a href="https://jsorz.cn/demo/touch-event/solution1.html" target="_blank" rel="nofollow noopener noreferrer">具体可见demo</a>

### pointer-events {#articleHeader8}

`pointer-events`是CSS3中的属性，它有很多取值，有用的主要是`auto`和`none`，其他属性值为SVG服务。

| 取值   | 含义                                                                                      |
| ---- | --------------------------------------------------------------------------------------- |
| auto | 效果和没有定义 pointer-events 属性相同，鼠标不会穿透当前层。                                                  |
| none | 元素不再是鼠标事件的目标，鼠标不再监听当前层而去监听下面的层中的元素。但是如果它的子元素设置了pointer-events为其它值，比如auto，鼠标还是会监听这个子元素的。 |

关于使用 pointer-events 后的事件冒泡，有人做了个实验，<a href="https://runjs.cn/code/teegz43u" target="_blank" rel="nofollow noopener noreferrer">见代码</a>

因此解决“穿透”的办法就很简单，<a href="https://jsorz.cn/demo/touch-event/solution2.html" target="_blank" rel="nofollow noopener noreferrer">demo如下</a>

<pre class="hljs javascript"><code>$(&lt;span class="hljs-string">'#closePopup'&lt;/span>).on(&lt;span class="hljs-string">'tap'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">e&lt;/span>)&lt;/span>{
    $(&lt;span class="hljs-string">'#popupLayer'&lt;/span>).hide();
    $(&lt;span class="hljs-string">'#bgMask'&lt;/span>).hide();

    $(&lt;span class="hljs-string">'#underLayer'&lt;/span>).css(&lt;span class="hljs-string">'pointer-events'&lt;/span>, &lt;span class="hljs-string">'none'&lt;/span>);

    setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        $(&lt;span class="hljs-string">'#underLayer'&lt;/span>).css(&lt;span class="hljs-string">'pointer-events'&lt;/span>, &lt;span class="hljs-string">'auto'&lt;/span>);
    }, &lt;span class="hljs-number">400&lt;/span>);
});
</code></pre>

### 3. fastclick {#articleHeader9}

使用<a href="https://github.com/ftlabs/fastclick" target="_blank" rel="nofollow noopener noreferrer">fastclick</a>库，其实现思路是，取消 click 事件（<a href="https://github.com/ftlabs/fastclick/blob/master/lib/fastclick.js#L164-L173" target="_blank" rel="nofollow noopener noreferrer">参看源码 164-173 行</a>），用 touchend 模拟快速点击行为（<a href="https://github.com/ftlabs/fastclick/blob/master/lib/fastclick.js#L521-L610" target="_blank" rel="nofollow noopener noreferrer">参看源码 521-610 行</a>）。

<pre class="hljs css"><code>&lt;span class="hljs-selector-tag">FastClick&lt;/span>&lt;span class="hljs-selector-class">.attach&lt;/span>(&lt;span class="hljs-selector-tag">document&lt;/span>&lt;span class="hljs-selector-class">.body&lt;/span>);
</code></pre>

从此所有点击事件都使用`click`，不会出现“穿透”的问题，并且没有300ms的延迟。<a href="https://jsorz.cn/demo/touch-event/solution3.html" target="_blank" rel="nofollow noopener noreferrer">解决穿透的demo</a>

有人（叶小钗）对事件机制做了详细的剖析，循循善诱，并剖析了fastclick的源码以自己模拟事件的创建。<a href="https://www.cnblogs.com/yexiaochai/p/3462657.html" target="_blank" rel="nofollow noopener noreferrer">请看这篇文章，看完后一定会对移动端的事件有更深的了解</a>

## 问题

最近做一个线下商场用的android大屏幕的页面，这种定制屏幕触摸起来触摸轨迹会漂移，也就是说用户在屏幕上随便点一下触摸的就是一段位移。这时候如果绑定 click 事件，会导致click事件不会触发，很奇怪。改成touch事件来监听，但是又要考虑事件穿透的问题。特别是a标签的跳转，对于单页同位置，页面渲染太快，用户手还没移动开，就会重复触发多次。

## 参考资料 {#articleHeader10}

* <a href="https://www.cnblogs.com/yexiaochai/p/3377900.html" target="_blank" rel="nofollow noopener noreferrer">手持设备点击响应速度，鼠标事件与touch事件的那些事</a>
* <a href="https://liudong.me/web/touch-defect.html" target="_blank" rel="nofollow noopener noreferrer">点击穿透</a>
* <a href="https://github.com/ftlabs/fastclick" target="_blank" rel="nofollow noopener noreferrer">fastclick</a>
* <a href="https://www.cnblogs.com/yexiaochai/p/3442220.html" target="_blank" rel="nofollow noopener noreferrer">彻底解决tap“点透”，提升移动端点击响应速度</a>
* [300ms延迟的来龙去脉][2]

<audio style="display: none;" controls="controls"></audio>

 [1]: https://www.f2e123.com/fed-regain
 [2]: https://thx.github.io/mobile/300ms-click-delay
