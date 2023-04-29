<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />

      <button class="btn btn-popup-close" @click="togglePopup()"></button>
    </div>
  </div>
</template>

<script>
import '@/assets/main.css'
export default {
  name: 'SignInPopup',
  props: {
    togglePopup: {
      type: Function,
      required: true
    }
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
  background-color: rgba(25, 0, 25, 0.5);

  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #FBE4D8;
  border-radius: 12px;
  margin: 0;
  position: relative;
}
.btn-popup-close {
  position: absolute;
  top: 3%;
  right: 3%;
  height: 1.5em;
  width: 1.5em;

  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-popup-close::before,
.btn-popup-close::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 1em;
  background-color: #FBE4D8;
}

.btn-popup-close::before {
  transform: rotate(45deg);
}

.btn-popup-close::after {
  transform: rotate(-45deg);
}
</style>
