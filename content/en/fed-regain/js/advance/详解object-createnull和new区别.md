---
title: 详解Object.create(null)和new区别




---
<p data-id="heading-0">
  在Vue和Vuex的源码中，作者都使用了<code>Object.create(null)</code>来初始化一个新对象。为什么不用更简洁的<code>{}</code>呢？
</p>

<h1 data-id="heading-0">
  Object.create()使用
</h1>

照搬一下MDN上的定义：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">Object.create(proto,[propertiesObject])
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

* proto:新创建对象的原型对象
* propertiesObject:可选。要添加到新对象的**可枚举**（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性。

举个例子(恶改了一下MDN的官方例子，看懂的点赞)：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">const car = {
  isSportsCar: &lt;span class="hljs-literal">false&lt;/span>,
  introduction: &lt;span class="hljs-function">&lt;span class="hljs-title">function&lt;/span>&lt;/span> () {
    console.log(`Hi girl, this is a &lt;span class="hljs-variable">${this.name}&lt;/span>.
    Do you like to have a drink with me ? &lt;span class="hljs-variable">${this.isSportsCar}&lt;/span>`);
  }
};

const porsche = Object.create(car,{
    //color成为porsche的数据属性
    //颜色不喜欢，可以改色或贴膜，所以可修改
    color:{
        writable:&lt;span class="hljs-literal">true&lt;/span>,
        configurable:&lt;span class="hljs-literal">true&lt;/span>,
        value:&lt;span class="hljs-string">'yellow'&lt;/span>
    },
    //&lt;span class="hljs-built_in">type&lt;/span>成为porsche的访问器属性
    &lt;span class="hljs-built_in">type&lt;/span>:{
        // writable、configurable等属性，不显式设置则默认为&lt;span class="hljs-literal">false&lt;/span>
        // 想把普通车改成敞篷，成本有点大了，所以就设成不可配置吧
        get:&lt;span class="hljs-function">&lt;span class="hljs-title">function&lt;/span>&lt;/span>(){&lt;span class="hljs-built_in">return&lt;/span> &lt;span class="hljs-string">'convertible'&lt;/span>},
        &lt;span class="hljs-built_in">set&lt;/span>:&lt;span class="hljs-keyword">function&lt;/span>(value){&lt;span class="hljs-string">"change this car to"&lt;/span>,value}
    }
});

porsche.name = &lt;span class="hljs-string">"Porsche 911"&lt;/span>; // &lt;span class="hljs-string">"name"&lt;/span>是&lt;span class="hljs-string">"porsche"&lt;/span>的属性, 而不是&lt;span class="hljs-string">"car"&lt;/span>的
porsche.isSportsCar = &lt;span class="hljs-literal">true&lt;/span>; // 继承的属性可以被覆写

porsche.introduction();
// expected output: &lt;span class="hljs-string">"Hi girl, this is a Porsche 911. Do you like to have a drink with me ? true"&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

`Object.create()`的定义其实很简单，弄清楚上面这个例子就可以了。

<h3 data-id="heading-1">
  Object.create()、{…}的区别
</h3>

先看看我们经常使用的`{}`创建的对象是什么样子的：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">var o = {a：1};
console.log(o)
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

在chrome控制台打印如下：<img loading="lazy" width="377" height="281" class="alignnone size-full wp-image-4539 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c765506eb.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c765506eb.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c765506eb.png?x-oss-process=image/format,webp 377w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c765506eb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_224/format,webp 300w" sizes="(max-width: 377px) 100vw, 377px" />

从上图可以看到，新创建的对象继承了`Object`自身的方法，如`hasOwnProperty`、`toString`等，在新对象上可以直接使用。

再看看使用`Object.create()`创建对象：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">var o = Object.create(null,{
    a:{
           writable:&lt;span class="hljs-literal">true&lt;/span>,
        configurable:&lt;span class="hljs-literal">true&lt;/span>,
        value:&lt;span class="hljs-string">'1'&lt;/span>
    }
})
console.log(o)
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

在chrome控制台打印如下：<img loading="lazy" width="213" height="57" class="alignnone size-full wp-image-4540 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7779e97a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7779e97a.png?x-oss-process=image/format,webp" alt="" />

可以看到，新创建的对象除了自身属性a之外，原型链上没有任何属性，也就是没有继承Object的任何东西，此时如果我们调用`o.toString()`会报`Uncaught TypeError`的错误。

大家可能会注意到，第一个参数使用了null。也就是说将null设置成了新创建对象的原型，自然就不会有原型链上的属性。我们再把上面的例子改一改：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">var o = Object.create({},{
    a:{
           writable:&lt;span class="hljs-literal">true&lt;/span>,
        configurable:&lt;span class="hljs-literal">true&lt;/span>,
        value:&lt;span class="hljs-string">'1'&lt;/span>
    }
})
console.log(o)
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

将`null`改为`{}`，结果是怎样的？在chrome控制台打印如下：<img loading="lazy" width="395" height="293" class="alignnone size-full wp-image-4541 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7884db9f.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7884db9f.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7884db9f.png?x-oss-process=image/format,webp 395w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7884db9f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_223/format,webp 300w" sizes="(max-width: 395px) 100vw, 395px" />

我们看到，这样创建的对象和使用`{}`创建对象已经很相近了，但是还是有一点区别：多了一层`proto`嵌套。

