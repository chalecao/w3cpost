---
title: vue与angular与react


date: 2017-08-28T06:12:28+00:00
excerpt: 前两天花时间研究了一下angualr模板实现与vue2.0与react等框架的模板实现原理，这里总结一下。
url: /javascriptnodejs/642.html
views:
  - 1679
  - 1679
ampforwp_custom_content_editor:
  - 
  - 
ampforwp_custom_content_editor_checkbox:
  - 
  - 
ampforwp-amp-on-off:
  - default
  - default
toc_depth:
  - 1
  - 1


---
前两天花时间研究了一下angualr模板实现与vue2.0与react等框架的模板实现原理，这里总结一下。

![vue与angular与react][1] 

### 模板是什么

其实说起来模板有很多种，最早使用的就是用innerHTML塞一段数据，然后中间的变动的值都采用特殊变量替代，比如下面:<figure> 

<table>
  <tr>
    <td>
        1
      
        2
    </td>
    
    <td>
        var aa = &#8220;测试呢__name__做的事情__time__&#8221;;
      
        var bb = aa.replace(//_/_name/_/_/g,&#8221;张三&#8221;).replace(//_/_time/_/_/g,&#8221;李四&#8221;)
    </td>
  </tr>
</table></figure> 

看起来比较粗糙，用起来也不是那么好用。这种如果需要在模板中绑定事件，每次都需要重新处理，需要在innerHTML之后，再处理事件问题。  
其实我还用过其他的模板引擎，比如jquery的tmpl，像FTL这种模板，还有像smarty这种php模板，还有JSP、ASP这种。不过JSP和ASP这种网页严格的说并不是模板了，而是直接将业务逻辑混合在页面中了。  
像上面这种采用innerHTML方法直接将字符串转成了DOM元素，其优点是操作简单，兼容性好。但是缺点也是显而易见，使用起来并不方面，特别是事件处理，数据更新等。

我用的比较多的框架其实是angualr，当时也的确是非常的火。13年的时候一直在研究前后端分离的实现方法，当时在给银行做项目，主要采用的技术栈是JSF + Hibernate + Spring + Jquery等，可以参考我写的一本厚厚的电子书: <a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2016/03/31/2016_java_learn/" target="_blank" rel="external noopener">我的JAVA不一般</a>， 这本书写的比较全面了，介绍了很多基础知识。可是后来随着学习的深入，我选择了做前端。

我当时做的前后端分离还是比较简单的，基于nginx或者apache或者iis配置一台http服务器，静态资源都放在上面，然后通过ajax请求后端接口，后端接口采用php或者java或者nodejs编写。其实我做过的还是很多的，比如写后台接口就比较轻量级，我比较想做精益化的开发，采用最小的代价，做更多的事情，后端就可以做的很薄，采用thinkphp写一下api，或者java的spingmvc框架，或者nodejs的koa框架，或者直接用node的http模块来写。

### 字符串模板

String-based 模板技术 (基于字符串的parse和compile过程)  
![vue与angular与react][2] 

抽象语法树（Abstract Syntax Tree）也称为AST语法树，指的是源代码语法所对应的树状结构。也就是说，对于一种具体编程语言下的源代码，通过构建语法树的形式将源代码中的语句映射到树中的每一个节点上。  
![vue与angular与react][3] 

关于字符串模板解析的原理其实和编程语言的编译原理类似，首先都是需要做词法分析，分析出那些是关键词，然后做对应的语法分析，根据定义好的不同语法产生式来匹配最佳的语法，最后就是语义分析，分析出最适合的语义结果，最后输出结果。可以参考我的另一篇：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2017/04/10/2017_js4c/" target="_blank" rel="external noopener">前端构建C语言解释执行环境调研</a>

实现一个简单的字符串循环模版：  
![vue与angular与react][4] 

上面的例子很好的说明了String-based 模板技术的原理。它产生html结构，直接通过innerHTML插入到DOM中。

优点：相对于字符串拼接，实现了模版和代码逻辑的分离，不用大量的字符串拼接  
缺点：render之后数据即与view完全分离，innerHTML的性能问题，安全问题等  
示例  
mustache及其衍生: 弱逻辑  
Dust.js: 强逻辑 (推荐)  
doT.js: 超级快

### 基于Dom的模板（基于Dom的link或compile过程）

![vue与angular与react][5]  
要理解这个，其实也不难。比如使用jQuery的同学经常在做一个数据提取的时候，会首先通过innerHTML把数据获取过来，然后在把这个字符串解析为DOM树，当然并不会直接挂到网页的DOM节点上，而是在内存中。比如：<figure> 

<table>
  <tr>
    <td>
        1
      
        2
      
        3
      
        4
    </td>
    
    <td>
        var aa = $(document.body).html();
      
        var bb = $(aa);
      
        bb.find(&#8220;#aa&#8221;).remove();
      
        var cc = bb.html();
    </td>
  </tr>
</table></figure> 

String-based 和 Dom-based的模板技术都或多或少的依赖与innerHTML, 它们的区别是一个是主要是为了Rendering 一个是为了 Parsing 提取信息。所以为什么不结合它们两者来完全移除对innerHTML的依赖呢？parse和compile的过程分别类似于String-based 模板技术 和 Dom-based模板技术。

### living DOM模板技术

![vue与angular与react][6]  
先调用Parser()模块对字符串进行解析输出AST，这个方法模板内部将包含对模板的词法分析、语法分析、构造输出AST。然后调用this.compile(AST)方法编译，这个方法里调用walkers进行递归遍历这个AST，最后输出并保存这个组件的Dom，当调用这个组件的compile(AST)方法编译，这个方法里调用walkers进行递归遍历这个AST，最后输出并保存这个组件的Dom，当调用这个组件的inject()方法就可以把这个Dom插入到页面中。

#### Parsing

首先我们使用一个内建DSL来解析模板字符串并输出AST。

1）词法分析器又称为扫描器，词法分析是指将文本代码流解析为一个个记号，分析得到的记号以供后续的词法分析使用。 这个模块在Regular顶级模块执行过程中调用Parse模块进行语法分析前会调用Lexer词法分析模块对字符串模板进行词法分析。词法分析的主要流程如下图所示：  
![vue与angular与react][7] 

词法分析主要分为两部分进行，分别是Tag类型元素字符串，还有一类是JST字符串。通过全局中全局中保存一个state状态，当前解析完成后，会判断一个字符串的开头是否以“<”字符开始，如果是则进入Tag词法解析流程，如果不是则进入JST模板词法解析流程。 最后通过词法分析，将得到一个很长的数组，这个数组中装着一个个上面的词法对象，这将为之后的语法分析做下铺垫。

2）在词法分析模块部分，将解析词法分析出的词块，然后根据Regular模板语法，拼接零散的词块为具体含义的语法对象，然后输出一棵抽象语法树AST，这是进行下一步编译this.$compile()的输入。 首先要定义出这个抽象语法树每个节点对象的类型以及它含有的属性。  
![vue与angular与react][8]  
一一输入词法分析出来的词法块，根据这个词法块的type类型的不同来执行不同的逻辑，他们的本质都是根据当前type类型去判断，取出之后的词法块的一定个数，然后通过创建出特定的语法节点对象。

最终就成功得到了一棵由7种语法节点对象组成的抽象语法树AST。这将为之后的编译做下铺垫。

例如，在regularjs中，下面这段简单的模板字符串  
![vue与angular与react][9]  
会被解析为以下这段数据结构  
![vue与angular与react][10] 

#### Compiler

结合特定的数据模型(在regularjs中，是一个裸数据)， 模板引擎层级游历AST并递归生成Dom节点(不会涉及到innerHTML). 与此同时，指令、事件和插值等binder也同时完成了绑定，使得最终产生的Dom是与Model相维系的，即是活动的.

通过上一节已经得到了一棵AST，这课抽象语法树的节点是7中节点的一种，这个时候只要通过先序遍历[17]这个AST，然后根据语法块的type类型执行不通过的构造函数创建出Dom对象即可。

以上面的模板代码的一个插值为例:

<pre class="pure-highlightjs"><code class="">"{{isLogin? 'Login': 'Wellcome'}}"
</code>&lt;/code></pre>

一旦regularjs的引擎遇到这段模板与代表的语法元素节点，会进入如下函数处理  
![vue与angular与react][11] 

正如我们所见， 归功于$watch函数，一旦表达式发生改变，文本节点也会随之改变，这一切其实与angularjs并无两样(事实上regularjs同样也是基于脏检查)

与Dom-based 模板技术利用Dom节点承载信息所不同的是，它的中间产物AST 承载了所有Compile过程中需要的信息(语句, 指令, 属性…等等). 这带来几个好处

轻量级, 在Dom中进行读写操作是低效的.  
可重用的.  
可序列化 , 你可以在本地或服务器端预处理这个过程。  
安全, 因为安全不需要innerHTML帮我们生成初始Dom。

### object的几个方法

创建一个对象：Object.create(proto, [ propertiesObject ])  
参考： <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" target="_blank" rel="external noopener">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create</a>  
修改一个对象属性： Object.defineProperty(obj, prop, descriptor)  
参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank" rel="external noopener">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty</a>

实例：

<pre class="pure-highlightjs"><code class="">o = Object.create(Object.prototype, {
// foo会成为所创建对象的数据属性
foo: { writable:true, configurable:true, value: "hello" },
// bar会成为所创建对象的访问器属性
bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { console.log("Setting `o.bar` to", value) }
}})
 
// 显式
Object.defineProperty(obj, "key", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: "static"
});
</code>&lt;/code></pre>

