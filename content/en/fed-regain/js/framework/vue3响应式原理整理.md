---
title: Vue3响应式原理整理


date: 2021-04-04T16:38:37+00:00
url: /javascriptnodejs/6577.html
views:
  - 694


---
整理了一些资源，现在开始学习应该还不算晚[狗头]

  * <a href="https://github.com/vuejs/vue-next" rel="nofollow">vue-next仓库</a>
  * <a href="https://v3.vuejs.org/" rel="nofollow">20200723 Vue3 官方发布的beta文档</a>
  * <a href="https://github.com/vuejs/vue/projects/6" rel="nofollow">Vue3 Roadmap & FAQ</a>
  * <a href="https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged" rel="nofollow">Vue3仓库已经合并的780多个PR</a>
  * <a href="https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview" rel="nofollow">尤大在Vue Mastery的Vue3课：Vue 3 Deep Dive with Evan You</a>
  * <a href="https://www.bilibili.com/video/BV1qC4y18721" rel="nofollow">202007 尤大在前端会客厅节目关于Vue3的访谈</a>
  * <a href="https://increment.com/frontend/making-vue-3/" rel="nofollow">202005 The process: Making Vue 3</a>
  * <a href="https://www.bilibili.com/video/BV1Tg4y1z7FH" rel="nofollow">202004 尤大 &#8211; 聊聊 Vue.js 3.0 Beta 官方直播</a>
  * <a href="https://www.bilibili.com/video/BV1Et41197L4" rel="nofollow">2018 VueConf 杭州 尤大关于Vue3的演讲视频</a>

## vue2 响应式原理回顾 {#item-1}

  * 对象响应化：遍历每个key，通过 `Object.defineProperty` API定义getter，setter

<pre class="hljs javascript"><code class="jsx">&lt;span class="hljs-comment">// 伪代码&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">observe&lt;/span>()&lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span>(&lt;span class="hljs-keyword">typeof&lt;/span> obj !=&lt;span class="hljs-string">'object'&lt;/span> || obj == &lt;span class="hljs-literal">null&lt;/span>){
        &lt;span class="hljs-keyword">return&lt;/span>
    }
    &lt;span class="hljs-keyword">if&lt;/span>(&lt;span class="hljs-built_in">Array&lt;/span>.isArray(obj)){
        &lt;span class="hljs-built_in">Object&lt;/span>.setPrototypeOf(obj,arrayProto)
    }&lt;span class="hljs-keyword">else&lt;/span>{
    &lt;span class="hljs-keyword">const&lt;/span> keys = &lt;span class="hljs-built_in">Object&lt;/span>.keys()
    &lt;span class="hljs-keyword">for&lt;/span>(&lt;span class="hljs-keyword">let&lt;/span> i=&lt;span class="hljs-number">0&lt;/span>;i&lt;keys.length;i++){
      &lt;span class="hljs-keyword">const&lt;/span> key = keys[i]
      defineReactive(obj,key,obj[key])
    }
    }
}
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">defineReactive&lt;/span>(&lt;span class="hljs-params">target, key, val&lt;/span>)&lt;/span>{
  observe(val)
  &lt;span class="hljs-built_in">Object&lt;/span>.defineProperty(obj, key, {
    &lt;span class="hljs-function">&lt;span class="hljs-title">get&lt;/span>()&lt;/span>{
      &lt;span class="hljs-comment">// 依赖收集&lt;/span>
      dep.depend()
      &lt;span class="hljs-keyword">return&lt;/span> val
    },
    &lt;span class="hljs-function">&lt;span class="hljs-title">set&lt;/span>(&lt;span class="hljs-params">newVal&lt;/span>)&lt;/span>{
      &lt;span class="hljs-keyword">if&lt;/span>(newVal !== val){
        observe(newVal)
        val = newVal
        &lt;span class="hljs-comment">// 通知更新&lt;/span>
        dep.notify()
      }
    }
  })
}</code></pre>

  * 数组响应化：覆盖数组的原型方法，增加通知变更的逻辑

<pre class="hljs javascript"><code class="jsx">&lt;span class="hljs-comment">// 伪代码&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> originalProto = &lt;span class="hljs-built_in">Array&lt;/span>.prototype
&lt;span class="hljs-keyword">const&lt;/span> arrayProto = &lt;span class="hljs-built_in">Object&lt;/span>.create(originalProto)
[&lt;span class="hljs-string">'push'&lt;/span>,&lt;span class="hljs-string">'pop'&lt;/span>,&lt;span class="hljs-string">'shift'&lt;/span>,&lt;span class="hljs-string">'unshift'&lt;/span>,&lt;span class="hljs-string">'splice'&lt;/span>,&lt;span class="hljs-string">'reverse'&lt;/span>,&lt;span class="hljs-string">'sort'&lt;/span>].forEach(&lt;span class="hljs-function">&lt;span class="hljs-params">key&lt;/span>=&gt;&lt;/span>{
    arrayProto[key] = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        originalProto[key].apply(&lt;span class="hljs-built_in">this&lt;/span>.arguments)
        notifyUpdate()
    }
})</code></pre>

