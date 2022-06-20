<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        <div>
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <div :class="data.grade ? '' : 'hidden'">
              观众评分 <span style="color: red">{{ data.grade }}</span>
            </div>
            <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
      <!-- <router-link to="/detail">{{data}}</router-link> -->
    </van-list>
  </div>
</template>

<script>
// import axios from "axios";
import Vue from "vue";
import http from "@/util/http.js";
Vue.filter("actorsFilter", (data) => {
  if (data === undefined) return "暂无主演";
  return data.map((item) => item.name).join(" ");
  // .join（数组变成字符串）
});

export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },
  mounted() {
    //   http.httpForList()
    //   .then((res) => {
    //     this.datalist = res.data.data.films;
    //   });
    // },
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=6754165`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.datalist = res.data.data.films;

      this.total = res.data.data.total;
    });
  },
  methods: {
    onLoad() {
      // 防止无限请求,懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true;
        return;
      }
      console.log("没有更多内容");
      this.current++;
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=6754165`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films];
        // 新老数据合并处理

        // loading主动设置成false
        this.loading = false;
      });
    },
    handleChangePage(id) {
      // 编程式导航
      // location.herf='#/detail'

      // 1、通过路径跳转
      // this.$router.push(`/detail/${id}`)
      // 2、通过命名路由跳转
      this.$router.push({
        name: "kkDetail",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.van-list {
  .van-cell {
    overflow: hidden;
    padding: 0.9375rem;
    img {
      width: 4.125rem;
      float: left;
    }
    .title {
      font-size: 16px;
    }
    .content {
      font-size: 13px;
      color: grey;
      .actors {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 16.25rem;
      }
    }
  }
}
.hidden {
  visibility: hidden;
}
</style>
