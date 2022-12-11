---
title: Sketch怎么开发插件



---
Sketch 是非常流行的 UI 设计工具，2014年随着 Sketch V43 版本增加 Symbols 功能、开放开发者权限，吸引了大批开发者的关注。

目前 Sketch 开发有两大热门课题：① <a href="https://github.com/airbnb/react-sketchapp" target="_blank" rel="noopener noreferrer">React 组件渲染成 sketch</a> 由 airbnb 团队发起，② 使用 <a href="https://github.com/skpm/skpm" target="_blank" rel="noopener noreferrer">skpm</a> 构建开发 Sketch 插件。

Sketch 插件开发相关资料较少且不太完善，[我们](https://www.w3cdoc.com)开发插件过程中可以重点参考官方文档，只是有些陈旧。官方有提供 JavaScript API 借助 CocoaScript bridge 访问内部 Sketch API 和 macOS 框架进行开发插件（Sketch 53~56 版 JS API 在 native MacOS 和 Sketch API 暴露的<a href="https://developer.sketchapp.boltdoggy.com/guides/cocoascript/" target="_blank" rel="noopener noreferrer">特殊环境</a>中运行），提供的底层 API 功能有些薄弱，更深入的就需要了解掌握 <a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html" target="_blank" rel="noopener noreferrer">Objective-C</a> 、 <a href="http://link.zhihu.com/?target=https%3A//github.com/ccgus/CocoaScrip" target="_blank" rel="noopener noreferrer">CocoaScript</a> 、<a href="https://developer.apple.com/documentation/appkit" target="_blank" rel="noopener noreferrer">AppKit</a>、<a href="https://link.jianshu.com/?t=https://github.com/abynim/Sketch-Headers" target="_blank" rel="noopener noreferrer">Sketch-Headers</a>。

## Sketch 插件结构 {#Sketch-插件结构.post-heading}

Sketch Plugin 是一个或多个 **scripts** 的集合，每个 script 定义一个或多个 **commands**。Sketch Plugin 是以 `.sketchplugin` 扩展名的文件夹，包含文件和子文件夹。严格来说，Plugin 实际上是 <a href="https://developer.apple.com/library/mac/documentation/CoreFoundation/Conceptual/CFBundles/DocumentPackages/DocumentPackages.html#//apple_ref/doc/uid/10000123i-CH106-SW1" target="_blank" rel="noopener noreferrer">OS X package</a>，用作为 <a href="https://developer.apple.com/library/mac/documentation/CoreFoundation/Conceptual/CFBundles/AboutBundles/AboutBundles.html#//apple_ref/doc/uid/10000123i-CH100-SW1" target="_blank" rel="noopener noreferrer">OS X bundle</a>。

Bundle 具有标准化分层结构的目录，其保存可执行代码和该代码使用的资源。

### Plugin Bundle 文件夹结构 {#Plugin-Bundle-文件夹结构.post-heading}

Bundles 包含一个 `manifest.json` 文件，一个或多个 **scripts** 文件（包含用 CocoaScript 或 JavaScript 编写的脚本），它实现了 Plugins 菜单中显示的命令，以及任意数量的共享库脚本和资源文件。<figure class="highlight stylus">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
```
    </td>

    <td class="code">
      ```
mrwalker.sketchplugin
  Contents/
    Sketch/
      manifest.json
      shared.js
      Select Circles.cocoascript
      Select Rectangles.cocoascript
    Resources/
      Screenshot.png
      Icon.png
```
    </td>
  </tr>
</table></figure>

最关键的文件是 `manifest.json` 文件，提供有关插件的信息。

> 小贴士：
>
> Sketch 插件包可以使用 <a href="https://skpm.io/" target="_blank" rel="noopener noreferrer">skpm</a> 在构建过程中生成，skpm 提供 Sketch 官方插件模版:
>
> * <a href="https://github.com/skpm/skpm/tree/master/template" target="_blank" rel="noopener noreferrer">skpm/skpm</a> - The simplest possible plugin setup. (_default_)
> * <a href="https://github.com/skpm/with-prettier" target="_blank" rel="noopener noreferrer">skpm/with-prettier</a> - A plugin setup featuring linting with ESLint and code formatting with Prettier.
> * <a href="https://github.com/skpm/with-datasupplier" target="_blank" rel="noopener noreferrer">skpm/with-datasupplier</a> - A template to create DataSupplier plugins (check <a href="https://blog.sketchapp.com/do-more-with-data-2b765e870e4f" target="_blank" rel="noopener noreferrer">our blog</a> for more info)
> * <a href="https://github.com/skpm/with-webview" target="_blank" rel="noopener noreferrer">skpm/with-webview</a> - A template to create plugins displaying some rich UI in a WebView (check <a href="https://github.com/skpm/sketch-module-web-view" target="_blank" rel="noopener noreferrer">sketch-module-web-view</a> for more info)
>
> &#x1f481; Tip: Any Github repo with a ‘template’ folder can be used as a custom template:
>
> `skpm create <project-name> --template=<username>/<repository>`

### Manifest {#Manifest.post-heading}

`manifest.json` 文件提供有关插件的信息，例如作者，描述，图标、从何处获取最新更新、定义的命令 **(commands）**、调用菜单项 **(menu)** 以及资源的元数据。<figure class="highlight json">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
```
    </td>

    <td class="code">
      ```
{
  "name": "Select Shapes",
  "description": "Plugins to select and deselect shapes",
  "author": "Joe Bloggs",
  "homepage": "https://github.com/example/sketchplugins",
  "version": "1.0",
  "identifier": "com.example.sketch.shape-plugins",
  "appcast": "https://excellent.sketchplugin.com/excellent-plugin-appcast.xml",
  "compatibleVersion": "3",
  "bundleVersion": 1,
  "commands": [
    {
      "name": "All",
      "identifier": "all",
      "shortcut": "ctrl shift a",
      "script": "shared.js",
      "handler": "selectAll"
    },
    {
      "name": "Circles",
      "identifier": "circles",
      "script": "Select Circles.cocoascript"
    },
    {
      "name": "Rectangles",
      "identifier": "rectangles",
      "script": "Select Rectangles.cocoascript"
    }
  ],
  "menu": {
    "items": ["all", "circles", "rectangles"]
  }
}
```
    </td>
  </tr>
</table></figure>

### Commands {#Commands.post-heading}

声明一组 command 的信息，每个 command 以 `Dictionary` 数据结构形式存在。

* script : 实现命令功能的函数所在的脚本
* handler : 函数名，该函数实现命令的功能。Sketch 在调用该函数时，会传入 `context` 上下文参数。若未指定 handler，Sketch 会默认调用对应 script 中 `onRun` 函数
* shortcut：命令的快捷键
* name：显示在 Sketch Plugin 菜单中
* identifier : 唯一标识，建议用 `com.xxxx.xxx` 格式，不要过长

### Menu {#Menu.post-heading}

Sketch 加载插件会根据指定的信息，在菜单栏中有序显示命令名。

在了解了 Sketch 插件结构之后，[我们](https://www.w3cdoc.com)再来了解一下，sketch提供的官方 API： Actions API， Javascript API。

## Sketch Actions API {#Sketch-Actions-API.post-heading}

Sketch Actions API 用于监听用户操作行为而触发事件，例如 OpenDocumen（打开文档）、CloseDocument（关闭文档）、Shutdown（关闭插件）、TextChanged（文本变化）等，具体详见官网：<a href="https://developer.sketch.com/reference/action/" target="_blank" rel="noopener noreferrer">https://developer.sketch.com/reference/action/</a>

* register Actions

manifest.json 文件，配置相应 handlers。

示例：当 OpenDocument 事件被触发时调用 onOpenDocument handler 。<figure class="highlight javascript">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
```
    </td>

    <td class="code">
      ```
"commands" : [
  ...
  {
    "script" : "my-action-listener.js",
    "name" : "My Action Listener",
    "handlers" : {
      "actions": {
        "OpenDocument": "onOpenDocument"
      }
    },
    "identifier" : "my-action-listener-identifier"
  }
  ...
],
```
    </td>
  </tr>
</table></figure>

**my-action-listener.js**<figure class="highlight javascript">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
```
    </td>

    <td class="code">
      ```
export function onOpenDocument(context) {       
  context.actionContext.document.showMessage('Document Opened')
}
```
    </td>
  </tr>
</table></figure>

* Action Context

Action 事件触发时会将 `context.actionContext` 传递给相应 `handler`。注意有些 Action 包含两个状态`begin` 和 `finish`，例如 `SelectionChanged`，需分别订阅 `SelectionChanged.begin` 和 `SelectionChanged.finish`，否则会触发两次事件。

## Sketch JS API {#Sketch-JS-API.post-heading}

Sketch 插件开发大概有如下三种方式：① 纯使用 CocoaScript 脚本进行开发，② 通过 Javascript + CocoaScript 的混合开发模式， ③ 通过 AppKit + Objective-C 进行开发。Sketch 官方建议使用 JavaScript API 编写 Sketch 插件，且官方针对 Sketch Native API 封装了一套 <a href="https://developer.sketch.com/reference/api/" target="_blank" rel="noopener noreferrer">JS API</a>，目前还未涵盖所有场景， 若需要更丰富的底层 API 需结合 CocoaScript 进行实现。通过 <a href="https://developer.sketch.com/reference/api/" target="_blank" rel="noopener noreferrer">JS API</a> 可以很方便的对 Sketch 中 `Document`、`Artboard`、`Group`、`Layer` 进行相关操作以及导入导出等，可能需要考虑兼容性，<a href="https://developer.sketch.com/reference/api/" target="_blank" rel="noopener noreferrer"> JS API</a> 原理图如下：

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/api-reference.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/api-reference.png?x-oss-process=image/format,webp" alt="api-reference" />

### CocoaScript {#CocoaScript.post-heading}

<a href="https://github.com/ccgus/CocoaScript" target="_blank" rel="noopener noreferrer">CocoaScript</a> 实现 JavaScript 运行环境到 Objective-C 运行时的桥接功能，可通过桥接器编写 JavaScript 外部脚本访问内部 Sketch API 和 macOS 框架底层丰富的 API 功能。

> 小贴士：
>
> <a href="https://github.com/logancollins/Mocha" target="_blank" rel="noopener noreferrer">Mocha</a> 实现提供 JavaScript 运行环境到 Objective-C 运行时的桥接功能已包含在CocoaScript中。
>
> CocoaScript 建立在 Apple 的 JavaScriptCore 之上，而 JavaScriptCore 是为 Safari 提供支持的 JavaScript 引擎，使用 CocoaScript 编写代码实际上就是在编写 JavaScript。CocoaScript 包括桥接器，可以从 JavaScript 访问 Apple 的 Cocoa 框架。

借助 CocoaScript 使用 JavaScript 调 Objective-C 语法:

* 方法调用用 ‘.’ 语法
* Objective-C 属性设置
  * Getter: `object.name()`
  * Setter: `object.setName('Sketch')`，`object.name='sketch'`
* 参数都放在 ‘ ( ) ’ 里
* Objective-C 中 ‘ : ‘（参数与函数名分割符） 转换为 ‘ _ ‘，最后一个下划线是可选的
* 返回值，JavaScript 统一用 `var/const/let` 设置类型

> 注意：详细 Objective-C to JavaScript 请参考 <a href="https://github.com/logancollins/Mocha" target="_blank" rel="noopener noreferrer">Mocha 文档</a>

示例:<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
```
    </td>

    <td class="code">
      ```
// oc: MSPlugin 的接口 valueForKey:onLayer:
NSString * value = [command valueForKey:kAutoresizingMask onLayer:currentLayer];

// cocoascript:
const value = command.valueForKey_onLayer(kAutoresizingMask, currentLayer);

// oc:
const app = [NSApplication sharedApplication];
[app displayDialog:msg withTitle:title];

// cocoascript:
const app = NSApplication.sharedApplication();
app.displayDialog_withTitle(msg, title)

// oc:
const openPanel = [NSOpenPanel openPanel]
[openPanel setTitle: "Choose a location…"]
[openPanel setPrompt: "Export"];

// cocoascript:
const openPanel = NSOpenPanel.openPanel
openPanel.setTitle("Choose a location…")
openPanel.setPrompt("Export")
```
    </td>
  </tr>
</table></figure>

### **Objective-C Classes** {#Objective-C-Classes.post-heading}

Sketch 插件系统可以完全访问应用程序的内部结构和 macOS 中的核心框架。Sketch 是用 Objective-C 构建的，其 Objective-C 类通过 Bridge (CocoaScript/mocha) 提供 Javascript API 调用，简单的了解 Sketch 暴露的相关类以及类方法，对[我们](https://www.w3cdoc.com)开发插件非常有帮助。

使用 Bridge 定义的一些内省方法来访问以下信息：<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
```
    </td>

    <td class="code">
      ```
String(context.document.class()) // MSDocument

const mocha = context.document.class().mocha()

mocha.properties() // array of MSDocument specific properties defined on a MSDocument instance
mocha.propertiesWithAncestors() // array of all the properties defined on a MSDocument instance

mocha.instanceMethods() // array of methods defined on a MSDocument instance
mocha.instanceMethodsWithAncestors()

mocha.classMethods() // array of methods defined on the MSDocument class
mocha.classMethodsWithAncestors()

mocha.protocols() // array of protocols the MSDocument class inherits from
mocha.protocolsWithAncestors()
```
    </td>
  </tr>
</table></figure>

### Context {#Context.post-heading}

当输入插件定制的命令时，Sketch 会去寻找改命令对应的实现函数， 并传入 `context` 变量。`context`包含以下变量：

* **command**: <a href="https://link.jianshu.com/?t=http://developer.sketchapp.com/reference/MSPluginCommand/" target="_blank" rel="noopener noreferrer">MSPluginCommand</a> 对象，当前执行命令
* **document**: <a href="https://link.jianshu.com/?t=http://developer.sketchapp.com/reference/MSDocument/" target="_blank" rel="noopener noreferrer">MSDocument</a> 对象 ，当前文档
* **plugin**: <a href="https://link.jianshu.com/?t=http://developer.sketchapp.com/reference/MSPluginBundle/" target="_blank" rel="noopener noreferrer">MSPluginBundle</a> 对象，当前的插件 bundle，包含当前运行的脚本
* **scriptPath**: `NSString` 当前执行脚本的绝对路径
* **scriptURL**: 当前执行脚本的绝对路径，跟 **scriptPath**不同的是它是个 `NSURL` 对象
* **selection**: 一个 `NSArray` 对象，包含了当前选择的所有图层。数组中的每一个元素都是 <a href="https://link.jianshu.com/?t=http://developer.sketchapp.com/reference/MSLayer/" target="_blank" rel="noopener noreferrer">MSLayer</a> 对象

> 小贴士：MS 打头类名为 Sketch 封装类如图层基类 [MSLayer][1])、文本层基类 [MSTextLayer][2]) 、位图层基类 <a href="https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSBitmapLayer.h" target="_blank" rel="noopener noreferrer">MSBitmapLayer</a>，NS 打头为 AppKit 中含有的类<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
```
    </td>

    <td class="code">
      ```
