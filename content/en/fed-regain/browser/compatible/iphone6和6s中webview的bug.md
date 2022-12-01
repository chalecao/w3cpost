---
title: iphone6和6s中webview的bug


---
  


### [][1]技术鸡汤

好久没有更新博客了，还是来说说最近做的事情吧。先从一个bug说起，由于在app中无论是ios还是android，展示和控制富文本都不是一件容易的事情，所以由于业务需求，[我们](https://www.w3cdoc.com)会采用嵌套webview的形式来完成相应的功能。webview适配的方案有很多，但是其中也隐藏了许多的bug。  
<a></a>  
![iphone6和6s中webview的bug][2]  
常用的适配方案（rem方案）：  
1.基于media query设置html和body的基准。（缺点比较繁琐，不好适配所有机型）  
2.基于JS动态设置html和body的基准，动态设置viewport，基于设备像素比设置高清方案。  
3.阿里的flexible方案 <a href="https://github.com/amfe/article/issues/17" target="_blank" rel="external">https://github.com/amfe/article/issues/17</a>

### [][3]动态设置viewport

关于viewport <a href="https://www.cnblogs.com/2050/p/3877280.html" target="_blank" rel="external">这里</a> 有介绍。动态设置viewport是一种投机的方法，这种方法是有缺陷的，  
比如iphone6 和 iphone6s中，动态设置viewport会导致webview的宽度还是设置之前的宽度，虽然试图更新了，但是webview的宽度比计算后的viewport的宽度要大一些。导致如果绑定了webview的左右滑动事件，webview水平方向由于保留了之前的宽度，会有滚动条，虽然并没有展示滚动条，但是会响应左右滚动的事件，导致页面左右滚动的事件先被webview捕获了，导致左右滑动不流畅，出现bug。所以，动态改变viewport是不妥的。

这里还是奉上flexible方案：<a href="https://github.com/amfe/article/issues/17" target="_blank" rel="external">https://github.com/amfe/article/issues/17</a>  
奉上两个有用的脚本：  
<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/res/px2rem.js" target="_blank" rel="external">px2rem.js</a>  
<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/res/_px2rem.scss" target="_blank" rel="external">_px2rem.scss</a>

### [][4]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2016/09/07/2016_ios_webview/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2016/09/07/2016_ios_webview/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/09/07/2016_ios_webview/#技术鸡汤 "技术鸡汤"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/read-15.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/09/07/2016_ios_webview/#动态设置viewport "动态设置viewport"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2016/09/07/2016_ios_webview/#谢谢！ "谢谢！"
