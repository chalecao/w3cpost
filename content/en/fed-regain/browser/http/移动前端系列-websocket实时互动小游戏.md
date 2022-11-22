---
title: 移动前端系列——websocket实时互动小游戏




---
原本是想在写这文章之前，给大家来个二维码，让大家来感受一下我那个狂拽酷炫叼炸天的实时互动小游戏，无奈一直没有找到一台足以hold住其气场的服务器。所以，此处可能需要大家跟随我的描述，脑补一下那高端大气上档次的画面及低调奢华有内涵交互设计：

* 登录界面（此处省略4.33W字）
* 房间列表页（此处省略3.75W字）
* 游戏界面（此处省略5.83W字）

真不是我故意这样的，实在是人类的语言已无法将其形容，过份的修饰描述只怕是有损其光辉闪耀的形象。此时的我，更是怀着对其满满的敬意，忐忑第敲打着键盘，为大家介绍其狂拽酷炫叼炸天是怎样形成的。  
从文章的标题上，我们不难看出，这个游戏是基于websocket。那么我就先从websocket的作用以及其优点这两个方面，给大家简单介绍一下websocket：

# Websocket的作用 {#articleHeader0}

其实websocket的作用，个人感觉可以简单地用一句话来概括：**构建实时的Web应用**  
比如：

* 聊天室/在线客服
* 在线游戏
* 股票走势
* 多屏互动
* &#8230;

在日常的使用web的过程中，这种功能非常常见，比如：新浪微博的WebIM、WebQQ、大智慧网页版等等，我们在处理日常的一些专题中，适当地加入一些多屏互动，也能很好地增加用户的参与度，增强一些现场的互动，如：斗战诛天营救悟空、神秘站等

<p id="TfxSLbt">
  <img loading="lazy" width="232" height="272" class="alignnone size-full wp-image-4934 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3621554e.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3621554e.png?x-oss-process=image/format,webp" alt="" />
</p>

在websocket出来之前，如果我们想实现上述类型的功能，我们通常采用的是以下几种方式：

* 轮询
* 长轮询
* 长连接
* Flash

我就先通过比较以上几种方式的优缺点，让大家更为清楚地了解websocket牛B之处

### 轮询 {#articleHeader1}

定时向服务器发送请求，服务器响应请求并返回数据

<p id="spxHGME">
  <img loading="lazy" width="248" height="274" class="alignnone size-full wp-image-4935 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb370367fe.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb370367fe.png?x-oss-process=image/format,webp" alt="" />
</p>

优点：后端服务器不需要特殊设置  
缺点：易产生大量无效请求，浪费服务器资源，且消息有延迟  
这种轮询的方式，在日常的网页应用中其实应用也比较多，但是只适合一些实时性要求并不是很高的那种应用，比如说微博的新消息提醒，每隔一段向服务器请求，看看是否有新的微博/粉丝/@等

### 长轮询 {#articleHeader2}

客户端向服务器发送Ajax请求，服务器保持该请求不中断，一直等有新的数据（或超时）需要处理才返回响应信息并关闭连接，客户端处理完成后，重新发起ajax请求

<p id="dlAvcWL">
  <img loading="lazy" width="235" height="261" class="alignnone size-full wp-image-4936 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb37d2ffe9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb37d2ffe9.png?x-oss-process=image/format,webp" alt="" />
</p>

PS:两张图找不同的游戏已开始，请注意看右侧服务器端部分的差异

优点：相比轮询，减少了无效请求次数，消息的实时性得到提升  
缺点：保持连接同样造成服务器资源浪费  
就目前而言，大多数兼容低版本浏览器的聊天室（聊天室貌似基本玩完了）、在线客服，采用的都还是这种方式

### 长连接 {#articleHeader3}

请求一直不中断，服务器端可不断地向客户端输出数据

<p id="EezypYa">
  <img loading="lazy" width="244" height="267" class="alignnone size-full wp-image-4937 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb387d3ce6.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb387d3ce6.png?x-oss-process=image/format,webp" alt="" />
</p>

优点：消息实时，不会产生无效请求  
缺点：对服务器开销较大，单向接收数据还成，客户端如果想要提交数据，一样需要断开连接后重新发送请求

