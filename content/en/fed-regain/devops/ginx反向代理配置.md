---
title: nginx反向代理配置

---
## location

<pre class="pure-highlightjs"><code class="">location = / {
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
</code></pre>

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
    <pre><code>syntax: rewrite regex replacement [flag]
Default: —
Context: server, location, if</code></pre>
  </div>
</div>

* 如果正则表达式（_regex_）匹配到了请求的URI（request URI），这个URI会被后面的_replacement_替换
* _rewrite_的定向会根据他们在配置文件中出现的顺序依次执行
* 通过使用_flag_可以终止定向后进一步的处理
* 如果replacement以“https://”, “https://”, or “$scheme”开头，处理将会终止，请求结果会以重定向的形式返回给客户端（client）
* <div>
      <p>
        如果<em>replacement</em>字符串里有新的request参数，那么之前的参数会附加到其后面，如果要避免这种情况，那就在<em>replacement</em>字符串后面加上“？”，eg：
      </p>

      <div class="cnblogs_code">
        <pre><code> rewrite ^/users/(.*)$ /show?user=$1? last;=</code></pre>
      </div>
    </div>

* 如果正则表达式（_regex_）里包含“}” or “;”字符，需要用单引号或者双引号把正则表达式引起来

  可选的<em>flag</em>参数如下：

<div>
  <ul>
    <li>
      last
    </li>
  </ul>
  
  <ol>
    <li>
      结束当前的请求处理，用替换后的URI重新匹配location；
    </li>
    <li>
      可理解为重写（rewrite）后，发起了一个新请求，进入server模块，匹配location；
    </li>
    <li>
      如果重新匹配循环的次数超过10次，nginx会返回500错误；
    </li>
    <li>
      返回302 http状态码 ；
    </li>
    <li>
      浏览器地址栏显示重地向后的url
    </li>
  </ol>
</div>

<div>
  <ul>
    <li>
      break
    </li>
  </ul>
  
  <ol>
    <li>
      结束当前的请求处理，使用当前资源，不在执行location里余下的语句；
    </li>
    <li>
      返回302 http状态码 ；
    </li>
    <li>
      浏览器地址栏显示重地向后的url
    </li>
  </ol>
</div>

