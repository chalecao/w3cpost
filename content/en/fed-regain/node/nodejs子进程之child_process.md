---
title: nodejs子进程之child_process


---
在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。熟悉shell脚本的同学，可以用它来完成很多有意思的事情，比如文件压缩、增量部署等，感兴趣的同学，看文本文后可以尝试下。

举个简单的例子：

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">const&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">const&lt;/span> ls = spawn(&lt;span class="hljs-string">'ls'&lt;/span>, [&lt;span class="hljs-string">'-lh'&lt;/span>, &lt;span class="hljs-string">'/usr'&lt;/span>]);

ls.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, (data) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`stdout: &lt;span class="hljs-subst">${data}&lt;/span>`&lt;/span>);
});

ls.stderr.on(&lt;span class="hljs-string">'data'&lt;/span>, (data) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`stderr: &lt;span class="hljs-subst">${data}&lt;/span>`&lt;/span>);
});

ls.on(&lt;span class="hljs-string">'close'&lt;/span>, (code) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`child process exited &lt;span class="hljs-keyword">with&lt;/span> code &lt;span class="hljs-subst">${code}&lt;/span>`&lt;/span>);
});</code></pre>

## 几种创建子进程的方式 {#几种创建子进程的方式}

注意事项：

* 下面列出来的都是异步创建子进程的方式，每一种方式都有对应的同步版本。
* `.exec()`、`.execFile()`、`.fork()`底层都是通过`.spawn()`实现的。
* `.exec()`、`execFile()`额外提供了回调，当子进程停止的时候执行。

> child_process.spawn(command\[, args\]\[, options\])  
> child_process.exec(command\[, options\]\[, callback\])  
> child_process.execFile(file\[, args\]\[, options\][, callback])  
> child_process.fork(modulePath\[, args\]\[, options\])

### child_process.exec(command\[, options\]\[, callback\]) {#child_process.execcommand-options-callback}

创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。

> spawns a shell and runs a command within that shell, passing the stdout and stderr to a callback function when complete.

例子如下：

  1. 执行成功，`error`为`null`；执行失败，`error`为`Error`实例。`error.code`为错误码，
  2. `stdout`、`stderr`为标准输出、标准错误。默认是字符串，除非`options.encoding`为`buffer`

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> exec = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).exec;

&lt;span class="hljs-comment">// 成功的例子&lt;/span>
exec(&lt;span class="hljs-string">'ls -al'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error) {
        &lt;span class="hljs-built_in">console&lt;/span>.error(&lt;span class="hljs-string">'error: '&lt;/span> + error);
        &lt;span class="hljs-keyword">return&lt;/span>;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'stdout: '&lt;/span> + stdout);
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'stderr: '&lt;/span> + &lt;span class="hljs-keyword">typeof&lt;/span> stderr);
});

&lt;span class="hljs-comment">// 失败的例子&lt;/span>
exec(&lt;span class="hljs-string">'ls hello.txt'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error) {
        &lt;span class="hljs-built_in">console&lt;/span>.error(&lt;span class="hljs-string">'error: '&lt;/span> + error);
        &lt;span class="hljs-keyword">return&lt;/span>;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'stdout: '&lt;/span> + stdout);
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'stderr: '&lt;/span> + stderr);
});</code></pre>

#### 参数说明： {#参数说明}

* `cwd`：当前工作路径。
* `env`：环境变量。
* `encoding`：编码，默认是`utf8`。
* `shell`：用来执行命令的shell，unix上默认是`/bin/sh`，windows上默认是`cmd.exe`。
* `timeout`：默认是0。
* `killSignal`：默认是`SIGTERM`。
* `uid`：执行进程的uid。
* `gid`：执行进程的gid。
* `maxBuffer`： 标准输出、错误输出最大允许的数据量（单位为字节），如果超出的话，子进程就会被杀死。默认是200*1024（就是200k啦）

备注：

  1. 如果`timeout`大于0，那么，当子进程运行超过`timeout`毫秒，那么，就会给进程发送`killSignal`指定的信号（比如`SIGTERM`）。
  2. 如果运行没有出错，那么`error`为`null`。如果运行出错，那么，`error.code`就是退出代码（exist code），`error.signal`会被设置成终止进程的信号。（比如`CTRL+C`时发送的`SIGINT`）

