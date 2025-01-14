import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {conexionbbdd} from './conexionbbdd.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Connect to the database
