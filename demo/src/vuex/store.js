import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = {
  // TODO: Set up initial state
  productInForm: {
    name: '',
    description: '',
    price: 0
  },
  products: []
}

const mutations = {

  FETCH_PRODUCTS_SUCCESS (state, products) {
    state.products = products
  },

  CREATE_PRODUCT_SUCCESS (state, product) {
    state.products = [
      ...state.products,
      product
    ]
  },

  UPDATE_PRODUCT_SUCCESS (state, product) {
    const index = state.products.findIndex(p => p.id === product.id)
    state.products.$set(index, product)
  },

  SET_PRODUCT_IN_FORM (state, product) {
    state.productInForm = product
  },

  DELETE_PRODUCT_SUCCESS (state, productId) {
    state.products = state.products.filter((product) => product.id !== productId)
  }

}

const Store = new Vuex.Store({
  state: initialState,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
