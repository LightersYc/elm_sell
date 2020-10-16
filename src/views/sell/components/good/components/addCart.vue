<template>
  <div class="cart-add">
    <div class="select">
      <transition name="move">
        <i class="iconfont icon-minus-circle" v-if="food.count > 0" @click="updateCount(false)"></i>
      </transition>
      <span v-if="food.count > 0">{{food.count}}</span>
      <i class="iconfont icon-plus-circle-fill" ref="plus" @click="updateCount(true,$event.target)"></i>
    </div>

    <div class="ball-container" v-for="(litterBall,indexBall) in balls" :key="indexBall">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="drop">
        <div v-show="litterBall.show" class="ball">
          <div class="inner"> </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    food: {
      type: Object,
    },
  },
  data() {
    return {
      balls: [
        //小球
        { show: false, index: 0 },
        { show: false, index: 1 },
        { show: false, index: 2 },
        { show: false, index: 3 },
        { show: false, index: 4 },
        { show: false, index: 5 },
        { show: false, index: 6 },
        { show: false, index: 7 },
        { show: false, index: 8 },
        { show: false, index: 9 },
        { show: false, index: 10 },
        { show: false, index: 11 },
      ],
      dropBall: [], //已经在下降的小球存在这里
    };
  },
  computed: {
    ...mapState(["goodsList"]),
  },
  created() {},
  methods: {
    updateCount(flag, el) {
      this.$store.dispatch("updateCount", {
        flag,
        food: this.food,
      });
      if (flag) {
        for (var i = 0; i < this.balls.length; i++) {
          if (!this.balls[i].show) {
            //把小球show为false的变成true，展示出来
            let ball = this.balls[i];
            ball.show = true; //这里这样写他继承的this.balls的值也会变成true
            ball.el = el; //把这个球的位置保留下来
            this.dropBall.push(ball); //把这个已经drop的球放到dropBall中
            // console.log(this.dropBall,222)
            return; //结束循环和函数，不会让循环再往后执行了
          }
        }
      }
    },
    // 小球半场动画
    beforeEnter(el) {
      let count = this.dropBall.length - 1; //获取要下降中的小球个数
      let ball = this.dropBall[count]; //获取最新点击成show:true的小球
      let plusPosition = ball.el.getBoundingClientRect(); //getBoundingClientRect()可以获取到元素对象和窗口的相对上下左右的距离
      let x = plusPosition.left - 32; //点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
      let y = -(window.innerHeight - plusPosition.top - 22); //窗口的高度 - 点击元素离窗口的高度 - 购物车底部的padding,margin高度，就是小球要运动的y轴距离，且是向下运动，所以是负值
      el.style.transform = `translate3d(0,${y}px,0)`;
      //内层做横轴运动
      let inner = el.getElementsByClassName("inner")[0];
      inner.style.transform = `translate3d(${x}px,0,0)`; //外层做纵轴运动
    },
    enter(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.transform = "translate3d(0, 0, 0)";
        let inner = el.getElementsByClassName("inner")[0];
        inner.style.transform = "translate3d(0, 0, 0)";
        // Vue为了知道过渡的完成，必须设置相应的事件监听器。
        // 如果没有这一句那将不会执行handleAfterEnter
      });
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
        //如果没有这一句，小球到达终点后过一小段时间后才消失
        //具体原因也是搞不清楚，上面也已经false掉了
        el.style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-add {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
  color: #00a0dc;
  font-size: 24px;
  box-sizing: border-box;
  position: relative;
  .select {
    display: flex;
    align-items: center;
    span {
      font-size: 12px;
      margin: 0 5px;
      color: #333;
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 900;
      transform: translate3d(0, 0, 0);
      transition: all 0.6s cubic-bezier(0.69, -0.29, 0.75, 0.41); //这个很重要，要变成曲线就需要这个贝赛尔曲线
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #00a0dc;
        transform: translate3d(0, 0, 0);
        transition: all 0.6s linear;
      }
    }
  }
  .move-enter,
  .move-leave-to {
    transform: translateX(15px) rotate(180deg);
    opacity: 0;
  }
  .move-enter-active,
  .move-leave-active {
    transition: all 0.3s;
  }
}
</style>
