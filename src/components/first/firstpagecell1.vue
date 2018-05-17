<template>
  <div class="container" v-if="celldata.PlanType == 1">
      <div class="cell" v-for="(cell,index) in celldata.Data">
          <!-- {{cell.Name}} -->
          <span class="leftd" v-if="cell.DsType === 0">{{cell.Name}}</span>
          <span v-else-if="cell.DsType === 1" class="lefts">{{cell.Name}}</span>
          <div class="center">
            <div class="c_top">{{cell.PlanSection}} &nbsp 第{{cell.EndIndex ? cell.EndIndex : 1}}期</div>
            <div class="c_bottom_d" v-if="cell.DsType === 0">{{cell.GuessValue}}</div>
            <div class="c_bottom_s" v-else-if="cell.DsType === 1">{{cell.GuessValue}}</div>
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
          <!-- {{cell.Name}} -->
          <span class="leftd" v-if="cell.DsType === 0">{{cell.Name}}</span>
          <span v-else-if="cell.DsType === 1" class="lefts">{{cell.Name}}</span>
          <div class="center">
            <div class="c_top">{{cell.PlanSection}} &nbsp 第{{cell.EndIndex ? cell.EndIndex : 1}}期</div>
            <div class="c_bottom_d" v-if="cell.DsType === 0">{{cell.GuessValue}}</div>
            <div class="c_bottom_s" v-else-if="cell.DsType === 1">{{cell.GuessValue}}</div>
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
    border-top: 1px dashed rgb(234, 234, 234);
    // box-shadow:#ebebeb 0px 4px 10px;
    display: flex;
    flex-direction: row;
  }
}

.leftd {
  width: 20%;
  margin: 4vw 0 4vw 0;
  padding: 2vw 2vw 2vw 1vw;
  text-align: left;
  font-size: 4vw;
  color: white;
  border-top-right-radius: 10vw;
  border-bottom-right-radius: 10vw;
  background: #61aedb;
  #bundle > .juzhong;
}
.lefts {
  width: 20%;
  margin: 4vw 0 4vw 0;
  padding: 2vw 2vw 2vw 1vw;
  text-align: left;
  font-size: 4vw;
  color: white;
  border-top-right-radius: 10vw;
  border-bottom-right-radius: 10vw;
  background: #fa6b86;
  #bundle > .juzhong;
}

.center {
  width: 60%;
  margin: 4vw 2vw 4vw 2vw;
  // background: red;
  text-align: left;
  -webkit-justify-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  .c_top{
    font-size: 3vw;
    font-weight: bold;
    color: rgb(167, 167, 167);
  }
  .c_bottom_d{
    margin-top: 5px;
    font-size: 4.5vw;
    font-weight: bold;
    color: #61aedb;
  }
  .c_bottom_s{
    margin-top: 5px;
    font-size: 4.5vw;
    font-weight: bold;
    color: #fa6b86;
  }
}

.right {
  width: 20%;
  margin: 4vw 0 4vw 0;
  #bundle > .juzhong;
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
    cellClick(index){
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

    console.log(this.celldata.Data)
    for(var i=0;i<this.celldata.Data.length;i++){
      var value = this.celldata.Data[i].GuessPercent.replace("%","");
      var time_canvas = document.getElementById(i);
      

      if(80<=parseInt(value)){
        this.$draw.drawMain(time_canvas, value, "rgb(76,179,85)", "rgb(195,195,195)");
      }else if(60<=parseInt(value) && 80 > parseInt(value)){
        this.$draw.drawMain(time_canvas, value, "rgb(86,165,96)", "rgb(195,195,195)");
      }else{
        this.$draw.drawMain(time_canvas, value, "rgb(200,0,30)", "rgb(195,195,195)");
      }
    }
  }
};
</script>
