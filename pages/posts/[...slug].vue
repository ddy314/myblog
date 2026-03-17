<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('posts').path(route.path).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article Not Found',
  })
}
</script>

<template>
  <main class="container">
    <p>
      <NuxtLink to="/">返回首页</NuxtLink>
    </p>

    <article>
      <h1>{{ post?.title }}</h1>
      <p v-if="post?.date">{{ post.date }}</p>
      <ContentRenderer v-if="post" :value="post" />
    </article>
  </main>
</template>
