<template>
  <header class="app-header">
    <app-nav></app-nav>
  </header>
  <main class="container-fluid">
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

<style>
html,
body {
  height: 100%;
}

.app-header {
  margin-bottom: 40px;
}
</style>
