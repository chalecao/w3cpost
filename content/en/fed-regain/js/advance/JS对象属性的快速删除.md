---
title: JS对象属性的快速删除


---
先划重点：**沿着属性添加的反方向删除属性时，对象不会退化为字典模式**。

在实际业务中，有时针对对象的 delete 操作难以避免，当然[我们](https://www.w3cdoc.com)可以调用上一章提到的方法（MagicFunc）将其优化成为快速模式，但这里主要有 3 个弊端：

* V8 将对象由快速模式迁移到字典模式也需花费时间处理。
* 所有这些优化方式都是通过 side effects 来实现，本身可靠性的保障并不高。
* 将对象由字典模式再优化成为快速模式本身有性能损耗。

有没有办法既删除对象的属性又不让对象退化到字典模式（而不是退化之后再去优化）了？

在要是放在以前是没有办法的！喵喵喵？

不过在 V8 的新版本（≥ 6.0）中，提供了一个新途径，当删除的属性满足如下 6 点条件时对象不会退化为字典模式：

  1. 对象是常规 JavaScript 对象。
  2. 传入的属性名是常量化字符串（不可是变量）或 Symbol。
  3. **删除的属性是最后添加到对象内的。**
  4. 此属性是可以被删除的。
  5. backpointer 引用的类型必须是 <Map> 。
  6. 最后一次 Map Transition 只能由于对象新增属性而触发。

> 其中第 3 点是在这 6 点中最重要的一条。

[我们](https://www.w3cdoc.com)来举个例子：

<div class="highlight">
  ```
<span class="c1">// flags: --allow-natives-syntax
</span><span class="kd">var</span> <span class="nx">obj</span> <span class="o">=</span> <span class="p">{</span>
  <span class="s2">"a"</span> <span class="o">:</span> <span class="mi">1</span><span class="p">,</span>
  <span class="s2">"b"</span> <span class="o">:</span> <span class="mi">2</span><span class="p">,</span>
  <span class="s2">"c"</span> <span class="o">:</span> <span class="mi">3</span>
<span class="p">};</span>
<span class="nx">obj</span><span class="p">.</span><span class="nx">d</span> <span class="o">=</span> <span class="mi">4</span><span class="p">;</span>

<span class="k">delete</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">d</span><span class="p">;</span>
<span class="o">%</span><span class="nx">HasFastProperties</span><span class="p">(</span><span class="nx">obj</span><span class="p">);</span>
<span class="c1">// true:  删除的属性 "d" 是最后添加进对象内的
</span>
<span class="k">delete</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">c</span><span class="p">;</span>
<span class="o">%</span><span class="nx">HasFastProperties</span><span class="p">(</span><span class="nx">obj</span><span class="p">);</span>
<span class="c1">// true:  删除的属性 "c" 是最后添加进删掉了属性 "d" 的对象内的
</span>
<span class="k">delete</span> <span class="nx">obj</span><span class="p">.</span><span class="nx">a</span><span class="p">;</span>
<span class="o">%</span><span class="nx">HasFastProperties</span><span class="p">(</span><span class="nx">obj</span><span class="p">);</span>
<span class="c1">// false: 删除的属性 "a" 不是最后添加进删掉了属性 "d", "c" 的对象内的
</span>
```
</div>

通过例子[我们](https://www.w3cdoc.com)可以看出，**当沿着属性添加的反方向删除属性时，对象不会退化为字典模式**。

V8 是如何实现这个特性（DeleteObjectPropertyFast）的了？

在这其中起着关键作用的就是 JSObject<Map> 中的 backpointer 引用链。

[我们](https://www.w3cdoc.com)现在了解到在构建完 p1/p2 对象后， V8 在内部实际上创建了 3 个 JSObject<Map> 实例。

而每个 <Map> 实例都有一个 backpointer 字段引用其前一个（Transition） <Map> 。

如下图所示：<figure>


  <img loading="lazy" width="1280" height="720" class="alignnone size-full wp-image-6636 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b8fa6b20a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w" sizes="(max-width: 1280px) 100vw, 1280px" />
</figure>

当删除最后添加的属性 #y 时：

* 通过当前的 <Map>(#2) 中 backpointer 引用回滚（Undo）到上一个 <Map>(#1)。
* 清除掉存储在对象 p2 内属性存储中的值 &#8220;b&#8221;。

形成如下图结构：<figure>


  <img loading="lazy" width="1440" height="810" class="alignnone size-full wp-image-6637 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b9036f1eb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

> 此时对于对象 p2 来说 #x 成为最后一个添加到对象内的属性。

继续删除属性 #x 时，由于 #x 是最后被添加到对象内的属性，故执行过程与删除属性 #y 类似，最终对象 p2 被回滚到初始状态：<figure>


  <img loading="lazy" width="1440" height="810" class="alignnone size-full wp-image-6638 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png?x-oss-process=image/format,webp 1440w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_450/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/04/img_6075b90f6212e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_432/format,webp 768w" sizes="(max-width: 1440px) 100vw, 1440px" />
</figure>

通过上述的例子[我们](https://www.w3cdoc.com)可以总结出：

* 如果以属性添加的反方向删除属性时，可以方便的通过对象 <Map> 形成的 backpointer 引用链回滚到上一次的状态而无需退化到字典模式。
* 如果删除的属性并非最后添加到对象内时，backpointer 引用链也无能为力，这时 V8 就会以字典模式来表达对象了。
