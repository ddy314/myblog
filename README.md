# Nuxt + Nuxt Content Blog

最小可用博客模板，目标是：

- 首页显示文章列表
- 点击进入文章详情页
- 正常渲染 Markdown 内容
- 可直接部署到 GitHub Pages

## 本地开发

```bash
npm install
npm run dev
```

## 构建静态站点

```bash
npm run build
```

生成产物目录：`.output/public`

## 内容目录

文章写在 `content/posts/*.md`，示例 frontmatter：

```md
---
title: 文章标题
description: 文章描述
date: 2026-03-17
---
```