## vue2响应式痛点 {#item-2}

  * 递归，消耗大
  * 新增/删除属性，需要额外实现单独的API
  * 数组，需要额外实现
  * Map Set Class等数据类型，无法响应式
  * 修改语法有限制

## vue3响应式方案 {#item-3}

使用ES6的 **<a href="https://es6.ruanyifeng.com/#docs/proxy" rel="nofollow"><code>Proxy</code></a>** 进行数据响应化，解决上述Vue2所有痛点

Proxy可以在目标对象上加一层拦截/代理，外界对目标对象的操作，都会经过这层拦截

相比 `Object.defineProperty` ，Proxy支持的对象操作十分全面：get、set、has、deleteProperty、ownKeys、defineProperty&#8230;&#8230;等等

<pre class="hljs javascript"><code class="jsx">&lt;span class="hljs-comment">// reactive 伪代码&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">reactice&lt;/span>(&lt;span class="hljs-params">obj&lt;/span>)&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Proxy&lt;/span>(obj,{
    &lt;span class="hljs-function">&lt;span class="hljs-title">get&lt;/span>(&lt;span class="hljs-params">target, key, receiver&lt;/span>)&lt;/span>{
      &lt;span class="hljs-keyword">const&lt;/span> ret = &lt;span class="hljs-built_in">Reflect&lt;/span>.get(target, key, receiver)
      &lt;span class="hljs-keyword">return&lt;/span> isObject(ret) ? reactice(ret) : ret
    },
    &lt;span class="hljs-function">&lt;span class="hljs-title">set&lt;/span>(&lt;span class="hljs-params">target, key, val, receiver&lt;/span>)&lt;/span>{
      &lt;span class="hljs-keyword">const&lt;/span> ret = &lt;span class="hljs-built_in">Reflect&lt;/span>.set(target, key, val, receiver)
      &lt;span class="hljs-keyword">return&lt;/span> ret
    },
    &lt;span class="hljs-function">&lt;span class="hljs-title">deleteProperty&lt;/span>(&lt;span class="hljs-params">target, key&lt;/span>)&lt;/span>{
      &lt;span class="hljs-keyword">const&lt;/span> ret = &lt;span class="hljs-built_in">Reflect&lt;/span>.deleteProperty(target, key)
      &lt;span class="hljs-keyword">return&lt;/span> ret
    },
  })
}</code></pre>

## 响应式原理 {#item-4}

<p id="HWInTJK">
  <img loading="lazy" width="807" height="1093" class="alignnone size-full wp-image-6579 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/format,webp 807w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_222,h_300/format,webp 222w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_443,h_600/format,webp 443w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_1040/format,webp 768w" sizes="(max-width: 807px) 100vw, 807px" />
</p>

&nbsp;

  * 通过 **`effect`** 声明依赖响应式数据的函数cb ( 例如视图渲染函数render函数)，并执行cb函数，执行过程中，会触发响应式数据 `getter`
  * 在响应式数据 `getter`中进行 `track`依赖收集：建立 **数据&cb** 的映射关系存储于 `targetMap`
  * 当变更响应式数据时，触发 `trigger` **，**根据 `targetMap` 找到关联的cb执行
  * 映射关系 `targetMap` 结构：

<pre class="hljs coffeescript"><code class="jsx">targetMap: &lt;span class="hljs-built_in">WeakMap&lt;/span>{ 
    target:&lt;span class="hljs-built_in">Map&lt;/span>{ 
        key: &lt;span class="hljs-built_in">Set&lt;/span>[cb1,cb2...] 
    }
}</code></pre>

## 手写vue3响应式 {#item-5}

大致结构

<pre class="hljs awk"><code class="jsx">&lt;span class="hljs-regexp">//&lt;/span> mini-vue3.js

&lt;span class="hljs-regexp">/* 建立响应式数据 */&lt;/span>
&lt;span class="hljs-keyword">function&lt;/span> reactice(obj){}

&lt;span class="hljs-regexp">/* 声明响应函数cb(依赖响应式数据) */&lt;/span>
&lt;span class="hljs-keyword">function&lt;/span> effect(cb){}

&lt;span class="hljs-regexp">/* 依赖收集：建立 数据&cb 映射关系 */&lt;/span>
&lt;span class="hljs-keyword">function&lt;/span> track(target,key){}

