<template>
  <v-touch tag="div" class="num-box">
    <div>
      <v-touch tag="li" class="my-button"  v-for="(item, i) in codeList[0]"
               :key="i+20" @tap="number(item)">{{item}}</v-touch>
    </div>
    <div>
      <v-touch tag="li" class="my-button"  v-for="(item, i) in codeList[1]"
               :key="i+40" @tap="number(item)">{{item}}</v-touch>
    </div>
    <div>
      <v-touch tag="li" class="my-button"  v-for="(item, i) in codeList[2]"
               :key="i+60" @tap="number(item)">{{item}}</v-touch><v-touch
      style="width: 6vw;" tag="li" class="my-button del-btn" @tap="deleteFn">删除</v-touch>
    </div>
  </v-touch>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        color: '',
        codeList: ['QWERTYUP', 'ASDFGHJKL', 'ZXCVBNM']
      }
    },
    props: {
      callback: {
        type: Function,
        default: function() {
        }
      }
    },
    mounted() {
    },
    methods: {
      deleteFn() {
        if (window.stopTap) return
        window.stopTap = true
        setTimeout(() => {
          window.stopTap = false
        }, 200)
        const focusNode = document.activeElement
        if (focusNode.value === '') {
          if (focusNode.previousElementSibling) {
            window.FN = focusNode.previousElementSibling
            focusNode.previousElementSibling.focus()
            focusNode.previousElementSibling.value = ''
          }
          this.callback('head')
        } else {
          focusNode.value = ''
          this.callback('area')
        }
      },
      number: function(num) {
        const focusNode = document.activeElement
        focusNode.value = num
        if (focusNode.nextElementSibling) {
          window.FN = focusNode.nextElementSibling
          focusNode.nextElementSibling.focus()
        }
        this.callback('number')
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
