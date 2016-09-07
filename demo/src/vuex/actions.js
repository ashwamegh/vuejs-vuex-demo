export function incrementCounter ({ dispatch }) {
  dispatch('INCREMENT', 1)
}

export function removeProduct ({ dispatch }, product) {
  dispatch('REMOVE_PRODUCT', product.id)
}

export function addProduct ({ dispatch }, newProduct) {
  dispatch('ADD_PRODUCT', newProduct)
  resetProductInForm({ dispatch })
}

export function editProduct ({ dispatch }, productId, product) {
  dispatch('EDIT_PRODUCT', productId, product)
  resetProductInForm({ dispatch })
}
export function setProductInForm ({ dispatch }, product) {
  dispatch('SET_PRODUCT_IN_FORM', product)
}

export function resetProductInForm ({ dispatch }) {
  dispatch('SET_PRODUCT_IN_FORM', {
    name: '',
    description: '',
    price: 0
  })
}
