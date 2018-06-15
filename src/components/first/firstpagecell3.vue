<template>
<div class="container">
      <div class="line"></div>
      <div class="bottomcontainer" v-for="(cell,index) in celldata.Data" @click="cellClick(index)" >
            <div style="background:#fff;">
                <div class="cell-top">
                <div class="cell-top-left">
                    <img src="../../assets/sj.png" alt="">
                    <span>{{cell.Name.replace("定码","")}}</span>
                </div>

                <div class="cell-top-right">
                    <div class="diandian">
                        <div v-for="(item,i) in analysis(cell.GuessResultList)" :key="i">
                            <div v-if="item === '1'" class="dianMiddle" style="background:rgb(67,199,77);"></div>
                            <div v-else-if="item === '0'" class="dianMiddle" style="background:rgb(214,49,56);"></div>
                            <div v-else class="dianMiddle" style="background:black;"></div>
                        </div>
                    </div>
                    <span class="baifenbi">{{cell.GuessPercent}}</span>
                </div>

            </div>

              <div class="cell-bottom">
                  <span class="item1">{{cell.PlanSection}}</span>
                  <div v-if="cell.DsType === 0">
                    <div class="item2" v-if="cell.EndIndex === 1" style="border: 1px solid rgb(58, 191, 60);background: rgb(58, 191, 60);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}定
                    </div>
                    <div class="item2" v-else-if="cell.EndIndex === 2" style="border: 1px solid rgb(248, 198, 65);background: rgb(248, 198, 65);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}定
                    </div>
                    <div class="item2" v-else-if="cell.EndIndex > 2" style="border: 1px solid rgb(214, 49, 56);background: rgb(214, 49, 56);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}定
                    </div>
                    <div class="item2" v-else style="border: 1px solid rgb(58, 191, 60);background: rgb(58, 191, 60);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}定
                    </div>
                  </div>
                  <div v-else-if="cell.DsType === 1">
                    <div class="item2" v-if="cell.EndIndex === 1" style="border: 1px solid rgb(58, 191, 60);background: rgb(58, 191, 60);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}杀
                    </div>
                    <div class="item2" v-else-if="cell.EndIndex === 2" style="border: 1px solid rgb(248, 198, 65);background: rgb(248, 198, 65);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}杀
                    </div>
                    <div class="item2" v-else-if="cell.EndIndex > 2" style="border: 1px solid rgb(214, 49, 56);background: rgb(214, 49, 56);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}杀
                    </div>
                    <div class="item2" v-else style="border: 1px solid rgb(58, 191, 60);background: rgb(58, 191, 60);">
                      {{cell.EndIndex ? cell.EndIndex : 1}}杀
                    </div>
                  </div>
                  <span v-if="cell.DsType === 0" class="item4" style="color:rgb(53,131,193)">{{cell.GuessValue}}</span>
                  <span v-if="cell.DsType === 1" class="item4" style="color:rgb(214, 49, 56)">{{cell.GuessValue}}</span>
              </div>
            </div>

            <div class="line"></div>
      </div>
</div>  
</template>


<style lang="less" scoped>
.line {
  background: rgb(242, 242, 242);
  height: 4px;
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

.bottomcontainer {
  display: flex;
  flex-direction: column;
  // border-bottom: 1px solid #efefef;
  word-wrap: break-word;
  justify-content: space-between;
  .cell-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    .cell-top-left {
      display: flex;
      flex-direction: row;
      margin-left: 5px;
      img {
        width: 17px;
        height: 17px;
        margin: 4px;
      }
      span {
        line-height: 26px;
        font-size: 12px;
        font-weight: 500;
      }
    }

    .cell-top-right {
      display: flex;
      flex-direction: row;
      .diandian {
        margin-bottom: 5px;
        #bundle > .juzhong;
      }

      .dianMiddle {
        height: 4px;
        width: 7px;
        margin-left: 2px;
        margin-top: 5px;
        color: white;
        text-align: center;
        transform: skewX(-45deg);
        border-radius: 1px;
      }

      .baifenbi {
        width: 30px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        #bundle > .juzhong;
        // color: #767676;
      }
    }
  }

  .cell-bottom {
    display: flex;
    flex-direction: flex-start;
    margin-top: 3px;
    margin-bottom: 10px;
    margin-left: 5px;
    .item1 {
      margin: 4px;
      font-size: 12px;
    }
    .item2 {
      font-size: 12px;
      margin-top: 2px;
      margin-right: 4px;
      height: 14px;
      line-height: 15px;
      color: #fff;
      
      border-radius: 14px;
      padding: 0 5px;
    }
    .item3 {
      margin-top: 2px;
      margin-right: 4px;
      width: 14px;
      height: 14px;
      line-height: 14px;
    }
    .item4 {
      font-size: 14px;
      margin-top: 4px;
      margin-left: 4px;
      width: 60%;
      word-wrap: break-word;
      text-align: left;
    }
  }
}
</style>

<script>
export default {
  props: ["plandata"],
  data() {
    return {
      celldata: Object
    };
  },
  methods: {
    analysis(str) {
      var temp = [];
      temp = str.split(",").reverse();
      return temp;
    },
    isShow(index, max) {
      if (index != 0 && index != max - 1) {
        return true;
      } else {
        return false;
      }
    },
    cellClick(index) {
      // alert(index);
      localStorage.detailID = index;
      this.$router.push({
        path: "/planDetail"
      });
    }
  },
  watch: {
    plandata: function(now, old) {
      this.celldata = this.plandata;
    }
  },
  created() {
    this.celldata = this.plandata;
    console.log(this.celldata);
  },
  mounted() {}
};
</script>
