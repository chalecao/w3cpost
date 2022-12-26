---
title: 使用 Service Workers提升体验
weight: 14
---

有一个困扰 web 用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果下载不了它，也是非常糟糕的体验。如今虽然已经有很多种技术去尝试着解决这一问题。而随着[离线][1]页面的出现，一些问题已经得到了解决。但是，最重要的问题是，仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。

之前的尝试 — AppCache — 看起来是个不错的方法，因为它可以很容易地指定需要离线缓存的资源。但是，它假定你使用时会遵循诸多规则，如果你不严格遵循这些规则，它会把你的APP搞得一团糟。关于APPCache的更多详情，请看Jake Archibald的文章： [Application Cache is a Douchebag][2]{.external.external-icon}.

> 注意:  从Firefox44起，当使用 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache">AppCache</a> 来提供离线页面支持时，会提示一个警告消息，来建议开发者使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers">Service workers</a> 来实现离线页面。(<a class="external external-icon" title="FIXED: Add a deprecation notice for AppCache if service worker fetch interception is enabled" href="https://bugzilla.mozilla.org/show_bug.cgi?id=1204581">bug 1204581</a>.)

Service worker 最终要去解决这些问题。虽然 Service Worker 的语法比 AppCache 更加复杂，但是你可以使用 JavaScript 更加精细地控制 AppCache 的静默行为。有了它，你可以解决目前离线应用的问题，同时也可以做更多的事。 Service Worker 可以使你的应用先访问本地缓存资源，所以在离线状态时，在没有通过网络接收到更多的数据前，仍可以提供基本的功能（一般称之为 [Offline First][3]）。这是原生APP 本来就支持的功能，这也是相比于 web app，原生 app 更受青睐的主要原因。

。。。待续

## 注意事项：

1. 注册sw.js 是不支持跨域的，这个也是防止XSS攻击等安全角度考虑，目前是不支持，至于以后是否支持，就不得而知了。这样就产生比较头疼的问题，如果你的静态资源是采用cdn的域名，那么主域名下的serviceworker就无法缓存cdn的内容了。但是还有曲线救国的方法。

如果你的js和css等是放在CDN下面的，你可以新建一个html文件，用来注册serviceworker，然后把这个文件的response的header设置成

```
"Content-Type", "application/x-javascript; charset=utf-8"

```

