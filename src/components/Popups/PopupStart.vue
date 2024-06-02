<template>
  <div class="popup-start">
    <div class="popup-start__controls">
      <h2 class="popup-start__controls-title">
        Управление:
      </h2>
      <div
        v-for="control in Object.values(CONTROLS_TEXTS)"
        :key="control.id"
        class="popup-start__row"
      >
        <div class="popup-start__keycaps">
          <KeycapIcon
            v-for="key in control.keys"
            :key="key"
            :is-big="key === 'space'"
            :symbol="key"
          />
        </div>

        <p class="popup-start__controls-text">
          {{ control.text }}
        </p>
      </div>
    </div>

    <div class="popup-start__game">
      <div class="popup-start__game-block">
        <h2 class="popup-start__game-title">
          Астероиды:
        </h2>

        <div
          v-for="point in GAME_TEXTS.asteroids"
          :key="point.id"
        >
          <div class="popup-start__row">
            <div
              v-if="point.id === TUTORIAL_TEXTS_IDS.gold"
              class="popup-start__gold-point"
            />

            <div
              v-else-if="point.id === TUTORIAL_TEXTS_IDS.asteroid"
              class="popup-start__asteroid-point"
            />

            <div
              v-else-if="point.id === TUTORIAL_TEXTS_IDS.health"
              class="popup-start__health-point"
            >
              <img
                :src="hpImage"
              >
            </div>

            <p class="popup-start__game-text">
              {{ point.text }}
            </p>
          </div>
        </div>
      </div>

      <div class="popup-start__game-block">
        <h2 class="popup-start__game-title">
          Цель:
        </h2>

        <p
          v-for="text in GAME_TEXTS.goal"
          :key="text"
          class="popup-start__game-text"
        >
          {{ text }}
        </p>
      </div>
    </div>
    <CommonButton
      text="Начать игру"
      class="popup-start__button"
      @click="handelStartClick"
    >
      Погнали!
    </CommonButton>
  </div>
</template>

<script setup lang="ts">
import KeycapIcon from '@/components/icons/KeycapIcon.vue';
import { CONTROLS_TEXTS, GAME_TEXTS, TUTORIAL_TEXTS_IDS } from '@/types/Tutorial';
import hpImage from '@/assets/images/hp.png';
import CommonButton from '@/components/CommonButton.vue';
import { GameState } from '@/types/Game';
import { useMainStore } from '@/store/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const { isStartScreenWatched } = storeToRefs(mainStore);

const handelStartClick = () => {
  mainStore.setGameState(GameState.GAME);
  isStartScreenWatched.value = true;
};
</script>

<style lang="scss" scoped>
.popup-start {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  &__controls {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2vh;
    padding: 2rem 2rem;
    width: 100%;

    &:before {
      content: '';
      position: absolute;
      bottom: -.75rem;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      width: 100%;
      height: .2rem;
      background-color: $color-additional;
    }
  }

  &__controls-title {
    font-size: 2rem;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__keycaps {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    min-width: 7rem;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(15deg);
      width: .2rem;
      height: 70%;
      background-color: $color-additional;
    }
  }

  &__controls-text {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__game {
    position: relative;
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
    gap: 2vh;
    padding: 2rem 2rem;

    &-text {
      font-size: 1.4rem;
    }

    &-title {
      font-size: 1.5rem;
      margin-bottom: 1vh;
    }

    &-block {
      display: flex;
      flex-direction: column;
      gap: .6vh;
    }
  }

  &__gold-point {
    width: 1.5rem;
    height: 1.5rem;
    background-color: $color-gold;
    border-radius: 50%;
  }

  &__asteroid-point {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(-50%, -50%);
      width: 1.5rem;
      height: 1.5rem;
      background-color: $color-dirty-stone;
      border-radius: 50%;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: -110%;
      transform: translate(-50%, -50%);
      width: 1.5rem;
      height: 1.5rem;
      background-color: $color-white;
      border-radius: 50%;
    }
  }

  &__health-point {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      width: 3rem;
      height: auto;
    }
  }

  &__button {
    position: relative;
    z-index: 10;
    margin-top: 2vh;
  }

  //slide-down
  .slide-down-enter-active, .slide-down-leave-active {
    transition: transform 0.4s $elastic-ease, opacity 0.4s ease;
  }

  .slide-down-enter, .slide-down-leave-to, .slide-down-enter-from {
    transform: translateY(-50%);
    opacity: 0;
  }
}
</style>
