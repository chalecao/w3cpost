---
title: 使用 CURL 上传文件


date: 2020-11-14T07:05:59+00:00
url: /javascriptnodejs/6131.html
classic-editor-remember:
  - classic-editor
views:
  - 550
like:
  - 1


---
CURL 是一个强大的向服务器发送请求的工具， 尤其是在测试 API 的时候。  
很多人像寻常表单一样使用了 `-X POST` 方式来使用 CURL 去上传文件，但实际上这是错误的。  
正确的方式是使用 **-F (&#8211;form) **来上传文件，这样才会给请求添加 `enctype="multipart/form-data"` 参数。

    <span class="hljs-meta">$</span><span class="bash"> curl -F 'data=@path/to/<span class="hljs-built_in">local</span>/file’ UPLOAD_ADDRES</span>
    

例如， 如果我想向服务器 `<a href="http://localhost/upload">http://localhost/upload</a>` 上传位于`/home/petehouston/hello.txt`的文件，并将上传的文件的参数命名为 `img_avatar`， 我可以这样发送请求，

    $ curl -F <span class="hljs-string">'img_avatar=@/home/petehouston/hello.txt'</span> <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/localhost/upload</span>
    

# 上传多个文件

想要同时上传多个文件的话，只需要添加多个 `-F` 选项就可以了。

    $ curl -F <span class="hljs-string">'fileX=@/path/to/fileX'</span> -F <span class="hljs-string">'fileY=@/path/to/fileY'</span> ... <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/localhost/upload</span>
    

# 上传文件数组

想要上传文件数组的话，只需要添加多个 `-F` 选项并命名成相同名字的数组就可以了。

    $ curl -F <span class="hljs-string">'files[]=@/path/to/fileX'</span> -F <span class="hljs-string">'files[]=@/path/to/fileY'</span> ... <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/localhost/upload</span>
    

就是这么简单，开始享用吧：)