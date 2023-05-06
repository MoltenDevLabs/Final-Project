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
  name: 'UpdateTaskPopup',
  props: {
    togglePopup: {
      type: Function,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTaskTitle: '',
      newTaskDescription: ''
    }
  }
}
</script>
