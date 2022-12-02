---
title: egg理解service使用

---
这篇文章[我们](https://www.w3cdoc.com)首先来看看官网对Egg的整个框架的约定如下，及约定对应的目录是做什么的，来有个简单的理解，注意：我也是按照官网的来理解的。

<div class="cnblogs_code">
  <pre>egg-project
├── package.json
├── app.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── xxx.js
│   ├── schedule (可选)
│   |   └── xxx.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js</pre>
</div>

**app/router.js** 是使用与配置url的路由规则的。  
**app/controller/**** 用于解析用户的输入，处理后返回响应的结果。  
**app/service/**** 用于编写业务逻辑层。  
**app/middleware/**** 用于编写中间件。  
**app/public/**** 用于放置静态资源。  
**app/extend/**** 用于框架的扩展。  
**config/config.{env}.js** 用于编写配置文件。  
**config/plugin.js** 用于编写需要加载的插件。

application.js —— this指向：app对象, 调用：this.app

<div>
  <div>
    
      context.js —— this指向：ctx对象，调用：this.ctx
    

    
      request.js —— this指向：ctx.request对象，调用：this.ctx.request
    
    
    
      response.js —— this指向：ctx.response对象，调用：this.ctx.response
    
    
    
      helper.js —— this指向：ctx.helper对象，调用：this.ctx.helper
    
  </div>
test/** 一般用于单元测试。<br />app.js 一般用于启动时候的初始化。<br />app/view/** 用于放置模板文件，具体是做模板渲染的。<br />app/model/** 用于放置领域模型，由领域类相关插件约定。如 egg-sequelize
</div>

如上就是官网中对egg目录的约定，[我们](https://www.w3cdoc.com)只需要在对应目录中写对应的代码即可，框架内部会自动会帮[我们](https://www.w3cdoc.com)把内部代码组织起来，具体怎么组织的，它的主要逻辑应该在 egg-core 中，在接下来的学习中，我会逐步学习egg-core源码来理解egg整个框架的原理的。  
现在[我们](https://www.w3cdoc.com)只需要知道就是这样使用就行了。

上一篇文章[我们](https://www.w3cdoc.com)是使用的是静态数据来渲染页面的，这边文章[我们](https://www.w3cdoc.com)使用 app/service 文件下来使用ajax接口来获取数据的demo。因为在项目当中数据不可能是[我们](https://www.w3cdoc.com)写死的，而是接口动态获取的。  
在上一篇Egg入门学习中,[我们](https://www.w3cdoc.com)项目渲染整个目录结构如下：

<div class="cnblogs_code">
  <pre>egg-demo2
├── app
│   ├── controller
│   │   └── home.js
|   |   |-- index.js
│   └── router.js
│   ├──public
|   | |---css
|   | | |-- index.css
|   | |---js
|   | | |-- index.js
|   |--- view
|   | |-- index
|   | | |-- list.tpl（模板文件list）
├── config
│   └── config.default.js
└── package.json</pre>
</div>

app/controller/home.js 代码如下：

<div class="cnblogs_code">
  <pre>const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}
module.exports = HomeController;</pre>
</div>

app/controller/index.js 代码如下：

<div class="cnblogs_code">
  <pre>// app/controller/index.js
const Controller = require('egg').Controller;

class IndexController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: '今天是我第一天学习egg了', url: '/index/1' },
        { id: 2, title: '今天是我第一次学习egg了', url: '/index/2' }
      ]
    };
    await this.ctx.render('index/list.tpl', dataList);
  }
}
module.exports = IndexController;</pre>
</div>

**app/controller/** 用于解析用户的输入，处理后返回响应的结果。**如上 home.js 和 index.js 使用是Es6的类来编写代码，它都继承了 egg中的Controller，其中index.js 定义了 dataList 对象数据，然后使用ctx.render把数据渲染到 模板里面去。
这里的模板就是 app/view/index/list.tpl的，在上面的目录中，[我们](https://www.w3cdoc.com)可以看到 view和controller是同级目录的，在egg内部会直接找到view这个目录的，然后对模板 index/list.tpl这个目录进行解析。这就是 app/controller/** 的作用，它用于解析用户输入，然后把结果会渲染到模板里面去，处理模板后就会返回响应的结果。

**app/public/** 目录的的作用是 用于放置静态资源**。比如css和js，然后在 app/view/** 中的模板文件引入该资源文件即可  
在页面中调用。

**app/view/** 文件的作用是用于放置模板文件，具体是做模板渲染的**。[我们](https://www.w3cdoc.com)在 app/view/index/list.tpl 的代码如下：

<pre><!-- app/view/index/list.tpl -->

</pre>


 
      {% for item in list %}

      
        <a href="{{ item.url }}">{{ item.title }}</a>
      
    


{% endfor %}

<pre></pre>

如上，在app/controller/index.js 中，[我们](https://www.w3cdoc.com)把 dataList 对象渲染到该模板中，其中 dataList 对象中有一个list数组。  
因此在该模板中，[我们](https://www.w3cdoc.com)直接使用 egg-view-nunjucks 模板引擎的语法来循环遍历即可把数据渲染出来。

app/router.js 的作用是配置url路由规则的，代码如下：

<div class="cnblogs_code">
  <pre>module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/index', controller.index.list);
}</pre>
</div>

在如上参数 app 可能会把 router, controller 等等都挂载该对象上面，因此也是使用es6语法把它导入进来，然后使用router路由get请求，当[我们](https://www.w3cdoc.com)访问：http://127.0.0.1:7001/ 的时候，[我们](https://www.w3cdoc.com)就会调用 controller.home.index 模板，也就是会找到app/controller/home.js 的文件，然后调用里面的 index()方法。即可执行。

当[我们](https://www.w3cdoc.com)访问 http://127.0.0.1:7001/index 的时候，[我们](https://www.w3cdoc.com)就会调用 app/controller/index.js 的文件，然后调用里面的list方法，然后执行list方法，就会把数据渲染到对应中的模板里面去，然后对应的模板就会对数据进行渲染，渲染完成后就会在页面中返回对应的结果出来。

在项目中 会有一个config配置文件，所有的配置写在该 config/config.default.js 中，当然官网还有其他的配置文件，比如叫：config.prod.js，config.local.js 等等。config/config.default.js 代码配置如下：

<div class="cnblogs_code">
  <pre>// 下面是我自己的 Cookie 安全字符串密钥
exports.keys = '123456';

// 添加view配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
};</pre>
</div>

比如上面叫 export.view 是对 view下的模板文件配置默认的模板引擎。其中mapping含义应该是映射的含义吧，应该是把模板引擎映射到有关 .tpl后缀的文件中。

这就是之前那篇文章的所有的简单的理解目录结构。那么[我们](https://www.w3cdoc.com)知道之前那篇文章是数据是写死在 app/controller/**中的，但是在[我们](https://www.w3cdoc.com)项目实际应用中，[我们](https://www.w3cdoc.com)的数据不应该是写死的，那就可能请求ajax接口，然后把接口的数据返回回来，[我们](https://www.w3cdoc.com)再把对应的数据渲染出来。
从上面[我们](https://www.w3cdoc.com)了解到 app/controller/\*\* 用于解析用户的输入，处理后返回响应的结果。所以对于ajax接口请求具体的业务逻辑，[我们](https://www.w3cdoc.com)复杂的业务逻辑不应该放在该目录下，该目录下只是做一些简单的用户输入，那么复杂的业务逻辑，[我们](https://www.w3cdoc.com)这边就应该放到 app/service/\*\* 目录下。因此[我们](https://www.w3cdoc.com)需要把具体的业务逻辑代码写到 app/service/** 中。

现在[我们](https://www.w3cdoc.com)需要在 app/ 下新建一个 service目录，在该目录下新建一个 index.js 来处理具体的业务逻辑代码。

业务代码如下：

<div class="cnblogs_code">
  <pre>// app/service/index.js

const Service = require('egg').Service;
class IndexService extends Service {
  async list(page = 1) {
    // 读取config下的默认配置
    const { serverUrl, pageSize } = this.config.index;

    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`
      },
      dataType: 'json',
    });

    const indexList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return indexList.map(res => res.data);
  }
};

module.exports = IndexService;</pre>
</div>

[我们](https://www.w3cdoc.com)现在需要把 app/controller/index.js 代码改成如下：

<div class="cnblogs_code">
  <pre>// app/controller/index.js
const Controller = require('egg').Controller;

class IndexController extends Controller {
  async list() {
    /*
    const dataList = {
      list: [
        { id: 1, title: '今天是我第一天学习egg了', url: '/index/1' },
        { id: 2, title: '今天是我第一次学习egg了', url: '/index/2' }
      ]
    };
    */
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const indexList = await ctx.service.index.list(page);

    await ctx.render('index/list.tpl', { list: indexList });
  }
}

