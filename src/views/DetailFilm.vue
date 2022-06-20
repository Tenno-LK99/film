<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="50">{{ filmInfo.name }}</detail-header>
    <!-- <img :src="filmInfo.poster" alt=""> -->
    <!-- 海报 -->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}<span></span></div>
      <div>
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="line-height: 15px; margin-top: 12px"
          :class="{ hidden: isHidden }"
        >
          {{ filmInfo.synopsis }}
        </div>
        <div style="text-align: center">
          <span
            class=""
            @click="isHidden = !isHidden"
            :class="isHidden ? 'lnr lnr-chevron-down' : 'lnr lnr-chevron-up'"
          ></span>
        </div>
      </div>

      <!-- 演职人员 -->
      <div>
        <div>演职人员</div>
        <detail-swiper :perview="3.5" name="actors">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.actors"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
            ></div>
            <div style="text-align: center; font-size: 12px">
              {{ data.name }}
            </div>
            <div style="text-align: center; font-size: 13px">
              {{ data.role }}
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>

      <!-- 剧照 -->
      <div>
        <div>剧照</div>
        <detail-swiper :perview="2" name="photos">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.photos"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handlePreview(index)"
            ></div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http.js";
// import axios from "axios";\
import moment from "moment";
import Vue from "vue";
moment.locale("zh-cn");
import DetailSwiper from "@/components/detail/DetailSwiper";
import DetailSwiperItem from "@/components/detail/DetailSwiperItem";
import DetailHeader from "@/components/detail/DetailHeader";
import { ImagePreview } from "vant";
import obj from "@/util/mixinObj";

Vue.filter("dateFilter", (date) => {
  return moment(date * 1000).format("YYYY-MM-DD");
});

Vue.directive("scroll", {
  inserted(el, binding) {
    console.log(binding.value);
    el.style.display = "none";

    window.onscroll = () => {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) > 50
      ) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },

  unbind() {
    window.onscroll = null;
  },
});

export default {
  mixins: [obj],
  data() {
    return {
      filmInfo: null,
      isHidden: true,
    };
  },
  components: {
    DetailSwiper,
    DetailSwiperItem,
    DetailHeader,
  },
  methods: {
    handlePreview(index) {
      // ImagePreview(this.filmInfo.photos);
      // 从当前位置预览
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-right",
      });
    },
  },
  mounted() {
    // 当前匹配的路由
    // console.log("created", this.$route.params.id);
    // axioxs利用id发送请求到详情接口，获取消息信息，布局页面

    // http.httpForDetail().then((res) => {
    //   console.log(res.data);
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=7692740`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      console.log(res.data.data.film);
      this.filmInfo = res.data.data.film;
    });
  },
};

// mounted () {

// }
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 15rem;
  background-position: center;
  background-size: cover;
}
.content {
  padding: 0.9375rem;
  padding-top: 0.75rem;
  font-size: 18px;
}
.detail-text {
  color: #797d82;
  font-size: 13px;
  margin-top: 0.25rem;
}
.hidden {
  overflow: hidden;
  height: 30px;
}
.avatar {
  width: 100%;
  height: 5.3125rem;
  background-position: center;
  background-size: cover;
}
</style>
