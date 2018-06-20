<template>
    <div >
        <m-header :title="title"></m-header>
        <div class="main">
            
            <div class="box">
                <!-- <div class="content">
                    <p>
                        彩软科技创建于2017年初，旗下拥有赢彩王系列彩票分析软件及app，是互联网彩票分析领域的创新者，领导者。
                    </p>
                    <p>
                        赢彩王系列软件拥有超级丰富的计划库，提供超强计划追号、云端计划管理、多平台一致的使用体验等前瞻性功能。
                    </p>
                    <p>
                        我们将以先进的技术和完善的服务为中国福利彩票事业贡献自己的力量。
                    </p>
                </div> -->
                <div class="bottom">
                    <p>版本：1.0</p>
                    <p>
                      <span>官方网站：</span>
                      <el-button type="text" style="color:rgb(255,191,0)" @click="urlClick">{{OfficialUrl}}</el-button>
                    </p>
                    <p>版权所有：深圳市赢未来科技有限公司</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: rgb(239, 239, 239);
  position: absolute;
  color: rgb(51, 51, 51);
  #bundle > .juzhong;
}

#bundle {
  .juzhong {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}
.box {
  margin-top: -10%;
  width: 90%;
  height: 88%;
  //   height: 80vw;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 5px;
  box-shadow: 0px 0px 5px #a3a3a3;
  background: white;
  p {
    text-align: left;
    text-indent: 2em;
    padding-bottom: 10px;
  }
}

.bottom {
  //   font-size: 13px;
  margin: 5vw 0 5vw 0;
}
</style>

<script>
import mHeader from "../../components/hearder/Hearder";
export default {
  data() {
    return {
      title: {
        text: "关于我们",
        showBack: true
      },
      OfficialUrl: localStorage.OfficialUrl
    };
  },
  components: {
    mHeader
  },
  methods: {
    urlClick() {
      window.location.href = this.OfficialUrl;
    }
  }
};
</script>
