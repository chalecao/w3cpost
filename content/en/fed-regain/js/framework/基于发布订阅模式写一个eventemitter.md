---
title: 基于发布订阅模式写一个eventEmitter

---
<div>
 本文标题的题目是由其他问题延伸而来,面试中面试官的常用套路,揪住一个问题一直深挖,在产生这个问题之前一定是这个问题.
  
  <blockquote>
    
      React/Vue不同组件之间是怎么通信的?
    
  </blockquote>
Vue
  
  <ol>
    
      父子组件用Props通信
    
    
      非父子组件用Event Bus通信
    
    
      如果项目够复杂,可能需要Vuex等全局状态管理库通信
    
    
      $dispatch(已经废除)和$broadcast(已经废除)
    
  </ol>
React
  
  <ol>
    
      父子组件,父->子直接用Props,子->父用callback回调
    
    
      非父子组件,用发布订阅模式的Event模块
    
    
      项目复杂的话用Redux、Mobx等全局状态管理管库
    
    
      用新的<a href="https://juejin.im/post/5a7b41605188257a6310fbec" target="_blank" rel="noopener noreferrer">Context Api</a>
    
  </ol>
 [我们](https://www.w3cdoc.com)大体上都会有以上回答,接下来很可能会问到如何实现Event(Bus),因为这个东西太重要了,几乎所有的模块通信都是基于类似的模式,包括安卓开发中的Event Bus,Node.js中的Event模块(Node中几乎所有的模块都依赖于Event,包括不限于http、stream、buffer、fs等).
  
 [我们](https://www.w3cdoc.com)仿照Node中<a href="https://link.juejin.im?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fevents.html" target="_blank" rel="nofollow noopener noreferrer">Event API</a>实现一个简单的Event库,他是发布订阅模式的典型应用.
  
 欢迎学习[前端](https://www.w3cdoc.com)知识体系课程，本系列属于：<a href="https://www.f2e123.com/fed-regain">[前端](https://www.w3cdoc.com)增长教程</a>
  
 在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>
  
  <blockquote>
    
     提前声明: [我们](https://www.w3cdoc.com)没有对传入的参数进行及时判断而规避错误,仅仅对核心方法进行了实现.
    
  </blockquote>
  <hr />
  <h3 class="heading" data-id="heading-3">
    1.基本构造
  </h3>
1.1初始化class
  
 [我们](https://www.w3cdoc.com)利用ES6的class关键字对Event进行初始化,包括Event的事件清单和监听者上限.
  
 [我们](https://www.w3cdoc.com)选择了Map作为储存事件的结构,因为作为键值对的储存方式Map比一般对象更加适合,[我们](https://www.w3cdoc.com)操作起来也更加简洁,可以先看一下Map的<a href="https://link.juejin.im?target=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fset-map%23Map" target="_blank" rel="nofollow noopener noreferrer">基本用法与特点</a>.
  
  ```
&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">EventEmeitter&lt;/span> &lt;/span>{
  &lt;span class="hljs-keyword">constructor&lt;/span>() {
    &lt;span class="hljs-keyword">this&lt;/span>._events = &lt;span class="hljs-keyword">this&lt;/span>._events || &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Map&lt;/span>(); &lt;span class="hljs-comment">// 储存事件/回调键值对&lt;/span>
    &lt;span class="hljs-keyword">this&lt;/span>._maxListeners = &lt;span class="hljs-keyword">this&lt;/span>._maxListeners || &lt;span class="hljs-number">10&lt;/span>; &lt;span class="hljs-comment">// 设立监听上限&lt;/span>
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
1.2 监听与触发
  
 触发监听函数[我们](https://www.w3cdoc.com)可以用apply与call两种方法,在少数参数时call的性能更好,多个参数时apply性能更好,当年Node的Event模块就在三个参数以下用call否则用apply.
  
 当然当Node全面拥抱ES6+之后,相应的call/apply操作用Reflect新关键字重写了,但是[我们](https://www.w3cdoc.com)不想写的那么复杂,就做了一个简化版.
  
  ```

&lt;span class="hljs-comment">// 触发名为type的事件&lt;/span>
EventEmeitter.prototype.emit = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">type, ...args&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">let&lt;/span> handler;
  &lt;span class="hljs-comment">// 从储存事件键值对的this._events中获取对应事件回调函数&lt;/span>
  handler = &lt;span class="hljs-keyword">this&lt;/span>._events.get(type);
  &lt;span class="hljs-keyword">if&lt;/span> (args.length > &lt;span class="hljs-number">0&lt;/span>) {
    handler.apply(&lt;span class="hljs-keyword">this&lt;/span>, args);
  } &lt;span class="hljs-keyword">else&lt;/span> {
    handler.call(&lt;span class="hljs-keyword">this&lt;/span>);
  }
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">true&lt;/span>;
};

&lt;span class="hljs-comment">// 监听名为type的事件&lt;/span>
EventEmeitter.prototype.addListener = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">type, fn&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// 将type事件以及对应的fn函数放入this._events中储存&lt;/span>
  &lt;span class="hljs-keyword">if&lt;/span> (!&lt;span class="hljs-keyword">this&lt;/span>._events.get(type)) {
    &lt;span class="hljs-keyword">this&lt;/span>._events.set(type, fn);
  }
};

&lt;span class="copy-code-btn">复制代码&lt;/span>
```
 [我们](https://www.w3cdoc.com)实现了触发事件的emit方法和监听事件的addListener方法,至此[我们](https://www.w3cdoc.com)就可以进行简单的实践了.
  
  ```
&lt;span class="hljs-comment">// 实例化&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> emitter = &lt;span class="hljs-keyword">new&lt;/span> EventEmeitter();

&lt;span class="hljs-comment">// 监听一个名为arson的事件对应一个回调函数&lt;/span>
emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`expel &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});

&lt;span class="hljs-comment">// [我们](https://www.w3cdoc.com)触发arson事件,发现回调成功执行&lt;/span>
emitter.emit(&lt;span class="hljs-string">'arson'&lt;/span>, &lt;span class="hljs-string">'low-end'&lt;/span>); &lt;span class="hljs-comment">// expel low-end&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
 似乎不错,[我们](https://www.w3cdoc.com)实现了基本的触发/监听,但是如果有多个监听者呢?
  
  ```
&lt;span class="hljs-comment">// 重复监听同一个事件名&lt;/span>
emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`expel &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});
emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`save &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});

emitter.emit(&lt;span class="hljs-string">'arson'&lt;/span>, &lt;span class="hljs-string">'low-end'&lt;/span>); &lt;span class="hljs-comment">// expel low-end&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
 是的,只会触发第一个,因此[我们](https://www.w3cdoc.com)需要进行改造.
  
  <hr />
  <h3 class="heading" data-id="heading-4">
    2.升级改造
  </h3>
2.1 监听/触发器升级
  
 [我们](https://www.w3cdoc.com)的addListener实现方法还不够健全,在绑定第一个监听者之后,[我们](https://www.w3cdoc.com)就无法对后续监听者进行绑定了,因此[我们](https://www.w3cdoc.com)需要将后续监听者与第一个监听者函数放到一个数组里.
  
  ```

&lt;span class="hljs-comment">// 触发名为type的事件&lt;/span>
EventEmeitter.prototype.emit = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">type, ...args&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">let&lt;/span> handler;
  handler = &lt;span class="hljs-keyword">this&lt;/span>._events.get(type);
  &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-built_in">Array&lt;/span>.isArray(handler)) {
    &lt;span class="hljs-comment">// 如果是一个数组说明有多个监听者,需要依次此触发里面的函数&lt;/span>
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; handler.length; i++) {
      &lt;span class="hljs-keyword">if&lt;/span> (args.length > &lt;span class="hljs-number">0&lt;/span>) {
        handler[i].apply(&lt;span class="hljs-keyword">this&lt;/span>, args);
      } &lt;span class="hljs-keyword">else&lt;/span> {
        handler[i].call(&lt;span class="hljs-keyword">this&lt;/span>);
      }
    }
  } &lt;span class="hljs-keyword">else&lt;/span> { &lt;span class="hljs-comment">// 单个函数的情况[我们](https://www.w3cdoc.com)直接触发即可&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span> (args.length > &lt;span class="hljs-number">0&lt;/span>) {
      handler.apply(&lt;span class="hljs-keyword">this&lt;/span>, args);
    } &lt;span class="hljs-keyword">else&lt;/span> {
      handler.call(&lt;span class="hljs-keyword">this&lt;/span>);
    }
  }

  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">true&lt;/span>;
};

&lt;span class="hljs-comment">// 监听名为type的事件&lt;/span>
EventEmeitter.prototype.addListener = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">type, fn&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> handler = &lt;span class="hljs-keyword">this&lt;/span>._events.get(type); &lt;span class="hljs-comment">// 获取对应事件名称的函数清单&lt;/span>
  &lt;span class="hljs-keyword">if&lt;/span> (!handler) {
    &lt;span class="hljs-keyword">this&lt;/span>._events.set(type, fn);
  } &lt;span class="hljs-keyword">else&lt;/span> &lt;span class="hljs-keyword">if&lt;/span> (handler && &lt;span class="hljs-keyword">typeof&lt;/span> handler === &lt;span class="hljs-string">'function'&lt;/span>) {
    &lt;span class="hljs-comment">// 如果handler是函数说明只有一个监听者&lt;/span>
    &lt;span class="hljs-keyword">this&lt;/span>._events.set(type, [handler, fn]); &lt;span class="hljs-comment">// 多个监听者[我们](https://www.w3cdoc.com)需要用数组储存&lt;/span>
  } &lt;span class="hljs-keyword">else&lt;/span> {
    handler.push(fn); &lt;span class="hljs-comment">// 已经有多个监听者,那么直接往数组里push函数即可&lt;/span>
  }
};
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
 是的,从此以后可以愉快的触发多个监听者的函数了.
  
  ```
&lt;span class="hljs-comment">// 监听同一个事件名&lt;/span>
emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`expel &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});
emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`save &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});

emitter.addListener(&lt;span class="hljs-string">'arson'&lt;/span>, man => {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`kill &lt;span class="hljs-subst">${man}&lt;/span>`&lt;/span>);
});

&lt;span class="hljs-comment">// 触发事件&lt;/span>
emitter.emit(&lt;span class="hljs-string">'arson'&lt;/span>, &lt;span class="hljs-string">'low-end'&lt;/span>);
&lt;span class="hljs-comment">//expel low-end&lt;/span>
&lt;span class="hljs-comment">//save low-end&lt;/span>
&lt;span class="hljs-comment">//kill low-end&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
2.2 移除监听
  
 [我们](https://www.w3cdoc.com)会用removeListener函数移除监听函数,但是匿名函数是无法移除的.
  
  ```
EventEmeitter.prototype.removeListener = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">type, fn&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> handler = &lt;span class="hljs-keyword">this&lt;/span>._events.get(type); &lt;span class="hljs-comment">// 获取对应事件名称的函数清单&lt;/span>

  &lt;span class="hljs-comment">// 如果是函数,说明只被监听了一次&lt;/span>
  &lt;span class="hljs-keyword">if&lt;/span> (handler && &lt;span class="hljs-keyword">typeof&lt;/span> handler === &lt;span class="hljs-string">'function'&lt;/span>) {
    &lt;span class="hljs-keyword">this&lt;/span>._events.delete(type, fn);
  } &lt;span class="hljs-keyword">else&lt;/span> {
    &lt;span class="hljs-keyword">let&lt;/span> postion;
    &lt;span class="hljs-comment">// 如果handler是数组,说明被监听多次要找到对应的函数&lt;/span>
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; handler.length; i++) {
      &lt;span class="hljs-keyword">if&lt;/span> (handler[i] === fn) {
        postion = i;
      } &lt;span class="hljs-keyword">else&lt;/span> {
        postion = &lt;span class="hljs-number">-1&lt;/span>;
      }
    }
    &lt;span class="hljs-comment">// 如果找到匹配的函数,从数组中清除&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span> (postion !== &lt;span class="hljs-number">-1&lt;/span>) {
      &lt;span class="hljs-comment">// 找到数组对应的位置,直接清除此回调&lt;/span>
      handler.splice(postion, &lt;span class="hljs-number">1&lt;/span>);
      &lt;span class="hljs-comment">// 如果清除后只有一个函数,那么取消数组,以函数形式保存&lt;/span>
      &lt;span class="hljs-keyword">if&lt;/span> (handler.length === &lt;span class="hljs-number">1&lt;/span>) {
        &lt;span class="hljs-keyword">this&lt;/span>._events.set(type, handler[&lt;span class="hljs-number">0&lt;/span>]);
      }
    } &lt;span class="hljs-keyword">else&lt;/span> {
      &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">this&lt;/span>;
    }
  }
};
&lt;span class="copy-code-btn">复制代码&lt;/span>
```
  <hr />
  <h4 class="heading" data-id="heading-5">
    3.发现问题
  </h4>
 [我们](https://www.w3cdoc.com)已经基本完成了Event最重要的几个方法,也完成了升级改造,可以说一个Event的骨架是被[我们](https://www.w3cdoc.com)开发出来了,但是它仍然有不足和需要补充的地方.
  
  <blockquote>
    <ol>
      
        鲁棒性不足: [我们](https://www.w3cdoc.com)没有对参数进行充分的判断,没有完善的报错机制.
      
      
        模拟不够充分: 除了removeAllListeners这些方法没有实现以外,例如监听时间后会触发newListener事件,[我们](https://www.w3cdoc.com)也没有实现,另外最开始的监听者上限[我们](https://www.w3cdoc.com)也没有利用到.
      
    </ol>
  </blockquote>
 当然,这在面试中现场写一个Event已经是很够意思了,主要是体现出来对发布-订阅模式的理解,以及针对多个监听状况下的处理,不可能现场撸几百行写一个完整Event.
  
 索性<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FGozala%2Fevents%2Fblob%2Fmaster%2Fevents.js" target="_blank" rel="nofollow noopener noreferrer">Event</a>库帮[我们](https://www.w3cdoc.com)实现了完整的特性,整个代码量有300多行,很适合阅读,你可以花十分钟的时间通读一下,见识一下完整的Event实现.
</div>

原文：[实现event][1]

欢迎学习[前端](https://www.w3cdoc.com)知识体系课程，本系列属于：[[前端](https://www.w3cdoc.com)增长教程][2]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

 [1]: https://juejin.im/post/5ac2fb886fb9a028b86e328c
 [2]: https://www.f2e123.com/fed-regain
