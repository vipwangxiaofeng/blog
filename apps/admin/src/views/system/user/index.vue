<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Plus, Search, RefreshCw, Trash2, Edit, Key } from "lucide-vue-next";
import {
  Button,
  Input,
  Table,
  Pagination,
  Badge,
  Modal,
  Select,
  Label,
  Card,
  ConfirmDialog,
} from "@/components/ui";
import { useTable } from "@/composables/useTable";
import { useNotificationStore } from "@/stores/notification";
import userApi from "@/api/modules/user";
import roleApi from "@/api/modules/role";
import type { UserInfo, UserFormData, Role } from "@/types/api";

const notificationStore = useNotificationStore();

// Table configuration
const columns = [
  { key: "username", title: "用户名", width: 120 },
  { key: "nickname", title: "昵称", width: 120 },
  { key: "email", title: "邮箱", width: 200 },
  { key: "phone", title: "手机号", width: 150 },
  { key: "roles", title: "角色", width: 120 },
  { key: "status", title: "状态", width: 100 },
  { key: "createdAt", title: "创建时间", width: 180 },
  { key: "actions", title: "操作", width: 180 },
];

const {
  state,
  pagination,
  fetchData,
  changePage,
  changePageSize,
  search,
  refresh,
} = useTable<UserInfo>({
  fetchFn: async (params) => {
    const response = await userApi.getList(params);
    return { data: response.data };
  },
});

// Roles for select
const roles = ref<Role[]>([]);

// Modal state
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const modalMode = ref<"create" | "edit">("create");
const currentUser = ref<UserInfo | null>(null);
const loading = ref(false);

// Form data
const formData = reactive<UserFormData>({
  username: "",
  nickname: "",
  email: "",
  phone: "",
  password: "",
  roleIds: [],
  status: "active",
});

const formErrors = reactive({
  username: "",
  nickname: "",
  email: "",
  phone: "",
  password: "",
});

// Fetch roles
async function fetchRoles() {
  try {
    const response = await roleApi.getAll();
    roles.value = response.data;
  } catch (error) {
    console.error("Fetch roles error:", error);
  }
}

// Open create modal
function openCreateModal() {
  modalMode.value = "create";
  resetForm();
  showModal.value = true;
}

// Open edit modal
function openEditModal(user: UserInfo) {
  modalMode.value = "edit";
  currentUser.value = user;
  formData.username = user.username;
  formData.nickname = user.nickname;
  formData.email = user.email;
  formData.phone = user.phone || "";
  formData.password = "";
  formData.roleIds = []; // Would need to fetch user's roles
  formData.status = user.status as "active" | "inactive";
  showModal.value = true;
}

// Reset form
function resetForm() {
  formData.username = "";
  formData.nickname = "";
  formData.email = "";
  formData.phone = "";
  formData.password = "";
  formData.roleIds = [];
  formData.status = "active";
  Object.keys(formErrors).forEach((key) => {
    formErrors[key as keyof typeof formErrors] = "";
  });
}

// Validate form
function validateForm(): boolean {
  let valid = true;
  Object.keys(formErrors).forEach((key) => {
    formErrors[key as keyof typeof formErrors] = "";
  });

  if (!formData.username.trim()) {
    formErrors.username = "请输入用户名";
    valid = false;
  }

  if (!formData.nickname.trim()) {
    formErrors.nickname = "请输入昵称";
    valid = false;
  }

  if (!formData.email.trim()) {
    formErrors.email = "请输入邮箱";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    formErrors.email = "请输入有效的邮箱地址";
    valid = false;
  }

  if (modalMode.value === "create" && !formData.password) {
    formErrors.password = "请输入密码";
    valid = false;
  }

  return valid;
}

