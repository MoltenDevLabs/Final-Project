<template>
  <div>
    <h1>SignUp View</h1>
    <button @click="() => togglePopup('buttonTrigger')">Sign up</button>
    <router-link to="/auth/sign-in">Sign in</router-link>

    <SignUpPopup
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')"
    >
      <form @submit.prevent="validateForm()">
        <label for="email">email</label>
        <input v-model="email" type="email" placeholder="email" autocomplete="email" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <label for="password">password</label>
        <input v-model="password" type="password" placeholder="password" autocomplete="password" minlength="8" required/>
        <label for="passwordTwo">Confirm password</label>
        <input v-model="passwordTwo" type="password" placeholder="confirm password" autocomplete="password" minlength="8" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <button type="submit">Sign Up</button>
      </form>
    </SignUpPopup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapActions, mapState } from 'pinia'
import userStore from '@/stores/user'
import SignUpPopup from './Popups/SignUpPopup.vue'

export default {
  name: 'AutheticationView',
  data() {
    return {
      email: '',
      password: '',
      passwordTwo: ''
    }
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false
    })

    const togglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      SignUpPopup,
      popupTriggers,
      togglePopup
    }
  },
  components: {
    SignUpPopup,
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    async handleSignUp() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        }
        await this.signUp(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },
    validateForm() {
        if (this.password !== this.passwordTwo) {
            alert ('Passwords must be equal')
        } else {
            this.handleSignUp()
        }
    },
  },
}
</script>

<style scoped>
button,
input {
  display: block;
  margin-bottom: 10px;
}
</style>