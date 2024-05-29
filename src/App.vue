<template>
  <div class="app">
    <h1 class="app__title">
      Template
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';

const mainStore = useMainStore();

mainStore.observeWindowSize();
</script>

<style lang="scss">
.app {
  position: relative;
  margin: 0 auto;
  padding: 1rem 3rem;
  min-height: 100vh;
  overflow-x: hidden;

  @include layout-mobile {
    padding: 1rem 1.6rem;
  }
}
</style>
