<template>
  <div>
      <m-header :title="title"></m-header>

      <div>{{planData}}</div>

      <input type="number" v-model="tianshu" style="width:100px;height:40px;border:1px solid black">

      <button  @click="buy">购买</button>

  </div>
</template>


<style lang="less" scoped>

</style>


<script>
import mHeader from "../components/hearder/Hearder";
export default {
  data() {
    return {
      title: {
        text: "专家计划详情",
        showBack: true,
      },
      planData:"",
      id: this.$route.query.planid,
      tianshu:"",
    };
  },
  components: {
    mHeader,
  },
  methods: {
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetPlanDetails" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanID=" +
        this.id +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetPlanDetails");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanID", this.id);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
            if(res.data.Code === "Suc"){
                this.planData = res.data.Data;
            }else{
                
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    buy(){

      this.$router.push({
        path:"/pay",
        query: {
          planid: this.id,
          tianshu:this.tianshu
        },
      })
      
      
    }
  },
  mounted(){
    this.getData();
  }
}
</script>
