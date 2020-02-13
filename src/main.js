import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false

Vue.use(VueAxios, axios.create({
  baseURL: 'http://localhost:3001/'
}))

let store = {
  state:{
    usuario: sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null,
  },
  getters:{
    getUsuario: state => {
      return state.usuario
    },
    getToken: state => {
      return state.usuario.token
    }
  },
  mutations:{
    setUsuario(state, n){
      state.usuario = n
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store: new Vuex.Store(store),
  router,
  components: { App },
})
