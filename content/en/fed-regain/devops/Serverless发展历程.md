---
title: Serverless发展历程

---
# 背景

Serverless 概念从2012年开始提出，真正推出相关云产品是2014年AWS推出Lambda。如果我们将 Serverless 比作一个婴儿，那么它已经6岁了。虽然业界对Serverless尚无一致认可的定义，但是我相信大部分开发者在听到 Serverless时，会联想到Lambda，并且冒出“函数”、“按需（调用次数）收费”、“事件驱动”等关键词。确实当年刚刚诞生的Serverless就像下面可爱的“紫薯人”，紫色充满神秘感（当年刚推出的时候绝对是黑科技），让人印象深刻

<div class="image-package">
  <div class="image-container">
    <div class="image-view" data-width="720" data-height="614">
      <p id="GZrirrw">
        <img loading="lazy" class="alignnone wp-image-6465 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91548082d4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91548082d4.png?x-oss-process=image/format,webp" alt="" width="332" height="283" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91548082d4.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91548082d4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_256/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91548082d4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_704,h_600/format,webp 704w" sizes="(max-width: 332px) 100vw, 332px" />
      </p>
    </div>
  </div>
</div>

AWS的巨大影响力以及本身携带的一身黑科技，确实让人记住了 Serverless，但是也正因为诞生的时候太印象深刻，以至于现在提到已经6岁的 Serverless，很多人的印象还是停留在Serverless=Lambda或者Serverless=FC（Function Compute），这不得不说是某种遗憾。

<div class="image-package">
  <div class="image-container">
    <div class="image-container-fill">
      <img loading="lazy" class="alignnone wp-image-6466 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc9155c10a06.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc9155c10a06.png?x-oss-process=image/format,webp" alt="" width="421" height="237" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc9155c10a06.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc9155c10a06.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_169/format,webp 300w" sizes="(max-width: 421px) 100vw, 421px" />
    </div>
  </div>
</div>

今天企业都在全面数字化转型，整个技术架构体系都渴望依托云原生来获取巨大技术红利，Serverless从诞生的第一天起就是云原生的，所以我们有必要再系统的认识一下Serverless的理念以及这些年诞生的相关产品，相信不管你是前端、后端、架构师、SRE、CTO都会有所收获，并且在未来能更好的发挥Serverless的技术价值助力商业成功。

# 定义

业界一直在尝试定义Serverless，比如CNCF给出的定义是：NoOps 和Pay as You Run，还有伯克利说 Serverless=FaaS+BaaS。但是我想说，Serverless 其实无需再去定义，他本身就已经非常清晰明确：“Server+less”，他是一个理念，核心思想就是你不再需要关注 Server，作为对比的是 IaaS 时代，购买服务器，安装各种工具，再在上面开发自己的业务。

Server不会消失，而是让一般的开发者不需要再关注 Server，这意味着【智能弹性】、【快速交付】、【更低成本】，这也是 Serverless 相关产品的典型特性。

所以没必要再去给 Serverless 做什么定义，他本身已经描述的很清晰。我们抛开概念，具体看看在各个具体技术领域的产品，相信你会有更直观的认识。

# PaaS在 Serverless 时代的重生

PaaS 本身的概念挺大，广义的说它处于IaaS和SaaS之间，我们先从一个具体的产品说起：GAE（Google App Engine）。2006年AWS推出了IaaS的云计算，Google认为云计算不应该是IaaS这样的底层形态，所以在2008年推出了自己的云计算代表产品GAE（关于这里的发展缘由，可以参考张磊的这篇文章：[容器十年 ，一部软件交付编年史][1]）。

初推出的GAE，也像Lambda，让人眼前一亮，但是很快开发者就发现它的限制非常多，用今天的话说就是典型的“我不要你觉得，我要我觉得”，最后的结果就是大家都纷纷回到了IaaS的怀抱。

<div class="image-package">
  <div class="image-container">
    <div class="image-container-fill">
      <img loading="lazy" class="alignnone wp-image-6467 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915750191a.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915750191a.png?x-oss-process=image/format,webp" alt="" width="229" height="229" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915750191a.png?x-oss-process=image/format,webp 480w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915750191a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_300/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915750191a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w" sizes="(max-width: 229px) 100vw, 229px" />
    </div>
  </div>
