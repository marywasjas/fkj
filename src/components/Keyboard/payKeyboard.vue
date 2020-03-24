<template>
  <v-touch tag="div" class="num-box">
    <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')"  v-for="i in 9" :key="i" @tap="number(i)">{{i}}</v-touch>
    <v-touch tag="li" class="my-button" @tap="deleteAll()">清空</v-touch>
    <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')" @tap="number(0)">0</v-touch>
    <v-touch tag="li" class="my-button" @tap="deleteOne()">删除</v-touch>
  </v-touch>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        color: '',
        isReadonly: false
      }
    },
    props: {
      limit: {
        type: Number,
        default: null
      }
    },
    mounted() {
    },
    methods: {
      isReadonlyFn(e) {
        this.isReadonly = e
      },
      number: function(num) {
        if (window.stopTap) return
        window.stopTap = true
        setTimeout(() => {
          window.stopTap = false
        }, 200)
        console.log(num)
        const focusNode = document.activeElement
        if (!focusNode) return
        if (this.limit && focusNode.value.length >= this.limit) {
          this.isReadonly = true
          return
        }
        if (focusNode.value.length >= 11) {
          this.isReadonly = true
          return
        }
        focusNode.value = focusNode.value + ((num + '').split('')[0])
        if (this.limit && focusNode.value.length >= this.limit) {
          this.isReadonly = true
        }
      },
      deleteOne: function() {
        if (window.stopTap) return
        window.stopTap = true
        setTimeout(() => {
          window.stopTap = false
        }, 200)
        const focusNode = document.activeElement
        focusNode.value = focusNode.value.substr(0, focusNode.value.length - 1)
        this.isReadonly = focusNode.value.length >= 11
      },
      deleteAll: function() {
        const focusNode = document.activeElement
        const type = focusNode.getAttribute('data-type')
        this.isReadonly = false
        if (type !== 'one') {
          focusNode.value = ''
          if (type === 'phone') focusNode.className = 'my-input'
        } else if (type === 'one') {
          focusNode.value = ''
          const list = focusNode.parentNode.getElementsByTagName('input')
          for (let i = 0; i < list.length; i++) {
            list[i].value = ''
          }
          window.FN = list[0]
          list[0].focus()
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
      width: 25.333%;
      padding: 0;
      margin:0 0 2.5rem 8%;
    }
  }
</style>
