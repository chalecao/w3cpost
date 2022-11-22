---
title: JavaScript事件流


date: 2019-03-01T02:47:31+00:00
url: /javascriptnodejs/3692.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png
onesignal_meta_box_present:
  - 1
fifu_image_alt:
  - JavaScript事件流
views:
  - 1011
like:
  - 8


---
# 0.DOM级别与DOM事件 {#articleHeader1}

> 首先在介绍DOM事件之前我们先来认识下DOM的不同级别。针对不同级别的DOM，我们的DOM事件处理方式也是不一样的。  
> DOM级别一共可以分为4个级别：DOM0级，DOM1级，DOM2级和DOM3级，  
> 而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。

如下图所示：

<p id="lsbIbbB">
  <img loading="lazy" width="800" height="363" class="alignnone size-full wp-image-3695 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_136/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c85a9850.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_348/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

其中1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。

# 1.事件 {#articleHeader2}

> **事件**指可以被 JavaScript 侦测到的行为。即鼠标点击、页面或图像载入、鼠标悬浮于页面的某个热点之上、在表单中选取输入框、确认表单、键盘按键等操作。事件通常与函数配合使用，当事件发生时函数才会执行。  
> **事件名称**：click/mouseover/blur(&#8220;不带on&#8221;)响应某个事件的函数就是**事件处理程序**(事件侦听器)。  
> **事件处理程序函数名称**：onclick/onmouseove/onblur

<pre class="hljs xml"><code>例子代码--点击事件触发alert函数
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"alert('hello')"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span></code></pre>

更多事件类别请参考w3c中关于事件的详细类别。  
<a href="http://www.w3school.com.cn/js/js_events.asp" target="_blank" rel="nofollow noopener noreferrer">JavaScript 事件</a>  
<a href="http://www.w3school.com.cn/jsref/jsref_events.asp" target="_blank" rel="nofollow noopener noreferrer">JavaScript 事件参考手册</a>

# 2.事件流 {#articleHeader3}

> **事件流**指从页面中接收事件的顺序,也可理解为事件在页面中传播的顺序。

一点背景：  
早期的IE事件传播方向为由上至下，即从document逐级向下传播到目标元素；  
而Netscape公司的Netscape Navigator则是朝相反的方向传播，也就是从目标元素开始向上逐级传播最终至window。 两家公司对于事件流出现了截然相反的定义。

后来ECMAScript在DOM2中对事件流进行了进一步规范，基本上就是上述二者的结合。  
当事件发生时，最先得到通知的是window，然后是document，由上至下逐级依次而入，直到真正触发事件的那个元素(目标元素)为止，这个过程就是捕获。  
接下来，事件会从目标元素开始起泡，由下至上逐级依次传播，直到window对象为止，这个过程就是冒泡。  
所以捕获比冒泡先执行。  
其中DOM3级事件在DOM2的基础之上添加了更多的事件类型。

DOM2级事件规定的事件流包括三个阶段：  
（1）事件捕获阶段（2）处于目标阶段（3）事件冒泡阶段。  
下面图片来自：<a href="https://www.w3.org/TR/DOM-Level-3-Events/#event-flow" target="_blank" rel="nofollow noopener noreferrer">https://www.w3.org/TR/DOM-Lev&#8230;</a>

<p id="JxuvWaJ">
  <img loading="lazy" width="800" height="678" class="alignnone size-full wp-image-3696 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_254/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_651/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789c9b6cdf4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_708,h_600/format,webp 708w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

&nbsp;

我们写一个例子：如下图，中间白色区域的盒子分别为box1,box2&#8230;box6,包含控制按钮设置我们的事件

<pre class="hljs xml"><code>    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">h4&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"currentBox"&lt;/span>&gt;&lt;/span>点击按钮设置类型后再点击中心&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">h4&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnCapture"&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"setCapture()"&lt;/span>&gt;&lt;/span>设置捕获&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnBubble"&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"setBubble()"&lt;/span>&gt;&lt;/span>设置冒泡&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnAll"&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"setAll()"&lt;/span>&gt;&lt;/span>设置捕获和冒泡&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"clearAll()"&lt;/span>&gt;&lt;/span>动画完成后再清除设置&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box1"&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box2"&lt;/span>&gt;&lt;/span>
            &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box3"&lt;/span>&gt;&lt;/span>
                &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box4"&lt;/span>&gt;&lt;/span>
                    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box5"&lt;/span>&gt;&lt;/span>
                        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"box"&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"box6"&lt;/span>&gt;&lt;/span>
                            点击

                        &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
                    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
                &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
            &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
</code></pre>

大概流程图如下：

&nbsp;

<p id="IwXYIhD">
  <img loading="lazy" width="800" height="664" class="alignnone size-full wp-image-3697 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_249/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_637/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789caabfb74.png?x-oss-process=image/quality,q_50/resize,m_fill,w_723,h_600/format,webp 723w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

&nbsp;

演示效果如图：

&nbsp;

<p id="XXsgdnO">
  <img loading="lazy" width="800" height="452" class="alignnone size-full wp-image-3698 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cb39d74b.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cb39d74b.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cb39d74b.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cb39d74b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_170/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cb39d74b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_434/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

&nbsp;

<a href="https://github.com/JiaXinYi/ife-study/blob/master/%E5%89%8D%E7%AB%AF%E5%B0%8F%E7%9F%A5%E8%AF%86/eventflow.html" target="_blank" rel="nofollow noopener noreferrer">例子源码</a>  
<a href="http://www.cnblogs.com/souvenir/p/4988367.html" target="_blank" rel="nofollow noopener noreferrer">参考链接————小侠同学</a>

# 3.事件处理程序 {#articleHeader4}

> 前面我们已经说到了，事件处理程序就是响应某个事件的函数，简单地来说，就是函数。我们又把事件处理程序称为事件侦听器。事件处理程序是以&#8221;on&#8221;开头的，比如点击事件的处理程序是&#8221;onclick&#8221;,事件处理程序大概有以下5种。

  * 1.HTML事件处理程序
  * 2.DOM0级事件处理程序
  * 3.DOM2级事件处理程序
  * 4.IE事件处理程序
  * 5.跨浏览器的事件处理程序

## 3.1 HTML事件处理程序 {#articleHeader5}

像我们的第一个例子，就是HTML事件处理程序，它是写在html里面的，是全局作用域：

<pre class="hljs xml"><code>例子代码--点击事件触发alert函数
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"alert('hello')"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span></code></pre>

当我们需要使用一个复杂的函数时，将js代码写在这里面，显然很不合适，所以有了下面这种写法：

<pre class="hljs xml"><code>例子代码--点击事件触发doSomething()函数，这个函数写在单独的js文件或&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="xml">之中。
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"doSomething()"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>&lt;/span></code></pre>

这样会出现一个时差问题，当用户在HTML元素出现一开始就进行点击，有可能js还没有加载好，这时候就会报错。但我们可以将函数封装在try-catch块中来处理：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">onclick&lt;/span>=&lt;span class="hljs-string">"try{doSomething();}catch(err){}"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span></code></pre>

同时，一个函数的改变，同时可能会涉及html和js的修改，这样是很不方便的，综上，我们有了DOM0级事件处理程序。

## 3.2 DOM0级事件处理程序 {#articleHeader6}

之所以有DOM0级事件处理程序，和我们之前提到的IE以及Netscape对应事件传播方向不同处理而产生的事件处理程序。

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.onclick=&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

可以看到button.onclick这种形式，这里事件处理程序作为了btn对象的方法，是局部作用域。  
所以我们可以用

<pre class="hljs scala"><code>btn.onclick = &lt;span class="hljs-literal">null&lt;/span>;来删除指定的事件处理程序。</code></pre>

如果我们尝试给事件添加两个事件，如：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.onclick=&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
  btn.onclick=&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello again"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

输出，hello again，很明显，第一个事件函数被第二个事件函数给覆盖掉了，所以，DOM0级事件处理程序不能添加多个，也不能控制事件流到底是捕获还是冒泡。

## 3.3 DOM2级事件处理程序（不支持IE） {#articleHeader7}

进一步规范之后，有了DOM2级事件处理程序，其中定义了两个方法：  
addEventListener() &#8212;添加事件侦听器  
removeEventListener() &#8212;删除事件侦听器  
具体用法看  
1.<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener" target="_blank" rel="nofollow noopener noreferrer">https://developer.mozilla.org&#8230;</a>  
2.<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener" target="_blank" rel="nofollow noopener noreferrer">https://developer.mozilla.org&#8230;</a>  
函数均有3个参数，  
第一个参数是要处理的事件名(不带on前缀的才是事件名)  
第二个参数是作为事件处理程序的函数  
第三个参数是一个boolean值，默认false表示使用冒泡机制，true表示捕获机制。

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>,hello，&lt;span class="hljs-literal">false&lt;/span>);
  btn.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>,helloagain，&lt;span class="hljs-literal">false&lt;/span>);
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">hello&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">helloagain&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello again"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

