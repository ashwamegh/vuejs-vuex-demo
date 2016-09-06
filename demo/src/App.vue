<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container-fluid">
    <product-list :products="products"></product-list>
  </main>
</template>

<script>
import AppNav from './components/AppNav'
import ProductList from './components/admin/ProductList'

export default {
  components: {
    AppNav,
    ProductList
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      products: [
        {
          name: 'Product Item 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
          price: '99'
        },
        {
          name: 'Product Item 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
          price: '99'
        },
        {
          name: 'Product Item 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
          price: '99'
        },
        {
          name: 'Product Item 4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
          price: '99'
        },
        {
          name: 'Product Item 5',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
          price: '99'
        }
      ]
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
