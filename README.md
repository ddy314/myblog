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

## 回归检查

`content/posts/markdown-check.md` 已经补成排版系统示例文，可以作为后续样式调整的回归页面。
