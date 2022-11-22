---
title: 前端构建C语言解释执行环境调研


---
## 关于编译器

有没想过在浏览器中直接运行其他语言？有没有想过写完c语言，能够立即在浏览器上编译运行。其实也没什么卵用了。只不过是的确可以基于js语言来构造其他语言的解析器。

## 编译执行与解释执行

一种高级编程语言，从源代码开始，一直到被执行生成相应的动作，大约经历了这几个步骤

   执行源代码====>（中间表示形式====>）基本操作序列====>生成最终动作

编译型和解释型语言的不同指出只是在于，这些过程发生的时机不一样。

编译型语言的代表是C，源代码被编译之后生成中间文件（.o和.obj），然后用连接器和汇编器生成机器码，也就是一系列基本操作的序列，机器码最后被执行生成最终动作。

解释型的语言以Ruby为例，也经历了这些步骤，不同的是，C语言会把那些从源代码“变”来的基本操作序列（保存）起来，而Ruby直接将这些生成的基本操作序列（Ruby虚拟机）指令丢给Ruby虚拟机执行然后产生动作了。

所以我们看到的现象是，编译型语言要先编译再运行，而解释性语言直接“运行”源代码。除了BASIC这样特别早期的解释型语言，是直接解释执行，现在的解释型语言都采取将代码编译为某种特定的虚拟机代码或者机器码的形式，然后再执行那些编译好的代码。BASIC这种直接解释的，我们可以将他的基本操作序列理解为直接执行基本操作的那些函数。

现在关于解释和编译的界限也不是特别清晰了。Java需要预先把代码编译成虚拟机指令的，然后在运行这些虚拟机指令，有的教科书上会成为混合型或者半编译型。像Python和lua这样就更不好分了，可以直接解释源代码运行，也可以编译为虚拟机指令然后再运行。php编译之后的结果可以被Web Server缓存起来，甚至还可以先被翻译为C++，然后再编译。.NET 的CLR运行时是Windows的组成部分，编译好的.NET 系列语言的代码直接生成可执行文件，然后被“直接”执行，看起来跟C没有什么太大的差别。JavaScript可以被V8引擎编译为机器码然后执行，如果在node.js下，这个编译结果被缓存起来了，你说这跟编译好再执行的C有什么区别。

## 基于JavaScript构造c语言运行环境

目前有三种基本的方案：  
1）基于JS构建c语言解析执行环境（论文中方案，前端解析执行）  
论文中采用PEG（ parsing expression grammar）解析表达式语法编写c语言解析器，在调研中发现还有类似的解决方案chevrotain，主要基于LL(K)词法分析。  
参考：peg方案 &#8211; <a href="https://pegjs.org/" target="_blank" rel="external noopener">https://pegjs.org/</a> ， LL(K)方案 &#8211; <a href="https://github.com/SAP/chevrotain" target="_blank" rel="external noopener">https://github.com/SAP/chevrotain</a>

![前端构建C语言解释执行环境调研][1]

2） 编译c语言为JS，然后执行（后端编译，前端执行）  
参考：<a href="https://www.oschina.net/translate/asmjs-javascript-compile-target" target="_blank" rel="external noopener">https://www.oschina.net/translate/asmjs-javascript-compile-target</a>  
![前端构建C语言解释执行环境调研][2]

3）服务端编译执行c语言程序，返回执行结果，前端展示

其中ll(k)语法分析如下：  
LL（K)分析方法是一种自顶向下的分析技术，这种分析方法是从左到右扫描源程序（输入串），同时从识别符号开始生成句子的最左推导，向前看K个符号，便能确定当前应选用怎样的规则。当K=1时，即是LL（1)分析法。

LL（1）分析法中很重要的一块内容是分析矩阵的构造，这个分析矩阵是进行语法分析的依据，每一步都要靠它来决定如何进行，分析矩阵的构造方法如下：

  1. 对于A→ab(a∈Vt),则令LL(A,a)=R(b)／N
  2. 对于A→Db(D∈Vn)，且Select(A→Db)=｛b1,b2,…bn}，则令LL(A,bi)=R(Db)／P(i=1,2,…n)
  3. 对于A→є,且Select(A→є)=｛b1,b2,…bn｝，则令LL(A,bi)=R(є)／P(i=1,2,…n)
  4. a∈Vt,a不出现在规则右部的首部，则令LL(a,a)=R(є)／N
  5. ＃，则令LL(＃,＃)=acc
  6. 其它情况出错，在分析矩阵中可用空白表示  
    参考： <a href="https://blog.csdn.net/hackerain/article/details/7682846" target="_blank" rel="external noopener">https://blog.csdn.net/hackerain/article/details/7682846</a>

