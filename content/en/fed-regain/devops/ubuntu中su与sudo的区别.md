---
title: ubuntu中su与sudo的区别


---
  


### [][1]环境变量问题

经常发现sudo 加一个命令执行，会报错command not found，比如配置了maven之后，明明配置了换进变量，但是还是用sudo mvn就不行？究其原因是sudo默认只是提供最小化的root执行环境。并不包含当前配置的环境变量。  
<a></a>  
![ubuntu中su与sudo的区别][2]

### [][3]su命令临时切换用户身份

su命令就是切换用户的工具，怎么理解呢？比如[我们](https://www.w3cdoc.com)以普通用户beinan登录的，但要添加用户任务，执行useradd ，beinan用户没有这个权限，而这个权限恰恰由root所拥有。解决办法无法有两个，一是退出beinan用户，重新以root用户登录，但这种办法并不是最好的；二是[我们](https://www.w3cdoc.com)没有必要退出beinan用户，可以用su来切换到root下进行添加用户的工作，等任务完成后再退出root。[我们](https://www.w3cdoc.com)可以看到当然通过su 切换是一种比较好的办法；

　　通过su可以在用户之间切换，如果超级权限用户root向普通或虚拟用户切换不需要密码，什么是权力？这就是！而普通用户切换到其它任何用户都需要密码验证。

　su 在不加任何参数，默认为切换到root用户，但没有转到root用户家目录下，也就是说这时虽然是切换为root用户了，但并没有改变root登录环境；用户默认的登录环境，可以在/etc/passwd 中查得到，包括家目录，SHELL定义等；su 只是切换了root身份，但Shell环境仍然是普通用户的Shell

su 加参数 &#8211; ，表示默认切换到root用户，并且改变到root用户的环境；连用户和Shell环境一起切换成root身份了。

su 的确为管理带来方便，通过切换到root下，能完成所有系统管理工具，只要把root的密码交给任何一个普通用户，他都能切换到root来完成所有的系统管理工作；但通过su切换到root后，也有不安全因素；比如系统有10个用户，而且都参与管理。如果这10个用户都涉及到超级权限的运用，做为管理员如果想让其它用户通过su来切换到超级权限的root，必须把root权限密码都告诉这10个用户；如果这10个用户都有root权限，通过root权限可以做任何事，这在一定程度上就对系统的安全造成了威协；想想Windows吧，简直就是恶梦；“没有不安全的系统，只有不安全的人”，[我们](https://www.w3cdoc.com)绝对不能保证这 10个用户都能按正常操作流程来管理系统，其中任何一人对系统操作的重大失误，都可能导致系统崩溃或数据损失；所以su 工具在多人参与的系统管理中，并不是最好的选择，su只适用于一两个人参与管理的系统，毕竟su并不能让普通用户受限的使用；超级用户root密码应该掌握在少数用户手中，这绝对是真理！所以集权而治的存在还是有一定道理的；

### [][4]sudo授权许可使用的su

#### [][5]sudo 的适用条件

　　由于su 对切换到超级权限用户root后，权限的无限制性，所以su并不能担任多个管理员所管理的系统。如果用su 来切换到超级用户来管理系统，也不能明确哪些工作是由哪个管理员进行的操作。特别是对于服务器的管理有多人参与管理时，最好是针对每个管理员的技术特长和管理范围，并且有针对性的下放给权限，并且约定其使用哪些工具来完成与其相关的工作，这时[我们](https://www.w3cdoc.com)就有必要用到 sudo。

　　通过sudo，[我们](https://www.w3cdoc.com)能把某些超级权限有针对性的下放，并且不需要普通用户知道root密码，所以sudo 相对于权限无限制性的su来说，还是比较安全的，所以sudo 也能被称为受限制的su ；另外sudo 是需要授权许可的，所以也被称为授权许可的su；

　　sudo 执行命令的流程是当前用户切换到root（或其它指定切换到的用户），然后以root（或其它指定的切换到的用户）身份执行命令，执行完成后，直接退回到当前用户；而这些的前提是要通过sudo的配置文件/etc/sudoers来进行授权；

比如[我们](https://www.w3cdoc.com)想用beinan普通用户通过more /etc/shadow文件的内容时，可能会出现下面的情况；

　　这时[我们](https://www.w3cdoc.com)可以用sudo more /etc/shadow 来读取文件的内容；就就需要在/etc/soduers中给beinan授权

　　于是[我们](https://www.w3cdoc.com)就可以先su 到root用户下通过visudo 来改/etc/sudoers ；（比如[我们](https://www.w3cdoc.com)是以beinan用户登录系统的）  
加入如下一行，退出保存；退出保存，在这里要会用vi，visudo也是用的vi编辑器；至于vi的用法不多说了；beinan ALL=/bin/more 表示beinan可以切换到root下执行more 来查看文件。

#### [][6]sudoers文件

这里可以配置很多，具体可以搜一下baidu。这里说一下常用的：  
1.使用sudo时候保留某个环境变量  
如下，比如保留JAVA_HOME

注意上面的secure_path是sudo默认采用的path环境。

### [][7]谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/06/04/2015_webpack/</a>  
欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#环境变量问题 "环境变量问题"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/ubuntu-1.jpg
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#su命令临时切换用户身份 "su命令临时切换用户身份"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#sudo授权许可使用的su "sudo授权许可使用的su"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#sudo-的适用条件 "sudo 的适用条件"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#sudoers文件 "sudoers文件"
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/17/2015_ubuntu2/#谢谢！ "谢谢！"
