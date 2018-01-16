<template>
  <div>
      <m-header :title="title"></m-header>
      <div>
          hello
      </div>
  </div>
</template>

<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";

export default {
  name: "firstpage",
  data() {
    return {
      title: {
        text: "时时彩"
      },
      dataList: []
    };
  },
  components: {
    mHeader,
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append("Action", "GetServiceList");
      // this.$indicator.open(); 
      this.$http
        .post("https://idx.camew.com", data)
        .then(res => {
          // this.$indicator.close(); 
          console.log("getservicelist");
          this.dataList = res.data.Data;
        })
        .catch(error => {
          // this.$indicator.close(); 
        });
    },
  
  },
  mounted() {
    this.getData();
  }
};
</script>

