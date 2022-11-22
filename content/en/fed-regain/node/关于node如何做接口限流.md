---
title: 关于node如何做接口限流


date: 2019-11-04T04:09:17+00:00
url: /javascriptnodejs/5252.html
views:
  - 1503
like:
  - 2


---
在业务安全性方面，我们常常会用到接口限流，主要是为了防止系统压力过大、保证每个用户请求的资源保持均匀以及屏蔽恶意请求。

几个常见的场景如下：

  * 恶意注册
  * 爬虫的过度抓取
  * 秒杀场景

目前实现API接口限流的方式有几种常见的，简单来说原理很简单，无非是在一个固定的时间段内，限制API的请求速率，一般来说是根据IP，如果是登录用户的话，还可以用用户的ID。

### Token Bucket与Leaky Bucket

  * Token Bucket：定时的往每个bucket内放入token，然后每个请求都会减去token，假如没有token的话就采取限流措施，能够限制平均请求频率；
  * Leaky Bucket：做个缓冲队列，所有请求进入bucket排队，超过bucket size则丢弃，能够应付流量暴涨，请求集中；

两个算法，都有优缺点，都有适合的场景，比如Leaky Bucket很适合秒杀，因为需要应对所有用户的请求，用在正常业务中，容易卡着正常业务；而Token Bucket的话，更适合用在我们正常业务中的场景，限制接口的请求频率。

拿TJ的一个项目来说：[RateLimiter][1]

算是一个Token Bucket的实现，每过一个duration，就让bucket重新填满，优点是处理简单，快速，缺点还是是无法避免请求的集中效应，比如你限制每个小时1000次，那就是说，每个小时的开始的一秒内，爬虫可以用1000个并发（实际上，如果上个小时，爬虫没有任何请求，则可以在上个小时结束的一秒以及这个小时开始的时候的2秒内请求2000次）来搞垮你的服务器。当然了，你可以再加入更小的duration，比如10分钟内100次，1分钟内10次，这样的确可以避免这种情况，但是效率比较低下，毕竟要经过三层，而且，每层都要计数，一旦一层超过了，其它两层可能无法计数了，如果反过来，先检查最大的1小时，则还是会遇到每小时开始时候重置的问题。

所以，我们需要这个固定duration滑动起来，不会有reset，就可以一定程度上避免了集中效应。

### Token Bucket滑动窗口限流

目前查到的Node.js实现的项目中，只有两个实现了滑动窗口限流：

  * [redback/RateLimit][2]
  * [ratelimit.js][3]

只是实现略复杂，效率可能比不上上面的，简单来说是把duration切分成多个block，然后单独计数，时间每经过一个block的长度，就向前滑动一个block，然后每次请求都会计算那个duration直接的block内的请求数量。只是，如果还是单个duration的话，并不能解决集中效应。

简单比较下这两个滑动窗口的方案：

##### redback/RateLimit:

  * 优点：实现简单优雅，代码容易看懂，由于没用lua脚本（需要支持script相关命令），很多云服务商提供的redis可以用了；
  * 缺点：功能不够丰富，代码很久没更新了，只支持node_redis；

##### ratelimit.js：

  * 优点：使用lua脚本实现了具体逻辑，减少通讯时间，效率高，支持多个duration，并且还有白黑名单功能，支持ioredis以及node_redis；
  * 缺点：可能还是因为lua脚本，如果不熟悉的话，看起来比较吃力；

### 限制了后怎么做

对于恶意请求，假如对方的反反爬虫做的一般的话，完全可以直接将对方的IP加入黑名单，但如果对方用的IP代理，那就不是限流这个方案能解决的了，需要更高级的反爬虫方案。

但是我想提一点，对方既然爬了你的数据，肯定有对方的用处，假如对方没有恶意，请求频率也没有让你的机器有太多压力，那也就算了，毕竟你可能也在爬其它人的数据，大家都是搞技术的，没准对方背着万恶的KPI呢。

但是，如果对方恶意爬取，那么你完全可以在探测到对方的请求之后，返回空数据，甚至以假乱真的数据欺骗对方，让对方无利可图，对方也可能就会主动放弃了。

### 如何设置限制参数

查日志，统计下用户的正常请求就行。

### PS1:

express以及koa框架下，如果是在反向代理服务器nginx或者haproxy之类的后面，这时候获取用户的IP的话，则需要设置trust proxy，具体可以看这里：<a class="issue-link js-issue-link" href="https://github.com/xizhibei/blog/issues/3" data-error-text="Failed to load issue title" data-id="148543750" data-permission-text="Issue title is private" data-url="https://github.com/xizhibei/blog/issues/3" data-hovercard-type="issue" data-hovercard-url="/xizhibei/blog/issues/3/hovercard">#3</a>

### PS2:

可能你注意到了，我介绍的三个项目都是基于redis做的，原因无非是快，效率高，多进程多机器状态共享，对于其它的我觉得mencached勉强可以考虑，如果基于内存的话，无法处理多进程，多机器的情况。

什么？MongoDB？MySQL？别逗了。。。

### Reference

  * <a href="https://en.wikipedia.org/wiki/Leaky_bucket" rel="nofollow">https://en.wikipedia.org/wiki/Leaky_bucket</a>
  * <a href="https://en.wikipedia.org/wiki/Token_bucket" rel="nofollow">https://en.wikipedia.org/wiki/Token_bucket</a>
  * <a href="http://www.dr-josiah.com/2014/11/introduction-to-rate-limiting-with.html" rel="nofollow">http://www.dr-josiah.com/2014/11/introduction-to-rate-limiting-with.html</a>
  * <a href="http://www.dr-josiah.com/2014/11/introduction-to-rate-limiting-with_26.html" rel="nofollow">http://www.dr-josiah.com/2014/11/introduction-to-rate-limiting-with_26.html</a>

 [1]: https://github.com/tj/node-ratelimiter
 [2]: https://github.com/chriso/redback/blob/master/lib/advanced_structures/RateLimit.js
 [3]: https://github.com/dudleycarr/ratelimit.js