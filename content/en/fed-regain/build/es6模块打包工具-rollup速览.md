---
title: ES6模块打包工具—Rollup速览



---

  <img loading="lazy" class="alignnone  wp-image-3844 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png?x-oss-process=image/format,webp" alt="" width="428" height="238" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png?x-oss-process=image/format,webp 900w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_167/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_427/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c837ef525b36.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_444/format,webp 800w" sizes="(max-width: 428px) 100vw, 428px" />

## 简介 {#articleHeader0}

以下内容基于Webpack和Rollup这两个打包工具来展开。

工具的使用是分场景的，Rollup的使用场景是，你的代码基于 ES6 模块编写，并且你做的东西是准备给他人使用的。

有一句经验之谈：**在开发应用时使用 Webpack，开发库时使用 Rollup。**

例如：React、Vue、Ember、Preact、D3、Three.js、Moment 等众多知名项目都使用了 Rollup

> 优点

* 编译运行出来的代码内容格式可读性好。
* 几乎没什么多余代码，除了必要的cjs, umd头外，bundle代码基本和源码没什么差异，没有奇怪的`__webpack_require__`, `Object.defineProperty`
* 相比Webpack，Rollup拥有无可比拟的性能优势，这是由依赖处理方式决定的，编译时依赖处理（Rollup）自然比运行时依赖处理（Webpack）性能更好,而且没什么多余代码，如上文提到的，webpack bundle不仅体积大，非业务代码（`__webpack_require__`, `Object.defineProperty`）执行耗时也不容小视。Rollup没有生成这些额外的东西，执行耗时主要在于`Compile Script` 和 `Evaluate Script` 上，其余部分可以忽略不计
* 支持ES6模块和IIFE格式。
* 对于**ES6模块**依赖库，Rollup会静态分析代码中的 import，并将排除任何未实际使用的代码。(Tree-shaking)

> 缺点

* 插件生态相对较弱，一些常见需求无法满足

比如打包多个依赖库，把公共依赖项提出来（Webpack的CommonsChunkPlugin）还有HMR(模块热替换)

* 文档相对较少，遇到问题无法快速解决

### 安装 {#articleHeader1}

`npm install -g rollup`

### 全部指令 {#articleHeader2}

<pre class="hljs lua"><code>Usage: rollup [options] <entry file>

Basic options:

-v, <span class="hljs-comment">--version               Show version number</span>
-h, <span class="hljs-comment">--help                  Show this help message</span>
-c, <span class="hljs-comment">--config                Use this config file (if argument is used but value</span>
                              is unspecified, defaults to rollup.<span class="hljs-built_in">config</span>.js)
-w, <span class="hljs-comment">--watch                 Watch files in bundle and rebuild on changes</span>
-i, <span class="hljs-comment">--input                 Input (alternative to <entry file>)</span>
-o, <span class="hljs-comment">--output.file <output>  Output (if absent, prints to stdout)</span>
-f, <span class="hljs-comment">--output.format [es]    Type of output (amd, cjs, es, iife, umd)</span>
-e, <span class="hljs-comment">--external              Comma-separate list of module IDs to exclude</span>
-g, <span class="hljs-comment">--globals               Comma-separate list of `module ID:Global` pairs</span>
                              Any module IDs defined here are added to external
-n, <span class="hljs-comment">--name                  Name for UMD export</span>
-m, <span class="hljs-comment">--sourcemap             Generate sourcemap (`-m inline` for inline map)</span>
-l, <span class="hljs-comment">--legacy                Support IE8</span>
<span class="hljs-comment">--amd.id                    ID for AMD module (default is anonymous)</span>
<span class="hljs-comment">--amd.define                Function to use in place of `define`</span>
<span class="hljs-comment">--no-strict                 Don't emit a `"use strict";` in the generated modules.</span>
<span class="hljs-comment">--no-indent                 Don't indent result</span>
<span class="hljs-comment">--environment <values>      Settings passed to config file (see example)</span>
<span class="hljs-comment">--no-conflict               Generate a noConflict method for UMD globals</span>
<span class="hljs-comment">--no-treeshake              Disable tree-shaking</span>
<span class="hljs-comment">--silent                    Don't print warnings</span>
<span class="hljs-comment">--intro                     Content to insert at top of bundle (inside wrapper)</span>
<span class="hljs-comment">--outro                     Content to insert at end of bundle (inside wrapper)</span>
<span class="hljs-comment">--banner                    Content to insert at top of bundle (outside wrapper)</span>
<span class="hljs-comment">--footer                    Content to insert at end of bundle (outside wrapper)</span>
<span class="hljs-comment">--interop                   Include interop block (true by default)</span></code></pre>

