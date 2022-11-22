---
title: ES6常用语法回顾

---
ES6为一些已有的功能提供了非破坏性更新，这类更新中的大部分我们可以理解为语法糖，称之为语法糖，意味着，这类新语法能做的事情其实用ES5也可以做，只是会稍微复杂一些。本章我们将着重讨论这些语法糖，看完之后，可能你会对一些你很熟悉的ES6新语法有不一样的理解。

## 对象字面量 {#articleHeader0}

**对象字面量**是指以`{}`形式直接表示的对象，比如下面这样：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> book = {
  &lt;span class="hljs-attr">title&lt;/span>: &lt;span class="hljs-string">'Modular ES6'&lt;/span>,
  &lt;span class="hljs-attr">author&lt;/span>: &lt;span class="hljs-string">'Nicolas'&lt;/span>,
  &lt;span class="hljs-attr">publisher&lt;/span>: &lt;span class="hljs-string">'O´Reilly'&lt;/span>
}</code></pre>

ES6 为对象字面量的语法带来了一些改进：包括属性/方法的简洁表示，可计算的属性名等等，我们逐一来看：

### 属性的简洁表示法 {#articleHeader1}

你有没有遇到过这种场景，一个我们声明的对象中包含若干属性，其属性值由变量表示，且变量名和属性名一样的。比如下面这样，我们想把一个名为 `listeners` 的数组赋值给`events`对象中的`listeners`属性，用ES5我们会这样做：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> listeners = []
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">listen&lt;/span>() &lt;/span>{}
&lt;span class="hljs-keyword">var&lt;/span> events = {
  &lt;span class="hljs-attr">listeners&lt;/span>: listeners,
  &lt;span class="hljs-attr">listen&lt;/span>: listen
}</code></pre>

ES6则允许我们简写成下面这种形式：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> listeners = []
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">listen&lt;/span>() &lt;/span>{}
&lt;span class="hljs-keyword">var&lt;/span> events = { listeners, listen }</code></pre>

怎么样，是不是感觉简洁了许多，使用对象字面量的简洁写法让我们在不影响语义的情况下减少了重复代码。

这是ES6带来的好处之一，它提供了众多更简洁，语义更清晰的语法，让我们的代码的可读性，可维护性大大提升。

### 可计算的属性名 {#articleHeader2}

对象字面量的另一个重要更新是允许你使用可计算的属性名，在ES5中我们也可以给对象添加属性名为变量的属性，一般说来，我们要按下面方法这样做，首先声明一个名为`expertise`的变量，然后通过`person[expertise]`这种形式把变量添加为对象`person`的属性：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> expertise = &lt;span class="hljs-string">'journalism'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> person = {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Sharon'&lt;/span>,
  &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">27&lt;/span>
}
person[expertise] = {
  &lt;span class="hljs-attr">years&lt;/span>: &lt;span class="hljs-number">5&lt;/span>,
  &lt;span class="hljs-attr">interests&lt;/span>: [&lt;span class="hljs-string">'international'&lt;/span>, &lt;span class="hljs-string">'politics'&lt;/span>, &lt;span class="hljs-string">'internet'&lt;/span>]
}</code></pre>

ES6 中，对象字面量可以使用计算属性名了，把任何表达式放在中括号中，表达式的运算结果将会是对应的属性名，上面的代码，用ES6可以这样写：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> expertise = &lt;span class="hljs-string">'journalism'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> person = {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Sharon'&lt;/span>,
  &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">27&lt;/span>,
  [expertise]: {
    &lt;span class="hljs-attr">years&lt;/span>: &lt;span class="hljs-number">5&lt;/span>,
    &lt;span class="hljs-attr">interests&lt;/span>: [&lt;span class="hljs-string">'international'&lt;/span>, &lt;span class="hljs-string">'politics'&lt;/span>, &lt;span class="hljs-string">'internet'&lt;/span>]
  }
}</code></pre>

不过需要注意的是，**简写属性和计算的属性名不可同时使用**。这是因为，简写属性是一种在编译阶段的就会生效的语法糖，而计算的属性名则在运行时才生效。如果你把二者混用，代码会报错。而且二者混用往往还会降低代码的可读性，所以JavaScript在语言层面上限制二者不能混用也是个好事。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> expertise = &lt;span class="hljs-string">'journalism'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> journalism = {
  &lt;span class="hljs-attr">years&lt;/span>: &lt;span class="hljs-number">5&lt;/span>,
  &lt;span class="hljs-attr">interests&lt;/span>: [&lt;span class="hljs-string">'international'&lt;/span>, &lt;span class="hljs-string">'politics'&lt;/span>, &lt;span class="hljs-string">'internet'&lt;/span>]
}
&lt;span class="hljs-keyword">var&lt;/span> person = {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Sharon'&lt;/span>,
  &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">27&lt;/span>,
  [expertise] &lt;span class="hljs-comment">// 这里会报语法错误&lt;/span>
}</code></pre>

遇到以下情景时，可计算的属性名会让我们的代码更简洁：

  1. 某个新对象的属性引自另一个对象：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> grocery = {
  &lt;span class="hljs-attr">id&lt;/span>: &lt;span class="hljs-string">'bananas'&lt;/span>,
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Bananas'&lt;/span>,
  &lt;span class="hljs-attr">units&lt;/span>: &lt;span class="hljs-number">6&lt;/span>,
  &lt;span class="hljs-attr">price&lt;/span>: &lt;span class="hljs-number">10&lt;/span>,
  &lt;span class="hljs-attr">currency&lt;/span>: &lt;span class="hljs-string">'USD'&lt;/span>
}
&lt;span class="hljs-keyword">var&lt;/span> groceries = {
  [grocery.id]: grocery
}</code></pre>

  1. 需构建的对象的属性名来自函数参数。如果使用ES5来处理这种问题，我们需要先声明一个对象字面量，再动态的添加属性，再返回这个对象。下面的例子中，我们创建了一个响应Ajax请求的函数，这个函数的作用在于，请求失败时，返回的对象拥有一个名为`error`属性及对应的描述，请求成功时，该对象拥有一个名为`success`属性及对应的描述。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// ES5 写法&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getEnvelope&lt;/span>(&lt;span class="hljs-params">type, description&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> envelope = {
    &lt;span class="hljs-attr">data&lt;/span>: {}
  }
  envelope[type] = description
  &lt;span class="hljs-keyword">return&lt;/span> envelope
}</code></pre>

使用ES6提供的利用计算属性名，更简洁的实现如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// ES6 写法&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getEnvelope&lt;/span>(&lt;span class="hljs-params">type, description&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> {
    &lt;span class="hljs-attr">data&lt;/span>: {},
    [type]: description
  }
}</code></pre>

对象字面量的属性可以简写，方法其实也是可以的。

### 方法定义 {#articleHeader3}

我们先看看传统上如何定义对象方法，下述代码中，我们构建了一个事件发生器，其中的`on`方法用以注册事件，`emit`方法用以执行事件：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> emitter = {
  &lt;span class="hljs-attr">events&lt;/span>: {},
  &lt;span class="hljs-attr">on&lt;/span>: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">type, fn&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">this&lt;/span>.events[type] === &lt;span class="hljs-literal">undefined&lt;/span>) {
      &lt;span class="hljs-keyword">this&lt;/span>.events[type] = []
    }
    &lt;span class="hljs-keyword">this&lt;/span>.events[type].push(fn)
  },
  &lt;span class="hljs-attr">emit&lt;/span>: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">type, event&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">this&lt;/span>.events[type] === &lt;span class="hljs-literal">undefined&lt;/span>) {
      &lt;span class="hljs-keyword">return&lt;/span>
    }
    &lt;span class="hljs-keyword">this&lt;/span>.events[type].forEach(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">fn&lt;/span>) &lt;/span>{
      fn(event)
    })
  }
}</code></pre>

ES6 的对象字面量方法简写允许我们省略对象方法的`function`关键字及之后的冒号，改写后的代码如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> emitter = {
  &lt;span class="hljs-attr">events&lt;/span>: {},
  on(type, fn) {
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">this&lt;/span>.events[type] === &lt;span class="hljs-literal">undefined&lt;/span>) {
      &lt;span class="hljs-keyword">this&lt;/span>.events[type] = []
    }
    &lt;span class="hljs-keyword">this&lt;/span>.events[type].push(fn)
  },
  emit(type, event) {
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">this&lt;/span>.events[type] === &lt;span class="hljs-literal">undefined&lt;/span>) {
      &lt;span class="hljs-keyword">return&lt;/span>
    }
    &lt;span class="hljs-keyword">this&lt;/span>.events[type].forEach(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">fn&lt;/span>) &lt;/span>{
      fn(event)
    })
  }
}</code></pre>

