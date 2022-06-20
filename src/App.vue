<template>
  <div id="app">
    <tabbar ref="mytabbar" v-show="$store.state.isTabbarShow"></tabbar>
    <div class="section"><router-view></router-view></div>
  </div>
</template>

<script>
import tabbar from "@/components/TabbarFilm.vue";
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
export default {
  data() {
    return {};
  },
  components: {
    tabbar,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
.section {
  padding-bottom: 3.0625rem;
}
</style>
