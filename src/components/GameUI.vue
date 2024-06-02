<template>
  <div class="game-ui">
    <div class="game-ui__top">
      <transition>
        <div
          :key="timerId"
          class="game-ui__timer"
        />
      </transition>
      <transition
        name="fade"
        appear
      >
        <div
          v-show="!isPopupOpened"
          class="game-ui__scores"
        >
          <div class="game-ui__row">
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
          <div class="game-ui__row">
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
      </transition>

      <div
        v-if="!isPopupOpened && isStartScreenWatched"
        class="game-ui__button"
      >
        <CommonButton @click="mainStore.togglePopup">
          <PauseIcon class="promo-button__icon" />
        </CommonButton>
      </div>
    </div>

    <div
      v-if="!isPopupOpened"
      class="game-ui__health"
    >
      <div
        v-for="point in healthPoints"
        :key="point"
        class="game-ui__health-point"
      >
        <transition
          name="scale-in"
          mode="out-in"
        >
          <img
            :key="healthPoints"
            :src="hpImage"
            alt="heart"
          >
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import CommonButton from '@/components/CommonButton.vue';
import PauseIcon from '@/components/icons/StopIcon.vue';
import hpImage from '@/assets/images/hp.png';

const mainStore = useMainStore();

const {
  score, time, bestScore, timerId, isPopupOpened, isStartScreenWatched, healthPoints,
} = storeToRefs(mainStore);

const transformTimer = computed(() => `translateX(${time.value / 60 * 100}%)`);
</script>

<style lang="scss">
.game-ui {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 1.5rem;
    font-size: 2rem;
    color: white;
  }

  &__timer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: .75rem;
    overflow: hidden;
    background-color: $ui-main;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: $ui-secondary;
      transform: v-bind(transformTimer);
      transition: transform 1s linear;
    }
  }

  &__scores {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-transform: uppercase;
  }

  &__row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 20rem;
    gap: 1rem;
  }

  svg {
    position: relative;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: auto;
  }

  &__button {
    width: 3.4rem;
    height: 3.4rem;
    pointer-events: auto;
    margin-left: auto;
  }

  &__health {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transform: scale(1, -1);
    margin-top: auto;
    padding: 1.5rem 1.5rem;

    img {
      width: 5rem;
      height: auto;
    }
  }
}
</style>
