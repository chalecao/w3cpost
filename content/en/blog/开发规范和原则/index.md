---
title: 开发规范和原则
PublishDate: 2020-11-10T09:19:42+01:00
weight: 50
images: ["R-C.jpeg"]
categories: ["工作"]
tags: []
contributors: ["万维刀客"]
pinned: false
homepage: false
---
<h1 id="VofzX" data-lake-id="ba27442ea36c9b4d8519734df1da57b7_h1_0" data-wording="true">
  编码规范
</h1>


  参考业界编码规范：

<ol start="1" data-lake-id="5c2c46997faa22de2fff4bdabca3edbe_ol_0">
 <a href="https://codeguide.co/#html" target="_blank" rel="noopener noreferrer">HTML规范</a>
 <a href="https://f2e.alibaba-inc.com/markdown?spm=a2o8t.11089562.0.0.3e7e66543AXvOr&lark=fliggy%2Ffespec%2F6002" target="_blank" rel="noopener noreferrer">Airbnb JS规范</a>
 <a href="https://codeguide.co/#css" target="_blank" rel="noopener noreferrer">CSS规范</a>
 <a href="https://github.com/airbnb/javascript/master/react">Airbnb React规范</a>
</ol>


  目前[前端](https://www.w3cdoc.com)项目ESLINT配置：

<div id="wJRum" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22json%22%2C%22code%22%3A%22%7B%5Cn%20%20%5C%22root%5C%22%3A%20true%2C%5Cn%20%20%5C%22parser%5C%22%3A%20%5C%22babel-eslint%5C%22%2C%5Cn%20%20%5C%22extends%5C%22%3A%20%5C%22eslint-config-airbnb%5C%22%2C%5Cn%20%20%5C%22parserOptions%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22ecmaVersion%5C%22%3A%206%2C%5Cn%20%20%20%20%5C%22ecmaFeatures%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%5C%22jsx%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%5C%22experimentalObjectRestSpread%5C%22%3A%20true%5Cn%20%20%20%20%7D%5Cn%20%20%7D%2C%5Cn%20%20%5C%22env%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22browser%5C%22%3A%20true%2C%5Cn%20%20%20%20%5C%22mocha%5C%22%3A%20true%5Cn%20%20%7D%2C%5Cn%20%20%5C%22plugins%5C%22%3A%20%5B%5Cn%20%20%20%20%5C%22react%5C%22%2C%5Cn%20%20%20%20%5C%22babel%5C%22%5Cn%20%20%5D%2C%5Cn%20%20%5C%22rules%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22react%2Fprefer-stateless-function%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-console%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-use-before-define%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Flabel-has-for%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fno-static-element-interactions%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fanchor-has-content%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fclick-events-have-key-events%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fanchor-is-valid%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fno-array-index-key%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22func-names%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22arrow-body-style%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fsort-comp%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fprop-types%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fjsx-first-prop-new-line%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fjsx-filename-extension%5C%22%3A%20%5B%5Cn%20%20%20%20%20%201%2C%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22extensions%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22.js%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22.jsx%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22import%2Fextensions%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22import%2Fno-unresolved%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22import%2Fno-extraneous-dependencies%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22prefer-destructuring%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-param-reassign%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-return-assign%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22max-len%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22consistent-return%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-redeclare%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Frequire-extension%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fno-danger%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22comma-dangle%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%5C%22error%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22always-multiline%5C%22%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22function-paren-newline%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22object-curly-newline%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-restricted-globals%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22linebreak-style%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%5C%22error%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22unix%5C%22%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22no-restricted-syntax%5C%22%3A%200%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22wJRum%22%2C%22height%22%3A298.764%7D" data-language="json">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
{
  "root": true,
  "parser": "babel-eslint",
  "extends": "eslint-config-airbnb",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "browser": true,
    "mocha": true
  },
  "plugins": [
    "react",
    "babel"
  ],
  "rules": {
    "react/prefer-stateless-function": ,
    "no-console": ,
    "no-use-before-define": ,
    "jsx-a11y/label-has-for": ,
    "jsx-a11y/no-static-element-interactions": ,
    "jsx-a11y/anchor-has-content": ,
    "jsx-a11y/click-events-have-key-events": ,
    "jsx-a11y/anchor-is-valid": ,
    "react/no-array-index-key": ,
    "func-names": ,
    "arrow-body-style": ,
    "react/sort-comp": ,
    "react/prop-types": ,
    "react/jsx-first-prop-new-line": ,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "import/extensions": ,
    "import/no-unresolved": ,
    "import/no-extraneous-dependencies": ,
    "prefer-destructuring": ,
    "no-param-reassign": ,
    "no-return-assign": ,
    "max-len": ,
    "consistent-return": ,
    "no-redeclare": ,
    "react/require-extension": ,
    "react/no-danger": ,
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "function-paren-newline": ,
    "object-curly-newline": ,
    "no-restricted-globals": ,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-restricted-syntax": 
  }
}
```
    </div>
  </div>
</div>

<h1 id="U8iwq" data-lake-id="c141ff99e17ac1e59520e8ea891bda12_h1_1" data-wording="true">
  编码原则
</h1>


 对于B类业务，写代码第一目标是稳定性，第二目标是可读性，第三目标是性能。


  C类业务，性能可以排在第二，但B类业务应该排在第三。主要考虑是，B类业务逻辑复杂，代码体量大，代码的可读性是保证开发效率和后续持续维护过程中系统稳定性的生命线。所以，在没有性能问题时，不要为了优化性能而牺牲代码可读性。


  以下所有模式和原则目标都是提高代码的可读性、可维护性。

<h2 id="zmCaP" data-lake-id="3e9b8402949a9e9caa3eeca696313fec_h2_0" data-wording="true">
  开发原则




  以下是面向对象设计的原则，react hooks更多的是函数式编程，参考下面函数式编程实践


  1. 单一职责（SRP）


  2. 开放—封闭原则（OCP）


  3. Liskov替换原则（LSP）


  4. 依赖倒置原则（DIP）


  5. 接口隔离原则（ISP）


  6. 合成复用原则


  7. 迪米特最少知识原则

<h1 id="6yXhB" data-lake-id="94f669e4f907c7e307a7b8f5b72591fd_h1_2" data-wording="true">
  函数式编程最佳实践
</h1>


  业务开发推荐使用React Hooks编写组件，补充函数式编程最佳实践

<h2 id="Lcq0z" data-lake-id="68f501de2bf9b304d9d75c44c3e6d574_h2_1" data-wording="true">
  原则




 数据出入原则



  一个函数，只要拥有入参，必然要有返回


 无状态原则



  一个函数，对外依赖，只能通过参数的形式依赖，不能直接依赖全局变量，同时，参数一定是immutable数据，函数体内不能对参数做引用操作


 不可变原则



  一个函数，不管是参数，还是其返回的数据类型，都不应该是可变数据，因为在js中是不存在原生的immutable的数据结构的，所以，[我们](https://www.w3cdoc.com)只要保证模块函数返回的数据每次都是一个新引用，而不是持续操作同一个数据引用。比如：

<div id="6781d28a" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%226781d28a%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20func%20%3D%20(obj)%3D%3E%7B%5Cn%20%20%20return%20%7B...obj%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
const func = (obj)=>{
   return {...obj}
}
```
    </div>
  </div>
