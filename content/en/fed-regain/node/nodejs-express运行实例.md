---
title: NodeJS Express运行实例

---

### [][1]前言

最近在学NodeJS，其实以前学过，好长时间没有用，就忘记了。想想还是比较可惜的。最近学习也是从看资料开始，偶尔看到一些博客写的真的很不错。但是都是零零碎碎的。而且很多都是老版本的，按照博客的写法一步一步走过来，很多地方要么报错，要么都不能用。  
自己也是找了很多资料，所以打算把这些更改的地方写一下，正确的写法记录一下，分享给想学的同学，让[大家](https://www.w3cdoc.com)都少走弯路，节省学习成本。  
 
![NodeJS Express运行实例][2]  
转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/</a>

### [][3]安装NodeJS环境

**step1:** 进入官网(<a href="https://www.nodejs.org/" target="_blank" rel="external">https://www.nodejs.org/</a> )，下载安装包安装，本文作者用的是win8.1系统。windows系统会自动将nodeJS安装后的路径加到系统环境变量path中，如果你在cmd控制台输入：node，没有反应，则说明你的这个nodeJS目录没有添加到系统环境变量中，请手动添加。  
我的nodeJS版本如下：

**step2:** 安装Express框架，Express是WEB开发框架，你可以认为类似java中的spring web mvc或者php中的thinkPHP，或者Ruby中的rails，或者python中的Django框架。利用这可框架可以大大提高开发效率，至于该框架的原理，后期高级课程在说明。[我们](https://www.w3cdoc.com)先入为主，先有一些主观的概念。  
安装方法及版本：

**step3:** 使用Express构建web项目

其中，-e是-ejs的缩写，指的是使用ejs模板，另外还有一种用的比较多的模板是jade，这里不做多介绍。上面的命令会自动创建项目工程目录nodetest，并自动生成package.json文件，然后[我们](https://www.w3cdoc.com)进入改工程文件，然后安装依赖包。这样最简单的web项目就创建成功了。  
**step4：** 安装supervisor

安装supervisor的优点是每次修改完代码之后，supervisor插件会自动应用更改，不用再手工部署。[我们](https://www.w3cdoc.com)现在启动刚才的web工程。

**step5：** 打开[浏览器](https://www.w3cdoc.com)访问（<a href="https://localhost:3000/" target="_blank" rel="external">https://localhost:3000/</a> ），能看到express的欢迎信息，恭喜您，第一个web工程建好了。

### [][4]项目目录结构

☞ node_modules, 存放所有的项目依赖库。(每个项目管理自己的依赖，与Maven,Gradle等不同)  
☞ package.json，项目依赖配置及开发者信息  
☞ app.js，程序启动文件  
☞ public，静态文件(css,js,img)  
☞ routes，路由文件(MVC中的C,controller)  
☞ Views，页面文件(Ejs模板)  
**step6：** 修改程序，ejs后缀的模板看着不爽，想改成html的，可以！修改：app.js

**step7：** 开发一个简单的登录页面，首先下载比较流行的bootstrap界面框架（<a href="https://www.bootcss.com/" target="_blank" rel="external">https://www.bootcss.com/</a> ），分别将：  
-css目录复制到public/stylesheets目录  
-js目录复制到public/javascripts目录，需要添加jquery库  
为了方便，[我们](https://www.w3cdoc.com)将页面分为三个部分，头部head.html、内容部分login.html、底部信息栏foot.html  
☞ head.html, 为html页面的头部区域  
☞ index.html,home.html, 为内容显示区域  
☞ foot.html，为页面底部区域  
_head.html_

_foot.html_

_index.html_

_home.html_

_login.html_

### [][5]编写路由规则

**step8:** 打开app.js，发现有这么一行：

上面的语法意思是，拦截所有的根路径请求，交给routes处理，routes实际上是指index中定义的实例。[我们](https://www.w3cdoc.com)这里只需要打开routes目录下的index文件，设置相应的路由规则。  
_routes/index.js_

打开[浏览器](https://www.w3cdoc.com)，你可以登录了。是不是很简单，下面学学session控制，将登录信息放到session中，便于共享数据。

### [][6]使用SESSION传递参数

分析上面的程序：  
☞ 在login页面提交参数的时候，直接比较参数  
☞ home页面又重新对user赋值，常规的做法应该把user放到session中

不同语言的session处理机制：  
☞ Java的web服务器，是多线程调用模型。每用户请求会打开一个线程，每  
个线程在内容中维护着用户的状态。在JVM中会维护session的状态，做持久化操作等。  
☞ PHP的web服务器，是交行CGI的程序处理，CGI是无状态的，所以一般  
用cookie在客户的[浏览器](https://www.w3cdoc.com)是维护用户的状态。但cookie在客户端维护的信  
息是不够的，所以CGI应用要模仿用户session，就需要在服务器端生成  
一个session文件存储起来，让原本无状态的CGI应用，通过中间文件的  
方式，达到session的效果。当然phph也可以把session存储到数据库中。  
☞ Nodejs的web服务器，也是CGI的程序无状态的，与PHP不同的地方在于，  
单线程应用，所有请求都是异步响应，通过callback方式返回数据。如果  
[我们](https://www.w3cdoc.com)想保存session数据，也是需要找到一个存储，通过文件存  
储,redis,Mongdb都可以。

### [][7]使用mongodb保存用户session

安装mongoDB，建立数据库test，即可，这里默认会建立数据表session。关于mongoDB的安装使用，下次再做学习。  
**说明一点：express4版本之后，session这些处理从express插件中分离出来，**所以这里[我们](https://www.w3cdoc.com)需要安装两个插件：

修改app.js，增加session处理，如下；

在app.js同级建立settings.js配置文件，  
_settings.js_

然后[我们](https://www.w3cdoc.com)再次修改路由配置文件routes/index.js，增加session处理，

### [][8]exports与module.exports

关于这个，用户在编写调用自己的module时，肯定会遇到。下面解释一下：

  1. module应该是require方法中，上下文中的对象

  2. exports对象应该是上下文中引用module.exports的新对象

  3. exports.a = xxx 会将修改更新到module.exports对象中

  4. exports = xxx 直接改变了 exports的指向

上面这4条揭示了这两个对象的本质。也就是说exports指向module.exports. 如果写exports.a =1, 意味着module.exports.a也等于1。

但如果写成exports=function A(){}, 这个时候, module.exports与exports指的是不同的对象了。这个时候用require引入包括前面这个语句的js文件时，就不能访问exports所指向的function A. 因为require返回的是module.exports所指向的对象。如果想能被引用到也可以写成:module.exports=exports=function A(){};知道这一点的话，如果你想返回function A()就要写成module.exports=function A(){}; 要不然就老老实实地写成exports.A=function A(){}. 只是这两种写法在require之后调用写法不一样而已。  
对于：exports=function A(){}，  
调用方法：  
var A = require(‘./A.js’);  
A()  
对于：module.exports=exports=function A(){};或  
module.exports=function A(){};或  
exports.A=function A(){}，  
调用方法：  
var A = require(‘./A.js’);  
A.A()  
参考  
<a href="https://www.cnblogs.com/vincedotnet/p/3439975.html" target="_blank" rel="external">https://www.cnblogs.com/vincedotnet/p/3439975.html</a>  
<a href="https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs/7142924#7142924" target="_blank" rel="external">https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-nodejs/7142924#7142924</a>

### [][9]谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#前言 "前言"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/npm.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#安装NodeJS环境 "安装NodeJS环境"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#项目目录结构 "项目目录结构"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#编写路由规则 "编写路由规则"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#使用SESSION传递参数 "使用SESSION传递参数"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#使用mongodb保存用户session "使用mongodb保存用户session"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#exports与module-exports "exports与module.exports"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/#谢谢！ "谢谢！"
