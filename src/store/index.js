import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // 持久化缓存
  plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          cityId: state.cityId,
          cityName: state.cityName,
        };
      },
    }),
  ],

  state: {
    cityId: "310100",
    cityName: "上海",
    cinemaList: [],
    isTabbarShow: true,
  },
  getters: {},
  mutations: {
    changeCityName(state, cityName) {
      state.cityName = cityName;
    },
    changeCityId(state, cityId) {
      state.cityId = cityId;
    },
    changeCinemaData(state, data) {
      state.cinemaList = data;
    },
    clearCinema(state) {
      state.cinemaList = [];
    },
    show(state) {
      state.isTabbarShow = true;
    },
    hide(state) {
      state.isTabbarShow = false;
    },
  },
  actions: {
    getCinemaData(store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=8750157`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        // console.log(res.data.data.cinemas);
        // this.cinemaList = res.data.data.cinemas;

        // this.$nextTick(() => {
        //   new BetterScroll(".box", {
        //     scrollbar: {
        //       fade: true,
        //     },
        //   });
        // });
        store.commit("changeCinemaData", res.data.data.cinemas);
      });
    },
  },
  modules: {},
});
