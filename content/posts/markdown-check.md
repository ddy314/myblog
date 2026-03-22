---
title: Markdown 排版效果检查
description: 用一篇文章覆盖所有常见 Markdown 语法，验证博客的排版渲染是否稳定。
date: 2026-03-16
tags:
  - Markdown
  - 排版
cover: /images/covers/markdown-check.svg
coverAlt: 模拟文本行距与代码块排版的几何抽象封面。
---

## 为什么需要这篇文章

每次调整排版样式之后，都需要一篇涵盖各种元素的文章来做回归测试。这篇文章没有实际主题，纯粹是排版检查用。

::lead
这篇文章现在也承担“写作系统示例”的作用。除了基础 Markdown，它还会覆盖导语块、提示块、章节转场和要点摘要，方便在改样式之后做回归检查。
::

## 段落与强调

普通段落的字号是 17px，行高 1.9，阅读列宽 44rem。这些数值是针对中文阅读优化的——中文字符比拉丁字母宽，行距需要更大才不会显得拥挤。

这里测试几种行内样式：**粗体文本**、_斜体文本_、`行内代码`。再来一个较长的行内代码片段 `const config = { mode: 'production', target: 'static' }`，观察它在窄屏下的换行表现。

::callout{title="写作建议" tone="info" label="Practice"}
如果一段是“为什么值得继续读”，就放在 `::lead` 里；如果一段是“这部分是补充背景，不看也不影响主线”，就放进 `::callout`，不要和正文抢层级。
::

## 列表

无序列表：

- Tailwind CSS 的 typography 插件提供了 `prose` 类
- 自定义变体 `prose-journal` 覆盖了默认样式
- 所有排版决策集中在 `tailwind.config.ts` 里管理

有序列表：

1. 先确定阅读列宽
2. 再调整字号和行高
3. 然后处理标题、引用、代码块的间距
4. 最后检查移动端表现

::key-points{title="列表检查点"}
- 无序列表要检查项目符号和正文基线是否对齐
- 有序列表要检查数字宽度和换行后的缩进
- 组合列表要检查层级变化时的节奏是否稳定
::

## 代码块

```ts
interface PostItem {
  title: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

function sortByDate(posts: PostItem[]): PostItem[] {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
```

::section-break{label="下一组元素"}
::

## 引用

> 好的排版是透明的。读者不应该意识到排版的存在，而是顺着内容自然地往下读。

## 表格

| 属性       | 值       | 说明             |
| ---------- | -------- | ---------------- |
| 字号       | 17px     | 中文正文基准     |
| 行高       | 1.9      | 适合中文密度     |
| 列宽       | 44rem    | 每行约 28-32 字  |
| 段距       | 1.5em    | 段落间呼吸空间   |

---

以上覆盖了博客中最常用的 Markdown 元素。如果这些都渲染正常，基本的排版系统就是稳定的。
