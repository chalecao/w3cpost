---
title: 使用注释和JSDOC让代码更规范




---
首先，JSDoc 并不会对源码产生任何的影响，所有的内容都是写在注释里边的。  
所以并不需要担心 JSDoc 会对你的程序造成什么负面影响。

可以先来看一个普通的 JavaScript 文件在编辑器中的展示效果：<img loading="lazy" width="656" height="244" class="alignnone size-full wp-image-4522 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ed723a45.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ed723a45.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ed723a45.png?x-oss-process=image/format,webp 656w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ed723a45.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_112/format,webp 300w" sizes="(max-width: 656px) 100vw, 656px" /><span class="img-wrap"></span>

很显而易见的，编辑器也不能够确定这个函数究竟是什么含义，因为任何类型的两个参数都可以进行相加。  
所以编辑器就会使用一个在 TypeScript 中经常出现用来标识任意类型的 `any` 关键字来描述函数的参数以及返回值。

而这种情况下我们可以很简单的使用 JSDoc 来手动描述这个函数的作用：<img loading="lazy" width="800" height="622" class="alignnone size-full wp-image-4523 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_233/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_597/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2ee8a8949.png?x-oss-process=image/quality,q_50/resize,m_fill,w_772,h_600/format,webp 772w" sizes="(max-width: 800px) 100vw, 800px" /><span class="img-wrap"><br /> </span>

> 实际上有些函数是需要手动指定`@return {TYPE}`来确定函数返回值类型的，但因为我们函数的作用就是通过两个参数相加并返回，所以编辑器推算出了函数返回值的类型。

对比上下两段代码，代码上并没有什么区别，也许有人会嗤之以鼻，认为代码已经足够清晰，并不需要额外的添加注释来说明。  
这种盲目自信一般会在接手了其他人更烂的代码后被打破，然后再反思自己究竟做错了什么，需要去维护这样的代码。

亦或者我们来放出一个稍微复杂一些的例子：<img loading="lazy" width="1722" height="1558" class="alignnone size-full wp-image-4524 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/format,webp 1722w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_271/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_695/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2efb55917.png?x-oss-process=image/quality,q_50/resize,m_fill,w_663,h_600/format,webp 663w" sizes="(max-width: 1722px) 100vw, 1722px" />

<span class="img-wrap"></span>

看似清晰、简洁的一个示例，完全看不出什么毛病 _除了两个异步`await`可以合并成一个_。  
确实，如果这段代码就这么一直躺在项目中，也不去改需求，那么这段代码可以说是很完美的存在了。  
如果这段代码一直是写下这段代码的作者在维护，那么这段代码在维护上也不会有什么风险。

不过如果哪天这段代码被交接了出去，换其他的小伙伴来维护。  
那么他可能会有这么几个疑问：

  1. `getUserInfo`的返回值是什么结构
  2. `createOrder`的返回值又是什么结构
  3. `notify`中传入的两个变量又都是用来做什么的

我们也只能够从`notify`函数中找到一些线索，查看到前两个函数所返回对象的部分属性， \_但是仍然不能知道这些属性的类型是什么\_。  
而想要维护这样的一段代码，就需要占用很多脑容量去记忆，这实际上是一个性价比非常低的事情，当这段代码再转给第三个人时，第三个人还需要再经历完整的流程，一个个函数、一行行代码去阅读，去记忆。  
如果你把这个当作是对程序的深入了解程度、对业务的娴熟掌握，那么我觉得我也帮不了你了。  
就像是现在超市结账时，没有柜员会以能够记忆N多商品价格而感到骄傲，扫码枪能做到的事情，为什么要占用你的大脑呢。

## 基础用法 {#articleHeader1}

