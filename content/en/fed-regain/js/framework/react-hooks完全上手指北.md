---
title: React Hooks完全上手指北


date: 2019-08-06T13:48:10+00:00
url: /fed-regain/4892.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png
fifu_image_alt:
  - 自动草稿
like:
  - 3
views:
  - 1421


---
## Why Hooks? {#KwUmS}

### Class Component设计理论 {#VruRj}

React以一种全新的编程范式定义了前端开发约束，它为视图开发带来了一种全新的心智模型：

  * React认为，UI视图是数据的一种视觉映射，即`UI = F(DATA)`，这里的`F`需要负责**对输入数据进行加工、并对数据的变更做出响应**
  * 公式里的`F`在React里抽象成组件，React是**以组件为粒度编排应用**的，组件是代码复用的最小单元
  * 在设计上，React采用`props`属性来接收外部的数据，使用`state`属性来管理组件自身产生的数据（状态），而为了实现（运行时）对数据变更做出响应需要，React**采用基于类（Class）的组件设计**！
  * 除此之外，React认为**组件是有生命周期**的，因此开创性地将生命周期的概念引入到了组件设计，从组件的create到destory提供了一系列的API供开发者使用

这就是React组件设计的理论基础，我们最熟悉的React组件一般长这样：

<div id="8zdrB" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20React%E5%9F%BA%E4%BA%8EClass%E8%AE%BE%E8%AE%A1%E7%BB%84%E4%BB%B6%5Cnclass%20MyConponent%20extends%20React.Component%20%7B%5Cn%20%20%2F%2F%20%E7%BB%84%E4%BB%B6%E8%87%AA%E8%BA%AB%E4%BA%A7%E7%94%9F%E7%9A%84%E6%95%B0%E6%8D%AE%5Cn%5Ctstate%20%3D%20%7B%5Cn%20%20%5Ctcounts%3A%200%5Cn%20%20%7D%5Cn%5Ct%5Cn%5Ct%2F%2F%20%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE%E5%8F%98%E6%9B%B4%5Cn%5CtclickHandle%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%5Ctthis.setState(%7B%20counts%3A%20this.state.counts%2B%2B%20%7D)%3B%5Cn%20%20%20%20if%20(this.props.onClick)%20this.props.onClick()%3B%5Cn%20%20%7D%5Cn%20%20%5Cn%20%20%2F%2F%20lifecycle%20API%5Cn%20%20componentWillUnmount()%20%7B%5Cn%20%20%5Ctconsole.log('Will%20mouned!')%3B%5Cn%20%20%7D%5Cn%20%20%5Ct%5Cn%5Ct%2F%2F%20lifecycle%20API%5Cn%20%20componentDidMount()%20%7B%5Cn%20%20%5Ctconsole.log('Did%20mouned!')%3B%5Cn%20%20%7D%5Cn%5Ct%5Cn%5Ct%2F%2F%20%E6%8E%A5%E6%94%B6%E5%A4%96%E6%9D%A5%E6%95%B0%E6%8D%AE%EF%BC%88%E6%88%96%E5%8A%A0%E5%B7%A5%E5%A4%84%E7%90%86%EF%BC%89%EF%BC%8C%E5%B9%B6%E7%BC%96%E6%8E%92%E6%95%B0%E6%8D%AE%E5%9C%A8%E8%A7%86%E8%A7%89%E4%B8%8A%E7%9A%84%E5%91%88%E7%8E%B0%5Cn%5Ctrender(props)%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%5Ct%3C%3E%5Cn%20%20%20%20%20%20%5Ct%3Cdiv%3EInput%20content%3A%20%7Bprops.content%7D%2C%20btn%20click%20counts%3A%20%7Bthis.state.counts%7D%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%20onClick%3D%7Bthis.clickHandle%7D%3EAdd%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3C%2F%3E%5Cn%20%20%20%20)%3B%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%228zdrB%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// React基于Class设计组件</span>
<span class="cm-keyword">class</span> <span class="cm-def">MyConponent</span> <span class="cm-keyword">extends</span> <span class="cm-variable">React</span>.<span class="cm-property">Component</span> {
  <span class="cm-comment">// 组件自身产生的数据</span>
  <span class="cm-property">state</span> <span class="cm-operator">=</span> {
    <span class="cm-property">counts</span>: <span class="cm-number"></span>
  }
  
  <span class="cm-comment">// 响应数据变更</span>
  <span class="cm-variable">clickHandle</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">this</span>.<span class="cm-property">setState</span>({ <span class="cm-property">counts</span>: <span class="cm-keyword">this</span>.<span class="cm-property">state</span>.<span class="cm-property">counts</span><span class="cm-operator">++</span> });
    <span class="cm-keyword">if</span> (<span class="cm-keyword">this</span>.<span class="cm-property">props</span>.<span class="cm-property">onClick</span>) <span class="cm-keyword">this</span>.<span class="cm-property">props</span>.<span class="cm-property">onClick</span>();
  }
  
  <span class="cm-comment">// lifecycle API</span>
  <span class="cm-variable">componentWillUnmount</span>() {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Will mouned!'</span>);
  }
    
  <span class="cm-comment">// lifecycle API</span>
  <span class="cm-variable">componentDidMount</span>() {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Did mouned!'</span>);
  }
  
  <span class="cm-comment">// 接收外来数据（或加工处理），并编排数据在视觉上的呈现</span>
  <span class="cm-variable">render</span>(<span class="cm-variable">props</span>) {
    <span class="cm-keyword">return</span> (
      <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">Input</span> <span class="cm-variable">content</span>: {<span class="cm-variable">props</span>.<span class="cm-variable">content</span>}, <span class="cm-variable">btn</span> <span class="cm-variable">click</span> <span class="cm-variable">counts</span>: {<span class="cm-keyword">this</span>.<span class="cm-property">state</span>.<span class="cm-property">counts</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-property">this</span>.<span class="cm-variable">clickHandle</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">Add</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
    );
  }
}</pre>
    </div>
  </div>
</div>

### Class Component的问题 {#8Ic9i}

#### 组件复用之困 {#dGw33}

组件并不是单纯的信息孤岛，组件之间是可能会产生联系的，一方面是数据的共享，另一个是功能的复用：

  * 对于组件之间的数据共享问题，React官方采用单向数据流（Flux）来解决
  * 对于（有状态）组件的复用，React团队给出过许多的方案，早期使用CreateClass + Mixins，在使用Class Component取代CreateClass之后又设计了`render-props`和`Higher-Order Components`，直到再后来的Function Class + Hooks设计，React团队对于组件复用的探索一直没有停止

HOC使用的问题：

  * 嵌套地狱，每一次HOC调用都会产生一个组件实例
  * 可以使用类装饰器缓解组件嵌套带来的可维护性问题，但装饰器本质上还是HOC
  * 包裹太多层级之后，可能会带来props属性的覆盖问题

renderProps的问题：

  * 数据流向更直观
  * 渲染的不是React组件，因此没有`props`属性，即不能像HOC那样访问`this.props.children`
  * 引入了callback hell问题

<p id="lXbCDOH">
  <img loading="lazy" class="alignnone  wp-image-4899 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/format,webp" alt="" width="405" height="638" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/format,webp 996w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/quality,q_50/resize,m_fill,w_190,h_300/format,webp 190w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_1211/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984dd26062.png?x-oss-process=image/quality,q_50/resize,m_fill,w_381,h_600/format,webp 381w" sizes="(max-width: 405px) 100vw, 405px" />
</p>

（图片来自React官方示例）

#### Javascript `Class`的缺陷 {#tKqVD}

1、`this`的指向（语言缺陷）

<div id="lxAgj" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22class%20People%20extends%20Component%20%7B%5Cn%5Ctstate%20%3D%20%7B%5Cn%20%20%5Ctname%3A%20'dm'%2C%5Cn%20%20%20%20age%3A%2018%2C%5Cn%20%20%7D%5Cn%5Cn%5CthandleClick(e)%20%7B%5Cn%20%20%20%20%2F%2F%20%E6%8A%A5%E9%94%99%EF%BC%81%5Cn%20%20%5Ctconsole.log(this.state)%3B%5Cn%20%20%7D%5Cn%5Cn%5Ctrender()%20%7B%5Cn%20%20%20%20const%20%7B%20name%2C%20age%20%7D%20%3D%20this.state%3B%5Cn%20%20%5Ctreturn%20(%3Cdiv%20onClick%3D%7Bthis.handleClick%7D%3EMy%20name%20is%20%7Bname%7D%2C%20i%20am%20%7Bage%7D%20years%20old.%3C%2Fdiv%3E)%3B%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22lxAgj%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">class</span> <span class="cm-def">People</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">state</span> <span class="cm-operator">=</span> {
    <span class="cm-property">name</span>: <span class="cm-string">'dm'</span>,
    <span class="cm-property">age</span>: <span class="cm-number">18</span>,
  }

  <span class="cm-variable">handleClick</span>(<span class="cm-variable">e</span>) {
    <span class="cm-comment">// 报错！</span>
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-keyword">this</span>.<span class="cm-property">state</span>);
  }

  <span class="cm-variable">render</span>() {
    <span class="cm-keyword">const</span> { <span class="cm-def">name</span>, <span class="cm-def">age</span> } <span class="cm-operator">=</span> <span class="cm-keyword">this</span>.<span class="cm-property">state</span>;
    <span class="cm-keyword">return</span> (<span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-keyword">this</span>.<span class="cm-variable">handleClick</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">My</span> <span class="cm-variable">name</span> <span class="cm-variable">is</span> {<span class="cm-variable">name</span>}, <span class="cm-variable">i</span> <span class="cm-variable">am</span> {<span class="cm-variable">age</span>} <span class="cm-variable">years</span> <span class="cm-variable">old</span>.<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;);</span>
  }
}</pre>
    </div>
  </div>
</div>

createClass不需要处理this的指向，到了Class Component稍微不慎就会出现this的指向报错。

2、编译问题：

<div id="MlciC" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20Class%20Component%5Cnclass%20App%20extends%20Component%20%7B%5Cn%20%20state%20%3D%20%7B%5Cn%20%20%20%20count%3A%200%5Cn%20%20%7D%5Cn%5Cn%20%20componentDidMount()%20%7B%5Cn%20%20%20%20console.log('Did%20mount!')%3B%5Cn%20%20%7D%5Cn%5Cn%20%20increaseCount%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20this.setState(%7B%20count%3A%20this.state.count%20%2B%201%20%7D)%3B%5Cn%20%20%7D%5Cn%5Cn%20%20decreaseCount%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%20%20this.setState(%7B%20count%3A%20this.state.count%20-%201%20%7D)%3B%5Cn%20%20%7D%5Cn%5Cn%20%20render()%20%7B%5Cn%20%20%20%20return%20(%5Cn%20%20%20%20%20%20%3C%3E%5Cn%20%20%20%20%20%20%20%20%3Ch1%3ECounter%3C%2Fh1%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3ECurrent%20count%3A%20%7Bthis.state.count%7D%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%20%20%3Cp%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bthis.increaseCount%7D%3EIncrease%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7Bthis.decreaseCount%7D%3EDecrease%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3C%2Fp%3E%5Cn%20%20%20%20%20%20%3C%2F%3E%5Cn%20%20%20%20)%3B%5Cn%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%20Function%20Component%5Cnfunction%20App()%20%7B%5Cn%20%20const%20%5B%20count%2C%20setCount%20%5D%20%3D%20useState(0)%3B%5Cn%20%20const%20increaseCount%20%3D%20()%20%3D%3E%20setCount(count%20%2B%201)%3B%5Cn%20%20const%20decreaseCount%20%3D%20()%20%3D%3E%20setCount(count%20-%201)%3B%5Cn%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%20%20console.log('Did%20mount!')%3B%5Cn%20%20%7D%2C%20%5B%5D)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3C%3E%5Cn%20%20%20%20%20%20%3Ch1%3ECounter%3C%2Fh1%3E%5Cn%20%20%20%20%20%20%3Cdiv%3ECurrent%20count%3A%20%7Bcount%7D%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%3Cp%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7BincreaseCount%7D%3EIncrease%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7BdecreaseCount%7D%3EDecrease%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3C%2Fp%3E%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22MlciC%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// Class Component</span>
<span class="cm-keyword">class</span> <span class="cm-def">App</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">state</span> <span class="cm-operator">=</span> {
    <span class="cm-property">count</span>: <span class="cm-number"></span>
  }

  <span class="cm-variable">componentDidMount</span>() {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Did mount!'</span>);
  }

  <span class="cm-variable">increaseCount</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">this</span>.<span class="cm-property">setState</span>({ <span class="cm-property">count</span>: <span class="cm-keyword">this</span>.<span class="cm-property">state</span>.<span class="cm-property">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span> });
  }

  <span class="cm-variable">decreaseCount</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">this</span>.<span class="cm-property">setState</span>({ <span class="cm-property">count</span>: <span class="cm-keyword">this</span>.<span class="cm-property">state</span>.<span class="cm-property">count</span> <span class="cm-operator">-</span> <span class="cm-number">1</span> });
  }

  <span class="cm-variable">render</span>() {
    <span class="cm-keyword">return</span> (
      <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">h1</span><span class="cm-operator">&gt;</span><span class="cm-variable">Counter</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/h1&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">Current</span> <span class="cm-variable">count</span>: {<span class="cm-keyword">this</span>.<span class="cm-variable">state</span>.<span class="cm-variable">count</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">p</span><span class="cm-operator">&gt;</span>
          <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-property">this</span>.<span class="cm-variable">increaseCount</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">Increase</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
          <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-property">this</span>.<span class="cm-variable">decreaseCount</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">Decrease</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-string-2">/p&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
    );
  }
}

