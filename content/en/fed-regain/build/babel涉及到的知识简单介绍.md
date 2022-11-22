---
title: babel涉及到的知识简单介绍




---
<div class="article fmt article__content" data-id="1190000011155061" data-license="cc">
  <h2 id="articleHeader0">
    引入
  </h2>
  
  <p>
    这个问题是对自己的发问，但我相信会有很多跟我一样的同学。<br /> 对于 babel 的使用，近半年来一直停留在与 webpack 结合使用，以及在浏览器开发环境下。导致很多 babel 的包，我都不清楚他们是干嘛的。比如 babel-register，还有 babel-runtime，各种 presets 的区别，transform-runtime 和 babel-polyfill 的区别，helpers 是干嘛的。尽管网上的 babel 的教程很多了，但是解答自己的一些疑问，还是要花费一些功夫。所以抽出时间来总结一下。如果你对于以上概念已经比较清楚了，就不需要往下看了。
  </p>
  
  <h2 id="articleHeader1">
    版本变化
  </h2>
  
  <p>
    说实话，从我做前端的时候，接触 babel 的时候，就已经是 babel 6 了，但是这不妨碍了解一下它的重大版本变化。<br /> 上一个版本 babel 5 是全家桶，包括各种package， plugins，尽可能的想通过你的一次安装，达到全能的效果。不过你现在安装<code>npm install babel</code>，会得到一个 warning。babel 6 是 <a href="https://github.com/babel/babel/releases?after=v6.0.1" target="_blank" rel="nofollow noopener noreferrer">2015年10月30号</a>发布，主要做了以下更新：
  </p>
  
  <ul>
    <li>
      拆分成几个核心包，<code>babel-core</code>,<code>babel-node</code>,<code>babel-cli</code>&#8230;
    </li>
    <li>
      没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
    </li>
    <li>
      添加了 preset，也就是预置条件。
    </li>
    <li>
      增加了 .babelrc 文件，方便自定义的配置。
    </li>
  </ul>
  
  <p>
    差不多了，我感觉其他的也不需要了解了。
  </p>
  
  <h2 id="articleHeader2">
    包
  </h2>
  
  <p>
    babel 里面有好多的包，所以必须搞清楚他们都是干嘛的，才能让我们更好的使用这个工具。
  </p>
  
  <h3 id="articleHeader3">
    babel-core
  </h3>
  
  <p>
    可以看做 babel 的编译器。babel 的核心 api 都在这里面，比如 transform，主要都是处理转码的。它会把我们的 js 代码，抽象成 ast，即 abstract syntax tree 的缩写，是源代码的抽象语法结构的树状表现形式。我们可以理解为，它定义的一种分析 js 语法的树状结构。也就是说 es6 的新语法，跟老语法是不一样的，那我们怎么去定义这个语法呢。所以必须要先转成 ast，去发现这个语法的 kind，分别做对应的处理，才能转化成 es5.
  </p>
  
  <p>
    主要 api：
  </p>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">var&lt;/span> babel = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-core'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> transform = babel.transform;</code></pre>
  
  <ul>
    <li>
      babel.transform(code: string, options?: Object)
    </li>
  </ul>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="javascript hljs"><code class="javascript">transform(&lt;span class="hljs-string">"code"&lt;/span>, options) &lt;span class="hljs-comment">// =&gt; { code, map, ast }&lt;/span>
</code></pre>
  
  <ul>
    <li>
      babel.transformFile(filename: string, options?: Object, callback: Function)
    </li>
  </ul>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">var&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> result = babel.transformFileSync(path.resolve(__dirname) + &lt;span class="hljs-string">"/test.js"&lt;/span>, {
  &lt;span class="hljs-attr">presets&lt;/span>: [&lt;span class="hljs-string">'env'&lt;/span>],
  &lt;span class="hljs-attr">plugins&lt;/span>: [&lt;span class="hljs-string">'transform-runtime'&lt;/span>],
}, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">err, result&lt;/span>) &lt;/span>{&lt;span class="hljs-comment">// { code, map, ast }&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(result);
});</code></pre>
  
  <ul>
    <li>
      babel.transformFileSync(filename: string, options?: Object)
    </li>
  </ul>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="hljs typescript"><code>&lt;span class="hljs-keyword">var&lt;/span> result = babel.transformFileSync(path.resolve(__dirname) + &lt;span class="hljs-string">"/test.js"&lt;/span>, {
  presets: [&lt;span class="hljs-string">'env'&lt;/span>],
  plugins: [&lt;span class="hljs-string">'transform-runtime'&lt;/span>],
});
&lt;span class="hljs-built_in">console&lt;/span>.log(result, &lt;span class="hljs-string">'res'&lt;/span>);
</code></pre>
  
  <ul>
    <li>
      babel.transformFromAst(ast: Object, code?: string, options?: Object)
    </li>
  </ul>
  
  <p>
    反转，你把 ast 传入，解析为 code 代码。
  </p>
  
  <p>
    <a href="https://github.com/babel/babel/tree/master/packages/babel-core" target="_blank" rel="nofollow noopener noreferrer">options</a>
  </p>
  
  <h3 id="articleHeader4">
    babel-cli
  </h3>
  
  <p>
    提供命令行运行 babel。也就是你可以 <code>babel filename</code> 去对文件转码。<br /> 安装的话
  </p>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="hljs sql"><code>npm &lt;span class="hljs-keyword">install&lt;/span> &lt;span class="hljs-comment">--save-dev babel-cli&lt;/span>

