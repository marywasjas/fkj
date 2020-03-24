<template>
  <v-touch class="my-button" tag="a" @tap="back">
    退出<i class="iconfont icon-tuichu"></i>
  </v-touch>
</template>

<script>
  export default {
    data() {
      return {
        phone3: null
      }
    },
    mounted() {
    },
    methods: {
      back() {
        this.$openloading()
        const _this = this
        this.confirm('确定要退出吗？', function() {
          _this.$closeLoading()
          _this.$reload()
        }, function() {
          _this.$closeLoading()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .my-button{
    height: 4rem;
    line-height: 4rem;
    padding: 0 .3rem 0 1rem;
    box-shadow: none;
    color: #ffa225;
    background-color: transparent;
    &:active{
    }
  }
</style>
