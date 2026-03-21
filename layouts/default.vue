<script setup lang="ts">
const { zone } = useRouteZone();
</script>

<template>
  <div
    class="min-h-screen bg-paper text-ink"
    :style="{ '--zone-color': zone.color }"
  >
    <div class="signal-line" aria-hidden="true" />
    <SiteHeaderBar />

    <!-- Zone stripe — left edge vertical line -->
    <div class="zone-stripe" aria-hidden="true" />

    <main class="pb-20 pt-10 md:pb-24 md:pt-14">
      <div class="site-shell">
        <slot />
      </div>
    </main>

    <SiteFooterBar />
  </div>
</template>
