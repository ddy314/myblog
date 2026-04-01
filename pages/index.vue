<script setup lang="ts">
import type { PostItem } from "~/utils/posts";
import { resolvePostPath, sortPosts } from "~/utils/posts";
import { joinSiteUrl, normalizeMetaDescription } from "~/utils/seo";

const { data: homePosts } = await useAsyncData("home-posts", async () => {
  const result = await queryCollection("posts").all();
  return sortPosts((result ?? []) as PostItem[]);
});

const assetPath = useAssetPath();
const route = useRoute();
const config = useRuntimeConfig();

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

const description = normalizeMetaDescription(
  featuredPost.value?.description,
  config.public.siteDescription,
);
const canonicalUrl = joinSiteUrl(config.public.siteUrl, route.path, config.app.baseURL);
const socialImage = joinSiteUrl(
  config.public.siteUrl,
  featuredPost.value?.cover || "/images/profile/avatar.jpg",
  config.app.baseURL,
);

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
  title: "首页",
  description,
  ogTitle: config.public.siteName,
  ogDescription: description,
  ogType: "website",
  ogUrl: canonicalUrl || undefined,
  ogImage: socialImage || undefined,
  twitterTitle: config.public.siteName,
  twitterDescription: description,
  twitterImage: socialImage || undefined,
});
</script>

<template>
  <section class="mx-auto w-full max-w-layout">
    <header class="enter border-b border-outline pb-12">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div class="max-w-[38rem]">
          <div class="flex items-center gap-3">
            <span class="station-code">H—01</span>
            <p class="eyebrow-label">首页</p>
          </div>
          <h1 class="mt-5 text-[1.75rem] font-semibold tracking-tight text-ink sm:text-[2.125rem]">
            夏的个人博客
          </h1>
          <blockquote class="home-quote mt-7">
            <p class="home-quote__body">
              我所说的句子在这样一种意义上是阐明性的：任何人，只要他理解我，当他以这些句子为踏板，攀上去并越过它们，最终就会认识到这些句子是无意义的，他必须翻越这些句子，才能正确地看到这个世界。
            </p>
            <footer class="home-quote__footer">
              <cite class="home-quote__source">维特根斯坦，《逻辑哲学论》</cite>
            </footer>
          </blockquote>
          <div class="mt-7 flex flex-wrap items-center gap-5">
            <NuxtLink v-if="featuredPost" :to="resolvePostPath(featuredPost)" class="action-link group/link">
              阅读精选
              <svg class="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/about" class="action-link">
              关于我
            </NuxtLink>
          </div>
        </div>

        <div class="enter enter-d1 home-marker">
          <img :src="assetPath('/images/profile/avatar.jpg')" alt="夏的头像" class="home-marker__avatar" />
          <div class="home-marker__copy">
            <span class="eyebrow-label">Author</span>
            <span class="home-marker__name">夏</span>
          </div>
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
            <PostsCard v-for="(post, i) in recentPosts" :key="resolvePostPath(post)" :post="post" :index="i + 1"
              variant="list" class="enter" :class="`enter-d${Math.min(i + 4, 6)}`" />
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
