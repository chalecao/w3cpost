---
title: 曾经基于canvas实现的飞机大战
weight: 3
---

首先看几张效果图：

![](/images/posts/2022-12-17-20-49-14.png)

上图分是游戏中的状态，<a href="https://chalecao.github.io/gameH5/AircraftWar/index.html" target="_blank" rel="noopener">体验一下</a>

先介绍一下canvas 画图的原理，在这个游戏中的背景，飞机，子弹以及飞机被击中爆炸的效果都是一张张的图片，通过canvas的 drawImage() 函数把这一帧需要的所有图片按其所在的位置（坐标）画到画布上，当然有时候也需要画些文本，比如左上角的得分；然后接着画下一帧，同时改变飞机和子弹的位置；画下一帧之前一定要清除画布（通过这个函数 clearRect(x,  y, width, height))，不然就是下图的效果啦：

![](/images/posts/2022-12-17-20-53-57.png)

辣眼睛！！！ 不过在本例中因为每帧都要重新画上背景图，背景图又是填满整个画布的，所以画背景图时就等于把上一帧全部覆盖了，也就相当于清除画布了。

下面[我们](https://www.w3cdoc.com)开始聊实现的细节：

## 加载需要的图片

在让游戏跑起来之前要先把需要的图片加载进来，类似：

![](/images/posts/2022-12-18-11-06-42.png)

代码如下：

```
// 所以图片的链接，包括背景图、各种飞机和飞机爆炸图、子弹图等
var imgName = [‘background.png‘, ‘game_pause_nor.png‘, ‘m1.png‘, ‘start.png‘,
    // 敌机1
    [‘enemy1.png‘, ‘enemy1_down1.png‘, ‘enemy1_down2.png‘, ‘enemy1_down3.png‘, ‘enemy1_down4.png‘],
    // 敌机2
    [‘enemy2.png‘, ‘enemy2_down1.png‘, ‘enemy2_down2.png‘, ‘enemy2_down3.png‘, ‘enemy2_down4.png‘],
    // 敌机3
    [‘enemy3_n1.png‘, ‘enemy3_n2.png‘, ‘enemy3_hit.png‘, ‘enemy3_down1.png‘, ‘enemy3_down2.png‘, ‘enemy3_down3.png‘, ‘enemy3_down4.png‘, ‘enemy3_down5.png‘, ‘enemy3_down6.png‘, ],
    // 游戏loading图
    [‘game_loading1.png‘, ‘game_loading2.png‘, ‘game_loading3.png‘, ‘game_loading4.png‘],
    // 玩家飞机图
    [‘hero1.png‘, ‘hero2.png‘, ‘hero_blowup_n1.png‘, ‘hero_blowup_n2.png‘, ‘hero_blowup_n3.png‘, ‘hero_blowup_n4.png‘]
];
// 存储不同类型的图片
var bg = null,
    pause = null,
    m = null,
    startImg = null,
    enemy1 = [],
    enemy2 = [],
    enemy3 = [],
    gameLoad = [],
    heroImg = [];
// 加载图片的进度
var progress = 1;
/*********加载图片*********/
function download() {
    bg = nImg(imgName[0]);
    pause = nImg(imgName[1]);
    m = nImg(imgName[2]);
    startImg = nImg(imgName[3]);
    for (var i = 0; i < imgName[4].length; i++) {
        enemy1[i] = nImg(imgName[4][i]);
    }
    for (var i = 0; i < imgName[5].length; i++) {
        enemy2[i] = nImg(imgName[5][i]);
    }
    for (var i = 0; i < imgName[6].length; i++) {
        enemy3[i] = nImg(imgName[6][i]);
    }
    for (var i = 0; i < imgName[7].length; i++) {
        gameLoad[i] = nImg(imgName[7][i]);
    }
    for (var i = 0; i < imgName[8].length; i++) {
        heroImg[i] = nImg(imgName[8][i]);
    }

    function nImg(src) {
        var img = new Image();
        img.src = ‘img/‘ + src;
        img.onload = imgLoad;
        return img;
    }
    // 绘制游戏加载进度画面
    function imgLoad() {
        progress += 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var text = progress + ‘%‘;
        var tw = ctx.measureText(text).width;
        ctx.font = ‘60px arial‘;
        ctx.fillStyle = ‘red‘;
        ctx.lineWidth = ‘0‘;
        ctx.strokeStyle = ‘#888‘;
        //ctx.strokeText(text,(width-tw)/2,height/2);
        ctx.fillText(text, (width - tw) / 2, height / 2);
        if (progress >= 100) {
            start();
        }
    }
}
download();
```
其中有处理图片分类和加载进度的问题，代码有些冗余。

## 让背景动起来

从上面的游戏ready状态图可以看出游戏背景在不停的往上移动； 实现原理：连续画两张背景图到画布上，一上一下，第一张画在坐标为(0，0) 的位置，第二张紧接着第一张，然后每画一帧往上移动一点（一到两个像素吧），当上面的那张图片移出画布之后，将Y轴的坐标重置为0；代码如下：
```
var y = 0;
function paintBg() {
    ctx.drawImage(bg, 0, y); // bg是背景图元素
    ctx.drawImage(bg, 0, y - 852);
    y++ == 852 && (y = 0);
}
```
## 构造玩家飞机(hero)

```
/*********构造hero************/
var hero = null;
function Hero() {
    this.x = (width - heroImg[0].width) / 2;  // hero的坐标
    this.y = height - heroImg[0].height;
    this.index = 0; // 用于切换hero的图片
    this.count = 0; // 用于控制hero图片切换的频率
    this.hCount = 0; // 用于控制子弹发射的频率
     this.eCount = 0; // 用于控制敌机出现的频率    
     this.n = 0;
     this.draw = function() {
         ctx.drawImage(heroImg[this.index], this.x, this.y);
         ctx.fillText(‘SCORE:‘ + gameScore, 10, 30);
         this.count++;
         if (this.count % 3 == 0) { // 切换hero的图片
             this.index = this.index == 0 ? 1 : 0;
             this.count = 0;
         }
         this.hCount++;
         if (this.hCount % 3 == 0) { // 同时生成三颗子弹
             this.n == 32 && (this.n = 0);
             hullet.push(new Hullet(this.n));
             this.n == 0 && (this.n = -32);;
             hullet.push(new Hullet(this.n));
             this.n == -32 && (this.n = 32);;
             hullet.push(new Hullet(this.n));
             this.hCount = 0;
         }
         this.eCount++;
         if (this.eCount % 8 == 0) { //生成敌机
             liveEnemy.push(new Enemy());
             this.eCount = 0;
         }
     }

     function move(e) {
         if (curPhase == PHASE_PLAY || curPhase == PHASE_PAUSE) {
             curPhase = PHASE_PLAY;
             var offsetX = e.offsetX || e.touches[0].pageX;
             var offsetY = e.offsetY || e.touches[0].pageY;
             var w = heroImg[0].width,
                 h = heroImg[0].height;
             var nx = offsetX - w / 2,
                 ny = offsetY - h / 2;
             nx < 20 - w / 2 ? nx = 20 - w / 2 : nx > (canvas.width - w / 2 - 20) ? nx = (canvas.width - w / 2 - 20) : 0;
             ny < 0 ? ny = 0 : ny > (canvas.height - h / 2) ? ny = (canvas.height - h / 2) : 0;
             hero.x = nx;
             hero.y = ny;
             hero.count = 2;
         }
     }
     // 绑定鼠标移动和手指触摸事件，控制hero移动
     canvas.addEventListener("mousemove", move, false);
     canvas.addEventListener("touchmove", move, false);
     // 鼠标移除时游戏暂停
     canvas.onmouseout = function(e) {
         if (curPhase == PHASE_PLAY) {
             curPhase = PHASE_PAUSE;
         }
     }
 }
```

本例中并没有设置hero的碰撞检测和生命值，所以英雄无敌！！！哈哈哈哈！！！ 然并卵，我已经写不下去了；可是，坚持就是胜利呀；好吧，继续！

## 构造子弹

```
/**********构造子弹***********/
var hullet = []; // 存储画布中所以子弹的数组
function Hullet(n) {
    this.n = n;  // 用于确定是左中右哪一颗子弹
    // 子弹的坐标
    this.mx = hero.x + (heroImg[0].width - m.width) / 2 + this.n;
    this.my = this.n == 0 ? hero.y - m.height : hero.y + m.height;
    this.width = m.width;  // 子弹的宽和高
     this.height = m.height;
     this.removable = false; // 标识子弹是否可移除了
 }
 Hullet.drawHullet = function() {
     for (var i = 0; i < hullet.length; i++) { //在画布上画出所以子弹
         hullet[i].draw();
         if (hullet[i].removable) { // 如果为true就移除这颗子弹
             hullet.splice(i, 1);
         }
     }
 }
 Hullet.prototype.draw = function() { // 在画布上画子弹
     ctx.drawImage(m, this.mx, this.my);
     this.my -= 20;
     this.mx += this.n == 32 ? 3 : this.n == -32 ? -3 : 0;
     if (this.my < -m.height) {  // 如果子弹飞出画布，就标记为可移除
         this.removable = true;
     };
 }
```
##  构造敌机

```
/***********构造敌机********/
var liveEnemy = []; // 用于存储画布上的所有敌机
function Enemy() {
    this.n = Math.random() * 20;
    this.enemy = null; // 保存敌机图片的数组
    this.speed = 0; // 敌机的速度
    this.lifes = 2; // 敌机的生命值
    if (this.n < 1) { // 不同大小的敌机随机出现
         this.enemy = enemy3[0];
         this.speed = 2;
         this.lifes = 50;
     } else if (this.n < 6) {
         this.enemy = enemy2[0];
         this.speed = 4;
         this.lifes = 10;
     } else {
         this.enemy = enemy1[0];
         this.speed = 6;
     }
     this.x = parseInt(Math.random() * (canvas.width - this.enemy.width));
     this.y = -this.enemy.height;
     this.width = this.enemy.width;
     this.height = this.enemy.height;
     this.index = 0;
     this.removable = false;
     // 标识敌机是否狗带，若狗带就画它的爆炸图(也就是遗像啦)
     this.die = false;
     this.draw = function() {
         // 处理不同敌机的爆炸图轮番上阵
         if (this.speed == 2) {
             if (this.die) {
                 if (this.index < 2) { this.index = 3; }
                 if (this.index < enemy3.length) {
                     this.enemy = enemy3[this.index++];
                 } else {
                     this.removable = true;
                 }
             } else {
                 this.enemy = enemy3[this.index];
                 this.index == 0 ? this.index = 1 : this.index = 0;
             }
         } else if (this.die) {
             if (this.index < enemy1.length) {
                 if (this.speed == 6) {
                     this.enemy = enemy1[this.index++];
                 } else {
                     this.enemy = enemy2[this.index++];
                 }
             } else {
                 this.removable = true;
             }
         }
         ctx.drawImage(this.enemy, this.x, this.y);
         this.y += this.speed; // 移动敌机
         this.hit(); //判断是否击中敌机
         if (this.y > canvas.height) { // 若敌机飞出画布，就标识可移除(让你不长眼！)
             this.removable = true;
         }
     }
     this.hit = function() { //判断是否击中敌机
         for (var i = 0; i < hullet.length; i++) {
             var h = hullet[i];
             // 敌机与子弹的碰撞检测，自己体会吧
             if (this.x + this.width >= h.mx && h.mx + h.width >= this.x &&
                 h.my + h.height >= this.y && this.height + this.y >= h.my) {
                 if (--this.lifes == 0) { // 若生命值为零，标识为死亡
                     this.die = true;
                     // 计分
                     gameScore += this.speed == 6 ? 10 : this.speed == 4 ? 20 : 100;
                 }
                 h.removable = true; // 碰撞后的子弹标识为可移除
             }
         }
     }
 }
```
## 游戏的几种状态

```
/********定义游戏状态***********/
const PHASE_DOWNLOAD = 1;
const PHASE_READY = 2;
const PHASE_LOADING = 3;
const PHASE_PLAY = 4;
const PHASE_PAUSE = 5;
const PHASE_GAMEOVER = 6;
/**********游戏当前状态************/
var curPhase = PHASE_DOWNLOAD;
```

有了状态，我只需要起一个定时器，判断游戏的状态，绘制对应的帧就行；像这样：

```
/**********游戏主引擎*********/
function gameEngine() {
  switch (curPhase) {
      case PHASE_READY:
          pBg();
          paintLogo();
          break;
      case PHASE_LOADING:
          pBg();
          load();
          break;
      case PHASE_PLAY:
          pBg();
          drawEnemy();
          Hullet.drawHullet();
          hero.draw();
          break;
      case PHASE_PAUSE:
          drawPause();
          break;
  }
  //requestAnimationFrame(gameEngine);
}
setInterval(gameEngine, 50);
```
代码见：<a href="https://github.com/chalecao/gameH5">github</a>

