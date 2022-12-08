---
title: Javascript内存管理



---
## 1 引言

JS 中的内存管理, 我的感觉就像 JS 中的一门副科, [我们](https://www.w3cdoc.com)平时不会太重视, 但是一旦出问题又很棘手. 所以可以通过平时多了解一些 JS 中内存管理问题, 在写代码中通过一些习惯, 避免内存泄露的问题.

## 2 内容概要

## 2.1 内存生命周期


  <img loading="lazy" class="alignnone wp-image-4391 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png?x-oss-process=image/format,webp" alt="" width="458" height="343" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png?x-oss-process=image/format,webp 1024w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_576/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/img_5ce3754d80c99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w" sizes="(max-width: 458px) 100vw, 458px" />

不管什么程序语言，内存生命周期基本是一致的：

1. 分配你所需要的内存

2. 使用分配到的内存（读, 写）

3. 不需要时将其释放/归还

在 C语言中, 有专门的内存管理接口, 像 **_malloc()_** 和 **_free()_** . 而在 JS 中, 没有专门的内存管理接口, 所有的内存管理都是&#8221;自动&#8221;的. JS 在创建变量时, 自动分配内存, 并在不使用的时候, 自动释放. 这种&#8221;自动&#8221;的内存回收, 造成了很多 JS 开发并不关心内存回收, 实际上, 这是错误的.

## 2.2 JS 中的内存回收

2.2.1 引用

垃圾回收算法主要依赖于引用的概念. 在内存管理的环境中, 一个对象如果有访问另一个对象的权限（隐式或者显式）, 叫做一个对象引用另一个对象. 例如: 一个Javascript对象具有对它原型的引用（隐式引用）和对它属性的引用（显式引用）.

2.2.2 引用计数垃圾收集

这是最简单的垃圾收集算法.此算法把“对象是否不再需要”简化定义为“对象有没有其他对象引用到它”. 如果没有引用指向该对象, 对象将被垃圾回收机制回收.

示例:

<div class="highlight">
  ```
let arr = [1, 2, 3, 4];
arr = null; // [1,2,3,4]这时没有被引用, 会被自动回收
```
</div>

2.2.3 限制: 循环引用

在下面的例子中, 两个对象对象被创建并互相引用, 就造成了循环引用. 它们被调用之后不会离开函数作用域, 所以它们已经没有用了, 可以被回收了. 然而, 引用计数算法考虑到它们互相都有至少一次引用, 所以它们不会被回收.

<div class="highlight">
  ```
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 引用 o2
  o2.p = o1; // o2 引用 o1. 这里会形成一个循环引用
}
f();
```
</div><figure>


  <img loading="lazy" width="386" height="209" class="alignnone size-full wp-image-4745 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c247564a50.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c247564a50.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c247564a50.png?x-oss-process=image/format,webp 386w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c247564a50.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_162/format,webp 300w" sizes="(max-width: 386px) 100vw, 386px" />
</figure>

实际例子:

<div class="highlight">
  ```
var div;
window.onload = function(){
  div = document.getElementById("myDivElement");
  div.circularReference = div;
  div.lotsOfData = new Array(10000).join("*");
};
```
</div>

在上面的例子里, myDivElement 这个 DOM 元素里的 circularReference 属性引用了 myDivElement, 造成了循环引用. IE 6, 7 使用引用计数方式对 DOM 对象进行垃圾回收. 该方式常常造成对象被循环引用时内存发生泄漏. 现代[浏览器](https://www.w3cdoc.com)通过使用标记-清除内存回收算法, 来解决这一问题.

2.2.4 标记-清除算法

这个算法把&#8221;对象是否不再需要&#8221;简化定义为&#8221;对象是否可以获得&#8221;.

这个算法假定设置一个叫做根 **_root_** 的对象（在Javascript里，根是全局对象）. 定期的, 垃圾回收器将从根开始, 找所有从根开始引用的对象, 然后找这些对象引用的对象, 从根开始,垃圾回收器将找到所有可以获得的对象和所有不能获得的对象.

从2012年起, 所有现代[浏览器](https://www.w3cdoc.com)都使用了标记-清除内存回收算法. 所有对JavaScript垃圾回收算法的改进都是基于标记-清除算法的改进.<figure>


  <img loading="lazy" width="600" height="317" class="alignnone size-full wp-image-4747 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c24bf79f37.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c24bf79f37.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c24bf79f37.png?x-oss-process=image/format,webp 600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2c24bf79f37.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_159/format,webp 300w" sizes="(max-width: 600px) 100vw, 600px" />
</figure>

2.2.5 自动 GC 的问题

尽管自动 GC 很方便, 但是[我们](https://www.w3cdoc.com)不知道GC 什么时候会进行. 这意味着如果[我们](https://www.w3cdoc.com)在使用过程中使用了大量的内存, 而 GC 没有运行的情况下, 或者 GC 无法回收这些内存的情况下, 程序就有可能假死, 这个就需要[我们](https://www.w3cdoc.com)在程序中手动做一些操作来触发内存回收.

2.2.6 什么是内存泄露?

本质上讲, 内存泄露就是不再被需要的内存, 由于某种原因, 无法被释放.

## 2.3 常见的内存泄露案例

2.3.1 全局变量

<div class="highlight">
  ```
function foo(arg) {
    bar = "some text";
}
```
</div>

在 JS 中处理未被声明的变量, 上述范例中的 **_bar_** 时, 会把 **_bar_** , 定义到全局对象中, 在[浏览器](https://www.w3cdoc.com)中就是 **_window_** 上. 在页面中的全局变量, 只有当页面被关闭后才会被销毁. 所以这种写法就会造成内存泄露, 当然在这个例子中泄露的只是一个简单的字符串, 但是在实际的代码中, 往往情况会更加糟糕.

另外一种意外创建全局变量的情况.

<div class="highlight">
  ```
function foo() {
    this.var1 = "potential accidental global";
}
// Foo 被调用时, this 指向全局变量(window)
foo();
```
</div>

在这种情况下调用 **_foo_**, this被指向了全局变量 **_window_**, 意外的创建了全局变量.

[我们](https://www.w3cdoc.com)谈到了一些意外情况下定义的全局变量, 代码中也有一些[我们](https://www.w3cdoc.com)明确定义的全局变量. 如果使用这些全局变量用来暂存大量的数据, 记得在使用后, 对其重新赋值为 null.

2.3.2 未销毁的定时器和回调函数

在很多库中, 如果使用了观察着模式, 都会提供回调方法, 来调用一些回调函数. 要记得回收这些回调函数. 举一个 setInterval的例子.

<div class="highlight">
  ```
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); // 每 5 秒调用一次
```
</div>

如果后续 **_renderer_** 元素被移除, 整个定时器实际上没有任何作用. 但如果你没有回收定时器, 整个定时器依然有效, 不但定时器无法被内存回收, 定时器函数中的依赖也无法回收. 在这个案例中的 **_serverData_** 也无法被回收.

2.3.3 闭包

在 JS 开发中, [我们](https://www.w3cdoc.com)会经常用到闭包, 一个内部函数, 有权访问包含其的外部函数中的变量. 下面这种情况下, 闭包也会造成内存泄露.

<div class="highlight">
  ```
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // 对于 'originalThing'的引用
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```
</div>

这段代码, 每次调用 **_replaceThing _**时, **_theThing_** 获得了包含一个巨大的数组和一个对于新闭包 **_someMethod _**的对象. 同时 **_unused_** 是一个引用了 **_originalThing _**的闭包.

这个范例的关键在于, 闭包之间是共享作用域的, 尽管 **_unused _**可能一直没有被调用, 但是**_someMethod_** 可能会被调用, 就会导致内存无法对其进行回收. 当这段代码被反复执行时, 内存会持续增长.

该问题的更多描述可见<a class=" wrap external" href="https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Meteor团队的这篇文章</a>.

2.3.4 DOM 引用

很多时候, [我们](https://www.w3cdoc.com)对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中.

<div class="highlight">
  ```
var elements = {
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    document.body.removeChild(document.getElementById('image'));
    // 这个时候[我们](https://www.w3cdoc.com)对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.
}
```
</div>

上述案例中, 即使[我们](https://www.w3cdoc.com)对于 image 元素进行了移除, 但是仍然有对 image 元素的引用, 依然无法对齐进行内存回收.

另外需要注意的一个点是, 对于一个 Dom 树的叶子节点的引用. 举个例子: 如果[我们](https://www.w3cdoc.com)引用了一个表格中的 **_td _**元素, 一旦在 Dom 中删除了整个表格, [我们](https://www.w3cdoc.com)直观的觉得内存回收应该回收除了被引用的 **_td _**外的其他元素. 但是事实上, 这个 **_td_** 元素是整个表格的一个子元素, 并保留对于其父元素的引用. 这就会导致对于整个表格, 都无法进行内存回收. 所以[我们](https://www.w3cdoc.com)要小心处理对于 Dom 元素的引用.

## 3 精读

ES6中引入 **_WeakSet _**和 **_WeakMap_** 两个新的概念, 来解决引用造成的内存回收问题. **_WeakSet_** 和 **_WeakMap _**对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.

JS 这类高级语言，隐藏了内存管理功能。但无论开发人员是否注意，内存管理都在那，所有编程语言最终要与操作系统打交道，在内存大小固定的硬件上工作。不幸的是，即使不考虑垃圾回收对性能的影响，2017 年最新的垃圾回收算法，也无法智能回收所有极端的情况。

唯有程序员自己才知道何时进行垃圾回收，而 JS 由于没有暴露显示内存管理接口，导致触发垃圾回收的代码看起来像“垃圾”，或者优化垃圾回收的代码段看起来不优雅、甚至不可读。

所以在 JS 这类高级语言中，有必要掌握基础内存分配原理，在对内存敏感的场景，比如 nodejs 代码做严格检查与优化。谨慎使用 dom 操作、主动删除没有业务意义的变量、避免提前优化、过度优化，在保证代码可读性的前提下，利用性能监控工具，通过调用栈定位问题代码。

同时对于如何利用 chrome调试工具, 分析内存泄露的方法和技巧. 可以参考上期<a class="internal" href="https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/" data-za-detail-view-id="1043">《2017[前端](https://www.w3cdoc.com)性能优化备忘录》</a>

## 4 总结

即便在 JS 中, [我们](https://www.w3cdoc.com)很少去直接去做内存管理. 但是[我们](https://www.w3cdoc.com)在写代码的时候, 也要有内存管理的意识, 谨慎的处理可能会造成内存泄露的场景.

## 参考文章


  <a href="https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec">How JavaScript works: memory management + how to handle 4 common memory leaks</a>

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">MDN 的内存管理介绍</a>


  <a href="https://zhuanlan.zhihu.com/p/30552148">精读《JS 中的内存管理》</a>