#### 风险项 {#风险项}

传入的命令，如果是用户输入的，有可能产生类似sql注入的风险，比如

<pre><code class="hljs lua hljs coffeescript">exec(&lt;span class="hljs-string">'ls hello.txt; rm -rf *'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">&lt;span class="hljs-reserved">function&lt;/span>&lt;/span>&lt;span class="hljs-params">(error, stdout, stderr)&lt;/span>&lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span>(&lt;span class="hljs-built_in">error&lt;/span>) {
        &lt;span class="hljs-built_in">console&lt;/span>.&lt;span class="hljs-built_in">error&lt;/span>(&lt;span class="hljs-string">'error: '&lt;/span> + &lt;span class="hljs-built_in">error&lt;/span>);
        &lt;span class="hljs-regexp">//&lt;/span> &lt;span class="hljs-keyword">return&lt;/span>;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.&lt;span class="hljs-built_in">log&lt;/span>(&lt;span class="hljs-string">'stdout: '&lt;/span> + &lt;span class="hljs-built_in">stdout&lt;/span>);
    &lt;span class="hljs-built_in">console&lt;/span>.&lt;span class="hljs-built_in">log&lt;/span>(&lt;span class="hljs-string">'stderr: '&lt;/span> + &lt;span class="hljs-built_in">stderr&lt;/span>);
});</code></pre>

#### 备注事项 {#备注事项}

Note: Unlike the exec(3) POSIX system call, child_process.exec() does not replace the existing process and uses a shell to execute the command.

### child_process.execFile(file\[, args\]\[, options\][, callback]) {#child_process.execfilefile-args-options-callback}

跟`.exec()`类似，不同点在于，没有创建一个新的shell。至少有两点影响

  1. 比`child_process.exec()`效率高一些。（实际待测试）
  2. 一些操作，比如I/O重定向，文件glob等不支持。

> similar to child_process.exec() except that it spawns the command directly without first spawning a shell.

`file`： 可执行文件的名字，或者路径。

例子：

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);

child_process.execFile(&lt;span class="hljs-string">'node'&lt;/span>, [&lt;span class="hljs-string">'--version'&lt;/span>], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error){
        &lt;span class="hljs-keyword">throw&lt;/span> error;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(stdout);
});

child_process.execFile(&lt;span class="hljs-string">'/Users/a/.nvm/versions/node/v6.1.0/bin/node'&lt;/span>, [&lt;span class="hljs-string">'--version'&lt;/span>], &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error){
        &lt;span class="hljs-keyword">throw&lt;/span> error;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(stdout);
});</code></pre>

====== 扩展阅读 =======

从node源码来看，`exec()`、`execFile()`最大的差别，就在于是否创建了shell。（execFile()内部，options.shell === false），那么，可以手动设置shell。以下代码差不多是等价的。win下的shell设置有所不同，感兴趣的同学可以自己试验下。

备注：execFile()内部最终还是通过spawn()实现的， 如果没有设置 {shell: &#8216;/bin/bash&#8217;}，那么 spawm() 内部对命令的解析会有所不同，execFile(&#8216;ls -al .&#8217;) 会直接报错。

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> execFile = child_process.execFile;
&lt;span class="hljs-keyword">var&lt;/span> exec = child_process.exec;

exec(&lt;span class="hljs-string">'ls -al .'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error){
        &lt;span class="hljs-keyword">throw&lt;/span> error;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(stdout);
});

execFile(&lt;span class="hljs-string">'ls -al .'&lt;/span>, {&lt;span class="hljs-attr">shell&lt;/span>: &lt;span class="hljs-string">'/bin/bash'&lt;/span>}, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">error, stdout, stderr&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(error){
        &lt;span class="hljs-keyword">throw&lt;/span> error;
    }
    &lt;span class="hljs-built_in">console&lt;/span>.log(stdout);
});</code></pre>

### child_process.fork(modulePath\[, args\]\[, options\]) {#child_process.forkmodulepath-args-options}

创建子线程

`modulePath`：子进程运行的模块。

