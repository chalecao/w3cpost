---
title: JS特性性能缺陷及JIT的解决方案






xzh_tui_back:
  - 成功


---
拜读了David的《[Know Your Engines: How to Make Your JavaScript Fast][1]》，David是Mozilla的JS引擎工程师，文章主要介绍了JIT与GC原理，以及如何根据某些基本原理，优化js代码的执行效率，虽然是老文了，但对我来说仍受益匪浅。这里，我根据上文整理了本文，同时，大家也可以从侧面了解下JIT。

近5年来，在主流浏览器上，Javascript的运行速度有10-100倍的提升，这要归功于Javascript新引擎JIT。但在深入了解JIT前，我们先看看Javascript的一个最重要的特性：untyped（无类型）。

一. 无类型：

Javascript是个无类型的语言，这导致了 x = y +ｚ这种表达式，可以有很多含义。比如：

（1）y，z是数字，则+表示加法。

（2）y，z是字符串，则+表示字符串连接。

……

而JS引擎内部则使用“细粒度”的类型，比如：32-bit\* integer, 64-bit\* floating-point，如图：

<p id="qjFNFoE">
  <img loading="lazy" width="430" height="141" class="alignnone size-full wp-image-4973 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca1639e3d4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca1639e3d4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca1639e3d4.png?x-oss-process=image/format,webp 430w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca1639e3d4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_98/format,webp 300w" sizes="(max-width: 430px) 100vw, 430px" />
</p>

        这就要求js类型-js引擎类型，需要做“boxed/unboxed（装箱/解箱）”，在处理一次x = y + z这种计算，需要经过的步骤如下：

（1）从内存，读取 x = y + z的操作符。

（2）从内存，读取 y，z。

（3）检查y，z类型，确定操作的行为。

（4）unbox y，z。

（5）执行 操作符 的行为（唯一有效的步骤……）。

（6）box x。

（7）把x写入内存。

只有（5）是真正有效的操作，其他都是为（5）做准备/收尾的，效率之低可见。javascript的untyped特性很好用，但也为此付出了很大的性能代价。

