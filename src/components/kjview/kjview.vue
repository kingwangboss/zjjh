<template>
  <div class="kjview">
    <div class="top-top">
        <div class="item1"></div>
        <span class="qishu1">&nbsp;&nbsp;第{{KJData.NewLottery.CurrentPeriod}}期开奖&nbsp;&nbsp;{{KJData.NewLottery.CurrentOpenTime}}</span>
    </div>
    <kjnum class="top-middle" :data="kjnum"></kjnum>

    <div class="top-bottom" v-if="time===0">
        <span class="line"></span>
        <span class="label1">第{{KJData.NewLottery.NextPeriod}}期正在开奖...</span>
        <span class="line"></span>
    </div>
    <div class="top-bottom" v-else>
        <span class="line"></span>
        <span class="label1">开奖倒计时&nbsp;&nbsp;{{shijian}}</span>
        <span class="line"></span>
    </div>
  </div>
</template>


<style lang="less" scoped>
.kjview {
  height: auto;
  width: 100%;
  background: url(../../assets/jianbian.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .top-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    margin-left: 5px;
    height: 30px;
    line-height: 30px;
    .item1 {
      height: 100%;
      width: 5px;
      background-color: #ffffff;
    }
    .qishu1 {
      color: #ffffff;
      font-size: 4vw;
      height: 28px;
    }
  }
  .top-middle {
    margin: 5px 7px 5px 7px;
  }
  .top-bottom {
    display: flex;
    flex-direction: row;
    height: 25px;
    margin-bottom: 5px;
    justify-content: space-between;
    .line {
      background-color: #ffffff;
      height: 1px;
      width: 27%;
      margin-top: 12px;
    }
    .label1 {
      color: #ffffff;
      line-height: 25px;
      font-size: 13px;
    }
    .img {
      width: 10px;
      height: 10px;
      margin-top: 3px;
      margin-right: 5px;
      padding-top: 2.5px; // background: url(../../../static/images/shouyeicon.png);
      -moz-background-size: 70% 70%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .sj {
      margin: 2px 2px;
      background-color: #f7d90f;
      border-radius: 2px;
      line-height: 22px;
      height: 20px;
      padding: 0 3px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: #ff0000;
    }
  }
}
</style>


<script>
import kjnum from "./kjnum";
export default {
  props: ["kjdata","Time"],
  data() {
    return {
      KJData: Object,
      nextTime:Number
    };
  },
  components: {
    kjnum
  },
  methods: {},
  watch: {
   'Time': function (now, old) {
    this.nextTime = this.Time;
   },
   'kjdata':function(now,old){
       this.KJData = this.kjdata;
   }
  },
  computed: {
    kjnum: {
      get() {
        return this.KJData.NewLottery.LotteryResult.split(",");
      }
    },
    shijian: {
      get() {
        var time;
        time = parseInt(this.nextTime);
        // console.log(time);
        var hour = parseInt(time / 3600);
        var minu = parseInt((time - hour * 3600) / 60);
        var second = time % 60;

        var num00 = parseInt(hour / 10) > 0 ? parseInt(hour / 10) : 0;
        var num01 = hour % 10;
        var num1 = parseInt(minu / 10) > 0 ? parseInt(minu / 10) : 0;
        var num2 = minu % 10;
        var num3 = parseInt(second / 10) > 0 ? parseInt(second / 10) : 0;
        var num4 = second % 10;

        var arr = [];
        arr.push(num00);
        arr.push(num01);
        arr.push(num1);
        arr.push(num2);
        arr.push(num3);
        arr.push(num4);
        // console.log(arr);
        var str = arr[0].toString() + arr[1].toString()+':'+arr[2].toString()+arr[3].toString()+':'+arr[4].toString()+arr[5].toString();
        return str;
      }
    },
    time: {
      get() {
        return parseInt(this.nextTime);
      },

    }
  },
  created() {
    this.KJData = this.kjdata;
    this.nextTime = this.Time;
  },
  beforeMount() {},
  mounted() {}
};
</script>