&lt;span class="hljs-regexp">/* 触发更新：根据映射关系，执行cb */&lt;/span>
&lt;span class="hljs-keyword">function&lt;/span> trigger(target,key){}</code></pre>

### reactive {#item-5-1}

<pre class="hljs processing"><code class="jsx">&lt;span class="hljs-comment">/* 建立响应式数据 */&lt;/span>
function reactive(obj){
  &lt;span class="hljs-comment">// Proxy:http://es6.ruanyifeng.com/#docs/proxy&lt;/span>
  &lt;span class="hljs-comment">// Proxy相当于在对象外层加拦截&lt;/span>
  &lt;span class="hljs-comment">// Proxy递归是惰性的,需要添加递归的逻辑&lt;/span>
  
  &lt;span class="hljs-comment">// Reflect:http://es6.ruanyifeng.com/#docs/reflect&lt;/span>
  &lt;span class="hljs-comment">// Reflect:用于执行对象默认操作，更规范、更友好,可以理解成操作对象的合集&lt;/span>
  &lt;span class="hljs-comment">// Proxy和Object的方法Reflect都有对应&lt;/span>
  &lt;span class="hljs-keyword">if&lt;/span>(!isObject(obj)) &lt;span class="hljs-keyword">return&lt;/span> obj
  &lt;span class="hljs-keyword">const&lt;/span> observed = &lt;span class="hljs-keyword">new&lt;/span> Proxy(obj,{
    &lt;span class="hljs-built_in">get&lt;/span>(target, &lt;span class="hljs-built_in">key&lt;/span>, receiver){
      &lt;span class="hljs-keyword">const&lt;/span> ret = Reflect.&lt;span class="hljs-built_in">get&lt;/span>(target, &lt;span class="hljs-built_in">key&lt;/span>, receiver)
      console.&lt;span class="hljs-built_in">log&lt;/span>(&lt;span class="hljs-string">'getter '&lt;/span>+ret)
      &lt;span class="hljs-comment">// 跟踪 收集依赖&lt;/span>
      track(target, &lt;span class="hljs-built_in">key&lt;/span>)
      &lt;span class="hljs-keyword">return&lt;/span> reactive(ret)
    },
    &lt;span class="hljs-built_in">set&lt;/span>(target, &lt;span class="hljs-built_in">key&lt;/span>, val, receiver){
      &lt;span class="hljs-keyword">const&lt;/span> ret = Reflect.&lt;span class="hljs-built_in">set&lt;/span>(target, &lt;span class="hljs-built_in">key&lt;/span>, val, receiver)
      console.&lt;span class="hljs-built_in">log&lt;/span>(&lt;span class="hljs-string">'setter '&lt;/span>+&lt;span class="hljs-built_in">key&lt;/span>+&lt;span class="hljs-string">':'&lt;/span>+val + &lt;span class="hljs-string">'=&gt;'&lt;/span> + ret)
      &lt;span class="hljs-comment">// 触发更新&lt;/span>
      trigger(target, &lt;span class="hljs-built_in">key&lt;/span>)
      &lt;span class="hljs-keyword">return&lt;/span> ret
    },
    deleteProperty(target, &lt;span class="hljs-built_in">key&lt;/span>){
      &lt;span class="hljs-keyword">const&lt;/span> ret = Reflect.deleteProperty(target, &lt;span class="hljs-built_in">key&lt;/span>)
      console.&lt;span class="hljs-built_in">log&lt;/span>(&lt;span class="hljs-string">'delete '&lt;/span>+&lt;span class="hljs-built_in">key&lt;/span>+&lt;span class="hljs-string">':'&lt;/span>+ret)
      &lt;span class="hljs-comment">// 触发更新&lt;/span>
      trigger(target, &lt;span class="hljs-built_in">key&lt;/span>)
      &lt;span class="hljs-keyword">return&lt;/span> ret
    },
  })
  &lt;span class="hljs-keyword">return&lt;/span> observed
}</code></pre>

### effect {#item-5-2}

<pre class="hljs actionscript"><code class="jsx">&lt;span class="hljs-comment">/* 声明响应函数cb */&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> effectStack = []
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">effect&lt;/span>&lt;span class="hljs-params">(cb)&lt;/span>&lt;/span>{

  &lt;span class="hljs-comment">// 对函数进行高阶封装&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> rxEffect = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">()&lt;/span>&lt;/span>{
    &lt;span class="hljs-comment">// 1.捕获异常&lt;/span>
    &lt;span class="hljs-comment">// 2.fn出栈入栈&lt;/span>
    &lt;span class="hljs-comment">// 3.执行fn&lt;/span>
    &lt;span class="hljs-keyword">try&lt;/span>{
      effectStack.push(rxEffect)
      &lt;span class="hljs-keyword">return&lt;/span> cb()
    }&lt;span class="hljs-keyword">finally&lt;/span>{
      effectStack.pop()
    }
  }

  &lt;span class="hljs-comment">// 最初要执行一次,进行最初的依赖收集&lt;/span>
  rxEffect()

  &lt;span class="hljs-keyword">return&lt;/span> rxEffect
}</code></pre>

