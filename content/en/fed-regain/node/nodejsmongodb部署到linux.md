---
title: NodeJS+mongoDB部署到Linux


---
  


### [][1]部署需求

这几天把之前做的关于FIDO认证系统的DEMO程序部署到服务器上，想到去年买了一台Aliyun的服务器，应该还没有到期，所以就试着部署到服务器上。我的阿里云是RedHat 4.1.2的系统，使用起来还是很方便的。  
<a></a>  
![NodeJS+mongoDB部署到Linux][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_2/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/07/29/2014_nodejs_2/</a>

### [][3]linux安装nodejs和mongoDB

#### [][4]安装nodejs

很久之前安装过windows下以及Mac下的node，感觉还是很方便的，不成想今天安装linux下的坑了老半天，特此记录。首先去官网下载代码，这里一定要注意安装分两种，一种是Source Code源码，一种是编译后的文件（Binaries）。如下图所示，带Binaries的是编译好的文件。  
![NodeJS+mongoDB部署到Linux][5]  
（一） 编译好的文件  
简单说就是解压后，在bin文件夹中已经存在node以及npm，如果你进入到对应文件的中执行命令行一点问题都没有，不过不是全局的，所以将这个设置为全局就好了。

这就妥妥的了，node文件夹具体放在哪，叫什么名字随你怎么定。然后设置全局：

这里/home/kun/mysofltware/这个路径是你自己放的，你将node文件解压到哪里就是哪里。  
（二）通过源码编译  
这种方式你下载的文件是Source code，我不太喜欢这种方式。。。主要是麻烦

查看当前安装的Node的版本

（三）apt-get  
还有一种就是shell提示的apt-get方式，我之前就被这种方式坑了。。。强烈不推荐啊

#### [][6]安装mongoDB

1）配置官方YUM源

64位机器源配置文件如下

其中，官方源中包括以下软件包  

# mongo-10gen 这个包包含了最新最稳定的mongodb工具  

# mongo-server-10gen 这个包包含了最新最稳定版本的mongod和mongos守护进程及相关的配置和初始化脚本  

# mongo18-10gen 这个包包含了之前发行版中的mongodb工具  

# mongo18-server-10gen 这个包包含了前一个稳定版的mongod和mongos守护进程及相关的配置和初始化脚本  

2）系统更新

3）安装mongodb

看到提示说明安装成功

4）配置mongodb  
配置文件为：/etc/mongod.conf  
初始化脚本为：/etc/rc.d/init.d/mongod  
数据存储路径：/var/lib/mongo/  
日志文件存储路径：/var/log/mongo/  
守护进程运行用户为：mongod  
以上均为默认值  
5)Mongodb控制  
加入开机启动

启动mongodb

停止mongodb

重启mongodb

### [][7]nodejs后台运行

我们在linux中启动nodejs开发的程序后，希望web服务可以在后台运行，不会因为用户退出而停止服务。  
有两种方式：

  1. command & ： 后台运行，你关掉终端会停止运行
  2. nohup command & ： 后台运行，你关掉终端也会继续运行

#### [][8]相关命令及知识

Linux/Unix 区别于微软平台最大的优点就是真正的多用户，多任务。因此在任务管理上也有别具特色的管理思想。  
我们知道，在 Windows 上面，我们要么让一个程序作为服务在后台一直运行，要么停止这个服务。而不能让程序在前台后台之间切换。而 Linux 提供了 fg 和bg 命令，让你轻松调度正在运行的任务。假设你发现前台运行的一个程序需要很长的时间，但是需要干其他的事情，你就可以用 Ctrl-Z ，挂起这个程序，然后可以看到系统提示：  
[1]+ Stopped /root/bin/rsync.sh  
然后我们可以把程序调度到后台执行：（bg 后面的数字为作业号）  

# bg 1  

[1]+ /root/bin/rsync.sh &  
用 jobs 命令查看正在运行的任务：  

# jobs  

[1]+ Running /root/bin/rsync.sh &  
如果想把它调回到前台运行，可以用  

# fg 1  

/root/bin/rsync.sh  
这样，你在控制台上就只能等待这个任务完成了。

#### [][9]方法一

