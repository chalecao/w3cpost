---
title: canvas图片处理与动画



  - 1466

  - 2




---
## canvas绘制圆角图片

<pre class="pure-highlightjs"><code class="">&lt;!DOCTYPE html&gt;  
&lt;html lang="en"&gt;  
&lt;head&gt;  
    &lt;meta charset="UTF-8"&gt;  
    &lt;title&gt;Title&lt;/title&gt;  
&lt;/head&gt;  
&lt;body style="background: rgba(199,237,204,1)"&gt;  
  
&lt;div style="display:flex; flex-direction: row"&gt;  
  
    &lt;!--通过style方式为canvas设置宽高在火狐浏览器上导致绘制内容纵向拉伸。。。--&gt;  
    &lt;canvas id="drawing" width="400px" height="400px"&gt;canvas to draw&lt;/canvas&gt;  
  
    &lt;pre id="container" style="margin: 10px"/&gt;  
  
    &lt;img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494089659713&di=2de3a402d0a89cd3e5ea785e30150928&imgtype=0&src=http%3A%2F%2Fsh.sinaimg.cn%2F2014%2F0715%2FU3551P18DT20140715192106.jpg"&gt;  
&lt;/div&gt;  
&lt;/body&gt;  
&lt;script type="text/javascript"&gt;  
  
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
  
&lt;/script&gt;  
  
&lt;/html&gt;  
</code></pre>

&nbsp;

## 动画处理

#### 什么是动画？

<div>
  <div>
    <p>
      动画本质上是图像按照事先设定好的顺序在一定的时间内的<strong>图像序列变化运动</strong>。<br /> 这种图像序列的变化运动给我们最为直观的感受就是图像仿佛真实的在运动一般，由此产生动画效果。<br /> 然后，事实并非如此，真相往往难以用肉眼观察得到，除非你是上帝~~~<br /> 动画的特性在于：
    </p>

    <ul>
      <li>
        每一张图像的内容是事先设定好的，内容是不变的，变化的是图像序列按照规定的顺序在变动；
      </li>
      <li>
        构成动画特效需要在单位时间内渲染一定量的图像，每张图像称之为帧（Frame），通常电影只需要24FPS就足够流畅，而游戏则需要60FPS，我们设计动画时通常选用60FPS；
      </li>
    </ul>
    
    <p>
      总之，你所看到的动画无非是你的眼睛在欺骗你的大脑，本质上每一张图像还是那张图像，只不过它们在单位时间内按照一定顺序在快速移动罢了~~~
    </p>
    
    <h4>
      Canvas API的简介
    </h4>
    
    <p>
      这一部分为了兼顾之前未接触canvas元素的看官以及重温canvas的目的，帮助小羊和各位快速过一遍canvas的API。
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-comment">//demo.html&lt;/span>
&lt;canvas id=&lt;span class="hljs-string">'canvas'&lt;/span> width=&lt;span class="hljs-string">'500'&lt;/span> height=&lt;span class="hljs-string">'500'&lt;/span>&gt;&lt;span class="xml">&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">canvas&lt;/span>&gt;&lt;/span>&lt;/span>
[注]
设置canvas的宽高要在元素或在其API，canvas.width || canvas.height，在CSS上设置为得到意想不到的结果，不信试试看哈···

&lt;span class="hljs-comment">//demo.js&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

&lt;span class="hljs-comment">//路径或图形&lt;/span>
context.fillRect();&lt;span class="hljs-comment">//填充矩形&lt;/span>
context.strokeRect();&lt;span class="hljs-comment">//勾勒矩形轮廓&lt;/span>
context.arc(x,y,r,anglestart,angleend,clockwise);&lt;span class="hljs-comment">//画弧形&lt;/span>

context.beginPath();&lt;span class="hljs-comment">//开始路径&lt;/span>
context.moveTo();&lt;span class="hljs-comment">//定义路径起始点&lt;/span>
context.lineTo();&lt;span class="hljs-comment">//路径的去向&lt;/span>
context.closePath();&lt;span class="hljs-comment">//画完后，关闭路径&lt;/span>
context.fill() || context.stroke();&lt;span class="hljs-comment">//最后画出由路径构成的图形&lt;/span>
[注]
本质上，所有的多边形都可以由路径画出；

