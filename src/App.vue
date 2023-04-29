<!-- Palette

/* CSS HEX */

--eggplant dark: #190019 rgb(25, 0, 25)
--purple: #2B124C
--light purple: #522B58 rgb(82, 43, 88)
--ultra light purple: #854F6C
--dark white: #DFB6B2 rgb(223, 182, 178)
--white: #FBE4D8

-->

<template>
  <div>
    <NavbarView />
    <RouterView />
  </div>
</template>


<script>
import NavbarView from './views/NavbarView.vue';
import './assets/main.css'

export default {
    name: "App",
    components: { NavbarView }
}
</script>


<style scoped>
html {
  margin: 0;
  padding: 0;
}
</style>
