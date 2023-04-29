<template>
  <div class="signin-wrapper">
    <div class="wrapper main-wrapper">
      <h1 class="main-wrapper-title">Hi Boss!</h1>
      <h3 class="main-wrapper-text">Welcome to the most evil task manager</h3>
      <button class="btn btn-login" @click="() => togglePopup('buttonTrigger')">Log in</button>
    </div>

    <div class="wrapper signup-wrapper">
      <p class="signup-text">Dont have an account?</p>
      <router-link class="btn" to="/auth/sign-up">Sign up</router-link>
    </div>

    <SignInPopup
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')"
    >
      <form class="form-wrapper" @submit.prevent="handleSignIn()">
        <label class="email-label" for="email">email</label>
        <input class="email-input" v-model="email" type="email" placeholder="email" autocomplete="email" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <label class="password-label" for="password">password</label>
        <input class="password-input" v-model="password" type="password" placeholder="password" autocomplete="password" required/>
        <!-- autocomplete no funciona bé, cal preguntar -->
        <button class="btn btn-login-form" type="submit">Log In</button>
      </form>
    </SignInPopup>
  </div>
</template>

<script>
import '@/assets/main.css'
import { ref } from 'vue'
import { mapActions, mapState } from 'pinia'
import userStore from '@/stores/user'
import SignInPopup from './Popups/SignInPopup.vue'

export default {
  name: 'AutheticationView',
  data() {
    return {
      email: '',
      password: ''
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
      SignInPopup,
      popupTriggers,
      togglePopup
    }
  },
  components: {
    SignInPopup
  },
  computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['signIn']),
    async handleSignIn() {
      try {
        const userData = {
          email: this.email,
          password: this.password
        }
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style scoped>
.signin-wrapper {
  margin: 4vh 4vh;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 12vh 4vh;
}
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 32px;
}
.email-label {
  margin-top: 0vh;
}
.email-input {
  margin-top: 1vh;
  line-height: 1.5em;
  padding-left: 0.5em;
}
.password-label {
  margin-top: 4vh;
}
.password-input {
  margin-top: 1vh;
  line-height: 1.5em;
  padding-left: 0.5em;
}
.btn-login-form {
  margin-top: 4vh;
}
.main-wrapper-text {
  margin: 2vh 0;
  text-align: center;
}
.btn-login {
  margin: 2vh 0;
}
</style>