context.save();&lt;span class="hljs-comment">//保存save以上context对象设置的属性值&lt;/span>
context.restore();&lt;span class="hljs-comment">//恢复到先前保存在context对象上的所有属性值&lt;/span>
</code></pre>

    <p>
      这里在介绍一下实现动画效果的非常重要的API：
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(callback)
先前我已经说过，动画是在单位时间内按照一定顺序的图像序列的变化形成的；
这个API的功能就是，你可以在回调函数里面写一个脚本改变图形的宽高，然后这一API就会根据浏览器的刷新频率而在一定时间内调用callback；
然后，根据递归的思想，实现callback的反复调用，最终实现动画效果；
不明白，上代码
</code></pre>

    <pre class="hljs javascript"><code class="javascript">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
    &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame);
    
    &lt;span class="hljs-comment">//some code for animation effect here&lt;/span>
})();

上面的代码意思是立即执行drawFrame这个函数，发现  &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame)，okay根据浏览器的刷新频率，在一定时间之后执行；
接下来执行你所编写的改变图像内容（图像的位置、宽高、颜色等等）的脚本，执行回调；
循环反复，形成动画效果
</code></pre>

    <p>
      由此也可知道：
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame这个API你可以理解为&lt;span class="hljs-built_in">window&lt;/span>.setTimeout(callback,time)

事实上，当部分浏览器不兼容这个API时，我们也可以写成以下形式：

&lt;span class="hljs-keyword">if&lt;/span>(!&lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame){
    &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame = (
      &lt;span class="hljs-built_in">window&lt;/span>.webkitRequestAnimationFrame ||
      &lt;span class="hljs-built_in">window&lt;/span>.mozRequestAnimationFrame ||
      &lt;span class="hljs-built_in">window&lt;/span>.msRquestAniamtionFrame ||
      &lt;span class="hljs-built_in">window&lt;/span>.oRequestAnimationFrame ||
      &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">callback&lt;/span>)&lt;/span>{
          &lt;span class="hljs-keyword">return&lt;/span> setTimeout(callback,&lt;span class="hljs-built_in">Math&lt;/span>.floor(&lt;span class="hljs-number">1000&lt;/span>/&lt;span class="hljs-number">60&lt;/span>))
    }
  )
}

