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
    ```
const Config = require('webpack-chain');
const config = new Config();
// 链式生成配置
...
// 导出 webpack 配置对象
export default config.toConfig();

```
  </div>
 在引入详细的示例之前，先让[我们](https://www.w3cdoc.com)介绍一下 webpack-chain 中内置的两种数据结构：ChainMap、ChainSet。
  
  <h4>
    ChainedSet
  </h4>
 带链式方法的集合。
  
 很显然，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="nofollow noopener noreferrer">Set</a> 类似，都拥有键值对，但值得一提的是：它通过链式方法来操作。
  
 在 webpack-chain 中，属于 ChainedSet 的有 config.entry(name)、config.resolve.modules 等。
  
 假如[我们](https://www.w3cdoc.com)需要指定 webpack 配置的 enrty，[我们](https://www.w3cdoc.com)只需要这样做：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  
  <div class="_2Uzcx_">
    ```
config
  .entry('app')
    .add('src/index.js')

```
  </div>
 它等价于 webpack 配置对象的这部分：<button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button>
  
  <div class="_2Uzcx_">
    ```
entry: {
  app: './src/index.js'
}

```
  </div>
 当然，我想强调的 ChainedSet 真正强大的地方，在于 ChainedSet 提供的内置方法：add(value)、delete(value)、has(value) 等。
  
 这可以帮助[我们](https://www.w3cdoc.com)增删改查整个 webpack 配置中的任意一个部分。
  
  <h4>
    ChainedMap
  </h4>
 带链式方法的哈希表。
  
 同上，它和 ES6 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="nofollow noopener noreferrer">Map</a> 类似，也通过链式方法来操作。
  
 在 webpack-chain 中，属于 ChainedMap 的有 config、config.resolve 等。
  
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
    ```
module.exports = class {
  constructor(parent) {
    this.parent = parent;
  }

  batch(handler) {
    handler(this);
    return this;
  }

  end() {
    return this.parent;
  }
};

```
  </div>
 最常调用的 end 方法便是来源于这了，它会返回调用链中最[前端](https://www.w3cdoc.com)的那个对象。
  
 比如说，[我们](https://www.w3cdoc.com)在 vuepress 中有这样一段代码：
  
  <div class="_2Uzcx_">
    ```
config
    .use('cache-loader')
    .loader('cache-loader')
    .options({
      cacheDirectory,
      cacheIdentifier
    })
    .end()
    .use('babel-loader')
      .loader('babel-loader')
      .options({
        // do not pick local project babel config
        babelrc: false,
        presets: [
          require.resolve('@vue/babel-preset-app')
        ]
      })

```
  </div>
 第八行结尾 end() 处返回的便又是 config 了。
  
 ChainedSet 和 ChainedMap 都继承于 Chainable，其他类大多都继承于 ChainedSet 或 ChainedMap，除了 Use 和 Plugin 类使用 Orderable 这个高阶函数包装了一下(相当于装饰器)，目的在于解决在使用 module.use 或 plugin 时调整顺序的问题。有兴趣的读者可以自行翻阅<a href="https://github.com/neutrinojs/webpack-chain/blob/815bfd173a2dc6f802b66a48cdb2c4d2ff47df9f/src/Use.js" target="_blank" rel="nofollow noopener noreferrer">源码</a>~
  
  <h3>
    在 Vuepress 中的应用
  </h3>
 分成三个配置[我们](https://www.w3cdoc.com)就不赘述了，毕竟[大家](https://www.w3cdoc.com)平常开发的项目中也可能这样做。在这里我需要特别提一下的地方便是编写函数生成 webpack 配置：
  
 举个例子，在 createBaseConfig 里，有一个这样的函数：
  
  <div class="_2Uzcx_">
    ```
function createCSSRule (lang, test, loader, options) {
  const baseRule = config.module.rule(lang).test(test)
  const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
  const normalRule = baseRule.oneOf('normal')

  applyLoaders(modulesRule, true)
  applyLoaders(normalRule, false)

  function applyLoaders (rule, modules) {
    if (!isServer) {
      if (isProd) {
        rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
      } else {
        rule.use('vue-style-loader').loader('vue-style-loader')
      }
    }

    rule.use('css-loader')
      .loader(isServer ? 'css-loader/locals' : 'css-loader')
      .options({
        modules,
        localIdentName: `[local]_[hash:base64:8]`,
        importLoaders: 1,
        sourceMap: !isProd
      })

    rule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
      plugins: [require('autoprefixer')],
      sourceMap: !isProd
    }, siteConfig.postcss))

    if (loader) {
      rule.use(loader).loader(loader).options(options)
    }
  }
}

```
  </div>
 它做了这样一件事：对特定的一种样式语言进行 css 模块化和非模块化的处理，顺序是 loader -> postcss-loader -> css-loader -> vue-style-loader 或 extract-css-loader。<br /> 使用方式是这样的：
  
  <div class="_2Uzcx_">
    
      
    

    ```
createCSSRule('css', /\.css$/)
createCSSRule('postcss', /\.p(ost)?css$/)
createCSSRule('scss', /\.scss$/, 'sass-loader', siteConfig.scss)
createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, siteConfig.sass))
createCSSRule('less', /\.less$/, 'less-loader', siteConfig.less)
createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
  preferPathResolver: 'webpack'
}, siteConfig.stylus))

```
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
