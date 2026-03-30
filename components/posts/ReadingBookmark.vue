<script setup lang="ts">
type TocItem = { id: string; text: string; level: 2 | 3 };
type TocGroup = {
  id: string;
  text: string;
  index: number;
  children: TocItem[];
};

const props = defineProps<{
  progress: number;
  progressPercent: string;
  items: TocItem[];
  activeId: string;
}>();

const emit = defineEmits<{
  jump: [id: string];
}>();

const containerRef = ref<HTMLElement | null>(null);
const userToggledState = ref(new Map<string, boolean>());

const groups = computed<TocGroup[]>(() => {
  const grouped: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  props.items.forEach((item) => {
    if (item.level === 2 || !currentGroup) {
      currentGroup = {
        id: item.id,
        text: item.text,
        index: grouped.length + 1,
        children: [],
      };
      grouped.push(currentGroup);
      return;
    }

    currentGroup.children.push(item);
  });

  return grouped;
});

const activeGroupId = computed(() => {
  const currentGroup = groups.value.find(
    (group) =>
      group.id === props.activeId ||
      group.children.some((child) => child.id === props.activeId),
  );

  return currentGroup?.id ?? groups.value[0]?.id ?? "";
});

const sectionCount = computed(() => groups.value.length);
const hasItems = computed(() => sectionCount.value > 0);

function isGroupExpanded(id: string) {
  if (userToggledState.value.has(id)) {
    return userToggledState.value.get(id);
  }
  return activeGroupId.value === id;
}

function toggleGroup(id: string) {
  const currentState = isGroupExpanded(id);
  userToggledState.value.set(id, !currentState);
}

watch(groups, (nextGroups) => {
  const nextIds = new Set(nextGroups.map((group) => group.id));
  userToggledState.value.forEach((_, id) => {
    if (!nextIds.has(id)) {
      userToggledState.value.delete(id);
    }
  });
});

// Automatically scroll the bookmark list when the active id changes
watch(
  () => props.activeId,
  async (newId) => {
    if (!newId || !containerRef.value) return;
    await nextTick();
    const activeEl = containerRef.value.querySelector(`[data-id="${newId}"]`);
    if (activeEl) {
      const containerRect = containerRef.value.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();

      const isVisible =
        elRect.top >= containerRect.top + 20 &&
        elRect.bottom <= containerRect.bottom - 20;

      if (!isVisible) {
        containerRef.value.scrollTo({
          top:
            containerRef.value.scrollTop +
            (elRect.top - containerRect.top) -
            containerRect.height / 2 +
            elRect.height / 2,
          behavior: "smooth",
        });
      }
    }
  },
);

function formatGroupIndex(index: number) {
  return String(index).padStart(2, "0");
}
</script>

