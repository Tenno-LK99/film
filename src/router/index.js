import Vue from "vue";
import VueRouter from "vue-router";
import FilmView from "@/views/FilmView";
import CinemasView from "@/views/CinemasView";
// import CenterView from '@/views/CenterView'
import NowPlaying from "@/views/films/NowPlaying";
import ComingSoon from "@/views/films/ComingSoon";
import SearchFilm from "@/views/SearchFilm";
import DetailFilm from "@/views/DetailFilm";
// import OrderCenter from '@/views/OrderCenter'
import LoginCenter from "@/views/LoginCenter";
import CityFilm from "@/views/CityFilm";
// import store from "@/store";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/films",
    component: FilmView,
    children: [
      {
        path: "/films/nowplaying",
        component: NowPlaying,
      },
      {
        path: "/films/comingsoon",
        component: ComingSoon,
      },
      {
        path: "/films",
        redirect: "/films/nowplaying",
      },
    ],
  },
  {
    // 动态二级路由，满足条件跳转
    name: "kkDetail",
    path: "/detail/:id",
    component: DetailFilm,
    // meta:{
    //   isShow:false
    // }
  },
  {
    path: "/city",
    component: CityFilm,
  },
  {
    path: "/cinemas",
    component: CinemasView,
  },
  {
    path: "/cinemas/search",
    component: SearchFilm,
  },
  {
    path: "/center",
    component: () => import("@/views/CenterView"), // 懒加载
    meta: {
      isRequired: true,
    },
  },
  {
    path: "/order",
    component: () => import("@/views/OrderCenter"),
    meta: {
      isRequired: true,
    },
  },
  {
    path: "/login",
    component: LoginCenter,
  },
  // 重定向,要在后面
  {
    path: "*",
    redirect: "/films",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

// 全局拦截守卫
router.beforeEach((to, from, next) => {
  // console.log(to);

  // if (to.meta.isShow) {
  //   store.commit("show");
  // } else {
  //   store.commit("hide");
  // }

  if (to.meta.isRequired) {
    // 判断本地存储中是否有token
    if (localStorage.getItem("token")) {
      next();
    } else {
      next(
        // '/login'
        {
          path: "/login",
          query: { redirect: to.fullPath },
        }
      );
    }
  } else {
    next();
  }
});

// 路由独享拦截
// beforeEnter: (to, from, next) => {
//    if ( localStorage. getItem('token')) {
//      next( )
//    } else {
//      next('/login' )
//   }
// }
