<template>
    <div>

        <m-header :title="title"></m-header>

        <kjview :kjdata="kjData" :Time="nextTime" v-if="flag"></kjview>

        <el-tabs id="content" v-model="activeName" @tab-click="handleClick" style="color:black;">
            <el-tab-pane :label="item.Name" :name="index.toString()" :index="index.toString()" v-for="(item,index) in listData" :key="index">
                <!-- id控制 计划切换 -->
                <div class="detail-top">
                    <div class="detail-top-content">
                        <div class="psview">准确率:</div>
                        <div class="psvalue">{{item.RightRate}}</div>
                    </div>
                    <div class="detail-top-content">
                        <div class="psview">最大连对:</div>
                        <div class="psvalue">{{item.MaxAlwaysRight}}</div>
                    </div>
                    <div class="detail-top-content">
                        <div class="psview">最大连错:</div>
                        <div class="psvalue">{{item.MaxAlwaysWrong}}</div>
                    </div>
                    <div class="detail-top-content">
                        <div class="psview">当前连对/错:</div>
                        <div class="psvalue">{{item.CurrentROrW}}</div>
                    </div>

                    <!-- id控制 计划切换 -->
                    <div class="detail-top1" style="width:100%;border-top:0px;padding:0;">
                      <div  v-show="item.RightTimes" class="detail-top-content" v-for="(item1,index1) in item.RightTimes ? item.RightTimes.split(',') : 0" :key="index1" >
                        <div class="psview">第{{index1+1}}期中:</div>
                        <div class="psvalue">{{item1}}</div>
                        <div class="psview">次</div>
                      </div>
                    </div>

                    
                </div>

                <!-- <div class="line">

                </div> -->

                <!-- cell -->
                <div class="detail-bottom">

                    <div class="bottom-cell" v-for="(itemCell,indexCell) in item.PlanDetails" :key="itemCell">
                        <div>
                            <div class="cell-top">
                                <span style="margin-left:5px;margin-top:10px;font-size:13px;">{{itemCell.split('|')[0]}}</span>
                                <!-- <span style="margin-left:5px;margin-top:10px;font-size:13px; color:#CD0C16;">预</span> -->
                                <div v-if="item.DsType === 0">
                                  <div v-show="itemCell.split('|')[2] <= 1" class="item2" style="border: 1px solid rgb(67, 199, 77);background: rgb(67, 199, 77);">
                                    {{itemCell.split('|')[2]}}定
                                  </div>
                                  <div v-show="itemCell.split('|')[2] == 2" class="item2" style="border: 1px solid rgb(229, 195, 0);background: rgb(229, 195, 0);">
                                    {{itemCell.split('|')[2]}}定
                                  </div>
                                  <div v-show="itemCell.split('|')[2] > 2" class="item2" style="border: 1px solid rgb(229, 142,0);background: rgb(229, 142,0);">
                                    {{itemCell.split('|')[2]}}定
                                  </div>
                                </div>
                                 <div v-else-if="item.DsType === 1">
                                   <div v-show="itemCell.split('|')[2] <= 1" class="item2" style="border: 1px solid rgb(67, 199, 77);background: rgb(67, 199, 77);">
                                    {{itemCell.split('|')[2]}}杀
                                  </div>
                                  <div v-show="itemCell.split('|')[2] == 2" class="item2" style="border: 1px solid rgb(229, 195, 0);background: rgb(229, 195, 0);">
                                    {{itemCell.split('|')[2]}}杀
                                  </div>
                                  <div v-show="itemCell.split('|')[2] > 2" class="item2" style="border: 1px solid rgb(229, 142,0);background: rgb(229, 142,0);">
                                    {{itemCell.split('|')[2]}}杀
                                  </div>
                                 </div>
                                <span style="margin-left:5px;margin-top:10px;font-size:13px;">{{itemCell.split('|')[1]}}</span>
                            </div>


                            <div class="cell-bottom">
                                  <!-- &nbsp;
                                <div v-if="itemCell.split('|')[2]" class="cell-bottom-itme1">{{itemCell.split('|')[2]}}</div> -->
                                &nbsp;
                                <span style="line-height:20px;font-size:12px;color: #333;">{{itemCell.split('|')[3]}}</span>
                                <span v-if="itemCell.split('|')[3]" style="font-size:12px;line-height:20px;color: #333;">期</span>
                                &nbsp;
                                <span style="line-height:20px;font-size:12px; color:#007AFF" v-show="itemCell.split('|')[4]">开</span>
                                &nbsp;

                                <div style="text-align:left;margin-top:1px;max-width:71%">
                                  <span style="font-size:12px; color:#007AFF;">{{itemCell.split('|')[4]}}</span>
                                </div>

                                <span v-if="itemCell.split('|')[5] === '对'" style="line-height:20px;margin-left:5px;margin-right:5px;color:#16B482;font-size:12px;">{{itemCell.split('|')[5]}}</span>
                                <span v-else-if="itemCell.split('|')[5] === '错' " style="line-height:20px;margin-left:5px;margin-right:5px;color:#CD0C16;font-size:12px;">{{itemCell.split('|')[5]}}</span>
                                <span v-else style="white-space: nowrap;line-height:20px;margin-right:5px;color:#16B482;font-size:10px;">{{itemCell.split('|')[5]}}</span>

                            </div>

                            <div class="cell-bottom1">
                                <!-- <span v-if="itemCell.split('|')[5] === '对'" style="line-height:20px;margin-left:5px;margin-right:5px;color:#16B482;">{{itemCell.split('|')[5]}}</span>
                                <span v-else-if="itemCell.split('|')[5] === '错' " style="line-height:20px;margin-left:5px;margin-right:5px;color:#CD0C16;">{{itemCell.split('|')[5]}}</span>
                                <span v-else style="line-height:20px;margin-left:5px;margin-right:5px;color:#16B482;">{{itemCell.split('|')[5]}}</span> -->
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<style lang="less" scoped>
.detail-top {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-start;
  border-bottom: 5px solid rgb(239, 239, 239);
  border-top: 5px solid rgb(239, 239, 239);
  background: #fffadc;
  padding: 5px 5px 0px 5px;
}
.detail-top1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-start;
}

