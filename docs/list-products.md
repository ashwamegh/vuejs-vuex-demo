# List products
Now that we have our environment set up we can get to the fun stuff. An e-commerce site obviously needs products. And to be able to manage them we first need to see them so let's start there.

You can start off from the`exercise-files/list-products` folder where I have already setup a project boilerplate with vue-cli and the Twitter Bootstrap CSS framework. Remember to run `npm install` from the project root to install all dependencies.

## Create the ProductList component

```bash
touch src/components/ProductList.vue
```

**NOTE!**
You may notice that we are creating a .vue file. You don't have to create components like this if you don't want to but it in Vue.js it's common practice to keep html, javascript and CSS, related to the component in the same file. If you want to know how this works in more detail check out the webpack loader [vue-loader](http://vue-loader.vuejs.org/en/index.html) which makes this possible.

In a `.vue` file you have three top level tags, `<template>` for your html, `<script>` for your javascript and `<style>` for your stylesheets (LESS, SASS, CSS modules, are also supported by adding additional attributes).

```html
<template>
  <h1 class="header">I'm a vue.js component</h1>
</template>

<script>
export default {
  data () {
    return {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-size: 4rem;
}
</style>
```

Enough already let's make our list component! Add this to `src/components/ProductList.vue`
```html
<!-- src/components/ProductList.vue -->
<template>
  <table class="table table-hover product-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" track-by="id">
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}:-</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
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
}
</script>
```

The product list in itself is not very complicated. As data we provide a list with some product objects and in the template we iterate over this list with the [`v-for`](https://vuejs.org/guide/list.html#v-for) directive. [Directives](http://vuejs.org/guide/syntax.html#Directives) are special attributes with the `v-` prefix.

>  "A directive’s job is to reactively apply special behavior to the DOM when the value of its expression changes"

The `track-by` attribute is only used to enhance performance. It's a hint so that Vue.js can optimize it's rendering strategy and only update the list when needed.

Also note that `data` is a function that returns an object. This is important because if we do not do this, the data object will be shared across all instances of the `ProductList` component which will most certainly lead to unexpected behavior.

## Attach the ProductList component to the app

When scaffolding a webpack based vue.js project with vue-cli our main component is located in `src/App.vue`. Open it and import our new `ProductList` component.

```html
<!-- src/App.vue -->
<template>
  <!-- when using a component in a template Vue.js expects the DOM element to be
  lowercased and dasherized. e.g. ProductList -> product-list -->

  <product-list></product-list>
</template>

<script>
import ProductList from './components/ProductList'

export default {
  components: {
    // With ES6 we can use the Object Literal Shorthand Syntax to save us some
    // keystrokes
    ProductList
  }
}
</script>
```

Now open up the command line, run `npm run dev` from the project root, point your browser to http://localhost:8080 and watch your beautiful product list.

![Product list image](/docs/images/product-list.png)

---

**Key to perfection**

 * Create a `ManageProducts` component that includes the `ProductList` and future
   product related components.
