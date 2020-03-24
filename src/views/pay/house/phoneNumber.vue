<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="fkj-content-left">
        <div class="ph-title">
          请输入联系手机号
        </div>
        <div class="sub">
          为了方便进行联系，请输入缴费人的手机号码
        </div>
        <div>
          <v-touch autocomplete="off" tag="input" data-type="phone" ref="phone" @tap="getFocus" class="my-input" type="text"></v-touch>
        </div>
        <div>
          <v-touch autocomplete="off" tag="input" ref="valid" id="validId"  @tap="getFocus" class="my-input valid-input" data-callback="callback"
                   type="text"></v-touch><v-touch tag="span" :class="'my-button valid-btn'+(timer?' readonly':'')" @tap="sendValidNum">
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
        <v-touch tag="span" class="my-button" @tap="router('/pay/house/house')">
          <i class="el-icon-arrow-left"></i>上一步</v-touch>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import keyboard from '@/components/Keyboard'
  import { testValidNum, sendValidNum } from '@/api/common'

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
    beforeDestroy() {
      this.isDes = true
    },
    mounted() {
      this.reInput()
    },
    methods: {
      reInput() {
        this.$store.commit('payInfo', { type: 'phoneNumber' })
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
        this.$openloading()
        if (String.isNull(phoneNum)) {
          _this.error('请先输入手机号码!', function() {
            _this.$refs.keyboard.deleteAll()
          })
          _this.$closeLoading()
          return
        }
        if (this.timer === 0) {
          _this.error('请先获取验证码!', function() {
            _this.$refs.keyboard.deleteAll()
          })
          _this.$closeLoading()
          return
        }

        if (!_this.$eval(_this.phoneValid).test(phoneNum)) {
          _this.error('手机号码格式不正确!', function() {
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
          if (_this.isDes) return
          if (response.code === 0) {
            _this.$store.commit('payInfo', { type: 'phoneNumber', value: phoneNum })
            _this.$router.push('/pay/house/commit')
          } else if (response.code === 1) {
            _this.error('验证码错误！', function() {
              _this.$refs.valid.$el.value = ''
              _this.$closeLoading()
              _this.$refs.keyboard.isReadonlyFn(false)
            })
          }
          _this.$closeLoading()
        }).catch(error => {
          if (_this.isDes) return
          _this.$closeLoading()
          console.log(error)
        })
      },
      sendValidNum() {
        this.$openloading()
        if (this.timer) {
          this.$closeLoading()
          return
        }
        const phoneNum = this.$refs.phone.$el.value
        if (String.isNull(phoneNum)) {
          this.error('请先输入手机号码!')
          this.$closeLoading()
        } else if (this.$eval(this.phoneValid).test(phoneNum)) {
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
            this.$closeLoading()
            if (this.isDes) return
            console.log(error)
          })
          if (!this.timer) {
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
          this.$closeLoading()
        } else {
          this.error('手机号码格式不正确!', function() {
          })
          this.$closeLoading()
        }
      },
      getFocus(e = window.event) {
        const target = e.target || e.srcElement
        target.focus()
        const focusNode = document.activeElement
        const type = focusNode.getAttribute('data-type')
        if (type === 'phone') {
          this.$refs.keyboard.isReadonlyFn(focusNode.value.length >= 11)
        } else {
          this.$refs.keyboard.isReadonlyFn(focusNode.value.length >= 6)
        }
      }
    }
  }

</script>
<style type="text/sass" lang="scss" scoped>
  .fkj-content{
    display: flex;
    &-left{
      width: 50%;
    }
    &-right{
      width: 50%;
    }
  }
  .fkj-content-left{
    padding-top: 1.5rem;
    line-height: 3rem;
    div{
      margin-top: 2rem;
    }
    .ph-title{
      font-size: 2.7rem;

    }
    .sub{
      font-size: 1.7rem;
      color: rgba(225,225,225,1);
    }
  }
  .my-input{
    width: 38vw;
  }
  .valid-input{
    width: 18vw;
    margin-right:2vw;
  }
  .valid-btn{
    width: 18vw;
  }
</style>
