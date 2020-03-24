<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="dashboard-btn-box">
        <v-touch class="my-button" tag="span" @tap="parking">
          <div class="icon"><i style="color: #f87e77;" class="iconfont icon-carPay"></i></div>
          <div class="font">车位费</div>
        </v-touch>
        <!--<v-touch class="my-button" tag="span" @tap="router('/pay/')">
          <div class="icon"><i style="color: #41baf8;" class="iconfont icon-waterPay"></i></div>
          <div class="font">水费</div>
        </v-touch>
        <v-touch class="my-button" tag="span" @tap="router('/pay/')">
          <div class="icon"><i style="color: #ffaf64;" class="iconfont icon-gasPay"></i></div>
          <div class="font">气费</div>
        </v-touch>-->
      </div>
    </div>
    <div class="fkj-footer">
      <v-touch tag="span" class="my-button" @tap="router('/owner/parking')">
        <span><i class="el-icon-arrow-left"></i>返回</span>
      </v-touch>
    </div>
  </div>
</template>
<script type="text/babel">
  import { getParkingPayInfo } from '@/api/pay'
  export default {
    data() {
      return {
        parkingObj: this.$store.state.now.parking
      }
    },
    mounted() {
    },
    methods: {
      parking() {
        const _this = this
        _this.$openloading()
        getParkingPayInfo({ parkId: _this.parkingObj.parkId }).then(response => {
          if (response.code === 0) {
            if (response.data.list.length >= 0) {
              _this.router('/owner/parkingPay')
              _this.$store.commit('payInfo', {
                type: 'parking', value: {
                  parkingId: _this.parkingObj.parkId,
                  ownerId: _this.$store.state.ownerInfo.id,
                  info: response.data
                }
              })
            } else {
              _this.error('该车位暂无需要缴纳的车位费！')
            }
          } else {
            _this.error(response.msg)
          }
          _this.$closeLoading()
        }).catch(error => {
          _this.$closeLoading()
          console.log(error)
        })
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
