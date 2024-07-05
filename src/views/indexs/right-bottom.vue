<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:27:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:24:14
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-center.vue
-->
<template>
  <div class="right_center_wrap beautify-scroll-def">
    <div class="container">
      <div class="data-box">
        <span>温度:{{ info.soilTemperature }} °C</span>
        <span>湿度: {{ info.soilMoisture }}%RH</span>
        <span>PH值: {{ info.soilPh }}</span>
        <span>盐分电导率: {{ info.soilConductivity }}mS/cm</span>
      </div>
      <div class="graph">
        <img src="../../assets/img/earth.png" alt="Graph Image">
        <div class="tooltip">
          <span>{{ info.acquisitionTime.slice(0, 10) }}<br/><br/></span>
          <span>土壤碱解氮:{{ info.soilAlkalineHydrolyzedNitrogen }}<br/><br/></span>
          <span>士壤有效磷: {{ info.soilAvailablePhosphorus }}<br/><br/></span>
          <span>土壤有效钾: {{ info.soilAvailablePotassium }}<br/><br/></span>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { todaySolidDetect } from "@/api/modules"
export default {
  data() {
    return {
      info: {
        "id": 1720168501175,
        "deviceId": "32FFDC055241333741662451",
        "type": "0",
        "layers": 0,
        "acquisitionTime": "2024-07-05 16:32:39",
        "soilTemperature": 23.1,
        "soilMoisture": 27.8,
        "soilPh": 7.4,
        "soilConductivity": 72,
        "soilAlkalineHydrolyzedNitrogen": 12,
        "soilAvailablePhosphorus": 14,
        "soilAvailablePotassium": 18
      }
    }
  },
  methods: {
    getData() {
      todaySolidDetect().then((res) => {
        this.info=res.data
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
}

.data-box {
  margin-right: 20px;
}

.data-box span {
  display: block;
  margin-bottom: 10px;
}

.graph {
  position: relative;
  width: 100%;
  height: 100%;
}

.graph img {
  width: 100%;
  height: auto;
}

.tooltip {
  position: absolute;
  bottom:1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 128, 0, 0.7);
  padding: 1.2rem;
  border-radius: 5px;
  text-align: center;
}

.right_center {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }


    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #E6A23C;
        font-size: 15px;
      }
    }

  }
}

.right_center_wrap {
  overflow: hidden;
  width: 100%;
  height: 250px;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>