<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="fkj-content-left">
        <div class="ph-title">
          {{address.name}}
        </div>
        <div class="sub">
          请输入业主手机号后四位
        </div>
        <div  ref="phoneBox">
          <v-touch autocomplete="off" tag="input" data-type="one"
                   ref="phone1" data-callback="callback" class="my-input" type="text"></v-touch>
          <v-touch autocomplete="off" tag="input" data-type="one"
                   class="my-input" data-callback="callback" type="text"></v-touch>
          <v-touch autocomplete="off" tag="input" data-type="one"
                   class="my-input" data-callback="callback" type="text"></v-touch>
          <v-touch autocomplete="off" tag="input" data-type="one"
                   data-callback="callback" class="my-input" type="text"></v-touch>
        </div>
      </div>
      <div class="fkj-content-right">
        <keyboard ref="keyboard" :callback='commit'></keyboard>
      </div>
    </div>

    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/visitor/address')">上一步</v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import keyboard from '@/components/Keyboard'
  import { ownerPhone } from '@/api/visitor'

  export default {
    data() {
      return {
        address: this.$store.state.visitorFrom.address,
        isDes: null,
        focusState: false,
        getValNumber: 60,
        timer: false,
        val: null,
        limit: 6
      }
    },
    components: {
      keyboard
    },
    mounted() {
      this.$refs.phone1.$el.focus()
    },
    beforeDestroy() {
      this.isDes = true
    },
    methods: {
      commit() {
        const _this = this
        const inp = _this.$refs.phoneBox.getElementsByTagName('input')
        if (inp[0].value.length > 1 || inp[1].value.length > 1 || inp[2].value.length > 1 || inp[3].value.length > 1) {
          _this.$refs.keyboard.deleteAll()
          return
        }
        const data = inp[0].value + '' + inp[1].value + '' + inp[2].value + '' + inp[3].value + ''
        if (data.length < 4) return
        if (data.length > 4) {
          _this.$refs.keyboard.deleteAll()
          return
        }
        if (data === '') {
          _this.error('请输入业主手机号后4位！')
        } else if (data.length < 4) {
          _this.error('请输入完整4位数字')
        } else {
          if (_this.$store.state.visitorFrom.address) {
            this.$openloading()
            this.limit--
            ownerPhone({ houseId: this.$store.state.visitorFrom.address.id, phone: data }).then(res => {
              if (this.isDes) return
              if (res.code === 0) {
                _this.router('/visitor/cardInfo')
              } else {
                if (res.data === 1) {
                  if (_this.limit <= 0) {
                    _this.error('请核实业主信息是否属实！', function() {
                      _this.$reload()
                    })
                  } else {
                    _this.error(res.msg, function() {
                      _this.$refs.keyboard.deleteAll()
                      if (_this.limit <= 3) {
                        _this.$message({
                          message: '你还有 ' + _this.limit + ' 次机会！',
                          type: 'error'
                        })
                      }
                    })
                  }
                } else {
                  _this.error(res.msg, function() {
                    _this.$reload()
                  })
                }
              }
              this.$closeLoading()
            }).catch(() => {
              this.$closeLoading()
            })
          } else {
            _this.error('你还没有选择要拜访的住宅！', function() {
              _this.$refs.keyboard.deleteAll()
            })
          }
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
    padding-top: 3.5rem;
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
  .my-input {
    width: 6vw;
    background: transparent;
    padding: 0;
    border-bottom: .3rem #fff solid;
    border-radius: 0;
    box-shadow: none;
    font-size: 2.3rem;
    color: #fff;
    text-align: center;
    margin-right: 4vw;
  }
  .valid-input{
    width: 18vw;
    margin-right:2vw;
  }
  .valid-btn{
    width: 18vw;
  }
</style>
