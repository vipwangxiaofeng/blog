<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Plus, Search, RefreshCw, Trash2, Edit } from "lucide-vue-next";
import {
  Button,
  Input,
  Table,
  Pagination,
  Badge,
  Modal,
  Label,
  Card,
  ConfirmDialog,
} from "@/components/ui";
import { useTable } from "@/composables/useTable";
import { useNotificationStore } from "@/stores/notification";
import roleApi from "@/api/modules/role";
import type { Role, RoleFormData } from "@/types/api";

const notificationStore = useNotificationStore();

// Table configuration
const columns = [
  { key: "name", title: "角色名称", width: 150 },
  { key: "code", title: "角色编码", width: 150 },
  { key: "description", title: "描述", width: 200 },
  { key: "permissions", title: "权限", width: 200 },
  { key: "status", title: "状态", width: 100 },
  { key: "createdAt", title: "创建时间", width: 180 },
  { key: "actions", title: "操作", width: 150 },
];

// Available permissions
const availablePermissions = [
  { code: "user:list", name: "用户列表" },
  { code: "user:view", name: "用户详情" },
  { code: "user:create", name: "创建用户" },
  { code: "user:edit", name: "编辑用户" },
  { code: "user:delete", name: "删除用户" },
  { code: "role:list", name: "角色列表" },
  { code: "role:create", name: "创建角色" },
  { code: "role:edit", name: "编辑角色" },
  { code: "role:delete", name: "删除角色" },
  { code: "menu:list", name: "菜单列表" },
  { code: "menu:create", name: "创建菜单" },
  { code: "menu:edit", name: "编辑菜单" },
  { code: "menu:delete", name: "删除菜单" },
];

const {
  state,
  pagination,
  fetchData,
  changePage,
  changePageSize,
  search,
  refresh,
} = useTable<Role>({
  fetchFn: async (params) => {
    const response = await roleApi.getList(params);
    return { data: response.data };
  },
});

// Modal state
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const modalMode = ref<"create" | "edit">("create");
const currentRole = ref<Role | null>(null);
const loading = ref(false);

// Form data
const formData = reactive<RoleFormData>({
  name: "",
  code: "",
  description: "",
  permissions: [],
  status: "active",
});

const formErrors = reactive({
  name: "",
  code: "",
});

// Open create modal
function openCreateModal() {
  modalMode.value = "create";
  resetForm();
  showModal.value = true;
}

// Open edit modal
function openEditModal(role: Role) {
  modalMode.value = "edit";
  currentRole.value = role;
  formData.name = role.name;
  formData.code = role.code;
  formData.description = role.description || "";
  formData.permissions = [...role.permissions];
  formData.status = role.status as "active" | "inactive";
  showModal.value = true;
}

// Reset form
function resetForm() {
  formData.name = "";
  formData.code = "";
  formData.description = "";
  formData.permissions = [];
  formData.status = "active";
  formErrors.name = "";
  formErrors.code = "";
}

// Toggle permission
function togglePermission(code: string) {
  const index = formData.permissions.indexOf(code);
  if (index === -1) {
    formData.permissions.push(code);
  } else {
    formData.permissions.splice(index, 1);
  }
}

// Select all permissions
function selectAllPermissions() {
  if (formData.permissions.length === availablePermissions.length) {
    formData.permissions = [];
  } else {
    formData.permissions = availablePermissions.map((p) => p.code);
  }
}

// Validate form
function validateForm(): boolean {
  let valid = true;
  formErrors.name = "";
  formErrors.code = "";

  if (!formData.name.trim()) {
    formErrors.name = "请输入角色名称";
    valid = false;
  }

  if (!formData.code.trim()) {
    formErrors.code = "请输入角色编码";
    valid = false;
  } else if (!/^[a-zA-Z_]+$/.test(formData.code)) {
    formErrors.code = "角色编码只能包含字母和下划线";
    valid = false;
  }

  if (formData.permissions.length === 0) {
    notificationStore.warning("请选择权限", "请至少选择一个权限");
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
      await roleApi.create(formData);
      notificationStore.success("创建成功", "角色已创建");
    } else if (currentRole.value) {
      await roleApi.update(currentRole.value.id, formData);
      notificationStore.success("更新成功", "角色信息已更新");
    }
    showModal.value = false;
    refresh();
  } catch (error: any) {
    notificationStore.error("操作失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Delete role
function openDeleteConfirm(role: Role) {
  currentRole.value = role;
  showDeleteConfirm.value = true;
}

async function handleDelete() {
  if (!currentRole.value) return;

  loading.value = true;
  try {
    await roleApi.delete(currentRole.value.id);
    notificationStore.success("删除成功", "角色已删除");
    showDeleteConfirm.value = false;
    refresh();
  } catch (error: any) {
    notificationStore.error("删除失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Handle search
function handleSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  search(target.value);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">角色管理</h2>
        <p class="text-muted-foreground">管理系统中的所有角色和权限</p>
      </div>
      <Button @click="openCreateModal">
        <Plus class="mr-2 h-4 w-4" />
        添加角色
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
            placeholder="搜索角色名称、编码..."
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
        <template #permissions="{ row }">
          <Badge
            v-for="perm in row.permissions.slice(0, 3)"
            :key="perm"
            variant="outline"
            class="mr-1"
          >
            {{
              availablePermissions.find((p) => p.code === perm)?.name || perm
            }}
          </Badge>
          <Badge v-if="row.permissions.length > 3" variant="secondary">
            +{{ row.permissions.length - 3 }}
          </Badge>
        </template>

        <template #status="{ row }">
          <Badge :variant="row.status === 'active' ? 'success' : 'secondary'">
            {{ row.status === "active" ? "启用" : "禁用" }}
          </Badge>
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
              :disabled="row.code === 'admin'"
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
      :title="modalMode === 'create' ? '添加角色' : '编辑角色'"
      size="lg"
    >
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="name" required>角色名称</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="请输入角色名称"
              :error="!!formErrors.name"
            />
            <p v-if="formErrors.name" class="text-xs text-destructive">
              {{ formErrors.name }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="code" required>角色编码</Label>
            <Input
              id="code"
              v-model="formData.code"
              placeholder="请输入角色编码"
              :error="!!formErrors.code"
            />
            <p v-if="formErrors.code" class="text-xs text-destructive">
              {{ formErrors.code }}
            </p>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="description">描述</Label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="请输入角色描述"
          />
        </div>

        <div class="space-y-2">
          <Label required>权限</Label>
          <div class="rounded-lg border p-4">
            <div class="mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                :checked="
                  formData.permissions.length === availablePermissions.length
                "
                class="h-4 w-4 rounded border-input"
                @change="selectAllPermissions"
              />
              <span class="text-sm font-medium">全选</span>
            </div>
            <div class="grid gap-2 md:grid-cols-3">
              <label
                v-for="perm in availablePermissions"
                :key="perm.code"
                class="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  :checked="formData.permissions.includes(perm.code)"
                  class="h-4 w-4 rounded border-input"
                  @change="togglePermission(perm.code)"
                />
                {{ perm.name }}
              </label>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <Label required>状态</Label>
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 text-sm">
              <input
                v-model="formData.status"
                type="radio"
                value="active"
                class="h-4 w-4 border-input"
              />
              启用
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input
                v-model="formData.status"
                type="radio"
                value="inactive"
                class="h-4 w-4 border-input"
              />
              禁用
            </label>
          </div>
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
      message="确定要删除此角色吗？此操作不可撤销。"
      :confirm-loading="loading"
      @confirm="handleDelete"
    />
  </div>
</template>
