<template>
  <div>
      <m-header :title="title"></m-header>
      <div>
          hello
      </div>
  </div>
</template>

<script>
import mHeader from "../components/hearder/Hearder";
export default {
  name: "firstpage",
  data() {
    return {
      title: {
        text: "时时彩",
      },
    };
  },
  components: {
    mHeader
  }
};
</script>

