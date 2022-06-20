<template>
  <div class="city">
    <van-index-bar :index-list="computedList" @change="handleChange">
      <div v-for="data in cityList" :key="data.tyoe">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="handleClick(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from "@/util/http";
import { IndexBar, IndexAnchor, Toast } from "vant";
import obj from "@/util/mixinObj";

export default {
  mixins: [obj],
  data() {
    return {
      IndexBar,
      IndexAnchor,
      cityList: [],
    };
  },
  computed: {
    computedList() {
      return this.cityList.map((item) => item.type);
    },
  },
  destroyed() {
    // this.$store.commit("show");
  },
  mounted() {
    // this.$store.commit("hide");
    http({
      url: "/gateway?k=1407941",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      // 将数据转化成A,B进行分组
      // 转换后进行渲染
      this.cityList = this.renderCity(res.data.data.cities);
    });
  },

  methods: {
    handleClick(item) {
      // console.log(item.name,item.cityId)
      // vuex状态管理模式
      // state
      // this.$store.state.cityName = item.name;
      this.$store.commit("changeCityName", item.name);
      this.$store.commit("changeCityId", item.cityId);

      this.$router.back();
      // 传统多页面方案
      // 1、location.herf = '#/cinemas?cityname=' + item.name
      // 2、cookie,localStorage
      // 单页面方案
      // 1、中间人模式
      // 2、bus事件总线 $on,$emit
    },

    // 弹框
    handleChange(data) {
      Toast(data);
    },

    renderCity(list) {
      // console.log(list);
      var cityList = [];
      var letterList = [];
      // 分组
      for (var i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i));
      }
      // 分组后的新数组
      letterList.forEach((letter) => {
        var newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        );
        // console.log(newList);

        newList.length > 0 &&
          cityList.push({
            type: letter,
            list: newList,
          });
      });

      // console.log(cityList);
      return cityList;
    },
  },
};
</script>

<style lang="scss" scoped>
.van-toast--html,
.van-toast--text {
  min-width: 30px;
}
</style>
