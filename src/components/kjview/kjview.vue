<template>
  <div class="kjview">
      {{KJData.NewLottery.LotteryResult}}
  </div>
</template>


<style lang="less" scoped>

</style>


<script>

export default {
    props: ['kjdata'],
    data(){
        return {
            KJData:Object.assign(this.kjdata),
            numArr:'',
            nextTime:"",
        }
    },
    mounted(){
        // this.KJData.NewLottery.LotteryResult = "1"
        console.log(this.KJData);
    },
}
</script>
