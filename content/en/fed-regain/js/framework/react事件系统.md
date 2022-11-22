---
title: react事件系统


date: 2020-11-01T14:24:00+00:00
url: /javascriptnodejs/6063.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png
classic-editor-remember:
  - classic-editor
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png
fifu_image_alt:
  - react事件系统
views:
  - 476


---
## 一 前言 {#item-1}

React事件系统有两类：合成事件和原生事件。  
在写React组件是我们很容易绑定一个合成事件，但是在一个组件里面是没有办法去绑定另一个组件的合成事件的，此时原生事件就派上了用场。  
除了讲述混合（合成事件与原生事件混用）事件，事件冒泡也是我们经常需要处理的事情，这篇文章结合React进行介绍。

最近调试组件绑定keydown事件，发现取到的key和code值在搜狗中文输入法下面有问题，后来发现要用e.nativeEvent来获取值是没问题。这里说下原因。

## 二 正文 {#item-2}

### 1.React事件系统 {#item-2-1}

1-1. React 基于 Virtual DOM 实现了一个SyntheticEvent（合成事件）层，我们所定义的事件处理器会接收到一个SyntheticEvent对象的实例，同样支持事件的冒泡机制，我们可以使用stopPropagation()和preventDefault()来中断它。

1-2. 所有事件都自动绑定到最外层上（document）。

### 2.合成事件绑定机制 {#item-2-2}

在 React 底层，主要对合成事件做了两件事：**事件委派和自动绑定。**

2-1.事件委派在使用  
React 事件前，一定要熟悉它的事件代理机制。它并不会把事件处理函数直接绑定到真实的节点上，而是把**所有事件绑定到结构的最外层，使用一个统一的事件监听器**，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

2-2.自动绑定  
在React 组件中，每个方法的上下文都会指向该组件的实例，即**自动绑定this为当前组件**。而且 React 还会对这种引用进行缓存，以达到 CPU 和内存的最优化。

### 3.在React中使用原生事件 {#item-2-3}

React 架构下也可以使用原生事件。React 提供了完备的生命周期方法，其中componentDidMount会在组件已经完成安装并且在浏览器中存在真实的 DOM 后调用，此时我们就可以完成原生事件的绑定。  
但是React不会自动管理原生事件，所以需要你在**卸载组件的时候注销掉原生事件**。

### 4.合成事件与原生事件混用 {#item-2-4}

书中讲到(这里不做过多介绍)：

  * 不要将合成事件与原生事件混用
  * 通过e.target判断来避免

重点是下面这段话，这也是我们今天要着重解决的问题：

> 用reactEvent.nativeEvent.stopPropagation()来阻止冒泡是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统中，且没办法阻止原生事件的冒泡。反之，在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播。

### 5.React stopPropagation 与 stopImmediatePropagation {#item-2-5}

事件冒泡机制：

<p id="tgkzOkz">
  <img loading="lazy" width="785" height="447" class="alignnone size-full wp-image-6067 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png?x-oss-process=image/format,webp 785w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_171/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec519895fe.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_437/format,webp 768w" sizes="(max-width: 785px) 100vw, 785px" />
</p>

通过 React 绑定的事件，其回调函数中的 event 对象，是经过 React 合成的 SyntheticEvent，与原生的 DOM 事件的 event 不是一回事。准确地说，在 React 中，e.nativeEvent 才是原生 DOM 事件的那个 event。

* * *

React 合成事件与原生事件执行顺序图：

<p id="cDedujG">
  <img loading="lazy" width="800" height="369" class="alignnone size-full wp-image-6068 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec52848017.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec52848017.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec52848017.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec52848017.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_138/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec52848017.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_354/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

从图中我们可以得到一下结论：  
（1）DOM 事件冒泡到document上才会触发React的合成事件，所以React 合成事件对象的e.stopPropagation，只能阻止 React 模拟的事件冒泡，并不能阻止真实的 DOM 事件冒泡  
（2）DOM 事件的阻止冒泡也可以阻止合成事件原因是DOM 事件的阻止冒泡使事件不会传播到document上  
（3）当合成事件和DOM 事件 都绑定在document上的时候，React的处理是合成事件应该是先放进去的所以会先触发，在这种情况下，原生事件对象的 stopImmediatePropagation能做到阻止进一步触发document DOM事件

<p id="JgPZuah">
  <img loading="lazy" width="800" height="207" class="alignnone size-full wp-image-6069 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec532a157c.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec532a157c.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec532a157c.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec532a157c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_78/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/11/img_5f9ec532a157c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_199/format,webp 768w" sizes="(max-width: 800px) 100vw, 800px" />
