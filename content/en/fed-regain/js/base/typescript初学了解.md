---
title: TypeScript初学了解


date: 2019-08-29T10:55:48+00:00
url: /javascriptnodejs/4988.html
views:
  - 969
like:
  - 2


---
<div>
  <h2 class="heading" data-id="heading-0">
    为什么JS需要类型检查
  </h2>
  
  <p>
    TypeScript的设计目标在<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FMicrosoft%2FTypeScript%2Fwiki%2FTypeScript-Design-Goals" target="_blank" rel="nofollow noopener noreferrer">这里</a>可以查看到，简单概括为两点：
  </p>
  
  <ol>
    <li>
      为JavaScript提供一个可选择的类型检查系统；
    </li>
    <li>
      为JavaScript提供一个包含将来新特性的版本。
    </li>
  </ol>
  
  <p>
    TypeScript的核心价值体现在第一点，第二点可以认为是TypeScript的向后兼容性保证，也是TypeScript必须要做到的。
  </p>
  
  <p>
    那么为什么JS需要做静态类型检查呢？在几年前这个问题也许还会存在比较大的争议，在前端日趋复杂的今天，经过像Google、Microsoft、FaceBook这样的大公司实践表明，类型检查对于代码可维护性和可读性是有非常大的帮助的，尤其针对于需要长期维护的规模性系统。
  </p>
  
  <h2 class="heading" data-id="heading-1">
    TypeScript优势
  </h2>
  
  <p>
    在我看来，TypeScript能够带来最直观上的好处有三点：
  </p>
  
  <ol>
    <li>
      帮助更好地重构代码；
    </li>
    <li>
      类型声明本身是最好查阅的文档。
    </li>
    <li>
      编辑器的智能提示更加友好。
    </li>
  </ol>
  
  <p>
    一个好的代码习惯是时常对自己写过的代码进行小的重构，让代码往更可维护的方向去发展。然而对于已经上线的业务代码，往往测试覆盖率不会很高，当我们想要重构时，经常会担心自己的改动会产生各种不可预知的bug。哪怕是一个小的重命名，也有可能照顾不到所有的调用处造成问题。
  </p>
  
  <p>
    如果是一个TypeScript项目，这种担心就会大大降低，我们可以依赖于TypeScript的静态检查特性帮助找出一个小的改动（如重命名）带来的其他模块的问题，甚至对于模块文件来说，我们可以直接借助编辑器的能力进行<code>“一键重命名”</code>操作。
  </p>
  
  <p>
    另外一个问题，如果你接手过一个老项目，肯定会头痛于各种文档的缺失和几乎没有注释的代码，一个好的TypeScript项目，是可以做到代码即文档的，通过声明文件我们可以很好地看出各个字段的含义以及哪些是前端必须字段：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-comment">// 砍价用户信息&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">interface&lt;/span> BargainJoinData {
  curr_price: &lt;span class="hljs-built_in">number&lt;/span>; &lt;span class="hljs-comment">// 当前价&lt;/span>
  curr_ts: &lt;span class="hljs-built_in">number&lt;/span>; &lt;span class="hljs-comment">// 当前时间&lt;/span>
  init_ts: &lt;span class="hljs-built_in">number&lt;/span>; &lt;span class="hljs-comment">// 创建时间&lt;/span>
  is_bottom_price: &lt;span class="hljs-built_in">number&lt;/span>; &lt;span class="hljs-comment">// 砍到底价&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h2 class="heading" data-id="heading-2">
    TypeScript对开发者是友好的
  </h2>
  
  <p>
    TypeScript在设计之初，就确定了他们的目标并不是要做多么严格完备的类型强校验系统，而是能够更好地兼容JS，更贴合JS开发者的开发习惯。可以说这是MS的商业战略，也是TS能够成功的关键性因素之一。它对JS的兼容性主要表现为以下三个方面：
  </p>
  
  <h3 class="heading" data-id="heading-3">
    隐式的类型推断
  </h3>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> foo = &lt;span class="hljs-number">123&lt;/span>;
foo = &lt;span class="hljs-string">"456"&lt;/span>; &lt;span class="hljs-comment">// Error: cannot assign `string` to `number`&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    当我们对一个变量或函数等进行赋值时，TypeScript能够自动推断类型赋予变量，TypeScript背后有非常强大的自推断算法帮助识别类型，这个特性无疑可以帮助我们简化一些声明，不必像强类型的语言那样处处是声明，也可以让我们看代码时更加轻松。
  </p>
  
  <h3 class="heading" data-id="heading-4">
    结构化的类型
  </h3>
  
  <p>
    TypeScript旨在让JS开发者更简单地上手，因此将类型设计为“结构化”(Structural)的而非“名义式”(Nominal)的。
  </p>
  
  <p>
    什么意思呢？意味着TypeScript的类型并不根据定义的名字绑定，只要是形似的类型，不管名称相不相同，都可以作为兼容类型（这很像所谓的duck typing），也就是说，下面的代码在TypeScript中是完全合法的：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">class&lt;/span> Foo { method(input: &lt;span class="hljs-built_in">string&lt;/span>) { &lt;span class="hljs-comment">/* ... */&lt;/span> } }
&lt;span class="hljs-keyword">class&lt;/span> Bar { method(input: &lt;span class="hljs-built_in">string&lt;/span>) { &lt;span class="hljs-comment">/* ... */&lt;/span> } }
&lt;span class="hljs-keyword">let&lt;/span> test: Foo = &lt;span class="hljs-keyword">new&lt;/span> Bar(); &lt;span class="hljs-comment">// no Error!&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这样实际上可以做到类型的最大化复用，只要形似，对于开发者也是最好理解的。（当然对于这个示例最好的做法是抽出一个公共的interface）
  </p>
  
  <h3 class="heading" data-id="heading-5">
    知名的JS库支持
  </h3>
  
  <p>
    TypeScript有强大的<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2FDefinitelyTyped%2FDefinitelyTyped" target="_blank" rel="nofollow noopener noreferrer">DefinitelyTyped</a>社区支持，目前类型声明文件基本上已经覆盖了90%以上的常用JS库，在编写代码时我们的提示是非常友好的，也能做到安全的类型检查。（在使用第三方库时，可以现在这个项目中检索一下有没有该库的TS声明，直接引入即可）
  </p>
  
  <h2 class="heading" data-id="heading-6">
    回顾两个基础知识
  </h2>
  
  <p>
    在进入正式的TS类型介绍之前，让我们先回顾一下JS的两个基础：
  </p>
  
  <h3 class="heading" data-id="heading-7">
    相等性判断
  </h3>
  
  <p>
    我们都知道，在JS里，两个等号的判断会进行隐式的类型转换，如：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-number">5&lt;/span> == &lt;span class="hljs-string">"5"&lt;/span>); &lt;span class="hljs-comment">// true &lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-number">0&lt;/span> == &lt;span class="hljs-string">""&lt;/span>); &lt;span class="hljs-comment">// true&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    在TS中，因为有了类型声明，因此这两个结果在TS的类型系统中恒为false，因此会有报错：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">This condition will always &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-string">'false'&lt;/span> since the types &lt;span class="hljs-string">'5'&lt;/span> and &lt;span class="hljs-string">'"5"'&lt;/span> have no overlap.
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    所以在代码层面，一方面我们要<strong>避免这样两个不同类型的比较</strong>，另一方面<strong>使用全等来代替两个等号</strong>，保证在编译期和运行期具有相同的语义。
  </p>
  
  <p>
    对于TypeScript而言，只有<code>null</code>和<code>undefined</code>的隐式转换是合理的：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-literal">undefined&lt;/span> == &lt;span class="hljs-literal">undefined&lt;/span>); &lt;span class="hljs-comment">// true&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-literal">null&lt;/span> == &lt;span class="hljs-literal">undefined&lt;/span>); &lt;span class="hljs-comment">// true&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-number">0&lt;/span> == &lt;span class="hljs-literal">undefined&lt;/span>); &lt;span class="hljs-comment">// false&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">''&lt;/span> == &lt;span class="hljs-literal">undefined&lt;/span>); &lt;span class="hljs-comment">// false&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-literal">false&lt;/span> == &lt;span class="hljs-literal">undefined&lt;/span>); &lt;span class="hljs-comment">// false&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-8">
    类（Class）
  </h3>
  
  <p>
    对于ES6的Class，我们本身已经很熟悉了，值得一提的是，目前对于类的静态属性、成员属性等有一个提案——<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposal-class-fields" target="_blank" rel="nofollow noopener noreferrer">proposal-class-fields</a>已经进入了Stage3，这个提案包含了很多东西，主要是类的静态属性、成员属性、公有属性和私有属性。其中，私有属性的提案在社区内引起了非常大的争议，由于它的丑陋和怪异遭受各路人马的抨击，现TC39委员会已决定重新思考该提案。
  </p>
  
  <p>
    现在让我们来看看TypeScript对属性访问控制的情况：
  </p>
  
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
  
  <p>
    可以看到，TS中的类成员访问和其他语言非常类似：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">class&lt;/span> FooBase {
    &lt;span class="hljs-keyword">public&lt;/span> x: &lt;span class="hljs-built_in">number&lt;/span>;
    &lt;span class="hljs-keyword">private&lt;/span> y: &lt;span class="hljs-built_in">number&lt;/span>;
    &lt;span class="hljs-keyword">protected&lt;/span> z: &lt;span class="hljs-built_in">number&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于类的成员构造函数初始化，TS提供了一个简单的声明方式：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">class&lt;/span> Foo {
    &lt;span class="hljs-keyword">constructor&lt;/span>(&lt;span class="hljs-params">&lt;span class="hljs-keyword">public&lt;/span> x:&lt;span class="hljs-built_in">number&lt;/span>&lt;/span>) {
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这段代码和下面是等同的：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">class&lt;/span> Foo {
    x: &lt;span class="hljs-built_in">number&lt;/span>;
    &lt;span class="hljs-keyword">constructor&lt;/span>(&lt;span class="hljs-params">x:&lt;span class="hljs-built_in">number&lt;/span>&lt;/span>) {
        &lt;span class="hljs-keyword">this&lt;/span>.x = x;
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h2 class="heading" data-id="heading-9">
    TS类型系统基础
  </h2>
  
  <h3 class="heading" data-id="heading-10">
    基本性准则
  </h3>
  
  <p>
    在正式了解TypeScript之前，首先要明确两个基本概念：
  </p>
  
  <ol>
    <li>
      TypeScript的类型系统设计是可选的，意味着JavaScript就是TypeScript。
    </li>
    <li>
      TypeScript的报错并不会阻止JS代码的生成，你可以渐进式地将JS逐步迁移为TS。
    </li>
  </ol>
  
  <h3 class="heading" data-id="heading-11">
    基本语法
  </h3>
  
  <pre><code class="hljs typescript copyable" lang="typescript">:&lt;TypeAnnotation&gt;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    TypeScript的基本类型语法是在变量之后使用冒号进行类型标识，这种语法也揭示了TypeScript的类型声明实际上是可选的。
  </p>
  
  <h3 class="heading" data-id="heading-12">
    原始值类型
  </h3>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> num: &lt;span class="hljs-built_in">number&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> str: &lt;span class="hljs-built_in">string&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> bool: &lt;span class="hljs-built_in">boolean&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    TypeScript支持三种原始值类型的声明，分别是<code>number</code>、<code>string</code>和<code>boolean</code>。
  </p>
  
  <p>
    对于这三种原始值，TS同样支持以它们的字面量为类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> num: &lt;span class="hljs-number">123&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> str: &lt;span class="hljs-string">'123'&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> bool: &lt;span class="hljs-literal">true&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这类字面量类型配合上联合类型还是十分有用的，我们后面再讲。
  </p>
  
  <h3 class="heading" data-id="heading-13">
    数组类型
  </h3>
  
  <p>
    对于数组的声明也非常简单，只需要加上一个中括号声明类型即可：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> boolArray: &lt;span class="hljs-built_in">boolean&lt;/span>[];
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    以上就简单地定义了一个布尔类型的数组，大多数情况下，我们数组的元素类型是固定的，如果我们数组内存在不同类型的元素怎么办？
  </p>
  
  <p>
    如果元素的个数是已知有限的，可以使用TS的元组类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> nameNumber: [&lt;span class="hljs-built_in">string&lt;/span>, &lt;span class="hljs-built_in">number&lt;/span>];
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    该声明也非常的形象直观，如果元素个数不固定且类型未知，这种情况较为罕见，可直接声明成any类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> arr: &lt;span class="hljs-built_in">any&lt;/span>[]
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-14">
    接口类型
  </h3>
  
  <p>
    接口类型是TypeScript中最常见的组合类型，它能够将不同类型的字段组合在一起形成一个新的类型，这对于JS中的对象声明是十分友好的：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Name {
    first: &lt;span class="hljs-built_in">string&lt;/span>;
    second: &lt;span class="hljs-built_in">string&lt;/span>;
}

&lt;span class="hljs-keyword">var&lt;/span> personName:Name = {
    first: &lt;span class="hljs-string">'张三'&lt;/span>
} &lt;span class="hljs-comment">// Property 'second' is missing in type '{ first: string; }' but required in type 'Name'&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    上述例子可见，TypeScript对每一个字段都做了检查，若未定义接口声明的字段（非可选），则检查会抛出错误。
  </p>
  
  <h4 class="heading" data-id="heading-15">
    内联接口
  </h4>
  
  <p>
    对于对象来说，我们也可以使用内联接口来快速声明类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> personName:{ first: &lt;span class="hljs-built_in">string&lt;/span>, second: &lt;span class="hljs-built_in">string&lt;/span> } = {
    first: &lt;span class="hljs-string">'张三'&lt;/span>
} &lt;span class="hljs-comment">// Property 'second' is missing in type '{ first: string; }' but required in type 'Name'&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    内联接口可以帮助我们快速声明类型，但建议谨慎使用，对于可复用以及一般性的接口声明建议使用interface声明。
  </p>
  
  <h4 class="heading" data-id="heading-16">
    索引类型
  </h4>
  
  <p>
    对于对象而言，我们可以使用中括号的方式去存取值，对TS而言，同样支持相应的索引类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Foo {
  [key:&lt;span class="hljs-built_in">string&lt;/span>]: &lt;span class="hljs-built_in">number&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于索引的key类型，TypeScript只支持<code>number</code>和<code>string</code>两种类型，且Number是string的一种特殊情况。
  </p>
  
  <p>
    对于索引类型，我们在一般化的使用场景上更方便：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> NestedCSS {
  color?: &lt;span class="hljs-built_in">string&lt;/span>;
  nest?: {
    [selector: &lt;span class="hljs-built_in">string&lt;/span>]: NestedCSS;
  }
}

&lt;span class="hljs-keyword">const&lt;/span> example: NestedCSS = {
  color: &lt;span class="hljs-string">'red'&lt;/span>,
  nest: {
    &lt;span class="hljs-string">'.subclass'&lt;/span>: {
      color: &lt;span class="hljs-string">'blue'&lt;/span>
    }
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-17">
    类的接口
  </h4>
  
  <p>
    对于接口而言，另一个重要作用就是类可以实现接口：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Point {
    x: &lt;span class="hljs-built_in">number&lt;/span>; y: &lt;span class="hljs-built_in">number&lt;/span>;
    z: &lt;span class="hljs-built_in">number&lt;/span>; &lt;span class="hljs-comment">// New member&lt;/span>
}

&lt;span class="hljs-keyword">class&lt;/span> MyPoint &lt;span class="hljs-keyword">implements&lt;/span> Point { &lt;span class="hljs-comment">// ERROR : missing member `z`&lt;/span>
    x: &lt;span class="hljs-built_in">number&lt;/span>; y: &lt;span class="hljs-built_in">number&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对类而言，实现接口，意味着需要实现接口的所有属性和方法，这和其他语言是类似的。
  </p>
  
  <h3 class="heading" data-id="heading-18">
    函数类型
  </h3>
  
  <p>
    函数是TypeScript中最常见的组成单元：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Foo {
    foo: &lt;span class="hljs-built_in">string&lt;/span>;
}

&lt;span class="hljs-comment">// Return type annotated as `: Foo`&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">foo&lt;/span>(&lt;span class="hljs-params">sample: Foo&lt;/span>): &lt;span class="hljs-title">Foo&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> sample;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于函数而言，本身有参数类型和返回值类型，都可进行声明。
  </p>
  
  <h4 class="heading" data-id="heading-19">
    可选参数
  </h4>
  
  <p>
    对于参数，我们可以声明可选参数，即在声明之后加一个问号：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">foo&lt;/span>(&lt;span class="hljs-params">bar: &lt;span class="hljs-built_in">number&lt;/span>, bas?: &lt;span class="hljs-built_in">string&lt;/span>&lt;/span>): &lt;span class="hljs-title">void&lt;/span> &lt;/span>{
    &lt;span class="hljs-comment">// ..&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-20">
    void和never类型
  </h4>
  
  <p>
    另外，上述例子也表明，当函数没有返回值时，可以用<code>void</code>来表示。
  </p>
  
  <p>
    当一个函数永远不会返回时，我们可以声明返回值类型为<code>never</code>：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">bar&lt;/span>(): &lt;span class="hljs-title">never&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">throw&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Error&lt;/span>(&lt;span class="hljs-string">'never reach'&lt;/span>);
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-21">
    callable和newable
  </h4>
  
  <p>
    我们还可以使用接口来定义函数，在这种函数实现接口的情形下，我们称这种定义为<code>callable</code>:
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Complex {
  (bar?: &lt;span class="hljs-built_in">number&lt;/span>, ...others: &lt;span class="hljs-built_in">boolean&lt;/span>[]): &lt;span class="hljs-built_in">number&lt;/span>;
}

&lt;span class="hljs-keyword">var&lt;/span> foo: Complex;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这种定义方式在可复用的函数声明中非常有用。
  </p>
  
  <p>
    callable还有一种特殊的情况，该声明中指定了<code>new</code>的方法名，称之为<code>newable</code>：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> CallMeWithNewToGetString {
  &lt;span class="hljs-keyword">new&lt;/span>(): &lt;span class="hljs-built_in">string&lt;/span>
}

&lt;span class="hljs-keyword">var&lt;/span> foo: CallMeWithNewToGetString;

&lt;span class="hljs-keyword">new&lt;/span> foo();
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这个在构造函数的声明时非常有用。
  </p>
  
  <h4 class="heading" data-id="heading-22">
    函数重载
  </h4>
  
  <p>
    最后，一个函数可以支持多种传参形式，这时候仅仅使用可选参数的约束可能是不够的，如：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">unction padding(a: &lt;span class="hljs-built_in">number&lt;/span>, b?: &lt;span class="hljs-built_in">number&lt;/span>, c?: &lt;span class="hljs-built_in">number&lt;/span>, d?: &lt;span class="hljs-built_in">number&lt;/span>) {
    &lt;span class="hljs-keyword">if&lt;/span> (b === &lt;span class="hljs-literal">undefined&lt;/span> && c === &lt;span class="hljs-literal">undefined&lt;/span> && d === &lt;span class="hljs-literal">undefined&lt;/span>) {
        b = c = d = a;
    }
    &lt;span class="hljs-keyword">else&lt;/span> &lt;span class="hljs-keyword">if&lt;/span> (c === &lt;span class="hljs-literal">undefined&lt;/span> && d === &lt;span class="hljs-literal">undefined&lt;/span>) {
        c = a;
        d = b;
    }
    &lt;span class="hljs-keyword">return&lt;/span> {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这个函数可以支持四个参数、两个参数和一个参数，如果我们粗略的将后三个参数都设置为可选参数，那么当传入三个参数时，TS也会认为它是合法的，此时就失去了类型安全，更好的方式是声明函数重载：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">padding&lt;/span>(&lt;span class="hljs-params">all: &lt;span class="hljs-built_in">number&lt;/span>&lt;/span>)&lt;/span>;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">padding&lt;/span>(&lt;span class="hljs-params">topAndBottom: &lt;span class="hljs-built_in">number&lt;/span>, leftAndRight: &lt;span class="hljs-built_in">number&lt;/span>&lt;/span>)&lt;/span>;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">padding&lt;/span>(&lt;span class="hljs-params">top: &lt;span class="hljs-built_in">number&lt;/span>, right: &lt;span class="hljs-built_in">number&lt;/span>, bottom: &lt;span class="hljs-built_in">number&lt;/span>, left: &lt;span class="hljs-built_in">number&lt;/span>&lt;/span>)&lt;/span>;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">padding&lt;/span>(&lt;span class="hljs-params">a: &lt;span class="hljs-built_in">number&lt;/span>, b?: &lt;span class="hljs-built_in">number&lt;/span>, c?: &lt;span class="hljs-built_in">number&lt;/span>, d?: &lt;span class="hljs-built_in">number&lt;/span>&lt;/span>) &lt;/span>{
   &lt;span class="hljs-comment">//...&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    函数重载写法也非常简单，就是重复声明不同参数的函数类型，最后一个声明包含了兼容所有重载声明的实现。这样，TS类型系统就能准确的判断出该函数的多态性质了。
  </p>
  
  <p>
    使用<code>callable</code>的方式也可以声明重载：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Padding {
  (all: &lt;span class="hljs-built_in">number&lt;/span>): &lt;span class="hljs-built_in">any&lt;/span>
  (topAndBottom: &lt;span class="hljs-built_in">number&lt;/span>, leftAndRight: &lt;span class="hljs-built_in">number&lt;/span>): &lt;span class="hljs-built_in">any&lt;/span>
  (top: &lt;span class="hljs-built_in">number&lt;/span>, right: &lt;span class="hljs-built_in">number&lt;/span>, bottom: &lt;span class="hljs-built_in">number&lt;/span>, left: &lt;span class="hljs-built_in">number&lt;/span>): &lt;span class="hljs-built_in">any&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-23">
    特殊类型
  </h3>
  
  <h4 class="heading" data-id="heading-24">
    any
  </h4>
  
  <p>
    <code>any</code>在TypeScript中是一个比较特殊的类型，声明为<code>any</code>类型的变量就像动态语言一样不受约束，好像关闭了TS的类型检查一般。对于<code>any</code>类型的变量，可以将其赋予任何类型的值：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> power: &lt;span class="hljs-built_in">any&lt;/span>;

power = &lt;span class="hljs-string">'123'&lt;/span>;
power = &lt;span class="hljs-number">123&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    <code>any</code>对于JS代码的迁移是十分友好的，在已经成型的TypeScript项目中，我们要慎用<code>any</code>类型，当你设置为<code>any</code>时，意味着告诉编辑器不要对它进行任何检查。
  </p>
  
  <h4 class="heading" data-id="heading-25">
    null和undefined
  </h4>
  
  <p>
    <code>null</code>和<code>undefined</code>作为TypeScript的特殊类型，它同样有字面量的含义，之前我们已经了解到。
  </p>
  
  <p>
    值得注意的是，<code>null</code>和<code>undefined</code>可以赋值给任意类型的变量：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> num: &lt;span class="hljs-built_in">number&lt;/span>;
&lt;span class="hljs-keyword">var&lt;/span> str: &lt;span class="hljs-built_in">string&lt;/span>;

&lt;span class="hljs-comment">// 赋值给任意类型的变量都是合法的&lt;/span>
num = &lt;span class="hljs-literal">null&lt;/span>;
str = &lt;span class="hljs-literal">undefined&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-26">
    void和never
  </h4>
  
  <p>
    在函数类型中，我们已经介绍了两种类型，专门修饰函数返回值。
  </p>
  
  <h4 class="heading" data-id="heading-27">
    readonly
  </h4>
  
  <p>
    <code>readonly</code>是只读属性的修饰符，当我们的属性是只读时，可以用该修饰符加以约束，在类中，用<code>readonly</code>修饰的属性仅可以在构造函数中初始化：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">class&lt;/span> Foo {
    readonly bar = &lt;span class="hljs-number">1&lt;/span>; &lt;span class="hljs-comment">// OK&lt;/span>
    readonly baz: &lt;span class="hljs-built_in">string&lt;/span>;
    &lt;span class="hljs-keyword">constructor&lt;/span>() {
        &lt;span class="hljs-keyword">this&lt;/span>.baz = &lt;span class="hljs-string">"hello"&lt;/span>; &lt;span class="hljs-comment">// OK&lt;/span>
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    一个实用场景是在<code>react</code>中，<code>props</code>和<code>state</code>都是只读的：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Props {
    readonly foo: &lt;span class="hljs-built_in">number&lt;/span>;
}
&lt;span class="hljs-keyword">interface&lt;/span> State {
    readonly bar: &lt;span class="hljs-built_in">number&lt;/span>;
}
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">class&lt;/span> Something &lt;span class="hljs-keyword">extends&lt;/span> React.Component&lt;Props,State&gt; {
  someMethod() {
    &lt;span class="hljs-keyword">this&lt;/span>.props.foo = &lt;span class="hljs-number">123&lt;/span>; &lt;span class="hljs-comment">// ERROR: (props are immutable)&lt;/span>
    &lt;span class="hljs-keyword">this&lt;/span>.state.baz = &lt;span class="hljs-number">456&lt;/span>; &lt;span class="hljs-comment">// ERROR: (one should use this.setState)  &lt;/span>
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    当然，<code>React</code>本身在类的声明时会对传入的<code>props</code>和<code>state</code>做一层<code>ReadOnly</code>的包裹，因此无论我们是否在外面显式声明，赋值给<code>props</code>和<code>state</code>的行为都是会报错的。
  </p>
  
  <p>
    注意，<code>readonly</code>听起来和<code>const</code>有点像，需要时刻保持一个概念：
  </p>
  
  <ul>
    <li>
      <code>readonly</code>是修饰属性的
    </li>
    <li>
      <code>const</code>是声明变量的
    </li>
  </ul>
  
  <h3 class="heading" data-id="heading-28">
    泛型
  </h3>
  
  <p>
    在更加一般化的场景，我们的类型可能并不固定已知，它和<code>any</code>有点像，只不过我们希望在<code>any</code>的基础上能够有更近一步的约束，比如：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">reverse&lt;/span>&lt;&lt;span class="hljs-title">T&lt;/span>&gt;(&lt;span class="hljs-params">items: T[]&lt;/span>): &lt;span class="hljs-title">T&lt;/span>[] &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> toreturn = [];
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> i = items.length - &lt;span class="hljs-number">1&lt;/span>; i &gt;= &lt;span class="hljs-number">0&lt;/span>; i--) {
        toreturn.push(items[i]);
    }
    &lt;span class="hljs-keyword">return&lt;/span> toreturn;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    <code>reverse</code>函数是一个很好的示例，对于一个通用的函数<code>reverse</code>来说，数组元素的类型是未知的，可以是任意类型，但<code>reverse</code>函数的返回值也是个数组，它和传入的数组类型是相同的，对于这个约束，我们可以使用泛型，其语法是尖括号，内置泛型变量，多个泛型变量用逗号隔开，泛型变量名称没有限制，一般而言我们以大写字母开头，多个泛型变量使用其语义命名，加上<code>T</code>为前缀。
  </p>
  
  <p>
    在调用时，可以显示的指定泛型类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> reversed = reverse&lt;&lt;span class="hljs-built_in">number&lt;/span>&gt;([&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>]);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    也可以利用TypeScript的类型推断，进行隐式调用：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> reversed = reverse([&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>]);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    由于我们的参数类型是<code>T[]</code>，而传入的数组类型是一个<code>number[]</code>，此时<code>T</code>的类型被TypeScript自动推断为<code>number</code>。
  </p>
  
  <p>
    对于泛型而言，我们同样可以作用于接口和类：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> Array&lt;T&gt; {
 reverse(): T[];
 &lt;span class="hljs-comment">// ...&lt;/span>
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-29">
    联合类型
  </h3>
  
  <p>
    在JS中，一个变量的类型可能拥有多个，比如：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">formatCommandline&lt;/span>(&lt;span class="hljs-params">command: &lt;span class="hljs-built_in">string&lt;/span>[]|&lt;span class="hljs-built_in">string&lt;/span>&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> line = &lt;span class="hljs-string">''&lt;/span>;
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">typeof&lt;/span> command === &lt;span class="hljs-string">'string'&lt;/span>) {
        line = command.trim();
    } &lt;span class="hljs-keyword">else&lt;/span> {
        line = command.join(&lt;span class="hljs-string">' '&lt;/span>).trim();
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    此时我们可以使用一个<code>|</code>分割符来分割多种类型，对于这种复合类型，我们称之为<code>联合类型</code>。
  </p>
  
  <h3 class="heading" data-id="heading-30">
    交叉类型
  </h3>
  
  <p>
    如果说联合类型的语义等同于<code>或者</code>，那么交叉类型的语义等同于集合中的<code>并集</code>，下面的<code>extend</code>函数是最好的说明：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">extend&lt;/span>&lt;&lt;span class="hljs-title">T&lt;/span>, &lt;span class="hljs-title">U&lt;/span>&gt;(&lt;span class="hljs-params">first: T, second: U&lt;/span>): &lt;span class="hljs-title">T&lt;/span> & &lt;span class="hljs-title">U&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">let&lt;/span> result = &lt;T & U&gt; {};
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> id &lt;span class="hljs-keyword">in&lt;/span> first) {
        result[id] = first[id];
    }
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">let&lt;/span> id &lt;span class="hljs-keyword">in&lt;/span> second) {
        &lt;span class="hljs-keyword">if&lt;/span> (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    &lt;span class="hljs-keyword">return&lt;/span> result;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    该函数最终以<code>T&U</code>作为返回值值，该类型既包含了<code>T</code>的字段，也包含了<code>U</code>的字段，可以看做是两个类型的<code>并集</code>。
  </p>
  
  <h3 class="heading" data-id="heading-31">
    类型别名
  </h3>
  
  <p>
    TypeScript为类型的复用提供了更便捷的方式——类型别名。当你想复用类型时，可能在该场景下要为已经声明的类型换一个名字，此时可以使用type关键字来进行类型别名的定义：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">interface&lt;/span> state {
  a: &lt;span class="hljs-number">1&lt;/span>
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">type&lt;/span> userState = state;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    我们同样可以使用type来声明一个类型：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">type&lt;/span> Text = &lt;span class="hljs-built_in">string&lt;/span> | { text: &lt;span class="hljs-built_in">string&lt;/span> };
&lt;span class="hljs-keyword">type&lt;/span> Coordinates = [&lt;span class="hljs-built_in">number&lt;/span>, &lt;span class="hljs-built_in">number&lt;/span>];
&lt;span class="hljs-keyword">type&lt;/span> Callback = &lt;span class="hljs-function">(&lt;span class="hljs-params">data: &lt;span class="hljs-built_in">string&lt;/span>&lt;/span>) =&gt;&lt;/span> &lt;span class="hljs-built_in">void&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于type和interface的取舍：
  </p>
  
  <ul>
    <li>
      如果要用交叉类型或联合类型，使用type。
    </li>
    <li>
      如果要用extend或implement，使用interface。
    </li>
    <li>
      其余情况可看个人喜好，个人建议type更多应当用于需要起别名时，其他情况尽量使用interface。
    </li>
  </ul>
  
  <h3 class="heading" data-id="heading-32">
    枚举类型
  </h3>
  
  <p>
    对于组织一系列相关值的集合，最好的方式应当是枚举，比如一系列状态集合，一系列归类集合等等。
  </p>
  
  <p>
    在TypeScript中，枚举的方式非常简单：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">enum&lt;/span> Color {
    Red,
    Green,
    Blue
}
&lt;span class="hljs-keyword">var&lt;/span> col = Color.Red;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    默认的枚举值是从0开始，如上述代码，<code>Red=0</code>，<code>Green=1</code>依次类推。
  </p>
  
  <p>
    当然我们还可以指定初始值：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">enum&lt;/span> Color {
    Red = &lt;span class="hljs-number">3&lt;/span>,
    Green,
    Blue
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    此时<code>Red=3</code>, <code>Green=4</code>依次类推。
  </p>
  
  <p>
    大家知道在JavaScript中是不存在枚举类型的，那么TypeScript的枚举最终转换为JavaScript是什么样呢？
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> Color;
(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">Color&lt;/span>) &lt;/span>{
    Color[Color[&lt;span class="hljs-string">"Red"&lt;/span>] = &lt;span class="hljs-number">0&lt;/span>] = &lt;span class="hljs-string">"Red"&lt;/span>;
    Color[Color[&lt;span class="hljs-string">"Green"&lt;/span>] = &lt;span class="hljs-number">1&lt;/span>] = &lt;span class="hljs-string">"Green"&lt;/span>;
    Color[Color[&lt;span class="hljs-string">"Blue"&lt;/span>] = &lt;span class="hljs-number">2&lt;/span>] = &lt;span class="hljs-string">"Blue"&lt;/span>;
})(Color || (Color = {}));
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    从编译后的代码可以看到，转换为一个key-value的对象后，我们的访问也非常方便：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> red = Color.Red; &lt;span class="hljs-comment">// 0&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> redKey = Color[&lt;span class="hljs-number">0&lt;/span>]; &lt;span class="hljs-comment">// 'Red'&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> redKey = Color[Color.Red]; &lt;span class="hljs-comment">// 'Red'&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    既可以通过key来访问到值，也可以通过值来访问到key。
  </p>
  
  <h4 class="heading" data-id="heading-33">
    Flag标识位
  </h4>
  
  <p>
    对于枚举，有一种很实用的设计模式是使用位运算来标识(Flag)状态：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">enum&lt;/span> EnvFlags {
  None = &lt;span class="hljs-number">0&lt;/span>,
  QQ = &lt;span class="hljs-number">1&lt;/span> &lt;&lt; &lt;span class="hljs-number">0&lt;/span>,
  Weixin = &lt;span class="hljs-number">1&lt;/span> &lt;&lt; &lt;span class="hljs-number">1&lt;/span>
}

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">initShare&lt;/span>(&lt;span class="hljs-params">flags: EnvFlags&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">if&lt;/span> (flags & EnvFlags.QQ) {
    initQQShare();
  }
  &lt;span class="hljs-keyword">if&lt;/span> (flags & EnvFlags.Weixin) {
    initWeixinShare();
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    在我们使用标识位时，可以遵循以下规则：
  </p>
  
  <ul>
    <li>
      使用 <code>|=</code> 增加标志位
    </li>
    <li>
      使用 <code>&=</code> 和 <code>~</code>清除标志位
    </li>
    <li>
      使用 <code>|</code> 联合标识位
    </li>
  </ul>
  
  <p>
    如：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">var&lt;/span> flag = EnvFlags.None;
flag |= EnvFlags.QQ;    &lt;span class="hljs-comment">// 加入QQ标识位&lt;/span>
Flag &= ~EnvFlags.QQ;   &lt;span class="hljs-comment">// 清除QQ标识位&lt;/span>
Flag |=  EnvFlags.QQ | EnvFlags.Weixin; &lt;span class="hljs-comment">// 加入QQ和微信标识位&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-34">
    常量枚举
  </h4>
  
  <p>
    在枚举定义加上<code>const</code>声明，即可定义一个常量枚举：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">enum&lt;/span> Color {
    Red = &lt;span class="hljs-number">3&lt;/span>,
    Green,
    Blue
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于常量枚举，TypeScript在编译后不会产生任何运行时代码，因此在一般情况下，应当优先使用常量枚举，减少不必要代码的产生。
  </p>
  
  <h4 class="heading" data-id="heading-35">
    字符串枚举
  </h4>
  
  <p>
    TypeScript还支持非数字类型的枚举——字符串枚举
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">enum&lt;/span> EvidenceTypeEnum {
  UNKNOWN = &lt;span class="hljs-string">''&lt;/span>,
  PASSPORT_VISA = &lt;span class="hljs-string">'passport_visa'&lt;/span>,
  PASSPORT = &lt;span class="hljs-string">'passport'&lt;/span>,
  SIGHTED_STUDENT_CARD = &lt;span class="hljs-string">'sighted_tertiary_edu_id'&lt;/span>,
  SIGHTED_KEYPASS_CARD = &lt;span class="hljs-string">'sighted_keypass_card'&lt;/span>,
  SIGHTED_PROOF_OF_AGE_CARD = &lt;span class="hljs-string">'sighted_proof_of_age_card'&lt;/span>,
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这类枚举和我们之前使用JavaScript定义常量集合的方式很像，好处在于调试或日志输出时，字符串比数字要包含更多的语义。
  </p>
  
  <h3 class="heading" data-id="heading-36">
    命名空间
  </h3>
  
  <p>
    在没有模块化的时代，我们为了防止全局的命名冲突，经常会以命名空间的形式组织代码：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">something&lt;/span>) &lt;/span>{

    something.foo = &lt;span class="hljs-number">123&lt;/span>;

})(something || (something = {}))
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    TypeScript内置了<code>namespace</code>变量帮助定义命名空间：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">namespace&lt;/span> Utility {
    &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">log&lt;/span>(&lt;span class="hljs-params">msg&lt;/span>) &lt;/span>{
        &lt;span class="hljs-built_in">console&lt;/span>.log(msg);
    }
    &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">error&lt;/span>(&lt;span class="hljs-params">msg&lt;/span>) &lt;/span>{
        &lt;span class="hljs-built_in">console&lt;/span>.error(msg);
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    对于我们自己的工程项目而言，一般建议使用ES6模块的方式去组织代码，而命名空间的模式可适用于对一些全局库的声明，如jQuery：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">namespace&lt;/span> $ {
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">ajax&lt;/span>(&lt;span class="hljs-params">&lt;span class="hljs-comment">//...) {}&lt;/span>
}
&lt;/span>&lt;/span>&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    当然，命名空间还可以便捷地帮助我们声明静态方法，如和<code>enum</code>的结合使用：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">enum&lt;/span> Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
&lt;span class="hljs-keyword">namespace&lt;/span> Weekday {
    &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isBusinessDay&lt;/span>(&lt;span class="hljs-params">day: Weekday&lt;/span>) &lt;/span>{
        &lt;span class="hljs-keyword">switch&lt;/span> (day) {
            &lt;span class="hljs-keyword">case&lt;/span> Weekday.Saturday:
            &lt;span class="hljs-keyword">case&lt;/span> Weekday.Sunday:
                &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
            &lt;span class="hljs-keyword">default&lt;/span>:
                &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">true&lt;/span>;
        }
    }
}

&lt;span class="hljs-keyword">const&lt;/span> mon = Weekday.Monday;
&lt;span class="hljs-keyword">const&lt;/span> sun = Weekday.Sunday;
&lt;span class="hljs-built_in">console&lt;/span>.log(Weekday.isBusinessDay(mon)); &lt;span class="hljs-comment">// true&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(Weekday.isBusinessDay(sun)); &lt;span class="hljs-comment">// false&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h2 class="heading" data-id="heading-37">
    关于命名规范
  </h2>
  
  <h3 class="heading" data-id="heading-38">
    变量名、函数和文件名
  </h3>
  
  <ul>
    <li>
      推荐使用驼峰命名。
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-comment">// Bad&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> FooVar;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">BarFunc&lt;/span>() &lt;/span>{ }

&lt;span class="hljs-comment">// Good&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> fooVar;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">barFunc&lt;/span>() &lt;/span>{ }
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-39">
    类、命名空间
  </h3>
  
  <ul>
    <li>
      推荐使用帕斯卡命名。
    </li>
    <li>
      成员变量和方法推荐使用驼峰命名。
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-comment">// Bad&lt;/span>
&lt;span class="hljs-keyword">class&lt;/span> foo { }

&lt;span class="hljs-comment">// Good&lt;/span>
&lt;span class="hljs-keyword">class&lt;/span> Foo { }

&lt;span class="hljs-comment">// Bad&lt;/span>
&lt;span class="hljs-keyword">class&lt;/span> Foo {
    Bar: &lt;span class="hljs-built_in">number&lt;/span>;
    Baz() { }
}

&lt;span class="hljs-comment">// Good&lt;/span>
&lt;span class="hljs-keyword">class&lt;/span> Foo {
    bar: &lt;span class="hljs-built_in">number&lt;/span>;
    baz() { }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-40">
    Interface、type
  </h3>
  
  <ul>
    <li>
      推荐使用帕斯卡命名。
    </li>
    <li>
      成员字段推荐使用驼峰命名。
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-comment">// Bad&lt;/span>
&lt;span class="hljs-keyword">interface&lt;/span> foo { }

&lt;span class="hljs-comment">// Good&lt;/span>
&lt;span class="hljs-keyword">interface&lt;/span> Foo { }

&lt;span class="hljs-comment">// Bad&lt;/span>
&lt;span class="hljs-keyword">interface&lt;/span> Foo {
    Bar: &lt;span class="hljs-built_in">number&lt;/span>;
}

&lt;span class="hljs-comment">// Good&lt;/span>
&lt;span class="hljs-keyword">interface&lt;/span> Foo {
    bar: &lt;span class="hljs-built_in">number&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h2 class="heading" data-id="heading-41">
    关于模块规范
  </h2>
  
  <h3 class="heading" data-id="heading-42">
    <code>export default</code>的争论
  </h3>
  
  <p>
    关于是否应该使用<code>export default</code>在<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript%2Fissues%2F1365" target="_blank" rel="nofollow noopener noreferrer">这里</a>有详尽的讨论，在AirBnb规范中也有<code>prefer-default-export</code>这条规则，但我认为在TypeScript中应当尽量不使用<code>export default</code>：
  </p>
  
  <p>
    关于链接中提到的重命名问题, 甚至自动import，其实export default也是可以做到的，借助编辑器和TypeScript的静态能力。所以这一点还不是关键因素。
  </p>
  
  <p>
    不过使用一般化的<code>export</code>更让我们容易获得智能提示：
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">import&lt;/span> &lt;span class="hljs-comment">/* here */&lt;/span> &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'something'&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    在这种情况下，一般编辑器是不会给出智能提示的。 而这种：
  </p>
  
  <pre><code class="hljs bash copyable" lang="bash">import { /* here */ } from &lt;span class="hljs-string">'something'&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    我们可以通过智能提示做到快速引入。
  </p>
  
  <p>
    除了这一点外，还有以下几点好处：
  </p>
  
  <ul>
    <li>
      对CommonJS是友好的，如果使用export default，在commonJS下需要这样引入：
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">const&lt;/span> {&lt;span class="hljs-keyword">default&lt;/span>} = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'module/foo'&lt;/span>);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    多了个default无疑感觉非常奇怪。
  </p>
  
  <ul>
    <li>
      对动态import是友好的，如果使用export default，还需要显示的通过default字段来访问：
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">const&lt;/span> HighChart = &lt;span class="hljs-keyword">await&lt;/span> &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'https://code.highcharts.com/js/es-modules/masters/highcharts.src.js'&lt;/span>);
Highcharts.default.chart(&lt;span class="hljs-string">'container'&lt;/span>, { ... }); &lt;span class="hljs-comment">// 注意 `.default`&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <ul>
    <li>
      对于<code>re-exporting</code>是友好的，如果使用export default，那么进行<code>re-export</code>会比较麻烦：
    </li>
  </ul>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">import&lt;/span> Foo &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">"./foo"&lt;/span>; &lt;span class="hljs-keyword">export&lt;/span> { Foo }
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    相比之下，如果没有<code>export default</code>，我们可以直接使用:
  </p>
  
  <pre><code class="hljs typescript copyable" lang="typescript">&lt;span class="hljs-keyword">export&lt;/span> * &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">"./foo"&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
</div>

<div>
  <div>
    <h1 class="heading" data-id="heading-0">
      原始数据类型
    </h1>
    
    <p>
      JavaScript 的类型分为两种：原始数据类型和对象类型。
    </p>
    
    <p>
      原始数据类型包括：布尔值、数值、字符串、<code>null</code>、<code>undefined</code> 以及 ES6 中的新类型 <code>Symbol</code>
    </p>
    
    <p>
      本节主要介绍<strong>前五种</strong>原始数据类型在 TypeScript 中的应用。
    </p>
    
    <p>
      布尔值是最基础的数据类型，在 TypeScript 中，使用 <code>boolean</code> 定义布尔值类型：
    </p>
    
    <p>
      以下都<strong>编译通过</strong>的,并且给出了说明,一句话总结,<strong>是什么类型就要赋值给什么类型</strong>,这句话够俗了吧
    </p>
    
    <h2 class="heading" data-id="heading-1">
      正确的写法
    </h2>
    
    <pre><code class="hljs bash copyable" lang="bash">&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;布尔&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 布尔值
&lt;span class="hljs-built_in">let&lt;/span> isDone: boolean = &lt;span class="hljs-literal">false&lt;/span>;  

// 事实上 `new Boolean()` 返回的是一个 `Boolean` 对象
&lt;span class="hljs-built_in">let&lt;/span> createdByNewBoolean: Boolean = new Boolean(1);

//(直接调用 `Boolean` 也可以返回一个 `boolean` 类型) 
&lt;span class="hljs-built_in">let&lt;/span> createdByBoolean: boolean = Boolean(1); 

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;数值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 数值
&lt;span class="hljs-built_in">let&lt;/span> decLiteral: number = 6;
&lt;span class="hljs-built_in">let&lt;/span> hexLiteral: number = 0xf00d;

// ES6 中的二进制表示法
&lt;span class="hljs-built_in">let&lt;/span> binaryLiteral: number = 0b1010;

// ES6 中的八进制表示法
&lt;span class="hljs-built_in">let&lt;/span> octalLiteral: number = 0o744;
&lt;span class="hljs-built_in">let&lt;/span> notANumber: number = NaN;
&lt;span class="hljs-built_in">let&lt;/span> infinityNumber: number = Infinity;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;字符串&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-built_in">let&lt;/span> myName: string = &lt;span class="hljs-string">'Tom'&lt;/span>;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;空值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 没有返回值的函数为void
&lt;span class="hljs-keyword">function&lt;/span> alertName(): void {
    alert(&lt;span class="hljs-string">'My name is Tom'&lt;/span>);
}

//声明一个 void 类型的只能将它赋值为 undefined 和 null
&lt;span class="hljs-built_in">let&lt;/span> unusable: void = undefined;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;Null 和 Undefined&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
&lt;span class="hljs-built_in">let&lt;/span> u: undefined = undefined;
&lt;span class="hljs-built_in">let&lt;/span> n: null = null;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-2">
      错误的写法
    </h2>
    
    <p>
      <strong>注意:正确的很好记,大多数人都会写正确的,关键是要记住这些错误的!!!</strong>
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;布尔&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 注意，使用构造函数 `Boolean` 创造的对象不是布尔值
&lt;span class="hljs-built_in">let&lt;/span> createdByNewBoolean: boolean = new Boolean(1);&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;数值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-built_in">let&lt;/span> decLiteral: number = &lt;span class="hljs-string">"6"&lt;/span>;&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;字符串&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-built_in">let&lt;/span> myName: string = 999;&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;空值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// 没有返回值的函数为void
&lt;span class="hljs-keyword">function&lt;/span> alertName(): void {&#x274c;
   &lt;span class="hljs-built_in">return&lt;/span> 666;
}
//声明一个 void 类型的只能将它赋值为 undefined 和 null
&lt;span class="hljs-built_in">let&lt;/span> unusable: void = &lt;span class="hljs-string">'I love you'&lt;/span>;&#x274c;

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;Null 和 Undefined&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
&lt;span class="hljs-built_in">let&lt;/span> u: undefined = 888;&#x274c;
&lt;span class="hljs-built_in">let&lt;/span> n: null = 999;&#x274c;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-3">
      任意值
    </h1>
    
    <h2 class="heading" data-id="heading-4">
      正确的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 顾名思义,可以被任何值赋值&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> anyThing: any = &lt;span class="hljs-string">'hello'&lt;/span>;
&lt;span class="hljs-keyword">let&lt;/span> anyThing: any = &lt;span class="hljs-number">888&lt;/span>;
&lt;span class="hljs-keyword">let&lt;/span> anyThing: any = &lt;span class="hljs-literal">true&lt;/span>;
&lt;span class="hljs-keyword">let&lt;/span> anyThing: any = &lt;span class="hljs-literal">null&lt;/span>;
&lt;span class="hljs-keyword">let&lt;/span> anyThing: any = &lt;span class="hljs-literal">undefined&lt;/span>;

&lt;span class="hljs-comment">// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> any;
any =&lt;span class="hljs-literal">true&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-5">
      错误的写法
    </h2>
    
    <p>
      没有错误的写法~
    </p>
    
    <h1 class="heading" data-id="heading-6">
      类型推论
    </h1>
    
    <h2 class="heading" data-id="heading-7">
      正确的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> myFavoriteNumber = &lt;span class="hljs-string">'seven'&lt;/span>;  等价于  &lt;span class="hljs-keyword">let&lt;/span> myFavoriteNumber :string= &lt;span class="hljs-string">'seven'&lt;/span>;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-8">
      错误的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 第一句已经被推论为String类型了&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> myFavoriteNumber = &lt;span class="hljs-string">'seven'&lt;/span>;
myFavoriteNumber = &lt;span class="hljs-number">7&lt;/span>;&#x274c;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-9">
      联合类型
    </h1>
    
    <h2 class="heading" data-id="heading-10">
      正确的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 联合类型（Union Types）表示取值可以为多种类型中的一种。&lt;/span>
&lt;span class="hljs-comment">// 当你允许某个变量被赋值多种类型的时候,使用联合类型,管道符进行连接&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> myFavoriteNumber: string | number;
myFavoriteNumber = &lt;span class="hljs-string">'seven'&lt;/span>;
myFavoriteNumber = &lt;span class="hljs-number">7&lt;/span>;

&lt;span class="hljs-comment">// 也可用于方法的参数定义, 都有toString方法,访问 string 和 number 的共有属性是没问题的&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getString&lt;/span>(&lt;span class="hljs-params">something: string | number&lt;/span>): &lt;span class="hljs-title">string&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> something.toString();
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-11">
      错误的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// number类型没有length属性.所以编译错误,因为我们只能访问此联合类型的所有类型里共有的属性或方法：&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getLength&lt;/span>(&lt;span class="hljs-params">something: string | number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{&#x274c;
    &lt;span class="hljs-keyword">return&lt;/span> something.length;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-12">
      对象的类型——接口
    </h1>
    
    <h2 class="heading" data-id="heading-13">
      正确的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 赋值的时候，变量的形状必须和接口的形状保持一致(不能多也不能少,类型还必须一致)&lt;/span>
interface Person {
    &lt;span class="hljs-attr">name&lt;/span>: string;
    age: number;
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Tom'&lt;/span>,
    &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">25&lt;/span>
};


IUserInfo{
  &lt;span class="hljs-attr">age&lt;/span> : any;&lt;span class="hljs-comment">//定义一个任何变量的 age.&lt;/span>
  userName :string;&lt;span class="hljs-comment">//定义一个 username.&lt;/span>
}
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getUserInfo&lt;/span>(&lt;span class="hljs-params">user : IUserInfo&lt;/span>):&lt;span class="hljs-title">string&lt;/span>&lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> user.age+&lt;span class="hljs-string">"======"&lt;/span>+user.userName; 	
}
  &#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;可选属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;

interface Person {
    &lt;span class="hljs-attr">name&lt;/span>: string;
    age?: number; &lt;span class="hljs-comment">// 表示这个属性可有可无&lt;/span>
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Tom'&lt;/span>
};
  &#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;任意属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;

&lt;span class="hljs-comment">//希望一个接口允许有任意的属性，可以使用如下方式：旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集&lt;/span>
interface Person {
    &lt;span class="hljs-attr">name&lt;/span>: string;
    age?: number;
    [propName: string]: any;
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Tom'&lt;/span>,
    &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">'male'&lt;/span> &lt;span class="hljs-comment">// 可以加其他的属性&lt;/span>
};

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;只读属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface Person {
    readonly id: number; &lt;span class="hljs-comment">// &lt;/span>
    name: string;
    age?: number;
    [propName: string]: any;
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">id&lt;/span>: &lt;span class="hljs-number">89757&lt;/span>, &lt;span class="hljs-comment">// 只读&lt;/span>
    name: &lt;span class="hljs-string">'Tom'&lt;/span>,
    &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">'male'&lt;/span>
};
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-14">
      错误的写法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集&lt;/span>
interface Person {
    &lt;span class="hljs-attr">name&lt;/span>: string;
    age?: number;
    [propName: string]: string;
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Tom'&lt;/span>,
    &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-number">25&lt;/span>,
    &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">'male'&lt;/span>&#x274c;
};
上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;只读属性&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

&lt;span class="hljs-keyword">let&lt;/span> tom: Person = {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Tom'&lt;/span>,
    &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">'male'&lt;/span>
};

tom.id = &lt;span class="hljs-number">89757&lt;/span>; &lt;span class="hljs-comment">// 不能被二次赋值&#x274c;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-15">
      数组的类型
    </h1>
    
    <h2 class="heading" data-id="heading-16">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-keyword">let&lt;/span> fibonacci: number[] = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">5&lt;/span>];
&lt;span class="hljs-keyword">let&lt;/span> fibonacci: &lt;span class="hljs-built_in">Array&lt;/span>&lt;number&gt; = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">5&lt;/span>];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;用接口表示数组&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface NumberArray {
    [index: number]: number;
}
&lt;span class="hljs-keyword">let&lt;/span> fibonacci: NumberArray = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">5&lt;/span>];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;any 在数组中的应用&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-keyword">let&lt;/span> list: any[] = [&lt;span class="hljs-string">'Xcat Liu'&lt;/span>, &lt;span class="hljs-number">25&lt;/span>, { &lt;span class="hljs-attr">website&lt;/span>: &lt;span class="hljs-string">'http://xcatliu.com'&lt;/span> }];

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;类数组&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sum&lt;/span>() &lt;/span>{
    &lt;span class="hljs-keyword">let&lt;/span> args: IArguments = &lt;span class="hljs-built_in">arguments&lt;/span>;
}

&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-17">
      错误的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 数组的项中不允许出现其他的类型：&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> fibonacci: number[] = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-string">'1'&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">5&lt;/span>];&#x274c;

&lt;span class="hljs-comment">// push 方法只允许传入 number 类型的参数，但是却传了一个 string 类型的参数，所以报错了。&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> fibonacci: number[] = [&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>, &lt;span class="hljs-number">5&lt;/span>];
fibonacci.push(&lt;span class="hljs-string">'8'&lt;/span>);&#x274c;


&lt;span class="hljs-comment">// 类数组（Array-like Object）不是数组类型，比如 arguments&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sum&lt;/span>() &lt;/span>{&#x274c;
    &lt;span class="hljs-keyword">let&lt;/span> args: number[] = &lt;span class="hljs-built_in">arguments&lt;/span>;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-18">
      函数的类型
    </h1>
    
    <h2 class="heading" data-id="heading-19">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 需要把输入和输出都考虑到&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sum&lt;/span>(&lt;span class="hljs-params">x: number, y: number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> x + y;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;函数表达式&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-keyword">let&lt;/span> mySum = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">x: number, y: number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> x + y;
};
&lt;span class="hljs-comment">// 不要混淆了 TypeScript 中的 =&gt; 和 ES6 中的 =&gt;&lt;/span>
&lt;span class="hljs-keyword">let&lt;/span> mySum: &lt;span class="hljs-function">(&lt;span class="hljs-params">x: number, y: number&lt;/span>) =&gt;&lt;/span> number = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">x: number, y: number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> x + y;
};
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;接口定义函数的形状&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
interface SearchFunc {
    (source: string, &lt;span class="hljs-attr">subString&lt;/span>: string): boolean;
}

&lt;span class="hljs-keyword">let&lt;/span> mySearch: SearchFunc;
mySearch = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">source, subString&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> source.search(subString) !== &lt;span class="hljs-number">-1&lt;/span>;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;可选参数&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">buildName&lt;/span>(&lt;span class="hljs-params">firstName: string, lastName?: string&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> (lastName) {
        &lt;span class="hljs-keyword">return&lt;/span> firstName + &lt;span class="hljs-string">' '&lt;/span> + lastName;
    } &lt;span class="hljs-keyword">else&lt;/span> {
        &lt;span class="hljs-keyword">return&lt;/span> firstName;
    }
}
&lt;span class="hljs-keyword">let&lt;/span> tomcat = buildName(&lt;span class="hljs-string">'Tom'&lt;/span>, &lt;span class="hljs-string">'Cat'&lt;/span>);
&lt;span class="hljs-keyword">let&lt;/span> tom = buildName(&lt;span class="hljs-string">'Tom'&lt;/span>);


&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;参数默认值&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">buildName&lt;/span>(&lt;span class="hljs-params">firstName: string, lastName: string = &lt;span class="hljs-string">'Cat'&lt;/span>&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> firstName + &lt;span class="hljs-string">' '&lt;/span> + lastName;
}

&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;剩余参数&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
&lt;span class="hljs-comment">// rest 参数只能是最后一个参数，关于 rest 参数,是一个数组&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">push&lt;/span>(&lt;span class="hljs-params">array: any[], ...items: any[]&lt;/span>) &lt;/span>{
    items.forEach(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">item&lt;/span>) &lt;/span>{
        array.push(item);
    });
}

