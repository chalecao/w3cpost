---
title: 用webpack4和一些插件提升代码编译速度



---
对于现在的[前端](https://www.w3cdoc.com)项目而言，编译发布几乎是必需操作，有的编译只需要几秒钟，快如闪电，有的却需要10分钟，甚至更多，慢如蜗牛。特别是线上热修复时，分秒必争，响应速度直接影响了用户体验，用户不会有耐心等那么长时间，让你慢慢编译；如果涉及到支付操作，产品损失更是以秒计，每提前哪怕一秒钟发布，在腾讯海量用户面前，都能挽回不小的损失。不仅如此，编译效率的提升，带来的最直观收益就是，开发效率与开发体验双重提升。

那么，到底是什么拖慢了webpack打包效率，[我们](https://www.w3cdoc.com)又能做哪些提升呢？

<a class="fancy-ctn fancybox" title="webpack" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-logo.gif" rel="fancy-group"><img title="webpack" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-logo.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-logo.gif?x-oss-process=image/format,webp" /></a>

webpack 是目前非常受欢迎的打包工具，截止6天前，webpack4 已更新至 `4.28.3` 版本，10 个月的时间，小版本更新达几十次之多，可见社区之繁荣。

webpack4 发布时，官方也曾表示，其编译速度提升了 60% ~ 98%。

### **天下武功，唯快不破** {#天下武功，唯快不破}

由于本地项目升级到 webpack4 有几个月了，为了获得测试数据，手动将 webpack 降级为 3.12.0 版本，其它配置基本不做改动。

测试时，Mac仅运行常用的IM、邮箱、终端、[浏览器](https://www.w3cdoc.com)等，为了尽可能避免插件对数据的影响，我关闭了一些优化插件，只保留常用的loader、js压缩插件。

以下是分别在 webpack@3.12.0 及 webpack@4.26.1 两种场景下各测 5 次的运行截图。

<a class="fancy-ctn fancybox" title="webpack3~4x编译速度对比" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-0-parallel.34.png" rel="fancy-group"><img title="webpack3~4x编译速度对比" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-0-parallel.34.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-0-parallel.34.png?x-oss-process=image/format,webp" /></a>

数据分析如下（单位ms）：

|          | 第1次   | 第2次   | 第3次   | 第4次   | 第5次   | 平均      | 速度提升    |
| -------- | ----- | ----- | ----- | ----- | ----- | ------- | ------- |
| webpack3 | 58293 | 60971 | 57263 | 58993 | 60459 | 59195.8 | &#8211; |
| webpack4 | 42346 | 40386 | 40138 | 40330 | 40323 | 40704.6 | 45%     |

纯粹的版本升级，编译速度提升为 `45%`，这里我选取的是成熟的线上运行项目，构建速度的提升只有建立在成熟项目上才有意义，demo 项目由于编译文件基数小，难以体现出构建环境的复杂性，测试时也可能存在较大误差。同时与官方数据的差距，主要是因为基于的项目及配置不同。

无论如何，近 50% 的编译速度提升，都值得你尝试升级 webpack4！当然，优化才刚刚开始，请继续往下读。

### **新特性** {#新特性}

为了更流畅的升级 webpack4，[我们](https://www.w3cdoc.com)先要了解它。

webpack4 在大幅度提升编译效率同时，引入了多种新特性：

  1. 受 Parcel 启发，支持 0 配置启动项目，不再强制需要 webpack.config.js 配置文件，默认入口 `./src/` 目录，默认entry `./src/index.js` ，默认输出 `./dist` 目录，默认输出文件 `./dist/main.js`。
  2. 开箱即用 WebAssembly，webpack4提供了wasm的支持，现在可以引入和导出任何一个 Webassembly 的模块，也可以写一个loader来引入C++、C和Rust。（注：WebAssembly 模块只能在异步chunks中使用）
  3. 提供mode属性，设置为 `development` 将获得最好的开发体验，设置为 `production` 将专注项目编译部署，比如说开启 Scope hoisting 和 Tree-shaking 功能。
  4. 全新的插件系统，提供了针对插件和钩子的新API，变化如下：
      * 所有的 hook 由 hooks 对象统一管理，它将所有的hook作为可扩展的类属性
      * 添加插件时，你需要提供一个名字
      * 开发插件时，你可以选择插件的类型（sync/callback/promise之一）
      * 通过 this.hooks = { myHook: new SyncHook(…) } 来注册hook

    更多插件的工作原理，可以参考：<a href="https://medium.com/webpack/the-new-plugin-system-week-22-23-c24e3b22e95" target="_blank" rel="external noopener">新插件系统如何工作</a>。 </ol> 
    
    ### **快上车，升级前的准备** {#快上车，升级前的准备}
    
    首先，webpack-dev-server 插件需要升级至最新，同时，由于webpack-cli 承担了webpack4 命令行相关的功能，因此 webpack-cli 也是必需的。
    
    与以往不同的是，mode属性必须指定，否则按照 `约定优于配置` 原则，将默认按照 `production` 生产环境编译，如下是警告原文。
    
    > WARNING in configuration  
    > The ‘mode’ option has not been set, webpack will fallback to ‘production’ for this value. Set ‘mode’ option to ‘development’ or ‘production’ to enable defaults for each environment.  
    > You can also set it to ‘none’ to disable any default behavior. Learn more: <a href="https://webpack.js.org/concepts/mode/" target="_blank" rel="external noopener">https://webpack.js.org/concepts/mode/</a>
    
    有两种方式可以加入mode配置。
    
      * 在package.json script中指定–mode： 
        <pre><code class="js hljs javascript has-numbering"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --mode development --inline --progress --config build/webpack.dev.config.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --mode production --progress --config build/webpack.prod.config.js"</span>
}</code></pre>

      * 在配置文件中加入mode属性 
        <pre><code class="js hljs javascript has-numbering"><span class="hljs-built_in">module</span>.exports = {
  mode: <span class="hljs-string">'production'</span> <span class="hljs-comment">// 或 development</span>
};</code></pre>

    升级至webpack4后，一些默认插件由 optimization 配置替代了，如下：
    
      * CommonsChunkPlugin废弃，由 optimization.splitChunks 和 optimization.runtimeChunk 替代，前者拆分代码，后者提取runtime代码。原来的CommonsChunkPlugin产出模块时，会包含重复的代码，并且无法优化异步模块，minchunks的配置也较复杂，splitChunks解决了这个问题；另外，将 optimization.runtimeChunk 设置为true（或{name: “manifest”}），便能将入口模块中的runtime部分提取出来。
      * NoEmitOnErrorsPlugin 废弃，由 optimization.noEmitOnErrors 替代，生产环境默认开启。
      * NamedModulesPlugin 废弃，由 optimization.namedModules 替代，生产环境默认开启。
      * ModuleConcatenationPlugin 废弃，由 optimization.concatenateModules 替代，生产环境默认开启。
      * optimize.UglifyJsPlugin 废弃，由 optimization.minimize 替代，生产环境默认开启。
    
    不仅如此，optimization 还提供了如下默认配置：
    
    <pre><code class="js hljs javascript has-numbering">optimization: {
    minimize: env === <span class="hljs-string">'production'</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>, <span class="hljs-comment">// 开发环境不压缩</span>
    splitChunks: {
        chunks: <span class="hljs-string">"async"</span>, <span class="hljs-comment">// 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)</span>
        minSize: <span class="hljs-number">30000</span>, <span class="hljs-comment">// 模块超过30k自动被抽离成公共模块</span>
        minChunks: <span class="hljs-number">1</span>, <span class="hljs-comment">// 模块被引用>=1次，便分割</span>
        maxAsyncRequests: <span class="hljs-number">5</span>,  <span class="hljs-comment">// 异步加载chunk的并发请求数量<=5</span>
        maxInitialRequests: <span class="hljs-number">3</span>, <span class="hljs-comment">// 一个入口并发加载的chunk数量<=3</span>
        name: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function</span>
        automaticNameDelimiter: <span class="hljs-string">'~'</span>, <span class="hljs-comment">// 命名分隔符</span>
        cacheGroups: { <span class="hljs-comment">// 缓存组，会继承和覆盖splitChunks的配置</span>
            <span class="hljs-keyword">default</span>: { <span class="hljs-comment">// 模块缓存规则，设置为false，默认缓存组将禁用</span>
                minChunks: <span class="hljs-number">2</span>, <span class="hljs-comment">// 模块被引用>=2次，拆分至vendors公共模块</span>
                priority: <span class="hljs-number">-20</span>, <span class="hljs-comment">// 优先级</span>
                reuseExistingChunk: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 默认使用已有的模块</span>
            },
            vendors: {
                test: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>, <span class="hljs-comment">// 表示默认拆分node_modules中的模块</span>
                priority: <span class="hljs-number">-10</span>
            }
        }
    }
}</code></pre>

    splitChunks是拆包优化的重点，如果你的项目中包含 element-ui 等第三方组件（组件较大），建议单独拆包，如下所示。
    
    <pre><code class="js hljs javascript has-numbering">splitChunks: {
    <span class="hljs-comment">// ...</span>
    cacheGroups: {    
        elementUI: {
            name: <span class="hljs-string">"chunk-elementUI"</span>, <span class="hljs-comment">// 单独将 elementUI 拆包</span>
            priority: <span class="hljs-number">15</span>, <span class="hljs-comment">// 权重需大于其它缓存组</span>
            test: <span class="hljs-regexp">/[\/]node_modules[\/]element-ui[\/]/</span>
        }
    }
}
</code></pre>

    其更多用法，请参考以上注释或官方文档 <a href="https://webpack.js.org/plugins/split-chunks-plugin/" target="_blank" rel="external noopener">SplitChunksPlugin</a>。
    
    ### **升级避坑指南** {#升级避坑指南}
    
    > webpack4不再支持Node 4，由于使用了JavaScript新语法，Webpack的创始人之一，Tobias，建议用户使用Node版本 >= 8.94，以便使用最优性能。
    
    正式升级后，你可能会遇到各种各样的错误，其中，下面一些问题较为常见。
    
    vue-loader v15 需要在 webpack 中添加 VueLoaderPlugin 插件，参考如下。
    
    <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> { VueLoaderPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">"vue-loader"</span>); <span class="hljs-comment">// const VueLoaderPlugin = require("vue-loader/lib/plugin"); // 两者等同</span>

<span class="hljs-comment">//...</span>
plugins: [
  <span class="hljs-keyword">new</span> VueLoaderPlugin()
]
</code></pre>

    升级到 webpack4 后，mini-css-extract-plugin 替代 extract-text-webpack-plugin 成为css打包首选，相比之前，它有如下优势：
    
      1. 异步加载
      2. 不重复编译，性能更好
      3. 更容易使用
    
    缺陷，不支持css热更新。因此需在开发环境引入 css-hot-loader，以便支持css热更新，如下所示：
    
    <pre><code class="js hljs javascript has-numbering">{
    test: <span class="hljs-regexp">/\.scss$/</span>,
    use: [
        ...(isDev ? [<span class="hljs-string">"css-hot-loader"</span>, <span class="hljs-string">"style-loader"</span>] : [MiniCssExtractPlugin.loader]),
        <span class="hljs-string">"css-loader"</span>,
        postcss,
        <span class="hljs-string">"sass-loader"</span>
    ]
}
</code></pre>

    发布到生产环境之前，css是需要优化压缩的，使用 optimize-css-assets-webpack-plugin 插件即可，如下。
    
    <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> OptimizeCssAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>);

<span class="hljs-comment">//...</span>
plugins: [
    <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
            discardComments: {
                removeAll: <span class="hljs-literal">true</span>
            }
        }
    })
]
</code></pre>

    ### **持续加速** {#持续加速}
    
    文章开始，我曾提到，优化才刚刚开始。是的，随着项目越来越复杂，webpack也随之变慢，一定有办法可以进一步压榨性能。
    
    经过很长一段时间的多个项目运行以及测试，以下几点经验**非常有效**。
    
      1. 缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias全部用起来。 
        <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> resolve = dir => path.join(__dirname, <span class="hljs-string">'..'</span>, dir);

