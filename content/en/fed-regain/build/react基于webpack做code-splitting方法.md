---
title: React基于webpack做code splitting方法





---
<p data-spm-anchor-id="a2c4e.11153940.blogcont71200.i1.3fc97c7461PC2D">
  随着web应用功能越来越复杂，模块打包后体积越来越大，如何实现静态资源的按需加载，最大程度的减小首页加载模块体积和首屏加载时间，成为模块打包工具的必备核心技能。
</p>

webpack作为当下最为流行的模块打包工具，成为了react、vue等众多热门框架的官方推荐打包工具。其提供的Code Splitting（代码分割）特性正是实现模块按需加载的关键方式。

# 什么是Code Splitting {#1}

[官方定义][1]：

> Code splitting is one of the most compelling features of webpack. It allows you to split your code into various bundles which you can then load on demand — like when a user navigates to a matching route, or on an event from the user. This allows for smaller bundles, and allows you to control resource load prioritization, which if used correctly, can have a major impact on your application load time

翻译过来大概意思就是：

> 代码分割功能允许将web应用代码分割为多个独立模块，当用户导航到一个匹配的路由或者派发某些特定事件时，来按需加载这些模块。这样就可以将大型的模块分割为多个小型的模块，实现系统资源加载的最大优化，如果使用得当，能够极大的减少我们的应用首屏加载时间。

# Code splitting 分类 {#2}

## 一、缓存和并行加载的资源分割 {#3}

这种方法是将某些第三方基础框架模块（例如：moment、loadash）或者多个页面的公用模块拆分出来独立打包加载，通常这些模块改动频率很低，将其与业务功能模块拆分出来并行加载，一方面可以最大限度的利用浏览器缓存，另一方面也可以大大降低多页面系统的代码冗余度。

按照资源类型不同又可以分为`js公共资源分割`和`css资源分割`两类。

### 1、js公共资源分割 {#4}

例如：系统应用入口文件`index.js`中使用日期功能库 [momentjs][2]。

**index.js**

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> moment = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'moment'&lt;/span>);
&lt;span class="hljs-built_in">console&lt;/span>.log(moment().format());</code></pre>

**webpack.config.js**

#### 定义多个entry入口 {#5}

* `main`为主入口模块文件
* `vendor`为公共基础库模块，名字可随意设定。称为initial chunk

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);

&lt;span class="hljs-built_in">module&lt;/span>.exports = {
   entry: {
       main: &lt;span class="hljs-string">'./index.js'&lt;/span>,
       vendor: [&lt;span class="hljs-string">'moment'&lt;/span>]
   },
   output: {
       filename: &lt;span class="hljs-string">'[name].js'&lt;/span>,
       path: path.resolve(__dirname, &lt;span class="hljs-string">'dist'&lt;/span>)
   }
}</code></pre>

执行webpack打包命令：

<pre><code class="shell hljs nginx">&lt;span class="hljs-attribute">webpack&lt;/span> --progress --hide-modules</code></pre>

可以看到最终打包为两个js文件 `main.js` 、`vendor.js`，但如果检查者两个文件会发现`moment`模块代码被重复打包到两个文件中，而这肯定不是我们想要的，这时候就需要 webpack的plugin发挥作用了。

<img class="aligncenter" title="vendo" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor.jpg?x-oss-process=image/format,webp" alt="vendo" />

<h4 id="6" data-spm-anchor-id="a2c4e.11153940.blogcont71200.i0.3fc97c7461PC2D">
  使用CommonsChunkPlugin
</h4>

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> webpack = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'webpack'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);

&lt;span class="hljs-built_in">module&lt;/span>.exports = {
   entry: {
       main: &lt;span class="hljs-string">'./index.js'&lt;/span>,
       vendor: [&lt;span class="hljs-string">'moment'&lt;/span>]
   },
   output: {
       filename: &lt;span class="hljs-string">'[chunkhash:8].[name].js'&lt;/span>,
       path: path.resolve(__dirname, &lt;span class="hljs-string">'dist'&lt;/span>)
   },
   plugins: [
       &lt;span class="hljs-keyword">new&lt;/span> webpack.optimize.CommonsChunkPlugin({
            &lt;span class="hljs-comment">// vendor是包括公共的第三方代码，称为initial chunk&lt;/span>
           name: &lt;span class="hljs-string">'vendor'&lt;/span>
       })
   ]
}</code></pre>

执行webpack打包命令，我们发现`moment`只被打包进`vendor.js`中。

<img class="aligncenter" title="vendo" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor2.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor2.jpg?x-oss-process=image/format,webp" alt="vendo" />

#### webpack运行时模块（manifest） {#7}

* 在前面的`步骤2`当中webpack在浏览器中加载js模块的运行时代码块也打包进了`vendor.js`，如果为打包的js文件添加`chunkhash`，则每次修改 `index.js`后再次编译打包，由于运行时代码需要重新编译生成，导致`vendor.js`重新打包并生成新的`chunkhash`。

**webpack运行时代码块部分：**

<img loading="lazy" class="aligncenter" title="webpackjsonp" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/webpackjsonp.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/webpackjsonp.jpg?x-oss-process=image/format,webp" alt="webpackjsonp" width="830" height="539" />

* 实际项目中我们希望修改业务功能后打包时只重新打包业务模块，而不打包第三方公共基础库。这里我们可以将webpack的`运行时代码`提取到独立的`manifest`文件中，这样每次修改业务代码只重新打包生成业务代码模块`main.js`和运行时代码模块`manifest.js`，就实现了业务模块和公共基础库模块的分离。

<img class="aligncenter" title="manifest1" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/manifest1.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/manifest1.jpg?x-oss-process=image/format,webp" alt="manifest1" />

* `names`字段支持以数组格式来指定`基础库模块名称`和`运行时代码模块名称`。