const app = NSApplication.sharedApplication()

function initContext(context) {
  context.document.showMessage('初始执行脚本')
    const doc = context.document
    const page = doc.currentPage()
    const artboards = page.artboards()
    const selectedArtboard = page.currentArtboard() // 当前被选择的画板

    const plugin = context.plugin
    const command = context.command
    const scriptPath = context.scriptPath
    const scriptURL = context.scriptURL
    const selection = context.selection // 被选择的图层
}
```
    </td>
  </tr>
</table></figure>

## Sketch 插件开发上手 {#Sketch-插件开发上手.post-heading}

前面[我们](https://www.w3cdoc.com)了解了许多 Sketch 插件开发知识，那接下来实际上手两个小例子： **① 创建辅助内容面板窗口**， ② **侧边栏导航**。为了方便开发，[我们](https://www.w3cdoc.com)在开发前需先进行如下操作：

**崩溃保护**

当 Sketch 运行发生崩溃，它会停用所有插件以避免循环崩溃。对于使用者，每次崩溃重启后手动在菜单栏启用所需插件非常繁琐。因此可以通过如下命令禁用该特性。<figure class="highlight bash">

<table>
  <tr>
    <td class="gutter">
      ```
1
```
    </td>

    <td class="code">
      ```
defaults write com.bohemiancoding.sketch3 disableAutomaticSafeMode true
```
    </td>
  </tr>
</table></figure>

**插件缓存**

通过配置启用或禁用缓存机制：<figure class="highlight bash">

<table>
  <tr>
    <td class="gutter">
      ```