</code></pre>

    <p>
      Okay，有了这么几个基本的canvasAPI就足以应对接下来的知识点了，如有不懂或深入了解，详见<a href="https://link.jianshu.com?t=https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial" target="_blank" rel="nofollow noopener noreferrer">Canvas教程-MDN</a>。
    </p>
    
    <p>
      【注】<br /> <strong>以下所有代码托管到</strong>
    </p>
    
    <h4>
      动画的数理分析
    </h4>
    
    <p>
      有了前面的基础知识，现在我们就会想：如果我们能够在每16ms（1秒60帧，1000/60）内渲染1张图像，并且每一张图像的内容发生微调，那么在1秒钟整个画面就会产生动画效果了。
    </p>
    
    <p>
      内容的微调可以是图形的移动的距离、转动的方向以及缩放的比例等等，而“捕获”这些数据的方法就用使用到我们以前忽视的解析几何的知识了。
    </p>
    
    <h5>
      移动的距离
    </h5>
    
    <ul>
      <li>
        <strong>线性运动</strong><br /> 线性运动就是物体朝特定方向的运动，运动过程中速度不发生改变；
      </li>
    </ul>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="482" data-height="482">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-f492dacd327ab426.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/482" data-original-src="//upload-images.jianshu.io/upload_images/1993435-f492dacd327ab426.gif" data-original-width="482" data-original-height="482" data-original-format="image/gif" data-original-filesize="1564315" />
        </div>
      </div>
      
      <div class="image-caption">
        linear-motion
      </div>
    </div>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">canvas&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"canvas"&lt;/span>  &lt;span class="hljs-attr">width&lt;/span>=&lt;span class="hljs-string">"500"&lt;/span> &lt;span class="hljs-attr">height&lt;/span>=&lt;span class="hljs-string">"500"&lt;/span> &lt;span class="hljs-attr">style&lt;/span>=&lt;span class="hljs-string">"background:#000"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">canvas&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">'../js/utils.js'&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">'../js/ball.js'&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

    &lt;span class="hljs-comment">//这个脚本中，匀速运动的原理是通过连续改变原点在x轴上的坐标，从而实现匀速运动；&lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball();

        &lt;span class="hljs-keyword">var&lt;/span> xspeed = &lt;span class="hljs-number">1&lt;/span>;&lt;span class="hljs-comment">//定义每渲染1帧，图形在x轴移动的距离（移动原点）   &lt;/span>

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            ball.x += xspeed;
            ball.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>;

            &lt;span class="hljs-keyword">if&lt;/span>(ball.x&gt;canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();

    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      这段代码涉及部分封装的函数，这里就不讲<br /> 这里主要讲解一下思路，如果我们需要圆在x轴上移动，那么一个思路是改变圆的圆心，使圆心在x轴上不断变化，最终形成动画的效果；<br /> 上面的ball.x = xpeed就是每执行一次RAF(window.requestAnimationFrame)，圆心就向右移动1像素；
    </p>
    
    <p>
      同理可以实现在圆在y轴上的移动，甚至是x和y轴的同时移动，这样涉及向量的合成知识了。
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="567" data-height="216">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-e695aad8fe13dbe3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/567" data-original-src="//upload-images.jianshu.io/upload_images/1993435-e695aad8fe13dbe3.png" data-original-width="567" data-original-height="216" data-original-format="image/png" data-original-filesize="43204" />
        </div>
      </div>
      
      <div class="image-caption">
        图片来源：周余飞
      </div>
    </div>
    
    <p>
      现在大伙是不是深刻理解高中和大学时学的看似无用的解析几何的妙用啦，自然界物体的运动规律不正是遵循着这些迷人的数学等式吗？
    </p>
    
    <p>
      好吧，扯远了，言归正传~~~<br /> 小结一下物体的匀速运动：
    </p>
    
    <pre class="hljs undefined"><code>1.物体的匀速运动无非是改变其在坐标轴的值，但是**每次的改变量是不变的**，也就是单位时间内的移动距离是不变的，这样才符合匀速；
2.通过向量的合成原理，我们可以在canvas画布上实现任意方向的匀速运动
</code></pre>

    <hr />
    
    <ul>
      <li>
        <strong>变速运动</strong><br /> 如同你的知识积淀一样，当你学的越多，运用的越灵活，你再去get一门新的技能的时候，学习的速度就不在是匀速运动，而是变速运动了。
      </li>
    </ul>
    
    <p>
      变速运动，本质上是物体运动过程中速度在变化，也就是以前学过的加速度的概念，也就是说要想实现物体变速运动，<strong>只需要改变坐标轴的值，每次的改变是变化的</strong>
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="455" data-height="346">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-1788139e3097ba81.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/455" data-original-src="//upload-images.jianshu.io/upload_images/1993435-1788139e3097ba81.gif" data-original-width="455" data-original-height="346" data-original-format="image/gif" data-original-filesize="1185644" />
        </div>
      </div>
      
      <div class="image-caption">
        nonlinear-motion
      </div>
    </div>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">canvas&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"canvas"&lt;/span>  &lt;span class="hljs-attr">width&lt;/span>=&lt;span class="hljs-string">"500"&lt;/span> &lt;span class="hljs-attr">height&lt;/span>=&lt;span class="hljs-string">"500"&lt;/span> &lt;span class="hljs-attr">style&lt;/span>=&lt;span class="hljs-string">"background:#000"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">canvas&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">'../js/utils.js'&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">'../js/ball.js'&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball();

        &lt;span class="hljs-keyword">var&lt;/span> xspeed = &lt;span class="hljs-number">1&lt;/span>;&lt;span class="hljs-comment">//定义每渲染1帧，图形在x轴移动的距离（移动原点）   &lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> ax = &lt;span class="hljs-number">0.5&lt;/span>;&lt;span class="hljs-comment">//设置x轴上的每渲染1帧xspeed增加0.05;&lt;/span>

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            ball.x += xspeed;
            xspeed += ax;
            ball.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>;
            &lt;span class="hljs-comment">//ball.y += 1;&lt;/span>


            &lt;span class="hljs-keyword">if&lt;/span>(ball.x&gt;canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();


    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      看完上面的代码有没有感到很神奇，同样一段代码，只需要添加<code>var vx = 0.5</code>和<code>xspeed+=vx</code>就可以使物体实现加速运动；<br /> 看完demo后，你有没有发现，当速度达到一定程度的时候，物体给人的感觉好像是静止一样；
    </p>
    
    <p>
      【注】<br /> 这里给大伙讲一个上面非线性运动日常例子，也就是篮球的自由落体运动，先给大伙看看演示的效果：
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="346" data-height="506">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-89e5fc8db7b54d07.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/346" data-original-src="//upload-images.jianshu.io/upload_images/1993435-89e5fc8db7b54d07.gif" data-original-width="346" data-original-height="506" data-original-format="image/gif" data-original-filesize="844774" />
        </div>
      </div>
      
      <div class="image-caption">
        gravity-acceleration
      </div>
    </div>
    
    <p>
      中学物理都有学过，物体在自由落体过程中受万有引力和空气摩擦力的合力——重力的影响而向下运动，球体在落地地面给了物体一个作用力导致物理受向上的力和万有引力的影响而向上运动，循环反复，由此出现上面的运动效果；
    </p>
    
    <p>
      数理分析上，物体先是做向下的加速运动，落到地面后（有一个落到地面的速度）再做向上的减速运动知道速度为0时，再做向下的加速运动，循环反复，知道小球落到地面；
    </p>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

   
        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball(&lt;span class="hljs-number">20&lt;/span>,&lt;span class="hljs-string">'white'&lt;/span>);


        &lt;span class="hljs-comment">//设置小球初始降落的位置&lt;/span>
        ball.x = canvas.width/&lt;span class="hljs-number">2&lt;/span>;
        ball.y = canvas.height/&lt;span class="hljs-number">5&lt;/span>;

        &lt;span class="hljs-keyword">var&lt;/span> vy = &lt;span class="hljs-number">0&lt;/span>;
        &lt;span class="hljs-keyword">var&lt;/span> gravity = &lt;span class="hljs-number">0.05&lt;/span>;&lt;span class="hljs-comment">//定义重力加速度；&lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> bounce = &lt;span class="hljs-number">-0.8&lt;/span>;&lt;span class="hljs-comment">//定义反弹系数；&lt;/span>

        &lt;span class="hljs-comment">//碰撞测试&lt;/span>
        &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">checkGround&lt;/span>(&lt;span class="hljs-params">ball&lt;/span>)&lt;/span>{
            &lt;span class="hljs-keyword">if&lt;/span>(ball.y+ball.radius&gt;canvas.height){

                &lt;span class="hljs-comment">//小球碰到地面时，让球的位置暂时设置为在地面上&lt;/span>
                ball.y = canvas.height - ball.radius;

                &lt;span class="hljs-comment">//此时设置小球落到地面时的速度为反向，大小为原来的0.8；&lt;/span>
                vy *= bounce;
            }
        }

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            &lt;span class="hljs-comment">//小球首先做向下的加速运动&lt;/span>
            vy += gravity;
            ball.y += vy;

            &lt;span class="hljs-comment">//碰撞测试，当小球下落到地面时，vy *= bounce;&lt;/span>
            &lt;span class="hljs-comment">//此时小球在地面时的初始速度为vy *= bounce(vy此时是负值),接着继续向上运动，每渲染1帧，vy+=gravity，注意此时小球做向上的减速运动，直到速度为0时；&lt;/span>
            &lt;span class="hljs-comment">//接着小球继续做向下加速运动，循环往复，直到小球停止；&lt;/span>
            checkGround(ball)

            ball.draw(context);
        })();

    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      &nbsp;
    </p>
    
    <p>
      各位可以尝试去修改gravity和bounce的参数，你会有意想不到的结果发现；
    </p>
    
    <hr />
    
    <ul>
      <li>
        <strong>波形运动</strong><br /> 波形运动，顾名思义像波浪般的运动，运动轨迹如同下面的三角函数一般；<br /> 此时，我们不禁会想：要实现波形运动的轨迹，是不是需要用到三角函数呢？<br /> Bingo，答对了~~~可是知识已经还给我敬爱的老师嘞；
      </li>
    </ul>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="634" data-height="266">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-3f7e5bf2292e5d70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/634" data-original-src="//upload-images.jianshu.io/upload_images/1993435-3f7e5bf2292e5d70.png" data-original-width="634" data-original-height="266" data-original-format="image/png" data-original-filesize="61012" />
        </div>
      </div>
      
      <div class="image-caption">
        图片来源：周余飞
      </div>
    </div>
    
    <p>
      别紧张，其实实现这个轨迹so easy，听我娓娓道来······
    </p>
    
    <p>
      先分析一下思路：<br /> 实现圆按照波形运动的动画原理是什么？<br /> 每16ms浏览器渲染1帧，每1帧圆的圆心位置发生改变，改变的路径就是这个正弦函数；
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="487" data-height="438">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-47f968769a6b4095.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/487" data-original-src="//upload-images.jianshu.io/upload_images/1993435-47f968769a6b4095.gif" data-original-width="487" data-original-height="438" data-original-format="image/gif" data-original-filesize="2406821" />
        </div>
      </div>
      
      <div class="image-caption">
        waving-motion
      </div>
    </div>
    
    <p>
      还不懂？答案就是跟前面的代码一模一样，只不过x轴的变化值由
    </p>
    
    <pre class="hljs javascript"><code class="javascript">
