<template>
  <div
    ref="targetEl"
    class="game-scene"
  >
    <transition
      name="slide-down"
      appear
    >
      <GamePopup v-show="isPopupOpened" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import app from '@/game/app';
import GamePopup from '@/components/Popups/PopupWrapper.vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { Popup } from '@/types/Popup';
import { sleep } from '@/utils/sleep';

const mainStore = useMainStore();
const { isPopupOpened } = storeToRefs(mainStore);

const targetEl = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  await app.start(targetEl.value);

  await sleep(3000);
  mainStore.setPopup(Popup.START);
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
