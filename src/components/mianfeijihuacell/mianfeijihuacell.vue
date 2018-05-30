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
    commit(id) {
      localStorage.PlanID = id;
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetLotteryFreePlanInfo&PlanID=" +
        localStorage.PlanID +
        "&PlanType=" + 
        localStorage.PlanType +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetLotteryFreePlanInfo");
      data.append("PlanID", localStorage.PlanID);
      data.append("PlanType", localStorage.PlanType);
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
            if(res.data.Code === "Suc"){
                this.$router.go(-1);
            }else{
                
            }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>