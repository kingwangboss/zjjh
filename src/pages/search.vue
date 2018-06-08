<template>
    <div class="main">
        <m-header :title="title"></m-header>
        <mt-search class="search" v-model="value" @input="click(value)" cancel-text="" placeholder="搜索">
            <div style="margin-top:10px;">
                <zhuanjiajihuacell :planData="result"></zhuanjiajihuacell>
            </div>
        </mt-search>
    </div>
</template>

<style lang="less" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 44px;
  .seaech {
    //   margin: 10px;
  }
  .cell {
    // margin-top: 10px;
    text-align: left;
    padding: 10px 20px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    color: rgb(51, 51, 51);
  }
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import zhuanjiajihuacell from "../components/zhuanjiajihuacell/zhuanjiajihuacell1";
import { Search, Cell } from "mint-ui";
export default {
  data() {
    return {
      title: {
        text: "计划搜索",
        showBack: true
      },
      value: "",
      result: ""
    };
  },
  components: {
    mHeader,
    Search,
    Cell,
    zhuanjiajihuacell,
  },
  methods: {
    click(value) {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=SearchFreePlanList" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanName=" +
        value +
        "&PlanType=" +
        "2" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "SearchFreePlanList");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanName", value);
      data.append("PlanType", "2");
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.result = res.data.Data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
