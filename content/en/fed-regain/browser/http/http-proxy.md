---
title: 基于正向代理解决方案实现的万能代理接口代理转发服务


date: 2019-09-14T00:09:07+00:00
excerpt: 今天把项目中的反向代理脚本程序抽成了一个插件，通过配置文件配置代理的http请求，这样使用起来比较方便，每位开发成员都可以用自己配置的代理调试代码。
url: /pwa/657.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/09/server-proxy-per-navigazione-anonima.png
views:
  - 4022
  - 4022
ws_info:
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
toc_depth:
  - 2
  - 2
like:
  - 4
  - 4
wl_pageviews:
  - 2
  - 2
fifu_image_url:
  - //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/09/server-proxy-per-navigazione-anonima.png
fifu_image_alt:
  - 基于node开发的http请求代理程序proxy-ajax


---
今天把项目中的反向代理脚本程序抽成了一个插件，通过配置文件配置代理的http请求，这样使用起来比较方便，每位开发成员都可以用自己配置的代理调试代码。也可以用来直接做http代理，你甚至都不用Charles或者fiddler，直接开启proxy-ajax，然后手机上设置代理就可以了。

<img loading="lazy" class="alignnone size-full wp-image-1416" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/09/server-proxy-per-navigazione-anonima.png" width="500" height="300" /> 

使用方法：

<pre class="EnlighterJSRAW" data-enlighter-language="null">npm install fedp -g

fedp init  // 会提示你在那种场景使用，自动生成配置文件


fedp -c config.js // 会提示你在那种场景使用，自定义配置文件</pre>

github： <https://github.com/chalecao/fedp>     请帮我点亮小星星，感谢star

使用很简单，修改配置文件就好了。访问地址是：127.0.0.1:8889/访问路径

  * 根据配置会自动代理静态资源，包括css，图片，可以代理到本地或者远程
  * 自定义接口，根据匹配关键字，返回指定的数据结构

<pre class="EnlighterJSRAW" data-enlighter-language="null">/**
 * fedp配置文件
 */

const targetMockServer = 'https://127.0.0.1/';

module.exports = {
  port: 8889, // proxy server port
  domain: false, // true to apply new domain, false to use ip, or you self domain string like "test.tmall.com"
  debug: false, // enable debug
  mock: true, // enable mock
  env: '', // pre预发，prod线上，daily日常，对应于不同请求
  debugPort: 9001, // debug server port
  cmds: [ // cmds you want run
    // "tap server"
  ],
  scripts: [ // scripts you want to inject to the html
  ],
  // urlsuffix: "src/indexWeb.html#POSMarketingIndex",
  // simulator: "//irma.work.ucweb.local/#/remote/remote-control-devices",   // web simulator url
  // simulator: "//mds.alibaba-inc.com/device/93c29bb90005",   // web simulator url, 需要填写云真机的url
  // domainy: [{                     // proxy domain config, if not for remote debug, no need to config,
  //     path: "g-assets.daily.taobao.net",
  //     data: "__ip__:8889"
  // }],
  proxy: {
    host: [{ // proxy requestoption host config
      path: '.(js|css)',
      data: '127.0.0.1',
    }, {
      path: '.*',
      data: 'localhost',
    }],
    hostname: [{ // proxy requestoption host config
      path: '.(js|css)',
      data: '127.0.0.1',
    }, { // proxy requestoption hostname config
      path: '.*',
      data: 'localhost',
    }],
    port: [{ // proxy requestoption port config
      path: '.*',
      data: 3634,
    }],
  },
  mocky: [
    {
      path: 'desc',
      data: './mock/desc.js',
    }, {
      path: 'xiaoer',
      data: './mock/xiaoer.js',
    }, {
      path: 'search',
      data: './mock/search.js',
    }, {
      path: 'create',
      data: './mock/create.js',
    }, {
      path: 'getActivity',
      data: './mock/getActivity.js',
    }, {
      path: 'join',
      data: './mock/join.js',
    }, {
      path: 'activity/scenes/info',
      data: './mock/scenes.js',
    }, {
      path: '.activity',
      data: './mock/activity.js',
    }, {
      path: 'mockServer',
      routeTo: targetMockServer,
    }],
}
</pre>

&nbsp;

## 反向代理与正向代理

正向代理，只用于代理内部网络对Internet的连接请求，客户机必须指定代理服务器,并将本来要直接发送到Web服务器上的http请求发送到代理服务器中。此时正向代理表现的像一个客户端，请求资源，返回数据。

