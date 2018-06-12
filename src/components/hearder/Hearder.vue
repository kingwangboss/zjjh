<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="title-wrapper">
                
                <!-- <span class="title">{{title.text}}</span> -->
                <span class="title">{{title.text}}
                  <img v-if="title.img" class="img1" src="../../assets/genhuan1.png" alt="kkk" @click="qhCZ"/>
                </span>

                <span v-if="title.setting" class="right" @click="setting">
                    <img src="../../assets/setting.png" alt="设置" />
                </span>

                <span v-if="title.showBack" class="left" @click="back">
                    <img src="../../assets/back.png" alt="返回" />
                </span>

                <span v-if="title.shousuo" class="right" @click="shousuo">
                  <img src="../../assets/img_search.png" alt="搜索" />
                </span>
                

            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header-wrapper {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  .header {
    height: 44px;
    // background-color: rgb(219, 60, 62);
    // background: url(../../assets/jianbian.png);
    background: rgb(145, 7, 95);
    line-height: 44px;
    text-align: center;
    .title-wrapper {
      font-size: 15px;
      color: #fcfcfc;
      span {
        display: inline-block;
      }
      .title {
        position: absolute;
        width: 100%;
        left: 50%;
        margin-left: -50%;
        font-size: 20px;
        font-weight: 500;
      }
      .img1 {
        width: 17px;
        height: 17px;
      }

      .right {
        position: absolute;
        right: 20px;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .left {
        position: absolute;
        left: 20px;
        img {
          width: 10px;
          height: 18px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>


<script>
import sha256 from "../../util/sha256";
export default {
  props: {
    title: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    qhCZ() {
      this.$router.push({
        path: "/XZcaizhong"
      });
    },
    setting() {
      this.$router.push({
        path: "/wo"
      });
    },
    back() {
      this.$router.go(-1);
    },
    shousuo() {
      this.$router.push("/search");
    }
  }
};
</script>