<span class="cm-comment">// Function Component</span>
<span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [ <span class="cm-def">count</span>, <span class="cm-def">setCount</span> ] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number"></span>);
  <span class="cm-keyword">const</span> <span class="cm-def">increaseCount</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> <span class="cm-variable-2">setCount</span>(<span class="cm-variable-2">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>);
  <span class="cm-keyword">const</span> <span class="cm-def">decreaseCount</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> <span class="cm-variable-2">setCount</span>(<span class="cm-variable-2">count</span> <span class="cm-operator">-</span> <span class="cm-number">1</span>);

  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Did mount!'</span>);
  }, []);

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">h1</span><span class="cm-operator">&gt;</span><span class="cm-variable">Counter</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/h1&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">Current</span> <span class="cm-variable-2">count</span>: {<span class="cm-variable-2">count</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">p</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-property">increaseCount</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">Increase</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-property">decreaseCount</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">Decrease</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/p&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

Class Component编译结果：

<div id="yHTzM" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22var%20App_App%20%3D%20function%20(_Component)%20%7B%5Cn%20%20Object(inherits%5B%5C%22a%5C%22%5D)(App%2C%20_Component)%3B%5Cn%5Cn%20%20function%20App()%20%7B%5Cn%20%20%20%20var%20_getPrototypeOf2%3B%5Cn%20%20%20%20var%20_this%3B%5Cn%20%20%20%20Object(classCallCheck%5B%5C%22a%5C%22%5D)(this%2C%20App)%3B%5Cn%20%20%20%20for%20(var%20_len%20%3D%20arguments.length%2C%20args%20%3D%20new%20Array(_len)%2C%20_key%20%3D%200%3B%20_key%20%3C%20_len%3B%20_key%2B%2B)%20%7B%5Cn%20%20%20%20%20%20args%5B_key%5D%20%3D%20arguments%5B_key%5D%3B%5Cn%20%20%20%20%7D%5Cn%20%20%20%20_this%20%3D%20Object(possibleConstructorReturn%5B%5C%22a%5C%22%5D)(this%2C%20(_getPrototypeOf2%20%3D%20Object(getPrototypeOf%5B%5C%22a%5C%22%5D)(App)).call.apply(_getPrototypeOf2%2C%20%5Bthis%5D.concat(args)))%3B%5Cn%20%20%20%20_this.state%20%3D%20%7B%5Cn%20%20%20%20%20%20count%3A%200%5Cn%20%20%20%20%7D%3B%5Cn%20%20%20%20_this.increaseCount%20%3D%20function%20()%20%7B%5Cn%20%20%20%20%20%20_this.setState(%7B%5Cn%20%20%20%20%20%20%20%20count%3A%20_this.state.count%20%2B%201%5Cn%20%20%20%20%20%20%7D)%3B%5Cn%20%20%20%20%7D%3B%5Cn%20%20%20%20_this.decreaseCount%20%3D%20function%20()%20%7B%5Cn%20%20%20%20%20%20_this.setState(%7B%5Cn%20%20%20%20%20%20%20%20count%3A%20_this.state.count%20-%201%5Cn%20%20%20%20%20%20%7D)%3B%5Cn%20%20%20%20%7D%3B%5Cn%20%20%20%20return%20_this%3B%5Cn%20%20%7D%5Cn%20%20Object(createClass%5B%5C%22a%5C%22%5D)(App%2C%20%5B%7B%5Cn%20%20%20%20key%3A%20%5C%22componentDidMount%5C%22%2C%5Cn%20%20%20%20value%3A%20function%20componentDidMount()%20%7B%5Cn%20%20%20%20%20%20console.log('Did%20mount!')%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%2C%20%7B%5Cn%20%20%20%20key%3A%20%5C%22render%5C%22%2C%5Cn%20%20%20%20value%3A%20function%20render()%20%7B%5Cn%20%20%20%20%20%20return%20react_default.a.createElement(%2F*...*%2F)%3B%5Cn%20%20%20%20%7D%5Cn%20%20%7D%5D)%3B%5Cn%20%20return%20App%3B%5Cn%7D(react%5B%5C%22Component%5C%22%5D)%3B%22%2C%22id%22%3A%22yHTzM%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">var</span> <span class="cm-def">App_App</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> (<span class="cm-def">_Component</span>) {
  <span class="cm-variable">Object</span>(<span class="cm-variable">inherits</span>[<span class="cm-string">"a"</span>])(<span class="cm-variable">App</span>, <span class="cm-variable-2">_Component</span>);

  <span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
    <span class="cm-keyword">var</span> <span class="cm-def">_getPrototypeOf2</span>;
    <span class="cm-keyword">var</span> <span class="cm-def">_this</span>;
    <span class="cm-variable">Object</span>(<span class="cm-variable">classCallCheck</span>[<span class="cm-string">"a"</span>])(<span class="cm-keyword">this</span>, <span class="cm-variable-2">App</span>);
    <span class="cm-keyword">for</span> (<span class="cm-keyword">var</span> <span class="cm-def">_len</span> <span class="cm-operator">=</span> <span class="cm-variable-2">arguments</span>.<span class="cm-property">length</span>, <span class="cm-def">args</span> <span class="cm-operator">=</span> <span class="cm-keyword">new</span> <span class="cm-variable">Array</span>(<span class="cm-variable-2">_len</span>), <span class="cm-def">_key</span> <span class="cm-operator">=</span> <span class="cm-number"></span>; <span class="cm-variable-2">_key</span> <span class="cm-operator">&lt;</span> <span class="cm-variable-2">_len</span>; <span class="cm-variable-2">_key</span><span class="cm-operator">++</span>) {
      <span class="cm-variable-2">args</span>[<span class="cm-variable-2">_key</span>] <span class="cm-operator">=</span> <span class="cm-variable-2">arguments</span>[<span class="cm-variable-2">_key</span>];
    }
    <span class="cm-variable-2">_this</span> <span class="cm-operator">=</span> <span class="cm-variable">Object</span>(<span class="cm-variable">possibleConstructorReturn</span>[<span class="cm-string">"a"</span>])(<span class="cm-keyword">this</span>, (<span class="cm-variable-2">_getPrototypeOf2</span> <span class="cm-operator">=</span> <span class="cm-variable">Object</span>(<span class="cm-variable">getPrototypeOf</span>[<span class="cm-string">"a"</span>])(<span class="cm-variable-2">App</span>)).<span class="cm-property">call</span>.<span class="cm-property">apply</span>(<span class="cm-variable-2">_getPrototypeOf2</span>, [<span class="cm-keyword">this</span>].<span class="cm-property">concat</span>(<span class="cm-variable-2">args</span>)));
    <span class="cm-variable-2">_this</span>.<span class="cm-property">state</span> <span class="cm-operator">=</span> {
      <span class="cm-property">count</span>: <span class="cm-number"></span>
    };
    <span class="cm-variable-2">_this</span>.<span class="cm-property">increaseCount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> () {
      <span class="cm-variable-2">_this</span>.<span class="cm-property">setState</span>({
        <span class="cm-property">count</span>: <span class="cm-variable-2">_this</span>.<span class="cm-property">state</span>.<span class="cm-property">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>
      });
    };
    <span class="cm-variable-2">_this</span>.<span class="cm-property">decreaseCount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> () {
      <span class="cm-variable-2">_this</span>.<span class="cm-property">setState</span>({
        <span class="cm-property">count</span>: <span class="cm-variable-2">_this</span>.<span class="cm-property">state</span>.<span class="cm-property">count</span> <span class="cm-operator">-</span> <span class="cm-number">1</span>
      });
    };
    <span class="cm-keyword">return</span> <span class="cm-variable-2">_this</span>;
  }
  <span class="cm-variable">Object</span>(<span class="cm-variable">createClass</span>[<span class="cm-string">"a"</span>])(<span class="cm-variable-2">App</span>, [{
    <span class="cm-property">key</span>: <span class="cm-string">"componentDidMount"</span>,
    <span class="cm-property">value</span>: <span class="cm-keyword">function</span> <span class="cm-def">componentDidMount</span>() {
      <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Did mount!'</span>);
    }
  }, {
    <span class="cm-property">key</span>: <span class="cm-string">"render"</span>,
    <span class="cm-property">value</span>: <span class="cm-keyword">function</span> <span class="cm-def">render</span>() {
      <span class="cm-keyword">return</span> <span class="cm-variable">react_default</span>.<span class="cm-property">a</span>.<span class="cm-property">createElement</span>(<span class="cm-comment">/*...*/</span>);
    }
  }]);
  <span class="cm-keyword">return</span> <span class="cm-variable-2">App</span>;
}(<span class="cm-variable">react</span>[<span class="cm-string">"Component"</span>]);</pre>
    </div>
  </div>
</div>

Function Component编译结果：

<div id="6h1xb" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%20%20var%20_useState%20%3D%20Object(react%5B%5C%22useState%5C%22%5D)(0)%2C%5Cn%20%20%20%20_useState2%20%3D%20Object(slicedToArray%5B%5C%22a%5C%22%20%2F*%20default%20*%2F%20%5D)(_useState%2C%202)%2C%5Cn%20%20%20%20count%20%3D%20_useState2%5B0%5D%2C%5Cn%20%20%20%20setCount%20%3D%20_useState2%5B1%5D%3B%5Cn%20%20var%20increaseCount%20%3D%20function%20increaseCount()%20%7B%5Cn%20%20%20%20return%20setCount(count%20%2B%201)%3B%5Cn%20%20%7D%3B%5Cn%20%20var%20decreaseCount%20%3D%20function%20decreaseCount()%20%7B%5Cn%20%20%20%20return%20setCount(count%20-%201)%3B%5Cn%20%20%7D%3B%5Cn%20%20Object(react%5B%5C%22useEffect%5C%22%5D)(function%20()%20%7B%5Cn%20%20%20%20console.log('Did%20mount!')%3B%5Cn%20%20%7D%2C%20%5B%5D)%3B%5Cn%20%20return%20react_default.a.createElement()%3B%5Cn%7D%22%2C%22id%22%3A%226h1xb%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">var</span> <span class="cm-def">_useState</span> <span class="cm-operator">=</span> <span class="cm-variable">Object</span>(<span class="cm-variable">react</span>[<span class="cm-string">"useState"</span>])(<span class="cm-number"></span>),
    <span class="cm-def">_useState2</span> <span class="cm-operator">=</span> <span class="cm-variable">Object</span>(<span class="cm-variable">slicedToArray</span>[<span class="cm-string">"a"</span> <span class="cm-comment">/* default */</span> ])(<span class="cm-variable-2">_useState</span>, <span class="cm-number">2</span>),
    <span class="cm-def">count</span> <span class="cm-operator">=</span> <span class="cm-variable-2">_useState2</span>[<span class="cm-number"></span>],
    <span class="cm-def">setCount</span> <span class="cm-operator">=</span> <span class="cm-variable-2">_useState2</span>[<span class="cm-number">1</span>];
  <span class="cm-keyword">var</span> <span class="cm-def">increaseCount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> <span class="cm-def">increaseCount</span>() {
    <span class="cm-keyword">return</span> <span class="cm-variable-2">setCount</span>(<span class="cm-variable-2">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>);
  };
  <span class="cm-keyword">var</span> <span class="cm-def">decreaseCount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> <span class="cm-def">decreaseCount</span>() {
    <span class="cm-keyword">return</span> <span class="cm-variable-2">setCount</span>(<span class="cm-variable-2">count</span> <span class="cm-operator">-</span> <span class="cm-number">1</span>);
  };
  <span class="cm-variable">Object</span>(<span class="cm-variable">react</span>[<span class="cm-string">"useEffect"</span>])(<span class="cm-keyword">function</span> () {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'Did mount!'</span>);
  }, []);
  <span class="cm-keyword">return</span> <span class="cm-variable">react_default</span>.<span class="cm-property">a</span>.<span class="cm-property">createElement</span>();
}</pre>
    </div>
  </div>
</div>

  * Javascript实现的类本身比较鸡肋，没有类似Java/C++多继承的概念，类的逻辑复用是个问题
  * Class Component在React内部是当做Javascript `Function类`来处理的
  * Function Component编译后就是一个普通的function，function对js引擎是友好的

> &#x1f914;问题：React是如何识别纯函数组件和类组件的？

### Function Component缺失的功能 {#aW9FM}

  * 不是所有组件都需要处理生命周期，为了简化Class Component的书写，Function Component被设计了出来
  * Function Component是纯函数，利于组件复用和测试
  * Function Component的问题是只是单纯地接收props、绑定事件、返回jsx，本身是**无状态的组件，依赖props传入的handle来响应数据（状态）的变更，所以Function Component不能脱离Class Comnent来存在！**

<div id="LTBtF" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20Child(props)%20%7B%5Cn%20%20const%20handleClick%20%3D%20()%20%3D%3E%20%7B%5Cn%20%20%5Ctthis.props.setCounts(this.props.counts)%3B%5Cn%20%20%7D%3B%5Cn%20%20%5Cn%20%20%2F%2F%20UI%E7%9A%84%E5%8F%98%E6%9B%B4%E5%8F%AA%E8%83%BD%E9%80%9A%E8%BF%87Parent%20Component%E6%9B%B4%E6%96%B0props%E6%9D%A5%E5%81%9A%E5%88%B0%EF%BC%81!%5Cn%5Ctreturn%20(%5Cn%20%20%5Ct%3C%3E%5Cn%20%20%20%20%5Ct%3Cdiv%3E%7Bthis.props.counts%7D%3C%2Fdiv%3E%5Cn%20%20%20%20%5Ct%3Cbutton%20onClick%3D%7BhandleClick%7D%3Eincrease%20counts%3C%2Fbutton%3E%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%5Cn%5Cnclass%20Parent%20extends%20Component()%20%7B%5Cn%20%20%2F%2F%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%BF%98%E6%98%AF%E5%BE%97%E4%BE%9D%E8%B5%96Class%20Component%5Cn%20%20counts%20%3D%200%5Cn%20%20%5Cn%5Ctrender%20()%20%7B%5Cn%20%20%20%20const%20counts%20%3D%20this.state.counts%3B%5Cn%20%20%5Ctreturn%20(%5Cn%20%20%20%20%5Ct%3C%3E%5Cn%20%20%20%20%20%20%20%20%3Cdiv%3Esth...%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%20%20%3CChild%20counts%3D%7Bcounts%7D%20setCounts%3D%7B(x)%20%3D%3E%20this.setState(%7Bcounts%3A%20counts%2B%2B%7D)%7D%20%2F%3E%5Cn%20%20%20%20%20%20%3C%2F%3E%5Cn%20%20%20%20)%3B%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22LTBtF%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">Child</span>(<span class="cm-def">props</span>) {
  <span class="cm-keyword">const</span> <span class="cm-def">handleClick</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">this</span>.<span class="cm-property">props</span>.<span class="cm-property">setCounts</span>(<span class="cm-keyword">this</span>.<span class="cm-property">props</span>.<span class="cm-property">counts</span>);
  };
  
  <span class="cm-comment">// UI的变更只能通过Parent Component更新props来做到！!</span>
  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>{<span class="cm-property">this</span>.<span class="cm-variable-2">props</span>.<span class="cm-variable">counts</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{<span class="cm-variable-2">handleClick</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">increase</span> <span class="cm-variable">counts</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}

<span class="cm-keyword">class</span> <span class="cm-def">Parent</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span>() {
  <span class="cm-comment">// 状态管理还是得依赖Class Component</span>
  <span class="cm-property">counts</span> <span class="cm-operator">=</span> <span class="cm-number"></span>
  
  <span class="cm-variable">render</span> () {
    <span class="cm-keyword">const</span> <span class="cm-def">counts</span> <span class="cm-operator">=</span> <span class="cm-keyword">this</span>.<span class="cm-property">state</span>.<span class="cm-property">counts</span>;
    <span class="cm-keyword">return</span> (
      <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">sth</span><span class="cm-meta">...</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">Child</span> <span class="cm-variable-2">counts</span><span class="cm-operator">=</span>{<span class="cm-variable-2">counts</span>} <span class="cm-variable">setCounts</span><span class="cm-operator">=</span>{(<span class="cm-variable">x</span>) <span class="cm-operator">=&gt;</span> <span class="cm-keyword">this</span>.<span class="cm-property">setState</span>({<span class="cm-property">counts</span>: <span class="cm-variable">counts</span><span class="cm-operator">++</span>})} <span class="cm-string-2">/&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
    );
  }
}</pre>
    </div>
  </div>
</div>

所以，Function Comonent是否能脱离Class Component独立存在，关键在于让Function Comonent自身具备状态处理能力，即在组件首次render之后，“**组件自身能够****通过某种机制再触发状态的变更并且引起re-render**”，而这种“机制”就是Hooks！

Hooks的出现弥补了Function Component相对于Class Component的不足，让Function Component完全取代Class Component成为可能。

### Function Component + Hooks组合 {#WXTW0}

1、功能相对独立、和render无关的部分，可以直接抽离到hook实现，比如请求库、登录态、用户核身、埋点等等，理论上装饰器都可以改用hook实现。（如<a href="https://github.com/streamich/react-use" target="_blank" rel="noopener noreferrer">react-use</a>，提供了大量从UI、动画、事件等常用功能的hook实现）

case：Popup组件依赖视窗宽度适配自身显示宽度、相册组件依赖视窗宽度做单/多栏布局适配

> &#x1f914;：请自行脑补使用Class Component来如何实现

<div id="P1Tak" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20useWinSize()%20%7B%5Cn%20%20const%20html%20%3D%20document.documentElement%3B%5Cn%20%20const%20%5B%20size%2C%20setSize%20%5D%20%3D%20useState(%7B%20width%3A%20html.clientWidth%2C%20height%3A%20html.clientHeight%20%7D)%3B%5Cn%20%20%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%20%20const%20onSize%20%3D%20e%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20setSize(%7B%20width%3A%20html.clientWidth%2C%20height%3A%20html.clientHeight%20%7D)%3B%5Cn%20%20%20%20%7D%3B%5Cn%20%20%20%20%5Cn%20%20%20%20window.addEventListener('resize'%2C%20onSize)%3B%5Cn%20%20%20%20%5Cn%20%20%20%20return%20()%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20window.removeEventListener('resize'%2C%20onSize)%3B%5Cn%20%20%20%20%7D%3B%5Cn%20%20%7D%2C%20%5B%20html%20%5D)%3B%5Cn%20%20%5Cn%20%20return%20size%3B%5Cn%7D%5Cn%5Cn%2F%2F%20%E4%BE%9D%E8%B5%96win%E5%AE%BD%E5%BA%A6%EF%BC%8C%E9%80%82%E9%85%8D%E5%9B%BE%E7%89%87%E5%B8%83%E5%B1%80%5Cnfunction%20Article(props)%20%7B%5Cn%20%20const%20%7B%20width%20%7D%20%3D%20useWinSize()%3B%5Cn%20%20const%20cls%20%3D%20%60layout-%24%7Bwidth%20%3E%3D%20540%20%3F%20'muti'%20%3A%20'single'%7D%60%3B%5Cn%20%20return%20(%5Cn%20%20%20%20%3C%3E%5Cn%20%20%20%20%5Ct%3Carticle%3E%7Bprops.content%7D%3Carticle%3E%5Cn%20%20%20%20%5Ct%3Cdiv%20className%3D%7Bcls%7D%3Erecommended%20thumb%20list%3C%2Fdiv%3E%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%5Cn%5Cn%2F%2F%20%E5%BC%B9%E5%B1%82%E5%AE%BD%E5%BA%A6%E6%A0%B9%E6%8D%AEwin%E5%AE%BD%E9%AB%98%E5%81%9A%E9%80%82%E9%85%8D%5Cnfunction%20Popup(props)%20%7B%5Cn%20%20const%20%7B%20width%2C%20height%20%7D%20%3D%20useWinSize()%3B%5Cn%20%20const%20style%20%3D%20%7B%5Cn%20%20%5Ctwidth%3A%20width%20-%20200%2C%5Cn%20%20%20%20height%3A%20height%20-%20300%2C%5Cn%20%20%7D%3B%5Cn%20%20return%20(%3Cdiv%20style%3D%7Bstyle%7D%3E%7Bprops.content%7D%3C%2Fdiv%3E)%3B%5Cn%7D%22%2C%22id%22%3A%22P1Tak%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">useWinSize</span>() {
  <span class="cm-keyword">const</span> <span class="cm-def">html</span> <span class="cm-operator">=</span> <span class="cm-variable">document</span>.<span class="cm-property">documentElement</span>;
  <span class="cm-keyword">const</span> [ <span class="cm-def">size</span>, <span class="cm-def">setSize</span> ] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>({ <span class="cm-property">width</span>: <span class="cm-variable-2">html</span>.<span class="cm-property">clientWidth</span>, <span class="cm-property">height</span>: <span class="cm-variable-2">html</span>.<span class="cm-property">clientHeight</span> });
  
  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">const</span> <span class="cm-def">onSize</span> <span class="cm-operator">=</span> <span class="cm-def">e</span> <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable-2">setSize</span>({ <span class="cm-property">width</span>: <span class="cm-variable-2">html</span>.<span class="cm-property">clientWidth</span>, <span class="cm-property">height</span>: <span class="cm-variable-2">html</span>.<span class="cm-property">clientHeight</span> });
    };
    
    <span class="cm-variable">window</span>.<span class="cm-property">addEventListener</span>(<span class="cm-string">'resize'</span>, <span class="cm-variable-2">onSize</span>);
    
    <span class="cm-keyword">return</span> () <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable">window</span>.<span class="cm-property">removeEventListener</span>(<span class="cm-string">'resize'</span>, <span class="cm-variable-2">onSize</span>);
    };
  }, [ <span class="cm-variable-2">html</span> ]);
  
  <span class="cm-keyword">return</span> <span class="cm-variable-2">size</span>;
}

