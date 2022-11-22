---
title: HTML发展历史


date: 2017-08-29T09:46:24+00:00
excerpt: HTML是Web统一语言，这些容纳在尖括号里的简单标签，构成了如今的Web，1991年，Tim Berners-Lee编写了一份叫做“HTML标签”的文档，里面包含了大约20个用来标记网页的HTML标签。他直接借用SGML的标记格式，也就是后来我们看到的HTML标记的格式。
url: /html5css3/814.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/html.jpg
views:
  - 2171
  - 2171
like:
  - 3
classic-editor-remember:
  - classic-editor
fifu_image_url:
  - //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/html.jpg
fifu_image_alt:
  - HTML发展历史


---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

HTML是Web统一语言，这些容纳在尖括号里的简单标签，构成了如今的Web，1991年，Tim Berners-Lee编写了一份叫做“HTML标签”的文档，里面包含了大约20个用来标记网页的HTML标签。他直接借用SGML的标记格式，也就是后来我们看到的HTML标记的格式。

![HTML发展历史][2] 

### 从IETF到W3C：HTML 4之路

HTML 1并不曾存在，HTML的第一个官方版本就是由IETF（互联网工程任务组）推出的HTML 2.0。问世之前，这个版本中的很多细则已经被实现，比如，1994年的Mosaic浏览器已经实现了在文档中嵌入图片的方法，后来HTML 2.0便吸纳了img这个标签。  
后来，W3C取代IETF的角色，成为HTML的标准组织，1990年代的后的几年，HTML的版本被频繁修改，直到1999年的HTML 4.01， 至此，HTML到达了它的第一个拐点。

### XHTML 1：XML风格的HTML

HTML在HTML 4.01之后的第一个修订版本就是XHTML 1.0，其中X代表“eXtensible”，扩展，当然也有人将之解读为 “eXtreme”，极端。XHTML 1.0是基于HTML 4.01的，并没有引入任何新标签或属性，唯一的区别是语法，HTML对语法比较随便，而 XHTML则要求XML般的严格语法。  
使用严格的语法规范并非坏事，要求开发者使用单一的代码风格，比如，HTML4.01允许你使用大写或小写字母标识标记元素和属性，XHTML则只 允许小写字母。XHTML1.0的推出刚好碰上了CSS的崛起，Web开发设计者们开始意识到Web标准问题，基于XHTML的严格语法规范被视为编写 HTML代码的最佳实践。

### W3C推出XHTML 1.1

如果说XHTML 1.0是XML风格的HTML，XHTML 1.1则是货真价实的XML。这意味着XHTML 1.1无法使用 text/htmlmime-type直接输出，然而，如果Web开发者使用XMLmime-type，则当时的主流浏览器，IE则压根不支持。看上去，W3C似乎正在与当时的Web脱节。

### 出力不讨好的XHTML 2

对W3C而言，到了HTML 4已经是功德圆满，他们的下一步工作是XHTML 2，希望将Web带向XML的光明未来。虽然XHTML 2听上去和XHTML 1类似，它们却有很多差别，XHTML 2不向前兼容，甚至不兼容之前的HTML。它是一种全新的语言，赤条条来去无牵挂。这实在是一场灾难。

### WHATWG：与W3C决裂

W3C闭门造车的作风引起了一些人的不满，来自Opera,Apple,以及Mozilla的代表开始表达反对声音。2004年，Opera的 Ian Hickson提议在HTML基础上进行扩展以适应新的Web应用，该提议遭到W3C的拒绝。于是，他们自发组织成立了超文本应用技术工作组，就是WHATWG。

### 从WebApps1.0到HTML 5

从一开始，WHATWG就和W3C走不同的路线，W3C对问题的讨论是集体投票，而WHATWG则由主笔IanHickson定度。表面上看，W3C更民主，然而事实上，各种内部纷争会使一些决议限于泥潭，在WHATWG，事情的进展会更容易，不过，主笔的权力并非无限大，他们的委员会可以 对那些过于偏执的主笔进行弹劾。  
一开始，WHATWG的主要工作包括两部分，Web Forms 2.0和Web Apps 1.0，它们都是HTML的扩展，后来，他们合并到一起成为现在的HTML 5规范。在WHATWG致力于HTML 5的同时，W3C继续他们的XHTML 2.0，然而，他们慢慢地陷入困境。  
2006年10月，Web之父Tim Berners-Lee发表了一篇博客文章，表示，从HTML走向XML的路是行不通的，几个月后，W3C组建了一个新的HTML工作组，他们非常明智地 选择了WHATWG的成果作为基础。这一转变带来一些困惑，W3C同时进行这两套规范，XHTML2和HTML 5（注意，W3C的HTTML5在5之前有个空格，而WHATWG的HTML 5则没有空格），而WHATWG也在进行着同样的工作。

### XHTML已死：XHTML语法永存

这一混乱局面到了2009年开始变得清晰，W3C宣布终止XHTML2的工作，这是一份关于XHTML2的迟到的讣告。这一消息被那些XML的反对 者视为珍宝，他们借此嘲笑那些使用XHTML1规范的人，然而他们似乎忘记了，XHTML1和XHTML2是截然不同的东西。于此同时，XHTML1规范的制定者担心，XHTML1中的严格语法规范会被HTML 5弃用，这种担心后来证明是多余的，HTML 5既支持松散语法，也支持XHTML1般的严格语 法。

### HTML 5路线图

![HTML发展历史][3]  
HTML 5的现状是，它不再象以前那样让人困惑，然而仍不够明朗。有两个组织在同时制定它的规范，这两个组织有着完全不同的行事风格，WHATWG是先买后尝，W3C是先尝后买，他们形成了一个不太靠谱的联姻，最终人们必将面临一个HTML 5还是HTML 5的问题。更让开发者困惑的是，他们什么时候才可以试水HTML 5。  
在一次访谈中，Ian Hickson提到了2022，表示要到那时HTML 5才会形成”推荐标准”，此话一出，立刻招来Web设计者们的愤怒，尽管他们不知道推荐标准时什么意思，但他们明白，2022已经是猴年马月的事了。  
这还不算，更重要的是，这个推荐标准涉及两套规范，考虑到HTML 5标准的规模，这个日期还是太乐观了，毕竟，各大浏览器以往对既有标准的兼容并不遂人意，想当初，IE花了10年才接纳abbr这个标签。  
2012年，HTML 5会被接纳为候选标准，这将是HTML 5真正开始发力的日子。对Web开发设计者来说，这并不重要，重要的是浏览器的支持，就像CSS2.1，当有浏览器开始支持这一规范的时候，就有开发设计者在使用了，倘若必须等到所有浏览器都支持才开始入手，恐怕我们现在还在等待中。  
HTML 5也一样，并不会有一个时间点，宣布HTML 5已经准备妥当，相反，我们会先开始使用它的部分功能，HTML 5并不是一个从零开始全新的东西，它是旧的HTML标准的改进，事实上，不管你正在使用的HTML是哪个版本，你已经在使用HTML 5了。

 [1]: https://www.f2e123.com/fed-regain
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/html.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/html-1.jpg