<pre><code class="js hljs javascript">&lt;span class="hljs-built_in">module&lt;/span>.exports = {
   entry: {
       main: &lt;span class="hljs-string">'./index.js'&lt;/span>,
       vendor: &lt;span class="hljs-string">'moment'&lt;/span>
   },
   output: {
       filename: &lt;span class="hljs-string">'[chunkhash:8].[name].js'&lt;/span>,
       path: path.resolve(__dirname, &lt;span class="hljs-string">'dist'&lt;/span>)
   },
   plugins: [
       &lt;span class="hljs-keyword">new&lt;/span> webpack.optimize.CommonsChunkPlugin({
           &lt;span class="hljs-comment">// manifest是包括webpack运行时runtime的块，可以称为entry chunk&lt;/span>
           names: [&lt;span class="hljs-string">'vendor'&lt;/span>, &lt;span class="hljs-string">'manifest'&lt;/span>]
       })
   ]
}</code></pre>

### 2、CSS代码分割 {#8}

* 实际项目开发当中经常使用webpack的`css-loader`来将css样式导入到js模块中，再使用`style-loader`将css样式以`<style>`标签的形式插入到页面当中，但这种方法的缺点就是无法单独加载并缓存css样式文件，页面展现必须依赖于包含css样式的js模块，从而造成页面闪烁的不佳体验。
* 因此有必要将js模块当中import的css模块提取出来，这时候就需要用到`extract-text-webpack-plugin`。

> 注意webpack2.x需要使用相应版本的plugin。

<pre><code class="js hljs javascript">npm i --save-dev extract-text-webpack-plugin@beta </code></pre>

**index.js**

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">import&lt;/span> moment &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'moment'&lt;/span>;
&lt;span class="hljs-keyword">import&lt;/span> &lt;span class="hljs-string">'./index.css'&lt;/span>;

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'moment:'&lt;/span>, moment().format());</code></pre>

**webpack.config.js**

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> ExtractTextPlugin = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'extract-text-webpack-plugin'&lt;/span>);
......
   module: {
       rules: [{
           test: &lt;span class="hljs-regexp">/\.css$/&lt;/span>,
           exclude: &lt;span class="hljs-regexp">/node_modules/&lt;/span>,
           use: ExtractTextPlugin.extract({
               loader: &lt;span class="hljs-string">'css-loader'&lt;/span>,
               options: {}
           })
       }]
   },
   plugins: [
       &lt;span class="hljs-keyword">new&lt;/span> ExtractTextPlugin({
           filename: &lt;span class="hljs-string">'bundle.css'&lt;/span>,
           disable: &lt;span class="hljs-literal">false&lt;/span>,
           allChunks: &lt;span class="hljs-literal">true&lt;/span>
       })
   ]
......</code></pre>

<img title="extract" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/extract.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/extract.jpg?x-oss-process=image/format,webp" alt="extract" />

## 二、按需加载代码分割 {#9}

* 前面介绍的`静态资源分离打包`需要开发者在webpack配置文件中明确分割点来提取独立的公共模块，这种方式适合提取`第三方公共基础库`（vue、react、moment等）以及webpack 的`运行时代码模块`。
* 除此之外webpack还提供了按需加载的代码分割功能，常用于在web应用路由或者用户行为事件逻辑中动态按需加载特定的功能模块`chunk`，这就是我们本文中后面要重点介绍的。

### Code splitting with require.ensure {#10}

[webpack1][3]提供了CommonJS风格的 `require.ensure()`实现模块`chunk`的异步加载，通过`require.ensure()`在js代码中建立分割点，编译打包时webpack会将此分割点所指定的代码模块都打包为一个代码模块chunk，然后通过`jsonp`的方式来按需加载打包后的模块`chunk`。

* require.ensure()语法

<pre><code class="js hljs javascript">&lt;span class="hljs-comment">// 空参数&lt;/span>
&lt;span class="hljs-built_in">require&lt;/span>.ensure([], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">require&lt;/span>)&lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'module-b'&lt;/span>);
});

&lt;span class="hljs-comment">// 依赖模块 "module-a", "module-b"，会和'module-c'打包成一个chunk来加载&lt;/span>
&lt;span class="hljs-comment">// 不同的分割点可以使用同一个chunkname，这样可以保证不同分割点的代码模块打包为一个chunk&lt;/span>
&lt;span class="hljs-built_in">require&lt;/span>.ensure([&lt;span class="hljs-string">"module-a"&lt;/span>, &lt;span class="hljs-string">"module-b"&lt;/span>], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">require&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> a = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"module-a"&lt;/span>);
    &lt;span class="hljs-keyword">var&lt;/span> b = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"module-b"&lt;/span>);
    &lt;span class="hljs-keyword">var&lt;/span> c = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'module-c'&lt;/span>);
},&lt;span class="hljs-string">"custom-chunk-name"&lt;/span>);</code></pre>

### Code Splitting with ES2015 {#11}

[webpack2][4] 的ES2015 loader中提供了`import()`方法在运行时动态按需加载`ES2015 Module`。

webpack将`import()`看做一个分割点并将其请求的module打包为一个独立的`chunk`。`import()`以模块名称作为参数名并且返回一个`Promise`对象。

* import() 语法

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">"./module"&lt;/span>).then(&lt;span class="hljs-built_in">module&lt;/span> =&gt; {
    &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>.default;
}).catch(err =&gt; {
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">"Chunk loading failed"&lt;/span>);
});</code></pre>

* import()使用须知
  * [import()][5]目前还是处于TC39 proposal阶段。
  * 在Babel中使用`import()`方法，需要安装 [dynamic-import][6]插件并选择使用`babel-preset-stage-3`处理解析错误。
