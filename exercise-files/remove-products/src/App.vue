<template>
  <manage-products></manage-products>
</template>

<script>
import ManageProducts from './components/ManageProducts';

export default {
  components: {
    ManageProducts
  }
}
</script>

<style>

@import '../node_modules/bootstrap/dist/css/bootstrap.css';

html,
body {
  height: 100%;
  max-width: 900px;
  margin: 24px auto;
}
</style>
