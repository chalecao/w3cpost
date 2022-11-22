---
title: JavaScript函数式编程

---
<span style="color: #808080;">转载，原文：https://zhuanlan.zhihu.com/p/21714695</span>

一、引言

说到函数式编程，大家可能第一印象都是学院派的那些晦涩难懂的代码，充满了一大堆抽象的不知所云的符号，似乎只有大学里的计算机教授才会使用这些东西。在曾经的某个时代可能确实如此，但是近年来随着技术的发展，函数式编程已经在实际生产中发挥巨大的作用了，越来越多的语言开始加入闭包，匿名函数等非常典型的函数式编程的特性，从某种程度上来讲，函数式编程正在逐步“同化”命令式编程。

JavaScript 作为一种典型的多范式编程语言，这两年随着React的火热，函数式编程的概念也开始流行起来，RxJS、cycleJS、lodashJS、underscoreJS等多种开源库都使用了函数式的特性。所以下面介绍一些函数式编程的知识和概念。

## 二、纯函数

如果你还记得一些初中的数学知识的话，函数 **f** 的概念就是，对于输入 **x** 产生一个输出 **y = f(x)**。这便是一种最简单的纯函数。**纯函数的定义是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。**

下面来举个栗子，比如在Javascript中对于数组的操作，有些是纯的，有些就不是纯的：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">arr&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mi">1&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">4&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">5&lt;/span>&lt;span class="p">];&lt;/span>

&lt;span class="c1">// Array.slice是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的&lt;/span>
&lt;span class="c1">// 可以，这很函数式&lt;/span>
&lt;span class="nx">xs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">slice&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; [1,2,3]&lt;/span>
&lt;span class="nx">xs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">slice&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; [1,2,3]&lt;/span>

&lt;span class="c1">// Array.splice是不纯的，它有副作用，对于固定的输入，输出不是固定的&lt;/span>
&lt;span class="c1">// 这不函数式&lt;/span>
&lt;span class="nx">xs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">splice&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; [1,2,3]&lt;/span>
&lt;span class="nx">xs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">splice&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; [4,5]&lt;/span>
&lt;span class="nx">xs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">splice&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; []&lt;/span>
</code>&lt;/code></pre>
</div>

在函数式编程中，我们想要的是 **slice**这样的纯函数，而不是 **splice**这种每次调用后都会把数据弄得一团乱的函数。

为什么函数式编程会排斥不纯的函数呢？下面再看一个例子：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">//不纯的&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">min&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="mi">18&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">checkage&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">age&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">age&lt;/span> &lt;span class="o">&gt;&lt;/span> &lt;span class="nx">min&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="c1">//纯的，这很函数式&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">checkage&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">age&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">age&lt;/span> &lt;span class="o">&gt;&lt;/span> &lt;span class="mi">18&lt;/span>&lt;span class="p">;&lt;/span>
</code>&lt;/code></pre>
</div>

在不纯的版本中，**checkage**这个函数的行为不仅取决于输入的参数 age，还取决于一个外部的变量 **min**，换句话说，这个函数的行为需要由外部的系统环境决定。对于大型系统来说，这种对于外部状态的依赖是造成系统复杂性大大提高的主要原因。

可以注意到，纯的 **checkage**把关键数字 18 硬编码在函数内部，扩展性比较差，我们可以在后面的**柯里化**中看到如何用优雅的函数式解决这种问题。

纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kr">import&lt;/span> &lt;span class="nx">_&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">sin&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">memorize&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nb">Math&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">sin&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">));&lt;/span>

&lt;span class="c1">//第一次计算的时候会稍慢一点&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">a&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">sin&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">1&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">//第二次有了缓存，速度极快&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">b&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">sin&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">1&lt;/span>&lt;span class="p">);&lt;/span>
</code>&lt;/code></pre>
</div>

&nbsp;

## 三、函数的柯里化

函数柯里化（curry）的定义很简单：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

