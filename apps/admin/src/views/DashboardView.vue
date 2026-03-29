<script setup lang="ts">
import { Users, FileText, TrendingUp, Activity } from "lucide-vue-next";

const stats = [
  { label: "总用户数", value: "1,234", icon: Users, change: "+12%" },
  { label: "文章数量", value: "89", icon: FileText, change: "+5%" },
  { label: "访问量", value: "45.2K", icon: TrendingUp, change: "+18%" },
  { label: "活跃度", value: "92%", icon: Activity, change: "+3%" },
];
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">仪表盘</h2>
      <p class="text-muted-foreground">欢迎回来，这是你的管理后台概览</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg border bg-card p-6"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-muted-foreground">
            {{ stat.label }}
          </p>
          <component :is="stat.icon" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="mt-2">
          <p class="text-2xl font-bold">{{ stat.value }}</p>
          <p class="text-xs text-muted-foreground">
            <span class="text-green-500">{{ stat.change }}</span>
            较上月
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border bg-card p-6">
      <h3 class="mb-4 text-lg font-semibold">最近活动</h3>
      <div class="space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 rounded-lg border p-3"
        >
          <div class="h-8 w-8 rounded-full bg-primary/10" />
          <div class="flex-1">
            <p class="text-sm font-medium">用户活动 {{ i }}</p>
            <p class="text-xs text-muted-foreground">{{ i }} 小时前</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
