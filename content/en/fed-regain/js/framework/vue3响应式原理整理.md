---
title: Vue3响应式原理整理


---
整理了一些资源，现在开始学习应该还不算晚[狗头]

* <a href="https://github.com/vuejs/vue-next" rel="nofollow">vue-next仓库</a>
* <a href="https://v3.vuejs.org/" rel="nofollow">20200723 Vue3 官方发布的beta文档</a>
* <a href="https://github.com/vuejs/vue/projects/6" rel="nofollow">Vue3 Roadmap & FAQ</a>
* <a href="https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged" rel="nofollow">Vue3仓库已经合并的780多个PR</a>
* <a href="https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview" rel="nofollow">尤大在Vue Mastery的Vue3课：Vue 3 Deep Dive with Evan You</a>
* <a href="https://www.bilibili.com/video/BV1qC4y18721" rel="nofollow">202007 尤大在[前端](https://www.w3cdoc.com)会客厅节目关于Vue3的访谈</a>
* <a href="https://increment.com/frontend/making-vue-3/" rel="nofollow">202005 The process: Making Vue 3</a>
* <a href="https://www.bilibili.com/video/BV1Tg4y1z7FH" rel="nofollow">202004 尤大 - 聊聊 Vue.js 3.0 Beta 官方直播</a>
* <a href="https://www.bilibili.com/video/BV1Et41197L4" rel="nofollow">2018 VueConf 杭州 尤大关于Vue3的演讲视频</a>

## vue2 响应式原理回顾 {#item-1}

* 对象响应化：遍历每个key，通过 `Object.defineProperty` API定义getter，setter

```
// 伪代码
function observe(){
    if(typeof obj !='object' || obj == null){
        return
    }
    if(Array.isArray(obj)){
        Object.setPrototypeOf(obj,arrayProto)
    }else{
    const keys = Object.keys()
    for(let i=0;i<keys.length;i++){
      const key = keys[i]
      defineReactive(obj,key,obj[key])
    }
    }
}
function defineReactive(target, key, val){
  observe(val)
  Object.defineProperty(obj, key, {
    get(){
      // 依赖收集
      dep.depend()
      return val
    },
    set(newVal){
      if(newVal !== val){
        observe(newVal)
        val = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
}
```

* 数组响应化：覆盖数组的原型方法，增加通知变更的逻辑

```
// 伪代码
const originalProto = Array.prototype
const arrayProto = Object.create(originalProto)
['push','pop','shift','unshift','splice','reverse','sort'].forEach(key=>{
    arrayProto[key] = function(){
        originalProto[key].apply(this.arguments)
        notifyUpdate()
    }
})
```

## vue2响应式痛点 {#item-2}

* 递归，消耗大
* 新增/删除属性，需要额外实现单独的API
* 数组，需要额外实现
* Map Set Class等数据类型，无法响应式
* 修改语法有限制

## vue3响应式方案 {#item-3}

使用ES6的 **<a href="https://es6.ruanyifeng.com/#docs/proxy" rel="nofollow">Proxy</a>** 进行数据响应化，解决上述Vue2所有痛点

Proxy可以在目标对象上加一层拦截/代理，外界对目标对象的操作，都会经过这层拦截

相比 `Object.defineProperty` ，Proxy支持的对象操作十分全面：get、set、has、deleteProperty、ownKeys、defineProperty&#8230;&#8230;等等

```
// reactive 伪代码
function reactice(obj){
  return new Proxy(obj,{
    get(target, key, receiver){
      const ret = Reflect.get(target, key, receiver)
      return isObject(ret) ? reactice(ret) : ret
    },
    set(target, key, val, receiver){
      const ret = Reflect.set(target, key, val, receiver)
      return ret
    },
    deleteProperty(target, key){
      const ret = Reflect.deleteProperty(target, key)
      return ret
    },
  })
}
```

## 响应式原理 {#item-4}


  <img loading="lazy" width="807" height="1093" class="alignnone size-full wp-image-6579 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/format,webp 807w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_222,h_300/format,webp 222w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_443,h_600/format,webp 443w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb7a4ed20.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_1040/format,webp 768w" sizes="(max-width: 807px) 100vw, 807px" />



* 通过 **`effect`** 声明依赖响应式数据的函数cb ( 例如视图渲染函数render函数)，并执行cb函数，执行过程中，会触发响应式数据 `getter`
* 在响应式数据 `getter`中进行 `track`依赖收集：建立 **数据&cb** 的映射关系存储于 `targetMap`
* 当变更响应式数据时，触发 `trigger` **，**根据 `targetMap` 找到关联的cb执行
* 映射关系 `targetMap` 结构：

```
targetMap: WeakMap{
    target:Map{
        key: Set[cb1,cb2...]
    }
}
```

## 手写vue3响应式 {#item-5}

大致结构

```
// mini-vue3.js

/*建立响应式数据*/
function reactice(obj){}

/*声明响应函数cb(依赖响应式数据)*/
function effect(cb){}

/*依赖收集：建立 数据&cb 映射关系*/
function track(target,key){}

/*触发更新：根据映射关系，执行cb*/
function trigger(target,key){}
```

### reactive {#item-5-1}

```
/*建立响应式数据*/
function reactive(obj){
  // Proxy:http://es6.ruanyifeng.com/#docs/proxy
  // Proxy相当于在对象外层加拦截
  // Proxy递归是惰性的,需要添加递归的逻辑
  // Reflect:http://es6.ruanyifeng.com/#docs/reflect
  // Reflect:用于执行对象默认操作，更规范、更友好,可以理解成操作对象的合集
  // Proxy和Object的方法Reflect都有对应
  if(!isObject(obj)) return obj
  const observed = new Proxy(obj,{
    get(target, key, receiver){
      const ret = Reflect.get(target, key, receiver)
      console.log('getter '+ret)
      // 跟踪 收集依赖
      track(target, key)
      return reactive(ret)
    },
    set(target, key, val, receiver){
      const ret = Reflect.set(target, key, val, receiver)
      console.log('setter '+key+':'+val + '=>' + ret)
      // 触发更新
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key){
      const ret = Reflect.deleteProperty(target, key)
      console.log('delete '+key+':'+ret)
      // 触发更新
      trigger(target, key)
      return ret
    },
  })
  return observed
}
```

### effect {#item-5-2}

```
/*声明响应函数cb*/
const effectStack = []
function effect(cb){

  // 对函数进行高阶封装
  const rxEffect = function(){
    // 1.捕获异常
    // 2.fn出栈入栈
    // 3.执行fn
    try{
      effectStack.push(rxEffect)
      return cb()
    }finally{
      effectStack.pop()
    }
  }

  // 最初要执行一次,进行最初的依赖收集
  rxEffect()

  return rxEffect
}
```

### track {#item-5-3}

```
/*依赖收集：建立 数据&cb 映射关系*/
const targetMap = new WeakMap()
function track(target,key){
  // 存入映射关系
  const effectFn = effectStack[effectStack.length - 1]  // 拿出栈顶函数
  if(effectFn){
    let depsMap = targetMap.get(target)
    if(!depsMap){
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps){
      deps = new Set()
      depsMap.set(key, deps)
    }
    deps.add(effectFn)
  }
}
```

### trigger {#item-5-4}

```
/*触发更新：根据映射关系，执行cb*/
function trigger(target, key){
  const depsMap = targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    if(deps){
      deps.forEach(effect=>effect())
    }
  }
}
```

### 测试demo {#item-5-5}

```
<!-- test.html -->
<div id="app">
 {{msg}}
</div>

<script src="./mini-vue3.js"></script>

<script>
  // 定义一个响应式数据
  const state = reactive({
    msg:'message'
  })

  // 定义一个使用到响应式数据的 dom更新函数
    function updateDom(){
        document.getElementById('app').innerText = state.msg
    }

    // 用effect声明更新函数
  effect(updateDom)

  // 定时变更响应式数据
  setInterval(()=>{
    state.msg = 'message' + Math.random()
  },1000)
</script>
```

效果：


  <img loading="lazy" width="547" height="548" class="alignnone size-full wp-image-6578 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/format,webp 547w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_300/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6069eb66198a5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w" sizes="(max-width: 547px) 100vw, 547px" />

