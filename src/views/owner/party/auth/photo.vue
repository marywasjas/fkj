<template>
  <div class="app-container">
    <div class="fkj-content">
      <img @click="hide" v-if="isShow" class="line" src="../../../../assets/img/headLine.png" alt="">
      <div v-show="!data_uri">
        <div class="my_camera" id="my_camera">
        </div>
      </div>
      <div v-show="data_uri" class="data_uri" ref="imgbox">
        <img :src="data_uri"/>
      </div>
      <div style="color: #ff8e47;font-size: 1.2rem;line-height: 5vh;">
        <span v-if="data_uri">如果照片不符规，请点击重拍</span>
        <span v-else>请保持正视前方</span>
      </div>
    </div>
    <div class="fkj-footer">
      <div class="fkj-footer-left">
        <v-touch  tag="span" class="my-button" @tap="router('/owner/partyAuth/phoneNumber')"><i class="el-icon-arrow-left"></i>上一步</v-touch>
      </div>
      <div class="fkj-footer-center">
        <v-touch v-if="!data_uri" tag="span" class="my-button blue-btn" @tap="take_snapshot">点击拍照</v-touch>
        <v-touch v-else tag="span" class="my-button" @tap="reset">点击重拍</v-touch>
      </div>
      <div class="fkj-footer-right">
        <v-touch  tag="span" class="my-button" @tap="commitPhoneInfo">下一步<i class="el-icon-arrow-right"></i></v-touch>
      </div>
    </div>
  </div>
</template>
<script>
  import Webcam from '@/assets/photo/webcam.js'

  export default {
    name: 'phone',
    data() {
      return {
        isShow: true,
        data_uri: null
      }
    },
    mounted() {
      const bodySize = this.getViewportSize()
      const w = bodySize.width * 1 * 0.45
      const h = bodySize.height * 1 * 0.5
      this.$refs.imgbox.style.height = h + 'px'
      Webcam.set({
        width: w,
        height: h,
        image_format: 'jpeg',
        jpeg_quality: 90
      })
      Webcam.attach('#my_camera')
      this.reset()
    },
    methods: {
      hide() {
        const _this = this
        _this.isShow = false
        setTimeout(function() {
          _this.isShow = true
        }, 2000)
      },
      getViewportSize() {
        return {
          width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
          height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
      },
      take_snapshot() {
        const _this = this
        Webcam.snap(function(uri) {
          // console.log(_this.base64urlSize(uri))
          _this.data_uri = uri
        })
      },
      commitPhoneInfo() {
        if (this.data_uri) {
          this.$store.commit('partyAuth', { type: 'partyPhoto', value: this.data_uri })
          this.router('/owner/partyAuth/commit')
        } else {
          this.error('请先拍取照片！')
        }
      },
      reset() {
        this.data_uri = null
        this.$store.commit('partyAuth', { type: 'partyPhoto' })
      },
      base64urlSize(url) {
        let str = url.replace('data:image/png;base64,', '')
        const equalIndex = str.indexOf('=')
        if (str.indexOf('=') > 0) {
          str = str.substring(0, equalIndex)
        }
        const strLength = str.length
        const fileLength = parseInt(strLength - (strLength / 8) * 2)
        let size = ''
        size = (fileLength / (1024)).toFixed(2)
        const sizeStr = size + ''
        const index = sizeStr.indexOf('.')
        const dou = sizeStr.substr(index + 1, 2)
        if (dou === '00') {
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
        }
        return parseInt(size)
      }
    }
  }
</script>

<style type="text/sass" lang="scss" scoped>
  .phone-content {
    display: flex;
  }

  .phone-content {
    width: 100%;
  }
  video {
    margin-top: 10vh;
    width: 100%;
  }

  .data_uri {
    width: 45vw !important;
    height: 50vh !important;
    text-align: center;
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .line{
    top: calc(50% - 12vw);
    left: calc(50% - 12vw);
    width: 22vw;
    z-index: 99;
    position: fixed;
  }
  .fkj-content {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    padding-top: 5vh;
  }
</style>
