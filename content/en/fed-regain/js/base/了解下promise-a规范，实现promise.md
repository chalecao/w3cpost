---
title: 了解下Promise A+规范，实现Promise
weight: 10
---
## 实现MyPromise大体框架
从简单使用着手，实现MyPromise大体框架
先来看一下promise使用的一个小例子：

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
```

运行结果如下：

```
start
end
success data1
```

针对这个例子做以下几点说明，也是需要直接记住的，因为这就好比是解答数学题的公式一样，开始一定要记牢。

Promise是构造函数，new 出来的实例有then方法。
- new Promise时，传递一个参数，这个参数是函数，又被称为执行器函数(executor)， 并执行器会被立即调用，也就是上面结果中start最先输出的原因。
- executor是函数，它接受两个参数 resolve reject ，同时这两个参数也是函数。
- new Promise后的实例具有状态， 默认状态是等待，当执行器调用resolve后， 实例状态为成功状态， 当执行器调用reject后，实例状态为失败状态。
- promise翻译过来是承诺的意思，实例的状态一经改变，不能再次修改，不能成功再变失败，或者反过来也不行。
- 每一个promise实例都有方法 then ，then中有两个参数 ，我习惯把第一个参数叫做then的成功回调，把第二个参数叫做then的失败回调，这两个参数也都是函数，当执行器调用resolve后，then中第一个参数函数会执行。当执行器调用reject后，then中第二个参数函数会执行。

那么就目前的这些功能，或者说是规则，来着手写一下MyPromise构造函数吧。
1 构造函数的参数，在new 的过程中会立即执行

```
// 因为会立即执行这个执行器函数
function MyPromise(executor){
  executor(resolve, reject)
}

```
2 new出来的实例具有then方法

```
MyPromise.prototype.then = function(onFulfilled, onRejected){

}

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

```

尝试使用一下这个 MyPromise ：
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

```

运行结果如下：
```
start
end
success data1
```

小结：结果看似对了，不过和原生的promise还是有不同的，就是success那条语句的打印顺序，不要急，MyPromise 还没有写完。

## 完善MyPromise

2 完善MyPromise，添加异步处理和实现一个实例多次调用then方法

还是看原生promise的使用小例子
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

```

运行结果如下
```
start
end
success data1
```
实例多次调用then方法情况（注意不是链式调用）
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

```

运行结果如下
```
start
end
success data1
success data1
```
那么针对这种异步的情况和实例p多次调用then方法，[我们](https://www.w3cdoc.com)上述MyPromise该如何修改呢？


对于异步情况，[我们](https://www.w3cdoc.com)先来看上面的例子，当代码执行到了p.then() 的时候，执行器方法中的resolve(&#8216;data1&#8217;)被setTimeout放到了异步任务队列中，
 
 换句话说，也就是，此时实例p的状态还是默认状态，没有改变，那么[我们](https://www.w3cdoc.com)此时并不知道要去执行then中的第一个参数（成功回调）还是第二个参数（失败回调）。
 
 在不知道哪个回调会被执行的情况下，就需要先把这两个回调函数保存起来，等到时机成熟，确定调用哪个函数的时候，再拿出来调用。
 
 其实就是发布订阅的一个变种，[我们](https://www.w3cdoc.com)在执行一次p.then(),就会then中的参数，也就是把成功回调和失败回调都保存起来（订阅），执行器执行了resolve方法或者reject方法时，[我们](https://www.w3cdoc.com)去执行刚保存起来的函数（发布）。

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

```

小结 这样修改后，[我们](https://www.w3cdoc.com)执行器方法中，有异步函数的情况时，p.then执行就会把对应的两个参数保存起来了。那么在什么时候调用呢？答，肯定是在执行器中的resolve执行时候或者reject执行时候。
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

```

[我们](https://www.w3cdoc.com)来测试一下这个升级版的MyPrimise吧
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

```

运行结果如下,显示打印start和end，两秒后一起打印的两个 success：data1
```
start
end
success data1
success data1
```
小结： 下面这里，为什么能拿到self.value的值，值得好好思考一下呦
```
self.onResolvedCallbacks.push(function(){
onFulfilled(self.value)
}) 
```

## 参考

<a href="https://link.jianshu.com/?t=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fpromise" target="_blank" rel="nofollow noopener noreferrer">ES6-promise</a>
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fpromisesaplus.com%2F" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-英文</a>
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000002452115" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-翻译1</a>
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fmalcolmyu.github.io%2F2015%2F06%2F12%2FPromises-A-Plus%2F%23note-4" target="_blank" rel="nofollow noopener noreferrer">Promises/A+规范-翻译-推荐</a>
<a href="https://link.jianshu.com/?t=https%3A%2F%2Fwww.cnblogs.com%2Fmqliutie%2Fp%2F4422247.html" target="_blank" rel="nofollow noopener noreferrer">JS执行栈</a>
<a href="https://link.jianshu.com/?t=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2012%2F12%2Fasynchronous%25EF%25BC%25BFjavascript.html" target="_blank" rel="nofollow noopener noreferrer">Javascript异步编程的4种方法</a>

<https://juejin.im/post/5c6ad98e6fb9a049d51a0f5e>

<https://www.jianshu.com/p/459a856c476f>
