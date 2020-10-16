<template>
  <div class="seller">
    <div class="seller-wrapper">
      <div class="content">
        <div class="scroll-content">
          <div class="header">
            <div class="sell-info">
              <div class="info-left">
                <div class="sell-name">{{sellInfo.name}}</div>
                <div class="rating">
                  <van-rate v-model="sellInfo.foodScore" :size="20" color="#ffd21e" void-icon="star" void-color="#eee" />
                  <span>({{sellInfo.ratingCount}})</span>
                  <span>月售{{sellInfo.sellCount}}单</span>
                </div>
              </div>
              <div class="info-right" @click="color = !color">
                <van-icon name="like" size="22px" :color="color ? '#f01414' : '#ccc'" />
                <div>{{color ? '已收藏' : '收藏'}}</div>
              </div>
            </div>
            <ul class="remark">
              <li>
                <div class="">起送价</div>
                <span>{{sellInfo.minPrice}}</span>
                <span>元</span>
              </li>
              <li>
                <div>商家配送</div>
                <span>{{sellInfo.deliveryPrice}}</span>
                <span>元</span>
              </li>
              <li>
                <div>平均配送时间</div>
                <span>{{sellInfo.deliveryTime}}</span>
                <span>分钟</span>
              </li>
            </ul>
          </div>
          <div class="split"></div>
          <div class="bulletin">
            <h1 class="title">公告与活动</h1>
            <div class="content">{{sellInfo.bulletin}}</div>
            <ul>
              <li v-for="item in  sellInfo.supports" :key="item.type">
                <img :src="icons[item.type]" alt="">
                <span>{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="split"></div>
          <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper">
              <div class="pic-list" ref="picList">
                <div class="pic-item" v-for="item in sellInfo.pics" :key="item">
                  <img :src="item" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="split"></div>
          <div class="bulletin">
            <h1 class="title">商家信息</h1>
            <ul>
              <li v-for="item in sellInfo.infos" :key="item">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      color: false,
      icons: {
        0: require("@/assets/img/jian2.png"),
        1: require("@/assets/img/zhe.png"),
        2: require("@/assets/img/te.png"),
        3: require("@/assets/img/piao.png"),
        4: require("@/assets/img/bao.png"),
      },
    };
  },
  computed: {
    ...mapState(["sellInfo"]),
  },
  mounted() {
    this.setWidth();
  },
  methods: {
    setWidth() {
      new BScroll(".seller-wrapper", {
        click: true,
      });
      const list = this.$refs.picList;
      const itemWidth = 120; //item的宽度
      const space = 6; //margin-left的值
      const count = list.children.length;
      list.style.width = `${(itemWidth + space) * count - space}px`;
      new BScroll(".pic-wrapper", {
        scrollX: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seller {
  font-size: 12px;
  .seller-wrapper {
    width: 100%;
    position: absolute;
    top: 180px;
    bottom: 0;
    overflow: hidden;
    .header {
      padding: 18px;
      background: #fff;
      .sell-info {
        display: flex;
        justify-content: space-between;
        padding-bottom: 18px;
        border-bottom: 1px solid #eee;
        .info-left {
          display: flex;
          flex-direction: column;
          .sell-name {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .rating {
            display: flex;
            align-items: center;
            span {
              color: #666;
              margin-left: 12px;
            }
          }
        }
        .info-right {
          color: #666;
          text-align: center;
          width: 50px;
          .van-icon {
            margin-bottom: 8px;
          }
        }
      }
      .remark {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-top: 20px;
        li {
          width: 30%;
          border-right: 1px solid #eee;
          &:last-of-type {
            border-right: none;
          }
          div {
            &:first-of-type {
              color: #999;
            }
          }
          span {
            color: #333;
            &:first-of-type {
              font-size: 24px;
            }
          }
        }
      }
    }
    .bulletin {
      background: #fff;
      padding: 18px 18px 0 18px;
      .content {
        color: #f01414;
        font-size: 12px;
        line-height: 24px;
        padding: 0 12px 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      ul {
        li {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-bottom: none;
          }
          img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
          }
        }
      }
    }
    .pics {
      padding: 18px;
      background-color: #fff;
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        .pic-list {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          .pic-item {
            width: 120px;
            height: 90px;
            margin-right: 6px;
            & :last-of-type {
              margin-right: 0px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .title {
    font-size: 14px;
    line-height: 14px;
    color: #333;
    margin-bottom: 8px;
    font-weight: 400;
  }
  .split {
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    height: 16px;
    width: 100%;
  }
}
</style>
