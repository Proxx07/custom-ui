<script setup lang="ts">
import type { BreadCrumbsItem } from '@/composables/UI';
import { chevronRight } from '@/assets/icons/arrows';
import { VIcon } from '@/components/ui';
import { GAME_ICONS, GAMES_LABELS, useGames } from '@/composables/useGames';

defineProps<{
  list: BreadCrumbsItem[]
}>();

const { selectedGame, gamePrefixForLink } = useGames();

const gameIcon = computed(() => `url(${GAME_ICONS[selectedGame.value]})`);
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLinkLocale :to="gamePrefixForLink" class="game">
          {{ GAMES_LABELS[selectedGame] }}
        </NuxtLinkLocale>
      </li>
      <template v-for="item in list" :key="item.label">
        <li>
          <VIcon :icon="chevronRight" :size="18" color="on-surface-tertiary" />
          <template v-if="!item.link">
            {{ item.label }}
          </template>
          <NuxtLinkLocale v-else :to="item.link">
            {{ item.label }}
          </NuxtLinkLocale>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  gap: .8rem;
  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
    padding: 1rem 0;
    &.router-link-exact-active {
      pointer-events: none;
    }
  }
  :deep(svg) {
    min-width: 18px;
  }
}

.game {
  padding-left: 2.6rem;
  position: relative;
  &:before {
    content: '';
    width: 1.8rem;
    border-radius: var(--radius-sm);
    background-image: v-bind(gameIcon);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  }
}

li {
  font: var(--font-16-n);
  color: var(--on-surface-tertiary);
  display: flex;
  align-items: center;
  gap: .8rem;
  @include transition(color);
  &:hover {
    color: var(--on-surface);
  }
}
</style>
