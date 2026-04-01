import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { storage } from "@/utils/storage";

export const useAppStore = defineStore("app", () => {
  // Sidebar state
  const sidebarCollapsed = ref(storage.get("sidebar_collapsed", false));

  // Theme
  const theme = ref<"light" | "dark">(storage.get("theme", "light"));

  // Layout settings
  const layout = ref<"side" | "top" | "mix">(storage.get("layout", "side"));

  // Breadcrumb
  const showBreadcrumb = ref(storage.get("show_breadcrumb", true));

  // Tab bar
  const showTabBar = ref(storage.get("show_tab_bar", true));

  // Content animation
  const contentAnimation = ref(storage.get("content_animation", true));

  // Language
  const locale = ref(storage.get("locale", "zh-CN"));

  // Computed
  const isDark = computed(() => theme.value === "dark");

  // Actions
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    storage.set("sidebar_collapsed", sidebarCollapsed.value);
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed;
    storage.set("sidebar_collapsed", collapsed);
  };

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
    storage.set("theme", theme.value);
  };

  const setTheme = (newTheme: "light" | "dark") => {
    theme.value = newTheme;
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    storage.set("theme", newTheme);
  };

  const setLayout = (newLayout: "side" | "top" | "mix") => {
    layout.value = newLayout;
    storage.set("layout", newLayout);
  };

  const setShowBreadcrumb = (show: boolean) => {
    showBreadcrumb.value = show;
    storage.set("show_breadcrumb", show);
  };

  const setShowTabBar = (show: boolean) => {
    showTabBar.value = show;
    storage.set("show_tab_bar", show);
  };

  const setContentAnimation = (enabled: boolean) => {
    contentAnimation.value = enabled;
    storage.set("content_animation", enabled);
  };

  const setLocale = (newLocale: string) => {
    locale.value = newLocale;
    storage.set("locale", newLocale);
  };

  // Initialize theme on load
  const initTheme = () => {
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  };

  return {
    sidebarCollapsed,
    theme,
    layout,
    showBreadcrumb,
    showTabBar,
    contentAnimation,
    locale,
    isDark,
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    setLayout,
    setShowBreadcrumb,
    setShowTabBar,
    setContentAnimation,
    setLocale,
    initTheme,
  };
});
