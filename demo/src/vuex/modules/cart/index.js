import * as getters from './getters'
import * as actions from './actions'

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBTRACT_FROM_CART
} from './mutation-types'

const initialState = {
  products: []
}

// mutations
const mutations = {
  [ADD_TO_CART] (state, product) {
    const record = state.products.find(p => p.id === product.id)
    if (!record) {
      state.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },
  [REMOVE_FROM_CART] (state, productId) {
    state.products = state.products.filter(p => p.id !== productId)
  },
  [SUBTRACT_FROM_CART] (state, productId) {
    const record = state.products.find(p => p.id === productId)
    if (record && record.quantity === 1) {
      state.products = state.products.filter(p => p.id !== productId)
    } else if (record) {
      record.quantity--
    }
  }
}

export default {
  state: {...initialState},
  getters,
  actions,
  mutations
}
