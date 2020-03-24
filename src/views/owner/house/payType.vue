<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="dashboard-btn-box">
        <v-touch class="my-button" tag="span" @tap="house">
          <div class="icon"><i style="color: #f87e77;" class="iconfont icon-housePay"></i></div>
          <div class="font">物业费</div>
        </v-touch>
        <v-touch class="my-button" tag="span" @tap="water">
          <div class="icon"><i style="color: #41baf8;" class="iconfont icon-waterPay"></i></div>
          <div class="font">水费</div>
        </v-touch>
        <v-touch class="my-button" tag="span" @tap="gas">
          <div class="icon"><i style="color: #ffaf64;" class="iconfont icon-gasPay"></i></div>
          <div class="font">气费</div>
        </v-touch>
      </div>
    </div>
    <div class="fkj-footer">
      <v-touch tag="span" class="my-button" @tap="router('/owner/house')">
        <span><i class="el-icon-arrow-left"></i>返回</span>
      </v-touch>
    </div>
  </div>
</template>
<script type="text/babel">
  import { getHousePayInfo, waterGasBill } from '@/api/pay'
  export default {
    data() {
      return {
        houseObj: this.$store.state.now.house
      }
    },
    mounted() {
      console.log(this.$store.state.now.house)
    },
    methods: {
      house() {
        const _this = this
        _this.$openloading()
        getHousePayInfo({ buildId: _this.houseObj.id }).then(response => {
          if (response.code === 0) {
            if (response.data.list.length >= 0) {
              _this.router('/owner/housePay')
              _this.$store.commit('payInfo', {
                type: 'house', value: {
                  houseId: _this.houseObj.id,
                  ownerId: _this.$store.state.ownerInfo.id,
                  info: response.data
                }
              })
            } else {
              _this.error('该房屋暂无需要缴纳的物业费！')
            }
          } else {
            _this.error(response.msg)
          }
          _this.$closeLoading()
        }).catch(error => {
          _this.$closeLoading()
          console.log(error)
        })
      },
      water() {
        const _this = this
        _this.$openloading()
        if (_this.houseObj.waterNumber) {
          waterGasBill({ userCode: _this.houseObj.waterNumber, type: 1 }).then(response => {
            if (response.code === 0) {
              response.data.ownerId = _this.$store.state.ownerInfo.id
              _this.$store.commit('payInfo', { type: 'water', value: response.data })
              _this.router('/pay/water/commit')
            } else {
              _this.error(response.msg)
              _this.$closeLoading()
            }
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        } else {
          _this.router('/owner/waterPayWater')
        }
      },
      gas() {
        const _this = this
        _this.$openloading()
        if (_this.houseObj.gasNumber) {
          waterGasBill({ userCode: _this.houseObj.gasNumber, type: 2 }).then(response => {
            if (response.code === 0) {
              response.data.ownerId = _this.$store.state.ownerInfo.id
              _this.$store.commit('payInfo', { type: 'gas', value: response.data })
              _this.router('/pay/gas/commit')
            } else {
              _this.error(response.msg)
              _this.$closeLoading()
            }
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        } else {
          _this.router('/owner/gasPayGas')
        }
      }
    }
  }

</script>
<style type="text/sass" lang="scss" scoped>
  .fkj-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    font-size: 2rem;
    text-align: center;
    .icon{
      color: #5d91ff;
      i{
        font-size: 5rem;
      }
    }
    .font{
      font-size: 1.6rem;
      line-height: 3rem!important;
    }
  }
  .dashboard-btn-box {
    padding: 0 6%;
    display: flex;
    height: 95%;
    line-height: 0;
    width: 100%;
    span{
      margin: 5rem 4%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      width: 17%;
      height: calc(100% - 10rem);
      border-radius: .5rem;
      font-size: 2rem;
      color: #666;
      text-align: center;
      box-shadow: 0 0 1rem rgba(0,0,0,.1);
      background-color: rgba(255,255,255,1);
      .icon{
        line-height: 8vh;
      }
      .font{
        width: 8rem;
        line-height: 3rem;
      }
      b{
        margin-top: 5vh;
        display: block;
        width: 2.1vw;
        height: .8vh;
        border-radius: .2rem;
      }
    }
  }

</style>
