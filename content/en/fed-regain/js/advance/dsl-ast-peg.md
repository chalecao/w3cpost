---
title: 程序语言进阶之DSL与AST实战解析

---
<img loading="lazy" class="aligncenter wp-image-3308" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_332/format,webp" alt="" width="578" height="240" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png?x-oss-process=image/format,webp 1958w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_124/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_318/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/10/TB1nP2ONpXXXXb_XpXXXXXXXXXX-1958-812.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_332/format,webp 800w" sizes="(max-width: 578px) 100vw, 578px" />


  <strong style="color: #000000;">在线视频课程地址：<a href="https://t.cn/R3XoQJA">DSL与AST实战</a>


  GIT代码： <a href="https://github.com/chalecao/parse_css_in_js">https://github.com/chalecao/parse_css_in_js</a>



## [前端](https://www.w3cdoc.com)进阶系列课程

《[用JavaScript自己写Virtual DOM][1]》：<https://t.cn/REeKJp0>

《[前端](https://www.w3cdoc.com)函数式编程FP易学易用》：<https://t.cn/REeKVSk>

《[前端](https://www.w3cdoc.com)自己用NodeJS编写区块链BlockChain》：<https://t.cn/REeoF7v>

《程序语言进阶之DSL与AST实战解析》：<https://t.cn/R3XoQJA>

## 适用人群

建议先学习《  [用JavaScript自己写Virtual DOM][1]  》，本节课讲解AST与DSL在解析编程语言中的原理与应用。

## 课程概述

介绍DSL与AST的运行原理与机制，在实际编程语言解析到执行中是如何运用DSL和AST相关知识的，并根据学习的知识，[我们](https://www.w3cdoc.com)可以自己定义一套DSL，通过解析AST实现自己需要的功能。本课程也会结合babel转换JSX的语法插件实例介绍在[前端](https://www.w3cdoc.com)领域中如何应用AST实现灵活的处理各种语言的处理。

## 【课程大纲】

## **第1章：DSL与AST相关基础概念**

1. 介绍DSL与AST类比编译原理<figure class="wp-block-image">

<img loading="lazy" class="wp-image-1873 aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/1111.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/1111.jpg?x-oss-process=image/resize,m_fill,w_1024,h_826/format,webp" alt="" width="474" height="382" /> </figure>

比如C语言或者c++编写的代码都是首先经过编译器编译成汇编语言，然后经过汇编器链接一些类库，最后生成可执行程序exe。这其中编译器部分就是根据c语言或者c++语言的DSL定义，分析代码生成AST语法树，然后生成汇编代码。

2. 类比NLP介绍DSL与AST<figure class="wp-block-image">

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/2222.jpg" alt="" width="480" height="338" /> </figure>

NLP自然语言处理是最近几年也比较火，常用的莫过于语音识别，将人么的语音输入识别为计算机相应的指令。比如google推出的google assistant和siri，语音首先会被识别转换为一句文本，然后通过文字DSL词法分析拆分成有意义的词语。然后根据不同语言的语法做语法分析，最后生成一个语法树。最后根据推断规则转换成语音指令。

3. DSL与AST定义讲解<figure class="wp-block-image">

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/3333.jpg" alt="" width="471" height="361" /> </figure>

4. 在线演示解析Javascript为AST<figure class="wp-block-image">

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/4444.jpg" alt="" width="477" height="337" /> </figure>

通过<https://astexplorer.net/>这个在线工具，[我们](https://www.w3cdoc.com)可以更直观的查看[我们](https://www.w3cdoc.com)代码生成的AST。

## **第2章：DSL与AST原理与运用**

1. DSL与AST原理与项目应用<figure class="wp-block-image">

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/5555.jpg" alt="" width="542" height="340" /> </figure> <figure class="wp-block-image"><img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/66666.jpg" alt="" width="539" height="305" /></figure>

2. DSL的词法解析与语法解析<figure class="wp-block-image">

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/77777.jpg" alt="" width="538" height="224" /> </figure> <figure class="wp-block-image"><img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/8888.jpg" alt="" width="532" height="389" /></figure>

## 第3章：手写CSS解析器<figure class="wp-block-image">

<img loading="lazy" class="alignnone wp-image-2130 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20180809-141659-e1537194640664.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20180809-141659-e1537194640664.jpg?x-oss-process=image/format,webp" alt="" width="543" height="294" /> </figure> <figure class="wp-block-image">这里[我们](https://www.w3cdoc.com)依照CSS的语法定义实现了一个简易的css解析器。具体实现方法和步骤可以参考视频教程内容。这里不做详细介绍。</figure>

词法的分析提取和语法嵌套和识别主要还是依赖于正则表达式，其实这里最后识别产出的是一个解析树（parsed tree），也就是具体的语法树（CST， concrete syntax tree）。

## 第3章：babel插件实现原理

先看一下babel插件原理，如下：<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/common/Jietu20180916-202008.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/common/Jietu20180916-202008.jpg?x-oss-process=image/format,webp" width="542" height="302" /> [前端](https://www.w3cdoc.com)开发已经离不开babel，通过babel转换过程，[我们](https://www.w3cdoc.com)可以使用最新的es各种新特性。其实整个过程的原理也很简单，首先通过babylon这个词法、语法分析器，生成抽象语法树。将代码转换成按照特定语法组成的词汇token流集合，然后通过babel-traverse遍历这个抽象语法树，通过对各个token处理，可以转换成需要的语法，比如将=>箭头函数转换成function，将let转换成var；最后通过babel-generator生成符合规范的代码。 关于如何写babel插件可以参考这里：<https://github.com/jamiebuilds/babel-handbook>。 关于JSX插件可以看这里：[transform-react-jsx][2] 插件的执行阶段是在babel-traverse阶段，通过访问者模式，可以访问到抽象语法树的各个节点，JSX插件主要工作是找到HTML片段，将HTML转换成一个个具有层级嵌套关系的Virtual Node构成的virtual DOM，准确的说是一个vnode函数。这个函数的参数是元素类型，元素的属性和子元素。<img loading="lazy" class="aligncenter" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/05/93f86aa8283fa3c1429277d332f86bf0.png" width="400" height="266" /> 视频课程中有详细介绍，<span style="color: #ff0000;">课程地址</span>：[JS写virtualDom][3]

## <span style="color: #ff6600;">第4章：基于peg.js实现代码压缩工具</span>

这一节注定会很长&#8230;&#8230;. 需要耐心和信心。 **Parse Tree VS Abstract Syntax Tree** 先介绍这两个的区别。前面课程为了方便理解，[我们](https://www.w3cdoc.com)分别学习了《手写CSS解析器》和《实现babel插件》这两部分内容。前面并没有介绍**Parse Tree**和**Abstract Syntax Tree**的含义。[我们](https://www.w3cdoc.com)这里从实践倒推到理论学习，这样更容易理解。 **Parse Tree：解析出来的是语法结构树，注重表达语法结构** **Abstract Syntax Tree：抽象语法树着重表达逻辑结构**<img loading="lazy" class="alignnone wp-image-2316 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181002-102303.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181002-102303.gif?x-oss-process=image/resize,m_fill,w_1024,h_619/format,webp" alt="" width="459" height="278" /> 之前[我们](https://www.w3cdoc.com)写CSS解析器的时候，实际上并不是转换成AST，而是利用正则表达式解析出PT，再处理。 可以简单的理解**代码经过词法分析，进行分词生成词汇流（token flow），然后经过语法分析（Synatex Analysis）之后生成的是PT，最后在经过抽象提取简化，生成AST。**

### <span style="color: #ff0000;">文法</span>

讲到这里，[我们](https://www.w3cdoc.com)就必须要在学习一下文法相关的知识。文法是一种规范描述语法的术语。关于词法分析，这里就不介绍，可以参考（[词法分析][4]） [我们](https://www.w3cdoc.com)知道了**词法分析是专注于一个检测一个语言中是否有不合格的单词**，以及将单词进行分类。那么为什么要分类呢？其目的就是为了规范化。只有无限的东西规范到一个范围内，[我们](https://www.w3cdoc.com)才能对其进行识别和分析。例如，[我们](https://www.w3cdoc.com)定义在加号两边只能是两个ID。这样，如果出现IF PLUS ID 这样的结构就说明是不正确的，其犯了语法错误。从上例可以看出，[我们](https://www.w3cdoc.com)已经从单词级别的分析转换到了单词与单词之间的关系的分析。他们之间的关系就是[我们](https://www.w3cdoc.com)定义的相关语法。 类似于<span style="color: #0000ff;">词法分析</span>，[我们](https://www.w3cdoc.com)为了描述一类单词，使用了<span style="color: #0000ff;">正则表达式</span>，在这里，[我们](https://www.w3cdoc.com)为了<span style="color: #0000ff;">描述一类语法</span>，[我们](https://www.w3cdoc.com)使用了<span style="color: #0000ff;">上下文无关文法</span>。由此可以知道，文法是用来定义句子结构的（单词与单词之间的关系），上下文无关文法是指，该文法所定义的所有的句子结构之间是没有关系的。例如ID ＝ ID ＋ ID，[我们](https://www.w3cdoc.com)不关心ID在怎么来的，经历了那些东西，[我们](https://www.w3cdoc.com)只关心一个字符是不是ID，以及ID的等价形式有那些。 以上只是对文法的感性描述，比较正规的定义是：**一个上下文无关文法包含四个成分，终结符号集合，非终结符号集合，起始符号，产生式集合。** 产生式的形式是A－>B这种形式，其中**左面一定是非终结符，右面是终结符和非终结符的混合**。所以，凡事能够放到左面的符号都成为非终结符，是由语法的设计者定义的。终结符就是不能产生产生式的符号，比如语言中的＋，－，），>等。起始符号是非终结符集合中的一个，表示语法分析从这个符号开始。例如：A->B+C, B->A,C->-C，使用B和C代替第一产生式中的相应部分，就可以得到一个能不限数字个数的加减法运算表达式。考虑下面一个文法：<img loading="lazy" class="alignnone wp-image-2341" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181017-093606.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181017-093606.gif?x-oss-process=image/format,webp" alt="" width="504" height="197" /> 如果使用上面的文法来分析1+2*3这样的语句，[我们](https://www.w3cdoc.com)就可能得到两个不同的分析过程：<img loading="lazy" class="alignnone wp-image-2342" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/021418304909051.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/021418304909051.png?x-oss-process=image/format,webp" alt="" width="614" height="192" /> 上面的树形结构就是语法分析树。采用自底向上的方式来计算表达式，第一个是（1+2）＊3，第二个是1＋（2*3）。如果一个文法对一个句子进行分析可以产生多个语法分析树，[我们](https://www.w3cdoc.com)就称这个文法是**二义文法**。这个时候计算机就不知道该使用哪个过程了。但是，通常二义文法可以转化成非二义文法：<img loading="lazy" class="alignnone wp-image-2343" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181017-093628.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/05/Jietu20181017-093628.gif?x-oss-process=image/format,webp" alt="" width="565" height="184" /> 上面这个文法就规定了＊具有更高的优先级，且文法是左结合的文法。这里的S就是起始符号，**$**的意思是如果遇到这个符号表示一个文法分析过程的结束。 上面提到上下文无关文法，[我们](https://www.w3cdoc.com)简单介绍下，文法分为两种：上下文有关文法（1型文法，CSG，Context-sensitive grammars）和上下文无关文法（2型文法，CFG， Context-free grammars）。 简单理解，汉语是上下文有关语法，因为比如**本来**这个词汇，在下面两个句子中： **本来**这个进球就是违例的，但你不肯承认也没办法 我有一**本来**自美国的花花公子杂志 [我们](https://www.w3cdoc.com)需要根据上下文来判断是否能将**本来**作为一个词汇。而[我们](https://www.w3cdoc.com)的编程语言都是上下文无关文法。上下文无关文法就是说这个文法中所有的产生式左边只有一个非终结符，比如： S -> aSb S -> ab 这个文法有两个产生式，每个产生式左边只有一个非终结符S，也就是说<span style="color: #0000ff;">上下文无关文法的终结符都是确定的</span>，不会有其他可能。因为你只要找到符合产生式右边的串，就可以把它归约为对应的非终结符。 比如： aSb -> aaSbb S -> ab 这就是上下文相关文法，因为它的第一个产生式左边有不止一个符号，所以你在匹配这个产生式中的S的时候必需确保这个S有正确的“上下文”，也就是左边的a和右边的b，所以叫上下文相关文法。 <span style="color: #008000;">PS：<strong style="color: #000000;">在线视频课程地址：<a href="https://t.cn/R3XoQJA">DSL与AST实战</a></span>

### <span style="color: #ff0000;">PEG=Parsing Expression Grammars</span>

说道重点了，醒醒，同学们。 **Backus-Naur Form（BNF）**是CFG语法格式中最成功的格式，甚至是PEG的基础。但是，这个过程很简单，因此它的基本形式并不常用。[我们](https://www.w3cdoc.com)通常使用更强大的变体。为了说明为什么这些变体是必要的，[我们](https://www.w3cdoc.com)来展示一个BNF的例子：一个字符的描述。

    < letter >    ::= "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
    < digit >     ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    < character > ::= < letter > | < digit >

说明：符号**<** letter **>**可以在英文字母的任何字母中转换，尽管在[我们](https://www.w3cdoc.com)的例子中只有小写字母是有效的。类似的过程发生在**< digit >**，它可以指示任何替代数字。第一个问题是你必须单独列出所有的选择；像使用正则表达式一样，不能使用字符类。这很烦人，但通常是可以管理的，除非你必须列出所有的Unicode字符。BNF还有许多其他限制：在语法中使用空字符串或格式使用的符号（即:: =）使得复杂，它有一个详细的语法（即你必须在< and >之间包含终端）等等。 为了解决这些限制，Niklaus Wirth创建了**Extended Backus-Naur Form(EBNF)**，其中包含了他自己的Wirth语法表示法的一些概念。EBNF是最常用的当代解析工具，尽管工具可能偏离标准符号。EBNF有一个更清洁的符号，并采用更多的运算符来处理连接或可选的元素。

    letter    = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" ;
    digit     = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
    character = letter | digit ;
    text      = character , { character } ;

解析表达语法（PEG）是<a href="https://pdos.csail.mit.edu/papers/parsing:popl04.pdf" target="_blank" rel="noopener noreferrer">Brian Ford在2004年发表的一篇论文</a>。从技术上讲，它来源于一种称为自顶向下解析语言（Top-Down Parsing Language，TDPL）的旧式正式语法。然而，描述它的一个简单的方法是在现实世界中的EBNF。上面的例子用peg来写，如下：

    letter    ← [a-z]
    digit     ← [0-9]
    character ← letter / digit
    text      ← character+

PS：还记得上面说的二义文法吗，PEG没有这个问题。PEG和CFG之间最重要的区别可能是PEG的选择顺序是有意义的，而CFG则不是。如果有许多可能的有效方法来解析输入，则CFG将不明确，因此将返回错误。通常错误的意思是，一些采用CFG的解析器可以处理模糊的语法；例如，向开发者提供所有可能的有效结果，并让他们把它整理出来。相反，由于第一个适用的选择将被选择，PEG完全消除了歧义。因此，PEG永远不会含糊不清。 在下面的例子中，doge永远不会被匹配。由于dog先来，它每次都会被挑选。

<div>
  <div id="highlighter_186903" class="syntaxhighlighter xml">
    dog ← &#8216;dog&#8217; / &#8216;doge&#8217;
  </div>
</div>

参考： [NLP语法解析指南][5]。<strong style="color: #000000;">在线视频课程地址：[DSL与AST实战][3]

### <span style="color: #ff0000;">编程实例</span>

peg.js是基于javascript实现的peg语法格式分析器，[我们](https://www.w3cdoc.com)可以很方便的实现自定义的DSL解析。线上地址：<a href="https://pegjs.org/online" target="_blank" rel="noopener noreferrer">https://pegjs.org/online</a> ，打开后会默认有个基于peg.js实现的四则运算的例子。[大家](https://www.w3cdoc.com)可以自己看下。   <span style="color: #ff0000;">题目1</span>，**将JavaScript的代码中的if函数转换成三元表达式**。 [我们](https://www.w3cdoc.com)经常看到[我们](https://www.w3cdoc.com)代码经过打包编译之后，基本上if函数都不见了，都变成了三元表达式。有的会嵌套很多层，调试起来看得真费劲。那么，你知道怎么实现的么？今天[我们](https://www.w3cdoc.com)基于peg.js实现一个简单的版本。 要实现语法解析，首先[我们](https://www.w3cdoc.com)要定义语法格式。上面也说过了，CFG语法包含四个部分：**终结符号集合，非终结符号集合，起始符号，产生式集合。** [我们](https://www.w3cdoc.com)先学习下peg.js中的解析表达式类型：参考官方文档：<https://pegjs.org/documentation>

    <span style="font-size: 12pt; font-family: 'times new roman', times, serif;"><span style="font-size: 10pt;">"literal"    匹配literal字符，如果后面假=加i，例如"literal"i   意思不分大小写</span>
    <span style="font-size: 10pt;">[characters]   表示匹配characters中的任何一个</span>
    <em>expression</em> *  贪婪模式匹配expression 0次或多次，数组形式返回匹配的结果
    <em>expression</em> +  贪婪模式匹配expression 1次或多次， 数组形式返回匹配的结果
    <em>expression</em> ?  匹配expression，匹配到返回匹配结果，否则返回null
    <em>label</em> : expression 匹配expression，并且把匹配的结果存储在label中
    <em>expression<sub>1</sub></em> / <em>expression<sub>2</sub></em> / ... / <em>expression<sub>n </sub></em>匹配expression1 或者 匹配expression2 这样一直匹配下去
    <em>expression</em> { <em>action</em> }  匹配expression之后返回action表达式
    ( <em>expression</em> )  匹配这个子expression，并返回结果</span>

有了这些基础知识，[我们](https://www.w3cdoc.com)可以简单的先写一个匹配一个函数的语法规则： 假设输入是：

    function test(){
        let a = 1;
        if(a == 1){
             a = 2
        }
        a = 5;
    }

那么[我们](https://www.w3cdoc.com)编写规则，先用最简单的方式，后面在考虑优化。

    Expression
      = "function" _ funName:name _ "(" param:name ")" _ "{" 
      _ otherBefore:name _ 
      "if" _ "(" cond:name _ ")" _ "{" _ expr:name _
      
      "}"
       _ otherAfter:name _ 
      "}"
      { return `function ${funName}{ ${otherBefore} (${cond})?(${expr}):'';${otherAfter} }` }
    
    name = nn:[a-z / A-Z / _ / = / 0-9 / ;]* {return nn.join("")}
    
    _ "whitespace"
      = [ \t\n\r]*

输出的结果是：

```
"function test{ let a = 1; (a == 1)?(a = 2):'';a = 5; }"
```

[我们](https://www.w3cdoc.com)可以看到，已经达到了[我们](https://www.w3cdoc.com)的要求。聪明的你可能已经想到了，这样的代码可以用于代码压缩工具。是的，[我们](https://www.w3cdoc.com)常用的代码压缩工具就是这么做的。<strong style="color: #000000;">在线视频课程地址：[DSL与AST实战][3]   <span style="color: #ff0000;">题目2，</span>四算法则计算器 这个例子是官网默认的例子，[我们](https://www.w3cdoc.com)直接解析一下，代码如下：

    Expression
      = head:Term tail:(_ ("+" / "-") _ Term)* {
          return tail.reduce(function(result, element) {
            if (element[1] === "+") { return result + element[3]; }
            if (element[1] === "-") { return result - element[3]; }
          }, head);
        }
    
    Term
      = head:Factor tail:(_ ("*" / "/") _ Factor)* {
          return tail.reduce(function(result, element) {
            if (element[1] === "*") { return result * element[3]; }
            if (element[1] === "/") { return result / element[3]; }
          }, head);
        }
    
    Factor
      = "(" _ expr:Expression _ ")" { return expr; }
      / Integer
    
    Integer "integer"
      = _ [0-9]+ { return parseInt(text(), 10); }
    
    _ "whitespace"
      = [ \t\n\r]*

这里一共有5条规则，可以看成是5条产生式。 [我们](https://www.w3cdoc.com)分析一下最后一条，其他的类似：

    _ "whitespace"
    = [ \t\n\r]*

这一条规则是定义了空格、tab、回车、换行的表达式，用 _ 表示，`"whitespace"`这个看作是注释，方便理解这条产生式的含义，等号左边是非终结符号，等号右边是非终结符和终结符的合集。<strong style="color: #000000;">在线视频课程地址：[DSL与AST实战][3]

## 第5章：实现基于http的code loader

现有的例子： [http-vue-loader][6]  [angular-http-loader][7]  , 更有惊喜的消息是[浏览器](https://www.w3cdoc.com)目前也开始逐步支持动态加载es module，

    <span class="nt"><script </span><span class="na">type=</span><span class="s">"module"</span><span class="nt">></span> 
    <span class="kr">import</span> <span class="p">{</span><span class="nx">addTextToBody</span><span class="p">}</span> <span class="nx">from</span> <span class="s1">'./utils.mjs'</span><span class="p">;</span> 
    <span class="nx">addTextToBody</span><span class="p">(</span><span class="s1">'Modules are pretty cool.'</span><span class="p">);</span> 
    <span class="nt"></script></span>
    

    <span class="c1">// utils.mjs</span> 
    <span class="kr">export</span> <span class="kd">function</span> <span class="nx">addTextToBody</span><span class="p">(</span><span class="nx">text</span><span class="p">)</span> <span class="p">{
    </span>   <span class="kr">const</span> <span class="nx">div</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">'div'</span><span class="p">);</span> 
    <span class="nx">   div</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="nx">text</span><span class="p">;</span> 
    <span class="nb">   document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">div</span><span class="p">);</span> 
    <span class="p">}</span>

兼容性要求：具体使用方法参考：[ECMAScript modules in browsers][8]

* Safari 10.1.
* Chrome 61.
* Firefox 60.
* Edge 16.

[大家](https://www.w3cdoc.com)可以自己写代码试一下。[我们](https://www.w3cdoc.com)分析下原理，module script中的import 代码会通过http来加载指定的模块。[我们](https://www.w3cdoc.com)可以实现这些功能。 <span style="color: #ff0000;">step1：<span style="color: #000000;">解析export module script脚本</span></span> 首先[我们](https://www.w3cdoc.com)解析export指令的js脚本，用于解析模块导出的js函数。

    export function addTextToBody(text) {
      const div = document.createElement('div');
      div.textContent = text;
      document.body.appendChild(div);
    }
    export function addTextToBody2(text) {
      const div = document.createElement('div');
      div.textContent = text;
      document.body.appendChild(div);
    }

比如上面的例子，[我们](https://www.w3cdoc.com)需要输出函数和函数对应的内容。编写peg文法规则如下：

    Expression
      = ("export" _ "function" _ funName:name _ "(" param:name ")" _ "{" 
       _ content:exps _ 
      "}" _
      { return {funName, content:"function "+funName+"("+param+"){"+content+"}"}})*
    
    exps 
        = nn:[a-zA-Z/.,= ()0-9;\t\r\n']* 
        {return nn.join("")}
        
    name = nn:[a-zA-Z0-9]* {return nn.join("")}
    
    _ "whitespace"
      = [ \t\n\r]*

得到解析的结果是：

```
[
   {
      "funName": "addTextToBody",
      "content": "const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
"
   },
   {
      "funName": "addTextToBody2",
      "content": "const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
"
```

可以满足[我们](https://www.w3cdoc.com)的需求。<strong style="color: #000000;">在线视频课程地址：[DSL与AST实战][3] <span style="color: #ff0000;">step2.</span> 解析import module脚本 要解析的脚本如下：

    import {addTextToBody} from "https://cdn.rawgit.com/jakearchibald/a298d5af601982c338186cd355e624a8/raw/aaa2cbee9a5810d14b01ae965e52ecb9b2965a44/utils.js"
    
    addTextToBody("fed123.com")

编写peg文法表达式如下：

    Expression
      = ("import" _ fun:mods _ "from" _ src:exps _ 
      { return {fun, src}})*
      ( content:exps)
    
    exps 
        = nn:[a-zA-Z/.,= ()0-9;'":]* 
        {return nn.join("")}
    mods
        = "{"* nn:name "}"* {return nn.split(",")}
        
    name = nn:[a-zA-Z0-9,]* {return nn.join("")}
    
    _ "whitespace"
      = [ \t\n\r]*

输出的结果：

```
[
   [
      {
         "fun": [
            "addTextToBody",
            "other"
         ],
         "src": "\"https://cdn.rawgit.com/jakearchibald/a298d5af601982c338186cd355e624a8/raw/aaa2cbee9a5810d14b01ae965e52ecb9b2965a44/utils.js\""
      }
   ],
   "addTextToBody(\"fed123.com\")"
]
```

已经满足[我们](https://www.w3cdoc.com)的需求。 <span style="color: #ff0000;">step3.</span> 实现http加载模块，并结合step1解析模块函数，同时调用step2解析出来的函数。 先介绍下fetch函数（兼容性自己查一下，还可以的），

```
 <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resp<span class="token punctuation">)</span> <span class="token operator">=></span> resp<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Transform the data into json</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Create and append the li's to the ul</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

```

[我们](https://www.w3cdoc.com)基于fetch函数通过http请求动态获取模块脚本内容。 所以<span style="color: #ff0000;">最后的结果</span>就是这样：你可以复制到https://pegjs.org/online 上面看下结果。

    Expression
      = mm:modules
      content:cont
      {
        let url = mm[0].src;
        let funcName = mm[0].fun;
        fetch(url)
        .then((resp) => resp.text()) // Transform the data into text
        .then(function(data) {
    // generate parser
    var parser = peg.generate(`Expression
      = ("export" _ "function" _ funName:name _ "(" param:name ")" _ "{"
       _ content:exps _
      "}" _
      { return {funName, content:"function "+funName+"("+param+"){"+content+"}"}})*;exps
        = nn:[a-zA-Z/.,= ()0-9;\\t\\r\\n']*
        {return nn.join("")};name = nn:[a-zA-Z0-9]* {return nn.join("")};_ "whitespace"
      = [ \\t\\n\\r]*`)
    // parse script content
    let scriptContent = parser.parse(data)[0]
    if(scriptContent.funName == funcName){
       //声明module 函数
       eval(scriptContent.content + content)
    }
        })
        return {mm:url,content}
      }
    
    modules = ("import" _ fun:mods _ "from" _  quote src:exps quote  _ 
      { return {fun, src}})*
      
    cont 
        = nn:[a-zA-Z/.,= ()0-9;:"']* 
        {return nn.join("")}
    exps 
        = nn:[a-zA-Z/.,= ()0-9;:]* 
        {return nn.join("")}
    
    quote = ['"]*
        
    mods
        = "{"* nn:name "}"* {return nn.split(",")}
        
    name = nn:[a-zA-Z0-9,]* {return nn.join("")}
    
    _ "whitespace"
      = [ \t\n\r]*

PS：当然本例中的脚本都是实验版本，实际应用要考虑到更多的兼容情况。<strong style="color: #000000;">在线视频课程地址：[DSL与AST实战][3] <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <audio style="display: none;" controls="controls" data-mce-fragment="1"></audio> <span style="color: #008000;"></span>

# [前端](https://www.w3cdoc.com)进阶系列课程

<span style="color: #008000;"></span>

《用JavaScript自己写Virtual DOM》：<https://t.cn/REeKJp0> <span style="color: #008000;"></span>

《[前端](https://www.w3cdoc.com)函数式编程FP易学易用》：<https://t.cn/REeKVSk> <span style="color: #008000;"></span>

《[前端](https://www.w3cdoc.com)自己用NodeJS编写区块链BlockChain》：<https://t.cn/REeoF7v> <span style="color: #008000;"></span>

《程序语言进阶之DSL与AST实战解析》：<https://t.cn/R3XoQJA> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio>

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/hanshushibianchengyuvirtualdom/
 [2]: https://www.npmjs.com/package/babel-plugin-transform-react-jsx
 [3]: https://t.cn/R3XoQJA
 [4]: https://www.cnblogs.com/BlackWalnut/p/4467749.html
 [5]: https://www.evget.com/article/2018/1/3/27606.html
 [6]: https://github.com/FranckFreiburger/http-vue-loader#readme
 [7]: https://github.com/mpalourdio/ng-http-loader#readme
 [8]: https://jakearchibald.com/2017/es-modules-in-browsers/
