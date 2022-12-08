---
title: 基于webcomponents的实现

---
## 什么是Micro Frontends？ {#what-are-micro-frontends}

**Micro Frontends**这个术语在2016年底首次出现在[ThoughtWorks技术雷达][1]中。它将微服务的概念扩展到[前端](https://www.w3cdoc.com)世界。目前的趋势是构建一个功能丰富且功能强大的[浏览器](https://www.w3cdoc.com)应用程序，即单页面应用程序，它位于微服务架构之上。随着时间的推移，[前端](https://www.w3cdoc.com)层通常由一个单独的团队开发，并且变得越来越难以维护。这就是[我们](https://www.w3cdoc.com)所说的[Frontend Monolith][2]。

Micro Frontends背后的想法是将网站或Web应用程序视为**独立团队**拥有**的功能组合**。每个团队都有一个**独特的业务**或**任务****领域，**它关注和专注。团队是**跨职能的**，从数据库到用户界面开发**端到端的**功能。

然而，这个想法并不新鲜，过去它的名称是[垂直系统][3]或[自包含系统][4]的[[前端](https://www.w3cdoc.com)集成][3]。但Micro Frontends显然是一个更友好，更笨重的术语。

**单片[前端](https://www.w3cdoc.com)** ![单片[前端](https://www.w3cdoc.com)][5]

**垂直组织** ![具有Micro Frontends的端到端团队][6]

## 什么是现代Web应用程序？ {#whats-a-modern-web-app}

在介绍中，我使用了“构建现代Web应用程序”这一短语。让[我们](https://www.w3cdoc.com)定义与该术语相关的假设。

为了更广泛地看待这一点，[Aral Balkan][7]撰写了一篇关于他称之为[Documents-to-Applications Continuum][8]的博客文章。他提出了滑动比例的概念，其中一个由**静态文档**构建的站点，通过链接连接**在左端**，一个纯粹的行为驱动，**无内容应用程序，**如在线照片编辑器**在右边**。

如果您将项目放在**此频谱**的**左侧**，则**在Web服务器级别**进行**集成**是一个不错的选择。使用此模型，服务器从构成用户请求的页面的所有组件中收集和**连接HTML字符串**。通过从服务器重新加载页面或通过ajax替换部分页面来完成更新。[Gustaf Nilsson Kotte][9]撰写了[一篇][10]关于这一主题的[综合文章][10]。

当您的用户界面必须提供**即时反馈时**，即使在不可靠的连接上，纯服务器渲染的站点也不再足够。要实现[Optimistic UI][11]或[Skeleton Screens等技术，][12]您还需要能够**在设备上****更新**UI 。Google的术语[Progressive Web Apps][13]恰当地描述了成为网络的良好公民（渐进增强）的**平衡行为**，同时还提供类似应用程序的性能。这种应用程序位于**site-app-continuum中间的**某个**位置**。这里仅基于服务器的解决方案已不再适用。[我们](https://www.w3cdoc.com)要搬家了**集成到[浏览器](https://www.w3cdoc.com)中**，这是本文的重点。

## Micro Frontends背后的核心理念 {#core-ideas-behind-micro-frontends}

* **技术不可知**  
    每个团队都应该能够选择并升级他们的筹码，而无需与其他团队协调。[自定义元素][14]是隐藏实现细节的好方法，同时为其他人提供中性界面。
* **隔离团队代码**  
    即使所有团队使用相同的框架，也不要共享运行时。构建自包含的独立应用程序。不要依赖共享的状态或全局变量。
* **建立团队前缀**  
    同意在无法实现隔离的命名约定。命名空间CSS，事件，本地存储和Cookie，以避免冲突并澄清所有权。
* **支持自定义API上的本机[浏览器](https://www.w3cdoc.com)功能**  
    使用[[浏览器](https://www.w3cdoc.com)事件进行通信，][15]而不是构建全局PubSub系统。如果您真的需要构建跨团队API，请尽量保持简单。
* **构建弹性站点**  
    即使JavaScript失败或尚未执行，您的功能也应该很有用。使用[通用渲染][16]和渐进增强来提高感知性能。

* * *

## DOM是API {#the-dom-is-the-api}

[自定义元素][17]（Web Components Spec的互操作性方面）是在[浏览器](https://www.w3cdoc.com)中集成的良好原语。每个团队建立他们的组件**使用他们所选择的网络技术**，并**把它包装自定义元素中**（如<order-minicart></order-minicart>）。此特定元素的DOM规范（标记名称，属性和事件）充当其他团队的合同或公共API。优点是他们可以使用组件及其功能，而无需了解实现。他们只需要能够与DOM交互。

但仅限定制元素并不是[我们](https://www.w3cdoc.com)所有需求的解决方案。为了解决渐进增强，通用渲染或路由问题，[我们](https://www.w3cdoc.com)需要额外的软件。

本页面分为两个主要区域。首先，[我们](https://www.w3cdoc.com)将讨论[页面组合][18] &#8211; 如何从不同团队拥有的组件中组装页面。之后，[我们](https://www.w3cdoc.com)将展示实现客户端[页面转换的][19]示例。

## 页面组成 {#page-composition}

除了在**不同框架**本身编写的代码的**客户端**和**服务器端**集成之外，还有许多应该讨论的副主题：**隔离js的**机制，**避免css冲突**，根据需要**加载资源**，在团队之间**共享公共资源**，处理**数据获取**并考虑用户的良好**加载状态**。[我们](https://www.w3cdoc.com)将一步一步地讨论这些主题。

### 基础原型 {#the-base-prototype}

该型号拖拉机商店的产品页面将作为以下示例的基础。

它具有一个**变量选择器**，可在三种不同的拖拉机型号之间切换。在更改产品图像时，将更新名称，价格和建议。还有一个**购买按钮**，可以将选定的变体添加到篮子中，并在顶部添加相应更新的**迷你篮子**。

[![示例0 - 产品页面 - Plain JS][20]][21]

[尝试在[浏览器](https://www.w3cdoc.com)][21]和[检查码][22]

所有HTML都是使用**纯JavaScript**和ES6模板字符串生成的客户端，**没有依赖项**。代码使用简单的状态/标记分离，并在每次更改时重新呈现整个HTML客户端 &#8211; 没有花哨的DOM差异，现在也**没有通用渲染**。也**没有团队分离** &#8211; [代码][22]写在一个js / css文件中。

### 客户整合 {#clientside-integration}

在此示例中，页面被拆分为由三个团队拥有的单独组件/片段。**Team Checkout**（蓝色）现在负责购买流程的所有事项 &#8211; 即**购买按钮**和**迷你购物篮**。**Team Inspire**（绿色）管理此页面上的**产品推荐**。页面本身由**Team Product**（红色）拥有。

[![示例1 - 产品页面 - 组合][23]][24]

[尝试在[浏览器](https://www.w3cdoc.com)][24]和[检查码][25]

**Team Product**决定包含哪些功能以及它在布局中的位置。该页面包含Team Product本身可以提供的信息，例如产品名称，图像和可用的变体。但它还包括来自其他团队的片段（自定义元素）。

### 如何创建自定义元素？ {#how-to-create-a-custom-element}

让[我们](https://www.w3cdoc.com)以**购买按钮**为例。团队产品包括简单地添加<blue-buy sku="t_porsche"></blue-buy>到标记中所需位置的按钮。为此，Team Checkout必须blue-buy在页面上注册元素。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
class BlueBuy extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button type="button">buy for 66,00 €</button>`;
  }
  disconnectedCallback() { ... }
}
window.customElements.define('blue-buy', BlueBuy);

```
  </div>
</div>

现在，每次[浏览器](https://www.w3cdoc.com)遇到新blue-buy标记时，都会调用构造函数。this是对自定义元素的根DOM节点的引用。所有属性和一个标准的DOM元素的方法等innerHTML或getAttribute()可被使用。

![行动中的自定义元素][26]

在命名元素时，规范定义的唯一要求是名称必须**包含短划线（ &#8211; ）**以保持与即将推出的新HTML标记的兼容性。在即将到来的示例中，使用命名约定[team_color]-[feature]。团队命名空间可以防止冲突，这样，只需查看DOM，就可以明显看出功能的所有权。

### 亲子沟通/ DOM修改 {#parent-child-communication--dom-modification}

当用户在**变量选择器中**选择另一个拖拉机时，**必须**相应**地更新购买按钮**。要实现此团队产品，只需从DOM中**删除**现有元素**并插入**新元素即可。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
container.innerHTML;
// => <blue-buy sku="t_porsche">...</blue-buy>
container.innerHTML = '<blue-buy sku="t_fendt"></blue-buy>';

```
  </div>
</div>

在disconnectedCallback旧元素被同步调用提供的元素与收拾东西像事件侦听器的机会。之后，调用constructor新创建的t_fendt元素。

另一个更高性能的选项是更新sku现有元素的属性。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
document.querySelector('blue-buy').setAttribute('sku', 't_fendt');

```
  </div>
</div>

如果Team Product使用了一个具有DOM差异的模板引擎，比如React，这将由算法自动完成。

![自定义元素属性更改][27]

为了支持这一点，Custom Element可以实现attributeChangedCallback并指定observedAttributes应该触发此回调的列表。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
const prices = {
  t_porsche: '66,00 €',
  t_fendt: '54,00 €',
  t_eicher: '58,00 €',
};

class BlueBuy extends HTMLElement {
  static get observedAttributes() {
    return ['sku'];
  }
  constructor() {
    super();
    this.render();
  }
  render() {
    const sku = this.getAttribute('sku');
    const price = prices[sku];
    this.innerHTML = `<button type="button">buy for ${price}</button>`;
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this.render();
  }
  disconnectedCallback() {...}
}
window.customElements.define('blue-buy', BlueBuy);

```
  </div>
</div>

为避免重复，render()引入了一个从constructor和调用的方法attributeChangedCallback。此方法收集所需数据，innerHTML收集新标记。当决定在Custom Element中使用更复杂的模板引擎或框架时，这就是它的初始化代码所在的位置。

### [浏览器](https://www.w3cdoc.com)支持 {#browser-support}

上面的示例使用了[Chrome，Safari和Opera][28]目前[支持][28]的Custom Element V1 Spec 。但是使用[document-register-element][29]，可以在所有[浏览器](https://www.w3cdoc.com)中使用轻量且经过实战考验的polyfill。在引擎盖下，它使用[广泛支持的][30] Mutation Observer API，因此在后台没有看到hacky DOM树。

### 框架兼容性 {#framework-compatibility}

由于自定义元素是Web标准，因此所有主要的JavaScript框架（如Angular，React，Preact，Vue或Hyperapp）都支持它们。但是当你了解细节时，在某些框架中仍然存在一些实现问题。在[自定义元素无处不在][31] [Rob Dodson][32]已经整合了一个兼容性测试套件，突出了未解决的问题。

### Child-Parent或Siblings Communication / DOM Events {#child-parent-or-siblings-communication--dom-events}

但传递属性对于所有交互来说都是不够的。在[我们](https://www.w3cdoc.com)的示例中，当用户**单击“购买”按钮**时，**迷你篮子应该刷新**。

这两个片段都由Team Checkout（蓝色）拥有，因此他们可以构建某种内部JavaScript API，让迷你篮子知道按下按钮的时间。但这需要组件实例相互了解，并且也会违反隔离。

更简洁的方法是使用PubSub机制，其中组件可以发布消息，而其他组件可以订阅特定主题。幸运的是，[浏览器](https://www.w3cdoc.com)内置了此功能。这是[浏览器](https://www.w3cdoc.com)究竟是如何的事件，如click，select或mouseover工作。除了本地事件之外，还可以创建更高级别的事件new CustomEvent(...)。事件始终与创建/分派的DOM节点相关联。大多数原生活动也有冒泡。这使得可以监听DOM的特定子树上的所有事件。如果要监听页面上的所有事件，请将事件侦听器附加到window元素。以下是blue:basket:changed示例中-event 的创建方式：

<div class="highlighter-rouge">
  <div class="highlight">
    ```
class BlueBuy extends HTMLElement {
  [...]
  connectedCallback() {
    [...]
    this.render();
    this.firstChild.addEventListener('click', this.addToCart);
  }
  addToCart() {
    // maybe talk to an api
    this.dispatchEvent(new CustomEvent('blue:basket:changed', {
      bubbles: true,
    }));
  }
  render() {
    this.innerHTML = `<button type="button">buy</button>`;
  }
  disconnectedCallback() {
    this.firstChild.removeEventListener('click', this.addToCart);
  }
}

```
  </div>
</div>

迷你篮子现在可以订阅此活动，window并在刷新数据时收到通知。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
class BlueBasket extends HTMLElement {
  connectedCallback() {
    [...]
    window.addEventListener('blue:basket:changed', this.refresh);
  }
  refresh() {
    // fetch new data and render it
  }
  disconnectedCallback() {
    window.removeEventListener('blue:basket:changed', this.refresh);
  }
}

```
  </div>
</div>

通过这种方法，迷你篮子片段为DOM元素添加了一个监听器，该元素超出了其范围（window）。这应该适用于许多应用程序，但如果您对此感到不舒服，您还可以实现一种方法，其中页面本身（Team Product）侦听事件并通过调用refresh()DOM元素通知迷你篮子。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
// page.js
const $ = document.getElementsByTagName;

$['blue-buy'](0).addEventListener('blue:basket:changed', function() {
  $['blue-basket'](0).refresh();
});

```
  </div>
</div>

命令式调用DOM方法非常罕见，但可以在[视频元素api中][33]找到。如果可能，应优先使用声明性方法（属性更改）。

## Serverside渲染/通用渲染 {#serverside-rendering--universal-rendering}

自定义元素非常适合在[浏览器](https://www.w3cdoc.com)中集成组件。但是，当构建可在Web上访问的站点时，初始加载性能很可能很重要，并且用户将看到白屏，直到所有js框架被下载并执行。此外，如果JavaScript失败或被阻止，最好考虑网站会发生什么。[Jeremy Keith][34]解释了他的电子书/播客[弹性网页设计][35]的重要性。因此，在服务器上呈现核心内容的能力是关键。遗憾的是，Web组件规范根本没有讨论服务器渲染。没有JavaScript，没有自定义元素:(

### 自定义元素+服务器端包含=&#x2764;&#xfe0f; {#custom-elements--server-side-includes--&#xfe0f;}

要使服务器呈现工作，前面的示例将被重构。每个团队都有自己的快速服务器，render()也可以通过URL访问自定义元素的方法。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
$ curl http://127.0.0.1:3000/blue-buy?sku=t_porsche
<button type="button">buy for 66,00 €</button>

```
  </div>
</div>

自定义元素标记名称用作路径名称 &#8211; 属性成为查询参数。现在有一种方法来服务器呈现每个组件的内容。与<blue-buy>-Custom Elements 结合使用可以实现与**Universal Web Component**非常接近的东西：

<div class="highlighter-rouge">
  <div class="highlight">
    ```
<blue-buy sku="t_porsche">
  <!--#include virtual="/blue-buy?sku=t_porsche" -->
</blue-buy>

```
  </div>
</div>

该#include注释是[Server Side Includes的][36]一部分，这是大多数Web服务器中都可用的功能。是的，这与将当前日期嵌入[我们](https://www.w3cdoc.com)网站的日子所使用的技术相同。还有一些替代技术，如[ESI][37]，[nodesi][38]，[compoxure][39]和[tailor][40]，但对于[我们](https://www.w3cdoc.com)的项目，SSI已经证明自己是一个简单且非常稳定的解决方案。

该#include评论被替换的响应/blue-buy?sku=t_porsche之前，Web服务器发送完整的网页[浏览器](https://www.w3cdoc.com)。nginx中的配置如下所示：

<div class="highlighter-rouge">
  <div class="highlight">
    ```
upstream team_blue {
  server team_blue:3001;
}
upstream team_green {
  server team_green:3002;
}
upstream team_red {
  server team_red:3003;
}

server {
  listen 3000;
  ssi on;

  location /blue {
    proxy_pass  http://team_blue;
  }
  location /green {
    proxy_pass  http://team_green;
  }
  location /red {
    proxy_pass  http://team_red;
  }
  location / {
    proxy_pass  http://team_red;
  }
}

```
  </div>
</div>

该指令ssi: on;启用S​​SI功能，upstream并location为每个团队添加一个和块，以确保所有以其开头的URL /blue将路由到正确的应用程序（team_blue:3001）。此外，/路线映射到团队红色，这是控制主页/产品页面。

此动画在**禁用了JavaScript**的[浏览器](https://www.w3cdoc.com)中显示拖拉机商店。

[![Serverside渲染 - 禁用JavaScript][41]][42]

[检查代码][43]

变体选择按钮现在是实际链接，每次单击都会导致重新加载页面。右侧的终端说明了如何将页面请求路由到团队红色的过程，该团队控制产品页面，之后标记由蓝色和绿色团队的片段补充。

重新打开JavaScript时，只能看到第一个请求的服务器日志消息。所有后续的拖拉机更换都在客户端进行处理，就像第一个例子中一样。在后面的示例中，将从JavaScript中提取产品数据，并根据需要通过REST API加载。

您可以在本地计算机上使用此示例代码。只需要安装[Docker Compose][44]。

<div class="highlighter-rouge">
  <div class="highlight">
    ```
git clone https://github.com/neuland/micro-frontends.git
cd micro-frontends/2-composition-universal
docker-compose up --build

```
  </div>
</div>

Docker然后在端口3000上启动nginx并为每个团队构建node.js映像。当您在[浏览器](https://www.w3cdoc.com)中打开[http://127.0.0.1:3000/时][45]，您会看到一个红色拖拉机。组合日志docker-compose可以轻松查看网络中发生的情况。可悲的是，没有办法控制输出颜色，所以你必须忍受团队蓝色可能以绿色突出显示的事实:)

这些src文件将映射到各个容器中，当您进行代码更改时，节点应用程序将重新启动。更改nginx.conf需要重新启动docker-compose才能生效。所以随意摆弄并提供反馈。

### 数据获取和加载状态 {#data-fetching--loading-states}

SSI / ESI方法的缺点是，**最慢的片段决定**了整个页面**的响应时间**。因此，当片段的响应可以被缓存时，它是好的。对于生产成本高且难以缓存的片段，通常最好将它们从初始渲染中排除。它们可以在[浏览器](https://www.w3cdoc.com)中异步加载。在[我们](https://www.w3cdoc.com)的示例中green-recos，显示个性化推荐的片段是此的候选者。

一个可能的解决方案是红队刚刚跳过SSI Include。

**之前**

<div class="highlighter-rouge">
  <div class="highlight">
    ```
<green-recos sku="t_porsche">
  <!--#include virtual="/green-recos?sku=t_porsche" -->
</green-recos>

```
  </div>
</div>

**后**

<div class="highlighter-rouge">
  <div class="highlight">
    ```
<green-recos sku="t_porsche"></green-recos>

```
  </div>
</div>

_重要说明：自定义元素[不能自动关闭][46]，因此写入<green-recos sku="t_porsche" />无法正常工作。_

![回流][47]

渲染仅在[浏览器](https://www.w3cdoc.com)中进行。但是，正如在动画中可以看到的，这种变化现在引入了页面的**大量回流**。推荐区域最初为空白。团队绿色JavaScript已加载并执行。用于获取个性化推荐的API调用。呈现推荐标记并请求相关图像。片段现在需要更多空间并推动页面布局。

有不同的选择可以避免像这样烦人的回流。控制页面的团队红色可以**固定推荐容器的高度**。在响应式网站上，确定高度通常很棘手，因为不同屏幕尺寸可能会有所不同。但更重要的问题是，**这种团队间协议**在红色和绿色团队之间**产生紧密联系**。如果团队绿色想要在reco元素中引入额外的子标题，则必须在新高度上与团队红色协调。两个团队都必须同时推出他们的更改，以避免布局中断。

更好的方法是使用称为[Skeleton Screens][48]的技术。红队留下green-recosSSI包含在标记中。另外，team green更改其片段的**服务器端呈现方法**，以便生成内容的**原理图版本**。该**骷髅标记**可以重用的实际内容的布局样式的部分。这样它就可以**保留所需的空间**，实际内容的填充不会导致跳跃。

![骨架屏幕][49]

骨架屏幕**对于客户端渲染**也**非常有用**。当您的自定义元素由于用户操作而插入DOM时，它可以**立即呈现骨架，**直到它需要从服务器获取的数据到达。

即使在_变量选择_等**属性更改时**，您也可以决定切换到骨架视图，直到新数据到达为止。这样，用户就可以获得片段中正在发生的事情的指示。但是当你的终端快速响应时，旧数据和新数据之间的短**骨架闪烁**也可能很烦人。保留旧数据或使用智能超时可能会有所帮助。因此，明智地使用此技术并尝试获得用户反馈。

原文：https://micro-frontends.org/

 [1]: https://www.thoughtworks.com/radar/techniques/micro-frontends
 [2]: https://www.youtube.com/watch?v=pU1gXA0rfwc
 [3]: https://dev.otto.de/2014/07/29/scaling-with-microservices-and-vertical-decomposition/
 [4]: http://scs-architecture.org/
 [5]: https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png
 [6]: https://micro-frontends.org/ressources/diagrams/organisational/verticals-headline.png
 [7]: https://ar.al/
 [8]: https://ar.al/notes/the-documents-to-applications-continuum/
 [9]: https://twitter.com/gustaf_nk/
 [10]: https://gustafnk.github.io/microservice-websites/
 [11]: https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/
 [12]: http://www.lukew.com/ff/entry.asp?1797
 [13]: https://developers.google.com/web/progressive-web-apps/
 [14]: https://micro-frontends.org/#the-dom-is-the-api
 [15]: https://micro-frontends.org/#parent-child-communication--dom-modification
 [16]: https://micro-frontends.org/#serverside-rendering--universal-rendering
 [17]: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 [18]: https://micro-frontends.org/#page-composition
 [19]: https://micro-frontends.org/#page-transition
 [20]: https://micro-frontends.org/ressources/video/model-store-0.gif
 [21]: https://micro-frontends.org/0-model-store/
 [22]: https://github.com/neuland/micro-frontends/tree/master/0-model-store
 [23]: https://micro-frontends.org/ressources/screen/three-teams.png
 [24]: https://micro-frontends.org/1-composition-client-only/
 [25]: https://github.com/neuland/micro-frontends/tree/master/1-composition-client-only
 [26]: https://micro-frontends.org/ressources/video/custom-element.gif
 [27]: https://micro-frontends.org/ressources/video/custom-element-attribute.gif
 [28]: http://caniuse.com/#feat=custom-elementsv1
 [29]: https://github.com/WebReflection/document-register-element
 [30]: http://caniuse.com/#feat=mutationobserver
 [31]: https://custom-elements-everywhere.com/
 [32]: https://twitter.com/rob_dodson
 [33]: https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Controlling_media_playback
 [34]: https://adactio.com/
 [35]: https://resilientwebdesign.com/
 [36]: https://en.wikipedia.org/wiki/Server_Side_Includes
 [37]: https://en.wikipedia.org/wiki/Edge_Side_Includes
 [38]: https://github.com/Schibsted-Tech-Polska/nodesi
 [39]: https://github.com/tes/compoxure
 [40]: https://github.com/zalando/tailor
 [41]: https://micro-frontends.org/ressources/video/server-render.gif
 [42]: https://micro-frontends.org/ressources/video/server-render.mp4
 [43]: https://github.com/neuland/micro-frontends/tree/master/2-composition-universal
 [44]: https://docs.docker.com/compose/install/
 [45]: http://127.0.0.1:3000/
 [46]: https://developers.google.com/web/fundamentals/architecture/building-components/customelements#jsapi
 [47]: https://micro-frontends.org/ressources/video/data-fetching-reflow.gif
 [48]: https://blog.prototypr.io/luke-wroblewski-introduced-skeleton-screens-in-2013-through-his-work-on-the-polar-app-later-fd1d32a6a8e7
 [49]: https://micro-frontends.org/ressources/video/data-fetching-skeleton.gif
