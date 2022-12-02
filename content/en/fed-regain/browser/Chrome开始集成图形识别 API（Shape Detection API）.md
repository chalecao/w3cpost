---
title: Chrome开始集成图形识别 API（Shape Detection API）

---
最近，Chrome团队尝试在Chrome中集成了一套与图形识别相关的API，使得图形识别这种以前只在原生应用中存在，或者在[浏览器](https://www.w3cdoc.com)上，要借助其他难用的外部库才能实现的功能，现在只要少量代码即可实现。这些API包括**人脸识别**，**条形码/二维码识别**和**文本识别**，基本上覆盖了当前互联网应用的大部分场景。

**现状**

图形识别这种对系统资源和设备的计算能力要求颇高的功能，通常只有底层的原生API能驾驭，流行的框架主要是开源的[Open CV][1]和各大移动平台的图形识别服务：

<table border="0" cellspacing="0" cellpadding="2">
  <tr>
    <td valign="top" width="132">
    </td>

    <td valign="top" width="132">
      <a title="Android" href="https://www.linuxidc.com/topicnews.aspx?tid=11" target="_blank" rel="noopener">Android</a>
    </td>
    
    <td valign="top" width="132">
      iOS
    </td>
    
    <td valign="top" width="132">
      Windows
    </td>
  </tr>
  <tr>
    <td valign="top" width="132">
      条形码
    </td>

    <td valign="top" width="132">
      <a href="https://developers.google.com/android/reference/com/google/android/gms/vision/barcode/package-summary">vision.barcode</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://developer.apple.com/reference/coreimage/cifacefeature?language=objc">CIFaceFeature</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://docs.microsoft.com/en-us/uwp/api/windows.devices.pointofservice.barcodescanner">BarcodeScanner</a>
    </td>
  </tr>
  <tr>
    <td valign="top" width="132">
      人脸
    </td>

    <td valign="top" width="132">
      <a href="https://developers.google.com/android/reference/com/google/android/gms/vision/face/package-summary">vision.face</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://developer.apple.com/reference/coreimage/ciqrcodefeature?language=objc">CIQRCodeFeature</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://docs.microsoft.com/en-us/uwp/api/windows.media.faceanalysis">FaceAnalysis</a>
    </td>
  </tr>
  <tr>
    <td valign="top" width="132">
      文本
    </td>

    <td valign="top" width="132">
      <a href="https://developers.google.com/android/reference/com/google/android/gms/vision/text/package-summary">vision.text</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://developer.apple.com/reference/coreimage/cidetectortypetext">CIDetectorTypeText</a>
    </td>
    
    <td valign="top" width="132">
      <a href="https://docs.microsoft.com/en-us/uwp/api/windows.media.ocr">OCR</a>
    </td>
  </tr>
</table>

而Chrome的这些API，当前还处于实验阶段，**只**集成在[Chrome Canary][2]版本中，特别是[Android版][3]更新较快。使用前还需要通过把“实验性网络平台功能”`chrome://flags/#enable-experimental-web-platform-features`设置为`Enable`来激活。

激活后，在Console控制台输入以下JavaScript代码，就能验证你的[浏览器](https://www.w3cdoc.com)是否支持相应的API了：

* `window.FaceDetector`
* `window.BarcodeDetector`
* `window.TextDetector`

如果支持，就会返回如`function FaceDetector() { [native code] }`的信息。

> Chrome Canary是Chrome的一条与其他项目并行的实验性分支，是许多前卫激进的特性的试验场，而且迭代很快，有时甚至是每日一更新，所以不出所料，也不太稳定。和其他Chrome版本一样，也可以在[Chrome Release Channels][4]上下载。

从现在公布的信息来看，以下这些场景可能得以轻松实现：

  1. 人脸识别：
      * 自动框选你家庭聚会照片里的亲戚朋友们，然后你就可以给每个人都贴标签了，不用自己逐个框选。
      * 在社交网站上注册的时候，你上传了一张照片，[浏览器](https://www.w3cdoc.com)可以帮你裁剪好最佳尺寸。
  2. 条形码识别：
      * 识别网页中的条形码/二维码，并作相应的动作，比如链接跳转，支付等等。
  3. 文本识别：
      * OCR
      * 配合语音接口，朗读图片中的文字

除此之外，开发者大可以尽情发挥想象，创造更多独一无二有趣的应用。

**社区反映**

图形识别虽然是刚需，但自去年底公布消息以来，可能是由于这些API尚处于实验阶段，尚待打磨，在开发社区内还未形成大范围的讨论，目前能收集到的主要是以下资料供开发者参考。

* [API: Accelerated Shape Detection in Images][5] &#8211; by [Miguel Casas-Sanchez (Google Inc.)][6] | [中文版][7] by [谈浩][8]
* [Face detection using Shape Detection API &#8211; by Paul Kinlan][9]

不过正因为进化迅速，这套图形识别API从去年的M57版本发展至今，已经发生了不小的变化，也许在不久的将来，就会合并到稳定版中，真正为广大开发者所用，构建更多有趣的应用。

 [1]: https://docs.opencv.org/2.4/modules/contrib/doc/facerec/facerec_tutorial.html
 [2]: https://www.google.com/chrome/browser/canary.html
 [3]: https://play.google.com/store/apps/details?id=com.chrome.canary
 [4]: https://www.chromium.org/getting-involved/dev-channel
 [5]: https://wicg.github.io/shape-detection-api/
 [6]: https://github.com/miguelao
 [7]: https://wicg.github.io/shape-detection-api/index-zh-cn.html
 [8]: https://neotan.github.io/
 [9]: https://paul.kinlan.me/face-detection/
