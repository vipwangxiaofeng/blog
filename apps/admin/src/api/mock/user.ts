export const userList = [
  {
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
  {
    id: 2,
    username: "zhangsan",
    nickname: "张三",
    email: "zhangsan@example.com",
    phone: "13800138001",
    avatar: "",
    roles: ["editor"],
    permissions: ["user:list", "user:view"],
    status: "active",
    createdAt: "2024-01-15 10:30:00",
    updatedAt: "2024-01-15 10:30:00",
  },
  {
    id: 3,
    username: "lisi",
    nickname: "李四",
    email: "lisi@example.com",
    phone: "13800138002",
    avatar: "",
    roles: ["viewer"],
    permissions: ["user:view"],
    status: "active",
    createdAt: "2024-02-01 14:20:00",
    updatedAt: "2024-02-01 14:20:00",
  },
  {
    id: 4,
    username: "wangwu",
    nickname: "王五",
    email: "wangwu@example.com",
    phone: "13800138003",
    avatar: "",
    roles: ["editor"],
    permissions: ["user:list", "user:view", "user:edit"],
    status: "inactive",
    createdAt: "2024-02-10 09:15:00",
    updatedAt: "2024-02-10 09:15:00",
  },
  {
    id: 5,
    username: "zhaoliu",
    nickname: "赵六",
    email: "zhaoliu@example.com",
    phone: "13800138004",
    avatar: "",
    roles: ["viewer"],
    permissions: ["user:view"],
    status: "active",
    createdAt: "2024-03-01 16:45:00",
    updatedAt: "2024-03-01 16:45:00",
  },
];

export const getUserList = (params: any = {}) => {
  const { page = 1, pageSize = 10, keyword = "", status } = params;

  let filteredList = [...userList];

  // Filter by keyword
  if (keyword) {
    filteredList = filteredList.filter(
      (user) =>
        user.username.includes(keyword) ||
        user.nickname.includes(keyword) ||
        user.email.includes(keyword),
    );
  }

  // Filter by status
  if (status) {
    filteredList = filteredList.filter((user) => user.status === status);
  }

  // Pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedList = filteredList.slice(start, end);

  return {
    list: paginatedList,
    total: filteredList.length,
    page,
    pageSize,
  };
};

export const getUserById = (id: number) => {
  return userList.find((user) => user.id === id);
};

export default {
  list: userList,
  getUserList,
  getUserById,
};
