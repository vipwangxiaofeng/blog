import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuards } from "./guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "",
          name: "login-page",
          component: () => import("@/views/auth/Login.vue"),
          meta: { title: "登录" },
        },
      ],
    },
    {
      path: "/",
      component: () => import("@/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("@/views/dashboard/index.vue"),
          meta: { title: "仪表盘" },
        },
        {
          path: "system",
          name: "system",
          meta: { title: "系统管理" },
          children: [
            {
              path: "user",
              name: "user",
              component: () => import("@/views/system/user/index.vue"),
              meta: { title: "用户管理", permissions: ["user:list"] },
            },
            {
              path: "role",
              name: "role",
              component: () => import("@/views/system/role/index.vue"),
              meta: { title: "角色管理", permissions: ["role:list"] },
            },
            {
              path: "menu",
              name: "menu",
              component: () => import("@/views/system/menu/index.vue"),
              meta: { title: "菜单管理", permissions: ["menu:list"] },
            },
          ],
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/profile/index.vue"),
          meta: { title: "个人中心" },
        },
      ],
    },
    {
      path: "/403",
      name: "forbidden",
      component: () => import("@/views/error/403.vue"),
      meta: { title: "403" },
    },
    {
      path: "/404",
      name: "not-found",
      component: () => import("@/views/error/404.vue"),
      meta: { title: "404" },
    },
    {
      path: "/500",
      name: "server-error",
      component: () => import("@/views/error/500.vue"),
      meta: { title: "500" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

// Setup router guards
setupRouterGuards(router);

export default router;
