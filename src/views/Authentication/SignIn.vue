<template>
  <div class="signin-wrapper">
    <div class="wrapper main-wrapper">
      <h1 class="main-wrapper-title">Hi Boss!</h1>
      <h3 class="main-wrapper-text">Welcome to the most evil task manager</h3>
      <button class="btn btn-login" @click="() => togglePopup('signIn')">Log in</button>
    </div>

    <div class="wrapper signup-wrapper">
      <p class="signup-text">Dont have an account?</p>
      <button class="btn btn-signup" @click="() => togglePopup('signUp')">Sign up</button>
    </div>

    <SignInPopup
      v-if="popupTriggers.signIn"
      :togglePopup="() => togglePopup('signIn')"
    >
      <form class="form-wrapper" @submit.prevent="handleSignIn()">
        <label class="form-label" for="email">Email</label>
        <input class="form-input" v-model="email" type="email" placeholder="email" autocomplete="email" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <label class="form-label" for="password">Password</label>
        <input class="form-input" v-model="password" type="password" placeholder="password" autocomplete="password" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <button class="btn btn-form" type="submit">Log In</button>
      </form>
    </SignInPopup>

    <SignUpPopup
      v-if="popupTriggers.signUp"
      :togglePopup="() => togglePopup('signUp')"
    >
      <form class="form-wrapper" @submit.prevent="validateForm()">
        <label class="form-label" for="email">Email</label>
        <input class="form-input" v-model="email" type="email" placeholder="email" autocomplete="email" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <label class="form-label" for="password">Password</label>
        <input class="form-input" v-model="password" type="password" placeholder="password" autocomplete="password" minlength="8" required/>
        <label class="form-label" for="passwordTwo">Confirm password</label>
        <input class="form-input" v-model="passwordTwo" type="password" placeholder="confirm password" autocomplete="password" minlength="8" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <button class="btn btn-form" type="submit">Sign Up</button>
      </form>
    </SignUpPopup>

  </div>
</template>

<script>
import '@/assets/main.css'
import { mapActions, mapState } from 'pinia'
import userStore from '@/stores/user'
import SignInPopup from './Popups/SignInPopup.vue'
import SignUpPopup from './Popups/SignUpPopup.vue'
import { useToast } from "vue-toastification";

export default {
  name: 'AutheticationView',
  data() {
    return {
      email: '',
      password: '',
      passwordTwo: '',
      popupTriggers: {
        buttonTrigger: false,
      },
      selectedTask: null,
      toast: useToast()
    }
  },
  components: {
    SignInPopup,
    SignUpPopup
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signIn', 'signUp']),

    togglePopup(trigger, task = null) {
        this.popupTriggers[trigger] = !this.popupTriggers[trigger]
        if (task) {
            this.selectedTask = task
        }
    },

    async handleSignIn() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        this.toast.success('Hello Boss')
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.toast.error("Couldn't log in, try again")
        console.error(error)
      }
    },

    async handleSignUp() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        }
        await this.signUp(userData)
        this.toast.success('Hello Boss')
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.toast.error("Couldn't sign up, try again")
        console.error(error)
      }
    },

    validateForm() {
      if (this.password !== this.passwordTwo) {
        this.toast.error('Passwords must be equal')
        throw new Error ('Passwords must be equal')
      } else {
        this.handleSignUp()
      }
    },
  }
}
</script>