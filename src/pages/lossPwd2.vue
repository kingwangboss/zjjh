<template>
  <div>
    <m-header :title="title"></m-header>

    <div class="maincontainer">
      <div class="content">
        <!-- <form @submit.prevent="submit"> -->
          <div>
            <div class="top">
                <div class="div-bor1">
                    <i class="icon-phone"></i>
                    <input class="input1" type="text" disabled="disabled" style="color:#ccc;" v-model="user.num1" maxlength="11" placeholder="请输入手机号码" @input="inputFuction"></input>
                </div>
              <!-- <input type="text" disabled="disabled" style="color:#ccc;" class="input1" v-model="user.num1" maxlength="11" placeholder="请输入正确的手机号码" @input="inputFuction"> -->
            
              <el-button style="margin-left:15px;width:100px;height:40px" class="btn" @click="ResetPwdSMS1">获取验证码</el-button>
            </div>
            <div class="bottom">
              <!-- <input class="input" v-model="user.verify" type="text" maxlength="20" placeholder="请输入验证码" @input="inputFuction">
              <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入6-18位新密码" @input="inputFuction">
              <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="确认输入" @input="inputFuction"> -->
                <div class="div-bor">
                    <i class="icon-verify"></i>
                    <input class="input" v-model="user.verify" type="text" maxlength="20" placeholder="请输入验证码" @input="inputFuction"></input>
                </div>

                <div class="div-bor">
                    <i class="icon-pwd"></i>
                    <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入6-18位新密码" @input="inputFuction"></input>
                </div>

                <div class="div-bor">
                    <i class="icon-pwd"></i>
                    <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="确认输入密码" @input="inputFuction"></input>
                </div>
              
            </div>
            <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary">确认修改</el-button>
            <el-button v-else :disabled="disabled" class="btnDefault" type="primary" @click="submit">确认修改</el-button>
          </div>
          
        <!-- </form> -->
      </div>
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
  color: #8c8c8c;
  font-size: 13px;
}

.maincontainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  .content {
    #bundle > .juzhong;
    margin-top: 20%;
    flex-direction: column;
    .top {
      margin-top: 20%;
      display: flex;
      flex-direction: row;
      .btn {
        // #bundle>.juzhong;
        margin-left: 15px;
        height: 40px;
        width: 100px;
        border-radius: 4px;
        background-color: white;
        border: solid #dedede 1px;
        // border: 0;
        color: rgb(145, 7, 95);
        font-size: 12px;
        align-content: center;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
    }

    .div-bor {
      position: relative;
      width: 270px;
      margin-bottom: 10%;
      height: 40px;
      line-height: 42px;
      border: solid #dedede 1px;
      border-radius: 4px;
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
    }
    .div-bor1 {
      position: relative;
      width: 155px;
      margin-bottom: 10%;
      height: 40px;
      line-height: 42px;
      border: solid #dedede 1px;
      border-radius: 4px;
      background-color: white;
      .input1 {
        outline: none;
        background-color: transparent;
        width: 70%;
        margin-top: 3px;
        padding-left: 40px;
        font-size: 16px;
        color: black;
      }
    }

    .icon-phone {
      position: absolute;
      left: 12px;
      top: 11px;
      z-index: 5;
      background-image: url("../assets/login/sj.png");
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
      background-image: url("../assets/login/mm.png");
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
      background-image: url("../assets/login/yzm.png");
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

    .btnDefault {
      margin-top: 30px;
      width: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      border: 0;
      color: #fff;
      font-size: 18px;
      background: rgb(253, 179, 9);
      margin-bottom: 5%;
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
      margin-bottom: 5%;
    }
  }
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "lossPwdVC",
  data() {
    return {
      title: {
        text: "找回密码",
        showBack: true
      },
      user: {
        num: localStorage.phoneNum,
        num1: "",
        verify: "",
        newpwd1: "",
        newpwd2: ""
      },
      disabled: true
    };
  },

  mounted() {
    var str = "*******";
    for (var i = 0; i < this.user.num.length; i++) {
      if (i > 6) {
        str = str + this.user.num[i];
      }
    }
    this.user.num1 = str;
  },

  methods: {
    inputFuction() {
      if (
        this.user.num.length > 0 &&
        this.user.verify.length > 0 &&
        this.user.newpwd1.length > 0 &&
        this.user.newpwd2.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    ResetPwdSMS1() {
      let data = new FormData();
      data.append("Action", "GetVCode");
      data.append("SID", this.user.sid);

      this.$http
        .post(this.$global.url, data)
        .then(res => {
          if (res) {
            console.log(res.data.Data);

            localStorage.vcode = res.data.Data;
            let data = new FormData();
            data.append("Action", "ResetPwdSMS");
            data.append("SID", localStorage.sid);
            data.append("Mobile", this.user.num);
            data.append("AppType", this.$global.AppType);
            data.append("VCode", res.data.Data);

            this.$http
              .post(this.$global.url, data)
              .then(res1 => {
                if (res1) {
                  console.log(res1);
                }
              })
              .catch(error1 => {
                console.log(error1);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    submit: function(event) {
      // var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      // console.log(formData);
      if (this.user.newpwd1 == this.user.newpwd2) {
        this.user.newpwd1 = this.$sha256.sha256(this.user.newpwd1).toUpperCase();
        // 请求数据
        let data = new FormData();
        data.append("Action", "ResetPwd2");
        data.append("Account", localStorage.Username);
        data.append("SID", localStorage.sid);
        data.append("Mobile", this.user.num);
        data.append("SMSCode", this.user.verify);
        data.append("Pwd", this.user.newpwd1);
        data.append("AppType", this.$global.AppType);
        this.$http
          .post(this.$global.url, data)
          .then(res => {
            console.log(res);
            if (res.data.Code == "Suc") {
              this.$router.push({
                path: "/login"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        MessageBox({
          title: "提示",
          message: "两次输入密码不同，请重新输入",
          showCancelButton: false
        });
      }
    }
  },
  components: {
    mHeader
  }
};
</script>