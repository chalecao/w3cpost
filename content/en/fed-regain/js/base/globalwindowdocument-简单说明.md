---
title: Global\window\document 简单说明

---
1、Global Object （全局对象, global对象）  
①JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。  
② 全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。全局对象不是任何对象的属性，所以它没有名称。  
③ 在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。但通常不必用这种方式引用全局对象，因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量，都将成为全局对象的属性。  
④ 全局对象只是一个对象，而不是类。既没有构造函数，也无法用new实例化一个新的全局对象。  
⑤ 实际上，ECMAScript 标准没有规定全局对象的类型，而在客户端 JavaScript 中，全局对象就是 Window 对象，表示允许 JavaScript 代码的 Web 浏览器窗口。浏览器把全局对象作为window对象的一部分实现了，因此，所有的全局属性和函数都是window对象的属性和方法。

通俗化理解：  
⑥ 《JavaScript高级程序设计》中谈到，global对象可以说是ECMAScript中最特别的一个对象了，因为不管你从什么角度上看，这个对象都是不存在的。从某种意义上讲，它是一个终极的“兜底儿对象”，换句话说呢，就是不属于任何其他对象的属性和方法，最终都是它的属性和方法。我理解为，这个global对象呢，就是整个JS的“老祖宗”，找不到归属的那些“子子孙孙”都可以到它这里来认祖归宗。所有在全局作用域中定义的属性和函数，都是global对象的属性和方法，比如isNaN()、parseInt()以及parseFloat()等，实际都是它的方法；还有就是常见的一些特殊值，如：NaN、undefined等都是它的属性，以及一些构造函数Object、Array等也都是它的方法。总之，记住一点：global对象就是“老祖宗”，所有找不到归属的就都是它的。

注意：“global”这个单词本身是不可以直接访问的，本身就是一个概念，就是中文“全局”的英文原义，&#8221;Global Object&#8221; 翻译就是“全局对象”或“global对象”。比如global.Math.abs(1) 就是错误的。对全局对象的属性访问往往省略前缀，如Math.abs(1)就行了。而window对象是浏览器的JavaScript中具体存在的一个全局对象，是可以直接访问的。

来个栗子：  
<script type=&#8221;text/javascript&#8221;>  
console.log(this);  
</script>  
打开chrome浏览器的控制台，看到输出什么了吗？

window对象！ 因为在全局作用域下，this指向全局对象。在浏览器中全局对象就是window对象。  
来个第2个栗子：  
<script type=&#8221;text/javascript&#8221;>  
console.log(window);  
</script>  
打开chrome浏览器的控制台：

输出window对象，里面是各种属性的，如speechSynthesis等等&#8230;.。说明 &#8220;window&#8221;这个单词在浏览器JS中代表的就是一个真实存在的全局的对象，可以直接访问window这对象的。

那么“global”这个单词呢？能直接访问吗？  
再来第3个栗子：  
<script type=&#8221;text/javascript&#8221;>  
console.log(global);  
</script>  
运行结果：

显示 &#8220;Uncaught ReferenceError:global is not defined&#8221;。即global未定义，说明&#8221;global&#8221;这个单词不是一个默认的全局对象，不能在JS中直接访问的。正如前面所说，“global”只是中文”全局“的英语原义，不是一个对象，而是一个概念。  
global的属性和方法：http://blog.csdn.net/qq_32758013/article/details/74781788

2、window对象  
在全局作用域中声明的变量、函数都是window对象的属性和方法。  
window对象是相对于web浏览器而言的，依赖于浏览器，在浏览器中全局对象指的就是window对象，可以说window对象是全局对象在浏览器中的具体表现。window它并不是ECMAScript规定的内置对象。内置对象的定义是：“由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了。” 而window对象就是宿主对象。而全局对象是在任何环境中都存在的。window对象具体也就是指浏览器打开的那个窗口。如果HTML文档包含框架（frame 或 iframe 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。

因此，在全局作用域中声明的所有变量和函数，就都成为了window对象的属性。来看下面的例子：  
<script type=&#8221;text/javascript&#8221;>  
var name = &#8220;chunlynn&#8221;;  
var color = &#8220;green&#8221;  
function sayName(){  
console.log(name);  
}  
function sayColor(){  
console.log(window.color);  
}  
sayName(); //output:chunlynn  
window.sayName(); //output:chunlynn  
sayColor(); //output:green  
window.sayColor(); //output:green  
</script>  
打开chrome浏览器的控制台：

这里定义了一个名为color 的全局变量和一个名为sayColor()的全局函数。在sayColor()内部，我们通过window.color 来访问color 变量，说明全局变量是window 对象的属性。然后又使用window.sayColor()来直接通过window 对象调用这个函数，说明全局作用域中声明的函数是window对象的方法。window对象一般是省略的。  
window对象的属性和方法（window的属性和方法比较多，这个链接可能说的不全仅供参考，具体的请在chrome后台中，输入window查看）：http://www.cnblogs.com/zengwei/archive/2007/11/02/946520.html

3、document对象  
document对象是window对象的一个属性，是显示于窗口内的一个文档。而window对象则是一个顶层对象，它不是另一个对象的属性。document可以理解为文档，就是你的网页，而window是你的窗口，就是你的浏览器包含的。

区别:  
① window 指窗体。document指页面。document是window的一个属性。  
② 用户不能改变 document.location(因为这是当前显示文档的位置)。但是,可以改变window.location (用其它文档取代当前文档)window.location本身也是一个对象,而document.location不是对象  
③ W3C官方说明文档  
Window对象：http://www.w3school.com.cn/htmldom/dom\_obj\_window.asp  
Document对象：http://www.w3school.com.cn/htmldom/dom\_obj\_document.asp
