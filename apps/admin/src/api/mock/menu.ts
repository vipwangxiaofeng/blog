export const menuList = [
  {
    id: 1,
    parentId: null,
    name: "Dashboard",
    path: "/dashboard",
    component: "dashboard/index",
    icon: "LayoutDashboard",
    title: "仪表盘",
    sort: 1,
    hidden: false,
    keepAlive: true,
    children: [],
  },
  {
    id: 2,
    parentId: null,
    name: "System",
    path: "/system",
    component: "",
    icon: "Settings",
    title: "系统管理",
    sort: 2,
    hidden: false,
    keepAlive: false,
    children: [
      {
        id: 21,
        parentId: 2,
        name: "User",
        path: "/system/user",
        component: "system/user/index",
        icon: "Users",
        title: "用户管理",
        sort: 1,
        hidden: false,
        keepAlive: true,
      },
      {
        id: 22,
        parentId: 2,
        name: "Role",
        path: "/system/role",
        component: "system/role/index",
        icon: "Shield",
        title: "角色管理",
        sort: 2,
        hidden: false,
        keepAlive: true,
      },
      {
        id: 23,
        parentId: 2,
        name: "Menu",
        path: "/system/menu",
        component: "system/menu/index",
        icon: "Menu",
        title: "菜单管理",
        sort: 3,
        hidden: false,
        keepAlive: true,
      },
    ],
  },
  {
    id: 3,
    parentId: null,
    name: "Profile",
    path: "/profile",
    component: "profile/index",
    icon: "User",
    title: "个人中心",
    sort: 3,
    hidden: true,
    keepAlive: false,
    children: [],
  },
];

export const getMenuTree = () => {
  return menuList;
};

export const getMenuById = (id: number) => {
  const findMenu = (menus: any[]): any => {
    for (const menu of menus) {
      if (menu.id === id) return menu;
      if (menu.children) {
        const found = findMenu(menu.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findMenu(menuList);
};

export default {
  list: menuList,
  getMenuTree,
  getMenuById,
};
