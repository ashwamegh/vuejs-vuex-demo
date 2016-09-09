<template>
  <div class="row">
    <div class="col-sm-6 col-md-4 col-lg-3" v-for="product in products">
      <div class="card">
        <img class="card-img-top placeholder" v-bind:src="product.imageUrl" alt="Product image">
        <div class="card-block">
          <h4 class="card-title">{{product.name}}</h4>
          <p class="card-text">{{product.description}}</p>
          <span class="price">{{product.price}}:- SEK</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts } from '../vuex/getters'
import { fetchProducts } from '../vuex/actions'

export default {
  compiled () {
    this.fetchProducts()
  },
  vuex: {
    getters: {
      products: getProducts
    },
    actions: {
      fetchProducts
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.placeholder {
  display: block;
  background-color: gray;
  width: 100%;
  color: white;
  text-align: center;
  vertical-align: middle;
  line-height: 200px;
}

.price {
  font-size: 20px;
  font-weight: 700;
}
</style>
