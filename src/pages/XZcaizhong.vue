<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">
            <div class="cell" v-for="(item,index) in dataList" :key="index">
                <div class="cell-btnview">
                    <el-button class="btn" :class="{'btnSelect':ind == item1.SID}" type="text" v-for="(item1,index1) in item.CPNames" :key="index1" @click="btnClick($event,item1.SID)">{{item1.CPName}}
                    </el-button>
                </div>
                <div class="line">
                </div>
            </div>
            <el-button v-if="isShow()" class="btnDefault" type="primary" native-type="submit" @click="changeOkClick">确定</el-button>
            <el-button v-else class="btnEnable" type="primary" native-type="submit">确定</el-button>
        </div>
    </div>
</template>


<style lang="less" scoped>
.maincontainer {
  display: flex;
  flex-direction: column;
}

.cell {
  display: flex;
  flex-direction: column;
}

.cell-btnview {
  margin-top: 10px;
  margin-bottom: 20px;
  // height: 50px;
  .btn {
    height: 25px;
    line-height: 23px;
    align-content: center;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    font-size: 13px;
    color: rgb(80, 80, 80);
    // min-width: 100px;
    border-radius: 3px;
    border: 1px solid #c4c4c4;
  }
  .btnSelect {
    height: 25px;
    line-height: 23px;
    align-content: center;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    font-size: 13px;
    color: white;
    background: rgb(145, 7, 94);
    // min-width: 100px;
    border-radius: 3px;
    border: 1px solid rgb(145, 7, 94);
  }
}
.btnDefault {
  margin-top: 10%;
  margin-left: 15%;
  width: 70%;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: rgb(253, 179, 9);
  margin-bottom: 10%;
}
.btnEnable {
  margin-top: 10%;
  margin-left: 15%;
  width: 70%;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: rgb(253, 218, 111);
  margin-bottom: 10%;
}

.line {
  height: 1px;
  background: #efefef;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
export default {
  data() {
    return {
      title: {
        text: "选择彩种",
        showBack: true,
        changeOK: true
      },
      dataList: [],
      ind: "",
    };
  },

  components: {
    mHeader
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append("Action", "GetServiceList");
      this.$http
        .post(this.$global.url, data)
        .then(res => {
          console.log("getservicelist");
          this.dataList = res.data.Data;
        })
        .catch(error => {});
    },
    btnClick(btn, sid) {
      console.log(this.$route.params);
      console.log(btn);
      localStorage.sid1 = sid ? sid : localStorage.sid;
      localStorage.czname1 = btn.target.innerText;
      this.ind = sid;
    },
    isSelect(item1) {
      if (item1.SID == localStorage.sid) {
        return true;
      } else {
        return false;
      }
    },
    isShow() {
      if (this.ind) {
        return true;
      } else {
        return false;
      }
    },
    changeOkClick() {
      localStorage.sid = localStorage.sid1;
      localStorage.czname = localStorage.czname1;
      if (localStorage.isLogin == "true") {
        let signStr =
          localStorage.sid +
          localStorage.user_name +
          this.$global.AppType +
          this.$global.AppCode +
          this.$global.AppVersion +
          localStorage.pwd;
        let data = new FormData();
        data.append("Action", "Login2");
        data.append("SID", localStorage.sid);
        data.append("Account", localStorage.user_name);
        data.append("AppType", this.$global.AppType);
        data.append("AppCode", this.$global.AppCode);
        data.append("AppVersion", this.$global.AppVersion);
        data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

        this.$http
          .post(this.$global.url, data)
          .then(res => {
            if (res) {
              localStorage.uid = res.data.Data.UID;
              localStorage.AuthTypeName = res.data.Data.AuthTypeName;
              localStorage.SiteUrl = res.data.Data.SiteUrl;
              localStorage.AuthType = res.data.Data.AuthType;
              localStorage.Username = res.data.Data.NickName;
              localStorage.Token = res.data.Data.Token;
              localStorage.PayType = res.data.Data.PayType;
              localStorage.FreePlanSiteUrl = res.data.Data.FreePlanSiteUrl;
              localStorage.tokenCode = this.$sha256
                .sha256(res.data.Data.Token + localStorage.pwd)
                .toUpperCase();

              localStorage.removeItem("keyNum1");
              localStorage.removeItem("keyNum2");
              localStorage.removeItem("Norm1");
              localStorage.removeItem("Norm2");
              localStorage.removeItem("selectDataCount1");
              localStorage.removeItem("selectDataCount2");
              localStorage.removeItem("shujufenxi");
              localStorage.removeItem("activeName2");
              localStorage.removeItem("playtype");
              localStorage.removeItem("playtypenew");
              localStorage.removeItem("PlanID");
              localStorage.removeItem("PlanType");

              this.$router.push({
                path: "/"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push({
          path: "/"
        });
      }
    }
  },

  mounted() {
    this.getData();
    this.ind = localStorage.sid;
    localStorage.vcname = "XZcaizhong";
  }
};
</script>