ES6中的箭头函数可谓大名鼎鼎了，它有一些特别的优点(关于`this`)，可能你和我一样，使用箭头函数很久了，不过有些细节我之前却一直不了解，比如箭头函数的几种简写形式及使用注意事项。

## 箭头函数 {#articleHeader4}

JS中声明的普通函数，一般有函数名，一系列参数和函数体，如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">name&lt;/span>(&lt;span class="hljs-params">parameters&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// function body&lt;/span>
}</code></pre>

普通匿名函数则没有函数名，匿名函数通常会被赋值给一个变量/属性，有时候还会被直接调用：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> example = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">parameters&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// function body&lt;/span>
}</code></pre>

ES6 为我们提供了一种写匿名函数的新方法，即箭头函数。箭头函数不需要使用`function`关键字，其参数和函数体之间以`=>`相连接：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> example = &lt;span class="hljs-function">(&lt;span class="hljs-params">parameters&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-comment">// function body&lt;/span>
}</code></pre>

尽管箭头函数看起来类似于传统的匿名函数，他们却具有根本性的不同：

* 箭头函数不能被直接命名，不过允许它们赋值给一个变量；
* 箭头函数不能用做构造函数，你不能对箭头函数使用`new`关键字；
* 箭头函数也没有`prototype`属性；
* 箭头函数绑定了词法作用域，不会修改`this`的指向。

最后一点是箭头函数最大的特点，我们来仔细看看。

### 词法作用域 {#articleHeader5}

我们在箭头函数的函数体内使用的`this`,`arguments`,`super`等都指向包含箭头函数的上下文，箭头函数本身不产生新的上下文。下述代码中，我们创建了一个名为`timer`的对象，它的属性`seconds`用以计时，方法`start`用以开始计时，若我们在若干秒后调用`start`方法，将打印出当前的`seconds`值。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// ES5&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> timer = {
  &lt;span class="hljs-attr">seconds&lt;/span>: &lt;span class="hljs-number">0&lt;/span>,
  start() {
    setInterval(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
      &lt;span class="hljs-keyword">this&lt;/span>.seconds++
    }, &lt;span class="hljs-number">1000&lt;/span>)
  }
}

timer.start()
setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(timer.seconds)
}, &lt;span class="hljs-number">3500&lt;/span>)

&gt; &lt;span class="hljs-number">0&lt;/span>
</code></pre>

<pre class="hljs javascript"><code>&lt;span class="hljs-comment">// ES6&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> timer = {
  &lt;span class="hljs-attr">seconds&lt;/span>: &lt;span class="hljs-number">0&lt;/span>,
  start() {
    setInterval(&lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> {
      &lt;span class="hljs-keyword">this&lt;/span>.seconds++
    }, &lt;span class="hljs-number">1000&lt;/span>)
  }
}

timer.start()
setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(timer.seconds)
}, &lt;span class="hljs-number">3500&lt;/span>)
&lt;span class="hljs-comment">// &lt;- 3&lt;/span>
</code></pre>

第一段代码中`start`方法使用的是常规的匿名函数定义，在调用时`this`将指向了`window`，`console`出的结果为`undefined`，想要让代码正常工作，我们需要在`start`方法开头处插入`var self = this`，然后替换匿名函数函数体中的`this`为`self`，第二段代码中，我们使用了箭头函数，就不会发生这种情况了。

还需要说明的是，箭头函数的作用域也不能通过`.call`,`.apply`,`.bind`等语法来改变，这使得箭头函数的上下文将永久不变。

我们再来看另外一个箭头函数与普通匿名函数的不同之处，你猜猜，下面的代码最终打印出的结果会是什么：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">puzzle&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-built_in">arguments&lt;/span>)
  }
}
puzzle(&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>)(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>)</code></pre>

答案是`1,2,3`，原因是对常规匿名函数而言，`arguments`指向匿名函数本身。

作为对比，我们看看下面这个例子，再猜猜，打印结果会是什么？

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">puzzle&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span>=&gt;&lt;/span>{
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-built_in">arguments&lt;/span>)
  }
}
puzzle(&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>)(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>)</code></pre>

答案是`a,b,c`,**箭头函数的特殊性决定其本身没有`arguments`对象**，这里的`arguments`其实是其父函数`puzzle`的。

前面我们提到过，箭头函数还可以简写，接下来我们一起看看。

### 简写的箭头函数 {#articleHeader6}

完整的箭头函数是这样的：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> example = &lt;span class="hljs-function">(&lt;span class="hljs-params">parameters&lt;/span>) =&gt;&lt;/span> {
  &lt;span class="hljs-comment">// function body&lt;/span>
}</code></pre>

**简写1：**

当只有一个参数时，我们可以省略箭头函数参数两侧的括号：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> double = &lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">return&lt;/span> value * &lt;span class="hljs-number">2&lt;/span>
}</code></pre>

**简写2：**

对只有单行表达式且，该表达式的值为返回值的箭头函数来说，表征函数体的`{}`，可以省略，`return` 关键字可以省略，会静默返回该单一表达式的值。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> double = &lt;span class="hljs-function">(&lt;span class="hljs-params">value&lt;/span>) =&gt;&lt;/span> value * &lt;span class="hljs-number">2&lt;/span></code></pre>

**简写3：**  
上述两种形式可以合并使用，而得到更加简洁的形式

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> double = &lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> value * &lt;span class="hljs-number">2&lt;/span></code></pre>

现在，你肯定学会了箭头函数的基本使用方法，接下来我们再看几个使用示例。

### 简写箭头函数带来的一些问题 {#articleHeader7}

当你的简写箭头函数返回值为一个对象时，你需要用小括号括起你想返回的对象。否则，浏览器会把对象的`{}`解析为箭头函数函数体的开始和结束标记。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 正确的使用形式&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> objectFactory = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> ({ &lt;span class="hljs-attr">modular&lt;/span>: &lt;span class="hljs-string">'es6'&lt;/span> })</code></pre>

下面的代码会报错，箭头函数会把本想返回的对象的花括号解析为函数体，`number`被解析为`label`,`value`解释为没有做任何事情表达式，我们又没有显式使用`return`,返回值默认是`undefined`。

<pre class="javascript hljs"><code class="js">[&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> { &lt;span class="hljs-attr">number&lt;/span>: value })
&lt;span class="hljs-comment">// &lt;- [undefined, undefined, undefined]&lt;/span></code></pre>

当我们返回的对象字面量不止一个属性时，浏览器编译器不能正确解析第二个属性，这时会抛出语法错误。

<pre class="javascript hljs"><code class="js">[&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> { &lt;span class="hljs-attr">number&lt;/span>: value, &lt;span class="hljs-attr">verified&lt;/span>: &lt;span class="hljs-literal">true&lt;/span> })
&lt;span class="hljs-comment">// &lt;- SyntaxError&lt;/span></code></pre>

解决方案是把返回的对象字面量包裹在小括号中，以助于浏览器正确解析：

<pre class="javascript hljs"><code class="js">[&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>].map(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> ({ &lt;span class="hljs-attr">number&lt;/span>: value, &lt;span class="hljs-attr">verified&lt;/span>: &lt;span class="hljs-literal">true&lt;/span> }))
&lt;span class="hljs-comment">/*&lt;- [
  { number: 1, verified: true },
  { number: 2, verified: true },
  { number: 3, verified: true }]
*/&lt;/span></code></pre>

### 该何时使用箭头函数 {#articleHeader8}

其实我们并不应该盲目的在一切地方使用ES6,ES6也不是一定比ES5要好，是否使用主要看其能否改善代码的可读性和可维护性。

箭头函数也并非适用于所有的情况，比如说，对于一个行数很多的复杂函数，使用`=>`代替`function`关键字带来的简洁性并不明显。不过不得不说，对于简单函数，箭头函数确实能让我们的代码更简洁。

给函数以合理的命名，有助于增强程序的可读性。箭头函数并不能直接命名，但是却可以通过赋值给变量的形式实现间接命名，如下代码中，我们把箭头函数赋值给变量 `throwError`，当函数被调用时，会抛出错误，我们可以追溯到是箭头函数`throwError`报的错。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> throwError = &lt;span class="hljs-function">&lt;span class="hljs-params">message&lt;/span> =&gt;&lt;/span> {
  &lt;span class="hljs-keyword">throw&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Error&lt;/span>(message)
}
throwError(&lt;span class="hljs-string">'this is a warning'&lt;/span>)
&lt;- Uncaught &lt;span class="hljs-built_in">Error&lt;/span>: &lt;span class="hljs-keyword">this&lt;/span> is a warning
  at throwError</code></pre>

如果你想完全控制你的函数中的`this`，使用箭头函数是简洁高效的，采用函数式编程尤其如此。

