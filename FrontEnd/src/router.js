import Vue from "vue";
import Router from "vue-router";
import axios from 'axios'
import Unauth from "./views/unauthenticated/index.vue";
import Home from "./views/unauthenticated/Home.vue";

Vue.use(Router);


const checkAuthen = (to, from, next) => {
  console.log('check')
  axios.get('//localhost:3000/auth', {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }).then(({ status }) => {
    if(status === 200) {
      console.log('router ok')
      next()
    }
  }).catch(() => {
    next('/login')
  })
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Unauth,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: "/login",
          name: "login",
          component: () => 
            import("./views/unauthenticated/Login.vue")
        },
        {
          path: "/register",
          name: "register",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import("./views/unauthenticated/Register.vue")
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/views/authenticated/Dashboard.vue'),
      beforeEnter: checkAuthen,
      children: [
        {
          path: '1',
          component: () => import('@/views/authenticated/1.vue')
        },
        {
          path: '2',
          component: () => import('@/views/authenticated/2.vue')
        },
        {
          path: 'user/:user',
          component: () => import('@/views/authenticated/User.vue')
        }
      ]
    }
  ]
});