import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/Authentication/AuthenticationView.vue'
import SignIn from '../views/Authentication/SignIn.vue'
import SignUp from '../views/Authentication/SignUp.vue'
import userStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthenticationView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: SignIn
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUp
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const { name } = to;
  const store = userStore()
  await store.fetchUser()

  const { user } = store

  if (!user && name !== 'sign-in' && name !== 'sign-up') { // ara no es pot navegar a sign-up
    return { name: 'sign-in'} // s'ha de poder navegar a sign-in o a sign-up, no nomes a sign-in

  }
  if (user && name == 'sign-in' || name == 'sign-up') {
    return { name: 'home'}
  }
})

export default router
