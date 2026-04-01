export const dashboardStats = {
  totalUsers: 1234,
  totalRoles: 5,
  totalMenus: 12,
  todayVisits: 4567,
  userGrowth: 12.5,
  roleGrowth: 0,
  menuGrowth: 8.3,
  visitGrowth: 23.4,
};

export const userGrowthChart = {
  labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
  datasets: [
    {
      label: "新增用户",
      data: [65, 78, 90, 81, 95, 105, 120],
      borderColor: "hsl(222.2 47.4% 11.2%)",
      tension: 0.4,
    },
  ],
};

export const visitChart = {
  labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  datasets: [
    {
      label: "访问量",
      data: [1200, 1900, 1500, 2100, 2400, 1800, 1600],
      backgroundColor: [
        "hsl(222.2 47.4% 11.2%)",
        "hsl(210 40% 96.1%)",
        "hsl(142.1 76.2% 36.3%)",
        "hsl(38 92% 50%)",
        "hsl(199 89% 48%)",
        "hsl(0 84.2% 60.2%)",
        "hsl(262 83% 58%)",
      ],
    },
  ],
};

export const recentActivities = [
  {
    id: 1,
    user: "管理员",
    action: "登录系统",
    time: "2 分钟前",
    type: "info",
  },
  {
    id: 2,
    user: "张三",
    action: "更新了用户信息",
    time: "15 分钟前",
    type: "success",
  },
  {
    id: 3,
    user: "李四",
    action: "删除了角色",
    time: "1 小时前",
    type: "warning",
  },
  {
    id: 4,
    user: "王五",
    action: "创建了新菜单",
    time: "3 小时前",
    type: "info",
  },
  {
    id: 5,
    user: "赵六",
    action: "修改了系统设置",
    time: "5 小时前",
    type: "success",
  },
];

export default {
  dashboardStats,
  userGrowthChart,
  visitChart,
  recentActivities,
};
