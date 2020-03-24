<template>
  <div class="app-container">
    <div v-if="payInfo" class="fkj-content">
      <div class="payBox">
        <div class="payInfo">
            <el-form label-width="15vw" label-suffix=":">
              <el-form-item label="缴费类型">
                <span>物业费</span>
              </el-form-item>
              <el-form-item label="缴费房屋">
                <span>{{payInfo.info.villageName}} {{payInfo.info.address}}</span>
              </el-form-item>
              <el-form-item label="欠缴月数">
                <span>已欠缴 <span style="color: #fd6c63!important;">{{payInfo.info.list.length}}</span> 月</span>
              </el-form-item>
              <el-form-item label="欠缴总额">
                <span style="color: #fd6c63!important;" class="money">
                  {{money.toFixed(2)}} 元
                  <v-touch v-if="payInfo.info.list.length>0" tag="span" @tap="listShow">
                    <i class="iconfont icon-gantan"></i>点击查看具体明细</v-touch>
                </span>
              </el-form-item>
              <el-form-item v-if="money>0" class="pay-type-box" label="请选择付款方式" style="position: relative;margin-left: 5vw">
              </el-form-item>
              <div v-if="money>0" class="pay-type-box">
                <v-touch class="my-button" @tap="init('翼支付')"> <!--@tap="pay('翼支付')"-->
                  <i class="iconfont icon-yizhifu" style="color: #1296db;"></i>
                </v-touch>
                <v-touch class="my-button readonly" tag="li">
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
        <v-touch tag="span" class="my-button" @tap="router('/pay/house/phoneNumber')">上一步</v-touch>
      </div>
    </div>

    <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible_pay"
               :close-on-click-modal="false" top="30vh" width="20%" style="text-align: center;">
      <div style="width:100%;height:100%;padding:0 10px;"><img :src="url" style="width: 100%;" alt=""></div>
    </el-dialog>

    <el-dialog title="物业费欠缴明细" :visible.sync="dialog.dialogVisible_list"
               top="21vh" width="40%">
      <ul style="height: 35vh;overflow-y: auto">
        <li class="payList-li" v-for="item in payInfo.info.list" :key="item.id">
          时间：<span>{{item.time}}</span>，  金额：<span>{{item.money}}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
  import { placeOrder, getPayStatus } from '@/api/pay'
  export default {
    data() {
      return {
        dialog: {
          dialogVisible_pay: false,
          dialogVisible_list: false,
          title: null
        },
        orderInfo:null,
        url: '',
        isDes: false,
        timer: false,
        data: null,
        payInfo: this.$store.state.payInfo.house,
        money: 0
      }
    },
    mounted() {
      this.money = 0
      const _this = this
      _this.payInfo.info.list.forEach(function(item) {
        _this.money = _this.money + item.money
      })
    },
    destroyed() {
      this.isDes = true
      this.timer = false
    },
    methods: {
      listShow() {
        setTimeout(() => {
          this.dialog.dialogVisible_list = !this.dialog.dialogVisible_list
        }, 100)
      },
      init(type){
        this.$openloading()
        const _this = this
        const data = {
          type: 1,
          id: _this.payInfo.houseId,
          payType: type === '翼支付' ? 1 : type === '支付宝' ? 2 : type==='微信' ? 3 : 4
        }
        if (_this.payInfo.ownerId) {
          data.ownerId = _this.payInfo.ownerId
        } else {
          data.phone = _this.$store.state.payInfo.phoneNumber
        }
        placeOrder(data).then(response=> {
          if (response.code === 0) {
            _this.$closeLoading()
            _this.orderInfo = response.data
            _this.dialog.dialogVisible_pay = true
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
            _this.dialogVisible_pay = false
            setTimeout(() => {
              _this.router('/pay/house/success')
            }, 2000)
          } else {
            if (_this.isDes) return
            setTimeout(() => {
              _this.setTO(orderId)
            }, 2000)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
.fkj-content{
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  >.payInfo{
    line-height: 1.5;
    font-size: 1.3rem;
  }
}
.el-dialog__title{
  text-align: center;
}
.payBox{
  margin-top: 3vh;
  width: 65%;
  padding: 6vh 0 5.5vh 13vh;
  background: #fff;
  border-radius: 1rem;
  .title{
    color: #555;
    text-align: left;
  }
  span{
    color: #7c7c7c!important;
  }
}
  .pay-type-box{
    width: 30vw;
    display: flex;
    justify-content: center;
    border-radius: 1rem;
    color: #000;
    .my-button{
      width: auto;
      height: auto;
      margin: 1.5vh 2vw 1.5ch 1vw;
      background: none;
      line-height: 1;
      padding: 0;
      i{
        line-height: 1;
        font-size: 4vw;
        margin: -.3vw  -.34vw  -.2vw  -.2vw;
      }
    }
  }
  .money{
    span{
      color: #999!important;
      font-size: .9rem;
      margin-left: 2rem;
    }
  }
  .el-form-item__content{
    line-height: 2.6rem!important;
  }
  .payList-li{
    padding: 2vh;
    width: 90%;
    margin-left: 5%;
    color: #808080;
    font-size: 1.1rem;
    line-height: 1.5vh;
    border-bottom: .1rem #F5F5F5 solid;
    span{
      color: #999;
      font-size: 1.2rem;
    }
  }
</style>
