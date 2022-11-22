---
title: hooks使用指南


date: 2020-02-28T11:19:40+00:00
url: /javascriptnodejs/5622.html
views:
  - 1019


---
<div>
  <div>
    <article class="_2rhmJa">本文是阅读<a href="https://overreacted.io/a-complete-guide-to-useeffect/" target="_blank" rel="noopener noreferrer">A Complete Guide to useEffect</a>之后的个人总结，建议拜读原文</p> 
    
    <h2>
      理解hooks工作机制
    </h2>
    
    <p>
      可以这样说，在使用了useState或是useEffect这样的hooks之后，每次组件在render的时候都生成了一份本次render的state、function、effects，这些与之前或是之后的render里面的内容都是没有关系的。而对于class component来说，state是一种引用的形式。这就造成了二者在一些表现上的不同。
    </p>
    
    <p>
      来看下面这样一段代码：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">handleAlertClick&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">alert&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'You clicked on: '&lt;/span> &lt;span class="token operator">+&lt;/span> count&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">3000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token comment">// 多次点击click me按钮，然后点击一下show alert按钮，然后又快速点击多次click me按钮，alert出来的count是点击该按钮时的count还是最新的count？？&lt;/span>
        &lt;span class="token comment">// 实验表明，显示的是点击时的按钮，这就意味着handleAlertClick这个函数capture了被点击时的那个count，这也就是说每一轮的count都是不一样的&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                    Click me
                &lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>handleAlertClick&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                    Show alert
                &lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      再看这样一段代码：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>count&lt;span class="token punctuation">)&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">3000&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token comment">// 在3秒内快速点击5次按钮，控制台打出的结果是什么样的？&lt;/span>
        &lt;span class="token comment">// 0 1 2 3 4 5&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                    Click me
                &lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      把上述代码改成class component的形式：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">class&lt;/span> &lt;span class="token class-name">Example&lt;/span> &lt;span class="token keyword">extends&lt;/span> &lt;span class="token class-name">React&lt;span class="token punctuation">.&lt;/span>Component&lt;/span>&lt;span class="token punctuation">{&lt;/span>

        &lt;span class="token function">constructor&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">props&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">super&lt;/span>&lt;span class="token punctuation">(&lt;/span>props&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                count&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">,&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token function">componentDidUpdate&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">.&lt;/span>count&lt;span class="token punctuation">)&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">3000&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token function-variable function">add&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">setState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">:&lt;/span> count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token comment">// 同样的操作，打印出的结果是 5 5 5 5 5&lt;/span>

        &lt;span class="token function">render&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                    &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>add&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">click me&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      对于class component里面的表现，我们可以通过闭包来改变，之所以如此是因为class component里面的state随着render是发生变化的，而useEffect里面即使使用props.count也不会有问题，因为useEffect里面的所有东西都是每次render独立的
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token function">componentDidUpdate&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment">// 在class component中必须每次把count取出来&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> count &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">this&lt;/span>&lt;span class="token punctuation">.&lt;/span>state&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>count&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">3000&lt;/span>&lt;span class="token punctuation">)&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Example&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">props&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>props&lt;span class="token punctuation">.&lt;/span>counter&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// 在useEffect中不需要先把count从props里面取出来，每次依然是独立的&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      可以发现，尽管useEffect里面的函数延迟执行了，但是打出的count依然是当时render里面的count，这也说明了其实每次render都是独立的，里面有独立的state、effects、function
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token comment">// During first render&lt;/span>
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> count &lt;span class="token operator">=&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// Returned by useState()&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token comment">// After a click, our function is called again&lt;/span>
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> count &lt;span class="token operator">=&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// Returned by useState()&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token comment">// After another click, our function is called again&lt;/span>
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> count &lt;span class="token operator">=&lt;/span> &lt;span class="token number">2&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// Returned by useState()&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      下面这段话是精髓：
    </p>
    
    <blockquote>
      <p>
        Inside any particular render, props and state forever stay the same. But if props and state are isolated between renders, so are any values using them (including the event handlers). They also “belong” to a particular render. So even async functions inside an event handler will “see” the same count value.
      </p>
    </blockquote>
    
    <h2>
      useEffect的一些注意点
    </h2>
    
    <p>
      来看官方文档里面关于useEffect清除工作的示例：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Example&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">props&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">subscribeToFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>props&lt;span class="token punctuation">.&lt;/span>id&lt;span class="token punctuation">,&lt;/span>       handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">unsubscribeFromFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>props&lt;span class="token punctuation">.&lt;/span>id&lt;span class="token punctuation">,&lt;/span> handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      如果props从{id: 10}变化为{id: 20}那么react是怎么样来渲染组件、怎么样做清除工作的呢？
    </p>
    
    <p>
      按照惯性思维，我们可能觉得应该是先清理之前一次render注册的事件，然后render组件，然后再注册本次render的事件
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-css"><code class="  language-css">    &lt;span class="token selector">React cleans up the effect for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 10&lt;span class="token punctuation">}&lt;/span>&lt;span class="token selector">.
    React renders UI for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 20&lt;span class="token punctuation">}&lt;/span>&lt;span class="token selector">.
    React runs the effect for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 20&lt;span class="token punctuation">}&lt;/span>.