</p>

<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation" target="_blank" rel="nofollow noopener noreferrer">stopImmediatePropagation</a> :如果有多个相同类型事件的事件监听函数绑定到同一个元素,则当该类型的事件触发时,它们会按照被添加的顺序执行。如果其中某个监听函数执行了 event.stopImmediatePropagation()方法，则剩下的监听函数将不会被执行

### 6.React 阻止冒泡总结 {#item-2-6}

（1）阻止合成事件间的冒泡，用e.stopPropagation();  
（2）阻止合成事件与最外层document上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation();  
（3）阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免，代码如下：

<pre class="hljs typescript"><code>componentDidMount() { 
&lt;span class="hljs-built_in">document&lt;/span>.body.addEventListener(&lt;span class="hljs-string">'click'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-params">e&lt;/span> =>&lt;/span> {   
 &lt;span class="hljs-keyword">if&lt;/span> (e.target && e.target.matches(&lt;span class="hljs-string">'div.code'&lt;/span>)) {  
      &lt;span class="hljs-keyword">return&lt;/span>;    
  }    
  &lt;span class="hljs-keyword">this&lt;/span>.setState({   active: &lt;span class="hljs-literal">false&lt;/span>,    });   }); 
 }
</code></pre>

### 7.通过源码看本质 {#item-2-7}

7-1 事件注册  
事件注册即在 document 节点，将 React 事件转化为 DOM 原生事件，并注册回调。

<pre class="hljs actionscript"><code>&lt;span class="hljs-comment">// enqueuePutListener 负责事件注册。&lt;/span>
&lt;span class="hljs-comment">// inst：注册事件的 React 组件实例&lt;/span>
&lt;span class="hljs-comment">// registrationName：React 事件，如：onClick、onChange&lt;/span>
&lt;span class="hljs-comment">// listener：和事件绑定的 React 回调方法，如：handleClick、handleChange&lt;/span>
&lt;span class="hljs-comment">// transaction：React 事务流，不懂没关系，不太影响对事件系统的理解&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">enqueuePutListener&lt;/span>&lt;span class="hljs-params">(inst, registrationName, listener, transaction)&lt;/span> &lt;/span>{
    ... ...
   &lt;span class="hljs-comment">// doc 为找到的 document 节点&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
    &lt;span class="hljs-comment">// 事件注册&lt;/span>
    listenTo(registrationName, doc);
    &lt;span class="hljs-comment">// 事件存储，之后会讲到，即存储事件回调方法&lt;/span>
    transaction.getReactMountReady().enqueue(putListener, {
        inst: inst,
        registrationName: registrationName,
        listener: listener
    });
}</code></pre>

来看事件注册的具体代码，如何在 document 上绑定 DOM 原生事件。

<pre class="hljs actionscript"><code>&lt;span class="hljs-comment">// 事件注册&lt;/span>
&lt;span class="hljs-comment">// registrationName：React 事件名，如：onClick、onChange&lt;/span>
&lt;span class="hljs-comment">// contentDocumentHandle：要将事件绑定到的 DOM 节点&lt;/span>
listenTo: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-params">(registrationName, contentDocumentHandle)&lt;/span> &lt;/span>{
    &lt;span class="hljs-comment">// document&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> mountAt = contentDocumentHandle;      
    &lt;span class="hljs-comment">// React 事件和绑定在根节点的 topEvent 的转化关系，如：onClick -> topClick&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
    
    &lt;span class="hljs-keyword">for&lt;/span> (&lt;span class="hljs-keyword">var&lt;/span> i = &lt;span class="hljs-number">0&lt;/span>; i &lt; dependencies.length; i++){
        &lt;span class="hljs-comment">// 内部有大量判断浏览器兼容等的步骤，提取一下核心代码&lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> dependency = dependencies[i];
        
        &lt;span class="hljs-comment">// topEvent 和原生 DOM 事件的转化关系&lt;/span>
        &lt;span class="hljs-keyword">if&lt;/span> (topEventMapping.hasOwnProperty(dependency)) {
            &lt;span class="hljs-comment">// 三个参数为 topEvent、原生 DOM Event、Document&lt;/span>
            &lt;span class="hljs-comment">// 将事件绑定到冒泡阶段&lt;/span>
            trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }
    }
}
</code></pre>

来看将事件绑定到冒泡阶段的具体代码：

<pre class="hljs actionscript"><code>&lt;span class="hljs-comment">// 三个参数为 topEvent、原生 DOM Event、Document（挂载节点）&lt;/span>
trapBubbledEvent: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-params">(topLevelType, handlerBaseName, element)&lt;/span> &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span> (!element) {
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">null&lt;/span>;
    }
    &lt;span class="hljs-keyword">return&lt;/span> EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(&lt;span class="hljs-literal">null&lt;/span>, topLevelType));
}