我们最后再来改一下：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">var o = Object.create(Object.prototype,{
    a:{
           writable:&lt;span class="hljs-literal">true&lt;/span>,
        configurable:&lt;span class="hljs-literal">true&lt;/span>,
        value:&lt;span class="hljs-string">'1'&lt;/span>
    }
})
console.log(o)
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

chrome控制台打印如下：<img loading="lazy" width="377" height="276" class="alignnone size-full wp-image-4542 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c79ea4239.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c79ea4239.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c79ea4239.png?x-oss-process=image/format,webp 377w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c79ea4239.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_220/format,webp 300w" sizes="(max-width: 377px) 100vw, 377px" />

这次就和使用`{}`创建的对象一模一样了。至此，我相信大家已经对两者的区别十分清楚了。

<h3 data-id="heading-2">
  Object.create(null)的使用场景
</h3>

再回到文章开头的问题，为什么很多源码作者会使用`Object.create(null)`来初始化一个新对象呢？这是作者的习惯，还是一个最佳实践？

其实都不是，这并不是作者不经思考随便用的，也不是javascript编程中的最佳实践，而是需要因地制宜，具体问题具体分析。

我们进一步比较一下`Object.create(null)`和`{}`创建控对象的区别：

在chrome打印如下：<img loading="lazy" width="375" height="423" class="alignnone size-full wp-image-4543 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7e34e9e7.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7e34e9e7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7e34e9e7.png?x-oss-process=image/format,webp 375w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12c7e34e9e7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_266,h_300/format,webp 266w" sizes="(max-width: 375px) 100vw, 375px" />

从上图可以看到，使用`create`创建的对象，没有任何属性，显示`No properties`，我们可以把它当作一个非常**纯净**的map来使用，我们可以自己定义`hasOwnProperty`、`toString`方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。举个例子：

<pre class="hljs bash"><code class="hljs bash copyable" lang="bash">//Demo1:
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
&lt;span class="hljs-keyword">if&lt;/span>(Object.prototype.hasOwnProperty.call(a,&lt;span class="hljs-string">'toString'&lt;/span>)){
    ...
}
//为什么不能直接用a.hasOwnProperty(&lt;span class="hljs-string">'toString'&lt;/span>)?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
&lt;span class="hljs-keyword">if&lt;/span>(a.toString){}

//Demo2:
var a=Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
&lt;span class="hljs-keyword">if&lt;/span>(a.toString){}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>

另一个使用`create(null)`的理由是，在我们使用`for..in`循环的时候会遍历对象原型链上的属性，使用`create(null)`就不必再对属性进行检查了，当然，我们也可以直接使用`Object.keys[]`。

<h3 data-id="heading-3">
  总结：
</h3>

  1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
  2. 想节省`hasOwnProperty`带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

用`Object.create(null)`吧！其他时候，请用`{}`。

# Object.create和new区别

创建对象的方式，我以我碰到的两种创建方式，Object.create 和new来说明

<pre class="EnlighterJSRAW" data-enlighter-language="null">var Base = function () {}
var o1 = new Base();
var o2 = Object.create(Base);</pre>

那这样到底有什么不一样呢？ 我们改一下看看结果

<pre class="EnlighterJSRAW" data-enlighter-language="null">var Base = function () {
    this.a = 2
}
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a);
console.log(o2.a);
var o3 = Object.create(new Base());
console.log(o3.a);</pre>

<p id="izlXOWg">
  结果是： 2 ， undefined， 2
</p>

<p id="BwkMIWH">
  <img loading="lazy" class="alignnone  wp-image-4545 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce75ac749.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce75ac749.png?x-oss-process=image/format,webp" alt="" width="396" height="512" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce75ac749.png?x-oss-process=image/format,webp 678w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce75ac749.png?x-oss-process=image/quality,q_50/resize,m_fill,w_232,h_300/format,webp 232w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce75ac749.png?x-oss-process=image/quality,q_50/resize,m_fill,w_464,h_600/format,webp 464w" sizes="(max-width: 396px) 100vw, 396px" />
</p>

* o1的原型指向的是Object，实例上有属性a。 相当于代码：

<pre class="EnlighterJSRAW" data-enlighter-language="null">class BB{constructor(){this.a=1}}
console.log(new BB())</pre>

o1和这种class 创建出来的对象没有区别的。

<p id="VlrqvKd">
  <img loading="lazy" class="alignnone  wp-image-4546 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce8f814e9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce8f814e9.png?x-oss-process=image/format,webp" alt="" width="352" height="272" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce8f814e9.png?x-oss-process=image/format,webp 542w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d12ce8f814e9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_231/format,webp 300w" sizes="(max-width: 352px) 100vw, 352px" />
</p>

&nbsp;

* o3的原型指向了Base这个对象，o1属性上没有a，会查找原型，查到原型上有a

&nbsp;

* o2指向的原型是Function，为什么呢？

一种理解是可以把function看成class，就如上面的例子用的BB。我们知道function和class可以看成原生类型Function的对象，因为可以用new Function()来创建函数

<pre class="EnlighterJSRAW" data-enlighter-language="null">var sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6));
// expected output: 8</pre>

每个JavaScript function其实是一个 `Function` 对象.

`(function(){}).constructor === Function`

结果是：true

&nbsp;
