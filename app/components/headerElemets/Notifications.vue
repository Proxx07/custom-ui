<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { bell } from '@/assets/icons/actions';
import { NotificationItem } from '@/components/notification';
import { Button, type ButtonExpose, DotLoader, Modal, Popover } from '@/components/ui';
import { useResponsive } from '@/composables/UI';
import { useNotifications } from '@/composables/useNotifications';

const {
  list, hasMore, loading,
  fetchNotifications, loadMoreNotifications,
} = useNotifications();

onMounted(fetchNotifications);

const { isMax } = useResponsive();
const target = ref<ButtonExpose>();
const [opened, toggle] = useToggle();
</script>

<template>
  <div>
    <Button ref="target" severity="tertiary" variant="outlined" size="s" :icon-right="bell" @click="toggle()" />

    <client-only>
      <Modal v-if="isMax('mobile')" v-model="opened">
        <template #content>
          <div class="flex-col justify-center items-center gap" style="min-height: 150px">
            <DotLoader v-if="!list.length && loading" :count="5" />
            <div v-if="!list.length && !loading" class="font-32-sb">
              ¯\_(ツ)_/¯
            </div>
            <NotificationItem
              v-for="item in list"
              :key="item.id"
              :notification="item"
            />
            <DotLoader v-if="hasMore" v-intersection-observer="loadMoreNotifications" :count="5" />
          </div>
        </template>
      </Modal>
      <Popover v-else v-model="opened" :target="target?.buttonRef" stay-on-scroll :width="350">
        <div class="flex-col justify-center items-center gap" style="min-height: 150px">
          <DotLoader v-if="!list.length && loading" :count="5" />
          <div v-if="!list.length && !loading" class="font-32-sb">
            ¯\_(ツ)_/¯
          </div>
          <NotificationItem
            v-for="item in list"
            :key="item.id"
            :notification="item"
          />
          <DotLoader v-if="hasMore" v-intersection-observer="loadMoreNotifications" :count="5" />
        </div>
      </Popover>
    </client-only>
  </div>
</template>

<style scoped lang="scss"></style>
