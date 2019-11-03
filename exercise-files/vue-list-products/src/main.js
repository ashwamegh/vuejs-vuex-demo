import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './vuex/store'

// components
import ProductCatalog from './components/ProductCatalog'
import ManageProducts from './components/ManageProducts'

// import some global styles
import './styles/style.scss'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000'
const routes = [
  { path: '/home', alias:'/', component: ProductCatalog},
  { path: '/manage-products', component: ManageProducts}
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')