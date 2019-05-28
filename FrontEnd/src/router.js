import Vue from "vue";
import Router from "vue-router";
import api from "@/utils/api";
import Unauth from "./views/unauthenticated/index.vue";
import Home from "./views/unauthenticated/Home.vue";

Vue.use(Router);

const checkAuthen = (to, from, next) => {
  console.log("check");
  api()
    .get("/auth")
    .then(({ status }) => {
      if (status === 200) {
        console.log("router ok");
        next();
      }
    })
    .catch(() => {
      next("/login");
    });
};

const checkLogin = (to, from, next) => {
  console.log("checklogin");
  api()
    .get("/auth")
    .then(({ status }) => {
      if (status === 200) {
        next("/dashboard");
      }
    })
    .catch(() => {
      next();
    });
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Unauth,
      beforeEnter: checkLogin,
      children: [
        {
          path: "",
          component: Home
        },
        {
          path: "/login",
          name: "login",

          component: () => import("./views/unauthenticated/Login.vue")
        },
        {
          path: "/register",
          name: "register",

          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/unauthenticated/Register.vue")
        }
      ]
    },
    {
      path: "/dashboard",
      component: () => import("@/views/authenticated/Dashboard.vue"),
      beforeEnter: checkAuthen,
      children: [
        {
          path: "/account",
          component: () => import("@/views/authenticated/Account/Account.vue")
        },
        {
          path: "/transfer",
          component: () =>
            import("@/views/authenticated/Transections/Transfer.vue")
        },
        {
          path: "/payment",
          component: () =>
            import("@/views/authenticated/Transections/Payment.vue")
        },
        {
          path: "/top-up",
          component: () =>
            import("@/views/authenticated/Transections/Top-Up.vue")
        },
        {
          path: "/promotion",
          component: () =>
            import("@/views/authenticated/Promotion/Promotion.vue")
        },
        {
          path: "/bankaccount",
          component: () =>
            import("@/views/authenticated/Account/BankAccount.vue")
        }
      ]
    }
  ]
});