</div>

到后来的PaaS产品比如Cloud Foundry，这类PaaS产品相对更实际一些，底层IaaS还是云厂商提供，上层提供一套应用管理生态，背后的思想还是不希望开发者通过IaaS这么底层的方式去使用云计算，而是从PaaS开始，不过它也不是Serverless化的，你还是要考虑服务器的维护、更新、扩展和容量规划等等。

## SAE（Serverless App Engine）

到了现在，随着容器技术的成熟，以及Serverless理念的进一步发展，PaaS和Serverless理念也开始融合，这样的产品既有PaaS为代表的【快速交付】，又有Serverless的特点【智能弹性】、【更低成本】，典型的产品代表就是阿里云在2019年推出的产品：SAE（Serverless App Engine）。

首先，它是一个PaaS，再具体一点说，是一个应用PaaS。这意味着大部分开发者使用起来都会非常自然，因为里面的概念你会非常熟悉，比如应用发布、重启、灰度、环境变量、配置管理等等。

同时，它也是Serverless化的。这意味着你不必再关心服务器，不用再申请机器，维护服务器，装一堆工具，而是按需使用，按分钟计费，结合强大的弹性能力（定时弹性、指标弹性）实现极致成本。

最后，得益于Docker为代表的容器技术的发展，SAE解决了经典PaaS的突出问题（各种限制和强绑定），依托于容器镜像，在上面可以跑任意的语言的应用

看到这里，我相信大部分开发者对于 PaaS 和 Serverless 结合的产品已经有了一个轮廓，在中国云原生用户调研报告中(2020年) ，这种形态的Serverless产品开始被越来越多的开发者采用。

<div class="image-package">
  <div class="image-container">
    <div class="image-container-fill">
      <img loading="lazy" class="alignnone wp-image-6468 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91586f0094.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91586f0094.png?x-oss-process=image/format,webp" alt="" width="498" height="344" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91586f0094.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc91586f0094.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_207/format,webp 300w" sizes="(max-width: 498px) 100vw, 498px" />
    </div>
  </div>
</div>

在这个基础上，还有另外一个话题值得再讨论一下，那就是微服务和 Serverless。

# 微服务和 Serverless

现在业界关于微服务和 Serverless，会有部分这样的认知：认为当前云计算典型代表技术是微服务，下一代的代表技术是 Serverless，这会让你 Serverless 比微服务要先进，甚至会觉得未来有了 Serverless 就没有微服务了，类似下面这张图：

<div class="image-package">
  <div class="image-container">
    <div class="image-container-fill">
      <img loading="lazy" class="alignnone wp-image-6469 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915970e27e.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915970e27e.png?x-oss-process=image/format,webp" alt="" width="539" height="250" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915970e27e.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915970e27e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_139/format,webp 300w" sizes="(max-width: 539px) 100vw, 539px" />
    </div>
  </div>
</div>

个人认为产生这一认知还是因为将 Serverless 的理念具象化到函数计算（FaaS）这样的产品。现在我们聊到微服务，会想到背后的技术框架，比如Spring Cloud、Dubbo，但是其实微服务这个词已经远远超出了纯技术框架的范畴，他背后也有核心的支撑思想，包括：

1 . 微服务虽然一定程度上增加了技术复杂度，但是在一定规模下他会降低系统复杂度和组织复杂度。

2 . 现代业务系统越来越复杂，很多业务系统会基于领域驱动设计（DDD）设计，微服务其实是DDD背后的支撑技术。

<div class="image-package">
  <div class="image-container">
    <div class="image-view" data-width="720" data-height="393">
      <p id="kQgMewo">
        <img loading="lazy" class="alignnone wp-image-6470 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915a0b3c7f.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915a0b3c7f.png?x-oss-process=image/format,webp" alt="" width="625" height="341" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915a0b3c7f.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fc915a0b3c7f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_164/format,webp 300w" sizes="(max-width: 625px) 100vw, 625px" />
      </p>
    </div>
  </div>
</div>

