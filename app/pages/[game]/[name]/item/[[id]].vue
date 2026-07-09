<script setup lang="ts">
const $route = useRoute();
</script>

<template>
  <div>
    <h1>Item page</h1>
    <br>
    Game: {{ $route.params.game }}
    <br>
    Name: {{ $route.params.name }}
    <br>
    Id: {{ $route.params.id }}
  </div>
</template>

<style scoped lang="scss"></style>
