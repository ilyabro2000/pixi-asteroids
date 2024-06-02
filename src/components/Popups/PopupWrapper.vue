<template>
  <div class="popup-wrapper">
    <transition
      name="fade"
      appear
      mode="out-in"
    >
      <div
        v-if="popupState !== Popup.NULL"
        :key="popupState"
        class="popup-wrapper__content"
      >
        <component :is="currentComponent" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { Popup } from '@/types/Popup';
import MainStart from '@/components/Popups/PopupStart.vue';
import MainPause from '@/components/Popups/PopupPause.vue';
import MainResult from '@/components/Popups/PopupResult.vue';

const mainStore = useMainStore();

const { popupState } = storeToRefs(mainStore);

const currentComponent = computed(() => {
  switch (popupState.value) {
    case Popup.START:
      return MainStart;
    case Popup.PAUSE:
      return MainPause;
    case Popup.GAME_OVER:
      return MainResult;
    default:
      return MainStart;
  }
});
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color-main, 0.2);
  backdrop-filter:  blur(0.5rem);

  &__content {
    position: relative;
    width: 50rem;
    height: auto;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    border: 0.3rem solid $color-additional;
    background-color: rgba($color-main, 0.6);
    backdrop-filter:  blur(0.5rem);
    transition-delay: .4s;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 99%;
      height: 98%;
      border-radius: .5rem;
      border: 0.2rem solid $color-additional;
    }
  }
}
</style>
