<template>
  <div>
    <film-swiper :key="datalist.length">
      <!-- (初始化过早) -->
      <film-swiper-item
        v-for="data in datalist"
        :key="data.id"
        class="filmswiperitem"
      >
        <img :src="data.poster" />
      </film-swiper-item>
    </film-swiper>
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FilmSwiper from "@/components/films/FilmSwiper.vue";
import FilmSwiperItem from "@/components/films/FilmSwiperItem.vue";
import FilmHeader from "@/components/films/FilmHeader.vue";
import axios from "axios";

export default {
  components: {
    FilmSwiper,
    FilmSwiperItem,
    FilmHeader,
  },
  data() {
    return {
      datalist: [],
    };
  },
  mounted() {
    setTimeout(() => {
      // this.datalist = ['aaa', 'bbb', 'ccc']
      axios.get("/banner.json").then((res) => {
        console.log(res.data);
        this.datalist = res.data.data.films;
      });
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.filmswiperitem {
  img {
    width: 100%;
  }
}
.sticky {
  position: sticky;
  top: 0;
  background: white;
  z-index:100;
}
</style>
