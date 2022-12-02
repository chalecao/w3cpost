---
title: WebStorge使用

---

### [][1]WebStorge简介

互联网的未来，是移动互联网；移动互联网网页的未来是WEB App。对于Web APP或者许多的富客户端网页来说，Web Storage是很重要的一部分。对于提升用户体验和网页页面优化有很重要的价值。使用者需要对网页或app的数据结构分层整合，区分出可以用于web storage和不能storage的数据，对于需要存储的数据，再格式化成key/value形式。  
<a></a>  
![WebStorge使用][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/</a>

### [][3]webstorage和cookie的区别

Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的。Cookie的大小是受限的（上限4kb），并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可以跨域调用。

除此之外，Web Storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要[前端](https://www.w3cdoc.com)开发者自己封装setCookie，getCookie。

但是Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，而Web Storage仅仅是为了在本地“存储”数据而生。

html5之前，更多的存储空间需要[浏览器](https://www.w3cdoc.com)本身或是插件的支持，例如只在 Internet Explorer 上使用的 userData，需要额外安装插件的 Google Gears 和 Flash。现在，HTML5 提供了一种标准的接口，使程序员可以简单地访问存储的数据。由于键值对存储在本地计算机上，在页面加载完毕后可以通过 JavaScript 来操作这些数据。

### [][4]两种storage

html5中的Web Storage包括了两种存储方式：sessionStorage和localStorage。

sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。

而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。  
下面是 DOM Storage 的接口定义：

length：返回当前存储在 Storage 对象中的键值对数量。  
key(index)：返回列表中第 n 个键的名字。Index 从 0 开始。  
getItem(key)：返回指定键对应的值。  
setItem(key, value)：存入一个键值对。  
removeItem(key) ：删除指定的键值对。  
clear()：删除 Storage 对象中的所有键值对。  
通常，使用最多的方法是 getItem 和 setItem。

### [][5]常用操作

localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等

localStorage和sessionStorage的方法  
setItem存储value  
用途：将value存储到key字段  
用法：.setItem( key, value)  
代码示例：

getItem获取value  
用途：获取指定key本地存储的值  
用法：.getItem(key)  
代码示例：

removeItem删除key  
用途：删除指定key本地存储的值  
用法：.removeItem(key)  
代码示例：

clear清除所有的key/value  
用途：清除所有的key/value  
用法：.clear()  
代码示例：

其他操作方法：点操作和[]  
web Storage不但可以用自身的setItem,getItem等方便存取，也可以像普通对象一样用点(.)操作符，及[]的方式进行数据存储，像如下的代码：

localStorage和sessionStorage的key和length属性实现遍历  
sessionStorage和localStorage提供的key()和length可以方便的实现存储的数据遍历，例如下面的代码：

storage事件  
storage还提供了storage事件，当键值改变或者clear的时候，就可以触发storage事件，如下面的代码就添加了一个storage事件改变的监听：

storage事件对象的具体属性如下表：

### [][6]空间大小

HTML5 的建议是每个网站提供给 Storage 的空间是 5MB，一般来说足够存字符串。如果存入的数据太大，有些[浏览器](https://www.w3cdoc.com)如 Chrome 会抛出 QUOTA\_EXCEEDED\_ERR 异常。所以虽然 DOM Storage 提供的空间比 cookie 要大很多，但在使用需要注意限制。

### [][7]安全性

一般不要在客户端存储敏感的信息，使用 localStorage、globalStorage 等在客户端存储的信息都非常容易暴露。应该在完成数据存储后使用 clear 或者 removeItem 方法清除保存在 Storage 对象中的数据。

### [][8]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#WebStorge简介 "WebStorge简介"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/storage.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#webstorage和cookie的区别 "webstorage和cookie的区别"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#两种storage "两种storage"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#常用操作 "常用操作"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#空间大小 "空间大小"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#安全性 "安全性"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/22/2014_Html5_storage/#谢谢！ "谢谢！"
