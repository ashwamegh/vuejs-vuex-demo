# Remove products

It wouldn't be a complete **CRUD** app without the Delete.
This is an easy one! Just as before we need to pass a function property
to the ProductList component that will be called when we click the remove link.

In the `exercise-files/remove-products` folder, add the following to the `ProductList`
component.

```html
<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
		...
    <tbody>
      <tr v-for="product in products" track-by="id" @click.prevent="onEdit(product)">
				...
        <td><a href="#" @click.prevent.stop="onRemove(product)">remove</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products', 'onEdit', 'onRemove']
}
</script>

```

Notice the `.stop` event modifier. This will stop event propagation by  internally
calling the native method `event.stopPropagation()` so that the click event does
not bubble down to the `<tr>` where we bound the `onEdit()` event handler.

Now we need to implement our `onRemove` event handler in our `ManageProducts` component.

```html
<!-- src/components/ManageProducts.vue -->
<template>
	...
  <product-list
    :on-edit="onEditClicked"
    :on-remove="onRemoveClicked"
    :products="products">
  </product-list>
</template>

<script>
...
export default {
	...
  methods: {
		...
    onRemoveClicked(product) {
      this.products.$remove(product);
    }
  }
}
</script>
```

---

**Key to perfection**

 * Validate your new property with props validation.
 * Handle an empty state.

	 **HINT!** Use the `v-if` directive to check `products.length`
