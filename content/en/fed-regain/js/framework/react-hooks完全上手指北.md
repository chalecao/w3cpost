---
title: React Hooks完全上手指北

---

## Why Hooks? {#KwUmS}

### Class Component设计理论 {#VruRj}

React以一种全新的编程范式定义了[前端](https://www.w3cdoc.com)开发约束，它为视图开发带来了一种全新的心智模型：

* React认为，UI视图是数据的一种视觉映射，即`UI = F(DATA)`，这里的`F`需要负责**对输入数据进行加工、并对数据的变更做出响应**
* 公式里的`F`在React里抽象成组件，React是**以组件为粒度编排应用**的，组件是代码复用的最小单元
* 在设计上，React采用`props`属性来接收外部的数据，使用`state`属性来管理组件自身产生的数据（状态），而为了实现（运行时）对数据变更做出响应需要，React**采用基于类（Class）的组件设计**！
* 除此之外，React认为**组件是有生命周期**的，因此开创性地将生命周期的概念引入到了组件设计，从组件的create到destory提供了一系列的API供开发者使用

这就是React组件设计的理论基础，[我们](https://www.w3cdoc.com)最熟悉的React组件一般长这样：

```
// React基于Class设计组件
class MyConponent extends React.Component {
  // 组件自身产生的数据
  state = {
    counts: 
  }
  // 响应数据变更
  clickHandle = () => {
    this.setState({ counts: this.state.counts++ });
    if (this.props.onClick) this.props.onClick();
  }
  // lifecycle API
  componentWillUnmount() {
    console.log('Will mouned!');
  }

  // lifecycle API
  componentDidMount() {
    console.log('Did mouned!');
  }
  // 接收外来数据（或加工处理），并编排数据在视觉上的呈现
  render(props) {
    return (
<>
  <div>Input content: {props.content}, btn click counts: {this.state.counts}</div>
  <button onClick={this.clickHandle}>Add</button>
</>
    );
  }
}
```

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

![](/images/posts/2022-12-31-12-21-30.png)

（图片来自React官方示例）

#### Javascript `Class`的缺陷 {#tKqVD}

1、`this`的指向（语言缺陷）

```
class People extends Component {
  state = {
    name: 'dm',
    age: 18,
  }

  handleClick(e) {
    // 报错！
    console.log(this.state);
  }

  render() {
    const { name, age } = this.state;
    return (<div onClick={this.handleClick}>My name is {name}, i am {age} years old.</div>);
  }
}
```

createClass不需要处理this的指向，到了Class Component稍微不慎就会出现this的指向报错。

2、编译问题：

```
// Class Component
class App extends Component {
  state = {
    count: 
  }

  componentDidMount() {
    console.log('Did mount!');
  }

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decreaseCount = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
<>
  <h1>Counter</h1>
  <div>Current count: {this.state.count}</div>
  <p>
    <button onClick={this.increaseCount}>Increase</button>
    <button onClick={this.decreaseCount}>Decrease</button>
  </p>
</>
    );
  }
}

// Function Component
function App() {
  const [ count, setCount ] = useState();
  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count - 1);

  useEffect(() => {
    console.log('Did mount!');
  }, []);

  return (
    <>
<h1>Counter</h1>
<div>Current count: {count}</div>
<p>
  <button onClick={increaseCount}>Increase</button>
  <button onClick={decreaseCount}>Decrease</button>
</p>
    </>
  );
}
```

Class Component编译结果：

```
var App_App = function (_Component) {
  Object(inherits["a"])(App, _Component);

  function App() {
    var _getPrototypeOf2;
    var _this;
    Object(classCallCheck["a"])(this, App);
    for (var _len = arguments.length, args = new Array(_len), _key = ; _key < _len; _key++) {
args[_key] = arguments[_key];
    }
    _this = Object(possibleConstructorReturn["a"])(this, (_getPrototypeOf2 = Object(getPrototypeOf["a"])(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
count: 
    };
    _this.increaseCount = function () {
_this.setState({
  count: _this.state.count + 1
});
    };
    _this.decreaseCount = function () {
_this.setState({
  count: _this.state.count - 1
});
    };
    return _this;
  }
  Object(createClass["a"])(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
console.log('Did mount!');
    }
  }, {
    key: "render",
    value: function render() {
return react_default.a.createElement(/*...*/);
    }
  }]);
  return App;
}(react["Component"]);
```

Function Component编译结果：

```
function App() {
  var _useState = Object(react["useState"])(),
    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
    count = _useState2[],
    setCount = _useState2[1];
  var increaseCount = function increaseCount() {
    return setCount(count + 1);
  };
  var decreaseCount = function decreaseCount() {
    return setCount(count - 1);
  };
  Object(react["useEffect"])(function () {
    console.log('Did mount!');
  }, []);
  return react_default.a.createElement();
}
```

* Javascript实现的类本身比较鸡肋，没有类似Java/C++多继承的概念，类的逻辑复用是个问题
* Class Component在React内部是当做Javascript `Function类`来处理的
* Function Component编译后就是一个普通的function，function对js引擎是友好的

> &#x1f914;问题：React是如何识别纯函数组件和类组件的？

### Function Component缺失的功能 {#aW9FM}

* 不是所有组件都需要处理生命周期，为了简化Class Component的书写，Function Component被设计了出来
* Function Component是纯函数，利于组件复用和测试
* Function Component的问题是只是单纯地接收props、绑定事件、返回jsx，本身是**无状态的组件，依赖props传入的handle来响应数据（状态）的变更，所以Function Component不能脱离Class Comnent来存在！**

```
function Child(props) {
  const handleClick = () => {
    this.props.setCounts(this.props.counts);
  };
  // UI的变更只能通过Parent Component更新props来做到！!
  return (
    <>
<div>{this.props.counts}</div>
<button onClick={handleClick}>increase counts</button>
    </>
  );
}

class Parent extends Component() {
  // 状态管理还是得依赖Class Component
  counts = 
  render () {
    const counts = this.state.counts;
    return (
<>
  <div>sth...</div>
  <Child counts={counts} setCounts={(x) => this.setState({counts: counts++})} />
</>
    );
  }
}
```

所以，Function Comonent是否能脱离Class Component独立存在，关键在于让Function Comonent自身具备状态处理能力，即在组件首次render之后，“**组件自身能够****通过某种机制再触发状态的变更并且引起re-render**”，而这种“机制”就是Hooks！

Hooks的出现弥补了Function Component相对于Class Component的不足，让Function Component完全取代Class Component成为可能。

### Function Component + Hooks组合 {#WXTW0}

1、功能相对独立、和render无关的部分，可以直接抽离到hook实现，比如请求库、登录态、用户核身、埋点等等，理论上装饰器都可以改用hook实现。（如<a href="https://github.com/streamich/react-use" target="_blank" rel="noopener noreferrer">react-use</a>，提供了大量从UI、动画、事件等常用功能的hook实现）

case：Popup组件依赖视窗宽度适配自身显示宽度、相册组件依赖视窗宽度做单/多栏布局适配

> &#x1f914;：请自行脑补使用Class Component来如何实现

```
function useWinSize() {
  const html = document.documentElement;
  const [ size, setSize ] = useState({ width: html.clientWidth, height: html.clientHeight });
  useEffect(() => {
    const onSize = e => {
setSize({ width: html.clientWidth, height: html.clientHeight });
    };

    window.addEventListener('resize', onSize);
    
    return () => {
window.removeEventListener('resize', onSize);
    };
  }, [ html ]);
  return size;
}

// 依赖win宽度，适配图片布局
function Article(props) {
  const { width } = useWinSize();
  const cls = `layout-${width >= 540 ? 'muti' : 'single'}`;
  return (
    <>
<article>{props.content}<article>
<div className={cls}>recommended thumb list</div>
    </>
  );
}

// 弹层宽度根据win宽高做适配
function Popup(props) {
  const { width, height } = useWinSize();
  const style = {
    width: width - 200,
    height: height - 300,
  };
  return (<div style={style}>{props.content}</div>);
}
```

2、有render相关的也可以对UI和功能（状态）做分离，将功能放到hook实现，将状态和UI分离

case：表单验证

```
function App() {
  const { waiting, errText, name, onChange } = useName();
  const handleSubmit = e => {
    console.log(`current name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
<>
  Name: <input onChange={onChange} />
  <span>{waiting ? "waiting..." : errText || ""}</span>
</>
<p>
  <button>submit</button>
</p>
    </form>
  );
}
```

## Hooks的实现与使用 {#6C0cL}

### useState {#ICp4W}

```
useState<S>(initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>]
```

作用：返回一个状态以及能修改这个状态的setter，在其他语言称为元组（tuples），一旦mount之后只能通过这个setter修改这个状态。

> 思考&#x1f914;：useState为啥不返回object而是返回tuple？

![](/images/posts/2022-12-31-12-21-52.png)

* 是Hook：使用了Hook API的函数组件，返回的setter可以改变组件的状态
* 又不像Hook：和一般意义上的Hook（钩子）不一样，这里的Hook可以多次调用且产生不同的效果，且Hook随Fiber一起生灭

#### 1、为什么只能在Function Component里调用Hook API？ {#H2zTM}

Hook API的默认实现：

```
function throwInvalidHookError() {
  invariant(false, 'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.');
}

