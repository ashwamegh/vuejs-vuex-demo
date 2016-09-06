<template lang="html">
  <form class="row">
    <fieldset class="col-md-4">
      <legend>Add new product</legend>
      <div class="form-group">
        <label for="productName">Product name</label>
        <input type="text" v-model="name" class="form-control" id="productName" placeholder="Enter product name">
      </div>
      <div class="form-group">
        <label for="productDescription">Product description</label>
        <textarea v-model="description" class="form-control" id="productDescription" rows="3" placeholder="Enter description"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" v-model="price" class="form-control" id="price"placeholder="Enter Price">
      </div>
      <button type="submit" v-on:click.prevent="addProduct" class="btn btn-primary">Add product</button>
    </form>
  </fieldset>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: '',
      price: ''
    }
  },
  methods: {
    addProduct () {
      this.$dispatch('add-product', {
        name: this.name,
        description: this.description,
        price: this.price
      })
    }
  }
}
</script>

<style lang="css" scoped>
form {
  margin-bottom: 20px;
}
</style>
