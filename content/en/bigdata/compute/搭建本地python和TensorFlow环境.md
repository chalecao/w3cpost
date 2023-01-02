---
title: 搭建本地python和TensorFlow环境
weight: 6

---

人工智能的时代已经来了，再不学就晚了。说起来有点惭愧，我研究生主修方向是模式识别与人工智能，【捂脸哭】！

好汉不怕远征难，万水千山只等闲。

# 搭建环境

## 安装python

如果是MAC系统，那么默认安装了python 2.7.10，你就不要动了。如果是windows，下个python安装包，装一下。

PS：MAC系统自带的python 2.7.10是够用的，不能删除，可以自己装其他版本。不过暂时用不到。

## 安装pip

[pip官网][1]下一个最新的pip，

```
$ tar zxvf pip-7.1.2.tar.gz
$ cd pip-7.1.2
$ sudo python setup.py install
# 验证是否安装成功
$ pip freeze

```

PS: 安装需要root权限，所以需要sudo

### pip提速

```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple xxxx
```

## 安装virtualenv

virtualenv是python的沙箱工具.[我们](https://www.w3cdoc.com)毕竟是在自己机器上做实验,为了不来回修改各种环境变量,[我们](https://www.w3cdoc.com)一般还是弄个沙箱完比较好.测试完直接删除就行,不用再去改各种配置文件.

```
$pip install --upgrade virtualenv
# 安装好后创建一个工作目录,我直接在home里创建了个文件夹.
$virtualenv --system-site-packages ~/tensorflow

# 进入目录激活沙箱.
$ cd ~/tensorflow
$ source bin/activate
(tensorflow) $

```

一般情况是，[我们](https://www.w3cdoc.com)希望创建一个独立的Python运行环境，命名为`venv`：

```
Mac:myproject michael$ virtualenv --no-site-packages venv
Using base prefix '/usr/local/.../Python.framework/Versions/3.4'
New python executable in venv/bin/python3.4
Also creating executable in venv/bin/python
Installing setuptools, pip, wheel...done.

```

命令`virtualenv`就可以创建一个独立的Python运行环境，[我们](https://www.w3cdoc.com)还加上了参数`--no-site-packages`，这样，已经安装到系统Python环境中的所有第三方包都不会复制过来，这样，[我们](https://www.w3cdoc.com)就得到了一个不带任何第三方包的“干净”的Python运行环境。像我的mac电脑默认python是python 2.7 ，我想创建一个独立的3.7的环境，可以指定python版本

```
tensorflow virtualenv --no-site-packages --python=/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7 p3env
Already using interpreter /Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7
Using base prefix '/Library/Frameworks/Python.framework/Versions/3.7'
New python executable in /Users/chalecao/tensorflow/p3env/bin/python3.7
Also creating executable in /Users/chalecao/tensorflow/p3env/bin/python
Installing setuptools, pip, wheel...
done.
➜  tensorflow source p3env/bin/activate
(p3env) ➜  tensorflow python
```

新建的Python环境被放到当前目录下的`venv`目录。有了`venv`这个Python环境，可以用`source`进入该环境：

```
Mac:myproject michael$ source venv/bin/activate
(venv)Mac:myproject michael$

```

注意到命令提示符变了，有个`(venv)`前缀，表示当前环境是一个名为`venv`的Python环境。

下面正常安装各种第三方包，并运行`python`命令：

```
(venv)Mac:myproject michael$ pip install jinja2
...
Successfully installed jinja2-2.7.3 markupsafe-0.23
(venv)Mac:myproject michael$ python myapp.py
...

```

在`venv`环境下，用`pip`安装的包都被安装到`venv`这个环境下，系统Python环境不受任何影响。也就是说，`venv`环境是专门针对`myproject`这个应用创建的。

退出当前的`venv`环境，使用`deactivate`命令：

```
(venv)Mac:myproject michael$ deactivate
Mac:myproject michael$ 

```

此时就回到了正常的环境，现在`pip`或`python`均是在系统Python环境下执行。

完全可以针对每个应用创建独立的Python运行环境，这样就可以对每个应用的Python环境进行隔离。

virtualenv是如何创建“独立”的Python运行环境的呢？原理很简单，就是把系统Python复制一份到virtualenv的环境，用命令`source venv/bin/activate`进入一个virtualenv环境时，virtualenv会修改相关环境变量，让命令`python`和`pip`均指向当前的virtualenv环境。

## 安装TensorFlow

```
$ pip install tensorflow  //cpu 版本
$ pip install tensorflow-gpu   // gpu 版本

```

PS: 上面两个版本一个是CPU计算的版本，一个是GPU计算的版本，安装一个就行了，cpu的版本兼容性好。如果报错了，就装CPU版本。安装时候用这个命令：

```
pip install --ignore-installed --upgrade tensorflow

```

CPU版本在跑程序可能有警告提示：

```
Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA

```

没关系的。想解决，参考[这里][2]

## 安装jupyter

```
pip install jupyter

```

如果提示没有权限，就加上-user，会安装软件到用户目录，而不是系统目录。安装安置后需要把path路径配置下：

```
$ pip install --user jupyter


```

然后自己找下位置，对于mac应该在用户目录下Library下python里。编辑 .bash_profile

```
$ vi .bash_profile
// 添加路径到path
....
PATH=$PATH:/Users/chalecao/Library/Python/2.7/bin
....
```

然后就可以开启jupyter

```
jupyter notebook
```

然后[浏览器](https://www.w3cdoc.com)会打开网页，选择新建->python2, 即可：

![](/images/posts/2022-12-31-17-41-04.png)

然后输入你的代码点运行就好了。

![](/images/posts/2022-12-31-17-41-12.png)

## 一些问题

##### 问题1：

Could not decode '\xe6\x9c\xaa\xe5\x91\xbd\xe5\x90\x8d' for unicode trait 'untitled_notebook' of a LargeFileManager instance.

解决办法：

```
LANG=zn jupyter notebook
```

##### 问题2：

```
matplotlib cannot import name _thread on mac
```

这个是安装包six的问题

```
sudo pip install --upgrade --ignore-installed six
```

##### 问题3：

```
UnicodeDecodeError: 'ascii' codec can't decode byte 0xe5 in position 21: ordinal not in range(128)
```

matplotlib画图只接受utf-8编码，如果没有设置就会在画图时报错，解决办法是修改jupyter-notebook 文件：

```
vi /Users/chalecao/Library/Python/2.7/bin/jupyter-notebook
# ----- 添加下面代码 ----
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
```

##### 问题4：

找不到`virtualenv？`

可以执行：

```
pip show virtualenv
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

```

然后执行下面：

```
sudo /usr/bin/easy_install virtualenv
```

##### 问题5：

AttributeError: &#8216;module&#8217; object has no attribute &#8216;to_rgba&#8217;

```
sudo pip install matplotlib==2.2.0
```



# 学习资源

  1. <a href="https://www.tensorflow.org/tutorials/" rel="nofollow">TensorFlow tutorials</a>
  2. <a href="https://learningtensorflow.com/" rel="nofollow">Learning TensorFlow</a>
  3. [TF Learn][3] (previously SkFlow)
  4. [tensorflow_examples][4]
  5. https://blog.csdn.net/gubenpeiyuan/article/details/79252402
  6. https://github.com/jupyterlab/jupyterlab/issues/5345
  7. https://blog.csdn.net/master_ning/article/details/80300731

 [1]: https://pypi.org/pypi/pip/#downloads
 [2]: https://blog.csdn.net/hq86937375/article/details/79696023
 [3]: https://github.com/tensorflow/tensorflow/tree/master/tensorflow/contrib/learn/python/learn
 [4]: https://github.com/mokpro/tensorflow_examples