var ContextOnlyDispatcher = {
  ...
  useEffect: throwInvalidHookError,
  useState: throwInvalidHookError,
  ...
};
```

当在Function Component调用Hook：

```
function renderWithHooks(current, workInProgress, Component, props, refOrContext, nextRenderExpirationTime) {
  currentlyRenderingFiber$1 = workInProgress; // 指针指向当前正在render的fiber节点
  ....
  if (nextCurrentHook !== null) {
    // 数据更新
    ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
  } else {
    // 首次render
    ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
  }
}

/// hook api的实现
HooksDispatcherOnMountInDEV = {
  ...
  useState: function (initialState) {
    currentHookNameInDev = 'useState';
    ...
    return mountState(initialState);
  },
};
```

#### 2、为什么必须在函数组件顶部作用域调用Hook API？且必须保证顺序 {#gwWhW}

在类组件中，state就是一个对象，对应FiberNode的`memoizedState`属性，在类组件中当调用`setState()`时更新`memoizedState`即可。但是在函数组件中，`memoizedState`被设计成一个链表（Hook对象）：

```
type Hook = {
  memoizedState: any, // 存储最新的state
  baseState: any,
  baseUpdate: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null, // 更新队列
  next: Hook | null, // 下一个hook
}

type UpdateQueue<S, A> = {
  last: Update<S, A> | null, // 最后一次更新操作
  dispatch: (A => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null, // 最新处理处理state的reducer
  lastRenderedState: S | null, // 最新渲染后状态
};

type Update<S, A> = {
  ...
  action: A,
  eagerReducer: ((S, A) => S) | null,
  eagerState: S | null, // 待更新状态值
  next: Update<S, A> | null,
  ...
};
```

示例：

```
function App() {
  const [ n1, setN1 ] = useState(1);
  const [ n2, setN2 ] = useState(2);
  // if (sth) {
  //  const [ n4, setN4 ] = useState(4);
  // } else {
  //  const [ n5, setN5 ] = useState(5);
  // }
  const [ n3, setN3 ] = useState(3);
}
```

Hook链表结构：

![](/images/posts/2022-12-31-12-22-10.png)

* Hook API调用会产生一个对应的Hook实例（并追加到Hooks链），但是返回给组件的是state和对应的setter，re-render时框架并不知道这个setter对应哪个Hooks实例（除非用HashMap来存储Hooks，但这就要求调用的时候把相应的key传给React，会增加Hooks使用的复杂度）
* re-render时会按顺序执行整个Hooks链，如果re-render时sth不满足，则会执行`useState(5)`分支，相反useState(4)则不会执行到，导致`useState(5)`返回的值其实是4，因为**首次render之后，只能通过useState返回的dispatch修改对应Hook的memoizedState**，因此必须要**保证Hooks的顺序不变**，所以不能在分支调用Hook API。

#### 3、Hooks如何更新数据？ {#C1qQc}

useState() mount阶段：

```
// useState() 首次render时执行mountState
function mountState(initialState) {
  // 从当前Fiber生成一个新的hook对象，将此hook挂载到Fiber的hook链尾，并返回这个hook
  var hook = mountWorkInProgressHook();
  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: (state, action) => isFn(state) ? action(state) : action,
    lastRenderedState: initialState
  };
  // currentlyRenderingFiber$1保存当前正在渲染的Fiber节点
  // 将返回的dispatch和调用hook的节点建立起了连接，同时在dispatch里边可以访问queue对象
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}

