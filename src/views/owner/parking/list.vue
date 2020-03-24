<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>您的车位列表</span>
      </div>
      <div></div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="houseParkingBox">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div class="my-button box-btn readonly" v-for="(it, i) in item" :key="i">
              <div class="btn-main">
                <div class="btn-main-title"><i style="color: #ffa225;" class="iconfont icon-dian"></i>{{it.parkNum + '(' + it.floor + '楼)' + it.carNum + '号'}}</div>
                <div v-if="it.status===1||it.status===0" class="tishi t">
                  <i class="iconfont icon-dengdai"></i>
                  <div>认证中</div>
                </div>
                <div v-if="it.status===3" class="tishi">
                  <i class="iconfont icon-shibai"></i>
                  <div>认证失败</div>
                </div>
                <v-touch v-if="it.status===3" tag="div" @tap="deleteFn(it)"
                         class="my-button btn-main-btn yellow-btn">删 除</v-touch>
                <div v-if="it.status===2" class="btn-main-sub">已绑定车辆：<span style="color: #888;">
                  {{it.carObj?it.carObj.plateno:'(无)'}}
                </span></div>
                <!--<v-touch tag="div" class="my-button btn-main-btn blue-btn"  @tap="car(it)">绑定车辆</v-touch>-->
                <v-touch v-if="it.status===2" tag="div" class="my-button btn-main-btn blue-btn"  @tap="party(it)">车位关系人</v-touch>
                <v-touch v-if="it.status===2" tag="div" @tap="pay(it)" class="my-button btn-main-btn yellow-btn">缴费</v-touch>
              </div>
            </div>
          </div>
          <div class="tips" v-if="now.length===0">
            您还没有认证车位，请点击下方"添加"按钮进行添加
          </div>
        </div>
      </v-touch>
      <div>
        <v-touch tag="span" :class="'to-left '+(switchNum>0?'':' readonly')"
                 @tap="switchTab('left')"></v-touch>
        <v-touch tag="span" :class="'to-right '+((switchNum<page-1&&page>1)?'':' readonly')"
                 @tap="switchTab('right')"></v-touch>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/index')">
          <span><i class="el-icon-arrow-left"></i>返回</span>
        </v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch tag="span" class="my-button" @tap="addFn"><i class="el-icon-plus"></i>添加</v-touch>
      </div>
      <div class="fkj-footer-right">
        <!--<v-touch v-if="$store.state.ownerAuth.ownerPhoto" tag="span" class="my-button" @tap="router('/owner/auth/photo')">上一步</v-touch>-->
        <!--<v-touch tag="span" class="my-button" @tap="commit">下一步</v-touch>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerParkingRemove } from '@/api/owner'
  import { getPark } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        now: [],
        show: true,
        switchNum: 0,
        ownerId: this.$store.state.ownerInfo.id || null,
        parkingList: this.$store.state.ownerInfo.parkingList || [],
        carList: this.$store.state.ownerInfo.carList || [],
        isDelete: false,
        page: 0
      }
    },
    mounted() {
      if (!this.ownerId) {
        this.$reload()
        return
      }
      this.$store.commit('now', { type: 'parking' })
      this.reset()
      const _this = this
      getPark({ userId: _this.ownerId }).then(response => {
        if (response.code === 0) {
          _this.$store.commit('ownerInfo', { type: 'parkingList', value: response.data })
          _this.parkingList = response.data
          _this.reset()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      reset() {
        const _this = this
        const nowList = []
        this.parkingList.forEach(function(item) {
          nowList.push(item)
        })
        nowList.forEach(function(it, index, arr) {
          if (it.carId) {
            _this.carList.forEach(function(item) {
              if (it.carId === item.id) {
                it.carObj = item
              }
            })
          } else {
            it.carObj = null
          }
        })
        this.now = this.Handle(nowList, 3)
      },
      switchTab(e) {
        if (e === 'right') {
          if (this.switchNum < (this.page - 1)) {
            this.switchNum++
          }
        } else {
          if (this.switchNum > 0) {
            this.switchNum--
          }
        }
        this.$refs.box.style.transform = 'translate(-' + 92.24 * this.switchNum + 'vw)'
      },
      Handle(li, size) {
        this.page = Math.ceil(li.length / size)
        this.$refs.box.style.width = 95 * this.page + 'vw'
        const list = []
        for (let i = 0; i < this.page; i++) {
          list[i] = []
          li.forEach(function(item, index) {
            if (index < (i + 1) * size && index >= i * size) list[i].push(item)
          })
        }
        return list
      },
      addFn() {
        this.router('/owner/parkingAdd')
      },
      deleteFn(en) {
        this.$openloading()
        const _this = this
        const e = _this.$deepClone(en)
        _this.confirm('确定将认证失败的(' + e.parkNum + '楼' + e.floor + '号)车位从列表移除吗？', function() {
          _this.$openloading()
          ownerParkingRemove({ ownerId: _this.ownerId, parkId: e.parkId }).then(response => {
            if (response.code === 0) {
              const parkingList = _this.$store.state.ownerInfo.parkingList || []
              parkingList.forEach(function(item, index, arr) {
                if (e.id === item.id) {
                  arr.splice(index, 1)
                }
              })
              _this.$store.commit('ownerInfo', { type: 'parkingList', value: parkingList })
              _this.reset()
            } else {
              _this.error('删除失败！')
            }
            _this.$closeLoading()
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        })
        this.$closeLoading()
      },
      car(e) {
        this.$store.commit('now', { type: 'parking', value: e })
        this.router('/owner/parkingCarAdd')
      },
      party(e) {
        this.$store.commit('now', { type: 'parking', value: e })
        this.router('/owner/parkingParty')
      },
      pay(e) {
        this.router('/owner/parkingPayType')
        this.$store.commit('now', { type: 'parking', value: e })
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .houseParkingBox {
    height: 47vh;
    width: 1000vw;
    transition: transform .8s;
    // transform: translate(-100vw); 84.48   3.3792  84
    & > div {
      float: left;
      margin: 0 -1.6896vw;
      margin-right: 6.0704vw;
      width: 87.8592vw;
      height: 100%;
    }
    .box-btn {
      width: 29%;
      height: 44vh;
      margin: 3vh 2%;
      opacity: 0;
      flex-direction: column;
      padding: .8rem;
      font-size: 1rem;
      transition: opacity .3s;
      text-align: center;
      background: #fff;
      .my-button{
        height: 7vh;
        line-height: 7vh;
      }

      .blue-btn{
        background-color: #62abf5;
        &:hover{
          background-color: #62abf5;
        }
        &:active{
          background-color: #73c3f5;
        }
      }
      .btn-btn{
        height: 15%;
        width: 100%;
        float: right;
        border-radius: 0;
        background: url("../../../assets/img/del-btn-icon.png") no-repeat center, #ffa225;
        background-size: 3vw 3vh;
        transition: all .1s;
        &:active{
          background: url("../../../assets/img/del-btn-icon.png") no-repeat center, #ffd548;
          background-size:  3.3vw 3.3vh;
          transition: all .1s;
        }
      }
      .btn-main{
        width: 100%;
        height: 100%;
        line-height: 4vh;
        transition: all  .1s;
        &-title{
          margin-top: .4rem;
          line-height: 8vh;
          font-size: 1.5rem;
          color: #62abf5;
          padding-right: .3rem;
          letter-spacing: .1rem;
        }
        &-sub{
          color: #808080;
          font-size: 1.1rem;
          height: 7vh;
          line-height: 6vh;
          padding: .5vh 1vh;
          width: 84%;
          margin: 1.8vh 8%;  // 1.4
          background-color: #f0f5f7;
          border-radius: .5rem;
        }
        &-btn{
          width: 60%;
          padding: 0;
          border-radius: .5rem;
          margin: 1.4vh 20%;   //.8
        }
      }
    }
  }
  .show .my-button {
    opacity: 1;
    transition: opacity .2s;
  }
  .tishi.t{
    margin-top: 5vh
  }
</style>
