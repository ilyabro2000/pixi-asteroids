import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { DEFAULT_HEALTH_COUNT, GameState, INITIAL_TIME } from '@/types/Game';
import { Popup } from '@/types/Popup';
import Emitter from '@/game/Emitter';
import events from '@/types/events';

const useMainStore = defineStore('main', () => {
  const score = ref(0);
  const healthPoints = ref(DEFAULT_HEALTH_COUNT);
  const gameState = ref(GameState.PAUSE);
  const popupState = ref(Popup.NULL);
  const isWin = ref(false);
  const time = ref(INITIAL_TIME);
  const timerId = ref(0);
  const bestScore = ref(0);
  const isStartScreenWatched = ref(false);

  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = computed(() => windowWidth.value < 729);
  const isPopupOpened = computed(() => popupState.value !== Popup.NULL);

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
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
        stopTimer();
        break;
      case GameState.GAME:
        isWin.value = false;
        setPopup(Popup.NULL);
        Emitter.emit(events.RESUME_GAME);
        resumeTimer();
        break;
      case GameState.GAME_OVER_WIN:
        isWin.value = true;
        Emitter.emit(events.SET_WIN);
        setPopup(Popup.GAME_OVER);

        if (score.value > bestScore.value) {
          bestScore.value = score.value;
        }
        break;
      case GameState.GAME_OVER_LOSE:
        Emitter.emit(events.SET_LOSE);
        setPopup(Popup.GAME_OVER);
        stopTimer();
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    popupState.value = Popup.NULL;
    setGameState(GameState.GAME);
  };

  const togglePopup = () => {
    if (isPopupOpened.value) {
      closePopup();
      return;
    }
    setGameState(GameState.PAUSE);
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
  };

  Emitter.on(events.SET_SCORE, (value: number) => {
    setScore(value);
  });

  Emitter.on(events.PLAYER_DAMAGED, () => {
    setDamage();
  });

  const initTimer = (value: number) => {
    if (!timerId.value) {
      time.value = value;
    }

    timerId.value = setInterval(() => {
      time.value -= 1;

      if (time.value <= 0) {
        clearInterval(timerId.value);
        setGameState(GameState.GAME_OVER_WIN);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerId.value) {
      clearInterval(timerId.value);
    }
  };

  const resetTimer = () => {
    time.value = INITIAL_TIME;
    stopTimer();
  };

  const resumeTimer = () => {
    initTimer(time.value);
  };

  const restartGame = () => {
    resetTimer();
    healthPoints.value = DEFAULT_HEALTH_COUNT;
    score.value = 0;

    Emitter.emit(events.RESTART_GAME);

    setGameState(GameState.GAME);
  };

  return {
    windowWidth,
    isMobile,
    healthPoints,
    score,
    gameState,
    popupState,
    isPopupOpened,
    time,
    bestScore,
    timerId,
    isStartScreenWatched,
    isWin,
    restartGame,
    togglePopup,
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
