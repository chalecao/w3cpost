---
title: 查找第 k 大元素


date: 2019-04-11T15:49:10+00:00
url: /algorithm/4243.html
views:
  - 1309
like:
  - 3


---
# 题目-查找第k大元素

在数组中找到第 k 大的元素

# 示例

给出数组 [9,3,2,4,8]，第三大的元素是 4

给出数组 [1,2,3,4,5]，第一大的元素是 5，第二大的元素是 4，第三大的元素是 3，以此类推

# 分析

  1. 第一个想法是循环，记得之前选着排序和冒泡排序，都是先找最大的，然后依次，这次找第k大的，那么外层循环k次就好了。这样可以满足要求，但是，显然不是最好的。最差情况就是整体排序，时间复杂度o(n^2)
  2. 可以采用其他的排序算法，比如快排，先找到一个元素，把比他大的放在左边，比他小的放在右边。然后判断左边有几个，如果小于k个，那么就在右边找。如果大于k个，就在左边找。其实这个办法也不错。最差情况就是整体排序，时间复杂度o(n^logn)
  3. 堆排序的思路哈，要找第k大的元素，那么我们就按照k个元素划分一个堆，这样，划分若干个堆。每个堆中找到最大的元素，然后比较所有堆，最小的那个元素就是第k大的元素。明白了么？？？，这个时间复杂度是o(n)哦

&nbsp;

# Just Try

请你自动动手试一下：[在线编程环境][1]

想想有没有其他思路？

想想时间和空间复杂度，能否优化一下

真的做不到么？

let you think， think makes you happy!

&nbsp;

# 参考答案

### 桶排序

<pre class="EnlighterJSRAW" data-enlighter-language="null">function algorithm(param){
  let [arr, k] = param;
  let bucket = [];
  arr.forEach((v,i)=&gt;{
    if(!bucket[i%k]) bucket[i%k]= 0		
    if(bucket[i%k] &lt; v) bucket[i%k] = v
  })
  for(let i=0; i&lt;k; i++){
  	if(bucket[0] &gt; bucket[i]) bucket[0] = bucket[i]
  }
  return bucket[0]
}
function main(...param) {
  console.show("参数：" + param, "结果：" + algorithm(param))
  testPerformance(algorithm, param)
}
main([1,2,3,4,5,6,7,8,9], 4);</pre>

请你自动动手试一下：[在线编程环境][2]

 [1]: https://www.f2e123.com/code?code=algorithm&pid=4243
 [2]: https://www.f2e123.com/code?pid=4243