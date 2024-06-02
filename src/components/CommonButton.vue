<template>
  <button
    class="common-button"
    type="button"
    @click="onButtonClick"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup>
const emit = defineEmits(['click']);

const onButtonClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
.common-button {
  border: 0 none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  text-align: center;
  outline: none;
  font-weight: 600;
  line-height: 1.1;
  color: #fff;
  background-color: $ui-main;
  height: 3rem;
  width: 100%;
  border-radius: 0.5rem;
  border-right: 0.4rem solid #427687;
  border-bottom: 0.4rem solid #427687;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background-color 0.14s ease-in-out;

  @include hover {
    background-color: $ui-secondary;
  }
}

</style>
