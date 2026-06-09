<script setup lang="ts">
import { logIn, plus, tick } from '@/assets/icons/actions';
import { Button } from '@/components/ui';
</script>

<template>
  <div class="page-wrapper">
    <div class="buttons">
      <Button size="xl" :icon-right="tick">
        Button
      </Button>
      <Button size="l" :icon-right="tick">
        Button
      </Button>
      <Button :icon-right="tick">
        Button
      </Button>

      <Button size="s" :icon-right="tick">
        Button
      </Button>

      <Button size="xl" :icon-right="plus" />
      <Button size="l" :icon-right="plus" />
      <Button :icon-right="plus" />
      <Button size="s" :icon-right="plus" />

      <hr>
      <Button variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button variant="outlined" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Primary outlined
      </Button>

      <Button size="xl" :icon-right="plus" variant="outlined" />
      <Button size="l" :icon-right="plus" variant="outlined" />
      <Button :icon-right="plus" variant="outlined" />
      <Button size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button variant="text" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Primary text
      </Button>

      <Button size="xl" :icon-right="plus" variant="text" />
      <Button size="l" :icon-right="plus" variant="text" />
      <Button :icon-right="plus" variant="text" />
      <Button size="s" :icon-right="plus" variant="text" />
      <hr>

      <Button severity="secondary" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button severity="secondary" size="l" :icon-right="tick">
        Button
      </Button>
      <Button severity="secondary" :icon-right="tick">
        Button
      </Button>

      <Button severity="secondary" size="s" :icon-right="tick">
        Button
      </Button>

      <Button severity="secondary" size="xl" :icon-right="plus" />
      <Button severity="secondary" size="l" :icon-right="plus" />
      <Button severity="secondary" :icon-right="plus" />
      <Button severity="secondary" size="s" :icon-right="plus" />

      <hr>
      <Button severity="secondary" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button severity="secondary" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button severity="secondary" variant="outlined" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button severity="secondary" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Secondary outlined
      </Button>

      <Button severity="secondary" size="xl" :icon-right="plus" variant="outlined" />
      <Button severity="secondary" size="l" :icon-right="plus" variant="outlined" />
      <Button severity="secondary" :icon-right="plus" variant="outlined" />
      <Button severity="secondary" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button severity="secondary" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button severity="secondary" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button severity="secondary" variant="text" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button severity="secondary" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Secondary text
      </Button>

      <Button severity="secondary" size="xl" :icon-right="plus" variant="text" />
      <Button severity="secondary" size="l" :icon-right="plus" variant="text" />
      <Button severity="secondary" :icon-right="plus" variant="text" />
      <Button severity="secondary" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button severity="tretiary" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button severity="tretiary" size="l" :icon-right="tick">
        Button
      </Button>
      <Button severity="tretiary" :icon-right="tick">
        Button
      </Button>

      <Button severity="tretiary" size="s" :icon-right="tick">
        Button
      </Button>

      <Button severity="tretiary" size="xl" :icon-right="plus" />
      <Button severity="tretiary" size="l" :icon-right="plus" />
      <Button severity="tretiary" :icon-right="plus" />
      <Button severity="tretiary" size="s" :icon-right="plus" />

      <hr>
      <Button severity="tretiary" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button severity="tretiary" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button severity="tretiary" variant="outlined" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button severity="tretiary" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Tretiary outlined
      </Button>

      <Button severity="tretiary" size="xl" :icon-right="plus" variant="outlined" />
      <Button severity="tretiary" size="l" :icon-right="plus" variant="outlined" />
      <Button severity="tretiary" :icon-right="plus" variant="outlined" />
      <Button severity="tretiary" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button severity="tretiary" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button severity="tretiary" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button severity="tretiary" variant="text" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button severity="tretiary" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Tretiary text
      </Button>

      <Button severity="tretiary" size="xl" :icon-right="plus" variant="text" />
      <Button severity="tretiary" size="l" :icon-right="plus" variant="text" />
      <Button severity="tretiary" :icon-right="plus" variant="text" />
      <Button severity="tretiary" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button severity="destructive" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button severity="destructive" size="l" :icon-right="tick">
        Button
      </Button>
      <Button severity="destructive" :icon-right="tick">
        Button
      </Button>

      <Button severity="destructive" size="s" :icon-right="tick">
        Button
      </Button>

      <Button severity="destructive" size="xl" :icon-right="plus" />
      <Button severity="destructive" size="l" :icon-right="plus" />
      <Button severity="destructive" :icon-right="plus" />
      <Button severity="destructive" size="s" :icon-right="plus" />

      <hr>
      <Button severity="destructive" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button severity="destructive" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button severity="destructive" variant="outlined" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button severity="destructive" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Destructive outlined
      </Button>

      <Button severity="destructive" size="xl" :icon-right="plus" variant="outlined" />
      <Button severity="destructive" size="l" :icon-right="plus" variant="outlined" />
      <Button severity="destructive" :icon-right="plus" variant="outlined" />
      <Button severity="destructive" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button severity="destructive" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button severity="destructive" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button severity="destructive" variant="text" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button severity="destructive" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Destructive text
      </Button>

      <Button severity="destructive" size="xl" :icon-right="plus" variant="text" />
      <Button severity="destructive" size="l" :icon-right="plus" variant="text" />
      <Button severity="destructive" :icon-right="plus" variant="text" />
      <Button severity="destructive" size="s" :icon-right="plus" variant="text" />

      <hr>

      <Button severity="attention" size="xl" :icon-right="tick">
        Button
      </Button>
      <Button severity="attention" size="l" :icon-right="tick">
        Button
      </Button>
      <Button severity="attention" :icon-right="tick">
        Button
      </Button>

      <Button severity="attention" size="s" :icon-right="tick">
        Button
      </Button>

      <Button severity="attention" size="xl" :icon-right="plus" />
      <Button severity="attention" size="l" :icon-right="plus" />
      <Button severity="attention" :icon-right="plus" />
      <Button severity="attention" size="s" :icon-right="plus" />

      <hr>
      <Button severity="attention" variant="outlined" size="xl" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button severity="attention" variant="outlined" size="l" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button severity="attention" variant="outlined" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button severity="attention" variant="outlined" size="s" :icon-right="plus" :icon-left="tick">
        Attention outlined
      </Button>

      <Button severity="attention" size="xl" :icon-right="plus" variant="outlined" />
      <Button severity="attention" size="l" :icon-right="plus" variant="outlined" />
      <Button severity="attention" :icon-right="plus" variant="outlined" />
      <Button severity="attention" size="s" :icon-right="plus" variant="outlined" />

      <hr>
      <Button severity="attention" variant="text" size="xl" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button severity="attention" variant="text" size="l" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button severity="attention" variant="text" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button severity="attention" variant="text" size="s" :icon-right="plus" :icon-left="tick">
        Attention text
      </Button>

      <Button severity="attention" size="xl" :icon-right="plus" variant="text" />
      <Button severity="attention" size="l" :icon-right="plus" variant="text" />
      <Button severity="attention" :icon-right="plus" variant="text" />
      <Button severity="attention" size="s" :icon-right="plus" variant="text" />

      <hr>
      <Button
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
        severity="secondary"
        variant="text"
        hover-severity="attention"
        no-hover-bg
        padding=".5rem"
      >
        Secondary - hover:attention
      </Button>

      <Button
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
