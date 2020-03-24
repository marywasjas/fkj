<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="form-box">
        <el-form label-width="10vw" :model="show" label-suffix=":">
          <el-form-item label="车牌号码">
            <span>{{show.number}}</span>
          </el-form-item>
          <el-form-item label="车架号码">
            <span>{{show.identificationCode}}</span>
          </el-form-item>
          <el-form-item label="车主姓名">
            <span>{{show.name}}</span>
          </el-form-item>
          <el-form-item label="车主手机">
            <span>{{show.phoneNumber}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/carAuth/phoneNumber')">
          <i class="el-icon-arrow-left"></i>上一步</v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch tag="span" class="my-button" @tap="commit">提交</v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerCarAdd } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        show: {
          number: null,
          identificationCode: null,
          ownerId: this.$store.state.ownerInfo.id,
          selOwner: null,
          name: this.$store.state.carAuth.cardInfo.Name,
          phoneNumber: this.$store.state.carAuth.phoneNumber
        }
      }
    },
    mounted() {
      const data = this.$store.state.carAuth
      this.show.number = data.number
      this.show.identificationCode = data.identificationCode
      this.show.selOwner = data.selOwner
    },
    methods: {
      commit() {
        this.$openloading()
        const _this = this
        const carAuth = this.$store.state.carAuth
        const data = {
          plateno: carAuth.number,
          ownerId: _this.show.ownerId,
          phone: carAuth.phoneNumber,
          identificationCode: carAuth.identificationCode,
          idCard: carAuth.cardInfo.IDNumber
        }
        ownerCarAdd(data).then(response => {
          if (response.code === 0) {
            const carList = _this.$store.state.ownerInfo.carList
            delete data.ownerId
            data.id = response.data
            carList.push(data)
            _this.$store.commit('ownerInfo', { type: 'carList', value: carList })
            this.router('/owner/car')
          } else {
            this.error(response.msg)
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
    flex-flow: column wrap;
    align-items: center;
    .form-box {
      width: 50%;
      color: #7c7c7c;
      display: flex;
      justify-content: space-between;
      padding: 4.5rem 5rem;
      border-radius: .8rem;
      margin: 10vh 18%;
      background-color: #ffffff;
      overflow: hidden;
      form {
        overflow-y: auto;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
      }
    }
  }
</style>
