---
title: LSTM介绍
weight: 3
---
之前一直在做CNN的一些研究，最近刚刚回到实验室，定下来了自己的小组，然后开始了一些LSTM的学习。

将近学习了两天半吧，结构弄得差不多了，Theano上LSTM tutorial 的例程也跑了跑，正在读代码ing。

这篇博客主要是我之后要做的一个小报告的梗概，梳理了一下LSTM的特点和适用性问题。

发在这里权当做开博客压压惊。

希望之后能跟各位朋友多多交流，共同进步。

## 1. 概念：

**Long short-termmemory** (**LSTM**)is a <a class="outlink" title="Recurrent neural network" target="_blank" rel="nofollow noopener noreferrer">recurrent neuralnetwork</a> (RNN)architecture (an <a class="outlink" title="Artificial neural network" target="_blank" rel="nofollow noopener noreferrer">artificialneural network</a>)published<a class="outlink" target="_blank" rel="nofollow noopener noreferrer"><sup>[1]</sup></a> in 1997 by <a class="outlink" title="Sepp Hochreiter" target="_blank" rel="nofollow noopener noreferrer">Sepp Hochreiter</a> and <a class="outlink" title="Jürgen Schmidhuber" target="_blank" rel="nofollow noopener noreferrer">Jürgen Schmidhuber</a>. Like most RNNs, an LSTM network is universalin the sense that given enough network units it can compute anything aconventional computer can compute, provided it has the proper <a class="outlink" title="Weight" target="_blank" rel="nofollow noopener noreferrer">weight</a> <a class="outlink" title="Matrix (mathematics)" target="_blank" rel="nofollow noopener noreferrer">matrix</a>, which may be viewed as its program. Unliketraditional RNNs, an LSTM network is well-suited to learn from experience to <a class="outlink" title="Classification in machine learning" target="_blank" rel="nofollow noopener noreferrer">classify</a>, <a class="outlink" title="Computer data processing" target="_blank" rel="nofollow noopener noreferrer">process</a> and <a class="outlink" title="Predict" target="_blank" rel="nofollow noopener noreferrer">predict</a> <a class="outlink" title="Time series" target="_blank" rel="nofollow noopener noreferrer">time series</a> when there are very long time lags of unknownsize between important events. This is one of the main reasons why LSTMoutperforms alternative RNNs and <a class="outlink" title="Hidden Markov Models" target="_blank" rel="nofollow noopener noreferrer">Hidden Markov Models</a> and other sequence learning methods in numerousapplications.



## 2.类属

![](/images/posts/2022-12-31-17-17-51.png)

**LSTM是RNN的一种变种，属于反馈神经网络的范畴。**

****

## 3.模型的特点与适用性

## 3.1 前馈神经网络VS 反馈神经网络

在深度学习领域，传统的前馈神经网络（feed-forward neural net，简称FNN）具有出色的表现，取得了许多成功，它曾在许多不同的任务上——包括手写数字识别和目标分类上创造了记录。甚至到了今天，FNN在解决分类任务上始终都比其他方法要略胜一筹。

