---
title: react hooks模拟各个生命周期函数

---
# 前言 {#-}

react hook是继16.6的Suspense、lazy、memo后的又一巨大的令人兴奋的特性。然后有各种文章说了hook的优缺点，其中缺点包括：没有直接替代getSnapshotBeforeUpdate、componentDidUpdate生命周期的hook、不能像class组件那样写this、函数太大。这只是表面的现象，只要稍微思考一下，hook其实是无所不能的，我甚至相信未来挑不出hook的毛病来。今天手把手带[大家](https://www.w3cdoc.com)过一遍如何实现class组件特性。

基本用法可见官网，阅读本文需要先了解`useState`、`useEffect`、`useRef`、`useLayoutEffect`的使用方法。本文核心hook——`useRef`，本文也算是一篇`useRef`的应用文章。当你知道核心是基于`useRef`的时候，或许已经想到实现办法了，很好，[我们](https://www.w3cdoc.com)心有灵犀 「握个手」

# useRef {#useref}

`useRef`传入一个参数initValue，并创建一个对象`{ current: initValue }`给函数组件使用，在整个生命周期中该对象保持不变。所以，听到它名字叫做`useRef`的时候，很自然就想到它就是用来做元素的ref的：

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-keyword">const&lt;/span> divRef = useRef();
&lt;span class="hljs-keyword">return&lt;/span>  &lt;&lt;span class="hljs-keyword">div&lt;/span> &lt;span class="hljs-keyword">ref&lt;/span>={divRef}>;
</code></pre>

最基本的使用方法，接着想进行dom操作，那就这样玩：

<pre class="hljs javascript"><code class="hljs javascript">&lt;span class="hljs-keyword">if&lt;/span> (divRef.current) {
  divRef.current.addEventListener(...);
}
</code></pre>

函数组件的执行，整个函数体所有的必然躲不掉重新执行，那么如果希望有一个不重新走一遍的变量，[我们](https://www.w3cdoc.com)通常会把它放函数组件外面去：

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-keyword">let&lt;/span> isMount = &lt;span class="hljs-literal">false&lt;/span>;
&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-type">C&lt;/span>&lt;span class="hljs-literal">()&lt;/span>{
  useEffect(&lt;span class="hljs-literal">()&lt;/span> => { isMount= &lt;span class="hljs-literal">true&lt;/span>; return &lt;span class="hljs-literal">()&lt;/span> => { isMount= &lt;span class="hljs-literal">false&lt;/span>; } }, &lt;span class="hljs-literal">[]&lt;/span>);
  return &lt;div />
}
</code></pre>

这就是一个判断组件有没有挂载到页面的实现方法，如果[我们](https://www.w3cdoc.com)用`useRef`，显然优雅很多了，而且是不是有点this的感觉

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">C&lt;/span>&lt;span class="hljs-params">()&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> mount = useRef({}).current;
  useEffect(() => { mount.isMount= &lt;span class="hljs-keyword">true&lt;/span>; &lt;span class="hljs-keyword">return&lt;/span> () => { mount.isMount= &lt;span class="hljs-keyword">false&lt;/span>; } }, []);
  &lt;span class="hljs-keyword">return&lt;/span> &lt;div />
}
</code></pre>

ok，现在假的this要原形毕露了:

<pre class="hljs jsx"><code class="hljs jsx">export &lt;span class="hljs-keyword">default&lt;/span> () => {
  const _this = useRef({
    &lt;span class="hljs-keyword">state&lt;/span>: { a: &lt;span class="hljs-number">1&lt;/span>, b: &lt;span class="hljs-number">0&lt;/span> },
  }).current;
    return (
        &lt;span class="hljs-variable">&lt;div>&lt;/span>
                    a: {_this.&lt;span class="hljs-keyword">state&lt;/span>.a} / b : {_this.&lt;span class="hljs-keyword">state&lt;/span>.b}
        &lt;span class="hljs-variable">&lt;/div>&lt;/span>
    )
}
</code></pre>

# state更新相关的逻辑实现 {#state-}

`useState`就相当于hook版本的`setState`，`const [state, setState] = useState(initState);`，state利用了函数组件重新执行，从闭包读取函数记忆的结果。调用hook的`setState`，则会更新state的值然后重新执行一遍整个函数组件。此处再次感叹一下，hook真的没什么黑魔法，少一点套路多一点真诚。

比如有一个这样子的组件：

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;/span> T(){
  const [&lt;span class="hljs-built_in">count&lt;/span>, setCount] = useState(&lt;span class="hljs-number">0&lt;/span>);
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span onClick={() => setCount(&lt;span class="hljs-built_in">count&lt;/span> + &lt;span class="hljs-number">1&lt;/span>)}>{&lt;span class="hljs-built_in">count&lt;/span>}&lt;/span>
}
</code></pre>

第一次执行函数组件，最后渲染就相当于：

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">T&lt;/span>&lt;span class="hljs-params">()&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> count = &lt;span class="hljs-number">0&lt;/span>
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span>{count}&lt;/span>
}
</code></pre>

点击一下，count+1，也就是相当于执行了一个这样子的函数组件:

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">T&lt;/span>&lt;span class="hljs-params">()&lt;/span>&lt;/span>{
  &lt;span class="hljs-keyword">const&lt;/span> count = &lt;span class="hljs-number">1&lt;/span>
  &lt;span class="hljs-keyword">return&lt;/span> &lt;span>{count}&lt;/span>
}
</code></pre>

