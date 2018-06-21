<template>
    <div class="main">
        <div class="gif"></div>
    </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: rgb(145, 7, 95);
  position: absolute;
  top: 0;
}
.gif {
  position: relative;
  margin: 10vw auto;
  height: 150px;
  width: 250px;
  background-image: url(../assets/loading2.jpg);
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% 100%;
}
</style>


<script>
var tiemInterval;
export default {
  data() {
    return {
      time: 1
    };
  },
  created() {},
  mounted() {
    // 设置定时器，每1秒刷新一次
    var that = this;
    tiemInterval = setInterval(getTotelNumber, 1000);
    function getTotelNumber() {
      if (that.time > 0) {
        that.time--;
        console.log(that.time);
      } else {
        clearInterval(tiemInterval);
        //系统判断
        if (!that.IsPC()) {
          if (
            localStorage.sid &&
            localStorage.Token &&
            localStorage.tokenCode
          ) {
            that.$router.push("/firstpage");
          } else {
            if(localStorage.sid){
              that.$router.push("/login");
            }else{
              that.$router.push("/XZcaizhong");
            }
          }
        } else {
          // this.$router.push('/error')
          if (
            localStorage.sid &&
            localStorage.Token &&
            localStorage.tokenCode
          ) {
            that.$router.push("/firstpage");
          } else {
            if(localStorage.sid){
              that.$router.push("/login");
            }else{
              that.$router.push("/XZcaizhong");
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(tiemInterval);
  },
  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["iPhone", "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  }
};
</script>
