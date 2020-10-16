<template>
  <div class="ratinig">
    <div class="rate-wrapper">
      <div class="content">
        <div v-for="item in 100" :key="item">这是评论页</div>
        <div>12313</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {};
  },
  mounted() {
    new BScroll(".rate-wrapper");
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.ratinig {
  .rate-wrapper {
    width: 100%;
    position: absolute;
    top: 180px;
    bottom: 0px;
    overflow: hidden;
  }
}
</style>
