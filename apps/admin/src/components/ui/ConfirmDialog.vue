<script setup lang="ts">
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-vue-next";
import Modal from "./Modal.vue";
import Button from "./Button.vue";

interface Props {
  open: boolean;
  type?: "info" | "warning" | "success" | "danger";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  confirmText: "确定",
  cancelText: "取消",
  confirmLoading: false,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  danger: XCircle,
};

const iconColors = {
  info: "text-info bg-info/10",
  warning: "text-warning bg-warning/10",
  success: "text-success bg-success/10",
  danger: "text-destructive bg-destructive/10",
};

const buttonVariants = {
  info: "default",
  warning: "warning",
  success: "success",
  danger: "destructive",
} as const;

function handleConfirm() {
  emit("confirm");
}

function handleCancel() {
  emit("update:open", false);
  emit("cancel");
}
</script>

<template>
  <Modal
    :open="open"
    size="sm"
    :closable="false"
    @update:open="(val) => emit('update:open', val)"
  >
    <div class="flex flex-col items-center text-center">
      <!-- Icon -->
      <div
        :class="[
          'flex h-12 w-12 items-center justify-center rounded-full',
          iconColors[type],
        ]"
      >
        <component :is="icons[type]" class="h-6 w-6" />
      </div>

      <!-- Title -->
      <h3 class="mt-4 text-lg font-semibold">{{ title }}</h3>

      <!-- Message -->
      <p class="mt-2 text-sm text-muted-foreground">{{ message }}</p>
    </div>

    <template #footer>
      <Button variant="outline" @click="handleCancel">
        {{ cancelText }}
      </Button>
      <Button
        :variant="buttonVariants[type]"
        :loading="confirmLoading"
        @click="handleConfirm"
      >
        {{ confirmText }}
      </Button>
    </template>
  </Modal>
</template>
