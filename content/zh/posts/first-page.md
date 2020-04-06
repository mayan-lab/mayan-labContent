---
title: "第一篇文章：记录使用到的Hugo的功能"
date: 2020-04-02T00:10:51+08:00
description: "记录使用到的Hugo和github page的功能"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
author: zhaoqiu
authorEmoji: 👽
tags: 
- hugo
---

## 基本配置
 同时在win和mac上部署了hugo，都使用了Webstorm，本来打算借助Webstorm对Git的集成的优势，但使用下来体验并不好，最后还是在Webstorm中的Terminal中进行git。

``` Bash
cd public
git init
git remote add origin git@github.com:/<github_username>/<github_username>.github.io.git
git add .
git commit -m "some message"
# -u表示以后可以仅使用git push进行上传
git push -u origin master

# 新机器同步仓库  拷贝其他不需要同步的文件时注意删除.git隐藏文件夹
git pull origin master
```

``` Bash
# hugo command
# 启动本地server
hugo server -D
# 新建站点
hugo new site sitename
# 在已存在的文件夹下强制创建
hugo new site sitename --force

# 新建文章
hugo new posts/my-post.md

# 构建项目 在根目录下运行
hugo

```


## 百度不收录Github Page

首先尝试[zeit.co](https://zeit.co/)提供的免费CDN，但百度仍然不能正常抓取,抓取测试提示308错误，而且不能认证为https，原因现在还没找到。另外，[Gitlab Page](https://about.gitlab.com/blog/2016/04/07/gitlab-pages-setup/)也可以考虑，但是，gitlab并不是提交hugo构建后的静态文件，而是接受原资源，进而在其服务器里自动构建，要想更便捷的同时同步Github和Gitlab的Page内容并不容易。


## 插入自定义js, css

{{< box >}}
custom_css = [ ] # custom_css = ["scss/custom.scss"] root/assets/scss/custom.scss
custom_js = [ ] # custom_js = ["js/custom.js"] root/assets/js/custom.js
{{< /box >}}

- 通过尝试加入去除链接下的下划线的css文件，发现并没有起作用。
- 计划通过加入typescript编译过后的js文件以及d3js与Github page结合，封装一些d3js绘图的模块。
