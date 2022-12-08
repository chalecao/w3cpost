---
title: 曾经基于canvas实现的飞机大战

---

<div class="detailcontennt">
 首先看几张效果图：
  
 <img loading="lazy" class="alignnone size-medium wp-image-1778" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516961970.gif?x-oss-process=image/resize,m_fill,w_221,h_300/format,webp" alt="" width="221" height="300" /><img loading="lazy" class="alignnone size-medium wp-image-1779" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516963924.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516963924.gif?x-oss-process=image/resize,m_fill,w_261,h_300/format,webp" alt="" width="261" height="300" />
  
 上面三张图分别对应游戏的三种状态 ready，play，pause。<a href="https://chalecao.github.io/gameH5/AircraftWar/index.html" target="_blank" rel="noopener">体验一下</a>
  
 先介绍一下canvas 画图的原理，在这个游戏中的背景，飞机，子弹以及飞机被击中爆炸的效果都是一张张的图片，通过canvas的 drawImage() 函数把这一帧需要的所有图片按其所在的位置（坐标）画到画布上，当然有时候也需要画些文本，比如左上角的得分；然后接着画下一帧，同时改变飞机和子弹的位置；画下一帧之前一定要清除画布（通过这个函数 clearRect(x,  y, width, height))，不然就是下图的效果啦：<br /> <img loading="lazy" class="alignnone size-medium wp-image-1780" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516966853.gif" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516966853.gif?x-oss-process=image/resize,m_fill,w_261,h_300/format,webp" alt="" width="261" height="300" />
  
 辣眼睛！！！<br /> 不过在本例中因为每帧都要重新画上背景图，背景图又是填满整个画布的，所以画背景图时就等于把上一帧全部覆盖了，也就相当于清除画布了。
  
 下面[我们](https://www.w3cdoc.com)开始聊实现的细节：
  
  ##   加载需要的图片
  

 在让游戏跑起来之前要先把需要的图片加载进来，类似：<br /> <img loading="lazy" class="alignnone size-medium wp-image-1781" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516968807.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/20180110224516968807.png?x-oss-process=image/resize,m_fill,w_300,h_176/format,webp" alt="" width="300" height="176" />
  
 代码如下：
  
  <div class="cnblogs_code">
    ```
<span style="color: #008080;"> 1</span> <span style="color: #008000;">//</span><span style="color: #008000;"> 所以图片的链接，包括背景图、各种飞机和飞机爆炸图、子弹图等</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> imgName = [‘background.png‘, ‘game_pause_nor.png‘, ‘m1.png‘, ‘start.png‘<span style="color: #000000;">,
</span><span style="color: #008080;"> 3</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机1</span>
<span style="color: #008080;"> 4</span>     [‘enemy1.png‘, ‘enemy1_down1.png‘, ‘enemy1_down2.png‘, ‘enemy1_down3.png‘, ‘enemy1_down4.png‘<span style="color: #000000;">],
</span><span style="color: #008080;"> 5</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机2</span>
<span style="color: #008080;"> 6</span>     [‘enemy2.png‘, ‘enemy2_down1.png‘, ‘enemy2_down2.png‘, ‘enemy2_down3.png‘, ‘enemy2_down4.png‘<span style="color: #000000;">],
</span><span style="color: #008080;"> 7</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机3</span>
<span style="color: #008080;"> 8</span>     [‘enemy3_n1.png‘, ‘enemy3_n2.png‘, ‘enemy3_hit.png‘, ‘enemy3_down1.png‘, ‘enemy3_down2.png‘, ‘enemy3_down3.png‘, ‘enemy3_down4.png‘, ‘enemy3_down5.png‘, ‘enemy3_down6.png‘<span style="color: #000000;">, ],
</span><span style="color: #008080;"> 9</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 游戏loading图</span>
<span style="color: #008080;">10</span>     [‘game_loading1.png‘, ‘game_loading2.png‘, ‘game_loading3.png‘, ‘game_loading4.png‘<span style="color: #000000;">],
</span><span style="color: #008080;">11</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 玩家飞机图</span>
<span style="color: #008080;">12</span>     [‘hero1.png‘, ‘hero2.png‘, ‘hero_blowup_n1.png‘, ‘hero_blowup_n2.png‘, ‘hero_blowup_n3.png‘, ‘hero_blowup_n4.png‘<span style="color: #000000;">]
</span><span style="color: #008080;">13</span> <span style="color: #000000;">];
</span><span style="color: #008080;">14</span> <span style="color: #008000;">//</span><span style="color: #008000;"> 存储不同类型的图片</span>
<span style="color: #008080;">15</span> <span style="color: #0000ff;">var</span> bg = <span style="color: #0000ff;">null</span><span style="color: #000000;">,
</span><span style="color: #008080;">16</span>     pause = <span style="color: #0000ff;">null</span><span style="color: #000000;">,
</span><span style="color: #008080;">17</span>     m = <span style="color: #0000ff;">null</span><span style="color: #000000;">,
</span><span style="color: #008080;">18</span>     startImg = <span style="color: #0000ff;">null</span><span style="color: #000000;">,
</span><span style="color: #008080;">19</span>     enemy1 =<span style="color: #000000;"> [],
</span><span style="color: #008080;">20</span>     enemy2 =<span style="color: #000000;"> [],
</span><span style="color: #008080;">21</span>     enemy3 =<span style="color: #000000;"> [],
</span><span style="color: #008080;">22</span>     gameLoad =<span style="color: #000000;"> [],
</span><span style="color: #008080;">23</span>     heroImg =<span style="color: #000000;"> [];
</span><span style="color: #008080;">24</span> <span style="color: #008000;">//</span><span style="color: #008000;"> 加载图片的进度</span>
<span style="color: #008080;">25</span> <span style="color: #0000ff;">var</span> progress = 1<span style="color: #000000;">;
</span><span style="color: #008080;">26</span> <span style="color: #008000;">/*</span><span style="color: #008000;">********加载图片********</span><span style="color: #008000;">*/</span>
<span style="color: #008080;">27</span> <span style="color: #0000ff;">function</span><span style="color: #000000;"> download() {
</span><span style="color: #008080;">28</span>     bg = nImg(imgName[0<span style="color: #000000;">]);
</span><span style="color: #008080;">29</span>     pause = nImg(imgName[1<span style="color: #000000;">]);
</span><span style="color: #008080;">30</span>     m = nImg(imgName[2<span style="color: #000000;">]);
</span><span style="color: #008080;">31</span>     startImg = nImg(imgName[3<span style="color: #000000;">]);
</span><span style="color: #008080;">32</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < imgName[4].length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">33</span>         enemy1[i] = nImg(imgName[4<span style="color: #000000;">][i]);
</span><span style="color: #008080;">34</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">35</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < imgName[5].length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">36</span>         enemy2[i] = nImg(imgName[5<span style="color: #000000;">][i]);
</span><span style="color: #008080;">37</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">38</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < imgName[6].length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">39</span>         enemy3[i] = nImg(imgName[6<span style="color: #000000;">][i]);
</span><span style="color: #008080;">40</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">41</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < imgName[7].length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">42</span>         gameLoad[i] = nImg(imgName[7<span style="color: #000000;">][i]);
</span><span style="color: #008080;">43</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">44</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < imgName[8].length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">45</span>         heroImg[i] = nImg(imgName[8<span style="color: #000000;">][i]);
</span><span style="color: #008080;">46</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">47</span>
<span style="color: #008080;">48</span>     <span style="color: #0000ff;">function</span><span style="color: #000000;"> nImg(src) {
</span><span style="color: #008080;">49</span>         <span style="color: #0000ff;">var</span> img = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Image();
</span><span style="color: #008080;">50</span>         img.src = ‘img/‘ +<span style="color: #000000;"> src;
</span><span style="color: #008080;">51</span>         img.onload =<span style="color: #000000;"> imgLoad;
</span><span style="color: #008080;">52</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> img;
</span><span style="color: #008080;">53</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">54</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 绘制游戏加载进度画面</span>
<span style="color: #008080;">55</span>     <span style="color: #0000ff;">function</span><span style="color: #000000;"> imgLoad() {
</span><span style="color: #008080;">56</span>         progress += 3<span style="color: #000000;">;
</span><span style="color: #008080;">57</span>         ctx.clearRect(0, 0<span style="color: #000000;">, canvas.width, canvas.height);
</span><span style="color: #008080;">58</span>         <span style="color: #0000ff;">var</span> text = progress + ‘%‘<span style="color: #000000;">;
</span><span style="color: #008080;">59</span>         <span style="color: #0000ff;">var</span> tw =<span style="color: #000000;"> ctx.measureText(text).width;
</span><span style="color: #008080;">60</span>         ctx.font = ‘60px arial‘<span style="color: #000000;">;
</span><span style="color: #008080;">61</span>         ctx.fillStyle = ‘red‘<span style="color: #000000;">;
</span><span style="color: #008080;">62</span>         ctx.lineWidth = ‘0‘<span style="color: #000000;">;
</span><span style="color: #008080;">63</span>         ctx.strokeStyle = ‘#888‘<span style="color: #000000;">;
</span><span style="color: #008080;">64</span>         <span style="color: #008000;">//</span><span style="color: #008000;">ctx.strokeText(text,(width-tw)/2,height/2);</span>
<span style="color: #008080;">65</span>         ctx.fillText(text, (width - tw) / 2, height / 2<span style="color: #000000;">);
</span><span style="color: #008080;">66</span>         <span style="color: #0000ff;">if</span> (progress >= 100<span style="color: #000000;">) {
</span><span style="color: #008080;">67</span> <span style="color: #000000;">            start();
</span><span style="color: #008080;">68</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">69</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">70</span> <span style="color: #000000;">}
</span><span style="color: #008080;">71</span> download();
```
  </div>
 
  
 其中有处理图片分类和加载进度的问题，代码有些冗余。
  
  ##   让背景动起来
  

 从上面的游戏ready状态图可以看出游戏背景在不停的往上移动；<br /> 实现原理：连续画两张背景图到画布上，一上一下，第一张画在坐标为(0，0) 的位置，第二张紧接着第一张，然后每画一帧往上移动一点（一到两个像素吧），当上面的那张图片移出画布之后，将Y轴的坐标重置为0；代码如下：
  
  <div class="cnblogs_code">
    ```
<span style="color: #008080;">1</span> <span style="color: #0000ff;">var</span> y = 0<span style="color: #000000;">;
</span><span style="color: #008080;">2</span> <span style="color: #0000ff;">function</span><span style="color: #000000;"> paintBg() {
</span><span style="color: #008080;">3</span>     ctx.drawImage(bg, 0<span style="color: #000000;">, y); // bg是背景图元素
</span><span style="color: #008080;">4</span>     ctx.drawImage(bg, 0, y - 852<span style="color: #000000;">);
</span><span style="color: #008080;">5</span>     y++ == 852 && (y = 0<span style="color: #000000;">);
</span><span style="color: #008080;">6</span> }
```
  </div>
  ##   构造玩家飞机(hero)
  

  <div class="cnblogs_code">
    ```
<span style="color: #008080;"> 1</span> <span style="color: #008000;">/*</span><span style="color: #008000;">********构造hero***********</span><span style="color: #008000;">*/</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> hero = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 3</span>
<span style="color: #008080;"> 4</span> <span style="color: #0000ff;">function</span><span style="color: #000000;"> Hero() {
</span><span style="color: #008080;"> 5</span>     <span style="color: #0000ff;">this</span>.x = (width - heroImg[0].width) / 2;  <span style="color: #008000;">//</span><span style="color: #008000;"> hero的坐标</span>
<span style="color: #008080;"> 6</span>     <span style="color: #0000ff;">this</span>.y = height - heroImg[0<span style="color: #000000;">].height;
</span><span style="color: #008080;"> 7</span>     <span style="color: #0000ff;">this</span>.index = 0; <span style="color: #008000;">//</span><span style="color: #008000;"> 用于切换hero的图片</span>
<span style="color: #008080;"> 8</span>     <span style="color: #0000ff;">this</span>.count = 0; <span style="color: #008000;">//</span><span style="color: #008000;"> 用于控制hero图片切换的频率</span>
<span style="color: #008080;"> 9</span>     <span style="color: #0000ff;">this</span>.hCount = 0; <span style="color: #008000;">//</span><span style="color: #008000;"> 用于控制子弹发射的频率</span>
<span style="color: #008080;">10</span>     <span style="color: #0000ff;">this</span>.eCount = 0; <span style="color: #008000;">//</span><span style="color: #008000;"> 用于控制敌机出现的频率    </span>
<span style="color: #008080;">11</span>     <span style="color: #0000ff;">this</span>.n = 0<span style="color: #000000;">;
</span><span style="color: #008080;">12</span>     <span style="color: #0000ff;">this</span>.draw = <span style="color: #0000ff;">function</span><span style="color: #000000;">() {
</span><span style="color: #008080;">13</span>         ctx.drawImage(heroImg[<span style="color: #0000ff;">this</span>.index], <span style="color: #0000ff;">this</span>.x, <span style="color: #0000ff;">this</span><span style="color: #000000;">.y);
</span><span style="color: #008080;">14</span>         ctx.fillText(‘SCORE:‘ + gameScore, 10, 30<span style="color: #000000;">);
</span><span style="color: #008080;">15</span>         <span style="color: #0000ff;">this</span>.count++<span style="color: #000000;">;
</span><span style="color: #008080;">16</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.count % 3 == 0) { <span style="color: #008000;">//</span><span style="color: #008000;"> 切换hero的图片</span>
<span style="color: #008080;">17</span>             <span style="color: #0000ff;">this</span>.index = <span style="color: #0000ff;">this</span>.index == 0 ? 1 : 0<span style="color: #000000;">;
</span><span style="color: #008080;">18</span>             <span style="color: #0000ff;">this</span>.count = 0<span style="color: #000000;">;
</span><span style="color: #008080;">19</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">20</span>         <span style="color: #0000ff;">this</span>.hCount++<span style="color: #000000;">;
</span><span style="color: #008080;">21</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.hCount % 3 == 0) { <span style="color: #008000;">//</span><span style="color: #008000;"> 同时生成三颗子弹</span>
<span style="color: #008080;">22</span>             <span style="color: #0000ff;">this</span>.n == 32 && (<span style="color: #0000ff;">this</span>.n = 0<span style="color: #000000;">);
</span><span style="color: #008080;">23</span>             hullet.push(<span style="color: #0000ff;">new</span> Hullet(<span style="color: #0000ff;">this</span><span style="color: #000000;">.n));
</span><span style="color: #008080;">24</span>             <span style="color: #0000ff;">this</span>.n == 0 && (<span style="color: #0000ff;">this</span>.n = -32<span style="color: #000000;">);;
</span><span style="color: #008080;">25</span>             hullet.push(<span style="color: #0000ff;">new</span> Hullet(<span style="color: #0000ff;">this</span><span style="color: #000000;">.n));
</span><span style="color: #008080;">26</span>             <span style="color: #0000ff;">this</span>.n == -32 && (<span style="color: #0000ff;">this</span>.n = 32<span style="color: #000000;">);;
</span><span style="color: #008080;">27</span>             hullet.push(<span style="color: #0000ff;">new</span> Hullet(<span style="color: #0000ff;">this</span><span style="color: #000000;">.n));
</span><span style="color: #008080;">28</span>             <span style="color: #0000ff;">this</span>.hCount = 0<span style="color: #000000;">;
</span><span style="color: #008080;">29</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">30</span>         <span style="color: #0000ff;">this</span>.eCount++<span style="color: #000000;">;
</span><span style="color: #008080;">31</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.eCount % 8 == 0) { <span style="color: #008000;">//</span><span style="color: #008000;">生成敌机</span>
<span style="color: #008080;">32</span>             liveEnemy.push(<span style="color: #0000ff;">new</span><span style="color: #000000;"> Enemy());
</span><span style="color: #008080;">33</span>             <span style="color: #0000ff;">this</span>.eCount = 0<span style="color: #000000;">;
</span><span style="color: #008080;">34</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">35</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">36</span>
<span style="color: #008080;">37</span>     <span style="color: #0000ff;">function</span><span style="color: #000000;"> move(e) {
</span><span style="color: #008080;">38</span>         <span style="color: #0000ff;">if</span> (curPhase == PHASE_PLAY || curPhase ==<span style="color: #000000;"> PHASE_PAUSE) {
</span><span style="color: #008080;">39</span>             curPhase =<span style="color: #000000;"> PHASE_PLAY;
</span><span style="color: #008080;">40</span>             <span style="color: #0000ff;">var</span> offsetX = e.offsetX || e.touches[0<span style="color: #000000;">].pageX;
</span><span style="color: #008080;">41</span>             <span style="color: #0000ff;">var</span> offsetY = e.offsetY || e.touches[0<span style="color: #000000;">].pageY;
</span><span style="color: #008080;">42</span>             <span style="color: #0000ff;">var</span> w = heroImg[0<span style="color: #000000;">].width,
</span><span style="color: #008080;">43</span>                 h = heroImg[0<span style="color: #000000;">].height;
</span><span style="color: #008080;">44</span>             <span style="color: #0000ff;">var</span> nx = offsetX - w / 2<span style="color: #000000;">,
</span><span style="color: #008080;">45</span>                 ny = offsetY - h / 2<span style="color: #000000;">;
</span><span style="color: #008080;">46</span>             nx < 20 - w / 2 ? nx = 20 - w / 2 : nx > (canvas.width - w / 2 - 20) ? nx = (canvas.width - w / 2 - 20) : 0<span style="color: #000000;">;
</span><span style="color: #008080;">47</span>             ny < 0 ? ny = 0 : ny > (canvas.height - h / 2) ? ny = (canvas.height - h / 2) : 0<span style="color: #000000;">;
</span><span style="color: #008080;">48</span>             hero.x =<span style="color: #000000;"> nx;
</span><span style="color: #008080;">49</span>             hero.y =<span style="color: #000000;"> ny;
</span><span style="color: #008080;">50</span>             hero.count = 2<span style="color: #000000;">;
</span><span style="color: #008080;">51</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">52</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">53</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 绑定鼠标移动和手指触摸事件，控制hero移动</span>
<span style="color: #008080;">54</span>     canvas.addEventListener("mousemove", move, <span style="color: #0000ff;">false</span><span style="color: #000000;">);
</span><span style="color: #008080;">55</span>     canvas.addEventListener("touchmove", move, <span style="color: #0000ff;">false</span><span style="color: #000000;">);
</span><span style="color: #008080;">56</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 鼠标移除时游戏暂停</span>
<span style="color: #008080;">57</span>     canvas.onmouseout = <span style="color: #0000ff;">function</span><span style="color: #000000;">(e) {
</span><span style="color: #008080;">58</span>         <span style="color: #0000ff;">if</span> (curPhase ==<span style="color: #000000;"> PHASE_PLAY) {
</span><span style="color: #008080;">59</span>             curPhase =<span style="color: #000000;"> PHASE_PAUSE;
</span><span style="color: #008080;">60</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">61</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">62</span> }
```
  </div>
 
  
 本例中并没有设置hero的碰撞检测和生命值，所以英雄无敌！！！哈哈哈哈！！！<br /> 然并卵，我已经写不下去了；可是，坚持就是胜利呀；好吧，继续！
  
  ##   构造子弹
  

  <div class="cnblogs_code">
    ```
<span style="color: #008080;"> 1</span> <span style="color: #008000;">/*</span><span style="color: #008000;">*********构造子弹**********</span><span style="color: #008000;">*/</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> hullet = []; <span style="color: #008000;">//</span><span style="color: #008000;"> 存储画布中所以子弹的数组</span>
<span style="color: #008080;"> 3</span>
<span style="color: #008080;"> 4</span> <span style="color: #0000ff;">function</span><span style="color: #000000;"> Hullet(n) {
</span><span style="color: #008080;"> 5</span>     <span style="color: #0000ff;">this</span>.n = n;  <span style="color: #008000;">//</span><span style="color: #008000;"> 用于确定是左中右哪一颗子弹</span>
<span style="color: #008080;"> 6</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 子弹的坐标</span>
<span style="color: #008080;"> 7</span>     <span style="color: #0000ff;">this</span>.mx = hero.x + (heroImg[0].width - m.width) / 2 + <span style="color: #0000ff;">this</span><span style="color: #000000;">.n;
</span><span style="color: #008080;"> 8</span>     <span style="color: #0000ff;">this</span>.my = <span style="color: #0000ff;">this</span>.n == 0 ? hero.y - m.height : hero.y +<span style="color: #000000;"> m.height;
</span><span style="color: #008080;"> 9</span>     <span style="color: #0000ff;">this</span>.width = m.width;  <span style="color: #008000;">//</span><span style="color: #008000;"> 子弹的宽和高</span>
<span style="color: #008080;">10</span>     <span style="color: #0000ff;">this</span>.height =<span style="color: #000000;"> m.height;
</span><span style="color: #008080;">11</span>     <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">false</span>; <span style="color: #008000;">//</span><span style="color: #008000;"> 标识子弹是否可移除了</span>
<span style="color: #008080;">12</span> <span style="color: #000000;">}
</span><span style="color: #008080;">13</span> Hullet.drawHullet = <span style="color: #0000ff;">function</span><span style="color: #000000;">() {
</span><span style="color: #008080;">14</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < hullet.length; i++) { <span style="color: #008000;">//</span><span style="color: #008000;">在画布上画出所以子弹</span>
<span style="color: #008080;">15</span> <span style="color: #000000;">        hullet[i].draw();
</span><span style="color: #008080;">16</span>         <span style="color: #0000ff;">if</span> (hullet[i].removable) { <span style="color: #008000;">//</span><span style="color: #008000;"> 如果为true就移除这颗子弹</span>
<span style="color: #008080;">17</span>             hullet.splice(i, 1<span style="color: #000000;">);
</span><span style="color: #008080;">18</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">19</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">20</span> <span style="color: #000000;">}
</span><span style="color: #008080;">21</span> Hullet.prototype.draw = <span style="color: #0000ff;">function</span>() { <span style="color: #008000;">//</span><span style="color: #008000;"> 在画布上画子弹</span>
<span style="color: #008080;">22</span>     ctx.drawImage(m, <span style="color: #0000ff;">this</span>.mx, <span style="color: #0000ff;">this</span><span style="color: #000000;">.my);
</span><span style="color: #008080;">23</span>     <span style="color: #0000ff;">this</span>.my -= 20<span style="color: #000000;">;
</span><span style="color: #008080;">24</span>     <span style="color: #0000ff;">this</span>.mx += <span style="color: #0000ff;">this</span>.n == 32 ? 3 : <span style="color: #0000ff;">this</span>.n == -32 ? -3 : 0<span style="color: #000000;">;
</span><span style="color: #008080;">25</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.my < -m.height) {  <span style="color: #008000;">//</span><span style="color: #008000;"> 如果子弹飞出画布，就标记为可移除</span>
<span style="color: #008080;">26</span>         <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">27</span> <span style="color: #000000;">    };
</span><span style="color: #008080;">28</span> }
```
  </div>
 
  
  ##   构造敌机
  

  <div class="cnblogs_code">
    ```
<span style="color: #008080;"> 1</span> <span style="color: #008000;">/*</span><span style="color: #008000;">**********构造敌机*******</span><span style="color: #008000;">*/</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> liveEnemy = []; <span style="color: #008000;">//</span><span style="color: #008000;"> 用于存储画布上的所有敌机</span>
<span style="color: #008080;"> 3</span>
<span style="color: #008080;"> 4</span> <span style="color: #0000ff;">function</span><span style="color: #000000;"> Enemy() {
</span><span style="color: #008080;"> 5</span>     <span style="color: #0000ff;">this</span>.n = Math.random() * 20<span style="color: #000000;">;
</span><span style="color: #008080;"> 6</span>     <span style="color: #0000ff;">this</span>.enemy = <span style="color: #0000ff;">null</span>; <span style="color: #008000;">//</span><span style="color: #008000;"> 保存敌机图片的数组</span>
<span style="color: #008080;"> 7</span>     <span style="color: #0000ff;">this</span>.speed = 0; <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机的速度</span>
<span style="color: #008080;"> 8</span>     <span style="color: #0000ff;">this</span>.lifes = 2; <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机的生命值</span>
<span style="color: #008080;"> 9</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.n < 1) { <span style="color: #008000;">//</span><span style="color: #008000;"> 不同大小的敌机随机出现</span>
<span style="color: #008080;">10</span>         <span style="color: #0000ff;">this</span>.enemy = enemy3[0<span style="color: #000000;">];
</span><span style="color: #008080;">11</span>         <span style="color: #0000ff;">this</span>.speed = 2<span style="color: #000000;">;
</span><span style="color: #008080;">12</span>         <span style="color: #0000ff;">this</span>.lifes = 50<span style="color: #000000;">;
</span><span style="color: #008080;">13</span>     } <span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.n < 6<span style="color: #000000;">) {
</span><span style="color: #008080;">14</span>         <span style="color: #0000ff;">this</span>.enemy = enemy2[0<span style="color: #000000;">];
</span><span style="color: #008080;">15</span>         <span style="color: #0000ff;">this</span>.speed = 4<span style="color: #000000;">;
</span><span style="color: #008080;">16</span>         <span style="color: #0000ff;">this</span>.lifes = 10<span style="color: #000000;">;
</span><span style="color: #008080;">17</span>     } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">18</span>         <span style="color: #0000ff;">this</span>.enemy = enemy1[0<span style="color: #000000;">];
</span><span style="color: #008080;">19</span>         <span style="color: #0000ff;">this</span>.speed = 6<span style="color: #000000;">;
</span><span style="color: #008080;">20</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">21</span>     <span style="color: #0000ff;">this</span>.x = parseInt(Math.random() * (canvas.width - <span style="color: #0000ff;">this</span><span style="color: #000000;">.enemy.width));
</span><span style="color: #008080;">22</span>     <span style="color: #0000ff;">this</span>.y = -<span style="color: #0000ff;">this</span><span style="color: #000000;">.enemy.height;
</span><span style="color: #008080;">23</span>     <span style="color: #0000ff;">this</span>.width = <span style="color: #0000ff;">this</span><span style="color: #000000;">.enemy.width;
</span><span style="color: #008080;">24</span>     <span style="color: #0000ff;">this</span>.height = <span style="color: #0000ff;">this</span><span style="color: #000000;">.enemy.height;
</span><span style="color: #008080;">25</span>     <span style="color: #0000ff;">this</span>.index = 0<span style="color: #000000;">;
</span><span style="color: #008080;">26</span>     <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">27</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 标识敌机是否狗带，若狗带就画它的爆炸图(也就是遗像啦)</span>
<span style="color: #008080;">28</span>     <span style="color: #0000ff;">this</span>.die = <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">29</span>     <span style="color: #0000ff;">this</span>.draw = <span style="color: #0000ff;">function</span><span style="color: #000000;">() {
</span><span style="color: #008080;">30</span>         <span style="color: #008000;">//</span><span style="color: #008000;"> 处理不同敌机的爆炸图轮番上阵</span>
<span style="color: #008080;">31</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.speed == 2<span style="color: #000000;">) {
</span><span style="color: #008080;">32</span>             <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.die) {
</span><span style="color: #008080;">33</span>                 <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.index < 2) { <span style="color: #0000ff;">this</span>.index = 3<span style="color: #000000;">; }
</span><span style="color: #008080;">34</span>                 <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.index <<span style="color: #000000;"> enemy3.length) {
</span><span style="color: #008080;">35</span>                     <span style="color: #0000ff;">this</span>.enemy = enemy3[<span style="color: #0000ff;">this</span>.index++<span style="color: #000000;">];
</span><span style="color: #008080;">36</span>                 } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">37</span>                     <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">38</span> <span style="color: #000000;">                }
</span><span style="color: #008080;">39</span>             } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">40</span>                 <span style="color: #0000ff;">this</span>.enemy = enemy3[<span style="color: #0000ff;">this</span><span style="color: #000000;">.index];
</span><span style="color: #008080;">41</span>                 <span style="color: #0000ff;">this</span>.index == 0 ? <span style="color: #0000ff;">this</span>.index = 1 : <span style="color: #0000ff;">this</span>.index = 0<span style="color: #000000;">;
</span><span style="color: #008080;">42</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">43</span>         } <span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.die) {
</span><span style="color: #008080;">44</span>             <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.index <<span style="color: #000000;"> enemy1.length) {
</span><span style="color: #008080;">45</span>                 <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.speed == 6<span style="color: #000000;">) {
</span><span style="color: #008080;">46</span>                     <span style="color: #0000ff;">this</span>.enemy = enemy1[<span style="color: #0000ff;">this</span>.index++<span style="color: #000000;">];
</span><span style="color: #008080;">47</span>                 } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">48</span>                     <span style="color: #0000ff;">this</span>.enemy = enemy2[<span style="color: #0000ff;">this</span>.index++<span style="color: #000000;">];
</span><span style="color: #008080;">49</span> <span style="color: #000000;">                }
</span><span style="color: #008080;">50</span>             } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">51</span>                 <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">52</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">53</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">54</span>         ctx.drawImage(<span style="color: #0000ff;">this</span>.enemy, <span style="color: #0000ff;">this</span>.x, <span style="color: #0000ff;">this</span><span style="color: #000000;">.y);
</span><span style="color: #008080;">55</span>         <span style="color: #0000ff;">this</span>.y += <span style="color: #0000ff;">this</span>.speed; <span style="color: #008000;">//</span><span style="color: #008000;"> 移动敌机</span>
<span style="color: #008080;">56</span>         <span style="color: #0000ff;">this</span>.hit(); <span style="color: #008000;">//</span><span style="color: #008000;">判断是否击中敌机</span>
<span style="color: #008080;">57</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.y > canvas.height) { <span style="color: #008000;">//</span><span style="color: #008000;"> 若敌机飞出画布，就标识可移除(让你不长眼！)</span>
<span style="color: #008080;">58</span>             <span style="color: #0000ff;">this</span>.removable = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">59</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">60</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">61</span>     <span style="color: #0000ff;">this</span>.hit = <span style="color: #0000ff;">function</span>() { <span style="color: #008000;">//</span><span style="color: #008000;">判断是否击中敌机</span>
<span style="color: #008080;">62</span>         <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0; i < hullet.length; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">63</span>             <span style="color: #0000ff;">var</span> h =<span style="color: #000000;"> hullet[i];
</span><span style="color: #008080;">64</span>             <span style="color: #008000;">//</span><span style="color: #008000;"> 敌机与子弹的碰撞检测，自己体会吧</span>
<span style="color: #008080;">65</span>             <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.x + <span style="color: #0000ff;">this</span>.width >= h.mx && h.mx + h.width >= <span style="color: #0000ff;">this</span>.x &&
<span style="color: #008080;">66</span>                 h.my + h.height >= <span style="color: #0000ff;">this</span>.y && <span style="color: #0000ff;">this</span>.height + <span style="color: #0000ff;">this</span>.y >=<span style="color: #000000;"> h.my) {
</span><span style="color: #008080;">67</span>                 <span style="color: #0000ff;">if</span> (--<span style="color: #0000ff;">this</span>.lifes == 0) { <span style="color: #008000;">//</span><span style="color: #008000;"> 若生命值为零，标识为死亡</span>
<span style="color: #008080;">68</span>                     <span style="color: #0000ff;">this</span>.die = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">69</span>                     <span style="color: #008000;">//</span><span style="color: #008000;"> 计分</span>
<span style="color: #008080;">70</span>                     gameScore += <span style="color: #0000ff;">this</span>.speed == 6 ? 10 : <span style="color: #0000ff;">this</span>.speed == 4 ? 20 : 100<span style="color: #000000;">;
</span><span style="color: #008080;">71</span> <span style="color: #000000;">                }
</span><span style="color: #008080;">72</span>                 h.removable = <span style="color: #0000ff;">true</span>; <span style="color: #008000;">//</span><span style="color: #008000;"> 碰撞后的子弹标识为可移除</span>
<span style="color: #008080;">73</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">74</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">75</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">76</span> }
```
  </div>
 
  
  ##   游戏的几种状态
  

  <div class="cnblogs_code">
    ```
<span style="color: #008080;">1</span> <span style="color: #008000;">/*</span><span style="color: #008000;">*******定义游戏状态**********</span><span style="color: #008000;">*/</span>
<span style="color: #008080;">2</span> const PHASE_DOWNLOAD = 1<span style="color: #000000;">;
</span><span style="color: #008080;">3</span> const PHASE_READY = 2<span style="color: #000000;">;
</span><span style="color: #008080;">4</span> const PHASE_LOADING = 3<span style="color: #000000;">;
</span><span style="color: #008080;">5</span> const PHASE_PLAY = 4<span style="color: #000000;">;
</span><span style="color: #008080;">6</span> const PHASE_PAUSE = 5<span style="color: #000000;">;
</span><span style="color: #008080;">7</span> const PHASE_GAMEOVER = 6<span style="color: #000000;">;
</span><span style="color: #008080;">8</span> <span style="color: #008000;">/*</span><span style="color: #008000;">*********游戏当前状态***********</span><span style="color: #008000;">*/</span>
<span style="color: #008080;">9</span> <span style="color: #0000ff;">var</span> curPhase = PHASE_DOWNLOAD;
```
  </div>
 
  
 有了状态，我只需要起一个定时器，判断游戏的状态，绘制对应的帧就行；像这样：
  
  <div class="cnblogs_code">
    ```
<span style="color: #008000;">/*</span><span style="color: #008000;">*********游戏主引擎********</span><span style="color: #008000;">*/</span>
<span style="color: #0000ff;">function</span><span style="color: #000000;"> gameEngine() {
    </span><span style="color: #0000ff;">switch</span><span style="color: #000000;"> (curPhase) {
        </span><span style="color: #0000ff;">case</span><span style="color: #000000;"> PHASE_READY:
            pBg();
            paintLogo();
            </span><span style="color: #0000ff;">break</span><span style="color: #000000;">;
        </span><span style="color: #0000ff;">case</span><span style="color: #000000;"> PHASE_LOADING:
            pBg();
            load();
            </span><span style="color: #0000ff;">break</span><span style="color: #000000;">;
        </span><span style="color: #0000ff;">case</span><span style="color: #000000;"> PHASE_PLAY:
            pBg();
            drawEnemy();
            Hullet.drawHullet();
            hero.draw();
            </span><span style="color: #0000ff;">break</span><span style="color: #000000;">;
        </span><span style="color: #0000ff;">case</span><span style="color: #000000;"> PHASE_PAUSE:
            drawPause();
            </span><span style="color: #0000ff;">break</span><span style="color: #000000;">;
    }
    </span><span style="color: #008000;">//</span><span style="color: #008000;">requestAnimationFrame(gameEngine);</span>
<span style="color: #000000;">}
setInterval(gameEngine, </span>50);
```
  </div>
 代码见：<a href="https://github.com/chalecao/gameH5">github</a>
  
 
  
 
</div>
