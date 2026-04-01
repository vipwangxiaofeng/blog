<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  Sun,
  Moon,
  ChevronRight,
  Bell,
  User,
  LogOut,
  Shield,
} from "lucide-vue-next";

const appStore = useAppStore();
const authStore = useAuthStore();
const route = useRoute();

const navItems = [
  { path: "/", name: "dashboard", label: "仪表盘", icon: LayoutDashboard },
  {
    path: "/system",
    name: "system",
    label: "系统管理",
    icon: Settings,
    children: [
      { path: "/system/user", name: "user", label: "用户管理", icon: Users },
      { path: "/system/role", name: "role", label: "角色管理", icon: Shield },
      { path: "/system/menu", name: "menu", label: "菜单管理", icon: Menu },
    ],
  },
];

// Generate breadcrumbs
const breadcrumbs = computed(() => {
  const matched = route.matched;
  return matched
    .filter((item) => item.meta?.title)
    .map((item) => ({
      title: item.meta.title as string,
      path: item.path,
    }));
});

function handleLogout() {
  // Clear auth data
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  authStore.clearAuth();
  window.location.href = "/login";
}
</script>

<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col border-r bg-card transition-all duration-300',
        appStore.sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <!-- Logo -->
      <div class="flex h-14 items-center border-b px-4">
        <span v-if="!appStore.sidebarCollapsed" class="text-lg font-semibold">
          后台管理
        </span>
        <Menu
          class="ml-auto h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground"
          @click="appStore.toggleSidebar"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 overflow-y-auto p-2">
        <template v-for="item in navItems" :key="item.name">
          <!-- Simple nav item -->
          <RouterLink
            v-if="!item.children"
            :to="item.path"
            :class="[
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              route.path === item.path
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
          >
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            <span v-if="!appStore.sidebarCollapsed">{{ item.label }}</span>
          </RouterLink>

          <!-- Nav group with children -->
          <div v-else>
            <div
              v-if="!appStore.sidebarCollapsed"
              class="mb-1 mt-4 px-3 text-xs font-semibold uppercase text-muted-foreground"
            >
              {{ item.label }}
            </div>
            <RouterLink
              v-for="child in item.children"
              :key="child.name"
              :to="child.path"
              :class="[
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                route.path === child.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              ]"
            >
              <component :is="child.icon" class="h-5 w-5 shrink-0" />
              <span v-if="!appStore.sidebarCollapsed">{{ child.label }}</span>
            </RouterLink>
          </div>
        </template>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header -->
      <header class="flex h-14 items-center justify-between border-b px-6">
        <!-- Breadcrumbs -->
        <nav
          v-if="breadcrumbs.length > 0"
          class="flex items-center space-x-1 text-sm"
        >
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
            <RouterLink
              v-if="index < breadcrumbs.length - 1"
              :to="crumb.path"
              class="text-muted-foreground hover:text-foreground"
            >
              {{ crumb.title }}
            </RouterLink>
            <span v-else class="font-medium text-foreground">
              {{ crumb.title }}
            </span>
            <ChevronRight
              v-if="index < breadcrumbs.length - 1"
              class="h-4 w-4 text-muted-foreground"
            />
          </template>
        </nav>
        <div v-else />

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <!-- Theme toggle -->
          <button
            class="rounded-lg p-2 hover:bg-accent"
            @click="appStore.toggleTheme"
          >
            <Sun v-if="appStore.isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>

          <!-- Notifications -->
          <button class="relative rounded-lg p-2 hover:bg-accent">
            <Bell class="h-5 w-5" />
            <span
              class="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"
            />
          </button>

          <!-- User menu -->
          <div class="flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10"
            >
              <User class="h-4 w-4" />
            </div>
            <span v-if="authStore.userInfo" class="text-sm font-medium">
              {{ authStore.userInfo.nickname }}
            </span>
            <button
              class="rounded-lg p-2 hover:bg-accent"
              title="退出登录"
              @click="handleLogout"
            >
              <LogOut class="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
