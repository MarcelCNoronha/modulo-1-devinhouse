import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import * as yup from 'yup';

// rotas
import {routes} from '@/router/routes.js'

// configuração do Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//vuex
import store from './store'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})

createApp(App)

.use(routes)
.use(vuetify)
.use(store)
.mount('#app')