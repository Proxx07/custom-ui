<script setup lang="ts">
import type { IUser } from '@/composables/useUser';
import { Avatar, Drawer, Popover } from '@/components/ui';
import { useResponsive } from '@/composables/UI';

defineProps<{
  user: IUser
}>();

const { isMax } = useResponsive();
const target = ref<HTMLElement>();
const [opened, toggle] = useToggle();
</script>

<template>
  <div>
    <div ref="target" @click="toggle()">
      <Avatar
        :name="user.name"
        :image="user.avatar"
        hide-name
      />
    </div>

    <client-only>
      <Drawer v-if="isMax('mobile')" v-model="opened" position="right" offset-top="64px">
        <div class="flex-col justify-center items-center gap">
          {{ user }}
        </div>
      </Drawer>
      <Popover v-else v-model="opened" :target="target" stay-on-scroll :width="350" hidden>
        <div class="flex-col justify-center items-center gap">
          {{ user }}
        </div>
      </Popover>
    </client-only>
  </div>
</template>

<style scoped lang="scss">

</style>
