<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="form-box">
        <el-form label-width="10vw" label-suffix=":">
          <el-form-item label="访客姓名">
            <span>{{data.name}}</span>
          </el-form-item>
          <el-form-item label="业主姓名">
            <span>{{ownerName}}</span>
          </el-form-item>
          <el-form-item label="关系类型">
            <span v-for="item in relationList" v-if="item.key === data.relation">{{item.value}}</span>
          </el-form-item>
          <el-form-item label="访客电话">
            <span>{{data.phone}}</span>
          </el-form-item>
        </el-form>
        <div class="imgBox">
          <img style="width: 16vw;height: 9.5vw;" :src="data.image" alt="">
        </div>
      </div>

    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/partyAuth/photo')">
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
  import { ownerPartyAdd } from '@/api/owner'

  export default {
    name: '',
    data() {
      return {
        isDes: null,
        phone: null,
        partyList: this.$store.state.ownerInfo.partyList || [],
        ownerName: this.$store.state.ownerInfo.cardInfo.Name,
        ownerId: this.$store.state.ownerInfo.id,
        data: {},
        relationList: JSON.parse(window.localStorage.getItem('app_relation_type'))
      }
    },
    mounted() {
      const _this = this
      const info = _this.$store.state.partyAuth
      const card = info.cardInfo
      const sex = card.Sex
      _this.data = {
        phone: info.phone,
        relation: info.relation,
        image: info.partyPhoto,
        name: card.Name,
        sex: sex === '男' ? 1 : (sex === '女' ? 2 : 0),
        nation: card.Nation,
        birthday: card.Birthday,
        picture: card.Base64Photo,
        idcard: card.IDNumber,
        idIssued: card.IDIssued,
        ownerId: _this.ownerId,
        valid: card.IssuedData + '-' + card.ValidDate
      }
    },
    beforeDestroy() {
      this.isDes = true
    },
    methods: {
      commit() {
        this.$openloading()
        const _this = this
        ownerPartyAdd(_this.data).then(response => {
          _this.$closeLoading()
          if (this.isDes) return
          if (response.code === 0) {
            const item = _this.$deepClone(_this.data)
            item.id = response.data.id
            item.picture = response.data.picture
            _this.partyList.push(item)
            _this.$store.commit('ownerInfo', { type: 'partyList', value: _this.partyList })
            _this.router('/owner/party')
          } else {
            _this.error(response.msg)
          }
        }).catch(error => {
          _this.$closeLoading()
          if (this.isDes) return
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
      padding: 4.5rem 4rem 4rem 2rem;
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
      .imgBox{
        display: flex;
        align-items: center;
      }
    }
    .update{
      color: #dd9db5;
      font-size: 1rem;
      padding: .1rem .3rem;
      border: 1px solid #dd9db5;
      margin-left: .5vw;
      border-radius: .2rem;
    }
  }


</style>