PEG 语法分析：  
PEG 也是一种文法, 不过是解析式的文法, 给定一个规则和文本位置, 它的解析只有一个结果. PEG 源自 TDPL (top down parsing language), 其语法和递归下降解析器是同构的 (当然你也可以照着 CFG 写这么一个解析器, 但是你得用类似深度优先的搜索, 而且要对所有 | 选择支平等对待, 复杂度还容易爆炸). pakrat parser 就是对 PEG 文法的解析加上缓存表的优化, 达到 O(1) 的效率. 不过 pakrat 的优化需要一个很大的常量内存空间, 某些情况还有可能不如直写递归下降解析器. PEG 的特点使得它和 parser combinator 很适合. 例如 Parsec 就有 chainl, chainr 等组合子, 能舒服处理一些常见语法结构, 而用 Bison 想规则名字就得想半天有木有…  
参考：<a href="https://www.zhihu.com/question/28525605?sort=created" target="_blank" rel="external noopener">https://www.zhihu.com/question/28525605?sort=created</a>

## 优缺点

1） 基于PEG的解释执行方案  
优点：可以直接在浏览器解释执行  
缺点：基于MIT提出的解析表达式语法编写c语言词法解析以及语法解析器，需要能够准确的解析上下文相关和无关的语法，需要处理文件引用以及函数类库等问题，能正确的解析并执行c语言脚本程序。如果投入生产环境使用，需要经过严格的验证。  
2） 基于Asm.js的编译执行方案  
优点：有开源项目可以借鉴  
缺点：需要后端编译，前端执行编译后的代码。这种方式和方案3直接在后端编译执行c语言代码并返回结果差异不大，如果编译过程比较快的情况下，可以考虑。  
3） 基于服务端编译执行的方案  
优点：编译执行工作放在服务端，有类似商业方案（比如校招笔试网站在线编程题）  
缺点：结果依赖于服务端编译执行，主要工作集中在服务端

## 总结

总结：  
论文中所提出的的方案1目前执行起来风险较大，不可控。方案2、3是一种替代解决方案，但是都会依赖服务端做编译工作，可以在具体指标上做权衡。

## 参考：

1） <a href="https://github.com/SAP/chevrotain" target="_blank" rel="external noopener">https://github.com/SAP/chevrotain</a>  
2） <a href="https://sap.github.io/chevrotain/playground/" target="_blank" rel="external noopener">https://sap.github.io/chevrotain/playground/</a>  
3） <a href="https://pegjs.org/" target="_blank" rel="external noopener">https://pegjs.org/</a>  
4） <a href="https://pegjs.org/online" target="_blank" rel="external noopener">https://pegjs.org/online</a>  
5） <a href="https://download.csdn.net/download/shibamo/9034973" target="_blank" rel="external noopener">https://download.csdn.net/download/shibamo/9034973</a>  
6） <a href="https://blog.csdn.net/u012935901/article/details/17284469" target="_blank" rel="external noopener">https://blog.csdn.net/u012935901/article/details/17284469</a>  
7） <a href="https://www.oschina.net/translate/asmjs-javascript-compile-target" target="_blank" rel="external noopener">https://www.oschina.net/translate/asmjs-javascript-compile-target</a>  
8） <a href="https://www.zhihu.com/question/29264171" target="_blank" rel="external noopener">https://www.zhihu.com/question/29264171</a>  
9） <a href="https://www.cnblogs.com/BlackWalnut/p/4471938.html" target="_blank" rel="external noopener">https://www.cnblogs.com/BlackWalnut/p/4471938.html</a>  
10） <a href="https://esprima.org/demo/parse.html" target="_blank" rel="external noopener">https://esprima.org/demo/parse.html</a>  
11） <a href="https://www.open-open.com/lib/view/open1436509859348.html" target="_blank" rel="external noopener">https://www.open-open.com/lib/view/open1436509859348.html</a>  
12） <a href="https://github.com/jsdf/pce" target="_blank" rel="external noopener">https://github.com/jsdf/pce</a> （run mac in browser）

## 谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2017/04/10/2017_js4c/" target="_blank" rel="external noopener">//fed123.oss-ap-southeast-2.aliyuncs.com/2017/04/10/2017_js4c/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/js4c1.png
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/js4c2.png