所以，真没有什么黑魔法，就是读前一个值然后+1展示而已。好了，回到正题，函数组件的更新就是`useState`，那强制更新呢？如何实现一个`forceUpdate`？其实也很简单，dispatcher（`useState`返回值第二个元素）传入一个函数，类似于class组件的`setState`传入一个函数一样，可以拿到当前的state值：

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-keyword">const&lt;/span> useForceUpdate = () => {
  &lt;span class="hljs-keyword">const&lt;/span> forceUpdate = useState[&lt;span class="hljs-number">0&lt;/span>](&lt;span class="hljs-number">1&lt;/span>);
  &lt;span class="hljs-keyword">return&lt;/span> () => forceUpdate(x => x + &lt;span class="hljs-number">1&lt;/span>);
}

&lt;span class="hljs-literal">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> () => {
  &lt;span class="hljs-keyword">const&lt;/span> forceUpdate = useForceUpdate(); &lt;span class="hljs-comment">// 先定义好，后面想用就用&lt;/span>
  &lt;span class="hljs-comment">// ...&lt;/span>
    &lt;span class="hljs-keyword">return&lt;/span> (
        &lt;div />
    )
}
</code></pre>

[我们](https://www.w3cdoc.com)已经知道了如何模拟this和state初始化了，那[我们](https://www.w3cdoc.com)可以实现一个类似class组件的setState了：给ref里面的属性赋值，再forceUpdate。

> 本文只是希望全部收拢在useRef，然后修改状态的方法纯粹一点，当然可以用useState对着一个个state值进行修改

<pre class="hljs jsx"><code class="hljs jsx">export &lt;span class="hljs-keyword">default&lt;/span> () => {
  const forceUpdate = useForceUpdate();
  const _this = useRef({
    &lt;span class="hljs-keyword">state&lt;/span>: { a: &lt;span class="hljs-number">1&lt;/span>, b: &lt;span class="hljs-number">0&lt;/span> },
    &lt;span class="hljs-built_in">set&lt;/span>State(f) {
      console.&lt;span class="hljs-keyword">log&lt;/span>(this.&lt;span class="hljs-keyword">state&lt;/span>)
      this.&lt;span class="hljs-keyword">state&lt;/span> = {
        ...this.&lt;span class="hljs-keyword">state&lt;/span>,
        ...(typeof f === 'function' ? f(this.&lt;span class="hljs-keyword">state&lt;/span>) : f) // 两种方法都考虑一下
      };
      forceUpdate();
    },
    forceUpdate,
  }).current;
  return (
    &lt;span class="hljs-variable">&lt;div>&lt;/span>
      a: {_this.&lt;span class="hljs-keyword">state&lt;/span>.a} / b : {_this.&lt;span class="hljs-keyword">state&lt;/span>.b}
&lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> {_this.&lt;span class="hljs-built_in">set&lt;/span>State({ a: _this.&lt;span class="hljs-keyword">state&lt;/span>.a + &lt;span class="hljs-number">1&lt;/span> }) }}>a传&lt;span class="hljs-keyword">state&lt;/span>&lt;span class="hljs-variable">&lt;/button>&lt;/span>
&lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> {_this.&lt;span class="hljs-built_in">set&lt;/span>State(({ b }) => ({ b: b + &lt;span class="hljs-number">2&lt;/span> })) }}>b传函数&lt;span class="hljs-variable">&lt;/button>&lt;/span>
    &lt;span class="hljs-variable">&lt;/div>&lt;/span>
  );
}
</code></pre>

