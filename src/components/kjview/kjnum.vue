<template>
    <div class="content" v-else>
        <div v-show="isLan(index)" class="kjnum" :style="{width:ojwidth1+'px',height:ojwidth1+'px',borderRadius:ojwidth1+'px',lineHeight:ojwidth1 + 2 +'px'}" v-for="(item,index) in numArr">{{item}}</div>
        <div v-show="!isLan(index)" class="kjnum1" :style="{width:ojwidth1+'px',height:ojwidth1+'px',borderRadius:ojwidth1+'px',lineHeight:ojwidth1 + 2 +'px'}" v-for="(item,index) in numArr">{{item}}</div>
    </div>
</template>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .kjnum {
    font-size: 4vw;
    background: #ffffff;
    line-height: 30px;
    width: 30px;
    border-radius: 30px;
    text-align: center;
    margin: 5px;
    color: rgb(145, 7, 95)  ;
    font-weight: 600;
  }
  .kjnum1 {
    font-size: 4vw;
    background: rgb(0,204,255);
    line-height: 30px;
    width: 30px;
    border-radius: 30px;
    text-align: center;
    margin: 4px;
    color: white;
    font-weight: 600;
    // background-color:rgb(63, 123, 244);
  }
}
</style>


<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      numArr: "",
      // width: 100,
      screenWidth: document.body.clientWidth -10  // 这里是给到了一个默认值 （这个很重要）
    };
  },
  methods: {
    isLan(index) {
      if (index === 20) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.numArr = this.data;
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        
        that.screenWidth = window.screenWidth;
        
      })();
    };
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          // that.init()
          that.timer = false;
        }, 400);
        console.log(this.screenWidth)
      }
    },
    'data':function(now,old){
      this.numArr = this.data;
    }
  },
  // components: {
  //     numArr: num,
  // },
  computed: {
    
    ojwidth1: {
      get: function() {
        var ojwidth;
        var margin;
        var colnum = 10; //列
        colnum = this.numArr.length > colnum ? colnum : 10;
        var rownum = 10 / colnum; //行
        margin = 4.5; //间距
        ojwidth = (this.screenWidth - 10  - 2 * margin * colnum) / colnum; //格子的宽
        return ojwidth;
      },
      // setter
      set: function(newValue) {}
    },
  }
};
</script>