所以如果到了Serverless时代就没法用微服务，我相信很多开发者会觉得不知所措，或者会“抵触未来”，因为他们会觉得有人给我描绘了一个未来，但是完全不知道怎么走过去。

抛开各种具体的技术实现，回到背后的理念，Serverless代表的是一种无需关注服务器，降低使用云计算服务的理念，所以它和微服务其实不冲突，完全可以共存。在阿里云的SAE中，集成了微服务的能力（依托于阿里云产品MSE），这意味着：

1 . 部署在SAE这类Serverless平台上的应用，完全可以继续使用微服务开发，不需要经过任何改造。

2 . 在SAE上甚至提供了很多微服务能力增强，包括了注册中心托管、服务治理等等，进一步降低开发者使用微服务的门槛和负担。

<div class="image-package">
  <div class="image-container">
    <div class="image-view" data-width="720" data-height="331">
      <p id="KmKrlub">
        <img loading="lazy" width="1080" height="497" class="alignnone size-full wp-image-6502 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/format,webp 1080w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_138/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_368/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf202ce15.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_353/format,webp 768w" sizes="(max-width: 1080px) 100vw, 1080px" />
      </p>
    </div>
  </div>
</div>

所以在Serverless类的PaaS产品上，Serverless和微服务不再是对立的，开发者完全可以继续使用微服务技术开发，同时也可以享受Serverless理念所带来的【智能弹性】、【更低成本】等。

# 函数计算FC

讲完Serverless Application（应用），我们再来看看Serverless Function（函数），FC作为”根正苗红“的Serverless产品，相信大家都对他不陌生，经过这么些年的发展，它已经在前端Serverless、多媒体处理、AI、事件类的场景（云产品事件、数据库变更事件等等）、物联网消息等场景得到了很好的应用，甚至也有越来越多的公司将业务完全构建在FC之上，比如：世纪联华的 Serverless 实践。

另外针对早期的很多技术限制，现在也已经有了解决方案：

1 . 早期大多数的函数计算产品都对磁盘大小、代码包大小、运行时长、内存规格等有限制，阿里云函数计算推出了性能实例基本解决了这些限制。

2 . 针对冷启动问题，可以使用预留性能实例解决。

下面我们就具体介绍部分使用FC的典型的场景

###

# 前端Serverless

前端经过了Ajax、Nodejs、React等技术迭代后，已经形成了相对成熟的技术体系，特别是Nodejs，使前端和服务端产生了联系。

前端和后端的分工发挥了各个的优点，但是在协作的过程中也一直存在一个问题，后端同学通常是面向领域和服务提供接口，但是前端是面向用户具体的数据接口，有时候一个简单的需求会因为两边的定义和联调搞半天。所以也诞生了BFF（Backends For Frontends）这样一层，谁使用谁开发，专门解决领域模型 &#8211; UI 模型的转换。

<div class="image-package">
  <div class="image-container">
    <div class="image-view" data-width="720" data-height="501">
      <p id="DbaUZlo">
        <img loading="lazy" width="1080" height="751" class="alignnone size-full wp-image-6503 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/format,webp 1080w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_209/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_556/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf36a989b.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_534/format,webp 768w" sizes="(max-width: 1080px) 100vw, 1080px" />
      </p>
    </div>
  </div>
</div>

理想很美好，现实也很骨干，如果前端同学去做BFF这一层，发现要学习后端的DevOps、高可用、容量规划等等，这些其实是前端同学不想关心的，这种诉求在Serverless时代得到了很好的解决，由BFF变为了SFF（Serverless For Frontend）,让前端同学只要写几个 Function，其他都交给Serverless平台

类似的还有服务端渲染 SSR（Server Side Rendering），本来前后端分工后，后端只需要写接口，前端负责渲染，但是在SEO友好以及快速首屏渲染等需求背景下，有时候会用到服务端渲染的方案，同样，使用Serverless 前端同学又可以愉快的玩耍了。

其实现在很多偏前端产品里面（比如各类小程序以及语雀等产品），前端同学会全栈完成整体开发，越来越多的会用到Serverless相关技术

当然，要用好Serverless，需要完整的生态，包括相关的框架，运行时，工具链，配置规范等等，这方面可以参考阿里 Midway

