---
title: JS模板引擎之JST语法


---
  


### [][1]什么是模板引擎

首先来说说，为什么要用javascript模板。以PHP为例，PHP本身就可以穿插于HTML之间，所以也算是一种模板语言，缺点就是代码看起来会有点乱，尤其是融合了各种循环，判断，赋值等等操作（也不方便格式化），没有做到结构和数据分离。当然PHP也有很多的模板引擎，使用这些模板引擎的一个缺陷就是，效率不如原生的PHP高。没错，可以生成缓存文件，但对于更新相对频繁的站点就不行了。这个时候或许可以考虑javascript模板技术了。使用了javascript模板，就把解析压力交给了[浏览器](https://www.w3cdoc.com)，服务端只需要提供要用到的数据即可。  
<a></a>  
![JS模板引擎之JST语法][2]

这里要介绍的是JST(JAVASCRIPT TEMPLATE)，它有什么特点呢？

1.文件体积小压缩后只有6K  
2.兼容主流[浏览器](https://www.w3cdoc.com)包括IE6  
3.使用方便待会看下面的demo就知道了  
4.功能齐全，使用灵活如果用过php的模板，那么对JST的用法应该就会比较熟悉了

### [][3]使用方法

无论是数据还是模板，JST都是把这些放在textarea里的，当然你可以设置为隐藏，这样textarea就相当于一个容器了，为什么是textarea？因为textarea的innerHTML能够非常好地保持数据结构，而且不会被[浏览器](https://www.w3cdoc.com)解析。所以是理想的藏身之所。  
要使用JST，第一步当然是载入对应的js文件

然后创建数据，一些objet和array

接下来就是待解析的模板了，放在了一个id为cart_jst的textarea里

下面这个就是关键的解析语句了，还是很简单的

最后的内容就像这样

也可以不把模板放到textarea里，直接解析String也是可以的

提示：也可以把jst模板文件放到服务端，等要用时再去load，如$.getScript()

### [][4]模板语言

真是麻雀虽小，五脏俱全啊，看看下面的例子就知道了

跟Smarty一样，JST也可以通过在变量后面加|在模板里”包装”变量

#### [][5]if else判断语句

#### [][6]循环输出

实际使用中，好像有个问题，这里面取index的时候，好像只能用x_index否则出不来？？

#### [][7]自定义变量

#### [][8]在模板内执行javascript

以上演示代码直接从官方网站拿来的，为了照顾像我一样看见E文就头大的同学

注意  
如果在textarea的模板里又套了一个textarea会出错，可以通过自定义变量解决，或者避免这样的情况发生。

### [][9]高级用法

如果你想在模板里面执行一段代码，改变数据模型的值，控制下方逻辑的变化，怎么办？好办的！

发现奥妙了吗！ 由于使用赋值语句返回的是false，所以[我们](https://www.w3cdoc.com)将赋值语句 {bb = 1} 包含在不显示的div中，这样完美了。

### [][10]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#什么是模板引擎 "什么是模板引擎"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/template.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#使用方法 "使用方法"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#模板语言 "模板语言"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#if-else判断语句 "if else判断语句"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#循环输出 "循环输出"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#自定义变量 "自定义变量"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#在模板内执行javascript "在模板内执行javascript"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#高级用法 "高级用法"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/10/25/2015_jst/#谢谢！ "谢谢！"
