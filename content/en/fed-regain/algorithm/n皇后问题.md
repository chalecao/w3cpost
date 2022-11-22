---
title: n皇后问题


date: 2019-07-17T13:02:44+00:00
url: /algorithm/4781.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png
fifu_image_alt:
  - n皇后问题
views:
  - 1659
like:
  - 1


---
<p id="YYVacly">
  <img loading="lazy" class="alignnone  wp-image-4783 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png?x-oss-process=image/format,webp" alt="" width="357" height="370" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png?x-oss-process=image/format,webp 610w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png?x-oss-process=image/quality,q_50/resize,m_fill,w_290,h_300/format,webp 290w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/07/img_5d2f1c4b07117.png?x-oss-process=image/quality,q_50/resize,m_fill,w_579,h_600/format,webp 579w" sizes="(max-width: 357px) 100vw, 357px" />
</p>

问题：

在n*n的棋盘上放置n个皇后，要求同一行，同一列上只能有一个皇后，并且每个皇后的斜率为正负1的直线上也不能有皇后

思路：

经典的回溯法。参考这里：<https://juejin.im/post/5accdb236fb9a028bb195562>

代码：

<pre class="EnlighterJSRAW" data-enlighter-language="null">// n queens problem
function nQueens(n) {
    var result = [];
    var k = 0;
    result[k] = 0;
    while (k &gt;= 0) { //when k&lt;0; there is no solution for this 'n'
        result[k]++;
        while (result[k] &lt;= n && !place(result, k))
            result[k]++; //find proper position for the current queen
        if (result[k] &lt;= n) {
            if (k == n - 1) break; //the last queen is put at a proper position, end
            else {
                k++;
                result[k] = 0; //turn to next queen and init her position
            }
        } else {
            result[k] = 0; //before feedback, we should reset the position or it will influence next time we find proper position for her
            k--;
        }
    }
    return result;
}
//judge the current position is proper or not
//k is the serial number of the queen
//res is the array of a partial solution
function place(res, k) {
    var abs = Math.abs;
    for (var i = 0; i &lt; k; i++) {
        if (res[i] == res[k] || abs(res[i] - res[k]) == abs(i - k))
            return false;
    }
    return true;
}
 
var start = Date.now();
var result = nQueens(30);
var end = Date.now();
console.log(result, end - start);</pre>

&nbsp;