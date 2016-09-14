const initialState = {
  productInForm: {
    name: '',
    description: '',
    price: null,
    imageUrl: '',
    imageName: ''
  },
  formErrors: null,
  products: []
}

const mutations = {

  FETCH_PRODUCT_SUCCESS (state, product) {
    const index = state.products.findIndex(p => p.id === product.id)

    if (index === -1) {
      state.products.push(product)
    } else {
      state.products.$set(index, product)
    }
  },

  FETCH_PRODUCTS_SUCCESS (state, products) {
    state.products = products
  },

  CREATE_PRODUCT_SUCCESS (state, product) {
    state.products = [
      ...state.products,
      product
    ]
  },

  CREATE_PRODUCT_FAILED (state, errors) {
    state.formErrors = errors
  },

  UPDATE_PRODUCT_FAILED (state, errors) {
    state.formErrors = errors
  },

  UPDATE_PRODUCT_SUCCESS (state, product) {
    const index = state.products.findIndex(p => p.id === product.id)
    state.products.$set(index, product)
  },

  SET_PRODUCT_IN_FORM (state, product) {
    state.productInForm = product
  },

  RESET_PRODUCT_IN_FORM (state) {
    state.productInForm = Object.assign({}, initialState.productInForm)
  },

  DELETE_PRODUCT_SUCCESS (state, productId) {
    state.products = state.products.filter((product) => product.id !== productId)
  }
}

export default {
  state: {...initialState},
  mutations
}
