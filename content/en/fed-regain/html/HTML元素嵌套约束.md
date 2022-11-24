---
title: HTML元素嵌套约束
weight: 2
---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

<img loading="lazy" class="alignnone size-medium wp-image-2216" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/u402172834950723224fm26gp0.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/u402172834950723224fm26gp0.jpg?x-oss-process=image/resize,m_fill,w_300,h_173/format,webp" alt="" width="300" height="173" />

**块级元素特点：**

<pre class="best-text mb-10">①总是在新行上开始，占据一整行（很霸道）；
②高度，行高以及外边距和内边距都可控制；
③宽度始终是与浏览器宽度一样，与内容无关；
④它可以容纳<a class="baidu-highlight" href="https://www.baidu.com/s?wd=%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1YkmHm4mH7hmHcvuWcznhm40ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EPH0YPjmdP1R1" target="_blank" rel="noopener noreferrer">内联元素</a>和其他块元素。
</pre>

**行内元素的特点：**

<pre class="best-text mb-10">①和其他元素都在一行上；
②高，行高及外边距和内边距部分可改变；
③宽度只与内容有关；
④行内元素只能容纳文本或者其他行内元素。
不可以设置宽高，其宽度随着内容增加，高度随字体大小而改变，<a class="baidu-highlight" href="https://www.baidu.com/s?wd=%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1YkmHm4mH7hmHcvuWcznhm40ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EPH0YPjmdP1R1" target="_blank" rel="noopener noreferrer">内联元素</a>可以设置外边界，但是外边界不对上下起作用，
只能对左右起作用，也可以设置内边界，但是内边界在ie6中不对上下起作用，只能对左右起作用

</pre>

## **内联元素（行内元素）(inline element)**

* a &#8211; 锚点  
* abbr &#8211; 缩写  
* acronym &#8211; 首字  
* b &#8211; 粗体(不推荐)  
* bdo &#8211; bidi override  
* big &#8211; 大字体  
* br &#8211; 换行  
* cite &#8211; 引用  
* code &#8211; 计算机代码(在引用源码的时候需要)  
* dfn &#8211; 定义字段  
* em &#8211; 强调  
* font &#8211; 字体设定(不推荐)  
* i &#8211; 斜体  
* img &#8211; 图片  
* input &#8211; 输入框  
* kbd &#8211; 定义键盘文本  
* label &#8211; 表格标签  
* q &#8211; 短引用  
* s &#8211; 中划线(不推荐)  
* samp &#8211; 定义范例计算机代码  
* select &#8211; 项目选择  
* small &#8211; 小字体文本  
* span &#8211; 常用内联容器，定义文本内区块  
* strike &#8211; 中划线  
* strong &#8211; 粗体强调  
* sub &#8211; 下标  
* sup &#8211; 上标  
* textarea &#8211; 多行文本输入框  
* tt &#8211; 电传文本  
* u &#8211; 下划线  
* var &#8211; 定义变量**  
**

## ******块元素(block element)**

* address &#8211; 地址  
* blockquote &#8211; 块引用  
* center &#8211; 举中对齐块  
* dir &#8211; 目录列表  
* div &#8211; 常用块级容易，也是css layout的主要标签  
* dl &#8211; 定义列表  
* fieldset &#8211; form控制组  
* form &#8211; 交互表单  
* h1 &#8211; 大标题  
* h2 &#8211; 副标题  
* h3 &#8211; 3级标题  
* h4 &#8211; 4级标题  
* h5 &#8211; 5级标题  
* h6 &#8211; 6级标题  
* hr &#8211; 水平分隔线  
* isindex &#8211; input prompt  
* menu &#8211; 菜单列表  
* noframes &#8211; frames可选内容，（对于不支持frame的浏览器显示此区块内容  
* noscript &#8211; ）可选脚本内容（对于不支持script的浏览器显示此内容）  
* ol &#8211; 排序表单  
* p &#8211; 段落  
* pre &#8211; 格式化文本  
* table &#8211; 表格  
* ul &#8211; 非排序列表

可变元素

可变元素为根据上下文语境决定该元素为块元素或者内联元素。  

* applet &#8211; <a class="replace_word" title="Java 知识库" href="https://lib.csdn.net/base/java" target="_blank" rel="noopener noreferrer">Java </a>applet  
* button &#8211; 按钮  
* del &#8211; 删除文本  
* iframe &#8211; inline frame  
* ins &#8211; 插入的文本  
* map &#8211; 图片区块(map)  
* object &#8211; object对象  
* script &#8211; 客户端脚本

