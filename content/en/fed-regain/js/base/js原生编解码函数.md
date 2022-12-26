---
title: JS原生编解码函数
weight: 35
---

### 编解码的需求

当你在百度输入一个关键字搜索的时候，你会发现搜索的url是被转义处理了。这里为什么要转义呢？一方面为了避免XSS，一方面可以做到通用处理，对特殊符号进行转义处理，避免引起未知的错误。JavaScript中有三个可以对字符串编码的函数，分别是： escape,encodeURI,encodeURIComponent，相应3个解码函数：unescape,decodeURI,decodeURIComponent 。  
 
### escape()函数

定义和用法  
escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。  
语法  
`escape(string)  `
|参数| 描述|
|-|-|  
|string| 必需。要被转义或编码的字符串。|

返回值  
已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列。  

说明  
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码：： * @ - _ + . / 其他所有的字符都会被转义序列替换。

字符的 16 进制格式值，当该值小于等于 0xFF 时，用一个 2 位转义序列：%xx 表示。大于的话则使用 4 位序列：%uxxxx 表示。

[详见mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape)

提示：可以使用 unescape() 对 escape() 编码的字符串进行解码。

注释：ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。

### encodeURI()函数

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
|类型|	包含|
|-|-|
|保留字符	|; , / ? : @ & = + $|
|非转义的字符	|字母 数字 - _ . ! ~ * ' ( )|
|数字符号	|#|

该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的, [详见mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

### encodeURIComponent() 函数

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

其他字符（比如 ： A-Z a-z 0-9 - _ . ! ~ * ' ( )

这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。[详见mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

提示和注释  
提示：请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。

### 总结

通过对三个函数的分析，[我们](https://www.w3cdoc.com)可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行转义编码，因此如果想对URL编码，最好不要使用此方法。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参 数）应当是最常用的，它可以讲参数中的中文、特殊字符进行转义，而不会影响整个URL。
```
var set1 = ";,/?:@&=+$";  // 保留字符
var set2 = "-_.!~*'()";   // 不转义字符
var set3 = "#";           // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (空格被编码为 %20)
```

### 示例
- 1. escape()
- 2. encodeURI(), 对整个URL进行编码，而URL的特定标识符不会被转码。  
- 3. encodeURIComponent(), 对URL中的参数进行编码，因为参数也是一个URL，如果不编码会影响整个URL的跳转。

