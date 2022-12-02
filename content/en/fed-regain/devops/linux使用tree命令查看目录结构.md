---
title: linux使用tree命令查看目录结构





---
1.先下载安装包  
使用命令

wget http://mama.indstate.edu/users/ice/tree/src/tree-1.7.0.tgz

2.解压安装  
Linux环境（ubuntu 16.10）下安装

解压tree-1.7.0.tgz文件，命令：tar -zxvf tree-1.7.0.tgz  
进入解压目录中，命令：cd tree-1.7.0  
安装文件，命令：make install  
刚开始没有用root，sudo root后再执行make install 安装成功~

3.测试使用，命令：tree


  <img loading="lazy" class="alignnone  wp-image-5717 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7b33af6d27e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7b33af6d27e.png?x-oss-process=image/format,webp" alt="" width="526" height="314" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7b33af6d27e.png?x-oss-process=image/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7b33af6d27e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_179/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/03/img_5e7b33af6d27e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_459/format,webp 768w" sizes="(max-width: 526px) 100vw, 526px" />

4.tree命令行参数：  
参数 作用  
-a 显示所有文件和目录。  
-A 使用ASNI绘图字符显示树状图而非以ASCII字符组合。  
-C 在文件和目录清单加上色彩，便于区分各种类型。  
-d 显示目录名称而非内容。  
-D 列出文件或目录的更改时间。  
-f 在每个文件或目录之前，显示完整的相对路径名称。  
-F 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上”*”,”/”,”=”,”@”,”|”号。  
-g 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。  
-i 不以阶梯状列出文件或目录名称。  
-I 不显示符合范本样式的文件或目录名称。  
-l 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。  
-n 不在文件和目录清单加上色彩。  
-N 直接列出文件和目录名称，包括控制字符。  
-p 列出权限标示。  
-P 只显示符合范本样式的文件或目录名称。  
-q 用”?”号取代控制字符，列出文件和目录名称。  
-s 列出文件或目录大小。  
-t 用文件和目录的更改时间排序。  
-u 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。  
-x 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。
