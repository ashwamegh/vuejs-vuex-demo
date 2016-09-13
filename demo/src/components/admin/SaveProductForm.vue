<template lang="html">
  <form>
    <fieldset>
      <div v-if="formErrors" class="alert alert-danger" role="alert">
        <strong>Woops!</strong> Fix the errors and try submitting again.
        <p>
          <ul v-for="error in formErrors">
            <li>{{error.title}}</li>
          </ul>
        </p>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="productName">Product name</label>
            <input type="text" v-model="name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name">
          </div>
          <div class="form-group">
            <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
            <textarea class="form-control" v-model="description" id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
          </div>

        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" v-model="price" class="form-control" id="price" placeholder="Enter Price" number>
          </div>
          <div class="form-group">
            <label for="file">Product image <small class="text-muted">(optional)</small></label>
            <br>
            <label class="custom-file">
              <input type="file" name="product_image" @change="onImageChanged" accept=".png, .jpg" id="file" class="custom-file-input">
              <span class="custom-file-control"></span>
            </label>
            <small class="form-text text-muted">{{selectedFileName}}</small>
          </div>
        </div>
      </div>
      <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">{{productInForm.id ? 'Edit' : 'Add'}} product</button>
      <button type="button" v-if="productInForm.id" v-on:click.prevent="resetProductInForm" class="btn btn-secondary">Cancel</button>
    </fieldset>
  </form>
</template>

<script>
import { addProduct, editProduct, resetProductInForm } from '../../vuex/actions'
import { getProductInForm, getFormErrors } from '../../vuex/getters'

export default {
  data () {
    return {
      name: '',
      description: '',
      price: '',
      selectedFile: '',
      selectedFileName: ''
    }
  },
  ready () {
    this.$watch('productInForm', () => {
      this.name = this.productInForm.name
      this.description = this.productInForm.description
      this.price = this.productInForm.price
      this.selectedFile = undefined
      this.selectedFileName = this.productInForm.imageName
    })
  },
  methods: {
    onImageChanged (event) {
      this.selectedFile = event.target.files[0]
      this.selectedFileName = event.target.files[0].name
    },
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
        }, this.selectedFile)
      } else {
        this.addProduct(product, this.selectedFile)
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

<style lang="scss" scoped>
form {
  margin-bottom: 20px;
}
</style>
