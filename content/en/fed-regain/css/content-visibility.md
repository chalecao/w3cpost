---
title: content-visibility
weight: 10
---
该 [`content-visibility`][1] 属性在Chromium 85中启动，可能是影响页面加载性能的最具影响力的新CSS属性之一。`content-visibility`使用户代理可以跳过元素的渲染工作，包括布局和绘画，直到需要它为止。因为跳过了渲染，所以如果大部分内容不在屏幕上，则利用该`content-visibility`属性可使初始用户加载更快。它还允许与屏幕上的内容进行更快的交互。漂亮整齐。

![](/images/posts/csscontentdemo.jpeg)

在[我们](https://www.w3cdoc.com)的文章演示中，应用于`content-visibility: auto`分块的内容区域可以使初始负载的渲染性能提高**7倍**。请继续阅读以了解更多信息。  

## [浏览器](https://www.w3cdoc.com)支持

`content-visibility`依赖[CSS包含规范中的][2]基元。虽然`content-visibility`目前仅在Chromium 85中受支持（并且被Firefox 视为[“值得原型化”][3]），但[大多数现代[浏览器](https://www.w3cdoc.com)][4]都支持Containment Spec 。

## CSS Containment<a class="w-headline-link" href="https://web.dev/content-visibility/#containment" aria-hidden="true">＃</a>

CSS Containment的主要目标是通过提供**DOM子树**与页面其余部分的**可预测隔离**来实现Web内容的渲染性能改进。

基本上，开发人员可以告诉[浏览器](https://www.w3cdoc.com)页面的哪些部分被封装为一组内容，从而使[浏览器](https://www.w3cdoc.com)无需考虑子树之外的状态就可以对内容进行推理。知道内容（子树）的哪些位包含隔离的内容意味着[浏览器](https://www.w3cdoc.com)可以为页面渲染做出优化决策。

[CSS][5] Containment 四种类型，每种类型都是`contain`CSS属性的潜在值，可以将它们组合在一起，以空格分隔的值列表：

* `size`：元素上的大小限制可确保元素框的布局，而无需检查其后代。这意味着，如果[我们](https://www.w3cdoc.com)仅需要元素的大小，就可以跳过后代的布局。
* `layout`：布局限制意味着后代不会影响页面上其他框的外部布局。如果[我们](https://www.w3cdoc.com)只想布置其他盒子，这使[我们](https://www.w3cdoc.com)有可能跳过后代的布局。
* `style`：样式包含可确保不仅对后代具有影响的属性不会逃脱元素（例如，计数器）。如果[我们](https://www.w3cdoc.com)想要的只是在其他元素上计算样式，这使[我们](https://www.w3cdoc.com)有可能跳过后代的样式计算。
* `paint`：包含油漆可以确保容纳盒的后代不会显示在其边界之外。没有任何内容可以使元素明显溢出，并且如果元素在屏幕外或以其他方式不可见，则其后代也将不可见。如果元素不在屏幕上，这使[我们](https://www.w3cdoc.com)有可能跳过绘画后代。

## 使用content-visibility跳过渲染工作

可能很难弄清楚要使用哪个包含值，因为只有在指定了适当的设置后，[浏览器](https://www.w3cdoc.com)优化才能开始。您可以使用这些值来查看[最合适][5]的值，或者可以使用另一个CSS属性`content-visibility`来自动应用所需的包含。`content-visibility`确保开发人员以最小的努力获得最大的[浏览器](https://www.w3cdoc.com)性能提升。

content-visibility属性可以接受多个值，但是`auto`可以立即提高性能。有一个元素 `content-visibility: auto`的收益`layout`，`style`并`paint`遏制。如果该元素不在屏幕上（并且与用户无关，则相关元素将是在其子树中具有焦点或选择的元素），那么它也会获得`size`包容性（并且停止 [绘画][6] 和 对其内容进行[命中测试][7]）。

这是什么意思？简而言之，如果该元素不在屏幕上，则不会渲染其后代。[浏览器](https://www.w3cdoc.com)在不考虑元素任何内容的情况下确定元素的大小，并在此处停止。跳过大多数渲染，例如元素子树的样式和布局。

当元素接近视口时，[浏览器](https://www.w3cdoc.com)不再添加`size` 围堵并开始绘制和命中测试元素的内容。这使得渲染工作能够及时完成以被用户看到。

## 例如：旅游博客

![](/images/posts/img_5f6b4692bbe81.webp)

在此示例中，[我们](https://www.w3cdoc.com)将旅行博客的基线设置在右侧，并应用于`content-visibility: auto`左侧的大块区域。结果显示，在初始页面加载时，渲染时间从**232ms**变为**30ms**。</figcaption></figure>

一个旅游博客通常包含一组带有一些图片和一些描述性文字的故事。这是典型[浏览器](https://www.w3cdoc.com)导航到旅行博客时发生的情况：

  1. 页面的一部分以及任何所需的资源都从网络下载。
  2. [浏览器](https://www.w3cdoc.com)的样式和布局页面的所有内容，而无需考虑该内容是否对用户可见。
  3. [浏览器](https://www.w3cdoc.com)返回到步骤1，直到下载了所有页面和资源。

在步骤2中，[浏览器](https://www.w3cdoc.com)处理所有内容以查找可能已更改的内容。它会更新任何新元素的样式和布局，以及由于新更新而可能发生移动的元素。这是渲染工作。这需要时间。<figure class="w-figure">

![](/images/posts/csscontentdemo.jpeg)

现在考虑一下，如果您`content-visibility: auto`在博客中放置每个单独的故事，将会发生什么。一般循环是相同的：[浏览器](https://www.w3cdoc.com)下载并呈现页面的大块。但是，不同之处在于它在步骤2中所做的工作量。

借助内容可见性，它将设置样式和布局用户当前可见的所有内容（它们在屏幕上）。但是，当处理完全不在屏幕上的故事时，[浏览器](https://www.w3cdoc.com)将跳过渲染工作，仅样式化和布局元素框本身。

加载该页面的性能好象它包含完整的屏幕上的故事以及每个非屏幕上的故事的空白框。效果要好得多，可以_将_加载的渲染成本_降低50％或更多_。在[我们](https://www.w3cdoc.com)的示例中，[我们](https://www.w3cdoc.com)看到渲染时间从**232ms**提升到了 **30ms**。性能提升了**7倍**。

为了获得这些好处，您需要做什么工作？首先，[我们](https://www.w3cdoc.com)将内容分成几部分：
- story应用 了类将内容分块为小节的示例，以接收content-visibility: auto。参见[Codepen](https://codepen.io/vmpstr/pen/xxZoyMb)上的演示

然后，[我们](https://www.w3cdoc.com)将以下样式规则应用于这些部分：
```
.story {
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /*Explained in the next section.*/
}
```

请注意，随着内容移入和移出可见性，它将根据需要开始和停止呈现。但是，这并不意味着[浏览器](https://www.w3cdoc.com)将不得不一次又一次地渲染和重新渲染相同的内容，因为在可能的情况下会保存渲染工作。

### 用contain-intrinsic-size指定元素的自然大小

为了实现的潜在好处`content-visibility`，[浏览器](https://www.w3cdoc.com)需要应用大小限制，以确保内容的呈现结果不会以任何方式影响元素的大小。这意味着该元素将布局为好像是空的。如果元素没有在常规块布局中指定的高度，则其高度为0。

这可能不是理想的，因为滚动条的大小会发生变化，这取决于每个具有非零高度的故事。

值得庆幸的是，CSS提供了另一个属性，`contain-intrinsic-size`该属性可以有效地指定元素的自然大小（_如果元素受大小包含影响）_。在[我们](https://www.w3cdoc.com)的示例中，[我们](https://www.w3cdoc.com)将其设置`1000px`为截面的高度和宽度的估计值。

这意味着它将进行布局，就好像它有一个“内在大小”尺寸的子项一样，从而确保未调整大小的div仍然占据空间。 `contain-intrinsic-size`充当占位符大小来代替呈现的内容。

## 用content-visibility: hidden隐藏内容

如果要利用缓存的呈现状态的优点，使内容不呈现在屏幕上而又不呈现它怎么办？输入： `content-visibility: hidden`。

该`content-visibility: hidden`属性为您提供未渲染内容和缓存渲染状态的所有相同优点，与`content-visibility: auto`屏幕外一样。但是，与相比`auto`，它不会自动开始在屏幕上呈现。

这给了您更多的控制权，使您可以隐藏元素的内容并稍后快速取消隐藏它们。

将其与其他隐藏元素内容的常见方式进行比较：

* `display: none`：隐藏元素并破坏其渲染状态。这意味着取消隐藏元素与渲染具有相同内容的新元素一样昂贵。
* `visibility: hidden`：隐藏元素并保持其呈现状态。这并不能真正从文档中删除该元素，因为它（及其子树）仍占据页面上的几何空间，并且仍然可以单击。它也可以在需要时随时更新渲染状态，即使隐藏也是如此。

`content-visibility: hidden`另一方面，在保留元素的呈现状态的同时隐藏了该元素，因此，如果需要进行任何更改，则仅在再次显示该元素（即`content-visibility: hidden`删除属性）时才会发生更改 。

`content-visibility: hidden`在实现高级虚拟滚动条和测量布局时，一些很好的用例。

## 结论

`content-visibility`CSS包含规范意味着您的CSS文件将获得一些令人兴奋的性能提升。有关这些属性的更多信息，请签出：

* [CSS收容规范][2]
* [包含CSS的MDN文档][10]
* [CSSWG草案][11]

 [1]: https://drafts.csswg.org/css-contain/#propdef-content-visibility
 [2]: http://drafts.csswg.org/css-contain/
 [3]: https://github.com/mozilla/standards-positions/issues/135
 [4]: https://caniuse.com/#feat=css-containment
 [5]: https://developers.google.com/web/updates/2016/06/css-containment
 [6]: https://developers.google.com/web/updates/2018/09/inside-browser-part3#paint
 [7]: https://developers.google.com/web/updates/2018/09/inside-browser-part4#finding_the_event_target
 [8]: https://codepen.io/una/pen/rNxEWLo
 [9]: https://codepen.io/vmpstr/pen/xxZoyMb
 [10]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment
 [11]: https://github.com/w3c/csswg-drafts
