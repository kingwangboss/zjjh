<template>
  <div>
      <m-header :title="title"></m-header>
      
      <div class="container">
        <div class="top">
          <kjview :kjdata="kjData"></kjview>
        </div>

        <div class="middle">
          middle
        </div>

        <div class="bottom">
          bottom
        </div>
      </div>

  </div>
</template>

<style lang="less" scoped>

</style>


<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
import kjview from "../components/kjview/kjview";
import firstcell from "../components/first/firstpagecell";
export default {
  name: "firstpage",
  data() {
    return {
      title: {
        text: "时时彩",
        setting: true,
        img: true
      },
      num: 1,
      kjData: "",
    };
  },
  components: {
    mHeader,
    kjview,
    firstcell
  },
  methods: {

  },
  mounted() {
    this.getkjData();
  },
  methods: {
    getkjData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Clock" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&CurrentLottery=0" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Clock");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("CurrentLottery", "0");
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      //getClock握手
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.kjData = res.data.Data

        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

