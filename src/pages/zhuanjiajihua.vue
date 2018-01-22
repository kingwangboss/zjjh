<template>
  <div class="container">
      <m-header :title="title"></m-header>
      <div class="line"></div>
      <zhuanjiajihuacell></zhuanjiajihuacell>
      <div class="line"></div>
  </div>
</template>

<style lang="less" scoped>
.line {
    background-color: #f8f8f8;
    width: 100%;
    height: 1px;
}
.container{
    background-color: #f8f8f8;
}

</style>

<script>
import mHeader from "../components/hearder/Hearder";
import zhuanjiajihuacell from "../components/zhuanjiajihuacell/zhuanjiajihuacell";
export default {
  data() {
    return {
      title: {
        text: "专家计划",
        showBack: true,
        shousuo: true
      },
      
    };
  },
   components: {
    mHeader,
    zhuanjiajihuacell,
  },
}
</script>