* 动态表达式 [Dynamic expressions][7]`import()`中的传参可支持部分表达式的写法了，如果之前有接触过CommonJS中`require()`表达式写法，应该不会对此感到陌生。它的操作其实和 CommonJS 类似，给所有可能的文件创建一个环境，当你传递那部分代码的模块还不确定的时候，webpack 会自动生成所有可能的模块，然后根据需求加载。这个特性在前端路由的时候很有用，可以实现按需加载资源。`import()`会针对每一个读取到的module创建独立的`chunk`。
    <pre><code class="js hljs javascript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">route&lt;/span>(&lt;span class="hljs-params">path, query&lt;/span>) &lt;/span>{

  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">`./routes/&lt;span class="hljs-subst">${path}&lt;/span>/route`&lt;/span>)
    .then(route =&gt; &lt;span class="hljs-keyword">new&lt;/span> route.Route(query));
}</code></pre>

### bundle-loader {#12}

[bundle-loader][8] 是webpack官方提供的`loader`，其作用就是对`require.ensure`的抽象封装为一个`wrapper`函数来动态加载模块代码，从而避免`require.ensure`将分割点所有模块代码打包为一个`chunk`体积过大的问题。

* 使用语法：

<pre><code class="js hljs javascript">&lt;span class="hljs-comment">// 在require bundle时，浏览器会立即加载&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> waitForChunk = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"bundle!./file.js"&lt;/span>);

&lt;span class="hljs-comment">// 使用lazy模式，浏览器并不立即加载，只在调用wrapper函数才加载&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> waitForChunk = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"bundle?lazy!./file.js"&lt;/span>);

&lt;span class="hljs-comment">// 等待加载，在回调中使用&lt;/span>
waitForChunk(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">file&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> file = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"./file.js"&lt;/span>);
});</code></pre>

* wrapper函数：

**默认普通模式wrapper：**

<pre><code class="js hljs javascript">
&lt;span class="hljs-keyword">var&lt;/span> cbs = [],data;
&lt;span class="hljs-built_in">module&lt;/span>.exports = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">cb&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span>(cbs) cbs.push(cb);
    &lt;span class="hljs-keyword">else&lt;/span> cb(data);
},
&lt;span class="hljs-built_in">require&lt;/span>.ensure([], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">require&lt;/span>) &lt;/span>{
    data = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./file.js'&lt;/span>);
    &lt;span class="hljs-keyword">var&lt;/span> callbacks = cbs;
    cbs = &lt;span class="hljs-literal">null&lt;/span>;
    &lt;span class="hljs-keyword">for&lt;/span>(&lt;span class="hljs-keyword">var&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>, l = callbacks.length; i &lt; l; i++) {
        callbacks[i](data);
      }
});</code></pre>

**lazy模式wrapper：**

<pre><code class="js hljs javascript">&lt;span class="hljs-built_in">module&lt;/span>.exports = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">cb&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">require&lt;/span>.ensure([], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">require&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> app = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./file.js'&lt;/span>);
    cb(app);
  });
};</code></pre>

> 使用`bundle-loader`在代码中require文件的时候只是引入了`wrapper`函数，而且因为每个文件都会产生一个分离点，导致产生了多个打包文件，而打包文件的载入只有在条件命中的情况下才产生,也就可以按需加载。

* 支持自定义Chunk名称：

<pre><code class="js hljs javascript">&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"bundle-loader?lazy&name=my-chunk!./file.js"&lt;/span>);</code></pre>

### promise-loader {#13}

[promise-loader][9]是`bundle-loader`的lazy模式的变种，其核心就是使用`Promise`语法来替代原先的`callback`回调机制。与`bundle-loader`类似，`require`模块的时候只是引入了`wrapper`函数，不同之处在于调用函数时得到的是一个对模块引用的`promise`对象，需要在`then`方法中获取模块对象，并可以使用`catch`方法来捕获模块加载中的错误。

`promise-loader`支持使用第三方Promise基础库（如：[bluebird][10]）或者使用`global`参数来指定使用运行环境已经存在的Promise库。

* 使用语法：

<pre><code class="js hljs javascript">&lt;span class="hljs-comment">// 使用Bluebird promise库&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> load = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"promise?bluebird!./file.js"&lt;/span>);

&lt;span class="hljs-comment">// 使用全局Promise对象&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> load = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"promise?global!./file.js"&lt;/span>);

load().then(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">file&lt;/span>) &lt;/span>{

});
</code></pre>

* wrapper函数：

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span> = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'bluebird'&lt;/span>);

&lt;span class="hljs-built_in">module&lt;/span>.exports = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">namespace&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">resolve&lt;/span>) &lt;/span>{
    &lt;span class="hljs-built_in">require&lt;/span>.ensure([], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">require&lt;/span>) &lt;/span>{
      resolve[&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./file.js'&lt;/span>](namespace)));
    });
  });
}</code></pre>

### es6-promise-loader {#14}

[es6-promise-loader][11]相比 `promise-loader`区别就在于使用原生的`ES6 Promise`对象。

* 使用语法：

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">var&lt;/span> load = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"es6-promise!./file.js"&lt;/span>);

load(namespace).then(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">file&lt;/span>) &lt;/span>{
    &lt;span class="hljs-built_in">console&lt;/span>.log(file);
});</code></pre>

* wrapper函数：

<pre><code class="js hljs javascript">&lt;span class="hljs-built_in">module&lt;/span>.exports = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">namespace&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">resolve&lt;/span>) &lt;/span>{
    &lt;span class="hljs-built_in">require&lt;/span>.ensure([], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">require&lt;/span>) &lt;/span>{
      resolve[&lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./file.js'&lt;/span>](namespace)));
    });
  });
}</code></pre>

# React按需加载实现方案 {#15}

## React router动态路由 {#16}

