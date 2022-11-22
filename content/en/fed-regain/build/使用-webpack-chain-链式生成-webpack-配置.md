---
title: 使用 Webpack-chain 链式生成 webpack 配置







---
<div>
  <p>
    vuepress 有三套 webpack 配置：基础配置、dev 配置、build 配置，看似和普通的一个前端项目也没什么差别，但它使用 webpack-chain 生成配置而不是传统的写死配置。
  </p>
  
  <blockquote>
    <p>
      相关源码见 <a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createBaseConfig.js" target="_blank" rel="nofollow noopener noreferrer">createBaseConfig.js</a>、<a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createClientConfig.js" target="_blank" rel="nofollow noopener noreferrer">createClientConfig</a>、<a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createServerConfig.js" target="_blank" rel="nofollow noopener noreferrer">createServerConfig</a>。
    </p>
  </blockquote>
  
  <h3>
    webpack-chain 简介
  </h3>
  
  <p>
    API: <a href="https://github.com/neutrinojs/webpack-chain">https://github.com/neutrinojs/webpack-chain</a>
  </p>
  
  <h4>
    链式包装器
  </h4>
  
  <p>
    引入 webpack-chain 后，我们所有的 webpack 配置通过一个链式包装器便可生成了：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">const&lt;/span> Config &lt;span class="token operator">=&lt;/span> &lt;span class="token function">require&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'webpack-chain'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token keyword">const&lt;/span> config &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Config&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token comment">// 链式生成配置&lt;/span>