<div>
  <ul>
    <li>
       redirect
    </li>
  </ul>
  
  <ol>
    <li>
      临时跳转，返回302 http状态码；
    </li>
    <li>
      浏览器地址栏显示重地向后的url
    </li>
  </ol>
  
  <ul>
    <li>
      permanent
    </li>
  </ul>
  
  <ol>
    <li>
      永久跳转，返回301 http状态码；
    </li>
    <li>
      浏览器地址栏显示重定向后的url
    </li>
  </ol>
  
  <h3 id="2-1-flag标志位">
    flag标志位区别
  </h3>
  
  <ul>
    <li>
      <code>last</code> : 相当于Apache的[L]标记，表示完成rewrite
    </li>
    <li>
      <code>break</code> : 停止执行当前虚拟主机的后续rewrite指令集
    </li>
    <li>
      <code>redirect</code> : 返回302临时重定向，地址栏会显示跳转后的地址
    </li>
    <li>
      <code>permanent</code> : 返回301永久重定向，地址栏会显示跳转后的地址
    </li>
  </ul>
  
  <p>
    因为301和302不能简单的只返回状态码，还必须有重定向的URL，这就是return指令无法返回301,302的原因了。这里 last 和 break 区别有点难以理解：
  </p>
  
  <ol>
    <li>
      last一般写在server和if中，而break一般使用在location中
    </li>
    <li>
      last不终止<em>重写后</em>的url匹配，即新的url会再从server走一遍匹配流程，而break终止重写后的匹配
    </li>
    <li>
      break和last都能组织继续执行后面的rewrite指令
    </li>
  </ol>
  
  <h2 id="2-2-if指令与全局变量">
    if指令与全局变量
  </h2>
  
  <p>
    <strong>if判断指令</strong><br /> 语法为<code>if(condition){...}</code>，对给定的条件condition进行判断。如果为真，大括号内的rewrite指令将被执行，if条件(conditon)可以是如下任何内容：
  </p>
  
  <ul>
    <li>
      当表达式只是一个变量时，如果值为空或任何以0开头的字符串都会当做false
    </li>
    <li>
      直接比较变量和内容时，使用<code>=</code>或<code>!=</code>
    </li>
    <li>
      <code>~</code>正则表达式匹配，<code>~*</code>不区分大小写的匹配，<code>!~</code>区分大小写的不匹配
    </li>
  </ul>
  
  <p>
    <code>-f</code>和<code>!-f</code>用来判断是否存在文件<br /> <code>-d</code>和<code>!-d</code>用来判断是否存在目录<br /> <code>-e</code>和<code>!-e</code>用来判断是否存在文件或目录<br /> <code>-x</code>和<code>!-x</code>用来判断文件是否可执行
  </p>
  
  <p>
    例如：
  </p>
  
  <pre class="pure-highlightjs"><code class="">if ($http_user_agent ~ MSIE) {
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
</code></pre><figure class="highlight stata"></figure>
  
  <p>
    <strong>全局变量</strong><br /> 下面是可以用作if判断的全局变量
  </p>
  
  <ul>
    <li>
      <code>$args</code> ： #这个变量等于请求行中的参数，同<code>$query_string</code>
    </li>
    <li>
      <code>$content_length</code> ： 请求头中的Content-length字段。
    </li>
    <li>
      <code>$content_type</code> ： 请求头中的Content-Type字段。
    </li>
    <li>
      <code>$document_root</code> ： 当前请求在root指令中指定的值。
    </li>
    <li>
      <code>$host</code> ： 请求主机头字段，否则为服务器名称。
    </li>
    <li>
      <code>$http_user_agent</code> ： 客户端agent信息
    </li>
    <li>
      <code>$http_cookie</code> ： 客户端cookie信息
    </li>
    <li>
      <code>$limit_rate</code> ： 这个变量可以限制连接速率。
    </li>
    <li>
      <code>$request_method</code> ： 客户端请求的动作，通常为GET或POST。
    </li>
    <li>
      <code>$remote_addr</code> ： 客户端的IP地址。
    </li>
    <li>
      <code>$remote_port</code> ： 客户端的端口。
    </li>
    <li>
      <code>$remote_user</code> ： 已经经过Auth Basic Module验证的用户名。
    </li>
    <li>
      <code>$request_filename</code> ： 当前请求的文件路径，由root或alias指令与URI请求生成。
    </li>
    <li>
      <code>$scheme</code> ： HTTP方法（如http，https）。
    </li>
    <li>
      <code>$server_protocol</code> ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
    </li>
    <li>
      <code>$server_addr</code> ： 服务器地址，在完成一次系统调用后可以确定这个值。
    </li>
    <li>
      <code>$server_name</code> ： 服务器名称。
    </li>
    <li>
      <code>$server_port</code> ： 请求到达服务器的端口号。
    </li>
    <li>
      <code>$request_uri</code> ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
    </li>
    <li>
      <code>$uri</code> ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
    </li>
    <li>
      <code>$document_uri</code> ： 与$uri相同。
    </li>
  </ul>
</div>

## **proxy_pass**

<div>
  <div class="cnblogs_code">
    <pre><code>Syntax:    proxy_pass URL;
Default:    —
Context:    location, if in location, limit_except</code></pre>
  </div>
</div>

<div>
  <ul>
    <li>
      不影响浏览器地址栏的url
    </li>
    <li>
      设置被代理server的协议和地址，URI可选（可以有，也可以没有）
    </li>
    <li>
      协议可以为http或https
    </li>
    <li>
      地址可以为域名或者IP，端口可选；eg： <div class="cnblogs_code">
        <pre><code> proxy_pass https://localhost:8000/uri/;</code></pre>
      </div>
    </li>

    <li>
       如果一个域名可以解析到多个地址，那么这些地址会被轮流使用，此外，还可以把一个地址指定为 server group（如：nginx的upstream）, eg: <div class="cnblogs_code">
        <div class="cnblogs_code_toolbar">
        </div>
        
        <pre><code>upstream backend {
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
}</code></pre>

        <div class="cnblogs_code_toolbar">
        </div>
      </div>
    </li>
    
    <li>
      server name， port， URI支持变量的形式，eg： <div class="cnblogs_code">
        <pre><code>proxy_pass https://$host$uri;</code></pre>
      </div>
    </li>
  </ul>
</div>

  这种情况下，nginx会在server groups（upstream后端server）里搜索server name，如果没有找到，会用dns解析

  请求的URI按照下面的规则传给后端server

<div>
  <ol>
    <li>
      如果proxy_pass的URL定向里包括URI，那么请求中匹配到location中URI的部分会被proxy_pass后面URL中的URI替换，eg： <div class="cnblogs_code">
        <pre><code>location /name/ {
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
请求https://127.0.0.1/name/test.html 会被代理到https://example.com/test.html</code></pre>
      </div>
    </li>

    <li>
      如果proxy_pass的URL定向里不包括URI，那么请求中的URI会保持原样传送给后端server，eg： <div class="cnblogs_code">
        <pre><code>location /name/ {
    proxy_pass https://127.0.0.1;
}

请求https://127.0.0.1/name/test.html 会被代理到https://127.0.0.1/name/test.html</code></pre>
      </div>
    </li>

    <li>
       一些情况下，不能确定替换的URI <ol>
        <li>
          location里是正则表达式，这种情况下，proxy_pass里最好不要有URI
        </li>
        <li>
          在proxy_pass前面用了rewrite，如下，这种情况下，proxy_pass是无效的，eg： <div class="cnblogs_code">
            <pre><code>location /name/ {
    rewrite    /name/([^/]+) /users?name=$1 break;
    proxy_pass https://127.0.0.1;
}</code></pre>
          </div>

          <p>
             </li> </ol> </li> </ol> 
            
            <h2>
              案例
            </h2>
            
            <p>
              在nginx中配置proxy_pass时，如果是按照^~匹配路径时,要注意proxy_pass后的url最后的/。当加上了/，相当于是绝对根路径，则nginx不会把location中匹配的路径部分代理走;如果没有/，则会把匹配的路径部分也给代理走。
            </p>
            
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
                            <code class="bash plain">比如下面设置：</code>
                          </div>
                          
                          <div class="line number2 index1 alt1">
                            <code class="bash plain">location ^~ </code><code class="bash plain">/wangshibo/</code>
                          </div>
                          
                          <div class="line number3 index2 alt2">
                            <code class="bash plain">{</code>
                          </div>
                          
                          <div class="line number4 index3 alt1">
                            <code class="bash plain">proxy_cache js_cache;</code>
                          </div>
                          
                          <div class="line number5 index4 alt2">
                            <code class="bash plain">proxy_set_header Host js.</code><code class="bash functions">test</code><code class="bash plain">.com;</code>
                          </div>
                          
                          <div class="line number6 index5 alt1">
                            <code class="bash plain">proxy_pass http:</code><code class="bash plain">//js</code><code class="bash plain">.</code><code class="bash functions">test</code><code class="bash plain">.com/;</code>
                          </div>
                          
                          <div class="line number7 index6 alt2">
                            <code class="bash plain">}</code>
                          </div>
                          
                          <div class="line number8 index7 alt1">
                            <code class="bash plain">如上面的配置，如果请求的url是http:</code><code class="bash plain">//servername/wangshibo/test</code><code class="bash plain">.html会被代理成http:</code><code class="bash plain">//js</code><code class="bash plain">.</code><code class="bash functions">test</code><code class="bash plain">.com</code><code class="bash plain">/test</code><code class="bash plain">.html</code>
                          </div>
                          
                          <div class="line number9 index8 alt2">
                          </div>
                          
                          <div class="line number10 index9 alt1">
                            <code class="bash plain">而如果这么配置</code>
                          </div>
                          
                          <div class="line number11 index10 alt2">
                            <code class="bash plain">location ^~ </code><code class="bash plain">/wangshibo/</code>
                          </div>
                          
                          <div class="line number12 index11 alt1">
                            <code class="bash plain">{</code>
                          </div>
                          
                          <div class="line number13 index12 alt2">
                            <code class="bash plain">proxy_cache js_cache;</code>
                          </div>
                          
                          <div class="line number14 index13 alt1">
                            <code class="bash plain">proxy_set_header Host js.</code><code class="bash functions">test</code><code class="bash plain">.com;</code>
                          </div>
                          
                          <div class="line number15 index14 alt2">
                            <code class="bash plain">proxy_pass http:</code><code class="bash plain">//js</code><code class="bash plain">.</code><code class="bash functions">test</code><code class="bash plain">.com;</code>
                          </div>
                          
                          <div class="line number16 index15 alt1">
                            <code class="bash plain">}</code>
                          </div>
                          
                          <div class="line number17 index16 alt2">
                            <code class="bash plain">则请求的url是http:</code><code class="bash plain">//servername/wangshibo/test</code><code class="bash plain">.html会被代理到http:</code><code class="bash plain">//js</code><code class="bash plain">.</code><code class="bash functions">test</code><code class="bash plain">.com</code><code class="bash plain">/wangshibo/test</code><code class="bash plain">.html</code>
                          </div>
                          
                          <div class="line number18 index17 alt1">
                          </div>
                          
                          <div class="line number19 index18 alt2">
                            <code class="bash plain">当然，可以用如下的rewrite来实现/的功能</code>
                          </div>
                          
                          <div class="line number20 index19 alt1">
                            <code class="bash plain">location ^~ </code><code class="bash plain">/wangshibo/</code>
                          </div>
                          
                          <div class="line number21 index20 alt2">
                            <code class="bash plain">{</code>
                          </div>
                          
                          <div class="line number22 index21 alt1">
                            <code class="bash plain">proxy_cache js_cache;</code>
                          </div>
                          
                          <div class="line number23 index22 alt2">
                            <code class="bash plain">proxy_set_header Host js.</code><code class="bash functions">test</code><code class="bash plain">.com;</code>
                          </div>
                          
                          <div class="line number24 index23 alt1">
                            <code class="bash plain">rewrite </code><code class="bash plain">/wangshibo/</code><code class="bash plain">(.+)$ /$1 </code><code class="bash keyword">break</code><code class="bash plain">;</code>
                          </div>
                          
                          <div class="line number25 index24 alt2">
                            <code class="bash plain">proxy_pass http:</code><code class="bash plain">//js</code><code class="bash plain">.</code><code class="bash functions">test</code><code class="bash plain">.com;</code>
                          </div>
                          
                          <div class="line number26 index25 alt1">
                            <code class="bash plain">}</code>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            
            <h2>
              参考
            </h2>
            
            <p>
              <a href="https://www.nginx.cn/216.html">https://www.nginx.cn/216.html</a>
            </p>
            
            <p>
              <a href="https://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/">https://www.ttlsa.com/nginx/nginx-rewriting-rules-guide/</a>
            </p>
            
            <p>
              <a href="https://fantefei.blog.51cto.com/2229719/919431">https://fantefei.blog.51cto.com/2229719/919431</a>
            </p></div>
