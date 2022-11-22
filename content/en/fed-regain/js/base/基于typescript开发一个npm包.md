---
title: 基于typescript开发一个npm包


baidu_record:
  - 1


---
很多时候，我们可能想要用 typescript 语言来创建一些模块，并提交到 npm 供别人使用，

**那么在 2018 年，如果我想要初始化这样的一个模块，我需要做哪些步骤呢？**：

答案是：**创建一个优雅的，对开发者友好的模块，至少需要以下 15 个步骤**

<ol class="ol-level-0">
  <li>
    初始化文件夹，初始化 git 仓库，初始化 npm，初始化 tsc
  </li>
  <li>
    修改 tsconfig.js 配置
  </li>
  <li>
    添加 npm 脚本
  </li>
  <li>
    添加 tslint 校验代码规则以及 editorconfig,prettier 统一代码风格
  </li>
  <li>
    设置 git 提交的校验钩子
  </li>
  <li>
    开始编写代码
  </li>
  <li>
    watch 模式开发
  </li>
  <li>
    忽略 ts 编译生成的文件夹
  </li>
  <li>
    添加单元测试
  </li>
  <li>
    写一个单元测试示例
  </li>
  <li>
    设置一些有用的 npm 脚本
  </li>
  <li>
    完善 package.json 的描述信息
  </li>
  <li>
    提交代码到 git 仓库
  </li>
  <li>
    发布包到 <a href="http://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">npm</a>
  </li>
</ol>

本篇文章里，我会列出每个步骤的详细说明。

实际开发中，如果每个包都去走一遍这些步骤，步骤好像确实有点多。所以如果你需要实际创建项目的时候，你可以选择 clone 我提供的<a href="https://github.com/xiaomingplus/npm-typescript-boilerplate" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">样板项目</a> 来开始一个新的 ts 模块的开发，主要步骤如下：

<pre class="prism-token token  language-js">git clone https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>xiaomingplus<span class="token operator">/</span>npm<span class="token operator">-</span>typescript<span class="token operator">-</span>boilerplate<span class="token punctuation">.</span>git your<span class="token operator">-</span>project<span class="token operator">-</span>name
cd your<span class="token operator">-</span>project<span class="token operator">-</span>name
# 安装依赖
npm i
# 开始开发
npm start
# 修改 <span class="token keyword">package</span><span class="token punctuation">.</span>json 里面的项目名和简介
# 修改 README<span class="token punctuation">.</span>md 文件内容
# 修改 远程仓库的地址
git remote <span class="token keyword">set</span><span class="token operator">-</span>url origin your<span class="token operator">-</span>git<span class="token operator">-</span>url</pre>

下面就是常规步骤了，学习目的的话，建议按照下面的步骤全部跑一遍：

## 1. 初始化文件夹，初始化 npm，初始化 tsc {#1.-%E5%88%9D%E5%A7%8B%E5%8C%96%E6%96%87%E4%BB%B6%E5%A4%B9%EF%BC%8C%E5%88%9D%E5%A7%8B%E5%8C%96-npm%EF%BC%8C%E5%88%9D%E5%A7%8B%E5%8C%96-tsc}

<pre class="prism-token token  language-js">mkdir project<span class="token operator">-</span>name
cd project<span class="token operator">-</span>name
# 初始化git项目
git init
# 添加gitignore文件
touch <span class="token punctuation">.</span>gitignore
# 复制这个地址的ignore内容到<span class="token punctuation">.</span>gitignore <span class="token operator">&lt;</span>https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>github<span class="token operator">/</span>gitignore<span class="token operator">/</span>blob<span class="token operator">/</span>master<span class="token operator">/</span>Node<span class="token punctuation">.</span>gitignore<span class="token operator">&gt;</span>

# 添加readme文件
echo <span class="token string">"# My Awesome Typescript Project"</span> <span class="token operator">&gt;&gt;</span> README<span class="token punctuation">.</span>md
# 安装typescript
npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev typescript
# 初始化npm包
npm init <span class="token operator">--</span>y
# 初始化tsconfig
tsc <span class="token operator">--</span>init</pre>

## 2. 修改 tsconfig.js 配置 {#2.-%E4%BF%AE%E6%94%B9-tsconfig.js-%E9%85%8D%E7%BD%AE}

