<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
     
      <tr v-for="product in products" v-bind:key="product.name" v-on:click.prevent="onEdit(product)">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:-</td>
        <td><a href="#" v-on:click.prevent.stop="onRemove(product.id)">remove</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    onEdit(product){
      this.$emit('edit', product)
    },
    onRemove (productId) {
      this.$emit('remove', productId)
    }
  }
}
</script>

<style lang="scss">
  table{
    text-align: left;
  }
</style>

