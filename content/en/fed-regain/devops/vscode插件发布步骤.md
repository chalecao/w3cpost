---
title: Vscode插件发布步骤







---
<div>
  <p>
    Vscode插件发布步骤：
  </p>
  
  <p>
    1、首先编写好你的插件项目
  </p>
  
  <p>
    2、项目打包成 .vsix文件
  </p>
  
  <p>
    (1) 需要借助工具vsce进行
  </p>
  
  <p>
    ① 全局下载 npm install -g vsce
  </p>
  
  <p>
    ② 项目打包 vsce package
  </p>
  
  <p>
    ③ 项目创建 vsce create-publisher [你的Azure的名字](后边会讲)
  </p>
  
  <p>
    ④ 项目发布 vsce publish( 后边会讲 )
  </p>
  
  <div>
    注意事项：
  </div>
  
  <p>
    1、首先需要自己先装 node、npm工具
  </p>
  
  <p>
    2、项目打包之后可以在商店里加载起来自己看看效果了
  </p>
  
  <p id="kiKlCws">
    <img loading="lazy" width="705" height="588" class="alignnone size-full wp-image-5800 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d261df32.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d261df32.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d261df32.png?x-oss-process=image/format,webp 705w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d261df32.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_250/format,webp 300w" sizes="(max-width: 705px) 100vw, 705px" />
  </p>
  
  <p>
    3、项目创建时需要你注册Azure DeOps账号，链接：<a href="https://aka.ms/SignupAzureDevOps" target="_blank" rel="nofollow noopener noreferrer">aka.ms/SignupAzure…</a>
  </p>
  
  <div>
    ，注册的时候需要你拥有Microsoft账号，注册链接：<a href="https://login.live.com/" target="_blank" rel="nofollow noopener noreferrer">login.live.com/</a>
  </div>
  
  <div>
    ，或者git账号也行你可以试试。
  </div>
  
  <p>
    4、注册完Azure开发者账号之后，需要创建一个token。步骤如下：
  </p>
  
  <p id="EnVDIuq">
    <img loading="lazy" width="337" height="502" class="alignnone size-full wp-image-5801 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d2f1cee0.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d2f1cee0.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d2f1cee0.png?x-oss-process=image/format,webp 337w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5d2f1cee0.png?x-oss-process=image/quality,q_50/resize,m_fill,w_201,h_300/format,webp 201w" sizes="(max-width: 337px) 100vw, 337px" />
  </p>
  
  <p id="GefIDAN">
    <img loading="lazy" width="1003" height="304" class="alignnone size-full wp-image-5802 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/format,webp 1003w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_91/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_233/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5feadeabb.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_242/format,webp 800w" sizes="(max-width: 1003px) 100vw, 1003px" />
  </p>
  
  <p>
    、创建完成之后，手动拷贝key值，之后要用
  </p>
  
  <p>
    6、到打包好的项目目录下，创建要上传的项目vsce create-publisher [你的Azure的名字]按照提示输入name和email，并且输入你刚才生产出来的Key值，之后创建成功
  </p>
  
  <p id="imPCUii">
    <img loading="lazy" width="1280" height="237" class="alignnone size-full wp-image-5803 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/format,webp 1280w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_56/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_142/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/05/img_5ebd5ff6a010d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_148/format,webp 800w" sizes="(max-width: 1280px) 100vw, 1280px" />
  </p>
  
  <p>
    7、之后项目发布vsce publish，成功之后会弹出一个http链接，等上几分钟之后就可以去点击链接查看你发布的插件啦。或者去商店立搜索就可以啦！
  </p>
</div>
