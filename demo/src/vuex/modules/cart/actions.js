import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBTRACT_FROM_CART
} from './mutation-types'

export function addToCart ({ commit, state }, product) {
  const record = state.products.find((p) => p.id === product.id)

  if (!record || record.quantity < 10) {
    commit(ADD_TO_CART, product)
  }
}

export function removeFromCart ({ commit }, productId) {
  commit(REMOVE_FROM_CART, productId)
}

export function subtractFromCart ({ commit }, productId) {
  commit(SUBTRACT_FROM_CART, productId)
}
