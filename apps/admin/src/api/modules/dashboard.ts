import { http } from "../request";
import type { DashboardStats, ChartData } from "@/types/api";

export const dashboardApi = {
  // Get dashboard statistics
  getStats() {
    return http.get<DashboardStats>("/dashboard/stats");
  },

  // Get user growth chart data
  getUserGrowthChart() {
    return http.get<ChartData>("/dashboard/chart/user-growth");
  },

  // Get visit statistics chart data
  getVisitChart() {
    return http.get<ChartData>("/dashboard/chart/visit");
  },

  // Get recent activities
  getRecentActivities() {
    return http.get<any[]>("/dashboard/activities");
  },
};

export default dashboardApi;
