<template>
  <section>
    <save-product-form
      :product="productInForm"
      v-on:submit="onFormSave"
    ></save-product-form>
    <product-list
      :products="products">
    </product-list>
  </section>
</template>

<script>
import uuid from 'uuid'
import ProductList from './ProductList'
import SaveProductForm from './SaveProductForm'

const initialData = () => {
  return {
    productInForm: {
      id: null,
      name: '',
      description: '',
      price: null
    },
    products: [
      {
        id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
        name: 'COBOL 101 vintage',
        description: 'Learn COBOL with this vintage programming book',
        price: 399
      },
      {
        id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
        name: 'Sharp C2719 curved TV',
        description: 'Watch TV like never before with the brand new curved screen technology',
        price: 1995
      },
      {
        id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
        name: 'Remmington X mechanical keyboard',
        description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
         'features tactile, clicky switches for speed and accuracy',
        price: 595
      }
    ]
  }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  data: initialData,
  methods: {
    onFormSave (product) {
      // Generate an id using the third-party lib 'uuid'
      product.id = uuid.v4()
      // add it to the product list
      this.products.push(product)
      // reset the form
      this.resetProductInForm()
    },
    resetProductInForm () {
      this.productInForm = initialData().productInForm
    }
  }
}
</script>
