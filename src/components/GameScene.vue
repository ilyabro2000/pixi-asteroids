<template>
  <div
    ref="targetEl"
    class="game-scene"
  />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import app from '@/game/app';

const targetEl = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  app.start(targetEl.value);
});
</script>

<style lang="scss">
.game-scene {
  canvas {
    width: 100vw;
    height: 100vh;
  }
}
</style>