那么[浏览器](https://www.w3cdoc.com)就会按照js来解析，但是不影响注册SW。示例：

```
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        setTimeout(function(){
            navigator.serviceWorker.register('./sw.htm', {
                scope: './index'
            }).then(function(registration){
                console.log('register service worker success', registration);
            }).catch(function(registration){
                console.log('register service worker fail', registration);
            });
        }, 0);
    });
}else{
    // noy support
}
</script>

```

## 关于fetch

1. 如果服务器支持 CORS, 则在客户端设置相应的 `Access-Control-Allow-Origin` 即可得到数据。

```
let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});
fetch(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
}) .then((res) => {
// TODO
})

```

服务端是否支持可以问下后端同事，如果是自己承担后端编码，则可以直接自己设置，比如如果是 PHPer, header 一下响应头即可。

```
header("Access-Control-Allow-Origin: *"); 
```

2. 如果服务器不支持 CORS， 则不用使用 Fetch Api 了。

`Fetch Api` 必须后台支持 `CORS`,。咱们可以试下，如果你设置了 `{mode: " cors "}`(一般用于请求API)，就会报错告诉你你请求的服务器不支持 `CORS`。大概会报下面的错误：

> Response to preflight request doesn&#8217;t pass access control check: No "Access-Control-Allow-Origin&#8217; header is present on the requested resource.
    
如果设置成 `{mode: " no-cors "}` (一般用于请求图片等静态资源), 虽然不会报错，但是结果会 返回被标记了为 `opaque` 的数据，表明你没有权限访问。
```
<noscript>
&amp;amp;amp;lt;img src=&#8221;https://pic4.zhimg.com/50/v2-5bbd2fc2f90d8c5b3755616e5dd449bb_hd.png&#8221; data-rawwidth=&#8221;222&#8243; data-rawheight=&#8221;183&#8243; class=&#8221;content_image&#8221; width=&#8221;222&#8243;&amp;amp;amp;gt;
</noscript>
    
<img loading="lazy" class="alignnone size-full wp-image-1452" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/10/v2-5bbd2fc2f90d8c5b3755616e5dd449bb_hd.png" width="222" height="183" />这种情况下可以使用JSONP。


### 示例

```
//serviceWorker.js
var CACHE_NAME = 'my-first-sw';
var urlsToCache = [
'/',
'/styles/main.css',
'/script/main.js'
];

self.addEventListener('install', function(event) {
// 在install阶段里可以预缓存一些资源
event.waitUntil(
    caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
);
});

//在fetch事件里能拦截网络请求，进行一些处理
self.addEventListener('fetch', function (event) {
event.respondWith(
    caches.match(event.request).then(function (response) {
        // 如果匹配到缓存里的资源，则直接返回
        if (response) {
            return response;
        }

        // 匹配失败则继续请求
        var request = event.request.clone(); // 把原始请求拷过来

        //默认情况下，从不支持 CORS 的第三方网址中获取资源将会失败。
        // 您可以向请求中添加 no-CORS 选项来克服此问题，不过这可能会导致“不透明”的响应，这意味着您无法辨别响应是否成功。
        if (request.mode !== 'navigate' && request.url.indexOf(request.referrer) === -1)       {
            request = new Request(request, { mode: 'no-cors' })
        }

        return fetch(request).then(function (httpRes) {
                            //拿到了http请求返回的数据，进行一些操作

            //请求失败了则直接返回、对于post请求也直接返回，sw不能缓存post请求
            if (!httpRes  || ( httpRes.status !== 200 && httpRes.status !== 304 && httpRes.type !== 'opaque') || request.method === 'POST') {
                return httpRes;
            }

            // 请求成功的话，将请求缓存起来。
            var responseClone = httpRes.clone();
            caches.open('my-first-sw').then(function (cache) {
                cache.put(event.request, responseClone);
            });

            return httpRes;
        });
    })
);
});
```

## webpack插件

上面展示了在半年前研究pwa离线缓存时写的代码，而这次，真正要在正式环境上使用时，我决定使用webpack一个插件：workbox-webpack-plugin。workbox是google官方的pwa框架，workbox-webpack-plugin是由其产生的其中一个工具，内置了两个插件：GenerateSW 、InjectManifest

- GenerateSW：这个插件会帮你生成一个service worker配置文件，不过这个插件的能力较弱，主要是处理文件缓存和install、activate
- InjectManifest：这个插件可以自定义更多的配置，比如fecth、push、sync事件

由于这次是为了进行资源缓存，所以只使用了GenerateSW这部分。

```
//在webpack配置文件里
var WorkboxPlugin = require('workbox-webpack-plugin');
new WorkboxPlugin.GenerateSW({
        cacheId: 'seed-cache',

        importWorkboxFrom: 'disabled', // 可填`cdn`,`local`,`disabled`,
        importScripts: '/scripts-build/commseed/workboxswMain.js',

        skipWaiting: true, //跳过waiting状态
        clientsClaim: true, //通知让新的sw立即在页面上取得控制权
        cleanupOutdatedCaches: true,//删除过时、老版本的缓存

        //最终生成的service worker地址，这个地址和webpack的output地址有关
        swDest: '../workboxServiceWorker.js',
        include: [

        ],
        //缓存规则，可用正则匹配请求，进行缓存
        //这里将js、css、还有图片资源分开缓存，可以区分缓存时间(虽然这里没做区分。。)
        //由于种子农场此站点较长时间不更新，所以缓存时间可以稍微长一些
        runtimeCaching: [
            {
                urlPattern: /.*\.js.*/i,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'seed-js',
                    expiration: {
                        maxEntries: 20,  //最多缓存20个，超过的按照LRU原则删除
                        maxAgeSeconds: 30 *24* 60 *60, // 30 days
                    },
                },
            },
            {
                urlPattern: /.*css.*/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'seed-css',
                    expiration: {
                        maxEntries: 30,  //最多缓存30个，超过的按照LRU原则删除
maxAgeSeconds: 30* 24 *60* 60, // 30 days
                    },
                },
            },
            {
                urlPattern: /.*(png|svga).*/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'seed-image',
                    expiration: {
                        maxEntries: 30,  //最多缓存30个，超过的按照LRU原则删除
                        maxAgeSeconds: 30 *24* 60 * 60, // 30 days
                    },
                },
            }
        ]
    })

