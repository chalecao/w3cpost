---
title: 你不知道的LLVM编译器




---
这几年来，一些新的开发语言如雨后春笋般涌现，比如 Mozilla 的 Rust、Apple 的 Swift 以及 Jetbrains 的 Kotlin 等等，当然很多好的语言也在不断迭代，比如 Java。这些语言为开发人员在开发速度、安全性、便利性、可移植性和功能上提供了多种选择。

这几年编程语言的发展速度为什么这么快？我觉得其中一个重要原因，就是[我们](https://www.w3cdoc.com)具备了构建语言尤其是 **编译器的新工具**，其中首屈一指的就是 LLVM（Low-Level Virtual Machine）。LLVM 是一个开源项目，最初是由 Swift 语言创始人 Chris Lattner 以伊利诺伊大学的一个研究项目为基础发展而来。

LLVM 不仅简化了新语言的创建工作，而且提升了现有语言的发展。它提供了一种工具，自动化了创建语言任务中许多最吃力的部分，包括创建编译器、将输出代码移植到多个平台和架构上，以及编写代码实现异常处理这样的常见语言隐喻（metaphor）。LLVM 是自由许可的，这意味着它可作为软件组件自由重用，也可以作为服务自由部署。

如果列出一份使用了 LLVM 的语言清单，[我们](https://www.w3cdoc.com)能从中看到许多耳熟能详的名字。例如，Apple 的 Swift 语言使用 LLVM 作为编译器框架，Rust 使用 LLVM 作为工具链的核心组件。此外，很多编译器也提供了 LLVM 版本。例如，Clang 这个 C/C++ 编译器本身就是一个以 LLVM 为准绳的项目。还有 Kotlin，它名义上是一种 JVM 语言，使用称为 Kotlin Native 的语言开发，该语言也使用了 LLVM 编译机器原生代码。

## LLVM 简介

LLVM 本质上是一个使用编程方式创建机器原生代码的软件库。开发人员调用其 API，生成一种使用“中间表示”（IR，Intermediate Representation）格式的指令。进而，LLVM 将 IR 编译为独立软件库，或者使用另一种语言的上下文（例如，使用该语言的编译器）对代码执行 JIT（即时，just-in-time）编译。

LLVM API 提供了一些原语，用于表示开发编程语言中常见结构和模式。例如，几乎所有的语言都具有函数和全局变量的概念。LLVM 也将函数和全局变量作为 IR 的标准元素。这样，开发人员可以直接使用 LLVM 的实现，并聚焦于自身语言中的独到之处，不再需要花费时间和精力去重造这些特定的轮子。

<a href="https://s3.amazonaws.com/infoq.content.live.0/articles/what-is-llvm-the-power-behind-swift-rust-clang-and-more/zh/resources/1051-1518415138974.jpg" target="_blank" rel="noopener noreferrer"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/15973646652884a59fc863a794571114.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/15973646652884a59fc863a794571114.jpg?x-oss-process=image/format,webp" /></a>

<small>图 1 一个 LLVM IR 的例子。图右侧显示了一个使用 C 编写的简单程序，左侧显示了使用 Clang 编译器转换得到的 LLVM IR 代码</small>

## LLVM：为可移植性而设计

[我们](https://www.w3cdoc.com)通常对 C 语言的认识，可套用到对 LLVM 的认识上。[我们](https://www.w3cdoc.com)时常将 C 语言看成是一种可移植的高层汇编语言，因为 C 中提供了一些直接映射到系统硬件的结构，并已移植到近乎所有现有的系统架构上。但是作为一种可移植的汇编语言并非 C 语言的设计目标，这只是由该语言的工作机制所提供的一个副产品。

与此不同，LLVM IR 的设计从一开始，就是要成为一种可移植的汇编语言。IR 实现可移植性的方式之一，就是提供了独立于任何特定机器架构的原语。例如，整数类型可使用任何所需的位数，甚至大到 128 位整数，不会受限于机器的最大位宽度。开发人员也无需为匹配某种特定处理器的指令集，考虑如何对输出做精雕细琢。LLVM 解决了所有这一切。

如果读者想实地查看 LLVM IR 的运行情况，推荐访问 ELLCC 项目网站，并可动手在[浏览器](https://www.w3cdoc.com)中尝试一个将 C 代码转换为 LLVM IR 的现场演示（文末有链接）。

## 在编程语言中使用 LLVM

LLVM 通常作为语言的 AOT（预先编译，ahead-of-time）编译器使用。此外，LLVM 还支持其它一些功能。

### 使用 LLVM 的 JIT 编译器

在一些情况下，需要代码在运行时直接生成，而不是做预先编译。例如，Julia 语言就对代码做 JIT 编译，因为它看重的是运行速度，并可通过 REPL（读取 &#8211; 求值 &#8211; 输出循环，read-eval-print loop）或交互式提示符与用户交互。.NET 的开源实现 Mono 也提供了选项，支持通过 LLVM 后端方式编译生成原生代码。

Python 的高性能科学计算库 Numba 将设定的 Python 函数 JIT 编译为机器代码，也可以对使用了 Numba 的代码做 AOT 编译。但是作为一种解释性语言，Python 与 Julia 一样也提供了快速开发。使用 JIT 编译代码，是对 Python 交互工作流的一种很好的补充，要优于使用 AOT 编译。

还有一些非正统的方法，也尝试使用 LLVM 作为 JIT。例如，有方法尝试编译 PostgreSQL 查询，并实现了性能翻五番。

<a href="https://s3.amazonaws.com/infoq.content.live.0/articles/what-is-llvm-the-power-behind-swift-rust-clang-and-more/zh/resources/2523-1518415138775.jpg" target="_blank" rel="noopener noreferrer"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/b444fabdcce57126da15804d3bfabed8.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/b444fabdcce57126da15804d3bfabed8.jpg?x-oss-process=image/format,webp" /></a>

<small>图 2 Numba 使用 LLVM 对科学计算代码做 JIT 编译，加速了代码的执行。例如，经 JIT 加速的 sum2d 函数, 要比常规 Python 代码的执行速度快 139 倍</small>

### 使用 LLVM 做自动代码优化

LLVM 不仅将 IR 编译为原生机器代码，开发人员也可以通过编程方式，指导 LLVM 使用链接过程对代码做高度精细的优化。这种优化卓有成效，其中涉及内联函数、去除死代码（包括未使用的类型定义和函数参数）和循环展开（loop unrolling）等。

同样，LLVM 的强大之处在于无需开发人员自己去实现所有这些功能。LLVM 包揽了所有一切，而且开发人员可在需要时关闭这些功能。例如，如果[我们](https://www.w3cdoc.com)考虑牺牲一些性能去给出更小的二进制文件，可以让编译器[前端](https://www.w3cdoc.com)告知 LLVM 禁止循环展开。

### 使用 LLVM 的领域特定语言（DSL）

通常，LLVM 用于生成通用语言编译器。但是，LLVM 也可用于生成一些高度垂直或排他性 DSL。[我们](https://www.w3cdoc.com)甚至可以说，这正是 LLVM 大显身手之处。因为在使用 LLVM 创建一种 DSL 时，无需亲历亲为创建语言中的大量苦差事，并可给出良好的表现。

例如，Emscripten 项目使用 LLVM IR，并将 IR 代码转化为 JavaScript。这将在理论上支持所有具有 LLVM 后端的语言导出可运行在[浏览器](https://www.w3cdoc.com)中的代码。尽管 Emscripten 的长期计划是使用基于 LLVM 的后端生成 WebAssembly，但是该项目很好地展示了 LLVM 的灵活性。

另一种使用 LLVM 的方式，是将领域特定的扩展添加到现有的语言中。例如，Nvidia 使用 LLVM 创建了 Nvidia CUDA 编译器，实现在语言中添加对 CUDA 的原生支持，并作为所生成的原生代码的一部分做编译，而不是通过随之一起交付的软件库做调用。

## 在各种语言中使用 LLVM

LLVM 的通常使用方式，是编码在开发人员顺手的开发语言中。当然，该语言应支持 LLVM 软件库。

其中，广为采用的 C 和 C++。不少 LLVM 开发人员二者必取其一，理由是：

* LLVM 本事就是使用 C++ 编写的。
* LLVM 的 API 以 C/C++ 化身（incarnation）提供。
* 很多语言开发倾向于以 C/C++ 为基础。

当然，选择并不局限于这两种语言。不少语言支持原生地调用 C 软件库。因此在理论上讲，可以使用任何一种此类语言做 LLVM 开发。当然，如果语言本身就提供包装了 LLVM API 的软件库，这样最好。幸运的是，很多语言和运行时都具有这样的软件库，其中包括 C#/.NET/Mono、Rust、Haskell、OCAML、Node.js、Go 和 Python。

需要给出警告的是，部分语言对 LLVM 的绑定尚不完备。以 Python 为例。尽管 Python 提供了多种选择，但每种选择的完备性和实用性各有千秋：

* LLVM 项目本身就维护了一组到 LLVM C API 的绑定，但是目前为止已停止进一步的维护。
* llvmpy 在 2015 年后就停止维护了。这对于任何一个软件项目都不是一个好消息。考虑到每次 LLVM 修订版本中的更改数量，对于 LLVM 而言尤为如此。
* llvmlite 是 Numba 开发团队开发的。当前已成为在 Python 中使用 LLVM 的一个有力竞争者。但是 llvmlite 局限于针对 Numba 的需要，因此提供的功能只是 LLVM 用户所需功能的一个子集。
* llvmcpy 意在为 C 软件库提供最新的、可自动更新的 Python 绑定，支持使用 Python 的原生风格访问。llvmcpy 依然处于开发的早期阶段，但是已经可以使用 LLVM API 完成一些基本工作。

如果有兴趣了解如何使用 LLVM 软件库构建一种语言，可以阅读由 LLVM 创始人撰写的教程。该教程使用 C++ 和 OCAML，一步步引导读者去创建一个名为“Kaleidoscope”的简单语言。进而移植到其它语言中：

* Haskell：参考原始教程可直接移植。
* Python: 一种方式是严格遵守教程，另一种方式做了大量重写，并提供了交互式命令行。两种方式都使用 llvmlite 作为到 LLVM 的绑定。
* Rust 和 Swift：看上去，[我们](https://www.w3cdoc.com)不可避免地要实现将教程语言移植到这两种由 LLVM 本身创建的语言上。

该教程还有其它一些国家语言的翻译版本，例如使用原始 C++ 和 Python 的中文教程。

## LLVM 尚未实现的

[我们](https://www.w3cdoc.com)上面介绍了 LLVM 提供的很多功能，下面简述一下它目前尚未实现的。

例如，LLVM 并不对语法做解析。因为有大量工具可用于完成这个工作，例如 lex/yacc、flex/bison 和 ANTLR。解析必定会从编译中脱离出来，因此毫不奇怪 LLVM 并未试图去实现该功能。

LLVM 也不直接解决大部分针对特定语言的软件文化。例如，如何安装编译器的二进制文件，如何在安装中管理软件包，如何升级工具链等，这都需要开发人员自己去做。

最后也是最重要的一点是，LLVM 仍然尚未对部分通用语言成分给出原语。许多语言都具有某种垃圾回收的内存管理方式，或者是作为管理内存的主要方式，或者是作为对 RAII（C ++ 和 Rust 使用）等策略的附属方式。LLVM 并没有提供垃圾收集机制，而是提供了一些实现垃圾回收的工具，支持将代码标记为一些可简化垃圾收集器编写的元数据。

但是，并不排除 LLVM 可能最终会添加实现垃圾回收的本地机制。LLVM 正在以每六个月发布一个主要版本的速度快速发展。鉴于当前许多语言的开发过程是以 LLVM 为中心的，所以 LLVM 的开发速度只可能会进一步提升。

本文为翻译文章，原文链接：

<a href="https://www.infoworld.com/article/3247799/development-tools/what-is-llvm-the-power-behind-swift-rust-clang-and-more.html" target="_blank" rel="noopener noreferrer">https://www.infoworld.com/article/3247799/development-tools/what-is-llvm-the-power-behind-swift-rust-clang-and-more.html</a>

相关链接：

* <a href="http://ellcc.org/" target="_blank" rel="noopener noreferrer">http://ellcc.org/</a>
* <a href="http://ellcc.org/demo/index.cgi" target="_blank" rel="noopener noreferrer">http://ellcc.org/demo/index.cgi</a>
* <a href="https://llvm.org/docs/GarbageCollection.html" target="_blank" rel="noopener noreferrer">https://llvm.org/docs/GarbageCollection.html</a>