&lt;span class="hljs-comment">//匀速运动&lt;/span>
ball.x = xspeed&lt;span class="hljs-comment">//xspeed = 1一直都是1；&lt;/span>

&lt;span class="hljs-comment">//变速运动&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> ax = &lt;span class="hljs-number">0.05&lt;/span>;
ball.x += xspeed &lt;span class="hljs-comment">//xspeed = 1初始值为1；&lt;/span>
xspeed += ax&lt;span class="hljs-comment">//每16ms，xspeed增加0.05；&lt;/span>
【注】
各位童鞋自己想一下曲线运动如何实现？提示一下，结合匀速运动和变速运动一起思考；
[【curve-motion】](http:&lt;span class="hljs-comment">//terenyeung.applinzi.com/newapp/canvas/html/curve-motion.html)&lt;/span>

&lt;span class="hljs-comment">//波形运动&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>;&lt;span class="hljs-comment">//定义每次变化的角度&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> swing = &lt;span class="hljs-number">100&lt;/span>;&lt;span class="hljs-comment">//定义振幅；&lt;/span>

ball.x +=&lt;span class="hljs-number">2&lt;/span>;
ball.y  = canvas.height/&lt;span class="hljs-number">2&lt;/span> + &lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)*swing;
angle += &lt;span class="hljs-number">0.1&lt;/span>;
</code></pre>

    <p>
      完整代码如下：
    </p>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

    
        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball();

        &lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>;
        &lt;span class="hljs-keyword">var&lt;/span> swing = &lt;span class="hljs-number">100&lt;/span>;
    

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            ball.x += &lt;span class="hljs-number">2&lt;/span>;
            ball.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>+&lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)*swing;
            &lt;span class="hljs-comment">//ball.y += 1;&lt;/span>
            angle += &lt;span class="hljs-number">0.1&lt;/span>;

            &lt;span class="hljs-keyword">if&lt;/span>(ball.x&gt;canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();


    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      &nbsp;
    </p>
    
    <p>
      细心的童鞋可能已经发现这么一个规律：物体的运动轨迹无非就是通过改变物体在canvas坐标轴上的值+RAF这个API而产生运动的；
    </p>
    
    <p>
      匀速运动设置ball.x += 1，每频次图形的x轴右移1px；
    </p>
    
    <p>
      变速运动设置ball.x += vx, vx += ax，每频次图形x轴右移vx后，vx加ax，下一次图形将移动vx+ax从而实现变速；
    </p>
    
    <p>
      波形运动则设置ball.y = centerY + Mathsin(angle)*swing，由于正弦函数的值区间为[-1,1]，所以图形会永远在[centerY-swing,centerY+swing]上下移动；
    </p>
    
    <p>
      这一种思想将会对后面的图形运动的思考同样奏效；
    </p>
    
    <hr />
    
    <ul>
      <li>
        <strong>圆形运动</strong><br /> 现在我们再想一下，如何让圆围绕一个点做圆周运动？<br /> 我们学到的解析几何有什么是可以表示圆的？相信各位童鞋已经学会开始抢答了，对啦就是
      </li>
    </ul>
    
    <pre class="hljs cpp"><code class="cpp">x*x+y*y = r*r&lt;span class="hljs-comment">//这是一原点为圆心，半径为r的圆；&lt;/span>
</code></pre>

    <p>
      或许有童鞋会问候我尼玛，你刚才不是告诉我实现物体运动，只要按照RAF改变物体坐标轴的值就行了吗，你给我上面这么一个等式，那我怎么样去给ball.x和ball.y赋值；
    </p>
    
    <p>
      人类一思考，上帝就发笑，这是小羊写这篇文章时新鲜看到的一句话，我一开始的理解为嘲讽人类的自作聪明，后来想一下我更加愿意理解为上帝是在对人类不断追求真理这一行为的勉励把；
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="411" data-height="438">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-24c23b1e925cf370.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/411" data-original-src="//upload-images.jianshu.io/upload_images/1993435-24c23b1e925cf370.gif" data-original-width="411" data-original-height="438" data-original-format="image/gif" data-original-filesize="1085545" />
        </div>
      </div>
      
      <div class="image-caption">
        circular-motion
      </div>
    </div>
    
    <p>
      如果有看官想到这一层面，我会觉得你很牛X，因为我是事后复习才想到这一点的。不卖关子，大家应该听说过极坐标把（再一次验证原理的有效性）
    </p>
    
    <pre class="hljs cpp"><code class="cpp">&lt;span class="hljs-comment">//圆的极坐标表达式为&lt;/span>
x = rcosθ
y = rsinθ

也就是说给我一个圆的半径和每次旋转的角度，我就可以用x和y的方式描绘圆的路径
</code></pre>

    <p>
      二话不说上代码：
    </p>
    
    <pre class="hljs xml"><code class="xml">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

    
        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball();

        &lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0.1&lt;/span>;
        &lt;span class="hljs-keyword">var&lt;/span> scope = &lt;span class="hljs-number">100&lt;/span>;
    
        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            ball.x = canvas.width/&lt;span class="hljs-number">2&lt;/span>+&lt;span class="hljs-built_in">Math&lt;/span>.cos(angle)*scope;
            ball.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>+&lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)*scope;
            &lt;span class="hljs-comment">//ball.y += 1;&lt;/span>
            angle += &lt;span class="hljs-number">0.1&lt;/span>;

            &lt;span class="hljs-comment">// if(ball.x&gt;canvas.width+ball.radius){&lt;/span>
            &lt;span class="hljs-comment">//  ball.x = -ball.radius;&lt;/span>
            &lt;span class="hljs-comment">// } &lt;/span>

            ball.draw(context);
        })();


    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      &nbsp;
    </p>
    
    <p>
      有了圆形运动，再讲一下椭圆运动，思考过程和上面基本一样，数学表达式为：
    </p>
    
    <pre class="hljs cpp"><code class="cpp">(x/a)*(x/a)+(y/b)*(y/b)=&lt;span class="hljs-number">1&lt;/span>
