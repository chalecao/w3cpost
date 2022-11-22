---
title: TensorFlow.js简单概念和用法


date: 2019-09-05T09:55:26+00:00
url: /aistack/4997.html
views:
  - 1279
like:
  - 3


---
## 简介

TensorFlow.js 是一个利用 WebGL 来进行加速的机器学习类库，它基于浏览器，提供了高层次的 JavaScript API 接口。它将高性能机器学习构建块带到您的指尖，使您能够在浏览器中训练神经网络或在推理模式下运行预先训练的模型。有关安装/配置 TensorFlow.js 的指南，请参阅 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/index.html%23getting-started" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">入门指南</a>。

* * *

## Tensors（张量）

TensorFlow.js 中数据的核心表现形式是 **<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/api/latest/index.html%23class%3ATensor" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">张量</a>** ：一组数值形成的一维或多维的数组。每个`Tensor`的实例都有 `shape` 属性来用于定义数组的维度形状——即数组有几个维度，每个维度有几个值。 其中 `tensor` 最主要的构造函数就是 `tf.tensor`：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="c1">// 2x3 张量
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">shape&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">3&lt;/span>&lt;span class="p">];&lt;/span> &lt;span class="c1">// 2 行, 3 列
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">a&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">3.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">10.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">20.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">30.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="nx">shape&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="nx">a&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span> &lt;span class="c1">// 输出张量的值
&lt;/span>&lt;span class="c1">// 输出: [[1 , 2 , 3 ],
&lt;/span>&lt;span class="c1">//       [10, 20, 30]]
&lt;/span>
&lt;span class="c1">// 张量的维度形状是可以被推测的:
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">b&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">3.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">10.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">20.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">30.0&lt;/span>&lt;span class="p">]]);&lt;/span>
&lt;span class="nx">b&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">// 输出: [[1 , 2 , 3 ],
&lt;/span>&lt;span class="c1">//       [10, 20, 30]] 
&lt;/span></code></pre>
</div>

但是，如果仅仅需要构造低维张量，我们推荐使用以下函数而不是 `tf.tensor` 来增强代码的可读性：`tf.scalar`，`tf.tensor1d`，`tf.tensor2d`，`tf.tensor3d`和`tf.tensor4d`。

以下示例使用 `tf.tensor2d` 来创建与上面示例相同的张量：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">c&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor2d&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">3.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">10.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">20.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">30.0&lt;/span>&lt;span class="p">]]);&lt;/span>
&lt;span class="nx">c&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">// 输出: [[1 , 2 , 3 ],
&lt;/span>&lt;span class="c1">//       [10, 20, 30]]
&lt;/span></code></pre>
</div>

TensorFlow.js 还提供了一些带有初始化功能的张量构造函数，比如创建所有值均为 0 的 `tf.zeros` 或为 1 的 `tf.ones`：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="c1">// 所有值均为 0 的 3x5 张量
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">zeros&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">zeros&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mi">3&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">5&lt;/span>&lt;span class="p">]);&lt;/span>
&lt;span class="c1">// 输出: [[0, 0, 0, 0, 0],
&lt;/span>&lt;span class="c1">//       [0, 0, 0, 0, 0],
&lt;/span>&lt;span class="c1">//       [0, 0, 0, 0, 0]]
&lt;/span></code></pre>
</div>

在 TensorFlow.js 中，张量是不可变的 (immutable)。它们一旦被创建，你就不能修改它们的值；但是你可以通过对它们执行操作来生成新的张量。

* * *

## Variables（变量）

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/api/latest/index.html%23class%3AVariable" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Variables</a> 是由张量的值来初始化的。然而，与张量不同的是，它们的值是可变的。您可以使用 `assign` 方法为现有变量分配一个新的张量：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">initialValues&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">zeros&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mi">5&lt;/span>&lt;span class="p">]);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">biases&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">variable&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">initialValues&lt;/span>&lt;span class="p">);&lt;/span> &lt;span class="c1">// 初始化 biases
&lt;/span>&lt;span class="nx">biases&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span> &lt;span class="c1">// 输出: [0, 0, 0, 0, 0]
&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">updatedValues&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor1d&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">1&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">1&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">0&lt;/span>&lt;span class="p">]);&lt;/span>
&lt;span class="nx">biases&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">assign&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">updatedValues&lt;/span>&lt;span class="p">);&lt;/span> &lt;span class="c1">// 更新 biases 的值
&lt;/span>&lt;span class="nx">biases&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span> &lt;span class="c1">// 输出: [0, 1, 0, 1, 0]
&lt;/span></code></pre>
</div>

