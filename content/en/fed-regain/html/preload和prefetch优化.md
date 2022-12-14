---
title: preload和prefetch优化
weight: 8

---
衡量网站的性能的指标有很多，其中有项重要的指标就是网站的首屏时间，为此[前端](https://www.w3cdoc.com)工程师们都是绞尽脑汁想尽办法进行优化自己的应用，诸如像服务端渲染，懒加载，CDN 加速，ServiceWorker 等等方法，今天介绍的 preload/prefetch 是一种简单，但却事半功倍的优化手段。

## 基本用法

在网络请求中，[我们](https://www.w3cdoc.com)在使用到某些资源比如：图片，JS，CSS 等等，在执行之前总需要等待资源的下载，如果[我们](https://www.w3cdoc.com)能做到预先加载资源，那在资源执行的时候就不必等待网络的开销，这时候就轮到 preload 大显身手的时候了。

### preload 提前加载

preload 顾名思义就是一种预加载的方式，它通过声明向[浏览器](https://www.w3cdoc.com)声明一个需要提交加载的资源，当资源真正被使用的时候立即执行，就无需等待网络的消耗。

它可以通过 Link 标签进行创建：

```
<link rel="preload" href="/path/to/style.css" as="style">

<script>
const link = document.createElement(’link’);
link.rel = ’preload’;
link.as = ’style’;
link.href = ’/path/to/style.css’;
document.head.appendChild(link);
</script>
```

当[浏览器](https://www.w3cdoc.com)解析到这行代码就会去加载 href 中对应的资源但不执行，待到真正使用到的时候再执行，另一种方式方式就是在 HTTP 响应头中加上 preload 字段：
```
Link: <https://example.com/other/styles.css>; rel=preload; as=style
```

这种方式比通过 Link 方式加载资源方式更快，请求在返回还没到解析页面的时候就已经开始预加载资源了。

讲完 preload 的用法再来看下它的[浏览器](https://www.w3cdoc.com)兼容性，根据 caniuse.com 上的介绍：IE 和 Firefox 都是不支持的，兼容性覆盖面达到 73%。

### prefetch 预判加载

prefetch 跟 preload 不同，它的作用是告诉[浏览器](https://www.w3cdoc.com)未来可能会使用到的某个资源，[浏览器](https://www.w3cdoc.com)就会在闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其它页面等则相当于提前预加载了需要的资源。它的用法跟 preload 是一样的：

```
<link rel="prefetch" href="/path/to/style.css" as="style">

Link: https://example.com/other/styles.css; rel=prefetch; as=style
```

讲完用法再讲[浏览器](https://www.w3cdoc.com)兼容性，prefetch 比 preload 的兼容性更好，覆盖面可以达到将近 80%。

## 更多细节点

当一个资源被 preload 或者 prefetch 获取后，它将被放在内存缓存中等待被使用，如果资源位存在有效的缓存极致（如 cache-control 或 max-age），它将被存储在 HTTP 缓存中可以被不同页面所使用。

正确使用 preload/prefetch 不会造成二次下载，也就说：**当页面上使用到这个资源时候 preload 资源还没下载完，这时候不会造成二次下载，会等待第一次下载并执行脚本**。

**对于 preload 来说，一旦页面关闭了，它就会立即停止 preload 获取资源，而对于 prefetch 资源，即使页面关闭，prefetch 发起的请求仍会进行不会中断。**

现在有了 preload，一切变得可能

```
var link = document.createElement("link");
link.href = "myscript.js";
link.rel = "preload";
link.as = "script";
link.setAttribute('crossorigin','anonymous');
document.head.appendChild(link);
```

上面这段代码可以让你预先加载脚本，下面这段代码可以让脚本执行

    
```
var script = document.createElement("script");
script.src = "myscript.js";
document.body.appendChild(script);
```

### 什么情况会导致二次获取？

  1. 不要将 preload 和 prefetch 进行混用，它们分别适用于不同的场景，对于同一个资源同时使用 preload 和 prefetch 会造成二次的下载。
  2. preload 字体不带 crossorigin 也将会二次获取！ 确保你对 preload 的字体添加 crossorigin 属性，否则他会被下载两次，这个请求使用匿名的跨域模式。这个建议也适用于字体文件在相同域名下，也适用于其他域名的获取(比如说默认的异步获取)。
  3. js资源加载时，async属性会导致二次下载，
  4. 如果js资源使用crossorigin属性，那么preload或者prefetch的时候也需要加上crossorigin属性
  5. prefetch 获取的资源是放在prefetch cache里面的，如果[浏览器](https://www.w3cdoc.com)开发者工具调试禁用缓存，则会重新获取，不用缓存。

preload 是告诉[浏览器](https://www.w3cdoc.com)页面必定需要的资源，[浏览器](https://www.w3cdoc.com)一定会加载这些资源，而 prefetch 是告诉[浏览器](https://www.w3cdoc.com)页面可能需要的资源，[浏览器](https://www.w3cdoc.com)不一定会加载这些资源。所以建议：对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。

### 这将会浪费用户的带宽吗？

用 “preload” 和 “prefetch” 情况下，如果资源不能被缓存，那么都有可能浪费一部分带宽，在移动端请慎用。

没有用到的 preload 资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告。

原因是你可能为了改善性能使用 preload 来缓存一定的资源，但是如果没有用到，你就做了无用功。在手机上，这相当于浪费了用户的流量，所以明确你要 preload 对象。

### 如何检测 preload 支持情况？

用下面的代码段可以检测 `<link rel=”preload”>` 是否被支持：

```
const preloadSupported = () => {
    const link = document.createElement('link');
    const relList = link.relList;
    if (!relList || !relList.supports)
        return false;
    return relList.supports('preload');
};
```

## 不同资源[浏览器](https://www.w3cdoc.com)优先级

在 Chrome 46 以后的版本中，不同的资源在[浏览器](https://www.w3cdoc.com)渲染的不同阶段进行加载的优先级如下图所示：

![](/images/posts/68747470733a2f2f69.png)

一个资源的加载的优先级被分为五个级别，分别是：

* Highest 最高
* High 高
* Medium 中等
* Low 低
* Lowest 最低

从图中可以看出：(以 Blink 为例)

  1. HTML/CSS 资源，其优先级是最高的
  2. font 字体资源，优先级分别为 Highest/High
  3. 图片资源，如果出现在视口中，则优先级为 High，否则为 Low

而 script 脚本资源就比较特殊，优先级不一，脚本根据它们在文件中的位置是否异步、延迟或阻塞获得不同的优先级：

* 网络在第一个图片资源之前阻塞的脚本在网络优先级中是 High
* 网络在第一个图片资源之后阻塞的脚本在网络优先级中是 Medium
* 异步/延迟/插入的脚本（无论在什么位置）在网络优先级中是 Low

自己网站资源优先级也可以通过 Chrome 控制台 Network 一栏进行查看.

  1. 对于使用 prefetch 获取资源，其优先级默认为最低，Lowest，可以认为当[浏览器](https://www.w3cdoc.com)空闲的时候才会去获取的资源。
  2. 而对于 preload 获取资源，可以通过 &#8220;as&#8221; 或者 &#8220;type&#8221; 属性来标识他们请求资源的优先级（比如说 preload 使用 as=&#8221;style&#8221; 属性将获得最高的优先级，即使资源不是样式文件)
  3. 没有 “as” 属性的将被看作异步请求。

## 与其它加载方式对比

### async/defer：

使用 async/defer 属性在加载脚本的时候不阻塞 HTML 的解析，defer 加载脚本执行会在所有元素解析完成，DOMContentLoaded 事件触发之前完成执行。它的用途其实跟 preload 十分相似。你可以使用 defer 加载脚本在 head 末尾，这比将脚本放在 body 底部效果来的更好。

  1. 它相比于 preload 加载的优势在于[浏览器](https://www.w3cdoc.com)兼容性好，从 caniuse 上看基本上所有[浏览器](https://www.w3cdoc.com)都支持，覆盖率达到 93%，
  2. 不足之处在于：defer 只作用于脚本文件，对于样式、图片等资源就无能为力了，并且 defer 加载的资源是要执行的，而 preload 只下载资源并不执行，待真正使用到才会执行文件。
  3. 对于页面上主/首屏脚本，可以直接使用 defer 加载，而对于非首屏脚本/其它资源，可以采用 preload/prefeth 来进行加载。

### HTTP/2 Server Push:

**HTTP/2 PUSH 功能可以让服务器在没有相应的请求情况下预先将资源推送到客户端。这个跟 preload/prefetch 预加载资源的思路类似，将下载和资源实际执行分离的方法**，当脚本真正想要请求文件的时候，发现脚本就存在缓存中，就不需要去请求网络了。

[我们](https://www.w3cdoc.com)假设[浏览器](https://www.w3cdoc.com)正在加载一个页面，页面中有个 CSS 文件，CSS 文件又引用一个字体库，对于这样的场景，

若使用 HTTP/2 PUSH，当服务端获取到 HTML 文件后，知道以后客户端会需要字体文件，它就立即主动地推送这个文件给客户端，如下图：

而对于 preload，服务端就不会主动地推送字体文件，在[浏览器](https://www.w3cdoc.com)获取到页面之后发现 preload 字体才会去获取，如下图：

对于 Server Push 来说，如果服务端渲染 HTML 时间过长的话则很有效，因为这时候[浏览器](https://www.w3cdoc.com)除了干等着，做不了其它操作，但是不好的地方是服务器需要支持 HTTP/2 协议并且服务端压力也会相应增大。对于更多 Server Push 和 preload 的对比可以参考这篇文章：<a href="https://www.zcfy.cc/article/http-2-push-vs-http-preload-dexecure-4722.html?t=new" rel="nofollow">HTTP/2 PUSH(推送)与HTTP Preload(预加载)大比拼</a>

### [浏览器](https://www.w3cdoc.com)预解析:

现代[浏览器](https://www.w3cdoc.com)很聪明，就如 Chrome [浏览器](https://www.w3cdoc.com)，它会在解析 HTML 时收集外链，并在后台并行下载，它也实现了提前加载以及加载和执行分离。

<a href="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f544231665479676e587a714b31526a535a536758586370415658612d3939372d3332342e706e67.png" target="_blank" rel="noopener noreferrer"><img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f544231665479676e587a714b31526a535a536758586370415658612d3939372d3332342e706e67.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/68747470733a2f2f696d672e616c6963646e2e636f6d2f7466732f544231665479676e587a714b31526a535a536758586370415658612d3939372d3332342e706e67.png?x-oss-process=image/format,webp" alt="" data-canonical-src="https://img.alicdn.com/tfs/TB1fTygnXzqK1RjSZSgXXcpAVXa-997-324.png" /></a>

它相比于 preload 方式而言：

* 仅限于 HTML 解析，对于 JS 异步加载资源的逻辑就无无能为力了

### preload 的 onload 事件

先看代码
```
<link rel="preload" as="style" href="asyncstyle.css" onload="this.rel='stylesheet'">
```

preload 的 onload 事件可以在资源加载完成后修改 rel 属性，从而实现非常酷的异步资源加载。
    
脚本也可以采用这种方法实现异步加载

难道[我们](https://www.w3cdoc.com)不是已经有了async, async虽好，但却会阻塞 window 的 onload 事件。某些情况下，你可能希望这样，但总有一些情况你不希望阻塞 window 的 onload 。

举个例子，你想尽可能快的加载一段统计页面访问量的代码，但又不愿意这段代码的加载给页面渲染造成延迟从而影响用户体验，关键是，你不想延迟 window 的 onload 事件。

有了preload， 分分钟搞定。

```
<link rel="preload" as="script" href="async_script.js"
  onload="
  var script = document.createElement('script'); 
  script.src = this.href; 
  document.body.appendChild(script);"
>
```

## 响应式加载
    
preload 是一个link，根据规范有一个media 属性（现在 Chrome 还不支持，不过快了），该属性使得选择性加载成为可能。

有什么用处呢？假设你的站点同时支持桌面和移动端的访问，在使用桌面[浏览器](https://www.w3cdoc.com)访问时，你希望呈现一张可交互的大地图，而在移动端，一张较小的静态地图就足够了。

你肯定不想同时加载两个资源，现在常见的做法是通过 JS 判断当前[浏览器](https://www.w3cdoc.com)类型动态地加载资源，但这样一来，[浏览器](https://www.w3cdoc.com)的预加载器就无法及时发现他们，可能耽误加载时机，影响用户体验和 SpeedIndex 评分。

怎样才能让[浏览器](https://www.w3cdoc.com)尽可能早的发现这些资源呢？还是 Preload!

通过 Preload，[我们](https://www.w3cdoc.com)可以提前加载资源，利用 media 属性，[浏览器](https://www.w3cdoc.com)只会加载需要的资源。

    

```
<link rel="preload" as="image" href="map.png" media="(max-width: 600px)">
<link rel="preload" as="script" href="map.js" media="(min-width: 601px)">
```

## HTTP 头

Preload 还有一个特性是其可以通过 HTTP 头信息被呈现。也就是说上文中大多数的基于标记语言的声明可以通过 HTTP 响应头实现。（唯一的例外是有 onload 事件的例子，[我们](https://www.w3cdoc.com)不可能在 HTTP 头信息中定义事件处理函数。）
```
Link: <thing_to_load.js>;rel="preload";as="script"
Link: <thing_to_load.woff2>;rel="preload";as="font";crossorigin
```
这一方式在有些场景尤其有用，比如，当负责优化的人员与页面开发人员不是同一人时（也就是说优化人员可能无法或者不想修改页面代码），还有一个杰出的例子是外部优化引擎（External optimization engine），该引擎对内容进行扫描并优化。

    
## 特征检查 （Feature Detection）


前面所有的列子都基于一种假设——[浏览器](https://www.w3cdoc.com)一定程度上支持 preload，至少实现了脚本和样式加载等基本功能。但如果这个假设不成立了。一切都将是然并卵。

为了判断[浏览器](https://www.w3cdoc.com)是否支持 preload，[我们](https://www.w3cdoc.com)修改了 DOM 的规范从而能够获知 rel 支持那些值（是否支持 rel=‘preload’）。

至于如何进行检查，原文中没有，但 Github有一段代码可供参考。

```
var DOMTokenListSupports = function(tokenList, token) {
  if (!tokenList || !tokenList.supports) {
    return;
  }
  try {
    return tokenList.supports(token);
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("The DOMTokenList doesn't have a supported tokens list");
    } else {
      console.error("That shouldn't have happened");
    }
  }
};

var linkSupportsPreload = DOMTokenListSupports(document.createElement("link").relList, "preload");
if (!linkSupportsPreload) {
  // Dynamically load the things that relied on preload.
}
```

## 使用案例

  1. 提前加载字体文件。由于字体文件必须等到 CSSOM 构建完成并且作用到页面元素了才会开始加载，会导致页面字体样式闪动。所以要用 preload 显式告诉[浏览器](https://www.w3cdoc.com)提前加载。假如字体文件在 CSS 生效之前下载完成，则可以完全消灭页面闪动效果。
  2. 使用 preload 预加载第二屏的内容，在网页开发中，对于非首屏部分采用懒加载是[我们](https://www.w3cdoc.com)页面常用的优化手段，所以[我们](https://www.w3cdoc.com)在页面 onload 之后可以通过 preload 来加载次屏所需要的资源，在用户浏览完首屏内容滚动时能够更快地看到次屏的内容。
  3. 在页面加载完成之后，可以分析页面上所有的链接，判断用户可能会点击的页面，分析提取下一跳页面上所有的资源使用 prefetch 进行加载(这里不使用 preload，因为不一定会点击)，[浏览器](https://www.w3cdoc.com)会在空闲地时候进行加载，当用户点击链接命中了缓存，这可以有效地提升下一页面的首屏渲染时间。
  4. 对于商品列表页面，在用户鼠标停留在某个商品的时候，可以去分析商品详情页所需要的资源并提前开启 preload 加载，跟第 3 点类似，都是用来预测用户的行为并且做出一些预加载的手段，区别在于当用户停留在商品上时，点击命中率更高，preload 可以立即加载资源，有效提升缓存命中率。

## 总结

preload/prefetch 是个好东西，能让[浏览器](https://www.w3cdoc.com)提前加载需要的资源，将资源的下载和执行分离开来，运用得当的话可以对首屏渲染带来不小的提升，可以对页面交互上带来极致的体验。

## 参考链接

* <a href="https://mp.weixin.qq.com/s?__biz=MzUxMTcwOTM4Mg==&mid=2247484163&idx=1&sn=16b9c907971683dd61cee251adcde79b&chksm=f96edaaace1953bcaf65a1adcf30b6d3dd66cf7b648ae59c4bf807d3f8bf460d5cd638e54ca1&token=946370022&lang=zh_CN#rd" rel="nofollow">有一种优化，叫Preload</a>
* <a href="https://juejin.im/post/5a7fb09bf265da4e8e785c38#heading-8" rel="nofollow">用 preload 预加载页面资源</a>
* <a href="https://www.zcfy.cc/article/http-2-push-vs-http-preload-dexecure-4722.html?t=new" rel="nofollow">HTTP/2 PUSH(推送)与HTTP Preload(预加载)大比拼</a>
