---
title: vue3中的响应式原理

---
随着 Vue 3.0 Pre Alpha 版本的公布，[我们](https://www.w3cdoc.com)得以一窥其源码的实现。

Vue 最巧妙的特性之一是其响应式系统，而[我们](https://www.w3cdoc.com)也能够在仓库的 packages/reactivity 模块下找到对应的实现。虽然源码的代码量不多，网上的分析文章也有一堆，但是要想清晰地理解响应式原理的具体实现过程，还是挺费脑筋的事情。

我把其响应式系统的原理总结成了一张图，而本文也将围绕这张图去讲述具体的实现过程。<span class="img-wrap"></span>

<p id="ZaiKNnr">
  <img loading="lazy" width="1920" height="1080" class="alignnone size-full wp-image-6571 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/format,webp 1920w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea6151a3c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_864/format,webp 1536w" sizes="(max-width: 1920px) 100vw, 1920px" />
</p>

<span style="font-size: 18px; font-weight: bold;">一个基本的例子</span>

Vue 3.0 的响应式系统是独立的模块，可以完全脱离 Vue 而使用，所以[我们](https://www.w3cdoc.com)在 clone 了源码下来以后，可以直接在 packages/reactivity 模块下调试。

  1. 在项目根目录运行 `yarn dev reactivity`，然后进入 `packages/reactivity` 目录找到产出的 `dist/reactivity.global.js` 文件。
  2. 新建一个 `index.html`，写入如下代码： <pre class="xml hljs"><code class="html">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">"./dist/reactivity.global.js"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">const&lt;/span> { reactive, effect } = VueObserver

&lt;span class="hljs-keyword">const&lt;/span> origin = {
  &lt;span class="hljs-attr">count&lt;/span>: &lt;span class="hljs-number">0&lt;/span>
}
&lt;span class="hljs-keyword">const&lt;/span> state = reactive(origin)

&lt;span class="hljs-keyword">const&lt;/span> fn = &lt;span class="hljs-function">() =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">const&lt;/span> count = state.count
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`set count to &lt;span class="hljs-subst">${count}&lt;/span>`&lt;/span>)
}
effect(fn)
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span></code></pre>

  3. 在[浏览器](https://www.w3cdoc.com)打开该文件，于控制台执行 `state.count++`，便可看到输出 `set count to 1`。

在上述的例子中，[我们](https://www.w3cdoc.com)使用 `reactive()` 函数把 `origin` 对象转化成了 Proxy 对象 `state`；使用 `effect()` 函数把 `fn()` 作为响应式回调。当 `state.count` 发生变化时，便触发了 `fn()`。接下来[我们](https://www.w3cdoc.com)将以这个例子结合上文的流程图，来讲解这套响应式系统是怎么运行的。

## 初始化阶段<span class="img-wrap"><br /> </span>

<p id="qAFKofQ">
  <img loading="lazy" width="519" height="732" class="alignnone size-full wp-image-6572 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea7bb4289.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea7bb4289.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea7bb4289.png?x-oss-process=image/format,webp 519w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea7bb4289.png?x-oss-process=image/quality,q_50/resize,m_fill,w_213,h_300/format,webp 213w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea7bb4289.png?x-oss-process=image/quality,q_50/resize,m_fill,w_425,h_600/format,webp 425w" sizes="(max-width: 519px) 100vw, 519px" />
</p>

在初始化阶段，主要做了两件事。

  1. 把 `origin` 对象转化成响应式的 Proxy 对象 `state`。
  2. 把函数 `fn()` 作为一个响应式的 effect 函数。

首先[我们](https://www.w3cdoc.com)来分析第一件事。

[大家](https://www.w3cdoc.com)都知道，Vue 3.0 使用了 Proxy 来代替之前的 `Object.defineProperty()`，改写了对象的 getter/setter，完成依赖收集和响应触发。但是在这一阶段中，[我们](https://www.w3cdoc.com)暂时先不管它是如何改写对象的 getter/setter 的，这个在后续的”依赖收集阶段“会详细说明。为了简单起见，[我们](https://www.w3cdoc.com)可以把这部分的内容浓缩成一个只有两行代码的 `reactive()` 函数：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">reactive&lt;/span>(&lt;span class="hljs-params">target&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> observed = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Proxy&lt;/span>(target, handler)
  &lt;span class="hljs-keyword">return&lt;/span> observed
}</code></pre>

> 完整代码在 <a href="https://github.com/jrainlau/tiny-reactive/blob/master/src/reactive.js" rel="nofollow">reactive.js</a>。这里的 `handler` 就是改造 getter/setter 的关键，[我们](https://www.w3cdoc.com)放到后文讲解。

接下来[我们](https://www.w3cdoc.com)分析第二件事。

当一个普通的函数 `fn()` 被 `effect()` 包裹之后，就会变成一个响应式的 effect 函数，而 `fn()` 也会被**立即执行一次**。

**由于在 `fn()` 里面有引用到 Proxy 对象的属性，所以这一步会触发对象的 getter，从而启动依赖收集。**

除此之外，这个 effect 函数也会被压入一个名为”activeReactiveEffectStack“（此处为 effectStack）的栈中，供后续依赖收集的时候使用。

来看看代码（完成代码请看 <a href="https://github.com/jrainlau/tiny-reactive/blob/master/src/effect.js#L47-L65" rel="nofollow">effect.js</a>）：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">effect&lt;/span> (&lt;span class="hljs-params">fn&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// 构造一个 effect&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> effect = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">effect&lt;/span>(&lt;span class="hljs-params">...args&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> run(effect, fn, args)
  }
  &lt;span class="hljs-comment">// 立即执行一次&lt;/span>
  effect()
  &lt;span class="hljs-keyword">return&lt;/span> effect
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">run&lt;/span>(&lt;span class="hljs-params">effect, fn, args&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">if&lt;/span> (effectStack.indexOf(effect) === -&lt;span class="hljs-number">1&lt;/span>) {
    &lt;span class="hljs-keyword">try&lt;/span> {
      &lt;span class="hljs-comment">// 往池子里放入当前 effect&lt;/span>
      effectStack.push(effect)
      &lt;span class="hljs-comment">// 立即执行一遍 fn()&lt;/span>
      &lt;span class="hljs-comment">// fn() 执行过程会完成依赖收集，会用到 effect&lt;/span>
      &lt;span class="hljs-keyword">return&lt;/span> fn(...args)
    } &lt;span class="hljs-keyword">finally&lt;/span> {
      &lt;span class="hljs-comment">// 完成依赖收集后从池子中扔掉这个 effect&lt;/span>
      effectStack.pop()
    }
  }
}</code></pre>

至此，初始化阶段已经完成。接下来就是整个系统最关键的一步——依赖收集阶段。

## 依赖收集阶段<span class="img-wrap"></span>

<p id="CcRzdHt">
  <img loading="lazy" width="606" height="732" class="alignnone size-full wp-image-6573 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea8e174e4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea8e174e4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea8e174e4.png?x-oss-process=image/format,webp 606w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea8e174e4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_248,h_300/format,webp 248w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea8e174e4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_497,h_600/format,webp 497w" sizes="(max-width: 606px) 100vw, 606px" />
</p>

这个阶段的触发时机，就是在 effect 被立即执行，其内部的 `fn()` 触发了 Proxy 对象的 getter 的时候。简单来说，只要执行到类似 `state.count` 的语句，就会触发 state 的 getter。

依赖收集阶段最重要的目的，就是建立一份”依赖收集表“，也就是图示的”targetMap&#8221;。targetMap 是一个 WeakMap，其 key 值是<del>当前的 Proxy 对象 <code>state</code></del>代理前的对象`origin`，而 value 则是该对象所对应的 depsMap。

depsMap 是一个 Map，key 值为触发 getter 时的属性值（此处为 `count`），而 value 则是**触发过该属性值**所对应的各个 effect。

还是有点绕？那么[我们](https://www.w3cdoc.com)再举个例子。假设有个 Proxy 对象和 effect 如下：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">const&lt;/span> state = reactive({
  &lt;span class="hljs-attr">count&lt;/span>: &lt;span class="hljs-number">0&lt;/span>,
  &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">18&lt;/span>
})

&lt;span class="hljs-keyword">const&lt;/span> effect1 = effect(&lt;span class="hljs-function">() =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'effect1: '&lt;/span> + state.count)
})

&lt;span class="hljs-keyword">const&lt;/span> effect2 = effect(&lt;span class="hljs-function">() =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'effect2: '&lt;/span> + state.age)
})

