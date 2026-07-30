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
  padding: var(--container-padding-y) 0;
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  gap: var(--gap);
  align-items: center;
  grid-template-columns: 330px 1fr;

  background: #{mix-color-transparent(var(--surface-container), .9)};
  backdrop-filter: blur(5px);
  @include media-min($tablet) {
    grid-column: span 2;
  }
  @include media-max($tablet) {
    grid-template-columns: auto 1fr;
    :deep(nav) {
      display: none;
    }
  }

  a {
    color: var(--on-surface);
  }

  &__logo {
    padding-left: var(--container-padding-x);
    font-size: 0;
  }

  &__right {
    display: flex;
    align-items: center;
    padding-right: var(--container-padding-x);
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
