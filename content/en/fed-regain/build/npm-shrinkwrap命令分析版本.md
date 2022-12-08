---
title: npm shrinkwrap命令分析版本





---
<div id="content_views" class="markdown_views prism-atom-one-light">
  <blockquote>
    
      npm采用语义化的版本号 semver 进行控制，让开发过程中依赖的获取和升级变得非常容易，但不严格的版本号控制，也带来了不确定性~~
    

    <ul>
      
        npm 建议使用semver版本，部分包不遵循semver；
      
      
        package.json 可以使用精确的版本号控制你的直接依赖包，但第三方依赖的包无法管理；
      
      
        在开发阶段执行得到的版本，和后续部署时得到的可能是不一致的，更不可控的是，你依赖的第三方包也有这样的情况会导致潜在的上线风险。
      
    
  </blockquote>
 目前主流的版本控制使用的是 <a href="https://semver.org/lang/zh-CN/" rel="nofollow">semver</a> 语义化版本。即，X.Y.Z （主版本号.次版本号.修订号）
  
  <ul>
    
      主版本号：当你做了不兼容的 API 修改
    
    
      次版本号：当你做了向下兼容的功能性新增
    
    
      修订号：当你做了向下兼容的问题修正
    
  
 也可以将先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。(v1.2.2-beta)
  
  <pre class="prettyprint"><code class="prism language-shell has-numbering" style="position: unset;"><span class="token comment"># 查看当前哪些包需要更新</span>
$ <span class="token function">npm</span> outdated -g -depth<span class="token operator">=</span>0</code></pre>
  <div class="table-box">
    <table>
      <tr>
        <th>
          Package
        </th>

        <th>
          Current
        </th>
        
        <th>
          Wanted
        </th>
        
        <th>
          Latest
        </th>
      </tr>
      
      <tr>
        <td>
          webpack
        </td>
        
        <td>
          4.6.0
        </td>
        
        <td>
          4.17.1
        </td>
        
        <td>
          4.17.1
        </td>
      </tr>
      
      <tr>
        <td>
          pm2
        </td>
        
        <td>
          2.6.1
        </td>
        
        <td>
          2.10.4
        </td>
        
        <td>
          3.0.4
        </td>
      </tr>
      
      <tr>
        <td>
          commitizen
        </td>
        
        <td>
          2.9.6
        </td>
        
        <td>
          2.10.1
        </td>
        
        <td>
          2.10.1
        </td>
      </tr>
    </table>
  </div>
  ##   <a name="t1"></a><a name="t1"></a><a id="_28"></a>安装依赖
  

