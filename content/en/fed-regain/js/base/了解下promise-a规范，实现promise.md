---
title: 了解下Promise A+规范，实现Promise



---
<div>
  <h2 class="heading" data-id="heading-1">
    1 从简单使用着手，实现MyPromise大体框架
  

  <blockquote>
    
      先来看一下promise使用的一个小例子：
    
  </blockquote>
  ```
let p = new Promise(function (resolve, reject) {
  console.log('start')
  resolve('data1')
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')
复制代码
```
  <blockquote>
    
      运行结果如下：
    
  </blockquote><figure>
 <img loading="lazy" width="185" height="85" class="alignnone size-full wp-image-5128 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff5529e93.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff5529e93.png?x-oss-process=image/format,webp" alt="" />
  <figcaption></figcaption></figure>
  <blockquote>
    
      针对这个例子做以下几点说明，也是需要直接记住的，因为这就好比是解答数学题的公式一样，开始一定要记牢。
    
  </blockquote>
  <ol>
    
      Promise是构造函数，new 出来的实例有then方法。
    
    
      new Promise时，传递一个参数，这个参数是函数，又被称为执行器函数(executor)， 并执行器会被立即调用，也就是上面结果中start最先输出的原因。
    
    
      executor是函数，它接受两个参数 resolve reject ，同时这两个参数也是函数。
    
    
      new Promise后的实例具有状态， 默认状态是等待，当执行器调用resolve后， 实例状态为成功状态， 当执行器调用reject后，实例状态为失败状态。
    
    
      promise翻译过来是承诺的意思，实例的状态一经改变，不能再次修改，不能成功再变失败，或者反过来也不行。
    
    
      每一个promise实例都有方法 then ，then中有两个参数 ，我习惯把第一个参数叫做then的成功回调，把第二个参数叫做then的失败回调，这两个参数也都是函数，当执行器调用resolve后，then中第一个参数函数会执行。当执行器调用reject后，then中第二个参数函数会执行。
    
  </ol>
  <blockquote>
    
      那么就目前的这些功能，或者说是规则，来着手写一下MyPromise构造函数吧。
    
  </blockquote>
 1 构造函数的参数，在new 的过程中会立即执行
  
  ```
// 因为会立即执行这个执行器函数
function MyPromise(executor){
  executor(resolve, reject)
}
复制代码
```
 2 new出来的实例具有then方法
  
  ```
MyPromise.prototype.then = function(onFulfilled, onRejected){

}
复制代码
```
 3 new出来的实例具有默认状态，执行器执行resolve或者reject，修改状态
  
  ```
function MyPromise(executor){
  let self = this
  self.status = 'pending' // 默认promise状态是pending
  function resolve(value){
    self.status = 'resolved' // 成功状态
  }
  function reject(reason){
    self.status = 'rejected' //失败状态
  }
  executor(resolve, reject)
}
复制代码
```
 4 当执行器调用resolve后，then中第一个参数函数（成功回调）会执行,当执行器调用reject后，then中第二个参数函数（失败回调）会执行
  
  ```
MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  if(self.status === 'resolved'){
    onFulfilled()
  }
  if(self.status === 'rejected'){
    onRejected()
  }
}
复制代码
```
 5 保证promise实例状态一旦变更不能再次改变，只有在pending时候才可以变状态
  
  ```
function Promise(executor){
  let self = this
  self.status = 'pending' // 默认promise状态是pending
  function resolve(value){
    if(self.status === 'pending'){ //保证状态一旦变更，不能再次修改
      self.value = value
      self.status = 'resolved' // 成功状态
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason
      self.status = 'rejected' //失败状态
    }
  }
  executor(resolve, reject)
}
复制代码
```
 6 执行器执行resolve方法传的值，传递给then中第一个参数函数中
  
  ```
function MyPromise(executor){
  let self = this
  self.value = undefined
  self.reason = undefined
  self.status = 'pending' // 默认promise状态是pending
  function resolve(value){
    if(self.status === 'pending'){ //保证状态一旦变更，不能再次修改
      self.value = value
      self.status = 'resolved' // 成功状态
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason
      self.status = 'rejected' //失败状态
    }
  }
  executor(resolve, reject) // 因为会立即执行这个执行器函数
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  if(self.status === 'resolved'){
    onFulfilled(self.value)
  }
  if(self.status === 'rejected'){
    onRejected(self.reason)
  }
}
复制代码
```
  <blockquote>
    
      尝试使用一下这个 MyPromise ：
    
  </blockquote>
  ```
let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  resolve('data2')
})
p.then(
  (v) => {
    console.log('success ' + v)
  },
  (v) => {
  console.log('error ' + v)
  }
)
console.log('end')
复制代码
```
  <blockquote>
    
      运行结果如下：
    
  </blockquote><figure>
 <img loading="lazy" width="187" height="89" class="alignnone size-full wp-image-5129 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff677627f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff677627f.png?x-oss-process=image/format,webp" alt="" />
  <figcaption></figcaption></figure>
  <blockquote>
    
      小结：结果看似对了，不过和原生的promise还是有不同的，就是success那条语句的打印顺序，不要急，MyPromise 还没有写完。
    
  </blockquote>
  <h2 class="heading" data-id="heading-2">
    2 完善MyPromise，添加异步处理和实现一个实例多次调用then方法
  

  <blockquote>
    
      还是看原生promise的使用小例子
    
  </blockquote>
  ```
let p = new Promise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')
复制代码
```
  <blockquote>
    
      运行结果如下
    
  </blockquote><figure>
 <img loading="lazy" width="194" height="88" class="alignnone size-full wp-image-5130 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff768e672.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff768e672.png?x-oss-process=image/format,webp" alt="" />
  <figcaption></figcaption></figure>
  <blockquote>
    
      实例多次调用then方法情况（注意不是链式调用）
    
  </blockquote>
  ```
let p = new Promise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')
复制代码
```
  <blockquote>
    
      运行结果如下
    
  </blockquote><figure>
 <img loading="lazy" width="188" height="113" class="alignnone size-full wp-image-5131 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff86c3aba.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff86c3aba.png?x-oss-process=image/format,webp" alt="" />
  <figcaption></figcaption></figure>
  <blockquote>
    
      那么针对这种异步的情况和实例p多次调用then方法，[我们](https://www.w3cdoc.com)上述MyPromise该如何修改呢？
    
  </blockquote>
  <ol>
    
      对于异步情况，[我们](https://www.w3cdoc.com)先来看上面的例子，当代码执行到了p.then() 的时候，执行器方法中的resolve(&#8216;data1&#8217;)被setTimeout放到了异步任务队列中，
    
    
      换句话说，也就是，此时实例p的状态还是默认状态，没有改变，那么[我们](https://www.w3cdoc.com)此时并不知道要去执行then中的第一个参数（成功回调）还是第二个参数（失败回调）。
    
    
      在不知道哪个回调会被执行的情况下，就需要先把这两个回调函数保存起来，等到时机成熟，确定调用哪个函数的时候，再拿出来调用。
    
    
      其实就是发布订阅的一个变种，[我们](https://www.w3cdoc.com)在执行一次p.then(),就会then中的参数，也就是把成功回调和失败回调都保存起来（订阅），执行器执行了resolve方法或者reject方法时，[我们](https://www.w3cdoc.com)去执行刚保存起来的函数（发布）。
    
  </ol>
 此阶段MyPromise升级代码如下
  
  ```
//省略其余等待，突出增加的点，等下发完整版
function MyPromise(executor){
  ...
  // 用来保存then 方法中，第一个参数
  self.onResolvedCallbacks = []
  // 用来保存then 方法中，第二个参数
  self.onRejectedCallbacks = []
  ...
}
MyPromise.prototype.then = function(onFulfilled, onRejected){
  ...
  if(self.status === 'pending'){
  // 订阅
    self.onResolvedCallbacks.push(function(){
      onFulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function(){
      onRejected(self.reason)
    })
  }
  ...
}
复制代码
```
  <blockquote>
    
      小结 这样修改后，[我们](https://www.w3cdoc.com)执行器方法中，有异步函数的情况时，p.then执行就会把对应的两个参数保存起来了。那么在什么时候调用呢？答，肯定是在执行器中的resolve执行时候或者reject执行时候。
    
  </blockquote>
 接下来贴出这阶段改动的完整代码。
  
  ```
function MyPromise(executor){
  let self = this
  self.value = undefined
  self.reason = undefined
  // 默认promise状态是pending
  self.status = 'pending'
  // 用来保存then 方法中，第一个参数
  self.onResolvedCallbacks = []
  // 用来保存then 方法中，第二个参数
  self.onRejectedCallbacks = []
  function resolve(value){
    if(self.status === 'pending'){ //保证状态一旦变更，不能再次修改
      self.value = value
      self.status = 'resolved' // 成功状态
      self.onResolvedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason
      self.status = 'rejected' //失败状态
      self.onRejectedCallbacks.forEach(fn => {
        fn()
      })
    }
  }
  executor(resolve, reject) // 因为会立即执行这个执行器函数
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  if(self.status === 'resolved'){
    onFulfilled(self.value)
  }
  if(self.status === 'rejected'){
    onRejected(self.reason)
  }
  if(self.status === 'pending'){
  // 订阅
    self.onResolvedCallbacks.push(function(){
      onFulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function(){
      onRejected(self.reason)
    })
  }
}
复制代码
```
  <blockquote>
    
      [我们](https://www.w3cdoc.com)来测试一下这个升级版的MyPrimise吧
    
  </blockquote>
  ```
let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')
复制代码
```
  <blockquote>
    
      运行结果如下,显示打印start和end，两秒后一起打印的两个 success：data1
    
  </blockquote><figure>
 <img loading="lazy" width="184" height="113" class="alignnone size-full wp-image-5132 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff96a5c9d.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff96a5c9d.png?x-oss-process=image/format,webp" alt="" />
  <figcaption></figcaption></figure>
  <blockquote>
    
      小结： 下面这里，为什么能拿到self.value的值，值得好好思考一下呦
    
  </blockquote>
  ```
self.onResolvedCallbacks.push(function(){
  onFulfilled(self.value)
}) 
```
</div>

<div>
  <div>
    ##     另一种实现
    


    <h3>
      什么是Promise?
    </h3>
    
    <blockquote>
      
        Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一
      
    </blockquote>
    
    <h3>
      2.对于几种常见异步编程方案
    </h3>
    
    <ul>
      
        回调函数
      
      
        事件监听
      
      
        发布/订阅
      
      
        Promise对象
      
    
    
    <h4>
      这里就拿回调函数说说
    </h4>
    
    
      1.对于回调函数 [我们](https://www.w3cdoc.com)用Jquery的ajax获取数据时 都是以回调函数方式获取的数据
    
    
    ```
$.get(url, (data) => {
    console.log(data)
)
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      2.如果说 当[我们](https://www.w3cdoc.com)需要发送多个异步请求 并且每个请求之间需要相互依赖 那这时 [我们](https://www.w3cdoc.com)只能 以嵌套方式来解决 形成 &#8220;回调地狱&#8221;
    
    
    ```
$.get(url, data1 => {
    console.log(data1)
    $.get(data1.url, data2 => {
        console.log(data1)
    })
})
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <blockquote>
      
        这样一来，在处理越多的异步逻辑时，就需要越深的回调嵌套，这种编码模式的问题主要有以下几个：
      
    </blockquote>
    
    <ul>
      
        代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
      
      
        异步操作的顺序变更时，需要大规模的代码重构。
      
      
        回调函数基本都是匿名函数，bug 追踪困难。
      
      
        回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。
      
    
    
    <h4>
      Promise 处理多个相互关联的异步请求
    </h4>
    
    
      1.而[我们](https://www.w3cdoc.com)Promise 可以更直观的方式 来解决 &#8220;回调地狱&#8221;
    
    
    ```
const request = url => { 
    return new Promise((resolve, reject) => {
        $.get(url, data => {
            resolve(data)
        });
    })
};

// 请求data1
request(url).then(data1 => {
    return request(data1.url);
}).then(data2 => {
    return request(data2.url);
}).then(data3 => {
    console.log(data3);
}).catch(err => throw new Error(err));
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      2.相信[大家](https://www.w3cdoc.com)在 vue/react 都是用axios fetch 请求数据 也都支持 Promise API
    
    
    ```
import axios from 'axios';
axios.get(url).then(data => {
   console.log(data)
})
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <blockquote>
      
        Axios 是一个基于 promise 的 HTTP 库，可以用在[浏览器](https://www.w3cdoc.com)和 node.js 中。
      
    </blockquote>
    
    <h3>
      3.Promise使用
    </h3>
    
    <h4>
      1.Promise 是一个构造函数， new Promise 返回一个 promise对象 接收一个excutor执行函数作为参数, excutor有两个函数类型形参resolve reject
    </h4>
    
    ```
const promise = new Promise((resolve, reject) => {
       // 异步处理
       // 处理结束后、调用resolve 或 reject
});

<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <h4>
      2.promise相当于一个状态机
    </h4>
    
    
      promise的三种状态
    
    
    <ul>
      
        pending
      
      
        fulfilled
      
      
        rejected
      
    
    
    
      1.promise 对象初始化状态为 pending<br /> 2.当调用resolve(成功)，会由pending => fulfilled<br /> 3.当调用reject(失败)，会由pending => rejected
    
    
    <blockquote>
      
        注意promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变
      
    </blockquote>
    
    <h4>
      3.promise对象方法
    </h4>
    
    
      1.then方法注册 当resolve(成功)/reject(失败)的回调函数
    
    
    ```
// onFulfilled 是用来接收promise成功的值
// onRejected 是用来接收promise失败的原因
promise.then(onFulfilled, onRejected);
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <blockquote>
      
        then方法是异步执行的
      
    </blockquote>
    
    
      2.resolve(成功) onFulfilled会被调用
    
    
    ```
const promise = new Promise((resolve, reject) => {
   resolve('fulfilled'); // 状态由 pending => fulfilled
});
promise.then(result => { // onFulfilled
    console.log(result); // 'fulfilled' 
}, reason => { // onRejected 不会被调用

})
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      3.reject(失败) onRejected会被调用
    
    
    ```
const promise = new Promise((resolve, reject) => {
   reject('rejected'); // 状态由 pending => rejected
});
promise.then(result => { // onFulfilled 不会被调用
}, reason => { // onRejected 
    console.log(rejected); // 'rejected'
})
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      4.promise.catch
    
    
    <blockquote>
      
        在链式写法中可以捕获前面then中发送的异常,
      
    </blockquote>
    
    ```
promise.catch(onRejected)
相当于
promise.then(null, onRrejected);

// 注意
// onRejected 不能捕获当前onFulfilled中的异常
promise.then(onFulfilled, onRrejected);

// 可以写成：
promise.then(onFulfilled)
       .catch(onRrejected);
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <h4>
      4.promise chain
    </h4>
    
    <blockquote>
      
        promise.then方法每次调用 都返回一个新的promise对象 所以可以链式写法
      
    </blockquote>
    
    ```
function taskA() {
    console.log("Task A");
}
function taskB() {
    console.log("Task B");
}
function onRejected(error) {
    console.log("Catch Error: A or B", error);
}

var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected) // 捕获前面then方法中的异常
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <h4>
      5.Promise的静态方法
    </h4>
    
    
      1.Promise.resolve 返回一个fulfilled状态的promise对象
    
    
    ```
Promise.resolve('hello').then(function(value){
    console.log(value);
});

Promise.resolve('hello');
// 相当于
const promise = new Promise(resolve => {
   resolve('hello');
});
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      2.Promise.reject 返回一个rejected状态的promise对象
    
    
    ```
Promise.reject(24);
new Promise((resolve, reject) => {
   reject(24);
});
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      3.Promise.all 接收一个promise对象数组为参数
    
    
    <blockquote>
      
        只有全部为resolve才会调用 通常会用来处理 多个并行异步操作
      
    </blockquote>
    
    ```
const p1 = new Promise((resolve, reject) => {
    resolve(1);
});

const p2 = new Promise((resolve, reject) => {
    resolve(2);
});

const p3 = new Promise((resolve, reject) => {
    reject(3);
});

Promise.all([p1, p2, p3]).then(data => {
    console.log(data); // [1, 2, 3] 结果顺序和promise实例数组顺序是一致的
}, err => {
    console.log(err);
});
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    
      4.Promise.race 接收一个promise对象数组为参数
    
    
    <blockquote>
      
        Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。
      
    </blockquote>
    
    ```
function timerPromisefy(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(delay);
        }, delay);
    });
}
var startDate = Date.now();

Promise.race([
    timerPromisefy(10),
    timerPromisefy(20),
    timerPromisefy(30)
]).then(function (values) {
    console.log(values); // 10
});
<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <h3>
      4. Promise 代码实现
    </h3>
    
    ```
/**

* Promise 实现 遵循promise/A+规范
* Promise/A+规范译文:
* https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */

// promise 三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
    let that = this; // 缓存当前promise实例对象
    that.status = PENDING; // 初始状态
    that.value = undefined; // fulfilled状态时 返回的信息
    that.reason = undefined; // rejected状态时 拒绝的原因
    that.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
    that.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

    function resolve(value) { // value成功态时接收的终值
        if(value instanceof Promise) {
            return value.then(resolve, reject);
        }

        // 为什么resolve 加setTimeout?
        // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
        // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

        setTimeout(() => {
            // 调用resolve 回调对应onFulfilled函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => fulfilled状态 (避免调用多次resolve reject)
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        });
    }

    function reject(reason) { // reason失败态时接收的拒因
        setTimeout(() => {
            // 调用reject 回调对应onRejected函数
            if (that.status === PENDING) {
                // 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        });
    }

    // 捕获在excutor执行器中抛出的异常
    // new Promise((resolve, reject) => {
    //     throw new Error('error in excutor')
    // })
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

/**

* resolve中的值几种情况：
* 1.普通值
* 2.promise对象
* 3.thenable对象/函数
 */

/**

* 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
* @param  {promise} promise2 promise1.then方法返回的新的promise对象
* @param  {[type]} x         promise1中onFulfilled的返回值
* @param  {[type]} resolve   promise2的resolve方法
* @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {  // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'));
    }

    let called = false; // 避免多次调用
    // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
    if (x instanceof Promise) { // 获得它的终值 继续resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
            x.then(resolve, reject);
        }
        // 如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try { // 是否是thenable对象（具有then方法的对象/函数）
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, reason => {
                    if(called) return;
                    called = true;
                    reject(reason);
                })
            } else { // 说明是一个普通对象/函数
                resolve(x);
            }
        } catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

/**

* [注册fulfilled状态/rejected状态对应的回调函数]
* @param  {function} onFulfilled fulfilled状态时 执行的函数
* @param  {function} onRejected  rejected状态时 执行的函数
* @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    let newPromise;
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
        typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };

    // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    // 原因:
    // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
    // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

    // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
    // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

    // 如下面这种情景 多次调用p1.then
    // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
    //     console.log(value); // resolve
    //     // console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以[我们](https://www.w3cdoc.com)也要确保判断里面onFuilled异步执行
    //         console.log(value); // 'resolve'
    //     });
    //     console.log('当前执行栈中同步代码');
    // })
    // console.log('全局执行栈中同步代码');
    //

    if (that.status === FULFILLED) { // 成功态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                } catch(e) {
                    reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                }
            });
        })
    }

    if (that.status === REJECTED) { // 失败态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    if (that.status === PENDING) { // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
};

/**

* Promise.all Promise进行并行处理
* 参数: promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function(i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}

/**

* Promise.race
* 参数: 接收 promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
           promise.then(resolve, reject);
        });
    });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

/**

* 基于Promise实现Deferred的
* Deferred和Promise的关系
    * - Deferred 拥有 Promise
    * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）

*
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function() { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**

* Promise/A+规范测试
* npm i -g promises-aplus-tests
* promises-aplus-tests Promise.js
 */

try {
  module.exports = Promise
} catch (e) {
}

<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
```

    <h3>
      Promise测试
    </h3>
    
    ```
npm i -g promises-aplus-tests
promises-aplus-tests Promise.js
```
  </div>
</div>

## 参考

<a href="https://link.jianshu.com/?t=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise" target="_blank" rel="nofollow noopener noreferrer">ES6-promise</a>  
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fpromisesaplus.com%2F" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-英文</a>  
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000002452115" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-翻译1</a>  
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fmalcolmyu.github.io%2F2015%2F06%2F12%2FPromises-A-Plus%2F%23note-4" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-翻译-推荐</a>  
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fwww.cnblogs.com%2Fmqliutie%2Fp%2F4422247.html" target="_blank" rel="nofollow noopener noreferrer">JS执行栈</a>  
<a href="https://link.jianshu.com/?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2012%2F12%2Fasynchronous%25EF%25BC%25BFjavascript.html" target="_blank" rel="nofollow noopener noreferrer">Javascript异步编程的4种方法</a>

<https://juejin.im/post/5c6ad98e6fb9a049d51a0f5e>

<https://www.jianshu.com/p/459a856c476f>
