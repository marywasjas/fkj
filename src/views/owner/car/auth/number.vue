<template>
  <div class="app-container">
    <div class="fkj-content">
      <div class="title">
        请输入车牌号码
      </div>
      <div class="input-bar" @touchstart="touchFn" :style="'padding: 6vh 0 '+ (isCarNumHead === 'number' ? 6 : 8) +'vh;'">
        <v-touch autocomplete="off" tag="input" data-type="head" ref="head" placeholder="省" class="my-input car-head" type="text"></v-touch>
        <v-touch autocomplete="off" tag="input" data-type="area" ref="area" class="my-input car-area" placeholder="市" type="text car-area"></v-touch>
        <v-touch autocomplete="off" tag="input" data-type="number" ref="number" class="my-input car-number" spellcheck ="false" placeholder="" type="text"></v-touch>
      </div>
      <carNumHead v-if="isCarNumHead==='head'" :callback="()=>{isCarNumHead = 'area'}"></carNumHead>
      <carKeyboard v-else-if="isCarNumHead==='area'" :callback="(res)=>{isCarNumHead = res}"></carKeyboard>
      <carNum v-else :limit="6" :callback="(res)=>{isCarNumHead = res}"></carNum>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch tag="span" class="my-button" @tap="router('/owner/car')">
          <i class="el-icon-arrow-left"></i>取消</v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch tag="span" class="my-button" @tap="commit('/owner/carAuth/identificationCode')">
          下一步<i class="el-icon-arrow-right"></i></v-touch>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import carNumHead from '@/components/carKeyboard/carNumHead'
  import carKeyboard from '@/components/carKeyboard/carKeyboard'
  import carNum from '@/components/carKeyboard/carNum'
  // ref="keyboard"  :validInputId="'validId'"
  export default {
    data() {
      return {
        isCarNumHead: 'head',
        focusState: false,
        carValid: this.$store.state.base.valid.car
      }
    },
    components: {
      carNumHead,
      carKeyboard,
      carNum
    },
    mounted() {
      this.reInput()
    },
    methods: {
      touchFn(e = window.event) {
        if (e.path[0].className.indexOf('car-head') >= 0) { // 点击的是input
          this.isCarNumHead = 'head'
        } else if (e.path[0].className.indexOf('car-area') >= 0) {
          this.isCarNumHead = 'area'
        } else if (e.path[0].className.indexOf('car-number') >= 0) {
          this.isCarNumHead = 'number'
        }
      },
      commit(url) {
        this.$openloading()
        const data = this.$refs.head.$el.value + this.$refs.area.$el.value + this.$refs.number.$el.value
        if (this.$refs.head.$el.value.length < 1 || this.$refs.area.$el.value < 1 || this.$refs.number.$el.value < 5) {
          this.error('请输入完整车牌号码！')
          this.$closeLoading()
          return
        }
        if (!this.$eval(this.carValid).test(data)) {
          this.error('请输入格式正确的车牌号码！')
          this.$closeLoading()
          return
        }
        this.$store.commit('carAuth', { type: 'number', value: data })
        this.router(url)
      },
      reInput() {
        this.$store.commit('carAuth', { type: 'number' })
        window.FN = this.$refs.head.$el
        this.$refs.head.$el.focus()
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
    .my-button{
      height: 8vh;
      line-height: 8vh;
    }
    .my-input {
      width: 5vw;
      height: 8vh;
      padding: 0;
      text-align: center;
      &:focus{
        padding: 0 0 0 1.35rem;
        text-align: left;
      }
      font-size: 1.5rem;
      font-weight: 500;
      margin-right: 1vw;
      &.car-number{
        width: 20vw;
      }
    }
  }


</style>
