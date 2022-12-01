---
title: 大话JavaScript 引擎扫盲篇





---
关于本文标题，我并不认为参与写或者读本文的人是白痴。但是有时某个话题会让你觉得自己就像个白痴一样，而 JavaScript 引擎就是这些话题之一，至少对于我来说是这样。

<p id="OhaecAw">
  <img loading="lazy" class="alignnone  wp-image-3446 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c89ca151.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c89ca151.png?x-oss-process=image/format,webp" alt="" width="321" height="402" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c89ca151.png?x-oss-process=image/format,webp 430w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c89ca151.png?x-oss-process=image/quality,q_50/resize,m_fill,w_240,h_300/format,webp 240w" sizes="(max-width: 321px) 100vw, 321px" />
</p>

有时编写 Web 应用的代码会感觉充满魔力，因为[我们](https://www.w3cdoc.com)只是写了一系列字符，就能在[浏览器](https://www.w3cdoc.com)里看到效果了。但是理解魔法背后的技术，可以帮助你更好地提高编程技巧。至少当你试图解释在 JavaScript 驱动的 web 或移动应用的幕后发生了什么的时候，会觉得自己不那么白痴了。

很多年前，那是我还是个研究生讲师，向一个教授抱怨还没有掌握那些特别难懂的法语语法点，可以教给我的本科学生。我记得当时她说的话：“有时候，学习某个事物的唯一方式就是教授它。”

尝试向工程师解释 NativeScript 是如何通过 JavaScript 引擎[在幕后工作][1]、在运行时连接调用原生的 APIs——面对这样一件复杂的工作很容易在一片杂草中迷失方向。事实上，任何 JavaScript 开发者都应该对[我们](https://www.w3cdoc.com)每天使用的这门技术基础的引擎感到好奇。现在[我们](https://www.w3cdoc.com)一起来仔细分析下 JavaScript 引擎到底做了什么，为什么不同的平台使用不同引擎，多年来它们是如何发展的，以及作为开发者[我们](https://www.w3cdoc.com)为什么要关注这些。

&nbsp;

# 专业术语

“JavaScript 引擎”通常被称作一种 [虚拟机][2]。“虚拟机”是指软件驱动的给定的计算机系统的模拟器。有很多类型的虚拟机，它们根据自己在多大程度上精确地模拟或代替真实的物理机器来分类。

例如，“系统虚拟机”提供了一个可以运行操作系统的完整仿真平台。Mac 用户很熟悉的 [Parallels][3] 就是一个允许你在 Mac 上运行 Windows系统虚拟机。

另一方面，“进程虚拟机”不具备全部的功能，能运行一个程序或者进程。[Wine][4] 是一个允许你在 Linux 机器上运行 Windows 应用的进程虚拟机，但是并不在 Linux 中提供完整的 Windows 操作系统。

JavaScript 虚拟机是一种进程虚拟机，专门设计来解释和执行的 JavaScript 代码。

* * *

**注意：要区别在[浏览器](https://www.w3cdoc.com)中排布页面布局的 [布局引擎][5] 和解释和执行代码的底层 JavaScript 引擎是非常重要的。在 [这里][6] 可以找到一个很好的阐释。**

* * *

#

# **什么是 JavaScript 引擎**

JavaScript 引擎的基本工作是把开发人员写的 JavaScript 代码转换成高效、优化的代码，这样就可以通过[浏览器](https://www.w3cdoc.com)进行解释甚至嵌入到应用中。事实上，JavaScriptCore [自称为“优化虚拟机”][7]。

更准确地讲，每个 JavaScript 引擎都实现了一个版本的 ECMAScript，JavaScript 是它的一个分支。随着 ECMAScript 的不断发展，JavaScript 引擎也不断改进。之所以有这么多不同的引擎，是因为它们每个都被设计运行在不同的 web [浏览器](https://www.w3cdoc.com)、headless [浏览器](https://www.w3cdoc.com)、或者像 Node.js 那样的运行时环境中。

* * *

**你也许熟悉 web [浏览器](https://www.w3cdoc.com)，那什么是 headless [浏览器](https://www.w3cdoc.com)呢？它是一个没有图形用户界面的 web [浏览器](https://www.w3cdoc.com)。它们在对 web 产品进行自动化测试时十分有用。一个很棒的例子就是 [PhantomJS][8]。那 Node.js 又和 JavaScript 引擎有什么关系？Node.js 是一个异步的、事件驱动的框架，让你在服务器端可以使用 JavaScript。既然他们是驱动 JavaScript 的工具，所以它们也是由 JavaScript 引擎驱动。**

* * *

按照上述关于虚拟机的定义，把 JavaScript 引擎称作进程虚拟机就很好理解了，因为它的唯一的目的就是读取和编译 JavaScript 代码。这并不意味着它只是个简单的引擎。比如，[JavaScriptCore][7] 就有六个“构建模块”可以分析、解释、优化、垃圾回收 JavaScript 代码。

它是如何工作的？

当然，这决定于引擎。吸引[我们](https://www.w3cdoc.com)注意的两个主要的引擎都利用了 NativeScript ，它们分别是 WebKit 的 JavaScriptCore 和 Google 的 V8 引擎。这两个引擎使用不同的方式处理代码。

JavaScriptCore 执行 [一系列步骤][7] 来解释和优化脚本：

  1. 它进行词法分析，就是将源代码分解成一系列具有明确含义的符号或字符串。
  2. 然后用语法分析器分析这些符号，将其构建成语法树。
  3. 接着四个 JIT（Just-In-Time）进程开始参与进来，分析和执行解析器所生成的字节码。

* * *

**什么？简单来说，JavaScript 引擎会加载你的源代码，把它分解成字符串（又叫做分词），再 [把这些字符串转换][9] 成编译器可以理解的字节码，然后执行这些字节码。**

* * *

Google 的 [V8 引擎][10] 是用 C++ 编写的，它也能够编译并执行 JavaScript 源代码、处理内存分配和垃圾回收。它被[设计][11]成由两个编译器组成，可以把源码直接编译成机器码：

  1. **Full-codegen**：输出未优化代码的快速编译器
  2. **Crankshaft**: 输出执行效率高、优化过的代码的慢速编译器

**如果 [Crankshaft][12] 确定需要优化的代码是由 Full-codegen 生成的未优化代码，它就会取代 Full-codegen，这个过程叫做“crankshafting”。**

* * *

一旦编译过程中产生了机器代码，引擎就会向[浏览器](https://www.w3cdoc.com)暴露所有的数据类型、操作符、对象、在 ECMA 标准中指定的函数、或任何运行时需要使用的东西，[NativeScript][13] 就是如此。

&nbsp;

# 有哪些 JavaScript 引擎

有一大堆令人眼花缭乱的 JavaScript 引擎可以用来解释、分析和执行你的客户端代码。每个[浏览器](https://www.w3cdoc.com)版本发布时，它的 JavaScript 引擎都可能有所改变或优化以跟上 JavaScript 代码执行技术的状况的变化。

**你还没被这些[浏览器](https://www.w3cdoc.com)引擎的名字完全弄糊涂之前，请记住很多市场营销的元素被加入了这些引擎和以它们为基础的[浏览器](https://www.w3cdoc.com)。这篇对 JavaScript 编译 [十分有用的分析][14] 中，作者讽刺地指出：“你所不知道的是，编译器大约有 37% 是由市场营销构成的，对编译器进行品牌重塑也是你能做的为数不多的事情之一，智慧的市场营销，故而有了一系列名字：SquirrelFish、Nitro、SFX……”。**

* * *

在牢记营销对命名和重命名这些引擎的影响的同时，注意到几件在 JavaScript 引擎发展史上的重大事件是很有用的。我为你做了一个便于理解的图表：

<table>
  <tr>
    <th>
      Browser, Headless Browser, or Runtime
    </th>

    <th>
      JavaScript Engine
    </th>
  </tr>
  
  <tr>
    <td>
      Mozilla
    </td>

    <td>
      Spidermonkey
    </td>
  </tr>
  
  <tr>
    <td>
      Chrome
    </td>

    <td>
      V8
    </td>
  </tr>
  
  <tr>
    <td>
      Safari
    </td>

    <td>
      JavaScriptCore
    </td>
  </tr>
  
  <tr>
    <td>
      IE and Edge
    </td>

    <td>
      Chakra
    </td>
  </tr>
  
  <tr>
    <td>
      PhantomJS
    </td>

    <td>
      JavaScriptCore
    </td>
  </tr>
  
  <tr>
    <td>
      HTMLUnit
    </td>

    <td>
      Rhino
    </td>
  </tr>
  
  <tr>
    <td>
      TrifleJS
    </td>

    <td>
      V8
    </td>
  </tr>
  
  <tr>
    <td>
      Node.js
    </td>

    <td>
      V8
    </td>
  </tr>
  
  <tr>
    <td>
      Io.js<em>*</em>
    </td>

    <td>
      V8
    </td>
  </tr>
</table>

*JavaScriptCore 被改写为 SquirrelFish，升级版本为 QuirrelFish Extreme，也叫做 Nitro。然而，构成 Webkit 实现基础的 JavaScript 引擎就是 JavaScriptCore（比如 Safari）。

**iOS 开发者应该要知道移动设备的 Safari 使用 Nitro，但是 UIWebView 不包括 JIT 编译，所以体验会慢一些。然而开发人员可以在 iOS8 中使用包含 Nitro 的 [WKWebView][15]，使用体验 [明显][16] 变快。混合移动应用程序的开发人员应该能松口气了。

_*_最终 io.js 从 Node.js 分离开的原因之一就是为了支持 V8 版本的引擎。这仍然是一个挑战，正如 [这里][17] 讲述的。

&nbsp;

# 为什么要关注

**JavaScript 引擎的代码解析和执行过程的目标就是在最短时间内编译出最优化的代码。**

最重要的是，这些引擎的演进与[我们](https://www.w3cdoc.com)对发展 web 和 移动平台的不断探究息息相关，让它们尽可能具有高性能，是相辅相成的。为了追踪这种演进，你可以看到各种各样的引擎在基准图中是如何表现的，就好像 [arewefastyet.com][18] 总结的。例如，比较 Chrome 在搭载 V8 引擎与 non-Crankshafted 引擎时的表现就很有趣。

<p id="TKJpUOl">
  <img loading="lazy" width="690" height="465" class="alignnone size-full wp-image-3445 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c72330c2.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c72330c2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c72330c2.png?x-oss-process=image/format,webp 690w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/01/img_5c3d3c72330c2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_202/format,webp 300w" sizes="(max-width: 690px) 100vw, 690px" />
</p>

任何一个 web 开发者都要意识到，[我们](https://www.w3cdoc.com)努力编写、调试和维护的代码在不同[浏览器](https://www.w3cdoc.com)中执行效果必然有所差异。为什么某段代码在一个[浏览器](https://www.w3cdoc.com)上工作得很慢，但在另一个上却快得多？

同样地，移动开发者，尤其是使用 webview 显示页面内容的混合移动应用开发者，或者那些使用像 NativeScript 这种运行时环境的开发者，想知道是什么引擎在解释执行他们的 JavaScript 代码。移动 web 开发者应该注意到那些小小设备上的[浏览器](https://www.w3cdoc.com)所具备的各种局限性和可能性。作为一个想持续发展的 web、移动或应用程序开发人员，时刻关注 JavaScript 引擎的变化会带给你超值回报。

# 参考

  1. [a-guide-to-javascript-engines-for-idiots][19]

 [1]: https://developer.telerik.com/featured/nativescript-works/
 [2]: https://en.wikipedia.org/wiki/Virtual_machine
 [3]: https://parallels.com/
 [4]: https://www.winehq.org/
 [5]: https://en.wikipedia.org/wiki/Comparison_of_layout_engines_ECMAScript
 [6]: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
 [7]: https://trac.webkit.org/wiki/JavaScriptCore
 [8]: https://phantomjs.org/
 [9]: https://en.wikipedia.org/wiki/Parse_tree
 [10]: https://docs.google.com/document/d/1hOaE7vbwdLLXWj3C8hTnnkpE0qSa2P--dtDvwXXEeD0/pub
 [11]: https://developers.google.com/v8/design
 [12]: https://en.wikipedia.org/wiki/Crankshaft
 [13]: https://nativescript.org/
 [14]: https://wingolog.org/archives/2011/10/28/javascriptcore-the-webkit-js-implementation
 [15]: https://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/
 [16]: https://devgirl.org/2014/11/10/boost-your-ios-8-mobile-app-performance-with-wkwebview/
 [17]: https://medium.com/node-js-javascript/4-0-is-the-new-1-0-386597a3436d
 [18]: https://arewefastyet.com/#machine=29
 [19]: https://developer.telerik.com/featured/a-guide-to-javascript-engines-for-idiots/
