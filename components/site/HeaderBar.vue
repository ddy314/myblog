<script setup lang="ts">
const { zone } = useRouteZone();

const links = [
  { label: "首页", to: "/" },
  { label: "文章", to: "/posts" },
  { label: "关于", to: "/about" },
];
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-outline bg-paper/90 backdrop-blur-md"
  >
    <div class="site-shell flex h-14 items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/"
          class="text-lg font-semibold tracking-tight text-ink no-underline"
        >
          夏
        </NuxtLink>
        <!-- Station code badge -->
        <span class="station-code" aria-label="当前位置">
          {{ zone.code }}
        </span>
      </div>

      <nav class="flex items-center gap-7" aria-label="主导航">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link-active"
          exact-active-class="nav-link-active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
