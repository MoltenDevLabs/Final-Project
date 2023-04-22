<script>
//import { mapActions, mapState } from 'pinia'
//import userStore from '@/stores/user'
//import HomeView from './views/HomeView.vue';
//import AuthenticationView from './views/Authentication/AuthenticationView.vue';
//import { RouterView } from 'vue-router';

export default {
  name: 'App',
  //components: {
   // AuthenticationView,
   // HomeView,
  //},
/*   computed: {
    ...mapState(userStore, ['user'])
  },
  methods: {
    ...mapActions(userStore, ['fetchUser']),
     checkUserExists() { //tot aquest tema de la redirecció s'hauria de posar al router
      console.log(this.user)
      if (this.user) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/auth/sign-in' })
      }
    }
  },
  async created() {
    try {
      await this.fetchUser()
    } catch (error) {
      console.error(error)
    }
  },
  watch: {
    user() {
      this.checkUserExists()
    }
  } */
}
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