`react-router`的 标签有一个叫做[getComponent][12]的异步的方法去获取组件。他是一个function接受两个参数，分别是location和callback。当react-router执行回调函数 callback(null, ourComponent)时，路由只渲染指定组件ourComponent

* getComponent异步方法

**使用语法：**

<pre><code class="js hljs javascript">&lt;Router history={history}&gt;
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span>
        &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">"/"&lt;/span>
        &lt;span class="hljs-attr">getComponent&lt;/span>=&lt;span class="hljs-string">{(nextState,&lt;/span> &lt;span class="hljs-attr">callback&lt;/span>) =&gt;&lt;/span> {
            callback(null, HomePage)
        }}
    /&gt;
     &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span>
        &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">"/faq"&lt;/span>
        &lt;span class="hljs-attr">getComponent&lt;/span>=&lt;span class="hljs-string">{(nextState,&lt;/span> &lt;span class="hljs-attr">callback&lt;/span>) =&gt;&lt;/span> {
          callback(null, FAQPage);
        }}
    /&gt;
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Router&lt;/span>&gt;&lt;/span>&lt;/span></code></pre>

这些组件会在需要的时候异步加载。这些组件仍然会在同一个文件中，并且你的应用看起来不会有任何不同。

* require.ensure

webpack提供的`require.ensure`可以定义分割点来打包独立的chunk，再配合`react-router`的`getComponent`方法就可以实现React组件的按需加载，具体可参照以下文章：

  1. [基于Webpack 2的React组件懒加载][13]
  2. [react-router动态路由与Webpack分片thunks][14]

## React懒加载组件 {#17}

文章前面提到使用React动态路由来按需加载react组件，但实际项目开发中很多时候不需要或者没法引入react-router，我们就可以使用webpack官方封装的`React懒加载组件`来动态加载指定的React组件，源代码见 [LazilyLoad][15]。

### LazilyLoad懒加载组件 {#18}

* LazilyLoad使用：

**webpack2.x** `import`方法异步加载ES2015模块文件，返回一个Promise对象。

<pre><code class="js hljs javascript">&lt;LazilyLoad modules={{
  TodoHandler: () =&gt; importLazy(&lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'./components/TodoHandler'&lt;/span>)),
  TodoMenuHandler: () =&gt; importLazy(&lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'./components/TodoMenuHandler'&lt;/span>)),
  TodoMenu: () =&gt; importLazy(&lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'./components/TodoMenu'&lt;/span>)),
}}&gt;
{({TodoHandler, TodoMenuHandler, TodoMenu}) =&gt; (
  &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">TodoHandler&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">TodoMenuHandler&lt;/span>&gt;&lt;/span>
      &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">TodoMenu&lt;/span> /&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">TodoMenuHandler&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">TodoHandler&lt;/span>&gt;&lt;/span>
)}
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">LazilyLoad&lt;/span>&gt;&lt;/span>&lt;/span></code></pre>

**webpack 1.x** 使用前文中提到的`promise-loader`或者`es6-promise-loader`封装按需加载组件。

<pre><code class="js hljs javascript">&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">App&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">React&lt;/span>.&lt;span class="hljs-title">Component&lt;/span> &lt;/span>{

   render() {
        &lt;span class="hljs-keyword">return&lt;/span> (
            &lt;div&gt;
                &lt;LazilyLoad modules={{
                    LoadedLate: () =&gt; require('es6-promise!./lazy/LoadedLate')(),
                    LoadedLate2: () =&gt; require('es6-promise!./lazy/LoadedLate2')()
                }}&gt;
                    {({LoadedLate,LoadedLate2}) =&gt; (
                        &lt;div&gt;
                            &lt;LoadedLate /&gt;
                            &lt;LoadedLate2 /&gt;
                        &lt;/div&gt;
                    )}
                &lt;/LazilyLoad&gt;
            &lt;/div&gt;
        );
    }</code></pre>

* `importLazy`方法是为了兼容Babel/ES2015模块，返回模块的`default`属性。

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">const&lt;/span> importLazy = (promise) =&gt; (
    promise.then((result) =&gt; result.default || result)
);</code></pre>

## React高阶组件懒加载 {#19}

> [高阶组件][16] (Higher Order Component)就是一个 React 组件包裹着另外一个 React 组件。

这种模式通常使用工厂函数来实现，基本上是一个`类工厂`。React高阶组件的调用方式与普通的React组件完全一致。

### 封装懒加载组件LazilyLoad的高阶组件工厂函数 {#20}

**LazilyLoadFactory**

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">const&lt;/span> LazilyLoadFactory = (Component, modules) =&gt; {
    &lt;span class="hljs-keyword">return&lt;/span> (props) =&gt; (
        &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">LazilyLoad&lt;/span> &lt;span class="hljs-attr">modules&lt;/span>=&lt;span class="hljs-string">{modules}&lt;/span>&gt;&lt;/span>
            {(mods) =&gt; &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Component&lt;/span> {&lt;span class="hljs-attr">...mods&lt;/span>} {&lt;span class="hljs-attr">...props&lt;/span>} /&gt;&lt;/span>}
        &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">LazilyLoad&lt;/span>&gt;&lt;/span>
    );
};&lt;/span></code></pre>

### 使用高阶组件实现按需加载 {#21}

#### webpack 2.x {#22}

<pre><code class="js hljs javascript">&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Load_jQuery&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">React&lt;/span>.&lt;span class="hljs-title">Component&lt;/span> &lt;/span>{

    componentDidMount() {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'Load_jQuery props:'&lt;/span>, &lt;span class="hljs-keyword">this&lt;/span>.props);
    }

    render() {
        &lt;span class="hljs-keyword">return&lt;/span> (
            &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">ref&lt;/span>=&lt;span class="hljs-string">{(ref)&lt;/span> =&gt;&lt;/span> this.props.$(ref).css('background-color', 'red')}&gt;
                Hello jQuery
            &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
        );
    }
};

