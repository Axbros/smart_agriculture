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
      <div class="left" v-for="i in localOptions.leftArray" @click="exchangeTitle2Item(i, 'left')">{{ i }}</div>
      <span class="titletext">{{ localTitle }}</span>
      <div class="right" v-for="i in localOptions.rightArray" @click="exchangeTitle2Item(i, 'right')">{{ i }}</div>
    </div>
    <div class="mapwrap">
      <dv-border-box-13>
        <table class="table">
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(item, itemIndex) in row" :key="itemIndex">
              <img :src="item.image" alt="图片" style="width: 90%; height: auto; margin-top:48px;margin-left:20px">
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
import { centerRequest } from "api/modules"
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    options: {
      type: Object,
      default: () => ({
        leftArray: [],
        rightArray: []
      })
    }
  },
  data() {
    return {
      localTitle: this.title,
      localOptions: { ...this.options },
      tableData: [
        [], []
      ]
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    exchangeTitle2Item(i, position) {
      console.log(i, position)
      console.log(i=="虫情监测")
      if(i=="虫情监测"){
        this.getData("64101FE0C750001DD00")
      }
      if(i=="人员监测" || i=="农机监测"){
        this.getData("64101FE0C750001B600")
      }
      if(i=="苗情监测" ){
        this.getData("64101FE0C750001DE00")
      }else{
        this.getData()
      }
      
      let temp = this.localTitle;
      this.localTitle = i;
      if (position === "left") {
        // let tempOption = this.localOptions.leftArray[this.localOptions.leftArray.indexOf(i)];
        this.localOptions.leftArray[this.localOptions.leftArray.indexOf(i)] = temp;
      }
      else {
        // let tempOption = this.localOptions.rightArray[this.localOptions.rightArray.indexOf(i)];
        this.localOptions.rightArray[this.localOptions.rightArray.indexOf(i)] = temp;
      }

    },
    getData(deviceId="64101FE0C750001B600") {
      centerRequest(deviceId).then((res) => {
        if (res.code === 200) {
          var data = res.data.data
          this.init(data)
          var result=res.data.results
          this.sendData(result)
        }
      })
    },
    sendData(result) {
        this.$emit('sendData',result);
      },
    init(data) {
      this.tableData=[
        [], []
      ]
      this.tableData[0].push({ image: data[0].afterRecognition, date: data[0].acquisitionTime })
      this.tableData[0].push({ image: data[1].afterRecognition, date: data[1].acquisitionTime })
      this.tableData[1].push({ image: data[2].afterRecognition, date: data[2].acquisitionTime })
      this.tableData[1].push({ image: data[3].afterRecognition, date: data[3].acquisitionTime })
    }
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
      background: linear-gradient(92deg,
          #0072ff 0%,
          #00eaff 48.8525390625%,
          #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .left,
    .right {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg,
          #0072ff 0%,
          #00eaff 48.8525390625%,
          #01aaff 100%);
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

    .table {
      margin-top: 20px;
    }
  }
}
</style>
