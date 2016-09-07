import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import VueResource from 'vue-resource'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  store,
  el: 'body',
  components: { App }
})
