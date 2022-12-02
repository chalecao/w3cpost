---
title: chrome插件开发

---
## 一些资源

chrome extensions 中的通信交互：<https://www.cnblogs.com/experiments-of-ORLAN/p/3736511.html>


  Chrome[浏览器](https://www.w3cdoc.com)扩展开发系列之十三：消息传递Message：<a href="https://www.cnblogs.com/champagne/p/4848520.html">https://www.cnblogs.com/champagne/p/4848520.html</a>

Where to read console messages from background.js in a Chrome extension?：

<https://stackoverflow.com/questions/10257301/where-to-read-console-messages-from-background-js-in-a-chrome-extension>

Chrome扩展开发常见问题汇总：<https://www.cnblogs.com/slmk/archive/2012/11/16/2772985.html>


  Chrome插件开发进阶：<a href="https://blog.csdn.net/my_business/article/details/7711525">https://blog.csdn.net/my_business/article/details/7711525</a>


  Chrome[浏览器](https://www.w3cdoc.com)扩展开发系列之十二：Content Scripts：<a href="https://www.cnblogs.com/champagne/p/4844682.html">https://www.cnblogs.com/champagne/p/4844682.html</a>


  chrome开发-extension：<a href="https://www.jianshu.com/p/38725b874472">https://www.jianshu.com/p/38725b874472</a>

&nbsp;

## 一些经验

  1. 比如需要在background中动态注入content js时候，需要注意manifest配置，需要有browser\_action配置项，但是里面不能有&#8221;default\_popup&#8221;

<pre class="pure-highlightjs"><code class="">background.js----------
chrome.browserAction.onClicked.addListener(function (tab) {
    // console.log(tab)
    chrome.tabs.executeScript({ file: "js/invalid-click.js" });//通过JS文件
});
</code></pre>

<pre class="pure-highlightjs"><code class="">manifest.json-----------
"browser_action": {
        "default_icon": "icon.png",
        "default_title": "default title"
    },
    "background": {
        "scripts": [
            "js/background.js"
        ],
        "persistent": false
    },
</code></pre>

2. 是的chrome安装ID不变的技巧，但是如果发布到chrome 插件商店就不行了，有限制

众所周知，在chrome插件开发中，插件的ID是chrome自动生成的全球唯一标记串。有了这个ID，[我们](https://www.w3cdoc.com)在chrome store发布插件时，google就会为[我们](https://www.w3cdoc.com)的插件创建一个唯一的url，用户可通过这个url下载或安装插件。

同时，这个ID也是chrome区别相同或不同插件的唯一指标。也就是说，即使是同样的插件名、一行不差的代码，如果拥有不同的ID，chrome也会认为他们是不一样的。

![][1]

但是，聪明如你会发现，在通过chrome导入插件的源码文件夹进行开发时，此处的ID和你最终打包成crx再安装的ID竟然不！一！样！因此可能造成一个困扰：如果我在开发时，因为各种各样的原因，要写死插件ID在代码或者配置中，此时如果写的是开发状态下的ID，到了打包发布后，两边ID对应不上，相关的功能也就不能实现了。（譬如在做<a href="https://developer.chrome.com/extensions/autoupdate" target="_blank" rel="noopener noreferrer">Autoupdate</a>时）

所以，本文就是教你如何**保持插件在开发和打包crx后都能保持相同ID**的秘籍！

Ok，依据下面几步，你将能够快速地完成这一目的。

1. 在chrome插件管理中，点击“打包扩展程序”，将你的源码文件夹选中，然后生成一个pem密钥文件，这个文件一旦生成之后就要保存好，chrome是依据这个文件来生成ID的。 如果不甚文件丢失，你只能更换应用ID了。

![][2]

2. 通过第一步的打包，你会得到一个crx文件，将此文件拖到chrome插件管理界面进行安装。

3. 安装完成之后，你需要进入Chrome的”UserData”目录下，将该目录下manifest.json中的一个key值取出来。

这个文件的位置：

<pre class="prettyprint lang-bsh">Default/Extensions/&lt;extensionId&gt;/&lt;versionString&gt;/manifest.json</pre>

注意，不同的操作系统，userdata的目录不一样，不同系统的目录位置不同

<pre class="prettyprint">Windows XP
Google Chrome: C:\Documents and Settings\%USERNAME%\Local Settings\Application Data\Google\Chrome\User Data\Default
Chromium: C:\Documents and Settings\%USERNAME%\Local Settings\Application Data\Chromium\User Data\Default

Windows 8 or 7 or Vista
Google Chrome: C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default
Chromium: C:\Users\%USERNAME%\AppData\Local\Chromium\User Data\Default

Mac OS X
Google Chrome: ~/Library/Application Support/Google/Chrome/Default
Chromium: ~/Library/Application Support/Chromium/Default

Linux
Google Chrome: ~/.config/google-chrome/Default
Chromium: ~/.config/chromium/Default

Chrome OS
/home/chronos/</pre>

3. 打开该目录下的manifest.json文件，找到

<pre class="prettyprint lang-js">"key": "eYxnPzfSPtfL3ji4nQX3ujTXpzz3YQ6dVlvHWf1gvW8=",</pre>

“key”属性这一行，把后面一长串加密的字符串拷贝出来。

4. 对应的，将拷贝出来的key这一行内容，粘贴到你插件源文件目录下的manifest.json中。此后，你再通过插件管理界面导入插件后，你会发现显示出来的ID和打包的crx安装后的ID就是是一致的了。但是如果发布到chrome 插件商店就不行了，发布时候有限制，manifest.json不能包含key

 [1]: https://www.hlqf.net/wp-content/uploads/2014/09/20140926053553_82156.png
 [2]: https://www.hlqf.net/wp-content/uploads/2014/09/20140926042710_47482.png