参数说明：（重复的参数说明就不在这里列举）

* `execPath`： 用来创建子进程的可执行文件，默认是`/usr/local/bin/node`。也就是说，你可通过`execPath`来指定具体的node可执行文件路径。（比如多个node版本）
* `execArgv`： 传给可执行文件的字符串参数列表。默认是`process.execArgv`，跟父进程保持一致。
* `silent`： 默认是`false`，即子进程的`stdio`从父进程继承。如果是`true`，则直接`pipe`向子进程的`child.stdin`、`child.stdout`等。
* `stdio`： 如果声明了`stdio`，则会覆盖`silent`选项的设置。

例子1：silent

**parent.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);

&lt;span class="hljs-comment">// 例子一：会打印出 output from the child&lt;/span>
&lt;span class="hljs-comment">// 默认情况，silent 为 false，子进程的 stdout 等&lt;/span>
&lt;span class="hljs-comment">// 从父进程继承&lt;/span>
child_process.fork(&lt;span class="hljs-string">'./child.js'&lt;/span>, {
    &lt;span class="hljs-attr">silent&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>
});

&lt;span class="hljs-comment">// 例子二：不会打印出 output from the silent child&lt;/span>
&lt;span class="hljs-comment">// silent 为 true，子进程的 stdout 等&lt;/span>
&lt;span class="hljs-comment">// pipe 向父进程&lt;/span>
child_process.fork(&lt;span class="hljs-string">'./silentChild.js'&lt;/span>, {
    &lt;span class="hljs-attr">silent&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>
});

&lt;span class="hljs-comment">// 例子三：打印出 output from another silent child&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> child = child_process.fork(&lt;span class="hljs-string">'./anotherSilentChild.js'&lt;/span>, {
    &lt;span class="hljs-attr">silent&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>
});

child.stdout.setEncoding(&lt;span class="hljs-string">'utf8'&lt;/span>);
child.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(data);
});</code></pre>

**child.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'output from the child'&lt;/span>);</code></pre>

**silentChild.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'output from the silent child'&lt;/span>);</code></pre>

**anotherSilentChild.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'output from another silent child'&lt;/span>);</code></pre>

例子二：ipc

parent.js

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> child = child_process.fork(&lt;span class="hljs-string">'./child.js'&lt;/span>);

child.on(&lt;span class="hljs-string">'message'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">m&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'message from child: '&lt;/span> + &lt;span class="hljs-built_in">JSON&lt;/span>.stringify(m));
});

child.send({&lt;span class="hljs-attr">from&lt;/span>: &lt;span class="hljs-string">'parent'&lt;/span>});</code></pre>

<pre class="javascript"><code class="hljs hljs ">process.on(&lt;span class="hljs-string">'message'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">m&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'message from parent: '&lt;/span> + &lt;span class="hljs-built_in">JSON&lt;/span>.stringify(m));
});

process.send({&lt;span class="hljs-attr">from&lt;/span>: &lt;span class="hljs-string">'child'&lt;/span>});</code></pre>

运行结果

<pre class="powershell"><code class="hljs hljs cs">➜  ipc git:(master) ✗ node parent.js
message &lt;span class="hljs-keyword">from&lt;/span> child: {&lt;span class="hljs-string">"from"&lt;/span>:&lt;span class="hljs-string">"child"&lt;/span>}
message &lt;span class="hljs-keyword">from&lt;/span> parent: {&lt;span class="hljs-string">"from"&lt;/span>:&lt;span class="hljs-string">"parent"&lt;/span>}</code></pre>

例子三：execArgv

首先，process.execArgv的定义，参考[这里][1]。设置`execArgv`的目的一般在于，让子进程跟父进程保持相同的执行环境。

比如，父进程指定了`--harmony`，如果子进程没有指定，那么就要跪了。

parent.js

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'parent execArgv: '&lt;/span> + process.execArgv);

child_process.fork(&lt;span class="hljs-string">'./child.js'&lt;/span>, {
    &lt;span class="hljs-attr">execArgv&lt;/span>: process.execArgv
});</code></pre>

child.js

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'child execArgv: '&lt;/span> + process.execArgv);</code></pre>

