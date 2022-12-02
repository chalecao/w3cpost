---
title: DDOS之近源清洗



---

  <img loading="lazy" class="alignnone wp-image-3388 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png?x-oss-process=image/format,webp" alt="" width="508" height="307" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png?x-oss-process=image/format,webp 860w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_181/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_464/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/12/img_5c22d781ad7b8.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_484/format,webp 800w" sizes="(max-width: 508px) 100vw, 508px" />

DDOS攻击为分布式拒绝服务攻击。

# DDOS攻击分类

## 网络层攻击

SYN-flood：利用TCP建立连接时3次握手的“漏洞”，发送源地址虚假的提交，永远无法完成三次握手。占满系统的协议栈队列资源得不到释放，进而拒绝服务。

防御方式：调整内核参数方法，减少等待及重试时间，加速资源释放

* syn proxy
* syn cookies
* 首包丢弃

Ack-flood：虚假Ack包，远不如syn-flood。  
UDP-flood：使用虚假源地址UDP包，以DNS协议为主。防御方法：将UDP查询强制转为TCP，要求溯源，如果是假地址就不再回应。  
ICMP-flood：Ping洪水攻击。

## 应用层攻击

* CC：通过控制傀儡主机或者寻找匿名代理服务器向目标发起大量真实的HTTP请求，最终消耗掉大量的并发资源，拖慢整个网站甚至彻底拒绝服务。
* DNS-flood：发送海量的DNS查询报文导致网络带宽耗尽而无法传送正常DNS查询请求。
* 慢速连接攻击：针对HTTP协议，先建立起HTTP连接，设置一个较大的Conetnt-Length，每次只发送很少的字节，让服务器一直以为HTTP头部没有传输完成，这样连接一多就很快会出现连接耗尽。

# DDOS攻击方式分类

* 混合型：大量的攻击中，通常并不是以上述一种数据类型来攻击，往往是TCP和UDP，网络层和应用层攻击同时进行。
* 反射型：“质询—应答”模式。将源地址伪造成攻击目的地址，则应答的“回包”被发送到目标，如果回包体积比较大或协议支持递归效果，攻击的效果会被放大，性价比高。说明：将源地址设为假的无法回应，即为SYN-flood攻击，制造流量和攻击目标收到的流量为1:1，回报率低。
* 流量放大：SSDP协议，递归效果产生的放大倍数非常大。
* 脉冲型：即“打打停停”，攻击持续时间非常短。（目的：避免触发自动化防御机制）
* 链路冷洪：不直接攻击目标而是以阻塞目标网络的上一级链路为目的。（原因：避免防御系统对攻击流量分摊）

# DDOS防御结构

## 近源清洗

### ISP近源清洗

电信运营商提供的近源清洗和流量压制，此做法为弃卒保帅，避免全站服务对所有用户彻底无法访问。  
意义：对超过自身带宽储备和自身DDOS防御能力之外超大流量时补充性缓解措施。  
云清洗/CDN硬抗：场景-如抢购访问量非常大时，平台上在CDN层面用验证码过滤了绝大多数请求，最后到达数据库的请求量相比非常小。

### 云清洗厂商策略

设置好网站的CNAME，将域名指向云清洗厂商的DNS服务器  
——>云清洗厂商的DNS将穿透CDN的回源的请求指向源站  
——>(检测到受攻击)检测方法：客户网站部署反向代理，托管所有的并发连接。  
——>域名指向自己的清洗集群，然后再将清洗后的流量回源。  
总结：更改CNAME指向，等待DNS递归剩下.

### DC级近目的清洗

DC级近目的清洗：主要用到华为的ADS设备。若探针检测到受到DDOS攻击则将Internet请求都指向DDOS清洗中心——>清洗完正常流量回到IDC业务机。

### OS/APP层

OS/APP层：DDOS最后一道防线。主要对应用层协议做补充防护。如禁用monlist，不提供UDP服务。  
Web服务对相同IP/IP+cookie/HTTP头部/request URL进行检测计数->触发->阻断

## 防御应用

对Web业务：以上四层全部适用  
对游戏：CDN在此场景无效，DNS引流+ADS来清洗。还有在客户端和服务端通信协议做处理（如封包加标签，依赖信息对称）  
服务策略：分级策略：避免某些服务导致全站不可用  
Failover机制：冗余技术  
有损服务：避免单点瓶颈，关键时刻能进行割肉。  
不过总的来说DDOS攻击比较恐怖，一般防御很难抵抗主要取决于哪一方拥有的带宽资源大了。
