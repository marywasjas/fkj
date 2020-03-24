<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        <span>您的关系人列表</span>
      </div>
      <v-touch tag="div" @swiperight="switchTab('left')" @swipeleft="switchTab('right')">
        <div ref="box" class="box">
          <div :class="show?'show':''" v-for="(item, index) in now" :key="index">
            <div :class="'my-button ' + (isDelete?'':'isDeleteBox')" v-for="(it, i) in item" :key="i">
              <v-touch tag="div" class="btn-main" @tap="main(it)">{{it.name}}</v-touch>
              <v-touch tag="div" class="btn-btn" @tap="deleteFn(it)"></v-touch>
            </div>
          </div>
          <div class="tips" v-if="now.length===0">
            您还没有关系人，请点击下方‘添加’按钮进行添加!
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
        <v-touch v-if="now.length!==0" tag="span" style="margin-left: 5vw;" :class="'my-button ' + (isDelete?'isDelete':'')"
                 @tap="isDelete = !isDelete">
          <span v-if="!isDelete">移除</span>
          <span v-else>取消</span>
        </v-touch>

      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerPartyRemove } from '@/api/owner'
  import { getParty } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        isDelete: false,
        now: [],
        show: false,
        ownerId: this.$store.state.ownerInfo.id || null,
        partyList: [],
        switchNum: 0,
        page: 0
      }
    },
    mounted() {
      if (!this.ownerId) {
        this.$reload()
        return
      }
      this.$store.commit('now', { type: 'party' })
      this.reset()
      const _this = this
      getParty({ userId: _this.ownerId }).then(response => {
        if (response.code === 0) {
          _this.$store.commit('ownerInfo', { type: 'partyList', value: response.data })
          _this.reset()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      reset() {
        this.partyList = this.$store.state.ownerInfo.partyList || []
        this.now = this.Handle(this.partyList || [], 9)
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
        this.router('/owner/partyAuth/relation')
      },
      main(e) {
        this.router({ name: 'owner-party-details' })
        this.$store.commit('now', { type: 'party', value: e })
      },
      deleteFn(e) {
        this.$openloading()
        const _this = this
        this.confirm('确认将' + e.name + '从关系人列表移除吗？', function() {
          _this.$openloading()
          ownerPartyRemove({ ownerId: _this.ownerId, partyId: e.id }).then(response => {
            if (response.code === 0) {
              _this.partyList.forEach(function(item, index, arr) {
                if (item.id === e.id) {
                  arr.splice(index, 1)
                }
              })
              _this.$store.commit('ownerInfo', { type: 'partyList', value: _this.partyList })
              _this.reset()
              _this.$message({
                message: '移除 ' + e.name + ' 成功！',
                type: 'success'
              })
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