&lt;span class="hljs-comment">// 使用工厂函数封装Load_jQuery为高阶组件，将异步加载的jQuery模块对象以props的形式来获取并使用&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> LazilyLoadFactory(Load_jQuery, {
    $: () =&gt; &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'jquery'&lt;/span>)
});</code></pre>

#### webpack 1.x {#23}

<pre><code class="js hljs javascript">&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Load_jQuery&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">React&lt;/span>.&lt;span class="hljs-title">Component&lt;/span> &lt;/span>{

   render() {
        &lt;span class="hljs-keyword">return&lt;/span> (
            &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">ref&lt;/span>=&lt;span class="hljs-string">{(ref)&lt;/span> =&gt;&lt;/span> this.props.$(ref).css('background-color', 'red')}&gt;
                Hello jQuery
            &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
        );
    }
};

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> LazilyLoadFactory(Load_jQuery, {
    $: () =&gt; &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'es6-promise!jquery'&lt;/span>)()
});</code></pre>

### ES Decorator {#24}

除了工厂函数方式扩展实现高阶组件，还可通过 ES草案中的 Decorator(<https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)> 语法来实现。Decorator 可以通过返回特定的 descriptor 来”修饰” 类属性，也可以直接”修饰”一个类。即传入一个已有的类，通过 Decorator 函数”修饰”成了一个新的类。

* 使用方法：

<pre><code class="js hljs javascript">&lt;span class="hljs-comment">// ES Decorators函数实现高阶组件封装&lt;/span>
&lt;span class="hljs-comment">// 参考 http://technologyadvice.github.io/es7-decorators-babel6/&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> LazilyLoadDecorator = (Component) =&gt; {

    &lt;span class="hljs-keyword">return&lt;/span> LazilyLoadFactory(Component, {
        $: () =&gt; &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'jquery'&lt;/span>)(),
    });
};

&lt;span class="hljs-comment">// ES Decorators语法&lt;/span>
&lt;span class="hljs-comment">// 需要依赖babel-plugin-transform-decorators-legacy&lt;/span>
&lt;span class="hljs-comment">// babel-loader配置使用plugins: ["transform-decorators-legacy"]&lt;/span>
@LazilyLoadDecorator
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> &lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Load_jQuery&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">React&lt;/span>.&lt;span class="hljs-title">Component&lt;/span> &lt;/span>{

    componentDidMount() {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'Load_jQuery props:'&lt;/span>, &lt;span class="hljs-keyword">this&lt;/span>.props);

    }

    render() {
        &lt;span class="hljs-keyword">return&lt;/span> (
            &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">ref&lt;/span>=&lt;span class="hljs-string">{(ref)&lt;/span> =&gt;&lt;/span> this.props.$(ref).css('background-color', 'red')}&gt;
                Hello jQuery
            &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
        );
    }

};</code></pre>

### 引用被高阶组件包裹的普通组件 {#25}

<pre><code class="js hljs javascript">&lt;span class="hljs-keyword">import&lt;/span> Load_jQuery &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./js/Load_jQuery'&lt;/span>;

&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">App&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">React&lt;/span>.&lt;span class="hljs-title">Component&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">constructor&lt;/span>() {
        &lt;span class="hljs-keyword">super&lt;/span>(...arguments);
        &lt;span class="hljs-keyword">this&lt;/span>.state = {
            load: &lt;span class="hljs-literal">false&lt;/span>,
        };
        &lt;span class="hljs-keyword">this&lt;/span>.handleClick = &lt;span class="hljs-keyword">this&lt;/span>.handleClick.bind(&lt;span class="hljs-keyword">this&lt;/span>);
    }

    handleClick() {
        &lt;span class="hljs-keyword">this&lt;/span>.setState({
            load: !&lt;span class="hljs-keyword">this&lt;/span>.state.load,
        });
    }

    render() {
        &lt;span class="hljs-keyword">return&lt;/span> (
            &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
                &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
                    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">a&lt;/span>
                        &lt;span class="hljs-attr">style&lt;/span>=&lt;span class="hljs-string">{{&lt;/span> &lt;span class="hljs-attr">color:&lt;/span> '&lt;span class="hljs-attr">blue&lt;/span>', &lt;span class="hljs-attr">cursor:&lt;/span> '&lt;span class="hljs-attr">pointer&lt;/span>' }}
                        &lt;span class="hljs-attr">onClick&lt;/span>=&lt;span class="hljs-string">{this.handleClick}&lt;/span>&gt;&lt;/span>点击加载jQuery&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">a&lt;/span>&gt;&lt;/span>
                &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>

                {this.state.load ?
                    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Load_jQuery&lt;/span> /&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
                    : null
                }
            &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
        );
    }&lt;/span></code></pre>

### 基于webpack 1.x实现react组件的懒加载示例 {#26}

* [示例代码][17]
* [在线demo][18]
* 按需加载请求

<img loading="lazy" class="aligncenter" title="lazyloaded" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/lazyloaded.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/lazyloaded.png?x-oss-process=image/format,webp" alt="lazyloaded" width="742" height="236" />

&nbsp;

