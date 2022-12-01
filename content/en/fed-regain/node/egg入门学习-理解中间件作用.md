---
title: Egg入门学习—理解中间件作用

---
Egg是基于koa的，因此Egg的中间件和Koa的中间件是类似的。都是基于洋葱圈模型的。

在Egg中，比如我想禁用某些IP地址来访问[我们](https://www.w3cdoc.com)的网页的时候，在egg.js中[我们](https://www.w3cdoc.com)可以使用中间件来实现这个功能，中间件的作用无非就是说在Egg的外层在包一层来判断某些事情是否符合要求，也就是在洋葱圈模型外面再进行包一层。

在Egg中，中间件也有自己的配置和目录，因此在Egg中约定了中间件是放在 app/middleware 目录中的文件。该文件需要exports一个普通的function. 因此整个项目的目录变成如下这个样子：

<div class="cnblogs_code">
  <pre>egg-demo2
├── app
│   ├── controller                # 用于解析用户的输入，处理后返回响应的结果
│   │   └── home.js
|   |   |-- index.js
│   └── router.js                 # 用于配置url路由的配置规则
│   ├──public                     # 资源文件目录
|   | |---css
|   | | |-- index.css
|   | |---js
|   | | |-- index.js
|   |--- view                     # 存放模板文件的目录
|   | |-- index
|   | | |-- list.tpl（模板文件list）
|   |--- service                  # 编写业务逻辑的目录
|   | |--- index.js
|   |--- middleware               # 用于编写中间件的目录
|   | |--- xxx.js
├── config                        # 相关的配置文件
│   └── config.default.js
└── package.json</pre>
</div>

**编写中间件**

[我们](https://www.w3cdoc.com)在 app/middleware 目录中 新建一个 forbidIp.js 文件，该文件的作用是 禁用某些ip地址访问[我们](https://www.w3cdoc.com)的网页。因此代码编写如下：

<div class="cnblogs_code">
  <pre>module.exports = (options, app) => {
  return async function forbidIp(ctx, next) {
    console.log(options);
    console.log('---------');
    console.log(app);

    // 需要被屏蔽的id
    const ids = options.forbidips;
    // 获取客户端的ip
    const clientIp = ctx.request.ip;

    const isHasIp = ids.some(val => {
      if (val === clientIp) {
        return true;
      }
      return false;
    });
    if (isHasIp) {
      ctx.status = 403;
      ctx.body = '您的IP已经被屏蔽掉了';
    } else {
      await next();
    }
  }
}</pre>
</div>

**使用中间件**

如上中间件编写完成后，[我们](https://www.w3cdoc.com)还需要手动挂载中间件。因此[我们](https://www.w3cdoc.com)需要在 config/config.default.js 中加入下面的配置就可以完成了中间件的开启和配置：代码如下：

<div class="cnblogs_code">
  <pre>// 配置需要的中间件，数组的顺序即为中间件加载的顺序
exports.middleware = [
  'forbidIp'
];
// 上面中间件的配置 ip
exports.forbidIp = {
  forbidips: [
    '192.168.1.12',
    '127.0.0.1',
  ]
}</pre>
</div>

**注意：**如上 exports.middleware = [&#8216;forbidIp&#8217;]; 该 forbidIp 指向与 app/middleware 中的 forbidIp.js， 因此需要注意大小写。也就是说是 forbidIp.js 中间件。然后下面的 exports.forbidIp = {}; forbidIp中间件的名字也需要一样的。exports.forbidIp 里面的对象就是中间件的ip配置了。

如上中间件代码，它接收两个参数：options 和 app;  
options参数指的是 app.config[${middlewareName}]传进来。[我们](https://www.w3cdoc.com)在 如上中间件代码中打印 options; console.log(options); 及 打印 console.log(app); 如下图所示：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000755863-1356246613.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000755863-1356246613.png?x-oss-process=image/format,webp" alt="" />

可以看到 console.log(options); options参数的值就是 config配置项中的

<div class="cnblogs_code">
  <pre>{
  forbidips: [
    '192.168.1.12',
    '127.0.0.1',
  ]
}</pre>
</div>

打印 config.log(app) 的值，如上图所示；它的含义是指 当前应用Application的实列。

因此[我们](https://www.w3cdoc.com)继续访问 http://127.0.0.1:7001/ 后可以看到如下信息，页面被禁用了。如下图所示：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000830588-805829055.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000830588-805829055.png?x-oss-process=image/format,webp" alt="" />

如果[我们](https://www.w3cdoc.com)继续把 config/config.default.js 配置代码改成其他的ip地址，代码如下：

<div class="cnblogs_code">
  <pre>// 配置需要的中间件，数组的顺序即为中间件加载的顺序
exports.middleware = [
  'forbidIp'
];
// 上面中间件的配置 ip
exports.forbidIp = {
  forbidips: [
    '192.168.1.12',
    '127.0.0.12'
  ]
}</pre>
</div>

[我们](https://www.w3cdoc.com)继续访问 http://127.0.0.1:7001/ 后，页面就正常了。如下所示：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000901994-1553035697.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/561794-20190110000901994-1553035697.png?x-oss-process=image/format,webp" alt="" />

**二：在 router.js路由中使用中间件。**

如上使用中间件都是全局的，每一次请求都会处理的，但是有时候我想针对单个路由生校的话，[我们](https://www.w3cdoc.com)就不需要再 config中配置了。[我们](https://www.w3cdoc.com)直接在路由中配置即可。

router.js在未使用中间件处理之前代码是如下：

<div class="cnblogs_code">
  <pre>module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/index', controller.index.list);
}</pre>
</div>

现在[我们](https://www.w3cdoc.com)需要在 router.get(&#8216;/&#8217;); 下使用禁用ip中间件，因此[我们](https://www.w3cdoc.com)可以先注释掉 config中全局的中间件配置。[我们](https://www.w3cdoc.com)可以直接在 router.js 下处理即可，如下代码所示：

首先：config/config.default.js 代码注释掉中间件：

<div class="cnblogs_code">
  <pre>/*
// 配置需要的中间件，数组的顺序即为中间件加载的顺序
exports.middleware = [
  'forbidIp'
];
// 上面中间件的配置 ip
exports.forbidIp = {
  forbidips: [
    '192.168.1.12',
    '127.0.0.12'
  ]
}
*/</pre>
</div>

然后在单个路由中使用中间件, router.js的代码如下：

<div class="cnblogs_code">
  <pre>module.exports = app => {
  const { router, controller } = app;

  // 路由中使用中间件
  const forbidIp = app.middleware.forbidIp({
    forbidips: [
      '127.0.0.1'
    ]
  });

  router.get('/', forbidIp, controller.home.index);
  router.get('/index', controller.index.list);
}</pre>
</div>

然后[我们](https://www.w3cdoc.com)继续访问 http://127.0.0.1:7001/ 后，页面也会提示该ip地址已经被屏蔽掉了。

更多的关于中间件配置介绍，请看官网中介绍的<a href="https://eggjs.org/zh-cn/basics/middleware.html" target="_blank" rel="noopener noreferrer">（https://eggjs.org/zh-cn/basics/middleware.html）</a>