&lt;span class="hljs-comment">//极坐标&lt;/span>
x = a*&lt;span class="hljs-built_in">cos&lt;/span>θ
y = b*&lt;span class="hljs-built_in">sin&lt;/span>θ
</code></pre>

    <p>
      有了这两个坐标，图形的椭圆路径还不出来吗，相信你已经跃跃欲试了，我这里就直接给demo啦。
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="520" data-height="520">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-841a1328a605022d.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/520" data-original-src="//upload-images.jianshu.io/upload_images/1993435-841a1328a605022d.gif" data-original-width="520" data-original-height="520" data-original-format="image/gif" data-original-filesize="663506" />
        </div>
      </div>
      
      <div class="image-caption">
        ellipse-motion
      </div>
    </div>
    
    <p>
      其实，圆形运动本质上就是特殊的椭圆运动，各位可以看一下二者的联系与区别：
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-comment">//圆形运动&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>,scope = &lt;span class="hljs-number">100&lt;/span>;
x = canvas.width/&lt;span class="hljs-number">2&lt;/span> + scope*&lt;span class="hljs-built_in">Math&lt;/span>.cos(angle)
y = canvas.height/&lt;span class="hljs-number">2&lt;/span> + scope*&lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)
angle += &lt;span class="hljs-number">0.1&lt;/span>;

