---
title: n皇后问题

---

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
