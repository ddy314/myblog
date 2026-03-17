<script setup lang="ts">
const posts = [
  {
    title: 'Hello Nuxt',
    description: '第一篇测试文章，确认列表和详情可用。',
    date: '2026-03-17',
    path: '/posts/hello-nuxt',
  },
  {
    title: 'Markdown 渲染检查',
    description: '验证标题、列表、代码块等最常见语法。',
    date: '2026-03-16',
    path: '/posts/markdown-check',
  },
  {
    title: '第三篇短文',
    description: '再放一篇，确认列表有多条内容。',
    date: '2026-03-15',
    path: '/posts/third-note',
  },
]
</script>

<template>
  <main class="container">
    <h1>博客</h1>
    <p>最小版：只保留文章列表与 Markdown 文章页。</p>

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.path">
        <p>
          <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
        </p>
        <p v-if="post.description">{{ post.description }}</p>
        <small v-if="post.date">{{ post.date }}</small>
      </li>
    </ul>
    <p v-else>暂无文章。</p>
  </main>
</template>
