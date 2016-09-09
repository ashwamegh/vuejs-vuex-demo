<template lang="html">
  <nav class="navbar navbar-full navbar-dark bg-inverse">
    <a class="navbar-brand" href="#">Jayway shop</a>
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <a class="nav-link" v-link="{ path: '/' }" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-link="{ path: '/manage-products' }" href="#">Manage Products</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="css" scoped>
</style>
