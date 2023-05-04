<template>
  <div>
    <NavbarView />
    <RouterView />
  </div>
</template>

<script>
import NavbarView from './views/NavbarView.vue'
import './assets/main.css'

export default {
  name: 'App',
  components: { NavbarView }
}
</script>

<style scoped>
html {
  margin: 0;
  padding: 0;
}
</style>