比如对于加法函数 **var add = (x, y) =>　x + y** ，我们可以这样进行柯里化：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">//比较容易读懂的ES5写法&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">){&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">y&lt;/span>&lt;span class="p">){&lt;/span>
        &lt;span class="k">return&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="nx">y&lt;/span>
    &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">//ES6写法，也是比较正统的函数式写法&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">y&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">//试试看&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add2&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add200&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">200&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">add2&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">);&lt;/span> &lt;span class="c1">// =&gt;4&lt;/span>
&lt;span class="nx">add200&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">50&lt;/span>&lt;span class="p">);&lt;/span> &lt;span class="c1">// =&gt;250&lt;/span>
</code>&lt;/code></pre>
</div>

对于加法这种极其简单的函数来说，柯里化并没有什么大用处。

还记得上面那个 **checkage**的函数吗？我们可以这样柯里化它：

<div class="highlight">
  <pre><code>&lt;code class="language-text">var checkage = min =&gt; (age =&gt; age &gt; min);
var checkage18 = checkage(18);
checkage18(20);
// =&gt;true
</code>&lt;/code></pre>
</div>

**事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法：**

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span> &lt;span class="nx">curry&lt;/span> &lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="c1">//首先柯里化两个纯函数&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">match&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">reg&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">match&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">reg&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">filter&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">filter&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">));&lt;/span>

&lt;span class="c1">//判断字符串里有没有空格&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">haveSpace&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">match&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="sr">/\s+/g&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">haveSpace&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"ffffffff"&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt;null&lt;/span>

&lt;span class="nx">haveSpace&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"a b"&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt;[" "]&lt;/span>

&lt;span class="nx">filter&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">haveSpace&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="s2">"abcdefg"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="s2">"Hello World"&lt;/span>&lt;span class="p">]);&lt;/span>
&lt;span class="c1">//=&gt;["Hello world"]&lt;/span>
</code>&lt;/code></pre>
</div>

&nbsp;

## 四、函数组合

学会了使用纯函数以及如何把它柯里化之后，我们会很容易写出这样的“包菜式”代码：

<div class="highlight">
  <pre><code>&lt;code class="language-text">h(g(f(x)));
</code>&lt;/code></pre>
</div>

虽然这也是函数式的代码，但它依然存在某种意义上的“不优雅”。为了解决函数嵌套的问题，我们需要用到“函数组合”：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">//两个函数的组合&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">compose&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">g&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
        &lt;span class="k">return&lt;/span> &lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">g&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">));&lt;/span>
    &lt;span class="p">};&lt;/span>
&lt;span class="p">};&lt;/span>

&lt;span class="c1">//或者&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">compose&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">g&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">g&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)));&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">add1&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="mi">1&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">mul5&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">*&lt;/span> &lt;span class="mi">5&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">mul5&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">add1&lt;/span>&lt;span class="p">)(&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// =&gt;15 &lt;/span>
</code>&lt;/code></pre>
</div>

我们定义的compose就像双面胶一样，可以把任何两个纯函数结合到一起。当然你也可以扩展出组合三个函数的“三面胶”，甚至“四面胶”“N面胶”。

这种灵活的组合可以让我们像拼积木一样来组合函数式的代码：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">first&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">arr&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">];&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">reverse&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">arr&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">reverse&lt;/span>&lt;span class="p">();&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">last&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">first&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">reverse&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">last&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mi">1&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">4&lt;/span>&lt;span class="p">,&lt;/span>&lt;span class="mi">5&lt;/span>&lt;span class="p">]);&lt;/span>
&lt;span class="c1">// =&gt;5&lt;/span>
</code>&lt;/code></pre>
</div>

&nbsp;

## 五、Point Free

有了柯里化和函数组合的基础知识，下面介绍一下Point Free这种代码风格。

细心的话你可能会注意到，之前的代码中我们总是喜欢把一些对象自带的方法转化成纯函数：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">toUpperCase&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">word&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">word&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">toUpperCase&lt;/span>&lt;span class="p">();&lt;/span>
</code>&lt;/code></pre>
</div>

这种做法是有原因的。

Point Free这种模式现在还暂且没有中文的翻译，有兴趣的话可以看看这里的英文解释：

