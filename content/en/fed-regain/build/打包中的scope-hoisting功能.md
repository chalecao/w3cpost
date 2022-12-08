---
title: 打包中的Scope Hoisting功能

---
不久前，Webpack 正式发布了它的第三个版本，这个版本提供了一个新的功能：Scope Hoisting，又译作“作用域提升”。只需在配置文件中添加一个新的插件，就可以让 Webpack 打包出来的代码文件更小、运行的更快：

<div class="highlight">
  <pre><code class="language-js"><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="p">{</span>
  <span class="nx">plugins</span><span class="o">:</span> <span class="p">[</span>
    <span class="k">new</span> <span class="nx">webpack</span><span class="p">.</span><span class="nx">optimize</span><span class="p">.</span><span class="nx">ModuleConcatenationPlugin</span><span class="p">()</span>
  <span class="p">]</span>
<span class="p">}</span>
</code></pre>
</div>

这篇文章将会从多个方面详细介绍这项新功能，在这之前，[我们](https://www.w3cdoc.com)先来看看 Webpack 是如何将多个模块打包在一起的。

## Webpack 默认的模块打包方式

现在假设[我们](https://www.w3cdoc.com)的项目有这样两个文件：

<div class="highlight">
  <pre><code class="language-js"><span class="c1">// module-a.js
</span><span class="k">export</span> <span class="k">default</span> <span class="s1">'module A'</span>
<span class="c1">// entry.js
</span><span class="k">import</span> <span class="nx">a</span> <span class="nx">from</span> <span class="s1">'./module-a'</span>
<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">a</span><span class="p">)</span>
</code></pre>
</div>

现在[我们](https://www.w3cdoc.com)用 Webpack 打包一下，得到的文件大致像这样：

<div class="highlight">
  <pre><code class="language-js"><span class="c1">// bundle.js
</span><span class="c1">// 最前面的一段代码实现了模块的加载、执行和缓存的逻辑，这里直接略过
</span><span class="p">[</span>
  <span class="cm">/*0*/</span>
  <span class="kd">function</span> <span class="p">(</span><span class="nx">module</span><span class="p">,</span> <span class="nx">exports</span><span class="p">,</span> <span class="nx">require</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">module_a</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">module_a</span><span class="p">[</span><span class="s1">'default'</span><span class="p">])</span>
  <span class="p">},</span>
  <span class="cm">/*1*/</span>
  <span class="kd">function</span> <span class="p">(</span><span class="nx">module</span><span class="p">,</span> <span class="nx">exports</span><span class="p">,</span> <span class="nx">require</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">exports</span><span class="p">[</span><span class="s1">'default'</span><span class="p">]</span> <span class="o">=</span> <span class="s1">'module A'</span>
  <span class="p">}</span>
<span class="p">]</span>
</code></pre>
</div>

更深入的分析可以看这篇文章：<a class="internal" href="https://zhuanlan.zhihu.com/p/25954788" data-za-detail-view-id="1043">从 Bundle 文件看 Webpack 模块机制</a>。

简单来说，Webpack 将所有模块都用函数包裹起来，然后自己实现了一套模块加载、执行与缓存的功能，使用这样的结构是为了更容易实现 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/guides/code-splitting/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Code Splitting</a>（包括<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/guides/code-splitting/%23dynamic-imports" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">按需加载</a>）、<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/concepts/hot-module-replacement/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">模块热替换</a>等功能。

但如果你在 Webpack 3 中添加了 ModuleConcatenationPlugin 插件，这个结构会发生一些变化。

## 作用域提升后的 bundle.js

同样的源文件在使用了 ModuleConcatenationPlugin 之后，打包出来的文件会变成下面这样：

<div class="highlight">
  <pre><code class="language-js"><span class="c1">// bundle.js
</span><span class="p">[</span>
  <span class="kd">function</span> <span class="p">(</span><span class="nx">module</span><span class="p">,</span> <span class="nx">exports</span><span class="p">,</span> <span class="nx">require</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// CONCATENATED MODULE: ./module-a.js
</span>    <span class="kd">var</span> <span class="nx">module_a_defaultExport</span> <span class="o">=</span> <span class="s1">'module A'</span>

    <span class="c1">// CONCATENATED MODULE: ./index.js
</span>    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">module_a_defaultExport</span><span class="p">)</span>
  <span class="p">}</span>
<span class="p">]</span>
</code></pre>
</div>

显而易见，这次 Webpack 将所有模块都放在了一个函数里，直观感受就是——**函数声明少了很多**，因此而带来的好处有：

  1. 文件体积比之前更小。
  2. 运行代码时创建的函数作用域也比之前少了，开销也随之变小。

项目中的模块越多，上述的两点提升就会越明显。

## 它是如何实现的？

这个功能的原理很简单：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突。

但到目前为止（Webpack 3.3.0），为了在 Webpack 中使用这个功能，你的代码必须是用 ES2015 的模块语法写的。

暂不支持 CommonJS 模块语法的原因是，这种模块语法中的模块是可以动态加载的，例如下面这段代码：

<div class="highlight">
  <pre><code class="language-js"><span class="kd">var</span> <span class="nx">directory</span> <span class="o">=</span> <span class="s1">'./modules/'</span>
<span class="k">if</span> <span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">random</span><span class="p">()</span> <span class="o">></span> <span class="mf">0.5</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="nx">directory</span> <span class="o">+</span> <span class="s1">'foo.js'</span><span class="p">)</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="nx">directory</span> <span class="o">+</span> <span class="s1">'bar.js'</span><span class="p">)</span>
<span class="p">}</span>
</code></pre>
</div>

这种情况很难分析出模块之间的依赖关系及输出的变量。

而 ES2015 的模块语法规定 import 和 export 关键字必须在顶层、模块路径只能用字符串字面量，这种“强制静态化”的做法使代码在编译时就能确定模块的依赖关系，以及输入和输出的变量，所以这种功能实现起来会更加简便。

不过，未来 Webpack 可能也会支持 CommonJS 的模块语法。

## 等等，为什么在我的项目中不起作用？

一些同学可能已经在自己的项目中加上了 ModuleConcatenationPlugin，但却发现打包出来的代码完全没有发生变化。

前面说过，要使用 Scope Hoisting，你的代码必须是用 ES2015 的模块语法写的，但是**大部分 NPM 中的模块仍然是 CommonJS 语法**（例如 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//lodash.com/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">lodash</a>），所以导致 Webpack 回退到了默认的打包方式。

其他可能的原因还有：

* 使用了 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/plugins/provide-plugin/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">ProvidePlugin</a>
* 使用了 _eval()_ 函数
* 你的项目有多个 entry

运行 Webpack 时加上 _&#8211;display-optimization-bailout_ 参数可以得知为什么你的项目无法使用 Scope Hoisting：

<div class="highlight">
  <pre><code class="language-text">webpack --display-optimization-bailout</code></pre>
</div>

另外，当你使用这个插件的时候，<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/concepts/hot-module-replacement/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">模块热替换</a>将不起作用，所以最好只在代码优化的时候才使用这个插件。

## 最后，给 Rollup 打个广告

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//webpack.js.org/guides/tree-shaking/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Tree Shaking</a> 与 Scope Hoisting 最初都是由 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//rollupjs.org/" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Rollup</a> 实现的。尽管 Webpack 现在也实现了这两个功能，但是 Rollup 比 Webpack 更适合打包 JavaScript 框架（库），因为：

* Rollup 的配置比 Webpack 简单得多。
* Rollup 不用支持 Code Spliting，所以打包出来的代码开头没有 Webpack 那段模块的加载、执行和缓存的代码。
* Rollup 本身就支持 Scope Hoisting，在使用一些插件之后也能把 CommonJS 的模块打包进来。

最后，希望这篇文章能对你有所帮助。

## 参考文章

* <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//medium.com/webpack/webpack-3-official-release-15fd2dd8f07b" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">webpack 3: Official Release!!</a>
* <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">webpack freelancing log book (week 5–7)</a>
* <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Webpack and Rollup: the same but different</a>
* <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/43219030/what-is-flat-bundling-and-why-is-rollup-better-at-this-than-webpack/43255948%2343255948" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">What is flat bundling and why is Rollup better at this than Webpack?</a>
