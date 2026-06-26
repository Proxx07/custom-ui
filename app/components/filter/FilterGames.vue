<script setup lang="ts">
import { GAMES_IMAGES, GAMES_LABELS, GAMES_LIST } from '@/composables/useGames';
</script>

<template>
  <div class="games-wrapper">
    <NuxtLinkLocale v-for="game in GAMES_LIST" :key="game" :to="`/${game === 'csgo' ? '' : game}`" class="game-button">
      <img
        :src="GAMES_IMAGES[game]"
        :alt="GAMES_LABELS[game]"
        loading="lazy"
      >

      {{ GAMES_LABELS[game] }}
    </NuxtLinkLocale>
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
  color: var(--on-surface-tretiary);
  cursor: pointer;
  gap: .8rem;
  transition: color var(--fast-timing);
  text-decoration: none;
  text-align: center;
  width: 100%;

  --img-opacity: .3;

  &:hover {
    --img-opacity: .6;
    color: var(--on-surface);
  }

  &.router-link-exact-active {
    --img-opacity: 1;
    color: var(--on-surface);
  }

  img {
    min-height: 94px;
    flex-grow: 1;
    object-fit: cover;
    border-radius: var(--radius-sm);
    transition: opacity var(--fast-timing);
    opacity: var(--img-opacity);
  }

}
</style>
