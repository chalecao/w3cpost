---
title: var、let、const及其作用域


date: 2019-05-09T01:38:33+00:00
url: /javascriptnodejs/4350.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093424918-1010493713.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093424918-1010493713.png
views:
  - 870
like:
  - 2


---
<table dir="ltr" border="0">
  <tr>
    <td>
      <h1>
        <strong>一、var命令</strong>
      </h1>
    </td>
  </tr>
</table>

在ECMAScript6（以下简称ES6）之前，ECMAScript的作用域只有两种：

_1、 _ 全局作用域；

_2、 _ 函数作用域。

正是因为有这两种作用域，所以在JavaScript中出现一术语&#8211;“变量提升（hoisting）”。

_如下：_

<div class="cnblogs_code">
  <pre>function func(){
    console.log(test);
    var test = 1;
};
func();</pre>
</div>

_在node环境执行上述代码，结果为：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093424918-1010493713.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093424918-1010493713.png?x-oss-process=image/format,webp" alt="" /> 

之所以为’undefined’，原因就在于‘变量提升’，在进入func函数时，将所有通过var声明的变量置前并赋予undefined的值。

**但，**ES6的到来，为我们提供了‘块级作用域’。且‘块级作用域’并不影响var声明的变量。

What?‘块级作用域’又不影响var声明的变量？！！

是的，var声明的变量的性质和原来一样，还是具有‘变量提升’的特性。而‘块级作用域’通过新增命令let和const来体现。

下面，我们透过新增的let和const命令，协同感受下ES6的块级作用域。

**注：**由于let和const属于ES6，所以都必须使用严格模式，否则会报错。

_如下：_

<div class="cnblogs_code">
  <pre>let test;</pre>
</div>

_在node环境下，执行代码：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093642808-1831562181.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093642808-1831562181.png?x-oss-process=image/format,webp" alt="" /> 

<table dir="ltr" border="0">
  <tr>
    <td>
      <h1>
        <strong>二、let命令</strong>
      </h1>
    </td>
  </tr>
</table>

什么是let呢？

let和var差不多，都是用来声明变量的。区别就在于：

_　1、_  let声明的变量只在所处于的块级有效；

_2、_  let没有‘变量提升’的特性，而是‘暂时性死区（temporal dead zone）’特性。

下面将一一讲解。

**1****、let****声明的变量只在块级有效。**

_如下：_

<div class="cnblogs_code">
  <div class="cnblogs_code_toolbar">
    <span class="cnblogs_code_copy"><a title="复制代码"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/copycode.gif?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/copycode.gif?x-oss-process=image/format,webp" alt="复制代码" /></a></span>
  </div>
  
  <pre>'use strict';
function func(args){
    if(true){
        //let声明i
        let i = 6;
        //在if内打印i值
        console.log('inside: ' + i);
    }
    //在if外，再次打印i值
    console.log('outside: ' + i);
};
func();</pre>
</div>

_在node环境中执行上述代码，结果如下：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093903199-619142117.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609093903199-619142117.png?x-oss-process=image/format,webp" alt="" /> 

通过demo，我们可以清楚的看见，在第二次（if外）打印i值时，是报错的。

这因为let声明的变量i是属于if内的块级作用域；而不是像var一样。

**2****、let****没有‘变量提升’的特性，而却有‘暂时性死区（temporal dead zone****）’的特性。**

_如下：_

<div class="cnblogs_code">
  <pre>'use strict';
function func(){
    //在let声明前，打印i
    console.log(i);
    let i;
};
func();</pre>
</div>

_在node环境下执行上述代码，结果如下：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094055105-350268922.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094055105-350268922.png?x-oss-process=image/format,webp" alt="" /> 

在let声明变量前，使用该变量，它是会报错的，而不是像var那样会‘变量提升’。

其实说let没有‘变量提升’的特性，不太对。或者说它提升了，但是ES6规定了在let声明变量前不能使用该变量。

_如下：_

<div class="cnblogs_code">
  <pre>'use strict';
var test = 1;
function func(){
    //打印test的值
    console.log(test);
    let test = 2;
};
func();</pre>
</div>

_在node环境下执行上述代码，结果如下：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094235886-680485743.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094235886-680485743.png?x-oss-process=image/format,webp" alt="" /> 

如果let声明的变量没有变量提升，应该打印’1’（func函数外的test）；而他却报错，说明它是提升了的，只是规定了不能在其声明之前使用而已。我们称这特性叫“暂时性死区（temporal dead zone）”。且这一特性，仅对遵循‘块级作用域’的命令有效（let、const）。

关于let，最后再通过一个经典案例，体验下。

_如下：_

<div class="cnblogs_code">
  <pre>var arr = [];
for(var i = 0; i &lt; 2; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1]();</pre>
</div>

arr\[1\]()会输出2，原因是var声明的变量会变量提升，且当执行arr[1]函数时，i取自于父函数的i，而此时i已经变为2了，所以就会打印2咯。

以前的常用做法是，利用闭包特性。如下：

<div class="cnblogs_code">
  <pre>var arr = [];
for(var i = 0; i &lt; 2; i++){
    arr[i] = (function(i){
        return function(){
            console.log(i);
        };
    }(i));
};
arr[1]();</pre>
</div>

又或者属性方式：

<div class="cnblogs_code">
  <pre>var arr = [];
for(var i = 0; i &lt; 2; i++){
    (arr[i] = function self(){
        console.log(self.x);
    }).x = i;
};
arr[1]();</pre>
</div>

现在有了let，它声明的变量作用域为块级，所以，我们也可以利用let来达到同样的效果。

_如下：_

<div class="cnblogs_code">
  <pre>'use strict';
var arr = [];
for(let i = 0; i &lt; 2; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1]();</pre>
</div>

在node环境下，执行上述代码结果如下：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094612965-1826541894.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094612965-1826541894.png?x-oss-process=image/format,webp" alt="" /> 

<table dir="ltr" border="0">
  <tr>
    <td>
      <h1>
        三、const命令
      </h1>
    </td>
  </tr>
</table>

const命令与let命令一样，声明的变量，其作用域都是块级。

所以const遵循的规则与let相差无二，只是，const是用来声明恒定变量的。

且，用const声明恒定变量，声明的同时就必须赋值，否则会报错。

_如下：_

<div class="cnblogs_code">
  <pre>'use strict';
function func(){
    const PI;
    PI = 3.14;
    console.log(PI);
};
func();</pre>
</div>

_在node环境下，执行上述代码结果如下：_

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094819621-537547322.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/887360-20160609094819621-537547322.png?x-oss-process=image/format,webp" alt="" /> 

正确的方式为，声明就得赋值。

如：

<div class="cnblogs_code">
  <pre>const PI = 3.14</pre>
</div>

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

 [1]: https://www.f2e123.com/fed-regain