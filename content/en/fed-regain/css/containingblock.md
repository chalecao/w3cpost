---
title: 什么是containing block？


date: 2019-06-07T11:55:15+00:00
url: /html5css3/4464.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png
fifu_image_alt:
  - 什么是containing block？
views:
  - 1759
like:
  - 3


---
<h1 class="heading" data-id="heading-0">
  什么是containing block？
</h1>

如果干巴巴的问一个前端什么是containing block。大部分都不知所云。官方示意如下：

> The size and position of an element are often impacted by its containing block. Most often, the containing block is the content area of an element&#8217;s nearest block-level ancestor, but this is not always the case. In this article, we examine the factors that deterime an element&#8217;s containing block.

简单来说就是——**无特殊情况下，containing block（包含块）就是最近的块元素的content area（内容区）**。

<h1 class="heading" data-id="heading-1">
  什么是内容区？
</h1>

以这个经典的盒模型图：<img loading="lazy" width="455" height="340" class="alignnone size-full wp-image-4467 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png?x-oss-process=image/format,webp 455w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cfa527f183fa.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_224/format,webp 300w" sizes="(max-width: 455px) 100vw, 455px" />

最内部的即为内容区。

<h3 class="heading" data-id="heading-2">
  我们平时用到过吗？
</h3>

这个概念虽然可能不熟悉，但是实际上我们经常用到：

<pre><code class="hljs css copyable" lang="css">&lt;span class="hljs-comment">/*
&lt;div class="outer"&gt;
    &lt;div class="inner"&gt;&lt;/div&gt;
&lt;/div&gt;
*/&lt;/span>
&lt;span class="hljs-selector-class">.outer&lt;/span> {
    &lt;span class="hljs-attribute">width&lt;/span>: &lt;span class="hljs-number">200px&lt;/span>;
    &lt;span class="hljs-attribute">box-sizing&lt;/span>: border-box;
}
&lt;span class="hljs-selector-class">.inner&lt;/span> {
    &lt;span class="hljs-attribute">width&lt;/span>: &lt;span class="hljs-number">80%&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

inner的宽度是多少呢？毫无疑问，是**160px**。那稍微加一点戏，如果outer增加一条属性`padding: 50px`，这时候inner的宽度是多少？

很多人会迟疑一下，因为不知道背后的原理，只能根据经验推断，如果经验老道，会给出正确答案：**80px**。

实际上，这些**百分比值的运作原理都是通过包含块来计算出最后结果**。再回想一下之前的规范，**包含块通常是最近的块元素的内容区**，就可以很清晰的理解padding值在这个例子中起的作用了。

> 元素的尺寸和位置经常受其包含块的影响。

<h1 class="heading" data-id="heading-3">
  特殊情况
</h1>

如果敏感的人看到这可能会产生一个疑惑，如果把例子改成这样？

<pre><code class="hljs less copyable" lang="less">&lt;span class="hljs-selector-class">.outer&lt;/span> {
    &lt;span class="hljs-attribute">position&lt;/span>: relative;
    &lt;span class="hljs-attribute">width&lt;/span>: &lt;span class="hljs-number">200px&lt;/span>;
    &lt;span class="hljs-attribute">padding&lt;/span>: &lt;span class="hljs-number">50px&lt;/span>;
    &lt;span class="hljs-attribute">box-sizing&lt;/span>: border-box;
}
&lt;span class="hljs-selector-class">.inner&lt;/span> {
    &lt;span class="hljs-attribute">position&lt;/span>: absolute;
    &lt;span class="hljs-attribute">width&lt;/span>: &lt;span class="hljs-number">80%&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

这时候inner width又是多少呢？是**160px**。<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/6/2/163c0277070ef8b9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" width="100" data-src="https://user-gold-cdn.xitu.io/2018/6/2/163c0277070ef8b9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="400" data-height="400" />好不容易刚消化的知识就给了当头一棍。。。然后回想一下平时用的时候好像确实是这样！

所以规范提到了**无特殊情况下**，而特殊情况是：

  * 如果position是**absolute**，包含块就是它最近的position值不是static的元素的**padding area**。
  * 如果position是**fixed**，包含块就是视图，就是整个view可视范围视窗。
  * 如果position是**absolute**或**fixed**，包含块是最近的满足下列条件的元素的**padding area**： 
      * transform或perspective值不是none
      * filter值不是none
      * will change值包含transform、perspective、或filter（只有Firefox有效）

<h3 class="heading" data-id="heading-4">
  position: fixed
</h3>

了解了包含块的规范，可以更好的理解平时常用的一些特性的运行原理。而特殊情况的最后一点，其实还有一些场景可以利用。

比如如下场景：

引入了一个三方ui库，内部有一个弹窗组件，很正常的使用了fixed定位，那它的包含块就是视图了。如果这时，需要将它的位置进行调整，那怎么办？

可以利用`transform/perspective/filter`来改变这个弹窗所在的内容块，从而起到定位的作用。

<h3 class="heading" data-id="heading-5">
  contain
</h3>

理解了包含块，能够将特性运用到一些特定场景中，已经说明知识点消化的足够好了。但是下面的**彩蛋知识点**，还需要一点运气才能获得~因为它并没有在包含块的MDN文档中被提及。

chrome率先实现了一个实验特性`contain`。它允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分。从而使得浏览器在重新计算布局、样式、绘图或它们的组合的时候，只会影响到有限的 DOM 区域，而不是整个页面。

在它的可选值中，**paint**的作用是使得该元素的子孙节点不会超出它的边缘。

那父元素`contain: paint`和子元素`position: fixed`结合会如何呢？

实验结果是，fixed的元素表现得像是父元素设置了`transform/perspective/filter`一样，说明它的包含块被`contain: paint`属性所影响。

MDN文档中没提到，那是Chrome意外实现了一个彩蛋吗？<figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/6/2/163c050b9943b679?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/6/2/163c050b9943b679?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="198" data-height="131" /> <figcaption></figcaption></figure> 

确认了规范以后证实，Chrome并不是xjb实现的~

> The element acts as a containing block for absolutely positioned and fixed positioned descendants.

<h1 class="heading" data-id="heading-6">
  参考
</h1>

  1. <a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FContaining_block" target="_blank" rel="nofollow noopener noreferrer">Layout and the containing block</a>
  2. <a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fcontain" target="_blank" rel="nofollow noopener noreferrer">contain</a>
  3. <a href="https://link.juejin.im?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-contain-1%2F%23containment-paint" target="_blank" rel="nofollow noopener noreferrer">containment-paint<br /> </a>