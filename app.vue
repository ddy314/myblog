<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  titleTemplate: (titleChunk) => {
    if (!titleChunk) {
      return config.public.siteName;
    }

    return `${titleChunk} | ${config.public.siteName}`;
  },
});

useSeoMeta({
  applicationName: config.public.siteName,
  ogSiteName: config.public.siteName,
  ogLocale: "zh_CN",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
