---
title: 学习和使用flexbox布局以及变态android文字垂直居中

---
是时候好好学习flex布局了，之前的开发经验主要集中在web pc端开发，现在主要集中在H5页面的开发，既然H5基本都支持flex布局，为什么不熟练使用呢？这里借用下阮老师的图，我也自己谢谢学到的flex布局的知识，作为补充。

<img loading="lazy" class="aligncenter" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/09/bg2015071002.png" alt="flex布局-haomou.net" width="274" height="144" />

# 知识运用：

## 垂直居中：

记得上次我写个垂直居中，由于图标的形状看起来偏下一些，所以用了margin/top+relative的方式来写，结果H5下面出了一堆兼容的问题，后来还是改成vertical-align的方式来写。同一父元素下所有子元素如果都是inline-block，那么采用vertical-align是比较好的垂直居中方式，当然vertical-align的值需要都是middle即可。

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

## 有背景色，内容偏上

一般情况下, [我们](https://www.w3cdoc.com)把 `line-height` 的值设置为 `height` 的值, 就可以实现文字垂直居中

但貌似移动端不太友好, 文字总是略微偏上一点点, 这看上去就很不舒服了, 很影响用户体验

考虑过加上 `padding: xxrem 0`, 但结果还是不太满意&#8230;

最终找到两种解决办法, 代码如下

* 方法一

<pre><code class="hljs css">&lt;span class="hljs-selector-tag">span&lt;/span> {
    &lt;span class="hljs-attribute">width&lt;/span>: &lt;span class="hljs-number">1rem&lt;/span>;
    &lt;span class="hljs-attribute">height&lt;/span>: &lt;span class="hljs-number">1rem&lt;/span>;
    &lt;span class="hljs-attribute">font-size&lt;/span>: &lt;span class="hljs-number">0.12rem&lt;/span>;
    &lt;span class="hljs-attribute">color&lt;/span>: green;
    &lt;span class="hljs-attribute">background&lt;/span>: lightblue;

    &lt;span class="hljs-attribute">display&lt;/span>: flex;
    &lt;span class="hljs-attribute">justify-content&lt;/span>: center;
    &lt;span class="hljs-attribute">align-items&lt;/span>: center;
    &lt;span class="hljs-attribute">flex-direction&lt;/span>: column;
}</code></pre>

* 方法二 (仅限于字数固定情况)

<pre><code class="hljs css">&lt;span class="hljs-selector-tag">span&lt;/span> {
    &lt;span class="hljs-attribute">font-size&lt;/span>: &lt;span class="hljs-number">0.12rem&lt;/span>;
    &lt;span class="hljs-attribute">color&lt;/span>: green;
    &lt;span class="hljs-attribute">background&lt;/span>: lightblue;
    &lt;span class="hljs-attribute">padding&lt;/span>: &lt;span class="hljs-number">0.03rem&lt;/span> &lt;span class="hljs-number">0.15rem&lt;/span>;
}</code></pre>

方法三：

上简单的方法使用 vertical-align和父父元素的lin-height来实现。<img loading="lazy" width="416" height="94" class="alignnone size-full wp-image-4428 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e6735d563.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e6735d563.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e6735d563.png?x-oss-process=image/format,webp 416w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e6735d563.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_68/format,webp 300w" sizes="(max-width: 416px) 100vw, 416px" />

<pre class="EnlighterJSRAW" data-enlighter-language="null">.count-down-wrapper {
    line-height: 24px; // 最外层设置行高，为了让下一层高度撑开
    .end-time-box {
        font-weight: 500;
        font-size: 0px;
        visibility: hidden;
        border-top-left-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 24px;
        background: #ffffff;
        position: relative;
        &:before {      // 设置背景色，因为内部设置背景色的话，可能对不齐
            content: '';
            width: 69px;
            background: #000000;
            border-top-left-radius: 6px;
            height: 24px;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .end-time-label {
        color: #ffffff;
        font-size: 15px;
        line-height: normal; // 行高设置成normal
        padding: 0 12px;
        z-index: 1;
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }
    .end-time {
        color: #000000;
        font-size: 16px;
        padding: 0 12px;
        line-height: normal; // 行高设置成normal
        display: inline-block;
        vertical-align: middle;
    }
}</pre>

最后结果：<img loading="lazy" width="372" height="88" class="alignnone size-full wp-image-4429 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e77e34d14.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e77e34d14.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e77e34d14.png?x-oss-process=image/format,webp 372w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf3e77e34d14.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_71/format,webp 300w" sizes="(max-width: 372px) 100vw, 372px" />

这个效果我在华为mate9手机测试完美，但是锤子坚果pro3 手机测试还是会偏上。最后我还是放弃了，选用flex方法，但是注意的是文本元素不要写line-height属性。

<pre class="EnlighterJSRAW" data-enlighter-language="null">.count-down-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .end-time-box {
        font-weight: 500;
        font-size: 0px;
        visibility: hidden;
        border-top-left-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 24px;
        background: #ffffff;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &:before {
            content: '';
            width: 69px;
            background: #000000;
            border-top-left-radius: 6px;
            height: 24px;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
    .end-time-label {
        color: #ffffff;
        font-size: 15px;
        padding: 0 12px;
        z-index: 1;
        position: relative;
    }
    .end-time {
        color: #000000;
        font-size: 16px;
        padding: 0 12px;
    }
}</pre>

这样测试结果是锤子手机ok了，华为手机有点偏下。<img loading="lazy" width="390" height="156" class="alignnone size-full wp-image-4430 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf50249954c1.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf50249954c1.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf50249954c1.png?x-oss-process=image/format,webp 390w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5cf50249954c1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_120/format,webp 300w" sizes="(max-width: 390px) 100vw, 390px" />

再认真，我就输了。调了几天，真是心累。

方案4： 补充一个终极方案

其实和上面的flex方案一样， 不要设置元素的行高，采用默认行高，然后每个元素单独用

<pre class="EnlighterJSRAW" data-enlighter-language="null">align-self: center;</pre>

让他居中展示。关于背景色这个用高度控制就好了，不要设置行高，切记。

&nbsp;

# 参考文献：

  1. Flex 布局教程：语法篇：<https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html>
  2. <p id="page-title" class="asset-name entry-title">
      Flex 布局教程：实例篇：<a href="https://www.ruanyifeng.com/blog/2015/07/flex-examples.html">https://www.ruanyifeng.com/blog/2015/07/flex-examples.html</a>

    </p>
