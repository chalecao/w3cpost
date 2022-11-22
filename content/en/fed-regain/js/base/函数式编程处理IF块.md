---
title: 函数式编程处理IF块


date: 2018-06-25T17:13:54+00:00
url: /javascriptnodejs/1896.html
views:
  - 1392
  - 1392


---
曾几何时，经常有人问我，“如果让你用函数式编程来实现X，该怎么做?”我比较喜欢这类的问题。我尽最大能力思考这类有趣的问题。本篇文章，我用一种更加函数式的方式来实现优雅处理IF函数块的问题。下面的代码有一个if块，但是没有else。

<pre class="pure-highlightjs"><code class="">// A basic redux-thunk action that only dispatches when value exists
const someAction = value =&gt; dispatch =&gt; {
  const item = getItem(value)
  if (item != null) {
    dispatch({ type: 'ACTION', item })
  }
}
</code>&lt;/code></pre>

这里我们需要判断item有值的时候走dispatch方法，否则什么都不做。有一种思路是使用短路逻辑或者三元函数。

<pre class="pure-highlightjs"><code class="">// short circuit
const someAction = value =&gt; dispatch =&gt; {
  const item = getItem(value)
  item && dispatch({ type: 'ACTION', item })
}

// ternary
const someAction = value =&gt; dispatch =&gt; {
  const item = getItem(value)
  item ? dispatch({ type: 'ACTION', item }) : null
}
</code>&lt;/code></pre>

短路逻辑和三元函数虽然都能解决这个问题，我们这里用另外一种思路。

## Solution A: ifVal Helper Function {#6c1a.graf.graf--h3.graf-after--p}

为了采用函数式的方法解决这个问题，我们先写个help类函数来实现，后面也更容易理解。

<pre class="pure-highlightjs"><code class="">// 1: old school
function ifVal (x, f) {
  if (x == null) {
    return null
  } else {
    return f(x)
  }
}

// 2: convert to arrow function
const ifVal = (x, f) =&gt; {
  if (x == null) {
    return null
  } else {
    return f(x)
  }
}

// 3: convert if/else to a ternary operator
const ifVal = (x, f) =&gt; {
  return x == null ? null : f(x)
}

// 4: voilà!
const ifVal = (x, f) =&gt; x == null ? null : f(x)
</code>&lt;/code></pre>

现在我们可以采用ifVal函数替代旧的if函数。

<pre class="pure-highlightjs"><code class="">// functional alternative
const someAction = value =&gt; dispatch =&gt;
  ifVal(getItem(value), item =&gt; dispatch({ type: 'ACTION', item }))
</code>&lt;/code></pre>

我们现在比较两种情况：

<pre class="pure-highlightjs"><code class="">/**
 * execute the function if the value is not null or undefined
 * @param {Object} val - the value to test
 * @param {Function} fn - the function to execute.
 * @returns {Object} - null or the value of the executed function.
 */
const ifVal = (val, fn) =&gt; val == null ? null : fn(val)

// imperative example
const someAction = value =&gt; dispatch =&gt; {
  const item = getItem(value)
  if (item!= null) {
    dispatch({ type: 'ACTION', item })
  }
}

// functional example
const someAction = value =&gt; dispatch =&gt;
  ifVal(getItem(value), item =&gt; dispatch({ type: 'ACTION', item }))
</code>&lt;/code></pre>

扩展阅读，可以参考下Ramda的[when][1]，<a class="markup--anchor markup--p-anchor" href="https://ramdajs.com/docs/#unless" target="_blank" rel="noopener" data-href="https://ramdajs.com/docs/#unless">unless</a>, 和 <a class="markup--anchor markup--p-anchor" href="https://ramdajs.com/docs/#ifElse" target="_blank" rel="noopener" data-href="https://ramdajs.com/docs/#ifElse">ifelse  </a>等其他函数。

## Solution B: Functors {#3d9b.graf.graf--h3.graf-after--p}

我们也可以使用MayBe Type，如果有值，返回Just type，否者就是Nothing type。我们使用<a class="markup--anchor markup--p-anchor" href="https://sanctuary.js.org/" target="_blank" rel="noopener" data-href="https://sanctuary.js.org/">Sanctuary</a> 类库。

<pre class="pure-highlightjs"><code class="">/* Examples of Sanctuary's Maybe */

toMaybe(null) //=&gt; Nothing
toMaybe(undefined) //=&gt; Nothing
toMaybe(0) //=&gt; Just(0)
toMaybe(false) //=&gt; Just(false)
toMaybe(123) //=&gt; Just(123)
toMaybe({ name: 'joel' }) //=&gt; Just({ name: 'joel' })
</code>&lt;/code></pre>

MayBe Type是最简单的例子，这里之所以选择Maybe，是因为它完全兼容map数据。

&nbsp;

 [1]: https://ramdajs.com/docs/#when