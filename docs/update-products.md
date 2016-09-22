# Update product

We already did most of the heavy lifting in the last section but we do need a way to select a
product in the ProductList component.

```html
<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
    ...
    <tbody>
      <tr v-for="product in products" track-by="id" v-on:click.prevent="onEdit(product)">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:-</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    onEdit(product) {
      this.$emit('edit', product)
    }
  }
}
</script>
```

Since we changed the ProductList to a stateless component we have to bind an `onEditClicked` event handler to the custom `edit` event that will be called when a table row is clicked.

To populate the form we need to implement an edit form handler in the `ManageProducts` component.
```html
<!-- src/components/ManageProducts.vue -->
<template>
  ...
  <product-list
    v-on:edit="onEditClicked"
    :products="products"
  >
  </product-list>
</template>

<script>
...

export default {
  ...
  methods: {
    ...
    onEditClicked(product) {
      this.productInForm.id = product.id;
      this.productInForm.name = product.name;
      this.productInForm.description = product.description;
      this.productInForm.price = product.price;
    }
  }
}
</script>
```

A small caveat here is that you cannot simply assign the product to `this.productInForm`
since Vue.js will not react properly so you have to actually assign each individual property.


All we really need to do now is to modify the `onFormSave()` method to handle updates
as well.

```html
<!-- src/components/ManageProducts.vue -->
<script>
...
import guid from 'guid';

export default {
  ...
  methods: {
    onFormSave() {
      // clone the productInForm object
      const product = { ...this.productInForm };

      const index = this.products.findIndex((p) => p.id === product.id);

      // update product if it exists or create it if it doesn't
      if (index !== -1) {
        this.products.$set(index, product);
      } else {
        // Create an ID using the third-party lib 'guid'
        product.id = guid.raw();
        this.products.push(product);
      }

      this.resetProductInForm();
    },
    ...
  }
}
</script>
```

Note that we are using `this.product.$set(index, product)` to update a list item.
This is another caveat with Vue.js where the DOM won't react properly if it's directly
assigned.

**NOTE!**
This will be addressed in Vue.js 2.0 and then you will be able to assign it as usual i.e. `this.products[index] = product`

That's it! Now you can create and update products!

---

**Key to perfection**
 * Add a cancel button that is only visible when editing a product.

   **HINT!** Use the [`v-if`](https://vuejs.org/guide/conditional.html#v-if) directive to check for a product id and emit a `cancel`
   event to the parent component that resets the form.
 * Change the save button label to say either "Add product" or "Update product".

   **HINT!** You could use the `v-if` directive here as well but since it's just a simple string that
   should be changed a [ternary expression](http://vuejs.org/guide/syntax.html#JavaScript-Expressions) is probably more suitable.
 * Add client-side validation

 **HINT!** Create a `validate()` method that populates some internal `formError` state if there is  an error and call this method from the `onSubmit` handler before emitting a `submit` event. Also use [`$watch`](http://vuejs.org/api/#watch) to watch the `product.id` in one of the [lifecycle methods](https://vuejs.org/guide/instance.html#Instance-Lifecycle)
   and reset the `formErrors` when it changes.
