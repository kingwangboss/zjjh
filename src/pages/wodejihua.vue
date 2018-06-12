<template>
  <div class="container">
      <m-header :title="title"></m-header>
      <div v-if="planData">
        <div class="line"></div>
        <wodejihuacell :planData="planData"></wodejihuacell>
        <div class="line"></div>
      </div>
      <div class="div" v-else>
        暂无数据
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
.div{
  position: absolute;
  width: 100%;
  height: 94%;
  background-color: #f8f8f8;
  #bundle>.juzhong;
  color: #b3b3b3;
  font-size: 6vw;
}
.line {
  background-color: #f8f8f8;
  width: 100%;
  height: 1px;
}
.container {
  background-color: #f8f8f8;
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
import wodejihuacell from "../components/wodejihuacell/wodejihuacell1";
export default {
  data() {
    return {
      title: {
        text: "我的计划",
        showBack: true,

      },
      planData:"",
    };
  },
  components: {
    mHeader,
    wodejihuacell
  },
  methods: {
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetUserAuthPlanList" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetUserAuthPlanList");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.planData = res.data.Data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted(){
    this.getData();
  }
};
</script>
