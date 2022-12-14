---
title: 详解Object.create(null)和new区别
weight: 3 
---

在Vue和Vuex的源码中，作者都使用了Object.create(null)来初始化一个新对象。为什么不用更简洁的{}呢？

## Object.create()使用

照搬一下MDN上的定义：

```
Object.create(proto,[propertiesObject])
```

* proto:新创建对象的原型对象
* propertiesObject:可选。要添加到新对象的**可枚举**（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性。

举个例子(恶改了一下MDN的官方例子，看懂的点赞)：

```
const car = {
  isSportsCar: false,
  introduction: function () {
    console.log(`Hi girl, this is a ${this.name}.
    Do you like to have a drink with me ? ${this.isSportsCar}`);
  }
};

const porsche = Object.create(car,{
    //color成为porsche的数据属性
    //颜色不喜欢，可以改色或贴膜，所以可修改
    color:{
        writable:true,
        configurable:true,
        value:'yellow'
    },
    //type成为porsche的访问器属性
    type:{
        // writable、configurable等属性，不显式设置则默认为false
        // 想把普通车改成敞篷，成本有点大了，所以就设成不可配置吧
        get:function(){return 'convertible'},
        set:function(value){"change this car to",value}
    }
});

porsche.name = "Porsche 911"; // "name"是"porsche"的属性, 而不是"car"的
porsche.isSportsCar = true; // 继承的属性可以被覆写

porsche.introduction();
// expected output: "Hi girl, this is a Porsche 911. Do you like to have a drink with me ? true"
```

`Object.create()`的定义其实很简单，弄清楚上面这个例子就可以了。

## Object.create()、{…}的区别

先看看[我们](https://www.w3cdoc.com)经常使用的`{}`创建的对象是什么样子的：

```
var o = {a：1};
console.log(o)

```

在chrome控制台打印如下：

![](/images/posts/2022-12-21-20-08-18.png)

从上图可以看到，新创建的对象继承了`Object`自身的方法，如`hasOwnProperty`、`toString`等，在新对象上可以直接使用。

再看看使用`Object.create()`创建对象：

```
var o = Object.create(null,{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

在chrome控制台打印如下：

![](/images/posts/2022-12-21-20-08-09.png)

可以看到，新创建的对象除了自身属性a之外，原型链上没有任何属性，也就是没有继承Object的任何东西，此时如果[我们](https://www.w3cdoc.com)调用`o.toString()`会报`Uncaught TypeError`的错误。

[大家](https://www.w3cdoc.com)可能会注意到，第一个参数使用了null。也就是说将null设置成了新创建对象的原型，自然就不会有原型链上的属性。[我们](https://www.w3cdoc.com)再把上面的例子改一改：

```
var o = Object.create({},{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

将`null`改为`{}`，结果是怎样的？在chrome控制台打印如下：

![](/images/posts/2022-12-21-20-09-04.png)

[我们](https://www.w3cdoc.com)看到，这样创建的对象和使用`{}`创建对象已经很相近了，但是还是有一点区别：多了一层`proto`嵌套。

[我们](https://www.w3cdoc.com)最后再来改一下：

```
var o = Object.create(Object.prototype,{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

chrome控制台打印如下：

![](/images/posts/2022-12-21-20-09-14.png)

这次就和使用`{}`创建的对象一模一样了。至此，我相信[大家](https://www.w3cdoc.com)已经对两者的区别十分清楚了。

<h3 data-id="heading-2">
  Object.create(null)的使用场景
</h3>

再回到文章开头的问题，为什么很多源码作者会使用`Object.create(null)`来初始化一个新对象呢？这是作者的习惯，还是一个最佳实践？

其实都不是，这并不是作者不经思考随便用的，也不是javascript编程中的最佳实践，而是需要因地制宜，具体问题具体分析。

[我们](https://www.w3cdoc.com)进一步比较一下`Object.create(null)`和`{}`创建控对象的区别：

在chrome打印如下：

![](/images/posts/2022-12-21-20-09-25.png)

从上图可以看到，使用`create`创建的对象，没有任何属性，显示`No properties`，[我们](https://www.w3cdoc.com)可以把它当作一个非常**纯净**的map来使用，[我们](https://www.w3cdoc.com)可以自己定义`hasOwnProperty`、`toString`方法，不管是有意还是不小心，[我们](https://www.w3cdoc.com)完全不必担心会将原型链上的同名方法覆盖掉。举个例子：

```
//Demo1:
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

//Demo2:
var a=Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}

```

另一个使用`create(null)`的理由是，在[我们](https://www.w3cdoc.com)使用`for..in`循环的时候会遍历对象原型链上的属性，使用`create(null)`就不必再对属性进行检查了，当然，[我们](https://www.w3cdoc.com)也可以直接使用`Object.keys[]`。

## 总结：

1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
2. 想节省`hasOwnProperty`带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

用`Object.create(null)`吧！其他时候，请用`{}`。

# Object.create和new区别

创建对象的方式，我以我碰到的两种创建方式，Object.create 和new来说明

```
var Base = function () {}
var o1 = new Base();
var o2 = Object.create(Base);
```

那这样到底有什么不一样呢？ [我们](https://www.w3cdoc.com)改一下看看结果

```
var Base = function () {
    this.a = 2
}
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a);
console.log(o2.a);
var o3 = Object.create(new Base());
console.log(o3.a);
```
结果是： 2 ， undefined， 2

![](/images/posts/2022-12-21-20-09-45.png)

* o1的原型指向的是Object，实例上有属性a。 相当于代码：

```
class BB{ 
  constructor(){ this.a=1; }
}
console.log(new BB())
```

o1和这种class 创建出来的对象没有区别的。

![](/images/posts/2022-12-21-20-09-55.png)

* o3的原型指向了Base这个对象，o1属性上没有a，会查找原型，查到原型上有a

* o2指向的原型是Function，为什么呢？

一种理解是可以把function看成class，就如上面的例子用的BB。[我们](https://www.w3cdoc.com)知道function和class可以看成原生类型Function的对象，因为可以用new Function()来创建函数

```
var sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6));
// expected output: 8
```

每个JavaScript function其实是一个 `Function` 对象.

```
(function(){}).constructor === Function
```

结果是：true


