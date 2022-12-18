---
title: canvas图片处理与动画
weight: 1
---
## canvas绘制圆角图片

先看个例子：

```
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Title</title>  
</head>  
<body style="background: rgba(199,237,204,1)">  
<div style="display:flex; flex-direction: row">  
 <!--通过style方式为canvas设置宽高在火狐[浏览器](https://www.w3cdoc.com)上导致绘制内容纵向拉伸。。。-->  
 <canvas id="drawing" width="400px" height="400px">canvas to draw</canvas>  
 <pre id="container" style="margin: 10px"/>  
 <img src="/android-chrome-192x192.png">  
</div>  
</body>  
<script type="text/javascript">  
 window.onload=function () {  
        var drawing = document.getElementById('drawing');  
     if (drawing.getContext) {  
            print('support')  
            addRoundRectFunc();  
            var context = drawing.getContext('2d');  
            draw(context);  
     } else {  
            print('not ')  
        }  
    }  
 function draw(context) {  
        context.fillStyle = 'red';  
     var image = document.images[0];  
     context.roundRect(0,0,image.width/2,image.height/2,30,true)  
     context.globalCompositeOperation='source-in';  
        context.drawImage(image, 0, 0, image.width / 2, image.height / 2)  
        // toImage();  
 }  
 function addRoundRectFunc() {  
        CanvasRenderingContext2D.prototype.roundRect =  
            function (x, y, width, height, radius, fill, stroke) {  
                if (typeof stroke == "undefined") {  
                    stroke = true;  
                }  
                if (typeof radius === "undefined") {  
                    radius = 5;  
                }  
                this.beginPath();  
                this.moveTo(x + radius, y);  
                this.lineTo(x + width - radius, y);  
                this.quadraticCurveTo(x + width, y, x + width, y + radius);  
                this.lineTo(x + width, y + height - radius);  
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);  
                this.lineTo(x + radius, y + height);  
                this.quadraticCurveTo(x, y + height, x, y + height - radius);  
                this.lineTo(x, y + radius);  
                this.quadraticCurveTo(x, y, x + radius, y);  
                this.closePath();  
                if (stroke) {  
                    this.stroke();  
                }  
                if (fill) {  
                    this.fill();  
                }  
            };  
    }  
 function toImage() {  
        var imageUri = drawing.toDataURL('image/png');  
        var imageTag = document.createElement('img');  
        imageTag.style = 'margin:10px;width:200px;height:200px'  
        imageTag.src = imageUri;  
        document.body.appendChild(imageTag)  
    }  
 function print(txt) {  
        document.getElementById("container").innerHTML += ('\n') + txt;  
    }  
 document.body.onclick = function () {  
        window.location.reload()  
    }  
    console.log = print;  
</script>  
</html>  
```
## 动画处理

#### 什么是动画？