module.exports = IndexController;</pre>
</div>

然后在 config/config.default.js 配置中添加对应的请求 url 和 页码大小配置如下：

<div class="cnblogs_code">
  <pre>// 下面是我自己的 Cookie 安全字符串密钥

exports.keys = '123456';

// 添加view配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
};

// 添加index 的 配置项
exports.index = {
  pageSize: 10,
  serverUrl: 'https://hacker-news.firebaseio.com/v0'
};</pre>
</div>

然后[我们](https://www.w3cdoc.com)在 [浏览器](https://www.w3cdoc.com)访问 http://127.0.0.1:7001/index 后，在页面中返回如下页面：


  <img loading="lazy" width="1940" height="1374" class="alignnone size-full wp-image-6120 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/format,webp 1940w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_212/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_567/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_544/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5facdce64dc7e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_1088/format,webp 1536w" sizes="(max-width: 1940px) 100vw, 1940px" />

![][1]

因为接口是node服务器端渲染的，所以在[浏览器](https://www.w3cdoc.com)中是看不到请求的。

**注意：** https://hacker-news.firebaseio.com/v0 这个请求想请求成功 需要chrome翻墙下才能请求成功，当然[我们](https://www.w3cdoc.com)也可以换成  
自己的请求接口地址的。

**app/service/index.js 中，**[我们](https://www.w3cdoc.com)继承了egg中的Service实列，在用户的每次请求中，框架都会实列化对应的Service实列。因此Service会提供有如下属性值：

**this.ctx：** 当前请求的上下文 Context对象的实列，[我们](https://www.w3cdoc.com)就可以拿到该框架封装好的当前请求的各种属性和方法。  
**this.app:** 当前应用的Application对象的实列，通过它[我们](https://www.w3cdoc.com)就可以拿到框架提供的全局对象和方法。  
**this.servie:** 应用定义的Service，通过它可以访问到其他的业务层。等价于 this.ctx.service.  
**this.config:** 可以拿到应用时的配置项对应的目录。默认指向与 config.default.js.

**Service 提供如下方法：**  
**this.ctx.curl** 发起网络调用请求。  
**this.ctx.service.otherService** 调用其他的Service.  
**this.ctx.db** 发起数据库调用等。db可能是其他插件提取挂载到app上的模块。

**注意：**  

1. 一个Service文件只能包含一个类，这个类需要通过 module.exports 的方式返回。  
2. Service需要通过Class的方式定义，父类必须是 egg.Service.  
3. Service不是单列，是请求级别的对象，框架在每次请求中首次访问 ctx.service.xx 时延迟实例化，所以[我们](https://www.w3cdoc.com)建议在Service中  
可以通过 this.ctx获取当前请求的上下文。

因此现在项目目录结构就变成如下了：

<div class="cnblogs_code">
  <pre>egg-demo2
├── app
│   ├── controller
│   │   └── home.js
|   |   |-- index.js
│   └── router.js
│   ├──public
|   | |---css
|   | | |-- index.css
|   | |---js
|   | | |-- index.js
|   |--- view
|   | |-- index
|   | | |-- list.tpl（模板文件list）
|   |--- service
|   | |--- index.js
├── config
│   └── config.default.js
└── package.json</pre>
</div>

其他有关Egg相关的文章下篇待续，继续来了解下egg相关的知识点。

 [1]: https://img2018.cnblogs.com/blog/561794/201901/561794-20190105234127356-2026486185.png
