<template>
  <v-touch tag="div" class="num-box">
    <div>
      <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')"  v-for="i in 9" :key="i"
               @tap="number(i)">{{i}}</v-touch><v-touch
      tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')" @tap="number(0)">0</v-touch>
    </div>
    <div style="padding-right: 1vw;">
      <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')" v-for="(item, i) in codeList.substring(0,8)"
               :key="i+20" @tap="number(item)">{{item}}</v-touch>
    </div>
    <div style="padding-left: 1vw;">
      <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')"  v-for="(item, i) in codeList.substring(8,17)"
               :key="i+40" @tap="number(item)">{{item}}</v-touch>
    </div>
    <div style="padding-right: 1vw;">
      <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')"  v-for="(item, i) in codeList.substring(17,24)"
               :key="i+60" @tap="number(item)">{{item}}</v-touch><v-touch
      style="width: 7vw;margin-left: 1.5vw" tag="li" class="my-button del-btn" @tap="deleteFn">删除</v-touch>
    </div>
  </v-touch>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        isReadonly: false,
        color: '',
        codeList: 'QWERTYUPASDFGHJKLZXCVBNM'
      }
    },
    props: {
      limit: {
        type: Number,
        default: null
      },
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
            window.FN = focusNode.nextElementSibling
            focusNode.previousElementSibling.focus()
            focusNode.previousElementSibling.value = ''
          }
          this.callback('area')
        } else {
          focusNode.value = focusNode.value.substr(0, focusNode.value.length - 1)
          if (this.limit && focusNode.value.length < this.limit) {
            this.isReadonly = false
          }
        }
      },
      number: function(num) {
        if (window.stopTap) return
        window.stopTap = true
        setTimeout(() => {
          window.stopTap = false
        }, 200)
        const focusNode = document.activeElement
        if (this.limit && focusNode.value.length >= this.limit) {
          this.isReadonly = true
          return
        }
        focusNode.value = focusNode.value + ((num + '').split('')[0])
        if (this.limit && focusNode.value.length >= this.limit) {
          this.isReadonly = true
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
    li {
      width: 8vh;
      height: 7vh;
      line-height: 7vh;
      font-size: 1.1rem;
      text-align: center;
      padding: 0;
      margin: .3rem .5rem;
    }
    &>div{
      width: 100%;
    }
  }
</style>
