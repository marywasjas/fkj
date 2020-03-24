<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>待认证房屋列表</span>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="switchBox">
          <div v-if="now.length === 0" class="tips">您还没有选择房屋，请点击下方‘添加’按钮进行添加</div>
          <div v-for="(item, index) in now" :key="index">
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
        <v-touch v-if="$store.state.ownerAuth.ownerPhoto" tag="span" class="my-button"
                 @tap="router('/owner/auth/photo')"><i class="el-icon-arrow-left"></i> 上一步</v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch tag="span" class="my-button mr-5" @tap="addFn"><i class="el-icon-plus"></i>添加</v-touch>
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
        isDelete: false,
        now: [],
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      this.now = this.Handle(this.$store.state.ownerAuth.house || [], 9)
      // this.now = this.Handle(JSON.parse(window.localStorage.getItem('buildInfo')), 9)
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
        if (_this.$store.state.ownerAuth.house && _this.$store.state.ownerAuth.house.length !== 0) {
          _this.router('/owner/auth/parking')
        } else {
          _this.confirm('你未选取房屋哦，确认跳过吗？', function() {
            _this.router('/owner/auth/parking')
          })
        }
      },
      addFn() {
        this.router('/owner/auth/houseAdd')
      },
      deleteFn(e) {
        this.$openloading()
        const _this = this
        const houseList = _this.$store.state.ownerAuth.house
        _this.confirm('确定将(' + e.name + ')从列表移除吗？', function() {
          houseList.forEach(function(item, i, arr) {
            if (item.id === e.id) {
              arr.splice(i, 1)
            }
          })
          _this.$store.commit('visitorFrom', { type: 'address', value: houseList })
          _this.now = _this.Handle(_this.$store.state.ownerAuth.house || [], 9)
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
      margin: 3vh 2%;
      background: rgba(84, 255, 184, .6);
      padding: 0;
      transition: opacity .3s;
      &:active{
        transform: none;
      }
    }
  }

</style>
