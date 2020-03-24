<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="form-box">
        <el-form label-width="10vw" label-suffix=":">
          <el-form-item label="访客姓名">
            <span>{{visitorName}}</span>
          </el-form-item>
          <el-form-item label="拜访原因">
            <span v-for="item in reasonList" v-if="item.key === reason">{{item.value}}</span>
          </el-form-item>
          <el-form-item label="拜访住址">
            <span>{{address}}</span>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <div><img style="width: 14vw;" v-if="data" :src="data.visitorPhoto" alt=""></div>
        </div>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/visitor/reason')">上一步</v-touch>
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
  import { commitVisitorInfo } from '@/api/visitor'

  export default {
    name: 'phone',
    data() {
      return {
        isDes: null,
        data: null,
        address: null,
        visitorName: null,
        reason: null,
        reasonList: JSON.parse(window.localStorage.getItem('visit_reason'))
      }
    },
    beforeDestroy() {
      this.isDes = true
    },
    mounted() {
      this.data = this.$store.state.visitorFrom
      this.address = this.data.address ? this.data.address.name : null
      this.visitorName = this.data.cardInfo ? this.data.cardInfo.Name : null
      this.reason = this.data.reason
    },
    methods: {
      commit() {
        this.$openloading()
        const _this = this
        const card = _this.data.cardInfo
        const sex = card.Sex
        const data = {
          buildId: _this.data.address.id,
          reason: _this.data.reason,
          address: card.Address,
          name: card.Name,
          phone: _this.data.visitorPhone,
          sex: sex === '男' ? 1 : (sex === '女' ? 2 : 0),
          nation: card.Nation,
          birthday: card.Birthday,
          picture: card.Base64Photo,
          image: _this.data.visitorPhoto,
          idcard: card.IDNumber,
          idIssued: card.IDIssued,
          valid: card.IssuedData + '-' + card.ValidDate
        }
        commitVisitorInfo(data).then(response => {
          if (response.code === 0) {
            _this.success('信息提交成功，点击退出！', function() {
              _this.$reload()
            })
          } else if (response.code === 1) {
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
    flex-flow: column wrap;
    align-items: center;
    .form-box {
      width: 64%;
      color: #7c7c7c;
      display: flex;
      justify-content: space-between;
      padding: 4.5rem 3rem;
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
