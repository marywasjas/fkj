<template>
  <v-touch tag="div" class="num-box">
    <v-touch tag="li" :class="'my-button' + (isReadonly ? ' readonly':'')" v-for="i in 9" :key="i" @tap="number(i)">
      {{i}}
    </v-touch>
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
      isReadonly: false,
      valid: {
        phone2: this.$store.state.base.valid.phone2,
        phone11: this.$store.state.base.valid.phone11,
        phone3: this.$store.state.base.valid.phone3
      }
    }
  },
  props: {
    callback: {
      type: Function,
      default: function() {
      }
    },
    validInputId: {
      type: String,
      default: null
    }
  },
  mounted() {
  },
  methods: {
    isReadonlyFn(e) {
      this.isReadonly = e
    },
    phoneV(node) {
      this.color = ''
      const val = node.value
      const len = val.length
      if (len === 1 && val[0] !== '1') {
        this.color = 'error'
      } else if (len === 2 && !this.$eval(this.valid.phone2).test(val[0] + '' + val[1])) {
        this.color = 'error'
      } else if (len >= 3 && !this.$eval(this.valid.phone3).test(val[0] + '' + val[1] + val[2])) {
        this.color = 'error'
      } else if (len >= 12) {
        this.color = 'error'
        return
      }
      if (this.validInputId && !this.$eval(this.valid.phone11).test(val)) {
        document.getElementById(this.validInputId).value = ''
      }
      return this.color
    },
    number: function(num) {
      if (window.stopTap) return
      window.stopTap = true
      setTimeout(() => {
        window.stopTap = false
      }, 200)
      const focusNode = document.activeElement
      if (!focusNode) return
      const type = focusNode.getAttribute('data-type')
      if (type !== 'one') {
        if (type === 'phone') {
          if (focusNode.value.length >= 11) {
            this.isReadonly = true
            return
          }
          console.log(num)
          focusNode.value = focusNode.value + ((num + '').split('')[0])
          focusNode.className = this.phoneV(focusNode) + ' my-input'
          this.isReadonly = focusNode.value.length >= 11
        } else {
          if (focusNode.value.length >= 6) {
            this.isReadonly = true
            return
          }
          console.log(num)
          focusNode.value = focusNode.value + ((num + '').split('')[0])
          this.isReadonly = focusNode.value.length >= 6
        }
      } else if (type === 'one') {
        focusNode.value = num
        if (focusNode.nextElementSibling) {
          window.FN = focusNode.nextElementSibling
          focusNode.nextElementSibling.focus()
        }
      }
      if (focusNode.getAttribute('data-callback') === 'callback') {
        this.callback()
      }
    },
    deleteOne: function() {
      if (window.stopTap) return
      window.stopTap = true
      setTimeout(() => {
        window.stopTap = false
      }, 200)
      const focusNode = document.activeElement
      const type = focusNode.getAttribute('data-type')
      if (type !== 'one') {
        focusNode.value = focusNode.value.substr(0, focusNode.value.length - 1)
        if (type === 'phone') {
          this.isReadonly = focusNode.value.length >= 11
          focusNode.className = this.phoneV(focusNode) + ' my-input'
        } else {
          this.isReadonly = focusNode.value.length >= 6
        }
      } else if (type === 'one') {
        if (focusNode.value === '') {
          if (focusNode.previousElementSibling) {
            window.FN = focusNode.previousElementSibling
            focusNode.previousElementSibling.focus()
            focusNode.previousElementSibling.value = ''
          }
        } else {
          focusNode.value = ''
        }
      }
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
      margin: 0 0 2.5rem 8%;
    }
  }
</style>
