---
title: css基线与行高关系

---
## 一、**基本概念**

1、基线、底线、顶线、中线  
<img loading="lazy" class="alignnone wp-image-2094 size-full" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/a1c91c7506a6365eaa353b2f8cc65365.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/a1c91c7506a6365eaa353b2f8cc65365.png?x-oss-process=image/format,webp" alt="" width="750" height="145" />

注意：基线（base line）并不是汉字文字的下端沿，而是英文字母“x”的下端沿。

2、内容区

![][1]

内容区是指底线和顶线包裹的区域（行内元素display:inline;可以通过background-color属性显示出来），实际中不一定看得到，但确实存在。内容区的大小依据font-size的值和字数进行变化。

3、行距、行高

![][2]

行高（line-height）：包括内容区与以内容区为基础对称拓展的空白区域，我们称之为行高。一般情况下，也可以认为是相邻文本行基线间的距离。

行距：指相邻文本间上一个文本行基线和下一个文本行顶线之间的距离。当然，我更愿意认为是（上文本行行高-内容区高度）/2+（下文本行行高-内容区高度）/2。

4、行内框

![][3]

行内框是一个浏览器渲染模型中的概念，无法显示出来，但是它又确实存在，它的高度就是行高指定的高度。

5、行框  
![][3]

行框（line box），同行内框类似的概念，行框是指本行的一个虚拟的矩形框，也是浏览器渲染模式中的一个概念。行框高度等于本行内所有元素中行内框最大的值（以行高值最大的行内框为基准，其他行内框采用自己的对齐方式向基准对齐，最终计算行框的高度）

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][4]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

## 二、**vertical-align：设置元素的垂直对齐方式。**

上一节我们讲解了行高与单行纯文字的垂直居中（line-height），而如果行内含有图片和文字，在浏览器渲染出来后，读者可以发现文字和图片在垂直方向并不是沿中线居中，而是沿基线对齐。这是因为，元素默认的垂直对齐方式为基线对齐（vertical-align：baseline）。  
![][5]

CSS语法：vertical-align  
语法：  
baseline | sub | super | top | text-top | middle | bottom | text-bottom | <百分比> | <长度> | inherit  
说明：  
设置元素内容的垂直对齐方式。  
参数：  
baseline： 基线对齐；  
sub： 下标显示；  
super： 上标显示；  
top： 顶端对齐；  
text-top： 文本的顶端对齐；  
middle： 中部对齐； //没有研究透的属性  
bottom： 底端对齐；  
text-bottom： 文本的底端对齐；  
百分比和长度： CSS2，可为负数。  
初始值：baseline  
继承性：不继承

此处需要特别注意的是：垂直对齐属性只对文本有效（是指包含了#Text节点的元素节点才能正确地处理vertical-align属性）。同时，该属性不能继承。

属性值详解  
在上面一节中，介绍了文本的基线、顶线、中线和底线，还有内容区、行内框和行框，而本节的垂直对齐和这几个概念密切相关。  
![][6]

1、基线对齐（vertical-align：baseline）  
基线对齐（vertical-align：baseline）使元素的基线同基准元素（取行高最高的作为基准）的基线对齐  
![][7]

2、顶端对齐（vertical-align：top）  
顶端对齐（vertical-align : top）是将元素的行内框的顶端与行框的顶端对齐

![][8]

3、文本顶端对齐（vertical-align : text-top）  
文本顶端对齐（vertical-align : text-top）是将元素行内框的顶端同文本行的顶线对齐  
![][9]

4、底端对齐（vertical-align : bottom）  
底端对齐（vertical-align : bottom）与顶端对齐（vertical-align : top）相反  
![][10]

5、文本底端对齐（vertical-align : text-bottom）  
![][11]

6、中间对齐（vertical-align : middle）  
中间对齐（vertical-align : middle）通常使用在图片上，将图片的垂直方向的中线与文本行的中线对齐。（对于文字的处理有些偏差，具体依据还没有研究出来，有研究的同学可以联系我哦~~）  
![][12]

中线的定义为：中线位于基线的上方，与基线的距离为小写字母x高度的一半（即0.5ex），而ex同font-size相关，大部分浏览器认为1ex = 0.5em（em同样也是相对单位，不是绝对单位），因此会将基线以上四分之一em处作为中线来对齐。

7、上标和下标  
上标（vertical-align:super）使元素的基线相对于基准元素的基线升高，下标（vertical-align:sub）使元素的基线降低，移动的幅度CSS规范中没有规定，由浏览器来决定。  
![][13]  上下标不会改变元素文字的尺寸大小。

