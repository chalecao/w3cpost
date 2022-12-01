---
title: 性能优化篇—Webpack构建速度优化




---
### 如何输出Webpack构建分析 {#articleHeader0}

* 输出Webpack构建信息的.json文件：`webpack --profile --json > stats.json`

  1. `--profile`:记录构建中的耗时信息
  2. `--json`:以json格式输出构建结果，最后只输出一个json文件（包含所有的构建信息）

* **web可视化查看构建分析：**得到了webpack构建信息文件stats.json，如何进行很好的可视化查看？
      1. 方案一：通过可视化分析工具<a href="http://webpack.github.io/analyse/" target="_blank" rel="nofollow noopener noreferrer">Webpack Analyse</a>，是个在线Web应用，上传stats.json文件就可以；不过好像需要翻墙；
      2. 方案二：安装`webpack-bundle-analyzer`工具`npm i -g webpack-bundle-analyzer`,生成stats.json后直接在其文件夹目录执行`webpack-bundle-analyzer`后，[浏览器](https://www.w3cdoc.com)会打开对应网页并展示构建分析`webpack-bundle-analyzer stats.json -p 8888`<a href="https://www.npmjs.com/package/webpack-bundle-analyzer" target="_blank" rel="nofollow noopener noreferrer">文档地址webpack-bundle-analyzer</a>
      3. webpack-dashboard是一款统计和优化webpack日志的工具，可以以表格形势展示日志信息。其中包括构建过程和状态、日志以及涉及的模块列表
      4. jarvis是一款基于webapck-dashboard的webpack性能分析插件，性能分析的结果在[浏览器](https://www.w3cdoc.com)显示，比webpack-bundler-anazlyer更美观清晰<a href="https://github.com/zouhir/jarvis" target="_blank" rel="nofollow noopener noreferrer">GitHub文档地址</a>
  * `npm i -D webpack-jarvis`
  * `webpack.config.js`配置：
    <pre class="hljs typescript"><code>&lt;span class="hljs-keyword">const&lt;/span> Jarvis = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">"webpack-jarvis"&lt;/span>);

plugins: [
  &lt;span class="hljs-keyword">new&lt;/span> Jarvis({
    watchOnly: &lt;span class="hljs-literal">false&lt;/span>,
    port: &lt;span class="hljs-number">3001&lt;/span> &lt;span class="hljs-comment">// optional: set a port&lt;/span>
  })
];</code></pre>

      * port:监听的端口，默认1337，监听面板将监听这个端口，通常像<a href="http://localhost/" target="_blank" rel="nofollow noopener noreferrer">http://localhost</a>:port/
      * host:域名，默认localhost,不限制域名。
      * watchOnly:仅仅监听编译阶段。默认为true,如果高为false，jarvis不仅仅运行在编译阶段，在编译完成后还保持运行状态。
      * 界面：**看到构建时间为：**`Time: 11593ms`(作为优化时间对比)

<span class="img-wrap"><img title="clipboard.png" src="https://segmentfault.com/img/bVbpGzp?w=2808&h=1684" alt="clipboard.png" data-src="/img/bVbpGzp?w=2808&h=1684" /></span>

### webpack配置优化 {#articleHeader1}

* webpack在启动时会从配置的Entry出发，解析出文件中的导入语句，再递归解析。
* 对于导入语句Webpack会做出以下操作：
      1. 根据导入语句寻找对应的要导入的文件；
      2. 在根据要导入的文件后缀，使用配置中的Loader去处理文件（如使用ES6需要使用babel-loader处理）
* 针对这两点可以优化查找途径

  1. **优化Loader配置**
      * Loader处理文件的转换操作是很耗时的，所以需要让尽可能少的文件被Loader处理

    <pre class="hljs css"><code>{
    &lt;span class="hljs-attribute">test&lt;/span>: /\.js$/,
    use: [
        &lt;span class="hljs-string">'babel-loader?cacheDirectory'&lt;/span>,//开启转换结果缓存
    ],
    include: path.&lt;span class="hljs-built_in">resolve&lt;/span>(__dirname, &lt;span class="hljs-string">'src'&lt;/span>),//只对src目录中文件采用babel-loader
    exclude: path.&lt;span class="hljs-built_in">resolve&lt;/span>(__dirname,&lt;span class="hljs-string">' ./node_modules'&lt;/span>),//排除node_modules目录下的文件

},</code></pre>

  2. **优化resolve.modules配置**
      * `resolve.modules`用于配置webpack去哪些目录下寻找第三方模块，默认是`['node_modules']`，但是，它会先去当前目录的`./node_modules`查找，没有的话再去`../node_modules`最后到根目录；
      * 所以当安装的第三方模块都放在项目根目录时，就没有必要安默认的一层一层的查找，直接指明存放的绝对位置

    <pre class="hljs css"><code>&lt;span class="hljs-selector-tag">resolve&lt;/span>: {
        &lt;span class="hljs-attribute">modules&lt;/span>: [path.&lt;span class="hljs-built_in">resolve&lt;/span>(__dirname, &lt;span class="hljs-string">'node_modules'&lt;/span>)],
    }</code></pre>

  3. **优化resolve.extensions**配置
      * 在导入没带文件后缀的路径时，webpack会自动带上后缀去尝试询问文件是否存在，而`resolve.extensions`用于配置尝试后缀列表；默认为`extensions:['js','json']`;
      * 及当遇到`require('./data')`时webpack会先尝试寻找`data.js`，没有再去找`data.json`；如果列表越长，或者正确的后缀越往后，尝试的次数就会越多；
      * 所以在配置时为提升构建优化需遵守：
          1. 频率出现高的文件后缀优先放在前面；
          2. 列表尽可能的小；
          3. 书写导入语句时，尽量写上后缀名
      * 因为项目中用的`jsx`较多，所以配置`extensions: [".jsx",".js"],`

* **基本配置后查看构建速度：**`Time: 10654ms`;配置前为`Time: 11593ms`

### 使用DllPlugin优化 {#articleHeader2}

* 在使用webpack进行打包时候，对于依赖的第三方库，如react，react-dom等这些不会修改的依赖，可以让它和业务代码分开打包；
* 只要不升级依赖库版本，之后webpack就只需要打包项目业务代码，遇到需要导入的模块在某个动态链接库中时，就直接去其中获取；而不用再去编译第三方库，这样第三方库就只需要打包一次。
* **接入需要完成的事：**
      1. 将依赖的第三方模块抽离，打包到一个个单独的动态链接库中
      2. 当需要导入的模块存在动态链接库中时，让其直接从链接库中获取
      3. 项目依赖的所有动态链接库都需要被加载
* **接入工具(webpack已内置)**
      1. **DllPlugin插件：**用于打包出一个个单独的动态链接库文件；
      2. **DllReferencePlugin:**用于在主要的配置文件中引入`DllPlugin`插件打包好的动态链接库文件
* **配置webpack_dll.config.js**构建动态链接库

<pre class="hljs lua"><code>const &lt;span class="hljs-built_in">path&lt;/span> = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);
const DllPlugin = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'webpack/lib/DllPlugin'&lt;/span>);

