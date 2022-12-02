---
title: 搭建本地python和TensorFlow环境
weight: 6

---
<img loading="lazy" class="alignnone wp-image-2727 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf4b44ddeb2c.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf4b44ddeb2c.png?x-oss-process=image/format,webp" alt="" width="477" height="318" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf4b44ddeb2c.png?x-oss-process=image/format,webp 621w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bf4b44ddeb2c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_200/format,webp 300w" sizes="(max-width: 477px) 100vw, 477px" />

人工智能的时代已经来了，再不学就晚了。说起来有点惭愧，我研究生主修方向是模式识别与人工智能，【捂脸哭】！

好汉不怕远征难，万水千山只等闲。

# 搭建环境

## 安装python

如果是MAC系统，那么默认安装了python 2.7.10，你就不要动了。如果是windows，下个python安装包，装一下。

PS：MAC系统自带的python 2.7.10是够用的，不能删除，可以自己装其他版本。不过暂时用不到。

## 安装pip

[pip官网][1]下一个最新的pip，

<pre class="pure-highlightjs"><code class="shell">$ tar zxvf pip-7.1.2.tar.gz
$ cd pip-7.1.2
$ sudo python setup.py install
# 验证是否安装成功
$ pip freeze
</code></pre>

PS: 安装需要root权限，所以需要sudo

### pip提速

<pre class="EnlighterJSRAW" data-enlighter-language="null">pip install -i https://pypi.tuna.tsinghua.edu.cn/simple xxxx</pre>

&nbsp;

## 安装virtualenv

