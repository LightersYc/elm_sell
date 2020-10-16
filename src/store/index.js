import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
import dataJson from "@/getData/data";

const store = new Vuex.Store({
    state: {
        // sell
        sellInfo: dataJson.seller, //商户信息
        goodsList: dataJson.goods, //商品列表
        cartFoods: [],//购物车商品信息
    },
    getters: {
        totalCount(state) {
            var total = 0
            state.cartFoods.forEach(item => {
                total += item.count
            })
            return total
        },
        totalPrice(state) {
            var count = 0
            state.cartFoods.forEach(item => {
                count += item.count * item.price
            })
            return count
        },
        nums(state) {
            const obj = {}
            state.goodsList.forEach((item, i) => {
                obj[i] = 0
                item.foods.forEach(food => {
                    if (food.count) {
                        obj[i] += food.count
                    }
                })
            })
            return obj
        }
    },
    mutations: {
        // 添加商品
        addCount(state, food) {
            if (!food.count) {
                Vue.set(food, 'count', 0)
                state.cartFoods.push(food)
            }
            food.count++
        },
        // 删除商品
        delCount(state, food) {
            food.count--
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        },
        // 清空购物车
        clearShopCart(state, res) {
            state.cartFoods.forEach(item => {
                item.count = 0
            })
            state.cartFoods = []
        }
    },
    actions: {
        //处理添加购物车数量
        updateCount({ commit }, res) {
            if (res.flag) {
                commit('addCount', res.food)
            } else {
                commit('delCount', res.food)
            }
        },
        clearShopCart({ commit }) {
            commit('clearShopCart')
        }
    }
})

export default store