修改以下默认配置：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
    <span class="token string">"compilerOptions"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"declaration"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token string">"outDir"</span><span class="token punctuation">:</span> <span class="token string">"./lib"</span><span class="token punctuation">,</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">"include"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"src"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">"exclude"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"node_modules"</span><span class="token punctuation">,</span> <span class="token string">"**/__tests__/*"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span></pre>

最终的 tsconfig 配置如下：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
    <span class="token string">"compilerOptions"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"target"</span><span class="token punctuation">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>
        <span class="token string">"module"</span><span class="token punctuation">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>
        <span class="token string">"declaration"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token string">"strict"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token string">"outDir"</span><span class="token punctuation">:</span> <span class="token string">"./lib"</span><span class="token punctuation">,</span>
        <span class="token string">"esModuleInterop"</span><span class="token punctuation">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">"include"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"src"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">"exclude"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"node_modules"</span><span class="token punctuation">,</span> <span class="token string">"**/__tests__/*"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span></pre>

## 3. 添加 npm 脚本 {#3.-%E6%B7%BB%E5%8A%A0-npm-%E8%84%9A%E6%9C%AC}

在 package.json 里编辑 scripts 字段:

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token string">"tsc -w"</span><span class="token punctuation">,</span>
    <span class="token string">"build"</span><span class="token punctuation">:</span> <span class="token string">"tsc"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

## 4. 添加 tslint 校验代码规则以及 editorconfig,prettier 统一代码风格 {#4.-%E6%B7%BB%E5%8A%A0-tslint-%E6%A0%A1%E9%AA%8C%E4%BB%A3%E7%A0%81%E8%A7%84%E5%88%99%E4%BB%A5%E5%8F%8A-editorconfig,prettier-%E7%BB%9F%E4%B8%80%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC}

<pre class="prism-token token  language-js">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev prettier tslint tslint<span class="token operator">-</span>config<span class="token operator">-</span>prettier</pre>

新建`tslint.json`文件

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"extends"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"tslint:recommended"</span><span class="token punctuation">,</span> <span class="token string">"tslint-config-prettier"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">"rules"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"no-console"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token string">"object-literal-sort-keys"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token string">"member-access"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token string">"ordered-imports"</span><span class="token punctuation">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">"linterOptions"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"exclude"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"**/*.json"</span><span class="token punctuation">,</span> <span class="token string">"node_modules"</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

新建 **.prettierrc** 文件

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"trailingComma"</span><span class="token punctuation">:</span> <span class="token string">"all"</span><span class="token punctuation">,</span>
  <span class="token string">"tabWidth"</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token string">"semi"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string">"singleQuote"</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string">"endOfLine"</span><span class="token punctuation">:</span> <span class="token string">"lf"</span><span class="token punctuation">,</span>
  <span class="token string">"printWidth"</span><span class="token punctuation">:</span> <span class="token number">120</span><span class="token punctuation">,</span>
  <span class="token string">"overrides"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">"files"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"*.md"</span><span class="token punctuation">,</span> <span class="token string">"*.json"</span><span class="token punctuation">,</span> <span class="token string">"*.yml"</span><span class="token punctuation">,</span> <span class="token string">"*.yaml"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string">"options"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"tabWidth"</span><span class="token punctuation">:</span> <span class="token number">2</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span></pre>

新建 **.editorconfig**

<pre class="prism-token token  language-js"># EditorConfig is awesome<span class="token punctuation">:</span> https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>EditorConfig<span class="token punctuation">.</span>org

# top<span class="token operator">-</span>most EditorConfig file
root <span class="token operator">=</span> <span class="token boolean">true</span>

# Unix<span class="token operator">-</span>style newlines <span class="token keyword">with</span> a newline ending every file
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
end_of_line <span class="token operator">=</span> lf
insert_final_newline <span class="token operator">=</span> <span class="token boolean">true</span>
charset <span class="token operator">=</span> utf<span class="token number">-8</span>
indent_style <span class="token operator">=</span> space
indent_size <span class="token operator">=</span> <span class="token number">4</span>

<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token operator">*</span><span class="token punctuation">.</span>json<span class="token punctuation">,</span><span class="token operator">*</span><span class="token punctuation">.</span>md<span class="token punctuation">,</span><span class="token operator">*</span><span class="token punctuation">.</span>yml<span class="token punctuation">,</span><span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span>rc<span class="token punctuation">}</span><span class="token punctuation">]</span>
indent_style <span class="token operator">=</span> space
indent_size <span class="token operator">=</span> <span class="token number">2</span></pre>