变量主要用于在模型训练期间存储和更新值。

* * *

## Operations (操作)

当你使用张量来存储数据时，你可以使用操作（ops）来进行数据运算。 TensorFlow.js 提供了多种用于线性代数和机器学习的 ops ，任君采劼。因为张量是不可变的，所以这些运算并不会修改它们的值；相反，ops 会返回新的张量。

可用的操作很多，包括一元操作，如 `square`：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">d&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor2d&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">3.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">4.0&lt;/span>&lt;span class="p">]]);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">d_squared&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">d&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="nx">d_squared&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">// 输出: [[1, 4 ],
&lt;/span>&lt;span class="c1">//       [9, 16]]
&lt;/span></code></pre>
</div>

还有二元操作，如 `add` ，`sub` 和 `mul`：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">e&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor2d&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">3.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">4.0&lt;/span>&lt;span class="p">]]);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">f&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor2d&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">5.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">6.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">7.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">8.0&lt;/span>&lt;span class="p">]]);&lt;/span>

&lt;span class="k">const&lt;/span> &lt;span class="nx">e_plus_f&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">e&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="nx">e_plus_f&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">// 输出: [[6 , 8 ],
&lt;/span>&lt;span class="c1">//       [10, 12]]
&lt;/span></code></pre>
</div>

TensorFlow.js 的 API 是支持链式调用的，所以你可以在 ops 的结果上继续调用 ops：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">sq_sum&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">e&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">f&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="nx">sq_sum&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="c1">// 输出: [[36 , 64 ],
&lt;/span>&lt;span class="c1">//       [100, 144]]
&lt;/span>
&lt;span class="c1">// 所有的操作符在主命名空间中都是公开的,
&lt;/span>&lt;span class="c1">// 所以你可以像&#x1f447;这么做:
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">sq_sum&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">e&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">f&lt;/span>&lt;span class="p">));&lt;/span>
</code></pre>
</div>

* * *

## Models and Layers（模型与层）

从概念上讲，模型是一个给定一些输入会产生一些期望输出的函数。 在 TensorFlow.js 中有两种创建模型的方法。您可以直接使用 ops 来代表模型所做的工作。例如：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="c1">// 定义常量: y = 2x^2 + 4x + 8
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">a&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">scalar&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">b&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">scalar&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">4&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">c&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">scalar&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">8&lt;/span>&lt;span class="p">);&lt;/span>

&lt;span class="c1">// 定义函数
&lt;/span>&lt;span class="kd">function&lt;/span> &lt;span class="nx">predict&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">input&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="c1">// y = a * x ^ 2 + b * x + c
&lt;/span>  &lt;span class="c1">// 下一节中会有更多关于 tf.tidy 的内容
&lt;/span>  &lt;span class="k">return&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tidy&lt;/span>&lt;span class="p">(()&lt;/span> &lt;span class="p">=&gt;&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="k">const&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">scalar&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">input&lt;/span>&lt;span class="p">);&lt;/span>

    &lt;span class="k">const&lt;/span> &lt;span class="nx">ax2&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">a&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">mul&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">());&lt;/span>
    &lt;span class="k">const&lt;/span> &lt;span class="nx">bx&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">b&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">mul&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="p">);&lt;/span>
    &lt;span class="k">const&lt;/span> &lt;span class="nx">y&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">ax2&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">bx&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">c&lt;/span>&lt;span class="p">);&lt;/span>

    &lt;span class="k">return&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="p">;&lt;/span>
  &lt;span class="p">});&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="c1">// 预测当输入值为2时的输出
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">result&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">predict&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="mi">2&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="nx">result&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="c1">// 输出: 24
&lt;/span></code></pre>
</div>

您还可以使用更高抽象的 API `tf.model` 来构建多层的模型，这是深度学习中的相当流行的一种抽象。下面代码构建了一个 `tf.sequential` 模型：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">model&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">sequential&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="nx">model&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">add&lt;/span>&lt;span class="p">(&lt;/span>
  &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">layers&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">simpleRNN&lt;/span>&lt;span class="p">({&lt;/span>
    &lt;span class="nx">units&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="mi">20&lt;/span>&lt;span class="p">,&lt;/span>
    &lt;span class="nx">recurrentInitializer&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s1">'GlorotNormal'&lt;/span>&lt;span class="p">,&lt;/span>
    &lt;span class="nx">inputShape&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mi">80&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mi">4&lt;/span>&lt;span class="p">]&lt;/span>
  &lt;span class="p">})&lt;/span>
&lt;span class="p">);&lt;/span>

