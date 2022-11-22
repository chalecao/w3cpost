---
title: js模拟红白机jsnes任天堂游戏机


date: 2017-08-28T10:04:04+00:00
excerpt: |
  研究了一下网页运行红白机，其实这个很早就有老外写了这个模拟器，用js代码写的模拟红白机的硬件，然后加载nes格式的游戏，但是支持的知识较早的nes游戏rom，貌似后来开发的都不支持。
  奉上我做的网页版：FC游戏机：https://game.haomou.net/，也可以关注我的微信公众号，见左边。可以直接在手机上玩。
url: /javascriptnodejs/662.html
views:
  - 3676
  - 3676
fifu_image_url:
  - https://www.fed123.com/wp-content/uploads/2017/08/1-1F603141504352.jpg
  - https://www.fed123.com/wp-content/uploads/2017/08/1-1F603141504352.jpg
fifu_image_alt:
  - js模拟红白机jsnes
  - js模拟红白机jsnes


---
研究了一下网页运行红白机，其实这个很早就有老外写了这个模拟器，用js代码写的模拟红白机的硬件，然后加载nes格式的游戏，但是支持的知识较早的nes游戏rom，貌似后来开发的都不支持。  
奉上我做的网页版：<a href="https://chalecao.github.io/game/index.html" target="_blank" rel="external noopener">FC游戏机</a>

，也可以关注我的微信公众号，见左边。可以直接在手机上玩。

游戏机GIT代码： <a href="https://github.com/chalecao/game.git" target="_blank" rel="external noopener">https://github.com/chalecao/game.git</a> （欢迎给我点星星哦，欢迎fork）

![js模拟红白机jsnes][1] 

### fc硬件

FC使用了1.79Mhz的摩斯太克制造的 Mos 6502（8位）CPU（原用于苹果第一台mac:Apple I)，分辨率为256&#215;240，52色中最大同时显示24色，最大活动块(sprite)数是64，活动块大小为8&#215;8。声音方面使用PSG音源，有4个模拟声道和1个数字声道。卡带的极限容量是4Mbit(512KB)。特别的是FC第一次在主机内部搭载了PPU(Picture Processing Unit)用来得到强化的图像效果。这使游戏的质量比起Atari2600时代有了质的飞跃。由于将操作从3D的摇杆转化成2D平面而在”Game&Watch”上受到好评的十字方向键也被FC也继承了下来。而现在十字键几乎成了Nintendo的招牌设计，也极大的影响到了其它厂商开发的主机手柄设计。  
NES  
中央处理器： 6502 CPU。  
二进制数值： 8Bits。  
运行频率： NTSC：1.7897725 Mhz ；PAL：1.773447 Mhz。  
内部储存器： 8KB，6KB显示存储器+2KB镜像存储器。  
图像处理器： 64种颜色，除去重复的颜色剩下52种颜色，最大显示数：16种颜色。  
Nintendo Entertainment System声音处理器： 矩形声波处理器两个，三角型声波处理器一个，噪音处理器一个，PCM数字声音发生器一个。  
硬件接口： 游戏卡带接口×1，游戏手柄接口×2。电源接口×1，RF视频线接口×1，AV视频线接口×1，周边设备接口×1。  
游戏载体： Rom卡带。  
游戏卡带容量： 24KB，40KB，48KB，64KB，80KB，128KB，160KB，256KB。  
周边设备： Zapper，Robot。  
参考：<a href="https://tieba.baidu.com/p/1389586189" target="_blank" rel="external noopener">https://tieba.baidu.com/p/1389586189</a>

## jsnes

这位大牛写的硬件模拟器，是基于上面的硬件配置来写的。看了一下源代码，声波处理器有些问题，目前算法效率太低，导致开启声音时游戏运行比较卡顿。github: <a href="https://github.com/bfirsh/jsnes" target="_blank" rel="external noopener">https://github.com/bfirsh/jsnes</a>

抽空优化优化，大家可以玩玩我做的网页版的，也欢迎打赏哈！

<img loading="lazy" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/qrcoderead-1.jpg" alt="js模拟红白机jsnes" width="150" height="150" /> 

### 谢谢！

欢迎关注公众号（扫描左侧二维码），前端学习交流

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/1-1F603141504352.jpg