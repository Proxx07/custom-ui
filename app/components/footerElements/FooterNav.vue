<script setup lang="ts">
import type { ISocialsLink, NavListItem } from '@/composables/useNavigations';
import { VIcon } from '@/components/ui';

defineProps<{
  navList: NavListItem[]
  socials: ISocialsLink[]
}>();
</script>

<template>
  <nav>
    <ul>
      <li v-for="page in navList" :key="page.name">
        <NuxtLinkLocale
          :to="page.to"
          class="nav-item"
        >
          {{ page.name }}
        </NuxtLinkLocale>
      </li>
      <li v-for="social in socials" :key="social.link">
        <a
          :href="social.link"
          target="_blank"
          rel="nofollow"
          class="nav-item fz-0 nav-item--social"
          :aria-label="social.label"
        >
          <VIcon :icon="social.icon" :size="20" />
        </a>
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
    gap: .6rem;
    align-items: center;
  }
  .nav-item {
    text-decoration: none;
    color: var(--on-surface-secondary);
    font: var(--font-14-n);
    padding: 1rem;
    display: inline-block;
    &--social {
      padding: 1rem .6rem;
    }
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