&lt;span class="hljs-comment">//椭圆运动&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>,scopeX = &lt;span class="hljs-number">150&lt;/span> , scopeY = &lt;span class="hljs-number">80&lt;/span>;
x = canvas.width/&lt;span class="hljs-number">2&lt;/span> + scopeX*&lt;span class="hljs-built_in">Math&lt;/span>.cos(angle)
y = canvas.height/&lt;span class="hljs-number">2&lt;/span> + scopeY*&lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)
angle += &lt;span class="hljs-number">0.1&lt;/span>;
</code></pre>

    <h4>
      转动的方向
    </h4>
    
    <p>
      动画特效当中其中有一个很重要的点就是物体的转动方向问题，以自然界的实例来看，你会看到地球自转及其围绕太阳公转；
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="358" data-height="253">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-1b22fb655f32b03a.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/358" data-original-src="//upload-images.jianshu.io/upload_images/1993435-1b22fb655f32b03a.gif" data-original-width="358" data-original-height="253" data-original-format="image/gif" data-original-filesize="259796" />
        </div>
      </div>
      
      <div class="image-caption">
        self-rotation
      </div>
    </div>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="467" data-height="462">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-1bb1a485771c1a53.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/467" data-original-src="//upload-images.jianshu.io/upload_images/1993435-1bb1a485771c1a53.gif" data-original-width="467" data-original-height="462" data-original-format="image/gif" data-original-filesize="544526" />
        </div>
      </div>
      
      <div class="image-caption">
        resolution
      </div>
    </div>
    
    <p>
      这里先给上一段实现封装好的Arrow类，用于后面的讲解所用；
    </p>
    
    <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-comment">//arrow.js&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">Arrow&lt;/span>()&lt;/span>{
    &lt;span class="hljs-keyword">this&lt;/span>.x = &lt;span class="hljs-number">0&lt;/span>;
    &lt;span class="hljs-keyword">this&lt;/span>.y = &lt;span class="hljs-number">0&lt;/span>;
    &lt;span class="hljs-keyword">this&lt;/span>.rotation = &lt;span class="hljs-number">0&lt;/span>;
    &lt;span class="hljs-keyword">this&lt;/span>.color = &lt;span class="hljs-string">'#ff0'&lt;/span>;
};

