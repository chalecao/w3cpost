---
title: 转:react-redux原理介绍，最易懂的说明


date: 2019-08-20T02:57:49+00:00
url: /javascriptnodejs/4964.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png
fifu_image_alt:
  - 自动草稿
views:
  - 1733
like:
  - 2


---
<div>
  <div>
    <h4 class="heading" data-id="heading-0">
      1. 目录
    </h4>
    
    <ul>
      <li>
        redux简介
      </li>
      <li>
        案例
      </li>
      <li>
        react-redux核心介绍
      </li>
    </ul>
    
    <h4 class="heading" data-id="heading-1">
      2. redux简介
    </h4>
    
    <ul>
      <li>
        redux是react全家桶的一员，它试图为 React 应用提供「可预测化的状态管理」机制。
      </li>
      <li>
        Redux是将整个应用状态存储到到一个地方，称为store
      </li>
      <li>
        里面保存一棵状态树(state tree)
      </li>
      <li>
        组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组件
      </li>
      <li>
        其它组件可以通过订阅store中的状态(state)来刷新自己的视图
      </li>
    </ul>
    
    <h4 class="heading" data-id="heading-2">
      3. 安装
    </h4>
    
    <pre><code class="hljs bash copyable" lang="bash">npm install --save redux
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h4 class="heading" data-id="heading-3">
      4. redux核心
    </h4>
    
    <p>
      4.1 State
    </p>
    
    <p>
      state是数据集合
    </p>
    
    <p>
      <strong>可以理解为工厂加工商品所需的原材料</strong>
    </p>
    
    <p>
      4.2 action
    </p>
    
    <p>
      State的变化，会导致View的变化。但是，用户接触不到 State，只能接触到View 所以，State的变化必须是 View导致的。
    </p>
    
    <p>
      action就是改变state的指令，有多少操作state的动作就会有多少action。
    </p>
    
    <p>
      <strong>可以将action理解为描述发生了什么的指示器</strong>
    </p>
    
    <p>
      4.3 reducer 加工函数
    </p>
    
    <p>
      action发出命令后将state放入reucer加工函数中，返回新的state。 <strong>可以理解为加工的机器</strong>
    </p>
    
    <p>
      4.4 store
    </p>
    
    <p>
      <strong>store 可以理解为有多个加工机器的总工厂</strong>
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">&lt;span class="hljs-built_in">let&lt;/span> store = createStore(reducers);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      Store 就是把它们联系到一起的对象。Store 有以下职责：
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      我们可以通过store.getState()来了解工厂中商品的状态， 使用store.dispatch发送action指令。
    </p>
    
    <h4 class="heading" data-id="heading-4">
      5. 经典案例
    </h4>
    
    <p>
      这是一个redux的经典案例
    </p>
    
    <ul>
      <li>
        定义reducer函数根据action的类型改变state
      </li>
      <li>
        actions 定义指令
      </li>
      <li>
        通过createStore创建store
      </li>
      <li>
        调用store.dispatch()发出修改state的命令
      </li>
    </ul>
    
    <pre><code class="hljs bash copyable" lang="bash">import { createStore } from &lt;span class="hljs-string">'redux'&lt;/span>

const reducer = (state = {count: 0}, action) =&gt; {
  switch (action.type){
    &lt;span class="hljs-keyword">case&lt;/span> &lt;span class="hljs-string">'INCREASE'&lt;/span>: &lt;span class="hljs-built_in">return&lt;/span> {count: state.count + 1};
    &lt;span class="hljs-keyword">case&lt;/span> &lt;span class="hljs-string">'DECREASE'&lt;/span>: &lt;span class="hljs-built_in">return&lt;/span> {count: state.count - 1};
    default: &lt;span class="hljs-built_in">return&lt;/span> state;
  }
}

