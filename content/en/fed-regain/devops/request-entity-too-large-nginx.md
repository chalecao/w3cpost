---
title: Request Entity Too Large Nginx


date: 2020-02-10T06:32:13+00:00
url: /pwa/5598.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png
fifu_image_alt:
  - Request Entity Too Large Nginx
views:
  - 644


---
最近自己搭建了一个电商项目服务器，使用Nginx + vsftpd + &#8230; ，

使用Nginx作为HTTP反向代理服务器、帮助实现前端动静分离

问题：但在做附件上传时出现 413 Request Entity Too Large Nginx 错误提示！！  
查询资料后获知：原来nginx默认上传文件的大小是 1M ，nginx的设置中修改。

如下图：

<p id="lZafxMN">
  <img loading="lazy" width="804" height="760" class="alignnone size-full wp-image-5600 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/format,webp 804w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_284/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_726/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e40f8dec0f46.png?x-oss-process=image/quality,q_50/resize,m_fill,w_635,h_600/format,webp 635w" sizes="(max-width: 804px) 100vw, 804px" />
</p>

更改完成后，重启Nginx服务

新增配置：

1、进入Nginx目录conf下的nginx.conf  
cd /usr/local/nginx/conf/

2、编辑文件  
vim nginx.conf

3、找到http{&#8230;},在大括号中新增配置（注意最后要有分号;）  
client\_max\_body_size 20m;

重启Nginx服务：

1、首先进入安装Nginx目录  
cd /usr/local/nginx/sbin/  
2、重启Nginx服务  
./nginx -s reload