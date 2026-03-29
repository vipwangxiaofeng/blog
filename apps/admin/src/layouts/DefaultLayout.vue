<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  Sun,
  Moon,
} from "lucide-vue-next";

const store = useAppStore();
const route = useRoute();

const navItems = [
  { path: "/", name: "dashboard", label: "仪表盘", icon: LayoutDashboard },
  { path: "/users", name: "users", label: "用户管理", icon: Users },
  { path: "/settings", name: "settings", label: "系统设置", icon: Settings },
];
</script>

<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col border-r bg-card transition-all duration-300',
        store.sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="flex h-14 items-center border-b px-4">
        <span v-if="!store.sidebarCollapsed" class="text-lg font-semibold">
          后台管理
        </span>
        <Menu
          class="ml-auto h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground"
          @click="store.toggleSidebar"
        />
      </div>
      <nav class="flex-1 space-y-1 p-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            route.path === item.path
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span v-if="!store.sidebarCollapsed">{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header -->
      <header class="flex h-14 items-center justify-between border-b px-6">
        <h1 class="text-lg font-semibold">管理后台</h1>
        <button
          class="rounded-lg p-2 hover:bg-accent"
          @click="store.toggleTheme"
        >
          <Sun v-if="store.isDark" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
