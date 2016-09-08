<template lang="html">
  <form class="row">
    <fieldset class="col-md-6">
      <div v-if="formErrors" class="alert alert-danger" role="alert">
        <strong>Woops!</strong> Fix the errors and try submitting again.
        <p>
          <ul v-for="error in formErrors">
            <li>{{error.title}}</li>
          </ul>
        </p>
      </div>
      <div class="form-group">
        <label for="productName">Product name</label>
        <input type="text" v-model="name" class="form-control" id="productName" placeholder="Enter product name">
      </div>
      <div class="form-group">
        <label for="productDescription">Product description</label>
        <textarea class="form-control" v-model="description" id="productDescription" rows="3" placeholder="Enter description"></textarea>
      </div>
      <div class="form-group">
        <label for="price"></label>
        <input type="number" v-model="price" class="form-control" id="price" placeholder="Enter Price" number>
      </div>
      <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">{{productInForm.id ? 'Edit' : 'Add'}} product</button>
      <button type="button" v-if="productInForm.id" v-on:click.prevent="resetProductInForm" class="btn btn-default">Cancel</button>
    </form>
  </fieldset>
</template>

<script>
import { addProduct, editProduct, resetProductInForm } from '../../vuex/actions'
import { getProductInForm, getFormErrors } from '../../vuex/getters'

export default {
  data () {
    return {
      name: '',
      description: '',
      price: ''
    }
  },
  ready () {
    this.$watch('productInForm', () => {
      this.name = this.productInForm.name
      this.description = this.productInForm.description
      this.price = this.productInForm.price
    })
  },
  methods: {
    onSubmit () {
      const product = {
        name: this.name,
        description: this.description,
        price: this.price
      }

      if (this.productInForm.id) {
        this.editProduct({
          id: this.productInForm.id,
          ...product
        })
      } else {
        this.addProduct(product)
      }
    }
  },
  vuex: {
    actions: {
      addProduct,
      editProduct,
      resetProductInForm
    },
    getters: {
      productInForm: getProductInForm,
      formErrors: getFormErrors
    }
  }
}
</script>

<style lang="css" scoped>
form {
  margin-bottom: 20px;
}
</style>
