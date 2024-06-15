<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:51:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:12:46
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-bottom.vue
-->
<template>
  <div class="right_bottom">
    <!-- <dv-capsule-chart :config="config" style="width:100%;height:260px" /> -->
    <div class="container">
      <div class="item">
          <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          物联网总设备<br>239合
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          农事任务<br>1526次
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          涉及村落<br>2个
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          设备覆盖面积<br>4780亩
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          专家培训<br>2428次
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          园区人员<br>120户
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          种植品种<br>5种
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          作物销量<br>30242件
      </div>
      <div class="item">
            <video class="icon" autoplay muted loop>
            <source src="../../assets/video/sunshine.mp4" type="video/mp4">
          </video>
          网格员<br>4人
      </div>
  </div>
  </div>
</template>

<script>
import { currentGET } from 'api/modules'
export default {
  data() {
    return {
      gatewayno: '',
      config: {
        showValue: true,
        unit: "次",
        data: []
      },

    };
  },
  created() {
    this.getData()

  },
  computed: {
  },
  mounted() { },
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
    //轮询
    switper() {
      if (this.timer) {
        return
      }
      let looper = (a) => {
        this.getData()
      };
      this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
    },
    getData() {
      this.pageflag = true
      // this.pageflag =false
      currentGET('big7', { gatewayno: this.gatewayno }).then(res => {

        if (!this.timer) {
          console.log('报警排名', res);
        }
        if (res.success) {
          this.config = {
            ...this.config,
            data: res.data
          }
          this.switper()
        } else {
          this.pageflag = false
          this.srcList = []
          this.$Message({
            text: res.msg,
            type: 'warning'
          })
        }
      })
    },
  },
};
</script>
<style lang='scss' scoped>



.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding: 4px;
  border-radius: 5px;
}
.icon {
  width: 40px;
  height: 40px;
  background: url("../../assets/video/sunshine.mp4");
  margin-bottom: 5px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}

.list_Wrap {
  height: 100%;
  overflow: hidden;
  :deep(.kong)   {
    width: auto;
  }
}

.sbtxSwiperclass {
  .img_wrap {
    overflow-x: auto;
  }

}

.right_bottom {
  box-sizing: border-box;

  .searchform {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .searchform_item {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.8);
      }

      button {
        margin-left: 30px;
      }

      input {}
    }
  }

  .img_wrap {
    display: flex;
    // justify-content: space-around;
    box-sizing: border-box;
    padding: 0 0 20px;
    // overflow-x: auto;

    li {
      width: 105px;
      height: 137px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      // background: #84ccc9;
      // border: 1px solid #ffffff;
      overflow: hidden;
      flex-shrink: 0;
      margin: 0 10px;

      img {
        flex-shrink: 0;
      }
    }




  }

  .noData {
    width: 100%;
    line-height: 100px;
    text-align: center;
    color: rgb(129, 128, 128);

  }
}
</style>