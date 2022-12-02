---
title: Session会话分析

---
> Session 分析并不“包治百病”，但却是用户行为分析的重要方法。

在数据分析领域，Session是一种专业的数据分析。对于有数据驱动意识的互联网人来说，这并不陌生——Session 即会话，是指在指定的时间段内在网站上发生的一系列互动。例如，一次会话可以包含多个网页或屏幕浏览、事件、社交互动和电子商务交易。

## Session：解决用户分析中的“线”型难题 {#toc-1}

### **Session 分析有何意义？**

人们往往最熟悉事件分析模型，且用户行为事件往往以“点”的方式呈现，即某人在什么时间什么地点干了一件什么样的事，也就是[我们](https://www.w3cdoc.com)熟知的 4W1H 模型：Who、When、Where、How、What。

王小明昨天下午在 i 百联通过个性化推送买了一双 NIKE 球鞋，张小花今天十点在融 360 上注册后领取了新人基金，某白领晚上六点在五道口区域扫码一辆 ofo 小黄车并报修了它……

基于这样用户角度的行为记录，产品方可以知道他们的用户都具体干了什么事情。并对自己的产品做出精细化运营，但是，还有一些需求，是不能通过“点”来描述的，比如：

* 用户平均会来几次？
* 每次平均逛了几个页面？
* 每次来平均待多久？
* 某个具体页面用户平均停留多长时间？

这些需要把用户单点行为串联起来形成一个整体，并在此基础上进行计算后才能得到的数据分析需求，更像是一条“线”。**而 Session 分析的最大意义，就是解决用户分析中的“线”型难题，从不同角度指导精细化运营与商业决策。**

## 如何用 Session 分析支持工作？ {#toc-2}

如果根据定义，Session 的关键点显然是：多长时间内用户做了什么事。

### **Session 切割时间**

假如王小明打开某企业官网了解信息，点击了 DEMO 按钮，并进行了注册试用行为，然后就被领导叫去开会，四十分钟后又跑回来继续浏览页面，这是几个 Session？

这要看数据分析工具的 Session 切割规则，通常来讲，Web 产品建议切割时间为 30 分钟，APP 产品建议切割时间为 1 分钟。比较符合用户的使用习惯，当然规则是活的人也是活的~可以根据产品的业务形态变更。所以王小明两次浏览页面的时间超过了 Web 端的 30 分钟，被记录为两个 Session。

### **Session 事件**

Session 记录什么事件，取决于需要关注的用户行为。如果 Session 事件只包含了注册行为（核心事件），那王小明的行为将会被记录为一个 Session。如果包含浏览页面，则会被记录为两个 Session。

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/T4IKlAAG415UXL2S54gf.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/T4IKlAAG415UXL2S54gf.png?x-oss-process=image/format,webp" alt="" width="649" height="438" data-action="zoom" />

**图1 不同切割时长的 Session**图片来源：神策数据

## 那么，Session 分析究竟可以分析什么？ {#toc-3}

### **平均使用时长**

平均访问时长是指在一定统计时间内，浏览网站的一个页面或整个网站时用户所逗留的总时间与该页面或整个网站的访问次数的比。

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/YbzOa9T4qwFt7mnMhcsI.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/YbzOa9T4qwFt7mnMhcsI.png?x-oss-process=image/format,webp" alt="" width="424" height="111" data-action="zoom" />

**图2 平均访问时长**

平均访问时长越久，证明 Web/APP 越有吸引力，如果用户停留的平均时间非常低，那么可能内容不够有趣，或界面优化较差，真正有价值的内容无法吸引用户，影响用户体验。

### **平均交互深度**

平均交互深度和平均访问深度定义虽有差别，意义却很相似，都是衡量 Web/APP 质量的重要指标，可以帮助企业了解页面内容的价值，功能是否满足用户需求，指标的具体意义需要依照业务判断。

<img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/Fjw6r8pTxKvosBVLYkm4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2021/05/Fjw6r8pTxKvosBVLYkm4.png?x-oss-process=image/format,webp" alt="" width="476" height="130" data-action="zoom" />

**图4 平均交互深度**

### **跳出率**

这部分我在后面的文章会详细的介绍，有兴趣的朋友可以关注下。

### **Session 转化分析**

营销推广中一个非常典型的需求是需要知道不同渠道带来的注册、购买等转化情况，该需求本质上，就是需要界定 Session，然后按渠道属性查看注册、购买等事件的转化数量。

### **用户路径**

在业务流程中，了解用户的行为路径，有助于运营同学找到用户大量流失环节，衡量网站营销推广效果，产品同学验证用户行为流与初步设想进行对比，完善功能，优化用户体验。

使用用户路径分析，设定起始事件与 Session 切割时间，可以观察一个 Session 内用户的行为流。

## 总结 {#toc-4}

Session 分析并不“包治百病”，但却是用户行为分析的重要方法；既可以看透如王小明一样的“常跑路”用户，也可以帮你了解真正的用户使用习惯，避免产品设计“不按套路出牌”的辛酸往事。
