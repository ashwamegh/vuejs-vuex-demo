<template>
  <nav class="navbar navbar-full navbar-light navbar-jw">
    <a class="navbar-brand" href="#">
      <img src="../assets/jay.svg" alt="Jayway logo" /> Jaystore
    </a>
    <div class="nav navbar-nav">
      <a
        href="#"
        class="nav-item nav-link"
        v-link="{ path: '/home', exact: true, activeClass: 'active' }"
      >Home</a>
      <a
        href="#"
        class="nav-item nav-link"
        v-link="{ path: '/manage-products', exact: true, activeClass: 'active' }"
      >Manage Products</a>
    </div>
  </nav>
</template>

<script>
export default {}
</script>
