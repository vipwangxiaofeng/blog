import type { Router } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// White list for pages that don't need auth
const whiteList = ["/login", "/register", "/404", "/403", "/500"];

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const token = localStorage.getItem("access_token");

    // If page doesn't need auth
    if (whiteList.includes(to.path)) {
      // If logged in and trying to access login page, redirect to home
      if (token && to.path === "/login") {
        next("/");
        return;
      }
      next();
      return;
    }

    // If no token, redirect to login
    if (!token) {
      next(`/login?redirect=${to.path}`);
      return;
    }

    // If has token but no user info, fetch user info
    if (!authStore.userInfo) {
      try {
        // Here you would typically fetch user info from API
        // For now, we'll just set a basic user
        authStore.setToken(token);
        next();
      } catch (error) {
        // Token expired or invalid
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        next(`/login?redirect=${to.path}`);
      }
      return;
    }

    // Check permission if route has permission requirement
    if (to.meta?.permissions) {
      const hasPermission =
        authStore.permissions.includes("*") ||
        (to.meta.permissions as string[]).some((p) =>
          authStore.permissions.includes(p),
        );

      if (!hasPermission) {
        next("/403");
        return;
      }
    }

    next();
  });

  router.afterEach((to) => {
    // Set page title
    const title = to.meta?.title
      ? `${to.meta.title} - 后台管理`
      : "后台管理系统";
    document.title = title;
  });
}
