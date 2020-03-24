<template>
  <div class="app-wrapper">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  export default {
    name: 'layout',
    components: {
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