//// 功能相当于setState！
function dispatchAction(fiber, queue, action) {
  ...
  var update = {
    action, // 接受普通值，也可以是函数
    next: null,
  };
  var last = queue.last;

  if (last === null) {
    update.next = update;
  } else {
    last.next = update;
  }

  // 略去计算update的state过程
  queue.last = update;
  ...
  // 触发React的更新调度，scheduleWork是schedule阶段的起点
  scheduleWork(fiber, expirationTime);
}
```

* `dispatchAction`函数是更新state的关键，它会生成一个`update`挂载到hook队列上面，并提交一个React更新调度，后续的工作和类组件一致。
* 理论上可以同时调用多次dispatch，但只有最后一次会生效（queue的last指针指向最后一次update的state）
* 注意`useState`更新数据和`setState`不同的是，前者会对state做merge，[我们](https://www.w3cdoc.com)只需把更改的部分传进去，但是`useState`则是直接覆盖！

> schedule阶段介于reconcile和commit阶段之间，schedule的起点方法是scheduleWork。 ReactDOM.render, setState，forceUpdate, React Hooks的dispatchAction都要经过scheduleWork。
>
> Ref：<a href="https://zhuanlan.zhihu.com/p/54042084" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/54042084</a>

update阶段useState()更新状态：

```
function updateState(initialState) {
  var hook = updateWorkInProgressHook();
  var queue = hook.queue;
  var newState;
  var update;
  if (numberOfReRenders > ) {
    // 组件自己re-render
    newState = hook.memoizedState;
    // renderPhaseUpdates是一个全局变量，是一个的HashMap结构：HashMap<(Queue: Update)>
    update = renderPhaseUpdates.get(queue);
  } else {
    // update
    newState = hook.baseState;
    update = hook.baseUpdate || queue.last;
  }
  do {
    newState = update.action; // action可能是函数，这里略去了细节
    update = update.next;
  } while(update !== null)
  hook.memoizedState = newState;
  return [hook.memoizedState, queue.dispatch];
}
```

* 在update阶段，传入的initialState是没有用到的
* React会执行hook上面的整个update队列以获取最新的state

#### 4、更新过程示意 {#bHgiv}

```
function App() {
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(2);
  const [n3, setN3] = useState(3);
  useEffect(() => {
    setN1(10);
    setN1(100);
  }, []);
  return (<button onClick={() => setN2(20)}>click</button>);
}
```

图解更新过程：

![](/images/posts/2022-12-31-12-22-36.png)

* setState返回的setter执行会导致re-render
* 框架内部会对多次setter操作进行合并（循环执行传入的setter，目的是保证useState拿到最新的状态）

### useEffect {#Be9qd}

```
useEffect(effect: React.EffectCallback, deps?: ReadonlyArray<any> | undefined)
```

作用：处理函数组件中的副作用，如异步操作、延迟操作等，可以替代类组件的`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等生命周期函数。

