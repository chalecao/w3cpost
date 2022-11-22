---
title: 异步回调之Promise对象


date: 2017-08-29T14:52:14+00:00
excerpt: |
  你可能知道，Javascript语言的执行环境是”单线程”（single thread）。
  所谓”单线程”，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。
url: /javascriptnodejs/773.html
views:
  - 2170
  - 2170
onesignal_meta_box_present:
  - 1
fifu_image_url:
  - //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/promise1.jpg
fifu_image_alt:
  - 异步回调之Promise对象


---
# 异步思想

你可能知道，Javascript语言的执行环境是”单线程”（single thread）。  
所谓”单线程”，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

<img loading="lazy" class="aligncenter" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/promise1.jpg" alt="异步回调之Promise对象" width="492" height="330" /> 

### 异步问题

为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。  
“同步模式”就是上一段的模式，后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的；”异步模式”则完全不同，每一个任务有一个或多个回调函数（callback），前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的、异步的。

“异步模式”非常重要。在浏览器端，耗时很长的操作都应该异步执行，避免浏览器失去响应，最好的例子就是Ajax操作。在服务器端，”异步模式”甚至是唯一的模式，因为执行环境是单线程的，如果允许同步执行所有http请求，服务器性能会急剧下降，很快就会失去响应。  
本文总结了”异步模式”编程的4种方法，理解它们可以让你写出结构更合理、性能更出色、维护更方便的Javascript程序。

### 回调函数

这是异步编程最基本的方法。  
假定有两个函数f1和f2，后者等待前者的执行结果。

<pre class="hljs javascript"><code class="javascript">
f1();
f2();
 
</code></pre>

如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数。

<pre class="hljs javascript"><code class="javascript">
function f1(callback){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　callback();
　　　　}, 1000);
　　}
 
</code></pre>

执行代码就变成下面这样：

<pre class="hljs javascript"><code class="javascript">
f1(f2);
 
</code></pre>

采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。  
回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

### 事件监听

另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。  
还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的写法）。

<pre class="hljs javascript"><code class="javascript">
f1.on('done', f2);
 
</code></pre>

上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：

<pre class="hljs javascript"><code class="javascript">
function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　f1.trigger('done');
　　　　}, 1000);
　　}
 
</code></pre>

f1.trigger(‘done’)表示，执行完成后，立即触发done事件，从而开始执行f2。  
这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以”去耦合”（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

### 发布/订阅

上一节的”事件”，完全可以理解成”信号”。  
我们假定，存在一个”信号中心”，某个任务执行完成，就向信号中心”发布”（publish）一个信号，其他任务可以向信号中心”订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式”（publish-subscribe pattern），又称”观察者模式”（observer pattern）。  
这个模式有多种实现，下面采用的是Ben Alman的Tiny Pub/Sub，这是jQuery的一个插件。  
首先，f2向”信号中心”jQuery订阅”done”信号。

<pre class="hljs javascript"><code class="javascript">
jQuery.subscribe("done", f2);
 
</code></pre>

然后，f1进行如下改写：

<pre class="hljs javascript"><code class="javascript">
　function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　jQuery.publish("done");
　　　　}, 1000);
　　}
 
</code></pre>

jQuery.publish(“done”)的意思是，f1执行完成后，向”信号中心”jQuery发布”done”信号，从而引发f2的执行。  
此外，f2完成执行后，也可以取消订阅（unsubscribe）。

<pre class="hljs javascript"><code class="javascript">
　jQuery.unsubscribe("done", f2);
 
</code></pre>

这种方法的性质与”事件监听”类似，但是明显优于后者。因为我们可以通过查看”消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

### Promises对象

Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。  
简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。比如，f1的回调函数f2,可以写成：

<pre class="hljs javascript"><code class="javascript">
f1().then(f2);
 
</code></pre>

f1要进行如下改写（这里使用的是jQuery的实现）：

<pre class="hljs javascript"><code class="javascript">
function f1(){
　　　　var dfd = $.Deferred();
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　dfd.resolve();
　　　　}, 500);
　　　　return dfd.promise;
　　}
 
