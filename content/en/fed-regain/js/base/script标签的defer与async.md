---
title: script标签的defer与async



  - 1582

  - 2





---
## javascript知识点

  1. `<script src="script.js"></script>`没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。
  2. `<script async src="script.js"></script>`有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。加载完之后，会执行js，此时会阻断文档渲染。
  3. `<script defer src="myscript.js"></script>`有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。
  4. defer和async用一个就好了，混用没有意义。

<img loading="lazy" class="alignnone wp-image-1684 size-full" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/03/2151798436-59da4801c6772_articlex.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/03/2151798436-59da4801c6772_articlex.png?x-oss-process=image/format,webp" alt="" width="787" height="800" />

## 什么时候用到

为了提升页面加载速度，提升页面秒开率，一般会区分出首屏的模块和非首屏模块，最先加载首屏模块，然后是非首屏模块。非首屏模块的js如果不是动态加载而是写在html上的，那么可以使用defer标签，让他异步加载执行。

还有比如一些日志记录，打点等js脚本等，都可以这样实现。采用async或者defer关键字，这个主要还是看执行时机。

## 加载优先级

<p id="WXADBSh">
  <img loading="lazy" width="2600" height="2157" class="alignnone size-full wp-image-3798 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/format,webp 2600w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_249/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_637/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f244c8d752.png?x-oss-process=image/quality,q_50/resize,m_fill,w_723,h_600/format,webp 723w" sizes="(max-width: 2600px) 100vw, 2600px" />
</p>

并不是所有浏览器都一样的，但是在chrome调试工具中可以打开优先级的选项查看：

<p id="ZdrPvAE">
  <img loading="lazy" class="alignnone wp-image-3799 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/format,webp" alt="" width="791" height="461" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/format,webp 1760w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_175/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_447/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7f2464759e6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_466/format,webp 800w" sizes="(max-width: 791px) 100vw, 791px" />
</p>

&nbsp;

## 特别注意

需要特别注意的是，通过动态插入标签添加defer和async都没有意义，都是先加载完，先执行

<pre class="EnlighterJSRAW" data-enlighter-language="null">(function () {
      var getAssets = function (url, callback) {
        var element = document.createElement("script");
        element.type = 'text/javascript';
        element.defer = 'defer';
        element.src = url;
        document.head.appendChild(element);
      }
      var react = 'js/react.js';
      var reactP = 'js/index.js';
      getAssets(react);
      getAssets(reactP);

    })();</pre>

&nbsp;