动画本质上是图像按照事先设定好的顺序在一定的时间内的图像序列变化运动。 这种图像序列的变化运动给[我们](https://www.w3cdoc.com)最为直观的感受就是图像仿佛真实的在运动一般，由此产生动画效果。 然后，事实并非如此，真相往往难以用肉眼观察得到，除非你是上帝~~~ 动画的特性在于：
    
- 每一张图像的内容是事先设定好的，内容是不变的，变化的是图像序列按照规定的顺序在变动；
- 构成动画特效需要在单位时间内渲染一定量的图像，每张图像称之为帧（Frame），通常电影只需要24FPS就足够流畅，而游戏则需要60FPS，[我们](https://www.w3cdoc.com)设计动画时通常选用60FPS；
      
总之，你所看到的动画无非是你的眼睛在欺骗你的大脑，本质上每一张图像还是那张图像，只不过它们在单位时间内按照一定顺序在快速移动罢了~~~
    
## Canvas API的简介

这一部分为了兼顾之前未接触canvas元素的看官以及重温canvas的目的，帮助小羊和各位快速过一遍canvas的API。
    
```
//demo.html
<canvas id='canvas' width='500' height='500'></canvas>

// 设置canvas的宽高要在元素或在其API，canvas.width || canvas.height，在CSS上设置为得到意想不到的结果，不信试试看哈···

//demo.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//路径或图形
context.fillRect();//填充矩形
context.strokeRect();//勾勒矩形轮廓
context.arc(x,y,r,anglestart,angleend,clockwise);//画弧形

context.beginPath();//开始路径
context.moveTo();//定义路径起始点
context.lineTo();//路径的去向
context.closePath();//画完后，关闭路径
context.fill() || context.stroke();//最后画出由路径构成的图形
// 本质上，所有的多边形都可以由路径画出；

context.save();//保存save以上context对象设置的属性值
context.restore();//恢复到先前保存在context对象上的所有属性值

```
这里在介绍一下实现动画效果的非常重要的API：
    
```
window.requestAnimationFrame(callback)
```
先前我已经说过，动画是在单位时间内按照一定顺序的图像序列的变化形成的；
这个API的功能就是，你可以在回调函数里面写一个脚本改变图形的宽高，然后这一API就会根据[浏览器](https://www.w3cdoc.com)的刷新频率而在一定时间内调用callback；
然后，根据递归的思想，实现callback的反复调用，最终实现动画效果；
不明白，上代码

```
(function drawFrame(){
    window.requestAnimationFrame(drawFrame);
    
    //some code for animation effect here
})();
```

上面的代码意思是立即执行drawFrame这个函数，发现  window.requestAnimationFrame(drawFrame)，okay根据[浏览器](https://www.w3cdoc.com)的刷新频率，在一定时间之后执行；
接下来执行你所编写的改变图像内容（图像的位置、宽高、颜色等等）的脚本，执行回调；
循环反复，形成动画效果

由此也可知道：window.requestAnimationFrame这个API你可以理解为window.setTimeout(callback,time)

事实上，当部分[浏览器](https://www.w3cdoc.com)不兼容这个API时，[我们](https://www.w3cdoc.com)也可以写成以下形式：

```
if(!window.requestAnimationFrame){
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRquestAniamtionFrame ||
      window.oRequestAnimationFrame ||
      function (callback){
          return setTimeout(callback,Math.floor(1000/60))
    }
  )
}

```

Okay，有了这么几个基本的canvasAPI就足以应对接下来的知识点了，如有不懂或深入了解，详见<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial" target="_blank" rel="nofollow noopener noreferrer">Canvas教程-MDN</a>。
    
    
## 动画的数理分析

有了前面的基础知识，现在[我们](https://www.w3cdoc.com)就会想：如果[我们](https://www.w3cdoc.com)能够在每16ms（1秒60帧，1000/60）内渲染1张图像，并且每一张图像的内容发生微调，那么在1秒钟整个画面就会产生动画效果了。
    
内容的微调可以是图形的移动的距离、转动的方向以及缩放的比例等等，而“捕获”这些数据的方法就用使用到[我们](https://www.w3cdoc.com)以前忽视的解析几何的知识了。
    
## 移动的距离

### 线性运动
线性运动就是物体朝特定方向的运动，运动过程中速度不发生改变；
    
```
<canvas id="canvas"  width="500" height="500" style="background:#000"></canvas>
<script src='../js/utils.js'></script>
<script src='../js/ball.js'></script>
<script>

//这个脚本中，匀速运动的原理是通过连续改变原点在x轴上的坐标，从而实现匀速运动；
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var ball = new Ball();

    var xspeed = 1;//定义每渲染1帧，图形在x轴移动的距离（移动原点）   

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);

        ball.x += xspeed;
        ball.y = canvas.height/2;

        if(ball.x>canvas.width+ball.radius){
            ball.x = -ball.radius;
        } 

        ball.draw(context);
    })();

</script>

```
这段代码涉及部分封装的函数，这里就不讲 这里主要讲解一下思路，如果[我们](https://www.w3cdoc.com)需要圆在x轴上移动，那么一个思路是改变圆的圆心，使圆心在x轴上不断变化，最终形成动画的效果； 上面的ball.x = xpeed就是每执行一次RAF(window.requestAnimationFrame)，圆心就向右移动1像素；
    
同理可以实现在圆在y轴上的移动，甚至是x和y轴的同时移动，这样涉及向量的合成知识了。
    
现在大伙是不是深刻理解高中和大学时学的看似无用的解析几何的妙用啦，自然界物体的运动规律不正是遵循着这些迷人的数学等式吗？
    
好吧，扯远了，言归正传~~~ 小结一下物体的匀速运动：
    
- 1.物体的匀速运动无非是改变其在坐标轴的值，但是**每次的改变量是不变的**，也就是单位时间内的移动距离是不变的，这样才符合匀速；
- 2.通过向量的合成原理，[我们](https://www.w3cdoc.com)可以在canvas画布上实现任意方向的匀速运动

### 变速运动
如同你的知识积淀一样，当你学的越多，运用的越灵活，你再去get一门新的技能的时候，学习的速度就不在是匀速运动，而是变速运动了。
      
变速运动，本质上是物体运动过程中速度在变化，也就是以前学过的加速度的概念，也就是说要想实现物体变速运动，只需要改变坐标轴的值，每次的改变是变化的
    
```
<canvas id="canvas"  width="500" height="500" style="background:#000"></canvas>
<script src='../js/utils.js'></script>
<script src='../js/ball.js'></script>
<script>
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var ball = new Ball();

    var xspeed = 1;//定义每渲染1帧，图形在x轴移动的距离（移动原点）   
    var ax = 0.5;//设置x轴上的每渲染1帧xspeed增加0.05;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);

        ball.x += xspeed;
        xspeed += ax;
        ball.y = canvas.height/2;
        //ball.y += 1;
      if(ball.x>canvas.width+ball.radius){
            ball.x = -ball.radius;
        } 

        ball.draw(context);
    })();
</script>
```
看完上面的代码有没有感到很神奇，同样一段代码，只需要添加var vx = 0.5和xspeed+=vx就可以使物体实现加速运动； 看完demo后，你有没有发现，当速度达到一定程度的时候，物体给人的感觉好像是静止一样；
    
注】 这里给大伙讲一个上面非线性运动日常例子，也就是篮球的自由落体运动，先给大伙看看演示的效果：
    
中学物理都有学过，物体在自由落体过程中受万有引力和空气摩擦力的合力——重力的影响而向下运动，球体在落地地面给了物体一个作用力导致物理受向上的力和万有引力的影响而向上运动，循环反复，由此出现上面的运动效果；
    
数理分析上，物体先是做向下的加速运动，落到地面后（有一个落到地面的速度）再做向上的减速运动知道速度为0时，再做向下的加速运动，循环反复，知道小球落到地面；
    
```
<script>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ball = new Ball(20,'white');
//设置小球初始降落的位置
ball.x = canvas.width/2;
ball.y = canvas.height/5;

var vy = 0;
var gravity = 0.05;//定义重力加速度；
var bounce = -0.8;//定义反弹系数；

//碰撞测试
function checkGround(ball){
    if(ball.y+ball.radius>canvas.height){

        //小球碰到地面时，让球的位置暂时设置为在地面上
        ball.y = canvas.height - ball.radius;

        //此时设置小球落到地面时的速度为反向，大小为原来的0.8；
        vy *= bounce;
    }
}

(function drawFrame(){
    window.requestAnimationFrame(drawFrame,canvas);
    context.clearRect(0,0,canvas.width,canvas.height);

    //小球首先做向下的加速运动
    vy += gravity;
    ball.y += vy;

    //碰撞测试，当小球下落到地面时，vy *= bounce;
    //此时小球在地面时的初始速度为vy *= bounce(vy此时是负值),接着继续向上运动，每渲染1帧，vy+=gravity，注意此时小球做向上的减速运动，直到速度为0时；
    //接着小球继续做向下加速运动，循环往复，直到小球停止；
    checkGround(ball)

    ball.draw(context);
})();

</script>
```
各位可以尝试去修改gravity和bounce的参数，你会有意想不到的结果发现；
    
### 波形运动
波形运动，顾名思义像波浪般的运动，运动轨迹如同下面的三角函数一般； 此时，[我们](https://www.w3cdoc.com)不禁会想：要实现波形运动的轨迹，是不是需要用到三角函数呢？Bingo，答对了~~~可是知识已经还给我敬爱的老师嘞；
      
别紧张，其实实现这个轨迹so easy，听我娓娓道来······
    
先分析一下思路： 实现圆按照波形运动的动画原理是什么？ 每16ms[浏览器](https://www.w3cdoc.com)渲染1帧，每1帧圆的圆心位置发生改变，改变的路径就是这个正弦函数；
    
还不懂？答案就是跟前面的代码一模一样，只不过x轴的变化值由
    
```
//匀速运动
ball.x = xspeed//xspeed = 1一直都是1；

//变速运动
var ax = 0.05;
ball.x += xspeed //xspeed = 1初始值为1；
xspeed += ax//每16ms，xspeed增加0.05；
【注】
各位童鞋自己想一下曲线运动如何实现？提示一下，结合匀速运动和变速运动一起思考；
[【curve-motion】](http://terenyeung.applinzi.com/newapp/canvas/html/curve-motion.html)

//波形运动
var angle = 0;//定义每次变化的角度
var swing = 100;//定义振幅；

ball.x +=2;
ball.y  = canvas.height/2 + Math.sin(angle)*swing;
angle += 0.1;

```
完整代码如下：
    
```
<script>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ball = new Ball();

var angle = 0;
var swing = 100;


(function drawFrame(){
    window.requestAnimationFrame(drawFrame,canvas);
    context.clearRect(0,0,canvas.width,canvas.height);

    ball.x += 2;
    ball.y = canvas.height/2+Math.sin(angle)*swing;
    //ball.y += 1;
    angle += 0.1;

    if(ball.x>canvas.width+ball.radius){
        ball.x = -ball.radius;
    } 

    ball.draw(context);
})();
</script>
```
细心的童鞋可能已经发现这么一个规律：物体的运动轨迹无非就是通过改变物体在canvas坐标轴上的值+RAF这个API而产生运动的；
    
- 匀速运动设置ball.x += 1，每频次图形的x轴右移1px；
- 变速运动设置ball.x += vx, vx += ax，每频次图形x轴右移vx后，vx加ax，下一次图形将移动vx+ax从而实现变速；
- 波形运动则设置ball.y = centerY + Mathsin(angle)*swing，由于正弦函数的值区间为[-1,1]，所以图形会永远在[centerY-swing,centerY+swing]上下移动；
    
这一种思想将会对后面的图形运动的思考同样奏效；
    
### 圆形运动 
现在[我们](https://www.w3cdoc.com)再想一下，如何让圆围绕一个点做圆周运动？ [我们](https://www.w3cdoc.com)学到的解析几何有什么是可以表示圆的？相信各位童鞋已经学会开始抢答了，对啦就是
      
```
x*x+y*y = r*r//这是一原点为圆心，半径为r的圆；
```
或许有童鞋会问候我尼玛，你刚才不是告诉我实现物体运动，只要按照RAF改变物体坐标轴的值就行了吗，你给我上面这么一个等式，那我怎么样去给ball.x和ball.y赋值；
    
人类一思考，上帝就发笑，这是小羊写这篇文章时新鲜看到的一句话，我一开始的理解为嘲讽人类的自作聪明，后来想一下我更加愿意理解为上帝是在对人类不断追求真理这一行为的勉励把；
    
如果有看官想到这一层面，我会觉得你很牛X，因为我是事后复习才想到这一点的。不卖关子，[大家](https://www.w3cdoc.com)应该听说过极坐标把（再一次验证原理的有效性）
    
```
//圆的极坐标表达式为
x = rcosθ
y = rsinθ

也就是说给我一个圆的半径和每次旋转的角度，我就可以用x和y的方式描绘圆的路径

```
二话不说上代码：
    
```
<script>
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ball = new Ball();

var angle = 0.1;
var scope = 100;

(function drawFrame(){
    window.requestAnimationFrame(drawFrame,canvas);
    context.clearRect(0,0,canvas.width,canvas.height);

    ball.x = canvas.width/2+Math.cos(angle)*scope;
    ball.y = canvas.height/2+Math.sin(angle)*scope;
    //ball.y += 1;
    angle += 0.1;

    // if(ball.x>canvas.width+ball.radius){
    //  ball.x = -ball.radius;
    // } 

    ball.draw(context);
})();
</script>
```
有了圆形运动，再讲一下椭圆运动，思考过程和上面基本一样，数学表达式为：
    
```
(x/a)*(x/a)+(y/b)*(y/b)=1
//极坐标
x = a*cosθ
y = b*sinθ
```
有了这两个坐标，图形的椭圆路径还不出来吗，相信你已经跃跃欲试了，我这里就直接给demo啦。
    
其实，圆形运动本质上就是特殊的椭圆运动，各位可以看一下二者的联系与区别：
    
    
```
//圆形运动
var angle = 0,scope = 100;
x = canvas.width/2 + scope*Math.cos(angle)
y = canvas.height/2 + scope*Math.sin(angle)
angle += 0.1;

//椭圆运动
var angle = 0,scopeX = 150 , scopeY = 80;
x = canvas.width/2 + scopeX*Math.cos(angle)
y = canvas.height/2 + scopeY*Math.sin(angle)
angle += 0.1;

```

## 转动的方向
动画特效当中其中有一个很重要的点就是物体的转动方向问题，以自然界的实例来看，你会看到地球自转及其围绕太阳公转；
    
这里先给上一段实现封装好的Arrow类，用于后面的讲解所用；
    
```
//arrow.js
function Arrow(){
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.color = '#ff0';
};

Arrow.prototype.draw = function(context){
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(-50,-25);
    context.lineTo(0,-25);
    context.lineTo(0,-50);
    context.lineTo(50,0);
    context.lineTo(0,50);
    context.lineTo(0,25);
    context.lineTo(-50,25);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
};
```
小羊在转动的方向这一部分要使用一个canvas的新API——context.rotate(angle)来控制物体的转动；
    
到现在只要你掌握前面所讲的动画原理的话，那么就不难推理出自转和公转的动画来；
    
自转：每16ms变化一次angle，那么angle作为参数每传递1次，物体就会转动1次，最终形成自转
    
```
 window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var arrow = new Arrow();

    var angle = 0;
    arrow.x = canvas.width/2;
    arrow.y = canvas.height/2;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);
        arrow.rotation = angle;
        angle +=0.1;

        arrow.draw(context);
    })();

}

```
公转：使用圆周运动的方法实现公转；
    
上面的angle的赋值是机械式，如果[我们](https://www.w3cdoc.com)想要鼠标转到哪里，箭头就指到哪里，会不会更加具有交互性；
    
物体转动的角度和鼠标的指向有关，那么如何建立二者之间的联系呢？

上图给出了答案：先是获取到鼠标在canvas上的坐标，然后获取到物体中心的坐标，根据二点间的距离公式，可以测算出鼠标距离中心点在x轴和y轴的分量dx和dy，然后通过一个很牛掰的三角函数，
    
```
object.rotation = Math.atan2(dy,dx);
```

这个三角函数作用是给它两个x和y轴的距离分量，就可以测算出鼠标与x轴的夹角来； 有同学会问：问什么可以这样？这个暂时无法回答，这个问题深究下去就不属于本笔记范围之内了，知道有这么一个方法就okay啦；
    
测算出角度，就可以给context.rotation(angle)传参啦，此时箭头将会跟着鼠标转动；
    
 ```
 window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var mouse = utils.captureMouse(canvas);
    var arrow = new Arrow();

    var angle = 0;
    arrow.x = canvas.width/2;
    arrow.y = canvas.height/2;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);
        
        var dx = mouse.x - arrow.x,
            dy = mouse.y - arrow.y;
        angle = Math.atan2(dy,dx);
        arrow.rotation = angle;
        arrow.draw(context);
    })();
}
```
okay，现在有了转动，再加入先前的物体运动就可以让&#8221;让子弹飞&#8221;啦~~~

这个demo是一个小飞机，你按下啥键它就会飞向哪，真正实现和用户交互；

【注】 Math.atan2(dy,dx)函数很重要！！！，这意味着这要你能够测算出鼠标与指定点之间的x轴和y轴的分量，那么你就可以获取到鼠标与指定点的连线与x轴所形成的的夹角，由此就可以去改变物体的运动或是转向；
    
## 缩放的比例
canvas提供缩放功能的API可以让[我们](https://www.w3cdoc.com)对物体进行缩放大小，如果结合[我们](https://www.w3cdoc.com)之前学的一些解析几何的知识，那么就可以创作出千变万化的缩放特效出来；
    
```
   <script>
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var ball = new Ball();
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;

    var angle = 0,
        centerScale = 1;
        swing = 0.5;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);

        angle += 0.05

        //plusing-effect
        ball.scaleX = ball.scaleY = centerScale + Math.sin(angle)*swing;
    
        //bigger and bigger effect
        //ball.scaleX = ball.scaleY = centerScale + angle
        ball.draw(context);
    })();
</script>
```
canvas元素绘制动画时运用到的一些常用的解析几何原理和相关的物理知识，例如匀速运动、变速运动、圆周运动、波形运动、脉冲运动，这些运动过程中可涉及到的概念又包括向量的分解（力的分解）、重力、摩擦力、加速度、三角函数等等······

