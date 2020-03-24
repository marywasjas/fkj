<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="payBox">
        <div class="img">
          <img :src="'data:image/png;base64,'+params.url" alt="" />
          <div>
            拍照保存二维码，
            了解更多详细信息
          </div>
        </div>
        <div v-if="params.data" class="payInfo">
          <el-form label-width="10vw" label-suffix=":">
            <el-form-item label="缴费类型">
              <span>{{params.data.type == 1 ? '物业费' : (params.data.type == 2 ? '车位费' : (params.data.type == 3 ? '水费' : (params.data.type == 4 ? '气费' : '未知')))}}</span>
            </el-form-item>
            <el-form-item v-if="params.data.address" label="缴费房屋">
              <span> {{params.data.address}}</span>
            </el-form-item>
            <el-form-item v-if="params.data.code" label="订单编号">
              <span> {{params.data.code}}</span>
            </el-form-item>

            <el-form-item label="支付方式">
              <span> {{params.data.payType === 1 ? '翼支付' : (params.data.payType === 2 ? '支付宝' : (params.data.payType === 3 ? '微信' : (params.data.payType === 4 ? '和包' : '未知' )))}}</span>
            </el-form-item>
            <el-form-item label="支付状态">
              <span v-if="params.data.status === 2">
                支付成功
              </span>
              <span v-if="params.data.status === 3">
                支付关闭
              </span>
              <span v-if="params.data.status === 4">
                支付失败
              </span>
              <span v-if="params.data.status === 5">
                订单删除
              </span>
            </el-form-item>
            <el-form-item label="缴费时间">
              <span> {{params.data.createTime}}</span>
            </el-form-item>
            <el-form-item label="缴费金额">
              <span> {{params.data.money}} 元</span>
            </el-form-item>
            <el-form-item v-if="params.data.ownerName" label="用户姓名">
              <span> {{params.data.ownerName||'(未知)'}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="fkj-footer">
      <div v-if="this.$store.state.ownerInfo.id" class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/housePayType')">返回</v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'phone',
    data() {
      return {
        data: null,
        params: this.$store.state.payInfo.success
      }
    },
    mounted() {
      console.log(this.$store.state.payInfo.success)
    },
    methods: {
      commit() {
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .fkj-content {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    .payInfo {
      border-left: 1px solid #ddd;
      line-height: 1.5;
      font-size: 1.3rem;
    }
  }

  .payBox {
    margin-top: 3vh;
    width: 65%;
    display: flex;
    padding: 6vh 0 5.5vh 0;
    background: #fff;
    border-radius: 1rem;
    .img{
      img{
        display: block;
        width: 10vw;
        padding: 1rem;
        border: 1px solid #f7f7f7;
        box-shadow: 0 0 3rem #e7e7e7;
        background: #fff;
        border-radius: .1rem;
      }
      div{
        width: 10vw;
        text-align: center;
        color: #bbb;
        padding-top: 4vh;
        font-size: 1rem;
      }
      padding: 0 3vw 3vh 4vw;
    }
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
