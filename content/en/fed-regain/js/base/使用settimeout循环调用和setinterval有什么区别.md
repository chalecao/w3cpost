---
title: 使用setTimeout循环调用和setInterval有什么区别


date: 2020-12-23T04:18:22+00:00
url: /javascriptnodejs/6549.html
views:
  - 829


---
## [<span>有关setTimeout（）和setInterval（）的注意事项</span>][1] {#Things_to_keep_in_mind_about_setTimeout_and_setInterval}

<div>
  <p>
    <span>与</span><code>setTimeout()</code><span>和一起使用时，需要牢记一些注意事项</span><code>setInterval()</code><span>。现在让我们复习一下。</span>
  </p>
</div>

### [<span>递归超时</span>][2] {#Recursive_timeouts}

<div>
  <p>
    <span>还有另一种使用方式</span><code>setTimeout()</code><span>：您可以递归调用它以重复运行相同的代码，而不是使用</span><code>setInterval()</code><span>。</span>
  </p>
  
  <p>
    <span>下面的示例使用递归</span><code>setTimeout()</code><span>方法每</span><code>100</code><span>毫秒运行一次传递的函数：</span>
  </p>
  
  <pre class="brush: js notranslate"><code>&lt;span class="token keyword">let&lt;/span> i &lt;span class="token operator">=&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">run&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>i&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  i&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  &lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>run&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">100&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">100&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span></code></pre>
  
  <p>
    <span>将上面的示例与下面的示例进行比较-</span><code>setInterval()</code><span>可以达到相同的效果：</span>
  </p>
  
  <pre class="brush: js notranslate"><code>&lt;span class="token keyword">let&lt;/span> i &lt;span class="token operator">=&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token function">setInterval&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span> &lt;span class="token function">run&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  console&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">log&lt;/span>&lt;span class="token punctuation">(&lt;/span>i&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
  i&lt;span class="token operator">++&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">100&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span></code></pre>
  
  <h4 id="How_do_recursive_setTimeout_and_setInterval_differ">
    <span>如何做递归</span><code>setTimeout()</code><span>和</span><code>setInterval()</code><span>不同？</span>
  </h4>
  
  <p>
    <span>上面代码的两个版本之间的区别是微妙的。</span>
  </p>
  
  <ul>
    <li>
      <span>递归</span><code>setTimeout()</code><span>保证两次执行之间的相同延迟。（例如，</span><code>100</code><span>在上述情况下为ms。）代码将运行，然后等待</span><code>100</code><span>毫秒才能再次运行-因此，间隔将是相同的，而不管代码运行多长时间。</span>
    </li>
    <li>
      <span>该示例使用的</span><code>setInterval()</code><span>功能有所不同。您选择的时间间隔</span><em><span>包括</span></em><span>执行您要在其中运行的代码所花费</span><code>40</code><span>的时间。比方说，代码要花费毫秒才能运行-最终，时间间隔仅为</span><code>60</code><span>毫秒。</span>
    </li>
    <li>
      <code>setTimeout()</code><span>递归使用时，每个迭代可以在运行下一个迭代之前计算出不同的延迟。换句话说，第二个参数的值可以指定不同的时间（以毫秒为单位），以等待再次运行代码。</span>
    </li>
  </ul>
  
  <p>
    <span>当您的代码有可能花费比指定的时间间隔更长的时间运行时，最好使用递归</span><code>setTimeout()</code><span>-无论代码执行多长时间，这都将使两次执行之间的时间间隔保持恒定，并且您不会得到错误。</span>
  </p>
</div>

### [<span>立即超时</span>][3] {#Immediate_timeouts}

<div>
  <p>
    将其<code></code>用作值可以<code>setTimeout()</code>调度指定的回调函数尽快执行，但仅在运行主代码线程之后。
  </p>
  
  <p>
    例如，下面的代码（<a href="https://mdn.github.io/learning-area/javascript/asynchronous/loops-and-intervals/zero-settimeout.html">现场直播</a>）输出一个包含的警报<code>"Hello"</code>，然后<code>"World"</code>在您单击第一个警报上的OK后立即包含一个警报。
  </p>
  
  <pre class="brush: js notranslate"><code>&lt;span class="token function">setTimeout&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token keyword">function&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token function">alert&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'World'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

&lt;span class="token function">alert&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">'Hello'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span></code></pre>
  
  <p>
    如果您希望设置一个代码块以便在所有主线程完成运行后立即运行，这将很有用-将其放在async事件循环中，这样它将随后直接运行。
  </p>
  
  <p>
    参考：
  </p>
  
  <p>
    https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
  </p>
</div>

 [1]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Things_to_keep_in_mind_about_setTimeout_and_setInterval "永久链接到事物，请牢记有关setTimeout（）和setInterval（）的信息"
 [2]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Recursive_timeouts "永久链接到递归超时"
 [3]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Immediate_timeouts "永久链接到即时超时"