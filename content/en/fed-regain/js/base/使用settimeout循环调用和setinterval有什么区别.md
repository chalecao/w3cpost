---
title: 使用setTimeout循环调用和setInterval有什么区别
weight: 16
---
[有关setTimeout（）和setInterval（）的注意事项][1] 

与setTimeout() 和一起使用时，需要牢记一些注意事项setInterval(), 现在让[我们](https://www.w3cdoc.com)复习一下。

### 递归超时

还有另一种使用方式setTimeout()：您可以递归调用它以重复运行相同的代码，而不是使用setInterval()。
  
下面的示例使用递归setTimeout()方法每100毫秒运行一次传递的函数：
  
```
let i = 1;

setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);
```
将上面的示例与下面的示例进行比较-setInterval() 可以达到相同的效果：
  
```
let i = 1;

setInterval(function run() {
  console.log(i);
  i++
}, 100);
```
如何做递归setTimeout()和setInterval()不同？

上面代码的两个版本之间的区别是微妙的。
  
递归setTimeout()保证两次执行之间的相同延迟。（例如，100在上述情况下为ms。）代码将运行，然后等待100毫秒才能再次运行-因此，间隔将是相同的，而不管代码运行多长时间。

该示例使用的setInterval()功能有所不同。您选择的时间间隔包括执行您要在其中运行的代码所花费40的时间。比方说，代码要花费毫秒才能运行-最终，时间间隔仅为60毫秒。
    
setTimeout()递归使用时，每个迭代可以在运行下一个迭代之前计算出不同的延迟。换句话说，第二个参数的值可以指定不同的时间（以毫秒为单位），以等待再次运行代码。
    
当您的代码有可能花费比指定的时间间隔更长的时间运行时，最好使用递归setTimeout()-无论代码执行多长时间，这都将使两次执行之间的时间间隔保持恒定，并且您不会得到错误。

### 立即超时

将其用作值可以setTimeout()调度指定的回调函数尽快执行，但仅在运行主代码线程之后。
  
例如，下面的代码（<a href="https://mdn.github.io/learning-area/javascript/asynchronous/loops-and-intervals/zero-settimeout.html">现场直播</a>）输出一个包含的警报"Hello"，然后"World"在您单击第一个警报上的OK后立即包含一个警报。
  
```
setTimeout(function() {
  alert('World');
}, 0);

alert('Hello');
```

如果您希望设置一个代码块以便在所有主线程完成运行后立即运行，这将很有用-将其放在async事件循环中，这样它将随后直接运行。
  
参考：
- <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals>

 [1]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Things_to_keep_in_mind_about_setTimeout_and_setInterval "永久链接到事物，请牢记有关setTimeout（）和setInterval（）的信息"
 [2]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Recursive_timeouts "永久链接到递归超时"
 [3]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Immediate_timeouts "永久链接到即时超时"
