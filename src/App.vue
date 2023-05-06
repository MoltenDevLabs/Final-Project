<template>
  <div>
    <NavbarView />
    <RouterView />
  </div>
</template>

<script>
import '@/assets/main.css'
import '@/assets/animations.css'
import NavbarView from './views/NavbarView.vue'

export default {
  name: 'App',
  components: { NavbarView }
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
  background-color: #fbe4d8;
}
</style>
