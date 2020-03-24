<template>
  <div class="app-container">
    <div class="fkj-content">
      <span>请将您的身份证放置在感应区!</span>
      <div style="line-height: 0;">
          <img class="tipImg" src="@/assets/img/card.png" alt="">
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/visitor/ownerPhone')">上一步</v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>

<script>
  import { getCardInfo } from '@/utils'
  export default {
    data() {
      return {
        show: true,
        form: null,
        timer: 1
      }
    },
    mounted() {
      this.cleanFrom()
    },
    beforeDestroy() {
      clearTimeout(this.timer)
      this.timer = false
    },
    methods: {
      cleanFrom() {
        this.form = null
        this.$store.commit('visitorFrom', { type: 'cardInfo' })
        this.main()
      },
      main() {
        const _this = this
        getCardInfo(function(data) {
          if (_this.timer !== 1) clearTimeout(_this.timer)
          if (_this.timer === false) return
          if (data.ret === 0) {
            _this.$store.commit('visitorFrom', { type: 'cardInfo', value: data.Certificate })
            _this.form = data.Certificate
            _this.commitCardInfo()
          } else if (data.ret === 11) {
            _this.timer = setTimeout(_this.main, 400)
          } else if (data.ret === 1 || data.ret === 100) {
            _this.error('请检查身份证阅读器是否连接成功！', function() {
              _this.timer = setTimeout(_this.main, 2000)
            })
          } else if (data.ret === 4) {
            _this.timer = setTimeout(_this.main, 400)
          } else if (data.ret !== 0) {
            _this.timer = setTimeout(_this.main, 400)
          }
        })
      },
      commitCardInfo() {
        if (this.form) {
          this.router({ path: '/visitor/phoneNumber' })
        } else {
          this.error('未读取到身份证信息！')
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fkj-content {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    font-size: 2rem;
    text-align: center;
  }
  .tipImg {
    display: block;
    width: 31%;
    margin: 3rem 35.5% 3rem 34.5%;
    padding: 3vh 2.7vw;
    background: #fff;
    border-radius: .9rem;
    box-shadow: 0 .2vh 1rem rgba(0,0,0,.1);
  }

</style>

