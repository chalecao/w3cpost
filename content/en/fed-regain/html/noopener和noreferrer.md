---
title: noopener和noreferrer
weight: 7
---
<div>
  <p>
    ESLint的确是个好东西，在使用airbnb的JavaScript语法校验工具时，如下的<code>&lt;a&gt;</code>链接标签报出了安全错误：
  </p>

  <p>
    ​ 错误提示为Prevent usage of unsafe <code>target='_blank'</code> (react/jsx-no-target-blank)，当[我们](https://www.w3cdoc.com)希望使用<code>target=_blank</code>来打开一个新标签页时，一定要加上<code>rel='noreferrer noopener'</code>，否则你的网页就会存在很严重的安全问题！！！
  </p>
  
  <h2>
    危险的target='_blank'
  </h2>
  
  <p>
    ​ 假设在浏览A页面时，通过<code>&lt;a target="_blank" href="http://baidu.com/"&gt;Click&lt;/a&gt;</code>标签链接到了B页面，那么在B页面中通过<code>window.reopner</code>即可获取A页面的<code>window</code>对象，这样的话即可拿到部分的A页面的控制权，即使B页面是跨域的也可以拿到该控制权！
  </p>

[我们](https://www.w3cdoc.com)编写两个页面进行简单的测试，A页面（index.html）中有一个a标签，以及一个’待宰割‘的 Click：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Title</title>
</head>
<body>
    <div id="test"></div>
    <a href="./test.html" target="_blank">Click</a>
</body>
</html>
```
B页面(test.html)中添加如下的js代码来试图篡改A页面：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Title</title>
</head>
<body>
    Test page
    <script type="application/javascript">
      if (window.opener) {
//      opener.location = 'http://baidu.com'
        opener.document.getElementById('test').innerHTML = 'Now A page is revised!';
      }
    </script>
</body>
</html>
```
  <p>
    ​ 测试结果显示A页面<code>&lt;div&gt;</code>标签被篡改了。该例子还只是简单的页面内容改动，但如果有人恶意的使用<code>opener.location</code>将A页面跳转到一个钓鱼网站，而此时用户的关注点还在B页面上，等用户返回&#8217;A页面&#8217;输入了隐私信息，那么后果不堪设想。
  </p>
  
  <h2>
    使用<code>rel=noopener noreferrer</code>
  </h2>
  
  <p>
    ​ 给<code>&lt;a&gt;</code>标签添加<code>rel=noopener</code>可以使<code>window.opener</code>在Chrome 49 and Opera 36以上版本中为<code>null</code>。如果点击A页面上的链接跳转到了B页面，则称A页面为B页面的referrer（来源页面），通过referrer[我们](https://www.w3cdoc.com)可以知道网站的流量从何而来。
  </p>
  
  <p>
    ​ 注：可以通过<code>document.referrer</code>拿到页面的来源
  </p>
</div>

# Target=”_blank”
有史以来最低估的漏洞

人们在Html链接中使用 **target=’_blank’** 以便打开另外一个新页面，但是新页面会通过window.opener对象访问到原来页面，因此这给攻击者留下了攻击漏洞，设想在一个用户产生内容的网站中，比如论坛等，如果攻击者发布一个带有target=&#8217;_blank&#8217;链接页面就能对原页面进行攻击，进行网络钓鱼等等。比如通过改变**window.opener.location** 改变原来的网址进入钓鱼者网站。

如何解决？在Html链接中加入

```
rel="noopener"
```

注意，FireFox不支持noopener, 加入下面比较完整：

```
rel="noopener noreferrer"
```

记住，每次你通过**window.open()**打开新窗口时也要注意漏洞泄漏，通常需要复位opener属性：

```
var newWnd = window.open();
newWnd.opener = null;
```

<h2>
    参考
  </h2>
  
  <p>
    <a href="https://mathiasbynens.github.io/rel-noopener/" target="_blank" rel="nofollow noopener">https://mathiasbynens.github.io/rel-noopener/</a>
  </p>
  
  <p>
    <a href="https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md" target="_blank" rel="nofollow noopener">https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md</a>
  </p>