如上文所说的，JSDoc 是写在注释中的一些特定格式内容。  
在 JavaScript 文件中大部分的标记都是块级形式的，也就是使用 `/** XXX */` 来进行定义，不过如果你愿意的话，也可以写到代码里边去。<img loading="lazy" width="798" height="486" class="alignnone size-full wp-image-4525 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f0971837.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f0971837.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f0971837.png?x-oss-process=image/format,webp 798w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f0971837.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_183/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f0971837.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_468/format,webp 768w" sizes="(max-width: 798px) 100vw, 798px" />

JSDoc 提供了很多种标记，用于各种场景。  
但并不是所有的都是常用的（而且使用了 vscode 以后，很多需要手动指定的标记，编辑器都能够代替你完成），常用的无外乎以下几个：

* @type 标识变量类型
* @param 标识函数参数类型及描述
* @return 标识函数返回值类型及描述

> 完整的列表可以在这里找到 <a href="http://usejsdoc.org/index.html#block-tags" target="_blank" rel="nofollow noopener noreferrer">Block tags</a>

基本上使用以上三种标记以后，已经能够解决绝大部分的问题。  
JSDoc 在写法上有着特定的要求，比如说行内也必须要是这样的结构 `/** XXX */`，如果是 `/* XXX */` 则会被忽略。  
而多行的写法是比较常用的，在 vscode 中可以直接在函数上方键入 `/**` 然后回车，编辑器会自动填充很多的内容，包括参数类型、参数描述以及函数描述的预留位置，使用`TAB`键即可快速切换。<img loading="lazy" width="818" height="412" class="alignnone size-full wp-image-4526 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/format,webp 818w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_151/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_387/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f162bf5c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_403/format,webp 800w" sizes="(max-width: 818px) 100vw, 818px" />

实际上`@type`的使用频率相较于其他两个是很低的，因为大多数情况下`@type`用于标识变量的类型。  
而变量的来源基本上只有两个 1. 基本类型赋值 2. 函数返回值  
首先是第一个基本类型的赋值，这个基本上 vscode 就帮你做了，而不需要自己手动的去指定。  
而另外一个函数的返回值，如果我们在函数上添加了`@return`后，那么调用该函数并获取返回值的变量类型也会被设置为`@return`对应的类型。

### type {#articleHeader2}

> 不过因为其他两个标记中都有类型相关的指定，所以就拿 @type 来说明一下

首先，在 JSDoc 中是支持所有的基本类型的，包括数字、字符串、布尔值之类的。

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">/**@type {number} */&lt;/span>
&lt;span class="hljs-comment">/** @type {string}*/&lt;/span>
&lt;span class="hljs-comment">/**@type {boolean} */&lt;/span>
&lt;span class="hljs-comment">/** @type {RegExp}*/&lt;/span>

&lt;span class="hljs-comment">// 或者是一个函数&lt;/span>
&lt;span class="hljs-comment">/** @type {function} */&lt;/span>

&lt;span class="hljs-comment">// 一个包含参数的函数&lt;/span>
&lt;span class="hljs-comment">/** @type {function(number, string)} */&lt;/span>

&lt;span class="hljs-comment">// Object结构的参数&lt;/span>
&lt;span class="hljs-comment">/** @type {function({ arg1: number, arg2: string })} */&lt;/span>

&lt;span class="hljs-comment">// 一个包涵参数和返回值的函数&lt;/span>
&lt;span class="hljs-comment">/** @type {function(number, string): boolean} */&lt;/span></code></pre>

> 在 vscode 中键入以上的注释，都可以很方便的得到动态提示。  
> 当然了，关于函数的，还是推荐使用 @param 和 @return 来实现，效果更好一些

#### 扩展复杂类型

上边的示例大多是基于基本类型的描述，但实际开发过程中不会说只有这么些基本类型供你使用的。  
必然会存在着大量的复杂结构类型的变量、参数或返回值。

