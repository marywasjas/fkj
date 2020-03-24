<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="form-box">
        <el-form label-width="10vw" label-suffix=":">
          <el-form-item label="访客姓名">
            <span>{{data.name}}</span>
          </el-form-item>
          <el-form-item label="关系类型">
            <span v-for="item in relationList" v-if="item.key === data.relation">{{item.value}}</span>
            <v-touch tag="span" class="update" @tap="router('/owner/partyUpdate/relation')">修改</v-touch>
          </el-form-item>
          <el-form-item label="访客电话">
            <span>{{data.phone}}</span>
            <v-touch tag="span" class="update" @tap="router('/owner/partyUpdate/phoneNumber')">修改</v-touch>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <div style=" height: 100%;
                overflow: hidden;
                display: flex;
                align-items: center;">
            <img style="width: 12vw;" :src="$url() + '' + data.picture" alt=""></div>
          <v-touch tag="span" style="margin: 5vh 0 0 0" class="update"
                   @tap="router('/owner/partyUpdate/photo')">修改</v-touch>
        </div>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/party')">
          <i class="el-icon-arrow-left"></i>返回</v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        phone: null,
        partyList: this.$store.state.ownerInfo.partyList || [],
        ownerName: this.$store.state.ownerInfo.cardInfo.Name,
        data: {},
        relationList: JSON.parse(window.localStorage.getItem('app_relation_type'))
      }
    },
    mounted() {
      const _this = this
      const card = _this.$store.state.now.party
      this.data = {
        phone: card.phone,
        user_id: _this.$store.state.ownerInfo.id,
        relation: card.relation,
        picture: card.picture,
        name: card.name,
        sex: card.Name,
        nation: card.Name,
        brothday: card.Name,
        address: card.Name,
        idcard: card.Name,
        valid: card.Name
      }
    },
    methods: {
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
      color: #555;
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
