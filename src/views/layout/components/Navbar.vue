<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <Msg></Msg> -->
    <breadcrumb></breadcrumb>
    <Count></Count>
  </el-menu>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import Count from '@/components/Count'
  import Msg from '@/components/Msg'
  export default {
    components: {
      Breadcrumb,
      Count,
      Msg
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    display: flex;
    width: 100%;
    height: 7rem;
    padding: 3rem 7.76% 0;
    line-height: 4rem;
  }
</style>

