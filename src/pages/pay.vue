<template>
    <div>
        <m-header :title="title"></m-header>
        <div class="main">

            <div v-for="(item,index) in paytype" :key="item">
                <div v-if="item == 2">
                    <div class="cell" @click="cellClick(index)">
                        <img class="img1" src="../assets/pay/zflog.png" alt="">
                        <div class="title">
                            <span class="title-span1">{{listData.PriceList[index].PayTypeTitle}}</span>
                            <span class="title-span2">{{listData.PriceList[index].PayTypeDesc}}</span>
                        </div>
                        <img class="img2" v-show="isSelect != 2" src="../assets/pay/quan1.png" alt="">
                        <img class="img2" v-show="isSelect == 2" src="../assets/pay/quan2.png" alt="">
                    </div>
                    <div class="line">
                    </div>
                </div>
                <div v-else-if="item == 1">
                    <div class="cell" @click="cellClick(index)">
                        <img class="img1" src="../assets/pay/wxlog.png" alt="">
                        <div class="title">
                            <span class="title-span1">{{listData.PriceList[index].PayTypeTitle}}</span>
                            <span class="title-span2">{{listData.PriceList[index].PayTypeDesc}}</span>
                        </div>
                        <img class="img2" v-show="isSelect != 1" src="../assets/pay/quan1.png" alt="">
                        <img class="img2" v-show="isSelect == 1" src="../assets/pay/quan2.png" alt="">
                    </div>
                    <div class="line">
                    </div>
                </div>

                <div v-else-if="item == 3">
                    <div class="cell" @click="cellClick(index)">
                        <img class="img1" src="../assets/pay/zizhulog.png" alt="">
                        <div class="title">
                            <span class="title-span1">{{listData.PriceList[index].PayTypeTitle}}</span>
                            <span class="title-span2">{{listData.PriceList[index].PayTypeDesc}}</span>
                        </div>
                        <img class="img2" v-show="isSelect != 3" src="../assets/pay/quan1.png" alt="">
                        <img class="img2" v-show="isSelect == 3" src="../assets/pay/quan2.png" alt="">
                    </div>
                    <div class="line">
                    </div>
                </div>
                
            </div>
        </div>

        <div class="bottom-btndiv">
            <button class="bottom-btn" @click="payClick">确认支付 {{price}}</button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  .line {
    height: 1px;
    background: #efefef;
  }
}

.cell {
  display: flex;
  flex-direction: row;
  height: 60px;
  .img1 {
    margin: 15px 15px;
    height: 30px;
    widows: 30px;
  }
  .img2 {
    margin: 20px 20px;
    height: 20px;
    widows: 20px;
  }
  .title {
    margin: 10px 0px;
    height: 40px;
    width: 80%;
    display: flex;
    flex-direction: column;
    .title-span1 {
      text-align: left;
      font-size: 16px;
      color: black;
    }
    .title-span2 {
      text-align: left;
      margin-top: 10px;
      font-size: 11px;
      color: #b7b7b7;
    }
  }
}

.bottom-btnView {
  width: 100%;
  position: fixed;
  bottom: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
}

.bottom-btn {
  margin-top: 100%;
  margin-top: 100px;
  width: 60%;
  height: 40px;
  border-radius: 5px;
  line-height: 35px;
  background-color: rgb(253, 179, 9);
  border-color: rgba(0, 0, 0, 0);
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  outline: none;
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      title: {
        text: "支付订单",
        showBack: true,
        right: false
      },
      listData: "",
      price: "",
      url: "",
      paytype: localStorage.PayType.split(","),
      isSelect: "",
      id: this.$route.query.planid,
      tianshu: this.$route.query.tianshu,
    };
  },
  components: {
    mHeader
  },
  methods: {
    payClick() {
      console.log(this.pid);
      console.log(this.isSelect);
      if (this.isSelect == 1) {
        console.log("微信");

        this.pay(this.isSelect);

      
      } else if (this.isSelect == 2) {
        console.log("zhifubao");

        this.pay(this.isSelect);
        
        
      } else if (this.isSelect == 3) {
        console.log("zizhu");

        this.pay(this.isSelect);
      }
    },

    pay(isSelect){
      let tokenCode = localStorage.tokenCode;
        let signStr =
          "Action=SubmitOrder" +
          "&SID=" +
          localStorage.sid +
          "&PID=" +
          this.id +
          "&PayType=" +
          isSelect +
          "&Days=" + 
          this.tianshu + 
          "&Token=" +
          localStorage.Token +
          tokenCode;
        let data = new FormData();
        data.append("Action", "SubmitOrder");
        data.append("SID", localStorage.sid);
        data.append("PID", this.id);
        data.append("PayType", isSelect);
        data.append("Days", this.tianshu);
        data.append("Token", localStorage.Token);
        data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());

        this.$http
          .post(localStorage.FreePlanSiteUrl, data)
          .then(res => {
            this.url = res.data.Data.PayParamUrl;
            window.location.href = this.url;
          })
          .catch(error => {
            console.log(error);
          });
    },
    cellClick(index) {
      this.isSelect = this.paytype[index];
      if (this.isSelect == 1) {
        console.log("微信");
        this.price = this.listData.PriceList[index].PayTypeDisPrice.toFixed(2);
      } else if (this.isSelect == 2) {
        console.log("zhifubao");
        this.price = this.listData.PriceList[index].PayTypeDisPrice.toFixed(2);
      }
      else if (this.isSelect == 3) {
        console.log("zizhu");
        this.price = this.listData.PriceList[index].PayTypeDisPrice.toFixed(2);
      }
    },
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetServicePriceByPid" +
        "&SID=" +
        localStorage.sid +
        "&PID=" +
        this.id +
        "&Days=" +
        this.tianshu +
        "&Token=" + 
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetServicePriceByPid");
      data.append("SID", localStorage.sid);
      data.append("PID", this.id);
      data.append("Days", this.tianshu);
      data.append("Token", localStorage.Token);
      data.append("Sign", this.$sha256.sha256(signStr).toUpperCase());
      console.log(this.$sha256.sha256(signStr).toUpperCase())

      this.$http
        .post(localStorage.FreePlanSiteUrl, data)
        .then(res => {
          this.listData = res.data.Data;
          var arr = [];
          for (var i = 0; i < this.paytype.length; i++) {
            for (var j = 0; j < this.listData.PriceList.length; j++) {
              if (this.paytype[i] == this.listData.PriceList[j].PayType) {
                arr.push(this.listData.PriceList[j]);
              }
            }
          }
          // console.log(arr);
          this.listData.PriceList = arr;

          this.price = this.listData.PriceList[0].PayTypeDisPrice.toFixed(2);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {},
  mounted() {
    // 调用请求数据的方法
    this.getData();
    this.cellClick(0);
  }
};
</script>
