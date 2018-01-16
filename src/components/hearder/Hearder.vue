<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="title-wrapper">
                
                <!-- <span class="title">{{title.text}}</span> -->
                <span class="title">{{title.text}}
                  <img class="img1" src="../../assets/genhuan.png" alt="kkk" @click="fun1"/>
                </span>

                <span v-if="title.setting" class="right" @click="setting">
                    <img src="../../assets/setting.png" alt="设置" />
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
    background-color: rgb(219, 60, 62);
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
          width: 25px;
          height: 25px;
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
    fun1() {
      alert(1);
    },
    setting(){
      alert('setting');
    }
  }
};
</script>