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
## 编码规范
参考业界编码规范：
- <a href="https://codeguide.co/#html" target="_blank" rel="noopener noreferrer">HTML规范</a>
- <a href="https://f2e.alibaba-inc.com/markdown?spm=a2o8t.11089562.0.0.3e7e66543AXvOr&lark=fliggy%2Ffespec%2F6002" target="_blank" rel="noopener noreferrer">Airbnb JS规范</a>
- <a href="https://codeguide.co/#css" target="_blank" rel="noopener noreferrer">CSS规范</a>
- <a href="https://github.com/airbnb/javascript/master/react">Airbnb React规范</a>

目前[前端](https://www.w3cdoc.com)项目ESLINT配置：

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

## 编码原则

对于B类业务，写代码第一目标是稳定性，第二目标是可读性，第三目标是性能。

C类业务，性能可以排在第二，但B类业务应该排在第三。主要考虑是，B类业务逻辑复杂，代码体量大，代码的可读性是保证开发效率和后续持续维护过程中系统稳定性的生命线。所以，在没有性能问题时，不要为了优化性能而牺牲代码可读性。

以下所有模式和原则目标都是提高代码的可读性、可维护性。

### 开发原则

以下是面向对象设计的原则，react hooks更多的是函数式编程，参考下面函数式编程实践
1. 单一职责（SRP）
2. 开放—封闭原则（OCP）
3. Liskov替换原则（LSP）
4. 依赖倒置原则（DIP）
5. 接口隔离原则（ISP）
6. 合成复用原则
7. 迪米特最少知识原则

## 函数式编程最佳实践
业务开发推荐使用React Hooks编写组件，补充函数式编程最佳实践

原则
- 数据出入原则,一个函数，只要拥有入参，必然要有返回
- 无状态原则,一个函数，对外依赖，只能通过参数的形式依赖，不能直接依赖全局变量，同时，参数一定是immutable数据，函数体内不能对参数做引用操作
- 不可变原则,一个函数，不管是参数，还是其返回的数据类型，都不应该是可变数据，因为在js中是不存在原生的immutable的数据结构的，所以，[我们](https://www.w3cdoc.com)只要保证模块函数返回的数据每次都是一个新引用，而不是持续操作同一个数据引用。比如：

```
const func = (obj)=>{
   return {...obj}
}
```
- 最小粒度原则, 函数与功能的对应关系是完全一对一关系，禁止一个函数存在多个功能(以数学思路来说，就是写一系列的小型公式集合)
- 函数组合原则, 在最小粒度原则的前提下，需要借助函数组合原则构建出一个最终大函数(或者说是一个大公式)

## 最佳实践
避免使用javascript中的命令式语法(if/for/switch)

尽量使用封装好的函数库或者ES6/7原生可用函数API，比如map/reduce/some/every等等，但是，如果是遍历操作，推荐用reduce，因为借助reduce，可以在一次循环里做很多事情，性能可以提升很大，比如：

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
借助Promise链降低异步操作副作用

如果一个数据处理流有可能存在异步操作(与异步请求相关，或者与异步交互相关)，那这个函数的返回值推荐返回Promise对象

### 参数函数化

基于最小粒度原则与函数组合原则，如果要增强函数的能力，[我们](https://www.w3cdoc.com)是不可能在一个函数内部直接扩展它的功能，那样会造成函数越来越臃肿，所以，借助参数函数化，[我们](https://www.w3cdoc.com)可以轻松的把功能扩展解耦出去

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
### 返回函数化(科里化)
之前常说的科里化，其实就是函数返回值也是一个函数，这样所带来的好处是一个函数生产出一系列更加富有语义性，调用更加方便的函数集合，同时，它还可以用于减少参数数量。比如类型判断：

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
## Style规范

命名小写字母加连字符，嵌套选择器的深度不超过 3 层

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

## 参考资料
- <a href="https://eslint.org/docs/rules/">ESLint rules</a>
- <a href="https://github.com/mdo/code-guide">mdo/code guide</a>
- <a href="https://github.com/airbnb/javascript/master/react">Airbnb JavaScript Style Guide - React</a>