关于函数参数，在 JSDoc 中两种方式可以描述复杂类型：<img loading="lazy" width="1744" height="462" class="alignnone size-full wp-image-4527 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/format,webp 1744w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_79/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_203/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f25b7f9e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_212/format,webp 800w" sizes="(max-width: 1744px) 100vw, 1744px" />  
不过这个只能应用在`@param`中，而且复用性并不高，如果有好几处同样结构的定义，那我们就需要把这样的注释拷贝多份，显然不是一个优雅的写法。  
又或者我们可以使用另外两个标记，`@typedef`和`@property`，格式都与上边提到的标记类似，可以应用在所有需要指定类型的地方：<img loading="lazy" width="1730" height="620" class="alignnone size-full wp-image-4528 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/format,webp 1730w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_108/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_275/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f3d1bc75.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_287/format,webp 800w" sizes="(max-width: 1730px) 100vw, 1730px" /><img loading="lazy" width="1322" height="554" class="alignnone size-full wp-image-4529 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/format,webp 1322w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_126/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_322/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/06/img_5d0c2f5c8d902.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_335/format,webp 800w" sizes="(max-width: 1322px) 100vw, 1322px" />

使用`@typedef`定义的类型可以很轻松的复用，在需要的地方直接指定我们定义好的类型即可。  
同理，这样的自定义类型可以直接应用在`@return`中。

### param {#articleHeader3}

这个算是比较重要的一个标记了，用来标记函数参数的相关信息。  
具体的格式是这样的（切换到 TypeScript 后一般会移除类型的定义，改用代码中的类型定义）：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">/**
 * @param {number} param 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> (&lt;span class="hljs-params">param&lt;/span>) &lt;/span>{ }

&lt;span class="hljs-comment">// 或者可以结合着 @type 来写（虽说很少会这么写）&lt;/span>

&lt;span class="hljs-comment">/**
 * @param param 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> (&lt;span class="hljs-params">&lt;span class="hljs-regexp">/** @type number */&lt;/span> param&lt;/span>) &lt;/span>{ }</code></pre>

#### 可选参数

如果我们想要表示一个参数为可选的参数，可以的在参数名上包一个`[]`即可。

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">/**
 * @param {number} [param] 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> (&lt;span class="hljs-params">param&lt;/span>) &lt;/span>{ }</code></pre>

同事在文档中还提到了关于默认值的写法，实际上如果你的可选参数在参数位已经有了默认值的处理，那么就不再需要额外的添加`[]`来表示了，vscode 会帮助你标记。

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 文档中提到的默认值写法&lt;/span>
&lt;span class="hljs-comment">/**
 * @param {number} [param=123] 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> (&lt;span class="hljs-params">param = &lt;span class="hljs-number">123&lt;/span>&lt;/span>) &lt;/span>{ }

&lt;span class="hljs-comment">// 而实际上使用 vscode 以后就可以简化为&lt;/span>
&lt;span class="hljs-comment">/**
 * @param param 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> (&lt;span class="hljs-params">param = &lt;span class="hljs-number">123&lt;/span>&lt;/span>) &lt;/span>{ }</code></pre>

两者效果是一样的，并且由于我们手动指定了一个基础类型的值，那么我们连类型的指定都可以省去了，简单的定义一下参数的描述即可。

### return {#articleHeader4}

该标记就是用来指定函数的返回值，用法与`@param`类型，并且基本上这两个都会同时出现，与`@param`的区别在于，因为`@return`只会有一个，所以不会像前者一样还需要指定参数名。

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">/**
 * @return {number} 描述
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> () &lt;/span>{ }</code></pre>

#### Promise 类型的返回值处理

现在这个年代，基本上`Promise`已经普及开来，所以很多函数的返回值可能并不是结果，而是一个`Promise`。  
所以在vscode中，基于`Promise`去使用`@return`，有两种写法可以使用：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">// 函数返回 Promise 实例的情况可以这么指定类型&lt;/span>
&lt;span class="hljs-comment">/**
 * @return {Promise&lt;number&gt;}
 */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> () &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">(&lt;span class="hljs-params">res&lt;/span>) =&gt;&lt;/span> {
    res(&lt;span class="hljs-number">1&lt;/span>)
  })
}

