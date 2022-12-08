---
title: 用JavaScript自己写Virtual DOM

---
# 用JavaScript自己写virtual DOM

<img loading="lazy" class="aligncenter size-full wp-image-3177" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/9313cf7374a848d69a6ed699596f918f.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/9313cf7374a848d69a6ed699596f918f.jpg?x-oss-process=image/format,webp" alt="" width="450" height="250" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/9313cf7374a848d69a6ed699596f918f.jpg?x-oss-process=image/format,webp 450w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/9313cf7374a848d69a6ed699596f918f.jpg?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_167/format,webp 300w" sizes="(max-width: 450px) 100vw, 450px" />

  <span style="color: #ff0000;">课程地址</span>： <a href="https://t.cn/REeKJp0">https://t.cn/REeKJp0</a>

  Github代码： <a href="https://github.com/chalecao/virtualdom">https://github.com/chalecao/virtualdom</a>

<h1 style="text-align: left;">
  [前端](https://www.w3cdoc.com)进阶系列课程
</h1>


  <!-- /wp:heading -->


  <!-- wp:paragraph -->


  《用JavaScript自己写MVVM[前端](https://www.w3cdoc.com)框架》：<a href="https://t.cn/REeKJp0">https://t.cn/REeKJp0</a>


  <!-- /wp:paragraph -->


  <!-- wp:paragraph -->


  《[前端](https://www.w3cdoc.com)函数式编程FP易学易用》：<a href="https://t.cn/REeKVSk">https://t.cn/REeKVSk</a>


  <!-- /wp:paragraph -->


  <!-- wp:paragraph -->


  《[前端](https://www.w3cdoc.com)自己用NodeJS编写区块链BlockChain》：<a href="https://t.cn/REeoF7v">https://t.cn/REeoF7v</a>


  <!-- /wp:paragraph -->


  <!-- wp:paragraph -->


  《程序语言进阶之DSL与AST实战解析》：<a href="https://t.cn/R3XoQJA">https://t.cn/R3XoQJA</a>

《高性能web[前端](https://www.w3cdoc.com)网页优化开发实战》：[学习在线视频教程][1] 《机器学习python与tensorflow实战》：[在线学习视频教程][2]

<div class="u-ctn-intro j-course-user-box">
  <h1 class="u-ctit ctit1">
    适用人群
  </h1>
 帮助[前端](https://www.w3cdoc.com)感兴趣的同学理解Virtual DOM相关知识，需要有HTML基础和JavaScript基础知识（含ES5和ES6）即可。
</div>

<div class="u-ctn-intro u-ctn-intro-last">
  <div class="cintrocon j-courseintro">
    关于MVVM[前端](https://www.w3cdoc.com)框架[大家](https://www.w3cdoc.com)都有了解，或多或少的使用过，比如Angular，React，VUE等等。那么你是否也想自己手写一个MVVM的[前端](https://www.w3cdoc.com)框架呢，[我们](https://www.w3cdoc.com)从Virtual DOM入手，手把手教你写基于Virtual DOM的[前端](https://www.w3cdoc.com)框架，在整个编写的过程中，希望[大家](https://www.w3cdoc.com)学习更多，理解更多。 学完本课程，推荐本系列下个专题《函数式编程FP易学易用》，让你理解更深刻，编程水平更上一层楼。 喜爱编程的小伙伴们，我希望您和我一样都是行动派。[我们](https://www.w3cdoc.com)做事踏踏实实、风风火火，要做就做最好，不吹牛x。习大大教导[我们](https://www.w3cdoc.com)，只要技术扎实，到哪都能吃麻辣香锅！！！  
  </div>
  <div class="chapter">
    <h1>
      课程大纲
    </h1>

    <h2 class="chapterhead">
      <span class="f-fl f-thide chaptertitle">章节1: </span><span class="f-fl f-thide chaptername">认识DOM与VirtualDOM</span>
    

    
    <div id="auto-id-1520315402977" class="section" data-lesson="0">
      <img loading="lazy" class="alignnone wp-image-1838 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180501-134343.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180501-134343.jpg?x-oss-process=image/resize,m_fill,w_1024,h_560/format,webp" alt="" width="515" height="282" />
    </div>
  </div>
</div>

<div data-lesson="0">

</div>

<div data-lesson="0">
  真实的DOM是网页上的文档对象模型，由一个个HTML元素节点构成的树形结构。
</div>

<div data-lesson="0">

</div>

<div class="u-ctn-intro u-ctn-intro-last">
  <div class="chapter">
    <div data-lesson="0">
      <img loading="lazy" class="alignnone wp-image-1839 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180501-134741.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180501-134741.jpg?x-oss-process=image/resize,m_fill,w_1024,h_581/format,webp" alt="" width="511" height="290" />
    </div>
  </div>
</div>

<div data-lesson="0">

</div>

<div data-lesson="0">
  如图中所示，[我们](https://www.w3cdoc.com)用JS创建出来的节点就是虚拟节点，Virtual node，当然由这些虚拟节点vd构成的树形结构就称为虚拟DOM，Virtual DOM。[我们](https://www.w3cdoc.com)本节课介绍的就是要如何创建这样的虚拟DOM。
</div>

<div data-lesson="0">

</div>

<div class="u-ctn-intro u-ctn-intro-last">
  <div class="chapter">
    <h2 class="chapterhead">
      <span class="f-fl f-thide chaptertitle">章节2: </span><span class="f-fl f-thide chaptername">如何构建VirtualDOM</span>
    


    <h3 id="auto-id-1520315402981" class="section" data-lesson="1">
      <span class="f-fl f-thide ks">    课时2  </span><span class="f-fl f-thide ksname" title="构建Virtual Node">构建Virtual Node</span>
    </h3>
    
    <img loading="lazy" class="aligncenter" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/05/93f86aa8283fa3c1429277d332f86bf0.png" width="514" height="342" /> 首先[我们](https://www.w3cdoc.com)需要分析一个node节点的构成，比如他的节点类型type，节点属性的集合props，子元素的集合。这样[我们](https://www.w3cdoc.com)就可以抽象一个数据模型来表示这个节点。虚拟DOM是由许多虚拟节点按照层级结构组合起来的，那么[我们](https://www.w3cdoc.com)实现虚拟节点的数据模型抽象之后，就可以构建虚拟DOM的数据模型抽象。 
    
    <h3 id="auto-id-1520315402985" class="section" data-lesson="2">
      <span class="f-fl f-thide ks">    课时3  </span><span class="f-fl f-thide ksname" title="构建VirtualDOM">构建VirtualDOM</span>
    </h3>
  </div> 手工实现DOM模型构建不太合理，[我们](https://www.w3cdoc.com)可以借助JSX的工具来完成这个转换。本节[我们](https://www.w3cdoc.com)以rollup打包工具结合babel转换插件实现数据的抽象。具体代码配置参考：
  <a href="https://github.com/chalecao/virtualdom">github中package.json配置和rollup.config.js</a> <img loading="lazy" class="alignnone wp-image-1844 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/22-1.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/22-1.jpg?x-oss-process=image/resize,m_fill,w_1024,h_639/format,webp" alt="" width="510" height="318" /> <img loading="lazy" class="alignnone wp-image-1843 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/333.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/333.jpg?x-oss-process=image/resize,m_fill,w_1024,h_612/format,webp" alt="" width="505" height="302" />
  ```
const vdom = (
    &lt;div id="_Q5" style="border: 1px solid red;">
        &lt;div style="text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;">
            &lt;img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" height="56" style="border: none; margin: 8px 0px;">&lt;/img>
            hello
        &lt;/div>
    &lt;/div>)

``` 上面[我们](https://www.w3cdoc.com)定义的vdom片段采用JSX处理器处理后如下面代码：
  ```
/*fed123.com*/
'use strict';

var vdom = vnode(
    "div",
    { id: "_Q5", style: "border: 1px solid red;" },
    vnode(
        "div",
        { style: "text-align: center; margin: 36px auto 18px; width: 160px; line-height: 0;" },
        vnode("img", { src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png", height: "56", style: "border: none; margin: 8px 0px;" }),
        "google"
    )
);

``` 是不是很好理解，JSX编译后会自动根据定义好的语法格式提取出元素的类型和属性和子元素，并填入vnode方法中，[我们](https://www.w3cdoc.com)只需要实现vnode方法就可以。[我们](https://www.w3cdoc.com)可以编写
  vnode方法用于构建虚拟节点的模型，编写createElement方法用于根据vnode模型创建元素。并且把vnode的子元素追加到父元素上，形成树形层级结构。
  ```
function vnode(type, props, ...children) {
    return { type, props, children };
  }

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}
document.body.appendChild(createElement(vdom));

``` 这样[我们](https://www.w3cdoc.com)就完成了虚拟节点vnode和虚拟vDOM的构建。
  <div class="chapter">
    <h2 class="chapterhead">
      <span class="f-fl f-thide chaptertitle">章节3: </span><span class="f-fl f-thide chaptername">Diff VirtualDOM 与Update DOM</span>
    

  </div>
</div>

<img loading="lazy" class="alignnone wp-image-1845 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/555.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/555.jpg?x-oss-process=image/resize,m_fill,w_1024,h_590/format,webp" alt="" width="494" height="285" /> 如图展示了最简单的一层DOM的结构变化，无非也就这么几种：<span style="color: #ff0000;">增加元素节点、修改节点，删除节点</span>。[我们](https://www.w3cdoc.com)可以基于DOM API来实现这些基本的操作，代码如下：

```
function updateElement($parent, newnode, oldnode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!newnode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (!oldnode) {
        $parent.appendChild(createElement(newnode));
    } else if (isChange(newnode, oldnode)) {
        $parent.replaceChild(createElement(newnode), $parent.childNodes[index]);
    } else if (newnode.type) {
        var newL = newnode.children.length;
        var oldL = oldnode.children.length;
        for (var i = 0; i &lt; newL || i &lt; oldL; i++) {
            updateElement($parent.childNodes[index], newnode.children[i], oldnode.children[i], i);
        }
    }
}

```

<div class="u-ctn-intro u-ctn-intro-last">
  <div class="chapter">
    上面的代码中[我们](https://www.w3cdoc.com)实际上是把diff VirtualDOM 和update vdom放在一起处理了，采用了<span style="color: #ff0000;">深度优先遍历的算法</span>，从根节点优先查到子节点，判断子节点是否变化，有变化就进行变更处理，然后再回到上级节点。

    <h2 class="chapterhead">
      <span class="f-fl f-thide chaptertitle">章节4: </span><span class="f-fl f-thide chaptername">处理DOM属性和事件绑定</span>
    

    
    <div id="auto-id-1520315402997" class="section" data-lesson="5">
      ```
{
  type: “div”,
  &lt;span style="color: #ff0000;">props&lt;/span>: {“style”: ”…”},
  children: [
      {type: “img”, props: {“src”: ”…”}
]}

``` 上面[我们](https://www.w3cdoc.com)抽取的vnode的模型中已经把props拿出来了，[我们](https://www.w3cdoc.com)这里需要把这些样式设置到对应元素上就好了。[我们](https://www.w3cdoc.com)先看下元素的属性变化有哪几种情况：

      <img loading="lazy" class="alignnone wp-image-1846 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/666.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/666.jpg?x-oss-process=image/resize,m_fill,w_1024,h_658/format,webp" alt="" width="515" height="331" /> 如上，元素属性可以增加可以减少，[我们](https://www.w3cdoc.com)通过DOM API实现属性的更新操作，代码如下： 
      
      ```
//handle props

function setProp($el, name, value) {
    if (typeof value == "boolean") {
        handleBoolProp($el, name, value);
    } else {
        $el.setAttribute(name, value);
    }
}
function handleBoolProp($el, name, value) {
    if (!!value) {
        $el.setAttribute(name, value);
        $el[name] = !!value;
    } else {
        $el[name] = !!value;
    }
}
function removeProp($el, name, value) {
    if (typeof value == "boolean") {
        $el[name] = false;
    }
    $el.removeAttribute(name, value);
}
function updateProp($el, name, newvalue, oldValue) {
    if (!newvalue) {
        removeProp($el, name, oldValue);
    } else if (!oldValue || newvalue != oldValue) {
        setProp($el, name, newvalue);
    }
}
function updateProps($el) {
    var newprops = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _props = Object.assign({}, newprops, oldProps);
    Object.keys(_props).forEach(function (key) {
        updateProp($el, key, newprops[key], oldProps[key]);
    });
}

``` 代码比较长，但是思路很清晰的，就是更新元素的属性，中间对于一些特殊bool类型属性做了特殊处理，bool类型的属性用元素可以直接访问的，所以[我们](https://www.w3cdoc.com)把这些布尔属性的值也挂到了元素上。然后[我们](https://www.w3cdoc.com)在更新元素的时候就可以先更新下属性。

      ```
function updateElement($parent, newnode, oldnode, index = 0) {
    if (!newnode) {
        $parent.removeChild($parent.childNodes[index])
    } else if (!oldnode) {
        $parent.appendChild(createElement(newnode))
    } else if (isChange(newnode, oldnode)) {
        $parent.replaceChild(createElement(newnode),
            $parent.childNodes[index])
    } else if (newnode.type) {
       &lt;span style="color: #ff0000;"> updateProps($el, newnode.props, oldnode.props)&lt;/span>
        let newL = newnode.children.length;
        let oldL = oldnode.children.length;
        for (var i = 0; i &lt; newL || i &lt; oldL; i++) {
            updateElement($parent.childNodes[index],
                newnode.children[i],
                oldnode.children[i],
                i);
        }
    }
}

```  
    </div>

    <h2 class="section" data-lesson="5">
      <span class="f-fl f-thide ks">课时6  </span><span class="f-fl f-thide ksname" title="处理Virtual DOM属性方法与思路">处理Virtual DOM属性方法与思路</span>
    

    
    <div id="auto-id-1520315403001" class="section" data-lesson="6">
      <span class="f-fl f-thide ks"><img loading="lazy" class="alignnone wp-image-2234 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180910-201317.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180910-201317.jpg?x-oss-process=image/resize,m_fill,w_1024,h_755/format,webp" alt="" width="493" height="364" /></span>
    </div>
    
    <div class="section" data-lesson="6">
      <span class="f-fl f-thide ks"><img loading="lazy" class="alignnone wp-image-2235 " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180910-201342.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/01/Jietu20180910-201342.jpg?x-oss-process=image/resize,m_fill,w_1024,h_715/format,webp" alt="" width="494" height="345" />  </span>
    </div>
  </div>
  <div class="chapter">
    <h2 class="chapterhead">
      <span class="f-fl f-thide chaptertitle">章节5: </span><span class="f-fl f-thide chaptername">封装组件与工程化应用</span>
    


    <div id="auto-id-1520315403017" class="section" data-lesson="10">
      <img loading="lazy" class="alignnone " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215437.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215437.jpg?x-oss-process=image/format,webp" width="551" height="412" />
    </div>
    
    <div data-lesson="10">
      <img loading="lazy" class="alignnone " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215450.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215450.jpg?x-oss-process=image/format,webp" width="552" height="359" />
    </div>
    
    <div data-lesson="10">
      <img loading="lazy" class="alignnone " src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215504.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/Jietu20180910-215504.jpg?x-oss-process=image/format,webp" width="552" height="410" />
    </div>
  </div>
</div>

<audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio> <audio style="display: none;" controls="controls"></audio>

 [1]: https://study.163.com/course/courseMain.htm?courseId=1006304007&share=2&shareId=400000000351011
 [2]: https://study.163.com/course/courseMain.htm?courseId=1006420031&share=2&shareId=400000000351011