<a class=" external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Tacit_programming" target="_blank" rel="nofollow noreferrer noopener"><span class="invisible">https://</span><span class="visible">en.wikipedia.org/wiki/T</span><span class="invisible">acit_programming</span><i class="icon-external"></i></a>

用中文解释的话大概就是，不要命名转瞬即逝的中间变量，比如：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">//这不Piont free&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">f&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">str&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">toUpperCase&lt;/span>&lt;span class="p">().&lt;/span>&lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">' '&lt;/span>&lt;span class="p">);&lt;/span>
</code>&lt;/code></pre>
</div>

这个函数中，我们使用了 str 作为我们的中间变量，但这个中间变量除了让代码变得长了一点以外是毫无意义的。下面改造一下这段代码：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">toUpperCase&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">word&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">word&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">toUpperCase&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">split&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">str&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">));&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">f&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">' '&lt;/span>&lt;span class="p">),&lt;/span> &lt;span class="nx">toUpperCase&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"abcd efgh"&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// =&gt;["ABCD", "EFGH"]&lt;/span>
</code>&lt;/code></pre>
</div>

这种风格能够帮助我们减少不必要的命名，让代码保持简洁和通用。当然，为了在一些函数中写出Point Free的风格，在代码的其它地方必然是不那么Point Free的，这个地方需要自己取舍。

## 六、声明式与命令式代码

命令式代码的意思就是，我们通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。

而声明式就要优雅很多了，我们通过写表达式的方式来声明我们想干什么，而不是通过一步一步的指示。

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">//命令式&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">CEOs&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">[];&lt;/span>
&lt;span class="k">for&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kd">var&lt;/span> &lt;span class="nx">i&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="mi">0&lt;/span>&lt;span class="p">;&lt;/span> &lt;span class="nx">i&lt;/span> &lt;span class="o">&lt;&lt;/span> &lt;span class="nx">companies&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">length&lt;/span>&lt;span class="p">;&lt;/span> &lt;span class="nx">i&lt;/span>&lt;span class="o">++&lt;/span>&lt;span class="p">){&lt;/span>
    &lt;span class="nx">CEOs&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">push&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">companies&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="nx">i&lt;/span>&lt;span class="p">].&lt;/span>&lt;span class="nx">CEO&lt;/span>&lt;span class="p">)&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">//声明式&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">CEOs&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">companies&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">c&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">c&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">CEO&lt;/span>&lt;span class="p">);&lt;/span>
</code>&lt;/code></pre>
</div>

命令式的写法要先实例化一个数组，然后再对 companies 数组进行for循环遍历，手动命名、判断、增加计数器，就好像你开了一辆零件全部暴露在外的汽车一样，虽然很机械朋克风，但这并不是优雅的程序员应该做的。

声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。它指明的是做什么，而不是怎么做。除了更加清晰和简洁之外，map 函数还可以进一步独立优化，甚至用解释器内置的速度极快的 map 函数，这么一来我们主要的业务代码就无须改动了。

函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，我们完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。

相反，不纯的不函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。

## 七、尾声

任何代码都是要有实际用处才有意义，对于JS来说也是如此。然而现实的编程世界显然不如范例中的函数式世界那么美好，实际应用中的JS是要接触到ajax、DOM操作，NodeJS环境中读写文件、网络操作这些对于外部环境强依赖，有明显副作用的“很脏”的工作。

这对于函数式编程来说也是很大的挑战，所以我们也需要更强大的技术去解决这些“脏问题”。我会在下一篇文章中介绍函数式编程的更加高阶一些的知识，例如Functor、Monad等等概念。

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-下篇&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

所谓的纯函数就是，**对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态**（我偷懒复制过来的）。

但是实际的编程中，特别是前端的编程范畴里，“不依赖外部环境”这个条件是根本不可能的，我们总是不可避免地接触到 DOM、AJAX 这些状态随时都在变化的东西。所以我们需要用更强大的技术来干这些脏活。

&nbsp;

## 一、容器、Functor

