<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-outline">
    <div class="site-shell py-8">
      <!-- Terminal marker -->
      <div class="mb-5" aria-hidden="true">
        <span class="terminal-marker">终点</span>
      </div>

      <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-medium text-ink">夏</p>
          <p class="mt-1.5 max-w-xs text-xs leading-relaxed text-ink-subtle">
            写作、阅读与长期记录。所有内容来自 Markdown，
            没有数据库，没有后台。
          </p>
        </div>

        <div class="flex items-center gap-4 font-mono text-[0.6875rem] text-ink-subtle">
          <span>&copy; {{ year }}</span>
          <span class="h-3 w-[1px] bg-outline" aria-hidden="true" />
          <span>Nuxt + Tailwind</span>
        </div>
      </div>
    </div>
  </footer>
</template>
