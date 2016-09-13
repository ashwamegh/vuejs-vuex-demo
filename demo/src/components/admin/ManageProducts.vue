<template>
  <save-product-form></save-product-form>
  <product-list></product-list>
</template>

<script>
import ProductList from './ProductList'
import SaveProductForm from './SaveProductForm'

export default {
  components: {
    ProductList,
    SaveProductForm
  }
}
</script>