正向代理很好理解，比如手机上wifi设置的代理就是正向代理，浏览器设置的代理也是正向代理，正向代理只是简单的为你转发请求，把请求到的数据回传到源请求。

反向代理（Reverse Proxy）方式是指以代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络上的服务器；并将从服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器，代理请求。

反向代理可以看成一个服务器，比如我们常用的nginx反向代理，服务器上只是监听了一个80端口，但是这个80端口既提供网络服务，又提供接口服务，可以通过不同的域名或者请求路径区分开不同的服务，这就用到了反向代理。对于客户端只是向反向代理请求数据，至于反向代理是自身的服务，还是其他组合的服务，客户端并不知情。

## node实现正向代理

在正向代理中，我们通常会使用两种形式的代理：

第一种是 [RFC 7230 – HTTP/1.1: Message Syntax and Routing][1]（即修订后的 RFC 2616，HTTP/1.1 协议的第一部分）描述的普通代理。这种代理扮演的是「中间人」角色，对于连接到它的客户端来说，它是服务端；对于要连接的服务端来说，它是客户端。它就负责在两端之间来回传送 HTTP 报文。

第二种是 [Tunneling TCP based protocols through Web proxy servers][2]（通过 Web 代理服务器用隧道方式传输基于 TCP 的协议）描述的隧道代理。它通过 HTTP 协议正文部分（Body）完成通讯，以 HTTP 的方式实现任意基于 TCP 的应用层协议代理。这种代理使用 HTTP 的 CONNECT 方法建立连接，但 CONNECT 最开始并不是 RFC 2616 – HTTP/1.1 的一部分，直到 2014 年发布的 HTTP/1.1 修订版中，才增加了对 CONNECT 及隧道代理的描述，详见 [RFC 7231 – HTTP/1.1: Semantics and Content][3]。实际上这种代理早就被广泛实现。

第一种方式，代理就是拿到源请求的请求数据，然后代理请求目的资源，最后代理将请求的结果返回到源请求。

<pre class="pure-highlightjs"><code class="">var http = require('http');
var net = require('net');
var url = require('url');
 
function request(cReq, cRes) {
    var u = url.parse(cReq.url);
 
    var options = {
        hostname : u.hostname, 
        port     : u.port || 80,
        path     : u.path,       
        method     : cReq.method,
        headers     : cReq.headers
    };
 
    var pReq = http.request(options, function(pRes) {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', function(e) {
        cRes.end();
    });
 
    cReq.pipe(pReq);
}
 
http.createServer().on('request', request).listen(8888, '0.0.0.0');
</code></pre>

上面这种方式只适合普通的http请求，对于https请求就不行了，因为无法解析出请求的具体路径和参数，所以自然也不能使用上面的方法。那么我们只能采用第二种方式，隧道代理。其实在node中已经在net包中封装好了对应的方法。

<pre class="pure-highlightjs"><code class="">var http = require('http');
var net = require('net');
var url = require('url');
 
function connect(cReq, cSock) {
    var u = url.parse('https://' + cReq.url);
 
    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Establishedrnrn');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });
 
    cSock.pipe(pSock);
}
 
http.createServer().on('connect', connect).listen(8888, '0.0.0.0');
</code></pre>

从原理上讲，如下图：

<img loading="lazy" class="alignnone wp-image-1417" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/09/a9693cb944613c1bc2d2465d9aa80495.png" width="557" height="473" /> 假如我通过代理访问 A 网站，浏览器首先通过 CONNECT 请求，让代理创建一条到 A 网站的 TCP 连接；一旦 TCP 连接建好，代理无脑转发后续流量即可。所以这种代理，理论上适用于任意基于 TCP 的应用层协议，HTTPS 网站使用的 TLS 协议当然也可以。这也是这种代理为什么被称为隧道的原因。把上面两种形式结合起来，就是一个完美的正向代理。

需要注意的是CONNECT请求还是通过http代理链接的，毕竟也是明文传输，可能会被监测和拦截，如果访问youtube这样的网站，就会被屏蔽。所以，如果要想访问一些其他网站，可以使用https代理，也可以使用shadow socket 或者 SOCK5代理或者加密的VPN。。

## node实现反向代理

反向代理实现起来就比较复杂了，对于客户端来说反向代理更像是一个服务器。他可以代理一个具体的请求到另外一个目的地址，然后返回响应，也可以根据指定规则返回指定数据。