&lt;span class="hljs-keyword">const&lt;/span> effect3 = effect(&lt;span class="hljs-function">() =&gt;&lt;/span> {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'effect3: '&lt;/span> + state.count, state.age)
})</code></pre>

那么这里的 targetMap 应该为这个样子：<span class="img-wrap"><br /> </span>

<p id="GCyuTCK">
  <img loading="lazy" width="732" height="244" class="alignnone size-full wp-image-6574 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea9b2a94a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea9b2a94a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea9b2a94a.png?x-oss-process=image/format,webp 732w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069ea9b2a94a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_100/format,webp 300w" sizes="(max-width: 732px) 100vw, 732px" />
</p>

这样，`{ target -> key -> dep }` 的对应关系就建立起来了，依赖收集也就完成了。<a href="https://github.com/jrainlau/tiny-reactive/blob/master/src/effect.js#L4-L21" rel="nofollow">代码</a>如下：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">track&lt;/span> (&lt;span class="hljs-params">target, operationType, key&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> effect = effectStack[effectStack.length - &lt;span class="hljs-number">1&lt;/span>]
  &lt;span class="hljs-keyword">if&lt;/span> (effect) {
    &lt;span class="hljs-keyword">let&lt;/span> depsMap = targetMap.get(target)
    &lt;span class="hljs-keyword">if&lt;/span> (depsMap === &lt;span class="hljs-keyword">void&lt;/span> &lt;span class="hljs-number">0&lt;/span>) {
      targetMap.set(target, (depsMap = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Map&lt;/span>()))
    }

    &lt;span class="hljs-keyword">let&lt;/span> dep = depsMap.get(key)
    &lt;span class="hljs-keyword">if&lt;/span> (dep === &lt;span class="hljs-keyword">void&lt;/span> &lt;span class="hljs-number">0&lt;/span>) {
      depsMap.set(key, (dep = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Set&lt;/span>()))
    }

    &lt;span class="hljs-keyword">if&lt;/span> (!dep.has(effect)) {
      dep.add(effect)
    }
  }
}
</code></pre>