<pre class="javascript hljs"><code class="js">[&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">4&lt;/span>]
  .map(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> value * &lt;span class="hljs-number">2&lt;/span>)
  .filter(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> value &gt; &lt;span class="hljs-number">2&lt;/span>)
  .forEach(&lt;span class="hljs-function">&lt;span class="hljs-params">value&lt;/span> =&gt;&lt;/span> &lt;span class="hljs-built_in">console&lt;/span>.log(value))
&lt;span class="hljs-comment">// &lt;- 4&lt;/span>
&lt;span class="hljs-comment">// &lt;- 6&lt;/span>
&lt;span class="hljs-comment">// &lt;- 8&lt;/span></code></pre>

## 解构赋值 {#articleHeader9}

ES6提供的最灵活和富于表现性的新特性莫过于解构了。一旦你熟悉了，它用起来也很简单，某种程度上解构可以看做是变量赋值的语法糖，可应用于对象，数组甚至函数的参数。

### 对象解构 {#articleHeader10}

为了更好的描述对象解构如何使用，我们先构建下面这样一个对象（漫威迷一定知道这个对象描述的是谁）：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 描述Bruce Wayne的对象&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> character = {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Bruce'&lt;/span>,
  &lt;span class="hljs-attr">pseudonym&lt;/span>: &lt;span class="hljs-string">'Batman'&lt;/span>,
  &lt;span class="hljs-attr">metadata&lt;/span>: {
    &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">34&lt;/span>,
    &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">'male'&lt;/span>
  },
  &lt;span class="hljs-attr">batarang&lt;/span>: [&lt;span class="hljs-string">'gas pellet'&lt;/span>, &lt;span class="hljs-string">'bat-mobile control'&lt;/span>, &lt;span class="hljs-string">'bat-cuffs'&lt;/span>]
}</code></pre>

假如现有有一个名为 `pseudonym` 的变量，我们想让其变量值指向`character.pseudonym`,使用ES5，你往往会按下面这样做：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> pseudonym = character.pseudonym</code></pre>

ES6致力于让我们的代码更简洁，通过ES6我们可以用下面的代码实现一样的功能：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { pseudonym } = character</code></pre>

如同你可以使用`var`加逗号在一行中同时声明多个变量，解构的花括号内使用逗号可以做一样的事情。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { pseudonym, name } = character</code></pre>

我们还可以混用解构和常规的自定义变量，这也是解构语法灵活性的表现之一。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { pseudonym } = character, two = &lt;span class="hljs-number">2&lt;/span></code></pre>

解构还允许我们使用别名，比如我们想把`character.pseudonym`赋值给变量 `alias`,可以按下面的语句这样做，只需要在`pseudonym`后面加上`:`即可：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">pseudonym&lt;/span>: alias } = character
&lt;span class="hljs-built_in">console&lt;/span>.log(alias)
&lt;span class="hljs-comment">// &lt;- 'Batman'&lt;/span></code></pre>

解构还有另外一个强大的功能，解构值还可以是对象：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">metadata&lt;/span>: { gender } } = character</code></pre>

当然，对于多层解构，我们同样可以赋予别名，这样我们可以通过非常简洁的方法修改子属性的名称：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">metadata&lt;/span>: { &lt;span class="hljs-attr">gender&lt;/span>: characterGender } } = character</code></pre>

在ES5 中，当你调用一个未曾声明的值时，你会得到`undefined`:

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-built_in">console&lt;/span>.log(character.boots)
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(character[&lt;span class="hljs-string">'boots'&lt;/span>])
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span></code></pre>

使用解构，情况也是类似的，如果你在左边声明了一个右边对象中不存在的属性，你也会得到`undefined`.

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { boots } = character
&lt;span class="hljs-built_in">console&lt;/span>.log(boots)
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span></code></pre>

对于多层解构，如下述代码中，`boots`并不存在于`character`中，这时程序会抛出异常，这就好比你你调用`undefined`或者`null`的属性时会出现异常。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">boots&lt;/span>: { size } } = character
&lt;span class="hljs-comment">// &lt;- Exception&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> { missing } = &lt;span class="hljs-literal">null&lt;/span>
&lt;span class="hljs-comment">// &lt;- Exception&lt;/span></code></pre>

解构其实就是一种语法糖，看以下代码，你肯定就能很快理解为什么会抛出异常了。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> nothing = &lt;span class="hljs-literal">null&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> missing = nothing.missing
&lt;span class="hljs-comment">// &lt;- Exception&lt;/span></code></pre>

解构也可以添加默认值，如果右侧不存在对应的值，默认值就会生效，添加的默认值可以是数值，字符串，函数，对象，也可以是某一个已经存在的变量：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { boots = { &lt;span class="hljs-attr">size&lt;/span>: &lt;span class="hljs-number">10&lt;/span> } } = character
&lt;span class="hljs-built_in">console&lt;/span>.log(boots)
&lt;span class="hljs-comment">// &lt;- { size: 10 }&lt;/span></code></pre>

对于多层的解构，同样可以使用默认值

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">metadata&lt;/span>: { enemy = &lt;span class="hljs-string">'Satan'&lt;/span> } } = character
&lt;span class="hljs-built_in">console&lt;/span>.log(enemy)
&lt;span class="hljs-comment">// &lt;- 'Satan'&lt;/span></code></pre>

默认值和别名也可以一起使用，不过需要注意的是别名要放在前面，默认值添加给别名：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { &lt;span class="hljs-attr">boots&lt;/span>: footwear = { &lt;span class="hljs-attr">size&lt;/span>: &lt;span class="hljs-number">10&lt;/span> } } = character</code></pre>

对象解构同样支持计算属性名，但是这时候你必须要添加别名，这是因为计算属性名允许任何类似的表达式，不添加别名，浏览器解析时会有问题，使用如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> { [&lt;span class="hljs-string">'boo'&lt;/span> + &lt;span class="hljs-string">'ts'&lt;/span>]: characterBoots } = character
&lt;span class="hljs-built_in">console&lt;/span>.log(characterBoots)
&lt;span class="hljs-comment">// &lt;- true&lt;/span></code></pre>

还是那句话，我们也不是任何情况下都应该使用解构，语句`characterBoots = character[type]`看起来比`{ [type]: characterBoots } = character`语义更清晰，但是当你需要提取对象中的子对象时，解构就很简洁方便了。

我们再看看在数组中该如何使用解构。

### 数组解构 {#articleHeader11}

数组解构的语法和对象解构是类似的。区别在于，数组解构我们使用中括号而非花括号，下面的代码中，通过结构，我们在数组`coordinates`中提出了变量 `x,y` 。 你不需要使用`x = coordinates[0]`这样的语法了，数组解构不使用索引值，但却让你的代码更加清晰。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> coordinates = [&lt;span class="hljs-number">12&lt;/span>, &lt;span class="hljs-number">-7&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> [x, y] = coordinates
&lt;span class="hljs-built_in">console&lt;/span>.log(x)
&lt;span class="hljs-comment">// &lt;- 12&lt;/span></code></pre>

数组解构也允许你跳过你不想用到的值，在对应地方留白即可：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> names = [&lt;span class="hljs-string">'James'&lt;/span>, &lt;span class="hljs-string">'L.'&lt;/span>, &lt;span class="hljs-string">'Howlett'&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> [ firstName, , lastName ] = names
&lt;span class="hljs-built_in">console&lt;/span>.log(lastName)
&lt;span class="hljs-comment">// &lt;- 'Howlett'&lt;/span></code></pre>

和对象解构一样，数组解构也允许你添加默认值：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> names = [&lt;span class="hljs-string">'James'&lt;/span>, &lt;span class="hljs-string">'L.'&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> [ firstName = &lt;span class="hljs-string">'John'&lt;/span>, , lastName = &lt;span class="hljs-string">'Doe'&lt;/span> ] = names
&lt;span class="hljs-built_in">console&lt;/span>.log(lastName)
&lt;span class="hljs-comment">// &lt;- 'Doe'&lt;/span></code></pre>

在ES5中，你需要借助第三个变量，才能完成两个变量值的交换，如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> left = &lt;span class="hljs-number">5&lt;/span>, right = &lt;span class="hljs-number">7&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> aux = left
left = right
right = aux</code></pre>

使用解构，一切就简单多了：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> left = &lt;span class="hljs-number">5&lt;/span>, right = &lt;span class="hljs-number">7&lt;/span>;
[left, right] = [right, left]</code></pre>

我们再看看函数解构。

### 函数默认参数 {#articleHeader12}

在ES6中，我们可以给函数的参数添加默认值了，下例中我们就给参数 `exponent` 分配了一个默认值：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">powerOf&lt;/span>(&lt;span class="hljs-params">base, exponent = &lt;span class="hljs-number">2&lt;/span>&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">Math&lt;/span>.pow(base, exponent)
}</code></pre>

箭头函数同样支持使用默认值，需要注意的是，就算只有一个参数，如果要给参数添加默认值，参数部分一定要用小括号括起来。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> double = &lt;span class="hljs-function">(&lt;span class="hljs-params">input = &lt;span class="hljs-number">0&lt;/span>&lt;/span>) =&gt;&lt;/span> input * &lt;span class="hljs-number">2&lt;/span></code></pre>

我们可以给任何位置的任何参数添加默认值。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sumOf&lt;/span>(&lt;span class="hljs-params">a = &lt;span class="hljs-number">1&lt;/span>, b = &lt;span class="hljs-number">2&lt;/span>, c = &lt;span class="hljs-number">3&lt;/span>&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> a + b + c
}
&lt;span class="hljs-built_in">console&lt;/span>.log(sumOf(&lt;span class="hljs-literal">undefined&lt;/span>, &lt;span class="hljs-literal">undefined&lt;/span>, &lt;span class="hljs-number">4&lt;/span>))
&lt;span class="hljs-comment">// &lt;- 1 + 2 + 4 = 7&lt;/span></code></pre>

在JS中，给一个函数提供一个包含若干属性的对象字面量做为参数的情况并不常见，不过你依旧可以按下面方法这样做：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> defaultOptions = { &lt;span class="hljs-attr">brand&lt;/span>: &lt;span class="hljs-string">'Volkswagen'&lt;/span>, &lt;span class="hljs-attr">make&lt;/span>: &lt;span class="hljs-number">1999&lt;/span> }
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">carFactory&lt;/span>(&lt;span class="hljs-params">options = defaultOptions&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(options.brand)
  &lt;span class="hljs-built_in">console&lt;/span>.log(options.make)
}
carFactory()
&lt;span class="hljs-comment">// &lt;- 'Volkswagen'&lt;/span>
&lt;span class="hljs-comment">// &lt;- 1999&lt;/span></code></pre>

不过这样做存在一定的问题，当你调用该函数时，如果传入的参数对象只包含一个属性，另一个属性的默认值会自动失效：

<pre class="javascript hljs"><code class="js">carFactory({ &lt;span class="hljs-attr">make&lt;/span>: &lt;span class="hljs-number">2000&lt;/span> })
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span>
&lt;span class="hljs-comment">// &lt;- 2000&lt;/span></code></pre>

函数参数解构就可以解决这个问题。

### 函数参数解构 {#articleHeader13}

通过函数参数解构，可以解决上面的问题，这里我们为每一个属性都提供了默认值，单独改变其中一个并不会影响其它的值：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">carFactory&lt;/span>(&lt;span class="hljs-params">{ brand = &lt;span class="hljs-string">'Volkswagen'&lt;/span>, make = &lt;span class="hljs-number">1999&lt;/span> }&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(brand)
  &lt;span class="hljs-built_in">console&lt;/span>.log(make)
}
carFactory({ &lt;span class="hljs-attr">make&lt;/span>: &lt;span class="hljs-number">2000&lt;/span> })
&lt;span class="hljs-comment">// &lt;- 'Volkswagen'&lt;/span>
&lt;span class="hljs-comment">// &lt;- 2000&lt;/span></code></pre>

不过这种情况下，函数调用时，如果参数为空即`carFactory()`函数将抛出异常。这种问题可以通过下面的方法来修复，下述代码中我们添加了一个空对象作为`options`的默认值，这样当函数被调用时，如果参数为空，会自动以`{}`作为参数。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">carFactory&lt;/span>(&lt;span class="hljs-params">{
  brand = &lt;span class="hljs-string">'Volkswagen'&lt;/span>,
  make = &lt;span class="hljs-number">1999&lt;/span>
} = {}&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(brand)
  &lt;span class="hljs-built_in">console&lt;/span>.log(make)
}
carFactory()
&lt;span class="hljs-comment">// &lt;- 'Volkswagen'&lt;/span>
&lt;span class="hljs-comment">// &lt;- 1999&lt;/span></code></pre>