</code></pre>

这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的配套方法，可以实现许多强大的功能。  
比如，指定多个回调函数：

<pre class="hljs javascript"><code class="javascript">
f1().then(f2).then(f3);
 
</code></pre>

再比如，指定发生错误时的回调函数：

<pre class="hljs javascript"><code class="javascript">
f1().then(f2).fail(f3);
 
</code></pre>

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是编写和理解，都相对比较难。下面我们详细介绍promise对象。

### promise详解

其实 Promise 这个东西提出来也挺久时间了，它是一种解决复杂异步回调逻辑的方法。大部分人类的正常思维方式都是线性连贯的，但是在 JavaScript 中，异步却是主流。所以，在遇到复杂逻辑时，我们往往会写成这样：

<pre class="hljs javascript"><code class="javascript">
// Code uses jQuery to illustrate the Pyramid of Doom
(function($) {
$(function(){
$("button").click(function(e) {
$.get("/test.json", function(data, textStatus, jqXHR) {
$(".list").each(function() {
$(this).click(function(e) {
setTimeout(function() {
alert("Hello World!");
}, 1000);
});
});
});
});
});
})(jQuery);
 
</code></pre>

这就是所谓的「回调金字塔」,解决这个方法最简单的方法，就是把匿名函数取个名字，单独提取出来定义。但是当遇到多变的业务场景时，具名函数的方法也不太管用，于是便有了各种高级的碾平异步回调的解决方案，Promise 就是其中一种。

在 ECMAScript 6 中，Promise 模式得到了原生的支持。我们就从原生模型说起。

#### ECMAScript 6 Promise

为了简化各种各样的异步逻辑，我们先假设有一个会花一些时间来完成的 JS 函数。它的功能很简单，就是过一段时间以后调用传入的回调函数。

<pre class="hljs javascript"><code class="javascript">
var wait = function(callback, param) {
setTimeout(function() {
callback(param)
}, 2000 + (Math.random() - 0.5) * 1000);
}
wait(console.log.bind(console), 'test');
 
</code></pre>

你可以想象多层嵌套的时候大概是什么样子：

<pre class="hljs javascript"><code class="javascript">
wait(function() {
console.log('如果你愿意');
wait(function() {
console.log('一层');
wait(function() {
console.log('一层');
wait(function() {
console.log('一层地');
wait(console.log.bind(console), '剥开我的心');
});
});
});
});
 
</code></pre>

那么，在 Promise 的世界里是什么样的呢？这就不得不先枯燥地解释一些东西了。首先，什么叫做一个「promise」？一个 promise 可以是一个对象或者函数，它包含一个 then 接口并且符合相应的规范。使用一个 promise 的方法就是这样：

<pre class="hljs javascript"><code class="javascript">
promise.then(function(response) {
// onFulfilled 时执行
}, function(error) {
// onRejected 时执行
});
 
</code></pre>

于是问题又来了，什么叫做 fulfilled 和 rejected 呢？一个 promise 会有三种状态，大致可以理解为执行成功（fulfilled）、执行失败（rejected）和正在执行中（pending）。Promise 包含一个状态机，它内部的状态转换，只允许从 pending 到 fulfilled 或者 rejected 一次，不允许更多了。如果用大家喜闻乐见的薛定谔的猫来解释，就是打开盒子的时候，我们的猫要么死了，要么没死，要么不确定死没死，死的的猫无法复活，活猫也一定不会死:D

新建一个 promise 的时候，我们需要在代码中定义什么时候算成功了，什么时候算失败了。于是上面 wait 的例子便可以改写这样了：

<pre class="hljs javascript"><code class="javascript">
function waitPromise(param) {
return new Promise(function(resolve, reject) {
setTimeout(function() {
resolve(param);
}, 2000 + (Math.random() - 0.5) * 1000);
});
}
waitPromise('如果你愿意').then(function(response) {
console.log(response);
return waitPromise('一层');
}).then(function(response) {
console.log(response);
return waitPromise('一层');
}).then(function(response) {
console.log(response);
return waitPromise('一层地');
}).then(function(response) {
console.log(response);
return waitPromise('剥开我的心');
}).then(console.log.bind(console));
 
