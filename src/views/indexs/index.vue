<!--
 * @Author: daidai
 * @Date: 2022-03-04 09:23:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:05:02
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\index.vue
-->
<template>
  <div class="contents">
    <div class="contetn_left">
      <div class="pagetab">
        <!-- <div class="item">实时监测</div> -->

      </div>
      <ItemWrap class="contetn_left-top contetn_lr-item" title="病虫害预警" :options="leftTopOption">
        <!-- <select >
          <option>环境监测</option>
          <option>病虫害预警</option>
        </select> -->
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="今日虫情">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" style="padding: 0 10px 16px 10px" title="虫害监测压力">
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
    
        <CenterMap  :options="leftBottomOption" title="魔镜慧眼" @sendData="handleData" />
    

      <ItemWrap class="contetn_center-bottom" title="AI巡园预警" :result="resultInfo">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="园区生产情况">
        <RightTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item"   title="风速" :options="centerBottomOption" style="padding: 0 10px 16px 10px">
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="土壤监测 ">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script>
import LeftTop from './left-top.vue'
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

export default {
  components: {
    LeftTop,
    LeftCenter,
    LeftBottom,
    CenterMap,
    RightTop,
    RightCenter,
    RightBottom,
    CenterBottom,
  },
  data() {
    return {
      leftTopOption:{
        leftArray:['土壤监测'],
        rightArray:['气象预警'],
      },
      leftBottomOption:{
        leftArray:['虫情监测','苗情监测'],
        rightArray:['农机监测','人员监测'],
      },
      centerBottomOption:{
        leftArray:['温度', '湿度'],
        rightArray:[ '气压', '日照时间']
      },
      resultInfo:{
        person:1,
      }
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  created() {
  },

  mounted() {
    
   },
  methods: {
    handleData(data){
      this.resultInfo=data
    }
  },
};
</script>
<style lang="scss" scoped>
// 内容
.contents {

  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 310px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;


  }
}


@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
