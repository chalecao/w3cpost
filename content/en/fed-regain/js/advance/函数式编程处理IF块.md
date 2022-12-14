---
title: 函数式编程处理IF块
weight: 5
---

曾几何时，经常有人问我，“如果让你用函数式编程来实现X，该怎么做?”我比较喜欢这类的问题。我尽最大能力思考这类有趣的问题。本篇文章，我用一种更加函数式的方式来实现优雅处理IF函数块的问题。下面的代码有一个if块，但是没有else。

```
// A basic redux-thunk action that only dispatches when value exists
const someAction = value => dispatch => {
  const item = getItem(value)
  if (item != null) {
    dispatch({ type: 'ACTION', item })
  }
}
```

这里[我们](https://www.w3cdoc.com)需要判断item有值的时候走dispatch方法，否则什么都不做。有一种思路是使用短路逻辑或者三元函数。

```
// short circuit
const someAction = value => dispatch => {
  const item = getItem(value)
  item && dispatch({ type: 'ACTION', item })
}

// ternary
const someAction = value => dispatch => {
  const item = getItem(value)
  item ? dispatch({ type: 'ACTION', item }) : null
}

```

短路逻辑和三元函数虽然都能解决这个问题，[我们](https://www.w3cdoc.com)这里用另外一种思路。

## Solution A: ifVal Helper Function

为了采用函数式的方法解决这个问题，[我们](https://www.w3cdoc.com)先写个help类函数来实现，后面也更容易理解。

```
// 1: old school
function ifVal (x, f) {
  if (x == null) {
    return null
  } else {
    return f(x)
  }
}

// 2: convert to arrow function
const ifVal = (x, f) => {
  if (x == null) {
    return null
  } else {
    return f(x)
  }
}

// 3: convert if/else to a ternary operator
const ifVal = (x, f) => {
  return x == null ? null : f(x)
}

// 4: 简化写法
const ifVal = (x, f) => x == null ? null : f(x)

```

现在[我们](https://www.w3cdoc.com)可以采用ifVal函数替代旧的if函数。

```
// functional alternative
const someAction = value => dispatch =>
  ifVal(getItem(value), item => dispatch({ type: 'ACTION', item }))

```

[我们](https://www.w3cdoc.com)现在比较两种情况：

```
/**
 * execute the function if the value is not null or undefined
 * @param {Object} val - the value to test
 * @param {Function} fn - the function to execute.
 * @returns {Object} - null or the value of the executed function.
 */
const ifVal = (val, fn) => val == null ? null : fn(val)

// imperative example
const someAction = value => dispatch => {
  const item = getItem(value)
  if (item!= null) {
    dispatch({ type: 'ACTION', item })
  }
}

// functional example
const someAction = value => dispatch =>
  ifVal(getItem(value), item => dispatch({ type: 'ACTION', item }))

```

扩展阅读，可以参考下Ramda的[when][1]，<a class="markup--anchor markup--p-anchor" href="https://ramdajs.com/docs/#unless" target="_blank" rel="noopener" data-href="https://ramdajs.com/docs/#unless">unless</a>, 和 <a class="markup--anchor markup--p-anchor" href="https://ramdajs.com/docs/#ifElse" target="_blank" rel="noopener" data-href="https://ramdajs.com/docs/#ifElse">ifelse  </a>等其他函数。

## Solution B: Functors

[我们](https://www.w3cdoc.com)也可以使用MayBe Type，如果有值，返回Just type，否者就是Nothing type。[我们](https://www.w3cdoc.com)使用<a class="markup--anchor markup--p-anchor" href="https://sanctuary.js.org/" target="_blank" rel="noopener" data-href="https://sanctuary.js.org/">Sanctuary</a> 类库。

```
/*Examples of Sanctuary's Maybe*/

toMaybe(null) //=> Nothing
toMaybe(undefined) //=> Nothing
toMaybe(0) //=> Just(0)
toMaybe(false) //=> Just(false)
toMaybe(123) //=> Just(123)
toMaybe({ name: 'joel' }) //=> Just({ name: 'joel' })

```
MayBe Type是最简单的例子，这里之所以选择Maybe，是因为它完全兼容map数据。

 [1]: https://ramdajs.com/docs/#when
