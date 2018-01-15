<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="title-wrapper">
                
                <!-- <span class="title">{{title.text}}</span> -->
                <span class="title">{{title.text}}</span>

            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header-wrapper {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  .header {
    height: 44px;
    background-color: rgb(219, 60, 62);
    line-height: 44px;
    text-align: center; 
    .title-wrapper {
      font-size: 15px;
      color: #fcfcfc;
      span {
        display: inline-block;
      }
      .title {
        width: 74%;
        font-weight: 500;
      }
    }
  }
}
</style>


<script>
import sha256 from "../../util/sha256";
export default {
  props: {
    title: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>