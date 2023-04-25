<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />

      <button @click="handleSignIn()">Sign in</button>
      <button class="popup-close" @click="togglePopup()">X</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user'

export default {
  name: 'SignInPopup',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    togglePopup: {
      type: Function,
      required: true
    }
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    async handleSignIn() {
      try {
        const userData = {
          email: this.email, //"pol@gmail.com",
          password: this.password, //"contra" //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
        }
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
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
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  background-color: white;
}
.popup-close:hover {
  background-color: red;
}
</style>
