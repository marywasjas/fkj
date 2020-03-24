<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="fkj-content-left">
        <div class="ph-title">
          请输入你的手机号码
        </div>
        <div class="sub">
          请输入格式正确的11位手机号码
        </div>
        <div>
          <v-touch autocomplete="off" tag="input" data-type="phone" ref="phone" class="my-input" type="text"></v-touch>
        </div>
        <div>
          <v-touch autocomplete="off" tag="input" ref="valid" id="validId" class="my-input valid-input"
                   data-callback="callback"
                   type="text"></v-touch>
          <v-touch tag="span" :class="'my-button valid-btn'+(timer?' readonly':'')" @tap="sendValidNum">
            <span v-if="timer">倒计时{{getValNumber}}s</span><span v-else><span v-if="timer!==0">重新</span>获取验证码</span>
          </v-touch>
        </div>
      </div>
      <div class="fkj-content-right">
        <keyboard ref="keyboard" :callback="focusclick" :validInputId="'validId'"></keyboard>
      </div>
    </div>

    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/cardInfo')">
          <i class="el-icon-arrow-left"></i>上一步
        </v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import keyboard from '@/components/Keyboard'
import { testValidNum, sendValidNum } from '@/api/common'
import { distinguishOwner } from '@/api/owner'

export default {
  data() {
    return {
      isDes: null,
      focusState: false,
      getValNumber: 60,
      timer: 0,
      phoneValid: this.$store.state.base.valid.phone11
    }
  },
  components: {
    keyboard
  },
  mounted() {
    this.reInput()
  },
  beforeDestroy() {
    this.isDes = true
  },
  methods: {
    reInput() {
      this.$store.commit('ownerInfo', { type: 'ownerPhone' })
      window.FN = this.$refs.phone.$el
      this.$refs.phone.$el.focus()
      this.$refs.phone.$el.value = ''
      this.$refs.valid.$el.value = ''
      this.$refs.keyboard.isReadonlyFn(false)
    },
    focusclick() {
      const _this = this
      const phoneNum = _this.$refs.phone.$el.value
      const validNum = _this.$refs.valid.$el.value
      if (validNum.length !== 6) {
        return
      }
      if (validNum.length > 6) {
        validNum.substring(0, 5)
      }
      _this.$openloading()
      if (String.isNull(phoneNum)) {
        _this.error('请先输入手机号码!', function () {
          _this.$refs.keyboard.deleteAll()
        })
        _this.$closeLoading()

        return
      }
      if (this.timer === 0) {
        _this.error('请先获取验证码!', function () {
          _this.$refs.keyboard.deleteAll()
        })
        _this.$closeLoading()
        return
      }

      if (!_this.$eval(_this.phoneValid).test(phoneNum)) {
        _this.error('手机号码格式不正确!', function () {
          _this.$refs.keyboard.deleteAll()
        })
        _this.$closeLoading()
        return
      }
      if (!new RegExp('^[0-9]*$').test(validNum)) {
        _this.error('验证码错误!')
        _this.$closeLoading()
        return
      }
      testValidNum({ phone: phoneNum, code: validNum }).then(response => {
        if (this.isDes) return
        if (response.code === 0) {
          _this.$store.commit('ownerInfo', { type: 'ownerPhone', value: phoneNum })
          _this.distinguish(phoneNum)
        } else if (response.code === 1) {
          _this.error('验证码错误！', function () {
            if (_this.isDes) return
            _this.$refs.valid.$el.value = ''
            _this.$refs.keyboard.isReadonlyFn(false)
            window.FN = _this.$refs.valid.$el
            _this.$refs.valid.$el.focus()
          })
        }
        _this.$closeLoading()
      }).catch(error => {
        _this.$closeLoading()
        console.log(error)
      })
    },
    distinguish(phoneNum) {
      const _this = this
      _this.$openloading()
      distinguishOwner({ phone: phoneNum, idcard: _this.$store.state.ownerInfo.cardInfo.IDNumber }).then(response => {
        if (this.isDes) return
        console.log(response)
        if (response.code === 0) {
          const data = response.data
          if (data.type === 1) { // 已认证业主 ,进入业主首页
            _this.$store.commit('ownerInfo', { type: 'id', value: data.id })
            _this.$store.commit('ownerInfo', {
              type: 'partyList', value: data.partyList
            })
            _this.$store.commit('ownerInfo', {
              type: 'houseList', value: data.houseList
            })
            _this.$store.commit('ownerInfo', {
              type: 'housePartyList', value: data.housePartyList
            })
            _this.$store.commit('ownerInfo', {
              type: 'carList', value: data.carList
            })
            _this.$store.commit('ownerInfo', {
              type: 'parkingList', value: data.parkList
            })
            _this.$store.commit('ownerInfo', {
              type: 'parkingPartyList', value: data.parkPartyList
            })
            _this.router('/owner/index')
          } else if (response.data.type === 2) { // 未身份认证
            _this.confirm('你还没有进行业主认证，是否完成以下业主认证？', function () {
              _this.router('/owner/auth/photo')
            }, function () {
              _this.$reload()
            })
          } else if (response.data.type === 4) { // 跳回首页
            _this.error(response.data.msg, function () {
              _this.$reload()
            })
          } else if (response.data.type === 5) { //
            _this.error(response.data.msg)
          }
        } else {
          _this.error(response.msg, function () {
            _this.$reload()
          })
        }
        this.$closeLoading()
      }).catch(error => {
        this.$closeLoading()
        console.log(error)
      })
    },
    sendValidNum() {
      if (this.timer) return
      this.$openloading()
      const phoneNum = this.$refs.phone.$el.value
      if (String.isNull(phoneNum)) {
        this.error('请先输入手机号码!')
      } else if (this.$eval(this.phoneValid).test(phoneNum)) {
        if (!this.timer) {
          window.FN = this.$refs.valid.$el
          this.$refs.valid.$el.focus()
          this.$refs.keyboard.isReadonlyFn(false)
          this.timer = setInterval(() => {
            if (this.getValNumber > 0) {
              this.getValNumber--
            } else {
              clearInterval(this.timer)
              this.timer = null
              this.getValNumber = 60
            }
          }, 1000)
        }
        sendValidNum({ phone: phoneNum }).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '验证码发送成功！',
              type: 'success'
            })
          } else {
            this.error(response.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.error('手机号码格式不正确!', function () {
        })
      }
      this.$closeLoading()
    }
  }
}

</script>
<style type="text/sass" lang="scss" scoped>
  .fkj-content {
    display: flex;
    &-left {
      width: 50%;
    }
    &-right {
      width: 50%;
    }
  }

  .fkj-content-left {
    padding-top: 1.5rem;
    line-height: 3rem;
    div {
      margin-top: 2rem;
    }
    .ph-title {
      font-size: 2.7rem;

    }
    .sub {
      font-size: 1.7rem;
      color: rgba(225, 225, 225, 1);
    }
  }

  .my-input {
    width: 38vw;
  }

  .valid-input {
    width: 18vw;
    margin-right: 2vw;
  }

  .valid-btn {
    width: 18vw;
  }
</style>
