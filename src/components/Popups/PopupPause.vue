<template>
  <div class="popup-pause">
    <div class="popup-pause__title">
      Пауза
    </div>

    <ScoreMain class="popup-pause__info" />

    <div class="popup-pause__buttons">
      <CommonButton
        class="popup-pause__button"

        @click="mainStore.togglePopup"
      >
        Продолжить
      </CommonButton>

      <CommonButton
        class="popup-pause__button"
        @click="mainStore.restartGame"
      >
        Начать заново
      </CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import CommonButton from '@/components/CommonButton.vue';
import ScoreMain from '@/components/ScoreMain.vue';

const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
.popup-pause {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  gap: 3vh;
  color: #fff;

  &__title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &__info {
    width: 100%;
  }

  &__buttons {
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-top: auto;
  }

  &__button {
    width: 100%;
  }
}
</style>
