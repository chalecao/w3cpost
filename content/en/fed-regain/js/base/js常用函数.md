---
title: JS常用函数


date: 2017-08-29T14:00:23+00:00
excerpt: |
  这里主要介绍一些常用的javascript函数，这里并不会介绍jQuery，因为在手机WEB项目中可能不会使用jQuery，主要尽量使用javascript控制，减少开销，提供响应速度。渐渐的发现，写博客真的是需要耐心的，我会坚持的。此帖会一直更新所用到的js函数。
  
  
  转载请注明出处：https://www.haomou.net/2014/08/05/2014_js/
url: /javascriptnodejs/624.html
views:
  - 1995
  - 1995


---
  


### [][1]前言

这里主要介绍一些常用的javascript函数，这里并不会介绍jQuery，因为在手机WEB项目中可能不会使用jQuery，主要尽量使用javascript控制，减少开销，提供响应速度。渐渐的发现，写博客真的是需要耐心的，我会坚持的。此帖会一直更新所用到的js函数。  
<a></a>  
![JS常用函数][2]  
转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/</a>

### [][3]querySelector

querySelector和querySelectorAll是W3C提供的新的查询接口（<a href="https://www.w3.org/TR/selectors-api/#nodeselector" target="_blank" rel="external">https://www.w3.org/TR/selectors-api/#nodeselector</a> ），接口定义：





从接口定义可以看到Document、DocumentFragment、Element都实现了NodeSelector接口。即这三种类型的元素都拥有者两个方法。querySelector和querySelectorAll的参数须是符合 css selector 的字符串。不同的是querySelector返回的是一个对象，querySelectorAll返回的一个集合(NodeList)。目前 IE8/9及Firefox/Chrome/Safari/Opera 的最新版已经支持它们。  
如想获取页面class属性为”red”的元素，除了使用document.getElementsByClassName(‘red’)还可以使用document.querySelector(‘.red’)和document.querySelectorAll(‘.red’)。可以使用css选择器来查询元素，比如：document.querySelector(‘#red’)查询id=red，document.querySelector(‘a[href=aaa]’)，查询href属性为aaa

### [][4]addEventListener

大家都知道事件的用法就是当某个事件(状况)被触发了之后就会去执行某个Function, 尤其是Javascript, 在当红AJAX的催化下, 了解Javascript的Event用法更加重要, 在这里就大概介绍一下Javascript的Event用法.  
Mozilla中：  
addEventListener的使用方式： target.addEventListener(type, listener, capture/bubble); 

  1. target： 文档节点、document、window 或 XMLHttpRequest。 
  2. type： 字符串，事件名称，不含“on”，比如“click”、“mouseover”、“keydown”等。 
  3. listener ：实现了 EventListener 接口或者是 JavaScript 中的函数。 
  4. capture/bubble ：是否使用捕捉，一般用 false 。capture与bubble分别是W3C制定得两种时间模式,简单来说capture就是从document的开始读到最后一行, 再执行事件, 而bubble则是先寻找指定的位置再执行事件.  
    capture/bubble的参数是布尔值, True表示用capture, False则是bubble.Windows Internet Explorer不需要指定capture/bubble的参数, 因为在windows IE环境下都是使用Bubble的模式.  
    
    
    

IE中：  
添加事件使用target.attachEvent(type, listener); 

  1. target： 文档节点、document、window 或 XMLHttpRequest。 
  2. type： 字符串，事件名称，含“on”，比如“onclick”、“onmouseover”、“onkeydown”等。 
  3. listener ：实现了 EventListener 接口或者是 JavaScript 中的函数。 例如：  
    
    
    

上述两种模式可以使用：  
```
typeof window.addEventListener != “undefined”





setTimeout(function(){  
//只会执行一次  
},3000)  
setInterval(function(){  
//每隔3000ms执行一次  
},3000)





window.to = setTimeout(function(){  
//只会执行一次  
},3000);  
window.to = clearTimeout(window.to);

window.it = setInterval(function(){  
//每隔3000ms执行一次  
},3000);  
window.it = clearInterval(window.it);  
```

### [][5]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/#前言 "前言"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/javascript.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/#querySelector "querySelector"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/#addEventListener "addEventListener"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/05/2014_js/#谢谢！ "谢谢！"