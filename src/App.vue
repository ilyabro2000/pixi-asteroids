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
  overflow: hidden;
}
</style>