<div>
  <div>
    <h1>
      react-router4代码分割
    </h1>

    <blockquote>
      <p>
        react-router4官方文档： <a href="https://link.jianshu.com?t=https://reacttraining.com/react-router/web/guides/code-splitting" target="_blank" rel="nofollow noopener noreferrer">https://reacttraining.com/react-router/web/guides/code-splitting</a>
      </p>
    </blockquote>
    
    <p>
      对于SPA项目，出于加载速度的考虑，肯定不能在页面初始化的时候加载全部js文件，因此需要将代码分块，也就是所谓的code splitting，我这里基于react-router4.1.1展示一个code split的例子，当然，你也可以参考<a href="https://link.jianshu.com?t=https://reacttraining.com/react-router/web/guides/code-splitting" target="_blank" rel="nofollow noopener noreferrer">react官方文档</a>
    </p>
    
    <h2>
      思路解析
    </h2>
    
    <p>
      react-router4是对之前react-router的一次大改，按照官方的说法，是将路由的问题转变成了react组件的问题，所以在react-router4里面，不同于以往使用require.ensure，我们使用一些其他办法异步的请求组件的js文件。
    </p>
    
    <h3>
      方案A 使用bundle-loader
    </h3>
    
    <blockquote>
      <p>
        bundle-loader git地址：<a href="https://link.jianshu.com?t=https://github.com/webpack-contrib/bundle-loader" target="_blank" rel="nofollow noopener noreferrer">https://github.com/webpack-contrib/bundle-loader</a>
      </p>
    </blockquote>
    
    <p>
      先仿着官方的示例先写一个Bundle组件，简化了一下，大概会是这样的
    </p>
    
    <pre class="hljs javascript"><code class="javascript">
{&lt;span class="hljs-comment">/*
// 调用示例
&lt;Bundle load={require('bundle-loader?lazy!./somefile.js')}&gt;
    {(Cmp) =&gt; &lt;Cmp&gt;&lt;/Cmp&gt;}
&lt;/Bundle&gt;
*/&lt;/span>}

&lt;span class="hljs-comment">// Bundle.js&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> React, { Component } &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>

&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Bundle&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">Component&lt;/span> &lt;/span>{
  &lt;span class="hljs-keyword">constructor&lt;/span>() {
    &lt;span class="hljs-keyword">super&lt;/span>()
    &lt;span class="hljs-keyword">this&lt;/span>.state = {
      &lt;span class="hljs-attr">mod&lt;/span>: &lt;span class="hljs-literal">null&lt;/span>
    }
  }

  componentDidMount() {
    &lt;span class="hljs-keyword">this&lt;/span>.props.load(&lt;span class="hljs-function">(&lt;span class="hljs-params">mod&lt;/span>) =&gt;&lt;/span> {
      &lt;span class="hljs-keyword">this&lt;/span>.setState({
        &lt;span class="hljs-attr">mod&lt;/span>: mod.default || mod
      })
    })
  }

  render() {
    &lt;span class="hljs-keyword">return&lt;/span> (
      &lt;span class="hljs-keyword">this&lt;/span>.state.mod ? &lt;span class="hljs-keyword">this&lt;/span>.props.children(&lt;span class="hljs-keyword">this&lt;/span>.state.mod) : &lt;span class="hljs-literal">null&lt;/span>
    )
  }
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> Bundle
</code></pre>

    <p>
      在被传入的load方法被调用的时候，相应的js文件才会被请求和加载
    </p>
    
    <p>
      然后在入口的路由文件里面这样写（假设我们有两个组件,Cp1, Cp2）
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">import&lt;/span> React &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> {
  BrowserRouter,
  Route
} &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react-router-dom'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> Bundle &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./bundle'&lt;/span>

&lt;span class="hljs-keyword">let&lt;/span> CodeSplit = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">BrowserRouter&lt;/span>&gt;&lt;/span>
      &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">{&lt;/span>'/&lt;span class="hljs-attr">cp1&lt;/span>'} &lt;span class="hljs-attr">render&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> {
          return (&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Bundle&lt;/span> &lt;span class="hljs-attr">load&lt;/span>=&lt;span class="hljs-string">{require(&lt;/span>'&lt;span class="hljs-attr">bundle-loader&lt;/span>?&lt;span class="hljs-attr">lazy&lt;/span>!&lt;span class="hljs-attr">.&lt;/span>/&lt;span class="hljs-attr">cp1&lt;/span>')}&gt;&lt;/span>
            {(Cp1) =&gt; &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Cp1&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Cp1&lt;/span>&gt;&lt;/span>}
          &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Bundle&lt;/span>&gt;&lt;/span>)
        }
        }&gt;&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>

        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">{&lt;/span>'/&lt;span class="hljs-attr">cp2&lt;/span>'} &lt;span class="hljs-attr">render&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> {
          return (&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Bundle&lt;/span> &lt;span class="hljs-attr">load&lt;/span>=&lt;span class="hljs-string">{require(&lt;/span>'&lt;span class="hljs-attr">bundle-loader&lt;/span>?&lt;span class="hljs-attr">lazy&lt;/span>!&lt;span class="hljs-attr">.&lt;/span>/&lt;span class="hljs-attr">cp2&lt;/span>')}&gt;&lt;/span>
            {(Cp2) =&gt; &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Cp2&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Cp2&lt;/span>&gt;&lt;/span>}
          &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Bundle&lt;/span>&gt;&lt;/span>)
        }
        }&gt;&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>
      &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">BrowserRouter&lt;/span>&gt;&lt;/span>&lt;/span>
  )
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> CodeSplit
</code></pre>

    <p>
      这样，代码分割就完成了。
    </p>
    
    <h4>
      注意
    </h4>
    
    <p>
      这里有一个小坑，如果你跟我一样使用的是create-react-app的话，你会发现，在运行代码的时候，会报这个错误
    </p>
    
    <pre class="hljs python"><code class="python">Line &lt;span class="hljs-number">35&lt;/span>:  Unexpected &lt;span class="hljs-string">'!'&lt;/span> &lt;span class="hljs-keyword">in&lt;/span> &lt;span class="hljs-string">'bundle-loader?lazy!./cp1'&lt;/span>. Do &lt;span class="hljs-keyword">not&lt;/span> use &lt;span class="hljs-keyword">import&lt;/span> syntax to configure webpack loaders  &lt;span class="hljs-keyword">import&lt;/span>/no-webpack-loader-syntax

