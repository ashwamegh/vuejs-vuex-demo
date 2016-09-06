<template>
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:- SEK</td>
        <td><a href="#" @click="removeProduct(product)">Remove</a></td>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