#### 1、API实现分析 {#GGIW3}

```
HooksDispatcherOnMountInDEV = {
  useEffect: function() {
    currentHookNameInDev = 'useEffect';
    ...
    return mountEffectImpl(Update | Passive, UnmountPassive | MountPassive, create, deps);
  },
};

function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  var nextDeps = deps === undefined ? null : deps;
  return hook.memoizedState = pushEffect(hookEffectTag, create, undefined, nextDeps);
}

function pushEffect(tag, create, destroy, deps) {
  var effect = {
    tag: tag,
    create: create, // 存储useEffect传入的callback
    destroy: destroy,
    deps: deps,
    next: null
  };
  .....
  componentUpdateQueue = createFunctionComponentUpdateQueue();
  componentUpdateQueue.lastEffect = effect.next = effect;
  ....
  return effect;
}

function renderWithHooks() {
  ....
  currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
  ....
}
```

`useEffect`调用也会在当前Fiber节点的hook链追加一个hook并返回，它的memoizedState存放一个`effect`对象，`effect`对象最终会被挂载到Fiber节点的`updateQueue`队列（当Fiber节点都渲染到页面上后，就会开始执行Fiber节点中的`updateQueue`中所保存的函数）。

#### 2、deps参数很重要 {#HaxmO}

