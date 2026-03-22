<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  src?: string;
  alt?: string;
  title?: string;
}>();
</script>

<template>
  <figure class="prose-media">
    <img
      v-bind="$attrs"
      :src="src"
      :alt="alt || ''"
      class="prose-media__image"
    />
    <figcaption v-if="title || alt" class="prose-media__caption">
      {{ title || alt }}
    </figcaption>
  </figure>
</template>
