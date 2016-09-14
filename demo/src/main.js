import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import '../node_modules/bootstrap/dist/js/bootstrap'

import App from './App'
import ManageProducts from './components/admin/ManageProducts'
import ProductListing from './components/ProductListing'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

router.map({
  '/home': {
    component: ProductListing
  },
  '/manage-products': {
    component: ManageProducts
  }
})

router.alias({
  '/': '/home'
})

router.start(App, 'app')
