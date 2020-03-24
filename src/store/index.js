import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    count: 0,
    base: {},
    visitorFrom: {}, //  访客表单
    ownerInfo: {}, // 业主信息
    ownerAuth: {}, //  认证表单,
    partyAuth: {},
    carAuth: {},
    now: {},
    payInfo: {}
  },
  getters,
  mutations: {
    base(state, e) {
      state.base[e.type] = e.value || null
    },
    count(state, time) {
      if (time) {
        if (typeof time === 'number') {
          state.count = time
        } else {
          state.count += time * 1
        }
      } else {
        state.count--
      }
    },
    visitorFrom(state, e) {
      state.visitorFrom[e.type] = e.value || null
    },
    now(state, e) {
      state.now[e.type] = e.value || null
    },
    ownerInfo(state, e) {
      state.ownerInfo[e.type] = e.value || null
    },
    ownerAuth(state, e) {
      state.ownerAuth[e.type] = e.value || null
    },
    carAuth(state, e) {
      state.carAuth[e.type] = e.value || null
    },
    partyAuth(state, e) {
      state.partyAuth[e.type] = e.value || null
    },
    payInfo(state, e) {
      state.payInfo[e.type] = e.value || null
    },
    cleanFrom(state, type) {
      if (type === 'all') {
        state['visitorFrom'] = {}
        state['ownerInfo'] = {}
        state['ownerAuth'] = {}
        state['partyAuth'] = {}
        state['carAuth'] = {}
        state['now'] = {}
        state['payInfo'] = {}
      } else {
        state[type] = {}
      }
    }
  }
})

export default store