Arrow.prototype.draw = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">context&lt;/span>)&lt;/span>{
    context.save();
    context.translate(&lt;span class="hljs-keyword">this&lt;/span>.x,&lt;span class="hljs-keyword">this&lt;/span>.y);
    context.rotate(&lt;span class="hljs-keyword">this&lt;/span>.rotation);
    context.lineWidth = &lt;span class="hljs-number">5&lt;/span>;
    context.beginPath();
    context.moveTo(&lt;span class="hljs-number">-50&lt;/span>,&lt;span class="hljs-number">-25&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">-25&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">-50&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">50&lt;/span>,&lt;span class="hljs-number">0&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">50&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">25&lt;/span>);
    context.lineTo(&lt;span class="hljs-number">-50&lt;/span>,&lt;span class="hljs-number">25&lt;/span>);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
};
</code></pre>

    <p>
      小羊在转动的方向这一部分要使用一个canvas的新API——context.rotate(angle)来控制物体的转动；
    </p>
    
    <p>
      到现在只要你掌握前面所讲的动画原理的话，那么就不难推理出自转和公转的动画来；
    </p>
    
    <p>
      自转：每16ms变化一次angle，那么angle作为参数每传递1次，物体就会转动1次，最终形成自转
    </p>
    
    <pre class="hljs javascript"><code class="javascript"> &lt;span class="hljs-built_in">window&lt;/span>.onload = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);

        &lt;span class="hljs-keyword">var&lt;/span> arrow = &lt;span class="hljs-keyword">new&lt;/span> Arrow();

        &lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>;
        arrow.x = canvas.width/&lt;span class="hljs-number">2&lt;/span>;
        arrow.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>;

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);
            arrow.rotation = angle;
            angle +=&lt;span class="hljs-number">0.1&lt;/span>;

            arrow.draw(context);
        })();

  }
</code></pre>

    <p>
      &nbsp;
    </p>
    
    <p>
      公转：使用圆周运动的方法实现公转；
    </p>
    
    <p>
      上面的angle的赋值是机械式，如果我们想要鼠标转到哪里，箭头就指到哪里，会不会更加具有交互性；
    </p>
    
    <p>
      物体转动的角度和鼠标的指向有关，那么如何建立二者之间的联系呢？
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="307" data-height="278">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-788eba2bcf10edfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/307" data-original-src="//upload-images.jianshu.io/upload_images/1993435-788eba2bcf10edfc.png" data-original-width="307" data-original-height="278" data-original-format="image/png" data-original-filesize="48447" />
        </div>
      </div>
      
      <div class="image-caption">
        图片来源：周余飞
      </div>
    </div>
    
    <p>
      上图给出了答案：先是获取到鼠标在canvas上的坐标，然后获取到物体中心的坐标，根据二点间的距离公式，可以测算出鼠标距离中心点在x轴和y轴的分量dx和dy，然后通过一个很牛掰的三角函数，
    </p>
    
    <pre class="hljs cpp"><code class="cpp">object.rotation = Math.&lt;span class="hljs-built_in">atan2&lt;/span>(dy,dx);
