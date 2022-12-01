---
title: 原生lazyload、csp和deno

---
## 新奇

* Chrome 意欲实现原生自动 lazyload 功能，并支持 img 和 iframe 的 `loading="lazy"` 配置，该特性预计在 Chrome 75 中支持。[&#x1f517;][1]  
    > 点评：原生 lazyload 比起[前端](https://www.w3cdoc.com)自己实现的 lazyload，更多会考虑到网速和手速的因素，会尝试去获取图片前 2k 以获取高宽进行布局占位，详见[这篇文章][2]。

* Chrome 意欲支持 `Content-Security-Policy` 返回头中的 `report-to` 指令，此指令相对 CSP 中前身指令 `report-uri`额外支持了合并多个违规上报请求，保证消耗更少的流量和电量。此前 Edge 已经支持。[&#x1f517;][3]
* 介于多个网站利用传感器接口辅助生成访客指纹，Chrome Canary 将在站点调用传感器接口时弹出警告。此前 iOS 12.2 上的 Safari 默认禁止了这类行为。[&#x1f517;][4]
* Node.js 作者 Ryan Dahl 在 JS Fest 大会里介绍了 deno 的近况。deno 旨在解决 Node.js 中不安全、不好的 module 实现和历史包袱，希望为 JavaScript / TypeScript 提供一个更受控的脚本运行时环境，适用于诸如 Map Reduce 和 Serveless 形态的场景。目前 deno 启动时间比 Node.js 快 3 倍，但 I/O 时间还不太理想。deno 将在今年夏天发布 1.0 版本，届时将支持代码并行加载、TLS/SSL、远程模块的 lockfile 和调试功能。[&#x1f517;][5]  
    > 点评：I deno about all this

* Microsoft Build 于 5 月 6 日开始举办，第一天[前端](https://www.w3cdoc.com)的重磅消息是：[React Native on Windows][6]。[&#x1f517;][7] > 点评：各位观众，React Native 又喘气了！它会醒吗，让[我们](https://www.w3cdoc.com)拭目以待！哦你说还官宣了 Edge 吗？那个不是很重要了
* Facebook 年度开发者大会 F8 已于 5 月 1 日完成举行，会上涉及[前端](https://www.w3cdoc.com)的演讲有：[使用 React、GraphQL 和 Relay 构建新的 Facebook][8]、[React Native 的新架构][9]、[FBT：Facebook 如何大规模应用多语言功能][10]、[Web XR 的未来][11]。[&#x1f517;][12] > 点评：看完视频的感想，RN 大规模重构和稳定支持的消息是个定心丸，Facebook 的[前端](https://www.w3cdoc.com)基础建设还是很超前的
* 苹果主导的 Intelligent Tracking Prevention 2.2 发布，挂载在 iOS 12.3 beta 上。新版本中，当一个域名被认定具备跨站请求追踪的能力，且该域名导向的页面带有 query string 或 hash 时，使用 `document.cookie` 进行持久化 cookie 设置，该 cookie 只会被保留 1 天。[&#x1f517;][13]  
    > 点评：翻译一下就是，只要算法认为你有跨站请求追踪的能力，用 clickId + cookie 追踪用户就只有一天有效期

* Chrome 76 即将支持 `Promise.allSettled` API，它的行为类似于 `Promise.all`，但不会在任意一个 Promise 被 reject 的时候短路，而会等待所有的 Promise 完成之后再执行 then 回调。[&#x1f517;][14]
* Firefox 67 发布，支持了 [FIDO U2F API][15]，支持了 `String.prototype.matchAll` 和动态模块加载 API `import('/my-module.js').then()`，支持了 CSS 中的 `word-break: break-word`、`revert` 、`@media` 中的 `prefers-color-scheme`，Service Worker 可以 debug 了，允许对用户追踪脚本和静默挖矿行为进行阻拦，提升了[浏览器](https://www.w3cdoc.com)级别功能的可访问性，此外，还进行了大量性能优化：页面加载过程中降低 `setTimeout` 的优先级、页面加载过程中更早绘制、将不使用的标签页暂停、内嵌了高性能 AV1 解码器 dav1d 等等。[&#x1f517;][16]

> 点评：超级丰富的一个版本更新

* Chrome 75 起将支持 [Web Share API Level 2][17]，在 Level 1 支持分享文字和 url 到 Web App 的基础上，额外支持了分享图片、音频、视频和文件。[&#x1f517;][18]
* Edge 发布了 macOS 预览版，针对 Touch Bar 进行了浏览体验的增强。[&#x1f517;][19]

&nbsp;

## 百宝箱 {#1}

* [MDX][20] 是支持使用 JSX 和 markdown 混合编写文档的格式。
* [react-three-fiber][21] 是一个 Three.js 在 React 上渲染的工具，可以用 React 组件语法完成 WebGL 渲染。
* [Formal][22] 是一个 React Hooks 版本的 rc-form，集成了 React 表单组件通用的的非受控值缓存、值校验等功能。
* React Redux 7.0.0 正式版完成发布，使用 React Hooks 重写了 `connect` 方法，并让 Component 直接监听 store 变化以修正 React Redux 6.x 引入的性能问题，同时，新版本支持了 batch 接口以合并多个不同的 dispatch。[&#x1f517;][23]  
    > 点评：useRedux 接口还没有实现

* 带有完善工具链的 WebGL 渲染工具 [babylon.js][24] 4.0 发布，支持了虚拟场景视图、逼真渲染功能如透明包装、各向异性、光泽与次表面散射，追加了新物理引擎的支持。[&#x1f517;][25] > 点评：巨硬牛逼！【破音
* [create-react-app 3.0][26] 发布，支持了 React Hooks 的代码风格校验、TypeScript lint、Jest 24。[&#x1f517;][26]
* Node.js 端的 websocket 库 [ws][27] 发布了第 7 个大版本，主要改变了 readyState 不为 OPEN 时 `ping()`、`pong()`、`send()` 的行为，停止支持了  Node.js v6。[&#x1f517;][27]

* 兼顾高效与灵活的 WegGL 2D 渲染库 [pixi.js][28] 发布了第五个大版本更新。新版支持 shader 按分辨率加载，支持子模块按需加载，默认支持了 IE 11，并更新了大量依赖库。[&#x1f517;][29]
* 随着站点的复杂度与日俱增，JavaScript 代码的冷启动时间也在逐步增加。为了压缩 JavaScript 冷启动过程中的编译与字节码生成时间，TC39 提出了 [Binary AST 提案][30]，旨在让网站可以直接交付 AST 代码到[浏览器](https://www.w3cdoc.com)端。Cloudflare 近期开源了他们生成 Binary AST 的 [binjs-ref][31] 方案，可在 Firefox Nightly 中打开相应的配置进行测试，官方测试中可降低多达 97% 的冷启动时间。[&#x1f517;][32]
* Node.js 12.3.0 发布，实验性支持了 WebAssembly 模块，TLSSocket 暴露了 `keylog` 事件，支持了 `Readable.from` 以将异步迭代器转化为 stream。[&#x1f517;][33]

<p id="GLVFPQY">
  <img loading="lazy" width="494" height="241" class="alignnone size-full wp-image-4876 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d40f1c8e037a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d40f1c8e037a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d40f1c8e037a.png?x-oss-process=image/format,webp 494w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d40f1c8e037a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_146/format,webp 300w" sizes="(max-width: 494px) 100vw, 494px" />
</p>

> 点评：猜猜上面代码会打印什么？

 [1]: https://chromestatus.com/feature/5645767347798016
 [2]: https://addyosmani.com/blog/lazy-loading/
 [3]: https://chromestatus.com/feature/5826576096690176
 [4]: https://twitter.com/ow/status/1115564247726153728
 [5]: https://www.youtube.com/watch?v=z6JRlx5NC9E
 [6]: https://github.com/microsoft/react-native-windows
 [7]: https://mybuild.techcommunity.microsoft.com/home#top-anchor
 [8]: https://developers.facebook.com/videos/2019/building-the-new-facebookcom-with-react-graphql-and-relay/
 [9]: https://www.youtube.com/watch?v=UcqRXTriUVI
 [10]: https://developers.facebook.com/videos/2019/i18n-at-facebook-scale-fbt/
 [11]: https://developers.facebook.com/videos/2019/unlocking-the-future-of-webxr/
 [12]: https://www.f8.com/
 [13]: https://webkit.org/blog/8828/intelligent-tracking-prevention-2-2/
 [14]: https://www.chromestatus.com/feature/5547381053456384
 [15]: https://blog.mozilla.org/security/2019/04/04/shipping-fido-u2f-api-support-in-firefox/
 [16]: https://www.mozilla.org/en-US/firefox/67.0/releasenotes/
 [17]: http://wicg.github.io/web-share/demos/share-files.html
 [18]: https://www.chromestatus.com/feature/4777349178458112
 [19]: https://blogs.windows.com/msedgedev/2019/05/20/microsoft-edge-macos-canary-preview/
 [20]: https://mdxjs.com/blog/v1/
 [21]: https://github.com/drcmda/react-three-fiber
 [22]: https://github.com/kevinwolfcr/formal/tree/master/packages/formal-web
 [23]: https://github.com/reduxjs/react-redux/releases
 [24]: https://www.babylonjs.com/
 [25]: https://blogs.windows.com/buildingapps/2019/04/30/babylon-js-4-0-is-here/
 [26]: https://github.com/facebook/create-react-app/releases/tag/v3.0.0
 [27]: https://github.com/websockets/ws/releases/tag/7.0.0
 [28]: https://github.com/pixijs/pixi.js
 [29]: https://github.com/pixijs/pixi.js/releases
 [30]: https://tc39.github.io/proposal-binary-ast/
 [31]: https://github.com/binast/binjs-ref
 [32]: https://blog.cloudflare.com/binary-ast/
 [33]: https://nodejs.org/en/blog/release/v12.3.0/