<template>
  <nav class="post-bookmark" aria-label="文章书签">
    <div class="post-bookmark__header">
      <div class="post-bookmark__header-split">
        <div class="post-bookmark__header-copy">
          <p class="eyebrow-label">阅读定位</p>
          <p class="post-bookmark__summary">{{ sectionCount }} 章</p>
        </div>
        <span class="post-bookmark__percent">{{ progressPercent }}</span>
      </div>

      <div class="post-bookmark__progress" aria-hidden="true">
        <span
          class="post-bookmark__progress-bar"
          :style="{ transform: `scaleX(${progress})` }"
        />
      </div>
    </div>

    <ol v-if="hasItems" ref="containerRef" class="post-bookmark__groups">
      <li v-for="group in groups" :key="group.id" class="post-bookmark__group">
        <div class="post-bookmark__group-row" :data-id="group.id">
          <button
            type="button"
            class="post-bookmark__group-button"
            :class="{
              'is-active': activeGroupId === group.id,
              'is-current': activeId === group.id,
            }"
            :aria-current="activeGroupId === group.id ? 'location' : undefined"
            :title="group.text"
            @click="emit('jump', group.id)"
          >
            <span class="post-bookmark__group-index">{{
              formatGroupIndex(group.index)
            }}</span>
            <div class="post-bookmark__node-container">
              <span
                class="post-bookmark__group-node"
                :class="{ 'is-active': activeGroupId === group.id }"
                aria-hidden="true"
              />
            </div>
            <span class="post-bookmark__group-copy">
              <span class="post-bookmark__group-text">{{ group.text }}</span>
              <span
                v-if="group.children.length"
                class="post-bookmark__group-meta"
              >
                {{ group.children.length }} 小节
              </span>
            </span>
          </button>

          <button
            v-if="group.children.length"
            type="button"
            class="post-bookmark__toggle"
            :class="{
              'is-open': isGroupExpanded(group.id),
              'is-active': activeGroupId === group.id,
            }"
            :aria-expanded="isGroupExpanded(group.id)"
            :aria-label="isGroupExpanded(group.id) ? '收起小节' : '展开小节'"
            :title="isGroupExpanded(group.id) ? '收起小节' : '展开小节'"
            @click="toggleGroup(group.id)"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M5 6.5L8 9.5L11 6.5"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <ul
          v-show="group.children.length && isGroupExpanded(group.id)"
          class="post-bookmark__children"
        >
          <li
            v-for="child in group.children"
            :key="child.id"
            class="post-bookmark__child-row"
            :data-id="child.id"
          >
            <button
              type="button"
              class="post-bookmark__child-button"
              :class="{ 'is-active': activeId === child.id }"
              :aria-current="activeId === child.id ? 'location' : undefined"
              :title="child.text"
              @click="emit('jump', child.id)"
            >
              <span
                class="post-bookmark__child-indent"
                aria-hidden="true"
              ></span>
              <div class="post-bookmark__node-container">
                <span
                  class="post-bookmark__child-node"
                  :class="{ 'is-active': activeId === child.id }"
                  aria-hidden="true"
                />
              </div>
              <span class="post-bookmark__child-text">{{ child.text }}</span>
            </button>
          </li>
        </ul>
      </li>
    </ol>

    <div v-else class="post-bookmark__empty">
      <p class="post-bookmark__empty-title">这篇文章没有可索引的小节</p>
      <p class="post-bookmark__empty-copy">
        目录会在文章出现二级或三级标题时自动生成。
      </p>
    </div>

    <NuxtLink to="/posts" class="post-bookmark__back">返回阅读线</NuxtLink>
  </nav>
</template>

<style scoped>
.post-bookmark {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: min(100%, 14.75rem);
  max-height: calc(100vh - 8rem);
}

.post-bookmark__header {
  display: grid;
  gap: 0.7rem;
  padding-bottom: 0.85rem;
}

.post-bookmark__header-split {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.post-bookmark__header-copy {
  display: grid;
  gap: 0.28rem;
}

.post-bookmark__summary {
  font-size: 0.8rem;
  line-height: 1.4;
  color: rgb(var(--ink-soft-rgb));
}

.post-bookmark__percent {
  color: var(--zone-color);
  font-family: "JetBrains Mono", monospace;
  font-size: 1.15rem;
  line-height: 1;
  letter-spacing: -0.02em;
}

.post-bookmark__progress {
  position: relative;
  height: 2px;
  overflow: hidden;
  background: rgba(var(--outline-rgb) / 0.96);
  transform: translateZ(0);
}

.post-bookmark__progress-bar {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  background: var(--zone-color);
}

.post-bookmark__groups {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-right: 0.35rem;
  padding-bottom: 2rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--ink-rgb) / 0.16) transparent;
}

/* Timeline continuous visual line - precisely aligned with grid variables */
.post-bookmark__groups::before {
  content: "";
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: calc(1.4rem + 0.5rem + 0.5rem - 0.5px);
  width: 1px;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--zone-color) 40%, white),
    rgba(var(--outline-rgb) / 0.94)
  );
  z-index: 0;
}

.post-bookmark__group {
  position: relative;
  z-index: 1;
}

.post-bookmark__group-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.5rem;
}

/* Grid columns: Index(1.4rem) | Gap(0.5rem) | Node Container(1rem) | Gap(0.5rem) | Text(1fr) */
.post-bookmark__group-button,
.post-bookmark__child-button {
  display: grid;
  grid-template-columns: 1.4rem 1rem minmax(0, 1fr);
  gap: 0.5rem;
  width: 100%;
  align-items: start;
  text-align: left;
  color: rgb(var(--ink-soft-rgb));
}

.post-bookmark__group-button {
  padding: 0.1rem 0;
}

.post-bookmark__child-button {
  padding: 0.2rem 0;
}