到此，[我们](https://www.w3cdoc.com)已经实现了class组件的`this`，`setState`，`forceUpdate`了

# didmount、didupdate、willunmount的实现 {#didmount-didupdate-willunmount-}

其实我上一篇文章已经实现过，这里再糅合到ref里面重新实现一遍。还是一样的方法，基于两个`useEffect`实现三个生命周期：

<pre class="hljs jsx"><code class="hljs jsx">export &lt;span class="hljs-keyword">default&lt;/span> () => {
  const forceUpdate = useForceUpdate();
  const isMounted = useRef(); // 挂载标记
  const _this = useRef({
    &lt;span class="hljs-keyword">state&lt;/span>: { a: &lt;span class="hljs-number">1&lt;/span>, b: &lt;span class="hljs-number">0&lt;/span> },
    &lt;span class="hljs-built_in">set&lt;/span>State(f) {
      console.&lt;span class="hljs-keyword">log&lt;/span>(this.&lt;span class="hljs-keyword">state&lt;/span>)
      this.&lt;span class="hljs-keyword">state&lt;/span> = {
        ...this.&lt;span class="hljs-keyword">state&lt;/span>,
        ...(typeof f === 'function' ? f(this.&lt;span class="hljs-keyword">state&lt;/span>) : f) // 两种方法都考虑一下
      };
      forceUpdate();
    },
    forceUpdate,
    componentDidMount() {
      console.&lt;span class="hljs-keyword">log&lt;/span>('didmount')
    },
    componentDidUpdate() {
      console.warn('didupdate');
    },
    componentWillUnMount() {
      console.&lt;span class="hljs-keyword">log&lt;/span>('unmount')
    },
  }).current;
  useEffect(() => {
    _this.componentDidMount();
    return _this.componentWillUnMount;
  }, [_this]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      _this.componentDidUpdate();
    }
  })
  return (
    &lt;span class="hljs-variable">&lt;div>&lt;/span>
      a: {_this.&lt;span class="hljs-keyword">state&lt;/span>.a} / b : {_this.&lt;span class="hljs-keyword">state&lt;/span>.b}
&lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> {_this.&lt;span class="hljs-built_in">set&lt;/span>State({ a: _this.&lt;span class="hljs-keyword">state&lt;/span>.a + &lt;span class="hljs-number">1&lt;/span> }) }}>a传&lt;span class="hljs-keyword">state&lt;/span>&lt;span class="hljs-variable">&lt;/button>&lt;/span>
&lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> {_this.&lt;span class="hljs-built_in">set&lt;/span>State(({ b }) => ({ b: b + &lt;span class="hljs-number">2&lt;/span> })) }}>b传函数&lt;span class="hljs-variable">&lt;/button>&lt;/span>
    &lt;span class="hljs-variable">&lt;/div>&lt;/span>
  )
}
</code></pre>

