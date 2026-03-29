import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const sidebarCollapsed = ref(false);
  const theme = ref<"light" | "dark">("light");

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  };

  const isDark = computed(() => theme.value === "dark");

  return { sidebarCollapsed, theme, toggleSidebar, toggleTheme, isDark };
});
