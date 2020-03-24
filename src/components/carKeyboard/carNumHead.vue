<template>
  <v-touch tag="div" class="num-box">
    <div>
      <v-touch v-for="(it, i) in list.substring(0,10)" tag="li" :key="i" class="my-button" @tap="main(it)">{{it}}</v-touch>
    </div>
    <div>
      <v-touch v-for="(it, i) in list.substring(10,21)" tag="li" :key="i" class="my-button" @tap="main(it)">{{it}}</v-touch>
    </div>
    <div>
      <v-touch v-for="(it, i) in list.substring(21,31)" tag="li" :key="i" class="my-button" @tap="main(it)">{{it}}</v-touch>
    </div>
  </v-touch>
</template>

<script>
  export default {
    data() {
      return {
        list: '京津沪川渝蒙新藏宁桂黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕黔滇'
      }
    },
    mounted() {
    },
    props: {
      callback: {
        type: Function,
        default: function() {
        }
      }
    },
    methods: {
      main(res) {
        const focusNode = document.activeElement
        focusNode.value = res
        this.callback()
        if (focusNode.nextElementSibling) {
          window.FN = focusNode.nextElementSibling
          focusNode.nextElementSibling.focus()
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .num-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 2rem;
    &>div{
      width: 100%;
    }
    li {
      width: 8vh;
      height: 7vh;
      line-height: 7vh;
      font-size: 1.1rem;
      text-align: center;
      padding: 0;
      margin: .3rem .5rem;
    }
  }
</style>
