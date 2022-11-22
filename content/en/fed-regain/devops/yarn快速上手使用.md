---
title: yarn快速上手使用




---
<p id="OctSexx">
  <img loading="lazy" class="alignnone wp-image-4992 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/format,webp" alt="" width="477" height="214" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/format,webp 4812w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_135/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_344/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d6877a8423b7.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_359/format,webp 800w" sizes="(max-width: 477px) 100vw, 477px" />
</p>

# 简介 {#简介}

Yarn 是一个 JS 包依赖管理器。官网：<https://yarnpkg.com/>

特点：

* 快速。每个包都会被缓存，故只会下载一次。并行操作提速安装过程。
* 安全。使用检验和对每个已安装的包进行完全性检验，之后才会运行。
* 可靠。相同的依赖，无论安装次序，在所有的机器上都按同样方式安装。

# 安装 {#安装}

在 Ubuntu 上：

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>curl &lt;span class="nt">-sS&lt;/span> https://dl.yarnpkg.com/debian/pubkey.gpg | &lt;span class="nb">sudo &lt;/span>apt-key add -
&lt;span class="nv">$ &lt;/span>&lt;span class="nb">echo&lt;/span> &lt;span class="s2">"deb https://dl.yarnpkg.com/debian/ stable main"&lt;/span> | &lt;span class="nb">sudo &lt;/span>tee /etc/apt/sources.list.d/yarn.list

&lt;span class="nv">$ &lt;/span>&lt;span class="nb">sudo &lt;/span>apt-get update &lt;span class="o">&&&lt;/span> &lt;span class="nb">sudo &lt;/span>apt-get install yarn
</code></pre>
  </div>
</div>

如果安装失败，可以先尝试删除 cmdtest: <code class="highlighter-rouge">sudo apt remove cmdtest</code>。

虽然官方提供了很多安装方式，但太麻烦了，还是用最简单的吧

### window

<pre class="hljs shell"><code class="shell">npm install -g yarn
</code></pre>

### 其它系统

<pre class="hljs shell"><code class="shell">sudo npm install -g yarn</code><code class="shell"></code></pre>

安装好后：

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn &lt;span class="nt">--version&lt;/span>
</code></pre>
  </div>
</div>

# 使用 {#使用}

## 创建一个项目 {#创建一个项目}

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn init
</code></pre>
  </div>
</div>

## 添加依赖 {#添加依赖}

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn add package
&lt;span class="nv">$ &lt;/span>yarn add package@version
&lt;span class="nv">$ &lt;/span>yarn add package@tag
</code></pre>
  </div>
</div>

## 将依赖添加到不同的依赖目录 {#将依赖添加到不同的依赖目录}

例如添加到 <code class="highlighter-rouge">devDependencies</code>, <code class="highlighter-rouge">peerDependencies</code>, <code class="highlighter-rouge">optionalDependencies</code> 等。

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn add package &lt;span class="nt">--dev&lt;/span>
&lt;span class="nv">$ &lt;/span>yarn add package &lt;span class="nt">--peer&lt;/span>
&lt;span class="nv">$ &lt;/span>yarn add package &lt;span class="nt">--optional&lt;/span>
</code></pre>
  </div>
</div>

## 升级依赖包 {#升级依赖包}

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn upgrade package
&lt;span class="nv">$ &lt;/span>yarn upgrade package@version
&lt;span class="nv">$ &lt;/span>yarn upgrade package@tag
</code></pre>
  </div>
</div>

## 删除依赖 {#删除依赖}

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn remove package
</code></pre>
  </div>
</div>

## 安装项目中的所有依赖 {#安装项目中的所有依赖}

<div class="language-bash highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="nv">$ &lt;/span>yarn  &lt;span class="c"># or&lt;/span>
&lt;span class="nv">$ &lt;/span>yarn install
</code></pre>
  </div>
</div>

# 包配置文件 {#包配置文件}

每个包都有一个配置文件 <code class="highlighter-rouge">package.json</code>，Yarn 据该文件识别每个包，并进行处理。

