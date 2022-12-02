---
title: WebRTC相关的canvas与video

---

### [][1]简介

这两天公司有个项目，我打算用HTML5做个演示版本，只要是音视频方面的，所以打算采用HTML5协议规范中的WebRTC来研究，考虑到目前国产[浏览器](https://www.w3cdoc.com)大部分‘高速模式’都是用的webkit核心的[浏览器](https://www.w3cdoc.com)引擎，所以除了Chrome和Firefox[浏览器](https://www.w3cdoc.com)之外，国产的[浏览器](https://www.w3cdoc.com)像是sougou支持的都还不错。这里主要是通过WebRTC获取音频和视频流，然后通过video元素转换，经过canvas绘制成图片或者视频录制。这里主要介绍一下关于拍摄照片和美化处理的一些相关知识。其他部分，关于音频和视频的录制，后期在追加。  
<a></a>

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/</a>

### [][2]WebRTC简介

WebRTC是Google公司推出的一项通过[浏览器](https://www.w3cdoc.com)实时语音和视频通信的技术，Web Real Time Communication。他是的开发者通过javascrip接口调用音频与视频流，实现语音和图片等多媒体应用。  
WebRTC1.0 的架构如下：  
![WebRTC相关的canvas与video][3]  
谷歌做了些什么？  
a) Google面向web[浏览器](https://www.w3cdoc.com)开发者，将GIPS封装到一些Java Script APIs中，创建了WebRTC，这意味着VoIP技术将可以为百万开发者所使用。  
b) Google开源了WebRTC，将其置于宽松的BSD证书下——这使得该技术可以被重用、修改并衍化开发；使得该技术脱离了实时媒体工程师的控制。  
c) Google将该技术提交给W3C和IETF标准机构进行标准化，确保该技术成为[浏览器](https://www.w3cdoc.com)中的通用部件，并在此过程中，去除该技术中任何与Google相关部分。  
d) 它忽略了拨号层，让开发商可以在任何实时通信环境下使用WebRTC，而不必考虑是使用何种协议建立信号通信。

### [][4]WebRTC访问API