除此之外，使用函数参数解构，还可以让你的函数自行匹配对应的参数，看接下来的例子，你就能明白这一点了，我们定义一个名为`car`的对象，这个对象拥有很多属性：owner，brand，make，model，preferences等等。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> car = {
  &lt;span class="hljs-attr">owner&lt;/span>: {
    &lt;span class="hljs-attr">id&lt;/span>: &lt;span class="hljs-string">'e2c3503a4181968c'&lt;/span>,
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Donald Draper'&lt;/span>
  },
  &lt;span class="hljs-attr">brand&lt;/span>: &lt;span class="hljs-string">'Peugeot'&lt;/span>,
  &lt;span class="hljs-attr">make&lt;/span>: &lt;span class="hljs-number">2015&lt;/span>,
  &lt;span class="hljs-attr">model&lt;/span>: &lt;span class="hljs-string">'208'&lt;/span>,
  &lt;span class="hljs-attr">preferences&lt;/span>: {
    &lt;span class="hljs-attr">airbags&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
    &lt;span class="hljs-attr">airconditioning&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>,
    &lt;span class="hljs-attr">color&lt;/span>: &lt;span class="hljs-string">'red'&lt;/span>
  }
}</code></pre>

解构能让我们的函数方便的只使用里面的部分数据，下面代码中的函数`getCarProductModel`说明了具体该如何使用：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> getCarProductModel = &lt;span class="hljs-function">(&lt;span class="hljs-params">{ brand, make, model }&lt;/span>) =&gt;&lt;/span> ({
  &lt;span class="hljs-attr">sku&lt;/span>: brand + &lt;span class="hljs-string">':'&lt;/span> + make + &lt;span class="hljs-string">':'&lt;/span> + model,
  brand,
  make,
  model
})
getCarProductModel(car)</code></pre>

### 解构使用示例 {#articleHeader14}

当一个函数的返回值为对象或者数组时，使用解构，我们可以非常简洁的获取返回对象中某个属性的值（返回数组中某一项的值）。比如说，函数`getCoordinates()`返回了一系列的值，但是我们只想用其中的`x,y`，我们可以这样写，解构帮助我们避免了很多中间变量的使用，也使得我们代码的可读性更高。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getCoordinates&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> { &lt;span class="hljs-attr">x&lt;/span>: &lt;span class="hljs-number">10&lt;/span>, &lt;span class="hljs-attr">y&lt;/span>: &lt;span class="hljs-number">22&lt;/span>, &lt;span class="hljs-attr">z&lt;/span>: &lt;span class="hljs-number">-1&lt;/span>, &lt;span class="hljs-attr">type&lt;/span>: &lt;span class="hljs-string">'3d'&lt;/span> }
}
&lt;span class="hljs-keyword">var&lt;/span> { x, y } = getCoordinates()</code></pre>

通过使用默认值，可以减少重复，比如你想写一个`random`函数，这个函数将返回一个位于`min`和`max`之间的值。我们可以分辨设置`min`默认值为1，`max`默认值为10，在需要的时候还可以单独改变其中的某一个值：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">random&lt;/span>(&lt;span class="hljs-params">{ min = &lt;span class="hljs-number">1&lt;/span>, max = &lt;span class="hljs-number">10&lt;/span> } = {}&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">Math&lt;/span>.floor(&lt;span class="hljs-built_in">Math&lt;/span>.random() * (max - min)) + min
}
&lt;span class="hljs-built_in">console&lt;/span>.log(random())
&lt;span class="hljs-comment">// &lt;- 7&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(random({ &lt;span class="hljs-attr">max&lt;/span>: &lt;span class="hljs-number">24&lt;/span> }))
&lt;span class="hljs-comment">// &lt;- 18&lt;/span></code></pre>

解构还可以配合正则表达式使用。看下面这个例子：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">splitDate&lt;/span>(&lt;span class="hljs-params">date&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> rdate = &lt;span class="hljs-regexp">/(\d+).(\d+).(\d+)/&lt;/span>
  &lt;span class="hljs-keyword">return&lt;/span> rdate.exec(date)
}
&lt;span class="hljs-keyword">var&lt;/span> [ , year, month, day] = splitDate(&lt;span class="hljs-string">'2015-11-06'&lt;/span>)</code></pre>

不过当`.exec`不比配时会返回`null`,因此我们需要修改上述代码如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> matches = splitDate(&lt;span class="hljs-string">'2015-11-06'&lt;/span>)
&lt;span class="hljs-keyword">if&lt;/span> (matches === &lt;span class="hljs-literal">null&lt;/span>) {
  &lt;span class="hljs-keyword">return&lt;/span>
}
&lt;span class="hljs-keyword">var&lt;/span> [, year, month, day] = matches</code></pre>

下面我们继续来讲讲`spread`和`rest`操作符。