下面一段很常见的代码，&#x1f914;有什么问题？运行<a href="https://codesandbox.io/s/effect-deps-1wg8v" target="_blank" rel="noopener noreferrer">demo</a>

```
// 用Hook写
function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    setTimeout(() => {
setData(`current data: ${Date.now()}`);
    }, 3000);
  });
  return <div>{data}</div>;
}
// 等价代码
class App extends Component {
  state = {data = ''}

  componentDidMount() {
    setTimeout(() => {
this.setState({ data: `current data: ${Date.now()}` });
    }, 3000);
  }
  render() {
    return <div>{this.state.data}</div>;
  }
}
```
* 组件re-render时，函数组件是重新执行整个函数，其中也包括所有“注册”过的hooks，默认情况下useEffect callback也会被重新执行！
* useEffect可以接受第二个参数`deps`，用于在re-render时判断是否重新执行callback，所以deps必须要按照实际依赖传入，不能少传也不要多传！
* deps数组项必须是mutable的，比如你不能传

#### 3、清理副作用 {#2Kcn1}

Hook接受useEffect传入的callback返回一个函数，在Fiber的清理阶段将会执行这个函数，从而达到清理effect的效果：

```
function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
console.log('print log after 1s!');
    }, 1000);
    window.addEventListener('load', loadHandle);

    return () => window.removeEventListener('load', loadHandle); // 执行清理
  }, []);
}

// 同等实现
class App extends Component {
  componentDidMount() {
    const timer = setTimeout(() => {
console.log('print log after 1s!');
    }, 1000);
    window.addEventListener('load', loadHandle);
  }
  componentDidUnmount() {
    window.removeEventListener('load', loadHandle);
  }
}
```

### useReducer

```
useReducer<S, I, A>(reducer: (S, A) => S, initialArg: I, init?: I => S, ): [S, Dispatch<A>]
```

作用：用于管理复杂的数据结构（`useState`一般用于管理扁平结构的状态），基本实现了redux的核心功能。

```
const [state, dispatch] = useReducer(reducer, {count: initialCount, step: 10});
// <button onClick={() => dispatch({type: 'increment'})}>+</button>
// <button onClick={() => dispatch({type: 'decrement'})}>-</button>
```

reducer提供了一种可以在组件外重新编排state的能力，而useReducer返回的`dispatch`对象又是“性能安全的”，可以直接放心地传递给子组件而不会引起re-render问题。

```
function reducer(state, action) {
  // 这里能够拿到组件的全部state！！
  switch (action.type) {
    case "increment":
return {
  ...state,
  count: state.count + state.step
};
    ...
  }
}
```
![](/images/posts/2022-12-31-12-24-25.png)

### 性能优化（Memoization）

#### useCallback

```
 useCallback<T>(callback: T, deps: Array<mixed> | void | null): T
```

