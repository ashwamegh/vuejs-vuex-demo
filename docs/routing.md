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
import App from './App'

import VueRouter from 'vue-router'

import ProductCatalog from './components/ProductCatalog'
import ManageProducts from './components/ManageProducts'

// import some global styles
import './styles/style.scss'

Vue.use(VueRouter)

const routes = [
  { path: '/home', alias: '/', component: ProductCatalog },
  { path: '/manage-products', component: ManageProducts }
]

// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

Let's also create an empty ProductCatalog component so we have something to route to.

```html
<!-- src/components/ProductCatalog.vue -->
<template>
  <p>I'm a product catalog!</p>
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
Create a `AppNav` component that will link to our different routes.

```html
<!-- src/components/AppNav.vue -->
<template>
  <nav class="navbar navbar-expand-sm navbar-light navbar-jw">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#appnav"
      aria-controls="appnav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <a class="navbar-brand" href="#">
      <img src="../assets/jay.svg" alt="Jayway logo" /> Jaystore
    </a>

    <div class="collapse navbar-collapse" id="appnav">
      <div class="nav navbar-nav">
        <router-link
          to="home"
          class="nav-item nav-link"
          active-class="active"
          exact
        >
          Home
        </router-link>
        <router-link
          to="manage-products"
          class="nav-item nav-link"
          active-class="active"
          exact
        >
          Manage Products
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>
```

The [`<router-link>`](http://router.vuejs.org/en/api/router-link.html) component is used to link to our different routes. We also specify
an `exact` attribute which means that it will only be considered active if the route
is exactly matched and will not consider a sub-route. The `active-class` attribute
only specifies the class name that should be applied to the element when the route
is active.

Add the `AppNav` to our App component.

```html
<!-- src/App.vue -->
<template>
  <div>
    <header class="app-header">
      <app-nav></app-nav>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppNav from './components/AppNav'

export default {
  components: {
    AppNav
  }
}
</script>
```

That's all there is to it! Fire up your browser and try it out.

![Routing image](/docs/images/routing.png)