<pre class="pure-highlightjs"><code class="">require('http').createServer(function (req, res) {

        // 在这里可以自定义你的路由分发
        var host = req.headers.host,
            rurl = req.url,
            ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log("");
        console.log('client ip: '.blue + ip + ' , host: '.green + host);
        console.log("request URL: ".cyan + rurl );
        //查找匹配规则
        let p = _proxy.find(function (p) {
            var rule = new RegExp(p.path);
            return rule.exec(rurl) && p.path;
        });
        if (p) {
        //如果匹配，那么走反向代理
            console.log("find rule for above url!".yellow)
            if (p.data) {
                //如果制定接口返回数据，那么直接返回数据
                getData(resolve(p.data)).then(function (value) {
                    //判断是不是jsonp接口
                    let callbackName = new RegExp("callback=(.*)&", "g").exec(req.url);
                    if (callbackName && callbackName[1]) {
                        console.log("jsonp match given data! ".red);
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(callbackName[1] + "(" + JSON.stringify(value) + ")");
                    } else {
                        console.log("ajax match given data! ".red);
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify(value));

                    }
                })

            } else if (p.routeTo) {
                //如果匹配的是反向代理的地址，那么代理接口
                console.log("proxy to: ".red + proxyConfig[p.routeTo]);
                // 设置req
                req._originUrl = req.url;
                proxy.web(req, res, {
                    target: proxyConfig[p.routeTo]
                });
            } else {
                //该规则没有配置，那么走正向代理
                request(req, res)
            }
        } else {
        //如果没有规则匹配，那么走正向代理
            request(req, res)
        }

    });
    server.listen((port || proxyConfig.port));
</code></pre>

上面给出了部分代码实现逻辑。反向代理主要走两个逻辑：

  1. 如果指定某个http请求返回的数据，那么直接返回这个数据
  2. 如果指定某个http的代理地址，那么代理这个地址，http的代理是基于[http-proxy][4]这个npm包来做的。

## ajax请求跨域带cookie

这里顺带介绍一下这个知识点，跨域请求常用的方案是CORS，经常会遇到跨域请求带cookie的情况，默认ajax跨域请求是不带cookie的。如果需要带cookie，需要这样写：

<pre class="pure-highlightjs"><code class="">原生ajax请求方式：
 
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://xxxx.com/demo/b/index.php", true);
xhr.withCredentials = true; //支持跨域发送cookies
xhr.send();
 
jquery为例：
$.ajax({
    type: "POST",
    url: "https://xxx.com/api/test",
    dataType: 'jsonp',
    xhrFields: {
        withCredentials: true //配置跨域带cookie
    },
    crossDomain: true,
    success:function(){
    },
    error:function(){
    }
})
</code></pre>

服务端CORS配置：<figure> 

<table>
  <tr>
    <td>
        1
      
        2
    </td>
    
    <td>
        header(&#8220;Access-Control-Allow-Credentials: true&#8221;); //允许跨域带cookie
      
        header(&#8220;Access-Control-Allow-Origin: https://www.xxx.com&#8221;); //允许跨域请求的域名
    </td>
  </tr>
</table></figure> 

## 使用姿势

好的工具需要有正确的使用姿势。

  1. 如果你需要调试的接口都已上线，你只是简单的想代理到本地，那么可以将静态文件代理到本地即可。这时候用到的是正向代理，可能需要浏览器插件配置http代理到本地的代理服务器，然后通过配置文件配置需要代理的静态资源。
  2. 如果需要调试的接口还在开发，或者在某台服务器上，那么这个代理服务器就很有用。你可以把需要调试的接口代理到指定的服务器，把其他接口依然代理到线上，这用到的就是正向和反向代理。

## 参考资料

1. node-http-proxy：https://github.com/nodejitsu/node-http-proxy  
2. HTTP权威指南: https://book.douban.com/subject/10746113/  
3. Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing: https://tools.ietf.org/html/rfc7230  
4. Tunneling TCP based protocols through Web proxy servers: https://tools.ietf.org/html/draft-luotonen-web-proxy-tunneling-01

5. HTTP 代理原理及实现： https://imququ.com/post/web-proxy.html

 [1]: https://tools.ietf.org/html/rfc7230
 [2]: https://tools.ietf.org/html/draft-luotonen-web-proxy-tunneling-01
 [3]: https://tools.ietf.org/html/rfc7231#section-4.3.6
 [4]: https://github.com/nodejitsu/node-http-proxy