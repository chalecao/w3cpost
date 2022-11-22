---
title: HTML深刻理解

---
欢迎学习前端知识体系课程，本系列属于：[前端增长教程][1]

# 基础知识

HTML是同学们学习前端的基础，是构建网页的最基本元素。基础知识点建议大家到[W3School][2]或者[菜鸟教程][3]点一遍，左边栏的分类挨个学习一遍，忘记了就过去查询。

<p id="vRhMTFh">
  <img loading="lazy" class="alignnone wp-image-6158 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/format,webp" alt="" width="644" height="682" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/format,webp 1572w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/quality,q_50/resize,m_fill,w_283,h_300/format,webp 283w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/quality,q_50/resize,m_fill,w_566,h_600/format,webp 566w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_814/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf8f2c4a672.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1449,h_1536/format,webp 1449w" sizes="(max-width: 644px) 100vw, 644px" />
</p>

# 进阶知识

<img loading="lazy" width="2192" height="1290" class="alignnone size-full wp-image-6136 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/format,webp 2192w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_177/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_471/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_452/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_1536,h_904/format,webp 1536w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf84c3ef7c3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_2048,h_1205/format,webp 2048w" sizes="(max-width: 2192px) 100vw, 2192px" />

进阶知识点很多，可以从各个角度来切入学习，这里主要结合浏览器介绍HTML解析渲染的流程，和可能引起浏览器阻塞的场景。大家在实际工作中遇到最多的也是这些问题，<span style="color: #800000;">只有先了解清楚原理，搭建起底层牢固的知识体系，才能在上层准确分析问题，创造性解决问题</span>。本课程设计的内容很多，汇总成体系化的课程<a href="https://www.f2e123.com/fed-regain" target="_blank" rel="noopener noreferrer">前端增长教程</a>，大家可以自行学习。也可以学习相关网易云课堂视频课程<a href="https://study.163.com/course/courseMain.htm?courseId=1209400904&share=2&shareId=400000000351011" target="_blank" rel="noopener noreferrer">前端高级进阶知识点</a>或者思否课程<a href="https://ke.sifou.com/course/1650000019681091" target="_blank" rel="noopener noreferrer">前端增长</a>，本课程所述知识点是作者在实际工作中总结所得，和大家一起分享，如有不足之处欢迎和我联系（左下角扫描微信公众号二维码，欢迎关注）。

浏览器地址栏输入url或者点击一个跳转链接开始，首先经历的是下面这些过程：

<p id="mYTIojl">
  <img loading="lazy" class="alignnone wp-image-6163 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/format,webp" alt="" width="760" height="454" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/format,webp 1473w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_179/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_477/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5faf945dcdff1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_458/format,webp 768w" sizes="(max-width: 760px) 100vw, 760px" />
</p>

上面是关于浏览器性能规范中的[NavigationTiming][4]中定义的一些关键时间节点，这部分后面在做介绍，这里不展开，有兴趣同学可以学习下[高性能极致用户体验前端开发实战][5]课程。通过这些时间节点我们可以很清晰的看到浏览器解析渲染页面的总过程。

 [1]: https://www.f2e123.com/fed-regain
 [2]: https://www.w3school.com.cn/html/index.asp
 [3]: https://www.runoob.com/html/html-tutorial.html
 [4]: https://www.f2e123.com/fed-regain/3301.html
 [5]: https://www.f2e123.com/fed-regain/2390.html