由于javascript函数的特殊性，当函数签名被作为deps传入useEffect时，还是会引起re-render（即使函数体没有改变），这种现象在类组件里边也存在：

```
// 当Parent组件re-render时，Child组件也会re-render
class Parent extends Component {
  render() {
    const someFn = () => {}; // re-render时，someFn函数会重新实例化

    return (
<>
  <Child someFn={someFn} />
  <Other />
</>
    );
  }
}

class Child extends Component {
  componentShouldUpdate(prevProps, nextProps) {
    return prevProps.someFn !== nextProps.someFn; // 函数比较将永远返回false
  }
}
```


Function Component（查看<a href="https://codesandbox.io/s/memoization-lbgob" target="_blank" rel="noopener noreferrer">demo</a>）：

```
function App() {
  const [count, setCount] = useState();
  const [list, setList] = useState([]);
  const fetchData = async () => {
    setTimeout(() => {
setList(initList);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
<div>click {count} times</div>
<button onClick={() => setCount(count + 1)}>Add count</button>
<List list={list} />
    </>
  );
}
```

解决方案：

* 将函数移到组件外部（缺点是无法读取组件的状态了）
* 条件允许的话，把函数体移到`useEffect`内部
* 如果函数的调用不止是`useEffect`内部（如需要传递给子组件），可以使用`useCallback` API包裹函数，`useCallback`的本质是对函数进行依赖分析，依赖变更时才重新执行

#### useMemo & memo

```
useMemo<T>(create: () => T, deps: Array<mixed> | void | null): T
```


useMemo用于缓存一些耗时的计算结果，只有当依赖参数改变时才重新执行计算：

```
function App(props) {
  const start = props.start;
  const list = props.list;
  const fibValue = useMemo(() => fibonacci(start), [start]); // 缓存耗时操作
  const MemoList = useMemo(() => <List list={list} />,

  return (
    <>
    <div>Do some expensive calculation: {fibValue}</div>
    {MemoList}
    <Other />
    </>
  );
}
```


> 简单理解：`useCallback(fn, deps) === useMemo(() => fn, deps)`

在函数组件中，React提供了一个和类组件中和`PureComponent`相同功能的API `React.memo`，会在自身re-render时，对每一个 props 项进行浅对比，如果引用没有变化，就不会触发重渲染。

```
// 只有列表项改变时组件才会re-render
const MemoList = React.memo(({ list }) => {
  return (
    <ul>
{list.map(item => (
  <li key={item.id}>{item.content}</li>
))}
    </ul>
  );
});
```


相比`React.memo`，`useMemo`在组件内部调用，可以访问组件的props和state，所以它拥有更细粒度的依赖控制。

### 组件间状态共享 {#S4wVk}

对于组件之间的状态共享，在类组件里边官方提供了Context相关的API：

* 使用`React.createContext` API创建Context，由于支持在组件外部调用，因此可以实现状态共享
* 使用`Context.Provider` API在上层组件挂载状态
* 使用`Context.Consumer` API为具体的组件提供状态

![](/images/posts/2022-12-31-12-24-56.png)

（图片来自React官方示例）

在使用起来很不方便。。。

React团队为函数组件提供了`useContext` API，功能上约等于`<MyContext.Consumer>`，用于在函数组件内部获取状态。

```
useContext<T>(context: ReactContext<T>, observedBits: void | number | boolean): T
```

`useContext`本身并没有什么特别，但是配合`useReducer`之后可以实现全局的状态管理了，这也是社区里提出的使用Hooks API取代redux的理论基础之一，查看<a href="https://codesandbox.io/s/simple-redux-tc37g" target="_blank" rel="noopener noreferrer">demo</a>：

