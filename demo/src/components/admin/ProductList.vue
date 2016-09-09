<template>
  <table class="table table-hover product-table">
    <thead>
      <tr>
        <th class="product-image-col"></th>
        <th class="product-name-col">Name</th>
        <th class="product-desc-col hidden-sm-down">Description</th>
        <th class="product-price-col">Price</th>
        <th class="product-delete-col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id" @click.prevent.stop="editProduct(product)">
        <td class="product-image-col"><img class="product-image" v-bind:src="product.imageUrl" alt="" /></td>
        <td class="product-name-col">{{product.name}}</td>
        <td class="product-desc-col hidden-sm-down">{{product.description}}</td>
        <td class="product-price-col">{{product.price}}:- SEK</td>
        <td class="product-delete-col"><a href="#" @click.prevent.stop="removeProduct(product)">Remove</a></td>
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
.product-image {
  height: 48px;
}

.product-table {
  table-layout: fixed;
}

.product-table th,
.product-table td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}

.product-image-col {
  text-align: center;
  width: 72px;
  max-width: 72px;
}

.product-name-col {
  width: 20ch;
  min-width: 20ch;
}

.product-desc-col {
  width: 100%;
}

.product-price-col {
  width: 10ch;
  max-width: 10ch;
}

.product-delete-col {
  width: 8ch;
  max-width: 8ch;
  text-align: right;
}

</style>
