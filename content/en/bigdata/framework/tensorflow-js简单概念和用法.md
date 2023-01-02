---
title: TensorFlow.js简单概念和用法
weight: 10
---
## 简介

TensorFlow.js 是一个利用 WebGL 来进行加速的机器学习类库，它基于[浏览器](https://www.w3cdoc.com)，提供了高层次的 JavaScript API 接口。它将高性能机器学习构建块带到您的指尖，使您能够在[浏览器](https://www.w3cdoc.com)中训练神经网络或在推理模式下运行预先训练的模型。有关安装/配置 TensorFlow.js 的指南，请参阅 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/index.html%23getting-started" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">入门指南</a>。

* * *

## Tensors（张量）

TensorFlow.js 中数据的核心表现形式是 **<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/api/latest/index.html%23class%3ATensor" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">张量</a>** ：一组数值形成的一维或多维的数组。每个`Tensor`的实例都有 `shape` 属性来用于定义数组的维度形状——即数组有几个维度，每个维度有几个值。 其中 `tensor` 最主要的构造函数就是 `tf.tensor`：

```
// 2x3 张量
const shape = [2, 3]; // 2 行, 3 列
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // 输出张量的值
// 输出: [[1 , 2 , 3 ],
//       [10, 20, 30]]

// 张量的维度形状是可以被推测的:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
// 输出: [[1 , 2 , 3 ],
//       [10, 20, 30]]

```


但是，如果仅仅需要构造低维张量，[我们](https://www.w3cdoc.com)推荐使用以下函数而不是 `tf.tensor` 来增强代码的可读性：`tf.scalar`，`tf.tensor1d`，`tf.tensor2d`，`tf.tensor3d`和`tf.tensor4d`。

以下示例使用 `tf.tensor2d` 来创建与上面示例相同的张量：

```
const c = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
c.print();
// 输出: [[1 , 2 , 3 ],
//       [10, 20, 30]]

```


TensorFlow.js 还提供了一些带有初始化功能的张量构造函数，比如创建所有值均为 0 的 `tf.zeros` 或为 1 的 `tf.ones`：

```
// 所有值均为 0 的 3x5 张量
const zeros = tf.zeros([3, 5]);
// 输出: [[0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0]]

```


在 TensorFlow.js 中，张量是不可变的 (immutable)。它们一旦被创建，你就不能修改它们的值；但是你可以通过对它们执行操作来生成新的张量。

* * *

## Variables（变量）

<a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//js.tensorflow.org/api/latest/index.html%23class%3AVariable" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">Variables</a> 是由张量的值来初始化的。然而，与张量不同的是，它们的值是可变的。您可以使用 `assign` 方法为现有变量分配一个新的张量：

```
const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues); // 初始化 biases
biases.print(); // 输出: [0, 0, 0, 0, 0]

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // 更新 biases 的值
biases.print(); // 输出: [0, 1, 0, 1, 0]

```


变量主要用于在模型训练期间存储和更新值。

* * *

## Operations (操作)

当你使用张量来存储数据时，你可以使用操作（ops）来进行数据运算。 TensorFlow.js 提供了多种用于线性代数和机器学习的 ops ，任君采劼。因为张量是不可变的，所以这些运算并不会修改它们的值；相反，ops 会返回新的张量。

可用的操作很多，包括一元操作，如 `square`：

```
const d = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const d_squared = d.square();
d_squared.print();
// 输出: [[1, 4 ],
//       [9, 16]]

```


还有二元操作，如 `add` ，`sub` 和 `mul`：

```
const e = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const f = tf.tensor2d([[5.0, 6.0], [7.0, 8.0]]);

const e_plus_f = e.add(f);
e_plus_f.print();
// 输出: [[6 , 8 ],
//       [10, 12]]

```


TensorFlow.js 的 API 是支持链式调用的，所以你可以在 ops 的结果上继续调用 ops：

```
const sq_sum = e.add(f).square();
sq_sum.print();
// 输出: [[36 , 64 ],
//       [100, 144]]

// 所有的操作符在主命名空间中都是公开的,
// 所以你可以像&#x1f447;这么做:
const sq_sum = tf.square(tf.add(e, f));

```


* * *

## Models and Layers（模型与层）

从概念上讲，模型是一个给定一些输入会产生一些期望输出的函数。 在 TensorFlow.js 中有两种创建模型的方法。您可以直接使用 ops 来代表模型所做的工作。例如：

```
// 定义常量: y = 2x^2 + 4x + 8
const a = tf.scalar(2);
const b = tf.scalar(4);
const c = tf.scalar(8);

// 定义函数
function predict(input) {
  // y = a *x ^ 2 + b* x + c
  // 下一节中会有更多关于 tf.tidy 的内容
  return tf.tidy(() => {
    const x = tf.scalar(input);

    const ax2 = a.mul(x.square());
    const bx = b.mul(x);
    const y = ax2.add(bx).add(c);

    return y;
  });
}

// 预测当输入值为2时的输出
const result = predict(2);
result.print() // 输出: 24

```


您还可以使用更高抽象的 API `tf.model` 来构建多层的模型，这是深度学习中的相当流行的一种抽象。下面代码构建了一个 `tf.sequential` 模型：

```
const model = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    units: 20,
    recurrentInitializer: 'GlorotNormal',
    inputShape: [80, 4]
  })
);

const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({optimizer, loss: 'categoricalCrossentropy'});
model.fit({x: data, y: labels)});

```


TensorFlow.js 中有多种不同类型的层，例如 `tf.layers.simpleRNN`，`tf.layers.gru` 和 `tf.layers.lstm`等。

* * *

## 内存管理: dispose 与 tf.tidy

由于 TensorFlow.js 使用 GPU 来加速数学运算，因此在处理张量和变量时需要管理 GPU 内存。

TensorFlow.js 提供了两个有助于解决这个问题的函数：`dispose` 和 `tf.tidy`。

## dispose

你可以在张量或变量上调用`dispose`来清空已占用的 GPU 内存：

```
const x = tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]);
const x_squared = x.square();

x.dispose();
x_squared.dispose();

```


## tf.tidy

在进行了大量的张量操作后，挨个调用 `dispose` 可能会很麻烦。因此，TensorFlow.js 提供了另一个函数 `tf.tidy`，它有点类似于 JavaScript 中的「作用域」，但是面向「GPU-backed tensors」。 `tf.tidy` 执行后就会清除所有的中间张量，并释放它们的GPU内存。但是它不会清除内部函数的返回值。

```
// tf.tidy takes a function to tidy up after
const average = tf.tidy(() => {
  // tf.tidy 将会清除此函数内由张量使用的所有GPU内存
  // 但是不会清除作为返回值的那个张量
  //
  // 即使在像下面这样这么短的操作中，
  // TensorFlow.js 也会创建一些中间张量。 因此，
  // 将您的数学运算放在一个 tf.tidy 中是一个很不错的选择！
  const y = tf.tensor1d([1.0, 2.0, 3.0, 4.0]);
  const z = tf.ones([4]);

  return y.sub(z).square().mean();
});

average.print() // 输出: 3.5

```


合理使用 `tf.tidy` 将有助于缓解应用程序中的内存泄漏现象，也有助于控制内存何时回收。

## 两条重要提示

* 传递给 `tf.tidy` 的函数应该是同步的，并且不应该返回 Promise。[我们](https://www.w3cdoc.com)建议将更新 UI 或者网络请求等异步代码放在 `tf.tidy` 函数外。
* `tf.tidy` 不会清理变量。变量通常存活于机器学习模型的整个生命周期中，因此TensorFlow.js 不会去清理它们，即使它们创建于 `tf.tidy` 之中。但是，您可以通过手动调用 `dispose` 去清除它们。