这时候两个事件处理程序都能够成功触发，说明可以绑定多个事件处理程序，但是注意，如果定义了一摸一样时监听方法，是会发生覆盖的，即同样的事件和事件流机制下相同方法只会触发一次，比如：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>,hello，&lt;span class="hljs-literal">false&lt;/span>);
  btn.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>,hello，&lt;span class="hljs-literal">false&lt;/span>);
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">hello&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

removeEventListener()的方法几乎和添加时用法一摸一样：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>,hello，&lt;span class="hljs-literal">false&lt;/span>);
  btn.removeEventListener(&lt;span class="hljs-string">'click'&lt;/span>,hello，&lt;span class="hljs-literal">false&lt;/span>);
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">hello&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

这样的话，事件处理程序只会执行一次。  
但是要注意，如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。  
这时候的this指向该元素的引用。  
这里事件触发的顺序是添加的顺序。

## 3.4 IE事件处理程序 {#articleHeader8}

对于 Internet Explorer 来说，在IE 9之前，你必须使用 attachEvent 而不是使用标准方法 addEventListener。  
IE事件处理程序中有类似与DOM2级事件处理程序的两个方法：  
1.attachEvent()  
2.detachEvent()  
它们都接收两个参数：  
1.事件处理程序名称。如onclick、onmouseover，注意：这里不是事件，而是事件处理程序的名称，所以有on。  
2.事件处理程序函数。  
之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持冒泡事件流。  
removeEventListener()的方法几乎和添加时用法一摸一样：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  btn.attachEvent(&lt;span class="hljs-string">'onclick'&lt;/span>,hello);
  btn.detachEvent(&lt;span class="hljs-string">'onclick'&lt;/span>,hello);
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">hello&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

