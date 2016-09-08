import { http } from 'vue'

export function fetchProducts ({ dispatch }) {
  http.get('http://localhost:3000/products')
    .then((response) => {
      dispatch('FETCH_PRODUCTS_SUCCESS', response.body.data)
    })
}

export function addProduct ({ dispatch }, newProduct) {
  http.post('http://localhost:3000/products', newProduct)
    .then((response) => dispatch('CREATE_PRODUCT_SUCCESS', response.body.data))
    .then(() => resetProductInForm({ dispatch }))
    .catch((response) => dispatch('CREATE_PRODUCT_FAILED', response.body.errors))
}

export function editProduct ({ dispatch }, product) {
  http.put(`http://localhost:3000/products/${product.id}`, product)
    .then((response) => dispatch('UPDATE_PRODUCT_SUCCESS', response.body.data))
    .then(() => resetProductInForm({ dispatch }))
    .catch((response) => dispatch('UPDATE_PRODUCT_FAILED', response.body.errors))
}

export function removeProduct ({ dispatch }, product) {
  http.delete(`http://localhost:3000/products/${product.id}`)
    .then((response) => dispatch('DELETE_PRODUCT_SUCCESS', product.id))
}

export function setProductInForm ({ dispatch }, product) {
  dispatch('SET_PRODUCT_IN_FORM', product)
}

export function resetProductInForm ({ dispatch }) {
  dispatch('RESET_PRODUCT_IN_FORM')
}
