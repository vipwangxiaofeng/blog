<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Menu as MenuIcon,
} from "lucide-vue-next";
import {
  Button,
  Input,
  Modal,
  Label,
  Badge,
  Card,
  ConfirmDialog,
} from "@/components/ui";
import { useNotificationStore } from "@/stores/notification";
import menuApi from "@/api/modules/menu";
import type { MenuItem, MenuFormData } from "@/types/api";

const notificationStore = useNotificationStore();

const loading = ref(false);
const menuList = ref<MenuItem[]>([]);

// Modal state
const showModal = ref(false);
const showDeleteConfirm = ref(false);
const modalMode = ref<"create" | "edit">("create");
const currentMenu = ref<MenuItem | null>(null);

// Expanded rows
const expandedKeys = ref<Set<number>>(new Set());

// Form data
const formData = reactive<MenuFormData>({
  parentId: null,
  name: "",
  path: "",
  component: "",
  redirect: "",
  icon: "",
  title: "",
  sort: 0,
  hidden: false,
  keepAlive: true,
});

const formErrors = reactive({
  name: "",
  path: "",
  title: "",
});

// Icon options
const iconOptions = [
  "LayoutDashboard",
  "Users",
  "Settings",
  "Menu",
  "Shield",
  "FileText",
  "Image",
  "Video",
  "Music",
  "ShoppingCart",
  "Mail",
  "Calendar",
  "Clock",
  "Star",
  "Heart",
];

// Fetch menu tree
async function fetchMenus() {
  loading.value = true;
  try {
    const response = await menuApi.getTree();
    menuList.value = response.data;
  } catch (error) {
    console.error("Fetch menus error:", error);
  } finally {
    loading.value = false;
  }
}

// Toggle expand
function toggleExpand(id: number) {
  if (expandedKeys.value.has(id)) {
    expandedKeys.value.delete(id);
  } else {
    expandedKeys.value.add(id);
  }
}

// Open create modal
function openCreateModal(parentId: number | null = null) {
  modalMode.value = "create";
  resetForm();
  formData.parentId = parentId;
  showModal.value = true;
}

// Open edit modal
function openEditModal(menu: MenuItem) {
  modalMode.value = "edit";
  currentMenu.value = menu;
  formData.parentId = menu.parentId;
  formData.name = menu.name;
  formData.path = menu.path;
  formData.component = menu.component || "";
  formData.redirect = menu.redirect || "";
  formData.icon = menu.icon || "";
  formData.title = menu.title;
  formData.sort = menu.sort;
  formData.hidden = menu.hidden;
  formData.keepAlive = menu.keepAlive;
  showModal.value = true;
}

// Reset form
function resetForm() {
  formData.parentId = null;
  formData.name = "";
  formData.path = "";
  formData.component = "";
  formData.redirect = "";
  formData.icon = "";
  formData.title = "";
  formData.sort = 0;
  formData.hidden = false;
  formData.keepAlive = true;
  formErrors.name = "";
  formErrors.path = "";
  formErrors.title = "";
}