这里事件触发的顺序不是添加的顺序而是添加顺序的相反顺序。  
使用 attachEvent 方法有个缺点，this 的值会变成 window 对象的引用而不是触发事件的元素。

## 3.5 跨浏览器的事件处理程序 {#articleHeader9}

<pre class="hljs scala"><code>为了兼容&lt;span class="hljs-type">IE&lt;/span>浏览器和标准的浏览器，我们需要编写通用的方法来处理：
&lt;span class="hljs-keyword">var&lt;/span> &lt;span class="hljs-type">EventUtil&lt;/span> = {
    addHandler: function (element, &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>) &lt;/span>{
        &lt;span class="hljs-keyword">if&lt;/span> (element.addEventListener) {
            element.addEventListener(&lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>, &lt;span class="hljs-title">false&lt;/span>)&lt;/span>;
        } &lt;span class="hljs-keyword">else&lt;/span> &lt;span class="hljs-keyword">if&lt;/span> (element.attachEvent) {
            element.attachEvent(&lt;span class="hljs-string">"on"&lt;/span> + &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>)&lt;/span>;
        } &lt;span class="hljs-keyword">else&lt;/span> {
            element[&lt;span class="hljs-string">"on"&lt;/span> + &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>] &lt;/span>= handler;
        }
    },
    removeHandler: function (element, &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>) &lt;/span>{
        &lt;span class="hljs-keyword">if&lt;/span> (element.removeEventListener()) {
            element.removeEventListener(&lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>, &lt;span class="hljs-title">false&lt;/span>)&lt;/span>;
        } &lt;span class="hljs-keyword">else&lt;/span> &lt;span class="hljs-keyword">if&lt;/span> (element.detachEvent) {
            element.detachEvent(&lt;span class="hljs-string">"on"&lt;/span> + &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>, &lt;span class="hljs-title">handler&lt;/span>)&lt;/span>;
        } &lt;span class="hljs-keyword">else&lt;/span> {
            element[&lt;span class="hljs-string">"on"&lt;/span> + &lt;span class="hljs-class">&lt;span class="hljs-keyword">type&lt;/span>] &lt;/span>= &lt;span class="hljs-literal">null&lt;/span>;
        }
    }
};</code></pre>