如果你熟悉 jQuery 的话，应该还记得，**$(&#8230;)** 返回的对象并不是一个原生的 DOM 对象，而是对于原生对象的一种封装：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">foo&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">$&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'#foo'&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="nx">foo&lt;/span> &lt;span class="o">==&lt;/span> &lt;span class="nb">document&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">getElementById&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'foo'&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; false&lt;/span>

&lt;span class="nx">foo&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">]&lt;/span> &lt;span class="o">==&lt;/span> &lt;span class="nb">document&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">getElementById&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'foo'&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; true&lt;/span>
</code>&lt;/code></pre>
</div>

这在某种意义上就是一个“容器”（但它并不函数式）。

接下类我们会看到，容器为函数式编程里普通的变量、对象、函数提供了一层极其强大的外衣，赋予了它们一些很惊艳的特性，就好像 Tony Stark 的钢铁外衣，Dva 的机甲，明日香的2号机一样。

下面我们就来写一个最简单的容器吧：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">Container&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">Container&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">//试试看&lt;/span>
&lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">1&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; Container(1)&lt;/span>

&lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'abcd'&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; Container('abcd')&lt;/span>
</code>&lt;/code></pre>
</div>

我们调用 **Container.of** 把东西装进容器里之后，由于这一层外壳的阻挡，普通的函数就对他们不再起作用了，所以我们需要加一个接口来让外部的函数也能作用到容器里面的值：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">){&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span>&lt;span class="p">))&lt;/span>
&lt;span class="p">}&lt;/span>
</code>&lt;/code></pre>
</div>

我们可以这样使用它：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="nx">Container&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">)&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="mi">1&lt;/span>&lt;span class="p">)&lt;/span>                &lt;span class="c1">//=&gt; Container(4)&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="s1">'Result is '&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>    &lt;span class="c1">//=&gt; Container('Result is 4')&lt;/span>
</code>&lt;/code></pre>
</div>

没错！我们仅花了 7 行代码就实现了很炫的『**链式调用』**，这也是我们的第一个 **Functor**。

**Functor（函子）是实现了 map 并遵守一些特定规则的容器类型。**

也就是说，如果我们要将普通函数应用到一个被容器包裹的值，那么我们首先需要定义一个叫 **Functor** 的数据类型，在这个数据类型中需要定义如何使用 **map** 来应用这个普通函数。

把东西装进一个容器，只留出一个接口 **map** 给容器外的函数，这么做有什么好处呢？

本质上，**Functor** 是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。当 **map** 一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数，以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性。

举个例子，我们现在为 **map** 函数添加一个检查空值的特性，这个新的容器我们称之为 **Maybe**（原型来自于Haskell）：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">Maybe&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">Maybe&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">isNothing&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="o">?&lt;/span> &lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kc">null&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">:&lt;/span> &lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">isNothing&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">===&lt;/span> &lt;span class="kc">null&lt;/span> &lt;span class="o">||&lt;/span> &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">===&lt;/span> &lt;span class="kc">undefined&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">//试试看&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="nx">_&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">name&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s2">"Stark"&lt;/span>&lt;span class="p">})&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prop&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"age"&lt;/span>&lt;span class="p">))&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">10&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">//=&gt; Maybe(null)&lt;/span>

&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">name&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s2">"Stark"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">age&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="mi">21&lt;/span>&lt;span class="p">})&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prop&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"age"&lt;/span>&lt;span class="p">))&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">10&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">//=&gt; Maybe(31)&lt;/span>
</code>&lt;/code></pre>
</div>

看了这些代码，觉得链式调用总是要输入一堆 **.map(&#8230;)** 很烦对吧？这个问题很好解决，还记得我们上一篇文章里介绍的**柯里化**吗？

有了柯里化这个强大的工具，我们可以这样写：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kr">import&lt;/span> &lt;span class="nx">_&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">compose&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">flowRight&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">add&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">// 创造一个柯里化的 map&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">functor&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">functor&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">));&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">doEverything&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">10&lt;/span>&lt;span class="p">),&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">property&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"age"&lt;/span>&lt;span class="p">)));&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">functor&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">name&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s2">"Stark"&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">age&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="mi">21&lt;/span>&lt;span class="p">});&lt;/span>
&lt;span class="nx">doEverything&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">functor&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; Maybe(31)&lt;/span>
</code>&lt;/code></pre>
</div>

