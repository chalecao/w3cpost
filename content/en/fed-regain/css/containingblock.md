---
title: 什么是containing block？
weight: 9


---
如果干巴巴的问一个[前端](https://www.w3cdoc.com)什么是containing block。大部分都不知所云。官方示意如下：

> The size and position of an element are often impacted by its containing block. Most often, the containing block is the content area of an element&#8217;s nearest block-level ancestor, but this is not always the case. In this article, we examine the factors that deterime an element&#8217;s containing block.

简单来说就是——**无特殊情况下，containing block（包含块）就是最近的块元素的content area（内容区）**。

## 什么是内容区？

以这个经典的盒模型图：

![](/images/posts/2022-12-03-21-02-14.png)

最内部的即为内容区。

### border-box

有两种盒子模型：

①是标准盒子模型，一般浏览器默认为标准盒子模型。即:box-sizing:content-box
- 没有设置box-sizing:border-box属性，宽高就是设置的宽度和高度，展示在页面上的宽高会加上padding和border的值
- 比如填满宽度的时候直接写width：100%，这时候如果有padding和border，页面会被撑开，出现滚动条

②是怪异盒子模型，可根据实际项目需要自行设置。即：box-sizing:border-box
- 加了box-sizing:border-box属性，padding和border的值都算在设置的width和height数值里面，一些老司机可能喜欢这个
- 比如填满宽度的时候，可以直接写width：100%


[我们](https://www.w3cdoc.com)平时用到过吗？

这个概念虽然可能不熟悉，但是实际上[我们](https://www.w3cdoc.com)经常用到：

```
.outer {
    width: 200px;
    box-sizing: border-box;
}
.inner {
    width: 80%;
}
```

inner的宽度是多少呢？毫无疑问，是**160px**。那稍微加一点戏，如果outer增加一条属性`padding: 50px`，这时候inner的宽度是多少？

很多人会迟疑一下，因为不知道背后的原理，只能根据经验推断，如果经验老道，会给出正确答案：**80px**。

实际上，这些**百分比值的运作原理都是通过包含块来计算出最后结果**。再回想一下之前的规范，**包含块通常是最近的块元素的内容区**，就可以很清晰的理解padding值在这个例子中起的作用了。

> 元素的尺寸和位置经常受其包含块的影响。

## 特殊情况

如果敏感的人看到这可能会产生一个疑惑，如果把例子改成这样？

```
.outer {
    position: relative;
    width: 200px;
    padding: 50px;
    box-sizing: border-box;
}
.inner {
    position: absolute;
    width: 80%;
}
```
这时候inner width又是多少呢？是**160px**。好不容易刚消化的知识就给了当头一棍。。。然后回想一下平时用的时候好像确实是这样！

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

chrome率先实现了一个实验特性`contain`。它允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分。从而使得[浏览器](https://www.w3cdoc.com)在重新计算布局、样式、绘图或它们的组合的时候，只会影响到有限的 DOM 区域，而不是整个页面。

在它的可选值中，**paint**的作用是使得该元素的子孙节点不会超出它的边缘。

那父元素`contain: paint`和子元素`position: fixed`结合会如何呢？

实验结果是，fixed的元素表现得像是父元素设置了`transform/perspective/filter`一样，说明它的包含块被`contain: paint`属性所影响。

MDN文档中没提到，那是Chrome意外实现了一个彩蛋吗？

> The element acts as a containing block for absolutely positioned and fixed positioned descendants.

## 参考

  1. <a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2FContaining_block" target="_blank" rel="nofollow noopener noreferrer">Layout and the containing block</a>
  2. <a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fcontain" target="_blank" rel="nofollow noopener noreferrer">contain</a>
  3. <a href="https://link.juejin.im?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fcss-contain-1%2F%23containment-paint" target="_blank" rel="nofollow noopener noreferrer">containment-paint<br /> </a>
