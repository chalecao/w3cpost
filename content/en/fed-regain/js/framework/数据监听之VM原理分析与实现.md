---
title: 数据监听之VM原理分析与实现



  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/jpg.jpeg

  - 1259




---
<img loading="lazy" class="alignnone" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/jpg.jpeg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/jpg.jpeg?x-oss-process=image/format,webp" alt="" width="480" height="270" />

## 数据监听之VM原理分析与实现

  <span style="color: #ff0000;">课程地址</span>：

  Github代码：

## [前端](https://www.w3cdoc.com)进阶系列课程

《用JavaScript自己写MVVM[前端](https://www.w3cdoc.com)框架》：<https://t.cn/REeKJp0>

《[前端](https://www.w3cdoc.com)函数式编程FP易学易用》：<https://t.cn/REeKVSk>

《[前端](https://www.w3cdoc.com)自己用NodeJS编写区块链BlockChain》：<https://t.cn/REeoF7v>

《程序语言进阶之DSL与AST实战解析》：<https://t.cn/R3XoQJA>

&nbsp;

## 课程内容

第一章： JSX回顾

* JSX编译原理

第二章：实现数据监听的方法

* Object.define方法
* ES6之Proxy与Reflect

第三章：实现数据监听

*

&nbsp;

## 第一章： JSX回顾

回顾一下之前[我们](https://www.w3cdoc.com)学过的《 [用JavaScript自己写Virtual DOM][1] 》，上面这个例子是[我们](https://www.w3cdoc.com)之前介绍JSX语法构建Virtual DOM的最简单的方案。[我们](https://www.w3cdoc.com)在课程《 [程序语言进阶之DSL与AST实战解析][2] 》中介绍了JSX的实现原理，代码编译的时候会处理JSX文件，根据配置或者页面的注释，基于babylon做词法分析，会拆解代码中的html片段，然后转换成函数形式。如下：

<pre id="consoleLog">var a = h(
  "ul",
  { "class": "list" },
  h(
    "li",
    null,
    "item 1"
  ),
  h(
    "li",
    null,
    "item 2"
  )
);</pre>

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/hanshushibianchengyuvirtualdom/
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/chengxuyuyanjinjiezhidslyuastshizhanjiexi/
