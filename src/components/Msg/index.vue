<template>
  <div id="msg" v-if="msg">
    <marquee behavior="scroll" direction="left">
      {{msg}}
    </marquee>
  </div>
</template>

<script>
import { getBulletin } from '@/api/common'
export default {
  name: 'Msg',
  data(){
    return {
      msg:''
    }
  },
  computed: {
    
  },
  mounted() {
    this.getMsg()
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
    }
  }
}
</script>
<style scoped>
#msg{
  width: 100%;
  height: 2.8rem;
  line-height:2.8rem;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.2rem;
  background: -webkit-linear-gradient(left, rgba(1,211,216), rgba(0,111,199));
  background: -o-linear-gradient(right, rgba(1,211,216), rgba(0,111,199)); 
  background: -moz-linear-gradient(right, rgba(1,211,216), rgba(0,111,199)); 
  background: linear-gradient(to right, rgba(1,211,216), rgba(0,111,199)); 
}
</style>

