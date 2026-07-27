<script setup lang="ts">
import { chevronDown } from '@/assets/icons/arrows';
import { SkinImage } from '@/components/skin';
import { ListItem, VIcon } from '@/components/ui';

import { useCatalogMenu } from '@/composables/UI';
import { CATALOG_PLACEHOLDERS_BY_SLUG, type ICatalog, useGameCatalog } from '@/composables/useGameCatalog';
import { useModuleI18n } from '@/composables/useModuleI18n';

const {
  catalogList, catalogListLinkBySlug, selectedGame,
  fetchFolders, getCatalogChildBySlug,
} = useGameCatalog();

await useModuleI18n(`${selectedGame.value}.catalog`);
await useLazyAsyncData(`catalog-list-${selectedGame.value}`,
  async () => {
    await fetchFolders();
    return true;
  },
);

let timer: NodeJS.Timeout;

const { t } = useI18n();
const selectedElementSlug = ref<string>('');
const selectedElementChild = shallowRef<ICatalog[]>([]);

const {
  dimensions, childrenWrapper, navWrapper,
  isMouseOutsideOfChildWrapper,
  hoverHandler, resetHandler,
} = useCatalogMenu();

const resetHoveredCatalog = () => {
  resetHandler();
  selectedElementSlug.value = '';
  selectedElementChild.value = [];
};

const setHoveredCatalog = (e: MouseEvent, slug: string) => {
  if (timer) clearTimeout(timer);
  resetHoveredCatalog();
  nextTick(() => {
    selectedElementSlug.value = slug;
    selectedElementChild.value = getCatalogChildBySlug(slug);
    hoverHandler(e);
  });
};

const resetDebouncedHoveredCatalog = () => {
  timer = setTimeout(() => {
    if (!isMouseOutsideOfChildWrapper.value) return;
    resetHandler();
    selectedElementSlug.value = '';
    selectedElementChild.value = [];
  }, 250);
};
</script>

<template>
  <nav ref="navWrapper">
    <ul>
      <li
        v-for="catalog in catalogList"
        :key="catalog.slug"
      >
        <span
          class="nav-item"
          @mouseenter="setHoveredCatalog($event, catalog.slug)"
          @mouseleave="resetDebouncedHoveredCatalog"
        >
          {{ t(`catalog_${selectedGame}.${catalog.slug}`) }}

          <VIcon
            v-if="catalog.children?.length"
            :icon="chevronDown"
            :size="20"
            class="arrow"
          />
        </span>

        <ul v-if="catalog.children?.length" class="sub-items">
          <li v-if="selectedGame === 'csgo'">
            <NuxtLinkLocale :to="catalogListLinkBySlug[catalog.slug]" class="nav-item">
              {{ t(`catalog_${selectedGame}.${catalog.slug}`) }}
            </NuxtLinkLocale>
          </li>

          <li v-for="child in catalog.children" :key="child.slug">
            <NuxtLinkLocale :to="catalogListLinkBySlug[child.slug]" class="nav-item">
              {{ t(`catalog_${selectedGame}.${child.slug}`) }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </li>
    </ul>
    <client-only>
      <Teleport to="#teleports">
        <transition name="slide-up">
          <ul
            v-if="selectedElementChild.length"
            ref="childrenWrapper"
            class="child-wrapper"
            :style="{
              '--x': `${dimensions.x}px`,
              '--y': `${dimensions.y + dimensions.h}px`,
            }"
            @mouseleave="resetHoveredCatalog"
          >
            <li v-if="selectedGame === 'csgo' && selectedElementSlug !== 'other'">
              <NuxtLinkLocale
                :to="catalogListLinkBySlug[selectedElementSlug]"
                class="nav-item"
              >
                <ListItem
                  :label="t(`catalog_${selectedGame}.${selectedElementSlug}`)"
                  :left-slot-size="50"
                  :gap="8"
                  text-spoiler
                >
                  <template #prepend>
                    <img
                      :src="CATALOG_PLACEHOLDERS_BY_SLUG[selectedElementSlug] || CATALOG_PLACEHOLDERS_BY_SLUG.others"
                      :alt="t(`catalog_${selectedGame}.${selectedElementSlug}`)"
                      loading="lazy"
                    >
                  </template>
                </ListItem>
              </NuxtLinkLocale>
            </li>

            <li v-for="child in selectedElementChild" :key="child.slug">
              <NuxtLinkLocale :to="catalogListLinkBySlug[child.slug]" class="nav-item">
                <ListItem :label="t(`catalog_${selectedGame}.${child.slug}`)" :left-slot-size="50" :gap="8" text-spoiler>
                  <template #prepend>
                    <SkinImage
                      v-if="child.img"
                      :image="child.img"
                      :image-width="100"
                      :game="selectedGame"
                      class="image"
                      loading="lazy"
                    />
                  </template>
                </ListItem>
              </NuxtLinkLocale>
            </li>
          </ul>
        </transition>
      </Teleport>
    </client-only>
  </nav>
</template>

<style scoped lang="scss">
@keyframes catalog-show {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }

  100% {
    opacity: 1;
    transform: translateY(-5px);
  }
}

nav {
  background: var(--surface-container);
  margin: calc(-1 * var(--container-padding-y)) calc(-1 * var(--container-padding-x)) 0;
  padding: 0 10px;
  overflow-x: auto;
  > ul {
    display: flex;
    align-items: center;
  }
}

.child-wrapper {
  position: fixed;
  top: var(--y);
  left: var(--x);
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--surface-high-container);
  border: 1px solid var(--outline);
  border-radius: var(--radius-sm);
  min-width: 22rem;
  max-width: 22rem;
  max-height: 60vh;
  .nav-item {
    padding: 0.8rem 1.2rem 0.9rem;;
  }
}

.sub-items {
  display: none !important;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  text-decoration: none;
  font: var(--font-16-n);
  color: var(--on-surface-tertiary);
  padding: 1.8rem 1.2rem 1.7rem;
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  @include transition(color background);
  .arrow {
    min-width: 2rem;
    opacity: 0.5;
    @include transition(opacity transform)
  }
  &:hover {
    color: var(--on-surface);
    background: var(--outline);
    .arrow {
      opacity: 1;
      transform: rotate(-180deg);
    }
  }
}

span.nav-item {
  gap: .4rem;
  white-space: nowrap;
}
</style>
