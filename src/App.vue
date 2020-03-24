<template>
  <div id="app"><!--v-waves-->
    <connect></connect>
    <router-view></router-view>
  </div>
</template>

<script>
  import connect from '@/components/Connect'
  // import Waves from '@/components/waves'

  export default {
    name: 'App',
    created() {
      /* document.getElementsByTagName('body')[0].ontouchstart = (e = window.event) => {
        if (e.path[0].className.indexOf('my-input') >= 0) { // 点击的是input
        } else {
          if (window.FN) window.FN.focus()
        }
      }*/
      // window.clipboardData.setData('text', '')
      document.getElementsByTagName('body')[0].ontouchend = (e = window.event) => {
        if (e.path[0].className.indexOf('my-input') >= 0) { // 点击的是input
          window.FN = e.srcElement
          window.FN.focus()
          const f = window.FN
          const l = window.FN.value.length
          f.selectionStart = l
          f.selectionEnd = l
        } else {
          if (window.FN) {
            setTimeout(() => {
              window.FN.focus()
            }, 0)
          }
        }
      }
      document.getElementsByTagName('body')[0].onmousedown = (e = window.event) => {
        this.$store.commit('count', 100)
        e.preventDefault()
      }
    },
    methods: {},
    components: {
      connect
    },
    directives: {
      // Waves
    }
  }
</script>
