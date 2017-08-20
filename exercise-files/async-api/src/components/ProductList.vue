<template>
  <table class="table table-hover product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id" v-on:click.prevent="onEdit(product)">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:-</td>
        <td><a href="#" v-on:click.prevent.stop="onRemove(product.id)">remove</a></td>
      </tr>
      <tr v-if="!products.length">
        <td colspan="4" class="p-y-3 text-xs-center">
          <strong>You should add some products!</strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    onEdit (product) {
      this.$emit('edit', product)
    },
    onRemove (productId) {
      this.$emit('remove', productId)
    }
  }
}
</script>
