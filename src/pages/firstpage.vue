<template>
  <div>
      <m-header :title="title"></m-header>
      
      <div class="container">
        <div class="top">
          <kjview :kjdata="kjData" :Time="nextTime" v-if="flag"></kjview>
        </div>

        <div class="middle">
          <div class="cell">
            <img src="../assets/freeplan.png" alt="">
            <span>免费计划</span>
          </div>
          <div class="cell">
            <img src="../assets/zhuanjiajihua.png" alt="">
            <span>专家计划</span>
          </div>
          <div class="cell">
            <img src="../assets/jihuafenxiang.png" alt="">
            <span>我的计划</span>
          </div>
          <div class="cell">
            <img src="../assets/ruanjianbaoku.png" alt="">
            <span>软件宝库</span>
          </div>
          
        </div>

        <div class="line"></div>

        <div class="bottom">
          bottom
        </div>
      </div>

  </div>
</template>

<style lang="less" scoped>
.middle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .cell {
    margin: 10px 16px 10px 16px;
    // border: 1px solid gray;
    // border-style: none solid solid none;
    display: flex;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img{
      height: 100%;
      width: 100%;
    }
    span {
      margin-top: 8px;
      font-size: 3vw;
      color: #333333;
      line-height: 20px;
    }
  }
}
.line{
  width: 100%;
  height: 10px;
  background-color: #f5f8f8;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
import kjview from "../components/kjview/kjview";
import firstcell from "../components/first/firstpagecell";

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
      screenWidth: document.body.clientWidth
    };
  },
  components: {
    mHeader,
    kjview,
    firstcell
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
            // console.log('yes');
          } else {
            // console.log("no")
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
    }
  },
  beforeMount() {},
  mounted() {
    this.getkjData();

    
  },
  
  computed: {
   
  },
  beforeDestroy() {
    clearInterval(tiemInterval);
  }
};
</script>