Yarn 会在项目的根目录下创建一个 <code class="highlighter-rouge">yarn.lock</code> 文件，用于管理依赖关联，我们无需修改该文件，并需要将该文件包含进代码库中。

## package.json {#packagejson}

<code class="highlighter-rouge">name</code> 和 <code class="highlighter-rouge">version</code> 项组合成一个唯一的标识。

开发和生产环境下都需要的依赖放在 <code class="highlighter-rouge">dependencies</code> 下，如：

<div class="language-json highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="p">{&lt;/span>
  &lt;span class="s2">"dependencies"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="s2">"package-1"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="s2">"^3.1.4"&lt;/span>
  &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>
</code></pre>
  </div>
</div>

可以指定精确的版本，最小版本 <code class="highlighter-rouge">&gt;=</code>，一个版本区间 <code class="highlighter-rouge">&gt;= ... &lt;</code>。

开发环境下的依赖放在 <code class="highlighter-rouge">devDependencies</code> 中：

<div class="language-json highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="p">{&lt;/span>
  &lt;span class="s2">"devDependencies"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="s2">"package-2"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="s2">"^0.4.2"&lt;/span>
  &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>
</code></pre>
  </div>
</div>

<code class="highlighter-rouge">peerDependencies</code> 可用来声明你的包与其它包的兼容性：

<div class="language-json highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="p">{&lt;/span>
  &lt;span class="s2">"peerDependencies"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="s2">"package-3"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="s2">"^2.7.18"&lt;/span>
  &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>
</code></pre>
  </div>
</div>

<code class="highlighter-rouge">optionalDependencies</code> 中的包若没有找到，安装过程也会继续：

<div class="language-json highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="p">{&lt;/span>
  &lt;span class="s2">"optionalDependencies"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="s2">"package-5"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="s2">"^1.6.1"&lt;/span>
  &lt;span class="p">}&lt;/span>
&lt;span class="p">}&lt;/span>
</code></pre>
  </div>
</div>

<code class="highlighter-rouge">bundledDependencies</code> 中的包，当你的包发布时，会一起打包进来：

<div class="language-json highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>&lt;span class="p">{&lt;/span>
  &lt;span class="s2">"bundledDependencies"&lt;/span>&lt;span class="p">:&lt;/span> &lt;span class="p">[&lt;/span>
    &lt;span class="s2">"package-4"&lt;/span>
  &lt;span class="p">]&lt;/span>
&lt;span class="p">}&lt;/span>
</code></pre>
  </div>
</div>

# Yarn 工作流 {#yarn-工作流}

## 创建 Yarn 工程 {#创建-yarn-工程}

一般在项目的根目录下运行 <code class="highlighter-rouge">yarn init</code> 命令，回答一些项目相关的问题，之后创建一个 <code class="highlighter-rouge">package.json</code> 文件，用来保存项目及其依赖信息。

## 管理依赖 {#管理依赖}

使用 Yarn 的 add, upgrade, remove 等命令来管理依赖，这些命令会自动更新 <code class="highlighter-rouge">package.json</code> 及 <code class="highlighter-rouge">yarn.lock</code> 文件的内容。

## 安装依赖包 {#安装依赖包}

使用 <code class="highlighter-rouge">yarn install</code> 来安装项目的全部依赖包，依赖包信息从 <code class="highlighter-rouge">package.json</code> 中提取，并保存到 <code class="highlighter-rouge">yarn.lock</code> 文件中。

安装方式：

  1. 安装全部依赖： <code class="highlighter-rouge">yarn</code> 或 <code class="highlighter-rouge">yarn install</code>
  2. 每个包只安装一个版本： <code class="highlighter-rouge">yarn install --flat</code>
  3. 强制重装下载安装全部包： <code class="highlighter-rouge">yarn install --force</code>
  4. 只安装生产环境下的依赖： <code class="highlighter-rouge">yarn install --production</code>

## 版本控制 {#版本控制}

必须将以下 2 个文件加入代码库中。

