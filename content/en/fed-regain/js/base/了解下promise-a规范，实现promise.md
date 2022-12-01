---
title: 了解下Promise A+规范，实现Promise




---
<div>
  <h2 class="heading" data-id="heading-1">
    1 从简单使用着手，实现MyPromise大体框架
  </h2>
  
  <blockquote>
    <p>
      先来看一下promise使用的一个小例子：
    </p>
  </blockquote>
  
  <pre><code class="copyable">let p = new Promise(function (resolve, reject) {
  console.log('start')
  resolve('data1')
})
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
console.log('end')
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      运行结果如下：
    </p>
  </blockquote><figure>
  
  <p id="MoHvJRp">
    <img loading="lazy" width="185" height="85" class="alignnone size-full wp-image-5128 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff5529e93.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff5529e93.png?x-oss-process=image/format,webp" alt="" />
  </p><figcaption></figcaption></figure>
  
  <blockquote>
    <p>
      针对这个例子做以下几点说明，也是需要直接记住的，因为这就好比是解答数学题的公式一样，开始一定要记牢。
    </p>
  </blockquote>
  
  <ol>
    <li>
      Promise是构造函数，new 出来的实例有then方法。
    </li>
    <li>
      new Promise时，传递一个参数，这个参数是函数，又被称为执行器函数(executor)， 并执行器会被立即调用，也就是上面结果中start最先输出的原因。
    </li>
    <li>
      executor是函数，它接受两个参数 resolve reject ，同时这两个参数也是函数。
    </li>
    <li>
      new Promise后的实例具有状态， 默认状态是等待，当执行器调用resolve后， 实例状态为成功状态， 当执行器调用reject后，实例状态为失败状态。
    </li>
    <li>
      promise翻译过来是承诺的意思，实例的状态一经改变，不能再次修改，不能成功再变失败，或者反过来也不行。
    </li>
    <li>
      每一个promise实例都有方法 then ，then中有两个参数 ，<strong>我习惯把第一个参数叫做then的成功回调，把第二个参数叫做then的失败回调</strong>，这两个参数也都是函数，当执行器调用resolve后，then中第一个参数函数会执行。当执行器调用reject后，then中第二个参数函数会执行。
    </li>
  </ol>
  
  <blockquote>
    <p>
      那么就目前的这些功能，或者说是规则，来着手写一下MyPromise构造函数吧。
    </p>
  </blockquote>
  
  <p>
    1 构造函数的参数，在new 的过程中会立即执行
  </p>
  
  <pre><code class="copyable">// 因为会立即执行这个执行器函数