Line &lt;span class="hljs-number">42&lt;/span>:  Unexpected &lt;span class="hljs-string">'!'&lt;/span> &lt;span class="hljs-keyword">in&lt;/span> &lt;span class="hljs-string">'bundle-loader?lazy!./cp2'&lt;/span>. Do &lt;span class="hljs-keyword">not&lt;/span> use &lt;span class="hljs-keyword">import&lt;/span> syntax to configure webpack loaders  &lt;span class="hljs-keyword">import&lt;/span>/no-webpack-loader-syntax
</code></pre>

    <p>
      这是因为create-react-app不支持webpack-loader，具体的可以看看这个issue
    </p>
    
    <blockquote>
      <p>
        why I can&#8217;t use bundle-loader like this: <a href="https://link.jianshu.com?t=https://github.com/facebookincubator/create-react-app/issues/2477" target="_blank" rel="nofollow noopener noreferrer">https://github.com/facebookincubator/create-react-app/issues/2477</a>
      </p>
    </blockquote>
    
    <p>
      解决办法也很简单，采用方案B
    </p>
    
    <h3>
      方案B 使用import()
    </h3>
    
    <p>
      import() 属于es的一个proposal，也就是提案，还没有正式立项，所以具体会有什么问题我这里也不清楚，不过babel已经支持，所以我们这里可以尝试使用，将之前使用bundle-loader的例子改造一下
    </p>
    
    <p>
      因为import返回一个promise，所以我们这里将componentDidMount变成一个async函数
    </p>
    
    <pre class="hljs javascript"><code class="javascript">{&lt;span class="hljs-comment">/*
// 调用方法
&lt;Bundle load={() =&gt; import(./somefile.js)}&gt;&lt;/Bundle&gt;
*/&lt;/span>}

&lt;span class="hljs-keyword">import&lt;/span> React, { Component } &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>

&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Bundle&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">Component&lt;/span> &lt;/span>{
  &lt;span class="hljs-keyword">constructor&lt;/span>() {
    &lt;span class="hljs-keyword">super&lt;/span>()
    &lt;span class="hljs-keyword">this&lt;/span>.state = {
      &lt;span class="hljs-attr">mod&lt;/span>: &lt;span class="hljs-literal">null&lt;/span>
    }
  }

  &lt;span class="hljs-keyword">async&lt;/span> componentDidMount() {
    &lt;span class="hljs-keyword">const&lt;/span> {&lt;span class="hljs-attr">default&lt;/span>: mod} = &lt;span class="hljs-keyword">await&lt;/span> &lt;span class="hljs-keyword">this&lt;/span>.props.load()

    &lt;span class="hljs-keyword">this&lt;/span>.setState({
      &lt;span class="hljs-attr">mod&lt;/span>: mod.default || mod
    })
  }

  render() {
    &lt;span class="hljs-keyword">return&lt;/span> (
      &lt;span class="hljs-keyword">this&lt;/span>.state.mod ? &lt;span class="hljs-keyword">this&lt;/span>.props.children(&lt;span class="hljs-keyword">this&lt;/span>.state.mod) : &lt;span class="hljs-literal">null&lt;/span>
    )
  }
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> Bundle
</code></pre>

    <p>
      然后在入口文件的路由里面这么用
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">import&lt;/span> React &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> {
  BrowserRouter,
  Route
} &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react-router-dom'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> Bundle &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./bundle'&lt;/span>

&lt;span class="hljs-keyword">let&lt;/span> CodeSplit = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">BrowserRouter&lt;/span>&gt;&lt;/span>
      &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">{&lt;/span>'/&lt;span class="hljs-attr">cp1&lt;/span>'} &lt;span class="hljs-attr">render&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> {
          return (&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Bundle&lt;/span> &lt;span class="hljs-attr">load&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> import('./cp1')}&gt;
            {(Cp1) =&gt; &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Cp1&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Cp1&lt;/span>&gt;&lt;/span>}
          &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Bundle&lt;/span>&gt;&lt;/span>)
        }
        }&gt;&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>

        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">{&lt;/span>'/&lt;span class="hljs-attr">cp2&lt;/span>'} &lt;span class="hljs-attr">render&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> {
          return (&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Bundle&lt;/span> &lt;span class="hljs-attr">load&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> import('./cp2')}&gt;
            {(Cp2) =&gt; &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Cp2&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Cp2&lt;/span>&gt;&lt;/span>}
          &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Bundle&lt;/span>&gt;&lt;/span>)
        }
        }&gt;&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>
      &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">BrowserRouter&lt;/span>&gt;&lt;/span>&lt;/span>
  )
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> CodeSplit
</code></pre>

    <p>
      OK,一个大致的代码分割功能差不多就完成了
    </p>
    
    <h3>
      方案B改进版
    </h3>
    
    <p>
      方案B虽然实现了我们异步加载组件的需求，但是调用还是显得比较麻烦，我们需要一种更优雅的方式来实现异步加载，同时还希望能传递参数给组件和自定义组件在加载时候的显示效果，所以这里对方案B进一步进行封装
    </p>
    
    <p>
      因为代码比较简单，所以我这里直接把我项目里的代码贴过来了
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-comment">// async-component.js&lt;/span>
&lt;span class="hljs-comment">/**

* 用于react router4 code splitting
 */&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> React, {Component} &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>