# 记录上一次状态 {#-}

有人可能也注意到了，上面的componentDidUpdate是没有传入上一次props和state的。是的，getDerivedStateFromProps也要上一个state的。所以[我们](https://www.w3cdoc.com)还需要一个ref存上一个状态：

<pre class="hljs jsx"><code class="hljs jsx">export &lt;span class="hljs-keyword">default&lt;/span> (props) => {
  const forceUpdate = useForceUpdate();
  const isMounted = useRef();
  const magic = useRef({ prevProps: props, prevState: {}, snapshot: null }).current;
  magic.currentProps = props; // 先把当前父组件传入的props记录一下
  const _this = useRef({
    &lt;span class="hljs-keyword">state&lt;/span>: { a: &lt;span class="hljs-number">1&lt;/span>, b: &lt;span class="hljs-number">0&lt;/span> },
    &lt;span class="hljs-built_in">set&lt;/span>State(f) {
      console.&lt;span class="hljs-keyword">log&lt;/span>(this.&lt;span class="hljs-keyword">state&lt;/span>)
      this.&lt;span class="hljs-keyword">state&lt;/span> = {
        ...this.&lt;span class="hljs-keyword">state&lt;/span>,
        ...(typeof f === 'function' ? f(this.&lt;span class="hljs-keyword">state&lt;/span>) : f)
      };
      forceUpdate();
    },
    componentDidMount() {
      console.&lt;span class="hljs-keyword">log&lt;/span>('didmount')
    },
    getDerivedStateFromProps(newProps, currentState) {
        // 先放这里，反正等下要实现的
    },
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.warn('didupdate');
      console.&lt;span class="hljs-built_in">table&lt;/span>([
        { k: '上一个props', v: JSON.stringify(prevProps) },
        { k: 'this.props', v: JSON.stringify(magic.currentProps) },
        { k: '上一个&lt;span class="hljs-keyword">state&lt;/span>', v: JSON.stringify(prevState) },
        { k: 'this.&lt;span class="hljs-keyword">state&lt;/span>', v: JSON.stringify(_this.&lt;span class="hljs-keyword">state&lt;/span>) },
      ])
    },
    componentWillUnMount() {
      console.&lt;span class="hljs-keyword">log&lt;/span>('unmount')
    }
  }).current;

  useEffect(() => {
    _this.componentDidMount();
    // 后面都是赋值操作，防止同一个引用对象，实际上应该深拷贝的。这里为了方便，但至少要浅拷
    magic.prevProps = { ...props };  // 记录当前的，作为上一个props给下一次用
    magic.prevState = { ..._this.&lt;span class="hljs-keyword">state&lt;/span> }; // 同理
    return _this.componentWillUnMount;
  }, [_this, magic]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
    //  这里就拿到了上一个props、&lt;span class="hljs-keyword">state&lt;/span>了，snapshot也先留个空位给他吧
      _this.componentDidUpdate(magic.prevProps, magic.prevState, magic.snapshot || null);
    // 拿完就继续重复操作，给下一次用
      magic.prevProps = { ...props };
      magic.prevState = { ..._this.&lt;span class="hljs-keyword">state&lt;/span> };
    }
  })
    return (
      &lt;span class="hljs-variable">&lt;div>&lt;/span>
        props: {props.p}/
        a: {_this.&lt;span class="hljs-keyword">state&lt;/span>.a} / b : {_this.&lt;span class="hljs-keyword">state&lt;/span>.b}
        &lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> { _this.&lt;span class="hljs-built_in">set&lt;/span>State({ a:_this.&lt;span class="hljs-keyword">state&lt;/span>.a + &lt;span class="hljs-number">1&lt;/span> }) }}>a传&lt;span class="hljs-keyword">state&lt;/span>&lt;span class="hljs-variable">&lt;/button>&lt;/span>
        &lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> { _this.&lt;span class="hljs-built_in">set&lt;/span>State(({ b }) => ({ b: b + &lt;span class="hljs-number">2&lt;/span> })) }}>b传函数&lt;span class="hljs-variable">&lt;/button>&lt;/span>
      &lt;span class="hljs-variable">&lt;/div>&lt;/span>
    );
}
</code></pre>

