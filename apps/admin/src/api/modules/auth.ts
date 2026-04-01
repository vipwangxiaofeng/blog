import { http } from "../request";
import type { LoginRequest, LoginResponse, UserInfo } from "@/types/api";

export const authApi = {
  // Login
  login(data: LoginRequest) {
    return http.post<LoginResponse>("/auth/login", data);
  },

  // Logout
  logout() {
    return http.post("/auth/logout");
  },

  // Refresh token
  refreshToken(refreshToken: string) {
    return http.post<{ accessToken: string; refreshToken: string }>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );
  },

  // Get current user info
  getUserInfo() {
    return http.get<UserInfo>("/auth/userinfo");
  },

  // Update password
  updatePassword(data: { oldPassword: string; newPassword: string }) {
    return http.post("/auth/password", data);
  },
};

export default authApi;
