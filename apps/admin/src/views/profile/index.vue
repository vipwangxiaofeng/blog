<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { User, Mail, Phone, Lock, Save } from "lucide-vue-next";
import { Button, Input, Label, Card, Badge } from "@/components/ui";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const loading = ref(false);
const activeTab = ref<"profile" | "password">("profile");

// Profile form
const profileForm = reactive({
  nickname: authStore.userInfo?.nickname || "",
  email: authStore.userInfo?.email || "",
  phone: authStore.userInfo?.phone || "",
});

// Password form
const passwordForm = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const passwordErrors = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// Validate password form
function validatePasswordForm(): boolean {
  let valid = true;
  passwordErrors.oldPassword = "";
  passwordErrors.newPassword = "";
  passwordErrors.confirmPassword = "";

  if (!passwordForm.oldPassword) {
    passwordErrors.oldPassword = "请输入旧密码";
    valid = false;
  }

  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = "请输入新密码";
    valid = false;
  } else if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = "密码至少6个字符";
    valid = false;
  }

  if (!passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = "请确认新密码";
    valid = false;
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = "两次输入的密码不一致";
    valid = false;
  }

  return valid;
}

// Save profile
async function saveProfile() {
  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    notificationStore.success("保存成功", "个人信息已更新");
  } catch (error) {
    notificationStore.error("保存失败", "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Change password
async function changePassword() {
  if (!validatePasswordForm()) return;

  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    notificationStore.success("修改成功", "密码已修改，请重新登录");

    // Reset form
    passwordForm.oldPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";
  } catch (error) {
    notificationStore.error("修改失败", "请稍后重试");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight">个人中心</h2>
      <p class="text-muted-foreground">管理您的个人信息和账户设置</p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <!-- User Info Card -->
      <Card class="p-6">
        <div class="flex flex-col items-center text-center">
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          >
            <User class="h-10 w-10 text-primary" />
          </div>
          <h3 class="mt-4 text-lg font-semibold">
            {{ authStore.userInfo?.nickname || "用户" }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ authStore.userInfo?.email }}
          </p>
          <div class="mt-3 flex gap-2">
            <Badge
              v-for="role in authStore.userInfo?.roles"
              :key="role"
              variant="outline"
            >
              {{
                role === "admin" ? "管理员" : role === "editor" ? "编辑" : role
              }}
            </Badge>
          </div>
        </div>

        <div class="mt-6 space-y-3 border-t pt-6">
          <div class="flex items-center gap-3 text-sm">
            <User class="h-4 w-4 text-muted-foreground" />
            <span>{{ authStore.userInfo?.username }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <Mail class="h-4 w-4 text-muted-foreground" />
            <span>{{ authStore.userInfo?.email || "未设置" }}</span>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <Phone class="h-4 w-4 text-muted-foreground" />
            <span>{{ authStore.userInfo?.phone || "未设置" }}</span>
          </div>
        </div>
      </Card>

      <!-- Settings Card -->
      <Card class="md:col-span-2">
        <!-- Tabs -->
        <div class="border-b">
          <div class="flex">
            <button
              :class="[
                'px-6 py-3 text-sm font-medium transition-colors',
                activeTab === 'profile'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="activeTab = 'profile'"
            >
              基本信息
            </button>
            <button
              :class="[
                'px-6 py-3 text-sm font-medium transition-colors',
                activeTab === 'password'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              ]"
              @click="activeTab = 'password'"
            >
              修改密码
            </button>
          </div>
        </div>

        <!-- Profile Form -->
        <div v-if="activeTab === 'profile'" class="p-6">
          <form class="space-y-4" @submit.prevent="saveProfile">
            <div class="space-y-2">
              <Label for="nickname">昵称</Label>
              <Input
                id="nickname"
                v-model="profileForm.nickname"
                placeholder="请输入昵称"
              />
            </div>

            <div class="space-y-2">
              <Label for="email">邮箱</Label>
              <Input
                id="email"
                v-model="profileForm.email"
                type="email"
                placeholder="请输入邮箱"
              />
            </div>

            <div class="space-y-2">
              <Label for="phone">手机号</Label>
              <Input
                id="phone"
                v-model="profileForm.phone"
                placeholder="请输入手机号"
              />
            </div>

            <Button type="submit" :loading="loading">
              <Save class="mr-2 h-4 w-4" />
              保存修改
            </Button>
          </form>
        </div>

        <!-- Password Form -->
        <div v-else class="p-6">
          <form class="space-y-4" @submit.prevent="changePassword">
            <div class="space-y-2">
              <Label for="oldPassword">旧密码</Label>
              <Input
                id="oldPassword"
                v-model="passwordForm.oldPassword"
                type="password"
                placeholder="请输入旧密码"
                :error="!!passwordErrors.oldPassword"
              />
              <p
                v-if="passwordErrors.oldPassword"
                class="text-xs text-destructive"
              >
                {{ passwordErrors.oldPassword }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="newPassword">新密码</Label>
              <Input
                id="newPassword"
                v-model="passwordForm.newPassword"
                type="password"
                placeholder="请输入新密码"
                :error="!!passwordErrors.newPassword"
              />
              <p
                v-if="passwordErrors.newPassword"
                class="text-xs text-destructive"
              >
                {{ passwordErrors.newPassword }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                type="password"
                placeholder="请确认新密码"
                :error="!!passwordErrors.confirmPassword"
              />
              <p
                v-if="passwordErrors.confirmPassword"
                class="text-xs text-destructive"
              >
                {{ passwordErrors.confirmPassword }}
              </p>
            </div>

            <Button type="submit" :loading="loading">
              <Lock class="mr-2 h-4 w-4" />
              修改密码
            </Button>
          </form>
        </div>
      </Card>
    </div>
  </div>
</template>