&lt;span class="hljs-comment">/**

* @param {Function} loadComponent e.g: () =&gt; import('./component')
* @param {ReactNode} placeholder  未加载前的占位
 */&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> (loadComponent, placeholder = &lt;span class="hljs-literal">null&lt;/span>) =&gt; {
  &lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">AsyncComponent&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">Component&lt;/span> &lt;/span>{
    unmount = &lt;span class="hljs-literal">false&lt;/span>

    &lt;span class="hljs-keyword">constructor&lt;/span>() {
      &lt;span class="hljs-keyword">super&lt;/span>()

      &lt;span class="hljs-keyword">this&lt;/span>.state = {
        &lt;span class="hljs-attr">component&lt;/span>: &lt;span class="hljs-literal">null&lt;/span>
      }
    }

    componentWillUnmount() {
      &lt;span class="hljs-keyword">this&lt;/span>.unmount = &lt;span class="hljs-literal">true&lt;/span>
    }

    &lt;span class="hljs-keyword">async&lt;/span> componentDidMount() {
      &lt;span class="hljs-keyword">const&lt;/span> {&lt;span class="hljs-attr">default&lt;/span>: component} = &lt;span class="hljs-keyword">await&lt;/span> loadComponent()

      &lt;span class="hljs-keyword">if&lt;/span>(&lt;span class="hljs-keyword">this&lt;/span>.unmount) &lt;span class="hljs-keyword">return&lt;/span>

      &lt;span class="hljs-keyword">this&lt;/span>.setState({
        &lt;span class="hljs-attr">component&lt;/span>: component
      })
    }

    render() {
      &lt;span class="hljs-keyword">const&lt;/span> C = &lt;span class="hljs-keyword">this&lt;/span>.state.component

      &lt;span class="hljs-keyword">return&lt;/span> (
        C ? &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">C&lt;/span> {&lt;span class="hljs-attr">...this.props&lt;/span>}&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">C&lt;/span>&gt;&lt;/span>&lt;/span> : placeholder
      )
    }
  }

  &lt;span class="hljs-keyword">return&lt;/span> AsyncComponent
}
</code></pre>

    <p>
      整体思路和之前的代码是一致的<br /> 然后调用的时候只需这么写
    </p>

    <p>
      Demo组件，就是一个简单的无状态组件
    </p>

    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-comment">// demo.jsx&lt;/span>

&lt;span class="hljs-keyword">import&lt;/span> React &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'react'&lt;/span>

&lt;span class="hljs-keyword">const&lt;/span> Demo = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>demo&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>&lt;/span>
  )
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> Demo
</code></pre>

    <p>
      调用示例
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">import&lt;/span> asyncComponent &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./async-component'&lt;/span>

&lt;span class="hljs-comment">// 获取到异步组件&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> AsyncDemo = asyncComponent(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'./demo'&lt;/span>))

&lt;span class="hljs-comment">//...&lt;/span>
render() {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">"/demo"&lt;/span> &lt;span class="hljs-attr">component&lt;/span>=&lt;span class="hljs-string">{AsyncDemo}&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>&lt;/span>
  )
}

&lt;span class="hljs-comment">// 如果要传参&lt;/span>
render() {
  &lt;span class="hljs-keyword">return&lt;/span> (
    &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">Route&lt;/span> &lt;span class="hljs-attr">path&lt;/span>=&lt;span class="hljs-string">"/demo"&lt;/span> &lt;span class="hljs-attr">render&lt;/span>=&lt;span class="hljs-string">{()&lt;/span> =&gt;&lt;/span> {
        &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">AsyncComponent&lt;/span> &lt;span class="hljs-attr">test&lt;/span>=&lt;span class="hljs-string">"hello"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">AsyncComponent&lt;/span>&gt;&lt;/span>
    }}&gt;&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">Route&lt;/span>&gt;&lt;/span>&lt;/span>
  )
}
</code></pre>

    <p>
      参数也可以通过asyncComponent函数进行传递，不过需要更改下async-component.js的代码，因为比较简单，所以这里就不展示了
    </p>
  </div>
</div>

# 参考资料 {#27}

* [基于Webpack 2的React组件懒加载][13]
* [Lazy Loading &#8211; React][19]
* [es6-promise-loader][11]
* [promise-loader][9]
* [bundle-loader][8]
* [es6-modules-overview][20]
* [Implicit Code Splitting and Chunk Loading with React Router and Webpack][21]
* [Code Splitting &#8211; Using require.ensure][3]

<li data-spm-anchor-id="a2c4e.11153940.blogcont71200.i2.3fc97c7461PC2D">
  <a href="https://webpack.js.org/guides/migrating/#code-splitting-with-es2015">Code Splitting with ES2015</a>
</li>

 [1]: https://webpack.js.org/guides/code-splitting/
 [2]: https://www.npmjs.com/package/moment
 [3]: https://webpack.js.org/guides/code-splitting-require/
 [4]: https://webpack.js.org/guides/migrating/#code-splitting-with-es2015
 [5]: https://github.com/tc39/proposal-dynamic-import
 [6]: http://babeljs.io/docs/plugins/syntax-dynamic-import/
 [7]: https://webpack.js.org/guides/migrating/#dynamic-expressions
 [8]: https://github.com/webpack/bundle-loader
 [9]: https://github.com/gaearon/promise-loader
 [10]: https://github.com/petkaantonov/bluebird/
 [11]: https://github.com/gdi2290/es6-promise-loader
 [12]: https://github.com/ReactTraining/react-router/blob/master/docs/API.md#getcomponentsnextstate-callback
 [13]: https://zhuanlan.zhihu.com/p/24595585
 [14]: http://robin-front.github.io/2016/04/18/react-router%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E4%B8%8EWebpack%E5%88%86%E7%89%87thunks/
 [15]: https://webpack.js.org/guides/lazy-load-react/#the-code
 [16]: https://zhuanlan.zhihu.com/p/24776678?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io
 [17]: http://gitlab.alibaba-inc.com/miaosen.fms/webpack-react-lazy-load/tree/master
 [18]: http://site.alibaba.net/miaosen.fms/webpack-react-lazy-load/
 [19]: https://webpack.js.org/guides/lazy-load-react/
 [20]: https://github.com/systemjs/systemjs/blob/master/docs/es6-modules-overview.md
 [21]: http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/
