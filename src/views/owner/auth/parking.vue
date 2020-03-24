<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>待认证车位列表</span>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="switchBox">
          <div v-if="now.length === 0" class="tips">您还没有选择车位，请点击下方‘添加’按钮进行添加</div>
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div :class="'my-button ' + (isDelete?'':'isDeleteBox')" v-for="(it, i) in item" :key="i">
              <div class="btn-main">{{it.name}}</div>
              <v-touch tag="div" class="btn-btn" @tap="deleteFn(it)"></v-touch>
            </div>
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
        <v-touch tag="span" class="my-button" @tap="router('/owner/auth/house')"><i class="el-icon-arrow-left"></i> 上一步</v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch tag="span" class="my-button mr-5" @tap="addFn"><i class="el-icon-plus"></i> 添加</v-touch>
        <v-touch v-if="now.length > 0" tag="span"  :class="'my-button ' + (isDelete?'isDelete':'')"
                 @tap="isDelete = !isDelete">
          <span v-if="!isDelete">移除</span>
          <span v-else>取消</span>
        </v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch tag="span" class="my-button" @tap="commit">下一步 <i class="el-icon-arrow-right"></i></v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'phone',
    data() {
      return {
        now: [],
        show: false,
        isDelete: false,
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      this.now = this.Handle(this.$store.state.ownerAuth.parking || [], 9)
      this.show = true
    },
    methods: {
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
      commit() {
        const _this = this
        const parkingList = _this.$store.state.ownerAuth.parking
        if (!parkingList || parkingList.length === 0) {
          const houseList = _this.$store.state.ownerAuth.house
          if (!houseList || houseList.length === 0) {
            _this.confirm('你还未选择车位或房子，请选择？')
          } else {
            _this.confirm('你未选取车位哦，确认跳过吗？', function() {
              _this.router('/owner/auth/commit')
            })
          }
        } else {
          _this.router('/owner/auth/commit')
        }
      },
      addFn() {
        this.router('/owner/auth/parkingAdd')
      },
      deleteFn(e) {
        this.$openloading()
        const _this = this
        const parkingList = _this.$store.state.ownerAuth.parking
        console.log(parkingList)
        _this.confirm('确定将(' + e.name + ')从列表移除吗？', function() {
          parkingList.forEach(function(item, i, arr) {
            if (item.id === e.id) {
              arr.splice(i, 1)
            }
          })
          _this.$store.commit('visitorFrom', { type: 'address', value: parkingList })
          _this.now = _this.Handle(_this.$store.state.ownerAuth.parking || [], 9)
          _this.$message({
            message: '移除 ' + e.name + ' 成功！',
            type: 'success'
          })
        })
        this.$closeLoading()
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>

  .switchBox {
    height: 47vh;
    width: 1000vw;
    transition: transform .8s;
    & > div {
      float: left;
      margin: 0 -1.6896vw;
      margin-right: 6.0704vw;
      width: 87.8592vw;
      height: 98%;
    }
    .my-button {
      width: 29%;
      margin: 2.4vh 2%;
      background: rgba(84, 255, 184, .6);
      padding: 0;
      transition: opacity .3s;
      &:active{
        transform: none;
      }
    }
  }

</style>