npm install 会生成 package.json，以及 node_modules (依赖树)。
  
  <blockquote>
    
      同一套 <code>package.json</code> 生成相同的 node_modules 吗？实际情况并非如此！
    
  </blockquote>
  <ul>
    
      不同的npm版本，安装算法可能存在差异；
    
    
      依赖包发布了新 semver-range 版本；
    
    
      某个依赖项的依赖发布了新版本，且其使用 <code>^1.2.3</code> 方式，即使你的项目中制定了固定版本；
    
    
      安装的版本不在可用，或出现版本变异。
    
  
  ##   <a name="t2"></a><a name="t2"></a><a id="_39"></a>锁定依赖
  

 默认情况下，当用 <code>--save/-S</code> 或者 <code>--save-dev/-D</code> 安装一个模块时，npm 通过脱字符(^)来限定所安装模块的主版本号。
  
  <h3>
    <a name="t3"></a><a name="t3"></a><a id="prefix_43"></a>方式一：prefix控制
  </h3>
  <div class="table-box">
    <table>
      <tr>
        <th>
          符号
        </th>

        <th>
          当运行 <code>npm update</code> 时，情况说明
        </th>
        
        <th>
          备注
        </th>
      </tr>
      
      <tr>
        <td>
          <code>^1.5.1</code>
        </td>
        
        <td>
          【限制主版本号】允许安装版本号大于 <code>1.5.1</code> 但小于 <code>2.0.0</code> 版本的模块
        </td>
        
        <td>
          默认
        </td>
      </tr>
      
      <tr>
        <td>
          <code>~1.5.1</code>
        </td>
        
        <td>
          【<a href="https://docs.npmjs.com/misc/config#save-prefix" rel="nofollow">限制次要版本</a>】 允许安装版本号大于 <code>1.5.1</code> 但小于 <code>1.6.0</code> 版本的模块
        </td>
        
        <td>
          <code>npm config set save-prefix="~"</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>1.5.1</code>
        </td>
        
        <td>
          【<a href="https://docs.npmjs.com/misc/config#save-exact" rel="nofollow">精确控制</a>】允许安装版本号大于 <code>1.5.1</code>
        </td>
        
        <td>
          <code>npm config set save-exact true</code>
        </td>
      </tr>
    </table>
  </div>
 所以，[我们](https://www.w3cdoc.com)可以将需要安装的模块版本前缀默认设置成波浪号(~)；对于那些偏执的认为任何更新(模块的行为)会破坏系统的人，可以配置npm仅安装精确版本号的模块。
  
  <h3>
    <a name="t4"></a><a name="t4"></a><a id="shrinkwrap_53"></a>方式二：shrinkwrap
  </h3>
 另一个选择是，可以在项目中使用 <a href="https://docs.npmjs.com/cli/shrinkwrap" rel="nofollow">shrinkwrap</a>，在开发阶段依赖稳定后，运行如下命令：
  
  <pre class="prettyprint"><code class="prism language-shell has-numbering" style="position: unset;"><span class="token function">npm</span> shrinkwrap
<span class="token function">npm</span> shrinkwrap--dev <span class="token comment"># 将dev-dependencies计算在内</span></code></pre>
 这会生成一个 <code>shrinkwrap.json</code> 文件，该文件包含了你正在使用的模块的指定版本。当运行 <code>npm install</code>时，该文件所指定的模块版本会覆盖 <code>package.json</code> 文件中所指定的版本。
  
注意问题：
  
  <ul>
    
      shrinkwrap计算时是根据当前依赖安装的目录结构生成的，如果你不能保证package.json文件定义的依赖与<code>node_modules</code>下已安装的依赖是匹配、无冗余的，建议在执行shrinkwrap命令前清理依赖并重新安装（rm -rf node_modules && npm install）或精简依赖（npm prune）。
    
    
      默认情况下，shrinkwrap只计算dependencies依赖，而不计算dev-dependencies，如果在生产环境也需要开发依赖或你的依赖分类不清晰，使用<code>--dev</code>参数生成shrinkwrap文件确保不会出问题。
    
  
  <blockquote>
    
      增加、更新、删除包的步骤如下：
    

    
     第一步： 安装指定版本包 <code>npm install/uninstall package_name@version --save</code> ；
    
    
    
     第二步： 测试功能，功能正常后，执行 <code>npm shrinkwrap</code> 把依赖写入 shrinkwrap 文件；
    
    
    
     第三步： 在代码库中提交 shrinkwrap / package.json 描述。
    
  </blockquote>
  ##   <a name="t5"></a><a name="t5"></a><a id="_77"></a>版本控制
  

  <h3>
    <a name="t6"></a><a name="t6"></a><a id="packagelockjson_79"></a>package-lock.json
  </h3>
 对于 node_modules 或 package.json 的任何修改，都会自动生成 package-lock.json。它描述了生成的确切树，以便后续安装能够生成相同的树，而不管中间依赖性更新。
  
  <h3>
    <a name="t7"></a><a name="t7"></a><a id="shrinkwrapjson_83"></a><code>shrinkwrap.json</code>
  </h3>
 为防止出现这种潜在问题，npm使用 <code>package-lock.json</code> 或 <code>npm-shrinkwrap.json</code>（如果存在）。这些文件称为包锁或锁文件。
  
  <pre class="prettyprint"><code class="prism language-json has-numbering" style="position: unset;"><span class="token punctuation">{</span>
  <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"A"</span><span class="token punctuation">,</span>
  <span class="token string">"version"</span><span class="token punctuation">:</span> <span class="token string">"0.1.0"</span><span class="token punctuation">,</span>
  <span class="token operator">...</span>metadata fields<span class="token operator">...</span>
  <span class="token string">"dependencies"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"B"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token string">"version"</span><span class="token punctuation">:</span> <span class="token string">"0.0.1"</span><span class="token punctuation">,</span>
      <span class="token string">"resolved"</span><span class="token punctuation">:</span> <span class="token string">"https://registry.npmjs.org/B/-/B-0.0.1.tgz"</span><span class="token punctuation">,</span>
      <span class="token string">"integrity"</span><span class="token punctuation">:</span> <span class="token string">"sha512-DeAdb33F+"</span>
      <span class="token string">"dependencies"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"C"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
          <span class="token string">"version"</span><span class="token punctuation">:</span> <span class="token string">"git://github.com/org/C.git#5c380ae319fc4efe9e7f2d9c78b0faa588fd99b4"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
 该文件描述了一个精确的、可重现的 node_modules 树。一旦它出现，任何未来的安装将基于此文件的工作，而不是从 <code>package.json</code> 重新计算依赖版本。此外，如果 <code>package-lock.json</code> 和 <code>npm-shrinkwrap.json</code> 都存在于包根目录中，则将忽略 <code>package-lock.json</code> 。
  
 <code>npm install</code>，<code>npm rm</code>，<code>npm update</code> 等都将自动同步现有的锁文件。为了防止发生这种更新，你可以使用<code>--no-save</code> 选项来防止完全保存，或者 <code>--no-shrinkwrap</code> 允许更新 <code>package.json</code> 保留 <code>package-lock.json</code> 或<code>npm-shrinkwrap.json</code> 。
  
注意：强烈建议库作者不要发布此文件，因为这会阻止最终用户控制传递依赖性更新。
  
 可以基于shrinkwrap命令来查看版本，shrinkwrap本来是用于锁定依赖版本的，也可以根据生成文件来查看模块依赖。
  
  <h3>
    <a name="t8"></a><a name="t8"></a><a id="_113"></a>问题补充
  </h3>
 npm@5、npm@6 版本对于 requires 机制差异！（下图左侧npm@5，右侧npm@6）
  
 <img loading="lazy" width="690" height="226" class="alignnone size-full wp-image-5618 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e4bae8b5b55e.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e4bae8b5b55e.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e4bae8b5b55e.png?x-oss-process=image/format,webp 690w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2020/02/img_5e4bae8b5b55e.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_98/format,webp 300w" sizes="(max-width: 690px) 100vw, 690px" />
  
 是由于官方对其处理方式做了变更：<br /> 相关社区讨论：<a href="https://npm.community/t/package-lock-json-contains-dynamic-version/6080/9" rel="nofollow">https://npm.community/t/package-lock-json-contains-dynamic-version/6080/9</a><br /> 相关ChangeLog说明：<a href="https://github.com/npm/cli/blob/latest/CHANGELOG.md#new-features-7">https://github.com/npm/cli/blob/latest/CHANGELOG.md#new-features-7</a>
</div>
