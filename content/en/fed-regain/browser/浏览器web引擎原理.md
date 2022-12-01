---
title: 浏览器JS引擎工作原理

---
本文主要介绍[浏览器](https://www.w3cdoc.com)引擎基本知识，介绍javascript虚拟机如何解析执行JS脚本，以及期间可以做的优化工作。

# webkit

<p id="ZfQQIbu">
  <img loading="lazy" width="1646" height="270" class="alignnone size-full wp-image-6396 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/format,webp 1646w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_49/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_131/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_126/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb93a0a7151d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_252/format,webp 1536w" sizes="(max-width: 1646px) 100vw, 1646px" />
</p>

前面[[浏览器](https://www.w3cdoc.com)渲染原理][1]中[我们](https://www.w3cdoc.com)介绍了[浏览器](https://www.w3cdoc.com)的渲染进程，是webkit核心blink负责处理的。关于html的渲染解析这里不介绍，webkit中源于两部分：KHTML（主要指渲染部分）和KJS（V8引擎）

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

# V8引擎的执行

<p id="BmQgQvs">
  <img loading="lazy" width="2286" height="732" class="alignnone size-full wp-image-6402 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/format,webp 2286w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_96/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_256/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_246/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_492/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9431ce2f11.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_656/format,webp 2048w" sizes="(max-width: 2286px) 100vw, 2286px" />
</p>

整体虚拟机的运行流程如上所示，当然随着不断地迭代，会有些变化，整体流程差不多。v8虚拟机会在JIT解释执行阶段做很多优化工作。解释执行前的工作流程如下：

<p id="QwouWLZ">
  <img loading="lazy" class="alignnone wp-image-6400 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/format,webp" alt="" width="777" height="390" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/format,webp 1338w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_151/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_402/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb942cacdee4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_386/format,webp 768w" sizes="(max-width: 777px) 100vw, 777px" />
</p>

<h2 id="1qRGQ" data-lake-id="98ca2868c8a4d7258074c3f235d30d29" data-wording="true">
  scanner
</h2>

<p data-lake-id="072cbc66e9f021fb31abf2709fd6dc07" data-wording="true">
  scanner 是一个扫描器，用于对纯文本的 JavaScript 代码进行词法分析。它会将代码分析为 tokens。<strong>token </strong>在这里是一个非常重要的概念，它是词义单位，是指语法上不能再分割的最小单位，可能是单个字符，也可能是一个字符串。
</p>

<p data-lake-id="48402a0b520227e38b44d767374d58da" data-wording="true">
  例如，一段简单的代码如下：
</p>

<div id="f3gI1" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20a%20%3D%2020%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22f3gI1%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">a</span> <span class="cm-operator">=</span> <span class="cm-number">20</span></span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

&nbsp;

<p data-lake-id="2a379ac6859b4ef17b4e4b94d0bfe8b9" data-wording="true">
  上面的代码的 token 集合如下
</p>

<div id="78Iq4" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%5B%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Keyword%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22const%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Identifier%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22a%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Punctuator%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%22%3D%5C%22%5Cn%20%20%7D%2C%5Cn%20%20%7B%5Cn%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Numeric%5C%22%2C%5Cn%20%20%20%20%5C%22value%5C%22%3A%20%5C%2220%5C%22%5Cn%20%20%7D%5Cn%5D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%2278Iq4%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content">[
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Keyword"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"value"</span>: <span class="cm-string">"const"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Identifier"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"value"</span>: <span class="cm-string">"a"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Punctuator"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"value"</span>: <span class="cm-string">"="</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Numeric"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"value"</span>: <span class="cm-string">"20"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">]</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## parser

顾名思义，parser 模块[我们](https://www.w3cdoc.com)可以理解为是一个解析器。解析过程是一个语法分析的过程，它会将词法分析结果 tokens 转换为抽象语法树「Abstract Syntax Tree」，同时会验证语法，如果有错误就抛出语法错误。[我们](https://www.w3cdoc.com)可以通过在线网站 <a href="https://esprima.org/demo/parse.html" target="_blank" rel="noopener noreferrer">esprima</a> 来观察 JavasSript 代码通过词法分析变成 AST 之后的样子。这部分在[程序语言进阶之DSL与AST实战解析][2]课程中有介绍。

<p id="BFmRHlE">
  <img loading="lazy" class="alignnone wp-image-6404 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/format,webp" alt="" width="675" height="398" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/format,webp 1868w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_177/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_472/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_453/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb944926de56.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_906/format,webp 1536w" sizes="(max-width: 675px) 100vw, 675px" />
</p>

<p data-lake-id="c2ee94ebc196b14263d27e414193a32f" data-wording="true">
  同样一段代码如下：
</p>

<div id="m6LnC" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20a%20%3D%2020%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22m6LnC%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">a</span> <span class="cm-operator">=</span> <span class="cm-number">20</span></span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="a367d410dd11617c8a95add8709943a4" data-wording="true">
  被解析成抽象语法树之后，变成
</p>

<div id="09C5i" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%7B%5Cn%20%20%5C%22type%5C%22%3A%20%5C%22Program%5C%22%2C%5Cn%20%20%5C%22body%5C%22%3A%20%5B%5Cn%20%20%20%20%7B%5Cn%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22VariableDeclaration%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22declarations%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22VariableDeclarator%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22id%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Identifier%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22name%5C%22%3A%20%5C%22a%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22init%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22type%5C%22%3A%20%5C%22Literal%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22value%5C%22%3A%2020%2C%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%5C%22raw%5C%22%3A%20%5C%2220%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%20%20%7D%5Cn%20%20%20%20%20%20%5D%2C%5Cn%20%20%20%20%20%20%5C%22kind%5C%22%3A%20%5C%22const%5C%22%5Cn%20%20%20%20%7D%5Cn%20%20%5D%2C%5Cn%20%20%5C%22sourceType%5C%22%3A%20%5C%22script%5C%22%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%2209C5i%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content">{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string">"type"</span>: <span class="cm-string">"Program"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string">"body"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"VariableDeclaration"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string cm-property">"declarations"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">        {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"VariableDeclarator"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          <span class="cm-string cm-property">"id"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">            <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Identifier"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">            <span class="cm-string cm-property">"name"</span>: <span class="cm-string">"a"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          <span class="cm-string cm-property">"init"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">            <span class="cm-string cm-property">"type"</span>: <span class="cm-string">"Literal"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">            <span class="cm-string cm-property">"value"</span>: <span class="cm-number">20</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">            <span class="cm-string cm-property">"raw"</span>: <span class="cm-string">"20"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">        }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string cm-property">"kind"</span>: <span class="cm-string">"const"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string">"sourceType"</span>: <span class="cm-string">"script"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="317e301d46e7e6beb7def76e72d6729a" data-wording="true">
  需要注意的是，parser 的解析有两种情况，预解析与全量解析。理解他们有助于你编写性能更优的代码。
</p>

<h2 id="yu4iH" data-lake-id="b2d4fb7168c88e2d31931f3e4492a8dc" data-wording="true">
  预解析 pre-parsing
</h2>

<p data-lake-id="8e5dbeef3eb11803c711f87e9ac7161f" data-wording="true">
  原则上来说，应该对应用中[我们](https://www.w3cdoc.com)编写的所有代码进行解析。但是实际情况有很大的优化空间。在[我们](https://www.w3cdoc.com)代码里，有大量的代码，虽然声明了函数，但是这部分代码并未被使用，因此如果全部都做 Full-parsing 的话，那么整个解析过程就会做许多无用功。
</p>

<p data-lake-id="f6c213722318d1a04fbd2f3bd8f0f6b8" data-wording="true">
  使用[浏览器](https://www.w3cdoc.com)的调试工具 Coverage 能够清晰的看出来，如下图，表格中的 Usage Visualization 表示的代码使用情况，红色部分表示未被执行过的代码，蓝色部分表示执行过的代码。[我们](https://www.w3cdoc.com)发现，未被使用的代码超过了一半多。这些代码多半是[我们](https://www.w3cdoc.com)在项目中引入的依赖包中声明的函数等。
</p>

<p id="zvwTcbD">
  <img loading="lazy" class="alignnone wp-image-6405 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/format,webp" alt="" width="669" height="90" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/format,webp 1624w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_40/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_107/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_103/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb9451655d0b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_206/format,webp 1536w" sizes="(max-width: 669px) 100vw, 669px" />
</p>

<p data-lake-id="1667a55cc5babf720732b74a3da65410" data-wording="true">
  于是就有了预解析的方案，它在提高代码执行效率上起到了非常关键的作用。它有如下特点
</p>

<ul data-lake-id="a65c385e4f82f8ff85d77e2391d8e92b">
  <li data-lake-id="fe5319c528f34cf6e477d442c9c5bf4f" data-wording="true">
    预解析会跳过未被使用的代码
  </li>
  <li data-lake-id="3b64f29ed6d030e410446a34f89b1170" data-wording="true">
    不会生成 AST，会产生不带有变量引用和声明的 scopes 信息
  </li>
  <li data-lake-id="d1fa6d1a855736abe539862806dce934" data-wording="true">
    解析速度快
  </li>
  <li data-lake-id="e1fe848dd8a5b9e4d8e01632d4703451" data-wording="true">
    根据规范抛出特定的错误
  </li>
</ul>

<p data-lake-id="4a813789e4ddcb4c146a3ce6a0969ff9" data-wording="true">
  [我们](https://www.w3cdoc.com)来看这样一段代码
</p>

<div id="Zsy9y" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20foo1()%20%7B%5Cn%20%20console.log('foo1')%5Cn%7D%5Cnfunction%20foo2()%20%7B%5Cn%20%20console.log('foo2')%5Cn%7D%5Cn%5Cnfoo2()%3B%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22Zsy9y%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">function</span> <span class="cm-def">foo1</span>() {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'foo1'</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">function</span> <span class="cm-def">foo2</span>() {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'foo2'</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-variable">foo2</span>();</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="07b65a828a3ff719055b8c602101d0c3" data-wording="true">
  代码中，声明了两个函数 foo1 和 foo2，但是只有 foo2 被执行了。因此对于 foo1 来说，生成 AST 就变得没有意义。这个时候，foo1 的解析方式就是预解析。但是会生成作用域信息。如图，注意观察作用域引用 Scopes。
</p>

<p id="GKXuloJ">
  <img loading="lazy" class="alignnone wp-image-6406 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/format,webp" alt="" width="780" height="293" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/format,webp 1516w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_113/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_301/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94577787fd.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_289/format,webp 768w" sizes="(max-width: 780px) 100vw, 780px" />
</p>

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

<h2 id="ek4z0" data-lake-id="c4be875a427f431f9a5bf1cd7b6cfbbe" data-wording="true">
  全量解析 Full-parsing: Eage
</h2>

<p data-lake-id="dc2cd3ece6a8d6d610791a311702d224" data-wording="true">
  全量解析很好理解，它会解析所有立即执行的代码。这个时候会生成 AST，并且进一步明确更多的信息。
</p>

<ul data-lake-id="9275235edb4f6f8ad101f91e362a4409">
  <li data-lake-id="a0012d6fbb3a425da9a705cfa4bce46c" data-wording="true">
    解析被使用的代码
  </li>
  <li data-lake-id="644456f7a432662e4b7fd1a2c74149ab" data-wording="true">
    生成 AST
  </li>
  <li data-lake-id="48825faa11ca0fb85d8aaa57129d4c8f" data-wording="true">
    构建具体的 scopes 信息，变量的引用，声明等
  </li>
  <li data-lake-id="7bd36cbc888c4e97565d27f662a97619" data-wording="true">
    抛出所有的语法错误
  </li>
</ul>

<p data-lake-id="c09884fc570cec165f0786f214973b76" data-wording="true">
  此时对应的，其实就是<strong>执行上下文</strong>的创建过程，关于执行上下文[我们](https://www.w3cdoc.com)后续详细分析。需要区分的是，作用域与作用域链的信息是在预解析阶段就已经明确了。分析一下这段代码的解析过程
</p>

<div id="xproj" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E5%A3%B0%E6%98%8E%E6%97%B6%E6%9C%AA%E8%B0%83%E7%94%A8%EF%BC%8C%E5%9B%A0%E6%AD%A4%E4%BC%9A%E8%A2%AB%E8%AE%A4%E4%B8%BA%E6%98%AF%E4%B8%8D%E8%A2%AB%E6%89%A7%E8%A1%8C%E7%9A%84%E4%BB%A3%E7%A0%81%EF%BC%8C%E8%BF%9B%E8%A1%8C%E9%A2%84%E8%A7%A3%E6%9E%90%5Cnfunction%20foo()%20%7B%5Cn%20%20console.log('foo')%5Cn%7D%5Cn%5Cn%2F%2F%20%E5%A3%B0%E6%98%8E%E6%97%B6%E6%9C%AA%E8%B0%83%E7%94%A8%EF%BC%8C%E5%9B%A0%E6%AD%A4%E4%BC%9A%E8%A2%AB%E8%AE%A4%E4%B8%BA%E6%98%AF%E4%B8%8D%E8%A2%AB%E6%89%A7%E8%A1%8C%E7%9A%84%E4%BB%A3%E7%A0%81%EF%BC%8C%E8%BF%9B%E8%A1%8C%E9%A2%84%E8%A7%A3%E6%9E%90%5Cnfunction%20fn()%20%7B%7D%5Cn%5Cn%2F%2F%20%E5%87%BD%E6%95%B0%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%EF%BC%8C%E5%8F%AA%E8%BF%9B%E8%A1%8C%E4%B8%80%E6%AC%A1%E5%85%A8%E9%87%8F%E8%A7%A3%E6%9E%90%5Cn(function%20bar()%20%7B%5Cn%5Cn%7D)()%5Cn%5Cn%2F%2F%20%E6%89%A7%E8%A1%8C%20foo%EF%BC%8C%E9%82%A3%E4%B9%88%E9%9C%80%E8%A6%81%E9%87%8D%E6%96%B0%E5%AF%B9%20foo%20%E5%87%BD%E6%95%B0%E8%BF%9B%E8%A1%8C%E5%85%A8%E9%87%8F%E8%A7%A3%E6%9E%90%EF%BC%8C%E6%AD%A4%E6%97%B6%20foo%20%E5%87%BD%E6%95%B0%E8%A2%AB%E8%A7%A3%E6%9E%90%E4%BA%86%E4%B8%A4%E6%AC%A1%20%5Cnfoo()%3B%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22xproj%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// 声明时未调用，因此会被认为是不被执行的代码，进行预解析</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">function</span> <span class="cm-def">foo</span>() {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'foo'</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// 声明时未调用，因此会被认为是不被执行的代码，进行预解析</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">function</span> <span class="cm-def">fn</span>() {}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// 函数立即执行，只进行一次全量解析</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">(<span class="cm-keyword">function</span> <span class="cm-def">bar</span>() {
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content">})()
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// 执行 foo，那么需要重新对 foo 函数进行全量解析，此时 foo 函数被解析了两次 </span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-variable">foo</span>();</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="6bebc382e790391e23ccf6842c5e5931" data-wording="true">
  三个函数对应三种不同的情况，函数 foo 在函数声明时，被认为是不被执行的代码，因此进行一次预解析，但是后面会调用执行该方法，因此会再次进行全量解析，也就意味着 foo 函数被解析了两次。
</p>

<p data-lake-id="2e0f0e5907d57aa0ddc67d57ac84b02f" data-wording="true">
  而立即执行函数 bar，在声明时就已经知道会执行，因此只会进行一次全量解析。
</p>

<p data-lake-id="a98b9523712562af52e992b67e8d8ae6" data-wording="true">
  函数声明 fn，从头到尾一直未被执行，因此只会进行一次预解析。
</p>

<p data-lake-id="b14be63810c89bf0eb6ab69bac1cb6fd" data-wording="true">
  那如果我在函数 foo 里面再次声明一个函数呢，那是不是也就意味着，foo 内部的函数也会被跟着解析两次。嵌套层级太深甚至会导致更多次数的解析。因此，减少不必要的嵌套函数，能提高代码的执行效率。这部分可以结合<a href="https://www.f2e123.com/javascriptnodejs/3662.html">执行上下文 (Execution Context) 和提升 (Hoisting)与事件循环 (Event Loop)</a>这个理解。
</p>

<p data-lake-id="ea22b63638bea9a78494d982c952b87d" data-wording="true">
  注意：V8 引擎会对 parser 阶段的解析结果，缓存 3 天，因此如果[我们](https://www.w3cdoc.com)把不怎么变动的代码打包在一起，如公共代码，把经常变动的业务代码等打包到另外的 js 文件中，能够有效的提高执行效率。
</p>

<h2 data-lake-id="ea22b63638bea9a78494d982c952b87d" data-wording="true">
  Ignition解释器
</h2>

Ignition 是 v8 提供的一个解释器。他的作用是负责将抽象语法树 AST 转换为字节码「bytecode」。并且同时收集下一个阶段「编译」所需要的信息。这个过程，[我们](https://www.w3cdoc.com)也可以理解为预编译过程。基于性能的考虑，预编译过程与编译过程有的时候不会区分的那么明显，有的代码在预编译阶段就能直接执行。

## TurboFan编译器

<p data-lake-id="3ca1854497bdb2baccc9ff911103a6e7" data-wording="true">
  TurboFan 是 v8 引擎的编译器模块。它会利用 Ignition 收集到的信息，将字节码转换为汇编代码。这也就是代码被最终执行的阶段。
</p>

<p data-lake-id="046937039b1e98b4f3ad1e0441c334fa" data-wording="true">
  Ignition + TurboFan 的组合，就是字节码解释器 + JIT 编译器的黄金组合「边解释边执行」。Ignition 收集大量的信息，交给 TurboFan 去优化，多方面条件都满足的情况下，会被优化成机器码，这个过程称为 Optimize，当判断无法优化时就会触发去优化「De-optimize」操作，这些代码逻辑会重新回到 Ignition 中称为字节码。
</p>

<p data-lake-id="4325b75c26fc81f847e54e1dab2b7671" data-wording="true">
  在这个过程中，有一个建议能够帮助[我们](https://www.w3cdoc.com)避免去优化操作，从而提高代码执行效率。那就是<strong>不要总是改变对象类型。</strong>例如以下一个例子
</p>

<div id="YUCmJ" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20foo(obj)%20%7B%5Cn%20%20return%20obj.name%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%22YUCmJ%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">function</span> <span class="cm-def">foo</span>(<span class="cm-def">obj</span>) {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-keyword">return</span> <span class="cm-variable-2">obj</span>.<span class="cm-property">name</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="46f703ad9ca712a0a3dc3eb069ca0f52" data-wording="true">
  由于 JavaScript 的动态性，[我们](https://www.w3cdoc.com)虽然定义了一个函数 foo，但是该函数的参数 obj 并没有明确它的类型，那么这个时候，如果我传入的参数分别为以下几种情况
</p>

<div id="4H6nn" class="lake-card-margin" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22obj0%20%3D%20%7B%5Cn%20%20name%3A%20'Alex'%5Cn%7D%5Cn%5Cnobj1%20%3D%20%7B%5Cn%20%20name%3A%20'tom'%2C%5Cn%20%20age%3A%201%5Cn%7D%5Cn%5Cnobj2%20%3D%20%7B%5Cn%20%20name%3A%20'Jake'%2C%5Cn%20%20age%3A%201%2C%5Cn%20%20gender%3A%201%5Cn%7D%22%2C%22heightLimit%22%3Atrue%2C%22margin%22%3Atrue%2C%22id%22%3A%224H6nn%22%7D">
  <div data-card-element="body">
    <div data-card-element="center">
      <div class="lake-codeblock lake-codeblock-javascript height-limit">
        <div class="lake-codeblock-content">
          <div class="CodeMirror CodeMirror-sizer">
            <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-variable">obj0</span> <span class="cm-operator">=</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">name</span>: <span class="cm-string">'Alex'</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-variable">obj1</span> <span class="cm-operator">=</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">name</span>: <span class="cm-string">'tom'</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">age</span>: <span class="cm-number">1</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-variable">obj2</span> <span class="cm-operator">=</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">name</span>: <span class="cm-string">'Jake'</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">age</span>: <span class="cm-number">1</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">gender</span>: <span class="cm-number">1</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<p data-lake-id="d0366dc537b78414d041003d4341eae1" data-wording="true">
  对编译器而言，obj0，obj1，obj2 是三种不同的类型，此时 TurboFan 就无法针对这种情况做优化处理，只能执行 De-optimize 操作。这意味着执行效率的降低。因此，定义函数时，严格要求参数格式保持一致，在实践中是非常重要的优化策略，这也是 typescript 的作用之一。
</p>

<h2 data-lake-id="7caabaab604e8cc110a82d59f32ae774" data-wording="true">
  垃圾回收器 Orinoco
</h2>

<p data-lake-id="7caabaab604e8cc110a82d59f32ae774" data-wording="true">
  在[我们](https://www.w3cdoc.com)执行的 JavaScript 代码中，有大量的垃圾内存需要处理。甚至绝大多数内存占用都是垃圾。因此[我们](https://www.w3cdoc.com)必须有一个机制来管理这些垃圾内存，用于回收利用。这就是垃圾回收器 Orinoco。
</p>

<p data-lake-id="cc6858c9ccab89540fa870c57ecc0685" data-wording="true">
  垃圾回收器会定期的执行以下任务
</p>

<ul data-lake-id="ffe2e787bcbb2fc931653cf116b8474b">
  <li data-lake-id="0ce67fd31fd04a8d671601a649fc927d" data-wording="true">
    标记活动对象，和非活动对象「标记阶段」
  </li>
  <li data-lake-id="517fd0d253bdca05408403a2c581f2bb" data-wording="true">
    回收被非活动对象占用的内存空间「清除阶段」
  </li>
  <li data-lake-id="84795be2346a3eb9a00c05a7465b3855" data-wording="true">
    合并或者整理内存「整理阶段」
  </li>
</ul>

<p data-lake-id="fca33322a8df3d8fcec4f1ab8e7b5d3e" data-wording="true">
  v8 的 Compiler Pipeline 并非一开始就是使用的 Ignition + TurboFan 组合。也是在不断的迭代过程中演变而来。例如在他们之前，是 Full-codegen + Crankshaft，并且他们也共存过一段时间。
</p>

<p data-lake-id="df17c88fb93109be46db3b9438296f6f" data-wording="true">
  在官方文档中，提供了<a href="https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_389" target="_blank" rel="noopener noreferrer">一个 PPT</a>，[我们](https://www.w3cdoc.com)可以观察不同版本的演变过程。该 PPT 介绍了为何要使用新的编译组合。
</p>

<ul data-lake-id="cd45251ec347b7b935978b44c004ee7b">
  <li data-lake-id="9a218418f694c2228cb606d946600fe6" data-wording="true">
    减少了内存占用
  </li>
  <li data-lake-id="2afec33538df1d82468040385289cf60" data-wording="true">
    减少了启动时间
  </li>
  <li data-lake-id="7200d692a7b4ae51cdfe9367280258e6" data-wording="true">
    降低了复杂度
  </li>
</ul>

# 类型推断

<p id="VTxNOEc">
  <img loading="lazy" width="2310" height="712" class="alignnone size-full wp-image-6407 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/format,webp 2310w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_92/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_247/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_237/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_473/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb94713a7cb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_631/format,webp 2048w" sizes="(max-width: 2310px) 100vw, 2310px" />
</p>

上面讲到了档字节码编译器TurboFan无法确定优化代码编译时会触发代码去优化操作，变成低效率执行（每次执行都需要重新编译，而不能复用上次编译的记过）。其中一个重要原因是js弱类型语言导致的，那么编译器一般是怎么做类型推断的呢？见上图。

&nbsp;

# 对象访问优化机制

<p id="QmXTywr">
  <img loading="lazy" width="2160" height="598" class="alignnone size-full wp-image-6408 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/format,webp 2160w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_83/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_221/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_213/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_425/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5fb948db4380e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_567/format,webp 2048w" sizes="(max-width: 2160px) 100vw, 2160px" />
</p>

这里既然说到了[浏览器](https://www.w3cdoc.com)js虚拟机编译执行JS代码的过程，顺带说一下v8引擎的对象访问优化的机制，也是为了优化代码的执行效率。

精心打造全新课程，欢迎吐槽！反馈宝贵意见！

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

&nbsp;

# 参考：

<https://trac.webkit.org/wiki>

<https://36kr.com/p/1641716056065>

<https://trac.webkit.org/wiki/WebCoreRendering>

[https://docs.google.com/presentation/d/1chhN90uB8yPaIhx\_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289\_1_389][3]

[关于对象的访问优化][4]

&nbsp;

 [1]: https://www.f2e123.com/html5css3/6194.html
 [2]: https://www.f2e123.com/fed-regain/1867.html
 [3]: https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_389
 [4]: https://www.f2e123.com/javascriptnodejs/4676.html
