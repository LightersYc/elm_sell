<template>
  <div class="shop-cart-wrapper">
    <div class="content-left" @click="showList">
      <div class="wrapper">
        <div class="logo" :class="totalCount > 0 ? 'logoActive' : ''">
          <van-icon name="cart-o" />
        </div>
        <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
      </div>
      <div class="count">
        ￥{{totalPrice}}
      </div>
      <div class="desc">另需配送费￥{{sellInfo.deliveryPrice}}元</div>
    </div>
    <div class="content-right" :class="totalPrice >= sellInfo.minPrice ? 'enough' :'no-enough'">
      <span v-if="totalPrice === 0"> ￥{{sellInfo.minPrice}}元起送</span>
      <span v-else-if="totalPrice < sellInfo.minPrice">还差￥{{sellInfo.minPrice - totalPrice}}元起送</span>
      <span v-else @click="pay">去结算</span>
    </div>

    <div class="cart-list">
      <!-- 用vant组件写无法滑动 自己写的样式可以滑动 -->
      <!-- <van-popup v-model="show" position="bottom" overlay-class='overlay'>
        <div class="pop">
          <div class="head">
            <span>购物车</span>
            <span @click="clear">清空</span>
          </div>
          <div class="list">
            <ul class="list-content">
              <li v-for="(item,index) in cartFoods" :key="index">
                <div class="food-name">{{item.name}}</div>
                <div class="food-info">
                  <div class="price">￥{{item.price}}</div>
                  <addCart :food='item' />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-popup> -->

      <transition name="mask">
        <div class="mask" v-show="show" @click="show = false"></div>
      </transition>
      <transition name="popup-show">
        <div class="popup" v-show="show">
          <div class="pop">
            <div class="head">
              <span>购物车</span>
              <span @click="clear">清空</span>
            </div>
            <div class="list">
              <ul class="list-content" ref="listContent">
                <li v-for="(item,index) in cartFoods" :key="index">
                  <div class="food-name">{{item.name}}</div>
                  <div class="food-info">
                    <div class="price">￥{{item.price}}</div>
                    <addCart :food='item' />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import { log } from "debug";
export default {
  components: {
    addCart: () => import("./addCart"),
  },
  data() {
    return {
      show: false,
      scroll: null,
    };
  },
  computed: {
    ...mapState(["sellInfo", "cartFoods"]),
    ...mapGetters(["totalCount", "totalPrice"]),
  },
  watch: {
    totalPrice() {
      if (this.totalPrice === 0) this.show = false;
    },
    show(val) {
      if (val) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(".list", {
              click: true,
            });
          }
          // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
          this.scroll.refresh();
        });
      }
    },
  },
  methods: {
    showList() {
      if (this.cartFoods.length === 0) return;
      this.show = !this.show;
    },
    clear() {
      this.$dialog
        .confirm({
          title: "清空购物车?",
        })
        .then(() => {
          this.$store.dispatch("clearShopCart");
        })
        .catch(() => {});
    },
    pay() {
      this.$dialog
        .alert({
          title: "支付",
          message: `您需要支付${this.totalPrice}元`,
        })
        .then(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-cart-wrapper {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 48px;
  z-index: 50;
  display: flex;
  .content-left {
    display: flex;
    flex: 1;
    background: #07111b;
    .wrapper {
      background: #07111b;
      border-radius: 50%;
      box-sizing: border-box;
      height: 56px;
      margin: 0 12px;
      padding: 6px;
      position: relative;
      top: -10px;
      width: 56px;
      .num {
        position: absolute;
        right: 0;
        top: 0;
        background: linear-gradient(90deg, #fc9153, #f01414);
        border-radius: 50%;
        padding: 0 5px;
        font-size: 12px;
        color: #fff;
        font-weight: 700;
      }
      .logo {
        background: #333;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        text-align: center;
        i {
          font-size: 24px;
          line-height: 44px;
          color: #999;
        }
      }
      .logoActive {
        background: #00a0dc;
        i {
          color: #fff;
        }
      }
    }
    .count {
      color: #999;
      font-weight: 700;
      padding-right: 12px;
      border-right: 1px solid hsla(0, 0%, 100%, 0.1);
      line-height: 24px;
      margin: 12px 0;
    }
    .desc {
      color: #999;
      margin: 12px 0 0 12px;
      font-size: 10px;
      line-height: 24px;
    }
  }
  .content-right {
    width: 105px;
    font-size: 12px;
    font-weight: 700;
    line-height: 48px;
    text-align: center;
  }
  .enough {
    background-color: #00b43c;
    color: #fff;
  }
  .no-enough {
    background: #333;
    color: #999;
  }
  .cart-list {
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: -3;
    }
    .popup {
      width: 100%;
      position: fixed;
      left: 0;
      background: #fff;
      bottom: 48px;
      z-index: -1;
      transform: translateY(0%);
      .pop {
        width: 100%;
        font-size: 14px;
        .head {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f3f5f7;
          padding: 0 18px;
          span {
            &:last-of-type {
              color: #00a0dc;
            }
          }
        }
        .list {
          padding: 0 18px;
          overflow: hidden;
          max-height: 217px;
          .list-content {
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              .food-info {
                float: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .price {
                  color: #f01414;
                  margin-right: 15px;
                  font-size: 14px;
                  font-weight: 400;
                }
                .control {
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  flex: 1;
                  color: #00a0dc;
                  font-size: 24px;
                  box-sizing: border-box;
                  span {
                    font-size: 12px;
                    margin: 0 5px;
                    color: #666;
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
      }
    }
    .mask-enter,
    .mask-leave-to {
      opacity: 0;
    }
    .mask-enter-active,
    .mask-leave-active {
      transition: opacity linear 0.3s;
    }
    .popup-show-enter,
    .popup-show-leave-to {
      transform: translateY(100%);
    }

    .popup-show-enter-active,
    .popup-show-leave-active {
      transition: transform linear 0.3s;
    }
  }
}
</style>

<style lang="scss">
// .overlay {
//   z-index: -3 !important;
// }
// .van-popup--bottom {
//   z-index: -1 !important;
//   bottom: 48px;
// }
</style>