<div class="e-secret">
  </p>
  
  <p>
    二. 对象属性
  </p>
  
  <blockquote>
    <pre class="csharpcode"><span class="kwrd">function</span> f(obj) {
        <span class="kwrd">return</span> obj.a + 1;
}</pre>
  </blockquote>
  
  <p>
    在Js里，对象属性的访问是比较慢的。至于原因，要从Javascript对象存储说起，这里借用其他文章的一个图：
  </p>
  
  <p id="XwSnVGw">
    <img loading="lazy" width="430" height="237" class="alignnone size-full wp-image-4974 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca17440a99.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca17440a99.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca17440a99.png?x-oss-process=image/format,webp 430w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca17440a99.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_165/format,webp 300w" sizes="(max-width: 430px) 100vw, 430px" />
  </p>
  
  <p>
            如上图，访问对象属性，需要先从本地变量表找到对象，然后遍历属性，如果在本对象的属性列表里没找到，再得从prototype里面一层层的找。不能直接索引，只能遍历，这就慢的原因。
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    二. 2006版-Javascript引擎
  </p>
  
  <p>
    这版引擎在执行x = y + z时，就是执行了以上流程。它模块图如下：
  </p>
  
  <p id="OofcPwS">
    <img loading="lazy" width="518" height="207" class="alignnone size-full wp-image-4975 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca18406c71.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca18406c71.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca18406c71.png?x-oss-process=image/format,webp 518w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca18406c71.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_120/format,webp 300w" sizes="(max-width: 518px) 100vw, 518px" />
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    三. 2011新版-Javascript引擎
  </p>
  
  <p>
    模块图如下：
  </p>
  
  <p id="QcxewWZ">
    <img loading="lazy" width="526" height="216" class="alignnone size-full wp-image-4976 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca262bd17b.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca262bd17b.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca262bd17b.png?x-oss-process=image/format,webp 526w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca262bd17b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_123/format,webp 300w" sizes="(max-width: 526px) 100vw, 526px" />
  </p>
  
  <p>
            可以看到，除了老版的解析器外，新引擎增加了JIT，以及Type-specializing JIT。
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    1. JIT
  </p>
  
  <p>
    先看看JIT对untyped的优化，在JIT下，执行x = y + z流程：
  </p>
  
  <p>
    （1）从内存，读取 x = y + z的操作符。
  </p>
  
  <p>
    （2）从内存，读取 y，z。
  </p>
  
  <p>
    （3）检查y，z类型，确定操作的行为。
  </p>
  
  <p>
    （4）unbox y，z。
  </p>
  
  <p>
    （5）执行 操作符 的行为（唯一有效的步骤……）。
  </p>
  
  <p>
    （6）box x。
  </p>
  
  <p>
    （7）把x写入内存。
  </p>
  
  <p>
    其中，（1），（2） CPU帮我们搞定；（7）JIT把结果保存在寄存器里。
  </p>
  
  <p>
    但可惜不是所有情况都能使用JIT，上面看到，Front-end有3条分支，“一般的情况”可以走JIT分支，比如：number + number；string + string …，但特殊情况，比如：number + undefined就不行了，只能走旧解析器。
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    除了针对untyped的优化，新引擎还对“对象属性”访问做了优化，解决方案叫：inline caching，俗称：IC。简单的说，就是做cache。优化流程直接看图：
  </p>
  
  <p id="ViXkQHB">
    <img loading="lazy" width="546" height="242" class="alignnone size-full wp-image-4977 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca273c9103.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca273c9103.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca273c9103.png?x-oss-process=image/format,webp 546w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca273c9103.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_133/format,webp 300w" sizes="(max-width: 546px) 100vw, 546px" />
  </p>
  
  <p>
            这个相当于遍历cache list了，如果当list很大时，这种方案反而影响效率。下图是评测：
  </p>
  
  <p id="xjGnlqr">
    <img loading="lazy" width="484" height="248" class="alignnone size-full wp-image-4978 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca28100d2d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca28100d2d.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca28100d2d.png?x-oss-process=image/format,webp 484w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca28100d2d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_154/format,webp 300w" sizes="(max-width: 484px) 100vw, 484px" />
  </p>
  
  <p>
    2. Type-specializing JIT
  </p>
  
  <p>
    从名称上可以猜到，这个引擎是处理typed类型（声明类型）变量的。厄……但Javascript都是untype类型的……
  </p>
  
  <p>
    Type-specializing JIT的解决方案是：
  </p>
  
  <p>
    （1）先通过扫描，监测类型。
  </p>
  
  <p>
    （2）通过编译优化（当然，他的优化对象不仅仅只是“类型”，还包括对JS代码的优化，但类型优化是核心的。），生成类型变量。
  </p>
  
  <p>
    （3）再做后续计算。
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    来看看Type-specializing JIT的执行x = y + z流程吧：
  </p>
  
  <p>
    （1）从内存，读取 x = y + z的操作符。
  </p>
  
  <p>
    （2）从内存，读取 y，z。
  </p>
  
  <p>
    （3）检查y，z类型，确定操作的行为。
  </p>
  
  <p>
    （4）unbox y，z。
  </p>
  
  <p>
    （5）执行 操作符 的行为。
  </p>
  
  <p>
    （6）box x。
  </p>
  
  <p>
    （7）把x写入内存。
  </p>
  
  <p>
    高效的优化啊……当然，这也是有代价的，代价就是：前置的扫描类型，编译优化。所以Type-specializing JIT的应用是有选择性，选择使用这个引擎的场景包括：
  </p>
  
  <p>
    （1）热点代码。
  </p>
  
  <p>
    （2）通过启发式算法估算出来的有价值的代码……
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    另外，有2点也需要注意：
  </p>
  
  <p>
    （1）当 变量类型 发生变化时，引擎有2种处理方式：
  </p>
  
  <p>
    【1】少量变更，重编译，再执行。
  </p>
  
  <p>
    【2】大量变更……还是交给JIT执行吧。
  </p>
  
  <p>
    （2）数组，object properties，闭包变量不在优化范畴之列。
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    本文主要整理了JIT针对Javascript某些语言特性的优化方案，至于GC，以及更多Js代码优化建议，可查阅原文。
  </p>
  
  <p>
    </div>
  </p>

 [1]: http://velocityconf.com/velocity2011/public/schedule/detail/18087