<span class="hljs-comment">// ...</span>
resolve: {
    modules: [ <span class="hljs-comment">// 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索</span>
        resolve(<span class="hljs-string">'src'</span>),
        resolve(<span class="hljs-string">'node_modules'</span>),
        resolve(config.common.layoutPath)
    ],
    mainFields: [<span class="hljs-string">'main'</span>], <span class="hljs-comment">// 只采用main字段作为入口文件描述字段，减少搜索步骤</span>
    alias: {
        vue$: <span class="hljs-string">"vue/dist/vue.common"</span>,
        <span class="hljs-string">"@"</span>: resolve(<span class="hljs-string">"src"</span>) <span class="hljs-comment">// 缓存src目录为@符号，避免重复寻址</span>
    }
},
<span class="hljs-built_in">module</span>: {
    noParse: <span class="hljs-regexp">/jquery|lodash/</span>, <span class="hljs-comment">// 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析</span>
    <span class="hljs-comment">// noParse: function(content) {</span>
    <span class="hljs-comment">//     return /jquery|lodash/.test(content)</span>
    <span class="hljs-comment">// },</span>
    rules: [
        {
            test: <span class="hljs-regexp">/\.js$/</span>,
            include: [ <span class="hljs-comment">// 表示只解析以下目录，减少loader处理范围</span>
                resolve(<span class="hljs-string">"src"</span>),
                resolve(config.common.layoutPath)
            ],
            exclude: file => <span class="hljs-regexp">/test/</span>.test(file), <span class="hljs-comment">// 排除test目录文件</span>
            loader: <span class="hljs-string">"happypack/loader?id=happy-babel"</span> <span class="hljs-comment">// 后面会介绍</span>
        },
    ]
}</code></pre>

      2. 想要进一步提升编译速度，就要知道瓶颈在哪？通过测试，发现有两个阶段较慢：① babel 等 loaders 解析阶段；② js 压缩阶段。loader 解析稍后会讨论，而 js 压缩是发布编译的最后阶段，通常webpack需要卡好一会，这是因为压缩 JS 需要先将代码解析成 AST 语法树，然后需要根据复杂的规则去分析和处理 AST，最后将 AST 还原成 JS，这个过程涉及到大量计算，因此比较耗时。如下图，编译就看似卡住。 
        <a class="fancy-ctn fancybox" title="ParallelUglify" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-ParallelUglify.png" rel="fancy-group"><img title="ParallelUglify" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-ParallelUglify.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-ParallelUglify.png?x-oss-process=image/format,webp" /></a>
        
        实际上，搭载 webpack-parallel-uglify-plugin 插件，这个过程可以倍速提升。[我们](https://www.w3cdoc.com)都知道 node 是单线程的，但node能够fork子进程，基于此，webpack-parallel-uglify-plugin 能够把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，从而实现并发编译，进而大幅提升js压缩速度，如下是配置。
        
        <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> ParallelUglifyPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-parallel-uglify-plugin'</span>);

<span class="hljs-comment">// ...</span>
optimization: {
    minimizer: [
        <span class="hljs-keyword">new</span> ParallelUglifyPlugin({ <span class="hljs-comment">// 多进程压缩</span>
            cacheDir: <span class="hljs-string">'.cache/'</span>,
            uglifyJS: {
                output: {
                    comments: <span class="hljs-literal">false</span>,
                    beautify: <span class="hljs-literal">false</span>
                },
                compress: {
                    warnings: <span class="hljs-literal">false</span>,
                    drop_console: <span class="hljs-literal">true</span>,
                    collapse_vars: <span class="hljs-literal">true</span>,
                    reduce_vars: <span class="hljs-literal">true</span>
                }
            }
        }),
    ]
}
</code></pre>

        当然，我分别测试了五组数据，如下是截图：
        
        <a class="fancy-ctn fancybox" title="ParallelUglifyPlugin插件启用后编译速度分析" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-1-parallel.34.png" rel="fancy-group"><img title="ParallelUglifyPlugin插件启用后编译速度分析" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-1-parallel.34.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-0-happyPack-0-dll-1-parallel.34.png?x-oss-process=image/format,webp" /></a>
        
        数据分析如下（单位ms）： </ol> 
        
        |                                  | 第1次   | 第2次   | 第3次   | 第4次   | 第5次   | 平均      | 速度提升    |
        | -------------------------------- | ----- | ----- | ----- | ----- | ----- | ------- | ------- |
        | webpack3                         | 58293 | 60971 | 57263 | 58993 | 60459 | 59195.8 | &#8211; |
        | webpack3搭载ParallelUglifyPlugin插件 | 44380 | 39969 | 39694 | 39344 | 39295 | 40536.4 | 46%     |
        | webpack4                         | 42346 | 40386 | 40138 | 40330 | 40323 | 40704.6 | &#8211; |
        | webpack4搭载ParallelUglifyPlugin插件 | 31134 | 29554 | 31883 | 29198 | 29072 | 30168.2 | 35%     |
        
        搭载 webpack-parallel-uglify-plugin 插件后，webpack3 的构建速度能够提升 46%；即使升级到 webpack4 后，构建速度依然能够进一步提升 35%。
        
          1. 现在[我们](https://www.w3cdoc.com)来看看，loader 解析速度如何提升。同 webpack-parallel-uglify-plugin 插件一样，HappyPack 也能实现并发编译，从而可以大幅提升 loader 的解析速度， 如下是部分配置。 
            <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'happypack'</span>);
<span class="hljs-keyword">const</span> happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
<span class="hljs-keyword">const</span> createHappyPlugin = (id, loaders) => <span class="hljs-keyword">new</span> HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === <span class="hljs-string">'1'</span> <span class="hljs-comment">// make happy more verbose with HAPPY_VERBOSE=1</span>
});
</code></pre>

            那么，对于前面 `loader: "happypack/loader?id=happy-babel"` 这句，便需要在 plugins 中创建一个 `happy-babel` 的插件实例。
            
            <pre><code class="js hljs javascript has-numbering">plugins: [
    createHappyPlugin(<span class="hljs-string">'happy-babel'</span>, [{
        loader: <span class="hljs-string">'babel-loader'</span>,
        options: {
            babelrc: <span class="hljs-literal">true</span>,
            cacheDirectory: <span class="hljs-literal">true</span> <span class="hljs-comment">// 启用缓存</span>
        }
    }])
]
</code></pre>

            如下，happyPack开启了3个进程（默认为CPU数-1），运行过程感受下。
            
            <a class="fancy-ctn fancybox" title="happyPack" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-happyPack.gif" rel="fancy-group"><img title="happyPack" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-happyPack.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-happyPack.gif?x-oss-process=image/format,webp" /></a>
            
            另外，像 vue-loader、css-loader 都支持 happyPack 加速，如下所示。
            
            <pre><code class="json hljs has-numbering">plugins: [
    createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
    new HappyPack({
        loaders: [{
            path: 'vue-loader',
            query: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
                }
            }
        }]
    })
]
</code></pre>

            基于 webpack4，搭载 webpack-parallel-uglify-plugin 和 happyPack 插件，测试截图如下：
            
            <a class="fancy-ctn fancybox" title="搭载两款插件后编译速度分析" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-0-dll-1-parallel.w4.png" rel="fancy-group"><img title="搭载两款插件后编译速度分析" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-0-dll-1-parallel.w4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-0-dll-1-parallel.w4.png?x-oss-process=image/format,webp" /></a>
            
            数据分析如下（单位ms）： </ol> 
            
            |                                    | 第1次   | 第2次   | 第3次   | 第4次   | 第5次   | 平均      | 速度提升 |
            | ---------------------------------- | ----- | ----- | ----- | ----- | ----- | ------- | ---- |
            | 仅搭载ParallelUglifyPlugin            | 31134 | 29554 | 31883 | 29198 | 29072 | 30168.2 | 35%  |
            | 搭载ParallelUglifyPlugin 和 happyPack | 26036 | 25884 | 25645 | 25627 | 25794 | 25797.2 | 17%  |
            
            可见，在搭载 webpack-parallel-uglify-plugin 插件的基础上，happyPack 插件依然能够提升 17% 的编译速度，实际上由于 sass 等 loaders 不支持 happyPack，happyPack 的性能依然有提升空间。更多介绍不妨参考 <a href="http://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/" target="_blank" rel="external noopener">happypack 原理解析</a>。
            
              1. [我们](https://www.w3cdoc.com)都知道，webpack打包时，有一些框架代码是基本不变的，比如说 babel-polyfill、vue、vue-router、vuex、axios、element-ui、fastclick 等，这些模块也有不小的 size，每次编译都要加载一遍，比较费时费力。使用 DLLPlugin 和 DLLReferencePlugin 插件，便可以将这些模块提前打包。 
                为了完成 dll 过程，[我们](https://www.w3cdoc.com)需要准备一份新的webpack配置，即 webpack.dll.config.js。
                
                <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"clean-webpack-plugin"</span>);
<span class="hljs-keyword">const</span> dllPath = path.resolve(__dirname, <span class="hljs-string">"../src/assets/dll"</span>); <span class="hljs-comment">// dll文件存放的目录</span>

<span class="hljs-built_in">module</span>.exports = {
    entry: {
        <span class="hljs-comment">// 把 vue 相关模块的放到一个单独的动态链接库</span>
        vue: [<span class="hljs-string">"babel-polyfill"</span>, <span class="hljs-string">"fastclick"</span>, <span class="hljs-string">"vue"</span>, <span class="hljs-string">"vue-router"</span>, <span class="hljs-string">"vuex"</span>, <span class="hljs-string">"axios"</span>, <span class="hljs-string">"element-ui"</span>]
    },
    output: {
        filename: <span class="hljs-string">"[name]-[hash].dll.js"</span>, <span class="hljs-comment">// 生成vue.dll.js</span>
        path: dllPath,
        library: <span class="hljs-string">"_dll_[name]"</span>
    },
    plugins: [
        <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">"*.js"</span>], { <span class="hljs-comment">// 清除之前的dll文件</span>
            root: dllPath,
        }),
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            name: <span class="hljs-string">"_dll_[name]"</span>,
            <span class="hljs-comment">// manifest.json 描述动态链接库包含了哪些内容</span>
            path: path.join(__dirname, <span class="hljs-string">"./"</span>, <span class="hljs-string">"[name].dll.manifest.json"</span>)
        }),
    ],
};
</code></pre>

                接着， 需要在 package.json 中新增 dll 命令。
                
                <pre><code class="json hljs has-numbering"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"dll"</span>: <span class="hljs-string">"webpack --mode production --config build/webpack.dll.config.js"</span>
}
</code></pre>

                运行 `npm run dll` 后，会生成 `./src/assets/dll/vue.dll-[hash].js` 公共js 和 `./build/vue.dll.manifest.json` 资源说明文件，至此 dll 准备工作完成，接下来在 wepack 中引用即可。
                
                <pre><code class="js hljs javascript has-numbering">externals: {
    <span class="hljs-string">'vue'</span>: <span class="hljs-string">'Vue'</span>,
    <span class="hljs-string">'vue-router'</span>: <span class="hljs-string">'VueRouter'</span>,
    <span class="hljs-string">'vuex'</span>: <span class="hljs-string">'vuex'</span>,
    <span class="hljs-string">'elemenct-ui'</span>: <span class="hljs-string">'ELEMENT'</span>,
    <span class="hljs-string">'axios'</span>: <span class="hljs-string">'axios'</span>,
    <span class="hljs-string">'fastclick'</span>: <span class="hljs-string">'FastClick'</span>
},
plugins: [
    ...(config.common.needDll ? [
        <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
            manifest: <span class="hljs-built_in">require</span>(<span class="hljs-string">"./vue.dll.manifest.json"</span>)
        })
    ] : [])
]
</code></pre>

                dll 公共js轻易不会变化，假如在将来真的发生了更新，那么新的dll文件名便需要加上新的hash，从而避免[浏览器](https://www.w3cdoc.com)缓存老的文件，造成执行出错。由于 hash 的不确定性，[我们](https://www.w3cdoc.com)在 html 入口文件中没办法指定一个固定链接的 script 脚本，刚好，add-asset-html-webpack-plugin 插件可以帮[我们](https://www.w3cdoc.com)自动引入 dll 文件。
                
                <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">const</span> autoAddDllRes = () => {
    <span class="hljs-keyword">const</span> AddAssetHtmlPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'add-asset-html-webpack-plugin'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> AddAssetHtmlPlugin([{ <span class="hljs-comment">// 往html中注入dll js</span>
        publicPath: config.common.publicPath + <span class="hljs-string">"dll/"</span>,  <span class="hljs-comment">// 注入到html中的路径</span>
        outputPath: <span class="hljs-string">"dll"</span>, <span class="hljs-comment">// 最终输出的目录</span>
        filepath: resolve(<span class="hljs-string">"src/assets/dll/*.js"</span>),
        includeSourcemap: <span class="hljs-literal">false</span>,
        typeOfAsset: <span class="hljs-string">"js"</span> <span class="hljs-comment">// options js、css; default js</span>
    }]);
};