&nbsp;

## 二、错误处理、Either

现在我们的容器能做的事情太少了，它甚至连做简单的错误处理都做不到，现在我们只能类似这样处理错误：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="k">try&lt;/span>&lt;span class="p">{&lt;/span>
    &lt;span class="nx">doSomething&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="p">}&lt;/span>&lt;span class="k">catch&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">e&lt;/span>&lt;span class="p">){&lt;/span>
    &lt;span class="c1">// 错误处理&lt;/span>
&lt;span class="p">}&lt;/span>
</code>&lt;/code></pre>
</div>

**try/catch/throw** 并不是“纯”的，因为它从外部接管了我们的函数，并且在这个函数出错时抛弃了它的返回值。这不是我们期望的函数式的行为。

如果你对 **Promise** 熟悉的话应该还记得，**Promise** 是可以调用 **catch** 来集中处理错误的：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="nx">doSomething&lt;/span>&lt;span class="p">()&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">then&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">async1&lt;/span>&lt;span class="p">)&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="nx">then&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">async2&lt;/span>&lt;span class="p">)&lt;/span>
    &lt;span class="p">.&lt;/span>&lt;span class="k">catch&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">e&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">console&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">log&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">e&lt;/span>&lt;span class="p">));&lt;/span>
</code>&lt;/code></pre>
</div>

对于函数式编程我们也可以做同样的操作，如果运行正确，那么就返回正确的结果；如果错误，就返回一个用于描述错误的结果。这个概念在 Haskell 中称之为 **Either** 类，**Left** 和 **Right** 是它的两个子类。我们用 JS 来实现一下：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="c1">// 这里是一样的=。=&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">Left&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">Right&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">// 这里也是一样的=。=&lt;/span>
&lt;span class="nx">Left&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">Left&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="nx">Right&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">Right&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">// 这里不同！！！&lt;/span>
&lt;span class="nx">Left&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="k">this&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="nx">Right&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="nx">Right&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="p">}&lt;/span>
</code>&lt;/code></pre>
</div>

下面来看看 **Left** 和 **Right** 的区别吧：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="nx">Right&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"Hello"&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">str&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="s2">" World!"&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// Right("Hello World!")&lt;/span>

&lt;span class="nx">Left&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"Hello"&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">str&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="s2">" World!"&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// Left("Hello")&lt;/span>
</code>&lt;/code></pre>
</div>

**Left** 和 **Right** 唯一的区别就在于 **map** 方法的实现，**Right.map** 的行为和我们之前提到的 **map** 函数一样。但是 **Left.map** 就很不同了：**它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，Left 可以用来传递一个错误消息。**

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">getAge&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">user&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">user&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">age&lt;/span> &lt;span class="o">?&lt;/span> &lt;span class="nx">Right&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">user&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">age&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">:&lt;/span> &lt;span class="nx">Left&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"ERROR!"&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">//试试&lt;/span>
&lt;span class="nx">getAge&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">name&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s1">'stark'&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">age&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s1">'21'&lt;/span>&lt;span class="p">}).&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">age&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="s1">'Age is '&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="nx">age&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; Right('Age is 21')&lt;/span>

&lt;span class="nx">getAge&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">name&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s1">'stark'&lt;/span>&lt;span class="p">}).&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">age&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="s1">'Age is '&lt;/span> &lt;span class="o">+&lt;/span> &lt;span class="nx">age&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">//=&gt; Left('ERROR!')&lt;/span>
</code>&lt;/code></pre>
</div>

是的，**Left** 可以让调用链中任意一环的错误立刻返回到调用链的尾部，这给我们错误处理带来了很大的方便，再也不用一层又一层的 **try/catch**。

**Left** 和 **Right** 是 **Either** 类的两个子类，事实上 Either 并不只是用来做错误处理的，它表示了逻辑或，范畴学里的 **coproduct**。但这些超出了我们的讨论范围。

