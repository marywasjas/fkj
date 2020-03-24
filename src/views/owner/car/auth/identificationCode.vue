<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        请输入车辆车架号
      </div>
      <div class="input-bar">
        <v-touch autocomplete="off" tag="input" data-type="number" ref="number"
                 spellcheck ="false" class="my-input" placeholder="" type="text"></v-touch>
      </div>
      <carNum :limit="17"></carNum>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/carAuth/number')">
          <i class="el-icon-arrow-left"></i>上一步</v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch tag="span" class="my-button" @tap="commit('/owner/carAuth/cardInfo')">
          下一步<i class="el-icon-arrow-right"></i></v-touch>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import carNum from '@/components/carKeyboard/carNum'
  export default {
    data() {
      return {
        focusState: false
      }
    },
    components: {
      carNum
    },
    mounted() {
      this.reInput()
    },
    methods: {
      commit(url) {
        this.$openloading()
        const data = this.$refs.number.$el.value
        if (data.length < 17) {
          this.error('请输入完整的车架号！')
          this.$closeLoading()
          return
        }
        /* if (!new RegExp(/^(\\d{17})$/).test(data)) {
          this.error('请输入格式正确的车架号！')
          return
        }*/
        this.$store.commit('carAuth', { type: 'identificationCode', value: data })
        this.router(url)
      },
      reInput() {
        this.$store.commit('carAuth', { type: 'identificationCode' })
        window.FN = this.$refs.number.$el
        this.$refs.number.$el.focus()
      }
    }
  }

</script>
<style type="text/sass" lang="scss" scoped>
  .fkj-content{
    display: flex;
    flex-direction: column;
  }
  .input-bar{
    display: flex;
    justify-content: center;
    padding: 6vh 0 8vh;
    .my-button{
      height: 8vh;
      line-height: 8vh;
    }
    .my-input {
      width: 30vw;
      height: 8vh;
      padding: 0 1rem;
      &:focus{
        text-align: left;
      }
      font-size: 1.5rem;
      font-weight: 500;
      margin-right: 1vw;
    }
  }


</style>