<span class="cm-comment">// 依赖win宽度，适配图片布局</span>
<span class="cm-keyword">function</span> <span class="cm-def">Article</span>(<span class="cm-def">props</span>) {
  <span class="cm-keyword">const</span> { <span class="cm-def">width</span> } <span class="cm-operator">=</span> <span class="cm-variable">useWinSize</span>();
  <span class="cm-keyword">const</span> <span class="cm-def">cls</span> <span class="cm-operator">=</span> <span class="cm-string-2">`layout-${</span><span class="cm-variable-2">width</span> <span class="cm-operator">&gt;=</span> <span class="cm-number">540</span> <span class="cm-operator">?</span> <span class="cm-string">'muti'</span> : <span class="cm-string">'single'</span><span class="cm-string-2">}</span><span class="cm-string-2">`</span>;
  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">article</span><span class="cm-operator">&gt;</span>{<span class="cm-property">props</span>.<span class="cm-variable">content</span>}<span class="cm-operator">&lt;</span><span class="cm-variable">article</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">className</span><span class="cm-operator">=</span>{<span class="cm-variable-2">cls</span>}<span class="cm-operator">&gt;</span><span class="cm-variable">recommended</span> <span class="cm-variable">thumb</span> <span class="cm-variable">list</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}

<span class="cm-comment">// 弹层宽度根据win宽高做适配</span>
<span class="cm-keyword">function</span> <span class="cm-def">Popup</span>(<span class="cm-def">props</span>) {
  <span class="cm-keyword">const</span> { <span class="cm-def">width</span>, <span class="cm-def">height</span> } <span class="cm-operator">=</span> <span class="cm-variable">useWinSize</span>();
  <span class="cm-keyword">const</span> <span class="cm-def">style</span> <span class="cm-operator">=</span> {
    <span class="cm-property">width</span>: <span class="cm-variable-2">width</span> <span class="cm-operator">-</span> <span class="cm-number">200</span>,
    <span class="cm-property">height</span>: <span class="cm-variable-2">height</span> <span class="cm-operator">-</span> <span class="cm-number">300</span>,
  };
  <span class="cm-keyword">return</span> (<span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable-2">style</span><span class="cm-operator">=</span>{<span class="cm-variable-2">style</span>}<span class="cm-operator">&gt;</span>{<span class="cm-property">props</span>.<span class="cm-variable">content</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;);</span>
}</pre>
    </div>
  </div>
</div>

2、有render相关的也可以对UI和功能（状态）做分离，将功能放到hook实现，将状态和UI分离

case：表单验证

<div id="HNL0r" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%20%20const%20%7B%20waiting%2C%20errText%2C%20name%2C%20onChange%20%7D%20%3D%20useName()%3B%5Cn%20%20const%20handleSubmit%20%3D%20e%20%3D%3E%20%7B%5Cn%20%20%20%20console.log(%60current%20name%3A%20%24%7Bname%7D%60)%3B%5Cn%20%20%7D%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3Cform%20onSubmit%3D%7BhandleSubmit%7D%3E%5Cn%20%20%20%20%20%20%3C%3E%5Cn%20%20%20%20%20%20%20%20Name%3A%20%3Cinput%20onChange%3D%7BonChange%7D%20%2F%3E%5Cn%20%20%20%20%20%20%20%20%3Cspan%3E%7Bwaiting%20%3F%20%5C%22waiting...%5C%22%20%3A%20errText%20%7C%7C%20%5C%22%5C%22%7D%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%3C%2F%3E%5Cn%20%20%20%20%20%20%3Cp%3E%5Cn%20%20%20%20%20%20%20%20%3Cbutton%3Esubmit%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3C%2Fp%3E%5Cn%20%20%20%20%3C%2Fform%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22HNL0r%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> { <span class="cm-def">waiting</span>, <span class="cm-def">errText</span>, <span class="cm-def">name</span>, <span class="cm-def">onChange</span> } <span class="cm-operator">=</span> <span class="cm-variable">useName</span>();
  <span class="cm-keyword">const</span> <span class="cm-def">handleSubmit</span> <span class="cm-operator">=</span> <span class="cm-def">e</span> <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string-2">`current name: ${</span><span class="cm-variable-2">name</span><span class="cm-string-2">}</span><span class="cm-string-2">`</span>);
  };

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">form</span> <span class="cm-variable">onSubmit</span><span class="cm-operator">=</span>{<span class="cm-variable-2">handleSubmit</span>}<span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
        <span class="cm-variable">Name</span>: <span class="cm-operator">&lt;</span><span class="cm-variable">input</span> <span class="cm-variable">onChange</span><span class="cm-operator">=</span>{<span class="cm-property">onChange</span>} <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">span</span><span class="cm-operator">&gt;</span>{<span class="cm-property">waiting</span> <span class="cm-operator">?</span> <span class="cm-string">"waiting..."</span> : <span class="cm-variable">errText</span> <span class="cm-operator">|</span><span class="cm-operator">|</span> <span class="cm-string">""</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/span&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">p</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">button</span><span class="cm-operator">&gt;</span><span class="cm-variable">submit</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/p&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/form&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

## Hooks的实现与使用 {#6C0cL}

### useState {#ICp4W}

<div id="rWl1H" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22useState%3CS%3E(initialState%3A%20(()%20%3D%3E%20S)%20%7C%20S)%3A%20%5BS%2C%20Dispatch%3CBasicStateAction%3CS%3E%3E%5D%22%2C%22id%22%3A%22rWl1H%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">useState</span><span class="cm-operator">&lt;</span><span class="cm-variable">S</span><span class="cm-operator">&gt;</span>(<span class="cm-variable">initialState</span>: (() <span class="cm-operator">=&gt;</span> <span class="cm-variable">S</span>) <span class="cm-operator">|</span> <span class="cm-variable">S</span>): [<span class="cm-variable">S</span>, <span class="cm-variable">Dispatch</span><span class="cm-operator">&lt;</span><span class="cm-variable">BasicStateAction</span><span class="cm-operator">&lt;</span><span class="cm-variable">S</span><span class="cm-operator">&gt;&gt;</span>]</pre>
    </div>
  </div>
</div>

作用：返回一个状态以及能修改这个状态的setter，在其他语言称为元组（tuples），一旦mount之后只能通过这个setter修改这个状态。

> 思考&#x1f914;：useState为啥不返回object而是返回tuple？

<p id="STikRUl">
  <img loading="lazy" width="593" height="162" class="alignnone size-full wp-image-4898 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984cee4ca2.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984cee4ca2.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984cee4ca2.png?x-oss-process=image/format,webp 593w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984cee4ca2.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_82/format,webp 300w" sizes="(max-width: 593px) 100vw, 593px" />
</p>

  * 是Hook：使用了Hook API的函数组件，返回的setter可以改变组件的状态
  * 又不像Hook：和一般意义上的Hook（钩子）不一样，这里的Hook可以多次调用且产生不同的效果，且Hook随Fiber一起生灭

#### 1、为什么只能在Function Component里调用Hook API？ {#H2zTM}

Hook API的默认实现：

<div id="wbPkW" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20throwInvalidHookError()%20%7B%5Cn%20%20invariant(false%2C%20'Invalid%20hook%20call.%20Hooks%20can%20only%20be%20called%20inside%20of%20the%20body%20of%20a%20function%20component.%20This%20could%20happen%20for%20one%20of%20the%20following%20reasons%3A%5C%5Cn1.%20You%20might%20have%20mismatching%20versions%20of%20React%20and%20the%20renderer%20(such%20as%20React%20DOM)%5C%5Cn2.%20You%20might%20be%20breaking%20the%20Rules%20of%20Hooks%5C%5Cn3.%20You%20might%20have%20more%20than%20one%20copy%20of%20React%20in%20the%20same%20app%5C%5CnSee%20https%3A%2F%2Ffb.me%2Freact-invalid-hook-call%20for%20tips%20about%20how%20to%20debug%20and%20fix%20this%20problem.')%3B%5Cn%7D%5Cn%5Cnvar%20ContextOnlyDispatcher%20%3D%20%7B%5Cn%5Ct...%5Cn%20%20useEffect%3A%20throwInvalidHookError%2C%5Cn%20%20useState%3A%20throwInvalidHookError%2C%5Cn%20%20...%5Cn%7D%3B%22%2C%22id%22%3A%22wbPkW%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">throwInvalidHookError</span>() {
  <span class="cm-variable">invariant</span>(<span class="cm-atom">false</span>, <span class="cm-string">'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.'</span>);
}

<span class="cm-keyword">var</span> <span class="cm-def">ContextOnlyDispatcher</span> <span class="cm-operator">=</span> {
  <span class="cm-meta">...</span>
  <span class="cm-variable">useEffect</span>: <span class="cm-variable">throwInvalidHookError</span>,
  <span class="cm-property">useState</span>: <span class="cm-variable">throwInvalidHookError</span>,
  <span class="cm-meta">...</span>
};</pre>
    </div>
  </div>
</div>

当在Function Component调用Hook：

<div id="xJ5wa" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20renderWithHooks(current%2C%20workInProgress%2C%20Component%2C%20props%2C%20refOrContext%2C%20nextRenderExpirationTime)%20%7B%5Cn%20%20currentlyRenderingFiber%241%20%3D%20workInProgress%3B%20%2F%2F%20%E6%8C%87%E9%92%88%E6%8C%87%E5%90%91%E5%BD%93%E5%89%8D%E6%AD%A3%E5%9C%A8render%E7%9A%84fiber%E8%8A%82%E7%82%B9%5Cn%20%20....%5Cn%20%20if%20(nextCurrentHook%20!%3D%3D%20null)%20%7B%5Cn%20%20%20%20%2F%2F%20%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%5Cn%20%20%20%20ReactCurrentDispatcher%241.current%20%3D%20HooksDispatcherOnUpdateInDEV%3B%5Cn%20%20%7D%20else%20%7B%5Cn%20%20%20%20%2F%2F%20%E9%A6%96%E6%AC%A1render%5Cn%20%20%5CtReactCurrentDispatcher%241.current%20%3D%20HooksDispatcherOnMountInDEV%3B%5Cn%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%2F%20hook%20api%E7%9A%84%E5%AE%9E%E7%8E%B0%5CnHooksDispatcherOnMountInDEV%20%3D%20%7B%5Cn%5Ct...%5Cn%20%20useState%3A%20function%20(initialState)%20%7B%5Cn%20%20%20%20currentHookNameInDev%20%3D%20'useState'%3B%5Cn%20%20%20%20...%5Cn%20%20%20%20return%20mountState(initialState)%3B%5Cn%20%20%7D%2C%5Cn%7D%3B%22%2C%22id%22%3A%22xJ5wa%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">renderWithHooks</span>(<span class="cm-def">current</span>, <span class="cm-def">workInProgress</span>, <span class="cm-def">Component</span>, <span class="cm-def">props</span>, <span class="cm-def">refOrContext</span>, <span class="cm-def">nextRenderExpirationTime</span>) {
  <span class="cm-variable">currentlyRenderingFiber$1</span> <span class="cm-operator">=</span> <span class="cm-variable-2">workInProgress</span>; <span class="cm-comment">// 指针指向当前正在render的fiber节点</span>
  <span class="cm-meta">...</span>.
  <span class="cm-variable">if</span> (<span class="cm-variable">nextCurrentHook</span> <span class="cm-operator">!==</span> <span class="cm-atom">null</span>) {
    <span class="cm-comment">// 数据更新</span>
    <span class="cm-variable">ReactCurrentDispatcher$1</span>.<span class="cm-property">current</span> <span class="cm-operator">=</span> <span class="cm-variable">HooksDispatcherOnUpdateInDEV</span>;
  } <span class="cm-keyword">else</span> {
    <span class="cm-comment">// 首次render</span>
    <span class="cm-variable">ReactCurrentDispatcher$1</span>.<span class="cm-property">current</span> <span class="cm-operator">=</span> <span class="cm-variable">HooksDispatcherOnMountInDEV</span>;
  }
}

<span class="cm-comment">/// hook api的实现</span>
<span class="cm-variable">HooksDispatcherOnMountInDEV</span> <span class="cm-operator">=</span> {
  <span class="cm-meta">...</span>
  <span class="cm-variable">useState</span>: <span class="cm-keyword">function</span> (<span class="cm-def">initialState</span>) {
    <span class="cm-variable">currentHookNameInDev</span> <span class="cm-operator">=</span> <span class="cm-string">'useState'</span>;
    <span class="cm-meta">...</span>
    <span class="cm-keyword">return</span> <span class="cm-variable">mountState</span>(<span class="cm-variable-2">initialState</span>);
  },
};</pre>
    </div>
  </div>
</div>

#### 2、为什么必须在函数组件顶部作用域调用Hook API？且必须保证顺序 {#gwWhW}

在类组件中，state就是一个对象，对应FiberNode的`memoizedState`属性，在类组件中当调用`setState()`时更新`memoizedState`即可。但是在函数组件中，`memoizedState`被设计成一个链表（Hook对象）：

