import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options = {
  position: POSITION.BOTTOM_CENTER,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: 'button',
  icon: false,
  rtl: false,
  className: 'toast-text'
}

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