<span class="hljs-comment">// ...</span>
plugins: [
    ...(config.common.needDll ? [autoAddDllRes()] : [])
]
</code></pre>

                搭载 dll 插件后，webpack4 编译速度进一步提升，如下截图：
                
                <a class="fancy-ctn fancybox" title="搭载三款插件后编译速度分析" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-1-dll-1-parallel.w4.png" rel="fancy-group"><img title="搭载三款插件后编译速度分析" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-1-dll-1-parallel.w4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-1-happyPack-1-dll-1-parallel.w4.png?x-oss-process=image/format,webp" /></a>
                
                数据分析如下（单位ms）： </ol> 
                
                |                                         | 第1次   | 第2次   | 第3次   | 第4次   | 第5次   | 平均      | 速度提升 |
                | --------------------------------------- | ----- | ----- | ----- | ----- | ----- | ------- | ---- |
                | 搭载ParallelUglifyPlugin 和 happyPack      | 26036 | 25884 | 25645 | 25627 | 25794 | 25797.2 | 17%  |
                | 搭载ParallelUglifyPlugin 、happyPack 和 dll | 20792 | 20963 | 20845 | 21675 | 21023 | 21059.6 | 22%  |
                
                可见，搭载 dll 后，webpack4 编译速度仍能提升 22%。
                
                综上，[我们](https://www.w3cdoc.com)汇总上面的多次数据，得到下表：
                
                |                                         | 第1次   | 第2次   | 第3次   | 第4次   | 第5次   | 平均      | 速度提升    |
                | --------------------------------------- | ----- | ----- | ----- | ----- | ----- | ------- | ------- |
                | webpack3                                | 58293 | 60971 | 57263 | 58993 | 60459 | 59195.8 | &#8211; |
                | webpack4                                | 42346 | 40386 | 40138 | 40330 | 40323 | 40704.6 | 45%     |
                | 搭载ParallelUglifyPlugin 、happyPack 和 dll | 20792 | 20963 | 20845 | 21675 | 21023 | 21059.6 | 181%    |
                
                升级至 webpack4 后，通过搭载 ParallelUglifyPlugin 、happyPack 和 dll 插件，编译速度可以提升181%，整体编译时间减少了将近 2/3，为开发节省了大量编译时间！而且随着项目发展，这种编译提升越来越可观。
                
                实际上，为了获得上面的测试数据，我关闭了 babel、ParallelUglifyPlugin 的缓存，开启缓存后，第二次编译时间平均为 12.8s，由于之前缓存过，编译速度相对 webpack3 将提升362%，即使你已经升级到 webpack4，搭载上述 3 款插件后，编译速度仍能获得 218% 的提升！
                
                ### **编译结果分析** {#编译结果分析}
                
                当然，编译速度作为一项指标，影响的更多是开发者体验，与之相比，编译后文件大小更为重要。webpack4 编译的文件，比之前版本略小一些，为了更好的追踪文件 size 变化，开发环境和生产环境都需要引入 webpack-bundle-analyzer 插件，如下图。
                
                <a class="fancy-ctn fancybox" title="analyzer" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.png" rel="fancy-group"><img title="analyzer" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.png?x-oss-process=image/format,webp" /></a>
                
                文件 size 如下图所示：
                
                <a class="fancy-ctn fancybox" title="analyzer.size" href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.size_.png" rel="fancy-group"><img title="analyzer.size" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.size_.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/05/webpack-analyzer.size_.png?x-oss-process=image/format,webp" /></a>
                
                ### **面向tree-shaking，约束编码** {#面向tree-shaking，约束编码}
                
                **sideEffects**
                
                从 webpack2 开始，tree-shaking 便用来消除无用模块，依赖的是 ES Module 的静态结构，同时通过在. babelrc 文件中设置 `"modules": false` 来开启无用的模块检测，相对粗暴。webapck4 灵活扩展了无用代码检测方式，主要通过在 `package.json` 文件中设置 `sideEffects: false` 来告诉编译器该项目或模块是 pure 的，可以进行无用模块删除，因此，开发公共组件时，可以尝试设置下。
                
                为了使得 tree-shaking 真正生效，引入资源时，仅仅引入需要的组件尤为重要，如下所示：
                
                <pre><code class="js hljs javascript has-numbering"><span class="hljs-keyword">import</span> { Button, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">"element-ui"</span>; <span class="hljs-comment">// 只引入需要的组件</span></code></pre>
                
                ### **结尾** {#结尾}
                
                升级 webpack4 的过程，踩坑是必须的，关键是踩坑后，你能得到什么？
                
                另外，除了文中介绍的一些优化方法，更多的优化策略，正在逐步验证中…
                
                原文：[使用webpack4提升180%编译速度][1]

 [1]: http://louiszhai.github.io/2019/01/04/webpack4/
