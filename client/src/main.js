import Vue from 'vue'
import App from './Pokedex.vue'
import vuetify from '../src/plugins/vuetify'

Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

