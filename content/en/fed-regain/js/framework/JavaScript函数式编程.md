---
title: JavaScript函数式编程

---
转载，原文：https://zhuanlan.zhihu.com/p/21714695

## 一、引言

说到函数式编程，[大家](https://www.w3cdoc.com)可能第一印象都是学院派的那些晦涩难懂的代码，充满了一大堆抽象的不知所云的符号，似乎只有大学里的计算机教授才会使用这些东西。在曾经的某个时代可能确实如此，但是近年来随着技术的发展，函数式编程已经在实际生产中发挥巨大的作用了，越来越多的语言开始加入闭包，匿名函数等非常典型的函数式编程的特性，从某种程度上来讲，函数式编程正在逐步“同化”命令式编程。

JavaScript 作为一种典型的多范式编程语言，这两年随着React的火热，函数式编程的概念也开始流行起来，RxJS、cycleJS、lodashJS、underscoreJS等多种开源库都使用了函数式的特性。所以下面介绍一些函数式编程的知识和概念。

## 二、纯函数

如果你还记得一些初中的数学知识的话，函数 **f** 的概念就是，对于输入 **x** 产生一个输出 **y = f(x)**。这便是一种最简单的纯函数。**纯函数的定义是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。**

下面来举个栗子，比如在Javascript中对于数组的操作，有些是纯的，有些就不是纯的：

```
var arr = [1,2,3,4,5];

// Array.slice是纯函数，因为它没有副作用，对于固定的输入，输出总是固定的
// 可以，这很函数式
xs.slice(0,3);
//=> [1,2,3]
xs.slice(0,3);
//=> [1,2,3]

// Array.splice是不纯的，它有副作用，对于固定的输入，输出不是固定的
// 这不函数式
xs.splice(0,3);
//=> [1,2,3]
xs.splice(0,3);
//=> [4,5]
xs.splice(0,3);
//=> []

```


在函数式编程中，[我们](https://www.w3cdoc.com)想要的是 **slice**这样的纯函数，而不是 **splice**这种每次调用后都会把数据弄得一团乱的函数。

为什么函数式编程会排斥不纯的函数呢？下面再看一个例子：

```
//不纯的
var min = 18;
var checkage = age => age > min;

//纯的，这很函数式
var checkage = age => age > 18;

```


在不纯的版本中，**checkage**这个函数的行为不仅取决于输入的参数 age，还取决于一个外部的变量 **min**，换句话说，这个函数的行为需要由外部的系统环境决定。对于大型系统来说，这种对于外部状态的依赖是造成系统复杂性大大提高的主要原因。

可以注意到，纯的 **checkage**把关键数字 18 硬编码在函数内部，扩展性比较差，[我们](https://www.w3cdoc.com)可以在后面的**柯里化**中看到如何用优雅的函数式解决这种问题。

纯函数不仅可以有效降低系统的复杂度，还有很多很棒的特性，比如可缓存性：

```
import _ from 'lodash';
var sin = _.memorize(x => Math.sin(x));

//第一次计算的时候会稍慢一点
var a = sin(1);

//第二次有了缓存，速度极快
var b = sin(1);

```




## 三、函数的柯里化

函数柯里化（curry）的定义很简单：传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

比如对于加法函数 **var add = (x, y) =>　x + y** ，[我们](https://www.w3cdoc.com)可以这样进行柯里化：

```
//比较容易读懂的ES5写法
var add = function(x){  return function(y){      return x + y  }
}

//ES6写法，也是比较正统的函数式写法
var add = x => (y => x + y);

//试试看
var add2 = add(2);
var add200 = add(200);

add2(2); // =>4
add200(50); // =>250

```


对于加法这种极其简单的函数来说，柯里化并没有什么大用处。

还记得上面那个 **checkage**的函数吗？[我们](https://www.w3cdoc.com)可以这样柯里化它：

```
var checkage = min => (age => age > min);
var checkage18 = checkage(18);
checkage18(20);
// =>true

```


**事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法：**

```
import { curry } from 'lodash';

//首先柯里化两个纯函数
var match = curry((reg, str) => str.match(reg));
var filter = curry((f, arr) => arr.filter(f));

//判断字符串里有没有空格
var haveSpace = match(/\s+/g);

haveSpace("ffffffff");
//=>null

haveSpace("a b");
//=>[" "]

filter(haveSpace, ["abcdefg", "Hello World"]);
//=>["Hello world"]

```




## 四、函数组合

学会了使用纯函数以及如何把它柯里化之后，[我们](https://www.w3cdoc.com)会很容易写出这样的“包菜式”代码：

```
h(g(f(x)));

```


虽然这也是函数式的代码，但它依然存在某种意义上的“不优雅”。为了解决函数嵌套的问题，[我们](https://www.w3cdoc.com)需要用到“函数组合”：

```
//两个函数的组合
var compose = function(f, g) {  return function(x) {      return f(g(x));  };
};

//或者
var compose = (f, g) => (x => f(g(x)));

var add1 = x => x + 1;
var mul5 = x => x * 5;

compose(mul5, add1)(2);
// =>15 

```


[我们](https://www.w3cdoc.com)定义的compose就像双面胶一样，可以把任何两个纯函数结合到一起。当然你也可以扩展出组合三个函数的“三面胶”，甚至“四面胶”“N面胶”。

这种灵活的组合可以让[我们](https://www.w3cdoc.com)像拼积木一样来组合函数式的代码：

```
var first = arr => arr[0];
var reverse = arr => arr.reverse();

var last = compose(first, reverse);

last([1,2,3,4,5]);
// =>5

```




## 五、Point Free

有了柯里化和函数组合的基础知识，下面介绍一下Point Free这种代码风格。

细心的话你可能会注意到，之前的代码中[我们](https://www.w3cdoc.com)总是喜欢把一些对象自带的方法转化成纯函数：

```
var map = (f, arr) => arr.map(f);

var toUpperCase = word => word.toUpperCase();

```


这种做法是有原因的。

Point Free这种模式现在还暂且没有中文的翻译，有兴趣的话可以看看这里的英文解释：

<a class=" external" href="https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Tacit_programming" target="_blank" rel="nofollow noreferrer noopener">https://en.wikipedia.org/wiki/Tacit_programming<i class="icon-external"></i></a>

用中文解释的话大概就是，不要命名转瞬即逝的中间变量，比如：

```
//这不Piont free
var f = str => str.toUpperCase().split(' ');

```


这个函数中，[我们](https://www.w3cdoc.com)使用了 str 作为[我们](https://www.w3cdoc.com)的中间变量，但这个中间变量除了让代码变得长了一点以外是毫无意义的。下面改造一下这段代码：

```
var toUpperCase = word => word.toUpperCase();
var split = x => (str => str.split(x));

var f = compose(split(' '), toUpperCase);

f("abcd efgh");
// =>["ABCD", "EFGH"]

```


这种风格能够帮助[我们](https://www.w3cdoc.com)减少不必要的命名，让代码保持简洁和通用。当然，为了在一些函数中写出Point Free的风格，在代码的其它地方必然是不那么Point Free的，这个地方需要自己取舍。

## 六、声明式与命令式代码

命令式代码的意思就是，[我们](https://www.w3cdoc.com)通过编写一条又一条指令去让计算机执行一些动作，这其中一般都会涉及到很多繁杂的细节。

而声明式就要优雅很多了，[我们](https://www.w3cdoc.com)通过写表达式的方式来声明[我们](https://www.w3cdoc.com)想干什么，而不是通过一步一步的指示。

```
//命令式
var CEOs = [];
for(var i = 0; i < companies.length; i++){  CEOs.push(companies[i].CEO)
}

//声明式
var CEOs = companies.map(c => c.CEO);

```


命令式的写法要先实例化一个数组，然后再对 companies 数组进行for循环遍历，手动命名、判断、增加计数器，就好像你开了一辆零件全部暴露在外的汽车一样，虽然很机械朋克风，但这并不是优雅的程序员应该做的。

声明式的写法是一个表达式，如何进行计数器迭代，返回的数组如何收集，这些细节都隐藏了起来。它指明的是做什么，而不是怎么做。除了更加清晰和简洁之外，map 函数还可以进一步独立优化，甚至用解释器内置的速度极快的 map 函数，这么一来[我们](https://www.w3cdoc.com)主要的业务代码就无须改动了。

函数式编程的一个明显的好处就是这种声明式的代码，对于无副作用的纯函数，[我们](https://www.w3cdoc.com)完全可以不考虑函数内部是如何实现的，专注于编写业务代码。优化代码时，目光只需要集中在这些稳定坚固的函数内部即可。

相反，不纯的不函数式的代码会产生副作用或者依赖外部系统环境，使用它们的时候总是要考虑这些不干净的副作用。在复杂的系统中，这对于程序员的心智来说是极大的负担。

## 七、尾声

任何代码都是要有实际用处才有意义，对于JS来说也是如此。然而现实的编程世界显然不如范例中的函数式世界那么美好，实际应用中的JS是要接触到ajax、DOM操作，NodeJS环境中读写文件、网络操作这些对于外部环境强依赖，有明显副作用的“很脏”的工作。

这对于函数式编程来说也是很大的挑战，所以[我们](https://www.w3cdoc.com)也需要更强大的技术去解决这些“脏问题”。我会在下一篇文章中介绍函数式编程的更加高阶一些的知识，例如Functor、Monad等等概念。

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-下篇&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-

所谓的纯函数就是，**对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态**（我偷懒复制过来的）。

但是实际的编程中，特别是[前端](https://www.w3cdoc.com)的编程范畴里，“不依赖外部环境”这个条件是根本不可能的，[我们](https://www.w3cdoc.com)总是不可避免地接触到 DOM、AJAX 这些状态随时都在变化的东西。所以[我们](https://www.w3cdoc.com)需要用更强大的技术来干这些脏活。



## 一、容器、Functor

如果你熟悉 jQuery 的话，应该还记得，**$(&#8230;)** 返回的对象并不是一个原生的 DOM 对象，而是对于原生对象的一种封装：

```
var foo = $('#foo');
foo == document.getElementById('foo');
//=> false

foo[0] == document.getElementById('foo');
//=> true

```


这在某种意义上就是一个“容器”（但它并不函数式）。

接下类[我们](https://www.w3cdoc.com)会看到，容器为函数式编程里普通的变量、对象、函数提供了一层极其强大的外衣，赋予了它们一些很惊艳的特性，就好像 Tony Stark 的钢铁外衣，Dva 的机甲，明日香的2号机一样。

下面[我们](https://www.w3cdoc.com)就来写一个最简单的容器吧：

```
var Container = function(x) {this.__value = x;
}
Container.of = x => new Container(x);

//试试看
Container.of(1);
//=> Container(1)

Container.of('abcd');
//=> Container('abcd')

```


[我们](https://www.w3cdoc.com)调用 **Container.of** 把东西装进容器里之后，由于这一层外壳的阻挡，普通的函数就对他们不再起作用了，所以[我们](https://www.w3cdoc.com)需要加一个接口来让外部的函数也能作用到容器里面的值：

```
Container.prototype.map = function(f){return Container.of(f(this.__value))
}

```


[我们](https://www.w3cdoc.com)可以这样使用它：

```
Container.of(3)  .map(x => x + 1)                //=> Container(4)  .map(x => 'Result is ' + x);    //=> Container('Result is 4')

```


没错！[我们](https://www.w3cdoc.com)仅花了 7 行代码就实现了很炫的『**链式调用』**，这也是[我们](https://www.w3cdoc.com)的第一个 **Functor**。

**Functor（函子）是实现了 map 并遵守一些特定规则的容器类型。**

也就是说，如果[我们](https://www.w3cdoc.com)要将普通函数应用到一个被容器包裹的值，那么[我们](https://www.w3cdoc.com)首先需要定义一个叫 **Functor** 的数据类型，在这个数据类型中需要定义如何使用 **map** 来应用这个普通函数。

把东西装进一个容器，只留出一个接口 **map** 给容器外的函数，这么做有什么好处呢？

本质上，**Functor** 是一个对于函数调用的抽象，[我们](https://www.w3cdoc.com)赋予容器自己去调用函数的能力。当 **map** 一个函数时，[我们](https://www.w3cdoc.com)让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数，以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性。

举个例子，[我们](https://www.w3cdoc.com)现在为 **map** 函数添加一个检查空值的特性，这个新的容器[我们](https://www.w3cdoc.com)称之为 **Maybe**（原型来自于Haskell）：

```
var Maybe = function(x) {this.__value = x;
}

Maybe.of = function(x) {return new Maybe(x);
}

Maybe.prototype.map = function(f) {return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.prototype.isNothing = function() {return (this.__value === null || this.__value === undefined);
}

//试试看
import _ from 'lodash';
var add = _.curry(_.add);

Maybe.of({name: "Stark"})  .map(_.prop("age"))  .map(add(10));
//=> Maybe(null)

Maybe.of({name: "Stark", age: 21})  .map(_.prop("age"))  .map(add(10));
//=> Maybe(31)

```


看了这些代码，觉得链式调用总是要输入一堆 **.map(&#8230;)** 很烦对吧？这个问题很好解决，还记得[我们](https://www.w3cdoc.com)上一篇文章里介绍的**柯里化**吗？

有了柯里化这个强大的工具，[我们](https://www.w3cdoc.com)可以这样写：

```
import _ from 'lodash';
var compose = _.flowRight;
var add = _.curry(_.add);

// 创造一个柯里化的 map
var map = _.curry((f, functor) => functor.map(f));

var doEverything = map(compose(add(10), _.property("age")));

var functor = Maybe.of({name: "Stark", age: 21});
doEverything(functor);
//=> Maybe(31)

```




## 二、错误处理、Either

现在[我们](https://www.w3cdoc.com)的容器能做的事情太少了，它甚至连做简单的错误处理都做不到，现在[我们](https://www.w3cdoc.com)只能类似这样处理错误：

```
try{  doSomething();
}catch(e){  // 错误处理
}

```


**try/catch/throw** 并不是“纯”的，因为它从外部接管了[我们](https://www.w3cdoc.com)的函数，并且在这个函数出错时抛弃了它的返回值。这不是[我们](https://www.w3cdoc.com)期望的函数式的行为。

如果你对 **Promise** 熟悉的话应该还记得，**Promise** 是可以调用 **catch** 来集中处理错误的：

```
doSomething()  .then(async1)  .then(async2)  .catch(e => console.log(e));

```


对于函数式编程[我们](https://www.w3cdoc.com)也可以做同样的操作，如果运行正确，那么就返回正确的结果；如果错误，就返回一个用于描述错误的结果。这个概念在 Haskell 中称之为 **Either** 类，**Left** 和 **Right** 是它的两个子类。[我们](https://www.w3cdoc.com)用 JS 来实现一下：

```
// 这里是一样的=。=
var Left = function(x) {this.__value = x;
}
var Right = function(x) {this.__value = x;
}

// 这里也是一样的=。=
Left.of = function(x) {return new Left(x);
}
Right.of = function(x) {return new Right(x);
}

// 这里不同！！！
Left.prototype.map = function(f) {return this;
}
Right.prototype.map = function(f) {return Right.of(f(this.__value));
}

```


下面来看看 **Left** 和 **Right** 的区别吧：

```
Right.of("Hello").map(str => str + " World!");
// Right("Hello World!")

Left.of("Hello").map(str => str + " World!");
// Left("Hello")

```


**Left** 和 **Right** 唯一的区别就在于 **map** 方法的实现，**Right.map** 的行为和[我们](https://www.w3cdoc.com)之前提到的 **map** 函数一样。但是 **Left.map** 就很不同了：**它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，Left 可以用来传递一个错误消息。**

```
var getAge = user => user.age ? Right.of(user.age) : Left.of("ERROR!");

//试试
getAge({name: 'stark', age: '21'}).map(age => 'Age is ' + age);
//=> Right('Age is 21')

getAge({name: 'stark'}).map(age => 'Age is ' + age);
//=> Left('ERROR!')

```


是的，**Left** 可以让调用链中任意一环的错误立刻返回到调用链的尾部，这给[我们](https://www.w3cdoc.com)错误处理带来了很大的方便，再也不用一层又一层的 **try/catch**。

**Left** 和 **Right** 是 **Either** 类的两个子类，事实上 Either 并不只是用来做错误处理的，它表示了逻辑或，范畴学里的 **coproduct**。但这些超出了[我们](https://www.w3cdoc.com)的讨论范围。



## 三、IO

下面[我们](https://www.w3cdoc.com)的程序要走出象牙塔，去接触外面“肮脏”的世界了，在这个世界里，很多事情都是有副作用的或者依赖于外部环境的，比如下面这样：

```
function readLocalStorage(){  return window.localStorage;
}

```


这个函数显然不是纯函数，因为它强依赖外部的 **window.localStorage** 这个对象，它的返回值会随着环境的变化而变化。为了让它“纯”起来，[我们](https://www.w3cdoc.com)可以把它包裹在一个函数内部，延迟执行它：

```
function readLocalStorage(){  return function(){      return window.localStorage;  }
}

```


这样 **readLocalStorage** 就变成了一个真正的纯函数！ OvO为机智的程序员鼓掌！

额……好吧……好像确实没什么卵用……[我们](https://www.w3cdoc.com)只是（像大多数拖延症晚期患者那样）把讨厌做的事情暂时搁置了而已。为了能彻底解决这些讨厌的事情，[我们](https://www.w3cdoc.com)需要一个叫 **IO** 的新的 **Functor**：

```
import _ from 'lodash';
var compose = _.flowRight;

var IO = function(f) {  this.__value = f;
}

IO.of = x => new IO(_ => x);

IO.prototype.map = function(f) {  return new IO(compose(f, this.__value))
};

```


**IO** 跟前面那几个 **Functor** 不同的地方在于，它的 __value 是一个函数。它把不纯的操作（比如 IO、网络请求、DOM）包裹到一个函数内，从而延迟这个操作的执行。所以[我们](https://www.w3cdoc.com)认为，**IO 包含的是被包裹的操作的返回值**。

```
var io_document = new IO(_ => window.document);

io_document.map(function(doc){ return doc.title });
//=> IO(document.title)

```


注意[我们](https://www.w3cdoc.com)这里虽然感觉上返回了一个实际的值 **IO(document.title)**，但事实上只是一个对象：**{ __value: [Function] }**，它并没有执行，而是简单地把[我们](https://www.w3cdoc.com)想要的操作存了起来，只有当[我们](https://www.w3cdoc.com)在真的需要这个值得时候，**IO** 才会真的开始求值，这个特性[我们](https://www.w3cdoc.com)称之为『**惰性求值』**。（培提尔其乌斯：“这是怠惰啊！”）

是的，[我们](https://www.w3cdoc.com)依然需要某种方法让 **IO** 开始求值，并且把它返回给[我们](https://www.w3cdoc.com)。它可能因为 **map** 的调用链积累了很多很多不纯的操作，一旦开始求值，就可能会把本来很干净的程序给“弄脏”。但是去直接执行这些“脏”操作不同，[我们](https://www.w3cdoc.com)把这些不纯的操作带来的复杂性和不可维护性推到了 **IO** 的调用者身上（嗯就是这么不负责任）。

下面[我们](https://www.w3cdoc.com)来做稍微复杂点的事情，编写一个函数，从当前 url 中解析出对应的参数。

```
import _ from 'lodash';

// 先来几个基础函数：
// 字符串
var split = _.curry((char, str) => str.split(char));
// 数组
var first = arr => arr[0];
var last = arr => arr[arr.length - 1];
var filter = _.curry((f, arr) => arr.filter(f));
//注意这里的 x 既可以是数组，也可以是 functor
var map = _.curry((f, x) => x.map(f));
// 判断
var eq = _.curry((x, y) => x == y);
// 结合
var compose = _.flowRight;

var toPairs = compose(map(split('=')), split('&'));
// toPairs('a=1&b=2')
//=> [['a', '1'], ['b', '2']]

var params = compose(toPairs, last, split('?'));
// params('https://xxx.com?a=1&b=2')
//=> [['a', '1'], ['b', '2']]

// 这里会有些难懂=。= 慢慢看
// 1.首先，getParam是一个接受IO(url)，返回一个新的接受 key 的函数；
// 2.[我们](https://www.w3cdoc.com)先对 url 调用 params 函数，得到类似[['a', '1'], ['b', '2']]
//   这样的数组；
// 3.然后调用 filter(compose(eq(key), first))，这是一个过滤器，过滤的
//   条件是 compose(eq(key), first) 为真，它的意思就是只留下首项为 key
//   的数组；
// 4.最后调用 Maybe.of，把它包装起来。
// 5.这一系列的调用是针对 IO 的，所以[我们](https://www.w3cdoc.com)用 map 把这些调用封装起来。
var getParam = url => key => map(compose(Maybe.of, filter(compose(eq(key), first)), params))(url);

// 创建充满了洪荒之力的 IO！！！
var url = new IO(_ => window.location.href);
// 最终的调用函数！！！
var findParam = getParam(url);

// 上面的代码都是很干净的纯函数，下面[我们](https://www.w3cdoc.com)来对它求值，求值的过程是非纯的。
// 假设现在的 url 是 https://xxx.com?a=1&b=2
// 调用 __value() 来运行它！
findParam("a").__value();
//=> Maybe(['a', '1'])

```




## 四、总结

如果你还能坚持看到这里的话，不管看没看懂，已经是勇士了。在这篇文章里，[我们](https://www.w3cdoc.com)先后提到了 **Maybe**、**Either**、**IO** 这三种强大的 **Functor**，在链式调用、惰性求值、错误捕获、输入输出中都发挥着巨大的作用。事实上 **Functor** 远不止这三种，但由于篇幅的问题就不再继续介绍了（哼才不告诉你其实是因为我还没看懂其它 **Functor** 的原理）

但依然有问题困扰着[我们](https://www.w3cdoc.com)：

1. 如何处理嵌套的 **Functor** 呢？（比如 **Maybe(IO(42))**）

2. 如何处理一个由非纯的或者异步的操作序列呢？

在这个充满了容器和 **Functor** 的世界里，[我们](https://www.w3cdoc.com)手上的工具还不够多，函数式编程的学习还远远没有结束，