## 剩余参数和拓展符 {#articleHeader15}

ES6之前，对于不确定数量参数的函数。你需要使用伪数组`arguments`，它拥有`length`属性，却又不具备很多一般数组有的特性。需要通过`Array#slice.call`转换`arguments`对象真数组后才能进行下一步的操作：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">join&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> list = &lt;span class="hljs-built_in">Array&lt;/span>.prototype.slice.call(&lt;span class="hljs-built_in">arguments&lt;/span>)
  &lt;span class="hljs-keyword">return&lt;/span> list.join(&lt;span class="hljs-string">', '&lt;/span>)
}
join(&lt;span class="hljs-string">'first'&lt;/span>, &lt;span class="hljs-string">'second'&lt;/span>, &lt;span class="hljs-string">'third'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- 'first, second, third'&lt;/span></code></pre>

对于这种情况，ES6提供了一种更好的解决方案：`rest`。

### 剩余参数`rest` {#articleHeader16}

使用`rest`, 你只需要在任意JavaScript函数的最后一个参数前添加三个点`...`即可。当`rest`参数是函数的唯一参数时，它就代表了传递给这个函数的所有参数。它起到和前面说的`.slice`一样的作用，把参数转换为了数组，不需要你再对`arguments`进行额外的转换了。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">join&lt;/span>(&lt;span class="hljs-params">...list&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> list.join(&lt;span class="hljs-string">', '&lt;/span>)
}
join(&lt;span class="hljs-string">'first'&lt;/span>, &lt;span class="hljs-string">'second'&lt;/span>, &lt;span class="hljs-string">'third'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- 'first, second, third'&lt;/span></code></pre>

`rest`参数之前的命名参数不会被包含在`rest`中，

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">join&lt;/span>(&lt;span class="hljs-params">separator, ...list&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> list.join(separator)
}
join(&lt;span class="hljs-string">'; '&lt;/span>, &lt;span class="hljs-string">'first'&lt;/span>, &lt;span class="hljs-string">'second'&lt;/span>, &lt;span class="hljs-string">'third'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- 'first; second; third'&lt;/span></code></pre>

在箭头函数中使用`rest`参数时，即使只有这一个参数，也需要使用圆括号把它围起来，不然就会报错`SyntaxError`，使用示例如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> sumAll = &lt;span class="hljs-function">(&lt;span class="hljs-params">...numbers&lt;/span>) =&gt;&lt;/span> numbers.reduce(
  &lt;span class="hljs-function">(&lt;span class="hljs-params">total, next&lt;/span>) =&gt;&lt;/span> total + next
)
&lt;span class="hljs-built_in">console&lt;/span>.log(sumAll(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">5&lt;/span>))
&lt;span class="hljs-comment">// &lt;- 8&lt;/span></code></pre>

上述代码的ES5实现如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// ES5的写法&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sumAll&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> numbers = &lt;span class="hljs-built_in">Array&lt;/span>.prototype.slice.call(&lt;span class="hljs-built_in">arguments&lt;/span>)
  &lt;span class="hljs-keyword">return&lt;/span> numbers.reduce(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">total, next&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> total + next
  })
}
&lt;span class="hljs-built_in">console&lt;/span>.log(sumAll(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">5&lt;/span>))
&lt;span class="hljs-comment">// &lt;- 8&lt;/span></code></pre>

### 拓展运算符 {#articleHeader17}

拓展运算符可以把任意可枚举对象转换为数组，使用拓展运算符可以高效处理目标对象，在拓展目前前添加`...`就可以使用拓展运算符了。下例中`...arguments`就把函数的参数转换为了数组字面量。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">cast&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> [...arguments]
}
cast(&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- ['a', 'b', 'c']&lt;/span></code></pre>

使用拓展运算符，我们也可以把字符串转换为由每一个字母组成的数组：

<pre class="javascript hljs"><code class="js">[...&lt;span class="hljs-string">'show me'&lt;/span>]
&lt;span class="hljs-comment">// &lt;- ['s', 'h', 'o', 'w', ' ', 'm', 'e']&lt;/span></code></pre>

使用拓展运算符，还可以拼合数组:

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">cast&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> [&lt;span class="hljs-string">'left'&lt;/span>, ...arguments, &lt;span class="hljs-string">'right'&lt;/span>]
}
cast(&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- ['left', 'a', 'b', 'c', 'right']&lt;/span></code></pre>

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> all = [&lt;span class="hljs-number">1&lt;/span>, ...[&lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>], &lt;span class="hljs-number">4&lt;/span>, ...[&lt;span class="hljs-number">5&lt;/span>], &lt;span class="hljs-number">6&lt;/span>, &lt;span class="hljs-number">7&lt;/span>]
&lt;span class="hljs-built_in">console&lt;/span>.log(all)
&lt;span class="hljs-comment">// &lt;- [1, 2, 3, 4, 5, 6, 7]&lt;/span></code></pre>

这里我还想再强调一下，拓展运算符不仅仅适用于数组和`arguments`对象，对任意可迭代的对象都可以使用。迭代也是ES6新提出的一个概念，在\[ Iteration and Flow Control\]()这一章，我们将详细叙述迭代。

#### Shifting和Spreading

当你想要抽出一个数组的前一个或者两个元素时，常用的解决方案是使用`.shift`.尽管是函数式的，下述代码在第一次看到的时候却不好理解，我们使用了两次`.slice`从`list`中抽离出两个不同的元素。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> list = [&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>, &lt;span class="hljs-string">'d'&lt;/span>, &lt;span class="hljs-string">'e'&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> first = list.shift()
&lt;span class="hljs-keyword">var&lt;/span> second = list.shift()
&lt;span class="hljs-built_in">console&lt;/span>.log(first)
&lt;span class="hljs-comment">// &lt;- 'a'&lt;/span></code></pre>

在ES6中，结合使用拓展和解构，可以让代码的可读性更好：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> [first, second, ...other] = [&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>, &lt;span class="hljs-string">'d'&lt;/span>, &lt;span class="hljs-string">'e'&lt;/span>]
&lt;span class="hljs-built_in">console&lt;/span>.log(other)
&lt;span class="hljs-comment">// &lt;- ['c', 'd', 'e']&lt;/span></code></pre>

除了对数组进行拓展，你同样可以对函数参数使用拓展，下例展示了如何添加任意数量的参数到`multiply`函数中。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">multiply&lt;/span>(&lt;span class="hljs-params">left, right&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> left * right
}
&lt;span class="hljs-keyword">var&lt;/span> result = multiply(...[&lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>])
&lt;span class="hljs-built_in">console&lt;/span>.log(result)
&lt;span class="hljs-comment">// &lt;- 6&lt;/span></code></pre>

向在数组中一样，函数参数中的拓展运算符同样可以结合常规参数一起使用。下例中，`print`函数结合使用了`rest`,普通参数，和拓展运算符：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">print&lt;/span>(&lt;span class="hljs-params">...list&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(list)
}
print(&lt;span class="hljs-number">1&lt;/span>, ...[&lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>], &lt;span class="hljs-number">4&lt;/span>, ...[&lt;span class="hljs-number">5&lt;/span>])
&lt;span class="hljs-comment">// &lt;- [1, 2, 3, 4, 5]&lt;/span></code></pre>

下表总结了，拓展运算符的常见使用方法：

| 使用示例                    | ES5                                             | ES6                                                                                               |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Concatenation           | `[1, 2].concat(more)`                           | `[1, 2, ...more]`                                                                                 |
| Push an array onto list | `list.push.apply(list, items)`                  | `list.push(...items)`                                                                             |
| Destructuring           | `a = list[0], other = list.slice(1)`            | `<span class="Apple-tab-span" style="white-space: pre;"> </span>[a, ...other] = list` |
| `new` and `apply`       | `new (Date.bind.apply(Date, [null,2015,31,8]))` | `new Date(...[2015,31,8])`                                                                        |

## 模板字符串 {#articleHeader18}

模板字符串是对常规`JavaScript`字符串的重大改进，不同于在普通字符串中使用单引号或者双引号，模板字符串的声明需要使用反撇号，如下所示：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> text = &lt;span class="hljs-string">`This is my first template literal`&lt;/span></code></pre>

因为使用的是反撇号，你可以在模板字符串中随意使用单双引号了，使用时不再需要考虑转义，如下：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> text = &lt;span class="hljs-string">`I'm "amazed" at these opportunities!`&lt;/span></code></pre>

模板字符串具有很多强大的功能，可在其中插入JavaScript表达式就是其一。

### 在字符串中插值 {#articleHeader19}

通过模板字符串，你可以在模板中插入任何JavaScript表达式了。当解析到表达式时，表达式会被执行，该处将渲染表达式的值，下例中，我们在字符串中插入了变量`name`：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> name = &lt;span class="hljs-string">'Shannon'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> text = &lt;span class="hljs-string">`Hello, &lt;span class="hljs-subst">${ name }&lt;/span>!`&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(text)
&lt;span class="hljs-comment">// &lt;- 'Hello, Shannon!'&lt;/span></code></pre>

模板字符串是支持任何表达式的。使用模板字符串，代码将更容易维护，你无须再手动连接字符串和JavaScript表达式了。

看下面插入日期的例子，是不是又直观又方便：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-string">`The time and date is &lt;span class="hljs-subst">${ &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Date&lt;/span>().toLocaleString() }&lt;/span>.`&lt;/span>
&lt;span class="hljs-comment">// &lt;- 'the time and date is 8/26/2015, 3:15:20 PM'&lt;/span></code></pre>

表达式中还可以包含数学运算符：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-string">`The result of 2+3 equals &lt;span class="hljs-subst">${ &lt;span class="hljs-number">2&lt;/span> + &lt;span class="hljs-number">3&lt;/span> }&lt;/span>`&lt;/span>
&lt;span class="hljs-comment">// &lt;- 'The result of 2+3 equals 5'&lt;/span></code></pre>

鉴于模板字符串本身也是JavaScript表达式，我们在模板字符串中还可以嵌套模板字符串;

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-string">`This template literal &lt;span class="hljs-subst">${ `is ${ 'nested' }` }&lt;/span>!`&lt;/span>
&lt;span class="hljs-comment">// &lt;- 'This template literal is nested!'&lt;/span></code></pre>

模板字符串的另外一个优点是支持多行字符串;

### 多行文本模板 {#articleHeader20}

在ES6之前，如果你想表现多行字符串，你需要使用转义，数组拼合，甚至使用使用注释符做复杂的hacks.如下所示：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> escaped =
&lt;span class="hljs-string">'The first line\n\
A second line\n\
Then a third line'&lt;/span>

&lt;span class="hljs-keyword">var&lt;/span> concatenated =
&lt;span class="hljs-string">'The first line\n'&lt;/span> &lt;span class="hljs-string">`
'A second line\n' `&lt;/span>
&lt;span class="hljs-string">'Then a third line'&lt;/span>

&lt;span class="hljs-keyword">var&lt;/span> joined = [
&lt;span class="hljs-string">'The first line'&lt;/span>,
&lt;span class="hljs-string">'A second line'&lt;/span>,
&lt;span class="hljs-string">'Then a third line'&lt;/span>
].join(&lt;span class="hljs-string">'\n'&lt;/span>)</code></pre>

应用ES6，这种处理就简单多了，模板字符串默认支持多行：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> multiline =
&lt;span class="hljs-string">`The first line
A second line
Then a third line`&lt;/span></code></pre>

当你需要返回的字符串基于`html`和数据生成，使用模板字符串是很简洁高效的，如下所示：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> book = {
  &lt;span class="hljs-attr">title&lt;/span>: &lt;span class="hljs-string">'Modular ES6'&lt;/span>,
  &lt;span class="hljs-attr">excerpt&lt;/span>: &lt;span class="hljs-string">'Here goes some properly sanitized HTML'&lt;/span>,
  &lt;span class="hljs-attr">tags&lt;/span>: [&lt;span class="hljs-string">'es6'&lt;/span>, &lt;span class="hljs-string">'template-literals'&lt;/span>, &lt;span class="hljs-string">'es6-in-depth'&lt;/span>]
}
&lt;span class="hljs-keyword">var&lt;/span> html = &lt;span class="hljs-string">`&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;&lt;span class="hljs-subst">${ book.title }&lt;/span>&lt;/h1&gt;
  &lt;/header&gt;
  &lt;section&gt;&lt;span class="hljs-subst">${ book.excerpt }&lt;/span>&lt;/section&gt;
  &lt;footer&gt;
    &lt;ul&gt;
      &lt;span class="hljs-subst">${
        book.tags
          .map(tag =&gt; `&lt;li&gt;${ tag }&lt;/li&gt;`)
          .join('\n      ')
      }&lt;/span>
    &lt;/ul&gt;
  &lt;/footer&gt;
&lt;/article&gt;`&lt;/span></code></pre>

上述代码将得到下面这样的结果。空格得以保留，多个`li`也按我们的预期被合适的渲染：

<pre class="javascript hljs"><code class="js">&lt;article&gt;
  &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">header&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>Modular ES6&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">header&lt;/span>&gt;&lt;/span>&lt;/span>
  &lt;section&gt;Here goes some properly sanitized HTML&lt;&lt;span class="hljs-regexp">/section&gt;
  &lt;footer&gt;
    &lt;ul&gt;
      &lt;li&gt;es6&lt;/&lt;/span>li&gt;
      &lt;span class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>template-literals&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">li&lt;/span>&gt;&lt;/span>&lt;/span>
      &lt;li&gt;es6-&lt;span class="hljs-keyword">in&lt;/span>-depth&lt;&lt;span class="hljs-regexp">/li&gt;
    &lt;/u&lt;/span>l&gt;
  &lt;span class="xml">&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">footer&lt;/span>&gt;&lt;/span>&lt;/span>
&lt;&lt;span class="hljs-regexp">/article&gt;&lt;/span></code></pre>

不过有时候我们并不希望空格被保留，下例中我们在函数中使用包含缩进的模板字符串，我们希望结果没有缩进，但是实际的结果却有四格的缩进。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getParagraph&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-string">`
    Dear Rod,

    This is a template literal string that's indented
    four spaces. However, you may have expected for it
    to be not indented at all.

    Nico
  `&lt;/span>
}</code></pre>

我们可以用下面这个功能函数对生成的字符串进行处理已得到我们想要的结果：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">unindent&lt;/span>(&lt;span class="hljs-params">text&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> text
    .split(&lt;span class="hljs-string">'\n'&lt;/span>)
    .map(&lt;span class="hljs-function">&lt;span class="hljs-params">line&lt;/span> =&gt;&lt;/span> line.slice(&lt;span class="hljs-number">4&lt;/span>))
    .join(&lt;span class="hljs-string">'\n'&lt;/span>)
    .trim()
}</code></pre>

不过，使用被称为标记模板的模板字符串新特性处理这种情况可能会更好。

### 标记模板 {#articleHeader21}

默认情况下，JavaScript会把`\`解析为转义符号，对浏览器来说，以`\`开头的字符一般具有特殊的含义。比如说`\n`意味着新行，`\u00f1`表示`ñ`等等。如果你不想浏览器执行这种特殊解析，你也可以使用`String.raw`来标记模板。下面的代码就是这样做的，这里我们使用了`String.row`来处理模板字符串，相应的这里面的`\n`没有被解析为新行。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> text = &lt;span class="hljs-built_in">String&lt;/span>.raw&lt;span class="hljs-string">`"\n" is taken literally.
It'll be escaped instead of interpreted.`&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(text)
&lt;span class="hljs-comment">// "\n" is taken literally.&lt;/span>
&lt;span class="hljs-comment">// It'll be escaped instead of interpreted.&lt;/span></code></pre>

我们添加在模板字符串之前的`String.raw`前缀，这就是标记模板，这样的模板字符串在被渲染前被该标记代表的函数预处理。

一个典型的标记模板字符串如下：

<pre class="javascript hljs"><code class="js">tag&lt;span class="hljs-string">`Hello, &lt;span class="hljs-subst">${ name }&lt;/span>. I am &lt;span class="hljs-subst">${ emotion }&lt;/span> to meet you!`&lt;/span></code></pre>

实际上，上面标记模板可以用以下函数形式表示：

<pre class="javascript hljs"><code class="js">tag(
  [&lt;span class="hljs-string">'Hello, '&lt;/span>, &lt;span class="hljs-string">'. I am '&lt;/span>, &lt;span class="hljs-string">' to meet you!'&lt;/span>],
  &lt;span class="hljs-string">'Maurice'&lt;/span>,
  &lt;span class="hljs-string">'thrilled'&lt;/span>
)</code></pre>

我们还是用代码来说明这个概念，下述代码中，我们先定义一个名为`tag`函数：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">tag&lt;/span>(&lt;span class="hljs-params">parts, ...values&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> parts.reduce(
    &lt;span class="hljs-function">(&lt;span class="hljs-params">all, part, index&lt;/span>) =&gt;&lt;/span> all + values[index - &lt;span class="hljs-number">1&lt;/span>] + part
  )
}</code></pre>

