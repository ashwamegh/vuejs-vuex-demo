<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" @click.prevent.stop="editProduct(product)">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:- SEK</td>
        <td><a href="#" @click.prevent.stop="removeProduct(product)">Remove</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    removeProduct (product) {
      this.$dispatch('remove-product', product)
    },
    editProduct (product) {
      this.$dispatch('edit-product', product)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
