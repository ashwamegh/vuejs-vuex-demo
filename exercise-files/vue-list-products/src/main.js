import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// components
import ProductCatalog from './components/ProductCatalog'
import ManageProducts from './components/ManageProducts'

// import some global styles
import './styles/style.scss'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/home', alias:'/', component: ProductCatalog},
  { path: '/manage-products', component: ManageProducts}
]

const router = new VueRouter({ routes })

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')