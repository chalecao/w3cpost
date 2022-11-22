---
title: asm.js 和 Emscripten 介绍


date: 2019-05-29T14:43:43+00:00
url: /javascriptnodejs/4407.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090301.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090301.png
fifu_image_alt:
  - asm.js 和 Emscripten 介绍
views:
  - 1307
like:
  - 3


---
2012年，Mozilla 的工程师 <a href="https://github.com/kripken" target="_blank" rel="noopener noreferrer">Alon Zakai</a> 在研究 LLVM 编译器时突发奇想：许多 3D 游戏都是用 C / C++ 语言写的，如果能将 C / C++ 语言编译成 JavaScript 代码，它们不就能在浏览器里运行了吗？众所周知，JavaScript 的基本语法与 C 语言高度相似。

于是，他开始研究怎么才能实现这个目标，为此专门做了一个编译器项目 <a href="https://github.com/kripken/emscripten" target="_blank" rel="noopener noreferrer">Emscripten</a>。这个编译器可以将 C / C++ 代码编译成 JS 代码，但不是普通的 JS，而是一种叫做 <a href="http://asmjs.org/" target="_blank" rel="noopener noreferrer">asm.js</a> 的 JavaScript 变体。

本文就将介绍 asm.js 和 Emscripten 的基本用法，介绍如何将 C / C++ 转成 JS。

<img title="" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090301.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090301.png?x-oss-process=image/format,webp" alt="" /> 

## 一、asm.js 的简介

### 1.1 原理

C / C++ 编译成 JS 有两个最大的困难。

>   * C / C++ 是静态类型语言，而 JS 是动态类型语言。
>   * C / C++ 是手动内存管理，而 JS 依靠垃圾回收机制。

**asm.js 就是为了解决这两个问题而设计的：它的变量一律都是静态类型，并且取消垃圾回收机制。**除了这两点，它与 JavaScript 并无差异，也就是说，asm.js 是 JavaScript 的一个严格的子集，只能使用后者的一部分语法。

<img title="" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090304.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090304.jpg?x-oss-process=image/format,webp" alt="" /> 

一旦 JavaScript 引擎发现运行的是 asm.js，就知道这是经过优化的代码，可以跳过语法分析这一步，直接转成汇编语言。另外，浏览器还会调用 WebGL 通过 GPU 执行 asm.js，即 asm.js 的执行引擎与普通的 JavaScript 脚本不同。这些都是 asm.js 运行较快的原因。据称，asm.js 在浏览器里的运行速度，大约是原生代码的50%左右。

下面就依次介绍 asm.js 的两大语法特点。

### 1.2 静态类型的变量

asm.js 只提供两种<a href="http://asmjs.org/spec/latest/#value-types" target="_blank" rel="noopener noreferrer">数据类型</a>。

>   * 32位带符号整数
>   * 64位带符号浮点数

<img title="" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090303.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090303.png?x-oss-process=image/format,webp" alt="" /> 

其他数据类型，比如字符串、布尔值或者对象，asm.js 一概不提供。它们都是以数值的形式存在，保存在内存中，通过 [TypedArray][1] 调用。

如果变量的类型要在运行时确定，asm.js 就要求事先声明类型，并且不得改变，这样就节省了类型判断的时间。

asm.js 的类型声明有固定写法，`变量 | 0`表示整数，`+变量`表示浮点数。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">var&lt;/span> a &lt;span class="token operator">=&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token keyword">var&lt;/span> x &lt;span class="token operator">=&lt;/span> a &lt;span class="token operator">|&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment" spellcheck="true"> // x 是32位整数
&lt;/span>&lt;span class="token keyword">var&lt;/span> y &lt;span class="token operator">=&lt;/span> &lt;span class="token operator">+&lt;/span>a&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment" spellcheck="true"> // y 是64位浮点数
&lt;/span></code></pre>

上面代码中，变量`x`声明为整数，`y`声明为浮点数。支持 asm.js 的引擎一看到`x = a | 0`，就知道`x`是整数，然后采用 asm.js 的机制处理。如果引擎不支持 asm.js 也没关系，这段代码照样可以运行，最后得到的还是同样的结果。

再看下面的例子。

