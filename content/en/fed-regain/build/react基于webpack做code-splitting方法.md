---
title: React基于webpack做code splitting方法

---

随着web应用功能越来越复杂，模块打包后体积越来越大，如何实现静态资源的按需加载，最大程度的减小首页加载模块体积和首屏加载时间，成为模块打包工具的必备核心技能。

webpack作为当下最为流行的模块打包工具，成为了react、vue等众多热门框架的官方推荐打包工具。其提供的Code Splitting（代码分割）特性正是实现模块按需加载的关键方式。

# 什么是Code Splitting

[官方定义][1]：

> Code splitting is one of the most compelling features of webpack. It allows you to split your code into various bundles which you can then load on demand — like when a user navigates to a matching route, or on an event from the user. This allows for smaller bundles, and allows you to control resource load prioritization, which if used correctly, can have a major impact on your application load time

翻译过来大概意思就是：

> 代码分割功能允许将web应用代码分割为多个独立模块，当用户导航到一个匹配的路由或者派发某些特定事件时，来按需加载这些模块。这样就可以将大型的模块分割为多个小型的模块，实现系统资源加载的最大优化，如果使用得当，能够极大的减少[我们](https://www.w3cdoc.com)的应用首屏加载时间。

# Code splitting 分类

## 一、缓存和并行加载的资源分割

这种方法是将某些第三方基础框架模块（例如：moment、loadash）或者多个页面的公用模块拆分出来独立打包加载，通常这些模块改动频率很低，将其与业务功能模块拆分出来并行加载，一方面可以最大限度的利用[浏览器](https://www.w3cdoc.com)缓存，另一方面也可以大大降低多页面系统的代码冗余度。

按照资源类型不同又可以分为`js公共资源分割`和`css资源分割`两类。

### 1、js公共资源分割 

例如：系统应用入口文件`index.js`中使用日期功能库 [momentjs][2]。

**index.js**
```
var moment = require('moment');
console.log(moment().format());
```
**webpack.config.js**

#### 定义多个entry入口 {#5}

* `main`为主入口模块文件
* `vendor`为公共基础库模块，名字可随意设定。称为initial chunk
```
var path = require('path');

module.exports = {
   entry: {
       main: './index.js',
       vendor: ['moment']
   },
   output: {
       filename: '[name].js',
       path: path.resolve(__dirname, 'dist')
   }
}
```
执行webpack打包命令：
```
webpack --progress --hide-modules
```
可以看到最终打包为两个js文件 `main.js` 、`vendor.js`，但如果检查者两个文件会发现`moment`模块代码被重复打包到两个文件中，而这肯定不是[我们](https://www.w3cdoc.com)想要的，这时候就需要 webpack的plugin发挥作用了。

<img class="aligncenter" title="vendo" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor.jpg?x-oss-process=image/format,webp" alt="vendo" />

### 使用CommonsChunkPlugin
```
var webpack = require('webpack');
var path = require('path');

module.exports = {
   entry: {
       main: './index.js',
       vendor: ['moment']
   },
   output: {
       filename: '[chunkhash:8].[name].js',
       path: path.resolve(__dirname, 'dist')
   },
   plugins: [
       new webpack.optimize.CommonsChunkPlugin({
            // vendor是包括公共的第三方代码，称为initial chunk
           name: 'vendor'
       })
   ]
}
```
执行webpack打包命令，[我们](https://www.w3cdoc.com)发现`moment`只被打包进`vendor.js`中。

<img class="aligncenter" title="vendo" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor2.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/vendor2.jpg?x-oss-process=image/format,webp" alt="vendo" />

#### webpack运行时模块（manifest） {#7}

* 在前面的`步骤2`当中webpack在[浏览器](https://www.w3cdoc.com)中加载js模块的运行时代码块也打包进了`vendor.js`，如果为打包的js文件添加`chunkhash`，则每次修改 `index.js`后再次编译打包，由于运行时代码需要重新编译生成，导致`vendor.js`重新打包并生成新的`chunkhash`。

**webpack运行时代码块部分：**

<img loading="lazy" class="aligncenter" title="webpackjsonp" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/webpackjsonp.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/webpackjsonp.jpg?x-oss-process=image/format,webp" alt="webpackjsonp" width="830" height="539" />

* 实际项目中[我们](https://www.w3cdoc.com)希望修改业务功能后打包时只重新打包业务模块，而不打包第三方公共基础库。这里[我们](https://www.w3cdoc.com)可以将webpack的`运行时代码`提取到独立的`manifest`文件中，这样每次修改业务代码只重新打包生成业务代码模块`main.js`和运行时代码模块`manifest.js`，就实现了业务模块和公共基础库模块的分离。

<img class="aligncenter" title="manifest1" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/manifest1.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/manifest1.jpg?x-oss-process=image/format,webp" alt="manifest1" />

* `names`字段支持以数组格式来指定`基础库模块名称`和`运行时代码模块名称`。
```
module.exports = {
   entry: {
       main: './index.js',
       vendor: 'moment'
   },
   output: {
       filename: '[chunkhash:8].[name].js',
       path: path.resolve(__dirname, 'dist')
   },
   plugins: [
       new webpack.optimize.CommonsChunkPlugin({
           // manifest是包括webpack运行时runtime的块，可以称为entry chunk
           names: ['vendor', 'manifest']
       })
   ]
}
```
### 2、CSS代码分割 {#8}

* 实际项目开发当中经常使用webpack的`css-loader`来将css样式导入到js模块中，再使用`style-loader`将css样式以`<style>`标签的形式插入到页面当中，但这种方法的缺点就是无法单独加载并缓存css样式文件，页面展现必须依赖于包含css样式的js模块，从而造成页面闪烁的不佳体验。
* 因此有必要将js模块当中import的css模块提取出来，这时候就需要用到`extract-text-webpack-plugin`。

> 注意webpack2.x需要使用相应版本的plugin。
```
npm i --save-dev extract-text-webpack-plugin@beta 
```
**index.js**
```
import moment from 'moment';
import './index.css';

console.log('moment:', moment().format());
```
**webpack.config.js**
```
var ExtractTextPlugin = require('extract-text-webpack-plugin');
......
   module: {
       rules: [{
           test: /\.css$/,
           exclude: /node_modules/,
           use: ExtractTextPlugin.extract({
               loader: 'css-loader',
               options: {}
           })
       }]
   },
   plugins: [
       new ExtractTextPlugin({
           filename: 'bundle.css',
           disable: false,
           allChunks: true
       })
   ]
......
```
<img title="extract" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/extract.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/extract.jpg?x-oss-process=image/format,webp" alt="extract" />

## 二、按需加载代码分割 {#9}

* 前面介绍的`静态资源分离打包`需要开发者在webpack配置文件中明确分割点来提取独立的公共模块，这种方式适合提取`第三方公共基础库`（vue、react、moment等）以及webpack 的`运行时代码模块`。
* 除此之外webpack还提供了按需加载的代码分割功能，常用于在web应用路由或者用户行为事件逻辑中动态按需加载特定的功能模块`chunk`，这就是[我们](https://www.w3cdoc.com)本文中后面要重点介绍的。

### Code splitting with require.ensure {#10}

[webpack1][3]提供了CommonJS风格的 `require.ensure()`实现模块`chunk`的异步加载，通过`require.ensure()`在js代码中建立分割点，编译打包时webpack会将此分割点所指定的代码模块都打包为一个代码模块chunk，然后通过`jsonp`的方式来按需加载打包后的模块`chunk`。

* require.ensure()语法
```
// 空参数
require.ensure([], function(require){
    var = require('module-b');
});

// 依赖模块 "module-a", "module-b"，会和'module-c'打包成一个chunk来加载
// 不同的分割点可以使用同一个chunkname，这样可以保证不同分割点的代码模块打包为一个chunk
require.ensure(["module-a", "module-b"], function(require) {
    var a = require("module-a");
    var b = require("module-b");
    var c = require('module-c');
},"custom-chunk-name");
```
### Code Splitting with ES2015 {#11}

[webpack2][4] 的ES2015 loader中提供了`import()`方法在运行时动态按需加载`ES2015 Module`。

webpack将`import()`看做一个分割点并将其请求的module打包为一个独立的`chunk`。`import()`以模块名称作为参数名并且返回一个`Promise`对象。

* import() 语法
```
import("./module").then(module => {
    return module.default;
}).catch(err => {
    console.log("Chunk loading failed");
});
```
* import()使用须知
  * [import()][5]目前还是处于TC39 proposal阶段。
  * 在Babel中使用`import()`方法，需要安装 [dynamic-import][6]插件并选择使用`babel-preset-stage-3`处理解析错误。
* 动态表达式 [Dynamic expressions][7]`import()`中的传参可支持部分表达式的写法了，如果之前有接触过CommonJS中`require()`表达式写法，应该不会对此感到陌生。它的操作其实和 CommonJS 类似，给所有可能的文件创建一个环境，当你传递那部分代码的模块还不确定的时候，webpack 会自动生成所有可能的模块，然后根据需求加载。这个特性在[前端](https://www.w3cdoc.com)路由的时候很有用，可以实现按需加载资源。`import()`会针对每一个读取到的module创建独立的`chunk`。
```
    function route(path, query) {

  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
```
### bundle-loader {#12}

[bundle-loader][8] 是webpack官方提供的`loader`，其作用就是对`require.ensure`的抽象封装为一个`wrapper`函数来动态加载模块代码，从而避免`require.ensure`将分割点所有模块代码打包为一个`chunk`体积过大的问题。

* 使用语法：
```
// 在require bundle时，[浏览器](https://www.w3cdoc.com)会立即加载
var waitForChunk = require("bundle!./file.js");

// 使用lazy模式，[浏览器](https://www.w3cdoc.com)并不立即加载，只在调用wrapper函数才加载
var waitForChunk = require("bundle?lazy!./file.js");

// 等待加载，在回调中使用
waitForChunk(function(file) {
    var file = require("./file.js");
});
```
* wrapper函数：

**默认普通模式wrapper：**

```
var cbs = [],data;
module.exports = function(cb) {
    if(cbs) cbs.push(cb);
    else cb(data);
},
require.ensure([], function(require) {
    data = require('./file.js');
    var callbacks = cbs;
    cbs = null;
    for(var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](data);
      }
});
```
**lazy模式wrapper：**
```
module.exports = function (cb) {
  require.ensure([], function(require) {
    var app = require('./file.js');
    cb(app);
  });
};
```
> 使用`bundle-loader`在代码中require文件的时候只是引入了`wrapper`函数，而且因为每个文件都会产生一个分离点，导致产生了多个打包文件，而打包文件的载入只有在条件命中的情况下才产生,也就可以按需加载。

* 支持自定义Chunk名称：
```
require("bundle-loader?lazy&name=my-chunk!./file.js");
```
### promise-loader {#13}

[promise-loader][9]是`bundle-loader`的lazy模式的变种，其核心就是使用`Promise`语法来替代原先的`callback`回调机制。与`bundle-loader`类似，`require`模块的时候只是引入了`wrapper`函数，不同之处在于调用函数时得到的是一个对模块引用的`promise`对象，需要在`then`方法中获取模块对象，并可以使用`catch`方法来捕获模块加载中的错误。

`promise-loader`支持使用第三方Promise基础库（如：[bluebird][10]）或者使用`global`参数来指定使用运行环境已经存在的Promise库。

* 使用语法：
```
// 使用Bluebird promise库
var load = require("promise?bluebird!./file.js");

// 使用全局Promise对象
var load = require("promise?global!./file.js");

load().then(function(file) {

});
```

* wrapper函数：
```
var Promise = require('bluebird');

module.exports = function (namespace) {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve[require('./file.js'](namespace)));
    });
  });
}
```
### es6-promise-loader {#14}

[es6-promise-loader][11]相比 `promise-loader`区别就在于使用原生的`ES6 Promise`对象。

* 使用语法：
```
var load = require("es6-promise!./file.js");

load(namespace).then(function(file) {
    console.log(file);
});
```
* wrapper函数：
```
module.exports = function (namespace) {
  return new Promise(function (resolve) {
    require.ensure([], function (require) {
      resolve[require('./file.js'](namespace)));
    });
  });
}
```
# React按需加载实现方案 {#15}

## React router动态路由 {#16}

`react-router`的 标签有一个叫做[getComponent][12]的异步的方法去获取组件。他是一个function接受两个参数，分别是location和callback。当react-router执行回调函数 callback(null, ourComponent)时，路由只渲染指定组件ourComponent

* getComponent异步方法

**使用语法：**
```
<Router history={history}>
    <Route
        path="/"
        getComponent={(nextState, callback) => {
            callback(null, HomePage)
        }}
    />
     <Route
        path="/faq"
        getComponent={(nextState, callback) => {
          callback(null, FAQPage);
        }}
    />
</Router>
```
这些组件会在需要的时候异步加载。这些组件仍然会在同一个文件中，并且你的应用看起来不会有任何不同。

* require.ensure

webpack提供的`require.ensure`可以定义分割点来打包独立的chunk，再配合`react-router`的`getComponent`方法就可以实现React组件的按需加载，具体可参照以下文章：

  1. [基于Webpack 2的React组件懒加载][13]
  2. [react-router动态路由与Webpack分片thunks][14]

## React懒加载组件 {#17}

文章前面提到使用React动态路由来按需加载react组件，但实际项目开发中很多时候不需要或者没法引入react-router，[我们](https://www.w3cdoc.com)就可以使用webpack官方封装的`React懒加载组件`来动态加载指定的React组件，源代码见 [LazilyLoad][15]。

### LazilyLoad懒加载组件 {#18}

* LazilyLoad使用：

**webpack2.x** `import`方法异步加载ES2015模块文件，返回一个Promise对象。
```
<LazilyLoad modules={{
  TodoHandler: () => importLazy(import('./components/TodoHandler')),
  TodoMenuHandler: () => importLazy(import('./components/TodoMenuHandler')),
  TodoMenu: () => importLazy(import('./components/TodoMenu')),
}}>
{({TodoHandler, TodoMenuHandler, TodoMenu}) => (
  <TodoHandler>
    <TodoMenuHandler>
      <TodoMenu />
    </TodoMenuHandler>
  </TodoHandler>
)}
</LazilyLoad>
```
**webpack 1.x** 使用前文中提到的`promise-loader`或者`es6-promise-loader`封装按需加载组件。
```
class App extends React.Component {

   render() {
        return (
            <div>
                <LazilyLoad modules={{
                    LoadedLate: () => require('es6-promise!./lazy/LoadedLate')(),
                    LoadedLate2: () => require('es6-promise!./lazy/LoadedLate2')()
                }}>
                    {({LoadedLate,LoadedLate2}) => (
                        <div>
                            <LoadedLate />
                            <LoadedLate2 />
                        </div>
                    )}
                </LazilyLoad>
            </div>
        );
    }
```
* `importLazy`方法是为了兼容Babel/ES2015模块，返回模块的`default`属性。
```
export const importLazy = (promise) => (
    promise.then((result) => result.default || result)
);
```
## React高阶组件懒加载 {#19}

> [高阶组件][16] (Higher Order Component)就是一个 React 组件包裹着另外一个 React 组件。

这种模式通常使用工厂函数来实现，基本上是一个`类工厂`。React高阶组件的调用方式与普通的React组件完全一致。

### 封装懒加载组件LazilyLoad的高阶组件工厂函数 {#20}

**LazilyLoadFactory**
```
export const LazilyLoadFactory = (Component, modules) => {
    return (props) => (
        <LazilyLoad modules={modules}>
            {(mods) => <Component {...mods} {...props} />}
        </LazilyLoad>
    );
};
```
### 使用高阶组件实现按需加载 {#21}

#### webpack 2.x {#22}
```
class Load_jQuery extends React.Component {

    componentDidMount() {
        console.log('Load_jQuery props:', this.props);
    }

    render() {
        return (
            <div ref={(ref) => this.props.$(ref).css('background-color', 'red')}>
                Hello jQuery
            </div>
        );
    }
};

// 使用工厂函数封装Load_jQuery为高阶组件，将异步加载的jQuery模块对象以props的形式来获取并使用
export default LazilyLoadFactory(Load_jQuery, {
    $: () => import('jquery')
});
```
#### webpack 1.x {#23}
```
class Load_jQuery extends React.Component {

   render() {
        return (
            <div ref={(ref) => this.props.$(ref).css('background-color', 'red')}>
                Hello jQuery
            </div>
        );
    }
};

export default LazilyLoadFactory(Load_jQuery, {
    $: () => require('es6-promise!jquery')()
});
```
### ES Decorator {#24}

除了工厂函数方式扩展实现高阶组件，还可通过 ES草案中的 Decorator(<https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)> 语法来实现。Decorator 可以通过返回特定的 descriptor 来”修饰” 类属性，也可以直接”修饰”一个类。即传入一个已有的类，通过 Decorator 函数”修饰”成了一个新的类。

* 使用方法：
```
// ES Decorators函数实现高阶组件封装
// 参考 http://technologyadvice.github.io/es7-decorators-babel6/
const LazilyLoadDecorator = (Component) => {

    return LazilyLoadFactory(Component, {
        $: () => require('jquery')(),
    });
};

// ES Decorators语法
// 需要依赖babel-plugin-transform-decorators-legacy
// babel-loader配置使用plugins: ["transform-decorators-legacy"]
@LazilyLoadDecorator
export default class Load_jQuery extends React.Component {

    componentDidMount() {
        console.log('Load_jQuery props:', this.props);

    }

    render() {
        return (
            <div ref={(ref) => this.props.$(ref).css('background-color', 'red')}>
                Hello jQuery
            </div>
        );
    }

};
```
### 引用被高阶组件包裹的普通组件 {#25}
```
import Load_jQuery from './js/Load_jQuery';

class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            load: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            load: !this.state.load,
        });
    }

    render() {
        return (
            <div>
                <p>
                    <a
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={this.handleClick}>点击加载jQuery</a>
                </p>

                {this.state.load ?
                    <div><Load_jQuery /></div>
                    : null
                }
            </div>
        );
    }
```
### 基于webpack 1.x实现react组件的懒加载示例 {#26}

* [示例代码][17]
* [在线demo][18]
* 按需加载请求

<img loading="lazy" class="aligncenter" title="lazyloaded" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/lazyloaded.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/lazyloaded.png?x-oss-process=image/format,webp" alt="lazyloaded" width="742" height="236" />

#### react-router4代码分割
> react-router4官方文档： <a href="https://link.jianshu.com?t=https://reacttraining.com/react-router/web/guides/code-splitting" target="_blank" rel="nofollow noopener noreferrer">https://reacttraining.com/react-router/web/guides/code-splitting</a>
      
对于SPA项目，出于加载速度的考虑，肯定不能在页面初始化的时候加载全部js文件，因此需要将代码分块，也就是所谓的code splitting，我这里基于react-router4.1.1展示一个code split的例子，当然，你也可以参考<a href="https://link.jianshu.com?t=https://reacttraining.com/react-router/web/guides/code-splitting" target="_blank" rel="nofollow noopener noreferrer">react官方文档</a>
    
    
#### 思路解析

react-router4是对之前react-router的一次大改，按照官方的说法，是将路由的问题转变成了react组件的问题，所以在react-router4里面，不同于以往使用require.ensure，[我们](https://www.w3cdoc.com)使用一些其他办法异步的请求组件的js文件。
    
方案A 使用bundle-loader: bundle-loader git地址：<a href="https://link.jianshu.com?t=https://github.com/webpack-contrib/bundle-loader" target="_blank" rel="nofollow noopener noreferrer">https://github.com/webpack-contrib/bundle-loader</a>
      
 先仿着官方的示例先写一个Bundle组件，简化了一下，大概会是这样的
    
 ```     
{/*
// 调用示例
<Bundle load={require('bundle-loader?lazy!./somefile.js')}>
    {(Cmp) => <Cmp></Cmp>}
</Bundle>
*/}

// Bundle.js
import React, { Component } from 'react'

class Bundle extends Component {
  constructor() {
    super()
    this.state = {
      mod: null
    }
  }

  componentDidMount() {
    this.props.load((mod) => {
      this.setState({
        mod: mod.default || mod
      })
    })
  }

  render() {
    return (
      this.state.mod ? this.props.children(this.state.mod) : null
    )
  }
}

export default Bundle
```

    
在被传入的load方法被调用的时候，相应的js文件才会被请求和加载
    
然后在入口的路由文件里面这样写（假设[我们](https://www.w3cdoc.com)有两个组件,Cp1, Cp2）
    
```
import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import Bundle from './bundle'

let CodeSplit = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path={'/cp1'} render={() => {
          return (<Bundle load={require('bundle-loader?lazy!./cp1')}>
            {(Cp1) => <Cp1></Cp1>}
          </Bundle>)
        }
        }></Route>

        <Route path={'/cp2'} render={() => {
          return (<Bundle load={require('bundle-loader?lazy!./cp2')}>
            {(Cp2) => <Cp2></Cp2>}
          </Bundle>)
        }
        }></Route>
      </div>
    </BrowserRouter>
  )
}

export default CodeSplit
```
这样，代码分割就完成了。
注意 这里有一个小坑，如果你跟我一样使用的是create-react-app的话，你会发现，在运行代码的时候，会报这个错误
    
```   
Line 35:  Unexpected '!' in 'bundle-loader?lazy!./cp1'. Do not use import syntax to configure webpack loaders  import/no-webpack-loader-syntax

Line 42:  Unexpected '!' in 'bundle-loader?lazy!./cp2'. Do not use import syntax to configure webpack loaders  import/no-webpack-loader-syntax
```

这是因为create-react-app不支持webpack-loader，具体的可以看看这个issue
    
> why I can&#8217;t use bundle-loader like this: <a href="https://link.jianshu.com?t=https://github.com/facebookincubator/create-react-app/issues/2477" target="_blank" rel="nofollow noopener noreferrer">https://github.com/facebookincubator/create-react-app/issues/2477</a>
      
解决办法也很简单，采用方案B
    
方案B 使用import()

import() 属于es的一个proposal，也就是提案，还没有正式立项，所以具体会有什么问题我这里也不清楚，不过babel已经支持，所以[我们](https://www.w3cdoc.com)这里可以尝试使用，将之前使用bundle-loader的例子改造一下
    
因为import返回一个promise，所以[我们](https://www.w3cdoc.com)这里将componentDidMount变成一个async函数
    
```    
{/*
// 调用方法
<Bundle load={() => import(./somefile.js)}></Bundle>
*/}

import React, { Component } from 'react'

class Bundle extends Component {
  constructor() {
    super()
    this.state = {
      mod: null
    }
  }

  async componentDidMount() {
    const {default: mod} = await this.props.load()

    this.setState({
      mod: mod.default || mod
    })
  }

  render() {
    return (
      this.state.mod ? this.props.children(this.state.mod) : null
    )
  }
}

export default Bundle
```

 然后在入口文件的路由里面这么用
    
```
import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import Bundle from './bundle'

let CodeSplit = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path={'/cp1'} render={() => {
          return (<Bundle load={() => import('./cp1')}>
            {(Cp1) => <Cp1></Cp1>}
          </Bundle>)
        }
        }></Route>

        <Route path={'/cp2'} render={() => {
          return (<Bundle load={() => import('./cp2')}>
            {(Cp2) => <Cp2></Cp2>}
          </Bundle>)
        }
        }></Route>
      </div>
    </BrowserRouter>
  )
}

export default CodeSplit
```

OK,一个大致的代码分割功能差不多就完成了
    
方案B改进版
    
方案B虽然实现了[我们](https://www.w3cdoc.com)异步加载组件的需求，但是调用还是显得比较麻烦，[我们](https://www.w3cdoc.com)需要一种更优雅的方式来实现异步加载，同时还希望能传递参数给组件和自定义组件在加载时候的显示效果，所以这里对方案B进一步进行封装

因为代码比较简单，所以我这里直接把我项目里的代码贴过来了

```
// async-component.js
/**

* 用于react router4 code splitting
 */
import React, {Component} from 'react'

/**

* @param {Function} loadComponent e.g: () => import('./component')
* @param {ReactNode} placeholder  未加载前的占位
 */
export default (loadComponent, placeholder = null) => {
  class AsyncComponent extends Component {
    unmount = false

    constructor() {
      super()

      this.state = {
        component: null
      }
    }

    componentWillUnmount() {
      this.unmount = true
    }

    async componentDidMount() {
      const {default: component} = await loadComponent()

      if(this.unmount) return

      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component

      return (
        C ? <C {...this.props}></C> : placeholder
      )
    }
  }

  return AsyncComponent
}
```

整体思路和之前的代码是一致的<br /> 然后调用的时候只需这么写

Demo组件，就是一个简单的无状态组件

```
// demo.jsx

import React from 'react'

const Demo = () => {
  return (
    <div>demo</div>
  )
}

export default Demo
```
调用示例
    
```  
import asyncComponent from './async-component'

// 获取到异步组件
const AsyncDemo = asyncComponent(() => import('./demo'))

//...
render() {
  return (
    <Route path="/demo" component={AsyncDemo}></Route>
  )
}

// 如果要传参
render() {
  return (
    <Route path="/demo" render={() => {
        <AsyncComponent test="hello"></AsyncComponent>
    }}></Route>
  )
}
```

参数也可以通过asyncComponent函数进行传递，不过需要更改下async-component.js的代码，因为比较简单，所以这里就不展示了


# 参考资料

* [基于Webpack 2的React组件懒加载][13]
* [Lazy Loading - React][19]
* [es6-promise-loader][11]
* [promise-loader][9]
* [bundle-loader][8]
* [es6-modules-overview][20]
* [Implicit Code Splitting and Chunk Loading with React Router and Webpack][21]
* [Code Splitting - Using require.ensure][3]
<a href="https://webpack.js.org/guides/migrating/#code-splitting-with-es2015">Code Splitting with ES2015</a>

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