这一部分需要创建两个方法：  
addHandler() &#8211;这个方法职责是视情况来使用DOM0级、DOM2级、IE事件处理程序来添加事件。  
removeHandler()&#8211;这个方法就是移除使用addHandler添加的事件。  
这两个方法接收相同的三个参数：  
1.要操作的元素&#8211;通过dom方法获取  
2.事件名称&#8211;注意：没有on，如&#8221;click&#8221;、&#8221;mouseover&#8221;  
3.事件处理程序函数&#8211;对应的函数

使用：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
  EventUtil.addHandler(btn,&lt;span class="hljs-string">'click'&lt;/span>,hello);
  EventUtil.removeHandler(btn,&lt;span class="hljs-string">'click'&lt;/span>,hello);
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">hello&lt;/span>()&lt;/span>{
    alert(&lt;span class="hljs-string">"hello"&lt;/span>);
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

# 4.事件对象 {#articleHeader10}

> 事件对象是用来记录一些事件发生时的相关信息的对象，但事件对象只有事件发生时才会产生，并且只能是事件处理函数内部访问，在所有事件处理函数运行结束后，事件对象就被销毁！

属性和方法如图，详细请查看以下链接：  
1.HTML DOM Event 对象：<a href="http://www.w3school.com.cn/jsref/dom_obj_event.asp" target="_blank" rel="nofollow noopener noreferrer">http://www.w3school.com.cn/js&#8230;</a>  
2.详细介绍请查看：<a href="http://www.jb51.net/article/99099.htm" target="_blank" rel="nofollow noopener noreferrer">http://www.jb51.net/article/9&#8230;</a>

<p id="weMziXw">
  <img loading="lazy" width="800" height="579" class="alignnone size-full wp-image-3699 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789ccbca780.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789ccbca780.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789ccbca780.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789ccbca780.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_217/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789ccbca780.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_556/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

&nbsp;

## 4.1 属性 {#articleHeader11}

下面是一个例子：

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btn"&lt;/span>&gt;&lt;/span>点击&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
 
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
        &lt;span class="hljs-keyword">var&lt;/span> btn=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn"&lt;/span>);
        btn.ddEventListener(&lt;span class="hljs-string">'click'&lt;/span>, doCurrent, &lt;span class="hljs-literal">true&lt;/span>);
        &lt;span class="hljs-comment">// 判断事件的属性&lt;/span>
        &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">doCurrent&lt;/span>(&lt;span class="hljs-params">event&lt;/span>) &lt;/span>{
            &lt;span class="hljs-comment">//获取当前事件触发的div&lt;/span>
            &lt;span class="hljs-keyword">var&lt;/span> target = event.currentTarget;

            &lt;span class="hljs-comment">//通过判断事件的event.eventPhase属性返回事件传播的当前阶段&lt;/span>
            &lt;span class="hljs-comment">//1：捕获阶段、2：正常事件派发和3：起泡阶段。&lt;/span>
            &lt;span class="hljs-comment">//得到当前阶段和id值并输出&lt;/span>
            &lt;span class="hljs-keyword">var&lt;/span> msg = (event.eventPhase == &lt;span class="hljs-number">1&lt;/span> ? &lt;span class="hljs-string">'捕获阶段：'&lt;/span> : &lt;span class="hljs-string">'冒泡阶段：'&lt;/span>)+ target.attributes[&lt;span class="hljs-string">"id"&lt;/span>].value;;
            &lt;span class="hljs-built_in">console&lt;/span>.log(msg);
        }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

在这个例子里，我们用到了**currentTarget**、**eventPhase **属性。

## 4.2 方法 {#articleHeader12}

Event对象主要有以下两个方法，用于处理事件的传播（冒泡、捕获）和事件的取消。  
**stopPropagation()**——冒泡机制下，阻止事件的进一步往上冒泡

<pre class="hljs javascript"><code>    &lt;span class="hljs-keyword">var&lt;/span> btn1=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"btn1"&lt;/span>);
    &lt;span class="hljs-keyword">var&lt;/span> content=&lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">"content"&lt;/span>);
    btn1.addEventListener(&lt;span class="hljs-string">"click"&lt;/span>,&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">event&lt;/span>)&lt;/span>{
        alert(&lt;span class="hljs-string">"btn1"&lt;/span>);
        event.stopPropagation();
    },&lt;span class="hljs-literal">false&lt;/span>);
    content.addEventListener(&lt;span class="hljs-string">"click"&lt;/span>,&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        alert(&lt;span class="hljs-string">"content"&lt;/span>);
    },&lt;span class="hljs-literal">false&lt;/span>);
    &lt;span class="hljs-comment">//这里会输出btn1，阻止了向content的冒泡&lt;/span></code></pre>

