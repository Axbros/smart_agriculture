<template>
  <Echart id="rightTop" :options="option" class="right_top_inner" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" style="line-height: 200px">
    重新获取
  </Reacquire>
</template>

<script>
import { insectPressure } from "api/modules";
import { graphic } from "echarts"
export default {
  data() {
    return {
      option: {},
      pageflag: false,
      timer: null,
      days: 7,
    };
  },
  created() {

  },

  mounted() {
    this.getData(this.days);
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    getData(days) {
      this.pageflag = true;
      // this.pageflag =false
      insectPressure(days).then((res) => {
        if (res.code == 200) {
          const data = res.data
          var xAxis = []
          var yAxis = []
          var solidTemperatureArray=[]
          data.map(r => {
            xAxis.push(r.date)
            yAxis.push(r.total)
            solidTemperatureArray.push(r.soilTemperature)
          })
          xAxis.reverse()
          yAxis.reverse()
          solidTemperatureArray.reverse()
          this.$nextTick(() => {
            this.init(xAxis, yAxis, solidTemperatureArray),
              this.switper();
          });
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
    //轮询
    switper() {
      if (this.timer) {
        return;
      }
      let looper = (a) => {
        this.getData(this.days);
        this.days === 7 ? this.days = 14 : this.days = 7;
      };
      this.timer = setInterval(
        looper,
        this.$store.state.setting.echartsAutoTime
      );
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setInterval(
          looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    init(xData, yData, yData2) {
      this.option = {
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          // formatter: function (params) {
          //   let xValue = params[0].axisValue; 
          //   let y1Value = params[0].data; 
          //   let y2Value=params[1].data
          //   return `${xValue}虫害总计:${y1Value}个\n土壤温度:${y2Value}`;
          // }
        },
        grid: {
          //布局
          show: true,
          left: "10px",
          right: "30px",
          bottom: "10px",
          top: "28px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        series: [
          {
            data: [...yData],
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            color: "rgba(252,144,16,.7)",
            areaStyle: {
              //右，下，左，上
              color: new graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(252,144,16,.7)",
                  },
                  {
                    offset: 1,
                    color: "rgba(252,144,16,.0)",
                  },
                ],
                false
              ),
            },
          },
          {
            data: [...yData2],
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            // name: "报警2次数",
            color: "rgba(9,202,243,.7)",
            
            areaStyle: {
              //右，下，左，上
              color: new graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(9,202,243,.7)",
                  },
                  {
                    offset: 1,
                    color: "rgba(9,202,243,.0)",
                  },
                ],
                false
              ),
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang='scss' scoped>
.right_top_inner {
  margin-top: -8px;
}
</style>