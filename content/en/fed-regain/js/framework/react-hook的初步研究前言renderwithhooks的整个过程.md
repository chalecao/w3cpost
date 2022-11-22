---
title: react hook的初步研究前言renderWithHooks的整个过程




---
一开始react团队对外宣布hook 的时候，一眼看上去，觉得肯定proxy或者getter实现的，然后在函数组件外面包一层class extend React.Component。读setState钩子的第一个return结果就返回state，第二个结果就是封装了setState。后来发布了，看了一下代码，原来是维护一个队列（可以说很像数组，也可以说维护一个链表）。

# renderWithHooks的整个过程

在源码里面，renderWithHooks函数是渲染一个组件会调用的，跟hook相关的操作都在这里之后。 比如这段代码：

<pre class="prism-token token  language-javascript"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>man<span class="token punctuation">,</span> setSex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
            这是n<span class="token punctuation">:</span><span class="token punctuation">{</span>n<span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setn</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>n<span class="token operator">++</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
            年龄：<span class="token punctuation">{</span>age<span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setAge</span><span class="token punctuation">(</span>age <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>age<span class="token operator">+</span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
            变性：<span class="token punctuation">{</span>man <span class="token operator">?</span> <span class="token string">'man'</span> <span class="token punctuation">:</span> <span class="token string">'gay'</span><span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token operator">!</span>man<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>change<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
复制代码</pre>

第一次挂载组件的时候，会给对应的state留下一个dispatch接口，这个接口是操作对应的state的，也就是setn、setAge、setSex，以`return [initState, dispatch]`这种形式返回。后面的更新，每次点击都会让整个组件函数重新执行，3次useState，源码内部的实现是维护一个队列，setter和对应的state是一一对应的：

<div class="table-wrapper">
  <table>
    <tr>
      <th>
        <div class="table-header">
          <p>
            编号
          </p>
        </div>
      </th>

      <th>
        <div class="table-header">
          <p>
            state
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            dispatch函数
          </p>
        </div>
      </th>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            1
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _n
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setn_function
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            2
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _age
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setAge_function
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            3
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _sex
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setSex_function
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>

下划线开头表示react hook内部维持的状态， _function表示react hook内部暴露出来的改变该状态的函数，这两个只要**第一次mount之后就会固定**。以后每次更新，也是根据hook从头到尾执行，并根据第几个hook来拿到表里面的第几个state和它的dispatch函数

# 为什么要顺序调用hook

> 官方有句话，必须顺序调用hook。衍生的其他规则：不要在if条件判断中使用hook、必须在函数组件内使用hook、不要在循环中使用hook（其实只要保证循环每次都完全一样还是可以的）

如果我们就是这样不按照套路使用的话，比如代码里面由于某种条件判断，使得我们第二次调用组件函数的时候usestate的顺序不一样，伪代码：

<pre class="prism-token token  language-javascript"><span class="token comment">// 第一次</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>man<span class="token punctuation">,</span> setSex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 第二次</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>man<span class="token punctuation">,</span> setSex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
复制代码</pre>

第一次：

<div class="table-wrapper">
  <table>
    <tr>
      <th>
        <div class="table-header">
          <p>
            编号
          </p>
        </div>
      </th>

      <th>
        <div class="table-header">
          <p>
            state
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            dispatch函数
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            hook调用
          </p>
        </div>
      </th>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            1
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _n
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setn_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [n, setn] = useState(1);
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            2
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _age
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setAge_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [age, setAge] = useState(10);
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            3
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _sex
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setSex_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [man, setSex] = useState(true);
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>

此时每一个hook的第二个参数都对应自己的set__function。

第二次：

<div class="table-wrapper">
  <table>
    <tr>
      <th>
        <div class="table-header">
          <p>
            编号
          </p>
        </div>
      </th>

      <th>
        <div class="table-header">
          <p>
            state
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            dispatch函数
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            hook调用
          </p>
        </div>
      </th>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            1
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _n
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setn_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [age, setAge] = useState(10);
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            2
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _age
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setAge_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [n, setn] = useState(1);
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            3
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _sex
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setSex_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [man, setSex] = useState(true);
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>

这下问题来了：

<pre class="prism-token token  language-javascript"><span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
            <span class="token punctuation">{</span><span class="token comment">/*setn指的是setAge_function，点了会改变_age。这里的n展示的是_age*/</span><span class="token punctuation">}</span>
            这是n<span class="token punctuation">:</span><span class="token punctuation">{</span>n<span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setn</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>n<span class="token operator">++</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
            <span class="token punctuation">{</span><span class="token comment">/*setAge指的是setn_function，点了会改变_n。这里的age展示的是_n*/</span><span class="token punctuation">}</span>
            年龄：<span class="token punctuation">{</span>age<span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setAge</span><span class="token punctuation">(</span>age <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>age<span class="token operator">+</span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
            变性：<span class="token punctuation">{</span>man <span class="token operator">?</span> <span class="token string">'man'</span> <span class="token punctuation">:</span> <span class="token string">'gay'</span><span class="token punctuation">}</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token operator">!</span>man<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>change<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
复制代码</pre>

点了一次后，n展示了age，age展示了n，但是他们逻辑就正常，该+1就+1，该+2就+2。其实，可以通过代码让这种情况不出现bug，只是，为了让一个不合法操作正常，加上hack代码，同事两行泪啊。

再来一个反例，如果第二次调用组件函数的时候，前面少调用一个hook。第一次还是一样，第二次：

<div class="table-wrapper">
  <table>
    <tr>
      <th>
        <div class="table-header">
          <p>
            编号
          </p>
        </div>
      </th>

      <th>
        <div class="table-header">
          <p>
            state
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            dispatch函数
          </p>
        </div>
      </th>
      
      <th>
        <div class="table-header">
          <p>
            hook调用
          </p>
        </div>
      </th>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            1
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _n
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setn_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [age, setAge] = useState(10);
          </p>
        </div>
      </td>
    </tr>
    
    <tr>
      <td>
        <div class="table-cell">
          <p>
            2
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            _age
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            setAge_function
          </p>
        </div>
      </td>
      
      <td>
        <div class="table-cell">
          <p>
            const [man, setSex] = useState(true);
          </p>
        </div>
      </td>
    </tr>
  </table>
</div>

这时候，一眼看上去，setAge实际上就是改变n，setSex改变的是age。但是事实上，后面如果少了hook会**报错**

# 从renderWithHooks开始

来到react-dom源码里面，crtl+f找到renderWithHooks：

<pre class="prism-token token  language-javascript"><span class="token keyword">function</span> <span class="token function">renderWithHooks</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> Component<span class="token punctuation">,</span> props<span class="token punctuation">,</span> refOrContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  currentlyRenderingFiber$<span class="token number">1</span> <span class="token operator">=</span> workInProgress<span class="token punctuation">;</span>
  <span class="token comment">// 第一次的状态</span>
  firstCurrentHook <span class="token operator">=</span> nextCurrentHook <span class="token operator">=</span> current <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">?</span> current<span class="token punctuation">.</span>memoizedState <span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  <span class="token comment">// 一些变量初始值：</span>
  <span class="token comment">// currentHook = null;</span>
  <span class="token comment">// workInProgressHook = null;</span>

  <span class="token comment">// didScheduleRenderPhaseUpdate = false; 是否正在update中</span>
  <span class="token comment">// numberOfReRenders = 0; 重新渲染的时候fiber节点数</span>

  <span class="token punctuation">{</span>
  <span class="token comment">// 第一次HooksDispatcherOnMountInDEV，第二次以后都是HooksDispatcherOnUpdateInDEV</span>
  <span class="token comment">// firstCurrentHook就在前面被赋值一次，而nextCurrentHook会被赋值为当前存放hook的对象里面</span>
    ReactCurrentDispatcher$<span class="token number">1</span><span class="token punctuation">.</span>current <span class="token operator">=</span> nextCurrentHook <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">?</span> HooksDispatcherOnMountInDEV <span class="token punctuation">:</span> HooksDispatcherOnUpdateInDEV<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">var</span> children <span class="token operator">=</span> <span class="token function">Component</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> refOrContext<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 重新渲染的时候</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>didScheduleRenderPhaseUpdate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
      didScheduleRenderPhaseUpdate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      numberOfReRenders <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>

      <span class="token comment">// 重新渲染就是HooksDispatcherOnUpdateInDEV了</span>
      ReactCurrentDispatcher$<span class="token number">1</span><span class="token punctuation">.</span>current <span class="token operator">=</span> HooksDispatcherOnUpdateInDEV<span class="token punctuation">;</span>

      children <span class="token operator">=</span> <span class="token function">Component</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> refOrContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>didScheduleRenderPhaseUpdate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    numberOfReRenders <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> children<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>

可以看见，renderWithHooks对于首次挂载组件走的是HooksDispatcherOnMountInDEV相关的逻辑，以后的更新重新渲染走的是HooksDispatcherOnUpdateInDEV里面的逻辑

# current

ReactCurrentDispatcher$1.current会是HooksDispatcherOnMountInDEV和HooksDispatcherOnUpdateInDEV其中一个，它们都是一个存放所有的hook函数的对象。首先，我们看一下第一次挂载的时候使用的HooksDispatcherOnMountInDEV里面的useState:

<pre class="prism-token token  language-javascript">HooksDispatcherOnMountInDEV <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// ....</span>
    useState<span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>initialState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...已省略了容错代码</span>
      currentHookNameInDev <span class="token operator">=</span> <span class="token string">'useState'</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">mountState</span><span class="token punctuation">(</span>initialState<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// mountState函数</span>
<span class="token keyword">function</span> <span class="token function">mountState</span><span class="token punctuation">(</span>initialState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前的hook对象</span>
  <span class="token keyword">var</span> hook <span class="token operator">=</span> <span class="token function">mountWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 初始化的state以及状态记忆</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> hook<span class="token punctuation">.</span>baseState <span class="token operator">=</span> initialState<span class="token punctuation">;</span>
  <span class="token comment">// 以后用的dispatch函数就在hook.queue里面</span>
  <span class="token keyword">var</span> queue <span class="token operator">=</span> hook<span class="token punctuation">.</span>queue <span class="token operator">=</span> <span class="token punctuation">{</span>
    last<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    dispatch<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    eagerReducer<span class="token punctuation">:</span> basicStateReducer<span class="token punctuation">,</span>
    eagerState<span class="token punctuation">:</span> initialState
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token comment">// 暴露出来修改state的dispatch，也是更新状态的核心，具体原理这里不探究</span>
  <span class="token keyword">var</span> dispatch <span class="token operator">=</span> queue<span class="token punctuation">.</span>dispatch <span class="token operator">=</span> dispatchAction<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span>
  currentlyRenderingFiber$<span class="token number">1</span><span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>hook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">,</span> dispatch<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>

这就是第一步了，把初始状态和dispatch存进去。后面的更新，当前的dispatcher用的是HooksDispatcherOnUpdateInDEV里面的hook：

<pre class="prism-token token  language-javascript">HooksDispatcherOnMountInDEV <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// ....</span>
    useState<span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>initialState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
      currentHookNameInDev <span class="token operator">=</span> <span class="token string">'useState'</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">updateState</span><span class="token punctuation">(</span>initialState<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">updateState</span><span class="token punctuation">(</span>initialState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">updateReducer</span><span class="token punctuation">(</span>basicStateReducer<span class="token punctuation">,</span> initialState<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">updateReducer</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> initialArg<span class="token punctuation">,</span> init<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前hook</span>
  <span class="token keyword">var</span> hook <span class="token operator">=</span> <span class="token function">updateWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> queue <span class="token operator">=</span> hook<span class="token punctuation">.</span>queue<span class="token punctuation">;</span>

  <span class="token comment">// 如果是重新渲染的过程，返回被dispatchAction函数修改过的新state和dispatch函数</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>numberOfReRenders <span class="token operator">&gt;</span> <span class="token number"></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _dispatch <span class="token operator">=</span> queue<span class="token punctuation">.</span>dispatch<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span>hook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">,</span> _dispatch<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
复制代码</pre>

# updateWorkInProgressHook如何进行

一个hook对象是这样的：<figure>

<div class="image-block">
  <img class="" src="https://ask.qcloudimg.com/http-save/yehe-3635362/fshq09ka2l.png?imageView2/2/w/1620" />
</div></figure>

每一次hook都是用updateWorkInProgressHook获取的。也是这个函数的实现，让我们看起来react内部是用一个数组维护了hook

<pre class="prism-token token  language-javascript"><span class="token keyword">function</span> <span class="token function">updateWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// nextCurrentHook是前面的renderWithHooks赋值的</span>
    currentHook <span class="token operator">=</span> nextCurrentHook<span class="token punctuation">;</span>

    <span class="token keyword">var</span> newHook <span class="token operator">=</span> <span class="token punctuation">{</span>
      memoizedState<span class="token punctuation">:</span> currentHook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">,</span>
      baseState<span class="token punctuation">:</span> currentHook<span class="token punctuation">.</span>baseState<span class="token punctuation">,</span>
      queue<span class="token punctuation">:</span> currentHook<span class="token punctuation">.</span>queue<span class="token punctuation">,</span>
      baseUpdate<span class="token punctuation">:</span> currentHook<span class="token punctuation">.</span>baseUpdate<span class="token punctuation">,</span>
      next<span class="token punctuation">:</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

   <span class="token comment">// 取下一个，就像遍历一样</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>workInProgressHook <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 第一次执行组件函数，最开始没有in progress的hook</span>
      workInProgressHook <span class="token operator">=</span> firstWorkInProgressHook <span class="token operator">=</span> newHook<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 更新的时候</span>
      workInProgressHook <span class="token operator">=</span> workInProgressHook<span class="token punctuation">.</span>next <span class="token operator">=</span> newHook<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    nextCurrentHook <span class="token operator">=</span> currentHook<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token keyword">return</span> workInProgressHook<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>

# 手动模拟更新还原过程

我们还是继续在我们的例子上面改。首先，先用最简单的方法实现一个low一点的hook：

<pre class="prism-token token  language-javascript"><span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 存放useState的第一个返回值，状态</span>
<span class="token keyword">let</span> dispatchers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">// 存放useState的第二个返回值，dispatch函数</span>
<span class="token keyword">let</span> cursor <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>  <span class="token comment">// 遍历用的游标，替代next方便理解</span>

<span class="token keyword">function</span> <span class="token function">_useState</span><span class="token punctuation">(</span>initState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">// 第一次来就是赋值，后面来就是靠游标读取</span>
  <span class="token keyword">const</span> dispatcher <span class="token operator">=</span> dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">||</span>
    <span class="token punctuation">(</span>
      dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>_cursor <span class="token operator">=&gt;</span> newVal <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// 你们熟悉的闭包</span>
        state<span class="token punctuation">[</span>_cursor<span class="token punctuation">]</span> <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'修改的新state&gt;&gt;'</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>cursor<span class="token punctuation">)</span><span class="token punctuation">,</span>
      dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 第一次来还是赋值，后面来就是靠游标直接读取</span>
  <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token punctuation">(</span>state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> initState<span class="token punctuation">,</span> state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  cursor<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> dispatcher<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>

就这么简单，极其简单版本hook。但是我们要模拟react里面的重新渲染更新，需要动一点手脚：

<pre class="prism-token token  language-javascript">根组件就是HookIsHere组件
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>HookIsHere <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>

脱离了react环境的简易hook，如果用在HookIsHere组件中，需要手动模拟更新过程：

<pre class="prism-token token  language-javascript"><span class="token keyword">function</span> <span class="token function">HookIsHere</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// react每次更新，都会跑完全部hook，我们用这个函数模拟</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      修改n<span class="token punctuation">:</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 表示重新渲染</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number"></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setn</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>n<span class="token operator">++</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      修改年龄：<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setAge</span><span class="token punctuation">(</span>age <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>age<span class="token operator">+</span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      变性：<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>man<span class="token punctuation">,</span> setSex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token operator">!</span>man<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>change<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 首次挂载组件</span>
<span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'模拟首次mount'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>HookIsHere <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// 会被render返回的，这里只是模拟并没有什么卵用</span>
<span class="token punctuation">}</span>

<span class="token comment">// 封装一下，能让我们每次更新ui可以重新把函数组件所有的useState运行一次</span>
<span class="token comment">// 脱离react自身环境实现的简易版本，只能通过这种方法模拟更新</span>
<span class="token keyword">function</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// 每次重新渲染，游标当然是清零的</span>
<span class="token keyword">function</span> <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cursor <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// mount前</span>
<span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// mount了</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// react有异步渲染的，现在可以看见初始状态</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
复制代码</pre>

打开控制台，可以看见我们的自己造的hook跑起来了的console

全部代码：

<pre class="prism-token token  language-javascript"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> dispatchers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cursor <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">_useState</span><span class="token punctuation">(</span>initState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dispatcher <span class="token operator">=</span> dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">||</span>
    <span class="token punctuation">(</span>
      dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>_cursor <span class="token operator">=&gt;</span> newVal <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">[</span>_cursor<span class="token punctuation">]</span> <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'修改的新state&gt;&gt;'</span><span class="token punctuation">,</span> state<span class="token punctuation">,</span> dispatchers<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>cursor<span class="token punctuation">)</span><span class="token punctuation">,</span>
      dispatchers<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token punctuation">(</span>state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> initState<span class="token punctuation">,</span> state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  cursor<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> dispatcher<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">_useState</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">HookIsHere</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      修改n<span class="token punctuation">:</span><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>n<span class="token punctuation">,</span> setn<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number"></span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setn</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>n<span class="token operator">++</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      修改年龄：<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>age<span class="token punctuation">,</span> setAge<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setAge</span><span class="token punctuation">(</span>age <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>age<span class="token operator">+</span><span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      变性：<span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> <span class="token punctuation">[</span>man<span class="token punctuation">,</span> setSex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">updateHooks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token operator">!</span>man<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>change<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">re_render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cursor <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'模拟首次mount'</span><span class="token punctuation">)</span>
  cursor <span class="token operator">=</span> <span class="token number"></span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>HookIsHere <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>HookIsHere <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
复制代码</pre>
