<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container-fluid">
    <save-product-form></save-product-form>
    <product-list></product-list>
  </main>
</template>

<script>
import AppNav from './components/AppNav'
import ProductList from './components/admin/ProductList'
import SaveProductForm from './components/admin/SaveProductForm'

export default {
  components: {
    AppNav,
    ProductList,
    SaveProductForm
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
