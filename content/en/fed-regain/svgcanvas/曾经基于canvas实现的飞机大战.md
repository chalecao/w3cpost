---
title: 曾经基于canvas实现的飞机大战


date: 2018-04-07T05:50:33+00:00
url: /pwa/1765.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/resize,m_fill,w_221,h_300
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/resize,m_fill,w_221,h_300
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/resize,m_fill,w_221,h_300
views:
  - 1872
  - 1872
fifu_image_alt:
  - 曾经基于canvas实现的飞机大战
like:
  - 1


---
<div class="detailcontennt">
  <p>
    首先看几张效果图：
  </p>
  
  <p>
    <img loading="lazy" class="alignnone size-medium wp-image-1778" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/resize,m_fill,w_221,h_300/format,webp" alt="" width="221" height="300" /><img loading="lazy" class="alignnone size-medium wp-image-1779" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516963924.gif?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516963924.gif?x-oss-process=image/resize,m_fill,w_261,h_300/format,webp" alt="" width="261" height="300" />
  </p>
  
  <p>
    上面三张图分别对应游戏的三种状态 ready，play，pause。<a href="https://chalecao.github.io/gameH5/AircraftWar/index.html" target="_blank" rel="noopener">体验一下</a>
  </p>
  
  <p>
    先介绍一下canvas 画图的原理，在这个游戏中的背景，飞机，子弹以及飞机被击中爆炸的效果都是一张张的图片，通过canvas的 drawImage() 函数把这一帧需要的所有图片按其所在的位置（坐标）画到画布上，当然有时候也需要画些文本，比如左上角的得分；然后接着画下一帧，同时改变飞机和子弹的位置；画下一帧之前一定要清除画布（通过这个函数 clearRect(x,  y, width, height))，不然就是下图的效果啦：<br /> <img loading="lazy" class="alignnone size-medium wp-image-1780" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516966853.gif?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516966853.gif?x-oss-process=image/resize,m_fill,w_261,h_300/format,webp" alt="" width="261" height="300" />
  </p>
  
  <p>
    辣眼睛！！！<br /> 不过在本例中因为每帧都要重新画上背景图，背景图又是填满整个画布的，所以画背景图时就等于把上一帧全部覆盖了，也就相当于清除画布了。
  </p>
  
  <p>
    下面我们开始聊实现的细节：
  </p>
  
  <h2>
    加载需要的图片
  </h2>
  
  <p>
    在让游戏跑起来之前要先把需要的图片加载进来，类似：<br /> <img loading="lazy" class="alignnone size-medium wp-image-1781" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516968807.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516968807.png?x-oss-process=image/resize,m_fill,w_300,h_176/format,webp" alt="" width="300" height="176" />
  </p>
  
  <p>
    代码如下：
  </p>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;"> 1&lt;/span> &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 所以图片的链接，包括背景图、各种飞机和飞机爆炸图、子弹图等&lt;/span>
