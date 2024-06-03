<template>
  <div class="game-ui">
    <div class="game-ui__top">
      <div
        v-if="!isPopupOpened"
        class="game-ui__health"
      >
        <KeycapIcon
          v-for="point in healthPoints"
          :key="point"
          color="red"
          class="game-ui__health-point"
        >
          <img
            :key="healthPoints"
            :src="hpImage"
            alt="heart"
          >
        </KeycapIcon>
      </div>

      <transition>
        <div
          :key="timerId"
          class="game-ui__timer"
        />
      </transition>

      <div
        v-if="!isPopupOpened"
        class="game-ui__scores"
      >
        <transition
          name="scale-in"
          appear
          mode="out-in"
        >
          <KeycapIcon
            :key="score"

            is-big
            color="gold"
          >
            {{ score }}
          </KeycapIcon>
        </transition>
      </div>

      <div
        v-if="!isPopupOpened && isStartScreenWatched"
        class="game-ui__button"
      >
        <CommonButton @click="mainStore.togglePopup">
          <PauseIcon class="promo-button__icon" />
        </CommonButton>
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
import KeycapIcon from '@/components/icons/KeycapIcon.vue';

const mainStore = useMainStore();

const {
  time,
  timerId,
  isPopupOpened,
  isStartScreenWatched,
  healthPoints,
  score,
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
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1.5rem;
    font-size: 2rem;
    color: white;
    width: 100%;
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
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
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
    gap: 1rem;
    justify-content: flex-start;
    margin-top: auto;
    padding: 1.5rem 1.5rem;

    img {
      position: relative;
      bottom: -0.4rem;
      width: 4rem;
      height: auto;
      transform: scale(1, -1);
    }
  }
}
</style>