然后我们调用使用使用标记模板，不过此时的结果和不使用标记模板是一样的，这是因为我们定义的`tag`函数实际上并未对字符串进行额外的处理。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> name = &lt;span class="hljs-string">'Maurice'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> emotion = &lt;span class="hljs-string">'thrilled'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> text = tag&lt;span class="hljs-string">`Hello, &lt;span class="hljs-subst">${ name }&lt;/span>. I am &lt;span class="hljs-subst">${ emotion }&lt;/span> to meet you!`&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(text)
&lt;span class="hljs-comment">// &lt;- 'Hello Maurice, I am thrilled to meet you!'&lt;/span></code></pre>

我们看一个进行额外处理的例子，比如转换所有用户输入的值为大写（假设用户只会输入英语），这里我们定义标记函数`upper`来做这件事：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">upper&lt;/span>(&lt;span class="hljs-params">parts, ...values&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> parts.reduce(&lt;span class="hljs-function">(&lt;span class="hljs-params">all, part, index&lt;/span>) =&gt;&lt;/span>
    all + values[index - &lt;span class="hljs-number">1&lt;/span>].toUpperCase() + part
  )
}
&lt;span class="hljs-keyword">var&lt;/span> name = &lt;span class="hljs-string">'Maurice'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> emotion = &lt;span class="hljs-string">'thrilled'&lt;/span>
upper&lt;span class="hljs-string">`Hello, &lt;span class="hljs-subst">${ name }&lt;/span>. I am &lt;span class="hljs-subst">${ emotion }&lt;/span> to meet you!`&lt;/span>
&lt;span class="hljs-comment">// &lt;- 'Hello MAURICE, I am THRILLED to meet you!'&lt;/span></code></pre>

