<template>
  <div class="dashboard-container" @touchstart.prevent="reSt">
    <!-- <div id="msg" v-if="msg">
      <marquee behavior="scroll" direction="left">
        {{msg}}
      </marquee>
    </div> -->
    <div class="dashboard-head">
      <div class="dashboard-head-left">
        智慧江油-自助服务机
      </div>
      <div class="dashboard-head-right">
        {{time}}
      </div>
    </div>
    <div class="dashboard-btn-box">
      <v-touch tag="span" @tap="router('/visitor/address')">
        <div class="icon"><img src="../../assets/img/indexIcon1.png" alt=""></div>
        <div class="font">访客</div>
      </v-touch>
      <v-touch tag="span" @tap="router('/owner/cardInfo')">
        <div class="icon"><img src="../../assets/img/indexIcon2.png" alt=""></div>
        <div class="font">业主</div>
      </v-touch>
      <v-touch tag="span" @tap="router('/pay/index')">
        <div class="icon"><img src="../../assets/img/indexIcon3.png" alt=""></div>
        <div class="font">缴费</div>
      </v-touch>
      <v-touch class="readonly" tag="span">
        <i style="color: #b9cbd4;font-size: 6rem;" class="iconfont icon-indexMore"></i>
        <div class="quanQuan"><i></i><i></i><i></i></div>
      </v-touch>

    </div>
    <div class="dashboard-footer">
      <div class="dashboard-footer-left">
      </div>
      <div class="dashboard-footer-right">
        江油鸿飞大数据服务有限公司
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAdvert,getBulletin } from '@/api/common'

export default {
  name: 'dashboard',
  data() {
    return {
      time: null,
      timer: 1,
      advertisementTimer: null,
      msg:'',
      Flag:true
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.$store.commit('cleanFrom', 'all')
    clearInterval(this.timer)
    this.timer = null
    this.st()
    this.getMsg()
  },
  destroyed() {
    this.ed()
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
      }).catch(error => {
      })
    },
    reSt() {
      this.ed()
      this.st()
    },
    st() {
      this.getNowFormatDate()
      this.advertisementTimer = setTimeout(() => {
        this.router('/advertisement')
      }, 30000)
    },
    ed() {
      clearTimeout(this.advertisementTimer)
      this.advertisementTimer = null
    },
    getNowFormatDate() {
      const t = this
      if (!t.timer) return
      t.timer = setTimeout(t.getNowFormatDate, 1000)
      const d = new Date()
      t.time = d.getFullYear() + '-' + t.n(d.getMonth() + 1) + '-' + t.n(d.getDate()) + ' ' + t.n(d.getHours()) + ':' + t.n(d.getMinutes()) + ':' + t.n(d.getSeconds())
    },
    n(e) {
      return e >= 0 && e <= 9 ? '0' + e : e
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
  font-size: 1.2rem;
  top: 0;
  left: 0;
}
  $tsha: 1px 1px 1px #f1f1f1;
.dashboard {
  &-container{
    height: 100%;
    background-color: #f0f5f7;
    color: #8B8B8B;
    font-size: 1.8rem;
    line-height: 3rem;
  }
  &-head {
    width: 100%;
    height: 8rem;
    padding: 5rem 9.4% 0;
    display: flex;
    &-left{
      text-shadow:$tsha;
      width: 50%;
    }
    &-right{
      width: 50%;
      text-align: right;
      font-size: 1.6rem;
    }
  }
  &-btn-box {
    padding: 0 6%;
    display: flex;
    height: 64%;
    width: 100%;
    span{
      margin: 4rem 4%;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      width: 17%;
      height: calc(100% - 8rem);
      border-radius: .5rem;
      font-size: 2rem;
      text-align: center;
      box-shadow: 0 0 1rem rgba(0,0,0,.1);
      background-color: #fff;
      transition: transform .1s;
      .icon{
        width: 8rem;
        height: 6rem;
        img{
          display: block;
          height: 100%;
          width: 100%;
        }
      }
      &:active{
        transform: translate(0, .5vh);
      }
      .font{
        width: 8rem;
        line-height: 6rem;
      }
      &.readonly:active{
        transform: translate(0, 0);
      }
    }
  }
  &-footer{
    width: 100%;
    text-align: center;
    height: 20%;
    padding: 2rem 9.4%;
    display: flex;
    &-left{
      height: 100%;
      width: 20rem;
    }
    &-right{
      height: 100%;
      font-size: 1.3rem;
      color: #999;
      width: calc(100% - 20rem);
      text-align: right;
      text-shadow:$tsha;
    }
  }
}
  .quanQuan{
    font-size: 4rem;
    line-height: 5.5rem;
    i{
      display: inline-block;
      margin: 0 .4rem;
      width: .6rem;
      height: .6rem;
      background: #d5d5d5;
      border-radius: 50%;
    }
  }
</style>
