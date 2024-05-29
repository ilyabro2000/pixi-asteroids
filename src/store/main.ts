import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DEFAULT_HEALTH_COUNT, GameState, SCORE_GOAL } from '@/types/Game';
import { Popup } from '@/types/Popup';

const useMainStore = defineStore('main', () => {
  const score = ref(0);
  const healthPoints = ref(DEFAULT_HEALTH_COUNT);
  const gameState = ref(GameState.PAUSE);
  const popupState = ref(Popup.NULL);

  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = computed(() => windowWidth.value < 729);

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });

  const goalScore = computed(() => {
    const goal = SCORE_GOAL - score.value;
    return goal > 0 ? score : 0;
  });

  const setPopup = (popup: Popup) => {
    popupState.value = popup;
  };

  const setGameState = (state: GameState) => {
    gameState.value = state;

    switch (state) {
      case GameState.PAUSE:
        setPopup(Popup.PAUSE);
        break;
      case GameState.GAME:
        setPopup(Popup.NULL);
        break;
      case GameState.GAME_OVER_WIN:
        setPopup(Popup.GAME_OVER_WIN);
        break;
      case GameState.GAME_OVER_LOSE:
        setPopup(Popup.GAME_OVER_LOSE);
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

  return {
    windowWidth,
    isMobile,
    goalScore,
    healthPoints,
    score,
    gameState,
    setScore,
    setDamage,
    setGameState,
  };
});

export {
  useMainStore,
};