既然可以转换输入为大写，那我们再进一步想想，如果提供合适的标记模板函数，使用标记模板，我们还可以对模板中的表达式进行各种过滤处理，比如有这么一个场景，假设表达式的值都来自用户输入，假设有一个名为`sanitize`的库可用于去除用户输入中的html标签，那通过使用标记模板，就可以有效的防止XSS攻击了，使用方法如下。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sanitized&lt;/span>(&lt;span class="hljs-params">parts, ...values&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> parts.reduce(&lt;span class="hljs-function">(&lt;span class="hljs-params">all, part, index&lt;/span>) =&gt;&lt;/span>
    all + sanitize(values[index - &lt;span class="hljs-number">1&lt;/span>]) + part
  )
}
&lt;span class="hljs-keyword">var&lt;/span> comment = &lt;span class="hljs-string">'Evil comment&lt;iframe src="http://evil.corp"&gt;
    &lt;/iframe&gt;'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> html = sanitized&lt;span class="hljs-string">`&lt;div&gt;&lt;span class="hljs-subst">${ comment }&lt;/span>&lt;/div&gt;`&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(html)
&lt;span class="hljs-comment">// &lt;- '&lt;div&gt;Evil comment&lt;/div&gt;'&lt;/span></code></pre>

ES6中的另外一个大的改变是提供了新的变量声明方式：`let`和`const`声明，下面我们一起来学习。

## `let` & `const` 声明 {#articleHeader22}

可能很早之前你就听说过 `let` 了，它用起来像 `var` 但是，却有不同的作用域规则。

JavaScript的作用域有一套复杂的规则，变量提升的存在常常让新手忐忑不安。变量提升，意味着无论你在那里声明的变量，在浏览器解析时，实际上都被提升到了当前作用域的顶部被声明。看下面的这个例子：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isItTwo&lt;/span>(&lt;span class="hljs-params">value&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">if&lt;/span> (value === &lt;span class="hljs-number">2&lt;/span>) {
    &lt;span class="hljs-keyword">var&lt;/span> two = &lt;span class="hljs-literal">true&lt;/span>
  }
  &lt;span class="hljs-keyword">return&lt;/span> two
}
isItTwo(&lt;span class="hljs-number">2&lt;/span>)
&lt;span class="hljs-comment">// &lt;- true&lt;/span>
isItTwo(&lt;span class="hljs-string">'two'&lt;/span>)
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span></code></pre>

尽管`two`是在代码分支中被声明，之后被外部分支引用，上述的JS代码还是可以工作的。`var` 声明的变量`two`实际是在`isItTwo`顶部被声明的。由于声明提升的存在，上述代码其实和下面代码的效果是一样的

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isItTwo&lt;/span>(&lt;span class="hljs-params">value&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> two
  &lt;span class="hljs-keyword">if&lt;/span> (value === &lt;span class="hljs-number">2&lt;/span>) {
    two = &lt;span class="hljs-literal">true&lt;/span>
  }
  &lt;span class="hljs-keyword">return&lt;/span> two
}</code></pre>

带来了灵活性的同事，变量提升也带来了更大的迷惑性，还好ES6 为我们提供了块作用域。

### 块作用域和`let` 声明 {#articleHeader23}

相比函数作用域，块作用域允许我们通过`if`,`for`,`while`声明创建新作用域，甚至任意创建`{}`块也能创建新的作用域：

<pre class="javascript hljs"><code class="js">{{{{{ &lt;span class="hljs-keyword">var&lt;/span> deep = &lt;span class="hljs-string">'This is available from outer scope.'&lt;/span>; }}}}}
&lt;span class="hljs-built_in">console&lt;/span>.log(deep)
&lt;span class="hljs-comment">// &lt;- 'This is available from outer scope.'&lt;/span></code></pre>

由于这里使用的是`var`，考虑到变量提升的存在，我们在外部依旧可以读取到深层中的`deep`变量，这里并不会报错。不过在以下情况下，我们可能希望这里会报错：

* 访问内部变量会打破我们代码中的某种封装原则；
* 父块中已有有一个一个同名变量，但是内部也需要用同名变量；

使用`let`就可以解决这个问题，`let` 创建的变量在块作用域内有效，在ES6提出`let`以前，想要创建深层作用域的唯一办法就是再新建一个函数。使用`let`，你只需添加另外一对`{}`：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">let&lt;/span> topmost = {}
{
  &lt;span class="hljs-keyword">let&lt;/span> inner = {}
  {
    &lt;span class="hljs-keyword">let&lt;/span> innermost = {}
  }
  &lt;span class="hljs-comment">// attempts to access innermost here would throw&lt;/span>
}
&lt;span class="hljs-comment">// attempts to access inner here would throw&lt;/span>
&lt;span class="hljs-comment">// attempts to access innermost here would throw&lt;/span></code></pre>

在`for`循环中使用`let`是一个很好的实践，这样定义的变量只会在当前块作用域内生效。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; &lt;span class="hljs-number">2&lt;/span>; i++) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(i)
  &lt;span class="hljs-comment">// &lt;- 0&lt;/span>
  &lt;span class="hljs-comment">// &lt;- 1&lt;/span>
}
&lt;span class="hljs-built_in">console&lt;/span>.log(i)
&lt;span class="hljs-comment">// &lt;- i is not defined&lt;/span></code></pre>

考虑到`let`声明的变量在每一次循环的过程中都重复声明，这在处理异步函数时就很有效，不会发生使用`var`时产生的诡异的结果，我们看一个具体的例子。

我们先看看 `var` 声明的变量是怎么工作的，下述代码中 `i`变量 被绑定在 `printNumber` 函数作用域中，当每个回调函数被调用时，它的值会逐步升到10，但是当每个回调函数运行时（每100us）,此时的`i`的值已经是10了，因此每次打印的结果都是10.

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">printNumbers&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">var&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; &lt;span class="hljs-number">10&lt;/span>; i++) {
    setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
      &lt;span class="hljs-built_in">console&lt;/span>.log(i)
    }, i * &lt;span class="hljs-number">100&lt;/span>)
  }
}
printNumbers()</code></pre>

使用`let`,则会把`i`绑定到每一个块作用域中。每一次循环 `i` 的值还是在增加，但是每次其实都是创建了一个新的 `i` ，不同的 `i` 之间不会相互影响 ，因此打印出的就是预想的0到9了。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">printNumbers&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; &lt;span class="hljs-number">10&lt;/span>; i++) {
    setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
      &lt;span class="hljs-built_in">console&lt;/span>.log(i)
    }, i * &lt;span class="hljs-number">100&lt;/span>)
  }
}
printNumbers()</code></pre>

为了细致的讲述`let`的工作原理， 我们还需要弄懂一个名为 `Temporal Dead Zone` 的概念。

### Temporal Dead Zone {#articleHeader24}

简言之，如果你的代码类似下面这样，就会报错。即在某个作用域中，在`let`声明之前调用了`let`声明的变量，导致的问题就是由于，Temporal Dead Zone（TDZ）的存在。

<pre class="javascript hljs"><code class="js">{
  &lt;span class="hljs-built_in">console&lt;/span>.log(name)
  &lt;span class="hljs-comment">// &lt;- ReferenceError: name is not defined&lt;/span>
  &lt;span class="hljs-keyword">let&lt;/span> name = &lt;span class="hljs-string">'Stephen Hawking'&lt;/span>
}</code></pre>