&lt;span class="k">const&lt;/span> &lt;span class="nx">optimizer&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">train&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">sgd&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">LEARNING_RATE&lt;/span>&lt;span class="p">);&lt;/span>
&lt;span class="nx">model&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">compile&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">optimizer&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">loss&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="s1">'categoricalCrossentropy'&lt;/span>&lt;span class="p">});&lt;/span>
&lt;span class="nx">model&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">fit&lt;/span>&lt;span class="p">({&lt;/span>&lt;span class="nx">x&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">data&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">labels&lt;/span>&lt;span class="p">)});&lt;/span>
</code></pre>
</div>

TensorFlow.js 中有多种不同类型的层，例如 `tf.layers.simpleRNN`，`tf.layers.gru` 和 `tf.layers.lstm`等。

* * *

## 内存管理: dispose 与 tf.tidy

由于 TensorFlow.js 使用 GPU 来加速数学运算，因此在处理张量和变量时需要管理 GPU 内存。

TensorFlow.js 提供了两个有助于解决这个问题的函数：`dispose` 和 `tf.tidy`。

## dispose

你可以在张量或变量上调用`dispose`来清空已占用的 GPU 内存：

<div class="highlight">
  <pre><code class="language-js">&lt;span class="k">const&lt;/span> &lt;span class="nx">x&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor2d&lt;/span>&lt;span class="p">([[&lt;/span>&lt;span class="mf">0.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">],&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="mf">4.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">6.0&lt;/span>&lt;span class="p">]]);&lt;/span>
&lt;span class="k">const&lt;/span> &lt;span class="nx">x_squared&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">x&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">();&lt;/span>

&lt;span class="nx">x&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">dispose&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="nx">x_squared&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">dispose&lt;/span>&lt;span class="p">();&lt;/span>
</code></pre>
</div>

## tf.tidy

在进行了大量的张量操作后，挨个调用 `dispose` 可能会很麻烦。因此，TensorFlow.js 提供了另一个函数 `tf.tidy`，它有点类似于 JavaScript 中的「作用域」，但是面向「GPU-backed tensors」。 `tf.tidy` 执行后就会清除所有的中间张量，并释放它们的GPU内存。但是它不会清除内部函数的返回值。

<div class="highlight">
  <pre><code class="language-js">&lt;span class="c1">// tf.tidy takes a function to tidy up after
&lt;/span>&lt;span class="k">const&lt;/span> &lt;span class="nx">average&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tidy&lt;/span>&lt;span class="p">(()&lt;/span> &lt;span class="p">=&gt;&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="c1">// tf.tidy 将会清除此函数内由张量使用的所有GPU内存
&lt;/span>  &lt;span class="c1">// 但是不会清除作为返回值的那个张量
&lt;/span>  &lt;span class="c1">//
&lt;/span>  &lt;span class="c1">// 即使在像下面这样这么短的操作中，
&lt;/span>  &lt;span class="c1">// TensorFlow.js 也会创建一些中间张量。 因此，
&lt;/span>  &lt;span class="c1">// 将您的数学运算放在一个 tf.tidy 中是一个很不错的选择！
&lt;/span>  &lt;span class="k">const&lt;/span> &lt;span class="nx">y&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">tensor1d&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mf">1.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">2.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">3.0&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="mf">4.0&lt;/span>&lt;span class="p">]);&lt;/span>
  &lt;span class="k">const&lt;/span> &lt;span class="nx">z&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">tf&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">ones&lt;/span>&lt;span class="p">([&lt;/span>&lt;span class="mi">4&lt;/span>&lt;span class="p">]);&lt;/span>

  &lt;span class="k">return&lt;/span> &lt;span class="nx">y&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">sub&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">z&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">square&lt;/span>&lt;span class="p">().&lt;/span>&lt;span class="nx">mean&lt;/span>&lt;span class="p">();&lt;/span>
&lt;span class="p">});&lt;/span>

&lt;span class="nx">average&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">print&lt;/span>&lt;span class="p">()&lt;/span> &lt;span class="c1">// 输出: 3.5
&lt;/span></code></pre>
</div>

合理使用 `tf.tidy` 将有助于缓解应用程序中的内存泄漏现象，也有助于控制内存何时回收。

## 两条重要提示

  * 传递给 `tf.tidy` 的函数应该是同步的，并且不应该返回 Promise。我们建议将更新 UI 或者网络请求等异步代码放在 `tf.tidy` 函数外。
  * `tf.tidy` 不会清理变量。变量通常存活于机器学习模型的整个生命周期中，因此TensorFlow.js 不会去清理它们，即使它们创建于 `tf.tidy` 之中。但是，您可以通过手动调用 `dispose` 去清除它们。