npm isntall babel-cli -g</code></pre>
  
  <p>
    使用对应就是
  </p>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="hljs fortran"><code>node_module/.bin/babel script.js --&lt;span class="hljs-keyword">out&lt;/span>-&lt;span class="hljs-keyword">file&lt;/span> script-compiled.js

babel script.js --&lt;span class="hljs-keyword">out&lt;/span>-&lt;span class="hljs-keyword">file&lt;/span> script-compiled.js</code></pre>
  
  <p>
    具体使用还是看<a href="http://babeljs.io/docs/usage/cli/" target="_blank" rel="nofollow noopener noreferrer">官方文档</a>吧，我就不搬文档了。
  </p>
  
  <h3 id="articleHeader5">
    babel-external-helpers
  </h3>
  
  <p>
    babel-cli 中的一个command，用来生成一段代码，包含 babel 所有的 helper 函数。
  </p>
  
  <p>
    首先我们需要了解什么是 helpers。babel 有很多帮助函数，例如 toArray函数， jsx转化函数。这些函数是 babel transform 的时候用的，都放在 <code>babel-helpers</code>这个包中。如果 babe 编译的时候检测到某个文件需要这些 helpers，在编译成模块的时候，会放到模块的顶部。<br /> 像这样
  </p>
  
  <div class="widget-codetool" style="display: none;">
    <div class="widget-codetool--inner">
    </div>
  </div>
  
  <pre class="javascript hljs"><code class="javascript">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, exports, __webpack_require__&lt;/span>) &lt;/span>{

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">_asyncToGenerator&lt;/span>(&lt;span class="hljs-params">fn&lt;/span>) &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{  }; } &lt;span class="hljs-comment">// 模块顶部定义 helper&lt;/span>

&lt;span class="hljs-comment">// some code &lt;/span>
&lt;span class="hljs-comment">// async 语法已经被 transform-async-to-generator 转化，再利用 helper 函数包装，消费 generator。&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> func = &lt;span class="hljs-function">(&lt;span class="hljs-params">(&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">var&lt;/span> _ref =_asyncToGenerator(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>* () &lt;/span>{
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'begin'&lt;/span>);
    &lt;span class="hljs-keyword">yield&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">resolve&lt;/span>) &lt;/span>{
      setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
        resolve();
      }, &lt;span class="hljs-number">1000&lt;/span>);
    });
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'done'&lt;/span>);
  });
})

})</code></pre>
  
  <p>
    但是如果多个文件都需要提供，会重复引用这些 helpers，会导致每一个模块都定义一份，代码冗余。所以 babel 提供了这个命令，用于生成一个包含了所有 helpers 的 js 文件，用于直接引用。然后再通过一个 plugin，去检测全局下是否存在这个模块，存在就不需要重新定义了。
  </p>
  
  <p>
    使用：
  </p>
  
  <ol>
    <li>
      执行 babel-external-helpers 生成 helpers.js 文件， <div class="widget-codetool" style="display: none;">
        <div class="widget-codetool--inner">
        </div>
      </div>

      <pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"> node_modules&lt;span class="hljs-regexp">/.bin/&lt;/span>babel-external-helpers &gt; helpers.js</code></pre>
      
      <p>
        注意：示例代码的包都是装到项目中的，也就是本地。同样你可以全局安装直接执行。</li> 
        
        <li>
          安装 plugin <div class="widget-codetool" style="display: none;">
            <div class="widget-codetool--inner">
            </div>
          </div>
          
          <pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install --save-dev babel-plugin-external-helpers</code></pre>
        </li>
        
        <li>
          然后在 babel 的配置文件加入 <div class="widget-codetool" style="display: none;">
            <div class="widget-codetool--inner">
            </div>
          </div>
          
          <pre class="hljs json"><code>{
  &lt;span class="hljs-attr">"plugins"&lt;/span>: [&lt;span class="hljs-string">"external-helpers"&lt;/span>]
}</code></pre>
        </li>

        <li>
          入口文件引入 helpers.js <div class="widget-codetool" style="display: none;">
            <div class="widget-codetool--inner">
            </div>
          </div>
          
          <pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;">&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./helpers.js'&lt;/span>);</code></pre>
        </li></ol> 
        
        <p>
          这样就可以啦，还是可以减少很多代码量的。另外如果使用了 transform-runtime，就不需要生成 helpers.js 文件了，这个在后面的 babel-runtime 再说。
        </p>
        
        <h3 id="articleHeader6">
          babel-node
        </h3>
        
        <p>
          也是 babel-cli 下面的一个 command，主要是实现了 node 执行脚本和命令行写代码的能力。举两个栗子就清楚了。
        </p>
        
        <h5>
          执行脚本
        </h5>
        
        <p>
          node 环境肯定是不支持 jsx 的
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs javascript"><code>&lt;span class="hljs-comment">// test.js&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> React = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'react'&lt;/span>);
&lt;span class="hljs-keyword">const&lt;/span> elements = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">(&lt;span class="hljs-params">item&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>{item}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
  )
});