**preventDefault()**——用于取消事件的默认操作,比如链接的跳转或者表单的提交，主要是用来阻止标签的默认行为

<pre class="hljs actionscript"><code>&lt;a id=&lt;span class="hljs-string">"go"&lt;/span> href=&lt;span class="hljs-string">"https://www.baidu.com/"&lt;/span>&gt;禁止跳转&lt;/a&gt;
&lt;span class="hljs-keyword">var&lt;/span> go = document.getElementById(&lt;span class="hljs-string">'go'&lt;/span>);
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">goFn&lt;/span>&lt;span class="hljs-params">(event)&lt;/span> &lt;/span>{
 event.preventDefault();
&lt;span class="hljs-comment">// 不会跳转&lt;/span>
}
go.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>, goFn, &lt;span class="hljs-literal">false&lt;/span>);</code></pre>

## 4.3 兼容性 {#articleHeader13}

当然，事件对象也存在一定的兼容性问题，在IE8及以前本版之中，通过设置属性注册事件处理程序时，调用的时候并未传递事件对象，需要通过全局对象window.event来获取。解决方法如下：

<pre class="hljs cs"><code>&lt;span class="hljs-function">function &lt;span class="hljs-title">getEvent&lt;/span>(&lt;span class="hljs-params">&lt;span class="hljs-keyword">event&lt;/span>&lt;/span>)&lt;/span> {
 &lt;span class="hljs-keyword">event&lt;/span> = &lt;span class="hljs-keyword">event&lt;/span> || window.&lt;span class="hljs-keyword">event&lt;/span>;
}</code></pre>

在IE浏览器上面是event事件是没有preventDefault()这个属性的，所以在IE上，我们需要设置的属性是returnValue

<pre class="hljs typescript"><code>&lt;span class="hljs-built_in">window&lt;/span>.event.returnValue=&lt;span class="hljs-literal">false&lt;/span></code></pre>

stopPropagation()也是，所以需要设置cancelBubble，cancelBubble是IE事件对象的一个属性，设置这个属性为true能阻止事件进一步传播。

<pre class="hljs cs"><code>&lt;span class="hljs-keyword">event&lt;/span>.cancelBubble=&lt;span class="hljs-literal">true&lt;/span></code></pre>

# 5.事件委托 {#articleHeader14}

> 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

例子说明，我们为ul添加新的li，其中对li标签元素绑定了click事件，但是发现，后增加的元素没有办法触发我们的click事件。

<pre class="hljs xml"><code>    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnAdd"&lt;/span>&gt;&lt;/span>添加&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">ul&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"ulList"&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>1&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>2&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>3&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">ul&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
        &lt;span class="hljs-keyword">var&lt;/span> btnAdd = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'btnAdd'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> ulList = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'ulList'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> list = &lt;span class="hljs-built_in">document&lt;/span>.getElementsByTagName(&lt;span class="hljs-string">'li'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> num = &lt;span class="hljs-number">3&lt;/span>;
        btnAdd.onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
            num++;
            &lt;span class="hljs-keyword">var&lt;/span> li = &lt;span class="hljs-built_in">document&lt;/span>.createElement(&lt;span class="hljs-string">'li'&lt;/span>);
            li.innerHTML = num;
            ulList.appendChild(li)
        }
        &lt;span class="hljs-keyword">for&lt;/span> (i = &lt;span class="hljs-number">0&lt;/span>; i &lt; list.length; i++) {
            list[i].onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
                alert(&lt;span class="hljs-keyword">this&lt;/span>.innerHTML);
            }
        }
    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

&nbsp;

<p id="IjkzKiB">
  <img loading="lazy" width="800" height="497" class="alignnone size-full wp-image-3700 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cdc0ae3a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cdc0ae3a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cdc0ae3a.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cdc0ae3a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_186/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c789cdc0ae3a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_477/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

&nbsp;

这是因为如果事件涉及到更新HTML节点或者添加HTML节点时，新添加的节点无法绑定事件，更新的节点也是无法绑定事件，表现的行为是无法触发事件。  
其中一种解决方法是，添加子节点的时候，再次为其添加监听事件

