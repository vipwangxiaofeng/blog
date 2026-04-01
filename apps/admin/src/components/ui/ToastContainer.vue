<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification";
import Toast from "./Toast.vue";

const notificationStore = useNotificationStore();

function handleClose(id: string) {
  notificationStore.removeToast(id);
}
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <Toast
          v-for="toast in notificationStore.toasts"
          :key="toast.id"
          :id="toast.id"
          :type="toast.type"
          :title="toast.title"
          :message="toast.message"
          @close="handleClose"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
