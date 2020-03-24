<template>
  <div class="login-container">
    <div class="box">
      <v-touch autocomplete="off" tag="input" spellcheck="false" clearable="true" placeholder="请输入小区密匙"
               ref="inp" data-callback="callback" class="my-input" type="text"></v-touch>
      <v-touch tag="span" @tap="login" class="my-button">进入系统</v-touch>
    </div>
    <loginNum :limit="allLimit"></loginNum>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { getBuildInfo, getParkingInfo, loginTestVillage, dictData } from '@/api/common'
  import loginNum from '@/components/carKeyboard/loginNum'

  export default {
    name: 'login',
    data() {
      return {
        loading: false,
        number: 0,
        limit: 4,
        allLimit: 16,
        villageName: ''
      }
    },
    components: {
      loginNum
    },
    mounted() {
      window.FN = this.$refs.inp.$el
      this.$refs.inp.$el.focus()
      if (window.localStorage.getItem('xiaoQuId')) {
        this.$refs.inp.$el.value = window.localStorage.getItem('xiaoQuId')
        this.turn(1)
      }
    },
    methods: {
      login() {
        this.$openloading()
        const _this = this
        const val = this.$refs.inp.$el.value
        if (val.length === 0) {
          _this.$closeLoading()
          _this.error('请先输入密匙！')
          return
        } else if (val.length < _this.allLimit) {
          _this.$closeLoading()
          _this.error('请输入完整密匙！')
          return
        }
        loginTestVillage({ uniqueKey: val }).then(res => {
          if (res.code === 0) {
            _this.villageName = res.data.name
            const storage = window.localStorage
            storage.removeItem('villageId')
            storage.removeItem('houseInfo')
            storage.removeItem('parkingInfo')
            storage.removeItem('visit_reason')
            storage.removeItem('app_relation_type')
            this.number = 0
            storage.setItem('villageId', val)
            getBuildInfo().then(res => {
              if (res.code === 0) {
                storage.setItem('houseInfo', JSON.stringify(res.data))
                this.number++
                if (this.number === this.limit) this.turn()
              }
            }).catch(error => {
              console.log(error)
            })

            getParkingInfo().then(res => {
              Cookies.set('isAllow', 'true')
              if (res.code === 0) {
                storage.setItem('parkingInfo', JSON.stringify(res.data))
                this.number++
                if (this.number === this.limit) this.turn()
              }
            }).catch(error => {
              console.log(error)
            })

            dictData({ dictType: 'visit_reason' }).then(response => {
              if (response.code === 0) {
                storage.setItem('visit_reason', JSON.stringify(response.data))
                this.number++
                if (this.number === this.limit) this.turn()
              }
            }).catch(error => {
              console.log(error)
            })

            dictData({ dictType: 'app_relation_type' }).then(response => {
              if (response.code === 0) {
                storage.setItem('app_relation_type', JSON.stringify(response.data))
                this.number++
                if (this.number === this.limit) this.turn()
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.error(res.msg)
          }
          this.$closeLoading()
        }).catch(error => {
          this.$closeLoading()
          console.log(error)
        })
      },
      turn(e) {
        const _this = this
        if (e) {
          this.fn()
        } else {
          this.confirm('是否进入' + this.villageName + '?', function() {
            _this.fn()
          })
        }
      },
      fn() {
        window.localStorage.setItem('xiaoQuId', this.$refs.inp.$el.value)
        Cookies.set('isAllow', 'true')
        this.router({ path: '/' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    height: 100%;
    width: 100%;
    background-color: #617ec6;
    padding-top: 28vh;
  }

  .box {
    font-size: 1.2rem;
    margin-bottom: 10vh;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
  }

  .my-input {
    width: 40%;
    font-size: 1.1rem;
    background-color: rgba(255, 255, 255, .8);

  }

  .my-button, .my-input {
    border-radius: .5rem;
    line-height: 8vh;
    height: 8vh;
  }

  .my-button {
    margin-left: 1rem;

  }
</style>
