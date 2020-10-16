<template>
  <div class="goods">
    <div class="contain">
      <div class="goods-ml">
        <div>
          <div class="ml-item" ref="mlItem" v-for="(item,index) in goodsList" :key="index" :class="activeIndex === index ? 'active' : ''" @click='select(index)'>
            {{item.name}}
            <span class="num" v-if="nums[index] > 0">{{nums[index]}}</span>
          </div>
        </div>
      </div>
      <div class="goods-list">
        <div>
          <div v-for="(item,index) in goodsList" :key="index" ref="listItem" class="list-item">
            <div class="title">{{item.name}}</div>
            <div v-for="(food,i) in item.foods" :key="i" class="food-item">
              <img :src="food.icon" alt="">
              <div class="info">
                <div class="name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div>月售{{food.sellCount}}份，好评率{{food.rating}}</div>
                <div class="price">￥{{food.price}}</div>
              </div>
              <addCart :food='food' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopCart />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BScroll from "better-scroll";
export default {
  components: {
    addCart: () => import("./components/addCart"),
    shopCart: () => import("./components/shopCart"),
  },
  data() {
    return {
      menuScroll: null,
      foodScroll: null,
      scroll: 0,
      scrollY: 0, //右边滑动时收集滑动距离
      tops: [], //右边每一个分类的高度的顶部距离
    };
  },
  computed: {
    ...mapState(["goodsList"]),
    ...mapGetters(["nums"]),
    activeIndex() {
      const index = this.tops.findIndex((item, index) => {
        return this.scrollY >= item && this.scrollY < this.tops[index + 1];
      });
      return index;
    },
  },
  mounted() {
    this.initTops();
    this.initScroll();
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(".goods-ml", {
        click: true,
        probeType: 3,
      });
      this.foodScroll = new BScroll(".goods-list", {
        click: true,
        probeType: 3,
      });
      this.foodScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y);
        if (this.foodScroll.movingDirectionY > 0) {
          this.menuScroll.scrollTo(0, -56, 300);
        } else {
          this.menuScroll.scrollTo(0, 0, 300);
        }
      });
      this.foodScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    initTops() {
      this.tops.push(0);
      const items = this.$refs.listItem;
      let top = 0;
      items.forEach((item) => {
        top += item.clientHeight;
        this.tops.push(top);
      });
      // console.log(this.tops);
    },
    select(i) {
      const scrollY = this.tops[i];
      this.scrollY = scrollY;
      this.foodScroll.scrollTo(0, -scrollY, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  .contain {
    display: flex;
    position: absolute;
    top: 180px;
    bottom: 48px;
    overflow: hidden;
    .goods-ml {
      font-size: 12px;
      height: 100%;
      width: 80px;
      text-align: left;
      box-sizing: border-box;
      .ml-item {
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;
        line-height: 14px;
        background-color: #f3f5f7;
        font-weight: 400;
        position: relative;
        .num {
          position: absolute;
          right: 4px;
          top: 4px;
          background: linear-gradient(90deg, #fc9153, #f01414);
          border-radius: 50%;
          padding: 0 5px;
          font-size: 12px;
          color: #fff;
          font-weight: 700;
        }
      }
    }
    .goods-list {
      flex: 1;
      .title {
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
        color: #666;
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        padding-left: 14px;
      }
      .list-item {
        .food-item {
          padding: 18px;
          display: flex;
          font-size: 12px;
          img {
            width: 57px;
            height: 40px;
            margin-right: 10px;
          }
          .info {
            color: #999;
            .name {
              color: #333;
              font-size: 14px;
              margin: 2px 0 4px 0;
            }
            .desc {
              margin-bottom: 4px;
            }
            .price {
              color: #f01414;
              font-size: 14px;
              margin: 4px;
            }
          }
        }
      }
    }
  }
}
.active {
  background-color: #fff !important;
}
</style>
