<!--
 * @Author: daidai
 * @Date: 2022-03-01 11:17:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:50:18
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\center-map.vue
-->
<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="left">{{left}}</div>
      <span class="titletext">{{ title }}</span>
      <div class="right">{{right}}</div>
    </div>
    <div class="mapwrap">
      <dv-border-box-13>
        <table class="table">
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(item, itemIndex) in row" :key="itemIndex">
              <img :src="item.image" alt="图片" style="width: 90%; height: auto; margin-top:30px;margin-left:20px">
              <div style="margin-left:144px"> {{ item.date }}</div>
            </td>
          </tr>
        </table>
        <!-- <Echart id="CenterMap" :options="options" ref="CenterMap" /> -->
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    left:{
      type:String,
      default:() => "",
    },
    right:{
      type:String,
      default:() => "",
    }
  },
  data() {
    return {
      tableData: [
        [
          { image: 'http://hn.people.com.cn/NMediaFile/2022/0403/LOCAL202204031014000013325939934.jpg', date: '2023-01-01' },
          { image: 'http://hn.people.com.cn/NMediaFile/2022/0403/LOCAL202204031014000013325939934.jpg', date: '2023-02-01' }
        ],
        [
          { image: 'http://hn.people.com.cn/NMediaFile/2022/0403/LOCAL202204031014000013325939934.jpg', date: '2023-03-01' },
          { image: 'http://hn.people.com.cn/NMediaFile/2022/0403/LOCAL202204031014000013325939934.jpg', date: '2023-04-01' }
        ]
      ]
    };
  },
  created() {},

  mounted() {
    // console.log(xzqCode);
    this.getData("china");
  },
  methods: {
  
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .left,
    .right {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 6px 20px;
    }

    
  }

  .mapwrap {
    height: 548px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

   .table{
    margin-top: 20px;
   }
  }
}
</style>
