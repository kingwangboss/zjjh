<template>
  <div style="background:rgb(242,242,242);width:100%;height:100%;">
      <m-header :title="title"></m-header>
      
      <div class="container">
        <div class="top">
          <kjview :kjdata="kjData" :Time="nextTime" v-if="flag"></kjview>
        </div>

        <div class="middle">
          <div class="cell" @click="mianfeijihua">
            <img src="../assets/freeplan.png" alt="">
            <span>免费计划</span>
          </div>
          <div class="cell" @click="zhuanjiajihua">
            <img src="../assets/zhuanjiajihua.png" alt="">
            <span>专家计划</span>
          </div>
          <div class="cell" @click="wodejihua">
            <img src="../assets/wodejihua.png" alt="">
            <span>我的计划</span>
          </div>
          <div class="cell" @click="ruanjianbaoku">
            <img src="../assets/ruanjianbaoku.png" alt="">
            <span>软件宝库</span>
          </div>
        </div>

        <div class="bottom-top"></div>

        <div class="bottom-container">

            <div class="bottom">
                <div class="item1">
                    <div class="line"></div>
                    <span class="title">
                    {{PlanData.PlanName}}
                    </span>
                </div>
                <div class="right" v-if="PlanData.PlanType === 2">
                  <div class="item2">
                      <img src="../assets/fenxiang.png" alt="">
                      <span>分享</span>
                  </div>
                  <div class="item2" @click="dianzan">
                      <img src="../assets/dianzan.png" alt="">
                      <span>点赞</span>
                  </div>
                </div>
                <div v-else>
                  
                </div>
            </div>

            <firstcell1 class="firstcell1" :plandata="PlanData" v-if="cellflag"></firstcell1>
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

.bottom-top {
  height: 10px;
  margin: 10px 10px 0px 10px;
  background: rgb(219, 219, 219);
  border-radius: 10px;
}

.bottom-container {
  margin: 0px 15px 0px 15px;
  border: 1px solid rgb(233, 233, 233);
  border-top: 2px solid rgb(200, 200, 200);
  position: relative;
  top: -6px;
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
      margin-left: 10px;
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
  background: white;
  display: flex;
  flex-direction: column;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
import kjview from "../components/kjview/kjview";
import firstcell1 from "../components/first/firstpagecell1";

var tiemInterval;
var run;
export default {
  name: "firstpage",
  data() {
    return {
      title: {
        text: "时时彩",
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
    firstcell1
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
    getfreecelldata() {
      // 请求数据
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetIndexPlanInfo&PlanType=1" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetIndexPlanInfo");
      data.append("PlanType", "1");
      // data.append("AutoOpt", "0");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.PlanData = res.data.Data;
          this.cellflag = true;
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
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetLotteryFreePlanInfo");
      data.append("PlanID", localStorage.PlanID);
      // data.append("AutoOpt", "0");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          if(res.data.Code == "Fail"){
            this.getfreecelldata();
            localStorage.removeItem("PlanID");
          }else{
            this.PlanData = res.data.Data;
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

    if (typeof localStorage.PlanID == "undefined" || localStorage.PlanID == 0) {
      this.getfreecelldata();
    } else {
      this.getcelldata();
    }
  },

  computed: {},
  beforeDestroy() {
    clearInterval(tiemInterval);
  }
};
</script>

