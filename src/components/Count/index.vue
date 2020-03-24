<template>
  <div class="box">
    <a :class="color">
      <span v-if="$store.state.count<10">0</span>{{$store.state.count}}s
    </a>
    <backIndex></backIndex></div>
</template>

<script>
  import backIndex from '@/components/backIndex'

  export default {
    data() {
      return {
        timer: null,
        color: ''
      }
    },
    component: {
      backIndex
    },
    mounted() {
      this.$store.commit('count', 100)
      this.start()
    },
    destroyed() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {
      start() {
        if (!this.timer) {
          this.timer = setInterval(() => {
            const c = this.$store.state.count
            if (c > 0) {
              this.$store.commit('count')
              this.color = c <= 10 ? 'red' : ''
            } else {
              this.$reload()
              try {
                this.$msgbox.close()
              } catch (e) {
                console.log(e)
              }
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .box {
    width: 16rem;
    height: 100%;
    text-align: right;
    padding-right: .3rem;
    a {
      font-size: 1.6rem;
    }
  }

  .red {
    color: #cf0f1c;
  }
</style>
