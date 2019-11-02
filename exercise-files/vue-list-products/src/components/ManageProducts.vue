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
      // eslint-disable-next-line no-console
    //   const index = this.products.findIndex((p) => p.id === product.id)

    // if (index !== -1) {
    //   // We need to replace the array entirely so that vue can recognize
    //     // the change and re-render entirely.
    //     // See http://vuejs.org/guide/list.html#Caveats
    //     console.log('productData', JSON.stringify(product))
    //     this.products.splice(index, 1, product)
    //   } else {
    //     product.id = uuid.v4()
    //     console.log('productData', JSON.stringify(product))
    //     this.products.push(product)
    //   }
      this.saveProduct(product)
      this.resetProductInForm()
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
      // const index = this.products.findIndex((p) => p.id === productId)

      // this.products.splice(index, 1)
      this.deleteProduct(productId)

      if (productId === this.productInForm.id) {
        this.resetProductInForm()
      }
    }
  }
}
</script>