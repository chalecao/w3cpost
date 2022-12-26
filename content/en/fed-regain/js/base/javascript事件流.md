---
title: JavaScript事件流
weight: 5
---
## DOM级别与DOM事件

> 首先在介绍DOM事件之前[我们](https://www.w3cdoc.com)先来认识下DOM的不同级别。针对不同级别的DOM，[我们](https://www.w3cdoc.com)的DOM事件处理方式也是不一样的。  
> DOM级别一共可以分为4个级别：DOM0级，DOM1级，DOM2级和DOM3级，  
> 而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。

如下图所示：

![](/images/posts/2022-12-21-20-32-43.png)

其中1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。

## 事件

**事件**指可以被 JavaScript 侦测到的行为。即鼠标点击、页面或图像载入、鼠标悬浮于页面的某个热点之上、在表单中选取输入框、确认表单、键盘按键等操作。事件通常与函数配合使用，当事件发生时函数才会执行。  

**事件名称**：click/mouseover/blur(&#8220;不带on&#8221;)响应某个事件的函数就是**事件处理程序**(事件侦听器)。  

**事件处理程序函数名称**：onclick/onmouseove/onblur

例子代码--点击事件触发alert函数

```
<button onclick="alert('hello')"></button>
```

更多事件类别请参考w3c中关于事件的详细类别。  
<a href="http://www.w3school.com.cn/js/js_events.asp" target="_blank" rel="nofollow noopener noreferrer">JavaScript 事件</a>  
<a href="http://www.w3school.com.cn/jsref/jsref_events.asp" target="_blank" rel="nofollow noopener noreferrer">JavaScript 事件参考手册</a>

## 事件流

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

![](/images/posts/2022-12-21-20-35-24.png)

[我们](https://www.w3cdoc.com)写一个例子：如下图，中间白色区域的盒子分别为box1,box2&#8230;box6,包含控制按钮设置[我们](https://www.w3cdoc.com)的事件

```
<div>
    <h4 id="currentBox">点击按钮设置类型后再点击中心</h4>
    <button class="btn" id="btnCapture" onclick="setCapture()">设置捕获</button>
    <button class="btn" id="btnBubble" onclick="setBubble()">设置冒泡</button>
    <button class="btn" id="btnAll" onclick="setAll()">设置捕获和冒泡</button>
    <button class="btn" onclick="clearAll()">动画完成后再清除设置</button>
</div>
<div class="box" id="box1">
    <div class="box" id="box2">
        <div class="box" id="box3">
            <div class="box" id="box4">
                <div class="box" id="box5">
                    <div class="box" id="box6">
                        点击
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```
大概流程图如下：

![](/images/posts/2022-12-21-20-36-20.png)

演示效果如图：

![](/images/posts/2022-12-21-20-36-31.png)

<a href="https://github.com/JiaXinYi/ife-study/blob/master/%E5%89%8D%E7%AB%AF%E5%B0%8F%E7%9F%A5%E8%AF%86/eventflow.html" target="_blank" rel="nofollow noopener noreferrer">例子源码</a>  
<a href="http://www.cnblogs.com/souvenir/p/4988367.html" target="_blank" rel="nofollow noopener noreferrer">参考链接————小侠同学</a>

## 事件处理程序

> 前面[我们](https://www.w3cdoc.com)已经说到了，事件处理程序就是响应某个事件的函数，简单地来说，就是函数。[我们](https://www.w3cdoc.com)又把事件处理程序称为事件侦听器。事件处理程序是以&#8221;on&#8221;开头的，比如点击事件的处理程序是&#8221;onclick&#8221;,事件处理程序大概有以下5种。

* 1.HTML事件处理程序
* 2.DOM0级事件处理程序
* 3.DOM2级事件处理程序
* 4.IE事件处理程序
* 5.跨[浏览器](https://www.w3cdoc.com)的事件处理程序

### HTML事件处理程序

像[我们](https://www.w3cdoc.com)的第一个例子，就是HTML事件处理程序，它是写在html里面的，是全局作用域：

例子代码--点击事件触发alert函数
```
<button onclick="alert('hello')"></button>
```

当[我们](https://www.w3cdoc.com)需要使用一个复杂的函数时，将js代码写在这里面，显然很不合适，所以有了下面这种写法：

```
例子代码--点击事件触发doSomething()函数，这个函数写在单独的js文件或<script>之中。
<button onclick="doSomething()"></button>
```

这样会出现一个时差问题，当用户在HTML元素出现一开始就进行点击，有可能js还没有加载好，这时候就会报错。但[我们](https://www.w3cdoc.com)可以将函数封装在try-catch块中来处理：

```
<button onclick="try{doSomething();}catch(err){}"></button>
```

同时，一个函数的改变，同时可能会涉及html和js的修改，这样是很不方便的，综上，[我们](https://www.w3cdoc.com)有了DOM0级事件处理程序。

## DOM0级事件处理程序

之所以有DOM0级事件处理程序，和[我们](https://www.w3cdoc.com)之前提到的IE以及Netscape对应事件传播方向不同处理而产生的事件处理程序。

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.onclick=function(){
    alert("hello");
  }
</script>
```

可以看到button.onclick这种形式，这里事件处理程序作为了btn对象的方法，是局部作用域。  
所以[我们](https://www.w3cdoc.com)可以用

```
btn.onclick = null;来删除指定的事件处理程序。
```

如果[我们](https://www.w3cdoc.com)尝试给事件添加两个事件，如：

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.onclick=function(){
    alert("hello");
  }
  btn.onclick=function(){
    alert("hello again");
  }
</script>
```

输出，hello again，很明显，第一个事件函数被第二个事件函数给覆盖掉了，所以，DOM0级事件处理程序不能添加多个，也不能控制事件流到底是捕获还是冒泡。

## DOM2级事件处理程序（不支持IE）

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

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.addEventListener('click',hello，false);
  btn.addEventListener('click',helloagain，false);
  function hello(){
    alert("hello");
  }
  function helloagain(){
    alert("hello again");
  }
</script>
```

这时候两个事件处理程序都能够成功触发，说明可以绑定多个事件处理程序，但是注意，如果定义了一摸一样时监听方法，是会发生覆盖的，即同样的事件和事件流机制下相同方法只会触发一次，比如：

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.addEventListener('click',hello，false);
  btn.addEventListener('click',hello，false);
  function hello(){
    alert("hello");
  }
</script>
```

removeEventListener()的方法几乎和添加时用法一摸一样：

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.addEventListener('click',hello，false);
  btn.removeEventListener('click',hello，false);
  function hello(){
    alert("hello");
  }
</script>
```

这样的话，事件处理程序只会执行一次。  
但是要注意，如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。  
这时候的this指向该元素的引用。  
这里事件触发的顺序是添加的顺序。

### IE事件处理程序

对于 Internet Explorer 来说，在IE 9之前，你必须使用 attachEvent 而不是使用标准方法 addEventListener。  
IE事件处理程序中有类似与DOM2级事件处理程序的两个方法：  
1.attachEvent()  
2.detachEvent()  
它们都接收两个参数：  
1.事件处理程序名称。如onclick、onmouseover，注意：这里不是事件，而是事件处理程序的名称，所以有on。  
2.事件处理程序函数。  
之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持冒泡事件流。  
removeEventListener()的方法几乎和添加时用法一摸一样：

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  btn.attachEvent('onclick',hello);
  btn.detachEvent('onclick',hello);
  function hello(){
    alert("hello");
  }
</script>
```

这里事件触发的顺序不是添加的顺序而是添加顺序的相反顺序。  
使用 attachEvent 方法有个缺点，this 的值会变成 window 对象的引用而不是触发事件的元素。

## 跨[浏览器](https://www.w3cdoc.com)的事件处理程序

```
为了兼容IE[浏览器](https://www.w3cdoc.com)和标准的[浏览器](https://www.w3cdoc.com)，[我们](https://www.w3cdoc.com)需要编写通用的方法来处理：
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener()) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};
```

这一部分需要创建两个方法：  
addHandler() -这个方法职责是视情况来使用DOM0级、DOM2级、IE事件处理程序来添加事件。  
removeHandler()-这个方法就是移除使用addHandler添加的事件。  
这两个方法接收相同的三个参数：  
1.要操作的元素-通过dom方法获取  
2.事件名称-注意：没有on，如&#8221;click&#8221;、&#8221;mouseover&#8221;  
3.事件处理程序函数-对应的函数

使用：

```
<button id="btn">点击</button>

<script>
  var btn=document.getElementById("btn");
  EventUtil.addHandler(btn,'click',hello);
  EventUtil.removeHandler(btn,'click',hello);
  function hello(){
    alert("hello");
  }
</script>
```

## 事件对象

> 事件对象是用来记录一些事件发生时的相关信息的对象，但事件对象只有事件发生时才会产生，并且只能是事件处理函数内部访问，在所有事件处理函数运行结束后，事件对象就被销毁！

属性和方法如图，详细请查看以下链接：  
1.HTML DOM Event 对象：<a href="http://www.w3school.com.cn/jsref/dom_obj_event.asp" target="_blank" rel="nofollow noopener noreferrer">http://www.w3school.com.cn/js&#8230;</a>  
2.详细介绍请查看：<a href="http://www.jb51.net/article/99099.htm" target="_blank" rel="nofollow noopener noreferrer">http://www.jb51.net/article/9&#8230;</a>

![](/images/posts/2022-12-21-20-39-51.png)

### 属性

下面是一个例子：

```
<button id="btn">点击</button>

<script>
        var btn=document.getElementById("btn");
        btn.ddEventListener('click', doCurrent, true);
        // 判断事件的属性
        function doCurrent(event) {
            //获取当前事件触发的div
            var target = event.currentTarget;

            //通过判断事件的event.eventPhase属性返回事件传播的当前阶段
            //1：捕获阶段、2：正常事件派发和3：起泡阶段。
            //得到当前阶段和id值并输出
            var msg = (event.eventPhase == 1 ? '捕获阶段：' : '冒泡阶段：')+ target.attributes["id"].value;;
            console.log(msg);
        }
</script>
```

在这个例子里，[我们](https://www.w3cdoc.com)用到了**currentTarget**、**eventPhase**属性。

### 方法

Event对象主要有以下两个方法，用于处理事件的传播（冒泡、捕获）和事件的取消。  
**stopPropagation()**——冒泡机制下，阻止事件的进一步往上冒泡

```
    var btn1=document.getElementById("btn1");
    var content=document.getElementById("content");
    btn1.addEventListener("click",function(event){
        alert("btn1");
        event.stopPropagation();
    },false);
    content.addEventListener("click",function(){
        alert("content");
    },false);
    //这里会输出btn1，阻止了向content的冒泡
```

**preventDefault()**——用于取消事件的默认操作,比如链接的跳转或者表单的提交，主要是用来阻止标签的默认行为

```
<a id="go" href="https://www.baidu.com/">禁止跳转</a>
var go = document.getElementById('go');
function goFn(event) {
 event.preventDefault();
// 不会跳转
}
go.addEventListener('click', goFn, false);
```

### 兼容性

当然，事件对象也存在一定的兼容性问题，在IE8及以前本版之中，通过设置属性注册事件处理程序时，调用的时候并未传递事件对象，需要通过全局对象window.event来获取。解决方法如下：

```
function getEvent(event) {
 event = event || window.event;
}
```

在IE[浏览器](https://www.w3cdoc.com)上面是event事件是没有preventDefault()这个属性的，所以在IE上，[我们](https://www.w3cdoc.com)需要设置的属性是returnValue

```
window.event.returnValue=false
```

stopPropagation()也是，所以需要设置cancelBubble，cancelBubble是IE事件对象的一个属性，设置这个属性为true能阻止事件进一步传播。

```
event.cancelBubble=true
```

## 事件委托

> 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

例子说明，[我们](https://www.w3cdoc.com)为ul添加新的li，其中对li标签元素绑定了click事件，但是发现，后增加的元素没有办法触发[我们](https://www.w3cdoc.com)的click事件。

```
<button id="btnAdd">添加</button>
<ul id="ulList">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<script>
    var btnAdd = document.getElementById('btnAdd');
    var ulList = document.getElementById('ulList');
    var list = document.getElementsByTagName('li');
    var num = 3;
    btnAdd.onclick = function () {
        num++;
        var li = document.createElement('li');
        li.innerHTML = num;
        ulList.appendChild(li)
    }
    for (i = 0; i < list.length; i++) {
        list[i].onclick = function(){
            alert(this.innerHTML);
        }
    }
</script>
```
![](/images/posts/2022-12-21-20-41-09.png)

这是因为如果事件涉及到更新HTML节点或者添加HTML节点时，新添加的节点无法绑定事件，更新的节点也是无法绑定事件，表现的行为是无法触发事件。  
其中一种解决方法是，添加子节点的时候，再次为其添加监听事件

```
<button id="btnAdd">添加</button>
<ul id="ulList">
<li>1</li>
<li>2</li>
<li>3</li>
</ul>
<script>
var btnAdd = document.getElementById('btnAdd');
var ulList = document.getElementById('ulList');
var list = document.getElementsByTagName('li');
var num = 3;

function doclick() {
    for (i = 0; i < list.length; i++) {
        list[i].onclick = function () {
            alert(this.innerHTML);
        }
    }
}
doclick();

btnAdd.onclick = function () {
    num++;
    var li = document.createElement('li');
    li.innerHTML = num;
    ulList.appendChild(li);
    doclick();
}
</script>
```

这也是问题所在：  
1.首先[我们](https://www.w3cdoc.com)多次操作DOM获取元素，这样势必会降低[浏览器](https://www.w3cdoc.com)处理性能  
2.事件不具有继承性，如果[我们](https://www.w3cdoc.com)动态在页面中添加了一个元素，那么还需要重新走一遍上述程序为其添加监听事件

那么有没有更好的方法呢？根据事件的冒泡原理，[我们](https://www.w3cdoc.com)还可以实现另外一个很重要的功能：**事件委托**。

[我们](https://www.w3cdoc.com)只监听最外层的元素，然后在事件函数中根据事件来源进行不同的事件处理。这样，[我们](https://www.w3cdoc.com)添加事件监听时只需要操作一个元素，极大的降低了DOM访问，并且不用再给新增的元素添加监听事件了，因为元素的事件会冒泡到最外层，被[我们](https://www.w3cdoc.com)截获。

```
<button id="btnAdd">添加</button>
<ul id="ulList">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
<script>
    var btnAdd = document.getElementById('btnAdd');
    var ulList = document.getElementById('ulList');
    var num = 3;

    ulList.onclick = function(event){
        var event = event || window.event;
        var target = event.target || event.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            alert(target.innerHTML);
        }
    }

    btnAdd.onclick = function () {
        num++;
        var li = document.createElement('li');
        li.innerHTML = num;
        ulList.appendChild(li);
        doclick();
    }
</script>
```

这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，当然，这里当点击ul的时候，也是会触发的，所以要判断点击的对象到底是不是li标签元素。

Event对象提供了一个属性叫target，可以返回事件的目标节点，[我们](https://www.w3cdoc.com)成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准[浏览器](https://www.w3cdoc.com)用ev.target，IE[浏览器](https://www.w3cdoc.com)用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里[我们](https://www.w3cdoc.com)用nodeName来获取具体是什么标签名，这个返回的是一个大写的，[我们](https://www.w3cdoc.com)需要转成小写再做比较（习惯问题）。

这样，[我们](https://www.w3cdoc.com)就实现了[我们](https://www.w3cdoc.com)的事件委托，当然，不是所有的事件都是可以委托的。  
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
