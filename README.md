# Nuxt + Nuxt Content Blog

最小可用博客模板，目标是：

- 首页显示文章列表
- 点击进入文章详情页
- 正常渲染 Markdown 内容
- 可直接部署到 GitHub Pages
- 文章排版可复用、可扩展，而不是每篇手写样式

## 本地开发

```bash
npm install
npm run dev
```

首次安装后会自动把 Git hooks 指向仓库内的 `.githooks/`。

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

## 写作系统

当前文章页已经切到一套完整的 `Nuxt Content` 排版系统：

- 基础 Markdown 由 `@tailwindcss/typography` 的 `prose prose-journal` 提供默认排版
- `components/content/Prose*.vue` 负责覆写标题、链接、代码块、图片、分隔线等细节
- `components/content/*.vue` 里的 `Lead`、`Callout`、`KeyPoints`、`SectionBreak` 提供可复用内容块

### 1. 普通 Markdown

下面这些不用额外写组件，直接写 Markdown 即可：

- 标题、段落、列表、表格、引用
- 行内代码和 fenced code block
- 图片和链接

### 2. 导语块

适合放在文章开头，用来写一段更有节奏的引导文字：

```md
::lead
这一段会作为文章导语显示，比普通正文更醒目，适合交代背景或阅读预期。
::
```

### 3. 提示 / 补充说明

适合写背景、警告、上下文补充：

```md
::callout{title="为什么这样写" tone="accent" label="Context"}
这里可以放一段补充说明，也可以继续写列表。

- 第一条背景
- 第二条背景
::
```

可用 `tone`：

- `neutral`
- `accent`
- `info`
- `warning`

### 4. 要点摘要

适合在章节末尾收束内容：

```md
::key-points{title="这一节记住什么"}
- 先给判断
- 再给原因
- 最后给行动建议
::
```

### 5. 章节转场

比普通 `---` 更适合长文中的节奏切换：

```md
::section-break{label="方法"}
::
```

## 推荐写法

- 每篇文章开头先写 `::lead`
- 一个章节只表达一个核心判断
- 需要解释背景时用 `::callout`
- 每个大章节结尾用 `::key-points` 收束
- 中段切换话题时优先用 `::section-break`，少用连续空白和硬插图

## 本地图片提交流程

平时先把图片丢进不纳入 Git 跟踪的目录：

```text
public/images-local/
```

在文章里直接写这个本地地址：

```md
![示意图](/images/auto/posts/my-post/hero.webp)
```

提交时会触发 `pre-commit` hook，自动完成这几件事：

- 扫描暂存区里的 Markdown、Vue 和常见文本文件
- 找出其中的 `/images/auto/...` 链接
- 用 `sharp` 压缩图片并输出到受 Git 跟踪的目录 `public/images/auto/`
- 把文档里的链接改写成 `/images/auto/...`
- 自动把改写后的文档和新图片重新加入暂存区

例如：

```md
![示意图](/images/auto/posts/my-post/hero.webp)
```

会在提交前改成：

```md
![示意图](/images/auto/posts/my-post/hero.webp)
```

如果你手动 clone 了仓库但还没跑过安装脚本，也可以手动执行：

```bash
npm run setup:hooks
```

## 回归检查

`content/posts/markdown-check.md` 已经补成排版系统示例文，可以作为后续样式调整的回归页面。
