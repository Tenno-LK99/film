<template>
  <div class="tabbar">
    <ul>
      <!-- 声明式导航（3） -->
      <!-- <router-link to="/films" active-class="kkactive" tag="li"></router-link>
      <router-link to="/cinemas" active-class="kkactive" tag="li"></router-link>
      <router-link to="/center" active-class="kkactive" tag="li"></router-link> -->

      <!-- 声明式导航（4） -->
      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kkactive' : ''">
          <span class="lnr lnr-film-play"></span> <span>电影</span>
        </li>
      </router-link>

      <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kkactive' : ''">
          <span class="lnr lnr-camera-video"></span> <span>影院</span>
        </li>
      </router-link>

      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'kkactive' : ''">
          <span class="lnr lnr-user"></span> <span>我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
// import'../assets/iconfont/iconfont.css'
export default {};
</script>

<style lang="scss" scoped>
.kkactive {
  color: rgb(255, 128, 0);
  transition: 0.25s all;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.0625rem;
  background: white;
  z-index: 100;
  ul {
    display: flex;
    li {
      padding-top: 0.75rem;
      flex: 1;
      line-height: 1.5625rem;
      text-align: center;
      list-style: none;
      flex-direction: column;
      span {
        font-size: 18px;
      }
    }
  }
}
// .lnr-film-play {
//   color: #0f52ba;
//   font-size: 3.0625rem;
// }
</style>
