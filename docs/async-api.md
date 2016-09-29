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
npm run start
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
import VueResource from 'vue-resource';
...
Vue.use(VueRouter)
Vue.use(VueResource)

// set the API root so we can use relative url's in our actions.
Vue.http.options.root = 'http://localhost:3000';
...
```

We are going to start by fetching products. Implement a fetch products action.
```javascript
import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types';

// import the http module that has been added by vue-resource
import { http } from 'vue'

export function fetchProducts ({ dispatch }) {
  return http.get('products/')
    .then((response) => dispatch(FETCH_PRODUCTS, response.body.data))
}

...
```
Because we set the API root before we can use relative urls here. This is just a convenience but it's very useful when running our app against different api's e.g. when running in development or production.

When the promise resolves we dispatch an event to the store with the response data.


Add a mutation type.
```javascript
// src/vuex/mutation-types.js
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
...
```

Create the mutation function. Also change `initialState` to contain an empty array of products as we will get our products from the API.

```javascript
import guid from 'guid';

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

Use the `fetchProducts()` action from the app within the created lifecycle method that is called directly after the app instance has been created. We would like to fetch our products as soon as possible so that our site feels fast and responsive.

```html
<!-- src/App.vue -->
<script>
import AppNav from './components/AppNav';
import store from './vuex/store';
import { fetchProducts } from './vuex/actions';

export default {
  store,
  components: {
    AppNav
  },
  vuex: {
    actions: {
      fetchProducts
    }
  },
  created () {
    this.fetchProducts();
  }
}
</script>
```

Test it out! `npm run dev` from the console and go to [http://localhost:8080](http://localhost:8080).

Implement the remaining actions.
```javascript
...

export function createProduct({ dispatch }, product) {
  return http.post('products', product)
    .then((response) => dispatch(CREATE_PRODUCT, response.body.data))
}

export function updateProduct ({ dispatch }, product) {
  return http.put(`products/${product.id}`, product)
    .then((response) => dispatch(UPDATE_PRODUCT, response.body.data))
}

export function deleteProduct ({ state, dispatch }, product) {
  return http.delete(`products/${product.id}`)
    .then((response) => dispatch(DELETE_PRODUCT, product))
}

export function saveProduct({ state, dispatch }, product) {
  const index = state.products.all.findIndex((p) => p.id === product.id);

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    return updateProduct({ dispatch }, product)
  } else {
    return createProduct({ dispatch }, product)
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
    onFormSave() {
      // clone the productInForm object
      const product = { ...this.productInForm };

      this.saveProduct(product).then(() => this.resetProductInForm());
    },
		...
    onRemoveClicked(product) {
      this.deleteProduct(product).then(() => {
        if (product.id === this.productInForm.id) {
          this.resetProductInForm();
        }
      });
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
