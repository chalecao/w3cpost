#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

push_addr=git@github.com:chalecao/w3cpost.git # git提交地址，也可以手动设置，比如：push_addr=git@github.com:xugaoyi/vuepress-theme-vdoing.git
commit_info=`git describe --all --always --long`
dist_path=public # 打包生成的文件夹路径
push_branch=gh-pages # 推送的分支

# 生成静态文件
# npm run build

# 进入生成的文件夹
cd $dist_path
rm -fr .git
# 如果是发布到自定义域名
rm -fr CNAME
echo 'www.w3cdoc.com' >> CNAME

git init
git add -A
git commit -m "deploy, $commit_info"
git push -f $push_addr HEAD:$push_branch

# cd -
# rm -rf $dist_path
