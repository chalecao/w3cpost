---
title: NodeJS 网络爬虫

---

### [][1]前言

以前做网络爬虫都是用java开发，基于http client模拟请求，获取数据，然后基于正则表达式来提取需要的数据。这两天突然看见可以用NodeJS来做网络爬虫，而且最大的好处是，获取到的内容可以使用jQuery等库来解析操作dom，这个无疑对于数据提取是比较方便的。这里做个demo项目，作为以后应用的种子项目。  
 
![NodeJS 网络爬虫][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_2/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_2/</a>

### [][3]准备相关类库

大致规划如下：

  1. web项目，基于express3, ejs模板
  2. 通过request抓取网页
  3. 通过jQuery, jsdom, htmlparser提取网页内容  
    首先按照 <a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_1/" target="_blank" rel="external">NodeJS Express运行实例</a>上的方法创建一个Express工程。然后安装相应的依赖包。

#### [][4]安装jsdom

执行如下命令安装，同时更新package.json

这个安装的时候可能会报如下错误：

这是由于缺少安装依赖环境。这里不只是jsdom，很多其他的插件包，很多也是需要这个依赖环境的。这个依赖环境其实就是一个编译环境，因为有些插件包是一源码形式发布的，安装时候需要对代码进行编译。所以这里需要安装：

  1. python 2.7版本，这个版本最好不要太高。
  2. Visual C++ 2010 Express，这个主要安装c++编译器
  3. 安装node-gyp编译插件，_npm install -g node-gyp_  
    然后就可以安装jsdom了。

#### [][5]安装jQuery，xmlhttprequest，request，htmlparser

依次安装并更新package.json：

### [][6]爬虫实例

假设[我们](https://www.w3cdoc.com)现在要去官网爬取彩票的开奖数据，以百度乐彩(<a href="https://baidu.lecai.com/lottery/draw/?agentId=5571" target="_blank" rel="external">https://baidu.lecai.com/lottery/draw/?agentId=5571</a> )网站为例,[我们](https://www.w3cdoc.com)要抓取双色球的开奖数据。  
![NodeJS 网络爬虫][7]  
首先在项目目录下增加myUtil.js，代码如下：

然后修改 routes/index.js文件，代码如下：

这里[我们](https://www.w3cdoc.com)已经把获取到的网页内容的content输出到了本地，启动应用，打开[浏览器](https://www.w3cdoc.com)：<a href="https://127.0.0.1:3000" target="_blank" rel="external">https://127.0.0.1:3000</a> 可以看见本地显示的和原网页的一模一样。然后[我们](https://www.w3cdoc.com)就可以提取需要的内容。  
首先通过使用[浏览器](https://www.w3cdoc.com)调试开发工具（按F12），来查找[我们](https://www.w3cdoc.com)需要的数据所在的位置。如下：  
![NodeJS 网络爬虫][8]  
然后[我们](https://www.w3cdoc.com)通过使用css选择器来选中这块内容，通过jquery来处理。修改routes/index.js

需要注意的是这里面，如果用css选择器，选中双色球的数据列表的选择器为_.ballbg:first-child_，但是使用jQuery的语法_$(‘.ballbg:first-child’)_选取不到第一个列表数据，因为这里面有个区别，jQuery里面有自己的选择器，选取第一个元素是_:first_，于是正确的jQuey选择器语句是_$(‘.ballbg:first’)_，执行结果：

然后就是提取其中的数据。

### [][9]谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#前言 "前言"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/nodejscrawl1.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#准备相关类库 "准备相关类库"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#安装jsdom "安装jsdom"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#安装jQuery，xmlhttprequest，request，htmlparser "安装jQuery，xmlhttprequest，request，htmlparser"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#爬虫实例 "爬虫实例"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/nodejscrawl1-1.jpg
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/nodejscrawl2.jpg
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/20/2014_nodejs_2/#谢谢！ "谢谢！"