</div>


 最小粒度原则



  函数与功能的对应关系是完全一对一关系，禁止一个函数存在多个功能(以数学思路来说，就是写一系列的小型公式集合)


 函数组合原则



  在最小粒度原则的前提下，需要借助函数组合原则构建出一个最终大函数(或者说是一个大公式)

<h2 id="kkc4e" data-lake-id="aed10e42caab95c8cea1ceda90f0f592_h2_2" data-wording="true">
  最佳实践




 避免使用javascript中的命令式语法(if/for/switch)



  尽量使用封装好的函数库或者ES6/7原生可用函数API，比如map/reduce/some/every等等，但是，如果是遍历操作，推荐用reduce，因为借助reduce，可以在一次循环里做很多事情，性能可以提升很大，比如：

<div id="e03169ec" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22e03169ec%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20result%20%3D%20arr.map((item)%3D%3E%7B%5Cn%20%20return%20item.age%5Cn%7D).filter(item%3D%3Eitem%20%3E%2018)%5Cn%5Cn%2F%2F%20good%5Cnconst%20result%20%3D%20arr.reduce((buf%2Citem)%3D%3E%7B%5Cn%20%20%20return%20item.age%20%3E%2018%20%3F%20buf.concat(item.age)%20%3A%20buf%5Cn%7D%2C%5B%5D)%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
// bad
const result = arr.map((item)=>{
  return item.age
}).filter(item=>item > 18)