这下，可以去控制台做一些操作state和改变props的操作了，并看下打印的结果

# getDerivedStateFromProps {#getderivedstatefromprops}

这个函数的原意就是希望props可以作为初始化state或者在渲染之前修改state，那么根据它的意图，很容易就可以实现这个生命周期，我这里`getDerivedStateFromProps`还可以用假this哦。其实这个生命周期应该是最容易实现和想出来的了：

<pre class="hljs jsx"><code class="hljs jsx">// 基于前面的组件直接加上这段代码
  const newState = _this.getDerivedStateFromProps(props, magic.prevState);
  if (newState) {
    _this.&lt;span class="hljs-keyword">state&lt;/span> = { ..._this.&lt;span class="hljs-keyword">state&lt;/span>, ...newState }; // 这里不要再更新组件了，直接改&lt;span class="hljs-keyword">state&lt;/span>就收了
  }
</code></pre>

# getSnapshotBeforeUpdate {#getsnapshotbeforeupdate}

到了一个hook不能直接替代的生命周期了。这里再看一下useLayoutEffect和useEffect执行的时机对比：

> 注意到，下一个useLayoutEffect执行之前，先执行上一个useLayoutEffect的clean up函数，而且都是同步，可以做到近似模拟willupdate或者getSnapshotBeforeUpdate了

<pre class="hljs jsx"><code class="hljs jsx">&lt;span class="hljs-comment">// 再增加一段代码&lt;/span>
  useLayoutEffect(() => {
    &lt;span class="hljs-keyword">return&lt;/span> () => {
      &lt;span class="hljs-comment">// 上一个props、state也传进来，然后magic.snapshot 前面已经传入了componentDidUpdate&lt;/span>
      magic.snapshot = _this.getSnapshotBeforeUpdate(magic.prevProps, magic.prevState);
    }
  })
</code></pre>

# componentDidCatch {#componentdidcatch}

另一个不能用hook直接替代的生命周期，说到错误，这个生命周期也是捕捉函数render执行的时候的错误。那些编译不过的，非函数渲染时候报的错，它无法捕获的哦。基于这个前提，[我们](https://www.w3cdoc.com)还是基于try-catch大法实现一波：

<pre class="hljs jsx"><code class="hljs jsx">// 对最后的return 修改，这里还可以个性化一下fallback ui呢
  try {
    return (
      &lt;span class="hljs-variable">&lt;div>&lt;/span>
        props: {props.p}/
        a: {_this.&lt;span class="hljs-keyword">state&lt;/span>.a} / b : {_this.&lt;span class="hljs-keyword">state&lt;/span>.b}
        &lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> { _this.&lt;span class="hljs-built_in">set&lt;/span>State({ a:_this.&lt;span class="hljs-keyword">state&lt;/span>.a + &lt;span class="hljs-number">1&lt;/span> }) }}>a传&lt;span class="hljs-keyword">state&lt;/span>&lt;span class="hljs-variable">&lt;/button>&lt;/span>
        &lt;span class="hljs-variable">&lt;button onClick={() =>&lt;/span> { _this.&lt;span class="hljs-built_in">set&lt;/span>State(({ b }) => ({ b: b + &lt;span class="hljs-number">2&lt;/span> })) }}>b传函数&lt;span class="hljs-variable">&lt;/button>&lt;/span>
      &lt;span class="hljs-variable">&lt;/div>&lt;/span>
    )
  } catch (e) {
    _this.componentDidCatch(e)
    return &lt;span class="hljs-variable">&lt;div>&lt;/span>some err accured&lt;span class="hljs-variable">&lt;/div>&lt;/span>;
  }</code></pre>
