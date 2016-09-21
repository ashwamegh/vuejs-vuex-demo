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
  props: ['products', 'onEdit']
}
</script>
```

Since we changed the ProductList to a stateless component we are going to send in an
`onEdit` function property that will be called when a table row is clicked.

To populate the form we need to implement an edit form handler.
```html
<!-- src/components/ManageProducts.vue -->
<template>
  ...
  <product-list
    :on-edit="onEditClicked"
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

There are still things you can improve on but I leave that as an exercise for you.

 * Add a cancel button that is only visible when editing a product.

   **HINT!** Use the [`v-if`](https://vuejs.org/guide/conditional.html#v-if) directive to check for a product id and pass a `onCancel()`
   function property down to the form component.
 * Validate the input.

   **HINT** use `$watch` in one of the [lifecycle methods](https://vuejs.org/guide/instance.html#Instance-Lifecycle) or add [computed properties](https://vuejs.org/guide/computed.html)
   that contains an error if the input is invalid. Disable the save button if errors exist.
