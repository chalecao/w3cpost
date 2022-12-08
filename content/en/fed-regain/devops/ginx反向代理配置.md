---
title: nginx反向代理配置

---
## location

```
location = / {
    # 精确匹配 / ，主机名后面不能带任何字符串
    [ configuration A ]
}

location / {
    # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
    # 但是正则和最长字符串会优先匹配
    [ configuration B ]
}

location /documents/ {
    # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
    # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
    [ configuration C ]
}

location ~ /documents/Abc {
    # 匹配任何以 /documents/Abc 开头的地址，匹配符合以后，还要继续往下搜索
    # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
    [ configuration CC ]
}

location ^~ /images/ {
# 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
    # 匹配所有以 gif,jpg或jpeg 结尾的请求
    # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
    [ configuration E ]
}

location /images/ {
    # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
    [ configuration F ]
}

location /images/abc {
    # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
    # F与G的放置顺序是没有关系的
    [ configuration G ]
}

location ~ /images/abc/ {
    # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ]
}

location ~*/js/.*/\.js

```

* 已`=`开头表示精确匹配  
    如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。
* `^~` 开头表示uri以某个常规字符串开头，不是正则匹配
* ~ 开头表示区分大小写的正则匹配;
* ~* 开头表示不区分大小写的正则匹配
* / 通用匹配, 如果没有其它匹配,任何请求都会匹配到

顺序 no优先级：  
(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~* 正则顺序) > (location 部分起始路径) > (/)

## **rewrite**

<div>
  <div class="cnblogs_code">
    ```
syntax: rewrite regex replacement [flag]
Default: —
Context: server, location, if
```
  </div>
</div>

* 如果正则表达式（_regex_）匹配到了请求的URI（request URI），这个URI会被后面的_replacement_替换
* _rewrite_的定向会根据他们在配置文件中出现的顺序依次执行
* 通过使用_flag_可以终止定向后进一步的处理
* 如果replacement以“https://”, “https://”, or “$scheme”开头，处理将会终止，请求结果会以重定向的形式返回给客户端（client）
* <div>
      
        如果<em>replacement</em>字符串里有新的request参数，那么之前的参数会附加到其后面，如果要避免这种情况，那就在<em>replacement</em>字符串后面加上“？”，eg：
      

      <div class="cnblogs_code">
        ```
 rewrite ^/users/(.*)$ /show?user=$1? last;=
```
      </div>
    </div>

* 如果正则表达式（_regex_）里包含“}” or “;”字符，需要用单引号或者双引号把正则表达式引起来

  可选的<em>flag</em>参数如下：

