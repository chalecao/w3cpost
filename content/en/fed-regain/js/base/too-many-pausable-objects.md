---
title: Too many Pausable Objects


date: 2019-10-09T12:42:58+00:00
url: /javascriptnodejs/5027.html
views:
  - 2465
like:
  - 6


---
业务前端监控JS报错偶尔会看到这个错误

<pre class="EnlighterJSRAW" data-enlighter-language="null">Too many Pausable Objects</pre>

查了下没查到什么资料，仔细想了想， 应该是：Pausable Objects = Pause-able Objects

这种错误常见于页面创建了过多的定时器setTimeout，特别是大型项目，SPA项目，页面写的有问题会导致死循环，或者慢性死循环，这种时候就会有这种问题。