> <pre class=" language-javascript"><code class=" language-javascript">&lt;span class="token comment" spellcheck="true">
// 写法一
&lt;/span>&lt;span class="token keyword">var&lt;/span> first &lt;span class="token operator">=&lt;/span> &lt;span class="token number">5&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">var&lt;/span> second &lt;span class="token operator">=&lt;/span> first&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment" spellcheck="true">
// 写法二
&lt;/span>&lt;span class="token keyword">var&lt;/span> first &lt;span class="token operator">=&lt;/span> &lt;span class="token number">5&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">var&lt;/span> second &lt;span class="token operator">=&lt;/span> first &lt;span class="token operator">|&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

上面代码中，写法一是普通的 JavaScript，变量`second`只有在运行时才能知道类型，这样就很慢了，写法二是 asm.js，`second`在声明时就知道是整数，速度就提高了。

函数的参数和返回值，都要用这种方式指定类型。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">add&lt;span class="token punctuation">(&lt;/span>&lt;/span>x&lt;span class="token punctuation">,&lt;/span> y&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  x &lt;span class="token operator">=&lt;/span> x &lt;span class="token operator">|&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  y &lt;span class="token operator">=&lt;/span> y &lt;span class="token operator">|&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>x &lt;span class="token operator">+&lt;/span> y&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">|&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面代码中，除了参数`x`和`y`需要声明类型，函数的返回值也需要声明类型。

### 1.3 垃圾回收机制

asm.js 没有垃圾回收机制，所有内存操作都由程序员自己控制。asm.js 通过 TypedArray 直接读写内存。

