<template>
  <div class="detail">
    <van-overlay :show="detailMask">
      <div class="wrapper" @click.stop>
        <div class="content">
          <div class="text">test的啦 这里是商家详情哦</div>
          <van-icon name="cross" size='30px' color='#fff' @click="close" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  props: {
    detailMask: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    close() {
      this.$emit("close", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  .van-overlay {
    z-index: 3;
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      .content {
        color: #fff;
        text-align: center;
        div{
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