&lt;span class="hljs-keyword">let&lt;/span> a = [];
push(a, &lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>);


&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-20">
      错误的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 输入多余的（或者少于要求的）参数，是不被允许的：&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sum&lt;/span>(&lt;span class="hljs-params">x: number, y: number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> x + y;
}
sum(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>); &#x274c;
sum(&lt;span class="hljs-number">1&lt;/span>);&#x274c;

&lt;span class="hljs-comment">// 输入多余的（或者少于要求的）参数，是不被允许的：&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">sum&lt;/span>(&lt;span class="hljs-params">x: number, y: number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">return&lt;/span> x + y;
}
sum(&lt;span class="hljs-number">1&lt;/span>, &lt;span class="hljs-number">2&lt;/span>, &lt;span class="hljs-number">3&lt;/span>);

&lt;span class="hljs-comment">// 可选参数后面不允许再出现必须参数了：&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">buildName&lt;/span>(&lt;span class="hljs-params">firstName?: string, lastName: string&lt;/span>) &lt;/span>{&#x274c;
    &lt;span class="hljs-keyword">if&lt;/span> (firstName) {
        &lt;span class="hljs-keyword">return&lt;/span> firstName + &lt;span class="hljs-string">' '&lt;/span> + lastName;
    } &lt;span class="hljs-keyword">else&lt;/span> {
        &lt;span class="hljs-keyword">return&lt;/span> lastName;
    }
}
&lt;span class="hljs-keyword">let&lt;/span> tomcat = buildName(&lt;span class="hljs-string">'Tom'&lt;/span>, &lt;span class="hljs-string">'Cat'&lt;/span>);
&lt;span class="hljs-keyword">let&lt;/span> tom = buildName(&lt;span class="hljs-literal">undefined&lt;/span>, &lt;span class="hljs-string">'Tom'&lt;/span>);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-21">
      断言
    </h1>
    
    <h2 class="heading" data-id="heading-22">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 可以使用类型断言，将 something 断言成 string&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getLength&lt;/span>(&lt;span class="hljs-params">something: string | number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> ((&lt;string&gt;something).length) {
        return (&lt;string&gt;something).length;
    } else {
        return something.toString().length;
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-23">
      错误的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 只能访问此联合类型的所有类型里共有的属性或方法&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getLength&lt;/span>(&lt;span class="hljs-params">something: string | number&lt;/span>): &lt;span class="hljs-title">number&lt;/span> &lt;/span>{ &#x274c;
    &lt;span class="hljs-keyword">return&lt;/span> something.length;
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-24">
      类型别名
    </h1>
    
    <h2 class="heading" data-id="heading-25">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 使用 type 创建类型别名,类型别名常用于联合类型&lt;/span>
type Name = string;
type NameResolver = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> string;
type NameOrResolver = Name | NameResolver;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getName&lt;/span>(&lt;span class="hljs-params">n: NameOrResolver&lt;/span>): &lt;span class="hljs-title">Name&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-keyword">typeof&lt;/span> n === &lt;span class="hljs-string">'string'&lt;/span>) {
        &lt;span class="hljs-keyword">return&lt;/span> n;
    } &lt;span class="hljs-keyword">else&lt;/span> {
        &lt;span class="hljs-keyword">return&lt;/span> n();
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-26">
      枚举
    </h1>
    
    <h2 class="heading" data-id="heading-27">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天	&lt;/span>
&lt;span class="hljs-comment">// 枚举就是枚举值到枚举名进行反向映射&lt;/span>

enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
&lt;span class="hljs-built_in">console&lt;/span>.log(Days[&lt;span class="hljs-string">"Sun"&lt;/span>]); &lt;span class="hljs-comment">// 0&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(Days[&lt;span class="hljs-number">0&lt;/span>]); &lt;span class="hljs-comment">// 'Sun'&lt;/span>

enum Days {Sun = &lt;span class="hljs-number">7&lt;/span>, Mon = &lt;span class="hljs-number">1&lt;/span>, Tue, Wed, Thu, Fri, Sat};
&lt;span class="hljs-built_in">console&lt;/span>.log(Days[&lt;span class="hljs-string">"Sun"&lt;/span>]); &lt;span class="hljs-comment">// 7&lt;/span>

&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h1 class="heading" data-id="heading-28">
      类
    </h1>
    
    <h2 class="heading" data-id="heading-29">
      正确的做法
    </h2>
    
    <pre><code class="hljs bash copyable" lang="bash">&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;类&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    constructor(name) {
        this.name = name;
    }
    &lt;span class="hljs-function">&lt;span class="hljs-title">sayHi&lt;/span>&lt;/span>() {
        &lt;span class="hljs-built_in">return&lt;/span> `My name is &lt;span class="hljs-variable">${this.name}&lt;/span>`;
    }
}

&lt;span class="hljs-built_in">let&lt;/span> a = new Animal(&lt;span class="hljs-string">'Jack'&lt;/span>);
console.log(a.sayHi()); // My name is Jack
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;继承&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Cat extends Animal {
    constructor(name) {
        super(name); // 调用父类的 constructor(name)
        console.log(this.name);
    }
    &lt;span class="hljs-function">&lt;span class="hljs-title">sayHi&lt;/span>&lt;/span>() {
        &lt;span class="hljs-built_in">return&lt;/span> &lt;span class="hljs-string">'Meow, '&lt;/span> + super.sayHi(); // 调用父类的 sayHi()
    }
}

&lt;span class="hljs-built_in">let&lt;/span> c = new Cat(&lt;span class="hljs-string">'Tom'&lt;/span>); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;存储器&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    constructor(name) {
        this.name = name;
    }
    get &lt;span class="hljs-function">&lt;span class="hljs-title">name&lt;/span>&lt;/span>() {
        &lt;span class="hljs-built_in">return&lt;/span> &lt;span class="hljs-string">'Jack'&lt;/span>;
    }
    &lt;span class="hljs-built_in">set&lt;/span> name(value) {
        console.log(&lt;span class="hljs-string">'setter: '&lt;/span> + value);
        this.name = value;
    }
}

&lt;span class="hljs-built_in">let&lt;/span> a = new Animal(&lt;span class="hljs-string">'Kitty'&lt;/span>); // setter: Kitty
a.name = &lt;span class="hljs-string">'Tom'&lt;/span>; // setter: Tom
console.log(a.name); // Jack
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;静态方法&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
class Animal {
    static isAnimal(a) {
        &lt;span class="hljs-built_in">return&lt;/span> a instanceof Animal;
    }
}

&lt;span class="hljs-built_in">let&lt;/span> a = new Animal(&lt;span class="hljs-string">'Jack'&lt;/span>);
Animal.isAnimal(a); // &lt;span class="hljs-literal">true&lt;/span>
// 只能通过类名调用
a.isAnimal(a); // TypeError: a.isAnimal is not a &lt;span class="hljs-keyword">function&lt;/span> &#x274c;
&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;抽象类&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;&#x2796;
abstract class Animal {
  abstract makeSound():void
  move():void {
    console.log(&lt;span class="hljs-string">'roaming the earch...'&lt;/span>)
  }
}
// 子类必须实现抽象类的抽象方法
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h2 class="heading" data-id="heading-30">
      public private 和 protected
    </h2>
    
    <p>
      <code>public</code> 修饰的属性或方法是公有的，可以<strong>在任何地方被访问到</strong>，默认所有的属性和方法都是 <code>public</code> 的
    </p>
    
    <p>
      <code>private</code> 修饰的属性或方法是私有的，不能在<strong>声明它的类的外部</strong>访问
    </p>
    
    <p>
      <code>protected</code> 修饰的属性或方法是受保护的，它和 <code>private</code> 类似，<strong>区别是它在子类中也是允许被访问的</strong>
    </p>
    
    <h2 class="heading" data-id="heading-31">
      泛型
    </h2>
    
    <p>
      泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持
    </p>
    
    <h2 class="heading" data-id="heading-32">
      正确的做法
    </h2>
    
    <pre><code class="hljs js copyable" lang="js">&lt;span class="hljs-comment">//只能返回string类型的数据&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getData&lt;/span>(&lt;span class="hljs-params">value:string&lt;/span>):&lt;span class="hljs-title">string&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> value;
}