.post-bookmark__group-button:hover,
.post-bookmark__child-button:hover {
  color: rgb(var(--ink-rgb));
}

.post-bookmark__group-button.is-active,
.post-bookmark__child-button.is-active {
  color: rgb(var(--ink-rgb));
}

.post-bookmark__group-button.is-current .post-bookmark__group-text {
  color: var(--zone-color);
}

.post-bookmark__group-index {
  padding-top: 0.16rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  line-height: 1.4;
  letter-spacing: 0.12em;
  color: rgb(var(--ink-subtle-rgb));
  text-align: right;
}

.post-bookmark__node-container {
  display: flex;
  justify-content: center;
  padding-top: 0.38rem;
}

.post-bookmark__group-node {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--zone-color) 40%, white);
  background: rgb(var(--paper-rgb));
  box-shadow: 0 0 0 0.25rem rgb(var(--paper-rgb));
  transition: all 0.2s ease;
}

.post-bookmark__child-node {
  width: 0.42rem;
  height: 0.42rem;
  margin-top: 0.12rem;
  border-radius: 9999px;
  border: 1px solid rgba(var(--outline-strong-rgb) / 0.92);
  background: rgb(var(--paper-rgb));
  box-shadow: 0 0 0 0.2rem rgb(var(--paper-rgb));
  transition: all 0.2s ease;
}

/* Active Styling */
.post-bookmark__group-node.is-active,
.post-bookmark__child-node.is-active {
  border-color: var(--zone-color);
  background: var(--zone-color);
}

.post-bookmark__group-copy {
  display: grid;
  gap: 0.18rem;
  min-width: 0;
}

.post-bookmark__group-button.is-active .post-bookmark__group-text,
.post-bookmark__group-button.is-active .post-bookmark__group-index,
.post-bookmark__group-button.is-active .post-bookmark__group-meta,
.post-bookmark__child-button.is-active .post-bookmark__child-text {
  color: var(--zone-color);
}

.post-bookmark__group-text,
.post-bookmark__child-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-wrap: pretty;
}

.post-bookmark__group-text {
  font-size: 0.92rem;
  line-height: 1.55;
  -webkit-line-clamp: 2;
}

.post-bookmark__group-meta {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.66rem;
  line-height: 1.2;
  letter-spacing: 0.12em;
  color: rgb(var(--ink-subtle-rgb));
}

.post-bookmark__child-indent {
  width: 100%;
  height: 1px;
  margin-top: 0.68rem;
  background: rgba(var(--outline-rgb) / 0.94);
}

.post-bookmark__child-text {
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-line-clamp: 2;
}

/* Toggle Button */
.post-bookmark__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.65rem;
  height: 1.65rem;
  border: 1px solid transparent;
  border-radius: 9999px;
  color: rgb(var(--ink-subtle-rgb));
  transition: all 0.2s ease;
}

.post-bookmark__toggle:hover {
  color: var(--zone-color);
  border-color: rgba(var(--outline-rgb) / 0.94);
  background: rgba(var(--surface-rgb) / 0.82);
}

.post-bookmark__toggle.is-active {
  color: var(--zone-color);
}

.post-bookmark__toggle.is-open svg {
  transform: rotate(180deg);
}

.post-bookmark__toggle svg {
  width: 0.75rem;
  height: 0.75rem;
  transition: transform 0.2s ease;
}

.post-bookmark__children {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.35rem;
  padding-bottom: 0.45rem;
}

.post-bookmark__empty {
  display: grid;
  gap: 0.35rem;
  padding-bottom: 0.5rem;
}

.post-bookmark__empty-title {
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgb(var(--ink-rgb));
}

.post-bookmark__empty-copy {
  font-size: 0.84rem;
  line-height: 1.6;
  color: rgb(var(--ink-soft-rgb));
}

.post-bookmark__back {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  align-self: flex-start;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--ink-subtle-rgb));
}

.post-bookmark__back::after {
  content: "";
  width: 1.25rem;
  height: 1px;
  background: var(--zone-color);
  opacity: 0.45;
}

.post-bookmark__back:hover {
  color: rgb(var(--ink-rgb));
}

@media (max-width: 1279px) {
  .post-bookmark {
    width: 100%;
    max-height: none;
    gap: 0.9rem;
  }

  .post-bookmark__groups {
    max-height: 15rem;
  }
}
</style>
