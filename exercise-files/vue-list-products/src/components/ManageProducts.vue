<template>
  <section>
    <save-product-form
      :product="productInForm"
      v-on:submit="onFormSave"
      v-on:cancel="onCancelUpdate"
    ></save-product-form>
    <product-list 
      :products="products"
      v-on:edit="onEditClicked"
      v-on:remove="onRemoveClicked"
    ></product-list>
  </section>
</template>
<script>
/* eslint-disable */

import ProductList from './ProductList'
import SaveProductForm from './SaveProductForm'
import { mapActions, mapGetters } from 'vuex'

const initialData = () => {
  return {
    productInForm: {
      id: null,
      name: '',
      description: '',
      price: null
    },
  }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  data: initialData,
  computed: mapGetters({
    products: 'getProducts'
  }),
  methods: {
    ...mapActions([
      'saveProduct',
      'deleteProduct'
    ]),
    onFormSave (product) {
      this.saveProduct(product).then(() => this.resetProductInForm())
    },
    resetProductInForm () {
      this.productInForm = initialData().productInForm
    },
    onEditClicked (product) {
      this.productInForm = {...product}
    },
    onCancelUpdate (){
      this.resetProductInForm()
    },
    onRemoveClicked (productId) {
      this.deleteProduct(productId).then(() => {
        if (productId === this.productInForm.id) {
          this.resetProductInForm()
        }
      })
    }
  }
}
</script>