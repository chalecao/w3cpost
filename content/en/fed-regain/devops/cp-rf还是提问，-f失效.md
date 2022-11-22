---
title: cp -rf还是提问，-f失效


date: 2020-02-10T08:29:15+00:00
url: /pwa/5603.html
views:
  - 677
like:
  - 1


---
先执行：alias命令看下

<pre class="EnlighterJSRAW" data-enlighter-language="null"># alias
alias cp='cp -i'
alias dbh='/root/flyway-5.1.4/myflyway.sh -h'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias hdemo='/root/flyway-5.1.4/demoflyway.sh -h'
alias i='/root/flyway-5.1.4/myflyway.sh info'
alias idemo='/root/flyway-5.1.4/demoflyway.sh info'
alias l.='ls -d .* --color=auto'
alias ll='ls -l --color=auto'
alias ls='ls --color=auto'
alias m='/root/flyway-5.1.4/myflyway.sh migrate'
alias mdemo='/root/flyway-5.1.4/demoflyway.sh migrate'
alias mv='mv -i'
alias r='/root/flyway-5.1.4/myflyway.sh repair'
alias rm='rm -i'
alias which='alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'</pre>

cp被alias了, 那么就容易办了

1.在命令前加反斜杠 \cp ,跳过alias运行命令：

`\cp -rf /home/file /data/file`

2.取消cp命令的别名（在Centos系统默认已经配置）

`unalias cp #取消别名`

修改~/.bashrc，在“alias cp=&#8217;cp -i&#8217;”前添加#号注释后即可。

<pre class="EnlighterJSRAW" data-enlighter-language="null">root@localhost# vi ~/.bashrc 

# .bashrc

# User specific aliases and functions

alias rm='rm -i'
#alias cp='cp -i'
alias mv='mv -i'

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi


root@localhost#source ~/.bashrc</pre>

3.网上看到还有一种方法（使用前最好先测试）

`yes | cp -rf /home/file /data/file`