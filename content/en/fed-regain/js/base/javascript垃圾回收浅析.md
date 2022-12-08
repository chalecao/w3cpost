---
title: Javascript垃圾回收浅析

---
# 一. 枚举Javascript引擎分配内存的场景：

1. Object

<pre class="csharpcode"><span class="kwrd">new</span> Object();
<span class="kwrd">new</span> MyConstructor();
{ a: 4, b: 5 }
Object.create();</pre>

2. 数组

<pre class="csharpcode"><span class="kwrd">new</span> Array();
[ 1, 2, 3, 4 ];</pre>

3. 字符串

<pre class="csharpcode"><span class="kwrd">new</span> String(“hello hyddd”);
“&lt;p>” + e.innerHTML + “&lt;/p>”</pre>

随带一说，javascript的字符串和.Net一样，使用资源池和copy on write方式管理字符串。

4. 函数对象

<pre class="csharpcode"><span class="kwrd">var</span> x = <span class="kwrd">function</span> () { ... }
<span class="kwrd">new</span> Function(code);</pre>

5. 闭包

<pre class="csharpcode"><span class="kwrd">function</span> outer(name) {
<span class="kwrd">var</span> x = name;
<span class="kwrd">return</span> <span class="kwrd">function</span> inner() {
  <span class="kwrd">return</span> “Hi, “ + name;
}
}</pre>

闭包和prototype不一样，以上函数为例，当调用outer时，会生成并返回一个对象（隐含变量x），每次调用都创建一个，而prototype则是每次都返回同一个而对象（即：无论多少次调用，只创建一个对象）。

&nbsp;

# 二. GC方案

相对其他语言的复杂的GC方案，Javascript的GC相对还是比较简单的。

&nbsp;

1. Javascript引擎基础GC方案是（simple GC）：mark and sweep（标记清除），即：

（1）遍历所有可访问的对象。

（2）回收已不可访问的对象。

&nbsp;

2. GC的缺陷

和其他语言一样，javascript的GC策略也无法避免一个问题：GC时，停止响应其他操作，这是为了安全考虑。而Javascript的GC在100ms甚至以上，对一般的应用还好，但对于JS游戏，动画对连贯性要求比较高的应用，就麻烦了。这就是新引擎需要优化的点：避免GC造成的长时间停止响应。

&nbsp;

## 3. GC优化策略

David大叔主要介绍了2个优化方案，而这也是最主要的2个优化方案了：

### （1）分代回收（Generation GC）

理解分代回收，先就要理解V8引擎将堆内存怎么分割的，一共分成了6个部分

1.新生区：刚开始的对象都是分配在这里，用于存储操作频繁的对象

2.老生指针区：用于存储老生区的指针对象

3.老生数据区：用于存储老生区数据。

4.大对象区：用于存储大对象

5.代码区：存储代码

6.cell区：存储Map等

然后理解新生代算法和老生代算法

**新生代算法**

scavenge算法

在新生代空间中，内存空间分为两部分，分别为 From 空间和 To 空间。在这两个空间中，必定有一个空间是使用的，另一个空间是空闲的。新分配的对象会被放入 From 空间中，当 From 空间被占满时，新生代 GC 就会启动了。算法会检查 From 空间中存活的对象并复制到 To 空间中，如果有失活的对象就会销毁。当复制完成后将 From 空间和 To 空间互换，这样 GC 就结束了。

**老生代算法**

标记清除法和标记压缩算法

在这个阶段中，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有没有被标记的对象。在标记大型对内存时，可能需要几百毫秒才能完成一次标记。这就会导致一些性能上的问题。为了解决这个问题，2011 年，V8 从 stop-the-world 标记切换到增量标志。在增量标记期间，GC 将标记工作分解为更小的模块，可以让 JS 应用逻辑在模块间隙执行一会，从而不至于让应用出现停顿情况。但在 2018 年，GC 技术又有了一个重大突破，这项技术名为并发标记。该技术可以让 GC 扫描和标记对象时，同时允许 JS 运行。

CPU空闲清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩过程中，将活的对象像一端移动，直到所有对象都移动完成，然后CPU空闲时清理掉不需要的内存。

这个和Java回收策略思想是一致的。目的是通过区分“临时”与“持久”对象；多回收“临时对象”区（young generation），少回收“持久对象”区（tenured generation），减少每次需遍历的对象，从而减少每次GC的耗时。如图：


  <img loading="lazy" width="690" height="158" class="alignnone size-full wp-image-4984 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca70d12dde.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca70d12dde.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca70d12dde.png?x-oss-process=image/format,webp 690w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca70d12dde.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_69/format,webp 300w" sizes="(max-width: 690px) 100vw, 690px" />

    这里需要补充的是：对于tenured generation对象，有额外的开销：把它从young generation迁移到tenured generation，另外，如果被引用了，那引用的指向也需要修改。

&nbsp;

### （2）增量GC

这个方案的思想很简单，就是“每次处理一点，下次再处理一点，如此类推”。如图：


  <img loading="lazy" width="680" height="129" class="alignnone size-full wp-image-4985 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca71b764a5.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca71b764a5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca71b764a5.png?x-oss-process=image/format,webp 680w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5ca71b764a5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_57/format,webp 300w" sizes="(max-width: 680px) 100vw, 680px" />

    这种方案，虽然耗时短，但中断较多，带来了上下文切换频繁的问题。

&nbsp;

4. 总结

因为每种方案都其适用场景和缺点，因此在实际应用中，会根据实际情况选择方案。

比如：低 (对象/s) 比率时，中断执行GC的频率，simple GC更低些；如果大量对象都是长期“存活”，则分代处理优势也不大。
