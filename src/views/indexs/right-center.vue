<template>
  <div class="center_bottom">
    <Echart :options="options" id="bottomLeftChart" class="echarts_bottom"></Echart>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { currentGET } from "api";
import { graphic } from "echarts";
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pageflag = true;
      currentGET("big6", { companyName: this.companyName }).then((res) => {
        if (res.success) {
          this.init(res.data);
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
    init(newData) {

      this.options  = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['05-31', '06-01', '06-02', '06-03', '06-04', '06-05', '06-06']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            data: [-20, 12, 20, 21, 24, 10, 8],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'green' // 起始颜色
                  },
                  {
                    offset: 1,
                    color: 'white' // 结束颜色
                  }
                ]
              }
            }
          }
        ]
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.center_bottom {
  width: 100%;
  height: 100%;

  .echarts_bottom {
    width: 100%;
    height: 100%;
  }
}
</style>
