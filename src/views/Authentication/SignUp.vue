<template>
  <div>
    <h1>SignUp View</h1>
    <button @click="handleSignUp()">Sign up</button>
    <router-link to="/auth/sign-in">Sign in</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import userStore from '@/stores/user'

export default {
  name: 'AutheticationView',
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    async handleSignUp() {
      try {
        const userData = {
          email: 'pol@gmail.com', //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
          password: 'contra' //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
        }
        await this.signUp(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