&nbsp;

## 三、IO

下面我们的程序要走出象牙塔，去接触外面“肮脏”的世界了，在这个世界里，很多事情都是有副作用的或者依赖于外部环境的，比如下面这样：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">function&lt;/span> &lt;span class="nx">readLocalStorage&lt;/span>&lt;span class="p">(){&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="nb">window&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">localStorage&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>
</code>&lt;/code></pre>
</div>

这个函数显然不是纯函数，因为它强依赖外部的 **window.localStorage** 这个对象，它的返回值会随着环境的变化而变化。为了让它“纯”起来，我们可以把它包裹在一个函数内部，延迟执行它：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">function&lt;/span> &lt;span class="nx">readLocalStorage&lt;/span>&lt;span class="p">(){&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(){&lt;/span>
        &lt;span class="k">return&lt;/span> &lt;span class="nb">window&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">localStorage&lt;/span>&lt;span class="p">;&lt;/span>
    &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>
</code>&lt;/code></pre>
</div>

这样 **readLocalStorage** 就变成了一个真正的纯函数！ OvO为机智的程序员鼓掌！

额……好吧……好像确实没什么卵用……我们只是（像大多数拖延症晚期患者那样）把讨厌做的事情暂时搁置了而已。为了能彻底解决这些讨厌的事情，我们需要一个叫 **IO** 的新的 **Functor**：

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kr">import&lt;/span> &lt;span class="nx">_&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">compose&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">flowRight&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">IO&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">f&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="nx">IO&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">IO&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">IO&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">prototype&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">IO&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="k">this&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">__value&lt;/span>&lt;span class="p">))&lt;/span>
&lt;span class="p">};&lt;/span>
</code>&lt;/code></pre>
</div>