```
const Context = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
return {
  ...state,
  count: state.count + 1
};
    case "decrease":
return {
  ...state,
  count: state.count - 1
};
    default:
throw Error("unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { count:  });
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <Context.Provider value={value}>
<div>App count: {state.count}</div>
<Child1 />
<Child2 />
    </Context.Provider>
  );
}

function Child1() {
  const [state, dispatch] = useContext(Context);

  return (
    <div>
<span>Child1 count: {state.count}</span>
<button onClick={() => dispatch({ type: "increase" })}>increase</button>
    </div>
  );
}

function Child2() {
  const [state, dispatch] = useContext(Context);

  return (
    <div>
<span>Child2 count: {state.count}</span>
<button onClick={() => dispatch({ type: "decrease" })}>decrease</button>
    </div>
  );
}
```


### Capture Values

1、`useState`具有capture values，查看<a href="https://codesandbox.io/s/cv-usestate-cocs4" target="_blank" rel="noopener noreferrer">demo</a>

2、`useEffect`具有capture values

```
function Counter() {
  const [count, setCount] = useState();

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  // 连续点击三次button，页面的title将依次改为1、2、3，而不是3、3、3
  return (
    <div>
<p>You clicked {count} times</p>
<button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```


3、event handle具有capture values，查看<a href="https://codesandbox.io/s/cv-handler-nexqm" target="_blank" rel="noopener noreferrer">demo</a>

4、。。。几乎所有的Hook API都具有capture values，除了`useRef`，查看<a href="https://codesandbox.io/s/cv-useref-i0ofe" target="_blank" rel="noopener noreferrer">demo</a>（setTimeout始终能拿到state最新值），state是Immutable的，ref可认为是mutable的。

```
function mountRef(initialValue) {
  var hook = mountWorkInProgressHook();
  var ref = { current: initialValue }; // ref就是一个普通object的引用，没有闭包
  {
    Object.seal(ref);
  }
  hook.memoizedState = ref;
  return ref;
}
```


**结论：非useRef相关的Hook API****，本质上都形成了闭包，闭包有自己独立的状态，这就是Capture Values的本质**。

### 模拟一些常用的生命周期 {#ozcuL}

* componentDidMount：当deps为空时，re-render时不再执行callback

```
// mount结束
componentDidMount = function useDidMount(effect) => {
  useEffect(effect, []);
};
```


* componentDidUpdate

```
// render结束，可以执行DOM操作
componentDidUpdate = function useDomDidMount(effect) => {
  useLayoutEffect(effect, []);
};
```


* componentWillUnMount

```
componentWillUnMount = function useWillUnMount(effect) => {
  useEffect(() => effect, []);
};
```
* shouldComponentUpdate（或React.PureComponent）

```
// 使用React.memo包裹组件
const MyComponent = React.memo(() => {
  return <Child prop={prop} />
}, [prop]);
// or
function A({ a, b }) {
  const B = useMemo(() => <B1 a={a} />, [a]);
  const C = useMemo(() => <C1 b={b} />, [b]);
  return (
    <>
{B}
{C}
    </>
  );
}
```

## Hooks的问题 {#TPDwK}

1、Hooks能解决组件功能复用，但不包含render相关，如何实现render的解耦？即将非正常状态下的render工作也让hook吃掉，调用侧只关心正常态的逻辑处理

思路：hook+renderProps、hook+<a href="https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching" target="_blank" rel="noopener noreferrer">Suspense</a>

2、状态共享方案

* useReducer+useContext组合：
  - 如果共享一个大的state，一处state变更会导致整棵树re-render，把所有组件使用memo或useMemo包裹也不现实，代码太丑
  - 使用多个Context，可以实现namespace，但是当组件需要使用多个Context时又会出现Provider嵌套
* react-redux@7.x
* 其他方案

3、Hooks模糊了生命周期的概念，但也带来了更高门槛的学习心智，目前为止业界还没有出现大型应用使用Hooks的最佳实践

4、类拥有比函数更丰富的表达能力（OOP），React采用Hooks+Function Component（函数式）的方式其实是一种无奈的选择，试想一个挂载了十几个方法的Class Component，用Function Component来写如何能让业务逻辑看上去清晰明了？

## Ref 

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
