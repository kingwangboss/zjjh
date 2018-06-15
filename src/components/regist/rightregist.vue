<template>
    <div class="container">
        <div>
         
            <div class="div-bor">
                <i class="icon-user"></i>
                <input class="input" v-model="user.name" type="text" maxlength="20" placeholder="请输入用户名" @input="inputFuction"></input>
            </div>

            <div class="div-bor">
                <i class="icon-phone"></i>
                <input class="input" v-model="user.num" type="text" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="安全手机" @input="inputFuction"></input>
            </div>

            <div class="div-bor">
                <i class="icon-pwd"></i>
                <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入密码" @input="inputFuction"></input>
            </div>

            <div class="div-bor">
                <i class="icon-pwd"></i>
                <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="请确认密码" @input="inputFuction"></input>
            </div>


            <div class="top">
                <div class="div-bor1">
                    <i class="icon-verify"></i>
                    <input class="input1"  v-model="user.yanzhengma" type="text" maxlength="4" placeholder="验证码" @input="inputFuction"></input>
                </div>
                <img style="margin-left:15px;width:100px;height:40px" :src="user.imgurl" alt="" @click="getData()">
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
  padding-top: 10%;
  padding-bottom: 40%;
  background: white;
  flex-direction: column;
  height: 100%;
  #bundle > .juzhong;
  .div-bor {
    position: relative;
    width: 270px;
    margin-bottom: 7%;
    height: 40px;
    line-height: 42px;
    border: 1px solid rgb(201, 202, 202);
    border-radius: 4px;
    background-color: white;
    .input {
      background: red;
      outline: none;
      background-color: transparent;
      margin-top: 3px;
      width: 70%;
      padding-left: 40px;
      font-size: 16px;
      color: black;
    }

  }
  .top {
    margin-top: 10%;
    display: flex;
    flex-direction: row;
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
        width: 70%;
        margin-top: 3px;
        padding-left: 40px;
        font-size: 16px;
        color: black;
      }
    }
  }

  .icon-user {
    position: absolute;
    left: 12px;
    top: 11px;
    z-index: 5;
    background-image: url("../../assets/login/whm.png");
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
  .icon-phone {
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
</style>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        num: "",
        newpwd1: "",
        newpwd2: "",
        vcode: "",
        imgurl: "",
        yanzhengma: ""
      },
      disabled: true
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      let data = new FormData();
      data.append("Action", "GetImgVCode");
      this.$http
        .post(this.$global.url, data)
        .then(res => {
          console.log(res);
          this.user.vcode = res.data.Data.token;
          this.user.imgurl = this.$global.url + res.data.Data.imgpath;
        })
        .catch(error => {
          console.log(error);
        });
    },

    inputFuction() {
      if (
        this.user.name.length > 0 &&
        this.user.newpwd1.length > 0 &&
        this.user.newpwd2.length > 0 &&
        this.user.num.length > 0 &&
        this.user.yanzhengma.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    submit: function(event) {
      this.getData();

      if (this.user.newpwd1 === this.user.newpwd2) {
        var formData = JSON.stringify(this.user); // 这里才是你的表单数据
        console.log(formData);

        var that = this;

        let data1 = new FormData();
        data1.append("Action", "UserNameReg3");
        data1.append("AppVersion", this.$global.AppVersion);
        data1.append("SID", localStorage.sid);
        data1.append("UserName", that.user.name);
        data1.append(
          "Pwd",
          this.$sha256.sha256(this.user.newpwd2).toUpperCase()
        );
        data1.append("ImgCode", that.user.vcode + that.user.yanzhengma);
        data1.append("SafeMobile", that.user.num);
        data1.append("AppType", that.$global.AppType);
        data1.append("AppCode", that.$global.AppCode);
        localStorage.pwd = this.$sha256.sha256(this.user.newpwd2).toUpperCase();
        that.$http
          .post(this.$global.url, data1)
          .then(res => {
            console.log(res);
            if (res) {
              localStorage.isLogin = true;

              localStorage.uid = res.data.Data.UID;
              localStorage.AuthTypeName = res.data.Data.AuthTypeName;
              localStorage.SiteUrl = res.data.Data.SiteUrl;
              localStorage.AuthType = res.data.Data.AuthType;
              localStorage.Username = res.data.Data.NickName;
              localStorage.Token = res.data.Data.Token;
              localStorage.PayType = res.data.Data.PayType;
              localStorage.tokenCode = this.$sha256
                .sha256(res.data.Data.Token + localStorage.pwd)
                .toUpperCase();
              localStorage.FreePlanSiteUrl = res.data.Data.FreePlanSiteUrl;
              localStorage.user_name = this.user.name;
              localStorage.user_pwd = this.user.newpwd1;
              localStorage.PlanType = "";
              localStorage.PlanID = "";
              localStorage.ParentPlanID = "";
              that.$router.push({
                path: "/"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
        this.user.yanzhengma = null;
      } else {
        MessageBox({
          title: "提示",
          message: "两次输入密码不同，请重新输入",
          showCancelButton: false
        });
      }
    }
  }
};
</script>
