<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    label?: string;
  }>(),
  {
    title: "本节要点",
    label: "Summary",
  },
);
</script>

<template>
  <section class="mdc-key-points not-prose">
    <header class="mdc-key-points__header">
      <span class="mdc-key-points__indicator" aria-hidden="true" />
      <div>
        <p class="mdc-key-points__meta">{{ label }}</p>
        <h3 class="mdc-key-points__title">{{ title }}</h3>
      </div>
    </header>
    <div class="mdc-key-points__body">
      <slot />
    </div>
  </section>
</template>