添加一个便捷的 scripts 脚本：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"format"</span><span class="token punctuation">:</span> <span class="token string">"prettier --write \"src/**/*.ts\" \"src/**/*.js\""</span><span class="token punctuation">,</span>
    <span class="token string">"lint"</span><span class="token punctuation">:</span> <span class="token string">"tslint -p tsconfig.json"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

## 5. 设置 git 提交的校验钩子 {#5.-%E8%AE%BE%E7%BD%AE-git-%E6%8F%90%E4%BA%A4%E7%9A%84%E6%A0%A1%E9%AA%8C%E9%92%A9%E5%AD%90}

设置 git 提交的钩子校验规范

<pre class="prism-token token  language-js">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev husky @commitlint<span class="token operator">/</span>config<span class="token operator">-</span>conventional @commitlint<span class="token operator">/</span>cli commitizen cz<span class="token operator">-</span>conventional<span class="token operator">-</span>changelog</pre>

新建 **commitlint.config.js** 文件

<pre class="prism-token token  language-js">touch commitlint<span class="token punctuation">.</span>config<span class="token punctuation">.</span>js</pre>

写入：

<pre class="prism-token token  language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"@commitlint/config-conventional"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></pre>

新建 **.huskyrc** 文件

<pre class="prism-token token  language-js">touch <span class="token punctuation">.</span>huskyrc</pre>

写入:

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
    <span class="token string">"hooks"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"pre-commit"</span><span class="token punctuation">:</span> <span class="token string">"npm run format && npm run lint && npm test"</span><span class="token punctuation">,</span>
        <span class="token string">"commit-msg"</span><span class="token punctuation">:</span> <span class="token string">"commitlint -E HUSKY_GIT_PARAMS"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

新建配置文件：

<pre class="prism-token token  language-js">touch <span class="token punctuation">.</span>czrc</pre>

写入配置：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span> <span class="token string">"path"</span><span class="token punctuation">:</span> <span class="token string">"cz-conventional-changelog"</span> <span class="token punctuation">}</span></pre>

package.json 新增 scripts 配置：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"commit"</span><span class="token punctuation">:</span> <span class="token string">"git-cz"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

## 6. 开始编写代码 {#6.-%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99%E4%BB%A3%E7%A0%81}

<pre class="prism-token token  language-js">cd project<span class="token operator">-</span>name
mkdir src
cd src
touch index<span class="token punctuation">.</span>ts</pre>

写下你的第一行 ts 代码：

