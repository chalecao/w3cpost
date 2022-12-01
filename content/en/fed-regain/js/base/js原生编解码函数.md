---
title: JS原生编解码函数


---
  


### [][1]编解码的需求

当你在百度输入一个关键字搜索的时候，你会发现搜索的url是被转义处理了。这里为什么要转义呢？一方面为了避免XSS，一方面可以做到通用处理，对特殊符号进行转义处理，避免引起未知的错误。JavaScript中有三个可以对字符串编码的函数，分别是： escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent 。  
<a></a>  
![JS原生编解码函数][2]

### [][3]escape()函数

定义和用法  
escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。  
语法  
escape(string)  
参数 描述  
string 必需。要被转义或编码的字符串。  
返回值  
已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列。  
说明  
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码：

其他所有的字符都会被转义序列替换。  
这个方法在EMCA Script 3中是弃用的方法。

### [][4]encodeURI()函数

定义和用法  
encodeURI() 函数可把字符串作为 URI 进行编码。

语法  
encodeURI(URIstring)

参数 描述  
URIstring 必需。一个字符串，含有 URI 或其他要编码的文本。

返回值  
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明  
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码：

该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：

### [][5]encodeURIComponent() 函数

定义和用法  
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

语法  
encodeURIComponent(URIstring)

参数 描述  
URIstring 必需。一个字符串，含有 URI 组件或其他要编码的文本。

返回值  
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明  
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码：

其他字符（比如 ：

这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

提示和注释  
提示：请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。

### [][6]总结

通过对三个函数的分析，[我们](https://www.w3cdoc.com)可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参 数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。

### [][7]示例

  1. escape()

  2. encodeURI()

对整个URL进行编码，而URL的特定标识符不会被转码。  
3.encodeURIComponent()

对URL中的参数进行编码，因为参数也是一个URL，如果不编码会影响整个URL的跳转。

### [][8]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#编解码的需求 "编解码的需求"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/xss.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#escape-函数 "escape()函数"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#encodeURI-函数 "encodeURI()函数"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#encodeURIComponent-函数 "encodeURIComponent() 函数"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#总结 "总结"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#示例 "示例"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/11/01/2015_encode/#谢谢！ "谢谢！"
