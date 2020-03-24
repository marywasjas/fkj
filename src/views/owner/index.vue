<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="dashboard-btn-box">
        <v-touch tag="span" class="my-button" @tap="router('/owner/house')">
          <div class="icon"><i style="color: #ffb748;" class="iconfont icon-house"></i></div>
          <div class="font">房屋</div>
        </v-touch>
        <v-touch tag="span" class="my-button" @tap="router('/owner/party')">
          <div class="icon"><i style="color: #fd5f56;" class="iconfont icon-party"></i></div>
          <div class="font">关系人</div>
        </v-touch>
        <v-touch tag="span" class="my-button" @tap="router('/owner/parking')">
          <div class="icon"><i style="color: #41baf8;" class="iconfont icon-parking"></i></div>
          <div class="font">车位</div>
        </v-touch>
        <v-touch tag="span" class="my-button" @tap="router('/owner/car')">
          <div class="icon"><i style="color: #2de4a6;" class="iconfont icon-car"></i></div>
          <div class="font">车辆</div>
        </v-touch>
      </div>
    </div>
    <div class="fkj-footer">
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {}
    },
    components: {},
    mounted() {
      if (!this.$store.state.ownerInfo.id) {
        this.$reload()
      }
    },
    methods: {}
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
      background-color: #fff;
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