</code></pre>
    </div>
    
    <p>
      但实际上react并不是这样工作的，而是像下面这样，因为react总是在浏览器paint之后再去做effects相关的事情，无论是useEffect还是他返回的函数，而且清理函数也和其他函数一样能够capture当前的props和state，尽管在他执行时已经是新的组件render好了
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-css"><code class="  language-css">    &lt;span class="token selector">React renders UI for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 20&lt;span class="token punctuation">}&lt;/span>&lt;span class="token selector">.
    The browser paints. We see the UI for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 20&lt;span class="token punctuation">}&lt;/span> &lt;span class="token selector">on the screen.
    React cleans up the effect for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 10&lt;span class="token punctuation">}&lt;/span>&lt;span class="token selector">.
    React runs the effect for&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token property">id&lt;/span>&lt;span class="token punctuation">:&lt;/span> 20&lt;span class="token punctuation">}&lt;/span>.
</code></pre>
    </div>
    
    <p>
      清理函数就像闭包一样直接把他所属的render的props和state消费，然后在需要执行的时候使用这些值
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token comment">// First render, props are {id: 10}&lt;/span>
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Example&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token comment">// Effect from first render&lt;/span>
            &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">subscribeToFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">10&lt;/span>&lt;span class="token punctuation">,&lt;/span> handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token comment">// Cleanup for effect from first render&lt;/span>
                &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">unsubscribeFromFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">10&lt;/span>&lt;span class="token punctuation">,&lt;/span> handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token comment">// Next render, props are {id: 20}&lt;/span>
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Example&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token comment">// Effect from second render&lt;/span>
            &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">subscribeToFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">20&lt;/span>&lt;span class="token punctuation">,&lt;/span> handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token comment">// Cleanup for effect from second render&lt;/span>
                &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    ChatAPI&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">unsubscribeFromFriendStatus&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">20&lt;/span>&lt;span class="token punctuation">,&lt;/span> handleStatusChange&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <h2>
      忘记lifecycle的观念，拥抱synchronization
    </h2>
    
    <p>
      在class component里面，lifecycle是我们做一切的基础，但是在使用react-hooks的时候，请忘记lifecycle，尽管useEffect函数很多时候达到了相似的效果
    </p>
    
    <p>
      但从根本上来讲，react-hooks的作用是一种同步的作用，同步函数hooks函数内的内容与外部的props以及state，所以才会在每次render之后执行useEffect里面的函数，这时可以获取到当前render结束后的props和state，来保持一种同步
    </p>
    
    <p>
      但正是由于useEffect里面的内容在每次render结束后都会执行，可能有时候内部的内容并没有发生变化，这时就会产生冗余的render，这时候就需要引入依赖，由写程序的人来告诉react我这个useEffect依赖了外部的那些参数，只有这些参数发生变化的时候才去执行我里面的函数。
    </p>
    
    <p>
      因为react自己不知道什么时候useEffect里面的函数其实没有发生变化。
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">     &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        document&lt;span class="token punctuation">.&lt;/span>title &lt;span class="token operator">=&lt;/span> &lt;span class="token string">'Hello, '&lt;/span> &lt;span class="token operator">+&lt;/span> name&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>name&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// Our deps&lt;/span>
</code></pre>
    </div>
    
    <p>
      上面这段代码相当于告诉react，我这个effect的依赖项是name这个变量，只有当name发生变化的时候才去执行里面的函数
    </p>
    
    <p>
      而且这个比较是浅比较，如果state是一个对象，那么对象只要指向不发生变化，那么就不会执行effect里面的函数
    </p>
    
    <p>
      譬如：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Example&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>a&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">12&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'effect'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'clean'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>

        &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">handleClick&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            count&lt;span class="token punctuation">.&lt;/span>a&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token comment">// 点击按钮时发现屏幕显示的值不发生变化，而且effect里面的函数也没有执行，所以进行的是浅比较，这点类似于pureComponent&lt;/span>

        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">You clicked &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">.&lt;/span>a&lt;span class="token punctuation">}&lt;/span>&lt;span class="token plain-text"> times&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>p&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>handleClick&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                    Click me
                &lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>div&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <h3>
      关于dependency数组
    </h3>
    
    <p>
      如果强行欺骗react来达到跳过某些渲染之后的effect函数的话，那么可能会出现一些意想不到的后果：
    </p>
    
    <p>
      如下代码，我们想模拟一个定时器，在第一次渲染之后挂载，在组件卸载的时候取消这个定时器，那么这好像和把dependency数组设为[]的功能很像，但是如果这样做的话，结果是定时器只加一次。
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> id &lt;span class="token operator">=&lt;/span> &lt;span class="token function">setInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// 定时器只加一次的原因在于虽然setInterval函数里面的函数每秒都会执行一次，但是count值始终是初始的0，因为这个函数绑定了第一轮render之后的count值，&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">clearInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>id&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token keyword">return&lt;/span> &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      如果写成下面这样的形式的话：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">setInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// 造成的后果就是能一直更新count，但是每一轮循环都会执行上面这行代码，定时器越来越多，然后，就卡死啦，而且每个定时器都会执行一遍，那么屏幕上的数字每秒都会在跳，可以试试看&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>h1&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