### Flash {#articleHeader4}

基于socket，服务器可客户端可随时进行双向通信

<p id="HDbrjQm">
  <img loading="lazy" width="251" height="242" class="alignnone size-full wp-image-4938 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb391064c6.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb391064c6.png?x-oss-process=image/format,webp" alt="" />
</p>

优点：socket协议  
缺点：需要安装flash player，对移动端（特别是IOS，貌似高级的安卓也在放弃flash）不友好

通过对上面四种传统方式的分析，我们不难发现，其实前面的三种方式都是传统意义上的HTTP请求（PS:那些个乱七八糟的握手什么，就不在这里探讨了），然后你就会发现，每次的请求都会有一堆类似下面的这些个步骤

<p id="HFlygOF">
  <img loading="lazy" width="332" height="150" class="alignnone size-full wp-image-4939 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb39b052a0.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb39b052a0.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb39b052a0.png?x-oss-process=image/format,webp 332w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb39b052a0.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_136/format,webp 300w" sizes="(max-width: 332px) 100vw, 332px" />
</p>

当然了，牛B的你可能会说DNS有缓存，并不会需要那么多DNS Lookup，嗯，那么其他的呢？看看那些头信息（cookie已打码）

<p id="zBXtxRw">
  <img loading="lazy" width="553" height="124" class="alignnone size-full wp-image-4940 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3a3f3ed2.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3a3f3ed2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3a3f3ed2.png?x-oss-process=image/format,webp 553w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3a3f3ed2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_67/format,webp 300w" sizes="(max-width: 553px) 100vw, 553px" />
</p>

<span class="img-wrap"></span>这些信息可是会伴随每次请求，来回地穿梭在服务器和客户端之间。浪费你大量的服务器资源，当然了，弊端包括但不限于此。那么，是时候看看Websocket的优势

# Websocket的优点 {#articleHeader5}

说到这个优点，我只想让大家看一个websocket官网上的一个图表

<p id="eGdihks">
  <img loading="lazy" width="510" height="369" class="alignnone size-full wp-image-4941 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3ac260f9.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3ac260f9.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3ac260f9.png?x-oss-process=image/format,webp 510w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3ac260f9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_217/format,webp 300w" sizes="(max-width: 510px) 100vw, 510px" />
</p>

通过这么一个图表，我们会发现，请求量越大的情况下，Websocket的表现就越是勇猛。与此同时，这么一个勇猛的外表下，脏着的确是一颗少女般的心。别误会，值的是学习起她来很简单。  
下面就从websocket服务器及其api两个方面来简单介绍一下：

# Webscoket服务器的搭建 {#articleHeader6}

本次所讲述的websocket是基于nodejs服务器来完成整套部署的。所以，我们需要先在服务器上搭建一个nodejs环境

## Nodejs安装 {#articleHeader7}

直接从<a href="http://nodejs.org/" target="_blank" rel="nofollow noopener noreferrer">http://nodejs.org</a> 这个网站上下载后直接安装就成，应该是没什么难度的

<p id="XQimogF">
  <img loading="lazy" width="497" height="140" class="alignnone size-full wp-image-4942 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3b50df6a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3b50df6a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3b50df6a.png?x-oss-process=image/format,webp 497w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3b50df6a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_85/format,webp 300w" sizes="(max-width: 497px) 100vw, 497px" />
</p>

安装完成之后，我们可以在命令行工具中运行 node -v来检测安装是否成功

<p id="uEiMMpJ">
  <img loading="lazy" width="497" height="30" class="alignnone size-full wp-image-4943 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3be34661.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3be34661.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3be34661.png?x-oss-process=image/format,webp 497w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3be34661.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_18/format,webp 300w" sizes="(max-width: 497px) 100vw, 497px" />
</p>

如果正常地显示出了版本号，那么说明nodejs安装成功，接下来我们就需要安装websocket模块了

## Websocket模块安装 {#articleHeader8}

Nodejs安装完成之后，其默认就给安装好了nodejs包管理工具npm，通过使用npm命令，我们就可以来安装/卸载/更新nodejs的包。

一切正常的话，我们就可以通过使用命令