&lt;span class="hljs-comment">//同时返回 string类型 和number类型  （代码冗余）&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getData1&lt;/span>(&lt;span class="hljs-params">value:string&lt;/span>):&lt;span class="hljs-title">string&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> value;
}
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getData2&lt;/span>(&lt;span class="hljs-params">value:number&lt;/span>):&lt;span class="hljs-title">number&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> value;
}

&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;使用泛型后就可以解决这个问题
&lt;span class="hljs-comment">// T表示泛型，具体什么类型是调用这个方法的时候决定的&lt;/span>
&lt;span class="hljs-comment">// 表示参数是什么类型就返回什么类型~~~&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getData&lt;/span>&lt;&lt;span class="hljs-title">T&lt;/span>&gt;(&lt;span class="hljs-params">value:T&lt;/span>):&lt;span class="hljs-title">T&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> value;
}
getData&lt;number&gt;(&lt;span class="hljs-number">123&lt;/span>);
getData&lt;string&gt;(&lt;span class="hljs-string">'1214231'&lt;/span>);

&lt;span class="hljs-comment">// 定义接口&lt;/span>
interface ConfigFn{
    &lt;T&gt;(value:T):T;
}
&lt;span class="hljs-keyword">var&lt;/span> getData:ConfigFn=&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;&lt;span class="hljs-title">T&lt;/span>&gt;(&lt;span class="hljs-params">value:T&lt;/span>):&lt;span class="hljs-title">T&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> value;
}
getData&lt;string&gt;(&lt;span class="hljs-string">'张三'&lt;/span>);
getData&lt;string&gt;(&lt;span class="hljs-number">1243&lt;/span>);  &lt;span class="hljs-comment">//错误&lt;/span>
</code></pre>
  </div>
</div>

# 

参考  
https://juejin.im/post/5d53a8895188257fad671cbc

https://juejin.im/post/5c0a11e3e51d456ff54c09aa