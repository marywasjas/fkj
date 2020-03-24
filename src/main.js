import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import VueTouch from 'vue-touch'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission'
import axios from 'axios/index' // permission control

import backIndex from '@/components/backIndex'
Vue.component('backIndex', backIndex)

String.isNull = function(str) {
  return str === ''
}

Vue.use(ElementUI, { locale })

Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.router = function(url) {
  this.$openloading()
  router.push(url)
  this.$closeLoading()
}
Vue.prototype.$url = function() {
  return store.state.base.imgUrl
}
Vue.prototype.error = function(msg, cb) {
  setTimeout(() => {
    const obj = {
      iconClass: 'el-icon-circle-close',
      type: 'error',
      center: true,
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      title: '',
      closeOnHashChange: true,
      closeOnClickModal: false,
      showClose: false,
      message: msg
    }
    if (cb) obj.callback = cb
    window.msg = this.$msgbox(obj).catch(() => {
    })
  }, 200)
}

Vue.prototype.success = function(msg, cb) {
  setTimeout(() => {
    const obj = {
      iconClass: 'el-icon-circle-close',
      type: 'success',
      center: true,
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      title: '',
      closeOnHashChange: true,
      closeOnClickModal: false,
      showClose: false,
      message: msg
    }
    if (cb) obj.callback = cb
    window.msg = this.$msgbox(obj).catch(() => {
    })
  }, 200)
}
Vue.prototype.confirm = function(msg, cb, cb2) {
  setTimeout(() => {
    window.msg = this.$confirm(msg, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
      type: 'warning',
      center: true,
      showClose: false
    }).then(() => {
      if (cb) cb()
    }).catch(() => {
      if (cb2) cb2()
    })
  }, 200)
}
Vue.prototype.$eval = function(fn) {
  const Fn = Function
  return new Fn('return ' + fn)()
}

Vue.prototype.$openloading = function() {
  window.loading = this.$loading({
    lock: true,
    text: '',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}
Vue.prototype.$closeLoading = function() {
  window.loading.close()
}
Vue.prototype.$reload = function() {
  router.push('/')
  window.location.reload()
}
Vue.prototype.$deepClone = function(initalObj, finalObj) {
  const obj = finalObj || {}
  for (const i in initalObj) {
    const prop = initalObj[i]
    if (prop) {
      if (prop === obj) {
        continue
      }
      if (typeof prop === 'object') {
        obj[i] = (prop.constructor === Array) ? [] : Object.create(prop)
      } else {
        obj[i] = prop
      }
    }
  }
  return obj
}

document.oncontextmenu = function() {
  return false
}
document.onkeydown = function() {
  if (window.event && window.event.keyCode === 123) {
    // return false
  }
}
window.onload = function() {
  router.push('/')
}
axios.get('../static/base.json').then(response => {
  store.commit('base', { type: 'valid', value: response.data.valid })
  store.commit('base', { type: 'imgUrl', value: response.data.imgUrl })
  store.commit('base', { type: 'baseUrl', value: response.data.baseUrl })
})

history.pushState(null, null, document.URL)
window.addEventListener('popstate', function() {
  history.pushState(null, null, document.URL)
});
