<!-- src/components/SaveProductForm.vue  -->
<template>
  <form>
    <div class="form-group">
      <label for="productName">Product name</label>
      <input type="text" v-model="product.name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name">
    </div>
    <div class="form-group">
      <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
      <textarea class="form-control" v-model="product.description" id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" v-model="product.price" class="form-control" id="price" placeholder="Enter Price" number>
    </div>
    <div class="form-group" v-if="formError">
      <p class="form-error">description should be more than 20 words.</p>
    </div>
    <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">
      {{ product.id ? 'Update Product' : 'Add Product' }}
    </button>
    <button type="submit" v-on:click.prevent="onCancel" v-if="product.id" class="btn btn-primary">Cancel</button>
  </form>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      formError: false,
    }
  },
  watch: {
      product: function (val){
        if(val.description.length >= 20){
          this.formError = false
        }
      }
  },
  methods: {
    validate (product) {
      if(product.description.length < 20){
        this.formError = true
        return false
      }
      return true
    },
    onSubmit () {
      if(this.validate(this.product))
      this.$emit('submit', this.product)
    },
    onCancel () {
      this.$emit('cancel');
    }
  }
}
</script>

<style lang="scss">
form {
  margin: 12px;
  margin-bottom: 24px;

  button {
    margin: 8px;
  }
}
</style>