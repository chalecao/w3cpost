---
title: Provisional headers are shown？怎么调试

---
 老外给了一个方法：
  
 The way I found about the extension that was blocking my resource was through the net-internals tool in Chrome:
  
For Latest Versions of chrome
  
  <ul>
    
      Type <code>chrome://net-export/</code> in the address bar and hit enter.
    
    
      Start Recording. And save Recording file to local.
    
    
      Open the page that is showing problems.
    
    
      Go back to net-internals
    
    
      You can view Recorded Log file Here <a href="https://netlog-viewer.appspot.com/#import" rel="nofollow noreferrer">https://netlog-viewer.appspot.com/#import</a>
    
    
      click on events (###) and use the textfield to find the event related to your resource (use parts of the URL).
    
    
      Finally, click on the event and see if the info shown tells you something.
    
  
For Older Versions of chrome
  
  <ul>
    
      Type <code>chrome://net-internals</code> in the address bar and hit enter.
    
    
      Open the page that is showing problems.
    
    
      Go back to net-internals, click on events (###) and use the textfield to find the event related to your resource (use parts of the URL).
    
    
      Finally, click on the event and see if the info shown tells you something.
    
</div>

## 翻译下

1、 打开`chrome://net-export/`

2. 点击start log to disk， 会弹出个框，选择存储在本地位置

3. 在[浏览器](https://www.w3cdoc.com)上操作，复现你的问题

4. 回到刚才那个页面，点击 stop logging

5. 然后打开这个地址： <a href="https://netlog-viewer.appspot.com/#import" rel="nofollow noreferrer">https://netlog-viewer.appspot.com/#import</a> 点击选择文件，导入刚才导出的日志记录

6. 选择Events，搜索下你的接口，可以看右边的日志，实际上是有cookie的。


  <img loading="lazy" class="alignnone wp-image-4928 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png?x-oss-process=image/format,webp" alt="" width="630" height="322" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png?x-oss-process=image/format,webp 2418w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_153/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_393/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d4cef33669d9.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_409/format,webp 800w" sizes="(max-width: 630px) 100vw, 630px" />

## 其他

还有个经常用的地址：chrome://net-internals

可以用来清除DNS缓存这些
