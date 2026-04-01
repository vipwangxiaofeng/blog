export default {
  accessToken: "mock-access-token-" + Date.now(),
  refreshToken: "mock-refresh-token-" + Date.now(),
  expiresIn: 7200,
  userInfo: {
    id: 1,
    username: "admin",
    nickname: "管理员",
    email: "admin@example.com",
    phone: "13800138000",
    avatar: "",
    roles: ["admin"],
    permissions: ["*"],
    status: "active",
    createdAt: "2024-01-01 00:00:00",
    updatedAt: "2024-01-01 00:00:00",
  },
};
