<template>
  <div>
    login
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的字段')
        // this.$router.back() // 返回

        // 1、获取query字段（传参）
        // console.log(this.$route.query.redirect)
        // 2、跳转到当时想要跳的页面
        this.$router.push(this.$route.query.redirect)
      }, 500)
    }
  }
}
</script>
