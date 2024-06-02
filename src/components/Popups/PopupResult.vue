<template>
  <div class="popup-result">
    <div class="popup-result__title">
      Конец игры
    </div>

    <div class="popup-result__info">
      {{ text }}
    </div>

    <ScoreMain
      v-if="isWin"
      class="popup-result__scores"
    />

    <CommonButton
      class="popup-result__button"
      @click="mainStore.restartGame"
    >
      Играть еще
    </CommonButton>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import CommonButton from '@/components/CommonButton.vue';
import { computed } from 'vue';
import ScoreMain from '@/components/ScoreMain.vue';

const mainStore = useMainStore();

const { isWin } = storeToRefs(mainStore);

const text = computed(() => (isWin.value ? 'Ты дошел до финала!' : 'Твой корабль уничтожен!'));
</script>

<style lang="scss" scoped>
.popup-result {
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
    text-align: center;

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

  &__scores {
    width: 100%;
  }
}
</style>
