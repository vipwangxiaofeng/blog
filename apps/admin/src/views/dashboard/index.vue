<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Users,
  Shield,
  Menu,
  TrendingUp,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-vue-next";
import { Card } from "@/components/ui";
import dashboardApi from "@/api/modules/dashboard";
import type { DashboardStats } from "@/types/api";

const loading = ref(false);
const stats = ref<DashboardStats>({
  totalUsers: 0,
  totalRoles: 0,
  totalMenus: 0,
  todayVisits: 0,
  userGrowth: 0,
  roleGrowth: 0,
  menuGrowth: 0,
  visitGrowth: 0,
});

const recentActivities = ref<any[]>([]);

const statCards = ref([
  {
    label: "总用户数",
    value: "0",
    icon: Users,
    change: "+0%",
    key: "totalUsers",
    growthKey: "userGrowth",
  },
  {
    label: "角色数量",
    value: "0",
    icon: Shield,
    change: "+0%",
    key: "totalRoles",
    growthKey: "roleGrowth",
  },
  {
    label: "菜单数量",
    value: "0",
    icon: Menu,
    change: "+0%",
    key: "totalMenus",
    growthKey: "menuGrowth",
  },
  {
    label: "今日访问",
    value: "0",
    icon: Activity,
    change: "+0%",
    key: "todayVisits",
    growthKey: "visitGrowth",
  },
]);

async function fetchDashboardData() {
  loading.value = true;
  try {
    const [statsRes, activitiesRes] = await Promise.all([
      dashboardApi.getStats(),
      dashboardApi.getRecentActivities(),
    ]);

    stats.value = statsRes.data;
    recentActivities.value = activitiesRes.data;

    // Update stat cards
    statCards.value = statCards.value.map((card) => ({
      ...card,
      value: String(stats.value[card.key as keyof DashboardStats]),
      change: `${stats.value[card.growthKey as keyof DashboardStats] > 0 ? "+" : ""}${stats.value[card.growthKey as keyof DashboardStats]}%`,
    }));
  } catch (error) {
    console.error("Fetch dashboard data error:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight">仪表盘</h2>
      <p class="text-muted-foreground">欢迎回来，这是你的管理后台概览</p>
    </div>

    <!-- Stats cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="stat in statCards" :key="stat.label" class="p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-muted-foreground">
            {{ stat.label }}
          </p>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="mt-2">
          <p class="text-2xl font-bold">{{ stat.value }}</p>
          <p class="flex items-center text-xs text-muted-foreground">
            <ArrowUp
              v-if="stat.change.startsWith('+')"
              class="mr-1 h-3 w-3 text-success"
            />
            <ArrowDown
              v-else-if="stat.change.startsWith('-')"
              class="mr-1 h-3 w-3 text-destructive"
            />
            <span
              :class="{
                'text-success': stat.change.startsWith('+'),
                'text-destructive': stat.change.startsWith('-'),
              }"
            >
              {{ stat.change }}
            </span>
            <span class="ml-1">较上月</span>
          </p>
        </div>
      </Card>
    </div>

    <!-- Recent activities -->
    <Card class="p-6">
      <h3 class="mb-4 text-lg font-semibold">最近活动</h3>
      <div class="space-y-4">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-center gap-4 rounded-lg border p-3"
        >
          <div
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-full',
              activity.type === 'success'
                ? 'bg-success/10 text-success'
                : activity.type === 'warning'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-primary/10 text-primary',
            ]"
          >
            <Activity class="h-4 w-4" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">
              {{ activity.user }} {{ activity.action }}
            </p>
            <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
