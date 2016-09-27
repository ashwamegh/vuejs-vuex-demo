# Refactoring to a unidirectional flow

When we implemented the routing we also created a `ProductCatalog` module that will display all of our products and you may have wondered how we are supposed to get our product data into that component as it now lives in the `ManageProducts` component. Our initial thought might be to let the `App` component handle the data instead but this is quite fragile. First of  we would manage data in a component that does not care about the data and if we where to build additional components in between, for example the `App` and the `ManageProducts` component, then they would need to pass through our data as well. This makes it very hard to change the layout and composition of a component. It is also very hard to reason about state since now there are several different parts of our application that can mutate our state.

![Poor component communication](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-01.svg)
_Image by [Brad Westfall](https://css-tricks.com/learning-react-redux/)_

The unidirectional flow design helps us with these issues and fortunately there is a nice library to help us out called [vuex](https://github.com/vuejs/vuex). For a complete introduction to vuex I recommend you read the [docs](https://github.com/vuejs/vuex/tree/1.0/docs/en) but essentially it helps us create something like this.

![Unidirectional flow](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-02.svg)
_Image by [Brad Westfall](https://css-tricks.com/learning-react-redux/)_

The state from the components is extracted and put in a single place (_the store_) which is then passed through to all the components in a _unidirectional flow_. Instead of modifying the store from within the components you only _dispatch_ so called _actions_ which is then handled in the store by action handlers (called _mutators_ in vuex). This makes it much easier to reason about state and how it changes.

Now that you know some of the benefits of a unidirectional flow let's begin.

```bash
npm install --save vuex
```

Create the store in `src/vuex/store.js`

```javascript
// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    products
  },
  strict: debug,
})
```

We import `Vuex` and add it as a middleware to `Vue`. We then create and export a vuex store with the `products` module that we haven't created yet and with a strict flag that will be false in production. The `strict` flag adds some validation and warns us if we try to modify vuex state outside of our mutators which can be very handy when developing but this validation limits performance so that is why we don't want it active in production.


Create products module `src/vuex/modules/products.js`.

```javascript
// src/vuex/modules/products.js

// initial state
const initialState = {
  all: [
    {
      id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
      name: 'COBOL 101 vintage',
      description: 'Learn COBOL with this vintage programming book',
      price: 399,
    },
    {
      id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
      name: 'Sharp C2719 curved TV',
      description: 'Watch TV like never before with the brand new curved screen technology',
      price: 1995,
    },
    {
      id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
      name: 'Remmington X mechanical keyboard',
      description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
        'features tactile, clicky switches for speed and accuracy',
      price: 595,
    }
  ]
}

// mutations
const mutations = {
}

export default {
  state: Object.assign({}, initialState),
  mutations
}
```

Nothing special going on here. All we do is export an object with our state and our mutations (which we will implement later on). The reason why I use `Object.assign()` to make a copy of our initialState is only to give me the possibility to reset our initialState at a later time should I want to.

We use getter functions to return the state to our components. This is a convention in vuex and you don't have to do this but
it does have it's advantages as it is an abstraction over the access of state and if we would like to change the structure of our state then we would only need to update our getters and not every component that uses it.

Create the getters file in `src/vuex/getters.js` that will return our products.

```javascript
// src/vuex/getters.js
export const getProducts = state => state.products.all
```

Import to our top level component. In this case the `App`.
```html
<!-- src/App.vue -->
...
<script>
import AppNav from './components/AppNav';
import store from './vuex/store';

export default {
  store,
  components: {
    AppNav
  }
}
</script>
```

Use our getter in the `ProductCatalog`.
```html
<!-- src/components/ProductCatalog.vue -->
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
```

This is how we retrieve data from our store. First of import the desired getter function and then map it to the component in the `vuex.getters` object. The products will now be available in the component under `this.products` just as if it was defined
in the components data function.

You should be able to test it out now and see a list of products in our `ProductCatalog`.

We still need to refactor our `ManageProducts` component to use the data from the store and to dispatch actions instead of handling everything. We will keep some state in the `ManageProducts` component. More specifically the `productInForm` data.
You can move this data to the store as well but then you would have to refactor the `SaveProductForm` to not use two-way binding to update our `productInForm` since modifying the stores state outside of mutators isn't allowed. This is really up to you but my point of view is that state that is isolated to a certain part of the application or component doesn't always have to be connected to the store.

```html
<!-- src/components/ManageProducts.vue -->
<template>
  <save-product-form
    :product="productInForm"
    v-on:submit="onFormSave"
    v-on:cancel="resetProductInForm"
  ></save-product-form>
  <product-list
    :products="products"
    v-on:edit="onEditClicked"
    v-on:remove="onRemoveClicked"
  ></product-list>
</template>

<script>
import { getProducts } from '../vuex/getters';
import { saveProduct, deleteProduct } from '../vuex/actions';
...

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
  ...
  vuex: {
    actions: {
      saveProduct,
      deleteProduct
    },
    getters: {
      products: getProducts
    }
  },
  methods: {
    onFormSave() {
      // clone the productInForm object
      const product = { ...this.productInForm };

      this.saveProduct(product);

      this.resetProductInForm();
    },
    ...
    onRemoveClicked(product) {
      this.deleteProduct(product);

      if (product.id === this.productInForm.id) {
        this.resetProductInForm();
      }
    }
  }
}
</script>
```

As before we used our getter function to retrieve our products. We also imported some actions that we used in the `onFormSave()` and `onRemoveClicked()` methods. Let's implement these actions now in `src/vuex/actions.js`.

```javascript
// src/vuex/actions.js
import guid from 'guid';

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types';

export function saveProduct({ state, dispatch }, product) {
  const index = state.products.all.findIndex((p) => p.id === product.id);

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    dispatch(UPDATE_PRODUCT, product)
  } else {
    product.id = guid.raw();
    dispatch(CREATE_PRODUCT, product)
  }
}

export function deleteProduct ({ state, dispatch }, product) {
  dispatch(DELETE_PRODUCT, product)
}
```

So an action is just a function that takes an options object as its first argument with the `state` and `dispatch` function.
We then dispatch an event to the store that is then handled by a mutation function. The event and mutation function is associated by a mutation type which is just a string constant.

Let's define our mutation types. In `src/vuex/mutation-types.js`.
```javascript
// src/vuex/mutation-types.js
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
```

Implement the mutations. In `src/vuex/modules/products.js`.
```javascript
// src/vuex/modules/products.js
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../mutation-types'

// initial state
const initialState = {
  all: [...]
}

// mutations
const mutations = {
  [CREATE_PRODUCT] (state, product) {
    state.all.push(product);
  },

  [UPDATE_PRODUCT] (state, product) {
    const index = state.all.findIndex((p) => p.id === product.id);
    state.all.$set(index, product);
  },

  [DELETE_PRODUCT] (state, product) {
    state.all.$remove(product);
  }
}

...
```

We are done! Run your application if you haven't already with `npm run dev`, fire up your browser and surf to `http://localhost:8080` and everything should look exactly the same as before with the exception of the `ProductCatalog`. Woohoo!

This may seem like a lot of work and it surely is. In small applications it's probably not worth the hassle but as your application grows, when you find yourself passing data and functions as properties through components that doesn't care about it and when you no longer feel in control of what state your application is in then it's time to really think about using a unidirectional flow as you will most certainly benefit from it in the end.

**TIP!**
If you use the Google Chrome browser then you can install the [Vue devtools](https://github.com/vuejs/vue-devtools) extension to see your component structure. It also integrates nicely with vuex and let's you undo/redo actions (time traveling) which is very handy when debugging state changes.