const actions = {
  increase: () =&gt; ({&lt;span class="hljs-built_in">type&lt;/span>: &lt;span class="hljs-string">'INCREASE'&lt;/span>}),
  decrease: () =&gt; ({&lt;span class="hljs-built_in">type&lt;/span>: &lt;span class="hljs-string">'DECREASE'&lt;/span>})
}

const store = createStore(reducer);

store.subscribe(() =&gt;
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}

&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      <strong>我们可以直接在react component上使用store.dispatch，但是这样不太方便，这个时候我们需要react-redux</strong>
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">class Todos extends Component {
    &lt;span class="hljs-function">&lt;span class="hljs-title">render&lt;/span>&lt;/span>(){
        &lt;span class="hljs-built_in">return&lt;/span>(
            &lt;div onCLick={()=&gt;store.dispatch(actions.delTodo()) }&gt;&lt;span class="hljs-built_in">test&lt;/span>&lt;/div&gt;
        )
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h4 class="heading" data-id="heading-5">
      6. react-redux
    </h4>
    
    <p>
      Redux 官方提供的 React 绑定库。 具有高效且灵活的特性。
    </p>
    
    <p>
      6.1 安装
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">npm install --save react-redux
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      6.2 核心
    </p>
    
    <ul>
      <li>
        < Provider store>
      </li>
      <li>
        connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
      </li>
    </ul>
    
    <p>
      Provider 内的任何一个组件（比如这里的 Comp），如果需要使用 state 中的数据，就必须是「被 connect 过的」组件——使用 connect 方法对「你编写的组件（MyComp）」进行包装后的产物。
    </p>
    
    <p>
      这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
    </p>
    
    <p>
      简单的流程如下图所示：
    </p><figure> 
    
    <p id="xpWgrPi">
      <img loading="lazy" width="1280" height="959" class="alignnone size-full wp-image-4966 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_225/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_575/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d5b619d84cba.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_600/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
    </p><figcaption></figcaption></figure> 
    
    <p>
      react-redux中的connect方法将store上的getState 和 dispatch 包装成组件的props。
    </p>
    
    <p>
      将之前直接在组件上dispatch的代码修改为如下：
    </p>
    
    <p>
      index.js
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">import React, { Component } from &lt;span class="hljs-string">'react'&lt;/span>;
import store from &lt;span class="hljs-string">'../store'&lt;/span>;
import actions from &lt;span class="hljs-string">'../store/actions/list'&lt;/span>;
import {connect} from &lt;span class="hljs-string">'react-redux'&lt;/span>;

class Todos extends Component {
    &lt;span class="hljs-function">&lt;span class="hljs-title">render&lt;/span>&lt;/span>(){
        &lt;span class="hljs-built_in">return&lt;/span>(
            &lt;div onCLick={()=&gt;this.props.del_todo() }&gt;&lt;span class="hljs-built_in">test&lt;/span>&lt;/div&gt;
        )
    }
}

&lt;span class="hljs-built_in">export&lt;/span> default connect(
    state=&gt;state,
    actions
)(Todos);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      Provider 能拿到关键的store并传递给每个子组件
    </p>
    
    <h4 class="heading" data-id="heading-6">
      7. connect如何工作的？
    </h4>
    
    <p>
      connect() 接收四个参数，它们分别是 mapStateToProps ， mapDispatchToProps， mergeProps 和 options 。
    </p>
    
    <p>
      7.1 <code>mapStateToProps这个函数允许我们将 store 中的数据作为 props 绑定到组件上。</code>
    </p>
    
    <p>
      <strong>reducer.js</strong>
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">&lt;span class="hljs-built_in">export&lt;/span> default &lt;span class="hljs-keyword">function&lt;/span> (state = { lists: [{text:&lt;span class="hljs-string">'移动端计划'&lt;/span>}],newType:&lt;span class="hljs-string">'all'&lt;/span>}, action) {
    switch (action.type) {
        &lt;span class="hljs-keyword">case&lt;/span> types.ADD_TODO:
            &lt;span class="hljs-built_in">return&lt;/span> {...state,lists:[...state.lists,{text:action.text}]}
        &lt;span class="hljs-keyword">case&lt;/span> types.TOGGLE_TODO:
            &lt;span class="hljs-built_in">return&lt;/span> {...state,lists:state.lists.map((item,index)=&gt;{
                &lt;span class="hljs-keyword">if&lt;/span>(index == action.index){
                    item.completed = !item.completed
                }
                &lt;span class="hljs-built_in">return&lt;/span> item
            })}
        &lt;span class="hljs-keyword">case&lt;/span> types.DEL_TODO:
            &lt;span class="hljs-built_in">return&lt;/span> {...state,lists:[...state.lists.slice(0,action.index),...state.lists.slice(action.index+1)]}
        &lt;span class="hljs-keyword">case&lt;/span> types.SWITCH_TYPE:
            console.log({...state,newType:action.newType})
            &lt;span class="hljs-built_in">return&lt;/span> {...state,newType:action.newType}
        default:
            &lt;span class="hljs-built_in">return&lt;/span> state;
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      在reducer.js中，定义了初始化的state，通过connect方法，我们就能使用this.props.lists拿到初始化的state。
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">import React, { Component } from &lt;span class="hljs-string">'react'&lt;/span>;
import store from &lt;span class="hljs-string">'../store'&lt;/span>;
import actions from &lt;span class="hljs-string">'../store/actions/list'&lt;/span>;
import {connect} from &lt;span class="hljs-string">'react-redux'&lt;/span>;

class Todos extends Component {
    &lt;span class="hljs-function">&lt;span class="hljs-title">render&lt;/span>&lt;/span>(){
        &lt;span class="hljs-built_in">return&lt;/span>(
            {
                + &lt;ul&gt;
                +    this.props.state.lists.map(list =&gt;(
                +        &lt;li&gt;{list.text}&lt;/li&gt;
                +    ))
                + &lt;/ul&gt;   
            }
            &lt;div onCLick={()=&gt;this.props.del_todo() }&gt;&lt;span class="hljs-built_in">test&lt;/span>&lt;/div&gt;
        )
    }
}

&lt;span class="hljs-built_in">export&lt;/span> default connect(
    state=&gt;state,
    actions
)(Todos);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给 MyComp。
    </p>
    
    <p>
      7.2 <code>mapDispatchToProps(dispatch, ownProps): dispatchProps connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到 MyComp 上。</code>
    </p>
    
    <p>
      <strong>action.js</strong>
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">import * as types from &lt;span class="hljs-string">"../action-types"&lt;/span>;

&lt;span class="hljs-built_in">export&lt;/span> default{
    add_todo(text){
        &lt;span class="hljs-built_in">return&lt;/span> { &lt;span class="hljs-built_in">type&lt;/span>: types.ADD_TODO, text: text}
    },
    del_todo(idx){
        &lt;span class="hljs-built_in">return&lt;/span> {&lt;span class="hljs-built_in">type&lt;/span>:types.DEL_TODO, index: idx}
    },
    toggle_todo(index){
        &lt;span class="hljs-built_in">return&lt;/span> {&lt;span class="hljs-built_in">type&lt;/span>:types.TOGGLE_TODO, index}
    },
    del_todo(index){
        &lt;span class="hljs-built_in">return&lt;/span> {&lt;span class="hljs-built_in">type&lt;/span>:types.DEL_TODO, index}
    },
    switch_type(newType){
        &lt;span class="hljs-built_in">return&lt;/span> {&lt;span class="hljs-built_in">type&lt;/span>:types.SWITCH_TYPE, newType}
    }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      我在action.js中定义的修改状态的命令，会通过connect 的 mapDispatchToProps方法变为props绑定在reac组件上。
    </p>
    
    <p>
      我们可以方便得使用去调用
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">    &lt;div onCLick={()=&gt;this.props.del_todo() }&gt;&lt;span class="hljs-built_in">test&lt;/span>&lt;/div&gt;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <h4 class="heading" data-id="heading-7">
      8. 深入
    </h4>
    
    <p>
      了解到这里，我们会发现并没有使用store.dispatch方法去发出命令，但是state已经修改，view也变化了，那么到底发生了什么？
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">store.dispatch(actions.increase())
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      <strong>关键的是connect()</strong>
    </p>
    
    <p>
      connect原理简化版
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">import React,{Component} from &lt;span class="hljs-string">'react'&lt;/span>;
import {&lt;span class="hljs-built_in">bind&lt;/span>ActionCreators} from &lt;span class="hljs-string">'redux'&lt;/span>;
import propTypes from &lt;span class="hljs-string">'prop-types'&lt;/span>;

&lt;span class="hljs-built_in">export&lt;/span> default &lt;span class="hljs-keyword">function&lt;/span>(mapStateToProps,mapDispatchToProps){
   &lt;span class="hljs-built_in">return&lt;/span> &lt;span class="hljs-keyword">function&lt;/span>(WrapedComponent){
      class ProxyComponent extends Component{
          static contextTypes = {
              store:propTypes.object
          }
          constructor(props,context){
            super(props,context);
            this.store = context.store;
            this.state = mapStateToProps(this.store.getState());
          }
          &lt;span class="hljs-function">&lt;span class="hljs-title">componentWillMount&lt;/span>&lt;/span>(){
              this.unsubscribe = this.store.subscribe(()=&gt;{
                  this.setState(mapStateToProps(this.store.getState()));
              });
          }
          &lt;span class="hljs-function">&lt;span class="hljs-title">componentWillUnmount&lt;/span>&lt;/span>(){
              this.unsubscribe();
          }
          &lt;span class="hljs-function">&lt;span class="hljs-title">render&lt;/span>&lt;/span>(){
              &lt;span class="hljs-built_in">let&lt;/span> actions= {};
              &lt;span class="hljs-keyword">if&lt;/span>(typeof mapDispatchToProps == &lt;span class="hljs-string">'function'&lt;/span>){
                actions = mapDispatchToProps(this.store.disaptch);
              }&lt;span class="hljs-keyword">else&lt;/span> &lt;span class="hljs-keyword">if&lt;/span>(typeof mapDispatchToProps == &lt;span class="hljs-string">'object'&lt;/span>){
                  console.log(&lt;span class="hljs-string">'object'&lt;/span>, mapDispatchToProps)
                actions = &lt;span class="hljs-built_in">bind&lt;/span>ActionCreators(mapDispatchToProps,this.store.dispatch);
              }
                &lt;span class="hljs-built_in">return&lt;/span> &lt;WrapedComponent {...this.state} {...actions}/&gt;
         }
      }
      &lt;span class="hljs-built_in">return&lt;/span> ProxyComponent;
   }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      1.state的返回 connect中对于Provided父组件上传来的store,通过将状态返回
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash">mapStateToProps(this.store.getState());
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      通过 Redux 的辅助函数 bindActionCreators()，用dispatch监听每一个action。
    </p>
    
    <pre><code class="hljs bash copyable" lang="bash"> &lt;span class="hljs-built_in">bind&lt;/span>ActionCreators(mapDispatchToProps,this.store.dispatch);
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
    
    <p>
      所以调用props上的方法时，会自动发起store.dispach（XXX）事件，发出命令
    </p>
    
    <p>
      <a href="https://codesandbox.io/s/react-redux-ziw8q" target="_blank" rel="nofollow noopener noreferrer">react-redux简单例子项目链接</a>
    </p>
    
    <p>
    </p>
  </div>
  
  <p>
    原文链接：<a href="https://juejin.im/post/5af00705f265da0ba60fb844">https://juejin.im/post/5af00705f265da0ba60fb844</a>
  </p>
</div>