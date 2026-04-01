import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { LoginRequest } from "@/types/api";
import authApi from "@/api/modules/auth";
import { tokenStorage } from "@/utils/storage";

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const userInfo = computed(() => authStore.userInfo);
  const roles = computed(() => authStore.roles);
  const permissions = computed(() => authStore.permissions);

  // Login
  async function login(data: LoginRequest) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authApi.login(data);
      const { accessToken, refreshToken, userInfo } = response.data;

      // Store tokens
      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(refreshToken);

      // Update store
      authStore.setUserInfo(userInfo);
      authStore.setToken(accessToken);

      // Redirect to dashboard
      router.push("/");

      return { success: true };
    } catch (err: any) {
      error.value = err.message || "登录失败";
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Logout
  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API error
    } finally {
      // Clear local data
      tokenStorage.clearAll();
      authStore.clearAuth();

      // Redirect to login
      router.push("/login");
    }
  }

  // Check auth status
  async function checkAuth() {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      return false;
    }

    try {
      const response = await authApi.getUserInfo();
      authStore.setUserInfo(response.data);
      authStore.setToken(token);
      return true;
    } catch {
      tokenStorage.clearAll();
      authStore.clearAuth();
      return false;
    }
  }

  // Refresh token
  async function refreshToken() {
    const refreshTokenValue = tokenStorage.getRefreshToken();
    if (!refreshTokenValue) {
      return false;
    }

    try {
      const response = await authApi.refreshToken(refreshTokenValue);
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(newRefreshToken);
      authStore.setToken(accessToken);

      return true;
    } catch {
      tokenStorage.clearAll();
      authStore.clearAuth();
      return false;
    }
  }

  return {
    loading,
    error,
    isAuthenticated,
    userInfo,
    roles,
    permissions,
    login,
    logout,
    checkAuth,
    refreshToken,
  };
}