尽管如此，大多数专家还是会达成共识：FNN可以实现的功能仍然相当有限。究其原因，人类的大脑有着惊人的计算功能，而“分类”任务仅仅是其中很小的一个组成部分。[我们](https://www.w3cdoc.com)不仅能够识别个体案例，更能分析输入信息之间的整体逻辑序列。这些信息序列富含有大量的内容，信息彼此间有着复杂的时间关联性，并且信息长度各种各样。例如视觉、开车、演讲还有理解能力，这些都需要[我们](https://www.w3cdoc.com)同时处理高维度的多种输入信息，因为它们时时都在变化，而这是FNN在建模时就极为匮乏的。



## 3.2 CNN vs RNN

《Convolutional Networks for Images, Speech,and Time Series》，by YannLeCun & Yoshua Bengio

> [Convolutional Networks for Images](http://nuyoo.utm.mx/~jjf/rna/A12%20Convolutional%20networks%20for%20images,%20speech,%20and%20time%20series.pdf) 

尤其是这一段：  
While characters or short spoken words can besize-normalized and fed to a fixed-size network, more complex objects such aswritten or spoken words and sentences have inherently variable size. One way ofhandling such a composite object is to segment it heuristically into simplerobjects that can be recognized individually, e.g. characters phonemes. However,reliable segmentation heuristics do not exist for speech or cursivehandwriting. A bruteforce solution&#8230;..  
简单的说，CNN并不完全适用于学习时间序列，因此会需要各种辅助性处理，且效果也不一定好。面对对时间序列敏感的问题赫和任务，RNN(如LSTM)通常会比较合适。


一个例子：

Task 1 - Sentiment analysis: You&#8217;re given some review, and youwant to predict the rating of the review.  
Task 2 - Machine translation: Translate a sentence from some source language totarget language.

Now, the basic difference in terms of applicability of conv-net and RNN is thatconv-nets (like most other machine learning algorithm) take a fixed size inputand generate fixed-size outputs. RNN, on the other hand, can handle arbitraryinput/output lengths, but would typically require much more data compared toconv-nets because it is a more complex model.

Using this insight, we see that task 2 cannot be performed by conv-nets, sinceinputs and outputs are not fixed-length. So RNNs for task 2.

For task 1, however, you can use RNN if you have a lot of data. But you canalso use conv-nets - fix the length of the input, and adjust the input lengthby truncating or padding the actual input. Note that this will not affect thesentiment of the review much, so this is a reasonable approach. And since it&#8217;sa 1D convolution, that is typically used in sequences, it is called temporalconvolution. Conceptually, it is similar to 2D spatial convolution.

小结：

RNN回归型网络，用于序列数据，并且有了一定的记忆效应，辅之以lstm。  
CNN应该侧重空间映射，图像数据尤为贴合此场景。



## 3.3 LSTM vs (传统)RNNs

两篇文章的描述：

**1.     AlexGraves. 《SupervisedSequence Labelling with Recurrent Neural Networks》. Textbook, Studies inComputational Intelligence, Springer, 2012.**

“Long Short-term Memory (LSTM) is an RNN architecture designed to be better at storing and accessing informationthanstandard RNNs. LSTM has recently given state-of-the-art results in a variety ofsequenceprocessing tasks, including speech andhandwriting recognition .”


**2.    Yann LeCun、Yoshua Bengio和Geoffrey Hinton合作的这篇综述文章《**<a class="outlink" target="_blank" rel="nofollow noopener noreferrer">Deep Learning</a>**》**

“RNNs一旦展开（如图5），可以将之视为一个所有层共享同样权值的深度前馈神经网络。虽然它们的目的是学习长期的依赖性，但理论的和经验的证据表明很难学习并长期保存信息。

为了解决这个问题，一个增大网络存储的想法随之产生。采用了特殊隐式单元的LSTM（long short-termmemory networks）被首先提出，其自然行为便是长期的保存输入。一种称作记忆细胞的特殊单元类似累加器和门控神经元：它在下一个时间步长将拥有一个权值并联接到自身，拷贝自身状态的真实值和累积的外部信号，但这种自联接是由另一个单元学习并决定何时清除记忆内容的乘法门控制的。

LSTM网络随后被证明比传统的RNNs更加有效，尤其当每一个时间步长内有若干层时，整个语音识别系统能够完全一致的将声学转录为字符序列。目前LSTM网络或者相关的门控单元同样用于编码和解码网络，并且在机器翻译中表现良好。”


## 4.在不同任务上的数据对比

<div align="center">
<table class="table table-bordered" border="1" width="667" cellspacing="0" cellpadding="0">
<tr>
<td valign="bottom">

Task

</td>

<td valign="bottom">

classification

</td>

<td valign="bottom">

sentiment analysis

</td>

<td valign="bottom">

machine translation

</td>

<td valign="bottom">

dialog

</td>

<td valign="bottom">

language generation

</td>

<td valign="bottom">

QA

</td>

<td valign="bottom">

total

</td>
</tr>

<tr>
<td colspan="8" valign="bottom" width="667">
2006年以来，从Google Scholar上的检索数据进行对比
</td>
</tr>

<tr>
<td valign="bottom">

LSTM

</td>

<td valign="bottom">

1900

</td>

<td valign="bottom">

148

</td>

<td valign="bottom">

616

</td>

<td valign="bottom">

373

</td>

<td valign="bottom">

27

</td>

<td valign="bottom">

59

</td>

<td valign="bottom">

3690

</td>
</tr>

<tr>
<td valign="bottom">

CNN

</td>

<td valign="bottom">

5060

</td>

<td valign="bottom">

179

</td>

<td valign="bottom">

247

</td>

<td valign="bottom">

304

</td>

<td valign="bottom">

30

</td>

<td valign="bottom">

100

</td>

<td valign="bottom">

5670

</td>
</tr>

<tr>
<td colspan="8" valign="bottom" width="667">
从Web of Science数据库上的主题检索进行对比(全时间)
</td>
</tr>

<tr>
<td valign="bottom">

LSTM

</td>

<td valign="bottom">

56

</td>

<td valign="bottom">


</td>

<td valign="bottom">

1

</td>

<td valign="bottom">


</td>

<td valign="bottom">

6

</td>

<td valign="bottom">

2

</td>

<td valign="bottom">

248

</td>
</tr>

<tr>
<td valign="bottom">

CNN

</td>

<td valign="bottom">

373

</td>

<td valign="bottom">

2

</td>

<td valign="bottom">

13

</td>

<td valign="bottom">


</td>

<td valign="bottom">

25

</td>

<td valign="bottom">

2

</td>

<td valign="bottom">

1064

</td>
</tr>
</table>
</div>



数据尽管在检索上还有一些问题，尤其是 WOS数据库上涵盖的文章可能代表了一部分水平比较高的论文，在数量上并不完全按与研究的力度划等号，但还是可以看出一些端倪。

CNN大部分的任务都是跟分类相关的，在处理一些较为复杂的任务上的应用暂时还比较匮乏。而LSTM在近年来尤其发展迅猛，在处理序列相关的任务时的应用较为广泛。

## 5.结论

LSTM是RNN的一个优秀的变种模型，继承了大部分RNN模型的特性，同时解决了梯度反传过程由于逐步缩减而产生的Vanishing Gradient问题。具体到语言处理任务中，LSTM非常适合用于处理与时间序列高度相关的问题，例如机器翻译、对话生成、编码\解码等。

虽然在分类问题上，至今看来以CNN为代表的前馈网络依然有着性能的优势，但是LSTM在长远的更为复杂的任务上的潜力是CNN无法媲美的。它更真实地表征或模拟了人类行为、逻辑发展和神经组织的认知过程。尤其从2014年以来，LSTM已经成为RNN甚至深度学习框架中非常热点的研究模型，得到大量的关注和研究。

## 6.案例
- <a href="https://www.zhihu.com/question/34681168">CNN(卷积神经网络)、RNN(循环神经网络)、DNN(深度神经网络)</a>
- <a href="https://www.altumintelligence.com/articles/a/Time-Series-Prediction-Using-LSTM-Deep-Neural-Networks">案例剖析：利用LSTM深层神经网络进行时间序列预测</a>

