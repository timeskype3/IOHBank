import Vue from "vue";
import Router from "vue-router";
import axios from 'axios'
import Home from "./views/Home.vue";

Vue.use(Router);


const checkAuthen = (to, from, next) => {
  console.log('check')
  axios.post('//localhost:3000/Login', {
    user: localStorage.getItem('user'),
    password: localStorage.getItem('password')
  }).then(({ data }) => {
    if(data.user.length === 1) {
      console.log('router ok')
      next()
    } else {
      console.log('router not ok')
      next('/login')
    }
  })
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => 
        import("./views/Login.vue")
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard.vue'),
      beforeEnter: checkAuthen
    }
  ]
});