<pre class="hljs xml"><code>    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnAdd"&lt;/span>&gt;&lt;/span>添加&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">ul&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"ulList"&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>1&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>2&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>3&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">ul&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
        &lt;span class="hljs-keyword">var&lt;/span> btnAdd = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'btnAdd'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> ulList = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'ulList'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> list = &lt;span class="hljs-built_in">document&lt;/span>.getElementsByTagName(&lt;span class="hljs-string">'li'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> num = &lt;span class="hljs-number">3&lt;/span>;

        &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">doclick&lt;/span>() &lt;/span>{
            &lt;span class="hljs-keyword">for&lt;/span> (i = &lt;span class="hljs-number">0&lt;/span>; i &lt; list.length; i++) {
                list[i].onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
                    alert(&lt;span class="hljs-keyword">this&lt;/span>.innerHTML);
                }
            }
        }
        doclick();


        btnAdd.onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
            num++;
            &lt;span class="hljs-keyword">var&lt;/span> li = &lt;span class="hljs-built_in">document&lt;/span>.createElement(&lt;span class="hljs-string">'li'&lt;/span>);
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

这也是问题所在：  
1.首先我们多次操作DOM获取元素，这样势必会降低浏览器处理性能  
2.事件不具有继承性，如果我们动态在页面中添加了一个元素，那么还需要重新走一遍上述程序为其添加监听事件

那么有没有更好的方法呢？根据事件的冒泡原理，我们还可以实现另外一个很重要的功能：**事件委托**。

我们只监听最外层的元素，然后在事件函数中根据事件来源进行不同的事件处理。这样，我们添加事件监听时只需要操作一个元素，极大的降低了DOM访问，并且不用再给新增的元素添加监听事件了，因为元素的事件会冒泡到最外层，被我们截获。

<pre class="hljs xml"><code>    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"btnAdd"&lt;/span>&gt;&lt;/span>添加&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">ul&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"ulList"&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>1&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>2&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>3&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">ul&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
        &lt;span class="hljs-keyword">var&lt;/span> btnAdd = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'btnAdd'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> ulList = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'ulList'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> num = &lt;span class="hljs-number">3&lt;/span>;

        ulList.onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">event&lt;/span>)&lt;/span>{
            &lt;span class="hljs-keyword">var&lt;/span> event = event || &lt;span class="hljs-built_in">window&lt;/span>.event;
            &lt;span class="hljs-keyword">var&lt;/span> target = event.target || event.srcElement;
            &lt;span class="hljs-keyword">if&lt;/span>(target.nodeName.toLowerCase() == &lt;span class="hljs-string">'li'&lt;/span>){
                alert(target.innerHTML);
            }
        }

        btnAdd.onclick = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
            num++;
            &lt;span class="hljs-keyword">var&lt;/span> li = &lt;span class="hljs-built_in">document&lt;/span>.createElement(&lt;span class="hljs-string">'li'&lt;/span>);
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，当然，这里当点击ul的时候，也是会触发的，所以要判断点击的对象到底是不是li标签元素。

Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较（习惯问题）。

这样，我们就实现了我们的事件委托，当然，不是所有的事件都是可以委托的。  
适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。

当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，新增加的节点也可以触发事件效果。

# 参考：

1.<a href="http://www.cnblogs.com/souvenir/p/4988367.html" target="_blank" rel="nofollow noopener noreferrer">http://www.cnblogs.com/souven&#8230;</a>  
2.<a href="https://www.cnblogs.com/st-leslie/p/5907556.html" target="_blank" rel="nofollow noopener noreferrer">https://www.cnblogs.com/st-le&#8230;</a>  
3.[https://segmentfault.com/a/11&#8230;][1]  
4.<a href="http://www.jb51.net/article/99317.htm" target="_blank" rel="nofollow noopener noreferrer">http://www.jb51.net/article/9&#8230;</a>  
5.<a href="http://www.w3school.com.cn/jsref/dom_obj_event.asp" target="_blank" rel="nofollow noopener noreferrer">http://www.w3school.com.cn/js&#8230;</a>  
6.<a href="http://www.jb51.net/article/83052.htm" target="_blank" rel="nofollow noopener noreferrer">http://www.jb51.net/article/8&#8230;</a>  
7.<a href="http://www.jb51.net/article/99094.htm" target="_blank" rel="nofollow noopener noreferrer">http://www.jb51.net/article/9&#8230;</a>

 [1]: https://segmentfault.com/a/1190000003497939