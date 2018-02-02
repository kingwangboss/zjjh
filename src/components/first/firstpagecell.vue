<template>
  <div class="container">
      <div class="cell" v-for="(cell,index) in celldata.Data">
          <div v-if="cell.DsType === 0" class="line1"></div>
          <div v-else-if="cell.DsType === 1" class="line2"></div>

          <span v-if="cell.DsType === 0" class="item1d">{{cell.Name}}</span>
          <span v-else-if="cell.DsType === 1" class="item1s">{{cell.Name}}</span>

          <div class="dashedline"></div>
          <span class="item2">{{cell.PlanSection}}</span>
          <div class="dashedline"></div>
          <span class="item3">第{{cell.EndIndex ? cell.EndIndex : 1}}期</span>
          <div class="dashedline"></div>
          <span class="item4">
            <!-- <span v-if="cell.DSType === 0" class="dtype">定</span>
            <span v-else-if="cell.DSType === 1" class="stype">杀</span> -->
            <img src="../../assets/ding.png" class="dtype1" v-if="cell.DSType === 0" alt="">
            <img src="../../assets/sha.png" class="stype1" v-else-if="cell.DSType === 1" alt="">
            <span>{{cell.GuessValue}}</span>
          </span>
          <div class="dashedline"></div>
          <div class="baifenbi">
              {{cell.GuessPercent}}
          </div>
          <div class="diandian" >

              <div v-for="(item1,index1) in analysis(cell.GuessResultList)">
                  <div class="dian1" v-if="item1 == '1' && index1 === 0" style="border-top-left-radius: 2px;border-bottom-left-radius: 2px;"></div>
                  <div class="dian1" v-if="item1 == '1' && index1 === analysis(cell.GuessResultList).length - 1" style="border-top-right-radius: 2px;border-bottom-right-radius: 2px;"></div>
                  <div class="dian1" v-if="item1 == '1' && index1 != 0 && index1 != analysis(cell.GuessResultList).length - 1"></div>

                  <div class="dian2" v-if="item1 == '0' && index1 === 0" style="border-top-left-radius: 2px;border-bottom-left-radius: 2px;"></div>
                  <div class="dian2" v-if="item1 == '0' && index1 === analysis(cell.GuessResultList).length - 1" style="border-top-right-radius: 2px;border-bottom-right-radius: 2px;"></div>
                  <div class="dian2" v-if="item1 == '0' && index1 != 0 && index1 != analysis(cell.GuessResultList).length - 1"></div>
              </div>
              
          </div>
      </div>
  </div>
</template>


<style lang="less" scoped>
#bundle {
  .juzhong {
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}
.container {
  .cell {
    box-shadow:#ebebeb 0px 4px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 5px 1.2% 5px 1.2%;
    width: 30.2%;
    // min-width: 30.2%;
    border-right: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    border-radius: 3px;

    span {
      margin: 8px 0px;
      line-height: 4.5vw;
      font-size: 3.5vw;
      color: #4c4c4c;
    }
    .line1 {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      background-color: #61aedb;
      height: 3px;
      width: 100%;
    }
    .line2 {
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      background-color: #fa6b86;
      height: 3px;
      width: 100%;
    }
    .dashedline {
      border-bottom: 1px dashed #ebebeb;
      margin:0px 15px;
    }

    .item1d {
      color: #61aedb;
    }
    .item1s {
      color: #fa6b86;
    }
    .item2 {
    }
    .item3 {

    }
    .item4 {
      margin-left:5px;
      margin-right:5px;
      .dtype{
        padding: 1px;
        border-radius: 3px;
        background-color: #61aedb;
        color: white;
      }
      .stype{
        padding: 1px;
        border-radius: 3px;
        background-color: #fa6b86;
        color: white;
      }

      .dtype1{
        position: relative;
        top:0.5vw;
        height: 4vw;
      }
      .stype1{
        position: relative;
        top:0.5vw;
        height: 4vw;
      }
    }
    .baifenbi {
      margin-top: 10px;
      margin-bottom: 1px;
      font-size: 2vw;
      color: #4c4c4c;
    }
    .diandian {
      margin-bottom: 10px;
      margin-top: 1px;
      font-size: 2vw;
      display: flex;
      flex-direction: row;
      #bundle > .juzhong;
      .dian1 {
        height: 4px;
        width: 7px;
        margin-left: 1px;
        margin-right: 1px;
        background-color: rgb(75, 199, 104);
      }
      .dian2 {
        height: 4px;
        width: 7px;
        margin-left: 1px;
        margin-right: 1px;
        background-color: rgb(244, 24, 51);
      }
      .dian11 {
        height: 4px;
        width: 7px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        margin-left: 1px;
        margin-right: 1px;
        background-color: rgb(75, 199, 104);
      }
      .dian22 {
        height: 4px;
        width: 7px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        margin-left: 1px;
        margin-right: 1px;
        background-color: rgb(244, 24, 51);
      }
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
    isShow(index,max){
        if(index != 0 && index != max - 1){
            return true;
        }else{
            return false;
        }
    }
  },
  watch: {
   'plandata': function (now, old) {
    this.celldata = this.plandata;
   },
   
  },
  created() {
    this.celldata = this.plandata;
    console.log(this.celldata);
  }
};
</script>