### track {#item-5-3}

<pre class="hljs csharp"><code class="jsx">&lt;span class="hljs-comment">/* 依赖收集：建立 数据&cb 映射关系 */&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> targetMap = &lt;span class="hljs-keyword">new&lt;/span> WeakMap()
&lt;span class="hljs-function">function &lt;span class="hljs-title">track&lt;/span>(&lt;span class="hljs-params">target,key&lt;/span>)&lt;/span>{
  &lt;span class="hljs-comment">// 存入映射关系&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> effectFn = effectStack[effectStack.length - &lt;span class="hljs-number">1&lt;/span>]  &lt;span class="hljs-comment">// 拿出栈顶函数&lt;/span>
  &lt;span class="hljs-keyword">if&lt;/span>(effectFn){
    &lt;span class="hljs-keyword">let&lt;/span> depsMap = targetMap.&lt;span class="hljs-keyword">get&lt;/span>(target)
    &lt;span class="hljs-keyword">if&lt;/span>(!depsMap){
      depsMap = &lt;span class="hljs-keyword">new&lt;/span> Map()
      targetMap.&lt;span class="hljs-keyword">set&lt;/span>(target, depsMap)
    }
    &lt;span class="hljs-keyword">let&lt;/span> deps = depsMap.&lt;span class="hljs-keyword">get&lt;/span>(key)
    &lt;span class="hljs-keyword">if&lt;/span>(!deps){
      deps = &lt;span class="hljs-keyword">new&lt;/span> Set()
      depsMap.&lt;span class="hljs-keyword">set&lt;/span>(key, deps)
    }
    deps.&lt;span class="hljs-keyword">add&lt;/span>(effectFn)
  }
}</code></pre>

### trigger {#item-5-4}

<pre class="hljs processing"><code class="jsx">&lt;span class="hljs-comment">/* 触发更新：根据映射关系，执行cb */&lt;/span>
function trigger(target, &lt;span class="hljs-built_in">key&lt;/span>){
  &lt;span class="hljs-keyword">const&lt;/span> depsMap = targetMap.&lt;span class="hljs-built_in">get&lt;/span>(target)
  &lt;span class="hljs-keyword">if&lt;/span>(depsMap){
    &lt;span class="hljs-keyword">const&lt;/span> deps = depsMap.&lt;span class="hljs-built_in">get&lt;/span>(&lt;span class="hljs-built_in">key&lt;/span>)
    &lt;span class="hljs-keyword">if&lt;/span>(deps){
      deps.forEach(effect=&gt;effect())
    }
  }
}</code></pre>

### 测试demo {#item-5-5}

<pre class="hljs handlebars"><code class="jsx">&lt;span class="xml">&lt;span class="hljs-comment">&lt;!-- test.html --&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"app"&lt;/span>&gt;&lt;/span>
 &lt;/span>&lt;span class="hljs-template-variable">{{&lt;span class="hljs-name">msg&lt;/span>}}&lt;/span>&lt;span class="xml">
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">"./mini-vue3.js"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-comment">// 定义一个响应式数据&lt;/span>
  &lt;span class="hljs-keyword">const&lt;/span> state = reactive({
    &lt;span class="hljs-attr">msg&lt;/span>:&lt;span class="hljs-string">'message'&lt;/span>
  })

  &lt;span class="hljs-comment">// 定义一个使用到响应式数据的 dom更新函数&lt;/span>
    &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">updateDom&lt;/span>()&lt;/span>{
        &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'app'&lt;/span>).innerText = state.msg
    }

    &lt;span class="hljs-comment">// 用effect声明更新函数&lt;/span>
  effect(updateDom)

  &lt;span class="hljs-comment">// 定时变更响应式数据&lt;/span>
  &lt;span class="hljs-built_in">setInterval&lt;/span>(&lt;span class="hljs-function">()=&gt;&lt;/span>{
    state.msg = &lt;span class="hljs-string">'message'&lt;/span> + &lt;span class="hljs-built_in">Math&lt;/span>.random()
  },&lt;span class="hljs-number">1000&lt;/span>)
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;/span></code></pre>

效果：

<p id="YNjaVFC">
  <img loading="lazy" width="547" height="548" class="alignnone size-full wp-image-6578 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/format,webp 547w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_300/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w" sizes="(max-width: 547px) 100vw, 547px" />
</p>