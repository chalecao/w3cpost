---
title: DllPlugin提升webpack编译



---
<h1 class="heading" data-id="heading-0">
  一、前言
</h1>

> The `DllPlugin` and `DllReferencePlugin` provide means to split bundles in a way that can drastically improve build time performance.

`DllPlugin`结合`DllRefrencePlugin`插件的运用，对将要产出的bundle文件进行拆解打包，可以很彻底地加快webpack的打包速度，从而在开发过程中极大地缩减构建时间。

<h1 class="heading" data-id="heading-1">
  二、构建效果
</h1>

结论先行：使用`DllPlugin`和`DllRefrencePlugin`进行构建，可以缩减50%～70%的构建时间。

参考Demo：<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fqiudongwei%2Fblog%2Ftree%2Fmaster%2Fdllplugin-demo" target="_blank" rel="nofollow noopener noreferrer">dllplugin-demo</a>

<h2 class="heading" data-id="heading-2">
  2.1 使用DllPlugin前的构建速度

<figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/7/8/1647a0f717afb1d1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/7/8/1647a0f717afb1d1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1202" data-height="530" /> <figcaption></figcaption></figure>

入口文件`main.js`引入了一个`jQuery`文件，图示打包耗时2.3s。

<h2 class="heading" data-id="heading-3">
  2.2 使用DllPlugin后的构建速度

<figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/7/8/1647a11b6678823a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/7/8/1647a11b6678823a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1280" data-height="414" /> <figcaption></figcaption></figure>

使用插件后，打包耗时0.6s，单次对比，缩减时长达到73%！

<h2 class="heading" data-id="heading-4">
  2.3 如何验证DLLPlugin已经生效



对比上面两张图打包的模块列表，图二有一行不一样的输出：

```
[0] delegated ./src/components/jquery.js from dll-reference vendor_57c12dcd8d9774596525 42 bytes {0} [built]
```

这说明，此次的打包过程，没有重新打包`jQuery`模块，而是直接从`vendor_57c12dcd8d9774596525`中代理了。

<h1 class="heading" data-id="heading-5">
  三、Get Started
</h1>

DllPlugin作用示意图：<figure>

<img class="lazyload inited loaded" src="https://user-gold-cdn.xitu.io/2018/7/8/1647a4d653c38364?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-src="https://user-gold-cdn.xitu.io/2018/7/8/1647a4d653c38364?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1280" data-height="660" /> <figcaption></figcaption></figure>

<h2 class="heading" data-id="heading-6">
  3.1 配置webpack.dll.config.js打包静态公共资源



<h5 class="heading" data-id="heading-7">
  3.1.1 定义webpack.dll.config.js
</h5>

为了减小篇幅，只帖关键配置内容，详细访问<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fqiudongwei%2Fblog%2Ftree%2Fmaster%2Fdllplugin-demo" target="_blank" rel="nofollow noopener noreferrer">dllplugin-demo</a>：

```
// webpack.dll.config.js
module.exports = {
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        vendor: [path.resolve(src, 'js', 'vendor.js')],
    },

    plugins: [
        new webpack.DllPlugin({
            // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
            context: process.cwd(),

            // manifest.json文件的输出位置
            path: path.join(src, 'js', 'dll', '[name]-manifest.json'),

            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]'
        })
    ]
}
```

<h5 class="heading" data-id="heading-8">
  3.1.2 声明静态公共资源
</h5>

在配置好`webpack.dll.config.js`文件之后，在`vendor.js`中声明项目程序中所引用的静态公共资源。

```
// vendor.js
// 引入自定义在项目目录中的公共资源（可以在配置中声明alias映射关系）
import 'jquery';

// or 引入npm包资源
// import 'Vue';
```

<h5 class="heading" data-id="heading-9">
  3.1.3 打包静态公共资源
</h5>

```
// cross-env模块需要另外安装
cross-env NODE_ENV=production webpack --config webpack.dll.config.js --colors --display-modules
```

根据`webpack.dll.config.js`，会在指定位置生成`vendor.dll.js`文件。

<h2 class="heading" data-id="heading-10">
  3.2 配置webpack.config.js打包入口文件



生成静态公共资源`vendor.dll.js`之后，下一步就要在入口文件中关联引用，这项工作则是由`DllRefrencePlugin`完成的。

<h5 class="heading" data-id="heading-11">
  3.2.1 在webpack.config.js中关联引用
</h5>

```
// webpack.config.js
module.exports = {
    entry: {
        // 项目入口文件
        'app':path.resolve(src, 'js', 'main.js')
    },
    plugins: [
        // dllPlugin关联配置
        new webpack.DllReferencePlugin({
            // 跟dll.config里面DllPlugin的context一致
            context: process.cwd(),

            // dll过程生成的manifest文件
            manifest: require(path.join(src, 'js', "dll", "vendor-manifest.json"))
        })
    ]
}
```

<h5 class="heading" data-id="heading-12">
  3.2.2 项目入口文件中引用静态公共资源
</h5>

```
// main.js
// 引入的公共模块如果在vendor中有被引用过，那么编译的时候直接使用静态文件vendor.dll.js
import $ from 'jquery';
console.log($)

// import Vue from "Vue";
// console.log(Vue)
```

引入方式没有什么不同的，跟平时正常引入即可。

<h5 class="heading" data-id="heading-13">
  3.2.3 项目模板中引用公共静态资源
</h5>

最后一步，在模板中注入`vendor.dll.js`

```
<!-- index.html -->
<script type="text/javascript" src="/src/js/dll/vendor.dll.js"></script>
```

如此，在接下来的本地开发（dev过程）和线上构建过程，将不再重复静态公共资源的构建，极大地缩减[我们](https://www.w3cdoc.com)的构建时间。

<h1 class="heading" data-id="heading-14">
  结语
</h1>

以上为`webpack`(Version 4)使用过程中的小小总结，欢迎刊误或提供优化建议～

# 参考：

<a href="https://link.juejin.im?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fdll-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx" target="_blank" rel="nofollow noopener noreferrer">DllPlugin</a>

<a href="https://link.juejin.im?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000010045690" target="_blank" rel="nofollow noopener noreferrer">使用 HappyPack 和 DllPlugin 来提升你的 Webpack 构建速度</a>
