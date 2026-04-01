<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Lock, User, Eye, EyeOff } from "lucide-vue-next";
import { Button, Input, Label } from "@/components/ui";
import { useNotificationStore } from "@/stores/notification";
import { useAuthStore } from "@/stores/auth";
import authApi from "@/api/modules/auth";

const router = useRouter();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const loading = ref(false);
const showPassword = ref(false);

const form = reactive({
  username: "",
  password: "",
  remember: false,
});

const errors = reactive({
  username: "",
  password: "",
});

function validate(): boolean {
  errors.username = "";
  errors.password = "";

  if (!form.username.trim()) {
    errors.username = "请输入用户名";
    return false;
  }

  if (!form.password) {
    errors.password = "请输入密码";
    return false;
  }

  if (form.password.length < 6) {
    errors.password = "密码至少6个字符";
    return false;
  }

  return true;
}

async function handleLogin() {
  if (!validate()) return;

  loading.value = true;

  try {
    const response = await authApi.login({
      username: form.username,
      password: form.password,
      remember: form.remember,
    });

    const { accessToken, refreshToken, userInfo } = response.data;

    // Store tokens
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    // Update auth store
    authStore.setToken(accessToken);
    authStore.setUserInfo(userInfo);

    notificationStore.success("登录成功", "欢迎回来！");

    router.push("/");
  } catch (error: any) {
    notificationStore.error("登录失败", error.message || "用户名或密码错误");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo and title -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground"
        >
          <Lock class="h-8 w-8" />
        </div>
        <h1 class="text-2xl font-bold">后台管理系统</h1>
        <p class="mt-2 text-muted-foreground">请登录您的账户</p>
      </div>

      <!-- Login form -->
      <div class="rounded-xl border bg-card p-6 shadow-lg">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Username -->
          <div class="space-y-2">
            <Label for="username" required>用户名</Label>
            <div class="relative">
              <User
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="username"
                v-model="form.username"
                placeholder="请输入用户名"
                :error="!!errors.username"
                class="pl-10"
              />
            </div>
            <p v-if="errors.username" class="text-xs text-destructive">
              {{ errors.username }}
            </p>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <Label for="password" required>密码</Label>
            <div class="relative">
              <Lock
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                :error="!!errors.password"
                class="pl-10 pr-10"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.password" class="text-xs text-destructive">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 rounded border-input"
              />
              记住密码
            </label>
            <a href="#" class="text-sm text-primary hover:underline">
              忘记密码？
            </a>
          </div>

          <!-- Submit button -->
          <Button type="submit" class="w-full" :loading="loading">
            登录
          </Button>
        </form>

        <!-- Demo accounts -->
        <div class="mt-6 rounded-lg bg-muted p-4">
          <p class="mb-2 text-xs font-medium text-muted-foreground">
            演示账号：
          </p>
          <div class="space-y-1 text-xs">
            <p><span class="font-medium">管理员：</span>admin / 123456</p>
            <p><span class="font-medium">编辑：</span>editor / 123456</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-muted-foreground">
        &copy; 2024 后台管理系统. All rights reserved.
      </p>
    </div>
  </div>
</template>
