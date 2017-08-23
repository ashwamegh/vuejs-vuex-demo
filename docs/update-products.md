# Update products

We already did most of the heavy lifting in the last section but we do need a way to select a
product in the ProductList component.

From the `/exercise-files/update-products` folder update the `ProductList` component.

```html
<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
    ...
    <tbody>
      <tr v-for="product in products" track-by="id" v-on:click.prevent="onEdit(product)">
        ...
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
    }
  }
}
</script>
```

Since we changed the `ProductList` to a stateless component we have to bind an `onEditClicked` event handler to the custom `edit` event that our `ProductList` emits when a table row is clicked.

In the `ManageProducts` component, implement the `onEditClicked()` handler that populates the form with the clicked products data.
```html
<!-- src/components/ManageProducts.vue -->
<template>
  <section>
    ...
    <!-- bind the onEditClicked() function to the edit event with the v-on directive -->
    <product-list
      :products="products"
      v-on:edit="onEditClicked"
    ></product-list>
  </section>
</template>

<script>
...

export default {
  ...
  methods: {
    ...
    onEditClicked (product) {
      // since objects are passed by reference we need to clone the product
      // either by using Object.assign({}, product) or by using object
      // spread like we do here.
      this.productInForm = { ...product }
    }
  }
}
</script>
```

All we really need to do now is to modify the `onFormSave()` method to handle updates
as well.

```html
<!-- src/components/ManageProducts.vue -->
<script>
...
import uuid from 'uuid'

export default {
  ...
  methods: {
    onFormSave (product) {
      const index = this.products.findIndex((p) => p.id === product.id)

      // update product if it exists or create it if it doesn't
      if (index !== -1) {
        // We need to replace the array entirely so that vue can recognize
        // the change and re-render entirely.
        // See http://vuejs.org/guide/list.html#Caveats
        this.products.splice(index, 1, product)
      } else {
        product.id = uuid.v4()
        this.products.push(product)
      }

      this.resetProductInForm ()
    },
    ...
  }
}
</script>
```

That's it! Now you can create and update products!

![Update products](/docs/images/update-product.png)

---

**Key to perfection**
 * Add a cancel button that is only visible when editing a product.

   **HINT!** Use the [`v-if`](https://vuejs.org/guide/conditional.html#v-if) directive to check for a product id and emit a `cancel`
   event to the parent component that resets the form.
 * Change the save button label to say either "Add product" or "Update product".

   **HINT!** You could use the `v-if` directive here as well but since it's just a simple string that
   should be changed a [ternary expression](http://vuejs.org/guide/syntax.html#Using-JavaScript-Expressions) is probably more suitable.
 * Add client-side validation

 **HINT!** Create a `validate()` method that populates some internal `formError` state if there is  an error and call this method from the `onSubmit` handler before emitting a `submit` event. Also use [`$watch`](http://vuejs.org/api/#watch) to watch the `product.id` in one of the [lifecycle methods](https://vuejs.org/guide/instance.html#Instance-Lifecycle-Hooks)
   and reset the `formErrors` when it changes.