运行结果

<pre class="powershell"><code class="hljs hljs bash">➜  &lt;span class="hljs-keyword">exec&lt;/span>Argv git:(master) ✗ node --harmony parent.js
parent &lt;span class="hljs-keyword">exec&lt;/span>Argv: --harmony
child &lt;span class="hljs-keyword">exec&lt;/span>Argv: --harmony</code></pre>

例子3：execPath（TODO 待举例子）

### child_process.spawn(command\[, args\]\[, options\]) {#child_process.spawncommand-args-options}

`command`：要执行的命令

options参数说明：

* `argv0`：[String] 这货比较诡异，在uninx、windows上表现不一样。有需要再深究。
* `stdio`：[Array] | [String] 子进程的stdio。参考[这里][2]
* `detached`：[Boolean] 让子进程独立于父进程之外运行。同样在不同平台上表现有差异，具体参考[这里][3]
* `shell`：[Boolean] | [String] 如果是`true`，在shell里运行程序。默认是`false`。（很有用，比如 可以通过 /bin/sh -c xxx 来实现 .exec() 这样的效果）

例子1：基础例子

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">var&lt;/span> ls = spawn(&lt;span class="hljs-string">'ls'&lt;/span>, [&lt;span class="hljs-string">'-al'&lt;/span>]);

ls.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'data from child: '&lt;/span> + data);
});

ls.stderr.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'error from child: '&lt;/span> + data);
});

ls.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'child exists with code: '&lt;/span> + code);
});</code></pre>

例子2：声明stdio

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">var&lt;/span> ls = spawn(&lt;span class="hljs-string">'ls'&lt;/span>, [&lt;span class="hljs-string">'-al'&lt;/span>], {
    &lt;span class="hljs-attr">stdio&lt;/span>: &lt;span class="hljs-string">'inherit'&lt;/span>
});

ls.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'child exists with code: '&lt;/span> + code);
});</code></pre>

例子3：声明使用shell

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;

&lt;span class="hljs-comment">// 运行 echo "hello nodejs" | wc&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> ls = spawn(&lt;span class="hljs-string">'bash'&lt;/span>, [&lt;span class="hljs-string">'-c'&lt;/span>, &lt;span class="hljs-string">'echo "hello nodejs" | wc'&lt;/span>], {
    &lt;span class="hljs-attr">stdio&lt;/span>: &lt;span class="hljs-string">'inherit'&lt;/span>,
    &lt;span class="hljs-attr">shell&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>
});

ls.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'child exists with code: '&lt;/span> + code);
});</code></pre>

例子4：错误处理，包含两种场景，这两种场景有不同的处理方式。

* 场景1：命令本身不存在，创建子进程报错。
* 场景2：命令存在，但运行过程报错。

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">var&lt;/span> child = spawn(&lt;span class="hljs-string">'bad_command'&lt;/span>);

child.on(&lt;span class="hljs-string">'error'&lt;/span>, (err) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'Failed to start child process 1.'&lt;/span>);
});

&lt;span class="hljs-keyword">var&lt;/span> child2 = spawn(&lt;span class="hljs-string">'ls'&lt;/span>, [&lt;span class="hljs-string">'nonexistFile'&lt;/span>]);

child2.stderr.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'Error msg from process 2: '&lt;/span> + data);
});

child2.on(&lt;span class="hljs-string">'error'&lt;/span>, (err) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'Failed to start child process 2.'&lt;/span>);
});</code></pre>

运行结果如下。

<pre class="powershell"><code class="hljs hljs sql">➜  spawn git:(master) ✗ node error/error.js
Failed to &lt;span class="hljs-operator">&lt;span class="hljs-keyword">start&lt;/span> child &lt;/span>&lt;span class="hljs-keyword">&lt;span class="hljs-operator">process&lt;/span>&lt;/span> &lt;span class="hljs-number">&lt;span class="hljs-operator">1&lt;/span>&lt;/span>&lt;span class="hljs-operator">&lt;span class="hljs-number">.&lt;/span>
Error msg &lt;span class="hljs-keyword">from&lt;/span> &lt;/span>&lt;span class="hljs-keyword">&lt;span class="hljs-operator">process&lt;/span>&lt;/span> &lt;span class="hljs-number">&lt;span class="hljs-operator">2&lt;/span>&lt;/span>&lt;span class="hljs-operator">: ls: nonexistFile: &lt;span class="hljs-keyword">No&lt;/span> such file &lt;span class="hljs-keyword">or&lt;/span> directory&lt;/span></code></pre>

