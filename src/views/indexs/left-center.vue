<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-25 09:18:22
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
  <Echart id="leftCenter" :options="options" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" style="line-height:200px">
    重新获取
  </Reacquire>
</template>

<script>
import { currentGET } from 'api/modules'
export default {
  data() {
    return {
      options: {},
      countUserNumData: {
        lockNum: 0,
        onlineNum: 0,
        offlineNum: 0,
        totalNum: 0
      },
      pageflag: true,
      timer: null
    };
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  beforeDestroy() {
    this.clearData()

  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    getData() {
      this.pageflag = true
      // this.pageflag =false

      currentGET('big1').then(res => {
        //只打印一次
        if (!this.timer) {
          console.log("设备总览", res);
        }
        if (res.success) {
          this.countUserNumData = res.data
          this.$nextTick(() => {
            this.init()
          })

        } else {
          this.pageflag = false
          this.$Message({
            text: res.msg,
            type: 'warning'
          })
        }
      })
    },
    //轮询
    switper() {
      if (this.timer) {
        return
      }
      let looper = (a) => {
        this.getData()
      };
      this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
      let myChart = this.$refs.charts.chart
      myChart.on('mouseover', params => {
        this.clearData()
      });
      myChart.on('mouseout', params => {
        this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
      });
    },
    init() {
      this.options = {
        legend: {
          top: 'bottom',
          textStyle:{
            fontSize:18
          }
        },
        series: [
          {
            name: '今日虫情',
            type: 'pie',
            radius: [50, 85],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
            show: true,
            fontSize: 18 // 修改为需要的字体大小
        },
            data: [
              { value: 40, name: '大蟒蛇' },
              { value: 38, name: '草履虫' },
              { value: 32, name: '蟑螂' },
              { value: 30, name: '老鼠' },
              { value: 28, name: '蜥蜴' },
            ]
          }
        ]
      };
    },
  },
};
</script>
<style lang='scss' scoped>



</style>