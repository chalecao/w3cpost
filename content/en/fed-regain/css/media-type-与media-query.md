---
title: media type 与media query
weight: 7
---

## link&import
**CSS link、@import共同点：**

都是为了加载CSS文件。

**CSS link、@import不同点：**

* Link属于XHTML标签，而@import完全是CSS提供的一种方式。link除了可以加载CSS外，还可以做很多其它的事情，比如**定义RSS，定义rel连接属性**等，@import就只能加载CSS了。
* @import要起作用，必须放在样式文件的最前面（包括注释的前面）。
* 并行加载、串行加载，加载性能的问题，参考下面的链接
* 兼容性的差别。由于@import是CSS2.1提出的所以老的[浏览器](https://www.w3cdoc.com)不支持，@import只有在IE5以上的才能识别，而link标签无此问题。
* 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。 ？没有验证过！

建议：不适用@import，使用link  
<a href="http://www.stevesouders.com/blog/2009/04/09/dont-use-import/" target="_blank" rel="noopener noreferrer">don’t use @import</a>  
<a href="http://developer.yahoo.com/performance/rules.html#csslink" target="_blank" rel="noopener noreferrer">Yahoo 网页性能最佳实践：使用link，不使用import</a>

## media type
**media type(媒体类型)**：

是css 2中的一个非常有用的属性，通过media type[我们](https://www.w3cdoc.com)可以对不同的设备指定特定的样式，从而实现更丰富的界面。  
例子：

```
<link href="style.css" media="screen print" ...  
  
@import url("style.css") screen;  
  
<style media="screen">  
@import url("style.css");  
</style>
```

**media query(媒体查询)**：

是对media type的一种增强，是CSS 3的重要内容之一。 

例子：

```
<link media="only screen and (max-device-width: 480px)" href="style.css">
```