长久以来，音频/视频捕获都是网络开发中的“圣杯”。多年来，[我们](https://www.w3cdoc.com)总是依赖于[浏览器](https://www.w3cdoc.com)插件（Flash 或 Silverlight）实现这一点。  
现在轮到 HTML5 大显身手了。也许看起来不是很显眼，但是 HTML5 的崛起引发了对设备硬件访问的激增。地理位置 (GPS)、Orientation API（加速计）、WebGL(GPU) 和 Web Audio API（视频硬件）都是很好的例子。这些功能非常强大，展示了基于系统底层硬件功能之上的高级 JavaScript API。  
WebRTC提供了了一种新 API：navigator.getUserMedia()，可让网络应用访问用户的相机和麦克风。  
发展历史，参考：<a href="https://blog.csdn.net/renfufei/article/details/21168239" target="_blank" rel="external">https://blog.csdn.net/renfufei/article/details/21168239</a>  
说说这个navigator.getUserMedia()的使用，考虑到不同[浏览器](https://www.w3cdoc.com)的兼容性，代码如下：

上面代码中的{video: true,audio:false}，表示的是获取多媒体的音频和视频的开关。

### [][5]API使用详解

目前一般获取视频的都是调用前置摄像头，可能是由于前置摄像头像素低的原因，默认获取的是480p的图像。至少我的130万像素的摄像头获取的是480p。  
在博客上看到有仁兄查看源代码，有这样一段：  
<a href="https://code.ohloh.net/file?fid=6J7ryGiCNonI80xjGMKjt20p4Xk&cid=0W4KUpSYxGo&s=&fp=302915&mp&projSelected=true#L0" target="_blank" rel="external">media_stream_video_source.cc</a>

懂点c++语言的同学就能看懂，上面其实配置了一些参数，可以看到默认的获取摄像头的品质是480p。在这段代码里还有几个特别的属性minAspectRatio（最小宽比）、maxAspectRatio（最大宽高比）、maxFrameRate（最大每秒帧数）、minFrameRate（最小每秒帧数），似乎[我们](https://www.w3cdoc.com)所能想到的都已经定义了。  
于是[我们](https://www.w3cdoc.com)可以如下定义：

需要说明的是FrameRate是不生效的，AspectRatio是生效的，但设定的最大最小值一定要能取1.333333(4:3)及1.777777777(16:9)这两个值其中一个。因为video元素输出时，会认得这两个宽高比，如果计算得不出这两个比值，那你会看到一片漆黑！  
特别说明：  
上面的配置方式，经过测试，截止本文发表日期，目前最新的手机[浏览器](https://www.w3cdoc.com)Chrome或Opera都是不支持的，使用上面的配置，可以打开摄像头，但是获取不到数据。而使用以前的配置可以：

### [][6]关于摄像头的选取

MediaStreamTrack.getSources 是HTML5提供的MediaStreamTrack对象，用以跟踪多媒体的输出源。

MediaStreamTrack.getSources方法需要一个回调函数,并向该回调函数传入本机器所有的（音，视频）多媒体源。

使用代码如下：

在打印的sourceInfos数组里面的确可以看到设备流，但是上面的sourceId配置并不生效，在[浏览器](https://www.w3cdoc.com)询问是否允许摄像头设备后，依然使用的是前置或后置摄像头，这个在Chrome[浏览器](https://www.w3cdoc.com)上有的选项可以选择，手机上Opera提供前置或后置的选择。

### [][7]Video标签的使用

上面通过getUserMedia接口获取视频流之后，将该视频流传给video标签，然后在网页上就可以显示实时视频。  
代码如下：

有时候，[我们](https://www.w3cdoc.com)不想直接把video标签放在页面上，因为video标签不好控制和处理，而喜欢放置Canvas标签，html5中Canvas标签的灵活度是很高的。可以添加效果，做运算处理等。

### [][8]Canvas标签的使用

[我们](https://www.w3cdoc.com)可以采用canvas标签实时绘制捕捉到的video的每一帧图片，这样在合适的绘制帧率下，看到的效果和video的展示效果所差无几。  
代码如下：

这样[我们](https://www.w3cdoc.com)就可以把上面的video标签隐藏，直接在界面上显示canvas。  
需要说明，这种方法在手机[浏览器](https://www.w3cdoc.com)上有问题。手机[浏览器](https://www.w3cdoc.com)上chrome和opera的[浏览器](https://www.w3cdoc.com)只会显示一桢的canvas图像，之后的不会刷新，目前不知为何。但是，video标签显示的比较流畅。所以，如果是开发手机应用，还是建议使用video标签，否者还是使用canvas标签。  
用户如果想拍照，可以在页面上增加一个拍照按钮，增加点击事件，然后用canvas绘制此刻的图片即可，使用上面的代码只需要停掉定时器即可。

如果要将canvas的图片内容保存下来，可以使用：

这个imgData直接复制到img标签的src属性即可使用。

### [][9]Canvas特效处理

时间有些晚了，明天还要上班，有点困，明天再写。-2014/8/4 23:15  
今天看了一下，这一块涉及的内容还是比较多的。另开一篇专门详细介绍。  
地址：

### [][10]WebRTC关闭

在不需要使用WebRTC的地方应该关闭WebRTC以释放资源。使用方法是：

在获取stream的时候，将该视频或音频流保存起来，然后在不使用的时候，调用stop方法即可。

### [][11]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/</a>

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#简介 "简介"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#WebRTC简介 "WebRTC简介"
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/webrtc.png
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#WebRTC访问API "WebRTC访问API"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#API使用详解 "API使用详解"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#关于摄像头的选取 "关于摄像头的选取"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#Video标签的使用 "Video标签的使用"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#Canvas标签的使用 "Canvas标签的使用"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#Canvas特效处理 "Canvas特效处理"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#WebRTC关闭 "WebRTC关闭"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/08/04/2014_Html5_canvas_video/#谢谢！ "谢谢！"
