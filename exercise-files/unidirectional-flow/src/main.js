import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import ManageProducts from './components/ManageProducts'
import ProductCatalog from './components/ProductCatalog'

import './styles/style.scss'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/home': {
    component: ProductCatalog
  },
  '/manage-products': {
    component: ManageProducts
  }
})

router.alias({
  '/': '/home'
})

router.start(App, 'app')
