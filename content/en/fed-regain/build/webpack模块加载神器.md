---
title: Webpack模块加载神器


---
  


### [][1]什么是Webpack

Webpack 是德国开发者 Tobias Koppers 开发的模块加载器。Instagram 工程师认为这个方案很棒, 似乎还把作者招过去了。在 Webpack 当中, 所有的资源都被当作是模块, js, css, 图片等等..因此, Webpack 当中 js 可以引用 css, css 中可以嵌入图片 dataUrl。对应各种不同文件类型的资源, Webpack 有对应的模块 loader, 比如 CoffeeScript 用的是 coffee-loader, 其他还有很多:<a href="https://webpack.github.io/docs/list-of-loaders.html" target="_blank" rel="external">https://webpack.github.io/docs/list-of-loaders.html</a>  
<a></a>  
![Webpack模块加载神器][2]

大致的写法也就这样子:

### [][3]CommonJS 与 AMD 支持

Webpack 对 CommonJS 的 AMD 的语法做了兼容, 方便迁移代码。不过实际上, 引用模块的规则是依据 CommonJS 来的

AMD 语法中, 也要注意, 是按 CommonJS 的方案查找的:

### [][4]特殊模块的Shim

比如某个模块依赖 window.jQuery, 需要从 npm 模块中将 jquery 挂载到全局。Webpack 有不少的 Shim 的模块, 比如 expose-loader 用于解决这个问题，<a href="https://github.com/webpack/docs/wiki/shimming-modules，其他比如从模块中导出变量...具体说明有点晦涩" target="_blank" rel="external">https://github.com/webpack/docs/wiki/shimming-modules，其他比如从模块中导出变量&#8230;具体说明有点晦涩</a>..

手头的两个例子, 比如[我们](https://www.w3cdoc.com)用到 Pen 这个模块,这个模块对依赖一个 window.jQuery, 可我手头的 jQuery 是 CommonJS 语法的  
而 Pen 对象又是生成好了绑在全局的, 可是我又需要通过 require(‘pen’) 获取变量，最终的写法就是做 Shim 处理直接提供支持:

### [][5]基本的使用

安装 webpack 模块之后, 可是使用 webpack 这个命令行工具。可以使用参数, 也可以配置 webpack.config.js 文件直接运行 webpack 调用  
建议按照 Peter Hunt 给的教程走一遍, 基本的功能都会用到了：<a href="https://github.com/petehunt/webpack-howto" target="_blank" rel="external">https://github.com/petehunt/webpack-howto</a>

简单的例子就是这样一个文件, 可以把 ./main.js 作为入口打包 bundle.js:

### [][6]查找依赖

Webpack 是类似 Browserify 那样在本地按目录对依赖进行查找的,可以构造一个例子, 用 –display-error-details 查看查找过程,  
例子当中 resolve.extensions 用于指明程序自动补全识别哪些后缀,注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.

./c 是不存在, 从这个错误信息当中[我们](https://www.w3cdoc.com)大致能了解 Webpack 是怎样查找的。大概就是会尝试各种文件名, 会尝试作为模块, 等等  
一般模块就是查找 node_modules, 但这个也是能被配置的:  
<a href="https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories" target="_blank" rel="external">https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories</a>

### [][7]CSS 及图片的引用

英文的教程上有明确的例子:  
<a href="https://github.com/petehunt/webpack-howto#5-stylesheets-and-images" target="_blank" rel="external">https://github.com/petehunt/webpack-howto#5-stylesheets-and-images</a>

上边的是 JavaScript 代码, CSS 跟 LESS, 还有图片, 被直接引用了,实际上 CSS 被转化为

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#什么是Webpack "什么是Webpack"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/react_hot_loader.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#CommonJS-与-AMD-支持 "CommonJS 与 AMD 支持"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#特殊模块的Shim "特殊模块的Shim"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#基本的使用 "基本的使用"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#查找依赖 "查找依赖"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/#CSS-及图片的引用 "CSS 及图片的引用"