如果定义的是一个函数，函数中引用了`name`变量则是可以的，但是这个函数并未在声明前执行则不会报错。如果`let`声明之前就调用了该函数，同样会导致TDZ。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 不会报错&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">readName&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> name
}
&lt;span class="hljs-keyword">let&lt;/span> name = &lt;span class="hljs-string">'Stephen Hawking'&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(readName())
&lt;span class="hljs-comment">// &lt;- 'Stephen Hawking'&lt;/span></code></pre>

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 会报错&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">readName&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> name
}
&lt;span class="hljs-built_in">console&lt;/span>.log(readName())
&lt;span class="hljs-comment">// ReferenceError: name is not defined&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> name = &lt;span class="hljs-string">'Stephen Hawking'&lt;/span></code></pre>

即使像下面这样`let`定义的变量没有被赋值，下面的代码也会报错，原因依旧是它试图在声明前访问一个被`let`定义的变量

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">readName&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> name
}
&lt;span class="hljs-built_in">console&lt;/span>.log(readName())
&lt;span class="hljs-comment">// ReferenceError: name is not defined&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> name</code></pre>

下面的代码则是可行的：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">readName&lt;/span>() &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> name
}
&lt;span class="hljs-keyword">let&lt;/span> name
&lt;span class="hljs-built_in">console&lt;/span>.log(readName())
&lt;span class="hljs-comment">// &lt;- undefined&lt;/span></code></pre>

TDZ的存在使得程序更容易报错，由于声明提升和不好的编码习惯常常会存在这样的问题。在ES6中则可以比较好的避免了这种问题了，需要注意的是`let`声明的变量同样存在声明提升。这意味着，**变量会在我们进入块作用域时就会创建，TDZ也是在这时候创建的**，它保证该变量不许被访问，只有在代码运行到`let`声明所在位置时，这时候TDZ才会消失，访问限制才会取消，变量才可以被访问。

### Const 声明 {#articleHeader25}

`const`声明也具有类似`let`的块作用域，它同样具有`TDZ`机制。实际上，TDZ机制是因为`const`才被创建，随后才被应用到`let`声明中。`const`需要TDZ的原因是为了防止由于变量提升，在程序解析到`const`语句之前，对`const`声明的变量进行了赋值操作，这样是有问题的。

下面的代码表明，`const`具有和`let`一致的块作用域：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> pi = &lt;span class="hljs-number">3.1415&lt;/span>
{
  &lt;span class="hljs-keyword">const&lt;/span> pi = &lt;span class="hljs-number">6&lt;/span>
  &lt;span class="hljs-built_in">console&lt;/span>.log(pi)
  &lt;span class="hljs-comment">// &lt;- 6&lt;/span>
}
&lt;span class="hljs-built_in">console&lt;/span>.log(pi)
&lt;span class="hljs-comment">// &lt;- 3.1415&lt;/span></code></pre>

下面我们说说`const`和`let`的主要区别，**首先`const`声明的变量在声明时必须赋值**,否则会报错：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> pi = &lt;span class="hljs-number">3.1415&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> e &lt;span class="hljs-comment">// SyntaxError, missing initializer&lt;/span></code></pre>

除了必须初始化，被`const`声明的变量不能再被赋予别的值。在严格模式下，试图改变`const`声明的变量会直接报错，在非严格模式下，改变被静默被忽略。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> people = [&lt;span class="hljs-string">'Tesla'&lt;/span>, &lt;span class="hljs-string">'Musk'&lt;/span>]
people = []
&lt;span class="hljs-built_in">console&lt;/span>.log(people)
&lt;span class="hljs-comment">// &lt;- ['Tesla', 'Musk']&lt;/span></code></pre>

请注意，`const`声明的变量并非意味着，其对应的值是不可变的。真正不能变的是对该值的引用，下面我们具体说明这一点。

#### 通过const声明的变量值并非不可改变

使用`const`只是意味着，变量将始终指向相同的对象或初始的值。这种引用是不可变的。但是值并非不可变。

下面的例子说明，虽然`people`的指向不可变，但是数组本身是可以被修改的。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> people = [&lt;span class="hljs-string">'Tesla'&lt;/span>, &lt;span class="hljs-string">'Musk'&lt;/span>]
people.push(&lt;span class="hljs-string">'Berners-Lee'&lt;/span>)
&lt;span class="hljs-built_in">console&lt;/span>.log(people)
&lt;span class="hljs-comment">// &lt;- ['Tesla', 'Musk', 'Berners-Lee']&lt;/span></code></pre>

`const`只是阻止变量引用另外一个值，下例中，尽管我们使用`const`声明了`people`,然后把它赋值给了`humans`,我们还是可以改变`humans`的指向，因为`humans`不是由`const`声明的，其引用可随意改变。`people` 是由 `const` 声明的，则不可改变。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> people = [&lt;span class="hljs-string">'Tesla'&lt;/span>, &lt;span class="hljs-string">'Musk'&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> humans = people
humans = &lt;span class="hljs-string">'evil'&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(humans)
&lt;span class="hljs-comment">// &lt;- 'evil'&lt;/span></code></pre>

如果我们的目的是让值不可修改，我们需要借助函数的帮助，比如使用`Object.freeze`：

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> frozen = &lt;span class="hljs-built_in">Object&lt;/span>.freeze(
  [&lt;span class="hljs-string">'Ice'&lt;/span>, &lt;span class="hljs-string">'Icicle'&lt;/span>, &lt;span class="hljs-string">'Ice cube'&lt;/span>]
)
frozen.push(&lt;span class="hljs-string">'Water'&lt;/span>)
&lt;span class="hljs-comment">// Uncaught TypeError: Can't add property 3&lt;/span>
&lt;span class="hljs-comment">// object is not extensible&lt;/span></code></pre>

下面我们详细讨论一下`const`和`let`的优点

### `const`和`let`的优点 {#articleHeader26}

新功能并不应该因为是新功能而被使用，ES6语法被使用的前提是它可以显著的提升我们代码的可读写和可维护性。`let`声明在大多数情况下，可以替换`var`以避免预期之外的问题。使用`let`你可以把声明在块的顶部进行而非函数的顶部进行。

有时，我们希望有些变量的引用不可变，这时候使用`const`就能防止很多问题的发生。下述代码中 在`checklist`函数外给`items`变量传递引用时就非常容易出错，它返回的`todo` API和`items`有了交互。当`items`变量被改为指向另外一个列表时，我们的代码就出问题了。`todo` API 用的还是`items`之前的值，`items`本身的指代则已经改变。

<pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> items = [&lt;span class="hljs-string">'a'&lt;/span>, &lt;span class="hljs-string">'b'&lt;/span>, &lt;span class="hljs-string">'c'&lt;/span>]
&lt;span class="hljs-keyword">var&lt;/span> todo = checklist(items)
todo.check()
&lt;span class="hljs-built_in">console&lt;/span>.log(items)
&lt;span class="hljs-comment">// &lt;- ['b', 'c']&lt;/span>
items = [&lt;span class="hljs-string">'d'&lt;/span>, &lt;span class="hljs-string">'e'&lt;/span>]
todo.check()
&lt;span class="hljs-built_in">console&lt;/span>.log(items)
&lt;span class="hljs-comment">// &lt;- ['d', 'e'], would be ['c'] if items had been constant&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">checklist&lt;/span>(&lt;span class="hljs-params">items&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> {
    &lt;span class="hljs-attr">check&lt;/span>: &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> items.shift()
  }
}</code></pre>

这类问题很难debug，找到问题原因就会花费你很长一段时间。使用`const`运行时就会报错，可以帮助你可以避免这种问题。

如果我们默认只使用`cosnt`和`let`声明变量，所有的变量都会有一样的作用域规则，这让代码更易理解，由于`const`造成的影响最小，它还曾被提议作为默认的变量声明。

总的来说，`const`不允许重新指定值，使用的是块作用域，存在TDZ。`let`则允许重新指定值，其它方面和`const`类似，而`var`声明使用函数作用域，可以重新指定值，可以在未声明前调用，考虑到这些，推荐尽量不要使用`var`声明了。

## 有用的链接 {#articleHeader27}

* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/ECMAScript%20%E5%92%8C%20JavaScript%E7%9A%84%E6%9C%AA%E6%9D%A5.md" target="_blank" rel="nofollow noopener noreferrer">第一章 ECMAScript简史 和 JavaScript的未来</a>
* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" target="_blank" rel="nofollow noopener noreferrer">第二章 ES6 概要</a>
* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC3%E7%AB%A0.%20Classes%2CSymbols%2CObjects%20%E5%92%8C%20Decorators.md" target="_blank" rel="nofollow noopener noreferrer">第三章 Classs,Symbols,Objects拓展 和 Decorators</a>