function MyPromise(executor){
  executor(resolve, reject)
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    2 new出来的实例具有then方法
  </p>
  
  <pre><code class="copyable">MyPromise.prototype.then = function(onFulfilled, onRejected){

}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    3 new出来的实例具有默认状态，执行器执行resolve或者reject，修改状态
  </p>
  
  <pre><code class="copyable">function MyPromise(executor){
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
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    4 当执行器调用resolve后，then中第一个参数函数（成功回调）会执行,当执行器调用reject后，then中第二个参数函数（失败回调）会执行
  </p>
  
  <pre><code class="copyable">MyPromise.prototype.then = function(onFulfilled, onRejected){
  let self = this
  if(self.status === 'resolved'){
    onFulfilled()
  }
  if(self.status === 'rejected'){
    onRejected()
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    5 保证promise实例状态一旦变更不能再次改变，只有在pending时候才可以变状态
  </p>
  
  <pre><code class="copyable">function Promise(executor){
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
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    6 执行器执行resolve方法传的值，传递给then中第一个参数函数中
  </p>
  
  <pre><code class="copyable">function MyPromise(executor){
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
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      尝试使用一下这个 MyPromise ：
    </p>
  </blockquote>
  
  <pre><code class="copyable">let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  resolve('data2')
})
p.then(
  (v) =&gt; {
    console.log('success ' + v)
  },
  (v) =&gt; {
  console.log('error ' + v)
  }
)
console.log('end')
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      运行结果如下：
    </p>
  </blockquote><figure>
  
  <p id="Nfcrvjm">
    <img loading="lazy" width="187" height="89" class="alignnone size-full wp-image-5129 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff677627f.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff677627f.png?x-oss-process=image/format,webp" alt="" />
  </p><figcaption></figcaption></figure>
  
  <blockquote>
    <p>
      小结：结果看似对了，不过和原生的promise还是有不同的，就是success那条语句的打印顺序，不要急，MyPromise 还没有写完。
    </p>
  </blockquote>
  
  <h2 class="heading" data-id="heading-2">
    2 完善MyPromise，添加异步处理和实现一个实例多次调用then方法
  </h2>
  
  <blockquote>
    <p>
      还是看原生promise的使用小例子
    </p>
  </blockquote>
  
  <pre><code class="copyable">let p = new Promise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
console.log('end')
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      运行结果如下
    </p>
  </blockquote><figure>
  
  <p id="zjwzKeb">
    <img loading="lazy" width="194" height="88" class="alignnone size-full wp-image-5130 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff768e672.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff768e672.png?x-oss-process=image/format,webp" alt="" />
  </p><figcaption></figcaption></figure>
  
  <blockquote>
    <p>
      实例多次调用then方法情况（注意不是链式调用）
    </p>
  </blockquote>
  
  <pre><code class="copyable">let p = new Promise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
console.log('end')
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      运行结果如下
    </p>
  </blockquote><figure>
  
  <p id="dACnRXM">
    <img loading="lazy" width="188" height="113" class="alignnone size-full wp-image-5131 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff86c3aba.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff86c3aba.png?x-oss-process=image/format,webp" alt="" />
  </p><figcaption></figcaption></figure>
  
  <blockquote>
    <p>
      那么针对这种异步的情况和实例p多次调用then方法，[我们](https://www.w3cdoc.com)上述MyPromise该如何修改呢？
    </p>
  </blockquote>
  
  <ol>
    <li>
      对于异步情况，[我们](https://www.w3cdoc.com)先来看上面的例子，当代码执行到了p.then() 的时候，执行器方法中的resolve(&#8216;data1&#8217;)被setTimeout放到了异步任务队列中，
    </li>
    <li>
      换句话说，也就是，此时实例p的状态还是默认状态，没有改变，那么[我们](https://www.w3cdoc.com)此时并不知道要去执行then中的第一个参数（成功回调）还是第二个参数（失败回调）。
    </li>
    <li>
      在不知道哪个回调会被执行的情况下，就需要先把这两个回调函数保存起来，等到时机成熟，确定调用哪个函数的时候，再拿出来调用。
    </li>
    <li>
      其实就是发布订阅的一个变种，[我们](https://www.w3cdoc.com)在执行一次p.then(),就会then中的参数，也就是把成功回调和失败回调都保存起来（订阅），执行器执行了resolve方法或者reject方法时，[我们](https://www.w3cdoc.com)去执行刚保存起来的函数（发布）。
    </li>
  </ol>
  
  <p>
    此阶段MyPromise升级代码如下
  </p>
  
  <pre><code class="copyable">//省略其余等待，突出增加的点，等下发完整版
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
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      小结 这样修改后，[我们](https://www.w3cdoc.com)执行器方法中，有异步函数的情况时，p.then执行就会把对应的两个参数保存起来了。那么在什么时候调用呢？答，肯定是在执行器中的resolve执行时候或者reject执行时候。
    </p>
  </blockquote>
  
  <p>
    接下来贴出这阶段改动的完整代码。
  </p>
  
  <pre><code class="copyable">function MyPromise(executor){
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
      self.onResolvedCallbacks.forEach(fn =&gt; {
        fn()
      })
    }
  }
  function reject(reason){
    if(self.status === 'pending'){
      self.reason = reason
      self.status = 'rejected' //失败状态
      self.onRejectedCallbacks.forEach(fn =&gt; {
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
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      [我们](https://www.w3cdoc.com)来测试一下这个升级版的MyPrimise吧
    </p>
  </blockquote>
  
  <pre><code class="copyable">let p = new MyPromise(function (resolve, reject) {
  console.log('start')
  setTimeout(function(){
      resolve('data1')
  },2000)
})
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
p.then(
  (v) =&gt; {
    console.log('success： ' + v)
  },
  (v) =&gt; {
    console.log('error： ' + v)
  }
)
console.log('end')
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      运行结果如下,显示打印start和end，两秒后一起打印的两个 success：data1
    </p>
  </blockquote><figure>
  
  <p id="yUjwvTQ">
    <img loading="lazy" width="184" height="113" class="alignnone size-full wp-image-5132 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff96a5c9d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db7ff96a5c9d.png?x-oss-process=image/format,webp" alt="" />
  </p><figcaption></figcaption></figure>
  
  <blockquote>
    <p>
      小结： 下面这里，为什么能拿到self.value的值，值得好好思考一下呦
    </p>
  </blockquote>
  
  <pre><code class="copyable">self.onResolvedCallbacks.push(function(){
  onFulfilled(self.value)
}) </code></pre>
</div>

<div>
  <div>
    <h2>
      另一种实现
    </h2>

    <h3>
      什么是Promise?
    </h3>
    
    <blockquote>
      <p>
        Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行Javascript异步编程解决方案之一
      </p>
    </blockquote>
    
    <h3>
      2.对于几种常见异步编程方案
    </h3>
    
    <ul>
      <li>
        回调函数
      </li>
      <li>
        事件监听
      </li>
      <li>
        发布/订阅
      </li>
      <li>
        Promise对象
      </li>
    </ul>
    
    <h4>
      这里就拿回调函数说说
    </h4>
    
    <p>
      1.对于回调函数 [我们](https://www.w3cdoc.com)用Jquery的ajax获取数据时 都是以回调函数方式获取的数据
    </p>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">$&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">get&lt;/span>&lt;span class="token punctuation">(&lt;/span>url&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">)&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      2.如果说 当[我们](https://www.w3cdoc.com)需要发送多个异步请求 并且每个请求之间需要相互依赖 那这时 [我们](https://www.w3cdoc.com)只能 以嵌套方式来解决 形成 &#8220;回调地狱&#8221;
    </p>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">$&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">get&lt;/span>&lt;span class="token punctuation">(&lt;/span>url&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">data1&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data1&lt;span class="token punctuation">)&lt;/span>
    $&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">get&lt;/span>&lt;span class="token punctuation">(&lt;/span>data1&lt;span class="token punctuation">.&lt;/span>url&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">data2&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data1&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <blockquote>
      <p>
        这样一来，在处理越多的异步逻辑时，就需要越深的回调嵌套，这种编码模式的问题主要有以下几个：
      </p>
    </blockquote>
    
    <ul>
      <li>
        代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
      </li>
      <li>
        异步操作的顺序变更时，需要大规模的代码重构。
      </li>
      <li>
        回调函数基本都是匿名函数，bug 追踪困难。
      </li>
      <li>
        回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。
      </li>
    </ul>
    
    <h4>
      Promise 处理多个相互关联的异步请求
    </h4>
    
    <p>
      1.而[我们](https://www.w3cdoc.com)Promise 可以更直观的方式 来解决 &#8220;回调地狱&#8221;
    </p>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">&lt;span class="token keyword">const&lt;/span> &lt;span class="token function-variable function">request&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token parameter">url&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span> 
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        $&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">get&lt;/span>&lt;span class="token punctuation">(&lt;/span>url&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">data&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>data&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment">// 请求data1&lt;/span>
&lt;span class="token function">request&lt;/span>&lt;span class="token punctuation">(&lt;/span>url&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data1&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token function">request&lt;/span>&lt;span class="token punctuation">(&lt;/span>data1&lt;span class="token punctuation">.&lt;/span>url&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data2&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token function">request&lt;/span>&lt;span class="token punctuation">(&lt;/span>data2&lt;span class="token punctuation">.&lt;/span>url&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data3&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data3&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">err&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token keyword">throw&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Error&lt;/span>&lt;span class="token punctuation">(&lt;/span>err&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      2.相信[大家](https://www.w3cdoc.com)在 vue/react 都是用axios fetch 请求数据 也都支持 Promise API
    </p>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">import&lt;/span> axios &lt;span class="token keyword">from&lt;/span> &lt;span class="token string">'axios'&lt;/span>&lt;span class="token punctuation">;&lt;/span>
axios&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">get&lt;/span>&lt;span class="token punctuation">(&lt;/span>url&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
   console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <blockquote>
      <p>
        Axios 是一个基于 promise 的 HTTP 库，可以用在[浏览器](https://www.w3cdoc.com)和 node.js 中。
      </p>
    </blockquote>
    
    <h3>
      3.Promise使用
    </h3>
    
    <h4>
      1.Promise 是一个构造函数， new Promise 返回一个 promise对象 接收一个excutor执行函数作为参数, excutor有两个函数类型形参resolve reject
    </h4>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">const&lt;/span> promise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
       &lt;span class="token comment">// 异步处理&lt;/span>
       &lt;span class="token comment">// 处理结束后、调用resolve 或 reject&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <h4>
      2.promise相当于一个状态机
    </h4>
    
    <p>
      promise的三种状态
    </p>
    
    <ul>
      <li>
        pending
      </li>
      <li>
        fulfilled
      </li>
      <li>
        rejected
      </li>
    </ul>
    
    <p>
      1.promise 对象初始化状态为 pending<br /> 2.当调用resolve(成功)，会由pending => fulfilled<br /> 3.当调用reject(失败)，会由pending => rejected
    </p>
    
    <blockquote>
      <p>
        注意promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变
      </p>
    </blockquote>
    
    <h4>
      3.promise对象方法
    </h4>
    
    <p>
      1.then方法注册 当resolve(成功)/reject(失败)的回调函数
    </p>
    
    <pre class="line-numbers language-cpp"><code class=" language-cpp">&lt;span class="token comment">// onFulfilled 是用来接收promise成功的值&lt;/span>
&lt;span class="token comment">// onRejected 是用来接收promise失败的原因&lt;/span>
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>onFulfilled&lt;span class="token punctuation">,&lt;/span> onRejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <blockquote>
      <p>
        then方法是异步执行的
      </p>
    </blockquote>
    
    <p>
      2.resolve(成功) onFulfilled会被调用
    </p>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">&lt;span class="token keyword">const&lt;/span> promise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
   &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'fulfilled'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 状态由 pending =&gt; fulfilled&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">result&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// onFulfilled&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>result&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 'fulfilled' &lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">reason&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// onRejected 不会被调用&lt;/span>

&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      3.reject(失败) onRejected会被调用
    </p>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">&lt;span class="token keyword">const&lt;/span> promise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
   &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'rejected'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 状态由 pending =&gt; rejected&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">result&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// onFulfilled 不会被调用&lt;/span>
  
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">reason&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// onRejected &lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>rejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 'rejected'&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      4.promise.catch
    </p>
    
    <blockquote>
      <p>
        在链式写法中可以捕获前面then中发送的异常,
      </p>
    </blockquote>
    
    <pre class="line-numbers language-csharp"><code class=" language-csharp">promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>onRejected&lt;span class="token punctuation">)&lt;/span>
相当于
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">null&lt;/span>&lt;span class="token punctuation">,&lt;/span> onRrejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment">// 注意&lt;/span>
&lt;span class="token comment">// onRejected 不能捕获当前onFulfilled中的异常&lt;/span>
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>onFulfilled&lt;span class="token punctuation">,&lt;/span> onRrejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment">// 可以写成：&lt;/span>
promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>onFulfilled&lt;span class="token punctuation">)&lt;/span>
       &lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>onRrejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <h4>
      4.promise chain
    </h4>
    
    <blockquote>
      <p>
        promise.then方法每次调用 都返回一个新的promise对象 所以可以链式写法
      </p>
    </blockquote>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">taskA&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"Task A"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">taskB&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"Task B"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">onRejected&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">error&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"Catch Error: A or B"&lt;/span>&lt;span class="token punctuation">,&lt;/span> error&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token keyword">var&lt;/span> promise &lt;span class="token operator">=&lt;/span> Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
promise
    &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>taskA&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>taskB&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>onRejected&lt;span class="token punctuation">)&lt;/span> &lt;span class="token comment">// 捕获前面then方法中的异常&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <h4>
      5.Promise的静态方法
    </h4>
    
    <p>
      1.Promise.resolve 返回一个fulfilled状态的promise对象
    </p>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'hello'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">value&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
    console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>value&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'hello'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment">// 相当于&lt;/span>
&lt;span class="token keyword">const&lt;/span> promise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
   &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'hello'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      2.Promise.reject 返回一个rejected状态的promise对象
    </p>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">24&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
   &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">24&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      3.Promise.all 接收一个promise对象数组为参数
    </p>
    
    <blockquote>
      <p>
        只有全部为resolve才会调用 通常会用来处理 多个并行异步操作
      </p>
    </blockquote>
    
    <pre class="line-numbers language-tsx"><code class=" language-tsx">&lt;span class="token keyword">const&lt;/span> p1 &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">const&lt;/span> p2 &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">2&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">const&lt;/span> p3 &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">3&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token builtin">Promise&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">all&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">[&lt;/span>p1&lt;span class="token punctuation">,&lt;/span> p2&lt;span class="token punctuation">,&lt;/span> p3&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">data&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>data&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// [1, 2, 3] 结果顺序和promise实例数组顺序是一致的&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">err&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token builtin">console&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>err&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <p>
      4.Promise.race 接收一个promise对象数组为参数
    </p>
    
    <blockquote>
      <p>
        Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。
      </p>
    </blockquote>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">timerPromisefy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">delay&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>delay&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> delay&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
&lt;span class="token keyword">var&lt;/span> startDate &lt;span class="token operator">=&lt;/span> Date&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">now&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">race&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">[&lt;/span>
    &lt;span class="token function">timerPromisefy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">10&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token function">timerPromisefy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">20&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token function">timerPromisefy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">30&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">values&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>values&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 10&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <h3>
      4. Promise 代码实现
    </h3>
    
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token comment">/**

* Promise 实现 遵循promise/A+规范
* Promise/A+规范译文:
* https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/#note-4
 */&lt;/span>

&lt;span class="token comment">// promise 三个状态&lt;/span>
&lt;span class="token keyword">const&lt;/span> &lt;span class="token constant">PENDING&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"pending"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">const&lt;/span> &lt;span class="token constant">FULFILLED&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"fulfilled"&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">const&lt;/span> &lt;span class="token constant">REJECTED&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token string">"rejected"&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">excutor&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">let&lt;/span> that &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 缓存当前promise实例对象&lt;/span>
    that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">PENDING&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 初始状态&lt;/span>
    that&lt;span class="token punctuation">.&lt;/span>value &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">undefined&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// fulfilled状态时 返回的信息&lt;/span>
    that&lt;span class="token punctuation">.&lt;/span>reason &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">undefined&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// rejected状态时 拒绝的原因&lt;/span>
    that&lt;span class="token punctuation">.&lt;/span>onFulfilledCallbacks &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 存储fulfilled状态对应的onFulfilled函数&lt;/span>
    that&lt;span class="token punctuation">.&lt;/span>onRejectedCallbacks &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 存储rejected状态对应的onRejected函数&lt;/span>

    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">value&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// value成功态时接收的终值&lt;/span>
        &lt;span class="token keyword">if&lt;/span>&lt;span class="token punctuation">(&lt;/span>value &lt;span class="token keyword">instanceof&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> value&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token comment">// 为什么resolve 加setTimeout?&lt;/span>
        &lt;span class="token comment">// 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.&lt;/span>
        &lt;span class="token comment">// 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。&lt;/span>

        &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token comment">// 调用resolve 回调对应onFulfilled函数&lt;/span>
            &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">PENDING&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token comment">// 只能由pedning状态 =&gt; fulfilled状态 (避免调用多次resolve reject)&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">FULFILLED&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>value &lt;span class="token operator">=&lt;/span> value&lt;span class="token punctuation">;&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>onFulfilledCallbacks&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">forEach&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">cb&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">cb&lt;/span>&lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>value&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">reason&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// reason失败态时接收的拒因&lt;/span>
        &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token comment">// 调用reject 回调对应onRejected函数&lt;/span>
            &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">PENDING&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token comment">// 只能由pedning状态 =&gt; rejected状态 (避免调用多次resolve reject)&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">REJECTED&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>reason &lt;span class="token operator">=&lt;/span> reason&lt;span class="token punctuation">;&lt;/span>
                that&lt;span class="token punctuation">.&lt;/span>onRejectedCallbacks&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">forEach&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">cb&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">cb&lt;/span>&lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token comment">// 捕获在excutor执行器中抛出的异常&lt;/span>
    &lt;span class="token comment">// new Promise((resolve, reject) =&gt; {&lt;/span>
    &lt;span class="token comment">//     throw new Error('error in excutor')&lt;/span>
    &lt;span class="token comment">// })&lt;/span>
    &lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">excutor&lt;/span>&lt;span class="token punctuation">(&lt;/span>resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span> &lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">/**

* resolve中的值几种情况：
* 1.普通值
* 2.promise对象
* 3.thenable对象/函数
 */&lt;/span>

&lt;span class="token comment">/**

* 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
* @param  {promise} promise2 promise1.then方法返回的新的promise对象
* @param  {[type]} x         promise1中onFulfilled的返回值
* @param  {[type]} resolve   promise2的resolve方法
* @param  {[type]} reject    promise2的reject方法
 */&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">promise2&lt;span class="token punctuation">,&lt;/span> x&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>promise2 &lt;span class="token operator">===&lt;/span> x&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>  &lt;span class="token comment">// 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">TypeError&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'循环引用'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">let&lt;/span> called &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">false&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 避免多次调用&lt;/span>
    &lt;span class="token comment">// 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）&lt;/span>
    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>x &lt;span class="token keyword">instanceof&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 获得它的终值 继续resolve&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>x&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">PENDING&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 如果为等待态需等待直至 x 被执行或拒绝 并解析y值&lt;/span>
            x&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">y&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>promise2&lt;span class="token punctuation">,&lt;/span> y&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">reason&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise&lt;/span>
            x&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token comment">// 如果 x 为对象或者函数&lt;/span>
    &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>x &lt;span class="token operator">!=&lt;/span> &lt;span class="token keyword">null&lt;/span> &lt;span class="token operator">&&&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">typeof&lt;/span> x &lt;span class="token operator">===&lt;/span> &lt;span class="token string">'object'&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">||&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">typeof&lt;/span> x &lt;span class="token operator">===&lt;/span> &lt;span class="token string">'function'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 是否是thenable对象（具有then方法的对象/函数）&lt;/span>
            &lt;span class="token keyword">let&lt;/span> then &lt;span class="token operator">=&lt;/span> x&lt;span class="token punctuation">.&lt;/span>then&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">typeof&lt;/span> then &lt;span class="token operator">===&lt;/span> &lt;span class="token string">'function'&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">call&lt;/span>&lt;span class="token punctuation">(&lt;/span>x&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">y&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">if&lt;/span>&lt;span class="token punctuation">(&lt;/span>called&lt;span class="token punctuation">)&lt;/span> &lt;span class="token keyword">return&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    called &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>promise2&lt;span class="token punctuation">,&lt;/span> y&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token parameter">reason&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">if&lt;/span>&lt;span class="token punctuation">(&lt;/span>called&lt;span class="token punctuation">)&lt;/span> &lt;span class="token keyword">return&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    called &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
            &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 说明是一个普通对象/函数&lt;/span>
                &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>x&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">if&lt;/span>&lt;span class="token punctuation">(&lt;/span>called&lt;span class="token punctuation">)&lt;/span> &lt;span class="token keyword">return&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            called &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>x&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">/**

* [注册fulfilled状态/rejected状态对应的回调函数]
* @param  {function} onFulfilled fulfilled状态时 执行的函数
* @param  {function} onRejected  rejected状态时 执行的函数
* @return {function} newPromsie  返回一个新的promise对象
 */&lt;/span>
&lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">.&lt;/span>prototype&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">then&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">onFulfilled&lt;span class="token punctuation">,&lt;/span> onRejected&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">const&lt;/span> that &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">let&lt;/span> newPromise&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token comment">// 处理参数默认值 保证参数后续能够继续执行&lt;/span>
    onFulfilled &lt;span class="token operator">=&lt;/span>
        &lt;span class="token keyword">typeof&lt;/span> onFulfilled &lt;span class="token operator">===&lt;/span> &lt;span class="token string">"function"&lt;/span> &lt;span class="token operator">?&lt;/span> &lt;span class="token function-variable function">onFulfilled&lt;/span> &lt;span class="token punctuation">:&lt;/span> &lt;span class="token parameter">value&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> value&lt;span class="token punctuation">;&lt;/span>
    onRejected &lt;span class="token operator">=&lt;/span>
        &lt;span class="token keyword">typeof&lt;/span> onRejected &lt;span class="token operator">===&lt;/span> &lt;span class="token string">"function"&lt;/span> &lt;span class="token operator">?&lt;/span> &lt;span class="token function-variable function">onRejected&lt;/span> &lt;span class="token punctuation">:&lt;/span> &lt;span class="token parameter">reason&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">throw&lt;/span> reason&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>

    &lt;span class="token comment">// then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?&lt;/span>
    &lt;span class="token comment">// 原因:&lt;/span>
    &lt;span class="token comment">// 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout&lt;/span>
    &lt;span class="token comment">// 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected&lt;/span>

    &lt;span class="token comment">// 其二 2.2.6规范 也是resolve函数里加setTimeout的原因&lt;/span>
    &lt;span class="token comment">// 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行&lt;/span>

    &lt;span class="token comment">// 如下面这种情景 多次调用p1.then&lt;/span>
    &lt;span class="token comment">// p1.then((value) =&gt; { // 此时p1.status 由pedding状态 =&gt; fulfilled状态&lt;/span>
    &lt;span class="token comment">//     console.log(value); // resolve&lt;/span>
    &lt;span class="token comment">//     // console.log(p1.status); // fulfilled&lt;/span>
    &lt;span class="token comment">//     p1.then(value =&gt; { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以[我们](https://www.w3cdoc.com)也要确保判断里面onFuilled异步执行&lt;/span>
    &lt;span class="token comment">//         console.log(value); // 'resolve'&lt;/span>
    &lt;span class="token comment">//     });&lt;/span>
    &lt;span class="token comment">//     console.log('当前执行栈中同步代码');&lt;/span>
    &lt;span class="token comment">// })&lt;/span>
    &lt;span class="token comment">// console.log('全局执行栈中同步代码');&lt;/span>
    &lt;span class="token comment">//&lt;/span>

    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">FULFILLED&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 成功态&lt;/span>
        &lt;span class="token keyword">return&lt;/span> newPromise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token keyword">try&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">let&lt;/span> x &lt;span class="token operator">=&lt;/span> &lt;span class="token function">onFulfilled&lt;/span>&lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>value&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>newPromise&lt;span class="token punctuation">,&lt;/span> x&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 新的promise resolve 上一个onFulfilled的返回值&lt;/span>
                &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">REJECTED&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 失败态&lt;/span>
        &lt;span class="token keyword">return&lt;/span> newPromise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">let&lt;/span> x &lt;span class="token operator">=&lt;/span> &lt;span class="token function">onRejected&lt;/span>&lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>newPromise&lt;span class="token punctuation">,&lt;/span> x&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>that&lt;span class="token punctuation">.&lt;/span>status &lt;span class="token operator">===&lt;/span> &lt;span class="token constant">PENDING&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 等待态&lt;/span>
        &lt;span class="token comment">// 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中&lt;/span>
        &lt;span class="token keyword">return&lt;/span> newPromise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            that&lt;span class="token punctuation">.&lt;/span>onFulfilledCallbacks&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">value&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">let&lt;/span> x &lt;span class="token operator">=&lt;/span> &lt;span class="token function">onFulfilled&lt;/span>&lt;span class="token punctuation">(&lt;/span>value&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>newPromise&lt;span class="token punctuation">,&lt;/span> x&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            that&lt;span class="token punctuation">.&lt;/span>onRejectedCallbacks&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">reason&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token keyword">let&lt;/span> x &lt;span class="token operator">=&lt;/span> &lt;span class="token function">onRejected&lt;/span>&lt;span class="token punctuation">(&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                    &lt;span class="token function">resolvePromise&lt;/span>&lt;span class="token punctuation">(&lt;/span>newPromise&lt;span class="token punctuation">,&lt;/span> x&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token comment">/**

* Promise.all Promise进行并行处理
* 参数: promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */&lt;/span>
Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">all&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">promises&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">let&lt;/span> done &lt;span class="token operator">=&lt;/span> &lt;span class="token function">gen&lt;/span>&lt;span class="token punctuation">(&lt;/span>promises&lt;span class="token punctuation">.&lt;/span>length&lt;span class="token punctuation">,&lt;/span> resolve&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        promises&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">forEach&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">promise&lt;span class="token punctuation">,&lt;/span> index&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">value&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">done&lt;/span>&lt;span class="token punctuation">(&lt;/span>index&lt;span class="token punctuation">,&lt;/span> value&lt;span class="token punctuation">)&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">gen&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">length&lt;span class="token punctuation">,&lt;/span> resolve&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">let&lt;/span> count &lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">let&lt;/span> values &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">i&lt;span class="token punctuation">,&lt;/span> value&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        values&lt;span class="token punctuation">[&lt;/span>i&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> value&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">++&lt;/span>count &lt;span class="token operator">===&lt;/span> length&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>values&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>values&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">/**

* Promise.race
* 参数: 接收 promise对象组成的数组作为参数
* 返回值: 返回一个Promise实例
* 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */&lt;/span>
Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">race&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">promises&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        promises&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">forEach&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">promise&lt;span class="token punctuation">,&lt;/span> index&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
           promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常&lt;/span>
&lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">.&lt;/span>prototype&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">catch&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">onRejected&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">then&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">null&lt;/span>&lt;span class="token punctuation">,&lt;/span> onRejected&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">resolve&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">value&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">resolve&lt;/span>&lt;span class="token punctuation">(&lt;/span>value&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">reject&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">reason&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">reject&lt;/span>&lt;span class="token punctuation">(&lt;/span>reason&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">/**

* 基于Promise实现Deferred的
* Deferred和Promise的关系
    * - Deferred 拥有 Promise
    * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）

*
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */&lt;/span>
Promise&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function-variable function">deferred&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span> &lt;span class="token comment">// 延迟对象&lt;/span>
    &lt;span class="token keyword">let&lt;/span> defer &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    defer&lt;span class="token punctuation">.&lt;/span>promise &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Promise&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">resolve&lt;span class="token punctuation">,&lt;/span> reject&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        defer&lt;span class="token punctuation">.&lt;/span>resolve &lt;span class="token operator">=&lt;/span> resolve&lt;span class="token punctuation">;&lt;/span>
        defer&lt;span class="token punctuation">.&lt;/span>reject &lt;span class="token operator">=&lt;/span> reject&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> defer&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

&lt;span class="token comment">/**

* Promise/A+规范测试
* npm i -g promises-aplus-tests
* promises-aplus-tests Promise.js
 */&lt;/span>

&lt;span class="token keyword">try&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  module&lt;span class="token punctuation">.&lt;/span>exports &lt;span class="token operator">=&lt;/span> Promise
&lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">catch&lt;/span> &lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

</code><button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></pre>

    <h3>
      Promise测试
    </h3>
    
    <pre class="line-numbers language-css"><code class=" language-css">npm i -g promises-aplus-tests
promises-aplus-tests Promise.js</code></pre>
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
