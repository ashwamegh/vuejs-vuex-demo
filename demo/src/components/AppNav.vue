<template lang="html">
  <nav class="navbar navbar-full navbar-dark bg-inverse">
    <button class="navbar-toggler bg-inverse hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#appnav" aria-controls="appnav" aria-expanded="false" aria-label="Toggle navigation">
      &#9776;
    </button>
    <a class="navbar-brand" href="#">Jayway shop</a>
    <div class="collapse navbar-toggleable-xs" id="appnav">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" v-link="{ path: '/' }" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" v-link="{ path: '/manage-products' }" href="#">Manage Products</a>
        </li>
      </ul>
    </div>
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
@media (max-width: 543px) {
  .navbar-toggleable-xs {
    clear: left;
  }
}
</style>
