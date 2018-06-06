<template>
    <div class="main">
        <m-header :title="title"></m-header>
        <div class="main">
            <div class="line">
            </div>
            <input class="input1" v-model="msg.title" placeholder="请输入标题" type="text" @input="inputFuction">
            <div class="line">
            </div>
            <el-input class="input2" :rows="6" v-model="msg.content" placeholder="请输入反馈内容" type="textarea" @input="inputFuction"></el-input>
            <div>
                <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" @click="btnClick">提交</el-button>
                <el-button v-else :disabled="disabled" class="btnDefault" type="primary" @click="btnClick">提交</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  .line {
    background: #ededed;
    height: 10px;
  }
  .input1 {
    outline: none;
    margin: 10px 0px;
    height: 30px;
    padding-left: 15px;
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
}
</style>

<script>
import mHeader from "../../components/hearder/Hearder";
export default {
  data() {
    return {
      title: {
        text: "意见反馈",
        showBack: true
      },
      msg: {
        title: "",
        content: ""
      },
      disabled: true
    };
  },
  components: {
    mHeader
  },
  methods: {
    inputFuction() {
      if (this.msg.title.length > 0 && this.msg.content.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    btnClick() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Feedback" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&Title=" +
        this.msg.title +
        "&Message=" +
        this.msg.content +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Feedback");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Title", this.msg.title);
      data.append("Message", this.msg.content);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

      this.$http
        .post(this.$global.url, data)
        .then(res => {
          // this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
      this.msg.title = null;
      this.msg.content = null;
      this.disabled = true;
    }
  }
};
</script>
