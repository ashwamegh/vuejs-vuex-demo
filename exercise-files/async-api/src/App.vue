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
import store from './vuex/store';

export default {
  store,
  components: {
    AppNav
  }
}
</script>
