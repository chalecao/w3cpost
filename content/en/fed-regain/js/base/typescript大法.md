---
title: typescript大法


date: 2020-03-03T04:02:26+00:00
url: /javascriptnodejs/5649.html
views:
  - 834


---
介绍下`tsconfig`

开始使用 `tsconfig.json` 是一件比较容易的事，你仅仅需要写下：

<div class="language-json extra-class">
  <pre class="language-json"><code>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">}&lt;/span>
</code></pre>
</div>

例如，在项目的根目录下创建一个空 JSON 文件。通过这种方式，TypeScript 将 会把此目录和子目录下的所有 .ts 文件作为编译上下文的一部分，它还会包含一部分默认的编译选项。

### <a class="header-anchor" href="https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9" aria-hidden="true">#</a>编译选项 {#编译选项}

你可以通过 `compilerOptions` 来定制你的编译选项：

<div class="language-js extra-class">
  <pre class="language-js"><code>&lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token string">"compilerOptions"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">{&lt;/span>

    &lt;span class="token comment">/* 基本选项 */&lt;/span>
    &lt;span class="token string">"target"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"es5"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'&lt;/span>
    &lt;span class="token string">"module"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"commonjs"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                  &lt;span class="token comment">// 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'&lt;/span>
    &lt;span class="token string">"lib"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>                             &lt;span class="token comment">// 指定要包含在编译中的库文件&lt;/span>
    &lt;span class="token string">"allowJs"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 允许编译 javascript 文件&lt;/span>
    &lt;span class="token string">"checkJs"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 报告 javascript 文件中的错误&lt;/span>
    &lt;span class="token string">"jsx"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"preserve"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                     &lt;span class="token comment">// 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'&lt;/span>
    &lt;span class="token string">"declaration"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                   &lt;span class="token comment">// 生成相应的 '.d.ts' 文件&lt;/span>
    &lt;span class="token string">"sourceMap"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                     &lt;span class="token comment">// 生成相应的 '.map' 文件&lt;/span>
    &lt;span class="token string">"outFile"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 将输出文件合并为一个文件&lt;/span>
    &lt;span class="token string">"outDir"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                        &lt;span class="token comment">// 指定输出目录&lt;/span>
    &lt;span class="token string">"rootDir"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 用来控制输出目录结构 --outDir.&lt;/span>
    &lt;span class="token string">"removeComments"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                &lt;span class="token comment">// 删除编译后的所有的注释&lt;/span>
    &lt;span class="token string">"noEmit"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                        &lt;span class="token comment">// 不生成输出文件&lt;/span>
    &lt;span class="token string">"importHelpers"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                 &lt;span class="token comment">// 从 tslib 导入辅助工具函数&lt;/span>
    &lt;span class="token string">"isolatedModules"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>               &lt;span class="token comment">// 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.&lt;/span>

    &lt;span class="token comment">/* 严格的类型检查选项 */&lt;/span>
    &lt;span class="token string">"strict"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                        &lt;span class="token comment">// 启用所有严格类型检查选项&lt;/span>
    &lt;span class="token string">"noImplicitAny"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                 &lt;span class="token comment">// 在表达式和声明上有隐含的 any类型时报错&lt;/span>
    &lt;span class="token string">"strictNullChecks"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>              &lt;span class="token comment">// 启用严格的 null 检查&lt;/span>
    &lt;span class="token string">"noImplicitThis"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                &lt;span class="token comment">// 当 this 表达式值为 any 类型的时候，生成一个错误&lt;/span>
    &lt;span class="token string">"alwaysStrict"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                  &lt;span class="token comment">// 以严格模式检查每个模块，并在每个文件里加入 'use strict'&lt;/span>

    &lt;span class="token comment">/* 额外的检查 */&lt;/span>
    &lt;span class="token string">"noUnusedLocals"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                &lt;span class="token comment">// 有未使用的变量时，抛出错误&lt;/span>
    &lt;span class="token string">"noUnusedParameters"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>            &lt;span class="token comment">// 有未使用的参数时，抛出错误&lt;/span>
    &lt;span class="token string">"noImplicitReturns"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>             &lt;span class="token comment">// 并不是所有函数里的代码都有返回值时，抛出错误&lt;/span>
    &lt;span class="token string">"noFallthroughCasesInSwitch"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>    &lt;span class="token comment">// 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）&lt;/span>

    &lt;span class="token comment">/* 模块解析选项 */&lt;/span>
    &lt;span class="token string">"moduleResolution"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"node"&lt;/span>&lt;span class="token punctuation">,&lt;/span>            &lt;span class="token comment">// 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)&lt;/span>
    &lt;span class="token string">"baseUrl"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 用于解析非相对模块名称的基目录&lt;/span>
    &lt;span class="token string">"paths"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">{&lt;/span>&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">,&lt;/span>                           &lt;span class="token comment">// 模块名到基于 baseUrl 的路径映射的列表&lt;/span>
    &lt;span class="token string">"rootDirs"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>                        &lt;span class="token comment">// 根文件夹列表，其组合内容表示项目运行时的结构内容&lt;/span>
    &lt;span class="token string">"typeRoots"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 包含类型声明的文件列表&lt;/span>
    &lt;span class="token string">"types"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>                           &lt;span class="token comment">// 需要包含的类型声明文件名列表&lt;/span>
    &lt;span class="token string">"allowSyntheticDefaultImports"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>  &lt;span class="token comment">// 允许从没有设置默认导出的模块中默认导入。&lt;/span>

    &lt;span class="token comment">/* Source Map Options */&lt;/span>
    &lt;span class="token string">"sourceRoot"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                    &lt;span class="token comment">// 指定调试器应该找到 TypeScript 文件而不是源文件的位置&lt;/span>
    &lt;span class="token string">"mapRoot"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token string">"./"&lt;/span>&lt;span class="token punctuation">,&lt;/span>                       &lt;span class="token comment">// 指定调试器应该找到映射文件而不是生成文件的位置&lt;/span>
    &lt;span class="token string">"inlineSourceMap"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>               &lt;span class="token comment">// 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件&lt;/span>
    &lt;span class="token string">"inlineSources"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>                 &lt;span class="token comment">// 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性&lt;/span>

    &lt;span class="token comment">/* 其他选项 */&lt;/span>
    &lt;span class="token string">"experimentalDecorators"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>&lt;span class="token punctuation">,&lt;/span>        &lt;span class="token comment">// 启用装饰器&lt;/span>
    &lt;span class="token string">"emitDecoratorMetadata"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token boolean">true&lt;/span>          &lt;span class="token comment">// 为装饰器提供元数据的支持&lt;/span>
  &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
</div>

关于这些（或者更多）编译选项，稍后将会讨论。

  * noEmit，注意这个，配置了之后编译会没有文件输出，这个应用场景是只想用tsc做类型check，而不想输出文件

### <a class="header-anchor" href="https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#typescript-%E7%BC%96%E8%AF%91" aria-hidden="true">#</a>TypeScript 编译 {#typescript-编译}

好的 IDE 支持对 TypeScript 的即时编译。但是，如果你想在使用 `tsconfig.json` 时从命令行手动运行 TypeScript 编译器，你可以通过以下方式：

  * 运行 tsc，它会在当前目录或者是父级目录寻找 `tsconfig.json` 文件。
  * 运行 `tsc -p ./path-to-project-directory` 。当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。

你甚至可以使用 `tsc -w` 来启用 TypeScript 编译器的观测模式，在检测到文件改动之后，它将重新编译。

## <a class="header-anchor" href="https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E6%8C%87%E5%AE%9A%E6%96%87%E4%BB%B6" aria-hidden="true">#</a>指定文件 {#指定文件}

你也可以显式指定需要编译的文件：

<div class="language-js extra-class">
  <pre class="language-js"><code>&lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token string">"files"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>
    &lt;span class="token string">"./some/file.ts"&lt;/span>
  &lt;span class="token punctuation">]&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
