<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { formatPostDate, resolvePostPath } from "~/utils/posts";

const props = defineProps<{
  post: PostItem;
  variant?: "feature" | "list";
  index?: number;
}>();

const initials = computed(() => {
  const cleaned = props.post.title.replace(/\s+/g, "");
  return cleaned.slice(0, 2).toUpperCase();
});

const postPath = computed(() => resolvePostPath(props.post));

const paddedIndex = computed(() =>
  props.index != null ? String(props.index).padStart(2, "0") : null,
);
</script>

<template>
  <!-- Feature variant: horizontal card with image -->
  <article
    v-if="variant === 'feature'"
    class="card-row grid gap-6 border-b border-outline py-7 md:grid-cols-[minmax(14rem,22rem)_minmax(0,1fr)]"
  >
    <NuxtLink :to="postPath" class="group block">
      <div
        class="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-muted transition-shadow duration-300 group-hover:shadow-soft"
      >
        <img
          v-if="post.cover"
          :src="post.cover"
          :alt="post.coverAlt || ''"
          class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center"
        >
          <span class="font-mono text-2xl font-medium text-ink-subtle/20">
            {{ initials }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <div class="flex min-w-0 flex-col justify-center">
      <div class="flex flex-wrap items-center gap-2">
        <span class="meta-mono">{{ formatPostDate(post.date) }}</span>
        <span
          v-for="tag in post.tags.slice(0, 2)"
          :key="tag"
          class="tag-label"
        >
          #{{ tag }}
        </span>
      </div>

      <h2 class="mt-3 text-[1.5rem] font-semibold leading-tight tracking-tight text-ink">
        <NuxtLink
          :to="postPath"
          class="text-ink no-underline transition-colors duration-200 hover:text-accent"
        >
          {{ post.title }}
        </NuxtLink>
      </h2>

      <p class="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-soft">
        {{ post.description || "这是一篇尚未添加摘要的文章。" }}
      </p>

      <div class="mt-5">
        <NuxtLink :to="postPath" class="action-link group/link">
          阅读全文
          <svg
            class="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
            viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </article>

  <!-- List variant: compact row with index number -->
  <article
    v-else
    class="card-row group flex items-baseline gap-4 border-b border-outline py-3.5"
  >
    <span
      v-if="paddedIndex"
      class="hidden shrink-0 index-number index-number-zone sm:inline"
    >
      {{ paddedIndex }}
    </span>

    <div class="flex min-w-0 flex-1 items-baseline justify-between gap-4">
      <div class="flex min-w-0 items-baseline gap-3">
        <h2 class="truncate text-[0.9375rem] font-medium text-ink">
          <NuxtLink
            :to="postPath"
            class="text-ink no-underline transition-colors duration-200 group-hover:text-accent"
          >
            {{ post.title }}
          </NuxtLink>
        </h2>
        <span
          v-for="tag in post.tags.slice(0, 1)"
          :key="tag"
          class="hidden shrink-0 tag-label sm:inline"
        >
          #{{ tag }}
        </span>
      </div>

      <span class="shrink-0 meta-mono">
        {{ formatPostDate(post.date) }}
      </span>
    </div>
  </article>
</template>
