<template>
  <div class="maincontainer">
    <m-header :title="title"></m-header>

    <div class="userinfo">
      <img class="userinfo-avatar" src="../assets/me/User-104.png" background-size="cover"></img>
      <span class="userinfo-nickname">{{nickname}}</span>
    </div>


    <div class="bottom">
      <div class="bottom-cell" :style="{width:ojwidth+'px',height:ojwidth +'px'}" @click="kefuClick">
        <img src="../assets/me/zxkf.png" style="margin-top:30px;"></img>
        <span>在线客服</span>
        <span style="font-size:2vw;margin-top:1vw;color:rgb(145, 7, 95)" v-show="qqcode != '' || qqcode === 'undefine'">QQ:{{qqcode}}</span>
      </div>
      
      <div class="bottom-cell" :style="{width:ojwidth+'px',height:ojwidth +'px'}" @click="XGpwdClick">
        <img src="../assets/me/mmxg.png" style="margin-top:30px;"></img>
        <span>密码管理</span>
      </div>
      <div class="bottom-cell" :style="{width:ojwidth+'px',height:ojwidth +'px'}" @click="feedbackClick">
        <img src="../assets/me/yjfk.png" style="margin-top:30px;"></img>
        <span>意见反馈</span>
      </div>
      <div class="bottom-cell" :style="{width:ojwidth+'px',height:ojwidth +'px'}" @click="aboutClick">
        <img src="../assets/me/gywm.png" style="margin-top:30px;"></img>
        <span>关于我们</span>
      </div>
    </div>

    <div class="bottom-btndiv">
      <el-button type="text" class="bottom-btn" @click="loginOut">退出登录</el-button>
    </div>

  </div>
</template>

<style lang="less" scoped>
.maincontainer{
  background-color: white;
  height: 100%;
  position: fixed;
  width: 100%;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(145, 7, 95);
}

.userinfo-avatar {
  width: 15vw;
  height: 15vw;
  margin: 10px;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #fff;
  font-size: 18px;
  padding-bottom: 10px;
}

.bottom {
  display: flex;
  // width: 100%;
  flex-wrap: wrap;
  margin: 0 30px;
}

.bottom-cell {
  margin: 30px 15px 0px 15px;
  background: rgb(243, 243, 243);
  // border-radius: 10px;
  display: flex;
  flex-direction: column;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  span {
    font-size: 4vw;
    line-height: 15px;
    position: relative;
    top: -15px;
  }
}

.bottom-cell img {
  width: 13vw;
  height: 13vw;
  position: relative;
  top: -20px; 
}

.bottom-btndiv{
  padding-bottom: 100px;
}

.bottom-btn {
  margin-top: 30px;
  width: 80%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: rgb(253, 179, 9);
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
export default {
  components: {},
  data() {
    return {
      title: {
        text: "我的计划",
        showBack: true
      },
      screenWidth: document.body.clientWidth,
      nickname: localStorage.Username,
      paytype: localStorage.PayType,
      qqcode: localStorage.QQCode
    };
  },
  components: {
    mHeader
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    loginOut() {
      // localStorage.clear();
      localStorage.isLogin = false;
      // localStorage.removeItem('isLogin');
      // localStorage.removeItem('sid');
      localStorage.removeItem("uid");
      localStorage.removeItem("AuthTypeName");
      localStorage.removeItem("SiteUrl");
      localStorage.removeItem("AuthType");
      localStorage.removeItem("Username");
      localStorage.removeItem("Token");
      localStorage.removeItem("PayType");
      localStorage.removeItem("QQUrl");
      localStorage.removeItem("tokenCode");
      localStorage.removeItem("OfficialUrl");
      localStorage.removeItem("tab");
      localStorage.removeItem("shujufenxi");
      localStorage.removeItem("activeName2");
      localStorage.PlanType = "";
      localStorage.PlanID = "";
      localStorage.ParentPlanID = "";

      this.$router.push({
        path: "/"
      });
    },
    kefuClick() {
      window.location.href = localStorage.QQUrl;
    },
    XGpwdClick() {
      this.$router.push({
        path: "/wo/XGpwd"
      });
    },
    feedbackClick() {
      this.$router.push({
        path: "/wo/feeback"
      });
    },
    aboutClick() {
      this.$router.push({
        path: "/wo/about"
      });
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  },
  computed: {
    ojwidth: {
      // getter
      get: function() {
        var ojwidth;
        var margin;
        var colnum = 2; //列
        colnum = 6 > colnum ? colnum : 6;
        var rownum = 6 / colnum; //行
        margin = 6 > 5 ? 1 : 1; //间距
        ojwidth = (this.screenWidth - 120 - 2 * (margin + 0) * colnum) / colnum; //格子的宽
        return ojwidth;
      },
      // setter
      set: function(newValue) {}
    }
  }
};
</script>


