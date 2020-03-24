<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span v-if="backObj.length<=0">请选择要添加的车位</span>
        <v-touch v-if="backObj.length>0" tag="span">已选：{{backObj[0].name}}-</v-touch>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <v-touch tag="div"  :class="'my-button' + (it.id ? ' room' : '')" v-for="(it, i) in item"
                     @tap="main(it)" :key="i">{{it.name}}</v-touch>
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
        <v-touch tag="span" class="my-button" @tap="router('/owner/parking')">
          <span>取消</span>
        </v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch v-if="backObj.length>0" tag="span" class="my-button" @tap="back">
          <span>返回</span>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerParkingAdd } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        title: ['楼层'],
        now: [],
        show: false,
        backObj: [],
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      this.now = this.Handle(JSON.parse(window.localStorage.getItem('parkingInfo')), 15)
      this.show = true
    },
    methods: {
      back() {
        const _this = this
        this.$openloading()
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
          this.commit({ id: e.id, name: e.name })
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
      commit(e) {
        const _this = this
        this.$openloading()
        _this.confirm('确定添加' + _this.backObj[0].name + e.name + '认证吗？', function() {
          _this.$openloading()
          ownerParkingAdd({ ownerId: _this.$store.state.ownerInfo.id, parkId: e.id }).then(response => {
            if (response.code === 0) {
              _this.success('添加申请已提交，请等待审核！', function() {
                _this.router('/owner/parking')
              })
              const parkingList = _this.$store.state.ownerInfo.parkingList || []
              parkingList.push(response.data)
              _this.$store.commit('ownerInfo', { value: parkingList, type: 'parkingList' })
            } else {
              _this.error(response.msg)
            }
            _this.$closeLoading()
          }).catch(error => {
            _this.$closeLoading()
            console.log(error)
          })
        })
        this.$closeLoading()
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
.fkj-content{
  .title{
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