弄明白依赖收集表 targetMap 是非常重要的，因为这是整个响应式系统核心中的核心。

## 响应阶段 {#item-4}

回顾上一章节的例子，[我们](https://www.w3cdoc.com)得到了一个 `{ count: 0, age: 18 }` 的 Proxy，并构造了三个 effect。在控制台上看看效果：<span class="img-wrap"><br /> </span>

<p id="DBhiZnx">
  <img loading="lazy" width="558" height="288" class="alignnone size-full wp-image-6575 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eac0800b3.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eac0800b3.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eac0800b3.png?x-oss-process=image/format,webp 558w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eac0800b3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_155/format,webp 300w" sizes="(max-width: 558px) 100vw, 558px" />
</p>

效果符合预期，那么它是怎么实现的呢？首先来看看这个阶段的原理图：<span class="img-wrap"></span>

<p id="twycJFr">
  <img loading="lazy" width="1920" height="1080" class="alignnone size-full wp-image-6576 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/format,webp 1920w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eacee3df8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_864/format,webp 1536w" sizes="(max-width: 1920px) 100vw, 1920px" />
</p>

当修改对象的某个属性值的时候，会触发对应的 setter。

setter 里面的 trigger() 函数会从依赖收集表里找到当前属性对应的各个 dep，然后把它们推入到 `effects` 和 `computedEffects（计算属性）` 队列中，最后通过 `scheduleRun()` 挨个执行里面的 effect。

由于已经建立了依赖收集表，所以要找到属性所对应的 dep 也就轻而易举了，可以看看具体的<a href="https://github.com/jrainlau/tiny-reactive/blob/master/src/effect.js#L23-L45" rel="nofollow">代码实现</a>：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">trigger&lt;/span> (&lt;span class="hljs-params">target, operationType, key&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// 取得对应的 depsMap&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> depsMap = targetMap.get(target)
  &lt;span class="hljs-keyword">if&lt;/span> (depsMap === &lt;span class="hljs-keyword">void&lt;/span> &lt;span class="hljs-number">0&lt;/span>) {
    &lt;span class="hljs-keyword">return&lt;/span>
  }
  &lt;span class="hljs-comment">// 取得对应的各个 dep&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> effects = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Set&lt;/span>()
  &lt;span class="hljs-keyword">if&lt;/span> (key !== &lt;span class="hljs-keyword">void&lt;/span> &lt;span class="hljs-number">0&lt;/span>) {
    &lt;span class="hljs-keyword">const&lt;/span> dep = depsMap.get(key)
    dep && dep.forEach(&lt;span class="hljs-function">&lt;span class="hljs-params">effect&lt;/span> =&gt;&lt;/span> {
      effects.add(effect)
    })
  }
  &lt;span class="hljs-comment">// 简化版 scheduleRun，挨个执行 effect&lt;/span>
  effects.forEach(&lt;span class="hljs-function">&lt;span class="hljs-params">effect&lt;/span> =&gt;&lt;/span> {
    effect()
  })
}</code></pre>

> 这里的代码没有处理诸如数组的 length 被修改的一些特殊情况，感兴趣的读者可以查看 <a href="https://github.com/vuejs/vue-next/blob/master/packages/reactivity/src/effect.ts#L152-L188" rel="nofollow">vue-next 对应的源码</a>，或者<a href="https://juejin.im/post/5d99be7c6fb9a04e1e7baa34?utm_source=gold_browser_extension#heading-2" rel="nofollow">这篇文章</a>，看看这些情况都是怎么处理的。

至此，响应式阶段完成。

## 总结 {#item-5}

阅读源码的过程充满了挑战性，但同时也常常被 Vue 的一些实现思路给惊艳到，收获良多。本文按照响应式系统的运行过程，划分了”初始化“，”依赖收集“和”响应式“三个阶段，分别阐述了各个阶段所做的事情，应该能够较好地帮助读者理解其核心思路。最后附上文章实例代码的仓库地址，有兴趣的读者可以自行把玩：
