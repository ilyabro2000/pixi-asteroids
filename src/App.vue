<template>
  <div class="app">
    <GameScene class="app__game" />

    <GameUI class="app__ui" />
  </div>
</template>

<script lang="ts" setup>
import GameScene from '@/components/GameScene.vue';
import { useMainStore } from '@/store/main';
import GameUI from '@/components/GameUI.vue';

const mainStore = useMainStore();
</script>

<style lang="scss">
.app {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
</style>