```
importWorkboxForm和importScripts：

importWorkboxFrom：workbox框架文件的地址，可选cdn、local、disabled
- cdn：引入google的官方cdn，当然在国内会被强。。pass
-  Local：workboxPlugin会在本地生成workbox的代码，可以将这些配置文件一起上传部署，这样是每次都要部署一次这个生成的代码。
- Disabled：上面两种都不选用，将生成出来的workbox代码使用importscript指定js文件从而引入。
    
我最终选择的是第三种，因为这样可以由自己指定要从哪里引入，比如以后如果这个站点有了cdn，可以将这个workbox.js放到cdn上面。目前是将生成的文件，放到script文件夹下。

workbox的策略
- Stale-While-Revalidate：尽可能快地利用缓存返回响应，缓存无效时则使用网络请求
- Cache-First：缓存优先
- Network-First：网络优先
- Network-Only：只使用网络请求的资源
- Cache-Only：只使用缓存
    
一般站点的 CSS，JS 都在 CDN 上，SW 并没有办法判断从 CDN 上请求下来的资源是否正确（HTTP 200），如果缓存了失败的结果，就不好了。这种情况下使用stale-while-Revalidate策略，既保证了页面速度，即便失败，用户刷新一下就更新了。

而由于种子项目的js和css资源都在站点下面，所以这里就直接使用了cache-first策略。

在webpack中配置好之后，执行webpack打包，就能看到在指定目录下由workbox-webpack-plugin生成的service worker配置文件了。

<img loading="lazy" width="1280" height="694" class="alignnone size-full wp-image-5586 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_163/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_416/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26960b5167a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_434/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />

接入之后，打开网站，在电脑端的chrome调试工具上可以看到缓存的资源

<img loading="lazy" width="1280" height="379" class="alignnone size-full wp-image-5587 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_89/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_227/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e269614ed95c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_237/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />

## 接入过程的考虑

前文也有介绍，service worker一旦被install，就永远存在；如果有一天想要去除跑在[浏览器](https://www.w3cdoc.com)背后的这个service worker线程，要手动去卸载。所以在接入之前，我得先知道如何卸载service worker，留好后手：

```
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
    for(let registration of registrations) {
        //安装在网页的service worker不止一个，找到[我们](https://www.w3cdoc.com)的那个并删除
        if(registration && registration.scope === 'https://seed.futunn.com/'){
            registration.unregister();
        }
    }   
});
}
```

使用service worker缓存了资源，那下次重新发布了，还会不会拉取新的资源呢？这里也是可以的，只要资源地址不一样、修改了hash值，那么资源是会重新去拉取并进行缓存的，如下图，可以看到对同一个js的不同版本，都进行了缓存。

<img loading="lazy" width="1280" height="416" class="alignnone size-full wp-image-5588 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_98/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_250/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26961c78491.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_260/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />

还有个就是对于考虑开发过程的问题，如果以后上线了，sw这个东西安装下去了，每次打开都直接读取缓存的资源，那以后在本地调试时怎办？试了下，chrome的“disabled cache”也没有用，总不能在本地开发时也给资源打上hash值吧（目前这个项目是在发布到正式环境时才会打上hash值）。。然后针对这个问题想了蛮久的，最后发现chrome早有这个设置，在devtool中可以设置跳过service worker,bypass for network
    
<img loading="lazy" width="1280" height="568" class="alignnone size-full wp-image-5589 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_133/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_341/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/01/img_5e26962b1b2f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_355/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />

比起[浏览器](https://www.w3cdoc.com)的默认缓存功能，service woker的缓存功能赋予[我们](https://www.w3cdoc.com)更强大地、更完善地控制缓存的能力。

这个东西其中一个不足在于，还没有很多[浏览器](https://www.w3cdoc.com)支持service worker这个东西，苹果系统是从11.3才开始支持，所以直到现在，富途nn的app的webview、微信ios版的webview都还不支持service worker这个特性；在安卓上的支持更为广泛一些，所以这次在种子的优化上，安卓客户可以更好地感受到这个成效。

## 参考文献

1. [mdn 使用  Service  Workers][4]: https://developer.mozilla.org/zh-CN/docs/Web/API/Service\_Worker\_API/Using\_Service\_Workers
2. [fetch][5] : https://fetch.spec.whatwg.org/#http-new-header-syntax
3. [深入了解 Service Worker][6]：https://zhuanlan.zhihu.com/p/27264234

[1]: https://developer.mozilla.org/en-US/Apps/Build/Offline
[2]: https://alistapart.com/article/application-cache-is-a-douchebag
[3]: https://offlinefirst.org/
[4]: https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers
[5]: https://fetch.spec.whatwg.org/#http-new-header-syntax
[6]: https://zhuanlan.zhihu.com/p/27264234
