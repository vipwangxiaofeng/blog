<script setup lang="ts">
import { computed, watch } from "vue";
import { X } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import Button from "./Button.vue";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  closable: true,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
}>();

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
};

const dialogClasses = computed(() => {
  return cn(
    "relative w-full bg-background rounded-lg shadow-lg p-6 animate-in fade-in-0 zoom-in-95",
    sizeClasses[props.size],
    props.class,
  );
});

function handleClose() {
  emit("update:open", false);
  emit("close");
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    handleClose();
  }
}

// Handle ESC key
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape" && props.closable) {
          handleClose();
        }
      };
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true },
);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50" @click="handleOverlayClick" />

        <!-- Dialog -->
        <div :class="dialogClasses">
          <!-- Header -->
          <div v-if="title || $slots.header" class="mb-4">
            <slot name="header">
              <div class="flex items-center justify-between">
                <div>
                  <h2
                    v-if="title"
                    class="text-lg font-semibold leading-none tracking-tight"
                  >
                    {{ title }}
                  </h2>
                  <p
                    v-if="description"
                    class="mt-1 text-sm text-muted-foreground"
                  >
                    {{ description }}
                  </p>
                </div>
                <button
                  v-if="closable"
                  class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  @click="handleClose"
                >
                  <X class="h-4 w-4" />
                  <span class="sr-only">关闭</span>
                </button>
              </div>
            </slot>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex justify-end gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
