---
title: 用 Quartz 搭建 Obsidian 博客
description: 从零开始用 Quartz v5 把 Obsidian 笔记发布为在线博客
tags:
  - 教程
  - Quartz
  - Obsidian
publish: true
---

# 用 Quartz 搭建 Obsidian 博客

这篇笔记记录了如何用 [Quartz](https://quartz.jzhao.xyz/) 把 Obsidian 笔记发布为在线博客。

## 为什么选 Quartz

之前我用 docsify 做了[小程序教程](https://flyingwenku.github.io/wechat-miniprogram-tutorial/#/)，但它对 Obsidian 的语法支持不好。Quartz 专门为 Obsidian 设计，能正确处理：

- `[[双链]]` 笔记间引用
- `![[嵌入]]` 笔记嵌入
- `> [!note]` Callout 提示框
- `#标签` 自动生成标签页
- 反向链接面板

## 工作流

> [!note] 日常流程
> 1. 在 Obsidian 里正常写笔记
> 2. 挑想公开的，复制到 `content/` 目录
> 3. `git push` 推送到 GitHub
> 4. GitHub Actions 自动构建并部署

就这么简单，不需要本地跑任何构建命令。

## 自定义域名

博客部署在 `easy4ai.bbroot.com`，需要在 DNS 服务商添加 CNAME 记录：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| CNAME | easy4ai | flyingwenku.github.io |

> [!warning] 注意
> DNS 生效通常需要几分钟到几小时。如果配置后无法访问，检查 GitHub 仓库 Settings → Pages 里的 Custom Domain 是否已填写。

## 相关笔记

- [[posts/obsidian-syntax-demo|Obsidian 语法效果演示]]
