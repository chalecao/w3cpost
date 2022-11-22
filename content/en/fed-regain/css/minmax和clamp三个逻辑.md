---
title: minmax和clamp三个逻辑

---
<header class="w-article-header">

<p class="w-article-header__subhead w-mb--non">
  了解如何使用这些受支持的CSS函数控制元素的大小，保持适当的间距以及实现流体排版。
</p></header>

随着响应式设计的发展和日益细化，CSS本身也在不断发展，并为作者提供了更多的控制权。的 [`min()`][1]， [`max()`][2]和 [`clamp()`][3]功能，现在支持所有现代浏览器，都在做创作网站最新的工具中和网络应用更加积极地。

当谈到灵活和流体排版，控制单元调整大小，并保持适当的间隙，`min()`，`max()`，和`clamp()`可以提供帮助。

## 背景 {#background}

> 数学函数，`calc()`，`min()`，`max()`，和`clamp()`允许与另外的数学表达式（+），减（ &#8211; ），乘（*），和除（/），以用作组分值
>
> <cite><a href="https://www.w3.org/TR/css-values-4/#calc-notation">CSS值和单位级别4</a></cite>

Safari是第一个[出货][4] 的一整套功能在四月2019年，含铬那年以下后，今年79版，与Firefox [75][5]航运，我们现在有浏览器的奇偶`min()`，`max()`和`clamp()`所有常绿浏览器。<figure class="w-figure"></figure>

<p id="OegLNcn">
  <img loading="lazy" width="1373" height="422" class="alignnone size-full wp-image-6341 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/format,webp 1373w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_92/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_246/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb3eda30a5f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_236/format,webp 768w" sizes="(max-width: 1373px) 100vw, 1373px" />
</p>

您可以在任何有意义的CSS表达式的右侧使用`min()`，`max()`和`clamp()`。对于`min()`和`max()`，您提供了一个值列表，然后浏览器确定哪一个分别是最小的或最大的。例如，对于：`min(1rem, 50%, 10vw)`，浏览器将计算这些相对单位中的最小单位，并将该值用作实际值。`max()`函数从逗号分隔的表达式列表中选择最大值。`clamp()`输入三个值：最小值，理想值（从中进行计算）和最大值。

您可以单独使用它们（即`font-size: max(0.5vw, 50%, 2rem)`），将它们结合使用`calc()`（即`font-size: max(calc(0.5vw - 1em), 2rem)`）或组合使用（即`font-size: max(min(0.5vw, 1em), 2rem)`）。

<div class="w-aside w-aside--note">
  <blockquote>
    <p>
      当使用的计算内<code>min()</code>，<code>max()</code>或<code>clamp()</code> 功能，可以nix上<code>calc()</code>。例如，写作<code>font-size: max(calc(0.5vw - 1em), 2rem)</code>将与相同<code>font-size: max(0.5vw - 1em, 2rem)</code>。
    </p>
  </blockquote>
</div>

回顾一下：

* `min()`：从逗号分隔的表达式列表中选择最小（最负数）的值
* `max()`：从逗号分隔的表达式列表中选择最大（最正）的值
* `clamp(, , )`：根据设定的理想值在上限和下限之间钳位一个值

## 示例：完美的宽度 {#the-perfect-width}

根据 罗伯特·布林赫斯特（Robert Bringhurst）的《[印刷风格要素][6]》，“对于以文本大小设置在带衬线的文本面上的单列页面，从45到75个字符的任何长度都被认为是令人满意的行长。”

为确保您的文本块不小于45个字符或不大于75个字符，请使用`clamp()`和`ch`（0宽度[字符前进][7]）单位：

<pre class="language-css"><code class="language-css">&lt;span class="token selector">p&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token property">width&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token function">clamp&lt;/span>&lt;span class="token punctuation">(&lt;/span>45ch&lt;span class="token punctuation">,&lt;/span> 50%&lt;span class="token punctuation">,&lt;/span> 75ch&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>

这允许浏览器确定段落的宽度。它将宽度设置为50％，除非50％小于`45ch`，这时`45ch`将选择，反之亦然，如果50％大于则反之亦然`75ch`。

## 参考

* [MDN上的CSS值和单位][8]
* [CSS值和单位4级规范][9]
* [CSS关于内部元素宽度的技巧][10]
* [min（），max（），clamp（）概述（由Ahmad Shadeed撰写）][11]

 [1]: https://developer.mozilla.org/en-US/docs/Web/CSS/min
 [2]: https://developer.mozilla.org/en-US/docs/Web/CSS/max
 [3]: https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
 [4]: https://bugs.webkit.org/show_bug.cgi?id=167000
 [5]: https://bugzilla.mozilla.org/show_bug.cgi?id=1519519
 [6]: http://webtypography.net/2.1.2#:~:text=%E2%80%9CAnything%20from%2045%20to%2075,is%2040%20to%2050%20characters.%E2%80%9D
 [7]: https://developer.mozilla.org/en-US/docs/Web/CSS/length
 [8]: https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
 [9]: https://www.w3.org/TR/css-values-4/
 [10]: https://css-tricks.com/using-max-for-an-inner-element-max-width/
 [11]: https://ishadeed.com/article/css-min-max-clamp/