<pre class="prism-token token  language-js"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">Greeter</span> <span class="token operator">=</span> <span class="token punctuation">(</span>name<span class="token punctuation">:</span> string<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">`Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span></pre>

## 7. watch 模式下开发 {#7.-watch-%E6%A8%A1%E5%BC%8F%E4%B8%8B%E5%BC%80%E5%8F%91}

<pre class="prism-token token  language-js">npm start</pre>

## 8. 忽略 ts 编译生成的文件夹 {#8.-%E5%BF%BD%E7%95%A5-ts-%E7%BC%96%E8%AF%91%E7%94%9F%E6%88%90%E7%9A%84%E6%96%87%E4%BB%B6%E5%A4%B9}

把`/lib`文件夹添加到`.gitignore`

<pre class="prism-token token  language-js"><span class="token operator">/</span>lib</pre>

## 9. 添加单元测试 {#9.-%E6%B7%BB%E5%8A%A0%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95}

<pre class="prism-token token  language-js">npm install <span class="token operator">--</span>save<span class="token operator">-</span>dev jest ts<span class="token operator">-</span>jest @types<span class="token operator">/</span>jest</pre>

创建 **jestconfig.json**文件：

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"transform"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"^.+\\.(t|j)sx?$"</span><span class="token punctuation">:</span> <span class="token string">"ts-jest"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string">"testRegex"</span><span class="token punctuation">:</span> <span class="token string">"(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"</span><span class="token punctuation">,</span>
  <span class="token string">"moduleFileExtensions"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"ts"</span><span class="token punctuation">,</span> <span class="token string">"tsx"</span><span class="token punctuation">,</span> <span class="token string">"js"</span><span class="token punctuation">,</span> <span class="token string">"jsx"</span><span class="token punctuation">,</span> <span class="token string">"json"</span><span class="token punctuation">,</span> <span class="token string">"node"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span></pre>

修改 **package.json** 里的 scripts 下的 test :

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"test"</span><span class="token punctuation">:</span> <span class="token string">"jest --config jestconfig.json"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

## 10. 写一个单元测试示例 {#10.-%E5%86%99%E4%B8%80%E4%B8%AA%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%A4%BA%E4%BE%8B}

在 **src** 文件夹下新建一个 `__tests__`的文件夹来存放测试用例文件，新建一个 **Greeter.test.ts**文件,写入：

<pre class="prism-token token  language-js"><span class="token keyword">import</span> <span class="token punctuation">{</span> Greeter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../index"</span><span class="token punctuation">;</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">"My Greeter"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">Greeter</span><span class="token punctuation">(</span><span class="token string">"Carl"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">"Hello Carl"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></pre>

运行测试用例：

<pre class="prism-token token  language-js">npm test</pre>

结果应该是通过的。

## 11. 设置一些有用的 npm 脚本 {#11.-%E8%AE%BE%E7%BD%AE%E4%B8%80%E4%BA%9B%E6%9C%89%E7%94%A8%E7%9A%84-npm-%E8%84%9A%E6%9C%AC}

prepare: 发布前和用户安装前运行

prepublishOnly: 发布前运行

preversion: 新建一个版本前运行

version: 新建一个版本后运行

postversion: 新建版本后运行

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token string">"prepare"</span><span class="token punctuation">:</span> <span class="token string">"npm run build"</span><span class="token punctuation">,</span>
    <span class="token string">"prepublishOnly"</span><span class="token punctuation">:</span> <span class="token string">"npm test && npm run lint"</span><span class="token punctuation">,</span>
    <span class="token string">"preversion"</span><span class="token punctuation">:</span> <span class="token string">"npm run lint"</span><span class="token punctuation">,</span>
    <span class="token string">"version"</span><span class="token punctuation">:</span> <span class="token string">"npm run format && git add -A src"</span><span class="token punctuation">,</span>
    <span class="token string">"postversion"</span><span class="token punctuation">:</span> <span class="token string">"git push && git push --tags"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></pre>

## 12. 完善 package.json 的描述信息 {#12.-%E5%AE%8C%E5%96%84-package.json-%E7%9A%84%E6%8F%8F%E8%BF%B0%E4%BF%A1%E6%81%AF}

**name** 完善包名，描述，包入口文件 **main** 字段，typescript 类型文件 **types** 字段定义

<pre class="prism-token token  language-js"><span class="token punctuation">{</span>
    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"project-name"</span>
    <span class="token string">"description"</span><span class="token punctuation">:</span> <span class="token string">"A nice greeter"</span><span class="token punctuation">,</span>
    <span class="token string">"main"</span><span class="token punctuation">:</span> <span class="token string">"lib/index.js"</span><span class="token punctuation">,</span>
    <span class="token string">"types"</span><span class="token punctuation">:</span> <span class="token string">"lib/index.d.ts"</span>
<span class="token punctuation">}</span></pre>

## 13. 完善文档信息 {#13.-%E5%AE%8C%E5%96%84%E6%96%87%E6%A1%A3%E4%BF%A1%E6%81%AF}

新建 **doc** 文件夹，在里面可以写一些模块详细的文档:

<pre class="prism-token token  language-js">mkdir doc</pre>

完善 **readme.md**的信息，格式可以参考 <a href="https://github.com/jehna/readme-best-practices/blob/master/README-default.md" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">这里</a>

## 14. 提交代码到 git 仓库 {#14.-%E6%8F%90%E4%BA%A4%E4%BB%A3%E7%A0%81%E5%88%B0-git-%E4%BB%93%E5%BA%93}

发布之后就把代码提交到 git 仓库吧

<pre class="prism-token token  language-js">git add <span class="token punctuation">.</span>
git commit <span class="token operator">-</span>m <span class="token string">"feat: init"</span>
# 关联到远程仓库不属于本教程的内容，就不写push了</pre>

## 15. 发布包到 <a href="https://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">npm</a> {#15.-%E5%8F%91%E5%B8%83%E5%8C%85%E5%88%B0-npm}

如果你还没注册 npm 的用户的话，需要先注册。

<pre class="prism-token token  language-js">npm adduser</pre>

注册好之后就可以发布到 npm 了:

<pre class="prism-token token  language-js"># 自动修改<span class="token keyword">package</span><span class="token punctuation">.</span>json文件版本号<span class="token operator">+</span><span class="token number">1</span>
npm version patch
npm publish</pre>

发布之后，你可以去 <a href="https://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">https://www.npmjs.com/</a> 上找到你的包

## 参考 {#%E5%8F%82%E8%80%83}

<a href="https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">Step by step: Building and publishing an NPM Typescript package.</a>