<div>
  <ul>
    
      last
    
  
  <ol>
    
      结束当前的请求处理，用替换后的URI重新匹配location；
    
    
      可理解为重写（rewrite）后，发起了一个新请求，进入server模块，匹配location；
    
    
      如果重新匹配循环的次数超过10次，nginx会返回500错误；
    
    
      返回302 http状态码 ；
    
    
      [浏览器](https://www.w3cdoc.com)地址栏显示重地向后的url
    
  </ol>
</div>

<div>
  <ul>
    
      break
    
  
  <ol>
    
      结束当前的请求处理，使用当前资源，不在执行location里余下的语句；
    
    
      返回302 http状态码 ；
    
    
      [浏览器](https://www.w3cdoc.com)地址栏显示重地向后的url
    
  </ol>
</div>

<div>
  <ul>
    
       redirect
    
  
  <ol>
    
      临时跳转，返回302 http状态码；
    
    
      [浏览器](https://www.w3cdoc.com)地址栏显示重地向后的url
    
  </ol>
  <ul>
    
      permanent
    
  
  <ol>
    
      永久跳转，返回301 http状态码；
    
    
      [浏览器](https://www.w3cdoc.com)地址栏显示重定向后的url
    
  </ol>
  <h3 id="2-1-flag标志位">
    flag标志位区别
  </h3>
  <ul>
    
      last : 相当于Apache的[L]标记，表示完成rewrite
    
    
      break : 停止执行当前虚拟主机的后续rewrite指令集
    
    
      redirect : 返回302临时重定向，地址栏会显示跳转后的地址
    
    
      permanent : 返回301永久重定向，地址栏会显示跳转后的地址
    
  
 因为301和302不能简单的只返回状态码，还必须有重定向的URL，这就是return指令无法返回301,302的原因了。这里 last 和 break 区别有点难以理解：
  
  <ol>
    
      last一般写在server和if中，而break一般使用在location中
    
    
      last不终止<em>重写后</em>的url匹配，即新的url会再从server走一遍匹配流程，而break终止重写后的匹配
    
    
      break和last都能组织继续执行后面的rewrite指令
    
  </ol>
  <h2 id="2-2-if指令与全局变量">
    if指令与全局变量
  

if判断指令<br /> 语法为if(condition){...}，对给定的条件condition进行判断。如果为真，大括号内的rewrite指令将被执行，if条件(conditon)可以是如下任何内容：
  
  <ul>
    
      当表达式只是一个变量时，如果值为空或任何以0开头的字符串都会当做false
    
    
      直接比较变量和内容时，使用=或!=
    
    
      ~正则表达式匹配，~*不区分大小写的匹配，!~区分大小写的不匹配
    
  
 -f和!-f用来判断是否存在文件<br /> -d和!-d用来判断是否存在目录<br /> -e和!-e用来判断是否存在文件或目录<br /> -x和!-x用来判断文件是否可执行
  
 例如：
  
  ```
if ($http_user_agent ~ MSIE) {
    rewrite ^(.*)$ /msie/$1 break;
} //如果UA包含"MSIE"，rewrite请求到/msid/目录下

if ($http_cookie ~* "id=([^;]+)(?:;|$)") {
    set $id $1;
} //如果cookie匹配正则，设置变量$id等于正则引用部分

if ($request_method = POST) {
    return 405;
} //如果提交方法为POST，则返回状态405（Method not allowed）。return不能返回301,302

if ($slow) {
    limit_rate 10k;
} //限速，$slow可以通过 set 指令设置

if (!-f $request_filename){
    break;
    proxy_pass https://127.0.0.1;
} //如果请求的文件名不存在，则反向代理到localhost 。这里的break也是停止rewrite检查

if ($args ~ post=140){
    rewrite ^ https://example.com/ permanent;
} //如果query string中包含"post=140"，永久重定向到example.com

location ~* \.(gif|jpg|png|swf|flv)$ {
valid_referers none blocked www.jefflei.com www.leizhenfang.com;
if ($invalid_referer) {
    return 404;
} //防盗链
}

```<figure class="highlight stata"></figure>
全局变量<br /> 下面是可以用作if判断的全局变量
  
  <ul>
    
      $args ： #这个变量等于请求行中的参数，同$query_string
    
    
      $content_length ： 请求头中的Content-length字段。
    
    
      $content_type ： 请求头中的Content-Type字段。
    
    
      $document_root ： 当前请求在root指令中指定的值。
    
    
      $host ： 请求主机头字段，否则为服务器名称。
    
    
      $http_user_agent ： 客户端agent信息
    
    
      $http_cookie ： 客户端cookie信息
    
    
      $limit_rate ： 这个变量可以限制连接速率。
    
    
      $request_method ： 客户端请求的动作，通常为GET或POST。
    
    
      $remote_addr ： 客户端的IP地址。
    
    
      $remote_port ： 客户端的端口。
    
    
      $remote_user ： 已经经过Auth Basic Module验证的用户名。
    
    
      $request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
    
    
      $scheme ： HTTP方法（如http，https）。
    
    
      $server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
    
    
      $server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
    
    
      $server_name ： 服务器名称。
    
    
      $server_port ： 请求到达服务器的端口号。
    
    
      $request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
    
    
      $uri ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
    
    
      $document_uri ： 与$uri相同。
    
</div>

## **proxy_pass**

<div>
  <div class="cnblogs_code">
    ```
Syntax:    proxy_pass URL;
Default:    —
Context:    location, if in location, limit_except
```
  </div>
</div>

<div>
  <ul>
    
      不影响[浏览器](https://www.w3cdoc.com)地址栏的url
    
    
      设置被代理server的协议和地址，URI可选（可以有，也可以没有）
    
    
      协议可以为http或https
    
    
      地址可以为域名或者IP，端口可选；eg： <div class="cnblogs_code">
        ```
 proxy_pass https://localhost:8000/uri/;
```
      </div>
    

    
       如果一个域名可以解析到多个地址，那么这些地址会被轮流使用，此外，还可以把一个地址指定为 server group（如：nginx的upstream）, eg: <div class="cnblogs_code">
        <div class="cnblogs_code_toolbar">
        </div>
        
        ```
upstream backend {
    server backend1.example.com       weight=5;
    server backend2.example.com:8080;
    server unix:/tmp/backend3;
 
    server backup1.example.com:8080   backup;
    server backup2.example.com:8080   backup;
}

server {
    location / {
        proxy_pass https://backend;
    }
}
```

        <div class="cnblogs_code_toolbar">
        </div>
      </div>
    
    
    
      server name， port， URI支持变量的形式，eg： <div class="cnblogs_code">
        ```
proxy_pass https://$host$uri;
```
      </div>
    
</div>

  这种情况下，nginx会在server groups（upstream后端server）里搜索server name，如果没有找到，会用dns解析

  请求的URI按照下面的规则传给后端server

<div>
  <ol>
    
      如果proxy_pass的URL定向里包括URI，那么请求中匹配到location中URI的部分会被proxy_pass后面URL中的URI替换，eg： <div class="cnblogs_code">
        ```
location /name/ {
    proxy_pass https://127.0.0.1/remote/;
}
请求https://127.0.0.1/name/test.html 会被代理到https://example.com/remote/test.html

location /name/ {
    proxy_pass https://127.0.0.1/remote;
}
请求https://127.0.0.1/name/test.html 会被代理到https://example.com/remotetest.html

location /name/ {
     proxy_pass https://127.0.0.1/;
}
请求https://127.0.0.1/name/test.html 会被代理到https://example.com/test.html
```
      </div>
    

    
      如果proxy_pass的URL定向里不包括URI，那么请求中的URI会保持原样传送给后端server，eg： <div class="cnblogs_code">
        ```
location /name/ {
    proxy_pass https://127.0.0.1;
}

请求https://127.0.0.1/name/test.html 会被代理到https://127.0.0.1/name/test.html
```
      </div>
    

    
       一些情况下，不能确定替换的URI <ol>
        
          location里是正则表达式，这种情况下，proxy_pass里最好不要有URI
        
        
          在proxy_pass前面用了rewrite，如下，这种情况下，proxy_pass是无效的，eg： <div class="cnblogs_code">
            ```
location /name/ {
    rewrite    /name/([^/]+) /users?name=$1 break;
    proxy_pass https://127.0.0.1;
}
```
          </div>

          
              </ol>  </ol> 
            
            ##             案例
            

            
            
              在nginx中配置proxy_pass时，如果是按照^~匹配路径时,要注意proxy_pass后的url最后的/。当加上了/，相当于是绝对根路径，则nginx不会把location中匹配的路径部分代理走;如果没有/，则会把匹配的路径部分也给代理走。
            
            
            <div class="cnblogs_Highlighter sh-gutter">
              <div>
                <div id="highlighter_316417" class="syntaxhighlighter  bash">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td class="gutter">
                        <div class="line number1 index0 alt2">
                          1
                        </div>
                        
                        <div class="line number2 index1 alt1">
                          2
                        </div>
                        
                        <div class="line number3 index2 alt2">
                          3
                        </div>
                        
                        <div class="line number4 index3 alt1">
                          4
                        </div>
                        
                        <div class="line number5 index4 alt2">
                          5
                        </div>
                        
                        <div class="line number6 index5 alt1">
                          6
                        </div>
                        
                        <div class="line number7 index6 alt2">
                          7
                        </div>
                        
                        <div class="line number8 index7 alt1">
                          8
                        </div>
                        
                        <div class="line number9 index8 alt2">
                          9
                        </div>
                        
                        <div class="line number10 index9 alt1">
                          10
                        </div>
                        
                        <div class="line number11 index10 alt2">
                          11
                        </div>
                        
                        <div class="line number12 index11 alt1">
                          12
                        </div>
                        
                        <div class="line number13 index12 alt2">
                          13
                        </div>
                        
                        <div class="line number14 index13 alt1">
                          14
                        </div>
                        
                        <div class="line number15 index14 alt2">
                          15
                        </div>
                        
                        <div class="line number16 index15 alt1">
                          16
                        </div>
                        
                        <div class="line number17 index16 alt2">
                          17
                        </div>
                        
                        <div class="line number18 index17 alt1">
                          18
                        </div>
                        
                        <div class="line number19 index18 alt2">
                          19
                        </div>
                        
                        <div class="line number20 index19 alt1">
                          20
                        </div>
                        
                        <div class="line number21 index20 alt2">
                          21
                        </div>
                        
                        <div class="line number22 index21 alt1">
                          22
                        </div>
                        
                        <div class="line number23 index22 alt2">
                          23
                        </div>
                        
                        <div class="line number24 index23 alt1">
                          24
                        </div>
                        
                        <div class="line number25 index24 alt2">
                          25
                        </div>
                        
                        <div class="line number26 index25 alt1">
                          26
                        </div>
                      </td>
                      
                      <td class="code">
                        <div class="container">
                          <div class="line number1 index0 alt2">
                            比如下面设置：
                          </div>
                          
                          <div class="line number2 index1 alt1">
                            location ^~ /wangshibo/
                          </div>
                          
                          <div class="line number3 index2 alt2">
                            {
                          </div>
                          
                          <div class="line number4 index3 alt1">
                            proxy_cache js_cache;
                          </div>
                          
                          <div class="line number5 index4 alt2">
                            proxy_set_header Host js.test.com;
                          </div>
                          
                          <div class="line number6 index5 alt1">
                            proxy_pass http://js.test.com/;
                          </div>
                          
                          <div class="line number7 index6 alt2">
                            }
                          </div>
                          
                          <div class="line number8 index7 alt1">
                            如上面的配置，如果请求的url是http://servername/wangshibo/test.html会被代理成http://js.test.com/test.html
                          </div>
                          
                          <div class="line number9 index8 alt2">
                          </div>
                          
                          <div class="line number10 index9 alt1">
                            而如果这么配置
                          </div>
                          
                          <div class="line number11 index10 alt2">
                            location ^~ /wangshibo/
                          </div>
                          
                          <div class="line number12 index11 alt1">
                            {
                          </div>
                          
                          <div class="line number13 index12 alt2">
                            proxy_cache js_cache;
                          </div>
                          
                          <div class="line number14 index13 alt1">
                            proxy_set_header Host js.test.com;
                          </div>
                          
                          <div class="line number15 index14 alt2">
                            proxy_pass http://js.test.com;
                          </div>
                          
                          <div class="line number16 index15 alt1">
                            }
                          </div>
                          
                          <div class="line number17 index16 alt2">
                            则请求的url是http://servername/wangshibo/test.html会被代理到http://js.test.com/wangshibo/test.html
                          </div>
                          
                          <div class="line number18 index17 alt1">
                          </div>
                          
                          <div class="line number19 index18 alt2">
                            当然，可以用如下的rewrite来实现/的功能
                          </div>
                          
                          <div class="line number20 index19 alt1">
                            location ^~ /wangshibo/
                          </div>
                          
                          <div class="line number21 index20 alt2">
                            {
                          </div>
                          
                          <div class="line number22 index21 alt1">
                            proxy_cache js_cache;
                          </div>
                          
                          <div class="line number23 index22 alt2">
                            proxy_set_header Host js.test.com;
                          </div>
                          
                          <div class="line number24 index23 alt1">
                            rewrite /wangshibo/(.+)$ /$1 break;
                          </div>
                          
                          <div class="line number25 index24 alt2">
                            proxy_pass http://js.test.com;
                          </div>
                          
                          <div class="line number26 index25 alt1">
                            }
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            
            ##             参考
            

            
            
              <a href="https://www.nginx.cn/216.html">https://www.nginx.cn/216.html</a>
            
            
            
              <a href="https://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/">https://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/</a>
            
            
            
              <a href="https://fantefei.blog.51cto.com/2229719/919431">https://fantefei.blog.51cto.com/2229719/919431</a>
            </div>