module.exports = {
    mode: &lt;span class="hljs-string">'production'&lt;/span>,
    entry: {
        // 将React相关模块放入一个动态链接库
        react: [&lt;span class="hljs-string">'react'&lt;/span>,&lt;span class="hljs-string">'react-dom'&lt;/span>,&lt;span class="hljs-string">'react-router-dom'&lt;/span>,&lt;span class="hljs-string">'react-loadable'&lt;/span>],
        librarys: [&lt;span class="hljs-string">'wangeditor'&lt;/span>],
        utils: [&lt;span class="hljs-string">'axios'&lt;/span>,&lt;span class="hljs-string">'js-cookie'&lt;/span>]
    },
    &lt;span class="hljs-built_in">output&lt;/span>: {
        filename: &lt;span class="hljs-string">'[name]-dll.js'&lt;/span>,
        &lt;span class="hljs-built_in">path&lt;/span>: &lt;span class="hljs-built_in">path&lt;/span>.resolve(__dirname, &lt;span class="hljs-string">'dll'&lt;/span>),
        // 存放动态链接库的全局变量名，加上_dll_防止全局变量冲突
        library: &lt;span class="hljs-string">'_dll_[name]'&lt;/span>
    },
    // 动态链接库的全局变量名称，需要可&lt;span class="hljs-built_in">output&lt;/span>.library中保持一致，也是输出的manifest.json文件中name的字段值
    // 如react.manifest.json字段中存在&lt;span class="hljs-string">"name"&lt;/span>:&lt;span class="hljs-string">"_dll_react"&lt;/span>
    plugins: [
        new DllPlugin({
            name: &lt;span class="hljs-string">'_dll_[name]'&lt;/span>,
            &lt;span class="hljs-built_in">path&lt;/span>: &lt;span class="hljs-built_in">path&lt;/span>.join(__dirname, &lt;span class="hljs-string">'dll'&lt;/span>, &lt;span class="hljs-string">'[name].manifest.json'&lt;/span>)
        })
    ]
}</code></pre>

