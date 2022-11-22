---
title: Grunt，Gulp工具


---
  


### [][1]工具介绍

一个应用开发到一定阶段，普遍会遇到一个问题。当功能越来越多，代码量越来越大，bug修复越来越频繁，开发人员一波一波的交替，…..应该用会向着越来越不可控发展。我们不能再准确估计新功能的开发时间，也不知道一个bug修复后是否会引发另一个bug出现。所有的程序开发，都会面临着这样的问题。C/C++程序通过makefile管理编译测试打包的过程，Java程序通过Maven,Ant实现项目构建管理功能，Python有pip，Ruby有gem。在Nodejs的领域，我们同样需要一个项目构建工具。

本节主要介绍两种自动化构建工具，包括Grunt和Gulp，后续篇章中还会介绍bower包管理工具和Yeoman构建工具。这里先详细介绍这两种自动化构建工具，gulp.js 是一种基于流的，代码优于配置的新一代构建工具。Gulp 和 Grunt 类似。但相比于 Grunt 的频繁的 IO 操作，Gulp 的流操作，能更快地完成构建。  
<a></a>  
![Grunt，Gulp工具][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/</a>

### [][3]Grunt配置及安装

Grunt是一个自动化的项目构建工具. 如果你需要重复的执行像压缩, 编译, 单元测试, 代码检查以及打包发布的任务. 那么你可以使用Grunt来处理这些任务, 你所需要做的只是配置好Grunt, 这样能很大程度的简化你的工作.如果在团队中使用Grunt, 你只需要与其他人员约定好使用Grunt应该规避的问题, 就能够很方便的自动化的处理大部分的常见工作任务, 你所付出的努力几乎为0.

#### [][4]准备工作

Grunt和相关插件是通过npm管理的，目前新版本是Grunt 0.4.x，要求NodeJS版本 > 0.8.0。安装之前请确保你的npm是最新的。可以通过

来升级。如果你安装了Grunt旧版本，先执行

然后安装grunt-cli，注意grunt-cli的作用是管理本地各版本的grunt，让命令行可以直接执行grunt命令，类似于grunt的客户端管理工具。

执行结果如下，我们看到grunt-cli似乎做了一个软件链接，把grunt脚本复制到nodejs安装根目录里。

#### [][5]安装Grunt之前，先要配置Grunt。

在项目根目录创建package.json 和 Gruntfile.js 文件，其中package.json 主要配置项目自动化所依赖的相关插件。Gruntfile.js 是项目自动化工作流配置文件，这个是grunt自动化构建的核心。然后在<a href="https://gruntjs.com/getting-started#package.json" target="_blank" rel="external">官网示例</a>粘贴示例。  
package.json 文件如下：  
![Grunt，Gulp工具][6]  
Gruntfile.js 文件修改如下：  
![Grunt，Gulp工具][7]  
相关介绍:  
每个Gruntfile都有一个基本的格式，所有的Grunt代码都在这个函数中定义：

grunt.initConfig是一个初始化方法，有时候Grunt的任务会依赖某些配置文件，可以在这里初始化。比如本例中的_grunt.file.readJSON(‘package.json’)_就是导入了**package.json**中的配置参数，这个参数在后面的任务脚本中会用到。这里面同时定义了一个简单的uglify任务，通过src和dist指定该任务的源目录与目标目录。紧接着：

这个是插件声明。其他的任务像是 concatenation, minification and linting 都可以作为grunt的插件加载进来。

这一部分是自定义的人物组合，_default_是默认的参数，也就是输入**grunt**时会匹配该行任务，会执行_uglify_所定义的任务。其他的例如：

这个在执行**grunt test**时会自动匹配这个任务，执行相应的动作。

#### [][8]配置示例

按照上面的方法配置完之后，执行**npm install**会安装相应的依赖模块，然后可以输入_grunt_或者_grunt default_或者_grunt uglify_，三者的效果是一样的。

### [][9]Grunt常用插件

* grunt-contrib-uglify：压缩js代码
* grunt-contrib-concat：合并js文件
* grunt-contrib-qunit：单元测试
* grunt-contrib-jshint：js代码检查
* grunt-contrib-watch：监控文件修改并重新执行注册的任务

#### [][10]grunt-contrib-concat

如果你的package.json中没有添加这个依赖，可以直接使用如下命令安装，该命令通过–save-dev会更新package的配置。

修改GruntFile.js：

#### [][11]grunt-contrib-qunit

和上面的一样，安装插件并更新配置：

修改gruntfile.js文件，如下：

创建一个test目录，并编写用于测试的qunit.html文件

可以执行**grunt qunit**命令来完成测试。

#### [][12]grunt-contrib-jshint

同样，首先安装插件，并更新配置

修改Gruntfile.js文件

通过执行**grunt jshint**来执行代码检查。

#### grunt-contrib-watch  

grunt-contrib-watch，是监控指定文件被修改，重新启动已注册的任务。这个有点类似于supervisor的功能。  
首先还是安装插件并更新依赖配置：

修改Gruntfile.js文件

可以通过**grunt watch**执行watch任务。  
最终这个default任务实际上已经将所有的业务配置在一起了。通过执行**grunt**或者**grunt default**命令即可依次执行这几个任务。

### [][13]Gulp介绍

Gulp 和 Grunt 类似。但相比于 Grunt 的频繁的 IO 操作，Gulp 的流操作，能更快地完成构建。

* 使用方便，通过代码优于配置的策略，Gulp可以让简单的任务简单，复杂的任务更可管理。
* 构建快速，通过流式操作，减少频繁的 IO 操作，更快地构建项目。
* 插件高质，Gulp 有严格的插件指导策略，确保插件能简单高质的工作。
* 易于学习，少量的API，掌握Gulp可以毫不费力。构建就像流管道一样，轻松加愉快。

#### [][14]Gulp安装与使用

执行如下命令安装，并更新依赖包配置：

Gulp中同样存在许多插件（可以在<a href="https://gratimax.net/search-gulp-plugins/" target="_blank" rel="external">这里</a>查找），完成不同的任务。 gulp-jshint插件，类似于grunt-contrib-jshint，用于js代码检查，下面以这个为例子。  
先安装gulp-jshint插件:

参考<a href="https://github.com/gulpjs/gulp" target="_blank" rel="external">gulp项目页</a>的示例，在项目根目录创建gulpfile.js。

然后执行**gulp hint**做js检查。  
下面给出官网的一个例子：

### [][15]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#工具介绍 "工具介绍"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/css1.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#Grunt配置及安装 "Grunt配置及安装"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#准备工作 "准备工作"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#安装Grunt之前，先要配置Grunt。 "安装Grunt之前，先要配置Grunt。"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/package-code.png
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/gruntfile-code.png
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#配置示例 "配置示例"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#Grunt常用插件 "Grunt常用插件"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#grunt-contrib-concat "grunt-contrib-concat"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#grunt-contrib-qunit "grunt-contrib-qunit"
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#grunt-contrib-jshint "grunt-contrib-jshint"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#Gulp介绍 "Gulp介绍"
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#Gulp安装与使用 "Gulp安装与使用"
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/18/2014_grunt_gulp/#谢谢！ "谢谢！"
