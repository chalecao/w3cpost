---
title: 基于typescript开发一个npm包
weight: 7
---
很多时候，[我们](https://www.w3cdoc.com)可能想要用 typescript 语言来创建一些模块，并提交到 npm 供别人使用，

**那么在 2018 年，如果我想要初始化这样的一个模块，我需要做哪些步骤呢？**：

答案是：**创建一个优雅的，对开发者友好的模块，至少需要以下 15 个步骤**

- 初始化文件夹，初始化 git 仓库，初始化 npm，初始化 tsc
- 修改 tsconfig.js 配置
- 添加 npm 脚本
- 添加 tslint 校验代码规则以及 editorconfig,prettier 统一代码风格
- 设置 git 提交的校验钩子
- 开始编写代码
- watch 模式开发
- 忽略 ts 编译生成的文件夹
- 添加单元测试
- 写一个单元测试示例
- 设置一些有用的 npm 脚本
- 完善 package.json 的描述信息
- 提交代码到 git 仓库
- 发布包到 <a href="http://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">npm</a>

本篇文章里，我会列出每个步骤的详细说明。

实际开发中，如果每个包都去走一遍这些步骤，步骤好像确实有点多。所以如果你需要实际创建项目的时候，你可以选择 clone 我提供的<a href="https://github.com/xiaomingplus/npm-typescript-boilerplate" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">样板项目</a> 来开始一个新的 ts 模块的开发，主要步骤如下：

```
git clone https://github.com/xiaomingplus/npm-typescript-boilerplate.git your-project-name
cd your-project-name
# 安装依赖
npm i
# 开始开发
npm start
# 修改 package.json 里面的项目名和简介
# 修改 README.md 文件内容
# 修改 远程仓库的地址
git remote set-url origin your-git-url
```

下面就是常规步骤了，学习目的的话，建议按照下面的步骤全部跑一遍：

## 初始化文件夹，初始化 npm，初始化 tsc 

```
mkdir project-name
cd project-name
# 初始化git项目
git init
# 添加gitignore文件
touch .gitignore
# 复制这个地址的ignore内容到.gitignore <https://github.com/github/gitignore/blob/master/Node.gitignore>

# 添加readme文件
echo "# My Awesome Typescript Project" >> README.md
# 安装typescript
npm install --save-dev typescript
# 初始化npm包
npm init --y
# 初始化tsconfig
tsc --init
```

## 修改 tsconfig.js 配置 

修改以下默认配置：

```
{
"compilerOptions": {
    "declaration": true,
    "outDir": "./lib",
  },
"include": ["src"],
"exclude": ["node_modules", "**/__tests__/*"]
}
```

最终的 tsconfig 配置如下：

```
{
"compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "strict": true,
    "outDir": "./lib",
    "esModuleInterop": true
},
"include": ["src"],
"exclude": ["node_modules", "**/__tests__/*"]
}
```

## 添加 npm 脚本

在 package.json 里编辑 scripts 字段:

```
{
"scripts": {
  "start": "tsc -w",
  "build": "tsc"
}
}
```

## 添加 tslint 校验代码规则以及 editorconfig,prettier 统一代码风格 

```
npm install --save-dev prettier tslint tslint-config-prettier
```

新建`tslint.json`文件

```
{
  "extends": ["tslint:recommended", "tslint-config-prettier"],
  "rules": {
    "no-console": false,
    "object-literal-sort-keys": false,
    "member-access": false,
    "ordered-imports": false
  },
  "linterOptions": {
    "exclude": ["**/*.json", "node_modules"]
  }
}
```

新建 **.prettierrc** 文件

```
{
  "trailingComma": "all",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "overrides": [
    {
      "files": ["*.md", "*.json", "*.yml", "*.yaml"],
      "options": {
        "tabWidth": 2
      }
    }
  ]
}
```

新建 **.editorconfig**

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 4

[{*.json,*.md,*.yml,*.*rc}]
indent_style = space
indent_size = 2
```

添加一个便捷的 scripts 脚本：

```
{
  "scripts": {
    "format": "prettier --write \"src/**/*.ts\" \"src/**/*.js\"",
    "lint": "tslint -p tsconfig.json"
  }
}
```

## 设置 git 提交的校验钩子 

设置 git 提交的钩子校验规范

```
npm install --save-dev husky @commitlint/config-conventional @commitlint/cli commitizen cz-conventional-changelog
```

新建 **commitlint.config.js** 文件

```
touch commitlint.config.js
```

写入：

```
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```

新建 **.huskyrc** 文件

```
touch .huskyrc
```

写入:

```
{
    "hooks": {
        "pre-commit": "npm run format && npm run lint && npm test",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

新建配置文件：

```
touch .czrc
```

写入配置：

```
{ "path": "cz-conventional-changelog" }
```

package.json 新增 scripts 配置：

```
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

## 开始编写代码

```
cd project-name
mkdir src
cd src
touch index.ts
```

写下你的第一行 ts 代码：

```
export const Greeter = (name: string) => `Hello ${name}`;
```

## watch 模式下开发 

```
npm start
```

## 忽略 ts 编译生成的文件夹 

把`/lib`文件夹添加到`.gitignore`

```
/lib
```

## 添加单元测试 

```
npm install --save-dev jest ts-jest @types/jest
```

创建 **jestconfig.json**文件：

```
{
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}
```

修改 **package.json** 里的 scripts 下的 test :

```
{
  "scripts": {
    "test": "jest --config jestconfig.json"
  }
}
```

## 写一个单元测试示例 

在 **src** 文件夹下新建一个 `__tests__`的文件夹来存放测试用例文件，新建一个 **Greeter.test.ts**文件,写入：

```
import { Greeter } from "../index";
test("My Greeter", () => {
  expect(Greeter("Carl")).toBe("Hello Carl");
});
```

运行测试用例：

```
npm test
```

结果应该是通过的。

## 设置一些有用的 npm 脚本 

prepare: 发布前和用户安装前运行

prepublishOnly: 发布前运行

preversion: 新建一个版本前运行

version: 新建一个版本后运行

postversion: 新建版本后运行

```
{
  "scripts": {
    "prepare": "npm run build",
    "prepublishOnly": "npm test && npm run lint",
    "preversion": "npm run lint",
    "version": "npm run format && git add -A src",
    "postversion": "git push && git push --tags"
  }
}
```

## 完善 package.json 的描述信息 

**name** 完善包名，描述，包入口文件 **main** 字段，typescript 类型文件 **types** 字段定义

```
{
    "name": "project-name"
    "description": "A nice greeter",
    "main": "lib/index.js",
    "types": "lib/index.d.ts"
}
```

## 完善文档信息 

新建 **doc** 文件夹，在里面可以写一些模块详细的文档:

```
mkdir doc
```

完善 **readme.md**的信息，格式可以参考 <a href="https://github.com/jehna/readme-best-practices/blob/master/README-default.md" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">这里</a>

## 提交代码到 git 仓库

发布之后就把代码提交到 git 仓库吧

```
git add .
git commit -m "feat: init"
# 关联到远程仓库不属于本教程的内容，就不写push了
```

## 发布包到npm

如果你还没注册 npm 的用户的话，需要先注册。

```
npm adduser
```

注册好之后就可以发布到 npm 了:

```
# 自动修改package.json文件版本号+1
npm version patch
npm publish
```

发布之后，你可以去 <a href="https://www.npmjs.com/" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">https://www.npmjs.com/</a> 上找到你的包

## 参考

<a href="https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c" target="_blank" rel="nofollow noopener noreferrer" data-from="10680">Step by step: Building and publishing an NPM Typescript package.</a>
