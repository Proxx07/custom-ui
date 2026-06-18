<script setup lang="ts">
import { chevronLeft, chevronRight } from '@/assets/icons/arrows';
import { Button, Drawer, Modal } from '@/components/ui';

const simpleModal = ref(false);
const modalOpened = ref(false);
const customBgModal = ref(false);
const storiesLikeModal = ref(false);

const drawerLeft = ref(false);
const drawerRight = ref(false);
const drawerWithOffset = ref(false);

const { $toast } = useNuxtApp();
</script>

<template>
  <div class="components">
    <Button label="Open modal" size="s" severity="secondary" @click="simpleModal = true" />
    <Button label="Open modal with long content" size="s" severity="secondary" @click="modalOpened = true" />
    <Button label="Custom bg modal" size="s" severity="secondary" @click="customBgModal = true" />
    <Button label="Stories like" size="s" severity="secondary" @click="storiesLikeModal = true" />

    <hr>

    <Button label="Open drawer left" size="s" @click="drawerLeft = true" />
    <Button label="Open drawer right" size="s" @click="drawerRight = true" />
    <Button label="Drawer with offset" size="s" @click="drawerWithOffset = true" />

    <client-only>
      <Modal
        v-model="simpleModal"
        title="Modal title"
      >
        <template #content>
          <div
            v-for="i in 10"
            :key="i"
            style="min-height: 10px;"
            v-text="i"
          />
        </template>
      </Modal>

      <Modal
        v-model="modalOpened"
        title="TEST MODAL"
        back-button
        @back="$toast.attention('Back button clicked')"
      >
        <template #content>
          Scroll
          <div
            v-for="i in 200"
            :key="i"
            style="min-height: 20px;"
            v-text="i"
          />
        </template>
        <template #footer-inner>
          <div class="font-24-b">
            {FOOTER}
          </div>
        </template>
      </Modal>

      <Modal
        v-model="customBgModal"
        title="Bg changed"
        modal-bg="outline-variant"
      >
        <template #content>
          <div
            v-for="i in 10"
            :key="i"
            style="min-height: 10px;"
            v-text="i"
          />
        </template>
      </Modal>

      <Modal
        v-model="storiesLikeModal"
        title="Stories like"
        :max-width="400"
      >
        <template #header-above>
          <div class="flex gap">
            <span
              v-for="i in 5"
              :key="i"
              class="linear-loader bg-sapphire"
              style="flex-grow: 1; height: 2px"
            />
          </div>
        </template>
        <template #header-append>
          <div class="flex" style="margin-right: -1rem">
            <Button
              :icon-left="chevronLeft"
              size="s"
              severity="tretiary"
              variant="text"
              @click="$toast.success('Prev')"
            />
            <Button
              :icon-right="chevronRight"
              size="s"
              severity="tretiary"
              variant="text"
              @click="$toast.success('Next')"
            />
          </div>
        </template>
        <template #content>
          <div
            v-for="i in 10"
            :key="i"
            style="min-height: 10px;"
            v-text="i"
          />
        </template>
      </Modal>

      <Drawer
        v-model="drawerLeft"
        title="Drawer left"
      >
        <div
          v-for="i in 200"
          :key="i"
          style="min-height: 20px;"
          v-text="i"
        />
      </Drawer>

      <Drawer
        v-model="drawerRight"
        position="right"
        title="Drawer right"
      >
        <div
          v-for="i in 200"
          :key="i"
          style="min-height: 20px;"
          v-text="i"
        />
      </Drawer>

      <Drawer
        v-model="drawerWithOffset"
        title="Drawer with offset"
        offset-top="69px"
        position="right"
      >
        <div
          v-for="i in 200"
          :key="i"
          style="min-height: 20px;"
          v-text="i"
        />

        <template #footer>
          <div class="font-20-m">
            FOOTER
          </div>
        </template>
      </Drawer>
    </client-only>

    <div style="width: 100%; min-height: 200vh" />
  </div>
</template>

<style scoped lang="scss">
.components {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}
hr {
  width: 100%;
}
</style>