// Submit form
async function handleSubmit() {
  if (!validateForm()) return;

  loading.value = true;
  try {
    if (modalMode.value === "create") {
      await userApi.create(formData);
      notificationStore.success("创建成功", "用户已创建");
    } else if (currentUser.value) {
      await userApi.update(currentUser.value.id, formData);
      notificationStore.success("更新成功", "用户信息已更新");
    }
    showModal.value = false;
    refresh();
  } catch (error: any) {
    notificationStore.error("操作失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Delete user
function openDeleteConfirm(user: UserInfo) {
  currentUser.value = user;
  showDeleteConfirm.value = true;
}

async function handleDelete() {
  if (!currentUser.value) return;

  loading.value = true;
  try {
    await userApi.delete(currentUser.value.id);
    notificationStore.success("删除成功", "用户已删除");
    showDeleteConfirm.value = false;
    refresh();
  } catch (error: any) {
    notificationStore.error("删除失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Format phone for display
function formatPhone(phone: string | undefined): string {
  if (!phone) return "-";
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

// Handle search
function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  search(target.value);
}

onMounted(() => {
  fetchRoles();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">用户管理</h2>
        <p class="text-muted-foreground">管理系统中的所有用户</p>
      </div>
      <Button @click="openCreateModal">
        <Plus class="mr-2 h-4 w-4" />
        添加用户
      </Button>
    </div>

    <!-- Filters -->
    <Card class="p-4">
      <div class="flex items-center gap-4">
        <div class="relative flex-1">
          <Search
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            :model-value="state.keyword"
            placeholder="搜索用户名、昵称、邮箱..."
            class="pl-10"
            @input="handleSearch"
          />
        </div>
        <Button variant="outline" @click="refresh">
          <RefreshCw class="mr-2 h-4 w-4" />
          刷新
        </Button>
      </div>
    </Card>

    <!-- Table -->
    <Card class="overflow-hidden">
      <Table :columns="columns" :data="state.list" :loading="state.loading">
        <template #status="{ row }">
          <Badge :variant="row.status === 'active' ? 'success' : 'secondary'">
            {{ row.status === "active" ? "启用" : "禁用" }}
          </Badge>
        </template>

        <template #roles="{ row }">
          <Badge
            v-for="role in row.roles"
            :key="role"
            variant="outline"
            class="mr-1"
          >
            {{
              role === "admin" ? "管理员" : role === "editor" ? "编辑" : role
            }}
          </Badge>
        </template>

        <template #phone="{ row }">
          {{ formatPhone(row.phone) }}
        </template>

        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" @click="openEditModal(row)">
              <Edit class="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="text-destructive hover:text-destructive"
              @click="openDeleteConfirm(row)"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </template>
      </Table>

      <div class="border-t p-4">
        <Pagination
          :page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          show-size-changer
          @update:page="changePage"
          @update:page-size="changePageSize"
        />
      </div>
    </Card>

    <!-- Create/Edit Modal -->
    <Modal
      v-model:open="showModal"
      :title="modalMode === 'create' ? '添加用户' : '编辑用户'"
      size="md"
    >
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <Label for="username" required>用户名</Label>
          <Input
            id="username"
            v-model="formData.username"
            placeholder="请输入用户名"
            :error="!!formErrors.username"
          />
          <p v-if="formErrors.username" class="text-xs text-destructive">
            {{ formErrors.username }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="nickname" required>昵称</Label>
          <Input
            id="nickname"
            v-model="formData.nickname"
            placeholder="请输入昵称"
            :error="!!formErrors.nickname"
          />
          <p v-if="formErrors.nickname" class="text-xs text-destructive">
            {{ formErrors.nickname }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="email" required>邮箱</Label>
          <Input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="请输入邮箱"
            :error="!!formErrors.email"
          />
          <p v-if="formErrors.email" class="text-xs text-destructive">
            {{ formErrors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="phone">手机号</Label>
          <Input
            id="phone"
            v-model="formData.phone"
            placeholder="请输入手机号"
            :error="!!formErrors.phone"
          />
          <p v-if="formErrors.phone" class="text-xs text-destructive">
            {{ formErrors.phone }}
          </p>
        </div>

        <div v-if="modalMode === 'create'" class="space-y-2">
          <Label for="password" required>密码</Label>
          <Input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            :error="!!formErrors.password"
          />
          <p v-if="formErrors.password" class="text-xs text-destructive">
            {{ formErrors.password }}
          </p>
        </div>

        <div class="space-y-2">
          <Label required>状态</Label>
          <Select
            v-model="formData.status"
            :options="[
              { label: '启用', value: 'active' },
              { label: '禁用', value: 'inactive' },
            ]"
          />
        </div>
      </form>

      <template #footer>
        <Button variant="outline" @click="showModal = false">取消</Button>
        <Button :loading="loading" @click="handleSubmit">
          {{ modalMode === "create" ? "创建" : "保存" }}
        </Button>
      </template>
    </Modal>

    <!-- Delete Confirm -->
    <ConfirmDialog
      v-model:open="showDeleteConfirm"
      type="danger"
      title="确认删除"
      message="确定要删除此用户吗？此操作不可撤销。"
      :confirm-loading="loading"
      @confirm="handleDelete"
    />
  </div>
</template>
