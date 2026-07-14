<script setup lang="ts">
import { GAMES_IMAGES, GAMES_LABELS, GAMES_LIST } from '@/composables/useGames';

const localePath = useLocalePath();
const $route = useRoute();
const selectedGameInRoute = computed(() => !$route.params.game ? 'csgo' : $route.params.game);
</script>

<template>
  <div class="games-wrapper">
    <NuxtLink
      v-for="game in GAMES_LIST"
      :key="game"
      :to="localePath(`/${game === 'csgo' ? '' : game}`)"
      replace
      class="game-button"
      :class="[game === selectedGameInRoute && 'active']"
    >
      <img
        :src="GAMES_IMAGES[game]"
        :alt="GAMES_LABELS[game]"
        loading="lazy"
      >
      {{ GAMES_LABELS[game] }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.games-wrapper {
  display: flex;
  gap: 1.2rem;
}

.game-button {
  padding: 0;
  background: none;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  font: var(--font-14-n);
  color: var(--on-surface-tertiary);
  cursor: pointer;
  gap: .8rem;
  @include transition(color);
  text-decoration: none;
  text-align: center;
  width: 100%;

  --img-opacity: .3;

  &:hover {
    --img-opacity: .6;
    color: var(--on-surface);
  }

  &.router-link-active.active {
    --img-opacity: 1;
    color: var(--on-surface);
  }

  img {
    min-height: 94px;
    flex-grow: 1;
    object-fit: cover;
    border-radius: var(--radius-sm);
    @include transition(opacity);
    opacity: var(--img-opacity);
  }

}
</style>
