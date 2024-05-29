<template>
  <div class="app">
    <GameScene class="app__game" />
  </div>
</template>

<script lang="ts" setup>
import GameScene from '@/components/GameScene.vue';
</script>

<style lang="scss">
.app {
  position: relative;
  margin: 0 auto;
  padding: 1rem 3rem;
  min-height: 100vh;
  overflow-x: hidden;

  @include layout-mobile {
    padding: 1rem 1.6rem;
  }
}
</style>