&lt;span class="hljs-built_in">console&lt;/span>.log(elements);</code></pre>

        <p>
          执行 test.js，会报错，不认识这个语法。
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs objectivec"><code style="word-break: break-word; white-space: initial;">node test.js &lt;span class="hljs-comment">//报错&lt;/span></code></pre>
        
        <p>
          但是使用 babel-node 就可以。
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"> node_modules&lt;span class="hljs-regexp">/.bin/&lt;/span>babel-node --presets react test.js</code></pre>
        
        <p>
          &#8211;presets react 是参数，等同于
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs json"><code>{
  &lt;span class="hljs-attr">"presets"&lt;/span>: [&lt;span class="hljs-string">"react"&lt;/span>]
}</code></pre>

        <p>
          执行正常。
        </p>
        
        <h5>
          node 命令行写代码
        </h5>
        
        <p>
          注意： 本文所有代码示例，均在 node 版本 4.8.4 下执行。
        </p>
        
        <p>
          写个解构赋值的，直接运行 node，不支持。
        </p>
        
        <p id="LjGDqHw">
          <img loading="lazy" width="353" height="110" class="alignnone size-full wp-image-5058 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e6c30b59.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e6c30b59.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e6c30b59.png?x-oss-process=image/format,webp 353w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e6c30b59.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_93/format,webp 300w" sizes="(max-width: 353px) 100vw, 353px" />
        </p>
        
        <p>
          运行 <code>node_modules/.bin/babel-node --presets env</code>
        </p>
        
        <p id="ynMMLwF">
          <img loading="lazy" width="578" height="83" class="alignnone size-full wp-image-5059 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e779f3ce.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e779f3ce.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e779f3ce.png?x-oss-process=image/format,webp 578w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e779f3ce.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_43/format,webp 300w" sizes="(max-width: 578px) 100vw, 578px" />
        </p>
        
        <p>
          得到 a 的 value 是 1。
        </p>
        
        <p>
          通过栗子基本已经介绍了 babel-node 的用法了，就是方便我们平常开发时候，写一些脚本的。所以它不适用于生产环境。另外，babel-node 已经内置了 polyfill，并依赖 babel-register 来编译脚本。好，那 babel-register 是什么呢
        </p>
        
        <h3 id="articleHeader7">
          babel-register
        </h3>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">npm install babel-register --save-dev</code></pre>
        
        <p>
          babel-node 可以通过它编译代码，可以了解到，它其实就是一个编译器。我们同样可以在代码中引入它 <code>require('babel-register')</code>，并通过 node 执行我们的代码。
        </p>
        
        <p>
          它的原理是通过改写 node 本身的 require，添加钩子，然后在 require 其他模块的时候，就会触发 babel 编译。也就是你引入<code>require('babel-register')</code>的文件代码，是不会被编译的。只有通过 require 引入的其他代码才会。我们是不是可以理解，babel-node 就是在内存中写入一个临时文件，在顶部引入 babel-register，然后再引入我们的脚本或者代码？
        </p>
        
        <p>
          举个栗子，还是 node 中执行 jsx，要通过 babel 编译。我们可以把 jsx 的代码 a.js 编译完输出到一个 b.js，然后 <code>node b.js</code> 也是可以执行的。但是太麻烦，不利于开发。让我们看一下通过 register 怎么用：
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// register.js 引入 babel-register，并配置。然后引入要执行代码的入口文件&lt;/span>
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-register'&lt;/span>)({ &lt;span class="hljs-attr">presets&lt;/span>: [&lt;span class="hljs-string">'react'&lt;/span>] });
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./test'&lt;/span>)</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// test.js 这个文件是 jsx...&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> React = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'react'&lt;/span>);
&lt;span class="hljs-keyword">const&lt;/span> elements = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">(&lt;span class="hljs-params">item&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>{item}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
  )
});
&lt;span class="hljs-built_in">console&lt;/span>.log(elements);</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs objectivec"><code>&lt;span class="hljs-comment">// 执行&lt;/span>
$ node &lt;span class="hljs-keyword">register&lt;/span>.js</code></pre>

        <p>
          它的特点就是实时编译，不需要输出文件，执行的时候再去编译。所以它很适用于开发。总结一下就是，多用在 node 跑程序，做实时编译用的，通常会结合其他插件作编译器使用，比如 mocha 做测试的时候。
        </p>
        
        <p>
          值得一提的是，babel-register 这个包之前是在 babel-core 下面的，所以也可以 <code>require('babel-core/register')</code> 去引入，跟<code>require('babel-register')</code>是一样的。但是，babel 的团队把 register 独立出来了，而且未来的某一天（升 7.0）会从 babel-core 中废除，所以我们现在最好还是使用 babel-register 吧。<a href="https://github.com/babel/babel/blob/master/packages/babel-core/register.js#L3" target="_blank" rel="nofollow noopener noreferrer">babel-core/register.js</a>
        </p>
        
        <h3 id="articleHeader8">
          babel-runtime
        </h3>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">npm install babel-runtime --save</code></pre>
        
        <p>
          这个包很简单，就是引用了 core-js 和 regenerator，然后生产环境把它们编译到 dist 目录下，做了映射，供使用。那么什么是 core-js 和 regenerator 呢。<br /> 首先我们要知道上面提到的 babel-core 是对语法进行 transform 的，但是它不支持 build-ints（Eg: promise，Set，Map），prototype function（Eg: array.reduce,string.trim），class static function （Eg：Array.form，Object.assgin），regenerator （Eg：generator，async）等等拓展的编译。所以才要用到 core-js 和 regenerator。
        </p>
        
        <h4>
          core-js
        </h4>
        
        <p>
          core-js 是用于 JavaScript 的组合式标准化库，它包含 es5 （e.g: object.freeze）, es6的 promise，symbols, collections, iterators, typed arrays， es7+提案等等的 polyfills 实现。也就是说，它几乎包含了所有 JavaScript 最新标准的垫片。不过为什么它不把 generator 也实现了&#8230; &#x1f601;
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 比如，只不过需要单个引用&lt;/span>
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'core-js/array/reduce'&lt;/span>);
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'core-js/object/values'&lt;/span>);</code></pre>

        <h4>
          regenerator
        </h4>
        
        <p>
          它是来自于 facebook 的一个库，<a href="https://github.com/facebook/regenerator" target="_blank" rel="nofollow noopener noreferrer">链接</a>。主要就是实现了 generator/yeild， async/await。
        </p>
        
        <p>
          所以 babel-runtime 是单纯的实现了 core-js 和 regenerator 引入和导出，比如这里是 filter 函数的定义，做了一个中转并处理了 esModule 的兼容。
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;span class="hljs-built_in">module&lt;/span>.exports = { &lt;span class="hljs-string">"default"&lt;/span>: &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"core-js/library/fn/array/filter"&lt;/span>), &lt;span class="hljs-attr">__esModule&lt;/span>: &lt;span class="hljs-literal">true&lt;/span> };</code></pre>
        
        <h4>
          helpers
        </h4>
        
        <p>
          还记得提 babel-external-helpers 的时候，介绍 helpers 了吗。babel-runtime 里面的 helpers 就相当于我们上面通过 babel-external-helpers 生成的 helpers.js。只不过它把每个 helper 都单独放到一个文件夹里。这样，配合 transform-runtime 使用的时候，需要用 helper 转化的时候，就从 babel-runtime 中直接引用了。
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-keyword">var&lt;/span> _asyncToGenerator2 = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-runtime/helpers/asyncToGenerator'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> _asyncToGenerator3 =_interopRequireDefault(_asyncToGenerator2);</code></pre>

        <h4>
          文件结构：
        </h4>
        
        <p id="fkJJccN">
          <img loading="lazy" width="348" height="1186" class="alignnone size-full wp-image-5060 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e84860c9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e84860c9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e84860c9.png?x-oss-process=image/format,webp 348w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e84860c9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_88,h_300/format,webp 88w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69e84860c9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_176,h_600/format,webp 176w" sizes="(max-width: 348px) 100vw, 348px" />
        </p>
        
        <h4>
          使用
        </h4>
        
        <p>
          可以单独引入<code>require('babel-runtime/core-js/object/values');</code>
        </p>
        
        <p>
          不过这些模块都做了 esModule 的兼容处理，也就是上面引入的模块是<code>{ "default": require("core-js/library/fn/array/filter"), __esModule: true }</code>这样的，要使用还得加上 <code>.default</code>。所以我们期待的是，最好能有帮我们自动处理的插件，<code>babel-plugin-transform-runtime</code>就是用来做这个的。这个我们放到 plugin 去讲。
        </p>
        
        <h3 id="articleHeader9">
          babel-polyfill
        </h3>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">npm install babel-polyfill --save</code></pre>
        
        <p>
          babel-runtime 已经是一堆 polyfill 了，为什么这里还有一个类似的包，它同样是引用了 core-js 和 regenerator，垫片支持是一样的。官网是这么说的，babel-polyfill 是为了模拟一个完整的ES2015 +环境，旨在用于应用程序而不是库/工具。并且使用babel-node时，这个polyfill会自动加载（这个我们在介绍 babel-node 的最后已经说了）。
        </p>
        
        <p>
          也就是说，它会让我们程序的执行环境，模拟成完美支持 es6+ 的环境，毕竟无论是浏览器环境还是 node 环境对 es6+ 的支持都不一样。它是以重载全局变量 （E.g: Promise）,还有原型和类上的静态方法（E.g：Array.prototype.reduce/Array.form），从而达到对 es6+ 的支持。不同于 babel-runtime 的是，babel-polyfill 是一次性引入你的项目中的，就像是 React 包一样，同项目代码一起编译到生产环境。
        </p>
        
        <h4>
          使用
        </h4>
        
        <p>
          我们结合 babel-register 去使用一下
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// index.js&lt;/span>
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-core/register'&lt;/span>)({});
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-polyfill'&lt;/span>);
&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./async'&lt;/span>);</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// async.js&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">a&lt;/span>() &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'begin'&lt;/span>);
  &lt;span class="hljs-keyword">await&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve&lt;/span>) =&gt;&lt;/span> {
    setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
      resolve();
    }, &lt;span class="hljs-number">1000&lt;/span>)
  })
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'done'&lt;/span>);
}
a();</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs shell"><code style="word-break: break-word; white-space: initial;">&lt;span class="hljs-meta">$&lt;/span>&lt;span class="bash"> node index.js&lt;/span></code></pre>
        
        <p>
          完美运行。
        </p>
        
        <h2 id="articleHeader10">
          plugins
        </h2>
        
        <p>
          要说 plugins 就不得不提 babel 编译的过程。babel 编译分为三步：
        </p>
        
        <ol>
          <li>
            parser：通过 <a href="https://github.com/babel/babylon" target="_blank" rel="nofollow noopener noreferrer">babylon</a> 解析成 AST。
          </li>
          <li>
            transform[s]：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST。
          </li>
          <li>
            generator： 最后通过 <a href="https://github.com/babel/babel/blob/master/packages/babel-generator" target="_blank" rel="nofollow noopener noreferrer">babel-generator</a> 生成 output string。
          </li>
        </ol>
        
        <p>
          所以 plugins 是在第二步加强转译的，所以假如我们自己写个 plugin，应该就是对 ast 结构做一个遍历，操作。
        </p>
        
        <h3 id="articleHeader11">
          babel-plugin-transform-runtime
        </h3>
        
        <p>
          上面我们知道，transform-runtime 是为了方便使用 babel-runtime 的，它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。试一下：
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">npm install babel-plugin-transform-runtime</code></pre>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 编译前&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-built_in">Object&lt;/span>.values({ &lt;span class="hljs-number">1&lt;/span>: &lt;span class="hljs-number">2&lt;/span> }));
</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">node_modules/.bin/babel --plugins transform-runtime values.js</code></pre>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 编译后&lt;/span>
&lt;span class="hljs-meta">'use strict'&lt;/span>;

