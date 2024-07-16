<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:24:14
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-center.vue
-->
<template>
  <div v-if="pageflag" class="center_bottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !sbtxSwiperFlag }">
    <component :is="components" :data="list" :class-option="defaultOption">
      <ul class="center_bottom ">
        <li class="center_bottom_item">
          <div class="inner_right">
          
            <div class="flex">
              <div class="info">
                <span class="labels ">摄像头ID：</span>
                <span class="contents primary"> {{resultInfo.deviceId}}</span>
              </div>
              <div class="info" style="margin-left:36px">
                <span class="labels">地址：</span>
                <span class="contents warning"> 四川省雅安市雨城区新康路46号</span>
              </div>
            </div>


            <div class="flex">

              <div class="info">
                <span class="labels"> 茶芽占比识别：</span>
                <span class="contents secondary" > 时间：{{getCurrentTime()}} 嫩芽占比{{ resultInfo.burgeen }}%</span>
              </div>

            </div>
            <div class="flex">

              <div class="info">
                <span class="labels">人员闯入识别：</span>
                <span class="contents secondary" >  时间：{{getCurrentTime()}} 发现{{ resultInfo.person }}名相关人员进入茶园</span>
              </div>
            </div>

            <div class="flex">

              <div class="info">
                <span class="labels">农机作业识别：</span>
                <span class="contents secondary" > 时间：{{getCurrentTime()}} 发现{{ resultInfo.machine }}个背篓/农药桶</span>
              </div>
            </div>

            <div class="flex">

              <div class="info">
                <span class="labels">烟雾防火识别：</span>
                <span class="contents secondary" > 时间：{{getCurrentTime()}}  发现{{ resultInfo.fire }}例烟雾</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
  <Reacquire v-else @onclick="getData" style="line-height:200px" />

</template>

<script>
import { currentGET } from 'api/modules'
import vueSeamlessScroll from 'vue-seamless-scroll'  // vue2引入方式
import Kong from '../../components/kong.vue'
export default {
  components: { vueSeamlessScroll, Kong },
  props: {
    resultInfo: {
      type: Object,
      default: function() {
      return { 
        machine: 0,
        person: 0,
        burgeen:0,
        fire:0
      };
    }
    },
   
  },
  data() {
    return {
      list: [],
      pageflag: true,
      defaultOption: {
        ...this.$store.state.setting.defaultOption,
        limitMoveNum: 3, 
        singleHeight: 250, 
        step:0,
      }

    };
  },
  computed: {
    sbtxSwiperFlag() {
      let ssyjSwiper = this.$store.state.setting.ssyjSwiper
      if (ssyjSwiper) {
        this.components = vueSeamlessScroll
      } else {
        this.components = Kong
      }
      return ssyjSwiper
    }
  },
  created() {
    this.getData()
  },
  
  mounted() { },
  methods: {
    getCurrentTime(){
      const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    getData() {
      this.pageflag = true
      // this.pageflag =false
      currentGET('big5', { limitNum: 50 }).then(res => {
        console.log('实时预警', res);
        if (res.success) {
          this.list = res.data.list
          let timer = setTimeout(() => {
              clearTimeout(timer)
              this.defaultOption.step=this.$store.state.setting.defaultOption.step
          }, this.$store.state.setting.defaultOption.waitTime);
        } else {
          this.pageflag = false
          this.$Message.warning(res.msg)
        }
      })
    },

  },
};
</script>
<style lang='scss' scoped>
.flex{
  margin-top: 16px;
}
.center_bottom {
  width: 100%;
  height: 100%;

  .center_bottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 20px;
    color: #fff;
    .inner_right {
      position: relative;
      height: 100%;
      width: 100%;
      flex-shrink: 0;
      line-height: 1.5;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.6);
      }

      .primary {
        color: $primary-color;
        font-size: 20px;
      }

      .secondary {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #E6A23C;
        font-size: 20px;
      }
    }

  }
}

.center_bottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 250px;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>