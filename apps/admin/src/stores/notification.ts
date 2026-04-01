import { ref } from "vue";
import { defineStore } from "pinia";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export const useNotificationStore = defineStore("notification", () => {
  const toasts = ref<ToastNotification[]>([]);
  const unreadCount = ref(0);

  // Generate unique id
  function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  // Add toast notification
  function addToast(notification: Omit<ToastNotification, "id">) {
    const id = generateId();
    const duration = notification.duration ?? 3000;

    toasts.value.push({
      id,
      ...notification,
    });

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }

  // Remove toast
  function removeToast(id: string) {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  }

  // Clear all toasts
  function clearToasts() {
    toasts.value = [];
  }

  // Convenience methods
  function success(title: string, message?: string) {
    return addToast({ type: "success", title, message });
  }

  function error(title: string, message?: string) {
    return addToast({ type: "error", title, message, duration: 5000 });
  }

  function warning(title: string, message?: string) {
    return addToast({ type: "warning", title, message });
  }

  function info(title: string, message?: string) {
    return addToast({ type: "info", title, message });
  }

  // Set unread count
  function setUnreadCount(count: number) {
    unreadCount.value = count;
  }

  // Mark as read
  function markAsRead() {
    unreadCount.value = 0;
  }

  return {
    toasts,
    unreadCount,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
    setUnreadCount,
    markAsRead,
  };
});
