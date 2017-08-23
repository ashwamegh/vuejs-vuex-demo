# Add products

Let's create some products. Since we are going to use the same form for saving and updating products lets name it `SaveProductForm`.

From the command-line in the `exercise-files/create-products/` folder

```bash
touch src/components/SaveProductForm.vue
```

Then start off with the template
```html
<!-- src/components/SaveProductForm.vue  -->
<template>
  <form>
    <div class="form-group">
      <label for="productName">Product name</label>
      <input type="text" v-model="product.name" class="form-control" id="productName" maxlength="32" placeholder="Enter product name">
    </div>
    <div class="form-group">
      <label for="productDescription">Product description <small class="text-muted">(optional)</small></label>
      <textarea class="form-control" v-model="product.description" id="productDescription" rows="3" maxlength="128" placeholder="Enter description"></textarea>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input type="number" v-model="product.price" class="form-control" id="price" placeholder="Enter Price" number>
    </div>
    <button type="submit" v-on:click.prevent="onSubmit" class="btn btn-primary">Save product</button>
  </form>
</template>
```

It's just a very basic form with three text inputs and a save button. We are using two-way data binding between our product object and our text inputs so that our object is updated automatically as we type. This is accomplished via the [`v-model`](https://vuejs.org/guide/forms.html) directive.

On the actual save button we are using the [`v-on`](https://vuejs.org/guide/events.html) directive to bind the `onSubmit()` method to a click event. We're also using the [event modifier](http://vuejs.org/guide/events.html#Event-Modifiers) `.prevent` so we don't have to call `event.preventDefault()` from the `onSubmit()` handler to prevent default browser behavior when the button is clicked.

Before moving on we need to discuss how these two components will communicate with each other. Some possibilities are:

1. Let `SaveProductForm` handle the form state, then use a global event bus with a publish/subscribe model to let the ProductList know when a product has been created.
2. Move the `SaveProductForm` component into the `ProductList` component and let the product list handle the state.
3. Let the parent component handle the state and pass it as props.
4. Implement a unidirectional flow and move state out of the components.

I'm sure there are more ways but for now we are going with option 3 and later on we are going to have a look at option 4.

The actual component is not very complicated.

```html
<!-- src/components/SaveProductForm.vue  -->
<template>
  ...
</template>

<script>
export default {
  props: ['product'],
  methods: {
    onSubmit () {
      this.$emit('submit', this.product)
    }
  }
}
</script>
```

To be able to pass a property to a component we need to specify what properties that should be allowed otherwise it would just be ignored.
We are also defining an `onSubmit()` method that will be called when the save button is clicked. Since we are not actually going to handle the actual creation/update of a product in this component we are just going to emit a [custom event](http://vuejs.org/guide/components.html#Custom-Events) that parent components can listen to using the `this.$emit()` function.

**NOTE!**
If you really wan't to make sure that everything is correct Vue.js has something
called [props validation](http://vuejs.org/guide/components.html#Prop-Validation)
that let's you validate the properties type. If you have used React I'm sure you know how this works.

Import and add our new component into the `ManageProducts` component.
```html
<!-- src/components/ManageProducts.vue -->
<template>
  <section>
    <save-product-form
      :product="productInForm"
      v-on:submit="onFormSave"
    ></save-product-form>
    <product-list></product-list>
  </section>
</template>
<script>

import ProductList from './ProductList'
import SaveProductForm from './SaveProductForm'

const initialData = () => {
  return {
    productInForm: {
      id: null,
      name: '',
      description: '',
      price: null
    }
  }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  data: initialData,
  methods: {
    onFormSave (productData) {
      // eslint-disable-next-line no-console
      console.log('productData', JSON.stringify(productData))
    }
  }
}
</script>
```
We introduced a couple of new concepts here. Note the addition of new attributes in the `<save-product-form>` elements. This is how you pass [props](http://vuejs.org/guide/components.html#Props) down to a component. Under the methods object we created a method `onFormSave()` that we bound to the custom `submit` event that is triggered by our `SaveProductForm` component.

By now you should be able to test this out but we are not actually doing anything with the data, except logging it to the console. Before we can actually push our new product to the product list
we need to refactor the ProductList component to a so called stateless component
which will also receive it's data via props.

In `src/components/ProductList`:

```html
<!-- src/components/ProductList.vue  -->
<template>
  ...
</template>

<script>
export default {
  props: ['products']
}
</script>
```

Move the product data to the ManageProducts component and send it down as props
to the ProductList.

```html
<!-- src/components/ManageProducts.vue  -->
<template>
  <section>
    ...
    <product-list
      :products="products">
    </product-list>
  </section>
</template>

<script>
import ProductList from './ProductList'
import SaveProductForm from './SaveProductForm'

const initialData = () => {
  return {
    productInForm: {
      ...
    },
    products: [
      {
        id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
        name: 'COBOL 101 vintage',
        description: 'Learn COBOL with this vintage programming book',
        price: 399
      },
      {
        id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
        name: 'Sharp C2719 curved TV',
        description: 'Watch TV like never before with the brand new curved screen technology',
        price: 1995
      },
      {
        id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
        name: 'Remmington X mechanical keyboard',
        description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
         'features tactile, clicky switches for speed and accuracy',
        price: 595
      }
    ]
  }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  ...
}
</script>
```

Now that we have access to the product list all we need to do is push our new product object into it.

```html
<!-- src/components/ManageProducts.vue  -->
<script>
import uuid from 'uuid'
...
export default {
  ...
  methods: {
    onFormSave (product) {
      // Generate an id using the third-party lib 'uuid'
      product.id = uuid.v4()
      // add it to the product list
      this.products.push(product)
      // reset the form
      this.resetProductInForm()
    },
    resetProductInForm () {
      this.productInForm = initialData().productInForm
    }
  }
}
</script>
```

There you have it. Fire up your browser and test it out!

![Create product image](/docs/images/create-product.png)

Next up we are going to modify our `SaveProductForm` component so that we can update existing products.

---

**Key to perfection**

 * Use [props validation](http://vuejs.org/guide/components.html#Prop-Validation) to validate your component properties.
