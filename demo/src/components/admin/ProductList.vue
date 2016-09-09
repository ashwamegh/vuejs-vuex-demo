<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id" @click.prevent.stop="editProduct(product)">
        <td><img v-bind:src="product.imageUrl" alt="" /></td>
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:- SEK</td>
        <td><a href="#" @click.prevent.stop="removeProduct(product)">Remove</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getProducts } from '../../vuex/getters'
import { removeProduct, setProductInForm, fetchProducts } from '../../vuex/actions'

export default {
  compiled () {
    this.fetchProducts()
  },
  vuex: {
    getters: {
      products: getProducts
    },
    actions: {
      removeProduct,
      fetchProducts,
      editProduct: setProductInForm
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