&lt;span style="color: #008080;"> 2&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> imgName = [‘background.png‘, ‘game_pause_nor.png‘, ‘m1.png‘, ‘start.png‘&lt;span style="color: #000000;">, 
&lt;/span>&lt;span style="color: #008080;"> 3&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机1&lt;/span>
&lt;span style="color: #008080;"> 4&lt;/span>     [‘enemy1.png‘, ‘enemy1_down1.png‘, ‘enemy1_down2.png‘, ‘enemy1_down3.png‘, ‘enemy1_down4.png‘&lt;span style="color: #000000;">],
&lt;/span>&lt;span style="color: #008080;"> 5&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机2&lt;/span>
&lt;span style="color: #008080;"> 6&lt;/span>     [‘enemy2.png‘, ‘enemy2_down1.png‘, ‘enemy2_down2.png‘, ‘enemy2_down3.png‘, ‘enemy2_down4.png‘&lt;span style="color: #000000;">],
&lt;/span>&lt;span style="color: #008080;"> 7&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机3&lt;/span>
&lt;span style="color: #008080;"> 8&lt;/span>     [‘enemy3_n1.png‘, ‘enemy3_n2.png‘, ‘enemy3_hit.png‘, ‘enemy3_down1.png‘, ‘enemy3_down2.png‘, ‘enemy3_down3.png‘, ‘enemy3_down4.png‘, ‘enemy3_down5.png‘, ‘enemy3_down6.png‘&lt;span style="color: #000000;">, ],
&lt;/span>&lt;span style="color: #008080;"> 9&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 游戏loading图&lt;/span>
&lt;span style="color: #008080;">10&lt;/span>     [‘game_loading1.png‘, ‘game_loading2.png‘, ‘game_loading3.png‘, ‘game_loading4.png‘&lt;span style="color: #000000;">],
&lt;/span>&lt;span style="color: #008080;">11&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 玩家飞机图&lt;/span>
&lt;span style="color: #008080;">12&lt;/span>     [‘hero1.png‘, ‘hero2.png‘, ‘hero_blowup_n1.png‘, ‘hero_blowup_n2.png‘, ‘hero_blowup_n3.png‘, ‘hero_blowup_n4.png‘&lt;span style="color: #000000;">]
&lt;/span>&lt;span style="color: #008080;">13&lt;/span> &lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">14&lt;/span> &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 存储不同类型的图片&lt;/span>
&lt;span style="color: #008080;">15&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> bg = &lt;span style="color: #0000ff;">null&lt;/span>&lt;span style="color: #000000;">,
&lt;/span>&lt;span style="color: #008080;">16&lt;/span>     pause = &lt;span style="color: #0000ff;">null&lt;/span>&lt;span style="color: #000000;">,
&lt;/span>&lt;span style="color: #008080;">17&lt;/span>     m = &lt;span style="color: #0000ff;">null&lt;/span>&lt;span style="color: #000000;">,
&lt;/span>&lt;span style="color: #008080;">18&lt;/span>     startImg = &lt;span style="color: #0000ff;">null&lt;/span>&lt;span style="color: #000000;">,
&lt;/span>&lt;span style="color: #008080;">19&lt;/span>     enemy1 =&lt;span style="color: #000000;"> [],
&lt;/span>&lt;span style="color: #008080;">20&lt;/span>     enemy2 =&lt;span style="color: #000000;"> [],
&lt;/span>&lt;span style="color: #008080;">21&lt;/span>     enemy3 =&lt;span style="color: #000000;"> [],
&lt;/span>&lt;span style="color: #008080;">22&lt;/span>     gameLoad =&lt;span style="color: #000000;"> [],
&lt;/span>&lt;span style="color: #008080;">23&lt;/span>     heroImg =&lt;span style="color: #000000;"> [];
&lt;/span>&lt;span style="color: #008080;">24&lt;/span> &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 加载图片的进度&lt;/span>
&lt;span style="color: #008080;">25&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> progress = 1&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">26&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">********加载图片********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;">27&lt;/span> &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> download() {
&lt;/span>&lt;span style="color: #008080;">28&lt;/span>     bg = nImg(imgName[0&lt;span style="color: #000000;">]);
&lt;/span>&lt;span style="color: #008080;">29&lt;/span>     pause = nImg(imgName[1&lt;span style="color: #000000;">]);
&lt;/span>&lt;span style="color: #008080;">30&lt;/span>     m = nImg(imgName[2&lt;span style="color: #000000;">]);
&lt;/span>&lt;span style="color: #008080;">31&lt;/span>     startImg = nImg(imgName[3&lt;span style="color: #000000;">]);
&lt;/span>&lt;span style="color: #008080;">32&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; imgName[4].length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">33&lt;/span>         enemy1[i] = nImg(imgName[4&lt;span style="color: #000000;">][i]);
&lt;/span>&lt;span style="color: #008080;">34&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">35&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; imgName[5].length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">36&lt;/span>         enemy2[i] = nImg(imgName[5&lt;span style="color: #000000;">][i]);
&lt;/span>&lt;span style="color: #008080;">37&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">38&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; imgName[6].length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">39&lt;/span>         enemy3[i] = nImg(imgName[6&lt;span style="color: #000000;">][i]);
&lt;/span>&lt;span style="color: #008080;">40&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">41&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; imgName[7].length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">42&lt;/span>         gameLoad[i] = nImg(imgName[7&lt;span style="color: #000000;">][i]);
&lt;/span>&lt;span style="color: #008080;">43&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">44&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; imgName[8].length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">45&lt;/span>         heroImg[i] = nImg(imgName[8&lt;span style="color: #000000;">][i]);
&lt;/span>&lt;span style="color: #008080;">46&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">47&lt;/span> 
&lt;span style="color: #008080;">48&lt;/span>     &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> nImg(src) {
&lt;/span>&lt;span style="color: #008080;">49&lt;/span>         &lt;span style="color: #0000ff;">var&lt;/span> img = &lt;span style="color: #0000ff;">new&lt;/span>&lt;span style="color: #000000;"> Image();
&lt;/span>&lt;span style="color: #008080;">50&lt;/span>         img.src = ‘img/‘ +&lt;span style="color: #000000;"> src;
&lt;/span>&lt;span style="color: #008080;">51&lt;/span>         img.onload =&lt;span style="color: #000000;"> imgLoad;
&lt;/span>&lt;span style="color: #008080;">52&lt;/span>         &lt;span style="color: #0000ff;">return&lt;/span>&lt;span style="color: #000000;"> img;
&lt;/span>&lt;span style="color: #008080;">53&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">54&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 绘制游戏加载进度画面&lt;/span>
&lt;span style="color: #008080;">55&lt;/span>     &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> imgLoad() {
&lt;/span>&lt;span style="color: #008080;">56&lt;/span>         progress += 3&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">57&lt;/span>         ctx.clearRect(0, 0&lt;span style="color: #000000;">, canvas.width, canvas.height);
&lt;/span>&lt;span style="color: #008080;">58&lt;/span>         &lt;span style="color: #0000ff;">var&lt;/span> text = progress + ‘%‘&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">59&lt;/span>         &lt;span style="color: #0000ff;">var&lt;/span> tw =&lt;span style="color: #000000;"> ctx.measureText(text).width;
&lt;/span>&lt;span style="color: #008080;">60&lt;/span>         ctx.font = ‘60px arial‘&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">61&lt;/span>         ctx.fillStyle = ‘red‘&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">62&lt;/span>         ctx.lineWidth = ‘0‘&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">63&lt;/span>         ctx.strokeStyle = ‘#888‘&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">64&lt;/span>         &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">ctx.strokeText(text,(width-tw)/2,height/2);&lt;/span>
&lt;span style="color: #008080;">65&lt;/span>         ctx.fillText(text, (width - tw) / 2, height / 2&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">66&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (progress &gt;= 100&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">67&lt;/span> &lt;span style="color: #000000;">            start();
&lt;/span>&lt;span style="color: #008080;">68&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">69&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">70&lt;/span> &lt;span style="color: #000000;">}
&lt;/span>&lt;span style="color: #008080;">71&lt;/span> download();</code></pre>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    其中有处理图片分类和加载进度的问题，代码有些冗余。
  </p>
  
  <h2>
    让背景动起来
  </h2>
  
  <p>
    从上面的游戏ready状态图可以看出游戏背景在不停的往上移动；<br /> 实现原理：连续画两张背景图到画布上，一上一下，第一张画在坐标为(0，0) 的位置，第二张紧接着第一张，然后每画一帧往上移动一点（一到两个像素吧），当上面的那张图片移出画布之后，将Y轴的坐标重置为0；代码如下：
  </p>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;">1&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> y = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">2&lt;/span> &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> paintBg() {
&lt;/span>&lt;span style="color: #008080;">3&lt;/span>     ctx.drawImage(bg, 0&lt;span style="color: #000000;">, y); // bg是背景图元素
&lt;/span>&lt;span style="color: #008080;">4&lt;/span>     ctx.drawImage(bg, 0, y - 852&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">5&lt;/span>     y++ == 852 && (y = 0&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">6&lt;/span> }</code></pre>
  </div>
  
  <h2>
    构造玩家飞机(hero)
  </h2>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;"> 1&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">********构造hero***********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;"> 2&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> hero = &lt;span style="color: #0000ff;">null&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;"> 3&lt;/span> 
&lt;span style="color: #008080;"> 4&lt;/span> &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> Hero() {
&lt;/span>&lt;span style="color: #008080;"> 5&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.x = (width - heroImg[0].width) / 2;  &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> hero的坐标&lt;/span>
&lt;span style="color: #008080;"> 6&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.y = height - heroImg[0&lt;span style="color: #000000;">].height;
&lt;/span>&lt;span style="color: #008080;"> 7&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.index = 0; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于切换hero的图片&lt;/span>
&lt;span style="color: #008080;"> 8&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.count = 0; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于控制hero图片切换的频率&lt;/span>
&lt;span style="color: #008080;"> 9&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.hCount = 0; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于控制子弹发射的频率&lt;/span>
&lt;span style="color: #008080;">10&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.eCount = 0; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于控制敌机出现的频率    &lt;/span>
&lt;span style="color: #008080;">11&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.n = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">12&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.draw = &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;">() {
&lt;/span>&lt;span style="color: #008080;">13&lt;/span>         ctx.drawImage(heroImg[&lt;span style="color: #0000ff;">this&lt;/span>.index], &lt;span style="color: #0000ff;">this&lt;/span>.x, &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.y);
&lt;/span>&lt;span style="color: #008080;">14&lt;/span>         ctx.fillText(‘SCORE:‘ + gameScore, 10, 30&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">15&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.count++&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">16&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.count % 3 == 0) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 切换hero的图片&lt;/span>
&lt;span style="color: #008080;">17&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.index = &lt;span style="color: #0000ff;">this&lt;/span>.index == 0 ? 1 : 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">18&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.count = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">19&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">20&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.hCount++&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">21&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.hCount % 3 == 0) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 同时生成三颗子弹&lt;/span>
&lt;span style="color: #008080;">22&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.n == 32 && (&lt;span style="color: #0000ff;">this&lt;/span>.n = 0&lt;span style="color: #000000;">); 
&lt;/span>&lt;span style="color: #008080;">23&lt;/span>             hullet.push(&lt;span style="color: #0000ff;">new&lt;/span> Hullet(&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.n));
&lt;/span>&lt;span style="color: #008080;">24&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.n == 0 && (&lt;span style="color: #0000ff;">this&lt;/span>.n = -32&lt;span style="color: #000000;">);;
&lt;/span>&lt;span style="color: #008080;">25&lt;/span>             hullet.push(&lt;span style="color: #0000ff;">new&lt;/span> Hullet(&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.n));
&lt;/span>&lt;span style="color: #008080;">26&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.n == -32 && (&lt;span style="color: #0000ff;">this&lt;/span>.n = 32&lt;span style="color: #000000;">);;
&lt;/span>&lt;span style="color: #008080;">27&lt;/span>             hullet.push(&lt;span style="color: #0000ff;">new&lt;/span> Hullet(&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.n));
&lt;/span>&lt;span style="color: #008080;">28&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.hCount = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">29&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">30&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.eCount++&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">31&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.eCount % 8 == 0) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">生成敌机&lt;/span>
&lt;span style="color: #008080;">32&lt;/span>             liveEnemy.push(&lt;span style="color: #0000ff;">new&lt;/span>&lt;span style="color: #000000;"> Enemy());
&lt;/span>&lt;span style="color: #008080;">33&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.eCount = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">34&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">35&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">36&lt;/span> 
&lt;span style="color: #008080;">37&lt;/span>     &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> move(e) {
&lt;/span>&lt;span style="color: #008080;">38&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (curPhase == PHASE_PLAY || curPhase ==&lt;span style="color: #000000;"> PHASE_PAUSE) {
&lt;/span>&lt;span style="color: #008080;">39&lt;/span>             curPhase =&lt;span style="color: #000000;"> PHASE_PLAY;
&lt;/span>&lt;span style="color: #008080;">40&lt;/span>             &lt;span style="color: #0000ff;">var&lt;/span> offsetX = e.offsetX || e.touches[0&lt;span style="color: #000000;">].pageX;
&lt;/span>&lt;span style="color: #008080;">41&lt;/span>             &lt;span style="color: #0000ff;">var&lt;/span> offsetY = e.offsetY || e.touches[0&lt;span style="color: #000000;">].pageY;
&lt;/span>&lt;span style="color: #008080;">42&lt;/span>             &lt;span style="color: #0000ff;">var&lt;/span> w = heroImg[0&lt;span style="color: #000000;">].width,
&lt;/span>&lt;span style="color: #008080;">43&lt;/span>                 h = heroImg[0&lt;span style="color: #000000;">].height;
&lt;/span>&lt;span style="color: #008080;">44&lt;/span>             &lt;span style="color: #0000ff;">var&lt;/span> nx = offsetX - w / 2&lt;span style="color: #000000;">,
&lt;/span>&lt;span style="color: #008080;">45&lt;/span>                 ny = offsetY - h / 2&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">46&lt;/span>             nx &lt; 20 - w / 2 ? nx = 20 - w / 2 : nx &gt; (canvas.width - w / 2 - 20) ? nx = (canvas.width - w / 2 - 20) : 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">47&lt;/span>             ny &lt; 0 ? ny = 0 : ny &gt; (canvas.height - h / 2) ? ny = (canvas.height - h / 2) : 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">48&lt;/span>             hero.x =&lt;span style="color: #000000;"> nx;
&lt;/span>&lt;span style="color: #008080;">49&lt;/span>             hero.y =&lt;span style="color: #000000;"> ny;
&lt;/span>&lt;span style="color: #008080;">50&lt;/span>             hero.count = 2&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">51&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">52&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">53&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 绑定鼠标移动和手指触摸事件，控制hero移动&lt;/span>
&lt;span style="color: #008080;">54&lt;/span>     canvas.addEventListener("mousemove", move, &lt;span style="color: #0000ff;">false&lt;/span>&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">55&lt;/span>     canvas.addEventListener("touchmove", move, &lt;span style="color: #0000ff;">false&lt;/span>&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">56&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 鼠标移除时游戏暂停&lt;/span>
&lt;span style="color: #008080;">57&lt;/span>     canvas.onmouseout = &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;">(e) {
&lt;/span>&lt;span style="color: #008080;">58&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (curPhase ==&lt;span style="color: #000000;"> PHASE_PLAY) {
&lt;/span>&lt;span style="color: #008080;">59&lt;/span>             curPhase =&lt;span style="color: #000000;"> PHASE_PAUSE;
&lt;/span>&lt;span style="color: #008080;">60&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">61&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">62&lt;/span> }</code></pre>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    本例中并没有设置hero的碰撞检测和生命值，所以英雄无敌！！！哈哈哈哈！！！<br /> 然并卵，我已经写不下去了；可是，坚持就是胜利呀；好吧，继续！
  </p>
  
  <h2>
    构造子弹
  </h2>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;"> 1&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">*********构造子弹**********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;"> 2&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> hullet = []; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 存储画布中所以子弹的数组&lt;/span>
&lt;span style="color: #008080;"> 3&lt;/span> 
&lt;span style="color: #008080;"> 4&lt;/span> &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> Hullet(n) {
&lt;/span>&lt;span style="color: #008080;"> 5&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.n = n;  &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于确定是左中右哪一颗子弹&lt;/span>
&lt;span style="color: #008080;"> 6&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 子弹的坐标&lt;/span>
&lt;span style="color: #008080;"> 7&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.mx = hero.x + (heroImg[0].width - m.width) / 2 + &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.n; 
&lt;/span>&lt;span style="color: #008080;"> 8&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.my = &lt;span style="color: #0000ff;">this&lt;/span>.n == 0 ? hero.y - m.height : hero.y +&lt;span style="color: #000000;"> m.height;
&lt;/span>&lt;span style="color: #008080;"> 9&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.width = m.width;  &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 子弹的宽和高&lt;/span>
&lt;span style="color: #008080;">10&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.height =&lt;span style="color: #000000;"> m.height;
&lt;/span>&lt;span style="color: #008080;">11&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">false&lt;/span>; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 标识子弹是否可移除了&lt;/span>
&lt;span style="color: #008080;">12&lt;/span> &lt;span style="color: #000000;">}
&lt;/span>&lt;span style="color: #008080;">13&lt;/span> Hullet.drawHullet = &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;">() {
&lt;/span>&lt;span style="color: #008080;">14&lt;/span>     &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; hullet.length; i++) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">在画布上画出所以子弹&lt;/span>
&lt;span style="color: #008080;">15&lt;/span> &lt;span style="color: #000000;">        hullet[i].draw();
&lt;/span>&lt;span style="color: #008080;">16&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (hullet[i].removable) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 如果为true就移除这颗子弹&lt;/span>
&lt;span style="color: #008080;">17&lt;/span>             hullet.splice(i, 1&lt;span style="color: #000000;">);
&lt;/span>&lt;span style="color: #008080;">18&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">19&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">20&lt;/span> &lt;span style="color: #000000;">}
&lt;/span>&lt;span style="color: #008080;">21&lt;/span> Hullet.prototype.draw = &lt;span style="color: #0000ff;">function&lt;/span>() { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 在画布上画子弹&lt;/span>
&lt;span style="color: #008080;">22&lt;/span>     ctx.drawImage(m, &lt;span style="color: #0000ff;">this&lt;/span>.mx, &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.my);
&lt;/span>&lt;span style="color: #008080;">23&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.my -= 20&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">24&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.mx += &lt;span style="color: #0000ff;">this&lt;/span>.n == 32 ? 3 : &lt;span style="color: #0000ff;">this&lt;/span>.n == -32 ? -3 : 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">25&lt;/span>     &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.my &lt; -m.height) {  &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 如果子弹飞出画布，就标记为可移除&lt;/span>
&lt;span style="color: #008080;">26&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">true&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">27&lt;/span> &lt;span style="color: #000000;">    };
&lt;/span>&lt;span style="color: #008080;">28&lt;/span> }</code></pre>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <h2>
    构造敌机
  </h2>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;"> 1&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">**********构造敌机*******&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;"> 2&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> liveEnemy = []; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 用于存储画布上的所有敌机&lt;/span>
&lt;span style="color: #008080;"> 3&lt;/span> 
&lt;span style="color: #008080;"> 4&lt;/span> &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> Enemy() {
&lt;/span>&lt;span style="color: #008080;"> 5&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.n = Math.random() * 20&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;"> 6&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.enemy = &lt;span style="color: #0000ff;">null&lt;/span>; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 保存敌机图片的数组&lt;/span>
&lt;span style="color: #008080;"> 7&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.speed = 0; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机的速度&lt;/span>
&lt;span style="color: #008080;"> 8&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.lifes = 2; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机的生命值&lt;/span>
&lt;span style="color: #008080;"> 9&lt;/span>     &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.n &lt; 1) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 不同大小的敌机随机出现&lt;/span>
&lt;span style="color: #008080;">10&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy3[0&lt;span style="color: #000000;">]; 
&lt;/span>&lt;span style="color: #008080;">11&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.speed = 2&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">12&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.lifes = 50&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">13&lt;/span>     } &lt;span style="color: #0000ff;">else&lt;/span> &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.n &lt; 6&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">14&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy2[0&lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">15&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.speed = 4&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">16&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.lifes = 10&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">17&lt;/span>     } &lt;span style="color: #0000ff;">else&lt;/span>&lt;span style="color: #000000;"> {
&lt;/span>&lt;span style="color: #008080;">18&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy1[0&lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">19&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.speed = 6&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">20&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">21&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.x = parseInt(Math.random() * (canvas.width - &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.enemy.width));
&lt;/span>&lt;span style="color: #008080;">22&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.y = -&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.enemy.height;
&lt;/span>&lt;span style="color: #008080;">23&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.width = &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.enemy.width;
&lt;/span>&lt;span style="color: #008080;">24&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.height = &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.enemy.height;
&lt;/span>&lt;span style="color: #008080;">25&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.index = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">26&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">false&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">27&lt;/span>     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 标识敌机是否狗带，若狗带就画它的爆炸图(也就是遗像啦)&lt;/span>
&lt;span style="color: #008080;">28&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.die = &lt;span style="color: #0000ff;">false&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">29&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.draw = &lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;">() {
&lt;/span>&lt;span style="color: #008080;">30&lt;/span>         &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 处理不同敌机的爆炸图轮番上阵&lt;/span>
&lt;span style="color: #008080;">31&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.speed == 2&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">32&lt;/span>             &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.die) {
&lt;/span>&lt;span style="color: #008080;">33&lt;/span>                 &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.index &lt; 2) { &lt;span style="color: #0000ff;">this&lt;/span>.index = 3&lt;span style="color: #000000;">; }
&lt;/span>&lt;span style="color: #008080;">34&lt;/span>                 &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.index &lt;&lt;span style="color: #000000;"> enemy3.length) {
&lt;/span>&lt;span style="color: #008080;">35&lt;/span>                     &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy3[&lt;span style="color: #0000ff;">this&lt;/span>.index++&lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">36&lt;/span>                 } &lt;span style="color: #0000ff;">else&lt;/span>&lt;span style="color: #000000;"> {
&lt;/span>&lt;span style="color: #008080;">37&lt;/span>                     &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">true&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">38&lt;/span> &lt;span style="color: #000000;">                }
&lt;/span>&lt;span style="color: #008080;">39&lt;/span>             } &lt;span style="color: #0000ff;">else&lt;/span>&lt;span style="color: #000000;"> {
&lt;/span>&lt;span style="color: #008080;">40&lt;/span>                 &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy3[&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.index];
&lt;/span>&lt;span style="color: #008080;">41&lt;/span>                 &lt;span style="color: #0000ff;">this&lt;/span>.index == 0 ? &lt;span style="color: #0000ff;">this&lt;/span>.index = 1 : &lt;span style="color: #0000ff;">this&lt;/span>.index = 0&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">42&lt;/span> &lt;span style="color: #000000;">            }
&lt;/span>&lt;span style="color: #008080;">43&lt;/span>         } &lt;span style="color: #0000ff;">else&lt;/span> &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.die) {
&lt;/span>&lt;span style="color: #008080;">44&lt;/span>             &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.index &lt;&lt;span style="color: #000000;"> enemy1.length) {
&lt;/span>&lt;span style="color: #008080;">45&lt;/span>                 &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.speed == 6&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">46&lt;/span>                     &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy1[&lt;span style="color: #0000ff;">this&lt;/span>.index++&lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">47&lt;/span>                 } &lt;span style="color: #0000ff;">else&lt;/span>&lt;span style="color: #000000;"> {
&lt;/span>&lt;span style="color: #008080;">48&lt;/span>                     &lt;span style="color: #0000ff;">this&lt;/span>.enemy = enemy2[&lt;span style="color: #0000ff;">this&lt;/span>.index++&lt;span style="color: #000000;">];
&lt;/span>&lt;span style="color: #008080;">49&lt;/span> &lt;span style="color: #000000;">                }
&lt;/span>&lt;span style="color: #008080;">50&lt;/span>             } &lt;span style="color: #0000ff;">else&lt;/span>&lt;span style="color: #000000;"> {
&lt;/span>&lt;span style="color: #008080;">51&lt;/span>                 &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">true&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">52&lt;/span> &lt;span style="color: #000000;">            }
&lt;/span>&lt;span style="color: #008080;">53&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">54&lt;/span>         ctx.drawImage(&lt;span style="color: #0000ff;">this&lt;/span>.enemy, &lt;span style="color: #0000ff;">this&lt;/span>.x, &lt;span style="color: #0000ff;">this&lt;/span>&lt;span style="color: #000000;">.y);
&lt;/span>&lt;span style="color: #008080;">55&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.y += &lt;span style="color: #0000ff;">this&lt;/span>.speed; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 移动敌机&lt;/span>
&lt;span style="color: #008080;">56&lt;/span>         &lt;span style="color: #0000ff;">this&lt;/span>.hit(); &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">判断是否击中敌机&lt;/span>
&lt;span style="color: #008080;">57&lt;/span>         &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.y &gt; canvas.height) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 若敌机飞出画布，就标识可移除(让你不长眼！)&lt;/span>
&lt;span style="color: #008080;">58&lt;/span>             &lt;span style="color: #0000ff;">this&lt;/span>.removable = &lt;span style="color: #0000ff;">true&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">59&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">60&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">61&lt;/span>     &lt;span style="color: #0000ff;">this&lt;/span>.hit = &lt;span style="color: #0000ff;">function&lt;/span>() { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">判断是否击中敌机&lt;/span>
&lt;span style="color: #008080;">62&lt;/span>         &lt;span style="color: #0000ff;">for&lt;/span> (&lt;span style="color: #0000ff;">var&lt;/span> i = 0; i &lt; hullet.length; i++&lt;span style="color: #000000;">) {
&lt;/span>&lt;span style="color: #008080;">63&lt;/span>             &lt;span style="color: #0000ff;">var&lt;/span> h =&lt;span style="color: #000000;"> hullet[i];
&lt;/span>&lt;span style="color: #008080;">64&lt;/span>             &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 敌机与子弹的碰撞检测，自己体会吧&lt;/span>
&lt;span style="color: #008080;">65&lt;/span>             &lt;span style="color: #0000ff;">if&lt;/span> (&lt;span style="color: #0000ff;">this&lt;/span>.x + &lt;span style="color: #0000ff;">this&lt;/span>.width &gt;= h.mx && h.mx + h.width &gt;= &lt;span style="color: #0000ff;">this&lt;/span>.x &&
&lt;span style="color: #008080;">66&lt;/span>                 h.my + h.height &gt;= &lt;span style="color: #0000ff;">this&lt;/span>.y && &lt;span style="color: #0000ff;">this&lt;/span>.height + &lt;span style="color: #0000ff;">this&lt;/span>.y &gt;=&lt;span style="color: #000000;"> h.my) {
&lt;/span>&lt;span style="color: #008080;">67&lt;/span>                 &lt;span style="color: #0000ff;">if&lt;/span> (--&lt;span style="color: #0000ff;">this&lt;/span>.lifes == 0) { &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 若生命值为零，标识为死亡&lt;/span>
&lt;span style="color: #008080;">68&lt;/span>                     &lt;span style="color: #0000ff;">this&lt;/span>.die = &lt;span style="color: #0000ff;">true&lt;/span>&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">69&lt;/span>                     &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 计分&lt;/span>
&lt;span style="color: #008080;">70&lt;/span>                     gameScore += &lt;span style="color: #0000ff;">this&lt;/span>.speed == 6 ? 10 : &lt;span style="color: #0000ff;">this&lt;/span>.speed == 4 ? 20 : 100&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">71&lt;/span> &lt;span style="color: #000000;">                }
&lt;/span>&lt;span style="color: #008080;">72&lt;/span>                 h.removable = &lt;span style="color: #0000ff;">true&lt;/span>; &lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;"> 碰撞后的子弹标识为可移除&lt;/span>
&lt;span style="color: #008080;">73&lt;/span> &lt;span style="color: #000000;">            }
&lt;/span>&lt;span style="color: #008080;">74&lt;/span> &lt;span style="color: #000000;">        }
&lt;/span>&lt;span style="color: #008080;">75&lt;/span> &lt;span style="color: #000000;">    }
&lt;/span>&lt;span style="color: #008080;">76&lt;/span> }</code></pre>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <h2>
    游戏的几种状态
  </h2>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008080;">1&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">*******定义游戏状态**********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;">2&lt;/span> const PHASE_DOWNLOAD = 1&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">3&lt;/span> const PHASE_READY = 2&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">4&lt;/span> const PHASE_LOADING = 3&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">5&lt;/span> const PHASE_PLAY = 4&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">6&lt;/span> const PHASE_PAUSE = 5&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">7&lt;/span> const PHASE_GAMEOVER = 6&lt;span style="color: #000000;">;
