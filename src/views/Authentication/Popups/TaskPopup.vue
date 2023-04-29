<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />

      <button class="popup-close" @click="togglePopup()">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskPopup',
  props: {
    togglePopup: {
      type: Function,
      required: true
    },
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: white;
  padding: 32px;
}
.popup-close {
  position: relative;
  top: 7px;
  right: 7px;
  cursor: pointer;
  background-color: white;
}
.popup-close:hover {
  background-color: red;
}
</style>
