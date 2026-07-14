<script setup lang="ts">
import WLogo from '~~/public/logo/logo.svg?raw';
import { burgerMenu } from '@/assets/icons/general';
import { steam } from '@/assets/icons/logos';
import { HeaderNav } from '@/components/headerElemets';
import { Button, VIcon } from '@/components/ui';
import { useGames } from '@/composables/useGames';
import { useDrawersStore } from '@/store/drawersState';

const drawersState = useDrawersStore();
const { selectedGame } = useGames();
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <NuxtLinkLocale
        :to="`/${selectedGame !== 'csgo' ? selectedGame : ''}`"
        class="logo"
      >
        <VIcon :icon="WLogo" /> Waxpeer
      </NuxtLinkLocale>
    </div>

    <div class="header__right">
      <HeaderNav :selected-game="selectedGame" />

      <Button
        label="Sign in with Steam"
        :icon-left="steam"
        class="ml-auto"
        padding="1.2rem 1.6rem 1.1rem"
      />

      <Button
        severity="tertiary"
        variant="text"
        class="ml-auto burger-button"
        :icon-left="burgerMenu"
        @click="drawersState.showAsideDrawer"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: var(--container-padding-y) var(--container-padding-x);
  position: sticky;
  top: 0;
  grid-column: span 2;
  background: var(--surface-container);
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
  a {
    color: var(--on-surface);
  }

  &__right {
    display: flex;
    align-items: center;
  }
}

.burger-button {
  @include media-min($tablet) {
    display: none !important;
  }
}

.logo {
  font-size: 0;
  @include media-max($mobile) {
    width: 4.1rem;
    overflow: hidden;
    :deep(svg) {
      max-width: unset;
    }
    :deep(.logo-letter) {
      display: none;
    }
  }
}
</style>
