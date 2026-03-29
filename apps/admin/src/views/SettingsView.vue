<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const store = useAppStore();
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">系统设置</h2>
      <p class="text-muted-foreground">管理系统的各项配置</p>
    </div>

    <div class="space-y-6">
      <div class="rounded-lg border bg-card p-6">
        <h3 class="mb-4 text-lg font-semibold">外观设置</h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">深色模式</p>
            <p class="text-sm text-muted-foreground">切换深色/浅色主题</p>
          </div>
          <button
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              store.isDark ? 'bg-primary' : 'bg-muted',
            ]"
            @click="store.toggleTheme"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                store.isDark ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
        </div>
      </div>

      <div class="rounded-lg border bg-card p-6">
        <h3 class="mb-4 text-lg font-semibold">侧边栏设置</h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium">折叠侧边栏</p>
            <p class="text-sm text-muted-foreground">
              收起侧边栏以获得更大工作空间
            </p>
          </div>
          <button
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              store.sidebarCollapsed ? 'bg-primary' : 'bg-muted',
            ]"
            @click="store.toggleSidebar"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                store.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
        </div>
      </div>

      <div class="rounded-lg border bg-card p-6">
        <h3 class="mb-4 text-lg font-semibold">站点信息</h3>
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">站点名称</label>
            <input
              type="text"
              value="后台管理系统"
              class="w-full max-w-md rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">站点描述</label>
            <textarea
              rows="3"
              class="w-full max-w-md rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
一个功能强大的后台管理系统</textarea
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
