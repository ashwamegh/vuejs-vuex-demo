# Routing

Most applications require routing at some point. As Vue.js is a modular framework
so routing is not included by default and so we need to install it first.

In the `/exercise-files/routing/` folder.

```bash
npm install --save vue-router
```

Adding the router to the Vue instance is straight forward.

```javascript
// src/main.js

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import ManageProducts from './components/ManageProducts'
import ProductCatalog from './components/ProductCatalog'

import './styles/style.scss'

// Add the router to Vue using Vue.use()
Vue.use(VueRouter)

// Create a new router instance
const router = new VueRouter()

// Map routes to components
router.map({
  '/home': {
    component: ProductCatalog
  },
  '/manage-products': {
    component: ManageProducts
  }
})

// alias the home route so it is also matches `/` (index route)
router.alias({
  '/': '/home'
})

// start the router
router.start(App, 'app')

```

Let's also create an empty ProductCatalog component so we have something to route to.

```html
<!-- src/components/ProductCatalog.vue -->
<template>
  I'm a product catalog!
</template>

<script>
export default {}
</script>
```

Great! But we still need some sort of outlet that our route matched components
will render into right? In `src/App.vue` all we need to add is a `<router-view>`.

```html
<!-- src/App.vue -->
<template>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
export default {}
</script>
```

No routing solution is complete without some links.
Create a `Navbar` component that will link to our different routes.

```html
<!-- src/components/AppNav.vue -->
<template>
  <nav class="navbar navbar-full navbar-light navbar-jw">
    <a class="navbar-brand" href="#">
      <img src="../assets/jay.svg" alt="Jayway logo" /> Jaystore
    </a>
    <div class="nav navbar-nav">
      <a
        href="#"
        class="nav-item nav-link"
        v-link="{ path: '/home', exact: true, activeClass: 'active' }"
      >Home</a>
      <a
        href="#"
        class="nav-item nav-link"
        v-link="{ path: '/manage-products', exact: true, activeClass: 'active' }"
      >Manage Products</a>
    </div>
  </nav>
</template>

<script>
export default {}
</script>
```

The [`v-link`](https://github.com/vuejs/vue-router/blob/1.0/docs/en/link.md#v-link) directive is used to link to our different routes. We also specify
an `exact` option which means that it will only be considered active if the route
is exactly matched and will not consider a subroute. The `activeClass` option
only specifies the className that should be applied to the element when the route
is active.

Add the `Navbar` to our App component.

```html
<!-- src/App.vue -->
<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
import AppNav from './components/AppNav';

export default {
  components: {
    AppNav
  }
}
</script>
```

That's all there is to it! Fire up your browser and try it out.

![Routing image](/docs/images/routing.png)
