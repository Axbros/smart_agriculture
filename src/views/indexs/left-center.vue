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
import { todayInspectInfo } from 'api/modules'
export default {
  data() {
    return {
      options: {},
      detail: [],
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
      todayInspectInfo().then(res => {
        //只打印一次
        if (!this.timer) {
          console.log("!this.timer", res);
        }
        if (res.code == 1) {

          this.detail = res.data[0].detail;
          console.log(this.detail)
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
    init() {
      this.options = {
        textStyle: {
          fontFamily: "sans-serif",
          fontSize: 18,
          fontStyle: "normal",
          fontWeight: "20",
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },

          }
        },
        // legend: {
        //   top: 'bottom',
        //   left: "center"
        // },
        label: {
          show: true,
          // fontSize: 20 // 修改为需要的字体大小
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

            data: this.detail
          }
        ]
      };
    },
  },
};
</script>
<style lang='scss' scoped></style>