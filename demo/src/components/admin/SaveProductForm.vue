<template lang="html">
  <form class="row">
    <fieldset class="col-md-4">
      <div class="form-group">
        <label for="productName">Product name</label>
        <input type="text" v-model="product.name" class="form-control" id="productName" placeholder="Enter product name">
      </div>
      <div class="form-group">
        <label for="productDescription">Product description</label>
        <textarea class="form-control" v-model="product.description" id="productDescription" rows="3" placeholder="Enter description"></textarea>
      </div>
      <div class="form-group">
        <label for="price"></label>
        <input type="number" v-model="product.price" class="form-control" id="price" placeholder="Enter Price" number>
      </div>
      <button type="submit" v-on:click.prevent="saveProduct" class="btn btn-primary">Save product</button>
    </form>
  </fieldset>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    saveProduct () {
      this.$dispatch('save-product', this.product)
    }
  }
}
</script>

<style lang="css" scoped>
form {
  margin-bottom: 20px;
}
</style>
