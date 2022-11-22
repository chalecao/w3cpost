---
title: ios低版本中JavaScript的兼容性问题

---
## forEach遇到NodeList

注意在ios9中，如果使用document.querySelectorAll，那么返回的是一个NodeList，这个是不可以用foreach语句的，会报错，导致后面脚本阻断。ios10及其以上可以的

分析原因： 使用babel并不会对forEach进行转义，页面引入的babel-polyfill只是在Array的原型上补充了forEach方法，所以在用到像这种获取元素节点列表的时候存在兼容性问题。

## position:sticky

ios9系列版本下，查了caniuse.com 应该是支持-webkit-sticky的，但是显示有bug，位置错乱，特别是当你把position切换成fixed时候，会出现位置错乱。解决方法是默认用position：relative，然后切换成fixed 在ios9下是没有问题的。

## append

ios9.x版本append方法会报错，需要换成appendChild

&nbsp;
