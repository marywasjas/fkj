<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>{{parkingObj.name}}</span>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div :class="'my-button' + (isSelList[it.id]? '':' isno')" v-for="(it, i) in item" :key="i">
              <v-touch tag="div" @tap="update(it)" class="btn-main">{{it.name}}
              </v-touch>
              <v-touch  tag="div" @tap="main(it)" class="btn-btn">
                <transition name="fade">
                  <i v-if="isSelList[it.id]" class="iconfont icon-isSel"></i>
                </transition>
              </v-touch>
            </div>
          </div>
          <div class="tips" v-if="now.length===0">
            您还没有关系人，请进入关系人界面进行添加!
          </div>
        </div>
      </v-touch>
      <div>
        <v-touch tag="span" :class="'to-left'+(switchNum>0?'':' readonly')"
                 @tap="switchTab('left')"></v-touch>
        <v-touch tag="span" :class="'to-right'+((switchNum<page-1&&page>1)?'':' readonly')"
                 @tap="switchTab('right')"></v-touch>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button blue-btn" @tap="router('/owner/parking')">
          <span><i class="el-icon-arrow-left"></i>返回</span>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerParkingPartyRemove, ownerParkingPartyAdd } from '@/api/owner'
  import { getParkParty } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        now: [],
        parkingObj: this.$store.state.now.parking || null,
        selList: [],
        noSelList: [],
        ownerId: this.$store.state.ownerInfo.id || null,
        show: false,
        switchNum: 0,
        page: 0,
        isSelList: []
      }
    },
    mounted() {
      if (!this.ownerId) {
        this.$reload()
        return
      }
      if (!this.parkingObj) {
        this.router('/owner/parking')
        return
      }
      this.reset()
    },
    methods: {
      reset() {
        const _this = this
        getParkParty({ userId: _this.ownerId }).then(response => {
          if (response.code === 0) {
            _this.$store.commit('ownerInfo', { type: 'parkingPartyList', value: response.data })
          }
        }).catch(error => {
          console.log(error)
        })
        const parkingPartyList = this.$store.state.ownerInfo.parkingPartyList || []
        const partyList = this.$store.state.ownerInfo.partyList || []
        const A = []
        parkingPartyList.forEach(function(item) {
          if (item.parkId === _this.parkingObj.parkId) {
            A[item.partyId] = true
          }
        })
        _this.selList = []
        _this.noSelList = []
        console.log(partyList)
        partyList.forEach(function(item) {
          console.log(item.partyId)
          if (A[item.id]) {
            _this.isSelList[item.id] = true
            _this.selList.push(item)
          } else {
            _this.isSelList[item.id] = false
            _this.noSelList.push(item)
          }
        })
        _this.now = this.Handle(_this.selList.concat(_this.noSelList), 12)
        _this.show = true
      },
      main(e) {
        this.$openloading()
        const _this = this
        const parkingPartyList = this.$store.state.ownerInfo.parkingPartyList.slice() || []
        if (!_this.isSelList[e.id]) {
          ownerParkingPartyAdd({ ownerId: _this.ownerId, parkId: _this.parkingObj.parkId, partyId: e.id }).then(response => {
            if (response.code === 0) {
              parkingPartyList.push({ id: response.data, parkId: _this.parkingObj.parkId, partyId: e.id })
              _this.$store.commit('ownerInfo', { type: 'parkingPartyList', value: parkingPartyList })
              _this.$set(_this.isSelList, e.id, true)
              _this.$message({
                message: '绑定关系人 ' + e.name + ' 成功！',
                type: 'success'
              })
            } else {
              if (response.msg !== '重复绑定！') _this.error(response.msg)
            }
            _this.$closeLoading()
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        } else {
          let ids
          parkingPartyList.forEach(function(item, index, arr) {
            if (e.id === item.partyId && _this.parkingObj.parkId === item.parkId) {
              ids = item.id
            }
          })
          ownerParkingPartyRemove({ ids: ids }).then(response => {
            if (response.code === 0) {
              parkingPartyList.forEach(function(item, index, arr) {
                if (item.id === ids) {
                  arr.splice(index, 1)
                }
              })
              _this.$store.commit('ownerInfo', { type: 'parkingPartyList', value: parkingPartyList })
              _this.$set(_this.isSelList, e.id, false)
              _this.$message({
                message: '解除关系人 ' + e.name + ' 的绑定！',
                type: 'success'
              })
            } else {
              _this.error(response.msg)
            }
            _this.$closeLoading()
          }).catch(error => {
            console.log(error)
            _this.$closeLoading()
          })
        }
      },
      update() {

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
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .fkj-content {
    .title {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.5rem;
      text-align: center;
    }
  }

  .box {
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
    .my-button {
      width: 21%;
      margin: 2.4vh 2%;
      background: rgba(84, 255, 184, .6);
      opacity: 0;
      padding: 0;
      transition: all .3s;
      .btn-btn{
        float: right;
        width: 5.7vw;
        height: 100%;
        border-radius: 0 .66rem .66rem 0;
        background: transparent;
        background-size: 40% 40%;
        transition: width .2s;
        position: relative;
        text-align: center;
        &:after{
          content:'';
          position: absolute;
          background-color: rgba(255,255,255,1);
          width: 50%;
          border-radius: .4rem;
          height: 50%;
          left: 25%;
          top: 25%;
        }

        .icon-isSel{
          font-size: 1.6rem;
          position: relative;
          margin-left: .3rem;
          z-index: 2;
          color: #62ff4f;
        }
      }
      &.isno{
        transition: all .3s;
        background-color: rgba(200,200,200,.4);
        .btn-btn{
          &:after{
            transition: all .3s;
            background-color: rgba(255,255,255,.5);
          }
        }
      }
    }
  }
  .show .my-button {
    opacity: 1;
    transition: opacity .2s;
  }
</style>
