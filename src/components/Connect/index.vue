<template>
  <div v-if="show" class="connect">
    网络连接已断开! 请联系工作人员。
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: !navigator.onLine
    }
  },
  created() {
    const _this = this
    document.getElementsByTagName('body')[0].ononline = function() {
      _this.show = false
    }
    document.getElementsByTagName('body')[0].onoffline = function() {
      _this.show = true
    }
  },
  methods: {
    start() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .connect{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    color: #dd1b33;
    font-weight: 600;
    background: #ffecb3;
    box-shadow: inset 0 0 1vh rgba(255,255,255,.7);
    width: 100%;
    height: 4vh;
    font-size: 1.8vh;
    line-height: 4vh;
    letter-spacing:.3rem;
    text-align: center;
  }
</style>
