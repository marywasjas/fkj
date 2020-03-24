<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>您的车辆列表</span>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div :class="'my-button readonly ' + (isDelete?'':'isDeleteBox')" v-for="(it, i) in item" :key="i">
              <v-touch tag="div" class="btn-main">{{it.plateno}}</v-touch>
              <v-touch tag="div" class="btn-btn" @tap="deleteFn(it)"></v-touch>
            </div>
          </div>
          <div class="tips" v-if="now.length===0">
            您还没有添加车辆，请点击下方‘添加’按钮进行添加!
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
        <v-touch tag="span" class="my-button" @tap="router('/owner/index')">
          <span><i class="el-icon-arrow-left"></i>返回</span>
        </v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch tag="span" class="my-button" @tap="addFn">
          <i class="el-icon-plus"></i>添加</v-touch>
        <v-touch  v-if="now.length!==0" tag="span" style="margin-left: 5vw;" :class="'my-button ' + (isDelete?'isDelete':'')"
                 @tap="isDelete = !isDelete">
          <span v-if="!isDelete">移除</span>
          <span v-else>取消</span>
        </v-touch>

      </div>
      <div class="fkj-footer-right">
        <!--<v-touch v-if="$store.state.ownerAuth.ownerPhoto" tag="span" class="my-button" @tap="router('/owner/auth/photo')">上一步</v-touch>-->
        <!--<v-touch tag="span" class="my-button" @tap="commit">下一步</v-touch>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerCarRemove } from '@/api/owner'
  import { getCar } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        isDelete: false,
        now: [],
        show: false,
        ownerId: this.$store.state.ownerInfo.id || null,
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      if (!this.ownerId) {
        this.$reload()
        return
      }
      this.reset()
      const _this = this
      getCar({ userId: _this.ownerId }).then(response => {
        if (response.code === 0) {
          _this.$store.commit('ownerInfo', { type: 'carList', value: response.data })
          _this.reset()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      reset() {
        this.now = this.Handle(this.$store.state.ownerInfo.carList || [], 9)
        this.show = true
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
        this.router('/owner/carAuth/number')
      },
      deleteFn(e) {
        this.$openloading()
        const _this = this
        this.confirm('确认将车牌为' + e.plateno + '的车辆从车辆列表移除吗？', function() {
          _this.$openloading()
          ownerCarRemove({ ownerId: _this.ownerId, carId: e.id }).then(response => {
            if (response.code === 0) {
              const carList = _this.$store.state.ownerInfo.carList
              carList.forEach(function(item, index, arr) {
                if (e.id === item.id) {
                  arr.splice(index, 1)
                }
              })
              _this.$store.commit('ownerInfo', { type: 'carList', value: carList })
              _this.reset()
              _this.$message({
                message: '移除 ' + e.plateno + ' 成功！',
                type: 'success'
              })
            }
            _this.$closeLoading()
          }).catch(error => {
            console.log(error)
            _this.$closeLoading()
          })
        })
        this.$closeLoading()
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
      width: 29%;
      margin: 2.4vh 2%;
      background: rgba(84, 255, 184, .6);
      opacity: 0;
      padding: 0;
      transition: opacity .3s;
    }
  }

  .show .my-button {
    opacity: 1;
    transition: opacity .2s;
  }
</style>
