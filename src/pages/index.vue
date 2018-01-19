<template>
  <div>
      <m-header :title="title"></m-header>
      <mt-button @click="login">login</mt-button>
  </div>
</template>


<script>
import mHeader from "../components/hearder/Hearder";

export default {
  name: "loginVC",
  data() {
    return {
      title: {
        text: "登陆"
      },
      user: {
        name: "kingwang2",
        pwd: "123456",
        sid: "1"
      }
    };
  },
  components: {
    mHeader
  },
  methods: {
    login() {
      this.$show.open();
      let signStr =
        this.user.sid +
        this.user.name +
        "4ZYZJ1.0" +
        this.$sha256.sha256(this.user.pwd).toUpperCase();

      let data = new FormData();
      data.append("Action", "Login");
      data.append("SID", this.user.sid);
      data.append("Account", this.user.name);
      data.append("AppType", "4");
      data.append("AppCode", "ZYZJ");
      data.append("AppVersion", "1.0");
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

      localStorage.pwd = this.$sha256.sha256(this.user.pwd).toUpperCase();
      this.$http
        .post(this.$global.url, data)
        .then(res => {
          this.$show.close();
          if (res) {
            localStorage.isLogin = true;
            localStorage.sid = this.user.sid;
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

            localStorage.user_name = this.user.name;
            localStorage.user_pwd = this.user.pwd;
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
