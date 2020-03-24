<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span v-if="backObj.length<=0">请选择要拜访的住址</span>
        <v-touch v-if="backObj.length>0" tag="span">已选：{{backObj[0].name}}栋</v-touch>
        <v-touch v-if="backObj.length>1" tag="span">{{backObj[1].name}}单元</v-touch>
        <v-touch v-if="backObj.length>2" tag="span">{{backObj[2].name}}楼</v-touch>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div  :class="'my-button' + (it.id ? ' room' : '')" v-for="(it, i) in item" @click="main(it)" :key="i">
              {{it.name}}{{backObj.length===0?'栋':(backObj.length===1?'单元':(backObj.length===2?'楼':'号'))}}
            </div>
          </div>
        </div>
      </v-touch>
      <v-touch tag="span" :class="'to-left'+(switchNum>0?'':' readonly')"
               @tap="switchTab('left')"></v-touch>
      <v-touch tag="span" :class="'to-right'+((switchNum<page-1&&page>1)?'':' readonly')"
               @tap="switchTab('right')"></v-touch>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch v-if="backObj.length>0" tag="span" class="my-button" @tap="back">
          <span><i class="el-icon-arrow-left"></i>返回</span>
        </v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'phone',
    data() {
      return {
        title: ['楼栋', '单元', '楼层', '房间'],
        addressId: null,
        now: null,
        show: false,
        backObj: [],
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      this.addressId = null
      this.$store.commit('visitorFrom', { type: 'address' })
      this.now = this.Handle(JSON.parse(window.localStorage.getItem('houseInfo')), 15)
      this.show = true
    },
    methods: {
      back() {
        const _this = this
        _this.$openloading()
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
        _this.$closeLoading()
      },
      main(e) {
        this.$openloading()
        if (e.id) {
          this.commit(e.id, e.name)
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
      commit(id, name) {
        this.$store.commit('visitorFrom', { type: 'address', value: { id: id, name: this.backObj[0].name + '栋' + this.backObj[1].name + '单元' + this.backObj[2].name + '楼' + name + '号' }})
        this.router('/visitor/ownerPhone')
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
      margin: 3vh 2%;
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