<pre class="hljs sql"><code>npm &lt;span class="hljs-keyword">install&lt;/span> ws
</code></pre>

来安装websocket模块

<p id="lOVKrnE">
  <img loading="lazy" width="521" height="414" class="alignnone size-full wp-image-4944 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3c844fce.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3c844fce.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3c844fce.png?x-oss-process=image/format,webp 521w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4eb3c844fce.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_238/format,webp 300w" sizes="(max-width: 521px) 100vw, 521px" />
</p>

websocket的服务器环境基本搭建完成，接下来我们通过几行简单地代码就可以把一个websocket服务器启动起来

<pre class="hljs javascript"><code>&lt;span class="hljs-keyword">var&lt;/span> cons = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Array&lt;/span>();
&lt;span class="hljs-keyword">var&lt;/span> ws = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'ws'&lt;/span>).Server;
&lt;span class="hljs-keyword">var&lt;/span> server = &lt;span class="hljs-keyword">new&lt;/span> ws({&lt;span class="hljs-attr">host&lt;/span>:&lt;span class="hljs-string">"127.0.0.1"&lt;/span>,&lt;span class="hljs-attr">port&lt;/span>:&lt;span class="hljs-number">8808&lt;/span>});
server.on(&lt;span class="hljs-string">'connection'&lt;/span>,&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">ws&lt;/span>)&lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'new connection founded successfully'&lt;/span>);
  cons.push(ws);
  ws.on(&lt;span class="hljs-string">'message'&lt;/span>,&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">data&lt;/span>)&lt;/span>{
    &lt;span class="hljs-keyword">for&lt;/span>(&lt;span class="hljs-keyword">var&lt;/span> i=&lt;span class="hljs-number">0&lt;/span>;i&lt;cons.length;i++){
        cons[i].send(data);
    }
  });
  ws.on(&lt;span class="hljs-string">'close'&lt;/span>,&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
    &lt;span class="hljs-keyword">for&lt;/span>(&lt;span class="hljs-keyword">var&lt;/span> i=&lt;span class="hljs-number">0&lt;/span>;i&lt;cons.length;i++){
       &lt;span class="hljs-keyword">if&lt;/span>(cons[i] == ws) cons.splice(i,&lt;span class="hljs-number">1&lt;/span>);
    }
  });
});
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'websocket-server running...'&lt;/span>);
</code></pre>

保存文件名为app.js，在命令行中运行

<pre class="hljs nginx"><code>&lt;span class="hljs-attribute">node&lt;/span> app.js
</code></pre>

到此为止，服务端的部署完成，接下来，就可以看看websocket是如何在浏览器上跑起来的。  
在客户端，仅需要一条语句，就算是建立起了客户端和服务器端的链接

<pre class="hljs scala"><code>&lt;span class="hljs-keyword">var&lt;/span> ws = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-type">WebSocket&lt;/span>(&lt;span class="hljs-symbol">'ws&lt;/span>:&lt;span class="hljs-comment">//127.0.0.1:8808/');&lt;/span>
</code></pre>

PS：所传递参数中的地址需要服务器上配置的一致  
然后就可以通过各种事件/方法来完成客户端和服务器之间的数据交互，这个也就是我接下来要介绍的

# Websocket API简介 {#articleHeader9}

当然，我这里的介绍包括了事件及方法  
常用的事件和方法，总共为一下6个

* onopen 和服务器连接成功
* onmessage 接收服务器的消息
* onclose 断开和服务器的链接
* onerror 错误处理
* send 向服务器发送消息
* close 断开和服务器的链接

用法大致如下

