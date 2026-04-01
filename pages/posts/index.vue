<script setup lang="ts">
import type { PostItem, PostSort } from "~/utils/posts";
import { sortPosts } from "~/utils/posts";
import { joinSiteUrl } from "~/utils/seo";

const { data: postsData } = await useAsyncData("posts-list", async () => {
  const result = await queryCollection("posts").all();
  return (result ?? []) as PostItem[];
});

const route = useRoute();
const config = useRuntimeConfig();

const searchQuery = ref("");
const selectedTag = ref("all");
const sortBy = ref<PostSort>("date-desc");

const posts = computed(() => postsData.value ?? []);

const tags = computed(() => {
  const counter = new Map<string, number>();
  for (const post of posts.value) {
    for (const tag of post.tags || []) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counter.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0], "zh-CN");
    })
    .slice(0, 7)
    .map(([tag]) => tag);
});

watch(tags, (nextTags) => {
  if (selectedTag.value !== "all" && !nextTags.includes(selectedTag.value)) {
    selectedTag.value = "all";
  }
});

const normalizedSearch = computed(() => searchQuery.value.trim().toLowerCase());

const filteredAndSortedPosts = computed(() => {
  const filtered = posts.value.filter((post) => {
    const matchedTag =
      selectedTag.value === "all" ||
      (Array.isArray(post.tags) && post.tags.includes(selectedTag.value));
    if (!matchedTag) return false;
    if (!normalizedSearch.value) return true;
    const searchPool = [post.title, post.description, ...(post.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchPool.includes(normalizedSearch.value);
  });
  return sortPosts(filtered, sortBy.value);
});

const canonicalUrl = joinSiteUrl(
  config.public.siteUrl,
  route.path,
  config.app.baseURL,
);
const description = "按时间整理的全部文章列表，包含技术、课程笔记和随想。";

useHead({
  link: canonicalUrl
    ? [
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ]
    : [],
});

useSeoMeta({
  title: "全部文章",
  description,
  ogTitle: `全部文章 | ${config.public.siteName}`,
  ogDescription: description,
  ogType: "website",
  ogUrl: canonicalUrl || undefined,
  twitterTitle: `全部文章 | ${config.public.siteName}`,
  twitterDescription: description,
});
</script>

<template>
  <section class="mx-auto w-full max-w-layout">
    <PostsListSection
      :posts="filteredAndSortedPosts"
      :tags="tags"
      :search-query="searchQuery"
      :selected-tag="selectedTag"
      :sort-by="sortBy"
      @update:search-query="searchQuery = $event"
      @update:selected-tag="selectedTag = $event"
      @update:sort-by="sortBy = $event"
    />
  </section>
</template>
