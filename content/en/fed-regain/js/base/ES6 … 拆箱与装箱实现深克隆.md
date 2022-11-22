---
title: ES6 … 拆箱与装箱实现深克隆

---
你用过 &#8230; 吗？ 没用过的话，你太low了。

<pre class="pure-highlightjs"><code class="">const test = (...args)=&gt;{

}
</code></pre>

你肯定写过这种代码，这个比较简单，就是对不定长入参的封装，args是一个数组，入参个数就是args的长度。

## 名词解释

用&#8230;把数据拼在一起 称为<span style="color: #ff0000;">装箱</span>，把数据结构才开，称为<span style="color: #ff0000;">拆箱</span>

## 高级用法

还有更高级的用法，

<pre class="pure-highlightjs"><code class="">let aa = {11:22,33:44}
let bb = {11:22,33:44,55:{66:77,88:99}}
let cc = {11:22,33:44,55:{66:77,88:110,99:120}}
let dd = {...aa,...bb,...cc}

------out---
dd = {"11":22,"33":44,"55":{"66":77,"88":110,"99":120}}
</code></pre>

还有呢

<pre class="pure-highlightjs"><code class="">let ee = [11,22,33]
let ff=[55,66,77]
[...ee,...ff]
-----out---
[11, 22, 33, 55, 66, 77]
</code></pre>

是不是，以后再也不用为数据合并而烦恼了，不需要extend ， merge ，assign这些函数了，而且这个装箱操作还是不可变的，Immutable。新生成的对象和之前的对象不是一个对象，或者你可以理解为深克隆。是不是很神奇？

<pre class="pure-highlightjs"><code class="">let aa = {11:22,33:44}
let bb = {11:22,33:44,55:{66:77,88:99}}
let cc = {11:22,33:44,55:{66:77,88:110,99:120}}
let dd = {...aa,...bb,...cc}
dd[11] = 23
------out---
dd = {"11":23,"33":44,"55":{"66":77,"88":110,"99":120}}
aa = {11:22,33:44}
</code></pre>

<pre class="pure-highlightjs"><code class="">let ee = [11,22,33]
let ff=[55,66,77]
let gg = [...ee, ...ff]
gg[0]=22
------out----
gg: [22, 22, 33, 55, 66, 77]
ee: [11, 22, 33]
</code></pre>

这回又解决了一个问题，深克隆，以后深拷贝就可以用 &#8230; 了，是不是很简单。

<span style="color: #ff0000;">PS: 以上测试在Chrome浏览器中正常，在前端webpack或者rollup打包需要babel-preset-stage-3支持，但是这个babel最终会转换成Object.assign, 所以又变成浅拷贝了！！！</span>

再补充个深克隆的实验

<pre class="EnlighterJSRAW" data-enlighter-language="null">let aa = {11:function(){ console.log(11) }}
let bb = {...aa}

aa[11] = function(){console.log(23)}

aa[11]() // 输出 23
bb[11]() // 输出 11</pre>

函数都可以实现深克隆，厉害。不是这是浏览器实现了的。上面红色的字提示了，如果用polyfill，注意回退情况。如果是中后台可控范围，可以放心用
