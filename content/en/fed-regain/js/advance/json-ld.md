---
title: json-ld的用处
weight: 16
---

JSON-LD是 JavaScript Object Notation for Linked Data的缩写，是一种基于JSON表示和传输互联数据（Linked Data）的方法。可用于实施结构化数据。JSON-LD描述了如何通过JSON表示有向图，以及如何在一个文档中混合表示互联数据及非互联数据。JSON-LD的语法和JSON兼容。基于JSON-LD可以在基于Web的编程环境中使用互联数据，构造可互操作的互联数据Web服务（linked data web services），并向基于JSON的存储引擎中保存互联数据。

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，适合于服务器与JavaScript之间交换数据。对于JSON我们非常熟悉，但对于互联数据这个词，可能部分人会既熟悉而又觉得陌生，因为单字面意思已经很清楚，但要表达出其完整含义也并不容易。

互联数据可以说是语义网(Semantic Web)的一部分，但相较于1998年语义网概念的提出，互联数据这个一样显而易见的概念实际出现却要晚了数年。这些年我们一直在强调Web的语义，即便是HTML5那一堆新增标签也不外如是。语义并不是简单的将数据放到Web上，而是对于不仅仅是人，机器也必须都能识别并准确的处理以及高效的利用。而互联数据则更要求数据的指向性，当我们有部分数据时，即可找到对应的相关联的其他数据。当数据从数据库里被拼装成页面后，可能对于人而言找到数据可能轻而易举，但对于机器而言，很难将页面恢复到原始数据，也缺乏语义的判断。若无标准来统一语义和数据互联，对于机器来说整个Web其实是乱糟糟的。

为了使机器可以准确理解，处理和整合数据，我们有了语义Web。而其组成部分RDF(Resource Description Framework)即是用于描述网络资源的W3C标准。它使得语义Web技术相关的技术更加简单、不复杂以及面向一般开发人员。另外，与JSON-LD相似的RDFa(通过属性嵌入RDF)，同样是提供上下文，但属性嵌入到方式注定RDFa只适合小范围的片段嵌入以代替Mircodata，而难以用作大量纯粹数据的定义方式。

## 介绍
[JSON-LD官网](https://json-ld.org/)

[一篇很好介绍JSON-LD的文章](https://www.cloudbees.com/blog/json-ld-building-meaningful-data-apis#)

## 简述

看到这个新概念，那么首先就是要知道，它是干嘛的？我们来看一下一个JSON数据：
```
{
  "first_name": "Benjamin",
  "last_name": "Young",
  "alias": "BigBlueHat",
  "email": "byoung@bigbluehat.com"
}
```
对于这个JSON数据，我们可以知道这是一个人的个人信息，包含了他的姓名、别名以及电子邮箱。但是，对于一个电脑程序来说，他仅从first_name这样的字符串是很难判断某个字段的具体用途。此外，对于不同人写的程序，我这里可能用last_name来表示姓，但是换个人，就可能变成了LastName，或者是Name_last。所以，我们有什么办法，去引入一个比较归一的表示方法呢，于是便引入了JSON-LD。

JSON-LD
一个JSON-LD的例子：
```
{
  "@context": {
    "@vocab": "http://schema.org/",
    "first_name": "givenName",
    "last_name": "familyName",
    "alias": "alternateName",
    "email": "email"
  },
  "first_name": "Benjamin",
  "last_name": "Young",
  "alias": "BigBlueHat",
  "email": "byoung@bigbluehat.com"
}
```
我们可以看到， @context代表我们使用了JSON-LD进行了映射，@vocab代表了我们相对应的URL地址。例如，我们将first_name映射到了giveName(即http://shema.org/giveName) 。当别人或者一个程序拿到我们这样的数据，便可以通过查找http://shema.org/giveName了解到该字段的具体含义是什么，也就是让电脑理解了其中实际意义而不是一串冰冷的字符串。

如果我们的字段与映射网址的相同，还可以这样写：
```
{
  "@context": "http://schema.org/",
  "givenName": "Benjamin",
  "familyName": "Young",
  "alternateName": "BigBlueHat",
  "email": "byoung@bigbluehat.com"
}
```
当然，还有两种具体的coding使用方式。

一是Expansion：
```
[
  {
    "http://schema.org/alternateName": [
      {
        "@value": "BigBlueHat"
      }
    ],
    "http://schema.org/email": [
      {
        "@value": "byoung@bigbluehat.com"
      }
    ],
    "http://schema.org/givenName": [
      {
        "@value": "Benjamin"
      }
    ],
    "http://schema.org/familyName": [
      {
        "@value": "Young"
      }
    ]
  }
]
```
二是Compaction:
```
{
  "@context": {
    "@vocab": "http://schema.org/",
    "first_name": "givenName",
    "last_name": "familyName",
    "alias": "alternateName",
    "email": "email"
  },
  "alias": "BigBlueHat",
  "email": "byoung@bigbluehat.com",
  "last_name": "Young",
  "first_name": "Benjamin"
}
```
## 参考
1. [JSON-LD简介](https://blog.csdn.net/C_envelope/article/details/85453844)