例子5：echo &#8220;hello nodejs&#8221; | grep &#8220;nodejs&#8221;

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-comment">// echo "hello nodejs" | grep "nodejs"&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> echo = child_process.spawn(&lt;span class="hljs-string">'echo'&lt;/span>, [&lt;span class="hljs-string">'hello nodejs'&lt;/span>]);
&lt;span class="hljs-keyword">var&lt;/span> grep = child_process.spawn(&lt;span class="hljs-string">'grep'&lt;/span>, [&lt;span class="hljs-string">'nodejs'&lt;/span>]);

grep.stdout.setEncoding(&lt;span class="hljs-string">'utf8'&lt;/span>);

echo.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    grep.stdin.write(data);
});

echo.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(code!==&lt;span class="hljs-number">0&lt;/span>){
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'echo exists with code: '&lt;/span> + code);
    }
    grep.stdin.end();
});

grep.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'grep: '&lt;/span> + data);
});

grep.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(code!==&lt;span class="hljs-number">0&lt;/span>){
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'grep exists with code: '&lt;/span> + code);
    }
});</code></pre>

运行结果：

<pre class="powershell"><code class="hljs hljs perl">➜  spawn git:(master) ✗ node &lt;span class="hljs-keyword">pipe&lt;/span>/&lt;span class="hljs-keyword">pipe&lt;/span>.js
&lt;span class="hljs-keyword">grep&lt;/span>: hello nodejs</code></pre>

## 关于`options.stdio` {#关于options.stdio}

默认值：[&#8216;pipe&#8217;, &#8216;pipe&#8217;, &#8216;pipe&#8217;]，这意味着：

  1. child.stdin、child.stdout 不是`undefined`
  2. 可以通过监听 `data` 事件，来获取数据。

### 基础例子 {#基础例子}

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">var&lt;/span> ls = spawn(&lt;span class="hljs-string">'ls'&lt;/span>, [&lt;span class="hljs-string">'-al'&lt;/span>]);

ls.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'data from child: '&lt;/span> + data);
});

ls.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'child exists with code: '&lt;/span> + code);
});</code></pre>

### 通过child.stdin.write()写入 {#通过child.stdin.write写入}

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">var&lt;/span> grep = spawn(&lt;span class="hljs-string">'grep'&lt;/span>, [&lt;span class="hljs-string">'nodejs'&lt;/span>]);

setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    grep.stdin.write(&lt;span class="hljs-string">'hello nodejs \n hello javascript'&lt;/span>);
    grep.stdin.end();
}, &lt;span class="hljs-number">2000&lt;/span>);

grep.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">data&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'data from grep: '&lt;/span> + data);
});

grep.on(&lt;span class="hljs-string">'close'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">code&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'grep exists with code: '&lt;/span> + code);
});</code></pre>

## 异步 vs 同步 {#异步-vs-同步}

大部分时候，子进程的创建是异步的。也就是说，它不会阻塞当前的事件循环，这对于性能的提升很有帮助。

当然，有的时候，同步的方式会更方便（阻塞事件循环），比如通过子进程的方式来执行shell脚本时。

node同样提供同步的版本，比如：

* spawnSync()
* execSync()
* execFileSync()

## 关于`options.detached` {#关于options.detached}

由于木有在windows上做测试，于是先贴原文

> On Windows, setting options.detached to true makes it possible for the child process to continue running after the parent exits. The child will have its own console window. Once enabled for a child process, it cannot be disabled.

在非window是平台上的表现

> On non-Windows platforms, if options.detached is set to true, the child process will be made the leader of a new process group and session. Note that child processes may continue running after the parent exits regardless of whether they are detached or not. See setsid(2) for more information.

### 默认情况：父进程等待子进程结束。 {#默认情况父进程等待子进程结束}

