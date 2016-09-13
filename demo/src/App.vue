<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<script>
import store from './vuex/store'
import AppNav from './components/AppNav'

export default {
  store,
  components: {
    AppNav
  }
}
</script>

<style lang="scss">
// Import global styles
@import "styles/style.scss";
</style>

<style lang="css" scoped>

.app-header {
  margin-bottom: 3rem;
}

</style>
