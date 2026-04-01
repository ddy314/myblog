<script setup lang="ts">
import { formatStationCode } from "~/composables/useRouteZone";
import { joinSiteUrl } from "~/utils/seo";

const { zone } = useRouteZone();
const assetPath = useAssetPath();
const route = useRoute();
const config = useRuntimeConfig();

const canonicalUrl = joinSiteUrl(config.public.siteUrl, route.path, config.app.baseURL);
const description = "关于作者、写作方向和这个博客的基本信息。";
const socialImage = joinSiteUrl(
  config.public.siteUrl,
  "/images/profile/avatar.jpg",
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
  title: "关于",
  description,
  ogTitle: `关于 | ${config.public.siteName}`,
  ogDescription: description,
  ogType: "profile",
  ogUrl: canonicalUrl || undefined,
  ogImage: socialImage || undefined,
  twitterTitle: `关于 | ${config.public.siteName}`,
  twitterDescription: description,
  twitterImage: socialImage || undefined,
});
</script>

<template>
  <article class="mx-auto w-full max-w-reading">
    <header class="enter flex items-start gap-6 border-b border-outline pb-8">
      <div class="relative shrink-0">
        <div class="absolute -right-1 -top-1 h-16 w-16 rounded-lg border border-[color:var(--zone-color)] opacity-20"
          aria-hidden="true" />
        <img :src="assetPath('/images/profile/avatar.jpg')" alt="夏"
          class="relative h-16 w-16 rounded-lg object-cover" />
      </div>
      <div>
        <div class="mb-2 flex items-center gap-3">
          <span class="station-code">{{ zone.code }}</span>
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-ink">夏</h1>
        <p class="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          一个普通的CS专业大学生……
        </p>
      </div>
    </header>

    <!-- Connected sections -->
    <div class="connector-line mt-8">
      <section class="enter enter-d1 pb-6">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">{{ formatStationCode(zone.id, 2) }}</span>
            <h2 class="text-base font-medium text-ink">写什么</h2>
          </div>
        </div>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          我不知道
        </p>
      </section>

      <section class="enter enter-d2 pb-6">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">{{ formatStationCode(zone.id, 3) }}</span>
            <h2 class="text-base font-medium text-ink">技术栈</h2>
          </div>
        </div>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          看下面
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="tag-label">#Nuxt</span>
          <span class="tag-label">#Tailwind</span>
          <span class="tag-label">#TypeScript</span>
          <span class="tag-label">#Markdown</span>
        </div>
      </section>

      <section class="enter enter-d3 pb-6">
        <div class="station-node">
          <div class="signage-header">
            <span class="signage-indicator" aria-hidden="true" />
            <span class="signage-code">{{ formatStationCode(zone.id, 4) }}</span>
            <h2 class="text-base font-medium text-ink">联系</h2>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-5">
          <a href="https://github.com/ddy314" target="_blank" rel="noopener noreferrer" class="action-link group/gh">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </section>
    </div>
  </article>
</template>