.line {
  background: #fafafa;
  height: 8px;
  border-bottom: 1px solid #efefef;
}

.detail-top-content {
  height: 15px;
  width: 25%;
  align-content: center;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
}

.psview {
  color: #333;
  font-size: 12px;
}

.psvalue {
  font-size: 12px;
  padding-left: 3px;
  color: rgb(145, 7, 95);
}

.detail-bottom {
  background: #fff;
}

.bottom-cell {
  display: flex;
  flex-direction: column;
  /* background: RGB(250, 250, 250); */
  word-wrap: break-word;
  .cell-item1 {
    padding-left: 5px;
    display: flex;
    width: 20%;
    font-size: 12px;
    color: #6e6e6e;
    align-items: center;
  }

  .cell-item2 {
    width: 25px;
    font-size: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    padding-left: 13px;
    color: #6e6e6e;
  }

  .cell-item3 {
    width: 50%;
    font-size: 15px;
    text-align: center;
    line-height: auto;
    padding: 10px 5px;
    white-space: pre-line;
    color: #16b482;
  }

  .cell-item4 {
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-left: 5px;
    width: 15%;
  }
}
.cell-top {
  display: flex;
  flex-direction: row;
  word-wrap: break-word;
  justify-content: flex-start;
  color: #333;
  // margin-top: 10px;
  .item2 {
    margin-right: 5px;
    height: 14px;
    line-height: 15px;
    color: #fff;
    border-radius: 14px;
    padding: 0 5px;
    margin-left: 5px;
    margin-top: 7px;
    font-size: 13px;
  }
}

.cell-bottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
  padding-bottom: 5px;
  .cell-bottom-itme1 {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 18px;
    height: 18px;
    color: #007aff;
    font-size: 12px;
    line-height: 19px;
  }
}
.cell-bottom1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: 5px solid rgb(239, 239, 239);
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import kjview from "../components/kjview/kjview1";
// import "element-ui/lib/theme-default/index.css";
import listenHuadong from "../util/listenHuadong";
var tiemInterval;
var run;
export default {
  data() {
    return {
      title: {
        text: "计划详情",
        showBack: true
      },
      kjData: "",
      nextTime: "",
      flag: false,
      activeName: "0",
      maxactiveName: "",
      listData: "",
      zjnum: []
    };
  },
  created() {},
  methods: {
    jisuan(str){
      console.log(str.split('|')[2])
      if(str.split('|')[2]){
        return str.split('|')[2]
      }else{
        return "1";
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.index);
      localStorage.detailID = tab.index;
    },
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
            this.getData();
            // this.getcelldata();
            console.log("yes111");
          } else {
            console.log("no111");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getkjData() {
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
    getData() {
      // 请求数据
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetUserPlanDetails" +
        "&SID=" +
        localStorage.sid +
        "&PlanID=" +
        localStorage.PlanID +
        "&PlanType=" +
        localStorage.PlanType +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetUserPlanDetails");
      data.append("SID", localStorage.sid);
      data.append("PlanID", localStorage.PlanID);
      data.append("PlanType", localStorage.PlanType);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          console.log(res);
          this.listData = res.data.Data.Data;
          this.maxactiveName = this.listData.length.toString();
          for (var i = 0; i < this.listData.length; i++) {
            this.listData[i].PlanDetails = this.listData[
              i
            ].PlanDetails.reverse();
          }
          this.activeName = localStorage.detailID;
        })
        .catch(error => {
          console.log(error);
        });
    },

    bgColor(index) {
      if (index % 2 === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getkjData();
    // 调用请求数据的方法
    this.getData();
    localStorage.vcname = "planDetail";

    // this.listenHuadong();
    listenHuadong.listenHuadong(this);
  },

  beforeDestroy() {
    console.log("beforeDestroy");
    clearInterval(tiemInterval);
    clearInterval(run);
  },
  computed: {
    
  },
  components: {
    mHeader,
    kjview
  }
};
</script>
