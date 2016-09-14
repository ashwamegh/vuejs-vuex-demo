import { http } from 'vue'

export function fetchProduct ({ dispatch }, productId) {
  http.get(`http://localhost:3000/products/${productId}`)
    .then((response) => dispatch('FETCH_PRODUCT_SUCCESS', response.body.data))
}

export function fetchProducts ({ dispatch }) {
  http.get('http://localhost:3000/products')
    .then((response) => {
      dispatch('FETCH_PRODUCTS_SUCCESS', response.body.data)
    })
}

export function addProduct ({ dispatch }, newProduct, image) {
  let productId
  // POST all product information except the product image
  http.post('http://localhost:3000/products', newProduct)
    .then((response) => {
      dispatch('CREATE_PRODUCT_SUCCESS', response.body.data)
      productId = response.body.data.id
    })
    // Only upload image if an image has been defined
    .then(() => image && uploadProductImage({ dispatch }, image, productId))
    .then(() => resetProductInForm({ dispatch }))
    .catch((response) => dispatch('CREATE_PRODUCT_FAILED', response.body.errors))
}

export function editProduct ({ dispatch }, product, image) {
  http.put(`http://localhost:3000/products/${product.id}`, product)
    .then((response) => dispatch('UPDATE_PRODUCT_SUCCESS', response.body.data))
    // Only upload image if an image has been defined
    .then(() => image && uploadProductImage({ dispatch }, image, product.id))
    .then(() => resetProductInForm({ dispatch }))
    .catch((response) => dispatch('UPDATE_PRODUCT_FAILED', response.body.errors))
}

export function removeProduct ({ state, dispatch }, product) {
  http.delete(`http://localhost:3000/products/${product.id}`)
    .then((response) => dispatch('DELETE_PRODUCT_SUCCESS', product.id))
    .then(() => {
      if (product.id === state.productInForm.id) {
        resetProductInForm({ dispatch })
      }
    })
}

export function setProductInForm ({ dispatch }, product) {
  dispatch('SET_PRODUCT_IN_FORM', product)
}

export function resetProductInForm ({ dispatch }) {
  dispatch('RESET_PRODUCT_IN_FORM')
}

export function addToCart ({ state, dispatch }, product) {
  const record = state.cart.products.find((p) => p.id === product.id)

  if (!record || record.quantity < 10) {
    dispatch('ADD_TO_CART', product)
  }
}

export function removeFromCart ({ dispatch }, productId) {
  dispatch('REMOVE_FROM_CART', productId)
}

export function subtractFromCart ({ state, dispatch }, productId) {
  dispatch('SUBTRACT_FROM_CART', productId)
}

function uploadProductImage ({ dispatch }, image, productId) {
  var formData = new global.FormData()

  formData.append('product_id', productId)
  formData.append('product_image', image)

  // Upload (PUT) the product image before resolving the response
  return http.put('http://localhost:3000/products/upload', formData)
    .then((response) => response.body.data)
    // Since the server has associated the product with the image
    // we now need to refresh (GET) the product data to get this information
    .then(() => fetchProduct({ dispatch }, productId))
}