* **webpack.pro.config.js**中使用

<pre class="hljs typescript"><code>&lt;span class="hljs-keyword">const&lt;/span> DllReferencePlugin = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'webpack/lib/DllReferencePlugin'&lt;/span>);
...
plugins: [
    &lt;span class="hljs-comment">// 告诉webpack使用了哪些动态链接库&lt;/span>
        &lt;span class="hljs-keyword">new&lt;/span> DllReferencePlugin({
            manifest: &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./dll/react.manifest.json'&lt;/span>)
        }),
        &lt;span class="hljs-keyword">new&lt;/span> DllReferencePlugin({
            manifest: &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./dll/librarys.manifest.json'&lt;/span>)
        }),
        &lt;span class="hljs-keyword">new&lt;/span> DllReferencePlugin({
            manifest: &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./dll/utils.manifest.json'&lt;/span>)
        }),
]</code></pre>

* **注意：**在`webpack_dll.config.js`文件中，`DllPlugin`中的name参数必须和`output.library`中的一致；因为`DllPlugin`的name参数影响输出的manifest.json的name；而webpack.pro.config.js中的`DllReferencePlugin`会读取`manifest.json`的name，将值作为从全局变量中获取动态链接库内容时的全局变量名
* **执行构建**
      1. `webpack --progress --colors --config ./webpack.dll.config.js`
      2. `webpack --progress --colors --config ./webpack.prod.js`
* html中引入dll.js文件
* **构建时间对比：**`["11593ms","10654ms","8334ms"]`

* * *

### HappyPack并行构建优化 {#articleHeader3}

* **核心原理：**将webpack中最耗时的loader文件转换操作任务，分解到多个进程中并行处理，从而减少构建时间。
* <a href="https://www.npmjs.com/package/happypack" target="_blank" rel="nofollow noopener noreferrer">HappyPack</a>
* **接入HappyPack**
      1. 安装：`npm i -D happypack`
      2. 重新配置`rules`部分,将`loader`交给`happypack`来分配：

