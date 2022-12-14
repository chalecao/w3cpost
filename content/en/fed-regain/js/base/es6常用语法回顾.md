---
title: ES6常用语法回顾
weight: 22
---
ES6为一些已有的功能提供了非破坏性更新，这类更新中的大部分[我们](https://www.w3cdoc.com)可以理解为语法糖，称之为语法糖，意味着，这类新语法能做的事情其实用ES5也可以做，只是会稍微复杂一些。本章[我们](https://www.w3cdoc.com)将着重讨论这些语法糖，看完之后，可能你会对一些你很熟悉的ES6新语法有不一样的理解。

## 对象字面量 {#articleHeader0}

**对象字面量**是指以`{}`形式直接表示的对象，比如下面这样：

```
var book = {
  title: 'Modular ES6',
  author: 'Nicolas',
  publisher: 'O´Reilly'
}
```

ES6 为对象字面量的语法带来了一些改进：包括属性/方法的简洁表示，可计算的属性名等等，[我们](https://www.w3cdoc.com)逐一来看：

### 属性的简洁表示法 {#articleHeader1}

你有没有遇到过这种场景，一个[我们](https://www.w3cdoc.com)声明的对象中包含若干属性，其属性值由变量表示，且变量名和属性名一样的。比如下面这样，[我们](https://www.w3cdoc.com)想把一个名为 `listeners` 的数组赋值给`events`对象中的`listeners`属性，用ES5[我们](https://www.w3cdoc.com)会这样做：

```
var listeners = []
function listen() {}
var events = {
  listeners: listeners,
  listen: listen
}
```

ES6则允许[我们](https://www.w3cdoc.com)简写成下面这种形式：

```
var listeners = []
function listen() {}
var events = { listeners, listen }
```

怎么样，是不是感觉简洁了许多，使用对象字面量的简洁写法让[我们](https://www.w3cdoc.com)在不影响语义的情况下减少了重复代码。

这是ES6带来的好处之一，它提供了众多更简洁，语义更清晰的语法，让[我们](https://www.w3cdoc.com)的代码的可读性，可维护性大大提升。

### 可计算的属性名 {#articleHeader2}

对象字面量的另一个重要更新是允许你使用可计算的属性名，在ES5中[我们](https://www.w3cdoc.com)也可以给对象添加属性名为变量的属性，一般说来，[我们](https://www.w3cdoc.com)要按下面方法这样做，首先声明一个名为`expertise`的变量，然后通过`person[expertise]`这种形式把变量添加为对象`person`的属性：

```
var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27
}
person[expertise] = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}
```

ES6 中，对象字面量可以使用计算属性名了，把任何表达式放在中括号中，表达式的运算结果将会是对应的属性名，上面的代码，用ES6可以这样写：

```
var expertise = 'journalism'
var person = {
  name: 'Sharon',
  age: 27,
  [expertise]: {
    years: 5,
    interests: ['international', 'politics', 'internet']
  }
}
```

不过需要注意的是，**简写属性和计算的属性名不可同时使用**。这是因为，简写属性是一种在编译阶段的就会生效的语法糖，而计算的属性名则在运行时才生效。如果你把二者混用，代码会报错。而且二者混用往往还会降低代码的可读性，所以JavaScript在语言层面上限制二者不能混用也是个好事。

```
var expertise = 'journalism'
var journalism = {
  years: 5,
  interests: ['international', 'politics', 'internet']
}
var person = {
  name: 'Sharon',
  age: 27,
  [expertise] // 这里会报语法错误
}
```

遇到以下情景时，可计算的属性名会让[我们](https://www.w3cdoc.com)的代码更简洁：

  1. 某个新对象的属性引自另一个对象：

```
var grocery = {
  id: 'bananas',
  name: 'Bananas',
  units: 6,
  price: 10,
  currency: 'USD'
}
var groceries = {
  [grocery.id]: grocery
}
```

  1. 需构建的对象的属性名来自函数参数。如果使用ES5来处理这种问题，[我们](https://www.w3cdoc.com)需要先声明一个对象字面量，再动态的添加属性，再返回这个对象。下面的例子中，[我们](https://www.w3cdoc.com)创建了一个响应Ajax请求的函数，这个函数的作用在于，请求失败时，返回的对象拥有一个名为`error`属性及对应的描述，请求成功时，该对象拥有一个名为`success`属性及对应的描述。

```
// ES5 写法
function getEnvelope(type, description) {
  var envelope = {
    data: {}
  }
  envelope[type] = description
  return envelope
}
```

使用ES6提供的利用计算属性名，更简洁的实现如下：

```
// ES6 写法
function getEnvelope(type, description) {
  return {
    data: {},
    [type]: description
  }
}
```

对象字面量的属性可以简写，方法其实也是可以的。

### 方法定义 {#articleHeader3}

[我们](https://www.w3cdoc.com)先看看传统上如何定义对象方法，下述代码中，[我们](https://www.w3cdoc.com)构建了一个事件发生器，其中的`on`方法用以注册事件，`emit`方法用以执行事件：

```
var emitter = {
  events: {},
  on: function (type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit: function (type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}
```

ES6 的对象字面量方法简写允许[我们](https://www.w3cdoc.com)省略对象方法的`function`关键字及之后的冒号，改写后的代码如下：

```
var emitter = {
  events: {},
  on(type, fn) {
    if (this.events[type] === undefined) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  },
  emit(type, event) {
    if (this.events[type] === undefined) {
      return
    }
    this.events[type].forEach(function (fn) {
      fn(event)
    })
  }
}
```

ES6中的箭头函数可谓大名鼎鼎了，它有一些特别的优点(关于`this`)，可能你和我一样，使用箭头函数很久了，不过有些细节我之前却一直不了解，比如箭头函数的几种简写形式及使用注意事项。

## 箭头函数 {#articleHeader4}

JS中声明的普通函数，一般有函数名，一系列参数和函数体，如下：

```
function name(parameters) {
  // function body
}
```

普通匿名函数则没有函数名，匿名函数通常会被赋值给一个变量/属性，有时候还会被直接调用：

```
var example = function (parameters) {
  // function body
}
```

ES6 为[我们](https://www.w3cdoc.com)提供了一种写匿名函数的新方法，即箭头函数。箭头函数不需要使用`function`关键字，其参数和函数体之间以`=>`相连接：

```
var example = (parameters) => {
  // function body
}
```

尽管箭头函数看起来类似于传统的匿名函数，他们却具有根本性的不同：

* 箭头函数不能被直接命名，不过允许它们赋值给一个变量；
* 箭头函数不能用做构造函数，你不能对箭头函数使用`new`关键字；
* 箭头函数也没有`prototype`属性；
* 箭头函数绑定了词法作用域，不会修改`this`的指向。

最后一点是箭头函数最大的特点，[我们](https://www.w3cdoc.com)来仔细看看。

### 词法作用域 {#articleHeader5}

[我们](https://www.w3cdoc.com)在箭头函数的函数体内使用的`this`,`arguments`,`super`等都指向包含箭头函数的上下文，箭头函数本身不产生新的上下文。下述代码中，[我们](https://www.w3cdoc.com)创建了一个名为`timer`的对象，它的属性`seconds`用以计时，方法`start`用以开始计时，若[我们](https://www.w3cdoc.com)在若干秒后调用`start`方法，将打印出当前的`seconds`值。

```
// ES5
var timer = {
  seconds: 0,
  start() {
    setInterval(function(){
      this.seconds++
    }, 1000)
  }
}

timer.start()
setTimeout(function () {
  console.log(timer.seconds)
}, 3500)

> 0

```

```
// ES6
var timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++
    }, 1000)
  }
}

timer.start()
setTimeout(function () {
  console.log(timer.seconds)
}, 3500)
// <- 3

```

第一段代码中`start`方法使用的是常规的匿名函数定义，在调用时`this`将指向了`window`，`console`出的结果为`undefined`，想要让代码正常工作，[我们](https://www.w3cdoc.com)需要在`start`方法开头处插入`var self = this`，然后替换匿名函数函数体中的`this`为`self`，第二段代码中，[我们](https://www.w3cdoc.com)使用了箭头函数，就不会发生这种情况了。

还需要说明的是，箭头函数的作用域也不能通过`.call`,`.apply`,`.bind`等语法来改变，这使得箭头函数的上下文将永久不变。

[我们](https://www.w3cdoc.com)再来看另外一个箭头函数与普通匿名函数的不同之处，你猜猜，下面的代码最终打印出的结果会是什么：

```
function puzzle() {
  return function () {
    console.log(arguments)
  }
}
puzzle('a', 'b', 'c')(1, 2, 3)
```

答案是`1,2,3`，原因是对常规匿名函数而言，`arguments`指向匿名函数本身。

作为对比，[我们](https://www.w3cdoc.com)看看下面这个例子，再猜猜，打印结果会是什么？

```
function puzzle() {
  return ()=>{
    console.log(arguments)
  }
}
puzzle('a', 'b', 'c')(1, 2, 3)
```

答案是`a,b,c`,**箭头函数的特殊性决定其本身没有`arguments`对象**，这里的`arguments`其实是其父函数`puzzle`的。

前面[我们](https://www.w3cdoc.com)提到过，箭头函数还可以简写，接下来[我们](https://www.w3cdoc.com)一起看看。

### 简写的箭头函数 {#articleHeader6}

完整的箭头函数是这样的：

```
var example = (parameters) => {
  // function body
}
```

**简写1：**

当只有一个参数时，[我们](https://www.w3cdoc.com)可以省略箭头函数参数两侧的括号：

```
var double = value => {
  return value * 2
}
```

**简写2：**

对只有单行表达式且，该表达式的值为返回值的箭头函数来说，表征函数体的`{}`，可以省略，`return` 关键字可以省略，会静默返回该单一表达式的值。

```
var double = (value) => value * 2
```

**简写3：**  
上述两种形式可以合并使用，而得到更加简洁的形式

```
var double = value => value * 2
```

现在，你肯定学会了箭头函数的基本使用方法，接下来[我们](https://www.w3cdoc.com)再看几个使用示例。

### 简写箭头函数带来的一些问题 {#articleHeader7}

当你的简写箭头函数返回值为一个对象时，你需要用小括号括起你想返回的对象。否则，[浏览器](https://www.w3cdoc.com)会把对象的`{}`解析为箭头函数函数体的开始和结束标记。

```
// 正确的使用形式
var objectFactory = () => ({ modular: 'es6' })
```

下面的代码会报错，箭头函数会把本想返回的对象的花括号解析为函数体，`number`被解析为`label`,`value`解释为没有做任何事情表达式，[我们](https://www.w3cdoc.com)又没有显式使用`return`,返回值默认是`undefined`。

```
[1, 2, 3].map(value => { number: value })
// <- [undefined, undefined, undefined]
```

当[我们](https://www.w3cdoc.com)返回的对象字面量不止一个属性时，[浏览器](https://www.w3cdoc.com)编译器不能正确解析第二个属性，这时会抛出语法错误。

```
[1, 2, 3].map(value => { number: value, verified: true })
// <- SyntaxError
```

解决方案是把返回的对象字面量包裹在小括号中，以助于[浏览器](https://www.w3cdoc.com)正确解析：

```
[1, 2, 3].map(value => ({ number: value, verified: true }))
/*<- [
  { number: 1, verified: true },
  { number: 2, verified: true },
  { number: 3, verified: true }]
*/
```

### 该何时使用箭头函数 {#articleHeader8}

其实[我们](https://www.w3cdoc.com)并不应该盲目的在一切地方使用ES6,ES6也不是一定比ES5要好，是否使用主要看其能否改善代码的可读性和可维护性。

箭头函数也并非适用于所有的情况，比如说，对于一个行数很多的复杂函数，使用`=>`代替`function`关键字带来的简洁性并不明显。不过不得不说，对于简单函数，箭头函数确实能让[我们](https://www.w3cdoc.com)的代码更简洁。

给函数以合理的命名，有助于增强程序的可读性。箭头函数并不能直接命名，但是却可以通过赋值给变量的形式实现间接命名，如下代码中，[我们](https://www.w3cdoc.com)把箭头函数赋值给变量 `throwError`，当函数被调用时，会抛出错误，[我们](https://www.w3cdoc.com)可以追溯到是箭头函数`throwError`报的错。

```
var throwError = message => {
  throw new Error(message)
}
throwError('this is a warning')
<- Uncaught Error: this is a warning
  at throwError
```

如果你想完全控制你的函数中的`this`，使用箭头函数是简洁高效的，采用函数式编程尤其如此。

```
[1, 2, 3, 4]
  .map(value => value * 2)
  .filter(value => value > 2)
  .forEach(value => console.log(value))
// <- 4
// <- 6
// <- 8
```

## 解构赋值 {#articleHeader9}

ES6提供的最灵活和富于表现性的新特性莫过于解构了。一旦你熟悉了，它用起来也很简单，某种程度上解构可以看做是变量赋值的语法糖，可应用于对象，数组甚至函数的参数。

### 对象解构 {#articleHeader10}

为了更好的描述对象解构如何使用，[我们](https://www.w3cdoc.com)先构建下面这样一个对象（漫威迷一定知道这个对象描述的是谁）：

```
// 描述Bruce Wayne的对象
var character = {
  name: 'Bruce',
  pseudonym: 'Batman',
  metadata: {
    age: 34,
    gender: 'male'
  },
  batarang: ['gas pellet', 'bat-mobile control', 'bat-cuffs']
}
```

假如现有有一个名为 `pseudonym` 的变量，[我们](https://www.w3cdoc.com)想让其变量值指向`character.pseudonym`,使用ES5，你往往会按下面这样做：

```
var pseudonym = character.pseudonym
```

ES6致力于让[我们](https://www.w3cdoc.com)的代码更简洁，通过ES6[我们](https://www.w3cdoc.com)可以用下面的代码实现一样的功能：

```
var { pseudonym } = character
```

如同你可以使用`var`加逗号在一行中同时声明多个变量，解构的花括号内使用逗号可以做一样的事情。

```
var { pseudonym, name } = character
```

[我们](https://www.w3cdoc.com)还可以混用解构和常规的自定义变量，这也是解构语法灵活性的表现之一。

```
var { pseudonym } = character, two = 2
```

解构还允许[我们](https://www.w3cdoc.com)使用别名，比如[我们](https://www.w3cdoc.com)想把`character.pseudonym`赋值给变量 `alias`,可以按下面的语句这样做，只需要在`pseudonym`后面加上`:`即可：

```
var { pseudonym: alias } = character
console.log(alias)
// <- 'Batman'
```

解构还有另外一个强大的功能，解构值还可以是对象：

```
var { metadata: { gender } } = character
```

当然，对于多层解构，[我们](https://www.w3cdoc.com)同样可以赋予别名，这样[我们](https://www.w3cdoc.com)可以通过非常简洁的方法修改子属性的名称：

```
var { metadata: { gender: characterGender } } = character
```

在ES5 中，当你调用一个未曾声明的值时，你会得到`undefined`:

```
console.log(character.boots)
// <- undefined
console.log(character['boots'])
// <- undefined
```

使用解构，情况也是类似的，如果你在左边声明了一个右边对象中不存在的属性，你也会得到`undefined`.

```
var { boots } = character
console.log(boots)
// <- undefined
```

对于多层解构，如下述代码中，`boots`并不存在于`character`中，这时程序会抛出异常，这就好比你你调用`undefined`或者`null`的属性时会出现异常。

```
var { boots: { size } } = character
// <- Exception
var { missing } = null
// <- Exception
```

解构其实就是一种语法糖，看以下代码，你肯定就能很快理解为什么会抛出异常了。

```
var nothing = null
var missing = nothing.missing
// <- Exception
```

解构也可以添加默认值，如果右侧不存在对应的值，默认值就会生效，添加的默认值可以是数值，字符串，函数，对象，也可以是某一个已经存在的变量：

```
var { boots = { size: 10 } } = character
console.log(boots)
// <- { size: 10 }
```

对于多层的解构，同样可以使用默认值

```
var { metadata: { enemy = 'Satan' } } = character
console.log(enemy)
// <- 'Satan'
```

默认值和别名也可以一起使用，不过需要注意的是别名要放在前面，默认值添加给别名：

```
var { boots: footwear = { size: 10 } } = character
```

对象解构同样支持计算属性名，但是这时候你必须要添加别名，这是因为计算属性名允许任何类似的表达式，不添加别名，[浏览器](https://www.w3cdoc.com)解析时会有问题，使用如下：

```
var { ['boo' + 'ts']: characterBoots } = character
console.log(characterBoots)
// <- true
```

还是那句话，[我们](https://www.w3cdoc.com)也不是任何情况下都应该使用解构，语句`characterBoots = character[type]`看起来比`{ [type]: characterBoots } = character`语义更清晰，但是当你需要提取对象中的子对象时，解构就很简洁方便了。

[我们](https://www.w3cdoc.com)再看看在数组中该如何使用解构。

### 数组解构 {#articleHeader11}

数组解构的语法和对象解构是类似的。区别在于，数组解构[我们](https://www.w3cdoc.com)使用中括号而非花括号，下面的代码中，通过结构，[我们](https://www.w3cdoc.com)在数组`coordinates`中提出了变量 `x,y` 。 你不需要使用`x = coordinates[0]`这样的语法了，数组解构不使用索引值，但却让你的代码更加清晰。

```
var coordinates = [12, -7]
var [x, y] = coordinates
console.log(x)
// <- 12
```

数组解构也允许你跳过你不想用到的值，在对应地方留白即可：

```
var names = ['James', 'L.', 'Howlett']
var [ firstName, , lastName ] = names
console.log(lastName)
// <- 'Howlett'
```

和对象解构一样，数组解构也允许你添加默认值：

```
var names = ['James', 'L.']
var [ firstName = 'John', , lastName = 'Doe' ] = names
console.log(lastName)
// <- 'Doe'
```

在ES5中，你需要借助第三个变量，才能完成两个变量值的交换，如下：

```
var left = 5, right = 7;
var aux = left
left = right
right = aux
```

使用解构，一切就简单多了：

```
var left = 5, right = 7;
[left, right] = [right, left]
```

[我们](https://www.w3cdoc.com)再看看函数解构。

### 函数默认参数 {#articleHeader12}

在ES6中，[我们](https://www.w3cdoc.com)可以给函数的参数添加默认值了，下例中[我们](https://www.w3cdoc.com)就给参数 `exponent` 分配了一个默认值：

```
function powerOf(base, exponent = 2) {
  return Math.pow(base, exponent)
}
```

箭头函数同样支持使用默认值，需要注意的是，就算只有一个参数，如果要给参数添加默认值，参数部分一定要用小括号括起来。

```
var double = (input = 0) => input * 2
```

[我们](https://www.w3cdoc.com)可以给任何位置的任何参数添加默认值。

```
function sumOf(a = 1, b = 2, c = 3) {
  return a + b + c
}
console.log(sumOf(undefined, undefined, 4))
// <- 1 + 2 + 4 = 7
```

在JS中，给一个函数提供一个包含若干属性的对象字面量做为参数的情况并不常见，不过你依旧可以按下面方法这样做：

```
var defaultOptions = { brand: 'Volkswagen', make: 1999 }
function carFactory(options = defaultOptions) {
  console.log(options.brand)
  console.log(options.make)
}
carFactory()
// <- 'Volkswagen'
// <- 1999
```

不过这样做存在一定的问题，当你调用该函数时，如果传入的参数对象只包含一个属性，另一个属性的默认值会自动失效：

```
carFactory({ make: 2000 })
// <- undefined
// <- 2000
```

函数参数解构就可以解决这个问题。

### 函数参数解构 {#articleHeader13}

通过函数参数解构，可以解决上面的问题，这里[我们](https://www.w3cdoc.com)为每一个属性都提供了默认值，单独改变其中一个并不会影响其它的值：

```
function carFactory({ brand = 'Volkswagen', make = 1999 }) {
  console.log(brand)
  console.log(make)
}
carFactory({ make: 2000 })
// <- 'Volkswagen'
// <- 2000
```

不过这种情况下，函数调用时，如果参数为空即`carFactory()`函数将抛出异常。这种问题可以通过下面的方法来修复，下述代码中[我们](https://www.w3cdoc.com)添加了一个空对象作为`options`的默认值，这样当函数被调用时，如果参数为空，会自动以`{}`作为参数。

```
function carFactory({
  brand = 'Volkswagen',
  make = 1999
} = {}) {
  console.log(brand)
  console.log(make)
}
carFactory()
// <- 'Volkswagen'
// <- 1999
```

除此之外，使用函数参数解构，还可以让你的函数自行匹配对应的参数，看接下来的例子，你就能明白这一点了，[我们](https://www.w3cdoc.com)定义一个名为`car`的对象，这个对象拥有很多属性：owner，brand，make，model，preferences等等。

```
var car = {
  owner: {
    id: 'e2c3503a4181968c',
    name: 'Donald Draper'
  },
  brand: 'Peugeot',
  make: 2015,
  model: '208',
  preferences: {
    airbags: true,
    airconditioning: false,
    color: 'red'
  }
}
```

解构能让[我们](https://www.w3cdoc.com)的函数方便的只使用里面的部分数据，下面代码中的函数`getCarProductModel`说明了具体该如何使用：

```
var getCarProductModel = ({ brand, make, model }) => ({
  sku: brand + ':' + make + ':' + model,
  brand,
  make,
  model
})
getCarProductModel(car)
```

### 解构使用示例 {#articleHeader14}

当一个函数的返回值为对象或者数组时，使用解构，[我们](https://www.w3cdoc.com)可以非常简洁的获取返回对象中某个属性的值（返回数组中某一项的值）。比如说，函数`getCoordinates()`返回了一系列的值，但是[我们](https://www.w3cdoc.com)只想用其中的`x,y`，[我们](https://www.w3cdoc.com)可以这样写，解构帮助[我们](https://www.w3cdoc.com)避免了很多中间变量的使用，也使得[我们](https://www.w3cdoc.com)代码的可读性更高。

```
function getCoordinates() {
  return { x: 10, y: 22, z: -1, type: '3d' }
}
var { x, y } = getCoordinates()
```

通过使用默认值，可以减少重复，比如你想写一个`random`函数，这个函数将返回一个位于`min`和`max`之间的值。[我们](https://www.w3cdoc.com)可以分辨设置`min`默认值为1，`max`默认值为10，在需要的时候还可以单独改变其中的某一个值：

```
function random({ min = 1, max = 10 } = {}) {
  return Math.floor(Math.random() * (max - min)) + min
}
console.log(random())
// <- 7
console.log(random({ max: 24 }))
// <- 18
```

解构还可以配合正则表达式使用。看下面这个例子：

```
function splitDate(date) {
  var rdate = /(\d+).(\d+).(\d+)/
  return rdate.exec(date)
}
var [ , year, month, day] = splitDate('2015-11-06')
```

不过当`.exec`不比配时会返回`null`,因此[我们](https://www.w3cdoc.com)需要修改上述代码如下：

```
var matches = splitDate('2015-11-06')
if (matches === null) {
  return
}
var [, year, month, day] = matches
```

下面[我们](https://www.w3cdoc.com)继续来讲讲`spread`和`rest`操作符。

## 剩余参数和拓展符 {#articleHeader15}

ES6之前，对于不确定数量参数的函数。你需要使用伪数组`arguments`，它拥有`length`属性，却又不具备很多一般数组有的特性。需要通过`Array#slice.call`转换`arguments`对象真数组后才能进行下一步的操作：

```
function join() {
  var list = Array.prototype.slice.call(arguments)
  return list.join(', ')
}
join('first', 'second', 'third')
// <- 'first, second, third'
```

对于这种情况，ES6提供了一种更好的解决方案：`rest`。

### 剩余参数`rest` {#articleHeader16}

使用`rest`, 你只需要在任意JavaScript函数的最后一个参数前添加三个点`...`即可。当`rest`参数是函数的唯一参数时，它就代表了传递给这个函数的所有参数。它起到和前面说的`.slice`一样的作用，把参数转换为了数组，不需要你再对`arguments`进行额外的转换了。

```
function join(...list) {
  return list.join(', ')
}
join('first', 'second', 'third')
// <- 'first, second, third'
```

`rest`参数之前的命名参数不会被包含在`rest`中，

```
function join(separator, ...list) {
  return list.join(separator)
}
join('; ', 'first', 'second', 'third')
// <- 'first; second; third'
```

在箭头函数中使用`rest`参数时，即使只有这一个参数，也需要使用圆括号把它围起来，不然就会报错`SyntaxError`，使用示例如下：

```
var sumAll = (...numbers) => numbers.reduce(
  (total, next) => total + next
)
console.log(sumAll(1, 2, 5))
// <- 8
```

上述代码的ES5实现如下：

```
// ES5的写法
function sumAll() {
  var numbers = Array.prototype.slice.call(arguments)
  return numbers.reduce(function (total, next) {
    return total + next
  })
}
console.log(sumAll(1, 2, 5))
// <- 8
```

### 拓展运算符 {#articleHeader17}

拓展运算符可以把任意可枚举对象转换为数组，使用拓展运算符可以高效处理目标对象，在拓展目前前添加`...`就可以使用拓展运算符了。下例中`...arguments`就把函数的参数转换为了数组字面量。

```
function cast() {
  return [...arguments]
}
cast('a', 'b', 'c')
// <- ['a', 'b', 'c']
```

使用拓展运算符，[我们](https://www.w3cdoc.com)也可以把字符串转换为由每一个字母组成的数组：

```
[...'show me']
// <- ['s', 'h', 'o', 'w', ' ', 'm', 'e']
```

使用拓展运算符，还可以拼合数组:

```
function cast() {
  return ['left', ...arguments, 'right']
}
cast('a', 'b', 'c')
// <- ['left', 'a', 'b', 'c', 'right']
```

```
var all = [1, ...[2, 3], 4, ...[5], 6, 7]
console.log(all)
// <- [1, 2, 3, 4, 5, 6, 7]
```

这里我还想再强调一下，拓展运算符不仅仅适用于数组和`arguments`对象，对任意可迭代的对象都可以使用。迭代也是ES6新提出的一个概念，在\[ Iteration and Flow Control\]()这一章，[我们](https://www.w3cdoc.com)将详细叙述迭代。

#### Shifting和Spreading

当你想要抽出一个数组的前一个或者两个元素时，常用的解决方案是使用`.shift`.尽管是函数式的，下述代码在第一次看到的时候却不好理解，[我们](https://www.w3cdoc.com)使用了两次`.slice`从`list`中抽离出两个不同的元素。

```
var list = ['a', 'b', 'c', 'd', 'e']
var first = list.shift()
var second = list.shift()
console.log(first)
// <- 'a'
```

在ES6中，结合使用拓展和解构，可以让代码的可读性更好：

```
var [first, second, ...other] = ['a', 'b', 'c', 'd', 'e']
console.log(other)
// <- ['c', 'd', 'e']
```

除了对数组进行拓展，你同样可以对函数参数使用拓展，下例展示了如何添加任意数量的参数到`multiply`函数中。

```
function multiply(left, right) {
  return left * right
}
var result = multiply(...[2, 3])
console.log(result)
// <- 6
```

向在数组中一样，函数参数中的拓展运算符同样可以结合常规参数一起使用。下例中，`print`函数结合使用了`rest`,普通参数，和拓展运算符：

```
function print(...list) {
  console.log(list)
}
print(1, ...[2, 3], 4, ...[5])
// <- [1, 2, 3, 4, 5]
```

下表总结了，拓展运算符的常见使用方法：

| 使用示例                    | ES5                                             | ES6                                                                                               |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Concatenation           | `[1, 2].concat(more)`                           | `[1, 2, ...more]`                                                                                 |
| Push an array onto list | `list.push.apply(list, items)`                  | `list.push(...items)`                                                                             |
| Destructuring           | `a = list[0], other = list.slice(1)`            | ` [a, ...other] = list` |
| `new` and `apply`       | `new (Date.bind.apply(Date, [null,2015,31,8]))` | `new Date(...[2015,31,8])`                                                                        |

## 模板字符串 {#articleHeader18}

模板字符串是对常规`JavaScript`字符串的重大改进，不同于在普通字符串中使用单引号或者双引号，模板字符串的声明需要使用反撇号，如下所示：

```
var text = `This is my first template literal`
```

因为使用的是反撇号，你可以在模板字符串中随意使用单双引号了，使用时不再需要考虑转义，如下：

```
var text = `I'm "amazed" at these opportunities!`
```

模板字符串具有很多强大的功能，可在其中插入JavaScript表达式就是其一。

### 在字符串中插值 {#articleHeader19}

通过模板字符串，你可以在模板中插入任何JavaScript表达式了。当解析到表达式时，表达式会被执行，该处将渲染表达式的值，下例中，[我们](https://www.w3cdoc.com)在字符串中插入了变量`name`：

```
var name = 'Shannon'
var text = `Hello, ${ name }!`
console.log(text)
// <- 'Hello, Shannon!'
```

模板字符串是支持任何表达式的。使用模板字符串，代码将更容易维护，你无须再手动连接字符串和JavaScript表达式了。

看下面插入日期的例子，是不是又直观又方便：

```
`The time and date is ${ new Date().toLocaleString() }.`
// <- 'the time and date is 8/26/2015, 3:15:20 PM'
```

表达式中还可以包含数学运算符：

```
`The result of 2+3 equals ${ 2 + 3 }`
// <- 'The result of 2+3 equals 5'
```

鉴于模板字符串本身也是JavaScript表达式，[我们](https://www.w3cdoc.com)在模板字符串中还可以嵌套模板字符串;

```
`This template literal ${ `is ${ 'nested' }` }!`
// <- 'This template literal is nested!'
```

模板字符串的另外一个优点是支持多行字符串;

### 多行文本模板 {#articleHeader20}

在ES6之前，如果你想表现多行字符串，你需要使用转义，数组拼合，甚至使用使用注释符做复杂的hacks.如下所示：

```
var escaped =
'The first line\n\
A second line\n\
Then a third line'

var concatenated =
'The first line\n' `
'A second line\n' `
'Then a third line'

var joined = [
'The first line',
'A second line',
'Then a third line'
].join('\n')
```

应用ES6，这种处理就简单多了，模板字符串默认支持多行：

```
var multiline =
`The first line
A second line
Then a third line`
```

当你需要返回的字符串基于`html`和数据生成，使用模板字符串是很简洁高效的，如下所示：

```
var book = {
  title: 'Modular ES6',
  excerpt: 'Here goes some properly sanitized HTML',
  tags: ['es6', 'template-literals', 'es6-in-depth']
}
var html = `<article>
  <header>
    <h1>${ book.title }</h1>
  </header>
  <section>${ book.excerpt }</section>
  <footer>
    <ul>
      ${
        book.tags
          .map(tag => `<li>${ tag }</li>`)
          .join('\n      ')
      }
    </ul>
  </footer>
</article>`
```

上述代码将得到下面这样的结果。空格得以保留，多个`li`也按[我们](https://www.w3cdoc.com)的预期被合适的渲染：

```
<article>
  <header>
    <h1>Modular ES6</h1>
  </header>
  <section>Here goes some properly sanitized HTML</section>
  <footer>
    <ul>
      <li>es6</li>
      <li>template-literals</li>
      <li>es6-in-depth</li>
    </ul>
  </footer>
</article>
```

不过有时候[我们](https://www.w3cdoc.com)并不希望空格被保留，下例中[我们](https://www.w3cdoc.com)在函数中使用包含缩进的模板字符串，[我们](https://www.w3cdoc.com)希望结果没有缩进，但是实际的结果却有四格的缩进。

```
function getParagraph() {
  return `
    Dear Rod,

    This is a template literal string that's indented
    four spaces. However, you may have expected for it
    to be not indented at all.

    Nico
  `
}
```

[我们](https://www.w3cdoc.com)可以用下面这个功能函数对生成的字符串进行处理已得到[我们](https://www.w3cdoc.com)想要的结果：

```
function unindent(text) {
  return text
    .split('\n')
    .map(line => line.slice(4))
    .join('\n')
    .trim()
}
```

不过，使用被称为标记模板的模板字符串新特性处理这种情况可能会更好。

### 标记模板 {#articleHeader21}

默认情况下，JavaScript会把`\`解析为转义符号，对[浏览器](https://www.w3cdoc.com)来说，以`\`开头的字符一般具有特殊的含义。比如说`\n`意味着新行，`\u00f1`表示`ñ`等等。如果你不想[浏览器](https://www.w3cdoc.com)执行这种特殊解析，你也可以使用`String.raw`来标记模板。下面的代码就是这样做的，这里[我们](https://www.w3cdoc.com)使用了`String.row`来处理模板字符串，相应的这里面的`\n`没有被解析为新行。

```
var text = String.raw`"\n" is taken literally.
It'll be escaped instead of interpreted.`
console.log(text)
// "\n" is taken literally.
// It'll be escaped instead of interpreted.
```

[我们](https://www.w3cdoc.com)添加在模板字符串之前的`String.raw`前缀，这就是标记模板，这样的模板字符串在被渲染前被该标记代表的函数预处理。

一个典型的标记模板字符串如下：

```
tag`Hello, ${ name }. I am ${ emotion } to meet you!`
```

实际上，上面标记模板可以用以下函数形式表示：

```
tag(
  ['Hello, ', '. I am ', ' to meet you!'],
  'Maurice',
  'thrilled'
)
```

[我们](https://www.w3cdoc.com)还是用代码来说明这个概念，下述代码中，[我们](https://www.w3cdoc.com)先定义一个名为`tag`函数：

```
function tag(parts, ...values) {
  return parts.reduce(
    (all, part, index) => all + values[index - 1] + part
  )
}
```

然后[我们](https://www.w3cdoc.com)调用使用使用标记模板，不过此时的结果和不使用标记模板是一样的，这是因为[我们](https://www.w3cdoc.com)定义的`tag`函数实际上并未对字符串进行额外的处理。

```
var name = 'Maurice'
var emotion = 'thrilled'
var text = tag`Hello, ${ name }. I am ${ emotion } to meet you!`
console.log(text)
// <- 'Hello Maurice, I am thrilled to meet you!'
```

[我们](https://www.w3cdoc.com)看一个进行额外处理的例子，比如转换所有用户输入的值为大写（假设用户只会输入英语），这里[我们](https://www.w3cdoc.com)定义标记函数`upper`来做这件事：

```
function upper(parts, ...values) {
  return parts.reduce((all, part, index) =>
    all + values[index - 1].toUpperCase() + part
  )
}
var name = 'Maurice'
var emotion = 'thrilled'
upper`Hello, ${ name }. I am ${ emotion } to meet you!`
// <- 'Hello MAURICE, I am THRILLED to meet you!'
```

既然可以转换输入为大写，那[我们](https://www.w3cdoc.com)再进一步想想，如果提供合适的标记模板函数，使用标记模板，[我们](https://www.w3cdoc.com)还可以对模板中的表达式进行各种过滤处理，比如有这么一个场景，假设表达式的值都来自用户输入，假设有一个名为`sanitize`的库可用于去除用户输入中的html标签，那通过使用标记模板，就可以有效的防止XSS攻击了，使用方法如下。

```
function sanitized(parts, ...values) {
  return parts.reduce((all, part, index) =>
    all + sanitize(values[index - 1]) + part
  )
}
var comment = 'Evil comment<iframe src="http://evil.corp">
    </iframe>'
var html = sanitized`<div>${ comment }</div>`
console.log(html)
// <- '<div>Evil comment</div>'
```

ES6中的另外一个大的改变是提供了新的变量声明方式：`let`和`const`声明，下面[我们](https://www.w3cdoc.com)一起来学习。

## `let` & `const` 声明 {#articleHeader22}

可能很早之前你就听说过 `let` 了，它用起来像 `var` 但是，却有不同的作用域规则。

JavaScript的作用域有一套复杂的规则，变量提升的存在常常让新手忐忑不安。变量提升，意味着无论你在那里声明的变量，在[浏览器](https://www.w3cdoc.com)解析时，实际上都被提升到了当前作用域的顶部被声明。看下面的这个例子：

```
function isItTwo(value) {
  if (value === 2) {
    var two = true
  }
  return two
}
isItTwo(2)
// <- true
isItTwo('two')
// <- undefined
```

尽管`two`是在代码分支中被声明，之后被外部分支引用，上述的JS代码还是可以工作的。`var` 声明的变量`two`实际是在`isItTwo`顶部被声明的。由于声明提升的存在，上述代码其实和下面代码的效果是一样的

```
function isItTwo(value) {
  var two
  if (value === 2) {
    two = true
  }
  return two
}
```

带来了灵活性的同事，变量提升也带来了更大的迷惑性，还好ES6 为[我们](https://www.w3cdoc.com)提供了块作用域。

### 块作用域和`let` 声明 {#articleHeader23}

相比函数作用域，块作用域允许[我们](https://www.w3cdoc.com)通过`if`,`for`,`while`声明创建新作用域，甚至任意创建`{}`块也能创建新的作用域：

```
{{{{{ var deep = 'This is available from outer scope.'; }}}}}
console.log(deep)
// <- 'This is available from outer scope.'
```

由于这里使用的是`var`，考虑到变量提升的存在，[我们](https://www.w3cdoc.com)在外部依旧可以读取到深层中的`deep`变量，这里并不会报错。不过在以下情况下，[我们](https://www.w3cdoc.com)可能希望这里会报错：

* 访问内部变量会打破[我们](https://www.w3cdoc.com)代码中的某种封装原则；
* 父块中已有有一个一个同名变量，但是内部也需要用同名变量；

使用`let`就可以解决这个问题，`let` 创建的变量在块作用域内有效，在ES6提出`let`以前，想要创建深层作用域的唯一办法就是再新建一个函数。使用`let`，你只需添加另外一对`{}`：

```
let topmost = {}
{
  let inner = {}
  {
    let innermost = {}
  }
  // attempts to access innermost here would throw
}
// attempts to access inner here would throw
// attempts to access innermost here would throw
```

在`for`循环中使用`let`是一个很好的实践，这样定义的变量只会在当前块作用域内生效。

```
for (let i = 0; i < 2; i++) {
  console.log(i)
  // <- 0
  // <- 1
}
console.log(i)
// <- i is not defined
```

考虑到`let`声明的变量在每一次循环的过程中都重复声明，这在处理异步函数时就很有效，不会发生使用`var`时产生的诡异的结果，[我们](https://www.w3cdoc.com)看一个具体的例子。

[我们](https://www.w3cdoc.com)先看看 `var` 声明的变量是怎么工作的，下述代码中 `i`变量 被绑定在 `printNumber` 函数作用域中，当每个回调函数被调用时，它的值会逐步升到10，但是当每个回调函数运行时（每100us）,此时的`i`的值已经是10了，因此每次打印的结果都是10.

```
function printNumbers() {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i)
    }, i * 100)
  }
}
printNumbers()
```

使用`let`,则会把`i`绑定到每一个块作用域中。每一次循环 `i` 的值还是在增加，但是每次其实都是创建了一个新的 `i` ，不同的 `i` 之间不会相互影响 ，因此打印出的就是预想的0到9了。

```
function printNumbers() {
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i)
    }, i * 100)
  }
}
printNumbers()
```

为了细致的讲述`let`的工作原理， [我们](https://www.w3cdoc.com)还需要弄懂一个名为 `Temporal Dead Zone` 的概念。

### Temporal Dead Zone {#articleHeader24}

简言之，如果你的代码类似下面这样，就会报错。即在某个作用域中，在`let`声明之前调用了`let`声明的变量，导致的问题就是由于，Temporal Dead Zone（TDZ）的存在。

```
{
  console.log(name)
  // <- ReferenceError: name is not defined
  let name = 'Stephen Hawking'
}
```

如果定义的是一个函数，函数中引用了`name`变量则是可以的，但是这个函数并未在声明前执行则不会报错。如果`let`声明之前就调用了该函数，同样会导致TDZ。

```
// 不会报错
function readName() {
  return name
}
let name = 'Stephen Hawking'
console.log(readName())
// <- 'Stephen Hawking'
```

```
// 会报错
function readName() {
  return name
}
console.log(readName())
// ReferenceError: name is not defined
let name = 'Stephen Hawking'
```

即使像下面这样`let`定义的变量没有被赋值，下面的代码也会报错，原因依旧是它试图在声明前访问一个被`let`定义的变量

```
function readName() {
  return name
}
console.log(readName())
// ReferenceError: name is not defined
let name
```

下面的代码则是可行的：

```
function readName() {
  return name
}
let name
console.log(readName())
// <- undefined
```

TDZ的存在使得程序更容易报错，由于声明提升和不好的编码习惯常常会存在这样的问题。在ES6中则可以比较好的避免了这种问题了，需要注意的是`let`声明的变量同样存在声明提升。这意味着，**变量会在[我们](https://www.w3cdoc.com)进入块作用域时就会创建，TDZ也是在这时候创建的**，它保证该变量不许被访问，只有在代码运行到`let`声明所在位置时，这时候TDZ才会消失，访问限制才会取消，变量才可以被访问。

### Const 声明 {#articleHeader25}

`const`声明也具有类似`let`的块作用域，它同样具有`TDZ`机制。实际上，TDZ机制是因为`const`才被创建，随后才被应用到`let`声明中。`const`需要TDZ的原因是为了防止由于变量提升，在程序解析到`const`语句之前，对`const`声明的变量进行了赋值操作，这样是有问题的。

下面的代码表明，`const`具有和`let`一致的块作用域：

```
const pi = 3.1415
{
  const pi = 6
  console.log(pi)
  // <- 6
}
console.log(pi)
// <- 3.1415
```

下面[我们](https://www.w3cdoc.com)说说`const`和`let`的主要区别，**首先`const`声明的变量在声明时必须赋值**,否则会报错：

```
const pi = 3.1415
const e // SyntaxError, missing initializer
```

除了必须初始化，被`const`声明的变量不能再被赋予别的值。在严格模式下，试图改变`const`声明的变量会直接报错，在非严格模式下，改变被静默被忽略。

```
const people = ['Tesla', 'Musk']
people = []
console.log(people)
// <- ['Tesla', 'Musk']
```

请注意，`const`声明的变量并非意味着，其对应的值是不可变的。真正不能变的是对该值的引用，下面[我们](https://www.w3cdoc.com)具体说明这一点。

#### 通过const声明的变量值并非不可改变

使用`const`只是意味着，变量将始终指向相同的对象或初始的值。这种引用是不可变的。但是值并非不可变。

下面的例子说明，虽然`people`的指向不可变，但是数组本身是可以被修改的。

```
const people = ['Tesla', 'Musk']
people.push('Berners-Lee')
console.log(people)
// <- ['Tesla', 'Musk', 'Berners-Lee']
```

`const`只是阻止变量引用另外一个值，下例中，尽管[我们](https://www.w3cdoc.com)使用`const`声明了`people`,然后把它赋值给了`humans`,[我们](https://www.w3cdoc.com)还是可以改变`humans`的指向，因为`humans`不是由`const`声明的，其引用可随意改变。`people` 是由 `const` 声明的，则不可改变。

```
const people = ['Tesla', 'Musk']
var humans = people
humans = 'evil'
console.log(humans)
// <- 'evil'
```

如果[我们](https://www.w3cdoc.com)的目的是让值不可修改，[我们](https://www.w3cdoc.com)需要借助函数的帮助，比如使用`Object.freeze`：

```
const frozen = Object.freeze(
  ['Ice', 'Icicle', 'Ice cube']
)
frozen.push('Water')
// Uncaught TypeError: Can't add property 3
// object is not extensible
```

下面[我们](https://www.w3cdoc.com)详细讨论一下`const`和`let`的优点

### `const`和`let`的优点 {#articleHeader26}

新功能并不应该因为是新功能而被使用，ES6语法被使用的前提是它可以显著的提升[我们](https://www.w3cdoc.com)代码的可读写和可维护性。`let`声明在大多数情况下，可以替换`var`以避免预期之外的问题。使用`let`你可以把声明在块的顶部进行而非函数的顶部进行。

有时，[我们](https://www.w3cdoc.com)希望有些变量的引用不可变，这时候使用`const`就能防止很多问题的发生。下述代码中 在`checklist`函数外给`items`变量传递引用时就非常容易出错，它返回的`todo` API和`items`有了交互。当`items`变量被改为指向另外一个列表时，[我们](https://www.w3cdoc.com)的代码就出问题了。`todo` API 用的还是`items`之前的值，`items`本身的指代则已经改变。

```
var items = ['a', 'b', 'c']
var todo = checklist(items)
todo.check()
console.log(items)
// <- ['b', 'c']
items = ['d', 'e']
todo.check()
console.log(items)
// <- ['d', 'e'], would be ['c'] if items had been constant
function checklist(items) {
  return {
    check: () => items.shift()
  }
}
```

这类问题很难debug，找到问题原因就会花费你很长一段时间。使用`const`运行时就会报错，可以帮助你可以避免这种问题。

如果[我们](https://www.w3cdoc.com)默认只使用`cosnt`和`let`声明变量，所有的变量都会有一样的作用域规则，这让代码更易理解，由于`const`造成的影响最小，它还曾被提议作为默认的变量声明。

总的来说，`const`不允许重新指定值，使用的是块作用域，存在TDZ。`let`则允许重新指定值，其它方面和`const`类似，而`var`声明使用函数作用域，可以重新指定值，可以在未声明前调用，考虑到这些，推荐尽量不要使用`var`声明了。

## 有用的链接 {#articleHeader27}

* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/ECMAScript%20%E5%92%8C%20JavaScript%E7%9A%84%E6%9C%AA%E6%9D%A5.md" target="_blank" rel="nofollow noopener noreferrer">第一章 ECMAScript简史 和 JavaScript的未来</a>
* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC2%E7%AB%A0.%20ES6%20%E6%A6%82%E8%A6%81.md" target="_blank" rel="nofollow noopener noreferrer">第二章 ES6 概要</a>
* <a href="https://github.com/zhangwang1990/PracticeModernJavaScript/blob/master/docs/%E7%AC%AC3%E7%AB%A0.%20Classes%2CSymbols%2CObjects%20%E5%92%8C%20Decorators.md" target="_blank" rel="nofollow noopener noreferrer">第三章 Classs,Symbols,Objects拓展 和 Decorators</a>