1
```
    </td>

    <td class="code">
      ```
defaults write com.bohemiancoding.sketch3 AlwaysReloadScript -bool YES
```
    </td>
  </tr>
</table></figure>

该方法对于某些场景并不适用，如设置 `COScript.currentCOScript().setShouldKeepAround(true)` 区块会保持常驻在内存，那么则需要通过 `coscript.setShouldKeepAround(false)` 进行释放。

**WebView 调试**

如果插件实现方案使用 WebView 做界面，可通过以下配置开启调试功能。<figure class="highlight bash">

<table>
  <tr>
    <td class="gutter">
      ```
1
```
    </td>

    <td class="code">
      ```
defaults write com.bohemiancoding.sketch3 WebKitDeveloperExtras -bool YES
```
    </td>
  </tr>
</table></figure>

#### 创建辅助内容面板窗口 {#创建辅助内容面板窗口.post-heading}

首先[我们](https://www.w3cdoc.com)先熟悉一下 macOS 下的辅助内容面板， 如下图最左侧 NSPanel 样例， 它是有展示区域，可设置样式效果，左上角有可操作按钮的辅助窗口。

Sketch 中要创建如下内容面板，需要使用 macOS 下 `AppKit` 框架中 `NSPanel` 类，它是 `NSWindow` 的子类，用于创建辅助窗口。内容面板外观样式设置，可通过 `NSPanel` 类相关属性进行设置， 也可通过 `AppKit` 的`NSVisualEffectView` 类添加模糊的背景效果。内容区域则可通过 `AppKit` 的 `WKWebView` 类，单开 `webview` 渲染网页内容展示。

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/nspanel.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/nspanel.png?x-oss-process=image/format,webp" alt="console" />

* 创建 Panel<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
```
    </td>

    <td class="code">
      ```
const panelWidth = 80;
const panelHeight = 240;

// Create the panel and set its appearance
const panel = NSPanel.alloc().init();
panel.setFrame_display(NSMakeRect(, , panelWidth, panelHeight), true);
panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
panel.setBackgroundColor(NSColor.whiteColor());

// Set the panel's title and title bar appearance
panel.title = "";
panel.titlebarAppearsTransparent = true;

// Center and focus the panel
panel.center();
panel.makeKeyAndOrderFront(null);
panel.setLevel(NSFloatingWindowLevel);

// Make the plugin's code stick around (since it's a floating panel)
COScript.currentCOScript().setShouldKeepAround(true);

// Hide the Minimize and Zoom button
panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
```
    </td>
  </tr>