* <code class="highlighter-rouge">package.json</code>： 包含当前的所有依赖信息。
* <code class="highlighter-rouge">yarn.lock</code>： 保存了每个已安装的依赖包的信息。

# 从 npm 迁移到 Yarn {#从-npm-迁移到-yarn}

Yarn 和 Npm 基本上是兼容的，Yarn 可以使用 npm 创建的 <code class="highlighter-rouge">package.json</code>，可以安装 npm registry 中的任何包。一般只需运行 <code class="highlighter-rouge">yarn</code>，将生成的 <code class="highlighter-rouge">yarn.lock</code> 文件加入代码库即完成迁移。见 https://yarnpkg.com/en/docs/migrating-from-npm。

<div>
  <div>
    <h2>
      初始化一个项目
    </h2>

    <pre class="hljs shell"><code class="shell">yarn init
</code></pre>

    <p>
      功能跟npm init 几乎一样
    </p>
    
    <p>
      以默认值初始化
    </p>
    
    <pre class="hljs shell"><code class="shell">yarn init --yes
yarn init -y
</code></pre>

    <p>
      与npm也雷同
    </p>
    
    <pre class="hljs shell"><code class="shell">npm init -f
</code></pre>

    <p>
      添加依赖
    </p>
    
    <pre class="hljs shell"><code class="shell">yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
</code></pre>

    <p>
      正如npm以下命令一样
    </p>
    
    <pre class="hljs shell"><code class="shell">npm install [package]
npm install [package]@[version]
npm install [package]@[tag]
</code></pre>

    <table>
      <tr>
        <th>
          yarn
        </th>
        
        <th>
          npm
        </th>
        
        <th>
          备注
        </th>
      </tr>
      
      <tr>
        <td>
          yarn add [package]
        </td>
        
        <td>
          npm install [package] &#8211;save
        </td>
        
        <td>
          add默认添加到dependencies
        </td>
      </tr>
      
      <tr>
        <td>
          yarn add [package] &#8211;dev
        </td>
        
        <td>
          npm install [package] &#8211;save-dev
        </td>
        
        <td>
          无
        </td>
      </tr>
      
      <tr>
        <td>
          yarn remove [package]
        </td>
        
        <td>
          npm uninstall [package] &#8211;save /&#8211;save-dev
        </td>
        
        <td>
          无
        </td>
      </tr>
      
      <tr>
        <td>
          yarn global install [package]
        </td>
        
        <td>
          npm install [package] -g
        </td>
        
        <td>
          无
        </td>
      </tr>
      
      <tr>
        <td>
          yarn global remove [package]
        </td>
        
        <td>
          npm uninstall [package] -g remove
        </td>
        
        <td>
          无
        </td>
      </tr>
      
      <tr>
        <td>
          yarn run
        </td>
        
        <td>
          npm run
        </td>
        
        <td>
          无
        </td>
      </tr>
      
      <tr>
        <td>
          yarn test
        </td>
        
        <td>
          npm test
        </td>
        
        <td>
          无
        </td>
      </tr>
    </table>
    
    <pre class="hljs shell"><code class="shell">yarn install [package] --peer
</code></pre>

    <p>
      还可以安装平行依赖呢
    </p>
    
    <h2>
      强制重装所有模块
    </h2>
    
    <pre class="hljs shell"><code class="shell">yarn install --force
</code></pre>

    <p>
      yarn 是从npm下载模块的，完全兼容已经在用npm的项目，可以无缝切换。<br /> yarn 安装过后会在项目根目录下生成并自动管理yarn.lock文件，把这个文件加入到git版本控制中，这个文件记录了依赖安装的版本和结构信息，通过同步给别人，别人再用yarn安装，可以确保你们生成的目录结构和包版本信息完全一致。
    </p>
  </div>
</div>

# 参考 {#参考}

* https://yarnpkg.com/
* https://yarnpkg.com/en/docs/install
* https://yarnpkg.com/en/docs/yarn-workflow
* https://yarnpkg.com/en/docs/migrating-from-npm
* https://yarnpkg.com/en/docs/configuration
