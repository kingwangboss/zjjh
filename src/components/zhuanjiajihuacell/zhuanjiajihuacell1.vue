<template>
    <div>
        <div class="container" v-for="(item,index) in plandata" @click="commit(item.ID)">
            <div class="top">
                <div class="top-left">
                    <!-- <img v-if="index === 0" style="width:5vw;height:5vw;margin:13px 3px 0px 10px;position: relative;top:2px;" src="../../assets/zhuanjiajihua/z1.png" alt="">
                    <img v-else-if="index === 1" style="width:5vw;height:5vw;margin:13px 3px 0px 10px;position: relative;top:2px;" src="../../assets/zhuanjiajihua/z2.png" alt="">
                    <img v-else-if="index === 2" style="width:5vw;height:5vw;margin:13px 3px 0px 10px;position: relative;top:2px;" src="../../assets/zhuanjiajihua/z3.png" alt="">
                    <img v-else style="width:5vw;height:5vw;margin:13px 3px 0px 10px;position: relative;top:3px;" src="../../assets/zhuanjiajihua/gj.png" alt=""> -->

                    <div v-if="index < 3" class="img1">{{item.OrderBy}}</div>
                    <div v-else class="img2">NO.{{item.OrderBy}}</div>
                    <div v-if="index < 3" style="margin:13px 0px 0px 3px;color:rgb(145, 7, 95);font-weight: 500;font-size:5vw;">{{item.PlanName}}</div>
                    <div v-else style="margin:13px 0px 0px 3px;color:#333333;font-weight: 500;font-size:5vw;">{{item.PlanName}}</div>
                    <div style="margin:13px 0px 0px 0px;color:#333333;font-size:4vw;margin-left:5px;">{{item.Version}}</div>
                
                </div>
                <div class="top-right">
                    <img style="width:4vw;" src="../../assets/zhuanjiajihua/lx.png" alt="">
                    <img style="width:4vw;" src="../../assets/zhuanjiajihua/lx.png" alt="">
                    <img style="width:4vw;" src="../../assets/zhuanjiajihua/lx.png" alt="">
                    <img style="width:4vw;" src="../../assets/zhuanjiajihua/lx.png" alt="">
                    <img v-if="0 <= item.HighOpinion && item.HighOpinion < 5" style="width:4vw;" src="../../assets/zhuanjiajihua/bx.png" alt="">
                    <img v-else-if="5 <= item.HighOpinion && item.HighOpinion < 10" style="width:4vw;" src="../../assets/zhuanjiajihua/banx.png" alt="">
                    <img v-else-if="10 <= item.HighOpinion" style="width:4vw;" src="../../assets/zhuanjiajihua/lx.png" alt="">
                    <!-- <img style="width:4vw;" src="../../assets/zhuanjiajihua/bx.png" alt="">
                    <img style="width:4vw;" src="../../assets/zhuanjiajihua/banx.png" alt=""> -->
                </div>
            </div>

             <div class="bottom" >
                <span class="item" v-for="(item,index) in analysis(item.PlanDesc)">{{item}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container {
  background-color: white;
  box-shadow: #ebebeb 0px 4px 10px;
  border-right: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  border-radius: 3px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: space-between;
    .top-left {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      .img1 {
        background-image: url("../../assets/zhuanjiajihua/jiangbei.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 0px 0px;
        width: 6vw;
        height: 6vw;
        line-height: 5vw;
        position: relative;
        top: -1.5vw;
        color: white;
        font-size: 3vw;
        margin: 13px 3px 0px 10px;
      }
      .img2 {
        background-image: url("../../assets/zhuanjiajihua/juxing1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 0px 0px;
        padding: 0.5vw 4vw 0.5vw 1.5vw;
        position: relative;
        top: -1vw;
        color: white;
        font-size: 3vw;
        margin: 13px 3px 0px 0px;
      }
    }
    .top-right {
      align-self: flex-end;
      margin-right: 4.5vw;
    }
  }
  .bottom {
    margin: 0px 1vw 2vw 1vw;
    flex-direction: column;
    justify-content: flex-start;
    .item {
      float: left;
      margin-left: 2vw;
      margin-top: 2vw;
      padding: 1.5vw 2vw 1.5vw 2vw;
      font-size: 3vw;
      color: rgb(80, 80, 80);
      border-radius: 1vw;
      border: 1px solid #c4c4c4;
    }
  }
}
</style>

<script>
export default {
  props: ["planData"],
  data() {
    return {
      num: 10,
      celldata: Object,
      plandata: ""
    };
  },
  watch: {
    planData: function(now, old) {
      this.plandata = this.planData;
    }
  },
  created() {
    this.plandata = this.planData;
    console.log("111111111");
    console.log(this.plandata);
  },

  methods: {
    analysis(str) {
      var temp = [];
      temp = str.split(",");
      return temp;
    },
    commit(id) {
      this.$router.push({
        path: "/zhuanjiajihualiebiao1",
        query: {
          planid: id
        }
      });
    }
  }
};
</script>