</code></pre>

    <p>
      这个三角函数作用是给它两个x和y轴的距离分量，就可以测算出鼠标与x轴的夹角来；<br /> 有同学会问：问什么可以这样？这个暂时无法回答，这个问题深究下去就不属于本笔记范围之内了，知道有这么一个方法就okay啦；
    </p>
    
    <p>
      测算出角度，就可以给context.rotation(angle)传参啦，此时箭头将会跟着鼠标转动；
    </p>
    
    <pre class="hljs javascript"><code class="javascript"> &lt;span class="hljs-built_in">window&lt;/span>.onload = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> mouse = utils.captureMouse(canvas);
        &lt;span class="hljs-keyword">var&lt;/span> arrow = &lt;span class="hljs-keyword">new&lt;/span> Arrow();

        &lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>;
        arrow.x = canvas.width/&lt;span class="hljs-number">2&lt;/span>;
        arrow.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>;

        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);
            
            &lt;span class="hljs-keyword">var&lt;/span> dx = mouse.x - arrow.x,
                dy = mouse.y - arrow.y;
            angle = &lt;span class="hljs-built_in">Math&lt;/span>.atan2(dy,dx);
            arrow.rotation = angle;
            arrow.draw(context);
        })();

  }
</code></pre>

    <p>
      &nbsp;
    </p>
    
    <p>
      okay，现在有了转动，再加入先前的物体运动就可以让&#8221;让子弹飞&#8221;啦~~~
    </p>
    
    <p>
      这个demo是一个小飞机，你按下啥键它就会飞向哪，真正实现和用户交互；
    </p>
    
    <p>
      【注】<br /> Math.atan2(dy,dx)函数很重要！！！，这意味着这要你能够测算出鼠标与指定点之间的x轴和y轴的分量，那么你就可以获取到鼠标与指定点的连线与x轴所形成的的夹角，由此就可以去改变物体的运动或是转向；
    </p>
    
    <h4>
      缩放的比例
    </h4>
    
    <p>
      canvas提供缩放功能的API可以让我们对物体进行缩放大小，如果结合我们之前学的一些解析几何的知识，那么就可以创作出千变万化的缩放特效出来；
    </p>
    
    <div class="image-package">
      <div class="image-container">
        <div class="image-container-fill">
        </div>
        
        <div class="image-view" data-width="423" data-height="451">
          <img class="" src="//upload-images.jianshu.io/upload_images/1993435-89e8106d23f69b63.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/423" data-original-src="//upload-images.jianshu.io/upload_images/1993435-89e8106d23f69b63.gif" data-original-width="423" data-original-height="451" data-original-format="image/gif" data-original-filesize="1260181" />
        </div>
      </div>
      
      <div class="image-caption">
        plusing-motion
      </div>
    </div>
    
    <pre class="hljs xml"><code class="xml">   &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
        &lt;span class="hljs-keyword">var&lt;/span> canvas = &lt;span class="hljs-built_in">document&lt;/span>.getElementById(&lt;span class="hljs-string">'canvas'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> context = canvas.getContext(&lt;span class="hljs-string">'2d'&lt;/span>);
        &lt;span class="hljs-keyword">var&lt;/span> ball = &lt;span class="hljs-keyword">new&lt;/span> Ball();
            ball.x = canvas.width/&lt;span class="hljs-number">2&lt;/span>;
            ball.y = canvas.height/&lt;span class="hljs-number">2&lt;/span>;

        &lt;span class="hljs-keyword">var&lt;/span> angle = &lt;span class="hljs-number">0&lt;/span>,
            centerScale = &lt;span class="hljs-number">1&lt;/span>;
            swing = &lt;span class="hljs-number">0.5&lt;/span>;
    
        (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">drawFrame&lt;/span>()&lt;/span>{
            &lt;span class="hljs-built_in">window&lt;/span>.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(&lt;span class="hljs-number">0&lt;/span>,&lt;span class="hljs-number">0&lt;/span>,canvas.width,canvas.height);

            angle += &lt;span class="hljs-number">0.05&lt;/span>

            &lt;span class="hljs-comment">//plusing-effect&lt;/span>
            ball.scaleX = ball.scaleY = centerScale + &lt;span class="hljs-built_in">Math&lt;/span>.sin(angle)*swing;
        
            &lt;span class="hljs-comment">//bigger and bigger effect&lt;/span>
            &lt;span class="hljs-comment">//ball.scaleX = ball.scaleY = centerScale + angle&lt;/span>
            ball.draw(context);
        })();
    &lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

    <p>
      canvas元素绘制动画时运用到的一些常用的解析几何原理和相关的物理知识，例如匀速运动、变速运动、圆周运动、波形运动、脉冲运动，这些运动过程中可涉及到的概念又包括向量的分解（力的分解）、重力、摩擦力、加速度、三角函数等等······
    </p>
  </div>
</div>