&lt;span class="hljs-comment">// 三个参数为 Document（挂载节点）、原生 DOM Event、事件绑定函数&lt;/span>
listen: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">listen&lt;/span>&lt;span class="hljs-params">(target, eventType, callback)&lt;/span> &lt;/span>{
    &lt;span class="hljs-comment">// 去除浏览器兼容部分，留下核心后&lt;/span>
    target.addEventListener(eventType, callback, &lt;span class="hljs-literal">false&lt;/span>);
    &lt;span class="hljs-comment">// 返回一个解绑的函数&lt;/span>
    &lt;span class="hljs-keyword">return&lt;/span> {
        remove: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">remove&lt;/span>&lt;span class="hljs-params">()&lt;/span> &lt;/span>{
            target.removeEventListener(eventType, callback, &lt;span class="hljs-literal">false&lt;/span>);
        }
    }
}
</code></pre>

在 listen 方法中，我们终于发现了熟悉的 addEventListener 这个原生事件注册方法。只有 document 节点才会调用这个方法，故仅仅只有 document 节点上才有 DOM 事件。这大大简化了 DOM 事件逻辑，也节约了内存。

7-2.事件存储  
事件注册之后，还需要将事件绑定的回调函数存储下来。这样，在触发事件后才能去寻找相应回调来触发。在一开始的代码中，我们已经看到，是使用 putListener 方法来进行事件回调存储。

<pre class="hljs actionscript"><code>&lt;span class="hljs-comment">// inst：注册事件的 React 组件实例&lt;/span>
&lt;span class="hljs-comment">// registrationName：React 事件，如：onClick、onChange&lt;/span>
&lt;span class="hljs-comment">// listener：和事件绑定的 React 回调方法，如：handleClick、handleChange&lt;/span>
putListener: &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-params">(inst, registrationName, listener)&lt;/span> &lt;/span>{
    &lt;span class="hljs-comment">// 核心代码如下&lt;/span>
    &lt;span class="hljs-comment">// 生成每个组件实例唯一的标识符 key&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> key = getDictionaryKey(inst);
    &lt;span class="hljs-comment">// 获取某种 React 事件在回调存储银行中的对象&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;
}
</code></pre>

7-3.事件执行

  * 每次触发事件都会执行根节点上 addEventListener 注册的回调，也就是 ReactEventListener.dispatchEvent 方法，事件分发入口函数。该函数的主要业务逻辑如下： 
      * 找到事件触发的 DOM 和 React Component
      * 从该 React Component，调用 findParent 方法，遍历得到所有父组件，存在数组中。
      * 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法，执行，详细过程为： 
          * 根据 DOM 事件构造 React 合成事件。
          * 将合成事件放入队列。
          * 批处理队列中的事件（包含之前未处理完的，先入先处理）

React合成事件的冒泡并不是真的冒泡，而是节点的遍历。

## 三 后记 {#item-3}

个人觉得stopImmediatePropagation非常有用，很有必要阻止合成事件冒泡到DOM document上，原因是：

<pre class="hljs javascript"><code>&lt;span class="hljs-number">1.&lt;/span>合成事件本来就绑定在&lt;span class="hljs-built_in">document&lt;/span>上，完全可以获取这个&lt;span class="hljs-built_in">document&lt;/span>
&lt;span class="hljs-number">2.&lt;/span>stopImmediatePropagation可以阻止触发的&lt;span class="hljs-built_in">document&lt;/span> DOM上的事件，这十分有必要
&lt;span class="hljs-number">3.&lt;/span>不会阻止DOM 上的事件冒泡到&lt;span class="hljs-built_in">document&lt;/span> DOM
</code></pre>

参考资料：《深入React技术栈》@陈屹著  
参考链接：  
1.<a href="https://juejin.im/post/59db6e7af265da431f4a02ef" target="_blank" rel="nofollow noopener noreferrer">https://juejin.im/post/59db6e&#8230;</a>  
2.<a href="https://github.com/youngwind/blog/issues/107" target="_blank" rel="nofollow noopener noreferrer">https://github.com/youngwind/&#8230;</a>  
3.<a href="https://zhuanlan.zhihu.com/p/26742034" target="_blank" rel="nofollow noopener noreferrer">https://zhuanlan.zhihu.com/p/&#8230;</a>  
4.<a href="https://zhuanlan.zhihu.com/p/27132447" target="_blank" rel="nofollow noopener noreferrer">https://zhuanlan.zhihu.com/p/&#8230;</a>