// good
const result = arr.reduce((buf,item)=>{
   return item.age > 18 ? buf.concat(item.age) : buf
},[])
```
    </div>
  </div>
</div>


 借助Promise链降低异步操作副作用



  如果一个数据处理流有可能存在异步操作(与异步请求相关，或者与异步交互相关)，那这个函数的返回值推荐返回Promise对象


 参数函数化



  基于最小粒度原则与函数组合原则，如果要增强函数的能力，[我们](https://www.w3cdoc.com)是不可能在一个函数内部直接扩展它的功能，那样会造成函数越来越臃肿，所以，借助参数函数化，[我们](https://www.w3cdoc.com)可以轻松的把功能扩展解耦出去

<div id="7e320a07" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%227e320a07%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20handler%20%3D%20(data%2Coptions)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(options.ext1)%7B%5Cn%20%20%20%20%20%20....%20extension%201%20handler%5Cn%20%20%20%7D%5Cn%20%20%20%5Cn%20%20%20if(options.ext2)%7B%5Cn%20%20%20%20%20%20....%20extension%202%20handler%5Cn%20%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%20good%5Cnconst%20handler%20%3D%20(data%2Cfunc)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(isFn(func))%7B%5Cn%20%20%20%20%20%20....%20func(data)%5Cn%20%20%20%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
// bad
const handler = (data,options)=>{
   ....default handler
   if(options.ext1){
      .... extension 1 handler
   }

   if(options.ext2){
      .... extension 2 handler
   }
}

// good
const handler = (data,func)=>{
   ....default handler
   if(isFn(func)){
      .... func(data)
   }
}
```
    </div>
  </div>
</div>


 返回函数化(科里化)



  之前常说的科里化，其实就是函数返回值也是一个函数，这样所带来的好处是一个函数生产出一系列更加富有语义性，调用更加方便的函数集合，同时，它还可以用于减少参数数量。比如类型判断：

<div id="a4a06213" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22a4a06213%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%E8%BF%87%E5%8E%BB%5Cnconst%20isType%20%3D%20(value%2Ctype)%3D%3E%7B%5Cn%20%20%20return%20value%20!%3D%20null%20%26%26%20Object.prototype.toString.call(value)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cn%7D%5Cn%2F%2F%E4%BD%BF%E7%94%A8%E7%9A%84%E6%97%B6%E5%80%99%E5%BE%88%E9%BA%BB%E7%83%A6%EF%BC%8C%E6%AF%8F%E6%AC%A1%E9%83%BD%E9%9C%80%E8%A6%81%E4%BC%A0%E4%B8%A4%E4%B8%AA%E5%8F%82%E6%95%B0%5Cnif(isType(%7B%7D%2C%5C%22Array%5C%22))%7B....%7D%5Cn%5Cn%2F%2F%E7%8E%B0%E5%9C%A8%5Cnconst%20isType%20%3D%20type%20%3D%3E%20obj%20%3D%3E%5Cn%20%20%20%20obj%20!%3D%20null%20%26%26%20Object.prototype.toString.call(obj)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cnconst%20isFn%20%3D%20isType(%5C%22Function%5C%22)%5Cnconst%20isArr%20%3D%20isType('Array')%5Cn%5Cnif(isFn(%7B%7D))%7B...%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
//过去
const isType = (value,type)=>{
   return value != null && Object.prototype.toString.call(value) === `[object ${type}]`
}
//使用的时候很麻烦，每次都需要传两个参数
if(isType({},"Array")){....}

//现在
const isType = type => obj =>
    obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`
const isFn = isType("Function")
const isArr = isType('Array')

if(isFn({})){...}
```
    </div>
  </div>
