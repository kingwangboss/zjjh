<template>
    <div class="main">
        <m-header :title="title"></m-header>
        <div class="top">
            <div class="cell">
                <span>原始密码：</span>
                <input v-model="pwd.oldpwd" placeholder="请输入原始密码" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div class="cell">
                <span>重设密码：</span>
                <input v-model="pwd.newpwd" placeholder="请输入6-20位数字或字母" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div class="cell">
                <span>确认密码：</span>
                <input v-model="pwd.newpwd1" placeholder="请在此输入新密码" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div>
                <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" @click="btnClick">修改密码</el-button>
                <el-button v-else :disabled="disabled" class="btnDefault" type="primary" @click="btnClick">修改密码</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(199, 199, 205);
  font-size: 3vw;
}

.top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgb(239, 239, 239);
  position: fixed;
  .cell {
    display: flex;
    flex-direction: row;

    margin-bottom: 5px;

    span {
      font-size: 3vw;
      // font-weight: 320;
      color: black;
      width: 20%;
      padding: 3% 1%;
      text-align: right;
      background: white;
    }
    input {
      outline: none;
      width: 80%;
    }
  }
}

.btnDefault {
  margin-top: 30px;
  width: 80%;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: rgb(253, 179, 9);
}
.btnEnable {
  margin-top: 30px;
  width: 80%;
  border: 0;
  color: #fff;
  font-size: 18px;
  background: rgb(253, 218, 111);
}
</style>


<script>
import mHeader from "../../components/hearder/Hearder";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      title: {
        text: "修改密码",
        showBack: true
      },
      pwd: {
        oldpwd: "",
        newpwd: "",
        newpwd1: ""
      },
      disabled: true
    };
  },
  components: {
    mHeader
  },
  methods: {
    btnClick() {
      console.log(this.pwd.oldpwd);
      console.log(this.pwd.newpwd);
      console.log(this.pwd.newpwd1);
      if (
        this.pwd.oldpwd.length == 0 ||
        this.pwd.newpwd == 0 ||
        this.pwd.newpwd1 == 0
      ) {
        MessageBox({
          title: "提示",
          message: "输入未完全",
          showCancelButton: false
        });
      } else {
        if (this.pwd.newpwd === this.pwd.newpwd1) {
          let tokenCode = localStorage.tokenCode;
          let signStr =
            "Action=ChangePwd" +
            "&SID=" +
            localStorage.sid +
            "&Token=" +
            localStorage.Token +
            "&OldPwd=" +
            this.$sha256.sha256(this.pwd.oldpwd).toUpperCase() +
            "&NewPwd=" +
            this.$sha256.sha256(this.pwd.newpwd1).toUpperCase() +
            tokenCode;
          let data = new FormData();
          data.append("Action", "ChangePwd");
          data.append("SID", localStorage.sid);
          data.append("Token", localStorage.Token);
          data.append(
            "OldPwd",
            this.$sha256.sha256(this.pwd.oldpwd).toUpperCase()
          );
          data.append(
            "NewPwd",
            this.$sha256.sha256(this.pwd.newpwd1).toUpperCase()
          );
          data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

          this.$http
            .post(this.$global.url, data)
            .then(res => {
              if (res.data.Code == "Suc") {
                localStorage.user_pwd = this.pwd.newpwd1;
                this.$router.go(-1);
              } else {
                this.pwd.oldpwd = null;
                this.pwd.newpwd = null;
                this.pwd.newpwd1 = null;
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

    inputFuction() {
      if (
        this.pwd.oldpwd.length > 0 &&
        this.pwd.newpwd.length > 0 &&
        this.pwd.newpwd1.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>
