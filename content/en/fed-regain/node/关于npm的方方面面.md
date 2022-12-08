---
title: 关于NPM的方方面面



---

<div>
  <div>
    
      <img loading="lazy" width="500" height="300" class="alignnone size-full wp-image-3790 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7b7a5241b33.jpeg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7b7a5241b33.jpeg?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7b7a5241b33.jpeg?x-oss-process=image/format,webp 500w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/img_5c7b7a5241b33.jpeg?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_180/format,webp 300w" sizes="(max-width: 500px) 100vw, 500px" />nodejs 社区乃至 Web [前端](https://www.w3cdoc.com)工程化领域发展到今天，作为 node 自带的包管理工具的 npm 已经成为每个[前端](https://www.w3cdoc.com)开发者必备的工具。但是现实状况是，[我们](https://www.w3cdoc.com)很多人对这个nodejs基础设施的使用和了解还停留在: 会用 <code>npm install</code> 这里（一言不合就删除整个 node_modules 目录然后重新 install 这种事你没做过吗？）
    

    
      当然 npm 能成为现在世界上最大规模的包管理系统，很大程度上确实归功于它足够用户友好，你看即使我只会执行 install 也不必太担心出什么大岔子. 但是 npm 的功能远不止于 install 一下那么简单，这篇文章帮你扒一扒那些你可能不知道的 npm 原理、特性、技巧，以及（我认为的）最佳实践。
    
    
    
      <s>你懒得读的 npm 文档，我帮你翻译然后试验整理过来了&#x1f436;&#x1f436;&#x1f436;</s>
    
    
    <h2 class="heading" data-id="heading-0">
      1. npm init
    

    
    
      [我们](https://www.w3cdoc.com)都知道 package.json 文件是用来定义一个 package 的描述文件, 也知道<code>npm init</code> 命令用来初始化一个简单的 package.json 文件，执行该命令后终端会依次询问 name, version, description 等字段。
    
    
    <h3 class="heading" data-id="heading-1">
      1.1 npm init 执行默认行为
    </h3>
    
    
       而如果想要偷懒步免去一直按 enter，在命令后追加 &#8211;yes 参数即可，其作用与一路下一步相同。
    
    
    
      <code>npm init --yes</code>
    
    
    <h3 class="heading" data-id="heading-2">
      1.2 自定义 npm init 行为
    </h3>
    
    
      npm init 命令的原理并不复杂，调用脚本，输出一个初始化的 package.json 文件就是了。所以相应地，定制 npm init 命令的实现方式也很简单，在 Home 目录创建一个 <code>.npm-init.js</code> 即可，该文件的 module.exports 即为 package.json 配置内容，需要获取用户输入时候，使用 <code>prompt()</code> 方法即可。
    
    
    
      例如编写这样的 ~/.npm-init.js
    
    
    <pre><code class="hljs js copyable" lang="js"><span class="hljs-keyword">const</span> desc = prompt(<span class="hljs-string">'description?'</span>, <span class="hljs-string">'A new package...'</span>)
<span class="hljs-keyword">const</span> bar = prompt(<span class="hljs-string">'bar?'</span>, <span class="hljs-string">''</span>)
<span class="hljs-keyword">const</span> count = prompt(<span class="hljs-string">'count?'</span>, <span class="hljs-string">'42'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>,
  <span class="hljs-attr">foo</span>: {
    <span class="hljs-attr">bar</span>: bar,
    <span class="hljs-attr">count</span>: count
  },
  <span class="hljs-attr">name</span>: prompt(<span class="hljs-string">'name?'</span>, process.cwd().split(<span class="hljs-string">'/'</span>).pop()),
  <span class="hljs-attr">version</span>: prompt(<span class="hljs-string">'version?'</span>, <span class="hljs-string">'0.1.0'</span>),
  <span class="hljs-attr">description</span>: desc,
  <span class="hljs-attr">main</span>: <span class="hljs-string">'index.js'</span>,
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
      此时在 ~/hello 目录下执行 <code>npm init</code> 将会得到这样的 package.json:
    
    
    <pre><code class="hljs json copyable" lang="json">{
  <span class="hljs-attr">"key"</span>: <span class="hljs-string">"value"</span>,
  <span class="hljs-attr">"foo"</span>: {
    <span class="hljs-attr">"bar"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"count"</span>: <span class="hljs-string">"42"</span>
  },
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"hello"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A new package..."</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
      除了生成 package.json, 因为 .npm-init.js 是一个常规的模块，意味着[我们](https://www.w3cdoc.com)可以执行随便什么 node 脚本可以执行的任务。例如通过 fs 创建 README, .eslintrc 等项目必需文件，实现项目脚手架的作用。
    
    
    <h2 class="heading" data-id="heading-3">
      2. 依赖包安装
    

    
    
      依赖管理是 npm 的核心功能，原理就是执行 <code>npm install</code> 从 package.json 中的 dependencies, devDependencies 将依赖包安装到当前目录的 ./node_modules 文件夹中。
    
    
    <h3 class="heading" data-id="heading-4">
      2.1 package定义
    </h3>
    
    
      [我们](https://www.w3cdoc.com)都知道要手动安装一个包时，执行 <code>npm install <package></code> 命令即可。这里的第三个参数 package 通常就是[我们](https://www.w3cdoc.com)所要安装的包名，默认配置下 npm 会从默认的源 (Registry) 中查找该包名对应的包地址，并下载安装。但在 npm 的世界里，除了简单的指定包名, package 还可以是一个指向有效包名的 http url/git url/文件夹路径。
    
    
    
      阅读 <a href="https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Fgetting-started%2Fpackages%23what-is-a-package-" target="_blank" rel="nofollow noopener noreferrer">npm的文档</a>， [我们](https://www.w3cdoc.com)会发现package 准确的定义，只要符合以下 a) 到 g) 其中之一条件，就是一个 package:
    
    
    <table>
      <tr>
        <th>
          #
        </th>
        
        <th>
          说明
        </th>
        
        <th>
          例子
        </th>
      </tr>
      
      <tr>
        <td>
          a)
        </td>
        
        <td>
          一个包含了程序和描述该程序的 package.json 文件 的文件夹
        </td>
        
        <td>
          ./local-module/
        </td>
      </tr>
      
      <tr>
        <td>
          b)
        </td>
        
        <td>
          一个包含了 (a) 的gzip 压缩文件
        </td>
        
        <td>
          ./module.tar.gz
        </td>
      </tr>
      
      <tr>
        <td>
          c)
        </td>
        
        <td>
          一个可以下载得到 (b) 资源的url (通常是 http(s) url)
        </td>
        
        <td>
          https://registry.npmjs.org/webpack/-/webpack-4.1.0.tgz
        </td>
      </tr>
      
      <tr>
        <td>
          d)
        </td>
        
        <td>
          一个格式为 <code><name>@<version></code> 的字符串，可指向 npm 源(通常是官方源 npmjs.org)上已发布的可访问 url，且该 url 满足条件 (c)
        </td>
        
        <td>
          webpack@4.1.0
        </td>
      </tr>
      
      <tr>
        <td>
          e)
        </td>
        
        <td>
          一个格式为 <code><name>@<tag></code> 的字符串，在 npm 源上该<code><tag></code>指向某 <code><version></code> 得到 <code><name>@<version></code>，后者满足条件 (d)
        </td>
        
        <td>
          webpack@latest
        </td>
      </tr>
      
      <tr>
        <td>
          f)
        </td>
        
        <td>
          一个格式为 <code><name></code> 的字符串，默认添加 <code>latest</code> 标签所得到的 <code><name>@latest</code> 满足条件 (e)
        </td>
        
        <td>
          webpack
        </td>
      </tr>
      
      <tr>
        <td>
          g)
        </td>
        
        <td>
          一个git url, 该 url 所指向的代码库满足条件 (a)
        </td>
        
        <td>
          git@github.com:webpack/webpack.git
        </td>
      </tr>
    </table>
    
    <h3 class="heading" data-id="heading-5">
      2.2 安装本地包/远程git仓库包
    </h3>
    
    
      上面表格的定义意味着，[我们](https://www.w3cdoc.com)在共享依赖包时，并不是非要将包发表到 npm 源上才可以提供给使用者来安装。这对于私有的不方便 publish 到远程源（即使是私有源），或者需要对某官方源进行改造，但依然需要把包共享出去的场景来说非常实用。
    
    
    
     场景1: 本地模块引用
    
    
    
      nodejs 应用开发中不可避免有模块间调用，例如在实践中经常会把需要被频繁引用的配置模块放到应用根目录；于是在创建了很多层级的目录、文件后，很可能会遇到这样的代码:
    
    
    <pre><code class="hljs js copyable" lang="js"><span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../../../config.js'</span>);
<span class="copy-code-btn">复制代码</span></code></pre>

    
      除了看上去很丑以外，这样的路径引用也不利于代码的重构。并且身为程序员的自我修养告诉[我们](https://www.w3cdoc.com)，这样重复的代码多了也就意味着是时候把这个模块分离出来供应用内其他模块共享了。例如这个例子里的 config.js 非常适合封装为 package 放到 node_modules 目录下，共享给同应用内其他模块。
    
    
    
      无需手动拷贝文件或者创建软链接到 node_modules 目录，npm 有更优雅的解决方案。
    
    
    
     方案：
    
    
    <ol>
      
        创建 config 包:<br /> 新增 config 文件夹; 重命名 config.js 为 config/index.js 文件; 创建 package.json 定义 config 包 <pre><code class="hljs json copyable" lang="json">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"config"</span>,
    <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>
      

      
        在应用层 package.json 文件中新增依赖项，然后执行 <code>npm install</code>; 或直接执行第 3 步 <pre><code class="hljs json copyable" lang="json">{
    <span class="hljs-attr">"dependencies"</span>: {
        <span class="hljs-attr">"config"</span>: <span class="hljs-string">"file:./config"</span>
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>
      

      
        （等价于第 2 步）直接在应用目录执行 <code>npm install file:./config</code>此时，查看 <code>node_modules</code> 目录[我们](https://www.w3cdoc.com)会发现多出来一个名为 <code>config</code>，指向上层 <code>config/</code> 文件夹的软链接。这是因为 npm 识别 <code>file:</code> 协议的url，得知这个包需要直接从文件系统中获取，会自动创建软链接到 node_modules 中，完成“安装”过程。相比手动软链，[我们](https://www.w3cdoc.com)既不需要关心 windows 和 linux 命令差异，又可以显式地将依赖信息固化到 dependencies 字段中，开发团队其他成员可以执行 <code>npm install</code> 后直接使用。
      
    </ol>
    
    
     场景2: 私有 git 共享 package
    
    
    
      有些时候，[我们](https://www.w3cdoc.com)一个团队内会有一些代码/公用库需要在团队内不同项目间共享，但可能由于包含了敏感内容，或者代码太烂拿不出手等原因，不方便发布到源。
    
    
    
      这种情况下，[我们](https://www.w3cdoc.com)可以简单地将被依赖的包托管在私有的 git 仓库中，然后将该 git url 保存到 dependencies 中. npm 会直接调用系统的 git 命令从 git 仓库拉取包的内容到 node_modules 中。
    
    
    
      <a href="https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage.json%23git-urls-as-dependencies" target="_blank" rel="nofollow noopener noreferrer">npm 支持的 git url 格式</a>:
    
    
    <pre><code class="hljs bash copyable" lang="bash"><protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[<span class="hljs-comment">#<commit-ish> | #semver:<semver>]</span>
<span class="copy-code-btn">复制代码</span></code></pre>

    
      git 路径后可以使用 # 指定特定的 git branch/commit/tag, 也可以 #semver: 指定特定的 semver range.
    
    
    
      例如：
    
    
    <pre><code class="hljs bash copyable" lang="bash">git+ssh://git@github.com:npm/npm.git<span class="hljs-comment">#v1.0.27</span>
git+ssh://git@github.com:npm/npm<span class="hljs-comment">#semver:^5.0</span>
git+https://isaacs@github.com/npm/npm.git
git://github.com/npm/npm.git<span class="hljs-comment">#v1.0.27</span>
<span class="copy-code-btn">复制代码</span></code></pre>

    
     场景3: 开源 package 问题修复
    
    
    
      使用某个 npm 包时发现它有某个严重bug，但也许最初作者已不再维护代码了，也许[我们](https://www.w3cdoc.com)工作紧急，没有足够的时间提 issue 给作者再慢慢等作者发布新的修复版本到 npm 源。
    
    
    
      此时[我们](https://www.w3cdoc.com)可以手动进入 node_modules 目录下修改相应的包内容，也许修改了一行代码就修复了问题。但是这种做法非常不明智！
    
    
    
      首先 node_modules 本身不应该放进版本控制系统，对 node_modules 文件夹中内容的修改不会被记录进 git 提交记录；其次，就算[我们](https://www.w3cdoc.com)非要反模式，把 node_modules 放进版本控制中，你的修改内容也很容易在下次 team 中某位成员执行 <code>npm install</code> 或 <code>npm update</code> 时被覆盖，而这样的一次提交很可能包含了几十几百个包的更新，你自己所做的修改很容易就被淹没在庞大的 diff 文件列表中了。
    
    
    
     方案:
    
    
    
      最好的办法应当是 fork 原作者的 git 库，在自己所属的 repo 下修复问题后，将 dependencies 中相应的依赖项更改为自己修复后版本的 git url 即可解决问题。（Fork 代码库后，也便于向原作者提交 PR 修复问题。上游代码库修复问题后，再次更新[我们](https://www.w3cdoc.com)的依赖配置也不迟。）
    
    
    <h2 class="heading" data-id="heading-6">
      3. npm install 如何工作 —— node_modules 目录结构
    

    
    
      npm install 执行完毕后，[我们](https://www.w3cdoc.com)可以在 node_modules 中看到所有依赖的包。虽然使用者无需关注这个目录里的文件夹结构细节，只管在业务代码中引用依赖包即可，但了解 node_modules 的内容可以帮[我们](https://www.w3cdoc.com)更好理解 npm 如何工作，了解从 npm 2 到 npm 5 有哪些变化和改进。
    
    
    
      为简单起见，[我们](https://www.w3cdoc.com)假设应用目录为 app, 用两个流行的包 <code>webpack</code>, <code>nconf</code> 作为依赖包做示例说明。并且为了正常安装，使用了“上古” npm 2 时期的版本 <code>webpack@1.15.0</code>, <code>nconf@0.8.5</code>.
    
    
    <h3 class="heading" data-id="heading-7">
      3.1 npm 2
    </h3>
    
    
      npm 2 在安装依赖包时，采用简单的递归安装方法。执行 <code>npm install</code> 后，npm 2 依次递归安装 <code>webpack</code> 和 <code>nconf</code> 两个包到 node_modules 中。执行完毕后，[我们](https://www.w3cdoc.com)会看到 ./node_modules 这层目录只含有这两个子目录。
    
    
    <pre><code class="hljs bash copyable" lang="bash">node_modules/
├── nconf/
└── webpack/
<span class="copy-code-btn">复制代码</span></code></pre>

    
      进入更深一层 nconf 或 webpack 目录，将看到这两个包各自的 node_modules 中，已经由 npm 递归地安装好自身的依赖包。包括 <code>./node_modules/webpack/node_modules/webpack-core</code> , <code>./node_modules/conf/node_modules/async</code> 等等。而每一个包都有自己的依赖包，每个包自己的依赖都安装在了自己的 node_modules 中。依赖关系层层递进，构成了一整个依赖树，这个依赖树与文件系统中的文件结构树刚好层层对应。
    
    
    
      最方便的查看依赖树的方式是直接在 app 目录下执行 <code>npm ls</code> 命令。
    
    
    <pre><code class="hljs bash copyable" lang="bash">app@0.1.0
├─┬ nconf@0.8.5
│ ├── async@1.5.2
│ ├── ini@1.3.5
│ ├── secure-keys@1.0.0
│ └── yargs@3.32.0
└─┬ webpack@1.15.0
  ├── acorn@3.3.0
  ├── async@1.5.2
  ├── <span class="hljs-built_in">clone</span>@1.0.3
  ├── ...
  ├── optimist@0.6.1
  ├── supports-color@3.2.3
  ├── tapable@0.1.10
  ├── uglify-js@2.7.5
  ├── watchpack@0.2.9
  └─┬ webpack-core@0.6.9
    ├── <span class="hljs-built_in">source</span>-list-map@0.1.8
    └── <span class="hljs-built_in">source</span>-map@0.4.4
<span class="copy-code-btn">复制代码</span></code></pre>

    
      这样的目录结构优点在于层级结构明显，便于进行傻瓜式的管理:
    
    
    <ol>
      
        例如新装一个依赖包，可以立即在第一层 node_modules 中看到子目录
      
      
        在已知所需包名和版本号时，甚至可以从别的文件夹手动拷贝需要的包到 node_modules 文件夹中，再手动修改 package.json 中的依赖配置
      
      
        要删除这个包，也可以简单地手动删除这个包的子目录，并删除 package.json 文件中相应的一行即可
      
    </ol>
    
    
      实际上，很多人在 npm 2 时代也的确都这么实践过，的确也都可以安装和删除成功，并不会导致什么差错。
    
    
    
      但这样的文件结构也有很明显的问题：
    
    
    <ol>
      
        对复杂的工程, node_modules 内目录结构可能会太深，导致深层的文件路径过长而触发 windows 文件系统中，文件路径不能超过 260 个字符长的错误
      
      
        部分被多个包所依赖的包，很可能在应用 node_modules 目录中的很多地方被重复安装。随着工程规模越来越大，依赖树越来越复杂，这样的包情况会越来越多，造成大量的冗余。
      
    </ol>
    
    
      ——在[我们](https://www.w3cdoc.com)的示例中就有这个问题，<code>webpack</code> 和 <code>nconf</code> 都依赖 <code>async</code> 这个包，所以在文件系统中，webpack 和 nconf 的 node_modules 子目录中都安装了相同的 async 包，并且是相同的版本。
    
    
    <pre><code class="hljs bash copyable" lang="bash">+-------------------------------------------+
|                   app/                    |
+----------+------------------------+-------+
           |                        |
           |                        |
+----------v------+       +---------v-------+
|                 |       |                 |
|  webpack@1.15.0 |       |  nconf@0.8.5    |
|                 |       |                 |
+--------+--------+       +--------+--------+
         |                         |
   +-----v-----+             +-----v-----+
   |async@1.5.2|             |async@1.5.2|
   +-----------+             +-----------+
<span class="copy-code-btn">复制代码</span></code></pre>

    <h3 class="heading" data-id="heading-8">
      3.2 npm 3 &#8211; 扁平结构
    </h3>
    
    
      主要为了解决以上问题，npm 3 的 node_modules 目录改成了更加扁平状的层级结构。文件系统中 <code>webpack</code>, <code>nconf</code>, <code>async</code> 的层级关系变成了平级关系，处于同一级目录中。
    
    
    <pre><code class="hljs bash copyable" lang="bash">         +-------------------------------------------+
         |                   app/                    |
         +-+---------------------------------------+-+
           |                                       |
           |                                       |
+----------v------+    +-------------+   +---------v-------+
|                 |    |             |   |                 |
|  webpack@1.15.0 |    | async@1.5.2 |   |  nconf@0.8.5    |
|                 |    |             |   |                 |
+-----------------+    +-------------+   +-----------------+
<span class="copy-code-btn">复制代码</span></code></pre>

    
      虽然这样一来 webpack/node_modules 和 nconf/node_modules 中都不再有 async 文件夹，但得益于 node 的模块加载机制，他们都可以在上一级 node_modules 目录中找到 async 库。所以 webpack 和 nconf 的库代码中 <code>require('async')</code> 语句的执行都不会有任何问题。
    
    
    
      这只是最简单的例子，实际的工程项目中，依赖树不可避免地会有很多层级，很多依赖包，其中会有很多同名但版本不同的包存在于不同的依赖层级，对这些复杂的情况, npm 3 都会在安装时遍历整个依赖树，计算出最合理的文件夹安装方式，使得所有被重复依赖的包都可以去重安装。
    
    
    
      npm 文档提供了更直观的例子解释这种情况：
    
    
    <blockquote>
      
        假如 <code>package{dep}</code> 写法代表包和包的依赖，那么 <code>A{B,C}</code>, <code>B{C}</code>, <code>C{D}</code> 的依赖结构在安装之后的 node_modules 是这样的结构：
      
    </blockquote>
    
    <pre><code class="hljs bash copyable" lang="bash">A
+-- B
+-- C
+-- D
<span class="copy-code-btn">复制代码</span></code></pre>

    
      这里之所以 D 也安装到了与 B C 同一级目录，是因为 npm 会默认会在无冲突的前提下，尽可能将包安装到较高的层级。
    
    
    <blockquote>
      
        如果是 <code>A{B,C}</code>, <code>B{C,D@1}</code>, <code>C{D@2}</code> 的依赖关系，得到的安装后结构是：
      
    </blockquote>
    
    <pre><code class="hljs bash copyable" lang="bash">A
+-- B
+-- C
   `-- D@2
+-- D@1
<span class="copy-code-btn">复制代码</span></code></pre>

    
      这里是因为，对于 npm 来说同名但不同版本的包是两个独立的包，而同层不能有两个同名子目录，所以其中的 D@2 放到了 C 的子目录而另一个 D@1 被放到了再上一层目录。
    
    
    
      很明显在 npm 3 之后 npm 的依赖树结构不再与文件夹层级一一对应了。想要查看 app 的直接依赖项，要通过 <code>npm ls</code> 命令指定 <code>--depth</code> 参数来查看：
    
    
    <pre><code class="hljs bash copyable" lang="bash">npm ls --depth 1
<span class="copy-code-btn">复制代码</span></code></pre>

    <blockquote>
      
        PS: 与本地依赖包不同，如果[我们](https://www.w3cdoc.com)通过 <code>npm install --global</code> 全局安装包到全局目录时，得到的目录依然是“传统的”目录结构。而如果使用 npm 3 想要得到“传统”形式的本地 node_modules 目录，使用 <code>npm install --global-style</code> 命令即可。
      
    </blockquote>
    
    <h3 class="heading" data-id="heading-9">
      3.3 npm 5 &#8211; package-lock 文件
    </h3>
    
    
      npm 5 发布于 2017 年也是目前最新的 npm 版本，这一版本依然沿用 npm 3 之后扁平化的依赖包安装方式，此外最大的变化是增加了 <code>package-lock.json</code> 文件。
    
    
    
      package-lock.json 的作用是锁定依赖安装结构，如果查看这个 json 的结构，会发现与 node_modules 目录的文件层级结构是一一对应的。
    
    
    
      以依赖关系为: <code>app{webpack}</code> 的 &#8216;app&#8217; 项目为例, 其 package-lock 文件包含了这样的片段。
    
    
    <pre><code class="hljs json copyable" lang="json">{
    "name":  "app",
    "version":  "0.1.0",
    "lockfileVersion":  1,
    "requires":  true,
    "dependencies": {
        // ... 其他依赖包
        "webpack": {
            "version": "1.8.11",
            "resolved": "https://registry.npmjs.org/webpack/-/webpack-1.8.11.tgz",
            "integrity": "sha1-Yu0hnstBy/qcKuanu6laSYtgkcI=",
            "requires": {
                "async": "0.9.2",
                "clone": "0.1.19",
                "enhanced-resolve": "0.8.6",
                "esprima": "1.2.5",
                "interpret": "0.5.2",
                "memory-fs": "0.2.0",
                "mkdirp": "0.5.1",
                "node-libs-browser": "0.4.3",
                "optimist": "0.6.1",
                "supports-color": "1.3.1",
                "tapable": "0.1.10",
                "uglify-js": "2.4.24",
                "watchpack": "0.2.9",
                "webpack-core": "0.6.9"
            }
        },
        "webpack-core": {
            "version": "0.6.9",
            "resolved": "https://registry.npmjs.org/webpack-core/-/webpack-core-0.6.9.tgz",
            "integrity": "sha1-/FcViMhVjad76e+23r3Fo7FyvcI=",
            "requires": {
                "source-list-map": "0.1.8",
                "source-map": "0.4.4"
            },
            "dependencies": {
                "source-map": {
                    "version": "0.4.4",
                    "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz",
                    "integrity": "sha1-66T12pwNyZneaAMti092FzZSA2s=",
                    "requires": {
                        "amdefine": "1.0.1"
                    }
                }
            }
        },
        //... 其他依赖包
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
      看懂 package-lock 文件并不难，其结构是同样类型的几个字段嵌套起来的，主要是 <code>version</code>, <code>resolved</code>, <code>integrity</code>, <code>requires</code>, <code>dependencies</code> 这几个字段而已。
    
    
    <ul>
      
        <code>version</code>, <code>resolved</code>, <code>integrity</code> 用来记录包的准确版本号、内容hash、安装源的，决定了要安装的包的准确“身份”信息
      
      
        假设盖住其他字段，只关注文件中的 <code>dependencies: {}</code> [我们](https://www.w3cdoc.com)会发现，整个文件的 JSON 配置里的 dependencies 层次结构与文件系统中 node_modules 的文件夹层次结构是完全对照的
      
      
        只关注 <code>requires: {}</code> 字段又会发现，除最外层的 <code>requires</code> 属性为 true 以外, 其他层的 requires 属性都对应着这个包的 package.json 里记录的自己的依赖项
      
    
    
    
      因为这个文件记录了 node_modules 里所有包的结构、层级和版本号甚至安装源，它也就事实上提供了 “保存” node_modules 状态的能力。只要有这样一个 lock 文件，不管在那一台机器上执行 npm install 都会得到完全相同的 node_modules 结果。
    
    
    
      这就是 package-lock 文件致力于优化的场景：在从前仅仅用 package.json 记录依赖，由于 semver range 的机制；一个月前由 A 生成的 package.json 文件，B 在一个月后根据它执行 npm install 所得到的 node_modules 结果很可能许多包都存在不同的差异，虽然 semver 机制的限制使得同一份 package.json 不会得到大版本不同的依赖包，但同一份代码在不同环境安装出不同的依赖包，依然是可能导致意外的潜在因素。
    
    
    
      相同作用的文件在 npm 5 之前就有，称为 npm shrinkwrap 文件，二者作用完全相同，不同的是后者需要手动生成，而 npm 5 默认会在执行 npm install 后就生成 package-lock 文件，并且建议你提交到 git/svn 代码库中。
    
    
    
      package-lock.json 文件在最初 npm 5.0 默认引入时也引起了相当大的<a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fnpm%2Fnpm%2Fissues%2F16866" target="_blank" rel="nofollow noopener noreferrer">争议</a>。在 npm 5.0 中，如果已有 package-lock 文件存在，若手动在 package.json 文件新增一条依赖，再执行 npm install, 新增的依赖并不会被安装到 node_modules 中, package-lock.json 也不会做相应的更新。这样的表现与使用者的自然期望表现不符。在 npm 5.1 的首个 <a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fnpm%2Fnpm%2Fissues%2F16866" target="_blank" rel="nofollow noopener noreferrer">Release</a> 版本中这个问题得以修复。这个事情告诉[我们](https://www.w3cdoc.com)，要升级，不要使用 5.0。
    
    
    
      ——但依然有反对的声音认为 package-lock 太复杂，对此 npm 也提供了禁用配置：
    
    
    <pre><code class="hljs bash copyable" lang="bash">npm config <span class="hljs-built_in">set</span> package-lock <span class="hljs-literal">false</span>
<span class="copy-code-btn">复制代码</span></code></pre>

    <h2 class="heading" data-id="heading-10">
      4. 依赖包版本管理
    

    
    
      依赖包安装完并不意味着就万事大吉了，版本的维护和更新也很重要。这一章介绍依赖包升级管理相关知识，太长不看版本请直接跳到 [4.3 最佳实践].
    
    
    <h3 class="heading" data-id="heading-11">
      4.1 semver
    </h3>
    
    
      npm 依赖管理的一个重要特性是采用了<a href="https://link.juejin.im?target=https%3A%2F%2Fsemver.org%2Flang%2Fzh-CN%2F" target="_blank" rel="nofollow noopener noreferrer">语义化版本 (semver)</a> 规范，作为依赖版本管理方案。
    
    
    
      semver 约定一个包的版本号必须包含3个数字，格式必须为 <code>MAJOR.MINOR.PATCH</code>, 意为 <code>主版本号.小版本号.修订版本号</code>.
    
    
    <ul>
      
        MAJOR 对应大的版本号迭代，做了不兼容旧版的修改时要更新 MAJOR 版本号
      
      
        MINOR 对应小版本迭代，发生兼容旧版API的修改或功能更新时，更新MINOR版本号
      
      
        PATCH 对应修订版本号，一般针对修复 BUG 的版本号
      
    
    
    
      对于包作者（发布者），npm 要求在 publish 之前，必须更新版本号。npm 提供了 <code>npm version</code> 工具，执行 <code>npm version major|minor|patch</code> 可以简单地将版本号中相应的数字加1.
    
    
    <blockquote>
      
        如果包是一个 git 仓库，<code>npm version</code> 还会自动创建一条注释为更新后版本号的 git commit 和名为该版本号的 tag
      
    </blockquote>
    
    
      对于包的引用者来说，[我们](https://www.w3cdoc.com)需要在 dependencies 中使用 semver 约定的 semver range 指定所需依赖包的版本号或版本范围。npm 提供了网站 https://semver.npmjs.com 可方便地计算所输入的表达式的匹配范围。常用的规则示例如下表：
    
    
    <table>
      <tr>
        <th>
          range
        </th>
        
        <th>
          含义
        </th>
        
        <th>
          例
        </th>
      </tr>
      
      <tr>
        <td>
          <code>^2.2.1</code>
        </td>
        
        <td>
          指定的 MAJOR 版本号下, 所有更新的版本
        </td>
        
        <td>
          匹配 <code>2.2.3</code>, <code>2.3.0</code>; 不匹配 <code>1.0.3</code>, <code>3.0.1</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>~2.2.1</code>
        </td>
        
        <td>
          指定 MAJOR.MINOR 版本号下，所有更新的版本
        </td>
        
        <td>
          匹配 <code>2.2.3</code>, <code>2.2.9</code> ; 不匹配 <code>2.3.0</code>, <code>2.4.5</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>>=2.1</code>
        </td>
        
        <td>
          版本号大于或等于 <code>2.1.0</code>
        </td>
        
        <td>
          匹配 <code>2.1.2</code>, <code>3.1</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code><=2.2</code>
        </td>
        
        <td>
          版本号小于或等于 <code>2.2</code>
        </td>
        
        <td>
          匹配 <code>1.0.0</code>, <code>2.2.1</code>, <code>2.2.11</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>1.0.0 - 2.0.0</code>
        </td>
        
        <td>
          版本号从 1.0.0 (含) 到 2.0.0 (含)
        </td>
        
        <td>
          匹配 <code>1.0.0</code>, <code>1.3.4</code>, <code>2.0.0</code>
        </td>
      </tr>
    </table>
    
    
      任意两条规则，用空格连接起来，表示“与”逻辑，即两条规则的交集:
    
    
    
      如 <code>>=2.3.1 <=2.8.0</code> 可以解读为: <code>>=2.3.1</code> 且 <code><=2.8.0</code>
    
    
    <ul>
      
        可以匹配 <code>2.3.1</code>, <code>2.4.5</code>, <code>2.8.0</code>
      
      
        但不匹配 <code>1.0.0</code>, <code>2.3.0</code>, <code>2.8.1</code>, <code>3.0.0</code>
      
    
    
    
      任意两条规则，通过 <code>||</code> 连接起来，表示“或”逻辑，即两条规则的并集:
    
    
    
      如 <code>^2 >=2.3.1 || ^3 >3.2</code>
    
    
    <ul>
      
        可以匹配 <code>2.3.1</code>, <code>2,8.1</code>, <code>3.3.1</code>
      
      
        但不匹配 <code>1.0.0</code>, <code>2.2.0</code>, <code>3.1.0</code>, <code>4.0.0</code>
      
    
    
    
      PS: 除了这几种，还有如下更直观的表示版本号范围的写法:
    
    
    <ul>
      
        <code>*</code> 或 <code>x</code> 匹配所有主版本
      
      
        <code>1</code> 或 <code>1.x</code> 匹配 主版本号为 1 的所有版本
      
      
        <code>1.2</code> 或 <code>1.2.x</code> 匹配 版本号为 1.2 开头的所有版本
      
    
    
    
      PPS: 在常规仅包含数字的版本号之外，semver 还允许在 <code>MAJOR.MINOR.PATCH</code> 后追加 <code>-</code> 后跟点号分隔的标签，作为预发布版本标签 &#8211; <a href="https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fnpm%2Fnode-semver%23prerelease-tags" target="_blank" rel="nofollow noopener noreferrer">Prerelese Tags</a>，通常被视为不稳定、不建议生产使用的版本。例如：
    
    
    <ul>
      
        <code>1.0.0-alpha</code>
      
      
        <code>1.0.0-beta.1</code>
      
      
        <code>1.0.0-rc.3</code>
      
    
    
    
      上表中[我们](https://www.w3cdoc.com)最常见的是 <code>^1.8.11</code> 这种格式的 range, 因为[我们](https://www.w3cdoc.com)在使用 <code>npm install <package name></code> 安装包时，npm 默认安装当前最新版本，例如 <code>1.8.11</code>, 然后在所安装的版本号前加<code>^</code>号, 将 <code>^1.8.11</code> 写入 package.json 依赖配置，意味着可以匹配 1.8.11 以上，2.0.0 以下的所有版本。
    
    
    <h3 class="heading" data-id="heading-12">
      4.2 依赖版本升级
    </h3>
    
    
      问题来了，在安装完一个依赖包之后有新版本发布了，如何使用 npm 进行版本升级呢？——答案是简单的 <code>npm install</code> 或 <code>npm update</code>，但在不同的 npm 版本，不同的 package.json, package-lock.json 文件，安装/升级的表现也不同。
    
    
    
      [我们](https://www.w3cdoc.com)不妨还以 webpack 举例，做如下的前提假设:
    
    
    <ul>
      
        [我们](https://www.w3cdoc.com)的工程项目 <code>app</code> 依赖 webpack
      
      
        项目最初初始化时，安装了当时最新的包 webpack@1.8.0，并且 package.json 中的依赖配置为: <code>"webpack": "^1.8.0"</code>
      
      
        当前（2018年3月） webpack 最新版本为 <code>4.2.0</code>, webpack 1.x 最新子版本为 <code>1.15.0</code>
      
    
    
    
      如果[我们](https://www.w3cdoc.com)使用的是 npm 3, 并且项目不含 package-lock.json, 那么根据 node_modules 是否为空，执行 install/update 的结果如下 (node 6.13.1, npm 3.10.10 环境下试验):
    
    
    <table>
      <tr>
        <th>
          #
        </th>
        
        <th>
          package.json (BEFORE)
        </th>
        
        <th>
          node_modules (BEFORE)
        </th>
        
        <th>
          command (npm 3)
        </th>
        
        <th>
          package.json (AFTER)
        </th>
        
        <th>
          node_modules (AFTER)
        </th>
      </tr>
      
      <tr>
        <td>
          a)
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.8.0
        </td>
        
        <td>
          <code>install</code>
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.8.0
        </td>
      </tr>
      
      <tr>
        <td>
          b)
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          空
        </td>
        
        <td>
          <code>install</code>
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.15.0
        </td>
      </tr>
      
      <tr>
        <td>
          c)
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.8.0
        </td>
        
        <td>
          <code>update</code>
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.15.0
        </td>
      </tr>
      
      <tr>
        <td>
          d)
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          空
        </td>
        
        <td>
          <code>update</code>
        </td>
        
        <td>
          <code>webpack: ^1.8.0</code>
        </td>
        
        <td>
          webpack@1.15.0
        </td>
      </tr>
    </table>
    
    
      根据这个表[我们](https://www.w3cdoc.com)可以对 npm 3 得出以下结论：
    
    
    <ul>
      
        如果本地 node_modules 已安装，再次执行 install 不会更新包版本, 执行 update 才会更新; 而如果本地 node_modules 为空时，执行 install/update 都会直接安装更新包;
      
      
        npm update 总是会把包更新到符合 package.json 中指定的 semver 的最新版本号——本例中符合 <code>^1.8.0</code> 的最新版本为 <code>1.15.0</code>
      
      
        一旦给定 package.json, 无论后面执行 npm install 还是 update, package.json 中的 webpack 版本一直顽固地保持 一开始的 <code>^1.8.0</code> 岿然不动
      
    
    
    
      这里不合理的地方在于，如果最开始团队中第一个人安装了 <code>webpack@1.8.0</code>, 而新加入项目的成员, checkout 工程代码后执行 <code>npm install</code> 会安装得到不太一样的 <code>1.15.0</code> 版本。虽然 semver 约定了小版本号应当保持向下兼容（相同大版本号下的小版本号）兼容，但万一有不熟悉不遵循此约定的包发布者，发布了不兼容的包，此时就可能出现因依赖环境不同导致的 bug。
    
    
    
      下面由 npm 5 带着 package-lock.json 闪亮登场，执行 install/update 的效果是这样的 (node 9.8.0, npm 5.7.1 环境下试验):
    
    
    <blockquote>
      
        下表为表述简单，省略了包名 webpack, install 简写 i, update 简写为 up
      
    </blockquote>
    
    <table>
      <tr>
        <th>
          #
        </th>
        
        <th>
          package.json (BEFORE)
        </th>
        
        <th>
          node_modules (BEFORE)
        </th>
        
        <th>
          package-lock (BEFORE)
        </th>
        
        <th>
          command
        </th>
        
        <th>
          package.json (AFTER)
        </th>
        
        <th>
          node_modules (AFTER)
        </th>
      </tr>
      
      <tr>
        <td>
          a)
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
          <code>i</code>
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          @1.8.0
        </td>
      </tr>
      
      <tr>
        <td>
          b)
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          空
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
          <code>i</code>
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          @1.8.0
        </td>
      </tr>
      
      <tr>
        <td>
          c)
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
         <code>up</code>
        </td>
        
        <td>
         <code>^1.15.0</code>
        </td>
        
        <td>
         @1.15.0
        </td>
      </tr>
      
      <tr>
        <td>
          d)
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          空
        </td>
        
        <td>
          @1.8.0
        </td>
        
        <td>
          <code>up</code>
        </td>
        
        <td>
          <code>^1.8.0</code>
        </td>
        
        <td>
          @1.15.0
        </td>
      </tr>
      
      <tr>
        <td>
          e)
        </td>
        
        <td>
          <code>^1.15.0</code>
        </td>
        
        <td>
          @1.8.0 (旧)
        </td>
        
        <td>
          @1.15.0
        </td>
        
        <td>
         <code>i</code>
        </td>
        
        <td>
         <code>^1.15.0</code>
        </td>
        
        <td>
         @1.15.0
        </td>
      </tr>
      
      <tr>
        <td>
          f)
        </td>
        
        <td>
          <code>^1.15.0</code>
        </td>
        
        <td>
          @1.8.0 (旧)
        </td>
        
        <td>
          @1.15.0
        </td>
        
        <td>
         <code>up</code>
        </td>
        
        <td>
         <code>^1.15.0</code>
        </td>
        
        <td>
         @1.15.0
        </td>
      </tr>
    </table>
    
    
      与 npm 3 相比，在安装和更新依赖版本上主要的区别为：
    
    
    <ul>
      
        无论何时执行 install, npm 都会优先按照 package-lock 中指定的版本来安装 webpack; 避免了 npm 3 表中情形 b) 的状况;
      
      
        无论何时完成安装/更新, package-lock 文件总会跟着 node_modules 更新 —— (因此可以视 package-lock 文件为 node_modules 的 JSON 表述)
      
      
        已安装 node_modules 后若执行 npm update，package.json 中的版本号也会随之更改为 <code>^1.15.0</code>
      
    
    
    
      由此可见 npm 5.1 使得 package.json 和 package-lock.json 中所保存的版本号更加统一，解决了 npm 之前的各种问题。只要遵循好的实践习惯，团队成员可以很方便地维护一套应用代码和 node_modules 依赖都一致的环境。
    
    
    
      皆大欢喜。
    
    
    <h3 class="heading" data-id="heading-13">
      4.3 最佳实践
    </h3>
    
    
      总结起来，在 2018 年 (node 9.8.0, npm 5.7.1) 时代，我认为的依赖版本管理应当是:
    
    
    <ul>
      
        使用 npm: <code>>=5.1</code> 版本, 保持 <code>package-lock.json</code> 文件默认开启配置
      
      
        初始化：第一作者初始化项目时使用 <code>npm install <package></code> 安装依赖包, 默认保存 <code>^X.Y.Z</code> 依赖 range 到 package.json中; 提交 <code>package.json</code>, <code>package-lock.json</code>,不要提交 <code>node_modules</code> 目录
      
      
        初始化：项目成员首次 checkout/clone 项目代码后，执行一次 <code>npm install</code> 安装依赖包
      
      
       不要手动修改 package-lock.json
      
      
        升级依赖包: <ul>
          
            升级小版本: 本地执行 <code>npm update</code> 升级到新的小版本
          
          
            升级大版本: 本地执行 <code>npm install <package-name>@<version></code> 升级到新的大版本
          
          
            也可手动修改 package.json 中版本号为要升级的版本(大于现有版本号)并指定所需的 semver, 然后执行 <code>npm install</code>
          
          
            本地验证升级后新版本无问题后，提交新的 <code>package.json</code>, <code>package-lock.json</code> 文件
          
        
      
      
      
        降级依赖包: <ul>
          
           正确: <code>npm install <package-name>@<old-version></code> 验证无问题后，提交 package.json 和 package-lock.json 文件
          
          
           错误: 手动修改 <code>package.json</code> 中的版本号为更低版本的 semver, 这样修改并不会生效，因为再次执行 <code>npm install</code> 依然会安装 <code>package-lock.json</code> 中的锁定版本
          
        
      
      
      
        删除依赖包: <ul>
          
            Plan A: <code>npm uninstall <package></code> 并提交 <code>package.json</code> 和 <code>package-lock.json</code>
          
          
            Plan B: 把要卸载的包从 package.json 中 dependencies 字段删除, 然后执行 <code>npm install</code> 并提交 <code>package.json</code> 和 <code>package-lock.json</code>
          
        
      
      
      
        任何时候有人提交了 package.json, package-lock.json 更新后，团队其他成员应在 svn update/git pull 拉取更新后执行 <code>npm install</code> 脚本安装更新后的依赖包
      
    
    
    
      <s>恭喜你终于可以跟<code>rm -rf node_modules</code> && <code>npm install</code> 这波操作说拜拜了（其实并不会）</s>
    
    
    <h2 class="heading" data-id="heading-14">
      5. npm scripts
    

    
    <h3 class="heading" data-id="heading-15">
      5.1 基本使用
    </h3>
    
    
      npm scripts 是 npm 另一个很重要的特性。通过在 package.json 中 scripts 字段定义一个脚本，例如：
    
    
    <pre><code class="hljs json copyable" lang="json">{
    <span class="hljs-attr">"scripts"</span>: {
        <span class="hljs-attr">"echo"</span>: <span class="hljs-string">"echo HELLO WORLD"</span>
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
      [我们](https://www.w3cdoc.com)就可以通过 <code>npm run echo</code> 命令来执行这段脚本，像在 shell 中执行该命令 <code>echo HELLO WORLD</code> 一样，看到终端输出 <code>HELLO WORLD</code>.
    
    
    
      —— npm scripts 的基本使用就是这么简单，它提供了一个简单的接口用来调用工程相关的脚本。关于更详细的相关信息，可以参考阮一峰老师的文章 <a href="https://link.juejin.im?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2016%2F10%2Fnpm_scripts.html" target="_blank" rel="nofollow noopener noreferrer">npm script 使用指南 (2016年10月)</a>.
    
    
    
      简要总结阮老师文章内容：
    
    
    <ol>
      
        <code>npm run</code> 命令执行时，会把 <code>./node_modules/.bin/</code> 目录添加到执行环境的 <code>PATH</code> 变量中，因此如果某个命令行包未全局安装，而只安装在了当前项目的 node_modules 中，通过 <code>npm run</code> 一样可以调用该命令。
      
      
        执行 npm 脚本时要传入参数，需要在命令后加 <code>--</code> 标明, 如 <code>npm run test -- --grep="pattern"</code> 可以将 <code>--grep="pattern"</code> 参数传给 <code>test</code> 命令
      
      
        npm 提供了 pre 和 post 两种钩子机制，可以定义某个脚本前后的执行脚本
      
      
        运行时变量：在 <code>npm run</code> 的脚本执行环境内，可以通过环境变量的方式获取许多运行时相关信息，以下都可以通过 <code>process.env</code> 对象访问获得： <ul>
          
            <code>npm_lifecycle_event</code> &#8211; 正在运行的脚本名称
          
          
            <code>npm_package_<key></code> &#8211; 获取当前包 package.json 中某个字段的配置值：如 <code>npm_package_name</code> 获取包名
          
          
            <code>npm_package_<key>_<sub-key></code> &#8211; package.json 中嵌套字段属性：如 <code>npm_pacakge_dependencies_webpack</code> 可以获取到 package.json 中的 <code>dependencies.webpack</code> 字段的值，即 webpack 的版本号
          
        
      
    </ol>
    
    <h3 class="heading" data-id="heading-16">
      5.2 node_modules/.bin 目录
    </h3>
    
    
      上面所说的 <code>node_modules/.bin</code> 目录，保存了依赖目录中所安装的可供调用的命令行包。
    
    
    
      何谓命令行包？例如 <code>webpack</code> 就属于一个命令行包。如果[我们](https://www.w3cdoc.com)在安装 webpack 时添加 <code>--global</code> 参数，就可以在终端直接输入 <code>webpack</code> 进行调用。但如果不加 <code>--global</code> 参数，[我们](https://www.w3cdoc.com)会在 <code>node_modules/.bin</code> 目录里看到名为 webpack 的文件，如果在终端直接输入 <code>./node_modules/.bin/webpack</code> 命令，一样可以执行。
    
    
    
      这是因为 <code>webpack</code> 在 <code>package.json</code> 文件中定义了 <code>bin</code> 字段为:
    
    
    <pre><code class="hljs bash copyable" lang="bash">{
    <span class="hljs-string">"bin"</span>: {
        <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"./bin/webpack.js"</span>
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
      bin 字段的配置格式为: <code><command>: <file></code>, 即 <code>命令名: 可执行文件</code>. npm 执行 install 时，会分析每个依赖包的 package.json 中的 <code>bin</code> 字段，并将其包含的条目安装到 <code>./node_modules/.bin</code> 目录中，文件名为 <code><command></code>。而如果是全局模式安装，则会在 npm 全局安装路径的 bin 目录下创建指向 <code><file></code> 名为 <code><command></code> 的软链。因此，<code>./node_modules/.bin/webpack</code> 文件在通过命令行调用时，实际上就是在执行 <code>node ./node_modules/.bin/webpack.js</code> 命令。
    
    
    
      正如上一节所说，<code>npm run</code> 命令在执行时会把 <code>./node_modules/.bin</code> 加入到 <code>PATH</code> 中，使[我们](https://www.w3cdoc.com)可直接调用所有提供了命令行调用接口的依赖包。所以这里就引出了一个最佳实践：
    
    
    <blockquote>
      
        将项目依赖的命令行工具安装到项目依赖文件夹中，然后通过 npm scripts 调用；而非全局安装
      
    </blockquote>
    
    
      举例而言 <code>webpack</code> 作为[前端](https://www.w3cdoc.com)工程标配的构建工具，虽然[我们](https://www.w3cdoc.com)都习惯了全局安装并直接使用命令行调用，但不同的项目依赖的 webpack 版本可能不同，相应的 <code>webpack.config.js</code> 配置文件也可能只兼容了特定版本的 webpack. 如果[我们](https://www.w3cdoc.com)仅全局安装了最新的 webpack 4.x 并使用 webpack 命令调用，在一个依赖 webpack 3.x 的工程中就会无法成功执行构建。
    
    
    
      但如果这类工具总是本地安装，[我们](https://www.w3cdoc.com)要调用一个命令，要手动添加 <code>./node_modules/.bin</code> 这个长长的前缀，未免也太麻烦了，[我们](https://www.w3cdoc.com) nodejs 开发者都很懒的。于是 npm 从5.2 开始自带了一个新的工具 <code>npx</code>.
    
    
    <h3 class="heading" data-id="heading-17">
      5.3 npx
    </h3>
    
    
      npx 的使用很简单，就是执行 <code>npx <command></code> 即可，这里的 <code><command></code> 默认就是 <code>./node_modules</code> 目录中安装的可执行脚本名。例如上面本地安装好的 webpack 包，[我们](https://www.w3cdoc.com)可以直接使用 <code>npx webpack</code> 执行即可。
    
    
    
      除了这种最简单的场景, npm cli 团队开发者 Kat Marchán 还在这篇文章中介绍了其他几种 npx 的神奇用法: <a href="https://link.juejin.im?target=https%3A%2F%2Fbit.ly%2F2uzuIHv" target="_blank" rel="nofollow noopener noreferrer">Introducing npx: an npm package runner</a>, 国内有位开发者 robin.law 将原文翻译为中文 <a href="https://link.juejin.im?target=https%3A%2F%2Frobin-front.github.io%2F2017%2F07%2F14%2Fintroducing-npx-an-npm-package-runner%2F" target="_blank" rel="nofollow noopener noreferrer">npx是什么，为什么需要npx?</a>.
    
    
    
      有兴趣的可以戳链接了解，懒得点链接的，看总结：
    
    
    <h4 class="heading" data-id="heading-18">
      场景a) 一键执行远程 npm 源的二进制包
    </h4>
    
    
      除了在 package 中执行 ./node_modules/.bin 中已安装的命令, 还可以直接指定未安装的二进制包名执行。例如[我们](https://www.w3cdoc.com)在一个没有 package.json 也没有 node_modules 的目录下，执行:
    
    
    <pre><code class="hljs bash copyable" lang="bash">npx cowsay hello
<span class="copy-code-btn">复制代码</span></code></pre>

    
      npx 将会从 npm 源下载 <code>cowsay</code> 这个包（但并不安装）并执行：
    
    
    <pre><code class="hljs bash copyable" lang="bash"> _______ 

< hello >
 -------

        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
<span class="copy-code-btn">复制代码</span></code></pre>

    
      这种用途非常适合 1. 在本地简单测试或调试 npm 源上这些二进制包的功能；2. 调用 create-react-app 或 yeoman 这类往往每个项目只需要使用一次的脚手架工具
    
    
    
      PS: 此处有彩蛋，执行这条命令试试:
    
    
    <pre><code class="hljs bash copyable" lang="bash">npx workin-hard
<span class="copy-code-btn">复制代码</span></code></pre>

    <h4 class="heading" data-id="heading-19">
      场景b) 一键执行 GitHub Gist
    </h4>
    
    
      还记得前面提到的 [2.1 package定义] 么，<code>npm install <package></code> 可以是包含了有效 package.json 的 git url.
    
    
    
      刚好 GitHub Gist 也是 git 仓库 的一种，集合 npx 就可以方便地将简单的脚本共享给其他人，拥有该链接的人无需将脚本安装到本地工作目录即可执行。将 package.json 和 需执行的二进制脚本上传至 gist, 在运行 <code>npx <gist url></code> 就可以方便地执行该 gist 定义的命令。
    
    
    
      原文作者 Kat Marchán 提供了<a href="https://link.juejin.im?target=https%3A%2F%2Fgist.github.com%2Fzkat%2F4bc19503fe9e9309e2bfaa2c58074d32" target="_blank" rel="nofollow noopener noreferrer">这个</a>示例 gist, 执行：
    
    
    <pre><code class="hljs bash copyable" lang="bash">npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
<span class="copy-code-btn">复制代码</span></code></pre>

    
      可得到一个来自 GitHubGist 的 hello world 问候。
    
    
    <h4 class="heading" data-id="heading-20">
      场景c) 使用不同版本 node 执行命令
    </h4>
    
    
      将 npx 与 Aria Stewart 创建的 <code>node</code> 包 (https://www.npmjs.com/package/node) 结合，可以实现在一行命令中使用指定版本的 node 执行命令。
    
    
    
      例如先后执行：
    
    
    <pre><code class="hljs bash copyable" lang="bash">npx node@4 <span class="hljs-_">-e</span> <span class="hljs-string">"console.log(process.version)"</span>
npx node@6 <span class="hljs-_">-e</span> <span class="hljs-string">"console.log(process.version)"</span>
<span class="copy-code-btn">复制代码</span></code></pre>

    
      将分别输出 <code>v4.8.7</code> 和 <code>v6.13.0</code>.
    
    
    
      往常这种工作是由 <code>nvm</code> 这类 node 版本管理工具来做的，但 <code>npx node@4</code> 这种方式免去 nvm 手动切换配置的步骤，更加简洁简单。
    
    
    <h2 class="heading" data-id="heading-21">
      6. npm 配置
    

    
    <h3 class="heading" data-id="heading-22">
      6.1 npm config
    </h3>
    
    
      npm cli 提供了 <code>npm config</code> 命令进行 npm 相关配置，通过 <code>npm config ls -l</code> 可查看 npm 的所有配置，包括默认配置。npm 文档页为每个配置项提供了详细的说明 https://docs.npmjs.com/misc/config .
    
    
    
      修改配置的命令为 <code>npm config set <key> <value></code>, [我们](https://www.w3cdoc.com)使用相关的常见重要配置:
    
    
    <ul>
      
        <code>proxy</code>, <code>https-proxy</code>: 指定 npm 使用的代理
      
      
        <code>registry</code> 指定 npm 下载安装包时的源，默认为 <code>https://registry.npmjs.org/</code> 可以指定为私有 Registry 源
      
      
        <code>package-lock</code> 指定是否默认生成 package-lock 文件，建议保持默认 true
      
      
        <code>save</code> true/false 指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true
      
    
    
    
      删除指定的配置项命令为 <code>npm config delete <key></code>.
    
    
    <h3 class="heading" data-id="heading-23">
      6.2 npmrc 文件
    </h3>
    
    
      除了使用 CLI 的 <code>npm config</code> 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。
    
    
    
      这样的 npmrc 文件优先级由高到低包括：
    
    
    <ul>
      
        工程内配置文件: <code>/path/to/my/project/.npmrc</code>
      
      
        用户级配置文件: <code>~/.npmrc</code>
      
      
        全局配置文件: <code>$PREFIX/etc/npmrc</code> (即<code>npm config get globalconfig</code> 输出的路径)
      
      
        npm内置配置文件: <code>/path/to/npm/npmrc</code>
      
    
    
    
      通过这个机制，[我们](https://www.w3cdoc.com)可以方便地在工程跟目录创建一个 <code>.npmrc</code> 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果[我们](https://www.w3cdoc.com)在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。
    
    
    <pre><code class="hljs bash copyable" lang="bash">proxy = https://proxy.example.com/
https-proxy = https://proxy.example.com/
registry = https://registry.example.com/
<span class="copy-code-btn">复制代码</span></code></pre>

    
      因为项目级 .npmrc 文件的作用域只在本项目下，所以在非本目录下，这些配置并不生效。对于使用笔记本工作的开发者，可以很好地隔离公司的工作项目、在家学习研究项目两种不同的环境。
    
    
    
      将这个功能与 <code>~/.npm-init.js</code> 配置相结合，可以将特定配置的 .npmrc 跟 .gitignore, README 之类文件一起做到 npm init 脚手架中，进一步减少手动配置。
    
    
    <h3 class="heading" data-id="heading-24">
      6.3 node 版本约束
    </h3>
    
    
      虽然一个项目的团队都共享了相同的代码，但每个人的开发机器可能安装了不同的 node 版本，此外服务器端的也可能与本地开发机不一致。
    
    
    
      这又是一个可能带来不一致性的因素 —— 但也不是很难解决，声明式约束+脚本限制即可。
    
    
    
     声明：通过 <code>package.json</code> 的 <code>engines</code> 属性声明应用运行所需的版本运行时要求。例如[我们](https://www.w3cdoc.com)的项目中使用了 <code>async</code>, <code>await</code> 特性，<a href="https://link.juejin.im?target=https%3A%2F%2Fnode.green" target="_blank" rel="nofollow noopener noreferrer">查阅兼容性表格</a>得知最低支持版本为 7.6.0，因此指定 engines 配置为:
    
    
    <pre><code class="hljs json copyable" lang="json">{
    <span class="hljs-attr">"engines"</span>: { <span class="hljs-attr">"node"</span>: <span class="hljs-string">">=7.6.0"</span>}
}
<span class="copy-code-btn">复制代码</span></code></pre>

    
     强约束(可选)：在 npm 中以上字段内容仅作为建议字段使用，若要在私有项目中添加强约束，需要自己写脚本钩子，读取并解析 engines 字段的 semver range 并与运行时环境做对比校验并适当提醒。
    
    
    <h2 class="heading" data-id="heading-25">
      7. 小结 npm 最佳实践
    

    
    <ul>
      
        使用 npm-init 初始化新项目
      
      
        统一项目配置: 需团队共享的 npm config 配置项，固化到 .npmrc 文件中
      
      
        统一运行环境，统一 package.json，统一 package-lock 文件
      
      
        合理使用多样化的源安装依赖包: <code>npm install <git url>|<local file></code>
      
      
        使用 npm: >=5.2 版本
      
      
        使用 npm scripts 与 npx (npm: >=5.2) 脚本管理应用相关脚本
      
    
    
    <h2 class="heading" data-id="heading-26">
      8. 更多资料
    

    
    
     参考
    
    
    <ul>
      
        npm team 成员 Ashley Williams 在 2016 年 Node.js Live 上的 talk: <em>You Don&#8217;t Know npm</em>, 当时还没有 npm 5 <ul>
          
            YouTube 视频链接: <a href="https://link.juejin.im?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DhopWbVKmiVQ%26t%3D537s" target="_blank" rel="nofollow noopener noreferrer">Node.js Live (Paris) &#8211; Ashley Williams, You Don&#8217;t Know npm</a>
          
          
            演讲用的 slides: <a href="https://link.juejin.im?target=http%3A%2F%2Fashleygwilliams.github.io%2Fyou-dont-know-npm" target="_blank" rel="nofollow noopener noreferrer">the ag_deck</a>
          
        
      
      
      
        这篇 2015 年的文章介绍了如何使用把本地模块打包到 node_modules 依赖中: <a href="https://link.juejin.im?target=https%3A%2F%2Fbit.ly%2F2DLnaCd" target="_blank" rel="nofollow noopener noreferrer">Build modular application with npm local modules</a>
      
      
        一篇很好的介绍 package-lock.json 的文章: <a href="https://link.juejin.im?target=https%3A%2F%2Fbit.ly%2F2Fiok9Z" target="_blank" rel="nofollow noopener noreferrer">Everything you wanted to know about package-lock.json</a>
      
      
        阮一峰 <a href="https://link.juejin.im?target=http%3A%2F%2Fruanyifeng.com%2Fblog%2F2016%2F10%2Fnpm_scripts.html" target="_blank" rel="nofollow noopener noreferrer">npm scripts 使用指南</a>
      
      
        Kat Marchán 介绍npx: <ul>
          
            原文 <a href="https://link.juejin.im?target=http%3A%2F%2Ft.cn%2FRKIYHBA" target="_blank" rel="nofollow noopener noreferrer">Introducing npx: an npm package runner</a>
          
          
            中文 <a href="https://link.juejin.im?target=https%3A%2F%2Frobin-front.github.io%2F2017%2F07%2F14%2Fintroducing-npx-an-npm-package-runner%2F" target="_blank" rel="nofollow noopener noreferrer">npx是什么，为什么需要npx?</a>
          
        
      
    
    
    
     文档
    
    
    <ul>
      
        npm 官方文档, 无中文翻译 <ul>
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage.json" target="_blank" rel="nofollow noopener noreferrer">package.json 文件</a>
          
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fconfig" target="_blank" rel="nofollow noopener noreferrer">npm config 配置</a>
          
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fsemver.npmjs.com" target="_blank" rel="nofollow noopener noreferrer">npm semver 计算器</a>
          
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Finstall" target="_blank" rel="nofollow noopener noreferrer">node_modules 目录扁平化</a>
          
        
      
      
      
        yarn 中文文档，虽然是 npm 竞争者但兼容 package.json 和 node_modules 目录，因此这两部分一样可参考： <ul>
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fyarnpkg.com%2Fzh-Hans%2Fdocs%2Fpackage-json" target="_blank" rel="nofollow noopener noreferrer">package.json &#8211; 中文</a>
          
          
            <a href="https://link.juejin.im?target=https%3A%2F%2Fyarnpkg.com%2Fzh-Hans%2Fdocs%2Fdependencies" target="_blank" rel="nofollow noopener noreferrer">依赖与版本 &#8211; 中文</a>
          
        
      
    
    
    
     延伸阅读
    
    
    <ul>
      
        sam boyer 《所以你想开发一个包管理系统》，从无关特定语言的角度，介绍一个包管理系统的方方面面: <a href="https://link.juejin.im?target=https%3A%2F%2Fbit.ly%2F2G36U1e" target="_blank" rel="nofollow noopener noreferrer">So you want to write a package manager</a>
      
    
  </div>
 作者：rianma<br /> 链接：https://juejin.im/post/5ab3f77df265da2392364341<br /> 来源：掘金<br /> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
</div>