8、长度值和百分比  
和上下标类似，长度值和百分比值可使元素的基线相对于基准元素的基线升高（正值）或者降低（负值）。

上下标的移动尺寸是由浏览器确定的，而设定长度值或者百分比，可以精确控制文字上下移动的幅度。

百分比与行高有关（line-height），例如有如下代码，其显示如下图所示。  
20170125165340975.gif![][14]

我的测试 @FireFox下

测试代码：

<pre class="prettyprint"><code class="hljs xml has-numbering">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-title">style&lt;/span> &lt;span class="hljs-attribute">type&lt;/span>=&lt;span class="hljs-value">"text/css"&lt;/span>&gt;&lt;/span>&lt;span class="css">
  &lt;span class="hljs-tag">p&lt;/span> &lt;span class="hljs-rules">{
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">vertical-align&lt;/span>:&lt;span class="hljs-value">baseline&lt;/span>&lt;/span>;
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">font-size&lt;/span>:&lt;span class="hljs-value">&lt;span class="hljs-number">20&lt;/span>px&lt;/span>&lt;/span>;  
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">line-height&lt;/span>:&lt;span class="hljs-value">&lt;span class="hljs-number">60&lt;/span>px&lt;/span>&lt;/span>;
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">background-color&lt;/span>:&lt;span class="hljs-value">yellow&lt;/span>&lt;/span>;
  &lt;span class="hljs-rule">}&lt;/span>&lt;/span>
  &lt;span class="hljs-tag">span&lt;/span> &lt;span class="hljs-rules">{
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">background-color&lt;/span>:&lt;span class="hljs-value"> red&lt;/span>&lt;/span>;
  &lt;span class="hljs-rule">}&lt;/span>&lt;/span>
  &lt;span class="hljs-tag">u&lt;/span> &lt;span class="hljs-rules">{
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">background-color&lt;/span>:&lt;span class="hljs-value"> blue&lt;/span>&lt;/span>;
  &lt;span class="hljs-rule">}&lt;/span>&lt;/span>
  &lt;span class="hljs-tag">del&lt;/span> &lt;span class="hljs-rules">{
     &lt;span class="hljs-rule">&lt;span class="hljs-attribute">background-color&lt;/span>:&lt;span class="hljs-value"> pink&lt;/span>&lt;/span>;
  &lt;span class="hljs-rule">}&lt;/span>&lt;/span>
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-title">style&lt;/span>&gt;&lt;/span>

//HTML代码
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-title">p&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-title">span&lt;/span>&gt;&lt;/span>Ajax测试&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-title">span&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-title">u&lt;/span>&gt;&lt;/span>Ajax测试&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-title">u&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-title">del&lt;/span>&gt;&lt;/span>Ajax测试&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-title">del&lt;/span>&gt;&lt;/span>
    Ajax测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-title">p&lt;/span>&gt;&lt;/span>
</code></pre>

默认情况：  
20170125165759621.jpeg![][15]

其他说明：  

1. SPAN、U、DEL标签的 offsetWidth = SUM（ 字符 \* font-size \* 修正系数）（这里，中文的修正系数为1，数字的修正系数0.6，英文字符修正系数差异很大，比如ijl很小，wmk等比较大，大写英文同样修正系数不统一）。  
2. SPAN、U、DEL标签的 offsetHeight。  
推论：inline元素的背景渲染区域即内容区域大小，直接受到font-size的影响。  
对`<p>`块级元素，块级元素的计算值高度由包含的行框高度累加而成，因此这里height为60px；  
3. 把 span.style.lineHeight 设置为 15px(从10px变化到60px) —-> 发现没有变化  
推断：内容区大小不受line-height影响，line-height用于处理相邻文本行基线间的距离。  
4. 把 span.style.lineHeight 设置为 70px(从61px变化到80px) —->行框高度开始随着设置调整  
推断：行框高度是行内最高的行内框高度，通过line-height调整。  
p元素的height计算值为 span.style.lineHeight值，不由p.style.lineHeight控制。  
推断二：不设定height属性的`<p>`的height计算值为行框高度累加值。  
20170125170311610.jpeg![][16]

