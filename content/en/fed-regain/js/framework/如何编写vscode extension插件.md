---
title: 如何编写vscode extension插件
---
## vscode extension

vscode用了好久了，说真心话，真的好用。除了有几次更新，有许多bug，现在已经比较完善了。[大家](https://www.w3cdoc.com)都注意到vscode 有个插件的功能，可以安装扩展。那么自己想写个vscode extension插件 怎么写呢？

官方教程：https://code.visualstudio.com/docs/extensions/overview

## 知识点

官方推荐的是使用vscode extension generator，执行下面的命令：（基于yoman）

<pre class="pure-highlightjs"><code class="">npm install -g yo generator-code
yo code
</code></pre>

## 剪贴板

剪贴板使用：vscode.env.clipboard ， webview中也可以使用navigator.clipboard但是有安全限制，比如必须是https或者127.0.0.1 localhost等认为安全的域名

<pre class="EnlighterJSRAW" data-enlighter-language="null">handleClipboard(global, message) {
        if (message.data.type == 'writeText') {
            vscode.env.clipboard.writeText(message.data.data)
            invokeCallback(global.panel, message, true);
        } else if (message.data.type == 'readText') {
            vscode.env.clipboard.readText().then((text) =&gt; {
                invokeCallback(global.panel, message, text);
            });
        }

    },</pre>

## 推荐插件

  1. import cost ，这个插件有个bug，就是引入大的类库的时候，计算量很大，导致计算机资源浪费，卡顿，最好限制下计算量。介绍：<https://hackernoon.com/keep-your-bundle-size-under-control-with-import-cost-vscode-extension-5d476b3c5a76> ，里面用到了 <a class="markup--anchor markup--p-anchor" href="https://github.com/babel/babylon" target="_blank" rel="noopener noreferrer" data-href="https://github.com/babel/babylon">Babylon</a> AST parsers，很高级。
  2. [import cost mui][1]，这个是我基于import cost插件做的，通过网络请求只计算 远程包。比如 <pre class="pure-highlightjs"><code class="">import "mui/jquery";
</code></pre>

    这种远程资源，直接通过http请求，获取header中的content-length字段来计算就好了。置于在项目中这么用远程包，这个是我项目内部处理的。首先需要模块加载，然后把通用的模块发到cdn，然后自己定制下打包脚本就好了。</li> 
    
      * [vscode开发实践][2]
      * <https://code.visualstudio.com/docs/extensions/webview></ol>

 [1]: https://github.com/chalecao/vscode-import-cost-mui
 [2]: https://www.cnblogs.com/liuxianan/p/vscode-plugin-webview.html
