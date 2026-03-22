<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: "转场",
  },
);
</script>

<template>
  <div class="mdc-section-break not-prose" aria-hidden="true">
    <span class="mdc-section-break__label">{{ label }}</span>
  </div>
</template>
