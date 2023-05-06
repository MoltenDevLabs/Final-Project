<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />

      <button class="btn btn-popup-close" @click="togglePopup()"></button>
    </div>
  </div>
</template>

<script>
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