子进程。可以看到，有个定时器一直在跑

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> times = &lt;span class="hljs-number">0&lt;/span>;
setInterval(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(++times);
}, &lt;span class="hljs-number">1000&lt;/span>);</code></pre>

运行下面代码，会发现父进程一直hold着不退出。

<pre><code class="hljs javascript hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);
child_process.spawn(&lt;span class="hljs-string">'node'&lt;/span>, [&lt;span class="hljs-string">'child.js'&lt;/span>], {
    &lt;span class="hljs-comment">// stdio: 'inherit'&lt;/span>
});</code></pre>

### 通过child.unref()让父进程退出 {#通过child.unref让父进程退出}

调用`child.unref()`，将子进程从父进程的事件循环中剔除。于是父进程可以愉快的退出。这里有几个要点

  1. 调用`child.unref()`
  2. 设置`detached`为`true`
  3. 设置`stdio`为`ignore`（这点容易忘）

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> child = child_process.spawn(&lt;span class="hljs-string">'node'&lt;/span>, [&lt;span class="hljs-string">'child.js'&lt;/span>], {
    &lt;span class="hljs-attr">detached&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
    &lt;span class="hljs-attr">stdio&lt;/span>: &lt;span class="hljs-string">'ignore'&lt;/span>  &lt;span class="hljs-comment">// 备注：如果不置为 ignore，那么 父进程还是不会退出&lt;/span>
    &lt;span class="hljs-comment">// stdio: 'inherit'&lt;/span>
});

child.unref();</code></pre>

### 将`stdio`重定向到文件 {#将stdio重定向到文件}

除了直接将stdio设置为`ignore`，还可以将它重定向到本地的文件。

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">var&lt;/span> child_process = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> fs = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'fs'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> out = fs.openSync(&lt;span class="hljs-string">'./out.log'&lt;/span>, &lt;span class="hljs-string">'a'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> err = fs.openSync(&lt;span class="hljs-string">'./err.log'&lt;/span>, &lt;span class="hljs-string">'a'&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> child = child_process.spawn(&lt;span class="hljs-string">'node'&lt;/span>, [&lt;span class="hljs-string">'child.js'&lt;/span>], {
    &lt;span class="hljs-attr">detached&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
    &lt;span class="hljs-attr">stdio&lt;/span>: [&lt;span class="hljs-string">'ignore'&lt;/span>, out, err]
});

child.unref();</code></pre>

## exec()与execFile()之间的区别 {#exec与execfile之间的区别}

首先，exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现。

> exec() -> execFile() -> spawn()

其次，execFile() 内部默认将 options.shell 设置为false，exec() 默认不是false。

## Class: ChildProcess {#class-childprocess}

* 通过`child_process.spawn()`等创建，一般不直接用构造函数创建。
* 继承了`EventEmitters`，所以有`.on()`等方法。

## 各种事件 {#各种事件}

### close {#close}

当stdio流关闭时触发。这个事件跟`exit`不同，因为多个进程可以共享同个stdio流。  
参数：code（退出码，如果子进程是自己退出的话），signal（结束子进程的信号）  
问题：code一定是有的吗？（从对code的注解来看好像不是）比如用`kill`杀死子进程，那么，code是？

### exit {#exit}

参数：code、signal，如果子进程是自己退出的，那么`code`就是退出码，否则为null；如果子进程是通过信号结束的，那么，`signal`就是结束进程的信号，否则为null。这两者中，一者肯定不为null。  
注意事项：`exit`事件触发时，子进程的stdio stream可能还打开着。（场景？）此外，nodejs监听了SIGINT和SIGTERM信号，也就是说，nodejs收到这两个信号时，不会立刻退出，而是先做一些清理的工作，然后重新抛出这两个信号。（目测此时js可以做清理工作了，比如关闭数据库等。）

