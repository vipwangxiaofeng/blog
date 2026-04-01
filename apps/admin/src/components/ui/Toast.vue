<script setup lang="ts">
import { computed } from "vue";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-vue-next";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
});

const emit = defineEmits<{
  close: [id: string];
}>();

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColors = {
  success: "text-success",
  error: "text-destructive",
  warning: "text-warning",
  info: "text-info",
};

const icon = computed(() => icons[props.type]);
const iconColor = computed(() => iconColors[props.type]);

function handleClose() {
  emit("close", props.id);
}
</script>

<template>
  <div
    :class="
      cn(
        'pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border bg-background p-4 shadow-lg animate-in slide-in-from-top-full',
      )
    "
  >
    <!-- Icon -->
    <component :is="icon" :class="cn('h-5 w-5 shrink-0', iconColor)" />

    <!-- Content -->
    <div class="flex-1 space-y-1">
      <p class="text-sm font-semibold">{{ title }}</p>
      <p v-if="message" class="text-sm text-muted-foreground">
        {{ message }}
      </p>
    </div>

    <!-- Close button -->
    <button
      class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      @click="handleClose"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">关闭</span>
    </button>
  </div>
</template>
