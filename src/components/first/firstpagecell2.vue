<template>
  <div class="container" v-if="celldata.PlanType == 1">
      <div class="cell" v-for="(cell,index) in celldata.Data">

          <div class="left">
              <div class="top">
                  <div class="m_content_l">{{cell.Name}}</div>
                  <div style="border-right:1px solid rgb(234, 234, 234)" class="m_content">{{cell.PlanSection}}</div>
                  <div class="m_content_r" style="color:rgb(102,170,247);" v-if="cell.DsType === 0">
                      <span class="btn">{{cell.EndIndex ? cell.EndIndex+' ' : ""}}定</span>
                  </div>
                  <div class="m_content_r" style="color:rgb(255,76,90);" v-else-if="cell.DsType === 1">
                      <span class="btn1">{{cell.EndIndex ? cell.EndIndex+' ' : ""}}杀</span>
                  </div>
                  <div v-else></div>
              </div>
              
              <div class="bottom" style="color:rgb(102,170,247);" v-if="cell.DsType === 0">{{cell.GuessValue}}</div>
              <div class="bottom" style="color:rgb(255,76,90);" v-else-if="cell.DsType === 1">{{cell.GuessValue}}</div>
          </div>

          <div class="right">
            <div class="time-graph">  
              <canvas :id="index" style="width:15vw;height:15vw;" width="120" height="120"></canvas>  
            </div>  
          </div>
      </div>
  </div>

  <div class="container" v-else-if="celldata.PlanType == 2">
      <div class="cell" v-for="(cell,index) in celldata.Data" @click="cellClick(index)">

          <div class="left">
              <div class="top">
                  <div class="m_content_l">{{cell.Name}}</div>
                  <div style="border-right:1px solid rgb(234, 234, 234)" class="m_content">{{cell.PlanSection}}</div>
                  <div class="m_content_r" style="color:rgb(102,170,247);" v-if="cell.DsType === 0">
                      <span class="btn">{{cell.EndIndex ? cell.EndIndex+' ' : ""}}定</span>
                  </div>
                  <div class="m_content_r" style="color:rgb(255,76,90);" v-else-if="cell.DsType === 1">
                      <span class="btn1">{{cell.EndIndex ? cell.EndIndex+' ' : ""}}杀</span>
                  </div>
                  <div v-else></div>
              </div>
              
              <div class="bottom" style="color:rgb(102,170,247);" v-if="cell.DsType === 0">{{cell.GuessValue}}</div>
              <div class="bottom" style="color:rgb(255,76,90);" v-else-if="cell.DsType === 1">{{cell.GuessValue}}</div>
          </div>

          <div class="right">
            <div class="time-graph">  
              <canvas :id="index" style="width:15vw;height:15vw;" width="120" height="120"></canvas>  
            </div>  
          </div>
      </div>
  </div>

  <div v-else>

  </div>

  
</template>


<style lang="less" scoped>
.time-graph {
  display: flex;
  justify-content: center;
  align-items: center;
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
.container {
  .cell {
    
    display: flex;
    flex-direction: row;
    margin-top: 2vw;
  }
}

.left {
  width: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  // #bundle > .juzhong;
  .top {
    text-align: left;
    border-bottom: 1px solid rgb(234, 234, 234);
    color: black;
    font-size: 4vw;
    line-height: 6vw;
    // padding-left: 2vw;
    display: flex;
    flex-direction: row;
    line-height: 8vw;
  }

  .m_content_l{
      border-right:1px solid rgb(234, 234, 234); 
      color:black;
      width:38vw;
      padding-left:10px;
    //   text-align:center;
  }
  .m_content_r{
      padding:0 10px;
      font-size: 3vw;
  }

  .m_content {
      padding:0 10px;
      font-size: 3vw;
      color: rgb(170,170,170);
      .btn {
        padding: 2px 6px;
        min-width: 50px;
        border: 1px solid rgb(102,170,247);;
        border-radius: 3vw;
        font-size: 3vw;
        color:rgb(102,170,247);
      }
      .btn1 {
        padding: 2px 6px;
        min-width: 50px;
        border: 1px solid rgb(255,76,90);
        border-radius: 3vw;
        font-size: 3vw;
        color:rgb(255,76,90);
      }
    }
  .bottom {
    text-align: left;
    font-size: 5vw;
    padding: 1vw 2vw;
  }
}

.right {
  width: 20%;
  #bundle > .juzhong;
  background: white;
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
      alert(index);
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
  mounted() {
    var time_canvas = document.getElementById("0");
    this.$draw.drawMain(time_canvas, 70, "rgb(185,18,47)", "rgb(195,195,195)");

    console.log(this.celldata.Data);
    for (var i = 0; i < this.celldata.Data.length; i++) {
      var value = this.celldata.Data[i].GuessPercent.replace("%", "");
      var time_canvas = document.getElementById(i);

      if (80 <= parseInt(value)) {
        this.$draw.drawMain(
          time_canvas,
          value,
          "rgb(53,198,76)",
          "rgb(198,198,198)"
        );
      } else if (60 <= parseInt(value) && 80 > parseInt(value)) {
        this.$draw.drawMain(
          time_canvas,
          value,
          "rgb(251,158,23)",
          "rgb(198,198,198)"
        );
      } else {
        this.$draw.drawMain(
          time_canvas,
          value,
          "rgb(255,76,90)",
          "rgb(198,198,198)"
        );
      }
    }
  }
};
</script>
