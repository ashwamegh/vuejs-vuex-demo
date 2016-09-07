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
  products: [
    {
      id: 1,
      name: 'Product Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
      price: '99'
    },
    {
      id: 2,
      name: 'Product Item 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
      price: '99'
    },
    {
      id: 3,
      name: 'Product Item 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
      price: '99'
    },
    {
      id: 4,
      name: 'Product Item 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
      price: '99'
    },
    {
      id: 5,
      name: 'Product Item 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
      price: '99'
    }
  ]
}

const mutations = {
  ADD_PRODUCT (state, product) {
    state.products = [
      ...state.products,
      product
    ]
  },

  EDIT_PRODUCT (state, productId, productData) {
    const index = state.products.findIndex(p => p.id === productId)

    state.products.$set(index, { index, ...productData })
  },

  SET_PRODUCT_IN_FORM (state, product) {
    state.productInForm = product
  },

  REMOVE_PRODUCT (state, productId) {
    state.products = state.products.filter((product) => product.id !== productId)
  }

}

const Store = new Vuex.Store({
  state: initialState,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
