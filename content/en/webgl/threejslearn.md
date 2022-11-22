---
title: WebGL入门ThreeJs中文笔记教程


date: 2017-08-29T15:53:54+00:00
excerpt: 学习WebGL很长时间了，但是总是东拼一下，西凑一点，没有系统总结。趁现在经济危机，俺要发奋图强。这里总结一下，基于ThreeJs官网（https://www.threejs.org ） 和其他网上看的博客内容，定期更新本系列课程。今天突然发现，博客写了两三年了，人还是没变。我还是坚持做自己喜欢的事情。可是现在觉得自己越走越远，总结更新一下最近学习的知识。
url: /aistack/1010.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg
views:
  - 2553
  - 2553
ws_info:
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
toc_depth:
  - 1
  - 1
like:
  - 2
  - 2
wl_pageviews:
  - 5
  - 5
keywords:
  - webGL,3d建模,threejs,中文教程
  - webGL,3d建模,threejs,中文教程
description:
  - 介绍WebGL基础知识点,入门教程，基于ThreeJs的中文教程笔记，从基础数学知识到具体应用
  - 介绍WebGL基础知识点,入门教程，基于ThreeJs的中文教程笔记，从基础数学知识到具体应用
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg
fifu_image_alt:
  - WebGL入门ThreeJs中文笔记教程
onesignal_meta_box_present:
  - 1


---
学习WebGL很长时间了，但是总是东拼一下，西凑一点，没有系统总结。趁现在经济危机，俺要发奋图强。这里总结一下，基于ThreeJs官网（<a href="https://www.threejs.org" target="_blank" rel="external noopener">https://www.threejs.org</a> ） 和其他网上看的博客内容，定期更新本系列课程。今天突然发现，博客写了两三年了，人还是没变。我还是坚持做自己喜欢的事情。可是现在觉得自己越走越远，总结更新一下最近学习的知识。

[<img loading="lazy" class="alignnone size-full wp-image-2521" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg?x-oss-process=image/format,webp" alt="" width="366" height="200" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg?x-oss-process=image/format,webp 366w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_164/format,webp 300w" sizes="(max-width: 366px) 100vw, 366px" />][1]

## 杂谈

0.1 <a href="https://www.f2e123.com/work/1012.html" target="_blank" rel="external noopener">图像处理的数学理论</a>

0.2 <a href="https://www.cnblogs.com/QinMoon/p/4885055.html" target="_blank" rel="external noopener">最临近插值-双线性插值算法原理 </a>

0.3 <a href="https://blog.csdn.net/myarrow/article/details/7692044" target="_blank" rel="external noopener">OpenGL ES 2.0基本概念</a>

0.4 <a href="https://blog.csdn.net/ryfdizuo/article/details/20793669" target="_blank" rel="external noopener">理解墨卡托投影原理</a>

0.5 <a href="https://blog.sina.com.cn/s/blog_61d40ee201017ccp.html" target="_blank" rel="external noopener">国内外主要的投影类型</a>

0.6 <a href="https://blog.csdn.net/zhouxuguang236/article/details/31820095" target="_blank" rel="external noopener">二维图形旋转公式的推导</a>

0.7 <a href="https://www.cnblogs.com/mrsunny/archive/2011/06/21/2086080.html" target="_blank" rel="external noopener">javascript动画、运动算法详细解释与分析 （三、Tween 运动算法：二次方曲线算法）</a>

## 基础篇

1.1 <a href="https://www.f2e123.com/aistack/954.html" target="_blank" rel="external noopener">初始WebGL和ThreeJS</a>

1.2 <a href="https://www.f2e123.com/aistack/957.html" target="_blank" rel="external noopener">点线面基本作图</a>

1.3 <a href="https://www.f2e123.com/aistack/976.html" target="_blank" rel="external noopener">运动的场景</a>

1.4 <a href="https://www.f2e123.com/aistack/961.html" target="_blank" rel="external noopener">WebGL中的相机</a>

1.5 <a href="https://www.f2e123.com/aistack/980.html" target="_blank" rel="external noopener">WebGL中的各种光</a>

1.6  <a href="https://www.f2e123.com/aistack/998.html" target="_blank" rel="external noopener">WebGL中的图片纹理合成</a>

1.7  <a href="https://www.f2e123.com/aistack/1002.html" target="_blank" rel="external noopener">WebGL中的Canvas纹理合成</a>

1.8 [3D模型的加载与使用][2]

## WebGL相关基础

2.1 <a href="https://www.cnblogs.com/yiyezhai/archive/2012/09/12/2677902.html" target="_blank" rel="external noopener">模型视图矩阵和投影矩阵</a>

2.2 <a href="https://www.cnblogs.com/yiyezhai/archive/2012/09/21/2697461.html" target="_blank" rel="external noopener">着色器和缓冲区</a>

2.3 <a href="https://www.cnblogs.com/yiyezhai/archive/2012/10/01/2709735.html" target="_blank" rel="external noopener">纹理、帧、深度检测和混合</a>

2.4 <a href="https://www.cnblogs.com/yiyezhai/archive/2012/10/08/2715448.html" target="_blank" rel="external noopener">光照原理和光照渲染</a>

## 参考资料

[webGL中文翻译教程][3]

## 谢谢！

转载请注明出处, T\_T 前端学堂fed123 T\_T

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

 [1]: https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/webgl-3-1.jpg
 [2]: https://www.f2e123.com/aistack/1006.html
 [3]: https://www.hiwebgl.com/?p=42