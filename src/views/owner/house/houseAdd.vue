<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span v-if="backObj.length<=0">请选择要添加的房屋</span>
        <v-touch v-if="backObj.length>0" tag="span">已选：{{backObj[0].name}}栋</v-touch>
        <v-touch v-if="backObj.length>1" tag="span">{{backObj[1].name}}单元</v-touch>
        <v-touch v-if="backObj.length>2" tag="span">{{backObj[2].name}}楼</v-touch>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <v-touch tag="div"  :class="'my-button' + (it.id ? ' room' : '')" v-for="(it, i) in item"
                     @tap="main(it)" :key="i">
              {{it.name}}{{backObj.length===0?'栋':(backObj.length===1?'单元':(backObj.length===2?'楼':'号'))}}
            </v-touch>
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
        <v-touch tag="span" class="my-button" @tap="router('/owner/house')">
          <span><i class="el-icon-arrow-left"></i>取消</span>
        </v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch v-if="backObj.length>0" tag="span" class="my-button up-btn" @tap="back">
          <span>返回</span>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerHouseAdd } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        title: ['楼栋', '单元', '楼层', '房间'],
        houseList: this.$store.state.ownerInfo.houseList || [],
        ownerId: this.$store.state.ownerInfo.id || null,
        addressId: null,
        now: null,
        show: false,
        backObj: [],
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      if (!this.ownerId) {
        this.$reload()
      }
      this.addressId = null
      this.now = this.Handle(JSON.parse(window.localStorage.getItem('houseInfo')), 15)
      this.show = true
    },
    methods: {
      back() {
        this.$openloading()
        const _this = this
        if (_this.backObj.length > 0) {
          _this.show = false
          const last = _this.backObj.pop()
          _this.now = last.list
          _this.page = last.page
          _this.switchNum = last.switchNum
          _this.$refs.box.style.width = last.width
          _this.$refs.box.style.transition = 'transform 0.01s'
          _this.$refs.box.style.transform = 'translate(-' + 92.24 * _this.switchNum + 'vw)'
          setTimeout(function() {
            _this.show = true
            _this.$refs.box.style.transition = 'transform .8s'
          }, 10)
        } else {
          _this.$reload()
        }
        this.$closeLoading()
      },
      main(e) {
        this.$openloading()
        if (e.id) {
          this.commit(e)
        } else {
          this.show = false
          const _this = this
          setTimeout(function() {
            _this.backObj.push({
              width: _this.$refs.box.style.width,
              list: _this.now,
              page: _this.page,
              name: e.name,
              switchNum: _this.switchNum
            })
            _this.switchNum = 0
            _this.$refs.box.style.transition = 'transform 0.01s'
            _this.$refs.box.style.transform = 'translate(0vw)'
            _this.now = _this.Handle(e.childList, (e.childList[0].id ? 12 : 15))
            setTimeout(function() {
              _this.show = true
              _this.$refs.box.style.transition = 'transform .8s'
            }, 200)
          }, 200)
        }
        this.$closeLoading()
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
      commit(en) {
        const _this = this
        _this.$openloading()
        const e = _this.$deepClone(en)
        _this.confirm('确定添加' + _this.backObj[0].name + '栋' + _this.backObj[1].name + '单元' + _this.backObj[2].name + '楼' + e.name + '号认证吗？', function() {
          _this.$openloading()
          ownerHouseAdd({ ownerId: _this.ownerId, houseId: e.id }).then(response => {
            if (response.code === 0) {
              const houseList = _this.$store.state.ownerInfo.houseList || []
              houseList.push(response.data)
              console.log(houseList)
              _this.$store.commit('ownerInfo', { value: houseList, type: 'houseList' })
              _this.success('添加申请已提交，请等待审核！', function() {
                _this.router('/owner/house')
              })
            } else {
              _this.error(response.msg)
            }
            _this.$closeLoading()
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        })
        _this.$closeLoading()
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>

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
      width: 16%;
      margin: 2.4vh 2%;
      background: rgba(84, 255, 184, .6);
      opacity: 0;
      padding: 0;
      transition: opacity .3s;
      &.room {
        width: 21%;
      }
    }
  }
.show .my-button{
  opacity: 1;
  transition: opacity .2s;
}
</style>
