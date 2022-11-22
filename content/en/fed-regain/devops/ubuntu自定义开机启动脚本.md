---
title: ubuntu自定义开机启动脚本


date: 2017-08-28T01:12:26+00:00
excerpt: 喜爱ubuntu，可是众多不方便，怎么办？第一弹，我们先学学自己定制开机启动程序。实现方法是定制开机启动脚本，将脚本加入开机启动即可。需要学习的基础知识：如何写脚本，语法是什么，update-rc.d命令的使用。
url: /aistack/926.html
views:
  - 2284
  - 2284


---
  


### [][1]喜爱的ubuntu

喜爱ubuntu，可是众多不方便，怎么办？第一弹，我们先学学自己定制开机启动程序。实现方法是定制开机启动脚本，将脚本加入开机启动即可。需要学习的基础知识：如何写脚本，语法是什么，update-rc.d命令的使用。  
<a></a>  
![ubuntu自定义开机启动脚本][2] 

### [][3]bash脚本





其中，#!是一个特殊的表示符，其后，跟着解释此脚本的shell路径。  
bash只是shell的一种，还有很多其它shell，如：sh,csh,ksh,tcsh,…  
我们可以通过以下一个示例来进行实验，了解#!/bin/bash的使用。

#### [][4]注意点1





这里有三个脚本（脚本都要使用”chmod +x scriptname“命令来获得可执行权限）：





三个脚本执行的结果：





如果将tbash1.sh改成：





那么，执行结果是：





也就是说，脚本忽略了第二行“#!/bin/sh”，直接使用当前所在的shell（也就是bash）来解释脚本。

当把tbash1.sh改成：





执行结果为：





#### [][5]注意点2





假如，我们把tbash1.sh中第一行的#!后面加了一个不存在的路径”/home/sh“：





执行结果为：





#### [][6]注意点3

如果一个脚本在第一行没有加上#!+shell路径这一行，那么，脚本会默认当前用户登录的shell，为脚本解释器。  
在1）中，脚本tbash3.sh的执行结果，就是用当前自己登录的shell（bash）解释后的结果。我们通常所用的shell都是bash，如果哪天登录到sh，再使用以上类型的脚本，就会有问题。以下是自己登录到sh下，执行tbash3.sh的结果：





### [][7]注意点4





执行结果：





我们还可以以tbash3.sh为示例。  
用以下命令来执行该脚本：





“bash tbash3.sh”表示使用bash来作为脚本解释器来执行tbash3.sh。同样，也可以使用如”sh 脚本名“这样的命令，来用sh作为脚本解释器。  
从结果可以看出，/bin/bash –posix与/bin/sh的执行结果相同。总结起来，sh跟bash的区别，实际上是bash有没开启posix模式的区别。遵守posix规范，可能包括，”当某行代码出错时，不继续往下执行。“

最后加上一点说明，每个脚本开头都使用”#!”，#!实际上是一个2字节魔法数字，这是指定一个文件类型的特殊标记，在这种情况下，指的就是一个可执行的脚本。在#!之后，接一个路径名，这个路径名指定了一个解释脚本命令的程序，这个程序可以是shell，程序语言或者任意一个通用程序。

### [][8]update-rc.d

在Linux系统下，一个Services的启动、停止以及重启通常是通过/etc/init.d目录下的脚本来控制的。然而，在启动或改变运行级别时，是在/etc/rcX.d中来搜索脚本。其中X是运行级别的number。本文将解释如何启动、关闭和修改服务的运行。当你在Debian下安装一个新的服务，比如Apache2，安装完成后，默认情况下它会启动，并在下一次重启后自动启动。但是如果你不是一直需要这个服务，只在需要的时候启用它，你可以禁用它。直到你需要使用的时候，执行如下指令：





要实现这个目的，你需要先在/etc/rcX.d目录中删除所有apache2的符号链接，但这个方法操作麻烦，且效率低下。因此，我们建议你使用update-rc.d命令来实现这个功能。

#### [][9]删除一个服务

如果你想手动的完全禁用Apache2服务，你需要删除其中的所有在/etc/rcX.d中的单一链路。但是如果使用update-rc.d，则非常简单：





参数-f是强制删除符号链接，即使/etc/init.d/apache2仍然存在。 Note：这个命令仅仅禁止该服务，直到该服务被升级。如果你想在服务升级后仍然保持被禁用。应该执行如下的命令：





#### [][10]增加一个服务

如果你想重新添加这个服务并让它开机自动执行，你需要执行以下命令：





并且可以指定该服务的启动顺序：





还可以更详细的控制start与kill顺序：





其中前面的20是start时的运行顺序级别，80为kill时的级别。也可以写成：





其中0～6为运行级别。 update-rc.d命令不仅适用Linux服务，编写的脚本同样可以用这个命令设为开机自动运行

### [][11]创建开机启动脚本

ubuntu的开启启动脚本是放在/etc/init.d目录下，下面在该目录下创建一个简单的脚本verbosestartup.sh：





只是简单地把脚本放到该目录下还不可以，还需要执行下面的命令应用该脚本：





### [][12]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#喜爱的ubuntu "喜爱的ubuntu"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/ubuntu.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#bash脚本 "bash脚本"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#注意点1 "注意点1"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#注意点2 "注意点2"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#注意点3 "注意点3"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#注意点4 "注意点4"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#update-rc-d "update-rc.d"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#删除一个服务 "删除一个服务"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#增加一个服务 "增加一个服务"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#创建开机启动脚本 "创建开机启动脚本"
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/15/2015_ubuntu1/#谢谢！ "谢谢！"