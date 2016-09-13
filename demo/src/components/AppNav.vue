<template lang="html">
  <nav class="navbar navbar-full navbar-light navbar-jw">
    <button class="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#appnav" aria-controls="appnav" aria-expanded="false" aria-label="Toggle navigation">
      &#9776;
    </button>
    <a class="navbar-brand" href="#">
      <img src="../assets/jay.svg" alt="Jayway logo" />
      Jaystore
    </a>
    <div class="collapse navbar-toggleable-xs" id="appnav">
      <div class="nav navbar-nav">
        <a class="nav-item nav-link" v-link="{ path: '/home', exact: true, activeClass: 'active' }" href="#">Home</a>
        <a class="nav-item nav-link" v-link="{ path: '/manage-products', exact: true, activeClass: 'active' }" href="#">Manage Products</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
