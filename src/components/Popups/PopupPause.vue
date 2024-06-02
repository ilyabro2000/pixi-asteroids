<template>
  <div class="popup-pause">
    <div class="popup-pause__title">
      Пауза
    </div>

    <div class="popup-pause__info">
      <div class="popup-pause__info-item">
        <p class="popup-pause__info-item-title">
          Лучший счет:
        </p>

        <p class="popup-pause__info-item-value">
          {{ bestScore }}
        </p>
      </div>

      <div class="popup-pause__info-item">
        <p class="popup-pause__info-item-title">
          Текущий счет:
        </p>

        <p class="popup-pause__info-item-value">
          {{ score }}
        </p>
      </div>
    </div>

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
import { storeToRefs } from 'pinia';
import CommonButton from '@/components/CommonButton.vue';

const mainStore = useMainStore();

const { score, bestScore } = storeToRefs(mainStore);
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    &-item-title {
      font-size: 2rem;
    }

    &-item-value {
      font-size: 2rem;
    }
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
