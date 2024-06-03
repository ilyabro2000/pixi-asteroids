<template>
  <div :class="classes">
    <div class="keycap-icon__text">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps<{
  isBig?: boolean;
  color?: 'main' | 'red' | 'gold';
}>();

const classes = computed(() => [
  'keycap-icon',
  { 'keycap-icon--big': props.isBig },
  `keycap-icon--${props.color}`,
]);
</script>

<style scoped lang="scss">
.keycap-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 3rem;
  height: 3rem;
  background-color:  $ui-main;
  border-radius: 0.5rem;
  border-right: 0.4rem solid $ui-secondary;
  border-bottom: 0.4rem solid $ui-secondary;

  &--red {
    background-color: $color-red;
    border-right-color: #AD3A10FF;
    border-bottom-color: #AD3A10FF;
  }

  &--gold {
    background-color: $color-gold;
    border-right-color: #837425FF;
    border-bottom-color: #837425FF;
    color: $color-main
  }

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  &--big {
    width: 8rem;
    height: 3rem;
  }
}
</style>