<pre class="hljs javascript"><code>&lt;span class="hljs-comment">//建立服务器连接&lt;/span>
       ws.onopen = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        systemInfo.innerHTML = &lt;span class="hljs-string">'&lt;p&gt;和websocket服务器连接成功&lt;/p&gt;'&lt;/span>;
    }
    &lt;span class="hljs-comment">//接收到服务器返回的数据&lt;/span>
    ws.onmessage = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">e&lt;/span>)&lt;/span>{
        systemInfo.innerHTML += &lt;span class="hljs-string">'&lt;p&gt;'&lt;/span>+e.data+&lt;span class="hljs-string">'&lt;/p&gt;'&lt;/span>;
    }
    &lt;span class="hljs-comment">//断开服务器连接&lt;/span>
    ws.onclose = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        systemInfo.innerHTML += &lt;span class="hljs-string">'&lt;p&gt;WebSocket服务器连接关闭&lt;/p&gt;'&lt;/span>;
    }
    &lt;span class="hljs-comment">//ws发生错误&lt;/span>
    ws.onerror = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">e&lt;/span>)&lt;/span>{
        &lt;span class="hljs-built_in">console&lt;/span>.log(e);
        systemInfo.innerHTML += &lt;span class="hljs-string">'&lt;p&gt;WebSocket发生错误&lt;/p&gt;'&lt;/span>;
    }
    testForm.onsubmit = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        &lt;span class="hljs-comment">//发送数据给服务器&lt;/span>
        ws.send(username.value+&lt;span class="hljs-string">":"&lt;/span>+msg.value);
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
    }
    close.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>()&lt;/span>{
        ws.close();
    }, &lt;span class="hljs-literal">false&lt;/span>);
</code></pre>

该完整demo可以<a href="http://ossweb-img.qq.com/images/tgideas/attachment/socket.zip" target="_blank" rel="nofollow noopener noreferrer">点击此处下载</a>  
由此可见，websocket用起来真的很简单。但是这个功能相对来说非常单一，在实际的项目过程中，我们所涉及到的业务逻辑可能会相对来说复杂很多，比如说某些消息只想被某个特定的范围里面的用户接收，同时，至少在天朝，使用低版本IE浏览器或者其相同内核（Trident）的用户所占比例还是不少，没理由把这批用户放弃，为了解决这个问题，socket.io组件便孕育而生了

# Socket.io {#articleHeader10}

Socket.io作为nodejs的一个模块，其安装方法和ws的完全一致

<pre class="hljs sql"><code>npm &lt;span class="hljs-keyword">install&lt;/span> socket.io</code></pre>

Socket.io同样的简单  
在服务端只需要起一个HTTP server，然后在启动socket.io即可

<pre class="hljs typescript"><code>&lt;span class="hljs-keyword">var&lt;/span> app = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'http'&lt;/span>).createServer(handler)
&lt;span class="hljs-keyword">var&lt;/span> io = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'socket.io'&lt;/span>)(app);
</code></pre>

Handler函数自己YY一下吧，  
客户端的话，比使用原生的websocket稍微多一步，需要在页面上引入一个socket.io.js文件

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">"/socket.io/socket.io.js"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

然后在通过运行

<pre class="hljs lisp"><code>var socket = io()&lt;span class="hljs-comment">;&lt;/span>
</code></pre>

即建立起了socket连接.

有的童鞋可能会奇怪，在自己的代码目录中并没有socket.io.js这个文件，设置在网站根目录下socket.io这个目录都没有，其原因是这个请求被rewrite了，所以~~仅仅使用的话..你可以不用在意这个细节，如果你只是想去看看这个文件的代码，可以直接去访问那个路径即可。  
对于socket.io，我们只需要掌握两个功能函数，即可以完成基本的websocket功能了。这两个函数分别为:

* on 事件监听
* emit 触发事件

常用的事件

* connect 建立连接
* disconnect 断开连接
* error 出错

# 实时联机小游戏 {#articleHeader11}

好吧，前面介绍了一堆，现在马上回到那个狂拽酷炫叼炸天的游戏上来，介绍这个游戏的实现，我会从4个方面来进行。  
记得每个页面都需要引入socket.io.js文件

<pre class="hljs xml"><code>&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">"/socket.io/socket.io.js"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
</code></pre>

1、用户注册/登录  
2、创建房间  
3、加入房间  
4、对战（实时排行榜）

## 用户注册/登录 {#articleHeader12}

本游戏是没有进行严格意义上的用户授权验证，各位就莫要纠结这些。

注册/登录顾名思义，页面上肯定就是一个表单，让用户填写一些用户名之类的。当然了，我绝对不会因为这种页面简单，就随便设计下敷衍了事。一个伟大的产品，在这些细节把握上，做得那都是非常到位。（作者此处忍住了，未用人类的语言损害其光辉闪耀的形象）

