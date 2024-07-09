<template>
  <div class="center_bottom">
    <Echart :options="options" id="bottomLeftChart" class="echarts_bottom"></Echart>
  </div>
</template>

<script>
import {climate_condition} from "api/modules"
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {},
  mounted() {
    this.getData("e7");
  },
  created(){
    this.$eventBus.$on('titleChanged', (data) => {
        // 处理接收到的数据
        const categoryMap={"温度":"e3","湿度":"e9","风速":"e7","气压":"e5","日照时间":"e11"}
        const keys = Object.keys(categoryMap);
        keys.forEach(key => {
          if(key==data){
            this.getData(categoryMap[key])
          }
        }); 
        
      });
  },
  methods: {
    getData(category) {
      this.pageflag = true;
      // 温度的key是e3    湿度是e9   风速e7   气压就e5  日照e11
      climate_condition(category).then((res) => {
        if (res.code===200) {
          console.log(res.data)
          this.init(res.data.reverse());
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
          data: newData.map(r=>r.date)
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            data: newData.map(r=>r.value),
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
