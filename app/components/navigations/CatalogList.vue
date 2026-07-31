<script setup lang="ts">
import { chevronDown, chevronLeft } from '@/assets/icons/arrows';
import { SkinImage } from '@/components/skin';
import { ListItem, VIcon } from '@/components/ui';

import { useCatalogMenu, useResponsive } from '@/composables/UI';
import { CATALOG_PLACEHOLDERS_BY_SLUG, type ICatalog, useGameCatalog } from '@/composables/useGameCatalog';
import { useModuleI18n } from '@/composables/useModuleI18n';

defineProps<{
  mobileFoldersCollapsed: boolean
}>();

const {
  loading: isFetching,
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

const { isMin, isMax } = useResponsive();

const {
  dimensions, childrenWrapper, navWrapper,
  isMouseOutsideOfChildWrapper,
  hoverHandler, resetHandler,
} = useCatalogMenu();

const resetParentCatalog = () => {
  resetHandler();
  selectedElementSlug.value = '';
  selectedElementChild.value = [];
};

const selectParentCatalog = (slug: string, e?: MouseEvent) => {
  resetParentCatalog();
  if (!navWrapper.value || isFetching.value) return;
  if (timer) clearTimeout(timer);
  nextTick(() => {
    selectedElementSlug.value = slug;
    selectedElementChild.value = getCatalogChildBySlug(slug);
    if (e) hoverHandler(e);
  });
};

const resetDebouncedParentCatalog = () => {
  timer = setTimeout(() => {
    if (!isMouseOutsideOfChildWrapper.value) return;
    resetParentCatalog();
  }, 250);
};

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});

const $router = useRouter();
const loading = computed(() => isFetching.value && !$router.currentRoute.value.params.brand);
</script>

<template>
  <nav ref="navWrapper">
    <ul class="categories-desktop">
      <li v-for="catalog in catalogList" :key="catalog.slug">
        <span
          class="nav-item"
          @mouseenter="selectParentCatalog(catalog.slug, $event)"
          @mouseleave="resetDebouncedParentCatalog"
        >

          {{ !loading ? t(`catalog_${selectedGame}.${catalog.slug}`) : '&nbsp;' }}
          <VIcon
            v-if="!loading && catalog.children?.length"
            :icon="chevronDown"
            :size="20"
            class="arrow"
          />
        </span>

        <ul v-if="!loading && catalog.children?.length" class="sub-items">
          <li v-if="selectedGame === 'csgo' && catalog.slug">
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

    <client-only v-if="isMax('tablet')">
      <div class="collapse" :class="[mobileFoldersCollapsed && 'collapse--opened']">
        <transition-group name="grid" tag="ul" class="categories-mobile">
          <template v-if="!selectedElementChild.length">
            <li v-for="catalog in catalogList" :key="catalog.slug">
              <span class="nav-item" @click="selectParentCatalog(catalog.slug)">
                <img
                  :src="CATALOG_PLACEHOLDERS_BY_SLUG[catalog.slug] || CATALOG_PLACEHOLDERS_BY_SLUG.others"
                  :alt="t(`catalog_${selectedGame}.${selectedElementSlug}`)"
                  :height="50"
                  loading="lazy"
                >
                {{ t(`catalog_${selectedGame}.${catalog.slug}`) }}
              </span>
            </li>
          </template>
          <template v-else>
            <li>
              <span class="nav-item" @click="resetParentCatalog">
                <span class="font-18-n color-on-surface">
                  {{ t(`catalog_${selectedGame}.${selectedElementSlug}`) }}
                </span>

                <img
                  :src="CATALOG_PLACEHOLDERS_BY_SLUG[selectedElementSlug] || CATALOG_PLACEHOLDERS_BY_SLUG.others" width="80"
                  style="opacity: .2; position: absolute; z-index: 1;"
                >

                <span class="flex-col gap">
                  <VIcon :icon="chevronLeft" />
                  Back
                </span>
              </span>
            </li>

            <li v-for="catalog in selectedElementChild" :key="catalog.slug">
              <NuxtLinkLocale :to="catalogListLinkBySlug[catalog.slug]" class="nav-item">
                <div style="width: 8rem">
                  <SkinImage
                    v-if="catalog.img"
                    :image="catalog.img"
                    :image-width="250"
                    :game="selectedGame"
                    class="image"
                  />
                </div>
                {{ t(`catalog_${selectedGame}.${catalog.slug}`) }}
              </NuxtLinkLocale>
            </li>
          </template>
        </transition-group>
      </div>
    </client-only>

    <client-only v-if="isMin('tablet')">
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
            @mouseleave="resetParentCatalog"
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
  padding: 0 10px;
  overflow-x: auto;
  margin: calc(-1 * var(--container-padding-y)) calc(-1 * var(--container-padding-x)) 0;
  &::-webkit-scrollbar {
    height: 1px;
    width: 1px;
  }
  > ul {
    display: flex;
    align-items: center;
  }
  @include media-max($tablet) {
    margin: 0;
    overflow: inherit;
    background: none;
    padding: 0;
    > ul {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    .categories-desktop {
      display: none;
    }
    .categories-mobile {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
      gap: .4rem;
    }
  }
}

.categories-mobile,
.sub-items {
  display: none;
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
  @include media-max($tablet) {
    flex-direction: column;
    background: var(--surface-container);
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%) rotateZ(45deg);
      width: 5rem;
      aspect-ratio: 1;
      pointer-events: none;
      border: 1px solid rgba(165,179,195,.05);
      filter: grayscale(1);
      background: radial-gradient(circle, rgba(255,33,1,.16) 20%, rgba(255,33,1,.05) 40%, transparent 70%, transparent 100%);
      background-position: center;
      @include transition(filter);
    }
    img {
      position: relative;
    }
  }
  &:hover {
    color: var(--on-surface);
    background: var(--outline);
    .arrow {
      opacity: 1;
      transform: rotate(-180deg);
    }
    &:before {
      filter: grayscale(0);
    }
  }
}

span.nav-item {
  gap: .4rem;
  white-space: nowrap;
  @include media-max($tablet) {
    white-space: wrap;
    text-align: center;
    height: 100%;
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
    padding: 0.8rem 1.2rem 0.9rem;
  }
}

.grid-enter-active,
.grid-leave-active {
  @include transition(transform opacity);
}

.grid-move {
  @include transition(transform opacity);
}

.grid-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.grid-leave-to {
  display: none;
}
</style>