**IO** 跟前面那几个 **Functor** 不同的地方在于，它的 __value 是一个函数。它把不纯的操作（比如 IO、网络请求、DOM）包裹到一个函数内，从而延迟这个操作的执行。所以我们认为，**IO 包含的是被包裹的操作的返回值**。

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kd">var&lt;/span> &lt;span class="nx">io_document&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">IO&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nb">window&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nb">document&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="nx">io_document&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kd">function&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">doc&lt;/span>&lt;span class="p">){&lt;/span> &lt;span class="k">return&lt;/span> &lt;span class="nx">doc&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">title&lt;/span> &lt;span class="p">});&lt;/span>
&lt;span class="c1">//=&gt; IO(document.title)&lt;/span>
</code>&lt;/code></pre>
</div>

注意我们这里虽然感觉上返回了一个实际的值 **IO(document.title)**，但事实上只是一个对象：**{ __value: [Function] }**，它并没有执行，而是简单地把我们想要的操作存了起来，只有当我们在真的需要这个值得时候，**IO** 才会真的开始求值，这个特性我们称之为『**惰性求值』**。（培提尔其乌斯：“这是怠惰啊！”）

是的，我们依然需要某种方法让 **IO** 开始求值，并且把它返回给我们。它可能因为 **map** 的调用链积累了很多很多不纯的操作，一旦开始求值，就可能会把本来很干净的程序给“弄脏”。但是去直接执行这些“脏”操作不同，我们把这些不纯的操作带来的复杂性和不可维护性推到了 **IO** 的调用者身上（嗯就是这么不负责任）。

下面我们来做稍微复杂点的事情，编写一个函数，从当前 url 中解析出对应的参数。

<div class="highlight">
  <pre><code>&lt;code class="language-js">&lt;span class="kr">import&lt;/span> &lt;span class="nx">_&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'lodash'&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="c1">// 先来几个基础函数：&lt;/span>
&lt;span class="c1">// 字符串&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">split&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="kr">char&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">str&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kr">char&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">// 数组&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">first&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">arr&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">];&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">last&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">arr&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="nx">arr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">length&lt;/span> &lt;span class="o">-&lt;/span> &lt;span class="mi">1&lt;/span>&lt;span class="p">];&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">filter&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">arr&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">filter&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">//注意这里的 x 既可以是数组，也可以是 functor&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">map&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">// 判断&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">eq&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">curry&lt;/span>&lt;span class="p">((&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">==&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// 结合&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">compose&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">_&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">flowRight&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">toPairs&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'='&lt;/span>&lt;span class="p">)),&lt;/span> &lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'&'&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">// toPairs('a=1&b=2')&lt;/span>
&lt;span class="c1">//=&gt; [['a', '1'], ['b', '2']]&lt;/span>

&lt;span class="kd">var&lt;/span> &lt;span class="nx">params&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">toPairs&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">last&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">split&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'?'&lt;/span>&lt;span class="p">));&lt;/span>
&lt;span class="c1">// params('https://xxx.com?a=1&b=2')&lt;/span>
&lt;span class="c1">//=&gt; [['a', '1'], ['b', '2']]&lt;/span>

&lt;span class="c1">// 这里会有些难懂=。= 慢慢看&lt;/span>
&lt;span class="c1">// 1.首先，getParam是一个接受IO(url)，返回一个新的接受 key 的函数；&lt;/span>
&lt;span class="c1">// 2.我们先对 url 调用 params 函数，得到类似[['a', '1'], ['b', '2']]&lt;/span>
&lt;span class="c1">//   这样的数组；&lt;/span>
&lt;span class="c1">// 3.然后调用 filter(compose(eq(key), first))，这是一个过滤器，过滤的&lt;/span>
&lt;span class="c1">//   条件是 compose(eq(key), first) 为真，它的意思就是只留下首项为 key&lt;/span>
&lt;span class="c1">//   的数组；&lt;/span>
&lt;span class="c1">// 4.最后调用 Maybe.of，把它包装起来。&lt;/span>
&lt;span class="c1">// 5.这一系列的调用是针对 IO 的，所以我们用 map 把这些调用封装起来。&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">getParam&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">url&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">key&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">Maybe&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="k">of&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">filter&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">compose&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">eq&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">key&lt;/span>&lt;span class="p">),&lt;/span> &lt;span class="nx">first&lt;/span>&lt;span class="p">)),&lt;/span> &lt;span class="nx">params&lt;/span>&lt;span class="p">))(&lt;/span>&lt;span class="nx">url&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">// 创建充满了洪荒之力的 IO！！！&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">url&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="k">new&lt;/span> &lt;span class="nx">IO&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">_&lt;/span> &lt;span class="o">=&gt;&lt;/span> &lt;span class="nb">window&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">location&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">href&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="c1">// 最终的调用函数！！！&lt;/span>
&lt;span class="kd">var&lt;/span> &lt;span class="nx">findParam&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">getParam&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">url&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">// 上面的代码都是很干净的纯函数，下面我们来对它求值，求值的过程是非纯的。&lt;/span>
&lt;span class="c1">// 假设现在的 url 是 https://xxx.com?a=1&b=2&lt;/span>
&lt;span class="c1">// 调用 __value() 来运行它！&lt;/span>
&lt;span class="nx">findParam&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s2">"a"&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">__value&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">//=&gt; Maybe(['a', '1'])&lt;/span>
</code>&lt;/code></pre>
</div>

&nbsp;

## 四、总结

如果你还能坚持看到这里的话，不管看没看懂，已经是勇士了。在这篇文章里，我们先后提到了 **Maybe**、**Either**、**IO** 这三种强大的 **Functor**，在链式调用、惰性求值、错误捕获、输入输出中都发挥着巨大的作用。事实上 **Functor** 远不止这三种，但由于篇幅的问题就不再继续介绍了（哼才不告诉你其实是因为我还没看懂其它 **Functor** 的原理）

但依然有问题困扰着我们：

1. 如何处理嵌套的 **Functor** 呢？（比如 **Maybe(IO(42))**）

2. 如何处理一个由非纯的或者异步的操作序列呢？

在这个充满了容器和 **Functor** 的世界里，我们手上的工具还不够多，函数式编程的学习还远远没有结束，
