import { defineStore } from 'pinia';
import { Store } from '@/types/Store';
import observeWindowSize from '@/utils/observeWindowSize';

export const useMainStore: Store = defineStore('main', {
  state: () => ({
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    isLoaded: false,
  }),
  getters: {
    isMobile: (state: Store) => state.windowWidth < 729,
  },
  actions: {
    observeWindowSize() {
      observeWindowSize(({ width }: { width: number }) => {
        this.windowWidth = width;
      });
    },
  },
});
