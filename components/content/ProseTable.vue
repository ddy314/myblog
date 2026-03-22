<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="prose-table-wrap not-prose">
    <table v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