## 盒模型转换

**转换的方式是用css的display属性**

<pre class="best-text mb-10"><strong>display:block; /*转换为块级*/
display:inline; /*转换为行内*/</strong></pre>

**还有一种是**

<pre class="best-text mb-10"><strong>display:<a class="baidu-highlight" href="https://www.baidu.com/s?wd=inline-block&tn=44039180_cpr&fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1YzmW6kPjI-njRzm1bkP1Fh0ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EnHRknH0vPjcLP1R3rHfLn10zn0" target="_blank" rel="nofollow noopener noreferrer">inline-block</a>; /* 其实仍为行内元素，但是可以设置width及height属性等*/</strong></pre>

### 元素嵌套规则

**严格嵌套约束、语义嵌套约束**

通过上面的示例我们发现在元素里嵌套元素可能会导浏览器都解析错误，这其实是W3C规范的严格嵌套约束，严格嵌套约束要求必须去遵守，不然就会导致所有浏览器的解析错误。

<div>
  <p>
    严格嵌套约束规则：
  </p>
  
  <ul>
    <li>
      a元素里不可以嵌套交互式元素(a、button、select等)
    </li>
    <li>
      p里面不可以嵌套div、h1~h6、p、ul、ol、li、dl、dt、dd、form等
    </li>
  </ul>
  
  <div>
    <p>
      <strong>语义嵌套约束：</strong>
    </p>

    <p>
      每个元素基本都有自己的嵌套规则（即父元素可以是什么，子元素可以是什么），除了严格嵌套约束之外的一些规则就是语义嵌套约束，对于语义嵌套约束，如果不遵守，页面可能正常，但也可能解析错误，这和下面要讲的容错机制有关。
    </p>
    
    <p>
      <strong>浏览器的容错机制</strong>
    </p>
    
    <p>
      并不是每位同学在写完页面后去做合法性检查，因此浏览器厂商不得不让它们的浏览器以尽可能宽松的方式去处理网页，每个浏览器内核中都有相当一部分代码专门用来处理那些含糊不清的html标记及嵌套，并且会去猜测前端们到底想如何呈现网页，这是浏览器的容错机制。
    </p>
    
    <p>
      这其实在告诉我们，我们写出来的HTML代码不符合W3C规范可能最终呈现出来没有异样，但那其实是浏览器的一种容错机制，我们没有理由让自己以一个随性的态度去coding，对待自己的代码应该一丝不苟，即使HTML5的胸襟很宽广。
    </p>
    
    <p>
      <strong>案例</strong>
    </p>
  </div>
  
  <ul>
    <li>
      元素开始与结束标签嵌套错误，页面可以在大部分浏览器被正常解析，IE9会出现解析错误
    </li>
    <li>
      在p元素内嵌入div等元素造成所有浏览器的解析错误
    </li>
    <li>
      在h1~h6元素内嵌入div等元素所有浏览器可以解析正常
    </li>
    <li>
      在a元素内嵌入a元素会导致所有浏览器的解析错误
    </li>
    <li>
      在列表元素li、dt、dd等插入非列表兄弟元素会导致IE6\IE7的解析错误
    </li>
  </ul>
  
  <div>
    <h2>
      相关知识
    </h2>

    <p>
      在<code>https://www.w3.org/TR/html4/loose.dtd</code>里，我们可以找到这样的定义：
    </p>
    
    <p>
      <img loading="lazy" class="alignnone wp-image-2217 size-full" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/779339663-5494140b11672_articlex.jpeg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/779339663-5494140b11672_articlex.jpeg?x-oss-process=image/format,webp" alt="" width="791" height="257" />
    </p>
    
    <p>
      浏览中解析是按照上面流程解析的。
    </p>
    
    <p>
      浏览器加载完HTML结构后会先解析DOM树，这时候已经对HTML元素嵌套做了容错处理。然后会结合CSS解析出来的规则构造成渲染树来渲染页面。只有html 4阶段把标签归类为inline标签和block标签。
    </p>
    
    <p>
      在html 5阶段，标签是这样分类的：
    </p>
    
    <p>
      <img loading="lazy" class="alignnone size-medium wp-image-2219" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/1512175320-5494188ed7c36_articlex.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/09/1512175320-5494188ed7c36_articlex.png?x-oss-process=image/resize,m_fill,w_300,h_169/format,webp" alt="" width="300" height="169" />
    </p>
    
    <p>
      如上图，元素的分类不再是块元素或内联元素这样来分类（其实从来就没有这样分），而是按照如下分类来分：Flow（流式元素）、Heading（标题元素）、Sectioning（章节元素）、Phrasing（段落元素）、Embedded（嵌入元素）、Interactive（交互元素）、Metadata（元数据元素）。
    </p>
    
    <p>
      Flow（流式元素）
    </p>
    
    <p>
      在应用程序和文档的主体部分中使用的大部分元素都被分类为流式元素。
    </p>
    
    <blockquote>
      <p>
        a， abbr， address， area（如果它是map元素的后裔）， article， aside， audio， b， bdi， bdo， blockquote， br， button， canvas， cite， code， command， datalist， del， details， dfn， div， dl，em， embed， fieldset， figure， footer， form， h1， h2， h3， h4， h5， h6， header， hgroup， hr， i， iframe， img， input， ins， kbd， keygen， label， map， mark， math， menu， meter，nav， noscript， object， ol， output， p， pre， progress， q， ruby， s， samp， script， section， select， small， span， strong， style（如果该元素设置了scoped属性）， sub， sup， svg， table，textarea， time， u， ul， var， video， wbr， text
      </p>
    </blockquote>
    
    <p>
      Heading（标题元素）
    </p>
    
    <p>
      标题式元素定义一个区块/章节（section）（无论是明确的使用章节式内容的元素标记，或者标题式内容自身所隐含的）的标题。
    </p>
    
    <blockquote>
      <p>
        h1， h2， h3， h4， h5， h6， hgroup
      </p>
    </blockquote>
    
    <p>
      Sectioning（章节元素）
    </p>
    
    <p>
      章节式元素是用于定义标题及页脚范围的元素。
    </p>
    
    <blockquote>
      <p>
        article， aside， nav， section
      </p>
    </blockquote>
    
    <p>
      Phrasing（段落元素）
    </p>
    
    <p>
      段落式元素是文档中的文本、标记段落级文本的元素。
    </p>
    
    <blockquote>
      <p>
        a（如果其只包含段落式元素）， abbr， area（如果它是map元素的后裔）， audio， b， bdi， bdo， br， button， canvas， cite， code， command， datalist， del（如果其只包含段落式元素）， dfn， em， embed， i，iframe， img， input， ins（如果其只包含段落式元素）， kbd， keygen， label， map（如果其只包含段落式元素）， mark， math， meter， noscript， object， output， progress， q， ruby， s， samp， script，select， small， span， strong， sub， sup， svg， textarea， time， u， var， video， wbr， text
      </p>
    </blockquote>
    
    <p>
      Embedded（嵌入元素）
    </p>
    
    <p>
      嵌入式元素是引用或插入到文档中其他资源的元素。
    </p>
    
    <blockquote>
      <p>
        audio， canvas， embed， iframe， img， math， object， svg， video
      </p>
    </blockquote>
    
    <p>
      Interactive（交互元素）
    </p>
    
    <p>
      交互式元素是专门用于与用户交互的元素。
    </p>
    
    <blockquote>
      <p>
        a， audio（如果设置了controls属性）， button， details， embed， iframe， img（如果设置了usemap属性）， input（如果type属性不为hidden状态）， keygen， label， menu（如果type属性为toolbar状态），object（如果设置了usemap属性）， select， textarea， video（如果设置了controls属性）
      </p>
    </blockquote>
    
    <p>
      Metadata（元数据元素）
    </p>
    
    <p>
      元数据元素是可以被用于说明其他内容的表现或行为，或者在当前文档和其他文档之间建立联系的元素
    </p>
    
    <blockquote>
      <p>
        base，command，link，meta，noscript，script，style，title
      </p>
    </blockquote>
    
    <p>
      各分类会有交叉或重叠的现象，这说明在<a class="keylink" href="http://www.5icool.org/html5-12-1.html" target="_blank" rel="noopener noreferrer">html5</a>中，元素可能属于上述所有分类中的一个或多个。
    </p>
  </div>
</div>

 [1]: https://www.f2e123.com/fed-regain