virtualenv是python的沙箱工具.[我们](https://www.w3cdoc.com)毕竟是在自己机器上做实验,为了不来回修改各种环境变量,[我们](https://www.w3cdoc.com)一般还是弄个沙箱完比较好.测试完直接删除就行,不用再去改各种配置文件.

<pre class="pure-highlightjs"><code class="null">$pip install --upgrade virtualenv
# 安装好后创建一个工作目录,我直接在home里创建了个文件夹.
$virtualenv --system-site-packages ~/tensorflow

# 进入目录激活沙箱.
$ cd ~/tensorflow
$ source bin/activate
(tensorflow) $
</code></pre>

一般情况是，[我们](https://www.w3cdoc.com)希望创建一个独立的Python运行环境，命名为`venv`：

<pre><code class="ruby">&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>virtualenv --no-site-packages venv
&lt;span class="constant">Using&lt;/span> base prefix &lt;span class="string">'/usr/local/.../Python.framework/Versions/3.4'&lt;/span>
&lt;span class="constant">New&lt;/span> python executable &lt;span class="keyword">in&lt;/span> venv/bin/python3.&lt;span class="number">4&lt;/span>
&lt;span class="constant">Also&lt;/span> creating executable &lt;span class="keyword">in&lt;/span> venv/bin/python
&lt;span class="constant">Installing&lt;/span> setuptools, pip, wheel...done.
</code></pre>

命令`virtualenv`就可以创建一个独立的Python运行环境，[我们](https://www.w3cdoc.com)还加上了参数`--no-site-packages`，这样，已经安装到系统Python环境中的所有第三方包都不会复制过来，这样，[我们](https://www.w3cdoc.com)就得到了一个不带任何第三方包的“干净”的Python运行环境。像我的mac电脑默认python是python 2.7 ，我想创建一个独立的3.7的环境，可以指定python版本

<pre class="EnlighterJSRAW" data-enlighter-language="null">tensorflow virtualenv --no-site-packages --python=/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7 p3env
Already using interpreter /Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7
Using base prefix '/Library/Frameworks/Python.framework/Versions/3.7'
New python executable in /Users/chalecao/tensorflow/p3env/bin/python3.7
Also creating executable in /Users/chalecao/tensorflow/p3env/bin/python
Installing setuptools, pip, wheel...
done.
➜  tensorflow source p3env/bin/activate
(p3env) ➜  tensorflow python</pre>

新建的Python环境被放到当前目录下的`venv`目录。有了`venv`这个Python环境，可以用`source`进入该环境：

<pre><code class="ruby">&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>source venv/bin/activate
(venv)&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$
&lt;/span></code></pre>

注意到命令提示符变了，有个`(venv)`前缀，表示当前环境是一个名为`venv`的Python环境。

下面正常安装各种第三方包，并运行`python`命令：

<pre><code class="ruby">(venv)&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>pip install jinja2
...
&lt;span class="constant">Successfully&lt;/span> installed jinja2-&lt;span class="number">2.7&lt;/span>.&lt;span class="number">3&lt;/span> markupsafe-&lt;span class="number">0&lt;/span>.&lt;span class="number">23&lt;/span>
(venv)&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>python myapp.py
...
</code></pre>

在`venv`环境下，用`pip`安装的包都被安装到`venv`这个环境下，系统Python环境不受任何影响。也就是说，`venv`环境是专门针对`myproject`这个应用创建的。

退出当前的`venv`环境，使用`deactivate`命令：

<pre><code class="ruby">(venv)&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>deactivate
&lt;span class="constant">Mac&lt;/span>&lt;span class="symbol">:myproject&lt;/span> michael&lt;span class="variable">$ &lt;/span>
</code></pre>

此时就回到了正常的环境，现在`pip`或`python`均是在系统Python环境下执行。

完全可以针对每个应用创建独立的Python运行环境，这样就可以对每个应用的Python环境进行隔离。

virtualenv是如何创建“独立”的Python运行环境的呢？原理很简单，就是把系统Python复制一份到virtualenv的环境，用命令`source venv/bin/activate`进入一个virtualenv环境时，virtualenv会修改相关环境变量，让命令`python`和`pip`均指向当前的virtualenv环境。

## 安装TensorFlow

<pre class="pure-highlightjs"><code class="shell">$ pip install tensorflow  //cpu 版本
$ pip install tensorflow-gpu   // gpu 版本
</code></pre>

PS: 上面两个版本一个是CPU计算的版本，一个是GPU计算的版本，安装一个就行了，cpu的版本兼容性好。如果报错了，就装CPU版本。安装时候用这个命令：

<pre class="pure-highlightjs"><code class="shell">pip install --ignore-installed --upgrade tensorflow
</code></pre>

CPU版本在跑程序可能有警告提示：

<pre class="pure-highlightjs"><code class="null">Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
</code></pre>

没关系的。想解决，参考[这里][2]

## 安装jupyter

<pre class="EnlighterJSRAW" data-enlighter-language="null">pip install jupyter
</pre>

如果提示没有权限，就加上&#8211;user，会安装软件到用户目录，而不是系统目录。安装安置后需要把path路径配置下：

<pre class="EnlighterJSRAW" data-enlighter-language="null">$ pip install --user jupyter

</pre>

然后自己找下位置，对于mac应该在用户目录下Library下python里。编辑 .bash_profile

<pre class="EnlighterJSRAW" data-enlighter-language="null">$ vi .bash_profile
// 添加路径到path
....
PATH=$PATH:/Users/chalecao/Library/Python/2.7/bin
....</pre>

然后就可以开启jupyter

<pre class="EnlighterJSRAW" data-enlighter-language="null">jupyter notebook</pre>

然后[浏览器](https://www.w3cdoc.com)会打开网页，选择新建->python2, 即可：


  <img loading="lazy" class="alignnone wp-image-3221 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png?x-oss-process=image/format,webp" alt="" width="431" height="385" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png?x-oss-process=image/format,webp 962w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_268/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_687/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf26192f1.png?x-oss-process=image/quality,q_50/resize,m_fill,w_671,h_600/format,webp 671w" sizes="(max-width: 431px) 100vw, 431px" />

然后输入你的代码点运行就好了。


  <img loading="lazy" class="alignnone wp-image-3222 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png?x-oss-process=image/format,webp" alt="" width="627" height="406" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png?x-oss-process=image/format,webp 2432w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_194/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_497/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c09cf7ce0658.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_518/format,webp 800w" sizes="(max-width: 627px) 100vw, 627px" />

## 一些问题

##### 问题1：

    Could not decode '\xe6\x9c\xaa\xe5\x91\xbd\xe5\x90\x8d' for unicode trait 'untitled_notebook' of a LargeFileManager instance.

解决办法：

<pre class="EnlighterJSRAW" data-enlighter-language="null">LANG=zn jupyter notebook</pre>

##### 问题2：

<pre class="EnlighterJSRAW" data-enlighter-language="null">matplotlib cannot import name _thread on mac</pre>

这个是安装包six的问题

<pre class="EnlighterJSRAW" data-enlighter-language="null">sudo pip install --upgrade --ignore-installed six</pre>

##### 问题3：

<pre class="EnlighterJSRAW" data-enlighter-language="null">UnicodeDecodeError: 'ascii' codec can't decode byte 0xe5 in position 21: ordinal not in range(128)</pre>

matplotlib画图只接受utf-8编码，如果没有设置就会在画图时报错，解决办法是修改jupyter-notebook 文件：

<pre class="EnlighterJSRAW" data-enlighter-language="null">vi /Users/chalecao/Library/Python/2.7/bin/jupyter-notebook
# ----- 添加下面代码 ----
import sys
reload(sys)
sys.setdefaultencoding("utf-8")</pre>

##### 问题4：

找不到`<span class="pln">virtualenv？</span>`

可以执行：

<pre class="EnlighterJSRAW" data-enlighter-language="null">pip show virtualenv
DEPRECATION: Python 2.7 reached the end of its life on January 1st, 2020. Please upgrade your Python as Python 2.7 is no longer maintained. A future version of pip will drop support for Python 2.7. More details about Python 2 support in pip, can be found at https://pip.pypa.io/en/latest/development/release-process/#python-2-support
Name: virtualenv
Version: 20.0.11
Summary: Virtual Python Environment builder
Home-page: https://virtualenv.pypa.io/
Author: Bernat Gabor
Author-email: gaborjbernat@gmail.com
License: MIT
Location: /Users/chalecao/Library/Python/2.7/lib/python/site-packages
Requires: importlib-resources, distlib, filelock, pathlib2, appdirs, six, contextlib2, importlib-metadata
Required-by:
</pre>

然后执行下面：

<pre class="lang-py prettyprint prettyprinted"><code>&lt;span class="pln">sudo &lt;/span>&lt;span class="pun">/&lt;/span>&lt;span class="pln">usr&lt;/span>&lt;span class="pun">/&lt;/span>&lt;span class="pln">bin&lt;/span>&lt;span class="pun">/&lt;/span>&lt;span class="pln">easy_install virtualenv&lt;/span></code></pre>

##### 问题5：

AttributeError: &#8216;module&#8217; object has no attribute &#8216;to_rgba&#8217;

<pre class="EnlighterJSRAW" data-enlighter-language="null">sudo pip install matplotlib==2.2.0</pre>

&nbsp;

# 学习资源

  1. <a href="https://www.tensorflow.org/tutorials/" rel="nofollow">TensorFlow tutorials</a>
  2. <a href="https://learningtensorflow.com/" rel="nofollow">Learning TensorFlow</a>
  3. [TF Learn][3] (previously SkFlow)
  4. [tensorflow_examples][4]
  5. https://blog.csdn.net/gubenpeiyuan/article/details/79252402
  6. https://github.com/jupyterlab/jupyterlab/issues/5345
  7. https://blog.csdn.net/master_ning/article/details/80300731

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

 [1]: https://pypi.org/pypi/pip/#downloads
 [2]: https://blog.csdn.net/hq86937375/article/details/79696023
 [3]: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/learn/python/learn
 [4]: https://github.com/mokpro/tensorflow_examples
