<template>
    <div>
        <div class="container" v-for="(item,index) in plandata" @click="commit(item.ID)">
            <div class="top">
                <div class="top-left">
                    <img v-if="index === 0" style="width:8vw;height:8vw;" src="../../assets/zhuanjiajihua/z1.png" alt="">
                    <img v-else-if="index === 1" style="width:8vw;height:8vw;" src="../../assets/zhuanjiajihua/z2.png" alt="">
                    <img v-else-if="index === 2" style="width:8vw;height:8vw;" src="../../assets/zhuanjiajihua/z3.png" alt="">
                    <img v-else style="width:5vw;height:5vw;margin:13px 3px 0px 10px;" src="../../assets/zhuanjiajihua/gj.png" alt="">

                    <div style="margin-top:15px;color:#f93342;font-weight: 500;font-size:5vw;">{{item.PlanName}}</div>
                    <div style="margin-top:15px;color:#999999;font-size:4vw;margin-left:5px;">{{item.Version}}</div>
                
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

            <span class="bottom">
            {{item.PlanDesc}}
            </span>
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
    }
    .top-right {
      align-self: flex-end;
      margin-right: 4.5vw;
    }
  }
  .bottom {
    width: 93%;
    font-size: 4vw;
    margin: 15px 15px 10px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
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
    planData:function(now, old) {
      this.plandata = this.planData;
    }
  },
  created() {
    this.plandata = this.planData;
    console.log("111111111")
    console.log(this.plandata);
  },

  methods: {
    commit(id) {
      this.$router.push({
        path:"/zhuanjiajihualiebiao",
        query: {
          planid: id
        },
      })
    }
  }
};
</script>