### 配置文件细则 {#articleHeader3}

<pre class="hljs dart"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 核心选项</span>
  input,     <span class="hljs-comment">// 必须</span>
  <span class="hljs-keyword">external</span>,
  plugins,

  <span class="hljs-comment">// 额外选项</span>
  onwarn,

  <span class="hljs-comment">// danger zone</span>
  acorn,
  context,
  moduleContext,
  legacy

  output: {  <span class="hljs-comment">// 必须 (如果要输出多个，可以是一个数组)</span>
    <span class="hljs-comment">// 核心选项</span>
    file,    <span class="hljs-comment">// 必须</span>
    format,  <span class="hljs-comment">// 必须</span>
    name,
    globals,

    <span class="hljs-comment">// 额外选项</span>
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    <span class="hljs-comment">// 高危选项</span>
    exports,
    amd,
    indent
    strict
  },
};</code></pre>

### 简单实例 {#articleHeader4}

> 生成[浏览器](https://www.w3cdoc.com)可用

<pre class="hljs objectivec"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是立即执行函数</span>
rollup main.js -o bundle.js -f iife</code></pre>

> 生成Node.js可用

<pre class="hljs objectivec"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是commonjs。</span>
rollup main.js -o bundle.js -f cjs</code></pre>

> Node.js和[浏览器](https://www.w3cdoc.com)都可用

<pre class="hljs objectivec"><code><span class="hljs-comment">//打包main.js到bundle.js 打包格式是UMD,这个格式需要一个模块名</span>
rollup main.js -o bundle.js -f umd --name <span class="hljs-string">"myBundle"</span></code></pre>

> 运行配置文件

`rollup -c`

## 实际操作 {#articleHeader5}

### example1 {#articleHeader6}

<pre class="hljs javascript"><code><span class="hljs-comment">// src/example1/main.js</span>
<span class="hljs-keyword">import</span> one <span class="hljs-keyword">from</span> <span class="hljs-string">'./module1.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
    <span class="hljs-built_in">console</span>.log(one);
}

<span class="hljs-comment">// src/example1/module1.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'hello world!'</span></code></pre>

在**项目根目录**(之后Rollup运行会默认这个目录)运行  
`rollup src/example1/main.js -o dist/example1/bundle.js -f cjs`

_解析：_  
`-f` 选项（ `--output.format` 的缩写）指定了所创建 bundle 的类型，打包时必须要有的选项，否则会报错。  
输出的格式有amd, cjs, es, iife, umd,可以把命令行中 `-f` 后面的 `cjs` 改为其他的，看一下生成的bundle.js的内容有什么不一样。对于模块不熟悉的可以看一下 [很全很全的JavaScript的模块讲解][1]

`-o` 是 `--output.file` 的缩写，如果不写会默认输出到命令行终端（标准输出）。

### example2 {#articleHeader7}

如果添加更多的选项，上面这种命令行的方式就显得麻烦了，就得需要 **使用配置文件** 了。

在项目 `src/example2` 文件夹下，新建一个 `rollup.config.js` 文件，写入以下代码：

<pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">input</span>: <span class="hljs-string">'src/example2/main.js'</span>,
    output: {
        file: <span class="hljs-string">'dist/example2/bundle.js'</span>,
        format: <span class="hljs-string">'cjs'</span>
    }
}</code></pre>

新建一个`main.js` 和 `module2.js`如下：

