<template>
  <form>
    <div class="form-group" v-bind:class="[{ 'has-danger': formErrors.name }]">
      <label for="productName">Product name</label>
      <input type="text" v-model="product.name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name">
      <div v-if="formErrors.name" class="form-control-feedback">{{formErrors.name}}</div>
    </div>

    <div class="form-group">
      <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
      <textarea class="form-control" v-model="product.description" id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
    </div>

    <div class="form-group" v-bind:class="[{ 'has-danger': formErrors.price }]">
      <label for="price">Price</label>
      <input type="number" v-model="product.price" class="form-control" id="price" placeholder="Enter Price" number>
      <div v-if="formErrors.price" class="form-control-feedback">{{formErrors.price}}</div>
    </div>

    <div class="form-group">
      <label for="file" class="d-block">Product image <small class="text-muted">(optional)</small></label>
      <label class="custom-file">
        <input type="file" name="product_image" @change="onImageChanged" accept=".png, .jpg" id="file" class="custom-file-input">
        <span class="custom-file-control"></span>
      </label>
      <small class="form-text text-muted">{{selectedFileName}}</small>
    </div>

    <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">
      {{product.id ? 'Update' : 'Add'}} product
    </button>
    <button type="submit" v-if="product.id" v-on:click.prevent="onCancel" class="btn btn-secondary">Cancel</button>
  </form>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      formErrors: {},
      selectedFile: undefined,
      selectedFileName: ''
    }
  },
  watch: {
    'product.id' () {
      this.formErrors = {}
      this.selectedFile = undefined
      this.selectedFileName = this.product.imageName
    }
  },
  methods: {
    validateForm () {
      const errors = {}

      if (!this.product.name) {
        errors.name = 'Name is required'
      }

      if (!this.product.price) {
        errors.price = 'Price is required'
      }

      this.formErrors = errors

      return Object.keys(errors).length === 0
    },
    onCancel () {
      this.formErrors = {}

      this.$emit('cancel')
    },
    onImageChanged (event) {
      this.selectedFile = event.target.files[0]
      this.selectedFileName = event.target.files[0].name
    },
    onSubmit () {
      if (this.validateForm()) {
        this.$emit('submit', this.product, this.selectedFile)
      }
    }
  }
}
</script>

<style scoped>
  form {
    margin-bottom: 24px;
  }
</style>
