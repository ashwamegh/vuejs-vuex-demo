# Communicating with an API

Now that we have refactored our data flow to a unidirectional flow and have all our state nicely defined in our store it's time to actually persist our data.

You can find an example implementation of an API in the `/api` folder with the following endpoints.

| HTTP method | URI path      | Description           |
|-------------|---------------|-----------------------|
| POST        | /products     | Create a new product  |
| GET         | /products     | Retrieve all products |
| PUT         | /products/:id | Update a product      |
| DELETE      | /products/:id | Delete a product      |


First of we should start the api application. From the `/api` folder.

```bash
npm start
```

**NOTE!** If you want to reset the products at any time just restart the API server.

You can make sure it works with a curl request.
```bash
curl -i http://localhost:3000/products
```

Now that we have our API up and running it's time to connect our Vue app to it.

We will be using [vue-resource](https://github.com/vuejs/vue-resource) to make our API requests. Inside the `/exercise-files/async-api/` folder install vue-resource.
```
npm install --save vue-resource
```

**NOTE!**
You don't have to use vue-resource as it's only an abstraction over XMLHttpRequest so you can use whichever request library you want like jQuery, axios, whatwg-fetch, etc...

Add vue-resource as middleware to Vue.
```javascript
// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
...
Vue.use(VueRouter)
Vue.use(VueResource)

// set the API root so we can use relative url's in our actions.
Vue.http.options.root = 'http://localhost:3000'
...
```

We are going to start by fetching products. Implement a fetch products action.
```javascript
// src/vuex/modules/products/actions.js

// import the http module that has been added by vue-resource
import Vue from 'vue'

import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types'

export function fetchProducts ({ commit }) {
  return Vue.http.get('products/')
    .then((response) => commit(FETCH_PRODUCTS, response.body.data))
}

...
```
Because we set the API root before we can use relative urls here. This is just a convenience but it's very useful when running our app against different api's e.g. when running in development or production.

When the promise resolves we commit an event to the store with the response data.


Add a mutation type.
```javascript
// src/vuex/modules/products/mutation-types.js
export const FETCH_PRODUCTS = 'products/FETCH_PRODUCTS'
...
```

Create the mutation function. Also change `initialState` to contain an empty array of products as we will get our products from the API.

```javascript
import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../mutation-types'

// initial state
const initialState = {
  all: []
}

// mutations
const mutations = {
  [FETCH_PRODUCTS] (state, products) {
    // assign the products that we got from our FETCH_PRODUCTS event to state.all
    state.all = products
  },
  ...
}
...
```

Dispatch the `fetchProducts` action from the app within the created lifecycle method that is called directly after the app instance has been created. We would like to fetch our products as soon as possible so that our site feels fast and responsive.

```html
<!-- src/App.vue -->
<template>
  ...
</template>

<script>
export default {
  components: {
    AppNav
  },

  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>
```

Test it out! `npm run dev` from the console and go to [http://localhost:8080](http://localhost:8080).

Implement the remaining actions.
```javascript
// src/vuex/modules/products/actions.js
...

export function createProduct ({ commit }, product) {
  return Vue.http.post('products', product)
    .then((response) => commit(CREATE_PRODUCT, response.body.data))
}

export function updateProduct ({ commit }, product) {
  return Vue.http.put(`products/${product.id}`, product)
    .then((response) => commit(UPDATE_PRODUCT, response.body.data))
}

export function deleteProduct ({ commit }, productId) {
  return Vue.http.delete(`products/${productId}`)
    .then((response) => commit(DELETE_PRODUCT, productId))
}

export function saveProduct ({ commit, state }, product) {
  const index = state.all.findIndex((p) => p.id === product.id)

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    return updateProduct({ commit }, product)
  } else {
    return createProduct({ commit }, product)
  }
}
```

Nothing special is going on here. We extracted the `updateProduct()` and `createProduct()` to their own functions and then called them from within `saveProduct()` function. We also make sure to return the promise to the calling function so that we can attach additional functionality when the promise has resolved, e.g. resetting our form.

Refactor the `ManageProducts` component to wait for the promises to resolve.

```html
<!-- src/components/ManageProducts.vue -->
<script>
...

export default {
  ...
  methods: {
    ...
    onFormSave (product) {
      this.saveProduct(product).then(() => this.resetProductInForm())
    },
    ...
    onRemoveClicked (productId) {
      this.deleteProduct(productId).then(() => {
        if (productId === this.productInForm.id) {
          this.resetProductInForm()
        }
      })
    }
  }
}
</script>
```

You should now have a fully working application that is connected to an API.


---

**Key to perfection**

 * Handle communication failures.

   **HINT!** The [Flux standard actions](https://github.com/acdlite/flux-standard-action) specification can be used as inspiration on how to pass errors down to the store.
