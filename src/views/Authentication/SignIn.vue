<template>
  <div class="signin-wrapper">
    <div class="wrapper main-wrapper">
      <h1 class="main-wrapper-title">Welcome to the most evil task manager</h1>
      <h3 class="main-wrapper-text">Never again forget your evil deeds</h3>
      <button class="btn btn-login" @click="() => togglePopup('signIn')">Log in</button>
      <!--       <button class="btn btn-login" @click="() => signInWithGoogle()">Log in with Google</button> -->
    </div>

    <div class="wrapper signup-wrapper">
      <p class="signup-text">Don't have an account?</p>
      <button class="btn btn-signup" @click="() => togglePopup('signUp')">Sign up</button>
      <p class="signup-text-two">or</p>
      <button class="btn btn-signup" @click="() => signInWithGoogle()">Sign up with Google</button>
    </div>

    <SignInPopup
      v-if="popupTriggers.signIn"
      :togglePopup="() => togglePopup('signIn')"
      class="zoom-in-popup"
      :class="zoomOutPopup ? 'zoom-out-popup' : ''"
    >
      <form class="form-wrapper" @submit.prevent="handleSignIn()">
        <label class="form-label" for="email">Email</label>
        <input
          :class="[signinEmailError ? 'form-error' : '', signinEmailValid ? 'form-valid' : '']"
          class="form-input"
          v-model="email"
          placeholder="email"
          autocomplete="email"
        />
        <label class="form-label" for="password">Password</label>
        <input
          :class="[
            signinPasswordError ? 'form-error' : '',
            signinPasswordValid ? 'form-valid' : ''
          ]"
          class="form-input"
          v-model="password"
          type="password"
          placeholder="password"
          autocomplete="password"
        />
        <button class="btn btn-form" type="submit">Log In</button>
      </form>
    </SignInPopup>

    <SignUpPopup
      v-if="popupTriggers.signUp"
      :togglePopup="() => togglePopup('signUp')"
      class="zoom-in-popup"
      :class="zoomOutPopup ? 'zoom-out-popup' : ''"
    >
      <form class="form-wrapper" @submit.prevent="validateFormSignup()">
        <label class="form-label" for="email">Email</label>
        <input
          :class="[signupEmailError ? 'form-error' : '', signupEmailValid ? 'form-valid' : '']"
          class="form-input"
          v-model="email"
          placeholder="email"
          autocomplete="email"
          required
        />
        <label class="form-label" for="password">Password</label>
        <input
          :class="[
            signupPasswordError ? 'form-error' : '',
            signupPasswordValid ? 'form-valid' : ''
          ]"
          class="form-input"
          v-model="password"
          type="password"
          placeholder="password"
          autocomplete="password"
          required
        />
        <label class="form-label" for="passwordTwo">Confirm password</label>
        <input
          :class="[
            signupPasswordTwoError ? 'form-error' : '',
            signupPasswordTwoValid ? 'form-valid' : ''
          ]"
          class="form-input"
          v-model="passwordTwo"
          type="password"
          placeholder="confirm password"
          autocomplete="password"
          required
        />
        <button class="btn btn-form" type="submit">Sign Up</button>
      </form>
    </SignUpPopup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import userStore from '@/stores/user'
import SignInPopup from './Popups/SignInPopup.vue'
import SignUpPopup from './Popups/SignUpPopup.vue'
import { useToast } from 'vue-toastification'

export default {
  name: 'AutheticationView',
  data() {
    return {
      email: '',
      password: '',
      passwordTwo: '',
      signinEmailError: false,
      signinPasswordError: false,
      signupEmailError: false,
      signupPasswordError: false,
      signupPasswordTwoError: false,
      signinEmailValid: false,
      signinPasswordValid: false,
      signupEmailValid: false,
      signupPasswordValid: false,
      signupPasswordTwoValid: false,
      zoomOutPopup: false,
      popupTriggers: {
        buttonTrigger: false
      },
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
    ...mapActions(userStore, ['signIn', 'signUp', 'signInWithGoogle']),

    togglePopup(trigger) {
      this.popupTriggers[trigger] = !this.popupTriggers[trigger]
      this.email = ''
      this.password = ''
      this.passwordTwo = ''
      this.signinEmailError = false
      this.signinPasswordError = false
      this.signupEmailError = false
      this.signupPasswordError = false
      this.signupPasswordTwoError = false
      this.signinEmailValid = false
      this.signinPasswordValid = false
      this.signupEmailValid = false
      this.signupPasswordValid = false
      this.signupPasswordTwoValid = false
    },

    async handleSignIn() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.signIn(userData)
        this.zoomOutPopup = true
        this.signinEmailValid = true
        this.signinPasswordValid = true
        this.toast.info('MEOW !!')
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.signinEmailError = true
        this.signinPasswordError = true
        this.toast.error('User not found, try again')
      }
    },

    async handleSignUp() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.signUp(userData)
        this.zoomOutPopup = true
        this.toast.info('MEOW !!')
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.toast.error("Couldn't sign up, try again")
      }
    },

    validateFormSignup() {
      if (!this.email.match('@')) {
        this.signupEmailValid = false
        this.signupEmailError = true
        this.toast.error('Email not valid')
      } else if (this.email.match('@')) {
        this.signupEmailError = false
        this.signupEmailValid = true
      }
      if (this.password.length < 8) {
        this.signupPasswordValid = false
        this.signupPasswordError = true
        this.toast.error('Password must be at least 8 characters')
      } else if (this.password.length >= 8) {
        this.signupPasswordError = false
        this.signupPasswordValid = true
      }
      if (this.password !== this.passwordTwo) {
        this.signupPasswordTwoValid = false
        this.signupPasswordTwoError = true
        this.toast.error('Passwords must be equal')
      } else if (this.password === this.passwordTwo) {
        this.signupPasswordTwoError = false
        this.signupPasswordTwoValid = true
      }
      if (this.signupEmailValid && this.signupPasswordValid && this.signupPasswordTwoValid) {
        this.handleSignUp()
      }
    }
  }
}
</script>
