<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { resolvePostPath, sortPosts, formatPostDate } from "~/utils/posts";

const { data: homePosts } = await useAsyncData("home-posts", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const posts = computed(() => homePosts.value ?? []);

const featuredPost = computed(
  () => posts.value.find((post) => post.featured) ?? posts.value[0] ?? null,
);

const recentPosts = computed(() => {
  const featuredPath = featuredPost.value
    ? resolvePostPath(featuredPost.value)
    : "";
  return posts.value
    .filter((post) => resolvePostPath(post) !== featuredPath)
    .slice(0, 6);
});
</script>

<template>
  <section class="mx-auto w-full max-w-layout">
    <!-- Hero — the "terminal station" -->
    <header class="enter border-b border-outline pb-12">
      <div class="grid items-end gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
        <h1
          class="text-[7rem] font-semibold leading-[0.85] tracking-[-0.04em] text-ink sm:text-[9rem] lg:text-[11rem]"
        >
          夏
        </h1>

        <div class="enter enter-d1 pb-2 lg:max-w-sm">
          <p class="eyebrow-label">个人博客</p>
          <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            产品观察、技术笔记与阅读记录。<br class="hidden sm:inline" />
            关注交互设计、前端工程和信息架构。
          </p>
        </div>
      </div>
    </header>

    <!-- Connected sections — the "line" -->
    <div class="connector-line mt-10">
      <!-- Featured station -->
      <section v-if="featuredPost" class="enter enter-d2">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">H—01</span>
            <span class="signage-label">精选</span>
          </div>
        </div>

        <div class="ml-0 mt-3">
          <PostsCard :post="featuredPost" variant="feature" />
        </div>
      </section>

      <!-- Recent station -->
      <section class="enter enter-d3 mt-12">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">H—02</span>
            <span class="signage-label">最近发布</span>
          </div>
        </div>

        <div class="mt-3">
          <div v-if="recentPosts.length">
            <PostsCard
              v-for="(post, i) in recentPosts"
              :key="resolvePostPath(post)"
              :post="post"
              :index="i + 1"
              variant="list"
              class="enter"
              :class="`enter-d${Math.min(i + 4, 6)}`"
            />
          </div>

          <p v-else class="py-8 text-sm text-ink-subtle">
            暂无更多文章。
          </p>
        </div>
      </section>

      <!-- Guide arrow to archive -->
      <div class="enter enter-d6 mt-10 station-node">
        <NuxtLink to="/posts" class="guide-arrow">
          <span class="guide-arrow-icon" aria-hidden="true">&rarr;</span>
          全部文章
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
