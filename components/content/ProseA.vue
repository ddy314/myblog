<script setup lang="ts">
const props = defineProps<{
  href?: string;
  target?: string;
  rel?: string;
}>();

const isExternal = computed(() =>
  Boolean(props.href && /^(https?:)?\/\//.test(props.href)),
);

const resolvedRel = computed(() => {
  if (!isExternal.value) {
    return props.rel;
  }

  const tokens = new Set((props.rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  return Array.from(tokens).join(" ");
});

const resolvedTarget = computed(() => {
  if (props.target) {
    return props.target;
  }

  return isExternal.value ? "_blank" : undefined;
});
</script>

<template>
  <a
    v-bind="$attrs"
    :href="href"
    :target="resolvedTarget"
    :rel="resolvedRel"
    class="prose-link"
  >
    <slot mdc-unwrap="p" />
    <span v-if="isExternal" class="prose-link-external" aria-hidden="true">
      ↗
    </span>
  </a>
</template>
