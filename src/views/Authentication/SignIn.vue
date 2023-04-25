<template>
  <div>
    <h1>SignIn View</h1>

    <button @click="() => togglePopup('buttonTrigger')">Sign in</button>
    <!-- <button @click="handleSignIn()">Sign in</button> -->
    <router-link to="/auth/sign-up">Sign up</router-link>

    <SignInPopup
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')"
    >
      <form action="get" method="get">
        <label for="email">email</label>
        <input v-model="email" type="email" placeholder="email" autocomplete="email" />
        <!-- autocomplete no funciona bé, cal preguntar -->
        <label for="password">password</label>
        <input v-model="password" type="password" placeholder="password" autocomplete="password" />
        <!-- autocomplete no funciona bé, cal preguntar -->
      </form>
    </SignInPopup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { /* mapActions ,*/ mapState } from 'pinia'
import userStore from '@/stores/user'
import SignInPopup from './Popups/SignInPopup.vue'

export default {
  name: 'AutheticationView',
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
    ...mapState(userStore, ['user']),

  /*     methods: {
        ...mapActions(userStore, ["signIn"]),
        async handleSignIn() {
            try {
                const userData = {
                    email: this.email,
                    password: this.password, //aixo esta per fer proves, en realitat ho ha d'introduir l'usuari amb un input
                };
                await this.signIn(userData);
                this.$router.push({ name: "home" });
            }
            catch (error) {
                console.error(error);
            }
        }
    }, */
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