用传统的方式去完成这种注册/登录的话，就两步：

1.客户端填好信息后，post相关信息到某个接口文件，在服务器上完成了相应的操作之后，反馈给客户端一些信息。  
2.客户端接收到服务器返回的信息后，给出相应的操作或者是相关的错误提示信息

用socket的方式，步骤和这个基本一致，只不过是这个减少了一些请求的发送，其步骤也同样是两步：

1.客户端填好信息后，通过指定事件将这些数据发送到服务器端，服务端通过监听这个指定的事件，去完成相应的操作。完成之后，同样通过一个指定的事件，将消息发送回客户端。  
2.客户端监听到服务器所触发的那个事件后，给出相应的操作或者是错误提示信息

在我们的这个案例中，关键代码如下

客户端向服务器发送注册事件（写在客户端）

<pre class="hljs scala"><code>socket.emit(&lt;span class="hljs-symbol">'regist&lt;/span>e', userName); &lt;span class="hljs-comment">//事件名可自定义&lt;/span>
</code></pre>

服务器监听registe事件（写在服务端）

<pre class="hljs groovy"><code>socket.on(&lt;span class="hljs-string">'registe'&lt;/span>, function(userName){
&lt;span class="hljs-comment">//完成一些重名判断，写入数据之类的&lt;/span>
&lt;span class="hljs-comment">//上述步骤完成之后，需要向客户端发送事件，事件名可自定义&lt;/span>
socket.emit(&lt;span class="hljs-string">'registe'&lt;/span>, {
        &lt;span class="hljs-string">userInfo :&lt;/span> userInfo,
        &lt;span class="hljs-string">msg :&lt;/span> &lt;span class="hljs-string">'registe successed'&lt;/span>,
        &lt;span class="hljs-string">code :&lt;/span> &lt;span class="hljs-number">0&lt;/span>
    })
});
</code></pre>

客户端监听服务器上发送的那个事件

<pre class="hljs actionscript"><code>socket.on(&lt;span class="hljs-string">'registe'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-params">(data)&lt;/span> &lt;/span>{
    &lt;span class="hljs-comment">//根据服务器给回的数据进行相应的操作&lt;/span>
});
</code></pre>

## 创建房间 {#articleHeader13}

创建房间的流程和注册的流程一致，重新定义个事件名基本上就OK了。但是真当你按照上面的那些流程去操作的时候，你会发现当你停留在房间列表页的时候，你只能看到你自己刚创建的房间被动态插入到列表中。在你停留在房间列表的时候，其他用户创建的房间，你看不见。同样的，你的房间也不会实时刷新到其他用户的房间列表中。除非你手动刷新你页面。

如果，因为这点，你觉得socket也就不过如此的话，那么你就是真的是小瞧socket.io了，socket.io发送消息，默认情况下是只发送给当前连接的socket，但是它也是可以把消息发送给所有人的。我们只需要修改一点代码即可达成实时更新所有用户房间列表的功能.

下面的这几行代码是服务端创建房间的关键代码:

<pre class="hljs groovy"><code>socket.on(&lt;span class="hljs-string">'create'&lt;/span>, function (data) {
&lt;span class="hljs-comment">//完成一些重名判断，写入数据之类的&lt;/span>
&lt;span class="hljs-comment">//关键代码在此，注意和上面注册的代码相比较&lt;/span>
io.sockets.emit(&lt;span class="hljs-string">'create'&lt;/span>, {
        &lt;span class="hljs-string">roomInfo :&lt;/span> roomInfo,
        &lt;span class="hljs-string">msg :&lt;/span> &lt;span class="hljs-string">'create successed'&lt;/span>,
        &lt;span class="hljs-string">code :&lt;/span> &lt;span class="hljs-number">0&lt;/span>
  })
});
</code></pre>

上面的注册/登录我们在服务器向客户端发送消息时,用到的是`socket.emit`  
在创建房间列表时，用到的是`io.sockets.emit`  
通过使用下面的这种方式，我们就可以实现想所有连接的socket发送消息的功能

