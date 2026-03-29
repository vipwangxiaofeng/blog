<script setup lang="ts">
import { ref } from "vue";
import { Plus, Search } from "lucide-vue-next";

const searchQuery = ref("");

const users = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    status: "活跃",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    role: "编辑",
    status: "活跃",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    role: "作者",
    status: "禁用",
  },
  {
    id: 4,
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "读者",
    status: "活跃",
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">用户管理</h2>
        <p class="text-muted-foreground">管理系统中的所有用户</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <Plus class="h-4 w-4" />
        添加用户
      </button>
    </div>

    <div class="relative">
      <Search
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索用户..."
        class="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>

    <div class="rounded-lg border">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-muted/50">
            <th class="px-4 py-3 text-left text-sm font-medium">用户</th>
            <th class="px-4 py-3 text-left text-sm font-medium">邮箱</th>
            <th class="px-4 py-3 text-left text-sm font-medium">角色</th>
            <th class="px-4 py-3 text-left text-sm font-medium">状态</th>
            <th class="px-4 py-3 text-left text-sm font-medium">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b last:border-0"
          >
            <td class="px-4 py-3 text-sm">{{ user.name }}</td>
            <td class="px-4 py-3 text-sm text-muted-foreground">
              {{ user.email }}
            </td>
            <td class="px-4 py-3 text-sm">{{ user.role }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'inline-flex rounded-full px-2 py-1 text-xs font-medium',
                  user.status === '活跃'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                ]"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-3">
              <button class="text-sm text-primary hover:underline">编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
