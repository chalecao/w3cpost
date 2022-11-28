---
title: CSS变量
weight: 10
---
这是一个令人激动的革新。

[CSS 变量][1]，顾名思义，也就是由网页的作者或用户定义的实体，用来指定文档中的特定变量。

更准确的说法，应该称之为 CSS 自定义属性 ，不过下文为了好理解都称之为 CSS 变量。

一直以来我们都知道，CSS 中是没有变量而言的，要使用 CSS 变量，只能借助 SASS 或者 LESS 这类预编译器。

但是新的草案发布之后，直接在 CSS 中定义和使用变量已经不再是幻想了，像下面这样，看个简单的例子：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_120917" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">// 声明一个变量：</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css spaces">  </code><code class="css plain">--bgColor:</code><code class="css value">#000</code><code class="css plain">;</code>
              </div>
              
              <div class="line number4 index3 alt1">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

> 这里我们借助了上篇文章 <a href="https://www.cnblogs.com/coco1s/p/6067305.html" target="_blank" rel="noopener"><code>结构性伪类</code></a> 中的 `:root{ }` 伪类，在全局 `:root{ }` 伪类中定义了一个 CSS 变量，取名为 `--bgColor` 。

定义完了之后则是使用，假设我要设置一个 div 的背景色为黑色：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_679478" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">.main{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css keyword">background</code><code class="css plain">:var(--bgColor);</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

这里，我们在需要使用之前定义变量的地方，通过 `var(定义的变量名)` 来调用。

[Demo戳我 &#8212; CSS 变量简单示例][2]。

## CSS 变量的层叠与作用域

CSS 变量是支持继承的，不过这里说成级联或者层叠应该更贴切。

> 在 CSS 中，一个元素的实际属性是由其自身属性以及其祖先元素的属性层叠得到的，CSS 变量也支持层叠的特性，当一个属性没有在当前元素定义，则会转而使用其祖先元素的属性。在当前元素定义的属性，将会覆盖祖先元素的同名属性。

其实也就是作用域，通俗一点就是局部变量会在作用范围内覆盖全局变量。

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_201" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--mainColor:</code><code class="css value">red</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number4 index3 alt1">
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="css plain">div{</code>
              </div>
              
              <div class="line number6 index5 alt1">
                <code class="css spaces">  </code><code class="css plain">--mainColor:</code><code class="css value">blue</code><code class="css plain">;</code>
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css spaces">  </code><code class="css keyword">color</code><code class="css plain">:var(--mainColor);</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

上面示例中最终生效的变量是 `--mainColor:blue`。

> 另外值得注意的是 CSS 变量并不支持 !important 声明。

## CSS 变量的组合

CSS 变量也可以进行组合使用。看看下面的例子：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_171820" class="syntaxhighlighter html">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>
          </td>

          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="html plain">&lt;</code><code class="html keyword">div</code><code class="html plain">&gt;&lt;/</code><code class="html keyword">div</code><code class="html plain">&gt;</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

CSS 如下：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_629463" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
            
            <div class="line number9 index8 alt2">
              9
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--word:</code><code class="css string">"this"</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css spaces">  </code><code class="css plain">--word-second:</code><code class="css string">"is"</code><code class="css plain">;</code>
              </div>
              
              <div class="line number4 index3 alt1">
                <code class="css spaces">  </code><code class="css plain">--word-third:</code><code class="css string">"CSS Variable"</code><code class="css plain">;</code>
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number6 index5 alt1">
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css plain">div::before{</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="css spaces">  </code><code class="css keyword">content</code><code class="css plain">:var(--word)</code><code class="css string">' '</code><code class="css plain">var(--word-second)</code><code class="css string">' '</code><code class="css plain">var(--word-third);</code>
              </div>
              
              <div class="line number9 index8 alt2">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

上面 div 的内容将会显示为this is CSS Variable。

[Demo戳我 &#8212; CSS变量的组合使用][3]

&nbsp;

## CSS 变量与计算属性 calc( )

更有趣的是，CSS 变量可以结合 CSS3 新增的函数 calc( ) 一起使用，考虑下面这个例子：

<div class="highlight highlight-text-html-basic">
  <div class="cnblogs_Highlighter sh-gutter">
    <div>
      <div id="highlighter_767470" class="syntaxhighlighter html">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="gutter">
              <div class="line number1 index0 alt2">
                1
              </div>
            </td>

            <td class="code">
              <div class="container">
                <div class="line number1 index0 alt2">
                  <code class="html plain">&lt;</code><code class="html keyword">div</code><code class="html plain">&gt; CSS Varialbe &lt;/</code><code class="html keyword">div</code><code class="html plain">&gt;</code>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>

CSS 如下：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_821431" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--</code><code class="css keyword">margin</code><code class="css plain">: </code><code class="css value">10px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number4 index3 alt1">
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="css plain">div{</code>
              </div>
              
              <div class="line number6 index5 alt1">
                <code class="css spaces">  </code><code class="css keyword">text-indent</code><code class="css plain">: calc(var(--margin)*</code><code class="css value">10</code><code class="css plain">)</code>
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

上面的例子，CSS 变量配合 calc 函数，得到的最终结果是 `text-indent:100px` 。

> calc( )也是一个处于实验中的功能，使用需要慎重。

[Demo戳我 &#8212; CSS 变量与 Calc 函数的组合][4]

&nbsp;

## CSS 变量的用途

CSS 变量的出现，到底解决了我们哪些实际生产中的问题？列举一些：

#### 1、代码更加符合 DRY（Don‘t repeat yourself）原则。

一个页面的配色，通常有几种主要颜色，同一个颜色值在多个地方用到。之前的 LESS、SASS预处理器的变量系统就是完成这个的，现在 CSS 变量也能轻松做到。

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_653211" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
            
            <div class="line number9 index8 alt2">
              9
            </div>
            
            <div class="line number10 index9 alt1">
              10
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--mainColor:</code><code class="css value">#fc0</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number4 index3 alt1">
                <code class="css plain">// 多个需要使用到的 --mainColor 的地方</code>
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="css plain">.div</code><code class="css value">1</code><code class="css plain">{</code>
              </div>
              
              <div class="line number6 index5 alt1">
                <code class="css spaces">  </code><code class="css keyword">color</code><code class="css plain">:var(--mainColor);</code>
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="css plain">.div</code><code class="css value">2</code><code class="css plain">{</code>
              </div>
              
              <div class="line number9 index8 alt2">
                <code class="css spaces">  </code><code class="css keyword">color</code><code class="css plain">:var(--mainColor);</code>
              </div>
              
              <div class="line number10 index9 alt1">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

#### 2、精简代码，减少冗余，响应式媒体查询的好帮手

一般而言，使用媒体查询的时候，我们需要将要响应式改变的属性全部重新罗列一遍。

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_492130" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
            
            <div class="line number9 index8 alt2">
              9
            </div>
            
            <div class="line number10 index9 alt1">
              10
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">.main {</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">    </code><code class="css keyword">width</code><code class="css plain">: </code><code class="css value">1000px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css spaces">    </code><code class="css keyword">margin-left</code><code class="css plain">: </code><code class="css value">100px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number4 index3 alt1">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="css plain">@media </code><code class="css value">screen</code> <code class="css plain">and (</code><code class="css keyword">min-width</code><code class="css plain">:</code><code class="css value">1480px</code><code class="css plain">) {</code>
              </div>
              
              <div class="line number6 index5 alt1">
                <code class="css spaces">    </code><code class="css plain">.main {</code>
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css spaces">        </code><code class="css keyword">width</code><code class="css plain">: </code><code class="css value">800px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="css spaces">        </code><code class="css keyword">margin-left</code><code class="css plain">: </code><code class="css value">50px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number9 index8 alt2">
                <code class="css spaces">    </code><code class="css plain">}</code>
              </div>
              
              <div class="line number10 index9 alt1">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

即便是 LESS 和 SASS 也无法做到更加简便，不过 CSS 变量的出现让媒体查询更加的简单：

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_811256" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
            
            <div class="line number9 index8 alt2">
              9
            </div>
            
            <div class="line number10 index9 alt1">
              10
            </div>
            
            <div class="line number11 index10 alt2">
              11
            </div>
            
            <div class="line number12 index11 alt1">
              12
            </div>
            
            <div class="line number13 index12 alt2">
              13
            </div>
            
            <div class="line number14 index13 alt1">
              14
            </div>
            
            <div class="line number15 index14 alt2">
              15
            </div>
            
            <div class="line number16 index15 alt1">
              16
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root {</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--mainWidth:</code><code class="css value">1000px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css spaces">  </code><code class="css plain">--leftMargin:</code><code class="css value">100px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number4 index3 alt1">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number5 index4 alt2">
              </div>
              
              <div class="line number6 index5 alt1">
                <code class="css plain">.main {</code>
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="css spaces">  </code><code class="css keyword">width</code><code class="css plain">: var(--mainWidth);</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="css spaces">  </code><code class="css keyword">margin-left</code><code class="css plain">: var(--leftMargin);</code>
              </div>
              
              <div class="line number9 index8 alt2">
                <code class="css plain">}</code>
              </div>
              
              <div class="line number10 index9 alt1">
              </div>
              
              <div class="line number11 index10 alt2">
                <code class="css plain">@media </code><code class="css value">screen</code> <code class="css plain">and (</code><code class="css keyword">min-width</code><code class="css plain">:</code><code class="css value">1480px</code><code class="css plain">) {</code>
              </div>
              
              <div class="line number12 index11 alt1">
                <code class="css spaces">    </code><code class="css plain">:root {</code>
              </div>
              
              <div class="line number13 index12 alt2">
                <code class="css spaces">      </code><code class="css plain">--mainWidth:</code><code class="css value">800px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number14 index13 alt1">
                <code class="css spaces">      </code><code class="css plain">--leftMargin:</code><code class="css value">50px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number15 index14 alt2">
                <code class="css spaces">    </code><code class="css plain">}</code>
              </div>
              
              <div class="line number16 index15 alt1">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

看上好像是代码多了，多了一层定义的环节，只是我这里示例的 CSS 改变的样式属性较少，当媒体查询的数量达到一定程度，使用 CSS 变量从代码量及美观程度而言都是更好的选择。

#### 3、方便的从 JS 中读/写，统一修改

CSS 变量也是可以和 JS 互相交互。

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_298204" class="syntaxhighlighter css">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="css plain">:root{</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="css spaces">  </code><code class="css plain">--testMargin:</code><code class="css value">75px</code><code class="css plain">;</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="css plain">}</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

<div class="cnblogs_Highlighter sh-gutter">
  <div>
    <div id="highlighter_773366" class="syntaxhighlighter javascript">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="gutter">
            <div class="line number1 index0 alt2">
              1
            </div>

            <div class="line number2 index1 alt1">
              2
            </div>
            
            <div class="line number3 index2 alt2">
              3
            </div>
            
            <div class="line number4 index3 alt1">
              4
            </div>
            
            <div class="line number5 index4 alt2">
              5
            </div>
            
            <div class="line number6 index5 alt1">
              6
            </div>
            
            <div class="line number7 index6 alt2">
              7
            </div>
            
            <div class="line number8 index7 alt1">
              8
            </div>
          </td>
          
          <td class="code">
            <div class="container">
              <div class="line number1 index0 alt2">
                <code class="javascript comments">//  读取</code>
              </div>
              
              <div class="line number2 index1 alt1">
                <code class="javascript keyword">var</code> <code class="javascript plain">root = getComputedStyle(document.documentElement);</code>
              </div>
              
              <div class="line number3 index2 alt2">
                <code class="javascript keyword">var</code> <code class="javascript plain">cssVariable = root.getPropertyValue(</code><code class="javascript string">'--testMargin'</code><code class="javascript plain">).trim();</code>
              </div>
              
              <div class="line number4 index3 alt1">
              </div>
              
              <div class="line number5 index4 alt2">
                <code class="javascript plain">console.log(cssVariable); </code><code class="javascript comments">// '75px'</code>
              </div>
              
              <div class="line number6 index5 alt1">
              </div>
              
              <div class="line number7 index6 alt2">
                <code class="javascript comments">// 写入</code>
              </div>
              
              <div class="line number8 index7 alt1">
                <code class="javascript plain">document.documentElement.style.setProperty(</code><code class="javascript string">'--testMargin'</code><code class="javascript plain">, </code><code class="javascript string">'100px'</code><code class="javascript plain">);</code>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

&nbsp;

## 与传统 LESS 、SASS 等预处理器变量比较

相较于传统的 LESS 、SASS 等预处理器变量，CSS 变量的优点在于:

  1. CSS 变量的动态性，能在页面运行时更改，而传统预处理器变量编译后无法更改
  2. CSS 变量能够继承，能够组合使用，具有作用域
  3. 配合 Javascript 使用，可以方便的从 JS 中读/写

&nbsp;

## Can I Use？

当然，上述示例正常显示的前提是你使用的浏览器已经支持了 CSS 变量：

<img loading="lazy" class="alignnone size-full wp-image-1451" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/10/608782-20161116103105123-1885440776.png" alt="" width="1264" height="472" />

当你看到这篇文章的时候，可能已经有了改观，可以戳进去看看 [CANIUSE][5] 。

### 参考文献：

<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables" target="_blank" rel="noopener">MDN&#8211;使用CSS变量</a>

<p class="ContentHeader-articleTitle entry-title">
  <a href="https://philipwalton.com/articles/why-im-excited-about-native-css-variables/" target="_blank" rel="noopener">Why I&#8217;m Excited About Native CSS Variables</a>
</p>

 [1]: https://drafts.csswg.org/css-variables/
 [2]: https://codepen.io/Chokcoco/pen/NbrWRE
 [3]: https://codepen.io/Chokcoco/pen/mOEQJm
 [4]: https://codepen.io/Chokcoco/pen/MbezbR
 [5]: https://caniuse.com/#search=css%20var