<div id="5AFoX" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22type%20Hook%20%3D%20%7B%5Cn%20%20memoizedState%3A%20any%2C%20%2F%2F%20%E5%AD%98%E5%82%A8%E6%9C%80%E6%96%B0%E7%9A%84state%5Cn%20%20baseState%3A%20any%2C%5Cn%20%20baseUpdate%3A%20Update%3Cany%2C%20any%3E%20%7C%20null%2C%5Cn%20%20queue%3A%20UpdateQueue%3Cany%2C%20any%3E%20%7C%20null%2C%20%2F%2F%20%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97%5Cn%20%20next%3A%20Hook%20%7C%20null%2C%20%2F%2F%20%E4%B8%8B%E4%B8%80%E4%B8%AAhook%5Cn%7D%5Cn%5Cntype%20UpdateQueue%3CS%2C%20A%3E%20%3D%20%7B%5Cn%20%20last%3A%20Update%3CS%2C%20A%3E%20%7C%20null%2C%20%2F%2F%20%E6%9C%80%E5%90%8E%E4%B8%80%E6%AC%A1%E6%9B%B4%E6%96%B0%E6%93%8D%E4%BD%9C%5Cn%20%20dispatch%3A%20(A%20%3D%3E%20mixed)%20%7C%20null%2C%5Cn%20%20lastRenderedReducer%3A%20((S%2C%20A)%20%3D%3E%20S)%20%7C%20null%2C%20%2F%2F%20%E6%9C%80%E6%96%B0%E5%A4%84%E7%90%86%E5%A4%84%E7%90%86state%E7%9A%84reducer%5Cn%20%20lastRenderedState%3A%20S%20%7C%20null%2C%20%2F%2F%20%E6%9C%80%E6%96%B0%E6%B8%B2%E6%9F%93%E5%90%8E%E7%8A%B6%E6%80%81%5Cn%7D%3B%5Cn%5Cntype%20Update%3CS%2C%20A%3E%20%3D%20%7B%5Cn%20%20...%5Cn%20%20action%3A%20A%2C%5Cn%20%20eagerReducer%3A%20((S%2C%20A)%20%3D%3E%20S)%20%7C%20null%2C%5Cn%20%20eagerState%3A%20S%20%7C%20null%2C%20%2F%2F%20%E5%BE%85%E6%9B%B4%E6%96%B0%E7%8A%B6%E6%80%81%E5%80%BC%5Cn%20%20next%3A%20Update%3CS%2C%20A%3E%20%7C%20null%2C%5Cn%20%20...%5Cn%7D%3B%22%2C%22id%22%3A%225AFoX%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">type</span> <span class="cm-type">Hook</span> <span class="cm-operator">=</span> {
  <span class="cm-property">memoizedState</span>: <span class="cm-type">any</span>, <span class="cm-comment">// 存储最新的state</span>
  <span class="cm-property">baseState</span>: <span class="cm-type">any</span>,
  <span class="cm-property">baseUpdate</span>: <span class="cm-type">Update</span><span class="cm-operator">&lt;</span><span class="cm-type">any</span>, <span class="cm-type">any</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>,
  <span class="cm-property">queue</span>: <span class="cm-type">UpdateQueue</span><span class="cm-operator">&lt;</span><span class="cm-type">any</span>, <span class="cm-type">any</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 更新队列</span>
  <span class="cm-property">next</span>: <span class="cm-type">Hook</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 下一个hook</span>
}

<span class="cm-keyword">type</span> <span class="cm-type">UpdateQueue</span><span class="cm-operator">&lt;</span><span class="cm-type">S</span>, <span class="cm-type">A</span><span class="cm-operator">&gt;</span> <span class="cm-operator">=</span> {
  <span class="cm-property">last</span>: <span class="cm-type">Update</span><span class="cm-operator">&lt;</span><span class="cm-type">S</span>, <span class="cm-type">A</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 最后一次更新操作</span>
  <span class="cm-property">dispatch</span>: (<span class="cm-type">A</span> <span class="cm-operator">=&gt;</span> <span class="cm-variable">mixed</span>) <span class="cm-operator">|</span> <span class="cm-atom">null</span>,
  <span class="cm-variable">lastRenderedReducer</span>: ((<span class="cm-variable">S</span>, <span class="cm-variable">A</span>) <span class="cm-operator">=&gt;</span> <span class="cm-variable">S</span>) <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 最新处理处理state的reducer</span>
  <span class="cm-variable">lastRenderedState</span>: <span class="cm-variable">S</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 最新渲染后状态</span>
};

<span class="cm-keyword">type</span> <span class="cm-type">Update</span><span class="cm-operator">&lt;</span><span class="cm-type">S</span>, <span class="cm-type">A</span><span class="cm-operator">&gt;</span> <span class="cm-operator">=</span> {
  <span class="cm-meta">...</span>
  <span class="cm-variable">action</span>: <span class="cm-variable">A</span>,
  <span class="cm-variable">eagerReducer</span>: ((<span class="cm-variable">S</span>, <span class="cm-variable">A</span>) <span class="cm-operator">=&gt;</span> <span class="cm-variable">S</span>) <span class="cm-operator">|</span> <span class="cm-atom">null</span>,
  <span class="cm-variable">eagerState</span>: <span class="cm-variable">S</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>, <span class="cm-comment">// 待更新状态值</span>
  <span class="cm-variable">next</span>: <span class="cm-variable">Update</span><span class="cm-operator">&lt;</span><span class="cm-variable">S</span>, <span class="cm-variable">A</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>,
  <span class="cm-meta">...</span>
};</pre>
    </div>
  </div>
</div>

示例：

<div id="7lHAo" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%5Ctconst%20%5B%20n1%2C%20setN1%20%5D%20%3D%20useState(1)%3B%5Cn%20%20const%20%5B%20n2%2C%20setN2%20%5D%20%3D%20useState(2)%3B%5Cn%20%20%5Cn%20%20%2F%2F%20if%20(sth)%20%7B%5Cn%20%20%2F%2F%20%5Ctconst%20%5B%20n4%2C%20setN4%20%5D%20%3D%20useState(4)%3B%5Cn%20%20%2F%2F%20%7D%20else%20%7B%5Cn%20%20%2F%2F%20%5Ctconst%20%5B%20n5%2C%20setN5%20%5D%20%3D%20useState(5)%3B%5Cn%20%20%2F%2F%20%7D%5Cn%20%20%5Cn%20%20const%20%5B%20n3%2C%20setN3%20%5D%20%3D%20useState(3)%3B%5Cn%7D%22%2C%22id%22%3A%227lHAo%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [ <span class="cm-def">n1</span>, <span class="cm-def">setN1</span> ] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">1</span>);
  <span class="cm-keyword">const</span> [ <span class="cm-def">n2</span>, <span class="cm-def">setN2</span> ] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">2</span>);
  
  <span class="cm-comment">// if (sth) {</span>
  <span class="cm-comment">//  const [ n4, setN4 ] = useState(4);</span>
  <span class="cm-comment">// } else {</span>
  <span class="cm-comment">//  const [ n5, setN5 ] = useState(5);</span>
  <span class="cm-comment">// }</span>
  
  <span class="cm-keyword">const</span> [ <span class="cm-def">n3</span>, <span class="cm-def">setN3</span> ] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">3</span>);
}</pre>
    </div>
  </div>
</div>

Hook链表结构：

<p id="DiBdmeQ">
  <img loading="lazy" class="alignnone  wp-image-4897 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984c5c3155.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984c5c3155.png?x-oss-process=image/format,webp" alt="" width="561" height="356" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984c5c3155.png?x-oss-process=image/format,webp 746w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984c5c3155.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_190/format,webp 300w" sizes="(max-width: 561px) 100vw, 561px" />
</p>

  * Hook API调用会产生一个对应的Hook实例（并追加到Hooks链），但是返回给组件的是state和对应的setter，re-render时框架并不知道这个setter对应哪个Hooks实例（除非用HashMap来存储Hooks，但这就要求调用的时候把相应的key传给React，会增加Hooks使用的复杂度）
  * re-render时会按顺序执行整个Hooks链，如果re-render时sth不满足，则会执行`useState(5)`分支，相反useState(4)则不会执行到，导致`useState(5)`返回的值其实是4，因为**首次render之后，只能通过useState返回的dispatch修改对应Hook的memoizedState**，因此必须要**保证Hooks的顺序不变**，所以不能在分支调用Hook API。

#### 3、Hooks如何更新数据？ {#C1qQc}

useState() mount阶段：

<div id="FPDN2" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20useState()%20%E9%A6%96%E6%AC%A1render%E6%97%B6%E6%89%A7%E8%A1%8CmountState%5Cnfunction%20mountState(initialState)%20%7B%5Cn%20%20%2F%2F%20%E4%BB%8E%E5%BD%93%E5%89%8DFiber%E7%94%9F%E6%88%90%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84hook%E5%AF%B9%E8%B1%A1%EF%BC%8C%E5%B0%86%E6%AD%A4hook%E6%8C%82%E8%BD%BD%E5%88%B0Fiber%E7%9A%84hook%E9%93%BE%E5%B0%BE%EF%BC%8C%E5%B9%B6%E8%BF%94%E5%9B%9E%E8%BF%99%E4%B8%AAhook%5Cn%20%20var%20hook%20%3D%20mountWorkInProgressHook()%3B%5Cn%20%20%5Cn%20%20hook.memoizedState%20%3D%20hook.baseState%20%3D%20initialState%3B%5Cn%20%20%5Cn%20%20var%20queue%20%3D%20hook.queue%20%3D%20%7B%5Cn%20%20%20%20last%3A%20null%2C%5Cn%20%20%20%20dispatch%3A%20null%2C%5Cn%20%20%20%20lastRenderedReducer%3A%20(state%2C%20action)%20%3D%3E%20isFn(state)%20%3F%20action(state)%20%3A%20action%2C%5Cn%20%20%20%20lastRenderedState%3A%20initialState%5Cn%20%20%7D%3B%5Cn%20%20%2F%2F%20currentlyRenderingFiber%241%E4%BF%9D%E5%AD%98%E5%BD%93%E5%89%8D%E6%AD%A3%E5%9C%A8%E6%B8%B2%E6%9F%93%E7%9A%84Fiber%E8%8A%82%E7%82%B9%5Cn%20%20%2F%2F%20%E5%B0%86%E8%BF%94%E5%9B%9E%E7%9A%84dispatch%E5%92%8C%E8%B0%83%E7%94%A8hook%E7%9A%84%E8%8A%82%E7%82%B9%E5%BB%BA%E7%AB%8B%E8%B5%B7%E4%BA%86%E8%BF%9E%E6%8E%A5%EF%BC%8C%E5%90%8C%E6%97%B6%E5%9C%A8dispatch%E9%87%8C%E8%BE%B9%E5%8F%AF%E4%BB%A5%E8%AE%BF%E9%97%AEqueue%E5%AF%B9%E8%B1%A1%5Cn%20%20var%20dispatch%20%3D%20queue.dispatch%20%3D%20dispatchAction.bind(null%2C%20currentlyRenderingFiber%241%2C%20queue)%3B%5Cn%20%20return%20%5Bhook.memoizedState%2C%20dispatch%5D%3B%5Cn%7D%5Cn%5Cn%2F%2F%2F%2F%20%E5%8A%9F%E8%83%BD%E7%9B%B8%E5%BD%93%E4%BA%8EsetState%EF%BC%81%5Cnfunction%20dispatchAction(fiber%2C%20queue%2C%20action)%20%7B%5Cn%20%20...%5Cn%20%20var%20update%20%3D%20%7B%5Cn%20%20%20%20action%2C%20%2F%2F%20%E6%8E%A5%E5%8F%97%E6%99%AE%E9%80%9A%E5%80%BC%EF%BC%8C%E4%B9%9F%E5%8F%AF%E4%BB%A5%E6%98%AF%E5%87%BD%E6%95%B0%5Cn%20%20%20%20next%3A%20null%2C%5Cn%20%20%7D%3B%5Cn%20%20var%20last%20%3D%20queue.last%3B%5Cn%5Cn%20%20if%20(last%20%3D%3D%3D%20null)%20%7B%5Cn%20%20%20%20update.next%20%3D%20update%3B%5Cn%20%20%7D%20else%20%7B%5Cn%20%20%20%20last.next%20%3D%20update%3B%5Cn%20%20%7D%5Cn%5Cn%20%20%2F%2F%20%E7%95%A5%E5%8E%BB%E8%AE%A1%E7%AE%97update%E7%9A%84state%E8%BF%87%E7%A8%8B%5Cn%20%20queue.last%20%3D%20update%3B%5Cn%20%20...%5Cn%20%20%2F%2F%20%E8%A7%A6%E5%8F%91React%E7%9A%84%E6%9B%B4%E6%96%B0%E8%B0%83%E5%BA%A6%EF%BC%8CscheduleWork%E6%98%AFschedule%E9%98%B6%E6%AE%B5%E7%9A%84%E8%B5%B7%E7%82%B9%5Cn%20%20scheduleWork(fiber%2C%20expirationTime)%3B%5Cn%7D%22%2C%22id%22%3A%22FPDN2%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// useState() 首次render时执行mountState</span>
<span class="cm-keyword">function</span> <span class="cm-def">mountState</span>(<span class="cm-def">initialState</span>) {
  <span class="cm-comment">// 从当前Fiber生成一个新的hook对象，将此hook挂载到Fiber的hook链尾，并返回这个hook</span>
  <span class="cm-keyword">var</span> <span class="cm-def">hook</span> <span class="cm-operator">=</span> <span class="cm-variable">mountWorkInProgressHook</span>();
  
  <span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">baseState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">initialState</span>;
  
  <span class="cm-keyword">var</span> <span class="cm-def">queue</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">queue</span> <span class="cm-operator">=</span> {
    <span class="cm-property">last</span>: <span class="cm-atom">null</span>,
    <span class="cm-property">dispatch</span>: <span class="cm-atom">null</span>,
    <span class="cm-property">lastRenderedReducer</span>: (<span class="cm-def">state</span>, <span class="cm-def">action</span>) <span class="cm-operator">=&gt;</span> <span class="cm-variable">isFn</span>(<span class="cm-variable-2">state</span>) <span class="cm-operator">?</span> <span class="cm-variable-2">action</span>(<span class="cm-variable-2">state</span>) : <span class="cm-variable-2">action</span>,
    <span class="cm-property">lastRenderedState</span>: <span class="cm-variable-2">initialState</span>
  };
  <span class="cm-comment">// currentlyRenderingFiber$1保存当前正在渲染的Fiber节点</span>
  <span class="cm-comment">// 将返回的dispatch和调用hook的节点建立起了连接，同时在dispatch里边可以访问queue对象</span>
  <span class="cm-keyword">var</span> <span class="cm-def">dispatch</span> <span class="cm-operator">=</span> <span class="cm-variable-2">queue</span>.<span class="cm-property">dispatch</span> <span class="cm-operator">=</span> <span class="cm-variable">dispatchAction</span>.<span class="cm-property">bind</span>(<span class="cm-atom">null</span>, <span class="cm-variable">currentlyRenderingFiber$1</span>, <span class="cm-variable-2">queue</span>);
  <span class="cm-keyword">return</span> [<span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span>, <span class="cm-variable-2">dispatch</span>];
}

<span class="cm-comment">//// 功能相当于setState！</span>
<span class="cm-keyword">function</span> <span class="cm-def">dispatchAction</span>(<span class="cm-def">fiber</span>, <span class="cm-def">queue</span>, <span class="cm-def">action</span>) {
  <span class="cm-meta">...</span>
  <span class="cm-keyword">var</span> <span class="cm-variable">update</span> <span class="cm-operator">=</span> {
    <span class="cm-property">action</span>, <span class="cm-comment">// 接受普通值，也可以是函数</span>
    <span class="cm-property">next</span>: <span class="cm-atom">null</span>,
  };
  <span class="cm-keyword">var</span> <span class="cm-def">last</span> <span class="cm-operator">=</span> <span class="cm-variable-2">queue</span>.<span class="cm-property">last</span>;

  <span class="cm-keyword">if</span> (<span class="cm-variable-2">last</span> <span class="cm-operator">===</span> <span class="cm-atom">null</span>) {
    <span class="cm-variable">update</span>.<span class="cm-property">next</span> <span class="cm-operator">=</span> <span class="cm-variable">update</span>;
  } <span class="cm-keyword">else</span> {
    <span class="cm-variable-2">last</span>.<span class="cm-property">next</span> <span class="cm-operator">=</span> <span class="cm-variable">update</span>;
  }

  <span class="cm-comment">// 略去计算update的state过程</span>
  <span class="cm-variable-2">queue</span>.<span class="cm-property">last</span> <span class="cm-operator">=</span> <span class="cm-variable">update</span>;
  <span class="cm-meta">...</span>
  <span class="cm-comment">// 触发React的更新调度，scheduleWork是schedule阶段的起点</span>
  <span class="cm-variable">scheduleWork</span>(<span class="cm-variable-2">fiber</span>, <span class="cm-variable">expirationTime</span>);
}</pre>
    </div>
  </div>