&lt;/span>&lt;span style="color: #008080;">8&lt;/span> &lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">*********游戏当前状态***********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #008080;">9&lt;/span> &lt;span style="color: #0000ff;">var&lt;/span> curPhase = PHASE_DOWNLOAD;</code></pre>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    有了状态，我只需要起一个定时器，判断游戏的状态，绘制对应的帧就行；像这样：
  </p>
  
  <div class="cnblogs_code">
    <pre><code>&lt;span style="color: #008000;">/*&lt;/span>&lt;span style="color: #008000;">*********游戏主引擎********&lt;/span>&lt;span style="color: #008000;">*/&lt;/span>
&lt;span style="color: #0000ff;">function&lt;/span>&lt;span style="color: #000000;"> gameEngine() {
    &lt;/span>&lt;span style="color: #0000ff;">switch&lt;/span>&lt;span style="color: #000000;"> (curPhase) {
        &lt;/span>&lt;span style="color: #0000ff;">case&lt;/span>&lt;span style="color: #000000;"> PHASE_READY:
            pBg();
            paintLogo();
            &lt;/span>&lt;span style="color: #0000ff;">break&lt;/span>&lt;span style="color: #000000;">;
        &lt;/span>&lt;span style="color: #0000ff;">case&lt;/span>&lt;span style="color: #000000;"> PHASE_LOADING:
            pBg();
            load();
            &lt;/span>&lt;span style="color: #0000ff;">break&lt;/span>&lt;span style="color: #000000;">;
        &lt;/span>&lt;span style="color: #0000ff;">case&lt;/span>&lt;span style="color: #000000;"> PHASE_PLAY:
            pBg();
            drawEnemy();
            Hullet.drawHullet();
            hero.draw();
            &lt;/span>&lt;span style="color: #0000ff;">break&lt;/span>&lt;span style="color: #000000;">;
        &lt;/span>&lt;span style="color: #0000ff;">case&lt;/span>&lt;span style="color: #000000;"> PHASE_PAUSE:
            drawPause();
            &lt;/span>&lt;span style="color: #0000ff;">break&lt;/span>&lt;span style="color: #000000;">;
    }
    &lt;/span>&lt;span style="color: #008000;">//&lt;/span>&lt;span style="color: #008000;">requestAnimationFrame(gameEngine);&lt;/span>
&lt;span style="color: #000000;">}
setInterval(gameEngine, &lt;/span>50);</code></pre>
  </div>
  
  <p>
    代码见：<a href="https://github.com/chalecao/gameH5">github</a>
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    &nbsp;
  </p>
</div>