###

## 多媒体处理

现在在线教育、直播、短视频等等行业都蓬勃发展，也催生了很多视频需求，包括视频的处理，包括视频剪辑、切分、组合、转码、分辨率调整、客户端适配等等，典型场景的比如：

每周五定期产生几百个 4G 以上的 1080P 大视频， 但是希望当天几个小时后全部处理完

甚至您有更高级的自定义处理需求，比如视频转码完成后， 需要记录转码详情到数据库， 或者在转码完成后， 自动将热度很高的视频预热到 CDN 上， 从而缓解源站压力。

这些诉求在Serverfull的场景下，你可能需要搭建一套复杂的系统来支撑，但是如果使用FC那么你会发现一切都变得那么简单。

<div class="image-package">
  <div class="image-container">
    <div class="image-view" data-width="720" data-height="413">
      <p id="sFZlypR">
        <img loading="lazy" width="1080" height="620" class="alignnone size-full wp-image-6504 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/format,webp 1080w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_172/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_459/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/12/img_5fcfaf44c3fb7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_441/format,webp 768w" sizes="(max-width: 1080px) 100vw, 1080px" />
      </p>
    </div>
  </div>
</div>

AI Serverless

AI Model Serving 是函数计算一个比较典型的应用场景。数据科学家训练好模型以后往往需要找软件工程师把模型变成系统或者服务，通常把这个过程称之为 Model Serving。函数计算无需运维和弹性伸缩的特性，正好符合数据科学家对高可用分布式系统的诉求。

# Serverless容器-ASK

Kubernetes作为生产级别的容器编排系统，现在已经成为了容器编排的事实标准，被广泛用于自动部署，扩展和管理容器化应用。它也有相应的Serverless Kubernetes产品，比如阿里云的ASK、AWS Fargate等。在这类产品中，你无需购买节点即可直接部署容器应用，无需对集群进行节点维护和容量规划，并且根据应用配置的CPU和内存资源量进行按需付费。ASK集群提供完善的 Kubernetes 兼容能力，同时降低了 Kubernetes 使用门槛，让您更专注于应用程序，而不是管理底层基础设施。

如果您是K8S的重度用户，那么使用Serverless Kubernetes是一个不错的选择，典型客户场景包括：

> 微博：在30s之内可以极速扩容500个应用实例，应对跨年活动和热点事件； 旷视科技：基于ASK开发智能、免运维的AI应用平台； 趣头条：基于ASK构建Serverless大数据计算平台。

# BaaS

上面提到的都是”计算类“Serverless产品，FC、SAE、ASK等，但是我们都知道，开发过程中不可能只有计算逻辑，还有很多其他依赖，比如存储、中间件等。BaaS(Backend-as-a-Service，后端即服务）类产品，提供基于API的服务，这些API一般都是按需使用、免运维、自动扩缩容的，所以他们也是Serverless的。

典型的比如阿里云的OSS，具有与平台无关的 RESTful API 接口，可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。

值得一提还有开发企业级应用时大家非常熟悉的中间件，以阿里为例当前也在进行4.0技术架构升级，全面BaaS化，统一运维、交付、计费、支持模式，开箱即用，产品化程度持续提升

# 总结

总结一下，上面提到的一系列Serverless的产品，覆盖了前端，后端，容器，BaaS各个领域，包括很多上面没有提到的（比如CDN）其实也算是Serverless的产品，所以我不认同伯克利的Serverless=BaaS+FaaS的观点，但是我非常认可他的另一个观点：“Serverless will dominate cloud computing”。

Serverless首先是一个理念，不是某一种具体的技术，当未来某一天，99%的云产品都有Serverless化的形态时，云计算也就Serverless化了，这种变化我认为不是非黑即白的，不是推翻重来这种革命性的，而是全面的降低用户使用云的成本，全面的提升开发者的研发效率。

# 参考 {.article-title}

[https://developer.aliyun.com/article/778541?utm\_content=g\_1000207513][2]

 [1]: https://developer.aliyun.com/article/707171
 [2]: https://developer.aliyun.com/article/778541?utm_content=g_1000207513
