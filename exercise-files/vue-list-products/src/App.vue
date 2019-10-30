<template>
  <div id="app">
    <manage-products/>
  </div>
</template>

<script>
import ManageProducts from './components/ManageProducts.vue'

export default {
  name: 'app',
  components: {
    ManageProducts
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