</code></pre>

从上面的例子中，我们可以看出几点：

一个 promise 它 resolve（或者 reject）的东西就是 then 的两个回调接受的参数。  
then 可以链式调用，调用的顺序就是你定义的顺序。  
在 onFulfilled（或者 onRejected）中，你可以返回一个 promise，此时 then 会返回这个 promise 的一个代理，并响应它的状态变化（即给下一个 then 使用）。  
onFulfilled 和 onRejected 中，除了可以返回一个 promise 以外，还可以返回一个对象，其中包含一个 then 方法——这样的对象称作 thenable。当 thenable 被返回时，代理的 promise 就会去调用该方法，并传入 resolvePromise 和 rejectPromise 两个参数，于是这个 promise 也就链式地传递下去了。除此之外，返回一个不是 thenable 的值也是可以的，这相当于一个简化，该返回值会被链式的 promise 立即 fulfill。

上面的例子比较一根筋，所有的 then 只定义了第一个参数（即成功的回调），其实我们还可以通过调用 onRejected 或者抛出一个异常来表示 Promise 执行失败，从而进入 then 的第二个函数中（then(func1, func2) 必定会调用且仅调用其中一个）。听上去是不是有点 try/catch 的味道，事实上，Promise 还真提供了一个语法糖，就是 catch(func)，它其实相当于 then(undefined, func)。链条中加入的 catch 可以管上它之前所有的 promise 中的失败情况。

听上去好像很绕口的样子，而且这个 Promise 也不过是把回调拉平了而已嘛，至于这么复杂么？其实，依赖这些，我们可以方便地实现更多异步逻辑。在 ECMAScript 6中，Promise 还定义了两个接口：

Promise.all：接受一堆 promise 的数组（任何可迭代的对象都可以），只有当他们都解决了以后，才会解决  
Promise.race：也是接受一堆 promise，但是只要有一个成功或者失败了，就会立即解决或驳回它本身  
怎么样，是不是突显出 JavaScript 的函数式风格了。就目前的形势而言，Chrome 33 和 Firefox 30 以上的浏览器都已经实现了原生 Promise。  
Promises/A+

之前说了那么多关于 Promise 的这个规定，那个规定，其实它是有一个统一的名称的，就叫做 Promises/A+。在它的网站上，你可以阅读到完整的规范文档。  
基于这个标准，除了 ECMAScript 6 中比较简易的 Promise 以外，还有很多实现各不相同，功能各有千秋的实现，比较有名的有（按现有 Github Star 数排列）：

<pre class="hljs javascript"><code class="javascript">
Q
Bluebird
when
rsvp.js
 
</code></pre>

例如，Q 支持进度查询功能，执行时间较长的异步操作（例如文件上传）可以即时获取进度信息：

<pre class="hljs javascript"><code class="javascript">
return uploadFile()
.then(function () {
// Success uploading the file
}, function (err) {
// There was an error, and we get the reason for error
}, function (progress) {
// We get notified of the upload's progress as it is executed
});
 </code></pre>

### 重新发明轮子

尽管 Promise 的实现有很多，但是它们的核心都是一样的，就是围绕着 then 方法展开。既然有了标准规范，其实我们可以自己实现一个简单的 Promise。

首先当然要创建一个 Promise 对象的构造函数，它接受一个函数作为参数，调用这个函数的时候，会传入 resolve 和 reject 方法。

<pre class="hljs javascript"><code class="javascript">function MyPromise(resolver) {
  // 简单起见就不做类型检查了，假定 resolver 一定为函数
  this.status = 0; // 0: pending, 1: fulfilled, 2: rejected
  this.value = null;
  this.handlers = [];
  doResolve.call(this, resolver);
}
function doResolve(resolver) {
  var called = false;
  function resolvePromise(value) {
    if (called) {
      return;
    } else {
      called = true;
      resolve.call(this, value);
    }
  }
  function rejectPromise(reason) {
    if (called) {
      return;
    } else {
      called = true;
      reject.call(this, reason);
    }
  }
  try {
    resolver(resolvePromise.bind(this), rejectPromise.bind(this));
  } catch(e) {
    rejectPromise(e);
  }
}</code></pre>

