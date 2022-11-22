---
title: target=”_blank”打开新窗口漏洞

---
# Target=”_blank”有史以来最低估的漏洞 {.bige20}

人们在Html链接中使用 **target=’_blank’** 以便打开另外一个新页面，但是新页面会通过window.opener对象访问到原来页面，因此这给攻击者留下了攻击漏洞，设想在一个用户产生内容的网站中，比如论坛等，如果攻击者发布一个带有target=&#8217;_blank&#8217;链接页面就能对原页面进行攻击，进行网络钓鱼等等。比如通过改变**window.opener.location** 改变原来的网址进入钓鱼者网站。

如何解决？在Html链接中加入

<pre id="3da3">rel="noopener"</pre>

注意，FireFox不支持noopener, 加入下面比较完整：

<pre id="4f17">rel="noopener noreferrer"</pre>

记住，每次你通过**window.open()**打开新窗口时也要注意漏洞泄漏，通常需要复位opener属性：

<pre id="23ab">var newWnd = window.open();
newWnd.opener = null;</pre>
