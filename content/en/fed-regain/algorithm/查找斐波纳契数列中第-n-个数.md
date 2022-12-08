---
title: 查找斐波纳契数列中第 N 个数

---
# 题目

查找斐波纳契数列中第 N 个数

很多朋友看到“纳契”是不是很开心，这个 纳契 可不是“纳妾”，呵呵呵

**所谓的斐波纳契数列是指**：

前 2 个数是 0 和 1 。

第 i 个数是第 i-1 个数和第 i-2 个数的和。

**斐波纳契数列的前 10 个数字是**：

<pre class="EnlighterJSRAW" data-enlighter-language="null">0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...</pre>

# 示例

给定 1，返回 0

给定 2，返回 1

给定 10，返回 34

# 分析

简单的想法就是递归，规则很明显了，但是有没有更好的解法呢？

&nbsp;

# Just Try

请你自动动手试一下：[在线编程环境][1]

想想有没有其他思路？

想想时间和空间复杂度，能否优化一下

真的做不到么？

let you think， think makes you happy!

&nbsp;

# 参考答案

### 思路：递归

代码很简单，看下就会了

<pre class="EnlighterJSRAW" data-enlighter-language="null">function fibonaqi(n){
  if(n==1) return 0;
  if(n==2) return 1;
  return fibonaqi(n-1)+fibonaqi(n-2)
}
function main(param) {
  console.show(fibonaqi(param))
}
main(10)</pre>

PS：思考一下性能问题，试试把入参改成100？ 是不是会卡死一段时间？ 经我测试入参在45的时候还可以勉强算出来。

### 思路：动态规划

看到一篇博客介绍[动态规划][2]，优化上面递归的方法，new 了一个长度为 n+1 的数组，用于存放 f(0) 到 f(n) 这 n+1 个状态的计算结果。实测效果提升显著。

动态规划就是：将原问题拆解成若干子问题，同时保存子问题的答案，使得每个子问题只求解一次，最终获得原问题的答案。

<pre class="EnlighterJSRAW" data-enlighter-language="null">let temp = []
function fibonaqi(n){
  if(n==1) return 0;
  if(n==2) return 1;
  if(!temp[n]){
    temp[n] = fibonaqi(n-1)+fibonaqi(n-2)
  }
  return temp[n]
}
function main(...param) {
  console.show("参数：" + param, "结果：" + JSON.stringify(fibonaqi(param)))
  testPerformance(fibonaqi, param)
}
main(40);</pre>

### 思路：正向计算

比如让我计算第10个，我就挨个计算前10个，然后返回，因为正好和斐波那契数列的规则相似，所以一层循环就可以计算完。

<pre class="EnlighterJSRAW" data-enlighter-language="null">function fibonaqi(n){
  let arr=[0,1]
  for(let i=2;i<n;i++){
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n-1]
}
function main(param) {
  console.show(fibonaqi(param))
}
main(10)</pre>

代码复制到在线编程环境试一下：[在线编程环境][1]

 [1]: https://www.f2e123.com/code?code=algorithm&pid=4151
 [2]: https://segmentfault.com/a/1190000015489981
