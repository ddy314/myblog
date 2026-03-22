<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    tone?: "neutral" | "accent" | "info" | "warning";
    label?: string;
  }>(),
  {
    title: "补充说明",
    tone: "neutral",
    label: "Callout",
  },
);
</script>

<template>
  <aside class="mdc-callout not-prose" :data-tone="tone">
    <header class="mdc-callout__header">
      <span class="mdc-callout__indicator" aria-hidden="true" />
      <div>
        <p class="mdc-callout__meta">{{ label }}</p>
        <h3 class="mdc-callout__title">{{ title }}</h3>
      </div>
    </header>
    <div class="mdc-callout__body">
      <slot />
    </div>
  </aside>
</template>
