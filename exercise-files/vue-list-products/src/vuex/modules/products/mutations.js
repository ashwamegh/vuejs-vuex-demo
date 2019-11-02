import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

export default {
  [CREATE_PRODUCT] (state, product) {
    state.all.push(product)
  },

  [UPDATE_PRODUCT] (state, product) {
    const index = state.all.findIndex((p) => p.id = product.id)

    if(index !== -1){
      state.all.splice(index, 1, product)
    }
  },

  [DELETE_PRODUCT] (state, productId) {
    state.all = state.all.filter((p) => p.id !== productId)
  }
}