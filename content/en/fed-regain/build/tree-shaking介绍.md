---
title: tree shaking介绍

---

<h1 class="article-title" data-v-3f6f7ca1="">Tree-Shaking性能优化实践 &#8211; 原理篇</h1> <div class="article-content" data-v-3f6f7ca1="" data-id="5a4dc9a66fb9a044ff31e06c">

<div>
  <h2 data-id="heading-0">
    一. 什么是Tree-shaking
  

  <div>
    先来看一下Tree-shaking原始的本意
  </div>
  <div>
    <div>
      
        <img class="lazyload inited loaded" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/160bfdcf2a31ce4a.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/160bfdcf2a31ce4a.gif?x-oss-process=image/format,webp" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/160bfdcf2a31ce4a.gif" data-width="606" data-height="341" />
      
    </div>
  </div>
 上图形象的解释了Tree-shaking 的本意，本文所说的[前端](https://www.w3cdoc.com)中的tree-shaking可以理解为通过工具&#8221;摇&#8221;[我们](https://www.w3cdoc.com)的JS文件，将其中用不到的代码&#8221;摇&#8221;掉，是一个性能优化的范畴。具体来说，在 webpack 项目中，有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过 tree-shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。
  
  <div>
    <div>
      
        <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4903 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee0587e76.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee0587e76.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee0587e76.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee0587e76.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
      
    </div>
  </div>
 Tree-shaking 较早由 Rich_Harris 的 rollup 实现，后来，webpack2 也增加了tree-shaking 的功能。其实在更早，google closure compiler 也做过类似的事情。三个工具的效果和使用各不相同，使用方法可以通过官网文档去了解，三者的效果对比，后文会详细介绍。
  
  <h2 data-id="heading-1">
    二. tree-shaking的原理
  

  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4904 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee165a0d3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee165a0d3.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee165a0d3.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee165a0d3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）。
  
 Tree-shaking 是 DCE 的一种新的实现，Javascript同传统的编程语言不同的是，javascript绝大多数情况需要通过网络进行加载，然后执行，加载的文件大小越小，整体执行时间更短，所以去除无用代码以减少文件体积，对javascript来说更有意义。
  
 Tree-shaking 和传统的 DCE的方法又不太一样，传统的DCE 消灭不可能执行的代码，而Tree-shaking 更关注宇消除没有用到的代码。下面详细介绍一下DCE和Tree-shaking。
  
  （1）先来看一下DCE消除大法
  
  <div>
    <div>
      
        <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4905 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee29c71f6.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee29c71f6.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee29c71f6.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee29c71f6.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
      
    </div>
  </div>
 Dead Code 一般具有以下几个特征
  
 •代码不会被执行，不可到达
  
 •代码执行的结果不会被用到
  
 •代码只会影响死变量（只写不读）
  
 下面红框标示的代码就属于死码，满足以上特征
  
  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4906 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee3a2e038.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee3a2e038.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee3a2e038.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee3a2e038.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    <div>
      图4
    </div>
  </div>
 传统编译型的语言中，都是由编译器将Dead Code从AST（抽象语法树）中删除，那javascript中是由谁做DCE呢？
  
 首先肯定不是[浏览器](https://www.w3cdoc.com)做DCE，因为当[我们](https://www.w3cdoc.com)的代码送到[浏览器](https://www.w3cdoc.com)，那还谈什么消除无法执行的代码来优化呢，所以肯定是送到[浏览器](https://www.w3cdoc.com)之前的步骤进行优化。
  
 其实也不是上面提到的三个工具，rollup，webpack，cc做的，而是著名的代码压缩优化工具uglify，uglify完成了javascript的DCE，下面通过一个实验来验证一下。
  
  <blockquote>
    
      以下所有的示例代码都能在[我们](https://www.w3cdoc.com)的github中找到，欢迎戳&#x2764;
    
  </blockquote>
 <a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flin-xi%2Ftreeshaking%2Ftree%2Fmaster%2Frollup-webpack" target="_blank" rel="nofollow noopener noreferrer">github.com/lin-xi/tree…</a>
  
  分别用rollup和webpack将图4中的代码进行打包
  
  <div>
    
      <img loading="lazy" width="720" height="438" class="alignnone size-full wp-image-4907 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee4d55202.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee4d55202.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee4d55202.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee4d55202.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_183/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    <div>
      图5
    </div>
  </div>
 中间是rollup打包的结果，右边是webpack打包的结果
  
 可以发现，rollup将无用的代码foo函数和unused函数消除了，但是仍然保留了不会执行到的代码，而webpack完整的保留了所有的无用代码和不会执行到的代码。
  
  分别用rollup + uglify和 webpack + uglify 将图4中的代码进行打包
  
  <div>
    
      <img loading="lazy" width="720" height="463" class="alignnone size-full wp-image-4924 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4af09d0815f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4af09d0815f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4af09d0815f.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4af09d0815f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_193/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    <div>
      图6
    </div>
  </div>
 中间是配置文件，右侧是结果
  
 可以看到右侧最终打包结果中都去除了无法执行到的代码，结果符合[我们](https://www.w3cdoc.com)的预期。
  
  (2) 再来看一下Tree-shaking消除大法
  
 前面提到了tree-shaking更关注于无用模块的消除，消除那些引用了但并没有被使用的模块。
  
 先思考一个问题，为什么tree-shaking是最近几年流行起来了？而[前端](https://www.w3cdoc.com)模块化概念已经有很多年历史了，其实tree-shaking的消除原理是依赖于ES6的模块特性。
  
  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4909 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee6cf0e57.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee6cf0e57.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee6cf0e57.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aee6cf0e57.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 ES6 module 特点：
  
  <ul>
    
      只能作为模块顶层的语句出现
    
    
      import 的模块名只能是字符串常量
    
    
      import binding 是 immutable的
    
  
 ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。
  
 所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如[我们](https://www.w3cdoc.com)可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。
  
 这是 ES6 modules 在设计时的一个重要考量，也是为什么没有直接采用 CommonJS，正是基于这个基础上，才使得 tree-shaking 成为可能，这也是为什么 rollup 和 webpack 2 都要用 ES6 module syntax 才能 tree-shaking。
  
 [我们](https://www.w3cdoc.com)还是通过例子来详细了解一下
  
 面向过程编程函数和面向对象编程是javascript最常用的编程模式和代码组织方式，从这两个方面来实验：
  
  <ul>
    
      函数消除实验
    
    
      类消除实验
    
  
  先看下函数消除实验
  
 utils中get方法没有被使用到，[我们](https://www.w3cdoc.com)期望的是get方法最终被消除。
  
  <div>
    
      <img loading="lazy" width="720" height="646" class="alignnone size-full wp-image-4912 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeec7d130e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeec7d130e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeec7d130e.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeec7d130e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_269/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeec7d130e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_669,h_600/format,webp 669w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 注意，uglify目前不会跨文件去做DCE，所以上面这种情况，uglify是不能优化的。
  
  先看看rollup的打包结果
  
  <div>
    
      <img loading="lazy" width="720" height="343" class="alignnone size-full wp-image-4911 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeea44e4de.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeea44e4de.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeea44e4de.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeea44e4de.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_143/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 完全符合预期，最终结果中没有get方法
  
  再看看webpack的结果
  
  <div>
    
      <img loading="lazy" width="720" height="962" class="alignnone size-full wp-image-4913 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeede564a9.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeede564a9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeede564a9.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeede564a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_225,h_300/format,webp 225w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeede564a9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_449,h_600/format,webp 449w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 也符合预期，最终结果中没有get方法
  
 可以看到rollup打包的结果比webpack更优化
  
  <blockquote>
    
      函数消除实验中，rollup和webpack都通过，符合预期
    
  </blockquote>
  
  再来看下类消除实验
  
 增加了对menu.js的引用，但其实代码中并没有用到menu的任何方法和变量，所以[我们](https://www.w3cdoc.com)的期望是，最终代码中menu.js里的内容被消除
  
  <div>
    
      <img loading="lazy" width="720" height="446" class="alignnone size-full wp-image-4914 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef1c2f776.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef1c2f776.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef1c2f776.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef1c2f776.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_186/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    <div>
      main.js
    </div>
  </div>
  <div>
    
      <img loading="lazy" width="720" height="507" class="alignnone size-full wp-image-4915 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef2f66ddc.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef2f66ddc.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef2f66ddc.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef2f66ddc.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_211/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    <div>
      menu.js
    </div>
  </div>
  
  rollup打包结果
  
  <div>
    
      <img loading="lazy" width="720" height="499" class="alignnone size-full wp-image-4916 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef40c2e3f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef40c2e3f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef40c2e3f.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef40c2e3f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_208/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 包中竟然包含了menu.js的全部代码
  
  webpack打包结果
  
  <div>
    
      <img loading="lazy" width="720" height="831" class="alignnone size-full wp-image-4917 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef551e918.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef551e918.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef551e918.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef551e918.png?x-oss-process=image/quality,q_50/resize,m_fill,w_260,h_300/format,webp 260w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef551e918.png?x-oss-process=image/quality,q_50/resize,m_fill,w_520,h_600/format,webp 520w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 包中竟然也包含了menu.js的全部代码
  
  <blockquote>
    
      类消除实验中，rollup，webpack 全军覆没，都没有达到预期
    
  </blockquote>
  <div>
    
      <img loading="lazy" class="alignnone wp-image-4918 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef6cb621b.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef6cb621b.png?x-oss-process=image/format,webp" alt="" width="178" height="182" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef6cb621b.png?x-oss-process=image/format,webp 521w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef6cb621b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_293,h_300/format,webp 293w" sizes="(max-width: 178px) 100vw, 178px" />
    

    <div>
      what happend？
    </div>
  </div>
 这跟[我们](https://www.w3cdoc.com)想象的完全不一样啊？为什么呢？无用的类不能消除，这还能叫做tree-shaking吗？我当时一度怀疑自己的demo有问题，后来各种网上搜索，才明白demo没有错。
  
 下面摘取了rollup核心贡献者的的一些回答
  
  <div>
    
      <img loading="lazy" width="720" height="482" class="alignnone size-full wp-image-4919 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef81e7fd2.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef81e7fd2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef81e7fd2.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aef81e7fd2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_201/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    

    
      
    
    
    <div>
      图7
    </div>
  </div>
  <ul>
    
      rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
    
    
      javascript动态语言的特性使得静态分析比较困难
    
    
      图7下部分的代码就是副作用的一个例子，如果静态分析的时候删除里run或者jump，程序运行时就可能报错，那就本末倒置了，[我们](https://www.w3cdoc.com)的目的是优化，肯定不能影响执行
    
  
 再举个例子说明下为什么不能消除menu.js，比如下面这个场景
  
  <div>
    ```
function Menu() {
}

Menu.prototype.show = function() {
}

Array.prototype.unique = function() {
    // 将 array 中的重复元素去除
}

export default Menu;
复制代码
```
  </div>
 如果删除里menu.js，那对Array的扩展也会被删除，就会影响功能。那也许你会问，难道rollup，webpack不能区分是定义Menu的proptotype 还是定义Array的proptotype吗？当然如果代码写成上面这种形式是可以区分的，如果我写成这样呢？
  
  <div>
    ```
function Menu() {
}

Menu.prototype.show = function() {
}

var a = 'Arr' + 'ay'
var b
if(a == 'Array') {
    b = Array
} else {
    b = Menu
}

b.prototype.unique = function() {
    // 将 array 中的重复元素去除
}

export default Menu;
复制代码
```
  </div>
 这种代码，静态分析是分析不了的，就算能静态分析代码，想要正确完全的分析也比较困难。
  
 更多关于副作用的讨论，可以看这个
  
 <a href="https://link.juejin.im/?target=http%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fgithub.com%2Frollup%2Frollup%2Fissues%2F349" target="_blank" rel="nofollow noopener noreferrer">Tree shaking class methods · Issue #349 · rollup/rollupgithub.com</a>
</div>

<div>
  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4920 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefafe097d.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefafe097d.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefafe097d.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefafe097d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
  <blockquote>
    
      tree-shaking对函数效果较好
    
  </blockquote>
 函数的副作用相对较少，顶层函数相对来说更容易分析，加上babel默认都是&#8221;use strict&#8221;严格模式，减少顶层函数的动态访问的方式，也更容易分析
  
 [我们](https://www.w3cdoc.com)开始说的三个工具，rollup和webpack表现不理想，那closure compiler又如何呢？
  
 将示例中的代码用cc打包后得到的结果如下：
  
  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4921 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefc5cc75f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefc5cc75f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefc5cc75f.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefc5cc75f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 天啊，这不就是[我们](https://www.w3cdoc.com)要的结果吗？完美消除所有无用代码的结果，输出的结果非常性感
  
  <blockquote>
    
      closure compiler， tree-shaking的结果完美！
    
  </blockquote>
 可是不能高兴得太早，能得到这么完美结果是需要条件的，那就是cc的侵入式约束规范。必须在代码里添加这样的代码，看红线框标示的
  
  <div>
    
      <img loading="lazy" width="720" height="261" class="alignnone size-full wp-image-4922 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefdb92d4f.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefdb92d4f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefdb92d4f.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aefdb92d4f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_109/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 google定义一整套注解规范Annotating JavaScript for the Closure Compiler，想更多了解的，可以去看下官网。
  
 侵入式这个就让人很不爽，google Closure Compiler是java写的，和[我们](https://www.w3cdoc.com)基于node的各种构建库不可能兼容（不过目前好像已经有nodejs版 Closure Compiler），Closure Compiler使用起来也比较麻烦，所以虽然效果很赞，但比较难以应用到项目中，迁移成本较大。
  
  说了这么多，总结一下：
  
 三大工具的tree-shaking对于无用代码，无用模块的消除，都是有限的，有条件的。closure compiler是最好的，但与[我们](https://www.w3cdoc.com)日常的基于node的开发流很难兼容。
  
  <div>
    
      <img loading="lazy" width="720" height="405" class="alignnone size-full wp-image-4923 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeff3345ab.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeff3345ab.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeff3345ab.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4aeff3345ab.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 720px) 100vw, 720px" />
    
  </div>
 tree-shaking对web意义重大，是一个极致优化的理想世界，是[前端](https://www.w3cdoc.com)进化的又一个终极理想。
  
 理想是美好的，但目前还处在发展阶段，还比较困难，有各个方面的，甚至有目前看来无法解
  
 决的问题，但还是应该相信新技术能带来更好的[前端](https://www.w3cdoc.com)世界。
  
 优化是一种态度，不因小而不为，不因艰而不攻。
  
 原文：https://juejin.im/post/5a4dc842518825698e7279a9
</div></div>
