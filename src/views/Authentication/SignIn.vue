<template>
  <div>
    <h1>SignIn View</h1>
    <button @click="handleSignIn()">Sign in</button>
    <router-link to="/auth/sign-up">Sign up</router-link>
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
    ...mapActions(userStore, ['signIn']),
    async handleSignIn() {
      try {
        const userData = {
          email: 'pol@gmail.com', //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
          password: 'contra' //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
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
