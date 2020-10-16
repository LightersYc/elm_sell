<template>
  <div class="sell">
    <div class="header" @click="detailMask = true">
      <div class="bg">
        <img :src="sellInfo.avatar" alt="">
      </div>
      <div class="contain">
        <div class="left">
          <img :src="sellInfo.avatar" alt="">
          <div class="info">
            <div class="title">
              <span></span>
              <span>{{sellInfo.name}}</span>
            </div>
            <div class="description">{{sellInfo.description}}/{{sellInfo.deliveryTime}}分钟送达</div>
            <div class="support">
              <span class="jian"></span>
              <span>在线支付满28减5</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span>{{sellInfo.supports.length}}个</span>
          <van-icon size="10px" name="arrow" />
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-title"></span>
        <div class="bulletin-text">{{sellInfo.bulletin}}</div>
        <span>
          <van-icon size="10px" name="arrow" />
        </span>
      </div>
    </div>
    <detail :detailMask='detailMask' @close='close' />
    <van-tabs v-model="active" animated line-width='125' line-height='2' title-active-color='#f01414'>
      <van-tab title="商品"></van-tab>
      <van-tab title="评论"></van-tab>
      <van-tab title="商家"></van-tab>
    </van-tabs>
    <goods v-if="active===0" />
    <rating v-if="active===1" />
    <seller v-if="active===2" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    goods: () => import("./components/good"),
    rating: () => import("./components/rating/index"),
    seller: () => import("./components/seller/index"),
    detail: () => import("./components/detail"),
  },
  data() {
    return {
      detailMask: false,
      active: 0,
    };
  },
  computed: {
    ...mapState(["sellInfo"]),
  },
  created() {},
  methods: {
    close(e) {
      this.detailMask = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.sell {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    background: rgba(7, 17, 27, 0.5);
    color: #fff;
    font-size: 12px;
    position: relative;
    .contain {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 24px 12px 18px 24px;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 64px;
          height: 64px;
          margin-right: 16px;
        }
        .title {
          display: flex;
          align-items: center;
          span {
            &:first-of-type {
              display: inline-block;
              width: 30px;
              height: 18px;
              background-image: url("../../assets/img/pinpai.png");
              background-repeat: no-repeat;
              background-size: 30px 18px;
            }
            &:last-of-type {
              font-weight: 700;
              font-size: 16px !important;
              margin-left: 8px;
            }
          }
        }
        .description {
          margin: 6px 0;
        }
        .support {
          display: flex;
          align-items: center;
          .jian {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-image: url("../../assets/img/jian.png");
            background-size: 12px 12px;
            background-repeat: no-repeat;
            margin-right: 4px;
          }
        }
      }
      .right {
        height: 24px;
        line-height: 24px;
        background: rgba(7, 17, 27, 0.2);
        border-radius: 14px;
        padding: 0 8px;
        span {
          margin-right: 3px;
        }
      }
    }
    .bulletin-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(7, 17, 27, 0.2);
      height: 28px;
      line-height: 28px;
      padding: 0 8px;
      .bulletin-title {
        width: 22px;
        height: 12px;
        background-image: url("../../assets/img/notice.png");
        background-repeat: no-repeat;
        background-size: 22px 12px;
        margin-right: 4px;
      }
      .bulletin-text {
        flex: 1;
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-icon {
      top: 2px;
    }
  }
}
</style>
