---
title: MVP模型
weight: 10
---
## 什么是 MVP {#toc-1}

MVP （最小化可实行产品，Minimum Viable Product）是 Eric Ries 在《精益创业》中关于「精益创业」（Lean Startup）的核心思想，意思是用最快、最简明的方式建立一个可用的产品原型，通过这个最简单的原型来测试产品是否符合市场预期，并通过不断的快速迭代来修正产品，最终适应市场需求。

简单来说，就是在做一个新产品的时候，不要一下子做一个「尽善尽美」的产品，而是先花费最小的代价做一个「可用」的产品原型，去验证这个产品是否有价值、是否可行，再通过迭代来完善细节。

![](/images/posts/2022-12-27-21-00-29.png)

这是一张在网上流传很广泛的用来介绍 MVP 的图：

> 假如你的产品愿景是一种高级出行工具，比如小轿车。传统的产品设计思路是一步一步，从车轮、车轱辘、外壳、动力装置、内部装饰一个流程一个流程做起，最后得到一个完善的产品。而MVP的思路，[我们](https://www.w3cdoc.com)可能会先做一个小滑板车或者自行车，看看用户对出行工具的认可程度。如果用户认可[我们](https://www.w3cdoc.com)的产品概念，[我们](https://www.w3cdoc.com)可以接下去生产更加高级、完善的摩托车、甚至小轿车。
>
> 传统产品迭代思路成本高、速度慢、风险大，花高成本做出来的产品用户可能不认可；MVP 策略的优点在于试错成本低、速度快、风险低，能满足产品快速迭代的需求。

## 为什么要做 MVP {#toc-2}

MVP 的作用就是让你用最小的代价，最快的速度，最早的时间将你的产品设想拿出来接触用户，并根据用户的反馈来改进你的产品。这里拿出来的「产品」并不一定是一个App、网页或者其他，可以是视频、PPT（额，但是千万别 PPT 造车啊）、RP文件等等。

[我们](https://www.w3cdoc.com)知道，在产品只是个原型的时候基本上很难来说服用户和VC，因为缺少任何一部分都对体验大打折扣。那么[大家](https://www.w3cdoc.com)可以参考 Dropbox 的 MVP ，看看 Dropbox 的创始人 Drew 是怎么做的：他做了一个视频放在了 YouTube 上，这段视频介绍了 Dropbox 的各项功能，Beta 版的等待用户（Email list）一夜之间从5000暴增到75000，可当时 Dropbox 甚至连实际的产品都还没有。

[大家](https://www.w3cdoc.com)可以去这里观看：<a href="http://zhangsubo.cn/goto/vpzb" target="_blank" rel="nofollow noopener noreferrer">Dropbox MVP 视频</a>

这有一个好处，就是避免[我们](https://www.w3cdoc.com)「闭门造车」，空想没人要的产品却自认为会大有市场。

## 怎么去做 MVP {#toc-3}

在做我司那个基于区块链系统的内部福利工具的过程中，我梳理了做 MVP 的思路和几个关键点.

### NO.1 找出你要为谁解决什么问题

产品是用来解决问题，而不是来创造问题的。一个成功的 MVP 产品的第一步就是要明确客户/用户为什么需要这个产品？这个产品如何帮助客户/用户解决问题。

明确这些问题，有利于确定产品的主要目标，并为未来受众的实际需求找到最佳的解决方案。

在我的这个项目中，主要是1.我司对于区块链技术的实际转化和落地。2.解决我司福利部门如何在成本不变的情况下更好的通过「发福利」来激励员工。

基于这两个目标，[我们](https://www.w3cdoc.com)制定了一个方向：通过区块链技术发行内部代币（我司内部成为「福励币」），福利部门向用户（优秀员工）发放「福励币」，用户可以通过「福励币」来购买零食、书籍甚至假期。

### NO.2 分析市场上的竞品

如果市场上已经有了类似的产品，显然[我们](https://www.w3cdoc.com)需要对竞品进行分析。但是有的时候[我们](https://www.w3cdoc.com)会因为对产品独特性的信任而忽略一些非直接的竞争对手，比如我在做「福励币」项目的时候就险些忽略了市场上已经有的很多企业福利平台，虽然他们并不是基于区块链技术。

除了搜索引擎和一些数据工具（App Annie、酷传之类），还有一个很好的渠道来了解竞品，那就是潜伏到竞品的客户群里，直接分析客户对竞品的反馈，从而了解现有产品的缺陷，择其善者而从之，不善者而改之。

一旦[我们](https://www.w3cdoc.com)确定了需要解决的核心问题，并分析了市场上的产品（竞品）的缺陷，[我们](https://www.w3cdoc.com)就可以继续进行下一步——分析产品的主流程。

### NO.3 分析产品主流程

要分析用户主流程，[我们](https://www.w3cdoc.com)应该先梳理用户大的使用阶段。实际上操作起来非常简单，因为只需要把用户如何使用产品达成产品的主要目标所需要的步骤找出来即可。这时候[我们](https://www.w3cdoc.com)需要多考虑一些基础功能，少考虑一些魅力型功能。因为基础功能是你的最终用户实际使用产品时都会（大部分会）遇到的，也是实现产品目标最基础的保证。

### NO.4 列出所有必要功能，排出优先级

分析完产品主流程，[我们](https://www.w3cdoc.com)可以对每一个主流程阶段进行细分，对需求进行整理——将不在主流程的需求干掉，并列出每一个主流程阶段所的需求，并排除优先级。这时候涉及到「需求管理」的一些方法——比如 KANO 模型、价值 vs 复杂度矩阵。

另外[大家](https://www.w3cdoc.com)可以通过几个问题来处理需求：

  1. 你最希望用户完成的操作是什么？
  2. 你还想为用户提供什么服务？（这时候，可以把所有你想要的需求列一个 list,然后多问自己几个为什么需要这个需求，自己回答不上来或者不符合第一个问题的就从这个需求 list 里划掉）
  3. 这时候剩下了「必须要有的功能」、「有的话最好的功能」和「有没有都行的功能」，画个矩阵吧，用我之前介绍过的「价值 vs 复杂度矩阵」，来确定一下需求的优先级。
  4. 如果你确定了所有的优先级，则可以根据你的资源、时间来为你的产品第一个版本划定一个范围，并开始基于 MVP 的产品开发。

### NO.5 验证和迭代

在完成 MVP 产品开发之后，[我们](https://www.w3cdoc.com)需要尽快将其推向市场，让市场来验证你的项目，同时接收用户的反馈。因为只有从市场上你才能发现你的产品缺少了哪些功能或者多了哪些无关紧要甚至是累赘的功能。收集用户反馈之后，你可以用 MVP 的思想去改进、迭代、收集反馈，再次改进、迭代、收集反馈，形成一个循环，周而复始。

![](/images/posts/2022-12-27-21-01-09.png)

## 总结一些使用 MVP 思想时的一些感悟：

### 1. 关于需求

对于需求的把控，[我们](https://www.w3cdoc.com)需要根据产品要解决的核心目标，提炼主要矛盾，善于抓重点，集中力量解决主要需求。同时 MVP 的思想在于「快」，对于需求文档应该尽量快（但不是不要质量）的去完成，传统 word 版的 PRD 很难高效率的去完成，目前我司对于需要较快时间完成的项目一般采取 Axure 标注 + 思维导图、流程图等形式完成。

### 2. 关于验证

MVP 一定要做验证，UX设计软件UXpin的负责人Christopher Bank发表在TNW的文章为[我们](https://www.w3cdoc.com)提供了测试MVP的15条方法。  
我则会使用以下三点：

**1. 用户访谈：**通过各种途径去和你的「真实」用户沟通，向他们解释你的产品解决了他的什么需求，然后询问他们对于你产品的不同部分的重要性是如何排序的。根据收集到的信息再对产品进行调整。需要注意的是，用户访谈应该着眼于发现问题和解决问题，而不是向受访者推销产品。

**2. 数据验证：**我一直认为数据是最有说服力（虽然[大家](https://www.w3cdoc.com)都会寻找对自己最有利的数据来支持自己的观点），通过数据埋点和数据分析（比如漏斗分析），[我们](https://www.w3cdoc.com)可以很清楚的看到用户在产品使用过程中的流失，并对流失原因进行猜测，将猜测方案在下次迭代中进行体现，并通过数据去验证[我们](https://www.w3cdoc.com)的猜测正确与否，[我们](https://www.w3cdoc.com)的方案是否有效。因此我也一直在推动公司内部数据分析的项目。

**3. 使用马甲包：**市场是残酷的，有可能出现你的第一版产品并不适应市场，甚至与市场完全相反。随着口耳相传，你的项目极有可能会被打上「不好用」、「失败产品」的标签，从而增加你获取用户的难度。其实可以采用主产品+马甲包的形式，通过马甲包来测试用户的反馈，将成功的迭代加入到主产品中。马甲不成功就果断丢掉，这有点像 ABtest, 但是比 ABtest 更适合创业公司或者积累用户阶段的产品。

### 3.关于迭代

迭代一定是还是 MVP ，突出「速度快」和「代价小」，通过控制一个版本的需求量来加速版本迭代速度。同时合理的需求量也有助于开发团队可以高质量的完成工作。目前我的需求迭代排期一般按照「价值 vs 复杂度矩阵」来对进行。

### 4.适用范围

正如没有一种药可以包治百病， MVP 也并不是完全适用于所有的产品。它的优势在于快速验证未知的市场，帮助公司以较低的产品快速试错，更适合于业务属性和行业门槛不是很强的to c 市场。而to B 市场一般有着成熟的业务体系，并不需要花费时间来试错，因此并不需要 MV模型
