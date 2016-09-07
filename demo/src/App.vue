<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container-fluid">
    <save-product-form
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :product="product"
      @save-product="saveProduct"
    ></save-product-form>
    <product-list
      :products="products"
      @edit-product="editProduct"
      @remove-product="removeProduct"
    ></product-list>
  </main>
</template>

<script>
import AppNav from './components/AppNav'
import ProductList from './components/admin/ProductList'
import SaveProductForm from './components/admin/SaveProductForm'

function initialProductState () {
  return {
    name: '',
    description: '',
    price: 0
  }
}

export default {
  components: {
    AppNav,
    ProductList,
    SaveProductForm
  },
  data () {
    const product = initialProductState()
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      product,
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
  },
  methods: {
    saveProduct (product) {
      var productIndex = this.products.findIndex((item) => item.id === product.id)

      if (productIndex !== -1) {
        // Update existing product
        this.products.$set(productIndex, product)
      } else {
        // Save new product
        this.products.push(product)
      }

      this.$set('product', initialProductState())
    },
    editProduct (product) {
      this.$set('product', Object.assign({}, product))
    },
    removeProduct (product) {
      this.products.$remove(product)
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

.app-header {
  margin-bottom: 40px;
}
</style>
