<template>
    <div class="container" >

        <div>
            <div class="div-bor">
                <i class="icon-user"></i>
                <input class="input" v-model="mobile.num" type="text" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入手机号码" @input="inputFuction">
            </div>

          <div class="top">
            
            <div class="div-bor1">
                <i class="icon-verify"></i>
                <input type="text" class="input1" v-model="mobile.verify" maxlength="11" placeholder="请输入验证码" @input="inputFuction"> 
            </div>
            <el-button class="btn" type="text" @click="getVcode1">获取验证码</el-button>
            
            
          </div>
          <div class="bottom">

            <div class="div-bor">
                <i class="icon-pwd"></i>
                <input class="input" v-model="mobile.newpwd1" type="password" maxlength="18" placeholder="请输入密码" @input="inputFuction">
            </div>
            <div class="div-bor">
                <i class="icon-pwd"></i>
                <input class="input" v-model="mobile.newpwd2" type="password" maxlength="18" placeholder="请确认密码" @input="inputFuction">
            </div>
            
            
          </div>

          <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" >注册</el-button>
          <el-button v-else :disabled="disabled" class="btnDefault" type="primary" @click="submit">注册</el-button>

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

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(186, 189, 188);
  font-size: 13px;
}
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 60px;
  #bundle > .juzhong;
  .div-bor {
    position: relative;
    width: 270px;
    margin-bottom: 10%;
    height: 40px;
    line-height: 42px;
    // border: solid #dedede 1px;
    border-radius: 4px;
    border: 1px solid rgb(201, 202, 202);
    background-color: white;
    .input {
      background: red;
      outline: none;
      background-color: transparent;
      margin-top: 3px;
      width: 100%;
      padding-left: 40px;
      font-size: 16px;
      color: black;
    }
    .input1 {
      outline: none;
      background-color: transparent;
      margin-top: 3px;
      margin-left: -20px;
      font-size: 16px;
      color: black;
    }
  }

  .div-bor1 {
    position: relative;
    width: 155px;
    margin-bottom: 10%;
    height: 40px;
    line-height: 42px;
    border: solid rgb(201, 202, 202) 1px;
    border-radius: 4px;
    background-color: white;
    .input1 {
      outline: none;
      background-color: transparent;
      margin-top: 3px;
      padding-left: 40px;
      font-size: 16px;
      color: black;
    }
  }

  .icon-user {
    position: absolute;
    left: 12px;
    top: 11px;
    z-index: 5;
    background-image: url("../../assets/login/sj.png");
    background-size: 70% 70%;
    /*引入图片图片*/
    background-repeat: no-repeat;
    /*设置图片不重复*/
    background-position: 0px 0px;
    /*图片显示的位置*/
    width: 25px;
    /*设置图片显示的宽*/
    height: 28px;
    /*图片显示的高*/
  }
  .icon-pwd {
    position: absolute;
    left: 12px;
    top: 11px;
    z-index: 5;
    background-image: url("../../assets/login/mm.png");
    background-size: 70% 70%;
    /*引入图片图片*/
    background-repeat: no-repeat;
    /*设置图片不重复*/
    background-position: 0px 0px;
    /*图片显示的位置*/
    width: 25px;
    /*设置图片显示的宽*/
    height: 28px;
    /*图片显示的高*/
  }
  .icon-verify {
    position: absolute;
    left: 11px;
    top: 11px;
    z-index: 5;
    background-image: url("../../assets/login/yzm.png");
    background-size: 70% 70%;
    /*引入图片图片*/
    background-repeat: no-repeat;
    /*设置图片不重复*/
    background-position: 0px 0px;
    /*图片显示的位置*/
    width: 28px;
    /*设置图片显示的宽*/
    height: 25px;
    /*图片显示的高*/
  }

  .top {
    margin-top: 10%;
    display: flex;
    flex-direction: row;

    .btn {
      outline: none;
      margin-left: 15px;
      // line-height: 40px;
      height: 40px;
      width: 100px;
      border-radius: 4px;
      background-color: rgb(145, 7, 95);
      border: solid rgb(145, 7, 95) 1px;
      color: white;
      font-size: 12px;
      align-content: center;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
  }

  .btnDefault {
    margin-top: 30px;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 0;
    color: #fff;
    font-size: 18px;
    background: rgb(253, 179, 9);
  }
  .btnEnable {
    margin-top: 30px;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 0;
    color: #fff;
    font-size: 18px;
    background: rgb(253, 218, 111);
  }
}
</style>

<script>
export default {
  data() {
    return {
      mobile: {
        num: "",
        verify: "",
        newpwd1: "",
        newpwd2: "",
        vcode: ""
      },
      disabled: true
    };
  },
  methods: {
    inputFuction() {
      if (
        this.mobile.num.length > 0 &&
        this.mobile.verify.length > 0 &&
        this.mobile.newpwd1.length > 0 &&
        this.mobile.newpwd2.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    getVcode1() {
      var that = this;
      let data = new FormData();
      data.append("Action", "GetVCode");
      data.append("SID", localStorage.sid);
      this.$http.post(this.$global.url, data).then(res => {
        console.log(res);
        this.mobile.vcode = res.data.Data;
        let data1 = new FormData();
        data1.append("Action", "SendRegSMS");
        data1.append("SID", localStorage.sid);
        data1.append("Mobile", that.mobile.num);
        data1.append("AppType", that.$global.AppType);
        data1.append("VCode", that.mobile.vcode);
        that.$http
          .post(this.$global.url, data1)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    submit: function(event) {
      var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      console.log(formData);

      let data = new FormData();
      data.append("Action", "MobileReg2");
      data.append("SID", localStorage.sid);
      data.append("AppVersion", this.$global.AppVersion);
      data.append("Mobile", this.mobile.num);
      data.append("AppType", this.$global.AppType);
      data.append(
        "Pwd",
        this.$sha256.sha256(this.mobile.newpwd2).toUpperCase()
      );
      data.append("SMSCode", this.mobile.verify);
      data.append("AppCode", this.$global.AppCode);
      localStorage.pwd = this.$sha256.sha256(this.mobile.newpwd2).toUpperCase();
      this.$http
        .post(this.$global.url, data)
        .then(res => {
          if (res.data.Code === "Suc") {
            localStorage.isLogin = true;

            localStorage.uid = res.data.Data.UID;
            localStorage.AuthTypeName = res.data.Data.AuthTypeName;
            localStorage.SiteUrl = res.data.Data.SiteUrl;
            localStorage.AuthType = res.data.Data.AuthType;
            localStorage.Username = res.data.Data.NickName;
            localStorage.Token = res.data.Data.Token;
            localStorage.PayType = res.data.Data.PayType;
            localStorage.FreePlanSiteUrl = res.data.Data.FreePlanSiteUrl;
            localStorage.tokenCode = this.$sha256
              .sha256(
                res.data.Data.Token +
                  this.$sha256.sha256(this.mobile.newpwd2).toUpperCase()
              )
              .toUpperCase();

            localStorage.user_name = this.mobile.num;
            localStorage.user_pwd = this.mobile.newpwd1;
            this.$router.push({
              path: "/"
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
