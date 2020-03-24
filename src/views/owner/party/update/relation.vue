<template>
  <div class="app-container">
    <div class="fkj-content">
      <ul class="select-box">
        <v-touch v-for="item in list" :key="item.key" tag="li" @tap="commit(item.key)" class="my-button">
          {{item.value}}
        </v-touch>
      </ul>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/partyDetails')">
          <i class="el-icon-arrow-left"></i>取消</v-touch>
      </div>
      <div class="fkj-footer-right">
      </div>
    </div>
  </div>
</template>
<script>
  import { ownerPartyUpdate } from '@/api/owner'
  export default {
    name: 'phone',
    data() {
      return {
        isDes: null,
        data: null,
        ownerId: this.$store.state.ownerInfo.id || null,
        partyObj: this.$store.state.now.party || null,
        list: JSON.parse(window.localStorage.getItem('app_relation_type'))
      }
    },
    mounted() {
    },
    beforeDestroy() {
      this.isDes = true
    },
    methods: {
      commit(e) {
        const _this = this
        _this.$openloading()
        ownerPartyUpdate({ relation: e, id: this.partyObj.id, ownerId: this.ownerId }).then(response => {
          _this.$closeLoading()
          if (_this.isDes) return
          if (response.code === 0) {
            const partyList = _this.$store.state.ownerInfo.partyList || []
            const partyObj = _this.$store.state.now.party || null
            partyObj.relation = e
            partyList.forEach(function(item, index, arr) {
              if (item.id === partyObj.id) {
                item.relation = e
              }
            })
            _this.$store.commit('now', { type: 'party', value: partyObj })
            _this.$store.commit('ownerInfo', { type: 'partyList', value: partyList })
            _this.router('/owner/partyDetails')
          } else if (response.code === 1) {
            _this.error('提交失败！', function() {
              _this.$closeLoading()
            })
          }
        }).catch(error => {
          _this.$closeLoading()
          if (_this.isDes) return
          console.log(error)
        })
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .select-box{
    li{
      width: 60%;
      margin: 1.5vh 20%;
    }
  }
</style>
