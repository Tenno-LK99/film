<template>
  <div>
    <van-nav-bar
      title="影院"
      ref="navbar"
      @click-left="handleLeft"
      @click-right="handleRight"
    >
      <template #left> {{ cityName }}<van-icon name="arrow-down" /> </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="box" :style="{ height: height }">
      <ul>
        <li v-for="data in cinemaList" :key="data.cinemasId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_text">{{ data.address }}</div>
          </div>

          <div class="right cinema_name">
            <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import http from "@/util/http";
import BetterScroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      // cinemaList: [],
      height: "0px",
    };
  },

  computed: {
    ...mapState(["cinemaList", "cityId", "cityName"]),
  },

  // computed: mapState(["cinemaList"]),

  mounted() {
    // 动态结算高度(总减tabber)
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navbar.$el.offsetHeight -
      document.querySelector("div.tabbar").offsetHeight +
      "px";

    // 分发
    // 防止重复分发
    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId).then(() => {
        this.$nextTick(() => {
          new BetterScroll(".box", {
            scrollbar: {
              fade: true,
            },
          });
        });
      });
    } else {
      this.$nextTick(() => {
        new BetterScroll(".box", {
          scrollbar: {
            fade: true,
          },
        });
      });
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=8750157`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   // console.log(res.data.data.cinemas);
    //   this.cinemaList = res.data.data.cinemas;

    //   this.$nextTick(() => {
    //     new BetterScroll(".box", {
    //       scrollbar: {
    //         fade: true,
    //       },
    //     });
    //   });
    // });
  },

  methods: {
    // 新方法映射
    ...mapActions(["getCinemaData"]),
    ...mapMutations(["clearCinema"]),

    handleLeft() {
      this.$router.push("/city");

      // 清空cinemaList
      // this.$store.commit("clearCinema");
      this.clearCinema();
    },
    handleRight() {
      this.$router.push("/cinemas/search");
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 0.9375rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 13.25rem;
  }
  .cinema_name {
    font-size: 15px;
  }
  .cinema_text {
    color: #797d82;
    font: size 12px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.box {
  // 动态结算高度
  overflow: hidden;
  position: relative;
}
</style>