</table></figure>

* Panel 添加模糊的背景<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
```
    </td>

    <td class="code">
      ```
// Create the blurred background
const vibrancy = NSVisualEffectView.alloc().initWithFrame(NSMakeRect(, , panelWidth, panelHeight));
vibrancy.setAppearance(NSAppearance.appearanceNamed(NSAppearanceNameVibrantLight));
vibrancy.setBlendingMode(NSVisualEffectBlendingModeBehindWindow);

// Add it to the panel
panel.contentView().addSubview(vibrancy);
```
    </td>
  </tr>
</table></figure>

* Panel 插入 `webview` 渲染<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
```
    </td>

    <td class="code">
      ```
const wkwebviewConfig = WKWebViewConfiguration.alloc().init()
const webView = WKWebView.alloc().initWithFrame_configuration(
  CGRectMake(, , panelWidth, panelWidth),
  wkwebviewConfig
)

// Add it to the panel
panel.contentView().addSubview(webView);

// load file URL
webview.loadFileURL_allowingReadAccessToURL(
  NSURL.URLWithString(url),
  NSURL.URLWithString('file:///')
)
```
    </td>
  </tr>
</table></figure>

#### 侧边栏导航开发 {#侧边栏导航开发.post-heading}

[我们](https://www.w3cdoc.com)开发复杂的 Sketch 插件，一般都要开发侧边栏导航展示插件功能按钮，点击触发相关操作。那开发侧边栏导航，[我们](https://www.w3cdoc.com)主要使用 `AppKit` 中的那些类呢，有 `NSStackView` 、 `NSBox` 、`NSImage`、 `NSImageView`、`NSButton` 等，大致核心代码如下：<figure class="highlight js">

<table>
  <tr>
    <td class="gutter">
      ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
```
    </td>

    <td class="code">
      ```
 // create toolbar
 const toolbar = NSStackView.alloc().initWithFrame(NSMakeRect(, , 40, 400))
 threadDictionary[SidePanelIdentifier] = toolbar
 toolbar.identifier = SidePanelIdentifier
 toolbar.setSpacing(8)
 toolbar.setFlipped(true)
 toolbar.setBackgroundColor(NSColor.windowBackgroundColor())
 toolbar.orientation = 1

 // add element
 toolbar.addView_inGravity(createImageView(NSMakeRect(, , 40, 22), 'transparent', NSMakeSize(40, 22)), 1)
 const Logo = createImageView(NSMakeRect(, , 40, 30), 'logo', NSMakeSize(40, 28))
 toolbar.addSubview(Logo)

 const contentView = context.document.documentWindow().contentView()
 const stageView = contentView.subviews().objectAtIndex()

 const views = stageView.subviews()
 const existId = views.find(d => ''.concat(d.identifier()) === identifier)

 const finalViews = []

 for (let i = ; i < views.count(); i++) {
   const view = views[i]
   if (existId) {
     if (''.concat(view.identifier()) !== identifier) finalViews.push(view)
   } else {
     finalViews.push(view)
     if (''.concat(view.identifier()) === 'view_canvas') {
       finalViews.push(toolbar)
     }
   }
 }

// add to main Window
 stageView.subviews = finalViews
 stageView.adjustSubviews()
```
    </td>
  </tr>
</table></figure>

详细见开源代码： <a href="https://github.com/o2team/sketch-plugin-boilerplate" target="_blank" rel="noopener noreferrer">https://github.com/o2team/sketch-plugin-boilerplate</a> （欢迎 star 交流）

## 调试 {#调试.post-heading}

当插件运行时，Sketch 将会创建一个与其关联的 JavaScript 上下文，可以使用 Safari 来调试该上下文。

在 Safari 中, 打开 `Developer` > _你的机器名称_ > `Automatically Show Web Inspector for JSContexts`，同时启用选项 `Automatically Pause Connecting to JSContext`，否则检查器将在可以交互之前关闭（当脚本运行完时上下文会被销毁）。

现在就可以在代码中使用断点了，也可以在运行时检查变量的值等等。

## 日志 {#日志.post-heading}

JavaScriptCore <a href="https://developer.sketchapp.com/guides/cocoascript/" target="_blank" rel="noopener noreferrer">运行 Sketch 插件的环境</a> 也有提供类似调试 JavaScript 代码打 log 的方式，[我们](https://www.w3cdoc.com)可以在关键步骤处放入一堆 `console.log/console.error` 等进行落点日志查看。

有以下几种选择可以查看日志：

* 打开 Console.app 并查找 Sketch 日志
* 查看 `~/Library/Logs/com.bohemiancoding.sketch3/Plugin Output.log` 文件
* 运行 `skpm log` 命令，该命令可以输出上面的文件（执行 `skpm log -f` 可以流式地输出日志）
* 使用 skpm 开发的插件，安装 <a href="https://github.com/skpm/sketch-dev-tools" target="_blank" rel="noopener noreferrer">sketch-dev-tools</a>，使用 `console.log` 打日志查看。
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/sketch-console.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/11/sketch-console.png?x-oss-process=image/format,webp" alt="console" />  

## SketchTool {#SketchTool.post-heading}

    SketchTool 包含在 Sketch 中的 CLI 工具，通过 SketchTool 可对 Sketch 文档执行相关操作：

* <a href="https://developer.sketch.com/cli/export-assets" target="_blank" rel="noopener noreferrer">导出 artboards、layers、slices、pages、交互稿</a>
* <a href="https://developer.sketch.com/cli/inspect-document" target="_blank" rel="noopener noreferrer">检查 Sketch 文档</a>
* <a href="https://developer.sketch.com/cli/dump" target="_blank" rel="noopener noreferrer">导出 Sketch 文档 JSON data</a>
* <a href="https://developer.sketch.com/cli/run-plugin" target="_blank" rel="noopener noreferrer">Run plugins</a>

    sketchtool 二进制文件位于 Sketch 应用程序包中：<figure class="highlight awk">

    <table>
      <tr>
        <td class="gutter">
          ```
1
```
        </td>

        <td class="code">
          ```
Sketch.app/Contents/Resources/sketchtool/bin/sketchtool
```
        </td>
      </tr>
    </table></figure>

    设置 `alias` ：<figure class="highlight bash">

    <table>
      <tr>
        <td class="gutter">
          ```
1
```
        </td>

        <td class="code">
          ```
alias sketchtool="/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool"
```
        </td>
      </tr>
    </table></figure>

    使用：<figure class="highlight bash">

    <table>
      <tr>
        <td class="gutter">
          ```
1

2
3
4
5
```
        </td>

        <td class="code">
          ```
sketchtool -h  # 查看帮助
sketchtool export artboards path/to/document.sketch  # 导出画板
sketchtool dump path/to/document.sketch # 导出 Sketch 文档 JSON data
sketchtool metadata path/to/document.sketch # 查看 Sketch 文档元数据
sketchtool run [Plugin path] # 运行插件
```
        </td>
      </tr>
    </table></figure>

    `注意`：SketchTool 需要 OSX 10.11或更高版本。
    
    ## Other Resources {#Other-Resources.post-heading}
    
    <a href="https://developer.sketch.com/plugins/" target="_blank" rel="noopener noreferrer">sketch Plugin 开发官方文档</a>
    
    <a href="https://developer.sketchapp.boltdoggy.com/" target="_blank" rel="noopener noreferrer">sketch插件开发中文文档</a>
    
    <a href="https://www.sketch.com/docs/" target="_blank" rel="noopener noreferrer">sketch 使用文档</a>
    
    <a href="https://github.com/skpm/sketch-utils" target="_blank" rel="noopener noreferrer">sketch-utils</a>
    
    <a href="https://developer.sketch.com/reference/api/" target="_blank" rel="noopener noreferrer">sketch reference api</a>
    
    <a href="https://github.com/BohemianCoding/SketchAPI" target="_blank" rel="noopener noreferrer">Github SketchAPI</a>
    
    <a href="https://github.com/airbnb/react-sketchapp" target="_blank" rel="noopener noreferrer">react-sketchapp</a>
    
    <a href="https://github.com/turbobabr/Sketch-Plugins-Cookbook" target="_blank" rel="noopener noreferrer">Sketch-Plugins-Cookbook</a>
    
    <a href="https://github.com/qinjx/30min_guides/blob/master/ios.md" target="_blank" rel="noopener noreferrer">iOS开发60分钟入门</a>
    
    <a href="https://developer.apple.com/documentation/appkit?language=objc" target="_blank" rel="noopener noreferrer">AppKit, 构建 Sketch 的一个主要 Apple 框架</a>
    
    <a href="https://developer.apple.com/documentation/foundation?language=objc" target="_blank" rel="noopener noreferrer">Foundation(基础), 更重要的 Apple 课程和服务</a>
    
    <a href="http://eon.codes/blog/2016/01/23/Chromeless-window/" target="_blank" rel="noopener noreferrer">Chromeless-window</a>

 [1]: https://aotu.io/notes/2019/10/31/sketch-plugin/[https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSLayer.h](https://link.jianshu.com/?t=https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSLayer.h
 [2]: https://aotu.io/notes/2019/10/31/sketch-plugin/[https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSTextLayer.h](https://link.jianshu.com/?t=https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSTextLayer.h