5. 把 span.style.verticalAlign= sub；del.style.verticalAlign= super；–>看图说话  
推断：增加了行框的高度，上下标基于基线进行移动。  
6. 所有对齐方式的确认：  
a）首先确认该行内的基准元素，取line-height值为最大值的元素作为基准；  
b）其他文本向基准元素对齐，依据line-height和vertical-align来实现效果；  
c）sub、super是改变基线的方式，因此会对行框的最终高度产生影响；  
d）top、bottom是行内框对齐，top指该元素行内框的顶端与基准行内框顶端对齐；  
e）text-top、text-bottom同样会影响最终行框的高度，是指该元素行内框的顶端与基准元素的内容区顶端对齐（当line-height=内容区高度时，跟基准内容区域顶端对齐。line-height小于内容区域高度时，会出现文本继续上移的现象，line-height设置为0px时，正好是内容区域的垂直中部跟基准内容区域顶端对齐。）  
20170125170844371.jpeg![][17]

f） 百分数和长度值：基于基线进行移动，百分数的计算值为行高*百分数。  
g）关于middle，感觉是根据一条基准线进行对称拓展，但基准线产生的规则不清楚。

# 全角字符与半角字符

<pre class="best-text mb-10">A 什么是全角和半角？
（1）全角--指一个字符占用两个标准字符位置。
汉字字符和规定了全角的英文字符及国标GB2312-80中的图形符号和特殊字符都是全角字符。一般的系统命令是不用全角字符的，只是在作文字处理时才会使用全角字符。

（2）半角--指一字符占用一个标准的字符位置。
通常的英文字母、数字键、符号键都是半角的，半角的显示内码都是一个字节。在系统内部，以上三种字符是作为基本代码处理的，所以用户输入命令和参数时一般都使用半角。

B 全角与半角各在什么情况下使用？
全角占两个字节，半角占一个字节。
半角全角主要是针对标点符号来说的，全角标点占两个字节，半角占一个字节，而不管是半角还是全角，汉字都还是要占两个字节。
在编程序的源代码中只能使用半角标点（不包括字符串内部的数据）
在不支持汉字等语言的计算机上只能使用半角标点（其实这种情况根本就不存在半角全角的概念）

对于大多数字体来说，全角看起来比半角大，当然这不是本质区别了。

C 全角和半角的区别
全角就是字母和数字等与汉字占等宽位置的字。半角就是ASCII方式的字符，在没有汉字输入法起做用的时候输入的字母数字和字符都是半角的。

在汉字输入法出现的时候，输入的字母数字默认为半角，但是标点则是默认为全角，可以通过鼠标点击输入法工具条上的相应按钮来改变。

D 关于“全角”和“半角”：
全角：是指中GB2312-80（《信息交换用汉字编码字符集·基本集》）中的各种符号。
半角：是指英文件ASCII码中的各种符号。</pre>

欢迎学习前端知识体系课程，本系列属于：[前端增长教程][4]

在线视频课程：<a href="https://study.163.com/course/courseMain.htm?share=2&shareId=400000000351011&courseId=1209400904&_trace_c_p_k2_=d5106aa1758748cea6e733c4b1f29bbe" target="_blank" rel="noopener noreferrer">网易云课堂课程</a>      <a href="https://segmentfault.com/ls/1650000019681091" target="_blank" rel="noopener noreferrer">思否课堂</a>

# 案例

[学习和使用flexbox布局以及变态android文字垂直居中][18]

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/224313544bd69e3614202b00e6836639.png
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/bc259b15f0a26344b1ec733ea13b7a75.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/afa54ef74dce58c2b01c5f4b616ed144.png
 [4]: https://www.f2e123.com/fed-regain
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/67b28fb0ca955fd9f42ec5df3ee1fdee.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/f42e38cfb17bbe3e51b6f337280bdf42.png
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/aa7171c2368569363df99b427cfe7006.png
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/a1f1fd962f27ad1df5598db743ab4f58.png
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/a5e4ccca223fd95e4e68d4172dda91c7.png
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/fed5dc9c9cdc34660e27a97f76b555d4.png
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/ff1447e5fbb7c4ec32ddd27f6a46f2b0.png
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/3403dd8c1d44f41553aadcfd469ae6d9.png
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/11756f4d64da6a40798d82920704c9c1.png
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/20abfc4ef4ec5787ad62778add2c4c15.png
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/cee7e3301da85d3c04c1d5c324f24919.png
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/91427dc064ac8d101a7bf2ffa89bb5c8.png
 [17]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/e803fd8280e86e8e8b685059bf756987.png
 [18]: https://www.f2e123.com/html5css3/1413.html
