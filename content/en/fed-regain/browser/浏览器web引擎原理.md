---
title: 浏览器JS引擎工作原理

---
本文主要介绍[浏览器](https://www.w3cdoc.com)引擎基本知识，介绍javascript虚拟机如何解析执行JS脚本，以及期间可以做的优化工作。

# webkit


  <img loading="lazy" width="1646" height="270" class="alignnone size-full wp-image-6396 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/format,webp 1646w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_49/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_131/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_126/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_252/format,webp 1536w" sizes="(max-width: 1646px) 100vw, 1646px" />

前面[[浏览器](https://www.w3cdoc.com)渲染原理][1]中[我们](https://www.w3cdoc.com)介绍了[浏览器](https://www.w3cdoc.com)的渲染进程，是webkit核心blink负责处理的。关于html的渲染解析这里不介绍，webkit中源于两部分：KHTML（主要指渲染部分）和KJS（V8引擎）

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

# V8引擎的执行


  <img loading="lazy" width="2286" height="732" class="alignnone size-full wp-image-6402 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/format,webp 2286w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_96/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_256/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_246/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_492/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_656/format,webp 2048w" sizes="(max-width: 2286px) 100vw, 2286px" />

整体虚拟机的运行流程如上所示，当然随着不断地迭代，会有些变化，整体流程差不多。v8虚拟机会在JIT解释执行阶段做很多优化工作。解释执行前的工作流程如下：


  <img loading="lazy" class="alignnone wp-image-6400 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/format,webp" alt="" width="777" height="390" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/format,webp 1338w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_151/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_402/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_386/format,webp 768w" sizes="(max-width: 777px) 100vw, 777px" />

<h2 id="1qRGQ" data-lake-id="98ca2868c8a4d7258074c3f235d30d29" data-wording="true">
  scanner




  scanner 是一个扫描器，用于对纯文本的 JavaScript 代码进行词法分析。它会将代码分析为 tokens。token 在这里是一个非常重要的概念，它是词义单位，是指语法上不能再分割的最小单位，可能是单个字符，也可能是一个字符串。


  例如，一段简单的代码如下：

<div id="f3gI1" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20a%20%3D%2020%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22f3gI1%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
const a = 20
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




  上面的代码的 token 集合如下

<div id="78Iq4" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%5B%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Keyword%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22const%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Identifier%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22a%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Punctuator%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22%3D%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Numeric%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%2220%5C%22%5Cn%20%20%7D%5Cn%5D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%2278Iq4%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
[
  {
    "type": "Keyword",
    "value": "const"
  },
  {
    "type": "Identifier",
    "value": "a"
  },
  {
    "type": "Punctuator",
    "value": "="
  },
  {
    "type": "Numeric",
    "value": "20"
  }
]
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## parser

顾名思义，parser 模块[我们](https://www.w3cdoc.com)可以理解为是一个解析器。解析过程是一个语法分析的过程，它会将词法分析结果 tokens 转换为抽象语法树「Abstract Syntax Tree」，同时会验证语法，如果有错误就抛出语法错误。[我们](https://www.w3cdoc.com)可以通过在线网站 <a href="https://esprima.org/demo/parse.html" target="_blank" rel="noopener noreferrer">esprima</a> 来观察 JavasSript 代码通过词法分析变成 AST 之后的样子。这部分在[程序语言进阶之DSL与AST实战解析][2]课程中有介绍。


  <img loading="lazy" class="alignnone wp-image-6404 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/format,webp" alt="" width="675" height="398" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/format,webp 1868w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_177/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_472/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_453/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_906/format,webp 1536w" sizes="(max-width: 675px) 100vw, 675px" />


  同样一段代码如下：

<div id="m6LnC" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20a%20%3D%2020%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22m6LnC%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
const a = 20
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  被解析成抽象语法树之后，变成

<div id="09C5i" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%7B%5Cn%20%20%5C%22type%5C%22%3A%20%5C%22Program%5C%22%2C%5Cn%20%20%5C%22body%5C%22%3A%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22VariableDeclaration%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22declarations%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22VariableDeclarator%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22id%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Identifier%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22name%5C%22%3A%20%5C%22a%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22init%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Literal%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22value%5C%22%3A%2020%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22raw%5C%22%3A%20%5C%2220%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%5C%22kind%5C%22%3A%20%5C%22const%5C%22%5Cn%20%20%20%20%7D%5Cn%20%20%5D%2C%5Cn%20%20%5C%22sourceType%5C%22%3A%20%5C%22script%5C%22%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%2209C5i%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "a"
          },
          "init": {
            "type": "Literal",
            "value": 20,
            "raw": "20"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  需要注意的是，parser 的解析有两种情况，预解析与全量解析。理解他们有助于你编写性能更优的代码。

<h2 id="yu4iH" data-lake-id="b2d4fb7168c88e2d31931f3e4492a8dc" data-wording="true">
  预解析 pre-parsing




  原则上来说，应该对应用中[我们](https://www.w3cdoc.com)编写的所有代码进行解析。但是实际情况有很大的优化空间。在[我们](https://www.w3cdoc.com)代码里，有大量的代码，虽然声明了函数，但是这部分代码并未被使用，因此如果全部都做 Full-parsing 的话，那么整个解析过程就会做许多无用功。


  使用[浏览器](https://www.w3cdoc.com)的调试工具 Coverage 能够清晰的看出来，如下图，表格中的 Usage Visualization 表示的代码使用情况，红色部分表示未被执行过的代码，蓝色部分表示执行过的代码。[我们](https://www.w3cdoc.com)发现，未被使用的代码超过了一半多。这些代码多半是[我们](https://www.w3cdoc.com)在项目中引入的依赖包中声明的函数等。


  <img loading="lazy" class="alignnone wp-image-6405 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/format,webp" alt="" width="669" height="90" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/format,webp 1624w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_40/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_107/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_103/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_206/format,webp 1536w" sizes="(max-width: 669px) 100vw, 669px" />


  于是就有了预解析的方案，它在提高代码执行效率上起到了非常关键的作用。它有如下特点


 预解析会跳过未被使用的代码
 不会生成 AST，会产生不带有变量引用和声明的 scopes 信息
 解析速度快
 根据规范抛出特定的错误



  [我们](https://www.w3cdoc.com)来看这样一段代码

<div id="Zsy9y" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20foo1()%20%7B%5Cn%20%20console.log('foo1')%5Cn%7D%5Cnfunction%20foo2()%20%7B%5Cn%20%20console.log('foo2')%5Cn%7D%5Cn%5Cnfoo2()%3B%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22Zsy9y%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
function foo1() {
  console.log('foo1')
}
function foo2() {
  console.log('foo2')
}

foo2();
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  代码中，声明了两个函数 foo1 和 foo2，但是只有 foo2 被执行了。因此对于 foo1 来说，生成 AST 就变得没有意义。这个时候，foo1 的解析方式就是预解析。但是会生成作用域信息。如图，注意观察作用域引用 Scopes。


  <img loading="lazy" class="alignnone wp-image-6406 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/format,webp" alt="" width="780" height="293" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/format,webp 1516w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_113/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_301/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_289/format,webp 768w" sizes="(max-width: 780px) 100vw, 780px" />

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

<h2 id="ek4z0" data-lake-id="c4be875a427f431f9a5bf1cd7b6cfbbe" data-wording="true">
  全量解析 Full-parsing: Eage




  全量解析很好理解，它会解析所有立即执行的代码。这个时候会生成 AST，并且进一步明确更多的信息。


 解析被使用的代码
 生成 AST
 构建具体的 scopes 信息，变量的引用，声明等
 抛出所有的语法错误



  此时对应的，其实就是执行上下文的创建过程，关于执行上下文[我们](https://www.w3cdoc.com)后续详细分析。需要区分的是，作用域与作用域链的信息是在预解析阶段就已经明确了。分析一下这段代码的解析过程

<div id="xproj" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E5%A3%B0%E6%98%8E%E6%97%B6%E6%9C%AA%E8%B0%83%E7%94%A8%EF%BC%8C%E5%9B%A0%E6%AD%A4%E4%BC%9A%E8%A2%AB%E8%AE%A4%E4%B8%BA%E6%98%AF%E4%B8%8D%E8%A2%AB%E6%89%A7%E8%A1%8C%E7%9A%84%E4%BB%A3%E7%A0%81%EF%BC%8C%E8%BF%9B%E8%A1%8C%E9%A2%84%E8%A7%A3%E6%9E%90%5Cnfunction%20foo()%20%7B%5Cn%20%20console.log('foo')%5Cn%7D%5Cn%5Cn%2F%2F%20%E5%A3%B0%E6%98%8E%E6%97%B6%E6%9C%AA%E8%B0%83%E7%94%A8%EF%BC%8C%E5%9B%A0%E6%AD%A4%E4%BC%9A%E8%A2%AB%E8%AE%A4%E4%B8%BA%E6%98%AF%E4%B8%8D%E8%A2%AB%E6%89%A7%E8%A1%8C%E7%9A%84%E4%BB%A3%E7%A0%81%EF%BC%8C%E8%BF%9B%E8%A1%8C%E9%A2%84%E8%A7%A3%E6%9E%90%5Cnfunction%20fn()%20%7B%7D%5Cn%5Cn%2F%2F%20%E5%87%BD%E6%95%B0%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%EF%BC%8C%E5%8F%AA%E8%BF%9B%E8%A1%8C%E4%B8%80%E6%AC%A1%E5%85%A8%E9%87%8F%E8%A7%A3%E6%9E%90%5Cn(function%20bar()%20%7B%5Cn%5Cn%7D)()%5Cn%5Cn%2F%2F%20%E6%89%A7%E8%A1%8C%20foo%EF%BC%8C%E9%82%A3%E4%B9%88%E9%9C%80%E8%A6%81%E9%87%8D%E6%96%B0%E5%AF%B9%20foo%20%E5%87%BD%E6%95%B0%E8%BF%9B%E8%A1%8C%E5%85%A8%E9%87%8F%E8%A7%A3%E6%9E%90%EF%BC%8C%E6%AD%A4%E6%97%B6%20foo%20%E5%87%BD%E6%95%B0%E8%A2%AB%E8%A7%A3%E6%9E%90%E4%BA%86%E4%B8%A4%E6%AC%A1%20%5Cnfoo()%3B%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22xproj%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
// 声明时未调用，因此会被认为是不被执行的代码，进行预解析
function foo() {
  console.log('foo')
}

// 声明时未调用，因此会被认为是不被执行的代码，进行预解析
function fn() {}

// 函数立即执行，只进行一次全量解析
(function bar() {

})()

// 执行 foo，那么需要重新对 foo 函数进行全量解析，此时 foo 函数被解析了两次 
foo();
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  三个函数对应三种不同的情况，函数 foo 在函数声明时，被认为是不被执行的代码，因此进行一次预解析，但是后面会调用执行该方法，因此会再次进行全量解析，也就意味着 foo 函数被解析了两次。


  而立即执行函数 bar，在声明时就已经知道会执行，因此只会进行一次全量解析。


  函数声明 fn，从头到尾一直未被执行，因此只会进行一次预解析。


  那如果我在函数 foo 里面再次声明一个函数呢，那是不是也就意味着，foo 内部的函数也会被跟着解析两次。嵌套层级太深甚至会导致更多次数的解析。因此，减少不必要的嵌套函数，能提高代码的执行效率。这部分可以结合<a href="https://www.f2e123.com/javascriptnodejs/3662.html">执行上下文 (Execution Context) 和提升 (Hoisting)与事件循环 (Event Loop)</a>这个理解。


  注意：V8 引擎会对 parser 阶段的解析结果，缓存 3 天，因此如果[我们](https://www.w3cdoc.com)把不怎么变动的代码打包在一起，如公共代码，把经常变动的业务代码等打包到另外的 js 文件中，能够有效的提高执行效率。

<h2 data-lake-id="ea22b63638bea9a78494d982c952b87d" data-wording="true">
  Ignition解释器



Ignition 是 v8 提供的一个解释器。他的作用是负责将抽象语法树 AST 转换为字节码「bytecode」。并且同时收集下一个阶段「编译」所需要的信息。这个过程，[我们](https://www.w3cdoc.com)也可以理解为预编译过程。基于性能的考虑，预编译过程与编译过程有的时候不会区分的那么明显，有的代码在预编译阶段就能直接执行。

## TurboFan编译器


  TurboFan 是 v8 引擎的编译器模块。它会利用 Ignition 收集到的信息，将字节码转换为汇编代码。这也就是代码被最终执行的阶段。


  Ignition + TurboFan 的组合，就是字节码解释器 + JIT 编译器的黄金组合「边解释边执行」。Ignition 收集大量的信息，交给 TurboFan 去优化，多方面条件都满足的情况下，会被优化成机器码，这个过程称为 Optimize，当判断无法优化时就会触发去优化「De-optimize」操作，这些代码逻辑会重新回到 Ignition 中称为字节码。


  在这个过程中，有一个建议能够帮助[我们](https://www.w3cdoc.com)避免去优化操作，从而提高代码执行效率。那就是不要总是改变对象类型。例如以下一个例子

<div id="YUCmJ" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20foo(obj)%20%7B%5Cn%20%20return%20obj.name%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22YUCmJ%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
function foo(obj) {
  return obj.name
}
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  由于 JavaScript 的动态性，[我们](https://www.w3cdoc.com)虽然定义了一个函数 foo，但是该函数的参数 obj 并没有明确它的类型，那么这个时候，如果我传入的参数分别为以下几种情况

<div id="4H6nn" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22obj0%20%3D%20%7B%5Cn%20%20name%3A%20'Alex'%5Cn%7D%5Cn%5Cnobj1%20%3D%20%7B%5Cn%20%20name%3A%20'tom'%2C%5Cn%20%20age%3A%201%5Cn%7D%5Cn%5Cnobj2%20%3D%20%7B%5Cn%20%20name%3A%20'Jake'%2C%5Cn%20%20age%3A%201%2C%5Cn%20%20gender%3A%201%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%224H6nn%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            ```
obj0 = {
  name: 'Alex'
}

obj1 = {
  name: 'tom',
  age: 1
}

obj2 = {
  name: 'Jake',
  age: 1,
  gender: 1
}
```
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  对编译器而言，obj0，obj1，obj2 是三种不同的类型，此时 TurboFan 就无法针对这种情况做优化处理，只能执行 De-optimize 操作。这意味着执行效率的降低。因此，定义函数时，严格要求参数格式保持一致，在实践中是非常重要的优化策略，这也是 typescript 的作用之一。

<h2 data-lake-id="7caabaab604e8cc110a82d59f32ae774" data-wording="true">
  垃圾回收器 Orinoco




  在[我们](https://www.w3cdoc.com)执行的 JavaScript 代码中，有大量的垃圾内存需要处理。甚至绝大多数内存占用都是垃圾。因此[我们](https://www.w3cdoc.com)必须有一个机制来管理这些垃圾内存，用于回收利用。这就是垃圾回收器 Orinoco。


  垃圾回收器会定期的执行以下任务


 标记活动对象，和非活动对象「标记阶段」
 回收被非活动对象占用的内存空间「清除阶段」
 合并或者整理内存「整理阶段」



  v8 的 Compiler Pipeline 并非一开始就是使用的 Ignition + TurboFan 组合。也是在不断的迭代过程中演变而来。例如在他们之前，是 Full-codegen + Crankshaft，并且他们也共存过一段时间。


  在官方文档中，提供了<a href="https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_389" target="_blank" rel="noopener noreferrer">一个 PPT</a>，[我们](https://www.w3cdoc.com)可以观察不同版本的演变过程。该 PPT 介绍了为何要使用新的编译组合。


 减少了内存占用
 减少了启动时间
 降低了复杂度


# 类型推断


  <img loading="lazy" width="2310" height="712" class="alignnone size-full wp-image-6407 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/format,webp 2310w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_92/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_247/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_237/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_473/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_631/format,webp 2048w" sizes="(max-width: 2310px) 100vw, 2310px" />

上面讲到了档字节码编译器TurboFan无法确定优化代码编译时会触发代码去优化操作，变成低效率执行（每次执行都需要重新编译，而不能复用上次编译的记过）。其中一个重要原因是js弱类型语言导致的，那么编译器一般是怎么做类型推断的呢？见上图。



# 对象访问优化机制


  <img loading="lazy" width="2160" height="598" class="alignnone size-full wp-image-6408 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/format,webp 2160w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_83/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_221/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_213/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_425/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_567/format,webp 2048w" sizes="(max-width: 2160px) 100vw, 2160px" />

这里既然说到了[浏览器](https://www.w3cdoc.com)js虚拟机编译执行JS代码的过程，顺带说一下v8引擎的对象访问优化的机制，也是为了优化代码的执行效率。

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>



# 参考：

<https://trac.webkit.org/wiki>

<https://36kr.com/p/1641716056065>

<https://trac.webkit.org/wiki/WebCoreRendering>

[https://docs.google.com/presentation/d/1chhN90uB8yPaIhx\_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289\_1_389][3]

[关于对象的访问优化][4]



 [1]: https://www.f2e123.com/html5css3/6194.html
 [2]: https://www.f2e123.com/fed-regain/1867.html
 [3]: https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_389
 [4]: https://www.f2e123.com/javascriptnodejs/4676.html
