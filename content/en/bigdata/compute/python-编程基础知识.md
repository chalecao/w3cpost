---
title: python-编程基础知识
weight: 8
---

  <img loading="lazy" width="339" height="149" class="alignnone size-full wp-image-2834 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6084610d03.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6084610d03.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6084610d03.png?x-oss-process=image/format,webp 339w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf6084610d03.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_132/format,webp 300w" sizes="(max-width: 339px) 100vw, 339px" />

## Python 编程 {#python-}

### 基础 Python

[Python 教程][1]中介绍了以下 Python 基础知识：

* [定义和调用函数][2]：使用位置和[关键字][3]参数
* [字典][4]、[列表][5]、[集合][6]（创建、访问和迭代）
* [`for` 循环][7]：包含多个迭代器变量的 `for` 循环（例如 `for a, b in [(1,2), (3,4)]`）
* [`if/else` 条件块][8]和[条件表达式][9]
* [字符串格式][10]（例如 `'%.2f' % 3.14`）
* 变量、赋值、[基本数据类型][11]（`int`、`float`、`bool`、`str`）
* [`pass` 语句][12]

### 中级 Python

[Python 教程][1]还介绍了以下更高级的 Python 功能：

* [列表推导式][13]
* [Lambda 函数][14]  [lambda介绍][15]

## 第三方 Python 库 {#-python-}

机器学习速成课程代码示例使用了第三方库提供的以下功能。无需提前熟悉这些库；您可以在需要时查询相关内容。

#### [Matplotlib][16]（适合数据可视化）

* [`pyplot`][17] 模块
* [`cm`][18] 模块
* [`gridspec`][19] 模块

#### [Seaborn][20]（适合热图）

* [`heatmap`][21] 函数

#### [Pandas][22]（适合数据处理）

* [`DataFrame`][23] 类

#### [NumPy][24]（适合低阶数学运算）

* [`linspace`][25] 函数
* [`random`][26] 函数
* [`array`][27] 函数
* [`arange`][28] 函数

#### [scikit-learn][29]（适合评估指标）

* [metrics][30] 模块

## Bash 终端/云端控制台 {#bash-}

要在本地计算机上或云端控制台中运行编程练习，您应该能熟练使用命令行：

* [Bash 参考手册][31]
* [Bash 快速参考表][32]
* [了解 Shell][33]

## 示例

  1. python基本操作，参考百度AI Studio [在线地址][34]

```
data = [0.0 for _ in range(7)]
print data
tel = {'jack': 4098, 'sape': 4139}
print list(tel)
del tel['sape']
print list(tel)
tel['haha'] = 9213
print list(tel)
print sorted(tel)
print ('after reverse {0} '.format(sorted(tel,reverse=True)))
print tel.items()
print sorted(tel.items(), key=lambda d: d[1])
print 'guido' in tel
print 'guido' not in tel
list1 = [3,5,-4,-1,0,-2,-6]
print sorted(list1, key=lambda x: abs(x))
for a, b in [(1,2), (3,4)]:
    print 'a: %d' % a
    print('a: {0} and b: {1}'.format(a, b))
    list1.append(a)
print list1

def fib(n):
     """Print a Fibonacci series up to n."""
     a,b=0,1
     while a<n:
         print(a),
         a,b=b,a+b
fib(20)
```


  2. <a href="https://aistudio.baidu.com/#/projectDetail/33836">pyplot绘制图表</a>

参考：百度AI Studio [在线地址][34]

<audio style="display: none;" controls="controls"></audio>

 [1]: https://docs.python.org/3/tutorial/
 [2]: https://docs.python.org/3/tutorial/controlflow.html#defining-functions
 [3]: https://docs.python.org/3/tutorial/controlflow.html#keyword-arguments
 [4]: https://docs.python.org/3/tutorial/datastructures.html#dictionaries
 [5]: https://docs.python.org/3/tutorial/introduction.html#lists
 [6]: https://docs.python.org/3/tutorial/datastructures.html#sets
 [7]: https://docs.python.org/3/tutorial/controlflow.html#for-statements
 [8]: https://docs.python.org/3/tutorial/controlflow.html#if-statements
 [9]: https://docs.python.org/2.5/whatsnew/pep-308.html
 [10]: https://docs.python.org/3/tutorial/inputoutput.html#old-string-formatting
 [11]: https://docs.python.org/3/tutorial/introduction.html#using-python-as-a-calculator
 [12]: https://docs.python.org/3/tutorial/controlflow.html#pass-statements
 [13]: https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions
 [14]: https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions
 [15]: https://www.cnblogs.com/hf8051/p/8085424.html
 [16]: https://matplotlib.org/contents.html
 [17]: https://matplotlib.org/api/pyplot_api.html
 [18]: https://matplotlib.org/api/cm_api.html
 [19]: https://matplotlib.org/api/gridspec_api.html
 [20]: https://seaborn.pydata.org/index.html
 [21]: https://seaborn.pydata.org/generated/seaborn.heatmap.html
 [22]: https://pandas.pydata.org/
 [23]: https://pandas.pydata.org/pandas-docs/stable/dsintro.html#dataframe
 [24]: https://www.numpy.org/
 [25]: https://docs.scipy.org/doc/numpy-1.10.0/reference/generated/numpy.linspace.html
 [26]: https://docs.scipy.org/doc/numpy/reference/generated/numpy.random.random.html#numpy.random.random
 [27]: https://docs.scipy.org/doc/numpy/reference/generated/numpy.array.html
 [28]: https://docs.scipy.org/doc/numpy/reference/generated/numpy.arange.html
 [29]: https://scikit-learn.org/
 [30]: https://scikit-learn.org/stable/modules/classes.html#module-sklearn.metrics
 [31]: https://tiswww.case.edu/php/chet/bash/bashref.html
 [32]: https://github.com/LeCoupa/awesome-cheatsheets/blob/master/languages/bash.sh
 [33]: https://www.learnshell.org/
 [34]: https://aistudio.baidu.com/#/projectDetail/33836