</div>

<h2 id="XaGbk" data-lake-id="b9de6612e91ccd02347ab4bd13ff80ba_h2_3" data-wording="true">
  Style规范




  命名小写字母加连字符，嵌套选择器的深度不超过 3 层

<div id="YS8w1" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22css%22%2C%22code%22%3A%22%2F*%20bad%20*%2F%5Cn.mod_example%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%5Cn.modExample%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%5Cn%5Cn%2F*%20good%20*%2F%5Cn.mod-example%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%22%2C%22id%22%3A%22YS8w1%22%7D" data-language="css">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      ```
/*bad*/
.mod_example {
  padding-left: 15px;
}
.modExample {
  padding-left: 15px;
}

/*good*/
.mod-example {
  padding-left: 15px;
}
```
    </div>
  </div>
</div>

<h2 id="zmCaP" data-lake-id="3e9b8402949a9e9caa3eeca696313fec_h2_0">
  开发原则




  在软件开发中，为了提高软件系统的可维护性和可复用性，增加软件的可扩展性和灵活性，程序员要尽量根据 7 条原则来开发程序，从而提高软件开发效率、节约软件开发成本和维护成本。<br /> 以下是面向对象设计的原则，react hooks更多的是函数式编程，参考下面函数式编程实践


  1. 单一职责（SRP）


  2. 开放—封闭原则（OCP）


  3. Liskov替换原则（LSP）


  4. 依赖倒置原则（DIP）


  5. 接口隔离原则（ISP）


  6. 合成复用原则


  7. 迪米特最少知识原则

<h1 id="6yXhB" data-lake-id="94f669e4f907c7e307a7b8f5b72591fd_h1_2">
  函数式编程最佳实践
</h1>


  业务开发推荐使用React Hooks编写组件，补充函数式编程最佳实践

<h2 id="Lcq0z" data-lake-id="68f501de2bf9b304d9d75c44c3e6d574_h2_1">
  原则




  数据出入原则



  一个函数，只要拥有入参，必然要有返回


  无状态原则



  一个函数，对外依赖，只能通过参数的形式依赖，不能直接依赖全局变量，同时，参数一定是immutable数据，函数体内不能对参数做引用操作


  不可变原则



  一个函数，不管是参数，还是其返回的数据类型，都不应该是可变数据，因为在js中是不存在原生的immutable的数据结构的，所以，[我们](https://www.w3cdoc.com)只要保证模块函数返回的数据每次都是一个新引用，而不是持续操作同一个数据引用。比如：

<div id="6781d28a" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%226781d28a%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20func%20%3D%20(obj)%3D%3E%7B%5Cn%20%20%20return%20%7B...obj%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      ```
const func = (obj)=>{
   return {...obj}
}
```
    </div>
  </div>
</div>


  最小粒度原则



  函数与功能的对应关系是完全一对一关系，禁止一个函数存在多个功能(以数学思路来说，就是写一系列的小型公式集合)


  函数组合原则



  在最小粒度原则的前提下，需要借助函数组合原则构建出一个最终大函数(或者说是一个大公式)

<h2 id="kkc4e" data-lake-id="aed10e42caab95c8cea1ceda90f0f592_h2_2">
  最佳实践




  避免使用javascript中的命令式语法(if/for/switch)



  尽量使用封装好的函数库或者ES6/7原生可用函数API，比如map/reduce/some/every等等，但是，如果是遍历操作，推荐用reduce，因为借助reduce，可以在一次循环里做很多事情，性能可以提升很大，比如：

<div id="e03169ec" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22e03169ec%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20result%20%3D%20arr.map((item)%3D%3E%7B%5Cn%20%20return%20item.age%5Cn%7D).filter(item%3D%3Eitem%20%3E%2018)%5Cn%5Cn%2F%2F%20good%5Cnconst%20result%20%3D%20arr.reduce((buf%2Citem)%3D%3E%7B%5Cn%20%20%20return%20item.age%20%3E%2018%20%3F%20buf.concat(item.age)%20%3A%20buf%5Cn%7D%2C%5B%5D)%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      ```
// bad
const result = arr.map((item)=>{
  return item.age
}).filter(item=>item > 18)