<pre class="hljs typescript"><code>&lt;span class="hljs-keyword">const&lt;/span> HappyPack = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'happypack'&lt;/span>);
&lt;span class="hljs-keyword">const&lt;/span> happyThreadPool = HappyPack.ThreadPool({size: &lt;span class="hljs-number">5&lt;/span>}); &lt;span class="hljs-comment">//构建共享进程池，包含5个进程&lt;/span>
...
plugins: [
    &lt;span class="hljs-comment">// happypack并行处理&lt;/span>
    &lt;span class="hljs-keyword">new&lt;/span> HappyPack({
        &lt;span class="hljs-comment">// 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应&lt;/span>
        id: &lt;span class="hljs-string">'babel'&lt;/span>,
        loaders: [&lt;span class="hljs-string">'babel-loader?cacheDirectory'&lt;/span>],&lt;span class="hljs-comment">//默认设置loader处理&lt;/span>
        threadPool: happyThreadPool,&lt;span class="hljs-comment">//使用共享池处理&lt;/span>
    }),
    &lt;span class="hljs-keyword">new&lt;/span> HappyPack({
        &lt;span class="hljs-comment">// 用唯一ID来代表当前HappyPack是用来处理一类特定文件的，与rules中的use对应&lt;/span>
        id: &lt;span class="hljs-string">'css'&lt;/span>,
        loaders: [
            &lt;span class="hljs-string">'css-loader'&lt;/span>,
            &lt;span class="hljs-string">'postcss-loader'&lt;/span>,
            &lt;span class="hljs-string">'sass-loader'&lt;/span>],
            threadPool: happyThreadPool
    })
],
&lt;span class="hljs-keyword">module&lt;/span>: {
    rules: [
    {
        test: &lt;span class="hljs-regexp">/\.(js|jsx)$/&lt;/span>,
        use: [&lt;span class="hljs-string">'happypack/loader?id=babel'&lt;/span>],
        exclude: path.resolve(__dirname,&lt;span class="hljs-string">' ./node_modules'&lt;/span>),
    },
    {
        test: &lt;span class="hljs-regexp">/\.(scss|css)$/&lt;/span>,
        &lt;span class="hljs-comment">//使用的mini-css-extract-plugin提取css此处，如果放在上面会出错&lt;/span>
        use: [MiniCssExtractPlugin.loader,&lt;span class="hljs-string">'happypack/loader?id=css'&lt;/span>],
        include:[
            path.resolve(__dirname,&lt;span class="hljs-string">'src'&lt;/span>),
            path.join(__dirname, &lt;span class="hljs-string">'./node_modules/antd'&lt;/span>)
        ]
    },
}</code></pre>

* 参数：
      1. `threads`：代表开启几个子进程去处理这一类文件，默认是3个；
      2. `verbose`:是否运行HappyPack输出日志，默认true；
      3. threadPool：代表共享进程池，即多个HappyPack示例使用一个共享进程池中的子进程去处理任务，以防资源占有过多

#### 代码压缩用ParallelUglifyPlugin代替自带的 UglifyJsPlugin插件

* 自带的JS压缩插件是单线程执行的，而<a href="https://github.com/gdborton/webpack-parallel-uglify-plugin" target="_blank" rel="nofollow noopener noreferrer">webpack-parallel-uglify-plugin</a>可以并行的执行
* 配置参数：
      1. `uglifyJS: {}`：用于压缩 ES5 代码时的配置，Object 类型
      2. `test: /.js$/g`:使用正则去匹配哪些文件需要被 ParallelUglifyPlugin 压缩，默认是 /.js$/
      3. `include: []`:使用正则去包含被压缩的文件，默认为 [].
      4. `exclude: []`: 使用正则去包含不被压缩的文件，默认为 []
      5. `cacheDir: ''`：缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回，默认不会缓存，开启缓存设置一个目录路径
      6. `workerCount: ''`：开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
      7. `sourceMap: false`：是否为压缩后的代码生成对应的Source Map, 默认不生成

<pre class="hljs groovy"><code>...
&lt;span class="hljs-string">minimizer:&lt;/span> [
    &lt;span class="hljs-comment">// webpack:production模式默认有配有js压缩，但是如果这里设置了css压缩，js压缩也要重新设置,因为使用minimizer会自动取消webpack的默认配置&lt;/span>
    &lt;span class="hljs-keyword">new&lt;/span> optimizeCssPlugin({
&lt;span class="hljs-symbol">        assetNameRegExp:&lt;/span> &lt;span class="hljs-regexp">/\.css$/&lt;/span>g,
&lt;span class="hljs-symbol">        cssProcessor:&lt;/span> require(&lt;span class="hljs-string">'cssnano'&lt;/span>),
&lt;span class="hljs-symbol">        cssProcessorOptions:&lt;/span> { &lt;span class="hljs-string">discardComments:&lt;/span> { &lt;span class="hljs-string">removeAll:&lt;/span> &lt;span class="hljs-literal">true&lt;/span> } },
&lt;span class="hljs-symbol">        canPrint:&lt;/span> &lt;span class="hljs-literal">true&lt;/span>
    }),
    &lt;span class="hljs-keyword">new&lt;/span> ParallelUglifyPlugin({
&lt;span class="hljs-symbol">        cacheDir:&lt;/span> &lt;span class="hljs-string">'.cache/'&lt;/span>,
&lt;span class="hljs-symbol">        uglifyJS:&lt;/span>{
&lt;span class="hljs-symbol">            output:&lt;/span> {
           &lt;span class="hljs-comment">// 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false&lt;/span>
&lt;span class="hljs-symbol">                beautify:&lt;/span> &lt;span class="hljs-literal">false&lt;/span>,
        &lt;span class="hljs-comment">//是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false&lt;/span>
&lt;span class="hljs-symbol">                comments:&lt;/span> &lt;span class="hljs-literal">false&lt;/span>
            },
&lt;span class="hljs-symbol">            compress:&lt;/span> {
            &lt;span class="hljs-comment">//是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出&lt;/span>
&lt;span class="hljs-symbol">                warnings:&lt;/span> &lt;span class="hljs-literal">false&lt;/span>,
            &lt;span class="hljs-comment">//是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句&lt;/span>
&lt;span class="hljs-symbol">                drop_console:&lt;/span> &lt;span class="hljs-literal">true&lt;/span>,
            &lt;span class="hljs-comment">//是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否&lt;/span>
&lt;span class="hljs-symbol">                collapse_vars:&lt;/span> &lt;span class="hljs-literal">true&lt;/span>,
            }
        }
}),
]</code></pre>

* * *

* **构建结果对比：**`["11593ms","10654ms","8334ms","7734ms"]`
* 整体构建速度从`12000ms`降到现在的`8000ms`
