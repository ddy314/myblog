<script setup lang="ts">
import { formatStationCode } from "~/composables/useRouteZone";
import type { PostItem } from "~/utils/posts";
import {
  estimateReadingTime,
  formatPostDate,
  resolvePostPath,
  sortPosts,
} from "~/utils/posts";

const route = useRoute();

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("posts").path(route.path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "文章未找到",
  });
}

// Compute post index for station code
const { data: allPosts } = await useAsyncData("all-posts-nav", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const currentIndex = computed(() => {
  if (!allPosts.value) return 1;
  const idx = allPosts.value.findIndex(
    (p) => resolvePostPath(p) === route.path,
  );
  return idx >= 0 ? idx + 1 : 1;
});

const { zone } = useRouteZone(currentIndex);

const readingTime = computed(() =>
  estimateReadingTime(post.value?.body?.value ?? post.value?.body),
);

const formattedDate = computed(() => formatPostDate(post.value?.date));

const copied = ref(false);

async function copyLink() {
  if (!import.meta.client) return;
  await navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1800);
}

// Reading progress
const progress = ref(0);

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
}

onMounted(() => {
  window.addEventListener("scroll", updateProgress, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});

// Prev/next navigation
const prevPost = computed(() => {
  if (!allPosts.value || currentIndex.value <= 1) return null;
  return allPosts.value[currentIndex.value - 2];
});

const nextPost = computed(() => {
  if (!allPosts.value || currentIndex.value < 1) return null;
  if (currentIndex.value >= allPosts.value.length) return null;
  return allPosts.value[currentIndex.value];
});

const prevCode = computed(() => {
  if (!prevPost.value) return "";
  return formatStationCode("P", currentIndex.value - 1);
});

const nextCode = computed(() => {
  if (!nextPost.value) return "";
  return formatStationCode("P", currentIndex.value + 1);
});
</script>

<template>
  <article class="mx-auto w-full max-w-layout">
    <!-- Reading progress bar -->
    <div
      class="reading-progress"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />

    <div class="enter">
      <NuxtLink to="/posts" class="action-link group/back">
        <svg
          class="h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-0.5"
          viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        返回文章
      </NuxtLink>
    </div>

    <!-- Title block -->
    <header class="enter enter-d1 mt-8 border-b border-outline pb-8">
      <div class="mb-4">
        <span class="station-code">{{ zone.code }}</span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span
          v-for="tag in post?.tags"
          :key="tag"
          class="tag-label"
        >
          #{{ tag }}
        </span>
      </div>

      <h1
        class="mt-4 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3rem]"
      >
        {{ post?.title }}
      </h1>

      <p
        v-if="post?.description"
        class="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft"
      >
        {{ post.description }}
      </p>

      <!-- Meta row -->
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <span class="meta-mono">{{ formattedDate }}</span>
        <span class="h-3 w-[1px] bg-outline" aria-hidden="true" />
        <span class="meta-mono">{{ readingTime }}</span>
        <span class="h-3 w-[1px] bg-outline" aria-hidden="true" />
        <button
          type="button"
          class="meta-mono cursor-pointer hover:text-accent"
          @click="copyLink"
        >
          {{ copied ? "已复制" : "复制链接" }}
        </button>
      </div>
    </header>

    <!-- Cover -->
    <figure
      v-if="post?.cover"
      class="enter enter-d2 mt-8 overflow-hidden rounded-lg border border-outline bg-surface-muted"
    >
      <img
        :src="post.cover"
        :alt="post.coverAlt || ''"
        class="aspect-[16/9] w-full object-cover"
      />
    </figure>

    <!-- Content -->
    <div class="enter enter-d3 mx-auto mt-10 max-w-reading">
      <div class="article-prose">
        <ContentRenderer v-if="post" :value="post" />
      </div>
    </div>

    <!-- Prev / Next — platform-style navigation -->
    <nav
      v-if="prevPost || nextPost"
      class="mx-auto mt-16 max-w-reading"
    >
      <!-- Geometric separator -->
      <div class="geo-sep mb-6">
        <span class="eyebrow-label">继续阅读</span>
      </div>

      <div class="platform-nav grid gap-px sm:grid-cols-2">
        <NuxtLink
          v-if="prevPost"
          :to="resolvePostPath(prevPost)"
          class="platform-nav-item group"
        >
          <div class="flex items-center gap-2">
            <span class="platform-nav-arrow" aria-hidden="true">&larr;</span>
            <span class="platform-nav-code">{{ prevCode }}</span>
          </div>
          <span class="eyebrow-label">上一篇</span>
          <span class="platform-nav-title text-[0.875rem] font-medium text-ink">
            {{ prevPost.title }}
          </span>
        </NuxtLink>
        <div v-else class="platform-nav-empty" />

        <NuxtLink
          v-if="nextPost"
          :to="resolvePostPath(nextPost)"
          class="platform-nav-item group text-right"
        >
          <div class="flex items-center justify-end gap-2">
            <span class="platform-nav-code">{{ nextCode }}</span>
            <span class="platform-nav-arrow" aria-hidden="true">&rarr;</span>
          </div>
          <span class="eyebrow-label">下一篇</span>
          <span class="platform-nav-title text-[0.875rem] font-medium text-ink">
            {{ nextPost.title }}
          </span>
        </NuxtLink>
        <div v-else class="platform-nav-empty" />
      </div>
    </nav>
  </article>
</template>