</div>

  * `dispatchAction`函数是更新state的关键，它会生成一个`update`挂载到hook队列上面，并提交一个React更新调度，后续的工作和类组件一致。
  * 理论上可以同时调用多次dispatch，但只有最后一次会生效（queue的last指针指向最后一次update的state）
  * 注意`useState`更新数据和`setState`不同的是，前者会对state做merge，我们只需把更改的部分传进去，但是`useState`则是直接覆盖！

> schedule阶段介于reconcile和commit阶段之间，schedule的起点方法是scheduleWork。 ReactDOM.render, setState，forceUpdate, React Hooks的dispatchAction都要经过scheduleWork。
> 
> Ref：<a href="https://zhuanlan.zhihu.com/p/54042084" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/54042084</a>

update阶段useState()更新状态：

<div id="hBZt6" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22function%20updateState(initialState)%20%7B%5Cn%5Ctvar%20hook%20%3D%20updateWorkInProgressHook()%3B%5Cn%20%20var%20queue%20%3D%20hook.queue%3B%5Cn%20%20var%20newState%3B%5Cn%20%20var%20update%3B%5Cn%20%20%5Cn%20%20if%20(numberOfReRenders%20%3E%200)%20%7B%5Cn%20%20%20%20%2F%2F%20%E7%BB%84%E4%BB%B6%E8%87%AA%E5%B7%B1re-render%5Cn%20%20%20%20newState%20%3D%20hook.memoizedState%3B%5Cn%20%20%20%20%2F%2F%20renderPhaseUpdates%E6%98%AF%E4%B8%80%E4%B8%AA%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%EF%BC%8C%E6%98%AF%E4%B8%80%E4%B8%AA%E7%9A%84HashMap%E7%BB%93%E6%9E%84%EF%BC%9AHashMap%3C(Queue%3A%20Update)%3E%5Cn%20%20%20%20update%20%3D%20renderPhaseUpdates.get(queue)%3B%5Cn%20%20%7D%20else%20%7B%5Cn%20%20%20%20%2F%2F%20update%5Cn%20%20%5CtnewState%20%3D%20hook.baseState%3B%5Cn%20%20%20%20update%20%3D%20hook.baseUpdate%20%7C%7C%20queue.last%3B%5Cn%20%20%7D%5Cn%20%20%5Cn%20%20do%20%7B%5Cn%20%20%20%20newState%20%3D%20update.action%3B%20%2F%2F%20action%E5%8F%AF%E8%83%BD%E6%98%AF%E5%87%BD%E6%95%B0%EF%BC%8C%E8%BF%99%E9%87%8C%E7%95%A5%E5%8E%BB%E4%BA%86%E7%BB%86%E8%8A%82%5Cn%20%20%20%20update%20%3D%20update.next%3B%5Cn%20%20%7D%20while(update%20!%3D%3D%20null)%5Cn%20%20%5Cn%20%5Cthook.memoizedState%20%3D%20newState%3B%5Cn%20%20return%20%5Bhook.memoizedState%2C%20queue.dispatch%5D%3B%5Cn%7D%22%2C%22id%22%3A%22hBZt6%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">updateState</span>(<span class="cm-def">initialState</span>) {
  <span class="cm-keyword">var</span> <span class="cm-def">hook</span> <span class="cm-operator">=</span> <span class="cm-variable">updateWorkInProgressHook</span>();
  <span class="cm-keyword">var</span> <span class="cm-def">queue</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">queue</span>;
  <span class="cm-keyword">var</span> <span class="cm-def">newState</span>;
  <span class="cm-keyword">var</span> <span class="cm-def">update</span>;
  
  <span class="cm-keyword">if</span> (<span class="cm-variable">numberOfReRenders</span> <span class="cm-operator">&gt;</span> <span class="cm-number"></span>) {
    <span class="cm-comment">// 组件自己re-render</span>
    <span class="cm-variable-2">newState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span>;
    <span class="cm-comment">// renderPhaseUpdates是一个全局变量，是一个的HashMap结构：HashMap&lt;(Queue: Update)&gt;</span>
    <span class="cm-variable-2">update</span> <span class="cm-operator">=</span> <span class="cm-variable">renderPhaseUpdates</span>.<span class="cm-property">get</span>(<span class="cm-variable-2">queue</span>);
  } <span class="cm-keyword">else</span> {
    <span class="cm-comment">// update</span>
    <span class="cm-variable-2">newState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">baseState</span>;
    <span class="cm-variable-2">update</span> <span class="cm-operator">=</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">baseUpdate</span> <span class="cm-operator">|</span><span class="cm-operator">|</span> <span class="cm-variable-2">queue</span>.<span class="cm-property">last</span>;
  }
  
  <span class="cm-keyword">do</span> {
    <span class="cm-variable-2">newState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">update</span>.<span class="cm-property">action</span>; <span class="cm-comment">// action可能是函数，这里略去了细节</span>
    <span class="cm-variable-2">update</span> <span class="cm-operator">=</span> <span class="cm-variable-2">update</span>.<span class="cm-property">next</span>;
  } <span class="cm-keyword">while</span>(<span class="cm-variable-2">update</span> <span class="cm-operator">!==</span> <span class="cm-atom">null</span>)
  
  <span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">newState</span>;
  <span class="cm-keyword">return</span> [<span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span>, <span class="cm-variable-2">queue</span>.<span class="cm-property">dispatch</span>];
}</pre>
    </div>
  </div>
</div>

  * 在update阶段，传入的initialState是没有用到的
  * React会执行hook上面的整个update队列以获取最新的state

#### 4、更新过程示意 {#bHgiv}

<div id="NmPvG" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%5Ctconst%20%5Bn1%2C%20setN1%5D%20%3D%20useState(1)%3B%5Cn%20%20const%20%5Bn2%2C%20setN2%5D%20%3D%20useState(2)%3B%5Cn%20%20const%20%5Bn3%2C%20setN3%5D%20%3D%20useState(3)%3B%5Cn%20%20%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%5CtsetN1(10)%3B%5Cn%20%20%20%20setN1(100)%3B%5Cn%20%20%7D%2C%20%5B%5D)%3B%5Cn%20%20%5Cn%20%20return%20(%3Cbutton%20onClick%3D%7B()%20%3D%3E%20setN2(20)%7D%3Eclick%3C%2Fbutton%3E)%3B%5Cn%7D%22%2C%22id%22%3A%22NmPvG%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">n1</span>, <span class="cm-def">setN1</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">1</span>);
  <span class="cm-keyword">const</span> [<span class="cm-def">n2</span>, <span class="cm-def">setN2</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">2</span>);
  <span class="cm-keyword">const</span> [<span class="cm-def">n3</span>, <span class="cm-def">setN3</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number">3</span>);
  
  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable-2">setN1</span>(<span class="cm-number">10</span>);
    <span class="cm-variable-2">setN1</span>(<span class="cm-number">100</span>);
  }, []);
  
  <span class="cm-keyword">return</span> (<span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{() <span class="cm-operator">=&gt;</span> <span class="cm-variable-2">setN2</span>(<span class="cm-number">20</span>)}<span class="cm-operator">&gt;</span><span class="cm-variable">click</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;);</span>
}</pre>
    </div>
  </div>
</div>

图解更新过程：

<p id="okyzUro">
  <img loading="lazy" class="alignnone  wp-image-4896 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/format,webp" alt="" width="616" height="328" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/format,webp 949w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_160/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_409/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984bcbec50.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_426/format,webp 800w" sizes="(max-width: 616px) 100vw, 616px" />
</p>

  * setState返回的setter执行会导致re-render
  * 框架内部会对多次setter操作进行合并（循环执行传入的setter，目的是保证useState拿到最新的状态）

### useEffect {#Be9qd}

<div id="rCFHl" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22useEffect(effect%3A%20React.EffectCallback%2C%20deps%3F%3A%20ReadonlyArray%3Cany%3E%20%7C%20undefined)%22%2C%22id%22%3A%22rCFHl%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">useEffect</span>(<span class="cm-variable">effect</span>: <span class="cm-variable">React</span>.<span class="cm-variable">EffectCallback</span>, <span class="cm-variable">deps</span><span class="cm-operator">?</span>: <span class="cm-variable">ReadonlyArray</span><span class="cm-operator">&lt;</span><span class="cm-variable">any</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-atom">undefined</span>)</pre>
    </div>
  </div>
</div>