下面就是直接读写内存的例子。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">var&lt;/span> buffer &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">ArrayBuffer&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">32768&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">var&lt;/span> HEAP8 &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Int8Array&lt;/span>&lt;span class="token punctuation">(&lt;/span>buffer&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">compiledCode&lt;span class="token punctuation">(&lt;/span>&lt;/span>ptr&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  HEAP&lt;span class="token punctuation">[&lt;/span>ptr&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token number">12&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token keyword">return&lt;/span> HEAP&lt;span class="token punctuation">[&lt;/span>ptr &lt;span class="token operator">+&lt;/span> &lt;span class="token number">4&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>  
</code></pre>

如果涉及到指针，也是一样处理。

> <pre class=" language-clike"><code class=" language-clike">
size_t &lt;span class="token function">strlen&lt;span class="token punctuation">(&lt;/span>&lt;/span>char &lt;span class="token operator">*&lt;/span>ptr&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  char &lt;span class="token operator">*&lt;/span>curr &lt;span class="token operator">=&lt;/span> ptr&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>curr &lt;span class="token operator">!&lt;/span>&lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    curr&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>curr &lt;span class="token operator">-&lt;/span> ptr&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面的代码编译成 asm.js，就是下面这样。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">strlen&lt;span class="token punctuation">(&lt;/span>&lt;/span>ptr&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  ptr &lt;span class="token operator">=&lt;/span> ptr&lt;span class="token operator">|&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token keyword">var&lt;/span> curr &lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  curr &lt;span class="token operator">=&lt;/span> ptr&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>MEM8&lt;span class="token punctuation">[&lt;/span>curr&lt;span class="token punctuation">]&lt;/span>&lt;span class="token operator">|&lt;/span>&lt;span class="token number">0&lt;/span> &lt;span class="token operator">!&lt;/span>&lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    curr &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>curr &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">|&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>curr &lt;span class="token operator">-&lt;/span> ptr&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">|&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

### 1.4 asm.js 与 WebAssembly 的异同

如果你对 JS 比较了解，可能知道还有一种叫做 WebAssembly 的技术，也能将 C / C++ 转成 JS 引擎可以运行的代码。那么它与 asm.js 有何区别呢？

回答是，两者的功能基本一致，就是转出来的代码不一样：asm.js 是文本，WebAssembly 是二进制字节码，因此运行速度更快、体积更小。从长远来看，WebAssembly 的前景更光明。

但是，这并不意味着 asm.js 肯定会被淘汰，因为它有两个优点：首先，它是文本，人类可读，比较直观；其次，所有浏览器都支持 asm.js，不会有兼容性问题。

## 二、 Emscripten 编译器

### 2.1 Emscripten 简介

虽然 asm.js 可以手写，但是它从来就是编译器的目标语言，要通过编译产生。目前，生成 asm.js 的主要工具是 <a href="http://emscripten.org/" target="_blank" rel="noopener noreferrer">Emscripten</a>。

<img title="" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090306.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090306.jpg?x-oss-process=image/format,webp" alt="" /> 

Emscripten 的底层是 LLVM 编译器，理论上任何可以生成 LLVM IR（Intermediate Representation）的语言，都可以编译生成 asm.js。 但是实际上，Emscripten 几乎只用于将 C / C++ 代码编译生成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
C&lt;span class="token operator">/&lt;/span>C&lt;span class="token operator">++&lt;/span> ⇒ LLVM &lt;span class="token operator">==&lt;/span>&lt;span class="token operator">&gt;&lt;/span> LLVM IR ⇒ Emscripten ⇒ asm&lt;span class="token punctuation">.&lt;/span>js
</code></pre>

<img title="" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090302.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/bg2017090302.jpg?x-oss-process=image/format,webp" alt="" /> 

### 2.2 Emscripten 的安装

Emscripten 的安装可以根据<a href="http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html" target="_blank" rel="noopener noreferrer">官方文档</a>。由于依赖较多，安装起来比较麻烦，我发现更方便的方法是<a href="http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html#updating-the-emscripten-sdk" target="_blank" rel="noopener noreferrer">安装 SDK</a>。

你可以按照下面的<a href="https://github.com/kripken/emscripten/issues/5443#issuecomment-320981440" target="_blank" rel="noopener noreferrer">步骤</a>操作。

> <pre class=" language-bash"><code class=" language-bash">
$ git clone https&lt;span class="token punctuation">:&lt;/span>&lt;span class="token operator">/&lt;/span>&lt;span class="token operator">/&lt;/span>github&lt;span class="token punctuation">.&lt;/span>com&lt;span class="token operator">/&lt;/span>juj&lt;span class="token operator">/&lt;/span>emsdk&lt;span class="token punctuation">.&lt;/span>git
$ cd emsdk
$ &lt;span class="token punctuation">.&lt;/span>&lt;span class="token operator">/&lt;/span>emsdk install &lt;span class="token operator">--&lt;/span>build&lt;span class="token operator">=&lt;/span>Release sdk&lt;span class="token operator">-&lt;/span>incoming&lt;span class="token operator">-&lt;/span>64bit binaryen&lt;span class="token operator">-&lt;/span>master&lt;span class="token operator">-&lt;/span>64bit
$ &lt;span class="token punctuation">.&lt;/span>&lt;span class="token operator">/&lt;/span>emsdk activate &lt;span class="token operator">--&lt;/span>build&lt;span class="token operator">=&lt;/span>Release sdk&lt;span class="token operator">-&lt;/span>incoming&lt;span class="token operator">-&lt;/span>64bit binaryen&lt;span class="token operator">-&lt;/span>master&lt;span class="token operator">-&lt;/span>64bit
$ source &lt;span class="token punctuation">.&lt;/span>&lt;span class="token operator">/&lt;/span>emsdk_env&lt;span class="token punctuation">.&lt;/span>sh
</code></pre>

注意，最后一行非常重要。每次重新登陆或者新建 Shell 窗口，都要执行一次这行命令`source ./emsdk_env.sh`。

### 2.3 Hello World

首先，新建一个最简单的 C++ 程序`hello.cc`。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>iostream&lt;span class="token operator">&gt;&lt;/span>

int &lt;span class="token function">main&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  std&lt;span class="token punctuation">:&lt;/span>&lt;span class="token punctuation">:&lt;/span>cout &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&lt;&lt;/span> &lt;span class="token string">"Hello World!"&lt;/span> &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&lt;&lt;/span> std&lt;span class="token punctuation">:&lt;/span>&lt;span class="token punctuation">:&lt;/span>endl&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

然后，将这个程序转成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc hello&lt;span class="token punctuation">.&lt;/span>cc
$ node a&lt;span class="token punctuation">.&lt;/span>out&lt;span class="token punctuation">.&lt;/span>js
Hello World&lt;span class="token operator">!&lt;/span>
</code></pre>

上面代码中，`emcc`命令用于编译源码，默认生成`a.out.js`。使用 Node 执行`a.out.js`，就会在命令行输出 Hello World。

注意，asm.js 默认自动执行`main`函数。

`emcc`是 Emscripten 的编译命令。它的用法非常简单。

> <pre class=" language-bash"><code class=" language-bash">
&lt;span class="token comment" spellcheck="true"># 生成 a.out.js
&lt;/span>$ emcc hello&lt;span class="token punctuation">.&lt;/span>c

&lt;span class="token comment" spellcheck="true"># 生成 hello.js
&lt;/span>$ emcc hello&lt;span class="token punctuation">.&lt;/span>c &lt;span class="token operator">-&lt;/span>o hello&lt;span class="token punctuation">.&lt;/span>js

&lt;span class="token comment" spellcheck="true"># 生成 hello.html 和 hello.js
&lt;/span>$ emcc hello&lt;span class="token punctuation">.&lt;/span>c &lt;span class="token operator">-&lt;/span>o hello&lt;span class="token punctuation">.&lt;/span>html
</code></pre>

## 三、Emscripten 语法

### 3.1 C/C++ 调用 JavaScript

Emscripten 允许 C / C++ 代码直接调用 JavaScript。

新建一个文件`example1.cc`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>emscripten&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>

int &lt;span class="token function">main&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">EM_ASM&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span> &lt;span class="token function">alert&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'Hello World!'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

`EM_ASM`是一个宏，会调用嵌入的 JavaScript 代码。注意，JavaScript 代码要写在大括号里面。

然后，将这个程序编译成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc example1&lt;span class="token punctuation">.&lt;/span>cc &lt;span class="token operator">-&lt;/span>o example1&lt;span class="token punctuation">.&lt;/span>html
</code></pre>

浏览器打开`example1.html`，就会跳出对话框`Hello World!`。

### 3.2 C/C++ 与 JavaScript 的通信

Emscripten 允许 C / C++ 代码与 JavaScript 通信。

新建一个文件`example2.cc`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>emscripten&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>
#include &lt;span class="token operator">&lt;&lt;/span>iostream&lt;span class="token operator">&gt;&lt;/span>

int &lt;span class="token function">main&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  int val1 &lt;span class="token operator">=&lt;/span> &lt;span class="token number">21&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  int val2 &lt;span class="token operator">=&lt;/span> &lt;span class="token function">EM_ASM_INT&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span> &lt;span class="token keyword">return&lt;/span> $&lt;span class="token number">0&lt;/span> &lt;span class="token operator">*&lt;/span> &lt;span class="token number">2&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> val1&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

  std&lt;span class="token punctuation">:&lt;/span>&lt;span class="token punctuation">:&lt;/span>cout &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&lt;&lt;/span> &lt;span class="token string">"val2 == "&lt;/span> &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&lt;&lt;/span> val2 &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&lt;&lt;/span> std&lt;span class="token punctuation">:&lt;/span>&lt;span class="token punctuation">:&lt;/span>endl&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面代码中，`EM_ASM_INT`表示 JavaScript 代码返回的是一个整数，它的参数里面的`$0`表示第一个参数，`$1`表示第二个参数，以此类推。`EM_ASM_INT`的其他参数会按照顺序，传入 JavaScript 表达式。

然后，将这个程序编译成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc example2&lt;span class="token punctuation">.&lt;/span>cc &lt;span class="token operator">-&lt;/span>o example2&lt;span class="token punctuation">.&lt;/span>html
</code></pre>

浏览器打开网页`example2.html`，会显示`val2 == 42`。

### 3.3 EM_ASM 宏系列

Emscripten 提供以下宏。

>   * EM_ASM：调用 JS 代码，没有参数，也没有返回值。
>   * EM_ASM_ARGS：调用 JS 代码，可以有任意个参数，但是没有返回值。
>   * EM_ASM_INT：调用 JS 代码，可以有任意个参数，返回一个整数。
>   * EM_ASM_DOUBLE：调用 JS 代码，可以有任意个参数，返回一个双精度浮点数。
>   * EM_ASM_INT_V：调用 JS 代码，没有参数，返回一个整数。
>   * EM_ASM_DOUBLE_V：调用 JS 代码，没有参数，返回一个双精度浮点数。

下面是一个`EM_ASM_ARGS`的例子。新建文件`example3.cc`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>emscripten&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>
#include &lt;span class="token operator">&lt;&lt;/span>string&lt;span class="token operator">&gt;&lt;/span>

void &lt;span class="token function">Alert&lt;span class="token punctuation">(&lt;/span>&lt;/span>const std&lt;span class="token punctuation">:&lt;/span>&lt;span class="token punctuation">:&lt;/span>string &lt;span class="token operator">&&lt;/span> msg&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">EM_ASM_ARGS&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span>
    var msg &lt;span class="token operator">=&lt;/span> &lt;span class="token function">Pointer_stringify&lt;span class="token punctuation">(&lt;/span>&lt;/span>$&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token function">alert&lt;span class="token punctuation">(&lt;/span>&lt;/span>msg&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> msg&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">c_str&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

int &lt;span class="token function">main&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">Alert&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">"Hello from C++!"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面代码中，我们将一个字符串传入 JS 代码。由于没有返回值，所以使用`EM_ASM_ARGS`。另外，我们都知道，在 C / C++ 里面，字符串是一个字符数组，所以要调用`Pointer_stringify()`方法将字符数组转成 JS 的字符串。

接着，将这个程序转成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc example3&lt;span class="token punctuation">.&lt;/span>cc &lt;span class="token operator">-&lt;/span>o example3&lt;span class="token punctuation">.&lt;/span>html
</code></pre>

浏览器打开`example3.html`，会跳出对话框&#8221;Hello from C++!&#8221;。

### 3.4 JavaScript 调用 C / C++ 代码

JS 代码也可以调用 C / C++ 代码。新建一个文件`example4.cc`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>emscripten&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>

extern &lt;span class="token string">"C"&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  double &lt;span class="token function">SquareVal&lt;span class="token punctuation">(&lt;/span>&lt;/span>double val&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> val &lt;span class="token operator">*&lt;/span> val&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

int &lt;span class="token function">main&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">EM_ASM&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span>
    SquareVal &lt;span class="token operator">=&lt;/span> Module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">cwrap&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'SquareVal'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    var x &lt;span class="token operator">=&lt;/span> &lt;span class="token number">12.5&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token function">alert&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'Computing: '&lt;/span> &lt;span class="token operator">+&lt;/span> x &lt;span class="token operator">+&lt;/span> &lt;span class="token string">' * '&lt;/span> &lt;span class="token operator">+&lt;/span> x &lt;span class="token operator">+&lt;/span> &lt;span class="token string">' = '&lt;/span> &lt;span class="token operator">+&lt;/span> &lt;span class="token function">SquareVal&lt;span class="token punctuation">(&lt;/span>&lt;/span>x&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面代码中，`EM_ASM`执行 JS 代码，里面有一个 C 语言函数`SquareVal`。这个函数必须放在`extern "C"`代码块之中定义，而且 JS 代码还要用`Module.cwrap()`方法引入这个函数。

`Module.cwrap()`接受三个参数，含义如下。

>   * C 函数的名称，放在引号之中。
>   * C 函数返回值的类型。如果没有返回值，可以把类型写成`null`。
>   * 函数参数类型的数组。

除了`Module.cwrap()`，还有一个`Module.ccall()`方法，可以在 JS 代码之中调用 C 函数。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">var&lt;/span> result &lt;span class="token operator">=&lt;/span> Module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">ccall&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'int_sqrt'&lt;/span>&lt;span class="token punctuation">,&lt;/span>&lt;span class="token comment" spellcheck="true"> // C 函数的名称
&lt;/span>  &lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">,&lt;/span>&lt;span class="token comment" spellcheck="true"> // 返回值的类型
&lt;/span>  &lt;span class="token punctuation">[&lt;/span>&lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>&lt;span class="token comment" spellcheck="true"> // 参数类型的数组
&lt;/span>  &lt;span class="token punctuation">[&lt;/span>&lt;span class="token number">28&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token comment" spellcheck="true"> // 参数数组
&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> 
</code></pre>

回到前面的示例，现在将`example4.cc`编译成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$  emcc &lt;span class="token operator">-&lt;/span>s EXPORTED_FUNCTIONS&lt;span class="token operator">=&lt;/span>&lt;span class="token string">"['_SquareVal', '_main']"&lt;/span> example4&lt;span class="token punctuation">.&lt;/span>cc &lt;span class="token operator">-&lt;/span>o example4&lt;span class="token punctuation">.&lt;/span>html
</code></pre>

注意，编译命令里面要用`-s EXPORTED_FUNCTIONS`参数给出输出的函数名数组，而且函数名前面加下划线。本例只输出两个 C 函数，所以要写成`['_SquareVal', '_main']`。

浏览器打开`example4.html`，就会看到弹出的对话框里面显示下面的内容。

> <pre class=" language-javascript"><code class=" language-javascript">
Computing&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">12.5&lt;/span> &lt;span class="token operator">*&lt;/span> &lt;span class="token number">12.5&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token number">156.25&lt;/span> 
</code></pre>

## 3.5 C 函数输出为 JavaScript 模块

另一种情况是输出 C 函数，供网页里面的 JavaScript 脚本调用。 新建一个文件`example5.cc`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
extern &lt;span class="token string">"C"&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  double &lt;span class="token function">SquareVal&lt;span class="token punctuation">(&lt;/span>&lt;/span>double val&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> val &lt;span class="token operator">*&lt;/span> val&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

上面代码中，`SquareVal`是一个 C 函数，放在`extern "C"`代码块里面，就可以对外输出。

然后，编译这个函数。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc &lt;span class="token operator">-&lt;/span>s EXPORTED_FUNCTIONS&lt;span class="token operator">=&lt;/span>&lt;span class="token string">"['_SquareVal']"&lt;/span> example5&lt;span class="token punctuation">.&lt;/span>cc &lt;span class="token operator">-&lt;/span>o example5&lt;span class="token punctuation">.&lt;/span>js
</code></pre>

上面代码中，`-s EXPORTED_FUNCTIONS`参数告诉编译器，代码里面需要输出的函数名。函数名前面要加下划线。

接着，写一个网页，加载刚刚生成的`example5.js`。

> <pre class=" language-markup"><code class=" language-markup">
&lt;span class="token doctype">&lt;!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN"&gt;&lt;/span>
&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>body&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>Test File&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
&lt;span class="token script">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>script &lt;span class="token attr-name">type&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>text/javascript&lt;span class="token punctuation">"&lt;/span>&lt;/span> &lt;span class="token attr-name">src&lt;/span>&lt;span class="token attr-value">&lt;span class="token punctuation">=&lt;/span>&lt;span class="token punctuation">"&lt;/span>example5.js&lt;span class="token punctuation">"&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>script&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;/span>
&lt;span class="token script">&lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>script&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
  SquareVal &lt;span class="token operator">=&lt;/span> Module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">cwrap&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'SquareVal'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token string">'number'&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  document&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">write&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">"result == "&lt;/span> &lt;span class="token operator">+&lt;/span> &lt;span class="token function">SquareVal&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token number">10&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>script&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;/span>
&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>body&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
</code></pre>

浏览器打开这个网页，就可以看到`result == 100`了。

### 3.6 Node 调用 C 函数

如果执行环境不是浏览器，而是 Node，那么调用 C 函数就更方便了。新建一个文件`example6.c`，写入下面的代码。

> <pre class=" language-clike"><code class=" language-clike">
#include &lt;span class="token operator">&lt;&lt;/span>stdio&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>
#include &lt;span class="token operator">&lt;&lt;/span>emscripten&lt;span class="token punctuation">.&lt;/span>h&lt;span class="token operator">&gt;&lt;/span>

void &lt;span class="token function">sayHi&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">printf&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">"Hi!\n"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>

int &lt;span class="token function">daysInWeek&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">7&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>

然后，将这个脚本编译成 asm.js。

> <pre class=" language-bash"><code class=" language-bash">
$ emcc &lt;span class="token operator">-&lt;/span>s EXPORTED_FUNCTIONS&lt;span class="token operator">=&lt;/span>&lt;span class="token string">"['_sayHi', '_daysInWeek']"&lt;/span> example6&lt;span class="token punctuation">.&lt;/span>c &lt;span class="token operator">-&lt;/span>o example6&lt;span class="token punctuation">.&lt;/span>js
</code></pre>

接着，写一个 Node 脚本`test.js`。

> <pre class=" language-javascript"><code class=" language-javascript">
&lt;span class="token keyword">var&lt;/span> em_module &lt;span class="token operator">=&lt;/span> &lt;span class="token function">require&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">'./api_example.js'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

em_module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">_sayHi&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
em_module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">ccall&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token string">"sayHi"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;span class="token punctuation">(&lt;/span>&lt;/span>em_module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">_daysInWeek&lt;span class="token punctuation">(&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>

上面代码中，Node 脚本调用 C 函数有两种方法，一种是使用下划线函数名调用`em_module._sayHi()`，另一种使用`ccall`方法调用`em_module.ccall("sayHi")`。

运行这个脚本，就可以看到命令行的输出。

> <pre class=" language-bash"><code class=" language-bash">
$ node test&lt;span class="token punctuation">.&lt;/span>js
Hi&lt;span class="token operator">!&lt;/span>
Hi&lt;span class="token operator">!&lt;/span>
&lt;span class="token number">7&lt;/span>
</code></pre>

## 四、用途

asm.js 不仅能让浏览器运行 <a href="http://kripken.github.io/boon/boon.html" target="_blank" rel="noopener noreferrer">3D 游戏</a>，还可以运行各种<a href="https://github.com/dherman/asm.js/wiki/Projects-using-asm.js" target="_blank" rel="noopener noreferrer">服务器软件</a>，比如 <a href="https://github.com/kripken/lua.vm.js" target="_blank" rel="noopener noreferrer">Lua</a>、<a href="https://github.com/xxuejie/webruby" target="_blank" rel="noopener noreferrer">Ruby</a> 和 <a href="https://github.com/kripken/sql.js" target="_blank" rel="noopener noreferrer">SQLite</a>。 这意味着很多工具和算法，都可以使用现成的代码，不用重新写一遍。

另外，由于 asm.js 的运行速度较快，所以一些计算密集型的操作（比如计算 Hash）可以使用 C / C++ 实现，再在 JS 中调用它们。

真实的转码实例可以看一下 <a href="https://github.com/kripken/zee.js" target="_blank" rel="noopener noreferrer">gzlib</a> 的编译，参考它的 <a href="https://github.com/kripken/zee.js/blob/master/Makefile" target="_blank" rel="noopener noreferrer">Makefile</a> 怎么写。

## 五、参考链接

  * <a href="https://en.wikipedia.org/wiki/Asm.js" target="_blank" rel="noopener noreferrer">asm.js</a>, by Wikipedia
  * <a href="https://kripken.github.io/mloc_emscripten_talk/cppcon.html#/" target="_blank" rel="noopener noreferrer">Emscripten & asm.js: C++&#8217;s role in the modern web</a>, by Alon Zakai
  * <a href="http://kripken.github.io/emscripten-site/docs/getting_started/Tutorial.html" target="_blank" rel="noopener noreferrer">Emscripten Tutorial</a>, by Emscripten
  * <a href="https://johnresig.com/blog/asmjs-javascript-compile-target/" target="_blank" rel="noopener noreferrer">Asm.js: The JavaScript Compile Target</a>, by John Resig
  * <a href="http://devosoft.org/an-introduction-to-web-development-with-emscripten/" target="_blank" rel="noopener noreferrer">An Introduction to Web Development with Emscripten</a>, by Charles Ofria
  * <a href="http://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html" target="_blank" rel="noopener noreferrer">Interacting with code</a>, by Emscripten
  * <a href="https://pspdfkit.com/blog/2017/webassembly-a-new-hope/" target="_blank" rel="noopener noreferrer">WebAssembly: A New Hope</a>, by Philipp Spiess and James Swift
  * <a href="https://www.sitepoint.com/understanding-asm-js/" target="_blank" rel="noopener noreferrer">Understanding asm.js</a>, by Afshin Mehrabani

 [1]: http://es6.ruanyifeng.com/#docs/arraybuffer