在Linux中，当在前台运行某个作业时，终端被该作业占据；而在后台运行作业时，它不会占据终端。可以使用&命令把作业放到后台执行。实际上，这样是将命令放入到一个作业队列中了：

在后台运行作业时要当心：需要用户交互的命令不要放在后台执行，因为这样你的机器就会在那里傻等。不过，作业在后台运行一样会将结果输出到屏幕上，干扰你的工作。如果放在后台运行的作业会产生大量的输出，最好使用下面的方法把它的输出重定向到某个文件中：

在上面的例子中，2>&1表示所有的标准输出和错误输出都将被重定向到一个叫做out.file 的文件中。 当你成功地提交进程以后，就会显示出一个进程号，可以用它来监控该进程，或杀死它。  
例：查找名为“httpd.conf”的文件，并把所有标准输出和错误输出重定向到find.dt的文件中：

成功提交该命令之后，系统给出了它的进程号7832。 对于已经在前台执行的命令，也可以重新放到后台执行，首先按ctrl+z暂停已经运行的进程，然后使用bg命令将停止的作业放到后台运行，例如对正在前台执行的tesh.sh使用ctrl+z挂起它：

但是如上方到后台执行的进程，其父进程还是当前终端shell的进程，而一旦父进程退出，则会发送hangup信号给所有子进程，子进程收到hangup以后也会退出。如果我们要在退出shell的时候继续运行进程，则需要使用nohup忽略hangup信号，或者setsid将将父进程设为init进程(进程号为1)

上面的试验演示了使用nohup/setsid加上&使进程在后台运行，同时不受当前shell退出的影响。那么对于已经在后台运行的进程，该怎么办呢？可以使用disown命令：

另外还有一种方法，即使将进程在一个subshell中执行，其实这和setsid异曲同工。方法很简单，将命令用括号() 括起来即可：

注：本文试验环境为Red Hat Enterprise Linux AS release 4 (Nahant Update 5),shell为/bin/bash，不同的OS和shell可能命令有些不一样。例如AIX的ksh，没有disown，但是可以使用nohup -p PID来获得disown同样的效果。

还有一种更加强大的方式是使用screen，首先创建一个断开模式的虚拟终端，然后用-r选项重新连接这个虚拟终端，在其中执行的任何命令，都能达到nohup的效果，这在有多个命令需要在后台连续执行的时候比较方便：

#### [][10]nohup方法

如果你正在运行一个进程，而且你觉得在退出帐户时该进程还不会结束，那么可以使用nohup命令。该命令可以在你退出帐户之后继续运行相应的进程。nohup就是不挂起的意思( no hang up)。 该命令的一般形式为：

如果使用nohup命令提交作业，那么在缺省情况下该作业的所有输出都被重定向到一个名为nohup.out的文件中，除非另外指定了输出文件：

在上面的例子中，输出被重定向到myout.file文件中。

#### [][11]常用的表达式

下面就是这些特殊字符：

当s h e l l遇到上述字符时，就会把它们当作特殊字符，而不是文件名中的普通字符，这样用户就可以用它们来匹配相应的文件名。

#### [][12]其他相关命令

jobs：查看当前有多少在后台运行的命令  
fg：将后台中的命令调至前台继续运行。如果后台中有多个命令，可以用 fg %jobnumber将选中的命令调出，%jobnumber是通过jobs命令查到的后台正在执行的命令的序号(不是pid)  
bg：将一个在后台暂停的命令，变成继续执行。如果后台中有多个命令，可以用bg %jobnumber将选中的命令调出，%jobnumber是通过jobs命令查到的后台正在执行的命令的序号(不是pid)  
杀死已经启动的程序和普通方式一样：

### [][13]谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#部署需求 "部署需求"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/aliyun.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#linux安装nodejs和mongoDB "linux安装nodejs和mongoDB"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#安装nodejs "安装nodejs"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/aliyun2.png
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#安装mongoDB "安装mongoDB"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#nodejs后台运行 "nodejs后台运行"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#相关命令及知识 "相关命令及知识"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#方法一 "方法一"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#nohup方法 "nohup方法"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#常用的表达式 "常用的表达式"
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#其他相关命令 "其他相关命令"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/25/2014_nodejs_3/#谢谢！ "谢谢！"
