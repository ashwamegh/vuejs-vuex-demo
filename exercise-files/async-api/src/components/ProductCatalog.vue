<template>
  <ul v-for="product in products" track-by="id">
    <li>{{product.name}}</li>
  </ul>
</template>

<script>
import { getProducts } from '../vuex/getters';

export default {

  vuex: {
    getters: {
      products: getProducts
    }
  }
}
</script>