&lt;span class="token operator">...&lt;/span>
&lt;span class="token comment">// 导出 webpack 配置对象&lt;/span>
&lt;span class="token keyword">export&lt;/span> &lt;span class="token keyword">default&lt;/span> config&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">toConfig&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
  </div>
  
  <p>
    在引入详细的示例之前，先让我们介绍一下 webpack-chain 中内置的两种数据结构：ChainMap、ChainSet。
  </p>
  
  <h4>
    ChainedSet
  </h4>
  
  <p>
    带链式方法的集合。
  </p>
  
  <p>
    很显然，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="nofollow noopener noreferrer">Set</a> 类似，都拥有键值对，但值得一提的是：它通过链式方法来操作。
  </p>
  
  <p>
    在 webpack-chain 中，属于 ChainedSet 的有 <code>config.entry(name)</code>、<code>config.resolve.modules</code> 等。
  </p>
  
  <p>
    假如我们需要指定 webpack 配置的 enrty，我们只需要这样做：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-csharp"><code class=" language-csharp">config
  &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">entry&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'app'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">add&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'src/index.js'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code></pre>
  </div>
  
  <p>
    它等价于 webpack 配置对象的这部分：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-css"><code class=" language-css">&lt;span class="token selector">entry:&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token property">app&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'./src/index.js'&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
  </div>
  
  <p>
    当然，我想强调的 ChainedSet 真正强大的地方，在于 ChainedSet 提供的内置方法：add(value)、delete(value)、has(value) 等。
  </p>
  
  <p>
    这可以帮助我们增删改查整个 webpack 配置中的任意一个部分。
  </p>
  
  <h4>
    ChainedMap
  </h4>
  
  <p>
    带链式方法的哈希表。
  </p>
  
  <p>
    同上，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="nofollow noopener noreferrer">Map</a> 类似，也通过链式方法来操作。
  </p>
  
  <p>
    在 webpack-chain 中，属于 ChainedMap 的有 <code>config</code>、<code>config.resolve</code> 等。
  </p>
  
  <p>
    想了解更多 API 用法的读者可以前往<a href="https://www.npmjs.com/package/webpack-chain" target="_blank" rel="nofollow noopener noreferrer">文档</a>。
  </p>
  
  <h3>
    webpack-chain 原理简介
  </h3>
  
  <p>
    我们打开源码目录：
  </p>
  
  <p id="kPOPQxe">
    <img loading="lazy" width="237" height="459" class="alignnone size-full wp-image-5621 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/format,webp 237w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_155,h_300/format,webp 155w" sizes="(max-width: 237px) 100vw, 237px" />
  </p>
  
  <div class="image-package">
    <div class="image-caption">
      webpack-chain 源码目录
    </div>
  </div>
  
  <p>
    一共有三种类：Chainable、ChainedSet 或 ChainedMap、其它。
  </p>
  
  <h4>
    链式调用
  </h4>
  
  <p>
    Chainable 实现了链式调用的功能，它的代码很简洁：
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-kotlin"><code class=" language-kotlin">module&lt;span class="token punctuation">.&lt;/span>exports &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">class&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">constructor&lt;/span>&lt;span class="token punctuation">(&lt;/span>parent&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>parent &lt;span class="token operator">=&lt;/span> parent&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>

  &lt;span class="token function">batch&lt;/span>&lt;span class="token punctuation">(&lt;/span>handler&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token function">handler&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>

  &lt;span class="token function">end&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">return&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>parent&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
  </div>
  
  <p>
    最常调用的 end 方法便是来源于这了，它会返回调用链中最前端的那个对象。
  </p>
  
  <p>
    比如说，我们在 vuepress 中有这样一段代码：
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-ruby"><code class=" language-ruby">config
    &lt;span class="token punctuation">.&lt;/span>use&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'cache-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>loader&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'cache-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>options&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
      cacheDirectory&lt;span class="token punctuation">,&lt;/span>
      cacheIdentifier
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>&lt;span class="token keyword">end&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">.&lt;/span>use&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'babel-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">.&lt;/span>loader&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'babel-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">.&lt;/span>options&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">/&lt;/span> &lt;span class="token keyword">do&lt;/span> &lt;span class="token keyword">not&lt;/span> pick local project babel config
        babelrc&lt;span class="token punctuation">:&lt;/span> &lt;span class="token keyword">false&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        presets&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>
          &lt;span class="token keyword">require&lt;/span>&lt;span class="token punctuation">.&lt;/span>resolve&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'@vue/babel-preset-app'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">]&lt;/span>
      &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code></pre>
  </div>
  
  <p>
    第八行结尾 end() 处返回的便又是 <code>config</code> 了。
  </p>
  
  <p>
    ChainedSet 和 ChainedMap 都继承于 Chainable，其他类大多都继承于 ChainedSet 或 ChainedMap，除了 Use 和 Plugin 类使用 Orderable 这个高阶函数包装了一下(相当于装饰器)，目的在于解决在使用 module.use 或 plugin 时调整顺序的问题。有兴趣的读者可以自行翻阅<a href="https://github.com/neutrinojs/webpack-chain/blob/815bfd173a2dc6f802b66a48cdb2c4d2ff47df9f/src/Use.js" target="_blank" rel="nofollow noopener noreferrer">源码</a>~
  </p>
  
  <h3>
    在 Vuepress 中的应用
  </h3>
  
  <p>
    分成三个配置我们就不赘述了，毕竟大家平常开发的项目中也可能这样做。在这里我需要特别提一下的地方便是<strong>编写函数生成 webpack 配置</strong>：
  </p>
  
  <p>
    举个例子，在 createBaseConfig 里，有一个这样的函数：
  </p>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-jsx"><code class=" language-jsx">&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">createCSSRule&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">lang&lt;span class="token punctuation">,&lt;/span> test&lt;span class="token punctuation">,&lt;/span> loader&lt;span class="token punctuation">,&lt;/span> options&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token keyword">const&lt;/span> baseRule &lt;span class="token operator">=&lt;/span> config&lt;span class="token punctuation">.&lt;/span>module&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">rule&lt;/span>&lt;span class="token punctuation">(&lt;/span>lang&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">test&lt;/span>&lt;span class="token punctuation">(&lt;/span>test&lt;span class="token punctuation">)&lt;/span>
  &lt;span class="token keyword">const&lt;/span> modulesRule &lt;span class="token operator">=&lt;/span> baseRule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">oneOf&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'modules'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">resourceQuery&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token regex">/module/&lt;/span>&lt;span class="token punctuation">)&lt;/span>
  &lt;span class="token keyword">const&lt;/span> normalRule &lt;span class="token operator">=&lt;/span> baseRule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">oneOf&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'normal'&lt;/span>&lt;span class="token punctuation">)&lt;/span>

  &lt;span class="token function">applyLoaders&lt;/span>&lt;span class="token punctuation">(&lt;/span>modulesRule&lt;span class="token punctuation">,&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">)&lt;/span>
  &lt;span class="token function">applyLoaders&lt;/span>&lt;span class="token punctuation">(&lt;/span>normalRule&lt;span class="token punctuation">,&lt;/span> &lt;span class="token boolean">false&lt;/span>&lt;span class="token punctuation">)&lt;/span>

  &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">applyLoaders&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">rule&lt;span class="token punctuation">,&lt;/span> modules&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">!&lt;/span>isServer&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
      &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>isProd&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        rule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">use&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'extract-css-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">loader&lt;/span>&lt;span class="token punctuation">(&lt;/span>CSSExtractPlugin&lt;span class="token punctuation">.&lt;/span>loader&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        rule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">use&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'vue-style-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">loader&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'vue-style-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    rule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">use&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'css-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">loader&lt;/span>&lt;span class="token punctuation">(&lt;/span>isServer &lt;span class="token operator">?&lt;/span> &lt;span class="token string">'css-loader/locals'&lt;/span> &lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'css-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
      &lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">options&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        modules&lt;span class="token punctuation">,&lt;/span>
        localIdentName&lt;span class="token punctuation">:&lt;/span> &lt;span class="token template-string">&lt;span class="token template-punctuation string">`&lt;/span>&lt;span class="token string">[local]_[hash:base64:8]&lt;/span>&lt;span class="token template-punctuation string">`&lt;/span>&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        importLoaders&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        sourceMap&lt;span class="token punctuation">:&lt;/span> &lt;span class="token operator">!&lt;/span>isProd
      &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>

    rule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">use&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'postcss-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">loader&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'postcss-loader'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">options&lt;/span>&lt;span class="token punctuation">(&lt;/span>Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">assign&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
      plugins&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token function">require&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'autoprefixer'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>
      sourceMap&lt;span class="token punctuation">:&lt;/span> &lt;span class="token operator">!&lt;/span>isProd
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> siteConfig&lt;span class="token punctuation">.&lt;/span>postcss&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>

    &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>loader&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
      rule&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">use&lt;/span>&lt;span class="token punctuation">(&lt;/span>loader&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">loader&lt;/span>&lt;span class="token punctuation">(&lt;/span>loader&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">options&lt;/span>&lt;span class="token punctuation">(&lt;/span>options&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
  </div>
  
  <p>
    它做了这样一件事：对特定的一种样式语言进行 css 模块化和非模块化的处理，顺序是 loader -> postcss-loader -> css-loader -> vue-style-loader 或 extract-css-loader。<br /> 使用方式是这样的：
  </p>
  
  <div class="_2Uzcx_">
    <p>
      &nbsp;
    </p>

    <pre class="line-numbers language-tsx"><code class=" language-tsx">&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'css'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.css$/&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'postcss'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.p(ost)?css$/&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'scss'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.scss$/&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'sass-loader'&lt;/span>&lt;span class="token punctuation">,&lt;/span> siteConfig&lt;span class="token punctuation">.&lt;/span>scss&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'sass'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.sass$/&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'sass-loader'&lt;/span>&lt;span class="token punctuation">,&lt;/span> Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">assign&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> indentedSyntax&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> siteConfig&lt;span class="token punctuation">.&lt;/span>sass&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'less'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.less$/&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'less-loader'&lt;/span>&lt;span class="token punctuation">,&lt;/span> siteConfig&lt;span class="token punctuation">.&lt;/span>less&lt;span class="token punctuation">)&lt;/span>
&lt;span class="token function">createCSSRule&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'stylus'&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token regex">/\.styl(us)?$/&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">'stylus-loader'&lt;/span>&lt;span class="token punctuation">,&lt;/span> Object&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">assign&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
  preferPathResolver&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'webpack'&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> siteConfig&lt;span class="token punctuation">.&lt;/span>stylus&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>
</code></pre>
  </div>
  
  <p>
    是不是一下减少了配置的编写量？而且还很灵活的支持用户自定义 options 和后期的代码变更。
  </p>
  
  <h3>
    结语
  </h3>
  
  <p>
    什么时候应该使用 webpack-chain 呢？毕竟它的引入增加了项目的成本，我的答案是：
  </p>
  
  <ol>
    <li>
      当项目的 webpack 配置需要根据某些逻辑生成的时候，推荐引入 webpack-chain 对 webpack 配置进行声明式的编写。
    </li>
    <li>
      如果 webpack 配置很简单或者直接写死一个对象就行，不推荐引入 webpack-chain，如果有多个配置需要合并的需求，可以引入 webpack-merge。
    </li>
  </ol>
</div>