这样，当使用 new Promise(function(resolve, reject) {…}); 构造时，就会进入 doResolve，这时会执行传入给 new Promise 的参数，并给出 resolve 和 reject 的实现。可以看到为了保证 resolve 或 reject 总共只能被调用一次，这里用到了一个闭包。接下来来看具体的 resolve 和 reject 是怎么实现的。

<pre class="hljs javascript"><code class="javascript">
function resolve(value) {
  try {
    if (this === value) {
      throw new TypeError('A promise cannot be resolved with itself.');
    }
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        doResolve.call(this, then.bind(value));
        return;
      }
    }
    this.status = 1;
    this.value = value;
    dequeue.call(this);
  } catch(e) {
    reject(e);
  }
}
function reject(reason) {
  this.status = 2;
  this.value = reason;
  dequeue.call(this);
}
</code></pre>

具体的 resolve 实现中，我们会判断解决的值是否是一个 thenable，如果是的话，就会去执行这个 then 函数，并且接受它的状态和返回值。如果不是，就直接使用该值解决这个 promise。

可以想象，当我们执行 promise 的 then 方法时，其实是完成了一个类似观察者模式的注册过程。当 promise 还处于 pending 状态时，回调函数会被暂时存储起来，待到解决或失败时再执行，但是当 then 发现这个 promise 已经完成了状态转换，便可以根据状态立即执行回调了。

在这里，我们使用了 this.handlers 数组来暂存 then 的回调函数，当状态改变时，会调用 dequeue 方法来处理队列。

<pre class="hljs javascript"><code class="javascript">
function dequeue() {
  var handler;
  while (this.handlers.length) {
    handler = this.handlers.shift();
    handle.call(this, handler.thenPromise, handler.onFulfilled, handler.onRejected);
  }
}
</code></pre>

最后便是核心方法 then 的实现了。根据规范，它必须返回一个 promise，并根据 onFulfilled 或 onRejected 回调的返回值来决定是将它标记为完成还是失败。

<pre class="hljs javascript"><code class="javascript">
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;
  var thenPromise = new MyPromise(function() {});
  if (!self.status) {
    self.handlers.push({
    thenPromise: thenPromise,
    onFulfilled: onFulfilled,
    onRejected: onRejected
    });
  } else {
    handle.call(self, thenPromise, onFulfilled, onRejected);
  }
  return thenPromise;
};
function handle(thenPromise, onFulfilled, onRejected) {
  var self = this;
  setTimeout(function() {
    var callback, ret;
    if (self.status == 1) {
      callback = onFulfilled;
    } else {
      callback = onRejected;
    }
    if (typeof callback === 'function') {
      try {
        ret = callback(self.value);
        resolve.call(thenPromise, ret);
      } catch(e) {
        reject.call(thenPromise, e);
      }
      return;
    }
    if (self.status == 1) {
      resolve.call(thenPromise, self.value);
    } else {
      reject.call(thenPromise, self.value);
    }
  }, 1);
}
</code></pre>

在上面的 handle 函数中，我们立即调用回调函数，并且根据回调函数的类型来改变 then 方法返回的 promise 的状态，这样就形成了一个 promise 链条。

大约 100 多行代码，我们就实现了一个粗糙的 Promise 库。当然，上面的代码可能还有很多 Bug，并且也不是严格符合 Promises/A+ 的。如果读者发现问题，请不吝指出。

有了这个核心的基础，实现外围的 API 例如 Promise.all、Promise.race 就比较简单了，这里就不给出了。其实，Promise 看似用起来很简单，想要自己严格实现一个，还是有不少难点的，其中最容易被绕晕的就是对 then  
的实现，以及如何处理 then 的回调中又返回新的 promise 的逻辑。

我们回到文章开头的例子，使用我们自己的 MyPromise 试验一下。简单起见，就不写那么多层了。

