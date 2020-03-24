<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="payBox">
        <div class="payInfo">
          <el-form label-width="15vw" label-suffix=":">
            <el-form-item label="缴费类型">
              <span>气费</span>
            </el-form-item>
            <el-form-item label="缴费房屋">
              <span> {{payInfo.address}}</span>
            </el-form-item>
            <el-form-item label="用户姓名">
              <span> {{payInfo.userName||'（未知）'}}</span>
            </el-form-item>
            <el-form-item label="欠缴总额">
              <span style="color: #fd6c63!important;" class="money">
                  {{(payInfo.money + payInfo.punishMoney).toFixed(2)}} 元<span>
                (本金<span style="color: #fd6c63!important;">{{payInfo.money.toFixed(2)}}</span> 元,滞纳金
                <span style="color: #fd6c63!important;">{{payInfo.punishMoney.toFixed(2)}}</span> 元)</span>
                </span>
            </el-form-item>

            <el-form-item v-if="(payInfo.money + payInfo.punishMoney)>0" class="pay-type-box" label="请选择付款方式" style="position: relative;margin-left: 5vw">
            </el-form-item>
            <div v-if="(payInfo.money + payInfo.punishMoney)>0" class="pay-type-box">
              <v-touch class="my-button" @tap="init('翼支付')"> <!--@tap="pay('翼支付')"-->
                <i class="iconfont icon-yizhifu" style="color: #1296db;"></i>
              </v-touch>
              <v-touch class="my-button readonly" tag="li" >
                <i class="iconfont icon-payWechat" style="color: #bbb;"></i>
              </v-touch>
              <v-touch class="my-button readonly" tag="li"> <!--@tap="pay('支付宝')"-->
                <i class="iconfont icon-zhifubaozhifu" style="color: #bbb;"></i>
              </v-touch>
              <v-touch class="my-button readonly" tag="li"> <!--@tap="pay('和包')"-->
                <i class="iconfont icon-hebaozhifu" style="color: #bbb;"></i>
              </v-touch>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="fkj-footer">
      <div v-if="payInfo.ownerId" class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/housePayType')">取消</v-touch>
      </div>
      <div v-else class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/pay/gas/phoneNumber')">上一步</v-touch>
      </div>
    </div>

    <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible"
               :close-on-click-modal="false" top="30vh" width="20%" style="text-align: center;">
      <div style="width:100%;height:100%;padding:0 10px;"><img :src="url" style="width: 100%;" alt=""></div>
    </el-dialog>
  </div>
</template>
<script>
  import { submitOrder, getPayStatus } from '@/api/pay'

  export default {
    data() {
      return {
        dialog: {
          dialogVisible: false,
          title: null
        },
        isDes: false,
        timer: false,
        url: '',
        data: null,
        payInfo: this.$store.state.payInfo.gas,
        money: 0,
        orderInfo:null,
      }
    },
    mounted() {
      this.money = 0
    },
    destroyed() {
      this.isDes = true
      this.timer = false
    },
    methods: {
      init(type) {
        this.$openloading()
        const _this = this
        const data = {
          type: 2,
          userCode: _this.payInfo.userNo,
          payType: type === '翼支付' ? 1 : type === '支付宝' ? 2 : type==='微信' ? 3 : 4
        }
        if (_this.payInfo.ownerId) {
          data.ownerId = _this.payInfo.ownerId
        } else {
          data.phone = _this.$store.state.payInfo.phoneNumber
        }
        submitOrder(data).then(response=> {
          if (response.code === 0) {
            _this.$closeLoading()
            _this.dialog.dialogVisible = true
            _this.dialog.title = type + '扫码支付'
            _this.url = 'data:image/png;base64,' + response.data.encode
            if (_this.timer === false) {
              _this.timer = true
              _this.setTO(response.data.orderNo)
            }
          }
        }).catch(error => {
          _this.$closeLoading()
          _this.error(response.msg, function() {
          })
        })
      },
      setTO(orderId) {
        const _this = this
        if (!orderId || this.timer === false) return
        getPayStatus({ orderNo: orderId }).then(response => {
          if (response.code === 0) {
            _this.$store.commit('payInfo', { type: 'success', value: response.data })
            _this.dialogVisible = false
            setTimeout(() => {
              _this.router('/pay/gas/success')
            }, 2000)
          } else {
            if (_this.isDes) return
            setTimeout(() => {
              _this.setTO(orderId)
            }, 2000)
          }
        }).catch(error => {
        })
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .fkj-content {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    > .payInfo {
      line-height: 1.5;
      font-size: 1.3rem;
    }
  }

  .payBox {
    margin-top: 3vh;
    width: 65%;
    padding: 6vh 0 5.5vh 13vh;
    background: #fff;
    border-radius: 1rem;
    .title {
      color: #555;
      text-align: left;
    }
    span {
      color: #7c7c7c !important;
    }
  }

  .pay-type-box {
    width: 30vw;
    display: flex;
    justify-content: center;
    border-radius: 1rem;
    color: #000;
    .my-button {
      width: auto;
      height: auto;
      margin: 1.5vh 2vw 1.5ch 1vw;
      background: none;
      line-height: 1;
      padding: 0;
      i {
        line-height: 1;
        font-size: 4vw;
        margin: -.3vw  -.34vw  -.2vw  -.2vw;
      }
    }
  }

  .el-form-item__content {
    line-height: 2.6rem !important;
  }
</style>