<pre class="hljs javascript"><code><span class="hljs-comment">// src/example2/main.js</span>
<span class="hljs-keyword">import</span> one <span class="hljs-keyword">from</span> <span class="hljs-string">'./module2.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
    <span class="hljs-built_in">console</span>.log(one);
}

<span class="hljs-comment">// src/example1/module2.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'hello config!'</span></code></pre>

接下来就是运行命令，`rollup.config.js`本来是Rollup默认运行的配置文件，如果[我们](https://www.w3cdoc.com)的`rollup.config.js`是放在根目录下的，可以直接运行`rollup -c`，不用任何选项，但是[我们](https://www.w3cdoc.com)是放在`src/module2`文件夹下的，所以要加上配置文件的路径  
`rollup -c src/module2/rollup.config.js`

**注意**

  1. 同样的命令行选项将会覆盖配置文件中的选项，例如:

`rollup -c src/module2/rollup.config.js -o dist/example2/bundle2.js` 那么打包好的文件名就是`bundle2.js`

  1. Rollup 本身会处理配置文件，所以可以使用 `export default` 语法——代码不会经过 `Babel` 等类似工具编译，所以只能使用支持 ES2015(ES6) 语法的 Node.js 版本。

### example3 {#articleHeader8}

随着构建更复杂的 bundle，[我们](https://www.w3cdoc.com)需要加入插件(plugins)。

使用 <a href="https://github.com/rollup/rollup-plugin-json" target="_blank" rel="nofollow noopener noreferrer">rollup-plugin-json</a>，令 Rollup 从 JSON 文件中读取数据。  
将 rollup-plugin-json 安装为开发依赖，因为代码实际执行时不依赖这个插件——只是在打包时使用，所以用的是`--save-dev` 而不是 `--save`

`npm i -D rollup-plugin-json` 或者 `npm install --save-dev rollup-plugin-json`

`src/example3`文件夹下新建 `main.js` 和 `rollup.config.js`

<pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> { version} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../package.json'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`version is <span class="hljs-subst">${version}</span>`</span>);
}

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> json <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-json'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example3/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example3/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        json()
    ]
}</code></pre>

运行命令 `rollup -c src/example3/rollup.config.js`

_扩展：_ json函数可以传入 `include`指定包含文件、`exclude`指定排除文件，`preferConst`如果为`true`,用const接受输出，如果为`false`，用 `var`接收输出。

**注意：** tree-shaking的作用，可以看到打包好bundle.js中只有version输入，package.json 中的其它数据被忽略了。

### example4 {#articleHeader9}

Rollup 不知道怎么处理依赖于从 npm 安装到你的 `node_modules` 文件夹中的软件包。

例如，添加一个简单的依赖 <a href="https://www.npmjs.com/package/the-answer" target="_blank" rel="nofollow noopener noreferrer">the-answer</a>，它输出对生活、宇宙及其它一切的答案，这个简单的包是用来演示如何将npm包汇总到Rollup包中。特别是, 此包在`package.json`中添加了 &#8220;main&#8221; (UMD 格式) 和 &#8220;模块&#8221; (ES2015 格式)这个两个选项。

看一下，按照普通流程引入 `the-answer` 模块会是什么结果。  
`npm install the-answer`  
在 `src/example4` 文件夹下新增 `main.js` 和 `rollup.config.js`

<pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + answer);
}

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example4/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example4/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-comment">// 没有加入任何插件</span>
    ]
}</code></pre>