&lt;span class="hljs-comment">// 或者使用 async 函数定义的情况下可以省略 @return 的声明&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> () &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-number">1&lt;/span>
}

  &lt;span class="hljs-comment">// 如果返回值是一个其他定义了类型的函数 or 变量，那么效果一样&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">test&lt;/span> () &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> returnVal()
}

&lt;span class="hljs-comment">/** @return {string} */&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">returnVal&lt;/span> () &lt;/span>{}</code></pre>

## 小结 {#articleHeader5}

再回到我们最初的那个代码片段上，将其修改为添加了 JSDoc 版本的样子：

<pre class="javascript hljs"><code class="javascript">&lt;span class="hljs-comment">/**
 * @typedef   {Object} UserInfo
 * @property  {number} uid  用户UID
 * @property  {string} name 昵称
 *
 * @typedef   {Object} Order
 * @property  {number} orderId 订单ID
 * @property  {number} price   订单价格
 */&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">main&lt;/span> () &lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> uid = &lt;span class="hljs-number">1&lt;/span>

  &lt;span class="hljs-keyword">const&lt;/span> orders = &lt;span class="hljs-keyword">await&lt;/span> createOrder(uid)

  &lt;span class="hljs-keyword">const&lt;/span> userInfo = &lt;span class="hljs-keyword">await&lt;/span> getUserInfo(uid)

  &lt;span class="hljs-keyword">await&lt;/span> notify(userInfo, orders)
}

&lt;span class="hljs-comment">/**
 * 获取用户信息
 * @param   {number} uid 用户UID
 * @return  {Promise&lt;UserInfo&gt;}
 */&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getUserInfo&lt;/span> (&lt;span class="hljs-params">uid&lt;/span>) &lt;/span>{ }

&lt;span class="hljs-comment">/**
 * 创建订单
 * @param  {number} uid 用户UID
 * @return {Promise&lt;Order&gt;}
 */&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">createOrder&lt;/span> (&lt;span class="hljs-params">uid&lt;/span>) &lt;/span>{ }

&lt;span class="hljs-comment">/**
 * 发送通知
 * @param {UserInfo} userInfo
 * @param {Order}    orders
 */&lt;/span>
&lt;span class="hljs-keyword">async&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">notify&lt;/span> (&lt;span class="hljs-params">userInfo, orders&lt;/span>) &lt;/span>{ }</code></pre>

实际上并没有添加几行文本，在切换到 TypeScript 之前，使用 JSDoc 能够在一定程度上降低维护成本，尤其是使用 vscode 以后，要手动编写的注释实际上是没有多少的。  
但是带来的好处就是，维护者能够很清晰的看出函数的作用，变量的类型。代码即文档。  
并且在进行日常开发时，结合编辑器的自动补全、动态提示功能，想必一定是能够提高开发体验的。

上边介绍的只是 JSDoc 常用的几个标记，实际上还有更多的功能没有提到，具体的文档地址：<a href="http://usejsdoc.org/index.html" target="_blank" rel="nofollow noopener noreferrer">jsdoc</a>

### 参考资料 {#articleHeader6}

* <a href="http://usejsdoc.org/tags-returns.html" target="_blank" rel="nofollow noopener noreferrer">jsdoc | @return</a>
* <a href="http://usejsdoc.org/tags-param.html" target="_blank" rel="nofollow noopener noreferrer">jsdoc | @param</a>
* <a href="http://usejsdoc.org/tags-typedef.html" target="_blank" rel="nofollow noopener noreferrer">jsdoc | @typedef</a>
* <a href="http://usejsdoc.org/tags-property.html" target="_blank" rel="nofollow noopener noreferrer">jsdoc | @property</a>
