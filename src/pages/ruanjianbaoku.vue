<template>
    <div>
        <m-header :title="title"></m-header>
        <iframe  id="show-iframe" src="http://zjjhidx.yiwili.com/ad/index.html" frameborder="0"></iframe>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
import mHeader from "../components/hearder/Hearder";
export default {
    data() {
    return {
      title: {
        text: "软件宝库",
        showBack: true,
      },
    };
  },
  components: {
    mHeader,
  },
  mounted(){
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
  },
}
</script>
