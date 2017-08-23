# Remove products

It wouldn't be a complete **CRUD** app without the Delete.
This is an easy one! Just as before we need to emit an event
to the ProductList component that will be called when we click the remove link.

In the `exercise-files/remove-products` folder, add the following to the `ProductList`
component.

```html
<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
    ...
    <tbody>
      <tr v-for="product in products" track-by="id" v-on:click.prevent="onEdit">
        ...
        <td><a href="#" v-on:click.prevent.stop="onRemove(product.id)">remove</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    ...
    onRemove (productId) {
      this.$emit('remove', productId)
    }
  }
}
</script>

```

Notice the `.stop` event modifier. This will stop event propagation by internally
calling the native event method `event.stopPropagation()` so that the click event does
not bubble down to the `<tr>` where we bound the `onEdit()` event handler.

Now we need to implement our `onRemove` event handler in our `ManageProducts` component.

```html
<!-- src/components/ManageProducts.vue -->
<template>
  <section>
    ...
    <product-list
      :products="products"
      v-on:edit="onEditClicked"
      v-on:remove="onRemoveClicked"
    ></product-list>
  </section>
</template>

<script>
...
export default {
  ...
  methods: {
    ...
    onRemoveClicked (productId) {
      const index = this.products.findIndex((p) => p.id === productId)

      this.products.splice(index, 1)

      if (productId === this.productInForm.id) {
        this.resetProductInForm()
      }
    }
  }
}
</script>
```

Easy right? Try it out! `npm run dev` from project root then go to [http://localhost:8080](http://localhost:8080).

![Remove product image](/docs/images/remove-product.png)

---

**Key to perfection**

 * Only reset the form if the product to be removed is currently in it.
 * Handle an empty state.

   **HINT!** Use the `v-if` directive to check `products.length`
