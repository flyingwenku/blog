# Easy4AI Blog

基于 [Quartz v5](https://quartz.jzhao.xyz/) 搭建的个人博客，用于分享 Obsidian 笔记。

## 本地预览

```bash
npm install
npx quartz build --serve
```

浏览器打开 http://localhost:8080

## 写新文章

1. 在 `content/` 目录下新建 `.md` 文件
2. 用 `git push` 推送，GitHub Actions 自动构建部署

## 文章格式

```markdown
---
title: 文章标题
description: 一句话描述
tags:
  - 标签1
  - 标签2
publish: true
---

正文内容...
```

## 配置

编辑 `quartz.config.yaml` 修改站点名称、主题、域名等。
