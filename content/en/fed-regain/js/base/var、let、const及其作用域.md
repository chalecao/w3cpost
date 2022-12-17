---
title: var、let、const及其作用域
weight: 1

---
## var命令

在ECMAScript6（以下简称ES6）之前，ECMAScript的作用域只有两种：
- 1、全局作用域；
- 2、函数作用域。

正是因为有这两种作用域，所以在JavaScript中出现一术语-“变量提升（hoisting）”。 如下：

```
function func(){
    console.log(test);
    var test = 1;
};
func();
```
在node环境执行上述代码，结果为：
```
> node 1.js
undefined
```
之所以为’undefined’，原因就在于‘变量提升’，在进入func函数时，将所有通过var声明的变量置前并赋予undefined的值。

但，ES6的到来，为[我们](https://www.w3cdoc.com)提供了‘块级作用域’。且‘块级作用域’并不影响var声明的变量。

What?‘块级作用域’又不影响var声明的变量？！！

是的，var声明的变量的性质和原来一样，还是具有‘变量提升’的特性。而‘块级作用域’通过新增命令let和const来体现。

下面，[我们](https://www.w3cdoc.com)透过新增的let和const命令，协同感受下ES6的块级作用域。

注：由于let和const属于ES6，所以都必须使用严格模式，否则会报错。如下：

```
let test;
```
在node环境下，执行代码：
```
Uncaught SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outs strict mode
```

## let命令

什么是let呢？

let和var差不多，都是用来声明变量的。区别就在于：

_1、_  let声明的变量只在所处于的块级有效；

_2、_  let没有‘变量提升’的特性，而是‘暂时性死区（temporal dead zone）’特性。

下面将一一讲解。

let声明的变量只在块级有效。_如下：_

```
'use strict';
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
func();
```

_在node环境中执行上述代码，结果如下：_
```
inside 6
reference error: i is not defined
```
通过demo，[我们](https://www.w3cdoc.com)可以清楚的看见，在第二次（if外）打印i值时，是报错的。

这因为let声明的变量i是属于if内的块级作用域；而不是像var一样。

let没有‘变量提升’的特性，而却有‘暂时性死区（temporal dead zone）’的特性。如下：

```
'use strict';
function func(){
    //在let声明前，打印i
    console.log(i);
    let i;
};
func();
```
在node环境下执行上述代码，结果如下：
```
reference error: i is not defined
```
在let声明变量前，使用该变量，它是会报错的，而不是像var那样会‘变量提升’。

其实说let没有‘变量提升’的特性，不太对。或者说它提升了，但是ES6规定了在let声明变量前不能使用该变量。

_如下：_

```
'use strict';
var test = 1;
function func(){
    //打印test的值
    console.log(test);
    let test = 2;
};
func();
```

_在node环境下执行上述代码，结果如下：_

```
reference error: test is not defined
```
如果let声明的变量没有变量提升，应该打印’1’（func函数外的test）；而他却报错，说明它是提升了的，只是规定了不能在其声明之前使用而已。[我们](https://www.w3cdoc.com)称这特性叫“暂时性死区（temporal dead zone）”。且这一特性，仅对遵循‘块级作用域’的命令有效（let、const）。

关于let，最后再通过一个经典案例，体验下。

_如下：_


  ```
var arr = [];
for(var i = 0; i < 2; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1]();
```


arr\[1\]()会输出2，原因是var声明的变量会变量提升，且当执行arr[1]函数时，i取自于父函数的i，而此时i已经变为2了，所以就会打印2咯。

以前的常用做法是，利用闭包特性。如下：


  ```
var arr = [];
for(var i = 0; i < 2; i++){
    arr[i] = (function(i){
        return function(){
            console.log(i);
        };
    }(i));
};
arr[1]();
```
又或者属性方式：

```
var arr = [];
for(var i = 0; i < 2; i++){
    (arr[i] = function self(){
        console.log(self.x);
    }).x = i;
};
arr[1]();
```

现在有了let，它声明的变量作用域为块级，所以，[我们](https://www.w3cdoc.com)也可以利用let来达到同样的效果。

_如下：_


```
'use strict';
var arr = [];
for(let i = 0; i < 2; i++){
    arr[i] = function(){
        console.log(i);
    };
};
arr[1]();
```
在node环境下，执行上述代码结果如下：
```
1
```
## const命令

const命令与let命令一样，声明的变量，其作用域都是块级。

所以const遵循的规则与let相差无二，只是，const是用来声明恒定变量的。

且，用const声明恒定变量，声明的同时就必须赋值，否则会报错。 如下：

```
'use strict';
function func(){
    const PI;
    PI = 3.14;
    console.log(PI);
};
func();
```
在node环境下，执行上述代码结果如下：_
```
const PI;
syntaxError: unexpected token ;
```
正确的方式为，声明就得赋值。

如：
```
const PI = 3.14
```