&lt;span class="hljs-keyword">var&lt;/span> _values = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'babel-runtime/core-js/object/values'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> _values2 =_interopRequireDefault(_values);

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">_interopRequireDefault&lt;/span>(&lt;span class="hljs-params">obj&lt;/span>) &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> obj && obj.__esModule ? obj : { &lt;span class="hljs-attr">default&lt;/span>: obj }; }

onsole.log((&lt;span class="hljs-number">0&lt;/span>, _values2.default)({ &lt;span class="hljs-number">1&lt;/span>: &lt;span class="hljs-number">2&lt;/span> }));</code></pre>

        <p>
          另外，它还有几个配置
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 默认值&lt;/span>
{
  &lt;span class="hljs-string">"plugins"&lt;/span>: [
    [&lt;span class="hljs-string">"transform-runtime"&lt;/span>, {
      &lt;span class="hljs-string">"helpers"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-string">"polyfill"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-string">"regenerator"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-string">"moduleName"&lt;/span>: &lt;span class="hljs-string">"babel-runtime"&lt;/span>
    }]
  ]
}</code></pre>

        <p>
          如果你只需要用 regenerator，不需要 core-js 里面的 polyfill 那你就可以在 options 中把 polyfill 设为 false。helpers 设为 false，就相当于没有启用 <code>babel-plugin-external-helpers</code> 的效果，比如翻译 async 的时候，用到了 asyncToGenerator 函数，每个文件还会重新定义一下。moduleName 的话，就是用到的库，你可以把 babel-runtime 换成其他类似的。
        </p>
        
        <h3 id="articleHeader12">
          transform-runtime 对比 babel-polyfill
        </h3>
        
        <p>
          其实通过上面的介绍我们已经了解他们是干什么的了，这里再稍微总结区分一下吧。我在这里把 babel-runtime 和 babel-plugin-transform-runtime 统称为 transform-runtime，因为一起用才比较好。
        </p>
        
        <ul>
          <li>
            babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。
          </li>
          <li>
            transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。<strong>值得注意的是，instance 上新添加的一些方法，babel-plugin-transform-runtime 是没有做处理的，比如 数组的 <code>includes, filter, fill</code> 等，这个算是一个关键问题吧，直接推荐用 polyfill。</strong><a href="https://github.com/jakwuh/babel-plugin-transform-runtime" target="_blank" rel="nofollow noopener noreferrer">link</a>
          </li>
        </ul>
        
        <p>
          另外，关于 babel-runtime 为什么是 dependencies 依赖。它只是一个集中了 polyfill 的 library，对应需要的 polyfill 都是要引入项目中，并跟项目代码一起打包的。不过它不会都引入，你用了哪个，plugin 就给你 require 哪个。所以即使你最终项目只是 <code>require('babel-runtime/core-js/object/values')</code>其中的一个文件，但是对于这包来说，也是生产依赖的。
        </p>
        
        <p id="GwQcLfj">
          <img loading="lazy" width="659" height="566" class="alignnone size-full wp-image-5061 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69ea40471a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69ea40471a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69ea40471a.png?x-oss-process=image/format,webp 659w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/10/img_5db69ea40471a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_258/format,webp 300w" sizes="(max-width: 659px) 100vw, 659px" />
        </p>
        
        <p>
          &nbsp;
        </p>
        
        <p>
          注意：babel-polyfill 并不是一定会污染全局环境，在引入这个 js，并运行的时候，它会先判断当前有没有这个方法，在看要不要重写。如上图
        </p>
        
        <h2 id="articleHeader13">
          presets
        </h2>
        
        <p>
          各种配置 plugin 实在是费劲，es6+ 编译要加入好多 plugins，比如为了在 node 中使用 esmodule，要把 esmodule 转化成 commomjs，使用 <code>transform-es2015-modules-commonjs</code>，还有 asyncToGenerator，React jsx转化等等，不仅要装好多，还要配好多。
        </p>
        
        <p>
          presets 就是 plugins 的组合，你也可以理解为是套餐&#8230; 主要有
        </p>
        
        <ul>
          <li>
            <a href="https://babeljs.io/docs/plugins/preset-env/" target="_blank" rel="nofollow noopener noreferrer">env</a>
          </li>
          <li>
            <a href="https://babeljs.io/docs/plugins/preset-es2015/" target="_blank" rel="nofollow noopener noreferrer">es2015</a>
          </li>
          <li>
            <a href="https://babeljs.io/docs/plugins/preset-react/" target="_blank" rel="nofollow noopener noreferrer">react</a>
          </li>
          <li>
            <a href="https://babeljs.io/docs/plugins/preset-latest/" target="_blank" rel="nofollow noopener noreferrer">lastet</a>
          </li>
          <li>
            <a href="https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-" target="_blank" rel="nofollow noopener noreferrer">stage-x</a> 具体的语法属于哪个 stage 可参照<a href="https://github.com/tc39/proposals" target="_blank" rel="nofollow noopener noreferrer">tc39</a>
          </li>
        </ul>
        
        <p>
          大部分的 presets 我觉得都不需要介绍了，官网上写的比较详细。而且 babel-preset-lastet 已经废弃，被 babel-preset-env 代替。
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">{ &lt;span class="hljs-string">"presets"&lt;/span>: [&lt;span class="hljs-string">"latest"&lt;/span>] } === { &lt;span class="hljs-string">"presets"&lt;/span>: [&lt;span class="hljs-string">"env"&lt;/span>] }
</code></pre>

        <h3 id="articleHeader14">
          babel-preset-env
        </h3>
        
        <p>
          这个 preset 真是神器啊，它能根据当前的运行环境，自动确定你需要的 plugins 和 polyfills。通过各个 es标准 feature 在不同浏览器以及 node 版本的支持情况，再去维护一个 feature 跟 plugins 之间的映射关系，最终确定需要的 plugins。
        </p>
        
        <h4>
          preset-env 配置
        </h4>
        
        <p>
          详情：
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">{
  &lt;span class="hljs-string">"presets"&lt;/span>: [
    [
      &lt;span class="hljs-string">"env"&lt;/span>,
      {
        &lt;span class="hljs-string">"targets"&lt;/span>: { &lt;span class="hljs-comment">// 配支持的环境&lt;/span>
          &lt;span class="hljs-string">"browsers"&lt;/span>: [ &lt;span class="hljs-comment">// 浏览器&lt;/span>
            &lt;span class="hljs-string">"last 2 versions"&lt;/span>,
            &lt;span class="hljs-string">"safari &gt;= 7"&lt;/span>
          ],
          &lt;span class="hljs-string">"node"&lt;/span>: &lt;span class="hljs-string">"current"&lt;/span>
        },
        &lt;span class="hljs-string">"modules"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,  &lt;span class="hljs-comment">//设置ES6 模块转译的模块格式 默认是 commonjs&lt;/span>
        &lt;span class="hljs-string">"debug"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>, &lt;span class="hljs-comment">// debug，编译的时候 console&lt;/span>
        &lt;span class="hljs-string">"useBuiltIns"&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>, &lt;span class="hljs-comment">// 是否开启自动支持 polyfill&lt;/span>
        &lt;span class="hljs-string">"include"&lt;/span>: [], &lt;span class="hljs-comment">// 总是启用哪些 plugins&lt;/span>
        &lt;span class="hljs-string">"exclude"&lt;/span>: []  &lt;span class="hljs-comment">// 强制不启用哪些 plugins，用来防止某些插件被启用&lt;/span>
      }
    ]
  ],
  &lt;span class="hljs-attr">plugins&lt;/span>: [
    &lt;span class="hljs-string">"transform-react-jsx"&lt;/span> &lt;span class="hljs-comment">//如果是需要支持 jsx 这个东西要单独装一下。&lt;/span>
  ]
}</code></pre>

        <p>
          主要介绍 debug 和 很好用的 useBuiltIns 吧。
        </p>
        
        <h4>
          debug
        </h4>
        
        <p>
          开启debug后，编译结果会得到使用的 targets，plugins，polyfill 等信息
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">Using targets:
{
  &lt;span class="hljs-string">"chrome"&lt;/span>: &lt;span class="hljs-string">"59"&lt;/span>,
  &lt;span class="hljs-string">"android"&lt;/span>: &lt;span class="hljs-string">"4.4.3"&lt;/span>,
  &lt;span class="hljs-string">"edge"&lt;/span>: &lt;span class="hljs-string">"14"&lt;/span>,
  &lt;span class="hljs-string">"firefox"&lt;/span>: &lt;span class="hljs-string">"54"&lt;/span>,
  &lt;span class="hljs-string">"ie"&lt;/span>: &lt;span class="hljs-string">"10"&lt;/span>,
  &lt;span class="hljs-string">"ios"&lt;/span>: &lt;span class="hljs-string">"10"&lt;/span>,
  &lt;span class="hljs-string">"safari"&lt;/span>: &lt;span class="hljs-string">"7"&lt;/span>,
  &lt;span class="hljs-string">"node"&lt;/span>: &lt;span class="hljs-string">"4.8.4"&lt;/span>
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  transform-es2015-arrow-functions {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  transform-es2015-block-scoped-functions {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>}
  transform-es2015-block-scoping {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  ...
Using polyfills:
  es6.typed.array-buffer {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  es6.typed.int8-array {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  es6.typed.uint8-array {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  es6.typed.uint8-clamped-array {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  es6.typed.int16-array {&lt;span class="hljs-string">"android"&lt;/span>:&lt;span class="hljs-string">"4.4.3"&lt;/span>,&lt;span class="hljs-string">"ie"&lt;/span>:&lt;span class="hljs-string">"10"&lt;/span>,&lt;span class="hljs-string">"safari"&lt;/span>:&lt;span class="hljs-string">"7"&lt;/span>,&lt;span class="hljs-string">"node"&lt;/span>:&lt;span class="hljs-string">"4.8.4"&lt;/span>}
  ...</code></pre>

        <h4>
          useBuiltIns
        </h4>
        
        <p>
          env 会自动根据我们的运行环境，去判断需要什么样的 polyfill，而且，打包后的代码体积也会大大减小，但是这一切都在使用 useBuiltIns，而且需要你安装 babel-polyfill，并 import。它会启用一个插件，替换你的<code>import 'babel-polyfill'</code>，不是整个引入了，而是根据你配置的环境和个人需要单独的引入 polyfill。 我尝试了一下是否真的有效，下面是我的对比实验过程：
        </p>
        
        <p>
          <strong>step1: </strong> 首先是这样一段测试编译的代码，有 jsx，Object.values，async。env 的配置除了 useBuiltIns 都跟上面的配置一样。然后通过 webpack + babel-loader 打包，生成 build.js
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./async'&lt;/span>);
&lt;span class="hljs-comment">// import 'babel-polyfill';&lt;/span>

&lt;span class="hljs-keyword">const&lt;/span> React = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'react'&lt;/span>);
&lt;span class="hljs-keyword">const&lt;/span> elements = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">(&lt;span class="hljs-params">item&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>{item}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
  )
});

&lt;span class="hljs-built_in">console&lt;/span>.log(elements);

&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">a&lt;/span>() &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'begin'&lt;/span>);
  &lt;span class="hljs-keyword">await&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">resolve&lt;/span>) =&gt;&lt;/span> {
    setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
      resolve();
    }, &lt;span class="hljs-number">1000&lt;/span>)
  })
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'done'&lt;/span>);
}
a();

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-built_in">Object&lt;/span>.values({ &lt;span class="hljs-number">1&lt;/span>: &lt;span class="hljs-number">2&lt;/span> }));

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-built_in">Array&lt;/span>.isArray([]));
</code></pre>

        <p>
          <strong>step2:</strong> 然后通过设置不同的参数，打包，获取 build.js，并执行。得到下表
        </p>
        
        <table>
          <tr>
            <th>
            </th>
            
            <th>
            </th>
          </tr>
          
          <tr>
            <td>
              preset-env 条件下
            </td>
            
            <td>
              useBuiltIns: true
            </td>
            
            <td>
              useBuiltIns: fase
            </td>
          </tr>
          
          <tr>
            <td>
              不引入 polyfill
            </td>
            
            <td>
              build.js 代码体积 158k，node build.js 执行报错。
            </td>
            
            <td>
              build.js 代码体积 158k，node build.js 执行报错。
            </td>
            
            <td>
            </td>
          </tr>
          
          <tr>
            <td>
              引入 polyfill
            </td>
            
            <td>
              build.js 体积 369k，执行通过。包确实减小了。
            </td>
            
            <td>
              因为引入了 polyfill，build.js 代码体积瞬间 420k，执行通过
            </td>
            
            <td>
            </td>
          </tr>
        </table>
        
        <ul>
          <li>
            用 preset-es2015，并引入 polyfill<br /> plugins 多加一个 transform-regenerator，这方面确实不如 env 方便一些。<br /> 体积 418k，执行通过。不方便在要配好多 plugins。
          </li>
        </ul>
        
        <p>
          具体的过程、截图猛戳 <a href="https://github.com/sunyongjian/babel-usage/tree/master/env" target="_blank" rel="nofollow noopener noreferrer">这里</a>
        </p>
        
        <p>
          最终的结论就是，使用了 useBuiltIns 确实体积变小了，比直接 <code>import 'babel-polyfill'</code> 好了许多。
        </p>
        
        <p>
          <strong>step3:</strong> 然后&#8230; 我又试了一下 env 下，使用 transform-runtime。在不加 useBuiltIns，不引入 babel-polyfill 的情况下。build.js 体积234k，执行通过。
        </p>
        
        <p>
          咦，这样好像体积更小啊。别忘了，我们的 babel-polyfill 是配置了执行环境的，通过环境看你需要哪些 polyfill。而 transform-runtime，是发现我们代码需要什么 polyfill，当然会少很多了。所以，又回到了用哪个的问题&#8230; &#x1f613; 参考上面的总结。
        </p>
        
        <h4>
          then
        </h4>
        
        <p>
          helpers 的问题。开发项目，使用 preset-env，并 <code>import 'babel-polyfill'</code>，但是 helpers 好像没有地方配置。而且我试了两个文件分别用 async 函数，编译后每个模块都定义了 asyncToGenerat 函数，这种情况下我觉得最后就是自己生成一个 helpers.js 文件了。
        </p>
        
        <h4>
          总结
        </h4>
        
        <p>
          现在看起来开发大点的项目，最好用的配置应该就是 preset-env，确定自己的运行环境，如果有需要，再加上 useBuiltIns，并生成一份 helpers.js 的文件。不过，一切还是看你的需求，我的前提是开发大点的“项目”，不过了解了这些东西，你会做出自己的选择。
        </p>
        
        <h2 id="articleHeader15">
          babel 的配置
        </h2>
        
        <p>
          目前 babel 官方推荐是写到 .babelrc 文件下，你还可以在 package.json 里面添加 babel 字段。不用配置文件的话，可以把配置当做参数传给 babel-cli
        </p>
        
        <ul>
          <li>
            .babelrc
          </li>
        </ul>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs json"><code>{
  &lt;span class="hljs-attr">"presets"&lt;/span>: [
    &lt;span class="hljs-string">"env"&lt;/span>
  ],
  &lt;span class="hljs-attr">"plugins"&lt;/span>: [
    [&lt;span class="hljs-string">"transform-runtime"&lt;/span>, {
      &lt;span class="hljs-attr">"helpers"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-attr">"polyfill"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-attr">"regenerator"&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
      &lt;span class="hljs-attr">"moduleName"&lt;/span>: &lt;span class="hljs-string">"babel-runtime"&lt;/span>
    }]
  ]
}</code></pre>

        <ul>
          <li>
            写到 package.json
          </li>
        </ul>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs objectivec"><code>&lt;span class="hljs-string">"babel"&lt;/span>: {
  &lt;span class="hljs-string">"presets"&lt;/span>: [
    &lt;span class="hljs-string">"env"&lt;/span>
  ],
}</code></pre>

        <ul>
          <li>
            babel cli
          </li>
        </ul>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">babel script.js &lt;span class="hljs-comment">--plugins=transform-runtime --presets=env&lt;/span></code></pre>
        
        <h2 id="articleHeader16">
          配合其他工具
        </h2>
        
        <h3 id="articleHeader17">
          webpack
        </h3>
        
        <p>
          比较常用，除了 babel 自己的包，多装一个 <code>babel-loader</code> 配合 webpack 使用。并在 webpack.config.js 中加入 loader 的配置
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">  &lt;span class="hljs-built_in">module&lt;/span>: {
    &lt;span class="hljs-attr">rules&lt;/span>: [
      {
        &lt;span class="hljs-attr">test&lt;/span>: &lt;span class="hljs-regexp">/\.js$/&lt;/span>,
        &lt;span class="hljs-attr">use&lt;/span>: [&lt;span class="hljs-string">'babel-loader'&lt;/span>],
        &lt;span class="hljs-attr">exclude&lt;/span>: &lt;span class="hljs-regexp">/node_modules/&lt;/span>,
      }
    ]
  }</code></pre>

        <h3 id="articleHeader18">
          mocha
        </h3>
        
        <p>
          项目里的代码都是用 es6+ 写的，但是做单元测试的时候，测试框架并不认识你的什么 esModule，es6+ 的一些语法，mocha 是 node 程序，所以你要把 esModule 转化成 commomjs 之类的。
        </p>
        
        <p>
          mocha 是支持编译器的，通过 <code>--compilers </code> 指定，这里我们用 babel，举个栗子
        </p>
        
        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="hljs typescript"><code class="javascipt">&lt;span class="hljs-comment">// 求和函数 add.js&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> add = &lt;span class="hljs-function">(&lt;span class="hljs-params">x, y&lt;/span>) =&gt;&lt;/span> x + y;

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> add;
</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 测试脚本 add.test.js&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> { expect } &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'chai'&lt;/span>; &lt;span class="hljs-comment">// chai 是断言库&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> add &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./add'&lt;/span>;

