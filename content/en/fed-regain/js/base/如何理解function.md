---
title: 如何理解function

---
## 想过function吗？

Function作为Javascript的核心技术之一,清晰的理解function的机制和用法,对[我们](https://www.w3cdoc.com)进行javascript开发非常重要。你有想过function是什么吗？ECMAScript 的函数实际上是功能完整的对象。其中function是javascript中定义函数的关键字，由function定义的函数是一个由代码集合而成的对象，属于引用类型。而Function则是javascript中的引用类型中的一种，类似Number和String和Object和Boolean。Function类可以表示开发者定义的任何函数。

## Function与function

ECMAScript 最令人感兴趣的可能莫过于函数实际上是功能完整的对象。Function 类可以表示开发者定义的任何函数。

用 Function 类直接创建函数的语法如下：

```
var function_name = new Function(arg1, arg2, ..., argN, function_body)
```
 在上面的形式中，每个 arg 都是一个参数（最多 25 个），最后一个参数是函数主体（要执行的代码）。这些参数必须是字符串。

记得下面这个函数吗？

```
function sayHi(sName, sMessage) {
    alert("Hello " + sName + sMessage);
}
```
还可以这样定义它：

```
var sayHi = new Function("sName", "sMessage", "alert(/"Hello /" + sName + sMessage);");
```

虽然由于字符串的关系，这种形式写起来有些困难，但有助于理解函数只不过是一种引用类型，它们的行为与用 Function 类明确创建的函数行为是相同的。

请看下面这个例子：

```
function doAdd(iNum) {
    alert(iNum + 20);
}

function doAdd(iNum) {
    alert(iNum + 10);
}

doAdd(10); //输出 "20"

```

如你所知，第二个函数覆盖了第一个函数，使 doAdd(10) 输出了 “20”，而不是 “30”。

如果以下面的形式重写该代码块，这个概念就清楚了：

```
var doAdd = new Function("iNum", "alert(iNum + 20)");
var doAdd = new Function("iNum", "alert(iNum + 10)");
doAdd(10);
```

请观察这段代码，很显然，doAdd 的值被改成了指向不同对象的指针。函数名只是指向函数对象的引用值，行为就像其他对象一样。甚至可以使两个变量指向同一个函数：

```
var doAdd = new Function("iNum", "alert(iNum + 10)");
var alsodoAdd = doAdd;
doAdd(10); //输出 "20"
alsodoAdd(10); //输出 "20"
```

在这里，变量 doAdd 被定义为函数，然后 alsodoAdd 被声明为指向同一个函数的指针。用这两个变量都可以执行该函数的代码，并输出相同的结果 -“20”。因此，如果函数名只是指向函数的变量，那么可以把函数作为参数传递给另一个函数吗？回答是肯定的！

```
function callAnotherFunc(fnFunction, vArgument) {
    fnFunction(vArgument);
}

var doAdd = new Function("iNum", "alert(iNum + 10)");

callAnotherFunc(doAdd, 10); //输出 "20"
```

在上面的例子中，callAnotherFunc() 有两个参数 - 要调用的函数和传递给该函数的参数。这段代码把 doAdd() 传递给 callAnotherFunc() 函数，参数是 10，输出 “20”。

注意：尽管可以使用 Function 构造函数创建函数，但最好不要使用它，因为用它定义函数比用传统方式要慢得多。不过，所有函数都应看作 Function 类的实例。

如前所述，函数属于引用类型，所以它们也有属性和方法。ECMAScript 定义的属性 length 声明了函数期望的参数个数。例如：

```
function doAdd(iNum) {
alert(iNum + 10);
}

function sayHi() {
alert("Hi");
}

alert(doAdd.length); //输出 "1"
alert(sayHi.length); //输出 "0"
```

函数 doAdd() 定义了一个参数，因此它的 length 是 1；sayHi() 没有定义参数，所以 length 是 0。

记住，无论定义了几个参数，ECMAScript 可以接受任意多个参数（最多 25 个），这一点在上面讲解过。属性 length 只是为查看默认情况下预期的参数个数提供了一种简便方式。

Function 对象也有与所有对象共享的 valueOf() 方法和 toString() 方法。这两个方法返回的都是函数的源代码，在调试时尤其有用。例如：

```
function doAdd(iNum) {
alert(iNum + 10);
}

document.write(doAdd.toString());
```

上面这段代码输出了 doAdd() 函数的文本。

## function使用

```
function myfunc(param) {
//code
}
```

注意Javascript中的函数名相同的两个function被认为是同一个，在运行时到底调用哪一个function取决于加载顺序,后一个加载的function会覆盖前一个.

```
function func1() {return 'func1'; }
function func1(name) { return name; }
```

究其原因是：javascript中function的参数都是可选参数,因此funciton的识别是不包括入参的,而函数入参处的声明是为了引用方便以及可读性.

以上的代码也等价于:

```
function func1() {
return arguments[0] || 'func1';
}
func(); //return 'func1'
func('function'); //return 'function'
```


### function当作对象

是的没错,在javascript中function就是对象,[我们](https://www.w3cdoc.com)可以向使用一个对象那样使用function。它可以有自己的属性和方法.有如下的一个funciton:

```
function nameOf(name) {
  return name.toUpperCase();
}
```

function作为对象进行赋值

```
var person = person || {};
person.nameOf = nameOf;
person.nameOf('yang dong') // return "YANG DONG"
```


### 定义function的属性

看看以下的代码, 你能从中的到什么信息:

```
function nameOf() {return nameOf.blogger;}
nameOf.blogger = "YANG_DONG";
```

没错,function可以拥有自己的属性。考虑这样一种场景, 假如[我们](https://www.w3cdoc.com)要统计某个function被调用的次数.那么[我们](https://www.w3cdoc.com)有两种方式来实现:

1. 设定一个全局变量来记录,该funciton被调用的次数,每调用一次,该变量加1:

```
var globalNameOfCounter = 0;
nameOf();
globalNameOfCounter ++;
```

这样做看起来是没有问题的,在代码还是比较简单的时候,它可以工作的很好,但是随着代码越来越复杂,维护这段逻辑的成本会直线上升。主要是因为:globalNameOfCounter污染的global命名空间,并且破坏了代码的封装性.

2. 使用function的属性

看看以下代码:

```
function nameOf() {
    nameOf.counter++;
    return nameOf.blogger;
}
nameOf.blogger = “YANG_DONG"
nameOf.counter = 0;
nameOf(); //nameOf.counter = 1
nameOf(); //nameOf.counter = 2
```

显而易见,第二种方式有着很好的封装性和维护性.function的属性的应用还不止如此.请看下文.

### function作为名字空间

Javascript不支持名字空间(本人不太理解如此强大的语言为什么不支持名字空间呢,这是为什么呢?),

不过[我们](https://www.w3cdoc.com)依然可以使用其强大的funciton为[我们](https://www.w3cdoc.com)支持名字空间.

从上节[我们](https://www.w3cdoc.com)知道function可以定义自己的属性,[我们](https://www.w3cdoc.com)就可以利用该特性来生成名字空间.请看以下代码:


```
nameOf.getBloggerName = function() {
    return nameOf.blogger;
}
```

此时在nameOf名字空间之下已经包含了:blogger,counter属性和function getBloggerName方法.

### function作为method

在javascript中function和method其实是没有什么本质区别的,如果非的区分两者的话,我想也就是this变量不同吧.

```
function g() {return this;}
var local = local || {};
local.method = g; //修改this指向local
local.method(); //返回local对象
g(); //返回DOMWindow对象
```

### function皆为closure

在Javascript中所有的function都绑定了一个scope chain,因此它是一个保存了调用上下文的函数.看看下面的实例代码:

```
var variable = 'global';
function getVariable(){
    var variable = 'local',
    func = function() {
        return variable;
    };
    return func;
}
getVariable()(); //return local;

```

当func被调用的时候,它所取的varible的值是调用上下文中的变量而并非与之同名的全局变量.

### 总结

如果用一句话概括今天对funciton的介绍,那么我想应该是: function是可以被调用执行的代码集对象.

以上是function的一些应用场景,当然它还不止这些.

比如: function作为构造函数(也就是funciton作为类),继承等.这些内容将在以后的blog中为[大家](https://www.w3cdoc.com)介绍,敬请期待.

## Function对象的属性和方法

函数是 JavaScript 中的引用数据类型，在函数这个对象上定义了一些属性和方法，下面[我们](https://www.w3cdoc.com)逐一来介绍这些属性和方法，这对于理解Javascript的继承机制具有一定的帮助。

### 属性arguments

获取当前正在执行的 Function 对象的所有参数，是一个类似数组但不是数组的对象，说它类似数组是因为其具有数组一样的访问性质及方式，可以由arguments[n]来访问对应的单个参数的值，并拥有数组长度属性length。还有就是arguments对象存储的是实际传递给函数的参数，而不局限于函数声明所定义的参数列表（length)，而且不能显式创建 arguments 对象。下面的Sample说明了这些性质。


```
function testArg(a, b) {
var actCount = arguments.length,
expCount = testArg.length,
result;

result = "Expected arguments' count is " + expCount + ";<br/>";
result += "Actual arguments' count is " + actCount + ".<br/>";
result += "They are:<br/>";
for (var i = 0; i < actCount; i++) {
result += arguments[i] + ";<br/>";
}
if (arguments instanceof Array) {
result += "arguments is an Array instance."
} else if (arguments instanceof Object) {
result += "arguments is an Object instance."
}
document.write(result);
}
testArg(1);
//output result is:
Expected arguments' count is 2;
Actual arguments' count is 1.
They are:
arguments is an Object instance.
```

### length

获取函数定义的参数个数，
```
functionName.length
```
不同于arguments.length，这点[我们](https://www.w3cdoc.com)在上面有介绍。因为Javascript调用函数时候对函数参数不作任何个数和类型检查，也就没有函数调用错误概念。但是[我们](https://www.w3cdoc.com)可以利用functionName.length和arguments.length的不同，在函数调用内部来检测参数个数检测。

```
function checkVarCount(a, b) {
  if (checkVarCount.length !== arguments.length) {
    alert("The count of the parameters you passed into the function doesn't match the function definition.");
  }
  alert("Successfully call the function");
}
checkVarCount(1, 2);
//Successfully call the function
checkVarCount(1);
//The count of the parameters you passed into the function doesn't match the function definition.

```

### caller

获取调用当前函数的函数。caller属性只有当函数正在执行时才被定义。
```
functionName.caller
```
如果函数是从 JavaScript 程序的顶层调用的，则caller包含null。如果在字符串上下文中使用 caller 属性，则其结果和 functionName.toString 相同，也就是说，将显示函数的反编译文本。

```
function test() {
  if (test.caller == null) {
    document.write("test is called from the toppest level");
  } else {
    document.write("test is called from the function:<br/>");
    document.writeln(test.caller.toString());
  }
  document.write("<br />");
}
//call from the top level
test();
//output: test is called from the toppest level

function testOuter() {
  test();
}

//call from the function testOuter
testOuter();
//output:
//test is called from the function:
//function testOuter() { test(); }
```

### callee

返回正被执行的 Function 对象，即指定的 Function 对象的正文。
```
  [functionName.]arguments.callee
```
callee 属性是 arguments 对象的一个成员，该属性仅当相关函数正在执行时才可用。通常这个属性被用来递归调用匿名函数。

```
var fac = function(n){
  if (n <= 0)
    return 1;
  else
    return n * arguments.callee(n - 1);
}(4);
document.write(fac);//24
```

### constructor

获取创建某个对象的函数。constructor 属性是每个具有原型的对象的原型成员。 这包括除 Global 和 Math 对象之外的所有内部 JavaScript 对象。 constructor 属性就是用来构造对象实例的函数引用。

```
// A constructor function.
function MyObj() {
  this.number = 1;
}

var x = new String("Hi");
if (x.constructor == String)
  document.write("Object is a String.");
document.write ("<br />");

var y = new MyObj;
if (y.constructor == MyObj)
  document.write("Object constructor is MyObj.");

// Output:
// Object is a String.
// Object constructor is MyObj.
```

### prototype

获取对象的原型。每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，[我们](https://www.w3cdoc.com)可以把那些不变的属性和方法，直接定义在prototype对象上。

```
function Man(name, age) {
  this.name = name;
  this.age = age;
}
Man.prototype.sex = "M";
Man.prototype.struggle = function () {
  alert("day day up!!!!");
}
var li = new Man("Leo", 10);
alert(li.sex);//M
li.struggle();//day day up
Man.prototype.isStrong = true;
alert(li.isStrong);//true
```

这样[我们](https://www.w3cdoc.com)也可以向已定义好的对象（包括javascript提供的原生对象）中追加方法和属性，

```
var aa = new Number(2);
alert(typeof (aa.add)); //undefined
Number.prototype.add = function (add1) {
return this + add1;
}
alert(aa.add(1)); // 3
```
 
## 常用方法

#### apply

调用函数，并用指定对象替换函数的this值，同时用指定数组替换函数的参数。

  functionName.apply([thisObj[,argArray]])

如果argArray为无效值，则会抛出”Object expected”错误；如果thisObj和argArray都没有提供，则会使用当前this作为thisObj

```
function callMe(arg1, arg2) {
var s = "";

s += "this value: " + this;
s += "<br />";
for (i in callMe.arguments) {
s += "arguments: " + callMe.arguments[i];
s += "<br />";
}
return s;
}

document.write("Original function: <br/>");
document.write(callMe(1, 2));
document.write("<br/>");

document.write("Function called with apply: <br/>");
document.write(callMe.apply(3, [4, 5]));
document.write("<br/>");

document.write("Function called with apply with invalid array: <br/>");
try{
document.write(callMe.apply(3,2));
} catch (e) {
document.write(e.message);
}
document.write("<br/><br/>");

document.write("Function called with apply without any argument: <br/>");
document.write(callMe.apply());
//Output result:
//Original function:
//this value: [object Window]
// arguments: 1
// arguments: 2

//Function called with apply:
//this value: 3
// arguments: 4
// arguments: 5

//Function called with apply with invalid array:
//Function.prototype.apply: Arguments list has wrong type

//Function called with apply without any argument:
//this value: [object Window]

```

#### call

调用一个对象的方法，用另一个对象替换当前对象。

  call([thisObj[, arg1[, arg2[, [, argN]]]]])

它允许您将函数的 this 对象从初始上下文变为由 thisObj 指定的新对象。 如果没有提供 thisObj 参数，则 global 对象被用作 thisObj。与apply方法唯一不同的地方是，apply的第二个参数类型必须是Array，而call方法是将所有的参数列举出来，用逗号分隔。


```
function callMe(arg1, arg2){
var s = "";

s += "this value: " + this;
s += "<br />";
for (i in callMe.arguments) {
s += "arguments: " + callMe.arguments[i];
s += "<br />";
}
return s;
}

document.write("Original function: <br/>");
document.write(callMe(1, 2));
document.write("<br/>");

document.write("Function called with call: <br/>");
document.write(callMe.call(3, 4, 5));

// Output:
// Original function:
// this value: [object Window]
// arguments: 1
// arguments: 2

// Function called with call:
// this value: 3
// arguments: 4
// arguments: 5
```

#### bind

对于给定函数，创建具有与原始函数相同的主体的绑定函数。 在绑定功能中，this对象解析为传入的对象。 该绑定函数具有指定的初始参数。
```
  function.bind(thisArg[,arg1[,arg2[,argN]]])
```
其中function, thisArg为必选项。返回一个与 function 函数相同的新函数，只不过函数中的this对象和参数不同。

```
// Define the original function.
var checkNumericRange = function (value) {
if (typeof value !== 'number')
return false;
else
return value >= this.minimum && value <= this.maximum;
}

// The range object will become the this value in the callback function.
var range = { minimum: 10, maximum: 20 };

// Bind the checkNumericRange function.
var boundCheckNumericRange = checkNumericRange.bind(range);

// Use the new function to check whether 12 is in the numeric range.
var result = boundCheckNumericRange (12);
document.write(result);

// Output: true
```


以下代码演示如何使用 arg1[,arg2[,argN]]] 参数。 该绑定函数将 bind 方法中指定的参数用作第一个参数和第二个参数。 在调用该绑定函数时，指定的任何参数将用作第三个、第四个参数（依此类推）。

```
// Define the original function with four parameters.
var displayArgs = function (val1, val2, val3, val4) {
document.write(val1 + " " + val2 + " " + val3 + " " + val4);
}

var emptyObject = {};

// Create a new function that uses the 12 and "a" parameters
// as the first and second parameters.
var displayArgs2 = displayArgs.bind(emptyObject, 12, "a");

// Call the new function. The "b" and "c" parameters are used
// as the third and fourth parameters.
displayArgs2("b", "c");
// Output: 12 a b c
```
在对象定义内部使用bind方法可以将某个事件绑定到对象内部的某个方法，

```
<input type="button" id="start" value="Start" />
<input type="button" id="stop" value="Stop" />
<script type="text/javascript">
function Car(owner) {
this.owner = owner;
this.start = function () {
//start the car
console.log(this);
//output: Car {owner: "Mike", start: function, stop: function} check.html:14
console.log(this.owner + "'s car is starting.");
//output: Mike's car is starting.
};
this.stop = function () {
console.log(this);
//output: <input type="button" id="stop" value="Stop" />
console.log(this.owner + "'s car is starting.");
//output: undefined's car is stopping.
};
}
var btnStart = document.getElementById("start"),
btnStop = document.getElementById("stop"),
someCar = new Car("Mike");

if (document.attachEvent) {
btnStart.attachEvent("onClick", someCar.start.bind(someCar));
btnStop.attachEvent("onClick", someCar.stop);
} else if (document.addEventListener) {
btnStart.addEventListener("click", someCar.start.bind(someCar), false);
btnStop.addEventListener("click", someCar.stop, false);
}
</script>
```

从上面Sample[我们](https://www.w3cdoc.com)发现，当不使用bind方法的时候，事件里面的this指向的触发click事件dom元素input，它当然没有owner属性；如果利用bind指定事件里面的this对象，就能达到[我们](https://www.w3cdoc.com)想要的效果。

#### toString

返回对象的字符串表示形式。

```
objectname.toString([radix])
```

objectname必需，指定需要获取字符串表示形式的对象。radix可选，为将数字值转换为字符串指定一个基数，此值仅用于数字。

toString 方法是一个所有内置的 JavaScript 对象的成员。 它的行为取决于对象的类型：

```
Object Behavior
Array 将 Array 的元素转换为字符串。 结果字符串被连接起来，用逗号分隔。
Boolean 如果布尔值为 true，则返回“true”。 否则返回“false”。
Date 返回日期的文本表示形式。
Error 返回一个包含相关错误信息的字符串。
Function 返回如下格式的字符串，其中 functionname 是一个函数的名称，此函数的 toString 方法被调用：
function functionname( ) { [native code] }
Number 返回数字的文字表示形式。
String 返回 String 对象的值。
Default 返回 "[object objectname]"，其中 objectname 为对象类型的名称。
```

#### valueOf

返回对象的原生值。

```
object.valueOf( )
```
Javascript内部各个对象定义的valueOf不同：

```
Object Return value
Array 返回数组实例。
Boolean 布尔值。
Date 从 UTC 1970 年 1 月 1 日午夜开始的存储的时间值（以毫秒为单位）。
Function 函数本身。
Number 数字值。
Object 对象本身。 这是默认值。
String 字符串值。
Math 和 Error 对象都没有 valueOf 方法。
```

Function 和 function，理解了吗？

### 举个例子

```
setTimeout('alert(1)',1e3)
// 上面这个写法会自动转成下面这个
setTimeout(new Function('alert(1)'),1e3)

```
