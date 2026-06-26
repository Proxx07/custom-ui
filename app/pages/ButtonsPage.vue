<script setup lang="ts">
import { logIn, plus, tick } from '@/assets/icons/actions';
import { Button, Checkbox } from '@/components/ui';
import { useLoaderStore } from '@/store/loadingState';

const loaderStore = useLoaderStore();
</script>

<template>
  <div class="page-wrapper">
    <Checkbox v-model="loaderStore.isLoading" label="Toggle loader" />
    <br>
    <div class="buttons">
      <Button :loading="loaderStore.isLoading" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" size="l" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" size="s" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" size="xl" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" size="l" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" size="s" :icon-right="plus" />

      <hr>
      <Button :loading="loaderStore.isLoading" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" variant="outlined" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" size="xl" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" size="l" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button :loading="loaderStore.isLoading" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button :loading="loaderStore.isLoading" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button :loading="loaderStore.isLoading" variant="text" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button :loading="loaderStore.isLoading" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button :loading="loaderStore.isLoading" size="xl" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" size="l" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" size="s" :icon-right="plus" variant="text" />
      <hr>

      <Button :loading="loaderStore.isLoading" severity="secondary" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="secondary" size="l" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="secondary" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" size="s" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" size="xl" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="l" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="secondary" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="s" :icon-right="plus" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="secondary" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="outlined" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" size="xl" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="l" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="secondary" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="secondary" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="text" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="secondary" size="xl" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="l" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="secondary" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="secondary" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button :loading="loaderStore.isLoading" severity="tretiary" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="l" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="tretiary" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" size="s" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" size="xl" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="l" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="s" :icon-right="plus" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="outlined" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" size="xl" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="l" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="text" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="tretiary" size="xl" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="l" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="tretiary" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button :loading="loaderStore.isLoading" severity="destructive" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="destructive" size="l" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="destructive" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" size="s" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" size="xl" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="l" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="destructive" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="s" :icon-right="plus" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="destructive" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="outlined" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" size="xl" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="l" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="destructive" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="destructive" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="text" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="destructive" size="xl" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="l" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="destructive" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="destructive" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button :loading="loaderStore.isLoading" severity="attention" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="attention" size="l" :icon-right="tick">
        Button
      </Button>
      <Button :loading="loaderStore.isLoading" severity="attention" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" size="s" :icon-right="tick">
        Button
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" size="xl" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="l" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="attention" :icon-right="plus" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="s" :icon-right="plus" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="attention" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="outlined" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" size="xl" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="l" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="attention" :icon-right="plus" variant="outlined" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button :loading="loaderStore.isLoading" severity="attention" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="text" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button :loading="loaderStore.isLoading" severity="attention" size="xl" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="l" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="attention" :icon-right="plus" variant="text" />
      <Button :loading="loaderStore.isLoading" severity="attention" size="s" :icon-right="plus" variant="text" />

      <hr>
      <Button
        :loading="loaderStore.isLoading"
        severity="tretiary"
        variant="text"
        hover-severity="primary"
        no-hover-bg
        padding=".5rem"
        :icon-right="logIn"
      >
        Tretiary - hover:primary
      </Button>

      <Button
        :loading="loaderStore.isLoading"
        severity="secondary"
        variant="text"
        hover-severity="attention"
        no-hover-bg
        padding=".5rem"
      >
        Secondary - hover:attention
      </Button>

      <Button
        :loading="loaderStore.isLoading"
        severity="destructive"
        variant="text"
        hover-severity="tretiary"
        no-hover-bg
        :icon-left="plus"
        padding=".5rem"
      >
        Danger - hover:white
      </Button>

      <Button
        :loading="loaderStore.isLoading"
        type="nuxt-link"
        severity="tretiary"
        variant="text"
        no-hover-bg
        padding=".5rem"
        text-color="on-surface-tretiary"
        hover-text-color="on-surface"
      >
        For menu
      </Button>

      <Button
        :loading="loaderStore.isLoading"
        type="nuxt-link"
        severity="tretiary"
        variant="text"
        no-hover-bg
        padding=".5rem"
        text-color="on-surface"
        hover-text-color="on-surface-tretiary"
      >
        For menu contrast
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}

hr {
  width: 100%;
}
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200vh;
}
</style>