SIGINT：interrupt，程序终止信号，通常在用户按下CTRL+C时发出，用来通知前台进程终止进程。  
SIGTERM：terminate，程序结束信号，该信号可以被阻塞和处理，通常用来要求程序自己正常退出。shell命令kill缺省产生这个信号。如果信号终止不了，[我们](https://www.w3cdoc.com)才会尝试SIGKILL（强制终止）。

> Also, note that Node.js establishes signal handlers for SIGINT and SIGTERM and Node.js processes will not terminate immediately due to receipt of those signals. Rather, Node.js will perform a sequence of cleanup actions and then will re-raise the handled signal.

### error {#error}

当发生下列事情时，error就会被触发。当error触发时，exit可能触发，也可能不触发。（内心是崩溃的）

* 无法创建子进程。
* 进程无法kill。（TODO 举例子）
* 向子进程发送消息失败。（TODO 举例子）

### message {#message}

当采用`process.send()`来发送消息时触发。  
参数：`message`，为json对象，或者primitive value；`sendHandle`，net.Socket对象，或者net.Server对象（熟悉cluster的同学应该对这个不陌生）

**.connected**：当调用`.disconnected()`时，设为false。代表是否能够从子进程接收消息，或者对子进程发送消息。

**.disconnect()**：关闭父进程、子进程之间的IPC通道。当这个方法被调用时，`disconnect`事件就会触发。如果子进程是node实例（通过child_process.fork()创建），那么在子进程内部也可以主动调用`process.disconnect()`来终止IPC通道。参考[process.disconnect][4]。

## 非重要的备忘点 {#非重要的备忘点}

### windows平台上的`cmd`、`bat` {#windows平台上的cmdbat}

> The importance of the distinction between child\_process.exec() and child\_process.execFile() can vary based on platform. On Unix-type operating systems (Unix, Linux, OSX) child\_process.execFile() can be more efficient because it does not spawn a shell. On Windows, however, .bat and .cmd files are not executable on their own without a terminal, and therefore cannot be launched using child\_process.execFile(). When running on Windows, .bat and .cmd files can be invoked using child\_process.spawn() with the shell option set, with child\_process.exec(), or by spawning cmd.exe and passing the .bat or .cmd file as an argument (which is what the shell option and child_process.exec() do).

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-comment">// On Windows Only ...&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> spawn = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).spawn;
&lt;span class="hljs-keyword">const&lt;/span> bat = spawn(&lt;span class="hljs-string">'cmd.exe'&lt;/span>, [&lt;span class="hljs-string">'/c'&lt;/span>, &lt;span class="hljs-string">'my.bat'&lt;/span>]);

bat.stdout.on(&lt;span class="hljs-string">'data'&lt;/span>, (data) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(data);
});

bat.stderr.on(&lt;span class="hljs-string">'data'&lt;/span>, (data) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(data);
});

bat.on(&lt;span class="hljs-string">'exit'&lt;/span>, (code) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">`Child exited &lt;span class="hljs-keyword">with&lt;/span> code &lt;span class="hljs-subst">${code}&lt;/span>`&lt;/span>);
});

&lt;span class="hljs-comment">// OR...&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> exec = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).exec;
exec(&lt;span class="hljs-string">'my.bat'&lt;/span>, (err, stdout, stderr) =&gt; {
  &lt;span class="hljs-keyword">if&lt;/span> (err) {
    &lt;span class="hljs-built_in">console&lt;/span>.error(err);
    &lt;span class="hljs-keyword">return&lt;/span>;
  }
  &lt;span class="hljs-built_in">console&lt;/span>.log(stdout);
});</code></pre>

### 进程标题 {#进程标题}

Note: Certain platforms (OS X, Linux) will use the value of argv[0] for the process title while others (Windows, SunOS) will use command.

Note: Node.js currently overwrites argv[0] with process.execPath on startup, so process.argv[0] in a Node.js child process will not match the argv0 parameter passed to spawn from the parent, retrieve it with the process.argv0 property instead.

### 代码运行次序的问题 {#代码运行次序的问题}

**p.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-keyword">const&lt;/span> cp = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>);
&lt;span class="hljs-keyword">const&lt;/span> n = cp.fork(&lt;span class="hljs-string">`&lt;span class="hljs-subst">${__dirname}&lt;/span>/sub.js`&lt;/span>);

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'1'&lt;/span>);

n.on(&lt;span class="hljs-string">'message'&lt;/span>, (m) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'PARENT got message:'&lt;/span>, m);
});

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'2'&lt;/span>);