运行： `rollup -c src/example4/rollup.config.js` 会有一个警告 `Unresolved dependencies` ,[我们](https://www.w3cdoc.com)看一下 打包好的`dist/example4/bundle.js`

<pre class="hljs javascript"><code><span class="hljs-comment">// 截取dist/example4/bundle.js`</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_interopDefault</span> (<span class="hljs-params">ex</span>) </span>{ <span class="hljs-keyword">return</span> (ex && (<span class="hljs-keyword">typeof</span> ex === <span class="hljs-string">'object'</span>) && <span class="hljs-string">'default'</span> <span class="hljs-keyword">in</span> ex) ? ex[<span class="hljs-string">'default'</span>] : ex; }

<span class="hljs-keyword">var</span> answer = _interopDefault(<span class="hljs-built_in">require</span>(<span class="hljs-string">'the-answer'</span>));

<span class="hljs-comment">// 可以看到the-answer并没有打包进来，还得用node的require去请求，然后经过函数转化才能拿到the-answer的输出值</span>
<span class="hljs-comment">// [我们](https://www.w3cdoc.com)可以看一下 node_modules 下的 the-answer 模块暴露出的内容</span>

<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> index;

<span class="hljs-comment">// 这样也可以看出，如果the-answer如果打包进来，应该是：</span>
<span class="hljs-keyword">var</span> answer = <span class="hljs-number">42</span>;</code></pre>

**现在[我们](https://www.w3cdoc.com)需要一个插件 <a href="https://github.com/rollup/rollup-plugin-node-resolve" target="_blank" rel="nofollow noopener noreferrer">rollup-plugin-node-resolve </a>来告诉 Rollup 如何查找外部模块**

`npm i -D rollup-plugin-node-resolve`

将插件加入配置文件中

<pre class="hljs typescript"><code><span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    input: <span class="hljs-string">'src/example4/main.js'</span>,
    output: {
        file: <span class="hljs-string">'dist/example4/bundle.js'</span>,
        format: <span class="hljs-string">'cjs'</span>
    },
    plugins: [
        resolve()
    ]
}</code></pre>

再次运行`rollup -c src/example4/rollup.config.js` 没有警告 ,[我们](https://www.w3cdoc.com)看一下打包好的`dist/example4/bundle.js`

<pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-comment">// the-answer的输出已经打包进来了</span>
<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> () </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + index);
}

<span class="hljs-built_in">module</span>.exports = main;</code></pre>

### example5 {#articleHeader10}

类似 `the-answer` 一些库因为 `package.json`里的module选项可以让[我们](https://www.w3cdoc.com)正常导入的ES6模块。 但是目前，npm中的大多数包都是以CommonJS模块的形式出现的。 在它们更改之前，[我们](https://www.w3cdoc.com)需要将CommonJS模块转换为 ES2015 供 Rollup 处理。

<a href="https://github.com/rollup/rollup-plugin-commonjs" target="_blank" rel="nofollow noopener noreferrer">rollup-plugin-commonjs</a> 插件就是用来将 CommonJS 转换成 ES2015 模块的。通常，这个插件会跟 `rollup-plugin-node-resolve`配合使用，这样就能打包 `node_modules`依赖中的CommonJS。  
`rollup-plugin-commonjs` 应该用在其他插件转换你的模块之前 &#8211; 这是为了防止其他插件的改变破坏CommonJS的检测。

安装：`npm i -D rollup-plugin-commonjs`

在 `src/example5`文件夹下新建 `main.js` 和 `module5.js` `rollup.config.js`， 用来验证插件。

<pre class="hljs javascript"><code><span class="hljs-comment">// module5.js</span>
exports.named = <span class="hljs-string">'cfangxu'</span>;
<span class="hljs-comment">//module.exports = {named: 'cfangxu'} 这个会报错，但是插件文档里说是好的，给他提一个issues</span>

<span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> { named } <span class="hljs-keyword">from</span> <span class="hljs-string">'./module5.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
   <span class="hljs-built_in">console</span>.log(named);
}

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> commonjs <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-commonjs'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
   <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example5/main.js'</span>,
   <span class="hljs-attr">output</span>: {
       <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example5/bundle.js'</span>,
       <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
   },
   <span class="hljs-attr">plugins</span>: [
       resolve({
           <span class="hljs-attr">jsnext</span>: <span class="hljs-literal">true</span>,
           <span class="hljs-attr">main</span>: <span class="hljs-literal">true</span>
       }),
       commonjs()
   ]
}</code></pre>

**注意：** 如果引入的是 `node_modules`里的模块  
例如：`import { named } from 'my-lib';`  
要启用 `namedExports` 选项显示的指定命名输出。当然你也可以整体都引入  
即： `import all from 'my-lib';`

### example6 {#articleHeader11}

