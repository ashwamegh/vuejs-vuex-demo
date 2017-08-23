# Refactoring to a unidirectional flow

When we implemented the routing we also created a `ProductCatalog` module that will display all of our products and you may have wondered how we are supposed to get our product data into that component as it now lives in the `ManageProducts` component. Our initial thought might be to let the `App` component handle the data instead but this is quite fragile. First of  we would manage data in a component that does not care about the data and if we were to build additional components in between, for example the `App` and the `ManageProducts` component, then they would need to pass through our data as well. This makes it very hard to change the layout and composition of a component. It is also very hard to reason about state since now there are several different parts of our application that can mutate our state.

![Poor component communication](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-01.svg)
_Image by [Brad Westfall](https://css-tricks.com/learning-react-redux/)_

The unidirectional flow design helps us with these issues and fortunately there is a nice library to help us out called [vuex](https://github.com/vuejs/vuex). For a complete introduction to vuex I recommend you read the [docs](http://vuex.vuejs.org/en/index.html) but essentially it helps us create something like this.

![Unidirectional flow](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-02.svg)
_Image by [Brad Westfall](https://css-tricks.com/learning-react-redux/)_

The state from the components is extracted and put in a single place (_the store_) which is then passed through to all the components in a _unidirectional flow_. Instead of modifying the store from within the components you only _commit_ so called _mutations_ which are then handled in the store by _mutators_. This makes it much easier to reason about state and how it changes.

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


Create products module `src/vuex/modules/products/index.js`.

```javascript
// src/vuex/modules/products/index.js
import * as getters from './getters'

// initial state
const initialState = {
  all: [
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

// mutations
const mutations = {
}

export default {
  state: { ...initialState },
  getters,
  mutations
}
```

Nothing special going on here. All we do is export an object with our state and our mutations (which we will implement later on). The reason why I use the object spread operator `{ ...object }`  to make a copy of our initialState is only to give me the possibility to reset our initialState at a later time should I want to.

We use getter functions to return the state to our components. This is a convention in vuex and you don't have to do this but
it does have its advantages as it is an abstraction over the access of state and if we would like to change the structure of our state then we would only need to update our getters and not every component that uses it.

Create the getters file in `src/vuex/modules/products/getters.js` that will return our products.

```javascript
// src/vuex/modules/products/getters.js
export const getProducts = state => state.all
```

Add the store to Vue in `src/main.js`.
```js
// src/main.js
...
import store from './vuex/store'

...

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
```

Map our `getProducts()` getter as a computed property in the `ProductCatalog`.
```html
<!-- src/components/ProductCatalog.vue -->
<template>
  <section>
    <ul v-for="product in products" track-by="id">
      <li>{{product.name}}</li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    products: 'getProducts'
  })
}
</script>
```

This is how we retrieve data from our store. First off import the `mapGetters()` function and then map your desired getters as computed properties to the component. The products will now be available in the component under `this.products` just as if it were defined in the component's data function.

You should be able to test it out now and see a list of products in our `ProductCatalog`.

We still need to refactor our `ManageProducts` component to use the data from the store and to commit our changes instead of handling everything. We will keep some state in the `ManageProducts` component. More specifically the `productInForm` data.
You can move this data to the store as well but then you would have to refactor the `SaveProductForm` to not use two-way binding to update our `productInForm` since modifying the store's state outside of mutators isn't allowed. This is really up to you but my point of view is that state that is isolated to a certain part of the application or component doesn't always have to be connected to the store.

```html
<!-- src/components/ManageProducts.vue -->
<template>
...
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  computed: mapGetters({
    products: 'getProducts'
  }),
  methods: {
    ...mapActions([
      'saveProduct',
      'deleteProduct'
    ]),
    onFormSave (product) {
      this.saveProduct(product)

      this.resetProductInForm()
    },
    ...
    onRemoveClicked (productId) {
      this.deleteProduct(productId)

      if (productId === this.productInForm.id) {
        this.resetProductInForm()
      }
    }
  }
}
</script>
```

As before we mapped our getter function to retrieve our products. We also mapped some actions that we used in the `onFormSave()` and `onRemoveClicked()` methods. Let's implement these actions now in `src/vuex/modules/products/actions.js`.

```javascript
// src/vuex/modules/products/actions.js
import uuid from 'uuid'

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types'

export function saveProduct ({ commit, state }, product) {
  const index = state.all.findIndex((p) => p.id === product.id)

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    commit(UPDATE_PRODUCT, product)
  } else {
    product.id = uuid.v4()
    commit(CREATE_PRODUCT, product)
  }
}

export function deleteProduct ({ commit }, productId) {
  commit(DELETE_PRODUCT, productId)
}
```

So an action is just a function that takes an options object as its first argument with the `state` and `commit` function.
We then commit an event to the store that is then handled by a mutation function. The event and mutation function is associated by a mutation type which is just a string constant.

Let's define our mutation types. In `src/vuex/modules/products/mutation-types.js`.
```javascript
// src/vuex/modules/products/mutation-types.js
export const CREATE_PRODUCT = 'products/CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
```

Implement the mutations. In `src/vuex/modules/products/index.js`.
```javascript
// src/vuex/modules/products/index.js
import * as actions from './actions'
import * as getters from './getters'

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
    state.all.push(product)
  },

  [UPDATE_PRODUCT] (state, product) {
    const index = state.all.findIndex((p) => p.id === product.id)

    if (index !== -1) {
      // We need to replace the array entirely so that vue can recognize
      // the change and re-render entirely.
      // See http://vuejs.org/guide/list.html#Caveats
      state.all.splice(index, 1, product)
    }
  },

  [DELETE_PRODUCT] (state, productId) {
    state.all = state.all.filter(p => p.id !== productId)
  }
}

export default {
  state: { ...initialState },
  // OBS! Don't forget to export your actions from the products module as well.
  actions,
  getters,
  mutations
}
```

We are done! Run your application if you haven't already with `npm run dev`, fire up your browser and surf to [http://localhost:8080](http://localhost:8080) and everything should look exactly the same as before with the exception of the `ProductCatalog`. Woohoo!

This may seem like a lot of work and it surely is. In small applications it's probably not worth the hassle but as your application grows, when you find yourself passing data and functions as properties through components that doesn't care about it and when you no longer feel in control of what state your application is in then it's time to really think about using a unidirectional flow as you will most certainly benefit from it in the end.

**TIP!**
If you use the Google Chrome browser then you can install the [Vue devtools](https://github.com/vuejs/vue-devtools) extension to see your component structure. It also integrates nicely with vuex and let's you undo/redo actions (time traveling) which is very handy when debugging state changes.