</code></pre>
    </div>
    
    <p>
      所以通过设置dependency数组来欺骗react达到自己不可告人的目的的话，很容易出现bug，而且还不容易发现，所以还是老老实实的不要骗人
    </p>
    
    <p>
      要让计时器正确工作的话，第一种方法是把dependency数组正确设置[count]，但这显然不是最好的方法，因为每一轮都会设置计时器，清除计时器。但至少定时器work了。
    </p>
    
    <p>
      还有一种方法是利用functional updater，这时候你也可以不用设置dependency
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> id &lt;span class="token operator">=&lt;/span> &lt;span class="token function">setInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">preCount&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> preCount &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// 此时setCount里面的函数的入参是前一次render之后的count值，所以这样的情况下计时器可以work&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">clearInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>id&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    </div>
    
    <h2>
      其他hooks
    </h2>
    
    <h3>
      useContext
    </h3>
    
    <p>
      使用方法：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-csharp"><code class="  language-csharp">    &lt;span class="token keyword">const&lt;/span> &lt;span class="token keyword">value&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useContext&lt;/span>&lt;span class="token punctuation">(&lt;/span>myContext&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    </div>
    
    <p>
      当最近的一个myContext.Provider更新的时候，这个hook就会导致当前组件发生更新
    </p>
    
    <h3>
      useReducer
    </h3>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    
    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">reducer&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">state&lt;span class="token punctuation">,&lt;/span> action&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">switch&lt;/span> &lt;span class="token punctuation">(&lt;/span>action&lt;span class="token punctuation">.&lt;/span>type&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">case&lt;/span> &lt;span class="token string">'increment'&lt;/span>&lt;span class="token punctuation">:&lt;/span>
                &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">:&lt;/span> state&lt;span class="token punctuation">.&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">case&lt;/span> &lt;span class="token string">'decrement'&lt;/span>&lt;span class="token punctuation">:&lt;/span>
                &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">:&lt;/span> state&lt;span class="token punctuation">.&lt;/span>count &lt;span class="token operator">-&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">default&lt;/span>&lt;span class="token punctuation">:&lt;/span>
                &lt;span class="token keyword">throw&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Error&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>state&lt;span class="token punctuation">,&lt;/span> dispatch&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useReducer&lt;/span>&lt;span class="token punctuation">(&lt;/span>reducer&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">100&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token comment">// 如果此处不传入一个initialState: {count: 100}的话，那么默认initialState就是undefined，那么后面的取值就会报错&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                Count: &lt;/span>&lt;span class="token punctuation">{&lt;/span>state&lt;span class="token punctuation">.&lt;/span>count&lt;span class="token punctuation">}&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">dispatch&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>type&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'increment'&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">+&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">dispatch&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>type&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">'decrement'&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">-&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      使用dispatch以后，判断是否重新render是通过Object.is来判断的，每次render之后返回的dispatch其实都是不变的，所以之前定时器的例子最好的解决方案就是利用useReducer来实现：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-php"><code class="  language-php">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>state&lt;span class="token punctuation">,&lt;/span> dispatch&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useReducer&lt;/span>&lt;span class="token punctuation">(&lt;/span>reducer&lt;span class="token punctuation">,&lt;/span> initialState&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> count&lt;span class="token punctuation">,&lt;/span> step &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> state&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&lt;/span>&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> id &lt;span class="token operator">=&lt;/span> &lt;span class="token function">setInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&lt;/span>&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">dispatch&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span> type&lt;span class="token punctuation">:&lt;/span> &lt;span class="token single-quoted-string string">'tick'&lt;/span> &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1000&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&lt;/span>&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token function">clearInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>id&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>dispatch&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// 现在useEffect不依赖count，依赖的是dispatch，而dispatch在每次render之后都是不变的，所以就不会每次render之后都清除计时器再重新设置计时器&lt;/span>
        &lt;span class="token comment">// 其实这里把dependency数组设为[]也是完全一样的&lt;/span>

        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">&gt;&lt;/span>
            &lt;span class="token operator">&lt;&lt;/span>h1&lt;span class="token operator">&gt;&lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>&lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>h1&lt;span class="token operator">&gt;&lt;/span>
            &lt;span class="token operator">&lt;&lt;/span>input value&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>step&lt;span class="token punctuation">}&lt;/span> onChange&lt;span class="token operator">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>e &lt;span class="token operator">=&lt;/span>&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">dispatch&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                    type&lt;span class="token punctuation">:&lt;/span> &lt;span class="token single-quoted-string string">'step'&lt;/span>&lt;span class="token punctuation">,&lt;/span>
                    step&lt;span class="token punctuation">:&lt;/span> &lt;span class="token function">Number&lt;/span>&lt;span class="token punctuation">(&lt;/span>e&lt;span class="token punctuation">.&lt;/span>target&lt;span class="token punctuation">.&lt;/span>value&lt;span class="token punctuation">)&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">/&lt;/span>&lt;span class="token operator">&gt;&lt;/span>
            &lt;span class="token operator">&lt;&lt;/span>&lt;span class="token operator">/&lt;/span>&lt;span class="token operator">&gt;&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

    &lt;span class="token keyword">const&lt;/span> initialState &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        count&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        step&lt;span class="token punctuation">:&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>

    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">reducer&lt;/span>&lt;span class="token punctuation">(&lt;/span>state&lt;span class="token punctuation">,&lt;/span> action&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">{&lt;/span> count&lt;span class="token punctuation">,&lt;/span> step &lt;span class="token punctuation">}&lt;/span> &lt;span class="token operator">=&lt;/span> state&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>action&lt;span class="token punctuation">.&lt;/span>type &lt;span class="token operator">===&lt;/span> &lt;span class="token single-quoted-string string">'tick'&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">{&lt;/span> count&lt;span class="token punctuation">:&lt;/span> count &lt;span class="token operator">+&lt;/span> step&lt;span class="token punctuation">,&lt;/span> step &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>action&lt;span class="token punctuation">.&lt;/span>type &lt;span class="token operator">===&lt;/span> &lt;span class="token single-quoted-string string">'step'&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">{&lt;/span> count&lt;span class="token punctuation">,&lt;/span> step&lt;span class="token punctuation">:&lt;/span> action&lt;span class="token punctuation">.&lt;/span>step &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span> &lt;span class="token keyword">else&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">throw&lt;/span> &lt;span class="token keyword">new&lt;/span> &lt;span class="token class-name">Error&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>


</code></pre>
    </div>
    
    <h3>
      useCallback
    </h3>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">const&lt;/span> memoizedCallback &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useCallback&lt;/span>&lt;span class="token punctuation">(&lt;/span>
        &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">doSomething&lt;/span>&lt;span class="token punctuation">(&lt;/span>a&lt;span class="token punctuation">,&lt;/span> b&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span>
        &lt;span class="token punctuation">[&lt;/span>a&lt;span class="token punctuation">,&lt;/span> b&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token comment">// 返回的memoizedCallback只有当a、b发生变化时才会变化，可以把这样一个memoizedCallback作为dependency数组的内容给useEffect&lt;/span>
</code></pre>
    </div>
    
    <p>
      我们来看一个useEffect的dependency数组含有函数的情况：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Counter&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>count&lt;span class="token punctuation">,&lt;/span> setCount&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>a&lt;span class="token punctuation">,&lt;/span> setA&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token number">100&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token keyword">const&lt;/span> fn &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useCallback&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'callback'&lt;/span>&lt;span class="token punctuation">,&lt;/span> a&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>a&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token comment">// 可知fn是依赖于a的，只有当a发生变化的时候fn才会变化，否则每轮render的fn都是同一个&lt;/span>

        &lt;span class="token keyword">const&lt;/span> &lt;span class="token function-variable function">f1&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'f1'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token comment">// 对于f1，每轮循环都有独自的f1，所以相当于一直在变化，如果useEffect依赖于f1的话，每次render之后都会执行&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'this is effect'&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>f1&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>
        &lt;span class="token comment">// 当dependency数组里面是f1时，不管更新count还是a，都会执行里面的函数，打印出this is effect&lt;/span>
        &lt;span class="token comment">// 当dependency数组里面是fn时，只有更新a时才会执行该函数&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">
                Count: &lt;/span>&lt;span class="token punctuation">{&lt;/span>count&lt;span class="token punctuation">}&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">+&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setCount&lt;/span>&lt;span class="token punctuation">(&lt;/span>count &lt;span class="token operator">-&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">-&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>br &lt;span class="token punctuation">/&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setA&lt;/span>&lt;span class="token punctuation">(&lt;/span>a &lt;span class="token operator">+&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">+&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
                &lt;span class="token tag">&lt;span class="token punctuation">&lt;&lt;/span>button &lt;span class="token attr-name">onClick&lt;/span>&lt;span class="token script language-javascript">&lt;span class="token script-punctuation punctuation">=&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">setA&lt;/span>&lt;span class="token punctuation">(&lt;/span>a &lt;span class="token operator">-&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>&lt;span class="token plain-text">-&lt;/span>&lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>button&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
            &lt;span class="token tag">&lt;span class="token punctuation">&lt;/&lt;/span>&lt;span class="token punctuation">&gt;&lt;/span>&lt;/span>
        &lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>

</code></pre>
    </div>
    
    <h3>
      useMemo
    </h3>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">const&lt;/span> memoizedValue &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useMemo&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token function">computeExpensiveValue&lt;/span>&lt;span class="token punctuation">(&lt;/span>a&lt;span class="token punctuation">,&lt;/span> b&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>a&lt;span class="token punctuation">,&lt;/span> b&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    </div>
    
    <h3>
      useRef
    </h3>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-cpp"><code class="  language-cpp">    &lt;span class="token keyword">const&lt;/span> refContainer &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useRef&lt;/span>&lt;span class="token punctuation">(&lt;/span>initialValue&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
</code></pre>
    </div>
    
    <p>
      注意：useRef返回相当于一个{current: &#8230;}的plain object，但是和正常这样每轮render之后直接显式创建的区别在于，每轮render之后的useRef返回的plain object都是同一个，只是里面的current发生变化
    </p>
    
    <p>
      而且，当里面的current发生变化的时候并不会引起render
    </p>
    
    <h2>
      补充
    </h2>
    
    <p>
      dependency数组里面写函数作为dependency的情景：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">SearchResults&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>query&lt;span class="token punctuation">,&lt;/span> setQuery&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'react'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token comment">// Imagine this function is also long&lt;/span>
        &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token string">'https://hn.algolia.com/api/v1/search?query='&lt;/span> &lt;span class="token operator">+&lt;/span> query&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token comment">// 对于这样一个组件，如果我们改变了query，按理来说应该要重新拉取数据，但是这种写法里面就无法实现，除非在useEffect的dependency数组里面添加一个query，但是这样是很不明显的，因为useEffect里面的函数只写了一个fetchData，并没有看到query的身影，所以query很容易被忽略，而一旦忽略就会带来bug，所以简单的解决方法就是把fetchData这个函数作为dependency写进useEffect的dependency数组，但是这样也会带来问题，就是每次render之后，无论这次render是否改变了query，都会导致fetchData这个函数发生变化（因为每次render之后函数都是不同的），都会重新拉取数据，这是我们不想要的结果&lt;/span>

        &lt;span class="token comment">// Imagine this function is also long&lt;/span>
        &lt;span class="token keyword">async&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">fetchData&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> result &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">await&lt;/span> &lt;span class="token function">axios&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token function">setData&lt;/span>&lt;span class="token punctuation">(&lt;/span>result&lt;span class="token punctuation">.&lt;/span>data&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token function">fetchData&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      第一次改进，把函数直接写进dependency数组里面：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">SearchResults&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment">// &#x1f534; Re-triggers all effects on every render&lt;/span>
        &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">query&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token string">'https://hn.algolia.com/api/v1/search?query='&lt;/span> &lt;span class="token operator">+&lt;/span> query&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> url &lt;span class="token operator">=&lt;/span> &lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'react'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// ... Fetch data and do something ...&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>getFetchUrl&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// &#x1f6a7; Deps are correct but they change too often&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> url &lt;span class="token operator">=&lt;/span> &lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'redux'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// ... Fetch data and do something ...&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>getFetchUrl&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// &#x1f6a7; Deps are correct but they change too often&lt;/span>

        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      上面这种写法的问题就是useEffect里面的函数调用过于频繁，再次利用useCallback进行改造：
    </p>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">SearchResults&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>query&lt;span class="token punctuation">,&lt;/span> setQuery&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'react'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token comment">// &#x2705; Preserves identity until query changes&lt;/span>
        &lt;span class="token keyword">const&lt;/span> getFetchUrl &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useCallback&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">return&lt;/span> &lt;span class="token string">'https://hn.algolia.com/api/v1/search?query='&lt;/span> &lt;span class="token operator">+&lt;/span> query&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>query&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>  &lt;span class="token comment">// &#x2705; Callback deps are OK&lt;/span>
        &lt;span class="token comment">// 只有当query发生变化的时候getFetchUrl才会变化&lt;/span>
        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">const&lt;/span> url &lt;span class="token operator">=&lt;/span> &lt;span class="token function">getFetchUrl&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// ... Fetch data and do something ...&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>getFetchUrl&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> &lt;span class="token comment">// &#x2705; Effect deps are OK&lt;/span>

        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span>
</code></pre>
    </div>
    
    <p>
      useCallback本质上是添加了一层依赖检查。它以另一种方式解决了问题 &#8211; 我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖
    </p>
    
    <p>
      实际上，函数在effect里面也是一种数据流，而在class component中则不是
    </p>
    
    <h3>
      关于竞态
    </h3>
    
    <div class="_2Uzcx_">
      <button class="VJbwyy" type="button" aria-label="复制代码"><i class="anticon anticon-copy" aria-label="icon: copy"></i></button></p> 
      
      <pre class="line-numbers  language-jsx"><code class="  language-jsx">    &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">Article&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">&lt;span class="token punctuation">{&lt;/span> id &lt;span class="token punctuation">}&lt;/span>&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">const&lt;/span> &lt;span class="token punctuation">[&lt;/span>article&lt;span class="token punctuation">,&lt;/span> setArticle&lt;span class="token punctuation">]&lt;/span> &lt;span class="token operator">=&lt;/span> &lt;span class="token function">useState&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">null&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">useEffect&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
            &lt;span class="token keyword">let&lt;/span> didCancel &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">false&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token comment">// 利用didCancel这个变量来解决竞态问题，如果本次render之后的请求到下次render之后才返回，那么这次render之后的didCancel以及在清理函数里面被设置为true了，就不会继续执行&lt;/span>
            &lt;span class="token keyword">async&lt;/span> &lt;span class="token keyword">function&lt;/span> &lt;span class="token function">fetchData&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token keyword">const&lt;/span> article &lt;span class="token operator">=&lt;/span> &lt;span class="token keyword">await&lt;/span> &lt;span class="token constant">API&lt;/span>&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">fetchArticle&lt;/span>&lt;span class="token punctuation">(&lt;/span>id&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">!&lt;/span>didCancel&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                    &lt;span class="token function">setArticle&lt;/span>&lt;span class="token punctuation">(&lt;/span>article&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>

            &lt;span class="token function">fetchData&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

            &lt;span class="token keyword">return&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">=&gt;&lt;/span> &lt;span class="token punctuation">{&lt;/span>
                didCancel &lt;span class="token operator">=&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">;&lt;/span>
            &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token punctuation">[&lt;/span>id&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token comment">// ...&lt;/span>
    &lt;span class="token punctuation">}&lt;/span></code></pre>
    </div></article>
  </div>
</div>