作用：处理函数组件中的副作用，如异步操作、延迟操作等，可以替代类组件的`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等生命周期函数。

#### 1、API实现分析 {#GGIW3}

<div id="gwrwb" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22HooksDispatcherOnMountInDEV%20%3D%20%7B%5Cn%5CtuseEffect%3A%20function()%20%7B%5Cn%20%20%5CtcurrentHookNameInDev%20%3D%20'useEffect'%3B%5Cn%20%20%20%20...%5Cn%20%20%20%20return%20mountEffectImpl(Update%20%7C%20Passive%2C%20UnmountPassive%20%7C%20MountPassive%2C%20create%2C%20deps)%3B%5Cn%20%20%7D%2C%5Cn%7D%3B%5Cn%5Cnfunction%20mountEffectImpl(fiberEffectTag%2C%20hookEffectTag%2C%20create%2C%20deps)%20%7B%5Cn%20%20var%20hook%20%3D%20mountWorkInProgressHook()%3B%5Cn%20%20var%20nextDeps%20%3D%20deps%20%3D%3D%3D%20undefined%20%3F%20null%20%3A%20deps%3B%5Cn%20%20return%20hook.memoizedState%20%3D%20pushEffect(hookEffectTag%2C%20create%2C%20undefined%2C%20nextDeps)%3B%5Cn%7D%5Cn%5Cnfunction%20pushEffect(tag%2C%20create%2C%20destroy%2C%20deps)%20%7B%5Cn%20%20var%20effect%20%3D%20%7B%5Cn%20%20%20%20tag%3A%20tag%2C%5Cn%20%20%20%20create%3A%20create%2C%20%2F%2F%20%E5%AD%98%E5%82%A8useEffect%E4%BC%A0%E5%85%A5%E7%9A%84callback%5Cn%20%20%20%20destroy%3A%20destroy%2C%5Cn%20%20%20%20deps%3A%20deps%2C%5Cn%20%20%20%20next%3A%20null%5Cn%20%20%7D%3B%5Cn%20%20.....%5Cn%20%20componentUpdateQueue%20%3D%20createFunctionComponentUpdateQueue()%3B%5Cn%20%20componentUpdateQueue.lastEffect%20%3D%20effect.next%20%3D%20effect%3B%5Cn%20%20....%5Cn%20%20return%20effect%3B%5Cn%7D%5Cn%5Cnfunction%20renderWithHooks()%20%7B%5Cn%5Ct....%5Cn%20%20currentlyRenderingFiber%241.updateQueue%20%3D%20componentUpdateQueue%3B%5Cn%20%20....%5Cn%7D%22%2C%22id%22%3A%22gwrwb%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">HooksDispatcherOnMountInDEV</span> <span class="cm-operator">=</span> {
  <span class="cm-property">useEffect</span>: <span class="cm-keyword">function</span>() {
    <span class="cm-variable">currentHookNameInDev</span> <span class="cm-operator">=</span> <span class="cm-string">'useEffect'</span>;
    <span class="cm-meta">...</span>
    <span class="cm-keyword">return</span> <span class="cm-variable">mountEffectImpl</span>(<span class="cm-variable">Update</span> <span class="cm-operator">|</span> <span class="cm-variable">Passive</span>, <span class="cm-variable">UnmountPassive</span> <span class="cm-operator">|</span> <span class="cm-variable">MountPassive</span>, <span class="cm-variable">create</span>, <span class="cm-variable">deps</span>);
  },
};

<span class="cm-keyword">function</span> <span class="cm-def">mountEffectImpl</span>(<span class="cm-def">fiberEffectTag</span>, <span class="cm-def">hookEffectTag</span>, <span class="cm-def">create</span>, <span class="cm-def">deps</span>) {
  <span class="cm-keyword">var</span> <span class="cm-def">hook</span> <span class="cm-operator">=</span> <span class="cm-variable">mountWorkInProgressHook</span>();
  <span class="cm-keyword">var</span> <span class="cm-def">nextDeps</span> <span class="cm-operator">=</span> <span class="cm-variable-2">deps</span> <span class="cm-operator">===</span> <span class="cm-atom">undefined</span> <span class="cm-operator">?</span> <span class="cm-atom">null</span> : <span class="cm-variable-2">deps</span>;
  <span class="cm-keyword">return</span> <span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span> <span class="cm-operator">=</span> <span class="cm-variable">pushEffect</span>(<span class="cm-variable-2">hookEffectTag</span>, <span class="cm-variable-2">create</span>, <span class="cm-atom">undefined</span>, <span class="cm-variable-2">nextDeps</span>);
}

<span class="cm-keyword">function</span> <span class="cm-def">pushEffect</span>(<span class="cm-def">tag</span>, <span class="cm-def">create</span>, <span class="cm-def">destroy</span>, <span class="cm-def">deps</span>) {
  <span class="cm-keyword">var</span> <span class="cm-def">effect</span> <span class="cm-operator">=</span> {
    <span class="cm-property">tag</span>: <span class="cm-variable-2">tag</span>,
    <span class="cm-property">create</span>: <span class="cm-variable-2">create</span>, <span class="cm-comment">// 存储useEffect传入的callback</span>
    <span class="cm-property">destroy</span>: <span class="cm-variable-2">destroy</span>,
    <span class="cm-property">deps</span>: <span class="cm-variable-2">deps</span>,
    <span class="cm-property">next</span>: <span class="cm-atom">null</span>
  };
  <span class="cm-meta">...</span>..
  <span class="cm-variable">componentUpdateQueue</span> <span class="cm-operator">=</span> <span class="cm-variable">createFunctionComponentUpdateQueue</span>();
  <span class="cm-variable">componentUpdateQueue</span>.<span class="cm-property">lastEffect</span> <span class="cm-operator">=</span> <span class="cm-variable-2">effect</span>.<span class="cm-property">next</span> <span class="cm-operator">=</span> <span class="cm-variable-2">effect</span>;
  <span class="cm-meta">...</span>.
  <span class="cm-variable">return</span> <span class="cm-variable-2">effect</span>;
}

<span class="cm-keyword">function</span> <span class="cm-def">renderWithHooks</span>() {
  <span class="cm-meta">...</span>.
  <span class="cm-variable">currentlyRenderingFiber$1</span>.<span class="cm-property">updateQueue</span> <span class="cm-operator">=</span> <span class="cm-variable">componentUpdateQueue</span>;
  <span class="cm-meta">...</span>.
}</pre>
    </div>
  </div>
</div>

`useEffect`调用也会在当前Fiber节点的hook链追加一个hook并返回，它的memoizedState存放一个`effect`对象，`effect`对象最终会被挂载到Fiber节点的`updateQueue`队列（当Fiber节点都渲染到页面上后，就会开始执行Fiber节点中的`updateQueue`中所保存的函数）。

#### 2、deps参数很重要 {#HaxmO}

下面一段很常见的代码，&#x1f914;有什么问题？运行<a href="https://codesandbox.io/s/effect-deps-1wg8v" target="_blank" rel="noopener noreferrer">demo</a>

<div id="iR2KC" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E7%94%A8Hook%E5%86%99%5Cnfunction%20App()%20%7B%5Cn%5Ctconst%20%5Bdata%2C%20setData%5D%20%3D%20useState('')%3B%5Cn%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%20%20setTimeout(()%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20setData(%60current%20data%3A%20%24%7BDate.now()%7D%60)%3B%5Cn%20%20%20%20%7D%2C%203000)%3B%5Cn%20%20%7D)%3B%5Cn%20%20%5Cn%20%20return%20%3Cdiv%3E%7Bdata%7D%3C%2Fdiv%3E%3B%5Cn%7D%5Cn%2F%2F%20%E7%AD%89%E4%BB%B7%E4%BB%A3%E7%A0%81%5Cnclass%20App%20extends%20Component%20%7B%5Cn%5Ctstate%20%3D%20%7Bdata%20%3D%20''%7D%5Cn%5Cn%5CtcomponentDidMount()%20%7B%5Cn%20%20%5CtsetTimeout(()%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20this.setState(%7B%20data%3A%20%60current%20data%3A%20%24%7BDate.now()%7D%60%20%7D)%3B%5Cn%20%20%20%20%7D%2C%203000)%3B%5Cn%20%20%7D%5Cn%5Ct%5Cn%5Ctrender()%20%7B%5Cn%20%20%5Ctreturn%20%3Cdiv%3E%7Bthis.state.data%7D%3C%2Fdiv%3E%3B%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22iR2KC%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// 用Hook写</span>
<span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">data</span>, <span class="cm-def">setData</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-string">''</span>);

  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable">setTimeout</span>(() <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable-2">setData</span>(<span class="cm-string-2">`current data: ${</span><span class="cm-variable">Date</span>.<span class="cm-property">now</span>()<span class="cm-string-2">}</span><span class="cm-string-2">`</span>);
    }, <span class="cm-number">3000</span>);
  });
  
  <span class="cm-keyword">return</span> <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>{<span class="cm-property">data</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;;</span>
}
<span class="cm-comment">// 等价代码</span>
<span class="cm-keyword">class</span> <span class="cm-def">App</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">state</span> <span class="cm-operator">=</span> {<span class="cm-property">data</span> <span class="cm-operator">=</span> <span class="cm-string">''</span>}

  <span class="cm-variable">componentDidMount</span>() {
    <span class="cm-variable">setTimeout</span>(() <span class="cm-operator">=&gt;</span> {
      <span class="cm-keyword">this</span>.<span class="cm-property">setState</span>({ <span class="cm-property">data</span>: <span class="cm-string-2">`current data: ${</span><span class="cm-variable">Date</span>.<span class="cm-property">now</span>()<span class="cm-string-2">}</span><span class="cm-string-2">`</span> });
    }, <span class="cm-number">3000</span>);
  }
  
  <span class="cm-variable">render</span>() {
    <span class="cm-keyword">return</span> <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>{<span class="cm-property">this</span>.<span class="cm-variable">state</span>.<span class="cm-variable">data</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;;</span>
  }
}</pre>
    </div>
  </div>
</div>

  * 组件re-render时，函数组件是重新执行整个函数，其中也包括所有“注册”过的hooks，默认情况下useEffect callback也会被重新执行！
  * useEffect可以接受第二个参数`deps`，用于在re-render时判断是否重新执行callback，所以deps必须要按照实际依赖传入，不能少传也不要多传！
  * deps数组项必须是mutable的，比如你不能传

#### 3、清理副作用 {#2Kcn1}

Hook接受useEffect传入的callback返回一个函数，在Fiber的清理阶段将会执行这个函数，从而达到清理effect的效果：

<div id="n78kh" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%5CtuseEffect(()%20%3D%3E%20%7B%5Cn%20%20%5Ctconst%20timer%20%3D%20setTimeout(()%20%3D%3E%20%7B%5Cn%20%20%20%20%5Ctconsole.log('print%20log%20after%201s!')%3B%5Cn%20%20%20%20%7D%2C%201000)%3B%5Cn%20%20%20%20window.addEventListener('load'%2C%20loadHandle)%3B%5Cn%20%20%20%20%5Cn%20%20%20%20return%20()%20%3D%3E%20window.removeEventListener('load'%2C%20loadHandle)%3B%20%2F%2F%20%E6%89%A7%E8%A1%8C%E6%B8%85%E7%90%86%5Cn%20%20%7D%2C%20%5B%5D)%3B%5Cn%7D%5Cn%5Cn%2F%2F%20%E5%90%8C%E7%AD%89%E5%AE%9E%E7%8E%B0%5Cnclass%20App%20extends%20Component%20%7B%5Cn%5CtcomponentDidMount()%20%7B%5Cn%20%20%5Ctconst%20timer%20%3D%20setTimeout(()%20%3D%3E%20%7B%5Cn%20%20%20%20%5Ctconsole.log('print%20log%20after%201s!')%3B%5Cn%20%20%20%20%7D%2C%201000)%3B%5Cn%20%20%20%20window.addEventListener('load'%2C%20loadHandle)%3B%5Cn%20%20%7D%5Cn%20%20%5Cn%20%20componentDidUnmount()%20%7B%5Cn%20%20%5Ctwindow.removeEventListener('load'%2C%20loadHandle)%3B%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22n78kh%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-keyword">const</span> <span class="cm-def">timer</span> <span class="cm-operator">=</span> <span class="cm-variable">setTimeout</span>(() <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'print log after 1s!'</span>);
    }, <span class="cm-number">1000</span>);
    <span class="cm-variable">window</span>.<span class="cm-property">addEventListener</span>(<span class="cm-string">'load'</span>, <span class="cm-variable">loadHandle</span>);
    
    <span class="cm-keyword">return</span> () <span class="cm-operator">=&gt;</span> <span class="cm-variable">window</span>.<span class="cm-property">removeEventListener</span>(<span class="cm-string">'load'</span>, <span class="cm-variable">loadHandle</span>); <span class="cm-comment">// 执行清理</span>
  }, []);
}

<span class="cm-comment">// 同等实现</span>
<span class="cm-keyword">class</span> <span class="cm-def">App</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">componentDidMount</span>() {
    <span class="cm-keyword">const</span> <span class="cm-def">timer</span> <span class="cm-operator">=</span> <span class="cm-variable">setTimeout</span>(() <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable">console</span>.<span class="cm-property">log</span>(<span class="cm-string">'print log after 1s!'</span>);
    }, <span class="cm-number">1000</span>);
    <span class="cm-variable">window</span>.<span class="cm-property">addEventListener</span>(<span class="cm-string">'load'</span>, <span class="cm-variable">loadHandle</span>);
  }
  
  <span class="cm-property">componentDidUnmount</span>() {
    <span class="cm-variable">window</span>.<span class="cm-property">removeEventListener</span>(<span class="cm-string">'load'</span>, <span class="cm-variable">loadHandle</span>);
  }
}</pre>
    </div>
  </div>
</div>

### useReducer {#Xy45x}

<div id="dFs5j" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22useReducer%3CS%2C%20I%2C%20A%3E(reducer%3A%20(S%2C%20A)%20%3D%3E%20S%2C%20initialArg%3A%20I%2C%20init%3F%3A%20I%20%3D%3E%20S%2C%20)%3A%20%5BS%2C%20Dispatch%3CA%3E%5D%22%2C%22id%22%3A%22dFs5j%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">useReducer</span><span class="cm-operator">&lt;</span><span class="cm-type">S</span>, <span class="cm-type">I</span>, <span class="cm-type">A</span><span class="cm-operator">&gt;</span>(<span class="cm-variable">reducer</span>: (<span class="cm-variable">S</span>, <span class="cm-variable">A</span>) <span class="cm-operator">=&gt;</span> <span class="cm-variable">S</span>, <span class="cm-variable">initialArg</span>: <span class="cm-variable">I</span>, <span class="cm-variable">init</span><span class="cm-operator">?</span>: <span class="cm-variable">I</span> <span class="cm-operator">=&gt;</span> <span class="cm-variable">S</span>, ): [<span class="cm-variable">S</span>, <span class="cm-variable">Dispatch</span><span class="cm-operator">&lt;</span><span class="cm-variable">A</span><span class="cm-operator">&gt;</span>]</pre>
    </div>
  </div>
</div>

作用：用于管理复杂的数据结构（`useState`一般用于管理扁平结构的状态），基本实现了redux的核心功能。

<div id="uochT" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22const%20%5Bstate%2C%20dispatch%5D%20%3D%20useReducer(reducer%2C%20%7Bcount%3A%20initialCount%2C%20step%3A%2010%7D)%3B%5Cn%2F%2F%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch(%7Btype%3A%20'increment'%7D)%7D%3E%2B%3C%2Fbutton%3E%5Cn%2F%2F%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch(%7Btype%3A%20'decrement'%7D)%7D%3E-%3C%2Fbutton%3E%22%2C%22id%22%3A%22uochT%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">const</span> [<span class="cm-def">state</span>, <span class="cm-def">dispatch</span>] <span class="cm-operator">=</span> <span class="cm-variable">useReducer</span>(<span class="cm-variable">reducer</span>, {<span class="cm-property">count</span>: <span class="cm-variable">initialCount</span>, <span class="cm-property">step</span>: <span class="cm-number">10</span>});
<span class="cm-comment">// &lt;button onClick={() =&gt; dispatch({type: 'increment'})}&gt;+&lt;/button&gt;</span>
<span class="cm-comment">// &lt;button onClick={() =&gt; dispatch({type: 'decrement'})}&gt;-&lt;/button&gt;</span></pre>
    </div>
  </div>
</div>

reducer提供了一种可以在组件外重新编排state的能力，而useReducer返回的`dispatch`对象又是“性能安全的”，可以直接放心地传递给子组件而不会引起re-render问题。

<div id="wPoXH" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22function%20reducer(state%2C%20action)%20%7B%5Cn%20%20%2F%2F%20%E8%BF%99%E9%87%8C%E8%83%BD%E5%A4%9F%E6%8B%BF%E5%88%B0%E7%BB%84%E4%BB%B6%E7%9A%84%E5%85%A8%E9%83%A8state%EF%BC%81%EF%BC%81%5Cn%20%20switch%20(action.type)%20%7B%5Cn%20%20%20%20case%20%5C%22increment%5C%22%3A%5Cn%20%20%20%20%20%20return%20%7B%5Cn%20%20%20%20%20%20%20%20...state%2C%5Cn%20%20%20%20%20%20%20%20count%3A%20state.count%20%2B%20state.step%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20...%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22wPoXH%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">reducer</span>(<span class="cm-def">state</span>, <span class="cm-def">action</span>) {
  <span class="cm-comment">// 这里能够拿到组件的全部state！！</span>
  <span class="cm-keyword">switch</span> (<span class="cm-variable-2">action</span>.<span class="cm-property">type</span>) {
    <span class="cm-keyword">case</span> <span class="cm-string">"increment"</span>:
      <span class="cm-keyword">return</span> {
        <span class="cm-meta">...</span><span class="cm-variable-2">state</span>,
        <span class="cm-property">count</span>: <span class="cm-variable-2">state</span>.<span class="cm-property">count</span> <span class="cm-operator">+</span> <span class="cm-variable-2">state</span>.<span class="cm-property">step</span>
      };
    <span class="cm-meta">...</span>
  }
}</pre>
    </div>
  </div>
</div>

<p id="aHeFmIY">
  <img loading="lazy" class="alignnone  wp-image-4895 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/format,webp" alt="" width="617" height="103" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/format,webp 1510w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_50/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_128/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4984abc1b29.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_134/format,webp 800w" sizes="(max-width: 617px) 100vw, 617px" />
</p>

### 性能优化（Memoization） {#Pc6Dk}

#### useCallback {#c3wDK}

<div id="dEG7F" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%20useCallback%3CT%3E(callback%3A%20T%2C%20deps%3A%20Array%3Cmixed%3E%20%7C%20void%20%7C%20null)%3A%20T%22%2C%22id%22%3A%22dEG7F%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"> <span class="cm-variable">useCallback</span><span class="cm-operator">&lt;</span><span class="cm-variable">T</span><span class="cm-operator">&gt;</span>(<span class="cm-variable">callback</span>: <span class="cm-variable">T</span>, <span class="cm-variable">deps</span>: <span class="cm-variable">Array</span><span class="cm-operator">&lt;</span><span class="cm-variable">mixed</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-keyword">void</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>): <span class="cm-variable">T</span></pre>
    </div>
  </div>
</div>

由于javascript函数的特殊性，当函数签名被作为deps传入useEffect时，还是会引起re-render（即使函数体没有改变），这种现象在类组件里边也存在：

<div id="Xxn19" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E5%BD%93Parent%E7%BB%84%E4%BB%B6re-render%E6%97%B6%EF%BC%8CChild%E7%BB%84%E4%BB%B6%E4%B9%9F%E4%BC%9Are-render%5Cnclass%20Parent%20extends%20Component%20%7B%5Cn%5Ctrender()%20%7B%5Cn%20%20%20%20const%20someFn%20%3D%20()%20%3D%3E%20%7B%7D%3B%20%2F%2F%20re-render%E6%97%B6%EF%BC%8CsomeFn%E5%87%BD%E6%95%B0%E4%BC%9A%E9%87%8D%E6%96%B0%E5%AE%9E%E4%BE%8B%E5%8C%96%5Cn%20%20%20%20%5Cn%20%20%5Ctreturn%20(%5Cn%20%20%20%20%5Ct%3C%3E%5Cn%20%20%20%20%20%20%5Ct%3CChild%20someFn%3D%7BsomeFn%7D%20%2F%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3COther%20%2F%3E%5Cn%20%20%20%20%20%20%3C%2F%3E%5Cn%20%20%20%20)%3B%5Cn%20%20%7D%5Cn%7D%5Cn%5Cnclass%20Child%20extends%20Component%20%7B%5Cn%5CtcomponentShouldUpdate(prevProps%2C%20nextProps)%20%7B%5Cn%20%20%5Ctreturn%20prevProps.someFn%20!%3D%3D%20nextProps.someFn%3B%20%2F%2F%20%E5%87%BD%E6%95%B0%E6%AF%94%E8%BE%83%E5%B0%86%E6%B0%B8%E8%BF%9C%E8%BF%94%E5%9B%9Efalse%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22Xxn19%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// 当Parent组件re-render时，Child组件也会re-render</span>
<span class="cm-keyword">class</span> <span class="cm-def">Parent</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">render</span>() {
    <span class="cm-keyword">const</span> <span class="cm-def">someFn</span> <span class="cm-operator">=</span> () <span class="cm-operator">=&gt;</span> {}; <span class="cm-comment">// re-render时，someFn函数会重新实例化</span>
    
    <span class="cm-keyword">return</span> (
      <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">Child</span> <span class="cm-variable-2">someFn</span><span class="cm-operator">=</span>{<span class="cm-variable-2">someFn</span>} <span class="cm-string-2">/&gt;</span>
        <span class="cm-operator">&lt;</span><span class="cm-variable">Other</span> <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
    );
  }
}

<span class="cm-keyword">class</span> <span class="cm-def">Child</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {
  <span class="cm-property">componentShouldUpdate</span>(<span class="cm-def">prevProps</span>, <span class="cm-def">nextProps</span>) {
    <span class="cm-keyword">return</span> <span class="cm-variable-2">prevProps</span>.<span class="cm-property">someFn</span> <span class="cm-operator">!==</span> <span class="cm-variable-2">nextProps</span>.<span class="cm-property">someFn</span>; <span class="cm-comment">// 函数比较将永远返回false</span>
  }
}</pre>
    </div>
  </div>
</div>

Function Component（查看<a href="https://codesandbox.io/s/memoization-lbgob" target="_blank" rel="noopener noreferrer">demo</a>）：

<div id="vpSUK" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App()%20%7B%5Cn%20%20const%20%5Bcount%2C%20setCount%5D%20%3D%20useState(0)%3B%5Cn%20%20const%20%5Blist%2C%20setList%5D%20%3D%20useState(%5B%5D)%3B%5Cn%20%20const%20fetchData%20%3D%20async%20()%20%3D%3E%20%7B%5Cn%20%20%20%20setTimeout(()%20%3D%3E%20%7B%5Cn%20%20%20%20%20%20setList(initList)%3B%5Cn%20%20%20%20%7D%2C%203000)%3B%5Cn%20%20%7D%3B%5Cn%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%20%20fetchData()%3B%5Cn%20%20%7D%2C%20%5BfetchData%5D)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3C%3E%5Cn%20%20%20%20%20%20%3Cdiv%3Eclick%20%7Bcount%7D%20times%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20setCount(count%20%2B%201)%7D%3EAdd%20count%3C%2Fbutton%3E%5Cn%20%20%20%20%20%20%3CList%20list%3D%7Blist%7D%20%2F%3E%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22vpSUK%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">count</span>, <span class="cm-def">setCount</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number"></span>);
  <span class="cm-keyword">const</span> [<span class="cm-def">list</span>, <span class="cm-def">setList</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>([]);
  <span class="cm-keyword">const</span> <span class="cm-def">fetchData</span> <span class="cm-operator">=</span> <span class="cm-keyword">async</span> () <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable">setTimeout</span>(() <span class="cm-operator">=&gt;</span> {
      <span class="cm-variable-2">setList</span>(<span class="cm-variable">initList</span>);
    }, <span class="cm-number">3000</span>);
  };

  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable-2">fetchData</span>();
  }, [<span class="cm-variable-2">fetchData</span>]);

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">click</span> {<span class="cm-variable-2">count</span>} <span class="cm-variable">times</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{() <span class="cm-operator">=&gt;</span> <span class="cm-variable">setCount</span>(<span class="cm-variable">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>)}<span class="cm-operator">&gt;</span><span class="cm-variable">Add</span> <span class="cm-variable">count</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">List</span> <span class="cm-variable">list</span><span class="cm-operator">=</span>{<span class="cm-property">list</span>} <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

解决方案：

  * 将函数移到组件外部（缺点是无法读取组件的状态了）
  * 条件允许的话，把函数体移到`useEffect`内部
  * 如果函数的调用不止是`useEffect`内部（如需要传递给子组件），可以使用`useCallback` API包裹函数，`useCallback`的本质是对函数进行依赖分析，依赖变更时才重新执行

#### useMemo & memo {#dkJGO}

<div id="OQ1C2" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22useMemo%3CT%3E(create%3A%20()%20%3D%3E%20T%2C%20deps%3A%20Array%3Cmixed%3E%20%7C%20void%20%7C%20null)%3A%20T%22%2C%22id%22%3A%22OQ1C2%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">useMemo</span><span class="cm-operator">&lt;</span><span class="cm-variable">T</span><span class="cm-operator">&gt;</span>(<span class="cm-variable">create</span>: () <span class="cm-operator">=&gt;</span> <span class="cm-variable">T</span>, <span class="cm-variable">deps</span>: <span class="cm-variable">Array</span><span class="cm-operator">&lt;</span><span class="cm-variable">mixed</span><span class="cm-operator">&gt;</span> <span class="cm-operator">|</span> <span class="cm-keyword">void</span> <span class="cm-operator">|</span> <span class="cm-atom">null</span>): <span class="cm-variable">T</span></pre>
    </div>
  </div>
</div>

useMemo用于缓存一些耗时的计算结果，只有当依赖参数改变时才重新执行计算：

<div id="2XaIo" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20App(props)%20%7B%5Cn%20%20const%20start%20%3D%20props.start%3B%5Cn%20%20const%20list%20%3D%20props.list%3B%5Cn%20%20const%20fibValue%20%3D%20useMemo(()%20%3D%3E%20fibonacci(start)%2C%20%5Bstart%5D)%3B%20%2F%2F%20%E7%BC%93%E5%AD%98%E8%80%97%E6%97%B6%E6%93%8D%E4%BD%9C%5Cn%20%20const%20MemoList%20%3D%20useMemo(()%20%3D%3E%20%3CList%20list%3D%7Blist%7D%20%2F%3E%2C%20%5Blist%5D)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%5Ct%3C%3E%5Cn%20%20%20%20%5Ct%3Cdiv%3EDo%20some%20expensive%20calculation%3A%20%7BfibValue%7D%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%7BMemoList%7D%5Cn%5Ct%5Ct%5Ct%3COther%20%2F%3E%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%222XaIo%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">App</span>(<span class="cm-def">props</span>) {
  <span class="cm-keyword">const</span> <span class="cm-def">start</span> <span class="cm-operator">=</span> <span class="cm-variable-2">props</span>.<span class="cm-property">start</span>;
  <span class="cm-keyword">const</span> <span class="cm-def">list</span> <span class="cm-operator">=</span> <span class="cm-variable-2">props</span>.<span class="cm-property">list</span>;
  <span class="cm-keyword">const</span> <span class="cm-def">fibValue</span> <span class="cm-operator">=</span> <span class="cm-variable">useMemo</span>(() <span class="cm-operator">=&gt;</span> <span class="cm-variable">fibonacci</span>(<span class="cm-variable-2">start</span>), [<span class="cm-variable-2">start</span>]); <span class="cm-comment">// 缓存耗时操作</span>
  <span class="cm-keyword">const</span> <span class="cm-def">MemoList</span> <span class="cm-operator">=</span> <span class="cm-variable">useMemo</span>(() <span class="cm-operator">=&gt;</span> <span class="cm-operator">&lt;</span><span class="cm-variable">List</span> <span class="cm-variable-2">list</span><span class="cm-operator">=</span>{<span class="cm-variable-2">list</span>} <span class="cm-string-2">/&gt;, 

<ul>
  
</ul>
);</span>

  

<span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">Do</span> <span class="cm-variable">some</span> <span class="cm-variable">expensive</span> <span class="cm-variable">calculation</span>: {<span class="cm-variable">fibValue</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
      {<span class="cm-variable">MemoList</span>}
      <span class="cm-operator">&lt;</span><span class="cm-variable">Other</span> <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

> 简单理解：`useCallback(fn, deps) === useMemo(() => fn, deps)`

在函数组件中，React提供了一个和类组件中和`PureComponent`相同功能的API `React.memo`，<span class="lake-fontsize-11" style="font-size: 11px;">会在自身re-render时，对每一个 </span><span class="lake-fontsize-11" style="font-size: 11px;"><code>props</code></span><span class="lake-fontsize-11" style="font-size: 11px;"> 项进行浅对比，如果引用没有变化，就不会触发重渲染。</span>

<div id="cr4AF" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E5%8F%AA%E6%9C%89%E5%88%97%E8%A1%A8%E9%A1%B9%E6%94%B9%E5%8F%98%E6%97%B6%E7%BB%84%E4%BB%B6%E6%89%8D%E4%BC%9Are-render%5Cnconst%20MemoList%20%3D%20React.memo((%7B%20list%20%7D)%20%3D%3E%20%7B%5Cn%20%20return%20(%5Cn%20%20%20%20%3Cul%3E%5Cn%20%20%20%20%20%20%7Blist.map(item%20%3D%3E%20(%5Cn%20%20%20%20%20%20%20%20%3Cli%20key%3D%7Bitem.id%7D%3E%7Bitem.content%7D%3C%2Fli%3E%5Cn%20%20%20%20%20%20))%7D%5Cn%20%20%20%20%3C%2Ful%3E%5Cn%20%20)%3B%5Cn%7D)%3B%22%2C%22id%22%3A%22cr4AF%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// 只有列表项改变时组件才会re-render</span>
<span class="cm-keyword">const</span> <span class="cm-def">MemoList</span> <span class="cm-operator">=</span> <span class="cm-variable">React</span>.<span class="cm-property">memo</span>(({ <span class="cm-def">list</span> }) <span class="cm-operator">=&gt;</span> {
  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">ul</span><span class="cm-operator">&gt;</span>
      {<span class="cm-property">list</span>.<span class="cm-variable">map</span>(<span class="cm-variable">item</span> <span class="cm-operator">=&gt;</span> (
        <span class="cm-operator">&lt;</span><span class="cm-variable">li</span> <span class="cm-variable">key</span><span class="cm-operator">=</span>{<span class="cm-variable">item</span>.<span class="cm-variable">id</span>}<span class="cm-operator">&gt;</span>{<span class="cm-property">item</span>.<span class="cm-variable">content</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/li&gt;</span>
      ))}
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/ul&gt;</span>
  );
});</pre>
    </div>
  </div>
</div>

<span class="lake-fontsize-11" style="font-size: 11px;">相比</span>`<span class="lake-fontsize-11" style="font-size: 11px;">React.memo</span>`<span class="lake-fontsize-11" style="font-size: 11px;">，</span>`<span class="lake-fontsize-11" style="font-size: 11px;">useMemo</span>`<span class="lake-fontsize-11" style="font-size: 11px;">在组件内部调用，可以访问组件的props和state，所以它拥有更细粒度的依赖控制。</span>

### 组件间状态共享 {#S4wVk}

对于组件之间的状态共享，在类组件里边官方提供了Context相关的API：

  * 使用`React.createContext` API创建Context，由于支持在组件外部调用，因此可以实现状态共享
  * 使用`Context.Provider` API在上层组件挂载状态
  * 使用`Context.Consumer` API为具体的组件提供状态

<p id="flZGnES">
  <img loading="lazy" class="alignnone  wp-image-4894 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/format,webp" alt="" width="531" height="807" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/format,webp 1036w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/quality,q_50/resize,m_fill,w_197,h_300/format,webp 197w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_1167/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d49849b4fe48.png?x-oss-process=image/quality,q_50/resize,m_fill,w_395,h_600/format,webp 395w" sizes="(max-width: 531px) 100vw, 531px" />
</p>

（图片来自React官方示例）

在使用起来很不方便。。。

React团队为函数组件提供了`useContext` API，功能上约等于`<MyContext.Consumer>`，用于在函数组件内部获取状态。

<div id="z4QPG" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22useContext%3CT%3E(context%3A%20ReactContext%3CT%3E%2C%20observedBits%3A%20void%20%7C%20number%20%7C%20boolean)%3A%20T%22%2C%22id%22%3A%22z4QPG%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">useContext</span><span class="cm-operator">&lt;</span><span class="cm-type">T</span><span class="cm-operator">&gt;</span>(<span class="cm-variable">context</span>: <span class="cm-variable">ReactContext</span><span class="cm-operator">&lt;</span><span class="cm-variable">T</span><span class="cm-operator">&gt;</span>, <span class="cm-variable">observedBits</span>: <span class="cm-keyword">void</span> <span class="cm-operator">|</span> <span class="cm-variable">number</span> <span class="cm-operator">|</span> <span class="cm-variable">boolean</span>): <span class="cm-variable">T</span></pre>
    </div>
  </div>
</div>

`useContext`本身并没有什么特别，但是配合`useReducer`之后可以实现全局的状态管理了，这也是社区里提出的使用Hooks API取代redux的理论基础之一，查看<a href="https://codesandbox.io/s/simple-redux-tc37g" target="_blank" rel="noopener noreferrer">demo</a>：

<div id="sq3oU" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22typescript%22%2C%22code%22%3A%22const%20Context%20%3D%20createContext()%3B%5Cnconst%20reducer%20%3D%20(state%2C%20action)%20%3D%3E%20%7B%5Cn%20%20switch%20(action.type)%20%7B%5Cn%20%20%20%20case%20%5C%22increase%5C%22%3A%5Cn%20%20%20%20%20%20return%20%7B%5Cn%20%20%20%20%20%20%20%20...state%2C%5Cn%20%20%20%20%20%20%20%20count%3A%20state.count%20%2B%201%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20case%20%5C%22decrease%5C%22%3A%5Cn%20%20%20%20%20%20return%20%7B%5Cn%20%20%20%20%20%20%20%20...state%2C%5Cn%20%20%20%20%20%20%20%20count%3A%20state.count%20-%201%5Cn%20%20%20%20%20%20%7D%3B%5Cn%20%20%20%20default%3A%5Cn%20%20%20%20%20%20throw%20Error(%5C%22unknown%20action%5C%22)%3B%5Cn%20%20%7D%5Cn%7D%3B%5Cn%5Cnfunction%20App()%20%7B%5Cn%20%20const%20%5Bstate%2C%20dispatch%5D%20%3D%20useReducer(reducer%2C%20%7B%20count%3A%200%20%7D)%3B%5Cn%20%20const%20value%20%3D%20useMemo(()%20%3D%3E%20%5Bstate%2C%20dispatch%5D%2C%20%5Bstate%5D)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3CContext.Provider%20value%3D%7Bvalue%7D%3E%5Cn%20%20%20%20%20%20%3Cdiv%3EApp%20count%3A%20%7Bstate.count%7D%3C%2Fdiv%3E%5Cn%20%20%20%20%20%20%3CChild1%20%2F%3E%5Cn%20%20%20%20%20%20%3CChild2%20%2F%3E%5Cn%20%20%20%20%3C%2FContext.Provider%3E%5Cn%20%20)%3B%5Cn%7D%5Cn%5Cnfunction%20Child1()%20%7B%5Cn%20%20const%20%5Bstate%2C%20dispatch%5D%20%3D%20useContext(Context)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3Cdiv%3E%5Cn%20%20%20%20%20%20%3Cspan%3EChild1%20count%3A%20%7Bstate.count%7D%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch(%7B%20type%3A%20%5C%22increase%5C%22%20%7D)%7D%3Eincrease%3C%2Fbutton%3E%5Cn%20%20%20%20%3C%2Fdiv%3E%5Cn%20%20)%3B%5Cn%7D%5Cn%5Cnfunction%20Child2()%20%7B%5Cn%20%20const%20%5Bstate%2C%20dispatch%5D%20%3D%20useContext(Context)%3B%5Cn%5Cn%20%20return%20(%5Cn%20%20%20%20%3Cdiv%3E%5Cn%20%20%20%20%20%20%3Cspan%3EChild2%20count%3A%20%7Bstate.count%7D%3C%2Fspan%3E%5Cn%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20dispatch(%7B%20type%3A%20%5C%22decrease%5C%22%20%7D)%7D%3Edecrease%3C%2Fbutton%3E%5Cn%20%20%20%20%3C%2Fdiv%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22sq3oU%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">const</span> <span class="cm-def">Context</span> <span class="cm-operator">=</span> <span class="cm-variable">createContext</span>();
<span class="cm-keyword">const</span> <span class="cm-def">reducer</span> <span class="cm-operator">=</span> (<span class="cm-def">state</span>, <span class="cm-def">action</span>) <span class="cm-operator">=&gt;</span> {
  <span class="cm-keyword">switch</span> (<span class="cm-variable-2">action</span>.<span class="cm-property">type</span>) {
    <span class="cm-keyword">case</span> <span class="cm-string">"increase"</span>:
      <span class="cm-keyword">return</span> {
        <span class="cm-meta">...</span><span class="cm-variable-2">state</span>,
        <span class="cm-property">count</span>: <span class="cm-variable-2">state</span>.<span class="cm-property">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>
      };
    <span class="cm-keyword">case</span> <span class="cm-string">"decrease"</span>:
      <span class="cm-keyword">return</span> {
        <span class="cm-meta">...</span><span class="cm-variable-2">state</span>,
        <span class="cm-property">count</span>: <span class="cm-variable-2">state</span>.<span class="cm-property">count</span> <span class="cm-operator">-</span> <span class="cm-number">1</span>
      };
    <span class="cm-keyword">default</span>:
      <span class="cm-keyword">throw</span> <span class="cm-variable">Error</span>(<span class="cm-string">"unknown action"</span>);
  }
};

<span class="cm-keyword">function</span> <span class="cm-def">App</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">state</span>, <span class="cm-def">dispatch</span>] <span class="cm-operator">=</span> <span class="cm-variable">useReducer</span>(<span class="cm-variable">reducer</span>, { <span class="cm-property">count</span>: <span class="cm-number"></span> });
  <span class="cm-keyword">const</span> <span class="cm-def">value</span> <span class="cm-operator">=</span> <span class="cm-variable">useMemo</span>(() <span class="cm-operator">=&gt;</span> [<span class="cm-variable-2">state</span>, <span class="cm-variable-2">dispatch</span>], [<span class="cm-variable-2">state</span>]);

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">Context</span>.<span class="cm-property">Provider</span> <span class="cm-variable-2">value</span><span class="cm-operator">=</span>{<span class="cm-variable-2">value</span>}<span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span><span class="cm-variable">App</span> <span class="cm-variable">count</span>: {<span class="cm-variable">state</span>.<span class="cm-property">count</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">Child1</span> <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">Child2</span> <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/Context.Provider&gt;</span>
  );
}

<span class="cm-keyword">function</span> <span class="cm-def">Child1</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">state</span>, <span class="cm-def">dispatch</span>] <span class="cm-operator">=</span> <span class="cm-variable">useContext</span>(<span class="cm-variable">Context</span>);

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">span</span><span class="cm-operator">&gt;</span><span class="cm-variable">Child1</span> <span class="cm-variable">count</span>: {<span class="cm-variable-2">state</span>.<span class="cm-variable">count</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/span&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{() <span class="cm-operator">=&gt;</span> <span class="cm-variable">dispatch</span>({ <span class="cm-property">type</span>: <span class="cm-string">"increase"</span> })}<span class="cm-operator">&gt;</span><span class="cm-variable">increase</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
  );
}

<span class="cm-keyword">function</span> <span class="cm-def">Child2</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">state</span>, <span class="cm-def">dispatch</span>] <span class="cm-operator">=</span> <span class="cm-variable">useContext</span>(<span class="cm-variable">Context</span>);

  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">span</span><span class="cm-operator">&gt;</span><span class="cm-variable">Child2</span> <span class="cm-variable">count</span>: {<span class="cm-variable-2">state</span>.<span class="cm-variable">count</span>}<span class="cm-operator">&lt;</span><span class="cm-string-2">/span&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{() <span class="cm-operator">=&gt;</span> <span class="cm-variable">dispatch</span>({ <span class="cm-property">type</span>: <span class="cm-string">"decrease"</span> })}<span class="cm-operator">&gt;</span><span class="cm-variable">decrease</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

### Capture Values {#OLkuW}

1、`useState`具有capture values，查看<a href="https://codesandbox.io/s/cv-usestate-cocs4" target="_blank" rel="noopener noreferrer">demo</a>

2、`useEffect`具有capture values

<div id="c7nDT" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20Counter()%20%7B%5Cn%20%20const%20%5Bcount%2C%20setCount%5D%20%3D%20useState(0)%3B%5Cn%5Cn%20%20useEffect(()%20%3D%3E%20%7B%5Cn%20%20%20%20document.title%20%3D%20%60You%20clicked%20%24%7Bcount%7D%20times%60%3B%5Cn%20%20%7D)%3B%5Cn%5Ct%2F%2F%20%E8%BF%9E%E7%BB%AD%E7%82%B9%E5%87%BB%E4%B8%89%E6%AC%A1button%EF%BC%8C%E9%A1%B5%E9%9D%A2%E7%9A%84title%E5%B0%86%E4%BE%9D%E6%AC%A1%E6%94%B9%E4%B8%BA1%E3%80%812%E3%80%813%EF%BC%8C%E8%80%8C%E4%B8%8D%E6%98%AF3%E3%80%813%E3%80%813%5Cn%20%20return%20(%5Cn%20%20%20%20%3Cdiv%3E%5Cn%20%20%20%20%20%20%3Cp%3EYou%20clicked%20%7Bcount%7D%20times%3C%2Fp%3E%5Cn%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20setCount(count%20%2B%201)%7D%3EClick%20me%3C%2Fbutton%3E%5Cn%20%20%20%20%3C%2Fdiv%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22c7nDT%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">Counter</span>() {
  <span class="cm-keyword">const</span> [<span class="cm-def">count</span>, <span class="cm-def">setCount</span>] <span class="cm-operator">=</span> <span class="cm-variable">useState</span>(<span class="cm-number"></span>);

  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> {
    <span class="cm-variable">document</span>.<span class="cm-property">title</span> <span class="cm-operator">=</span> <span class="cm-string-2">`You clicked ${</span><span class="cm-variable-2">count</span><span class="cm-string-2">}</span> <span class="cm-string-2">times`</span>;
  });
  <span class="cm-comment">// 连续点击三次button，页面的title将依次改为1、2、3，而不是3、3、3</span>
  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">p</span><span class="cm-operator">&gt;</span><span class="cm-variable">You</span> <span class="cm-variable">clicked</span> {<span class="cm-variable-2">count</span>} <span class="cm-variable">times</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/p&gt;</span>
      <span class="cm-operator">&lt;</span><span class="cm-variable">button</span> <span class="cm-variable">onClick</span><span class="cm-operator">=</span>{() <span class="cm-operator">=&gt;</span> <span class="cm-variable">setCount</span>(<span class="cm-variable">count</span> <span class="cm-operator">+</span> <span class="cm-number">1</span>)}<span class="cm-operator">&gt;</span><span class="cm-variable">Click</span> <span class="cm-variable">me</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/button&gt;</span>
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

3、event handle具有capture values，查看<a href="https://codesandbox.io/s/cv-handler-nexqm" target="_blank" rel="noopener noreferrer">demo</a>

4、。。。几乎所有的Hook API都具有capture values，除了`useRef`，查看<a href="https://codesandbox.io/s/cv-useref-i0ofe" target="_blank" rel="noopener noreferrer">demo</a>（setTimeout始终能拿到state最新值），<span class="lake-fontsize-11" style="font-size: 11px;">state是</span><span class="lake-fontsize-11" style="font-size: 11px;">Immutable的，ref可认为是mutable的。</span>

<div id="7McZL" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22function%20mountRef(initialValue)%20%7B%5Cn%20%20var%20hook%20%3D%20mountWorkInProgressHook()%3B%5Cn%20%20var%20ref%20%3D%20%7B%20current%3A%20initialValue%20%7D%3B%20%2F%2F%20ref%E5%B0%B1%E6%98%AF%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9Aobject%E7%9A%84%E5%BC%95%E7%94%A8%EF%BC%8C%E6%B2%A1%E6%9C%89%E9%97%AD%E5%8C%85%5Cn%20%20%7B%5Cn%20%20%20%20Object.seal(ref)%3B%5Cn%20%20%7D%5Cn%20%20hook.memoizedState%20%3D%20ref%3B%5Cn%20%20return%20ref%3B%5Cn%7D%22%2C%22id%22%3A%227McZL%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-keyword">function</span> <span class="cm-def">mountRef</span>(<span class="cm-def">initialValue</span>) {
  <span class="cm-keyword">var</span> <span class="cm-def">hook</span> <span class="cm-operator">=</span> <span class="cm-variable">mountWorkInProgressHook</span>();
  <span class="cm-keyword">var</span> <span class="cm-def">ref</span> <span class="cm-operator">=</span> { <span class="cm-property">current</span>: <span class="cm-variable-2">initialValue</span> }; <span class="cm-comment">// ref就是一个普通object的引用，没有闭包</span>
  {
    <span class="cm-variable">Object</span>.<span class="cm-property">seal</span>(<span class="cm-variable-2">ref</span>);
  }
  <span class="cm-variable-2">hook</span>.<span class="cm-property">memoizedState</span> <span class="cm-operator">=</span> <span class="cm-variable-2">ref</span>;
  <span class="cm-keyword">return</span> <span class="cm-variable-2">ref</span>;
}</pre>
    </div>
  </div>
</div>

**结论：非useRef相关的Hook API****，本质上都形成了闭包，闭包有自己独立的状态，这就是Capture Values的本质**。

### 模拟一些常用的生命周期 {#ozcuL}

  * componentDidMount：当deps为空时，re-render时不再执行callback

<div id="HZwjv" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20mount%E7%BB%93%E6%9D%9F%5CncomponentDidMount%20%3D%20function%20useDidMount(effect)%20%3D%3E%20%7B%5Cn%5CtuseEffect(effect%2C%20%5B%5D)%3B%5Cn%7D%3B%22%2C%22id%22%3A%22HZwjv%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// mount结束</span>
<span class="cm-variable">componentDidMount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> <span class="cm-def">useDidMount</span>(<span class="cm-def">effect</span>) <span class="cm-operator">=&gt;</span> {
  <span class="cm-variable">useEffect</span>(<span class="cm-variable">effect</span>, []);
};</pre>
    </div>
  </div>
</div>

  * componentDidUpdate

<div id="stebl" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20render%E7%BB%93%E6%9D%9F%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%89%A7%E8%A1%8CDOM%E6%93%8D%E4%BD%9C%5CncomponentDidUpdate%20%3D%20function%20useDomDidMount(effect)%20%3D%3E%20%7B%5Cn%5CtuseLayoutEffect(effect%2C%20%5B%5D)%3B%5Cn%7D%3B%22%2C%22id%22%3A%22stebl%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// render结束，可以执行DOM操作</span>
<span class="cm-variable">componentDidUpdate</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> <span class="cm-def">useDomDidMount</span>(<span class="cm-def">effect</span>) <span class="cm-operator">=&gt;</span> {
  <span class="cm-variable">useLayoutEffect</span>(<span class="cm-variable">effect</span>, []);
};</pre>
    </div>
  </div>
</div>

  * <span class="lake-fontsize-11" style="font-size: 11px;">componentWillUnMount</span>

<div id="QM8xf" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22componentWillUnMount%20%3D%20function%20useWillUnMount(effect)%20%3D%3E%20%7B%5Cn%5CtuseEffect(()%20%3D%3E%20effect%2C%20%5B%5D)%3B%5Cn%7D%3B%22%2C%22id%22%3A%22QM8xf%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-variable">componentWillUnMount</span> <span class="cm-operator">=</span> <span class="cm-keyword">function</span> <span class="cm-def">useWillUnMount</span>(<span class="cm-def">effect</span>) <span class="cm-operator">=&gt;</span> {
  <span class="cm-variable">useEffect</span>(() <span class="cm-operator">=&gt;</span> <span class="cm-variable">effect</span>, []);
};</pre>
    </div>
  </div>
</div>

  * shouldComponentUpdate（或React.PureComponent）

<div id="bITaw" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20%E4%BD%BF%E7%94%A8React.memo%E5%8C%85%E8%A3%B9%E7%BB%84%E4%BB%B6%5Cnconst%20MyComponent%20%3D%20React.memo(()%20%3D%3E%20%7B%5Cn%5Ctreturn%20%3CChild%20prop%3D%7Bprop%7D%20%2F%3E%5Cn%7D%2C%20%5Bprop%5D)%3B%5Cn%20%20%5Cn%2F%2F%20or%5Cnfunction%20A(%7B%20a%2C%20b%20%7D)%20%7B%5Cn%20%20const%20B%20%3D%20useMemo(()%20%3D%3E%20%3CB1%20a%3D%7Ba%7D%20%2F%3E%2C%20%5Ba%5D)%3B%5Cn%20%20const%20C%20%3D%20useMemo(()%20%3D%3E%20%3CC1%20b%3D%7Bb%7D%20%2F%3E%2C%20%5Bb%5D)%3B%5Cn%20%20return%20(%5Cn%20%20%20%20%3C%3E%5Cn%20%20%20%20%20%20%7BB%7D%5Cn%20%20%20%20%20%20%7BC%7D%5Cn%20%20%20%20%3C%2F%3E%5Cn%20%20)%3B%5Cn%7D%22%2C%22id%22%3A%22bITaw%22%7D">
  <div class="lake-codeblock-content">
    <div class="CodeMirror">
      <pre class="cm-s-default"><span class="cm-comment">// 使用React.memo包裹组件</span>
<span class="cm-keyword">const</span> <span class="cm-def">MyComponent</span> <span class="cm-operator">=</span> <span class="cm-variable">React</span>.<span class="cm-property">memo</span>(() <span class="cm-operator">=&gt;</span> {
  <span class="cm-keyword">return</span> <span class="cm-operator">&lt;</span><span class="cm-variable">Child</span> <span class="cm-variable">prop</span><span class="cm-operator">=</span>{<span class="cm-property">prop</span>} <span class="cm-operator">/</span><span class="cm-operator">&gt;</span>
}, [<span class="cm-variable">prop</span>]);
  
<span class="cm-comment">// or</span>
<span class="cm-keyword">function</span> <span class="cm-def">A</span>({ <span class="cm-def">a</span>, <span class="cm-def">b</span> }) {
  <span class="cm-keyword">const</span> <span class="cm-def">B</span> <span class="cm-operator">=</span> <span class="cm-variable">useMemo</span>(() <span class="cm-operator">=&gt;</span> <span class="cm-operator">&lt;</span><span class="cm-variable">B1</span> <span class="cm-variable-2">a</span><span class="cm-operator">=</span>{<span class="cm-variable-2">a</span>} <span class="cm-string-2">/&gt;, [a]);</span>
  <span class="cm-keyword">const</span> <span class="cm-def">C</span> <span class="cm-operator">=</span> <span class="cm-variable">useMemo</span>(() <span class="cm-operator">=&gt;</span> <span class="cm-operator">&lt;</span><span class="cm-variable">C1</span> <span class="cm-variable">b</span><span class="cm-operator">=</span>{<span class="cm-variable">b</span>} <span class="cm-string-2">/&gt;, [b]);</span>
  <span class="cm-keyword">return</span> (
    <span class="cm-operator">&lt;</span><span class="cm-operator">&gt;</span>
      {<span class="cm-variable">B</span>}
      {<span class="cm-variable">C</span>}
    <span class="cm-operator">&lt;</span><span class="cm-string-2">/&gt;</span>
  );
}</pre>
    </div>
  </div>
</div>

## Hooks的问题 {#TPDwK}

1、Hooks能解决组件功能复用，但不包含render相关，如何实现render的解耦？即将非正常状态下的render工作也让hook吃掉，调用侧只关心正常态的逻辑处理

思路：hook+renderProps、hook+<a href="https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching" target="_blank" rel="noopener noreferrer">Suspense</a>

2、状态共享方案

  * useReducer+useContext组合：

<li style="list-style-type: none;">
  <ul>
    <li>
      如果共享一个大的state，一处state变更会导致整棵树re-render，把所有组件使用memo或useMemo包裹也不现实，代码太丑
    </li>
    <li>
      使用多个Context，可以实现namespace，但是当组件需要使用多个Context时又会出现Provider嵌套
    </li>
  </ul>
</li>

  * react-redux@7.x
  * 其他方案

3、Hooks模糊了生命周期的概念，但也带来了更高门槛的学习心智，目前为止业界还没有出现大型应用使用Hooks的最佳实践

4、类拥有比函数更丰富的表达能力（OOP），React采用Hooks+Function Component（函数式）的方式其实是一种无奈的选择，试想一个挂载了十几个方法的Class Component，用Function Component来写如何能让业务逻辑看上去清晰明了？

## Ref {#koFbs}

  * <a href="https://overreacted.io/a-complete-guide-to-useeffect/" target="_blank" rel="noopener noreferrer">A Complete Guide to useEffect</a> （翻译：<a href="https://overreacted.io/zh-hans/a-complete-guide-to-useeffect" target="_blank" rel="noopener noreferrer">https://overreacted.io/zh-hans/a-complete-guide-to-useeffect</a>）
  * <a href="https://github.com/dt-fe/weekly/blob/v2/104.%E7%B2%BE%E8%AF%BB%E3%80%8AFunction%20Component%20%E5%85%A5%E9%97%A8%E3%80%8B.md" target="_blank" rel="noopener noreferrer">精读《Function Component 入门》</a>
  * <a href="https://github.com/dt-fe/weekly/blob/master/96.%E7%B2%BE%E8%AF%BB%E3%80%8AuseEffect%20%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97%E3%80%8B.md" target="_blank" rel="noopener noreferrer">精读《useEffect 完全指南》</a>
  * <a href="https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb" target="_blank" rel="noopener noreferrer">https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb</a>
  * <a href="https://medium.com/@sdolidze/react-hooks-memoization-99a9a91c8853" target="_blank" rel="noopener noreferrer">https://medium.com/@sdolidze/react-hooks-memoization-99a9a91c8853</a>
  * <a href="https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/" target="_blank" rel="noopener noreferrer">https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/</a>
  * <a href="https://itnext.io/react-hooks-usestate-and-usereducer-are-equivalent-in-theoretical-expressiveness-a7d1c109770" target="_blank" rel="noopener noreferrer">https://itnext.io/react-hooks-usestate-and-usereducer-are-equivalent-in-theoretical-expressiveness-a7d1c109770</a>
  * <a href="https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8" target="_blank" rel="noopener noreferrer">https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8</a>
  * <a href="https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e" target="_blank" rel="noopener noreferrer">https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e</a>
  * <a href="https://github.com/brickspert/blog/issues/26" target="_blank" rel="noopener noreferrer">https://github.com/brickspert/blog/issues/26</a>
  * <a href="https://zhuanlan.zhihu.com/p/66166173" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/66166173</a>