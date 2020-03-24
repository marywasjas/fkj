<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="fkj-content-left">
        <div class="ph-title">
          请输入缴费水号
        </div>
        <div class="sub">
          请仔细检查缴费水号是否正确
        </div>
        <div>
          <v-touch autocomplete="off" tag="input" data-type="phone" ref="number" class="my-input" type="text"></v-touch>
        </div>
      </div>
      <div class="fkj-content-right">
        <keyboard ref="keyboard" :limit="8"></keyboard>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch v-if="this.$store.state.ownerInfo.id" tag="span" class="my-button" @tap="router('/owner/housePayType')">
          <i class="el-icon-arrow-left"></i>取消</v-touch>
        <v-touch v-else tag="span" class="my-button" @tap="router('/pay/index')">
          <i class="el-icon-arrow-left"></i>上一步</v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch tag="span" class="my-button" @tap="commit">下一步 <i class="el-icon-arrow-right"></i></v-touch>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import keyboard from '@/components/Keyboard/payKeyboard'
  import { waterGasBill } from '@/api/pay'

  export default {
    data() {
      return {
      }
    },
    components: {
      keyboard
    },
    mounted() {
      this.reInput()
    },
    methods: {
      reInput() {
        this.$store.commit('payInfo', { type: 'water' })
        this.$refs.number.$el.focus()
        this.$refs.number.$el.value = ''
      },
      commit() {
        this.$openloading()
        const _this = this
        const number = _this.$refs.number.$el.value
        if (number.length === 0) {
          _this.error('请输入水号!')
          _this.$closeLoading()
          return
        }
        if (number.length < 7) {
          _this.error('请输入完整水号!')
          _this.$closeLoading()
          return
        }
        waterGasBill({ userCode: number, type: 1 }).then(response => {
          if (response.code === 0) {
            console.log(this.$store.state.ownerInfo.id)
            if (this.$store.state.ownerInfo.id) {
              response.data.ownerId = this.$store.state.ownerInfo.id
              _this.router('/pay/water/commit')
            } else {
              _this.router('/pay/water/phoneNumber')
            }
            _this.$store.commit('payInfo', { type: 'water', value: response.data })
          } else {
            _this.error(response.msg)
            _this.$closeLoading()
          }
        }).catch(error => {
          _this.$closeLoading()
          console.log(error)
        })
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
