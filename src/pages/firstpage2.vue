<template>
  <div style="background:rgb(242,242,242);width:100%;height:100%;">
      <m-header :title="title"></m-header>
      
      <div class="container">
        <div class="top">
          <kjview :kjdata="kjData" :Time="nextTime" v-if="flag"></kjview>
        </div>

        <div class="middle">
          <div class="cell" @click="mianfeijihua">
            <img src="../assets/freeplan1.png" alt="">
            <span>免费计划</span>
          </div>
          <div class="cell" @click="zhuanjiajihua">
            <img src="../assets/zhuanjiajihua1.png" alt="">
            <span>专家计划</span>
          </div>
          <div class="cell" @click="wodejihua">
            <img src="../assets/wodejihua1.png" alt="">
            <span>我的计划</span>
          </div>
          <div class="cell" @click="ruanjianbaoku">
            <img src="../assets/ruanjianbaoku1.png" alt="">
            <span>软件宝库</span>
          </div>
        </div>


        <div class="bottom-container">

            <div class="bottom">
                <div class="item1">
                    <!-- <div class="line"></div> -->
                    <!-- <img v-if="PlanData.PlanType === 1" style="width:20px;height:20px;margin:5px 0 5px 5px;" src="../assets/freeplan.png" alt="">
                    <img v-else-if="PlanData.PlanType === 2" style="width:20px;height:20px;margin:5px 0 5px 5px;" src="../assets/zhuanjiajihua.png" alt=""> -->
                    <span style="margin-left:10px;" class="title">
                    {{PlanData.PlanName}}
                    </span>
                </div>
                <div class="right" v-if="PlanData.PlanType === 2">
                  <!-- <div class="item2">
                      <img src="../assets/fenxiang.png" alt="">
                      <span>分享</span>
                  </div> -->
                  <div class="item2" @click="dianzan">
                      <img src="../assets/dianzan.png" alt="">
                      <span>点赞</span>
                  </div>
                </div>
                <div v-else>
                  
                </div>
            </div>

            <firstcell3 class="firstcell1" :plandata="PlanData" v-if="cellflag"></firstcell3>
        </div>

      </div>

  </div>
</template>

<style lang="less" scoped>
.middle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  .cell {
    margin: 10px 16px 10px 16px;
    display: flex;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img {
      height: 70%;
      width: 70%;
    }
    span {
      margin-top: 8px;
      font-size: 3vw;
      color: #333333;
    }
  }
}


.bottom-container {
  border-top: 2px solid rgb(242, 242, 242);
  position: relative;
}
.bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  background: white;
  padding: 5px 0px;
  .item1 {
    display: flex;
    flex-direction: row;
    .line {
      width: 5px;
      margin-top: 5px;
      height: 20px;
      background-color: #f93342;
    }
    .title {
      font-weight: 500;
      margin-left: 5px;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
  }
  .item2 {
    margin-left: 20px;
    margin-top: -2px;
    position: relative;
    img {
      vertical-align: middle;
      height: 15px;
    }
    span {
      vertical-align: middle;
      font-size: 12px;
      color: gray;
    }
  }
}

.firstcell1 {
  // background: white;
  display: flex;
  flex-direction: column;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
import kjview from "../components/kjview/kjview";
// import firstcell1 from "../components/first/firstpagecell1";
import firstcell3 from "../components/first/firstpagecell3";

var tiemInterval;
var run;
export default {
  name: "firstpage",
  data() {
    return {
      title: {
        text: localStorage.czname,
        setting: true,
        img: true
      },
      kjData: "",
      nextTime: "",
      flag: false,
      PlanData: "",
      cellflag: false
    };
  },
  components: {
    mHeader,
    kjview,
    // firstcell1
    firstcell3
  },

  methods: {
    getData1() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Clock" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&CurrentLottery=0" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Clock");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("CurrentLottery", "0");
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          if (res.data.Data.NewLottery.NextPeriodTime > 0) {
            clearInterval(run);
            this.getkjData();
            // this.getcelldata();
            if (
              typeof localStorage.PlanID == "undefined" ||
              localStorage.PlanID == 0
            ) {
              this.getfreecelldata();
            } else {
              this.getcelldata();
            }
            console.log("yes");
          } else {
            console.log("no");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getkjData() {
      this.$show.open();
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Clock" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&CurrentLottery=0" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Clock");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("CurrentLottery", "0");
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      //getClock握手
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.$show.close();
          this.kjData = res.data.Data;
          this.nextTime = res.data.Data.NewLottery.NextPeriodTime;
          this.flag = true;

          //设置定时器，每1秒刷新一次
          var self = this;
          tiemInterval = setInterval(getTotelNumber, 1000);

          function getTotelNumber() {
            if (self.nextTime > 0) {
              self.nextTime--;
              // console.log(self.nextTime);
            } else {
              clearInterval(tiemInterval);
              var i = 0;
              run = setInterval(function() {
                if (localStorage.isLogin == "true") {
                  self.getData1();
                } else {
                  clearInterval(tiemInterval);
                }
              }, 5000);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getcelldata() {
      // 请求数据
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
          if(res.data.Code == "Fail"){
            // localStorage.removeItem("PlanID");
          }else{
            this.PlanData = res.data.Data;
            localStorage.PlanType = res.data.Data.PlanType;
            localStorage.PlanID = res.data.Data.PlanID;
            localStorage.ParentPlanID = res.data.Data.ParentPlanID;
            this.cellflag = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    dianzan() {
      // 请求数据
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=UpdateHighOpinion&PlanID=750" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "UpdateHighOpinion");
      data.append("PlanID", "750");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          console.log(res.data.Data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    mianfeijihua() {
      this.$router.push("/mianfeijihua");
    },
    zhuanjiajihua() {
      this.$router.push("/zhuanjiajihua");
    },
    wodejihua() {
      this.$router.push("/wodejihua");
    },
    ruanjianbaoku() {}
  },
  beforeMount() {},
  mounted() {
    this.getkjData();

    
    this.getcelldata();
  },

  computed: {},
  beforeDestroy() {
    clearInterval(tiemInterval);
  }
};
</script>

