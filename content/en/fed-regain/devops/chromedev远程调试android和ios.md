---
title: chrome dev远程调试android 和ios

---
<div>
 调试是开发过程很重要的过程，而随着移动端的普及，移动开发也越来越多，并且由于移动端的诸多限制，使得调试相对PC复杂很多。因此远程调试就显得非常重要了。 近几年，[浏览器](https://www.w3cdoc.com)厂商也纷纷推出自己的远程调试工具，比如Opera Mobile 推出的Opera Dragonfly，iOS Safari 可以开启Web检查器在 Mac OS X系统中实现远程调试。Android 4.0+系统的 Chrome for Android可以配合 ADB（Android Debug Bridge）实现桌面远程调试，桌面版Chrome 32+已经支持免安装ADB即可实现远程调试移动设备页面/WebView 。国内的UC[浏览器](https://www.w3cdoc.com)开发者版也推出了自己的远程调试工具RemoteInspector。除了[浏览器](https://www.w3cdoc.com)厂商之外，也涌现出许多第三方开发的远程调试工具，诸如支持全平台调试的Weinre等。
  
 TL,NR，先介绍一下anydebugger方案吧，原理复杂使用简单，参考：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/zhichirenyiduandejiyuchrome-devtoolsyuanchengdiaoshijishufangan/">支持任意端的基于Chrome devTools远程调试技术方案</a>
</div>

<div>
  ##   远程调试
  

 那么远程调试就是调试运行在远程的APP。比如手机上访问google，我需要在PC上调试手机上运行的google APP。 这个就叫做远程调试。
  
 远程调试大概有三种类型：
  
  <ul>
    
      调试远程PC（本质上是一个debug server 和 一个debug target，其实下面两种也是这种模型，ios中间会多一个协议转化而已） 这种类型下的debug target就是pc, debug server 也是pc。
    
    
      调试android webpage/webview（很多方式，但安卓4.4以后本质都是Chrome DevTools Protocol的扩展） 这种类型下的debug target就是android webview，debug server 是pc。
    
    
      调试ios webpag/webview（可以使用iOS WebKit Debug Proxy代理，然后问题便退化成上述两种场景） 这种类型下的debug target就是ios webview， debug server 是pc。
    
  
 <img loading="lazy" class="alignnone wp-image-2108 size-full" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/07/20160814144505027.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/07/20160814144505027.png?x-oss-process=image/format,webp" alt="" width="532" height="392" />
  
 上图展示了基于adb的chrome webview 的 debug的架构。
  
  ##   Android webview 调试
  

 unix domain socket是linux下面的用于进程间通讯IPC的一种socket，（参考：https://blog.csdn.net/guxch/article/details/7041052）
  
 android4.4 版本之后，可以配置开启 WebViews 调试，支持直接使用chrome dev tool调试Android webview。（参考： https://developers.google.com/web/tools/chrome-devtools/remote-debugging/webviews?hl=zh-cn）
  
 必须从您的应用中启用 WebView 调试。要启用 WebView 调试，请在 WebView 类上调用静态方法 <a href="https://developer.android.com/reference/android/webkit/WebView.html?hl=zh-cn#setWebContentsDebuggingEnabled(boolean)">setWebContentsDebuggingEnabled</a>。
  
  <pre class="prettyprint notranslate"><code>&lt;span class="kwd">if&lt;/span> &lt;span class="pun">(&lt;/span>&lt;span class="typ">Build&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">VERSION&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">SDK_INT &lt;/span>&lt;span class="pun">&gt;=&lt;/span> &lt;span class="typ">Build&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">VERSION_CODES&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">KITKAT&lt;/span>&lt;span class="pun">)&lt;/span> &lt;span class="pun">{&lt;/span>&lt;span class="pln">
    &lt;/span>&lt;span class="typ">WebView&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">setWebContentsDebuggingEnabled&lt;/span>&lt;span class="pun">(&lt;/span>&lt;span class="kwd">true&lt;/span>&lt;span class="pun">);&lt;/span>
&lt;span class="pun">}&lt;/span>
</code></pre>
 此设置适用于应用的所有 WebView。
  
提示：WebView 调试不会受应用清单中 <code>debuggable</code> 标志的状态的影响。如果您希望仅在 <code>debuggable</code> 为 <code>true</code> 时启用 WebView 调试，请在运行时测试标志。
  
  <pre class="prettyprint notranslate"><code>&lt;span class="kwd">if&lt;/span> &lt;span class="pun">(&lt;/span>&lt;span class="typ">Build&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">VERSION&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">SDK_INT &lt;/span>&lt;span class="pun">&gt;=&lt;/span> &lt;span class="typ">Build&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">VERSION_CODES&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">KITKAT&lt;/span>&lt;span class="pun">)&lt;/span> &lt;span class="pun">{&lt;/span>&lt;span class="pln">
    &lt;/span>&lt;span class="kwd">if&lt;/span> &lt;span class="pun">(&lt;/span>&lt;span class="lit">0&lt;/span> &lt;span class="pun">!=&lt;/span> &lt;span class="pun">(&lt;/span>&lt;span class="pln">getApplicationInfo&lt;/span>&lt;span class="pun">().&lt;/span>&lt;span class="pln">flags &lt;/span>&lt;span class="pun">&&lt;/span> &lt;span class="typ">ApplicationInfo&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">FLAG_DEBUGGABLE&lt;/span>&lt;span class="pun">))&lt;/span>&lt;span class="pln">
    &lt;/span>&lt;span class="pun">{&lt;/span> &lt;span class="typ">WebView&lt;/span>&lt;span class="pun">.&lt;/span>&lt;span class="pln">setWebContentsDebuggingEnabled&lt;/span>&lt;span class="pun">(&lt;/span>&lt;span class="kwd">true&lt;/span>&lt;span class="pun">);&lt;/span> &lt;span class="pun">}&lt;/span>
&lt;span class="pun">}&lt;/span>
</code></pre>
</div>

Android的webview debugger socket是一种unix domain socket，所以[我们](https://www.w3cdoc.com)要基于adb来和这个socket通信。

## adb通信原理


  <img loading="lazy" class="alignnone wp-image-3390 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22da5eb22ca.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22da5eb22ca.png?x-oss-process=image/format,webp" alt="" width="472" height="354" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22da5eb22ca.png?x-oss-process=image/format,webp 728w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22da5eb22ca.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w" sizes="(max-width: 472px) 100vw, 472px" />

电脑上通过adb命令和手机上的adb守护进程通信，其中采用的通信方式是 smart socket。

android提供了smartsocket,详见<a href="https://android.googlesource.com/platform/system/core/+/master/adb/protocol.txt" target="_blank" rel="external noopener">这里</a>

> — smartsockets ——————————————————-  
> Port 5037 is used for smart sockets which allow a client on the host  
> side to request access to a service in the host adb daemon or in the  
> remote (device) daemon. The service is requested by ascii name,  
> preceeded by a 4 digit hex length. Upon successful connection an  
> “OKAY” response is sent, otherwise a “FAIL” message is returned. Once  
> connected the client is talking to that (remote or local) service.  
> client:  
> server: “OKAY”  
> client:  
> server: “FAIL”

总结来说，就是可以给adb-server发送一条指令`<service-name>`，然后adb-server会转发给adbd，让adbd来执行`<service-name>`.  
举例来说，当[我们](https://www.w3cdoc.com)执行`adb shell cat /proc/net/unix`,最终就是通过adbd在设备上执行的。

<img loading="lazy" class="alignnone wp-image-3389 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png?x-oss-process=image/format,webp" alt="" width="500" height="421" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png?x-oss-process=image/format,webp 1032w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_253/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_647/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d9d81448a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_712,h_600/format,webp 712w" sizes="(max-width: 500px) 100vw, 500px" />

Stetho的通信模型如上图，其中stetho-server就是app启的一个Thread用来accept客户端的connect。

## 链接unix domain socket

手机通过usb链接电脑（adb over wifi参考后面），并开启调试模式，运行下列命令，如果查到abstract socket：@chrome\_devtools\_remote，则表明chrome for android 开启了unix domain socket。如果查到abstract socket@webview\_devtools\_remote_27594，则说明了AndroidWebView也开启了unix domain socket。

    $ adb shell cat /proc/net/unix | grep --text  _devtools_remote
    00000000: 00000002 00000000 00010000 0001 01 3517288 @webview_devtools_remote_27594
    00000000: 00000002 00000000 00010000 0001 01 3535173 @chrome_devtools_remote
    00000000: 00000003 00000000 00000000 0001 03 3546131 @chrome_devtools_remote
    直接过滤 webview 
    $ adb shell grep -a webview_devtools_remote /proc/net/unix
    0000000000000000: 00000002 00000000 00010000 0001 01 14832 @webview_devtools_remote_2621
    0000000000000000: 00000002 00000000 00010000 0001 01 459297 @webview_devtools_remote_m5x_17803
    0000000000000000: 00000003 00000000 00000000 0001 03 455603 @webview_devtools_remote_2621

后面带的\_2621 这种是对应的pid，采用下面的命令可以建立本地9223端口转发到远程手机的unix domain socket（webview\_devtools\_remote\_m5x_17803），这样就可以在本地访问到这个android webview debug server （关于adb forward， 参考：https://www.cnblogs.com/fwindpeak/archive/2013/05/20/3088895.html）

    adb forward tcp:9223 localabstract:webview_devtools_remote_m5x_17803

  在[浏览器](https://www.w3cdoc.com)访问下这个9223端口，因为http协议底层走的也是tcp所以可以直接用[浏览器](https://www.w3cdoc.com)看下：https://localhost:9223/json

<div>
  <pre><code></code><code>
[ {
"description": "    {\"attached\":true,\"empty\":false,\"height\":1232,\"screenX\":0,\"screenY\":48,\"visible\":true,\"width\":720}",
"devtoolsFrontendUrl": "https://chrome-devtools-frontend.appspot.com/serve_rev/@a000f5daeaac3f79102a0c8f6eaab57aa0e00ae9/inspector.html?ws=localhost:9223/devtools/page/e5158e4a-d1df-4c43-b56c-fd19319dcadb",
"id": "e5158e4a-d1df-4c43-b56c-fd19319dcadb",
"title": "天猫超市",
"type": "page",
"url": "https://chaoshi.m.tmall.com/?disableNav=YES&utparam=%7B%22ranger_buckets%22%3A%22null%7C2895%22%2C%22ranger_buckets_native%22%3A%223801_4402_3151%22%7D&spm=a2141.1.icons.5&scm=2019.1.2.1007&_ig=shoutao&disableAB=1",
  "webSocketDebuggerUrl": "ws://localhost:9223/devtools/page/e5158e4a-d1df-4c43-b56c-fd19319dcadb"} ]
</code></pre>
</div>

  返回一个数组，里面是所有可以远程调试的页面，其中包含以下字段信息：<br /> &#8211; description： 页面信息描述<br /> &#8211; devtoolsFrontendUrl：调试url地址，这个基于chrome 云服务器提供的inspector来调试，你也可以用开源的chromium中的inspector或者自己网上找下有人提取出来的调试server。<br /> &#8211; id：页面id<br /> &#8211; webSocketDebuggerUrl：android webview debug server 的 websocket， 这个地址的host和端口号是根据当前的访问tcp链接动态生成的，因为unix domain socket是没有ip地址和端口的。

## 调试方法

**基于chrome[浏览器](https://www.w3cdoc.com)调试**

其实链接手机到[浏览器](https://www.w3cdoc.com)后，只要开启了调试模式，开启了调试webview，打开[浏览器](https://www.w3cdoc.com)的下面url页面，勾选发现Discover USB devices和Discover network devices，会自动发现可调式的设备，列出可调式网页页面。

    chrome://inspect/#devices

点击列表前面的inspect，chrome会自动弹出调试窗口调试。

**基于inspector.html网页调试**

chrome[浏览器](https://www.w3cdoc.com)的调试原理其实和这个基于网页的调试是一样的。这里为了更清晰的说明原理。上面基于`adb forward`实现端口映射之后，也可以拿到webview的debug web socket。那么就可以基于这个web socket调试了。其实打开上面那个`devtoolsFrontendUrl`

就可以了，链接已经拼接好了。

    https://chrome-devtools-frontend.appspot.com/serve_rev/@a000f5daeaac3f79102a0c8f6eaab57aa0e00ae9/inspector.html?ws=localhost:9223/devtools/page/e5158e4a-d1df-4c43-b56c-fd19319dcadb",   
    "id": "e5158e4a-d1df-4c43-b56c-fd19319dcadb

其中：

* https://chrome-devtools-frontend.appspot.com/serve_rev/@a000f5daeaac3f79102a0c8f6eaab57aa0e00ae9/inspector.html是chrome云服务器托管的实现了 chrome devtools protocol （https://chromedevtools.github.io/devtools-protocol/）的调试器。chrome[浏览器](https://www.w3cdoc.com)中已经默认集成了。
* 后面的参数`ws=localhost:9223/devtools/page/e5158e4a-d1df-4c43-b56c-fd19319dcadb",<br />
"id": "e5158e4a-d1df-4c43-b56c-fd19319dcadb` `就是`webview的debug web socket，同时遵循chrome devtools protocol ，基于 JSON RPC格式和调试器互相通信

## wifi调试

<div class="bi-unstyle bi-dnd" data-key="2">
  <span data-key="3">目前主要的调试方式是safari和chrome远程调试模拟器和真机。ios下safari的调试工具其实并不太友好，可以统一采用chrome调试工具远程调试。</span>
</div>

<ol class="bi-list" start="1" data-key="4">
 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="6">
        <span class="bi-link" data-key="8"><span class="bi-link-content"><span data-key="9">remotedebug-ios-webkit-adapter （https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter）</span></span></span><span data-key="10"> 这个项目可以实现将ios的远程调试协议转为chrome远程调试协议，实现在chrome上调试真机和模拟器。</span>
      </div>
    </div>
  
 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="12">
        <span data-key="13">wifi调试，</span>
      </div>
    </div>
</ol>


 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="16">
        <span data-key="17">iphone支持connect via network的，但是貌似需要在同一子网，但是公司内网分配ip基本不在同一子网。</span>
      </div>
    </div>
  
 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="19">
        <span data-key="20">android可以采用adb over wifi 来实现，但是手机需要root才能在手机上开启(可以用下面的apk)。或者需要android手机先连上电脑，通过adb命令开启adb over tcp，然后adb连接到手机 ip:port 就可以实现无数据线调试。</span>
      </div>
    </div>

    <div data-key="19">
      <pre><code></code><code>ID=$(adb devices | awk -F'device' '{if (match($0, /device$/)) print $1}')
adb shell netcfg
IP=$(adb shell ifconfig wlan0 | awk '{if (sub(/.*ip/,"")) print $1 }')
adb tcpip 5555
adb connect $IP:5555
</code></pre>
    </div>


参考：

  1. 揭秘[浏览器](https://www.w3cdoc.com)远程调试技术：https://taobaofed.org/blog/2016/10/19/chrome-remote-debugging-technics/
  2. weex debugger： https://github.com/weexteam/weex-debugger
  3. Chrome for Android Remote Inspector 原理：https://blog.csdn.net/xxhforest/article/details/52204197
  4. [前端](https://www.w3cdoc.com)调试：https://juejin.im/post/5a921819f265da4e832684d1
  5. chrome devtools protocol viewer： https://chromedevtools.github.io/devtools-protocol/
  6. https://github.com/cyrus-and/chrome-remote-interface/blob/master/README.md
  7. Puppeteer：https://juejin.im/entry/5a3aa0e86fb9a045076fd385
  8. https://segmentfault.com/a/1190000004322742
  9. 
      远程调试协议:https://testerhome.com/topics/2047

    

 10. https://github.com/ChromeDevTools/awesome-chrome-devtools
