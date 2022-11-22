---
title: node发送http请求以及参数处理


date: 2017-08-29T04:45:48+00:00
excerpt: “学骑自行车最快的方式就是先骑上去”本文主要介绍如何发布自己的npm插件到npm社区，那么别人就可以直接使用npm install的命令安装你的模块了，并不会讲解npm模块的编写方法和相关知识，其实你可以自己研究一下其他npm模块的代码。本文最后会介绍如何删除自己发布的npm模块。
url: /javascriptnodejs/746.html
views:
  - 1683
  - 1683


---
  


> “学骑自行车最快的方式就是先骑上去”

本文主要介绍如何发布自己的npm插件到npm社区，那么别人就可以直接使用npm install的命令安装你的模块了，并不会讲解npm模块的编写方法和相关知识，其实你可以自己研究一下其他npm模块的代码。本文最后会介绍如何删除自己发布的npm模块。  
<a></a>  
![node发送http请求以及参数处理][1] 

### [][2]安装node和npm

安装node(注意：需要Python 2.6或2.7已经安装)





成功安装node之后，npm(node package manager)已经包含在内了，不需要独立安装，可以执行一下npm检查是否安装好。





### [][3]创建repository

接下来我们需要创建module所需的repository，默认你拥有一个github账号（如果没有自行解决），这个repository用来托管我们module的代码，并方便用户报告bug，最重要的是可以让其他开发者向module贡献代码，这也是乐趣所在。

### [][4]初始化package.json

接下来我们创建package.json文件，这个文件包含了module的所有信息，比如名称、版本、描述、依赖、作者、license等。笔者以自己的easy_mongo(注意：npm要求项目的名称必须为小写字母)项目为例，看如何创建package.json。

首先创建我们module的目录





之后执行npm init，系统会提示你输入所需的信息，不想输入的直接输入Enter可以跳过。





输入完成之后，系统会要你确认文件的内容是否有误，如果没有问题直接输入yes，那么package.json就创建好了。





npm init创建的package.json文件只包含了基本的信息，我们还需要加入对其他module的依赖关系：





### [][5]项目结构

package.json文件只是第一步，要完成一个module，我们还需要许多其他文件，整体的文件夹结构如下：





这些文件的作用是：





### [][6]持续集成

开源项目多如牛毛，从中找出靠谱的项目需要花费一定的精力，开发者都会对持续更新，并且经过测试（很多公司采用）的项目更加的信赖，对于刚上线并且用户数量很少的项目开发者都会有个疑虑：这项目靠谱吗？所以你需要对自己的项目打上一个标识：老子的项目靠谱。如何做？持续集成。

目前Github已经整合了持续集成服务travis，我们只需要在项目中添加.travis.yml文件，在下一次push之后，travis就会定时执行npm test来测试你的项目，并且会在测试失败的时候通知到你，你也可以把项目当前的状态显示在README.md中，让人一目了然，比如：





.travis.yml是一个YAML文件，关于node.js相关的配置见这里，例子如下：





这个例子的是让travis在node.js的0.6.x，0.8.x，0.10.x三个版本下对项目进行测试，并且需要mongodb的服务。

### [][7]发布

完成了上面的步骤之后，我们接下来要在www.npmjs.org注册一个账号，这个账号会被添加到npm本地的配置中，用来发布module用。





如果出现以下错误，可能是你的npm版本太低，通过sudo npm install -g npm升级一下。





成功之后，npm会把认证信息存储在~/.npmrc中，并且可以通过以下命令查看npm当前使用的用户：





以上完成之后，我们终于可以发布自己的module了：





npm社区版本号规则采用的是semver(语义化版本)，主要规则如下：

版本格式：主版号.次版号.修订号，版号递增规则如下：  
主版号：当你做了不相容的 API 修改，  
次版号：当你做了向下相容的功能性新增，  
修订号：当你做了向下相容的问题修正。  
先行版号及版本编译资讯可以加到「主版号.次版号.修订号」的后面，作为延伸。  
至此，我们已经成功把module发布到了npmjs.org，是不是很简单，快动手把自己的module也贡献出来吧。

### [][8]删除发布的模块

如何删除呢，执行下面的命令：





### [][9]参考

  1. <a href="https://github.com/npm/npm" target="_blank" rel="external">https://github.com/npm/npm</a>
  2. <a href="https://www.npmjs.org/doc/api/npm-publish.html" target="_blank" rel="external">https://www.npmjs.org/doc/api/npm-publish.html</a>
  3. <a href="https://www.npmjs.org/doc/cli/npm-adduser.html" target="_blank" rel="external">https://www.npmjs.org/doc/cli/npm-adduser.html</a>
  4. <a href="https://docs.travis-ci.com/user/languages/javascript-with-nodejs/" target="_blank" rel="external">https://docs.travis-ci.com/user/languages/javascript-with-nodejs/</a>
  5. <a href="https://docs.travis-ci.com/user/database-setup/" target="_blank" rel="external">https://docs.travis-ci.com/user/database-setup/</a>
  6. <a href="https://semver.org/" target="_blank" rel="external">https://semver.org/</a>

### [][10]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_npm_publish/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_npm_publish/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/npm-2.jpg
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#安装node和npm "安装node和npm"
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#创建repository "创建repository"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#初始化package-json "初始化package.json"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#项目结构 "项目结构"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#持续集成 "持续集成"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#发布 "发布"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#删除发布的模块 "删除发布的模块"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#参考 "参考"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/12/11/2015_node_http/#谢谢！ "谢谢！"