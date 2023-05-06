<template>
  <div class="wrapper-nav navbar">
    <h3 class="navbar-title">Evil Task Manager</h3>
  </div>
</template>

<script>
export default {
  name: 'NavbarView'
}
</script>

<style>
.wrapper-nav {
  height: 8vh;
  width: 100%;
  position: relative;
  background: linear-gradient(to left, #2b124c 0%, #854f6c 50%, #2b124c 100%);
  margin-bottom: 2vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 0;
}

.wrapper-nav:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/logo.svg');
  background-repeat: repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.7;
  z-index: 1;
}

.navbar-title {
  color: #fbe4d8;
  width: 100%;
  text-align: center;
  z-index: 2;
}
</style>