## 加入房间 {#articleHeader14}

通过上面两个功能点的讲解，也许你马上就想到了加入房间功能应该如何实现了，客户端发送一个加入房间的事件到服务器端，服务器给当前的这个用户一个标识，标识当前这个用户所进入的房间，然后通知到客户端就好了。确实，你这样实现也确实可以实现基本的加入房间功能，但是你别因此就关闭了我这篇文章，搞不好这里还能给你提供一个更优雅的实现方式呢！（第一次看到上面就关了，第二次才看到这里的朋友，你也是幸运的）.

没错，这里就是要给大家提供一个更优雅的方式，如果你按照上面的那个思路往下进行，你会发现代码写起来似乎越来越费劲。这里需要给大家介绍的就是另外一个API：`socket.join`

从字面上我们似乎就发现了，这个API简直就是为加入房间而生了。没错，用他来实现加入房间，很完美。但是个人还是建议你把他理解成为加入某个分组。相信这样，我才不会固化了大家伙的思维。

如果是用这种方法，那么加入房间就会变得异常轻松

<pre class="hljs actionscript"><code>socket.on(&lt;span class="hljs-string">'enter'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(data)&lt;/span>&lt;/span>{
&lt;span class="hljs-comment">//加入房间&lt;/span>
    socket.join(data.room);
&lt;span class="hljs-comment">//加入成功之后通知客户端&lt;/span>
    socket.emit(&lt;span class="hljs-string">'enter'&lt;/span>, userInfo[data.user]);
})
</code></pre>

到此为止，似乎采用这种join的方式，优势也并不是那么特别的明显。那么，在接下来的对战页面中。你就能发现其牛B之处

## 对战（实时排行榜） {#articleHeader15}

所谓实时排行榜，就肯定是服务器上有数据发生变化时，需要通知客户端去更新。前面我给大家介绍过两种发送数据的方式

<pre class="hljs objectivec"><code>socket.emit  &lt;span class="hljs-comment">//向当前连接的socket&lt;/span>
</code></pre>

以及

<pre class="hljs objectivec"><code>io.sockets.emit &lt;span class="hljs-comment">//向所有连接的socket发送信息&lt;/span>
</code></pre>

但是，在实际的这种加入房间的游戏对战中，似乎这两种发送消息的方式都不满足。第一种范围太小，光自己看到不顶用；第二种范围又太大，很容易骚扰到其他房间的用户。我们需要第三种：消息只能被指定房间中的用户接收。很不巧的是，socket.io还真提供了这种API：

<pre class="hljs groovy"><code>io.sockets.&lt;span class="hljs-keyword">in&lt;/span>(roomID).emit
roomID也就是我们上面socket.join方法中传递的参数，那么此时，我们的代码仅需要如此：
io.sockets.&lt;span class="hljs-keyword">in&lt;/span>(roomID).emit(&lt;span class="hljs-string">'update scroce'&lt;/span>, {
&lt;span class="hljs-string">player :&lt;/span> roomInfo[roonName].player,
    &lt;span class="hljs-string">userInfo :&lt;/span> userInfo
})
</code></pre>

同样的，游戏倒计时也可以使用这种方法。

socket.io提供的消息发送方式，不仅仅为以上三种方式，其包含有如下几种：

* socket.emit() //发送消息给当前请求的socket
* io.sockets.emit() //发送消息给所有连接socket
* socket.broadcase.emit() //发送消息给当前请求之外的所有的socket
* io.sockets.in(foo).emit() //向指定的分组发送消息
* socket.broadcase.to(foo).emit() //向指定的分组发送消息，除当前请求的socket
* io.sockets.socket(socketid).emit() //通过socketid向特定有效的socket发送消息

好了，到此为止，这个实时对战小游戏的功能基本上介绍完毕了。  
当然了，websocket就目前而言，在真正使用的时候还是多少考虑下一些实际的问题，至少天朝带宽什么的可能并不是特别的理想，网络延迟之类的还是比较严重。不过，随着4G的出现及今后互联网的发展，兴许这以后就真不是什么问题了呢。

原文：https://tgideas.qq.com/webplat/info/news_version3/804/808/811/m579/201412/294454.shtml
