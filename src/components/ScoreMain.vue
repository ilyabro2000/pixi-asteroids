<template>
  <div class="score-main">
    <div class="score-main__row">
      <p>Тeкущий:</p>
      <transition
        name="scale-in"
        mode="out-in"
      >
        <p :key="score">
          {{ score }}
        </p>
      </transition>
    </div>
    <div class="score-main__row">
      <p>Лучший:</p>
      <transition
        name="scale-in"
        mode="out-in"
      >
        <p :key="bestScore">
          {{ bestScore }}
        </p>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { score, bestScore } = storeToRefs(mainStore);
</script>

<style lang="scss">
.score-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-transform: uppercase;

  &__row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 20rem;
    gap: 1rem;
  }
}
</style>
