import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    cart,
    products
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
