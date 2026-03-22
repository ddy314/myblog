<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
}>();

const displayLanguage = computed(() => {
  if (!props.language) {
    return "";
  }

  return props.language.replace(/[-_]/g, " ").trim();
});

const displayMeta = computed(() => props.filename || "code");
</script>

<template>
  <div class="prose-code-frame not-prose">
    <div v-if="displayMeta || displayLanguage" class="prose-code-frame__header">
      <span class="prose-code-frame__meta">
        {{ displayMeta }}
      </span>
      <span v-if="props.filename && displayLanguage" class="prose-code-frame__lang">
        {{ displayLanguage }}
      </span>
    </div>

    <pre v-bind="$attrs" class="prose-code-frame__body"><slot>{{ code }}</slot></pre>
  </div>
</template>
