---
title: AMD与CMD规范-javascript模块化


---
  


### [][1]模块化思想

模块化是指在解决某一个复杂问题或者一系列的杂糅问题时，依照一种分类的思维把问题进行系统性的分解以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块的方式。可以想象一个巨大的系统代码，被整合优化分割成逻辑性很强的模块时，对于软件是一种何等意义的存在。对于软件行业来说：解耦软件系统的复杂性，使得不管多么大的系统，也可以将管理，开发，维护变得“有理可循”。

<a></a>

![AMD与CMD规范-javascript模块化][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/</a>

### [][3]模块化定义

还有一些对于模块化一些专业的定义为：模块化是软件系统的属性，这个系统被分解为一组高内聚，低耦合的模块。那么在理想状态下[我们](https://www.w3cdoc.com)只需要完成自己部分的核心业务逻辑代码，其他方面的依赖可以通过直接加载被人已经写好模块进行使用即可。

首先，既然是模块化设计，那么作为一个模块化系统所必须的能力：

  1. 定义封装的模块。
  2. 定义新模块对其他模块的依赖。
  3. 可对其他模块的引入支持。  
    好了，思想有了，那么总要有点什么来建立一个模块化的规范制度吧，不然各式各样的模块加载方式只会将局搅得更为混乱。那么在JavaScript中出现了一些非传统模块开发方式的规范 CommonJS的模块规范，AMD（Asynchronous Module Definition），CMD（Common Module Definition）等。

### [][4]AMD规范

AMD，Asynchronous Module Definition，用白话文讲就是 异步模块定义，对于 JSer 来说，异步是再也熟悉不过的词了，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

AMD规范定义了一个自由变量或者说是全局变量 define 的函数。

AMD规范 <a href="https://github.com/amdjs/amdjs-api/wiki/AMD" target="_blank" rel="external">https://github.com/amdjs/amdjs-api/wiki/AMD</a>  
第一个参数 id，可选 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。  
第二个参数，dependencies ，可选，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。  
第三个参数，factory，是一个需要进行实例化的函数或者一个对象。  
下面列出简单的例子

#### [][5]实例1

创建模块标识为 alpha 的模块，依赖于 require， export，和标识为 beta 的模块 ,示例代码如下：

#### [][6]实例2

一个返回对象字面量的异步模块,代码如下：

#### [][7]实例3

无依赖模块可以直接使用对象字面量来定义，代码如下：

#### 实例4

类似与 CommonJS 方式定义，代码：

### [][8]AMD中的require模块

require API 介绍 <a href="https://github.com/amdjs/amdjs-api/wiki/require" target="_blank" rel="external">https://github.com/amdjs/amdjs-api/wiki/require</a>

在 AMD 规范中的 require 函数与一般的 CommonJS中的 require 不同。由于动态检测依赖关系使加载异步，对于基于回调的 require 需求强烈。

#### [][9]局部与全局的require

局部的 require 需要在AMD模式中的 define 工厂函数中传入 require。

局部的 require 需要其他特定的 API 来实现。  
全局的 require 函数是唯一全局作用域下的变量，像 define一样。  
全局的 require 并不是规范要求的，但是如果实现全局的 require函数，那么其需要具有与局部 require 函数 一样的以下的限定：

  1. 模块标识视为绝对的，而不是相对的对应另一个模块标识。
  2. 只有在异步情况下，require的回调方式才被用来作为交互操作使用。因为他不可能在同步的情况下通过 require(String) 从顶层加载模块。  
    依赖相关的API会开始模块加载。如果需要有互操作的多个加载器，那么全局的 reqiure 应该被加载顶层模块来代替。代码实例如下：  

amdjs 的API <a href="https://github.com/amdjs/amdjs-api/wiki" target="_blank" rel="external">https://github.com/amdjs/amdjs-api/wiki</a>

### [][10]RequireJS

官网 <a href="https://www.requirejs.org/" target="_blank" rel="external">https://www.requirejs.org/</a>  
API <a href="https://www.requirejs.org/docs/api.html" target="_blank" rel="external">https://www.requirejs.org/docs/api.html</a>

RequireJS 是一个[前端](https://www.w3cdoc.com)的模块化管理的工具库，遵循AMD规范，它的作者就是AMD规范的创始人 James Burke。所以说RequireJS是对AMD规范的阐述一点也不为过。

RequireJS 的基本思想为：通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），[我们](https://www.w3cdoc.com)所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。

那么scripts下的main.js则是指定的主代码脚本文件，所有的依赖模块代码文件都将从该文件开始异步加载进入执行。

defined用于定义模块，RequireJS要求每个模块均放在独立的文件之中。按照是否有依赖其他模块的情况分为独立模块和非独立模块。

#### [][11]独立模块

独立模块，不依赖其他模块。直接定义：

也等价于:

#### [][12]非独立模块

非独立模块，对其他模块有依赖。

或者：

简单看了一下RequireJS的实现方式，其 require 实现只不过是将 function 字符串然后提取 require 之后的模块名，将其放入依赖关系之中。  
在require进行调用模块时，其参数与define类似。

在加载 foo 与 bar 两个模块之后执行回调函数实现具体过程。当然还可以如之前的例子中的，在define定义模块内部进行require调用模块

define 和 require 这两个定义模块，调用模块的方法合称为AMD模式，定义模块清晰，不会污染全局变量，清楚的显示依赖关系。AMD模式可以用于[浏览器](https://www.w3cdoc.com)环境并且允许非同步加载模块，也可以按需动态加载模块。

### CMD规范

在CMD中，一个模块就是一个文件，格式为：

全局函数define，用来定义模块。  
1.参数 factory 可以是一个函数，也可以为对象或者字符串。  
2.当 factory 为对象、字符串时，表示模块的接口就是该对象、字符串。

#### 实例1

定义JSON数据模块：

#### 实例2

通过字符串定义模板模块：

#### 实例3

factory 为函数的时候，表示模块的构造方法，执行构造方法便可以得到模块向外提供的接口。

在CMD中，还有一种定义方法，

define也可以接受两个以上的参数，字符串id为模块标识，数组deps为模块依赖：

注意，这个用法与 AMD 规范用法不同。  
require 是 factory 的第一个参数。有下面几种方法：

require( id );接受模块标识作为唯一的参数，用来获取其他模块提供的接口：

require.async( id, callback? );require是同步往下执行的，需要的异步加载模块可以使用 require.async 来进行加载：

require.resolve( id ),可以使用模块内部的路径机制来返回模块路径，不会加载模块。  
exports 是 factory 的第二个参数，用来向外提供模块接口。例如：

当然也可以使用 return 直接向外提供接口。如下面：

也可以简化为直接对象字面量的形式，如下：

需要注意， 与nodeJS中一样需要注意的是，一下方式是错误的：

需要这么做

传入的对象引用可以添加属性，一旦赋值一个新的对象，那么值钱传递进来的对象引用就会失效了。开始之初，exports 是作为 module.exports 的一个引用存在，一切行为只有在这个引用上 factory 才得以正常运行，赋值新的对象后就会断开引用，exports就只是一个新的对象引用，对于factory来说毫无意义，就会出错。

module 是factory的第三个参数，为一个对象，上面存储了一些与当前模块相关联的属性与方法。  
module.id 为模块的唯一标识。  
module.uri 根据模块系统的路径解析规则得到模块的绝对路径。  
module.dependencies 表示模块的依赖。  
module.exports 当前模块对外提供的接口。

### [][13]seaJS介绍

官网 <a href="https://seajs.org/docs/" target="_blank" rel="external">https://seajs.org/docs/</a>  
API快速参考 <a href="https://github.com/seajs/seajs/issues/266" target="_blank" rel="external">https://github.com/seajs/seajs/issues/266</a>  
sea.js 核心特征：

    <code>1. 遵循CMD规范，与NodeJS般的书写模块代码。 2. 依赖自动加载，配置清晰简洁。 
    </code>

兼容 Chrome 3+，Firefox 2+，Safari 3.2+，Opera 10+，IE 5.5+。  
seajs.use ，用来在页面中加载一个或者多个模块

其define 与 require 使用方式基本就是CMD规范中的示例。

### [][14]AMD与CMD区别

看了以上 AMD，requireJS 与 CMD， seaJS的简单介绍会有点感觉模糊，总感觉较为相似。因为像 requireJS 其并不是只是纯粹的AMD固有思想，其也是有CMD规范的思想，只不过是推荐 AMD规范方式而已， seaJS也是一样。

下面是玉伯对于 AMD 与 CMD 区别的解释：

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。  
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出还有不少??

这些规范的目的都是为了 JavaScript 的模块化开发，特别是在[浏览器](https://www.w3cdoc.com)端的。  
目前这些规范的实现都能达成[浏览器](https://www.w3cdoc.com)端模块化开发的目的。

区别：

  1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
  2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：  

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

  1. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。
  2. 还有一些细节差异，具体看这个规范的定义就好，就不多说了。  
    另外，SeaJS 和 RequireJS 的差异，可以参考：<a href="https://github.com/seajs/seajs/issues/277" target="_blank" rel="external">https://github.com/seajs/seajs/issues/277</a>

### [][15]总结

本文主要是介绍了一下 AMD CMD的规范，顺便简单的讲述了一下 requireJS 与 seaJS。讲的较为笼统，下面的扩展阅读可以更好的帮助你理解模块化以及各个规范。

### [][16]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#模块化思想 "模块化思想"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/amd_cmd.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#模块化定义 "模块化定义"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#AMD规范 "AMD规范"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#实例1 "实例1"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#实例2 "实例2"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#实例3 "实例3"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#AMD中的require模块 "AMD中的require模块"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#局部与全局的require "局部与全局的require"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#RequireJS "RequireJS"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#独立模块 "独立模块"
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#非独立模块 "非独立模块"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#seaJS介绍 "seaJS介绍"
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#AMD与CMD区别 "AMD与CMD区别"
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#总结 "总结"
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/02/28/2015_amd_cmd/#谢谢！ "谢谢！"
