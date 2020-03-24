<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import { Navbar, AppMain } from './components'
  export default {
    name: 'layout',
    components: {
      Navbar,
      AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .app-wrapper {
    position: relative;
    color: #fff;
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, #01d4d8, #006ec7);
  }

  .main-container {
    height: 100%;
  }
</style>
