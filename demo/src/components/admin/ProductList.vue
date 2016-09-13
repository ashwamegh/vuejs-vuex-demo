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
      <tr class="product-row" v-if="products" v-for="product in products" track-by="id" @click.prevent.stop="editProduct(product)">
        <td class="product-image-col">
          <img v-if="product.imageUrl" v-bind:src="product.imageUrl" alt="Product image" class="product-image">
          <img v-else src="../../assets/product_placeholder.svg" alt="Product image" class="product-image">
        </td>
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
<style lang="scss" scoped>
.product-row {
  cursor: pointer;
}

.product-image {
  background-color: #fff;
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
}

.product-name-col {
  min-width: 200px;
}

.product-price-col {
  width: 110px;
}

.product-delete-col {
  width: 80px;
  text-align: right;
}

</style>
