<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级商品分类 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex === index }">
                <h3 @mouseover="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级商品分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
  <!-- TypeNav组件是三级联动组件，因为在很多页面都需要使用到，所以在main.js中将其注册为全局组件
  全局组件放在 components/ 文件夹下 -->
</template>

<script>
import { mapState } from 'vuex'

// 按需引入 lodash的节流函数
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      // 这个数据决定着一级标题背景色的变化 h3
      currentIndex: -1,
      // 这个数据控制在不同的路由 商品分类列表的显示和隐藏
      show: true
    }
  },
  mounted() {
    // console.log('TypeNav组件被挂载')
    // 路由切换 伴随着 TypeNav组件销毁和挂载，切换路由时改变show数据，控制除了home路由，其他路由默认不显示
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧配置一个函数 使用计算属性时会立刻执行
      // 注入一个state，此state就是大仓库的state
      categoryList: (state) => {
        return state.home.categoryList
      }
    })
  },
  methods: {
    // 鼠标经过一级分类时
    changeIndex(index) {
      // console.log(index)
      this.currentIndex = index
      // console.log(this.currentIndex)
    },
    // 对changeIndex进行节流操作
    // changeIndex: throttle(function (index) {
    //   this.currentIndex = index
    //   console.log(this.currentIndex)
    // }, 20),

    // 事件委托 进行路由跳转
    goSearch(e) {
      // 获取元素身上的属性
      // console.log(e.target.dataset)
      // 解构出元素身上的属性
      let { categoryname, category1id, category2id, category3id } = e.target.dataset
      // 当前这个if语句 一定是a标签才会进入
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 判断：路由跳转的时候 若带有params参数 则将其传递过来
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    },

    // 在除了 home路由中，鼠标经过，显示商品分类列表
    enterShow() {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
    // 在除了 home路由中，鼠标离开，隐藏商品分类列表
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    }
  },
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background-color: red;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 过渡动画的开始状态
    .sort-enter {
      height: 0;
    }
    // 过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间 速率
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>