<template>
  <div class="filmheader">
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="isActive ? 'isactive' : ''">正在热映</li>
    </router-link>

    <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" :class="isActive ? 'isactive' : ''">即将上映</li>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.filmheader {
  left: 0;
  width: 100%;
  height: 3.125rem;
  background: white;
  display: flex;
  li {
    display: flex;
    flex: 1;
    line-height: 3.125rem;
    text-align: center;
    flex-direction: column;
  }
}
.isactive {
  color: red;
  border-bottom: 2px solid rgb(250, 80, 0);
  transition: 0.25s all;
}
</style>
