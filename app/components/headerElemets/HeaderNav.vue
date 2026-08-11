<script setup lang="ts">
import type { gameTypes } from '@/composables/useGames';

const props = defineProps<{
  selectedGame: gameTypes
}>();

const pagesList = computed(() => [
  { name: 'Main page', link: `/${props.selectedGame !== 'csgo' ? props.selectedGame : ''}` },
  { name: 'Sell items', link: `${props.selectedGame !== 'csgo' ? `/${props.selectedGame}` : ''}/manage/inventory` },
  { name: 'My shop', link: `${props.selectedGame !== 'csgo' ? `/${props.selectedGame}` : ''}/manage/sell-offers` },
  { name: 'Blog', link: '/blog' },
]);
</script>

<template>
  <nav>
    <ul>
      <li v-for="page in pagesList" :key="page.name">
        <NuxtLinkLocale
          :to="page.link"
          class="nav-item"
        >
          {{ page.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .nav-item {
    text-decoration: none;
    color: var(--on-surface-secondary);
    font: var(--font-16-n);
    padding: 1rem;
    display: inline-block;
    @include transition(color);
    &:hover,
    &.router-link-active {
      color: var(--on-surface);
    }
    &.router-link-active {
      pointer-events: none;
    }
  }
}
</style>
