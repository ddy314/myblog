<script setup lang="ts">
type TocItem = { id: string; text: string; level: 2 | 3 };

defineProps<{
  progress: number;
  progressPercent: string;
  items: TocItem[];
  activeId: string;
}>();

const emit = defineEmits<{
  jump: [id: string];
}>();
</script>

<template>
  <section class="post-bookmark" aria-label="文章书签">
    <div class="post-bookmark__rail" aria-hidden="true" />

    <div class="post-bookmark__section">
      <p class="eyebrow-label">阅读进度</p>

      <div class="post-bookmark__progress">
        <div class="post-bookmark__progress-copy">
          <span class="post-bookmark__percent">{{ progressPercent }}</span>
          <span class="meta-mono">当前站点</span>
        </div>

        <div class="post-bookmark__meter" aria-hidden="true">
          <span :style="{ transform: `scaleY(${progress})` }" />
        </div>
      </div>
    </div>

    <div v-if="items.length" class="post-bookmark__section">
      <p class="eyebrow-label">章节跳转</p>

      <ol class="post-bookmark__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="post-bookmark__entry"
          :class="{ 'post-bookmark__entry--sub': item.level === 3 }"
        >
          <button
            type="button"
            class="post-bookmark__button"
            :class="{ 'post-bookmark__button--active': activeId === item.id }"
            :title="item.text"
            @click="emit('jump', item.id)"
          >
            <span class="post-bookmark__text">{{ item.text }}</span>
            <span class="post-bookmark__dot" aria-hidden="true" />
          </button>
        </li>
      </ol>
    </div>

    <NuxtLink to="/posts" class="post-bookmark__back">
      返回阅读线
    </NuxtLink>
  </section>
</template>

<style scoped>
.post-bookmark {
  position: relative;
  display: grid;
  gap: 1.5rem;
  width: min(100%, 13.5rem);
  padding: 0 1.35rem 0 0;
}

.post-bookmark__rail {
  position: absolute;
  top: 0.1rem;
  right: 0.2rem;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--zone-color) 28%, white),
    rgba(229, 229, 229, 0.94)
  );
}

.post-bookmark__section {
  display: grid;
  gap: 0.75rem;
  justify-items: end;
}

.post-bookmark__progress {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.85rem;
  padding-right: 1.1rem;
}

.post-bookmark__progress-copy {
  display: grid;
  gap: 0.35rem;
  justify-items: end;
  text-align: right;
}

.post-bookmark__percent {
  color: var(--zone-color);
  font-family: "JetBrains Mono", monospace;
  font-size: 1.75rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.post-bookmark__meter {
  position: relative;
  width: 0.32rem;
  height: 4.75rem;
  justify-self: end;
  border-radius: 9999px;
  overflow: hidden;
  background: rgba(12, 12, 12, 0.07);
}

.post-bookmark__meter span {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  background: var(--zone-color);
}

.post-bookmark__list {
  display: grid;
  gap: 0.15rem;
  width: 100%;
  justify-items: end;
  padding-right: 1.1rem;
}

.post-bookmark__entry {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.post-bookmark__button {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.45rem 1.35rem 0.45rem 0;
  text-align: left;
  color: #6d6d6d;
}

.post-bookmark__button:hover {
  color: #0c0c0c;
}

.post-bookmark__button--active {
  color: #0c0c0c;
}

.post-bookmark__entry--sub .post-bookmark__button {
  padding-right: 2.1rem;
}

.post-bookmark__text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-wrap: pretty;
  font-size: 0.875rem;
  line-height: 1.75;
}

.post-bookmark__dot {
  position: absolute;
  top: 1rem;
  right: 0;
  width: 0.52rem;
  height: 0.52rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--zone-color) 40%, white);
  background: #fafafa;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.post-bookmark__button--active .post-bookmark__dot {
  transform: scale(1.15);
  border-color: var(--zone-color);
  background: var(--zone-color);
}

.post-bookmark__back {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-left: auto;
  padding-right: 1.1rem;
  color: #8b8b8b;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.post-bookmark__back::after {
  content: "";
  width: 1.4rem;
  height: 1px;
  background: var(--zone-color);
  opacity: 0.45;
}

.post-bookmark__back:hover {
  color: #0c0c0c;
}

@media (max-width: 1279px) {
  .post-bookmark {
    width: 100%;
  }
}
</style>
