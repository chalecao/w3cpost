---
title: JS闭包与原型链

---
## 前言

突然想看一看javascript中的闭包与原型链的知识。这个记得不太清楚了，所以特地复习一下，看了网上许多博客，都讲解的不清楚。所以特地总结一下。

<img loading="lazy" class="alignnone size-medium wp-image-743" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/read-1-300x167.png" alt="" width="300" height="167" />

转载请注明出处：<//fed123.oss-ap-southeast-2.aliyuncs.com/2017/08/29/jsbibaoyuyuanxinglian/>

## JS闭包概念

闭包简单的理解就是能够读取其他函数内部变量的函数，从本质上理解，闭包就是将函数内部和函数外部连接起来的一座桥梁。

## 闭包用途

一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。举例如下：Js代码

```
function f1(){
　　　　var n=999;
　　　　nAdd=function(){n+=1}
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
}
　　var result=f1();
　　result(); // 999
　　nAdd();
　　result(); // 1000

```

在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。  
为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。  
这段代码中另一个值得注意的地方，就是“nAdd=function(){n+=1}”这一行，首先在nAdd前面没有使用var关键字，因此 nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个  
匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

## 原型与构造函数

Js所有的函数都有一个prototype属性，这个属性引用了一个对象，即原型对象，也简称原型。这个函数包括构造函数和普通函数，[我们](https://www.w3cdoc.com)讲的更多是构造函数的原型，但是也不能否定普通函数也有原型。譬如普通函数：

```
function F(){
　　;
}
alert(F.prototype instanceof Object) //true

```

构造函数，也即构造对象。首先了解下通过构造函数实例化对象的过程。

```
function A(x){
　　this.x=x;
}
var obj=new A(1);

```

实例化obj对象有三步：

  1. 创建obj对象：obj=new Object();
  2. 将obj的内部 _\_proto\__ 指向构造他的函数A的prototype，同时，obj.constructor===A.prototype.constructor(这个是永远成立的，即使A.prototype不再指向原来的A原型，也就是说：类的实例对象的constructor属性永远指向”构造函数”的prototype.constructor)，从而使得obj.constructor.prototype指向A.prototype（obj.constructor.prototype===A.prototype，当A.prototype改变时则不成立，下文有遇到）。obj.constructor.prototype与的内部_\_proto\__是两码事，实例化对象时用的是_\_proto\__，obj是没有prototype属性的，但是有内部的_\_proto\__，通过_\_proto\__来取得原型链上的原型属性和原型方法，FireFox公开了_\_proto\__，可以在FireFox中alert（_obj.\_proto\__）；
  3. 将obj作为this去调用构造函数A，从而设置成员（即对象属性和对象方法）并初始化。

当这3步完成，这个obj对象就与构造函数A再无联系，这个时候即使构造函数A再加任何成员，都不再影响已经实例化的obj对象了。此时，obj对象具有了x属性，同时具有了构造函数A的原型对象的所有成员，当然，此时该原型对象是没有成员的。

原型对象初始是空的，也就是没有一个成员（即原型属性和原型方法）。可以通过如下方法验证原型对象具有多少成员。

```
var num=0;
for(o in A.prototype) {
　　alert(o);//alert出原型属性名字
　　num++;
}
alert("member: " + num);//alert出原型所有成员个数。

```

但是，一旦定义了原型属性或原型方法，则所有通过该构造函数实例化出来的所有对象，都继承了这些原型属性和原型方法，这是通过内部的_\_proto\__链来实现的。譬如

```
A.prototype.say=function(){alert("Hi")};

```

那所有的A的对象都具有了say方法，这个原型对象的say方法是唯一的副本给[大家](https://www.w3cdoc.com)共享的，而不是每一个对象都有关于say方法的一个副本。

## 原型与继承

首先，看个简单的继承实现。

```
function A(x){
　　this.x=x;
}
function B(x,y){
　　this.tmpObj=A;
　　this.tmpObj(x);
　　delete this.tmpObj;
　　this.y=y;
}

```

第5、6、7行：创建临时属性tmpObj引用构造函数A，然后在B内部执行，执行完后删除。当在B内部执行了this.x=x后（这里的this是B的对象），B当然就拥有了x属性，当然B的x属性和A的x属性两者是独立，所以并不能算严格的继承。第5、6、7行有更简单的实现，就是通过call(apply)方法：A.call(this,x);

这两种方法都有将this传递到A的执行里，this指向的是B的对象，这就是为什么不直接A(x)的原因。这种继承方式即是类继承（js没有类，这里只是指构造函数），虽然继承了A构造对象的所有属性方法，但是不能继承A的原型对象的成员。而要实现这个目的，就是在此基础上再添加原型继承。

通过下面的例子，就能很深入地了解原型，以及原型参与实现的完美继承。（本文核心在此^_^）

```
function A(x){
　　this.x = x;
}
A.prototype.a = "a";
function B(x,y){
　　this.y = y;
　　A.call(this,x);
}
B.prototype.b1 = function(){
　　alert("b1");
}
B.prototype = new A();
B.prototype.b2 = function(){
　　alert("b2");
}
B.prototype.constructor = B;
var obj = new B(1,3);

```

这个例子讲的就是B继承A。第7行类继承：A.call(this.x);上面已讲过。实现原型继承的是第12行：B.prototype = new A();

就是说把B的原型指向了A的1个实例对象，这个实例对象具有x属性，为undefined，还具有a属性，值为”a”。所以B原型也具有了这2个属性（或者说，B和A建立了原型链，B是A的下级）。而因为方才的类继承，B的实例对象也具有了x属性，也就是说obj对象有2个同名的x属性，此时原型属性x要让位于实例对象属性x，所以obj.x是1，而非undefined。第13行又定义了原型方法b2，所以B原型也具有了b2。虽然第9~11行设置了原型方法b1，但是你会发现第12行执行后，B原型不再具有b1方法，也就是obj.b1是undefined。因为第12行使得B原型指向改变，原来具有b1的原型对象被抛弃，自然就没有b1了。

第12行执行完后，B原型（B.prototype）指向了A的实例对象，而A的实例对象的构造器是构造函数A，所以B.prototype.constructor就是构造对象A了（换句话说，A构造了B的原型）。

alert(B.prototype.constructor)出来后就是”function A(x){…}” 。同样地，obj.constructor也是A构造对象，alert(obj.constructor)出来后就是”function A(x){…}” ，也就是说B.prototype.constructor===obj.constructor（true），但是B.prototype===obj.constructor.prototype（false），因为前者是B的原型，具有成员：x,a,b2，后者是A的原型，具有成员：a。如何修正这个问题呢，就在第16行，将B原型的构造器重新指向了B构造函数，那么B.prototype===obj.constructor.prototype（true），都具有成员：x,a,b2。

如果没有第16行，那是不是obj = new B(1,3)会去调用A构造函数实例化呢？答案是否定的，你会发现obj.y=3，所以仍然是调用的B构造函数实例化的。虽然obj.constructor===A(true)，但是对于new B()的行为来说，执行了上面所说的通过构造函数创建实例对象的3个步骤，第一步，创建空对象；第二步，obj.**proto** === B.prototype，B.prototype是具有x,a,b2成员的，obj.constructor指向了B.prototype.constructor，即构造函数A；第三步，调用的构造函数B去设置和初始化成员，具有了属性x,y。虽然不加16行不影响obj的属性，但如上一段说，却影响obj.constructor和obj.constructor.prototype。所以在使用了原型继承后，要进行修正的操作。

关于第12、16行，总言之，第12行使得B原型继承了A的原型对象的所有成员，但是也使得B的实例对象的构造器的原型指向了A原型，所以要通过第16行修正这个缺陷。

## 原型使用

原型使用方式1, 个人理解，之前写JS都是这样:

```
var decimalDigits = 2,
tax = 5;

function add(x, y) {
return x + y;
}

function subtract(x, y) {
return x - y;
}

//alert(add(1, 3));

```

但是，这个并不能体现OOP思想，看了原型与原型链之后觉得OOP一目了然:

```
var Calculator = function (decimalDigits, tax) {
this.decimalDigits = decimalDigits;
this.tax = tax;
};

```

然后给Calculator的prototype属性赋值对象字面量来设定Calculator对象的原型。

```
Calculator.prototype = {
add: function (x, y) {
return x + y;
},

subtract: function (x, y) {
return x - y;
}
};
//alert((new Calculator()).add(1, 3));

```



这样，通过new 一个对象就可以调用里面的公开的方法，属性。

#### 原型使用方式2

当[我们](https://www.w3cdoc.com)把一堆方法写到Calculator中，但是有些方法[我们](https://www.w3cdoc.com)不想对外公开，即实现public/private，那么[我们](https://www.w3cdoc.com)只能返回公开的方法:<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
      
        16
    </td>
    
    <td>
        var Calculaotr = function(x, y) {
      
        this.x = x;
      
        this.y = y;
      
        };
      
        Calculaotr.prototype = function() {
      
        add= function (x,y) {
      
        return x + y;
      
        },
      
        subtract=function (x,y) {
      
        return x - y;
      
        }
      
        return {
      
        A:add,
      
        S:subtract
      
        }
      
        }();
    </td>
  </tr>
</table></figure>

这里用利用函数自执行在加载文件同时，执行上面的JS代码，那么[我们](https://www.w3cdoc.com)就可以访问对外公开的方法和属性。访问方法：(new Calculaotr()).A(1,2); 错误的访问方法：(new Calculaotr()).add(1,2);

[我们](https://www.w3cdoc.com)可能会遇到这样的情况，类A的一个属性是B类型，在JS中，可以通过以下方式实现:<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
    </td>
    
    <td>
        var BaseCalculator = function() {
      
        this.decimalDigits = 2;
      
        };
      
        BaseCalculator.prototype = {
      
        A: function(x, y) {
      
        return x + y;
      
        },
      
        S: function(x, y) {
      
        return x - y;
      
        }
      
        };
      
        var Calculator = function() {
      
        this.tax = 3;
      
        };
      
        Calculator.prototype = new BaseCalculator();
    </td>
  </tr>
</table></figure>

这里[我们](https://www.w3cdoc.com)可以看到Calculator的原型是指向到BaseCalculator的一个实例上，目的是让Calculator集成它的add(x,y)和subtract(x,y)这2个function，

还有一点要说的是，由于它的原型是BaseCalculator的一个实例，所以不管你创建多少个Calculator对象实例，他们的原型指向的都是同一个实例。

如果[我们](https://www.w3cdoc.com)不想让Calculator对象访问BaseCalculator的decimalDigits属性，可以这样:<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
    </td>
    
    <td>
        var BaseCalculator = function() {
      
        this.decimalDigits = 2;
      
        };
      
        BaseCalculator.prototype = {
      
        A: function(x, y) {
      
        return x + y;
      
        },
      
        S: function(x, y) {
      
        return x - y;
      
        }
      
        };
      
        var Calculator = function() {
      
        this.tax = 3;
      
        };
      
        Calculator.prototype =new prototype;
    </td>
  </tr>
</table></figure>

通过以上两种原型使用方式，结合C#中的继承，不难想到JS中如何重写原型。

重写原型:

在项目中，引入外部JS库，但是有些方法并不是[我们](https://www.w3cdoc.com)想要的，此时[我们](https://www.w3cdoc.com)通过重写原型，就可以达到[我们](https://www.w3cdoc.com)想要的结果:<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
    </td>
    
    <td>
        //重写原型
      
        Calculaotor.prototype.add = function(x, y) {
      
        return x + y + this.tax;
      
        }
    </td>
  </tr>
</table></figure>

### 原型链应用<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
      
        16
      
        17
      
        18
      
        19
      
        20
      
        21
      
        22
      
        23
      
        24
      
        25
      
        26
    </td>
    
    <td>
        function Foo() {
      
        this.value = 42;
      
        }
      
        Foo.prototype = {
      
        method: function() {}
      
        };
      

      
        function Bar() {}
      

      
        // 设置Bar的prototype属性为Foo的实例对象
      
        Bar.prototype = new Foo();
      
        Bar.prototype.foo = &#8216;Hello World&#8217;;
      

      
        // 修正Bar.prototype.constructor为Bar本身
      
        Bar.prototype.constructor = Bar;
      

      
        var test = new Bar() // 创建Bar的一个新实例
      

      
        // 原型链
      
        test [Bar的实例]
      
        Bar.prototype [Foo的实例]
      
        { foo: &#8216;Hello World&#8217; }
      
        Foo.prototype
      
        {method: &#8230;};
      
        Object.prototype
      
        {toString: &#8230; /* etc. */};
    </td>
  </tr>
</table></figure>

上面的例子中，test 对象从 Bar.prototype 和 Foo.prototype 继承下来；因此，它能访问 Foo 的原型方法 method。同时，它也能够访问那个定义在原型上的 Foo 实例属性 value。需要注意的是 new Bar() 不会创造出一个新的 Foo 实例，而是重复使用它原型上的那个实例；因此，所有的 Bar 实例都会共享相同的 value 属性。

当查找一个对象的属性时，会遍历原型链，一直往顶层Object找，如果没有找到，则返回undefined.<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
      
        16
      
        17
    </td>
    
    <td>
        function foo() {
      
        this.add = function (x, y) {
      
        return x + y;
      
        }
      
        }
      

      
        foo.prototype.add = function (x, y) {
      
        return x + y + 10;
      
        }
      

      
        Object.prototype.subtract = function (x, y) {
      
        return x - y;
      
        }
      

      
        var f = new foo();
      
        alert(f.add(1, 2)); //结果是3，而不是13
      
        alert(f.subtract(1, 2)); //结果是-1
    </td>
  </tr>
</table></figure>

以上add函数返回的是3，而不是13则说明，属性查找时，优先查找自己的属性。然后在往上一级找，最后找Object，这样看来，在遍历时用for in效率就是个问题。

还有一点，[我们](https://www.w3cdoc.com)可以赋值任何类型的对象到原型上，但是不能赋值原子类型的值，比如如下代码是无效的：<figure>

<table>
  <tr>
    <td>
        1

        2
    </td>
    
    <td>
        function Foo() {}
      
        Foo.prototype = 1; // 无效
    </td>
  </tr>
</table></figure>

hasOwnProperty是判断一个对象是否包含自定义属性而不是原型链上的属性，是JS中唯一一个查找属性，但不查找原型链的函数。

但是JS不会保护hasOwnProperty函数，如果刚好某个对象中也有hasOwnProperty函数，则[我们](https://www.w3cdoc.com)可以通过以下方式正确获得想要的结果:<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        alert({}.hasOwnProperty.call(c, &#8216;tax&#8217;));//返回true
    </td>
  </tr>
</table></figure>

这里的c是Calculator的一个对象,tax是[我们](https://www.w3cdoc.com)要找的属性。

当我面在for in loop 语句中查找属性时，用hasOwnProperty函数，提高效率:<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
    </td>
    
    <td>
        Object.prototype.bar = 1;
      
        var foo={moo : 1}
      
        for (var i in foo) {
      
        if(foo.hasOwnProperty(i)) {
      
        alert(console.log(i));
      
        }
      
        }//此时只会输出moo属性
    </td>
  </tr>
</table></figure>

### 谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T
