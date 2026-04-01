import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { UserInfo } from "@/types/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const userInfo = ref<UserInfo | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const roles = computed(() => userInfo.value?.roles || []);
  const permissions = computed(() => userInfo.value?.permissions || []);

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function setUserInfo(info: UserInfo) {
    userInfo.value = info;
  }

  function clearAuth() {
    token.value = null;
    userInfo.value = null;
  }

  return {
    token,
    userInfo,
    isAuthenticated,
    roles,
    permissions,
    setToken,
    setUserInfo,
    clearAuth,
  };
});