你可以在创建对象的时候设置属性的get或set方法，也可以直接修改对象的属性。上面这两个方法是ES5新增的方法，主要是IE8的兼容性可以查看上面的参考MDN链接。

有了这两个方法，我们可以做什么？

  1. 简化数据操作

参考：<a href="https://imweb.io/topic/56d40adc0848801a4ba198ce" target="_blank" rel="external noopener">不会Object.defineProperty你就out了</a>

  1. 实现数据绑定处理

<pre class="pure-highlightjs"><code class="">&lt;div id='box' ao-controller="box"&gt;
&lt;div id='aa-attr' style="background: #a9ea00;width:100px;height:100px;" ao-css-width="w" ao-click='click' &gt;&lt;/div&gt;
&lt;p id='aa-text'&gt;{{ w }}&lt;/p&gt;
&lt;/div&gt;
 
 
&lt;script&gt;
 
var vm = {}
 
var bindings = {
w: function(value) {
    if (value) {
       document.getElementById('aa-attr').style.width = value + 'px';
    } else {
        return document.getElementById('aa-attr').style.width;
    }
}
}
 
var access = function(newValue){
    if (newValue) { //set
        bindings['w'](newValue);
    } else { //get
        return bindings['w']();
    }
}
 
Object.defineProperty(vm, 'w', {
    get : access,
    set : access,
    enumerable : true,
    configurable : true
})
 
vm.w = 300 //设置element.style.width == 300
 
alert(vm.w)
 
&lt;/script&gt;
</code>&lt;/code></pre>

&nbsp;

上面的例子是一个简单实现视图和数据绑定的例子。通过这个思路我们可以实现mvvm框架中的vm层。  
详细可以参考：  
<a href="https://www.cnblogs.com/aaronjs/p/3614049.html" target="_blank" rel="external noopener">前端MVVM框架设计及实现（一）</a>  
<a href="https://www.cnblogs.com/aaronjs/p/3617240.html" target="_blank" rel="external noopener">前端MVVM框架设计及实现（二）</a>

### mvvm的差别

实现MVVM其实并不是什么难事。

### 谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2017/04/19/2017_vue_react/" target="_blank" rel="external noopener">//fed123.oss-ap-southeast-2.aliyuncs.com/2017/04/19/2017_vue_react/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/read-1.jpg
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/20170829_59a5917c79d36.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213143413-1834134547.jpg
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213144804-1192555462.png
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/Dom-based-Template.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213148616-588350606.png
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213149632-1882524987.png
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213149632-1882524987-1.png
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213200397-581360002.jpg
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213201413-773747054.jpg
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/707050-20160826213158351-2060271425.jpg