describe(&lt;span class="hljs-string">'es6 两数相加'&lt;/span>, () =&gt; {
  it(&lt;span class="hljs-string">'2 + 4 = 6'&lt;/span>, () =&gt; {
    expect(add(&lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">4&lt;/span>)).equal(&lt;span class="hljs-number">6&lt;/span>);
  })
});
</code></pre>

        <div class="widget-codetool" style="display: none;">
          <div class="widget-codetool--inner">
          </div>
        </div>
        
        <pre class="shell hljs"><code class="shell" style="word-break: break-word; white-space: initial;">./node_modules/mocha/bin/mocha --compilers js:babel-register add.test.js</code></pre>
        
        <p>
          因为 mocha 终究是在跑 node 程序的，适用于实时编译，所以可以用 babel-register 做编译器。
        </p>
        
        <h3 id="articleHeader19">
          最后
        </h3>
        
        <p>
          总结这些东西花了我两三天的时间，虽然搞清楚了这些包是干嘛的，但是又在想到底应不应该花时间研究这些，工具始终是用来使用的，对于 babel 来说更应该研究的是它对 ast 的处理方式？不过看到自己的产出，我觉得是有必要的，另外，因为对工具更进一步的了解，才能更好的在项目中使用它们，而不是一顿照搬，代码是可以正常用了，但是可能会有很多不需要的东西，导致代码体积变大。“割鸡焉用牛刀”，我觉得还是需要有精益求精的精神。希望对你有所帮助。
        </p>
        
        <p>
          原文：<a href="https://segmentfault.com/a/1190000011155061">你真的会用babel吗</a>
        </p></div>
