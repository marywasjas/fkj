<template>
  <div class="adv-box"> <!--router('/')-->
    <div class="demo">
      <!-- <div id="msg" v-if="msg">
        <marquee behavior="scroll" direction="left">
          {{msg}}
        </marquee>
      </div> -->
      <transition-group name="flip-list" tag="ul">
        <li v-for="curImg in currImgs" v-bind:key="curImg" class="list-item">
          <!-- <img :class=" msg? 'adimgMsg' : 'adimg'" :src="$store.state.base.imgUrl + curImg"/> -->
          <img class="adimg" :src="$store.state.base.imgUrl + curImg"/>
        </li>
      </transition-group>
    </div>
    <div class="adv-main">
      <div class="tit">智慧江油</div>
      <div class="img">
        <ul>
          <li class="tips" style="padding-top: 0;">
            <div class="tips1"></div>
            <div class="tips2"></div>
          </li>
          <li>
            <div  class="img">
              <img :src="appimg" alt="">
            </div>
            <div class="font">
              下载智慧江油APP
            </div>
          </li>
          <li>
            <div  class="img">
              <img :src="gzhimg" alt="">
            </div>
            <div class="font">
              关注智慧江油公众号
            </div>
          </li>
          <li class="tips" style="padding: 0;">
            <div class="tips3"></div>
            <div class="tips4"></div>
          </li>
        </ul>
      </div>
      <v-touch tag="el-button"  @tap="router('/')" type="primary" class="btn"
               style="background: #28bb87;margin: 4rem 0;color: #fff;margin:3rem 0;">开始查询</v-touch>
      <!--<v-touch tag="el-button"  @tap="router('/')" class="btn"
               style="margin-left: 0;background: #fff;">帮助</v-touch>-->
      <div class="footer-font">
        云享科技智慧有限公司
      </div>
    </div>
  </div>
</template>

<script>
  import { getAdvert,getBulletin,getQRCodeAPP,getQRCodeGZH } from '@/api/common'

  export default {
    data() {
      return {
        isDes: false,
        appimg:'',
        gzhimg:'',
        currImgs: [],
        list: [],
        t: null,
        index: 0,
        msg:''
      }
    },
    mounted() {
      this.getAdverts()
      this.getMsg()
      this.getQRCodeAPP()
      this.getQRCodeGZH()
    },
    destroyed() {
      this.isDes = true
      clearInterval(this.t)
    },
    methods: {
      getMsg(){
        getBulletin().then(response => {
          if (response.code === 0) {
            var str = ''
            response.data.forEach((item,key) => {
              const strItem = '公告'+Number(key+1)+'：'+item.content + '！ ！ ！'
              str +=strItem
            });
            this.msg = str
          }
        }).catch(error => {})
      },
      getQRCodeAPP(){
        getQRCodeAPP().then(response => {
          if (response.code === 0) {
            console.log(response.msg)
            if(response.msg){
              this.appimg = 'data:image/png;base64,'+response.msg
            }
          }
        }).catch(error => {})
      },
      getQRCodeGZH(){
        getQRCodeGZH().then(response => {
          if (response.code === 0) {
            if(response.dtaa.picture){
              this.gzhimg=this.$store.state.base.imgUrl+response.data.picture
            }
          }
        }).catch(error => {})
      },
      getAdverts() {
        getAdvert().then(response => {
          if (this.isDes) return
          if (response.code === 0) {
            this.list = response.data || []
          }
          this.currImgs = [this.list[0].picture]
          this.startChange()
        }).catch(error => {
          if (this.isDes) return
        })
      },
      startChange: function() {
        const _this = this
        this.t = setInterval(() => {
          if (this.isDes) return
          if (_this.index < _this.list.length - 1) {
            _this.index++
          } else {
            _this.index = 0
          }
          _this.currImgs.splice(0, 1, _this.list[_this.index].picture)
        }, 30000)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #msg{
    width: 100%;
    height: 2.8rem;
    line-height:2.8rem;
    background: #f0f5f7;
    color: #8B8B8B;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.2rem;
    z-index: 99;
  }
  .adv-box {
    width: 100%;
    height: 100%;
    & > .demo {
      height: 100%;
      width: calc(100% - 25.1rem);
      float: left;
      position: relative;
      ul, li {
        width: 100%;

      }
    }
    .adv-main {
      width: 25.1rem;
      padding: .5rem 4rem;
      float: left;
      height: 100%;
      background: #f0f5f8;
      .tit{
        height: 6rem;
        line-height: 6rem;
        font-size: 1.8rem;
        text-align: center;
        color: #555;
      }
      ul{
        margin: 0;
        padding: 2rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: .5rem;
        li{
          padding: .8rem 0 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .img {
            width: 7.5rem;
            background: #ddd;
            height: 7.5rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .font{
            height: 3rem;
            line-height: 3rem;
            text-align: center;
          }
        }
        .tips{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .tips1,.tips2,.tips3,.tips4{
            width: 1rem;
            height: 1rem;
            position: relative;
            background: #3f82db;
            &:before{
              content: '';
              display: block;
              position: absolute;
              width: .86rem;
              height: .86rem;
              background: #fff;
              z-index: 3;
              top: 0;
              left: 0;
            }
          }
          .tips1,.tips2{
            &:before{
              top: .14rem;
            }
          }
          .tips1,.tips3{
            &:before{
              left: .14rem;
            }
          }

        }
      }

    }
  }
  .footer-font{
    font-size: .9rem;
    text-align: center;
    display: flex;
    align-items: center;
    color: #999;
    justify-content: space-between;
    &:after,&:before{
      content: '';
      display: block;
      width: 3.2rem;
      height: .1rem;
      background: #999;
    }
  }
  .adimg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .adimgMsg {
    top: 2.8rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: calc(100% - 2.8rem);
  }
  .btn{
    width: 100%;line-height: 3rem;margin-top: 1rem
  }

  .flip-list-enter-active, .flip-list-leave-active {
    transition: opacity 1.3s;
  }

  .flip-list-enter, .flip-list-leave-active {
    opacity: 0;
  }
</style>
