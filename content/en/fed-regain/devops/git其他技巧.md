---
title: 彻底搞懂 Git-Rebase

---
在这个安静的深夜，翻开我的博客，本想着记录一下看到的git的知识点，却无意中找到了3年前写的一篇博客，恍如隔世啊。生活真的需要有勇气作出改变。最喜欢GitHub了，能找到许多很好的项目，真的可以学到好多知识，节省时间。虽然自己也在黑gitHub的免费空间的功能，但是真心谢谢GitHub。好长时间都想写个自己用git的经验和总结，都没时间，今天必须写写。

![git其他技巧][1]

### git之rebase与merge

今天更新了vscode，突然发现多了好多汉化。比如git rebase就翻译成了“变基”，其实想想这个翻译还是很准确的。于是查了一下git rebase的操作。git中有很多可以rebase的过程，pull时候可以，merge时候也可以。

#### 一、起因 {#一、起因}

上线构建的过程中扫了一眼代码变更，突然发现，`commit` 提交竟然多达 `62` 次。[我们](https://www.w3cdoc.com)来看看都提交了什么东西：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/commit1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/commit1.png?x-oss-process=image/format,webp" alt="commit1" />

这里[我们](https://www.w3cdoc.com)先不说 `git` [提交规范][2]，就单纯这么多次无用的 `commit` 就很让人不舒服。可能很多人觉得无所谓，无非是多了一些提交纪录。

<div class="alert danger">
 然而，并非如此，你可能听过破窗效应，编程也是如此！
</div>

#### 二、导致问题 {#二、导致问题}

1.不利于代码 `review`  
设想一下，你要做 `code review` ，结果一个很小的功能，提交了 `60` 多次，会不会有一些崩溃？

2.会造成分支污染  
你的项目充满了无用的 `commit` 纪录，如果有一天线上出现了紧急问题，你需要回滚代码，却发现海量的 `commit` 需要一条条来看。

<div class="alert info">
 遵循项目规范才能提高团队协作效率，而不是随心所欲。
</div>

#### 三、Rebase 场景一：如何合并多次提交纪录？ {#三、Rebase-场景一：如何合并多次提交纪录？}

<div class="alert success">
 基于上面所说问题，[我们](https://www.w3cdoc.com)不难想到：每一次功能开发， 对多个 commit 进行合并处理。
</div>

这时候就需要用到 `git rebase` 了。这个命令没有太难，不常用可能源于不熟悉，所以[我们](https://www.w3cdoc.com)来通过示例学习一下。

1.[我们](https://www.w3cdoc.com)来合并最近的 4 次提交纪录，执行：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git rebase -i HEAD~4</span></pre>
    </td>
  </tr>
</table></figure>

2.这时候，会自动进入 `vi` 编辑模式：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">s cacc52da add: qrcode</span>
<span class="line">s f072ef48 up
<span class="line">s 4e84901a feat: add indexedDB floder</span>
<span class="line">s 8f33126c feat: add test2.js</span>

<span class="line"># Rebase 5f2452b2..8f33126c onto 5f2452b2 (4 commands)</span>
<span class="line">#</span>
<span class="line"># Commands:</span>
<span class="line"># p, pick = use commit</span>
<span class="line"># r, reword = use commit, but edit the commit message</span>
<span class="line"># e, edit = use commit, but stop for amending</span>
<span class="line"># s, squash = use commit, but meld into previous commit</span>
<span class="line"># f, fixup = like "squash", but discard this commit's log message</span>
<span class="line"># x, exec = run command (the rest of the line) using shell</span>
<span class="line"># d, drop = remove commit</span>
<span class="line">#</span>
<span class="line"># These lines can be re-ordered; they are executed from top to bottom.</span>
<span class="line">#</span>
<span class="line"># If you remove a line here THAT COMMIT WILL BE LOST.</span>
<span class="line">#</span>
<span class="line"># However, if you remove everything, the rebase will be aborted.</span>
<span class="line">#</span></pre>
    </td>
  </tr>
</table></figure>

有几个命令需要注意一下：

* p, pick = use commit
* r, reword = use commit, but edit the commit message
* e, edit = use commit, but stop for amending
* s, squash = use commit, but meld into previous commit
* f, fixup = like “squash”, but discard this commit’s log message
* x, exec = run command (the rest of the line) using shell
* d, drop = remove commit

按照如上命令来修改你的提交纪录：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">s cacc52da add: qrcode</span>
<span class="line">s f072ef48 up
<span class="line">s 4e84901a feat: add indexedDB floder</span>
<span class="line">p 8f33126c feat: add test2.js</span></pre>
    </td>
  </tr>
</table></figure>

3.如果保存的时候，你碰到了这个错误：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">error: cannot 'squash' without a previous commit</span></pre>
    </td>
  </tr>
</table></figure>

<div class="alert danger">
 注意不要合并先前提交的东西，也就是已经提交远程分支的纪录。
</div>

4.如果你异常退出了 `vi` 窗口，不要紧张：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git rebase --edit-todo</span></pre>
    </td>
  </tr>
</table></figure>

这时候会一直处在这个编辑的模式里，[我们](https://www.w3cdoc.com)可以回去继续编辑，修改完保存一下：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git rebase --continue</span></pre>
    </td>
  </tr>
</table></figure>

5.查看结果<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git log</span></pre>
    </td>
  </tr>
</table></figure>

<div class="alert info">
 三次提交合并成了一次，减少了无用的提交信息。
</div>

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/commit2.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/commit2.png?x-oss-process=image/format,webp" alt="commit2" />

#### 四、Rebase 场景二：分支合并 {#四、Rebase-场景二：分支合并}

1.[我们](https://www.w3cdoc.com)先从 `master` 分支切出一个 `dev` 分支，进行开发：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git:(master) git checkout -b feature1</span></pre>
    </td>
  </tr>
</table></figure>

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git1-1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git1-1.png?x-oss-process=image/format,webp" alt="git1" />  
2.这时候，你的同事完成了一次 `hotfix`，并合并入了 `master` 分支，此时 `master` 已经领先于你的 `feature1` 分支了：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git2-1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git2-1.png?x-oss-process=image/format,webp" alt="git2" />  
3.恰巧，[我们](https://www.w3cdoc.com)想要同步 `master` 分支的改动，首先想到了 `merge`，执行：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git:(feature1) git merge master</span></pre>
    </td>
  </tr>
</table></figure>

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git3.png?x-oss-process=image/format,webp" alt="git3" />  
图中绿色的点就是[我们](https://www.w3cdoc.com)合并之后的结果，执行：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git:(feature1) git log</span></pre>
    </td>
  </tr>
</table></figure>

就会在记录里发现一些 `merge` 的信息，但是[我们](https://www.w3cdoc.com)觉得这样污染了 `commit` 记录，想要保持一份干净的 `commit`，怎么办呢？这时候，`git rebase` 就派上用场了。

4.让[我们](https://www.w3cdoc.com)来试试 `git rebase` ，先回退到同事 `hotfix` 后合并 `master` 的步骤：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git4.png?x-oss-process=image/format,webp" alt="git4" />  
5.使用 `rebase` 后来看看结果：<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git:(feature1) git rebase master</span></pre>
    </td>
  </tr>
</table></figure>

<div class="alert info">
 这里补充一点：<code>rebase</code> 做了什么操作呢？
</div>

首先，`git` 会把 `feature1` 分支里面的每个 `commit` 取消掉；  
其次，把上面的操作临时保存成 `patch` 文件，存在 `.git/rebase` 目录下；  
然后，把 `feature1` 分支更新到最新的 `master` 分支；  
最后，把上面保存的 `patch` 文件应用到 `feature1` 分支上；

<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git5.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git5.png?x-oss-process=image/format,webp" alt="git5" />

从 `commit` 记录[我们](https://www.w3cdoc.com)可以看出来，`feature1` 分支是基于 `hotfix` 合并后的 `master` ，自然而然的成为了最领先的分支，而且没有 `merge` 的 `commit` 记录，是不是感觉很舒服了。

6.在 `rebase` 的过程中，也许会出现冲突 `conflict`。在这种情况，`git` 会停止 `rebase` 并会让你去解决冲突。在解决完冲突后，用 `git add` 命令去更新这些内容。

<div class="alert warning">
 注意，你无需执行 git-commit，只要执行 continue
</div><figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git rebase --continue</span></pre>
    </td>
  </tr>
</table></figure>

这样 `git` 会继续应用余下的 `patch` 补丁文件。

7.在任何时候，[我们](https://www.w3cdoc.com)都可以用 `--abort` 参数来终止 `rebase` 的行动，并且分支会回到 `rebase` 开始前的状态。<figure class="highlight plain">

<table>
  <tr>
    <td class="code">
      <pre><span class="line">git rebase —abort</span></pre>
    </td>
  </tr>
</table></figure>

#### 五、更多 Rebase 的使用场景 {#五、更多-Rebase-的使用场景}

<div class="alert info">
 git-rebase 存在的价值是：对一个分支做「变基」操作。
</div>

1.当[我们](https://www.w3cdoc.com)在一个过时的分支上面开发的时候，执行 `rebase` 以此同步 `master` 分支最新变动；  
2.假如[我们](https://www.w3cdoc.com)要启动一个放置了很久的并行工作，现在有时间来继续这件事情，很显然这个分支已经落后了。这时候需要在最新的基准上面开始工作，所以 `rebase` 是最合适的选择。

#### 六、为什么会是危险操作？ {#六、为什么会是危险操作？}

根据上文来看，`git-rebase` 很完美，解决了[我们](https://www.w3cdoc.com)的两个问题：  
1.合并 `commit` 记录，保持分支整洁；  
2.相比 `merge` 来说会减少分支合并的记录；

如果你提交了代码到远程，提交前是这样的：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git2-1.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git2-1.png?x-oss-process=image/format,webp" alt="git2" />

提交后远程分支变成了这样：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git5.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git5.png?x-oss-process=image/format,webp" alt="git5" />

而此时你的同事也在 `feature1` 上开发，他的分支依然还是：  
<img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git6.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2017/08/git6.png?x-oss-process=image/format,webp" alt="git6" />

那么当他 `pull` 远程 `master` 的时候，就会有丢失提交纪录。这就是为什么[我们](https://www.w3cdoc.com)经常听到有人说 `git rebase` 是一个危险命令，因为它改变了历史，[我们](https://www.w3cdoc.com)应该谨慎使用。

<div class="alert info">
 除非你可以肯定该 <code>feature1</code> 分支只有你自己使用，否则请谨慎操作。
</div>

结论：只要你的分支上需要 `rebase` 的所有 `commits` 历史还没有被 `push` 过，就可以安全地使用 `git-rebase`来操作。

#### 七、参考： {#七、参考：}

<a href="http://gitbook.liuhui998.com/4_2.html" target="_blank" rel="noopener noreferrer">rebase</a>  
<a href="https://cloud.tencent.com/developer/news/231201" target="_blank" rel="noopener noreferrer">git-rebase 使用总结</a>  
<a href="https://blog.csdn.net/gtlbtnq9mr3/article/details/80222523" target="_blank" rel="noopener noreferrer">git 中的 rebase操作</a>  
<a href="https://www.cnblogs.com/kidsitcn/p/5339382.html" target="_blank" rel="noopener noreferrer">git-rebase vs git-merge 详解</a>

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/git-2.png
 [2]: http://jartto.wang/2018/07/08/git-commit/
