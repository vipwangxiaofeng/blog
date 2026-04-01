export const roleList = [
  {
    id: 1,
    name: "超级管理员",
    code: "admin",
    description: "拥有系统所有权限",
    permissions: ["*"],
    status: "active",
    createdAt: "2024-01-01 00:00:00",
    updatedAt: "2024-01-01 00:00:00",
  },
  {
    id: 2,
    name: "编辑",
    code: "editor",
    description: "可以编辑内容",
    permissions: [
      "user:list",
      "user:view",
      "user:edit",
      "content:list",
      "content:edit",
    ],
    status: "active",
    createdAt: "2024-01-01 00:00:00",
    updatedAt: "2024-01-01 00:00:00",
  },
  {
    id: 3,
    name: "查看者",
    code: "viewer",
    description: "只能查看内容",
    permissions: ["user:view", "content:view"],
    status: "active",
    createdAt: "2024-01-01 00:00:00",
    updatedAt: "2024-01-01 00:00:00",
  },
];

export const getRoleList = (params: any = {}) => {
  const { page = 1, pageSize = 10, keyword = "" } = params;

  let filteredList = [...roleList];

  if (keyword) {
    filteredList = filteredList.filter(
      (role) => role.name.includes(keyword) || role.code.includes(keyword),
    );
  }

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

export const getRoleById = (id: number) => {
  return roleList.find((role) => role.id === id);
};

export default {
  list: roleList,
  getRoleList,
  getRoleById,
};