// Validate form
function validateForm(): boolean {
  let valid = true;
  formErrors.name = "";
  formErrors.path = "";
  formErrors.title = "";

  if (!formData.name.trim()) {
    formErrors.name = "请输入菜单名称";
    valid = false;
  }

  if (!formData.path.trim()) {
    formErrors.path = "请输入路由路径";
    valid = false;
  }

  if (!formData.title.trim()) {
    formErrors.title = "请输入菜单标题";
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
      await menuApi.create(formData);
      notificationStore.success("创建成功", "菜单已创建");
    } else if (currentMenu.value) {
      await menuApi.update(currentMenu.value.id, formData);
      notificationStore.success("更新成功", "菜单信息已更新");
    }
    showModal.value = false;
    fetchMenus();
  } catch (error: any) {
    notificationStore.error("操作失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

// Delete menu
function openDeleteConfirm(menu: MenuItem) {
  currentMenu.value = menu;
  showDeleteConfirm.value = true;
}

async function handleDelete() {
  if (!currentMenu.value) return;

  loading.value = true;
  try {
    await menuApi.delete(currentMenu.value.id);
    notificationStore.success("删除成功", "菜单已删除");
    showDeleteConfirm.value = false;
    fetchMenus();
  } catch (error: any) {
    notificationStore.error("删除失败", error.message || "请稍后重试");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchMenus();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">菜单管理</h2>
        <p class="text-muted-foreground">管理系统菜单和路由配置</p>
      </div>
      <Button @click="openCreateModal(null)">
        <Plus class="mr-2 h-4 w-4" />
        添加菜单
      </Button>
    </div>

    <!-- Menu Tree -->
    <Card class="overflow-hidden">
      <div class="p-4">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 text-left text-sm font-medium">菜单名称</th>
              <th class="px-4 py-3 text-left text-sm font-medium">图标</th>
              <th class="px-4 py-3 text-left text-sm font-medium">路由路径</th>
              <th class="px-4 py-3 text-left text-sm font-medium">组件路径</th>
              <th class="px-4 py-3 text-left text-sm font-medium">排序</th>
              <th class="px-4 py-3 text-left text-sm font-medium">状态</th>
              <th class="px-4 py-3 text-left text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading state -->
            <tr v-if="loading">
              <td colspan="7" class="h-24 text-center text-muted-foreground">
                加载中...
              </td>
            </tr>

            <!-- Empty state -->
            <tr v-else-if="menuList.length === 0">
              <td colspan="7" class="h-24 text-center text-muted-foreground">
                暂无数据
              </td>
            </tr>

            <!-- Menu rows -->
            <template v-else v-for="menu in menuList" :key="menu.id">
              <tr class="border-b hover:bg-muted/50">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <button
                      v-if="menu.children && menu.children.length > 0"
                      class="rounded p-1 hover:bg-accent"
                      @click="toggleExpand(menu.id)"
                    >
                      <ChevronDown
                        v-if="expandedKeys.has(menu.id)"
                        class="h-4 w-4"
                      />
                      <ChevronRight v-else class="h-4 w-4" />
                    </button>
                    <span v-else class="w-6" />
                    {{ menu.title }}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <MenuIcon v-if="menu.icon" class="h-4 w-4" />
                  <span v-else class="text-muted-foreground">-</span>
                </td>
                <td class="px-4 py-3 text-sm text-muted-foreground">
                  {{ menu.path }}
                </td>
                <td class="px-4 py-3 text-sm text-muted-foreground">
                  {{ menu.component || "-" }}
                </td>
                <td class="px-4 py-3 text-sm">{{ menu.sort }}</td>
                <td class="px-4 py-3">
                  <Badge :variant="menu.hidden ? 'secondary' : 'success'">
                    {{ menu.hidden ? "隐藏" : "显示" }}
                  </Badge>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="openCreateModal(menu.id)"
                    >
                      <Plus class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="openEditModal(menu)"
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-destructive hover:text-destructive"
                      @click="openDeleteConfirm(menu)"
                    >
                      <Trash2 class="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>

              <!-- Children rows -->
              <template v-if="menu.children && expandedKeys.has(menu.id)">
                <tr
                  v-for="child in menu.children"
                  :key="child.id"
                  class="border-b bg-muted/30 hover:bg-muted/50"
                >
                  <td class="px-4 py-3 pl-12">{{ child.title }}</td>
                  <td class="px-4 py-3">
                    <MenuIcon v-if="child.icon" class="h-4 w-4" />
                    <span v-else class="text-muted-foreground">-</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-muted-foreground">
                    {{ child.path }}
                  </td>
                  <td class="px-4 py-3 text-sm text-muted-foreground">
                    {{ child.component || "-" }}
                  </td>
                  <td class="px-4 py-3 text-sm">{{ child.sort }}</td>
                  <td class="px-4 py-3">
                    <Badge :variant="child.hidden ? 'secondary' : 'success'">
                      {{ child.hidden ? "隐藏" : "显示" }}
                    </Badge>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        @click="openEditModal(child)"
                      >
                        <Edit class="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        class="text-destructive hover:text-destructive"
                        @click="openDeleteConfirm(child)"
                      >
                        <Trash2 class="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Create/Edit Modal -->
    <Modal
      v-model:open="showModal"
      :title="modalMode === 'create' ? '添加菜单' : '编辑菜单'"
      size="lg"
    >
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="title" required>菜单标题</Label>
            <Input
              id="title"
              v-model="formData.title"
              placeholder="请输入菜单标题"
              :error="!!formErrors.title"
            />
            <p v-if="formErrors.title" class="text-xs text-destructive">
              {{ formErrors.title }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="name" required>菜单名称</Label>
            <Input
              id="name"
              v-model="formData.name"
              placeholder="请输入菜单名称"
              :error="!!formErrors.name"
            />
            <p v-if="formErrors.name" class="text-xs text-destructive">
              {{ formErrors.name }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="path" required>路由路径</Label>
            <Input
              id="path"
              v-model="formData.path"
              placeholder="请输入路由路径"
              :error="!!formErrors.path"
            />
            <p v-if="formErrors.path" class="text-xs text-destructive">
              {{ formErrors.path }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="component">组件路径</Label>
            <Input
              id="component"
              v-model="formData.component"
              placeholder="请输入组件路径"
            />
          </div>

          <div class="space-y-2">
            <Label for="icon">图标</Label>
            <select
              id="icon"
              v-model="formData.icon"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="">请选择图标</option>
              <option v-for="icon in iconOptions" :key="icon" :value="icon">
                {{ icon }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <Label for="sort">排序</Label>
            <Input
              id="sort"
              v-model.number="formData.sort"
              type="number"
              placeholder="请输入排序值"
            />
          </div>
        </div>

        <div class="flex items-center gap-6">
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="formData.hidden"
              type="checkbox"
              class="h-4 w-4 rounded border-input"
            />
            隐藏菜单
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="formData.keepAlive"
              type="checkbox"
              class="h-4 w-4 rounded border-input"
            />
            缓存页面
          </label>
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
      message="确定要删除此菜单吗？如果有子菜单也会一并删除。"
      :confirm-loading="loading"
      @confirm="handleDelete"
    />
  </div>
</template>
