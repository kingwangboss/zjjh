<template>
  <div>
      <m-header :title="title"></m-header>


      <div class="container">
        <div class="top">
                <div class="top-item1" style="align-items: baseline;">
                    <div class="left">
                        <img class="img" src="../assets/goumai/huangguan.png" alt="">
                        <span class="name">{{planData.PlanName}}</span>
                        <span class="version">{{planData.Version}}</span>
                    </div>
                    <div class="right">
                        <img style="width:4vw;" src="../assets/goumai/xx1.png" alt="">
                        <img style="width:4vw;" src="../assets/goumai/xx1.png" alt="">
                        <img style="width:4vw;" src="../assets/goumai/xx1.png" alt="">
                        <img style="width:4vw;" src="../assets/goumai/xx1.png" alt="">
                        <img v-if="0 <= planData.HighOpinion && planData.HighOpinion < 5" style="width:4vw;" src="../assets/goumai/xx3.png" alt="">
                        <img v-else-if="5 <= planData.HighOpinion && planData.HighOpinion < 10" style="width:4vw;" src="../assets/goumai/xx2.png" alt="">
                        <img v-else-if="10 <= planData.HighOpinion" style="width:4vw;" src="../assets/goumai/xx1.png" alt="">
                    </div>
                </div>
          <div class="PlanDesc" v-for="(item,index) in analysis(planData.PlanDesc)">
            {{item}}
          </div>
        </div>

        <div class="line"></div>
        <div class="bottom">
          <div class="item2">
            <span>当前排名:</span>
            <span style="color:rgb(214,49,56)">NO.{{planData.OrderBy}}</span>
          </div>
          <div class="item2">
            <span>当前成绩:</span>
            <span style="color:rgb(214,49,56)">{{planData.Score}}</span>
          </div>
          <div class="item2">
            <span>计划价格:</span>
            <span style="color:rgb(214,49,56)">￥</span>
            <span style="color:rgb(214,49,56)">{{planData.Price}}</span>
            <span>/天</span>
          </div>
          <div class="item2">
            <span>到期时间:</span>
            <span style="color:rgb(214,49,56)">{{shijian(0)}}</span>
            <span>/</span>
            <span style="color:rgb(214,49,56)">{{shijian(1)}}</span>
            <span>/</span>
            <span style="color:rgb(214,49,56)">{{shijian(2)}}</span>
          </div>
          <div class="item2" v-if="planData.BuySign === 1">
            <span>可买天数:</span>
            <span style="color:rgb(214,49,56)">{{planData.AllowBuyDays}}</span>
            <span>天</span>
          </div>
          <div class="item2" v-else>
            <span>可续天数:</span>
            <span style="color:rgb(214,49,56)">{{planData.AllowBuyDays}}</span>
            <span>天</span>
          </div>
          
        </div>
        <div class="line"></div>

        <div class="top" v-show="planData.BuySign === 1 || planData.BuySign === 2">
            <div v-if="planData.BuySign === 1" class="top-item1" style="border-bottom: 1px solid rgb(239, 239, 239);padding-bottom:3vw;">
            <span style="padding-left: 8px;font-size: 4vw;line-height:10vw;" class="left">购买天数:</span>
            <div class="right2">
              <img class="btn" src="../assets/goumai/jian1.png" alt="" @click="jian">
              <el-input v-model="inputnum" class="input" type="number" size="mini" @change="changenum"></el-input>
              <img class="btn" src="../assets/goumai/jia1.png" alt="" @click="jia">
            </div>
          </div>

          <div v-else class="top-item1" style="border-bottom: 1px solid rgb(239, 239, 239);padding-bottom:3vw;">
            <span style="padding-left: 8px;font-size: 4vw;line-height:10vw;" class="left">续费天数:</span>
            <div class="right2">
              <img class="btn" src="../assets/goumai/jian1.png" alt="" @click="jian">
              <el-input v-model="inputnum" class="input" type="number" size="mini" @change="changenum"></el-input>
              <img class="btn" src="../assets/goumai/jia1.png" alt="" @click="jia">
            </div>
          </div>
        </div>
      </div>
      

      <div class="bottom-btnView1" v-if="planData.BuySign === 1">
            <button class="bottom-btn2" style="background-color: rgb(248, 198, 65);border-color:rgba(0,0,0,0);color:#fff;" @click="buy">￥{{price}} 立即购买</button>
      </div>
      <div class="bottom-btnView1" v-else-if="planData.BuySign === 2">
            <button class="bottom-btn1" style="background-color: rgb(248, 198, 65);border-color:rgba(0,0,0,0);color:#fff;" @click="buy">￥{{price}} 继续续费</button>
            <button class="bottom-btn1" style="background-color: rgb(145, 7, 95);border-color:rgba(0,0,0,0);color:#fff;" @click="pushplan">进入计划</button>
      </div>

      <div class="bottom-btnView1" v-else-if="planData.BuySign === 3">
            <button class="bottom-btn1" style="background-color: #b3b3b3;border-color:rgba(0,0,0,0);color:#fff;">继续续费</button>
            <button class="bottom-btn1" style="background-color: rgb(145, 7, 95);border-color:rgba(0,0,0,0);color:#fff;" @click="pushplan">进入计划</button>
      </div>

      <div class="bottom-btnView1" v-else>
            <button class="bottom-btn1" style="background-color: #b3b3b3;border-color:rgba(0,0,0,0);color:#fff;">￥{{price}} 继续续费</button>
            <button class="bottom-btn1" style="background-color: #b3b3b3;border-color:rgba(0,0,0,0);color:#fff;">进入计划</button>
      </div>


  </div>
