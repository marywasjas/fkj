<template>
  <div class="app-container">
    <div class="fkj-content">
      <div :class="'form-box '+(show.image!==null ? 'hasImg' : '')">
        <el-form :class="((show.parking.length>0?show.parking.length:1) +
        (show.house.length?show.house.length:1)>4? 'isBS':'')" label-width="10vw" label-suffix=":">
            <el-form-item label="业主姓名">
              <span>{{show.ownerName}}</span>
            </el-form-item>
            <el-form-item label="业主电话">
              <span>{{show.ownerPhone}}</span>
            </el-form-item>
            <el-form-item label="我的房产">
              <div v-if="show.house.length>0" v-for="(item, i) in show.house" :class="(i===0?'':'notf')">{{item.name}}</div>
              <span v-if="show.house.length===0" style="color: #ddd;">未选择</span>
            </el-form-item>
            <el-form-item label="我的车位">
              <div v-if="show.parking.length>0" v-for="(item, i) in show.parking" :class="(i===0?'':'notf')">{{item.name}}</div>
              <span v-if="show.parking.length===0" style="color: #ddd;">未选择</span>
            </el-form-item>
        </el-form>
        <div v-if="show.image" class="imgBox">
          <img :src="show.image" alt="">
          <div>
            此头像将用于门禁系统<br />请确保拍摄正常！
          </div>
        </div>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/auth/parking')">
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
  import { commitOwnerAuthInfo } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        show: {
          ownerPhone: null,
          ownerName: null,
          house: [],
          parking: [],
          image: null
        }
      }
    },
    mounted() {
      const data = this.$store.state.ownerAuth
      this.show.ownerPhone = this.$store.state.ownerInfo.ownerPhone
      this.show.ownerName = this.$store.state.ownerInfo.cardInfo.Name
      this.show.image = this.$store.state.ownerAuth.ownerPhoto
      this.show.house = data.house || []
      this.show.parking = data.parking || []
    },
    methods: {
      commit() {
        this.$openloading()
        const _this = this
        const ownerInfo = this.$store.state.ownerInfo
        const card = ownerInfo.cardInfo
        const sex = card.Sex
        const data = {
          source: 2,
          real_name: card.Name,
          phone: ownerInfo.ownerPhone,
          sex: sex === '男' ? 1 : (sex === '女' ? 2 : 0),
          nation: card.Nation,
          birthday: card.Birthday,
          valid: card.IssuedData + '-' + card.ValidDate,
          parkingIds: [],
          houseIds: [],
          address: card.Address,
          name: card.Name,
          IDIssued: card.IDIssued,
          idcard: card.IDNumber,
          picture: card.Base64Photo,
          image: _this.show.image
        }
        if (ownerInfo.ownerPhoto) data.picture = ownerInfo.ownerPhoto
        _this.show.parking.forEach(function(item) {
          data.parkingIds.push(item.id)
        })
        data.parkingIds = data.parkingIds.join(',')
        _this.show.house.forEach(function(item) {
          data.houseIds.push(item.id)
        })
        data.houseIds = data.houseIds.join(',')
        commitOwnerAuthInfo(data).then(response => {
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
      width: 74%;
      color: #7c7c7c;
      justify-content: space-between;
      padding: 2.5rem 3rem;
      border-radius: .8rem;
      margin: 10vh 18%;
      background-color: #ffffff;
      overflow: hidden;
      form {
        float: left;
        width: 100%;
        display: block;
        height: 32vh;
        border-right: 1px solid #ddd;
        position: relative;
        &.isBS{
          overflow-y: auto;
          box-shadow: inset 0 1rem 1.5rem rgba(0,0,0,.04),
          inset -0.5rem 0 1rem rgba(255,255,255,.7),
          inset 0.5rem 0 1rem rgba(255,255,255,.7),
          inset 0 -1rem 1.5rem rgba(0,0,0,.04);
        }
      }
      .imgBox{
        width: 40%;
        float: right;
        color: #bbb;
        font-size: .8rem;
        text-align: center;
        img{
          margin-top: 2rem;
          width: 15vw;
          height: 9vw;
          margin-bottom: 1rem;
          align-items: flex-end;
        }
      }
      &.hasImg{
        width: 64%;
        form {
          width: 60%;
          border-right: none;
        }
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
    .notf{
      margin-top: -1rem;
    }
  }

</style>
