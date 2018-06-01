<template>
  <div class="container">
      <m-header :title="title"></m-header>
      <div class="line"></div>
      <mianfeijihuacell :planData="planData"></mianfeijihuacell>
      <div class="line"></div>
  </div>
</template>

<style lang="less" scoped>
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
import mianfeijihuacell from "../components/mianfeijihuacell/mianfeijihuacell1";
export default {
  data() {
    return {
      title: {
        text: "免费计划",
        showBack: true,
      },
      planData:"",
    };
  },
  components: {
    mHeader,
    mianfeijihuacell
  },
  methods: {
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetLotteryFreePlanList" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanType=" + "1" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetLotteryFreePlanList");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanType", "1");
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
