---
title: 手机网页调试工具weinre

---

### [][1]调试手机网页

调试手机网页一直很头疼，以前的做法全靠自己分析，用不同的[浏览器](https://www.w3cdoc.com)打开做的网页，根据现象分析结果。貌似好不方便，要是能像[浏览器](https://www.w3cdoc.com)开发者工具那样查看就好了。那么weinre来了。其实这个项目已经早有了。<a href="https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html" target="_blank" rel="external">weiner主页</a>：<a href="https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html" target="_blank" rel="external">https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html</a>  
这里[我们](https://www.w3cdoc.com)还是介绍一下怎么使用吧。当然调试ionic app也可以用到，所以就放到ionic系列教程里了。  
教程索引：(持续更新)  
<a href="https://github.com/chalecao/ionic-book" target="_blank" rel="external">ionic中文教程</a>

教程逐步迁移到github，欢迎点星星哦！  
<a></a>  
![手机网页调试工具weinre][2]

转载请注明出处：[https://haomou.net/2015/08/20/2015\_ionic\_debug2/][3]

### [][4]配置调试服务器

1、安装node.js  
安装程序下载：<a href="https://nodejs.org/#download" target="_blank" rel="external">https://nodejs.org/#download</a>  
本文安装在“F:/nodejs/”目录。

2、测试安装是否成功  
打开CMD，切换到nodejs所在的安装目录。输入如下命令测试node.js和npm是否安装成功。默认windows最新安装包，会包含npm，如果npm没有安装，请手动安装。

3、使用npm安装weinre,在node.js安装目录输入以下命令

4、启动weinre服务器

在windows下，系统防火墙可能会弹出是否允许其访问网络的提示，点击充许即可。

5、[浏览器](https://www.w3cdoc.com)打开

如果访问正常，说明服务器已配置成功。

### [][5]直接使用phoneGap的调试服务器

如果觉得服务器配置麻烦，也可以使用phoneGap现成的调试服务器。  
phoneGap调试服务器地址：<a href="https://debug.phonegap.com/（相当于本机安装的https://localhost:8080）" target="_blank" rel="external">https://debug.phonegap.com/（相当于本机安装的https://localhost:8080）</a>

### [][6]weinre使用方法

  1. 需调试的页面加入JS脚本  

也可以使用收获夹快速添加调试脚本到需要调试的页面。  
将以下代码添加到书签，访问需要调试的页面时，访问一下书签，即可以通过JS将调试脚本添加到当前页面，但部份[浏览器](https://www.w3cdoc.com)不支持！

  1. 在PC端使用webkit[浏览器](https://www.w3cdoc.com)打开控制台  

tips：识别码仅仅是为了识别多个需调试的项目时使用，可供多用户操作。

在控制台，你就可以轻松的调试手机网页了！

### [][7]谢谢！

转载请注明出处：[https://haomou.net/2015/02/10/2015\_ionic\_debug/][8]

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/20/2015_ionic_debug2/#调试手机网页 "调试手机网页"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/weinre-demo.jpg
 [3]: https://haomou.net/2015/08/20/2015_ionic_debug2/
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/20/2015_ionic_debug2/#配置调试服务器 "配置调试服务器"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/20/2015_ionic_debug2/#直接使用phoneGap的调试服务器 "直接使用phoneGap的调试服务器"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/20/2015_ionic_debug2/#weinre使用方法 "weinre使用方法"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/20/2015_ionic_debug2/#谢谢！ "谢谢！"
 [8]: https://haomou.net/2015/02/10/2015_ionic_debug/
