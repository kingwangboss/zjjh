<template>
  <div @touchmove.prevent>
    <m-header :title="title"></m-header>
    <div class="btnview">
      
      <div class="content">
            <el-button :class="{ 'btnDefault' : isA, 'btnEnable': !isA}" type="text" @click="btnClick">手机注册</el-button>
            <div class="line"></div>
            <el-button :class="{ 'btnEnable' : isA, 'btnDefault': !isA}" type="text" @click="btnClick">用户名注册</el-button>
      </div>
      <i :class="{ 'def' : isA, 'ena': !isA}" class="def"></i>
    </div>

    <leftRegist v-show="!isA"></leftRegist>
    <rightRegist v-show="isA"></rightRegist>

  </div>
</template>

<style lang="less" scoped>
.line {
  margin: 10px 0px 10px 0px;
  background: #efefef;
  width: 2px;
}
.def {
  position: absolute;
  left: 75% - 2vw;
  bottom: -0vw;
  background-image: url("../assets/login/jiantou.png");
  background-size: 100% 100%;
  /*引入图片图片*/
  background-repeat: no-repeat;
  /*设置图片不重复*/
  background-position: 0px 0px;
  /*图片显示的位置*/
  width: 4vw;
  /*设置图片显示的宽*/
  height: 3vw;
  /*图片显示的高*/
}

.ena {
  position: absolute;
  left: 25% - 2vw;
  bottom: -0vw;
  background-image: url("../assets/login/jiantou.png");
  background-size: 100% 100%;
  /*引入图片图片*/
  background-repeat: no-repeat;
  /*设置图片不重复*/
  background-position: 0px 0px;
  /*图片显示的位置*/
  width: 4vw;
  /*设置图片显示的宽*/
  height: 3vw;
  /*图片显示的高*/
}

.btnview {
  width: 100%;
  height: 20vw;
  position: relative;
  // background: url(../assets/login_regist/r_bg.png);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  background: rgb(145, 7, 95);
  .content {
    position: relative;
    top: 40%;
    display: flex;
    flex-direction: row;
  }

  .btnDefault {
    width: 50%;
    height: 100%;
    font-weight: bold;
    font-size: 4vw;
    color: white;
  }
  .btnEnable {
    width: 50%;
    height: 100%;
    font-weight: bold;
    font-size: 4vw;
    color: white;
  }
  
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import leftRegist from "../components/regist/leftregist";
import rightRegist from "../components/regist/rightregist";

export default {
  name: "registVC",
  data() {
    return {
      title: {
        text: "注册",
        showBack: true
      },
      isA: false
    };
  },
  created() {
    if (localStorage.sid) {
    } else {
      // this.$router.push({
      //   path: '/XZcaizhong'
      // })
      localStorage.sid = "2";
      localStorage.czname = "北京pk10";
    }
  },
  components: {
    mHeader,
    leftRegist,
    rightRegist
  },
  methods: {
    btnClick(event) {
      this.isA = !this.isA;
    }
  }
};
</script>