<pre class="hljs javascript"><code class="javascript">
function waitPromise(param) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(param);
    }, 2000 + (Math.random() - 0.5) * 1000);
  });
}
waitPromise('如果你愿意').then(function(response) {
  console.log(response);
  return waitPromise('一层');
}).then(console.log.bind(console));
 
</code></pre>

可以看到我们可以成功输出两行文字。你能根据上面的实现，看出这次调用事实上一共产生了多少个 promise 对象吗？

答案是五个：

P0：第一次 waitPromise(‘如果你愿意’) 返回的  
P1：第一个 then 返回的  
P2：第二个 then 返回的  
P3：第一个 then 里，通过 return waitPromise(‘一层’) 返回的  
P4：在处理 P1 时，会调用 P3 的 then 方法，这时候又会返回一个 promise

&nbsp;

# Pomise.all与Promise.race举例

##### 一、Pomise.all的使用

Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。

具体代码如下：

<pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">let&lt;/span> p1 = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve, reject&lt;/span>) =&gt;&lt;/span> {
  resolve(&lt;span class="hljs-string">'成功了'&lt;/span>)
})

&lt;span class="hljs-keyword">let&lt;/span> p2 = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve, reject&lt;/span>) =&gt;&lt;/span> {
  resolve(&lt;span class="hljs-string">'success'&lt;/span>)
})

&lt;span class="hljs-keyword">let&lt;/span> p3 = Promse.reject(&lt;span class="hljs-string">'失败'&lt;/span>)

&lt;span class="hljs-built_in">Promise&lt;/span>.all([p1, p2]).then(&lt;span class="hljs-function">(&lt;span class="hljs-params">result&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(result)               &lt;span class="hljs-comment">//['成功了', 'success']&lt;/span>
}).catch(&lt;span class="hljs-function">(&lt;span class="hljs-params">error&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(error)
})

&lt;span class="hljs-built_in">Promise&lt;/span>.all([p1,p3,p2]).then(&lt;span class="hljs-function">(&lt;span class="hljs-params">result&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(result)
}).catch(&lt;span class="hljs-function">(&lt;span class="hljs-params">error&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(error)      &lt;span class="hljs-comment">// 失败了，打出 '失败'&lt;/span>
})
</code></pre>

Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。

代码模拟：

<pre class="hljs php"><code class="php">let wake = (time) =&gt; {
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      resolve(`${time / &lt;span class="hljs-number">1000&lt;/span>}秒后醒来`)
    }, time)
  })
}

let p1 = wake(&lt;span class="hljs-number">3000&lt;/span>)
let p2 = wake(&lt;span class="hljs-number">2000&lt;/span>)

Promise.all([p1, p2]).then((result) =&gt; {
  console.log(result)       &lt;span class="hljs-comment">// [ '3秒后醒来', '2秒后醒来' ]&lt;/span>
}).&lt;span class="hljs-keyword">catch&lt;/span>((error) =&gt; {
  console.log(error)
})
</code></pre>

需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

##### 二、Promise.race的使用

顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

<pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">let&lt;/span> p1 = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve, reject&lt;/span>) =&gt;&lt;/span> {
  setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
    resolve(&lt;span class="hljs-string">'success'&lt;/span>)
  },&lt;span class="hljs-number">1000&lt;/span>)
})

&lt;span class="hljs-keyword">let&lt;/span> p2 = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve, reject&lt;/span>) =&gt;&lt;/span> {
  setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
    reject(&lt;span class="hljs-string">'failed'&lt;/span>)
  }, &lt;span class="hljs-number">500&lt;/span>)
})

&lt;span class="hljs-built_in">Promise&lt;/span>.race([p1, p2]).then(&lt;span class="hljs-function">(&lt;span class="hljs-params">result&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(result)
}).catch(&lt;span class="hljs-function">(&lt;span class="hljs-params">error&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(error)  &lt;span class="hljs-comment">// 打开的是 'failed'&lt;/span>
})
</code></pre>

原理是挺简单的，但是在实际运用中还没有想到什么的使用场景会使用到。

# 参考资料

JavaScript Promises – There and back again  
Promises/A+  
Promises Implementing