</template>


<style lang="less" scoped>
#bundle {
  .juzhong {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10vw;
  background-color: white;
  height: 100%;
  position: relative;
  // position: fixed;
  // width: 100%;
  .top {
    margin: 2vw 1vw 2vw 1vw;
    flex-direction: column;
    justify-content: flex-start;
    .top-item1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .img {
        height: 3vw;
        width: 4vw;
      }
      .name {
        color: rgb(51, 51, 51);
        font-size: 4vw;
      }
      .version {
        color: rgb(51, 51, 51);
        font-size: 3vw;
        margin-left: 5px;
      }
      .right2 {
        display: flex;
        align-self: flex-end;
        align-items: center;
        height: 8vw;
        .btn {
          height: 7vw;
          margin: 5px;
        }
        .input {
          min-width: 50px;
          width: 12vw;
          // background: rgb(243, 243, 243);
          font-size: 3vw;
          outline: none;
        }
      }
    }
    .PlanDesc {
      float: left;
      margin-left: 2vw;
      margin-top: 2vw;
      padding: 1.5vw 2vw 1.5vw 2vw;
      font-size: 3vw;
      color: rgb(145, 7, 95);
      border-radius: 1vw;
      border: 1px solid #c4c4c4;
    }
  }
  .line {
    height: 5px;
    background-color: rgb(239, 239, 239);
  }
  .bottom {
    display: flex;
    flex-direction: column;
    .item2 {
      height: 14vw;
      line-height: 14vw;
      border-bottom: 1px solid rgb(239, 239, 239);
      display: flex;
      justify-content: flex-start;
      padding-left: 10px;
      font-size: 4vw;
    }
    .item3 {
      height: 14vw;
      border-bottom: 1px solid rgb(239, 239, 239);
    }
    .item4 {
      height: 14vw;
      border-bottom: 1px solid rgb(239, 239, 239);
    }
    .item5 {
      height: 14vw;
    }
  }
}

.bottom-btnView1 {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 10vw;
  display: flex;
  justify-content: space-between;
}

.bottom-btn1 {
  width: 50%;
  border-radius: 0px;
  font-size: 4vw;
  outline: none;
}
.bottom-btn2 {
  width: 100%;
  border-radius: 0px;
  font-size: 4vw;
  outline: none;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
export default {
  data() {
    return {
      title: {
        text: "专家计划详情",
        showBack: true
      },
      planData: "",
      id: this.$route.query.planid,
      inputnum: "",
      price: ""
    };
  },
  components: {
    mHeader
  },
  methods: {
    analysis(str) {
      var temp = [];
      temp = str.split(",");
      return temp;
    },
    shijian(i) {
      var str = this.planData.AuthExpiration;
      var myDate = new Date(str.replace(/-/g,'/'));
      var arr = [];
      arr.push(myDate.getFullYear());
      var month = myDate.getMonth() + 1;
      month = month < 10 ? '0' + month : '' + month;
      arr.push(month);
      arr.push(myDate.getDate());
      return arr[i];
    },
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetPlanDetails" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanID=" +
        this.id +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetPlanDetails");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanID", this.id);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          if (res.data.Code === "Suc") {
            this.planData = res.data.Data;
            this.inputnum = this.planData.AllowBuyMinDays;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changenum(value) {
      if (value < 0 || value == null || value == "") {
        this.inputnum = 1;
      } else if (value > this.planData.AllowBuyDays) {
        this.inputnum = this.planData.AllowBuyDays;
      } else {
        this.inputnum = value;
      }
    },
    jian() {
      this.inputnum = this.inputnum - 1 < 1 ? 1 : this.inputnum - 1;
    },
    jia() {
      this.inputnum =
        this.inputnum + 1 > this.planData.AllowBuyDays
          ? this.planData.AllowBuyDays
          : this.inputnum + 1;
    },
    buy() {
      this.$router.push({
        path: "/pay",
        query: {
          planid: this.id,
          tianshu: this.inputnum
        }
      });
    },
    pushplan() {
      localStorage.PlanID = this.id;
      this.$router.push({
        path: "/firstpage"
      });
    }
  },
  watch: {
    inputnum(val, oldVal) {
      //普通的watch监听
      console.log("inputnum: " + val, oldVal);
      this.price = val * this.planData.Price;
      this.price = this.price.toFixed(2);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
