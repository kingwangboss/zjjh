<template>
    <div class="main">
        <div class="gif"></div>
    </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: rgb(145, 7, 95);
  position: absolute;
  top: 0;
}
.gif {
  position: relative;
  margin: 40% auto;
  height: 150px;
  width: 250px;
  background-image: url(../assets/loading2.jpg);
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
}
</style>


<script>
var tiemInterval;
export default {
  data() {
    return {
      time: 1
    };
  },
  created() {},
  mounted() {
    // 设置定时器，每1秒刷新一次
    var that = this;
    tiemInterval = setInterval(getTotelNumber, 1000);
    function getTotelNumber() {
      if (that.time > 0) {
        that.time--;
        console.log(that.time);
      } else {
        clearInterval(tiemInterval);
        //系统判断
        if (!that.IsPC()) {
          if (
            localStorage.sid &&
            localStorage.Token &&
            localStorage.tokenCode
          ) {
            // that.$router.push("/firstpage");
            that.login();
          } else {
            if (localStorage.sid) {
              that.$router.push("/login");
            } else {
              that.$router.push("/XZcaizhong");
            }
          }
        } else {
          // this.$router.push('/error')
          if (
            localStorage.sid &&
            localStorage.Token &&
            localStorage.tokenCode
          ) {
            // that.$router.push("/firstpage");
            that.login();
          } else {
            if (localStorage.sid) {
              that.$router.push("/login");
            } else {
              that.$router.push("/XZcaizhong");
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(tiemInterval);
  },
  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["iPhone", "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },

    login() {
      let signStr =
        localStorage.sid +
        localStorage.user_name +
        this.$global.AppType +
        this.$global.AppCode +
        this.$global.AppVersion +
        this.$sha256.sha256(localStorage.user_pwd).toUpperCase();
      console.log(signStr);
      let data = new FormData();
      data.append("Action", "Login2");
      data.append("SID", localStorage.sid);
      data.append("Account", localStorage.user_name);
      data.append("AppType", this.$global.AppType);
      data.append("AppCode", this.$global.AppCode);
      data.append("AppVersion", this.$global.AppVersion);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

      localStorage.pwd = this.$sha256.sha256(localStorage.user_pwd).toUpperCase();
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
            localStorage.QQUrl = res.data.Data.QQUrl;
            localStorage.tokenCode = this.$sha256
              .sha256(res.data.Data.Token + localStorage.pwd)
              .toUpperCase();
            localStorage.OfficialUrl = res.data.Data.OfficialUrl;
            localStorage.FreePlanSiteUrl = res.data.Data.FreePlanSiteUrl;
            localStorage.QQCode = res.data.Data.QQCode;
            this.$router.push({
              path: "/firstpage"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
