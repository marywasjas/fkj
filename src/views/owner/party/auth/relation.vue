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
        <v-touch tag="span" class="my-button" @tap="router('/owner/party')">
          <i class="el-icon-arrow-left"></i>取消</v-touch>
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
        isDes: null,
        data: null,
        list: JSON.parse(window.localStorage.getItem('app_relation_type'))
      }
    },
    beforeDestroy() {
      this.isDes = true
    },
    mounted() {
      this.$store.commit('partyAuth', { type: 'relation' })
    },
    methods: {
      commit(e) {
        this.$store.commit('partyAuth', { type: 'relation', value: e })
        this.router('/owner/partyAuth/cardInfo')
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