// good
const result = arr.reduce((buf,item)=>{
   return item.age > 18 ? buf.concat(item.age) : buf
},[])
```
    </div>
  </div>
</div>


  借助Promise链降低异步操作副作用



  如果一个数据处理流有可能存在异步操作(与异步请求相关，或者与异步交互相关)，那这个函数的返回值推荐返回Promise对象


  参数函数化



  基于最小粒度原则与函数组合原则，如果要增强函数的能力，[我们](https://www.w3cdoc.com)是不可能在一个函数内部直接扩展它的功能，那样会造成函数越来越臃肿，所以，借助参数函数化，[我们](https://www.w3cdoc.com)可以轻松的把功能扩展解耦出去

<div id="7e320a07" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%227e320a07%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20handler%20%3D%20(data%2Coptions)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(options.ext1)%7B%5Cn%20%20%20%20%20%20....%20extension%201%20handler%5Cn%20%20%20%7D%5Cn%20%20%20%5Cn%20%20%20if(options.ext2)%7B%5Cn%20%20%20%20%20%20....%20extension%202%20handler%5Cn%20%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%20good%5Cnconst%20handler%20%3D%20(data%2Cfunc)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(isFn(func))%7B%5Cn%20%20%20%20%20%20....%20func(data)%5Cn%20%20%20%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      ```
// bad
const handler = (data,options)=>{
   ....default handler
   if(options.ext1){
      .... extension 1 handler
   }

   if(options.ext2){
      .... extension 2 handler
   }
}

// good
const handler = (data,func)=>{
   ....default handler
   if(isFn(func)){
      .... func(data)
   }
}
```
    </div>
  </div>
</div>


  返回函数化(科里化)



  之前常说的科里化，其实就是函数返回值也是一个函数，这样所带来的好处是一个函数生产出一系列更加富有语义性，调用更加方便的函数集合，同时，它还可以用于减少参数数量。比如类型判断：

<div id="a4a06213" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22a4a06213%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%E8%BF%87%E5%8E%BB%5Cnconst%20isType%20%3D%20(value%2Ctype)%3D%3E%7B%5Cn%20%20%20return%20value%20!%3D%20null%20%26%26%20Object.prototype.toString.call(value)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cn%7D%5Cn%2F%2F%E4%BD%BF%E7%94%A8%E7%9A%84%E6%97%B6%E5%80%99%E5%BE%88%E9%BA%BB%E7%83%A6%EF%BC%8C%E6%AF%8F%E6%AC%A1%E9%83%BD%E9%9C%80%E8%A6%81%E4%BC%A0%E4%B8%A4%E4%B8%AA%E5%8F%82%E6%95%B0%5Cnif(isType(%7B%7D%2C%5C%22Array%5C%22))%7B....%7D%5Cn%5Cn%2F%2F%E7%8E%B0%E5%9C%A8%5Cnconst%20isType%20%3D%20type%20%3D%3E%20obj%20%3D%3E%5Cn%20%20%20%20obj%20!%3D%20null%20%26%26%20Object.prototype.toString.call(obj)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cnconst%20isFn%20%3D%20isType(%5C%22Function%5C%22)%5Cnconst%20isArr%20%3D%20isType('Array')%5Cn%5Cnif(isFn(%7B%7D))%7B...%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      ```
//过去
const isType = (value,type)=>{
   return value != null && Object.prototype.toString.call(value) === `[object ${type}]`
}
//使用的时候很麻烦，每次都需要传两个参数
if(isType({},"Array")){....}

//现在
const isType = type => obj =>
    obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`
const isFn = isType("Function")
const isArr = isType('Array')

if(isFn({})){...}
```
    </div>
  </div>
</div>

## 参考资料 {#3a6e0aba}

* [Airbnb JavaScript Style Guide][2]

* [Google JavaScript Style Guide][3]

* [SonarJS rules][4]


  <a href="https://eslint.org/docs/rules/">ESLint rules</a>


  <a href="https://github.com/mdo/code-guide">mdo/code guide</a>


  <a href="https://github.com/airbnb/javascript/master/react">Airbnb JavaScript Style Guide - React</a>

