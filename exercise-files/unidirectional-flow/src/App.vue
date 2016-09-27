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

export default {
  components: {
    AppNav
  }
}
</script>