n.send({ &lt;span class="hljs-attr">hello&lt;/span>: &lt;span class="hljs-string">'world'&lt;/span> });

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'3'&lt;/span>);</code></pre>

**sub.js**

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'4'&lt;/span>);
process.on(&lt;span class="hljs-string">'message'&lt;/span>, (m) =&gt; {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'CHILD got message:'&lt;/span>, m);
});

process.send({ &lt;span class="hljs-attr">foo&lt;/span>: &lt;span class="hljs-string">'bar'&lt;/span> });
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'5'&lt;/span>);</code></pre>

运行`node p.js`，打印出来的内容如下

<pre class="powershell"><code class="hljs hljs css">➜  &lt;span class="hljs-tag">ch&lt;/span> &lt;span class="hljs-tag">node&lt;/span> &lt;span class="hljs-tag">p&lt;/span>&lt;span class="hljs-class">.js&lt;/span>
&lt;span class="hljs-number">1&lt;/span>
&lt;span class="hljs-number">2&lt;/span>
&lt;span class="hljs-number">3&lt;/span>
&lt;span class="hljs-number">4&lt;/span>
&lt;span class="hljs-number">5&lt;/span>
&lt;span class="hljs-tag">PARENT&lt;/span> &lt;span class="hljs-tag">got&lt;/span> &lt;span class="hljs-tag">message&lt;/span>: &lt;span class="hljs-rules">{ &lt;span class="hljs-rule">&lt;span class="hljs-attribute">foo&lt;/span>: &lt;/span>&lt;/span>&lt;span class="hljs-string">&lt;span class="hljs-rules">&lt;span class="hljs-rule">&lt;span class="hljs-value">'bar'&lt;/span>&lt;/span>&lt;/span>&lt;/span> }
&lt;span class="hljs-tag">CHILD&lt;/span> &lt;span class="hljs-tag">got&lt;/span> &lt;span class="hljs-tag">message&lt;/span>: &lt;span class="hljs-rules">{ &lt;span class="hljs-rule">&lt;span class="hljs-attribute">hello&lt;/span>: &lt;/span>&lt;/span>&lt;span class="hljs-string">&lt;span class="hljs-rules">&lt;span class="hljs-rule">&lt;span class="hljs-value">'world'&lt;/span>&lt;/span>&lt;/span>&lt;/span> }</code></pre>

再来个例子

<pre class="javascript"><code class="hljs hljs ">&lt;span class="hljs-comment">// p2.js&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> fork = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'child_process'&lt;/span>).fork;

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'p: 1'&lt;/span>);

fork(&lt;span class="hljs-string">'./c2.js'&lt;/span>);

&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'p: 2'&lt;/span>);

&lt;span class="hljs-comment">// 从测试结果来看，同样是70ms，有的时候，定时器回调比子进程先执行，有的时候比子进程慢执行。&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> t = &lt;span class="hljs-number">70&lt;/span>;
setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>&lt;span class="hljs-params">(&lt;/span>&lt;span class="hljs-params">)&lt;/span>&lt;/span>&lt;span class="hljs-function">{&lt;/span>
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'p: 3 in %s'&lt;/span>, t);
}, t);

&lt;span class="hljs-comment">// c2.js&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'c: 1'&lt;/span>);</code></pre>

### 关于NODE\_CHANNEL\_FD {#关于node_channel_fd}

child\_process.fork()时，如果指定了execPath，那么父、子进程间通过NODE\_CHANNEL_FD 进行通信。

> Node.js processes launched with a custom execPath will communicate with the parent process using the file descriptor (fd) identified using the environment variable NODE\_CHANNEL\_FD on the child process. The input and output on this fd is expected to be line delimited JSON objects.

## 相关链接 {#相关链接}

官方文档：<https://nodejs.org/api/child_process.html>{.uri}

 [1]: https://nodejs.org/api/process.html#process_process_execargv
 [2]: https://nodejs.org/api/child_process.html#child_process_options_stdio
 [3]: https://nodejs.org/api/child_process.html#child_process_options_detached
 [4]: https://nodejs.org/api/process.html#process_process_disconnect
