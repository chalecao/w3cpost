---
title: TypeScript初学了解
weight: 3
---
<div>
  <h2 class="heading" data-id="heading-0">
    为什么JS需要类型检查
  

 TypeScript的设计目标在<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fwiki%2FTypeScript-Design-Goals" target="_blank" rel="nofollow noopener noreferrer">这里</a>可以查看到，简单概括为两点：
  
  <ol>
    
      为JavaScript提供一个可选择的类型检查系统；
    
    
      为JavaScript提供一个包含将来新特性的版本。
    
  </ol>
 TypeScript的核心价值体现在第一点，第二点可以认为是TypeScript的向后兼容性保证，也是TypeScript必须要做到的。
  
 那么为什么JS需要做静态类型检查呢？在几年前这个问题也许还会存在比较大的争议，在[前端](https://www.w3cdoc.com)日趋复杂的今天，经过像Google、Microsoft、FaceBook这样的大公司实践表明，类型检查对于代码可维护性和可读性是有非常大的帮助的，尤其针对于需要长期维护的规模性系统。
  
  <h2 class="heading" data-id="heading-1">
    TypeScript优势
  

 在我看来，TypeScript能够带来最直观上的好处有三点：
  
  <ol>
    
      帮助更好地重构代码；
    
    
      类型声明本身是最好查阅的文档。
    
    
      编辑器的智能提示更加友好。
    
  </ol>
 一个好的代码习惯是时常对自己写过的代码进行小的重构，让代码往更可维护的方向去发展。然而对于已经上线的业务代码，往往测试覆盖率不会很高，当[我们](https://www.w3cdoc.com)想要重构时，经常会担心自己的改动会产生各种不可预知的bug。哪怕是一个小的重命名，也有可能照顾不到所有的调用处造成问题。
  
 如果是一个TypeScript项目，这种担心就会大大降低，[我们](https://www.w3cdoc.com)可以依赖于TypeScript的静态检查特性帮助找出一个小的改动（如重命名）带来的其他模块的问题，甚至对于模块文件来说，[我们](https://www.w3cdoc.com)可以直接借助编辑器的能力进行“一键重命名”操作。
  
 另外一个问题，如果你接手过一个老项目，肯定会头痛于各种文档的缺失和几乎没有注释的代码，一个好的TypeScript项目，是可以做到代码即文档的，通过声明文件[我们](https://www.w3cdoc.com)可以很好地看出各个字段的含义以及哪些是[前端](https://www.w3cdoc.com)必须字段：
  
  ```
// 砍价用户信息
export interface BargainJoinData {
  curr_price: number; // 当前价
  curr_ts: number; // 当前时间
  init_ts: number; // 创建时间
  is_bottom_price: number; // 砍到底价
}
复制代码
```
  <h2 class="heading" data-id="heading-2">
    TypeScript对开发者是友好的
  

 TypeScript在设计之初，就确定了他们的目标并不是要做多么严格完备的类型强校验系统，而是能够更好地兼容JS，更贴合JS开发者的开发习惯。可以说这是MS的商业战略，也是TS能够成功的关键性因素之一。它对JS的兼容性主要表现为以下三个方面：
  
  <h3 class="heading" data-id="heading-3">
    隐式的类型推断
  </h3>
  ```
var foo = 123;
foo = "456"; // Error: cannot assign `string` to `number`
复制代码
```
 当[我们](https://www.w3cdoc.com)对一个变量或函数等进行赋值时，TypeScript能够自动推断类型赋予变量，TypeScript背后有非常强大的自推断算法帮助识别类型，这个特性无疑可以帮助[我们](https://www.w3cdoc.com)简化一些声明，不必像强类型的语言那样处处是声明，也可以让[我们](https://www.w3cdoc.com)看代码时更加轻松。
  
  <h3 class="heading" data-id="heading-4">
    结构化的类型
  </h3>
 TypeScript旨在让JS开发者更简单地上手，因此将类型设计为“结构化”(Structural)的而非“名义式”(Nominal)的。
  
 什么意思呢？意味着TypeScript的类型并不根据定义的名字绑定，只要是形似的类型，不管名称相不相同，都可以作为兼容类型（这很像所谓的duck typing），也就是说，下面的代码在TypeScript中是完全合法的：
  
  ```
class Foo { method(input: string) { /*...*/ } }
class Bar { method(input: string) { /*...*/ } }
let test: Foo = new Bar(); // no Error!
复制代码
```
 这样实际上可以做到类型的最大化复用，只要形似，对于开发者也是最好理解的。（当然对于这个示例最好的做法是抽出一个公共的interface）
  
  <h3 class="heading" data-id="heading-5">
    知名的JS库支持
  </h3>
 TypeScript有强大的<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped" target="_blank" rel="nofollow noopener noreferrer">DefinitelyTyped</a>社区支持，目前类型声明文件基本上已经覆盖了90%以上的常用JS库，在编写代码时[我们](https://www.w3cdoc.com)的提示是非常友好的，也能做到安全的类型检查。（在使用第三方库时，可以现在这个项目中检索一下有没有该库的TS声明，直接引入即可）
  
  <h2 class="heading" data-id="heading-6">
    回顾两个基础知识
  

 在进入正式的TS类型介绍之前，让[我们](https://www.w3cdoc.com)先回顾一下JS的两个基础：
  
  <h3 class="heading" data-id="heading-7">
    相等性判断
  </h3>
 [我们](https://www.w3cdoc.com)都知道，在JS里，两个等号的判断会进行隐式的类型转换，如：
  
  ```
console.log(5 == "5"); // true 
console.log(0 == ""); // true
复制代码
```
 在TS中，因为有了类型声明，因此这两个结果在TS的类型系统中恒为false，因此会有报错：
  
  ```
This condition will always return 'false' since the types '5' and '"5"' have no overlap.
复制代码
```
 所以在代码层面，一方面[我们](https://www.w3cdoc.com)要避免这样两个不同类型的比较，另一方面使用全等来代替两个等号，保证在编译期和运行期具有相同的语义。
  
 对于TypeScript而言，只有null和undefined的隐式转换是合理的：
  
  ```
console.log(undefined == undefined); // true
console.log(null == undefined); // true
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
复制代码
```
  <h3 class="heading" data-id="heading-8">
    类（Class）
  </h3>
 对于ES6的Class，[我们](https://www.w3cdoc.com)本身已经很熟悉了，值得一提的是，目前对于类的静态属性、成员属性等有一个提案——<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-class-fields" target="_blank" rel="nofollow noopener noreferrer">proposal-class-fields</a>已经进入了Stage3，这个提案包含了很多东西，主要是类的静态属性、成员属性、公有属性和私有属性。其中，私有属性的提案在社区内引起了非常大的争议，由于它的丑陋和怪异遭受各路人马的抨击，现TC39委员会已决定重新思考该提案。
  
 现在让[我们](https://www.w3cdoc.com)来看看TypeScript对属性访问控制的情况：
  
  <table>
    <tr>
      <th>
        可访问性
      </th>

      <th>
        public
      </th>
      
      <th>
        protected
      </th>
      
      <th>
        private
      </th>
    </tr>
    
    <tr>
      <td>
        类本身
      </td>
      
      <td>
        是
      </td>
      
      <td>
        是
      </td>
      
      <td>
        是
      </td>
    </tr>
    
    <tr>
      <td>
        子类
      </td>
      
      <td>
        是
      </td>
      
      <td>
        是
      </td>
      
      <td>
        否
      </td>
    </tr>
    
    <tr>
      <td>
        类的实例
      </td>
      
      <td>
        是
      </td>
      
      <td>
        否
      </td>
      
      <td>
        否
      </td>
    </tr>
  </table>
 可以看到，TS中的类成员访问和其他语言非常类似：
  
  ```
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}
复制代码
```
 对于类的成员构造函数初始化，TS提供了一个简单的声明方式：
  
  ```
class Foo {
    constructor(public x:number) {
    }
}
复制代码
```
 这段代码和下面是等同的：
  
  ```
class Foo {
    x: number;
    constructor(x:number) {
        this.x = x;
    }
}
复制代码
```
  <h2 class="heading" data-id="heading-9">
    TS类型系统基础
  

  <h3 class="heading" data-id="heading-10">
    基本性准则
  </h3>
 在正式了解TypeScript之前，首先要明确两个基本概念：
  
  <ol>
    
      TypeScript的类型系统设计是可选的，意味着JavaScript就是TypeScript。
    
    
      TypeScript的报错并不会阻止JS代码的生成，你可以渐进式地将JS逐步迁移为TS。
    
  </ol>
  <h3 class="heading" data-id="heading-11">
    基本语法
  </h3>
  ```
:<TypeAnnotation>
复制代码
```
 TypeScript的基本类型语法是在变量之后使用冒号进行类型标识，这种语法也揭示了TypeScript的类型声明实际上是可选的。
  
  <h3 class="heading" data-id="heading-12">
    原始值类型
  </h3>
  ```
var num: number;
var str: string;
var bool: boolean;
复制代码
```
 TypeScript支持三种原始值类型的声明，分别是number、string和boolean。
  
 对于这三种原始值，TS同样支持以它们的字面量为类型：
  
  ```
var num: 123;
var str: '123';
var bool: true;
复制代码
```
 这类字面量类型配合上联合类型还是十分有用的，[我们](https://www.w3cdoc.com)后面再讲。
  
  <h3 class="heading" data-id="heading-13">
    数组类型
  </h3>
 对于数组的声明也非常简单，只需要加上一个中括号声明类型即可：
  
  ```
var boolArray: boolean[];
复制代码
```
 以上就简单地定义了一个布尔类型的数组，大多数情况下，[我们](https://www.w3cdoc.com)数组的元素类型是固定的，如果[我们](https://www.w3cdoc.com)数组内存在不同类型的元素怎么办？
  
 如果元素的个数是已知有限的，可以使用TS的元组类型：
  
  ```
var nameNumber: [string, number];
复制代码
```
 该声明也非常的形象直观，如果元素个数不固定且类型未知，这种情况较为罕见，可直接声明成any类型：
  
  ```
var arr: any[]
复制代码
```
  <h3 class="heading" data-id="heading-14">
    接口类型
  </h3>
 接口类型是TypeScript中最常见的组合类型，它能够将不同类型的字段组合在一起形成一个新的类型，这对于JS中的对象声明是十分友好的：
  
  ```
interface Name {
    first: string;
    second: string;
}

var personName:Name = {
    first: '张三'
} // Property 'second' is missing in type '{ first: string; }' but required in type 'Name'
复制代码
```
 上述例子可见，TypeScript对每一个字段都做了检查，若未定义接口声明的字段（非可选），则检查会抛出错误。
  
  <h4 class="heading" data-id="heading-15">
    内联接口
  </h4>
 对于对象来说，[我们](https://www.w3cdoc.com)也可以使用内联接口来快速声明类型：
  
  ```
var personName:{ first: string, second: string } = {
    first: '张三'
} // Property 'second' is missing in type '{ first: string; }' but required in type 'Name'
复制代码
```
 内联接口可以帮助[我们](https://www.w3cdoc.com)快速声明类型，但建议谨慎使用，对于可复用以及一般性的接口声明建议使用interface声明。
  
  <h4 class="heading" data-id="heading-16">
    索引类型
  </h4>
 对于对象而言，[我们](https://www.w3cdoc.com)可以使用中括号的方式去存取值，对TS而言，同样支持相应的索引类型：
  
  ```
interface Foo {
  [key:string]: number
}
复制代码
```
 对于索引的key类型，TypeScript只支持number和string两种类型，且Number是string的一种特殊情况。
  
 对于索引类型，[我们](https://www.w3cdoc.com)在一般化的使用场景上更方便：
  
  ```
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  }
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}
复制代码
```
  <h4 class="heading" data-id="heading-17">
    类的接口
  </h4>
 对于接口而言，另一个重要作用就是类可以实现接口：
  
  ```
interface Point {
    x: number; y: number;
    z: number; // New member
}

class MyPoint implements Point { // ERROR : missing member `z`
    x: number; y: number;
}
复制代码
```
 对类而言，实现接口，意味着需要实现接口的所有属性和方法，这和其他语言是类似的。
  
  <h3 class="heading" data-id="heading-18">
    函数类型
  </h3>
 函数是TypeScript中最常见的组成单元：
  
  ```
interface Foo {
    foo: string;
}

// Return type annotated as `: Foo`
function foo(sample: Foo): Foo {
    return sample;
}
复制代码
```
 对于函数而言，本身有参数类型和返回值类型，都可进行声明。
  
  <h4 class="heading" data-id="heading-19">
    可选参数
  </h4>
 对于参数，[我们](https://www.w3cdoc.com)可以声明可选参数，即在声明之后加一个问号：
  
  ```
function foo(bar: number, bas?: string): void {
    // ..
}
复制代码
```
  <h4 class="heading" data-id="heading-20">
    void和never类型
  </h4>
 另外，上述例子也表明，当函数没有返回值时，可以用void来表示。
  
 当一个函数永远不会返回时，[我们](https://www.w3cdoc.com)可以声明返回值类型为never：
  
  ```
function bar(): never {
    throw new Error('never reach');
}
复制代码
```
  <h4 class="heading" data-id="heading-21">
    callable和newable
  </h4>
 [我们](https://www.w3cdoc.com)还可以使用接口来定义函数，在这种函数实现接口的情形下，[我们](https://www.w3cdoc.com)称这种定义为callable:
  
  ```
interface Complex {
  (bar?: number, ...others: boolean[]): number;
}

var foo: Complex;
复制代码
```
 这种定义方式在可复用的函数声明中非常有用。
  
 callable还有一种特殊的情况，该声明中指定了new的方法名，称之为newable：
  
  ```
interface CallMeWithNewToGetString {
  new(): string
}

var foo: CallMeWithNewToGetString;

new foo();
复制代码
```
 这个在构造函数的声明时非常有用。
  
  <h4 class="heading" data-id="heading-22">
    函数重载
  </h4>
 最后，一个函数可以支持多种传参形式，这时候仅仅使用可选参数的约束可能是不够的，如：
  
  ```
unction padding(a: number, b?: number, c?: number, d?: number) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
复制代码
```
 这个函数可以支持四个参数、两个参数和一个参数，如果[我们](https://www.w3cdoc.com)粗略的将后三个参数都设置为可选参数，那么当传入三个参数时，TS也会认为它是合法的，此时就失去了类型安全，更好的方式是声明函数重载：
  
  ```
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
   //...
}
复制代码
```
 函数重载写法也非常简单，就是重复声明不同参数的函数类型，最后一个声明包含了兼容所有重载声明的实现。这样，TS类型系统就能准确的判断出该函数的多态性质了。
  
 使用callable的方式也可以声明重载：
  
  ```
interface Padding {
  (all: number): any
  (topAndBottom: number, leftAndRight: number): any
  (top: number, right: number, bottom: number, left: number): any
}
复制代码
```
  <h3 class="heading" data-id="heading-23">
    特殊类型
  </h3>
  <h4 class="heading" data-id="heading-24">
    any
  </h4>
 any在TypeScript中是一个比较特殊的类型，声明为any类型的变量就像动态语言一样不受约束，好像关闭了TS的类型检查一般。对于any类型的变量，可以将其赋予任何类型的值：
  
  ```
var power: any;

power = '123';
power = 123;
复制代码
```
 any对于JS代码的迁移是十分友好的，在已经成型的TypeScript项目中，[我们](https://www.w3cdoc.com)要慎用any类型，当你设置为any时，意味着告诉编辑器不要对它进行任何检查。
  
  <h4 class="heading" data-id="heading-25">
    null和undefined
  </h4>
 null和undefined作为TypeScript的特殊类型，它同样有字面量的含义，之前[我们](https://www.w3cdoc.com)已经了解到。
  
 值得注意的是，null和undefined可以赋值给任意类型的变量：
  
  ```
var num: number;
var str: string;

// 赋值给任意类型的变量都是合法的
num = null;
str = undefined;
复制代码
```
  <h4 class="heading" data-id="heading-26">
    void和never
  </h4>
 在函数类型中，[我们](https://www.w3cdoc.com)已经介绍了两种类型，专门修饰函数返回值。
  
  <h4 class="heading" data-id="heading-27">
    readonly
  </h4>
 readonly是只读属性的修饰符，当[我们](https://www.w3cdoc.com)的属性是只读时，可以用该修饰符加以约束，在类中，用readonly修饰的属性仅可以在构造函数中初始化：
  
  ```
class Foo {
    readonly bar = 1; // OK
    readonly baz: string;
    constructor() {
        this.baz = "hello"; // OK
    }
}
复制代码
```
 一个实用场景是在react中，props和state都是只读的：
  
  ```
interface Props {
    readonly foo: number;
}
interface State {
    readonly bar: number;
}
export class Something extends React.Component<Props,State> {
  someMethod() {
    this.props.foo = 123; // ERROR: (props are immutable)
    this.state.baz = 456; // ERROR: (one should use this.setState)  
  }
}
复制代码
```
 当然，React本身在类的声明时会对传入的props和state做一层ReadOnly的包裹，因此无论[我们](https://www.w3cdoc.com)是否在外面显式声明，赋值给props和state的行为都是会报错的。
  
 注意，readonly听起来和const有点像，需要时刻保持一个概念：
  
  <ul>
    
      readonly是修饰属性的
    
    
      const是声明变量的
    
  
  <h3 class="heading" data-id="heading-28">
    泛型
  </h3>
 在更加一般化的场景，[我们](https://www.w3cdoc.com)的类型可能并不固定已知，它和any有点像，只不过[我们](https://www.w3cdoc.com)希望在any的基础上能够有更近一步的约束，比如：
  
  ```
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}
复制代码
```
 reverse函数是一个很好的示例，对于一个通用的函数reverse来说，数组元素的类型是未知的，可以是任意类型，但reverse函数的返回值也是个数组，它和传入的数组类型是相同的，对于这个约束，[我们](https://www.w3cdoc.com)可以使用泛型，其语法是尖括号，内置泛型变量，多个泛型变量用逗号隔开，泛型变量名称没有限制，一般而言[我们](https://www.w3cdoc.com)以大写字母开头，多个泛型变量使用其语义命名，加上T为前缀。
  
 在调用时，可以显示的指定泛型类型：
  
  ```
var reversed = reverse<number>([1, 2, 3]);
复制代码
```
 也可以利用TypeScript的类型推断，进行隐式调用：
  
  ```
var reversed = reverse([1, 2, 3]);
复制代码
```
 由于[我们](https://www.w3cdoc.com)的参数类型是T[]，而传入的数组类型是一个number[]，此时T的类型被TypeScript自动推断为number。
  
 对于泛型而言，[我们](https://www.w3cdoc.com)同样可以作用于接口和类：
  
  ```
interface Array<T> {
 reverse(): T[];
 // ...
}
复制代码
```
  <h3 class="heading" data-id="heading-29">
    联合类型
  </h3>
 在JS中，一个变量的类型可能拥有多个，比如：
  
  ```
function formatCommandline(command: string[]|string) {
    var line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }
}
复制代码
```
 此时[我们](https://www.w3cdoc.com)可以使用一个|分割符来分割多种类型，对于这种复合类型，[我们](https://www.w3cdoc.com)称之为联合类型。
  
  <h3 class="heading" data-id="heading-30">
    交叉类型
  </h3>
 如果说联合类型的语义等同于或者，那么交叉类型的语义等同于集合中的并集，下面的extend函数是最好的说明：
  
  ```
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U> {};
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
复制代码
```
 该函数最终以T&U作为返回值值，该类型既包含了T的字段，也包含了U的字段，可以看做是两个类型的并集。
  
  <h3 class="heading" data-id="heading-31">
    类型别名
  </h3>
 TypeScript为类型的复用提供了更便捷的方式——类型别名。当你想复用类型时，可能在该场景下要为已经声明的类型换一个名字，此时可以使用type关键字来进行类型别名的定义：
  
  ```
interface state {
  a: 1
}

export type userState = state;
复制代码
```
 [我们](https://www.w3cdoc.com)同样可以使用type来声明一个类型：
  
  ```
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
复制代码
```
 对于type和interface的取舍：
  
  <ul>
    
      如果要用交叉类型或联合类型，使用type。
    
    
      如果要用extend或implement，使用interface。
    
    
      其余情况可看个人喜好，个人建议type更多应当用于需要起别名时，其他情况尽量使用interface。
    
  
  <h3 class="heading" data-id="heading-32">
    枚举类型
  </h3>
 对于组织一系列相关值的集合，最好的方式应当是枚举，比如一系列状态集合，一系列归类集合等等。
  
 在TypeScript中，枚举的方式非常简单：
  
  ```
enum Color {
    Red,
    Green,
    Blue
}
var col = Color.Red;
复制代码
```
 默认的枚举值是从0开始，如上述代码，Red=0，Green=1依次类推。
  
 当然[我们](https://www.w3cdoc.com)还可以指定初始值：
  
  ```
enum Color {
    Red = 3,
    Green,
    Blue
}
复制代码
```
 此时Red=3, Green=4依次类推。
  
 [大家](https://www.w3cdoc.com)知道在JavaScript中是不存在枚举类型的，那么TypeScript的枚举最终转换为JavaScript是什么样呢？
  
  ```
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
复制代码
```
 从编译后的代码可以看到，转换为一个key-value的对象后，[我们](https://www.w3cdoc.com)的访问也非常方便：
  
  ```
var red = Color.Red; // 0
var redKey = Color[0]; // 'Red'
var redKey = Color[Color.Red]; // 'Red'
复制代码
```
 既可以通过key来访问到值，也可以通过值来访问到key。
  
  <h4 class="heading" data-id="heading-33">
    Flag标识位
  </h4>
 对于枚举，有一种很实用的设计模式是使用位运算来标识(Flag)状态：
  
  ```
enum EnvFlags {
  None = 0,
  QQ = 1 << 0,
  Weixin = 1 << 1
}

function initShare(flags: EnvFlags) {
  if (flags & EnvFlags.QQ) {
    initQQShare();
  }
  if (flags & EnvFlags.Weixin) {
    initWeixinShare();
  }
}
复制代码
```
 在[我们](https://www.w3cdoc.com)使用标识位时，可以遵循以下规则：
  
  <ul>
    
      使用 |= 增加标志位
    
    
      使用 &= 和 ~清除标志位
    
    
      使用 | 联合标识位
    
  
 如：
  
  ```
var flag = EnvFlags.None;
flag |= EnvFlags.QQ;    // 加入QQ标识位
Flag &= ~EnvFlags.QQ;   // 清除QQ标识位
Flag |=  EnvFlags.QQ | EnvFlags.Weixin; // 加入QQ和微信标识位
复制代码
```
  <h4 class="heading" data-id="heading-34">
    常量枚举
  </h4>
 在枚举定义加上const声明，即可定义一个常量枚举：
  
  ```
enum Color {
    Red = 3,
    Green,
    Blue
}
复制代码
```
 对于常量枚举，TypeScript在编译后不会产生任何运行时代码，因此在一般情况下，应当优先使用常量枚举，减少不必要代码的产生。
  
  <h4 class="heading" data-id="heading-35">
    字符串枚举
  </h4>
 TypeScript还支持非数字类型的枚举——字符串枚举
  
  ```
export enum EvidenceTypeEnum {
  UNKNOWN = '',
  PASSPORT_VISA = 'passport_visa',
  PASSPORT = 'passport',
  SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
  SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
  SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
复制代码
```
 这类枚举和[我们](https://www.w3cdoc.com)之前使用JavaScript定义常量集合的方式很像，好处在于调试或日志输出时，字符串比数字要包含更多的语义。
  
  <h3 class="heading" data-id="heading-36">
    命名空间
  </h3>
 在没有模块化的时代，[我们](https://www.w3cdoc.com)为了防止全局的命名冲突，经常会以命名空间的形式组织代码：
  
  ```
(function(something) {

    something.foo = 123;

})(something || (something = {}))
复制代码
```
 TypeScript内置了namespace变量帮助定义命名空间：
  
  ```
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}
复制代码
```
 对于[我们](https://www.w3cdoc.com)自己的工程项目而言，一般建议使用ES6模块的方式去组织代码，而命名空间的模式可适用于对一些全局库的声明，如jQuery：
  
  ```
namespace $ {
  export function ajax(//...) {}
}
复制代码
```
 当然，命名空间还可以便捷地帮助[我们](https://www.w3cdoc.com)声明静态方法，如和enum的结合使用：
  
  ```
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false;
            default:
                return true;
        }
    }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
复制代码
```
  <h2 class="heading" data-id="heading-37">
    关于命名规范
  

  <h3 class="heading" data-id="heading-38">
    变量名、函数和文件名
  </h3>
  <ul>
    
      推荐使用驼峰命名。
    
  
  ```
// Bad
var FooVar;
function BarFunc() { }

// Good
var fooVar;
function barFunc() { }
复制代码
```
  <h3 class="heading" data-id="heading-39">
    类、命名空间
  </h3>
  <ul>
    
      推荐使用帕斯卡命名。
    
    
      成员变量和方法推荐使用驼峰命名。
    
  
  ```
// Bad
class foo { }

// Good
class Foo { }

// Bad
class Foo {
    Bar: number;
    Baz() { }
}

// Good
class Foo {
    bar: number;
    baz() { }
}
复制代码
```
  <h3 class="heading" data-id="heading-40">
    Interface、type
  </h3>
  <ul>
    
      推荐使用帕斯卡命名。
    
    
      成员字段推荐使用驼峰命名。
    
  
  ```
// Bad
interface foo { }

// Good
interface Foo { }

// Bad
interface Foo {
    Bar: number;
}

// Good
interface Foo {
    bar: number;
}
复制代码
```
  <h2 class="heading" data-id="heading-41">
    关于模块规范
  

  <h3 class="heading" data-id="heading-42">
    export default的争论
  </h3>
 关于是否应该使用export default在<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript%2Fissues%2F1365" target="_blank" rel="nofollow noopener noreferrer">这里</a>有详尽的讨论，在AirBnb规范中也有prefer-default-export这条规则，但我认为在TypeScript中应当尽量不使用export default：
  
 关于链接中提到的重命名问题, 甚至自动import，其实export default也是可以做到的，借助编辑器和TypeScript的静态能力。所以这一点还不是关键因素。
  
 不过使用一般化的export更让[我们](https://www.w3cdoc.com)容易获得智能提示：
  
  ```
import /*here*/ from 'something';
复制代码
```
 在这种情况下，一般编辑器是不会给出智能提示的。 而这种：
  
  ```
import { /*here*/ } from 'something';
复制代码
```
 [我们](https://www.w3cdoc.com)可以通过智能提示做到快速引入。
  
 除了这一点外，还有以下几点好处：
  
  <ul>
    
      对CommonJS是友好的，如果使用export default，在commonJS下需要这样引入：
    
  
  ```
const {default} = require('module/foo');
复制代码
```
 多了个default无疑感觉非常奇怪。
  
  <ul>
    
      对动态import是友好的，如果使用export default，还需要显示的通过default字段来访问：
    
  
  ```
const HighChart = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
Highcharts.default.chart('container', { ... }); // 注意 `.default`
复制代码
```
  <ul>
    
      对于re-exporting是友好的，如果使用export default，那么进行re-export会比较麻烦：
    
  
  ```
import Foo from "./foo"; export { Foo }
复制代码
```
 相比之下，如果没有export default，[我们](https://www.w3cdoc.com)可以直接使用:
  
  ```
export * from "./foo"
复制代码
```
</div>

<div>
  <div>
    <h1 class="heading" data-id="heading-0">
      原始数据类型
    </h1>

    
      JavaScript 的类型分为两种：原始数据类型和对象类型。
    
    
    
      原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol
    
    
    
      本节主要介绍前五种原始数据类型在 TypeScript 中的应用。
    
    
    
      布尔值是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型：
    
    
    
      以下都编译通过的,并且给出了说明,一句话总结,是什么类型就要赋值给什么类型,这句话够俗了吧
    
    
    <h2 class="heading" data-id="heading-1">
      正确的写法
    

    
    ```
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;布尔&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 布尔值
let isDone: boolean = false;  

// 事实上 `new Boolean()` 返回的是一个 `Boolean` 对象
let createdByNewBoolean: Boolean = new Boolean(1);

//(直接调用 `Boolean` 也可以返回一个 `boolean` 类型)
let createdByBoolean: boolean = Boolean(1);

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;数值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;

// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;字符串&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
let myName: string = 'Tom';
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;空值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 没有返回值的函数为void
function alertName(): void {
    alert('My name is Tom');
}

//声明一个 void 类型的只能将它赋值为 undefined 和 null
let unusable: void = undefined;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;Null 和 Undefined&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
let u: undefined = undefined;
let n: null = null;
复制代码
```

    <h2 class="heading" data-id="heading-2">
      错误的写法
    

    
    
     注意:正确的很好记,大多数人都会写正确的,关键是要记住这些错误的!!!
    
    
    ```
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;布尔&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 注意，使用构造函数 `Boolean` 创造的对象不是布尔值
let createdByNewBoolean: boolean = new Boolean(1);&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;数值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
let decLiteral: number = "6";&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;字符串&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
let myName: string = 999;&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;空值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 没有返回值的函数为void
function alertName(): void {&#x274c;
   return 666;
}
//声明一个 void 类型的只能将它赋值为 undefined 和 null
let unusable: void = 'I love you';&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;Null 和 Undefined&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
let u: undefined = 888;&#x274c;
let n: null = 999;&#x274c;
复制代码
```

    <h1 class="heading" data-id="heading-3">
      任意值
    </h1>
    
    <h2 class="heading" data-id="heading-4">
      正确的写法
    

    
    ```
// 顾名思义,可以被任何值赋值
let anyThing: any = 'hello';
let anyThing: any = 888;
let anyThing: any = true;
let anyThing: any = null;
let anyThing: any = undefined;

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let any;
any =true;
复制代码
```

    <h2 class="heading" data-id="heading-5">
      错误的写法
    

    
    
      没有错误的写法~
    
    
    <h1 class="heading" data-id="heading-6">
      类型推论
    </h1>
    
    <h2 class="heading" data-id="heading-7">
      正确的写法
    

    
    ```
// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
let myFavoriteNumber = 'seven';  等价于  let myFavoriteNumber :string= 'seven';
复制代码
```

    <h2 class="heading" data-id="heading-8">
      错误的写法
    

    
    ```
// 第一句已经被推论为String类型了
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;&#x274c;
复制代码
```

    <h1 class="heading" data-id="heading-9">
      联合类型
    </h1>
    
    <h2 class="heading" data-id="heading-10">
      正确的写法
    

    
    ```
// 联合类型（Union Types）表示取值可以为多种类型中的一种。
// 当你允许某个变量被赋值多种类型的时候,使用联合类型,管道符进行连接
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// 也可用于方法的参数定义, 都有toString方法,访问 string 和 number 的共有属性是没问题的
function getString(something: string | number): string {
    return something.toString();
}
复制代码
```

    <h2 class="heading" data-id="heading-11">
      错误的写法
    

    
    ```
// number类型没有length属性.所以编译错误,因为[我们](https://www.w3cdoc.com)只能访问此联合类型的所有类型里共有的属性或方法：
function getLength(something: string | number): number {&#x274c;
    return something.length;
}
复制代码
```

    <h1 class="heading" data-id="heading-12">
      对象的类型——接口
    </h1>
    
    <h2 class="heading" data-id="heading-13">
      正确的写法
    

    
    ```
// 赋值的时候，变量的形状必须和接口的形状保持一致(不能多也不能少,类型还必须一致)
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};

IUserInfo{
  age : any;//定义一个任何变量的 age.
  userName :string;//定义一个 username.
}
function getUserInfo(user : IUserInfo):string{
    return user.age+"======"+user.userName;  
}
  &#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;可选属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;

interface Person {
    name: string;
    age?: number; // 表示这个属性可有可无
}

let tom: Person = {
    name: 'Tom'
};
  &#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;任意属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;

//希望一个接口允许有任意的属性，可以使用如下方式：旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male' // 可以加其他的属性
};

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;只读属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface Person {
    readonly id: number; // 
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757, // 只读
    name: 'Tom',
    gender: 'male'
};
复制代码
```

    <h2 class="heading" data-id="heading-14">
      错误的写法
    

    
    ```
// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'&#x274c;
};
上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;只读属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757; // 不能被二次赋值&#x274c;
复制代码
```

    <h1 class="heading" data-id="heading-15">
      数组的类型
    </h1>
    
    <h2 class="heading" data-id="heading-16">
      正确的做法
    

    
    ```
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;用接口表示数组&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;any 在数组中的应用&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;类数组&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
function sum() {
    let args: IArguments = arguments;
}

复制代码
```

    <h2 class="heading" data-id="heading-17">
      错误的做法
    

    
    ```
// 数组的项中不允许出现其他的类型：
let fibonacci: number[] = [1, '1', 2, 3, 5];&#x274c;

// push 方法只允许传入 number 类型的参数，但是却传了一个 string 类型的参数，所以报错了。
let fibonacci: number[] = [1, 1, 2, 3, 5];
fibonacci.push('8');&#x274c;

// 类数组（Array-like Object）不是数组类型，比如 arguments
function sum() {&#x274c;
    let args: number[] = arguments;
}
复制代码
```

    <h1 class="heading" data-id="heading-18">
      函数的类型
    </h1>
    
    <h2 class="heading" data-id="heading-19">
      正确的做法
    

    
    ```
// 需要把输入和输出都考虑到
function sum(x: number, y: number): number {
    return x + y;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;函数表达式&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
let mySum = function (x: number, y: number): number {
    return x + y;
};
// 不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;接口定义函数的形状&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source, subString) {
    return source.search(subString) !== -1;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;可选参数&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;参数默认值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;剩余参数&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// rest 参数只能是最后一个参数，关于 rest 参数,是一个数组
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);

复制代码
```

    <h2 class="heading" data-id="heading-20">
      错误的做法
    

    
    ```
// 输入多余的（或者少于要求的）参数，是不被允许的：
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3); &#x274c;
sum(1);&#x274c;

// 输入多余的（或者少于要求的）参数，是不被允许的：
function sum(x: number, y: number): number {
    return x + y;
}
sum(1, 2, 3);

// 可选参数后面不允许再出现必须参数了：
function buildName(firstName?: string, lastName: string) {&#x274c;
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');
复制代码
```

    <h1 class="heading" data-id="heading-21">
      断言
    </h1>
    
    <h2 class="heading" data-id="heading-22">
      正确的做法
    

    
    ```
// 可以使用类型断言，将 something 断言成 string
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
复制代码
```

    <h2 class="heading" data-id="heading-23">
      错误的做法
    

    
    ```
// 只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number): number { &#x274c;
    return something.length;
}
复制代码
```

    <h1 class="heading" data-id="heading-24">
      类型别名
    </h1>
    
    <h2 class="heading" data-id="heading-25">
      正确的做法
    

    
    ```
// 使用 type 创建类型别名,类型别名常用于联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
复制代码
```

    <h1 class="heading" data-id="heading-26">
      枚举
    </h1>
    
    <h2 class="heading" data-id="heading-27">
      正确的做法
    

    
    ```
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天 
// 枚举就是枚举值到枚举名进行反向映射

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"]); // 0
console.log(Days[0]); // 'Sun'

enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"]); // 7

复制代码
```

    <h1 class="heading" data-id="heading-28">
      类
    </h1>
    
    <h2 class="heading" data-id="heading-29">
      正确的做法
    

    
    ```
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;类&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;继承&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;存储器&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
        this.name = value;
    }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;静态方法&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
// 只能通过类名调用
a.isAnimal(a); // TypeError: a.isAnimal is not a function &#x274c;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;抽象类&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
abstract class Animal {
  abstract makeSound():void
  move():void {
    console.log('roaming the earch...')
  }
}
// 子类必须实现抽象类的抽象方法
复制代码
```

    <h2 class="heading" data-id="heading-30">
      public private 和 protected
    

    
    
      public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
    
    
    
      private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
    
    
    
      protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
    
    
    <h2 class="heading" data-id="heading-31">
      泛型
    

    
    
      泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持
    
    
    <h2 class="heading" data-id="heading-32">
      正确的做法
    

    
    ```
//只能返回string类型的数据
function getData(value:string):string{
  return value;
}

//同时返回 string类型 和number类型  （代码冗余）
function getData1(value:string):string{
  return value;
}
function getData2(value:number):number{
  return value;
}

>>>>>>>>>>使用泛型后就可以解决这个问题
// T表示泛型，具体什么类型是调用这个方法的时候决定的
// 表示参数是什么类型就返回什么类型~~~
function getData<T>(value:T):T{
  return value;
}
getData<number>(123);
getData<string>('1214231');

// 定义接口
interface ConfigFn{
    <T>(value:T):T;
}
var getData:ConfigFn=function<T>(value:T):T{
  return value;
}
getData<string>('张三');
getData<string>(1243);  //错误

```
  </div>
</div>

#

参考  
https://juejin.im/post/5d53a8895188257fad671cbc

https://juejin.im/post/5c0a11e3e51d456ff54c09aa
