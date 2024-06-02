import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DEFAULT_HEALTH_COUNT, GameState, SCORE_GOAL } from '@/types/Game';
import { Popup } from '@/types/Popup';
import Emitter from '@/game/Emitter';
import events from '@/types/events';

const useMainStore = defineStore('main', () => {
  const score = ref(0);
  const healthPoints = ref(DEFAULT_HEALTH_COUNT);
  const gameState = ref(GameState.PAUSE);
  const popupState = ref(Popup.NULL);
  const isWin = ref(false);

  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = computed(() => windowWidth.value < 729);
  const isPopupOpened = computed(() => popupState.value !== Popup.NULL);

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });

  const goalScore = computed(() => {
    const goal = SCORE_GOAL - score.value;
    return goal > 0 ? score : 0;
  });

  const setPopup = (popup: Popup) => {
    popupState.value = popup;

    Emitter.emit(events.SET_PAUSE, popup !== Popup.NULL);
  };

  const setGameState = (state: GameState) => {
    gameState.value = state;
    isWin.value = false;

    switch (state) {
      case GameState.PAUSE:
        setPopup(Popup.PAUSE);
        Emitter.emit(events.SET_PAUSE);
        break;
      case GameState.GAME:
        setPopup(Popup.NULL);
        Emitter.emit(events.RESUME_GAME);
        break;
      case GameState.GAME_OVER_WIN:
        isWin.value = true;
        Emitter.emit(events.SET_WIN);
        setPopup(Popup.GAME_OVER);
        break;
      case GameState.GAME_OVER_LOSE:
        Emitter.emit(events.SET_LOSE);
        setPopup(Popup.GAME_OVER);
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    popupState.value = Popup.NULL;
    setGameState(GameState.GAME);
  };

  const setDamage = () => {
    if (healthPoints.value <= 0) return;

    healthPoints.value -= 1;

    if (healthPoints.value <= 0) {
      setGameState(GameState.GAME_OVER_LOSE);
    }
  };

  const setScore = (value: number) => {
    score.value += value;

    if (goalScore.value <= 0) {
      setGameState(GameState.GAME_OVER_WIN);
    }
  };

  Emitter.on(events.SET_SCORE, (value: number) => {
    setScore(value);
  });

  Emitter.on(events.PLAYER_DAMAGED, () => {
    setDamage();
  });

  return {
    windowWidth,
    isMobile,
    goalScore,
    healthPoints,
    score,
    gameState,
    popupState,
    isPopupOpened,
    setPopup,
    closePopup,
    setScore,
    setDamage,
    setGameState,
  };
});

export {
  useMainStore,
};