external 接受一个模块名称的数组或一个接受模块名称的函数(如果它被视为外部引用（externals）则返回true)

安装 `lodash`： `npm i -S lodash`

在 `src/example6` 文件夹中新建 `main.js` 和 `rollup.config.js`

<pre class="hljs typescript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-comment">// rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    input: <span class="hljs-string">'src/example6/main.js'</span>,
    output: {
        file: <span class="hljs-string">'dist/example6/bundle.js'</span>,
        format: <span class="hljs-string">'umd'</span>,
        name: <span class="hljs-string">'example6'</span>
    },
    plugins: [
        resolve()
    ],
    external: [<span class="hljs-string">'lodash'</span>]
}</code></pre>

配置文件中加入 `external` 就不会把第三方的库打包进[我们](https://www.w3cdoc.com)最后的文件了。可以在 `src/example5/rollup.config.js` 中把 `external` 注释掉看看打包后的文件，会把整个 `lodsh` 打包进来。  
_扩展：_ 如果用到 `lodsh` ，可以使用 <a href="https://github.com/lodash/babel-plugin-lodash" target="_blank" rel="nofollow noopener noreferrer">babel-plugin-lodash</a> 来最优选择lodash模块。

### example7 {#articleHeader12}

[我们](https://www.w3cdoc.com)在项目中有很大概率用到 `babel` ，使用 Babel 和 Rollup 的最简单方法是使用 <a href="https://github.com/rollup/rollup-plugin-babel" target="_blank" rel="nofollow noopener noreferrer">rollup-plugin-babel</a>

安装： `npm i -D rollup-plugin-babel`

在 `src/example7`文件夹下新建 `main.js` `.babelrc` `rollup.config.js`

<pre class="hljs javascript"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> answer <span class="hljs-keyword">from</span> <span class="hljs-string">'the-answer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> () </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`the answer is <span class="hljs-subst">${answer}</span>`</span>);
}

<span class="hljs-comment">//.babelrc</span>
{
    <span class="hljs-string">"presets"</span>: [
        [<span class="hljs-string">"env"</span>,{
            <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>
        }]
    ],
    <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"external-helpers"</span>
    ]
}

<span class="hljs-comment">//rollup.config.js</span>
<span class="hljs-keyword">import</span> resolve <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-node-resolve'</span>;
<span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">input</span>: <span class="hljs-string">'src/example7/main.js'</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">file</span>: <span class="hljs-string">'dist/example7/bundle.js'</span>,
        <span class="hljs-attr">format</span>: <span class="hljs-string">'cjs'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        resolve(),
        babel({
            <span class="hljs-attr">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
            <span class="hljs-attr">externalHelpers</span>: <span class="hljs-literal">true</span>
        })
    ]
}</code></pre>

安装： `npm i -D babel-core babel-preset-env babel-plugin-external-helpers`

运行：`rollup -c src/example7/rollup.config.js`

<pre class="hljs javascript"><code><span class="hljs-comment">// dist/example7/bundle.js</span>
<span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">var</span> index = <span class="hljs-number">42</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span> () </span>{
    <span class="hljs-comment">// 转成了ES5的语法了</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the answer is '</span> + index);
}

<span class="hljs-built_in">module</span>.exports = main;
</code></pre>

_说明_

* `babel-plugin-external-helpers` 这个模块是在 `.babelrc` 文件中体现，目的是让babel转义出来的帮助性代码只在该文件的头部出现一次，而不会再每个引入的模块中加入，如果不想把这些帮助性的代码打包进你的文件，需要在rollup的配置文件中加入 `externalHelpers: true`，这样就会引用一个全局的`babelHelpers` 对象

## 推荐资料 {#articleHeader13}

* <a href="http://www.rollupjs.com/" target="_blank" rel="nofollow noopener noreferrer">rollup.js 中文文档</a>
* <a href="https://github.com/rollup/rollup/wiki/Plugins" target="_blank" rel="nofollow noopener noreferrer">Rollup 插件列表</a>

 [1]: https://segmentfault.com/a/1190000012464333?_ea=3022967
