---
title: HTML元素嵌套约束
weight: 2
---

**块级元素特点：**

①总是在新行上开始，占据一整行（很霸道）；
②高度，行高以及外边距和内边距都可控制；
③宽度始终是与[浏览器](https://www.w3cdoc.com)宽度一样，与内容无关；
④它可以容纳内联元素和其他块元素。

**行内元素的特点：**

①和其他元素都在一行上；
②高，行高及外边距和内边距部分可改变；
③宽度只与内容有关；
④行内元素只能容纳文本或者其他行内元素。
不可以设置宽高，其宽度随着内容增加，高度随字体大小而改变，内联元素可以设置外边界，但是外边界不对上下起作用，
只能对左右起作用，也可以设置内边界，但是内边界在ie6中不对上下起作用，只能对左右起作用

## 内联元素（行内元素）(inline element)

* a - 锚点  
* abbr - 缩写  
* acronym - 首字  
* b - 粗体(不推荐)  
* bdo - bidi override  
* big - 大字体  
* br - 换行  
* cite - 引用  
* code - 计算机代码(在引用源码的时候需要)  
* dfn - 定义字段  
* em - 强调  
* font - 字体设定(不推荐)  
* i - 斜体  
* img - 图片  
* input - 输入框  
* kbd - 定义键盘文本  
* label - 表格标签  
* q - 短引用  
* s - 中划线(不推荐)  
* samp - 定义范例计算机代码  
* select - 项目选择  
* small - 小字体文本  
* span - 常用内联容器，定义文本内区块  
* strike - 中划线  
* strong - 粗体强调  
* sub - 下标  
* sup - 上标  
* textarea - 多行文本输入框  
* tt - 电传文本  
* u - 下划线  
* var - 定义变量**  
**

## 块元素(block element)

* address - 地址  
* blockquote - 块引用  
* center - 举中对齐块  
* dir - 目录列表  
* div - 常用块级容易，也是css layout的主要标签  
* dl - 定义列表  
* fieldset - form控制组  
* form - 交互表单  
* h1 - 大标题  
* h2 - 副标题  
* h3 - 3级标题  
* h4 - 4级标题  
* h5 - 5级标题  
* h6 - 6级标题  
* hr - 水平分隔线  
* isindex - input prompt  
* menu - 菜单列表  
* noframes - frames可选内容，（对于不支持frame的[浏览器](https://www.w3cdoc.com)显示此区块内容  
* noscript - ）可选脚本内容（对于不支持script的[浏览器](https://www.w3cdoc.com)显示此内容）  
* ol - 排序表单  
* p - 段落  
* pre - 格式化文本  
* table - 表格  
* ul - 非排序列表

可变元素

可变元素为根据上下文语境决定该元素为块元素或者内联元素。  

* applet - Java applet  
* button - 按钮  
* del - 删除文本  
* iframe - inline frame  
* ins - 插入的文本  
* map - 图片区块(map)  
* object - object对象  
* script - 客户端脚本

## 盒模型转换

**转换的方式是用css的display属性**

```
display:block; /*转换为块级*/
display:inline; /*转换为行内*/
```

**还有一种是**

```
display: inline-block</a>; /* 其实仍为行内元素，但是可以设置width及height属性等*/
```

### 元素嵌套规则

**严格嵌套约束、语义嵌套约束**

通过上面的示例[我们](https://www.w3cdoc.com)发现在元素里嵌套元素可能会导[浏览器](https://www.w3cdoc.com)都解析错误，这其实是W3C规范的严格嵌套约束，严格嵌套约束要求必须去遵守，不然就会导致所有[浏览器](https://www.w3cdoc.com)的解析错误。

严格嵌套约束规则：
- a元素里不可以嵌套交互式元素(a、button、select等)
- p里面不可以嵌套div、h1~h6、p、ul、ol、li、dl、dt、dd、form等

语义嵌套约束：
- 每个元素基本都有自己的嵌套规则（即父元素可以是什么，子元素可以是什么），除了严格嵌套约束之外的一些规则就是语义嵌套约束，对于语义嵌套约束，如果不遵守，页面可能正常，但也可能解析错误，这和下面要讲的容错机制有关。

[浏览器](https://www.w3cdoc.com)的容错机制
- 并不是每位同学在写完页面后去做合法性检查，因此[浏览器](https://www.w3cdoc.com)厂商不得不让它们的[浏览器](https://www.w3cdoc.com)以尽可能宽松的方式去处理网页，每个[浏览器](https://www.w3cdoc.com)内核中都有相当一部分代码专门用来处理那些含糊不清的html标记及嵌套，并且会去猜测[前端](https://www.w3cdoc.com)们到底想如何呈现网页，这是[浏览器](https://www.w3cdoc.com)的容错机制。

这其实在告诉[我们](https://www.w3cdoc.com)，[我们](https://www.w3cdoc.com)写出来的HTML代码不符合W3C规范可能最终呈现出来没有异样，但那其实是[浏览器](https://www.w3cdoc.com)的一种容错机制，[我们](https://www.w3cdoc.com)没有理由让自己以一个随性的态度去coding，对待自己的代码应该一丝不苟，即使HTML5的胸襟很宽广。

案例
- 元素开始与结束标签嵌套错误，页面可以在大部分[浏览器](https://www.w3cdoc.com)被正常解析，IE9会出现解析错误
- 在p元素内嵌入div等元素造成所有[浏览器](https://www.w3cdoc.com)的解析错误
- 在h1~h6元素内嵌入div等元素所有[浏览器](https://www.w3cdoc.com)可以解析正常
- 在a元素内嵌入a元素会导致所有[浏览器](https://www.w3cdoc.com)的解析错误
- 在列表元素li、dt、dd等插入非列表兄弟元素会导致IE6\IE7的解析错误

## 相关知识

在https://www.w3.org/TR/html4/loose.dtd里，[我们](https://www.w3cdoc.com)可以找到这样的定义：

![](/images/posts/779339663-5494140b11672_articlex.jpeg)

浏览中解析是按照上面流程解析的。

[浏览器](https://www.w3cdoc.com)加载完HTML结构后会先解析DOM树，这时候已经对HTML元素嵌套做了容错处理。然后会结合CSS解析出来的规则构造成渲染树来渲染页面。只有html 4阶段把标签归类为inline标签和block标签。

在html 5阶段，标签是这样分类的：

![](/images/posts/1512175320-5494188ed7c36_articlex.png)

如上图，元素的分类不再是块元素或内联元素这样来分类（其实从来就没有这样分），而是按照如下分类来分：Flow（流式元素）、Heading（标题元素）、Sectioning（章节元素）、Phrasing（段落元素）、Embedded（嵌入元素）、Interactive（交互元素）、Metadata（元数据元素）。

### Flow（流式元素）
- 在应用程序和文档的主体部分中使用的大部分元素都被分类为流式元素。

> a， abbr， address， area（如果它是map元素的后裔）， article， aside， audio， b， bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， del， details， dfn， div， dl，em， embed， fieldset， figure， footer， form， h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， ins， kbd， keygen， label， map， mark， math， menu， meter，nav， noscript， object， ol， output， p， pre， progress， q， ruby， s， samp， script， section， select， small， span， strong， style（如果该元素设置了scoped属性）， sub， sup， svg， table，textarea， time， u， ul， var， video， wbr， text

### Heading（标题元素）

标题式元素定义一个区块/章节（section）（无论是明确的使用章节式内容的元素标记，或者标题式内容自身所隐含的）的标题。

> h1， h2， h3， h4， h5， h6， hgroup


### Sectioning（章节元素）
章节式元素是用于定义标题及页脚范围的元素。

<blockquote>
 article， aside， nav， section
</blockquote>
Phrasing（段落元素）

段落式元素是文档中的文本、标记段落级文本的元素。

<blockquote>
 a（如果其只包含段落式元素）， abbr， area（如果它是map元素的后裔）， audio， b， bdi， bdo， br， button， canvas， cite， code， command， datalist， del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素）， mark， math， meter， noscript， object， output， progress， q， ruby， s， samp， script，select， small， span， strong， sub， sup， svg， textarea， time， u， var， video， wbr， text
</blockquote>
Embedded（嵌入元素）

嵌入式元素是引用或插入到文档中其他资源的元素。

<blockquote>
 audio， canvas， embed， iframe， img， math， object， svg， video
</blockquote>
Interactive（交互元素）

交互式元素是专门用于与用户交互的元素。

<blockquote>
 a， audio（如果设置了controls属性）， button， details， embed， iframe， img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label， menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， textarea， video（如果设置了controls属性）
</blockquote>
Metadata（元数据元素）

元数据元素是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素

<blockquote>
 base，command，link，meta，noscript，script，style，title
</blockquote>
各分类会有交叉或重叠的现象，这说明在html5中，元素可能属于上述所有分类中的一个或多个。

</div>
</div>

