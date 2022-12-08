---
title: 使用 Webpack-chain 链式生成 webpack 配置





---
<div>
 vuepress 有三套 webpack 配置：基础配置、dev 配置、build 配置，看似和普通的一个[前端](https://www.w3cdoc.com)项目也没什么差别，但它使用 webpack-chain 生成配置而不是传统的写死配置。
  
  <blockquote>
    
      相关源码见 <a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createBaseConfig.js" target="_blank" rel="nofollow noopener noreferrer">createBaseConfig.js</a>、<a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createClientConfig.js" target="_blank" rel="nofollow noopener noreferrer">createClientConfig</a>、<a href="https://github.com/vuejs/vuepress/blob/ac85a29d1e54c283955f72b32a29715855975811/lib/webpack/createServerConfig.js" target="_blank" rel="nofollow noopener noreferrer">createServerConfig</a>。
    
  </blockquote>
  <h3>
    webpack-chain 简介
  </h3>
 API: <a href="https://github.com/neutrinojs/webpack-chain">https://github.com/neutrinojs/webpack-chain</a>
  
  <h4>
    链式包装器
  </h4>
 引入 webpack-chain 后，[我们](https://www.w3cdoc.com)所有的 webpack 配置通过一个链式包装器便可生成了：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-jsx"><code class=" language-jsx"><span class="token keyword">const</span> Config <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'webpack-chain'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 链式生成配置</span>
<span class="token operator">...</span>
<span class="token comment">// 导出 webpack 配置对象</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> config<span class="token punctuation">.</span><span class="token function">toConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
  </div>
 在引入详细的示例之前，先让[我们](https://www.w3cdoc.com)介绍一下 webpack-chain 中内置的两种数据结构：ChainMap、ChainSet。
  
  <h4>
    ChainedSet
  </h4>
 带链式方法的集合。
  
 很显然，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="nofollow noopener noreferrer">Set</a> 类似，都拥有键值对，但值得一提的是：它通过链式方法来操作。
  
 在 webpack-chain 中，属于 ChainedSet 的有 <code>config.entry(name)</code>、<code>config.resolve.modules</code> 等。
  
 假如[我们](https://www.w3cdoc.com)需要指定 webpack 配置的 enrty，[我们](https://www.w3cdoc.com)只需要这样做：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-csharp"><code class=" language-csharp">config
  <span class="token punctuation">.</span><span class="token function">entry</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">add</span><span class="token punctuation">(</span><span class="token string">'src/index.js'</span><span class="token punctuation">)</span>
</code></pre>
  </div>
 它等价于 webpack 配置对象的这部分：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-css"><code class=" language-css"><span class="token selector">entry:</span> <span class="token punctuation">{</span>
  <span class="token property">app</span><span class="token punctuation">:</span> <span class="token string">'./src/index.js'</span>
<span class="token punctuation">}</span>
</code></pre>
  </div>
 当然，我想强调的 ChainedSet 真正强大的地方，在于 ChainedSet 提供的内置方法：add(value)、delete(value)、has(value) 等。
  
 这可以帮助[我们](https://www.w3cdoc.com)增删改查整个 webpack 配置中的任意一个部分。
  
  <h4>
    ChainedMap
  </h4>
 带链式方法的哈希表。
  
 同上，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="nofollow noopener noreferrer">Map</a> 类似，也通过链式方法来操作。
  
 在 webpack-chain 中，属于 ChainedMap 的有 <code>config</code>、<code>config.resolve</code> 等。
  
 想了解更多 API 用法的读者可以前往<a href="https://www.npmjs.com/package/webpack-chain" target="_blank" rel="nofollow noopener noreferrer">文档</a>。
  
  <h3>
    webpack-chain 原理简介
  </h3>
 [我们](https://www.w3cdoc.com)打开源码目录：
  
 <img loading="lazy" width="237" height="459" class="alignnone size-full wp-image-5621 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/format,webp 237w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e57854e37505.png?x-oss-process=image/quality,q_50/resize,m_fill,w_155,h_300/format,webp 155w" sizes="(max-width: 237px) 100vw, 237px" />
  
  <div class="image-package">
    <div class="image-caption">
      webpack-chain 源码目录
    </div>
  </div>
 一共有三种类：Chainable、ChainedSet 或 ChainedMap、其它。
  
  <h4>
    链式调用
  </h4>
 Chainable 实现了链式调用的功能，它的代码很简洁：
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-kotlin"><code class=" language-kotlin">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token punctuation">{</span>
  <span class="token keyword">constructor</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>parent <span class="token operator">=</span> parent<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">batch</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
  </div>
 最常调用的 end 方法便是来源于这了，它会返回调用链中最[前端](https://www.w3cdoc.com)的那个对象。
  
 比如说，[我们](https://www.w3cdoc.com)在 vuepress 中有这样一段代码：
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-ruby"><code class=" language-ruby">config
    <span class="token punctuation">.</span>use<span class="token punctuation">(</span><span class="token string">'cache-loader'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>loader<span class="token punctuation">(</span><span class="token string">'cache-loader'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>options<span class="token punctuation">(</span><span class="token punctuation">{</span>
      cacheDirectory<span class="token punctuation">,</span>
      cacheIdentifier
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>use<span class="token punctuation">(</span><span class="token string">'babel-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>loader<span class="token punctuation">(</span><span class="token string">'babel-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>options<span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token operator">/</span><span class="token operator">/</span> <span class="token keyword">do</span> <span class="token keyword">not</span> pick local project babel config
        babelrc<span class="token punctuation">:</span> <span class="token keyword">false</span><span class="token punctuation">,</span>
        presets<span class="token punctuation">:</span> <span class="token punctuation">[</span>
          <span class="token keyword">require</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token string">'@vue/babel-preset-app'</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
  </div>
 第八行结尾 end() 处返回的便又是 <code>config</code> 了。
  
 ChainedSet 和 ChainedMap 都继承于 Chainable，其他类大多都继承于 ChainedSet 或 ChainedMap，除了 Use 和 Plugin 类使用 Orderable 这个高阶函数包装了一下(相当于装饰器)，目的在于解决在使用 module.use 或 plugin 时调整顺序的问题。有兴趣的读者可以自行翻阅<a href="https://github.com/neutrinojs/webpack-chain/blob/815bfd173a2dc6f802b66a48cdb2c4d2ff47df9f/src/Use.js" target="_blank" rel="nofollow noopener noreferrer">源码</a>~
  
  <h3>
    在 Vuepress 中的应用
  </h3>
 分成三个配置[我们](https://www.w3cdoc.com)就不赘述了，毕竟[大家](https://www.w3cdoc.com)平常开发的项目中也可能这样做。在这里我需要特别提一下的地方便是编写函数生成 webpack 配置：
  
 举个例子，在 createBaseConfig 里，有一个这样的函数：
  
  <div class="_2Uzcx_">
    <pre class="line-numbers language-jsx"><code class=" language-jsx"><span class="token keyword">function</span> <span class="token function">createCSSRule</span> <span class="token punctuation">(</span><span class="token parameter">lang<span class="token punctuation">,</span> test<span class="token punctuation">,</span> loader<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> baseRule <span class="token operator">=</span> config<span class="token punctuation">.</span>module<span class="token punctuation">.</span><span class="token function">rule</span><span class="token punctuation">(</span>lang<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span>
  <span class="token keyword">const</span> modulesRule <span class="token operator">=</span> baseRule<span class="token punctuation">.</span><span class="token function">oneOf</span><span class="token punctuation">(</span><span class="token string">'modules'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">resourceQuery</span><span class="token punctuation">(</span><span class="token regex">/module/</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> normalRule <span class="token operator">=</span> baseRule<span class="token punctuation">.</span><span class="token function">oneOf</span><span class="token punctuation">(</span><span class="token string">'normal'</span><span class="token punctuation">)</span>

  <span class="token function">applyLoaders</span><span class="token punctuation">(</span>modulesRule<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token function">applyLoaders</span><span class="token punctuation">(</span>normalRule<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

  <span class="token keyword">function</span> <span class="token function">applyLoaders</span> <span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> modules</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isServer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isProd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rule<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'extract-css-loader'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span>CSSExtractPlugin<span class="token punctuation">.</span>loader<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        rule<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'vue-style-loader'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">'vue-style-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    rule<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'css-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span>isServer <span class="token operator">?</span> <span class="token string">'css-loader/locals'</span> <span class="token punctuation">:</span> <span class="token string">'css-loader'</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        modules<span class="token punctuation">,</span>
        localIdentName<span class="token punctuation">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[local]_[hash:base64:8]</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
        importLoaders<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        sourceMap<span class="token punctuation">:</span> <span class="token operator">!</span>isProd
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

    rule<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'postcss-loader'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span><span class="token string">'postcss-loader'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'autoprefixer'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      sourceMap<span class="token punctuation">:</span> <span class="token operator">!</span>isProd
    <span class="token punctuation">}</span><span class="token punctuation">,</span> siteConfig<span class="token punctuation">.</span>postcss<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>loader<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      rule<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>loader<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loader</span><span class="token punctuation">(</span>loader<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">options</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
  </div>
 它做了这样一件事：对特定的一种样式语言进行 css 模块化和非模块化的处理，顺序是 loader -> postcss-loader -> css-loader -> vue-style-loader 或 extract-css-loader。<br /> 使用方式是这样的：
  
  <div class="_2Uzcx_">
    
      &nbsp;
    

    <pre class="line-numbers language-tsx"><code class=" language-tsx"><span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'css'</span><span class="token punctuation">,</span> <span class="token regex">/\.css$/</span><span class="token punctuation">)</span>
<span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'postcss'</span><span class="token punctuation">,</span> <span class="token regex">/\.p(ost)?css$/</span><span class="token punctuation">)</span>
<span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'scss'</span><span class="token punctuation">,</span> <span class="token regex">/\.scss$/</span><span class="token punctuation">,</span> <span class="token string">'sass-loader'</span><span class="token punctuation">,</span> siteConfig<span class="token punctuation">.</span>scss<span class="token punctuation">)</span>
<span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'sass'</span><span class="token punctuation">,</span> <span class="token regex">/\.sass$/</span><span class="token punctuation">,</span> <span class="token string">'sass-loader'</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> indentedSyntax<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> siteConfig<span class="token punctuation">.</span>sass<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'less'</span><span class="token punctuation">,</span> <span class="token regex">/\.less$/</span><span class="token punctuation">,</span> <span class="token string">'less-loader'</span><span class="token punctuation">,</span> siteConfig<span class="token punctuation">.</span>less<span class="token punctuation">)</span>
<span class="token function">createCSSRule</span><span class="token punctuation">(</span><span class="token string">'stylus'</span><span class="token punctuation">,</span> <span class="token regex">/\.styl(us)?$/</span><span class="token punctuation">,</span> <span class="token string">'stylus-loader'</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  preferPathResolver<span class="token punctuation">:</span> <span class="token string">'webpack'</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> siteConfig<span class="token punctuation">.</span>stylus<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>
  </div>
 是不是一下减少了配置的编写量？而且还很灵活的支持用户自定义 options 和后期的代码变更。
  
  <h3>
    结语
  </h3>
 什么时候应该使用 webpack-chain 呢？毕竟它的引入增加了项目的成本，我的答案是：
  
  <ol>
    
      当项目的 webpack 配置需要根据某些逻辑生成的时候，推荐引入 webpack-chain 对 webpack 配置进行声明式的编写。
    
    
      如果 webpack 配置很简单或者直接写死一个对象就行，不推荐引入 webpack-chain，如果有多个配置需要合并的需求，可以引入 webpack-merge。
    
  </ol>
</div>