</div>

你还可以使用 `include` 和 `exclude` 选项来指定需要包含的文件和排除的文件：

<div class="language-js extra-class">
  <pre class="language-js"><code>&lt;span class="token punctuation">{&lt;/span>
  &lt;span class="token string">"include"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>
    &lt;span class="token string">"./folder"&lt;/span>
  &lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">,&lt;/span>
  &lt;span class="token string">"exclude"&lt;/span>&lt;span class="token punctuation">:&lt;/span> &lt;span class="token punctuation">[&lt;/span>
    &lt;span class="token string">"./folder/**/*.spec.ts"&lt;/span>&lt;span class="token punctuation">,&lt;/span>
    &lt;span class="token string">"./folder/someSubFolder"&lt;/span>
  &lt;span class="token punctuation">]&lt;/span>
&lt;span class="token punctuation">}&lt;/span>
</code></pre>
</div>

<div class="tip custom-block">
  <p class="custom-block-title">
    注意
  </p>
  
  <p>
    使用 <code>globs</code>：<code>**/*</code> （一个示例用法：<code>some/folder/**/*</code>）意味着匹配所有的文件夹和所有文件（扩展名为 <code>.ts/.tsx</code>，当开启了 <code>allowJs: true</code> 选项时，扩展名可以是 <code>.js/.jsx</code>）。
  </p>
  
  <h2>
    参考：
  </h2>
  
  <ul>
    <li>
      <a href="https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9">typescript</a>
    </li>
    <li>
      <a href="https://jkchao.github.io/typescript-book-chinese/compiler/overview.html#%E6%96%87%E4%BB%B6%EF%BC%9Autilities">typescript编译原理</a>
    </li>
  </ul>
</div>